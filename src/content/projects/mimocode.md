---
name: mimocode
description: "MiMoCode is Xiaomi's open-source terminal AI coding agent with cross-session memory, subagent orchestration, and self-improving workflows."
url: https://github.com/XiaomiMiMo/MiMo-Code
stars: 1793
forks: 132
language: TypeScript
tags: ["ai-agent", "coding-agent", "terminal", "memory", "developer-tools"]
featured: false
publishedAt: 2026-06-11
---

## MiMoCode

### Overview

MiMoCode launched on June 10, 2026 and hit nearly 1,800 GitHub stars within 24 hours. That's fast, even by the current AI tooling gold rush standards. It's a terminal-native AI coding agent built by Xiaomi's MiMo team — the same group behind the MiMo language models — and it makes a specific bet: the biggest problem with coding agents isn't code generation quality, it's memory.

The project is a fork of OpenCode, the open-source terminal coding assistant that already supported multiple LLM providers, a TUI, LSP integration, and MCP servers. MiMoCode keeps all of that and layers on persistent cross-session memory, a subagent orchestration system, goal-driven autonomous loops, and a self-improvement mechanism called Dream & Distill. The result is a coding agent that doesn't start from scratch every time you open a new terminal.

What makes the Xiaomi backing significant is the resource play. MiMo Auto is baked in as a free-for-limited-time model channel — you can install and run MiMoCode with zero configuration and no API key. That lowers the barrier to entry dramatically compared to Claude Code or Cursor, which require paid API access or subscriptions from minute one. The tool also supports importing Claude Code authentication directly, so switching is frictionless.

### Why it matters

The coding agent space in mid-2026 is crowded. Claude Code, Cursor, Windsurf, GitHub Copilot, OpenCode, Aider — the list keeps growing. But most of these tools share a fundamental limitation: they treat each session as isolated. You start a conversation, the agent helps you, and when you close the terminal, that context disappears. You end up re-explaining your architecture, your conventions, your project's quirks every single time.

MiMoCode addresses this head-on with a SQLite FTS5-powered memory system that persists across sessions. The agent maintains project-level knowledge (MEMORY.md), session checkpoints, task progress logs, and scratch notes. When you resume work, the memory is injected automatically. The agent already knows your codebase's architecture, your team's conventions, and what you were working on last.

This matters because long-running coding tasks — refactors, migrations, multi-feature implementations — rarely finish in one session. The agents that can maintain context across sessions will produce dramatically better results than those that can't. MiMoCode's architecture is designed around this reality.

### Key Features

**Persistent Cross-Session Memory.** The memory system stores project knowledge, session checkpoints, and task progress in structured markdown files indexed by SQLite FTS5. When you resume a session, the agent reconstructs its understanding from MEMORY.md, the latest checkpoint, task logs, and recent messages — without you having to explain anything. This is the single most important feature distinguishing MiMoCode from Claude Code and similar tools.

**Three-Agent Architecture.** MiMoCode runs three primary agents you can switch between with Tab: build (full tool permissions for active development), plan (read-only mode for code exploration and solution design), and compose (orchestration mode for specs-driven workflows). The plan agent is particularly useful — you can explore a codebase and design solutions without worrying about accidental modifications.

**Subagent System.** The primary agent can spawn subagents on demand that share the current session context and work in parallel. Each subagent has lifecycle tracking, cancellation support, and background execution. This means the agent can break complex tasks into parallel workstreams — something most single-agent coding tools can't do.

**Goal-Driven Autonomous Loops.** The `/goal` command sets a stopping condition for a session. When the agent tries to stop, an independent judge model evaluates the conversation to determine whether the goal is actually met. This prevents the premature "optimistic stops" that plague autonomous coding agents — where the agent declares success before the work is actually done.

**Dream & Distill.** Two self-improvement commands that make the agent better over time. `/dream` scans recent session traces, extracts persistent knowledge into project memory, and prunes outdated entries. `/distill` identifies repeated manual workflows and packages high-confidence candidates into reusable skills, subagents, or commands. The agent literally learns from your work patterns.

**Compose Mode for Specs-Driven Development.** Compose mode orchestrates the full lifecycle from specification to shipped code. It includes built-in skills for planning, execution, code review, TDD, debugging, verification, and merging. This is the workflow for teams that write specs before code — the agent becomes an implementation engine that follows your architectural decisions.

**Voice Input with Real-Time Transcription.** Activate with `/voice` and speak naturally. Audio is segmented by pauses and transcribed incrementally using TenVAD and MiMo ASR. It's a niche feature, but for developers who think faster than they type — or who want to describe architectural decisions verbally while reviewing code — it's genuinely useful.

### Use Cases

- **Long-running refactoring projects** — The cross-session memory means you can tackle a large refactor across multiple days without re-explaining the codebase structure each time. The task tracking system (T1, T1.1, T1.2...) preserves progress between sessions.

- **Specs-driven feature development** — Write a specification, hand it to Compose mode, and let the agent orchestrate planning, implementation, testing, and code review. Best for teams with clear architectural guidelines.

- **Codebase exploration and onboarding** — The plan agent (read-only) is perfect for understanding unfamiliar codebases. Pair it with the memory system and the agent accumulates project knowledge that persists.

- **Autonomous background tasks** — Set a goal, let the agent run with subagents working in parallel, and check back when it's done. The judge model prevents false-positive completions.

- **Free-tier AI coding assistance** — MiMo Auto provides free access (for a limited time) with zero configuration. Good for developers who want AI coding help without committing to Claude or OpenAI API costs.

### Pros and Cons

Pros:

- Cross-session memory is a genuine differentiator. No other open-source terminal coding agent does this as thoroughly. The SQLite FTS5 indexing means memory retrieval is fast even as project knowledge grows.

- The free tier via MiMo Auto removes the biggest friction point for trying a new coding agent. Install and run with no API key, no subscription, no credit card.

- Three-agent architecture with Tab switching is a clean UX pattern. The read-only plan agent solves the problem of accidentally modifying code during exploration.

- Subagent orchestration with parallel execution is a real technical advantage for complex tasks that can be decomposed.

- Built on OpenCode's mature foundation — LSP integration, MCP server support, multiple provider support — so the base is solid.

Cons:

- One day old. The project has 116 open issues as of launch day, which is expected for a 0.x release but means you'll hit rough edges. The API surface and memory format are almost certainly going to change.

- Xiaomi's involvement raises questions about long-term governance and data handling. The free MiMo Auto channel sends your code to Xiaomi's servers. For proprietary codebases, you'll want to use a custom provider.

- The Dream & Distill self-improvement features sound impressive but lack independent benchmarks. It's unclear how much they actually improve output quality versus just adding overhead.

- Documentation is sparse beyond the README. The Compose mode and subagent system are complex features that need detailed guides and examples.

### Getting Started

```bash
# One-line install
curl -fsSL https://mimo.xiaomi.com/install | bash

# Or install via npm
npm install -g @mimo-ai/cli

# First launch — guides you through configuration
mimocode

# Import existing Claude Code auth
mimocode auth import claude

# Start in compose mode for specs-driven development
mimocode --agent compose

# Set a goal for autonomous work
/goal Implement the user authentication module with JWT tokens

# Activate voice input
/voice
```

Configuration lives in `.mimocode/mimocode.json` per project or `~/.config/mimocode/mimocode.json` globally. Key settings include provider selection, agent permissions, checkpoint behavior, and MCP server connections.

### Alternatives

**Claude Code** — Anthropic's terminal coding agent is the current gold standard for code generation quality, backed by Claude's models. It lacks persistent cross-session memory, so each session starts fresh. Better choice when raw code quality matters most and you don't mind re-explaining context between sessions. Also significantly more expensive.

**OpenCode** — The project MiMoCode forked from. OpenCode is a solid terminal coding agent with multiple provider support, a TUI, LSP integration, and MCP servers. It lacks the memory system, subagent orchestration, and self-improvement features. Better choice if you want a simpler, more stable tool without Xiaomi dependencies.

**Aider** — A well-established open-source pair programming tool that works with any LLM. Aider has a strong track record and larger community but treats sessions as isolated. It's more mature and better documented, making it a safer bet for production use today.

### Verdict

MiMoCode is the most interesting coding agent architecture I've seen since Claude Code launched. The persistent memory system solves a real problem that every developer using AI coding tools has experienced — the constant re-explanation of project context. The three-agent architecture and subagent orchestration add genuine capability beyond what OpenCode offered.

The risk is obvious: it's one day old, backed by Xiaomi (which creates governance and data privacy questions), and the self-improvement features are unproven in the wild. But 1,800 stars in 24 hours tells you the developer community sees the same potential in the architecture that I do. If you're comfortable running a 0.x coding agent and you want to try the cross-session memory approach, MiMoCode is worth installing today. For production-critical work, stick with Claude Code or Aider for another few months and revisit.
