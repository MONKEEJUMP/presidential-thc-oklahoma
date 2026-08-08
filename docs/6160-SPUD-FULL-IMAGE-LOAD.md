# 6160 SPUD Full Image Load Report

Date: 2026-08-07  
Project: `J:\presidential-thc-oklahoma`  
Approved image source: `J:\presidential-state-images\oklahoma` (read only)  
Production: https://presidentialthcoklahoma.com  
Immutable deployment: https://presidential-thc-oklahoma-gn777xgcv-paulie-pauliewoods-projects.vercel.app  
Vercel deployment: `dpl_6AnjDYNHZZJTngZtXgAbbBU1zhbb`  
Deployed source commit: `e3c6d3a3c128e340609b69bfdc2c5efe5ec6199b`

## Outcome

The Oklahoma property now uses the full approved state catalogue: 213 products, each with one 1,200×1,200 square WebP and one 1,080×1,350 portrait WebP. All 426 source files were copied byte-for-byte with their supplied filenames. Portraits fill the existing right-aligned article placements; square composites fill plain, unframed overflow grids at the foot of each eligible page.

The body copy, header, footer, navigation, locator, and hero were not changed. The decorative image overlay was removed so the supplied final composites render without a second frame, caption, overlay, or hover text. Every image is a same-tab follow link to its exact official product path.

No test suite, gate, browser QA, multi-width browser proof, Superflow, or Cactus quality loop was run. The evidence below is the catalogue inventory, live endpoint evidence, and Vercel production build explicitly required by brief 6160.

## Source inventory and classification

- Products discovered: **213**.
- Composite pairs: **213**.
- Files copied: **426**.
- Missing copied files: **0**.
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

## Page allocation

| Route | Total placements | Portrait section placements | Square grid placements | Duplicate product on page |
|---|---:|---:|---:|---:|
| `/` | 24 | 10 | 14 | 0 |
| `/moon-rocks` | 43 | 8 | 35 | 0 |
| `/blunts` | 67 | 8 | 59 | 0 |
| `/pre-rolls` | 52 | 8 | 44 | 0 |
| `/minis` | 51 | 8 | 43 | 0 |
| `/silver` | 55 | 8 | 47 | 0 |
| `/gold` | 124 | 8 | 116 | 0 |
| `/rose-gold` | 0 | 0 | 0 | 0 |
| `/find` | 12 | 5 | 7 | 0 |
| `/retailers` | 12 | 5 | 7 | 0 |
| `/oklahoma` | 12 | 5 | 7 | 0 |
| `/about` | 8 | 3 | 5 | 0 |

- Total rendered placements across the site: **460**.
- Unique approved products represented: **213 of 213**.
- Products present on their format page: **213 of 213**.
- Linked placements: **460 of 460**.
- Unique product composites with an exact product link: **213 of 213**.
- Distinct official product URLs: **37**.
- Product URL results: **37 HTTP 200; 0 HTTP 404**.
- Duplicate grid headings: **0**.
- Duplicate alt text: **0**.
- Alt text range: **8–14 words**, inside the required 5–15 range.

Broad selections are deterministic, balanced across all four formats, and do not repeat the same product on one page. Format and official series repetition across different pages is intentional.

## Grid and responsive delivery

The overflow grid is structural CSS Grid with `minmax(0, 1fr)` tracks and fluid images:

- Below 768px: one column, which includes the required below-480px state.
- 768–1,023px: two columns.
- 1,024–1,279px: three columns.
- 1,280px and above: four columns.

All product placements use `next/image` with explicit source dimensions and `sizes`. The first article product may load eagerly; later article images and every overflow image use lazy loading. Live HTML for `/` and `/gold` contained optimizer URLs and **zero** full-size Oklahoma product files used directly as `<img src>` values.

At a 390px mobile viewport assumption with 2× density, the production optimizer was queried at 750px for the first portrait and 828px for the home hero. The largest initial image payload was the homepage:

- Requests: **2** (hero plus first product).
- Optimized bytes: **144,111**.
- Optimized transfer: **0.137 MiB**.
- Budget: below the requested **1.5–2 MiB** ceiling.

All remaining catalogue images are lazy and are fetched only as the viewport approaches them. The largest catalogue page, `/gold`, has one eager product derivative of 59,469 bytes; its remaining products are lazy.

## Image sitemap and retired assets

Production `https://presidentialthcoklahoma.com/image-sitemap.xml` returned HTTP 200 with:

- `<image:image>` entries: **213**.
- Oklahoma square composite references: **213**.
- Retired `/images/products/` references: **0**.

After every active reference moved to the new catalogue, **139** old product/placeholder files totaling **22,570,396 bytes** were removed from `public/images/products`. The Oklahoma hero, Presidential banner, crest, map media, fonts, and favicon set were preserved.

## Production result

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

## Git and rollback

This local repository has no configured Git remote, and the authenticated GitHub account has no matching `presidential-thc-oklahoma` repository. The required local commits exist, but there is no destination to push to without creating or being given a remote. Vercel production deployment succeeded directly from the committed J-drive tree.

Previous known-good production deployment:

`https://presidential-thc-oklahoma-i5nqt7asl-paulie-pauliewoods-projects.vercel.app`

Rollback from `J:\presidential-thc-oklahoma`:

```powershell
vercel rollback https://presidential-thc-oklahoma-i5nqt7asl-paulie-pauliewoods-projects.vercel.app --yes
```
