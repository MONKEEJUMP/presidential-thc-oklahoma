# Presidential THC Oklahoma

## Project Identity

- Name: Presidential THC Oklahoma
- Canonical root: `J:\presidential-thc-oklahoma`
- Product mission: Publish the official Presidential property for Oklahoma and direct licensed patients to `presidentialmoonrocks.com`.
- Current phase: Build and deploy the twelve-page product-first launch site defined by brief 6142.

## Non-Negotiables

- This J-drive folder is the only forward working home.
- The property is official and pro-Presidential, never neutral or publication-like.
- Keep product packaging visible throughout; every product image links to its matching product detail page on the main site.
- Do not build a locator, publish retailer addresses, add a CMS, age gate, video, news feed, dropdown, parallax, scroll animation, or smooth scrolling.
- Do not make medical, effects, or unsupported potency claims.
- Do not invent facts, dates, figures, sources, social URLs, or current patient/dispensary counts.
- Do not modify any sister Presidential repository or the official asset source. They are read-only references.
- Preserve the one-H1 rule, self-canonicals, index/follow metadata, image sitemap, and explicit AI-crawler allowances.

## Architecture

- Next.js App Router, TypeScript, Tailwind/PostCSS, no CMS.
- Typed page registry: `src/content/pages.ts`.
- Shared rendering: `src/components/article-page.tsx`.
- Shared image ledger: `src/content/assets.json`.
- Catch-all route: `src/app/[[...slug]]/page.tsx` with `dynamicParams = false`.
- Public product art: `public/images/products`.

## Commands

- Install: `npm install`
- Prepare approved media: `npm run assets`
- Develop: `npm run dev`
- Production build: `npm run build`
- Deploy: `vercel --prod`

## Verification Exception

The controlling 6142 build brief explicitly forbids test suites, smoke tests, browser QA, multi-width proofs, baseline captures, and verification passes. Build and deploy directly, then report live HTTP status as requested. Any implementation problem goes into `DEFECTS.md`, then work continues.

## Git And Secrets

- Never commit `.env*`, credentials, `.vercel`, dependency folders, or build output.
- Commit only project source, approved public assets, and required reports.
- Do not rewrite unrelated work or use destructive Git commands.

## Artifacts And Closeout

- Defect ledger: `DEFECTS.md`.
- Required report: `docs/6142-SPUD-BUILD-REPORT.md`.
- Durable project memory: `C:\Users\DJ PAULIEWOOD\Codex_Brain_Vault\Codex Brain\Project Index\Presidential THC Oklahoma.md`.
- Closeout states what changed, where the project stands, live deployment, rollback command, unresolved risks, and next move.
