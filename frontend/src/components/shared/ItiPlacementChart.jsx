import { useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";

/* A strong ease-out: the movement lands at once and then settles. */
const EASE_OUT = [0.23, 1, 0.32, 1];
const STEP = 0.06;

const lakh = (rupees) => `₹${+(rupees / 100000).toFixed(2)} lakh`;
const count = (n) => n.toLocaleString("en-IN");

/**
 * ITI placements, year by year: the totals on one side, a bar per year on
 * the other, then the companies the trainees went to.
 *
 * The bars rise once from the baseline in a short stagger (transform only).
 * Pointing at a year — or focusing it — lights its bar and swaps the detail
 * line under the chart to that year's drives, rate and package; otherwise
 * the detail shows the best year. Reduced motion keeps the fades and drops
 * the rise.
 */
export function ItiPlacementChart({ years, recruiters, className = "" }) {
  const ref = useRef(null);
  const seen = useInView(ref, { once: true, margin: "0px 0px -80px 0px" });
  const still = useReducedMotion();
  /* Under reduced motion nothing waits for the scroll. */
  const on = seen || still;

  const most = Math.max(...years.map((y) => y.placed));
  const best = years.findIndex((y) => y.placed === most);
  const [active, setActive] = useState(null);
  const shown = years[active ?? best];

  const placed = years.reduce((n, y) => n + y.placed, 0);
  const drives = years.reduce((n, y) => n + y.drives, 0);
  const peakRate = Math.max(...years.map((y) => y.rate));
  const first = years[0].year;
  const last = years[years.length - 1].year;

  const totals = [
    { value: count(placed), label: `Trainees placed, ${first}–${String(last).slice(2)}` },
    { value: String(drives), label: "Campus placement drives" },
    { value: `${peakRate}%`, label: `Placed in ${years.find((y) => y.rate === peakRate).year}` },
  ];

  const enter = (i) => ({
    initial: { opacity: 0, transform: still ? "none" : "translateY(8px)" },
    animate: on ? { opacity: 1, transform: "translateY(0px)" } : undefined,
    transition: { duration: still ? 0.2 : 0.4, delay: still ? 0 : i * STEP, ease: EASE_OUT },
  });

  return (
    <div ref={ref} className={className}>
      <div className="grid gap-12 lg:grid-cols-[0.8fr_1.4fr] lg:gap-20">
        {/* ---------------- totals ---------------- */}
        <dl className="grid content-start gap-8">
          {totals.map((t, i) => (
            <motion.div key={t.label} className="border-t border-stone-line pt-5" {...enter(i)}>
              <dt className="sr-only">{t.label}</dt>
              <dd className="font-display text-[clamp(2.25rem,4.4vw,3.25rem)] font-semibold leading-none tracking-[-0.03em] tabular-nums text-ink">
                {t.value}
              </dd>
              <dd aria-hidden="true" className="mt-2.5 text-[0.875rem] text-ink-mute">
                {t.label}
              </dd>
            </motion.div>
          ))}
        </dl>

        {/* ---------------- year by year ---------------- */}
        <figure>
          <figcaption className="text-[0.8125rem] font-semibold uppercase tracking-[0.13em] text-ink-mute">
            Trainees placed, by year
          </figcaption>

          <ol
            className="mt-6 grid h-64 grid-cols-6 items-end gap-3 border-b border-ink/25 sm:h-72 sm:gap-5"
            onMouseLeave={() => setActive(null)}
          >
            {years.map((y, i) => {
              const lit = i === (active ?? best);
              return (
                <li key={y.year} className="flex h-full flex-col justify-end">
                  <button
                    type="button"
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    onBlur={() => setActive(null)}
                    aria-label={`${y.year}: ${count(y.placed)} placed, ${y.rate}%`}
                    className="group flex h-full flex-col items-center justify-end outline-none"
                  >
                    <span
                      className={`mb-2 text-center text-[0.8125rem] font-semibold tabular-nums transition-colors duration-200 ${lit ? "text-ink" : "text-ink-mute"}`}
                    >
                      {count(y.placed)}
                    </span>
                    <motion.span
                      aria-hidden="true"
                      className={`block w-full max-w-[3.25rem] origin-bottom rounded-t-[4px] transition-colors duration-200 group-focus-visible:ring-2 group-focus-visible:ring-ember-500 ${
                        lit ? "bg-ember-500" : "bg-royal-500/80"
                      }`}
                      style={{ height: `${(y.placed / most) * 82}%` }}
                      initial={{ transform: still ? "scaleY(1)" : "scaleY(0)", opacity: still ? 0 : 1 }}
                      animate={on ? { transform: "scaleY(1)", opacity: 1 } : undefined}
                      transition={{ duration: still ? 0.2 : 0.7, delay: still ? 0 : 0.1 + i * STEP, ease: EASE_OUT }}
                    />
                  </button>
                </li>
              );
            })}
          </ol>

          <ol aria-hidden="true" className="mt-3 grid grid-cols-6 gap-3 sm:gap-5">
            {years.map((y, i) => (
              <li
                key={y.year}
                className={`text-center text-[0.8125rem] tabular-nums transition-colors duration-200 ${
                  i === (active ?? best) ? "font-semibold text-ink" : "text-ink-mute"
                }`}
              >
                {y.year}
              </li>
            ))}
          </ol>

          {/* the year in focus, in a line */}
          <p className="mt-6 text-[0.9375rem] leading-relaxed text-ink-soft" aria-live="polite">
            <span className="font-semibold text-ink">{shown.year}</span> — {count(shown.placed)} trainees placed through{" "}
            {shown.drives} drives, {shown.rate}% of the batch, packages up to {lakh(shown.pkg)} a year.
          </p>

          {/* the same numbers, for screen readers */}
          <table className="sr-only">
            <caption>ITI placements by year</caption>
            <thead>
              <tr>
                <th>Year</th>
                <th>Drives</th>
                <th>Trainees placed</th>
                <th>Placement rate</th>
                <th>Package (₹ a year)</th>
              </tr>
            </thead>
            <tbody>
              {years.map((y) => (
                <tr key={y.year}>
                  <td>{y.year}</td>
                  <td>{y.drives}</td>
                  <td>{y.placed}</td>
                  <td>{y.rate}%</td>
                  <td>{y.pkg}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </figure>
      </div>

      {/* ---------------- recruiters ---------------- */}
      <motion.div className="mt-14 border-t border-stone-line pt-6 lg:mt-16" {...enter(3)}>
        <p className="text-[0.8125rem] font-semibold uppercase tracking-[0.13em] text-ink-mute">
          Trainees placed with
        </p>
        <ul className="mt-4 flex flex-wrap gap-x-2 gap-y-2.5">
          {recruiters.map((r) => (
            <li
              key={r}
              className="rounded-full border border-stone-line bg-white px-3 py-1 text-[0.8125rem] font-medium text-ink-soft transition-colors duration-200 hover:border-ink/30 hover:text-ink"
            >
              {r}
            </li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
}
