import { Eyebrow, Fact, Reveal } from "../ui/Primitives";
import { GrowthTimeline } from "./GrowthTimeline";
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
          {/* ---------- facts ----------
              Pinned on wide screens: the timeline beside it is several
              screens tall while it scrubs, and a figure column left at the
              top of that would spend most of the section off-screen. */}
          <div className="lg:sticky-aside">
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
          <GrowthTimeline />
        </div>
      </div>
    </section>
  );
}
