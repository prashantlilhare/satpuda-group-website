import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";

/* A strong ease-out: the movement lands at once and then settles. */
const EASE_OUT = [0.23, 1, 0.32, 1];
/* Gap between items that arrive together. */
const STEP = 0.05;
/* Seconds per card for one pass, so both rows drift at the same speed. */
const PACE = 5.5;

/** One placed student: portrait with the package on it, then who and where. */
function StudentCard({ s, hidden, dark }) {
  const top = s.lpa >= 10;
  return (
    <li className="w-[12.5rem] shrink-0 pr-5 sm:w-[14rem]" aria-hidden={hidden || undefined}>
      <figure className="group">
        <div className="relative overflow-hidden rounded-md bg-royal-900">
          <img
            src={s.src}
            srcSet={s.srcSet}
            sizes="(min-width: 640px) 13rem, 12rem"
            alt={hidden ? "" : `${s.name}, ${s.branch}, placed with ${s.company}`}
            loading="lazy"
            decoding="async"
            className="aspect-[4/5] w-full object-cover object-top transition-transform duration-300 ease-out group-hover:scale-[1.03]"
          />
          <span
            className={`absolute bottom-3 left-3 rounded-full px-2.5 py-1 font-display text-[0.8125rem] font-semibold tabular-nums ${
              top ? "bg-ember-500 text-white" : "bg-white text-ink"
            }`}
          >
            {Number.isInteger(s.lpa) ? s.lpa.toFixed(1) : s.lpa} LPA
          </span>
        </div>
        <figcaption className="mt-3">
          <p className={`font-display text-[0.9375rem] font-semibold leading-tight ${dark ? "text-white" : "text-ink"}`}>{s.name}</p>
          <p className={`mt-1 text-[0.8125rem] leading-snug ${dark ? "text-white/55" : "text-ink-mute"}`}>
            {s.branch} · {s.year}
          </p>
          <p className={`mt-1 text-[0.8125rem] font-medium leading-snug ${dark ? "text-white/80" : "text-ink-soft"}`}>{s.company}</p>
        </figcaption>
      </figure>
    </li>
  );
}

/** A row that drifts sideways forever: the list twice, moved by half its width. */
export function PlacementRow({ items, direction = "left", paused, dark = false }) {
  return (
    <div className="placement-row" data-paused={paused || undefined}>
      <ul
        className="placement-track"
        data-direction={direction}
        style={{ "--placement-duration": `${items.length * PACE}s` }}
      >
        {items.map((s) => (
          <StudentCard key={s.id} s={s} dark={dark} />
        ))}
        {items.map((s) => (
          <StudentCard key={`${s.id}-again`} s={s} dark={dark} hidden />
        ))}
      </ul>
    </div>
  );
}

/**
 * Placements, as the students themselves: the headline figures, then two
 * rows of placed students drifting past in opposite directions, each card
 * carrying its package and company.
 *
 * The figures arrive once in a short stagger, on transform and opacity only.
 * The rows run on CSS so they stay smooth while the page is busy; pointing
 * at a row stops it so a card can be read, and off screen they hold still.
 * Reduced motion stops the drift and lets the rows scroll by hand instead.
 */
export function PlacementMarquee({ highlights, students, className = "" }) {
  const ref = useRef(null);
  const rowsRef = useRef(null);
  const seen = useInView(ref, { once: true, margin: "0px 0px -80px 0px" });
  const onScreen = useInView(rowsRef);
  const still = useReducedMotion();
  /* Under reduced motion nothing waits for the scroll. */
  const on = seen || still;

  const half = Math.ceil(students.length / 2);
  const rows = [students.slice(0, half), students.slice(half)];

  return (
    <div className={className}>
      <dl ref={ref} className="grid grid-cols-2 gap-x-6 gap-y-8 lg:grid-cols-4">
        {highlights.map((h, i) => (
          <motion.div
            key={h.label}
            className="border-t border-stone-line pt-5"
            initial={{ opacity: 0, transform: still ? "none" : "translateY(8px)" }}
            animate={on ? { opacity: 1, transform: "translateY(0px)" } : undefined}
            transition={{ duration: still ? 0.2 : 0.4, delay: still ? 0 : i * STEP, ease: EASE_OUT }}
          >
            <dt className="text-[0.8125rem] text-ink-mute">{h.label}</dt>
            <dd className="mt-2 font-display text-[clamp(2rem,4vw,2.75rem)] font-semibold leading-none tracking-[-0.03em] tabular-nums text-ink">
              {h.value}
              {h.unit && <span className="ml-1.5 text-[0.4em] font-semibold tracking-normal text-ember-600">{h.unit}</span>}
            </dd>
            <dd className="mt-2 text-[0.8125rem] text-ink-soft">{h.note}</dd>
          </motion.div>
        ))}
      </dl>

      {/* The rows run the full width of the window, past the page margins. */}
      <div ref={rowsRef} className="relative left-1/2 mt-14 w-screen -translate-x-1/2 space-y-8 lg:mt-16">
        <PlacementRow items={rows[0]} direction="left" paused={!onScreen} />
        <PlacementRow items={rows[1]} direction="right" paused={!onScreen} />
      </div>
    </div>
  );
}
