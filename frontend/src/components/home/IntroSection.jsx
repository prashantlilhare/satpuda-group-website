import { Eyebrow, Figure, Reveal, TextLink } from "../ui/Primitives";
import { campusImages } from "../../data/about";
import { site } from "../../data/site";
import { values } from "../../data/about";

export function IntroSection() {
  return (
    <section className="bg-paper py-20 sm:py-28 lg:py-32">
      <div className="shell">
        <div className="grid gap-14 lg:grid-cols-[1.05fr_1fr] lg:gap-20 xl:gap-28">
          {/* ---------- copy ---------- */}
          <div className="lg:pt-6">
            <Reveal>
              <Eyebrow>About Satpuda Group</Eyebrow>
            </Reveal>

            <Reveal delay={70}>
              <h2 className="t-h2 mt-6 text-ink">
                Four institutions, one campus, and a single idea about what
                education is for.
              </h2>
            </Reveal>

            <Reveal delay={140}>
              <div className="mt-8 space-y-5 text-[1.0625rem] leading-[1.75] text-ink-soft">
                <p>
                  Satpuda Group is a family of institutions in Balaghat, Madhya Pradesh, run by{" "}
                  <strong className="font-semibold text-ink">{site.trust}</strong>. It began in
                  1999 with an industrial training institute, on the conviction that a student
                  here should not have to leave the district to get a qualification that opens
                  real doors.
                </p>
                <p>
                  A school followed in 2009, and the Satpuda campus at Manjhapur now also carries
                  AICTE-approved degree and diploma engineering affiliated to RGPV Bhopal, along
                  with teacher education programmes. A student can enter in Class 1 and leave with
                  a B.Tech — or arrive after Class 10 and leave with a trade certificate and a job.
                </p>
              </div>
            </Reveal>

            <Reveal delay={210}>
              <div className="mt-10 border-l-2 border-ember-500 pl-6">
                <p className="motto text-[1.375rem] leading-snug text-royal-700 sm:text-[1.625rem]">
                  {site.motto}
                </p>
                <p className="mt-2.5 text-sm text-ink-mute">
                  <em>{site.mottoTranslit}</em> — “{site.mottoMeaning}”. The line on our emblem,
                  and the standard we measure ourselves against.
                </p>
              </div>
            </Reveal>

            <Reveal delay={280}>
              <p className="mt-9">
                <TextLink to="/about">Read the full story of the group</TextLink>
              </p>
            </Reveal>
          </div>

          {/* ---------- offset image pair ---------- */}
          <div className="relative">
            <Reveal className="group">
              <Figure
                src={campusImages.campusFront}
                alt="The Satpuda College of Engineering & Polytechnic building and its front approach"
                ratio="4 / 5"
                position="50% 60%"
              />
            </Reveal>

            <Reveal
              delay={180}
              className="group absolute -bottom-10 -left-3 w-[52%] border-[6px] border-paper sm:-bottom-14 sm:-left-6 sm:w-[54%] lg:-left-10"
            >
              <Figure
                src={campusImages.classroom}
                alt="Students at work in a Satpuda classroom"
                ratio="4 / 3"
              />
            </Reveal>

            {/* est. badge */}
            <Reveal
              delay={260}
              className="absolute -right-2 top-8 bg-royal-600 px-5 py-4 text-white sm:-right-6 sm:px-6 sm:py-5"
            >
              <p className="font-display text-[1.75rem] leading-none font-semibold sm:text-[2rem]">
                1999
              </p>
              <p className="mt-2 text-[0.625rem] font-semibold uppercase tracking-[0.15em] text-ember-300">
                Educating in Balaghat
              </p>
            </Reveal>
          </div>
        </div>
      </div>

      {/* ---------- values ticker ---------- */}
      <div className="mt-24 overflow-hidden border-y border-stone-line py-5 sm:mt-32">
        <div className="marquee-track flex w-max items-center gap-10 sm:gap-14">
          {[...values, ...values].map((v, i) => (
            <span key={`${v.title}-${i}`} className="flex shrink-0 items-center gap-10 sm:gap-14">
              <span className="font-display text-[1.125rem] font-semibold tracking-[-0.015em] text-royal-700 sm:text-xl">
                {v.title}
              </span>
              <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 bg-ember-500" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
