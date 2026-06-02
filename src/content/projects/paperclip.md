---
name: paperclip
description: "Paperclip is an open-source AI agent orchestration platform that lets you run teams of AI agents like a real company — with org charts, budgets, goals, and governance."
url: https://github.com/paperclipai/paperclip
stars: 68754
forks: 12733
language: TypeScript
tags: ["ai-agents", "orchestration", "typescript", "react", "open-source"]
featured: false
publishedAt: 2026-06-02
---

## Paperclip

### Overview

Paperclip is an open-source platform for orchestrating teams of AI agents. Think of it as a company management layer that sits on top of your existing agents — Claude Code, Codex, Cursor, OpenClaw, or anything else that can receive a heartbeat. It launched in March 2026 and crossed 68,000 GitHub stars in under three months, making it one of the fastest-growing open source projects this year.

The project is built by Paperclip Labs, a team that clearly understood the pain of running multiple AI coding agents simultaneously. Their tagline — "If OpenClaw is an employee, Paperclip is the company" — nails the mental model. You're not building agents. You're running a business made of agents, with org charts, budgets, governance, and goal alignment baked in.

The core problem it solves is coordination. If you've ever had 15 Claude Code tabs open, lost track of which agent was doing what, burned through your API budget on a runaway loop, or manually kicked off recurring tasks — you've felt the friction Paperclip addresses. It gives you a dashboard where agents have roles, report to managers, execute against business goals, and stop when they hit their budget. The architecture is a Node.js server with a React UI, backed by embedded PostgreSQL, and it's all MIT-licensed.

### Why it matters

The AI agent ecosystem has exploded in the past year, but the tooling for managing multiple agents at scale hasn't kept up. Developers are stitching together ad-hoc solutions — cron jobs, shell scripts, manual coordination — because nobody shipped a real orchestration layer. Paperclip fills that gap with a proper control plane.

This is especially relevant for fullstack developers who are increasingly expected to integrate AI agents into their workflows. Whether you're using agents to generate code, run tests, manage deployments, or handle customer support, you need a way to coordinate them. Paperclip gives you that coordination layer without forcing you to build it yourself. It's not an agent framework — it doesn't tell you how to build agents. It tells you how to run a company made of them.

The market timing is sharp. OpenAI's Codex, Anthropic's Claude Code, and a dozen other agent tools are all competing for developer mindshare. But none of them solve the "I have 20 agents running and no idea what they're doing" problem. Paperclip sits above all of them, provider-agnostic, and treats agent management like an organizational problem rather than a technical one.

### Key Features

**Bring Your Own Agent.** Paperclip doesn't care which agent you use. It ships adapters for Claude Code, Codex, Cursor, OpenClaw, and generic CLI/HTTP agents. If your tool can receive a heartbeat signal, it can join the team. This means you're not locked into a single provider — mix and match agents based on what each one does best.

**Goal Alignment System.** Every task in Paperclip traces back to a company mission. You define high-level goals like "Build the #1 AI note-taking app to $1M MRR," and agents see that context when they pick up work. This is fundamentally different from task managers like Asana or Trello, where tickets are disconnected from strategy. Agents know both what to do and why they're doing it.

**Heartbeat Execution.** Agents don't run continuously by default. They wake on a schedule, check for assigned work, execute, and report back. The heartbeat system includes a DB-backed wakeup queue with coalescing, budget checks, workspace resolution, and automatic recovery for orphaned runs. This keeps costs predictable and prevents runaway loops.

**Budget and Cost Control.** Each agent gets a monthly token and cost budget. When they hit the limit, they stop — no exceptions. Paperclip tracks costs by company, agent, project, goal, issue, provider, and model. Budget policies have warning thresholds and hard stops, so you never get a surprise API bill. For developers running multiple agents against paid APIs, this alone justifies the tool.

**Org Chart and Governance.** Agents have roles, titles, reporting lines, and permissions. There's a board approval workflow with execution policies, decision tracking, and full audit logging. You can pause, resume, or terminate any agent at any time. Nothing ships without your sign-off if you configure it that way. This level of governance is unprecedented in the agent tooling space.

**Multi-Company Isolation.** A single Paperclip deployment can run unlimited companies with complete data isolation. Each company has its own agents, projects, goals, and audit trails. You can export and import entire organizations with secret scrubbing and collision handling. This is useful for consultants or agencies managing multiple client projects.

**Persistent Agent State.** Agents resume their task context across heartbeats instead of restarting from scratch. This is a big deal — most agent tools lose context between sessions, forcing you to re-explain the situation every time. Paperclip maintains session state, conversation history, and work products so agents pick up exactly where they left off.

### Use Cases

- **Solo developer running multiple coding agents** — You're using Claude Code for one project, Codex for another, and Cursor for a third. Paperclip lets you assign tasks, track progress, and control costs from a single dashboard instead of juggling terminal tabs.

- **Small team coordinating AI agents for product development** — Your team assigns agents to handle frontend, backend, testing, and deployment tasks. Paperclip's org chart ensures agents report to the right manager and work toward shared goals.

- **Agency managing AI agents across client projects** — You run separate "companies" in Paperclip for each client, with isolated data, budgets, and agent teams. Export client organizations when projects end.

- **Recurring automated workflows** — Customer support, social media posting, report generation, and other recurring tasks run on scheduled heartbeats. No manual kick-offs needed.

- **Cost-conscious developers running paid API agents** — Budget enforcement prevents runaway token spend. Set hard limits per agent and get warned before you hit them.

### Pros and Cons

Pros:
- Provider-agnostic design means you're not locked into any single AI vendor. Mix Claude Code, Codex, Cursor, and custom agents in one team.
- The budget and cost control system is the most thorough I've seen in any agent management tool. Scoped budgets with automatic hard-stops prevent the "surprise $500 API bill" problem.
- Active development with an ambitious roadmap including cloud agents, self-organization, and a desktop app. The community is growing fast with 68K stars and an active Discord.

Cons:
- Paperclip is built for teams of agents. If you only run one or two agents, the overhead of setting up org charts, goals, and governance might not be worth it.
- The embedded PostgreSQL requirement adds complexity compared to simpler task management tools. Production deployment requires understanding the database layer.
- Telemetry is enabled by default, which some developers will find intrusive. It can be disabled, but the opt-out rather than opt-in approach is a minor red flag.
- The project is young (launched March 2026). API surface and configuration patterns are likely to change as the team iterates on the product.

### Getting Started

```bash
# Quickstart with defaults (trusted local loopback mode)
npx paperclipai onboard --yes

# Or for LAN/tailnet access
npx paperclipai onboard --yes --bind lan

# Manual setup from source
git clone https://github.com/paperclipai/paperclip.git
cd paperclip
pnpm install
pnpm dev
```

The API server starts at `http://localhost:3100` with an embedded PostgreSQL database created automatically. Requirements: Node.js 20+ and pnpm 9.15+.

From the dashboard, create a company, add agents (point them at your Claude Code, Codex, or Cursor installations), define goals, assign tasks, and set budgets. Agents pick up work on their next heartbeat cycle.

### Alternatives

**CrewAI** — A Python-based multi-agent framework that focuses on defining agent roles and task flows programmatically. CrewAI is better if you want to build custom agent logic from scratch, but it doesn't provide the organizational management layer (budgets, governance, audit trails) that Paperclip offers. Choose CrewAI when you need fine-grained control over agent behavior; choose Paperclip when you need to manage a team of existing agents.

**AutoGen (Microsoft)** — Microsoft's multi-agent conversation framework supports complex agent-to-agent interactions and human-in-the-loop patterns. It's more research-oriented and flexible for building novel agent architectures. However, it lacks Paperclip's business-oriented features like cost tracking, org charts, and recurring task scheduling. Choose AutoGen for experimental agent workflows; choose Paperclip for production agent management.

**LangGraph** — LangChain's agent orchestration framework focuses on stateful, graph-based agent workflows. It's powerful for building complex agent pipelines but requires significant coding. Paperclip takes a higher-level approach — you're managing companies, not graphs. Choose LangGraph when you need programmatic control over agent execution paths; choose Paperclip when you want a dashboard to manage agents like employees.

### Verdict

Paperclip is the most practical agent orchestration tool available today. It doesn't try to be an agent framework, a workflow builder, or a prompt manager — it focuses squarely on the coordination problem that nobody else is solving well. The 68K stars in three months reflect real demand, not hype. If you're running two or fewer agents, you probably don't need it. But the moment you have three or more agents working on different tasks — especially across paid APIs — Paperclip's budget controls, org charts, and persistent state management become hard to ignore. The MIT license, TypeScript codebase, and active community make it a solid bet for 2026.
