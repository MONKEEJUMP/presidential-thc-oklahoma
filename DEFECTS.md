# DEFECTS

## 2026-08-06 — Brief milestone conflicts with official record

- Status: Contained; build continuing.
- Brief statement: Timeline minimum names “2021 HB 2154 amendments.”
- Finding: Oklahoma Legislature and Oklahoma government records identify HB 2154 as the 2015 “Katie and Cayman’s Law” measure establishing a limited CBD research/pilot framework, not a 2021 amendment to the SQ 788 medical marijuana program.
- Action: The site omits the unsupported 2021 characterization, uses the verified 2015 milestone only where relevant, and records the omission in the final report.

## 2026-08-06 — Moratorium endpoint advanced after supplied fact set

- Status: Contained; build continuing.
- Brief statement: HB 2095 (2023) extended Oklahoma’s commercial-license moratorium.
- Finding: OMMA’s current official FAQ says HB 3143 (2026) subsequently extended the endpoint to August 1, 2028, unless OMMA’s Executive Director determines the named readiness conditions are complete.
- Action: The site retains the requested HB 2095 history and adds the current 2026 extension with an official OMMA citation.

## 2026-08-06 — Referenced classic blunt asset absent

- Status: Resolved; build continuing.
- Finding: The approved product-art folder contains no `Copy of classic_blunt.jpg`, although a derived file with that name exists in a separate sister-site library.
- Action: Replaced the missing source with the unused, readable `Mini Blunts\Copy of pres_miniblunt.jpg`, renamed it descriptively, and kept the matching Presidential House Line destination.

## 2026-08-06 — Rose Gold product photography is not yet published

- Status: Contained; build continuing.
- Finding: The approved client art archive contains no Rose Gold product files, and each of the five official Rose Gold product pages says its photography is in production.
- Action: Created eight clearly labeled, brand-aligned WebP placeholder artworks using only the five official product names. The site does not invent packaging or present generated art as product photography; every placeholder links to the matching official product page and can be replaced one-for-one when photography arrives.

## 2026-08-06 — 6142 supersedes the paused 6141 structure

- Status: Resolved; build continuing.
- Finding: The revised brief cuts the regulatory-first page set and replaces it with twelve product-first routes.
- Action: Preserved the existing visual system and held source material while replacing only the active information architecture, page content, navigation, and image manifest required by 6142.

## 2026-08-06 — First Vercel deployment was protected and misclassified

- Status: Resolved; production redeployed.
- Finding: Vercel created the new project with its default Authentication protection and framework preset `Other`. The first build completed, but generated deployment aliases returned Vercel-level `NOT_FOUND` after protection was removed.
- Action: Disabled Vercel Authentication for this public product site through the documented project API, set the framework preset to `nextjs`, and redeployed. The stable Vercel alias and all twelve page routes now return HTTP 200.

## 2026-08-06 — Custom-domain DNS is not pointed to Vercel

- Status: External DNS action pending; Vercel deployment is live.
- Finding: Both `presidentialthcoklahoma.com` and `www.presidentialthcoklahoma.com` are attached to the Vercel project, but the domain still uses GoDaddy nameservers and does not yet have the Vercel record requested by the platform.
- Action: Vercel reports the required record as `A 76.76.21.21` for the apex and for `www`. The project already contains the permanent `www`-to-apex redirect; it will take effect when DNS reaches Vercel. The stable public deployment remains available at `https://presidential-thc-oklahoma.vercel.app` meanwhile.

## 2026-08-06 — Assumed pre-roll format URL returned 404

- Status: Resolved; corrected before closeout.
- Finding: `https://presidentialmoonrocks.com/presidential-prerolls` returned HTTP 404 during the required source-resolution inventory. The canonical collection at `/moon-rocks/presidential-prerolls` returns HTTP 200.
- Action: Repointed the second contextual pre-roll link to the canonical collection path with distinct anchor text and removed the failing URL from the page’s source list.
