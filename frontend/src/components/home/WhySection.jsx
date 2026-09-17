import { Reveal, SectionHeading } from "../ui/Primitives";
import { differentiators } from "../../data/about";
import { stagger } from "../ui/stagger";

export function WhySection() {
  return (
    <section className="section bg-paper-dim">
      <div className="shell">
        <SectionHeading
          eyebrow="Why Satpuda Group"
          title="Reasons that hold up when you visit."
          lead="Not claims about rankings or placement percentages — the things you can verify from the campus, the approvals and the record."
        />

        <div className="section-body grid gap-x-12 gap-y-1 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-16">
          {differentiators.map((d, i) => (
            <Reveal key={d.title} delay={stagger(i % 3)}>
              <article className="group border-t border-stone-line py-8 transition-colors duration-400 hover:border-royal-600">
                <span className="font-display text-xs font-semibold tabular-nums text-ember-600">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 font-display text-[1.25rem] font-semibold tracking-[-0.018em] text-ink">
                  {d.title}
                </h3>
                <p className="mt-3.5 text-[0.9375rem] leading-[1.7] text-ink-soft">{d.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
