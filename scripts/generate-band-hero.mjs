import { mkdir, stat, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const SOURCE = join(ROOT, "assets-source/band-hero.JPG");
const OUTPUT_DIR = join(ROOT, "public/assets/images/band-hero");
const OG_OUTPUT = join(ROOT, "public/og/cover.jpg");
const WIDTHS = [640, 960, 1280, 1400];
const OG_WIDTH = 1200;
const OG_HEIGHT = 630;
const OG_FOCAL_Y = 0.24;

function formatBytes(bytes) {
  if (bytes < 1024) {
    return `${bytes} B`;
  }
  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(1)} KB`;
  }
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

async function writeVariant(pipeline, outputPath, encoder) {
  const buffer = await encoder(pipeline);
  await writeFile(outputPath, buffer);
  const size = (await stat(outputPath)).size;
  return size;
}

async function generateWidth(source, width) {
  const resized = source.clone().resize({
    width,
    fit: "inside",
    withoutEnlargement: true,
  });

  const baseName = `band-hero-${width}`;
  const avifSize = await writeVariant(resized, join(OUTPUT_DIR, `${baseName}.avif`), (pipeline) =>
    pipeline.avif({ quality: 52, effort: 6 }).toBuffer(),
  );
  const webpSize = await writeVariant(resized, join(OUTPUT_DIR, `${baseName}.webp`), (pipeline) =>
    pipeline.webp({ quality: 82, effort: 6, smartSubsample: true }).toBuffer(),
  );
  const jpgSize = await writeVariant(resized, join(OUTPUT_DIR, `${baseName}.jpg`), (pipeline) =>
    pipeline.jpeg({ quality: 85, mozjpeg: true, progressive: true }).toBuffer(),
  );

  return { width, avifSize, webpSize, jpgSize };
}

async function generateOgCover(source) {
  const metadata = await source.metadata();
  const srcW = metadata.width ?? 0;
  const srcH = metadata.height ?? 0;
  const scale = Math.max(OG_WIDTH / srcW, OG_HEIGHT / srcH);
  const scaledW = Math.round(srcW * scale);
  const scaledH = Math.round(srcH * scale);
  const left = Math.max(0, Math.round((scaledW - OG_WIDTH) / 2));
  const focalY = scaledH * OG_FOCAL_Y;
  const viewportFocalY = OG_HEIGHT * OG_FOCAL_Y;
  const top = Math.max(0, Math.min(Math.round(focalY - viewportFocalY), scaledH - OG_HEIGHT));

  await mkdir(dirname(OG_OUTPUT), { recursive: true });

  const buffer = await source
    .clone()
    .resize(scaledW, scaledH)
    .extract({ left, top, width: OG_WIDTH, height: OG_HEIGHT })
    .jpeg({ quality: 85, mozjpeg: true, progressive: true })
    .toBuffer();

  await writeFile(OG_OUTPUT, buffer);
  return (await stat(OG_OUTPUT)).size;
}

async function main() {
  await mkdir(OUTPUT_DIR, { recursive: true });
  const source = sharp(SOURCE).rotate();
  const metadata = await source.metadata();

  console.log(`\nSource: ${SOURCE.replace(ROOT, ".")} (${metadata.width}x${metadata.height})\n`);

  const results = [];
  for (const width of WIDTHS) {
    results.push(await generateWidth(source, width));
  }

  console.log("Generated band hero variants:\n");
  for (const result of results) {
    console.log(
      `  ${result.width}w  avif ${formatBytes(result.avifSize)}  webp ${formatBytes(result.webpSize)}  jpg ${formatBytes(result.jpgSize)}`,
    );
  }

  const ogSize = await generateOgCover(source);
  console.log(
    `\nOG cover: ${OG_OUTPUT.replace(ROOT, ".")} (${OG_WIDTH}x${OG_HEIGHT}, ${formatBytes(ogSize)})\n`,
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
