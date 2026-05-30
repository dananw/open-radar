# OpenRadar

A hand-curated index of trending open-source projects, built with [Astro](https://astro.build).
The design is deliberately editorial — warm paper, ink, hairline rules, a single
vermilion signal colour, set in Fraunces (display) and JetBrains Mono (labels).

## Stack

- **Astro** — static site generation
- **Tailwind CSS v4** — styling (via `@tailwindcss/vite`)
- **React** — interactive search/filter island
- **Content Collections** — projects authored as Markdown in `src/content/projects`

## Project structure

```text
src/
├── components/      # Header, Footer, ProjectCard, TagBadge, SearchBar (React)
├── content/
│   └── projects/    # one Markdown file per project (frontmatter + write-up)
├── layouts/         # Layout.astro — <head>, SEO, fonts
├── pages/           # index, projects/[slug], tags/[tag], tags/index
└── styles/          # global.css — theme tokens + editorial helpers
```

## Adding a project

Create `src/content/projects/<slug>.md`:

```md
---
name: my-project
description: "One-sentence summary."
url: https://github.com/owner/repo
stars: 1200
forks: 80
language: TypeScript
tags: ["cli", "devtools"]
featured: false
publishedAt: 2025-01-01
---

## my-project

Long-form write-up in Markdown…
```

Required fields: `name`, `description`, `url`, `tags`, `publishedAt`.
Optional: `stars`, `forks`, `language`, `featured`. See `src/content.config.ts` for the schema.

## Commands

| Command           | Action                                       |
| :---------------- | :------------------------------------------- |
| `npm install`     | Install dependencies                         |
| `npm run dev`     | Start the dev server at `localhost:4321`     |
| `npm run build`   | Build the production site to `./dist/`       |
| `npm run preview` | Preview the production build locally         |
