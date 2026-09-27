import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { SectionHeading } from "../ui/Primitives";
import { useReveal } from "../../hooks/useReveal";
import { institutions } from "../../data/institutions";

const number = (i) => String(i + 1).padStart(2, "0");

/* ------------------------------------------------------------------ */
/* Desktop — four strips, one open at a time                           */
/* ------------------------------------------------------------------ */

/**
 * One strip of the desktop band.
 *
 * Closed, it is a dark column carrying the institution's number and name
 * set on its side; open, it takes most of the band and shows the photograph
 * and the full copy. Pointing at a strip — or tabbing to it — opens it, so
 * the band always has exactly one institution speaking. The whole strip is
 * the link.
 *
 * The widening itself is a `flex-grow` transition in the stylesheet
 * (`.inst-strip`), and each strip rises into the band from behind its own
 * bottom edge, one after another, as the band arrives.
 */
function Strip({ item, index, open, onOpen }) {
  return (
    <Link
      to={item.to}
      data-open={open}
      onMouseEnter={onOpen}
      onFocus={onOpen}
      style={{ "--strip-index": index }}
      className="inst-strip group on-dark relative isolate flex min-w-0 overflow-hidden bg-royal-950 focus-visible:outline-offset-4"
    >
      <img
        src={item.image}
        alt=""
        loading="lazy"
        decoding="async"
        style={{ objectPosition: "50% 55%" }}
        className="inst-strip-img absolute inset-0 -z-10 h-full w-full object-cover"
      />
      <div
        aria-hidden="true"
        className="inst-strip-scrim absolute inset-0 -z-10 bg-[linear-gradient(to_top,rgba(12,21,41,0.96)_4%,rgba(12,21,41,0.66)_44%,rgba(12,21,41,0.15)_85%)]"
      />

      {/* closed: number and name on the strip's side */}
      <div aria-hidden="true" className="inst-strip-label absolute inset-0 flex flex-col items-center justify-between py-8">
        <span className="font-display text-sm font-semibold tabular-nums text-ember-300">
          {number(index)}
        </span>
        <span className="font-display text-[1.375rem] font-semibold tracking-[-0.015em] text-white [writing-mode:vertical-rl] rotate-180 whitespace-nowrap">
          {item.shortName}
        </span>
        <ArrowUpRight className="h-5 w-5 text-white/55" />
      </div>

      {/* open: the full copy, which arrives once the strip has widened */}
      <div className="inst-strip-body relative mt-auto w-full min-w-[26rem] p-9 xl:p-11">
        <div className="flex items-center gap-4">
          <span className="font-display text-sm font-semibold tabular-nums text-ember-300">
            {number(index)}
          </span>
          <span className="inline-flex bg-ember-500 px-3 py-1.5 text-[0.625rem] font-semibold uppercase tracking-[0.15em] text-white">
            {item.kicker}
          </span>
        </div>

        <h3 className="t-h3 mt-5 max-w-lg text-white xl:!text-[2rem]">{item.name}</h3>

        <p className="mt-4 max-w-md text-[0.9375rem] leading-relaxed text-white/75">
          {item.summary}
        </p>

        <ul className="mt-6 flex flex-wrap gap-2">
          {item.highlights.map((h) => (
            <li
              key={h}
              className="border border-white/22 px-3 py-1.5 text-[0.8125rem] text-white/80"
            >
              {h}
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

function StripBand() {
  const [open, setOpen] = useState(0);
  const [ref, visible] = useReveal({ threshold: 0.2 });

  return (
    <div
      ref={ref}
      data-visible={visible}
      className="inst-band section-body hidden h-[34rem] gap-2 lg:flex xl:h-[36rem]"
    >
      {institutions.map((item, i) => (
        <Strip
          key={item.id}
          item={item}
          index={i}
          open={i === open}
          onOpen={() => setOpen(i)}
        />
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Phone & tablet — cards that stack as they are scrolled past         */
/* ------------------------------------------------------------------ */

/**
 * Below `lg` there is no pointer to open a strip with, so the four become
 * full cards that pin under the header one after another: each new card
 * slides up over the last and leaves a sliver of it showing, so by the end
 * the four sit stacked like a hand of cards. Pure `position: sticky` — no
 * scroll listener — with the offsets stepped by index.
 */
function StackCard({ item, index }) {
  return (
    <li
      className="inst-stack-card sticky"
      style={{ top: `calc(var(--nav-h-compact) + 1rem + ${index * 0.85}rem)` }}
    >
      <Link
        to={item.to}
        className="group on-dark relative isolate flex min-h-[27rem] flex-col justify-end overflow-hidden bg-royal-950 shadow-[0_-18px_40px_-24px_rgba(12,21,41,0.55)] sm:min-h-[30rem]"
      >
        <img
          src={item.image}
          alt={item.imageAlt}
          loading="lazy"
          decoding="async"
          style={{ objectPosition: "50% 55%" }}
          className="absolute inset-0 -z-10 h-full w-full object-cover"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-[linear-gradient(to_top,rgba(12,21,41,0.96)_8%,rgba(12,21,41,0.7)_50%,rgba(12,21,41,0.2)_88%)]"
        />

        <div className="p-6 sm:p-9">
          <div className="flex items-center gap-3.5">
            <span className="font-display text-sm font-semibold tabular-nums text-ember-300">
              {number(index)}
            </span>
            <span className="inline-flex bg-ember-500 px-3 py-1.5 text-[0.625rem] font-semibold uppercase tracking-[0.15em] text-white">
              {item.kicker}
            </span>
          </div>
          <h3 className="t-h3 mt-4 text-white">{item.name}</h3>
          <p className="mt-3 max-w-md text-[0.9375rem] leading-relaxed text-white/75">
            {item.blurb}
          </p>
          <span className="mt-6 inline-flex items-center gap-2 text-[0.9375rem] font-semibold text-white">
            Explore
            <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
          </span>
        </div>
      </Link>
    </li>
  );
}

/* ------------------------------------------------------------------ */

export function InstitutionsSection() {
  return (
    <section className="section bg-paper-dim">
      <div className="shell">
        <SectionHeading
          eyebrow="Our institutions"
          title="One group. Four distinct routes through education."
          lead="Each institution is built for a different stage and a different kind of learner — but they share a campus, a trust and a standard."
        />

        <StripBand />

        <ul className="section-body flex flex-col gap-5 lg:hidden">
          {institutions.map((item, i) => (
            <StackCard key={item.id} item={item} index={i} />
          ))}
        </ul>
      </div>
    </section>
  );
}
