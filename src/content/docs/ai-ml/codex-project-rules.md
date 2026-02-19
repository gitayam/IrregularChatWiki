---
title: "Codex CLI Project Rules (Irregularpedia)"
description: "How to run OpenAI Codex CLI against the IrregularChat Wiki repo—critical commands, deployment flow, and battle-tested lessons learned."
---

# Codex CLI Project Rules — IrregularChat Wiki

These rules translate our existing [Project Rules & Lessons Learned](/ai-ml/project-rules-lessons-learned) plus the `CLAUDE.md` conventions into a **Codex CLI–friendly SOP**. Follow this anytime you open `codex` inside `IrregularChatWiki/` so the agent stays aligned with our infrastructure, deployment flow, and Cloudflare quirks.

---

## 1. Scope & Stack

- **Repo:** `IrregularChatWiki`
- **Live site:** <https://irregularpedia.org>
- **Stack:** Astro Starlight + Cloudflare Pages + Workers Functions + D1 + KV (`README.md`)
- **Content location:** Markdown/MDX inside `src/content/docs/…`
- **No repo-level `.env`:** Credentials live in Cloudflare (Wrangler secrets + dashboard); Codex must never create `.env` without human approval.

---

## 2. Codex session checklist

1. **Model choice:** Default to `gpt-5.3-codex` for repo work; fall back to `gpt-5.2-codex` only when asked for compatibility tests. (`/ai-ml/cli-ide-agent-pricing`)
2. **Authentication:** Prefer ChatGPT Plus/Pro auth (shares allowance with ChatGPT); API-key mode is pay-per-token—announce before switching.
3. **Workspace prep:** Run `git status -sb` and `npm install` (first run) to confirm dependencies.
4. **Never deploy automatically.** Only run `./deploy.sh` when the user explicitly requests a push to both remotes.

---

## 3. Critical rules (MUST READ)

| Area | Rule | Why |
|------|------|-----|
| **Build order** | Always `npm run build` first, then copy Worker functions into `dist/functions/` **before** any Pages deploy (see commands below). | Deploying the repo root serves the dev `index.html` and produces a blank site ([Project Rules](/ai-ml/project-rules-lessons-learned#cloudflare-workers--edge-first)). |
| **D1 schema** | Table names stay lowercase snake_case; never create PascalCase tables or references. | Foreign keys silently fail when mixing case (same outage as noted in [Project Rules](/ai-ml/project-rules-lessons-learned#cloudflare-workers--edge-first)). |
| **React/JS components** | Do not put parent callbacks inside `useEffect`; memoize derived arrays with `useMemo`. | Prevents React error #185 and render storms in shared components ([React lessons](/ai-ml/project-rules-lessons-learned#react--frontend-apps)). |
| **Routing** | Ensure `/public/_redirects` (SPA routing) preserves client routes when editing Pages configs. | Without it, CF Pages returns 404 HTML and the browser logs MIME errors ([Project Rules](/ai-ml/project-rules-lessons-learned#react--frontend-apps)). |
| **API fallbacks** | When touching weather or external APIs, keep the NWS → Open-Meteo → seasonal chain intact. | Prevents identical fallback data and bogus modifiers ([Project Rules](/ai-ml/project-rules-lessons-learned#cloudflare-workers--edge-first)). |

---

## 4. Repository map & commands

```bash
# dev server (hot reload on http://localhost:4321)
npm run dev

# production build
npm run build

# preview production build locally
npm run preview
```

- **Astro configuration:** `astro.config.mjs`
- **Workers Functions:** `functions/api/...`
- **Cloudflare config:** `wrangler.toml`
- **Content tags:** `tags.yml`
- **Custom components:** `src/components/`
- **In-page editor:** `public/edit.html`

_Source: `README.md` structure + commands_

---

## 5. Deployment workflow (manual)

`deploy.sh` is intentionally simple and **only pushes** the current branch to both remotes. Codex should describe this to the user before running it.

```bash
./deploy.sh
# 1. Reads current branch
# 2. git push origin <branch>
# 3. git push github <branch>
```

The actual Cloudflare Pages build runs after the push, so **verify locally** before invoking:

1. `npm run build`
2. `rsync -av --delete functions/ dist/functions/`
3. (Optional) `npx wrangler pages deploy dist --project-name=<project>` — run only when explicitly asked; default flow relies on CI.

---

## 6. Content authoring rules

| Topic | Rule |
|-------|------|
| Frontmatter | Always include `title`, `description`, and optional `tags` (see template in `README.md`). |
| Headings | Start documents with `# Title` matching frontmatter, then use sentence-case headings. |
| Callouts | Use Starlight syntax (`:::note[Title] … :::`). |
| Internal links | Use absolute `/section/page` paths to avoid broken links on the live site (recent issue on `/development/full-stack-development-with-ai/`). |
| Tags | Update `tags.yml` before referencing a new tag. |

For Codex-authored docs, add a short “Last reviewed” line if summarizing volatile vendor data (e.g., plan/pricing snapshots).

---

## 7. Testing & verification

- **Content:** `npm run build` must succeed with zero warnings; Astro fails builds on MDX errors.
- **Workers:** When editing anything under `functions/`, run targeted checks using Wrangler:

```bash
npx wrangler pages dev dist
# or
npx wrangler d1 execute <db> --local --command="SELECT COUNT(*) FROM users;"
```

- **API endpoints:** Use `curl -I https://irregularpedia.org` after deployment to confirm correct headers.

---

## 8. Issue playbooks (from Lessons Learned)

### 8.1 Mobile Safari clipboard + R2
- Don’t wrap clipboard writes in async gaps—pass Promises directly to `ClipboardItem`.
- Host critical images locally when Safari ignores R2 + CORS headers.

### 8.2 Weather planning regressions
- Keep fallback weights explicit; log which provider responded.
- Alert when all 7 days share identical modifiers (indicates fallback loop).

### 8.3 Infinite loops in shared components
- Never call setState + prop callbacks inside `useEffect`.
- Memoize computed props before passing to children.

See [React / Frontend Apps](/ai-ml/project-rules-lessons-learned#react--frontend-apps) for detailed examples and fixes.

---

## 9. Related resources

- [CLI + IDE Agents — Plan Pricing vs Usage Limits](/ai-ml/cli-ide-agent-pricing) — model availability, context notes, and plan allowances.
- [Claude Code Guide](/ai-ml/claude-code) — reference for how we structure CLAUDE.md; mirror the same discipline for Codex sessions.
- [Project Rules & Lessons Learned](/ai-ml/project-rules-lessons-learned) — authoritative incident log for this repo.

---

*Last reviewed: 2026-02-14 (Codex CLI instructions). Update whenever deploy flow, pricing, or Cloudflare guidance changes.*
