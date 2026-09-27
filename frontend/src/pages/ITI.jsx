import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion, useScroll, useSpring } from "motion/react";
import { PageHero } from "../components/shared/PageHero";
import { CTASection } from "../components/shared/CTASection";
import { InstituteGallery } from "../components/shared/InstituteGallery";
import { PrincipalDesk } from "../components/shared/PrincipalDesk";
import { AboutCollage } from "../components/shared/AboutCollage";
import { PhotoGrid } from "../components/shared/PhotoGrid";
import { campusImages } from "../data/about";
import { photo } from "../data/photos";
import { Eyebrow, Fact, ReadMore, Reveal, SectionHeading, SplitText } from "../components/ui/Primitives";
import { itiTrades } from "../data/programs";
import { getInstitution } from "../data/institutions";
import { useSeo } from "../hooks/useSeo";
import { stagger } from "../components/ui/stagger";

const inst = getInstitution("iti");

/* The institute's own workshop floor and annual project exhibition. */
const tradeFloor = [
  { ...photo("0027", "An ITI trainee explaining a domestic wiring board", "50% 45%"), caption: "Wiring practice, explained by the trainee who built it" },
  { ...photo("0055", "Trade projects lined up along the workshop hall", "50% 45%"), caption: "The annual project exhibition" },
  { ...photo("0054", "A working road-and-turbine model built by trainees", "50% 50%"), caption: "A working model from the electrical trade" },
  { ...photo("0064", "Trainees gathered in the workshop hall at Manjhapur", "50% 42%"), caption: "Trainees in the Manjhapur workshop" },
];

const careerSteps = [
  {
    title: "Learn the trade",
    body: "One to two years on the trade floor under the NCVT Craftsman Training Scheme syllabus, with the majority of time spent on practical work rather than theory.",
  },
  {
    title: "Certify",
    body: "Trade tests conducted under the National Council for Vocational Training, leading to a National Trade Certificate recognised across India.",
  },
  {
    title: "Apprentice or work",
    body: "Trainees move into apprenticeships and employment with industrial units, contractors, workshops and public sector undertakings.",
  },
  {
    title: "Build on it",
    body: "A trade certificate can also support lateral entry into a diploma programme — including the polytechnic on the group's own campus.",
  },
];

/**
 * There is no hover on a phone, so the card plays its own reveal — the accent
 * sweep, shine beam and text shimmer — as it reaches the middle of the screen,
 * and resets when it leaves so it plays again on the way back. Desktop is
 * untouched: the same styling stays on `:hover` there (see `.trade-card` in
 * index.css, where the `.is-inview` rules are scoped to narrow viewports).
 */
function useInViewOnMobile() {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || typeof IntersectionObserver === "undefined") return;
    if (!window.matchMedia("(max-width: 1023px)").matches) return;

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.45, rootMargin: "-10% 0px -10% 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return [ref, inView];
}

function TradeRow({ trade, index }) {
  const [cardRef, inView] = useInViewOnMobile();

  return (
    <article
      ref={cardRef}
      className={`trade-card group relative grid gap-5 border-t border-stone-line py-8 transition-all duration-400 md:grid-cols-[3.5rem_1.1fr_1.4fr] md:items-start md:gap-8 lg:grid-cols-[3.5rem_1fr_1.5fr_auto] lg:gap-10 rounded-2xl px-5 sm:px-8 cursor-pointer ${
        inView ? "is-inview" : ""
      }`}
    >
      {/* Top radiant color bar that shoots left-to-right on hover */}
      <div className="trade-accent-line" />

      {/* Bright luminous flare / shine beam sweeping left-to-right across the div */}
      <div className="trade-shine-overlay" />

      {/* Index Number */}
      <div className="trade-load-0">
        <span className="font-display text-sm font-bold tabular-nums text-ember-600 transition-colors group-hover:text-ember-500">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      {/* Trade Heading and Type */}
      <div>
        <h3 className="trade-title-shimmer font-display text-[1.375rem] font-bold tracking-[-0.02em] text-ink transition-colors duration-300 sm:text-[1.5rem]">
          {trade.name}
        </h3>
        <p className="trade-load-1 mt-2 inline-block text-[0.75rem] font-semibold uppercase tracking-[0.12em] text-ink-mute transition-colors duration-300 group-hover:text-royal-600">
          {trade.type}
        </p>
      </div>

      {/* Description with loading shimmer sweep on hover */}
      <div>
        <p className="trade-body-shimmer text-[0.9375rem] leading-[1.7] text-ink-soft">
          {trade.body}
        </p>
      </div>

      {/* Duration & Eligibility */}
      <dl className="trade-load-3 flex gap-8 lg:flex-col lg:gap-4 lg:text-right">
        <div>
          <dt className="text-[0.6875rem] font-semibold uppercase tracking-[0.13em] text-ink-mute">
            Duration
          </dt>
          <dd className="mt-1.5 font-display text-[0.9375rem] font-bold text-ink transition-colors group-hover:text-royal-700">
            {trade.duration}
          </dd>
        </div>
        <div className="lg:max-w-[12rem]">
          <dt className="text-[0.6875rem] font-semibold uppercase tracking-[0.13em] text-ink-mute">
            Eligibility
          </dt>
          <dd className="mt-1.5 text-[0.875rem] leading-snug text-ink-soft transition-colors group-hover:text-ink">
            {trade.eligibility}
          </dd>
        </div>
      </dl>
    </article>
  );
}

/**
 * The route from trade test to trade, wired as a circuit.
 *
 * A grey wire runs down through the step numbers. As the list is scrolled,
 * current flows down it — an ember line growing from the top — and each
 * step lights like a bulb as the reader reaches it, going dark again if
 * they scroll back above it. An electrician's trade, drawn as one.
 */
function CircuitSteps({ steps }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 55%"] });
  const current = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.4 });

  return (
    <ol ref={ref} className="relative mt-10">
      {/* the wire, and the current in it */}
      <span aria-hidden="true" className="absolute bottom-10 left-[1.125rem] top-10 w-px bg-white/15" />
      <motion.span
        aria-hidden="true"
        style={{ scaleY: current }}
        className="circuit-current absolute bottom-10 left-[calc(1.125rem-1px)] top-10 w-[3px] origin-top bg-ember-400"
      />
      {steps.map((s, i) => (
        <motion.li
          key={s.title}
          initial="off"
          whileInView="on"
          viewport={{ margin: "0px 0px -45% 0px" }}
          className="relative grid grid-cols-[2.25rem_1fr] gap-5 py-7 sm:gap-7"
        >
          <motion.span
            className="relative z-[1] flex h-9 w-9 items-center justify-center rounded-full border font-display text-xs font-semibold tabular-nums"
            variants={{
              off: { backgroundColor: "rgb(20 34 68)", borderColor: "rgb(255 255 255 / 0.25)", color: "rgb(233 112 95)", boxShadow: "0 0 0 0 rgb(217 58 38 / 0)" },
              on: { backgroundColor: "rgb(217 58 38)", borderColor: "rgb(244 168 159)", color: "rgb(255 255 255)", boxShadow: "0 0 22px 4px rgb(217 58 38 / 0.55)" },
            }}
            transition={{ duration: 0.35 }}
          >
            {String(i + 1).padStart(2, "0")}
          </motion.span>
          <motion.div
            variants={{ off: { opacity: 0.45, x: 0 }, on: { opacity: 1, x: 4 } }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <h3 className="font-display text-[1.1875rem] font-semibold tracking-[-0.018em] text-white">
              {s.title}
            </h3>
            <p className="mt-2.5 text-[0.9375rem] leading-[1.7] text-white/62">{s.body}</p>
          </motion.div>
        </motion.li>
      ))}
    </ol>
  );
}

/* An illustrative week, Monday to Saturday, four blocks a day: W for
   workshop time, T for theory. The proportions follow the Craftsman
   Training Scheme's weighting towards practical work; the exact
   timetable is the institute's. */
const WEEK = [
  ["Mon", "WWTW"],
  ["Tue", "WTWW"],
  ["Wed", "WWWT"],
  ["Thu", "TWWW"],
  ["Fri", "WWTW"],
  ["Sat", "WTWW"],
];
const BLOCKS = WEEK.flatMap(([, d]) => d.split(""));
const WORKSHOP = BLOCKS.filter((b) => b === "W").length;

/* The "today" band holds on each day, then steps one column on. It is
   exactly one column plus one gap wide, so each step is 100% of itself. */
const STEP_X = WEEK.flatMap((_, d) => [`${d * 100}%`, `${d * 100}%`]);
const STEP_TIMES = STEP_X.map((_, i) => (Math.floor(i / 2) * 2 + (i % 2) * 1.6) / (STEP_X.length - 0.4));
const STEP_OPACITY = STEP_X.map((_, i) => (i === 0 || i === STEP_X.length - 1 ? 0 : 1));

/**
 * "Most of the week is spent on the floor", as a timetable filling in.
 *
 * The blocks drop into place day by day — workshop blocks in ember, theory
 * in outline — and a count of workshop blocks ticks up beside them. Once
 * the week is laid out, a soft "today" band walks across it from Monday
 * to Saturday and round again, so the week reads as one that is lived,
 * not a chart. It stops walking when it leaves the screen.
 */
function WorkshopWeek() {
  const ref = useRef(null);
  const seen = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });
  const onScreen = useInView(ref);
  const still = useReducedMotion();
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!seen || still) return;
    let n = 0;
    const t = setInterval(() => {
      n += 1;
      setCount(n);
      if (n >= WORKSHOP) clearInterval(t);
    }, 70);
    return () => clearInterval(t);
  }, [seen, still]);
  const shown = still && seen ? WORKSHOP : count;

  return (
    <div ref={ref} className="mt-10 max-w-md rounded-2xl border border-white/12 bg-white/[0.04] p-5 sm:p-6">
      <div className="flex items-end justify-between gap-4">
        <p className="text-[0.75rem] font-semibold uppercase tracking-[0.14em] text-white/55">A training week</p>
        <p className="font-display text-sm text-white/70">
          <span className="text-[1.5rem] font-semibold tabular-nums text-ember-300">{shown}</span>
          <span className="text-white/40"> / {BLOCKS.length}</span> blocks on the floor
        </p>
      </div>

      <div className="relative mt-5 grid grid-cols-6 gap-2">
        {/* the day the week has reached */}
        {seen && !still && (
          <motion.span
            aria-hidden="true"
            className="pointer-events-none absolute -inset-y-2 -left-1 w-[calc((100%-2.5rem)/6+0.5rem)] rounded-xl bg-white/[0.07] ring-1 ring-white/15"
            initial={{ x: "0%", opacity: 0 }}
            animate={onScreen ? { x: STEP_X, opacity: STEP_OPACITY } : { opacity: 0 }}
            transition={{ duration: 8, times: STEP_TIMES, ease: "easeInOut", repeat: Infinity, delay: 1.6 }}
          />
        )}

        {WEEK.map(([day, blocks], d) => (
          <div key={day} className="relative flex flex-col gap-2">
            {blocks.split("").map((b, i) => (
              <motion.span
                key={i}
                aria-hidden="true"
                className={`block h-6 rounded-md sm:h-7 ${
                  b === "W"
                    ? "bg-[linear-gradient(150deg,var(--color-ember-400),var(--color-ember-600))] shadow-[0_6px_16px_-8px_rgba(217,58,38,0.9)]"
                    : "border border-white/20"
                }`}
                initial={{ opacity: 0, y: -14, scale: 0.7 }}
                animate={seen ? { opacity: 1, y: 0, scale: 1 } : undefined}
                transition={{ type: "spring", stiffness: 420, damping: 20, delay: still ? 0 : d * 0.12 + i * 0.05 }}
              />
            ))}
            <span className="mt-1 text-center text-[0.6875rem] font-semibold uppercase tracking-[0.1em] text-white/45">{day}</span>
          </div>
        ))}
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-white/10 pt-4 text-[0.75rem] text-white/60">
        <span className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-sm bg-ember-500" /> Workshop
        </span>
        <span className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-sm border border-white/30" /> Theory
        </span>
        <span className="ml-auto text-white/40">Illustrative</span>
      </div>
    </div>
  );
}

/* Beside the short "about" copy: the institution at a glance. */
const aboutPhotos = [
  { src: campusImages.workshop, alt: "Trainees on an industrial workshop floor during practical training" },
  photo("0027", "An ITI trainee explaining a domestic wiring board", "50% 45%"),
  photo("0028", "Transformer and circuit models built by trainees on display", "50% 45%"),
];

/* The gallery ring near the foot of the page. Demo selection from the
   campus library until the institution supplies its own set. */
const ringPhotos = [
  { ...photo("0065", "ITI trainees gathered on the workshop floor at Manjhapur", "50% 45%"), caption: "Trainees on the workshop floor" },
  { ...photo("0027", "An ITI trainee explaining a domestic wiring board", "50% 45%"), caption: "Domestic wiring, explained by the trainee" },
  { ...photo("0055", "Trade projects lined up along the workshop hall", "50% 45%"), caption: "The annual project exhibition" },
  { ...photo("0023", "The robotic welding cell on the workshop floor", "50% 45%"), caption: "The robotic welding cell" },
  { ...photo("0048", "The CNC machine in the workshop", "50% 45%"), caption: "CNC machining in the workshop" },
  { ...photo("0021", "The electric vehicle trainer and wiring demonstration bench", "50% 45%"), caption: "EV trainer and wiring bench" },
  { ...photo("0054", "A working road-and-turbine model built by trainees", "50% 45%"), caption: "A working model from the electrical trade" },
  { ...photo("0066", "The decorated Vishwakarma Jayanti shrine in the ITI workshop", "50% 45%"), caption: "Vishwakarma Jayanti in the workshop" },
  { ...photo("0064", "Trainees seated together in the ITI workshop hall", "50% 42%"), caption: "Trainees in the Manjhapur workshop hall" },
  { ...photo("0028", "Transformer and circuit models built by trainees on display", "50% 45%"), caption: "Transformer and circuit models" },
];

export default function ITI() {
  useSeo({
    title: "Satpuda ITI, Garra",
    description:
      "Satpuda ITI, Garra, Balaghat — NCVT-affiliated Craftsman Training Scheme trades in Electrician, Fitter, Mechanic Diesel and COPA. Established 1999 under Maharana Pratap Shikshan Samiti.",
    path: "/institutes/iti",
  });

  return (
    <>
      <PageHero
        motif="gears"
        eyebrow="Institute"
        title="Satpuda ITI, Garra"
        lead={inst.summary}
        crumbs={[{ label: "Institute" }, { label: "ITI" }]}
        image={photo("0055", "Trade projects along the ITI workshop hall", "50% 45%")}
      />

      {/* ---------------- key facts strip ---------------- */}
      <section className="section-strip border-b border-stone-line bg-paper">
        <div className="shell">
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            {[
              { value: "1999", label: "Established" },
              { value: "04", label: "Trades offered" },
              { value: "NCVT", label: "Affiliation" },
              { value: "QCI", label: "Accreditation" },
            ].map((f, i) => (
              <Reveal key={f.label} delay={stagger(i)}>
                <div className="border-t-2 border-royal-600 pt-5">
                  <Fact value={f.value} label={f.label} />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- principal ---------------- */}
      <PrincipalDesk institution="iti" />

      {/* ---------------- about ---------------- */}
      <section className="section bg-paper">
        <div className="shell">
          <div className="grid gap-12 lg:grid-cols-[1fr_0.9fr] lg:gap-20">
            <div>
              <Reveal>
                <Eyebrow>About the institute</Eyebrow>
              </Reveal>
              <Reveal delay={stagger(1)}>
                <SplitText as="h2" className="t-h2 mt-5 block max-w-xl text-ink">
                  The group's first institution — and still its most direct route to work.
                </SplitText>
              </Reveal>
              <Reveal delay={stagger(2)}>
                <ReadMore lines={4} className="mt-6">
                  <div className="space-y-5 text-[1.0625rem] leading-[1.75] text-ink-soft">
                    <p>
                      Satpuda ITI opened at Garra in 1999 under{" "}
                      <strong className="font-semibold text-ink">
                        Maharana Pratap Shikshan Samiti
                      </strong>
                      , and it remains the foundation the rest of the group was built on. It runs
                      trades under the Craftsman Training Scheme, affiliated to the National Council
                      for Vocational Training and accredited by the Quality Council of India.
                    </p>
                    <p>
                      Vocational training answers a specific question: what can a student do the day
                      after they finish? A National Trade Certificate is recognised nationally, it is
                      understood by employers without explanation, and it takes one to two years
                      rather than four.
                    </p>
                    <p>
                      For a student leaving Class 10 who wants technical work rather than more
                      classroom time, this is the shortest credible path to it.
                    </p>
                  </div>
                </ReadMore>
              </Reveal>
            </div>

            <AboutCollage items={aboutPhotos} />
          </div>
        </div>
      </section>

      {/* ---------------- practical learning ---------------- */}
      <section className="section on-dark bg-royal-900 text-white">
        <div className="shell">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1fr] lg:gap-20">
            <div>
              <Reveal>
                <Eyebrow>Practical learning</Eyebrow>
              </Reveal>
              <Reveal delay={stagger(1)}>
                <SplitText as="h2" className="t-h2 mt-5 block max-w-md text-white">
                  Most of the week is spent on the floor.
                </SplitText>
              </Reveal>
              <Reveal delay={stagger(2)}>
                <ReadMore mobileOnly dark className="mt-6 max-w-md">
                  <p className="text-[1.0625rem] leading-relaxed text-white/70">
                    The Craftsman Training Scheme weights practical work heavily by design. Trainees
                    wire circuits, file and fit components, strip and rebuild engines, and operate
                    software — repeatedly, until the work is accurate and quick.
                  </p>
                </ReadMore>
              </Reveal>

              <Reveal delay={stagger(3)}>
                <WorkshopWeek />
              </Reveal>
            </div>

            <div>
              <Reveal>
                <Eyebrow>From trade test to trade</Eyebrow>
              </Reveal>
              <CircuitSteps steps={careerSteps} />
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- trades ---------------- */}
      <section className="section bg-paper-dim">
        <div className="shell">
          <SectionHeading
            eyebrow="Trades"
            title="Four NCVT trades."
            lead="Three engineering trades and one non-engineering trade, each leading to a National Trade Certificate."
          />

          <div className="section-body">
            {itiTrades.map((t, i) => (
              <Reveal key={t.name} delay={stagger(i)}>
                <TradeRow
                  trade={t}
                  index={i}
                />
              </Reveal>
            ))}
            <div className="border-t border-stone-line" />
          </div>

          <Reveal delay={stagger(2)}>
            <p className="mt-10 max-w-3xl border-l-2 border-ember-500 pl-6 text-[0.9375rem] leading-relaxed text-ink-mute">
              Durations and eligibility follow the NCVT Craftsman Training Scheme. Seat availability
              and admission dates vary by session — contact the institute for current details.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ---------------- on the trade floor ---------------- */}
      <section className="section bg-paper">
        <div className="shell">
          <SectionHeading
            eyebrow="On the trade floor"
            title="What the training actually looks like."
            lead="Photographs from the workshop floor at Manjhapur and the institute's annual project exhibition."
          />
          <PhotoGrid items={tradeFloor} className="section-body" />
        </div>
      </section>

      {/* ---------------- gallery ---------------- */}
      <InstituteGallery
        items={ringPhotos}
        title="On the trade floor, in pictures."
        lead="Workshops, trade projects and the days the institute marks together — drag the ring or use the arrows."
      />

      <CTASection
        eyebrow="ITI admissions"
        title="Ask about trade admission and eligibility."
        body="Tell us which trade interests you and what you have completed at school, and we will confirm the eligibility requirement and the admission process."
      />
    </>
  );
}
