import { useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
} from "motion/react";
import { ArrowUp } from "lucide-react";
import { getLenis } from "../../lib/smoothScroll";
import { useDashDraw } from "../../hooks/useDashDraw";

/* Site-wide motion pieces built on Motion (Framer Motion). Everything here
   honours reduced motion through the <MotionConfig reducedMotion="user">
   wrapping the layout. */

/* ------------------------------------------------------------------ */
/* ScrollProgress — thin ember bar under the header                    */
/* ------------------------------------------------------------------ */

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30, mass: 0.3 });

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-gradient-to-r from-ember-600 via-ember-500 to-ember-300 print:hidden"
      style={{ scaleX }}
    />
  );
}

/* ------------------------------------------------------------------ */
/* BackToTop — appears after a screen of scrolling, ring shows progress */
/* ------------------------------------------------------------------ */

export function BackToTop() {
  const { scrollY, scrollYProgress } = useScroll();
  const [shown, setShown] = useState(false);
  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });
  const ringDraw = useDashDraw(progress);

  useMotionValueEvent(scrollY, "change", (y) => {
    const next = y > window.innerHeight * 0.9;
    setShown((prev) => (prev === next ? prev : next));
  });

  return (
    <AnimatePresence>
      {shown && (
        <motion.button
          type="button"
          aria-label="Back to top"
          onClick={() => {
            const lenis = getLenis();
            if (lenis) lenis.scrollTo(0, { duration: 1.2 });
            else window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="group fixed bottom-5 right-5 z-30 flex h-12 w-12 items-center justify-center rounded-full bg-royal-700 text-white shadow-[0_14px_30px_-12px_rgba(20,34,68,0.7)] print:hidden sm:bottom-7 sm:right-7"
          initial={{ opacity: 0, scale: 0.6, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 16 }}
          whileHover={{ scale: 1.08, backgroundColor: "var(--color-ember-500)" }}
          whileTap={{ scale: 0.92 }}
          transition={{ type: "spring", stiffness: 380, damping: 24 }}
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 44 44"
            className="absolute inset-0 h-full w-full -rotate-90"
          >
            <circle cx="22" cy="22" r="20" fill="none" stroke="rgb(255 255 255 / 0.18)" strokeWidth="2" />
            <circle
              {...ringDraw}
              cx="22"
              cy="22"
              r="20"
              fill="none"
              stroke="var(--color-ember-300)"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          <ArrowUp
            aria-hidden="true"
            className="relative h-[1.1rem] w-[1.1rem] transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-0.5"
          />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

/* ------------------------------------------------------------------ */
/* Magnetic — the child leans a few px toward the pointer              */
/* ------------------------------------------------------------------ */

const finePointer = () =>
  typeof window !== "undefined" && window.matchMedia("(hover: hover) and (pointer: fine)").matches;

export function Magnetic({ children, strength = 0.12, className = "" }) {
  const ref = useRef(null);
  const x = useSpring(0, { stiffness: 260, damping: 18, mass: 0.4 });
  const y = useSpring(0, { stiffness: 260, damping: 18, mass: 0.4 });

  const move = (e) => {
    if (!finePointer()) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const leave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.span
      ref={ref}
      className={`inline-flex ${className}`}
      style={{ x, y }}
      onPointerMove={move}
      onPointerLeave={leave}
      whileTap={{ scale: 0.96 }}
    >
      {children}
    </motion.span>
  );
}
