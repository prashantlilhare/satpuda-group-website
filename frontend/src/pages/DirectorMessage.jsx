import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { PageHero } from "../components/shared/PageHero";
import { CTASection } from "../components/shared/CTASection";
import { Eyebrow, Figure, ReadMore, Reveal } from "../components/ui/Primitives";
import { director, principal } from "../data/leadership";
import { photo } from "../data/photos";
import { useSeo } from "../hooks/useSeo";
import { ScrollWords } from "../components/ui/ScrollWords";
import { stagger } from "../components/ui/stagger";

/**
 * A thin ink rail down the left of the message that fills as it is read,
 * with a nib riding its tip — a reading position for a long letter,
 * rather than one more thing fading in. Desktop only; a phone already
 * shows how far down the page is with its own scrollbar.
 */
function ReadingRail({ target }) {
  const { scrollYProgress } = useScroll({ target, offset: ["start 55%", "end 70%"] });
  const read = useSpring(scrollYProgress, { stiffness: 140, damping: 26, mass: 0.4 });
  /* Transforms only — a scaled fill, and the nib riding a full-height
     carrier moved by its own height — so following the reader never
     costs a layout. */
  const nib = useTransform(read, (v) => `${v * 100}%`);

  return (
    <div aria-hidden="true" className="absolute -left-10 bottom-0 top-2 hidden w-px bg-stone-line lg:block xl:-left-12">
      <motion.span className="absolute inset-x-[-1px] inset-y-0 origin-top bg-ember-500" style={{ scaleY: read }} />
      <motion.span className="absolute inset-x-0 inset-y-0" style={{ y: nib }}>
        <span className="absolute left-1/2 top-0 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rotate-45 border-2 border-ember-500 bg-paper" />
      </motion.span>
    </div>
  );
}

export default function DirectorMessage() {
  const messageRef = useRef(null);

  useSeo({
    title: "Director's Message",
    description:
      "A message from Mr. Anshul Jaiswal, Director of Satpuda Group, on practical learning, industry readiness and what a technical education in Balaghat should offer.",
    path: "/about/director-message",
  });

  return (
    <>
      <PageHero
        motif="none"
        eyebrow="Leadership"
        title="Director's Message"
        lead={director.standfirst}
        crumbs={[{ label: "About Us", to: "/about" }, { label: "Director's Message" }]}
        image={photo("0042", "Faculty and students seated together at a campus gathering", "50% 40%")}
      />

      {/* ---------------- portrait + message ---------------- */}
      <section className="section bg-paper">
        <div className="shell">
          <div className="grid gap-12 lg:grid-cols-[0.62fr_1fr] lg:gap-20">
            {/* --- portrait column --- */}
            <div className="lg:sticky-aside">
              <Reveal className="group">
                <Figure
                  mask
                  src={director.portrait}
                  alt={director.portraitAlt}
                  ratio="4 / 5"
                  position="50% 12%"
                  zoom={false}
                />
              </Reveal>

              <Reveal delay={stagger(2)}>
                <div className="mt-7 border-t-2 border-ember-500 pt-6">
                  <h2 className="font-display text-[1.5rem] font-semibold tracking-[-0.022em] text-ink">
                    {director.name}
                  </h2>
                  <p className="mt-2 text-[0.8125rem] font-semibold uppercase tracking-[0.13em] text-ember-600">
                    {director.role} · {director.org}
                  </p>
                  <p className="mt-3.5 text-[0.9375rem] text-ink-mute">
                    {director.qualifications}
                  </p>
                </div>
              </Reveal>
            </div>

            {/* --- message column --- */}
            <div ref={messageRef} className="relative">
              <ReadingRail target={messageRef} />
              <Reveal>
                <blockquote>
                  <p className="font-display text-[1.75rem] leading-[1.22] tracking-[-0.026em] text-ink sm:text-[2.25rem]">
                    <span aria-hidden="true" className="text-ember-500">
                      “
                    </span>
                    <ScrollWords as="span">{director.pullQuote}</ScrollWords>
                    <span aria-hidden="true" className="text-ember-500">
                      ”
                    </span>
                  </p>
                </blockquote>
              </Reveal>

              <Reveal delay={stagger(2)}>
                <hr className="rule my-10" />
              </Reveal>

              <ReadMore mobileOnly>
              <div className="space-y-6 text-[1.0625rem] leading-[1.78] text-ink-soft">
                {director.paragraphs.map((p, i) => (
                  <Reveal key={i} delay={stagger(2 + i)}>
                    <p className={i === 0 ? "first-letter:float-left first-letter:mr-3 first-letter:font-display first-letter:text-[3.75rem] first-letter:font-semibold first-letter:leading-[0.82] first-letter:text-royal-700" : ""}>
                      {p}
                    </p>
                  </Reveal>
                ))}
              </div>
              </ReadMore>

              {/* --- pillars --- */}
              <div className="section-body">
                <Reveal>
                  <Eyebrow>What that means in practice</Eyebrow>
                </Reveal>
                <ol className="mt-8">
                  {director.pillars.map((p, i) => (
                    <Reveal key={p.title} delay={stagger(i)}>
                      <li className="grid grid-cols-[2.75rem_1fr] gap-4 border-t border-stone-line py-6 sm:grid-cols-[4rem_1fr] sm:gap-7">
                        <span className="font-display text-xs font-semibold tabular-nums text-ember-600">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <div>
                          <h3 className="font-display text-[1.1875rem] font-semibold tracking-[-0.018em] text-ink">
                            {p.title}
                          </h3>
                          <p className="mt-2.5 text-[0.9375rem] leading-[1.7] text-ink-soft">
                            {p.body}
                          </p>
                        </div>
                      </li>
                    </Reveal>
                  ))}
                </ol>
              </div>

              {/* --- signature --- */}
              <Reveal delay={stagger(2)}>
                <div className="mt-12 flex items-end justify-between gap-6 border-t border-stone-line pt-8">
                  <div>
                    <p
                      className="font-display text-[1.625rem] italic tracking-[-0.02em] text-royal-700 sm:text-[1.875rem]"
                      style={{ fontVariationSettings: '"opsz" 48' }}
                    >
                      {director.name}
                    </p>
                    <p className="mt-2 text-[0.8125rem] font-semibold uppercase tracking-[0.13em] text-ink-mute">
                      {director.role}
                    </p>
                  </div>
                  <p
                    aria-hidden="true"
                    className="hidden font-display text-[2.5rem] italic text-sand sm:block"
                  >
                    {director.initials}
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- cross-link ---------------- */}
      <section className="section-tight bg-paper-dim">
        <div className="shell">
          <Reveal>
            <Link
              to="/about/principal-message"
              className="group flex flex-col gap-6 border-t border-stone-line pt-8 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex items-center gap-6">
                <div className="w-20 shrink-0 sm:w-24">
                  <Figure src={principal.portrait} alt="" ratio="1 / 1" position="50% 18%" parallax={false} />
                </div>
                <div>
                  <p className="text-[0.625rem] font-semibold uppercase tracking-[0.15em] text-ember-600">
                    Next
                  </p>
                  <h2 className="mt-2 font-display text-[1.375rem] font-semibold tracking-[-0.02em] text-ink transition-colors duration-300 group-hover:text-royal-700 sm:text-[1.625rem]">
                    Principal's Message
                  </h2>
                  <p className="mt-1.5 text-[0.9375rem] text-ink-mute">{principal.name}</p>
                </div>
              </div>
              <ArrowUpRight
                aria-hidden="true"
                className="h-6 w-6 shrink-0 text-ink-mute transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-ember-600"
              />
            </Link>
          </Reveal>
        </div>
      </section>

      <CTASection />
    </>
  );
}
