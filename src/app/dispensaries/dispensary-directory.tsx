import retailerData from "@/content/oklahoma-retailers.json";
import Link from "next/link";

import styles from "./dispensaries.module.css";

export type RegionName =
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
  zip?: string;
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
  retailers: readonly Retailer[];
}>;

export type RegionDefinition = Readonly<{
  name: Exclude<RegionName, "Red Carpet Country">;
  slug: string;
  image: string;
  imageAlt: string;
  copy: string;
  metaDescription: string;
}>;

const data = retailerData as unknown as RetailerData;

export const HUB_COPY =
  "Licensed Oklahoma retailers carry Presidential. Presidential is a cannabis brand founded in Los Angeles in 2012, known for its infused Moon Rocks, blunts, pre-rolls and minis. Each dispensary below is independently licensed and chooses its own formats and series, so bring the exact product name from the package and confirm before you go. They are grouped below by the state's six official tourism regions, so you can go straight to the part of Oklahoma you are in.";

export const RED_CARPET_COPY =
  "Red Carpet Country covers northwestern Oklahoma, the widest and least densely settled corner of the state. Licensed retailers carry Presidential across the region.";

export const REGION_PAGES: readonly RegionDefinition[] = [
  {
    name: "Frontier Country",
    slug: "frontier-country",
    image: "/images/oklahoma-regions/ok-region-frontier-country.webp",
    imageAlt:
      "Frontier Country prairie, rural road and Oklahoma City skyline under a blue sky",
    copy:
      "Frontier Country covers central Oklahoma and the state capital region. Licensed retailers carry Presidential here, concentrated through Oklahoma City, Edmond and Norman. Every store listed below is independently owned and licensed, and each one sets its own selection. Availability varies by retailer, so the store nearest you is the fastest way to find what is on the shelf today.",
    metaDescription:
      "Oklahoma Presidential retailers in Frontier Country: Oklahoma City, Edmond, Norman and nearby communities; confirm current product availability.",
  },
  {
    name: "Green Country",
    slug: "green-country",
    image: "/images/oklahoma-regions/ok-region-green-country.webp",
    imageAlt:
      "Green Country lake, forest, highway and Tulsa skyline under a blue sky",
    copy:
      "Green Country runs across northeastern Oklahoma and takes its name from the wooded, lake-filled country around Tulsa. Licensed retailers carry Presidential across the region, and Tulsa is the densest single market outside the capital. Each store is independently owned and licensed and stocks for its own customers, so selection differs from shelf to shelf.",
    metaDescription:
      "Oklahoma Presidential retailers in Green Country: find stores in the Tulsa region, then confirm current product availability with each licensed dispensary.",
  },
  {
    name: "Great Plains Country",
    slug: "great-plains-country",
    image: "/images/oklahoma-regions/ok-region-great-plains-country.webp",
    imageAlt:
      "Great Plains Country granite mountains, bison and red Oklahoma earth under a wide sky",
    copy:
      "Great Plains Country covers southwestern Oklahoma, from the Wichita Mountains out toward the Texas line. Licensed retailers carry Presidential across the region, anchored by Lawton. Distances run longer here than in the metros, so the map link beside each address is the quickest route to the door.",
    metaDescription:
      "Oklahoma Presidential retailers in Great Plains Country: find stores in Lawton and southwestern Oklahoma, and confirm current product availability.",
  },
  {
    name: "Choctaw Country",
    slug: "choctaw-country",
    image: "/images/oklahoma-regions/ok-region-choctaw-country.webp",
    imageAlt:
      "Choctaw Country pine forest, clear lake, mountain foothills and a cabin",
    copy:
      "Choctaw Country covers southeastern Oklahoma, the forest, lake and river country along the Arkansas and Texas borders. Licensed retailers carry Presidential here, spread through small towns rather than clustered in one city. Each address below links straight to directions.",
    metaDescription:
      "Oklahoma Presidential retailers in Choctaw Country: find stores in the southeast and confirm current product availability with each licensed dispensary.",
  },
  {
    name: "Chickasaw Country",
    slug: "chickasaw-country",
    image: "/images/oklahoma-regions/ok-region-chickasaw-country.webp",
    imageAlt:
      "Chickasaw Country waterfall, turquoise spring creek, oak woodland and pasture",
    copy:
      "Chickasaw Country runs through south central Oklahoma, between the capital region and the Red River. Licensed retailers carry Presidential across the region. The network here reaches across a wide area with most towns served by a single store, so check the closest address before making the drive.",
    metaDescription:
      "Oklahoma Presidential retailers in Chickasaw Country: find stores across south-central Oklahoma and confirm current product availability before visiting.",
  },
];

export const TOTAL_RETAILER_COUNT = data.retailerCount;

export function regionForSlug(slug: string): RegionDefinition | undefined {
  return REGION_PAGES.find((region) => region.slug === slug);
}

export function retailersFor(region: RegionName): readonly Retailer[] {
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

function googleMapsSearchUrl(retailer: DirectoryRetailer) {
  const locality = retailer.zip
    ? `${retailer.city}, OK ${retailer.zip}`
    : `${retailer.city}, OK`;
  const query = `${retailer.name}, ${retailer.address}, ${locality}`;
  const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;

  if (url.length > 2048) {
    throw new Error(`Google Maps URL exceeds 2048 characters for ${retailer.name}`);
  }

  return url;
}

export function RetailerDirectory({
  retailers,
}: {
  retailers: readonly DirectoryRetailer[];
}) {
  return (
    <div className={styles.cityDirectory}>
      {groupByCity(retailers).map(({ city, retailers: cityRetailers }) => (
        <section className={styles.cityGroup} key={city}>
          <h3>{city}</h3>
          <ul>
            {cityRetailers.map((retailer) => (
              <li key={`${retailer.name}-${retailer.address}`}>
                <h4>{retailer.name}</h4>
                <a
                  className={styles.addressLink}
                  href={googleMapsSearchUrl(retailer)}
                  rel="noopener"
                  target="_blank"
                >
                  <address data-retailer-address>
                    <span>{retailer.address}</span>
                    <span>
                      {retailer.city}, OK{retailer.zip ? ` ${retailer.zip}` : ""}
                    </span>
                  </address>
                </a>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}

export function RegionCount(_props: { count: number }) {
  return (
    <p className={styles.regionCount}>
      <Link href="/find">find a licensed retailer</Link>
    </p>
  );
}
