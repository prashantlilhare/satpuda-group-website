import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useInView, useReducedMotion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { Eyebrow, Reveal, SplitText } from "../ui/Primitives";
import { PlacementRow } from "../shared/PlacementMarquee";
import { groupAchievements } from "../../data/achievements";
import { placedStudents } from "../../data/placements";
import { stagger } from "../ui/stagger";

/* A strong ease-out: the movement lands at once and then settles. */
const EASE_OUT = [0.23, 1, 0.32, 1];
const STEP = 0.06;

/**
 * What the group's students go on to do, early on the homepage: one
 * headline from each institution, each linking to the page that shows the
 * rest, then a row of placed engineering students drifting past with their
 * packages.
 *
 * The headlines arrive once in a short stagger (transform and opacity only);
 * pointing at one nudges its arrow. The row is the same CSS drift as the
 * B.Tech page, stopped on hover and off screen.
 */
export function AchievementsSection() {
  const ref = useRef(null);
  const rowRef = useRef(null);
  const seen = useInView(ref, { once: true, margin: "0px 0px -80px 0px" });
  const rowOnScreen = useInView(rowRef);
  const still = useReducedMotion();
  /* Under reduced motion nothing waits for the scroll. */
  const on = seen || still;

  return (
    <section className="section on-dark overflow-x-clip bg-royal-950 text-white">
      <div className="shell">
        <div className="max-w-2xl">
          <Reveal>
            <Eyebrow>Achievements</Eyebrow>
          </Reveal>
          <Reveal delay={stagger(1)}>
            <SplitText as="h2" className="t-h2 mt-5 block text-white">
              What Satpuda students go on to do.
            </SplitText>
          </Reveal>
          <Reveal delay={stagger(2)}>
            <p className="mt-6 text-[1.0625rem] leading-relaxed text-white/70">
              Placements, board results and selections — one from each institution, with the
              names behind them.
            </p>
          </Reveal>
        </div>

        <ul ref={ref} className="section-body grid grid-cols-2 gap-x-6 gap-y-10 sm:gap-x-8 lg:grid-cols-4">
          {groupAchievements.map((a, i) => (
            <motion.li
              key={a.label}
              initial={{ opacity: 0, transform: still ? "none" : "translateY(8px)" }}
              animate={on ? { opacity: 1, transform: "translateY(0px)" } : undefined}
              transition={{ duration: still ? 0.2 : 0.45, delay: still ? 0 : i * STEP, ease: EASE_OUT }}
            >
              <Link to={a.to} className="group block border-t border-white/15 pt-5 outline-none">
                <p className="flex items-center justify-between text-[0.75rem] font-semibold uppercase tracking-[0.13em] text-ember-300">
                  {a.institution}
                  <ArrowUpRight
                    aria-hidden="true"
                    className="h-4 w-4 text-white/40 transition-[transform,color] duration-200 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white group-focus-visible:text-white"
                    strokeWidth={1.8}
                  />
                </p>
                <p className="mt-4 font-display text-[clamp(2rem,4.6vw,3.5rem)] font-semibold leading-none tracking-[-0.03em] tabular-nums text-white">
                  {a.value}
                  {a.unit && <span className="ml-1 text-[0.42em] tracking-normal text-ember-300">{a.unit}</span>}
                </p>
                <p className="mt-3 text-[0.9375rem] font-medium text-white/85">{a.label}</p>
                <p className="mt-1 text-[0.8125rem] text-white/50">{a.who}</p>
              </Link>
            </motion.li>
          ))}
        </ul>
      </div>

      {/* placed students, the full width of the window */}
      <div ref={rowRef} className="mt-16 lg:mt-20">
        <PlacementRow items={placedStudents} paused={!rowOnScreen} dark />
      </div>

      <div className="shell mt-8 flex flex-wrap items-center justify-between gap-4 text-[0.875rem] text-white/55">
        <p>Placed from Satpuda College of Engineering & Polytechnic — package and company on each card.</p>
        <Link
          to="/institutes/btech-polytechnic"
          className="font-semibold text-white underline decoration-white/30 underline-offset-4 transition-colors duration-200 hover:decoration-white"
        >
          See all placements
        </Link>
      </div>
    </section>
  );
}
