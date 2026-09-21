import { PageHero } from "../components/shared/PageHero";
import { CTASection } from "../components/shared/CTASection";
import { Eyebrow, Fact, Figure, ReadMore, Reveal, SectionHeading, SplitText, TextLink } from "../components/ui/Primitives";
import { schoolPillars } from "../data/programs";
import { campusImages } from "../data/about";
import { photo } from "../data/photos";
import { socials } from "../data/site";
import { useSeo } from "../hooks/useSeo";
import { stagger } from "../components/ui/stagger";

/* The school's own photographs, from its science exhibition and STEM room. */
const gallery = [
  { ...photo("0050", "Students presenting a township model in the school corridor", "50% 45%"), span: "lg:col-span-7" },
  { ...photo("0052", "School students with a model of their campus at the STEM room", "50% 40%"), span: "lg:col-span-5" },
  { ...photo("0031", "Junior students explaining their school model to visitors", "50% 40%"), span: "lg:col-span-5" },
  { ...photo("0051", "Senior students explaining a working model of the human heart", "50% 42%"), span: "lg:col-span-7" },
];

export default function School() {
  useSeo({
    title: "Satpuda Valley Public School",
    description:
      "Satpuda Valley Public School, Balaghat — a CBSE-affiliated, co-educational school on the Satpuda campus at Manjhapur (Garra), educating students since 2009.",
    path: "/institutes/school",
  });

  const fb = socials.find((s) => s.icon === "facebook");

  return (
    <>
      <PageHero
        eyebrow="Institute"
        title="Satpuda Valley Public School"
        lead="A CBSE-affiliated, co-educational school on the Satpuda campus at Manjhapur (Garra), Balaghat — educating students here since 2009."
        crumbs={[{ label: "Institute" }, { label: "School" }]}
        image={photo("0050", "School students presenting their projects in the corridor", "50% 45%")}
      />

      {/* ---------------- key facts ---------------- */}
      <section className="section-strip border-b border-stone-line bg-paper">
        <div className="shell">
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            {[
              { value: "2009", label: "Established" },
              { value: "CBSE", label: "Affiliation" },
              { value: "Co-ed", label: "Composition" },
              { value: "Garra", label: "Campus, Balaghat" },
            ].map((f, i) => (
              <Reveal key={f.label} delay={stagger(i)}>
                <div className="border-t-2 border-royal-600 pt-5">
                  <Fact value={f.value} label={f.label} />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- about ---------------- */}
      <section className="section bg-paper">
        <div className="shell">
          <div className="grid gap-12 lg:grid-cols-[1fr_0.9fr] lg:gap-20">
            <div>
              <Reveal>
                <Eyebrow>About the school</Eyebrow>
              </Reveal>
              <Reveal delay={stagger(1)}>
                <SplitText as="h2" className="t-h2 mt-5 block max-w-xl text-ink">
                  Where a Satpuda education usually starts.
                </SplitText>
              </Reveal>
              <Reveal delay={stagger(2)}>
                <ReadMore lines={7} className="mt-8">
                  <div className="space-y-5 text-[1.0625rem] leading-[1.75] text-ink-soft">
                    <p>
                      Satpuda Valley Public School was opened in 2009 by Maharana Pratap Shikshan
                      Samiti, a decade after the trust's first institution. It follows the Central
                      Board of Secondary Education curriculum and is co-educational.
                    </p>
                    <p>
                      Sitting on the same campus as the group's technical institutions has a practical
                      effect: school students grow up within sight of laboratories, workshops and a
                      library that belong to an engineering college. The idea that they might study
                      those subjects is not abstract.
                    </p>
                    <p>
                      The school's approach is to build understanding rather than recall — supported
                      by subject laboratories, a library, sports grounds and a full calendar of
                      cultural activity.
                    </p>
                  </div>
                </ReadMore>
              </Reveal>

              <Reveal delay={stagger(3)}>
                <p className="mt-9">
                  <TextLink href={fb.href} external>
                    Follow the school on Facebook
                  </TextLink>
                </p>
              </Reveal>
            </div>

            <Reveal delay={stagger(2)} className="group">
              <Figure
                mask
                src={campusImages.campusAerial}
                alt="The Satpuda campus grounds"
                ratio="4 / 5"
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------------- pillars ---------------- */}
      <section className="section bg-paper-dim">
        <div className="shell">
          <SectionHeading
            eyebrow="Academic environment"
            title="Four things the school week makes room for."
          />

          <div className="section-body grid gap-x-12 gap-y-1 sm:grid-cols-2">
            {schoolPillars.map((p, i) => (
              <Reveal key={p.title} delay={stagger(i % 2)}>
                <article className="group border-t border-stone-line py-8 transition-colors duration-400 hover:border-royal-600">
                  <div className="flex items-baseline gap-4">
                    <span className="font-display text-xs font-semibold tabular-nums text-ember-600">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="font-display text-[1.25rem] font-semibold tracking-[-0.018em] text-ink">
                      {p.title}
                    </h3>
                  </div>
                  <p className="mt-3.5 pl-8 text-[0.9375rem] leading-[1.7] text-ink-soft">
                    {p.body}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- gallery ---------------- */}
      <section className="section bg-paper">
        <div className="shell">
          <SectionHeading
            eyebrow="Campus life"
            title="Beyond the timetable."
            lead="Sport, culture and the library are treated as part of the week, not as rewards for finishing the syllabus."
          />

          <div className="section-body grid gap-5 lg:grid-cols-12">
            {gallery.map((img, i) => (
              <Reveal key={img.id} delay={stagger(i % 2)} className={`group ${img.span}`}>
                <Figure
                  src={img.src}
                  srcSet={img.srcSet}
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  alt={img.alt}
                  ratio="16 / 10"
                  position={img.focus}
                />
              </Reveal>
            ))}
          </div>

          <Reveal delay={stagger(2)}>
            <p className="mt-10 max-w-3xl border-l-2 border-ember-500 pl-6 text-[0.9375rem] leading-relaxed text-ink-mute">
              Class-wise admission criteria, the fee structure, session dates and transport routes
              are confirmed at the school office. Photographs on this page are from the Satpuda
              campus.
            </p>
          </Reveal>
        </div>
      </section>

      <CTASection
        eyebrow="School enquiries"
        title="Enquire about school admission."
        body="Tell us the class you are enquiring for and we will explain the admission process, the documents required and the dates for the coming session."
      />
    </>
  );
}
