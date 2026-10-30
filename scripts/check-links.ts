// Checks every URL in /content.
//  - Public links: requested over the network, must answer 2xx/3xx.
//  - Private-repo links: not requested (they return 404 to anonymous visitors by design);
//    they are listed so you can open them while logged in.
//  - Internal routes (/projects/<slug>/): must exist in the static export (run `npm run build` first).
// Run: npm run check:links
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = join(__dirname, "..");

function collect(value: unknown, path: string, out: { url: string; private: boolean; where: string }[]) {
  if (Array.isArray(value)) value.forEach((v, i) => collect(v, `${path}[${i}]`, out));
  else if (value && typeof value === "object") {
    const obj = value as Record<string, unknown>;
    const priv = obj.private === true || (typeof obj.url === "string" && isPrivateRepo(obj.url));
    for (const [k, v] of Object.entries(obj)) {
      if (typeof v === "string" && /^https?:\/\//.test(v)) out.push({ url: v, private: priv || isPrivateRepo(v), where: `${path}.${k}` });
      else collect(v, `${path}.${k}`, out);
    }
  }
}

const privateRepos = new Set<string>();
function isPrivateRepo(url: string) {
  const m = url.match(/^https:\/\/github\.com\/[^/]+\/([^/]+)/);
  return !!m && privateRepos.has(m[1].toLowerCase());
}

async function check(url: string): Promise<number> {
  for (const method of ["HEAD", "GET"] as const) {
    try {
      const res = await fetch(url, { method, redirect: "follow", headers: { "user-agent": "portfolio-link-check" } });
      if (res.status < 400 || method === "GET") return res.status;
    } catch {
      if (method === "GET") return 0;
    }
  }
  return 0;
}

async function main() {
  const files = [
    ...readdirSync(join(root, "content")).filter((f) => f.endsWith(".json")).map((f) => join("content", f)),
    ...readdirSync(join(root, "content/projects")).filter((f) => f.endsWith(".json")).map((f) => join("content/projects", f)),
  ];

  // A project marked "private" makes every link into its repository private.
  for (const f of files.filter((f) => f.includes("projects/"))) {
    const p = JSON.parse(readFileSync(join(root, f), "utf8"));
    if (p.visibility === "private") privateRepos.add(String(p.repoUrl).split("/").pop()!.toLowerCase());
  }

  const links: { url: string; private: boolean; where: string }[] = [];
  for (const f of files) collect(JSON.parse(readFileSync(join(root, f), "utf8")), f, links);

  const unique = new Map<string, { private: boolean; where: string }>();
  for (const l of links) if (!unique.has(l.url)) unique.set(l.url, l);

  let failed = 0;
  const priv: string[] = [];
  for (const [url, meta] of unique) {
    if (meta.private) {
      priv.push(url);
      continue;
    }
    const status = await check(url);
    const ok = status >= 200 && status < 400;
    // LinkedIn blocks automated requests (999 or a dropped connection); check it by hand.
    const linkedin = url.includes("linkedin.com") && (status === 999 || status === 0);
    if (!ok && !linkedin) failed++;
    console.log(`${ok ? "ok  " : linkedin ? "skip" : "FAIL"} ${status} ${url}`);
  }

  const out = join(root, "out");
  if (existsSync(out)) {
    const slugs = readdirSync(join(root, "content/projects")).filter((f) => f.endsWith(".json")).map((f) => f.replace(".json", ""));
    for (const s of slugs) {
      const page = join(out, "projects", s, "index.html");
      const ok = existsSync(page);
      if (!ok) failed++;
      console.log(`${ok ? "ok  " : "FAIL"} route /projects/${s}/`);
    }
  } else {
    console.log("note: out/ not found, run `npm run build` to also check internal routes");
  }

  console.log(`\n${priv.length} private-repo links not requested (need GitHub access):`);
  priv.forEach((u) => console.log(`  ${u}`));
  console.log(failed ? `\n${failed} broken link(s)` : "\nAll public links and routes OK");
  process.exit(failed ? 1 : 0);
}

main();
