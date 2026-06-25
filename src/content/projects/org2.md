---
name: org2
description: "ORG2 is an open-source Cursor-style agent IDE built with Rust and Tauri — replayable agent execution traces, cross-session memory, and a local-first development environment under 100MB."
url: https://github.com/yorgai/ORG2
stars: 1271
forks: 103
language: TypeScript
tags: ["ai-coding-assistant", "ide", "rust", "tauri", "local-first", "developer-tools"]
featured: false
publishedAt: 2026-06-25
---

## ORG2

### Overview

ORG2 (pronounced "ORG Two", short for Organization II) is an open-source, Cursor-style agent IDE that launched on June 1, 2026 and hit 1,271 GitHub stars in just 24 days — with over 1,900 binary downloads across six release versions. It's built with Rust and Tauri, ships under 100MB on disk, and rethinks what an AI coding assistant should be.

Most AI coding tools treat agents as disposable assistants: you prompt, they respond, and once the session closes the context evaporates. ORG2 treats agents as persistent, observable colleagues inside a structured organization. Every agent action is recorded as a replayable execution trace — you can livestream what the agent is doing in real time or step through the replay later like a debugger. This is the core philosophical difference: Cursor and Claude Code give you a black box that produces code; ORG2 gives you a glass box that shows you how the code was produced.

The project is built by a team that clearly cares about engineering quality. The codebase has a strict engine architecture (SessionCore, ChatPanel, Simulator, BrowserCore, TerminalCore, DatabaseCore, GitWorkflow — each isolated with its own Jotai state atoms), a Rust-based normalization pipeline that processes all session events, and a comprehensive audit methodology baked into the repo's CLAUDE.md. This isn't a weekend project — it's a serious attempt at building a new category of developer tool.

### Why it matters

The AI coding tool landscape is currently split between two approaches: closed-source IDEs like Cursor that integrate AI deeply but give you no visibility into what the agent is doing, and terminal-based agents like Claude Code that are transparent but lack IDE-level integration. ORG2 tries to bridge this gap with a local-first, open-source desktop application that combines both.

The timing is relevant because the industry is starting to realize that black-box AI coding assistants create serious problems. A 2025 study from Microsoft Research found that developers using AI assistants accepted incorrect code 38% of the time when the AI sounded confident. Without replayable traces and auditability, teams can't review what the AI did, can't learn from its mistakes, and can't build shared understanding. ORG2's answer — replayable sessions, cross-agent memory, and org-level alignment tooling — directly addresses this gap.

For fullstack developers working with React, NestJS, Django, or Go, the value proposition is straightforward: ORG2 gives you an agent that can browse documentation, run your terminal, query your databases, and manage your Git workflow — all within a single desktop app with a replayable audit trail. You're not just getting code written faster; you're building a shared record of how decisions were made.

### Key Features

**Replayable Execution Traces.** Every agent action — every file read, edit, shell command, browser navigation, database query — is recorded as a structured event and stored in a SQLite session database. You can replay the agent's entire session as if it were a video, scrubbing through the timeline step by step. This is the closest thing to livepair debugging with an AI.

**Engine-Based Architecture.** The frontend is organized into seven isolated engines, each owning its own state, business logic, and UI components. SessionCore handles the session event lifecycle. Simulator replays agent sessions as full app views (code editor, browser, terminal, database manager). BrowserCore provides multi-tab embedded browsing via Tauri WebViews. TerminalCore gives you a full PTY terminal backed by xterm.js. DatabaseCore supports SQLite, Supabase, Turso, Neon, PostgreSQL, and MySQL from a unified interface.

**Rust-Powered Normalization Pipeline.** All session event data flows through a Rust backend via Tauri IPC. The TypeScript layer never touches raw event data — it only calls `es_process_chunks` or `es_normalize_chunk` through the Rust bridge. This means event processing is fast, consistent, and doesn't block the UI thread.

**Cross-Session Memory.** ORG2 remembers what agents learned across sessions. Knowledge persists in a shared workspace state that multiple agents and human developers can read from. This isn't just conversation history — it's structured knowledge about your codebase, your patterns, and your team's conventions.

**Built-in Browser and Database Tools.** Instead of switching between your IDE, browser, and database client, ORG2 embeds them all. The BrowserCore engine manages multi-tab browsing sessions with proxy support and incognito mode. The DatabaseCore engine connects to six different database providers through a single factory interface with connection status monitoring.

**Agent Scheduling and Auto-Start.** Agents can run overnight or continue work while you're away. Sessions can be scheduled and auto-started, with resource-aware execution that reacts to CPU, RAM, and human attention availability. This is the kind of feature that separates a toy from a tool you'd actually use for production work.

### Use Cases

- **Auditing AI-generated code changes** — Instead of blindly merging PRs from an AI assistant, replay the agent's session to see every step it took. You can verify it actually read the relevant files, ran the right tests, and understood the architecture before making changes.

- **Setting up a new project with full-stack scaffolding** — Let an ORG2 agent scaffold a React frontend with a NestJS backend, configure the database connection, set up authentication flows, and wire up CI — all within a single session you can review and modify at any step.

- **Debugging production issues with replayable context** — When a bug report comes in, an agent can reproduce the issue, browse the relevant code paths, query the database, and present a full replay of its investigation. The team can step through the trace together instead of reading a wall of text.

- **Onboarding new team members** — New developers can watch replays of how senior devs or agents solved real problems in the codebase. Instead of reading stale documentation, they see the actual decision-making process with full context.

### Pros and Cons

Pros:
- Replayable execution traces are genuinely novel — no other open-source IDE captures agent sessions with this level of fidelity, making it trivial to audit, review, and debug what the AI did.
- The engine-based architecture is well-designed and maintainable, with clear separation of concerns between session management, UI rendering, browser, terminal, database, and Git tooling.
- Local-first design with a Rust backend means near-zero latency for core operations like event processing, and the app stays under 100MB on disk.
- Active development with 7 releases in the first 24 days (v1.0.1.20 through v1.1.4) shows rapid iteration and responsiveness to community feedback.
- Open-source (AGPL-3.0) with a transparent development process — all architecture audits, UI audits, and even the project's CLAUDE.md are public.

Cons:
- Very early-stage software — it's been public for less than a month. Expect breaking changes, missing features, and rough edges. The database ecosystem is still being built out.
- Windows and macOS only for now. No Linux builds available as of June 2026, which limits the audience significantly.
- The philosophical pitch — "agents as persistent colleagues in an organization" — may feel over-engineered for developers who just want a faster way to write code. Cursor is simpler and more mature for the basic use case.
- Computer Use features require macOS and optional native sidecars (agent-browser, peekaboo), adding setup friction.

### Getting Started

```bash
# Download the latest release for your platform
# macOS Apple Silicon:
curl -LO https://github.com/yorgai/ORG2/releases/latest/download/ORG2-latest-mac-apple-silicon.dmg

# Windows x64:
curl -LO https://github.com/yorgai/ORG2/releases/latest/download/ORG2-latest-windows-x64-setup.exe

# Or build from source
git clone https://github.com/yorgai/ORG2.git
cd ORG2
pnpm install
pnpm run download:sidecars
pnpm run tauri:dev
```

The app opens with a chat panel on the left and a main workspace area. Start a new session, connect your API key, and begin working. The session recording starts automatically — every command, file edit, and browser visit is captured for later replay.

### Alternatives

**Cursor** — The most popular AI-first IDE, with deep VS Code integration, a polished UI, and a mature Copilot++ autocomplete model. Cursor is more stable, has better docs, and works on Linux. Choose Cursor if you want a polished, production-ready experience today. Choose ORG2 if you want transparency, replayability, and an open-source stack you can modify.

**Claude Code** — Anthropic's terminal-based coding agent with the best model-level reasoning. Claude Code is more powerful at complex multi-file refactors but lacks IDE-level GUI features like embedded browser, database client, and visual replay. Choose Claude Code when you need pure agent capability. Choose ORG2 when you want that capability wrapped in a replayable, auditable desktop environment.

**Verve (vercel/eve)** — Vercel's agent framework that focuses on composable agent workflows. It's more of a framework than an IDE — you build with it rather than work inside it. Choose Eve if you're building agent-powered applications. Choose ORG2 if you want an agent IDE for your daily development workflow.

### Verdict

ORG2 is the most thought-provoking AI coding IDE I've seen in 2026. The replayable execution traces alone justify a close look — no other open-source tool captures agent sessions with this level of fidelity, and the implications for team collaboration, code review, and debugging are significant. It's not ready to replace Cursor for production work yet (no Linux build, under a month old, APIs still settling), but the architectural decisions are sound and the vision is compelling. If you're building agent-powered development workflows or you care deeply about AI transparency in your team's code review process, ORG2 is worth installing today. The 1,271 stars and 1,900+ downloads in its first three weeks suggest I'm not the only one who thinks so.