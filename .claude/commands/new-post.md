---
description: Review a finished project directory and draft a portfolio post about it
argument-hint: <absolute-path-to-project>
---

You are drafting a portfolio post about the project located at: **$1**

This blog is a minimalist academic-style portfolio. Posts go into
`src/content/projects/<slug>.mdx` and must match the Zod schema defined
in `src/content/config.ts`. Match the tone of any existing posts in that
directory. Keep writing tight — this is a portfolio, not a tutorial.

---

## Step 1 — Investigate the project

Read, in this order, whatever exists at `$1`:

1. `README.md` and `README_zh.md` (both if present — prefer English for post body, mine the Chinese for extra context)
2. `docs/design-notes.md`, `docs/resume-highlights.md`, any other `docs/*.md`
3. Manifest file(s) to extract real tech stack:
   - `package.json` → JS/TS deps (note framework: Next.js, React, etc.)
   - `pyproject.toml` / `requirements.txt` → Python deps
   - `Cargo.toml`, `go.mod`, `composer.json`, etc. as applicable
4. Recent commit history for a sense of what was actually built:
   `git -C "$1" log --oneline -30`
5. Screenshot/cover candidates under `$1/docs/`, `$1/assets/`, `$1/screenshots/`, or root-level images

Take notes on:
- The one-sentence problem the project solves
- The 3–6 technologies that actually matter (not every transitive dep)
- 1–2 non-obvious engineering decisions worth writing about
- A short illuminating code snippet or architecture detail, if any

## Step 2 — Confirm with user (use AskUserQuestion)

Ask only what you **cannot** determine from the files. Batch the
questions in a single AskUserQuestion call. Typical unknowns:

- **slug** — default to kebab-case of the project folder name; offer the default + let them override
- **status** — shipped / in-progress / archived
- **one-line summary** (≤200 chars) — propose one, let them edit/confirm
- **cover image** — if you found candidates, show paths; ask whether to copy one into `public/covers/<slug>.{png,jpg,webp}`
- **demo URL** — if not in README

Do not ask for info you already have (tech list, date, title).

## Step 3 — Draft `src/content/projects/<slug>.mdx`

Frontmatter **must** exactly match the schema:

```yaml
---
title: "..."
summary: "..."           # ≤200 chars, one line
date: YYYY-MM-DD         # first shipped or project-start date
updated: YYYY-MM-DD      # optional, today if meaningful
tech: ["FastAPI", "Next.js", "LangGraph"]
repo: "https://github.com/..."     # optional
demo: "https://..."                # optional
cover: "/covers/<slug>.webp"       # optional, only if copied
status: shipped          # shipped | in-progress | archived
draft: false
---
```

Body structure — use `##` for these sections in order:

1. **Problem** — one paragraph. Why does this exist? Who would use it?
2. **Approach** — architecture + key tech decisions. You may include
   **one** code block (≤20 lines) if it clarifies a non-trivial choice.
3. **What was tricky** — 1–2 honest, specific engineering problems
   solved. This is the memory the README cannot preserve.
4. **Outcome** — what it does now, any metrics, what's next.

Do not include a redundant "Links" section — `repo`/`demo` are rendered
by the layout. Do not include marketing copy or emojis. Use sentence
case for headings.

If you need to copy a cover image, use:
`cp "<source-path>" "D:/YingqianChen.github.io/public/covers/<slug>.<ext>"`
(create the `public/covers/` directory first if absent).

## Step 4 — Preview and iterate

Show the rendered draft to the user. Offer explicit next steps:
"ship / edit / regenerate". Do not proceed to Step 5 until the user
says something affirmative ("ship it", "lgtm", "push", etc.).

## Step 5 — Commit and push

Run from `D:/YingqianChen.github.io`:

```bash
git add src/content/projects/<slug>.mdx
# only if a cover was copied:
git add public/covers/<slug>.<ext>
git commit -m "post: <title>"
git push origin main
```

Then tell the user:
- the commit hash
- the GitHub Actions run URL (derive it from the remote URL + latest push)
- the eventual public URL: `https://yingqianchen.github.io/projects/<slug>/`

## Guardrails

- **Never** modify files outside `$1` (read-only) and this blog repo.
- **Never** use `git push --force` or `--no-verify`.
- If `npm run build` would fail (e.g. invalid frontmatter), fix the
  post rather than bypassing checks.
- If the user aborts at any step, leave the draft file in place (they
  can pick it up later) but do not commit it.
