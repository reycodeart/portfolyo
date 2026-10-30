"use client";

import { Bot, Code2 } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { skills } from "@/lib/content";
import type { SkillsT } from "@/lib/schema";
import { EvidenceLink, Reveal, Section } from "./ui";

export function Skills() {
  const { t, u } = useLang();
  return (
    <Section id="skills" eyebrow="04" title={u("skillsTitle")} intro={t(skills.note)}>
      <div className="grid gap-6 lg:grid-cols-2">
        <SkillColumn icon={<Code2 className="h-5 w-5 text-accent" aria-hidden />} title={u("withoutAi")} sub={u("withoutAiSub")} items={skills.withoutAi} />
        <SkillColumn icon={<Bot className="h-5 w-5 text-accent-2" aria-hidden />} title={u("aiAssisted")} sub={u("aiAssistedSub")} items={skills.aiAssisted} />
      </div>
    </Section>
  );
}

function SkillColumn({
  icon,
  title,
  sub,
  items,
}: {
  icon: React.ReactNode;
  title: string;
  sub: string;
  items: SkillsT["withoutAi"];
}) {
  const { t } = useLang();
  return (
    <Reveal>
      <div className="rounded-xl border border-line bg-surface/80 p-5">
        <h3 className="flex items-center gap-2 text-lg font-semibold text-ink">
          {icon}
          {title}
        </h3>
        <p className="mt-1 text-xs text-ink-3">{sub}</p>
        <ul className="mt-5 divide-y divide-line">
          {items.map((s, i) => (
            <li key={i} className="py-3">
              <p className="font-medium text-ink">{t(s.name)}</p>
              <p className="mt-1 text-sm text-ink-2">{t(s.detail)}</p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {s.evidence.map((e) => (
                  <EvidenceLink key={e.url} link={e} compact />
                ))}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Reveal>
  );
}
