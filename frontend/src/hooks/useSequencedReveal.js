import { useCallback, useEffect, useRef, useState } from "react";

/** True when we should skip the choreography and render the group as-is. */
function shouldRevealImmediately() {
  if (typeof window === "undefined") return true;
  if (typeof IntersectionObserver === "undefined") return true;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Reveals a group of elements strictly one after another.
 *
 * `useReveal` is per-element and fires the moment anything is 15% visible,
 * which is right for a paragraph but wrong for a set of cards meant to be
 * read as a sequence: neighbours in the same grid row cross that line in the
 * same frame, and a fixed CSS stagger is the only thing keeping them apart.
 * This hook owns the whole group instead.
 *
 * One IntersectionObserver watches every element, so the entries arriving in
 * a single callback can be sorted by index before any of them is given a
 * start time — two cards crossing the trigger line in the same frame still
 * come out in document order rather than in whatever order the observer
 * reported them.
 *
 * Start times are queued rather than fixed: an element starts `step` ms after
 * the one before it, or straight away if the queue has already drained by the
 * time it arrives. Scrolling slowly therefore never leaves a card waiting on
 * a stagger it no longer needs, and scrolling fast past the whole group still
 * plays it as a sequence instead of all at once.
 *
 * The default `rootMargin` pulls the root's bottom edge up to 62% of the
 * viewport, so an element starts when its top reaches the lower-middle of the
 * screen — not when it first peeks over the bottom edge.
 *
 * Returns `[register, delays]`: `register(i)` is the ref for the nth element,
 * and `delays[i]` is its start offset in ms, or `null` while it is still
 * waiting its turn. Where the observer is unavailable or the user prefers
 * reduced motion every delay starts at 0 — it is never possible for an
 * element to stay hidden.
 */
export function useSequencedReveal(
  count,
  { step = 1050, rootMargin = "0px 0px -38% 0px" } = {},
) {
  const [delays, setDelays] = useState(() =>
    Array.from({ length: count }, () => (shouldRevealImmediately() ? 0 : null)),
  );

  const nodes = useRef([]);
  const claimed = useRef([]);
  /** Earliest moment the next element in the queue may start, on the perf clock. */
  const queueFreeAt = useRef(0);
  /** One stable ref callback per index, so a re-render does not churn them all. */
  const refs = useRef([]);

  const register = useCallback((index) => {
    refs.current[index] ??= (node) => {
      nodes.current[index] = node;
    };
    return refs.current[index];
  }, []);

  useEffect(() => {
    if (shouldRevealImmediately()) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const arrived = entries
          .filter((entry) => entry.isIntersecting)
          .map((entry) => nodes.current.indexOf(entry.target))
          .filter((index) => index !== -1 && !claimed.current[index])
          .sort((a, b) => a - b);

        if (arrived.length === 0) return;

        const now = performance.now();
        const starts = arrived.map((index) => {
          const startAt = Math.max(now, queueFreeAt.current);
          queueFreeAt.current = startAt + step;
          claimed.current[index] = true;
          observer.unobserve(nodes.current[index]);
          return [index, startAt - now];
        });

        setDelays((previous) => {
          const next = previous.slice();
          for (const [index, delay] of starts) next[index] = delay;
          return next;
        });
      },
      { rootMargin, threshold: 0 },
    );

    nodes.current.forEach((node, index) => {
      if (node && !claimed.current[index]) observer.observe(node);
    });

    return () => observer.disconnect();
  }, [count, step, rootMargin]);

  return [register, delays];
}
