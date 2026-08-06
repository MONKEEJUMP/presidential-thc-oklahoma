import { readFile } from "node:fs/promises";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const assets = JSON.parse(await readFile(path.join(root, "src", "content", "assets.json"), "utf8"));
const { pages } = await import("../src/content/pages.ts");

const wordsIn = (value) => {
  if (typeof value === "string") return value.trim().split(/\s+/).filter(Boolean).length;
  if (Array.isArray(value)) return value.reduce((sum, item) => sum + wordsIn(item.text ?? item), 0);
  return 0;
};

const rows = pages.map((page) => {
  const words = page.intro.reduce((sum, paragraph) => sum + wordsIn(paragraph), 0)
    + page.sections.reduce((sum, section) => sum
      + wordsIn(section.heading)
      + section.paragraphs.reduce((sectionSum, paragraph) => sectionSum + wordsIn(paragraph), 0)
      + (section.bullets ?? []).reduce((bulletSum, bullet) => bulletSum + wordsIn(bullet), 0), 0);
  const pageAssets = assets.filter((asset) => asset.page === page.path);
  const contextual = [...page.intro, ...page.sections.flatMap((section) => section.paragraphs)]
    .filter(Array.isArray)
    .flat()
    .filter((part) => part.href?.startsWith("https://presidentialmoonrocks.com"))
    .map((part) => ({ anchor: part.text, href: part.href }));
  return {
    path: page.path,
    words,
    images: pageAssets.length,
    linkedImages: pageAssets.filter((asset) => asset.productHref).length,
    contextual,
  };
});

const duplicatedSources = [...new Set(assets.map((asset) => asset.source).filter((source, index, all) => all.indexOf(source) !== index))];
const duplicatedFilenames = [...new Set(assets.map((asset) => asset.filename).filter((filename, index, all) => all.indexOf(filename) !== index))];
const duplicatedAlts = [...new Set(assets.map((asset) => asset.alt).filter((alt, index, all) => all.indexOf(alt) !== index))];

console.log(JSON.stringify({
  pages: rows,
  totalImages: assets.length,
  linkedImages: assets.filter((asset) => asset.productHref).length,
  unlinkedImages: assets.filter((asset) => !asset.productHref),
  duplicatedSources,
  duplicatedFilenames,
  duplicatedAlts,
}, null, 2));
