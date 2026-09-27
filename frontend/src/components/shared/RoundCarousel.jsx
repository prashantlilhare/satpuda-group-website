import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Lightbox } from "./Lightbox";

/* ------------------------------------------------------------------ */
/* Tuning                                                              */
/* ------------------------------------------------------------------ */

/** Idle drift, in degrees per second. Slow enough to read a caption. */
const DRIFT = 7;
/** How much of the drag's velocity survives each frame after release. */
const FRICTION = 0.94;
/** How much of the gap to a button/click target is closed each frame. */
const SEEK = 0.09;

const mod = (n, m) => ((n % m) + m) % m;

/**
 * Card width, and how wide the ring should be, for a stage this wide.
 *
 * A phone gets one clear card with its neighbours turning away at the edges.
 * From a tablet up the ring is stretched wider than the stage (`span` is its
 * diameter as a share of the stage) with narrower cards. Its far sides run
 * off both edges, so what is left in view is the flatter front of the ring —
 * a sweep of six to eight photographs across the whole screen rather than
 * three large ones stranded in the middle.
 */
function layoutFor(stage) {
  if (stage < 640) return { w: Math.min(stage * 0.62, 280), span: 0 };
  if (stage < 1024) return { w: stage * 0.25, span: 1.15 };
  return { w: Math.min(Math.max(stage * 0.16, 190), 300), span: 1.2 };
}

/**
 * A ring of photographs turning in 3D.
 *
 * The cards stand on the rim of a cylinder, each rotated by its share of 360°
 * and pushed out by the ring's radius; the ring itself is what turns. The
 * radius is worked out from the card width so neighbours sit just clear of
 * each other whatever the count, and the card width from the stage — so the
 * whole thing re-lays itself on any screen.
 *
 * Rotation lives in a ref and is written straight to the DOM every frame:
 * it drifts on its own, follows a drag (with a little momentum on release),
 * and eases onto a card when one is chosen with the arrows, the dots or a
 * click. It holds still under the pointer, and while it is off-screen it does
 * not run at all.
 */
export function RoundCarousel({ items }) {
  const total = items.length;

  const stageRef = useRef(null);
  const ringRef = useRef(null);
  const cardRefs = useRef([]);

  /* `slots` is how many cards stand on the ring. On a phone that is one per
     photograph; on a wide ring there are more places than photographs, and
     the set is dealt round again to fill them. */
  const [size, setSize] = useState({ w: 260, r: 400, slots: total });
  const count = size.slots;
  const step = 360 / count;
  const [active, setActive] = useState(0);
  /* Photographs are only requested once the ring is close. Native lazy
     loading cannot be trusted here: most cards are turned away or sit
     outside the stage, and the browser's visibility check does not see 3D
     transforms the way the viewer does. */
  const [near, setNear] = useState(false);
  /* The photograph opened large, and the rect it grows out of. */
  const [viewing, setViewing] = useState(null);

  const motion = useRef({
    angle: 0, // current rotation of the ring, degrees
    velocity: 0, // degrees per frame, from a released drag
    target: null, // degrees, when easing onto a chosen card
    hovering: false,
    viewing: false, // a photograph is open over the page; hold the ring
    dragging: false,
    visible: false,
    lastX: 0,
    moved: 0,
    pressed: null, // index of the card the press started on
  });

  /* ---- layout: card width and ring radius follow the stage ---- */
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const measure = () => {
      const width = stage.clientWidth;
      const { w, span } = layoutFor(width);
      /* Enough cards, spaced a little apart, to go round a ring of the
         wanted diameter — never fewer than the photographs themselves. */
      /* Rounded to whole passes of the set, so the join where the deal
         starts again never puts the same photograph beside itself. */
      const slots = span
        ? Math.max(1, Math.round((Math.PI * span * width) / (w * 1.12) / total)) * total
        : total;
      const r = w / 2 / Math.tan(Math.PI / slots) + w * 0.12;
      setSize((current) =>
        current.w === w && current.r === r && current.slots === slots ? current : { w, r, slots },
      );
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(stage);
    return () => observer.disconnect();
  }, [total]);

  /* ---- only animate while the carousel is on screen ---- */
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const observer = new IntersectionObserver(([entry]) => {
      motion.current.visible = entry.isIntersecting;
    });
    const approach = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setNear(true);
          approach.disconnect();
        }
      },
      { rootMargin: "800px 0px" },
    );
    observer.observe(stage);
    approach.observe(stage);
    return () => {
      observer.disconnect();
      approach.disconnect();
    };
  }, []);

  /* ---- the frame loop ---- */
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;
    let last = performance.now();

    const tick = (now) => {
      frame = requestAnimationFrame(tick);
      const m = motion.current;
      const dt = Math.min(64, now - last) / 1000;
      last = now;
      if (!m.visible) return;

      if (m.target !== null) {
        const gap = m.target - m.angle;
        m.angle = Math.abs(gap) < 0.05 ? m.target : m.angle + gap * (reduced ? 1 : SEEK);
        if (m.angle === m.target) m.target = null;
      } else if (!m.dragging) {
        if (Math.abs(m.velocity) > 0.01) {
          m.angle += m.velocity;
          m.velocity *= FRICTION;
        } else if (!m.hovering && !m.viewing && !reduced) {
          m.angle -= DRIFT * dt;
        }
      }

      const ring = ringRef.current;
      if (ring) ring.style.transform = `translateZ(${-size.r}px) rotateY(${m.angle}deg)`;

      /* How squarely each card faces the viewer: 1 at the front, 0 side-on.
         Drives its brightness and scale in the stylesheet. */
      cardRefs.current.forEach((card, i) => {
        if (!card) return;
        const facing = Math.cos(((i * step + m.angle) * Math.PI) / 180);
        card.style.setProperty("--facing", Math.max(0, facing).toFixed(3));
      });

      const front = mod(Math.round(-m.angle / step), count);
      setActive((current) => (current === front ? current : front));
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [count, step, size.r]);

  /* ---- choosing a card: ease the ring round the shorter way ---- */
  const goTo = useCallback(
    (index) => {
      const m = motion.current;
      const base = m.target ?? m.angle;
      const current = mod(Math.round(-base / step), count);
      let delta = index - current;
      if (delta > count / 2) delta -= count;
      if (delta < -count / 2) delta += count;
      m.velocity = 0;
      m.target = -Math.round(-base / step) * step - delta * step;
    },
    [count, step],
  );

  const next = () => goTo(mod(active + 1, count));
  const prev = () => goTo(mod(active - 1, count));

  /* The photograph at the front, whichever of its copies is standing there. */
  const current = active % total;

  /* A dot picks a photograph; the ring turns to the nearest card showing it. */
  const showPhoto = (photoIndex) => {
    let best = photoIndex;
    for (let slot = photoIndex; slot < count; slot += total) {
      const distance = (s) => Math.min(mod(s - active, count), mod(active - s, count));
      if (distance(slot) < distance(best)) best = slot;
    }
    goTo(best);
  };

  /* ---- dragging ---- */
  const onPointerDown = (e) => {
    const m = motion.current;
    m.dragging = true;
    m.target = null;
    m.velocity = 0;
    m.lastX = e.clientX;
    m.moved = 0;
    const card = e.target.closest?.("[data-index]");
    m.pressed = card ? Number(card.dataset.index) : null;
    e.currentTarget.setPointerCapture?.(e.pointerId);
  };

  const onPointerMove = (e) => {
    const m = motion.current;
    if (!m.dragging) return;
    const dx = e.clientX - m.lastX;
    m.lastX = e.clientX;
    m.moved += Math.abs(dx);
    /* One pixel of drag turns the rim by one pixel. */
    const degrees = (dx / size.r) * (180 / Math.PI);
    m.angle += degrees;
    m.velocity = degrees;
  };

  /* The pointer is captured by the stage, so a tap on a card is read here
     rather than from a click on the card: a press that barely moved opens
     the photograph it started on (and turns the ring to it underneath);
     anything longer was a drag. */
  const onPointerUp = () => {
    const m = motion.current;
    if (!m.dragging) return;
    m.dragging = false;
    if (m.moved <= 6 && m.pressed !== null) open(m.pressed);
  };

  const open = (slot) => {
    const card = cardRefs.current[slot];
    if (!card) return;
    goTo(slot);
    motion.current.viewing = true;
    setViewing({ frame: items[slot % total], origin: card.getBoundingClientRect() });
  };

  const close = useCallback(() => {
    motion.current.viewing = false;
    setViewing(null);
  }, []);

  const onKeyDown = (e) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      next();
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      prev();
    } else if ((e.key === "Enter" || e.key === " ") && e.target === e.currentTarget) {
      /* Only when the carousel itself has focus — Enter on one of its
         buttons belongs to that button. */
      e.preventDefault();
      open(active);
    }
  };

  const cardH = size.w * 1.3;

  return (
    <div
      className="round-carousel"
      role="region"
      aria-roledescription="carousel"
      aria-label="Photo gallery"
      tabIndex={0}
      onKeyDown={onKeyDown}
      onMouseEnter={() => (motion.current.hovering = true)}
      onMouseLeave={() => (motion.current.hovering = false)}
    >
      <div
        ref={stageRef}
        className="round-carousel-stage"
        style={{ height: cardH + 64, perspective: `${size.r * 3.2}px` }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <div
          ref={ringRef}
          className="round-carousel-ring"
          style={{
            width: size.w,
            height: cardH,
            marginLeft: -size.w / 2,
            marginTop: -cardH / 2,
            /* Also written every frame by the loop; set here so the ring is
               already in place on the first paint and after a resize. */
            transform: `translateZ(${-size.r}px) rotateY(${motion.current.angle}deg)`,
          }}
        >
          {Array.from({ length: count }, (_, i) => items[i % total]).map((item, i) => (
            <figure
              key={i}
              ref={(node) => {
                cardRefs.current[i] = node;
              }}
              className="round-carousel-card"
              data-index={i}
              data-active={i === active || undefined}
              style={{ transform: `rotateY(${i * step}deg) translateZ(${size.r}px)` }}
              aria-hidden={i !== active || undefined}
            >
              <img
                src={near ? item.src : undefined}
                srcSet={near ? item.srcSet : undefined}
                sizes={`${Math.round(size.w)}px`}
                alt={item.alt}
                decoding="async"
                draggable="false"
                style={{ objectPosition: item.focus ?? "center" }}
              />
              {item.caption && <figcaption>{item.caption}</figcaption>}
            </figure>
          ))}
        </div>

        {/* A soft floor shadow, so the ring reads as standing on something. */}
        <span aria-hidden="true" className="round-carousel-floor" style={{ width: size.w * 2.4 }} />
      </div>

      {/* ---- controls ---- */}
      <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
        <p className="min-h-[1.5em] max-w-md text-[0.9375rem] leading-snug text-ink-soft" aria-live="polite">
          <span className="mr-3 font-display text-xs font-semibold tabular-nums text-ember-600">
            {String(current + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </span>
          {items[current]?.caption ?? items[current]?.alt}
        </p>

        <div className="flex items-center gap-4">
          <div className="hidden items-center gap-1.5 sm:flex">
            {items.map((item, i) => (
              <button
                key={item.id ?? item.src}
                type="button"
                onClick={() => showPhoto(i)}
                aria-label={`Show photo ${i + 1}`}
                aria-current={i === current || undefined}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === current ? "w-6 bg-ember-500" : "w-2 bg-stone-300 hover:bg-stone-400"
                }`}
              />
            ))}
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={prev}
              aria-label="Previous photo"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-stone-line bg-white text-royal-800 shadow-xs transition-all hover:border-royal-700 hover:bg-royal-700 hover:text-white"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Next photo"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-stone-line bg-white text-royal-800 shadow-xs transition-all hover:border-royal-700 hover:bg-royal-700 hover:text-white"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {viewing && (
        <Lightbox frame={viewing.frame} origin={viewing.origin} onClose={close} tone="gray" />
      )}
    </div>
  );
}
