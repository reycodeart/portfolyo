import { z } from "zod";
import {
  AiEngineering,
  Diagrams,
  EvidenceExplorer,
  Experience,
  Project,
  Site,
  Skills,
  Workflow,
  type ProjectT,
} from "./schema";

import siteJson from "@/content/site.json";
import experienceJson from "@/content/experience.json";
import skillsJson from "@/content/skills.json";
import aiJson from "@/content/ai-engineering.json";
import workflowJson from "@/content/workflow.json";
import evidenceJson from "@/content/evidence.json";
import diagramsJson from "@/content/diagrams.json";
import { projectFiles } from "@/content/projects";

/**
 * Parses content at module load. Because pages are statically generated, any
 * schema error surfaces during `next build` with the file name and the path of
 * the bad field.
 */
function parse<T extends z.ZodTypeAny>(schema: T, data: unknown, file: string): z.infer<T> {
  const result = schema.safeParse(data);
  if (!result.success) {
    const issues = result.error.issues.map((i) => `  - ${i.path.join(".") || "(root)"}: ${i.message}`).join("\n");
    throw new Error(`Invalid content in ${file}:\n${issues}`);
  }
  return result.data;
}

export const site = parse(Site, siteJson, "content/site.json");
export const experience = parse(Experience, experienceJson, "content/experience.json");
export const skills = parse(Skills, skillsJson, "content/skills.json");
export const aiEngineering = parse(AiEngineering, aiJson, "content/ai-engineering.json");
export const workflow = parse(Workflow, workflowJson, "content/workflow.json");
export const evidence = parse(EvidenceExplorer, evidenceJson, "content/evidence.json");
export const diagrams = parse(Diagrams, diagramsJson, "content/diagrams.json");

export const projects: ProjectT[] = Object.entries(projectFiles)
  .map(([file, data]) => parse(Project, data, `content/projects/${file}.json`))
  .sort((a, b) => a.order - b.order);

for (const p of projects) {
  const d = p.caseStudy.architecture.diagram;
  if (d && !diagrams[d]) throw new Error(`content/projects/${p.slug}.json uses diagram "${d}" which is not in content/diagrams.json`);
}

const slugs = new Set<string>();
for (const p of projects) {
  if (slugs.has(p.slug)) throw new Error(`Duplicate project slug: ${p.slug}`);
  slugs.add(p.slug);
}

// Cross-references from other files must point to a real project.
const refs: [string, string][] = [
  ...aiEngineering.demonstrated.flatMap((i) => i.projects.map((p) => ["ai-engineering.demonstrated", p] as [string, string])),
  ...aiEngineering.transferable.flatMap((i) => i.projects.map((p) => ["ai-engineering.transferable", p] as [string, string])),
  ...evidence.flatMap((g) => g.items.map((i) => [`evidence.${g.id}`, i.project] as [string, string])),
];
for (const [where, slug] of refs) {
  if (!slugs.has(slug)) throw new Error(`${where} references unknown project "${slug}"`);
}

export function getProject(slug: string): ProjectT | undefined {
  return projects.find((p) => p.slug === slug);
}

export function projectTitle(slug: string): string {
  return getProject(slug)?.title ?? slug;
}
