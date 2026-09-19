import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Eyebrow, Reveal } from "../ui/Primitives";
import { milestones } from "../../data/institutions";
import { stagger } from "../ui/stagger";

/* ------------------------------------------------------------------ */
/* Tuning                                                              */
/* ------------------------------------------------------------------ */

/** Token diameter in px; the rail sits on its centre line. */
const TOKEN = 64;

/* The pinned panel holds still for a beat at each end of its travel, so the
   sequence neither starts the instant the section catches on the header nor
   finishes exactly as it lets go. Fractions of the pinned distance. */
const LEAD_IN = 0.1;
const TAIL = 0.08;

/* How far into a leg the token has to be before the milestone it is heading
   for takes over the copy and the token's picture. Late enough to read as
   "it arrived", early enough that the change is not still running as the
   panel unpins. */
const ARRIVAL = 0.72;

const LAST = milestones.length - 1;

const clamp01 = (n) => (n < 0 ? 0 : n > 1 ? 1 : n);

/** Ease between two milestones, so the token settles onto each one. */
const smooth = (t) => t * t * (3 - 2 * t);

/* ------------------------------------------------------------------ */
/* Is the scroll-driven version on?                                    */
/* ------------------------------------------------------------------ */

const DRIVEN_QUERY = "(min-width: 1024px)";

function drivenNow() {
  if (typeof window === "undefined" || !window.matchMedia) return false;
  return (
    window.matchMedia(DRIVEN_QUERY).matches &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/**
 * True only where the pinned, scroll-scrubbed timeline is wanted.
 *
 * Below `lg` the right column is too narrow to hold a 64px rail, a token and
 * readable copy without the copy wrapping to four lines, and pinning a panel
 * on a phone costs more scroll than the content is worth — so the same
 * milestones render as a plain, fully-legible list instead. Reduced motion
 * gets that list too.
 *
 * Read synchronously on the first render rather than in an effect, so a
 * desktop visitor never sees the static list swap to the pinned one.
 */
function useDriven() {
  const [driven, setDriven] = useState(drivenNow);

  useEffect(() => {
    const width = window.matchMedia(DRIVEN_QUERY);
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setDriven(drivenNow());
    width.addEventListener("change", sync);
    motion.addEventListener("change", sync);
    return () => {
      width.removeEventListener("change", sync);
      motion.removeEventListener("change", sync);
    };
  }, []);

  return driven;
}

/* ------------------------------------------------------------------ */
/* Scroll position of the pinned panel                                 */
/* ------------------------------------------------------------------ */

/**
 * Progress 0 → 1 across the pinned stretch of `trackRef`.
 *
 * The track is taller than the panel pinned inside it; the difference is
 * exactly how far the page scrolls while the panel is held still, so
 * `(stickyTop - trackTop) / travel` is 0 the frame it catches and 1 the
 * frame it lets go. Reading it off the track's own geometry every frame —
 * rather than integrating scroll deltas — is what makes scrolling back up
 * run the sequence backwards for free.
 */
function usePinProgress(trackRef, panelRef) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;

    const read = () => {
      frame = 0;
      const track = trackRef.current;
      const panel = panelRef.current;
      if (!track || !panel) return;

      const travel = track.offsetHeight - panel.offsetHeight;
      if (travel <= 0) return;

      const stickyTop = parseFloat(getComputedStyle(panel).top) || 0;
      const pinned = (stickyTop - track.getBoundingClientRect().top) / travel;
      setProgress(clamp01((pinned - LEAD_IN) / (1 - LEAD_IN - TAIL)));
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(read);
    };

    read();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [trackRef, panelRef]);

  return progress;
}

/**
 * Centre of each milestone's marker, in px down from the top of the list.
 *
 * Measured rather than assumed: the rows are sized by their copy, which
 * reflows with the column, so the token has to be told where the milestones
 * actually landed.
 */
function useMarkerOffsets(listRef, markerRefs) {
  const [offsets, setOffsets] = useState([]);

  useLayoutEffect(() => {
    const list = listRef.current;
    if (!list) return;

    const measure = () => {
      const top = list.getBoundingClientRect().top;
      setOffsets(
        markerRefs.current.map((node) =>
          node ? node.getBoundingClientRect().top - top + node.offsetHeight / 2 : 0,
        ),
      );
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(list);
    return () => observer.disconnect();
  }, [listRef, markerRefs]);

  return offsets;
}

/* ------------------------------------------------------------------ */
/* Pinned, scroll-scrubbed timeline                                    */
/* ------------------------------------------------------------------ */

function PinnedTimeline() {
  const trackRef = useRef(null);
  const panelRef = useRef(null);
  const listRef = useRef(null);
  const markerRefs = useRef([]);

  const progress = usePinProgress(trackRef, panelRef);
  const offsets = useMarkerOffsets(listRef, markerRefs);

  /* Snap-based positioning */
  const active = Math.round(progress * LAST);
  const tokenY = offsets[active] ?? 0;

  return (
    <div ref={trackRef} className="tl-track">
      <div ref={panelRef} className="tl-panel">
        <Reveal>
          <Eyebrow>How it grew</Eyebrow>
        </Reveal>

        <div ref={listRef} className="relative mt-10">
          {/* Base line + the stretch already travelled. The rail stops on
              the last milestone rather than at the bottom of the list, so it
              does not trail off below 2022's paragraph. */}
          <span
            aria-hidden="true"
            className="absolute top-0 w-px bg-white/14"
            style={{ left: TOKEN / 2, height: offsets[LAST] ?? 0 }}
          />
          <span
            aria-hidden="true"
            className="absolute top-0 w-px bg-ember-500/55"
            style={{ left: TOKEN / 2, height: Math.max(0, tokenY) }}
          />

          {/* the travelling token ring */}
          <div
            aria-hidden="true"
            className="tl-token pointer-events-none"
            style={{
              width: TOKEN,
              height: TOKEN,
              transform: `translate3d(0, ${tokenY - TOKEN / 2}px, 0)`,
              transition: 'transform 0.5s var(--ease-out-expo)'
            }}
          />

          {/* Copy sits to the right of the rail and slides in from further
              right as it becomes active; `overflow-x-clip` keeps that offset
              from ever reaching the page's own scroll width. */}
          <ol className="relative overflow-x-clip">
            {milestones.map((m, i) => (
              <li key={m.year} className="relative pb-8 last:pb-0">
                <span
                  ref={(node) => {
                    markerRefs.current[i] = node;
                  }}
                  aria-hidden="true"
                  className="absolute left-0 top-0 flex items-center justify-center"
                  style={{ width: TOKEN, height: TOKEN }}
                >
                  <span className="absolute inset-0 rounded-full bg-royal-900" />
                  
                  <img
                    src={m.image}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 h-full w-full rounded-full object-cover transition-opacity duration-500"
                    style={{ opacity: i <= active ? 1 : 0 }}
                  />

                  <span
                    className="relative tl-dot"
                    style={{ opacity: i > active ? 1 : 0 }}
                  />
                </span>

                <div
                  className="tl-item"
                  data-state={i === active ? "current" : i < active ? "past" : "ahead"}
                  style={{ paddingLeft: TOKEN + 32 }}
                >
                  <p className="font-display text-[0.9375rem] font-semibold tabular-nums tracking-[0.02em] text-ember-300">
                    {m.year}
                  </p>
                  <h3 className="mt-1.5 font-display text-[1.25rem] font-semibold tracking-[-0.015em] text-white">
                    {m.title}
                  </h3>
                  <p className="mt-2 max-w-md text-[0.9375rem] leading-[1.65] text-white/62">
                    {m.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Static fallback — narrow screens and reduced motion                 */
/* ------------------------------------------------------------------ */

function StaticTimeline() {
  return (
    <div>
      <Reveal>
        <Eyebrow>How it grew</Eyebrow>
      </Reveal>

      <ol className="relative mt-10">
        {milestones.map((m, i) => (
          <Reveal key={m.year} delay={stagger(i)}>
            <li className="relative pb-8 last:pb-0">
              {i < LAST && (
                <span
                  aria-hidden="true"
                  className="absolute left-[1.375rem] top-12 h-full w-px bg-white/14"
                />
              )}

              <div className="flex gap-5">
                <img
                  src={m.image}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className="h-11 w-11 shrink-0 rounded-full object-cover ring-1 ring-white/30"
                />
                <div className="min-w-0">
                  <p className="font-display text-[0.9375rem] font-semibold tabular-nums tracking-[0.02em] text-ember-300">
                    {m.year}
                  </p>
                  <h3 className="mt-1.5 font-display text-[1.125rem] font-semibold tracking-[-0.015em] text-white sm:text-[1.25rem]">
                    {m.title}
                  </h3>
                  <p className="mt-2 text-[0.9375rem] leading-[1.7] text-white/62">{m.body}</p>
                </div>
              </div>
            </li>
          </Reveal>
        ))}
      </ol>
    </div>
  );
}

/* ------------------------------------------------------------------ */

export function GrowthTimeline() {
  return useDriven() ? <PinnedTimeline /> : <StaticTimeline />;
}
