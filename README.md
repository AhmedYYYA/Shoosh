# Shoosh — An Orbit of Experiences

Shoosh 2027 is a bilingual editorial experience website built around the approved Shoosh identity and the account’s broader story: **Taste · Places · Escape · Culture · Moments**.

## Architecture

- `index.html` — responsive front-end experience using semantic HTML, CSS and vanilla JavaScript.
- `data/posts.json` — structured content/data layer used as the lightweight static backend for GitHub Pages.
- Search, city/category filters and experience-detail modal are data-driven from the JSON archive.
- Arabic/English UI switching is built into the front-end.

## Content model

Each experience can store:

- category
- city / area
- year / date
- cuisine or experience type
- bilingual editorial summary
- reservation guidance
- dishes and prices
- moods / editorial tags
- featured flag

The current archive retains the original website content and adds the 20 newly supplied posts, including detailed dining notes and non-food experiences such as Al Qudra Lake.

## Brand system

- Shoosh Blue: `#112B68`
- Shoosh Gold: `#D4A02A`
- Core language: Saturn / orbit / wave / gold star / Shoosh signature
- Story principle: **not one category — one point of view**

## Deployment

Designed for GitHub Pages from the `main` branch repository root.

The static JSON layer can later be replaced by a CMS/API without redesigning the front-end.