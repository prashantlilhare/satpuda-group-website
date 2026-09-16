import { Figure, Reveal, SectionHeading } from "../ui/Primitives";
import { campusExperience } from "../../data/about";

export function CampusSection() {
  const [first, ...rest] = campusExperience;

  return (
    <section className="bg-paper py-20 sm:py-28 lg:py-32">
      <div className="shell">
        <SectionHeading
          eyebrow="Campus & education experience"
          title="Ten acres that are actually used."
          lead="Laboratories, libraries, workshop sheds, a seminar hall and sports grounds — the parts of a campus that only matter if they are open and busy."
        />

        <div className="mt-16 grid gap-8 lg:grid-cols-12 lg:gap-10">
          {/* large lead item */}
          <Reveal className="group lg:col-span-7">
            <article>
              <Figure src={first.image} alt={first.alt} ratio="16 / 10" />
              <div className="mt-6 flex items-start gap-5">
                <span aria-hidden="true" className="mt-2.5 h-px w-10 shrink-0 bg-ember-500" />
                <div>
                  <h3 className="font-display text-[1.375rem] font-semibold tracking-[-0.02em] text-ink sm:text-[1.5rem]">
                    {first.title}
                  </h3>
                  <p className="mt-3 max-w-lg text-[0.9375rem] leading-[1.7] text-ink-soft">
                    {first.body}
                  </p>
                </div>
              </div>
            </article>
          </Reveal>

          {/* stacked supporting items */}
          <div className="grid gap-8 sm:grid-cols-2 lg:col-span-5 lg:grid-cols-1 lg:gap-7">
            {rest.map((item, i) => (
              <Reveal key={item.title} delay={(i + 1) * 90} className="group">
                <article className="flex gap-5">
                  <div className="w-28 shrink-0 sm:w-32 lg:w-36">
                    <Figure src={item.image} alt={item.alt} ratio="1 / 1" />
                  </div>
                  <div className="min-w-0 pt-1">
                    <h3 className="font-display text-[1.0625rem] font-semibold tracking-[-0.015em] text-ink sm:text-[1.125rem]">
                      {item.title}
                    </h3>
                    <p className="mt-2.5 text-[0.875rem] leading-[1.65] text-ink-soft">
                      {item.body}
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
