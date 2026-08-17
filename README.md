# Shoosh — An Orbit of Experiences

Shoosh is a bilingual editorial journal built around the approved Shoosh identity and the account's broader point of view: **Taste · Places · Escape · Culture · Moments**.

## Product direction

This is not an Instagram-grid clone and not a restaurant directory. Each supplied Shoosh post becomes a story that preserves:

- the actual place / experience
- Shoosh's qualitative observation
- reservation guidance recorded in the post
- the exact dishes or items tried where supplied
- the prices recorded at the time of the visit
- city, area, year, cuisine/type and mood metadata

The journal does **not** invent numerical ratings or change a mixed/negative observation into a positive recommendation.

## Approved identity — locked

- **Shoosh Blue:** `#112B68`
- **Shoosh Gold:** `#D0962E`
- **Pure White:** `#FFFFFF`
- Core elements: Saturn, orbit, Shoosh signature, wave, gold star
- Arabic name: **شوش**
- Character: Minimal · Sophisticated · Fluid · Personal · Celestial

The approved SVG is used directly. Dark/cinematic treatments are not permitted to recolor, redraw, distort, or substitute the logo or Shoosh signature.

## Experience system

The presentation layer was rebuilt as a cinematic, scroll-led editorial experience. Its design principles are deliberately independent but benchmarked against high-end contemporary editorial sites: radical scale contrast, restrained navigation, one idea per viewport, full-bleed photography, sequential numbering, immersive page transitions, subtle parallax, controlled reveal motion, custom desktop cursor and reduced-motion accessibility.

The result remains unmistakably Shoosh rather than copying another site's proprietary visuals, text or code.

## Architecture

```text
/
├── index.html                         # Cinematic editorial homepage
├── journal/index.html                 # Indexed/searchable archive
├── story/index.html                   # Immersive individual story renderer
├── about/index.html                   # Approved identity + editorial promise
├── data/
│   ├── posts.json                     # Canonical Shoosh content layer
│   └── supporting-media.json          # Credited supporting-media registry
├── assets/
│   ├── images/brand/shoosh-primary.svg# Approved master mark
│   ├── css/
│   │   ├── main.css                   # Legacy/base tokens and compatibility
│   │   ├── brand-v2.css               # Locked brand rules
│   │   └── cinematic-v4.css           # Cinematic experience system
│   └── js/
│       ├── app.js                     # Data, language, archive + story rendering
│       ├── media.js                   # Shoosh supplied-media hydration
│       ├── destination-media.js       # Destination image source registry
│       ├── destination-priority.js    # Robust destination-image selection/fallback
│       ├── arabic-polish.js           # Arabic terminology consistency
│       ├── lang-init.js               # Language persistence/detection
│       └── cinematic-v4.js            # Menu, intro, cursor, reveal, parallax, transitions
├── manifest.webmanifest
├── robots.txt
├── sitemap.xml
├── 404.html
└── .nojekyll
```

### Front end

Semantic HTML, modular CSS and progressive JavaScript. The public site remains build-free on GitHub Pages so the deployed result is deterministic and has no package-manager/runtime dependency. The architecture is component-like and data-driven even though it does not require a client framework.

### Bilingual / RTL

English and Arabic share the same content source while receiving language-specific rendering. Arabic uses the authoritative spelling **شوش**, Arabic world names, RTL layout, Arabic editorial copy and translated interface labels rather than simply mirroring English UI.

### Story model

Each story now follows a deliberate narrative sequence:

1. full-screen destination/venue image
2. place title, sequence number and context
3. Shoosh's qualitative note
4. exactly what Shoosh tried and recorded prices
5. reservation and practical facts
6. original Arabic context where useful
7. one next-story transition to continue the orbit

A venue image is not repeated again within the same story page.

### Content / back-end layer

For the current GitHub Pages deployment, `data/posts.json` is the canonical content API. It is intentionally static: there is no public database or server attack surface to maintain for a read-only editorial journal. The schema can later move to a CMS/API or managed PostgreSQL backend without changing the visual experience.

### Media provenance

Shoosh's supplied material remains the evidentiary source of the experience and recommendations. Public/official venue imagery is maintained as a separately sourced supporting layer with fallback sources. Third-party publishing rights still require final rights review before commercial production use.

## Content status

The archive contains **29 structured experiences**, including the original journal material plus the 20 additional supplied posts.

## Deployment

GitHub Pages from `main` / repository root:

`https://ahmedyyya.github.io/Shoosh/`
