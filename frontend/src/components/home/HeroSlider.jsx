import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Pause, Play } from "lucide-react";
import { Button } from "../ui/Primitives";
import { heroSlides } from "../../data/hero";

const DURATION = 6500;

export function HeroSlider() {
  const [index, setIndex] = useState(0);
  const [userPaused, setUserPaused] = useState(false);
  const [autoPaused, setAutoPaused] = useState(false); // hover / focus / tab hidden
  const [reduced, setReduced] = useState(false);
  const regionRef = useRef(null);

  const count = heroSlides.length;
  const paused = userPaused || autoPaused || reduced;

  const goTo = useCallback((i) => setIndex(((i % count) + count) % count), [count]);
  const next = useCallback(() => goTo(index + 1), [goTo, index]);
  const prev = useCallback(() => goTo(index - 1), [goTo, index]);

  /* --- honour reduced motion: no autoplay at all ------------------ */
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  /* --- autoplay --------------------------------------------------- */
  useEffect(() => {
    if (paused) return;
    const t = setTimeout(next, DURATION);
    return () => clearTimeout(t);
  }, [index, paused, next]);

  /* --- pause while the tab is in the background ------------------- */
  useEffect(() => {
    const onVisibility = () => setAutoPaused(document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  /* --- arrow-key navigation when the carousel has focus ----------- */
  const onKeyDown = (e) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      prev();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      next();
    }
  };

  const slide = heroSlides[index];

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Satpuda Group highlights"
      onKeyDown={onKeyDown}
      onMouseEnter={() => setAutoPaused(true)}
      onMouseLeave={() => setAutoPaused(false)}
      onFocusCapture={() => setAutoPaused(true)}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setAutoPaused(false);
      }}
      className="on-dark relative isolate flex min-h-[max(32rem,calc(min(100svh,54rem)-var(--nav-h)))] w-full overflow-hidden bg-royal-950"
    >
      {/* ---------- slides ---------- */}
      {heroSlides.map((s, i) => {
        const active = i === index;
        return (
          <div
            key={s.id}
            aria-hidden={!active}
            inert={!active}
            className={`absolute inset-0 transition-opacity duration-[1100ms] ease-[cubic-bezier(0.65,0,0.35,1)] ${
              active ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={s.src}
              srcSet={s.srcSet}
              sizes="100vw"
              alt={s.alt}
              width="1920"
              height="1280"
              loading={i === 0 ? "eager" : "lazy"}
              fetchPriority={i === 0 ? "high" : "low"}
              decoding={i === 0 ? "sync" : "async"}
              style={{ objectPosition: s.focus }}
              className={`h-full w-full object-cover ${active ? "kenburns" : "scale-[1.06]"}`}
            />
            {/* readability scrim: stronger at the bottom-left where copy sits */}
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-[linear-gradient(to_top,rgba(12,21,41,0.92)_0%,rgba(12,21,41,0.72)_28%,rgba(12,21,41,0.36)_58%,rgba(12,21,41,0.22)_100%)]"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-[linear-gradient(to_right,rgba(20,34,68,0.74)_0%,rgba(20,34,68,0.44)_38%,rgba(20,34,68,0.1)_72%,transparent_92%)]"
            />
          </div>
        );
      })}

      {/* ---------- copy ----------
          Top padding matters even though the copy is bottom-aligned: slides
          carry different amounts of text, and on a short viewport the tallest
          one would otherwise run right up to (and past) the top edge. Paired
          with the section's min-h, a tall slide now grows the hero instead of
          having its eyebrow and first heading line clipped away. */}
      <div className="shell relative z-10 flex w-full flex-col justify-end pt-12 pb-12 sm:pt-16 sm:pb-16 lg:pt-20 lg:pb-20">
        <div key={index} className="slide-copy max-w-3xl">
          <p className="eyebrow !text-ember-300">{slide.eyebrow}</p>

          <h1 className="t-display mt-6 text-white">
            {slide.title.map((line, i) => (
              <span key={line} className="block">
                {i === slide.title.length - 1 ? (
                  <span className="relative">
                    {line}
                    <span
                      aria-hidden="true"
                      className="absolute -bottom-1 left-0 hidden h-[3px] w-full bg-ember-500 sm:block"
                    />
                  </span>
                ) : (
                  line
                )}
              </span>
            ))}
          </h1>

          <p className="mt-7 max-w-xl text-[1.0625rem] leading-relaxed text-white/80 sm:text-lg">
            {slide.body}
          </p>

          <div className="mt-9 flex flex-wrap gap-3.5">
            <Button to="/institutes/btech-polytechnic" variant="ember">
              Explore institutions
            </Button>
            <Button to="/contact" variant="ghostLight">
              Contact us
            </Button>
          </div>
        </div>

        {/* ---------- controls ---------- */}
        <div className="mt-11 flex items-end justify-between gap-6 border-t border-white/18 pt-6">
          {/* pagination */}
          <div className="flex min-w-0 flex-1 items-center gap-2.5 sm:gap-3.5">
            {heroSlides.map((s, i) => {
              const active = i === index;
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => goTo(i)}
                  aria-label={`Go to slide ${i + 1}: ${s.eyebrow}`}
                  aria-current={active ? "true" : undefined}
                  className="group/dot relative h-8 min-w-0 flex-1 cursor-pointer sm:max-w-[7rem]"
                >
                  <span className="absolute inset-x-0 top-1/2 h-[3px] -translate-y-1/2 bg-white/22 transition-colors duration-300 group-hover/dot:bg-white/40" />
                  {active && (
                    <span
                      key={`${index}-bar`}
                      data-paused={paused}
                      style={{ "--bar-duration": `${DURATION}ms` }}
                      className="bar-fill absolute inset-x-0 top-1/2 h-[3px] -translate-y-1/2 bg-ember-500"
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* counter + buttons */}
          <div className="flex shrink-0 items-center gap-4 sm:gap-6">
            <p className="hidden font-display text-sm tabular-nums text-white/55 sm:block">
              <span className="text-lg text-white">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="mx-1.5">/</span>
              {String(count).padStart(2, "0")}
            </p>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setUserPaused((v) => !v)}
                aria-label={userPaused ? "Resume slideshow" : "Pause slideshow"}
                className="flex h-11 w-11 items-center justify-center border border-white/28 text-white transition-all duration-300 hover:border-white hover:bg-white hover:text-royal-800"
              >
                {userPaused ? (
                  <Play aria-hidden="true" className="h-4 w-4" />
                ) : (
                  <Pause aria-hidden="true" className="h-4 w-4" />
                )}
              </button>
              <button
                type="button"
                onClick={prev}
                aria-label="Previous slide"
                className="flex h-11 w-11 items-center justify-center border border-white/28 text-white transition-all duration-300 hover:border-white hover:bg-white hover:text-royal-800"
              >
                <ArrowLeft aria-hidden="true" className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={next}
                aria-label="Next slide"
                className="flex h-11 w-11 items-center justify-center border border-white/28 text-white transition-all duration-300 hover:border-white hover:bg-white hover:text-royal-800"
              >
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* screen-reader announcement of the current slide */}
      <p ref={regionRef} aria-live="polite" aria-atomic="true" className="sr-only">
        {`Slide ${index + 1} of ${count}: ${slide.title.join(" ")}`}
      </p>
    </section>
  );
}
