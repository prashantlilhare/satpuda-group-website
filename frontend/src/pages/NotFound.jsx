import { Link } from "react-router-dom";
import { Button, Eyebrow } from "../components/ui/Primitives";
import { instituteLinks } from "../data/site";
import { useSeo } from "../hooks/useSeo";

export default function NotFound() {
  useSeo({
    title: "Page not found",
    description: "The page you were looking for could not be found on the Satpuda Group website.",
  });

  return (
    <section className="section bg-paper">
      <div className="shell">
        <div className="max-w-2xl">
          <Eyebrow>Error 404</Eyebrow>
          <h1 className="t-h1 mt-6 text-ink">This page isn't here.</h1>
          <p className="t-lead mt-6">
            The link may be out of date, or the address may have been mistyped. Everything on the
            site can be reached from the pages below.
          </p>

          <div className="mt-10 flex flex-wrap gap-3.5">
            <Button to="/">Back to home</Button>
            <Button to="/contact" variant="outline">
              Contact us
            </Button>
          </div>
        </div>

        {/* Each card carries its own top rule, matching the bordered-row
            pattern used across the site. Previously the container drew a
            rule and every card drew a second one underneath it, which
            doubled up at the top of each column. */}
        <div className="section-body grid gap-x-12 gap-y-1 sm:grid-cols-2 lg:grid-cols-4">
          {instituteLinks.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="group border-t border-stone-line py-6 transition-colors duration-400 hover:border-royal-600"
            >
              <h2 className="font-display text-[1.125rem] font-semibold tracking-[-0.018em] text-ink transition-colors duration-300 group-hover:text-royal-700">
                {item.label}
              </h2>
              <p className="mt-2 text-[0.875rem] leading-relaxed text-ink-soft">{item.blurb}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
