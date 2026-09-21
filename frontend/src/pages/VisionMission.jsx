import { PageHero } from "../components/shared/PageHero";
import { CTASection } from "../components/shared/CTASection";
import { PhotoGrid } from "../components/shared/PhotoGrid";
import { photo } from "../data/photos";
import { Eyebrow, Figure, Reveal, SplitText } from "../components/ui/Primitives";
import { campusImages, mission, values, vision } from "../data/about";
import { site } from "../data/site";
import { useSeo } from "../hooks/useSeo";
import { stagger } from "../components/ui/stagger";

/* A mission is easier to believe when it is shown: four institutions on one
   campus, in an ordinary week. */
const campusLife = [
  { ...photo("0041", "Students filling the campus hall for a college session", "50% 40%"), caption: "One campus, four institutions" },
  { ...photo("0046", "A collaborative robot being demonstrated in the laboratory", "50% 45%"), caption: "Equipment students work on, not around" },
  { ...photo("0053", "Young students presenting a project in the school corridor", "50% 45%"), caption: "From Class 1 upward" },
  { ...photo("0067", "Staff and students making a rangoli for a campus celebration", "50% 45%"), caption: "A calendar, not only a syllabus" },
];

/* The mission section used to be three words and a numbered list; this is what
   the three words look like on the floor. */
const missionPhoto = photo(
  "0027",
  "An ITI trainee explaining a wiring board he built to visitors",
  "50% 45%",
);

/**
 * Rendered twice, once per breakpoint, because the two layouts want it in
 * different columns: under the headings on a phone, and where the numbered
 * list used to sit on a laptop. Same file either way, so the second copy
 * costs no extra download.
 */
function MissionPhoto({ className = "" }) {
  return (
    <Reveal delay={stagger(2)} className={`group ${className}`}>
      <div className="overflow-hidden rounded-2xl border border-white/15 bg-white/[0.06] p-2.5">
        <Figure
          src={missionPhoto.src}
          srcSet={missionPhoto.srcSet}
          sizes="(min-width: 1024px) 45vw, 100vw"
          alt={missionPhoto.alt}
          ratio="16 / 10"
          position={missionPhoto.focus}
          className="rounded-xl"
        />
        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 px-3.5 py-3 text-xs text-white/55">
          <span className="font-medium text-white">Trade training, explained by the trainee</span>
          <span>Satpuda ITI · Manjhapur</span>
        </div>
      </div>
    </Reveal>
  );
}

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
        image={photo("0051", "Students explaining a working model they built", "50% 42%")}
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

              {/* Phone: directly under the three words, where it reads as part
                  of the same statement. */}
              <MissionPhoto className="mt-10 lg:hidden" />
            </div>

            {/* Right Column: the statement, and on a laptop the photograph in
                place of the numbered Empower / Educate / Elevate list — the
                three words are already the heading beside it, so the list was
                saying them a second time. */}
            <div className="space-y-8 lg:space-y-10">
              <Reveal delay={stagger(1)}>
                <p className="font-display text-[1.45rem] sm:text-[1.75rem] lg:text-[2rem] font-medium leading-[1.3] tracking-[-0.022em] text-white">
                  {mission.statement}
                </p>
              </Reveal>

              <MissionPhoto className="hidden lg:block" />
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
              <SplitText as="h2" className="t-h2 mt-5 block text-ink">Six words that decide the difficult calls.</SplitText>
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

      {/* ---------------- campus life ---------------- */}
      <section className="section bg-paper">
        <div className="shell">
          <div className="max-w-2xl">
            <Reveal>
              <Eyebrow>On campus</Eyebrow>
            </Reveal>
            <SplitText as="h2" delay={90} className="t-h2 mt-5 block text-ink">
              What that looks like on an ordinary week.
            </SplitText>
          </div>
          <PhotoGrid items={campusLife} className="section-body" />
        </div>
      </section>

      <CTASection />
    </>
  );
}
