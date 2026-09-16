import { Mail, MapPin, Phone } from "lucide-react";
import { Button, Eyebrow, Reveal } from "../ui/Primitives";
import { contact } from "../../data/site";

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
  return (
    <section className="on-dark relative isolate overflow-hidden bg-royal-600">
      {/* quiet geometric detail, no gradient blobs */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-24 h-[28rem] w-[28rem] rounded-full border border-white/10"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 -left-20 h-[24rem] w-[24rem] rounded-full border border-white/10"
      />

      <div className="shell relative py-18 sm:py-24">
        <div className="grid gap-12 lg:grid-cols-[1.25fr_1fr] lg:items-end lg:gap-20">
          <div>
            <Reveal>
              <Eyebrow>{eyebrow}</Eyebrow>
            </Reveal>
            <Reveal delay={70}>
              <h2 className="t-h2 mt-5 max-w-xl text-white">{title}</h2>
            </Reveal>
            <Reveal delay={140}>
              <p className="mt-6 max-w-lg text-[1.0625rem] leading-relaxed text-white/75">
                {body}
              </p>
            </Reveal>
            <Reveal delay={210}>
              <div className="mt-9 flex flex-wrap gap-3.5">
                <Button to={primaryTo} variant="solidLight">
                  {primaryLabel}
                </Button>
                <Button href={contact.phones[0].href} variant="ghostLight" arrow={false}>
                  <Phone aria-hidden="true" className="h-4 w-4" />
                  {contact.phones[0].label}
                </Button>
              </div>
            </Reveal>
          </div>

          <Reveal delay={140}>
            <dl className="divide-y divide-white/15 border-t border-white/15">
              <div className="flex gap-4 py-5">
                <dt className="sr-only">Address</dt>
                <MapPin aria-hidden="true" className="mt-0.5 h-[1.125rem] w-[1.125rem] shrink-0 text-ember-300" />
                <dd className="text-[0.9375rem] leading-relaxed text-white/75">
                  {contact.addressLines.map((l) => (
                    <span key={l} className="block">
                      {l}
                    </span>
                  ))}
                </dd>
              </div>
              <div className="flex gap-4 py-5">
                <dt className="sr-only">Phone</dt>
                <Phone aria-hidden="true" className="mt-0.5 h-[1.125rem] w-[1.125rem] shrink-0 text-ember-300" />
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
              <div className="flex gap-4 py-5">
                <dt className="sr-only">Email</dt>
                <Mail aria-hidden="true" className="mt-0.5 h-[1.125rem] w-[1.125rem] shrink-0 text-ember-300" />
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
