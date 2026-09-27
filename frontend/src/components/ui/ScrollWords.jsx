import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

/**
 * A statement that lights up word by word as it is scrolled through.
 *
 * Every word starts dimmed and reaches full strength in reading order while
 * the paragraph travels from the lower part of the screen to its middle, so
 * the scroll itself reads the line out. Opacity only — the text never moves
 * and never reflows, and it is all in the DOM from the start.
 *
 * Plain strings only. Reduced motion prints the statement at full strength.
 */
export function ScrollWords({ children, as: Tag = "p", className = "" }) {
  const ref = useRef(null);
  const still = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.88", "end 0.55"] });

  if (typeof children !== "string" || still) {
    return (
      <Tag ref={ref} className={className}>
        {children}
      </Tag>
    );
  }

  const words = children.split(" ");

  return (
    <Tag ref={ref} className={className}>
      {words.map((word, i) => (
        <Word key={`${word}-${i}`} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
          {word}
          {i < words.length - 1 ? " " : ""}
        </Word>
      ))}
    </Tag>
  );
}

function Word({ progress, range, children }) {
  const opacity = useTransform(progress, range, [0.2, 1]);
  return <motion.span style={{ opacity }}>{children}</motion.span>;
}
