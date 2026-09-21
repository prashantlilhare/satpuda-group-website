import { useCallback, useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, Pause, Play } from "lucide-react";
import { Button } from "../ui/Primitives";
import { heroGroups, heroGroupStarts, heroPlaylist } from "../../data/hero";

/** How long a single photograph holds before the next one fades in. */
const DURATION = 3000;

/* One frame of the wall: the photograph plus its readability scrims. */
function Slide({ slide, active }) {
  return (
    <div aria-hidden="true" className="absolute inset-0">
      <img
        src={slide.src}
        srcSet={slide.srcSet}
        sizes="100vw"
        alt=""
        loading="eager"
        decoding="async"
        style={{ objectPosition: slide.focus }}
        className={`h-full w-full object-cover ${active ? "kenburns" : "scale-[1.06]"}`}
      />
      {/* readability scrim: stronger at the bottom-left where copy sits */}
      <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(12,21,41,0.92)_0%,rgba(12,21,41,0.72)_28%,rgba(12,21,41,0.36)_58%,rgba(12,21,41,0.22)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(20,34,68,0.74)_0%,rgba(20,34,68,0.44)_38%,rgba(20,34,68,0.1)_72%,transparent_92%)]" />
      {/* Phone only. The copy fills most of a 70%-tall band there, so it can
          land on a bright wall or a white shirt in one slide and on shadow in
          the next; this holds the whole copy area dark enough for body text
          to stay legible on every photograph in the wall. */}
      <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(9,16,32,0.93)_0%,rgba(9,16,32,0.8)_46%,rgba(9,16,32,0.55)_72%,rgba(9,16,32,0.22)_92%,transparent_100%)] sm:hidden" />
    </div>
  );
}

export function HeroSlider() {
  // `previous` stays mounted underneath so the incoming photograph can fade in
  // over it — the whole wall is never in the DOM at once, which is what keeps
  // 46 photographs affordable on a phone.
  const [frame, setFrame] = useState({ current: 0, previous: null });
  const [userPaused, setUserPaused] = useState(false);
  // Focus and tab-visibility only. Hovering used to pause it too, which meant
  // that on a laptop — where the pointer almost always rests somewhere over a
  // full-width hero — the slideshow simply never advanced.
  const [autoPaused, setAutoPaused] = useState(false);
  const [reduced, setReduced] = useState(false);

  const count = heroPlaylist.length;
  const index = frame.current;
  const slide = heroPlaylist[index];
  const group = heroGroups[slide.groupIndex];
  const paused = userPaused || autoPaused || reduced;

  const goTo = useCallback((i) => {
    const next = ((i % count) + count) % count;
    setFrame((f) => (f.current === next ? f : { current: next, previous: f.current }));
  }, [count]);

  const next = useCallback(() => goTo(index + 1), [goTo, index]);

  /* --- step a whole headline at a time with the arrows -------------
   * Stepping one photograph would leave the copy unchanged on most presses,
   * which reads as a dead button. The arrows move to the next/previous
   * headline instead, and land on the first photograph of that run.
   */
  const goToGroup = useCallback(
    (direction) => {
      const here = heroPlaylist[index].groupIndex;
      let i = index;

      for (let step = 0; step < count; step++) {
        i = (i + direction + count) % count;
        if (heroPlaylist[i].groupIndex !== here) break;
      }
      // Walk back to the first photograph of the run we landed in.
      const landed = heroPlaylist[i].groupIndex;
      for (let step = 0; step < count; step++) {
        const before = (i - 1 + count) % count;
        if (heroPlaylist[before].groupIndex !== landed) break;
        i = before;
      }
      goTo(i);
    },
    [count, index, goTo],
  );

  /* --- honour reduced motion: no autoplay at all ------------------ */
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  /* --- autoplay --------------------------------------------------- */
  useEffect(() => {
    if (paused) return;
    const t = setTimeout(next, DURATION);
    return () => clearTimeout(t);
  }, [index, paused, next]);

  /* --- warm the next photograph so the fade never lands on nothing - */
  useEffect(() => {
    const upcoming = heroPlaylist[(index + 1) % count];
    const img = new Image();
    img.sizes = "100vw";
    img.srcset = upcoming.srcSet;
    img.src = upcoming.src;
  }, [index, count]);

  /* --- pause while the tab is in the background ------------------- */
  useEffect(() => {
    const onVisibility = () => setAutoPaused(document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  /* --- arrow-key navigation when the carousel has focus ----------- */
  const onKeyDown = (e) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      goToGroup(-1);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      goToGroup(1);
    }
  };

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Satpuda Group highlights"
      onKeyDown={onKeyDown}
      onFocusCapture={() => setAutoPaused(true)}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setAutoPaused(false);
      }}
      /* `.hero-band` owns the height (see index.css): 70% of the screen on a
         phone, one capped viewport height from `sm` up, always as a minimum
         so the copy can never end up behind the header. The copy block below
         reserves the same room on every slide — three heading lines, a fixed
         body box — so the banner is the same height whatever the headline. */
      className="hero-band on-dark relative isolate flex w-full overflow-hidden bg-royal-950"
    >
      {/* ---------- photo wall ---------- */}
      {frame.previous !== null && (
        <Slide key="under" slide={heroPlaylist[frame.previous]} />
      )}
      <div key={`over-${index}`} className="hero-fade absolute inset-0">
        <Slide slide={slide} active />
      </div>

      {/* ---------- copy ----------
          Keyed by headline, not by photograph: the copy animates in when the
          headline changes and then holds still while the pictures behind it
          change, instead of re-running its entrance every few seconds. */}
      <div className="shell relative z-10 flex w-full flex-col justify-end pt-6 pb-6 sm:pt-16 sm:pb-16 lg:pt-20 lg:pb-20">
        <div key={group.id} className="slide-copy max-w-3xl">
          <p className="eyebrow !text-ember-300 [text-shadow:0_1px_3px_rgba(6,12,25,0.6)] sm:[text-shadow:none]">
            {group.eyebrow}
          </p>

          <h1 className="t-display mt-3 min-h-[3.12em] text-white [text-shadow:0_2px_10px_rgba(6,12,25,0.45)] sm:mt-6 sm:[text-shadow:none]">
            {group.title.map((line, i) => (
              <span key={line} className="block">
                {i === group.title.length - 1 ? (
                  <span className="relative">
                    {line}
                    <span
                      aria-hidden="true"
                      className="hero-rule absolute -bottom-1 left-0 hidden h-[3px] w-full bg-ember-500 sm:block"
                    />
                  </span>
                ) : (
                  line
                )}
              </span>
            ))}
          </h1>

          <p className="mt-3 line-clamp-2 min-h-[3.25em] max-w-xl text-[0.875rem] leading-relaxed text-white/95 [text-shadow:0_1px_3px_rgba(6,12,25,0.6)] sm:mt-7 sm:line-clamp-3 sm:min-h-[4.9em] sm:text-lg sm:text-white/80 sm:[text-shadow:none]">
            {group.body}
          </p>

          <div className="mt-5 flex flex-wrap gap-2.5 sm:mt-9 sm:gap-3.5">
            <Button to="/institutes/btech-polytechnic" variant="ember" size="compact">
              Explore institutions
            </Button>
            <Button to="/contact" variant="ghostLight" size="compact">
              Contact us
            </Button>
          </div>
        </div>

        {/* ---------- controls ---------- */}
        <div className="hero-controls mt-6 flex items-end justify-between gap-4 border-t border-white/18 pt-4 sm:mt-11 sm:gap-6 sm:pt-6">
          {/* pagination — one bar per headline */}
          <div className="flex min-w-0 flex-1 items-center gap-2.5 sm:gap-3.5">
            {heroGroups.map((g, i) => {
              const active = i === slide.groupIndex;
              return (
                <button
                  key={g.id}
                  type="button"
                  onClick={() => goTo(heroGroupStarts[i])}
                  aria-label={`Go to ${g.eyebrow}`}
                  aria-current={active ? "true" : undefined}
                  className="group/dot relative h-6 min-w-0 flex-1 cursor-pointer sm:h-8 sm:max-w-[7rem]"
                >
                  <span className="absolute inset-x-0 top-1/2 h-[3px] -translate-y-1/2 bg-white/22 transition-colors duration-300 group-hover/dot:bg-white/40" />
                  {active && (
                    <span
                      key={`${index}-bar`}
                      data-paused={paused}
                      style={{ "--bar-duration": `${DURATION}ms` }}
                      className="bar-fill absolute inset-x-0 top-1/2 h-[3px] -translate-y-1/2 bg-ember-500"
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* counter + buttons */}
          <div className="flex shrink-0 items-center gap-4 sm:gap-6">
            <p className="hidden font-display text-sm tabular-nums text-white/55 sm:block">
              <span className="text-lg text-white">
                {String(slide.groupIndex + 1).padStart(2, "0")}
              </span>
              <span className="mx-1.5">/</span>
              {String(heroGroups.length).padStart(2, "0")}
            </p>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setUserPaused((v) => !v)}
                aria-label={userPaused ? "Resume slideshow" : "Pause slideshow"}
                className="flex h-10 w-10 items-center justify-center border border-white/28 text-white transition-all duration-300 hover:border-white hover:bg-white hover:text-royal-800 sm:h-11 sm:w-11"
              >
                {userPaused ? (
                  <Play aria-hidden="true" className="h-4 w-4" />
                ) : (
                  <Pause aria-hidden="true" className="h-4 w-4" />
                )}
              </button>
              <button
                type="button"
                onClick={() => goToGroup(-1)}
                aria-label="Previous headline"
                className="flex h-10 w-10 items-center justify-center border border-white/28 text-white transition-all duration-300 hover:border-white hover:bg-white hover:text-royal-800 sm:h-11 sm:w-11"
              >
                <ArrowLeft aria-hidden="true" className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => goToGroup(1)}
                aria-label="Next headline"
                className="flex h-10 w-10 items-center justify-center border border-white/28 text-white transition-all duration-300 hover:border-white hover:bg-white hover:text-royal-800 sm:h-11 sm:w-11"
              >
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* screen-reader announcement of the current slide */}
      <p aria-live="polite" aria-atomic="true" className="sr-only">
        {`${group.title.join(" ")} — ${slide.alt}`}
      </p>
    </section>
  );
}
