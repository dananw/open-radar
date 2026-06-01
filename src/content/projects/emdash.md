---
name: emdash
description: "EmDash is a full-stack TypeScript CMS built on Astro and Cloudflare — a modern WordPress alternative with sandboxed plugins and AI agent support."
url: https://github.com/emdash-cms/emdash
stars: 10707
forks: 965
language: TypeScript
tags: ["cms", "astro", "typescript", "cloudflare", "wordpress-alternative"]
featured: false
publishedAt: 2026-05-31
---

## EmDash

### Overview

EmDash is a full-stack TypeScript CMS built on Astro and Cloudflare. It hit 10,000 GitHub stars within two months of its April 2026 launch, which tells you something about the appetite for a real WordPress alternative in the modern stack.

The project is created by Matt Kane, an Astro core maintainer who previously worked at Netlify and Gatsby and created the popular Unpic image library. He now works at Cloudflare. That pedigree matters — this isn't a side project from someone who just discovered React. It's built by someone who's been deep in the web framework ecosystem for years and understands where the pain points are.

The pitch is straightforward: WordPress won because of extensibility and admin UX, but its architecture is stuck in the PHP era. 96% of WordPress security vulnerabilities come from plugins, according to Patchstack's 2024 report. EmDash takes the ideas that made WordPress dominant and rebuilds them on serverless, type-safe foundations. Your content lives in real SQL tables with typed columns. Plugins run in sandboxed Worker isolates with declared capability manifests. And it's all TypeScript — no PHP, no separate hosting tier.

### Why it matters

The CMS space hasn't had a serious architectural shakeup in over a decade. WordPress still powers roughly 40% of the web, but developers have been stringing together headless CMS solutions (Strapi, Payload, Sanity) with frontend frameworks for years, creating complexity that feels disproportionate to the problem. EmDash tries to collapse that stack.

What makes this different from yet another headless CMS is the Astro integration angle. EmDash is an Astro integration, not a standalone server. Add it to your config and you get a complete CMS — admin panel, REST API, authentication, media library, plugin system — that runs as part of your Astro site. It uses Cloudflare's D1 database and R2 storage by default, but has portable abstractions for SQLite, PostgreSQL, Turso, AWS S3, and local files. You're not locked in.

The timing connects to a broader trend: AI agents are increasingly managing content, and existing CMS platforms weren't designed for that. EmDash ships with agent skills, a CLI for programmatic site management, and a built-in MCP server so AI tools can interact with your site directly. That forward-looking design is what's driving developer interest.

### Key Features

**Sandboxed Plugin Architecture.** WordPress plugins have full access to the database, filesystem, and user data. A single vulnerable plugin compromises everything. EmDash plugins run in isolated Worker sandboxes via Dynamic Worker Loaders, each with a declared capability manifest. A plugin requesting `read:content` and `email:send` can do exactly that — nothing else. This is the most important architectural decision in the project.

**Structured Content with Portable Text.** WordPress stores rich text as HTML with metadata embedded in comments, tying content to its DOM representation. EmDash uses Portable Text, a structured JSON format that decouples content from presentation. Your content renders as a web page, mobile app, email, or API response without parsing HTML.

**Visual Schema Builder.** Content types are defined in the database, not in code. Non-developers create and modify collections through the admin UI. Each collection gets a real SQL table with typed columns. Developers then generate TypeScript types from the live schema with `npx emdash types` — so your types are always in sync with your content model.

**Passkey-First Authentication.** The auth system defaults to WebAuthn passkeys with OAuth and magic link fallbacks. Role-based access control supports Administrator, Editor, Author, and Contributor roles out of the box. No need to bolt on an auth provider for basic CMS use cases.

**AI Agent Integration.** The built-in MCP server lets Claude, ChatGPT, and other AI tools interact with your site directly. There's a CLI for programmatic content and schema management, plus skill files for AI-assisted plugin and theme development. This feels like where CMS platforms need to go.

**WordPress Migration Path.** Import posts, pages, media, and taxonomies from WXR exports, the WordPress REST API, or WordPress.com. Agent skills help port plugins and themes. The migration story is realistic, not aspirational.

### Use Cases

- **Blog or publication sites** that need a WordPress-like editing experience without the PHP runtime and plugin security headaches. The Blog template includes categories, tags, full-text search, RSS, and dark/light mode.
- **Marketing and landing pages** built on the Marketing template with hero sections, pricing cards, FAQ, and contact forms. Astro's island architecture means the pages ship as static HTML with minimal JavaScript.
- **Portfolio sites** for designers and creatives who want project grids with tag filtering and case study pages.
- **Content-heavy sites managed by non-technical teams** — the visual schema builder and admin UI mean editors can create content types without touching code.
- **Agent-managed content pipelines** where AI tools need to read, create, and modify content programmatically via the MCP server.

### Pros and Cons

Pros:
- Sandboxed plugins solve WordPress's biggest security problem in a principled way, with capability manifests enforced at the infrastructure level.
- The Astro integration model means you're building a real site, not fighting a headless CMS's preview and routing limitations.
- Portable platform abstractions (Kysely for SQL, S3 API for storage) avoid vendor lock-in despite the Cloudflare-first defaults.
- Active development with 299 commits from the lead maintainer in the first two months, plus rapid community growth.

Cons:
- Beta status means breaking changes are likely. 173 open issues as of late May 2026 suggest the API surface is still settling.
- Cloudflare Dynamic Workers (required for sandboxed plugins) are only available on paid accounts starting at $5/month. Safe mode runs plugins in-process, but that defeats the security argument.
- No built-in visual page builder like WordPress's Gutenberg. The editing experience is structured content with TipTap, not drag-and-drop layout.

### Getting Started

```bash
# Create a new EmDash project
npm create emdash@latest

# Or clone and run the demo locally (Node.js + SQLite, no Cloudflare needed)
git clone https://github.com/emdash-cms/emdash.git
cd emdash
pnpm install
pnpm build
pnpm --filter emdash-demo seed
pnpm --filter emdash-demo dev
```

Open the admin at http://localhost:4321/_emdash/admin. Generate TypeScript types from your content schema:

```bash
npx emdash types
```

Deploy to Cloudflare with one command, or use the "Deploy to Cloudflare" button in the repo.

### Alternatives

**Payload CMS** — Another TypeScript CMS that's more mature (v3 stable) and supports both REST and GraphQL APIs. Payload is more flexible in database choice (MongoDB, Postgres, SQLite) but lacks EmDash's sandboxed plugin model and Astro integration. Better choice if you need a standalone headless CMS today.

**Strapi** — The most popular open-source headless CMS with a large plugin ecosystem. Written in Node.js with a React admin panel. Strapi is more feature-complete but heavier, and its plugin security model is closer to WordPress's than EmDash's. Better choice for teams that need a battle-tested admin for non-technical users.

**Keystatic** — An Astro-native CMS from the Thinkmill team. Keystatic stores content as files (Git-based) rather than in a database, which works well for developer-authored content but doesn't suit non-technical editors. EmDash is the better fit if your editors aren't committing to Git repos.

### Verdict

EmDash is the most interesting CMS architecture I've seen in years. The sandboxed plugin model alone justifies paying attention to it, and the Astro integration means you're not choosing between a CMS and a modern frontend framework. It's beta software with rough edges, so don't migrate your production WordPress site today. But if you're starting a new content-heavy project in mid-2026 and you're comfortable with the Cloudflare ecosystem, EmDash is worth serious evaluation. The 10K stars in two months suggest the developer community agrees.
