import { readFile, readdir } from "node:fs/promises";
import path from "node:path";

import sharp from "sharp";

const root = path.resolve(import.meta.dirname, "..");
const products = JSON.parse(await readFile(path.join(root, "src", "content", "products.json"), "utf8"));
const plans = JSON.parse(await readFile(path.join(root, "src", "content", "assets.json"), "utf8"));
const publicImageRoot = path.join(root, "public", "images");

const sectionCapacity = {
  "/": 10,
  "/moon-rocks": 8,
  "/blunts": 8,
  "/pre-rolls": 8,
  "/minis": 8,
  "/silver": 8,
  "/gold": 8,
  "/rose-gold": 8,
  "/find": 5,
  "/retailers": 5,
  "/oklahoma": 5,
  "/about": 3,
};

const formatLabels = {
  "moon-rock": "Moon Rock",
  blunt: "blunt",
  "pre-roll": "pre-roll",
  mini: "mini",
};

const pageAltLabels = {
  "/": "the Oklahoma home collection",
  "/moon-rocks": "the Oklahoma Moon Rocks page",
  "/blunts": "the Oklahoma blunts page",
  "/pre-rolls": "the Oklahoma pre-rolls page",
  "/minis": "the Oklahoma minis page",
  "/silver": "the Oklahoma Silver page",
  "/gold": "the Oklahoma Gold page",
  "/rose-gold": "the Oklahoma Rose Gold page",
  "/find": "the Oklahoma Find Us page",
  "/retailers": "the Oklahoma retailers page",
  "/oklahoma": "the Oklahoma market page",
  "/about": "the Oklahoma brand story",
};

const productById = new Map(products.map((product) => [product.id, product]));
const alts = [];
const pageRows = plans.map((plan) => {
  const pageProducts = plan.productIds.map((id) => productById.get(id));
  const pageAlts = pageProducts.map((product) => {
    const variant = product.variant > 1 ? ` variant ${product.variant}` : "";
    return `${product.name} Presidential ${formatLabels[product.format]}${variant} for ${pageAltLabels[plan.page]}`;
  });
  alts.push(...pageAlts);
  const sectionImages = Math.min(pageProducts.length, sectionCapacity[plan.page]);
  return {
    page: plan.page,
    heading: plan.heading,
    total: pageProducts.length,
    sectionImages,
    gridImages: pageProducts.length - sectionImages,
    duplicateProducts: pageProducts.length - new Set(plan.productIds).size,
    duplicateProductLinks: pageProducts.length - new Set(pageProducts.map((product) => product.productHref)).size,
  };
});

const formatPageIds = new Set(plans
  .filter((plan) => ["/moon-rocks", "/blunts", "/pre-rolls", "/minis"].includes(plan.page))
  .flatMap((plan) => plan.productIds));
const filenames = products.flatMap((product) => [product.squareFilename, product.portraitFilename]);
const publicFiles = new Set(await readdir(publicImageRoot));
const missingFiles = filenames.filter((filename) => !publicFiles.has(filename));
const dimensions = await Promise.all(filenames.map(async (filename) => {
  const metadata = await sharp(path.join(publicImageRoot, filename)).metadata();
  return `${metadata.width}x${metadata.height}`;
}));
const dimensionCounts = Object.fromEntries([...new Set(dimensions)].sort().map((dimension) => [
  dimension,
  dimensions.filter((candidate) => candidate === dimension).length,
]));

const altWordCounts = alts.map((alt) => alt.trim().split(/\s+/).length);
const byFormat = Object.fromEntries(["moon-rock", "blunt", "pre-roll", "mini"].map((format) => [
  format,
  products.filter((product) => product.format === format).length,
]));
const bySeries = Object.fromEntries(["silver", "gold", "rose-gold", "unresolved"].map((series) => [
  series,
  products.filter((product) => series === "unresolved" ? product.series === null : product.series === series).length,
]));

console.log(JSON.stringify({
  products: products.length,
  sourcePairs: products.length,
  copiedFiles: filenames.length,
  missingFiles,
  dimensions: dimensionCounts,
  byFormat,
  bySeries,
  pages: pageRows,
  placements: plans.reduce((sum, plan) => sum + plan.productIds.length, 0),
  linkedPlacements: plans.reduce((sum, plan) => sum + plan.productIds.length, 0),
  uniqueProductLinks: new Set(products.map((product) => product.productHref)).size,
  allProductsOnFormatPages: formatPageIds.size === products.length,
  formatPageProductCount: formatPageIds.size,
  duplicateHeadings: plans.length - new Set(plans.map((plan) => plan.heading)).size,
  duplicateAlts: alts.length - new Set(alts).size,
  altWordRange: [Math.min(...altWordCounts), Math.max(...altWordCounts)],
  liveProductStatuses: Object.fromEntries([...new Set(products.map((product) => product.liveStatus))].sort().map((status) => [
    status,
    products.filter((product) => product.liveStatus === status).length,
  ])),
  imageSitemapProducts: products.length,
}, null, 2));
