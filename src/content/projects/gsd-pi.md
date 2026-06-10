---
name: gsd-pi
description: "Local-first coding agent CLI for planning, implementing, and verifying project work with worktree-aware Git automation and multi-provider model routing"
url: https://github.com/open-gsd/gsd-pi
stars: 561
forks: 54
language: TypeScript
tags: ["coding-agent", "cli", "project-management", "git-automation", "ai-agents"]
featured: false
publishedAt: 2026-06-10
---

## GSD Pi

### Overview

GSD Pi is a local-first coding agent that runs from your terminal. It plans work into milestones and tasks, implements code with AI assistance, verifies results, and tracks project state — all without leaving your shell. The project hit 561 stars in its first few weeks under the `open-gsd` organization, which previously shipped GSD Core and has been building developer workflow tooling since late 2025.

The core idea is straightforward: instead of bolting AI onto your editor and hoping it understands context, GSD Pi builds a structured project memory layer (stored in `.gsd/` as a local database with markdown projections) and uses that to guide every coding session. You get a terminal agent that knows your requirements, remembers past decisions, and can run autonomously through planned work — or handle a quick one-off task with `/gsd quick`.

What makes it stand out from the growing crowd of coding agents is the combination of worktree-aware Git automation and multi-provider model routing. Most agents either lock you into one LLM provider or ignore Git entirely. GSD Pi treats Git worktrees as first-class citizens, keeping implementation work isolated while preserving a reviewable main checkout. It also lets you configure different models for different phases — a cheaper model for planning, a more capable one for implementation, and so on.

### Why it matters

The coding agent space is exploding. Every week there's a new CLI tool or IDE plugin promising to write your code for you. But most of them share a common weakness: they operate in isolation. They don't track project state, don't understand your architecture decisions, and can't maintain context across sessions. You end up re-explaining your project every time you start a new coding session.

GSD Pi addresses this head-on with its local project memory system. Requirements, decisions, runtime notes, generated plans, summaries, and validation evidence all live under `.gsd/` in your project directory. This means the agent accumulates understanding over time rather than starting fresh each session. For teams working on complex fullstack applications — say a React frontend with a NestJS API backed by PostgreSQL — this persistent context is the difference between an agent that writes random code and one that writes code that actually fits your architecture.

The timing matters too. With Anthropic's Claude Opus 4.8 support just added and the Cloud MCP gateway runtime shipping in recent releases, GSD Pi is moving fast and staying current with the model landscape. It's MIT-licensed, actively developed, and has a Discord community that's growing alongside the project.

### Key Features

**Guided Terminal Agent.** Run `gsd` and you get a setup flow that walks you through provider configuration, model selection, and project onboarding. No config files to hand-edit, no API keys scattered across multiple tools. The TUI is clean and functional, with slash commands for common operations like `/gsd config`, `/gsd auto`, and `/gsd status`.

**Autonomous Project Workflow.** The `/gsd auto` command kicks off a fully autonomous session where the agent plans, implements, verifies, and advances through your work backlog. It breaks work into milestones, slices, and tasks, then processes them sequentially with verification gates between each step. This is genuinely useful for boilerplate-heavy work or well-defined feature implementations.

**Worktree-Aware Git Automation.** Each implementation task gets its own Git worktree, so your main checkout stays clean while work happens in isolation. When a task is done, the agent creates a reviewable commit. This maps directly to how many teams already work — feature branches with PRs — but automates the entire flow.

**Local Project Memory.** Everything the agent learns about your project lives in `.gsd/`. Requirements, architectural decisions, runtime notes, and validation evidence persist across sessions. This is the feature that separates GSD Pi from tools like Claude Code or Codex, which lose context when the session ends.

**Multi-Provider Model Routing.** Configure different AI providers and models for different phases of work. Use a fast, cheap model for planning and task decomposition, then switch to a more powerful model for actual code generation. The system supports Anthropic, OpenAI, and other providers through a unified configuration layer.

**Extension Surface.** GSD Pi supports project-specific commands, tools, skills, and UI integrations through bundled or community extensions. If your team has custom linting rules, deployment scripts, or domain-specific knowledge, you can encode that as extensions rather than repeating instructions in every session.

**Terminal and Web Surfaces.** The default TUI works great for most workflows, but `gsd --web` launches a visual control plane when you need a broader view of project state, task progress, or generated artifacts. Useful for reviewing what the agent did during an autonomous run.

### Use Cases

- **Fullstack feature development** — Plan a new feature across React frontend and NestJS backend, let GSD Pi implement both sides with proper Git isolation and verification
- **Refactoring campaigns** — Define refactoring milestones and let the agent work through them autonomously, maintaining context about why each change is being made
- **Onboarding new team members** — The `.gsd/` project memory serves as living documentation of architectural decisions and project requirements
- **CI/CD pipeline work** — Use the autonomous workflow to implement and verify infrastructure changes across multiple files and services
- **Multi-provider cost optimization** — Route simple tasks to cheaper models and reserve expensive ones for complex implementation work

### Pros and Cons

Pros:
- Persistent project memory across sessions means the agent actually understands your codebase over time, not just the current file
- Worktree-aware Git automation maps to real team workflows — no more cleaning up messy agent-generated branches
- Multi-provider routing lets you optimize for cost and quality on a per-phase basis
- MIT license and active development with Claude Opus 4.8 support already shipped

Cons:
- Terminal-first workflow means there's a learning curve for developers who prefer GUI-based tools — the web UI helps but isn't the primary interface
- Autonomous mode works best for well-defined tasks; vague or exploratory work still needs heavy human guidance
- The `.gsd/` directory adds project overhead and needs team agreement on whether to commit it to version control
- Relatively young project (1.0.0 baseline just started) so the extension ecosystem is still thin

### Getting Started

```bash
# Install with the guided installer
npx @opengsd/gsd-pi@latest

# Or install globally with npm
npm install -g @opengsd/gsd-pi@latest

# Navigate to your project and start GSD
cd your-project
gsd

# Inside the GSD session:
/gsd config          # Configure your AI provider
/gsd auto            # Start autonomous workflow
/gsd quick "Add a health check endpoint to the NestJS API"
/gsd status          # Check current project state

# Launch the web UI
gsd --web
```

### Alternatives

**Claude Code** — Anthropic's own CLI coding agent is the most direct comparison. It's deeply integrated with Claude models and has excellent code understanding. However, it doesn't persist project memory across sessions or provide structured project planning. Choose Claude Code when you want raw coding power in the moment; choose GSD Pi when you want a system that tracks and plans work over days or weeks.

**Aider** — A popular open-source pair programming tool that works with multiple LLM providers. Aider excels at targeted file edits with good Git integration. GSD Pi goes further with autonomous workflow, project memory, and milestone-based planning. Pick Aider if you want a focused pair programmer; pick GSD Pi if you want an agent that can own an entire feature from planning to verification.

**Codex CLI** — OpenAI's terminal coding agent is fast and well-integrated with GPT models. It handles one-shot tasks well but lacks the persistent project context and structured workflow that GSD Pi provides. Use Codex CLI for quick tasks; use GSD Pi when you need the agent to understand your project's history and work through a backlog.

### Verdict

GSD Pi fills a real gap in the coding agent landscape. Most tools optimize for the five-minute coding session — type a prompt, get code, move on. GSD Pi is built for the five-day project. Its persistent memory, structured planning, and worktree-aware Git automation make it the most serious attempt at an autonomous coding agent that actually works in team environments. At 561 stars and climbing, with MIT licensing and Claude Opus 4.8 support already in place, it's worth watching closely. If you're a fullstack developer who's tired of re-explaining your project to every new coding session, GSD Pi is the tool to try right now.
