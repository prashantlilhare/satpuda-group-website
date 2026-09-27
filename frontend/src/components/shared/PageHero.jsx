import { Fragment, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "motion/react";
import { ChevronRight } from "lucide-react";
import { Eyebrow, ReadMore, SplitText } from "../ui/Primitives";
import { HeroMotif } from "../ui/Motifs";

/**
 * Interior page masthead. A dark royal band with an optional photographic
 * backdrop, kept deliberately quieter than the homepage hero so that the page
 * content below it carries the weight.
 */
export function PageHero({
  eyebrow,
  title,
  lead,
  crumbs = [],
  image,
  imageAlt = "",
  align = "left",
  /* The page's own drawing on the right of the band — see `Motifs.jsx`.
     Without one, the band falls back to the quiet ring and corner rule;
     "none" leaves the right of the band to the photograph alone. */
  motif,
}) {
  /* `image` is either a plain URL or one of the campus library's photo objects,
     which carry a 960w/1600w pair and their own focal point. */
  const backdrop = typeof image === "string" ? { src: image } : image;

  /* The photograph drifts down slower than the page and the copy lifts
     away a little faster, so the masthead reads as layered as it leaves. */
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const copyY = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.25]);

  return (
    <section
      ref={ref}
      className="section-tight on-dark relative isolate overflow-hidden bg-royal-900"
    >
      {backdrop && (
        <>
          <motion.div className="absolute inset-0 -z-10" style={{ y: bgY }}>
            <img
              src={backdrop.src}
              srcSet={backdrop.srcSet}
              sizes="100vw"
              alt={imageAlt}
              loading="eager"
              fetchPriority="high"
              decoding="async"
              style={backdrop.focus ? { objectPosition: backdrop.focus } : undefined}
              className="hero-backdrop absolute inset-0 h-[118%] w-full object-cover opacity-90"
            />
          </motion.div>
          {/* Solid royal behind the copy, easing off to the right so the
              photograph shows through there. On narrow screens the copy spans
              the full width, so the wash stays dark all the way across. */}
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(20,34,68,0.95)_0%,rgba(20,34,68,0.86)_100%)] lg:bg-[linear-gradient(to_right,rgba(20,34,68,0.97)_0%,rgba(20,34,68,0.93)_38%,rgba(20,34,68,0.6)_62%,rgba(20,34,68,0.18)_100%)]"
          />
        </>
      )}

      {motif === "none" ? null : motif ? (
        <HeroMotif name={motif} />
      ) : (
        <>
      {/* Corner rule detail, drawn in: the left edge drops, then the
          bottom edge runs out to the page edge. */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-0 hidden h-40 w-40 lg:block"
        viewBox="0 0 160 160"
        fill="none"
      >
        <motion.path
          d="M0.5 0 V159.5 H160"
          stroke="rgb(255 255 255 / 0.14)"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
        />
      </svg>
      {/* a slow orbiting ember dot on a faint ring */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 top-1/2 hidden h-[26rem] w-[26rem] -translate-y-1/2 lg:block"
      >
        <div className="ring-spin h-full w-full rounded-full border border-white/[0.07]" style={{ "--spin-dur": "40s" }}>
          <span className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ember-500 shadow-[0_0_14px_rgba(217,58,38,0.8)]" />
        </div>
      </div>
        </>
      )}

      <motion.div
        className={`shell relative ${align === "center" ? "text-center" : ""}`}
        style={{ y: copyY, opacity: copyOpacity }}
      >
        {crumbs.length > 0 && (
          <motion.nav
            aria-label="Breadcrumb"
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
          >
            <ol
              className={`flex flex-wrap items-center gap-x-2 gap-y-1 text-[0.8125rem] text-white/55 ${
                align === "center" ? "justify-center" : ""
              }`}
            >
              <li>
                <Link to="/" className="transition-colors hover:text-white">
                  Home
                </Link>
              </li>
              {crumbs.map((c, i) => (
                <Fragment key={c.label}>
                  <li aria-hidden="true">
                    <ChevronRight className="h-3.5 w-3.5 text-white/30" />
                  </li>
                  <li>
                    {i === crumbs.length - 1 || !c.to ? (
                      <span className="text-white" aria-current="page">
                        {c.label}
                      </span>
                    ) : (
                      <Link to={c.to} className="transition-colors hover:text-white">
                        {c.label}
                      </Link>
                    )}
                  </li>
                </Fragment>
              ))}
            </ol>
          </motion.nav>
        )}

        <div className={`mt-9 ${align === "center" ? "mx-auto max-w-3xl" : "max-w-4xl"}`}>
          {eyebrow && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            >
              <Eyebrow className={`hero-eyebrow ${align === "center" ? "justify-center" : ""}`}>
                {eyebrow}
              </Eyebrow>
            </motion.div>
          )}
          <SplitText as="h1" className="t-h1 mt-5 block text-white">
            {title}
          </SplitText>
          {lead && (
            /* Clamped to six lines. Most leads sit well inside that on a
               laptop and show no toggle at all; the long ones — and every
               lead at phone width — collapse behind "Read more" so the page
               content starts above the fold instead of below a wall of text. */
            <ReadMore
              lines={6}
              dark
              className={`mt-7 max-w-2xl ${align === "center" ? "mx-auto" : ""}`}
            >
              <p className="text-[1.0625rem] leading-relaxed text-white/72 sm:text-lg">
                {lead}
              </p>
            </ReadMore>
          )}
        </div>
      </motion.div>
    </section>
  );
}
