---
name: paseo
description: "Paseo is an open-source coding agent interface that lets you run Claude Code, Codex, Copilot, and more from your phone, desktop, or CLI — with parallel agent orchestration."
url: https://github.com/getpaseo/paseo
stars: 7202
forks: 702
language: TypeScript
tags: ["coding-agents", "cli", "developer-tools", "typescript", "orchestration"]
featured: false
publishedAt: 2026-06-03
---

## Paseo

### Overview

Paseo is an open-source coding agent interface that unifies Claude Code, OpenAI Codex, GitHub Copilot, OpenCode, and Pi into a single cross-device experience. With 7,200 GitHub stars and 702 forks as of early June 2026, it has become one of the fastest-growing developer tools of the year. The core idea is simple but powerful: run coding agents in parallel on your own machines, manage them from your phone or desktop, and keep your full dev environment intact.

The project is maintained by Boudra (@moboudra on GitHub), who has pushed over 3,400 commits to the repository alone. The project launched in October 2025 and has been releasing updates at a furious pace — version 0.1.89 dropped on June 2, 2026, with releases nearly every other day. That velocity, combined with the monorepo architecture covering server, desktop (Electron), mobile (Expo/React Native), CLI, and a relay for remote connectivity, suggests a developer who is both shipping fast and thinking about the long-term architecture.

The problem Paseo solves is one every developer using AI coding agents has felt: fragmentation. Claude Code runs in one terminal. Codex runs in another. Copilot has its own CLI. Each has different authentication, different interfaces, different capabilities. You end up with five terminal tabs, each with its own context, and no way to coordinate between them. Paseo collapses all of that into one interface — and adds parallel execution, voice control, and cross-device access that none of the individual agents provide on their own.

### Why it matters

The coding agent space in 2026 is exploding. Every major AI provider has shipped a CLI agent: Anthropic has Claude Code, OpenAI has Codex, GitHub has Copilot CLI, and smaller players like OpenCode and Pi are carving out niches. The problem is that developers don't want to bet on one provider. Different agents excel at different tasks — Claude Code is strong at architectural decisions, Codex is fast at implementation, Copilot integrates tightly with GitHub workflows. The winning strategy is orchestration, not allegiance.

Paseo is the first serious attempt at that orchestration layer. It treats coding agents as interchangeable workers that can be dispatched, monitored, and coordinated through a unified interface. The skills system — where you can teach Paseo to hand off work between agents, run verification loops, or form multi-agent committees — is particularly forward-looking. It's the kind of abstraction that makes sense once you accept that the agent landscape will remain fragmented for years.

The cross-device angle is equally important. The ability to kick off a coding task from your desktop, check its progress from your phone on the train, and script batch operations from the terminal isn't a gimmick. For developers who run long-running agent tasks (refactoring, test generation, codebase analysis), the ability to monitor and intervene from any device is a genuine productivity multiplier.

### Key Features

**Multi-Provider Agent Orchestration.** Paseo supports Claude Code, Codex, Copilot, OpenCode, and Pi through a single interface. You can run different providers in parallel, choosing the right model for each task. Want Claude to plan the architecture and Codex to implement it? Paseo handles the dispatch and coordination. This is the feature that makes the whole project matter — no other tool offers this level of provider flexibility.

**Cross-Device Experience.** The project ships as a desktop app (Electron), mobile app (Expo for iOS and Android), web app, and CLI. A local daemon manages agent processes, and any client can connect to it. You can start a task at your desk, check progress from your phone, and script automation from the terminal. The relay package even enables remote connectivity to your home machine from anywhere.

**Voice Control.** Paseo includes voice mode for dictating tasks and talking through problems hands-free. This is more practical than it sounds — when you're debugging a complex issue, being able to describe the problem out loud while your hands stay on the keyboard (or while you're away from your desk) is surprisingly useful.

**Skills and Agent Protocols.** The skills system lets you define reusable workflows that orchestrate multiple agents. Built-in skills include `paseo-handoff` (delegate work between agents), `paseo-loop` (run agents against acceptance criteria with a verifier), `paseo-advisor` (get a second opinion from a different agent), and `paseo-committee` (form a multi-agent committee for root cause analysis). You can also teach Paseo to orchestrate other agents via `npx skills add`.

**Parallel Agent Execution.** Run multiple agents simultaneously on different tasks, each in its own worktree. The `paseo run --worktree feature-x` pattern means agents can work on separate branches without conflicts. The `paseo ls` command shows all running agents, and `paseo attach` lets you stream live output from any of them.

**Self-Hosted and Privacy-First.** Agents run on your machine with your full dev environment — your tools, your configs, your skills. There's no telemetry, no tracking, and no forced login. The relay component (including a community Go implementation at `paseo-relay`) lets you expose your daemon to the internet for remote access without giving up control.

**Built-in MCP Server.** Paseo includes a Model Context Protocol server, making it compatible with the growing ecosystem of MCP-aware tools and AI assistants. This positions it as more than just a GUI wrapper — it's a programmable agent orchestration platform that other tools can integrate with.

### Use Cases

- **Full-stack development with mixed agents** — Use Claude Code for architectural planning and code review, Codex for rapid implementation, and Copilot for GitHub-integrated workflows, all coordinated through one interface with parallel execution.

- **Remote code management** — Start a complex refactoring task from your desktop, monitor progress and handle issues from your phone while away from your desk. The relay enables secure remote connectivity.

- **Automated code review pipelines** — Use the CLI to script agent workflows: run Codex to implement a feature, then Claude Code to review it, then Copilot to open the PR. Chain agents together programmatically.

- **Multi-agent problem solving** — Use the committee skill to have two different agents debate the best approach to a hard problem. Get contrasting perspectives before committing to an implementation strategy.

- **Long-running batch operations** — Run test generation, dependency updates, or codebase migrations as background agent tasks. Monitor from any device and intervene when needed.

### Pros and Cons

Pros:
- The only tool that unifies all major coding agents (Claude Code, Codex, Copilot, OpenCode, Pi) in a single interface with parallel execution. No competitor offers this breadth of provider support.
- The cross-device experience is genuinely useful, not just a marketing feature. Starting tasks from desktop and monitoring from phone is a real workflow improvement for long-running agent operations.
- Extremely active development with releases every 1-2 days. The maintainer has 3,400+ commits, suggesting sustained commitment rather than a flash-in-the-pan project.

Cons:
- Still early — version 0.1.89 means the API and features are likely to change. The license is listed as NOASSERTION rather than a clean MIT or Apache, which may concern some organizations.
- Requires each agent CLI to be installed and configured separately. Paseo orchestrates existing tools rather than replacing them, so you still need Claude Code, Codex, etc. set up with their own credentials.
- The mobile app uses Expo/React Native, which is a solid choice for cross-platform but means the mobile experience may lag behind native quality. The Electron desktop app adds memory overhead that some developers will notice.

### Getting Started

```bash
# Install the CLI
npm install -g @getpaseo/cli

# Start the daemon (shows a QR code for mobile connection)
paseo

# Run a task with a specific provider
paseo run --provider claude/opus-4.6 "implement user authentication"
paseo run --provider codex/gpt-5.4 --worktree feature-x "implement feature X"

# List running agents
paseo ls

# Stream live output from a specific agent
paseo attach abc123

# Send a follow-up task to a running agent
paseo send abc123 "also add tests"

# Run on a remote daemon
paseo --host workstation.local:6767 run "run the full test suite"
```

Or download the desktop app from [paseo.sh/download](https://paseo.sh/download) — the daemon starts automatically. Scan the QR code in Settings to connect your phone.

Install skills for agent orchestration:

```bash
npx skills add getpaseo/paseo
```

### Alternatives

**Continue** — An open-source AI code assistant that integrates directly into VS Code and JetBrains IDEs. Continue focuses on in-editor AI assistance rather than agent orchestration. Choose it if you want AI help inside your IDE without leaving your editor, rather than managing standalone coding agents.

**Aider** — A command-line coding agent that works with multiple LLM providers (Claude, GPT-4, Gemini). Aider is more mature for pure pair-programming workflows and has excellent git integration. Choose it if you primarily work in a single terminal session and want a refined pair-programming experience rather than multi-device orchestration.

**Cline** — A VS Code extension that runs coding agents with file editing, terminal access, and browser automation. Cline is more tightly integrated with the VS Code ecosystem and has a large community. Choose it if you want a GUI-first agent experience inside your editor rather than a standalone orchestration platform.

### Verdict

Paseo is the most compelling agent orchestration tool I've seen in 2026. The multi-provider support alone sets it apart — while every other tool either picks one LLM or offers limited provider switching, Paseo treats all major coding agents as first-class citizens and adds real orchestration patterns on top. The skills system (handoff, loops, committees) points toward a future where developers routinely use 3-4 different agents for different stages of their workflow. The 7,200 stars and daily releases suggest the community agrees. It's early, rough in places, and the API will change — but for developers who are already using multiple coding agents and want a unified interface with cross-device access, Paseo is the tool to evaluate right now.
