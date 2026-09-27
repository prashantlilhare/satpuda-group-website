import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { FAR, MID } from "./ridgePaths";

/* Page-hero motifs.
 *
 * Every interior page shares one masthead, so most pages carry their own
 * small drawing on the right-hand side of it — something taken from what
 * that page is about, so that no two mastheads open the same way:
 *
 *   ridge      About          the Satpuda range, traced along the foot
 *   blueprint  Engineering    a drafting grid with a current running a trace
 *   gears      ITI            two meshed gears, turned by the page's scroll
 *   chalk      Teacher ed.    a chalk underline, ring and tick, written in
 *   shapes     School         a handful of classroom shapes, floating
 *
 * All are decorative (aria-hidden) and desktop-only; the masthead is
 * narrow enough on a phone that the copy needs the whole width. Reduced
 * motion is handled by the layout's MotionConfig for Motion animations and
 * by the stylesheet for the CSS ones (`.motif-*`).
 */

const EASE = [0.16, 1, 0.3, 1];
const draw = (delay = 0, duration = 1.4) => ({
  initial: { pathLength: 0, opacity: 0 },
  animate: { pathLength: 1, opacity: 1 },
  transition: {
    pathLength: { duration, ease: EASE, delay },
    opacity: { duration: 0.2, delay },
  },
});

const BOX =
  "pointer-events-none absolute right-[4%] top-1/2 hidden h-[20rem] w-[20rem] -translate-y-1/2 lg:block xl:right-[7%]";

/* --- About ------------------------------------------------------------ */

function Ridge() {
  return (
    <svg
      viewBox="0 0 1440 120"
      preserveAspectRatio="none"
      className="pointer-events-none absolute inset-x-0 bottom-0 h-[clamp(3rem,7vw,6rem)] w-full"
    >
      <motion.path d={FAR} fill="none" stroke="rgb(255 255 255 / 0.22)" strokeWidth="1.5" vectorEffect="non-scaling-stroke" {...draw(0.4, 2.4)} />
      <motion.path d={MID} fill="none" stroke="var(--color-ember-400)" strokeOpacity="0.8" strokeWidth="1.5" vectorEffect="non-scaling-stroke" {...draw(0.9, 2.4)} />
    </svg>
  );
}

/* --- Engineering ------------------------------------------------------ */

const TRACE = "M20 260 H110 V180 H200 V100 H290 V40";

function Blueprint() {
  const lines = Array.from({ length: 9 }, (_, i) => 20 + i * 35);
  return (
    <div className={BOX}>
      <svg viewBox="0 0 320 320" className="absolute inset-0 h-full w-full">
        {lines.map((p, i) => (
          <g key={p}>
            <motion.path d={`M${p} 0 V320`} stroke="rgb(255 255 255 / 0.09)" {...draw(0.1 + i * 0.05, 1)} />
            <motion.path d={`M0 ${p} H320`} stroke="rgb(255 255 255 / 0.09)" {...draw(0.15 + i * 0.05, 1)} />
          </g>
        ))}
        <motion.circle cx="200" cy="180" r="58" fill="none" stroke="rgb(255 255 255 / 0.28)" strokeDasharray="4 5" {...draw(0.8, 1.6)} />
        <motion.path d="M142 180 H258 M200 122 V238" stroke="rgb(255 255 255 / 0.2)" {...draw(1, 1)} />
        <motion.path d={TRACE} fill="none" stroke="var(--color-ember-400)" strokeWidth="2" {...draw(1.1, 1.6)} />
        {[[20, 260], [110, 180], [200, 100], [290, 40]].map(([x, y], i) => (
          <motion.circle
            key={x}
            cx={x}
            cy={y}
            r="5"
            fill="var(--color-royal-900)"
            stroke="var(--color-ember-300)"
            strokeWidth="2"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1.2 + i * 0.3, type: "spring", stiffness: 400, damping: 14 }}
          />
        ))}
      </svg>
      {/* a pulse of current running the trace */}
      <span className="motif-current" style={{ offsetPath: `path("${TRACE}")` }} />
    </div>
  );
}

/* --- ITI -------------------------------------------------------------- */

function gearPath(teeth, outer, inner) {
  const step = (Math.PI * 2) / teeth;
  const pt = (r, a) => `${(r * Math.cos(a)).toFixed(2)} ${(r * Math.sin(a)).toFixed(2)}`;
  let d = "";
  for (let i = 0; i < teeth; i++) {
    const a = i * step;
    d += `${i ? "L" : "M"}${pt(inner, a)} L${pt(outer, a + step * 0.18)} L${pt(outer, a + step * 0.5)} L${pt(inner, a + step * 0.68)} `;
  }
  return `${d}Z`;
}

const GEAR_BIG = gearPath(14, 100, 82);
const GEAR_SMALL = gearPath(9, 66, 50);

function Gears() {
  /* Each gear is its own small HTML layer turned by a CSS animation, so
     the browser spins it on the compositor; the small one turns faster
     and the other way, as meshed gears do. */
  return (
    <div className={BOX}>
      <motion.div
        className="motif-spin absolute left-[5%] top-[22%] h-[65%] w-[65%]"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, ease: EASE, delay: 0.3 }}
      >
        <svg viewBox="-104 -104 208 208" className="h-full w-full">
          <path d={GEAR_BIG} fill="rgb(255 255 255 / 0.06)" stroke="rgb(255 255 255 / 0.3)" strokeWidth="1.5" />
          <circle r="26" fill="none" stroke="rgb(255 255 255 / 0.3)" strokeWidth="1.5" />
          <circle r="8" fill="var(--color-ember-500)" />
        </svg>
      </motion.div>
      <motion.div
        className="motif-spin motif-spin-reverse absolute left-[54%] top-[4%] h-[43%] w-[43%]"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, ease: EASE, delay: 0.5 }}
      >
        <svg viewBox="-69 -69 138 138" className="h-full w-full">
          <path d={GEAR_SMALL} fill="rgb(233 112 95 / 0.14)" stroke="var(--color-ember-400)" strokeWidth="1.5" />
          <circle r="16" fill="none" stroke="var(--color-ember-400)" strokeWidth="1.5" />
        </svg>
      </motion.div>
    </div>
  );
}

/* --- Teacher education ------------------------------------------------ */

function Chalk() {
  return (
    <div className={BOX}>
      <svg viewBox="0 0 320 320" className="h-full w-full overflow-visible">
        <defs>
          {/* roughens the strokes into chalk on a board */}
          <filter id="motif-chalk">
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" result="n" />
            <feDisplacementMap in="SourceGraphic" in2="n" scale="3" />
          </filter>
        </defs>
        <g filter="url(#motif-chalk)" fill="none" strokeLinecap="round" strokeLinejoin="round">
          {/* A, B, C written in */}
          <motion.path d="M40 150 L66 70 L92 150 M50 120 H82" stroke="rgb(255 255 255 / 0.7)" strokeWidth="5" {...draw(0.4, 1)} />
          <motion.path d="M118 150 V72 C160 68 162 108 120 110 C170 110 168 154 118 150" stroke="rgb(255 255 255 / 0.7)" strokeWidth="5" {...draw(1.1, 1)} />
          <motion.path d="M238 84 C210 62 184 88 186 112 C188 144 222 158 244 136" stroke="rgb(255 255 255 / 0.7)" strokeWidth="5" {...draw(1.8, 0.9)} />
          {/* the teacher's ring round it, and a tick */}
          <motion.path d="M24 110 C20 40 250 30 282 96 C306 150 250 196 150 192 C60 188 26 160 30 120" stroke="var(--color-ember-400)" strokeWidth="3.5" {...draw(2.6, 1.3)} />
          <motion.path d="M190 250 L214 276 L276 206" stroke="var(--color-ember-400)" strokeWidth="6" {...draw(3.6, 0.6)} />
          <motion.path d="M40 232 C90 222 130 238 160 228" stroke="rgb(255 255 255 / 0.45)" strokeWidth="4" {...draw(3.2, 0.7)} />
        </g>
      </svg>
    </div>
  );
}

/* --- School ----------------------------------------------------------- */

const SHAPES = [
  { d: "M0 -28 L26 20 L-26 20 Z", x: 70, y: 70, fill: "var(--color-ember-400)", dur: 5.5, spin: 18 },
  { d: "M-22 -22 H22 V22 H-22 Z", x: 230, y: 60, fill: "rgb(255 255 255 / 0.85)", dur: 6.5, spin: -14 },
  { circle: 24, x: 250, y: 220, fill: "var(--color-royal-300)", dur: 5, spin: 0 },
  { d: "M-6 -24 H6 V-6 H24 V6 H6 V24 H-6 V6 H-24 V-6 H-6 Z", x: 90, y: 240, fill: "rgb(255 255 255 / 0.55)", dur: 7, spin: 30 },
  { d: "M-34 0 C-24 -18 -12 18 0 0 S24 -18 34 0", x: 160, y: 150, stroke: "var(--color-ember-300)", dur: 6, spin: -8 },
  { circle: 9, x: 170, y: 40, fill: "var(--color-ember-500)", dur: 4.5, spin: 0 },
];

function Shapes() {
  /* Each shape floats on its own HTML layer with a CSS animation —
     compositor-only, so the bobbing costs nothing while the page scrolls. */
  return (
    <div className={BOX}>
      {SHAPES.map((s, i) => (
        <motion.div
          key={i}
          className="absolute h-20 w-20 -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${(s.x / 320) * 100}%`, top: `${(s.y / 320) * 100}%` }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 + i * 0.12, type: "spring", stiffness: 260, damping: 12 }}
        >
          <div
            className="motif-float h-full w-full"
            style={{ "--float-dur": `${s.dur}s`, "--float-spin": `${s.spin}deg` }}
          >
            <svg viewBox="-40 -40 80 80" className="h-full w-full overflow-visible">
              {s.circle ? (
                <circle r={s.circle} fill={s.fill} />
              ) : s.stroke ? (
                <path d={s.d} fill="none" stroke={s.stroke} strokeWidth="5" strokeLinecap="round" />
              ) : (
                <path d={s.d} fill={s.fill} />
              )}
            </svg>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

/* ---------------------------------------------------------------------- */

const MOTIFS = {
  ridge: Ridge,
  blueprint: Blueprint,
  gears: Gears,
  chalk: Chalk,
  shapes: Shapes,
};

/* The looping motifs (gears, floating shapes, current) are paused
   the moment the masthead leaves the screen — `.motif-host[data-paused]`
   in the stylesheet — so nothing keeps animating under the page while it
   is being scrolled. */
export function HeroMotif({ name }) {
  const ref = useRef(null);
  const inView = useInView(ref);
  const Motif = MOTIFS[name];
  if (!Motif) return null;
  return (
    <div
      ref={ref}
      aria-hidden="true"
      data-paused={!inView || undefined}
      className="motif-host pointer-events-none absolute inset-0"
    >
      <Motif />
    </div>
  );
}
