import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

/**
 * The clicked photograph, brought forward over a dark, blurred page.
 *
 * Rendered into `document.body` through a portal: the tile sits inside a
 * transformed track, and a transformed ancestor would make `position: fixed`
 * fixed to the track rather than to the viewport.
 *
 * The picture grows out of the tile it was clicked on (a FLIP: it is laid
 * out at its final size, pushed back onto the tile's rectangle, then let go),
 * so it reads as that photograph coming forward rather than a new one
 * appearing. Closing just fades it back down — by then the tile has moved on.
 *
 * `frame` is `{ src, alt }`; `origin` is the clicked element's bounding rect.
 * `tone` picks the backdrop: "dark" (near-black) or "gray" (a lighter veil).
 */
export function Lightbox({ frame, origin, onClose, tone = "dark" }) {
  const imgRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [closing, setClosing] = useState(false);

  const close = useCallback(() => setClosing(true), []);

  useLayoutEffect(() => {
    const img = imgRef.current;
    if (!img || !origin) return;
    const to = img.getBoundingClientRect();
    const dx = origin.left + origin.width / 2 - (to.left + to.width / 2);
    const dy = origin.top + origin.height / 2 - (to.top + to.height / 2);
    const s = Math.max(origin.width / to.width, origin.height / to.height);
    img.style.transition = "none";
    img.style.transform = `translate(${dx}px, ${dy}px) scale(${s})`;
    img.getBoundingClientRect(); // commit the starting frame
    img.style.transition = "";
    img.style.transform = "";
    setOpen(true);
  }, [origin]);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && close();
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = overflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [close]);

  useEffect(() => {
    if (!closing) return;
    const t = setTimeout(onClose, 280);
    return () => clearTimeout(t);
  }, [closing, onClose]);

  return createPortal(
    <div
      className="gallery-lightbox"
      data-tone={tone}
      data-open={(open && !closing) || undefined}
      role="dialog"
      aria-modal="true"
      aria-label={frame.alt}
      onClick={close}
    >
      <button type="button" className="gallery-lightbox-close" onClick={close} aria-label="Close" autoFocus>
        <span aria-hidden="true">&times;</span>
      </button>
      <img
        ref={imgRef}
        className="gallery-lightbox-img"
        src={frame.src}
        alt={frame.alt}
        onClick={(e) => e.stopPropagation()}
      />
    </div>,
    document.body,
  );
}
