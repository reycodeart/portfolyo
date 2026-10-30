"use client";

import { Briefcase, GraduationCap, Linkedin, Github, FileDown } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { experience, site } from "@/lib/content";
import { ButtonLink, Reveal, Section } from "./ui";

export function Experience() {
  const { t, u } = useLang();
  return (
    <Section id="experience" eyebrow="06" title={u("experienceTitle")}>
      <ol className="relative ml-3 border-l border-line">
        {experience.map((e, i) => {
          const Icon = e.kind === "education" ? GraduationCap : Briefcase;
          return (
            <li key={i} className="relative mb-8 ml-6 last:mb-0">
              <Reveal delay={i * 0.04}>
                <span className="absolute -left-9 top-0 flex h-6 w-6 items-center justify-center rounded-full border border-line-strong bg-surface">
                  <Icon className="h-3.5 w-3.5 text-accent-2" aria-hidden />
                </span>
                <p className="font-mono text-xs text-ink-3">
                  {e.period} · {e.kind === "education" ? u("education") : u("work")}
                </p>
                <h3 className="mt-1 font-semibold text-ink">{t(e.role)}</h3>
                <p className="text-sm text-ink-2">{e.org}</p>
                {e.points.length > 0 && (
                  <ul className="mt-2 space-y-1">
                    {e.points.map((pt, j) => (
                      <li key={j} className="text-sm text-ink-2">
                        – {t(pt)}
                      </li>
                    ))}
                  </ul>
                )}
              </Reveal>
            </li>
          );
        })}
      </ol>
    </Section>
  );
}

export function Contact() {
  const { u } = useLang();
  return (
    <Section id="contact" eyebrow="07" title={u("contactTitle")} intro={u("contactText")}>
      <div className="flex flex-wrap gap-3">
        <ButtonLink href={site.links.linkedin} external variant="primary">
          <Linkedin className="h-4 w-4" aria-hidden />
          LinkedIn
        </ButtonLink>
        <ButtonLink href={site.links.github} external>
          <Github className="h-4 w-4" aria-hidden />
          GitHub
        </ButtonLink>
        {site.cvPath ? (
          <ButtonLink href={site.cvPath} download>
            <FileDown className="h-4 w-4" aria-hidden />
            {u("ctaCv")}
          </ButtonLink>
        ) : (
          <ButtonLink href={site.links.linkedin} external>
            <FileDown className="h-4 w-4" aria-hidden />
            {u("cvOnRequest")}
          </ButtonLink>
        )}
      </div>
    </Section>
  );
}
