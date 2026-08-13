import pageManifest from "./assets.json";
import productManifest from "./products.json";

import type { CatalogProduct, ContentImage, PageImagePlan } from "./types";

const products = productManifest as CatalogProduct[];
const plans = pageManifest as PageImagePlan[];
const productsById = new Map(products.map((product) => [product.id, product]));

const formatLabels: Record<CatalogProduct["format"], string> = {
  "moon-rock": "Moon Rock",
  blunt: "blunt",
  "pre-roll": "pre-roll",
  mini: "mini",
};

const pageAltLabels: Record<string, string> = {
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

function placementAlt(product: CatalogProduct, page: string): string {
  const variant = product.variant > 1 ? ` variant ${product.variant}` : "";
  if (product.series === "rose-gold") {
    return `${product.name} Presidential Rose Gold Moon Rock Blunt for ${pageAltLabels[page]}`;
  }
  return `${product.name} Presidential ${formatLabels[product.format]}${variant} for ${pageAltLabels[page]}`;
}

function imageForPlacement(product: CatalogProduct, page: string): ContentImage {
  return {
    productId: product.id,
    page,
    filename: product.squareFilename,
    portraitFilename: product.portraitFilename,
    src: `/images/${product.squareFilename}`,
    portraitSrc: `/images/${product.portraitFilename}`,
    width: 1200,
    height: 1200,
    portraitWidth: 1080,
    portraitHeight: 1350,
    alt: placementAlt(product, page),
    productHref: product.productHref,
  };
}

export const catalogProducts = products;

export const pageCatalogHeadings = Object.fromEntries(
  plans.map((plan) => [plan.page, plan.heading]),
) as Record<string, string>;

export const allProductImages: ContentImage[] = plans.flatMap((plan) => plan.productIds.map((productId) => {
  const product = productsById.get(productId);
  if (!product) throw new Error(`Unknown product id ${productId} on ${plan.page}`);
  return imageForPlacement(product, plan.page);
}));

export const pageImages = allProductImages.reduce<Record<string, ContentImage[]>>(
  (pages, image) => {
    pages[image.page] ??= [];
    pages[image.page].push(image);
    return pages;
  },
  {},
);
