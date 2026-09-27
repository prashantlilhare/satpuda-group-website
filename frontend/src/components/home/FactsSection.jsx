import { motion } from "motion/react";
import { Eyebrow, Fact, Reveal, SplitText } from "../ui/Primitives";
import { GrowthTimeline } from "./GrowthTimeline";
import { stagger } from "../ui/stagger";

/**
 * Deliberately restricted to figures that can be checked against an official
 * source or simply counted from this site. No placement percentages, no
 * enrolment totals, no rankings.
 */
const facts = [
  { value: "1999", label: "Educating since", sub: "The group's first institution opened in Balaghat" },
  { value: "04", label: "Institutions", sub: "School, ITI, teacher education, engineering" },
  { value: "10", label: "Engineering branches", sub: "5 degree, 5 diploma disciplines" },
  { value: "10", label: "Acre campus", sub: "Teaching blocks, labs, library and grounds" },
];

const EASE = [0.16, 1, 0.3, 1];

const grid = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const card = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

/* The ember stroke on each figure's hairline: drawn in on arrival, then
   runs the full width while the figure is hovered. */
const rule = {
  hidden: { scaleX: 0, width: "3rem" },
  show: { scaleX: 1, width: "3rem", transition: { duration: 0.8, ease: EASE, delay: 0.15 } },
  hover: { width: "100%", transition: { duration: 0.45, ease: EASE } },
};

export function FactsSection() {
  return (
      <section className="section on-dark bg-royal-900 text-white">
        <div className="shell">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
            {/* ---------- facts ---------- */}
            <div className="lg:sticky-aside">
              <Reveal>
                <Eyebrow>The group at a glance</Eyebrow>
              </Reveal>
              <Reveal delay={stagger(1)}>
                <SplitText as="h2" className="t-h2 mt-5 block max-w-md text-white">
                  Figures we can stand behind.
                </SplitText>
              </Reveal>

              <motion.div
                className="mt-8 grid grid-cols-2 gap-x-8 gap-y-8 sm:gap-x-10"
                variants={grid}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "0px 0px -10% 0px" }}
              >
                {facts.map((f) => (
                  <motion.div
                    key={f.label}
                    variants={card}
                    whileHover="hover"
                    className="relative cursor-default border-t border-white/18 pt-5"
                  >
                    <motion.span
                      aria-hidden="true"
                      variants={rule}
                      className="absolute -top-px left-0 h-0.5 origin-left bg-ember-500"
                    />
                    <motion.div
                      variants={{ hidden: { y: 0 }, show: { y: 0 }, hover: { y: -3 } }}
                      transition={{ type: "spring", stiffness: 300, damping: 22 }}
                    >
                      <Fact value={f.value} label={f.label} sub={f.sub} dark />
                    </motion.div>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* ---------- milestones ---------- */}
            <div className="lg:border-l lg:border-white/12 lg:pl-10">
              <GrowthTimeline />
            </div>
          </div>
        </div>
      </section>
  );
}
