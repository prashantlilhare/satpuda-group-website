import { useLayoutEffect, useRef } from "react";
import { useMotionValueEvent } from "motion/react";

/**
 * Draws an SVG stroke along its length from a 0–1 motion value, for lines
 * that follow the scroll.
 *
 * Motion's own `pathLength` writes SVG attributes on every change, and
 * Chrome treats an SVG attribute change as a layout invalidation — a
 * scroll-linked line then costs a layout on every scroll frame. This
 * writes `stroke-dashoffset` as an inline style instead, which only needs
 * a repaint. The path must carry `pathLength="1"` and
 * `strokeDasharray="1 1"`, which the returned props provide.
 */
export function useDashDraw(progress) {
  const ref = useRef(null);

  const apply = (v) => {
    const el = ref.current;
    if (!el) return;
    el.style.strokeDashoffset = String(1 - v);
    /* A zero-length dash still shows its round cap as a dot. */
    el.style.opacity = v < 0.001 ? "0" : "";
  };

  useLayoutEffect(() => apply(progress.get()));
  useMotionValueEvent(progress, "change", apply);

  return { ref, pathLength: 1, strokeDasharray: "1 1" };
}
