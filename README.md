# Shoosh — An Orbit of Experiences

Shoosh 2027 is a bilingual editorial journal built around the approved Shoosh identity and the account's broader point of view: **Taste · Places · Escape · Culture · Moments**.

## Product direction

This is not an Instagram-grid clone and not a restaurant directory. Each supplied Shoosh post becomes a story that preserves:

- the actual place / experience
- Shoosh's qualitative observation
- reservation guidance recorded in the post
- the exact dishes or items tried where supplied
- the prices recorded at the time of the visit
- city, area, year, cuisine/type and mood metadata

The journal does **not** invent numerical ratings or change a mixed/negative observation into a positive recommendation.

## Approved identity

- **Shoosh Blue:** `#112B68`
- **Shoosh Gold:** `#D0962E`
- **Pure White:** `#FFFFFF`
- Core elements: Saturn, orbit, Shoosh signature, wave, gold star
- Character: Minimal · Sophisticated · Fluid · Personal · Celestial

The primary artwork is used as supplied; the site does not redraw or substitute the Shoosh lettering.

## Architecture

```text
/
├── index.html                 # Editorial homepage
├── journal/index.html         # Searchable/filterable archive
├── story/index.html           # Dynamic individual story renderer
├── about/index.html           # Identity + editorial principles
├── data/posts.json            # Canonical structured content layer
├── assets/
│   ├── css/main.css           # Design system / responsive layout
│   └── js/
│       ├── app.js             # Data, language, journal + story rendering
│       ├── media.js           # Approved source-media hydration
│       └── enhance.js         # Deep-link/localization refinements
├── manifest.webmanifest
├── robots.txt
├── sitemap.xml
├── 404.html
└── .nojekyll
```

### Front end

Semantic HTML, responsive CSS and progressive JavaScript. The site is mobile-first, keyboard accessible, respects reduced-motion preferences and supports English/Arabic with RTL switching.

### Content / back-end layer

For the present GitHub Pages deployment, `data/posts.json` is the canonical content API. It is intentionally static: there is no public database or server attack surface to maintain for a read-only editorial journal. The schema is already separable from the presentation layer, so it can later be replaced by a CMS/API (for example a managed PostgreSQL/Supabase or headless CMS) without redesigning the website.

### Media provenance

Experience imagery and the approved marks are hydrated from the immutable Shoosh repository media archive created from the supplied source material. This avoids substituting generic stock imagery for Shoosh's own experience. Future third-party supporting images must be rights-cleared, official, or open-license and clearly treated as supporting editorial imagery.

## Content status

The current archive contains **29 structured experiences**, including the original journal material plus the 20 additional posts supplied during the 2027 rebuild.

## Deployment

Designed for GitHub Pages from `main` / repository root:

`https://ahmedyyya.github.io/Shoosh/`

No build service or package manager is required for the public deployment.