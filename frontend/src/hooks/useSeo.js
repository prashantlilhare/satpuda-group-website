import { useEffect } from "react";

const SITE = "Satpuda Group";

function setMeta(selector, attr, value) {
  if (!value) return;
  let el = document.head.querySelector(selector);
  if (!el) {
    el = document.createElement("meta");
    const [, key, name] = selector.match(/\[(\w+)="([^"]+)"\]/) ?? [];
    if (key && name) el.setAttribute(key, name);
    document.head.appendChild(el);
  }
  el.setAttribute(attr, value);
}

/**
 * Per-route document title, description, canonical URL and OG tags.
 * Kept as a hook rather than a helmet dependency — this is all the app needs.
 */
export function useSeo({ title, description, path }) {
  useEffect(() => {
    const fullTitle = title ? `${title} — ${SITE}` : SITE;
    document.title = fullTitle;

    setMeta('meta[name="description"]', "content", description);
    setMeta('meta[property="og:title"]', "content", fullTitle);
    setMeta('meta[property="og:description"]', "content", description);

    if (path) {
      const url = `${window.location.origin}${path}`;
      setMeta('meta[property="og:url"]', "content", url);

      let link = document.head.querySelector('link[rel="canonical"]');
      if (!link) {
        link = document.createElement("link");
        link.setAttribute("rel", "canonical");
        document.head.appendChild(link);
      }
      link.setAttribute("href", url);
    }
  }, [title, description, path]);
}
