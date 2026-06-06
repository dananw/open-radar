---
name: helmor
description: "Helmor is an open-source local workbench for multi-agent software development — orchestrate Claude Code, Codex, and other AI coding agents from a single desktop app."
url: https://github.com/dohooo/helmor
stars: 1155
forks: 98
language: TypeScript
tags: ["ai-agents", "developer-tools", "multi-agent", "tauri", "coding-agents"]
featured: false
publishedAt: 2026-06-07
---

## Helmor

### Overview

Helmor is an open-source desktop workbench for orchestrating multiple AI coding agents from a single interface. Built with Tauri v2 (Rust backend) and React 19, it hit 1,155 GitHub stars within two months of its April 2026 launch — growing at roughly 500 stars per month. The project has 1,525+ commits from a small but active team, with contributions landing daily through early June 2026.

The project is led by dohooo, with significant contributions from natllian (873 commits, more than the project founder's 652). That commit distribution tells you something: this is a serious engineering effort, not a weekend side project. The team ships fast — the changelog shows major features landing every few days, including stacked PR support, mobile browser companion, and local LLM integration in the most recent releases.

The core problem Helmor solves is the fragmented AI coding workflow. If you use Claude Code for one task, Codex for another, and maybe a local model for a third, you're juggling three terminal windows, three context histories, and three different mental models for how the agent works. Helmor collapses that into one workspace where you pick the agent per task, and the app handles routing, context management, and session persistence. It's the difference between using separate browser tabs for email and using a proper email client.

### Why it matters

AI coding agents have gone from novelty to daily tooling in under a year. Claude Code, OpenAI Codex, Cursor's agent mode, and a dozen others are now part of the standard developer toolkit. But the tooling around them hasn't kept up. Most developers still interact with agents through terminal multiplexers or IDE integrations that treat each agent as an isolated session.

Helmor represents a category shift — from "agent as CLI tool" to "agent as a managed workload." The git worktree integration means each agent session gets its own isolated branch and working directory. Stacked PR support lets you decompose large changes into dependent chains that agents can work on sequentially. The mobile companion lets you check on running agents from your phone. These aren't features you get from running `claude` in a terminal.

The timing connects to a broader industry pattern: as AI agents get more capable, the orchestration layer becomes the bottleneck. Companies like Cognition (Devin), Factory AI, and others are building proprietary orchestration platforms. Helmor is the open-source alternative, and its Apache 2.0 license means you can extend it without vendor risk.

### Key Features

**Multi-Agent Orchestration.** Helmor wraps both the Anthropic Claude Agent SDK and the OpenAI Codex SDK through a Bun-based sidecar process. You pick the agent for each workspace, and Helmor handles streaming, context management, and session persistence. The architecture is extensible — adding a new agent provider means implementing a sidecar adapter, not rewriting the core.

**Git Worktree Isolation.** Every workspace maps to a git worktree, giving each agent session its own working directory and branch. This means multiple agents can work on the same repository simultaneously without conflicts. When you're done, you review changes per-workspace and merge selectively. It's the same isolation model that experienced developers use for manual parallel work, automated for agent sessions.

**Stacked PR Support.** The `/helmor-cli stack` command plans a large change as a chain of dependent pull requests, each in its own workspace. `/helmor-cli restack` re-syncs the layers after a lower one changes or merges. This is a workflow that even experienced human developers struggle with — decomposing a big feature into reviewable chunks — and Helmor automates it for agent-driven development.

**Local LLM Integration.** Version 0.30 added a local LLM installer with Gemma 4 12B support, letting you run inference locally without sending code to external APIs. This matters for proprietary codebases where cloud-based agents are a non-starter. The installer downloads and configures the model automatically.

**Mobile Browser Companion.** The latest release adds a mobile companion that pairs with your desktop Helmor instance. Open a `remote-*.helmor.ai` URL from your phone to monitor running agents, view session progress, and even send prompts — all synchronized in real time with the desktop app. Conversations stream live across paired devices.

**Monaco Editor + Lexical Composer.** The workspace includes a Monaco-based file editor for reviewing agent changes and a Lexical-based message composer for crafting prompts. You're not just sending text to an agent — you're working in a proper development environment with syntax highlighting, file browsing, and diff views.

**Three-Process Architecture.** The frontend (React 19 SPA), Rust backend (Tauri host + SQLite), and agent sidecar (Bun + TypeScript) run as separate processes communicating over IPC. This design isolates agent execution from the UI, so a crashing agent doesn't take down the workbench. The sidecar compiles to a single binary via `bun build --compile`.

### Use Cases

- **Multi-agent feature development** — Assign different parts of a feature to different agents (Claude Code for backend logic, Codex for frontend components) and review changes side-by-side in separate workspaces.
- **Large refactoring projects** — Use stacked PRs to break a massive refactor into a chain of small, reviewable changes that agents execute sequentially with automatic rebasing.
- **Code review and testing workflows** — Let agents run tests and generate fixes in isolated worktrees while you review their output in the Monaco editor before merging.
- **Remote monitoring of long-running agent tasks** — Start a complex multi-file change on your desktop, then check progress from your phone via the mobile companion without interrupting the agent.
- **Local-first development with proprietary code** — Use the built-in local LLM (Gemma 4 12B) for codebases where cloud-based agents are restricted by policy or compliance requirements.

### Pros and Cons

Pros:
- Genuine multi-agent orchestration with git worktree isolation — not just a fancy terminal wrapper around a single agent CLI.
- Very active development with 1,525+ commits and features landing every few days. The project has real momentum.
- Apache 2.0 license with no cloud dependency for core functionality. Your code and sessions stay local.
- Stacked PR workflow is a genuinely novel feature that solves a real pain point in agent-driven development.

Cons:
- macOS only in the current release. Windows and Linux support aren't mentioned yet, which limits the audience significantly.
- The README is sparse — documentation lives in a Dosu-powered assistant rather than traditional docs. Getting started requires some guesswork.
- Early-stage software (version 0.31) with breaking changes expected. The API surface and workspace model are still evolving.
- Requires both Claude Code and Codex CLIs installed separately — Helmor orchestrates them but doesn't bundle them.

### Getting Started

```bash
# Download the latest macOS release from GitHub
# https://github.com/dohooo/helmor/releases

# Or build from source (requires Bun 1.3+, Rust toolchain, and Tauri CLI)
git clone https://github.com/dohooo/helmor.git
cd helmor
bun install
bun run dev

# The dev command runs: dev:prepare + vite build + tauri dev
# Opens the desktop app with hot-reload

# Run all tests (frontend + sidecar + Rust)
bun run test

# Type-check everything
bun run typecheck

# Lint (biome for JS/TS, clippy for Rust)
bun run lint
```

For agent integration, install the CLI tools Helmor wraps:

```bash
# Claude Code CLI
npm install -g @anthropic-ai/claude-code

# OpenAI Codex CLI
npm install -g @openai/codex
```

### Alternatives

**Cursor** — The most popular AI-native IDE with built-in agent mode. Cursor is more polished for single-agent workflows and has better code completion integration, but it's a proprietary IDE replacement rather than an orchestration layer. Choose Cursor if you want one agent tightly integrated with your editor. Choose Helmor if you want to run multiple agents in parallel with proper isolation.

**Claude Code (standalone)** — Anthropic's CLI agent is what Helmor wraps under the hood. Running it directly in the terminal is simpler and has zero setup overhead. But you lose the workspace management, git worktree isolation, stacked PRs, and multi-agent coordination. Choose standalone Claude Code for quick tasks. Choose Helmor when you're running multiple agent sessions on a complex feature.

**Aider** — A terminal-based AI coding assistant that supports multiple LLM backends and has strong git integration. Aider is more mature and has better documentation, but it's a single-session tool — you run one agent conversation at a time. Choose Aider if you want a well-tested CLI tool with broad model support. Choose Helmor if you need parallel agent sessions with workspace isolation.

### Verdict

Helmor is the most interesting take on AI agent orchestration I've seen in the open-source space. The stacked PR workflow alone is worth paying attention to — it's a feature that even mature teams with human developers struggle to get right, and Helmor makes it work for agent-driven development. The 1,155 stars in two months and daily commits suggest the project has real staying power, though the macOS-only limitation and sparse documentation are real friction points today. If you're a fullstack developer running multiple AI agents and you're on macOS, Helmor is worth installing now. Everyone else should watch it — this is where the tooling category is heading.
