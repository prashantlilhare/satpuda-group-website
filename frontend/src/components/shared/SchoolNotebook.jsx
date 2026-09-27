import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { PillarIcon } from "./PillarIcon";

const STEP_MS = 4800;
const FLIP_S = 0.95;

/* One sticky-note colour per pillar, as tabs on the book's edge. */
const TABS = ["bg-amber-300", "bg-sky-300", "bg-emerald-300", "bg-rose-300"];

const faceStyle = { backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" };

/* The two-page spread needs a laptop's width; below it, the notebook
   becomes a single-page notepad (see the phone branch below). */
function useWide() {
  const query = "(min-width: 768px)";
  const [wide, setWide] = useState(() => typeof window !== "undefined" && window.matchMedia(query).matches);
  useEffect(() => {
    const m = window.matchMedia(query);
    const onChange = () => setWide(m.matches);
    m.addEventListener("change", onChange);
    return () => m.removeEventListener("change", onChange);
  }, []);
  return wide;
}

/* The left page: a print taped into the book. */
function PhotoPage({ img, tilt }) {
  return (
    <div className="flex h-full items-center justify-center bg-[#fbf8f1] p-6 sm:p-10">
      <figure className="relative w-full max-w-[22rem] bg-white p-2.5 pb-3 shadow-[0_14px_30px_-16px_rgba(20,34,68,0.55)]" style={{ rotate: `${tilt}deg` }}>
        <span aria-hidden="true" className="absolute -left-4 -top-2 h-5 w-14 -rotate-[30deg] bg-amber-100/80 shadow-sm" />
        <span aria-hidden="true" className="absolute -right-4 -top-2 h-5 w-14 rotate-[30deg] bg-amber-100/80 shadow-sm" />
        <div className="aspect-[4/3] overflow-hidden bg-royal-900/5">
          <img
            src={img.src}
            srcSet={img.srcSet}
            sizes="(min-width: 768px) 22rem, 80vw"
            alt={img.alt}
            loading="lazy"
            decoding="async"
            style={{ objectPosition: img.focus }}
            className="h-full w-full object-cover"
          />
        </div>
        <figcaption className="mt-2.5 text-center font-display text-[0.9375rem] italic text-ink-soft">{img.caption}</figcaption>
      </figure>
    </div>
  );
}

/* The right page: ruled paper, a margin, and the pillar written up. */
function WritingPage({ p, i, n }) {
  return (
    <div
      className="relative h-full bg-[#fffdf8] bg-[repeating-linear-gradient(to_bottom,transparent_0,transparent_31px,rgb(41_71_145/0.12)_31px,rgb(41_71_145/0.12)_32px)] bg-[position:0_20px] px-6 py-6 pl-14 sm:px-10 sm:py-10 sm:pl-20"
    >
      <span aria-hidden="true" className="absolute inset-y-0 left-10 w-px bg-ember-500/45 sm:left-14" />
      <div className="flex items-center justify-between gap-4">
        <PillarIcon index={i} />
        <span className="font-display text-xs font-semibold uppercase tracking-[0.16em] text-ink-mute">
          Page {String(i + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}
        </span>
      </div>
      <h3 className="mt-6 font-display text-[1.5rem] font-semibold leading-[2rem] tracking-[-0.02em] text-ink sm:text-[1.875rem] sm:leading-[2.5rem]">
        {/* a highlighter stroke under the heading, as a student would */}
        <span className="bg-[linear-gradient(transparent_62%,rgb(253_224_71/0.6)_62%)] [box-decoration-break:clone]">{p.title}</span>
      </h3>
      <p className="mt-4 max-w-md text-[0.9375rem] leading-[2rem] text-ink-soft sm:text-[1.0625rem]">{p.body}</p>
    </div>
  );
}

/* A phone's single page: the print across the top with its caption on it,
   the pillar written on the ruled paper beneath — kept short enough that
   the whole page fits on screen without scrolling. */
function PadPage({ img, p, i, n }) {
  return (
    <div className="flex h-full flex-col bg-[#fffdf8]">
      <div className="px-3.5 pt-8">
        <figure className="relative aspect-[16/10] overflow-hidden rounded-md bg-royal-900/5 shadow-[0_10px_22px_-14px_rgba(20,34,68,0.6)]">
          <img
            src={img.src}
            srcSet={img.srcSet}
            sizes="90vw"
            alt={img.alt}
            loading="lazy"
            decoding="async"
            style={{ objectPosition: img.focus }}
            className="h-full w-full object-cover"
          />
          <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/65 to-transparent px-3 pb-2 pt-6 font-display text-[0.8125rem] italic text-white">
            {img.caption}
          </figcaption>
        </figure>
      </div>
      <div className="relative flex-1 bg-[repeating-linear-gradient(to_bottom,transparent_0,transparent_27px,rgb(41_71_145/0.12)_27px,rgb(41_71_145/0.12)_28px)] px-4 pb-5 pl-10 pt-3">
        <span aria-hidden="true" className="absolute inset-y-0 left-6 w-px bg-ember-500/45" />
        <div className="flex items-center justify-between gap-4">
          <PillarIcon index={i} />
          <span className="font-display text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-ink-mute">
            Page {String(i + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}
          </span>
        </div>
        <h3 className="mt-2 font-display text-[1.25rem] font-semibold leading-7 tracking-[-0.02em] text-ink">
          <span className="bg-[linear-gradient(transparent_62%,rgb(253_224_71/0.6)_62%)] [box-decoration-break:clone]">{p.title}</span>
        </h3>
        <p className="mt-0 text-[0.9375rem] leading-7 text-ink-soft">{p.body}</p>
      </div>
    </div>
  );
}

/**
 * The school's four pillars, written up in an exercise book.
 *
 * A spiral-bound spread: a photograph taped to the left page, the pillar
 * written on ruled paper on the right. Every few seconds the right-hand
 * leaf turns over in 3D — its back carrying the next photograph down onto
 * the left page as the next page of writing is uncovered beneath it.
 * Clicking the right-hand page turns forward, the left-hand page turns
 * back (the leaf lifts off the left and settles on the right), and the
 * sticky-note tabs on the edge jump to a pillar. Pointing at the book holds
 * the page; it only turns while on screen, and reduced motion swaps pages
 * without the turn.
 */
export function SchoolNotebook({ pillars, photos, className = "" }) {
  const N = pillars.length;
  const ref = useRef(null);
  const inView = useInView(ref, { margin: "0px 0px -20% 0px" });
  const still = useReducedMotion();
  const wide = useWide();
  const [page, setPage] = useState(0);
  /* The page being turned to, and which way: 1 forward, -1 back. */
  const [turn, setTurn] = useState(null);
  const [held, setHeld] = useState(false);

  const flipping = turn !== null;
  const next = flipping ? turn.to : null;
  const showing = flipping ? next : page;

  const go = (i, dir = i > page ? 1 : -1) => {
    if (flipping || i === page) return;
    if (still) setPage(i);
    else setTurn({ to: i, dir });
  };
  const forward = () => go((page + 1) % N, 1);
  const back = () => go((page - 1 + N) % N, -1);

  useEffect(() => {
    if (!inView || still || held || flipping) return;
    const t = setTimeout(() => setTurn({ to: (page + 1) % N, dir: 1 }), STEP_MS);
    return () => clearTimeout(t);
  }, [inView, still, held, flipping, page, N]);

  const tilt = (i) => [-2.5, 2, -1.5, 3][i % 4];
  const finish = () => {
    setPage(next);
    setTurn(null);
  };

  const tabs = (
    <div className="mt-5 flex justify-center gap-2 md:absolute md:right-0 md:top-10 md:mt-0 md:flex-col md:gap-3">
      {pillars.map((pl, i) => {
        const on = i === showing;
        return (
          <button
            key={pl.title}
            type="button"
            onClick={() => go(i)}
            aria-label={`Turn to ${pl.title}`}
            aria-current={on}
            className={`${TABS[i % TABS.length]} rounded-md px-3 py-2 font-display text-xs font-bold tabular-nums text-ink/75 shadow-sm transition-transform duration-300 hover:-translate-y-0.5 md:rounded-l-none md:rounded-r-md md:px-2 md:py-4 md:hover:translate-x-1 md:hover:translate-y-0 ${
              on ? "-translate-y-1 md:translate-x-2 md:translate-y-0" : ""
            }`}
          >
            {String(i + 1).padStart(2, "0")}
          </button>
        );
      })}
    </div>
  );

  /* Phone: a top-bound notepad, one page at a time — photo across the top,
     the pillar written below — and each page flips up over the binding to
     show the next one underneath. Tapping the page turns it. Every page is
     laid in the same grid cell, so the pad is exactly as tall as its
     longest page and needs no fixed height. */
  if (!wide) {
    return (
      <div ref={ref} className={`relative mx-auto max-w-sm ${className}`}>
        <div className="relative pt-4" style={{ perspective: 1600 }}>
          {/* the pages still to come, peeking out below */}
          <span aria-hidden="true" className="absolute inset-x-3 -bottom-2 top-8 rounded-2xl bg-[#f3eee3] shadow-sm" />
          <span aria-hidden="true" className="absolute inset-x-1.5 -bottom-1 top-6 rounded-2xl bg-[#f8f4ea] shadow-sm" />

          <button
            type="button"
            onClick={forward}
            aria-label="Turn the page"
            className="relative grid w-full overflow-hidden rounded-2xl text-left shadow-[0_24px_50px_-28px_rgba(20,34,68,0.6)] outline-none focus-visible:ring-2 focus-visible:ring-ember-500"
          >
            {pillars.map((pl, i) => (
              <div key={pl.title} aria-hidden={i !== showing} className={`[grid-area:1/1] ${i === showing ? "" : "invisible"}`}>
                <PadPage img={photos[i]} p={pl} i={i} n={N} />
              </div>
            ))}
          </button>

          {flipping && (
            <motion.div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 bottom-0 top-4 overflow-hidden rounded-2xl shadow-xl"
              style={{ transformOrigin: "top center", ...faceStyle }}
              initial={{ rotateX: 0, opacity: 1 }}
              animate={{ rotateX: 105, opacity: [1, 1, 0] }}
              transition={{ duration: 0.75, ease: [0.45, 0.05, 0.3, 1], opacity: { duration: 0.75, times: [0, 0.7, 1] } }}
              onAnimationComplete={finish}
            >
              <PadPage img={photos[page]} p={pillars[page]} i={page} n={N} />
            </motion.div>
          )}

          {/* the spiral binding across the top */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-x-5 top-0 z-[2] flex justify-between">
            {Array.from({ length: 10 }, (_, k) => (
              <span key={k} className="block h-7 w-2.5 rounded-full border-2 border-stone-400 bg-gradient-to-r from-stone-100 to-stone-300 shadow-sm" />
            ))}
          </div>
        </div>
        {tabs}
      </div>
    );
  }

  /* Laptop: which page sits where while a leaf is in the air. Going
     forward, the current photo stays on the left and the next page of
     writing waits on the right; going back, the previous photo waits on
     the left and the current writing stays on the right until covered. */
  const dir = flipping ? turn.dir : 1;
  const leftImg = flipping && dir < 0 ? next : page;
  const rightText = flipping && dir > 0 ? next : page;
  const leafFront = dir > 0 ? page : next;
  const leafBack = dir > 0 ? next : page;

  return (
    <div ref={ref} className={`relative mx-auto max-w-5xl pr-10 ${className}`}>
      <div
        className="relative grid h-[30rem] grid-cols-2 rounded-2xl bg-royal-900 p-2 shadow-[0_40px_80px_-40px_rgba(20,34,68,0.7)] lg:h-[33rem]"
        style={{ perspective: 2200 }}
        onMouseEnter={() => setHeld(true)}
        onMouseLeave={() => setHeld(false)}
      >
        <div className="relative overflow-hidden rounded-l-xl">
          <PhotoPage img={photos[leftImg]} tilt={tilt(leftImg)} />
          {flipping && dir < 0 && <LiftShadow />}
        </div>
        <div className="relative overflow-hidden rounded-r-xl">
          <WritingPage p={pillars[rightText]} i={rightText} n={N} />
          {flipping && dir > 0 && <LiftShadow />}
        </div>

        {/* the leaf being turned — forward it swings right to left; back,
            it lifts off the left page and settles on the right */}
        {flipping && (
          <motion.div
            className="absolute bottom-2 left-1/2 right-2 top-2"
            style={{ transformStyle: "preserve-3d", transformOrigin: "left center" }}
            initial={{ rotateY: dir > 0 ? 0 : -180 }}
            animate={{ rotateY: dir > 0 ? -180 : 0 }}
            transition={{ duration: FLIP_S, ease: [0.45, 0.05, 0.25, 1] }}
            onAnimationComplete={finish}
          >
            <div className="absolute inset-0 overflow-hidden rounded-r-xl" style={faceStyle}>
              <WritingPage p={pillars[leafFront]} i={leafFront} n={N} />
            </div>
            <div className="absolute inset-0 overflow-hidden rounded-l-xl" style={{ ...faceStyle, transform: "rotateY(180deg)" }}>
              <PhotoPage img={photos[leafBack]} tilt={tilt(leafBack)} />
            </div>
          </motion.div>
        )}

        {/* click either page to turn: left goes back, right goes forward */}
        <button
          type="button"
          onClick={back}
          aria-label="Previous page"
          className="group absolute inset-y-2 left-2 z-[3] w-[calc(50%-0.5rem)] cursor-w-resize rounded-l-xl outline-none focus-visible:ring-2 focus-visible:ring-ember-500"
        >
          <TurnHint side="left" />
        </button>
        <button
          type="button"
          onClick={forward}
          aria-label="Next page"
          className="group absolute inset-y-2 right-2 z-[3] w-[calc(50%-0.5rem)] cursor-e-resize rounded-r-xl outline-none focus-visible:ring-2 focus-visible:ring-ember-500"
        >
          <TurnHint side="right" />
        </button>

        {/* the spiral binding */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-y-6 left-1/2 z-[4] flex -translate-x-1/2 flex-col justify-between">
          {Array.from({ length: 11 }, (_, k) => (
            <span key={k} className="block h-2.5 w-6 rounded-full border-2 border-stone-400 bg-gradient-to-r from-stone-100 to-stone-300 shadow-sm" />
          ))}
        </div>
      </div>

      {tabs}
    </div>
  );
}

/* The shadow the lifting leaf throws on the page it uncovers. */
function LiftShadow() {
  return (
    <motion.span
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 bg-royal-950"
      initial={{ opacity: 0.3 }}
      animate={{ opacity: 0 }}
      transition={{ duration: FLIP_S, ease: "easeOut" }}
    />
  );
}

/* A folded corner that appears on the page being pointed at, so it reads
   as something to turn. */
function TurnHint({ side }) {
  const left = side === "left";
  return (
    <span
      aria-hidden="true"
      className={`pointer-events-none absolute bottom-0 flex h-12 w-12 items-end p-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100 ${
        left ? "left-0 justify-start rounded-bl-xl" : "right-0 justify-end rounded-br-xl"
      }`}
      style={{
        background: `linear-gradient(${left ? 45 : -45}deg, rgb(20 34 68 / 0.18) 0 50%, transparent 50%)`,
      }}
    >
      {left ? <ChevronLeft className="h-4 w-4 text-royal-900/70" /> : <ChevronRight className="h-4 w-4 text-royal-900/70" />}
    </span>
  );
}
