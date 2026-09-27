import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import {
  ArrowUpRight,
  Backpack,
  BookOpen,
  Cog,
  Fuel,
  GraduationCap,
  Layers,
  Monitor,
  Presentation,
  School,
  Wrench,
  Zap,
} from "lucide-react";
import { Eyebrow, Reveal, SplitText } from "../ui/Primitives";
import { itiTrades } from "../../data/programs";
import { stagger } from "../ui/stagger";

const EASE = [0.16, 1, 0.3, 1];

const trade = (name) => itiTrades.find((t) => t.name === name);

/* Every programme on campus, written from the data files and the national
   norms they cite. Nothing session-specific — no fees, seats or dates. */
const programmes = {
  school: {
    icon: School,
    kicker: "Satpuda Valley Public School",
    title: "CBSE schooling",
    duration: "Class-wise",
    eligibility: "Admission criteria for each class are confirmed at the school office.",
    to: "/institutes/school",
  },
  diploma: {
    icon: Cog,
    kicker: "Polytechnic · DTE approved",
    title: "Diploma in Engineering",
    duration: "3 years",
    eligibility: "Pass in Class 10 from a recognised board. Five branches.",
    to: "/institutes/btech-polytechnic",
  },
  lateral: {
    icon: Layers,
    kicker: "Polytechnic · Lateral entry",
    title: "Diploma — direct 2nd year",
    duration: "2 years",
    eligibility: "May be available for ITI and 10+2 candidates. Ask for this session.",
    to: "/institutes/btech-polytechnic",
  },
  btech: {
    icon: GraduationCap,
    kicker: "Engineering · AICTE · RGPV",
    title: "B.Tech — five branches",
    duration: "4 years",
    eligibility: "10+2 with Physics and Mathematics, per AICTE norms. Via MP counselling.",
    to: "/institutes/btech-polytechnic",
  },
  electrician: {
    icon: Zap,
    kicker: "ITI · NCVT",
    title: "Electrician",
    duration: trade("Electrician").duration,
    eligibility: trade("Electrician").eligibility,
    to: "/institutes/iti",
  },
  fitter: {
    icon: Wrench,
    kicker: "ITI · NCVT",
    title: "Fitter",
    duration: trade("Fitter").duration,
    eligibility: trade("Fitter").eligibility,
    to: "/institutes/iti",
  },
  diesel: {
    icon: Fuel,
    kicker: "ITI · NCVT",
    title: "Mechanic Diesel",
    duration: trade("Mechanic Diesel").duration,
    eligibility: trade("Mechanic Diesel").eligibility,
    to: "/institutes/iti",
  },
  copa: {
    icon: Monitor,
    kicker: "ITI · NCVT",
    title: "COPA",
    duration: trade("COPA").duration,
    eligibility: trade("COPA").eligibility,
    to: "/institutes/iti",
  },
  ded: {
    icon: BookOpen,
    kicker: "Teacher education",
    title: "D.Ed — primary teaching",
    duration: "Foundation years",
    eligibility: "Open after Class 12. Confirm the current eligibility with the institution.",
    to: "/institutes/ded-bed",
  },
  bed: {
    icon: Presentation,
    kicker: "Teacher education",
    title: "B.Ed — secondary teaching",
    duration: "For graduates",
    eligibility: "A professional degree for graduates entering secondary teaching.",
    to: "/institutes/ded-bed",
  },
};

const stages = [
  { id: "school", label: "In school", sub: "Class 1 – 9", icon: Backpack, picks: ["school"] },
  {
    id: "class10",
    label: "Passed Class 10",
    sub: "High school",
    icon: School,
    picks: ["diploma", "electrician", "fitter", "diesel", "copa"],
  },
  { id: "iti", label: "Completed ITI", sub: "Trade certificate", icon: Wrench, picks: ["lateral"] },
  {
    id: "pcm",
    label: "Passed 12th (PCM)",
    sub: "Physics & Maths",
    icon: Zap,
    picks: ["btech", "lateral", "ded"],
  },
  { id: "other12", label: "Passed 12th", sub: "Any stream", icon: BookOpen, picks: ["ded", "copa"] },
  { id: "grad", label: "Graduate", sub: "Any degree", icon: GraduationCap, picks: ["bed"] },
];

/* ------------------------------------------------------------------ */

function StageTab({ stage, active, onSelect }) {
  const Icon = stage.icon;
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      onClick={onSelect}
      className={`relative flex items-center gap-3 rounded-xl px-3.5 py-3 text-left transition-colors duration-300 sm:px-4 ${
        active ? "text-royal-900" : "text-white/75 hover:bg-white/[0.06] hover:text-white"
      }`}
    >
      {active && (
        <motion.span
          layoutId="finder-pill"
          className="absolute inset-0 rounded-xl bg-white shadow-[0_18px_40px_-18px_rgba(0,0,0,0.6)]"
          transition={{ type: "spring", stiffness: 420, damping: 34 }}
        />
      )}
      <motion.span
        className={`relative flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
          active ? "bg-ember-500 text-white" : "bg-white/[0.08] text-ember-300"
        }`}
        animate={active ? { rotate: [0, -12, 8, 0], scale: [1, 1.15, 1] } : { rotate: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <Icon aria-hidden="true" className="h-[1.05rem] w-[1.05rem]" />
      </motion.span>
      <span className="relative min-w-0">
        <span className="block text-[0.875rem] font-semibold leading-tight sm:text-[0.9375rem]">
          {stage.label}
        </span>
        <span
          className={`mt-0.5 block text-[0.75rem] leading-tight ${
            active ? "text-ink-mute" : "text-white/45"
          }`}
        >
          {stage.sub}
        </span>
      </span>
    </button>
  );
}

function ProgrammeCard({ id, index }) {
  const p = programmes[id];
  const Icon = p.icon;
  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: 24, scale: 0.94 }}
      animate={{ opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: EASE, delay: index * 0.06 } }}
      exit={{ opacity: 0, scale: 0.92, filter: "blur(4px)", transition: { duration: 0.25 } }}
      transition={{ layout: { type: "spring", stiffness: 380, damping: 34 } }}
    >
      <Link
        to={p.to}
        data-tilt
        className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-5 transition-colors duration-300 hover:border-ember-500/60 hover:bg-white/[0.07] sm:p-6"
      >
        <div className="relative z-[2] flex items-start justify-between gap-4">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-ember-500/15 text-ember-300 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:-rotate-8 group-hover:scale-110 group-hover:bg-ember-500 group-hover:text-white">
            <Icon aria-hidden="true" className="h-5 w-5" />
          </span>
          <span className="rounded-full border border-white/15 px-2.5 py-1 text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-white/70">
            {p.duration}
          </span>
        </div>

        <p className="relative z-[2] mt-5 text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-ember-300">
          {p.kicker}
        </p>
        <h3 className="relative z-[2] mt-1.5 font-display text-[1.1875rem] font-semibold tracking-[-0.015em] text-white">
          {p.title}
        </h3>
        <p className="relative z-[2] mt-2 flex-1 text-[0.875rem] leading-[1.6] text-white/60">
          {p.eligibility}
        </p>

        <span className="relative z-[2] mt-5 inline-flex items-center gap-2 text-[0.8125rem] font-semibold text-white">
          View programme
          <ArrowUpRight
            aria-hidden="true"
            className="h-4 w-4 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </span>
      </Link>
    </motion.li>
  );
}

/** Number that rolls to its new value. */
function RollingCount({ value }) {
  return (
    <span className="relative inline-flex h-[1em] overflow-hidden align-baseline leading-none">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={value}
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ type: "spring", stiffness: 380, damping: 30 }}
        >
          {value}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

/* ------------------------------------------------------------------ */

export function CourseFinder() {
  const [stageId, setStageId] = useState("class10");
  const stage = stages.find((s) => s.id === stageId);
  const { hash } = useLocation();

  /* Deep link from the admissions dock: /#course-finder */
  useEffect(() => {
    if (hash !== "#course-finder") return;
    const t = setTimeout(() => {
      document.getElementById("course-finder")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 120);
    return () => clearTimeout(t);
  }, [hash]);

  return (
    <section
      id="course-finder"
      className="section on-dark relative isolate scroll-mt-20 overflow-hidden bg-royal-950 text-white"
    >
      {/* slow drifting glow behind the panel */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/3 -z-10 h-[34rem] w-[34rem] rounded-full bg-ember-500/10 blur-[120px]"
        animate={{ x: [0, 120, -60, 0], y: [0, 60, 20, 0] }}
        transition={{ duration: 22, ease: "easeInOut", repeat: Infinity }}
      />

      <div className="shell">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.6fr] lg:gap-14">
          {/* ---------- question ---------- */}
          <div>
            <Reveal>
              <Eyebrow>Course finder</Eyebrow>
            </Reveal>
            <Reveal delay={stagger(1)}>
              <SplitText as="h2" className="t-h2 mt-5 block text-white">
                Where is the student today?
              </SplitText>
            </Reveal>
            <Reveal delay={stagger(2)}>
              <p className="mt-6 max-w-md text-[0.9375rem] leading-relaxed text-white/65">
                Pick a stage and see every programme on the Satpuda campus that opens up from
                there.
              </p>
            </Reveal>

            <Reveal delay={stagger(3)}>
              <LayoutGroup id="finder-tabs">
                <div
                  role="tablist"
                  aria-label="Student's current stage"
                  className="mt-8 grid grid-cols-2 gap-1.5 rounded-2xl border border-white/10 bg-white/[0.03] p-1.5 lg:grid-cols-1"
                >
                  {stages.map((s) => (
                    <StageTab
                      key={s.id}
                      stage={s}
                      active={s.id === stageId}
                      onSelect={() => setStageId(s.id)}
                    />
                  ))}
                </div>
              </LayoutGroup>
            </Reveal>
          </div>

          {/* ---------- answer ---------- */}
          <div role="tabpanel" aria-live="polite" className="lg:pt-2">
            <div className="flex flex-wrap items-end justify-between gap-4 border-b border-white/10 pb-5">
              <p className="font-display text-[clamp(2rem,4vw,2.75rem)] font-semibold leading-none tracking-[-0.03em]">
                <span className="text-ember-400">
                  <RollingCount value={String(stage.picks.length).padStart(2, "0")} />
                </span>{" "}
                <span className="text-white">
                  {stage.picks.length === 1 ? "route open" : "routes open"}
                </span>
              </p>
              <AnimatePresence mode="wait" initial={false}>
                <motion.p
                  key={stage.id}
                  className="text-[0.8125rem] font-medium uppercase tracking-[0.14em] text-white/50"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.25 }}
                >
                  After: {stage.label.replace(/^Passed |^Completed /, "")}
                </motion.p>
              </AnimatePresence>
            </div>

            <motion.ul layout className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              <AnimatePresence mode="popLayout">
                {stage.picks.map((id, i) => (
                  <ProgrammeCard key={id} id={id} index={i} />
                ))}
              </AnimatePresence>
            </motion.ul>

            <p className="mt-6 text-[0.8125rem] leading-relaxed text-white/45">
              Eligibility follows AICTE, RGPV, DTE and NCVT norms. Seats, fees and dates change
              every session —{" "}
              <Link to="/contact" className="link-underline font-semibold text-white/75 hover:text-white">
                confirm with the admissions office
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
