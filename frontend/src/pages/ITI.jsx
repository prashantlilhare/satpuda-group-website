import { PageHero } from "../components/shared/PageHero";
import { CTASection } from "../components/shared/CTASection";
import { Eyebrow, Fact, Figure, Reveal, SectionHeading } from "../components/ui/Primitives";
import { itiTrades } from "../data/programs";
import { campusImages } from "../data/about";
import { getInstitution } from "../data/institutions";
import { useSeo } from "../hooks/useSeo";

const inst = getInstitution("iti");

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
        eyebrow="Institute"
        title="Satpuda ITI, Garra"
        lead={inst.summary}
        crumbs={[{ label: "Institute" }, { label: "ITI" }]}
        image={campusImages.workshop}
      />

      {/* ---------------- key facts strip ---------------- */}
      <section className="border-b border-stone-line bg-paper py-12 sm:py-14">
        <div className="shell">
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            {[
              { value: "1999", label: "Established" },
              { value: "04", label: "Trades offered" },
              { value: "NCVT", label: "Affiliation" },
              { value: "QCI", label: "Accreditation" },
            ].map((f, i) => (
              <Reveal key={f.label} delay={i * 80}>
                <div className="border-t-2 border-royal-600 pt-5">
                  <Fact value={f.value} label={f.label} />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- about ---------------- */}
      <section className="bg-paper py-20 sm:py-28">
        <div className="shell">
          <div className="grid gap-12 lg:grid-cols-[1fr_0.9fr] lg:gap-20">
            <div>
              <Reveal>
                <Eyebrow>About the institute</Eyebrow>
              </Reveal>
              <Reveal delay={70}>
                <h2 className="t-h2 mt-6 max-w-xl text-ink">
                  The group's first institution — and still its most direct route to work.
                </h2>
              </Reveal>
              <Reveal delay={140}>
                <div className="mt-8 space-y-5 text-[1.0625rem] leading-[1.75] text-ink-soft">
                  <p>
                    Satpuda ITI opened at Garra in 1999 under {" "}
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
              </Reveal>
            </div>

            <Reveal delay={120} className="group">
              <Figure
                src={campusImages.workshop}
                alt="Trainees on an industrial workshop floor during practical training"
                ratio="4 / 5"
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------------- trades ---------------- */}
      <section className="bg-paper-dim py-20 sm:py-28">
        <div className="shell">
          <SectionHeading
            eyebrow="Trades"
            title="Four NCVT trades."
            lead="Three engineering trades and one non-engineering trade, each leading to a National Trade Certificate."
          />

          <div className="mt-14">
            {itiTrades.map((t, i) => (
              <Reveal key={t.name} delay={i * 80}>
                <article className="group grid gap-5 border-t border-stone-line py-8 transition-colors duration-400 hover:border-royal-600 md:grid-cols-[3rem_1.1fr_1.4fr] md:items-start md:gap-8 lg:grid-cols-[3.5rem_1fr_1.5fr_auto] lg:gap-10">
                  <span className="font-display text-xs font-semibold tabular-nums text-ember-600">
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <div>
                    <h3 className="font-display text-[1.375rem] font-semibold tracking-[-0.02em] text-ink transition-colors duration-300 group-hover:text-royal-700 sm:text-[1.5rem]">
                      {t.name}
                    </h3>
                    <p className="mt-2 text-[0.75rem] font-semibold uppercase tracking-[0.12em] text-ink-mute">
                      {t.type}
                    </p>
                  </div>

                  <p className="text-[0.9375rem] leading-[1.7] text-ink-soft">{t.body}</p>

                  <dl className="flex gap-8 lg:flex-col lg:gap-4 lg:text-right">
                    <div>
                      <dt className="text-[0.6875rem] font-semibold uppercase tracking-[0.13em] text-ink-mute">
                        Duration
                      </dt>
                      <dd className="mt-1.5 text-[0.9375rem] font-semibold text-ink">
                        {t.duration}
                      </dd>
                    </div>
                    <div className="lg:max-w-[12rem]">
                      <dt className="text-[0.6875rem] font-semibold uppercase tracking-[0.13em] text-ink-mute">
                        Eligibility
                      </dt>
                      <dd className="mt-1.5 text-[0.875rem] leading-snug text-ink-soft">
                        {t.eligibility}
                      </dd>
                    </div>
                  </dl>
                </article>
              </Reveal>
            ))}
            <div className="border-t border-stone-line" />
          </div>

          <Reveal delay={120}>
            <p className="mt-10 max-w-3xl border-l-2 border-ember-500 pl-6 text-[0.9375rem] leading-relaxed text-ink-mute">
              Durations and eligibility follow the NCVT Craftsman Training Scheme. Seat availability
              and admission dates vary by session — contact the institute for current details.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ---------------- practical learning ---------------- */}
      <section className="on-dark bg-royal-900 py-20 text-white sm:py-28">
        <div className="shell">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1fr] lg:gap-20">
            <div>
              <Reveal>
                <Eyebrow>Practical learning</Eyebrow>
              </Reveal>
              <Reveal delay={70}>
                <h2 className="t-h2 mt-5 max-w-md text-white">
                  Most of the week is spent on the floor.
                </h2>
              </Reveal>
              <Reveal delay={140}>
                <p className="mt-6 max-w-md text-[1.0625rem] leading-relaxed text-white/70">
                  The Craftsman Training Scheme weights practical work heavily by design. Trainees
                  wire circuits, file and fit components, strip and rebuild engines, and operate
                  software — repeatedly, until the work is accurate and quick.
                </p>
              </Reveal>

              <Reveal delay={210} className="group mt-10">
                <Figure
                  src={campusImages.electronicsBench}
                  alt="Trainees working at an electrical measurement and wiring bench"
                  ratio="16 / 10"
                />
              </Reveal>
            </div>

            <div>
              <Reveal>
                <Eyebrow>From trade test to trade</Eyebrow>
              </Reveal>
              <ol className="mt-10">
                {careerSteps.map((s, i) => (
                  <Reveal key={s.title} delay={i * 100}>
                    <li className="grid grid-cols-[2.75rem_1fr] gap-4 border-t border-white/15 py-7 sm:grid-cols-[4rem_1fr] sm:gap-7">
                      <span className="font-display text-xs font-semibold tabular-nums text-ember-400">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <h3 className="font-display text-[1.1875rem] font-semibold tracking-[-0.018em] text-white">
                          {s.title}
                        </h3>
                        <p className="mt-2.5 text-[0.9375rem] leading-[1.7] text-white/62">
                          {s.body}
                        </p>
                      </div>
                    </li>
                  </Reveal>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      <CTASection
        eyebrow="ITI admissions"
        title="Ask about trade admission and eligibility."
        body="Tell us which trade interests you and what you have completed at school, and we will confirm the eligibility requirement and the admission process."
      />
    </>
  );
}
