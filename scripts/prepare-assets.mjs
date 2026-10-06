import { copyFile, mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import sharp from "sharp";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const manifestPath = path.join(projectRoot, "src", "content", "products.json");
const productSourceRoot = "J:\\presidential-state-images\\oklahoma";
const heroSource = "J:\\presidential-official\\web\\public\\media\\states\\ok-hero.webp";
const crestSource = "J:\\presidential-official\\sources\\vercel-draft\\assets\\img\\crest.png";
const bannerSource = "J:\\presidential-official\\web\\public\\media\\brand\\presidential-banner.png";
const clashSourceRoot = "J:\\presidential-thc-net\\public\\fonts";
const publicImageRoot = path.join(projectRoot, "public", "images");
const fontOutputRoot = path.join(projectRoot, "public", "fonts");
const appRoot = path.join(projectRoot, "src", "app");

const products = JSON.parse(await readFile(manifestPath, "utf8"));

await Promise.all([
  mkdir(publicImageRoot, { recursive: true }),
  mkdir(fontOutputRoot, { recursive: true }),
  mkdir(appRoot, { recursive: true }),
]);

for (const product of products) {
  for (const filename of [product.squareFilename, product.portraitFilename]) {
    await copyFile(path.join(productSourceRoot, filename), path.join(publicImageRoot, filename));
  }
}

await sharp(heroSource)
  .resize({ width: 1920, withoutEnlargement: true })
  .webp({ quality: 80, effort: 5 })
  .toFile(path.join(publicImageRoot, "ok-hero.webp"));

await sharp(crestSource)
  .resize({ width: 512, height: 512, fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .webp({ quality: 92, alphaQuality: 95 })
  .toFile(path.join(publicImageRoot, "presidential-crest.webp"));

await sharp(bannerSource)
  .webp({ quality: 90, alphaQuality: 95 })
  .toFile(path.join(publicImageRoot, "presidential-banner.webp"));

for (const weight of [400, 500, 600, 700]) {
  await copyFile(
    path.join(clashSourceRoot, `clash-display-${weight}.woff2`),
    path.join(fontOutputRoot, `clash-display-${weight}.woff2`),
  );
}

const faviconCrest = await sharp(crestSource)
  .resize({ width: 230, height: 230, fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .png()
  .toBuffer();

const faviconSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="256" height="256" viewBox="0 0 256 256">
  <rect width="256" height="256" rx="24" fill="#070908"/>
  <image href="data:image/png;base64,${faviconCrest.toString("base64")}" x="13" y="13" width="230" height="230" preserveAspectRatio="xMidYMid meet"/>
</svg>\n`;

await writeFile(path.join(appRoot, "icon.svg"), faviconSvg, "utf8");

const icon32 = await sharp(Buffer.from(faviconSvg))
  .resize(32, 32)
  .png({ compressionLevel: 9 })
  .toBuffer();
await writeFile(path.join(appRoot, "icon.png"), icon32);

const appleIcon = await sharp(Buffer.from(faviconSvg))
  .resize(180, 180)
  .png({ compressionLevel: 9 })
  .toBuffer();
await writeFile(path.join(appRoot, "apple-icon.png"), appleIcon);

const icoHeader = Buffer.alloc(22);
icoHeader.writeUInt16LE(0, 0);
icoHeader.writeUInt16LE(1, 2);
icoHeader.writeUInt16LE(1, 4);
icoHeader.writeUInt8(32, 6);
icoHeader.writeUInt8(32, 7);
icoHeader.writeUInt8(0, 8);
icoHeader.writeUInt8(0, 9);
icoHeader.writeUInt16LE(1, 10);
icoHeader.writeUInt16LE(32, 12);
icoHeader.writeUInt32LE(icon32.length, 14);
icoHeader.writeUInt32LE(22, 18);
await writeFile(path.join(appRoot, "favicon.ico"), Buffer.concat([icoHeader, icon32]));

console.log(`Prepared ${products.length * 2} approved product composites, hero, crest, fonts, and four favicon files.`);
