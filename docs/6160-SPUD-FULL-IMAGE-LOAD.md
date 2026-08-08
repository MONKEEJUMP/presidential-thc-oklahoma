# 6160 SPUD Full Image Load Report

Date: 2026-08-07  
Project: `J:\presidential-thc-oklahoma`  
Approved image source: `J:\presidential-state-images\oklahoma` (read only)  
Production: https://presidentialthcoklahoma.com  
Immutable deployment: https://presidential-thc-oklahoma-4oy7uvoqk-paulie-pauliewoods-projects.vercel.app  
Vercel deployment: `dpl_AVBYq7e4TCrRVRqrPptBX4xNDrqA`  
Deployed source commit: `77006188dfb4828b6362813e79c8415c25189fca`

## Outcome

The Oklahoma property now uses the full approved state catalogue: 213 products, each with one 1,200×1,200 square WebP and one 1,080×1,350 portrait WebP. All 426 source files were copied byte-for-byte with their supplied filenames. Portraits fill the existing right-aligned article placements; square composites fill plain, unframed overflow grids at the foot of each eligible page.

The body copy, header, footer, navigation, locator, and hero were not changed. The decorative image overlay was removed so the supplied final composites render without a second frame, caption, overlay, or hover text. Every image is a same-tab follow link to its exact official product path.

No test suite, gate, browser QA, multi-width browser proof, Superflow, or Cactus quality loop was run. The evidence below is the catalogue inventory, live endpoint evidence, and Vercel production build explicitly required by brief 6160.

## Mapping and frame implementation

- Image-to-page mapping: `J:\presidential-thc-oklahoma\src\content\assets.json`.
- Typed product catalogue: `J:\presidential-thc-oklahoma\src\content\products.json`.
- Mapping adapter and unique placement-alt generation: `J:\presidential-thc-oklahoma\src\content\assets.ts`.
- Existing frame component: `J:\presidential-thc-oklahoma\src\components\content-figure.tsx`.
- Overflow placement: `J:\presidential-thc-oklahoma\src\components\article-page.tsx`.

`content-figure.tsx` retains only the semantic figure, same-tab product link, and portrait `Image`. Its `Ornament`, `content-figure__frame`, border rule, frame SVG, and ornament markup were removed. The overflow grid renders direct linked `Image` elements. The associated frame/rule/ornament selectors were removed from `globals.css`; a final source scan found **0** remaining frame-overlay references. Result: **0 composites with a double gold frame**.

## Pre-swap product-image inventory

At commit `015d539`, `src/content/assets.json` held **84** active product-image references, not the brief's estimated 88. The exact previous page inventory was:

| Route | Count | Previous filenames |
|---|---:|---|
| `/` | 10 | `presidential-house-line-moon-rocks-home.webp`<br>`presidential-house-line-blunt-home.webp`<br>`presidential-house-line-pre-roll-home.webp`<br>`presidential-house-line-mini-blunt-home.webp`<br>`presidential-strawberry-moon-rocks-home.webp`<br>`presidential-cap-junky-blunt-home.webp`<br>`presidential-cherry-gelato-pre-roll-home.webp`<br>`presidential-gorilla-goo-mini-blunt-home.webp`<br>`presidential-nino-brown-moon-rocks-home.webp`<br>`presidential-x-thc-design-mini-blunt-home.webp` |
| `/moon-rocks` | 8 | `presidential-garlic-cookies-moon-rocks.webp`<br>`presidential-ghost-haze-moon-rocks.webp`<br>`presidential-gorilla-goo-moon-rocks.webp`<br>`presidential-grape-moon-rocks.webp`<br>`presidential-peach-mango-moon-rocks.webp`<br>`presidential-pink-cookies-moon-rocks.webp`<br>`presidential-skywalker-moon-rocks.webp`<br>`presidential-watermelon-moon-rocks.webp` |
| `/blunts` | 8 | `presidential-apricotti-blunt.webp`<br>`presidential-blue-dream-blunt.webp`<br>`presidential-blue-raspberry-blunt.webp`<br>`presidential-crescendo-blunt.webp`<br>`presidential-daniel-larusso-blunt.webp`<br>`presidential-galactic-gas-blunt.webp`<br>`presidential-garlic-cookies-blunt.webp`<br>`presidential-ghost-haze-train-blunt.webp` |
| `/pre-rolls` | 8 | `presidential-blue-dream-infused-pre-roll.webp`<br>`presidential-blue-raspberry-infused-pre-roll.webp`<br>`presidential-cap-junky-infused-pre-roll.webp`<br>`presidential-galactic-gas-infused-pre-roll.webp`<br>`presidential-garlic-cookies-infused-pre-roll.webp`<br>`presidential-ghost-haze-train-infused-pre-roll.webp`<br>`presidential-gorilla-goo-infused-pre-roll.webp`<br>`presidential-grape-infused-pre-roll.webp` |
| `/minis` | 8 | `presidential-cap-junky-mini-blunt.webp`<br>`presidential-cherry-gelato-mini-blunt.webp`<br>`presidential-crescendo-mini-blunt.webp`<br>`presidential-orange-push-pop-mini-blunt.webp`<br>`presidential-peach-mango-mini-blunt.webp`<br>`presidential-pink-cookies-mini-blunt.webp`<br>`presidential-skywalker-mini-blunt.webp`<br>`presidential-watermelon-mini-blunt.webp` |
| `/silver` | 8 | `presidential-pineapple-silver-pre-roll.webp`<br>`presidential-strawberry-silver-pre-roll.webp`<br>`presidential-tropical-silver-pre-roll.webp`<br>`presidential-watermelon-silver-pre-roll.webp`<br>`presidential-grape-silver-blunt.webp`<br>`presidential-peach-mango-silver-blunt.webp`<br>`presidential-pineapple-silver-blunt.webp`<br>`presidential-tropical-silver-blunt.webp` |
| `/gold` | 8 | `presidential-king-louis-gold-pre-roll.webp`<br>`presidential-nyc-diesel-gold-pre-roll.webp`<br>`presidential-papaya-punch-gold-pre-roll.webp`<br>`presidential-pink-cookies-gold-pre-roll.webp`<br>`presidential-rainbow-belts-gold-pre-roll.webp`<br>`presidential-sfv-og-gold-pre-roll.webp`<br>`presidential-skywalker-gold-pre-roll.webp`<br>`presidential-waui-gold-pre-roll.webp` |
| `/rose-gold` | 8 | `presidential-cereal-milk-rose-gold-placeholder.webp`<br>`presidential-cosmic-cookies-rose-gold-placeholder.webp`<br>`presidential-gods-gift-rose-gold-placeholder.webp`<br>`presidential-wedding-cake-rose-gold-placeholder.webp`<br>`presidential-white-walker-rose-gold-placeholder.webp`<br>`presidential-cereal-milk-rose-gold-square-placeholder.webp`<br>`presidential-cosmic-cookies-rose-gold-square-placeholder.webp`<br>`presidential-wedding-cake-rose-gold-square-placeholder.webp` |
| `/find` | 5 | `presidential-cherry-gelato-moon-rocks-find.webp`<br>`presidential-laura-charles-moon-rocks-find.webp`<br>`presidential-waui-moon-rocks-find.webp`<br>`presidential-whoa-si-whoa-moon-rocks-find.webp`<br>`presidential-xj-13-moon-rocks-find.webp` |
| `/retailers` | 5 | `presidential-gorilla-goo-blunt-retailers.webp`<br>`presidential-king-louis-blunt-retailers.webp`<br>`presidential-nyc-diesel-blunt-retailers.webp`<br>`presidential-papaya-punch-blunt-retailers.webp`<br>`presidential-rainbow-belts-blunt-retailers.webp` |
| `/oklahoma` | 5 | `presidential-orange-push-pop-pre-roll-oklahoma.webp`<br>`presidential-peach-mango-pre-roll-oklahoma.webp`<br>`presidential-xj-13-pre-roll-oklahoma.webp`<br>`presidential-xxx-pre-roll-oklahoma.webp`<br>`presidential-house-line-mini-pre-roll-oklahoma.webp` |
| `/about` | 3 | `presidential-daniel-larusso-moon-rocks-about.webp`<br>`presidential-laura-charles-blunt-about.webp`<br>`presidential-cherry-gelato-single-mini-blunt-about.webp` |

## Source inventory and classification

- Products discovered: **213**.
- Composite pairs: **213**.
- Files copied: **426**.
- Missing copied files: **0**.
- SHA-256 source-to-public mismatches: **0 of 426**; every copied composite is byte-identical to the read-only Oklahoma source.
- Square dimensions: **213 at 1,200×1,200**.
- Portrait dimensions: **213 at 1,080×1,350**.
- Missing sitemap slugs in the source manifest: **0**.

The exact filename priority rule produced:

| Format | Products |
|---|---:|
| Moon Rock | 43 |
| Blunt | 67 |
| Pre-Roll | 52 |
| Mini | 51 |
| **Total** | **213** |

Official live product metadata produced:

| Series result | Products |
|---|---:|
| Silver | 55 |
| Gold | 124 |
| Rose Gold | 0 |
| Unresolved to Silver/Gold/Rose Gold | 34 |
| **Total** | **213** |

The 34 unresolved composites belong to 11 live pages labeled Presidential Line or Presidential x THC Design rather than Silver, Gold, or Rose Gold. They appear on their exact format pages only. No product in the supplied 213-image catalogue resolves to Rose Gold on the live main site, so `/rose-gold` received no invented product classification and no legacy placeholder.

| Unresolved live product family | Live page label | Composites |
|---|---|---:|
| Apricotti | Presidential Line | 1 |
| Daniel LaRusso | Presidential Line | 4 |
| Garlic Cookies | Presidential Line | 5 |
| Ghost Haze Train | Presidential Line | 5 |
| Guava Haze | Presidential Line | 1 |
| Head Cheese | Presidential Line | 4 |
| Iced Lemon | Presidential Line | 1 |
| Laura Charles | Presidential Line | 4 |
| Nino Brown | Presidential Line | 4 |
| Whoa Si Whoa | Presidential Line | 4 |
| Presidential x THC Design | Presidential Moon Rocks | 1 |
| **Total** |  | **34** |

Their exact asset IDs and filenames remain recorded in `src/content/products.json`; `series` is explicitly `null` for each rather than guessed.

## Page allocation

| Route | Total placements | Portrait sections | Square grid | Duplicate asset IDs | Repeated supplied hrefs |
|---|---:|---:|---:|---:|---:|
| `/` | 24 | 10 | 14 | 0 | 0 |
| `/moon-rocks` | 43 | 8 | 35 | 0 | 23 |
| `/blunts` | 67 | 8 | 59 | 0 | 31 |
| `/pre-rolls` | 52 | 8 | 44 | 0 | 24 |
| `/minis` | 51 | 8 | 43 | 0 | 34 |
| `/silver` | 55 | 8 | 47 | 0 | 48 |
| `/gold` | 124 | 8 | 116 | 0 | 105 |
| `/rose-gold` | 0 | 0 | 0 | 0 | 0 |
| `/find` | 12 | 5 | 7 | 0 | 0 |
| `/retailers` | 12 | 5 | 7 | 0 | 0 |
| `/oklahoma` | 12 | 5 | 7 | 0 | 0 |
| `/about` | 8 | 3 | 5 | 0 | 0 |

- Total rendered placements across the site: **460**.
- Unique approved products represented: **213 of 213**.
- Products present on their format page: **213 of 213**.
- Products not placed: **0**.
- Linked placements: **460 of 460**.
- Unique product composites with an exact product link: **213 of 213**.
- Unlinked composites: **0**.
- Distinct official product URLs: **37**.
- Product URL results: **37 HTTP 200; 0 HTTP 404**.
- Hrefs outside `https://presidentialmoonrocks.com/moon-rocks/{slug}`: **0**.
- Duplicate asset IDs on one page: **0**.
- Duplicate grid headings: **0**.
- Duplicate alt text: **0**.
- Alt text range: **8–14 words**, inside the required 5–15 range.
- Broken image references after the swap: **0**.
- Active images sourced from another state: **0**; every active product filename carries `-oklahoma` and every copied source came from the read-only Oklahoma folder.

Broad selections are deterministic, balanced across all four formats, and contain no repeated asset ID or destination URL on one page. Format and official series repetition across different pages is intentional.

### Source-map conflict: 213 composites, 37 destination URLs

The supplied manifest defines 213 unique asset IDs/composite pairs but only 37 distinct `sitemap-product-slug` values. Thirty-three live slugs map to more than one approved composite. Consequently, the two requirements “put every supplied product on its complete format and series page” and “do not repeat a product destination on one page” cannot both be true on the complete format/series pages. For example, `/gold` must contain all 124 Gold composites, but the manifest provides only 19 Gold destination URLs.

The chosen priority was the brief's central all-213 placement requirement: every asset ID appears once on its exact format page and, when officially classified, once on its exact series page. Every composite links to the exact slug supplied by `source-map.csv`. Avoidable repeated hrefs were removed from all five broad-selection pages. This conflict and decision are also recorded in `DEFECTS.md` rather than being reported as a false zero.

## Grid and responsive delivery

The overflow grid is structural CSS Grid with `minmax(0, 1fr)` tracks and fluid images:

- Below 768px: one column, which includes the required below-480px state.
- 768–1,023px: two columns.
- 1,024–1,279px: three columns.
- 1,280px and above: four columns.

All product placements use `next/image` with explicit source dimensions and `sizes`. The first article product may load eagerly; later article images and every overflow image use lazy loading. Live HTML for `/` and `/gold` contained optimizer URLs and **zero** full-size Oklahoma product files used directly as `<img src>` values.

At a 390px mobile viewport assumption with 2× density, the production optimizer was queried at 750px for product images and 828px for the home hero. The largest initial image payload was the homepage:

- Requests: **2** (hero plus first product).
- Optimized bytes: **144,111**.
- Optimized transfer: **0.137 MiB**.

The largest page by active source-image weight is `/gold`:

- Product placements: **124**.
- Selected raw source bytes: **18,717,040** / **17.850 MiB**.
- Full-scroll optimized mobile bytes at 750px and quality 75: **7,647,664** / **7.293 MiB**.
- Optimizer requests returning 200: **124 of 124**.
- Individual optimized derivative range: **50,059–81,963 bytes**.
- Initial eager product derivative: **59,469 bytes**.

The 7.293 MiB figure is the cumulative transfer only after approaching all 124 images during a complete scroll. The initial route does not send those originals or all derivatives at once: the first product may be eager and the remaining catalogue images are lazy. Live page source contained optimizer URLs and **0** full-size Oklahoma product files used directly as `<img src>` values.

## Image sitemap and retired assets

Production `https://presidentialthcoklahoma.com/image-sitemap.xml` returned HTTP 200 with:

- `<image:image>` entries: **213**.
- Oklahoma square composite references: **213**.
- Retired `/images/products/` references: **0**.

After every active reference moved to the new catalogue, **139** old product/placeholder files totaling **22,570,396 bytes** were removed from `public/images/products`. The Oklahoma hero, Presidential banner, crest, map media, fonts, and favicon set were preserved.

## Decisions made where the brief left a choice

1. Treated each of the 213 manifest asset IDs as the supplied product-placement unit, because the brief identifies 213 products while the manifest supplies 213 unique IDs and composite pairs.
2. Used the filename priority exactly as written: mini, then blunt, then preroll/pre-roll, then Moon Rock.
3. Resolved series from each distinct live product page's title/description metadata. Presidential Line and THC Design records remain `series: null` and format-only; no series was inferred from artwork or naming.
4. Used portraits for the existing right-side article slots and squares for the overflow grid.
5. Kept the article grid after the existing sources/link-directory content so it remains the final page-body block immediately above the shared footer.
6. Chose broad counts of 24 home, 12 Find, 12 Retailers, 12 Oklahoma, and 8 About. The selector rotates through all four formats and rejects a destination already used on that page.
7. Gave every page its own catalogue heading through `assets.json`; no heading repeats.
8. Kept one column until the specified 768px two-column breakpoint, then three at 1,024px and four at 1,280px.
9. Generated alt text from live product name, filename-derived format, asset variant, and unique page context. This makes all 460 rendered placement alts unique even when one asset appears on format and series pages.
10. Put one square entry per manifest asset in the image sitemap and assigned it to its canonical format page. This keeps the sitemap at exactly 213 instead of duplicating format/series/broad placements.
11. Preserved all 213 required format placements when the 37-URL source map made the no-repeated-destination rule impossible on complete format/series pages; eliminated repeats wherever the broad selections allowed a choice.
12. Measured mobile transfer from the production Next optimizer at a 390px/2× assumption and reported both initial and full-scroll totals.
13. Removed the legacy product folder only after the active-source scan returned zero `/images/products/` references.

## Production result

### Required outcome ledger

| Required report item | Result |
|---|---:|
| Approved products represented | 213 / 213 |
| Products not placed | 0 |
| Duplicate asset ID on one page | 0 |
| Double-framed composites | 0 |
| Broken image references | 0 |
| Unique composites linked to their supplied own product slug | 213 / 213 |
| Unlinked composites | 0 |
| Distinct product hrefs returning 404 | 0 |
| Duplicate alt strings | 0 |
| Active images sourced from another state | 0 |
| Public routes returning 200 | 12 / 12 |
| Product entries in live image sitemap | 213 |

The only non-zero exception is repeated destination URLs on complete format/series pages, caused by the supplied 213-to-37 source-map relationship documented above and in `DEFECTS.md`.

Vercel’s production build completed successfully with Next.js 16.3.0 and generated all 21 static/dynamic outputs. All twelve public routes returned HTTP 200 after aliasing:

`/`, `/moon-rocks`, `/blunts`, `/pre-rolls`, `/minis`, `/silver`, `/gold`, `/rose-gold`, `/find`, `/retailers`, `/oklahoma`, `/about`.

The immutable deployment and the custom apex both returned HTTP 200. Vercel reports the deployment status as **Ready**.

## Twelve page commits

1. `/` — `d0788f5` — Load complete Oklahoma catalogue on home page
2. `/moon-rocks` — `0fd7338` — Load complete Moon Rocks image catalogue
3. `/blunts` — `d2c3cad` — Load complete blunts image catalogue
4. `/pre-rolls` — `fa92e6f` — Load complete pre-rolls image catalogue
5. `/minis` — `48572cd` — Load complete minis image catalogue
6. `/silver` — `cb3affa` — Load complete Silver series image catalogue
7. `/gold` — `22d9904` — Load complete Gold series image catalogue
8. `/rose-gold` — `c935130` — Record live Rose Gold series classification
9. `/find` — `c1e6ab1` — Load representative Find Us image selection
10. `/retailers` — `ad08c64` — Load representative retailers image selection
11. `/oklahoma` — `ebebfe7` — Load representative Oklahoma image selection
12. `/about` — `51c4c0b` — Load representative about image selection

Catalogue-ID correction and legacy cleanup: `e3c6d3a`.

Broad-page unique-destination correction and source-map defect log: `7700618`.

## Git and rollback

This local repository has no configured Git remote, and the authenticated GitHub account has no matching `presidential-thc-oklahoma` repository. The required local commits exist, but there is no destination to push to without creating or being given a remote. Vercel production deployment succeeded directly from the committed J-drive tree.

Previous known-good production deployment:

`https://presidential-thc-oklahoma-i5nqt7asl-paulie-pauliewoods-projects.vercel.app`

Rollback from `J:\presidential-thc-oklahoma`:

```powershell
vercel rollback https://presidential-thc-oklahoma-i5nqt7asl-paulie-pauliewoods-projects.vercel.app --yes
```

To undo only the final broad-page destination correction while retaining the full catalogue, roll back to the prior Ready 6160 deployment:

```powershell
vercel rollback https://presidential-thc-oklahoma-gn777xgcv-paulie-pauliewoods-projects.vercel.app --yes
```
