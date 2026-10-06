# 6187 — Complete and Link the Dispensary Addresses

Date: 2026-08-11  
Site: `https://presidentialthcoklahoma.com`  
Page: `https://presidentialthcoklahoma.com/dispensaries`

## Outcome

Every retailer row on `/dispensaries` now renders a complete two-line Oklahoma address. The address itself is a server-rendered, followable Google Maps search link that opens in a new tab.

The city headings, retailer grouping, sorting, counts, page copy, sourcing line, region descriptions, metadata, breadcrumb, jump links, images, locator, sitemap, navigation, phone behavior, and structured-data behavior were not changed.

## Files changed

- `src/app/dispensaries/page.tsx`
  - Added the stored ZIP to the directory-row type.
  - Added one Google Maps URL helper using `encodeURIComponent` over the exact retailer-name/address/locality query.
  - Changed each street-only `<address>` into a complete two-line `<address>` wrapped by one real `<a>`.
  - Added the required 2,048-character URL ceiling guard.
- `src/app/dispensaries/dispensaries.module.css`
  - Kept the existing muted address treatment and added a restrained teal underline, gold hover state, and visible keyboard focus state.
  - Made each address line a block line.
- `docs/6187-SPUD-COMPLETE-ADDRESSES.md`
  - Required report; outside the two-file runtime ceiling.

## Before and after sample

Retailer: `Dispensary Near Me`

Before:

```text
9551 E. Waterloo Rd
```

After:

```text
9551 E. Waterloo Rd
Arcadia, OK 73007
```

The existing `Arcadia` city heading remains unchanged.

Full rendered Maps destination:

```text
https://www.google.com/maps/search/?api=1&query=Dispensary%20Near%20Me%2C%209551%20E.%20Waterloo%20Rd%2C%20Arcadia%2C%20OK%2073007
```

## Raw production HTML observations

The following facts were collected from the served HTML at the custom production domain after Vercel marked the deployment Ready and applied the alias:

| Observation | Result |
| --- | ---: |
| `/dispensaries` HTTP status | 200 |
| `<address data-retailer-address>` elements | 194 |
| Address elements containing a five-digit ZIP | 194 |
| Google Maps search links | 194 |
| Links matching their exact dataset-derived query | 194 |
| Links using `api=1` | 194 |
| Links with an encoded query and no literal spaces or commas | 194 |
| Links with `target="_blank"` | 194 |
| Links with `rel="noopener"` | 194 |
| Missing ZIPs | 0 |
| `tel:` links | 0 |
| `application/ld+json` blocks | 0 |
| `noindex` occurrences | 0 |

Each Maps link has `rel="noopener"` only; no `nofollow` was added. The links remain normal follow links.

The served canonical is:

```text
https://presidentialthcoklahoma.com/dispensaries
```

The served robots metadata is `index, follow`.

## Production route observations

Every URL in the served sitemap returned HTTP 200:

| Route | Status |
| --- | ---: |
| `/` | 200 |
| `/moon-rocks` | 200 |
| `/blunts` | 200 |
| `/pre-rolls` | 200 |
| `/minis` | 200 |
| `/silver` | 200 |
| `/gold` | 200 |
| `/rose-gold` | 200 |
| `/find` | 200 |
| `/retailers` | 200 |
| `/oklahoma` | 200 |
| `/about` | 200 |
| `/dispensaries` | 200 |

## Prompt corrections and implementation decisions

- No factual prompt correction was necessary. The dataset contains 194 retailers, and all 194 currently have a stored five-digit ZIP.
- The implementation still handles a future missing ZIP without inventing one: that row would render `city, OK` and omit the ZIP from its Maps query.
- The entire requested query is encoded with `encodeURIComponent`; the longest current Maps URL is 175 characters, safely below the 2,048-character ceiling.
- The link wraps the complete `<address>` rather than adding a separate button, so the whole address is tappable while retaining semantic address markup.

## Commit, deployment, and rollback

Runtime implementation commit:

```text
2878e82dfcd959447c883d4720dc1366b5478e0a
```

Ready production deployment:

```text
https://presidential-thc-oklahoma-6ywxvzge0-paulie-pauliewoods-projects.vercel.app
```

Production alias:

```text
https://presidentialthcoklahoma.com
```

Previous Ready deployment:

```text
https://presidential-thc-oklahoma-qaumcy5i2-paulie-pauliewoods-projects.vercel.app
```

Production rollback command:

```powershell
vercel rollback https://presidential-thc-oklahoma-qaumcy5i2-paulie-pauliewoods-projects.vercel.app --yes
```

Local source rollback command:

```powershell
git revert 2878e82
```

## Testing boundary

No local build, test, smoke test, gate, QA suite, browser QA, Playwright run, Superflow, Cactus loop, baseline capture, or formal verification pass was run. The only build was the required Vercel production deployment. The remaining observations were the brief-required dataset, raw-HTML, metadata, and route-status reads.
