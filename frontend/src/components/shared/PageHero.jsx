import { Fragment } from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { Eyebrow } from "../ui/Primitives";

/**
 * Interior page masthead. A dark royal band with an optional photographic
 * backdrop, kept deliberately quieter than the homepage hero so that the page
 * content below it carries the weight.
 */
export function PageHero({ eyebrow, title, lead, crumbs = [], image, imageAlt = "", align = "left" }) {
  return (
    <section className="on-dark relative isolate overflow-hidden bg-royal-900 pt-14 pb-16 sm:pt-20 sm:pb-24">
      {image && (
        <>
          <img
            src={image}
            alt={imageAlt}
            loading="eager"
            fetchPriority="high"
            decoding="async"
            className="absolute inset-0 -z-10 h-full w-full object-cover opacity-[0.22]"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(20,34,68,0.96)_0%,rgba(20,34,68,0.82)_45%,rgba(20,34,68,0.55)_100%)]"
          />
        </>
      )}

      {/* corner rule detail */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-0 hidden h-40 w-40 border-b border-l border-white/10 lg:block"
      />

      <div className={`shell relative ${align === "center" ? "text-center" : ""}`}>
        {crumbs.length > 0 && (
          <nav aria-label="Breadcrumb">
            <ol
              className={`flex flex-wrap items-center gap-x-2 gap-y-1 text-[0.8125rem] text-white/55 ${
                align === "center" ? "justify-center" : ""
              }`}
            >
              <li>
                <Link to="/" className="transition-colors hover:text-white">
                  Home
                </Link>
              </li>
              {crumbs.map((c, i) => (
                <Fragment key={c.label}>
                  <li aria-hidden="true">
                    <ChevronRight className="h-3.5 w-3.5 text-white/30" />
                  </li>
                  <li>
                    {i === crumbs.length - 1 || !c.to ? (
                      <span className="text-white" aria-current="page">
                        {c.label}
                      </span>
                    ) : (
                      <Link to={c.to} className="transition-colors hover:text-white">
                        {c.label}
                      </Link>
                    )}
                  </li>
                </Fragment>
              ))}
            </ol>
          </nav>
        )}

        <div className={`mt-9 ${align === "center" ? "mx-auto max-w-3xl" : "max-w-4xl"}`}>
          {eyebrow && <Eyebrow className={align === "center" ? "justify-center" : ""}>{eyebrow}</Eyebrow>}
          <h1 className="t-h1 mt-5 text-white">{title}</h1>
          {lead && (
            <p className="mt-7 max-w-2xl text-[1.0625rem] leading-relaxed text-white/72 sm:text-lg">
              {lead}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
