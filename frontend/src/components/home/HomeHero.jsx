import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Backpack, Cpu, Presentation, Wrench } from "lucide-react";
import { Button } from "../ui/Primitives";
import { HeroRidge } from "../ui/Ridgeline";
import { institutions } from "../../data/institutions";

/** How long each institution stays lit before the highlight moves on. */
const HOLD = 4600;

const byId = (id) => institutions.find((i) => i.id === id);

/* Oldest first — the order the group grew in. `word` finishes the headline
   ("Building …") for that institution; `icon` sits in its chip. */
const ITEMS = [
  { id: "iti", word: "skilled hands.", icon: Wrench },
  { id: "ded-bed", word: "great teachers.", icon: Presentation },
  { id: "school", word: "young minds.", icon: Backpack },
  { id: "btech-polytechnic", word: "engineers.", icon: Cpu },
].map((item) => ({ ...byId(item.id), ...item }));

/**
 * The homepage hero, on paper.
 *
 * Left: "Building …" stated large, the last word changing with each
 * institution letter by letter, and beneath it the four institutions as a
 * row of chips — the lit one fills blue and a red bar runs as its timer.
 * Right: that institution's photograph in an arched frame, with a blue
 * block and a fine outline set off behind it; each new picture rises into the frame from below, and
 * a small card names it. Hovering or focusing a chip holds it. The hero's
 * foot is the same range of hills, in the group's blue.
 */
export function HomeHero() {
  const sectionRef = useRef(null);
  const [frame, setFrame] = useState({ current: 0, previous: null });
  const [held, setHeld] = useState(false);
  const [reduced, setReduced] = useState(false);
  const active = frame.current;

  const goTo = (i) =>
    setFrame((f) => (f.current === i ? f : { current: i, previous: f.current }));

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (held || reduced) return;
    const t = setTimeout(
      () => setFrame((f) => ({ current: (f.current + 1) % ITEMS.length, previous: f.current })),
      HOLD,
    );
    return () => clearTimeout(t);
  }, [active, held, reduced]);

  const hold = (i) => {
    goTo(i);
    setHeld(true);
  };

  const current = ITEMS[active];
  const still = held || reduced;

  return (
    <section
      ref={sectionRef}
      aria-label="Satpuda Group"
      className="home-hero relative isolate overflow-hidden bg-paper text-ink"
    >
      {/* ---------- backdrop: a pale slanted panel with a faint grid ---------- */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="home-hero-panel absolute inset-y-0 right-0" />
        <span className="home-hero-mark">SATPUDA</span>
      </div>

      <div className="home-hero-body shell relative z-10 grid w-full items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
        {/* ---------- headline ---------- */}
        <div className="home-hero-in">
          <p className="eyebrow" style={{ "--i": 0 }}>
            Satpuda Group · Balaghat · Since 1999
          </p>

          <h1 className="home-hero-title mt-5 text-royal-950 sm:mt-6" style={{ "--i": 1 }}>
            <span className="block">Building</span>
            <span className="home-hero-words">
              {(frame.previous === null || frame.previous === active
                ? [active]
                : [frame.previous, active]
              ).map((i) => (
                <span
                  key={`${ITEMS[i].id}-${i === active ? "in" : "out"}`}
                  aria-hidden={i === active ? undefined : "true"}
                  className={`home-hero-word ${i === active ? "is-in" : "is-out"}`}
                >
                  <span className="sr-only">{ITEMS[i].word}</span>
                  {[...ITEMS[i].word].map((ch, k) => (
                    <span
                      key={k}
                      aria-hidden="true"
                      className={`home-hero-ch ${ch === "." ? "is-stop" : ""}`}
                      style={{ "--k": k }}
                    >
                      {ch === " " ? " " : ch}
                    </span>
                  ))}
                </span>
              ))}
            </span>
          </h1>

          <p
            className="mt-5 max-w-md text-[0.9375rem] leading-relaxed text-ink-soft max-sm:hidden sm:text-base lg:mt-[3svh]"
            style={{ "--i": 2 }}
          >
            Four institutions on one campus in Balaghat — a CBSE school, an ITI,
            teacher education and engineering.
          </p>

          <div className="mt-7 flex flex-wrap gap-3 sm:mt-8 lg:mt-[4svh]" style={{ "--i": 3 }}>
            <Button to="/institutes/btech-polytechnic" variant="ember" size="compact">
              Explore institutions
            </Button>
            <Button to="/contact" variant="outline" size="compact">
              Contact us
            </Button>
          </div>

          {/* ---------- the four institutions, as a row of chips ---------- */}
          <ul
            className="home-hero-chips mt-10 grid max-w-xl grid-cols-2 gap-3 max-sm:hidden lg:mt-[5svh]"
            style={{ "--i": 4 }}
            onMouseLeave={() => setHeld(false)}
            onBlur={(e) => {
              if (!e.currentTarget.contains(e.relatedTarget)) setHeld(false);
            }}
          >
            {ITEMS.map((item, i) => {
              const on = i === active;
              const Icon = item.icon;
              return (
                <li key={item.id}>
                  <Link
                    to={item.to}
                    onMouseEnter={() => hold(i)}
                    onFocus={() => hold(i)}
                    aria-current={on ? "true" : undefined}
                    data-on={on}
                    className="home-hero-chip relative flex h-full items-center gap-3 overflow-hidden rounded-xl border px-3 py-2.5"
                  >
                    <span className="home-hero-chip-icon grid h-10 w-10 flex-none place-items-center rounded-full border">
                      <Icon aria-hidden="true" strokeWidth={1.75} className="h-[18px] w-[18px]" />
                    </span>
                    <span className="min-w-0">
                      <span className="block font-display text-sm leading-tight font-bold">
                        {item.shortName}
                      </span>
                      <span className="mt-0.5 block text-[0.625rem] font-semibold tracking-[0.14em] text-ink-mute uppercase">
                        {item.kicker}
                      </span>
                    </span>

                    {on && (
                      <span
                        key={`${active}-${still}`}
                        data-still={still}
                        style={{ "--hold": `${HOLD}ms` }}
                        className="home-hero-timer absolute inset-x-0 bottom-0 h-[2px] origin-left bg-ember-500"
                      />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        {/* ---------- the photograph, in an arched frame ---------- */}
        <div className="home-hero-figure relative mx-auto w-full max-lg:hidden">
          <span aria-hidden="true" className="home-hero-back absolute" />
          <span aria-hidden="true" className="home-hero-ring absolute" />

          <div className="home-hero-frame relative overflow-hidden bg-royal-900">
            {ITEMS.map((item, i) => (
              <img
                key={item.id}
                src={item.image}
                alt={i === active ? item.imageAlt : ""}
                aria-hidden={i === active ? undefined : "true"}
                loading={i === 0 ? "eager" : "lazy"}
                fetchPriority={i === 0 ? "high" : "auto"}
                decoding="async"
                data-state={i === active ? "on" : i === frame.previous ? "prev" : "off"}
                className="home-hero-photo absolute inset-0 h-full w-full object-cover"
              />
            ))}
            <span aria-hidden="true" className="home-hero-shade absolute inset-0" />
          </div>

          <p className="home-hero-tag absolute font-display">
            4 institutions
            <span className="block text-[0.625rem] font-semibold tracking-[0.16em] uppercase opacity-80">
              One campus
            </span>
          </p>

          <Link
            key={current.id}
            to={current.to}
            className="home-hero-card group/card absolute flex items-center gap-4 rounded-xl bg-white p-4 pr-5"
          >
            <span className="font-display text-2xl font-extrabold tabular-nums text-ember-500">
              {String(active + 1).padStart(2, "0")}
            </span>
            <span className="min-w-0">
              <span className="block text-[0.625rem] font-semibold tracking-[0.16em] text-ink-mute uppercase">
                {current.kicker}
              </span>
              <span className="mt-0.5 block font-display text-[0.9375rem] leading-snug font-bold text-royal-950">
                {current.name}
              </span>
            </span>
            <ArrowUpRight
              aria-hidden="true"
              className="h-5 w-5 flex-none text-royal-600 transition-transform duration-300 group-hover/card:translate-x-0.5 group-hover/card:-translate-y-0.5"
            />
          </Link>
        </div>
      </div>

      {/* the lower edge, cut as the Satpuda hills */}
      <HeroRidge
        target={sectionRef}
        farFill="rgb(41 71 145 / 0.1)"
        midFill="var(--color-royal-800)"
        fill="var(--color-royal-950)"
      />

      <p aria-live="polite" aria-atomic="true" className="sr-only">
        {`Building ${current.word} — ${current.name}`}
      </p>
    </section>
  );
}
