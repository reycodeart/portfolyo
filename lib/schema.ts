import { z } from "zod";

/**
 * Content schema. Every file in /content is validated against these schemas at
 * build time (lib/content.ts) and by `npm run validate:content`, so a typo in a
 * JSON file fails the build instead of silently rendering an empty section.
 */

/** A string in both site languages. Turkish is the default language. */
export const L = z.object({ tr: z.string().min(1), en: z.string().min(1) });
export type Localized = z.infer<typeof L>;

const url = z.string().url();

export const EvidenceLink = z.object({
  label: L,
  url,
  kind: z.enum(["repo", "file", "commit", "pr", "ci", "doc", "test", "data"]),
  /** True when the target lives in a private repository (visitor needs access). */
  private: z.boolean().default(false),
});
export type EvidenceLinkT = z.infer<typeof EvidenceLink>;

export const ProjectStatus = z.enum(["completed", "ongoing", "prototype", "archived"]);
export type ProjectStatusT = z.infer<typeof ProjectStatus>;

export const Category = z.enum(["ai-ml", "agents", "security", "software", "testing", "data", "game"]);
export type CategoryT = z.infer<typeof Category>;

/** How a result was obtained: lets the reader see what was re-checked and what is self-reported. */
export const Verification = z.enum([
  "reproduced", // re-run during the portfolio audit and matched
  "ci-log", // read from a CI log
  "repo-file", // committed result file, not re-run
  "self-reported", // stated in a README/PR, not independently checked
]);
export type VerificationT = z.infer<typeof Verification>;

export const ResultItem = z.object({
  label: L,
  value: z.string(),
  verification: Verification,
  source: url.optional(),
});

export const ResultTable = z.object({
  caption: L,
  columns: z.array(L).min(2),
  rows: z.array(z.array(z.string())).min(1),
  verification: Verification,
  note: L.optional(),
});

export const Diagram = z.enum(["tls-pipeline", "face-detection", "keystroke", "rl-loop", "cursed-ci", "cerberion"]);

export const Project = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/),
  order: z.number().int(),
  featured: z.boolean(),
  title: z.string(),
  subtitle: L,
  status: ProjectStatus,
  statusNote: L.optional(),
  visibility: z.enum(["public", "private"]),
  repoUrl: url,
  period: z.string(),
  summary: L,
  tags: z.array(z.string()).min(1),
  categories: z.array(Category).min(1),
  /** One sentence on who/what produced the code. Required so AI-generated work is never blurred with own work. */
  authorship: z.object({
    mode: z.enum(["own-code", "ai-assisted", "mixed"]),
    note: L,
  }),
  caseStudy: z.object({
    problem: L,
    approach: z.array(L).min(1),
    architecture: z.object({ diagram: Diagram.optional(), text: L }),
    implementation: z.array(L).min(1),
    contribution: z.array(L).min(1),
    testing: z.array(L).min(1),
    results: z.object({
      items: z.array(ResultItem).default([]),
      tables: z.array(ResultTable).default([]),
      note: L.optional(),
    }),
    limitations: z.array(L).min(1),
    evidence: z.array(EvidenceLink).min(1),
  }),
});
export type ProjectT = z.infer<typeof Project>;

export const Site = z.object({
  name: z.string(),
  headline: z.string(),
  tagline: L,
  intro: L,
  statement: L,
  statementNote: L,
  location: L,
  education: z.object({ school: L, degree: L, graduation: z.string() }),
  links: z.object({ github: url, linkedin: url }),
  /** Path under /public, e.g. "/cv/Reyhan-Keskin-CV.pdf". null = no CV file published yet. */
  cvPath: z.string().startsWith("/").nullable(),
  interests: z.array(L),
  auditDate: z.string(),
});
export type SiteT = z.infer<typeof Site>;

export const Experience = z.array(
  z.object({
    kind: z.enum(["work", "education"]),
    org: z.string(),
    role: L,
    period: z.string(),
    points: z.array(L).default([]),
  }),
);
export type ExperienceT = z.infer<typeof Experience>;

const SkillItem = z.object({
  name: L,
  detail: L,
  evidence: z.array(EvidenceLink).min(1),
});

export const Skills = z.object({
  withoutAi: z.array(SkillItem),
  aiAssisted: z.array(SkillItem),
  note: L,
});
export type SkillsT = z.infer<typeof Skills>;

const AiItem = z.object({ title: L, detail: L, projects: z.array(z.string()).default([]) });

export const AiEngineering = z.object({
  intro: L,
  agentDistinction: z.object({ title: L, rl: L, llm: L, takeaway: L }),
  demonstrated: z.array(AiItem),
  transferable: z.array(AiItem),
  developing: z.array(AiItem),
  contributionAreas: z.array(L),
});
export type AiEngineeringT = z.infer<typeof AiEngineering>;

export const Workflow = z.object({
  intro: L,
  stages: z.array(
    z.object({
      id: z.string(),
      title: L,
      owner: z.enum(["me", "ai", "automated", "shared"]),
      description: L,
      example: L,
      evidence: z.array(EvidenceLink).default([]),
    }),
  ),
});
export type WorkflowT = z.infer<typeof Workflow>;

export const EvidenceExplorer = z.array(
  z.object({
    id: z.string(),
    label: L,
    items: z.array(
      z.object({
        project: z.string(),
        claim: L,
        link: EvidenceLink,
      }),
    ),
  }),
);
export type EvidenceExplorerT = z.infer<typeof EvidenceExplorer>;

export const DiagramNode = z.object({
  id: z.string(),
  title: L,
  status: z.enum(["done", "pending", "planned"]),
  detail: L,
});
export type DiagramNodeT = z.infer<typeof DiagramNode>;

/** A diagram is a list of layers drawn top to bottom; nodes in one layer are alternatives or parallel steps. */
export const Diagrams = z.record(
  Diagram,
  z.object({ title: L, layers: z.array(z.array(DiagramNode).min(1)).min(2) }),
);
export type DiagramsT = z.infer<typeof Diagrams>;
