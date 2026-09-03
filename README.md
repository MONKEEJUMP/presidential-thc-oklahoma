# Presidential THC Oklahoma

This repository is the Git source for [presidentialthcoklahoma.com](https://presidentialthcoklahoma.com), the official Presidential product site for Oklahoma.

## Development

The application uses the Next.js App Router, React, TypeScript, Tailwind/PostCSS, local Clash Display fonts, and a committed Oklahoma retailer snapshot.

```powershell
npm install
npm run build
npm run dev
```

Vercel connection and production deployment are managed separately. Do not connect, deploy, or overwrite the live property from a source-recovery branch.

## Project rules

- Treat Presidential as the brand, never as a strain.
- Keep the site official, product-first, Oklahoma-specific, and free of political messaging.
- Do not add medical, dosing, or unsupported potency claims.
- Use `https://presidentialmoonrocks.com` only for the canonical Presidential catalog and the Oklahoma locator path.
- Use the approved official hubs: `https://presidentialcannabis.net`, `https://presidentialthc.net`, and `https://presidentialblunts.net`.
- Do not link or name unapproved lookalike domains.
- Do not add InLinks JavaScript, Google Analytics, or Google Tag Manager without an explicit approved requirement.
- Keep Oklahoma configuration in `src/config/state.ts` and preserve Oklahoma-specific copy and assets.
- Preserve one H1 per page, self-referencing canonicals, index/follow metadata, sitemap coverage, robots rules, and AI-crawler allowances.
- Keep retailer purchases and current inventory with licensed Oklahoma dispensaries; this site does not sell products directly.
