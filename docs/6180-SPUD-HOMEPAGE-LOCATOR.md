# 6180 — Oklahoma Homepage Locator

Date: 2026-08-10  
Canonical repo: `J:\presidential-thc-oklahoma`  
Deployed runtime commit: `ed1edf278591d50a4958a35a5f7149372880f8d5`

## Done

The Oklahoma homepage now renders in this order:

1. Existing hero.
2. Existing gold rule at the hero boundary.
3. Full-width official locator.
4. Existing nationwide map.
5. Existing homepage article and everything below it.

The fetched production HTML placed the relevant markers in that same order: hero at index 13,026; homepage locator at 14,613; nationwide map at 16,521; existing pillar article at 18,239.

## Official Component Port

Copied source component:

`J:\presidential-official\web\src\components\presidential\locator\locator-console.tsx`

Copied source stylesheet:

`J:\presidential-official\web\src\components\presidential\locator\locator-console.module.css`

Target component and stylesheet:

- `J:\presidential-thc-oklahoma\src\components\homepage-locator-console.tsx`
- `J:\presidential-thc-oklahoma\src\components\homepage-locator-console.module.css`

The source CSS was copied byte-for-byte. The component retains the official markup, interaction behavior, large ZIP field, GO button, CLEAR and USE MY LOCATION actions, radar/results readout, reduced-motion behavior, automatic five-digit search, and duplicated ZIP instruction.

The homepage calls the official `layout="stacked"` variant used by the main-site homepage. That variant forces the large ZIP field to full width, GO to a full-width bar underneath it, and the two secondary actions side by side beneath GO.

## Required Adaptations

Only the integration boundaries were adapted:

- Main-site locator type imports were defined locally because this repo does not carry the official repo's locator type modules.
- The browser request targets this site's existing `/api/retailers` POST route instead of the official repo's `/api/dispensaries` route.
- Every request includes `state: "OK"` through `STATE.code`.
- The component export was named `HomepageLocatorConsole` to keep it isolated from the unchanged `/find` locator.

The browser never calls the upstream Presidential API directly. `/api/retailers` performs that request server-side without a browser Origin header.

## Duplicate Label

Yes—the duplicate `ENTER YOUR ZIP CODE HERE` treatment came across intentionally. It appears once above the ZIP field and once below the action row, matching the official component source and the instruction to preserve it.

## Nationwide Map

The homepage reuses the existing shared component without editing it:

`J:\presidential-thc-oklahoma\src\components\presidential\media\find-us-nationwide-video.tsx`

The map remains on `/find`; no map asset or `/find` composition was removed or changed.

## Files Changed

The deployed runtime commit changed exactly three files:

- `src/components/article-page.tsx`
- `src/components/homepage-locator-console.tsx`
- `src/components/homepage-locator-console.module.css`

`article-page.tsx` is the actual homepage renderer on disk; there is no standalone homepage component file. Its new branch is guarded by `page.path === "/"`. The existing `page.path === "/find"` branch is unchanged.

No hero, headline, eyebrow, tagline, gold rule, existing homepage copy, product image, alt text, content registry, metadata, H1, route, sitemap, header, footer, navigation, API route, or non-home page changed.

## Prompt Corrections

Two disk facts required narrow corrections:

1. The repo has no dedicated homepage file. The homepage is rendered through the shared `ArticlePage` component, so the insertion was made there behind an exact `/` condition. This does not alter another route.
2. The official component source contains a stale inline placeholder rule that shrinks `00000` to `clamp(0.82rem, 3.6cqi, 1.35rem)`. That contradicted the live reference and the brief's explicit large-zero requirement, so that one inline override was omitted. The copied official CSS therefore supplies the intended `clamp(3.5rem, 19cqi, 7rem)` scale.

No broader redesign or scope change was made.

## Oklahoma API Response

Factual production POST:

```json
{"state":"OK","zip":"73102","limit":10}
```

Response summary:

```json
{"state":"OK","results":10,"nearestName":"Emerald Alley Dispensary","nearestState":"OK","nearestMiles":0.675600427764356}
```

Retailer addresses are not rendered into static homepage HTML. They appear only as dynamic results after a visitor searches.

## Deployment

- Vercel production URL: `https://presidential-thc-oklahoma-85yljcrtf-paulie-pauliewoods-projects.vercel.app`
- Production alias: `https://presidentialthcoklahoma.com`
- Deployment ID: `dpl_DdiCmxMYxMZfTSJLKuZWkkhcgwpE`
- Vercel status: Ready.
- Vercel's production build completed successfully.

All 12 public routes returned HTTP 200:

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

No local test, smoke test, gate, QA suite, review loop, baseline capture, browser QA, Playwright pass, Superflow, Cactus loop, or local build was run. The permitted self-review, factual URL reads, API response, route statuses, and Ready Vercel production deployment were the only confirmation work.

## Rollback

The immediately previous production deployment is:

`https://presidential-thc-oklahoma-jo6hnr7yp-paulie-pauliewoods-projects.vercel.app`

Rollback command:

```powershell
vercel rollback https://presidential-thc-oklahoma-jo6hnr7yp-paulie-pauliewoods-projects.vercel.app --yes
```

## Current State And Next Move

The official full-width locator and nationwide map are live on the Oklahoma homepage. The runtime worktree was clean after deploying commit `ed1edf278591d50a4958a35a5f7149372880f8d5`. No additional 6180 implementation remains; the owner can evaluate the live homepage directly.
