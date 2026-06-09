---
name: crew44
description: "Crew44 is a local-first Go + React orchestrator that turns your AI coding agents into coordinated specialist teams. MIT license, zero telemetry."
url: https://github.com/getcrew44/crew44
stars: 304
forks: 18
language: Go
tags: ["ai-agents", "multi-agent", "go", "react", "developer-tools"]
featured: false
publishedAt: 2026-06-09
---

## Crew44

### Overview

Crew44 is a local-first orchestrator that turns the AI coding agents you already run — Claude Code, Codex, Gemini CLI, Cursor, and about a dozen others — into a coordinated team of specialists. Instead of one generalist agent re-explaining your codebase every morning, you assemble named personas, bind each to the model that performs best for its role, and let them hand work off to each other inside one shared workspace.

The project launched on May 15, 2026 and crossed 300 GitHub stars within three weeks. That's modest compared to the 60,000-star mega-repos, but the growth curve is steep for a tool in a niche that barely existed six months ago: multi-agent orchestration for everyday development workflows. The architecture is a Go daemon (handling runtime discovery, agent state, and a JSON-RPC API) paired with a React 19 Electron frontend and an Expo mobile companion app. Everything is MIT-licensed and free.

The core problem Crew44 solves is the fragmentation of AI coding tools. If you use Claude Code for planning, Codex for implementation, and a local model for code review, you're managing three separate contexts, three separate skill sets, and three separate memory systems. Skills don't compound across providers. Monday's context is gone by Tuesday. Crew44 collapses that into a single workspace where agents share project memory, hand off tasks with one-line briefs, and run on whichever model makes sense for each role.

### Why it matters

The AI coding agent space has exploded in 2026. Claude Code, Codex, Cursor Agent, Gemini CLI, OpenCode, and a dozen others are all competing for developer attention. But they all share the same fundamental limitation: they're single-agent systems. You get one context window, one model, one skill set per session. For anything beyond a simple task, you end up copy-pasting context between tools or settling for a generalist that's mediocre at everything.

Crew44 is one of the first serious attempts to solve this with a local-first, multi-agent architecture. The idea is borrowed from enterprise agent frameworks like CrewAI and LangGraph, but stripped down to what individual developers actually need: a desktop app that discovers your installed agents, lets you assign roles and models, and manages the handoffs between them. No cloud account, no subscription, no vendor lock-in. State is plain files under `~/.crew44/`.

This connects to a broader shift in how developers think about AI tools. The "one agent to rule them all" approach is giving way to specialization. Research from late 2025 showed that multi-agent systems outperform single agents on complex coding tasks by 30-40% when each agent is optimized for its role. Crew44 brings that pattern to your local machine without requiring you to write orchestration code yourself.

### Key Features

**Multi-Runtime Agent Discovery.** Crew44 scans your system for installed coding agent CLIs and presents them in a picker. It currently supports Claude Code, Codex, Cursor Agent, Gemini CLI, Hermes, Kimi, OpenCode, OpenClaw, Pi, Qoder, and Qwen Code. The runtime layer is a Go interface, so adding a new agent means writing a small adapter under `daemon/internal/backendagent/`. This isn't a walled garden — it's designed to work with whatever you already have installed.

**Per-Project Persistent Memory.** Each project gets its own memory space that survives across sessions. When an agent figures out your codebase conventions, naming patterns, or architecture decisions on Monday, that knowledge is still there on Thursday. Memory is stored as plain files, not in some opaque cloud service you can't inspect or export.

**Compounding Skills System.** Skills are markdown files (`SKILL.md` plus optional assets) that define reusable workflows. Write a skill once, attach it to any agent, and it persists across providers. Switch from Claude Code to Codex mid-project? Your skills come with you. This solves one of the most annoying aspects of the current AI tooling landscape: having to re-teach every new agent the same things.

**Role-Based Specialist Delegation.** The default crew ships with a Partner (planning), an Engineer (implementation), a Product Lead (requirements), and a Designer (UI/UX). Each role is bound to a specific model — Opus for planning, GPT-5.5 for coding, a local model for review. You can customize roles, swap models per task, and define handover rules. The planner drafts while the builder codes while the reviewer checks, all in parallel.

**Handover Protocol.** When one agent finishes its part, it emits a handover marker with a one-line brief for the next agent. This is the coordination primitive that makes multi-agent workflows practical. Without it, you're just running separate agents in sequence and manually shuttling context between them. The handover includes just enough context for the receiving agent to pick up without re-reading the entire conversation.

**Go Daemon with WebSocket JSON-RPC.** The backend is a single Go binary that owns runtime discovery, agent state, and the API surface. Communication happens over WebSocket with a JSON-RPC protocol. Auth is a per-launch bearer token; only `/health` is unauthenticated. The daemon can run headless for CI/CD pipelines or paired with the Electron UI for interactive development.

**Mobile Companion with Encrypted Tunneling.** An Expo-based mobile app lets you monitor and nudge your running crew from your phone. The pairing uses an end-to-end encrypted Noise protocol tunnel through a small relay server. The relay only sees ciphertext — you can self-host it if you prefer. This is a nice touch for checking on long-running agent tasks without being tethered to your desk.

### Use Cases

- **Fullstack development teams** — Assign frontend work to a Claude Code agent with React skills and backend logic to a Codex agent with your NestJS or Django conventions baked in. The handover protocol keeps them synchronized without manual context passing.

- **Code review pipelines** — Run an Engineer agent for implementation and a separate Reviewer agent on a different model (or a local model to save costs) that checks every commit. The reviewer gets the Engineer's context through the handover system.

- **Solo developers juggling multiple AI tools** — If you switch between Claude Code, Codex, and Gemini CLI depending on the task, Crew44 gives you a single workspace with shared memory. No more re-explaining your project to each tool.

- **Long-running refactoring tasks** — Set up a Planner agent to break down a large refactor, an Engineer to execute each piece, and a QA agent to verify. Monitor progress from your phone via the mobile app.

- **AI-assisted prototyping** — Use the Designer role with a fast model to generate UI mockups, hand off to the Engineer role with a capable model to implement, and have the Partner role review the result. Three specialists, one workflow.

### Pros and Cons

Pros:
- Local-first architecture with zero telemetry means your code and context never leave your machine. State is plain files you can inspect, version, and export at any time.
- The multi-runtime approach avoids vendor lock-in. You're not betting on one AI provider — you can swap models and agents as the landscape evolves.
- Skills that persist across providers solve a real pain point. Writing a `SKILL.md` once and having it work with Claude Code, Codex, and Gemini CLI is genuinely useful.
- The Go daemon is lightweight and composable. It can run headless in CI or paired with the Electron UI, fitting into different workflow styles.

Cons:
- At 304 stars and a June 2026 launch, this is early-stage software. Expect rough edges, incomplete documentation, and API changes as the project matures.
- Multi-agent coordination adds complexity. For simple tasks, running a single Claude Code session is faster and more predictable than orchestrating a crew.
- The mobile companion requires a relay server for NAT traversal. While the payload is encrypted, some teams may not want any external dependency, even a relay.
- Model cost multiplies with each agent. Running Opus for planning, GPT-5.5 for coding, and a local model for review is powerful but expensive compared to a single-agent approach.

### Getting Started

```bash
# Clone the repository
git clone https://github.com/getcrew44/crew44.git
cd crew44

# Install dependencies (requires Node.js 20+ and Go 1.26+)
npm install

# Run in development mode (builds Go daemon, starts Vite + Electron)
npm run dev

# Or build for production
npm run build

# Run tests
npm run test

# Run the web version without Electron
npm run web:dev
```

You'll need at least one coding agent CLI installed (Claude Code, Codex, Cursor, Gemini CLI, etc.). Crew44 auto-detects installed agents on startup. State is stored under `~/.crew44/` by default, configurable via the `CREW44_STATE_DIR` environment variable.

### Alternatives

**CrewAI** — The Python-based multi-agent framework that popularized the "crew" metaphor for AI agents. CrewAI is more mature and has a larger community, but it's a framework you code against, not a desktop app you install. Choose CrewAI when you need custom orchestration logic and don't mind writing Python. Choose Crew44 when you want a ready-made UI that works with your existing coding agent CLIs.

**Claude Code Multi-Agent** — Anthropic's own approach to multi-agent workflows, where Claude Code sessions can spawn sub-agents. This is tightly integrated with Claude's ecosystem and works well for Claude-native workflows. But it locks you into one provider. Choose Claude Code's built-in multi-agent when you're all-in on Anthropic. Choose Crew44 when you use multiple providers and want shared memory across them.

**OpenCode** — An open-source coding agent CLI that supports multiple LLM backends. OpenCode is a single-agent tool with provider flexibility, whereas Crew44 is an orchestrator that runs multiple agents in parallel. They're complementary — Crew44 can use OpenCode as one of its runtimes. Choose OpenCode when you want one flexible agent. Choose Crew44 when you want to coordinate several.

### Verdict

Crew44 is the most interesting multi-agent orchestration tool I've seen for individual developers. The "one generalist agent" approach is hitting its ceiling, and Crew44's model of specialist agents with shared memory and handover protocols feels like the natural next step. The Go + React architecture is solid, the local-first philosophy is refreshing in an era of cloud-everything, and the multi-runtime support means you're not betting the farm on any single AI provider.

It's early days — 304 stars and a few weeks old — but the design decisions are sound. Plain-file state, a composable Go daemon, skills that travel across providers, and end-to-end encrypted mobile pairing show a team that understands what developers actually care about. If you're already juggling multiple AI coding tools and feeling the friction of disconnected contexts, Crew44 is worth a serious look. The MIT license means there's zero risk in trying it.
