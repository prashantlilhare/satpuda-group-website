import { useCallback, useEffect, useId, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { ChevronDown, Mail, Menu, Phone, X } from "lucide-react";
import { Logo } from "./Logo";
import { nav, contact, site } from "../../data/site";

/* ================================================================== */
/* DESKTOP DROPDOWN                                                    */
/* ================================================================== */

function DesktopDropdown({ item, openId, setOpenId }) {
  const id = useId();
  const isOpen = openId === id;
  const closeTimer = useRef(null);
  const { pathname } = useLocation();

  const isActive =
    item.children.some((c) => pathname === c.to) ||
    (item.label === "Institute" && pathname.startsWith("/institutes")) ||
    (item.label === "About Us" && pathname.startsWith("/about"));

  // Hover intent: open at once, close on a short delay so the pointer can
  // travel from the trigger into the panel without it vanishing.
  const open = () => {
    clearTimeout(closeTimer.current);
    setOpenId(id);
  };
  const scheduleClose = () => {
    clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenId((c) => (c === id ? null : c)), 140);
  };

  useEffect(() => () => clearTimeout(closeTimer.current), []);

  return (
    <li className="relative" onMouseEnter={open} onMouseLeave={scheduleClose}>
      <button
        type="button"
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-controls={`${id}-panel`}
        onClick={() => setOpenId(isOpen ? null : id)}
        onKeyDown={(e) => {
          if (e.key === "ArrowDown") {
            e.preventDefault();
            open();
          }
        }}
        className={`relative flex items-center gap-1.5 px-1 py-2 text-[0.9375rem] font-medium transition-colors duration-300 ${
          isActive || isOpen ? "text-royal-700" : "text-ink-soft hover:text-royal-700"
        }`}
      >
        {item.label}
        <ChevronDown
          aria-hidden="true"
          className={`h-3.5 w-3.5 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
        />
        {/* Drawn full-width while this section is current or its panel is
            open, and grown from the left on hover/focus — previously the
            rule existed only in the active state, so pointing at any other
            item gave no feedback beyond a colour shift. */}
        <span aria-hidden="true" data-active={isActive || isOpen} className="nav-underline" />
      </button>

      <div
        id={`${id}-panel`}
        className={`absolute left-1/2 top-full z-50 w-[27rem] -translate-x-1/2 pt-4 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isOpen
            ? "visible translate-y-0 opacity-100"
            : "invisible -translate-y-1.5 opacity-0"
        }`}
      >
        <div className="border border-sand bg-white p-2 shadow-[0_24px_60px_-20px_rgba(20,34,68,0.28)]">
          <ul>
            {item.children.map((child) => (
              <li key={child.to}>
                <NavLink
                  to={child.to}
                  end
                  onClick={() => setOpenId(null)}
                  className={({ isActive: active }) =>
                    `group/item block border-l-2 px-4 py-3.5 transition-colors duration-250 ${
                      active
                        ? "border-ember-500 bg-royal-50"
                        : "border-transparent hover:border-ember-500 hover:bg-paper-dim"
                    }`
                  }
                >
                  <span className="flex items-center justify-between gap-3">
                    <span className="font-display text-[1.0625rem] font-semibold tracking-[-0.015em] text-ink">
                      {child.label}
                    </span>
                    <ChevronDown
                      aria-hidden="true"
                      className="h-4 w-4 -rotate-90 shrink-0 text-ink-mute opacity-0 transition-all duration-300 group-hover/item:translate-x-0.5 group-hover/item:opacity-100"
                    />
                  </span>
                  <span className="mt-1 block text-[0.8125rem] leading-relaxed text-ink-mute">
                    {child.blurb}
                  </span>
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </li>
  );
}

/* ================================================================== */
/* MOBILE ACCORDION                                                    */
/* ================================================================== */

function MobileAccordion({ item, index, onNavigate }) {
  const [expanded, setExpanded] = useState(false);
  const panelId = `m-panel-${index}`;

  return (
    <li className="border-b border-white/12">
      <button
        type="button"
        aria-expanded={expanded}
        aria-controls={panelId}
        onClick={() => setExpanded((v) => !v)}
        className="flex w-full items-center justify-between gap-4 py-5 text-left"
      >
        <span className="font-display text-[1.75rem] font-semibold tracking-[-0.025em] text-white">
          {item.label}
        </span>
        <span
          className={`flex h-9 w-9 shrink-0 items-center justify-center border transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            expanded
              ? "rotate-180 border-ember-500 bg-ember-500 text-white"
              : "border-white/25 text-white/70"
          }`}
        >
          <ChevronDown aria-hidden="true" className="h-4 w-4" />
        </span>
      </button>

      <div
        id={panelId}
        className="grid transition-[grid-template-rows] duration-450 ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{ gridTemplateRows: expanded ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <ul className="pb-4">
            {item.children.map((child) => (
              <li key={child.to}>
                <NavLink
                  to={child.to}
                  end
                  onClick={onNavigate}
                  className={({ isActive }) =>
                    `block border-l-2 py-3 pl-4 transition-colors duration-250 ${
                      isActive
                        ? "border-ember-500 text-ember-300"
                        : "border-white/15 text-white/75 hover:border-ember-500 hover:text-white"
                    }`
                  }
                >
                  <span className="block text-[1.0625rem] font-medium">{child.label}</span>
                  <span className="mt-0.5 block text-[0.8125rem] leading-snug text-white/60">
                    {child.blurb}
                  </span>
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </li>
  );
}

/* ================================================================== */
/* NAVBAR                                                              */
/* ================================================================== */

export function Navbar() {
  // Seeded from the real scroll position so a deep link or a restored scroll
  // renders the compact header immediately, with no first-paint flicker.
  const [scrolled, setScrolled] = useState(
    () => typeof window !== "undefined" && window.scrollY > 24,
  );
  const [menuOpen, setMenuOpen] = useState(false);
  const [openId, setOpenId] = useState(null);
  const { pathname } = useLocation();
  const headerRef = useRef(null);
  const panelRef = useRef(null);
  const toggleRef = useRef(null);

  /* --- scroll state (rAF-throttled, passive) ---------------------- */
  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > 24);
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* --- close everything on route change ---------------------------
   * Navigation is the external system here: it can originate from a nav link,
   * a footer link, the back button or a redirect, so there is no single event
   * handler to hang this off. Reacting to `pathname` is the correct hook.
   */
  useEffect(() => {
    setMenuOpen(false);
    setOpenId(null);
  }, [pathname]);

  /* --- lock body scroll while the mobile panel is open ------------ */
  useEffect(() => {
    if (!menuOpen) return;
    const { overflow, paddingRight } = document.body.style;
    const gap = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    if (gap > 0) document.body.style.paddingRight = `${gap}px`;
    return () => {
      document.body.style.overflow = overflow;
      document.body.style.paddingRight = paddingRight;
    };
  }, [menuOpen]);

  /* --- Escape closes; outside click closes desktop dropdowns ------ */
  useEffect(() => {
    const onKey = (e) => {
      if (e.key !== "Escape") return;
      if (menuOpen) {
        setMenuOpen(false);
        toggleRef.current?.focus();
      }
      setOpenId(null);
    };
    const onPointer = (e) => {
      if (headerRef.current && !headerRef.current.contains(e.target)) setOpenId(null);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [menuOpen]);

  /* --- focus trap for the mobile panel ---------------------------- */
  useEffect(() => {
    if (!menuOpen) return;
    const panel = panelRef.current;
    if (!panel) return;

    const focusables = () =>
      panel.querySelectorAll(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );

    focusables()[0]?.focus();

    const onKeyDown = (e) => {
      if (e.key !== "Tab") return;
      const items = focusables();
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    panel.addEventListener("keydown", onKeyDown);
    return () => panel.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  return (
    <header
      ref={headerRef}
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow] duration-400 ${
        scrolled
          ? "bg-white/95 shadow-[0_1px_0_0_var(--color-sand),0_12px_34px_-26px_rgba(20,34,68,0.55)] backdrop-blur-md"
          : "bg-white"
      }`}
    >
      {/* ---------- utility bar ---------- */}
      <div
        className="on-dark overflow-hidden bg-royal-800 text-white transition-[max-height,opacity] duration-450 ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{
          maxHeight: scrolled ? 0 : "var(--nav-utility-h)",
          opacity: scrolled ? 0 : 1,
        }}
        aria-hidden={scrolled}
      >
        <div className="shell flex h-11 items-center justify-between gap-6">
          <p className="motto truncate text-[0.8125rem] text-ember-200">
            {site.motto}
            <span className="ml-2.5 hidden text-white/60 sm:inline">
              — knowledge is that which liberates
            </span>
          </p>
          <div className="flex items-center gap-5 text-[0.8125rem]">
            <a
              href={contact.phones[0].href}
              className="flex shrink-0 items-center gap-2 whitespace-nowrap text-white/80 transition-colors hover:text-white"
              tabIndex={scrolled ? -1 : 0}
            >
              <Phone aria-hidden="true" className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">{contact.phones[0].label}</span>
              <span className="sm:hidden">Call</span>
            </a>
            <a
              href={`mailto:${contact.email}`}
              className="hidden shrink-0 items-center gap-2 whitespace-nowrap text-white/80 transition-colors hover:text-white lg:flex"
              tabIndex={scrolled ? -1 : 0}
            >
              <Mail aria-hidden="true" className="h-3.5 w-3.5" />
              {contact.email}
            </a>
          </div>
        </div>
      </div>

      {/* ---------- main bar ---------- */}
      <div className="shell">
        <div
          className={`flex items-center justify-between gap-6 transition-[height] duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            scrolled ? "h-[var(--nav-bar-h-compact)]" : "h-[var(--nav-bar-h)]"
          }`}
        >
          <Logo />

          {/* desktop nav */}
          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-9">
              {nav.map((item) =>
                item.children ? (
                  <DesktopDropdown
                    key={item.label}
                    item={item}
                    openId={openId}
                    setOpenId={setOpenId}
                  />
                ) : (
                  <li key={item.label}>
                    <NavLink
                      to={item.to}
                      end
                      className={({ isActive }) =>
                        `relative block px-1 py-2 text-[0.9375rem] font-medium transition-colors duration-300 ${
                          isActive ? "text-royal-700" : "text-ink-soft hover:text-royal-700"
                        }`
                      }
                    >
                      {({ isActive }) => (
                        <>
                          {item.label}
                          <span aria-hidden="true" data-active={isActive} className="nav-underline" />
                        </>
                      )}
                    </NavLink>
                  </li>
                ),
              )}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              to="/contact"
              // Deepens within the blue rather than flipping to red: the header
              // CTA is the most-seen button on the site, and turning it red on
              // hover made red read as "the hover colour" rather than an accent.
              className="group/cta hidden items-center gap-2 bg-royal-600 px-5 py-3 text-[0.875rem] font-semibold text-white transition-[background-color,transform,box-shadow] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:bg-royal-700 hover:shadow-[0_12px_24px_-14px_rgba(20,34,68,0.8)] active:translate-y-0 lg:inline-flex"
            >
              Enquire now
              <span
                aria-hidden="true"
                className="transition-transform duration-300 group-hover/cta:translate-x-0.5"
              >
                →
              </span>
            </Link>

            <button
              ref={toggleRef}
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              className="flex h-11 w-11 items-center justify-center border border-sand text-royal-700 transition-colors duration-300 hover:border-royal-600 hover:bg-royal-600 hover:text-white lg:hidden"
            >
              {menuOpen ? (
                <X aria-hidden="true" className="h-5 w-5" />
              ) : (
                <Menu aria-hidden="true" className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* ---------- mobile panel ----------
          Padding clears whatever the header currently is. The header sits above
          this panel (z-50 vs z-40) so the close button stays reachable, which
          means the first menu item must start below it — this previously cleared
          only the main bar, leaving the utility bar covering "Home" at the top
          of the page. Body scroll is locked while open, so `scrolled` cannot
          change underneath it. */}
      <div
        id="mobile-menu"
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        inert={!menuOpen}
        className={`on-dark fixed inset-0 top-0 z-40 flex flex-col bg-royal-900 transition-[opacity,visibility] duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] lg:hidden ${
          menuOpen ? "visible opacity-100" : "invisible opacity-0"
        }`}
        style={{
          paddingTop: `calc(${
            scrolled ? "var(--nav-h-compact)" : "var(--nav-h)"
          } + env(safe-area-inset-top, 0px))`,
        }}
      >
        <div className="flex-1 overflow-y-auto overscroll-contain px-[var(--spacing-gutter)] pb-10">
          <nav aria-label="Mobile">
            <ul>
              {nav.map((item, i) =>
                item.children ? (
                  <MobileAccordion
                    key={item.label}
                    item={item}
                    index={i}
                    onNavigate={closeMenu}
                  />
                ) : (
                  <li key={item.label} className="border-b border-white/12">
                    <NavLink
                      to={item.to}
                      end
                      onClick={closeMenu}
                      className={({ isActive }) =>
                        `block py-5 font-display text-[1.75rem] font-semibold tracking-[-0.025em] transition-colors duration-300 ${
                          isActive ? "text-ember-400" : "text-white"
                        }`
                      }
                    >
                      {item.label}
                    </NavLink>
                  </li>
                ),
              )}
            </ul>
          </nav>

          <div className="mt-10 space-y-3">
            <Link
              to="/contact"
              onClick={closeMenu}
              className="flex w-full items-center justify-center gap-2 bg-ember-500 px-6 py-4 font-semibold text-white"
            >
              Enquire now →
            </Link>
            <div className="grid gap-2.5 pt-4 text-[0.9375rem] text-white/70">
              {contact.phones.map((p) => (
                <a key={p.href} href={p.href} className="flex items-center gap-3">
                  <Phone aria-hidden="true" className="h-4 w-4 text-ember-400" />
                  {p.label}
                </a>
              ))}
              <a href={`mailto:${contact.email}`} className="flex items-center gap-3 break-all">
                <Mail aria-hidden="true" className="h-4 w-4 shrink-0 text-ember-400" />
                {contact.email}
              </a>
            </div>
            <p className="motto pt-5 text-center text-sm text-white/55">{site.motto}</p>
          </div>
        </div>
      </div>
    </header>
  );
}
