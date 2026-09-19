import { useCallback, useLayoutEffect, useRef, useState } from "react";
import { SectionHeading } from "../ui/Primitives";
import { differentiators } from "../../data/about";
import { useSequencedReveal } from "../../hooks/useSequencedReveal";

/* The card's number, and the copy of it that rides in inside the disc.
   Identical boxes, so the hand-off between the two is invisible. */
const DIGIT = "why-digit font-display text-xs font-semibold tabular-nums";

/* Gap between one card setting off and the next. Reduced so the next card
   triggers while the previous is still animating its arrival, creating a
   more overlapping cascade effect. */
const STEP = 500;
const STEP_COMPACT = 350;

/* Rolling speed, px per second. The distance a disc has to cover depends on
   where its card sits, so the duration is derived from it rather than fixed:
   a disc in the left column and one in the right column then roll at the
   same pace instead of the far one flying. Clamped at both ends so neither
   is a blink nor a crawl. */
const SPEED = 2000;
const TRAVEL_MIN = 0.46;
const TRAVEL_MAX = 0.82;

/* Extra distance past the viewport edge, so the disc is fully outside the
   screen — including its shadow — before it starts. */
const OFFSCREEN_PAD = 40;

function sequenceStep() {
  if (typeof window === "undefined") return STEP;
  return window.matchMedia("(max-width: 639px)").matches ? STEP_COMPACT : STEP;
}

function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** `--why-circle` as a number of pixels, whatever unit it is written in. */
function circlePx(el) {
  const raw = getComputedStyle(el).getPropertyValue("--why-circle").trim();
  const n = parseFloat(raw);
  if (!Number.isFinite(n)) return 0;
  if (raw.endsWith("rem") || raw.endsWith("em")) {
    return n * parseFloat(getComputedStyle(document.documentElement).fontSize);
  }
  return n;
}

/* Row one enters from the left, row two from the right. Indexes rather than
   visual rows, which is the same thing at `lg` where the 2 × 3 grid actually
   exists, and reads as an alternating cadence below it. */
function WhyCard({ cardRef, index, delay, title, body }) {
  const number = String(index + 1).padStart(2, "0");
  const fromLeft = index < 3;
  const node = useRef(null);

  /* One ref, two owners: the sequencer needs the node to observe, and the
     measurement below needs it to read its position. */
  const attach = useCallback(
    (el) => {
      node.current = el;
      cardRef(el);
    },
    [cardRef],
  );

  /* How far the disc has to travel to reach its slot from off-screen, how
     long that takes at a constant roll, and how far it has to turn to cover
     that ground without slipping — a real wheel, not a spinning sticker.
     Measured from the card's own position, so it is right at every width
     and never assumes a layout. */
  useLayoutEffect(() => {
    const el = node.current;
    if (!el || prefersReducedMotion()) return;

    const measure = () => {
      /* Re-measuring a card that has already set off would tear its
         animation mid-flight; it keeps the numbers it started with. */
      if (el.dataset.visible === "true") return;

      const diameter = circlePx(el);
      const { left } = el.getBoundingClientRect();
      const distance = Math.round(
        fromLeft ? left + diameter + OFFSCREEN_PAD : window.innerWidth - left + OFFSCREEN_PAD,
      );
      const spin = diameter > 0 ? (distance / (diameter / 2)) * (180 / Math.PI) : 0;
      const travel = Math.min(TRAVEL_MAX, Math.max(TRAVEL_MIN, distance / SPEED));

      el.style.setProperty("--why-x", `${fromLeft ? -distance : distance}px`);
      el.style.setProperty("--why-spin", `${fromLeft ? -spin : spin}deg`);
      el.style.setProperty("--why-travel", `${travel.toFixed(3)}s`);
    };

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [fromLeft]);

  return (
    <div
      ref={attach}
      data-visible={delay !== null}
      style={{ "--why-delay": `${delay ?? 0}ms` }}
      className="why-card"
    >
      <article className="why-face group relative border-t border-stone-line py-8 transition-colors duration-400 hover:border-royal-600">
        <span className="why-plate" aria-hidden="true">
          <span className="why-wheel">
            <span className="why-disc" />
            <span className={DIGIT}>{number}</span>
          </span>
        </span>
        <span className={`why-num ${DIGIT} text-ember-600`}>{number}</span>
        <h3 className="why-copy mt-4 font-display text-[1.25rem] font-semibold tracking-[-0.018em] text-ink">
          {title}
        </h3>
        <p className="why-copy mt-3.5 text-[0.9375rem] leading-[1.7] text-ink-soft">{body}</p>
      </article>
    </div>
  );
}

export function WhySection() {
  /* Read once at mount: a card part-way through its sequence should not have
     the cadence changed underneath it by a resize. */
  const [step] = useState(sequenceStep);
  const [register, delays] = useSequencedReveal(differentiators.length, { step });

  return (
    <section className="section why-section bg-paper-dim">
      <div className="shell">
        <SectionHeading
          eyebrow="Why Satpuda Group"
          title="Reasons that hold up when you visit."
          lead="Not claims about rankings or placement percentages — the things you can verify from the campus, the approvals and the record."
        />

        <div className="section-body grid gap-x-12 gap-y-1 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-16">
          {differentiators.map((d, i) => (
            <WhyCard
              key={d.title}
              cardRef={register(i)}
              index={i}
              delay={delays[i]}
              title={d.title}
              body={d.body}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
