# Reyhan Keskin — Interactive Engineering Portfolio

A bilingual (Turkish default / English) engineering portfolio. Every claim links to a GitHub file, PR,
CI run or a result re-run during the repository audit. See [`docs/REPOSITORY_AUDIT.md`](docs/REPOSITORY_AUDIT.md)
for the evidence table behind each number.

- **Stack:** Next.js 15 (static export), TypeScript, Tailwind CSS 4, Motion, Lucide icons, Zod.
- **Hosting:** plain static files in `out/`. Free on Vercel, GitHub Pages, Netlify or Cloudflare Pages.
- **No API keys and no paid AI calls.** The Evidence Explorer runs on static, verified data.

## Pages and features

| Route | Content |
|---|---|
| `/` | Hero, project grid (category + technology filters), AI Engineering & Agents, interactive development workflow, skills, Engineering Evidence Explorer, experience timeline, contact |
| `/projects/<slug>/` | Case study: Problem, Technical Approach, Architecture (clickable diagram), Implementation, My Contribution, Testing & Validation, Results, Current Limitations, Evidence |

Language toggle (TR/EN) is in the header; the choice is remembered in the browser.

## Local development

Requires Node.js 20 or newer.

```bash
npm install
```

```bash
npm run dev
```

Open http://localhost:3000.

## Checks

```bash
npm test
```

runs `validate:content` (schema check of every content file), `typecheck` and `lint`.

```bash
npm run build
```

builds the static site into `out/`.

```bash
npm run check:links
```

requests every public link in `content/` and checks every project route in `out/`. Links into private
repositories are listed but not requested (they return 404 to anonymous visitors by design).

## Editing content

You don't need to touch React code to change the text.

| File | What it holds |
|---|---|
| `content/site.json` | Name, headline, intro, statement, links, CV path, interests |
| `content/projects/<slug>.json` | One file per project: card + full case study |
| `content/projects/index.ts` | List of project files (add one line per new project) |
| `content/diagrams.json` | Architecture diagrams (layers of clickable nodes) |
| `content/ai-engineering.json` | Demonstrated / Transferable / Developing lists |
| `content/workflow.json` | Development workflow stages and their PR/CI evidence |
| `content/skills.json` | "Without AI" and "AI-assisted" skills with evidence links |
| `content/evidence.json` | Evidence Explorer groups |
| `content/experience.json` | Timeline |
| `lib/ui-strings.ts` | Fixed interface labels (buttons, headings) |

Every text field is `{ "tr": "...", "en": "..." }`. The schema in `lib/schema.ts` is enforced at build
time, so a missing translation or a typo in a field name fails `npm run build` with the file and field
name.

Useful fields:

- `status`: `completed` · `ongoing` · `prototype` · `archived`
- `visibility`: `public` · `private` (private links get a lock icon and an "access on request" note)
- `authorship.mode`: `own-code` · `ai-assisted` · `mixed`
- `results.items[].verification`: `reproduced` · `ci-log` · `repo-file` · `self-reported`

**Add a CV:** put the PDF at `public/cv/Reyhan-Keskin-CV.pdf` and set
`"cvPath": "/cv/Reyhan-Keskin-CV.pdf"` in `content/site.json`. Until then the CV button points to LinkedIn.

**Add a project:** copy an existing file in `content/projects/`, change `slug` (must match the file
name), add it to `content/projects/index.ts`, run `npm test`.

## Deploying to Vercel (free Hobby plan)

1. Push this repository to GitHub (it is already `reycodeart/portfolyo`).
2. Go to https://vercel.com/new and sign in with GitHub.
3. Import `reycodeart/portfolyo`. Vercel detects **Next.js**; keep the defaults:
   - Build command: `next build`
   - Output: handled automatically (`output: "export"` in `next.config.ts`)
   - No environment variables are needed.
4. Click **Deploy**. You get a `*.vercel.app` URL in about a minute.
5. Optional: Project → Settings → Domains to add your own domain.
6. Every push to the production branch redeploys; pull requests get preview URLs.

### Alternative: GitHub Pages

The build is fully static, so `out/` can be served from GitHub Pages. If the site is served from
`https://reycodeart.github.io/portfolyo/` (a sub-path), add `basePath: "/portfolyo"` to
`next.config.ts` first. A custom domain or a `reycodeart.github.io` repository needs no `basePath`.

## Before sharing the link

Go through §5 of [`docs/REPOSITORY_AUDIT.md`](docs/REPOSITORY_AUDIT.md): confirm authorship labels, the
TLS project status, add the CV file, and decide whether to grant the reviewer read access to the private
repositories (Cursed Couriers, TLS C2 Detection, Cerberion). Without access, those links show GitHub's 404.
