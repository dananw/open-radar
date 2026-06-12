---
name: agent-deck
description: "Terminal session manager for AI coding agents — one TUI to orchestrate Claude Code, Gemini, OpenCode, Codex, and more from a single interface."
url: https://github.com/asheshgoplani/agent-deck
stars: 2695
forks: 324
language: Go
tags: ["ai-agents", "terminal", "developer-tools", "session-manager", "tui"]
featured: false
publishedAt: 2026-06-12
---

## Agent Deck

### Overview

Agent Deck is a terminal-based session manager that brings all your AI coding agents under one roof. Built in Go with the Bubble Tea TUI framework, it gives you a single dashboard to monitor, switch between, and orchestrate sessions running Claude Code, Gemini CLI, OpenCode, Codex, Aider, and other AI coding tools. At 2,695 stars and 324 forks since its December 2025 launch, it's one of the fastest-growing developer tools in the AI agent orchestration space.

The project is maintained by asheshgoplani, a developer who clearly spends a lot of time juggling multiple AI agents — because that's exactly the pain point this tool solves. If you've ever had six terminal tabs open, each running a different AI coding session across different projects, you know the chaos. Agent Deck replaces that mess with a clean TUI that shows every session's status at a glance and lets you jump between them with a single keystroke.

The core problem is straightforward: AI coding agents have become cheap and abundant enough that developers routinely run multiple sessions simultaneously. Claude Code on your frontend, OpenCode on your backend, a Codex session doing research — and maybe a Gemini CLI session for good luck. Managing all of these through tmux or iTerm tabs is brittle and disorienting. Agent Deck treats this as a first-class workflow problem and solves it with purpose-built tooling.

### Why it matters

The AI coding agent ecosystem is fragmenting fast. There's no single "best" agent — Claude Code excels at some tasks, Codex at others, Gemini has its strengths. Smart developers are using multiple agents in parallel, picking the right tool for each job. But the tooling to manage this multi-agent workflow hasn't caught up.

Agent Deck fills that gap. It's the tmux of AI agents — not a replacement for any individual agent, but the orchestration layer that makes running five of them practical. The Conductor feature, which lets a supervising agent session monitor and route questions from child sessions to your phone via Telegram, is genuinely clever. It means you can fire off tasks to multiple agents, walk away, and get notified only when something needs your attention.

This is part of a broader trend: as AI agents get more capable, the bottleneck shifts from "can the agent do the work?" to "can I manage the agents efficiently?" Agent Deck is one of the first tools to attack that second problem directly.

### Key Features

**Session Management with Live Status.** The TUI shows every running AI session with real-time status indicators — running, waiting, idle, or completed. You see the full picture the moment you open it. No more alt-tabbing through terminal windows trying to remember which agent is working on what.

**Session Forking.** Press `f` to fork any session and try a different approach without losing context. Each fork inherits the parent's full conversation history through the agent's native fork support. Fork your forks — explore as many branches as you need. This works with Claude Code, OpenCode, Codex, and other supported agents.

**Conductor Orchestration.** The standout feature. Set up a "conductor" session that supervises all your other agent sessions. It answers routine questions automatically, escalates the interesting ones to your phone via Telegram, Slack, or Discord, and never lets a waiting worker sit idle. Five minutes from zero to a bot that watches every Claude session you have running.

**MCP Server Manager.** Attach and detach MCP servers without touching config files. Need web search or browser automation for a specific session? Toggle it on per project or globally. Agent Deck handles the restart automatically. Press `m` to open the manager, `Space` to toggle, `Tab` to cycle scope.

**Skills Manager for Claude.** Manage Claude skills per project with a pool-based workflow. Define your skills once in a central pool directory, then attach or detach them per session. The manager writes project state to `.agent-deck/skills.toml` and materializes into `.claude/skills` — clean, deterministic, version-controllable.

**Per-Group Configuration.** Different agent groups can use different Claude accounts, environment variables, and config directories. Run your work sessions against one Claude account and personal sessions against another, all from the same Agent Deck instance. The precedence chain (env → group → profile → global → default) is well-documented and predictable.

**Watcher Integrations.** Add "doorbells" so external events — GitHub webhooks, Gmail notifications, ntfy pushes, calendar events — can wake up the conductor. This turns your agent fleet from a manual operation into a semi-autonomous system that reacts to the world.

### Use Cases

- **Multi-project development** — Running Claude Code on your React frontend, OpenCode on your NestJS API, and Codex on a Python data pipeline? Agent Deck shows all three in one view with instant switching.

- **Async task delegation** — Fire off refactoring tasks to three different agents across different codebases, walk away, and get Telegram notifications when each one finishes or needs input.

- **Team coordination** — Multiple developers sharing an agent fleet through a self-hosted conductor, with Slack integration for visibility into what the agents are doing.

- **Research and experimentation** — Fork a Claude session to try three different architectural approaches simultaneously, compare results, then merge the best one back.

- **CI/CD integration** — Use watchers to trigger agent sessions on GitHub events — PR opened, issue created — and have the conductor route the work to available agents.

### Pros and Cons

Pros:
- Solves a real, increasingly common problem. If you run more than one AI agent regularly, this tool immediately saves time and mental overhead.
- The Conductor pattern is genuinely innovative. Phone notifications for agent status changes means you can actually step away from your desk while agents work.
- Go binary with no runtime dependencies. Install once, works everywhere — macOS, Linux, WSL.
- Active development with frequent releases. The project hit 2,695 stars in six months and the Discord community is growing.

Cons:
- Tmux dependency under the hood. Agent Deck manages tmux sessions internally, which adds a layer of abstraction that can occasionally cause confusion when things go wrong.
- Conductor setup has a learning curve. The Telegram bot wiring, watcher configuration, and channel topology concepts take time to understand properly.
- Primarily optimized for Claude Code. Other agents (Gemini, Codex, OpenCode) work but with fewer features — forking, for instance, requires native CLI support that not all agents provide.
- No Windows native support. WSL works, but if you're on bare Windows without WSL, you're out of luck.

### Getting Started

```bash
# Install via Go (requires Go 1.24+)
go install github.com/asheshgoplani/agent-deck@latest

# Or download a pre-built binary from GitHub releases
# https://github.com/asheshgoplani/agent-deck/releases

# Launch the TUI
agent-deck

# Start a new session
agent-deck session start my-project

# Set up a conductor fleet (interactive wizard)
agent-deck conductor setup work --description "My work fleet"

# Start the conductor
agent-deck session start conductor-work

# Check conductor status via Telegram bot
# /status
```

### Alternatives

**tmux + custom scripts** — The DIY approach. You can rig up tmux sessions with custom status bars and hotkeys to manage multiple agents. It works, but you're building and maintaining the orchestration layer yourself. Choose this if you already have a mature tmux workflow and only run two or three agents.

**Zellij** — A modern terminal multiplexer with a plugin ecosystem that could theoretically handle multi-agent management. It's more general-purpose than Agent Deck and doesn't understand AI agent sessions natively. Choose Zellij if you want a single terminal tool for everything, not just agent management.

**Plain terminal tabs (iTerm2 / Warp)** — The default approach most developers use today. Tab per agent, manual switching. Works fine for one or two agents, falls apart at three or more. No cross-session visibility, no notifications, no orchestration. This is what Agent Deck replaces.

### Verdict

Agent Deck is the tool I didn't know I needed until I tried it. If you're running two or more AI coding agents — and in mid-2026, most serious developers are — this is the orchestration layer that makes it sustainable. The Conductor feature alone justifies the installation: being able to fire off tasks to multiple agents and get phone notifications when they need attention is a genuine workflow upgrade. The 2,695 stars in six months reflect real demand, not hype. It's not perfect — the tmux dependency adds fragility, and non-Claude agents get second-class treatment — but it's the best available solution to a problem that's only getting more pressing as the AI agent ecosystem fragments further. Install it, run the conductor setup wizard, and you'll wonder how you ever managed agents without it.
