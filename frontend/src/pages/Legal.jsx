import { PageHero } from "../components/shared/PageHero";
import { Reveal, TextLink } from "../components/ui/Primitives";
import { contact, site } from "../data/site";
import { useSeo } from "../hooks/useSeo";
import { stagger } from "../components/ui/stagger";

/**
 * Placeholder legal pages.
 *
 * These deliberately describe the site as it currently stands — a static front
 * end with no server, no database and no analytics — rather than reciting a
 * generic policy that would not be accurate.
 */

const CONTENT = {
  privacy: {
    title: "Privacy Policy",
    lead: "What this website does, and does not, do with your information.",
    sections: [
      {
        heading: "The current position",
        body: [
          "This website is presently a static front end. It has no server component, no database and no analytics or advertising trackers. Pages are delivered to your browser and nothing you do on them is recorded by us.",
          "The enquiry form on the contact page is not yet connected to a server. Anything typed into it stays in your browser and is discarded when the page is closed.",
        ],
      },
      {
        heading: "When you contact us directly",
        body: [
          "If you telephone or email the institution, we hold the details you provide for the purpose of answering your enquiry and, where relevant, processing an admission. We do not sell or trade personal information.",
        ],
      },
      {
        heading: "Third-party links",
        body: [
          "This site links to external services — for example Google Maps for directions, and official social media pages. Those services apply their own privacy policies, which we do not control.",
        ],
      },
      {
        heading: "Changes",
        body: [
          "When the enquiry form is connected to a server, this policy will be updated to describe how submitted information is stored, who can access it and how long it is retained.",
        ],
      },
    ],
  },
  terms: {
    title: "Terms of Use",
    lead: "The basis on which this website is published.",
    sections: [
      {
        heading: "Information on this site",
        body: [
          "This website describes the institutions of Satpuda Group for general information. Programme details follow AICTE, RGPV, DTE and NCVT norms as applicable, and institutional facts are drawn from the group's own published material.",
          "Information that changes each session — intake, fee structure, scholarship eligibility, admission and counselling dates — is not published here. Those details are confirmed by the institution directly, and the institution's word is authoritative where it differs from this site.",
        ],
      },
      {
        heading: "No guarantee of outcome",
        body: [
          "Nothing on this website constitutes an offer of admission, a guarantee of a seat, or a promise of employment or placement.",
        ],
      },
      {
        heading: "Intellectual property",
        body: [
          "The Satpuda Group emblem, institution names and photographs of the campus are the property of the group and its trust, and may not be reproduced without permission.",
        ],
      },
      {
        heading: "External links",
        body: [
          "Links to third-party websites are provided for convenience. We are not responsible for their content or availability.",
        ],
      },
    ],
  },
};

export default function Legal({ kind = "privacy" }) {
  const doc = CONTENT[kind] ?? CONTENT.privacy;

  useSeo({
    title: doc.title,
    description: doc.lead,
    path: kind === "privacy" ? "/privacy-policy" : "/terms",
  });

  return (
    <>
      <PageHero eyebrow="Legal" title={doc.title} lead={doc.lead} crumbs={[{ label: doc.title }]} />

      <section className="section bg-paper">
        <div className="shell-narrow">
          {doc.sections.map((s, i) => (
            <Reveal key={s.heading} delay={stagger(i)}>
              <div className="border-t border-stone-line py-9">
                <h2 className="font-display text-[1.375rem] font-semibold tracking-[-0.02em] text-ink sm:text-[1.5rem]">
                  {s.heading}
                </h2>
                <div className="mt-5 space-y-4 text-[1.0625rem] leading-[1.75] text-ink-soft">
                  {s.body.map((p) => (
                    <p key={p}>{p}</p>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}

          <Reveal>
            <div className="border-t border-stone-line pt-9">
              <p className="text-[0.9375rem] leading-relaxed text-ink-soft">
                Questions about this page? Write to{" "}
                <TextLink href={`mailto:${contact.email}`}>{contact.email}</TextLink> or call{" "}
                <TextLink href={contact.phones[0].href}>{contact.phones[0].label}</TextLink>.
              </p>
              <p className="mt-4 text-[0.8125rem] text-ink-mute">
                © {new Date().getFullYear()} {site.name}, {site.location}.
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
