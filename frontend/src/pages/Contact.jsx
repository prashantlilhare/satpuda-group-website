import { Link } from "react-router-dom";
import { Mail, MapPin, Phone, Clock, ExternalLink } from "lucide-react";
import { PageHero } from "../components/shared/PageHero";
import { Eyebrow, Reveal, SectionHeading, TextLink } from "../components/ui/Primitives";
import { AdmissionGlance, AdmissionSteps } from "../components/shared/AdmissionDesk";
import { contact, instituteLinks } from "../data/site";
import { campusImages } from "../data/about";
import { photo } from "../data/photos";
import { useSeo } from "../hooks/useSeo";
import { stagger } from "../components/ui/stagger";

export default function Contact() {
  useSeo({
    title: "Contact",
    description:
      "Contact Satpuda Group, Balaghat — Satpuda Campus, Lalbarra–Balaghat Road, Manjhapur (Garra), Madhya Pradesh 481001. Phone +91 94258 36824 / +91 6262 604 111.",
    path: "/contact",
  });

  const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    contact.mapsQuery,
  )}`;

  return (
    <>
      <PageHero
        motif="none"
        eyebrow="Get in touch"
        title="Contact Satpuda Group"
        lead="One campus, four institutions, one admission office. Everything you need before you call or visit is on this page."
        crumbs={[{ label: "Contact" }]}
        image={photo("0043", "Students at a session on the Satpuda campus", "50% 38%")}
      />

      {/* ---------------- details + admissions ---------------- */}
      <section className="section bg-paper">
        <div className="shell">
          <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            {/* --- details --- */}
            <div>
              <Reveal>
                <Eyebrow>Campus & office</Eyebrow>
              </Reveal>

              <dl className="mt-9">
                <Reveal delay={stagger(1)}>
                  <div className="flex gap-5 border-t border-stone-line py-6">
                    <MapPin aria-hidden="true" className="mt-1 h-5 w-5 shrink-0 text-ember-500" />
                    <div>
                      <dt className="text-[0.6875rem] font-semibold uppercase tracking-[0.15em] text-ink-mute">
                        Address
                      </dt>
                      <dd className="mt-2.5">
                        <address className="text-[0.9375rem] not-italic leading-[1.7] text-ink">
                          {contact.addressLines.map((l) => (
                            <span key={l} className="block">
                              {l}
                            </span>
                          ))}
                        </address>
                      </dd>
                    </div>
                  </div>
                </Reveal>

                <Reveal delay={stagger(2)}>
                  <div className="flex gap-5 border-t border-stone-line py-6">
                    <Phone aria-hidden="true" className="mt-1 h-5 w-5 shrink-0 text-ember-500" />
                    <div>
                      <dt className="text-[0.6875rem] font-semibold uppercase tracking-[0.15em] text-ink-mute">
                        Phone
                      </dt>
                      <dd className="mt-2.5 flex flex-col gap-1.5">
                        {contact.phones.map((p) => (
                          <a
                            key={p.href}
                            href={p.href}
                            className="link-underline w-fit text-[0.9375rem] font-medium text-ink transition-colors hover:text-royal-700"
                          >
                            {p.label}
                          </a>
                        ))}
                      </dd>
                    </div>
                  </div>
                </Reveal>

                <Reveal delay={stagger(3)}>
                  <div className="flex gap-5 border-t border-stone-line py-6">
                    <Mail aria-hidden="true" className="mt-1 h-5 w-5 shrink-0 text-ember-500" />
                    <div className="min-w-0">
                      <dt className="text-[0.6875rem] font-semibold uppercase tracking-[0.15em] text-ink-mute">
                        Email
                      </dt>
                      <dd className="mt-2.5">
                        <a
                          href={`mailto:${contact.email}`}
                          className="link-underline break-all text-[0.9375rem] font-medium text-ink transition-colors hover:text-royal-700"
                        >
                          {contact.email}
                        </a>
                      </dd>
                    </div>
                  </div>
                </Reveal>

                <Reveal delay={stagger(4)}>
                  <div className="flex gap-5 border-y border-stone-line py-6">
                    <Clock aria-hidden="true" className="mt-1 h-5 w-5 shrink-0 text-ember-500" />
                    <div>
                      <dt className="text-[0.6875rem] font-semibold uppercase tracking-[0.15em] text-ink-mute">
                        Office hours
                      </dt>
                      <dd className="mt-2.5 text-[0.9375rem] text-ink">{contact.officeHours}</dd>
                    </div>
                  </div>
                </Reveal>
              </dl>

              <Reveal delay={stagger(5)}>
                <p className="mt-8">
                  <TextLink href={mapsHref} external>
                    Open the campus in Google Maps
                  </TextLink>
                </p>
              </Reveal>
            </div>

            {/* --- admissions --- */}
            <AdmissionGlance />
          </div>
        </div>
      </section>

      {/* ---------------- before you visit ---------------- */}
      <AdmissionSteps />

      {/* ---------------- institution routing ---------------- */}
      <section className="section bg-paper-dim">
        <div className="shell">
          <SectionHeading
            eyebrow="By institution"
            title="Not sure who to ask?"
            lead="All four institutions share the campus address and the numbers above. Start from the one you are interested in."
          />

          <div className="section-body grid gap-px bg-stone-line sm:grid-cols-2 lg:grid-cols-4">
            {instituteLinks.map((item, i) => (
              <Reveal key={item.to} delay={stagger(i)}>
                <Link
                  to={item.to}
                  className="card-raise group flex h-full flex-col bg-paper-dim p-7 hover:bg-paper"
                >
                  <h3 className="font-display text-[1.1875rem] font-semibold tracking-[-0.018em] text-ink transition-colors duration-300 group-hover:text-royal-700">
                    {item.label}
                  </h3>
                  <p className="mt-3 flex-1 text-[0.875rem] leading-[1.65] text-ink-soft">
                    {item.blurb}
                  </p>
                  <span className="mt-5 text-[0.8125rem] font-semibold text-ember-600">
                    View institute →
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- map ---------------- */}
      <section className="section bg-paper">
        <div className="shell">
          <Reveal>
            <div className="relative isolate overflow-hidden border border-stone-line">
              <img
                src={campusImages.campusAerial}
                alt="Aerial view of the Satpuda campus grounds at Manjhapur, Balaghat"
                loading="lazy"
                decoding="async"
                className="h-[22rem] w-full object-cover sm:h-[28rem]"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-[linear-gradient(to_top,rgba(12,21,41,0.88)_0%,rgba(12,21,41,0.35)_55%,transparent_100%)]"
              />
              <div className="absolute inset-x-0 bottom-0 p-7 sm:p-10">
                <p className="text-[0.625rem] font-semibold uppercase tracking-[0.15em] text-ember-300">
                  Find us
                </p>
                <p className="mt-3 max-w-lg font-display text-[1.25rem] font-semibold leading-snug tracking-[-0.018em] text-white sm:text-[1.5rem]">
                  {contact.addressInline}
                </p>
                <a
                  href={mapsHref}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="group/map mt-6 inline-flex items-center gap-2.5 bg-white px-5 py-3 text-[0.875rem] font-semibold text-royal-700 transition-[background-color,color,transform,box-shadow] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:bg-royal-50 hover:text-royal-800 hover:shadow-[0_12px_28px_-14px_rgba(0,0,0,0.5)] active:translate-y-0"
                >
                  Get directions
                  <ExternalLink
                    aria-hidden="true"
                    className="h-4 w-4 transition-transform duration-300 group-hover/map:translate-x-0.5"
                  />
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
