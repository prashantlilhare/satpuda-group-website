import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { Figure, Reveal, SectionHeading } from "../ui/Primitives";
import { director, principal } from "../../data/leadership";

const cards = [
  {
    person: director,
    to: "/about/director-message",
    quote: director.pullQuote,
    linkLabel: "Read the Director's message",
  },
  {
    person: principal,
    to: "/about/principal-message",
    quote:
      "We strive to create a nurturing environment that promotes critical thinking, creativity and innovation.",
    linkLabel: "Read the Principal's message",
  },
];

export function LeadershipSection() {
  return (
    <section className="bg-paper-dim py-20 sm:py-28 lg:py-32">
      <div className="shell">
        <SectionHeading
          eyebrow="Leadership"
          title="The people accountable for it."
          lead="Two messages, in their own words — on what the group is trying to build, and what students can expect when they arrive."
        />

        <div className="mt-16 grid gap-10 md:grid-cols-2 lg:gap-14">
          {cards.map(({ person, to, quote, linkLabel }, i) => (
            <Reveal key={person.name} delay={i * 120}>
              <Link to={to} className="group block">
                <article className="flex flex-col gap-7 sm:flex-row sm:gap-8">
                  <div className="w-full shrink-0 sm:w-[11.5rem] lg:w-[13rem]">
                    <Figure
                      src={person.portrait}
                      alt={person.portraitAlt}
                      ratio="4 / 5"
                      position="50% 18%"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <blockquote>
                      <p className="font-display text-[1.25rem] leading-[1.35] tracking-[-0.018em] text-ink sm:text-[1.375rem]">
                        <span aria-hidden="true" className="text-ember-500">
                          “
                        </span>
                        {quote}
                        <span aria-hidden="true" className="text-ember-500">
                          ”
                        </span>
                      </p>
                    </blockquote>

                    <div className="mt-6 border-t border-stone-line pt-5">
                      <p className="font-display text-[1.0625rem] font-semibold tracking-[-0.015em] text-ink">
                        {person.name}
                      </p>
                      <p className="mt-1 text-[0.8125rem] font-semibold uppercase tracking-[0.13em] text-ember-600">
                        {person.role}
                      </p>
                      <p className="mt-2.5 text-[0.8125rem] leading-relaxed text-ink-mute">
                        {person.qualifications}
                      </p>
                    </div>

                    <span className="mt-6 inline-flex items-center gap-2 text-[0.9375rem] font-semibold text-royal-700 transition-colors duration-300 group-hover:text-ember-600">
                      {linkLabel}
                      <ArrowUpRight
                        aria-hidden="true"
                        className="h-4 w-4 transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1 group-hover:-translate-y-1"
                      />
                    </span>
                  </div>
                </article>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
