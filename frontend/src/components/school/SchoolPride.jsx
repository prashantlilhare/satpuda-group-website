import { motion } from "motion/react";
import { Trophy } from "lucide-react";
import { Odometer } from "../ui/Primitives";
import { useCycle } from "../../hooks/useCycle";
import { Rule, TwoTone, Zoom } from "./parts";
import { EASE, enter } from "./motion";

/* ------------------------------------------------------------------ */
/* p.7 — vibrant school life                                           */
/* ------------------------------------------------------------------ */

/* A print uncovered from the left, once. */
const uncover = (delay) => ({
  initial: { clipPath: "inset(0 100% 0 0)" },
  whileInView: { clipPath: "inset(0 0% 0 0)" },
  viewport: { once: true, margin: "0px 0px -10% 0px" },
  transition: { duration: 0.9, ease: EASE, delay },
});

/**
 * The prospectus's collage: a royal panel listing the year's events beside
 * the annual function, then rows of event photographs framed in white,
 * each uncovered in turn. A slow highlight walks the list of events.
 */
export function SchoolLife({ events, photos, onView }) {
  const [ref, active, hold, release] = useCycle(events.length, 2200);
  const [lead, ...rest] = photos;
  const wide = rest.at(-1);
  const grid = rest.slice(0, -1);

  const frame = "border-4 border-white bg-white shadow-[0_14px_28px_-18px_rgba(20,34,68,0.55)]";

  return (
    <section className="section bg-paper-dim">
      <div className="shell space-y-3 sm:space-y-4">
        <div className="grid gap-3 sm:gap-4 lg:grid-cols-[1fr_1fr]">
          <motion.div
            className="on-dark relative overflow-hidden bg-royal-800 p-7 text-white sm:p-10"
            {...enter(0)}
          >
            <span aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(80%_70%_at_100%_100%,rgba(58,85,159,0.7),transparent_70%)]" />
            <div className="relative">
              <h2 className="font-display text-[2.5rem] font-extrabold uppercase leading-[0.95] tracking-[-0.02em] text-amber-400 sm:text-[3.5rem]">
                Vibrant
                <br />
                School Life
              </h2>
              <p className="mt-2 text-[1.125rem] text-white/85 sm:text-[1.25rem]">Moments that build memories</p>
              <ul ref={ref} onMouseLeave={release} className="mt-6 space-y-2">
                {events.map((e, i) => (
                  <motion.li
                    key={e}
                    onMouseEnter={() => hold(i)}
                    className="flex items-center gap-3 font-display text-[1.25rem] italic sm:text-[1.5rem]"
                    {...enter(0.15 + i * 0.07, 0)}
                  >
                    <motion.span
                      aria-hidden="true"
                      animate={{ scale: i === active ? 1.6 : 1, backgroundColor: i === active ? "var(--color-amber-400)" : "rgb(255 255 255 / 0.8)" }}
                      transition={{ duration: 0.4 }}
                      className="h-2 w-2 rounded-full"
                    />
                    <span className={`transition-colors duration-500 ${i === active ? "text-amber-300" : "text-white"}`}>{e}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
          <motion.div className={frame} {...uncover(0.1)}>
            <Zoom photo={lead} onView={onView} sizes="(min-width: 1024px) 50vw, 100vw" className="aspect-[16/10] h-full w-full" />
          </motion.div>
        </div>

        <ul className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
          {grid.map((p, i) => (
            <motion.li key={p.id} className={`${frame} relative`} {...uncover(0.08 * (i % 3))}>
              <Zoom photo={p} onView={onView} sizes="(min-width: 1024px) 33vw, 50vw" className="aspect-[4/3] w-full" />
              <span className="pointer-events-none absolute bottom-2 left-2 bg-royal-950/80 px-2 py-0.5 text-[0.6875rem] font-semibold text-white">
                {p.caption}
              </span>
            </motion.li>
          ))}
        </ul>

        <motion.div className={`${frame} relative`} {...uncover(0)}>
          <Zoom photo={wide} onView={onView} sizes="100vw" className="aspect-[16/9] w-full sm:aspect-[21/8]" />
          <span className="pointer-events-none absolute bottom-3 left-3 bg-amber-400 px-3 py-1 font-display text-[0.8125rem] font-extrabold uppercase tracking-[0.06em] text-royal-950">
            {wide.caption}
          </span>
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* p.8 — a legacy of success                                           */
/* ------------------------------------------------------------------ */

/**
 * "Balaghat's No. 1 school": the RIMC seat as a giant "1st" beside the
 * cadet, then the amber band and three trophy cards — Navodaya, JEE, NEET
 * — with a slow highlight passing between them, and the staff on stage at
 * the Rajat Jayanti beneath.
 */
export function SchoolLegacy({ rimc, groups, staff, onView }) {
  const [ref, active, hold, release] = useCycle(groups.length, 3000);

  return (
    <section className="on-dark relative isolate overflow-hidden bg-royal-950 pt-16 text-white sm:pt-20">
      <span aria-hidden="true" className="absolute inset-0 -z-10 bg-[radial-gradient(50%_40%_at_70%_20%,rgba(58,85,159,0.55),transparent_70%)]" />
      <div className="shell">
        <motion.p
          className="mx-auto w-fit rounded-full border border-white/40 bg-gradient-to-r from-royal-600 to-royal-500 px-6 py-3 text-center font-display text-[1.0625rem] italic text-white sm:px-10 sm:text-[1.5rem]"
          {...enter(0)}
        >
          A legacy of success that never pauses.
        </motion.p>

        <div className="mt-12 grid items-center gap-10 lg:grid-cols-[1fr_auto_auto] lg:gap-6">
          <div>
            <motion.p className="font-display text-[1.75rem] font-medium uppercase tracking-[0.01em] sm:text-[2.25rem]" {...enter(0.05)}>
              Balaghat&rsquo;s
            </motion.p>
            <motion.h2
              className="mt-1 w-fit bg-amber-400 px-3 font-display text-[2.75rem] font-extrabold uppercase leading-tight tracking-[-0.02em] text-royal-950 sm:text-[3.75rem]"
              initial={{ clipPath: "inset(0 100% 0 0)" }}
              whileInView={{ clipPath: "inset(0 0% 0 0)" }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.15 }}
            >
              No.1 School
            </motion.h2>
            <motion.p className="mt-4 border-l-4 border-amber-400 pl-3 font-display text-[1.25rem] font-medium uppercase leading-snug sm:text-[1.5rem]" {...enter(0.25)}>
              <span className="font-extrabold">Only seat</span> from entire
              <br />
              <span className="font-extrabold">Madhya Pradesh.</span>
            </motion.p>
            <motion.p className="mt-6 font-display text-[1.5rem] italic text-white/90 sm:text-[1.875rem]" {...enter(0.3)}>
              One Seat, One Selection
            </motion.p>
            <motion.p className="mt-5 max-w-md border-l-4 border-amber-200 bg-amber-400 px-4 py-2.5 text-[0.875rem] text-royal-950" {...enter(0.35)}>
              {rimc.body}
            </motion.p>
          </div>

          {/* the giant "1st", with R.I.M.C. down its stem */}
          <motion.div
            aria-hidden="true"
            className="relative mx-auto select-none"
            initial={{ opacity: 0, scale: 0.4, rotate: -8 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 120, damping: 12, delay: 0.2 }}
          >
            <span className="block font-display text-[12rem] font-extrabold leading-[0.8] text-ember-600 [-webkit-text-stroke:3px_white] [text-shadow:8px_8px_0_rgba(0,0,0,0.35)] sm:text-[15rem]">
              1
            </span>
            <span className="absolute left-1/2 top-[18%] -translate-x-1/2 font-display text-[1rem] font-extrabold tracking-[0.12em] text-white [writing-mode:vertical-rl] sm:text-[1.25rem]">
              R.I.M.C.
            </span>
            <motion.span
              className="absolute -right-10 top-0 font-display text-[3rem] font-extrabold text-amber-400 [-webkit-text-stroke:1px_white] sm:text-[4rem]"
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
            >
              st
            </motion.span>
          </motion.div>

          <motion.figure className="relative mx-auto w-60 sm:w-72" {...enter(0.3, 30)}>
            <img src={rimc.photo} alt={`${rimc.name}, ${rimc.cls}, in RIMC cadet uniform`} loading="lazy" decoding="async" className="w-full" />
            <figcaption className="absolute bottom-10 left-1/2 w-[110%] -translate-x-1/2 border-2 border-white/80 bg-ember-700 px-3 py-2 text-center">
              <span className="block font-display text-[1.25rem] font-extrabold uppercase tracking-[0.04em]">{rimc.name}</span>
              <span className="block text-[0.6875rem] font-bold uppercase tracking-[0.1em]">({rimc.cls})</span>
            </figcaption>
          </motion.figure>
        </div>
      </div>

      {/* the amber band, a light sweeping across it once */}
      <div className="relative mt-4 overflow-hidden bg-gradient-to-r from-amber-300 via-amber-400 to-amber-300 py-4 text-center">
        <motion.span
          aria-hidden="true"
          className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/60 to-transparent"
          initial={{ left: "-35%" }}
          whileInView={{ left: "110%" }}
          viewport={{ once: true }}
          transition={{ duration: 1.6, ease: "easeInOut", delay: 0.4 }}
        />
        <p className="relative font-display text-[1rem] font-extrabold uppercase tracking-[0.06em] text-royal-950 sm:text-[1.375rem]">
          From classrooms to competitive success.
        </p>
      </div>

      <div className="shell">
        <ul ref={ref} onMouseLeave={release} className="grid gap-5 py-12 md:grid-cols-3 lg:gap-8 lg:py-16">
          {groups.map((g, i) => {
            const on = i === active;
            return (
              <motion.li
                key={g.title}
                onMouseEnter={() => hold(i)}
                className={`rounded-xl border-[3px] bg-gradient-to-b from-amber-300 to-amber-400 p-6 text-royal-950 transition-[border-color,transform,box-shadow] duration-500 ${
                  on ? "-translate-y-1.5 border-white shadow-[0_24px_40px_-20px_rgba(251,191,36,0.7)]" : "border-royal-950"
                }`}
                {...enter(0.1 * i, 30)}
              >
                <div className="flex items-center gap-3">
                  <motion.span animate={{ rotate: on ? [0, -12, 12, 0] : 0 }} transition={{ duration: 0.8 }}>
                    <Trophy aria-hidden="true" className="h-9 w-9 text-amber-700" strokeWidth={1.8} />
                  </motion.span>
                  <h3 className="font-display text-[1.25rem] font-extrabold uppercase leading-tight tracking-[0.03em]">{g.title}</h3>
                </div>
                <ul className="mt-4 space-y-2">
                  {g.names.map((n) => {
                    const [name, place] = n.split(" — ");
                    return (
                      <li key={n} className="flex gap-2.5 text-[0.9375rem] font-semibold uppercase leading-snug">
                        <span aria-hidden="true" className="mt-[0.45rem] h-1.5 w-1.5 shrink-0 rounded-full bg-royal-950" />
                        <span>
                          {name}
                          {place && <span className="block text-[0.8125rem] font-medium text-royal-950/75">({place})</span>}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </motion.li>
            );
          })}
        </ul>
      </div>

      <motion.div {...uncover(0)}>
        <Zoom photo={staff} onView={onView} sizes="100vw" className="aspect-[16/9] w-full sm:aspect-[21/8]" />
      </motion.div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* p.10 — student success stories                                      */
/* ------------------------------------------------------------------ */

const BURST =
  "polygon(50% 0, 61% 12%, 75% 7%, 79% 21%, 93% 25%, 88% 39%, 100% 50%, 88% 61%, 93% 75%, 79% 79%, 75% 93%, 61% 88%, 50% 100%, 39% 88%, 25% 93%, 21% 79%, 7% 75%, 12% 61%, 0 50%, 12% 39%, 7% 25%, 21% 21%, 25% 7%, 39% 12%)";
const MEDAL = ["from-amber-300 to-amber-500 text-amber-900", "from-slate-200 to-slate-400 text-slate-700", "from-orange-300 to-orange-500 text-orange-900"];

/** One topper: portrait, a starburst with the mark, the medal and a red name plate. */
function Topper({ t, place, small = false, lit, onEnter, delay }) {
  return (
    <motion.li
      onMouseEnter={onEnter}
      className={`relative ${small ? "" : "pb-2"}`}
      initial={{ opacity: 0, y: 30, scale: 0.92 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      transition={{ type: "spring", stiffness: 150, damping: 17, delay }}
    >
      <div
        className={`relative overflow-hidden rounded-lg bg-white transition-[transform,box-shadow] duration-500 ${
          lit ? "-translate-y-1.5 shadow-[0_0_0_3px_var(--color-amber-400),0_24px_36px_-18px_rgba(0,0,0,0.6)]" : "shadow-[0_14px_28px_-18px_rgba(0,0,0,0.6)]"
        }`}
      >
        <img src={t.photo} alt={`Portrait of ${t.name}`} loading="lazy" decoding="async" className="aspect-square w-full object-cover" />
        <p className="bg-ember-600 px-1.5 py-1.5 text-center font-display font-extrabold uppercase leading-tight text-white">
          <span className={`block ${small ? "text-[0.6875rem]" : "text-[0.8125rem] sm:text-[0.9375rem]"}`}>{t.name}</span>
          {t.note && <span className="block text-[0.625rem] font-semibold normal-case tracking-normal text-white/85">{t.note}</span>}
        </p>
      </div>
      {/* the mark, on a starburst */}
      <span
        className={`absolute -right-2 -top-2 grid place-items-center bg-amber-400 font-display font-extrabold text-royal-950 ${small ? "h-11 w-11 text-[0.75rem]" : "h-14 w-14 text-[0.9375rem]"}`}
        style={{ clipPath: BURST }}
      >
        <span className="flex tabular-nums">
          <Odometer value={String(t.score)} />%
        </span>
      </span>
      {place !== undefined && (
        <motion.span
          aria-hidden="true"
          className={`absolute -left-2.5 -top-2.5 grid h-10 w-10 sm:h-11 sm:w-11 place-items-center rounded-full border-2 border-white bg-gradient-to-b font-display text-[1.25rem] font-extrabold shadow-md ${MEDAL[place]}`}
          initial={{ scale: 0, rotate: -90 }}
          whileInView={{ scale: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 260, damping: 14, delay: delay + 0.3 }}
        >
          {place + 1}
        </motion.span>
      )}
    </motion.li>
  );
}

/**
 * The 2025 board toppers as the prospectus prints them — Class X and
 * Class XII podiums of three, then the row of 80%+ results — every mark
 * rolling up on its starburst. A slow highlight passes from card to card.
 */
export function SchoolToppers({ year, classes, also, earlier }) {
  const podium = classes.flatMap((c) => c.toppers);
  const [ref, active, hold, release] = useCycle(podium.length + also.length, 1600);

  return (
    <section className="on-dark section relative isolate overflow-hidden bg-royal-900 text-white">
      <span aria-hidden="true" className="absolute inset-0 -z-10 bg-[radial-gradient(60%_40%_at_50%_0%,rgba(58,85,159,0.6),transparent_70%)]" />
      <div className="shell">
        <div className="text-center">
          <TwoTone a="Student" b="Success Stories" dark />
          <motion.p className="mt-5 font-display text-[1.25rem] font-bold uppercase tracking-[0.02em] sm:text-[1.75rem]" {...enter(0.15)}>
            CBSE Class 10<sup>th</sup> &amp; 12<sup>th</sup> board <span className="text-amber-400">results {year}</span>
          </motion.p>
          <motion.p className="mt-2 text-[0.9375rem] text-white/75" {...enter(0.2)}>
            A moment of pride for Satpuda Valley Public School, Manjhapur, Balaghat!
          </motion.p>
          <Rule className="mx-auto mt-5 w-28" />
        </div>

        <div ref={ref} onMouseLeave={release} className="section-body mx-auto max-w-4xl space-y-10">
          {classes.map((c, ci) => (
            <div key={c.label}>
              <p className="mb-4 text-center text-[0.75rem] font-bold uppercase tracking-[0.18em] text-amber-300">{c.label}</p>
              <ol className="grid grid-cols-3 gap-4 sm:gap-8">
                {c.toppers.map((t, i) => {
                  const index = ci * c.toppers.length + i;
                  return (
                    <Topper key={t.name} t={t} place={i} lit={active === index} onEnter={() => hold(index)} delay={0.08 * i} />
                  );
                })}
              </ol>
            </div>
          ))}

          <div>
            <p className="mb-4 text-center text-[0.75rem] font-bold uppercase tracking-[0.18em] text-amber-300">Also above 80%</p>
            <ul className="grid grid-cols-3 gap-3 sm:grid-cols-5 sm:gap-5">
              {also.map((t, i) => {
                const index = podium.length + i;
                return <Topper key={t.name} t={t} small lit={active === index} onEnter={() => hold(index)} delay={0.06 * i} />;
              })}
            </ul>
          </div>
        </div>

        {earlier && (
          <motion.div className="mx-auto mt-12 max-w-3xl border-t border-white/15 pt-6 text-center text-[0.875rem] text-white/70" {...enter(0)}>
            <p className="text-[0.6875rem] font-bold uppercase tracking-[0.16em] text-white/50">Toppers, {earlier.year}</p>
            {earlier.rows.map((r) => (
              <p key={r.label} className="mt-1.5">
                <span className="font-semibold text-white">{r.label}:</span> {r.names}
              </p>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
