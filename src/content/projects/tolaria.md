---
name: tolia
description: "Tolaria is an open-source desktop app for managing markdown knowledge bases with Git versioning, AI agent integration, and a keyboard-first interface built on Tauri and React."
url: https://github.com/refactoringhq/tolaria
stars: 13048
forks: 918
language: TypeScript
tags: ["knowledge-management", "markdown", "desktop-app", "tauri", "react", "ai-integration"]
featured: false
publishedAt: 2026-06-08
---

## Tolaria

### Overview

Tolaria is a desktop app for macOS, Windows, and Linux that manages markdown knowledge bases. It hit 13,000 GitHub stars by mid-2026, which puts it in rare company for a knowledge management tool — most never break 5,000. The growth makes sense when you look at who built it and why.

Luca Ronin, the creator of the popular Refactoring newsletter and podcast, built Tolaria to manage his own vault of 10,000+ notes. That's not a demo dataset. That's a real person's accumulated knowledge from years of writing, journaling, and running a tech publication. When someone builds a tool to handle their own massive workload and then open-sources it, the result tends to be more practical than tools built in a vacuum.

The core problem Tolaria solves is deceptively simple: how do you organize a large collection of markdown files in a way that's fast to navigate, works offline, integrates with your existing Git workflow, and doesn't lock you into a proprietary format? Existing tools like Obsidian handle some of this well, Notion handles others, but none combine all four with an open-source, files-first philosophy and built-in AI agent support.

### Why it matters

The knowledge management space has been stuck between two extremes. On one side, you have Obsidian — local-first, markdown-based, but closed-source with a plugin ecosystem that varies wildly in quality. On the other, you have Notion and similar cloud tools — great UX but proprietary formats, cloud dependency, and vendor lock-in that makes developers uneasy.

Tolaria positions itself squarely in the "developer-friendly" camp. Your notes are plain markdown files with YAML frontmatter. Every vault is a Git repository. There are no accounts, no subscriptions, no cloud dependencies. If you stop using Tolaria tomorrow, you lose nothing — your files work with any editor, any Git host, any tool that reads markdown.

What makes this particularly relevant right now is the AI integration angle. Tolaria ships with setup paths for Claude Code, Codex CLI, and Gemini CLI, plus a bundled MCP server. As AI agents become standard in developer workflows, having your knowledge base directly accessible to those agents without export steps or API gymnastics is a real advantage. This isn't bolted-on AI features — it's architectural alignment with how developers actually work in 2026.

### Key Features

**Files-First Architecture.** Every note is a plain markdown file stored on your local filesystem. No database, no proprietary format, no export step required. Your notes work with Vim, VS Code, any text editor, or any tool that reads markdown. This is the single most important design decision in the project — it means your data is never trapped.

**Git-First Versioning.** Each vault is a Git repository by default. You get full version history, branch-based workflows, and the ability to push to any Git remote — GitHub, GitLab, self-hosted Gitea, whatever you prefer. No dependency on Tolaria's servers for sync or backup. This aligns perfectly with how developers already manage their code.

**AI Agent Integration.** Tolaria includes a bundled MCP server and setup paths for Claude Code, Codex CLI, and Gemini CLI. An AGENTS file in your vault helps AI tools understand your structure. This means your knowledge base becomes context for AI assistants without manual copying or API setup. For developers already using AI coding tools, this is a significant workflow improvement.

**Keyboard-First Design.** The entire interface is built for power users who prefer keyboard navigation. The Command Palette (similar to VS Code's) gives you fast access to any note, any command, any navigation action. The editor is designed around keyboard shortcuts rather than mouse clicks. This matters when you're managing thousands of notes — mouse-driven navigation becomes a bottleneck.

**Types as Navigation Lenses.** Tolaria's "types" system lets you categorize notes, but unlike traditional database schemas, types are navigation aids, not enforcement mechanisms. There are no required fields, no validation errors, no rigid structures. You create types like "meeting notes," "project docs," or "journal entries" to help filter and find things, not to constrain how you write.

**Cross-Platform Desktop App.** Built with Tauri and React, Tolaria runs natively on macOS, Windows, and Linux. Tauri's architecture means the app is significantly lighter than Electron-based alternatives — smaller binary size, lower memory usage, faster startup. The React frontend means the UI is modern and responsive.

**Open Source Under AGPL.** The entire codebase is open source under the AGPL-3.0 license. You can inspect every line, contribute features, fork the project, or run your own modified version. The AGPL license ensures that any modifications deployed as a service must also be open-sourced, which protects the community's investment.

### Use Cases

- **Personal knowledge management** — Developers and writers who accumulate thousands of notes over years and need fast search, navigation, and organization without cloud dependency. Tolaria handles Luca's 10,000+ note vault daily.

- **Company documentation as AI context** — Teams storing internal docs, runbooks, and decision records in a format that AI coding agents can directly access via the MCP server. Your docs become context for Claude or Codex without export steps.

- **Second brain / Zettelkasten workflows** — Researchers and knowledge workers who want a local-first, Git-versioned system for interconnected notes with the speed of a native desktop app.

- **Developer documentation hubs** — Open-source projects or internal teams managing technical documentation in markdown with Git-based collaboration and review workflows.

- **AI-assisted writing and research** — Writers who want their notes accessible to AI tools for summarization, connection-finding, and content generation without uploading to third-party services.

### Pros and Cons

Pros:
- Files-first and Git-first design means zero vendor lock-in. Your notes are portable markdown files that work with any tool. If Tolaria disappears tomorrow, you lose nothing.
- AI agent integration via MCP server is forward-looking and practical. Developers using Claude Code or Codex can query their knowledge base directly without manual context loading.
- Tauri-based architecture delivers a lighter, faster desktop experience than Electron alternatives. The app starts quickly and uses less memory than Obsidian or Notion.
- Built by someone who actually uses the tool daily with 10,000+ notes. Features exist because they solve real problems, not because they look good in a demo.

Cons:
- AGPL-3.0 license is restrictive for commercial use. If you want to embed Tolaria's components in a proprietary product, you'll need to negotiate a different license or build alternatives.
- 29 open issues and active development mean the API surface is still settling. Early adopters should expect breaking changes in vault structure or configuration.
- No mobile app yet. If you need to access your notes on the go from a phone, you'll need to use a Git-based sync with another markdown editor on mobile.
- The learning curve for Tolaria's type system and AI integration may be steep for non-technical users. This is a developer tool at its core, not a consumer knowledge app.

### Getting Started

```bash
# Install via Homebrew on macOS
brew install --cask tolaria

# Or download from releases for macOS, Windows, or Linux
# https://refactoringhq.github.io/tolaria/download/

# For development / contributing
git clone https://github.com/refactoringhq/tolaria.git
cd tolaria
pnpm install
pnpm dev

# Run the native desktop app
pnpm tauri dev

# Or open browser-based mock mode
# http://localhost:5173
```

When you first launch Tolaria, you can clone the getting started vault:

```bash
git clone https://github.com/refactoringhq/tolaria-getting-started.git
```

This gives you a walkthrough of the app's features with example notes and workflows.

### Alternatives

**Obsidian** — The most popular local-first markdown knowledge base. Obsidian has a massive plugin ecosystem (1,500+ plugins), a mobile app, and a polished UI. It's closed-source with a freemium model (sync and publish are paid). Choose Obsidian if you need mobile access, want the largest plugin ecosystem, or prefer a more mature product. Choose Tolaria if you want open-source, Git-native workflows, and built-in AI agent integration.

**Logseq** — An open-source outliner-based knowledge base that stores everything as markdown or org-mode files. Logseq excels at daily journaling and block-level references. It's better for users who think in outlines rather than documents. Choose Logseq if your workflow is heavily journal-based with bidirectional linking at the block level. Choose Tolaria if you prefer traditional document-based notes with folder organization.

**Notion** — A cloud-based all-in-one workspace with databases, pages, and team collaboration. Notion's UX is excellent for non-technical teams, but it's proprietary, cloud-only, and your data lives on Notion's servers. Choose Notion if your team includes non-technical members who need a polished UI and real-time collaboration. Choose Tolaria if you're a developer who values data ownership, offline access, and Git integration.

### Verdict

Tolaria is the most thoughtfully designed open-source knowledge management tool I've seen for developers. The 13K stars in four months reflect genuine demand for a local-first, Git-native alternative to Obsidian that takes AI integration seriously. It's not trying to be everything — there's no mobile app, no real-time collaboration, no database features. It does one thing: manage your markdown files fast, with version control and AI agent access baked in. If you're a developer who already lives in markdown and Git, and you want your knowledge base to play nicely with Claude Code or Codex, Tolaria is the best option available right now. The fact that it's built by someone who manages 10,000+ notes in it daily gives me confidence it'll keep improving in directions that matter for real workflows.
