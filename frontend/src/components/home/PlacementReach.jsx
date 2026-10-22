import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "motion/react";
import { Eyebrow, Odometer, Reveal, SplitText } from "../ui/Primitives";
import { groupRecruiters, placementDrives } from "../../data/brochure";
import { stagger } from "../ui/stagger";

const HOLD = 2600;
const fmt = (n) => n.toLocaleString("en-IN");
const max = Math.max(...placementDrives.byCampus.map((c) => c.count));

/**
 * Campus placement drives across the whole group — the brochure's
 * "25,725 in the last four years", broken down by the campus that hosted
 * them, with the recruiters and the group's own job portal beside it.
 *
 * The bars grow once to their share as the chart arrives; after that the
 * ember fill walks from bar to bar slowly, and pointing at a bar holds it.
 */
function CampusBars() {
  const ref = useRef(null);
  const seen = useInView(ref, { once: true, margin: "0px 0px -60px 0px" });
  const onScreen = useInView(ref);
  const still = useReducedMotion();
  const [active, setActive] = useState(0);
  const [held, setHeld] = useState(false);
  const grown = seen || still;

  useEffect(() => {
    if (held || still || !onScreen || !seen) return;
    const t = setTimeout(
      () => setActive((a) => (a + 1) % placementDrives.byCampus.length),
      HOLD,
    );
    return () => clearTimeout(t);
  }, [active, held, still, onScreen, seen]);

  return (
    <ul ref={ref} className="space-y-6" onMouseLeave={() => setHeld(false)}>
      {placementDrives.byCampus.map((c, i) => {
        const on = i === active;
        return (
          <li
            key={c.place}
            onMouseEnter={() => {
              setActive(i);
              setHeld(true);
            }}
            className="cursor-default"
          >
            <div className="flex items-baseline justify-between gap-4">
              <span
                className={`text-[0.9375rem] font-medium transition-colors duration-500 ${
                  on ? "text-ink" : "text-ink-soft"
                }`}
              >
                {c.place}
              </span>
              <span className="font-display text-[1.25rem] font-semibold tabular-nums tracking-[-0.02em] text-royal-800">
                {fmt(c.count)}
              </span>
            </div>
            <div className="mt-2.5 h-2.5 overflow-hidden rounded-full bg-royal-50">
              <span
                aria-hidden="true"
                style={{
                  width: `${(c.count / max) * 100}%`,
                  transform: grown ? "scaleX(1)" : "scaleX(0)",
                  transitionDelay: still ? "0ms" : `${i * 110}ms`,
                }}
                className={`reach-bar block h-full origin-left rounded-full ${
                  on ? "bg-ember-500" : "bg-royal-600"
                }`}
              />
            </div>
          </li>
        );
      })}
    </ul>
  );
}

/**
 * The recruiter panel from the brochure, as one row of logos drifting
 * slowly past, the full width of the window. Each logo sits on its own
 * white tile at one height, so the mixed artwork reads as a single set.
 * The row holds still while pointed at and while off screen; under reduced
 * motion it becomes a row scrolled by hand.
 */
function RecruiterMarquee() {
  const ref = useRef(null);
  const onScreen = useInView(ref);

  const tile = (r, hidden) => (
    <li key={`${r.id}${hidden ? "-again" : ""}`} aria-hidden={hidden || undefined} className="recruit-tile">
      <img
        src={r.src}
        alt={hidden ? "" : r.name}
        title={r.name}
        loading="lazy"
        decoding="async"
        className="h-full w-auto max-w-[7.5rem] object-contain"
      />
    </li>
  );

  return (
    <div
      ref={ref}
      className="recruit-row"
      data-paused={!onScreen || undefined}
      role="group"
      aria-label="Companies that have recruited from Satpuda"
    >
      <ul className="recruit-track" style={{ "--recruit-duration": `${groupRecruiters.length * 2.6}s` }}>
        {groupRecruiters.map((r) => tile(r, false))}
        {groupRecruiters.map((r) => tile(r, true))}
      </ul>
    </div>
  );
}

export function PlacementReach() {
  return (
    <section aria-labelledby="reach-title" className="section overflow-x-clip bg-paper">
      <div className="shell">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:gap-20">
          {/* ---------- the headline figure ---------- */}
          <div>
            <Reveal>
              <Eyebrow>Placements across the group</Eyebrow>
            </Reveal>
            <h2 id="reach-title" className="mt-5">
              <span className="block font-display text-[clamp(3.25rem,8vw,5.5rem)] font-semibold leading-none tracking-[-0.04em] tabular-nums text-royal-800">
                <Odometer value={fmt(placementDrives.total)} />
              </span>
              <SplitText as="span" className="t-h3 mt-3 block text-ink">
                campus placements in the last four years.
              </SplitText>
            </h2>
            <Reveal delay={stagger(2)}>
              <p className="t-lead mt-6 max-w-lg">
                Recruitment drives held on Satpuda campuses for ITI, polytechnic and engineering
                students — with a {placementDrives.rate}% placement record across the group.
              </p>
            </Reveal>
          </div>

          {/* ---------- by campus ---------- */}
          <div>
            <Reveal>
              <p className="text-[0.75rem] font-semibold uppercase tracking-[0.14em] text-ink-mute">
                Placements by campus
              </p>
            </Reveal>
            <div className="mt-6">
              <CampusBars />
            </div>
          </div>
        </div>
      </div>

      {/* ---------- who hires, edge to edge ---------- */}
      <div className="section-body">
        <div className="shell">
          <Reveal>
            <p className="text-[0.75rem] font-semibold uppercase tracking-[0.14em] text-ink-mute">
              Where our students get placed
            </p>
          </Reveal>
        </div>
        <div className="mt-6">
          <RecruiterMarquee />
        </div>
      </div>
    </section>
  );
}
