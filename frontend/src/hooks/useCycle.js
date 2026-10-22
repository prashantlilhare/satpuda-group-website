import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "motion/react";

/**
 * A slow, ambient highlight that steps through `count` items while its
 * element is on screen — the "finger running down a list" used across the
 * School page. Pointing at an item (`hold(i)`) pins the highlight there
 * until the pointer leaves (`release()`). Reduced motion keeps the hover
 * and drops the walk.
 *
 * Returns `[ref, active, hold, release]`.
 */
export function useCycle(count, ms = 2600) {
  const ref = useRef(null);
  const inView = useInView(ref, { margin: "0px 0px -20% 0px" });
  const still = useReducedMotion();
  const [active, setActive] = useState(0);
  const [held, setHeld] = useState(false);

  useEffect(() => {
    if (!inView || still || held || count < 2) return;
    const t = setTimeout(() => setActive((a) => (a + 1) % count), ms);
    return () => clearTimeout(t);
  }, [inView, still, held, active, count, ms]);

  const hold = (i) => {
    setHeld(true);
    setActive(i);
  };
  const release = () => setHeld(false);

  return [ref, active, hold, release];
}
