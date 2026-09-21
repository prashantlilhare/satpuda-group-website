import { Fragment, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight, ChevronDown } from "lucide-react";
import { useReveal } from "../../hooks/useReveal";
import { stagger } from "./stagger";

/* ------------------------------------------------------------------ */
/* Reveal — scroll-triggered entrance                                  */
/* ------------------------------------------------------------------ */

export function Reveal({ as: Tag = "div", delay = 0, className = "", children, ...rest }) {
  const [ref, visible] = useReveal();
  return (
    <Tag
      ref={ref}
      data-visible={visible}
      style={{ "--reveal-delay": `${delay}ms` }}
      className={`reveal ${className}`}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/* ------------------------------------------------------------------ */
/* SplitText — word-by-word entrance for headings                      */
/* ------------------------------------------------------------------ */

/**
 * Rises a heading into place one word at a time as it scrolls into view.
 *
 * Each word sits in its own clipped box, so the words come up from behind
 * their own baseline rather than simply fading — the small difference between
 * "animated" and "typeset". The spaces are left outside the boxes so the line
 * still wraps normally, and the boxes carry a little bottom padding so
 * descenders are not shaved off.
 *
 * Plain text only; anything else is rendered untouched. Reduced motion shows
 * the finished heading with no movement at all.
 */
export function SplitText({ as: Tag = "span", children, className = "", delay = 0 }) {
  const [ref, visible] = useReveal({ threshold: 0.2 });

  if (typeof children !== "string") {
    return <Tag className={className}>{children}</Tag>;
  }

  const words = children.split(" ");

  return (
    <Tag
      ref={ref}
      data-visible={visible}
      className={`split-text ${className}`}
      style={{ "--split-delay": `${delay}ms` }}
    >
      {words.map((word, i) => (
        <Fragment key={`${word}-${i}`}>
          <span className="split-word">
            <span className="split-word-inner" style={{ "--word-index": i }}>
              {word}
            </span>
          </span>
          {i < words.length - 1 ? " " : ""}
        </Fragment>
      ))}
    </Tag>
  );
}

/* ------------------------------------------------------------------ */
/* Eyebrow                                                             */
/* ------------------------------------------------------------------ */

export function Eyebrow({ children, className = "" }) {
  return <span className={`eyebrow ${className}`}>{children}</span>;
}

/* ------------------------------------------------------------------ */
/* Button — shared visual language for links and real buttons          */
/* ------------------------------------------------------------------ */

/* The lift is deliberately small — 2px — and paired with a tinted shadow
   rather than a grey one, so a row of buttons reads as paper being picked
   up rather than as a card popping. `active:` returns it to the surface so
   a press still feels like a press. */
const BASE =
  "group/btn inline-flex items-center justify-center gap-2.5 font-sans font-semibold " +
  "tracking-[-0.01em] transition-[background-color,color,border-color,transform,box-shadow] " +
  "duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 active:translate-y-0 " +
  "disabled:opacity-55 disabled:pointer-events-none disabled:hover:translate-y-0";

/* `compact` is the phone-first size: a smaller tap target that grows to the
   standard one from `sm` up. Used where several buttons share a tight band,
   such as the hero, where the default size was overpowering on a phone. */
const SIZES = {
  md: "px-6 py-3.5 text-[0.9375rem]",
  compact:
    "px-3.5 py-2 text-[0.8125rem] gap-1.5 sm:gap-2.5 sm:px-5 sm:py-3 sm:text-[0.9375rem]",
};

const VARIANTS = {
  primary:
    "bg-royal-600 text-white hover:bg-royal-700 hover:shadow-[0_12px_26px_-14px_rgba(20,34,68,0.75)]",
  ember:
    "bg-ember-500 text-white hover:bg-ember-600 hover:shadow-[0_12px_26px_-14px_rgba(156,38,23,0.8)]",
  outline:
    "border border-royal-600/30 text-royal-700 hover:border-royal-600 hover:bg-royal-600 hover:text-white " +
    "hover:shadow-[0_12px_26px_-14px_rgba(20,34,68,0.7)]",
  ghostLight:
    "border border-white/35 text-white hover:bg-white hover:text-royal-700 hover:border-white",
  /* Stays white on hover. Flipping the one light button on a royal band to
     red made red read as "the hover colour" site-wide; it is an accent. */
  solidLight:
    "bg-white text-royal-700 hover:bg-royal-50 hover:text-royal-800 " +
    "hover:shadow-[0_12px_28px_-14px_rgba(0,0,0,0.45)]",
};

export function Button({
  as,
  to,
  href,
  variant = "primary",
  size = "md",
  arrow = true,
  className = "",
  children,
  ...rest
}) {
  const cls = `${BASE} ${SIZES[size] ?? SIZES.md} ${VARIANTS[variant] ?? VARIANTS.primary} ${className}`;
  const inner = (
    <>
      {children}
      {arrow && (
        <ArrowRight
          aria-hidden="true"
          className="h-4 w-4 shrink-0 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/btn:translate-x-1"
        />
      )}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={cls} {...rest}>
        {inner}
      </Link>
    );
  }
  if (href) {
    return (
      <a href={href} className={cls} {...rest}>
        {inner}
      </a>
    );
  }
  const Tag = as ?? "button";
  return (
    <Tag className={cls} {...rest}>
      {inner}
    </Tag>
  );
}

/* ------------------------------------------------------------------ */
/* TextLink — quiet inline link with an animated underline             */
/* ------------------------------------------------------------------ */

export function TextLink({ to, href, external, children, className = "", ...rest }) {
  const cls = `link-underline inline-flex items-center gap-1.5 font-semibold text-royal-700 hover:text-ember-600 transition-colors duration-300 ${className}`;
  if (external || href) {
    return (
      <a
        href={href}
        className={cls}
        target={external ? "_blank" : undefined}
        rel={external ? "noreferrer noopener" : undefined}
        {...rest}
      >
        {children}
        {external && <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" />}
      </a>
    );
  }
  return (
    <Link to={to} className={cls} {...rest}>
      {children}
    </Link>
  );
}

/* ------------------------------------------------------------------ */
/* SectionHeading                                                      */
/* ------------------------------------------------------------------ */

export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = "left",
  as: Tag = "h2",
  className = "",
  children,
}) {
  const centred = align === "center";
  return (
    <div
      className={`${centred ? "mx-auto max-w-2xl text-center" : "max-w-2xl"} ${className}`}
    >
      {eyebrow && (
        <Reveal>
          <Eyebrow className={centred ? "justify-center" : ""}>{eyebrow}</Eyebrow>
        </Reveal>
      )}
      <SplitText as={Tag} delay={90} className="t-h2 mt-5 block text-ink">
        {title}
      </SplitText>
      {lead && (
        <Reveal delay={stagger(2)}>
          <p className="t-lead mt-5">{lead}</p>
        </Reveal>
      )}
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Figure — image with consistent crop + hover zoom                    */
/* ------------------------------------------------------------------ */

export function Figure({
  src,
  /* Optional responsive pair for the campus library, whose photographs ship
     at 1600w and 960w — a phone has no use for the larger file. */
  srcSet,
  sizes = "(min-width: 1024px) 33vw, 100vw",
  alt,
  ratio = "4 / 3",
  className = "",
  imgClassName = "",
  zoom = true,
  /* Wipes the frame open as it enters, instead of the picture fading in
     with the block around it. For the one large photograph a section
     opens on — see `.img-mask`; on a row of thumbnails it reads as
     fidget. Needs a `<Reveal>` somewhere above it to trigger from. */
  mask = false,
  position = "center",
  loading = "lazy",
  children,
}) {
  return (
    <figure
      className={`relative overflow-hidden bg-royal-900/5 ${mask ? "img-mask" : ""} ${className}`}
      style={{ aspectRatio: ratio }}
    >
      <img
        src={src}
        srcSet={srcSet}
        sizes={srcSet ? sizes : undefined}
        alt={alt}
        loading={loading}
        decoding="async"
        style={{ objectPosition: position }}
        className={`h-full w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
          zoom ? "group-hover:scale-[1.05]" : ""
        } ${imgClassName}`}
      />
      {children}
    </figure>
  );
}

/* ------------------------------------------------------------------ */
/* Fact — a labelled figure/stat, used only for verifiable numbers     */
/* ------------------------------------------------------------------ */

const COUNT_MS = 1150;

/** Where a count starts: a year climbs its last stretch, a count starts at 0. */
function countFrom(target) {
  return target > 999 ? target - 22 : 0;
}

/**
 * Counts a figure up as it comes into view.
 *
 * Only ever used on a value that is entirely digits — "04" counts, "NCVT"
 * and "Co-ed" do not — and the result is padded back to the width it was
 * written at, so `04` never renders as `4`. The type is tabular, so the
 * digits do not shuffle sideways while they change.
 *
 * With reduced motion (or no IntersectionObserver) `useReveal` reports
 * visible straight away and the state starts on the answer, so the figure
 * is simply printed.
 */
function CountUp({ value }) {
  const target = Number(value);
  const [ref, visible] = useReveal({ threshold: 0.35 });
  const [shown, setShown] = useState(() => (visible ? target : countFrom(target)));

  useEffect(() => {
    if (!visible) return;
    /* `useReveal` reports visible from the first render under reduced
       motion, so the state was initialised on the answer already — there
       is nothing to do but leave it there. */
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const from = countFrom(target);
    const started = performance.now();
    let frame = requestAnimationFrame(function step(now) {
      const p = Math.min(1, (now - started) / COUNT_MS);
      /* Out-cubic: most of the distance early, then a slow last few. */
      const eased = 1 - Math.pow(1 - p, 3);
      setShown(Math.round(from + (target - from) * eased));
      if (p < 1) frame = requestAnimationFrame(step);
    });

    return () => cancelAnimationFrame(frame);
  }, [visible, target]);

  return <span ref={ref}>{String(shown).padStart(value.length, "0")}</span>;
}

export function Fact({ value, label, sub, dark = false }) {
  const counts = /^\d+$/.test(value);

  return (
    <div>
      <p
        className={`font-display text-[clamp(2.25rem,4.4vw,3.25rem)] font-semibold leading-none tracking-[-0.03em] tabular-nums ${
          dark ? "text-white" : "text-royal-700"
        }`}
        style={{ fontVariationSettings: '"opsz" 72' }}
      >
        {counts ? <CountUp value={value} /> : value}
      </p>
      <p
        className={`mt-3 text-[0.8125rem] font-semibold uppercase tracking-[0.13em] ${
          dark ? "text-ember-300" : "text-ember-600"
        }`}
      >
        {label}
      </p>
      {sub && (
        <p className={`mt-2 text-sm ${dark ? "text-white/60" : "text-ink-mute"}`}>{sub}</p>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* ReadMore — clamp long body copy behind a toggle                     */
/* ------------------------------------------------------------------ */

/**
 * Clamps its children to `lines` and reveals the rest on request.
 *
 * The toggle only appears when the text actually overflows, so a short lead
 * on a wide screen renders exactly as it did before — no stray button under
 * two lines of copy. Overflow is measured only while collapsed (expanded,
 * scrollHeight always equals clientHeight) and re-measured on resize, which
 * is what makes the same block clamp on a phone and run free on a laptop.
 */
export function ReadMore({
  children,
  lines = 6,
  dark = false,
  className = "",
  moreLabel = "Read more",
  lessLabel = "Show less",
}) {
  const [expanded, setExpanded] = useState(false);
  const [clipped, setClipped] = useState(false);
  const bodyRef = useRef(null);

  useEffect(() => {
    if (expanded) return; // nothing to measure: the clamp is off
    const node = bodyRef.current;
    if (!node) return;

    const measure = () => setClipped(node.scrollHeight - node.clientHeight > 4);
    measure();

    const observer =
      typeof ResizeObserver !== "undefined" ? new ResizeObserver(measure) : null;
    observer?.observe(node);
    window.addEventListener("resize", measure);
    return () => {
      observer?.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [expanded, children, lines]);

  return (
    <div className={className}>
      <div
        ref={bodyRef}
        style={
          expanded
            ? undefined
            : {
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: lines,
                overflow: "hidden",
              }
        }
      >
        {children}
      </div>

      {clipped && (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          aria-expanded={expanded}
          className={`mt-3 inline-flex items-center gap-1.5 text-[0.875rem] font-semibold tracking-[-0.01em] transition-colors duration-300 ${
            dark
              ? "text-ember-300 hover:text-white"
              : "text-royal-700 hover:text-ember-600"
          }`}
        >
          {expanded ? lessLabel : moreLabel}
          <ChevronDown
            aria-hidden="true"
            className={`h-3.5 w-3.5 transition-transform duration-300 ${
              expanded ? "rotate-180" : ""
            }`}
          />
        </button>
      )}
    </div>
  );
}
