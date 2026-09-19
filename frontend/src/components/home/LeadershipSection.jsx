import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Compass } from "lucide-react";
import { Eyebrow } from "../ui/Primitives";
import { leadershipCards } from "../../data/leadership";

export function LeadershipSection() {
  const containerRef = useRef(null);
  const stickyRef = useRef(null);
  const trackRef = useRef(null);
  const mobileTrackRef = useRef(null);

  const [progress, setProgress] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDesktop, setIsDesktop] = useState(
    typeof window !== "undefined" ? window.innerWidth >= 1024 : true
  );

  // Responsive desktop detection
  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Desktop vertical-to-horizontal pinned scroll logic
  useEffect(() => {
    if (!isDesktop) return;
    let frame = 0;

    const onScroll = () => {
      frame = 0;
      const container = containerRef.current;
      const sticky = stickyRef.current;
      const track = trackRef.current;
      if (!container || !sticky || !track) return;

      const totalTravel = container.offsetHeight - sticky.offsetHeight;
      if (totalTravel <= 0) return;

      const rect = container.getBoundingClientRect();
      const scrolled = -rect.top;
      const rawProgress = Math.max(0, Math.min(1, scrolled / totalTravel));
      setProgress(rawProgress);

      const maxTranslate = Math.max(
        0,
        track.scrollWidth - window.innerWidth + 96
      );
      setTranslateX(rawProgress * maxTranslate);

      const currentCard = Math.min(
        leadershipCards.length - 1,
        Math.floor(rawProgress * leadershipCards.length + 0.15)
      );
      setActiveIndex(currentCard);
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(onScroll);
    };

    onScroll();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [isDesktop]);

  // Mobile horizontal scroll tracking
  const handleMobileScroll = () => {
    const el = mobileTrackRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    if (max <= 0) return;
    const ratio = Math.max(0, Math.min(1, el.scrollLeft / max));
    setProgress(ratio);
    const idx = Math.min(
      leadershipCards.length - 1,
      Math.round(ratio * (leadershipCards.length - 1))
    );
    setActiveIndex(idx);
  };

  // Click to jump to specific card
  const scrollToCard = (index) => {
    if (isDesktop) {
      const container = containerRef.current;
      const sticky = stickyRef.current;
      if (!container || !sticky) return;
      const totalTravel = container.offsetHeight - sticky.offsetHeight;
      const targetProgress = index / (leadershipCards.length - 1);
      const containerTop =
        container.getBoundingClientRect().top + window.scrollY;
      const targetY = containerTop + targetProgress * totalTravel;
      window.scrollTo({ top: targetY, behavior: "smooth" });
    } else {
      const el = mobileTrackRef.current;
      if (!el) return;
      const cardWidth = el.scrollWidth / leadershipCards.length;
      el.scrollTo({ left: index * cardWidth, behavior: "smooth" });
    }
  };

  const handleNext = () => {
    const nextIdx = Math.min(leadershipCards.length - 1, activeIndex + 1);
    scrollToCard(nextIdx);
  };

  const handlePrev = () => {
    const prevIdx = Math.max(0, activeIndex - 1);
    scrollToCard(prevIdx);
  };

  return (
    <section
      ref={containerRef}
      className="relative bg-paper-dim text-ink"
      style={
        isDesktop
          ? { height: `${(leadershipCards.length - 1) * 60 + 130}vh` }
          : undefined
      }
    >
      {isDesktop ? (
        /* ================= DESKTOP PINNED HORIZONTAL VIEW ================= */
        <div
          ref={stickyRef}
          className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between py-10 lg:py-12 bg-paper-dim"
        >
          {/* Header Row */}
          <div className="shell w-full shrink-0">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 border-b border-stone-line pb-6">
              <div>
                <Eyebrow>Leadership</Eyebrow>
                <h2 className="mt-2 font-display text-2xl font-semibold tracking-[-0.015em] text-ink sm:text-3xl lg:text-4xl">
                  The people accountable for it.
                </h2>
                <p className="mt-2 max-w-2xl text-sm lg:text-base text-ink-mute">
                  Six leaders, in their own words — on what the group is trying to build, and what students can expect when they arrive.
                </p>
              </div>

              {/* Scroll indicator hint */}
              <div className="hidden lg:flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.13em] text-royal-700 bg-white border border-stone-line rounded-full px-4 py-2 shadow-xs">
                <Compass className="h-4 w-4 text-ember-600 animate-spin [animation-duration:9s]" />
                <span>Scroll down to explore</span>
              </div>
            </div>
          </div>

          {/* Cards Track */}
          <div className="relative w-full overflow-hidden my-auto py-2">
            <div
              ref={trackRef}
              className="flex gap-8 pl-8 sm:pl-16 lg:pl-24 pr-24 will-change-transform"
              style={{
                transform: `translate3d(-${translateX}px, 0, 0)`,
                transition: "transform 0.12s cubic-bezier(0.16, 1, 0.3, 1)",
              }}
            >
              {leadershipCards.map((card, i) => (
                <article
                  key={card.id}
                  className={`group relative flex flex-col justify-between rounded-2xl border bg-white p-7 lg:p-8 shadow-xs transition-all duration-300 shrink-0 w-[480px] sm:w-[580px] lg:w-[650px] xl:w-[700px] min-h-[440px] ${
                    i === activeIndex
                      ? "border-ember-500/40 shadow-md ring-1 ring-ember-500/20"
                      : "border-stone-line hover:border-stone-line/80 hover:shadow-sm"
                  }`}
                >
                  {/* Subtle watermark */}
                  <span className="pointer-events-none absolute right-6 bottom-4 select-none font-display text-8xl font-black text-stone-100/90">
                    {card.num}
                  </span>

                  {/* Top Badge & Number */}
                  <div className="relative z-10 flex items-center justify-between">
                    <span className="inline-flex items-center gap-2 rounded-full border border-ember-200 bg-ember-50/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.13em] text-ember-600">
                      <span className="h-1.5 w-1.5 rounded-full bg-ember-500" />
                      {card.category}
                    </span>
                    <span className="font-display text-xs font-semibold tracking-wider text-ink-mute">
                      LEADER #{card.num}
                    </span>
                  </div>

                  {/* Main Content: Two Columns */}
                  <div className="relative z-10 mt-6 flex flex-col sm:flex-row gap-6 sm:gap-7 items-start">
                    {/* Leader Portrait container */}
                    <div className="relative h-48 w-36 sm:h-56 sm:w-44 lg:h-60 lg:w-48 shrink-0 overflow-hidden rounded-xl border border-stone-line bg-royal-900/5 shadow-xs">
                      {card.portrait ? (
                        <img
                          src={card.portrait}
                          alt={card.portraitAlt}
                          className="h-full w-full object-cover object-top transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                          loading="lazy"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-royal-100 text-2xl font-bold text-royal-700">
                          {card.initials}
                        </div>
                      )}
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent p-2 text-center">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-white">
                          {card.initials}
                        </span>
                      </div>
                    </div>

                    {/* Details Column */}
                    <div className="min-w-0 flex-1">
                      <blockquote>
                        <p className="font-display text-[1.125rem] sm:text-[1.25rem] leading-[1.35] tracking-[-0.018em] text-ink">
                          <span aria-hidden="true" className="text-ember-500">
                            “
                          </span>
                          {card.quote}
                          <span aria-hidden="true" className="text-ember-500">
                            ”
                          </span>
                        </p>
                      </blockquote>

                      <div className="mt-4 border-t border-stone-line pt-4">
                        <h3 className="font-display text-[1.125rem] font-semibold tracking-[-0.015em] text-ink">
                          {card.name}
                        </h3>
                        <p className="mt-1 text-[0.8125rem] font-semibold uppercase tracking-[0.13em] text-ember-600">
                          {card.role}{" "}
                          <span className="text-stone-300">·</span>{" "}
                          <span className="font-normal normal-case text-ink-mute">
                            {card.institution}
                          </span>
                        </p>
                        <p className="mt-1 text-[0.8125rem] leading-relaxed text-ink-mute line-clamp-1">
                          {card.qualifications}
                        </p>
                        <p className="mt-2 text-[0.8125rem] leading-relaxed text-ink-mute">
                          {card.description}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Tags */}
                  <div className="relative z-10 mt-6 border-t border-stone-line pt-4 flex flex-wrap gap-2">
                    {card.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md border border-stone-line bg-paper-dim px-2.5 py-1 text-[11px] font-medium text-ink-mute"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Bottom Bar Controls & Progress */}
          <div className="shell w-full shrink-0">
            <div className="flex items-center justify-between border-t border-stone-line pt-5">
              {/* Active Counter */}
              <div className="flex items-baseline gap-2">
                <span className="font-display text-2xl font-bold text-ink">
                  {leadershipCards[activeIndex]?.num || "01"}
                </span>
                <span className="text-sm font-semibold text-ink-mute">
                  / 0{leadershipCards.length}
                </span>
                <span className="hidden sm:inline-block ml-3 text-xs uppercase tracking-widest text-ink-mute">
                  {leadershipCards[activeIndex]?.name}
                </span>
              </div>

              {/* Progress Line */}
              <div className="flex items-center gap-4">
                <div className="relative h-1.5 w-36 sm:w-64 overflow-hidden rounded-full bg-stone-200">
                  <div
                    className="h-full bg-ember-500 transition-all duration-150 ease-out"
                    style={{ width: `${Math.max(8, progress * 100)}%` }}
                  />
                </div>
              </div>

              {/* Navigation Controls */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handlePrev}
                  disabled={activeIndex === 0}
                  aria-label="Previous leadership card"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-stone-line bg-white text-royal-800 transition-all hover:bg-royal-700 hover:text-white hover:border-royal-700 disabled:opacity-30 disabled:pointer-events-none shadow-xs"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  disabled={activeIndex === leadershipCards.length - 1}
                  aria-label="Next leadership card"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-stone-line bg-white text-royal-800 transition-all hover:bg-royal-700 hover:text-white hover:border-royal-700 disabled:opacity-30 disabled:pointer-events-none shadow-xs"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* ================= MOBILE / TABLET SWIPE VIEW ================= */
        <div className="py-16 px-4 sm:px-6">
          <div className="mb-8">
            <Eyebrow>Leadership</Eyebrow>
            <h2 className="mt-2 font-display text-2xl font-semibold tracking-[-0.015em] text-ink sm:text-3xl">
              The people accountable for it.
            </h2>
            <p className="mt-2 text-sm text-ink-mute">
              Swipe horizontally to meet the leadership team across school, vocational, teacher training and engineering colleges.
            </p>
          </div>

          {/* Horizontal swipe track */}
          <div
            ref={mobileTrackRef}
            onScroll={handleMobileScroll}
            className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-6 scrollbar-none"
          >
            {leadershipCards.map((card, i) => (
              <article
                key={card.id}
                className="relative snap-center shrink-0 w-[88vw] max-w-[380px] rounded-2xl border border-stone-line bg-white p-6 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="rounded-full border border-ember-200 bg-ember-50 px-3 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-ember-600">
                      {card.category}
                    </span>
                    <span className="font-display text-xs font-semibold text-ink-mute">
                      #{card.num}
                    </span>
                  </div>

                  <div className="flex gap-4 items-center">
                    <div className="relative h-24 w-20 shrink-0 overflow-hidden rounded-xl border border-stone-line bg-royal-900/5">
                      {card.portrait ? (
                        <img
                          src={card.portrait}
                          alt={card.portraitAlt}
                          className="h-full w-full object-cover object-top"
                          loading="lazy"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-royal-100 text-lg font-bold text-royal-700">
                          {card.initials}
                        </div>
                      )}
                    </div>
                    <div>
                      <h3 className="font-display text-lg font-semibold text-ink leading-tight">
                        {card.name}
                      </h3>
                      <p className="text-[11px] font-semibold uppercase text-ember-600 mt-0.5">
                        {card.role}
                      </p>
                      <p className="text-[10px] text-ink-mute">
                        {card.institution}
                      </p>
                    </div>
                  </div>

                  <blockquote className="mt-4 border-l-2 border-ember-500 pl-3">
                    <p className="font-display text-xs italic text-ink leading-relaxed">
                      “{card.quote}”
                    </p>
                  </blockquote>

                  <p className="mt-3 text-xs leading-relaxed text-ink-mute">
                    {card.description}
                  </p>
                </div>

                <div className="mt-5 border-t border-stone-line pt-3 flex flex-wrap gap-1.5">
                  {card.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded border border-stone-line bg-paper-dim px-2 py-0.5 text-[10px] text-ink-mute"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>

          {/* Mobile bottom counter & dots */}
          <div className="mt-4 flex items-center justify-between border-t border-stone-line pt-4">
            <div className="flex items-center gap-1.5">
              {leadershipCards.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => scrollToCard(i)}
                  className={`h-2 rounded-full transition-all ${
                    i === activeIndex
                      ? "w-6 bg-ember-500"
                      : "w-2 bg-stone-300"
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>

            <span className="font-display text-xs font-semibold text-ink">
              0{activeIndex + 1} / 0{leadershipCards.length}
            </span>
          </div>
        </div>
      )}
    </section>
  );
}
