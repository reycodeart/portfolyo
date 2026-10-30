"use client";

import { motion, useReducedMotion } from "motion/react";
import clsx from "clsx";
import {
  ArrowUpRight,
  CheckCircle2,
  CircleDashed,
  FileCode2,
  FileText,
  FlaskConical,
  GitCommitHorizontal,
  GitPullRequest,
  Github,
  Globe,
  Lock,
  PlayCircle,
  Database,
  Hourglass,
} from "lucide-react";
import type { ReactNode } from "react";
import { useLang } from "@/lib/i18n";
import type { EvidenceLinkT, ProjectStatusT, VerificationT, ProjectT } from "@/lib/schema";
import type { UiKey } from "@/lib/ui-strings";

export function Reveal({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.45, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  );
}

export function Section({
  id,
  eyebrow,
  title,
  intro,
  children,
  className,
}: {
  id: string;
  eyebrow?: string;
  title: string;
  intro?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={clsx("mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24", className)}>
      <Reveal>
        {eyebrow && <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-accent-2">{eyebrow}</p>}
        <h2 className="text-2xl font-semibold tracking-tight text-ink sm:text-3xl">{title}</h2>
        {intro && <p className="mt-3 max-w-3xl text-ink-2">{intro}</p>}
      </Reveal>
      <div className="mt-10">{children}</div>
    </section>
  );
}

export function Card({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={clsx("rounded-xl border border-line bg-surface/80 p-5 shadow-[0_1px_0_0_rgb(255_255_255/0.03)_inset]", className)}>
      {children}
    </div>
  );
}

export function Tag({ children, active, onClick }: { children: ReactNode; active?: boolean; onClick?: () => void }) {
  const cls = clsx(
    "inline-flex items-center rounded-md border px-2 py-0.5 font-mono text-[11px] leading-5 transition-colors",
    active
      ? "border-accent/60 bg-accent/15 text-ink"
      : "border-line bg-surface-2/60 text-ink-2",
    onClick && "cursor-pointer hover:border-line-strong hover:text-ink",
  );
  if (onClick)
    return (
      <button type="button" className={cls} onClick={onClick} aria-pressed={active}>
        {children}
      </button>
    );
  return <span className={cls}>{children}</span>;
}

const statusStyle: Record<ProjectStatusT, string> = {
  completed: "border-ok/40 bg-ok/10 text-ok",
  ongoing: "border-accent-2/40 bg-accent-2/10 text-accent-2",
  prototype: "border-warn/40 bg-warn/10 text-warn",
  archived: "border-line-strong bg-surface-2 text-muted",
};

export function StatusBadge({ status }: { status: ProjectStatusT }) {
  const { u } = useLang();
  const Icon = status === "completed" ? CheckCircle2 : status === "ongoing" ? Hourglass : CircleDashed;
  return (
    <span className={clsx("inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-medium", statusStyle[status])}>
      <Icon className="h-3 w-3" aria-hidden />
      {u(`status_${status}` as UiKey)}
    </span>
  );
}

export function VisibilityBadge({ visibility, short }: { visibility: ProjectT["visibility"]; short?: boolean }) {
  const { u } = useLang();
  const priv = visibility === "private";
  return (
    <span
      className={clsx(
        "inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs",
        priv ? "border-line-strong text-ink-2" : "border-line text-ink-3",
      )}
    >
      {priv ? <Lock className="h-3 w-3" aria-hidden /> : <Globe className="h-3 w-3" aria-hidden />}
      {priv ? (short ? u("privateShort") : u("private")) : u("public")}
    </span>
  );
}

export function AuthorshipBadge({ mode }: { mode: ProjectT["authorship"]["mode"] }) {
  const { u } = useLang();
  const key = `auth_${mode.replace("-", "_")}` as UiKey;
  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-full border px-2 py-0.5 text-xs",
        mode === "own-code" ? "border-accent/40 text-accent" : "border-accent-2/40 text-accent-2",
      )}
    >
      {u(key)}
    </span>
  );
}

const verStyle: Record<VerificationT, string> = {
  reproduced: "text-ok border-ok/40",
  "ci-log": "text-ok border-ok/40",
  "repo-file": "text-accent border-accent/40",
  "self-reported": "text-warn border-warn/40",
};

export function VerificationBadge({ v }: { v: VerificationT }) {
  const { u } = useLang();
  return (
    <span className={clsx("inline-flex rounded border px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wide", verStyle[v])}>
      {u(`ver_${v.replace("-", "_")}` as UiKey)}
    </span>
  );
}

const kindIcon = {
  repo: Github,
  file: FileCode2,
  commit: GitCommitHorizontal,
  pr: GitPullRequest,
  ci: PlayCircle,
  doc: FileText,
  test: FlaskConical,
  data: Database,
} as const;

export function EvidenceLink({ link, compact }: { link: EvidenceLinkT; compact?: boolean }) {
  const { t, u } = useLang();
  const Icon = kindIcon[link.kind];
  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className={clsx(
        "group inline-flex items-center gap-2 rounded-lg border border-line bg-surface-2/50 text-sm text-ink-2 transition-colors hover:border-accent/50 hover:text-ink",
        compact ? "px-2 py-1" : "px-3 py-2",
      )}
      title={link.private ? u("privateLinkNote") : undefined}
    >
      <Icon className="h-4 w-4 shrink-0 text-accent-2" aria-hidden />
      <span className="min-w-0 truncate">{t(link.label)}</span>
      {link.private && <Lock className="h-3.5 w-3.5 shrink-0 text-ink-3" aria-label={u("privateShort")} />}
      <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-ink-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
    </a>
  );
}

export function ButtonLink({
  href,
  children,
  variant = "secondary",
  external,
  download,
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
  external?: boolean;
  download?: boolean;
}) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      download={download || undefined}
      className={clsx(
        "inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors",
        variant === "primary"
          ? "bg-accent text-white hover:bg-accent/90"
          : "border border-line-strong bg-surface-2/60 text-ink hover:border-accent/60",
      )}
    >
      {children}
    </a>
  );
}
