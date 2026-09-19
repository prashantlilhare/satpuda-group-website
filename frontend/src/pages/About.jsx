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
          <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16 items-start">
            {/* Left Column: Bold Headline & Trust Highlight Card */}
            <div className="space-y-6">
              <Reveal>
                <Eyebrow>The Story · Since 1999</Eyebrow>
                <h2 className="mt-4 font-display text-2xl sm:text-3xl lg:text-[2.25rem] font-bold leading-[1.24] tracking-tight text-ink">
                  It started with a single industrial training institute and the conviction that a
                  student in Balaghat should not have to leave home to build a lasting career.
                </h2>
              </Reveal>

              <Reveal delay={stagger(1)}>
                <div className="rounded-2xl border border-stone-line bg-paper-dim/70 p-6 backdrop-blur-xs transition-all duration-300 hover:border-royal-400 hover:shadow-sm">
                  <div className="flex items-center gap-3.5">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-royal-700 text-sm font-bold text-white shadow-xs">
                      MPSS
                    </span>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-royal-700">
                        {site.trust}
                      </p>
                      <p className="text-[11px] text-ink-mute">
                        Registered Educational Trust · Balaghat, M.P.
                      </p>
                    </div>
                  </div>

                  <p className="mt-4 text-[0.875rem] leading-relaxed text-ink-soft">
                    “From craftsman trades to degree engineering and teacher training, our mission has remained singular: accessible, high-standard education anchored in real regional opportunity.”
                  </p>

                  <div className="mt-5 grid grid-cols-3 gap-3 border-t border-stone-line/70 pt-4 text-center">
                    <div className="rounded-lg bg-white/70 py-2 border border-stone-line/50">
                      <span className="block font-display text-lg font-bold text-royal-700">1999</span>
                      <span className="text-[10px] font-semibold text-ink-mute uppercase tracking-wider">Founded</span>
                    </div>
                    <div className="rounded-lg bg-white/70 py-2 border border-stone-line/50">
                      <span className="block font-display text-lg font-bold text-ember-600">04</span>
                      <span className="text-[10px] font-semibold text-ink-mute uppercase tracking-wider">Institutes</span>
                    </div>
                    <div className="rounded-lg bg-white/70 py-2 border border-stone-line/50">
                      <span className="block font-display text-lg font-bold text-royal-700">10+</span>
                      <span className="text-[10px] font-semibold text-ink-mute uppercase tracking-wider">Acres</span>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Right Column: Narrative Phase Cards with Micro-animations */}
            <div className="space-y-4">
              <Reveal delay={stagger(1)}>
                <div className="group rounded-2xl border border-stone-line/70 bg-white p-6 shadow-xs transition-all duration-400 hover:-translate-y-1 hover:border-royal-400 hover:shadow-md">
                  <div className="flex items-center justify-between gap-2 mb-2.5">
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-ember-600">
                      <span className="h-1.5 w-1.5 rounded-full bg-ember-500 animate-pulse" />
                      The Industrial Roots · 1999
                    </span>
                    <span className="text-xs font-mono font-semibold text-ink-mute">Phase 01</span>
                  </div>
                  <p className="text-[0.9375rem] leading-[1.7] text-ink-soft transition-colors duration-300 group-hover:text-ink">
                    {site.trust} opened Satpuda ITI at Garra in 1999. Balaghat sits in a mineral belt
                    with real industrial demand, and the trades it certified — electrician, fitter,
                    diesel mechanic — were the ones that local employers were actually hiring for.
                  </p>
                </div>
              </Reveal>

              <Reveal delay={stagger(2)}>
                <div className="group rounded-2xl border border-stone-line/70 bg-white p-6 shadow-xs transition-all duration-400 hover:-translate-y-1 hover:border-royal-400 hover:shadow-md">
                  <div className="flex items-center justify-between gap-2 mb-2.5">
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-royal-700">
                      <span className="h-1.5 w-1.5 rounded-full bg-royal-600" />
                      Schooling & Engineering Expansion · 2009 Onward
                    </span>
                    <span className="text-xs font-mono font-semibold text-ink-mute">Phase 02</span>
                  </div>
                  <p className="text-[0.9375rem] leading-[1.7] text-ink-soft transition-colors duration-300 group-hover:text-ink">
                    A CBSE-affiliated school, Satpuda Valley Public School, followed in 2009, taking
                    the trust's work back to the start of a student's education. The Satpuda campus
                    at Manjhapur now also carries degree and diploma engineering approved by AICTE
                    and affiliated to Rajiv Gandhi Proudyogiki Vishwavidyalaya, Bhopal, along with
                    teacher education programmes.
                  </p>
                </div>
              </Reveal>

              <Reveal delay={stagger(3)}>
                <div className="group rounded-2xl border border-stone-line/70 bg-white p-6 shadow-xs transition-all duration-400 hover:-translate-y-1 hover:border-royal-400 hover:shadow-md">
                  <div className="flex items-center justify-between gap-2 mb-2.5">
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-royal-700">
                      <span className="h-1.5 w-1.5 rounded-full bg-royal-600" />
                      The Unified Regional Campus
                    </span>
                    <span className="text-xs font-mono font-semibold text-ink-mute">Today</span>
                  </div>
                  <p className="text-[0.9375rem] leading-[1.7] text-ink-soft transition-colors duration-300 group-hover:text-ink">
                    The result is unusual for a district of this size: a single group that can take a
                    student from primary school to an engineering degree, or give a Class 10 leaver a
                    trade certificate and a route into employment — on one campus, under one trust.
                  </p>
                </div>
              </Reveal>
            </div>
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

          <div className="section-body grid gap-6 sm:grid-cols-2 lg:gap-8">
            {institutions.map((inst, i) => (
              <Reveal key={inst.id} delay={stagger(i % 2)}>
                <Link
                  to={inst.to}
                  className="group relative flex h-full min-h-[340px] flex-col justify-between overflow-hidden rounded-2xl border border-stone-line/60 bg-royal-950 p-6 sm:min-h-[380px] sm:p-8 shadow-md transition-all duration-500 hover:shadow-2xl hover:border-ember-500/50"
                >
                  {/* Background Image */}
                  <img
                    src={inst.image}
                    alt={inst.imageAlt}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-108"
                  />

                  {/* Gradient Overlay for high contrast */}
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/55 to-black/25 transition-all duration-500 group-hover:from-black/95 group-hover:via-black/75 group-hover:to-black/35"
                  />

                  {/* Ambient accent tint on hover */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-ember-600/15 via-transparent to-royal-600/15 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  />

                  {/* Top Bar: Kicker + Arrow */}
                  <div className="relative z-10 flex items-center justify-between gap-4">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-black/40 backdrop-blur-md px-3 py-1 text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-ember-300">
                      <span className="h-1.5 w-1.5 rounded-full bg-ember-400" />
                      {inst.kicker}
                    </span>
                    <div className="flex h-9 w-9 items-center justify-center rounded-full border border-white/25 bg-black/40 text-white backdrop-blur-md transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:border-ember-500 group-hover:bg-ember-500 group-hover:scale-110">
                      <ArrowUpRight
                        aria-hidden="true"
                        className="h-4 w-4 transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      />
                    </div>
                  </div>

                  {/* Bottom Content: Heading + Description on Hover */}
                  <div className="relative z-10 mt-auto pt-8">
                    <h3 className="font-display text-xl sm:text-2xl font-bold tracking-tight text-white leading-tight transition-transform duration-500 group-hover:-translate-y-1">
                      {inst.name}
                    </h3>

                    {/* Expandable description on hover */}
                    <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:grid-rows-[1fr] group-focus-within:grid-rows-[1fr]">
                      <div className="overflow-hidden">
                        <p className="mt-3 text-sm leading-relaxed text-white/85 opacity-0 transition-opacity duration-500 delay-75 group-hover:opacity-100">
                          {inst.summary}
                        </p>

                        {inst.credentials.length > 0 && (
                          <ul className="mt-3.5 flex flex-wrap gap-1.5 border-t border-white/15 pt-3 opacity-0 transition-opacity duration-500 delay-100 group-hover:opacity-100">
                            {inst.credentials.map((c) => (
                              <li
                                key={c}
                                className="rounded border border-white/10 bg-black/40 backdrop-blur-xs px-2 py-0.5 text-[11px] font-medium text-white/80"
                              >
                                {c}
                              </li>
                            ))}
                          </ul>
                        )}

                        <span className="mt-3.5 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-ember-300 opacity-0 transition-opacity duration-500 delay-150 group-hover:opacity-100">
                          Explore programme <ArrowUpRight className="h-3.5 w-3.5" />
                        </span>
                      </div>
                    </div>
                  </div>
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
