import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { startSmoothScroll, stopSmoothScroll } from "../../lib/smoothScroll";
import { campusMapUrl } from "../../data/itiCampuses";
import { itiTrades } from "../../data/programs";

const EASE = "cubic-bezier(0.16, 1, 0.3, 1)";
const OPEN_MS = 520;
const CLOSE_MS = 380;

/* One labelled line of the campus record. */
function Row({ label, note, children }) {
  return (
    <div className="grid gap-1 border-b border-stone-line py-3 sm:grid-cols-[9rem_1fr] sm:gap-4">
      <dt className="text-[0.6875rem] font-semibold uppercase tracking-[0.13em] text-ink-mute sm:pt-0.5">{label}</dt>
      <dd className="text-[0.9375rem] text-ink">
        {children}
        {note && <span className="mt-0.5 block text-[0.75rem] text-ink-mute">{note}</span>}
      </dd>
    </div>
  );
}

const NotPublished = () => <span className="text-ink-mute">Not published</span>;

/**
 * A campus's full record, grown out of the card it was opened from.
 *
 * The panel is laid out at its final size, pushed back onto the card's
 * rectangle, then let go (a FLIP, as in `Lightbox`), so it reads as the
 * card itself scaling up into a page. Closing runs the same move in
 * reverse — the card is still on the page to shrink back into.
 *
 * Portalled to `document.body` so no transformed ancestor can capture
 * `position: fixed`. Esc, the close button or a click on the backdrop
 * closes it; the page behind is scroll-locked while it is open.
 */
export function CampusSheet({ campus, origin, onClose }) {
  const panelRef = useRef(null);
  const closeRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [closing, setClosing] = useState(false);

  /* The transform that sits the panel exactly on the card. */
  const toOrigin = useCallback(() => {
    const panel = panelRef.current;
    if (!panel || !origin) return "scale(0.9)";
    const to = panel.getBoundingClientRect();
    const dx = origin.left + origin.width / 2 - (to.left + to.width / 2);
    const dy = origin.top + origin.height / 2 - (to.top + to.height / 2);
    return `translate(${dx}px, ${dy}px) scale(${origin.width / to.width}, ${origin.height / to.height})`;
  }, [origin]);

  useLayoutEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!still) {
      panel.style.transition = "none";
      panel.style.transform = toOrigin();
      panel.getBoundingClientRect(); // commit the starting frame
      panel.style.transition = `transform ${OPEN_MS}ms ${EASE}`;
      panel.style.transform = "";
    }
    setOpen(true);
    closeRef.current?.focus({ preventScroll: true });
  }, [toOrigin]);

  const close = useCallback(() => {
    const panel = panelRef.current;
    if (panel && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      panel.style.transition = `transform ${CLOSE_MS}ms ${EASE}`;
      panel.style.transform = toOrigin();
    }
    setClosing(true);
  }, [toOrigin]);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && close();
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    stopSmoothScroll();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = overflow;
      startSmoothScroll();
      window.removeEventListener("keydown", onKey);
    };
  }, [close]);

  useEffect(() => {
    if (!closing) return;
    const t = setTimeout(onClose, CLOSE_MS);
    return () => clearTimeout(t);
  }, [closing, onClose]);

  const shown = open && !closing;
  const c = campus;
  const person = c.principal
    ? { label: "Principal", value: c.principal }
    : c.contactPerson
      ? { label: "Contact person", value: c.contactPerson }
      : null;

  return createPortal(
    <div
      className="fixed inset-0 z-[90] flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="campus-sheet-title"
      onClick={close}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-royal-900/55 backdrop-blur-[3px] transition-opacity duration-300"
        style={{ opacity: shown ? 1 : 0 }}
      />

      <div
        ref={panelRef}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-[44rem] origin-center overflow-hidden rounded-2xl bg-paper shadow-[0_40px_90px_-30px_rgba(10,20,45,0.6)]"
      >
        {/* the record fades in once the panel has mostly grown, and out
            before it shrinks, so text is never seen squashed */}
        <div
          data-lenis-prevent
          className="max-h-[min(88vh,52rem)] overflow-y-auto transition-opacity"
          style={{
            opacity: shown ? 1 : 0,
            transitionDuration: shown ? "260ms" : "140ms",
            transitionDelay: shown ? "180ms" : "0ms",
          }}
        >
          <header className="relative bg-royal-900 px-6 pb-7 pt-6 text-white sm:px-8">
            <div className="flex items-start justify-between gap-4">
              <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-ember-300">
                {c.district} district · Madhya Pradesh
              </p>
              <button
                ref={closeRef}
                type="button"
                onClick={close}
                aria-label="Close"
                className="-mr-2 -mt-2 grid h-10 w-10 shrink-0 place-items-center rounded-full text-white/70 transition-colors hover:bg-white/10 hover:text-white"
              >
                <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
            </div>
            <h2 id="campus-sheet-title" className="mt-3 font-display text-[1.625rem] font-semibold leading-tight tracking-[-0.02em] sm:text-[1.875rem]">
              {c.name}
            </h2>
            <p className="mt-1 text-white/70">{c.location}</p>
            {c.head && (
              <span className="mt-4 inline-block rounded-full bg-ember-500 px-2.5 py-1 text-[0.625rem] font-semibold uppercase tracking-[0.12em] text-white">
                Head office
              </span>
            )}
          </header>

          <div className="px-6 py-4 sm:px-8">
            <dl>
              <Row label="Address">{c.address}</Row>
              <Row label="Established">{c.established ?? <NotPublished />}</Row>
              <Row
                label={person?.label ?? "Principal"}
                note={person ? "As listed on the official campus page" : undefined}
              >
                {person ? <span className="font-semibold">{person.value}</span> : <NotPublished />}
              </Row>
              <Row label="Phone">
                <a href={`tel:${c.phone.replace(/\s/g, "")}`} className="font-semibold tabular-nums text-royal-700 hover:text-ember-600">
                  {c.phone}
                </a>
              </Row>
              <Row label="Email">
                <a href={`mailto:${c.email}`} className="break-all hover:text-royal-700">
                  {c.email}
                </a>
              </Row>
              <Row label="Trades" note={c.trades.length ? "Figure after each trade is the published intake (seats)" : undefined}>
                {c.trades.length ? (
                  <ul className="flex flex-wrap gap-1.5">
                    {c.trades.map(([t, seats]) => {
                      const duration = itiTrades.find((x) => x.name === t)?.duration;
                      return (
                        <li key={t} className="rounded-md bg-royal-700/[0.07] px-2.5 py-1 text-[0.8125rem] text-royal-800">
                          {t}
                          {duration && <span className="text-royal-700/70"> · {duration}</span>}
                          <span className="ml-1.5 font-semibold tabular-nums">{seats}</span>
                        </li>
                      );
                    })}
                  </ul>
                ) : (
                  <NotPublished />
                )}
              </Row>
              <Row label="Affiliation">NCVT, New Delhi · Craftsman Training Scheme</Row>
              {c.dgetRef && (
                <Row label="DGET reference">
                  <span className="font-mono text-[0.875rem]">{c.dgetRef}</span>
                </Row>
              )}
              {c.itiCode && (
                <Row label="ITI code" note="From the Govt. of India list of MP private ITIs — confirm on NCVT MIS.">
                  <span className="font-mono text-[0.875rem]">{c.itiCode}</span>
                </Row>
              )}
            </dl>

            <div className="mb-3 mt-6 flex flex-wrap gap-2">
              <a
                href={`tel:${c.phone.replace(/\s/g, "")}`}
                className="inline-flex min-h-[2.75rem] items-center gap-2 rounded-full bg-ember-600 px-5 text-[0.875rem] font-semibold text-white transition-colors hover:bg-ember-500"
              >
                Call
              </a>
              <a
                href={`mailto:${c.email}`}
                className="inline-flex min-h-[2.75rem] items-center gap-2 rounded-full border border-stone-line px-5 text-[0.875rem] font-semibold text-ink transition-colors hover:border-royal-600 hover:text-royal-700"
              >
                Email
              </a>
              <a
                href={campusMapUrl(c)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[2.75rem] items-center gap-2 rounded-full border border-stone-line px-5 text-[0.875rem] font-semibold text-ink transition-colors hover:border-royal-600 hover:text-royal-700"
              >
                Open in Maps
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
