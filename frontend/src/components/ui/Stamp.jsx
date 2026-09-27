import { useId } from "react";
import { motion } from "motion/react";

/**
 * An ink seal that is pressed onto the page as it scrolls into view.
 *
 * Made for approvals and affiliations: the ring carries the kind of
 * recognition ("APPROVED", "AFFILIATED") and the centre the body that gave
 * it. It comes down from above, oversized and tilted, lands with a short
 * spring — the thud of a rubber stamp — and leaves a faint ring of ink
 * spreading out from where it hit. `index` staggers a row of them so they
 * land one after another.
 *
 * Decorative: the credential it illustrates is always written out beside
 * it, so the seal is hidden from assistive tech.
 */
export function Stamp({ ring, label, index = 0, className = "" }) {
  const id = useId();
  const delay = 0.2 + index * 0.35;
  const words = `${ring} • ${ring} • `;

  return (
    <motion.div
      aria-hidden="true"
      className={`relative shrink-0 ${className}`}
      initial="up"
      whileInView="down"
      viewport={{ once: true, margin: "0px 0px -15% 0px" }}
    >
      {/* the ink spreading out from the impact */}
      <motion.span
        className="absolute inset-0 rounded-full border-2 border-ember-500"
        variants={{
          up: { scale: 1, opacity: 0 },
          down: { scale: [1, 1.7], opacity: [0.5, 0], transition: { delay: delay + 0.28, duration: 0.8, ease: "easeOut" } },
        }}
      />
      <motion.svg
        viewBox="-50 -50 100 100"
        className="stamp-ink h-full w-full text-ember-600"
        variants={{
          up: { scale: 1.9, rotate: -28, opacity: 0, y: -18 },
          down: {
            scale: 1,
            rotate: -8,
            opacity: 1,
            y: 0,
            transition: { delay, type: "spring", stiffness: 520, damping: 22, mass: 0.9, opacity: { delay, duration: 0.12 } },
          },
        }}
      >
        <defs>
          <path id={`${id}-ring`} d="M0 0 m-36 0 a36 36 0 1 1 72 0 a36 36 0 1 1 -72 0" />
        </defs>
        <circle r="47" fill="none" stroke="currentColor" strokeWidth="2.5" />
        <circle r="28" fill="none" stroke="currentColor" strokeWidth="1.2" />
        <text
          fill="currentColor"
          style={{ fontSize: 9.5, fontWeight: 700, letterSpacing: "0.16em" }}
          className="font-display"
        >
          <textPath href={`#${id}-ring`} textLength="222" lengthAdjust="spacing">
            {words}
          </textPath>
        </text>
        <text
          y="5"
          textAnchor="middle"
          fill="currentColor"
          className="font-display"
          style={{ fontSize: label.length > 4 ? 12.5 : 15, fontWeight: 800, letterSpacing: "0.02em" }}
        >
          {label}
        </text>
      </motion.svg>
    </motion.div>
  );
}
