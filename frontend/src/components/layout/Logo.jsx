import { Link } from "react-router-dom";
import logo from "../../assets/logo/satpuda-group-logo-circle.png";
import { site } from "../../data/site";

/**
 * Brand lockup: the official emblem in a circular field, beside a typographic
 * wordmark and the Sanskrit motto carried on the emblem itself.
 *
 * The circular asset is not a crop. The artwork's outermost ink — the ends of
 * the Devanagari line — sits beyond an inscribed circle, so masking the square
 * directly would cut it. Instead the artwork is scaled to 86% and the emblem's
 * own flat blue (#294791) is extended around it before masking, which keeps
 * every element intact at its original proportions and colours.
 */
export function Logo({ variant = "dark", showWordmark = true, className = "" }) {
  const onLight = variant === "dark";

  return (
    <Link
      to="/"
      className={`group/logo inline-flex items-center gap-3 sm:gap-3.5 ${className}`}
      aria-label={`${site.name} — home`}
    >
      <img
        src={logo}
        alt=""
        width="512"
        height="512"
        className="h-11 w-11 shrink-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/logo:scale-[1.04] sm:h-[3.25rem] sm:w-[3.25rem]"
      />
      {showWordmark && (
        <span className="flex min-w-0 flex-col leading-none">
          <span
            className={`font-display text-[1.0625rem] font-semibold tracking-[-0.022em] sm:text-[1.1875rem] ${
              onLight ? "text-royal-800" : "text-white"
            }`}
            style={{ fontVariationSettings: '"opsz" 36' }}
          >
            Satpuda Group
          </span>
          <span
            lang="sa"
            className={`motto mt-1.5 truncate text-[0.75rem] leading-[1.35] sm:text-[0.8125rem] ${
              onLight ? "text-ember-600" : "text-ember-300"
            }`}
          >
            {site.motto}
          </span>
        </span>
      )}
    </Link>
  );
}
