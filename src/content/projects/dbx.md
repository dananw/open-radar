---
name: dbx
description: "DBX is a 15MB open-source database client supporting 40+ databases with built-in AI SQL assistant and MCP server for agent integration."
url: https://github.com/t8y2/dbx
stars: 4098
forks: 318
language: TypeScript
tags: ["database", "tauri", "rust", "ai", "mcp", "developer-tools"]
featured: false
publishedAt: 2026-06-08
---

## DBX

### Overview

DBX is a lightweight, cross-platform database client that supports 40+ databases in a single 15MB binary. It launched on April 29, 2026 and crossed 4,000 GitHub stars in just five weeks — a pace that suggests developers have been waiting for something like this. Built with Tauri 2, Vue 3, and Rust, it runs natively on macOS, Windows, and Linux, with a Docker-based web version for team access.

The project comes from t8y2, a developer who clearly felt the pain of existing database tools. DBeaver requires a Java JRE that balloons the install to hundreds of megabytes. TablePlus is macOS-first with limited cross-platform support. Beekeeper Studio is Electron-based and ships with a bundled Chromium. DBX strips all that away — no Java, no Python venv, no bundled browser engine. Just a small binary that connects to your databases.

The core problem DBX solves is fragmentation. Fullstack developers regularly work with PostgreSQL for the main app, Redis for caching, SQLite for local dev, and maybe MongoDB for a specific feature. That's three or four different tools, each with its own connection manager, query editor, and data viewer. DBX collapses all of that into a single interface with a consistent query editor, data grid, and schema browser across every supported database.

### Why it matters

The database client space has been quietly stagnant. DBeaver dominates because it's free and supports everything, but its Java foundation makes it feel heavy and slow. TablePlus is beautiful but locked to macOS for the free tier. DataGrip is powerful but expensive. Most developers end up with two or three tools installed — one for SQL databases, one for Redis, maybe a separate MongoDB client.

DBX arrives at a moment when two trends are converging. First, AI-assisted development is becoming standard. Developers expect their tools to integrate with coding agents, not exist in isolation. DBX ships a native MCP server, meaning Claude Code, Cursor, Windsurf, and other AI tools can query your databases through connections you've already configured. No separate setup, no copy-pasting schemas into chat.

Second, the Tauri ecosystem has matured to the point where building native desktop apps in Rust with web frontends is genuinely practical. DBX proves that a database client doesn't need to be a bloated Electron app or a JVM-dependent monster. The 15MB size isn't a gimmick — it's a direct consequence of choosing Rust for the backend and Tauri for the native shell. For developers who care about tool ergonomics and startup time, this matters more than people realize.

### Key Features

**40+ Database Support in One Binary.** MySQL, PostgreSQL, SQLite, Redis, MongoDB, DuckDB, ClickHouse, SQL Server, Oracle, Elasticsearch, MariaDB, TiDB, CockroachDB, and many more — all from a single install. JDBC-oriented profiles extend coverage to Snowflake, Trino, Hive, Neo4j, Cassandra, BigQuery, and custom connections. The breadth here rivals DBeaver, but without the Java dependency.

**AI SQL Assistant.** Describe what you want in plain language and get SQL back. DBX can explain queries, optimize SQL, fix errors, and run AI-generated statements through built-in safety checks before execution. It works with Claude, OpenAI, local models via Ollama, or any OpenAI-compatible endpoint. The safety checks are the key detail — the assistant won't run destructive queries without confirmation.

**MCP Server for Agent Integration.** DBX speaks the Model Context Protocol natively. Claude Code, Cursor, Windsurf, and other AI coding agents can query your databases through connections already configured in DBX. The `@dbx-app/mcp-server` package exposes listing connections, browsing tables, executing SQL, and opening tables directly in the UI. This is where database tools need to go as AI-assisted coding becomes the norm.

**CodeMirror 6 Query Editor.** SQL syntax highlighting, metadata-aware autocomplete, Cmd+Enter execution, selected SQL execution, formatting, diagnostics, and 9 editor themes. Persistent query history, saved SQL snippets, tab restore, and direct `.sql` file execution. The autocomplete is context-aware — it knows your table and column names from the active connection.

**Virtual-Scrolled Data Grid.** Handles large result sets without choking. Inline editing with SQL preview before save, WHERE and ORDER BY controls, DataGrip-style filters, LIKE/NOT LIKE context filters, sorting, full-text search, pagination, column resize, and full cell details. Export or copy as CSV, JSON, Markdown, XLSX, or INSERT statements. The grid performance is noticeably better than DBeaver's for large datasets.

**Schema Tools and ER Diagrams.** Full schema browser with databases, schemas, tables, columns, indexes, foreign keys, triggers, plus sidebar search and pinning. ER diagram visualization, schema diff across connections, explain plan viewer, field lineage analysis, and a table structure editor with reviewable changes. These features usually require a paid tool.

**Desktop, Docker, and Web.** Native app on all three major platforms. Self-host via Docker for team access with `docker run -p 4224:4224 t8y2/dbx`. Web version for browser-only environments. Same feature set, same connections, same configuration across deployment modes. The Docker setup takes under 30 seconds.

### Use Cases

- **Fullstack developers juggling multiple databases** — If your stack uses PostgreSQL for the app, Redis for caching, and SQLite for local development, DBX replaces three separate tools with one interface and a unified connection manager.
- **Teams needing a shared database client** — Deploy DBX via Docker and everyone accesses the same connections through the browser. No more "what's the staging database password?" in Slack.
- **AI-augmented development workflows** — With the MCP server, Claude Code can query your dev database directly during a coding session. Describe what you need in natural language, get the SQL, execute it, see results — all without leaving your editor.
- **Developers who refuse to install Java** — If you've been avoiding DBeaver because of the JRE requirement, DBX gives you the same database coverage in 15MB with no runtime dependencies.
- **Database exploration and documentation** — The ER diagram viewer, schema diff, and field lineage tools make DBX useful for understanding unfamiliar databases, not just querying them.

### Pros and Cons

Pros:
- The 15MB size is real and genuinely refreshing. Startup is instant, memory usage is minimal, and there's no Java or Electron overhead. After using DBX for a week, going back to DBeaver feels sluggish.
- MCP integration is forward-looking and well-implemented. The `@dbx-app/mcp-server` package works out of the box with Claude Code and Cursor, making DBX the first database client that feels native to the AI coding workflow.
- The breadth of database support is impressive for a project barely five weeks old. Redis and MongoDB get specialized browsers (key pattern search, document CRUD, TTL editing) rather than being shoehorned into a SQL-only interface.
- Apache-2.0 licensed with no telemetry. Auto-update checks GitHub Releases only and can be disabled.

Cons:
- Five weeks old means rough edges. 232 open issues as of early June 2026 suggest the API and feature surface are still settling. Expect bugs and missing edge cases.
- The project originated from a Chinese-language community (QQ groups, WeChat, LINUX DO forum). English documentation exists but community support and issue discussions lean heavily Chinese. This could slow adoption in Western teams.
- No visual query builder or drag-and-drop schema designer. The editing experience is code-first, which is fine for developers but won't satisfy DBAs who prefer visual tools.

### Getting Started

```bash
# macOS (Homebrew)
brew install --cask dbx

# Windows (Scoop)
scoop bucket add dbx https://github.com/t8y2/scoop-bucket
scoop install dbx

# Docker (self-hosted web version)
docker run -d --name dbx -p 4224:4224 -v dbx-data:/app/data t8y2/dbx

# MCP server for AI agent integration
npx @dbx-app/mcp-server

# Add to your .mcp.json for Claude Code / Cursor
# {
#   "mcpServers": {
#     "dbx": { "command": "npx", "args": ["-y", "@dbx-app/mcp-server"] }
#   }
# }

# CLI for terminal and script workflows
npm install -g @dbx-app/cli
dbx connections list --json
dbx query local "select 1" --json
```

### Alternatives

**DBeaver** — The incumbent free database client with the widest driver support. DBeaver Community Edition covers nearly every database DBX does, but it requires a Java JRE and feels sluggish on large datasets. Choose DBeaver if you need battle-tested stability, specific niche drivers, or your team already has it standardized. DBX is the better pick if you want speed, small footprint, and native AI integration.

**TablePlus** — A beautifully designed database client that's fast and native-feeling on macOS. TablePlus supports PostgreSQL, MySQL, SQLite, Redis, and MongoDB with a clean UI. The free tier is limited to two connections, and the Windows/Linux versions lag behind macOS. Choose TablePlus if you're on macOS and want the most polished editing experience. DBX wins on cross-platform consistency and database coverage.

**DataGrip** — JetBrains' professional database IDE with the deepest SQL intelligence on the market. DataGrip's code analysis, refactoring, and database-specific features are unmatched, but it's expensive ($99/year individual) and heavy. Choose DataGrip if SQL is your primary job and you need the best query analysis. DBX is the better casual/multi-tool choice for fullstack developers who interact with databases as part of a broader workflow.

### Verdict

DBX is the database client I didn't know I needed until I tried it. The 15MB size sounds like marketing until you launch it and feel the difference — instant startup, no beachball on large result sets, no Java process eating 800MB in the background. The MCP server integration is the real differentiator though. In mid-2026, if your database client can't talk to your AI coding tools, it's falling behind. DBX gets this right from day one. At five weeks old with 4K stars and active development, it's too early to call it production-stable for enterprise teams. But for individual developers and small teams who want a fast, modern, AI-aware database tool that just works across every database they touch — this is the one to watch.
