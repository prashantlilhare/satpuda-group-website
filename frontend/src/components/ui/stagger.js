/**
 * Reveal timing.
 *
 * Every delayed entrance on the site is a multiple of one step rather than a
 * hand-picked number, so a column of reveals shares a cadence instead of each
 * block guessing at 80 / 90 / 100 / 110 / 120ms as it previously did.
 *
 * Lives in its own module so `Primitives.jsx` keeps exporting components only,
 * which is what React Fast Refresh needs to hot-swap it cleanly.
 */

/** One stagger step, in milliseconds. */
export const STAGGER = 70;

/**
 * Delay for the nth item of a staggered group.
 *
 * Capped, because an uncapped `index * step` leaves the last card of a long
 * list waiting seconds after it has already scrolled into view.
 */
export function stagger(index, max = 5) {
  return Math.min(index, max) * STAGGER;
}
