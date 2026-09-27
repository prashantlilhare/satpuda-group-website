import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Figure, ReadMore, Reveal, SplitText } from "../ui/Primitives";

const EASE = [0.16, 1, 0.3, 1];

/* ------------------------------------------------------------------ */
/* StoryRange — the group's hills, one peak per chapter                */
/* ------------------------------------------------------------------ */

const BASE = 200;

/** One smooth peak standing on the baseline. Later peaks stand taller. */
function peakPath(i, count) {
  const step = 440 / Math.max(1, count - 1);
  const cx = 30 + i * step;
  const w = step * 2.1;
  const h = 62 + i * 24;
  const l = cx - w / 2;
  const r = cx + w / 2;
  return `M${l} ${BASE} C${l + w * 0.28} ${BASE} ${cx - w * 0.16} ${BASE - h} ${cx} ${BASE - h} C${cx + w * 0.16} ${BASE - h} ${r - w * 0.28} ${BASE} ${r} ${BASE} Z`;
}

const PEAK_FILLS = ["var(--color-royal-900)", "var(--color-royal-800)", "var(--color-royal-700)", "var(--color-royal-600)", "var(--color-royal-500)"];

/**
 * The Satpuda range as the group's own growth chart: every chapter raises
 * one more peak, taller than the last, so by 2022 the reader has watched a
 * single hill become a range. The newest peak carries the ember ridge line.
 *
 * Peaks are drawn back to front (tallest behind), and rise with a transform
 * only — no path morphing, so each step is a composited scale.
 */
function StoryRange({ chapters, reached, className = "" }) {
  const count = chapters.length;
  const order = chapters.map((_, i) => i).reverse();

  return (
    <svg aria-hidden="true" viewBox={`-80 40 640 ${BASE - 10}`} className={`w-full overflow-visible ${className}`}>
      {order.map((i) => {
        const up = i <= reached;
        return (
          <motion.g
            key={i}
            initial={false}
            animate={{ scaleY: up ? 1 : 0.06, opacity: up ? 1 : 0.18 }}
            transition={{ duration: 0.9, ease: EASE, delay: up ? 0.05 : 0 }}
            style={{ transformBox: "fill-box", transformOrigin: "50% 100%" }}
          >
            <path d={peakPath(i, count)} fill={PEAK_FILLS[i % PEAK_FILLS.length]} />
            <path
              d={peakPath(i, count).replace(/ Z$/, "")}
              fill="none"
              stroke={i === reached ? "var(--color-ember-400)" : "rgb(255 255 255 / 0.12)"}
              strokeWidth="2.5"
              vectorEffect="non-scaling-stroke"
              style={{ transition: "stroke 0.5s ease" }}
            />
          </motion.g>
        );
      })}
      <line x1="-80" x2="560" y1={BASE} y2={BASE} stroke="var(--color-stone-line)" strokeWidth="1.5" />
      {chapters.map((c, i) => {
        const step = 440 / Math.max(1, count - 1);
        return (
          <text
            key={c.year}
            x={30 + i * step}
            y={BASE + 24}
            textAnchor="middle"
            className="font-display"
            style={{
              fontSize: 15,
              fontWeight: 600,
              fill: i <= reached ? "var(--color-ink)" : "var(--color-ink-mute)",
              opacity: i <= reached ? 1 : 0.45,
              transition: "opacity 0.5s ease, fill 0.5s ease",
            }}
          >
            {c.year}
          </text>
        );
      })}
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* YearRoll — each digit turns over on its own when the year changes    */
/* ------------------------------------------------------------------ */

function YearRoll({ year, direction }) {
  return (
    <span className="inline-flex" aria-live="polite">
      <span className="sr-only">{year}</span>
      {[...year].map((digit, i) => (
        <span key={i} aria-hidden="true" className="relative inline-block overflow-hidden leading-none">
          {/* holds the width while the digits swap */}
          <span className="invisible">{digit}</span>
          <AnimatePresence initial={false} custom={direction}>
            <motion.span
              key={digit}
              custom={direction}
              className="absolute inset-0"
              variants={{
                enter: (d) => ({ y: `${d * 100}%` }),
                centre: { y: "0%" },
                leave: (d) => ({ y: `${d * -100}%` }),
              }}
              initial="enter"
              animate="centre"
              exit="leave"
              transition={{ duration: 0.6, ease: EASE, delay: i * 0.05 }}
            >
              {digit}
            </motion.span>
          </AnimatePresence>
        </span>
      ))}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Chapter                                                              */
/* ------------------------------------------------------------------ */

/** "Before" is struck through as it scrolls in, and "after" writes in behind it. */
function Shift({ before, after }) {
  return (
    <div className="mt-7 space-y-2.5 border-l-2 border-ember-500 pl-5">
      <p className="text-[0.9375rem] text-ink-mute">
        <span className="mr-2 text-[0.6875rem] font-semibold uppercase tracking-[0.15em] text-ink-mute/80">Before</span>
        <span className="relative">
          {before}
          <motion.span
            aria-hidden="true"
            className="absolute inset-x-0 top-1/2 h-[1.5px] origin-left bg-ember-500/70"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: "0px 0px -25% 0px" }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.35 }}
          />
        </span>
      </p>
      <motion.p
        className="flex items-start gap-2 text-[1.0625rem] font-semibold leading-snug text-ink"
        initial={{ opacity: 0, x: -14 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "0px 0px -25% 0px" }}
        transition={{ duration: 0.7, ease: EASE, delay: 0.9 }}
      >
        <ArrowRight aria-hidden="true" className="mt-[0.2rem] h-4 w-4 shrink-0 text-ember-600" />
        {after}
      </motion.p>
    </div>
  );
}

function Chapter({ chapter, index, total, chapters, onActive }) {
  const ref = useRef(null);

  /* A chapter is "current" while it holds the middle of the screen. One
     observer per chapter, no scroll listener. */
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const io = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && onActive(index),
      { rootMargin: "-50% 0px -50% 0px" },
    );
    io.observe(node);
    return () => io.disconnect();
  }, [index, onActive]);

  return (
    <li ref={ref} className="story-chapter relative lg:flex lg:min-h-[88vh] lg:items-center">
      <div className="w-full py-12 lg:py-16">
        {/* Phones have no sticky panel, so each chapter carries its own year
            and the range as it stood that year. */}
        <div className="mb-6 lg:hidden">
          <p className="font-display text-[4.5rem] font-bold leading-none tracking-[-0.04em] text-royal-700">
            {chapter.year}
          </p>
          <Reveal className="mt-4 max-w-[18rem]">
            <StoryRange chapters={chapters} reached={index} />
          </Reveal>
        </div>

        <Reveal>
          <p className="flex items-center gap-3 text-[0.75rem] font-semibold uppercase tracking-[0.16em] text-ember-600">
            <span>Chapter {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}</span>
            <span aria-hidden="true" className="h-px w-8 bg-ember-500/60" />
            <span className="text-ink-mute">{chapter.place}</span>
          </p>
        </Reveal>

        <SplitText as="h3" className="mt-4 block font-display text-[clamp(1.75rem,3.2vw,2.5rem)] font-semibold leading-[1.1] tracking-[-0.022em] text-ink">
          {chapter.title}
        </SplitText>

        <Shift before={chapter.before} after={chapter.after} />

        <Reveal delay={140}>
          <ReadMore mobileOnly className="mt-6 max-w-xl">
            <p className="text-[1rem] leading-[1.75] text-ink-soft">{chapter.body}</p>
          </ReadMore>
        </Reveal>

        <Reveal delay={200} className="group mt-8">
          <Figure
            mask
            src={chapter.image}
            srcSet={chapter.imageSrcSet}
            sizes="(min-width: 1024px) 50vw, 100vw"
            alt={chapter.imageAlt}
            position={chapter.imageFocus}
            ratio="16 / 10"
            className="rounded-xl"
          >
            <span className="absolute bottom-3 left-3 rounded-full bg-royal-950/80 px-3 py-1 text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-white">
              + {chapter.adds}
            </span>
          </Figure>
        </Reveal>
      </div>
    </li>
  );
}

/* ------------------------------------------------------------------ */
/* StoryJourney                                                         */
/* ------------------------------------------------------------------ */

/**
 * The group's history as a scroll-through story.
 *
 * On a desktop the left column stays pinned: the year turns over digit by
 * digit, the range of hills gains a peak, and the list of what a student
 * can study here grows — all driven by whichever chapter holds the middle
 * of the screen on the right. The work per step is a state change when the
 * chapter changes, never per scroll frame.
 */
export function StoryJourney({ chapters }) {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(1);
  const activeRef = useRef(0);

  const onActive = useCallback((i) => {
    if (i === activeRef.current) return;
    setDirection(i > activeRef.current ? 1 : -1);
    activeRef.current = i;
    setActive(i);
  }, []);

  const current = chapters[active];

  return (
    <div className="lg:grid lg:grid-cols-[0.9fr_1.1fr] lg:gap-16 xl:gap-24">
      <aside className="hidden lg:block">
        <div className="sticky top-[calc(var(--nav-h-compact)+2rem)] flex h-[calc(100svh-var(--nav-h-compact)-4rem)] flex-col justify-center py-6">
          <p className="text-[0.75rem] font-semibold uppercase tracking-[0.16em] text-ink-mute">
            Chapter {String(active + 1).padStart(2, "0")}
            <span className="text-ink-mute/60"> / {String(chapters.length).padStart(2, "0")}</span>
          </p>
          <p className="mt-3 font-display text-[clamp(5rem,9vw,8.5rem)] font-bold leading-none tracking-[-0.045em] text-royal-700 tabular-nums">
            <YearRoll year={current.year} direction={direction} />
          </p>

          <StoryRange chapters={chapters} reached={active} className="mt-10 max-w-[30rem]" />

          <div className="mt-10">
            <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-ink-mute">
              What a student can study here
            </p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {chapters.map((c, i) => {
                const on = i <= active;
                return (
                  <li
                    key={c.year}
                    className={`rounded-full border px-3 py-1 text-[0.8125rem] font-medium transition-[background-color,border-color,color,opacity,transform] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                      on
                        ? "translate-y-0 border-royal-600 bg-royal-600 text-white opacity-100"
                        : "translate-y-1 border-stone-line text-ink-mute opacity-40"
                    }`}
                  >
                    {c.adds}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </aside>

      <ol className="divide-y divide-stone-line lg:divide-y-0">
        {chapters.map((c, i) => (
          <Chapter
            key={c.year}
            chapter={c}
            index={i}
            total={chapters.length}
            chapters={chapters}
            onActive={onActive}
          />
        ))}
      </ol>
    </div>
  );
}
