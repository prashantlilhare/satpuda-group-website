import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { Figure, Reveal, SectionHeading } from "../ui/Primitives";
import { institutions } from "../../data/institutions";

/* ------------------------------------------------------------------ */
/* Featured — the large block                                          */
/* ------------------------------------------------------------------ */

function FeaturedInstitution({ item }) {
  return (
    // Flex column anchored to the bottom: the card grows to fit its copy rather
    // than letting an absolutely-positioned block overflow and clip on narrow
    // screens. The photograph is a background layer behind it.
    <Link
      to={item.to}
      className="group on-dark relative isolate flex h-full min-h-[31rem] flex-col justify-end overflow-hidden bg-royal-950 focus-visible:outline-offset-4 sm:min-h-[33rem] lg:min-h-[34rem]"
    >
      <img
        src={item.image}
        alt={item.imageAlt}
        loading="lazy"
        decoding="async"
        style={{ objectPosition: "50% 55%" }}
        className="absolute inset-0 -z-10 h-full w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(to_top,rgba(12,21,41,0.95)_6%,rgba(12,21,41,0.7)_46%,rgba(12,21,41,0.2)_82%)] transition-opacity duration-500 group-hover:opacity-[0.94]"
      />

      <div className="relative p-7 sm:p-10">
        <span className="inline-flex items-center gap-2.5 bg-ember-500 px-3.5 py-1.5 text-[0.625rem] font-semibold uppercase tracking-[0.15em] text-white">
          {item.kicker}
        </span>

        <h3 className="t-h3 mt-5 max-w-lg text-white sm:!text-[2rem]">{item.name}</h3>

        <p className="mt-4 max-w-md text-[0.9375rem] leading-relaxed text-white/72">
          {item.summary}
        </p>

        <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2">
          {item.credentials.map((c) => (
            <li
              key={c}
              className="flex items-center gap-2 text-[0.8125rem] font-medium text-white/65"
            >
              <span aria-hidden="true" className="h-1 w-1 shrink-0 bg-ember-400" />
              {c}
            </li>
          ))}
        </ul>

        <span className="mt-8 inline-flex items-center gap-2.5 text-[0.9375rem] font-semibold text-white">
          Explore
          <ArrowUpRight
            aria-hidden="true"
            className="h-4 w-4 transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1 group-hover:-translate-y-1"
          />
          <span
            aria-hidden="true"
            className="ml-1 h-px w-10 origin-left bg-ember-500 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-[1.8]"
          />
        </span>
      </div>
    </Link>
  );
}

/* ------------------------------------------------------------------ */
/* Supporting — the stacked blocks                                     */
/* ------------------------------------------------------------------ */

function InstitutionRow({ item, index }) {
  return (
    <Link
      to={item.to}
      className="group relative flex items-stretch gap-5 border-t border-stone-line py-6 transition-colors duration-400 hover:border-royal-600 sm:gap-7 sm:py-7"
    >
      <span className="w-8 shrink-0 pt-1 font-display text-sm font-semibold tabular-nums text-ink-mute transition-colors duration-300 group-hover:text-ember-600">
        {String(index).padStart(2, "0")}
      </span>

      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="text-[0.625rem] font-semibold uppercase tracking-[0.15em] text-ember-600">
              {item.kicker}
            </p>
            <h3 className="mt-2 font-display text-[1.25rem] font-semibold tracking-[-0.018em] text-ink transition-colors duration-300 group-hover:text-royal-700 sm:text-[1.375rem]">
              {item.shortName}
            </h3>
          </div>

          <ArrowUpRight
            aria-hidden="true"
            className="mt-1 h-5 w-5 shrink-0 text-ink-mute transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-ember-600"
          />
        </div>

        <p className="mt-3 max-w-md text-[0.9375rem] leading-relaxed text-ink-soft">
          {item.blurb}
        </p>

        {/* revealed on hover, desktop only — avoids hiding content on touch */}
        <ul className="mt-3.5 hidden flex-wrap gap-x-4 gap-y-1.5 opacity-0 transition-opacity duration-400 group-hover:opacity-100 lg:flex">
          {item.highlights.map((h) => (
            <li key={h} className="text-[0.8125rem] text-ink-mute">
              {h}
            </li>
          ))}
        </ul>
      </div>

      <div className="hidden w-28 shrink-0 self-center overflow-hidden sm:block">
        <Figure src={item.image} alt="" ratio="4 / 3" zoom />
      </div>
    </Link>
  );
}

/* ------------------------------------------------------------------ */

export function InstitutionsSection() {
  const featured = institutions.find((i) => i.featured);
  const rest = institutions.filter((i) => !i.featured);

  return (
    <section className="bg-paper-dim py-20 sm:py-28 lg:py-32">
      <div className="shell">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <SectionHeading
            eyebrow="Our institutions"
            title="One group. Four distinct routes through education."
            lead="Each institution is built for a different stage and a different kind of learner — but they share a campus, a trust and a standard."
          />
        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-[1.12fr_1fr] lg:gap-14 xl:gap-20">
          <Reveal className="h-full">
            <FeaturedInstitution item={featured} />
          </Reveal>

          <Reveal delay={120}>
            <div className="border-b border-stone-line">
              {rest.map((item, i) => (
                <InstitutionRow key={item.id} item={item} index={i + 2} />
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
