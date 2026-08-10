# 6179 — Oklahoma Image Rebuild

Date: 2026-08-10  
Canonical repo: `J:\presidential-thc-oklahoma`  
Runtime commit: `5036776a75c9c5ce965eec1a0c91eb228e738b0d`

## Done

- Regenerated all 213 Oklahoma products as 426 whole-source composites: 213 square WebP files and 213 portrait WebP files.
- Preserved the exact pre-generation filename set. The before contract contains 426 names, the regenerated shared library contains the same 426 names, and the repo contains the same 426 names.
- Preserved the required dimensions: 213 files at `1200x1200` and 213 files at `1080x1350`.
- Copied the regenerated files to both `J:\presidential-state-images\oklahoma` and `J:\presidential-thc-oklahoma\public\images` with byte-for-byte equality.
- Left the 6160 catalogue and page implementation unchanged: 213 products, 460 placements, `assets.json`, `products.json`, `assets.ts`, routes, components, styles, alt text, and sitemap code were not edited.

## 6161 Recipe Used

- Whole source files were loaded directly from the approved read-only extracted Google Drive tree.
- No background-removal model, masking, U2Net, rembg, segmentation, or cut-out pipeline was used. Source canvases were kept whole, scaled down only with aspect ratio preserved, centered, and never upscaled.
- Artwork breathing room is 9% of the frame's inner width on every side.
- The backdrop comes directly from `ok-hero.webp`: crop, resize, and Gaussian blur sigma 3.5 only. There is no dark overlay, scrim, vignette, tint, grade, haze, or opacity layer.
- Twelve Oklahoma hero positions were generated for both formats, producing 24 reusable backdrop files. All twelve crop positions were assigned in the final 426-image set.
- The gold frame is baked into every file at a 5% inset with a 4px square rule or 3.6px portrait rule. Its gradient is `#F4E3A1 -> #D4B96A -> #8F6B24`, with split top and bottom ornament clusters occupying approximately 30% of the inner width.
- Layer order is backdrop, gold frame, drop shadow, whole source canvas.

## Determinism And Reuse

Generator:

`J:\presidential-thc-oklahoma\scripts\rebuild-state-images-6161.mjs`

Crop assignment is independent of catalogue order. The script normalizes the lowercase source basename, computes a 32-bit FNV-1a hash, and takes the result modulo 12. Fixed inputs, fixed crop anchors, fixed resize settings, fixed WebP quality selection, and fixed Sharp settings make reruns deterministic by construction.

Another state is passed explicitly without editing the script:

```powershell
node scripts/rebuild-state-images-6161.mjs --state michigan --hero J:\presidential-official\web\public\media\states\mi-hero.webp --source-root J:\presidential-official\sources\client\google-drive-drop\_EXTRACTED --library-root J:\presidential-state-images --repo J:\presidential-thc-michigan
```

The target state's shared folder and repo public folder must already carry the same 426-name contract before the overwrite begins. The generator refuses to continue if that contract or the approved source boundary does not match.

## Output Size Accounting

| Metric | Bytes | Approximate |
|---|---:|---:|
| Minimum | 60,282 | 58.87 KiB |
| Maximum | 204,042 | 199.26 KiB |
| Average | 116,003 | 113.28 KiB |
| Total | 49,417,338 | 47.13 MiB |

- Target: under 204,800 bytes per WebP.
- Files over target: 0.
- Quality exceptions: 0.

## Trace And Proof Artifacts

- Pre-generation filename contract: `J:\presidential-state-images\_manifest\6179-oklahoma-filename-contract-before.txt`
- Per-product output/source/hash trace: `J:\presidential-state-images\_manifest\6179-oklahoma-filename-trace.csv`
- Updated shared source trace: `J:\presidential-state-images\_manifest\source-map.csv`
- Machine-readable generation metrics: `J:\presidential-state-images\_manifest\6179-oklahoma-metrics.json`
- Saved old live cut-outs: `J:\presidential-state-images\_manifest\6179-oklahoma-before-cutouts`
- Old cut-out versus new whole-source proof: `J:\presidential-state-images\_manifest\6179-oklahoma-before-after-comparison-sheet.jpg`
- All-426 stacked contact sheet: `J:\presidential-state-images\_manifest\6179-oklahoma-stacked-contact-sheet.jpg`
- Fresh Oklahoma backdrops: `J:\presidential-state-images\_backdrops\oklahoma`

## Factual Integrity Results

- Products: 213.
- Placements: 460 across 12 pages.
- Unique image references: 426.
- Missing referenced files: 0.
- Unknown placement product IDs: 0.
- Shared-library/repo filename mismatches: 0.
- Shared-library/repo byte mismatches: 0.
- Forbidden catalogue/code changes: 0.

Per the controlling brief, no local test suite, smoke test, browser QA, Playwright pass, baseline capture, Superflow, Cactus loop, or local verification build was run.

## Deployment

- Vercel deployment: `https://presidential-thc-oklahoma-pnd725fol-paulie-pauliewoods-projects.vercel.app`
- Production alias: `https://presidentialthcoklahoma.com`
- Vercel status: Ready.
- Vercel's production build completed successfully.
- All 12 required production routes returned HTTP 200:
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

## Rollback

The immediately previous production deployment is:

`https://presidential-thc-oklahoma-4oy7uvoqk-paulie-pauliewoods-projects.vercel.app`

Rollback command:

```powershell
vercel rollback https://presidential-thc-oklahoma-4oy7uvoqk-paulie-pauliewoods-projects.vercel.app --yes
```

## Current State And Next Move

The full Oklahoma image library is live on the custom domain and the runtime tree is clean at commit `5036776a75c9c5ce965eec1a0c91eb228e738b0d`. The reusable 6161 recipe is ready for the next state once that state's hero path, repo path, and 426-name contract are supplied.
