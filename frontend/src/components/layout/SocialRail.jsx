import { Mail } from "lucide-react";
import { motion } from "motion/react";
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
        {/* Slides in from the edge a moment after load, one button at a time. */}
        {links.map(({ key, label, href, external, Icon, hover }, i) => (
          <motion.li
            key={key}
            className="relative"
            initial={{ x: 56, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            whileHover={{ x: -4 }}
            transition={{ type: "spring", stiffness: 320, damping: 26, delay: 0.8 + i * 0.1 }}
          >
            {/* WhatsApp is the quickest way in, so it alone breathes. */}
            {key === "whatsapp" && (
              <span
                aria-hidden="true"
                className="rail-ping pointer-events-none absolute inset-0 rounded-l-xl bg-[#25d366]"
              />
            )}
            <a
              href={href}
              target={external ? "_blank" : undefined}
              rel={external ? "noreferrer noopener" : undefined}
              aria-label={label}
              className={`group/rail relative flex h-11 w-11 items-center justify-center rounded-l-xl border border-r-0 border-sand bg-white text-royal-700 shadow-[0_10px_26px_-14px_rgba(20,34,68,0.6)] transition-[background-color,color,width] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:text-white focus-visible:text-white sm:h-12 sm:w-12 ${hover}`}
            >
              <Icon className="h-[1.15rem] w-[1.15rem] transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover/rail:scale-115 group-hover/rail:-rotate-8 sm:h-5 sm:w-5" />
              <span className="sr-only">{label}</span>
            </a>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}
