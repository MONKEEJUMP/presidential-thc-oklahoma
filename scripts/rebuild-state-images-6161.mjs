#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import sharp from "sharp";

const RECIPE_STAMP = "6179-template-whole-source-v1";
const CROP_COUNT = 8;
const CROP_ANCHORS = [0, 1 / 7, 2 / 7, 3 / 7, 4 / 7, 5 / 7, 6 / 7, 1];
const TARGET_BYTES = 200 * 1024;
const START_QUALITY = 82;
const MIN_QUALITY = 76;

const ROSE_GOLD_PRODUCTS = [
  { assetId: "214", name: "Wedding Cake", slug: "wedding-cake" },
  { assetId: "215", name: "God's Gift", slug: "gods-gift" },
  { assetId: "216", name: "White Walker", slug: "white-walker" },
  { assetId: "217", name: "Cereal Milk", slug: "cereal-milk" },
  { assetId: "218", name: "Cosmic Cookies", slug: "cosmic-cookies" },
];

const FORMAT_SPECS = {
  square: {
    width: 1200,
    height: 1200,
    canvasCornerRadius: 30,
    frameInset: 60,
    frameCornerRadius: 24,
    ruleWeight: 4,
  },
  portrait: {
    width: 1080,
    height: 1350,
    canvasCornerRadius: 27,
    frameInset: 54,
    frameCornerRadius: 21.6,
    ruleWeight: 3.6,
  },
};

const DEFAULTS = {
  phase: "templates",
  state: "oklahoma",
  stateCode: "ok",
  hero: "J:\\presidential-official\\web\\public\\media\\states\\ok-hero.webp",
  sourceRoot: "J:\\presidential-official\\sources\\client\\google-drive-drop\\_EXTRACTED",
  libraryRoot: "J:\\presidential-state-images",
  repo: "J:\\presidential-thc-oklahoma",
};

function parseArgs(argv) {
  const values = { ...DEFAULTS };
  const aliases = new Map([
    ["--phase", "phase"],
    ["--state", "state"],
    ["--state-code", "stateCode"],
    ["--hero", "hero"],
    ["--source-root", "sourceRoot"],
    ["--library-root", "libraryRoot"],
    ["--repo", "repo"],
  ]);

  for (let index = 0; index < argv.length; index += 1) {
    const key = aliases.get(argv[index]);
    if (!key || !argv[index + 1]) throw new Error(`Unknown or incomplete argument: ${argv[index]}`);
    values[key] = argv[index + 1];
    index += 1;
  }

  values.phase = values.phase.trim().toLowerCase();
  values.state = values.state.trim().toLowerCase();
  values.stateCode = values.stateCode.trim().toLowerCase();
  if (!new Set(["templates", "composites"]).has(values.phase)) {
    throw new Error(`--phase must be templates or composites; received ${values.phase}`);
  }
  if (!/^[a-z][a-z-]*$/.test(values.state)) throw new Error(`Invalid state slug: ${values.state}`);
  if (!/^[a-z]{2}$/.test(values.stateCode)) throw new Error(`Invalid two-letter state code: ${values.stateCode}`);
  return values;
}

function naturalCompare(left, right) {
  return left.localeCompare(right, "en", { numeric: true, sensitivity: "base" });
}

function sha256(buffer) {
  return crypto.createHash("sha256").update(buffer).digest("hex");
}

function fnv1a32(value) {
  let hash = 0x811c9dc5;
  for (const byte of Buffer.from(value, "utf8")) {
    hash ^= byte;
    hash = Math.imul(hash, 0x01000193) >>> 0;
  }
  return hash >>> 0;
}

function cropIndexForSource(sourceFile) {
  const basename = path.win32.basename(sourceFile).normalize("NFKC").toLowerCase();
  return fnv1a32(basename) % CROP_COUNT;
}

function escapeXml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = "";
  let quoted = false;
  for (let index = 0; index < text.length; index += 1) {
    const character = text[index];
    if (quoted) {
      if (character === '"' && text[index + 1] === '"') {
        field += '"';
        index += 1;
      } else if (character === '"') {
        quoted = false;
      } else {
        field += character;
      }
    } else if (character === '"') {
      quoted = true;
    } else if (character === ",") {
      row.push(field);
      field = "";
    } else if (character === "\n") {
      row.push(field.replace(/\r$/, ""));
      rows.push(row);
      row = [];
      field = "";
    } else {
      field += character;
    }
  }
  if (field.length || row.length) {
    row.push(field.replace(/\r$/, ""));
    rows.push(row);
  }
  if (!rows.length) return { headers: [], records: [] };
  rows[0][0] = rows[0][0].replace(/^\uFEFF/, "");
  const headers = rows[0];
  const records = rows.slice(1).filter((cells) => cells.some(Boolean)).map((cells) =>
    Object.fromEntries(headers.map((header, index) => [header, cells[index] ?? ""])),
  );
  return { headers, records };
}

function encodeCsvCell(value) {
  const text = String(value ?? "");
  return /[",\r\n]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
}

function stringifyCsv(headers, records) {
  const lines = [headers.map(encodeCsvCell).join(",")];
  for (const record of records) {
    lines.push(headers.map((header) => encodeCsvCell(record[header])).join(","));
  }
  return `\uFEFF${lines.join("\r\n")}\r\n`;
}

async function exists(target) {
  try {
    await fs.access(target);
    return true;
  } catch {
    return false;
  }
}

async function listWebpFiles(directory) {
  return (await fs.readdir(directory, { withFileTypes: true }))
    .filter((entry) => entry.isFile() && entry.name.toLowerCase().endsWith(".webp"))
    .map((entry) => entry.name)
    .sort(naturalCompare);
}

function outputNames(record, state) {
  const stem = record["output-stem"];
  return {
    square: `${stem}-${state}.webp`,
    portrait: `${stem}-${state}-portrait.webp`,
  };
}

function templateName(stateCode, cropIndex, format) {
  return `${stateCode}-${String(cropIndex + 1).padStart(2, "0")}-${format}.png`;
}

async function assertSourceInsideRoot(sourceFile, sourceRoot) {
  const source = path.win32.resolve(sourceFile).toLowerCase();
  const root = `${path.win32.resolve(sourceRoot).replace(/[\\/]+$/, "")}\\`.toLowerCase();
  if (!source.startsWith(root)) throw new Error(`Source is outside the approved read-only root: ${sourceFile}`);
  await fs.access(sourceFile);
}

async function roseGoldRecords(libraryRoot) {
  const sourceRoot = path.join(libraryRoot, "_rose-gold-packs");
  return Promise.all(ROSE_GOLD_PRODUCTS.map(async ({ assetId, name, slug }) => {
    const sourceFile = path.join(
      sourceRoot,
      `presidential-${slug}-rose-gold-moon-rock-blunt.png`,
    );
    await assertSourceInsideRoot(sourceFile, sourceRoot);
    return {
      "asset-id": assetId,
      "source-file": sourceFile,
      "source-hash": sha256(await fs.readFile(sourceFile)),
      "output-stem": `presidential-${slug}-rose-gold`,
      "product-name": name,
      "series": "rose-gold",
    };
  }));
}

function safeAreaFor(spec) {
  const innerLeft = spec.frameInset + spec.ruleWeight / 2;
  const innerTop = spec.frameInset + spec.ruleWeight / 2;
  const innerWidth = spec.width - 2 * innerLeft;
  const deflation = innerWidth * 0.09;
  const left = Math.round(innerLeft + deflation);
  const top = Math.round(innerTop + deflation);
  const right = spec.width - left;
  const bottom = spec.height - top;
  return {
    left,
    top,
    right,
    bottom,
    width: right - left,
    height: bottom - top,
    deflationPixels: Number(deflation.toFixed(3)),
  };
}

const FILLED_ORNAMENTS = [
  [[100, 5], [104, 10], [100, 15], [96, 10]],
  [[57, 6], [61, 10], [57, 14], [53, 10]],
  [[143, 6], [147, 10], [143, 14], [139, 10]],
  [[17, 7], [20, 10], [17, 13], [14, 10]],
  [[7, 7], [10, 10], [7, 13], [4, 10]],
  [[183, 7], [186, 10], [183, 13], [180, 10]],
  [[193, 7], [196, 10], [193, 13], [190, 10]],
];

const OUTLINED_ORNAMENTS = [
  [[91, 10], [77, 7], [63, 10], [77, 13]],
  [[109, 10], [123, 7], [137, 10], [123, 13]],
  [[51, 10], [38, 7.5], [25, 10], [38, 12.5]],
  [[149, 10], [162, 7.5], [175, 10], [162, 12.5]],
];

function goldFrameSvg(spec) {
  const { width, height, frameInset, frameCornerRadius, ruleWeight } = spec;
  const frameWidth = width - 2 * frameInset;
  const frameHeight = height - 2 * frameInset;
  const clusterWidth = frameWidth * 0.3;
  const clusterHeight = clusterWidth / 10;
  const clusterLeft = width / 2 - clusterWidth / 2;
  const gapPadding = ruleWeight * 2;
  const bottom = height - frameInset;

  const scalePoly = (poly) => {
    const centerX = poly.reduce((sum, [x]) => sum + x, 0) / poly.length;
    const centerY = poly.reduce((sum, [, y]) => sum + y, 0) / poly.length;
    return poly.map(([x, y]) => [centerX + (x - centerX) * 1.25, centerY + (y - centerY) * 1.4]);
  };
  const points = (poly, lineY, flip) => scalePoly(poly).map(([x, y]) => {
    const adjustedY = flip ? 20 - y : y;
    return `${clusterLeft + (x / 200) * clusterWidth},${lineY + ((adjustedY - 10) / 20) * clusterHeight}`;
  }).join(" ");

  const ornaments = [];
  for (const [lineY, flip] of [[frameInset, false], [bottom, true]]) {
    for (const poly of FILLED_ORNAMENTS) {
      ornaments.push(`<polygon points="${points(poly, lineY, flip)}" fill="url(#gold)"/>`);
    }
    for (const poly of OUTLINED_ORNAMENTS) {
      ornaments.push(`<polygon points="${points(poly, lineY, flip)}" fill="none" stroke="url(#gold)" stroke-width="${ruleWeight * 0.75}" stroke-linejoin="round"/>`);
    }
  }

  return Buffer.from(`
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="gold" gradientUnits="userSpaceOnUse" x1="${frameInset}" y1="0" x2="${width - frameInset}" y2="0">
          <stop offset="0" stop-color="#F4E3A1"/>
          <stop offset="0.52" stop-color="#D4B96A"/>
          <stop offset="1" stop-color="#8F6B24"/>
        </linearGradient>
        <mask id="interrupted-rule" maskUnits="userSpaceOnUse" x="0" y="0" width="${width}" height="${height}">
          <rect width="${width}" height="${height}" fill="white"/>
          <rect x="${clusterLeft - gapPadding}" y="${frameInset - clusterHeight}" width="${clusterWidth + 2 * gapPadding}" height="${2 * clusterHeight}" fill="black"/>
          <rect x="${clusterLeft - gapPadding}" y="${bottom - clusterHeight}" width="${clusterWidth + 2 * gapPadding}" height="${2 * clusterHeight}" fill="black"/>
        </mask>
      </defs>
      <rect x="${frameInset}" y="${frameInset}" width="${frameWidth}" height="${frameHeight}" rx="${frameCornerRadius}" ry="${frameCornerRadius}" fill="none" stroke="url(#gold)" stroke-width="${ruleWeight}" mask="url(#interrupted-rule)"/>
      ${ornaments.join("\n")}
    </svg>
  `);
}

function roundedCanvasMaskSvg(spec) {
  return Buffer.from(`
    <svg width="${spec.width}" height="${spec.height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="${spec.width}" height="${spec.height}" rx="${spec.canvasCornerRadius}" ry="${spec.canvasCornerRadius}" fill="white"/>
    </svg>
  `);
}

async function cropGeometry(heroPath, spec, anchor) {
  const metadata = await sharp(heroPath).metadata();
  const sourceWidth = metadata.width;
  const sourceHeight = metadata.height;
  if (!sourceWidth || !sourceHeight) throw new Error(`Hero dimensions unavailable: ${heroPath}`);
  const targetRatio = spec.width / spec.height;
  const sourceRatio = sourceWidth / sourceHeight;
  let width = sourceWidth;
  let height = sourceHeight;
  let left = 0;
  let top = 0;
  if (sourceRatio > targetRatio) {
    width = Math.round(sourceHeight * targetRatio);
    left = Math.round((sourceWidth - width) * anchor);
  } else {
    height = Math.round(sourceWidth / targetRatio);
    top = Math.round((sourceHeight - height) * anchor);
  }
  return { left, top, width, height, anchor: Number(anchor.toFixed(6)) };
}

async function buildTemplate(heroPath, spec, anchor, outputPath) {
  const crop = await cropGeometry(heroPath, spec, anchor);
  const backdrop = await sharp(heroPath)
    .extract({ left: crop.left, top: crop.top, width: crop.width, height: crop.height })
    .resize(spec.width, spec.height, { fit: "fill", kernel: sharp.kernel.lanczos3 })
    .blur(3.5)
    .ensureAlpha()
    .png({ compressionLevel: 9, adaptiveFiltering: false })
    .toBuffer();

  await sharp(backdrop)
    .composite([
      { input: goldFrameSvg(spec), left: 0, top: 0 },
      { input: roundedCanvasMaskSvg(spec), left: 0, top: 0, blend: "dest-in" },
    ])
    .png({ compressionLevel: 9, adaptiveFiltering: false })
    .toFile(outputPath);
  return crop;
}

function checkerboardSvg(width, height, cell = 16) {
  const cells = [];
  for (let y = 0; y < height; y += cell) {
    for (let x = 0; x < width; x += cell) {
      const fill = ((x / cell + y / cell) % 2 === 0) ? "#d8d8d8" : "#a8a8a8";
      cells.push(`<rect x="${x}" y="${y}" width="${cell}" height="${cell}" fill="${fill}"/>`);
    }
  }
  return Buffer.from(`<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">${cells.join("")}</svg>`);
}

function labelSvg(width, height, lines) {
  const tspans = lines.map((line, index) =>
    `<tspan x="${width / 2}" dy="${index === 0 ? 0 : 15}">${escapeXml(line)}</tspan>`,
  ).join("");
  return Buffer.from(`
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#080a0b"/>
      <text x="${width / 2}" y="17" text-anchor="middle" fill="#58c8be" font-family="Arial, sans-serif" font-size="12" font-weight="700">${tspans}</text>
    </svg>
  `);
}

async function templateProofTile(imagePath, width, height, label) {
  const imageHeight = height - 38;
  const checker = checkerboardSvg(width, imageHeight);
  const image = await sharp(imagePath)
    .resize(width - 12, imageHeight - 12, { fit: "contain", withoutEnlargement: true })
    .png()
    .toBuffer();
  const metadata = await sharp(image).metadata();
  return sharp({ create: { width, height, channels: 3, background: "#080a0b" } })
    .composite([
      { input: checker, left: 0, top: 0 },
      { input: image, left: Math.floor((width - metadata.width) / 2), top: Math.floor((imageHeight - metadata.height) / 2) },
      { input: labelSvg(width, 38, [label]), left: 0, top: imageHeight },
    ])
    .jpeg({ quality: 86, chromaSubsampling: "4:4:4" })
    .toBuffer();
}

async function writeTemplateSheet(templateRecords, templateDirectory, outputPath) {
  const columns = 4;
  const tileWidth = 300;
  const tileHeight = 360;
  const rows = Math.ceil(templateRecords.length / columns);
  const composites = [];
  for (let index = 0; index < templateRecords.length; index += 1) {
    const record = templateRecords[index];
    const tile = await templateProofTile(path.join(templateDirectory, record.filename), tileWidth, tileHeight, `${record.cropId} ${record.format}`);
    composites.push({ input: tile, left: (index % columns) * tileWidth, top: Math.floor(index / columns) * tileHeight });
  }
  await sharp({ create: { width: columns * tileWidth, height: rows * tileHeight, channels: 3, background: "#050606" } })
    .composite(composites)
    .jpeg({ quality: 86, chromaSubsampling: "4:4:4" })
    .toFile(outputPath);
}

async function proofTile(imagePath, width, height, labelLines) {
  const imageHeight = height - 42;
  const image = await sharp(imagePath)
    .resize(width - 8, imageHeight - 8, { fit: "contain", background: { r: 8, g: 10, b: 11, alpha: 1 }, withoutEnlargement: true })
    .png()
    .toBuffer();
  const metadata = await sharp(image).metadata();
  return sharp({ create: { width, height, channels: 3, background: "#080a0b" } })
    .composite([
      { input: image, left: Math.floor((width - metadata.width) / 2), top: 4 },
      { input: labelSvg(width, 38, labelLines), left: 0, top: height - 38 },
    ])
    .jpeg({ quality: 83, chromaSubsampling: "4:4:4" })
    .toBuffer();
}

async function writeContactSheet(records, stagingDirectory, outputPath, state) {
  const columns = 6;
  const tileWidth = 180;
  const tileHeight = 220;
  const entries = [];
  for (const record of records) {
    const names = outputNames(record, state);
    entries.push({ name: names.square, label: `${record["asset-id"]} square` });
    entries.push({ name: names.portrait, label: `${record["asset-id"]} portrait` });
  }
  const composites = [];
  for (let index = 0; index < entries.length; index += 1) {
    const entry = entries[index];
    const tile = await proofTile(path.join(stagingDirectory, entry.name), tileWidth, tileHeight, [entry.label, entry.name.replace(/\.webp$/i, "")]);
    composites.push({ input: tile, left: (index % columns) * tileWidth, top: Math.floor(index / columns) * tileHeight });
  }
  const rows = Math.ceil(entries.length / columns);
  await sharp({ create: { width: columns * tileWidth, height: rows * tileHeight, channels: 3, background: "#050606" } })
    .composite(composites)
    .jpeg({ quality: 84, chromaSubsampling: "4:4:4" })
    .toFile(outputPath);
}

async function writeComparisonSheet(records, beforeDirectory, stagingDirectory, outputPath, state) {
  const pairsPerRow = 3;
  const tileWidth = 178;
  const tileHeight = 220;
  const pairWidth = tileWidth * 2;
  const composites = [];
  for (let index = 0; index < records.length; index += 1) {
    const record = records[index];
    const name = outputNames(record, state).square;
    const oldTile = await proofTile(path.join(beforeDirectory, name), tileWidth, tileHeight, [`${record["asset-id"]} BEFORE`, record["output-stem"]]);
    const newTile = await proofTile(path.join(stagingDirectory, name), tileWidth, tileHeight, [`${record["asset-id"]} AFTER`, record["output-stem"]]);
    const pairLeft = (index % pairsPerRow) * pairWidth;
    const top = Math.floor(index / pairsPerRow) * tileHeight;
    composites.push({ input: oldTile, left: pairLeft, top });
    composites.push({ input: newTile, left: pairLeft + tileWidth, top });
  }
  const rows = Math.ceil(records.length / pairsPerRow);
  await sharp({ create: { width: pairsPerRow * pairWidth, height: rows * tileHeight, channels: 3, background: "#050606" } })
    .composite(composites)
    .jpeg({ quality: 84, chromaSubsampling: "4:4:4" })
    .toFile(outputPath);
}

async function validateContract(records, stateDirectory, state) {
  const currentNames = await listWebpFiles(stateDirectory);
  const expectedNames = records.flatMap((record) => Object.values(outputNames(record, state))).sort(naturalCompare);
  const expectedCount = records.length * 2;
  if (records.length !== 218 || expectedNames.length !== expectedCount || new Set(expectedNames).size !== expectedCount) {
    throw new Error(`The source set does not resolve to ${expectedCount} unique paired filenames.`);
  }
  if (currentNames.length !== expectedNames.length || currentNames.some((name, index) => name !== expectedNames[index])) {
    throw new Error(`The current state library does not match the exact ${expectedCount}-filename contract.`);
  }
  return { currentNames, expectedNames };
}

async function backupBeforeImages(records, repoImages, beforeDirectory, state) {
  await fs.mkdir(beforeDirectory, { recursive: true });
  for (const record of records) {
    for (const name of Object.values(outputNames(record, state))) {
      const destination = path.join(beforeDirectory, name);
      if (!(await exists(destination))) await fs.copyFile(path.join(repoImages, name), destination);
    }
  }
}

async function auditSourceAlpha(records, outputPath) {
  const fields = ["asset-id", "source-file", "has-alpha-channel", "alpha-min", "alpha-max", "nonopaque-alpha"];
  const rows = [];
  for (let index = 0; index < records.length; index += 1) {
    const record = records[index];
    const image = sharp(record["source-file"], { failOn: "error" }).rotate();
    const metadata = await image.metadata();
    let alphaMin = 255;
    let alphaMax = 255;
    if (metadata.hasAlpha) {
      const stats = await image.stats();
      const alpha = stats.channels[stats.channels.length - 1];
      alphaMin = alpha.min;
      alphaMax = alpha.max;
    }
    rows.push({
      "asset-id": record["asset-id"],
      "source-file": record["source-file"],
      "has-alpha-channel": metadata.hasAlpha ? "yes" : "no",
      "alpha-min": alphaMin,
      "alpha-max": alphaMax,
      "nonopaque-alpha": metadata.hasAlpha && alphaMin < 255 ? "yes" : "no",
    });
    if ((index + 1) % 50 === 0 || index + 1 === records.length) process.stdout.write(`Audited source alpha ${index + 1}/${records.length}\n`);
  }
  await fs.writeFile(outputPath, stringifyCsv(fields, rows), "utf8");
  return {
    withAlphaChannel: rows.filter((row) => row["has-alpha-channel"] === "yes").length,
    withNonopaqueAlpha: rows.filter((row) => row["nonopaque-alpha"] === "yes").length,
  };
}

async function prepareWholeSource(sourceFile, safeArea) {
  const { data, info } = await sharp(sourceFile, { failOn: "error" })
    .rotate()
    .resize({
      width: safeArea.width,
      height: safeArea.height,
      fit: "inside",
      withoutEnlargement: true,
      kernel: sharp.kernel.lanczos3,
    })
    .png({ compressionLevel: 9, adaptiveFiltering: false })
    .toBuffer({ resolveWithObject: true });
  return {
    data,
    width: info.width,
    height: info.height,
    left: safeArea.left + Math.round((safeArea.width - info.width) / 2),
    top: safeArea.top + Math.round((safeArea.height - info.height) / 2),
  };
}

async function shadowBuffer(spec, artwork) {
  const blackShape = await sharp({
    create: { width: artwork.width, height: artwork.height, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0.44 } },
  })
    .composite([{ input: artwork.data, left: 0, top: 0, blend: "dest-in" }])
    .png()
    .toBuffer();
  return sharp({
    create: { width: spec.width, height: spec.height, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } },
  })
    .composite([{ input: blackShape, left: artwork.left + 10, top: artwork.top + 14 }])
    .blur(12)
    .png()
    .toBuffer();
}

async function encodeWithinTarget(pipelineFactory) {
  let last;
  for (let quality = START_QUALITY; quality >= MIN_QUALITY; quality -= 2) {
    const buffer = await pipelineFactory()
      .webp({ quality, alphaQuality: 100, effort: 6, smartSubsample: true })
      .toBuffer();
    last = { buffer, quality, exception: buffer.length > TARGET_BYTES };
    if (buffer.length <= TARGET_BYTES) return { ...last, exception: false };
  }
  return last;
}

async function buildComposite({ sourceFile, templatePath, outputPath, spec, safeArea }) {
  const artwork = await prepareWholeSource(sourceFile, safeArea);
  const shadow = await shadowBuffer(spec, artwork);
  const pipelineFactory = () => sharp(templatePath).composite([
    { input: shadow, left: 0, top: 0 },
    { input: artwork.data, left: artwork.left, top: artwork.top },
  ]);
  const encoded = await encodeWithinTarget(pipelineFactory);
  await fs.writeFile(outputPath, encoded.buffer);
  return {
    bytes: encoded.buffer.length,
    quality: encoded.quality,
    sha256: sha256(encoded.buffer),
    exception: encoded.exception,
    artworkWidth: artwork.width,
    artworkHeight: artwork.height,
    artworkLeft: artwork.left,
    artworkTop: artwork.top,
  };
}

function resolvePaths(options) {
  const manifestDirectory = path.join(options.libraryRoot, "_manifest");
  return {
    manifestDirectory,
    manifestPath: path.join(manifestDirectory, "source-map.csv"),
    stateDirectory: path.join(options.libraryRoot, options.state),
    templateDirectory: path.join(options.libraryRoot, "_templates", options.state),
    repoImages: path.join(options.repo, "public", "images"),
    contractPath: path.join(manifestDirectory, `6179-template-${options.state}-filename-contract-before.txt`),
    beforeDirectory: path.join(manifestDirectory, `6179-template-${options.state}-before-images`),
    alphaTracePath: path.join(manifestDirectory, `6179-template-${options.state}-source-alpha.csv`),
    templateSheetPath: path.join(manifestDirectory, `6179-${options.state}-template-sheet.jpg`),
    comparisonPath: path.join(manifestDirectory, `6179-${options.state}-template-before-after.jpg`),
    contactPath: path.join(manifestDirectory, `6179-${options.state}-template-stacked-contact-sheet.jpg`),
    metricsPath: path.join(manifestDirectory, `6179-template-${options.state}-metrics.json`),
    tracePath: path.join(manifestDirectory, `6179-template-${options.state}-output-trace.csv`),
    stagingDirectory: path.join(manifestDirectory, `6179-template-${options.state}-staging`),
  };
}

async function loadContext(options, paths) {
  for (const required of [options.hero, options.sourceRoot, paths.stateDirectory, paths.manifestPath, paths.repoImages]) {
    if (!(await exists(required))) throw new Error(`Required path unavailable: ${required}`);
  }
  await fs.mkdir(paths.manifestDirectory, { recursive: true });
  const { records: mappedRecords } = parseCsv(await fs.readFile(paths.manifestPath, "utf8"));
  if (mappedRecords.length !== 213) throw new Error(`Expected 213 source-map rows; found ${mappedRecords.length}`);
  for (const record of mappedRecords) await assertSourceInsideRoot(record["source-file"], options.sourceRoot);
  const records = [...mappedRecords, ...(await roseGoldRecords(options.libraryRoot))];
  if (records.length !== 218) throw new Error(`Expected 218 total product sources; found ${records.length}`);
  const contract = await validateContract(records, paths.stateDirectory, options.state);
  return { records, contract };
}

async function runTemplates(options, paths, records, contract) {
  await fs.writeFile(paths.contractPath, `${contract.currentNames.join("\r\n")}\r\n`, "utf8");
  await backupBeforeImages(records, paths.repoImages, paths.beforeDirectory, options.state);
  const alphaSummary = await auditSourceAlpha(records, paths.alphaTracePath);

  await fs.rm(paths.templateDirectory, { recursive: true, force: true });
  await fs.mkdir(paths.templateDirectory, { recursive: true });
  const templateRecords = [];
  for (let cropIndex = 0; cropIndex < CROP_COUNT; cropIndex += 1) {
    for (const [format, spec] of Object.entries(FORMAT_SPECS)) {
      const filename = templateName(options.stateCode, cropIndex, format);
      const crop = await buildTemplate(options.hero, spec, CROP_ANCHORS[cropIndex], path.join(paths.templateDirectory, filename));
      templateRecords.push({
        filename,
        cropId: `${options.stateCode}-${String(cropIndex + 1).padStart(2, "0")}`,
        cropIndex: cropIndex + 1,
        format,
        canvas: { width: spec.width, height: spec.height },
        sourceCrop: crop,
        canvasCornerRadius: spec.canvasCornerRadius,
        frame: {
          inset: spec.frameInset,
          cornerRadius: spec.frameCornerRadius,
          ruleWeight: spec.ruleWeight,
          gradient: ["#F4E3A1", "#D4B96A", "#8F6B24"],
          ornamentClusterWidth: Number(((spec.width - 2 * spec.frameInset) * 0.3).toFixed(3)),
        },
        safeArea: safeAreaFor(spec),
      });
    }
  }

  const templatesManifest = {
    recipeStamp: RECIPE_STAMP,
    state: options.state,
    stateCode: options.stateCode,
    hero: options.hero,
    cropCount: CROP_COUNT,
    cropAssignment: "FNV-1a 32-bit hash of normalized lowercase source basename modulo 8",
    sourceTransparency: { ...alphaSummary, trace: paths.alphaTracePath },
    templates: templateRecords,
  };
  await fs.writeFile(path.join(paths.templateDirectory, "templates.json"), `${JSON.stringify(templatesManifest, null, 2)}\n`, "utf8");
  await writeTemplateSheet(templateRecords, paths.templateDirectory, paths.templateSheetPath);

  process.stdout.write(`${JSON.stringify({
    phase: "templates",
    templates: templateRecords.length,
    templateDirectory: paths.templateDirectory,
    templatesManifest: path.join(paths.templateDirectory, "templates.json"),
    templateSheet: paths.templateSheetPath,
    filenameContract: paths.contractPath,
    beforeBackupCount: (await listWebpFiles(paths.beforeDirectory)).length,
    alphaSummary,
    inspectionTarget: path.join(paths.templateDirectory, `${options.stateCode}-01-square.png`),
  }, null, 2)}\n`);
}

async function runComposites(options, paths, records, contract) {
  const templatesManifestPath = path.join(paths.templateDirectory, "templates.json");
  if (!(await exists(templatesManifestPath))) throw new Error(`Templates manifest unavailable: ${templatesManifestPath}`);
  const templatesManifest = JSON.parse(await fs.readFile(templatesManifestPath, "utf8"));
  if (templatesManifest.recipeStamp !== RECIPE_STAMP || templatesManifest.templates?.length !== 16) {
    throw new Error("The template set is not the required 16-file 6179 template recipe.");
  }
  if (!(await exists(paths.contractPath))) throw new Error(`Pre-generation filename contract unavailable: ${paths.contractPath}`);
  const recordedNames = (await fs.readFile(paths.contractPath, "utf8")).split(/\r?\n/).filter(Boolean).sort(naturalCompare);
  if (recordedNames.length !== contract.expectedNames.length || recordedNames.some((name, index) => name !== contract.expectedNames[index])) {
    throw new Error("The recorded pre-generation filename contract no longer matches the source map.");
  }

  await fs.rm(paths.stagingDirectory, { recursive: true, force: true });
  await fs.mkdir(paths.stagingDirectory, { recursive: true });
  const trace = [];
  const exceptions = [];
  const cropUsage = new Set();
  const startedAt = new Date().toISOString();

  for (let index = 0; index < records.length; index += 1) {
    const record = records[index];
    const cropIndex = cropIndexForSource(record["source-file"]);
    cropUsage.add(cropIndex + 1);
    const outputs = {};
    for (const [format, spec] of Object.entries(FORMAT_SPECS)) {
      const name = outputNames(record, options.state)[format];
      const template = templateName(options.stateCode, cropIndex, format);
      const metrics = await buildComposite({
        sourceFile: record["source-file"],
        templatePath: path.join(paths.templateDirectory, template),
        outputPath: path.join(paths.stagingDirectory, name),
        spec,
        safeArea: safeAreaFor(spec),
      });
      outputs[format] = { name, template, ...metrics };
      if (metrics.exception) exceptions.push({ filename: name, bytes: metrics.bytes, quality: metrics.quality });
    }
    trace.push({ record, cropIndex: cropIndex + 1, outputs });
    if ((index + 1) % 10 === 0 || index + 1 === records.length) {
      process.stdout.write(`Generated ${index + 1}/${records.length} products (${(index + 1) * 2}/${records.length * 2} files)\n`);
    }
  }

  const stagedNames = await listWebpFiles(paths.stagingDirectory);
  if (stagedNames.length !== contract.expectedNames.length || stagedNames.some((name, index) => name !== contract.expectedNames[index])) {
    throw new Error(`The staged composite set does not match the exact ${contract.expectedNames.length}-filename contract.`);
  }
  if (cropUsage.size !== CROP_COUNT) throw new Error(`Expected all 8 crop IDs to be used; observed ${cropUsage.size}`);

  await writeComparisonSheet(records, paths.beforeDirectory, paths.stagingDirectory, paths.comparisonPath, options.state);
  await writeContactSheet(records, paths.stagingDirectory, paths.contactPath, options.state);
  for (const name of stagedNames) {
    const source = path.join(paths.stagingDirectory, name);
    await fs.copyFile(source, path.join(paths.stateDirectory, name));
    await fs.copyFile(source, path.join(paths.repoImages, name));
  }

  const traceHeaders = [
    "asset-id", "source-file", "source-hash", "output-stem", "crop-index",
    "square-template", "square-output", "square-sha256", "square-bytes", "square-quality",
    "portrait-template", "portrait-output", "portrait-sha256", "portrait-bytes", "portrait-quality",
  ];
  const traceRows = trace.map(({ record, cropIndex, outputs }) => ({
    "asset-id": record["asset-id"],
    "source-file": record["source-file"],
    "source-hash": record["source-hash"],
    "output-stem": record["output-stem"],
    "crop-index": cropIndex,
    "square-template": outputs.square.template,
    "square-output": outputs.square.name,
    "square-sha256": outputs.square.sha256,
    "square-bytes": outputs.square.bytes,
    "square-quality": outputs.square.quality,
    "portrait-template": outputs.portrait.template,
    "portrait-output": outputs.portrait.name,
    "portrait-sha256": outputs.portrait.sha256,
    "portrait-bytes": outputs.portrait.bytes,
    "portrait-quality": outputs.portrait.quality,
  }));
  await fs.writeFile(paths.tracePath, stringifyCsv(traceHeaders, traceRows), "utf8");

  const allBytes = trace.flatMap(({ outputs }) => [outputs.square.bytes, outputs.portrait.bytes]);
  const metrics = {
    recipeStamp: RECIPE_STAMP,
    state: options.state,
    startedAt,
    completedAt: new Date().toISOString(),
    productCount: records.length,
    outputCount: allBytes.length,
    dimensions: { square: "1200x1200", portrait: "1080x1350" },
    safeAreas: Object.fromEntries(Object.entries(FORMAT_SPECS).map(([format, spec]) => [format, safeAreaFor(spec)])),
    sizeBytes: {
      minimum: Math.min(...allBytes),
      maximum: Math.max(...allBytes),
      average: Math.round(allBytes.reduce((sum, value) => sum + value, 0) / allBytes.length),
      total: allBytes.reduce((sum, value) => sum + value, 0),
      target: TARGET_BYTES,
      exceptions,
    },
    crops: {
      available: CROP_COUNT,
      used: [...cropUsage].sort((left, right) => left - right),
      assignment: "FNV-1a 32-bit hash of normalized lowercase source basename modulo 8",
    },
    sourceTransparency: templatesManifest.sourceTransparency,
    templatesDirectory: paths.templateDirectory,
    filenameContract: paths.contractPath,
    outputTrace: paths.tracePath,
    templateSheet: paths.templateSheetPath,
    comparisonSheet: paths.comparisonPath,
    contactSheet: paths.contactPath,
  };
  await fs.writeFile(paths.metricsPath, `${JSON.stringify(metrics, null, 2)}\n`, "utf8");
  process.stdout.write(`${JSON.stringify(metrics, null, 2)}\n`);
}

async function main() {
  sharp.cache(false);
  const options = parseArgs(process.argv.slice(2));
  const paths = resolvePaths(options);
  const { records, contract } = await loadContext(options, paths);
  if (options.phase === "templates") await runTemplates(options, paths, records, contract);
  else await runComposites(options, paths, records, contract);
}

main().catch((error) => {
  process.stderr.write(`${error.stack ?? error.message}\n`);
  process.exitCode = 1;
});
