"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import clsx from "clsx";
import { useLang } from "@/lib/i18n";
import { evidence, getProject } from "@/lib/content";
import { EvidenceLink, Section, StatusBadge } from "./ui";

export function EvidenceExplorer() {
  const { t, u } = useLang();
  const [active, setActive] = useState(evidence[0].id);
  const group = evidence.find((g) => g.id === active) ?? evidence[0];

  return (
    <Section id="evidence" eyebrow="05" title={u("evidenceTitle")} intro={u("evidenceIntro")}>
      <div className="flex flex-wrap gap-2" role="tablist" aria-label={u("evidenceTitle")}>
        {evidence.map((g) => (
          <button
            key={g.id}
            type="button"
            role="tab"
            aria-selected={g.id === active}
            aria-controls="evidence-panel"
            onClick={() => setActive(g.id)}
            className={clsx(
              "rounded-lg border px-3 py-2 text-sm transition-colors",
              g.id === active ? "border-accent-2 bg-accent-2/10 text-ink" : "border-line text-ink-2 hover:border-line-strong hover:text-ink",
            )}
          >
            {t(g.label)}
            <span className="ml-2 font-mono text-xs text-ink-3">{g.items.length}</span>
          </button>
        ))}
      </div>

      <div id="evidence-panel" role="tabpanel" className="mt-6">
        <AnimatePresence mode="wait">
          <motion.ul
            key={group.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="grid gap-3 md:grid-cols-2"
          >
            {group.items.map((item, i) => {
              const p = getProject(item.project);
              return (
                <li key={i} className="flex flex-col gap-3 rounded-xl border border-line bg-surface/80 p-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <Link href={`/projects/${item.project}/`} className="font-medium text-ink hover:text-accent-2">
                      {p?.title}
                    </Link>
                    {p && <StatusBadge status={p.status} />}
                  </div>
                  <p className="text-sm text-ink-2">{t(item.claim)}</p>
                  <div>
                    <EvidenceLink link={item.link} compact />
                  </div>
                </li>
              );
            })}
          </motion.ul>
        </AnimatePresence>
      </div>
    </Section>
  );
}
