// Same-site schema entities from the InLinks FIX-10 export (2026-10-06), trimmed to
// accurate disambiguations. Merged into each page's existing WebPage node.
type SchemaThing = { "@type": string; name: string; sameAs: string };

const WIKI = "https://en.wikipedia.org/wiki/";
const thing = (name: string, slug: string, type = "Thing"): SchemaThing => ({ "@type": type, name, sameAs: `${WIKI}${slug}` });
const OKLAHOMA = thing("Oklahoma", "Oklahoma", "State");
const PRODUCT = thing("Product", "Product_(business)");

export const pageSchemaEntities: Record<string, { about: SchemaThing[]; mentions: SchemaThing[] }> = {
  "/": {
    about: [PRODUCT, OKLAHOMA],
    mentions: [thing("Dispensary", "Dispensary")],
  },
  "/about": {
    about: [thing("Brand", "Brand"), OKLAHOMA],
    mentions: [PRODUCT],
  },
  "/dispensaries": {
    about: [thing("Dispensaries", "Dispensary"), OKLAHOMA],
    mentions: [],
  },
  "/oklahoma": {
    about: [thing("Cannabis", "Cannabis_(drug)"), thing("Market", "Market_(economics)"), OKLAHOMA],
    mentions: [
      thing("Patient", "Patient"),
      thing("Product catalog", "Product_(business)"),
      thing("License", "License"),
      thing("Regulated market", "Regulation"),
    ],
  },
  "/moon-rocks": {
    about: [thing("Flower", "Flower"), PRODUCT, OKLAHOMA],
    mentions: [thing("License", "License")],
  },
  "/blunts": {
    about: [thing("Blunt", "Blunt_(cannabis)"), PRODUCT, OKLAHOMA],
    mentions: [thing("Packaging", "Packaging")],
  },
  "/retailers": {
    about: [thing("Retail", "Retail"), OKLAHOMA],
    mentions: [
      thing("Patient", "Patient"),
      thing("Goods", "Product_(business)"),
      thing("Brand", "Brand"),
      thing("Catalog", "Trade_literature"),
      thing("Buyer", "Purchasing"),
    ],
  },
};

export function schemaEntitiesFor(path: string) {
  const entry = pageSchemaEntities[path];
  if (!entry) return {};
  return {
    about: entry.about,
    ...(entry.mentions.length ? { mentions: entry.mentions } : {}),
  };
}
