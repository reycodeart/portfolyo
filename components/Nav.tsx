"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Languages, Menu, X } from "lucide-react";
import clsx from "clsx";
import { useLang } from "@/lib/i18n";
import type { UiKey } from "@/lib/ui-strings";

const items: { id: string; key: UiKey }[] = [
  { id: "projects", key: "navProjects" },
  { id: "ai-engineering", key: "navAi" },
  { id: "workflow", key: "navWorkflow" },
  { id: "skills", key: "navSkills" },
  { id: "evidence", key: "navEvidence" },
  { id: "experience", key: "navExperience" },
  { id: "contact", key: "navContact" },
];

export function Nav() {
  const { lang, setLang, u } = useLang();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Section links work from the case study pages too.
  const href = (id: string) => `/#${id}`;

  const LangButton = (
    <button
      type="button"
      onClick={() => setLang(lang === "tr" ? "en" : "tr")}
      className="inline-flex items-center gap-1.5 rounded-lg border border-line-strong px-2.5 py-1.5 font-mono text-xs text-ink-2 transition-colors hover:border-accent/60 hover:text-ink"
      aria-label={u("switchLang")}
      title={u("switchLang")}
    >
      <Languages className="h-3.5 w-3.5" aria-hidden />
      <span className={clsx(lang === "tr" && "text-ink")}>TR</span>
      <span className="text-ink-3">/</span>
      <span className={clsx(lang === "en" && "text-ink")}>EN</span>
    </button>
  );

  return (
    <header
      className={clsx(
        "sticky top-0 z-50 border-b transition-colors",
        scrolled || open ? "border-line bg-bg/85 backdrop-blur-md" : "border-transparent bg-transparent",
      )}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6" aria-label="Main">
        <Link href="/" className="font-mono text-sm font-semibold tracking-tight text-ink">
          reyhan<span className="text-accent-2">.</span>keskin
        </Link>
        <div className="hidden items-center gap-1 lg:flex">
          {items.map((i) => (
            <Link key={i.id} href={href(i.id)} className="rounded-md px-3 py-2 text-sm text-ink-2 transition-colors hover:text-ink">
              {u(i.key)}
            </Link>
          ))}
          <div className="ml-2">{LangButton}</div>
        </div>
        <div className="flex items-center gap-2 lg:hidden">
          {LangButton}
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            className="rounded-lg border border-line-strong p-2 text-ink-2"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={u("menu")}
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </nav>
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-line lg:hidden"
          >
            <div className="mx-auto flex max-w-6xl flex-col px-4 py-2 sm:px-6">
              {items.map((i) => (
                <Link
                  key={i.id}
                  href={href(i.id)}
                  onClick={() => setOpen(false)}
                  className="rounded-md px-2 py-3 text-ink-2 hover:text-ink"
                >
                  {u(i.key)}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
