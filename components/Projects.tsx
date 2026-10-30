"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, Github, Lock } from "lucide-react";
import clsx from "clsx";
import { useLang } from "@/lib/i18n";
import { projects } from "@/lib/content";
import type { CategoryT, ProjectT } from "@/lib/schema";
import type { UiKey } from "@/lib/ui-strings";
import { AuthorshipBadge, Section, StatusBadge, Tag, VisibilityBadge } from "./ui";

const categories: CategoryT[] = ["ai-ml", "agents", "security", "testing", "data", "software", "game"];

export function Projects() {
  const { u } = useLang();
  const [cat, setCat] = useState<CategoryT | "all">("all");
  const [tech, setTech] = useState<string | null>(null);

  const allTags = useMemo(() => {
    const count = new Map<string, number>();
    projects.forEach((p) => p.tags.forEach((t) => count.set(t, (count.get(t) ?? 0) + 1)));
    // Tags used by more than one project first, then alphabetical.
    return [...count.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0])).map(([t]) => t);
  }, []);

  const visible = projects.filter(
    (p) => (cat === "all" || p.categories.includes(cat)) && (!tech || p.tags.includes(tech)),
  );
  const featured = visible.filter((p) => p.featured);
  const other = visible.filter((p) => !p.featured);

  return (
    <Section id="projects" eyebrow="01" title={u("projectsTitle")} intro={u("projectsIntro")}>
      <div className="flex flex-wrap gap-2" role="group" aria-label="Category">
        {(["all", ...categories] as const).map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setCat(c)}
            aria-pressed={cat === c}
            className={clsx(
              "rounded-full border px-3 py-1.5 text-sm transition-colors",
              cat === c ? "border-accent bg-accent/15 text-ink" : "border-line text-ink-2 hover:border-line-strong hover:text-ink",
            )}
          >
            {c === "all" ? u("filterAll") : u(`cat_${c.replace("-", "_")}` as UiKey)}
          </button>
        ))}
      </div>

      <details className="mt-4 group">
        <summary className="cursor-pointer list-none text-sm text-ink-3 hover:text-ink-2">
          <span className="font-mono">+ {u("filterByTech")}</span>
          {tech && <span className="ml-2 text-accent-2">· {tech}</span>}
        </summary>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {allTags.map((t) => (
            <Tag key={t} active={tech === t} onClick={() => setTech(tech === t ? null : t)}>
              {t}
            </Tag>
          ))}
        </div>
      </details>

      {(cat !== "all" || tech) && (
        <button
          type="button"
          onClick={() => {
            setCat("all");
            setTech(null);
          }}
          className="mt-3 text-sm text-accent-2 hover:underline"
        >
          {u("clearFilters")}
        </button>
      )}

      <motion.div layout className="mt-8 grid gap-5 md:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {featured.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </AnimatePresence>
      </motion.div>

      {visible.length === 0 && <p className="mt-8 text-ink-3">{u("noMatch")}</p>}

      {other.length > 0 && (
        <>
          <h3 className="mt-14 text-lg font-semibold text-ink">{u("otherProjects")}</h3>
          <motion.div layout className="mt-5 grid gap-5 md:grid-cols-2">
            <AnimatePresence mode="popLayout">
              {other.map((p) => (
                <ProjectCard key={p.slug} project={p} compact />
              ))}
            </AnimatePresence>
          </motion.div>
        </>
      )}
    </Section>
  );
}

function ProjectCard({ project: p, compact }: { project: ProjectT; compact?: boolean }) {
  const { t, u } = useLang();
  return (
    <motion.article
      layout
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.2 }}
      className="group relative flex flex-col rounded-xl border border-line bg-surface/80 p-5 transition-colors hover:border-line-strong"
    >
      <div className="flex flex-wrap items-center gap-2">
        <StatusBadge status={p.status} />
        <VisibilityBadge visibility={p.visibility} short />
        <AuthorshipBadge mode={p.authorship.mode} />
        <span className="ml-auto font-mono text-xs text-ink-3">{p.period}</span>
      </div>
      <h3 className="mt-4 text-xl font-semibold text-ink">{p.title}</h3>
      <p className="mt-1 text-sm text-accent-2">{t(p.subtitle)}</p>
      {!compact && <p className="mt-3 text-sm leading-relaxed text-ink-2">{t(p.summary)}</p>}
      {p.statusNote && !compact && <p className="mt-3 text-xs leading-relaxed text-ink-3">{t(p.statusNote)}</p>}
      <div className="mt-4 flex flex-wrap gap-1.5">
        {p.tags.slice(0, compact ? 5 : 8).map((tag) => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      </div>
      <div className="mt-auto flex flex-wrap items-center gap-4 pt-5">
        <Link
          href={`/projects/${p.slug}/`}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:text-accent-2"
        >
          {u("viewCaseStudy")}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
        </Link>
        <a
          href={p.repoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm text-ink-3 hover:text-ink"
          title={p.visibility === "private" ? u("privateLinkNote") : undefined}
        >
          <Github className="h-4 w-4" aria-hidden />
          {u("repo")}
          {p.visibility === "private" && <Lock className="h-3.5 w-3.5" aria-label={u("privateShort")} />}
        </a>
      </div>
    </motion.article>
  );
}
