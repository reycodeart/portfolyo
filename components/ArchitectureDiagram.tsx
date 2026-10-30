"use client";

import { Fragment, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowDown, CheckCircle2, CircleDashed, Hourglass } from "lucide-react";
import clsx from "clsx";
import { useLang } from "@/lib/i18n";
import { diagrams } from "@/lib/content";
import type { DiagramNodeT, DiagramsT } from "@/lib/schema";
import type { UiKey } from "@/lib/ui-strings";

const statusIcon = { done: CheckCircle2, pending: Hourglass, planned: CircleDashed } as const;
const statusTone = {
  done: "border-line-strong",
  pending: "border-warn/60 border-dashed",
  planned: "border-ink-3/60 border-dashed",
} as const;
const statusText = { done: "text-ok", pending: "text-warn", planned: "text-ink-3" } as const;

/**
 * Layered top-to-bottom diagram. Nodes in the same layer are parallel or
 * alternative steps. Clicking a node opens its explanation under the layer.
 */
export function ArchitectureDiagram({ id }: { id: keyof DiagramsT }) {
  const { t, u } = useLang();
  const d = diagrams[id];
  const [active, setActive] = useState<string | null>(null);
  if (!d) return null;

  const all = d.layers.flat();
  const selected: DiagramNodeT | undefined = all.find((n) => n.id === active);

  return (
    <figure className="rounded-xl border border-line bg-bg/60 p-4 sm:p-6">
      <figcaption className="flex flex-wrap items-center justify-between gap-3">
        <span className="font-mono text-xs uppercase tracking-wider text-accent-2">{t(d.title)}</span>
        <span className="flex flex-wrap gap-3 text-xs text-ink-3">
          {(["done", "pending", "planned"] as const)
            .filter((s) => all.some((n) => n.status === s))
            .map((s) => {
              const I = statusIcon[s];
              return (
                <span key={s} className="inline-flex items-center gap-1">
                  <I className={clsx("h-3.5 w-3.5", statusText[s])} aria-hidden />
                  {u(`node_${s}` as UiKey)}
                </span>
              );
            })}
        </span>
      </figcaption>
      <p className="mt-1 text-xs text-ink-3">{u("clickNode")}</p>

      <div className="mt-5 flex flex-col items-center">
        {d.layers.map((layer, li) => {
          const openHere = selected && layer.some((n) => n.id === selected.id);
          return (
            <Fragment key={li}>
              {li > 0 && <ArrowDown className="my-1.5 h-4 w-4 text-line-strong" aria-hidden />}
              <div className="flex w-full flex-wrap justify-center gap-2">
                {layer.map((n) => {
                  const I = statusIcon[n.status];
                  const isActive = n.id === active;
                  return (
                    <button
                      key={n.id}
                      type="button"
                      onClick={() => setActive(isActive ? null : n.id)}
                      aria-expanded={isActive}
                      className={clsx(
                        "flex min-w-[9rem] max-w-[16rem] flex-1 items-center justify-center gap-2 rounded-lg border bg-surface px-3 py-2.5 text-center text-sm text-ink transition-all sm:flex-none",
                        statusTone[n.status],
                        isActive ? "border-accent-2 bg-accent-2/10 shadow-[0_0_0_3px_rgb(34_211_238/0.15)]" : "hover:border-accent/60",
                      )}
                    >
                      <I className={clsx("h-3.5 w-3.5 shrink-0", statusText[n.status])} aria-hidden />
                      <span>{t(n.title)}</span>
                    </button>
                  );
                })}
              </div>
              <AnimatePresence initial={false}>
                {openHere && selected && (
                  <motion.div
                    key={selected.id}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="w-full max-w-2xl overflow-hidden"
                  >
                    <div className="mt-2 rounded-lg border border-accent-2/40 bg-accent-2/5 p-3 text-sm leading-relaxed text-ink-2">
                      <span className="font-medium text-ink">{t(selected.title)}: </span>
                      {t(selected.detail)}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </Fragment>
          );
        })}
      </div>
    </figure>
  );
}
