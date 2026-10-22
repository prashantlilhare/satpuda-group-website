import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll } from "motion/react";
import { AtSign, ChevronRight, Flame, Globe, HandHeart, Lightbulb, MapPin, Phone, Presentation, Scale, Search, Sparkles } from "lucide-react";
import { HeroRidge } from "../ui/Ridgeline";
import { useCycle } from "../../hooks/useCycle";
import { Bullet, Rule, Swoosh, TwoTone } from "./parts";
import { EASE, enter } from "./motion";

/* ------------------------------------------------------------------ */
/* p.1 — the cover                                                     */
/* ------------------------------------------------------------------ */

/**
 * The prospectus cover as the page masthead: "Shaping Futures" over the
 * school's name in tall capitals and the CBSE affiliation, set on the sky
 * of the building photograph behind it, the building standing on a range
 * of hills. The whole cover fits the first screen.
 */
export function SchoolCover({ tagline, affiliation, building, phones, website, instagram, address, map }) {
  const ref = useRef(null);

  return (
    <section ref={ref} className="cover on-dark relative isolate h-[calc(100svh-var(--nav-h))] min-h-[34rem] overflow-hidden bg-royal-950 pt-6 text-white sm:pt-8">
      {/* The building as the backdrop. The photograph keeps its own shape
          and is placed with container units (see `.cover-building`) so the
          whole building sits just above the hills, under the sky the
          heading is set on — never cropped at the sides. */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 -z-10"
        initial={{ opacity: 0, scale: 1.06 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.6, ease: EASE, delay: 0.1 }}
      >
        <img
          src={building.src}
          alt=""
          loading="eager"
          fetchPriority="high"
          decoding="async"
          className="cover-building absolute inset-x-0 h-auto w-full max-w-none"
        />
        {/* the sky darkened under the heading, clearing over the building */}
        <span className="absolute inset-0 bg-[linear-gradient(to_bottom,rgb(12_21_41/0.92)_0%,rgb(12_21_41/0.7)_30%,rgb(12_21_41/0.15)_58%,transparent_75%)]" />
      </motion.div>
      <Swoosh flip />

      <div className="shell relative">
        <motion.nav aria-label="Breadcrumb" {...enter(0.1, 0)}>
          <ol className="flex items-center gap-2 text-[0.8125rem] text-white/55">
            <li>
              <Link to="/" className="transition-colors hover:text-white">Home</Link>
            </li>
            <li aria-hidden="true"><ChevronRight className="h-3.5 w-3.5 text-white/30" /></li>
            <li>Institute</li>
            <li aria-hidden="true"><ChevronRight className="h-3.5 w-3.5 text-white/30" /></li>
            <li className="text-white" aria-current="page">School</li>
          </ol>
        </motion.nav>

        <div className="mt-4 text-center sm:mt-2">
          <motion.p
            className="font-display text-[1.75rem] font-semibold italic tracking-[-0.01em] text-amber-400 sm:text-[min(2.5rem,4.5vh)]"
            initial={{ opacity: 0, y: 12, rotate: -2 }}
            animate={{ opacity: 1, y: 0, rotate: -2 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
          >
            {tagline}
          </motion.p>
          <h1 className="mt-2 font-display font-extrabold uppercase leading-[0.92] tracking-[-0.035em] [text-shadow:0_4px_24px_rgb(12_21_41/0.5)]">
            {[
              ["Satpuda Valley", "text-amber-400 text-[2.75rem] sm:text-[min(4.75rem,8vh)] lg:text-[min(6.25rem,9vh)]"],
              ["Public School", "text-white text-[2.5rem] sm:text-[min(4.25rem,7vh)] lg:text-[min(5.5rem,8vh)]"],
            ].map(([line, cls], i) => (
              <span key={line} className="block overflow-hidden pb-1">
                <motion.span
                  className={`block ${cls}`}
                  initial={{ y: "105%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.9, ease: EASE, delay: 0.3 + i * 0.14 }}
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>
          <motion.p
            className="mt-3 flex flex-wrap justify-center gap-x-8 gap-y-1 text-[0.9375rem] font-semibold italic text-amber-300 sm:text-[1.0625rem]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.75 }}
          >
            <span>Affiliated to CBSE</span>
            <span>Affiliation No. {affiliation}</span>
          </motion.p>

          {/* the cover's contact lines */}
          <motion.ul
            className="mt-5 flex flex-wrap justify-center gap-2 text-[0.8125rem] sm:text-[0.875rem]"
            initial="off"
            animate="on"
            transition={{ staggerChildren: 0.08, delayChildren: 1 }}
          >
            {[
              { icon: Phone, node: phones.map((p, i) => (
                <a key={p.href} href={p.href} className="font-semibold text-white transition-colors hover:text-amber-300">
                  {i > 0 && <span className="text-white/40"> / </span>}
                  {p.label}
                </a>
              )) },
              { icon: Globe, node: <a href={website.href} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-amber-300">{website.label}</a> },
              { icon: AtSign, wide: true, node: <a href={instagram.href} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-amber-300">{instagram.label}</a> },
              { icon: MapPin, wide: true, node: <a href={map} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-amber-300">{address}</a> },
            ].map(({ icon: Icon, wide, node }, i) => (
              <motion.li
                key={i}
                className={`items-center gap-2.5 rounded-full border border-white/15 bg-white/[0.06] px-3.5 py-1.5 text-white/85 backdrop-blur-sm ${wide ? "hidden sm:flex" : "flex"}`}
                variants={{ off: { opacity: 0, y: 10 }, on: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } } }}
              >
                <Icon aria-hidden="true" className="h-4 w-4 shrink-0 text-amber-400" strokeWidth={2} />
                <span>{node}</span>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </div>

      <HeroRidge target={ref} fill="var(--color-royal-900)" />
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* p.2 — words of wisdom, vision, mission & values                     */
/* ------------------------------------------------------------------ */

const VALUE_ICONS = { Respect: HandHeart, Curiosity: Search, Integrity: Scale, Resilience: Flame };
const HEX = "polygon(50% 0, 100% 25%, 100% 75%, 50% 100%, 0 75%, 0 25%)";

/** One hexagonal photograph of the honeycomb; lit when its value is. */
function Hex({ photo, lit, delay, onEnter }) {
  return (
    <motion.div
      className="relative aspect-[0.866] w-[46%]"
      initial={{ opacity: 0, scale: 0.6 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ type: "spring", stiffness: 160, damping: 18, delay }}
      onMouseEnter={onEnter}
    >
      <span
        aria-hidden="true"
        className={`absolute inset-0 transition-colors duration-700 ${lit ? "bg-amber-400" : "bg-white"}`}
        style={{ clipPath: HEX }}
      />
      <img
        src={photo.src}
        alt={photo.alt}
        loading="lazy"
        decoding="async"
        style={{ clipPath: HEX, objectPosition: photo.focus }}
        className={`absolute inset-[4%] h-[92%] w-[92%] object-cover transition-[filter] duration-700 ${lit === false ? "saturate-[0.65]" : ""}`}
      />
    </motion.div>
  );
}

/** A value beside the honeycomb: amber icon tile, title, one line. */
function Value({ v, lit, onEnter, align }) {
  const Icon = VALUE_ICONS[v.title] ?? Sparkles;
  return (
    <div
      onMouseEnter={onEnter}
      className={`flex gap-4 ${align === "right" ? "lg:flex-row-reverse lg:text-right" : ""}`}
    >
      <motion.span
        aria-hidden="true"
        animate={{ rotate: lit ? -6 : 0, scale: lit ? 1.08 : 1 }}
        transition={{ duration: 0.5, ease: EASE }}
        className={`grid h-12 w-12 shrink-0 place-items-center rounded-sm transition-colors duration-500 ${lit ? "bg-amber-400 text-royal-950" : "bg-white/10 text-amber-300"}`}
      >
        <Icon className="h-6 w-6" strokeWidth={1.8} />
      </motion.span>
      <span>
        <span className={`block font-display text-[1.375rem] font-extrabold uppercase tracking-[0.06em] transition-colors duration-500 ${lit ? "text-amber-300" : "text-white"}`}>
          {v.title}
        </span>
        <span className="mt-1 block max-w-[17rem] text-[0.9375rem] leading-snug text-white/70">{v.body}</span>
      </span>
    </div>
  );
}

/**
 * The principal's message on an amber card beside her round portrait, then
 * the vision and mission either side of a honeycomb of photographs, with the
 * four values around it. A slow highlight walks the four values — lighting
 * each one's icon and its hexagon — and pointing at one holds it.
 */
export function SchoolWisdom({ principal, portrait, vision, mission, photo, values }) {
  const [ref, active, hold, release] = useCycle(values.length, 2800);

  return (
    <section className="on-dark relative isolate overflow-hidden bg-royal-900 pb-24 pt-16 text-white sm:pb-28 sm:pt-20">
      <span aria-hidden="true" className="absolute inset-0 -z-10 bg-[radial-gradient(60%_50%_at_100%_100%,rgba(58,85,159,0.5),transparent_70%)]" />
      <div className="shell">
        {/* ---------------- principal's message ---------------- */}
        <div className="text-right">
          <TwoTone a="Words of" b="Wisdom" dark />
          <Rule className="ml-auto mt-4 w-full max-w-md bg-white/80" />
          <motion.p
            className="mt-4 font-display text-[1.375rem] font-bold uppercase tracking-[0.04em] text-white sm:text-[1.875rem]"
            {...enter(0.2)}
          >
            Principal&rsquo;s message
          </motion.p>
        </div>

        <div className="mt-10 grid items-center gap-8 lg:grid-cols-[18rem_1fr] lg:gap-0">
          <motion.div
            className="relative z-[1] mx-auto w-56 sm:w-64 lg:w-72"
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: EASE }}
          >
            {/* three small stars, twinkling in turn */}
            {[["-top-6 right-6", 0], ["-top-1 right-0", 0.6], ["top-4 right-12", 1.2]].map(([pos, d]) => (
              <motion.span
                key={pos}
                aria-hidden="true"
                className={`absolute ${pos} text-[1.25rem] text-white/80`}
                animate={{ opacity: [0.3, 1, 0.3], scale: [0.85, 1.1, 0.85] }}
                transition={{ duration: 2.4, repeat: Infinity, delay: d }}
              >
                ✦
              </motion.span>
            ))}
            <img
              src={portrait.src}
              alt={portrait.alt}
              loading="lazy"
              decoding="async"
              className="aspect-square w-full rounded-full object-cover ring-[10px] ring-white/95"
            />
          </motion.div>

          <motion.div
            className="relative rounded-sm border-[6px] border-white/90 bg-amber-400 p-6 text-royal-950 sm:p-8 lg:-ml-10 lg:rounded-l-[4rem] lg:pl-20"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "0px 0px -10% 0px" }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.15 }}
          >
            <p className="text-[0.9875rem] leading-[1.7] sm:text-[1.0625rem]">{principal.message}</p>
            <p className="mt-5 font-display text-[1.75rem] font-extrabold leading-none tracking-[-0.02em] text-royal-800 sm:text-[2.125rem]">
              {principal.name}
            </p>
            <p className="mt-1.5 text-[0.875rem] font-semibold text-royal-900/80">{principal.qualifications}</p>
          </motion.div>
        </div>

        {/* ---------------- vision, mission & values ---------------- */}
        <div
          ref={ref}
          onMouseLeave={release}
          className="mt-20 grid items-center gap-12 lg:mt-24 lg:grid-cols-[1fr_minmax(20rem,26rem)_1fr] lg:gap-10"
        >
          {/* left: vision, respect, integrity */}
          <div className="order-2 space-y-10 lg:order-1 lg:text-right">
            <motion.div {...enter(0)}>
              <p className="font-display text-[2.5rem] font-extrabold uppercase leading-none tracking-[-0.02em] sm:text-[3rem]">Vision</p>
              <p className="mt-2 font-display text-[0.9375rem] font-semibold italic text-amber-300">{vision.line}</p>
              <p className="mt-3 text-[1rem] leading-relaxed text-white/80 lg:ml-auto lg:max-w-sm">{vision.body}</p>
            </motion.div>
            {[0, 2].map((i) => (
              <motion.div key={values[i].title} {...enter(0.1 + i * 0.05)} className="lg:flex lg:justify-end">
                <Value v={values[i]} lit={active === i} onEnter={() => hold(i)} align="right" />
              </motion.div>
            ))}
          </div>

          {/* the honeycomb: two, one, two */}
          <div className="order-1 mx-auto w-full max-w-[26rem] lg:order-2" aria-hidden="true">
            <div className="flex justify-between">
              <Hex photo={values[0].photo} lit={active === 0} delay={0.1} onEnter={() => hold(0)} />
              <Hex photo={values[1].photo} lit={active === 1} delay={0.2} onEnter={() => hold(1)} />
            </div>
            <div className="-mt-[10%] flex justify-center">
              <Hex photo={photo} delay={0} />
            </div>
            <div className="-mt-[10%] flex justify-between">
              <Hex photo={values[2].photo} lit={active === 2} delay={0.3} onEnter={() => hold(2)} />
              <Hex photo={values[3].photo} lit={active === 3} delay={0.4} onEnter={() => hold(3)} />
            </div>
          </div>

          {/* right: mission, curiosity, resilience */}
          <div className="order-3 space-y-10">
            <motion.div {...enter(0.1)}>
              <p className="font-display text-[2.5rem] font-extrabold uppercase leading-none tracking-[-0.02em] sm:text-[3rem]">Mission</p>
              <p className="mt-2 font-display text-[0.9375rem] font-semibold italic text-amber-300">{mission.line}</p>
              <p className="mt-3 max-w-sm text-[1rem] leading-relaxed text-white/80">{mission.body}</p>
            </motion.div>
            {[1, 3].map((i) => (
              <motion.div key={values[i].title} {...enter(0.15 + i * 0.05)}>
                <Value v={values[i]} lit={active === i} onEnter={() => hold(i)} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* p.3 — the founding line & the school campus                         */
/* ------------------------------------------------------------------ */

/**
 * The founding line in quotation marks over the school ground, the band
 * ending on the hills; then the campus as three round photographs joined
 * by a line that draws itself down the page as it scrolls, each stop with
 * the facilities beside it.
 */
export function SchoolCampus({ about, aboutPhoto, line, stops }) {
  const bandRef = useRef(null);
  const pathRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: pathRef, offset: ["start 75%", "end 60%"] });

  return (
    <>
      <section ref={bandRef} className="on-dark relative isolate overflow-hidden bg-royal-900 pb-28 pt-20 text-white sm:pb-36 sm:pt-28">
        <img
          src={aboutPhoto.src}
          srcSet={aboutPhoto.srcSet}
          sizes="100vw"
          alt=""
          loading="lazy"
          decoding="async"
          style={{ objectPosition: aboutPhoto.focus }}
          className="absolute inset-0 -z-10 h-full w-full object-cover opacity-45"
        />
        <span aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-b from-royal-950/80 via-royal-950/60 to-royal-950/85" />
        <div className="shell relative">
          <motion.blockquote className="relative mx-auto max-w-4xl px-8 text-center sm:px-14" {...enter(0)}>
            <span aria-hidden="true" className="absolute -top-4 left-0 font-display text-[4rem] font-extrabold leading-none text-amber-400 sm:text-[5.5rem]">
              &ldquo;
            </span>
            <p className="font-display text-[1.0625rem] font-bold uppercase italic leading-[1.7] tracking-[0.02em] sm:text-[1.3125rem]">
              {about}
            </p>
            <span aria-hidden="true" className="absolute -bottom-12 right-0 font-display text-[4rem] font-extrabold leading-none text-amber-400 sm:text-[5.5rem]">
              &rdquo;
            </span>
          </motion.blockquote>
          <Rule className="mx-auto mt-8 w-40 bg-white/80" />
        </div>
        <HeroRidge target={bandRef} fill="var(--color-paper)" />
      </section>

      <section className="section relative overflow-hidden bg-paper">
        <Lightbulb aria-hidden="true" strokeWidth={1.2} className="absolute left-4 top-10 hidden h-20 w-20 text-amber-400 sm:block lg:left-10" />
        <Presentation aria-hidden="true" strokeWidth={1.2} className="absolute bottom-10 right-4 hidden h-20 w-20 text-amber-400 lg:block lg:right-10" />
        <div className="shell">
          <div className="text-center">
            <TwoTone a="School" b="Campus" />
            <motion.p className="mx-auto mt-4 max-w-md text-[0.8125rem] font-semibold uppercase tracking-[0.12em] text-ink-mute" {...enter(0.2)}>
              {line}
            </motion.p>
          </div>

          <div ref={pathRef} className="relative mx-auto mt-14 max-w-5xl">
            {/* the line joining the three circles, drawn by the scroll */}
            <svg
              aria-hidden="true"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              className="pointer-events-none absolute inset-0 hidden h-full w-full md:block"
            >
              <path d="M25 16 L75 50 L25 84" fill="none" stroke="var(--color-stone-line)" strokeWidth="6" vectorEffect="non-scaling-stroke" />
              <motion.path
                d="M25 16 L75 50 L25 84"
                fill="none"
                stroke="var(--color-amber-400)"
                strokeWidth="6"
                vectorEffect="non-scaling-stroke"
                style={{ pathLength: scrollYProgress }}
              />
            </svg>

            <ol className="relative space-y-10 md:space-y-4">
              {stops.map((s, i) => (
                <li key={s.photo.id} className={`grid items-center gap-6 md:grid-cols-2 md:gap-10 ${i % 2 ? "md:[&>*:first-child]:order-2" : ""}`}>
                  <motion.div
                    className="mx-auto w-52 sm:w-60 lg:w-64"
                    initial={{ opacity: 0, scale: 0.7 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "0px 0px -15% 0px" }}
                    transition={{ type: "spring", stiffness: 140, damping: 16 }}
                  >
                    <div className="group aspect-square overflow-hidden rounded-full border-[10px] border-amber-400 bg-white shadow-[0_24px_40px_-24px_rgba(20,34,68,0.55)]">
                      <img
                        src={s.photo.small ?? s.photo.src}
                        alt={s.photo.alt}
                        loading="lazy"
                        decoding="async"
                        style={{ objectPosition: s.photo.focus }}
                        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.07]"
                      />
                    </div>
                  </motion.div>
                  <ul className={`space-y-3.5 ${i % 2 ? "md:justify-self-end" : ""}`}>
                    {s.items.map((item, j) => (
                      <motion.li
                        key={item}
                        className="group flex items-center gap-3 font-display text-[1.0625rem] font-bold tracking-[0.01em] text-ink sm:text-[1.1875rem]"
                        initial={{ opacity: 0, x: i % 2 ? -20 : 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "0px 0px -10% 0px" }}
                        transition={{ duration: 0.6, ease: EASE, delay: 0.15 + j * 0.08 }}
                      >
                        <Bullet />
                        <span className="transition-colors duration-300 group-hover:text-ember-600">{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>
    </>
  );
}
