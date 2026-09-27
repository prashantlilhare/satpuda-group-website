import { SectionHeading } from "../ui/Primitives";
import { RoundCarousel } from "./RoundCarousel";

/** An institution's photo gallery: a heading over a turning ring of photographs. */
/* `tone` picks the band colour, so a page can keep neighbouring sections
   alternating — two paper-dim bands in a row read as one oversized gap. */
export function InstituteGallery({ items, eyebrow = "Gallery", title, lead, tone = "dim" }) {
  return (
    <section className={`section overflow-x-clip ${tone === "paper" ? "bg-paper" : "bg-paper-dim"}`}>
      <div className="shell">
        <SectionHeading eyebrow={eyebrow} title={title} lead={lead} />
        <div className="section-body">
          <RoundCarousel items={items} />
        </div>
      </div>
    </section>
  );
}
