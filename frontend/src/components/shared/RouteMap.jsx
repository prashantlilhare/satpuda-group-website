import { Fragment, useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { Reveal } from "../ui/Primitives";
import { stagger } from "../ui/stagger";

const EASE = [0.16, 1, 0.3, 1];

/* The two ways into an engineering qualification here, following the
   admission rules in `engineeringAdmission`. */
const ROUTES = [
  { from: "After Class 12", via: "B.Tech", viaSub: "4 years · 8 semesters", to: "B.Tech degree", toSub: "AICTE-approved, RGPV" },
  { from: "After Class 10", via: "Diploma", viaSub: "3 years · 6 semesters", to: "Diploma", toSub: "Work, or go on to a degree" },
];

const NODE_W = "w-[11rem] shrink-0 lg:w-[12.5rem]";

/* A route line: drawn in once, then a dot keeps travelling along it. */
function RouteLine({ on, delay, still }) {
  return (
    <span className="relative mx-3 block h-[2px] flex-1 bg-stone-line lg:mx-4">
      <motion.span
        className="absolute inset-0 origin-left bg-royal-600"
        initial={{ scaleX: 0 }}
        animate={on ? { scaleX: 1 } : undefined}
        transition={{ duration: 0.8, ease: EASE, delay }}
      />
      {on && !still && (
        <motion.span
          className="absolute top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ember-500 shadow-[0_0_0_4px_rgb(217_58_38/0.18)]"
          initial={{ left: "0%", opacity: 0 }}
          animate={{ left: ["0%", "100%"], opacity: [0, 1, 1, 0] }}
          transition={{ duration: 2.2, ease: "easeInOut", repeat: Infinity, repeatDelay: 0.8, delay: delay + 0.9 }}
        />
      )}
    </span>
  );
}

function RouteNode({ title, sub, accent = false }) {
  return (
    <div
      className={`flex h-[5.5rem] flex-col justify-center rounded-2xl border px-5 ${NODE_W} ${
        accent ? "border-royal-600 bg-royal-600 text-white" : "border-stone-line bg-white text-ink"
      }`}
    >
      <p className="font-display text-[1.0625rem] font-semibold tracking-[-0.015em]">{title}</p>
      {sub && <p className={`mt-1 text-[0.8125rem] leading-snug ${accent ? "text-white/75" : "text-ink-mute"}`}>{sub}</p>}
    </div>
  );
}

/**
 * The admission routes as a small transit map.
 *
 * Two lines run left to right — Class 12 into the degree, Class 10 into
 * the diploma — and a branch climbs from the diploma line into the degree
 * line partway along: lateral entry into the second year. The lines draw
 * in when the map arrives, then a dot keeps running each route so it
 * reads as a way through rather than a table. On a phone the same two
 * routes stack as short vertical lists.
 */
export function RouteMap({ className = "" }) {
  const ref = useRef(null);
  const on = useInView(ref, { once: true, margin: "0px 0px -20% 0px" });
  const still = useReducedMotion();

  return (
    <div ref={ref} className={className}>
      {/* laptop: the map */}
      <div className="hidden md:block">
        {ROUTES.map((r, i) => (
          <Fragment key={r.from}>
            <div className="flex items-center">
              <RouteNode title={r.from} />
              <RouteLine on={on} delay={0.2 + i * 0.25} still={still} />
              <RouteNode title={r.via} sub={r.viaSub} accent />
              <RouteLine on={on} delay={0.7 + i * 0.25} still={still} />
              <RouteNode title={r.to} sub={r.toSub} />
            </div>

            {i === 0 && (
              /* the lateral-entry branch, joining the two lines' second legs;
                 it runs on past this row to the middle of the nodes either side */
              <div className="flex h-20">
                <span className={NODE_W} />
                <span className="mx-3 flex-1 lg:mx-4" />
                <span className={NODE_W} />
                <span className="relative mx-3 flex flex-1 items-center justify-center lg:mx-4">
                  <span className="absolute -bottom-[2.75rem] -top-[2.75rem] left-1/2 w-[2px] -translate-x-1/2 bg-[repeating-linear-gradient(to_top,var(--color-stone-line)_0_6px,transparent_6px_11px)]">
                    <motion.span
                      className="absolute inset-0 origin-bottom bg-[repeating-linear-gradient(to_top,var(--color-ember-500)_0_6px,transparent_6px_11px)]"
                      initial={{ scaleY: 0 }}
                      animate={on ? { scaleY: 1 } : undefined}
                      transition={{ duration: 0.9, ease: EASE, delay: 1.5 }}
                    />
                    {on && !still && (
                      <motion.span
                        className="absolute left-1/2 h-2.5 w-2.5 -translate-x-1/2 translate-y-1/2 rounded-full bg-ember-500"
                        initial={{ bottom: "0%", opacity: 0 }}
                        animate={{ bottom: ["0%", "100%"], opacity: [0, 1, 1, 0] }}
                        transition={{ duration: 1.6, ease: "easeInOut", repeat: Infinity, repeatDelay: 1.4, delay: 2.4 }}
                      />
                    )}
                  </span>
                  <motion.span
                    className="relative z-[1] whitespace-nowrap rounded-full border border-ember-500/40 bg-paper-dim px-3 py-1 text-[0.75rem] font-semibold text-ember-600"
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={on ? { opacity: 1, scale: 1 } : undefined}
                    transition={{ type: "spring", stiffness: 320, damping: 20, delay: 2 }}
                  >
                    ↑ Lateral entry · B.Tech Year 2
                  </motion.span>
                </span>
                <span className={NODE_W} />
              </div>
            )}
          </Fragment>
        ))}
      </div>

      {/* phone: the same routes, stacked */}
      <div className="grid gap-5 md:hidden">
        {ROUTES.map((r, i) => (
          <Reveal key={r.from} delay={stagger(i)}>
            <div className="rounded-2xl border border-stone-line bg-white p-5">
              <ol className="relative">
                <span aria-hidden="true" className="absolute bottom-5 left-[0.4375rem] top-5 w-[2px] bg-stone-line">
                  <motion.span
                    className="absolute inset-0 origin-top bg-royal-600"
                    initial={{ scaleY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: EASE, delay: 0.2 }}
                  />
                </span>
                {[
                  [r.from, null],
                  [r.via, r.viaSub],
                  [r.to, r.toSub],
                ].map(([t, sub], k) => (
                  <li key={k} className="relative grid grid-cols-[1rem_1fr] items-start gap-4 py-2.5">
                    <span
                      className={`mt-1 h-4 w-4 rounded-full border-2 border-royal-600 ${k === 1 ? "bg-royal-600" : "bg-white"}`}
                    />
                    <div>
                      <p className="font-display text-[1rem] font-semibold text-ink">{t}</p>
                      {sub && <p className="mt-0.5 text-[0.8125rem] text-ink-mute">{sub}</p>}
                    </div>
                  </li>
                ))}
              </ol>
              {i === 1 && (
                <p className="mt-3 inline-block rounded-full border border-ember-500/40 px-3 py-1 text-[0.75rem] font-semibold text-ember-600">
                  Or lateral entry into B.Tech Year 2
                </p>
              )}
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
