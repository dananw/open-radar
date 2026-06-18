---
name: tokdiet
description: "Local proxy that cuts AI coding agent token costs by 71% with quality-verified context compaction. Works with Claude Code, Cursor, and Codex."
url: https://github.com/agiwhitelist/tokdiet
stars: 63
forks: 1
language: TypeScript
tags: ["ai-tools", "developer-tools", "cost-optimization", "context-engineering", "typescript"]
featured: false
publishedAt: 2026-06-19
---

## tokdiet

### Overview

tokdiet is a local streaming reverse proxy that sits between your AI coding agent and the model API, compressing bloated context before it hits the wire. It claims 71% input token reduction with no measurable quality loss — and actually proves it with a 66-task A/B benchmark. That's the kind of claim that makes you skeptical, but the methodology is solid: 198 paired runs on MiniMax-M3, graded against known answers, with a 92% LLM-judge similarity score between baseline and compacted outputs.

The project launched on June 16, 2026, and picked up 63 stars in its first three days. It's built by agiwhitelist, a developer collective focused on AI agent infrastructure. The codebase is TypeScript (MIT licensed) with a Node.js runtime requirement of 20+. The architecture is a streaming reverse proxy with a SQLite-backed dashboard, so your data stays local — API keys never get written to disk.

The core problem tokdiet addresses is real and expensive. When you use Claude Code, Cursor, or Codex on a large codebase, the agent repeatedly sends the same file dumps, command outputs, and context blocks to the API. You're paying per-token for data the model has already seen. tokdiet detects these redundancies and compresses them without deleting information — it pages cold context out recoverably, like virtual memory for your LLM conversation.

### Why it matters

If you're running AI coding agents daily, token costs add up fast. A typical Claude Code session on a medium-sized repo can burn through 5 million input tokens in a few hours. At Anthropic's pay-per-token rates, that's real money — and most of it is wasted context. The agent re-sends the same file dumps across turns, includes stale command output, and carries forward conversation history that stopped being relevant 20 turns ago.

The existing options are blunt. You can eyeball your costs with ccusage or Claude's `/cost` command, but that only shows the damage — it doesn't fix it. You can manually run `/compact` or hand-prune context, but that's blind deletion with no quality guarantee. tokdiet is the first tool that cuts the bill *and* proves the answer didn't get worse. It's also cache-aware for Anthropic's prompt caching (never touches cached prefixes) and thinking-safe for extended thinking blocks (never mutates signed content). That's the kind of careful engineering that matters when you're proxying production API traffic.

### Key Features

**Virtual Memory Context Model.** tokdiet treats your conversation context like an operating system treats RAM. Hot content — recent messages, pinned items, blocks relevant to the current question — stays resident. Cold content gets paged out to SQLite as a recoverable stub, not deleted. The full block persists locally so it can be audited or paged back in. This is smarter than blind compaction because it preserves the information instead of destroying it.

**Three-Strategy Compaction Pipeline.** The compactor runs strategies in order of safety. Dedup is loss-free: when the same file gets re-pasted across conversation turns, earlier copies become pointer markers (works on near-duplicates too). Elision is recoverable: old tool results get trimmed to a preview plus salient lines (errors, URLs, paths, key-value pairs), with the full body stored for recovery. Mid-summarize is opt-in and uses a cheap model to condense mid-history. Each strategy can be toggled independently in config.

**Shadow-Eval Quality Guard.** This is what separates tokdiet from every other context optimizer. A sampled fraction of compacted requests get re-run against the un-compacted baseline, and the divergence is scored. There's a hard quality budget (default: 2% max degradation). If rolling degradation exceeds that budget, the offending strategy gets disabled and a safe-mode event fires. Savings stop before quality does. You can reproduce the benchmark yourself with `node bench/run.mjs`.

**Claude Code Compatibility.** The proxy handles two Claude Code landmines that would break a naive compactor. Prompt caching: cached prefixes marked with `cache_control` cost 10% of normal rate, and rewriting them invalidates the cache. tokdiet never touches content at or before a cache breakpoint. Extended thinking: signed thinking blocks must be returned verbatim or you get a 400 error. tokdiet never surfaces or mutates them. Both are covered by regression tests.

**Live Dashboard and Cost Metering.** Every request gets metered for token count and USD cost, stored in SQLite. The dashboard (default port 7878) shows real-time utilization, savings, and strategy performance. You can also run `npx tokdiet report` for a CLI summary, or export to CSV/JSON. Budget controls let you set per-session, per-day, and per-repo monthly spend ceilings with configurable actions (warn, compact, or block) when limits are hit.

**Fail-Open Architecture.** If anything inside the governor errors, the proxy falls back to transparent passthrough. It will never break your request or surface its own 5xx errors. Your API key stays with you — tokdiet reads it only to forward upstream and never writes it to SQLite or any log. The proxy binds to loopback only by default.

### Use Cases

- **Claude Code power users** running extended sessions on large codebases where the same files get re-sent repeatedly. tokdiet's dedup strategy alone can cut token usage significantly in these scenarios.
- **Teams with AI coding budgets** that need per-repo monthly spend ceilings and real cost visibility beyond what the model providers offer. The dashboard and budget controls provide this out of the box.
- **Developers using multiple AI agents** (Claude Code, Cursor, Codex) who want a single proxy layer that handles all of them with provider-specific optimizations.
- **Cost-conscious indie developers** paying per-token who want to extend their API budget without sacrificing output quality. The shadow-eval system gives confidence that savings aren't silently degrading results.

### Pros and Cons

Pros:
- The 71% token reduction claim is backed by a real benchmark with 198 paired runs, not marketing hand-waving. The methodology is transparent and reproducible.
- Cache-aware and thinking-safe design means it works with Claude Code's advanced features without breaking them. This is non-trivial engineering.
- Fail-open architecture and local-only data storage address the two biggest concerns with proxying API traffic: reliability and privacy.

Cons:
- At 63 stars and 3 days old, it's very early-stage software. The API surface and configuration options will likely change. Production use at this stage is for the adventurous.
- The dollar savings only apply to pay-per-token API keys. If you're on a flat Claude subscription, the value is limited to metering and dashboard features, not cost reduction.
- The mid-summarize strategy (which uses an LLM to condense context) is off by default because it costs money to run, creating a tension with the tool's cost-saving mission.

### Getting Started

```bash
# Start the proxy and dashboard (no install needed)
npx tokdiet start

# Point your agent at the proxy
export ANTHROPIC_BASE_URL=http://localhost:7787
export OPENAI_BASE_URL=http://localhost:7787/v1

# Now run your agent as usual — traffic flows through tokdiet
claude  # or cursor, codex, your own script

# View usage report
npx tokdiet report

# Create a config file to customize behavior
npx tokdiet init
```

Install as a Claude Code plugin:

```bash
/plugin marketplace add agiwhitelist/tokdiet
/plugin install tokdiet
```

### Alternatives

**ccusage** — A token metering tool for Claude Code that shows your cost breakdown by session and conversation. ccusage is observation-only — it tells you what you spent but doesn't reduce it. Use ccusage if you just want visibility; use tokdiet if you want visibility *and* savings.

**Manual `/compact` in Claude Code** — Claude Code's built-in compact command compresses conversation history when it gets too long. It's free and built-in, but it's blind deletion with no quality measurement and no recoverable paging. Use it for quick fixes; use tokdiet for systematic, measured context management.

**Martian's Model Router** — Routes requests to cheaper models when the task doesn't require the expensive one. Different approach to cost reduction (model selection vs. context compression). Use Martian if your cost problem is model selection; use tokdiet if your cost problem is redundant context.

### Verdict

tokdiet is the most interesting developer tool I've seen this week. The virtual memory metaphor for LLM context is clever, and the shadow-eval quality guard is the feature that actually matters — it turns "trust me, it's fine" into "here's the measurement." At 63 stars in 3 days, it's clearly resonating with developers who are watching their AI agent bills climb. The Claude Code compatibility work (cache-aware, thinking-safe) shows someone who's actually used these tools in production, not just theorized about them. It's too early to call it production-ready, but if you're running Claude Code or Cursor on anything beyond toy projects, tokdiet is worth trying today. The `npx tokdiet start` zero-install entry point means there's no commitment — just point your agent at localhost and watch the numbers.
