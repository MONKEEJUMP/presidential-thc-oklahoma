import { copyFile, mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";

const projectRoot = path.resolve(import.meta.dirname, "..");
const stateName = "Oklahoma";
const stateSlug = "oklahoma";
const sourceRoot = `J:\\presidential-state-images\\${stateSlug}`;
const sourceMapPath = "J:\\presidential-state-images\\_manifest\\source-map.csv";
const publicImageRoot = path.join(projectRoot, "public", "images");
const productCatalogPath = path.join(projectRoot, "src", "content", "products.json");
const pagePlanPath = path.join(projectRoot, "src", "content", "assets.json");
const officialProductRoot = "https://presidentialmoonrocks.com/moon-rocks";

const pageSpecs = {
  "/": { heading: "The Oklahoma Presidential Product Collection", kind: "broad", count: 24, offset: 0 },
  "/moon-rocks": { heading: "The Complete Oklahoma Moon Rock Collection", kind: "format", value: "moon-rock" },
  "/blunts": { heading: "The Complete Oklahoma Blunt Collection", kind: "format", value: "blunt" },
  "/pre-rolls": { heading: "The Complete Oklahoma Pre-Roll Collection", kind: "format", value: "pre-roll" },
  "/minis": { heading: "The Complete Oklahoma Mini Collection", kind: "format", value: "mini" },
  "/silver": { heading: "The Presidential Silver Collection for Oklahoma", kind: "series", value: "silver" },
  "/gold": { heading: "The Presidential Gold Collection for Oklahoma", kind: "series", value: "gold" },
  "/rose-gold": { heading: "The Presidential Rose Gold Collection for Oklahoma", kind: "series", value: "rose-gold" },
  "/find": { heading: "Featured Presidential Products Near Oklahoma", kind: "broad", count: 12, offset: 6 },
  "/retailers": { heading: "Presidential Products for Oklahoma Retailers", kind: "broad", count: 12, offset: 9 },
  "/oklahoma": { heading: "Presidential Products Across the Oklahoma Market", kind: "broad", count: 12, offset: 12 },
  "/about": { heading: "More Presidential Products for Oklahoma", kind: "broad", count: 8, offset: 15 },
};

const pageOrder = Object.keys(pageSpecs);
const formatOrder = ["moon-rock", "blunt", "pre-roll", "mini"];

function parseCsv(input) {
  const rows = [];
  let row = [];
  let field = "";
  let quoted = false;

  for (let index = 0; index < input.length; index += 1) {
    const character = input[index];
    if (character === '"') {
      if (quoted && input[index + 1] === '"') {
        field += '"';
        index += 1;
      } else {
        quoted = !quoted;
      }
    } else if (character === "," && !quoted) {
      row.push(field);
      field = "";
    } else if ((character === "\n" || character === "\r") && !quoted) {
      if (character === "\r" && input[index + 1] === "\n") index += 1;
      row.push(field);
      if (row.some((value) => value.length > 0)) rows.push(row);
      row = [];
      field = "";
    } else {
      field += character;
    }
  }

  if (field.length || row.length) {
    row.push(field);
    rows.push(row);
  }

  const [headers, ...records] = rows;
  return records.map((record) => Object.fromEntries(headers.map((header, index) => [header, record[index] ?? ""])));
}

function decodeHtml(value) {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&#x27;|&#39;|&apos;/g, "’")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

function formatFromFilename(filename) {
  const normalized = filename.toLowerCase();
  if (normalized.includes("mini")) return "mini";
  if (normalized.includes("blunt")) return "blunt";
  if (normalized.includes("preroll") || normalized.includes("pre-roll")) return "pre-roll";
  return "moon-rock";
}

function productNameFromTitle(title, slug) {
  const cleanTitle = decodeHtml(title).replace(/\s+/g, " ").trim();
  if (cleanTitle) return cleanTitle.split(" | ")[0].replace(/ Moon Rocks$/i, "").trim();
  return slug.split("-").map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join(" ");
}

function seriesFromMetadata(title, description) {
  const titleMatch = decodeHtml(title).match(/\|\s*Presidential (Rose Gold|Silver|Gold)\s*$/i);
  const descriptionMatch = decodeHtml(description).match(/Presidential (Rose Gold|Silver|Gold) (?:Flavor|Strain|Connoisseur) Series/i);
  const value = titleMatch?.[1] ?? descriptionMatch?.[1];
  return value ? value.toLowerCase().replace(/\s+/g, "-") : null;
}

async function fetchLiveProduct(slug) {
  const productHref = `${officialProductRoot}/${slug}`;
  const response = await fetch(productHref, { redirect: "follow" });
  if (!response.ok) throw new Error(`${productHref} returned HTTP ${response.status}`);
  const html = await response.text();
  const title = html.match(/<title>(.*?)<\/title>/i)?.[1] ?? "";
  const description = html.match(/<meta name="description" content="([^"]*)"/i)?.[1] ?? "";
  return {
    productHref,
    liveStatus: response.status,
    liveTitle: decodeHtml(title),
    name: productNameFromTitle(title, slug),
    series: seriesFromMetadata(title, description),
  };
}

function stableHash(value) {
  let hash = 2166136261;
  for (const character of value) {
    hash ^= character.charCodeAt(0);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function broadSelection(products, count, offset) {
  const perFormat = Math.floor(count / formatOrder.length);
  const remainder = count % formatOrder.length;
  const selected = [];

  formatOrder.forEach((format, formatIndex) => {
    const take = perFormat + (formatIndex < remainder ? 1 : 0);
    const pool = products
      .filter((product) => product.format === format)
      .sort((left, right) => stableHash(left.squareFilename) - stableHash(right.squareFilename));
    selected.push(...pool.slice(offset, offset + take));
  });

  return selected.sort((left, right) => {
    const leftRound = selected.filter((product) => product.format === left.format).indexOf(left);
    const rightRound = selected.filter((product) => product.format === right.format).indexOf(right);
    return leftRound - rightRound || formatOrder.indexOf(left.format) - formatOrder.indexOf(right.format);
  });
}

function productsForPage(products, pagePath) {
  const spec = pageSpecs[pagePath];
  if (!spec) throw new Error(`Unknown page path: ${pagePath}`);
  if (spec.kind === "format") return products.filter((product) => product.format === spec.value);
  if (spec.kind === "series") return products.filter((product) => product.series === spec.value);
  return broadSelection(products, spec.count, spec.offset);
}

async function prepareCatalog() {
  const sourceRows = parseCsv(await readFile(sourceMapPath, "utf8"));
  const sourceFiles = new Set(await readdir(sourceRoot));
  const uniqueSlugs = [...new Set(sourceRows.map((row) => row["sitemap-product-slug"]))];
  const liveEntries = await Promise.all(uniqueSlugs.map(async (slug) => [slug, await fetchLiveProduct(slug)]));
  const liveBySlug = new Map(liveEntries);
  const variants = new Map();
  const products = sourceRows.map((row) => {
    const stem = row["output-stem"];
    const slug = row["sitemap-product-slug"];
    const squareFilename = `${stem}-${stateSlug}.webp`;
    const portraitFilename = `${stem}-${stateSlug}-portrait.webp`;
    const format = formatFromFilename(squareFilename);
    const variantKey = `${slug}:${format}`;
    const variant = (variants.get(variantKey) ?? 0) + 1;
    variants.set(variantKey, variant);

    if (!sourceFiles.has(squareFilename) || !sourceFiles.has(portraitFilename)) {
      throw new Error(`Missing approved composite pair for ${stem}`);
    }

    const live = liveBySlug.get(slug);
    return {
      id: row["asset-id"],
      name: live.name,
      slug,
      format,
      series: live.series,
      variant,
      squareFilename,
      portraitFilename,
      productHref: live.productHref,
      liveStatus: live.liveStatus,
      liveTitle: live.liveTitle,
    };
  });

  if (products.length !== 213 || sourceFiles.size !== 426) {
    throw new Error(`Expected 213 products and 426 source files; found ${products.length} and ${sourceFiles.size}`);
  }

  await mkdir(publicImageRoot, { recursive: true });
  await Promise.all(products.flatMap((product) => [product.squareFilename, product.portraitFilename].map((filename) => (
    copyFile(path.join(sourceRoot, filename), path.join(publicImageRoot, filename))
  ))));
  await writeFile(productCatalogPath, `${JSON.stringify(products, null, 2)}\n`, "utf8");
  console.log(`Prepared ${products.length} Oklahoma products and copied ${products.length * 2} approved composites.`);
}

async function addPage(pagePath) {
  const products = JSON.parse(await readFile(productCatalogPath, "utf8"));
  const plans = JSON.parse(await readFile(pagePlanPath, "utf8"));
  const spec = pageSpecs[pagePath];
  if (!spec) throw new Error(`Unknown page path: ${pagePath}`);
  const productIds = productsForPage(products, pagePath).map((product) => product.id);
  const nextPlan = { page: pagePath, heading: spec.heading, productIds };
  const updated = [...plans.filter((plan) => plan.page !== pagePath), nextPlan]
    .sort((left, right) => pageOrder.indexOf(left.page) - pageOrder.indexOf(right.page));
  await writeFile(pagePlanPath, `${JSON.stringify(updated, null, 2)}\n`, "utf8");
  console.log(`Mapped ${productIds.length} products to ${pagePath}.`);
}

const [command, pagePath] = process.argv.slice(2);
if (command === "catalog") {
  await prepareCatalog();
} else if (command === "page" && pagePath) {
  await addPage(pagePath);
} else {
  throw new Error("Usage: node scripts/prepare-state-catalog.mjs catalog | page <path>");
}
