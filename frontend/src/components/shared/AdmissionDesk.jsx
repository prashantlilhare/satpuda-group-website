import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useInView, useReducedMotion } from "motion/react";
import { ArrowUpRight, Phone } from "lucide-react";
import { Eyebrow, Reveal, SplitText } from "../ui/Primitives";
import { contact } from "../../data/site";
import { stagger } from "../ui/stagger";

const EASE = [0.16, 1, 0.3, 1];

/* Who can apply for what. Entry points and durations follow the national
   norms the programmes run under (CBSE, NCVT, DTE MP / AICTE, NCTE);
   seats, fees and dates change every session and are left to the office. */
const PROGRAMMES = [
  { name: "School (CBSE)", org: "Satpuda Valley Public School", entry: "Class-wise", length: "Class 1 onwards", to: "/institutes/school" },
  { name: "ITI trades", org: "Satpuda ITI, Garra", entry: "After Class 10", length: "1–2 years", to: "/institutes/iti" },
  { name: "Diploma (Polytechnic)", org: "College of Engineering & Polytechnic", entry: "After Class 10", length: "3 years", to: "/institutes/btech-polytechnic" },
  { name: "B.Tech", org: "College of Engineering & Polytechnic", entry: "After Class 12 (PCM)", length: "4 years", to: "/institutes/btech-polytechnic" },
  { name: "D.Ed", org: "Teacher education", entry: "After Class 12", length: "2 years", to: "/institutes/ded-bed" },
  { name: "B.Ed", org: "Teacher education", entry: "After graduation", length: "2 years", to: "/institutes/ded-bed" },
];

const STEPS = [
  {
    title: "Pick the programme",
    body: "Use the list above to see which programmes the student is eligible for.",
  },
  {
    title: "Call or visit the office",
    body: `Speak to the admission office — ${contact.officeHours}.`,
  },
  {
    title: "Counselling, where it applies",
    body: "B.Tech and diploma seats are allotted through the Madhya Pradesh counselling process conducted by DTE.",
  },
  {
    title: "Documents and confirmation",
    body: "Bring the originals with a set of photocopies for verification, and the office confirms the admission.",
  },
];

const DOCUMENTS = [
  "Class 10 mark sheet",
  "Class 12 / qualifying mark sheet",
  "Transfer & migration certificate",
  "Domicile certificate",
  "Caste & income certificate, if applicable",
  "Aadhaar card",
  "Passport-size photographs",
];

/* How long the checklist rests, stamped, before it is filled in again. */
const ROUND_MS = 10000;
const TICK_S = 0.42;

/**
 * Admissions at a glance: a helpline card and one row per programme —
 * who can apply, and for how long — each leading to its institute page.
 * Sits where the enquiry form used to be.
 */
export function AdmissionGlance() {
  return (
    <div>
      <Reveal>
        <Eyebrow>Admissions</Eyebrow>
      </Reveal>
      <SplitText as="h2" delay={90} className="t-h2 mt-5 block text-ink">
        Admissions at a glance.
      </SplitText>

      {/* the helpline */}
      <Reveal delay={stagger(2)}>
        <div className="mt-9 flex flex-col gap-5 rounded-2xl bg-royal-900 p-6 text-white sm:flex-row sm:items-center sm:justify-between sm:p-7">
          <div className="flex items-center gap-4">
            <motion.span
              aria-hidden="true"
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-ember-500"
              animate={{ rotate: [0, -14, 12, -10, 8, 0, 0] }}
              transition={{ duration: 1.2, times: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 1], repeat: Infinity, repeatDelay: 1.6 }}
            >
              <Phone className="h-5 w-5" />
            </motion.span>
            <div>
              <p className="font-display text-[1.125rem] font-semibold">Admission helpline</p>
              <p className="mt-0.5 text-[0.8125rem] text-white/65">{contact.officeHours}</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {contact.phones.map((p) => (
              <a
                key={p.href}
                href={p.href}
                className="rounded-full bg-white px-4 py-2 text-[0.875rem] font-semibold tabular-nums text-royal-800 transition-colors duration-300 hover:bg-ember-50 hover:text-ember-700"
              >
                {p.label}
              </a>
            ))}
          </div>
        </div>
      </Reveal>

      {/* who can apply for what */}
      <ul className="mt-8">
        {PROGRAMMES.map((p, i) => (
          <motion.li
            key={p.name}
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "0px 0px -8% 0px" }}
            transition={{ duration: 0.6, ease: EASE, delay: i * 0.07 }}
          >
            <Link
              to={p.to}
              className="group relative grid grid-cols-[1fr_auto] items-center gap-x-4 gap-y-1 overflow-hidden border-t border-stone-line px-1 py-4 transition-colors duration-300 sm:grid-cols-[1.2fr_1fr_auto] sm:px-3"
            >
              {/* a wash that sweeps in from the left on hover */}
              <span aria-hidden="true" className="absolute inset-0 -z-10 origin-left scale-x-0 bg-royal-50 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100" />
              <span>
                <span className="block font-display text-[1.0625rem] font-semibold text-ink transition-colors duration-300 group-hover:text-royal-700">
                  {p.name}
                </span>
                <span className="block text-[0.8125rem] text-ink-mute">{p.org}</span>
              </span>
              <span className="col-start-1 row-start-2 text-[0.8125rem] font-semibold text-ember-600 sm:col-start-2 sm:row-start-1 sm:text-[0.875rem]">
                {p.entry}
                <span className="font-normal text-ink-mute"> · {p.length}</span>
              </span>
              <ArrowUpRight
                aria-hidden="true"
                className="col-start-2 row-span-2 row-start-1 h-5 w-5 text-ink-mute transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ember-600 sm:col-start-3 sm:row-span-1"
              />
            </Link>
          </motion.li>
        ))}
      </ul>
      <p className="border-t border-stone-line pt-4 text-[0.8125rem] leading-relaxed text-ink-mute">
        Seats, fees and session dates change every year — the admission office gives the current position.
      </p>
    </div>
  );
}

/* The clipboard: documents ticked off one by one in pen, then a rubber
   stamp comes down on the page. */
function Checklist() {
  const ref = useRef(null);
  const inView = useInView(ref, { margin: "0px 0px -20% 0px" });
  const still = useReducedMotion();
  const [round, setRound] = useState(0);

  /* Fill the list in again every so often while it is on screen. */
  useEffect(() => {
    if (!inView || still) return;
    const t = setInterval(() => setRound((r) => r + 1), ROUND_MS);
    return () => clearInterval(t);
  }, [inView, still]);

  const on = inView || still;
  const stampAt = still ? 0 : DOCUMENTS.length * TICK_S + 0.35;

  return (
    <div ref={ref} className="relative mx-auto w-full max-w-md">
      {/* the board */}
      <div className="relative rounded-[1.75rem] bg-[linear-gradient(160deg,#8a5a34,#6b4226)] p-4 pt-10 shadow-[0_40px_70px_-35px_rgba(0,0,0,0.8)] sm:p-5 sm:pt-11">
        {/* the clip */}
        <span aria-hidden="true" className="absolute left-1/2 top-0 z-[2] h-11 w-32 -translate-x-1/2 -translate-y-3 rounded-xl bg-[linear-gradient(to_bottom,#e7e5e4,#a8a29e)] shadow-[0_6px_12px_-4px_rgba(0,0,0,0.5)]">
          <span className="absolute left-1/2 top-2 h-3 w-12 -translate-x-1/2 rounded-full bg-stone-500/60" />
        </span>

        {/* the page */}
        <motion.div
          key={round}
          className="relative overflow-hidden rounded-lg bg-[#fffdf8] px-5 pb-7 pt-6 sm:px-7"
          animate={on && !still ? { x: [0, 0, -4, 4, -2, 0] } : undefined}
          transition={{ duration: 0.45, times: [0, 0.01, 0.25, 0.5, 0.75, 1], delay: stampAt + 0.05 }}
        >
          <p className="font-display text-[1.25rem] font-semibold italic tracking-[-0.01em] text-royal-800">
            Documents to bring
          </p>
          <ul className="mt-4 space-y-3">
            {DOCUMENTS.map((d, i) => (
              <li key={d} className="flex items-start gap-3 text-[0.9375rem] leading-snug text-ink">
                <span className="relative mt-0.5 h-5 w-5 shrink-0 rounded-[5px] border-2 border-royal-300">
                  <svg viewBox="0 0 24 24" aria-hidden="true" className="absolute -left-0.5 -top-1.5 h-7 w-7 overflow-visible">
                    <motion.path
                      d="M4 13 L10 19 L22 3"
                      fill="none"
                      stroke="var(--color-ember-500)"
                      strokeWidth="3.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      initial={{ pathLength: still ? 1 : 0 }}
                      animate={{ pathLength: on ? 1 : 0 }}
                      transition={{ duration: still ? 0 : 0.3, ease: "easeOut", delay: still ? 0 : 0.25 + i * TICK_S }}
                    />
                  </svg>
                </span>
                <span>{d}</span>
              </li>
            ))}
          </ul>

          {/* the stamp */}
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute bottom-6 right-4 flex h-28 w-28 flex-col items-center justify-center rounded-full border-[3px] border-ember-600 text-center text-ember-600 mix-blend-multiply sm:right-6"
            style={{ boxShadow: "inset 0 0 0 5px #fffdf8, inset 0 0 0 7px var(--color-ember-600)" }}
            initial={{ scale: still ? 1 : 2.6, opacity: still ? 0.85 : 0, rotate: -26 }}
            animate={on ? { scale: 1, opacity: 0.85, rotate: -14 } : undefined}
            transition={still ? { duration: 0 } : { type: "spring", stiffness: 520, damping: 22, delay: stampAt }}
          >
            <span className="font-display text-[1.375rem] font-extrabold leading-none tracking-[0.06em]">READY</span>
            <span className="mt-1 text-[0.5625rem] font-bold uppercase tracking-[0.2em]">to apply</span>
          </motion.div>
        </motion.div>
      </div>
      <p className="mt-4 text-center text-[0.8125rem] text-white/50">
        The admission office confirms the exact list for each programme.
      </p>
    </div>
  );
}

/**
 * "Before you visit": how an admission here goes, step by step, beside a
 * clipboard of the documents to bring.
 */
export function AdmissionSteps() {
  return (
    <section className="section on-dark overflow-x-clip bg-royal-900 text-white">
      <div className="shell">
        <div className="grid items-center gap-14 lg:grid-cols-[1fr_0.9fr] lg:gap-20">
          <div>
            <Reveal>
              <Eyebrow>Before you visit</Eyebrow>
            </Reveal>
            <SplitText as="h2" delay={90} className="t-h2 mt-5 block max-w-lg text-white">
              How an admission here goes.
            </SplitText>

            <ol className="mt-10">
              {STEPS.map((s, i) => (
                <Reveal key={s.title} delay={stagger(i)}>
                  <li className="grid grid-cols-[2.75rem_1fr] gap-4 border-t border-white/15 py-6 sm:gap-6">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full border border-ember-400/60 font-display text-xs font-semibold tabular-nums text-ember-300">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="font-display text-[1.1875rem] font-semibold tracking-[-0.018em] text-white">{s.title}</h3>
                      <p className="mt-2 text-[0.9375rem] leading-[1.7] text-white/65">{s.body}</p>
                    </div>
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>

          <Checklist />
        </div>
      </div>
    </section>
  );
}
