/* Timing shared by the School page's sections — kept out of the .jsx files
   so they export components only (React Fast Refresh). */

export const EASE = [0.16, 1, 0.3, 1];

/** Enter once, when scrolled to — the page's one-shot entrance. */
export const enter = (delay = 0, y = 18) => ({
  initial: { opacity: 0, y },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "0px 0px -12% 0px" },
  transition: { duration: 0.7, ease: EASE, delay },
});
