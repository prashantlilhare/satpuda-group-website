import { PageHero } from "../components/shared/PageHero";
import { CTASection } from "../components/shared/CTASection";
import { Eyebrow, Figure, Reveal, SectionHeading } from "../components/ui/Primitives";
import { teacherEducation } from "../data/programs";
import { campusImages } from "../data/about";
import { useSeo } from "../hooks/useSeo";
import { stagger } from "../components/ui/stagger";

export default function DEdBEd() {
  useSeo({
    title: "D.Ed & B.Ed — Teacher Education",
    description:
      "Teacher education at Satpuda Group — D.Ed and B.Ed programme information covering pedagogy, child development, curriculum, educational psychology and supervised teaching practice.",
    path: "/institutes/ded-bed",
  });

  return (
    <>
      <PageHero
        eyebrow="Institute"
        title="D.Ed & B.Ed"
        lead="Teacher education — preparing people who will spend their working lives in a classroom, for the reality of one."
        crumbs={[{ label: "Institute" }, { label: "D.Ed & B.Ed" }]}
        image={campusImages.classroom}
      />

      {/* ---------------- scope notice ---------------- */}
      <section className="section-strip border-b border-stone-line bg-paper">
        <div className="shell">
          <Reveal>
            <p className="max-w-3xl border-l-2 border-ember-500 pl-6 text-[0.9375rem] leading-relaxed text-ink-soft">
              <strong className="font-semibold text-ink">About this page.</strong> What follows
              describes D.Ed and B.Ed teacher education in general terms — the structure and content
              these qualifications share nationally. Affiliation, recognition, intake and fees for
              teacher education at Satpuda Group are confirmed directly by the institution; please
              contact us for those details.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ---------------- why teaching ---------------- */}
      <section className="section bg-paper">
        <div className="shell">
          <div className="grid gap-12 lg:grid-cols-[1fr_0.9fr] lg:gap-20">
            <div>
              <Reveal>
                <Eyebrow>The work</Eyebrow>
              </Reveal>
              <Reveal delay={stagger(1)}>
                <h2 className="t-h2 mt-5 max-w-xl text-ink">
                  Knowing a subject and being able to teach it are two different skills.
                </h2>
              </Reveal>
              <Reveal delay={stagger(2)}>
                <div className="mt-8 space-y-5 text-[1.0625rem] leading-[1.75] text-ink-soft">
                  <p>
                    Teacher education exists because the second skill has to be taught. A graduate
                    who understands their subject completely can still lose a room of thirty
                    fourteen-year-olds in four minutes. Knowing why that happens, and what to do
                    instead, is the content of a D.Ed or a B.Ed.
                  </p>
                  <p>
                    Both qualifications combine theory — how children develop, how learning works,
                    how a curriculum is built and assessed — with extended practice in real
                    classrooms under supervision. The practice is the part that changes people.
                  </p>
                  <p>
                    For a district like Balaghat, where the group already runs a school, an ITI and
                    an engineering college, training teachers locally is a practical proposition:
                    the classrooms that need them are here.
                  </p>
                </div>
              </Reveal>
            </div>

            <Reveal delay={stagger(2)} className="group">
              <Figure
                mask
                src={campusImages.classroom}
                alt="A teaching session in progress in a Satpuda classroom"
                ratio="4 / 5"
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------------- the two programmes ---------------- */}
      <section className="section bg-paper-dim">
        <div className="shell">
          <SectionHeading
            eyebrow="The programmes"
            title="Two qualifications, two stages of schooling."
            lead="A D.Ed prepares teachers for the foundational and primary years; a B.Ed prepares graduates for secondary and senior secondary teaching."
          />

          <div className="section-body space-y-16 lg:space-y-20">
            {teacherEducation.map((prog, idx) => (
              <div key={prog.id}>
                <Reveal>
                  <div className="flex flex-wrap items-end justify-between gap-6 border-t-2 border-royal-600 pt-7">
                    <div>
                      <span className="font-display text-xs font-semibold tracking-[0.1em] text-ember-600">
                        {String(idx + 1).padStart(2, "0")} — {prog.code}
                      </span>
                      <h3 className="mt-3 font-display text-[1.875rem] font-semibold tracking-[-0.026em] text-ink sm:text-[2.25rem]">
                        {prog.name}
                      </h3>
                    </div>
                    <p className="text-[0.8125rem] font-semibold uppercase tracking-[0.12em] text-ink-mute">
                      {prog.stage}
                    </p>
                  </div>
                </Reveal>

                <Reveal delay={stagger(1)}>
                  <p className="mt-7 max-w-2xl text-[1.0625rem] leading-[1.75] text-ink-soft">
                    {prog.summary}
                  </p>
                </Reveal>

                <div className="mt-10 grid gap-x-12 gap-y-1 sm:grid-cols-2">
                  {prog.modules.map((m, i) => (
                    <Reveal key={m.title} delay={stagger(i % 2)}>
                      <article className="group border-t border-stone-line py-6 transition-colors duration-400 hover:border-royal-600">
                        <h4 className="font-display text-[1.125rem] font-semibold tracking-[-0.015em] text-ink">
                          {m.title}
                        </h4>
                        <p className="mt-2.5 text-[0.9375rem] leading-[1.7] text-ink-soft">
                          {m.body}
                        </p>
                      </article>
                    </Reveal>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- practice ---------------- */}
      <section className="section on-dark bg-royal-900 text-white">
        <div className="shell">
          <div className="grid gap-12 lg:grid-cols-[1fr_0.95fr] lg:items-center lg:gap-20">
            <div>
              <Reveal>
                <Eyebrow>Teaching practice</Eyebrow>
              </Reveal>
              <Reveal delay={stagger(1)}>
                <h2 className="t-h2 mt-5 max-w-lg text-white">
                  The part that cannot be learned from a book.
                </h2>
              </Reveal>
              <Reveal delay={stagger(2)}>
                <div className="mt-7 max-w-lg space-y-5 text-[1.0625rem] leading-relaxed text-white/70">
                  <p>
                    Both programmes place trainees in real classrooms carrying real teaching
                    responsibility, observed and debriefed by a mentor. Lesson plans get written,
                    taught, and then honestly reviewed.
                  </p>
                  <p>
                    Trainees learn to read a room, pace a lesson, handle the question they were not
                    expecting, and assess whether anything was actually understood — the judgement
                    that separates a qualified teacher from a well-informed one.
                  </p>
                </div>
              </Reveal>
            </div>

            <Reveal delay={stagger(2)} className="group">
              <Figure
                src={campusImages.seminarHall}
                alt="A large teaching session underway in the campus seminar hall"
                ratio="4 / 3"
              />
            </Reveal>
          </div>
        </div>
      </section>

      <CTASection
        eyebrow="Teacher education enquiries"
        title="Ask about D.Ed and B.Ed at Satpuda."
        body="For current affiliation, recognition, eligibility and intake for teacher education programmes, please contact the institution directly — we will give you the position for this session."
      />
    </>
  );
}
