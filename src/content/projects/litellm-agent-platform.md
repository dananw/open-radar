---
name: litellm-agent-platform
description: "Self-hosted agent builder unifying Claude, OpenCode, Cursor, and DeepAgents behind one API. Build and manage AI agents with persistent memory and cron schedules."
url: https://github.com/LiteLLM-Labs/litellm-agent-platform
stars: 725
forks: 67
language: Rust
tags: ["ai-agents", "self-hosted", "rust", "typescript", "agent-platform"]
featured: false
publishedAt: 2026-06-10
---

## LiteLLM Agent Platform

### Overview

LiteLLM Agent Platform (LAP) is a self-hosted agent builder that sits on top of multiple agent runtimes and gives your team a single UI to create, configure, and run AI agents. It launched in early May 2026 and has already pulled in 725 GitHub stars with 67 forks — solid traction for a developer tool that's barely a month old.

The project comes from Berri AI, the team behind LiteLLM, which is the de facto standard proxy for routing LLM API calls across providers. That's important context. LiteLLM is used by thousands of companies to unify their LLM access. LAP extends that philosophy from model routing to agent orchestration. The same team that solved "one API for all LLMs" is now solving "one platform for all agent runtimes."

The core problem LAP addresses: if your team uses Claude Managed Agents for some tasks, OpenCode for others, and Cursor Agents API for code-related work, you're juggling multiple consoles, multiple authentication schemes, and multiple ways to manage sessions. There's no unified view. LAP gives you one dashboard, one API, persistent sessions, and cron scheduling across all of them. Developers get access to agents without needing direct console access to Bedrock or Anthropic. That's a meaningful operational simplification.

### Why it matters

The AI agent ecosystem is fragmenting fast. In the past six months, we've seen agent platforms from Anthropic (Claude Managed Agents), OpenAI (Codex), Cursor (Agents API), and a wave of open-source projects (OpenCode, DeepAgents, Hermes). Each has its own interface, its own session management, its own way of attaching tools and skills. For individual developers, that's manageable. For teams — especially teams where not everyone is an AI power user — it's chaos.

LAP enters at exactly the right moment. It doesn't try to replace these runtimes. It wraps them. Think of it as the LiteLLM philosophy applied to agents: don't compete with the runtimes, unify them. The project is built in Rust (53% of the codebase) with a TypeScript frontend (38.5%), which signals a focus on performance and developer experience. The Rust backend handles runtime orchestration and session management, while the TypeScript layer provides the dashboard and API surface.

For fullstack developers specifically, LAP is interesting because it exposes a clean REST API for agent management. You can create agents, attach tools and skills, trigger runs, and manage sessions programmatically. That makes it composable — you can embed agent capabilities into your own applications without building the orchestration layer yourself.

### Key Features

**Unified API Across Runtimes.** One API to create and run agents, regardless of whether the underlying runtime is Claude Managed Agents, OpenCode, Cursor Agents API, or DeepAgents. You define your agent once and pick the runtime at execution time. This eliminates the need to write runtime-specific integration code for each agent platform your team uses.

**Session Management.** LAP maintains persistent agent sessions across runs. When an agent picks up a task, it has access to its previous conversation history and context. This is critical for multi-step workflows where an agent needs to build on previous work — think code review chains, research tasks, or iterative debugging.

**CRON Schedules.** Run agents on a schedule directly from the platform. Set up a recurring agent that checks your CI pipeline every morning, reviews open PRs at noon, or generates a daily report at 5 PM. No external cron setup, no separate scheduler — it's built into the platform.

**Memory System.** Agents remember context across sessions. LAP maintains memory that persists between runs, so an agent that learned your codebase conventions last week still knows them this week. This reduces the cold-start problem that plagues most agent platforms.

**Self-Hosted Architecture.** Everything runs on your infrastructure via Docker Compose. The stack includes the LAP web/API service, a Postgres database, and your choice of runtime templates. No data leaves your network. For teams with compliance requirements or sensitive codebases, this is non-negotiable.

**Multi-Profile Runtime Support.** Start with one runtime profile and add others without restarting. `docker compose --profile opencode up` gives you OpenCode. Add `--profile deepagents` to also get DeepAgents. Profiles auto-register in the UI through the LAP API. This modular approach means you only run what you need.

**Tool and Skill Attachment.** Connect tools and skills to agents through the UI. Select from available integrations, attach them to an agent, and the agent can use them across all its runs. This is the "compose your agent" workflow — pick a runtime, pick capabilities, deploy.

### Use Cases

- **Team agent access control** — Give developers access to AI agents through LAP's UI without granting them direct console access to Anthropic, AWS Bedrock, or other provider dashboards. Centralized access with audit trails.

- **Automated code review pipelines** — Set up a CRON-scheduled agent that reviews open pull requests across your repositories, using Claude or OpenCode as the underlying runtime, and posts comments directly.

- **Multi-runtime agent experimentation** — Run the same agent definition against Claude, OpenCode, and DeepAgents to compare output quality, latency, and cost. Pick the winner for production without rewriting your integration.

- **Internal developer tools** — Use LAP's REST API to embed agent capabilities into your internal dashboards. A "generate tests" button in your CI tool that triggers an LAP agent running on OpenCode.

- **Long-running research tasks** — Create agents with persistent memory that maintain context across days of research. The agent accumulates knowledge over multiple sessions rather than starting fresh each time.

### Pros and Cons

Pros:
- The LiteLLM team has a proven track record with their model proxy (used by thousands of companies). LAP benefits from that infrastructure knowledge and existing community trust.
- Self-hosted with Docker Compose means no vendor lock-in and no data leaving your network. The Postgres backend is standard and well-understood.
- The unified API genuinely reduces integration complexity if your team uses multiple agent runtimes. One SDK instead of four.
- MIT licensed, which is the most permissive option for commercial use.

Cons:
- Only 6 contributors so far, with two doing the vast majority of work (851 and 431 commits). Bus factor is a real concern for a project this young.
- No releases yet — the project is moving fast and the API surface is likely still settling. Expect breaking changes.
- Runtime support is currently limited to four platforms. If you're using something outside that list (like Hermes Agent or a custom runtime), you'll need to wait or contribute an adapter.
- The README is sparse on architecture details. For a self-hosted tool, you'd want more documentation on scaling, backup strategies, and production deployment patterns.

### Getting Started

Prerequisites: Docker Desktop.

```bash
# Clone the repository
git clone https://github.com/LiteLLM-Labs/litellm-agent-platform.git
cd litellm-agent-platform

# Start with the OpenCode runtime
docker compose --profile opencode up

# Or start with just the base stack
docker compose up

# Add DeepAgents runtime
docker compose --profile deepagents up

# Multiple runtimes together
docker compose --profile opencode --profile deepagents up
```

Open http://localhost:4000 and sign in with the master key (`sk-local` by default). Add your provider credentials in Settings before running agents against a hosted model provider.

Create an agent through the UI, select tools and skills to attach, then pick a runtime and run it. The platform handles session persistence, memory, and scheduling automatically.

### Alternatives

**LangChain LangGraph Platform** — LangGraph is the most popular framework for building stateful agent workflows, and LangGraph Platform offers a hosted deployment option. It's more mature and has a larger ecosystem of pre-built components. Choose LangGraph if you want to build custom agent logic from scratch with fine-grained control over the execution graph. Choose LAP if you want to orchestrate existing agent runtimes rather than build your own.

**CrewAI Enterprise** — CrewAI focuses on multi-agent collaboration where specialized agents work together on tasks. It has a polished UI and a growing library of pre-built agent templates. CrewAI is better for scenarios where you need multiple agents with different roles coordinating on a single goal. LAP is better when you need a unified interface across different runtime platforms.

**AgentOps** — AgentOps is an observability and monitoring platform for AI agents. It tracks agent runs, measures performance, and helps debug failures. It's complementary to LAP rather than competitive — you could use AgentOps to monitor agents running on LAP. Choose AgentOps if your primary concern is visibility into agent behavior, not runtime orchestration.

### Verdict

LAP is a pragmatic tool built by a team that understands the LLM infrastructure layer. It's not trying to be the best agent framework — it's trying to be the best way to manage multiple agent frameworks from one place. That's a real problem that gets worse every time a new agent platform launches. The project is young (barely a month old, no releases, six contributors), so don't bet your production pipeline on it today. But if your team is already juggling Claude, OpenCode, and Cursor agents, LAP is worth setting up as a side experiment. The Docker Compose setup takes five minutes, and the unified API alone saves you from maintaining three separate integrations. Watch this one — the LiteLLM team has a habit of becoming infrastructure defaults.
