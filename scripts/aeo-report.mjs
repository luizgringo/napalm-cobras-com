import { join } from "node:path";
import { formatReportMarkdown, generateReport, resolveConfig } from "aeo.js";
import { aeoConfig } from "../aeo.config.mjs";

const projectRoot = process.cwd();

const config = resolveConfig({
  ...aeoConfig,
  outDir: join(projectRoot, "public"),
  contentDir: join(projectRoot, ".aeo"),
});

const report = generateReport(config);

console.log(formatReportMarkdown(report));
