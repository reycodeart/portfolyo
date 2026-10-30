import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/lib/i18n";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { site } from "@/lib/content";

const inter = Inter({ subsets: ["latin", "latin-ext"], variable: "--font-inter", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin", "latin-ext"], variable: "--font-mono-face", display: "swap" });

export const metadata: Metadata = {
  title: { default: `${site.name} — Engineering Portfolio`, template: `%s · ${site.name}` },
  description: site.intro.en,
  openGraph: { title: `${site.name} — Engineering Portfolio`, description: site.intro.en, type: "website" },
};

export const viewport: Viewport = { themeColor: "#070b16" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" className={`${inter.variable} ${mono.variable}`}>
      <body className="min-h-screen">
        <LanguageProvider>
          <Nav />
          <main>{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
