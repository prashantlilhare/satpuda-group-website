import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { BookOpen, Mic, Sparkles } from "lucide-react";

const LOOP = { repeat: Infinity, ease: "easeInOut" };

/* Academic foundation: the book lifts and a page turns over. */
function Book({ on }) {
  return (
    <span className="relative" style={{ perspective: 200 }}>
      <BookOpen className="h-6 w-6" strokeWidth={1.8} />
      <motion.span
        className="absolute right-[3px] top-[5px] h-[13px] w-[9px] origin-left rounded-r-[2px] bg-current opacity-40"
        style={{ left: "50%" }}
        animate={on ? { rotateY: [0, 0, -180, -180], opacity: [0, 0.45, 0.45, 0] } : { rotateY: 0, opacity: 0 }}
        transition={{ duration: 2.4, times: [0, 0.2, 0.7, 1], ...LOOP }}
      />
    </span>
  );
}

/* Student development: a voice carrying out of the mic. */
function Voice({ on }) {
  return (
    <span className="relative flex items-center justify-center">
      {[0, 1].map((i) => (
        <motion.span
          key={i}
          className="absolute h-7 w-7 rounded-full border-2 border-current"
          initial={{ scale: 0.6, opacity: 0 }}
          animate={on ? { scale: [0.6, 1.9], opacity: [0.55, 0] } : { opacity: 0 }}
          transition={{ duration: 1.8, delay: i * 0.9, ...LOOP, ease: "easeOut" }}
        />
      ))}
      <Mic className="relative h-6 w-6" strokeWidth={1.8} />
    </span>
  );
}

/* Sport & activity: a ball bouncing, squashing as it lands. */
function Ball({ on }) {
  return (
    <span className="relative flex h-8 w-8 flex-col items-center justify-end">
      <motion.span
        className="h-4 w-4 rounded-full border-2 border-current bg-[radial-gradient(circle_at_35%_35%,rgb(255_255_255/0.9),transparent_60%)]"
        animate={on ? { y: [-14, 0, -14], scaleY: [1, 0.72, 1], scaleX: [1, 1.2, 1] } : { y: 0 }}
        transition={{ duration: 0.9, times: [0, 0.5, 1], ...LOOP, ease: [0.5, 0, 0.5, 1] }}
      />
      <motion.span
        className="mt-[2px] h-[3px] w-4 rounded-full bg-current opacity-30"
        animate={on ? { scaleX: [0.5, 1.1, 0.5], opacity: [0.15, 0.4, 0.15] } : { scaleX: 1 }}
        transition={{ duration: 0.9, times: [0, 0.5, 1], ...LOOP }}
      />
    </span>
  );
}

/* Culture & celebration: sparkles, twinkling in turn. */
const TWINKLES = [
  "-right-2 -top-1.5",
  "-left-2 top-1",
  "-bottom-1.5 right-0",
];
function Sparkle({ on }) {
  return (
    <span className="relative">
      <motion.span
        className="block"
        animate={on ? { rotate: [0, 12, -8, 0], scale: [1, 1.08, 1] } : { rotate: 0 }}
        transition={{ duration: 2.4, ...LOOP }}
      >
        <Sparkles className="h-6 w-6" strokeWidth={1.8} />
      </motion.span>
      {TWINKLES.map((pos, i) => (
        <motion.span
          key={pos}
          className={`absolute h-1.5 w-1.5 rounded-full bg-ember-400 ${pos}`}
          initial={{ scale: 0 }}
          animate={on ? { scale: [0, 1, 0] } : { scale: 0 }}
          transition={{ duration: 1.2, delay: i * 0.4, repeat: Infinity, repeatDelay: 0.4 }}
        />
      ))}
    </span>
  );
}

const ICONS = [Book, Voice, Ball, Sparkle];

/**
 * The school's four pillars, each with its own small living icon — a page
 * turning, a voice carrying, a ball bouncing, sparkles for a stage. They
 * only move while the card is on screen, and sit still with reduced motion.
 */
export function PillarIcon({ index, dark = false }) {
  const ref = useRef(null);
  const inView = useInView(ref, { margin: "0px 0px -10% 0px" });
  const still = useReducedMotion();
  const Icon = ICONS[index % ICONS.length];

  return (
    <span
      ref={ref}
      aria-hidden="true"
      className={`relative flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl transition-colors duration-400 ${
        dark
          ? "bg-white/15 text-white ring-1 ring-white/25 backdrop-blur-sm"
          : "bg-royal-50 text-royal-700 group-hover:bg-ember-50 group-hover:text-ember-600"
      }`}
    >
      <Icon on={inView && !still} />
    </span>
  );
}
