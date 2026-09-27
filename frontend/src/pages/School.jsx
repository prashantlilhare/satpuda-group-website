import { useState } from "react";
import { motion } from "motion/react";
import { PageHero } from "../components/shared/PageHero";
import { CTASection } from "../components/shared/CTASection";
import { InstituteGallery } from "../components/shared/InstituteGallery";
import { PrincipalDesk } from "../components/shared/PrincipalDesk";
import { AboutCollage } from "../components/shared/AboutCollage";
import { SchoolNotebook } from "../components/shared/SchoolNotebook";
import { Lightbox } from "../components/shared/Lightbox";
import { Eyebrow, Fact, ReadMore, Reveal, SectionHeading, SplitText, TextLink } from "../components/ui/Primitives";
import { schoolPillars } from "../data/programs";
import { campusImages } from "../data/about";
import { photo } from "../data/photos";
import { schoolShots } from "../data/shots";
import { schoolFacebook } from "../data/site";
import { useSeo } from "../hooks/useSeo";
import { stagger } from "../components/ui/stagger";

/* The school's own photographs — its science exhibition, STEM room and
   Independence Day on campus. */
const gallery = [
  { ...photo("0050", "Students presenting a township model in the school corridor", "50% 45%"), caption: "Our township model", tilt: -4, pin: "bg-ember-500" },
  { ...photo("0052", "School students with a model of their campus at the STEM room", "50% 40%"), caption: "In the STEM room", tilt: 3, pin: "bg-royal-500" },
  { ...schoolShots.choir, caption: "Singing for Independence Day", tilt: -2, pin: "bg-amber-400" },
  { ...schoolShots.prizeGiving, caption: "Prize day on stage", tilt: 5, pin: "bg-emerald-500" },
];

/* One photograph per pillar, index-aligned with `schoolPillars`:
   academics, student development, sport, culture. */
const pillarPhotos = [
  { ...photo("0049", "Class III students presenting their science project", "50% 45%"), caption: "Class III, science exhibition" },
  { ...photo("0029", "School children explaining a rocket model to visiting guests", "50% 42%"), caption: "Explaining it to the guests" },
  { ...schoolShots.assemblyLines, caption: "Out on the school ground" },
  { ...schoolShots.choir, caption: "Independence Day, on stage" },
];

/* Beside the short "about" copy: the institution at a glance. */
const aboutPhotos = [
  { src: campusImages.campusAerial, alt: "The Satpuda campus grounds" },
  photo("0052", "School students with a model of their campus at the STEM room", "50% 40%"),
  schoolShots.assemblySeated,
];

/* The gallery ring near the foot of the page. */
const ringPhotos = [
  { ...schoolShots.flagHoisting, caption: "Hoisting the flag on Independence Day" },
  { ...schoolShots.assemblyLines, caption: "The Independence Day assembly" },
  { ...schoolShots.choir, caption: "Our juniors sing on stage" },
  { ...schoolShots.prizeGiving, caption: "Prize winners with their guests" },
  { ...schoolShots.principalSpeech, caption: "The principal addresses the school" },
  { ...schoolShots.assemblySeated, caption: "Flags in hand for the programme" },
  { ...schoolShots.address, caption: "A word from our guest" },
  { ...schoolShots.lampLighting, caption: "Lighting the lamp" },
  { ...photo("0050", "Students presenting a township model in the school corridor", "50% 45%"), caption: "A township model, built by senior students" },
  { ...photo("0052", "School students with their campus model at the STEM room", "50% 40%"), caption: "In the STEM and robotics room" },
  { ...photo("0049", "Class III students presenting their science project", "50% 45%"), caption: "Class III at the science exhibition" },
  { ...photo("0051", "Senior students explaining a working model of the human heart", "50% 42%"), caption: "A working model of the human heart" },
  { ...photo("0029", "School children demonstrating a rocket model to visiting guests", "50% 42%"), caption: "Explaining a rocket model to guests" },
  { ...photo("0030", "A school student presenting a nutrition pyramid model", "50% 42%"), caption: "The nutrition pyramid" },
  { ...photo("0031", "Junior students explaining their school model to visitors", "50% 40%"), caption: "Juniors presenting their school model" },
  { ...photo("0053", "Young students presenting a rope-way project", "50% 45%"), caption: "A rope-way project in the corridor" },
];

export default function School() {
  /* The campus-life print that was clicked, brought forward over a grey, blurred page. */
  const [viewing, setViewing] = useState(null);

  useSeo({
    title: "Satpuda Valley Public School",
    description:
      "Satpuda Valley Public School, Balaghat — a CBSE-affiliated, co-educational school on the Satpuda campus at Manjhapur (Garra), educating students since 2009.",
    path: "/institutes/school",
  });

  return (
    <>
      <PageHero
        motif="shapes"
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

      {/* ---------------- principal ---------------- */}
      <PrincipalDesk institution="school" />

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
                <ReadMore lines={4} className="mt-6">
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
                  <TextLink href={schoolFacebook} external>
                    Follow the school on Facebook
                  </TextLink>
                </p>
              </Reveal>
            </div>

            <AboutCollage items={aboutPhotos} />
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

          <Reveal delay={stagger(1)}>
            <SchoolNotebook pillars={schoolPillars} photos={pillarPhotos} className="section-body" />
          </Reveal>
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

          {/* Pinned up like a class noticeboard: each print drops onto the
              board at its own slant and is pinned, and straightens when
              pointed at. */}
          <ul className="section-body grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-8">
            {gallery.map((img, i) => (
              <motion.li
                key={img.id}
                className={i % 2 ? "lg:mt-10" : ""}
                initial={{ opacity: 0, y: -70, rotate: img.tilt * 4 }}
                whileInView={{ opacity: 1, y: 0, rotate: img.tilt }}
                whileHover={{ rotate: 0, scale: 1.04, zIndex: 2 }}
                viewport={{ once: true, margin: "0px 0px -12% 0px" }}
                transition={{ type: "spring", stiffness: 170, damping: 16, delay: i * 0.12 }}
              >
                <figure className="relative bg-white p-3 pb-4 shadow-[0_18px_34px_-18px_rgba(20,34,68,0.45)]">
                  <motion.span
                    aria-hidden="true"
                    className={`absolute left-1/2 top-0 z-[1] h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full shadow-[0_3px_5px_rgba(0,0,0,0.35)] ${img.pin}`}
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 500, damping: 14, delay: 0.45 + i * 0.12 }}
                  />
                  <button
                    type="button"
                    onClick={(e) =>
                      setViewing({ frame: { src: img.src, alt: img.alt }, origin: e.currentTarget.getBoundingClientRect() })
                    }
                    aria-label={`View larger: ${img.caption}`}
                    className="block aspect-[4/3] w-full cursor-zoom-in overflow-hidden bg-royal-900/5 outline-none focus-visible:ring-2 focus-visible:ring-ember-500"
                  >
                    <img
                      src={img.src}
                      srcSet={img.srcSet}
                      sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                      alt={img.alt}
                      loading="lazy"
                      decoding="async"
                      style={{ objectPosition: img.focus }}
                      className="h-full w-full object-cover"
                    />
                  </button>
                  <figcaption className="mt-3.5 text-center font-display text-[1rem] font-semibold italic tracking-[-0.01em] text-ink-soft">
                    {img.caption}
                  </figcaption>
                </figure>
              </motion.li>
            ))}
          </ul>

          {viewing && (
            <Lightbox frame={viewing.frame} origin={viewing.origin} onClose={() => setViewing(null)} tone="gray" />
          )}

          <Reveal delay={stagger(2)}>
            <p className="mt-10 max-w-3xl border-l-2 border-ember-500 pl-6 text-[0.9375rem] leading-relaxed text-ink-mute">
              Class-wise admission criteria, the fee structure, session dates and transport routes
              are confirmed at the school office. Photographs on this page are from the Satpuda
              campus.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ---------------- gallery ---------------- */}
      <InstituteGallery
        items={ringPhotos}
        title="A year at the school."
        lead="Exhibitions, the STEM room, sport and culture — drag the ring or use the arrows."
      />

      <CTASection
        eyebrow="School enquiries"
        title="Enquire about school admission."
        body="Tell us the class you are enquiring for and we will explain the admission process, the documents required and the dates for the coming session."
      />
    </>
  );
}
