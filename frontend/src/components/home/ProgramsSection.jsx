import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Reveal, SectionHeading, TextLink } from "../ui/Primitives";
import { btechBranches, diplomaBranches, itiTrades, teacherEducation } from "../../data/programs";
import { stagger } from "../ui/stagger";

const families = [
  {
    to: "/institutes/btech-polytechnic",
    label: "B.Tech — Degree Engineering",
    meta: "4 years · AICTE approved · RGPV Bhopal",
    items: btechBranches.map((b) => b.name),
  },
  {
    to: "/institutes/btech-polytechnic",
    label: "Diploma — Polytechnic",
    meta: "3 years · DTE, Government of Madhya Pradesh",
    items: diplomaBranches.map((b) => b.name),
  },
  {
    to: "/institutes/iti",
    label: "ITI — Craftsman Training",
    meta: "1–2 years · NCVT certified",
    items: itiTrades.map((t) => t.name),
  },
  {
    to: "/institutes/ded-bed",
    label: "Teacher Education",
    meta: "D.Ed & B.Ed · classroom practice",
    items: teacherEducation.map((t) => `${t.code} — ${t.name}`),
  },
];

export function ProgramsSection() {
  return (
    <section className="section bg-paper">
      <div className="shell">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
          <div className="lg:sticky-aside">
            <SectionHeading
              eyebrow="Academic programmes"
              title="What you can study here."
              lead="Degree and diploma engineering, NCVT trade certification and teacher education — all on the Satpuda campus at Manjhapur."
            />
            <Reveal delay={stagger(3)}>
              <p className="mt-8 text-sm leading-relaxed text-ink-mute">
                Programme durations and eligibility follow AICTE, RGPV and NCVT norms. For the
                current session's intake, fees and admission dates, please contact the institution
                directly.
              </p>
            </Reveal>
          </div>

          <div>
            {families.map((family, i) => (
              <Reveal key={family.label} delay={stagger(i)}>
                <Link
                  to={family.to}
                  className="group block border-t border-stone-line py-8 transition-colors duration-400 hover:border-royal-600 sm:py-9"
                >
                  <div className="flex items-start justify-between gap-6">
                    <div className="min-w-0">
                      <span className="font-display text-xs font-semibold tabular-nums text-ink-mute">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h3 className="mt-2.5 font-display text-[1.5rem] font-semibold tracking-[-0.022em] text-ink transition-colors duration-300 group-hover:text-royal-700 sm:text-[1.75rem]">
                        {family.label}
                      </h3>
                      <p className="mt-2 text-[0.8125rem] font-medium uppercase tracking-[0.1em] text-ember-600">
                        {family.meta}
                      </p>
                    </div>

                    <span className="mt-6 flex h-11 w-11 shrink-0 items-center justify-center border border-stone-line text-ink-mute transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:border-royal-600 group-hover:bg-royal-600 group-hover:text-white">
                      <ArrowRight
                        aria-hidden="true"
                        className="h-4 w-4 transition-transform duration-400 group-hover:translate-x-0.5"
                      />
                    </span>
                  </div>

                  <ul className="mt-6 flex flex-wrap gap-2">
                    {family.items.map((item) => (
                      <li
                        key={item}
                        className="border border-stone-line px-3 py-1.5 text-[0.8125rem] text-ink-soft transition-colors duration-300 group-hover:border-royal-200 group-hover:bg-royal-50"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </Link>
              </Reveal>
            ))}

            <Reveal delay={stagger(5)}>
              <div className="border-t border-stone-line pt-8">
                <TextLink to="/contact">Ask about admissions for this session</TextLink>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
