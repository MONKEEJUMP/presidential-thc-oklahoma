# 0816-PRES-QMVX-0007 — Oklahoma Dispensary Region Pages

Date: 2026-08-16  
Repository: `J:\presidential-thc-oklahoma`  
Production: `https://presidentialthcoklahoma.com`

## Outcome

The Oklahoma dispensary directory now has one statewide hub and five standalone tourism-region pages. The five page regions carry their own approved 6185 image, verbatim regional copy, computed retailer count, and server-rendered retailer address list. Red Carpet Country remains on the hub with its four retailer entries.

The shared directory component ports the prior address renderer: retailers remain grouped by city, each retailer name remains an `h4`, each address remains a server-rendered `address[data-retailer-address]` element, and every address remains linked to the universal Google Maps search URL.

## Production observations

<table>
  <thead>
    <tr><th>Region</th><th>Address count rendered</th><th>Route</th><th>HTTP status</th></tr>
  </thead>
  <tbody>
    <tr><td>Frontier Country</td><td>100</td><td><code>/dispensaries/frontier-country</code></td><td>200</td></tr>
    <tr><td>Green Country</td><td>51</td><td><code>/dispensaries/green-country</code></td><td>200</td></tr>
    <tr><td>Great Plains Country</td><td>14</td><td><code>/dispensaries/great-plains-country</code></td><td>200</td></tr>
    <tr><td>Choctaw Country</td><td>14</td><td><code>/dispensaries/choctaw-country</code></td><td>200</td></tr>
    <tr><td>Chickasaw Country</td><td>11</td><td><code>/dispensaries/chickasaw-country</code></td><td>200</td></tr>
    <tr><td>Red Carpet Country</td><td>4</td><td><code>/dispensaries</code></td><td>200</td></tr>
  </tbody>
</table>

Rendered sum: `100 + 51 + 14 + 14 + 11 + 4 = 194`.

Raw production HTML contains 194 `address[data-retailer-address]` elements and 194 universal Google Maps links across the six routes. Every route contains one `h1`, its self-referencing canonical, zero telephone links, and zero `LocalBusiness` markers. No physical address string appears on two different pages.

The production sitemap returns HTTP 200 and contains 18 URLs, including all five new region routes.

## Address uniqueness clarification

The committed snapshot contains 194 unique retailer records. It contains 193 distinct physical address strings because two separately named Frontier Country retailer records share `2921 NW 10th St, Oklahoma City, OK 73107`: Bingo 101 (High Society OKC 10th St) and Prospectors LLC.

Both records remain on the Frontier Country page, matching their committed region assignment. No retailer record was removed, and no physical address appears on two different pages.

## Files changed

- `src/app/dispensaries/dispensary-directory.tsx`
- `src/app/dispensaries/page.tsx`
- `src/app/dispensaries/[region]/page.tsx`
- `src/app/sitemap.ts`
- `docs/0816-PRES-QMVX-0007-OKLAHOMA-DISPENSARY-REGION-PAGES.md`

The existing dispensary CSS module was reused without modification, preserving the established layout, fonts, and spacing. No header, footer, navigation styling, content snapshot, or image file changed.

## Git and deployment

Implementation commit: `f85d5d4ec7a5110f869b5e3b6fa53b0c0891495a`  
Commit subject: `Split Oklahoma dispensaries by region`

The repository has no configured Git remote, so no push was attempted.

Vercel deployment:

- Deployment ID: `dpl_8yuiCFed6Jhrk393h3brBsWGeSqq`
- Deployment URL: `https://presidential-thc-oklahoma-ll72v3372-paulie-pauliewoods-projects.vercel.app`
- Target: production
- Status: Ready
- Production alias: `https://presidentialthcoklahoma.com`
- Production alias: `https://www.presidentialthcoklahoma.com`

## Prompt corrections

The prompt describes 194 retailer addresses. The committed source is more precisely 194 retailer records at 193 distinct physical address strings because two Frontier Country retailers share one street address. The implementation preserves both licensed retailer records, places both on Frontier Country, and confirms that no physical address crosses from one page to another.

The instruction to create five region pages alongside six region totals is internally consistent because Red Carpet Country remains on the hub as directed. No route was added for Red Carpet Country.

## Process boundary

No local build, test suite, smoke test, QA gate, browser QA, multi-width proof, baseline capture, superflow, or Cactus quality loop was run. The Vercel production build was the release operation. The production observations above came from direct URL fetches and raw HTML inspection permitted by the controlling brief.
