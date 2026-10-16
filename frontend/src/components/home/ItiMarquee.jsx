import { useRef } from "react";
import { Link } from "react-router-dom";
import { useInView } from "motion/react";
import { Eyebrow } from "../ui/Primitives";
import { FAR } from "../ui/ridgePaths";
import { itiCampuses } from "../../data/itiCampuses";

/* Seconds per campus for one pass — slow enough to read a name in passing. */
const PACE = 3.4;

/* Oldest first, so the band reads as the network growing; campuses with no
   published year go last. */
const campuses = [...itiCampuses].sort(
  (a, b) => (a.established ?? Infinity) - (b.established ?? Infinity),
);
const earliest = campuses[0].established;

/** One campus: the year it opened, then its name and district. */
function CampusChip({ c, index, hidden }) {
  return (
    <li className="iti-chip-slot" aria-hidden={hidden || undefined}>
      <Link
        to={`/institutes/iti#campus-${c.id}`}
        tabIndex={hidden ? -1 : undefined}
        className="iti-chip group"
        style={{ "--chip-index": index }}
      >
        <span className="iti-chip-year">
          {c.established ? (
            <>
              <span className="text-[0.5625rem] font-semibold uppercase tracking-[0.16em] text-white/45">Est.</span>
              <span className="font-display text-[1.0625rem] font-semibold leading-none tracking-[-0.02em] tabular-nums">
                {c.established}
              </span>
            </>
          ) : (
            <span className="text-[0.625rem] font-semibold uppercase tracking-[0.14em]">ITI</span>
          )}
        </span>

        <span className="min-w-0">
          <span className="flex items-center gap-2 font-display text-[0.9375rem] font-semibold leading-tight tracking-[-0.01em] text-white">
            {c.shortName}
            {c.head && (
              <span className="rounded bg-ember-500 px-1.5 py-0.5 text-[0.5625rem] font-semibold uppercase tracking-[0.12em] text-white">
                HQ
              </span>
            )}
          </span>
          <span className="mt-1 block text-[0.75rem] text-white/55">{c.district} district</span>
        </span>

        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className="iti-chip-arrow h-4 w-4 shrink-0"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M7 17L17 7M9 7h8v8" />
        </svg>
        <span className="sr-only">: {c.name}</span>
      </Link>
    </li>
  );
}

/**
 * The fifteen Satpuda ITIs, drifting past on a dark band — each chip the
 * year a campus opened, its name and district, and a link straight to that
 * campus on the ITI page.
 *
 * The row runs on CSS (`.iti-track`), twice over and shifted by half, so
 * the loop has no seam. Pointing at it — or tabbing into it — holds it
 * still; off screen it stops. A soft glint walks along the year badges one
 * campus at a time, so the band is never quite static. Reduced motion
 * drops both and lets the row scroll by hand.
 */
export function ItiMarquee() {
  const rowRef = useRef(null);
  const onScreen = useInView(rowRef);

  return (
    <section aria-labelledby="iti-marquee-title" className="on-dark relative isolate overflow-hidden bg-royal-950 py-10 text-white sm:py-12">
      {/* the hills, faintly, behind the band — the site's signature edge */}
      <svg
        aria-hidden="true"
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-24 w-full"
      >
        <path d={`${FAR} V120 H0 Z`} fill="rgb(255 255 255 / 0.035)" />
        <path d={FAR} fill="none" stroke="var(--color-ember-400)" strokeOpacity="0.25" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
      </svg>

      <div className="shell flex flex-wrap items-end justify-between gap-x-8 gap-y-3">
        <div>
          <Eyebrow>Satpuda ITIs</Eyebrow>
          <h2 id="iti-marquee-title" className="mt-3 font-display text-[1.375rem] font-semibold leading-tight tracking-[-0.02em] sm:text-[1.625rem]">
            {itiCampuses.length} campuses across Madhya Pradesh{" "}
            <span className="text-white/50">— since {earliest}.</span>
          </h2>
        </div>
        <Link
          to="/institutes/iti#campuses"
          className="group inline-flex min-h-[2.75rem] items-center gap-2 text-[0.875rem] font-semibold text-white/80 transition-colors duration-300 hover:text-ember-300"
        >
          See all campuses
          <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </Link>
      </div>

      <div ref={rowRef} className="iti-row mt-7" data-paused={!onScreen || undefined}>
        <ul className="iti-track" style={{ "--iti-duration": `${campuses.length * PACE}s` }}>
          {campuses.map((c, i) => (
            <CampusChip key={c.id} c={c} index={i} />
          ))}
          {campuses.map((c, i) => (
            <CampusChip key={`${c.id}-again`} c={c} index={i} hidden />
          ))}
        </ul>
      </div>
    </section>
  );
}
