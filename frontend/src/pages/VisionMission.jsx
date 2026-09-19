import { PageHero } from "../components/shared/PageHero";
import { CTASection } from "../components/shared/CTASection";
import { Eyebrow, Figure, Reveal } from "../components/ui/Primitives";
import { campusImages, mission, values, vision } from "../data/about";
import { site } from "../data/site";
import { useSeo } from "../hooks/useSeo";
import { stagger } from "../components/ui/stagger";

export default function VisionMission() {
  useSeo({
    title: "Vision & Mission",
    description:
      "The vision and mission of Satpuda Group — a future-forward campus blending modern tools with human-centred teaching, and an education that channels every learner toward their full potential.",
    path: "/about/vision-mission",
  });

  return (
    <>
      <PageHero
        eyebrow="About us"
        title="Vision & Mission"
        lead="Our purpose, our promise, and the standard we ask to be held to."
        crumbs={[{ label: "About Us", to: "/about" }, { label: "Vision & Mission" }]}
        image={campusImages.campusAerial}
      />

      {/* ---------------- VISION ---------------- */}
      <section className="section bg-paper">
        <div className="shell">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-20 items-start">
            {/* Left Column: Eyebrow at natural top + Large Display Headings with generous line gaps */}
            <div>
              <Reveal>
                <Eyebrow>Our vision</Eyebrow>
              </Reveal>

              <Reveal delay={stagger(1)} className="mt-8 lg:mt-12">
                <h2 className="flex flex-col space-y-9 sm:space-y-12 lg:space-y-16 xl:space-y-20">
                  <span className="font-display text-[3.5rem] sm:text-[4.5rem] lg:text-[5.25rem] xl:text-[6rem] font-extrabold tracking-[-0.035em] text-royal-700 leading-none">
                    Innovate.
                  </span>
                  <span className="font-display text-[3.5rem] sm:text-[4.5rem] lg:text-[5.25rem] xl:text-[6rem] font-extrabold tracking-[-0.035em] text-ember-600 leading-none">
                    Integrate.
                  </span>
                  <span className="font-display text-[3.5rem] sm:text-[4.5rem] lg:text-[5.25rem] xl:text-[6rem] font-extrabold tracking-[-0.035em] text-royal-900 leading-none">
                    Inspire.
                  </span>
                </h2>
              </Reveal>
            </div>

            {/* Right Column: Statement + Lab Photo */}
            <div className="space-y-8 lg:space-y-10">
              <Reveal delay={stagger(1)}>
                <p className="font-display text-[1.45rem] sm:text-[1.75rem] lg:text-[2rem] font-medium leading-[1.3] tracking-[-0.022em] text-ink">
                  {vision.statement}
                </p>
              </Reveal>

              <Reveal delay={stagger(2)} className="group">
                <div className="overflow-hidden rounded-2xl border border-stone-line bg-white p-2.5 shadow-sm transition-all duration-500 hover:shadow-lg">
                  <Figure
                    mask
                    src={campusImages.computerLab}
                    alt="Students working in a Satpuda computer laboratory"
                    ratio="16 / 10"
                    className="rounded-xl"
                  />
                  <div className="px-3.5 py-3 flex items-center justify-between text-xs text-ink-mute">
                    <span className="font-medium text-ink">Advanced Computing & AI Lab</span>
                    <span>Satpuda Main Campus · Balaghat</span>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- MISSION ---------------- */}
      <section className="section on-dark bg-royal-900 text-white">
        <div className="shell">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-20 items-start">
            {/* Left Column: Eyebrow at natural top + Large Display Headings with generous line gaps */}
            <div>
              <Reveal>
                <Eyebrow>Our mission</Eyebrow>
              </Reveal>

              <Reveal delay={stagger(1)} className="mt-8 lg:mt-12">
                <h2 className="flex flex-col space-y-9 sm:space-y-12 lg:space-y-16 xl:space-y-20">
                  <span className="font-display text-[3.5rem] sm:text-[4.5rem] lg:text-[5.25rem] xl:text-[6rem] font-extrabold tracking-[-0.035em] text-white leading-none">
                    Empower.
                  </span>
                  <span className="font-display text-[3.5rem] sm:text-[4.5rem] lg:text-[5.25rem] xl:text-[6rem] font-extrabold tracking-[-0.035em] text-ember-400 leading-none">
                    Educate.
                  </span>
                  <span className="font-display text-[3.5rem] sm:text-[4.5rem] lg:text-[5.25rem] xl:text-[6rem] font-extrabold tracking-[-0.035em] text-white/80 leading-none">
                    Elevate.
                  </span>
                </h2>
              </Reveal>
            </div>

            {/* Right Column: Statement + Mission Points */}
            <div className="space-y-8 lg:space-y-10">
              <Reveal delay={stagger(1)}>
                <p className="font-display text-[1.45rem] sm:text-[1.75rem] lg:text-[2rem] font-medium leading-[1.3] tracking-[-0.022em] text-white">
                  {mission.statement}
                </p>
              </Reveal>

              <ol className="space-y-4">
                {mission.points.map((p, i) => (
                  <Reveal key={p.title} delay={stagger(2 + i)}>
                    <li className="grid grid-cols-[2.5rem_1fr] gap-4 border-t border-white/15 pt-5 sm:grid-cols-[3.5rem_1fr] sm:gap-6">
                      <span className="font-display text-sm font-semibold tabular-nums text-ember-400">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <h3 className="font-display text-[1.125rem] font-semibold tracking-[-0.018em] text-white sm:text-[1.25rem]">
                          {p.title}
                        </h3>
                        <p className="mt-1.5 text-[0.9375rem] leading-[1.7] text-white/65">
                          {p.body}
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

      {/* ---------------- VALUES ---------------- */}
      <section className="section bg-paper-dim">
        <div className="shell">
          <div className="max-w-2xl">
            <Reveal>
              <Eyebrow>Our values</Eyebrow>
            </Reveal>
            <Reveal delay={stagger(1)}>
              <h2 className="t-h2 mt-5 text-ink">Six words that decide the difficult calls.</h2>
            </Reveal>
          </div>

          <div className="section-body grid gap-x-12 gap-y-1 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-16">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={stagger(i % 3)}>
                <article className="group border-t border-stone-line py-7 transition-colors duration-400 hover:border-royal-600">
                  <div className="flex items-baseline gap-4">
                    <span className="font-display text-xs font-semibold tabular-nums text-ember-600">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="font-display text-[1.25rem] font-semibold tracking-[-0.018em] text-ink">
                      {v.title}
                    </h3>
                  </div>
                  <p className="mt-3 pl-8 text-[0.9375rem] leading-[1.7] text-ink-soft">{v.body}</p>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal delay={stagger(3)}>
            <div className="section-body border-t border-stone-line pt-10 text-center">
              <p className="motto text-[1.5rem] leading-snug text-royal-700 sm:text-[1.875rem]">
                {site.motto}
              </p>
              <p className="mt-3 text-sm text-ink-mute">
                <em>{site.mottoTranslit}</em> — “{site.mottoMeaning}”
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <CTASection />
    </>
  );
}
