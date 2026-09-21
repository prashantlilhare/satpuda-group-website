import { Figure, Reveal } from "../ui/Primitives";
import { stagger } from "../ui/stagger";

/**
 * A short row of campus photographs for pages that would otherwise run as
 * unbroken text.
 *
 * Deliberately small and even — three or four frames on one line, a caption
 * under each, no oversized lead image. It is there to show the place, not to
 * take the page over, so anything that cannot be illustrated honestly is left
 * without a grid rather than filled with a generic picture.
 */
export function PhotoGrid({ items, ratio = "4 / 3", className = "" }) {
  return (
    <div className={`grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4 ${className}`}>
      {items.map((item, i) => (
        <Reveal key={item.id} delay={stagger(i % 4)} className="group">
          <Figure
            src={item.src}
            srcSet={item.srcSet}
            sizes="(min-width: 1024px) 25vw, 50vw"
            alt={item.alt}
            ratio={ratio}
            position={item.focus}
          />
          {item.caption && (
            <p className="mt-3 text-[0.8125rem] leading-snug text-ink-mute">{item.caption}</p>
          )}
        </Reveal>
      ))}
    </div>
  );
}
