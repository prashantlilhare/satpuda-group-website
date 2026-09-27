import { useLayoutEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { useDashDraw } from "../../hooks/useDashDraw";

/* On a desktop the second row runs right to left, so the road can wind
   back along it like a road climbing a hillside. Order classes, not a
   reversed array, so the list is still read 1999 → 2022 by assistive tech. */
const DESKTOP_ORDER = ["lg:order-1", "lg:order-2", "lg:order-3", "lg:order-6", "lg:order-5", "lg:order-4"];

/**
 * Builds the road through the markers' centres.
 *
 * Along a row it runs straight. Where a desktop row ends, it carries on
 * along the marker line out past the last column to the edge of the grid,
 * turns down in a hairpin there — clear of any text — and comes back in
 * along the next row. On a phone every marker is stacked, so the road is a
 * plain line down the left.
 */
function roadThrough(points, wide, width) {
  if (!points.length) return "";
  let d = `M${points[0].x} ${points[0].y}`;
  for (let i = 1; i < points.length; i++) {
    const a = points[i - 1];
    const b = points[i];
    const turn = wide && Math.abs(a.x - b.x) < 40 && b.y > a.y;
    if (turn) {
      const edge = width + 8;
      const r = Math.min(56, (b.y - a.y) / 2);
      d += ` L${edge - r} ${a.y} C${edge + r * 0.55} ${a.y} ${edge + r * 0.55} ${b.y} ${edge - r} ${b.y} L${b.x} ${b.y}`;
    } else {
      d += ` L${b.x} ${b.y}`;
    }
  }
  return d;
}

/**
 * "How the group grew", as a road through the years.
 *
 * The milestones sit in a grid; a road is drawn through a marker on each
 * one, measured from the laid-out page so it follows whatever the grid
 * does at any width. Scrolling draws the road on from 1999 and each
 * marker fills as the reader reaches its milestone.
 */
export function MilestoneRoad({ items }) {
  const wrap = useRef(null);
  const markers = useRef([]);
  const [road, setRoad] = useState({ d: "", w: 0, h: 0 });

  const { scrollYProgress } = useScroll({ target: wrap, offset: ["start 75%", "end 65%"] });
  const drawn = useSpring(scrollYProgress, { stiffness: 90, damping: 22, mass: 0.5 });
  const roadDraw = useDashDraw(drawn);

  useLayoutEffect(() => {
    const node = wrap.current;
    if (!node) return;

    const measure = () => {
      const box = node.getBoundingClientRect();
      const wide = window.matchMedia("(min-width: 1024px)").matches;
      const points = markers.current
        .filter(Boolean)
        .map((m) => {
          const r = m.getBoundingClientRect();
          return { x: r.left + r.width / 2 - box.left, y: r.top + r.height / 2 - box.top, order: Number(m.dataset.index) };
        })
        .sort((p, q) => p.order - q.order);
      setRoad({ d: roadThrough(points, wide, box.width), w: box.width, h: box.height });
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(node);
    return () => observer.disconnect();
  }, [items.length]);

  return (
    <div ref={wrap} className="relative section-body">
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
        viewBox={`0 0 ${road.w || 1} ${road.h || 1}`}
      >
        <path d={road.d} fill="none" stroke="var(--color-stone-line)" strokeWidth="2" strokeDasharray="1 7" strokeLinecap="round" />
        <path
          {...roadDraw}
          d={road.d}
          fill="none"
          stroke="var(--color-royal-600)"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </svg>

      <ol className="relative grid gap-12 lg:grid-cols-3 lg:gap-x-16 lg:gap-y-16">
        {items.map((m, i) => (
          <motion.li
            key={m.title}
            className={`relative pl-11 lg:pl-0 lg:pt-11 ${DESKTOP_ORDER[i] ?? ""}`}
            initial="ahead"
            whileInView="reached"
            viewport={{ once: true, margin: "0px 0px -30% 0px" }}
          >
            <motion.span
              ref={(el) => {
                markers.current[i] = el;
              }}
              data-index={i}
              aria-hidden="true"
              className="absolute left-0 top-1 flex h-6 w-6 items-center justify-center rounded-full border-2 border-royal-600 lg:top-0"
              variants={{
                ahead: { backgroundColor: "rgb(250 248 245)", scale: 0.8 },
                reached: { backgroundColor: "rgb(41 71 145)", scale: 1, transition: { type: "spring", stiffness: 420, damping: 16 } },
              }}
            >
              <motion.span
                className="h-2 w-2 rounded-full bg-white"
                variants={{ ahead: { scale: 0 }, reached: { scale: 1, transition: { delay: 0.15 } } }}
              />
            </motion.span>

            <motion.div
              variants={{
                ahead: { opacity: 0, y: 14 },
                reached: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 } },
              }}
            >
              <p
                className="font-display text-[2.25rem] font-semibold leading-none tracking-[-0.03em] text-royal-700"
                style={{ fontVariationSettings: '"opsz" 72' }}
              >
                {m.year}
              </p>
              <h3 className="mt-4 font-display text-[1.1875rem] font-semibold tracking-[-0.018em] text-ink">
                {m.title}
              </h3>
              <p className="mt-3 text-[0.9375rem] leading-[1.7] text-ink-soft">{m.body}</p>
            </motion.div>
          </motion.li>
        ))}
      </ol>
    </div>
  );
}
