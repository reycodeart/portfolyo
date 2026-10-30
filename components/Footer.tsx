"use client";

import { useLang } from "@/lib/i18n";
import { site } from "@/lib/content";

export function Footer() {
  const { u } = useLang();
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-8 text-sm text-ink-3 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p>© {new Date().getFullYear()} {site.name}</p>
        <p className="font-mono text-xs">
          {u("footer")} · {u("auditedOn")} {site.auditDate}
        </p>
      </div>
    </footer>
  );
}
