import { existsSync, unlinkSync } from "node:fs";
import { join } from "node:path";
import { generateAEOFiles, resolveConfig } from "aeo.js";
import { aeoConfig } from "../aeo.config.mjs";

const projectRoot = process.cwd();

const resolved = resolveConfig({
  ...aeoConfig,
  outDir: join(projectRoot, "public"),
  contentDir: join(projectRoot, ".aeo"),
  pages: aeoConfig.pages,
});

const result = await generateAEOFiles(resolved);

const sitemapPath = join(projectRoot, "public", "sitemap.xml");
if (existsSync(sitemapPath)) {
  unlinkSync(sitemapPath);
}

if (result.files.length > 0) {
  console.log(`[aeo.js] Generated ${result.files.length} files`);
}

if (result.errors.length > 0) {
  console.error("[aeo.js] Errors:", result.errors);
  process.exit(1);
}
