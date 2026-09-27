import { useLayoutEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useSpring,
} from "motion/react";
import { Eyebrow } from "../ui/Primitives";
import { milestones } from "../../data/institutions";

/** Marker diameter in px; the rail runs through its centre. */
const MARKER = 44;

const EASE = [0.16, 1, 0.3, 1];

/* A milestone appears once its marker crosses this line, as a fraction of
   the viewport height from the top — same on every screen size. */
const TRIGGER = 0.75;

/**
 * Centre of each milestone's marker, in px down from the top of the list.
 * Measured, because the rows are sized by copy
 * that reflows with the column.
 */
function useMarkerOffsets(listRef, markerRefs) {
  const [geo, setGeo] = useState({ offsets: [] });

  useLayoutEffect(() => {
    const list = listRef.current;
    if (!list) return;

    const measure = () => {
      const top = list.getBoundingClientRect().top;
      setGeo({
        offsets: markerRefs.current.map((node) =>
          node ? node.getBoundingClientRect().top - top + node.offsetHeight / 2 : 0,
        ),
      });
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(list);
    return () => observer.disconnect();
  }, [listRef, markerRefs]);

  return geo;
}

/** Two-digit counter whose digits slide over when the value changes. */
function StepCounter({ value, total }) {
  const pad = (n) => String(n).padStart(2, "0");
  return (
    <span
      className="inline-flex items-baseline font-display text-xs font-semibold tabular-nums text-white/60"
      aria-hidden="true"
    >
      <span className="relative inline-flex h-[1.1em] overflow-hidden text-ember-300">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={value}
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "-100%", opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
          >
            {pad(value)}
          </motion.span>
        </AnimatePresence>
      </span>
      <span className="ml-1">/ {pad(total)}</span>
    </span>
  );
}

function Milestone({ m, reached, current, markerRef }) {
  return (
    <li className="group relative flex gap-5 pb-9 last:pb-0">
      {/* marker: the milestone photo, hidden until the trigger line reaches it */}
      <span
        ref={markerRef}
        className="relative z-[1] shrink-0"
        style={{ width: MARKER, height: MARKER }}
        aria-hidden="true"
      >
        <motion.span
          className="absolute inset-0 rounded-full"
          initial={false}
          animate={reached ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
          transition={{ type: "spring", stiffness: 320, damping: 24 }}
        >
          <motion.span
            className="absolute inset-0 rounded-full"
            animate={{
              boxShadow: current
                ? "0 0 0 4px var(--color-royal-900), 0 0 0 5.5px var(--color-ember-500)"
                : "0 0 0 4px var(--color-royal-900), 0 0 0 5px rgb(255 255 255 / 0.22)",
            }}
            transition={{ duration: 0.4 }}
          />
          <span className="absolute inset-0 overflow-hidden rounded-full bg-royal-800">
            <img
              src={m.image}
              srcSet={m.imageSrcSet}
              sizes={m.imageSrcSet ? "44px" : undefined}
              alt=""
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:scale-110"
            />
          </span>
          {/* one ripple the moment the rail arrives */}
          <AnimatePresence>
            {current && (
              <motion.span
                key="ripple"
                className="absolute inset-0 rounded-full border-2 border-ember-500"
                initial={{ scale: 1, opacity: 0.8 }}
                animate={{ scale: 1.7, opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.9, ease: EASE }}
              />
            )}
          </AnimatePresence>
        </motion.span>
      </span>

      {/* copy */}
      <motion.div
        className="min-w-0 pt-0.5"
        initial={false}
        animate={
          reached
            ? { opacity: current ? 1 : 0.7, y: 0, filter: "blur(0px)" }
            : { opacity: 0, y: 14, filter: "blur(4px)" }
        }
        transition={{ duration: 0.55, ease: EASE }}
        style={{ pointerEvents: reached ? "auto" : "none" }}
      >
        <p className="font-display text-[0.875rem] font-semibold tabular-nums tracking-[0.04em] text-ember-300">
          {m.year}
        </p>
        <h3 className="mt-1 font-display text-[1.125rem] font-semibold tracking-[-0.015em] text-white transition-transform duration-300 ease-[var(--ease-out-expo)] group-hover:translate-x-1 sm:text-[1.1875rem]">
          {m.title}
        </h3>
        <p className="mt-1.5 max-w-prose text-[0.9rem] leading-[1.65] text-white/62">{m.body}</p>
      </motion.div>
    </li>
  );
}

export function GrowthTimeline() {
  const listRef = useRef(null);
  const markerRefs = useRef([]);
  const { offsets } = useMarkerOffsets(listRef, markerRefs);

  /* Where the trigger line sits along the rail, 0 → 1, and the furthest
     marker it has crossed. Read off live geometry, so scrolling back up
     hides milestones again. */
  const target = useMotionValue(0);
  const fill = useSpring(target, { stiffness: 140, damping: 28, mass: 0.4 });
  const [reached, setReached] = useState(-1);
  const { scrollY } = useScroll();

  const update = () => {
    const list = listRef.current;
    if (!list || !offsets.length) return;
    const line = window.innerHeight * TRIGGER - list.getBoundingClientRect().top;
    const first = offsets[0];
    const span = offsets[offsets.length - 1] - first;
    target.set(span > 0 ? Math.min(1, Math.max(0, (line - first) / span)) : 0);
    let idx = -1;
    offsets.forEach((o, i) => {
      if (line >= o) idx = i;
    });
    setReached(idx);
  };

  useMotionValueEvent(scrollY, "change", update);
  useLayoutEffect(update, [offsets]); // eslint-disable-line react-hooks/exhaustive-deps

  const first = offsets[0] ?? 0;
  const last = offsets[offsets.length - 1] ?? 0;

  return (
    <div>
      <div className="flex items-center justify-between gap-6">
        <Eyebrow>How it grew</Eyebrow>
        <StepCounter value={Math.max(1, reached + 1)} total={milestones.length} />
      </div>

      <div ref={listRef} className="relative mt-8">
        {/* base rail, marker centre to marker centre */}
        <span
          aria-hidden="true"
          className="absolute w-px bg-white/14"
          style={{ left: MARKER / 2, top: first, height: Math.max(0, last - first) }}
        />
        {/* travelled rail */}
        <span
          aria-hidden="true"
          className="absolute w-px overflow-hidden"
          style={{ left: MARKER / 2, top: first, height: Math.max(0, last - first) }}
        >
          <motion.span
            className="tl-rail-fill absolute inset-0 origin-top"
            style={{ scaleY: fill }}
          />
        </span>

        <ol className="relative">
          {milestones.map((m, i) => (
            <Milestone
              key={m.title}
              m={m}
              reached={i <= reached}
              current={i === reached}
              markerRef={(node) => {
                markerRefs.current[i] = node;
              }}
            />
          ))}
        </ol>
      </div>
    </div>
  );
}
