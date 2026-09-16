import { useEffect, useRef, useState } from "react";

/** True when we should skip the animation entirely and render content as-is. */
function shouldRevealImmediately() {
  if (typeof window === "undefined") return true;
  if (typeof IntersectionObserver === "undefined") return true;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Reveals an element once it scrolls into view.
 *
 * Uses a single IntersectionObserver per element and disconnects on first hit,
 * so there is no ongoing scroll work after the reveal has played. Where the
 * observer is unavailable or the user prefers reduced motion, content starts
 * visible — it is never possible for an element to stay hidden.
 */
export function useReveal({ threshold = 0.15, rootMargin = "0px 0px -8% 0px" } = {}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(shouldRevealImmediately);

  useEffect(() => {
    const node = ref.current;
    if (!node || visible) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin },
    );

    observer.observe(node);
    return () => observer.disconnect();
    // `visible` only ever flips false → true, which tears the observer down.
  }, [threshold, rootMargin, visible]);

  return [ref, visible];
}
