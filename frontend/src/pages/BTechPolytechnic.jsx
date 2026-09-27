import { useState } from "react";
import { PageHero } from "../components/shared/PageHero";
import { CTASection } from "../components/shared/CTASection";
import { InstituteGallery } from "../components/shared/InstituteGallery";
import { PrincipalDesk } from "../components/shared/PrincipalDesk";
import { AboutCollage } from "../components/shared/AboutCollage";
import { RouteMap } from "../components/shared/RouteMap";
import { Eyebrow, Fact, Figure, ReadMore, Reveal, SectionHeading, SplitText } from "../components/ui/Primitives";
import { btechBranches, diplomaBranches, engineeringAdmission } from "../data/programs";
import { campusImages } from "../data/about";
import { photo } from "../data/photos";
import { shots } from "../data/shots";
import { getInstitution } from "../data/institutions";
import { useSeo } from "../hooks/useSeo";
import { Stamp } from "../components/ui/Stamp";
import { stagger } from "../components/ui/stagger";

const inst = getInstitution("btech-polytechnic");

/* The seal pressed beside each credential, index-aligned with
   `inst.credentials`: AICTE, RGPV, DTE. */
const seals = [
  { ring: "APPROVED", label: "AICTE" },
  { ring: "AFFILIATED", label: "RGPV" },
  { ring: "APPROVED", label: "DTE MP" },
];

/* Each branch card shows that department at work. */
const btechBranchImages = {
  CSE: { src: campusImages.computerLab, focus: "50% 50%" },
  MIN: shots.miningBriefing,
  CIV: shots.civilLevel,
  MECH: shots.mechGoKart,
  EE: shots.elecBench,
};

// Index-aligned with `diplomaBranches`: computing, civil, electrical,
// mechanical, mining.
const diplomaBranchImages = [
  { src: campusImages.computerLab, focus: "50% 50%" },
  shots.civilTotalStation,
  shots.elecTower,
  shots.mechEngineLab,
  shots.miningPlant,
];

const facilities = [
  {
    title: "Computing laboratories",
    body: "Networked computer laboratories used for programming coursework, project work and practical examinations.",
    image: campusImages.computerLab,
    alt: "A Satpuda computing laboratory in use",
  },
  {
    title: "Electrical & electronics labs",
    body: "Machines, measurement and circuits benches where students run the experiments themselves rather than watch them.",
    image: shots.elecBench.src,
    alt: shots.elecBench.alt,
  },
  {
    title: "Library & reading rooms",
    body: "A library with open reference stacks, departmental collections and quiet study desks.",
    image: shots.library.src,
    alt: shots.library.alt,
  },
  {
    title: "Seminar hall",
    body: "Technical sessions, guest lectures and departmental presentations for the whole cohort.",
    image: campusImages.seminarHall,
    alt: "A full seminar hall during a technical session",
  },
];

/* Beside the short "about" copy: the institution at a glance. */
const aboutPhotos = [
  { src: campusImages.campusFront, alt: "The Satpuda College of Engineering & Polytechnic building" },
  { src: campusImages.computerLab, alt: "A Satpuda computing laboratory in use" },
  { src: campusImages.campusAerial, alt: "The Satpuda campus seen across its lawns" },
];

/* The gallery ring near the foot of the page. */
const ringPhotos = [
  { ...shots.civilTotalStation, caption: "Surveying with the total station" },
  { ...shots.civilExpo, caption: "Civil models at the project expo" },
  { ...shots.mechGoKart, caption: "The go-kart our mechanical students built" },
  { ...shots.elecTower, caption: "Stringing a model transmission line" },
  { ...shots.miningVisit, caption: "Off on an industrial visit" },
  { ...shots.civilSiteVisit, caption: "On a bridge construction site" },
  { ...photo("0037", "The electrical engineering laboratory in use", "50% 45%"), caption: "The electrical engineering laboratory" },
  { ...photo("0046", "A collaborative robot being demonstrated in the laboratory", "50% 45%"), caption: "The collaborative robot" },
  { ...photo("0022", "The cobot training cell in the robotics laboratory", "50% 45%"), caption: "The cobot training cell" },
  { ...photo("0039", "The PCB design and electronics manufacturing laboratory", "50% 45%"), caption: "PCB design and manufacturing lab" },
  { ...photo("0047", "Visitors at the CNC simulator in the mechanical engineering laboratory", "50% 45%"), caption: "The CNC simulator" },
  { ...photo("0026", "Students presenting working models at the project exhibition", "50% 45%"), caption: "The project exhibition" },
  { src: campusImages.computerLab, alt: "A Satpuda computing laboratory in use", caption: "Computing laboratory" },
  { ...shots.library, caption: "The library" },
  { src: campusImages.seminarHall, alt: "A full seminar hall during a technical session", caption: "A technical session" },
  { ...photo("0044", "Students in college blazers seated at a campus assembly", "50% 35%"), caption: "College assembly" },
  { ...shots.kabaddi, caption: "The kabaddi team" },
  { ...shots.cultural, caption: "The cultural evening" },
];

export default function BTechPolytechnic() {
  const [hoveredDiploma, setHoveredDiploma] = useState(null);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    setCursorPos({ x: e.clientX, y: e.clientY });
  };

  useSeo({
    title: "B.Tech & Polytechnic",
    description:
      "Satpuda College of Engineering & Polytechnic, Balaghat — AICTE-approved B.Tech degrees and three-year diploma programmes affiliated to RGPV Bhopal, across computing, mining, civil, mechanical and electrical engineering.",
    path: "/institutes/btech-polytechnic",
  });

  return (
    <>
      {/* Floating Cursor-following Image Preview (Global outside div, Portrait format) */}
      <div
        className="pointer-events-none fixed z-[9999] transition-all duration-300 ease-out"
        style={{
          left: 0,
          top: 0,
          transform: `translate3d(${cursorPos.x + 32}px, ${cursorPos.y - 144}px, 0)`,
          opacity: hoveredDiploma !== null ? 1 : 0,
          pointerEvents: "none",
        }}
      >
        <div className="w-56 h-72 overflow-hidden rounded-2xl border border-white/20 bg-royal-950 shadow-2xl relative">
          <img
            src={diplomaBranchImages[hoveredDiploma ?? 0]?.src || campusImages.campusFront}
            alt={diplomaBranches[hoveredDiploma ?? 0]?.name}
            className="h-full w-full object-cover"
            style={{ objectPosition: diplomaBranchImages[hoveredDiploma ?? 0]?.focus }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent" />
          <div className="absolute bottom-4 left-5 right-5">
            <span className="text-[10px] font-mono text-ember-400 font-bold tracking-widest block mb-1.5">
              0{(hoveredDiploma ?? 0) + 1}
            </span>
            <span className="text-[0.9375rem] font-semibold text-white tracking-wide block leading-tight">
              {diplomaBranches[hoveredDiploma ?? 0]?.name}
            </span>
          </div>
        </div>
      </div>

      <PageHero
        motif="blueprint"
        eyebrow="Institute"
        title="B.Tech & Polytechnic"
        lead={inst.summary}
        crumbs={[{ label: "Institute" }, { label: "B.Tech & Polytechnic" }]}
        image={photo("0037", "The electrical engineering laboratory in use", "50% 45%")}
      />

      {/* ---------------- approvals ---------------- */}
      <section className="section-strip border-b border-stone-line bg-paper">
        <div className="shell">
          <div className="grid gap-8 sm:grid-cols-3">
            {inst.credentials.map((c, i) => (
              <div key={c} className="flex items-center gap-5 border-t-2 border-royal-600 pt-5">
                {seals[i] && <Stamp {...seals[i]} index={i} className="h-[4.75rem] w-[4.75rem]" />}
                <div>
                  <span className="font-display text-xs font-semibold tabular-nums text-ember-600">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="mt-1 text-[0.9375rem] font-medium leading-snug text-ink">{c}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- principal ---------------- */}
      <PrincipalDesk institution="btech-polytechnic" />

      {/* ---------------- overview ---------------- */}
      <section className="section bg-paper">
        <div className="shell">
          <div className="grid gap-12 lg:grid-cols-[1fr_0.85fr] lg:gap-20">
            <div>
              <Reveal>
                <Eyebrow>The college</Eyebrow>
              </Reveal>
              <Reveal delay={stagger(1)}>
                <SplitText as="h2" className="t-h2 mt-5 block max-w-xl text-ink">
                  Engineering taught where the industry actually is.
                </SplitText>
              </Reveal>
              <Reveal delay={stagger(2)}>
                <ReadMore lines={4} className="mt-6">
                  <div className="space-y-5 text-[1.0625rem] leading-[1.75] text-ink-soft">
                    <p>
                      Satpuda College of Engineering & Polytechnic runs four-year B.Tech degrees and
                      three-year diploma programmes on the group's campus at Manjhapur, Balaghat. The
                      degree programmes are approved by the All India Council for Technical Education
                      and affiliated to Rajiv Gandhi Proudyogiki Vishwavidyalaya, Bhopal; the diploma
                      programmes are approved by the Directorate of Technical Education, Government of
                      Madhya Pradesh.
                    </p>
                    <p>
                      The branch mix is deliberate. Balaghat sits in a mineral belt, and mining
                      engineering here is not a theoretical offering — it is taught in a district
                      where mines operate. Civil, mechanical and electrical engineering serve the
                      construction and infrastructure work around the region, and computer science
                      opens routes that are not geographically limited at all.
                    </p>
                  </div>
                </ReadMore>
              </Reveal>

              <div className="mt-10 grid grid-cols-2 gap-8 sm:max-w-md">
                <Reveal delay={stagger(3)}>
                  <div className="border-t border-stone-line pt-5">
                    <Fact value="05" label="B.Tech branches" />
                  </div>
                </Reveal>
                <Reveal delay={stagger(4)}>
                  <div className="border-t border-stone-line pt-5">
                    <Fact value="05" label="Diploma branches" />
                  </div>
                </Reveal>
              </div>
            </div>

            <AboutCollage items={aboutPhotos} />
          </div>
        </div>
      </section>

      {/* ---------------- ADMISSION ---------------- */}
      <section className="section bg-paper-dim">
        <div className="shell">
          <SectionHeading
            eyebrow="Ways in"
            title="Two routes into engineering — and what each needs."
            lead="Join the degree after Class 12, or the diploma after Class 10 and step into the degree's second year later."
          />

          <RouteMap className="section-body" />

          <div className="mt-12 grid gap-px bg-stone-line lg:mt-16 lg:grid-cols-2">
            {engineeringAdmission.map((a) => (
              <Reveal key={a.label}>
                <div className="card-raise h-full bg-paper-dim p-8 sm:p-10">
                  <h3 className="font-display text-[1.5rem] font-semibold tracking-[-0.022em] text-ink">
                    {a.label}
                  </h3>
                  <p className="mt-3 text-[0.8125rem] font-semibold uppercase tracking-[0.12em] text-ember-600">
                    {a.duration}
                  </p>

                  <dl className="mt-8 space-y-6">
                    <div>
                      <dt className="text-[0.6875rem] font-semibold uppercase tracking-[0.15em] text-ink-mute">
                        Eligibility
                      </dt>
                      <dd className="mt-2.5 text-[0.9375rem] leading-[1.7] text-ink-soft">
                        {a.eligibility}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-[0.6875rem] font-semibold uppercase tracking-[0.15em] text-ink-mute">
                        Admission
                      </dt>
                      <dd className="mt-2.5 text-[0.9375rem] leading-[1.7] text-ink-soft">
                        {a.note}
                      </dd>
                    </div>
                  </dl>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={stagger(2)}>
            <p className="mt-10 max-w-3xl border-l-2 border-ember-500 pl-6 text-[0.9375rem] leading-relaxed text-ink-mute">
              Intake, fee structure, scholarship eligibility and counselling dates change every
              session and are not published here. Contact the institution for current details.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ---------------- B.TECH BRANCHES ---------------- */}
      <section className="section bg-paper">
        <div className="shell">
          <SectionHeading
            eyebrow="Degree programmes"
            title="B.Tech — five branches."
            lead="Four years, eight semesters, affiliated to RGPV Bhopal."
          />

          <div className="section-body grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {btechBranches.map((b, i) => {
              const bgImg = btechBranchImages[b.code] || { src: campusImages.campusFront };
              return (
                <Reveal key={b.code} delay={stagger(i % 3)}>
                  <article data-tilt className="group relative flex h-full min-h-[350px] flex-col justify-end overflow-hidden rounded-2xl border border-stone-line/10 bg-royal-950 p-7 sm:p-8 shadow-sm transition-all duration-500 hover:shadow-2xl hover:border-ember-500/50">
                    {/* Background Image - ALWAYS VISIBLE */}
                    <img
                      src={bgImg.src}
                      srcSet={bgImg.srcSet}
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      alt={b.name}
                      style={{ objectPosition: bgImg.focus }}
                      loading="lazy"
                      decoding="async"
                      className="absolute inset-0 h-full w-full object-cover scale-100 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-108"
                    />

                    {/* Dark gradient overlay - always visible at bottom to make white text readable */}
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent transition-colors duration-500 group-hover:from-black/95 group-hover:via-black/75 group-hover:to-black/40"
                    />

                    {/* Ambient subtle accent glow on hover */}
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-ember-600/20 via-transparent to-royal-600/20 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    />

                    {/* Content overlay */}
                    <div className="relative z-10 flex flex-col justify-end">
                      <div className="flex items-center justify-between gap-4 mb-4">
                        <span className="font-display text-xs font-bold tracking-[0.1em] px-2.5 py-1 rounded-md bg-white/10 text-white border border-white/20 backdrop-blur-sm transition-all duration-300 group-hover:bg-ember-500 group-hover:border-ember-400 group-hover:text-white">
                          {b.code}
                        </span>
                        <span
                          aria-hidden="true"
                          className="h-px w-8 origin-right bg-white/40 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-14 group-hover:bg-ember-400"
                        />
                      </div>

                      <h3 className="font-display text-[1.3125rem] font-semibold leading-tight tracking-[-0.02em] text-white">
                        {b.name}
                      </h3>

                      {/* Expandable Description & Topics Container - hidden by default, expands on hover */}
                      <div className="grid grid-rows-[0fr] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:grid-rows-[1fr]">
                        <div className="overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-75">
                          <p className="mt-3 text-[0.9375rem] leading-[1.7] text-white/85">
                            {b.body}
                          </p>

                          <ul className="mt-5 flex flex-wrap gap-1.5 pt-4 border-t border-white/15">
                            {b.topics.map((t) => (
                              <li
                                key={t}
                                className="rounded-md border border-white/20 bg-white/10 px-2.5 py-1 text-[0.75rem] font-medium text-white/90"
                              >
                                {t}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---------------- DIPLOMA ---------------- */}
      <section
        onMouseMove={handleMouseMove}
        className="section on-dark bg-royal-900 text-white relative"
      >

        <div className="shell">
          <div className="grid gap-12 lg:grid-cols-[0.85fr_1fr] lg:gap-20">
            <div>
              <Reveal>
                <Eyebrow>Diploma programmes</Eyebrow>
              </Reveal>
              <Reveal delay={stagger(1)}>
                <SplitText as="h2" className="t-h2 mt-5 block text-white">Polytechnic — a three-year route in.</SplitText>
              </Reveal>
              <Reveal delay={stagger(2)}>
                <ReadMore mobileOnly dark className="mt-6 max-w-md">
                  <p className="text-[1.0625rem] leading-relaxed text-white/70">
                    Open after Class 10 and approved by the Directorate of Technical Education,
                    Government of Madhya Pradesh. A diploma can stand on its own as a technical
                    qualification, or serve as lateral entry into the second year of a degree.
                  </p>
                </ReadMore>
              </Reveal>
            </div>

            <div className="flex flex-col">
              {diplomaBranches.map((d, i) => (
                <Reveal key={d.name} delay={stagger(i)}>
                  <article
                    onMouseEnter={() => setHoveredDiploma(i)}
                    onMouseLeave={() => setHoveredDiploma(null)}
                    className="group grid grid-cols-[2.75rem_1fr] gap-4 border-t border-white/15 py-7 transition-all duration-300 hover:border-ember-500 hover:pl-2 sm:grid-cols-[4rem_1fr] sm:gap-7 cursor-pointer"
                  >
                    <span className="font-display text-xs font-semibold tabular-nums text-ember-400 transition-colors group-hover:text-ember-300">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="font-display text-[1.25rem] font-semibold tracking-[-0.018em] text-white transition-colors duration-200 group-hover:text-ember-300">
                        {d.name}
                      </h3>
                      <p className="mt-2.5 text-[0.9375rem] leading-[1.7] text-white/62 transition-colors duration-200 group-hover:text-white/80">
                        {d.body}
                      </p>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- FACILITIES ---------------- */}
      <section className="section bg-paper">
        <div className="shell">
          <SectionHeading
            eyebrow="Labs & infrastructure"
            title="Where the practical half happens."
            lead="Laboratory and workshop time is scheduled as core teaching, not as a demonstration attached to a lecture."
          />

          <div className="section-body grid gap-10 sm:grid-cols-2 lg:gap-x-12 lg:gap-y-14">
            {facilities.map((f, i) => (
              <Reveal key={f.title} delay={stagger(i % 2)} className="group">
                <article>
                  <Figure src={f.image} alt={f.alt} ratio="16 / 10" />
                  <h3 className="mt-6 font-display text-[1.25rem] font-semibold tracking-[-0.018em] text-ink">
                    {f.title}
                  </h3>
                  <p className="mt-3 max-w-md text-[0.9375rem] leading-[1.7] text-ink-soft">
                    {f.body}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- gallery ---------------- */}
      <InstituteGallery
        items={ringPhotos}
        title="Inside the college."
        lead="Laboratories, the robotics cell, the library and the hall — drag the ring or use the arrows."
      />

      <CTASection
        eyebrow="Engineering admissions"
        title="Ask us about B.Tech and diploma admission."
        body="Tell us which branch interests you and what you have studied so far, and we will explain the eligibility route and the counselling process for this session."
      />
    </>
  );
}
