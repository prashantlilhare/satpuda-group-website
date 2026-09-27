import { Eyebrow, Figure, ReadMore, Reveal, TextLink } from "../ui/Primitives";
import { principals } from "../../data/principals";
import { ScrollWords } from "../ui/ScrollWords";
import { stagger } from "../ui/stagger";

/**
 * The head of an institution, introduced before the page gets into what the
 * institution does: a portrait, a line in their own voice, and a short
 * account of what they are responsible for.
 *
 * Deliberately brief — a card, not a letter. Where a full message exists
 * (`messageLink`), it links out to it.
 */
export function PrincipalDesk({ institution }) {
  const p = principals[institution];
  if (!p) return null;

  return (
    <section className="section bg-paper-dim">
      <div className="shell">
        <div className="grid items-center gap-10 md:grid-cols-[0.8fr_1.2fr] lg:grid-cols-[0.62fr_1fr] lg:gap-20">
          {p.portraitRound ? (
            <Reveal className="group relative mx-auto w-full max-w-[20rem] md:max-w-[24rem]">
              {/* The same offset ember frame, drawn round to match the
                  portrait, which arrives already cut to a circle. */}
              <span
                aria-hidden="true"
                className="absolute inset-0 translate-x-3 translate-y-3 rounded-full border border-ember-500/40 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-4 group-hover:translate-y-4"
              />
              <img
                src={p.portrait}
                alt={p.portraitAlt}
                loading="lazy"
                decoding="async"
                className="relative aspect-square w-full rounded-full object-cover shadow-md"
              />
            </Reveal>
          ) : (
            <Reveal className="group relative mx-auto w-full max-w-sm md:max-w-none">
              {/* An offset ember frame behind the portrait, so it reads as a
                  placed photograph rather than a crop of the page. */}
              <span
                aria-hidden="true"
                className="absolute -bottom-3 -right-3 h-full w-full rounded-xl border border-ember-500/40 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1 group-hover:translate-y-1"
              />
              <Figure
                mask
                src={p.portrait}
                alt={p.portraitAlt}
                ratio="4 / 5"
                position="50% 18%"
                parallax={false}
                className="relative rounded-xl shadow-md"
              />
            </Reveal>
          )}

          <div>
            <Reveal>
              <Eyebrow>From the principal's desk</Eyebrow>
            </Reveal>

            <Reveal delay={stagger(1)}>
              <blockquote className="mt-6">
                <p className="font-display text-[1.5rem] leading-[1.3] tracking-[-0.022em] text-ink sm:text-[1.875rem]">
                  <span aria-hidden="true" className="text-ember-500">
                    “
                  </span>
                  <ScrollWords as="span">{p.quote}</ScrollWords>
                  <span aria-hidden="true" className="text-ember-500">
                    ”
                  </span>
                </p>
              </blockquote>
            </Reveal>

            <Reveal delay={stagger(2)}>
              <div className="mt-8 border-t border-stone-line pt-6">
                <h2 className="font-display text-[1.375rem] font-semibold tracking-[-0.02em] text-ink sm:text-[1.5rem]">
                  {p.name}
                </h2>
                <p className="mt-2 text-[0.8125rem] font-semibold uppercase tracking-[0.13em] text-ember-600">
                  {p.role} <span className="text-stone-300">·</span>{" "}
                  <span className="font-normal normal-case tracking-normal text-ink-mute">{p.org}</span>
                </p>
                {p.qualifications && (
                  <p className="mt-2 text-[0.8125rem] text-ink-mute">{p.qualifications}</p>
                )}
                <ReadMore mobileOnly className="mt-5 max-w-xl">
                  <p className="text-[1rem] leading-[1.75] text-ink-soft">{p.summary}</p>
                </ReadMore>
              </div>
            </Reveal>

            {p.messageLink && (
              <Reveal delay={stagger(3)}>
                <p className="mt-7">
                  <TextLink to={p.messageLink}>Read the principal's message</TextLink>
                </p>
              </Reveal>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
