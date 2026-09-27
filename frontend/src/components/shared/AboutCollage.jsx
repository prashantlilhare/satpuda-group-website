import { Figure, Reveal } from "../ui/Primitives";
import { stagger } from "../ui/stagger";

/**
 * Three photographs beside an institution's short "about" copy: one tall
 * picture carrying the column, two smaller ones stacked beside it. Each item
 * is `{ src, srcSet?, alt, position? }` — the shape `photo()` returns, or a
 * plain campus image with an alt.
 */
export function AboutCollage({ items }) {
  const [main, ...rest] = items;

  return (
    <div className="grid grid-cols-[1.25fr_1fr] gap-4 sm:gap-5">
      <Reveal className="group row-span-2 h-full">
        <Figure
          mask
          src={main.src}
          srcSet={main.srcSet}
          sizes="(min-width: 1024px) 26vw, 55vw"
          alt={main.alt}
          /* Roughly the height of the two squares beside it plus their gap,
             so the stretched frame barely has to crop. */
          ratio="5 / 8"
          position={main.position ?? main.focus}
          className="h-full rounded-lg"
        />
      </Reveal>
      {rest.slice(0, 2).map((img, i) => (
        <Reveal key={img.alt} delay={stagger(i + 1)} className="group">
          <Figure
            src={img.src}
            srcSet={img.srcSet}
            sizes="(min-width: 1024px) 20vw, 45vw"
            alt={img.alt}
            ratio="1 / 1"
            position={img.position ?? img.focus}
            className="rounded-lg"
          />
        </Reveal>
      ))}
    </div>
  );
}
