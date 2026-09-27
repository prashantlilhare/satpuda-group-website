import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { PageHero } from "../components/shared/PageHero";
import { CTASection } from "../components/shared/CTASection";
import { Figure, ReadMore, Reveal } from "../components/ui/Primitives";
import { director, principal } from "../data/leadership";
import { campusImages } from "../data/about";
import { photo } from "../data/photos";
import { shots } from "../data/shots";
import { useSeo } from "../hooks/useSeo";
import { stagger } from "../components/ui/stagger";

const gallery = [
  { src: campusImages.classroom, alt: "A teaching session in a Satpuda classroom" },
  { src: campusImages.readingRoom, alt: "Students reading together in the library" },
  { src: shots.elecBench.src, alt: shots.elecBench.alt },
];

export default function PrincipalMessage() {
  useSeo({
    title: "Principal's Message",
    description:
      "A welcome from Prof. (Dr.) Ashok Kumar Gupta, Principal of Satpuda College of Engineering & Polytechnic, on the campus and its learning culture.",
    path: "/about/principal-message",
  });

  return (
    <>
      <PageHero
        motif="none"
        eyebrow="Leadership"
        title="Principal's Message"
        lead={principal.standfirst}
        crumbs={[{ label: "About Us", to: "/about" }, { label: "Principal's Message" }]}
        image={photo("0044", "Students at a college assembly", "50% 35%")}
      />

      {/* ---------------- letter ---------------- */}
      <section className="section bg-paper">
        <div className="shell-narrow">
          {/* portrait band — a different composition from the Director page.
              A 16:9 band on a phone crops the portrait through the face, so
              there it keeps the photograph's own proportions. */}
          <Reveal className="group">
            <Figure
              mask
              src={principal.portrait}
              alt={principal.portraitAlt}
              ratio="16 / 9"
              position="50% 24%"
              zoom={false}
              className="max-sm:aspect-[900/783]!"
            />
          </Reveal>

          <Reveal delay={stagger(1)}>
            <div className="relative mx-4 -mt-8 max-w-xl bg-paper p-6 sm:mx-0 sm:-mt-20 sm:ml-8 sm:p-10">
              <h2 className="font-display text-[1.5rem] font-semibold tracking-[-0.022em] text-ink sm:text-[1.875rem]">
                {principal.name}
              </h2>
              <p className="mt-2.5 text-[0.8125rem] font-semibold uppercase tracking-[0.13em] text-ember-600">
                {principal.role} · {principal.org}
              </p>
              <p className="mt-4 text-[0.875rem] leading-relaxed text-ink-mute">
                {principal.qualifications}
              </p>
            </div>
          </Reveal>

          {/* The letter itself, on a sheet that is laid down onto the
              desk as it arrives — tipped back from its top edge, settling
              flat — with the salutation underlined in one pen stroke. */}
          <motion.div
            className="letter-sheet section-body bg-white px-6 py-10 shadow-[0_30px_60px_-40px_rgba(20,34,68,0.45)] sm:px-12 sm:py-14"
            initial={{ opacity: 0, rotateX: 18, y: 50 }}
            whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -10% 0px" }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformPerspective: 1400, transformOrigin: "50% 0%" }}
          >
            <div className="relative inline-block">
              <p className="font-display text-[1.5rem] tracking-[-0.022em] text-royal-700 sm:text-[1.75rem]">
                {principal.salutation}
              </p>
              <svg aria-hidden="true" viewBox="0 0 200 14" preserveAspectRatio="none" className="absolute -bottom-2 left-0 h-3.5 w-full">
                <motion.path
                  d="M3 9 C60 3 130 12 197 5"
                  fill="none"
                  stroke="var(--color-ember-500)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.9 }}
                />
              </svg>
            </div>

            <ReadMore mobileOnly className="mt-8">
              <div className="space-y-6 text-[1.0625rem] leading-[1.8] text-ink-soft">
                {principal.paragraphs.map((p, i) => (
                  <Reveal key={i} delay={stagger(1 + i)}>
                    <p>{p}</p>
                  </Reveal>
                ))}
              </div>
            </ReadMore>

            <Reveal delay={stagger(2)}>
              <div className="mt-12 flex items-end justify-between gap-6 border-t border-stone-line pt-8">
                <div>
                  <p
                    className="font-display text-[1.375rem] italic tracking-[-0.02em] text-royal-700 sm:text-[1.625rem]"
                    style={{ fontVariationSettings: '"opsz" 48' }}
                  >
                    {principal.name}
                  </p>
                  <p className="mt-2 text-[0.8125rem] font-semibold uppercase tracking-[0.13em] text-ink-mute">
                    {principal.role}
                  </p>
                </div>
                <p
                  aria-hidden="true"
                  className="hidden font-display text-[2.5rem] italic text-sand sm:block"
                >
                  {principal.initials}
                </p>
              </div>
            </Reveal>
          </motion.div>
        </div>
      </section>

      {/* ---------------- campus strip ---------------- */}
      <section className="section-tight bg-paper-dim">
        <div className="shell">
          <div className="grid gap-5 sm:grid-cols-3">
            {gallery.map((img, i) => (
              <Reveal key={img.src} delay={stagger(i)} className="group">
                <Figure src={img.src} alt={img.alt} ratio="4 / 3" />
              </Reveal>
            ))}
          </div>

          <Reveal delay={stagger(2)}>
            <Link
              to="/about/director-message"
              className="group section-body flex flex-col gap-6 border-t border-stone-line pt-8 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex items-center gap-6">
                <div className="w-20 shrink-0 sm:w-24">
                  <Figure src={director.portrait} alt="" ratio="1 / 1" position="50% 10%" parallax={false} />
                </div>
                <div>
                  <p className="text-[0.625rem] font-semibold uppercase tracking-[0.15em] text-ember-600">
                    Also read
                  </p>
                  <h2 className="mt-2 font-display text-[1.375rem] font-semibold tracking-[-0.02em] text-ink transition-colors duration-300 group-hover:text-royal-700 sm:text-[1.625rem]">
                    Director's Message
                  </h2>
                  <p className="mt-1.5 text-[0.9375rem] text-ink-mute">{director.name}</p>
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
