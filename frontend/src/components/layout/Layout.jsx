import { Suspense, useEffect } from "react";
import { Outlet, ScrollRestoration, useLocation } from "react-router-dom";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

/** Route-level loading state — quiet, and sized so the footer never jumps up. */
function RouteFallback() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center bg-paper" role="status">
      <span className="sr-only">Loading page…</span>
      <span
        aria-hidden="true"
        className="h-8 w-8 animate-spin rounded-full border-2 border-stone-line border-t-royal-600"
      />
    </div>
  );
}

/**
 * Moves keyboard focus to the main landmark on navigation, so a screen-reader
 * or keyboard user is not left at the bottom of the previous page.
 */
function useFocusMainOnNavigate() {
  const { pathname } = useLocation();
  useEffect(() => {
    const main = document.getElementById("main");
    if (!main) return;
    // Skip the very first render — focusing on load is disorienting.
    if (window.__satpudaFirstRender === undefined) {
      window.__satpudaFirstRender = false;
      return;
    }
    main.focus({ preventScroll: true });
  }, [pathname]);
}

export function Layout() {
  useFocusMainOnNavigate();

  return (
    <>
      <a
        href="#main"
        className="skip-link bg-royal-600 px-5 py-3 text-[0.875rem] font-semibold text-white"
      >
        Skip to main content
      </a>

      <Navbar />

      {/* Clears the fixed header via the shared --nav-h token, so this can
          never drift from the navbar's real height. Deliberately the at-rest
          height rather than the compact one: this padding sits at the top of
          the document, so if it shrank as the header collapsed on scroll the
          whole page would jump upward. */}
      <main id="main" tabIndex={-1} className="pt-[var(--nav-h)] focus-visible:outline-none">
        <Suspense fallback={<RouteFallback />}>
          <Outlet />
        </Suspense>
      </main>

      <Footer />
      <ScrollRestoration />
    </>
  );
}
