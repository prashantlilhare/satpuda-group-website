import { motion } from "motion/react";
import { Check, Globe, GraduationCap, MapPin, Phone } from "lucide-react";
import { useCycle } from "../../hooks/useCycle";
import { Swoosh, TwoTone, Zoom } from "./parts";
import { EASE, enter } from "./motion";

/* ------------------------------------------------------------------ */
/* p.11 — counselling & guidance                                       */
/* ------------------------------------------------------------------ */

/** The prospectus's rounded amber label. */
function Pill({ children, className = "" }) {
  return (
    <p className={`w-fit rounded-full bg-amber-400 px-6 py-2.5 font-display text-[1rem] font-extrabold uppercase tracking-[0.05em] text-royal-950 sm:text-[1.1875rem] ${className}`}>
      {children}
    </p>
  );
}

/**
 * Weekend counselling, then the admission procedure on a royal panel —
 * a slow highlight stepping down its four steps — beside the documents to
 * bring, ticked off one by one, and the competition preparation, with
 * prints of the school pinned in the last corner.
 */
export function SchoolCounselling({ counselling, steps, documents, prep, photos, onView }) {
  const [ref, active, hold, release] = useCycle(steps.length, 3000);

  return (
    <section className="section relative overflow-hidden bg-paper-dim">
      <Swoosh flip />
      <div className="shell">
        <div className="flex items-end gap-3">
          <div>
            <TwoTone a="Counselling &" b="Guidance" as="h2" className="[&>span]:block" />
          </div>
          <motion.span
            aria-hidden="true"
            className="mb-2 grid h-14 w-9 place-items-center rounded-md bg-amber-400 font-display text-[2.25rem] font-extrabold text-royal-950 sm:h-16"
            initial={{ rotate: 0 }}
            whileInView={{ rotate: [0, -14, 10, -6, 0] }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            !
          </motion.span>
        </div>

        <motion.div className="mt-10 flex flex-col items-center text-center" {...enter(0.1)}>
          <Pill>Counselling / career services</Pill>
          <p className="mt-5 max-w-4xl text-[0.9375rem] font-medium uppercase leading-relaxed tracking-[0.02em] text-ink-soft sm:text-[1rem]">
            {counselling}
          </p>
        </motion.div>

        <div className="section-body grid gap-5 lg:grid-cols-2 lg:gap-6">
          {/* admission procedure */}
          <motion.div className="on-dark rounded-xl bg-royal-900 p-6 text-white sm:p-8" {...enter(0)}>
            <Pill className="-ml-1">Admission procedure</Pill>
            <ol ref={ref} onMouseLeave={release} className="mt-6 space-y-3">
              {steps.map((s, i) => {
                const on = i === active;
                return (
                  <li
                    key={i}
                    onMouseEnter={() => hold(i)}
                    className={`flex gap-4 rounded-md p-3 transition-colors duration-500 ${on ? "bg-white/10" : ""}`}
                  >
                    <span
                      className={`grid h-8 w-8 shrink-0 place-items-center rounded-full font-display text-[0.9375rem] font-extrabold transition-colors duration-500 ${
                        on ? "bg-amber-400 text-royal-950" : "border border-white/30 text-white/80"
                      }`}
                    >
                      {i + 1}
                    </span>
                    <p className={`text-[0.875rem] leading-relaxed transition-colors duration-500 ${on ? "text-white" : "text-white/70"}`}>{s}</p>
                  </li>
                );
              })}
            </ol>
          </motion.div>

          {/* documents required */}
          <motion.div className="rounded-xl border-[3px] border-royal-950 bg-gradient-to-b from-amber-200 to-amber-400 p-6 text-royal-950 sm:p-8" {...enter(0.1)}>
            <h3 className="text-center font-display text-[1.75rem] font-extrabold uppercase leading-tight tracking-[0.04em] sm:text-[2rem]">
              Documents required
            </h3>
            <ul className="mt-5 space-y-2.5 border-t-2 border-royal-950/80 pt-5">
              {documents.map((d, i) => (
                <motion.li
                  key={d}
                  className="flex items-start gap-3 text-[0.9375rem] font-semibold uppercase leading-snug"
                  initial={{ opacity: 0, x: 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "0px 0px -8% 0px" }}
                  transition={{ duration: 0.5, ease: EASE, delay: 0.2 + i * 0.07 }}
                >
                  <motion.span
                    aria-hidden="true"
                    className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-royal-950 text-amber-300"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 400, damping: 15, delay: 0.35 + i * 0.07 }}
                  >
                    <Check className="h-3 w-3" strokeWidth={3} />
                  </motion.span>
                  {d}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* competition preparation */}
          <motion.div className="relative rounded-xl border-[3px] border-royal-950 bg-gradient-to-b from-amber-200 to-amber-400 p-6 text-royal-950 sm:p-8" {...enter(0)}>
            <span aria-hidden="true" className="absolute -right-4 -top-4 grid h-14 w-14 place-items-center rounded-full bg-ember-500 text-white shadow-md">
              <GraduationCap className="h-7 w-7" strokeWidth={1.8} />
            </span>
            <h3 className="font-display text-[1.75rem] font-extrabold uppercase leading-tight tracking-[0.04em] sm:text-[2rem]">
              Competition preparation
            </h3>
            <ul className="mt-5 space-y-3 border-t-2 border-royal-950/80 pt-5">
              {prep.map((p, i) => (
                <motion.li
                  key={p}
                  className="group flex items-start gap-3 text-[0.9375rem] font-bold uppercase leading-snug"
                  {...enter(0.1 + i * 0.06, 10)}
                >
                  <span aria-hidden="true" className="mt-[0.45rem] h-2 w-2 shrink-0 rounded-full bg-royal-950 transition-transform duration-300 group-hover:scale-150" />
                  {p}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* pinned prints */}
          <div className="relative min-h-[20rem] sm:min-h-[24rem]">
            {photos.map((p, i) => {
              const place = ["left-0 top-6 w-[52%] -rotate-3", "right-0 top-0 w-[48%] rotate-3", "left-[22%] bottom-0 w-[50%] -rotate-2"][i];
              return (
                <motion.div
                  key={p.id}
                  className={`absolute ${place} border-[6px] border-white bg-white shadow-[0_18px_34px_-14px_rgba(20,34,68,0.5)]`}
                  initial={{ opacity: 0, y: -40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ rotate: 0, scale: 1.04, zIndex: 3 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", stiffness: 160, damping: 16, delay: 0.12 * i }}
                >
                  <Zoom photo={p} onView={onView} sizes="25vw" className="aspect-[4/3] w-full" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* p.12 — the four houses & where to find us                           */
/* ------------------------------------------------------------------ */

/**
 * A classroom across the top with the four houses as coloured circles
 * along its lower edge, each bobbing gently out of step with the others,
 * and the school's numbers, website and address below.
 */
export function SchoolHouses({ line, photo, houses, phones, website, address, map }) {
  return (
    <section className="on-dark relative isolate overflow-hidden bg-royal-950 pb-16 text-white sm:pb-20">
      <div className="relative">
        <img
          src={photo.src}
          alt={photo.alt}
          loading="lazy"
          decoding="async"
          style={{ objectPosition: photo.focus }}
          className="h-[18rem] w-full object-cover sm:h-[26rem]"
        />
        <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-royal-950 to-transparent" />
      </div>

      <div className="shell relative -mt-20 sm:-mt-28">
        <ul className="flex flex-wrap items-center justify-center gap-3 sm:gap-5">
          {houses.map((h, i) => (
            <motion.li
              key={h.name}
              className={`grid h-28 w-28 place-items-center rounded-full p-3 text-center ring-8 sm:h-36 sm:w-36 ${h.tone} ${h.ring} ${h.text}`}
              initial={{ opacity: 0, scale: 0.4 }}
              whileInView={{ opacity: 1, scale: 1, y: [0, -6, 0] }}
              whileHover={{ scale: 1.08 }}
              viewport={{ once: true }}
              transition={{
                opacity: { duration: 0.4, delay: 0.1 * i },
                scale: { type: "spring", stiffness: 200, damping: 14, delay: 0.1 * i },
                y: { duration: 3.2, repeat: Infinity, ease: "easeInOut", delay: 0.4 * i },
              }}
            >
              <span className="font-display text-[1rem] font-extrabold uppercase leading-tight sm:text-[1.25rem]">
                {h.name}
                <br />
                House
              </span>
            </motion.li>
          ))}
        </ul>
        <motion.p
          className="mx-auto mt-6 w-fit rounded-sm bg-royal-700 px-5 py-2 text-center font-display text-[1.0625rem] font-bold text-white sm:text-[1.25rem]"
          {...enter(0.4)}
        >
          {line}
        </motion.p>

        <div className="mt-12 flex flex-col items-center gap-4 text-center">
          <motion.p className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 rounded-full bg-gradient-to-r from-amber-300 to-amber-400 px-6 py-3 font-display text-[1.25rem] font-extrabold text-royal-950 sm:text-[1.625rem]" {...enter(0.1)}>
            <Phone aria-hidden="true" className="h-6 w-6" strokeWidth={2.2} />
            {phones.map((p, i) => (
              <a key={p.href} href={p.href} className="transition-colors hover:text-ember-700">
                {i > 0 && <span className="text-royal-950/50">/ </span>}
                {p.label}
              </a>
            ))}
          </motion.p>
          <motion.a href={website.href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 text-[1.0625rem] uppercase tracking-[0.04em] text-white/90 transition-colors hover:text-amber-300" {...enter(0.2)}>
            <Globe aria-hidden="true" className="h-5 w-5 text-amber-400" />
            {website.label}
          </motion.a>
          <motion.a href={map} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 text-[1rem] text-white/80 transition-colors hover:text-amber-300" {...enter(0.25)}>
            <MapPin aria-hidden="true" className="h-5 w-5 text-amber-400" />
            {address}
          </motion.a>
        </div>
      </div>
    </section>
  );
}
