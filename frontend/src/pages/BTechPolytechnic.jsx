import { PageHero } from "../components/shared/PageHero";
import { CTASection } from "../components/shared/CTASection";
import { Eyebrow, Fact, Figure, Reveal, SectionHeading } from "../components/ui/Primitives";
import { btechBranches, diplomaBranches, engineeringAdmission } from "../data/programs";
import { campusImages } from "../data/about";
import { getInstitution } from "../data/institutions";
import { useSeo } from "../hooks/useSeo";

const inst = getInstitution("btech-polytechnic");

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
    image: campusImages.electronicsBench,
    alt: "Students at an electrical measurement bench",
  },
  {
    title: "Library & reading rooms",
    body: "A smart library with catalogue terminals and quiet study desks, alongside open reference stacks.",
    image: campusImages.librarySmart,
    alt: "The campus smart library",
  },
  {
    title: "Seminar hall",
    body: "Technical sessions, guest lectures and departmental presentations for the whole cohort.",
    image: campusImages.seminarHall,
    alt: "A full seminar hall during a technical session",
  },
];

export default function BTechPolytechnic() {
  useSeo({
    title: "B.Tech & Polytechnic",
    description:
      "Satpuda College of Engineering & Polytechnic, Balaghat — AICTE-approved B.Tech degrees and three-year diploma programmes affiliated to RGPV Bhopal, across computing, mining, civil, mechanical and electrical engineering.",
    path: "/institutes/btech-polytechnic",
  });

  return (
    <>
      <PageHero
        eyebrow="Institute"
        title="B.Tech & Polytechnic"
        lead={inst.summary}
        crumbs={[{ label: "Institute" }, { label: "B.Tech & Polytechnic" }]}
        image={campusImages.campusFront}
      />

      {/* ---------------- approvals ---------------- */}
      <section className="border-b border-stone-line bg-paper py-12 sm:py-14">
        <div className="shell">
          <div className="grid gap-8 sm:grid-cols-3">
            {inst.credentials.map((c, i) => (
              <Reveal key={c} delay={i * 90}>
                <div className="flex items-start gap-4 border-t-2 border-royal-600 pt-5">
                  <span className="font-display text-xs font-semibold tabular-nums text-ember-600">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="text-[0.9375rem] font-medium leading-snug text-ink">{c}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- overview ---------------- */}
      <section className="bg-paper py-20 sm:py-28">
        <div className="shell">
          <div className="grid gap-12 lg:grid-cols-[1fr_0.85fr] lg:gap-20">
            <div>
              <Reveal>
                <Eyebrow>The college</Eyebrow>
              </Reveal>
              <Reveal delay={70}>
                <h2 className="t-h2 mt-6 max-w-xl text-ink">
                  Engineering taught where the industry actually is.
                </h2>
              </Reveal>
              <Reveal delay={140}>
                <div className="mt-8 space-y-5 text-[1.0625rem] leading-[1.75] text-ink-soft">
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
              </Reveal>

              <div className="mt-12 grid grid-cols-2 gap-8 sm:max-w-md">
                <Reveal delay={200}>
                  <div className="border-t border-stone-line pt-5">
                    <Fact value="05" label="B.Tech branches" />
                  </div>
                </Reveal>
                <Reveal delay={270}>
                  <div className="border-t border-stone-line pt-5">
                    <Fact value="04" label="Diploma branches" />
                  </div>
                </Reveal>
              </div>
            </div>

            <Reveal delay={120} className="group">
              <Figure
                src={campusImages.campusAerial}
                alt="The Satpuda campus seen across its lawns"
                ratio="4 / 5"
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------------- B.TECH BRANCHES ---------------- */}
      <section className="bg-paper-dim py-20 sm:py-28">
        <div className="shell">
          <SectionHeading
            eyebrow="Degree programmes"
            title="B.Tech — five branches."
            lead="Four years, eight semesters, affiliated to RGPV Bhopal."
          />

          <div className="mt-14 grid gap-px bg-stone-line sm:grid-cols-2 lg:grid-cols-3">
            {btechBranches.map((b, i) => (
              <Reveal key={b.code} delay={(i % 3) * 90}>
                <article className="group flex h-full flex-col bg-paper-dim p-7 transition-colors duration-400 hover:bg-paper sm:p-8">
                  <div className="flex items-baseline justify-between gap-4">
                    <span className="font-display text-xs font-semibold tracking-[0.08em] text-ember-600">
                      {b.code}
                    </span>
                    <span
                      aria-hidden="true"
                      className="h-px w-8 origin-right bg-stone-line transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-14 group-hover:bg-ember-500"
                    />
                  </div>

                  <h3 className="mt-5 font-display text-[1.3125rem] font-semibold leading-tight tracking-[-0.02em] text-ink">
                    {b.name}
                  </h3>
                  <p className="mt-4 flex-1 text-[0.9375rem] leading-[1.7] text-ink-soft">
                    {b.body}
                  </p>

                  <ul className="mt-6 flex flex-wrap gap-x-4 gap-y-1.5 border-t border-stone-line pt-5">
                    {b.topics.map((t) => (
                      <li key={t} className="text-[0.8125rem] text-ink-mute">
                        {t}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            ))}

            {/* filler cell keeps the 3-col grid tidy without inventing content */}
            <div className="hidden bg-paper-dim lg:block" aria-hidden="true" />
          </div>
        </div>
      </section>

      {/* ---------------- DIPLOMA ---------------- */}
      <section className="on-dark bg-royal-900 py-20 text-white sm:py-28">
        <div className="shell">
          <div className="grid gap-12 lg:grid-cols-[0.85fr_1fr] lg:gap-20">
            <div>
              <Reveal>
                <Eyebrow>Diploma programmes</Eyebrow>
              </Reveal>
              <Reveal delay={70}>
                <h2 className="t-h2 mt-5 text-white">Polytechnic — a three-year route in.</h2>
              </Reveal>
              <Reveal delay={140}>
                <p className="mt-6 max-w-md text-[1.0625rem] leading-relaxed text-white/70">
                  Open after Class 10 and approved by the Directorate of Technical Education,
                  Government of Madhya Pradesh. A diploma can stand on its own as a technical
                  qualification, or serve as lateral entry into the second year of a degree.
                </p>
              </Reveal>
            </div>

            <div>
              {diplomaBranches.map((d, i) => (
                <Reveal key={d.name} delay={i * 90}>
                  <article className="group grid grid-cols-[2.75rem_1fr] gap-4 border-t border-white/15 py-7 transition-colors duration-400 hover:border-ember-500 sm:grid-cols-[4rem_1fr] sm:gap-7">
                    <span className="font-display text-xs font-semibold tabular-nums text-ember-400">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="font-display text-[1.25rem] font-semibold tracking-[-0.018em] text-white">
                        {d.name}
                      </h3>
                      <p className="mt-2.5 text-[0.9375rem] leading-[1.7] text-white/62">
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
      <section className="bg-paper py-20 sm:py-28">
        <div className="shell">
          <SectionHeading
            eyebrow="Labs & infrastructure"
            title="Where the practical half happens."
            lead="Laboratory and workshop time is scheduled as core teaching, not as a demonstration attached to a lecture."
          />

          <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:gap-x-12 lg:gap-y-14">
            {facilities.map((f, i) => (
              <Reveal key={f.title} delay={(i % 2) * 100} className="group">
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

      {/* ---------------- ADMISSION ---------------- */}
      <section className="bg-paper-dim py-20 sm:py-28">
        <div className="shell">
          <SectionHeading
            eyebrow="Eligibility & admission"
            title="What you need, and how you apply."
          />

          <div className="mt-14 grid gap-px bg-stone-line lg:grid-cols-2">
            {engineeringAdmission.map((a) => (
              <Reveal key={a.label}>
                <div className="h-full bg-paper-dim p-8 sm:p-10">
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

          <Reveal delay={120}>
            <p className="mt-10 max-w-3xl border-l-2 border-ember-500 pl-6 text-[0.9375rem] leading-relaxed text-ink-mute">
              Intake, fee structure, scholarship eligibility and counselling dates change every
              session and are not published here. Contact the institution for current details.
            </p>
          </Reveal>
        </div>
      </section>

      <CTASection
        eyebrow="Engineering admissions"
        title="Ask us about B.Tech and diploma admission."
        body="Tell us which branch interests you and what you have studied so far, and we will explain the eligibility route and the counselling process for this session."
      />
    </>
  );
}
