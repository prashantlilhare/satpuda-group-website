/**
 * The campus photo library.
 *
 * Every photograph the group supplied, re-encoded to WebP at 1600w and 960w
 * (`assets/images/hero-wall/`) and pulled in by glob rather than one import
 * line per file. The hero draws its wall from here, and pages that would
 * otherwise run as unbroken text borrow from it too — always a picture that
 * actually shows what the section is describing.
 */
const wall = import.meta.glob("../assets/images/hero-wall/*.webp", {
  eager: true,
  query: "?url",
  import: "default",
});

const url = (name) => wall[`../assets/images/hero-wall/${name}.webp`];

/** One photograph, by its file id. `focus` keeps faces out of the crop. */
export function photo(id, alt, focus = "50% 50%") {
  return {
    id: `wall-${id}`,
    src: url(`wall-${id}`),
    srcSet: `${url(`wall-${id}-960w`)} 960w, ${url(`wall-${id}`)} 1600w`,
    alt,
    focus,
  };
}
