---
name: flock
description: "DuckFlock is an open-source Go service that turns Telegram into an AI dev team — 5-role pipeline, per-chat workspaces, PR review, and Docker deployment."
url: https://github.com/duckbugio/flock
stars: 451
forks: 0
language: Go
tags: ["ai-agents", "telegram-bot", "devops", "claude-code", "automation"]
featured: false
publishedAt: 2026-06-16
---

## DuckFlock

### Overview

DuckFlock is a Go service that turns Telegram into an AI-powered development team. You describe a feature in a chat message, and a 5-agent pipeline — planner, coder, tester, reviewer, arbiter — plans it, implements it on a branch, tests it, reviews it with inline PR comments, and either approves or escalates to you. The repo hit 451 stars in its first week, which tracks: developers have been waiting for a practical way to delegate coding tasks to AI without leaving their messaging app.

The project comes from DuckBug, a small team (two main contributors — DuckBugAgent with 70 commits and zaytcevcom with 27) that appears focused on AI developer tooling. They maintain six public repos, with Flock being the flagship. The architecture is clean — a monorepo with the platform-agnostic dev-team brain in `core/` and the Telegram integration as one adapter under `adapters/telegram/`. Future adapters for Discord, Slack, or other platforms would share the same core orchestration.

The core problem Flock solves is the gap between "AI can write code" and "AI can ship a feature." Individual coding assistants like Cursor and Claude Code handle single-file edits well, but multi-file changes across services — the kind fullstack developers deal with daily — require planning, testing, and review. Flock codifies that entire workflow into a repeatable pipeline. You send a Telegram message, go grab coffee, and come back to a PR with review comments already addressed.

### Why it matters

The AI coding agent space has exploded in 2026, but most tools live inside an IDE or terminal. That works for solo developers, but teams increasingly want AI assistance that integrates with their existing communication tools. Flock bridges that gap by making Telegram — the messaging platform used by a huge number of developer teams globally, especially in Europe and Asia — into a coding command center.

What makes Flock different from "just wrap Claude Code in a bot" is the multi-agent pipeline design. The planner breaks down requirements, the coder implements, the tester validates, the reviewer provides adversarial analysis with line-anchored comments, and the arbiter prevents infinite loops between reviewer and coder. This mirrors how actual development teams work, and it catches a real problem: single-agent AI coding often produces code that "works" but hasn't been stress-tested or reviewed for edge cases.

The Go implementation matters too. Unlike Node.js-based agent frameworks that balloon in memory usage, Flock's Go binary stays lean. Multiple chat workspaces run in parallel without competing for RAM, which is practical for teams running this on a $5/month VPS. The container sandboxing means the AI agent's shell is confined — it can't accidentally nuke your host system.

### Key Features

**Five-Role Agent Pipeline.** The planner extracts acceptance criteria from your message, the coder implements on a feature branch, the tester runs linting and regression gates, the reviewer performs adversarial analysis with inline PR comments in the PR's native language, and the arbiter breaks deadloops with cycle limits and risk scoring. This isn't five prompts chained together — each role has its own system prompt, constraints, and escalation paths. The arbiter is particularly clever: it's a risk-aware loop-breaker that prevents the reviewer and coder from going back and forth forever.

**Per-Chat Workspace Isolation.** Every Telegram chat (1:1 or group) gets its own `/workspace/chat_<id>` directory. Different chats can't see each other's files, and they run in parallel (capped by `MAX_CONCURRENT_CHAT_RUNS` for memory management). In group chats, the bot only responds when @mentioned or replied to. This means your frontend team and backend team can use the same Flock instance without stepping on each other's workspaces.

**PR Polling Without Inbound Webhooks.** The bot polls your git host (Gitea, GitHub, or GitLab) for new review comments instead of requiring inbound webhooks. This works even when your git host can't reach the bot — say, if you're running the bot on a VPS in a different network than your GitLab instance. The poller is the recommended approach, with inbound webhooks + Caddy TLS proxy as an optional alternative.

**Voice Message Support.** Send a voice message and Flock transcribes it using Mistral Voxtral, OpenAI Whisper, or a local transcription model, then runs the transcribed text as a command. This is a small feature that changes how you interact with the bot — dictating a feature description while walking is genuinely faster than typing it out.

**Docker-First Deployment.** A single `docker compose up -d` pulls the prebuilt image from `ghcr.io/duckbugio/flock-telegram`. No build step, no dependency management. For teams that want infrastructure-as-code, there's an Ansible playbook that provisions a fresh VPS — installs Docker, renders `.env`, pulls the image, and starts the service. The deployment story is production-ready, not "figure it out yourself."

**Claude Subscription or API Key.** Flock works with either a Claude Pro/Max subscription (via `claude setup-token`) or an Anthropic API key. The subscription path means you're paying a flat monthly rate instead of per-token, which makes costs predictable for teams running dozens of tasks per day. The agent's context is managed to stay within subscription limits.

**Platform-Agnostic Core.** The orchestration brain lives in `core/` as a standalone Go module. Telegram is just one adapter — the architecture anticipates Discord, Slack, or web UI adapters that share the same agent pipeline, workspace isolation, and PR workflow. The core README documents the SPARC spec-gates, multi-repo coordination, and diff risk-scoring patterns borrowed from the ruflo project.

### Use Cases

- **Solo developer automating repetitive tasks** — Describe "add rate limiting to the /api/users endpoint" in Telegram and get a PR with tests, review comments addressed, and a summary of changes. No context-switching to your IDE.
- **Small team code review pipeline** — Multiple developers submit tasks via different Telegram chats. Each gets isolated workspaces, parallel execution, and PRs that go through adversarial review before reaching the team lead.
- **Ops and DevOps automation** — Use the bot for infrastructure changes: "set up a new staging environment with Docker Compose and Nginx reverse proxy." The agent plans, implements, tests, and opens a PR to your infra-as-code repo.
- **Codebase exploration** — Ask questions about your codebase in Telegram: "what's the authentication flow in this project?" The agent reads the code, maps the flow, and explains it — useful for onboarding new team members.
- **Multi-repo feature implementation** — Describe a feature that spans your API and frontend repos. The planner breaks it into per-repo tasks, each coder-agent works on their repo's branch, and coordinated PRs are opened.

### Pros and Cons

Pros:
- The 5-role pipeline with an arbiter loop-breaker is a genuine architectural improvement over single-agent coding. It catches issues that a lone AI agent misses, and the cycle limit prevents runaway costs.
- Per-chat workspace isolation makes multi-team usage practical. You don't need separate bot instances for different projects or teams.
- Go implementation keeps memory usage low enough to run on cheap VPS instances. Multiple concurrent chats without the Node.js memory bloat.
- PR polling works without inbound webhooks, which simplifies deployment when your git host is behind a firewall or on a different network.
- Active development — 98 commits in the first week, with fixes for graceful drain, resume logic, and per-chat marker queues landing between June 13-15.

Cons:
- Tightly coupled to Claude Code as the underlying agent. If you're using a different AI coding tool (Cursor, Codex, OpenCode), there's no adapter yet. The core architecture supports it, but it's not implemented.
- No web UI — everything goes through Telegram. Teams that prefer Slack, Discord, or a browser-based interface need to wait for additional adapters.
- The 5-agent pipeline means higher token usage than single-shot coding. Each task runs through five agents with their own context windows. With API-key billing, costs can add up on complex features.
- Early project with 451 stars but no published benchmarks or production case studies. The README is thorough, but real-world performance on large codebases is unproven.

### Getting Started

```bash
# Clone and start with Docker (recommended)
git clone https://github.com/duckbugio/flock
cd flock/adapters/telegram
cp .env.example .env        # fill in the REQUIRED block

# Minimum .env configuration:
# TELEGRAM_BOT_TOKEN=       from @BotFather
# TELEGRAM_BOT_USERNAME=    your bot's @username
# ALLOWED_USERS=            comma-separated Telegram user IDs
# CLAUDE_CODE_OAUTH_TOKEN=  claude setup-token (or ANTHROPIC_API_KEY)

docker compose up -d

# Message your Telegram bot with a task:
# "Add input validation to the user registration endpoint"
```

For server deployment with Ansible:

```bash
cd adapters/telegram/deploy
cp -r inventories/example inventories/my-bot
# Edit inventory.ini, group_vars/all/vars.yml, group_vars/all/vault.yml
ansible-playbook -i inventories/my-bot/inventory.ini playbook.yml
```

Optional sidecars for Docker-in-Docker testing and Caddy TLS proxy:

```bash
docker compose --profile dind up -d     # sandboxed linters/tests
docker compose --profile caddy up -d    # inbound webhook proxy
```

### Alternatives

**Devin (Cognition)** — The most well-known AI software engineer, but it's a closed-source SaaS product with per-seat pricing starting at $500/month. Devin runs in its own cloud environment with a browser-based UI. Choose Devin if you want a managed experience with visual oversight and have the budget. Choose Flock if you want open-source, self-hosted, and Telegram-native at a fraction of the cost.

**Sweep AI** — An AI junior dev that creates PRs from GitHub issues. It's GitHub-specific and focused on bug fixes and small features. Sweep is more polished for GitHub-centric workflows but lacks Flock's multi-agent pipeline and adversarial review loop. Choose Sweep if your entire workflow is GitHub Issues and you want a simpler, more opinionated tool.

**Claude Code directly** — You can run Claude Code in your terminal and get similar results for single-developer workflows. The advantage of Flock is the orchestration: the 5-role pipeline, per-chat isolation, PR polling, and multi-repo coordination that you'd have to build yourself. Choose raw Claude Code if you prefer terminal interaction and don't need team features.

### Verdict

Flock is the most practical "AI dev team" implementation I've seen that's actually self-hostable. The 5-agent pipeline with the arbiter loop-breaker is the right design — it mirrors how real teams work and catches the review fatigue problem that plagues single-agent coding tools. At 451 stars in its first week with active daily commits, the project has momentum. The Go implementation and Docker-first deployment mean you can have it running on a VPS in under 10 minutes.

The Telegram dependency is a limitation for teams standardized on Slack or Discord, but the monorepo architecture with platform-agnostic `core/` suggests this is a temporary constraint, not an architectural dead end. If you're a fullstack developer who lives in Telegram and wants to delegate multi-file coding tasks without leaving your chat app, Flock is worth setting up this week. The Claude subscription path makes costs predictable, and the per-chat isolation means your whole team can use one instance. Just don't expect it to handle massive refactors across 50 files yet — the sweet spot is focused features and bug fixes that span 3-10 files.
