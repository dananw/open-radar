---
name: hivemind
description: "Hivemind is a shared memory layer for AI coding agents that captures traces, codifies reusable skills, and propagates knowledge across your entire team in real time."
url: https://github.com/activeloopai/hivemind
stars: 777
forks: 49
language: TypeScript
tags: ["ai-agents", "memory", "developer-tools", "collaboration", "claude-code"]
featured: false
publishedAt: 2026-06-11
---

## Hivemind

### Overview

Hivemind is a shared memory system for AI coding agents that solves a problem most teams don't realize they have yet. It captures every interaction your agents have — prompts, tool calls, responses — and mines those traces for reusable patterns. Those patterns get codified into skill files that propagate to every agent on your team. The result: one engineer's agent figures out a tricky migration on Monday, and by Tuesday every agent on the team can execute that same pattern.

The project comes from Activeloop, the YC-backed company behind Deep Lake, a vector database that's been popular in the ML community for years. That matters because the hard problem Hivemind solves isn't just storing data — it's retrieving the right context at the right time across thousands of sessions. Activeloop has been building retrieval infrastructure since 2021, and that expertise shows in the hybrid lexical + semantic search that powers Hivemind's recall.

On the [LoCoMo](https://arxiv.org/abs/2402.17753) long-context memory benchmark (100 QA pairs, Claude Haiku), Hivemind delivers 25% cost reduction, 1.7x fewer tokens per question, and 31% fewer turns compared to running without shared memory. The agent reaches the answer faster because prior work is already in scope, not re-derived per session. Those numbers translate directly to your API bill and your team's velocity.

### Why it matters

The AI coding agent space is moving fast, but most tools treat every session as ephemeral. You start Claude Code, do some work, close the session, and all that context vanishes. If you're lucky, you saved a useful snippet somewhere. If you're not, you're re-solving the same problems next week.

Hivemind flips that model. It treats every agent interaction as a learning opportunity. When your senior engineer's agent discovers the right way to handle a specific database migration pattern, that knowledge doesn't disappear — it gets captured, codified, and made available to every other agent in the organization. This is the kind of infrastructure that separates teams building disposable AI experiments from teams building compounding AI leverage.

The timing is relevant because we're at an inflection point where coding agents are becoming genuinely useful but still wasteful. They re-derive solutions, repeat mistakes, and lack institutional knowledge. Hivemind addresses all three problems with a clean architecture that works across Claude Code, Codex, Cursor, Hermes Agent, OpenClaw, and pi. If your team runs multiple agents, this is the glue that makes them smarter together than individually.

### Key Features

**Automatic Session Capture.** Hivemind hooks into your coding agent's lifecycle events — session start, prompt submission, tool use, response generation, session end — and captures everything as structured traces in Deep Lake. No manual logging, no opt-in per session. Install it once and every interaction flows into the shared memory. You can disable capture with a single environment variable when working on sensitive code.

**Pattern Codification (Skillify).** This is the standout feature. A background worker mines recent traces for repeated patterns and codifies them into reusable `SKILL.md` files scoped to your workspace. When three different agents independently solve similar problems in different ways, Hivemind identifies the best approach and writes it as a skill that every agent can use. It's like having a staff engineer who watches every session and documents the best patterns automatically.

**Hybrid Search with Codebase Graph.** Search isn't just text matching. Hivemind builds a live graph of your codebase from the traces it captures — files, symbols, imports, and the edges your agents actually traverse. When you ask "where do we handle auth?", it lands on the actual files the team's agents have touched, not every file that mentions "auth". The search uses BM25 lexical matching by default, with optional semantic search via a local embedding daemon (nomic-embed-text-v1.5).

**Cross-Agent Propagation.** Knowledge doesn't stay siloed. Skills codified from Claude Code sessions are available to Cursor, Codex, and every other supported agent. Team rules propagate across the entire organization — add a rule like "no DROP TABLE on prod creds" and every agent session starts knowing it. This is where the "one brain" pitch becomes real.

**Session Summaries and Wiki Pages.** After each session, a background worker generates an AI-written wiki summary and stores it with its embedding. Long sessions checkpoint mid-session every 50 messages or 2 hours. Browse summaries at `~/.deeplake/memory/summaries/`. The wiki worker uses your host agent's own CLI (claude -p, codex exec, pi --print) so no separate API key is needed.

**Multi-Platform Support.** Hivemind works with Claude Code (marketplace plugin), OpenClaw (native extension), Codex (hooks.json), Cursor (hooks.json 1.7+), Hermes Agent (shell hooks + MCP server), and pi (extension API + AGENTS.md). The installer detects every supported assistant on your machine and wires up the hooks automatically. One `npm install -g @deeplake/hivemind && hivemind install` command covers everything.

**BYOC Data Control.** Your data goes to your own Deep Lake workspace, and you can bring your own cloud storage — GCS, Azure, S3, or on-prem. Workspace-level isolation prevents data leakage between organizations. This isn't a "trust us with your code" play — you control where the data lives.

### Use Cases

- **Engineering teams with multiple AI agents** — When your team runs Claude Code, Cursor, and Codex across different developers, Hivemind ensures discoveries made on one platform benefit everyone. The junior developer's agent becomes smarter because of what the senior developer's agent learned last week.

- **Onboarding new engineers** — New team members' agents have immediate access to institutional knowledge captured from months of prior sessions. Instead of "ask Sarah how we handle auth," the agent already knows because it's learned from Sarah's sessions.

- **Codebase archaeology** — Use natural search to find past decisions: "What did we decide about the API design?" or "Search traces for authentication bugs we've solved." The codebase graph makes these queries land on relevant files, not keyword matches.

- **Cost optimization for AI-heavy teams** — The 25% cost reduction on benchmark tasks comes from fewer tokens and fewer turns. For teams spending hundreds of dollars per day on AI coding agents, that's meaningful savings.

- **Compliance and audit trails** — Every agent interaction is captured with full tool call details. When you need to understand what an agent did and why, the traces are there.

### Pros and Cons

Pros:
- Solves the "ephemeral session" problem that every AI coding team faces but few have addressed systematically. The skill codification feature alone justifies the install.
- Multi-platform support means you're not locked into one agent. Works across Claude Code, Codex, Cursor, Hermes, and more with a single install command.
- BYOC architecture with workspace isolation gives security-conscious teams control over their data. No forced cloud dependency.

Cons:
- Data collection is aggressive by design — every prompt, tool call, and response is captured. Teams working with sensitive code need to carefully configure capture exclusions or use the `HIVEMIND_CAPTURE=false` escape hatch.
- The semantic search feature requires a ~600 MB embedding daemon download. Most teams will run with BM25-only, which is fine for code but weaker for natural language queries.
- Requires a Deep Lake account and API token. The free tier exists, but team features likely push you toward paid plans quickly.

### Getting Started

```bash
# Install globally and detect all agents on your machine
npm install -g @deeplake/hivemind && hivemind install

# Or install for a specific agent only
hivemind install --only claude
hivemind install --only codex
hivemind install --only cursor

# Headless/CI install with API token
HIVEMIND_TOKEN=your-token hivemind install

# Check what's wired up
hivemind status

# Optional: enable semantic search (~600 MB download)
hivemind embeddings install

# View skill codification status
hivemind skillify

# Add team rules that propagate to all agents
hivemind rules add "no DROP TABLE on prod creds"
hivemind rules list
```

Restart your coding agents after install. The first session will show a consent prompt before opening a browser for sign-in.

### Alternatives

**MemPalace** — Another memory layer for coding agents, but focused on personal memory rather than team sharing. MemPalace stores context per-user in local files and doesn't have the skill codification or cross-agent propagation features. Better choice if you're a solo developer who doesn't need team-level knowledge sharing.

**Agentmemory** — A simpler approach to agent memory that stores conversation history in a vector database. Agentmemory is easier to set up but lacks Hivemind's codebase graph, skill codification, and multi-platform integration. Better choice if you want basic recall without the team collaboration features.

**Claude Code's built-in memory** — Claude Code has its own memory system (CLAUDE.md files and session memory). It works fine for individual use but doesn't share across agents or team members. If you only use Claude Code and work solo, the built-in memory might be sufficient. For teams or multi-agent setups, Hivemind is the better option.

### Verdict

Hivemind is the most interesting infrastructure play in the AI coding agent space right now. The core insight — that every agent interaction is a learning opportunity that should compound across your team — is obvious in hindsight but nobody else has built it this well. The Activeloop team's retrieval expertise shows in the hybrid search and codebase graph features, and the multi-platform support means you're not betting on one agent vendor. It's early days (v0.7.86 as of this writing, 777 stars, 38 open issues), and the data collection model will make some security-conscious teams nervous. But for engineering teams running multiple AI coding agents and willing to trade some privacy for compounding team intelligence, Hivemind is worth installing today. The benchmark numbers — 25% cheaper, 1.7x fewer tokens, 31% fewer turns — are real, and they'll only improve as the skill library grows.
