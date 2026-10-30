"use client";

import { motion, useReducedMotion } from "motion/react";
import { ArrowDown, Bot, FileDown, Github, ShieldCheck } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { site, projects } from "@/lib/content";
import { ButtonLink } from "./ui";

export function Hero() {
  const { t, u } = useLang();
  const reduce = useReducedMotion();
  const fade = (delay: number) =>
    reduce ? {} : { initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5, delay } };

  const publicCount = projects.filter((p) => p.visibility === "public").length;
  const ongoing = projects.filter((p) => p.status === "ongoing").length;

  return (
    <section className="relative overflow-hidden">
      <div className="bg-grid pointer-events-none absolute inset-0" aria-hidden />
      <div
        className="pointer-events-none absolute -top-40 left-1/2 h-80 w-[40rem] -translate-x-1/2 rounded-full bg-accent/15 blur-3xl"
        aria-hidden
      />
      <div className="relative mx-auto max-w-6xl px-4 pb-20 pt-16 sm:px-6 sm:pt-24">
        <motion.p {...fade(0)} className="font-mono text-xs uppercase tracking-[0.2em] text-accent-2">
          {t(site.tagline)}
        </motion.p>
        <motion.h1 {...fade(0.05)} className="mt-4 text-4xl font-semibold tracking-tight text-ink sm:text-6xl">
          {site.name}
        </motion.h1>
        <motion.p {...fade(0.1)} className="mt-4 text-lg text-ink-2 sm:text-xl">
          {site.headline}
        </motion.p>
        <motion.p {...fade(0.15)} className="mt-6 max-w-3xl leading-relaxed text-ink-2">
          {t(site.intro)}
        </motion.p>

        <motion.ul {...fade(0.18)} className="mt-6 flex max-w-3xl flex-wrap gap-1.5" aria-label="Interests">
          {site.interests.map((i) => (
            <li key={i.en} className="rounded-md border border-line bg-surface-2/60 px-2 py-0.5 text-xs text-ink-2">
              {t(i)}
            </li>
          ))}
        </motion.ul>

        <motion.blockquote
          {...fade(0.2)}
          className="mt-8 max-w-3xl border-l-2 border-accent-2/70 pl-4 text-ink"
        >
          <p className="leading-relaxed">“{t(site.statement)}”</p>
          <footer className="mt-2 flex items-start gap-2 text-sm text-ink-3">
            <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-ok" aria-hidden />
            <span>{t(site.statementNote)}</span>
          </footer>
        </motion.blockquote>

        <motion.div {...fade(0.25)} className="mt-10 flex flex-wrap gap-3">
          <ButtonLink href="#projects" variant="primary">
            <ArrowDown className="h-4 w-4" aria-hidden />
            {u("ctaProjects")}
          </ButtonLink>
          <ButtonLink href="#ai-engineering">
            <Bot className="h-4 w-4" aria-hidden />
            {u("ctaAi")}
          </ButtonLink>
          <ButtonLink href={site.links.github} external>
            <Github className="h-4 w-4" aria-hidden />
            {u("ctaGithub")}
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
        </motion.div>

        <motion.dl {...fade(0.3)} className="mt-12 grid max-w-2xl grid-cols-3 gap-4 border-t border-line pt-6 font-mono text-sm">
          <div>
            <dt className="text-ink-3">{u("navProjects")}</dt>
            <dd className="mt-1 text-ink">{projects.length}</dd>
          </div>
          <div>
            <dt className="text-ink-3">{u("public")}</dt>
            <dd className="mt-1 text-ink">{publicCount}</dd>
          </div>
          <div>
            <dt className="text-ink-3">{u("status_ongoing")}</dt>
            <dd className="mt-1 text-ink">{ongoing}</dd>
          </div>
        </motion.dl>
      </div>
    </section>
  );
}
