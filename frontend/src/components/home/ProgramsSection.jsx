import { useCallback, useEffect, useRef, useState } from "react";
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

/**
 * Marks whichever row is currently crossing the middle of the screen.
 *
 * The heading beside this list is pinned while the list scrolls past it, so
 * without something to say where the eye is the column reads as four equal
 * blocks sliding by. One observer, with the root's top and bottom pulled in
 * to a narrow band across the middle of the viewport, so a row only counts
 * while it is actually being read. Two rows can occupy that band at once on
 * a short screen; the upper one wins, which is the one being left behind
 * rather than the one arriving.
 *
 * Purely a highlight — nothing moves and no content depends on it — so it
 * degrades to no highlight at all where the observer is unavailable.
 */
function useActiveRow(count) {
  const [active, setActive] = useState(-1);
  const nodes = useRef([]);
  const refs = useRef([]);

  const register = useCallback((index) => {
    refs.current[index] ??= (node) => {
      nodes.current[index] = node;
    };
    return refs.current[index];
  }, []);

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;

    const inBand = new Set();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const index = nodes.current.indexOf(entry.target);
          if (index === -1) continue;
          if (entry.isIntersecting) inBand.add(index);
          else inBand.delete(index);
        }
        setActive(inBand.size ? Math.min(...inBand) : -1);
      },
      { rootMargin: "-42% 0px -42% 0px", threshold: 0 },
    );

    nodes.current.forEach((node) => node && observer.observe(node));
    return () => observer.disconnect();
  }, [count]);

  return [register, active];
}

export function ProgramsSection() {
  const [registerRow, activeRow] = useActiveRow(families.length);

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
                  ref={registerRow(i)}
                  to={family.to}
                  data-active={i === activeRow}
                  className="group relative block border-t border-stone-line py-8 transition-colors duration-400 hover:border-royal-600 sm:py-9"
                >
                  {/* Draws over the row's own top rule while it is the row
                      being read — the same left-anchored accent the nav uses
                      for the current page. */}
                  <span
                    aria-hidden="true"
                    className="absolute -top-px left-0 h-px w-full origin-left scale-x-0 bg-ember-500 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-data-[active=true]:scale-x-100"
                  />

                  <div className="flex items-start justify-between gap-6">
                    <div className="min-w-0">
                      <span className="font-display text-xs font-semibold tabular-nums text-ink-mute transition-colors duration-300 group-hover:text-ember-600 group-data-[active=true]:text-ember-600">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h3 className="mt-2.5 font-display text-[1.5rem] font-semibold tracking-[-0.022em] text-ink transition-colors duration-300 group-hover:text-royal-700 group-data-[active=true]:text-royal-700 sm:text-[1.75rem]">
                        {family.label}
                      </h3>
                      <p className="mt-2 text-[0.8125rem] font-medium uppercase tracking-[0.1em] text-ember-600">
                        {family.meta}
                      </p>
                    </div>

                    <span className="mt-6 flex h-11 w-11 shrink-0 items-center justify-center border border-stone-line text-ink-mute transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:border-royal-600 group-hover:bg-royal-600 group-hover:text-white group-data-[active=true]:border-royal-300 group-data-[active=true]:text-royal-700">
                      <ArrowRight
                        aria-hidden="true"
                        className="h-4 w-4 transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0.5 group-data-[active=true]:translate-x-0.5"
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
