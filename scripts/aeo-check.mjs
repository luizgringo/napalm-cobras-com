import { join } from "node:path";
import { auditSite, formatAuditReport, getGrade, resolveConfig } from "aeo.js";
import { aeoConfig } from "../aeo.config.mjs";

const projectRoot = process.cwd();

const config = resolveConfig({
  ...aeoConfig,
  outDir: join(projectRoot, "public"),
  contentDir: join(projectRoot, ".aeo"),
});

const result = auditSite(config);

console.log(formatAuditReport(result));
console.log(`\nGrade: ${getGrade(result.score)} (${result.score}/100)`);

if (result.score < 70) {
  process.exit(1);
}
