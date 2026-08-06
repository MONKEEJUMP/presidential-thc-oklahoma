import { copyFile, mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import sharp from "sharp";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const manifestPath = path.join(projectRoot, "src", "content", "assets.json");
const productSourceRoot = "J:\\presidential-official\\sources\\client\\google-drive-drop\\_EXTRACTED\\Product Graphics-20260703T032133Z-3-001\\Product Graphics";
const heroSource = "J:\\presidential-official\\web\\public\\media\\states\\ok-hero.webp";
const crestSource = "J:\\presidential-official\\sources\\vercel-draft\\assets\\img\\crest.png";
const clashSourceRoot = "J:\\presidential-thc-net\\public\\fonts";
const productOutputRoot = path.join(projectRoot, "public", "images", "products");
const publicImageRoot = path.join(projectRoot, "public", "images");
const fontOutputRoot = path.join(projectRoot, "public", "fonts");
const appRoot = path.join(projectRoot, "src", "app");

const manifest = JSON.parse(await readFile(manifestPath, "utf8"));

const roseGoldNames = {
  "cereal-milk": "Cereal Milk",
  "cosmic-cookies": "Cosmic Cookies",
  "gods-gift": "God’s Gift",
  "wedding-cake": "Wedding Cake",
  "white-walker": "White Walker",
};

function escapeXml(value) {
  return value.replace(/[<>&'\"]/g, (character) => ({
    "<": "&lt;",
    ">": "&gt;",
    "&": "&amp;",
    "'": "&apos;",
    '\"': "&quot;",
  })[character]);
}

function roseGoldPlaceholder(asset) {
  const [, , slug, variant] = asset.source.split(":");
  const name = roseGoldNames[slug];

  if (!name) {
    throw new Error(`Unknown Rose Gold placeholder product: ${slug}`);
  }

  const safeName = escapeXml(name.toUpperCase());
  const isSquare = variant === "square";
  const ornamentY = isSquare ? 500 : 575;
  const titleY = isSquare ? 770 : 905;

  return Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${asset.width}" height="${asset.height}" viewBox="0 0 ${asset.width} ${asset.height}">
    <defs>
      <radialGradient id="bg" cx="50%" cy="42%" r="72%">
        <stop offset="0" stop-color="#253633"/>
        <stop offset="0.56" stop-color="#0e1716"/>
        <stop offset="1" stop-color="#050706"/>
      </radialGradient>
      <linearGradient id="rose" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#f6dfca"/>
        <stop offset="0.45" stop-color="#c88f7a"/>
        <stop offset="1" stop-color="#f1c89e"/>
      </linearGradient>
      <filter id="glow"><feGaussianBlur stdDeviation="18"/></filter>
    </defs>
    <rect width="100%" height="100%" fill="url(#bg)"/>
    <rect x="42" y="42" width="${asset.width - 84}" height="${asset.height - 84}" rx="20" fill="none" stroke="#c99a68" stroke-width="2"/>
    <rect x="58" y="58" width="${asset.width - 116}" height="${asset.height - 116}" rx="14" fill="none" stroke="#31594f" stroke-width="1"/>
    <circle cx="${asset.width / 2}" cy="${ornamentY}" r="270" fill="#c88f7a" opacity="0.08" filter="url(#glow)"/>
    <circle cx="${asset.width / 2}" cy="${ornamentY}" r="218" fill="none" stroke="url(#rose)" stroke-width="4"/>
    <circle cx="${asset.width / 2}" cy="${ornamentY}" r="184" fill="none" stroke="#31594f" stroke-width="2"/>
    <path d="M${asset.width / 2 - 150} ${ornamentY} C${asset.width / 2 - 70} ${ornamentY - 115}, ${asset.width / 2 + 70} ${ornamentY - 115}, ${asset.width / 2 + 150} ${ornamentY} C${asset.width / 2 + 70} ${ornamentY + 115}, ${asset.width / 2 - 70} ${ornamentY + 115}, ${asset.width / 2 - 150} ${ornamentY}Z" fill="none" stroke="url(#rose)" stroke-width="8"/>
    <circle cx="${asset.width / 2}" cy="${ornamentY}" r="34" fill="#c99a68"/>
    <text x="${asset.width / 2}" y="145" text-anchor="middle" fill="#f1c89e" font-family="Arial, sans-serif" font-size="24" letter-spacing="8">PRESIDENTIAL</text>
    <text x="${asset.width / 2}" y="190" text-anchor="middle" fill="#f2eee6" font-family="Georgia, serif" font-size="23" letter-spacing="5">ROSE GOLD SERIES</text>
    <text x="${asset.width / 2}" y="${titleY}" text-anchor="middle" fill="#f2eee6" font-family="Georgia, serif" font-size="58" letter-spacing="2">${safeName}</text>
    <line x1="${asset.width / 2 - 185}" y1="${titleY + 42}" x2="${asset.width / 2 + 185}" y2="${titleY + 42}" stroke="#c99a68" stroke-width="2"/>
    <text x="${asset.width / 2}" y="${titleY + 95}" text-anchor="middle" fill="#c9d4ce" font-family="Arial, sans-serif" font-size="18" letter-spacing="3">OFFICIAL PHOTOGRAPHY IN PRODUCTION</text>
    <text x="${asset.width / 2}" y="${asset.height - 105}" text-anchor="middle" fill="#78968d" font-family="Arial, sans-serif" font-size="16" letter-spacing="4">PRESIDENTIALMOONROCKS.COM</text>
  </svg>`);
}

await Promise.all([
  mkdir(productOutputRoot, { recursive: true }),
  mkdir(fontOutputRoot, { recursive: true }),
  mkdir(appRoot, { recursive: true }),
]);

for (const asset of manifest) {
  const output = path.join(productOutputRoot, asset.filename);
  const generated = asset.source.startsWith("GENERATED:rose-gold:");
  const source = generated
    ? roseGoldPlaceholder(asset)
    : path.join(productSourceRoot, asset.source);

  const pipeline = sharp(source);

  if (!generated) {
    pipeline.rotate().resize({
      width: asset.width,
      height: asset.height,
      fit: "contain",
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    });
  }

  await pipeline.webp({ quality: 84, alphaQuality: 90, effort: 5 }).toFile(output);
}

await copyFile(heroSource, path.join(publicImageRoot, "ok-hero.webp"));

await sharp(crestSource)
  .resize({ width: 512, height: 512, fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .webp({ quality: 92, alphaQuality: 95 })
  .toFile(path.join(publicImageRoot, "presidential-crest.webp"));

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

console.log(`Prepared ${manifest.length} unique product images, hero, crest, fonts, and four favicon files.`);
