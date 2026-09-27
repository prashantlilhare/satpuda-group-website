import { useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { SectionHeading } from "../ui/Primitives";
import { campusExperience } from "../../data/about";
import campusAerial from "../../assets/images/campus/campus-aerial.webp";

const EASE_OUT = (t) => 1 - Math.pow(1 - t, 3);

/**
 * Maps a stretch of scroll progress onto a value, clamped at both ends.
 *
 * Written as a function transform on purpose: given a plain range, Motion
 * hands opacity to a native scroll timeline, which measures the section as
 * it crosses the viewport rather than across the pinned stretch — the
 * overlay would fade in and then straight back out while still pinned.
 */
function useRamp(progress, [a, b], [from, to], ease = (t) => t) {
  return useTransform(progress, (v) => {
    const t = Math.min(1, Math.max(0, (v - a) / (b - a)));
    return from + (to - from) * ease(t);
  });
}

/* Where each of the four smaller photographs sits around the centre frame,
   and which way it leaves when the frame opens. `dx` / `dy` are how far it
   travels, in viewport units. */
const TILES = [
  { pos: "left-[4%] top-[7%] w-[19%] aspect-[4/3]", dx: -34, dy: -26 },
  { pos: "right-[5%] top-[7%] w-[16%] aspect-square", dx: 34, dy: -24 },
  { pos: "left-[8%] bottom-[8%] w-[16%] aspect-square", dx: -30, dy: 26 },
  { pos: "right-[3%] bottom-[10%] w-[18%] aspect-[4/3]", dx: 32, dy: 24 },
];

/** The four campus experiences, laid over the opened photograph. */
function Experiences({ progress }) {
  return (
    <ul className="grid grid-cols-2 gap-x-6 gap-y-5 lg:grid-cols-4 lg:gap-x-10">
      {campusExperience.map((item, i) =>
        progress ? (
          <ArrivingExperience key={item.title} item={item} index={i} progress={progress} />
        ) : (
          <li key={item.title} className="relative pt-4">
            <ExperienceCopy item={item} />
          </li>
        ),
      )}
    </ul>
  );
}

function ExperienceCopy({ item, rule }) {
  return (
    <>
      <motion.span
        aria-hidden="true"
        style={rule ? { scaleX: rule } : undefined}
        className="absolute left-0 top-0 h-0.5 w-10 origin-left bg-ember-500"
      />
      <h3 className="font-display text-[1rem] font-semibold tracking-[-0.015em] text-white sm:text-[1.125rem]">
        {item.title}
      </h3>
      <p className="mt-2 hidden text-[0.875rem] leading-[1.6] text-white/72 sm:block">
        {item.body}
      </p>
    </>
  );
}

/* Each experience comes up in turn once the window has opened. */
function ArrivingExperience({ item, index, progress }) {
  const start = 0.66 + index * 0.05;
  const opacity = useRamp(progress, [start, start + 0.12], [0, 1]);
  const y = useRamp(progress, [start, start + 0.12], [24, 0], EASE_OUT);
  const rule = useRamp(progress, [start, start + 0.16], [0, 1]);

  return (
    <motion.li style={{ opacity, y }} className="relative pt-4">
      <ExperienceCopy item={item} rule={rule} />
    </motion.li>
  );
}

/* One of the ring of four, pushed out past the frame as it opens. */
function Tile({ tile, item, out, fade }) {
  const x = useTransform(out, (v) => `${v * tile.dx}vw`);
  const y = useTransform(out, (v) => `${v * tile.dy}vh`);

  return (
    <motion.div
      aria-hidden="true"
      className={`absolute hidden overflow-hidden bg-royal-900/10 sm:block ${tile.pos}`}
      style={{ opacity: fade, x, y }}
    >
      <img src={item.image} alt="" loading="lazy" decoding="async" className="h-full w-full object-cover" />
    </motion.div>
  );
}

/**
 * "Ten acres" — the campus opening up as it is scrolled into.
 *
 * The band pins under the header for a couple of screens' worth of scroll.
 * It starts as the aerial photograph in a small window, ringed by four
 * pictures of the campus in use; as the reader scrolls, the window opens to
 * fill the screen and the four pictures are pushed out past its edges. Once
 * it is open, the four experiences they showed are written across the
 * bottom of the photograph, one after another.
 *
 * The window is a clip-path, not a resize, so nothing reflows while it
 * opens; the ring's size lives in `--campus-cx` / `--campus-cy` in the
 * stylesheet so a phone can start with a wider window.
 *
 * Reduced motion gets the finished frame: the aerial photograph with the
 * four experiences across it, and no pinning.
 */
function CampusStage() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  const closed = useRamp(scrollYProgress, [0.08, 0.66], [1, 0], EASE_OUT);
  const clip = useMotionTemplate`inset(calc(var(--campus-cy) * ${closed}) calc(var(--campus-cx) * ${closed}))`;
  const scale = useRamp(scrollYProgress, [0.08, 0.66], [1.3, 1]);
  const out = useRamp(scrollYProgress, [0.08, 0.6], [0, 1], EASE_OUT);
  const tileFade = useRamp(scrollYProgress, [0.3, 0.6], [1, 0]);
  const shade = useRamp(scrollYProgress, [0.55, 0.78], [0, 1]);

  return (
    <div ref={ref} className="campus-track relative">
      <div className="campus-stage sticky overflow-hidden">
        {/* the window */}
        <motion.div className="absolute inset-0 bg-royal-950" style={{ clipPath: clip }}>
          <motion.img
            src={campusAerial}
            alt="An aerial view of the Satpuda campus at Manjhapur"
            loading="lazy"
            decoding="async"
            style={{ scale }}
            className="h-full w-full object-cover will-change-transform"
          />
          <motion.div
            aria-hidden="true"
            style={{ opacity: shade }}
            className="absolute inset-0 bg-[linear-gradient(to_top,rgba(12,21,41,0.94)_0%,rgba(12,21,41,0.7)_38%,rgba(12,21,41,0.1)_75%)]"
          />
        </motion.div>

        {/* the ring of four, pushed out as the window opens */}
        {TILES.map((tile, i) => (
          <Tile key={tile.pos} tile={tile} item={campusExperience[i]} out={out} fade={tileFade} />
        ))}

        {/* what the campus holds, written across the opened photograph */}
        <div className="shell absolute inset-x-0 bottom-0 pb-8 sm:pb-12">
          <Experiences progress={scrollYProgress} />
        </div>
      </div>
    </div>
  );
}

function CampusStill() {
  return (
    <div className="on-dark relative isolate flex min-h-[32rem] items-end overflow-hidden bg-royal-950">
      <img
        src={campusAerial}
        alt="An aerial view of the Satpuda campus at Manjhapur"
        loading="lazy"
        decoding="async"
        className="absolute inset-0 -z-10 h-full w-full object-cover"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(to_top,rgba(12,21,41,0.94)_0%,rgba(12,21,41,0.7)_45%,rgba(12,21,41,0.15)_85%)]"
      />
      <div className="shell w-full py-10">
        <Experiences />
      </div>
    </div>
  );
}

export function CampusSection() {
  const still = useReducedMotion();

  return (
    <section className="bg-paper pt-[var(--space-section)]">
      <div className="shell">
        <SectionHeading
          eyebrow="Campus & education experience"
          title="Ten acres that are actually used."
          lead="Laboratories, libraries, workshop sheds, a seminar hall and sports grounds — the parts of a campus that only matter if they are open and busy."
        />
      </div>

      <div className="on-dark mt-[var(--space-heading)]">
        {still ? <CampusStill /> : <CampusStage />}
      </div>
    </section>
  );
}
