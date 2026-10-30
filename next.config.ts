import type { NextConfig } from "next";

// Static export: the whole site is plain HTML/JS, so it can be hosted for free
// on Vercel, GitHub Pages, Netlify or Cloudflare Pages. No server, no API keys.
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
