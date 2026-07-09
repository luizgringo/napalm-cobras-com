import { readdir, stat, writeFile } from "node:fs/promises";
import { dirname, extname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const SCAN_DIRS = ["public", "docs"];
const RASTER_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif"]);

function formatBytes(bytes) {
  if (bytes < 1024) {
    return `${bytes} B`;
  }
  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(1)} KB`;
  }
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

function getMaxDimension(filePath) {
  const normalized = filePath.replaceAll("\\", "/");
  if (normalized.includes("/members/")) {
    return 2048;
  }
  if (normalized.includes("/flyers/")) {
    return 1920;
  }
  if (normalized.includes("/og/")) {
    return 1200;
  }
  if (normalized.includes("band-hero")) {
    return 1400;
  }
  if (normalized.includes("album-cover")) {
    return 1200;
  }
  if (normalized.includes("stage-map")) {
    return 1920;
  }
  return 2400;
}

async function collectFiles(dir, files = []) {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === "node_modules" || entry.name === ".next") {
        continue;
      }
      await collectFiles(fullPath, files);
      continue;
    }
    const extension = extname(entry.name).toLowerCase();
    if (!RASTER_EXTENSIONS.has(extension)) {
      continue;
    }
    const normalized = fullPath.replaceAll("\\", "/");
    if (normalized.includes("/band-hero/")) {
      continue;
    }
    files.push(fullPath);
  }
  return files;
}

async function encodeImage(pipeline, extension) {
  switch (extension) {
    case ".jpg":
    case ".jpeg":
      return pipeline.jpeg({ quality: 85, mozjpeg: true, progressive: true }).toBuffer();
    case ".png":
      return pipeline
        .png({ compressionLevel: 9, palette: true, quality: 90, effort: 10 })
        .toBuffer();
    case ".webp":
      return pipeline.webp({ quality: 85, effort: 6, smartSubsample: true }).toBuffer();
    case ".gif":
      return pipeline.gif({ effort: 10 }).toBuffer();
    default: {
      const exhaustive = extension;
      throw new Error(`Unsupported format: ${exhaustive}`);
    }
  }
}

async function compressImage(filePath) {
  const extension = extname(filePath).toLowerCase();
  const relativePath = relative(ROOT, filePath);
  const originalSize = (await stat(filePath)).size;
  const metadata = await sharp(filePath, { animated: extension === ".gif" }).metadata();
  const maxDimension = getMaxDimension(filePath);

  let pipeline = sharp(filePath, { animated: extension === ".gif" }).rotate();

  const width = metadata.width ?? 0;
  const height = metadata.height ?? 0;
  const longestEdge = Math.max(width, height);

  if (longestEdge > maxDimension) {
    pipeline = pipeline.resize({
      width: width >= height ? maxDimension : undefined,
      height: height > width ? maxDimension : undefined,
      fit: "inside",
      withoutEnlargement: true,
    });
  }

  const output = await encodeImage(pipeline, extension);

  if (output.length >= originalSize) {
    return {
      relativePath,
      originalSize,
      newSize: originalSize,
      saved: 0,
      resized: longestEdge > maxDimension,
      skipped: true,
    };
  }

  await writeFile(filePath, output);

  return {
    relativePath,
    originalSize,
    newSize: output.length,
    saved: originalSize - output.length,
    resized: longestEdge > maxDimension,
    skipped: false,
  };
}

async function main() {
  const files = [];
  for (const scanDir of SCAN_DIRS) {
    await collectFiles(join(ROOT, scanDir), files);
  }

  files.sort();

  let totalOriginal = 0;
  let totalNew = 0;
  const results = [];

  for (const filePath of files) {
    const result = await compressImage(filePath);
    results.push(result);
    totalOriginal += result.originalSize;
    totalNew += result.newSize;
  }

  const saved = totalOriginal - totalNew;
  const percent = totalOriginal > 0 ? ((saved / totalOriginal) * 100).toFixed(1) : "0.0";

  console.log("\nImage compression report\n");
  for (const result of results) {
    const marker = result.saved > 0 ? "✓" : "·";
    const resizeNote = result.resized ? " (resized)" : "";
    console.log(
      `${marker} ${result.relativePath}: ${formatBytes(result.originalSize)} → ${formatBytes(result.newSize)}${resizeNote}`,
    );
  }

  console.log(
    `\nTotal: ${formatBytes(totalOriginal)} → ${formatBytes(totalNew)} (${percent}% saved, ${formatBytes(saved)} freed)\n`,
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
