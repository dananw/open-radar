---
name: cli-printing-press
description: "CLI Printing Press reads API docs, absorbs every competitor CLI, and generates token-efficient Go CLIs with local SQLite and MCP servers for any API or website."
url: https://github.com/mvanhorn/cli-printing-press
stars: 3222
forks: 334
language: Go
tags: ["cli", "developer-tools", "ai-agents", "go", "mcp", "api"]
featured: false
publishedAt: 2026-06-12
---

## CLI Printing Press

### Overview

CLI Printing Press is a Go-based CLI generator that does something no other tool attempts: it reads your API documentation, studies every popular community CLI and MCP server for that API, sniffs the web for unpublished endpoints (think Google Flights or Dominos), and then generates a token-efficient Go CLI plus an MCP server that absorbs every feature from every competing tool — then transcends them with compound commands only possible with local data. It hit 3,200 GitHub stars in under three months, driven by a single insight: in the age of AI agents, a well-designed CLI is muscle memory.

The project is built by Matt Van Horn, whose previous work includes the [printing-press-library](https://github.com/mvanhorn/printing-press-library), a catalog of pre-printed CLIs for popular APIs like Linear, GitHub, HubSpot, and ESPN. The library alone has 1,500 stars and dozens of ready-to-install CLIs. But the real product is the generator itself — the machine that prints those CLIs.

The core problem it solves is deceptively simple: every API has endpoints, but endpoints aren't commands. Most API wrappers stop at "wrap every endpoint, ship it, done." Discord's API has 300+ endpoints, but Peter Steinberger's [discrawl](https://github.com/steipete/discrawl) — which has 583 stars — ships just 11 commands: `sync`, `search`, `sql`, `tail`, `mentions`, `members`. Those 11 commands win because they embody a domain insight: conversations are institutional knowledge. The Printing Press automates that same intuition at scale — find the insight, absorb the ecosystem, print the CLI.

### Why it matters

The developer tools space has been drowning in "wrap an API and call it a day" CLI generators for years. OpenAPI-to-CLI tools exist by the dozen, but they produce thin wrappers that don't understand the domain. Meanwhile, AI coding agents like Claude Code, Codex, and Cursor are consuming CLIs as their primary interface to external services. A bad CLI wastes tokens. A great CLI — one with local SQLite caching, compound queries, and agent-native output flags — saves thousands of tokens per session.

This connects to a broader shift in how developers interact with APIs. The MCP (Model Context Protocol) ecosystem is exploding, with hundreds of MCP servers being published weekly. But most are thin HTTP wrappers with no local state, no offline mode, and no compound intelligence. The Printing Press generates both a Cobra CLI and an MCP server from the same spec, sharing the same client, store, and auth. Shell agents use the CLI. IDE agents use MCP. Zero code duplication.

The timing matters too. Anthropic's Claude Code is now the most-used AI coding assistant, and Cursor has surpassed VS Code in developer mindshare. These tools need well-designed CLIs to function efficiently. The Printing Press isn't just a developer convenience — it's infrastructure for the agentic development workflow.

### Key Features

**Non-Obvious Insight Engine.** Before generating anything, the Printing Press runs a research phase that identifies what it calls the "Non-Obvious Insight" (NOI) — a one-sentence reframe of what the API actually is versus what its creators think it is. Stripe isn't just a payment processor; it's a business health monitor. Linear isn't just an issue tracker; it's a team behavior observatory. This NOI becomes the creative DNA of the generated CLI, driving the compound commands that make it genuinely useful rather than just a wrapper.

**Absorb and Transcend Architecture.** The generator doesn't just read the API spec. It catalogs every feature from every Claude Code plugin, MCP server, community skill, competing CLI, and automation script for that API. Every feature becomes a row in an absorb manifest — something the generated CLI must match and beat with offline support, agent-native output, and SQLite persistence. The system auto-suggests novel features it thinks are missing from the ecosystem before you approve the manifest.

**Local-First SQLite Data Layer.** High-gravity resources get domain-specific SQLite tables (not JSON blobs), FTS5 full-text search indexes, and incremental sync with cursor tracking. `sync` pulls data down. `search` finds it in milliseconds. `sql` lets power users query directly. All offline, all local. This enables compound commands like `stale`, `health`, `bottleneck`, and `reconcile` that join across resources and analyze history — commands a stateless API wrapper literally cannot do.

**No Spec? No Problem.** Don't have an OpenAPI spec? Point the press at a website. It launches a browser, captures traffic, reverse-engineers the API, and generates the spec for you. ESPN, Postman Explore, internal tools — if you can click through it, the press can build a CLI for it. This is how the ESPN CLI was built: sniffed, with no official API. One command returns tonight's NBA playoff games with live scores, series state, each team's leading scorer's stat line, and injury news from the last 24 hours.

**Agent-Native by Default.** Every generated CLI is designed for AI agent consumption first. Human-friendly tables when you're in a terminal. Auto-JSON when piped, no `--json` flag needed. `--compact` drops to high-gravity fields only (60-80% fewer tokens). Typed exit codes (`0`/`2`/`3`/`4`/`5`/`7`) let agents self-correct without parsing error text. `--dry-run` for safe exploration. Every flag exists because an AI agent will call it thousands of times a day.

**Dual Interface from One Spec.** Every API gets a Cobra CLI (`<api>-pp-cli`) and an MCP server (`<api>-pp-mcp`). Same client, same store, same auth. Shell agents use the CLI. IDE agents use MCP. Zero code duplication. This is the most practical approach to the MCP ecosystem I've seen — instead of building MCP servers separately, you generate them alongside the CLI.

**Verified, Not Vibes.** Four mechanical checks — scorecard, dogfood, proof-of-behavior, live API smoke test — catch hallucinated paths, dead flags, auth mismatches, and broken data pipelines before you ship. The Codex mode offloads code generation to Codex CLI while Claude stays the brain for research, planning, scoring, and review. Same quality, 60% fewer Opus tokens.

### Use Cases

- **API-first development teams** — If you're building a REST or GraphQL API, the Printing Press can generate a CLI for your own API in minutes, giving your team a local-first tool for debugging, testing, and automating workflows that Postman can't match.

- **AI coding agent workflows** — Claude Code, Codex, and Cursor users need well-designed CLIs to interact with external services efficiently. A Printing Press CLI with `--compact` output and typed exit codes saves thousands of tokens per session compared to raw API calls.

- **Internal tool automation** — Point the press at your internal admin panel or dashboard. It reverse-engineers the API and generates a CLI for automating repetitive tasks that your team currently does through a browser.

- **Data analysis and reporting** — Once data lives in local SQLite, compound queries become possible. "Every blocked issue whose blocker has been stuck for a week" is a single command, not a multi-step API scripting exercise.

- **MCP server generation** — If you need an MCP server for your API (and in 2026, you probably do), the Printing Press generates one alongside the CLI with zero additional effort.

### Pros and Cons

Pros:
- The "absorb and transcend" approach is genuinely novel — no other CLI generator studies the competitive ecosystem before generating code. The result is CLIs that match every feature from every competitor, plus compound commands nobody else thought of.
- Local SQLite with FTS5 and incremental sync is the right architecture for agent-facing CLIs. Stateful CLIs are dramatically more token-efficient than stateless wrappers.
- Active development with 2,900+ commits and daily updates. The project ships fixes and new printed CLIs regularly.

Cons:
- Claude Code is the primary interface. The `/printing-press` command is a Claude Code skill, and while the binary works standalone, the curated agent loop that produces the best results requires Claude Code specifically.
- Generated CLIs are Go binaries. If your team is TypeScript-only or Python-only, adding Go tooling to the stack has a real cost, even if the generated CLIs are self-contained.
- The research phase is LLM-dependent and can be slow. A full generation run can take 15-30 minutes depending on the API complexity and the depth of competitive research.

### Getting Started

```bash
# Install the binary and Claude Code skills
curl -fsSL https://raw.githubusercontent.com/mvanhorn/cli-printing-press/main/scripts/install.sh | bash

# Verify installation
cli-printing-press --version

# Start Claude Code and print a CLI
claude
/printing-press Linear

# Or install a pre-printed CLI from the library
printing-press install linear-pp-cli
```

The library catalog at [printingpress.dev](https://printingpress.dev) has ready-to-install CLIs for Linear, GitHub, HubSpot, ESPN, Slack, Notion, and more. Each comes with both a Cobra CLI and an MCP server.

### Alternatives

**OpenAPI Generator** — The standard tool for generating API clients and server stubs from OpenAPI specs. It supports 40+ languages and produces clean, well-documented code. But it generates pure endpoint wrappers with no domain intelligence, no local data layer, and no compound commands. Choose it when you need a typed client library, not an agent-facing CLI.

**Speakeasy** — An API developer platform that generates SDKs, docs, and Terraform providers from OpenAPI specs. Speakeasy's generated SDKs are polished and production-ready, but they're client libraries, not CLIs. Better choice when you're building an SDK for other developers to consume in their code, not when you need a terminal tool for agents.

**Stainless** — Generates type-safe SDKs from OpenAPI specs, used by OpenAI and Anthropic. Like Speakeasy, it focuses on client libraries rather than CLIs. The generated code is excellent for programmatic use, but it doesn't address the agent-CLI interface problem that the Printing Press solves.

### Verdict

CLI Printing Press is the most interesting developer tool I've seen come out of the AI agent ecosystem in 2026. The core insight — that every API has a secret identity and the best CLIs are built around that identity, not around endpoints — is the kind of thing that sounds obvious in retrospect but nobody was doing. The absorb-and-transcend architecture means you're not just getting another API wrapper; you're getting a tool that studied the entire ecosystem and built something better. At 3,200 stars with daily commits, it's clearly resonating with developers who are building agentic workflows. If you're a fullstack developer working with APIs — and if you're reading this, you are — this is worth installing today, even if only for the pre-printed CLIs in the library.
