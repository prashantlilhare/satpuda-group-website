import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, BadgeCheck, Building2, GraduationCap, MapPin, Phone, School, Search, UserRound } from "lucide-react";
import { Eyebrow, Reveal, SplitText } from "../ui/Primitives";
import { stagger } from "../ui/stagger";
import { useCycle } from "../../hooks/useCycle";
import { jobSahi } from "../../data/brochure";

const EASE = [0.16, 1, 0.3, 1];

/* Who JobSahi is for — the platform's own three doors. */
const audiences = [
  {
    icon: GraduationCap,
    title: "Students & job seekers",
    body: "Register for campus drives and apply to verified jobs — ITI, polytechnic, diploma and engineering.",
  },
  {
    icon: Building2,
    title: "Recruiters",
    body: "Post jobs, shortlist candidates and schedule interviews in one place.",
  },
  {
    icon: School,
    title: "Institutes",
    body: "Run campus placements and connect students with employers.",
  },
];

const steps = ["Create your profile", "Get matched to your skills", "Apply & get hired"];

/* The kinds of listing the app carries, shown on the phone as examples —
   trades and roles our own students train for, not live vacancies. */
const sampleJobs = [
  { role: "Electrician", tag: "ITI", place: "Madhya Pradesh" },
  { role: "CNC Operator", tag: "ITI · Fitter", place: "Pan India" },
  { role: "Diploma Trainee — Mechanical", tag: "Polytechnic", place: "Campus drive" },
  { role: "Site Engineer — Civil", tag: "B.Tech", place: "Pan India" },
  { role: "Mechanic Diesel", tag: "ITI", place: "Madhya Pradesh" },
];

/**
 * A phone with the app open: a search bar and a short stack of job cards,
 * a new one sliding in at the top every few seconds — the "jobs in your
 * pocket" idea, shown rather than said. Decorative; the listings are
 * examples of the trades the group trains for.
 */
function PhoneMock() {
  const still = useReducedMotion();
  const [ref, active] = useCycle(sampleJobs.length, 2400);
  const shown = [0, 1, 2].map((k) => sampleJobs[(active + k) % sampleJobs.length]);

  return (
    <div ref={ref} aria-hidden="true" className="relative mx-auto w-[16.5rem] sm:w-[18rem]">
      {/* soft glow behind the handset */}
      <span className="absolute -inset-10 -z-10 rounded-full bg-[radial-gradient(closest-side,rgba(74,163,72,0.28),transparent)]" />
      <motion.div
        className="rounded-[2.5rem] border-[10px] border-royal-950 bg-paper shadow-[0_40px_80px_-30px_rgba(0,0,0,0.7)]"
        initial={{ opacity: 0, y: 40, rotate: 4 }}
        whileInView={{ opacity: 1, y: 0, rotate: 0 }}
        viewport={{ once: true, margin: "0px 0px -10% 0px" }}
        transition={{ duration: 0.9, ease: EASE }}
      >
        <div className="mx-auto mt-2 h-1.5 w-16 rounded-full bg-royal-950/80" />
        <div className="px-4 pb-6 pt-4">
          <div className="flex items-center justify-between">
            <img src={jobSahi.logo} alt="" loading="lazy" decoding="async" className="h-9 w-auto" />
            <span className="grid h-8 w-8 place-items-center rounded-full bg-royal-50 text-royal-700">
              <UserRound className="h-4 w-4" />
            </span>
          </div>
          <p className="mt-3 font-display text-[1.0625rem] font-bold leading-tight text-ink">
            {jobSahi.tagline}
          </p>
          <div className="mt-3 flex items-center gap-2 rounded-full border border-stone-line bg-white px-3 py-2 text-[0.75rem] text-ink-mute">
            <Search className="h-3.5 w-3.5" />
            Search jobs, trades, places
          </div>

          <ul className="relative mt-4 h-[13.5rem] space-y-2.5 overflow-hidden">
            <AnimatePresence initial={false} mode="popLayout">
              {shown.map((j, k) => (
                <motion.li
                  key={j.role}
                  layout={!still}
                  initial={{ opacity: 0, y: -24, scale: 0.96 }}
                  animate={{ opacity: k === 2 ? 0.55 : 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 24 }}
                  transition={{ duration: still ? 0 : 0.55, ease: EASE }}
                  className={`rounded-xl border bg-white p-3 ${k === 0 ? "border-[#4aa348]/60 shadow-[0_10px_20px_-14px_rgba(20,34,68,0.6)]" : "border-stone-line"}`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <p className="font-display text-[0.875rem] font-bold leading-snug text-ink">{j.role}</p>
                    <BadgeCheck className="h-4 w-4 shrink-0 text-[#4aa348]" />
                  </div>
                  <p className="mt-1 flex items-center gap-3 text-[0.6875rem] text-ink-mute">
                    <span className="rounded bg-royal-50 px-1.5 py-0.5 font-semibold text-royal-700">{j.tag}</span>
                    <span className="inline-flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {j.place}
                    </span>
                  </p>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>

          <div className="mt-3 rounded-full bg-[#2b6cb0] py-2 text-center text-[0.75rem] font-semibold text-white">
            Apply now
          </div>
        </div>
      </motion.div>
    </div>
  );
}

/**
 * JobSahi, the group's own job app, given a band of its own after the
 * placement figures: what it is, who it serves, three steps, the numbers,
 * and the way to get it — beside a phone with the app running.
 */
export function JobSahiSection() {
  const [ref, active, hold, release] = useCycle(audiences.length, 2800);
  const stores = jobSahi.stores.filter((st) => st.href);

  return (
    <section aria-label="JobSahi — Satpuda Group's job app" className="section on-dark relative isolate overflow-hidden bg-royal-900 text-white">
      <span aria-hidden="true" className="absolute inset-0 -z-10 bg-[radial-gradient(55%_60%_at_85%_40%,rgba(58,85,159,0.55),transparent_70%)]" />
      <div className="shell grid items-center gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
        <div>
          <Reveal>
            <Eyebrow>Our job portal · JobSahi</Eyebrow>
          </Reveal>
          <SplitText as="h2" className="t-h2 mt-5 block text-white">
            Jobs in your pocket.
          </SplitText>
          <Reveal delay={stagger(1)}>
            <p className="mt-2 font-deva text-[1.5rem] text-[#7ccf6b] sm:text-[1.75rem]">{jobSahi.tagline}</p>
          </Reveal>
          <Reveal delay={stagger(2)}>
            <p className="mt-5 max-w-xl text-[1.0625rem] leading-relaxed text-white/75">
              JobSahi is the Satpuda Group&rsquo;s own job app — a bridge between technical talent and industry.
              ITI, polytechnic, diploma and engineering students find verified jobs and campus drives in one
              trusted place, and recruiters and institutes hire them through it.
            </p>
          </Reveal>

          {/* who it is for */}
          <ul ref={ref} onMouseLeave={release} className="mt-8 grid gap-3 sm:grid-cols-3">
            {audiences.map((a, i) => {
              const on = i === active;
              return (
                <Reveal as="li" key={a.title} delay={stagger(i + 2)}>
                  <div
                    onMouseEnter={() => hold(i)}
                    className={`h-full rounded-xl border p-4 transition-colors duration-500 ${
                      on ? "border-[#7ccf6b]/60 bg-white/[0.08]" : "border-white/12 bg-white/[0.03]"
                    }`}
                  >
                    <a.icon aria-hidden="true" strokeWidth={1.8} className={`h-6 w-6 transition-colors duration-500 ${on ? "text-[#7ccf6b]" : "text-white/70"}`} />
                    <p className="mt-3 font-display text-[1rem] font-semibold">{a.title}</p>
                    <p className="mt-1.5 text-[0.8125rem] leading-relaxed text-white/65">{a.body}</p>
                  </div>
                </Reveal>
              );
            })}
          </ul>

          {/* three steps */}
          <Reveal delay={stagger(4)}>
            <ol className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-2 text-[0.875rem] text-white/80">
              {steps.map((s, i) => (
                <li key={s} className="flex items-center gap-3">
                  <span className="grid h-6 w-6 place-items-center rounded-full bg-[#4aa348] font-display text-[0.75rem] font-bold text-white">{i + 1}</span>
                  {s}
                  {i < steps.length - 1 && <span aria-hidden="true" className="h-px w-6 bg-white/25" />}
                </li>
              ))}
            </ol>
          </Reveal>

          {/* figures and the way in */}
          <Reveal delay={stagger(5)}>
            <div className="mt-9 flex flex-wrap items-end gap-x-10 gap-y-6 border-t border-white/12 pt-7">
              <p>
                <span className="block font-display text-[2rem] font-semibold tabular-nums tracking-[-0.02em]">{jobSahi.registered}</span>
                <span className="text-[0.8125rem] text-white/60">candidates registered</span>
              </p>
              <p>
                <span className="block font-display text-[2rem] font-semibold tabular-nums tracking-[-0.02em]">{jobSahi.downloads}</span>
                <span className="text-[0.8125rem] text-white/60">app downloads on Google Play</span>
              </p>
              <div className="flex flex-wrap items-center gap-3">
                {stores.map((st) => (
                  <a
                    key={st.label}
                    href={st.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-transform duration-300 ease-out hover:-translate-y-0.5"
                  >
                    <img src={st.badge} alt={st.label} width={st.width} height={st.height} loading="lazy" decoding="async" className="h-12 w-auto" />
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>
                ))}
                <a
                  href={jobSahi.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex min-h-[3rem] items-center gap-2 rounded-full border border-white/30 px-5 text-[0.9375rem] font-semibold transition-colors hover:border-white hover:bg-white hover:text-royal-900"
                >
                  {jobSahi.display}
                  <ArrowUpRight aria-hidden="true" className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              </div>
            </div>
          </Reveal>

          <Reveal delay={stagger(5)}>
            <p className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-1 text-[0.875rem] text-white/60">
              <span className="inline-flex items-center gap-2">
                <Phone aria-hidden="true" className="h-4 w-4 text-[#7ccf6b]" />
                Free career counselling
              </span>
              {jobSahi.counselling.map((p) => (
                <a key={p.href} href={p.href} className="link-underline font-semibold tabular-nums text-white/85 hover:text-white">
                  {p.label}
                </a>
              ))}
            </p>
          </Reveal>
        </div>

        <PhoneMock />
      </div>
    </section>
  );
}
