import { PageHero } from "../components/shared/PageHero";
import { CTASection } from "../components/shared/CTASection";
import { InstituteGallery } from "../components/shared/InstituteGallery";
import { PrincipalDesk } from "../components/shared/PrincipalDesk";
import { AboutCollage } from "../components/shared/AboutCollage";
import { PhotoGrid } from "../components/shared/PhotoGrid";
import { TeachingCycle } from "../components/shared/TeachingCycle";
import { Eyebrow, Figure, ReadMore, Reveal, SectionHeading, SplitText } from "../components/ui/Primitives";
import { teacherEducation } from "../data/programs";
import { useSeo } from "../hooks/useSeo";
import { stagger } from "../components/ui/stagger";
import { dedShots as dedBed } from "../data/shots";

/* Teaching practice happens in real classrooms — including local schools in
   the district. */
const classroomPhotos = [
  { ...dedBed.teaching, caption: "A D.Ed and B.Ed class in session" },
  { ...dedBed[6], caption: "Teaching practice at Government Middle School, Kosmi" },
  { ...dedBed.faculty, caption: "The faculty" },
  { ...dedBed[2], caption: "Trainees with their faculty" },
];

/* One photograph per programme, beside its summary. */
const programmePhotos = {
  ded: dedBed.teaching,
  bed: dedBed.faculty,
};

/* Beside the short "about" copy: the institution at a glance. */
const aboutPhotos = [dedBed.faculty, dedBed.teaching, dedBed[6]];

/* The gallery ring near the foot of the page. */
const ringPhotos = [
  { ...dedBed.faculty, caption: "Our faculty" },
  { ...dedBed.teaching, caption: "In the classroom" },
  { ...dedBed[6], caption: "Teaching practice, Kosmi" },
  { ...dedBed[2], caption: "Trainees with their faculty" },
  { ...dedBed[3], caption: "Staff and trainees together" },
  { ...dedBed[1], caption: "Teachers' Day on stage" },
  { ...dedBed[4], caption: "The full batch" },
  { ...dedBed[5], caption: "A celebration in the auditorium" },
  { ...dedBed[7], caption: "Welcoming our guests" },
];

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
        motif="chalk"
        eyebrow="Institute"
        title="D.Ed & B.Ed"
        lead="Teacher education — preparing people who will spend their working lives in a classroom, for the reality of one."
        crumbs={[{ label: "Institute" }, { label: "D.Ed & B.Ed" }]}
        image={dedBed.teaching}
      />

      {/* ---------------- principal ---------------- */}
      <PrincipalDesk institution="ded-bed" />

      {/* ---------------- why teaching ---------------- */}
      <section className="section bg-paper">
        <div className="shell">
          <div className="grid gap-12 lg:grid-cols-[1fr_0.9fr] lg:gap-20">
            <div>
              <Reveal>
                <Eyebrow>The work</Eyebrow>
              </Reveal>
              <Reveal delay={stagger(1)}>
                <SplitText as="h2" className="t-h2 mt-5 block max-w-xl text-ink">
                  Knowing a subject and being able to teach it are two different skills.
                </SplitText>
              </Reveal>
              <Reveal delay={stagger(2)}>
                <ReadMore lines={4} className="mt-6">
                  <div className="space-y-5 text-[1.0625rem] leading-[1.75] text-ink-soft">
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
                </ReadMore>
              </Reveal>
            </div>

            <AboutCollage items={aboutPhotos} />
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
                <SplitText as="h2" className="t-h2 mt-5 block max-w-lg text-white">
                  The part that cannot be learned from a book.
                </SplitText>
              </Reveal>
              <Reveal delay={stagger(2)}>
                <ReadMore mobileOnly dark className="mt-6 max-w-lg">
                <div className="space-y-5 text-[1.0625rem] leading-relaxed text-white/70">
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
                </ReadMore>
              </Reveal>

              <Reveal delay={stagger(3)} className="mt-10 max-w-lg">
                <TeachingCycle />
              </Reveal>
            </div>

            <Reveal delay={stagger(2)} className="group">
              <Figure
                src={dedBed[6].src}
                srcSet={dedBed[6].srcSet}
                sizes="(min-width: 1024px) 45vw, 100vw"
                alt={dedBed[6].alt}
                ratio="4 / 3"
                position={dedBed[6].focus}
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

          <div className="section-body space-y-14 lg:space-y-16">
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

                {/* Summary and modules share the left column, the photograph
                    sits beside them — so the short summary is not left
                    floating next to a tall picture. On a phone the order is
                    summary, photograph, modules. */}
                <div className="mt-7 grid items-start gap-8 lg:grid-cols-[1.25fr_0.75fr] lg:gap-x-14 lg:gap-y-6">
                  <Reveal delay={stagger(1)}>
                    <p className="max-w-2xl text-[1.0625rem] leading-[1.75] text-ink-soft">
                      {prog.summary}
                    </p>
                  </Reveal>

                  {programmePhotos[prog.id] && (
                    <Reveal delay={stagger(2)} className="group lg:col-start-2 lg:row-span-2 lg:row-start-1">
                      <Figure
                        src={programmePhotos[prog.id].src}
                        srcSet={programmePhotos[prog.id].srcSet}
                        sizes="(min-width: 1024px) 34vw, 100vw"
                        alt={programmePhotos[prog.id].alt}
                        ratio="4 / 3"
                        position={programmePhotos[prog.id].focus}
                      />
                      <p className="mt-3 text-[0.8125rem] leading-snug text-ink-mute">
                        {prog.code === "D.Ed"
                          ? "D.Ed trainees with their faculty."
                          : "B.Ed trainees, staff and students at the Teachers' Day celebration."}
                      </p>
                    </Reveal>
                  )}

                  <div className="grid gap-x-10 sm:grid-cols-2">
                    {prog.modules.map((m, i) => (
                      <Reveal key={m.title} delay={stagger(i % 2)}>
                        <article className="rule-card group border-t border-stone-line py-5 transition-colors duration-400 hover:border-royal-600">
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
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- practice school ---------------- */}
      <section className="section bg-paper">
        <div className="shell">
          <SectionHeading
            eyebrow="Teaching practice"
            title="The classroom they train for."
            lead="Supervised teaching practice is carried out in real classrooms, in schools across the district."
          />
          <PhotoGrid items={classroomPhotos} className="section-body" />
        </div>
      </section>

      {/* ---------------- gallery ---------------- */}
      <InstituteGallery
        items={ringPhotos}
        title="Where teachers are made."
        lead="Our trainees, faculty and the days we celebrate together — drag the ring or use the arrows."
      />

      <CTASection
        eyebrow="Teacher education enquiries"
        title="Ask about D.Ed and B.Ed at Satpuda."
        body="For current affiliation, recognition, eligibility and intake for teacher education programmes, please contact the institution directly — we will give you the position for this session."
      />
    </>
  );
}
