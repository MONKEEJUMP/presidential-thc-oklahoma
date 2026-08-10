#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import sharp from "sharp";

const RECIPE_STAMP = "6161-whole-photo-gold-frame-v2";
const CROP_COUNT = 12;
const CROP_ANCHORS = [0, 0.09, 0.18, 0.27, 0.36, 0.45, 0.55, 0.64, 0.73, 0.82, 0.91, 1];
const TARGET_BYTES = 200 * 1024;
const START_QUALITY = 82;
const MIN_QUALITY = 76;

const FORMAT_SPECS = {
  square: { width: 1200, height: 1200, inset: 60, rule: 4 },
  portrait: { width: 1080, height: 1350, inset: 54, rule: 3.6 },
};

const defaults = {
  state: "oklahoma",
  hero: "J:\\presidential-official\\web\\public\\media\\states\\ok-hero.webp",
  sourceRoot: "J:\\presidential-official\\sources\\client\\google-drive-drop\\_EXTRACTED",
  libraryRoot: "J:\\presidential-state-images",
  repo: "J:\\presidential-thc-oklahoma",
};

function parseArgs(argv) {
  const values = { ...defaults };
  const aliases = new Map([
    ["--state", "state"],
    ["--hero", "hero"],
    ["--source-root", "sourceRoot"],
    ["--library-root", "libraryRoot"],
    ["--repo", "repo"],
  ]);

  for (let index = 0; index < argv.length; index += 1) {
    const key = aliases.get(argv[index]);
    if (!key || !argv[index + 1]) {
      throw new Error(`Unknown or incomplete argument: ${argv[index]}`);
    }
    values[key] = argv[index + 1];
    index += 1;
  }

  values.state = values.state.trim().toLowerCase();
  if (!/^[a-z][a-z-]*$/.test(values.state)) {
    throw new Error(`Invalid state slug: ${values.state}`);
  }
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
  const filename = path.win32.basename(sourceFile).normalize("NFKC").toLowerCase();
  return fnv1a32(filename) % CROP_COUNT;
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

async function assertSourceInsideRoot(sourceFile, sourceRoot) {
  const source = path.win32.resolve(sourceFile).toLowerCase();
  const root = `${path.win32.resolve(sourceRoot).replace(/[\\/]+$/, "")}\\`.toLowerCase();
  if (!source.startsWith(root)) {
    throw new Error(`Source is outside the approved read-only root: ${sourceFile}`);
  }
  await fs.access(sourceFile);
}

function goldFrameSvg(spec) {
  const { width, height, inset, rule } = spec;
  const innerWidth = width - 2 * inset;
  const clusterWidth = innerWidth * 0.3;
  const clusterHeight = clusterWidth / 10;
  const clusterLeft = width / 2 - clusterWidth / 2;
  const clusterRight = width / 2 + clusterWidth / 2;
  const lineRight = width - inset;
  const lineBottom = height - inset;

  const filled = [
    [[100, 5], [104, 10], [100, 15], [96, 10]],
    [[57, 6], [61, 10], [57, 14], [53, 10]],
    [[143, 6], [147, 10], [143, 14], [139, 10]],
    [[17, 7], [20, 10], [17, 13], [14, 10]],
    [[7, 7], [10, 10], [7, 13], [4, 10]],
    [[183, 7], [186, 10], [183, 13], [180, 10]],
    [[193, 7], [196, 10], [193, 13], [190, 10]],
  ];
  const outlined = [
    [[91, 10], [77, 7], [63, 10], [77, 13]],
    [[109, 10], [123, 7], [137, 10], [123, 13]],
    [[51, 10], [38, 7.5], [25, 10], [38, 12.5]],
    [[149, 10], [162, 7.5], [175, 10], [162, 12.5]],
  ];

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
  for (const [lineY, flip] of [[inset, false], [lineBottom, true]]) {
    for (const poly of filled) ornaments.push(`<polygon points="${points(poly, lineY, flip)}" fill="url(#gold)"/>`);
    for (const poly of outlined) ornaments.push(`<polygon points="${points(poly, lineY, flip)}" fill="none" stroke="url(#gold)" stroke-width="${rule * 0.75}" stroke-linejoin="round"/>`);
  }

  return Buffer.from(`
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="gold" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stop-color="#F4E3A1"/>
          <stop offset="0.52" stop-color="#D4B96A"/>
          <stop offset="1" stop-color="#8F6B24"/>
        </linearGradient>
      </defs>
      <g fill="none" stroke="url(#gold)" stroke-width="${rule}" stroke-linecap="square">
        <line x1="${inset}" y1="${inset}" x2="${inset}" y2="${lineBottom}"/>
        <line x1="${lineRight}" y1="${inset}" x2="${lineRight}" y2="${lineBottom}"/>
        <line x1="${inset}" y1="${inset}" x2="${clusterLeft}" y2="${inset}"/>
        <line x1="${clusterRight}" y1="${inset}" x2="${lineRight}" y2="${inset}"/>
        <line x1="${inset}" y1="${lineBottom}" x2="${clusterLeft}" y2="${lineBottom}"/>
        <line x1="${clusterRight}" y1="${lineBottom}" x2="${lineRight}" y2="${lineBottom}"/>
      </g>
      ${ornaments.join("\n")}
    </svg>
  `);
}

async function buildBackdrop(heroPath, spec, anchor, outputPath) {
  const metadata = await sharp(heroPath).metadata();
  const sourceWidth = metadata.width;
  const sourceHeight = metadata.height;
  if (!sourceWidth || !sourceHeight) throw new Error(`Hero dimensions unavailable: ${heroPath}`);

  const targetRatio = spec.width / spec.height;
  const sourceRatio = sourceWidth / sourceHeight;
  let cropWidth = sourceWidth;
  let cropHeight = sourceHeight;
  let left = 0;
  let top = 0;
  if (sourceRatio > targetRatio) {
    cropWidth = Math.round(sourceHeight * targetRatio);
    left = Math.round((sourceWidth - cropWidth) * anchor);
  } else {
    cropHeight = Math.round(sourceWidth / targetRatio);
    top = Math.round((sourceHeight - cropHeight) * anchor);
  }

  await sharp(heroPath)
    .extract({ left, top, width: cropWidth, height: cropHeight })
    .resize(spec.width, spec.height, { fit: "fill", kernel: sharp.kernel.lanczos3 })
    .blur(3.5)
    .webp({ quality: 94, effort: 6, smartSubsample: true })
    .toFile(outputPath);
  return { left, top, width: cropWidth, height: cropHeight, anchor };
}

async function prepareWholeSource(sourceFile, spec) {
  const innerWidth = spec.width - 2 * spec.inset;
  const innerHeight = spec.height - 2 * spec.inset;
  const breathing = innerWidth * 0.09;
  const maxWidth = Math.floor(innerWidth - 2 * breathing);
  const maxHeight = Math.floor(innerHeight - 2 * breathing);

  const { data, info } = await sharp(sourceFile, { failOn: "error" })
    .rotate()
    .removeAlpha()
    .resize({
      width: maxWidth,
      height: maxHeight,
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
    left: Math.round((spec.width - info.width) / 2),
    top: Math.round((spec.height - info.height) / 2),
    breathing,
  };
}

async function shadowBuffer(spec, artwork) {
  const left = artwork.left + 10;
  const top = artwork.top + 14;
  const svg = Buffer.from(`
    <svg width="${spec.width}" height="${spec.height}" xmlns="http://www.w3.org/2000/svg">
      <rect x="${left}" y="${top}" width="${artwork.width}" height="${artwork.height}" rx="3" fill="rgba(0,0,0,0.42)"/>
    </svg>
  `);
  return sharp(svg).blur(12).png().toBuffer();
}

async function encodeWithinTarget(pipelineFactory) {
  let last;
  for (let quality = START_QUALITY; quality >= MIN_QUALITY; quality -= 2) {
    const buffer = await pipelineFactory()
      .webp({ quality, effort: 6, smartSubsample: true })
      .toBuffer();
    last = { buffer, quality, exception: buffer.length > TARGET_BYTES };
    if (buffer.length <= TARGET_BYTES) return { ...last, exception: false };
  }
  return last;
}

async function buildComposite({ sourceFile, backdropPath, outputPath, spec, frame }) {
  const artwork = await prepareWholeSource(sourceFile, spec);
  const shadow = await shadowBuffer(spec, artwork);
  const pipelineFactory = () => sharp(backdropPath)
    .composite([
      { input: frame, left: 0, top: 0 },
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
    breathingPixels: Number(artwork.breathing.toFixed(2)),
  };
}

function labelSvg(width, height, lines) {
  const tspans = lines.map((line, index) =>
    `<tspan x="${width / 2}" dy="${index === 0 ? 0 : 15}">${escapeXml(line)}</tspan>`,
  ).join("");
  return Buffer.from(`
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#080a0b"/>
      <text x="${width / 2}" y="18" text-anchor="middle" fill="#58c8be" font-family="Arial, sans-serif" font-size="12" font-weight="700">${tspans}</text>
    </svg>
  `);
}

async function proofTile(imagePath, width, height, labelLines) {
  const imageHeight = height - 42;
  const image = await sharp(imagePath)
    .resize(width - 8, imageHeight - 8, { fit: "contain", background: "#080a0b", withoutEnlargement: true })
    .png()
    .toBuffer();
  const imageMeta = await sharp(image).metadata();
  return sharp({ create: { width, height, channels: 3, background: "#080a0b" } })
    .composite([
      { input: image, left: Math.floor((width - imageMeta.width) / 2), top: 4 },
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
  const rows = Math.ceil(entries.length / columns);
  const composites = [];
  for (let index = 0; index < entries.length; index += 1) {
    const entry = entries[index];
    const tile = await proofTile(path.join(stagingDirectory, entry.name), tileWidth, tileHeight, [entry.label, entry.name.replace(/\.webp$/i, "")]);
    composites.push({ input: tile, left: (index % columns) * tileWidth, top: Math.floor(index / columns) * tileHeight });
  }
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
  const rows = Math.ceil(records.length / pairsPerRow);
  const composites = [];
  for (let index = 0; index < records.length; index += 1) {
    const record = records[index];
    const name = outputNames(record, state).square;
    const oldTile = await proofTile(path.join(beforeDirectory, name), tileWidth, tileHeight, [`${record["asset-id"]} OLD CUT-OUT`, record["output-stem"]]);
    const newTile = await proofTile(path.join(stagingDirectory, name), tileWidth, tileHeight, [`${record["asset-id"]} NEW WHOLE`, record["output-stem"]]);
    const pairLeft = (index % pairsPerRow) * pairWidth;
    const top = Math.floor(index / pairsPerRow) * tileHeight;
    composites.push({ input: oldTile, left: pairLeft, top });
    composites.push({ input: newTile, left: pairLeft + tileWidth, top });
  }
  await sharp({ create: { width: pairsPerRow * pairWidth, height: rows * tileHeight, channels: 3, background: "#050606" } })
    .composite(composites)
    .jpeg({ quality: 84, chromaSubsampling: "4:4:4" })
    .toFile(outputPath);
}

async function backupBeforeCutouts(records, repoImages, beforeDirectory, state) {
  await fs.mkdir(beforeDirectory, { recursive: true });
  for (const record of records) {
    const names = outputNames(record, state);
    for (const name of Object.values(names)) {
      const destination = path.join(beforeDirectory, name);
      if (!(await exists(destination))) {
        await fs.copyFile(path.join(repoImages, name), destination);
      }
    }
  }
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  const stateDirectory = path.join(options.libraryRoot, options.state);
  const manifestDirectory = path.join(options.libraryRoot, "_manifest");
  const manifestPath = path.join(manifestDirectory, "source-map.csv");
  const backdropDirectory = path.join(options.libraryRoot, "_backdrops", options.state);
  const repoImages = path.join(options.repo, "public", "images");
  const stagingDirectory = path.join(manifestDirectory, `6179-${options.state}-staging`);
  const beforeDirectory = path.join(manifestDirectory, `6179-${options.state}-before-cutouts`);
  const filenameContractPath = path.join(manifestDirectory, `6179-${options.state}-filename-contract-before.txt`);
  const filenameTracePath = path.join(manifestDirectory, `6179-${options.state}-filename-trace.csv`);
  const metricsPath = path.join(manifestDirectory, `6179-${options.state}-metrics.json`);
  const comparisonPath = path.join(manifestDirectory, `6179-${options.state}-before-after-comparison-sheet.jpg`);
  const contactPath = path.join(manifestDirectory, `6179-${options.state}-stacked-contact-sheet.jpg`);

  for (const required of [options.hero, options.sourceRoot, stateDirectory, manifestPath, repoImages]) {
    if (!(await exists(required))) throw new Error(`Required path unavailable: ${required}`);
  }
  await fs.mkdir(backdropDirectory, { recursive: true });
  await fs.mkdir(manifestDirectory, { recursive: true });

  const currentNames = await listWebpFiles(stateDirectory);
  await fs.writeFile(filenameContractPath, `${currentNames.join("\r\n")}\r\n`, "utf8");

  const { headers: originalHeaders, records } = parseCsv(await fs.readFile(manifestPath, "utf8"));
  if (records.length !== 213) throw new Error(`Expected 213 source records; found ${records.length}`);
  const expectedNames = records.flatMap((record) => Object.values(outputNames(record, options.state))).sort(naturalCompare);
  if (expectedNames.length !== 426 || new Set(expectedNames).size !== 426) {
    throw new Error("The manifest does not resolve to 426 unique paired output names.");
  }
  if (currentNames.length !== expectedNames.length || currentNames.some((name, index) => name !== expectedNames[index])) {
    throw new Error("The current state library does not match the exact 426-filename manifest contract.");
  }
  for (const record of records) await assertSourceInsideRoot(record["source-file"], options.sourceRoot);

  await backupBeforeCutouts(records, repoImages, beforeDirectory, options.state);
  await fs.rm(stagingDirectory, { recursive: true, force: true });
  await fs.mkdir(stagingDirectory, { recursive: true });

  const cropTrace = { square: [], portrait: [] };
  for (const [format, spec] of Object.entries(FORMAT_SPECS)) {
    for (let index = 0; index < CROP_COUNT; index += 1) {
      const filename = `backdrop-${options.state}-${String(index + 1).padStart(2, "0")}-${format}.webp`;
      const crop = await buildBackdrop(options.hero, spec, CROP_ANCHORS[index], path.join(backdropDirectory, filename));
      cropTrace[format].push({ filename, ...crop });
    }
  }

  const frames = Object.fromEntries(Object.entries(FORMAT_SPECS).map(([format, spec]) => [format, goldFrameSvg(spec)]));
  const outputTrace = [];
  const cropUsage = new Set();
  const exceptions = [];
  const startedAt = new Date().toISOString();

  for (let index = 0; index < records.length; index += 1) {
    const record = records[index];
    const cropIndex = cropIndexForSource(record["source-file"]);
    cropUsage.add(cropIndex + 1);
    const names = outputNames(record, options.state);
    const result = { record, cropIndex: cropIndex + 1, outputs: {} };

    for (const [format, spec] of Object.entries(FORMAT_SPECS)) {
      const name = names[format];
      const outputPath = path.join(stagingDirectory, name);
      const backdropName = cropTrace[format][cropIndex].filename;
      const metrics = await buildComposite({
        sourceFile: record["source-file"],
        backdropPath: path.join(backdropDirectory, backdropName),
        outputPath,
        spec,
        frame: frames[format],
      });
      result.outputs[format] = { name, backdropName, ...metrics };
      if (metrics.exception) exceptions.push({ filename: name, bytes: metrics.bytes, quality: metrics.quality });
    }
    outputTrace.push(result);
    if ((index + 1) % 10 === 0 || index + 1 === records.length) {
      process.stdout.write(`Generated ${index + 1}/${records.length} products (${(index + 1) * 2}/426 files)\n`);
    }
  }

  if (cropUsage.size < 8) throw new Error(`Only ${cropUsage.size} hero crops were assigned; at least 8 are required.`);
  const stagedNames = await listWebpFiles(stagingDirectory);
  if (stagedNames.length !== expectedNames.length || stagedNames.some((name, index) => name !== expectedNames[index])) {
    throw new Error("The staged library failed the exact filename contract.");
  }

  await writeComparisonSheet(records, beforeDirectory, stagingDirectory, comparisonPath, options.state);
  await writeContactSheet(records, stagingDirectory, contactPath, options.state);

  for (const name of stagedNames) {
    const source = path.join(stagingDirectory, name);
    await fs.copyFile(source, path.join(stateDirectory, name));
    await fs.copyFile(source, path.join(repoImages, name));
  }

  const traceHeaders = [
    "asset-id", "source-file", "source-hash", "output-stem", "state", "recipe-stamp", "crop-index",
    "square-output", "square-backdrop", "square-sha256", "square-bytes", "square-quality",
    "portrait-output", "portrait-backdrop", "portrait-sha256", "portrait-bytes", "portrait-quality",
  ];
  const traceRecords = outputTrace.map(({ record, cropIndex, outputs }) => ({
    "asset-id": record["asset-id"],
    "source-file": record["source-file"],
    "source-hash": record["source-hash"],
    "output-stem": record["output-stem"],
    state: options.state,
    "recipe-stamp": RECIPE_STAMP,
    "crop-index": cropIndex,
    "square-output": outputs.square.name,
    "square-backdrop": outputs.square.backdropName,
    "square-sha256": outputs.square.sha256,
    "square-bytes": outputs.square.bytes,
    "square-quality": outputs.square.quality,
    "portrait-output": outputs.portrait.name,
    "portrait-backdrop": outputs.portrait.backdropName,
    "portrait-sha256": outputs.portrait.sha256,
    "portrait-bytes": outputs.portrait.bytes,
    "portrait-quality": outputs.portrait.quality,
  }));
  await fs.writeFile(filenameTracePath, stringifyCsv(traceHeaders, traceRecords), "utf8");

  const field = (suffix) => `${options.state}-${suffix}`;
  const appendedHeaders = [
    "recipe-stamp", field("crop-index"), field("square-output"), field("square-backdrop"),
    field("square-sha256"), field("square-bytes"), field("square-quality"),
    field("portrait-output"), field("portrait-backdrop"), field("portrait-sha256"),
    field("portrait-bytes"), field("portrait-quality"),
  ];
  const updatedHeaders = [...originalHeaders.filter((header) => !appendedHeaders.includes(header)), ...appendedHeaders];
  const updatedRecords = records.map((record, index) => {
    const trace = outputTrace[index];
    return {
      ...record,
      "recipe-stamp": RECIPE_STAMP,
      [field("crop-index")]: trace.cropIndex,
      [field("square-output")]: trace.outputs.square.name,
      [field("square-backdrop")]: trace.outputs.square.backdropName,
      [field("square-sha256")]: trace.outputs.square.sha256,
      [field("square-bytes")]: trace.outputs.square.bytes,
      [field("square-quality")]: trace.outputs.square.quality,
      [field("portrait-output")]: trace.outputs.portrait.name,
      [field("portrait-backdrop")]: trace.outputs.portrait.backdropName,
      [field("portrait-sha256")]: trace.outputs.portrait.sha256,
      [field("portrait-bytes")]: trace.outputs.portrait.bytes,
      [field("portrait-quality")]: trace.outputs.portrait.quality,
    };
  });
  await fs.writeFile(manifestPath, stringifyCsv(updatedHeaders, updatedRecords), "utf8");

  const allBytes = outputTrace.flatMap(({ outputs }) => [outputs.square.bytes, outputs.portrait.bytes]);
  const metrics = {
    recipeStamp: RECIPE_STAMP,
    state: options.state,
    startedAt,
    completedAt: new Date().toISOString(),
    productCount: records.length,
    outputCount: allBytes.length,
    dimensions: { square: "1200x1200", portrait: "1080x1350" },
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
      assignment: "FNV-1a 32-bit hash of normalized lowercase source filename modulo 12",
      trace: cropTrace,
    },
    contractFile: filenameContractPath,
    sourceTrace: filenameTracePath,
    comparisonSheet: comparisonPath,
    contactSheet: contactPath,
  };
  await fs.writeFile(metricsPath, `${JSON.stringify(metrics, null, 2)}\n`, "utf8");

  process.stdout.write(`${JSON.stringify(metrics, null, 2)}\n`);
}

main().catch((error) => {
  process.stderr.write(`${error.stack ?? error.message}\n`);
  process.exitCode = 1;
});
