import { Mail } from "lucide-react";
import { FacebookIcon, WhatsAppIcon } from "../ui/BrandIcons";
import { contact, socials } from "../../data/site";

/* The WhatsApp deep link wants a bare country-code number, not a tel: href. */
const whatsappNumber = contact.phones[0].href.replace(/[^\d]/g, "");
const facebook = socials.find((s) => s.icon === "facebook");

const links = [
  {
    key: "whatsapp",
    label: "WhatsApp",
    href: `https://wa.me/${whatsappNumber}`,
    external: true,
    Icon: WhatsAppIcon,
    hover: "hover:bg-[#25d366] focus-visible:bg-[#25d366]",
  },
  {
    key: "email",
    label: "Email",
    href: `mailto:${contact.email}`,
    Icon: Mail,
    hover: "hover:bg-ember-500 focus-visible:bg-ember-500",
  },
  facebook && {
    key: "facebook",
    label: "Facebook",
    href: facebook.href,
    external: true,
    Icon: FacebookIcon,
    hover: "hover:bg-[#1877f2] focus-visible:bg-[#1877f2]",
  },
].filter(Boolean);

/**
 * Persistent contact rail.
 *
 * Fixed to the right edge on every page — it belongs to the site, not to any
 * one page or section, and it is deliberately not duplicated inside the mobile
 * menu. Sits at `z-30`, below the header (`z-50`) and below the mobile menu
 * panel (`z-40`), so opening the menu covers it rather than fighting it.
 *
 * Kept to a single narrow column, vertically centred and off the thumb path at
 * the bottom of a phone screen, so it never lands on top of body copy or a
 * button. Labels slide out on hover where there is a pointer to hover with.
 */
export function SocialRail() {
  return (
    <div
      className="fixed right-0 top-1/2 z-30 -translate-y-1/2 print:hidden"
      style={{ paddingRight: "env(safe-area-inset-right, 0px)" }}
    >
      <ul className="flex flex-col items-end gap-2">
        {links.map(({ key, label, href, external, Icon, hover }) => (
          <li key={key}>
            <a
              href={href}
              target={external ? "_blank" : undefined}
              rel={external ? "noreferrer noopener" : undefined}
              aria-label={label}
              className={`group/rail flex h-11 w-11 items-center justify-center rounded-l-xl border border-r-0 border-sand bg-white/95 text-royal-700 shadow-[0_10px_26px_-14px_rgba(20,34,68,0.6)] backdrop-blur-sm transition-[background-color,color,width] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:text-white focus-visible:text-white sm:h-12 sm:w-12 ${hover}`}
            >
              <Icon className="h-[1.15rem] w-[1.15rem] sm:h-5 sm:w-5" />
              <span className="sr-only">{label}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
