import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "motion/react";
import { Eyebrow, Odometer, Reveal, SplitText } from "../ui/Primitives";
import { credentials, groupInstitutions, groupOutcomes } from "../../data/brochure";
import { stagger } from "../ui/stagger";

/** How long the ember mark rests on each figure before moving on. */
const HOLD = 2200;

const ALL = [...groupInstitutions, ...groupOutcomes];

/** One figure: the ember rule over it fills while it is the lit one. */
function Figure({ item, on, onHold }) {
  return (
    <li onMouseEnter={onHold} className="relative cursor-default border-t border-stone-line pt-4">
      <span
        aria-hidden="true"
        data-on={on}
        className="scale-mark absolute -top-px left-0 h-0.5 w-full origin-left bg-ember-500"
      />
      <p
        className="font-display text-[clamp(1.375rem,3vw,2.5rem)] font-semibold leading-none tracking-[-0.03em] tabular-nums text-royal-800"
        style={{ fontVariationSettings: '"opsz" 72' }}
      >
        <Odometer value={item.value} />
        {item.suffix && <span className="ml-0.5 text-ember-500">{item.suffix}</span>}
      </p>
      <p
        className={`mt-2 text-[0.625rem] font-semibold uppercase leading-snug tracking-[0.1em] sm:mt-2.5 sm:text-[0.75rem] sm:tracking-[0.12em] transition-colors duration-500 ${
          on ? "text-ember-600" : "text-ink-soft"
        }`}
      >
        {item.label}
      </p>
    </li>
  );
}

/** The two approval badges and the job portal, as the brochure's cover has them. */
function Credentials() {
  return (
    <ul className="flex flex-wrap items-center gap-x-6 gap-y-4 sm:gap-x-8">
      {credentials.map((c, i) => {
        const body = (
          <>
            <img
              src={c.logo}
              alt=""
              width={c.width}
              height={c.height}
              loading="lazy"
              decoding="async"
              className="h-12 w-auto shrink-0 sm:h-14"
            />
            <span className="leading-tight">
              <span className="block text-[0.875rem] font-semibold text-ink">{c.title}</span>
              <span className="mt-0.5 block text-[0.75rem] text-ink-mute">{c.note}</span>
            </span>
          </>
        );
        return (
          <li key={c.id} className={`flex items-center ${i > 0 ? "sm:border-l sm:border-stone-line sm:pl-8" : ""}`}>
            {c.href ? (
              <a
                href={c.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 transition-opacity duration-300 hover:opacity-80"
              >
                {body}
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            ) : (
              <span className="flex items-center gap-3">{body}</span>
            )}
          </li>
        );
      })}
    </ul>
  );
}

/**
 * The group in figures, straight under the hero — the first proof a
 * visitor meets. All twelve circles from the brochure: what the group runs
 * on the first row, what it adds up to on the second, each rolling in on
 * the odometer once. Above them, the approvals and the job portal.
 *
 * A short ember mark walks slowly along the figures' top rules, one at a
 * time; pointing at a figure moves it there and holds it. It only walks
 * while the band is on screen, and not at all under reduced motion.
 */
export function GroupScale() {
  const ref = useRef(null);
  const onScreen = useInView(ref);
  const still = useReducedMotion();
  const [active, setActive] = useState(0);
  const [held, setHeld] = useState(false);

  useEffect(() => {
    if (held || still || !onScreen) return;
    const t = setTimeout(() => setActive((a) => (a + 1) % ALL.length), HOLD);
    return () => clearTimeout(t);
  }, [active, held, still, onScreen]);

  const hold = (i) => () => {
    setActive(i);
    setHeld(true);
  };

  return (
    <section id="at-a-glance" aria-label="Satpuda Group at a glance" className="section-tight border-b border-royal-100 bg-white">
      <div className="shell">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-xl">
            <Reveal>
              <Eyebrow>Satpuda Group at a glance</Eyebrow>
            </Reveal>
            <SplitText as="h2" delay={90} className="t-h3 mt-4 block text-ink">
              Since 1999, across Madhya Pradesh.
            </SplitText>
          </div>
          <Reveal delay={stagger(2)}>
            <Credentials />
          </Reveal>
        </div>

        <div ref={ref} className="mt-8 space-y-6 sm:mt-10 sm:space-y-8" onMouseLeave={() => setHeld(false)}>
          <ul aria-label="Institutions in the group" className="grid grid-cols-3 gap-x-4 gap-y-6 sm:gap-x-6 sm:gap-y-7 lg:grid-cols-6">
            {groupInstitutions.map((item, i) => (
              <Figure key={item.label} item={item} on={i === active} onHold={hold(i)} />
            ))}
          </ul>
          <ul aria-label="The group in numbers" className="grid grid-cols-3 gap-x-4 gap-y-6 sm:gap-x-6 sm:gap-y-7 lg:grid-cols-6">
            {groupOutcomes.map((item, i) => {
              const at = groupInstitutions.length + i;
              return <Figure key={item.label} item={item} on={at === active} onHold={hold(at)} />;
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
