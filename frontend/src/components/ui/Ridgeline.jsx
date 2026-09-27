import { motion, useScroll, useTransform } from "motion/react";
import { FAR, MID, NEAR } from "./ridgePaths";
import { useDashDraw } from "../../hooks/useDashDraw";

const CLOSE = " V120 H0 Z";
const EASE = [0.16, 1, 0.3, 1];

/**
 * The hero's lower edge, cut as a range of hills.
 *
 * The near ridge is filled with the colour of the section below, so the
 * photograph appears to end on a skyline rather than a straight line. As
 * the hero scrolls away the far ridges sink behind the near one at
 * different rates — depth from three flat shapes. On arrival an ember line
 * traces the far ridge from left to right.
 *
 * `target` is the ref of the element whose scroll drives the parallax.
 * Reduced motion (through the layout's MotionConfig) leaves the hills
 * standing still and the line already drawn.
 */
export function HeroRidge({ target, fill = "var(--color-paper)" }) {
  const { scrollYProgress } = useScroll({ target, offset: ["start start", "end start"] });
  const farY = useTransform(scrollYProgress, [0, 1], [0, 46]);
  const midY = useTransform(scrollYProgress, [0, 1], [0, 22]);

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1440 120"
      preserveAspectRatio="none"
      className="hero-ridge pointer-events-none absolute inset-x-0 bottom-[-1px] z-[5] w-full"
    >
      <motion.g style={{ y: farY }}>
        <path d={FAR + CLOSE} fill="rgb(255 255 255 / 0.07)" />
        <motion.path
          d={FAR}
          fill="none"
          stroke="var(--color-ember-400)"
          strokeWidth="2"
          vectorEffect="non-scaling-stroke"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.9 }}
          transition={{ pathLength: { duration: 2.2, ease: EASE, delay: 0.5 }, opacity: { duration: 0.3, delay: 0.5 } }}
        />
      </motion.g>
      <motion.path d={MID + CLOSE} fill="rgb(12 21 41 / 0.55)" style={{ y: midY }} />
      <path d={NEAR + CLOSE} fill={fill} />
    </svg>
  );
}

/**
 * The same range as a single outline that draws itself across a band as
 * it scrolls into view — used on the dark closing band, where there is no
 * section edge to cut.
 *
 * Takes the band's own scroll progress (`start end` → `end start`) rather
 * than tracking the band a second time: every tracked element is measured
 * on every scroll frame, so sharing one keeps the scroll light. The band's
 * centre crosses the screen's centre at exactly half way, so the far ridge
 * is drawn by then.
 */
export function RidgeTrace({ progress, className = "" }) {
  const far = useTransform(progress, [0, 0.5], [0, 1]);
  const mid = useTransform(progress, [0.08, 0.5], [0, 1]);
  const farDraw = useDashDraw(far);
  const midDraw = useDashDraw(mid);

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1440 120"
      preserveAspectRatio="none"
      className={`pointer-events-none absolute inset-x-0 w-full ${className}`}
    >
      <path {...farDraw} d={FAR} fill="none" stroke="rgb(255 255 255 / 0.16)" strokeWidth="2.5" />
      <path {...midDraw} d={MID} fill="none" stroke="var(--color-ember-400)" strokeOpacity="0.55" strokeWidth="2.5" />
    </svg>
  );
}
