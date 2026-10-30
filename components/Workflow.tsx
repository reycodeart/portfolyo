"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Bot, ChevronRight, Cog, User, Users } from "lucide-react";
import clsx from "clsx";
import { useLang } from "@/lib/i18n";
import { workflow } from "@/lib/content";
import type { WorkflowT } from "@/lib/schema";
import type { UiKey } from "@/lib/ui-strings";
import { Card, EvidenceLink, Section } from "./ui";

type Owner = WorkflowT["stages"][number]["owner"];

const ownerIcon: Record<Owner, typeof User> = { me: User, ai: Bot, automated: Cog, shared: Users };
const ownerTone: Record<Owner, string> = {
  me: "text-accent border-accent/50",
  ai: "text-accent-2 border-accent-2/50",
  automated: "text-ok border-ok/50",
  shared: "text-warn border-warn/50",
};

export function Workflow() {
  const { t, u } = useLang();
  const [active, setActive] = useState(workflow.stages[0].id);
  const stage = workflow.stages.find((s) => s.id === active) ?? workflow.stages[0];
  const index = workflow.stages.indexOf(stage);
  const Icon = ownerIcon[stage.owner];

  return (
    <Section id="workflow" eyebrow="03" title={u("workflowTitle")} intro={t(workflow.intro)}>
      <div className="flex flex-wrap gap-3 text-xs text-ink-3">
        {(Object.keys(ownerIcon) as Owner[]).map((o) => {
          const I = ownerIcon[o];
          return (
            <span key={o} className={clsx("inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5", ownerTone[o])}>
              <I className="h-3 w-3" aria-hidden />
              {u(`owner_${o}` as UiKey)}
            </span>
          );
        })}
      </div>

      <ol className="mt-6 flex flex-col gap-2 lg:flex-row lg:flex-wrap lg:items-center" role="tablist" aria-label={u("workflowTitle")}>
        {workflow.stages.map((s, i) => {
          const I = ownerIcon[s.owner];
          const selected = s.id === active;
          return (
            <li key={s.id} className="flex items-center gap-2">
              <button
                type="button"
                role="tab"
                aria-selected={selected}
                aria-controls="workflow-panel"
                onClick={() => setActive(s.id)}
                className={clsx(
                  "flex w-full items-center gap-2 rounded-lg border px-3 py-2 text-left text-sm transition-all lg:w-auto",
                  selected
                    ? "border-accent bg-accent/15 text-ink shadow-[0_0_0_3px_rgb(59_130_246/0.15)]"
                    : "border-line bg-surface/80 text-ink-2 hover:border-line-strong hover:text-ink",
                )}
              >
                <span className="font-mono text-xs text-ink-3">{String(i + 1).padStart(2, "0")}</span>
                <I className={clsx("h-4 w-4", ownerTone[s.owner].split(" ")[0])} aria-hidden />
                {t(s.title)}
              </button>
              {i < workflow.stages.length - 1 && (
                <ChevronRight className="hidden h-4 w-4 shrink-0 text-ink-3 lg:block" aria-hidden />
              )}
            </li>
          );
        })}
      </ol>

      <AnimatePresence mode="wait">
        <motion.div
          key={stage.id}
          id="workflow-panel"
          role="tabpanel"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
          className="mt-6"
        >
          <Card>
            <div className="flex flex-wrap items-center gap-3">
              <span className="font-mono text-xs text-ink-3">
                {u("stage")} {index + 1}/{workflow.stages.length}
              </span>
              <span className={clsx("inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-xs", ownerTone[stage.owner])}>
                <Icon className="h-3 w-3" aria-hidden />
                {u(`owner_${stage.owner}` as UiKey)}
              </span>
            </div>
            <h3 className="mt-3 text-xl font-semibold text-ink">{t(stage.title)}</h3>
            <p className="mt-2 leading-relaxed text-ink-2">{t(stage.description)}</p>
            <div className="mt-4 rounded-lg border border-line bg-bg/40 p-4">
              <p className="font-mono text-xs uppercase tracking-wider text-accent-2">{u("realExample")}</p>
              <p className="mt-1 text-sm text-ink">{t(stage.example)}</p>
            </div>
            {stage.evidence.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {stage.evidence.map((e) => (
                  <EvidenceLink key={e.url} link={e} compact />
                ))}
              </div>
            )}
          </Card>
        </motion.div>
      </AnimatePresence>
    </Section>
  );
}
