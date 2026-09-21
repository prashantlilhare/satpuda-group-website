import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Lenis from "lenis";
import { setLenis } from "../../lib/smoothScroll";

/**
 * Site-wide smooth scrolling (Lenis).
 *
 * Deliberately conservative: Lenis drives the real window scroll, so
 * `position: sticky`, `scrollY` listeners, IntersectionObserver reveals and
 * the pinned leadership section all keep working exactly as they did — this
 * only changes how the scroll position eases toward its target.
 *
 * Settings are tuned for "premium and subtle", not for a heavy glide: a short
 * ~0.9s ease, an unchanged 1:1 wheel distance, and **native touch scrolling**
 * on phones, where smoothing fights the platform and feels laggy.
 *
 * Opted out entirely under `prefers-reduced-motion`, and anything marked
 * `data-lenis-prevent` (the mobile menu's own scroll area) keeps native
 * scrolling.
 */
export function SmoothScroll() {
  const { pathname } = useLocation();

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      duration: 0.9,
      easing: (t) => 1 - Math.pow(1 - t, 3), // easeOutCubic — settles, never floats
      wheelMultiplier: 1,
      touchMultiplier: 1.6,
      // Phones already scroll smoothly; taking that over is what makes these
      // integrations feel sticky, so touch is left to the browser.
      smoothWheel: true,
      syncTouch: false,
      autoRaf: false,
    });

    setLenis(lenis);

    // `scroll-behavior: smooth` in CSS and Lenis both animating the same
    // scroll fight each other on anchor jumps; Lenis owns it while mounted.
    const html = document.documentElement;
    const previousBehavior = html.style.scrollBehavior;
    html.style.scrollBehavior = "auto";

    let frame = requestAnimationFrame(function raf(time) {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    });

    return () => {
      cancelAnimationFrame(frame);
      setLenis(null);
      lenis.destroy();
      html.style.scrollBehavior = previousBehavior;
    };
  }, []);

  /* A route change replaces the whole document; Lenis has to be told the page
     is a different length now, and its internal position re-synced with the
     scroll restoration that just happened. */
  useEffect(() => {
    const id = requestAnimationFrame(() => {
      const lenis = window.__satpudaLenis;
      if (!lenis) return;
      lenis.resize();
      lenis.scrollTo(window.scrollY, { immediate: true, force: true });
    });
    return () => cancelAnimationFrame(id);
  }, [pathname]);

  return null;
}
