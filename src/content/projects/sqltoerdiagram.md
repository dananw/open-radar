---
name: sqltoerdiagram
description: "Free open-source ER diagram generator — paste SQL CREATE TABLE statements and get interactive, editable ERDs entirely in your browser. Zero uploads, zero signup."
url: https://github.com/royalbhati/sqltoerdiagram
stars: 174
forks: 11
language: JavaScript
tags: ["database", "er-diagram", "sql", "developer-tools", "visualization", "vite"]
featured: false
publishedAt: 2026-06-14
---

## SQL to ER Diagram

### Overview

SQL to ER Diagram does one thing: you paste `CREATE TABLE` statements, and it gives you a clean, interactive entity-relationship diagram. No server, no account, no upload. Everything runs in the browser. The entire bundle is 32KB gzipped, built with Vite, and the only real dependency is `@dagrejs/dagre` for auto-layout. That's it.

The project launched on June 14, 2026, and hit 174 stars within hours. That kind of traction for a utility tool usually means the developer hit a real nerve. In this case, the nerve is the sorry state of SQL visualization tools. Every existing option is either paywalled (dbdiagram.io's free tier is laughably limited), ugly (most open-source ERD tools look like they were designed in 2008), or requires uploading your schema to someone else's server. SQL to ER Diagram is none of those things.

The creator, royalbhati, built a custom SQL DDL parser rather than pulling in a heavy SQL-parser library. The result is a tool that parses MySQL, PostgreSQL, SQL Server, and SQLite DDL syntax — including `ALTER TABLE` foreign keys, quoted identifiers, schema-qualified names, and inline constraints — while keeping the dependency count at exactly two. The parser handles edge cases that trip up other tools: backtick-quoted names, bracket-quoted names, `IF NOT EXISTS`, multi-column primary keys, and both inline and table-level `FOREIGN KEY` declarations.

### Why it matters

Database schema visualization is one of those tasks every fullstack developer needs but nobody wants to pay for. You're working on a Django project with 40 models, or a NestJS API backed by TypeORM with complex relationships, and you need to see the big picture. The options have historically been: pay for a SaaS tool, use a clunky desktop app, or draw boxes in Excalidraw by hand. None of those scale.

What makes this project interesting beyond its utility is the technical approach. The canvas renderer uses cached bitmaps and viewport culling, which means it stays smooth at hundreds of tables — the README claims ~120fps while zooming 300 tables with 593 foreign keys. That's not a trivial engineering problem. Most browser-based diagram tools choke past 50 nodes. The SQL editor has syntax highlighting implemented as a paint layer behind a textarea, with re-tokenization coalesced to a single animation frame. On a 45KB / 300-table script, that's about 6ms for a full repaint. Sub-millisecond on normal schemas.

There's also a broader context here. The developer tools space is consolidating around privacy-first, client-side utilities. Developers are increasingly reluctant to upload proprietary schemas to third-party services. SQL to ER Diagram fits that trend perfectly — it's a static site that could be self-hosted on any CDN in under a minute.

### Key Features

**100% Client-Side Processing.** Your SQL never leaves the browser. The parser, renderer, and layout engine all run in JavaScript. There's no backend, no WebSocket connection, no analytics beacon. The share feature encodes the entire project (SQL, layout, camera position, dialect) into the URL hash using gzip compression and base64 — the data lives in the fragment, which is never sent to a server. This is the right architecture for a tool that handles database schemas.

**Interactive Canvas Editing.** Double-click a table name, column name, or column type to edit it inline. Changes are applied as surgical text edits to your SQL — comments, formatting, and unsupported clauses are preserved. Rename a table and every `REFERENCES` pointing to it updates automatically. Add columns with a click, with dialect-aware type suggestions for PostgreSQL, MySQL, SQLite, and SQL Server. The canvas and SQL editor stay in sync at all times.

**Smart Auto-Layout.** The layout engine uses a hub-aware layered algorithm from `@dagrejs/dagre`. The most-connected table gets placed on one side with its related tables aligned beside it. You can choose Horizontal or Vertical direction and Compact, Comfortable, or Spacious spacing. Drag tables to rearrange — positions persist across reloads. Only newly added tables get auto-placed; your manual arrangement is preserved.

**Focus and Declutter.** Dense schemas with dozens of foreign keys are unreadable by default. Hover a table to highlight just its relationships. Click to pin focus — every unrelated table and FK line fades out. Click empty space to clear. This interaction model turns a spaghetti diagram into something actually useful for understanding specific parts of your schema.

**Annotations and Export.** Add sticky notes and group boxes to label and cluster sections of your diagram. They're included in save files, share links, and exports. Export as PNG (raster) or SVG (vector). Save projects as `.json` files containing SQL, layout, camera, and dialect settings. Open them later to restore exact state.

**Multi-Dialect SQL Support.** The parser handles `CREATE TABLE` and `ALTER TABLE` DDL from MySQL, PostgreSQL, SQL Server, and SQLite. It supports quoted identifiers (backticks, brackets, double quotes), schema-qualified table names, inline constraints (`PRIMARY KEY`, `NOT NULL`, `UNIQUE`, `REFERENCES`), and table-level constraints (`FOREIGN KEY`, `CONSTRAINT ... FOREIGN KEY`). Line and block comments are ignored. If your ORM generates standard DDL, this tool will parse it.

**Lightweight and Fast.** Two dependencies. 32KB gzipped bundle. Syntax highlighting repaints in under 6ms on large schemas. The canvas renderer stays at 120fps with hundreds of tables. No loading spinners, no "processing" modals. Paste your SQL and see the diagram instantly.

### Use Cases

- **Fullstack developers designing database schemas** — Whether you're using Django ORM, TypeORM with NestJS, Prisma with Next.js, or GORM with Go, you probably generate or write SQL DDL. Paste it here to visualize relationships before committing to a migration.
- **Code review and documentation** — Drop a schema dump into the tool during a PR review to understand how new tables relate to existing ones. Export the SVG and paste it into your documentation or Confluence page.
- **Legacy codebase exploration** — Working on an old project with 100+ tables and no ERD? Extract the DDL from your database (`pg_dump --schema-only`, `mysqldump --no-data`, `.schema` in SQLite) and paste it in. Instant visual map.
- **Teaching and learning SQL** — Students and bootcamp devs can paste example schemas to see how foreign keys, junction tables, and one-to-many relationships look visually. The inline editing feature lets them experiment in real time.
- **Quick schema prototyping** — Write `CREATE TABLE` statements in the editor, see the diagram update live, drag tables around to organize your mental model, then copy the SQL back out. Faster than any GUI schema builder.

### Pros and Cons

Pros:
- Genuinely free with no artificial limits. No "upgrade to Pro for more than 10 tables" nonsense. The entire tool is open source and runs locally.
- Privacy-first architecture means you can use it with production schemas, proprietary data models, or anything with NDA constraints. Nothing leaves the browser.
- The 32KB bundle and two-dependency philosophy make it one of the fastest-loading dev tools you'll find. No 2MB JavaScript payload, no loading states.
- The inline editing that syncs back to SQL is surprisingly polished for a v1. The surgical text edit approach preserves formatting, which matters when your DDL is version-controlled.
- Share links encode everything in the URL fragment — no backend needed, no link expiration, no rate limiting. Send a Slack message with the full diagram state.

Cons:
- No reverse-engineering from live databases. You need to extract DDL yourself (`pg_dump --schema-only`, etc.) and paste it in. Tools like DBeaver or DataGrip connect directly, which is more convenient for large existing databases.
- The auto-layout, while good, can produce suboptimal results for very large schemas with complex many-to-many relationships. Manual rearrangement is often necessary for presentation-quality diagrams.
- No collaboration features. It's a single-user, single-browser tool. If your team needs real-time co-editing on a schema diagram, you'll need something like dbdiagram.io or Lucidchart.
- No ORM integration. It doesn't read Django models, Prisma schemas, or TypeORM entities — only raw SQL DDL. You need a step in between to generate the DDL.

### Getting Started

```bash
# Clone and run locally
git clone https://github.com/royalbhati/sqltoerdiagram.git
cd sqltoerdiagram
npm install
npm run dev      # opens at http://localhost:5173

# Build for production (static files in dist/)
npm run build
npm run preview  # preview the production build locally
```

Or just visit [sqltoerdiagram.com](https://sqltoerdiagram.com) — no install needed.

To visualize your existing database:

```bash
# PostgreSQL — extract schema only
pg_dump --schema-only -h localhost -U myuser mydb > schema.sql

# MySQL — extract structure only
mysqldump --no-data -u root -p mydb > schema.sql

# SQLite — show schema
sqlite3 mydb.db ".schema" > schema.sql
```

Then paste the contents into the editor. The diagram appears immediately.

### Alternatives

**dbdiagram.io** — The most popular online ERD tool, built by Holistics. It uses its own DBML syntax rather than raw SQL, which means you either learn DBML or import from SQL (the free tier limits imports). The collaboration features are excellent, and it integrates with Holistics' BI platform. Choose dbdiagram when you need team collaboration, DBML-first workflow, or direct database connections. Choose SQL to ER Diagram when you want zero friction, zero cost, and zero uploads.

**DBeaver** — A desktop database client with built-in ERD generation. It connects directly to any database and reverse-engineers diagrams from live schemas. It's the right tool when you're already using DBeaver as your database client and want diagrams as a side effect. SQL to ER Diagram is better when you want a quick visualization without installing a 300MB Java application, or when you're working with DDL files rather than live databases.

**Mermarkdb/markmap or raw Excalidraw** — Some developers just draw their schemas manually in diagramming tools. This gives total control over layout and styling but doesn't scale. If you have 5 tables, drawing them manually is fine. If you have 50, you need automated parsing and layout — which is where SQL to ER Diagram earns its place.

### Verdict

SQL to ER Diagram is the kind of tool that makes you wonder why it took so long to exist. A free, open-source, client-side ERD generator from raw SQL with a 32KB bundle? The bar for database visualization tools has been embarrassingly low, and this project clears it easily. The custom SQL parser handles real-world DDL without choking on edge cases, the canvas renderer stays smooth at scales where most web-based diagram tools die, and the inline editing that syncs back to SQL is genuinely useful — not just a demo feature. For fullstack developers who work with SQL schemas regularly (and that's most of us), this should be bookmarked alongside your database client. It launched today and already has 174 stars, which suggests the developer community has been waiting for exactly this. The lack of live database connections and collaboration features are real limitations, but for a v1 with two dependencies and a 32KB footprint, this is an impressive start.
