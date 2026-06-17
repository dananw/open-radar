---
name: gajae-code
description: "Gajae Code is an external coding-agent harness that enforces structured interview-plan-execute workflows with tmux-backed parallel workers and durable verification."
url: https://github.com/Yeachan-Heo/gajae-code
stars: 802
forks: 106
language: TypeScript
tags: ["ai-agents", "coding-agent", "developer-tools", "cli", "typescript"]
featured: false
publishedAt: 2026-06-17
---

## Gajae Code

### Overview

Gajae Code (`gjc`) is an external coding-agent harness that enforces a structured workflow on top of whatever AI coding tool you already use. It climbed to 800+ GitHub stars within three weeks of its late May 2026 launch, which tracks with the current appetite for tools that add discipline to AI-assisted development rather than replacing it.

The project comes from Yeachan Heo, a developer who's clearly spent time in the trenches with AI coding agents and found the default "just vibe with the model" approach lacking. Gajae Code doesn't try to be another Claude Code or Codex. Instead, it wraps around those tools and adds a workflow surface that forces you to clarify requirements before coding, plan before executing, and verify before shipping.

The core problem it solves is familiar to anyone who's used AI coding agents on real projects: the model is powerful but undisciplined. You describe a feature, the agent writes code, and you get something that sort of works but misses edge cases, misunderstands requirements, or makes architectural choices you'd never approve in a code review. Gajae Code addresses this with a three-stage pipeline — deep interview, ralplan, and ultragoal — that mirrors how experienced engineers actually work.

### Why it matters

The AI coding agent space is maturing fast. We've gone from "wow, it wrote a function" to "how do I get consistent, production-quality output from this thing?" The answer, increasingly, is structured workflows. Anthropic's own research on Claude Code showed that agents with explicit planning phases produce significantly better results than open-ended generation.

Gajae Code sits at the intersection of two trends: the rise of AI coding agents as daily development tools, and the recognition that raw model capability isn't enough without process. Tools like Aider, Cursor, and Claude Code give you the engine. Gajae Code gives you the transmission — it controls how that power gets applied.

The tmux-backed parallel worker model is particularly interesting for fullstack developers. When you're working across a React frontend and a Go backend, you often need coordinated changes in multiple codebases. Gajae Code's `team` command lets you spin up parallel workers that handle different parts of a task simultaneously, with the orchestrator managing the coordination.

### Key Features

**Deep Interview Workflow.** Before any code gets written, `gjc deep-interview` forces a structured conversation about requirements. It turns vague requests like "add authentication" into concrete specifications with edge cases, constraints, and acceptance criteria. This mirrors the intake process at well-run engineering teams and catches misunderstandings before they become wasted code.

**Ralplan Planning Phase.** After requirements are clear, `gjc ralplan` builds and critiques an implementation plan before any mutation happens. A read-only architect agent reviews the approach, identifies risks, and suggests alternatives. You approve or revise the plan before the executor touches your codebase. This is the "measure twice, cut once" of AI-assisted development.

**Ultragoal Execution with Evidence.** The `ultragoal` command tracks goals through execution, revision, verification, and completion evidence. Each goal gets a status, associated tests, and a completion receipt. You can inspect exactly what changed, what was verified, and what evidence supports the "done" claim. No more wondering whether the agent actually tested what it said it tested.

**Tmux-Backed Parallel Workers.** The `gjc team` command coordinates multiple tmux-backed workers for larger tasks. Each worker operates in its own terminal pane with isolated context. The orchestrator manages task distribution and result collection. This is useful for tasks that touch multiple files or services — like refactoring an API endpoint that has both backend and frontend implications.

**External and Non-Invasive Design.** Gajae Code runs beside your existing tools, not inside them. It doesn't patch Claude Code or Codex CLI. You start `gjc` from your repo or worktree, and it orchestrates the underlying agent through its own interface. This means you can use it with Codex CLI today and swap to a different agent tomorrow without changing your workflow.

**Isolated Worktree Support.** The `--worktree` flag creates a Git worktree for the task, giving you an isolated branch and directory for the changes. If the experiment fails, you just delete the worktree. If it succeeds, you merge the branch. This is a simple but effective risk mitigation strategy that many developers skip when working with AI agents.

**MCP and RPC Integration.** For teams building custom automation, Gajae Code exposes an MCP server (`gjc mcp-serve coordinator`) and RPC mode (`gjc --mode rpc`) that let external tools drive the workflow programmatically. This opens the door to CI/CD integration, bot-driven development, and custom orchestration scenarios.

### Use Cases

- **Feature development across multiple services** — A fullstack developer coordinating changes between a React frontend and a NestJS or Django backend uses `gjc team` to parallelize the work while keeping changes consistent.
- **Refactoring legacy code** — Before letting an AI agent restructure your codebase, run `gjc deep-interview` to document constraints and `gjc ralplan` to validate the approach. The worktree support means you can experiment safely.
- **Code review preparation** — Use the architect and critic agents to review your implementation plan before opening a PR. The structured workflow produces documentation of decisions that reviewers can reference.
- **Learning unfamiliar codebases** — The deep-interview skill works well for onboarding. Ask it to explain a module, and it'll produce structured requirements and architecture notes rather than a surface-level summary.
- **Automated testing workflows** — Combine ultragoal's verification tracking with your test suite to create AI-assisted development loops where each change is validated before the next goal starts.

### Pros and Cons

Pros:
- The structured workflow (interview → plan → execute → verify) maps directly to how experienced engineers work, producing more reliable output than open-ended AI coding sessions.
- External design means zero lock-in to any specific AI provider. Works with Codex CLI, Claude Code, OpenCode, and any tool that supports MCP or RPC.
- The worktree and tmux integration are practical engineering decisions, not marketing features. Real developers use these tools daily.

Cons:
- Beta stage with explicit warnings about rough edges. The project is three weeks old and the API surface will change.
- The workflow overhead adds friction for simple tasks. If you just need to fix a typo or add a CSS class, running through deep-interview and ralplan is overkill.
- Relies on Bun as the runtime, which is less mainstream than Node.js. The native bindings requirement (`@gajae-code/natives`) adds a build step that some developers will find annoying.

### Getting Started

```bash
# Install globally with Bun
bun install -g gajae-code

# Or use the scoped package
bun install -g @gajae-code/coding-agent

# Run in your project directory
gjc

# Use tmux-backed session for better UX
gjc --tmux

# Create an isolated worktree for risky changes
gjc --tmux --worktree my-feature-branch
```

Inside a GJC session, the workflow surface looks like this:

```bash
# Clarify requirements
/skill:deep-interview I need to add user authentication to the API

# Build and critique the plan
/skill:ralplan build implementation plan for auth

# Execute with goal tracking
gjc ultragoal create-goals --brief-file <approved-plan>
gjc ultragoal complete-goals
```

For development from source:

```bash
git clone https://github.com/Yeachan-Heo/gajae-code.git
cd gajae-code
bun install
bun run build:native
bun run dev:link
```

### Alternatives

**Aider** — A terminal-based AI coding assistant that's more mature and widely used. Aider focuses on pair programming with the model — you describe changes, it makes them, you review. It's simpler and faster for small tasks but lacks Gajae Code's structured workflow and parallel worker support. Choose Aider when you want quick, iterative edits without ceremony.

**Claude Code** — Anthropic's official coding agent with deep integration into the Claude model family. Claude Code is more polished and has better model access, but it's a single-agent tool without Gajae Code's multi-worker coordination or structured planning phases. Use Claude Code directly when your tasks are straightforward and don't need workflow discipline.

**OpenCode** — An open-source terminal coding agent with a similar philosophy to Claude Code. OpenCode is lighter weight and community-driven, but like Claude Code, it operates as a single agent without the orchestration layer that Gajae Code provides. Good choice when you want an open-source agent without the workflow overhead.

### Verdict

Gajae Code is a genuinely useful tool for developers who've been burned by undisciplined AI coding sessions. The interview-plan-execute workflow isn't just process theater — it catches real problems before they become code. At 800 stars in three weeks, it's clearly resonating with developers who've moved past the "wow" phase of AI coding and into the "how do I make this reliable" phase. The beta status and Bun dependency are real limitations, but the core idea is sound and the execution is practical. If you're using AI coding agents on anything more complex than a weekend project, Gajae Code is worth a look.
