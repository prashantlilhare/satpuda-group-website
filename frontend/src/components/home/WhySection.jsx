import { useCallback, useRef, useState } from "react";
import { useInView } from "motion/react";
import { Lightbox } from "../shared/Lightbox";
import { SectionHeading } from "../ui/Primitives";
import { galleryRows } from "../../data/gallery";
import { useReveal } from "../../hooks/useReveal";

/* Each row's pictures are laid down three times, back to back, and the track
   slides by exactly one of those passes. The passes being identical, the
   frame at the end of the cycle is pixel-for-pixel the frame at the start —
   the loop restarts on the picture it ended on, so there is nothing to see
   when it does.

   Three rather than two because of what is left to the right of the pointer
   at the end of a cycle: the track has travelled one pass, so the rows can
   only stay filled while the remaining `PASSES - 1` cover the viewport. One
   spare pass measures about 2,200px, which runs out on a wide desktop; two
   carries past 4K, where the tiles have stopped growing.

   The space between tiles is carried by each tile's own margin rather than by
   a `gap` on the track: a gap would also fall between passes, leaving the
   track wider than three whole passes — and a third of that is no longer one
   pass. That slip, once a minute, is exactly the sort of small recurring
   nudge that reads as a stutter. The margin lives on `.gallery-tile` in the
   stylesheet, and the matching fraction in `@keyframes gallery-drift`. */
const PASSES = 3;

/* A tile is never wider than roughly a quarter of the band on a desktop, or
   just under half of it on a phone — stated here so the browser can pick the
   460w file wherever the 880w one would be wasted. */
const SIZES = "(max-width: 639px) 46vw, (max-width: 1023px) 30vw, 23vw";

function Tile({ frame, loaded, duplicate, onOpen }) {
  return (
    /* Passes two and three are the same photographs over again, so they are
       hidden from assistive tech: the row should be announced once, and only
       the first pass is reachable by tab. */
    <li className="gallery-tile" data-shape={frame.shape} aria-hidden={duplicate || undefined}>
      {loaded && (
        <button
          type="button"
          className="gallery-tile-hit"
          onClick={(e) => onOpen(frame, e.currentTarget.getBoundingClientRect())}
          aria-label={duplicate ? undefined : `View larger: ${frame.alt}`}
          tabIndex={duplicate ? -1 : undefined}
        >
          <img
            src={frame.src}
            srcSet={`${frame.small} 460w, ${frame.src} 880w`}
            sizes={SIZES}
            alt={duplicate ? "" : frame.alt}
            decoding="async"
            draggable="false"
          />
        </button>
      )}
    </li>
  );
}

/**
 * One drifting row.
 *
 * Each row runs its own animation on its own track, at its own duration.
 * `direction` picks which way a shared keyframe pair is played — "right"
 * runs it in reverse — so the two directions cannot drift apart in speed or
 * easing, but the three animations remain entirely separate: hovering one
 * row holds that row still (see `.gallery-row:hover` in the stylesheet) and
 * the other two carry on regardless.
 */
function GalleryRow({ row, loaded, onOpen }) {
  return (
    <div className="gallery-row">
      <ul
        className="gallery-track"
        data-direction={row.direction}
        style={{ "--gallery-drift": row.drift }}
      >
        {Array.from({ length: PASSES }, (_, pass) =>
          row.frames.map((frame, i) => (
            <Tile
              key={`${pass}-${i}`}
              frame={frame}
              loaded={loaded}
              duplicate={pass > 0}
              onOpen={onOpen}
            />
          )),
        )}
      </ul>
    </div>
  );
}

/* The photographs are held back until the band is close, then fetched at
   normal priority rather than lazily. Lazy loading measures against the
   viewport, and most of a row is parked outside it by design — the tiles
   would then arrive one at a time as they drifted in, which is the one kind
   of pop a marquee cannot hide. */
const NEAR = { threshold: 0, rootMargin: "0px 0px 35% 0px" };

export function WhySection() {
  const [ref, near] = useReveal(NEAR);
  const [viewing, setViewing] = useState(null);
  const open = useCallback((frame, origin) => setViewing({ frame, origin }), []);
  const close = useCallback(() => setViewing(null), []);
  /* The rows only drift while they are on screen — three long tracks of
     photographs are not worth compositing for a reader further down. */
  const marqueeRef = useRef(null);
  const onScreen = useInView(marqueeRef);

  return (
    <section ref={ref} className="section why-section bg-paper-dim">
      <div className="shell">
        <SectionHeading
          eyebrow="Why Satpuda Group"
          title="A campus built around learning, practice and growth."
        />
      </div>

      {/* Full-bleed: the rows run edge to edge, outside the shell's gutter. */}
      <div
        ref={marqueeRef}
        data-paused={!onScreen || undefined}
        className="section-body gallery-marquee"
        role="group"
        aria-label="Photographs from across the Satpuda Group campus"
      >
        {galleryRows.map((row) => (
          <GalleryRow key={row.id} row={row} loaded={near} onOpen={open} />
        ))}
      </div>

      {viewing && <Lightbox frame={viewing.frame} origin={viewing.origin} onClose={close} />}
    </section>
  );
}
