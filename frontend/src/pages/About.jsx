import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { PageHero } from "../components/shared/PageHero";
import { CTASection } from "../components/shared/CTASection";
import { Eyebrow, Figure, Reveal, SectionHeading, TextLink } from "../components/ui/Primitives";
import { campusImages, values } from "../data/about";
import { institutions, milestones } from "../data/institutions";
import { site, sources } from "../data/site";
import { useSeo } from "../hooks/useSeo";
import { stagger } from "../components/ui/stagger";

export default function About() {
  useSeo({
    title: "About Satpuda Group",
    description:
      "Satpuda Group is a family of four institutions in Balaghat, Madhya Pradesh, run by Maharana Pratap Shikshan Samiti — spanning school education, ITI trades, teacher education and engineering.",
    path: "/about",
  });

  return (
    <>
      <PageHero
        eyebrow="About us"
        title="An educational group built in Balaghat, for Balaghat."
        lead="Four institutions under one trust, covering the distance from a Class 1 classroom to a degree in engineering."
        crumbs={[{ label: "About Us" }]}
        image={campusImages.campusAerial}
        imageAlt=""
      />

      {/* ---------------- editorial opening ---------------- */}
      <section className="section bg-paper">
        <div className="shell">
          <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
            <Reveal>
              <Eyebrow>The story</Eyebrow>
              <p className="mt-8 font-display text-[1.5rem] leading-[1.3] tracking-[-0.022em] text-ink sm:text-[1.875rem]">
                It started with a single industrial training institute and the belief that a
                student in this district should not have to leave it to build a career.
              </p>
            </Reveal>

            <Reveal delay={stagger(2)}>
              <div className="space-y-5 text-[1.0625rem] leading-[1.75] text-ink-soft lg:pt-16">
                <p>
                  {site.trust} opened Satpuda ITI at Garra in 1999. Balaghat sits in a mineral belt
                  with real industrial demand, and the trades it certified — electrician, fitter,
                  diesel mechanic — were the ones that local employers were actually hiring for.
                </p>
                <p>
                  A CBSE-affiliated school, Satpuda Valley Public School, followed in 2009, taking
                  the trust's work back to the start of a student's education. The Satpuda campus
                  at Manjhapur now also carries degree and diploma engineering approved by AICTE
                  and affiliated to Rajiv Gandhi Proudyogiki Vishwavidyalaya, Bhopal, along with
                  teacher education programmes.
                </p>
                <p>
                  The result is unusual for a district of this size: a single group that can take a
                  student from primary school to an engineering degree, or give a Class 10 leaver a
                  trade certificate and a route into employment — on one campus, under one trust.
                </p>
              </div>
            </Reveal>
          </div>

          {/* --- image band --- */}
          <div className="section-body grid gap-5 sm:grid-cols-3">
            {[
              { src: campusImages.campusFront, alt: "The Satpuda college building from its front approach" },
              { src: campusImages.seminarHall, alt: "A seminar session in the campus hall" },
              { src: campusImages.librarySmart, alt: "The campus smart library" },
            ].map((img, i) => (
              <Reveal key={img.src} delay={stagger(i)} className="group">
                <Figure src={img.src} alt={img.alt} ratio="4 / 3" />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- milestones ---------------- */}
      <section className="section bg-paper-dim">
        <div className="shell">
          <SectionHeading eyebrow="Milestones" title="How the group grew." />

          <ol className="section-body grid gap-10 sm:grid-cols-2 sm:gap-8 lg:grid-cols-4">
            {milestones.map((m, i) => (
              <Reveal key={m.year} delay={stagger(i)}>
                <li className="border-t-2 border-royal-600 pt-7">
                  <p
                    className="font-display text-[2.25rem] font-semibold leading-none tracking-[-0.03em] text-royal-700"
                    style={{ fontVariationSettings: '"opsz" 72' }}
                  >
                    {m.year}
                  </p>
                  <h3 className="mt-5 font-display text-[1.1875rem] font-semibold tracking-[-0.018em] text-ink">
                    {m.title}
                  </h3>
                  <p className="mt-3.5 text-[0.9375rem] leading-[1.7] text-ink-soft">{m.body}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* ---------------- the four institutions ---------------- */}
      <section className="section bg-paper">
        <div className="shell">
          <SectionHeading
            eyebrow="The institutions"
            title="Four institutions, one trust."
            lead="Each has its own affiliation, its own intake and its own teaching staff."
          />

          <div className="section-body grid gap-px bg-stone-line sm:grid-cols-2">
            {institutions.map((inst, i) => (
              <Reveal key={inst.id} delay={stagger(i % 2)}>
                <Link
                  to={inst.to}
                  className="card-raise group flex h-full flex-col bg-paper p-7 hover:bg-paper-dim sm:p-9"
                >
                  <div className="flex items-start justify-between gap-4">
                    <p className="text-[0.625rem] font-semibold uppercase tracking-[0.15em] text-ember-600">
                      {inst.kicker}
                    </p>
                    <ArrowUpRight
                      aria-hidden="true"
                      className="h-5 w-5 shrink-0 text-ink-mute transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-ember-600"
                    />
                  </div>

                  <h3 className="mt-4 font-display text-[1.375rem] font-semibold tracking-[-0.02em] text-ink transition-colors duration-300 group-hover:text-royal-700">
                    {inst.name}
                  </h3>
                  <p className="mt-3.5 flex-1 text-[0.9375rem] leading-[1.7] text-ink-soft">
                    {inst.summary}
                  </p>

                  {inst.credentials.length > 0 && (
                    <ul className="mt-6 space-y-1.5 border-t border-stone-line pt-5">
                      {inst.credentials.map((c) => (
                        <li key={c} className="flex items-start gap-2.5 text-[0.8125rem] text-ink-mute">
                          <span aria-hidden="true" className="mt-[0.45rem] h-1 w-1 shrink-0 bg-ember-500" />
                          {c}
                        </li>
                      ))}
                    </ul>
                  )}
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- values ---------------- */}
      <section className="section on-dark bg-royal-900 text-white">
        <div className="shell">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
            <div>
              <Reveal>
                <Eyebrow>What we hold to</Eyebrow>
              </Reveal>
              <Reveal delay={stagger(1)}>
                <h2 className="t-h2 mt-5 text-white">Six values, used as tests.</h2>
              </Reveal>
              <Reveal delay={stagger(2)}>
                <p className="mt-6 max-w-md text-[1.0625rem] leading-relaxed text-white/70">
                  They are the questions we ask when a decision about teaching, discipline or
                  admissions is genuinely difficult.
                </p>
              </Reveal>
              <Reveal delay={stagger(3)}>
                <p className="motto mt-10 text-2xl text-ember-300">{site.motto}</p>
                <p className="mt-2 text-sm italic text-white/60">“{site.mottoMeaning}”</p>
              </Reveal>
            </div>

            <div className="grid gap-x-10 gap-y-1 sm:grid-cols-2">
              {values.map((v, i) => (
                <Reveal key={v.title} delay={stagger(i % 2)}>
                  <div className="border-t border-white/15 py-6">
                    <h3 className="font-display text-[1.125rem] font-semibold tracking-[-0.015em] text-white">
                      {v.title}
                    </h3>
                    <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-white/60">
                      {v.body}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- sources ---------------- */}
      <section className="section-tight bg-paper">
        <div className="shell">
          <Reveal>
            <div className="border-t border-stone-line pt-8">
              <h2 className="text-[0.6875rem] font-semibold uppercase tracking-[0.17em] text-ink-mute">
                Official sources
              </h2>
              <p className="mt-4 max-w-2xl text-[0.9375rem] leading-relaxed text-ink-soft">
                Institutional facts on this site are drawn from the group's own published material.
                Figures that change every session — fees, intake and admission dates — are not
                published here; please contact the institution for those.
              </p>
              <ul className="mt-6 flex flex-wrap gap-x-8 gap-y-3">
                {sources.map((s) => (
                  <li key={s.href}>
                    <TextLink href={s.href} external className="!text-[0.875rem]">
                      {s.label}
                    </TextLink>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      <CTASection />
    </>
  );
}
