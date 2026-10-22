import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import logo from "../../assets/logo/satpuda-group-logo.webp";
import { FacebookIcon, InstagramIcon } from "../ui/BrandIcons";
import { aboutLinks, contact, instituteLinks, nav, site, socials } from "../../data/site";
import { instituteDirectory, jobSahi } from "../../data/brochure";

const ICONS = { instagram: InstagramIcon, facebook: FacebookIcon };

function Column({ title, children, className = "" }) {
  return (
    <div className={className}>
      <h3 className="text-[0.6875rem] font-semibold uppercase tracking-[0.17em] text-ember-300">
        {title}
      </h3>
      <div className="mt-4 sm:mt-6">{children}</div>
    </div>
  );
}

function FooterLink({ to, children }) {
  return (
    <li>
      <Link
        to={to}
        className="link-underline inline-block py-1.5 text-[0.9375rem] text-white/65 transition-[color,translate] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:translate-x-1 hover:text-white"
      >
        {children}
      </Link>
    </li>
  );
}

/** A store badge — a link once the store page is known, a picture until then. */
function StoreBadge({ store }) {
  const img = (
    <img
      src={store.badge}
      alt={store.label}
      width={store.width}
      height={store.height}
      loading="lazy"
      decoding="async"
      className="h-11 w-auto"
    />
  );
  return store.href ? (
    <a href={store.href} target="_blank" rel="noopener noreferrer" className="transition-opacity duration-300 hover:opacity-80">
      {img}
    </a>
  ) : (
    img
  );
}

/** One institute: its name (linked where it has a page) and its cell number. */
function DirectoryRow({ item }) {
  const name = (
    <>
      <span className="block text-[0.875rem] font-medium leading-snug text-white/85">{item.name}</span>
      <span className="block text-[0.75rem] leading-snug text-white/50">{item.place}</span>
    </>
  );
  const linkClass = "group/name block min-w-0 transition-colors hover:[&>span:first-child]:text-white";
  return (
    <li className="flex items-start justify-between gap-4 border-b border-white/8 py-2.5">
      {item.to ? (
        <Link to={item.to} className={linkClass}>
          {name}
        </Link>
      ) : item.href ? (
        <a href={item.href} target="_blank" rel="noopener noreferrer" className={linkClass}>
          {name}
          <span className="sr-only">(opens in a new tab)</span>
        </a>
      ) : (
        <span className="block min-w-0">{name}</span>
      )}
      <a
        href={item.phone.href}
        className="shrink-0 pt-px text-[0.8125rem] tabular-nums text-ember-300 transition-colors hover:text-white"
      >
        {item.phone.label}
      </a>
    </li>
  );
}

/**
 * The brochure's back page, in the footer: JobSahi on the left — the
 * portal, its apps and the free career-counselling line — and on the right
 * every institute in the group with its own number, in the brochure's
 * order. On a phone the fifteen ITIs fold behind a button.
 */
function JobSahiBand() {
  const [allItis, setAllItis] = useState(false);

  return (
    <div className="border-t border-white/10">
      <div className="shell grid gap-12 py-12 sm:py-14 lg:grid-cols-[19rem_1fr] lg:gap-16">
        {/* --- JobSahi --- */}
        <div>
          <a
            href={jobSahi.href}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-fit rounded-xl bg-white p-3 transition-transform duration-300 ease-out hover:-translate-y-0.5"
          >
            <img
              src={jobSahi.logo}
              alt="JobSahi — Satpuda Group's job portal"
              width="273"
              height="231"
              loading="lazy"
              decoding="async"
              className="h-24 w-auto"
            />
            <span className="sr-only">(opens in a new tab)</span>
          </a>
          <h3 className="mt-6 text-[0.6875rem] font-semibold uppercase tracking-[0.17em] text-ember-300">
            Satpuda Group's placement app
          </h3>
          <a
            href={jobSahi.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-2.5 inline-flex items-center gap-1.5 font-display text-xl font-semibold text-white"
          >
            {jobSahi.display}
            <ArrowUpRight aria-hidden="true" className="h-4 w-4 text-white/60 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            <span className="sr-only">(opens in a new tab)</span>
          </a>
          <p className="mt-2 text-[0.875rem] leading-relaxed text-white/60">
            For technical job seekers — {jobSahi.registered} candidates already registered.
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-2.5">
            {jobSahi.stores.map((st) => (
              <StoreBadge key={st.label} store={st} />
            ))}
          </div>

          <div className="mt-8 rounded-lg border border-white/12 p-4">
            <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.15em] text-white">
              Free career counselling
            </p>
            <p className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
              {jobSahi.counselling.map((p) => (
                <a
                  key={p.href}
                  href={p.href}
                  className="link-underline text-[0.9375rem] tabular-nums text-white/75 transition-colors hover:text-white"
                >
                  {p.label}
                </a>
              ))}
            </p>
          </div>
        </div>

        {/* --- every institute, with its number --- */}
        <div>
          <h3 className="text-[0.6875rem] font-semibold uppercase tracking-[0.17em] text-ember-300">
            Call an institute directly
          </h3>
          {instituteDirectory.map((g, gi) => {
            const folded = gi > 0 && !allItis;
            return (
              <div key={g.group} className="mt-6">
                <p className="text-[0.8125rem] font-semibold text-white/60">
                  {g.group}
                  <span className="ml-2 font-normal text-white/40">{g.items.length}</span>
                </p>
                <ul
                  id={`dir-${gi}`}
                  className={`mt-2 grid gap-x-8 sm:grid-cols-2 xl:grid-cols-3 ${folded ? "max-sm:hidden" : ""}`}
                >
                  {g.items.map((item) => (
                    <DirectoryRow key={`${item.name}-${item.place}`} item={item} />
                  ))}
                </ul>
                {gi > 0 && (
                  <button
                    type="button"
                    aria-expanded={allItis}
                    aria-controls={`dir-${gi}`}
                    onClick={() => setAllItis((v) => !v)}
                    className="mt-3 text-[0.875rem] font-semibold text-white underline decoration-white/30 underline-offset-4 sm:hidden"
                  >
                    {allItis ? "Show fewer" : `Show all ${g.items.length} ITIs`}
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="on-dark bg-royal-950 text-white">
      <div className="shell section-tight">
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:gap-x-10 sm:gap-y-14 lg:grid-cols-[1.35fr_0.8fr_0.8fr_1.4fr] lg:gap-10">
          {/* --- brand --- */}
          <div className="col-span-2 max-w-sm lg:col-span-1">
            <Link to="/" className="inline-flex items-center gap-3.5" aria-label={`${site.name} — home`}>
              <img src={logo} alt="" width="512" height="512" loading="lazy" decoding="async" className="h-14 w-14" />
              <span className="flex flex-col leading-none">
                <span
                  className="font-display text-xl font-semibold tracking-[-0.022em] text-white"
                  style={{ fontVariationSettings: '"opsz" 36' }}
                >
                  Satpuda Group
                </span>
                <span className="mt-1.5 text-[0.6875rem] font-semibold uppercase tracking-[0.17em] text-white/60">
                  Balaghat · Madhya Pradesh
                </span>
              </span>
            </Link>

            <p className="mt-7 text-[0.9375rem] leading-relaxed text-white/60">
              A family of institutions spanning school education, vocational trades, teacher
              education and engineering — run by {site.trust}, Balaghat.
            </p>

            <p className="motto mt-7 text-lg text-ember-300">{site.motto}</p>
            <p className="mt-1.5 text-[0.8125rem] italic text-white/60">
              “{site.mottoMeaning}”
            </p>
          </div>

          {/* --- quick links --- */}
          <Column title="Quick Links">
            <ul>
              {nav.map((item) => (
                <FooterLink key={item.label} to={item.to}>
                  {item.label}
                </FooterLink>
              ))}
              {aboutLinks.slice(1).map((item) => (
                <FooterLink key={item.to} to={item.to}>
                  {item.label}
                </FooterLink>
              ))}
            </ul>
          </Column>

          {/* --- institutions --- */}
          <Column title="Institutions">
            <ul>
              {instituteLinks.map((item) => (
                <FooterLink key={item.to} to={item.to}>
                  {item.label}
                </FooterLink>
              ))}
            </ul>
          </Column>

          {/* --- contact --- */}
          <Column title="Contact" className="col-span-2 lg:col-span-1">
            <address className="not-italic">
              <div className="flex gap-3.5">
                <MapPin aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-ember-400" />
                <p className="text-[0.9375rem] leading-relaxed text-white/60">
                  {contact.addressLines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </p>
              </div>

              <div className="mt-5 flex gap-3.5">
                <Phone aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-ember-400" />
                <span className="flex flex-col gap-1.5">
                  {contact.phones.map((p) => (
                    <a
                      key={p.href}
                      href={p.href}
                      className="link-underline text-[0.9375rem] text-white/60 transition-colors hover:text-white"
                    >
                      {p.label}
                    </a>
                  ))}
                </span>
              </div>

              <div className="mt-5 flex gap-3.5">
                <Mail aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-ember-400" />
                <a
                  href={`mailto:${contact.email}`}
                  className="link-underline text-[0.9375rem] text-white/60 transition-colors hover:text-white [overflow-wrap:anywhere]"
                >
                  {contact.email}
                </a>
              </div>
            </address>

            {socials.length > 0 && (
              <div className="mt-8 flex gap-2.5">
                {socials.map((s) => {
                  const Icon = ICONS[s.icon];
                  return (
                    <a
                      key={s.href}
                      href={s.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      aria-label={s.label}
                      title={s.label}
                      className="flex h-10 w-10 items-center justify-center border border-white/18 text-white/65 transition-all duration-300 hover:border-ember-500 hover:bg-ember-500 hover:text-white"
                    >
                      <Icon aria-hidden="true" className="h-4 w-4" />
                    </a>
                  );
                })}
              </div>
            )}
          </Column>
        </div>
      </div>

      <JobSahiBand />

      {/* --- bottom bar --- */}
      <div className="border-t border-white/10">
        <div className="shell flex flex-col gap-4 py-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[0.8125rem] text-white/60">
            © {year} {site.name}. All rights reserved.
          </p>
          <nav aria-label="Legal">
            <ul className="flex flex-wrap items-center gap-x-7 gap-y-2">
              <li>
                <Link
                  to="/privacy-policy"
                  className="link-underline text-[0.8125rem] text-white/60 transition-colors hover:text-white/80"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="link-underline text-[0.8125rem] text-white/60 transition-colors hover:text-white/80"
                >
                  Terms of Use
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}
