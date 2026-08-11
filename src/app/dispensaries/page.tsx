import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

import { RetailerLocator } from "@/components/retailer-locator";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import retailerData from "@/content/oklahoma-retailers.json";
import { absoluteUrl, SITE_NAME } from "@/lib/site";

import styles from "./dispensaries.module.css";

const PAGE_TITLE = "Where to Buy Presidential in Oklahoma";
const PAGE_DESCRIPTION =
  "Every licensed Oklahoma retailer carrying Presidential, listed by region — from the Oklahoma City metro to Green Country, the Wichitas, the Ouachitas and the Arbuckles.";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: absoluteUrl("/dispensaries") },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    type: "website",
    url: absoluteUrl("/dispensaries"),
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    siteName: SITE_NAME,
    images: [
      {
        url: absoluteUrl(
          "/images/oklahoma-regions/ok-region-frontier-country.webp",
        ),
        width: 1280,
        height: 720,
        alt: "Frontier Country prairie and Oklahoma City skyline under a blue sky",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: [
      absoluteUrl(
        "/images/oklahoma-regions/ok-region-frontier-country.webp",
      ),
    ],
  },
};

type RegionName =
  | "Frontier Country"
  | "Green Country"
  | "Great Plains Country"
  | "Choctaw Country"
  | "Chickasaw Country"
  | "Red Carpet Country";

type DirectoryRetailer = Readonly<{
  name: string;
  address: string;
  city: string;
}>;

type Retailer = DirectoryRetailer & Readonly<{
  state: string;
  zip: string;
  latitude: number;
  longitude: number;
  county: string;
  region: RegionName;
}>;

type RetailerData = Readonly<{
  retailerCount: number;
  normalizedCityRows: number;
  oklahomaCityAliasRows: number;
  unresolvedRetailers: readonly DirectoryRetailer[];
  retailers: readonly Retailer[];
}>;

const data = retailerData as unknown as RetailerData;

const REGION_LINKS: ReadonlyArray<{
  id: string;
  label: string;
  region: RegionName;
}> = [
  { id: "frontier-country", label: "Frontier Country", region: "Frontier Country" },
  { id: "green-country", label: "Green Country", region: "Green Country" },
  { id: "great-plains-country", label: "Great Plains Country", region: "Great Plains Country" },
  { id: "choctaw-country", label: "Choctaw Country", region: "Choctaw Country" },
  { id: "chickasaw-country", label: "Chickasaw Country", region: "Chickasaw Country" },
  { id: "elsewhere-in-oklahoma", label: "Elsewhere in Oklahoma", region: "Red Carpet Country" },
];

function retailersFor(region: RegionName) {
  return data.retailers.filter((retailer) => retailer.region === region);
}

function groupByCity(retailers: readonly DirectoryRetailer[]) {
  const groups = new Map<string, DirectoryRetailer[]>();
  for (const retailer of retailers) {
    const cityRetailers = groups.get(retailer.city) ?? [];
    cityRetailers.push(retailer);
    groups.set(retailer.city, cityRetailers);
  }

  return [...groups.entries()]
    .sort(([left], [right]) => left.localeCompare(right))
    .map(([city, cityRetailers]) => ({
      city,
      retailers: cityRetailers.sort(
        (left, right) =>
          left.name.localeCompare(right.name) ||
          left.address.localeCompare(right.address),
      ),
    }));
}

function RetailerDirectory({ retailers }: { retailers: readonly DirectoryRetailer[] }) {
  return (
    <div className={styles.cityDirectory}>
      {groupByCity(retailers).map(({ city, retailers: cityRetailers }) => (
        <section className={styles.cityGroup} key={city}>
          <h3>{city}</h3>
          <ul>
            {cityRetailers.map((retailer) => (
              <li key={`${retailer.name}-${retailer.address}`}>
                <h4>{retailer.name}</h4>
                <address data-retailer-address>{retailer.address}</address>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}

function RegionCount({ count }: { count: number }) {
  return (
    <p className={styles.regionCount}>
      <strong>{count}</strong> licensed retailers
    </p>
  );
}

export default function DispensariesPage() {
  const frontierRetailers = retailersFor("Frontier Country");
  const greenRetailers = retailersFor("Green Country");
  const greatPlainsRetailers = retailersFor("Great Plains Country");
  const choctawRetailers = retailersFor("Choctaw Country");
  const chickasawRetailers = retailersFor("Chickasaw Country");
  const redCarpetRetailers = retailersFor("Red Carpet Country");

  return (
    <>
      <SiteHeader currentPath="/dispensaries" />
      <main id="main-content">
        <header className={styles.hero}>
          <nav aria-label="Breadcrumb" className={styles.breadcrumbs}>
            <Link href="/">Home</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">Dispensaries</span>
          </nav>
          <h1>{PAGE_TITLE}</h1>
        </header>

        <div className={styles.pageShell}>
          <section aria-label="Introduction" className={styles.intro}>
            <p>
              Presidential is wholesale. It does not sell direct, to anyone, anywhere. Every blunt, pre-roll, mini and jar of Moon Rocks reaches you through a licensed Oklahoma dispensary that chose to carry the brand.
            </p>
            <p>This page lists every one of them.</p>
            <p>
              They are grouped by the six regions the Oklahoma Tourism &amp; Recreation Department uses to divide the state, because Oklahoma is not one place. The drive from the pine forests of Broken Bow to the granite of the Wichita Mountains crosses four distinct landscapes, and the shops in between are as different as the country they sit in.
            </p>
            <p>
              <strong>What this page can and cannot tell you.</strong> It tells you which dispensaries carry Presidential. It cannot tell you what is on the shelf today. Each shop decides independently which strains, which formats and how much to stock, and that changes by store and by week. Call ahead or use the search at the bottom of this page to find the closest one to you.
            </p>
            <p>For adults 21+ where legal.</p>
          </section>

          <nav aria-label="Oklahoma dispensary regions" className={styles.jumpLinks}>
            <p>Jump to a region</p>
            <ul>
              {REGION_LINKS.map((link) => (
                <li key={link.id}>
                  <a href={`#${link.id}`}>
                    <span>{link.label}</span>
                    <strong>{retailersFor(link.region).length}</strong>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className={styles.regionStack}>
            <section className={styles.regionSection} id="frontier-country">
              <header className={styles.regionHeader}>
                <p>Central Oklahoma</p>
                <h2>Frontier Country</h2>
              </header>
              <Image
                alt="Frontier Country prairie, rural road and Oklahoma City skyline under a blue sky"
                className={styles.regionImage}
                height={720}
                priority
                sizes="(max-width: 1439px) calc(100vw - 2rem), 1376px"
                src="/images/oklahoma-regions/ok-region-frontier-country.webp"
                width={1280}
              />
              <div className={styles.regionCopy}>
                <p>
                  Wooded hill country flattens into rolling short-grass prairie here, and keeps going until the horizon does something else. This is the heart of the state — the twelve counties the Tourism Department calls Frontier Country, named for the land runs that filled it in a single afternoon and the territorial-frontier character that never quite left.
                </p>
                <p>
                  Oklahoma City sits at the centre of it, a capital that grew out of a prairie in a day and has been arguing with that fact ever since. Around it: Norman and Stillwater, two college towns with their own weather; Guthrie, which was the territorial capital and still looks it; Edmond, El Reno, Shawnee. Route 66 runs through Arcadia past a round barn and a soda shop with a sixty-six-foot bottle out front.
                </p>
                <p>
                  <strong>Presidential&apos;s Oklahoma story starts here.</strong> More than half of every licensed retailer carrying the brand statewide is inside these twelve counties — the densest concentration anywhere in the state, and by some distance the largest single regional market Presidential has in Oklahoma.
                </p>
                <p>
                  Oklahoma City alone accounts for the largest share, with Edmond and Norman close behind. But the pattern that matters is the spread underneath: Yukon, Bethany, Del City, Guthrie, Shawnee, Chickasha, Midwest City, Moore, Warr Acres, Stillwater, Seminole, and single shops in places like Arcadia, Harrah, Newalla, Newcastle, Noble, Prague, Holdenville and Wetumka.
                </p>
                <p>
                  That tail is the interesting part. A brand that only reaches metro shelves shows up in three cities. Presidential is in twenty-three.
                </p>
              </div>
              <RegionCount count={frontierRetailers.length} />
              <RetailerDirectory retailers={frontierRetailers} />
            </section>

            <section className={styles.regionSection} id="green-country">
              <header className={styles.regionHeader}>
                <p>Northeast Oklahoma</p>
                <h2>Green Country</h2>
              </header>
              <Image
                alt="Green Country lake, forest, highway and Tulsa skyline under a blue sky"
                className={styles.regionImage}
                height={720}
                loading="lazy"
                sizes="(max-width: 1439px) calc(100vw - 2rem), 1376px"
                src="/images/oklahoma-regions/ok-region-green-country.webp"
                width={1280}
              />
              <div className={styles.regionCopy}>
                <p>
                  Green Country earns the name. Eighteen counties of rolling green hills, dense woodland, tumbling rivers and more than forty lakes — the wettest, most forested corner of the state, and the one that surprises people who arrive expecting dust.
                </p>
                <p>
                  Tulsa anchors it: an oil town that spent its boom money on Art Deco and ended up with one of the finest collections of it in the country. North of the city the tallgrass prairie opens out across Osage County. East, the land climbs toward the Ozark foothills. Route 66 threads through it all, past Catoosa and Claremore and Afton, where two stretches of the original nine-foot-wide roadbed still exist.
                </p>
                <p>
                  <strong>This is Presidential&apos;s second market in the state</strong>, and it behaves differently from Frontier Country. About a quarter of the statewide network sits here, with Tulsa carrying the bulk of it.
                </p>
                <p>
                  Beyond Tulsa the footprint runs to Broken Arrow, Bartlesville, Bixby, Owasso and Sand Springs, then out into the smaller towns — Bristow, Catoosa, Chelsea, Claremore, Dewey, Henryetta, Miami, Muskogee, Nowata, Oologah, Skiatook, Vinita, Wyandotte, Beggs, Afton.
                </p>
                <p>
                  Twenty-one towns, most of them holding a single shop. Green Country is less concentrated than the OKC metro and covers more ground to get there.
                </p>
              </div>
              <RegionCount count={greenRetailers.length} />
              <RetailerDirectory retailers={greenRetailers} />
            </section>

            <section className={styles.regionSection} id="great-plains-country">
              <header className={styles.regionHeader}>
                <p>Southwest Oklahoma</p>
                <h2>Great Plains Country</h2>
              </header>
              <Image
                alt="Great Plains Country granite mountains, bison and red Oklahoma earth under a wide sky"
                className={styles.regionImage}
                height={720}
                loading="lazy"
                sizes="(max-width: 1439px) calc(100vw - 2rem), 1376px"
                src="/images/oklahoma-regions/ok-region-great-plains-country.webp"
                width={1280}
              />
              <div className={styles.regionCopy}>
                <p>Fourteen counties of open plain, and then, without much warning, mountains.</p>
                <p>
                  The Wichita Mountains rise straight out of flat farmland in Comanche County — granite, some of the oldest exposed rock on the continent, worn down to boulders and domes. A free-ranging bison herd lives on the refuge. Longhorn cattle too. The soil runs red, the sky runs big, and the whole region feels like the plains states rather than the wooded east.
                </p>
                <p>
                  Lawton is the anchor, sitting at the foot of the Wichitas next to Fort Sill. West of it, Altus and the cotton country. North, Anadarko and the Caddo County farmland. East, Duncan and Stephens County oil.
                </p>
                <p>
                  <strong>Presidential&apos;s southwest footprint is compact and concentrated.</strong> Lawton carries most of it, with the remainder spread across Duncan, Altus, Anadarko and Binger.
                </p>
                <p>
                  It is a smaller network than the metros, and it covers a lot of country — which is exactly why the search at the bottom of this page matters more out here than it does in Oklahoma City.
                </p>
              </div>
              <RegionCount count={greatPlainsRetailers.length} />
              <RetailerDirectory retailers={greatPlainsRetailers} />
            </section>

            <section className={styles.regionSection} id="choctaw-country">
              <header className={styles.regionHeader}>
                <p>Southeast Oklahoma</p>
                <h2>Choctaw Country</h2>
              </header>
              <Image
                alt="Choctaw Country pine forest, clear lake, mountain foothills and a cabin"
                className={styles.regionImage}
                height={720}
                loading="lazy"
                sizes="(max-width: 1439px) calc(100vw - 2rem), 1376px"
                src="/images/oklahoma-regions/ok-region-choctaw-country.webp"
                width={1280}
              />
              <div className={styles.regionCopy}>
                <p>The greenest and most mountainous corner of the state, and the one that looks least like anyone&apos;s idea of Oklahoma.</p>
                <p>
                  Ten counties of the Ouachita foothills, tall pine forest, clear rivers and lakes people drive six hours to reach. Broken Bow and Beavers Bend built an economy on cabins in the woods. The Talimena Drive runs the ridgeline into Arkansas. Rivers here run clear over gravel, not brown over clay.
                </p>
                <p>
                  McAlester sits at the northern edge with its Italian mining history and the restaurants that came with it. Durant anchors the south near the Texas line and Lake Texoma. Poteau, Hugo, Atoka, Idabel and Krebs fill in between.
                </p>
                <p>
                  <strong>Presidential&apos;s southeast network is the most evenly spread in the state.</strong> It carries roughly the same total as Great Plains Country but distributes it across nine different towns rather than concentrating it in one — Durant leads, with McAlester and Broken Bow behind, then Atoka, Colbert, Hugo, Krebs, Mead and Poteau.
                </p>
                <p>
                  For a region this rural, that spread is unusual. It means the brand reached the small towns here rather than only the highway stops.
                </p>
              </div>
              <RegionCount count={choctawRetailers.length} />
              <RetailerDirectory retailers={choctawRetailers} />
            </section>

            <section className={styles.regionSection} id="chickasaw-country">
              <header className={styles.regionHeader}>
                <p>South Central Oklahoma</p>
                <h2>Chickasaw Country</h2>
              </header>
              <Image
                alt="Chickasaw Country waterfall, turquoise spring creek, oak woodland and pasture"
                className={styles.regionImage}
                height={720}
                loading="lazy"
                sizes="(max-width: 1439px) calc(100vw - 2rem), 1376px"
                src="/images/oklahoma-regions/ok-region-chickasaw-country.webp"
                width={1280}
              />
              <div className={styles.regionCopy}>
                <p>Seven counties where the cross timbers meet open pasture and the water comes out of the ground cold.</p>
                <p>
                  The Arbuckle Mountains run through the middle — ancient, worn to rolling hills, cut through by I-35 in a roadcut geologists visit on purpose. Turner Falls drops seventy-seven feet into a pool below. Spring-fed creeks run through the Chickasaw National Recreation Area at Sulphur. It is gentler country than the Wichitas and greener than the plains.
                </p>
                <p>
                  Ardmore anchors the region. Around it: Sulphur, Davis, Madill, Marietta, Tishomingo and Pauls Valley, in ranching and horse country that runs south toward the Red River.
                </p>
                <p>
                  <strong>Presidential&apos;s south central network centres on Ardmore</strong>, which carries close to half of the regional total, with the rest across Madill, Marietta, Lindsay and Sulphur.
                </p>
                <p>
                  It is the smallest of the five regional sections, in a part of the state where the towns are small and far apart.
                </p>
              </div>
              <RegionCount count={chickasawRetailers.length} />
              <RetailerDirectory retailers={chickasawRetailers} />
            </section>

            <section className={`${styles.regionSection} ${styles.elsewhereSection}`} id="elsewhere-in-oklahoma">
              <header className={styles.regionHeader}>
                <p>Red Carpet Country and the northwest</p>
                <h2>Elsewhere in Oklahoma</h2>
              </header>
              <div className={styles.regionCopy}>
                <p>Presidential&apos;s reach in northwest Oklahoma is thin, and it would be dishonest to dress it up.</p>
                <p>
                  Red Carpet Country covers sixteen counties across the northwest and the Panhandle — the driest and least populated part of the state, named for the red soil, and home to Black Mesa, the highest point in Oklahoma at nearly five thousand feet. It is a long way from anywhere and there are very few dispensaries in it.
                </p>
                <p>A small number of licensed retailers carry Presidential up here, in Enid and Kingfisher.</p>
                <p>If you are in the northwest, the search below is the fastest way to find whether anything near you carries the brand.</p>
              </div>
              <RegionCount count={redCarpetRetailers.length} />
              <RetailerDirectory retailers={redCarpetRetailers} />
            </section>
          </div>

          <section aria-labelledby="dispensary-locator-heading" className={styles.closingBlock} id="find-a-dispensary">
            <div className={styles.closingCopy}>
              <h2 id="dispensary-locator-heading">Can&apos;t find one near you?</h2>
              <p>Enter your zip code and the search returns the closest licensed Oklahoma retailers carrying Presidential, ordered by distance.</p>
              <p>
                Availability varies by retailer. Every shop on this page carries Presidential, but which strains and which formats are on the shelf on any given day is the shop&apos;s decision. This page tells you where to go. The shop tells you what they have.
              </p>
              <p>For adults 21+ where legal.</p>
            </div>

            {data.unresolvedRetailers.length > 0 ? (
              <aside className={styles.unresolvedRetailers} aria-labelledby="unresolved-retailers-heading">
                <h3 id="unresolved-retailers-heading">Retailers awaiting regional placement</h3>
                <RetailerDirectory retailers={data.unresolvedRetailers} />
              </aside>
            ) : null}

            <div className={styles.locator}>
              <Suspense fallback={null}>
                <RetailerLocator showPhone={false} />
              </Suspense>
            </div>
          </section>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
