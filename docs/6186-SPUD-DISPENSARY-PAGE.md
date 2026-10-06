# 6186-SPUD — Oklahoma Dispensary Page

Date: 2026-08-11  
Repository: `J:\presidential-thc-oklahoma`  
Live page: https://presidentialthcoklahoma.com/dispensaries  
Production deployment: https://presidential-thc-oklahoma-qaumcy5i2-paulie-pauliewoods-projects.vercel.app

## Result

`/dispensaries` is live in Vercel production with all 194 Oklahoma retailer names and street addresses in the initial server-rendered HTML. The page has six regional jump targets, five local regional images, the exact supplied editorial copy, the required retailer-sourcing line, a self-referencing canonical, explicit index/follow metadata, and the existing Oklahoma ZIP locator.

The route is prerendered as static HTML from the generated Oklahoma retailer data artifact. Counts are calculated from the imported retailer rows in the page component; no displayed regional total is hardcoded.

## Existing-page overlap check

The existing routes serve three different intents, so `/dispensaries` is not a near-duplicate:

- `/find` is the nearest-to-me search route. Its live locator accepts a ZIP or browser location and returns nearby Oklahoma retailers by distance. Its editorial copy explains how to use that locator and confirm product inventory; it does not render the complete statewide retailer directory.
- `/retailers` is a business-to-business wholesale overview for Oklahoma dispensary owners and buyers. It explains the brand, formats, series architecture, in-store support, and the moratorium-market context; it is not a consumer store list or nearest-location search.
- `/dispensaries` is the browse-them-all route. It server-renders every current Oklahoma retailer name and street address, grouped by tourism region and city, while retaining the locator only as the closing action.

The `/find` locator and `/retailers` page were left unchanged.

## Retailer pull and placement

The data sync script read `SUPABASE_URL` and `SUPABASE_SECRET_KEY` from the read-only source environment at `J:\presidential-official\web\.env.local`. The secret value was not printed, copied into this repository, committed, or added to Vercel.

One direct PostgREST request read `public.retailers` with these filters:

- `state = OK`
- `public_locator_status = approved_public_locator`
- selected fields: name, address, city, state, ZIP, latitude, longitude, and public locator status

The response header was:

```text
Content-Range: 0-193/194
```

The resulting source total was 194 rows. Coordinates were resolved against all 77 Oklahoma county polygons from the U.S. Census Bureau TIGERweb State/County layer, then assigned through the brief's fixed 77-county tourism partition.

- Rows pulled: 194
- Rows with a county: 194
- Rows with a region: 194
- Unresolved retailers: 0
- Duplicate name/address rows: 0
- Oklahoma City aliases merged: 5 (`OKC`: 3; `OKLAHOMA`: 2)
- Rows whose city label was normalized for canonical casing, the five Oklahoma City aliases, or the source's `Oolagah` spelling: 40

No retailer required the closing-block fallback.

## Counts rendered from the data

| Page section | Data region | Retailers |
| --- | --- | ---: |
| Frontier Country | Frontier Country | 100 |
| Green Country | Green Country | 51 |
| Great Plains Country | Great Plains Country | 14 |
| Choctaw Country | Choctaw Country | 14 |
| Chickasaw Country | Chickasaw Country | 11 |
| Elsewhere in Oklahoma | Red Carpet Country | 4 |
| **Total** |  | **194** |

Cities are sorted alphabetically in each region. Retailer names are sorted alphabetically within each city, with street address as the stable secondary sort. The visible directory shows retailer name and street address only.

## Raw server-rendered HTML proof

The production page was fetched with `curl.exe -sS -L --compressed`. The response status was `200`.

The raw title appeared exactly once as `Where to Buy Presidential in Oklahoma`, the raw document contained exactly one `<h1>`, and all 37 editorial paragraphs from the supplied copy file were present exactly after removing Markdown emphasis markers. The standard breadcrumb current-page label was served as `Where to Buy Presidential in Oklahoma`.

A specific retailer address appeared in the raw response as:

```html
<address data-retailer-address="true">8 S. Commerce St.</address>
```

Counting rendered address elements with the raw-source pattern `<address data-retailer-address` returned:

```text
194 rendered address elements / 194 retailer rows
```

The generic `data-retailer-address` token occurs 388 times because Next.js also embeds a React Server Component payload in the document. Counting the actual rendered `<address>` elements produces the required one-to-one total of 194.

The six raw anchors were:

```html
<a href="#frontier-country">
<a href="#green-country">
<a href="#great-plains-country">
<a href="#choctaw-country">
<a href="#chickasaw-country">
<a href="#elsewhere-in-oklahoma">
```

They are real HTML links, not click handlers.

Each raw anchor resolved to exactly one raw section target:

| Anchor | Anchor count | Matching section `id` count |
| --- | ---: | ---: |
| `#frontier-country` | 1 | 1 |
| `#green-country` | 1 | 1 |
| `#great-plains-country` | 1 | 1 |
| `#choctaw-country` | 1 | 1 |
| `#chickasaw-country` | 1 | 1 |
| `#elsewhere-in-oklahoma` | 1 | 1 |

The raw document contained exactly one `<h1>`.

The required sourcing line was served as:

```html
<p class="dispensaries-module__dX2u2q__sourcingLine">Every retailer on this page is a licensed Oklahoma dispensary that carries <a href="/about">Presidential</a>, supplied directly by our own retail partners.</p>
```

Only the word `Presidential` is linked. Its destination is `/about`, and `https://presidentialthcoklahoma.com/about` returned 200.

The canonical tag served was:

```html
<link rel="canonical" href="https://presidentialthcoklahoma.com/dispensaries"/>
```

Indexability observations from the raw HTML:

- `noindex` occurrences: 0
- Canonical: self-referencing `/dispensaries` URL
- Route metadata: explicit `index: true`, `follow: true`
- HTTP status: 200

Phone and third-party business-schema observations from the raw HTML:

- U.S. phone-number pattern matches: 0
- `tel:` links: 0
- `LocalBusiness` occurrences: 0

The page-specific locator sets `showPhone={false}` while reusing the existing `RetailerLocator` and `/api/retailers` server proxy. Existing `/find` locator behavior was left unchanged.

## Navigation decision

The shared primary navigation accepted the seventh item, `Dispensaries`, and the production raw HTML contains one primary-nav link to `/dispensaries`. No header styling or layout rule was changed. The existing header already gives the nav shrink/overflow ownership and moves it to its own horizontally scrollable row at narrower widths, so the new item does not require a forced fixed-width layout. `/find` did not need a new fallback link and remained unchanged.

## Regional images

All five source WebPs were copied from `J:\presidential-state-images\_oklahoma-regions` into `public\images\oklahoma-regions` and referenced locally.

| Image | Loading | Production status |
| --- | --- | ---: |
| `ok-region-frontier-country.webp` | Priority/eager first image | 200 |
| `ok-region-green-country.webp` | Lazy | 200 |
| `ok-region-great-plains-country.webp` | Lazy | 200 |
| `ok-region-choctaw-country.webp` | Lazy | 200 |
| `ok-region-chickasaw-country.webp` | Lazy | 200 |

Each alt string names the region and its landscape content. No caption was added. The alt strings contain no cannabis, product, retailer, or business name.

## Production route observations

The production sitemap contains the new page. Every URL in the served sitemap returned 200:

| Route | Status |
| --- | ---: |
| `/` | 200 |
| `/moon-rocks` | 200 |
| `/blunts` | 200 |
| `/pre-rolls` | 200 |
| `/minis` | 200 |
| `/silver` | 200 |
| `/gold` | 200 |
| `/rose-gold` | 200 |
| `/find` | 200 |
| `/retailers` | 200 |
| `/oklahoma` | 200 |
| `/about` | 200 |
| `/dispensaries` | 200 |

Vercel reported the production route as static/prerendered, completed the production build, marked the deployment Ready, and aliased it to `https://presidentialthcoklahoma.com`.

## Files created

- `scripts/sync-oklahoma-dispensaries.mjs`
- `src/content/oklahoma-retailers.json`
- `src/app/dispensaries/page.tsx`
- `src/app/dispensaries/dispensaries.module.css`
- `public/images/oklahoma-regions/ok-region-frontier-country.webp`
- `public/images/oklahoma-regions/ok-region-green-country.webp`
- `public/images/oklahoma-regions/ok-region-great-plains-country.webp`
- `public/images/oklahoma-regions/ok-region-choctaw-country.webp`
- `public/images/oklahoma-regions/ok-region-chickasaw-country.webp`
- `docs/6186-SPUD-DISPENSARY-PAGE.md`

## Files changed

- `src/lib/site.ts` — added one primary-navigation link to `/dispensaries`
- `src/app/sitemap.ts` — added the dedicated route
- `src/components/retailer-locator.tsx` — added a default-on `showPhone` option so this page can suppress phone output without changing the existing locator page
- `src/app/dispensaries/page.tsx` — added the exact required sourcing sentence with the single `/about` link
- `src/app/dispensaries/dispensaries.module.css` — added restrained styling for that sourcing sentence inside the existing page design

No existing page copy, image, layout, title, meta, H1, product composite, asset registry, product registry, Sanity record, sister repository, header styling, or footer was changed.

## Prompt corrections and implementation decisions

- TIGERweb returns county names with the suffix `County`; the sync removes that provider suffix before applying the exact county partition.
- Mixed-case source city labels would have split cities such as `ardmore` and `Ardmore` into separate headings. They were consolidated case-insensitively. The source spelling `Oolagah` was normalized to the supplied copy's `Oologah`.
- The Vercel project has no environment variables. Rather than repurpose or publish the official site's Supabase secret, the page uses a committed server-side snapshot produced by the one-request sync script. Counts are derived from that current data artifact. Refreshing database changes requires rerunning the sync script, committing the new artifact, and redeploying.
- No unresolved retailer existed, but the page includes a closing-block fallback that will list unresolved records instead of guessing a region if a future sync produces any.
- The outside brief treated the page as not yet built, but disk and production already held the complete directory from the first 6186 pass. The revised work therefore preserved the existing page and added only the newly specified sourcing line and expanded proof/reporting, rather than creating another route or rebuilding working code.
- The existing breadcrumb used the short label `Dispensaries`. The revised brief explicitly required the same breadcrumb pattern as the other article pages, whose current-page label is the H1, so it was corrected to `Where to Buy Presidential in Oklahoma` without changing the page title or H1.

## Commit, deployment, and rollback

Implementation commit:

```text
0ff47ef Build Oklahoma dispensary directory
171d896 Add dispensary page sourcing line
65766bd Align dispensary breadcrumb
```

Previous Ready production deployment:

```text
https://presidential-thc-oklahoma-fmxnjdne7-paulie-pauliewoods-projects.vercel.app
```

Production rollback command:

```powershell
vercel rollback https://presidential-thc-oklahoma-fmxnjdne7-paulie-pauliewoods-projects.vercel.app --yes
```

Local source rollback commands for the revised-brief delta:

```powershell
git revert --no-commit 65766bd 171d896
git commit -m "Roll back revised 6186 delta"
```

## Testing boundary

No local build, test, smoke test, gate, QA suite, browser QA, Playwright run, Superflow, Cactus loop, baseline capture, or formal verification pass was run. The only build was the required Vercel production deployment. The remaining observations were the brief-required raw-HTML, direct image URL, deployment-status, and route-status reads.
