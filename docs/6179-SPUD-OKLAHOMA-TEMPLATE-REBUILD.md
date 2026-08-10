# 6179 — Template-Based Oklahoma Image Rebuild

Date: 2026-08-10  
Canonical repo: `J:\presidential-thc-oklahoma`  
Deployed runtime commit: `82b270503a711fd25df3b9a22e51272263567877`

## What Was Wrong And What Changed

The prior generator rebuilt the frame from separate line and ornament primitives inside every one of the 426 product composites. It had split horizontal rules and independent straight side rules rather than one closed rounded-rectangle foundation. It also lacked rounded outer-canvas clipping. That architecture allowed the ornament to read as a floating graphic, made the corners wrong, and repeated the same frame work 426 times.

The replacement builds the frame once per finished template:

- Eight deterministic Oklahoma backdrop crops multiplied by two output formats produce exactly 16 templates.
- Each template starts with a full-bleed crop of `ok-hero.webp` and Gaussian blur sigma 3.5. No overlay, tint, scrim, darkening, vignette, haze, opacity layer, or letterbox is present.
- A single closed rounded rectangle supplies all four frame edges. A mask interrupts only the top and bottom centre segments, and the champagne ornaments bridge those interruptions.
- The canvas is clipped to transparent rounded corners after the backdrop and frame are composed.
- Products composite only the finished template, a source-alpha-aware soft shadow, and the whole source image.

The outside prompt said that eight crops already existed, but the current disk held the prior twelve-crop pass. The requested eight-crop template architecture was treated as authoritative and replaced those per-product assignments. No other scope was expanded.

## Template Set

Template directory:

`J:\presidential-state-images\_templates\oklahoma`

Files:

- `ok-01-square.png` through `ok-08-square.png`
- `ok-01-portrait.png` through `ok-08-portrait.png`
- `templates.json`

All 16 PNG templates have a real alpha channel. Their four corner pixels are transparent. Square templates are `1200x1200`; portrait templates are `1080x1350`.

### Required visual checkpoint

`ok-01-square.png` was opened before the composite phase. Factual observation confirmed:

- The gold rule renders on the top, bottom, left, and right edges.
- The frame corners and outer canvas corners are rounded.
- The top and bottom ornaments interrupt their rules rather than floating independently.
- The area outside the rounded canvas corners is transparent.
- There is no black bar, haze, dark overlay, or letterboxing.
- The Oklahoma City canal, bridge, and surrounding place details remain recognizable behind the fixed sigma 3.5 blur.

## Exact Safe Areas

The frame inner edge is deflated on every side by 9% of its inner width.

| Format | Left | Top | Right | Bottom | Width | Height | Deflation |
|---|---:|---:|---:|---:|---:|---:|---:|
| Square | 159 | 159 | 1041 | 1041 | 882 | 882 | 96.840px |
| Portrait | 143 | 143 | 937 | 1207 | 794 | 1064 | 87.156px |

Template geometry is also recorded per crop in:

`J:\presidential-state-images\_templates\oklahoma\templates.json`

## Deterministic Crop Assignment

The generator normalizes the lowercase basename of each source file, computes a 32-bit FNV-1a hash, and selects `hash modulo 8`. The catalogue order and run order do not affect template choice. All eight crop IDs were used by the final set.

The pipeline uses fixed crop anchors, fixed template files, fixed resize settings, fixed alpha handling, fixed quality selection, and fixed Sharp/WebP options. Identical source files and tool versions therefore produce byte-identical outputs.

## Source Transparency

- Sources inspected: 213.
- Sources carrying an alpha channel: 116.
- Sources with genuinely non-opaque alpha pixels: 106.

Those existing alpha channels were preserved rather than silently flattened or treated as a new background-removal operation. The complete source canvas was scaled and centred; no U2Net, rembg, segmentation, mask creation, or background-removal process was used.

Per-source transparency evidence:

`J:\presidential-state-images\_manifest\6179-template-oklahoma-source-alpha.csv`

## Composite Results

- Products: 213.
- Files regenerated: 426.
- Exact pre-generation filenames recorded: 426.
- Square/portrait pairs: 213/213.
- Dimensions: 213 at `1200x1200`; 213 at `1080x1350`.
- Renamed, added, or dropped files: 0.
- Missing referenced files: 0.
- Unknown placement product IDs: 0.
- Shared-library/repo filename mismatches: 0.
- Shared-library/repo byte mismatches: 0.
- Outputs without an alpha channel: 0.
- Outputs with a non-transparent corner pixel: 0.

The completed `24K Moon Rock Blunt` square composite was opened after generation. It visibly retains the whole yellow package artwork, uses the backdrop edge to edge with no letterboxing, has transparent rounded canvas corners, and carries a clear soft offset shadow rather than reading as a flat sticker.

### File sizes

| Metric | Bytes | Approximate |
|---|---:|---:|
| Smallest | 71,530 | 69.85 KiB |
| Largest | 204,162 | 199.38 KiB |
| Average | 121,048 | 118.21 KiB |
| Total | 51,566,528 | 49.18 MiB |

- Target: under 204,800 bytes.
- Files over target: 0.
- Quality exceptions: 0.

## Filename And Trace Artifacts

- Pre-generation filename contract: `J:\presidential-state-images\_manifest\6179-template-oklahoma-filename-contract-before.txt`
- Saved before images: `J:\presidential-state-images\_manifest\6179-template-oklahoma-before-images`
- Output template/hash/size trace: `J:\presidential-state-images\_manifest\6179-template-oklahoma-output-trace.csv`
- Metrics: `J:\presidential-state-images\_manifest\6179-template-oklahoma-metrics.json`

## Required Proof Sheets

1. All 16 labelled templates: `J:\presidential-state-images\_manifest\6179-oklahoma-template-sheet.jpg`
2. Before beside after, same product: `J:\presidential-state-images\_manifest\6179-oklahoma-template-before-after.jpg`
3. All 426 regenerated composites: `J:\presidential-state-images\_manifest\6179-oklahoma-template-stacked-contact-sheet.jpg`

## Code And Catalogue Scope

The deployed runtime commit changes only:

- 426 exact-path WebPs under `J:\presidential-thc-oklahoma\public\images`
- `J:\presidential-thc-oklahoma\scripts\rebuild-state-images-6161.mjs`

`assets.json`, `products.json`, `assets.ts`, `content-figure.tsx`, `article-page.tsx`, `globals.css`, every page component, copy, sitemap, locator, and hero implementation are untouched. The working catalogue remains 213 products and 460 placements across 12 pages.

## Reuse For Another State

The generator has separate template and composite phases so a template can be inspected before any product is replaced. A different state is passed with arguments; the script itself is not rewritten:

```powershell
node scripts/rebuild-state-images-6161.mjs --phase templates --state michigan --state-code mi --hero J:\presidential-official\web\public\media\states\mi-hero.webp --source-root J:\presidential-official\sources\client\google-drive-drop\_EXTRACTED --library-root J:\presidential-state-images --repo J:\presidential-thc-michigan
```

After opening `mi-01-square.png` and accepting its template:

```powershell
node scripts/rebuild-state-images-6161.mjs --phase composites --state michigan --state-code mi --hero J:\presidential-official\web\public\media\states\mi-hero.webp --source-root J:\presidential-official\sources\client\google-drive-drop\_EXTRACTED --library-root J:\presidential-state-images --repo J:\presidential-thc-michigan
```

The target state library and repo must already expose the exact 426-name contract. The script stops before generation if the source boundary or filename contract does not match.

## Deployment

- Vercel production URL: `https://presidential-thc-oklahoma-jo6hnr7yp-paulie-pauliewoods-projects.vercel.app`
- Production alias: `https://presidentialthcoklahoma.com`
- Deployment ID: `dpl_HsoJQwM85cdM824YNPSjmrpmftoZ`
- Deployment status: Ready.
- Vercel's production build completed successfully.

All 12 public routes returned HTTP 200 after the swap:

- `/`
- `/moon-rocks`
- `/blunts`
- `/pre-rolls`
- `/minis`
- `/silver`
- `/gold`
- `/rose-gold`
- `/find`
- `/retailers`
- `/oklahoma`
- `/about`

No local test, smoke test, gate, QA suite, review loop, baseline capture, browser QA, Playwright pass, Superflow, Cactus loop, or local build was run. The required visual observations, factual inventory checks, HTTP status reads, and Ready Vercel deployment were the only confirmation work.

## Rollback

The immediately previous production deployment is:

`https://presidential-thc-oklahoma-pnd725fol-paulie-pauliewoods-projects.vercel.app`

Rollback command:

```powershell
vercel rollback https://presidential-thc-oklahoma-pnd725fol-paulie-pauliewoods-projects.vercel.app --yes
```

## Current State And Next Move

The template-based Oklahoma library is live and the deployed runtime is commit `82b270503a711fd25df3b9a22e51272263567877`. No runtime work remains for this stamp. The next state can use the two commands above after its hero, repo, and exact filename contract are available.
