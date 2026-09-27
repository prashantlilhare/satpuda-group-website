import { useRef } from "react";
import { Mail, MapPin, Phone } from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";
import { Button, Eyebrow, Reveal, SplitText } from "../ui/Primitives";
import { RidgeTrace } from "../ui/Ridgeline";
import { contact } from "../../data/site";
import { stagger } from "../ui/stagger";

/**
 * Closing call to action. Repeated across pages, so it carries the real
 * contact details rather than a bare "get in touch".
 */
export function CTASection({
  eyebrow = "Admissions & enquiries",
  title = "Talk to us about the right programme.",
  body = "Whether it is school admission, a trade certificate, teacher training or an engineering degree — tell us where the student is today and we will explain the options.",
  primaryLabel = "Contact us",
  primaryTo = "/contact",
}) {
  /* The two rings drift apart as the band scrolls through, each carrying a
     small ember dot round its edge. */
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const ringA = useTransform(scrollYProgress, [0, 1], [-40, 60]);
  const ringB = useTransform(scrollYProgress, [0, 1], [50, -40]);

  return (
    <section ref={ref} className="on-dark relative isolate overflow-hidden bg-royal-600">
      {/* quiet geometric detail, no gradient blobs */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-24 h-[28rem] w-[28rem]"
        style={{ y: ringA }}
      >
        <div
          className="ring-spin relative h-full w-full rounded-full border border-white/10"
          style={{ "--spin-dur": "50s" }}
        >
          <span className="absolute bottom-[14.6%] left-[14.6%] h-2 w-2 -translate-x-1/2 translate-y-1/2 rounded-full bg-ember-400" />
        </div>
      </motion.div>
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 -left-20 h-[24rem] w-[24rem]"
        style={{ y: ringB }}
      >
        <div
          className="ring-spin ring-spin-reverse relative h-full w-full rounded-full border border-white/10"
          style={{ "--spin-dur": "60s" }}
        >
          <span className="absolute right-[14.6%] top-[14.6%] h-1.5 w-1.5 translate-x-1/2 -translate-y-1/2 rounded-full bg-white/60" />
        </div>
      </motion.div>

      {/* the Satpuda range, drawn along the foot of the band */}
      <RidgeTrace progress={scrollYProgress} className="bottom-0 h-[clamp(2.25rem,5vw,4.25rem)]" />

      <div className="shell section relative">
        <div className="grid gap-12 lg:grid-cols-[1.25fr_1fr] lg:items-end lg:gap-20">
          <div>
            <Reveal>
              <Eyebrow>{eyebrow}</Eyebrow>
            </Reveal>
            <Reveal delay={stagger(1)}>
              <SplitText as="h2" className="t-h2 mt-5 block max-w-xl text-white">{title}</SplitText>
            </Reveal>
            <Reveal delay={stagger(2)}>
              <p className="mt-6 max-w-lg text-[1.0625rem] leading-relaxed text-white/75">
                {body}
              </p>
            </Reveal>
            <Reveal delay={stagger(3)}>
              <div className="mt-9 flex flex-wrap gap-3.5">
                <Button to={primaryTo} variant="solidLight">
                  {primaryLabel}
                </Button>
                <Button href={contact.phones[0].href} variant="ghostLight" arrow={false}>
                  <Phone aria-hidden="true" className="phone-ring h-4 w-4" />
                  {contact.phones[0].label}
                </Button>
              </div>
            </Reveal>
          </div>

          <Reveal delay={stagger(2)}>
            <dl className="divide-y divide-white/15 border-t border-white/15">
              <div className="group/row flex gap-4 py-5">
                <dt className="sr-only">Address</dt>
                <MapPin aria-hidden="true" className="mt-0.5 h-[1.125rem] w-[1.125rem] shrink-0 text-ember-300 transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover/row:-rotate-6 group-hover/row:scale-125" />
                <dd className="text-[0.9375rem] leading-relaxed text-white/75">
                  {contact.addressLines.map((l) => (
                    <span key={l} className="block">
                      {l}
                    </span>
                  ))}
                </dd>
              </div>
              <div className="group/row flex gap-4 py-5">
                <dt className="sr-only">Phone</dt>
                <Phone aria-hidden="true" className="mt-0.5 h-[1.125rem] w-[1.125rem] shrink-0 text-ember-300 transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover/row:-rotate-6 group-hover/row:scale-125" />
                <dd className="flex flex-col gap-1">
                  {contact.phones.map((p) => (
                    <a
                      key={p.href}
                      href={p.href}
                      className="link-underline text-[0.9375rem] text-white/75 hover:text-white"
                    >
                      {p.label}
                    </a>
                  ))}
                </dd>
              </div>
              <div className="group/row flex gap-4 py-5">
                <dt className="sr-only">Email</dt>
                <Mail aria-hidden="true" className="mt-0.5 h-[1.125rem] w-[1.125rem] shrink-0 text-ember-300 transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover/row:-rotate-6 group-hover/row:scale-125" />
                <dd>
                  <a
                    href={`mailto:${contact.email}`}
                    className="link-underline break-all text-[0.9375rem] text-white/75 hover:text-white"
                  >
                    {contact.email}
                  </a>
                </dd>
              </div>
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
