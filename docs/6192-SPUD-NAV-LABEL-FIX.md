# 6192 — Fix the Find Us Label on Five State Sites

Date: 2026-08-11

## Outcome

All five production sites now render `Find Us` for the `/find` destination in the primary navigation. Exact-case `Find It` appears zero times in every served homepage. The `/find` route and every other sitemap route remain unchanged and return HTTP 200.

No route, href, folder, sitemap entry, canonical, navigation order, styling, footer wording, page copy, image, product file, locator, API route, hero, tagline, retailer count, Sanity record, or official-site file was changed.

## Files and lines changed

| State | File and line | Change | Label location |
| --- | --- | --- | --- |
| Oklahoma | `J:\presidential-thc-oklahoma\src\content\pages.ts:133` | Homepage destination heading `Find it` → `Find Us` | One page-registry file. The shared primary-nav registry was already correct. |
| California | `J:\presidential-thc-california\src\content\pages.ts:137` | Homepage destination heading `Find it` → `Find Us` | One page-registry file. The shared primary-nav registry was already correct. |
| Nevada | `J:\presidential-thc-nevada\src\lib\site.ts:15` | `/find` nav label `Find It` → `Find Us` | One shared navigation-registry file. |
| Arizona | `J:\presidential-thc-arizona\src\lib\site.ts:15` | `/find` nav label `Find It` → `Find Us` | One shared navigation-registry file. |
| New York | `J:\presidential-thc-newyork\src\lib\site.ts:15` | `/find` nav label `Find It` → `Find Us` | One shared navigation-registry file. |

Each repository received exactly one one-line runtime substitution.

## Secondary occurrence review

- No footer, breadcrumb, aria-label, or title attribute used `Find It` in any of the five source trees.
- The Oklahoma and California homepage section headings were the only in-body destination labels using that wording, and both were changed.
- Existing footer text such as `Find Presidential` is different, correct wording and was left unchanged.
- Oklahoma contains the lowercase prose sentence fragment `find it through a licensed Oklahoma dispensary`. It is ordinary approved page copy, not a destination label. It was preserved because the brief also prohibits page-copy changes. Next.js emits that same sentence once as visible HTML and once in its serialized React payload, which explains the two case-insensitive raw-source matches. Exact-case `Find It` is zero.

## Raw production HTML and route observations

| State | Primary-nav `/find` links reading `Find Us` | Exact-case `Find It` anywhere | `/find` | Sitemap routes at 200 |
| --- | ---: | ---: | ---: | ---: |
| Oklahoma | 1 | 0 | 200 | 13 / 13 |
| California | 1 | 0 | 200 | 12 / 12 |
| Nevada | 1 | 0 | 200 | 12 / 12 |
| Arizona | 1 | 0 | 200 | 12 / 12 |
| New York | 1 | 0 | 200 | 12 / 12 |

The primary-nav block was detected in all five served homepages. Combined route result: 61 of 61 sitemap URLs returned HTTP 200, with no failed route.

Routes observed:

- Oklahoma: `/`, `/moon-rocks`, `/blunts`, `/pre-rolls`, `/minis`, `/silver`, `/gold`, `/rose-gold`, `/find`, `/retailers`, `/oklahoma`, `/about`, `/dispensaries`.
- California: `/`, `/moon-rocks`, `/blunts`, `/pre-rolls`, `/minis`, `/silver`, `/gold`, `/rose-gold`, `/find`, `/retailers`, `/california`, `/about`.
- Nevada: `/`, `/moon-rocks`, `/blunts`, `/pre-rolls`, `/minis`, `/silver`, `/gold`, `/rose-gold`, `/find`, `/retailers`, `/nevada`, `/about`.
- Arizona: `/`, `/moon-rocks`, `/blunts`, `/pre-rolls`, `/minis`, `/silver`, `/gold`, `/rose-gold`, `/find`, `/retailers`, `/arizona`, `/about`.
- New York: `/`, `/moon-rocks`, `/blunts`, `/pre-rolls`, `/minis`, `/silver`, `/gold`, `/rose-gold`, `/find`, `/retailers`, `/new-york`, `/about`.

## Deployment paths and Ready aliases

| State | Deployment path | Ready deployment | Confirmed custom alias |
| --- | --- | --- | --- |
| Oklahoma | Direct linked-project Vercel CLI: `vercel --cwd J:\presidential-thc-oklahoma --prod --yes` | `https://presidential-thc-oklahoma-1vio5vii4-paulie-pauliewoods-projects.vercel.app` | `https://presidentialthcoklahoma.com` |
| California | `git push origin main`; Vercel GitHub production integration on `main` | `https://presidential-thc-california-p61hbyco8.vercel.app` | `https://presidentialthccalifornia.com` |
| Nevada | `git push origin main`; Vercel GitHub production integration on `main` | `https://presidential-thc-nevada-bo1qx5494-paulie-pauliewoods-projects.vercel.app` | `https://presidentialthcnevada.com` |
| Arizona | `git push origin main`; Vercel GitHub production integration on `main` | `https://presidential-thc-arizona-ih9bgfa5w-paulie-pauliewoods-projects.vercel.app` | `https://presidentialthcarizona.com` |
| New York | `git push origin main`; Vercel GitHub production integration on `main` | `https://presidential-thc-newyork-kwbuvhoyo-paulie-pauliewoods-projects.vercel.app` | `https://presidentialthcnewyork.com` |

Vercel reported all five deployments `Ready`, and inspecting each custom domain resolved it to the matching new deployment above.

## Commits and rollback commands

### Oklahoma

Commit:

```text
38c63f98a6efc4b8d638a0992050359dfac329b5
```

Production rollback:

```powershell
vercel rollback https://presidential-thc-oklahoma-6ywxvzge0-paulie-pauliewoods-projects.vercel.app --yes
```

Source rollback:

```powershell
git -C J:\presidential-thc-oklahoma revert 38c63f9
```

### California

Commit:

```text
e41a16cd22a2c5b96f688fe8eee6b5c0cc0cde60
```

Production rollback:

```powershell
vercel rollback https://presidential-thc-california-j96fhpzut.vercel.app --yes
```

Source rollback:

```powershell
git -C J:\presidential-thc-california revert e41a16c
git -C J:\presidential-thc-california push origin main
```

### Nevada

Commit:

```text
855ac89da970a509ab493e58ce37967853cdb27c
```

Production rollback:

```powershell
vercel rollback https://presidential-thc-nevada-85uuvz22u-paulie-pauliewoods-projects.vercel.app --yes
```

Source rollback:

```powershell
git -C J:\presidential-thc-nevada revert 855ac89
git -C J:\presidential-thc-nevada push origin main
```

### Arizona

Commit:

```text
701ac23e4c1c777a23153e3308d7a5eff5fea09a
```

Production rollback:

```powershell
vercel rollback https://presidential-thc-arizona-a2a88k11c-paulie-pauliewoods-projects.vercel.app --yes
```

Source rollback:

```powershell
git -C J:\presidential-thc-arizona revert 701ac23
git -C J:\presidential-thc-arizona push origin main
```

### New York

Commit:

```text
40c3153d736936990fe6f97045910b17a347f252
```

Production rollback:

```powershell
vercel rollback https://presidential-thc-newyork-3umbrxx2l-paulie-pauliewoods-projects.vercel.app --yes
```

Source rollback:

```powershell
git -C J:\presidential-thc-newyork revert 40c3153
git -C J:\presidential-thc-newyork push origin main
```

## Prompt corrections

- The outside brief said all five source nav labels were wrong. Current disk showed Oklahoma and California already had `Find Us` in `src/lib/site.ts`; their remaining defect was the homepage `/find` destination heading `Find it`. The fix changed those headings without rewriting already-correct navigation code.
- The lowercase Oklahoma prose phrase described above was not treated as a label and was not rewritten. This reconciles the requested label correction with the explicit prohibition on changing page copy.
- The four non-Oklahoma repositories are confirmed GitHub-linked Vercel projects whose production branch is `main`; they were deployed through that integration. Oklahoma has no Git remote and was deployed directly with its existing Vercel project binding.

## Testing boundary

No tests, smoke tests, gates, QA suites, formal verification passes, review loops, baseline captures, browser QA, Playwright, Superflow, Cactus quality loop, or local build ran. Vercel production reaching `Ready` was the only build confirmation. The remaining evidence consists only of the brief-required source self-review and factual Vercel/raw-HTTP observations.
