"use client";

import Link from "next/link";
import { BadgeCheck, Cpu, MessageSquareCode, Repeat2, Sprout, Target } from "lucide-react";
import clsx from "clsx";
import { useLang } from "@/lib/i18n";
import { aiEngineering as ai, projectTitle } from "@/lib/content";
import type { AiEngineeringT, Localized } from "@/lib/schema";
import { Card, Reveal, Section } from "./ui";

type Item = AiEngineeringT["demonstrated"][number];

export function AiEngineering() {
  const { t, u } = useLang();
  return (
    <Section id="ai-engineering" eyebrow="02" title={u("aiTitle")} intro={t(ai.intro)}>
      <Reveal>
        <Card className="border-accent/30 bg-gradient-to-br from-surface to-surface-2">
          <h3 className="flex items-center gap-2 text-lg font-semibold text-ink">
            <Repeat2 className="h-5 w-5 text-accent-2" aria-hidden />
            {t(ai.agentDistinction.title)}
          </h3>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <div className="rounded-lg border border-line bg-bg/40 p-4">
              <p className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-accent">
                <Cpu className="h-4 w-4" aria-hidden /> DQN / RL agent
              </p>
              <p className="mt-2 text-sm leading-relaxed text-ink-2">{t(ai.agentDistinction.rl)}</p>
            </div>
            <div className="rounded-lg border border-line bg-bg/40 p-4">
              <p className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-accent-2">
                <MessageSquareCode className="h-4 w-4" aria-hidden /> LLM workflow agent
              </p>
              <p className="mt-2 text-sm leading-relaxed text-ink-2">{t(ai.agentDistinction.llm)}</p>
            </div>
          </div>
          <p className="mt-4 text-sm text-ink">{t(ai.agentDistinction.takeaway)}</p>
        </Card>
      </Reveal>

      <div className="mt-8 grid gap-5 lg:grid-cols-3">
        <Column
          icon={<BadgeCheck className="h-5 w-5" aria-hidden />}
          title={u("demonstrated")}
          sub={u("demonstratedSub")}
          items={ai.demonstrated}
          tone="ok"
        />
        <Column
          icon={<Target className="h-5 w-5" aria-hidden />}
          title={u("transferable")}
          sub={u("transferableSub")}
          items={ai.transferable}
          tone="accent"
        />
        <Column
          icon={<Sprout className="h-5 w-5" aria-hidden />}
          title={u("developing")}
          sub={u("developingSub")}
          items={ai.developing}
          tone="warn"
        />
      </div>

      <Reveal className="mt-8">
        <Card>
          <h3 className="font-semibold text-ink">{u("contributionTitle")}</h3>
          <ul className="mt-3 grid gap-2 sm:grid-cols-2">
            {ai.contributionAreas.map((c: Localized, i) => (
              <li key={i} className="flex gap-2 text-sm text-ink-2">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-2" aria-hidden />
                {t(c)}
              </li>
            ))}
          </ul>
        </Card>
      </Reveal>
    </Section>
  );
}

function Column({
  icon,
  title,
  sub,
  items,
  tone,
}: {
  icon: React.ReactNode;
  title: string;
  sub: string;
  items: Item[];
  tone: "ok" | "accent" | "warn";
}) {
  const { t, u } = useLang();
  const toneCls = { ok: "text-ok border-ok/30", accent: "text-accent border-accent/30", warn: "text-warn border-warn/30" }[tone];
  return (
    <Reveal>
      <div className={clsx("h-full rounded-xl border bg-surface/80 p-5", toneCls.split(" ")[1])}>
        <h3 className={clsx("flex items-center gap-2 font-semibold", toneCls.split(" ")[0])}>
          {icon}
          {title}
        </h3>
        <p className="mt-1 text-xs text-ink-3">{sub}</p>
        <ul className="mt-4 space-y-2">
          {items.map((it, i) => (
            <li key={i}>
              <details className="group rounded-lg border border-line bg-bg/30 px-3 py-2 open:bg-bg/50">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-2 text-sm text-ink">
                  {t(it.title)}
                  <span className="font-mono text-ink-3 transition-transform group-open:rotate-45" aria-hidden>
                    +
                  </span>
                </summary>
                <p className="mt-2 text-sm leading-relaxed text-ink-2">{t(it.detail)}</p>
                {it.projects.length > 0 && (
                  <p className="mt-2 text-xs text-ink-3">
                    {u("seeIn")}{" "}
                    {it.projects.map((slug, j) => (
                      <span key={slug}>
                        {j > 0 && ", "}
                        <Link href={`/projects/${slug}/`} className="text-accent-2 hover:underline">
                          {projectTitle(slug)}
                        </Link>
                      </span>
                    ))}
                  </p>
                )}
              </details>
            </li>
          ))}
        </ul>
      </div>
    </Reveal>
  );
}
