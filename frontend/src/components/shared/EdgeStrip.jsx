import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";

const EASE = [0.16, 1, 0.3, 1];
/* How long the highlight rests on each point. */
const HOLD_MS = 3000;

/**
 * What sets the college apart, in four photographs.
 *
 * Each print wipes up into place once, one after another. Then a slow
 * highlight walks along them: the current one comes up in full colour, its
 * number turns to the accent and a rule draws across its top for as long as
 * it stays lit. Pointing at one holds it. It only moves while on screen;
 * reduced motion keeps the hover and drops the walk.
 */
export function EdgeStrip({ items, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { margin: "0px 0px -15% 0px" });
  const seen = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });
  const still = useReducedMotion();
  const on = seen || still;
  const [active, setActive] = useState(0);
  const [held, setHeld] = useState(false);

  useEffect(() => {
    if (!seen || !inView || still || held) return;
    const t = setTimeout(() => setActive((a) => (a + 1) % items.length), HOLD_MS);
    return () => clearTimeout(t);
  }, [seen, inView, still, held, active, items.length]);

  return (
    <ol
      ref={ref}
      className={`grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 ${className}`}
      onMouseLeave={() => setHeld(false)}
    >
      {items.map((item, i) => {
        const now = still ? !held || i === active : i === active;
        return (
          <li
            key={item.title}
            className="relative cursor-default"
            onMouseEnter={() => {
              setHeld(true);
              setActive(i);
            }}
          >
            {/* the rule across the top, drawn while this one is lit */}
            <span aria-hidden="true" className="absolute inset-x-0 top-0 h-[2px] bg-stone-line">
              {i === active && (
                <motion.span
                  key={held ? "held" : `run-${active}`}
                  className="absolute inset-0 origin-left bg-ember-500"
                  initial={{ scaleX: held || still ? 1 : 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: held || still ? 0.3 : HOLD_MS / 1000, ease: held ? EASE : "linear" }}
                />
              )}
            </span>

            <div className="flex items-baseline justify-between pt-5">
              <span
                className={`font-display text-xs font-semibold tabular-nums transition-colors duration-500 ${now ? "text-ember-600" : "text-ink-mute"}`}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-[0.75rem] font-semibold uppercase tracking-[0.14em] text-ink-mute">{item.tag}</span>
            </div>

            <motion.div
              className="mt-4 overflow-hidden rounded-sm bg-royal-900"
              initial={{ clipPath: still ? "inset(0% 0% 0% 0%)" : "inset(100% 0% 0% 0%)" }}
              animate={on ? { clipPath: "inset(0% 0% 0% 0%)" } : undefined}
              transition={{ duration: still ? 0 : 1, delay: still ? 0 : 0.15 + i * 0.15, ease: EASE }}
            >
              <img
                src={item.image.src}
                srcSet={item.image.srcSet}
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                alt={item.image.alt}
                loading="lazy"
                decoding="async"
                style={{ objectPosition: item.image.focus }}
                className={`aspect-[4/3] w-full object-cover transition-[filter,transform] duration-700 ease-out ${
                  now ? "scale-[1.03] grayscale-0" : "grayscale-[55%]"
                }`}
              />
            </motion.div>

            <h3 className="mt-5 font-display text-[1.1875rem] font-semibold leading-snug tracking-[-0.018em] text-ink">
              {item.title}
            </h3>
            <p className="mt-2.5 text-[0.9375rem] leading-[1.7] text-ink-soft">{item.body}</p>
          </li>
        );
      })}
    </ol>
  );
}
