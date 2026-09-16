import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { useReveal } from "../../hooks/useReveal";

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
/* Eyebrow                                                             */
/* ------------------------------------------------------------------ */

export function Eyebrow({ children, className = "" }) {
  return <span className={`eyebrow ${className}`}>{children}</span>;
}

/* ------------------------------------------------------------------ */
/* Button — shared visual language for links and real buttons          */
/* ------------------------------------------------------------------ */

const BASE =
  "group/btn inline-flex items-center justify-center gap-2.5 font-sans text-[0.9375rem] font-semibold " +
  "tracking-[-0.01em] px-6 py-3.5 transition-[background-color,color,border-color,transform] " +
  "duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] active:translate-y-px disabled:opacity-55 " +
  "disabled:pointer-events-none";

const VARIANTS = {
  primary: "bg-royal-600 text-white hover:bg-royal-700",
  ember: "bg-ember-500 text-white hover:bg-ember-600",
  outline:
    "border border-royal-600/30 text-royal-700 hover:border-royal-600 hover:bg-royal-600 hover:text-white",
  ghostLight:
    "border border-white/35 text-white hover:bg-white hover:text-royal-700 hover:border-white",
  solidLight: "bg-white text-royal-700 hover:bg-ember-500 hover:text-white",
};

export function Button({
  as,
  to,
  href,
  variant = "primary",
  arrow = true,
  className = "",
  children,
  ...rest
}) {
  const cls = `${BASE} ${VARIANTS[variant] ?? VARIANTS.primary} ${className}`;
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
      <Reveal delay={70}>
        <Tag className="t-h2 mt-5 text-ink">{title}</Tag>
      </Reveal>
      {lead && (
        <Reveal delay={140}>
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
  alt,
  ratio = "4 / 3",
  className = "",
  imgClassName = "",
  zoom = true,
  position = "center",
  loading = "lazy",
  children,
}) {
  return (
    <figure
      className={`relative overflow-hidden bg-royal-900/5 ${className}`}
      style={{ aspectRatio: ratio }}
    >
      <img
        src={src}
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

export function Fact({ value, label, sub, dark = false }) {
  return (
    <div>
      <p
        className={`font-display text-[clamp(2.25rem,4.4vw,3.25rem)] font-semibold leading-none tracking-[-0.03em] ${
          dark ? "text-white" : "text-royal-700"
        }`}
        style={{ fontVariationSettings: '"opsz" 72' }}
      >
        {value}
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
