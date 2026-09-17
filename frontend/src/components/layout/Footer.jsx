import { Link } from "react-router-dom";
import { Mail, MapPin, Phone } from "lucide-react";
import logo from "../../assets/logo/satpuda-group-logo.png";
import { FacebookIcon, InstagramIcon } from "../ui/BrandIcons";
import { aboutLinks, contact, instituteLinks, nav, site, socials } from "../../data/site";

const ICONS = { instagram: InstagramIcon, facebook: FacebookIcon };

function Column({ title, children }) {
  return (
    <div>
      <h3 className="text-[0.6875rem] font-semibold uppercase tracking-[0.17em] text-ember-300">
        {title}
      </h3>
      <div className="mt-6">{children}</div>
    </div>
  );
}

function FooterLink({ to, children }) {
  return (
    <li>
      <Link
        to={to}
        className="link-underline inline-block py-1.5 text-[0.9375rem] text-white/65 transition-colors duration-300 hover:text-white"
      >
        {children}
      </Link>
    </li>
  );
}

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="on-dark bg-royal-950 text-white">
      <div className="shell section-tight">
        <div className="grid gap-14 lg:grid-cols-[1.35fr_0.8fr_0.8fr_1.4fr] lg:gap-10">
          {/* --- brand --- */}
          <div className="max-w-sm">
            <Link to="/" className="inline-flex items-center gap-3.5" aria-label={`${site.name} — home`}>
              <img src={logo} alt="" width="512" height="512" className="h-14 w-14" />
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
          <Column title="Contact">
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
