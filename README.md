# yingqianchen.github.io

Personal portfolio site for Yingqian Chen. Minimalist academic aesthetic;
built with [Astro](https://astro.build) + Tailwind; deploys automatically
to GitHub Pages on push to `main`.

The old Hugo blog lives on the `legacy-hugo` branch.

## Local development

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # type-check + static build into dist/
```

## Writing a post

This repo ships with a Claude Code slash command that turns any finished
project directory into a portfolio post.

```bash
cd D:/YingqianChen.github.io
claude
> /new-post D:/RentWise
```

Claude will:

1. Read the project's `README.md`, `docs/`, manifest files, and recent
   git history
2. Ask for any missing bits (slug, status, summary)
3. Draft `src/content/projects/<slug>.mdx` matching the Zod schema in
   `src/content/config.ts`
4. Preview and iterate with you until you approve
5. Commit and push to `main` &mdash; GitHub Actions builds and deploys

See `.claude/commands/new-post.md` for the full prompt.

## Structure

```
src/
  content/
    config.ts               # Zod schema for project posts
    projects/*.mdx          # one file per post
  layouts/
    Base.astro              # <html>, nav, footer
    Project.astro           # post detail layout
  components/
    ProjectCard.astro       # list-row for index pages
    TechTag.astro           # small inline mono label
  pages/
    index.astro             # hero + recent posts
    projects/index.astro    # full archive
    projects/[...slug].astro
    about.astro
    rss.xml.ts
  styles/global.css         # Tailwind + typography
public/
  favicon.svg
  covers/                   # post cover images (optional)
```

## Frontmatter schema

```yaml
---
title: string
summary: string            # ≤200 chars, rendered as tagline
date: YYYY-MM-DD           # required
updated: YYYY-MM-DD        # optional
tech: [string]             # technology chips (e.g. ["FastAPI", "Next.js"])
repo: url                  # optional, rendered in header
demo: url                  # optional, rendered in header
cover: string              # optional, OG image + header
status: shipped | in-progress | archived   # default: shipped
draft: boolean             # default: false; true hides from lists
---
```

Any file failing the schema is caught at `npm run build` via
`astro check`, before deploy.

## License

MIT for code; all post content &copy; the author.
