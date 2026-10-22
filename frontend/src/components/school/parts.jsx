import { Fragment } from "react";
import { motion } from "motion/react";
import { EASE } from "./motion";

/**
 * The prospectus's gold swoosh in a page corner — two curved strokes that
 * draw themselves in once. `flip` mirrors it into the right-hand corner.
 */
export function Swoosh({ flip = false, className = "" }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 320 160"
      fill="none"
      className={`pointer-events-none absolute top-0 h-28 w-56 sm:h-40 sm:w-80 ${flip ? "right-0 -scale-x-100" : "left-0"} ${className}`}
    >
      <motion.path
        d="M0 150 C 70 70, 170 20, 320 6"
        stroke="var(--color-amber-400)"
        strokeWidth="14"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, ease: EASE }}
      />
      <motion.path
        d="M0 112 C 60 50, 150 14, 260 2"
        stroke="var(--color-amber-200)"
        strokeOpacity="0.6"
        strokeWidth="5"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, ease: EASE, delay: 0.2 }}
      />
    </svg>
  );
}

/**
 * The prospectus's headline: condensed capitals in two colours — `a` plain,
 * `b` highlighted — each half rising from behind its own baseline.
 * `dark` sets it for a royal band (white + amber), otherwise ink + ember.
 */
export function TwoTone({ a, b, as: Tag = "h2", dark = false, className = "", bFirst = false }) {
  const parts = bFirst ? [[b, true], [a, false]] : [[a, false], [b, true]];
  return (
    <Tag className={`font-display text-[2.125rem] font-extrabold uppercase leading-[0.98] tracking-[-0.03em] sm:text-[3rem] lg:text-[3.5rem] ${className}`}>
      {parts.map(([text, hi], i) => (
        <Fragment key={text}>
          {i > 0 && " "}
          <span className="inline-block overflow-hidden pb-1 align-bottom">
          <motion.span
            className={`inline-block ${hi ? (dark ? "text-amber-400" : "text-ember-600") : dark ? "text-white" : "text-ink"}`}
            initial={{ y: "105%" }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: EASE, delay: i * 0.12 }}
          >
            {text}
          </motion.span>
          </span>
        </Fragment>
      ))}
    </Tag>
  );
}

/** A short amber rule under a headline, drawn out once. */
export function Rule({ className = "" }) {
  return (
    <motion.span
      aria-hidden="true"
      className={`block h-[3px] w-28 origin-left rounded-full bg-amber-400 ${className}`}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.9, ease: EASE, delay: 0.3 }}
    />
  );
}

/** The prospectus's bullet — an amber square with a dark dot. */
export function Bullet({ dark = false }) {
  return (
    <span aria-hidden="true" className="grid h-4 w-4 shrink-0 place-items-center rounded-[3px] bg-amber-400">
      <span className={`h-1.5 w-1.5 rounded-full ${dark ? "bg-royal-950" : "bg-royal-900"}`} />
    </span>
  );
}

/**
 * A photograph that opens larger in the page's lightbox when clicked.
 * `onView(frame, rect)` comes from the page.
 */
export function Zoom({ photo, onView, className = "", imgClass = "", sizes = "33vw", label }) {
  return (
    <button
      type="button"
      onClick={(e) => onView?.({ src: photo.src, alt: photo.alt }, e.currentTarget.getBoundingClientRect())}
      aria-label={`View larger: ${label ?? photo.caption ?? photo.alt}`}
      className={`group/zoom block cursor-zoom-in overflow-hidden outline-none focus-visible:ring-2 focus-visible:ring-amber-400 ${className}`}
    >
      <img
        src={photo.small ?? photo.src}
        srcSet={photo.srcSet}
        sizes={sizes}
        alt={photo.alt}
        loading="lazy"
        decoding="async"
        style={{ objectPosition: photo.focus }}
        className={`h-full w-full object-cover transition-transform duration-700 ease-out group-hover/zoom:scale-[1.05] ${imgClass}`}
      />
    </button>
  );
}
