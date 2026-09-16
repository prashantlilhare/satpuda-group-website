# Satpuda Group — Website

Institutional website for **Satpuda Group**, Balaghat, Madhya Pradesh — a family of four
institutions run by *Maharana Pratap Shikshan Samiti*: a CBSE school, an NCVT industrial
training institute, teacher education, and an AICTE-approved engineering college and polytechnic.

Built as a MERN project. **Only the frontend exists at this stage** — `backend/` is intentionally
empty (see [`backend/README.md`](backend/README.md)).

```
satpuda-group/
├── frontend/          React + Vite + Tailwind CSS 4
├── backend/           empty by design — no server, DB or API yet
└── README.md
```

---

## Running it

```bash
cd frontend
npm install
npm run dev        # http://localhost:5173
npm run build      # production build → frontend/dist
npm run preview    # serve the production build
```

Requires Node 20+.

---

## Stack

| | |
| --- | --- |
| Framework | React 19 |
| Build | Vite 8 (Rolldown) |
| Styling | Tailwind CSS 4 (CSS-first `@theme` tokens) |
| Routing | React Router 7 (`createBrowserRouter`, per-route code splitting) |
| Icons | lucide-react, plus two inline brand glyphs |
| Motion | CSS transitions + IntersectionObserver — no animation library |

---

## Design system

The palette is derived from the official logo. The supplied file is an **Adobe CMYK JPEG**, so a
naive RGB read returns muted values; converting properly through sRGB gives the true brand colours:

| Token | Value | Source |
| --- | --- | --- |
| `royal-600` | `#294791` | Logo field |
| `ember-500` | `#EC5819` | Logo mark |
| `paper` | `#FAF8F5` | Warm institutional neutral |
| `ink` | `#191817` | Body text |

Type is **Fraunces** (variable serif, editorial display), **Schibsted Grotesk** (UI/body) and
**Tiro Devanagari Sanskrit** for the Sanskrit motto — सा विद्या या विमुक्तये.

All tokens live in [`frontend/src/styles/index.css`](frontend/src/styles/index.css).

### Logo usage

The emblem is used **unmodified** — never recoloured, cropped or redrawn. Because it is a seal
whose arced lettering is illegible below ~150px, it is paired with a typographic wordmark in the
navbar and footer (standard practice for seal marks), rather than being simplified.

---

## Project layout

```
frontend/src/
├── assets/
│   ├── logo/              emblem, converted CMYK → sRGB
│   └── images/            hero (3 widths each), campus, institutions, leadership
├── components/
│   ├── layout/            Navbar, Footer, Logo, Layout
│   ├── home/              the eight homepage sections
│   ├── shared/            PageHero, CTASection
│   └── ui/                Primitives, BrandIcons
├── data/                  ← all content lives here
│   ├── site.js            brand, contact, navigation, sources
│   ├── institutions.js    the four institutions + milestones
│   ├── programs.js        B.Tech, diploma, ITI trades, teacher education
│   ├── leadership.js      Director's and Principal's messages
│   ├── hero.js            slider content
│   └── about.js           vision, mission, values, campus
├── hooks/                 useReveal, useSeo
├── pages/                 one file per route
└── styles/index.css       design tokens + base layer
```

Content is deliberately separated from presentation, so swapping `data/*.js` for API calls later
requires no component changes.

### Routes

`/` · `/about` · `/about/vision-mission` · `/about/director-message` · `/about/principal-message`
`/institutes/btech-polytechnic` · `/institutes/ded-bed` · `/institutes/iti` · `/institutes/school`
`/contact` · `/privacy-policy` · `/terms` · `*` (404)

> Deploy note: these are client-side routes. Configure the host to rewrite all paths to
> `index.html` (Netlify `_redirects`, Vercel rewrites, or `try_files` on nginx).

---

## Content sourcing

Every factual claim is traceable to an official source:

- [satpudaengineeringcollege.com](https://satpudaengineeringcollege.com/) — engineering & polytechnic
- [satpudapolytechnic.com](https://www.satpudapolytechnic.com/) — diploma programmes
- [satpudaiti.com](https://satpudaiti.com/) — ITI, trades, NCVT/QCI
- [satpudavalleyschool.com](https://satpudavalleyschool.com/) — school

**Deliberately not published:** fees, seat matrices, intake numbers, placement percentages,
faculty counts, rankings and awards. These change every session or could not be verified, and the
site routes those questions to the institution instead. Programme durations and eligibility follow
national AICTE / RGPV / NCVT norms rather than institution-specific claims.

The engineering college's founding year is **omitted** because published sources disagree (2015 vs
2017); the timeline uses only the corroborated years, 1999 (ITI) and 2009 (school).

The D.Ed / B.Ed page carries an explicit notice that its content is general programme information,
separating it from verified institution-specific facts.

---

## Accessibility & quality

Audited with headless Chrome across 11 routes × 2 viewports (1440px, 390px):

- 0 page errors, 0 console warnings, 0 failed requests
- 0 horizontal overflow
- 0 accessibility findings — single `<h1>` per page, no heading-level jumps, every
  interactive element has an accessible name, all images have `alt`

Also implemented: skip link, focus moved to `<main>` on navigation, focus-trapped mobile menu with
body-scroll lock, `aria-expanded` dropdowns closable by `Escape`, visible brand focus rings, and
full `prefers-reduced-motion` support (autoplay, Ken Burns and scroll reveals all disable).

### Performance

Route-level code splitting keeps each page at 1–13 kB; React and the router sit in a separate
long-lived `vendor` chunk. Hero images ship at three widths via `srcSet`, the first slide is
`fetchPriority="high"` and the rest lazy-load. All photography is WebP.

---

## Adding the backend

The contact form (`frontend/src/pages/Contact.jsx`) already has full client-side validation and
success/error states — it just makes no network call, and says so honestly in its confirmation
panel instead of claiming a message was sent. Wiring it up means adding a `POST` in the submit
handler and pointing `VITE_API_URL` at the new server.
