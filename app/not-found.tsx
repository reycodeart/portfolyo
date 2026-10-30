"use client";

import Link from "next/link";
import { useLang } from "@/lib/i18n";

export default function NotFound() {
  const { u } = useLang();
  return (
    <div className="mx-auto max-w-3xl px-4 py-32 text-center sm:px-6">
      <p className="font-mono text-sm text-accent-2">404</p>
      <p className="mt-2 text-ink-2">{u("notFound")}</p>
      <Link href="/" className="mt-6 inline-block text-accent hover:underline">
        ← reyhan.keskin
      </Link>
    </div>
  );
}
