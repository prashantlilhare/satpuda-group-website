import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { PageHero } from "../components/shared/PageHero";
import { CTASection } from "../components/shared/CTASection";
import { StoryJourney } from "../components/shared/StoryJourney";
import { Eyebrow, Fact, Figure, ReadMore, Reveal, SectionHeading, SplitText, TextLink } from "../components/ui/Primitives";
import { values } from "../data/about";
import { photo } from "../data/photos";
import { institutions } from "../data/institutions";
import { prologuePhotos, storyChapters, thenNow } from "../data/story";
import { site, sources } from "../data/site";
import { useSeo } from "../hooks/useSeo";
import { stagger } from "../components/ui/stagger";

/** Whole years since the first institute opened. */
const YEARS = new Date().getFullYear() - 1999;

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
        motif="ridge"
        eyebrow="About us"
        title="From one workshop floor to a campus that runs Class 1 to B.Tech."
        lead="The story of how a single industrial training institute in Balaghat grew, one step at a time, into four institutions under one trust."
        crumbs={[{ label: "About Us" }]}
        image={photo("0041", "Students filling the campus hall for a group-wide session", "50% 40%")}
        imageAlt=""
      />

      {/* ---------------- editorial opening ---------------- */}
      <section className="section bg-paper">
        <div className="shell">
          <div className="grid gap-10 sm:gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
            {/* Left Column: Bold Headline & Trust Highlight Card — heading
                sits at the top, card at the bottom, so both edges line up
                with the photo grid beside it. */}
            <div className="flex flex-col gap-8 lg:justify-between">
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
                      <span className="block font-display text-lg font-bold text-ember-600">4</span>
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

            {/* Right Column: the campus as it is used today, in three frames —
                the place the story below arrives at. */}
            <div className="grid grid-cols-2 grid-rows-2 gap-4 sm:gap-5">
              {prologuePhotos.map((img, i) => (
                <Reveal
                  key={img.id}
                  delay={stagger(i)}
                  className={`group h-full ${i === 0 ? "row-span-2" : ""}`}
                >
                  <Figure
                    mask
                    src={img.src}
                    srcSet={img.srcSet}
                    sizes="(min-width: 1024px) 23vw, 50vw"
                    alt={img.alt}
                    position={img.focus}
                    ratio={i === 0 ? "3 / 4" : "4 / 3"}
                    className="h-full rounded-xl"
                  />
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- the journey, chapter by chapter ---------------- */}
      <section className="section bg-paper-dim">
        <div className="shell">
          <SectionHeading
            eyebrow="The journey · 1999 – today"
            title="Five chapters, one range of hills."
            lead="Every new institution raised another peak. Scroll through the years and watch a single hill become the Satpuda range."
          />

          <div className="section-body">
            <StoryJourney chapters={storyChapters} />
          </div>
        </div>
      </section>

      {/* ---------------- then and now ---------------- */}
      <section className="section on-dark bg-royal-900 text-white">
        <div className="shell">
          <div className="max-w-2xl">
            <Reveal>
              <Eyebrow>Then, and now</Eyebrow>
            </Reveal>
            <SplitText as="h2" delay={90} className="t-h2 mt-5 block text-white">
              {`What ${YEARS} years changed.`}
            </SplitText>
            <Reveal delay={stagger(2)}>
              <p className="mt-5 max-w-xl text-white/65">
                Read each row from left to right — where we started in 1999, and where we stand today.
              </p>
            </Reveal>
          </div>

          <div className="section-body">
            {/* column key — tells the reader how to read every row */}
            <div
              aria-hidden="true"
              className="hidden grid-cols-[14rem_9rem_1fr_9rem] gap-8 pb-4 text-[0.6875rem] font-semibold uppercase tracking-[0.15em] sm:grid"
            >
              <span className="text-white/40">What we count</span>
              <span className="text-white/50">In 1999</span>
              <span />
              <span className="text-right text-ember-300">Today</span>
            </div>

            <div className="divide-y divide-white/12 border-y border-white/12">
              {thenNow.map((row, i) => {
                const thenIsNumber = /^\d+$/.test(row.then);
                return (
                  <Reveal key={row.label} delay={stagger(i)}>
                    <div className="grid grid-cols-[auto_1fr_auto] items-center gap-5 py-7 sm:grid-cols-[14rem_9rem_1fr_9rem] sm:gap-8">
                      <div className="col-span-3 sm:col-span-1">
                        <p className="text-[0.8125rem] font-semibold uppercase tracking-[0.15em] text-white/80">
                          {row.label}
                        </p>
                        {row.sub && (
                          <p className="mt-1.5 text-[0.8125rem] leading-relaxed text-white/50">{row.sub}</p>
                        )}
                      </div>

                      {/* then */}
                      <div>
                        <span className="mb-1 block text-[0.6875rem] font-semibold uppercase tracking-[0.15em] text-white/40 sm:hidden">
                          In 1999
                        </span>
                        <p
                          className={`font-display font-semibold leading-none tracking-[-0.03em] text-white/45 tabular-nums ${
                            thenIsNumber ? "text-[clamp(2rem,3.8vw,2.75rem)]" : "text-[clamp(1.25rem,2.2vw,1.625rem)]"
                          }`}
                        >
                          {row.then}
                        </p>
                        <p className="mt-2 text-[0.8125rem] text-white/45">{row.thenUnit}</p>
                      </div>

                      {/* the distance travelled, drawn across as it arrives */}
                      <div className="relative flex flex-col items-center justify-center">
                        {row.change && (
                          <motion.span
                            className="mb-2 rounded-full border border-ember-400/40 bg-ember-500/10 px-2.5 py-0.5 text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-ember-300"
                            initial={{ opacity: 0, y: 6 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "0px 0px -15% 0px" }}
                            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.9 + i * 0.12 }}
                          >
                            {row.change}
                          </motion.span>
                        )}
                        <motion.span
                          aria-hidden="true"
                          className="relative block h-px w-full origin-left bg-gradient-to-r from-white/15 to-ember-400"
                          initial={{ scaleX: 0 }}
                          whileInView={{ scaleX: 1 }}
                          viewport={{ once: true, margin: "0px 0px -15% 0px" }}
                          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.25 + i * 0.12 }}
                        >
                          <span className="absolute -right-1 -top-[3px] h-[7px] w-[7px] rotate-45 border-r border-t border-ember-400" />
                        </motion.span>
                      </div>

                      {/* now */}
                      <div className="text-right">
                        <span className="mb-1 block text-[0.6875rem] font-semibold uppercase tracking-[0.15em] text-ember-300 sm:hidden">
                          Today
                        </span>
                        <Fact value={row.now} label={row.nowUnit} dark />
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- the four institutions ---------------- */}
      <section className="section bg-paper">
        <div className="shell">
          <SectionHeading
            eyebrow="Where the story stands today"
            title="Four institutions, one trust."
            lead="Every chapter left something standing. Each has its own affiliation, its own intake and its own teaching staff."
          />

          <div className="section-body grid gap-6 sm:grid-cols-2 lg:gap-8">
            {institutions.map((inst, i) => (
              <Reveal key={inst.id} delay={stagger(i % 2)}>
                <Link
                  to={inst.to}
                  data-tilt
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
                <SplitText as="h2" className="t-h2 mt-5 block text-white">Everything changed, except these six.</SplitText>
              </Reveal>
              <Reveal delay={stagger(2)}>
                <p className="mt-6 max-w-md text-[1.0625rem] leading-relaxed text-white/70">
                  New programmes, new buildings, a new campus — and through all of it, the same
                  questions we ask when a decision about teaching, discipline or admissions is
                  genuinely difficult.
                </p>
              </Reveal>
              <Reveal delay={stagger(3)}>
                {/* The motto is written on as if with a brush, left to
                    right, and underlined with one stroke. */}
                <div className="relative mt-10 inline-block">
                  <motion.p
                    className="motto pb-2 text-2xl text-ember-300"
                    initial={{ clipPath: "inset(0 100% 0 0)" }}
                    whileInView={{ clipPath: "inset(0 0% 0 0)" }}
                    viewport={{ once: true, margin: "0px 0px -15% 0px" }}
                    transition={{ duration: 1.6, ease: [0.65, 0, 0.35, 1], delay: 0.2 }}
                  >
                    {site.motto}
                  </motion.p>
                  <svg aria-hidden="true" viewBox="0 0 200 12" preserveAspectRatio="none" className="absolute -bottom-1 left-0 h-3 w-full">
                    <motion.path
                      d="M2 8 C50 3 120 11 198 4"
                      fill="none"
                      stroke="var(--color-ember-400)"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      initial={{ pathLength: 0 }}
                      whileInView={{ pathLength: 1 }}
                      viewport={{ once: true, margin: "0px 0px -15% 0px" }}
                      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 1.7 }}
                    />
                  </svg>
                </div>
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
              <ReadMore mobileOnly className="mt-4 max-w-2xl">
                <p className="text-[0.9375rem] leading-relaxed text-ink-soft">
                  Institutional facts on this site are drawn from the group's own published material.
                  Figures that change every session — fees, intake and admission dates — are not
                  published here; please contact the institution for those.
                </p>
              </ReadMore>
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
