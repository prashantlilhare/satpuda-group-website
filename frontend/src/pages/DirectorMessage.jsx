import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { PageHero } from "../components/shared/PageHero";
import { CTASection } from "../components/shared/CTASection";
import { Eyebrow, Figure, Reveal } from "../components/ui/Primitives";
import { director, principal } from "../data/leadership";
import { campusImages } from "../data/about";
import { useSeo } from "../hooks/useSeo";

export default function DirectorMessage() {
  useSeo({
    title: "Director's Message",
    description:
      "A message from Mr. Anshul Jaiswal, Director of Satpuda Group, on practical learning, industry readiness and what a technical education in Balaghat should offer.",
    path: "/about/director-message",
  });

  return (
    <>
      <PageHero
        eyebrow="Leadership"
        title="Director's Message"
        lead={director.standfirst}
        crumbs={[{ label: "About Us", to: "/about" }, { label: "Director's Message" }]}
        image={campusImages.campusFront}
      />

      {/* ---------------- portrait + message ---------------- */}
      <section className="bg-paper py-20 sm:py-28">
        <div className="shell">
          <div className="grid gap-12 lg:grid-cols-[0.62fr_1fr] lg:gap-20">
            {/* --- portrait column --- */}
            <div className="lg:sticky lg:top-32 lg:self-start">
              <Reveal className="group">
                <Figure
                  src={director.portrait}
                  alt={director.portraitAlt}
                  ratio="4 / 5"
                  position="50% 12%"
                  zoom={false}
                />
              </Reveal>

              <Reveal delay={110}>
                <div className="mt-7 border-t-2 border-ember-500 pt-6">
                  <h2 className="font-display text-[1.5rem] font-semibold tracking-[-0.022em] text-ink">
                    {director.name}
                  </h2>
                  <p className="mt-2 text-[0.8125rem] font-semibold uppercase tracking-[0.13em] text-ember-600">
                    {director.role} · {director.org}
                  </p>
                  <p className="mt-3.5 text-[0.9375rem] text-ink-mute">
                    {director.qualifications}
                  </p>
                </div>
              </Reveal>
            </div>

            {/* --- message column --- */}
            <div>
              <Reveal>
                <blockquote>
                  <p className="font-display text-[1.75rem] leading-[1.22] tracking-[-0.026em] text-ink sm:text-[2.25rem]">
                    <span aria-hidden="true" className="text-ember-500">
                      “
                    </span>
                    {director.pullQuote}
                    <span aria-hidden="true" className="text-ember-500">
                      ”
                    </span>
                  </p>
                </blockquote>
              </Reveal>

              <Reveal delay={110}>
                <hr className="rule my-10" />
              </Reveal>

              <div className="space-y-6 text-[1.0625rem] leading-[1.78] text-ink-soft">
                {director.paragraphs.map((p, i) => (
                  <Reveal key={i} delay={140 + i * 70}>
                    <p className={i === 0 ? "first-letter:float-left first-letter:mr-3 first-letter:font-display first-letter:text-[3.75rem] first-letter:font-semibold first-letter:leading-[0.82] first-letter:text-royal-700" : ""}>
                      {p}
                    </p>
                  </Reveal>
                ))}
              </div>

              {/* --- pillars --- */}
              <div className="mt-14">
                <Reveal>
                  <Eyebrow>What that means in practice</Eyebrow>
                </Reveal>
                <ol className="mt-8">
                  {director.pillars.map((p, i) => (
                    <Reveal key={p.title} delay={i * 100}>
                      <li className="grid grid-cols-[2.75rem_1fr] gap-4 border-t border-stone-line py-6 sm:grid-cols-[4rem_1fr] sm:gap-7">
                        <span className="font-display text-xs font-semibold tabular-nums text-ember-600">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <div>
                          <h3 className="font-display text-[1.1875rem] font-semibold tracking-[-0.018em] text-ink">
                            {p.title}
                          </h3>
                          <p className="mt-2.5 text-[0.9375rem] leading-[1.7] text-ink-soft">
                            {p.body}
                          </p>
                        </div>
                      </li>
                    </Reveal>
                  ))}
                </ol>
              </div>

              {/* --- signature --- */}
              <Reveal delay={120}>
                <div className="mt-14 flex items-end justify-between gap-6 border-t border-stone-line pt-8">
                  <div>
                    <p
                      className="font-display text-[1.625rem] italic tracking-[-0.02em] text-royal-700 sm:text-[1.875rem]"
                      style={{ fontVariationSettings: '"opsz" 48' }}
                    >
                      {director.name}
                    </p>
                    <p className="mt-2 text-[0.8125rem] font-semibold uppercase tracking-[0.13em] text-ink-mute">
                      {director.role}
                    </p>
                  </div>
                  <p
                    aria-hidden="true"
                    className="hidden font-display text-[2.5rem] italic text-sand sm:block"
                  >
                    {director.initials}
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- cross-link ---------------- */}
      <section className="bg-paper-dim py-16 sm:py-20">
        <div className="shell">
          <Reveal>
            <Link
              to="/about/principal-message"
              className="group flex flex-col gap-6 border-t border-stone-line pt-8 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex items-center gap-6">
                <div className="w-20 shrink-0 sm:w-24">
                  <Figure src={principal.portrait} alt="" ratio="1 / 1" position="50% 18%" />
                </div>
                <div>
                  <p className="text-[0.625rem] font-semibold uppercase tracking-[0.15em] text-ember-600">
                    Next
                  </p>
                  <h2 className="mt-2 font-display text-[1.375rem] font-semibold tracking-[-0.02em] text-ink transition-colors duration-300 group-hover:text-royal-700 sm:text-[1.625rem]">
                    Principal's Message
                  </h2>
                  <p className="mt-1.5 text-[0.9375rem] text-ink-mute">{principal.name}</p>
                </div>
              </div>
              <ArrowUpRight
                aria-hidden="true"
                className="h-6 w-6 shrink-0 text-ink-mute transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-ember-600"
              />
            </Link>
          </Reveal>
        </div>
      </section>

      <CTASection />
    </>
  );
}
