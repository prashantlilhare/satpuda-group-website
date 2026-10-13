import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { Award, GraduationCap, Trophy } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1];
/* How long the highlight rests on each row of the result sheet. */
const HOLD_MS = 2200;

const MEDAL = ["bg-amber-400", "bg-stone-300", "bg-amber-700/70"];
const PLACE = ["1st", "2nd", "3rd"];

/**
 * The school's results, laid out like a result sheet.
 *
 * Two ruled columns — the Class X and Class XII toppers of a board year —
 * where each percentage bar fills once as the sheet comes into view. After
 * that a soft highlight steps slowly down the six rows, the way a finger
 * runs down a notice-board list; pointing at a row holds it there. Beside
 * the sheet, the entrance results; under both, a strip of sports prints. It only moves while
 * on screen; reduced motion keeps the hover and drops the walk.
 */
export function SchoolResults({ board, entrance, selections, sport = [], onView, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { margin: "0px 0px -15% 0px" });
  const seen = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });
  const still = useReducedMotion();
  const on = seen || still;

  const rows = board.classes.flatMap((c) => c.toppers);
  const [active, setActive] = useState(0);
  const [held, setHeld] = useState(false);

  useEffect(() => {
    if (!inView || still || held) return;
    const t = setTimeout(() => setActive((a) => (a + 1) % rows.length), HOLD_MS);
    return () => clearTimeout(t);
  }, [inView, still, held, active, rows.length]);

  const t = (delay, duration = 0.6) => (still ? { duration: 0 } : { duration, delay, ease: EASE });

  return (
    <div ref={ref} className={className}>
      <div className="grid gap-6 lg:grid-cols-[1.35fr_1fr] lg:gap-8">
        {/* ---------------- the board result sheet ---------------- */}
        <motion.div
          className="relative overflow-hidden rounded-sm border border-stone-line bg-white p-6 shadow-[0_18px_34px_-24px_rgba(20,34,68,0.4)] sm:p-8"
          initial={{ opacity: 0, y: 14 }}
          animate={on ? { opacity: 1, y: 0 } : undefined}
          transition={t(0)}
          onMouseLeave={() => setHeld(false)}
        >
          {/* the red margin rule of an exercise-book page */}
          <span aria-hidden="true" className="absolute inset-y-0 left-4 w-px bg-ember-500/40 sm:left-5" />

          <div className="flex items-center gap-3 pl-3">
            <GraduationCap className="h-5 w-5 text-royal-600" strokeWidth={1.8} />
            <p className="font-display text-[1.0625rem] font-semibold text-ink">{board.title}</p>
          </div>

          <div className="mt-6 grid gap-8 pl-3 sm:grid-cols-2 sm:gap-10">
            {board.classes.map((c, ci) => (
              <div key={c.label}>
                <p className="text-[0.75rem] font-semibold uppercase tracking-[0.14em] text-ink-mute">{c.label}</p>
                <ol className="mt-3 divide-y divide-stone-line/70">
                  {c.toppers.map((s, i) => {
                    const index = ci * c.toppers.length + i;
                    const now = index === active;
                    return (
                      <li
                        key={s.name}
                        className="relative py-3"
                        onMouseEnter={() => {
                          setHeld(true);
                          setActive(index);
                        }}
                      >
                        {now && (
                          <motion.span
                            layoutId="result-row"
                            aria-hidden="true"
                            className="absolute -inset-x-2 inset-y-0.5 rounded-sm bg-amber-100/70"
                            transition={{ duration: still ? 0 : 0.7, ease: EASE }}
                          />
                        )}
                        <div className="relative flex items-baseline gap-3">
                          <span
                            aria-hidden="true"
                            className={`h-2.5 w-2.5 shrink-0 translate-y-[-1px] rounded-full ${MEDAL[i]}`}
                          />
                          <span className="w-8 shrink-0 text-[0.75rem] font-semibold text-ink-mute">{PLACE[i]}</span>
                          <span className={`flex-1 font-display text-[0.9375rem] font-semibold transition-colors duration-500 ${now ? "text-ink" : "text-ink-soft"}`}>
                            {s.name}
                          </span>
                          <span className={`tabular-nums text-[0.9375rem] font-semibold transition-colors duration-500 ${now ? "text-ember-600" : "text-ink-soft"}`}>
                            {s.score}%
                          </span>
                        </div>
                        {/* the mark, as a share of a hundred */}
                        <span aria-hidden="true" className="relative mt-2 ml-[3.25rem] block h-[3px] rounded-full bg-stone-line/60">
                          <motion.span
                            className="absolute inset-y-0 left-0 origin-left rounded-full bg-gradient-to-r from-royal-500 to-ember-500"
                            style={{ width: `${s.score}%` }}
                            initial={{ scaleX: 0 }}
                            animate={on ? { scaleX: 1 } : undefined}
                            transition={t(0.3 + index * 0.12, 1.1)}
                          />
                        </span>
                      </li>
                    );
                  })}
                </ol>
              </div>
            ))}
          </div>
        </motion.div>

          {/* ---------------- entrance results ---------------- */}
          <motion.div
            className="flex flex-col rounded-sm border border-stone-line bg-white p-6 shadow-[0_18px_34px_-24px_rgba(20,34,68,0.4)] sm:p-8"
            initial={{ opacity: 0, y: 14 }}
            animate={on ? { opacity: 1, y: 0 } : undefined}
            transition={t(0.15)}
          >
            <div className="flex items-center gap-3">
              <Award className="h-5 w-5 text-ember-500" strokeWidth={1.8} />
              <p className="font-display text-[1.0625rem] font-semibold text-ink">{entrance.title}</p>
            </div>
            <ul className="mb-6 mt-5 space-y-3">
              {entrance.items.map((s) => (
                <li key={s.name} className="group flex items-baseline justify-between gap-4 text-[0.9375rem]">
                  <span className="font-semibold text-ink-soft transition-colors group-hover:text-ink">{s.name}</span>
                  <span className="text-right text-[0.8125rem] text-ink-mute transition-colors group-hover:text-ember-600">
                    {s.note}
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-auto border-t border-stone-line pt-4 text-[0.875rem] leading-relaxed text-ink-mute">
              <span className="font-semibold text-ink-soft">{selections.title}:</span> {selections.names.join(" and ")}
            </p>
          </motion.div>
      </div>

      {/* ---------------- sport ---------------- */}
      <ul className="mt-6 grid gap-6 sm:grid-cols-3 lg:mt-8 lg:gap-8">
        {sport.map((img, i) => (
          <motion.li
            key={img.id}
            className="group relative overflow-hidden rounded-sm bg-royal-900"
            initial={{ opacity: 0, y: 14 }}
            animate={on ? { opacity: 1, y: 0 } : undefined}
            transition={t(0.3 + i * 0.12)}
          >
            <button
              type="button"
              onClick={(e) => onView?.({ src: img.src, alt: img.alt }, e.currentTarget.getBoundingClientRect())}
              aria-label={`View larger: ${img.caption}`}
              className="block aspect-[4/3] w-full cursor-zoom-in overflow-hidden outline-none focus-visible:ring-2 focus-visible:ring-ember-500"
            >
              <img
                src={img.src}
                srcSet={img.srcSet}
                sizes="(min-width: 640px) 33vw, 100vw"
                alt={img.alt}
                loading="lazy"
                decoding="async"
                style={{ objectPosition: img.focus }}
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
              />
            </button>
            <p className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center gap-2.5 bg-gradient-to-t from-royal-950/85 to-transparent px-5 pb-4 pt-10 text-[0.875rem] font-semibold text-white">
              {i === 0 && <Trophy className="h-4 w-4 shrink-0 text-amber-300" strokeWidth={2} />}
              {img.caption}
            </p>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}
