"use client";

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import type { Localized } from "./schema";
import { ui, type UiKey } from "./ui-strings";

export type Lang = "tr" | "en";
const STORAGE_KEY = "rk-lang";

type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  /** Picks the current language from a content string. */
  t: (s: Localized) => string;
  /** Looks up a fixed interface label. */
  u: (key: UiKey) => string;
};

const LangContext = createContext<Ctx | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  // Turkish is the default; the static HTML is rendered in Turkish.
  const [lang, setLangState] = useState<Lang>("tr");

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === "en" || saved === "tr") setLangState(saved);
    } catch {
      // Storage can be unavailable (private mode); keep the default.
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem(STORAGE_KEY, l);
    } catch {
      // ignore
    }
  }, []);

  const t = useCallback((s: Localized) => s[lang], [lang]);
  const u = useCallback((key: UiKey) => ui[key][lang], [lang]);

  return <LangContext.Provider value={{ lang, setLang, t, u }}>{children}</LangContext.Provider>;
}

export function useLang(): Ctx {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used inside LanguageProvider");
  return ctx;
}
