"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, Github, Info, Lock } from "lucide-react";
import clsx from "clsx";
import { useLang } from "@/lib/i18n";
import type { Localized, ProjectT } from "@/lib/schema";
import type { UiKey } from "@/lib/ui-strings";
import { ArchitectureDiagram } from "./ArchitectureDiagram";
import { AuthorshipBadge, EvidenceLink, StatusBadge, Tag, VerificationBadge, VisibilityBadge } from "./ui";

const sections = [
  "problem",
  "approach",
  "architecture",
  "implementation",
  "contribution",
  "testing",
  "results",
  "limitations",
  "evidence",
] as const;
type SectionId = (typeof sections)[number];

export function CaseStudy({ project: p }: { project: ProjectT }) {
  const { t, u } = useLang();
  const cs = p.caseStudy;
  const [open, setOpen] = useState<Set<SectionId>>(new Set(sections));
  const allOpen = open.size === sections.length;

  const toggle = (id: SectionId) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const list = (items: Localized[]) => (
    <ul className="space-y-2">
      {items.map((it, i) => (
        <li key={i} className="flex gap-2.5 leading-relaxed text-ink-2">
          <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-2/80" aria-hidden />
          <span>{t(it)}</span>
        </li>
      ))}
    </ul>
  );

  const body: Record<SectionId, React.ReactNode> = {
    problem: <p className="leading-relaxed text-ink-2">{t(cs.problem)}</p>,
    approach: list(cs.approach),
    architecture: (
      <div className="space-y-4">
        <p className="leading-relaxed text-ink-2">{t(cs.architecture.text)}</p>
        {cs.architecture.diagram && <ArchitectureDiagram id={cs.architecture.diagram} />}
      </div>
    ),
    implementation: list(cs.implementation),
    contribution: (
      <div className="space-y-4">
        <div className="flex gap-3 rounded-lg border border-accent-2/30 bg-accent-2/5 p-3 text-sm">
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-accent-2" aria-hidden />
          <div>
            <p className="flex flex-wrap items-center gap-2 font-medium text-ink">
              {u("authorship")} <AuthorshipBadge mode={p.authorship.mode} />
            </p>
            <p className="mt-1 text-ink-2">{t(p.authorship.note)}</p>
          </div>
        </div>
        {list(cs.contribution)}
      </div>
    ),
    testing: list(cs.testing),
    results: (
      <div className="space-y-5">
        {cs.results.items.length > 0 && (
          <dl className="grid gap-3 sm:grid-cols-2">
            {cs.results.items.map((r, i) => (
              <div key={i} className="rounded-lg border border-line bg-surface-2/40 p-4">
                <dt className="text-xs text-ink-3">{t(r.label)}</dt>
                <dd className={clsx("mt-1 font-mono text-ink", r.value.length > 18 ? "text-base" : "text-lg")}>
                  {r.source ? (
                    <a href={r.source} target="_blank" rel="noopener noreferrer" className="hover:text-accent-2">
                      {r.value}
                    </a>
                  ) : (
                    r.value
                  )}
                </dd>
                <div className="mt-2">
                  <VerificationBadge v={r.verification} />
                </div>
              </div>
            ))}
          </dl>
        )}
        {cs.results.tables.map((tb, i) => (
          <div key={i} className="overflow-hidden rounded-lg border border-line">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line bg-surface-2/50 px-4 py-2.5">
              <p className="text-sm font-medium text-ink">{t(tb.caption)}</p>
              <VerificationBadge v={tb.verification} />
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[28rem] text-left text-sm">
                <thead>
                  <tr className="border-b border-line">
                    {tb.columns.map((c, j) => (
                      <th key={j} scope="col" className="px-4 py-2 font-medium text-ink-3">
                        {t(c)}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {tb.rows.map((row, j) => (
                    <tr key={j} className="border-b border-line/60 last:border-0">
                      {row.map((cell, k) => (
                        <td key={k} className={clsx("px-4 py-2", k === 0 ? "text-ink" : "font-mono text-ink-2")}>
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {tb.note && <p className="border-t border-line px-4 py-2.5 text-xs leading-relaxed text-ink-3">{t(tb.note)}</p>}
          </div>
        ))}
        {cs.results.items.length === 0 && cs.results.tables.length === 0 && <p className="text-ink-3">{u("noResults")}</p>}
        {cs.results.note && (
          <p className="rounded-lg border border-warn/30 bg-warn/5 p-3 text-sm leading-relaxed text-ink-2">{t(cs.results.note)}</p>
        )}
      </div>
    ),
    limitations: list(cs.limitations),
    evidence: (
      <div className="space-y-3">
        <div className="flex flex-wrap gap-2">
          {cs.evidence.map((e) => (
            <EvidenceLink key={e.url} link={e} />
          ))}
        </div>
        {cs.evidence.some((e) => e.private) && (
          <p className="flex items-center gap-1.5 text-xs text-ink-3">
            <Lock className="h-3 w-3" aria-hidden /> {u("privateLinkNote")}
          </p>
        )}
      </div>
    ),
  };

  return (
    <article className="mx-auto max-w-4xl px-4 pb-24 pt-10 sm:px-6">
      <Link href="/#projects" className="inline-flex items-center gap-1.5 text-sm text-ink-3 hover:text-ink">
        <ArrowLeft className="h-4 w-4" aria-hidden /> {u("back")}
      </Link>

      <header className="mt-6">
        <div className="flex flex-wrap items-center gap-2">
          <StatusBadge status={p.status} />
          <VisibilityBadge visibility={p.visibility} />
          <AuthorshipBadge mode={p.authorship.mode} />
          <span className="font-mono text-xs text-ink-3">{p.period}</span>
        </div>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">{p.title}</h1>
        <p className="mt-2 text-lg text-accent-2">{t(p.subtitle)}</p>
        <p className="mt-4 leading-relaxed text-ink-2">{t(p.summary)}</p>
        {p.statusNote && (
          <p className="mt-4 rounded-lg border border-line bg-surface-2/50 p-3 text-sm text-ink-2">{t(p.statusNote)}</p>
        )}
        <div className="mt-4 flex flex-wrap gap-1.5">
          {p.tags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </div>
        <div className="mt-5 flex flex-wrap items-center gap-4">
          <a
            href={p.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-line-strong px-3 py-2 text-sm text-ink hover:border-accent/60"
          >
            <Github className="h-4 w-4" aria-hidden />
            {p.repoUrl.replace("https://github.com/", "")}
            {p.visibility === "private" && <Lock className="h-3.5 w-3.5 text-ink-3" aria-label={u("privateShort")} />}
          </a>
          <button
            type="button"
            onClick={() => setOpen(allOpen ? new Set() : new Set(sections))}
            className="text-sm text-accent-2 hover:underline"
          >
            {allOpen ? u("collapseAll") : u("expandAll")}
          </button>
        </div>
      </header>

      <nav className="mt-8 flex flex-wrap gap-x-4 gap-y-2 border-y border-line py-3 text-sm" aria-label="Case study sections">
        {sections.map((s, i) => (
          <a key={s} href={`#${s}`} className="text-ink-3 hover:text-ink">
            <span className="font-mono text-xs text-ink-3">{i + 1}.</span> {u(`cs_${s}` as UiKey)}
          </a>
        ))}
      </nav>

      <div className="mt-6 space-y-3">
        {sections.map((s, i) => {
          const isOpen = open.has(s);
          return (
            <section key={s} id={s} className="rounded-xl border border-line bg-surface/70">
              <h2>
                <button
                  type="button"
                  onClick={() => toggle(s)}
                  aria-expanded={isOpen}
                  aria-controls={`${s}-body`}
                  className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left"
                >
                  <span className="flex items-baseline gap-3">
                    <span className="font-mono text-xs text-accent-2">{String(i + 1).padStart(2, "0")}</span>
                    <span className="text-lg font-semibold text-ink">{u(`cs_${s}` as UiKey)}</span>
                  </span>
                  <span className={clsx("font-mono text-ink-3 transition-transform", isOpen && "rotate-45")} aria-hidden>
                    +
                  </span>
                </button>
              </h2>
              {isOpen && (
                <div id={`${s}-body`} className="px-5 pb-5">
                  {body[s]}
                </div>
              )}
            </section>
          );
        })}
      </div>
    </article>
  );
}
