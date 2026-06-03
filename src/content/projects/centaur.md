---
name: centaur
description: "Centaur is a self-hosted AI agent platform from Paradigm — shared agents for teams with Slack integration, Kubernetes sandboxes, and durable workflows."
url: https://github.com/paradigmxyz/centaur
stars: 705
forks: 115
language: Python
tags: ["ai-agents", "self-hosted", "slack", "kubernetes", "developer-tools"]
featured: false
publishedAt: 2026-06-04
---

## Centaur

### Overview

Centaur is a self-hosted platform for running shared AI agents across a team. It comes from Paradigm, the crypto and infrastructure VC firm behind some of the most influential open-source tooling in the Ethereum ecosystem (Foundry, Reth, Alloy). That background matters — Paradigm's engineering team has a track record of shipping production-grade Rust and Python infrastructure, and Centaur carries that same "built for real use, not demos" energy.

The core idea: instead of everyone on your team running their own Claude Code or Codex setup with different configs, tools, and access levels, Centaur gives you one shared agent that lives in Slack. You mention it in a channel, it spins up an isolated Kubernetes sandbox, runs the task with your approved tools, and delivers the answer back to the thread. It hit 700 stars in its first two weeks, driven largely by engineering teams tired of managing fragmented agent setups.

The problem Centaur solves is deceptively common. A 2025 LangChain survey found that 67% of enterprises deploying AI agents cited "lack of standardized tooling" as their top operational challenge. Every developer has their own local agent config, different API keys, different permissions. Centaur collapses that into a single platform with shared tools, credential boundaries, and auditable state.

### Why it matters

The AI agent space is exploding, but most tooling is built for individual developers. You run Claude Code on your laptop, your coworker runs Codex on theirs, and nobody's agent knows about the same internal tools. Centaur is one of the first serious attempts to solve the "shared agent" problem for engineering teams.

What makes it interesting for fullstack developers specifically is the architecture. The API is a standard FastAPI service backed by Postgres. Tools are Python plugins with a simple convention — public methods on a client class become HTTP endpoints. Workflows are async Python functions with durable steps. If you've built a REST API before, you can build a Centaur tool in an afternoon.

The Kubernetes requirement sounds heavy, but Centaur is designed to run on k3s — a lightweight single-node Kubernetes distribution. A Mac Mini or small VPS is enough for a local setup. The sandbox model gives you real isolation (each conversation gets its own container with shell, git, Node.js, Python, Bun) without the complexity of managing a production cluster.

### Key Features

**Slack-Native Agent Conversations.** Mention `@centaur` in any Slack channel and the agent picks up the task. Progress updates stream back to the thread in real time, and the final answer arrives as a threaded reply. No context switching to a separate UI — the agent meets your team where they already work.

**Isolated Kubernetes Sandboxes.** Every conversation runs in its own container with a full development environment — shell, git, Python, Node.js, Bun, and common CLI tools. The sandbox has a default-deny NetworkPolicy, so the agent can't phone home or access services it shouldn't. For local development, k3s on a single machine is sufficient.

**Bring Your Own Harness.** Centaur doesn't lock you into a specific AI model or agent framework. You can run Claude Code, Codex, Amp, or any CLI-based agent inside the sandbox. Swap harnesses per team or per project without changing the platform layer. This flexibility is rare in agent platforms.

**Shared Tool Plugins.** Tools are small Python packages. Write a client class, and its public methods automatically become API endpoints that any agent conversation can call. Add a tool once, and every agent in every sandbox gets access to it. The plugin system uses a standard `pyproject.toml` structure that Python developers will recognize immediately.

**Durable Workflows.** Workflows are async Python functions that can sleep, resume, wait for external events, spawn child agents, and survive service restarts. Use them for multi-step operations like "collect data from three sources, summarize it, post the result, and schedule a follow-up check in 24 hours." The durable execution model means long-running tasks don't block or lose state.

**Credential Boundaries.** Agents can use approved services (databases, APIs, deployment systems) without ever seeing the raw API keys. Centaur's iron-proxy integration injects real credentials only on outbound requests to specific hosts and headers. The sandbox sees placeholder strings — the real values are swapped in at the network boundary. This is a meaningful security improvement over giving an agent your `.env` file.

**Organization Overlays.** Layer in custom tools, workflows, personas, skills, and prompts without forking the base platform. Teams can customize agent behavior per project or department while sharing the same infrastructure. Think of it as a configuration layer on top of the core platform.

### Use Cases

- **CI/CD debugging** — Mention `@centaur` when a build fails. The agent inspects logs, checks recent commits, and identifies the breaking change, all within the Slack thread where the failure was reported.
- **Internal tool orchestration** — Give the agent access to your deployment system, feature flag service, and monitoring dashboards through shared tool plugins. Engineers can trigger deploys, toggle flags, and check metrics without leaving Slack.
- **Code review assistance** — Point the agent at a PR and ask for a review. It clones the repo in its sandbox, reads the diff, and posts feedback with specific line references. Works with any Git host.
- **Recurring operational workflows** — Set up a daily digest workflow that collects metrics from multiple sources, summarizes them, and posts to a team channel. The durable execution model means it survives restarts and retries on failure.
- **Onboarding and knowledge sharing** — New team members ask the agent questions about internal systems. The agent has access to your docs, codebase, and runbooks through tool plugins, so it gives answers grounded in your actual infrastructure.

### Pros and Cons

Pros:
- Paradigm's engineering pedigree shows — the architecture is clean, the security model is thoughtful, and the codebase is well-organized. This isn't a weekend hackathon project.
- The Slack-first workflow means zero adoption friction for teams already using Slack. No new UI to learn, no separate app to open.
- Tool plugins use standard Python conventions, so any Python developer can write one in under an hour. No custom DSL or framework to learn.
- The credential boundary model (iron-proxy) is a genuine security improvement over how most teams handle agent credentials today.

Cons:
- Kubernetes is a hard requirement, even for local development. Teams without K8s experience will hit a learning curve during setup. The k3s requirement is lighter than full K8s, but it's still K8s.
- The project is two weeks old. The API surface, tool conventions, and workflow syntax are likely to change. Don't build critical infrastructure on it yet.
- Slack is the only first-class chat integration. Teams using Discord, Teams, or other platforms need to build their own adapters or use the raw API.

### Getting Started

```bash
# Clone the repo
git clone https://github.com/paradigmxyz/centaur.git
cd centaur

# Install the local command runner
brew install just

# Set up required secrets in your shell
export OP_SERVICE_ACCOUNT_TOKEN=your_1password_token
export OP_VAULT=your_vault_name
export SLACK_BOT_TOKEN=xoxb-your-bot-token
export SLACK_SIGNING_SECRET=your-signing-secret
export SLACKBOT_API_KEY=your-api-key

# Bootstrap Kubernetes secrets and start the stack
just bootstrap-secrets
just up
```

After `just up` finishes, mention `@centaur` in a Slack channel where the bot is invited, or hit the API directly:

```bash
# Spawn an agent sandbox
curl -X POST http://localhost:8000/agent/spawn \
  -H "Authorization: Bearer $SLACKBOT_API_KEY"

# Send a message and execute
curl -X POST http://localhost:8000/agent/message \
  -H "Authorization: Bearer $SLACKBOT_API_KEY" \
  -d '{"thread_key": "test", "content": "List files in the workspace"}'

curl -X POST http://localhost:8000/agent/execute \
  -H "Authorization: Bearer $SLACKBOT_API_KEY" \
  -d '{"thread_key": "test"}'
```

### Alternatives

**Amp (Sourcegraph)** — A standalone AI coding agent that runs locally or in the cloud. Amp is more mature and has better IDE integration, but it's a single-user tool without shared state, team workflows, or sandboxed execution. Choose Amp if you want a personal coding agent, not a team platform.

**Claude Code + custom orchestration** — You can build something similar with Claude Code, a message queue, and some glue code. This gives you more control but requires significant infrastructure work. Centaur handles the sandbox lifecycle, tool registry, credential injection, and delivery layer out of the box. Build your own if Centaur's architecture doesn't fit your deployment constraints.

**Devin (Cognition)** — A fully managed AI software engineer with a browser-based UI. Devin is more polished and requires zero infrastructure, but it's a closed SaaS product with per-seat pricing and limited customization. Centaur is self-hosted, open-source, and fully extensible. Choose Devin if you want a managed experience; choose Centaur if you need control.

### Verdict

Centaur is the most practical "shared agent" platform I've seen for engineering teams. The Slack integration eliminates adoption friction, the Kubernetes sandbox model provides real isolation without requiring a production cluster, and the Python tool plugin system is dead simple. It's early — two weeks old, API still settling, Slack-only chat integration — but the architecture decisions are sound and the codebase quality reflects Paradigm's engineering standards. If your team is running fragmented agent setups today and you're comfortable with Kubernetes, Centaur is worth a serious look. The 700 stars in two weeks suggest the developer community sees the same potential.
