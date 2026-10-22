import { useRef } from "react";
import { motion, useScroll } from "motion/react";
import { Blocks, BookOpen, FlaskConical, Megaphone, Puzzle, Signpost, TestTube } from "lucide-react";
import { useCycle } from "../../hooks/useCycle";
import { Bullet, Rule, Swoosh, TwoTone, Zoom } from "./parts";
import { EASE, enter } from "./motion";

/* ------------------------------------------------------------------ */
/* p.4 — academic philosophy & curriculum                              */
/* ------------------------------------------------------------------ */

const CLASS_ICONS = { Nursery: Megaphone, "KG-I & KG-II": Blocks, "Class I": Puzzle };

/**
 * The four stages as the prospectus's staircase — amber steps alternating
 * high and low, each with its number in a circle — then every class from
 * Nursery to XII as a tile with the one thing it works on. A slow
 * highlight climbs the stairs; the classes of the lit stage stand out in
 * the grid below. Pointing at a step or a class holds it.
 */
export function SchoolPhilosophy({ stages, classes, photos, onView }) {
  const [ref, active, hold, release] = useCycle(stages.length, 3200);

  return (
    <section className="section relative overflow-hidden bg-paper-dim">
      <Swoosh />
      <div className="shell">
        <div className="text-right">
          <TwoTone a="Philosophy" b="Academic" bFirst />
          <TwoTone a="Curriculum" b="&" bFirst as="p" className="mt-1" />
          <Rule className="ml-auto mt-5 w-56 bg-ink/80" />
        </div>

        <div ref={ref} onMouseLeave={release} className="section-body">
          {/* the staircase */}
          <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0">
            {stages.map((s, i) => {
              const on = i === active;
              const low = i % 2 === 1;
              return (
                <motion.li
                  key={s.title}
                  className={`flex items-center gap-4 lg:flex-col ${low ? "lg:flex-col-reverse lg:justify-end" : ""}`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "0px 0px -10% 0px" }}
                  transition={{ duration: 0.7, ease: EASE, delay: i * 0.14 }}
                  onMouseEnter={() => hold(i)}
                >
                  <div
                    className={`flex-1 px-4 py-4 text-center transition-[background-color,box-shadow,transform] duration-500 lg:w-full lg:flex-none lg:py-5 ${
                      on ? "bg-amber-400 shadow-[0_18px_30px_-18px_rgba(180,120,0,0.8)] lg:-translate-y-1" : "bg-amber-300/80"
                    }`}
                  >
                    <p className="font-display text-[1.0625rem] font-extrabold uppercase leading-tight tracking-[0.04em] text-royal-950 sm:text-[1.1875rem]">
                      {s.title}
                    </p>
                    <p className="font-display text-[0.9375rem] font-bold uppercase text-royal-950/85">({s.span})</p>
                    <p className="mt-1 text-[0.875rem] text-royal-950/80">{s.line}</p>
                  </div>
                  <motion.span
                    aria-hidden="true"
                    animate={{ scale: on ? 1.12 : 1 }}
                    transition={{ duration: 0.5, ease: EASE }}
                    className={`grid h-14 w-14 shrink-0 place-items-center rounded-full font-display text-[1.75rem] font-extrabold transition-colors duration-500 lg:my-5 lg:h-16 lg:w-16 lg:text-[2rem] ${
                      on ? "bg-ember-500 text-white" : "bg-amber-400 text-royal-950"
                    }`}
                  >
                    {i + 1}
                  </motion.span>
                </motion.li>
              );
            })}
          </ol>

          {/* every class */}
          <ul className="mt-10 grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:mt-12 lg:grid-cols-6 lg:gap-3">
            {classes.map((c, i) => {
              const on = c.stage === active;
              const Icon = CLASS_ICONS[c.cls] ?? BookOpen;
              return (
                <motion.li
                  key={c.cls}
                  initial={{ opacity: 0, scale: 0.85 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "0px 0px -8% 0px" }}
                  transition={{ duration: 0.5, ease: EASE, delay: 0.05 * i }}
                  onMouseEnter={() => hold(c.stage)}
                  className={`flex min-h-[7.5rem] flex-col items-center justify-center gap-1.5 px-2 py-4 text-center transition-[background-color,opacity,transform] duration-500 ${
                    on ? "bg-amber-400 opacity-100" : "bg-amber-300/70 opacity-75"
                  } hover:-translate-y-1`}
                >
                  <Icon aria-hidden="true" strokeWidth={1.6} className="h-6 w-6 text-royal-900" />
                  <p className="text-[0.8125rem] font-bold uppercase text-royal-950 underline decoration-royal-950/50 underline-offset-2">{c.cls}</p>
                  <p className="text-[0.875rem] leading-snug text-royal-950/85">{c.focus}</p>
                </motion.li>
              );
            })}
          </ul>
        </div>

        {/* the classrooms, the trip and the team */}
        <ul className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-5 lg:mt-12">
          {photos.map((p, i) => (
            <motion.li key={p.id} className={`relative ${i === 3 ? "col-span-2 sm:col-span-1" : ""}`} {...enter(0.06 * i)}>
              <Zoom
                photo={p}
                onView={onView}
                sizes="(min-width: 640px) 20vw, 50vw"
                className="aspect-[4/3] w-full rounded-[1.25rem] border-4 border-white shadow-[0_14px_28px_-18px_rgba(20,34,68,0.6)]"
              />
              <span className="pointer-events-none absolute bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-sm bg-royal-950 px-2.5 py-1 font-display text-[0.6875rem] font-bold uppercase tracking-[0.06em] text-amber-400">
                {p.caption}
              </span>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* p.5 — right guidance, bright future                                 */
/* ------------------------------------------------------------------ */

/**
 * Three round photographs down a zigzag line — career guidance, panel
 * discussions, parent counselling — the line drawing itself with the
 * scroll, each photograph with its title and a sentence opposite.
 */
export function SchoolGuidance({ items }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 60%"] });

  return (
    <section className="on-dark section relative isolate overflow-hidden bg-royal-900 text-white">
      <span aria-hidden="true" className="absolute inset-0 -z-10 bg-[radial-gradient(60%_40%_at_50%_0%,rgba(58,85,159,0.55),transparent_70%)]" />
      <Swoosh />
      <Swoosh flip />
      <div className="shell">
        <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:justify-center sm:text-left">
          <motion.span
            aria-hidden="true"
            initial={{ rotate: -14, opacity: 0 }}
            whileInView={{ rotate: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 120, damping: 10 }}
          >
            <Signpost className="h-16 w-16 text-white sm:h-20 sm:w-20" strokeWidth={1.3} />
          </motion.span>
          <div>
            <TwoTone a="Guidance," b="Right" dark bFirst />
            <TwoTone a="Bright" b="Future" as="p" dark />
          </div>
        </div>
        <motion.p className="mt-4 text-center font-display text-[1rem] font-semibold italic text-amber-300 sm:text-[1.1875rem]" {...enter(0.2)}>
          Panel discussions, parent connect and career counselling for holistic growth
        </motion.p>

        <div ref={ref} className="relative mx-auto mt-14 max-w-5xl">
          <svg aria-hidden="true" viewBox="0 0 100 100" preserveAspectRatio="none" className="pointer-events-none absolute inset-0 hidden h-full w-full md:block">
            <path d="M28 16 L72 50 L28 84" fill="none" stroke="rgb(255 255 255 / 0.12)" strokeWidth="6" vectorEffect="non-scaling-stroke" />
            <motion.path d="M28 16 L72 50 L28 84" fill="none" stroke="var(--color-amber-400)" strokeWidth="6" vectorEffect="non-scaling-stroke" style={{ pathLength: scrollYProgress }} />
          </svg>

          <ol className="relative space-y-12 md:space-y-2">
            {items.map((g, i) => {
              const right = i % 2 === 1;
              return (
                <li key={g.title} className="grid items-center gap-6 md:grid-cols-2 md:gap-10">
                  <motion.div
                    className={`mx-auto ${i === 1 ? "w-64 sm:w-80" : "w-56 sm:w-64"} ${right ? "md:order-2" : ""}`}
                    initial={{ opacity: 0, scale: 0.7 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "0px 0px -15% 0px" }}
                    transition={{ type: "spring", stiffness: 140, damping: 16 }}
                  >
                    <div className="group aspect-square overflow-hidden rounded-full border-[10px] border-amber-400 bg-royal-950">
                      <img
                        src={g.photo.src}
                        alt={g.photo.alt}
                        loading="lazy"
                        decoding="async"
                        style={{ objectPosition: g.photo.focus }}
                        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.07]"
                      />
                    </div>
                  </motion.div>
                  <motion.div
                    className={`text-center md:text-left ${right ? "md:order-1" : ""}`}
                    initial={{ opacity: 0, x: right ? -30 : 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "0px 0px -15% 0px" }}
                    transition={{ duration: 0.7, ease: EASE, delay: 0.15 }}
                  >
                    <h3 className="font-display text-[2.25rem] font-bold leading-[1.02] tracking-[-0.02em] text-amber-400 sm:text-[3rem]">{g.title}</h3>
                    <p className="mx-auto mt-3 max-w-md text-[0.875rem] font-medium uppercase leading-relaxed tracking-[0.03em] text-white/80 md:mx-0">
                      {g.body}
                    </p>
                  </motion.div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* p.6 — robotics & coding                                             */
/* ------------------------------------------------------------------ */

/* Each print's resting slant, by index. */
const TILT = [-6, 4, -3, 6];

/**
 * The exhibition as a photograph across the top with the title over it,
 * and the school's robot waving from its corner — bobbing gently, the way
 * the prospectus's mascot leans in. Below, "Future innovators" with its
 * three points, and the exhibition prints scattered like snapshots, each
 * straightening when pointed at.
 */
export function SchoolRobotics({ robot, expo, banner, points, photos, onView }) {
  return (
    <section className="on-dark relative isolate overflow-hidden bg-royal-950 text-white">
      {/* the exhibition, across the top */}
      <div className="relative h-[16rem] sm:h-[22rem]">
        <img
          src={banner.src}
          srcSet={banner.srcSet}
          sizes="100vw"
          alt={banner.alt}
          loading="lazy"
          decoding="async"
          style={{ objectPosition: banner.focus }}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-transparent via-royal-950/20 to-royal-950" />
        <div className="shell relative flex h-full items-center">
          <motion.div
            className="bg-royal-950/80 px-5 py-4 backdrop-blur-sm sm:px-8 sm:py-6"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: EASE }}
          >
            <h2 className="font-display text-[2.25rem] font-extrabold uppercase leading-[0.95] tracking-[-0.02em] sm:text-[3.5rem]">
              <span className="block text-amber-400">Robotics</span>
              <span className="block">&amp; Coding</span>
            </h2>
          </motion.div>
        </div>
        <motion.img
          src={robot}
          alt=""
          aria-hidden="true"
          loading="lazy"
          decoding="async"
          className="absolute bottom-[-3.5rem] right-3 z-[2] w-32 drop-shadow-[0_20px_30px_rgba(0,0,0,0.45)] sm:right-10 sm:w-48 lg:right-[12%] lg:w-56"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: [0, -10, 0] }}
          viewport={{ once: true }}
          transition={{ opacity: { duration: 0.6 }, y: { duration: 4, repeat: Infinity, ease: "easeInOut" } }}
        />
      </div>

      <div className="shell grid gap-12 pb-16 pt-14 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:pb-24 lg:pt-20">
        <div>
          <motion.p className="font-display text-[2.25rem] font-extrabold uppercase leading-none tracking-[-0.02em] text-amber-400 sm:text-[3.25rem]" {...enter(0)}>
            Future innovators
          </motion.p>
          <motion.p className="mt-4 max-w-sm text-[1.125rem] font-medium uppercase leading-snug tracking-[0.04em] text-white/85 sm:text-[1.3125rem]" {...enter(0.1)}>
            Learning today for tomorrow&rsquo;s technology
          </motion.p>
          <ul className="mt-7 space-y-3.5">
            {points.map((p, i) => (
              <motion.li key={p} className="flex items-center gap-3 text-[1rem] font-bold tracking-[0.02em] sm:text-[1.0625rem]" {...enter(0.2 + i * 0.08)}>
                <Bullet dark />
                {p}
              </motion.li>
            ))}
          </ul>
          <motion.p className="mt-8 border-l-2 border-amber-400 pl-4 text-[0.875rem] leading-relaxed text-white/65" {...enter(0.4)}>
            {expo}
          </motion.p>
        </div>

        {/* the exhibition prints, scattered */}
        <ul className="grid grid-cols-2 gap-4 sm:gap-6">
          {photos.slice(0, 4).map((p, i) => (
            <motion.li
              key={p.id}
              className={i % 2 ? "mt-8" : ""}
              initial={{ opacity: 0, y: -50, rotate: TILT[i] * 3 }}
              whileInView={{ opacity: 1, y: 0, rotate: TILT[i] }}
              whileHover={{ rotate: 0, scale: 1.05, zIndex: 2 }}
              viewport={{ once: true, margin: "0px 0px -10% 0px" }}
              transition={{ type: "spring", stiffness: 160, damping: 16, delay: i * 0.1 }}
            >
              <div className={`bg-white p-2 shadow-[0_18px_34px_-14px_rgba(0,0,0,0.6)] ${i === 2 ? "ring-4 ring-amber-400" : ""}`}>
                <Zoom photo={p} onView={onView} label={p.caption ?? p.alt} sizes="(min-width: 1024px) 22vw, 45vw" className="aspect-[4/3] w-full" />
              </div>
            </motion.li>
          ))}
        </ul>
      </div>

    </section>
  );
}

/* ------------------------------------------------------------------ */
/* p.9 — labs, tech & innovation                                       */
/* ------------------------------------------------------------------ */

const RIBBON = "polygon(0 50%, 10px 0, calc(100% - 10px) 0, 100% 50%, calc(100% - 10px) 100%, 10px 100%)";

/**
 * Nine labs as rounded white-framed photographs, each over an amber ribbon
 * with its name — a slow highlight passing from ribbon to ribbon — and the
 * prospectus's cut-out students along the foot with a little science
 * scribbled round them.
 */
export function SchoolLabs({ labs, cutouts, onView }) {
  const [ref, active, hold, release] = useCycle(labs.length, 1800);

  return (
    <section className="section relative overflow-hidden bg-paper pb-0">
      <Swoosh />
      <Swoosh flip />
      <div className="shell">
        <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:justify-center sm:text-left">
          <span aria-hidden="true" className="flex">
            <FlaskConical className="h-16 w-16 text-royal-800 sm:h-20 sm:w-20" strokeWidth={1.3} />
            <motion.span
              className="inline-flex origin-bottom"
              animate={{ rotate: [0, 8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <TestTube className="-ml-3 h-16 w-16 text-royal-800 sm:h-20 sm:w-20" strokeWidth={1.3} />
            </motion.span>
          </span>
          <div>
            <TwoTone a="Labs, Tech &" b="Innovation" />
          </div>
        </div>
        <motion.p className="mt-4 text-center font-display text-[1rem] font-semibold italic text-ember-600 sm:text-[1.1875rem]" {...enter(0.2)}>
          Igniting curiosity through technology &amp; hands-on learning
        </motion.p>
        <Rule className="mx-auto mt-5 w-36 bg-ink/70" />

        <ul ref={ref} onMouseLeave={release} className="section-body grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-8 sm:gap-y-10">
          {labs.map((lab, i) => {
            const on = i === active;
            return (
              <motion.li key={lab.id} onMouseEnter={() => hold(i)} {...enter(0.05 * (i % 3))}>
                <Zoom
                  photo={lab}
                  onView={onView}
                  sizes="(min-width: 640px) 30vw, 48vw"
                  className={`aspect-[16/10] w-full rounded-[1.25rem] border-4 shadow-[0_14px_28px_-18px_rgba(20,34,68,0.6)] transition-colors duration-500 ${on ? "border-amber-400" : "border-white"}`}
                />
                <p
                  className={`relative z-[1] mx-auto -mt-3 w-fit px-6 py-1.5 font-display text-[0.75rem] font-extrabold uppercase tracking-[0.06em] transition-[background-color,color,transform] duration-500 sm:text-[0.875rem] ${
                    on ? "scale-105 bg-ember-500 text-white" : "bg-amber-400 text-royal-950"
                  }`}
                  style={{ clipPath: RIBBON }}
                >
                  {lab.caption}
                </p>
              </motion.li>
            );
          })}
        </ul>
      </div>

      {/* the cut-out students, with a little science round them */}
      <div className="relative mt-14 overflow-hidden">
        <span aria-hidden="true" className="absolute left-[18%] top-2 hidden font-display text-[1.5rem] italic text-ink-mute sm:block">
          E=mc<sup>2</sup>
        </span>
        <span aria-hidden="true" className="absolute right-[16%] top-4 hidden text-[2rem] text-ink-mute sm:block">⚛</span>
        <div className="shell flex items-end justify-center gap-2 sm:gap-6">
          {cutouts.map((c, i) => (
            <motion.img
              key={c.src}
              src={c.src}
              alt={c.alt}
              loading="lazy"
              decoding="async"
              className="w-[23%] max-w-[13rem]"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.1 * i }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
