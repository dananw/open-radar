---
name: gsd-core
description: "GSD Core is a context-engineering framework for AI coding agents that prevents context rot through fresh subagents and spec-driven development workflows."
url: https://github.com/open-gsd/gsd-core
stars: 3164
forks: 192
language: JavaScript
tags: ["ai-agents", "context-engineering", "developer-tools", "claude-code", "spec-driven-development"]
featured: false
publishedAt: 2026-06-09
---

## GSD Core

### Overview

GSD Core is a context-engineering and spec-driven development framework that makes AI coding agents actually reliable at scale. It hit 3,100 GitHub stars in under three weeks after its May 2026 launch, which tracks with the pain it addresses: every developer using Claude Code, Codex, or Gemini CLI has watched their agent slowly lose the plot as the context window fills up.

The project comes from the open-gsd organization, with primary maintainer `trek-e` contributing over 1,800 commits. It's MIT-licensed and published as an npm package (`@opengsd/gsd-core`), so installation is a single `npx` command. The team also maintains `gsd-pi`, a companion meta-prompting system, suggesting a broader ecosystem play around AI-assisted development workflows.

The core problem GSD Core solves is what the team calls "context rot" — the silent quality degradation that happens as an AI agent's context window fills with accumulated conversation history. It's not a model bug. It's a fundamental property of how transformer attention works over long sequences. Early instructions get pushed to the edge of what the model can attend to. Nuance from the first few exchanges — the constraints you stated, the architecture you agreed on — competes for attention against everything that came later. GSD Core attacks this structurally by routing all heavy work into fresh-context subagents while keeping your main session lean.

### Why it matters

If you're building anything serious with AI coding agents in 2026, you've hit this wall. You start a session, the agent does great work for 20 minutes, then it starts contradicting itself. It rewrites code it already wrote correctly. It ignores requirements you stated three messages ago. The standard fix — `/clear` and start over — loses all your continuity.

GSD Core is the first open-source framework I've seen that treats this as a first-class engineering problem rather than a user inconvenience. It's not wrapping an API call with better prompts. It's a full orchestration system with structured artifacts, phase-based workflows, and explicit context management. The fact that it works across Claude Code, Codex, Gemini CLI, Copilot, Cursor, Windsurf, and OpenCode means you're not locked into one AI vendor's ecosystem.

This connects to a broader shift in how developers think about AI tooling. The first wave was "give the agent a prompt and hope." The second wave was "give it better prompts and rules files." GSD Core represents a third approach: engineer the context itself. Treat the context window as a finite resource that needs management, the same way you'd manage memory in a long-running process.

### Key Features

**Fresh-Context Subagent Architecture.** The central design decision. Your main session acts as a thin orchestrator that spawns specialized subagents for research, planning, execution, and verification. Each subagent starts with a clean 200k-token context window, receives exactly the context it needs for its task, and terminates when done. The orchestrator never touches source files directly — it spawns agents, collects results, and updates shared state. Because it does very little itself, its context window grows slowly and predictably.

**Five-Step Phase Loop.** Every milestone follows a disciplined cycle: Discuss (capture implementation decisions), Plan (research and decompose into tasks with acceptance criteria), Execute (run plans in parallel waves with fresh subagents), Verify (walk through what was built and diagnose issues), and Ship (create PR and archive the phase). This isn't optional ceremony — each step produces structured artifacts that the next step depends on.

**Durable Planning Artifacts.** Everything meaningful gets written to a `.planning/` directory as human-readable Markdown and JSON. `STATE.md` tracks your project's current position. `CONTEXT.md` captures decisions. `PLAN.md` files break work into dependency-ordered tasks. These artifacts survive session crashes, model changes, and `/clear` commands. Any subsequent agent can read them directly without depending on conversation history.

**Multi-Runtime Support.** The installer detects your runtime and adapts automatically. Claude Code uses `/gsd-command-name` syntax with `context: fork` frontmatter for heavy skills. Gemini CLI uses `/gsd:command-name` with colon namespacing. Codex uses `$gsd-command-name`. The semantic behavior is identical across all runtimes — only the syntax differs. This means you can switch between AI tools without losing your workflow.

**Lifecycle Hooks and Context Headroom Monitoring.** Since v1.4.0, GSD Core registers runtime-specific lifecycle hooks that monitor context consumption per turn. Claude Code fires `PreCompact` before compaction and `Stop` at session turn boundaries. Gemini fires `BeforeAgent`/`AfterAgent` around each invocation. These hooks give GSD a signal about how much context budget remains, so it can warn you before the window is exhausted rather than silently degrading.

**86+ Specialized Commands.** The command surface is organized into six namespace routers: `/gsd-workflow` (phase pipeline), `/gsd-project` (project lifecycle), `/gsd-quality` (code review, security, debugging), `/gsd-context` (codebase intelligence and mapping), `/gsd-manage` (configuration and workspace management), and `/gsd-ideate` (exploration and spec capture). Heavy workflow skills like `/gsd-plan-phase` and `/gsd-execute-phase` carry `context: fork` to run in isolated subagent windows.

**Workspace Isolation for Multi-Repo Work.** The `/gsd-workspace` command creates isolated environments with independent `.planning/` directories. Use `--repos repo1,repo2` to work on a subset of repos, `--strategy worktree` for git worktree-based isolation, or `--branch` for feature branches. This is particularly useful for fullstack developers juggling frontend and backend repos that need coordinated changes.

### Use Cases

- **Large feature development** — When a feature spans multiple files and requires architectural decisions, the phase loop ensures research happens before planning, and planning happens before execution. No more "let me just start coding and figure it out as I go" with an agent that forgets what it decided 50 messages ago.

- **Onboarding to existing codebases** — The `/gsd-onboard` workflow maps your codebase, identifies patterns, and creates structured context that future agents can reference. Instead of explaining your project structure every session, the agent reads `.planning/PROJECT.md` and gets oriented immediately.

- **Multi-repo fullstack work** — Frontend React app, NestJS backend, shared types library. GSD workspaces let you coordinate changes across repos with isolated planning state for each, while the orchestrator tracks cross-repo dependencies.

- **Code review and quality gates** — The `/gsd-code-review` and `/gsd-security-audit` commands spawn dedicated review agents with fresh context, so they evaluate code on its merits rather than being influenced by the conversation that produced it.

- **Long-running autonomous sessions** — The `/gsd-autonomous` command runs the full phase loop without human intervention, spawning subagents for each step. Useful for well-defined tasks where you want to let the agent work while you do something else.

### Pros and Cons

Pros:
- Solves a real, universally experienced problem with AI coding agents. Context rot isn't theoretical — every developer using these tools has hit it. GSD Core's structural approach is more effective than prompt engineering alone.
- Multi-runtime support means you're not betting on one AI vendor. Works with Claude Code, Codex, Gemini CLI, Copilot, Cursor, Windsurf, and OpenCode today.
- Planning artifacts are plain Markdown and JSON in your repo. No vendor lock-in, no proprietary state format, no cloud dependency. You can inspect, edit, and version everything.
- Active development with 1,800+ commits from the lead maintainer, 52 open issues suggesting healthy engagement, and a Discord community for support.

Cons:
- The command surface is large (86+ commands across 6 namespaces). Learning the full system takes time. The documentation is thorough but the initial learning curve is steep compared to just using Claude Code directly.
- Overhead for simple tasks. If you're asking an agent to fix a typo or write a one-off script, the phase loop adds ceremony without value. GSD Core is designed for multi-session, multi-file work.
- Relies on the AI runtime supporting subagent spawning and lifecycle hooks. Some runtimes implement these features more maturely than others. Claude Code has the best support; others may have gaps.

### Getting Started

```bash
# Install and configure for your runtime
npx @opengsd/gsd-core@latest

# Initialize a new project with context gathering
/gsd-new-project

# Or auto-extract from an existing PRD
/gsd-new-project --auto @prd.md

# Start the phase loop
/gsd-workflow

# Plan a phase (spawns fresh-context research + planning agents)
/gsd-plan-phase

# Execute the plan (parallel waves with clean subagents)
/gsd-execute-phase

# Verify what was built
/gsd-verify

# Ship it
/gsd-ship
```

For existing codebases, start with onboarding:

```bash
# Map your existing project
/gsd-onboard

# Then begin your first phase
/gsd-plan-phase
```

### Alternatives

**Claude Code's built-in CLAUDE.md / rules files** — The simplest approach to context management: write a detailed project description and rules file that gets loaded at session start. Works well for small projects but doesn't address context rot during long sessions. Choose this if your work is mostly single-session and doesn't span many files.

**Cursor / Windsurf workspace rules** — Similar concept to GSD Core's planning artifacts but tightly coupled to the IDE. Your context engineering lives inside the editor, not in portable files. Better choice if you exclusively use one IDE and want the tightest possible integration with its features.

**Aider** — A terminal-based AI coding tool with its own context management (repository map, chat history files). Aider is more opinionated about how you interact with the agent and has a smaller command surface. Better choice if you want a simpler, more focused tool for pair-programming-style sessions.

### Verdict

GSD Core is the most practical framework I've seen for making AI coding agents work on real projects. The context-rot problem it solves is universal — I've experienced it in every long coding session with Claude Code, and the fresh-subagent approach is the first solution that feels like engineering rather than hoping. The multi-runtime support is smart; it means you can adopt this without betting your workflow on one AI vendor. The 86-command surface is intimidating, but the namespace organization keeps it navigable, and you can ignore most of it until you need it. If you're doing anything more complex than quick one-off edits with AI agents, GSD Core is worth the setup time. The 3,100 stars in three weeks and active Discord suggest the community agrees.
