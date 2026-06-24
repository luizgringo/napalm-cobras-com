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
  generators: {
    ...aeoConfig.generators,
    robotsTxt: false,
    llmsTxt: false,
  },
});

const result = await generateAEOFiles(resolved);

for (const file of ["sitemap.xml", "llms.txt"]) {
  const filePath = join(projectRoot, "public", file);
  if (existsSync(filePath)) {
    unlinkSync(filePath);
  }
}

if (result.files.length > 0) {
  console.log(`[aeo.js] Generated ${result.files.length} files`);
}

if (result.errors.length > 0) {
  console.error("[aeo.js] Errors:", result.errors);
  process.exit(1);
}
