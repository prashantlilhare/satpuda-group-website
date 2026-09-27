import { useEffect } from "react";

/* Cards that follow the pointer. One delegated listener for the whole site:
   - `[data-tilt]`  leans in 3D toward the pointer and carries a spotlight
   - `.card-raise`  gets the spotlight only (it tiles a hairline grid, so it
                    must not move)
   Both read the pointer position from `--mx` / `--my`; the look lives in
   the stylesheet. Mouse and pen only, and never under reduced motion. */

const SELECTOR = "[data-tilt], .card-raise";
const MAX_TILT = 6; // degrees

export function useCardPointer() {
  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const still = window.matchMedia("(prefers-reduced-motion: reduce)");
    let current = null;
    let frame = 0;
    let last = null;

    const reset = (el) => {
      el.style.removeProperty("--rx");
      el.style.removeProperty("--ry");
      el.removeAttribute("data-tilting");
    };

    const apply = () => {
      frame = 0;
      if (!current || !last) return;
      const r = current.getBoundingClientRect();
      const px = (last.clientX - r.left) / r.width;
      const py = (last.clientY - r.top) / r.height;
      current.style.setProperty("--mx", `${px * 100}%`);
      current.style.setProperty("--my", `${py * 100}%`);
      if (current.hasAttribute("data-tilt") && !still.matches) {
        current.setAttribute("data-tilting", "");
        current.style.setProperty("--rx", `${(0.5 - py) * MAX_TILT}deg`);
        current.style.setProperty("--ry", `${(px - 0.5) * MAX_TILT}deg`);
      }
    };

    const onMove = (e) => {
      if (!fine.matches || e.pointerType === "touch") return;
      const el = e.target.closest?.(SELECTOR) ?? null;
      if (el !== current) {
        if (current) reset(current);
        current = el;
      }
      if (!current) return;
      last = e;
      if (!frame) frame = requestAnimationFrame(apply);
    };

    const onLeave = () => {
      if (current) reset(current);
      current = null;
    };

    document.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      document.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, []);
}
