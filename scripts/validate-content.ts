// Validates every content file against lib/schema.ts. Run: npm run validate:content
import { readdirSync } from "node:fs";
import { join } from "node:path";

async function main() {
  const { projects, site, workflow, evidence } = await import("../lib/content");
  const { projectFiles } = await import("../content/projects");

  // Every JSON file in content/projects must be registered in content/projects/index.ts.
  const onDisk = readdirSync(join(__dirname, "..", "content", "projects"))
    .filter((f) => f.endsWith(".json"))
    .map((f) => f.replace(/\.json$/, ""));
  const missing = onDisk.filter((f) => !(f in projectFiles));
  if (missing.length) throw new Error(`Unregistered project files: ${missing.join(", ")}`);

  const links = projects.reduce((n, p) => n + p.caseStudy.evidence.length, 0);
  console.log(`OK: site "${site.name}", ${projects.length} projects, ${links} project evidence links,`);
  console.log(`    ${workflow.stages.length} workflow stages, ${evidence.length} evidence explorer groups.`);
}

main().catch((e) => {
  console.error(e instanceof Error ? e.message : e);
  process.exit(1);
});
