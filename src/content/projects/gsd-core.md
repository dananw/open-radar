---
name: gsd-core
description: "GSD Core is a spec-driven meta-prompting system for AI coding agents that solves context rot and keeps your Claude Code sessions productive at scale."
url: https://github.com/open-gsd/gsd-core
stars: 2167
forks: 135
language: JavaScript
tags: ["ai-coding", "context-engineering", "claude-code", "meta-prompting", "developer-tools"]
featured: false
publishedAt: 2026-06-02
---

## GSD Core

### Overview

GSD Core is a meta-prompting and context engineering system for AI coding agents. It hit 2,100 GitHub stars in under two weeks after its May 22 launch — a signal that developers are hungry for something that makes AI coding tools actually work on real projects, not just toy demos.

The project comes from OpenGSD, and its pitch is blunt: AI coding agents degrade as context windows fill up. You start a Claude Code session, things go well for the first 30 minutes, and then the quality falls off a cliff. The model starts cutting corners, forgets earlier decisions, and produces code that contradicts what it wrote an hour ago. GSD Core fixes this by structuring the entire development workflow into phases, each running in a fresh context window with only the artifacts it needs.

It works across 15 runtimes — Claude Code, OpenCode, Gemini CLI, Codex, Copilot, Cursor, Windsurf, Kilo, and more. Install it once with `npx @opengsd/gsd-core@latest`, pick your runtime, and you get a set of slash commands that turn your AI coding tool into a structured development system. No API keys, no cloud service, no vendor lock-in. It's MIT-licensed and runs entirely on your machine.

### Why it matters

If you've tried using Claude Code or Cursor for anything beyond a weekend project, you've hit the wall. The first 20 minutes are magical. Then context rot sets in — the model's output quality degrades as its context window fills with noise. Research from multiple teams (Anthropic's own evals, independent benchmarks) shows that LLM performance drops measurably past 60-70% context utilization on complex tasks.

GSD Core is the first open-source tool I've seen that treats this as an engineering problem rather than a prompting problem. Instead of writing better prompts and hoping, it structures the entire development lifecycle into discrete phases: discuss, plan, execute, verify, ship. Each phase runs in a fresh subagent context. Your main session stays at 30-40% utilization because the heavy lifting happens elsewhere.

This connects to a broader shift happening right now. The "vibe coding" era of 2024-2025 produced a lot of demos and a lot of frustration. Developers discovered that AI agents are great at generating code and terrible at managing complexity. GSD Core represents the next phase: treating AI agents as capable but forgetful workers that need structured workflows, not just good prompts. The spec-driven development approach — where you define requirements, get plans, execute in parallel, and verify systematically — is how professional software actually gets built.

### Key Features

**Context Rot Prevention.** The core innovation. GSD keeps your main Claude Code context window clean by executing work in fresh subagent contexts. Researchers, planners, and executors each start with exactly what they need — your PROJECT.md, REQUIREMENTS.md, and the specific phase plan — nothing else. Your main window stays at 30-40% while the work happens in parallel subagents with 200k-token contexts of their own.

**Structured Artifact System.** GSD maintains five structured markdown files that survive session boundaries: PROJECT.md (vision), REQUIREMENTS.md (scope), ROADMAP.md (direction), STATE.md (current position), and CONTEXT.md (per-phase decisions). Every new session loads these files and immediately knows where things stand. This is the "shared memory" that most AI coding setups completely lack.

**Six-Command Development Loop.** The entire workflow is six slash commands: `/gsd-new-project`, `/gsd-discuss-phase`, `/gsd-plan-phase`, `/gsd-execute-phase`, `/gsd-verify-work`, `/gsd-ship`. Each does exactly one thing. There's also `/gsd-progress --next` that auto-detects the next step. The simplicity is intentional — you don't need to learn a complex system, you just follow the loop.

**Parallel Execution with Atomic Commits.** The execute phase runs plans in parallel waves. Each task gets its own subagent context and produces an atomic commit. You can walk away, come back to completed work, and have a clean git history. This is a significant upgrade from the typical AI coding workflow where you get one giant, undifferentiated blob of changes.

**Cross-Runtime Support.** Works with Claude Code, OpenCode, Gemini CLI, Codex, Copilot, Cursor, Windsurf, Kilo, and six other runtimes. The installer handles the conversion between runtime-specific formats automatically. You're not locked into any single AI provider — if you switch from Claude to Gemini next month, your GSD workflow carries over.

**Codebase Mapping.** The `/gsd-map-codebase` command analyzes your existing stack, architecture, and conventions before you start a new project. This means `/gsd-new-project` asks informed questions instead of generic ones. For brownfield work — which is most real development — this is essential.

**Skill Profiles.** Install only what you need: `--profile=core` gives you the six main loop commands, `--profile=standard` adds phase management, and the default includes everything. Skills can be toggled at runtime with `/gsd:surface` without reinstalling. This keeps your agent's tool surface lean and reduces confusion.

### Use Cases

- **Fullstack feature development** — Building a new API endpoint with frontend integration across React and NestJS. GSD structures the work into backend plan, frontend plan, and integration verification, each in fresh contexts.
- **Large refactoring projects** — Migrating a Django monolith to microservices or upgrading Go module dependencies. The phase-based approach keeps the model from losing track of what's been changed.
- **AI-assisted greenfield projects** — Starting a new product from scratch. The discuss phase captures your architectural decisions before any code gets written, preventing the common AI coding failure of generating code that contradicts your design intent.
- **Team onboarding to AI coding** — The structured workflow gives junior developers guardrails. Instead of "just ask the AI," they follow a repeatable process that produces consistent results.
- **Multi-session development** — Projects that span days or weeks. The artifact system means you can close Claude Code on Friday and pick up exactly where you left off on Monday without re-explaining everything.

### Pros and Cons

Pros:
- Solves a real, measurable problem. Context rot is the #1 complaint from developers using AI coding tools on production projects, and GSD's approach of fresh subagent contexts is an engineering solution, not a prompting hack.
- Cross-runtime support means you're not locked in. If Claude Code pricing changes or you want to try Gemini CLI, your workflow carries over with zero migration effort.
- The structured artifact system (PROJECT.md, STATE.md, etc.) creates genuine project documentation as a side effect. Most teams using AI coding tools produce zero documentation — GSD forces it naturally.

Cons:
- The learning curve is steeper than "just start typing." You need to internalize the six-command loop and understand when to use discuss vs. plan. For quick one-off tasks, the overhead isn't worth it.
- It's optimized for Claude Code's `--dangerously-skip-permissions` mode. While it works with other runtimes, the experience is most polished on Claude Code. Cursor and Copilot support is functional but less tested.
- The project is less than two weeks old. The 2,100 stars suggest strong interest, but production-readiness is unproven. The docs reference architecture decisions (ADRs) which is a good sign, but real-world edge cases haven't been discovered yet.

### Getting Started

```bash
# Install GSD Core
npx @opengsd/gsd-core@latest

# The installer prompts for your runtime and install scope
# Choose Claude Code (recommended), global install

# Start Claude Code with permissions pre-approved
claude --dangerously-skip-permissions

# Map your existing codebase (if you have one)
/gsd-map-codebase

# Start a new project
/gsd-new-project

# Follow the loop: discuss → plan → execute → verify → ship
/gsd-discuss-phase 1
/gsd-plan-phase 1
/gsd-execute-phase 1
/gsd-verify-work 1
/gsd-ship 1
```

### Alternatives

**Claude Code's built-in `/plan` command** — Claude Code ships with basic planning capabilities out of the box. It works fine for small tasks but doesn't address context rot, doesn't maintain structured artifacts across sessions, and doesn't support parallel execution. Choose it when you're doing quick, single-session work where GSD's overhead isn't justified.

**Cursor's Agent Mode with .cursorrules** — Cursor offers agent mode with custom rules files that guide behavior. It's more tightly integrated with the editor and requires less setup. However, it suffers from the same context rot problems and doesn't provide a structured development workflow. Choose Cursor's native approach when you want IDE-integrated AI assistance for smaller tasks.

**OpenCode with custom skills** — OpenCode is a terminal-based AI coding tool that supports custom agent skills. You could build a GSD-like workflow manually, but you'd be reinventing the wheel. GSD Core's installer already handles OpenCode conversion. Choose raw OpenCode skills only if you need a highly customized workflow that GSD's six-command loop doesn't cover.

### Verdict

GSD Core is the most practical solution to context rot I've seen in open source. It doesn't try to be clever — it applies basic software engineering principles (phased execution, fresh contexts, structured documentation) to AI coding and the results speak for themselves: 2,100 stars in 11 days, quotes from engineers at Amazon, Google, and Shopify calling it the best addition to their Claude Code setup. If you're using AI coding tools for anything beyond trivial tasks, this is worth the 10-minute setup. The six-command loop feels like overhead until you try a multi-day project without it and remember what context rot actually feels like. It's early — the project is barely two weeks old — but the architecture is sound and the problem it solves is real. Recommended for any developer who's hit the "Claude Code works great for 20 minutes then falls apart" wall.
