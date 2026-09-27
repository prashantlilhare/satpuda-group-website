import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { Eye, Lightbulb, NotebookPen, Presentation } from "lucide-react";

const STAGES = [
  { title: "Plan", sub: "the lesson", Icon: NotebookPen },
  { title: "Teach", sub: "a real class", Icon: Presentation },
  { title: "Observe", sub: "by a mentor", Icon: Eye },
  { title: "Reflect", sub: "and improve", Icon: Lightbulb },
];

const N = STAGES.length;
const EASE = [0.16, 1, 0.3, 1];
/* How long the highlight rests on each stage. */
const HOLD_MS = 2200;

/**
 * The practice loop, small: plan, teach, observe, reflect.
 *
 * Four stops joined by a line, and an arrow running from the last back to
 * the first — the reflection goes into the next plan. It draws itself in
 * once, then a highlight walks slowly round the loop: the current stage
 * lights up in the accent with a soft halo, the line fills up to it, and
 * on "Reflect" the return arrow lights to show where it goes next.
 * Pointing at a stage lights that one and holds there. It only moves while
 * on screen; reduced motion keeps the hover and drops the walk.
 */
export function TeachingCycle({ className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { margin: "0px 0px -15% 0px" });
  const seen = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });
  const still = useReducedMotion();
  const on = seen || still;
  const [active, setActive] = useState(0);
  const [held, setHeld] = useState(false);

  useEffect(() => {
    if (!inView || still || held) return;
    const t = setTimeout(() => setActive((a) => (a + 1) % N), HOLD_MS);
    return () => clearTimeout(t);
  }, [inView, still, held, active]);

  const t = (delay, duration = 0.5) => (still ? { duration: 0 } : { duration, delay, ease: EASE });
  const returning = active === N - 1;

  return (
    <div ref={ref} className={`relative pb-6 ${className}`} onMouseLeave={() => setHeld(false)}>
      <ol className="relative grid grid-cols-4">
        {/* the line through the four stops, filled up to the current one */}
        <motion.span
          aria-hidden="true"
          className="absolute left-[12.5%] right-[12.5%] top-6 h-[2px] origin-left rounded-full bg-white/10"
          initial={{ scaleX: 0 }}
          animate={on ? { scaleX: 1 } : undefined}
          transition={t(0.2, 1.1)}
        >
          <motion.span
            className="absolute inset-0 origin-left rounded-full bg-gradient-to-r from-ember-500 to-amber-300"
            initial={false}
            animate={{ scaleX: active / (N - 1) }}
            transition={{ duration: still ? 0 : 0.9, ease: EASE }}
          />
        </motion.span>

        {STAGES.map(({ title, sub, Icon }, i) => {
          const now = i === active;
          const done = i < active;
          return (
            <motion.li
              key={title}
              className="relative flex cursor-default flex-col items-center text-center"
              initial={{ opacity: 0, y: 10 }}
              animate={on ? { opacity: 1, y: 0 } : undefined}
              transition={t(0.2 + i * 0.28)}
              onMouseEnter={() => {
                setHeld(true);
                setActive(i);
              }}
            >
              <motion.span
                className={`relative flex h-12 w-12 items-center justify-center rounded-full ring-1 transition-colors duration-500 ${
                  now
                    ? "bg-ember-500 text-white ring-ember-400"
                    : done
                      ? "bg-ember-500/15 text-ember-300 ring-ember-400/40"
                      : "bg-royal-800 text-white/60 ring-white/15"
                }`}
                animate={{ scale: now ? 1.12 : 1 }}
                transition={{ duration: still ? 0 : 0.5, ease: EASE }}
              >
                {/* a soft halo breathing out of the current stage */}
                {now && !still && (
                  <motion.span
                    aria-hidden="true"
                    className="absolute inset-0 rounded-full bg-ember-500"
                    initial={{ scale: 1, opacity: 0.45 }}
                    animate={{ scale: 1.8, opacity: 0 }}
                    transition={{ duration: 1.6, ease: "easeOut", repeat: Infinity }}
                  />
                )}
                <Icon className="relative h-5 w-5" strokeWidth={1.8} />
              </motion.span>
              <span
                className={`mt-3 font-display text-[0.875rem] font-semibold transition-colors duration-500 ${
                  now ? "text-white" : "text-white/60"
                }`}
              >
                {title}
              </span>
              <span
                className={`mt-0.5 text-[0.75rem] leading-tight transition-colors duration-500 ${
                  now ? "text-amber-200" : "text-white/40"
                }`}
              >
                {sub}
              </span>
            </motion.li>
          );
        })}
      </ol>

      {/* back from reflect to plan — lights up when the loop is about to close */}
      <div className="relative mx-[12.5%] mt-2 h-6">
        <svg aria-hidden="true" viewBox="0 0 300 32" preserveAspectRatio="none" className="absolute inset-0 h-full w-full overflow-visible">
          <motion.path
            d="M300 2 C300 28 0 28 0 2"
            fill="none"
            strokeWidth="1.5"
            className={`transition-[stroke] duration-500 ${returning ? "stroke-amber-300" : "stroke-white/25"}`}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={on ? { pathLength: 1, opacity: 1 } : undefined}
            transition={t(1.4, 0.9)}
          />
        </svg>
        <motion.span
          aria-hidden="true"
          className={`absolute -left-[5px] -top-[3px] h-0 w-0 border-x-[5px] border-b-[7px] border-x-transparent transition-colors duration-500 ${
            returning ? "border-b-amber-300" : "border-b-white/25"
          }`}
          initial={{ opacity: 0, scale: 0 }}
          animate={on ? { opacity: 1, scale: 1 } : undefined}
          transition={t(2.2, 0.3)}
        />
        <motion.span
          className={`absolute inset-x-0 top-full mt-1 text-center text-[0.75rem] italic transition-colors duration-500 ${
            returning ? "text-amber-200" : "text-white/45"
          }`}
          initial={{ opacity: 0 }}
          animate={on ? { opacity: 1 } : undefined}
          transition={t(2.1)}
        >
          into the next lesson
        </motion.span>
      </div>
    </div>
  );
}
