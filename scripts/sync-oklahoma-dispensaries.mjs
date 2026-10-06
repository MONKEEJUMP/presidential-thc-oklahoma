import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const REPO_ROOT = path.resolve(import.meta.dirname, "..");
const SOURCE_ENV = "J:\\presidential-official\\web\\.env.local";
const OUTPUT_FILE = path.join(
  REPO_ROOT,
  "src",
  "content",
  "oklahoma-retailers.json",
);
const COUNTY_SERVICE =
  "https://tigerweb.geo.census.gov/arcgis/rest/services/TIGERweb/State_County/MapServer/1/query";

const REGIONS = {
  "Green Country": [
    "Adair",
    "Cherokee",
    "Craig",
    "Creek",
    "Delaware",
    "Mayes",
    "McIntosh",
    "Muskogee",
    "Nowata",
    "Okmulgee",
    "Osage",
    "Ottawa",
    "Pawnee",
    "Rogers",
    "Sequoyah",
    "Tulsa",
    "Wagoner",
    "Washington",
  ],
  "Frontier Country": [
    "Canadian",
    "Cleveland",
    "Grady",
    "Hughes",
    "Lincoln",
    "Logan",
    "McClain",
    "Oklahoma",
    "Okfuskee",
    "Payne",
    "Pottawatomie",
    "Seminole",
  ],
  "Red Carpet Country": [
    "Alfalfa",
    "Beaver",
    "Blaine",
    "Cimarron",
    "Dewey",
    "Ellis",
    "Garfield",
    "Grant",
    "Harper",
    "Kay",
    "Kingfisher",
    "Major",
    "Noble",
    "Texas",
    "Woods",
    "Woodward",
  ],
  "Great Plains Country": [
    "Beckham",
    "Caddo",
    "Comanche",
    "Cotton",
    "Custer",
    "Greer",
    "Harmon",
    "Jackson",
    "Jefferson",
    "Kiowa",
    "Roger Mills",
    "Stephens",
    "Tillman",
    "Washita",
  ],
  "Chickasaw Country": [
    "Carter",
    "Garvin",
    "Johnston",
    "Love",
    "Marshall",
    "Murray",
    "Pontotoc",
  ],
  "Choctaw Country": [
    "Atoka",
    "Bryan",
    "Choctaw",
    "Coal",
    "Haskell",
    "Latimer",
    "Le Flore",
    "McCurtain",
    "Pittsburg",
    "Pushmataha",
  ],
};

const CANONICAL_CITY_NAMES = [
  "Afton",
  "Altus",
  "Anadarko",
  "Arcadia",
  "Ardmore",
  "Atoka",
  "Bartlesville",
  "Beggs",
  "Bethany",
  "Binger",
  "Bixby",
  "Bristow",
  "Broken Arrow",
  "Broken Bow",
  "Catoosa",
  "Chelsea",
  "Chickasha",
  "Choctaw",
  "Claremore",
  "Colbert",
  "Del City",
  "Dewey",
  "Duncan",
  "Durant",
  "Edmond",
  "Enid",
  "Guthrie",
  "Harrah",
  "Henryetta",
  "Holdenville",
  "Hugo",
  "Kingfisher",
  "Krebs",
  "Lawton",
  "Lindsay",
  "Madill",
  "Marietta",
  "McAlester",
  "Mead",
  "Miami",
  "Midwest City",
  "Moore",
  "Muskogee",
  "Newalla",
  "Newcastle",
  "Noble",
  "Norman",
  "Nowata",
  "Oklahoma City",
  "Oolagah",
  "Owasso",
  "Poteau",
  "Prague",
  "Sand Springs",
  "Seminole",
  "Shawnee",
  "Skiatook",
  "Stillwater",
  "Sulphur",
  "Tulsa",
  "Vinita",
  "Warr Acres",
  "Wetumka",
  "Wyandotte",
  "Yukon",
];

const CITY_NAME_BY_LOWERCASE = new Map(
  CANONICAL_CITY_NAMES.map((city) => [city.toLocaleLowerCase("en-US"), city]),
);
CITY_NAME_BY_LOWERCASE.set("oolagah", "Oologah");

function parseEnvironment(text) {
  return Object.fromEntries(
    text
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter((line) => line && !line.startsWith("#") && line.includes("="))
      .map((line) => {
        const separator = line.indexOf("=");
        const key = line.slice(0, separator).trim();
        let value = line.slice(separator + 1).trim();
        if (
          (value.startsWith('"') && value.endsWith('"')) ||
          (value.startsWith("'") && value.endsWith("'"))
        ) {
          value = value.slice(1, -1);
        }
        return [key, value];
      }),
  );
}

function isPointOnSegment([x, y], [x1, y1], [x2, y2]) {
  const cross = (y - y1) * (x2 - x1) - (x - x1) * (y2 - y1);
  if (Math.abs(cross) > 1e-10) return false;
  return (
    x >= Math.min(x1, x2) - 1e-10 &&
    x <= Math.max(x1, x2) + 1e-10 &&
    y >= Math.min(y1, y2) - 1e-10 &&
    y <= Math.max(y1, y2) + 1e-10
  );
}

function pointInRing(point, ring) {
  let inside = false;
  for (let index = 0, previous = ring.length - 1; index < ring.length; previous = index++) {
    const currentPoint = ring[index];
    const previousPoint = ring[previous];
    if (isPointOnSegment(point, previousPoint, currentPoint)) return true;
    const intersects =
      currentPoint[1] > point[1] !== previousPoint[1] > point[1] &&
      point[0] <
        ((previousPoint[0] - currentPoint[0]) *
          (point[1] - currentPoint[1])) /
          (previousPoint[1] - currentPoint[1]) +
          currentPoint[0];
    if (intersects) inside = !inside;
  }
  return inside;
}

function pointInPolygon(point, rings) {
  return pointInRing(point, rings[0]) &&
    rings.slice(1).every((hole) => !pointInRing(point, hole));
}

function pointInGeometry(point, geometry) {
  if (geometry.type === "Polygon") {
    return pointInPolygon(point, geometry.coordinates);
  }
  if (geometry.type === "MultiPolygon") {
    return geometry.coordinates.some((polygon) => pointInPolygon(point, polygon));
  }
  return false;
}

function normalizeCity(city, zip) {
  const trimmed = String(city).trim();
  const upper = trimmed.toUpperCase();
  if ((upper === "OKC" || upper === "OKLAHOMA") && /^731\d{2}$/.test(zip)) {
    return { city: "Oklahoma City", oklahomaCityAlias: true };
  }
  return {
    city: CITY_NAME_BY_LOWERCASE.get(trimmed.toLocaleLowerCase("en-US")) ?? trimmed,
    oklahomaCityAlias: false,
  };
}

function requiredText(record, key) {
  const value = record[key];
  if (typeof value !== "string" || value.trim() === "") {
    throw new Error(`Retailer row is missing ${key}.`);
  }
  return value.trim();
}

async function pullRetailers(settings) {
  const url = new URL(`${settings.url.replace(/\/$/, "")}/rest/v1/retailers`);
  url.searchParams.set(
    "select",
    "name,address,city,state,zip,latitude,longitude,public_locator_status",
  );
  url.searchParams.set("state", "eq.OK");
  url.searchParams.set("public_locator_status", "eq.approved_public_locator");
  url.searchParams.set("order", "id.asc");

  const response = await fetch(url, {
    headers: {
      apikey: settings.key,
      Authorization: `Bearer ${settings.key}`,
      Prefer: "count=exact",
      Range: "0-999",
    },
  });
  if (!response.ok) {
    throw new Error(`Supabase retailer request returned ${response.status}.`);
  }

  const records = await response.json();
  if (!Array.isArray(records)) {
    throw new Error("Supabase retailer request did not return an array.");
  }
  return { records, contentRange: response.headers.get("content-range") ?? "unknown" };
}

async function pullCounties() {
  const url = new URL(COUNTY_SERVICE);
  url.searchParams.set("where", "STATE='40'");
  url.searchParams.set("outFields", "NAME");
  url.searchParams.set("returnGeometry", "true");
  url.searchParams.set("outSR", "4326");
  url.searchParams.set("f", "geojson");

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`TIGERweb county request returned ${response.status}.`);
  }
  const collection = await response.json();
  if (!Array.isArray(collection.features) || collection.features.length !== 77) {
    throw new Error(
      `Expected 77 Oklahoma county geometries, received ${collection.features?.length ?? 0}.`,
    );
  }
  return collection.features;
}

async function main() {
  const environment = parseEnvironment(await readFile(SOURCE_ENV, "utf8"));
  const url = environment.SUPABASE_URL;
  const key = environment.SUPABASE_SECRET_KEY;
  if (!url || !key) {
    throw new Error("SUPABASE_URL or SUPABASE_SECRET_KEY is missing from the source environment.");
  }

  const [{ records, contentRange }, countyFeatures] = await Promise.all([
    pullRetailers({ url, key }),
    pullCounties(),
  ]);
  const countyToRegion = new Map(
    Object.entries(REGIONS).flatMap(([region, counties]) =>
      counties.map((county) => [county, region]),
    ),
  );
  if (countyToRegion.size !== 77) {
    throw new Error(`Tourism partition contains ${countyToRegion.size} unique counties, not 77.`);
  }

  let normalizedCityRows = 0;
  let oklahomaCityAliasRows = 0;
  const unresolved = [];
  const retailers = records.map((record) => {
    const state = requiredText(record, "state");
    const zip = requiredText(record, "zip");
    const sourceCity = requiredText(record, "city");
    const normalizedCity = normalizeCity(sourceCity, zip);
    const city = normalizedCity.city;
    if (city !== sourceCity) normalizedCityRows += 1;
    if (normalizedCity.oklahomaCityAlias) oklahomaCityAliasRows += 1;

    const latitude = Number(record.latitude);
    const longitude = Number(record.longitude);
    if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) {
      throw new Error(`Retailer ${requiredText(record, "name")} has invalid coordinates.`);
    }
    const matches = countyFeatures.filter((feature) =>
      pointInGeometry([longitude, latitude], feature.geometry),
    );
    if (matches.length !== 1) {
      unresolved.push({
        name: requiredText(record, "name"),
        address: requiredText(record, "address"),
        city,
        zip,
        latitude,
        longitude,
        matchCount: matches.length,
      });
      return null;
    }

    const county = requiredText(matches[0].properties, "NAME").replace(/ County$/, "");
    const region = countyToRegion.get(county);
    if (!region) {
      throw new Error(`County ${county} is absent from the tourism partition.`);
    }

    return {
      name: requiredText(record, "name"),
      address: requiredText(record, "address"),
      city,
      state,
      zip,
      latitude,
      longitude,
      county,
      region,
    };
  });

  const resolvedRetailers = retailers
    .filter(Boolean)
    .sort(
      (left, right) =>
        left.region.localeCompare(right.region) ||
        left.city.localeCompare(right.city) ||
        left.name.localeCompare(right.name) ||
        left.address.localeCompare(right.address),
    );
  const payload = {
    generatedAt: new Date().toISOString(),
    source: "Supabase public.retailers service-role read",
    contentRange,
    retailerCount: resolvedRetailers.length + unresolved.length,
    normalizedCityRows,
    oklahomaCityAliasRows,
    unresolvedRetailers: unresolved,
    retailers: resolvedRetailers,
  };

  await writeFile(OUTPUT_FILE, `${JSON.stringify(payload, null, 2)}\n`, "utf8");

  const regionCounts = Object.fromEntries(
    Object.keys(REGIONS).map((region) => [
      region,
      resolvedRetailers.filter((retailer) => retailer.region === region).length,
    ]),
  );
  console.log(
    JSON.stringify(
      {
        output: OUTPUT_FILE,
        contentRange,
        retailerCount: resolvedRetailers.length + unresolved.length,
        normalizedCityRows,
        oklahomaCityAliasRows,
        unresolvedRetailers: unresolved.length,
        regionCounts,
      },
      null,
      2,
    ),
  );
}

await main();
