# Shoosh 2027 — Architecture

## 1. Product model

Shoosh is an editorial experience journal, not a social-feed replica. The core domain object is an **experience story**. A story can represent dining, a café, an outdoor escape, a cultural visit, a place or a personal moment.

The approved brand identity remains the visual authority: Saturn / orbit / Shoosh signature / wave / gold star, with Shoosh Blue `#112B68`, Shoosh Gold `#D0962E` and white.

## 2. Current delivery architecture

```text
Browser
  ├── semantic page shell (HTML)
  ├── design system (CSS)
  ├── journal/story renderer (JavaScript)
  ├── canonical content API (data/posts.json)
  └── immutable source-media archive (approved/supplied imagery)
```

The public deployment is intentionally static and read-only on GitHub Pages. This minimizes operational complexity and attack surface while keeping the content layer separate from the presentation layer.

## 3. Content schema

Each experience currently stores:

- `slug`
- `title`
- `category`
- `city`
- `area`
- `year` / `date`
- `cuisine`
- bilingual summaries (`summaryEn`, `summaryAr`)
- reservation guidance
- exact supplied dishes/items and prices
- editorial moods/tags
- featured status

Content truth comes from supplied Shoosh posts. The application must not invent ratings, prices, dishes, dates or recommendations.

## 4. Experience page contract

Every story page should present, where the source supports it:

1. place / experience identity
2. Shoosh note
3. original Arabic context
4. what was tried
5. recorded prices
6. reservation guidance
7. location, cuisine/type and date
8. related experiences
9. provenance note

## 5. Media policy

Shoosh-owned/supplied visual material is primary. Supporting external photography may be introduced only where it is:

- official venue imagery with appropriate use rights,
- open-license material with required attribution, or
- otherwise rights-cleared.

Supporting images must not be represented as photographs made by Shoosh.

The current implementation hydrates source imagery from an immutable repository commit so that source provenance remains stable while the UI evolves.

## 6. Accessibility and performance

The front end is dependency-light and progressively enhanced. Design requirements include:

- responsive/mobile-first layouts,
- keyboard-usable navigation and controls,
- visible focus states,
- semantic landmarks,
- reduced-motion support,
- Arabic RTL behavior,
- readable contrast and text sizing.

## 7. Future back-end path

A runtime backend is not required for the current read-only public journal. When editorial administration is needed, replace `data/posts.json` with a CMS/API adapter while preserving the public schema and URLs.

Recommended future separation:

```text
Editor UI / CMS
      ↓
Content API
      ↓
PostgreSQL or managed content store
      ↓
Image service / CDN
      ↓
Shoosh front end
```

Potential future capabilities: draft/review/publish workflow, image rights metadata, scheduled publishing, venue geodata, revisions, search indexing and analytics. No migration should require redesigning the approved brand system.

## 8. Governance

- Brand artwork is controlled; no redrawing or character substitution.
- Content fields should retain source provenance.
- Historical prices are presented as recorded at time of visit, not current prices.
- Editorial enrichment must be clearly separated from Shoosh's own observation.
