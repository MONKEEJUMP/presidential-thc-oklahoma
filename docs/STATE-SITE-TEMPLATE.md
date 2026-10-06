# Presidential state-site template

This repository is the Oklahoma template for the seven remaining Presidential state sites.

For a new state build, change only these state-owned inputs:

1. Edit `src/config/state.ts` with the new state code, state name, domain, approved tagline, hero-image path, and official state-locator URL.
2. Add the approved state hero image at the path named by `STATE.heroImage`.
3. Rewrite each page's body copy for the new state's real products, retail context, sources, cannabis program, and legal facts. Body copy is intentionally not generated from the config.

Do not rebuild or restyle the shared sticky header, FIND A STORE dropdown, nationwide-map component, map media, locator markup, locator CSS, buttons, responsive rules, or results UI. Structural state names, state codes, page titles, headings, labels, metadata, API scope, and locator links read from `src/config/state.ts`.

## Mandatory shared typography lock

Every state clone must keep these two official font files and the existing `src/app/layout.tsx` weight mapping unchanged:

- `public/fonts/clash-display-semibold.woff2` mapped across weights `400 600`
- `public/fonts/clash-display-bold.woff2` mapped across weights `700 900`

This unusual mapping is intentional and comes directly from the main Presidential site. Semibold must own the normal 400–600 display range so the locator's `00000`, ZIP labels, buttons, navigation, and other display text retain the thick Presidential typography. Do not substitute a true Regular/400 font and do not repair individual state sites with one-off locator overrides.

The nationwide map is shared across every state site because it presents the complete Presidential footprint. Its rotating state callouts are baked into the copied official video. The copied poster/fallback is the official Oklahoma frame; Oklahoma therefore supplies the current resting frame without changing the shared animation.
