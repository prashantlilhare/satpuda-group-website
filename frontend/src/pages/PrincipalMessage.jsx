import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { PageHero } from "../components/shared/PageHero";
import { CTASection } from "../components/shared/CTASection";
import { Figure, Reveal } from "../components/ui/Primitives";
import { director, principal } from "../data/leadership";
import { campusImages } from "../data/about";
import { useSeo } from "../hooks/useSeo";

const gallery = [
  { src: campusImages.classroom, alt: "A teaching session in a Satpuda classroom" },
  { src: campusImages.readingRoom, alt: "Students reading together in the library" },
  { src: campusImages.electronicsBench, alt: "Practical work at an electronics bench" },
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
        eyebrow="Leadership"
        title="Principal's Message"
        lead={principal.standfirst}
        crumbs={[{ label: "About Us", to: "/about" }, { label: "Principal's Message" }]}
        image={campusImages.seminarHall}
      />

      {/* ---------------- letter ---------------- */}
      <section className="bg-paper py-20 sm:py-28">
        <div className="shell-narrow">
          {/* portrait band — a different composition from the Director page */}
          <Reveal className="group">
            <Figure
              src={principal.portrait}
              alt={principal.portraitAlt}
              ratio="16 / 9"
              position="50% 24%"
              zoom={false}
            />
          </Reveal>

          <Reveal delay={90}>
            <div className="-mt-14 ml-0 max-w-xl bg-paper p-7 sm:-mt-20 sm:ml-8 sm:p-10">
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

          {/* the letter itself */}
          <div className="mt-14 sm:mt-16">
            <Reveal>
              <p className="font-display text-[1.5rem] tracking-[-0.022em] text-royal-700 sm:text-[1.75rem]">
                {principal.salutation}
              </p>
            </Reveal>

            <div className="mt-8 space-y-6 text-[1.0625rem] leading-[1.8] text-ink-soft">
              {principal.paragraphs.map((p, i) => (
                <Reveal key={i} delay={80 + i * 80}>
                  <p>{p}</p>
                </Reveal>
              ))}
            </div>

            <Reveal delay={120}>
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
          </div>
        </div>
      </section>

      {/* ---------------- campus strip ---------------- */}
      <section className="bg-paper-dim py-16 sm:py-20">
        <div className="shell">
          <div className="grid gap-5 sm:grid-cols-3">
            {gallery.map((img, i) => (
              <Reveal key={img.src} delay={i * 110} className="group">
                <Figure src={img.src} alt={img.alt} ratio="4 / 3" />
              </Reveal>
            ))}
          </div>

          <Reveal delay={140}>
            <Link
              to="/about/director-message"
              className="group mt-14 flex flex-col gap-6 border-t border-stone-line pt-8 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex items-center gap-6">
                <div className="w-20 shrink-0 sm:w-24">
                  <Figure src={director.portrait} alt="" ratio="1 / 1" position="50% 10%" />
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
