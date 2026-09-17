import { Eyebrow, Fact, Reveal } from "../ui/Primitives";
import { milestones } from "../../data/institutions";
import { stagger } from "../ui/stagger";

/**
 * Deliberately restricted to figures that can be checked against an official
 * source or simply counted from this site. No placement percentages, no
 * enrolment totals, no rankings.
 */
const facts = [
  { value: "1999", label: "Educating since", sub: "The group's first institution opened in Balaghat" },
  { value: "04", label: "Institutions", sub: "School, ITI, teacher education, engineering" },
  { value: "09", label: "Engineering branches", sub: "5 degree, 4 diploma disciplines" },
  { value: "10", label: "Acre campus", sub: "Teaching blocks, labs, library and grounds" },
];

export function FactsSection() {
  return (
    <section className="section on-dark bg-royal-900 text-white">
      <div className="shell">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
          {/* ---------- facts ---------- */}
          <div>
            <Reveal>
              <Eyebrow>The group at a glance</Eyebrow>
            </Reveal>
            <Reveal delay={stagger(1)}>
              <h2 className="t-h2 mt-5 max-w-md text-white">
                Figures we can stand behind.
              </h2>
            </Reveal>

            <div className="mt-10 grid grid-cols-2 gap-x-8 gap-y-10 sm:gap-x-12">
              {facts.map((f, i) => (
                <Reveal key={f.label} delay={stagger(i)}>
                  <div className="border-t border-white/18 pt-6">
                    <Fact value={f.value} label={f.label} sub={f.sub} dark />
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* ---------- milestones ---------- */}
          <div className="lg:pl-10 lg:border-l lg:border-white/12">
            <Reveal>
              <Eyebrow>How it grew</Eyebrow>
            </Reveal>

            <ol className="mt-10">
              {milestones.map((m, i) => (
                <Reveal key={m.year} delay={stagger(i)}>
                  <li className="relative grid grid-cols-[4.5rem_1fr] gap-5 pb-11 sm:grid-cols-[6rem_1fr] sm:gap-7">
                    {/* connector */}
                    {i < milestones.length - 1 && (
                      <span
                        aria-hidden="true"
                        className="absolute left-[0.3rem] top-3 h-full w-px bg-white/15 sm:left-[0.4rem]"
                      />
                    )}
                    <span className="relative flex items-start gap-3">
                      <span
                        aria-hidden="true"
                        className="mt-[0.4rem] h-[0.6rem] w-[0.6rem] shrink-0 rounded-full bg-ember-500 ring-4 ring-royal-900"
                      />
                      <span className="font-display text-[0.9375rem] font-semibold text-ember-300 sm:text-base">
                        {m.year}
                      </span>
                    </span>

                    <div className="min-w-0">
                      <h3 className="font-display text-[1.125rem] font-semibold tracking-[-0.015em] text-white sm:text-[1.25rem]">
                        {m.title}
                      </h3>
                      <p className="mt-2.5 text-[0.9375rem] leading-[1.7] text-white/62">
                        {m.body}
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
  );
}
