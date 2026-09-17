import { useId, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { CheckCircle2, Mail, MapPin, Phone, Clock, ExternalLink } from "lucide-react";
import { PageHero } from "../components/shared/PageHero";
import { Button, Eyebrow, Reveal, SectionHeading, TextLink } from "../components/ui/Primitives";
import { contact, instituteLinks } from "../data/site";
import { campusImages } from "../data/about";
import { useSeo } from "../hooks/useSeo";
import { stagger } from "../components/ui/stagger";

/* ------------------------------------------------------------------ */
/* FORM                                                                */
/* ------------------------------------------------------------------ */

const SUBJECTS = [
  "B.Tech admission",
  "Diploma / Polytechnic admission",
  "ITI trade admission",
  "School admission",
  "D.Ed / B.Ed enquiry",
  "Something else",
];

const EMPTY = { name: "", email: "", phone: "", subject: SUBJECTS[0], message: "" };

function validate(values) {
  const errors = {};
  if (!values.name.trim()) errors.name = "Please enter your name.";
  if (!values.email.trim()) {
    errors.email = "Please enter an email address.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim())) {
    errors.email = "That email address doesn't look right.";
  }
  const digits = values.phone.replace(/\D/g, "");
  if (!values.phone.trim()) {
    errors.phone = "Please enter a phone number.";
  } else if (digits.length < 10) {
    errors.phone = "Please enter a phone number with at least 10 digits.";
  }
  if (!values.message.trim()) {
    errors.message = "Please tell us how we can help.";
  } else if (values.message.trim().length < 10) {
    errors.message = "A little more detail would help us answer properly.";
  }
  return errors;
}

function Field({ label, name, error, children, hint }) {
  return (
    <div>
      <label
        htmlFor={name}
        className="block text-[0.6875rem] font-semibold uppercase tracking-[0.15em] text-ink-mute"
      >
        {label}
      </label>
      <div className="mt-2.5">{children}</div>
      {hint && !error && <p className="mt-2 text-[0.8125rem] text-ink-mute">{hint}</p>}
      {error && (
        <p id={`${name}-error`} role="alert" className="mt-2 text-[0.8125rem] font-medium text-ember-600">
          {error}
        </p>
      )}
    </div>
  );
}

const inputCls =
  "w-full border border-stone-line bg-white px-4 py-3.5 text-[0.9375rem] text-ink " +
  "transition-colors duration-300 placeholder:text-ink-mute/70 hover:border-royal-300 " +
  "focus:border-royal-600 focus:outline-none focus-visible:outline-none";

function ContactForm() {
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const formId = useId();
  const successRef = useRef(null);

  const update = (e) => {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
    if (errors[name]) setErrors((err) => ({ ...err, [name]: undefined }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      const first = document.getElementById(Object.keys(found)[0]);
      first?.focus();
      return;
    }
    setSubmitted(true);
    requestAnimationFrame(() => successRef.current?.focus());
  };

  if (submitted) {
    return (
      <div
        ref={successRef}
        tabIndex={-1}
        className="border border-royal-200 bg-royal-50 p-8 focus-visible:outline-none sm:p-10"
      >
        <CheckCircle2 aria-hidden="true" className="h-9 w-9 text-royal-600" />
        <h3 className="mt-5 font-display text-[1.5rem] font-semibold tracking-[-0.022em] text-ink">
          Your details are ready to send, {values.name.split(" ")[0]}.
        </h3>
        <p className="mt-4 text-[0.9375rem] leading-[1.7] text-ink-soft">
          This form is the front end of a site whose server is still being built, so nothing has
          been transmitted yet. Until it is connected, the fastest way to reach us is directly:
        </p>

        <div className="mt-7 flex flex-wrap gap-3">
          <Button href={contact.phones[0].href} variant="primary" arrow={false}>
            <Phone aria-hidden="true" className="h-4 w-4" />
            {contact.phones[0].label}
          </Button>
          <Button
            href={`mailto:${contact.email}?subject=${encodeURIComponent(
              `${values.subject} — enquiry from ${values.name}`,
            )}&body=${encodeURIComponent(
              `${values.message}\n\n—\n${values.name}\n${values.phone}\n${values.email}`,
            )}`}
            variant="outline"
            arrow={false}
          >
            <Mail aria-hidden="true" className="h-4 w-4" />
            Send this as an email
          </Button>
        </div>

        <button
          type="button"
          onClick={() => {
            setValues(EMPTY);
            setSubmitted(false);
          }}
          className="link-underline mt-8 text-[0.875rem] font-semibold text-royal-700"
        >
          Write another enquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate aria-labelledby={`${formId}-title`}>
      <h3 id={`${formId}-title`} className="sr-only">
        Enquiry form
      </h3>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Full name" name="name" error={errors.name}>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            value={values.name}
            onChange={update}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-error" : undefined}
            placeholder="Your name"
            className={inputCls}
          />
        </Field>

        <Field label="Phone" name="phone" error={errors.phone}>
          <input
            id="phone"
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            value={values.phone}
            onChange={update}
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? "phone-error" : undefined}
            placeholder="+91"
            className={inputCls}
          />
        </Field>

        <div className="sm:col-span-2">
          <Field label="Email" name="email" error={errors.email}>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              value={values.email}
              onChange={update}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "email-error" : undefined}
              placeholder="you@example.com"
              className={inputCls}
            />
          </Field>
        </div>

        <div className="sm:col-span-2">
          <Field label="I'm enquiring about" name="subject">
            <select
              id="subject"
              name="subject"
              value={values.subject}
              onChange={update}
              className={`${inputCls} appearance-none bg-[length:1.1rem] bg-[right_1rem_center] bg-no-repeat pr-11`}
              style={{
                backgroundImage:
                  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%237d766d' stroke-width='2'><path d='M6 9l6 6 6-6'/></svg>\")",
              }}
            >
              {SUBJECTS.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </Field>
        </div>

        <div className="sm:col-span-2">
          <Field
            label="Message"
            name="message"
            error={errors.message}
            hint="Tell us the student's current class or qualification — it helps us answer precisely."
          >
            <textarea
              id="message"
              name="message"
              rows={5}
              value={values.message}
              onChange={update}
              aria-invalid={!!errors.message}
              aria-describedby={errors.message ? "message-error" : undefined}
              placeholder="How can we help?"
              className={`${inputCls} resize-y`}
            />
          </Field>
        </div>
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-5">
        <Button type="submit">Send enquiry</Button>
        <p className="text-[0.8125rem] text-ink-mute">
          We usually reply within one working day.
        </p>
      </div>
    </form>
  );
}

/* ------------------------------------------------------------------ */
/* PAGE                                                                */
/* ------------------------------------------------------------------ */

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
        eyebrow="Get in touch"
        title="Contact Satpuda Group"
        lead="One campus, four institutions. Tell us who the student is and what stage they're at, and we'll point you to the right person."
        crumbs={[{ label: "Contact" }]}
        image={campusImages.campusFront}
      />

      {/* ---------------- details + form ---------------- */}
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

            {/* --- form --- */}
            <div>
              <Reveal>
                <h2 className="t-h2 text-ink">Send us an enquiry.</h2>
                <p className="t-lead mt-5 max-w-xl">
                  Fill this in and we will get back to you, or call the numbers alongside if it is
                  urgent.
                </p>
              </Reveal>
              <Reveal delay={stagger(2)} className="mt-10">
                <ContactForm />
              </Reveal>
            </div>
          </div>
        </div>
      </section>

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
