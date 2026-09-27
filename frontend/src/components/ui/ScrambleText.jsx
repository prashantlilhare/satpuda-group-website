import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "motion/react";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ#%&*+=?";
const MS = 950;

/**
 * A word that decodes itself as it scrolls into view.
 *
 * Each letter flickers through random glyphs and settles, left to right,
 * over just under a second — the word resolving out of noise, which suits
 * a list of values that are meant to be read slowly. Spaces and
 * punctuation hold still. `delay` staggers a group of them.
 *
 * The real text is always what assistive tech reads (`aria-label`); the
 * flicker is aria-hidden. Reduced motion prints the word.
 */
export function ScrambleText({ children, delay = 0, className = "" }) {
  const text = String(children);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });
  const still = useReducedMotion();
  const [shown, setShown] = useState(text);

  useEffect(() => {
    if (!inView || still) return;
    let frame = 0;
    let start = 0;
    const tick = (now) => {
      start ||= now + delay;
      const p = Math.max(0, (now - start) / MS);
      const settled = Math.floor(p * text.length);
      setShown(
        [...text]
          .map((ch, i) => {
            if (i < settled || !/[A-Za-z]/.test(ch)) return ch;
            return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          })
          .join(""),
      );
      if (p < 1) frame = requestAnimationFrame(tick);
      else setShown(text);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, still, text, delay]);

  return (
    <span ref={ref} aria-label={text} className={className}>
      <span aria-hidden="true">{shown}</span>
    </span>
  );
}
