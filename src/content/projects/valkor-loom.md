---
name: valkor-loom
description: "Loom is an open-source delivery harness that turns Claude Code, Codex, and OpenCode into repeatable software delivery systems with durable state and verification loops."
url: https://github.com/valkor-ai/loom
stars: 170
forks: 8
language: TypeScript
tags: ["developer-tools", "ai-agents", "delivery-harness", "coding-agents", "workflow"]
featured: false
publishedAt: 2026-06-10
---

## Loom

### Overview

Loom is an open-source delivery harness for coding agents. It doesn't replace Claude Code, Codex, or OpenCode — it wraps them in a structured loop of planning, building, verification, repair, preview, and handoff. The project launched on June 9, 2026, and picked up 170 stars in its first day, which signals real developer demand for something beyond one-shot AI coding.

The project comes from a team with academic backing from Zhejiang University and University College London. That's unusual for a developer tool — most agent harnesses come from startups trying to sell you something. Loom is Apache 2.0 licensed and ships with local adapters for three major coding agents out of the box. The CLI stores delivery state in `.loom/` directories, making each project's delivery history portable and inspectable.

The core problem Loom solves is the gap between "vibe coding a demo" and shipping production software. Coding agents can write code, but they struggle with long-running delivery: context gets lost after compaction, requirements drift across sessions, self-checks are biased, and there's no clean handoff when you pick up work the next day. Loom addresses each of these failure modes with durable state, scoped task contracts, separated verification, and delivery evidence reports.

### Why it matters

The AI coding agent space has exploded in 2026. Claude Code, Codex, Cursor, OpenCode — developers have more tools than ever for generating code. But the dirty secret is that most AI-generated code lives in demos and prototypes, not production. The bottleneck shifted from "can the agent write code?" to "can the agent deliver software reliably?"

This is the problem Loom targets. It's not another agent or another editor plugin. It's infrastructure for making existing agents better at delivery. The dynamic workflow approach means Loom adapts its delivery path based on the goal — a simple bug fix gets a different treatment than a full feature with backend dependencies, database migrations, and UI work.

For fullstack developers working with React frontends, NestJS or Django backends, and Go services, Loom's backend readiness tracking is particularly relevant. It tracks databases, auth, storage, environment variables, and runtime requirements as part of the delivery state. That means when your coding agent builds a feature that needs a new database table or API endpoint, Loom ensures those dependencies are verified before declaring the work done.

### Key Features

**Dynamic Workflow Routing.** Instead of a fixed pipeline, Loom analyzes each delivery goal and chooses the right path. A one-line fix skips planning and goes straight to implementation and verification. A full feature routes through requirement clarification, architecture planning, task splitting, implementation, and review. The workflow adapts based on complexity, not a rigid template.

**Durable Delivery State.** Everything lives in `.loom/` — project context, task contracts, backend state, test results, preview evidence, repair notes, and handoff reports. When you close your agent session and come back the next day, Loom picks up exactly where it left off. No more re-explaining your project to the agent every morning.

**Task Contracts with Bounding.** Broad goals get decomposed into bounded tasks with source references, acceptance criteria, result files, and continuation rules. This prevents the common failure mode where an agent declares "done" after completing 60% of the work. Each task has explicit boundaries and verification steps.

**Separated Verification Loop.** Loom splits implementation from validation. The agent that writes the code doesn't grade its own homework. Smoke tests, Playwright-style checks, log analysis, and error summaries run as a separate step. Failures generate repair requests that route back to the implementation loop. This addresses self-check bias, one of the most persistent problems with AI coding agents.

**Multi-Agent Protocol.** The same delivery process works across Claude Code, Codex, and OpenCode. Install the adapter for whichever agent you use, and the Loom commands work identically. Switch agents mid-project without losing delivery state. The CLI is agent-neutral — adapters just set the agent profile and formatting preferences.

**Token-Saving Context Packs.** Instead of re-reading the entire repository every turn, Loom maintains compact context packs with project summaries, task graphs, and current state. This reduces token consumption significantly on long-running projects. The README specifically calls out token waste as a failure mode Loom addresses.

**Backend Readiness Tracking.** Loom tracks infrastructure dependencies — databases, auth providers, storage buckets, environment variables, and runtime services — as first-class delivery state. When deploying a feature that needs a new PostgreSQL migration or a new environment variable, Loom verifies those dependencies are in place before moving to the next step.

### Use Cases

- **Fullstack feature delivery** — Building a feature that spans React frontend, NestJS API, and PostgreSQL database. Loom decomposes the work into frontend tasks, API tasks, and database tasks, verifies each layer, and produces a delivery report showing what was built and what was verified.

- **Multi-session projects** — Working on a large refactor across several days. Each session starts with `continue` and Loom routes to the right step based on persisted state. No more scrolling through chat history to figure out where you left off.

- **Team handoffs** — One developer starts a feature, another finishes it. Loom's delivery reports and evidence make the current state inspectable without reading the entire agent conversation.

- **Agent migration** — Starting a project in Codex and switching to Claude Code mid-stream. Loom's agent-neutral protocol preserves delivery state across agent switches.

- **Verification-heavy workflows** — Projects where you need evidence that tests pass, builds succeed, and previews look correct before declaring done. Loom's separated verification loop produces auditable results.

### Pros and Cons

Pros:

- Solves a real, measurable problem. The failure modes Loom addresses (partial completion, goal drift, self-check bias, token waste) are things every developer using AI agents has experienced.
- Agent-agnostic design means you're not locked into one coding agent. The protocol works across Claude Code, Codex, and OpenCode with the same commands.
- Apache 2.0 license with academic backing gives it credibility. The Zhejiang University and UCL affiliation suggests the team has thought deeply about the problem space.
- Local-first architecture. All state lives in `.loom/` directories. No cloud service, no account, no telemetry.

Cons:

- Very early stage. 170 stars and one day old means limited community testing. The API and workflow will almost certainly change.
- No production deployment yet. Current deployment support is limited to local Docker Compose previews. The README explicitly says production deployment is coming later.
- Adds overhead to simple tasks. If you're doing one-shot edits, Loom's routing and state management is unnecessary complexity. It only pays off on multi-step deliveries.
- Requires Node.js 20+ and npm. The tooling footprint might feel heavy for developers who prefer lighter solutions.

### Getting Started

```bash
# Clone and install
git clone https://github.com/valkor-ai/loom.git
cd loom
npm install

# Install the adapter for your coding agent
npm run plugin:install-claude    # For Claude Code
npm run plugin:install-codex     # For Codex
npm run plugin:install-opencode  # For OpenCode

# Verify installation
"$HOME/.loom/bin/loom-cli" --version

# Start a delivery from your agent
# In Claude Code or OpenCode:
/loom build a visitor registration system

# In Codex:
@loom build a visitor registration system

# Resume work after closing and reopening your agent
/loom continue
```

### Alternatives

**Claude Code's built-in planning** — Claude Code has native support for planning and task breakdown through `CLAUDE.md` files and multi-turn conversations. It works well for smaller features but lacks Loom's durable state, separated verification, and multi-agent portability. Choose Claude Code's native approach when your delivery is simple enough to complete in one session.

**Aider** — A terminal-based AI coding assistant that focuses on code editing with git integration. Aider is lighter weight and better for targeted code changes, but it doesn't provide delivery orchestration, verification loops, or backend readiness tracking. Choose Aider when you need precise code edits without the delivery harness overhead.

**Cursor with custom rules** — Cursor supports `.cursorrules` files and multi-file editing with agent mode. You can build a pseudo-delivery workflow with careful prompting and custom rules, but it's manual and not portable to other agents. Choose Cursor's approach when you're committed to the Cursor editor and don't need cross-agent compatibility.

### Verdict

Loom is the most pragmatic response to the "AI coding agents can't ship production code" problem I've seen. It doesn't try to build a better agent or a better editor — it builds the delivery infrastructure around existing agents. The dynamic workflow routing, durable state, and separated verification loop address real failure modes that developers hit daily. At 170 stars on day one, it's clearly scratching an itch. The main risk is maturity: this is early-stage software with no production deployment support yet. But if you're using Claude Code, Codex, or OpenCode for anything beyond trivial edits, Loom is worth installing today. The local-first, agent-agnostic design means there's no vendor lock-in risk — you can try it on one project and remove it without side effects.
