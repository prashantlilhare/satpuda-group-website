/**
 * A single handle on the page's Lenis instance.
 *
 * Kept outside React so that the few places which have to *stop* scrolling —
 * the mobile menu, which locks the body while it is open — can reach it
 * without threading a context through the tree. When smooth scrolling is off
 * (reduced motion, or before mount) every helper here is a no-op, so callers
 * never need to check.
 */
let instance = null;

export function setLenis(lenis) {
  instance = lenis;
  if (typeof window !== "undefined") window.__satpudaLenis = lenis;
}

export function getLenis() {
  return instance;
}

/** Pause smooth scrolling — paired with a body scroll lock. */
export function stopSmoothScroll() {
  instance?.stop();
}

/** Resume smooth scrolling. */
export function startSmoothScroll() {
  instance?.start();
}
