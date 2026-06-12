---
name: context-mode
description: "Context-mode is an MCP server that optimizes context windows for AI coding agents — 98% reduction in tool output size, session continuity, and support for 15+ platforms."
url: https://github.com/mksglu/context-mode
stars: 17239
forks: 1222
language: TypeScript
tags: ["mcp", "ai-agents", "developer-tools", "context-optimization", "claude-code"]
featured: false
publishedAt: 2026-06-12
---

## Context Mode

### Overview

Context Mode is an MCP server that solves the context window problem for AI coding agents. It hit Hacker News #1 with 570+ points and crossed 17,000 GitHub stars in under four months. That kind of velocity usually means a tool found a real pain point.

The project is built by mksglu, and its adoption reads like a who's-who of tech companies — Microsoft, Google, Meta, Amazon, NVIDIA, ByteDance, Stripe, Datadog, Salesforce, GitHub, Red Hat, Supabase, Notion, Cursor, and more are listed as users. When enterprise teams at that scale adopt a developer tool this quickly, it's worth paying attention.

The core problem is deceptively simple: every MCP tool call dumps raw data into your context window. A Playwright snapshot costs 56 KB. Twenty GitHub issues cost 59 KB. One access log — 45 KB. After 30 minutes of agent work, 40% of your context is gone. When the agent compacts the conversation to free space, it forgets which files it was editing, what tasks are in progress, and what you last asked for. Context Mode intercepts this at the tool level, sandboxes the raw data, and replaces it with compact references — turning 315 KB into 5.4 KB.

### Why it matters

If you're using Claude Code, Cursor, Copilot, Gemini CLI, OpenCode, Kiro, or any of the other dozen AI coding agents that exploded in popularity over the past year, you've hit the context wall. Your agent starts strong, then gradually loses coherence as the conversation grows. It re-reads files it already processed. It forgets decisions you made ten messages ago. It burns tokens re-explaining things it already knows.

Context Mode addresses this from four angles simultaneously: sandboxing tool output so raw data never enters the context window, maintaining session continuity through SQLite with FTS5 full-text search, enforcing a "think in code" paradigm where agents write scripts to analyze data instead of reading dozens of files, and tracking everything without dictating how the model writes its responses. That last point matters — aggressive brevity prompts have been shown to degrade coding and reasoning benchmarks, and context-mode deliberately avoids that trap.

The timing is significant. MCP (Model Context Protocol) is becoming the standard way to extend AI agents with tools, but nobody was optimizing the data flow between those tools and the context window. Context Mode fills that gap, and it does it across 15+ platforms with a single install. For fullstack developers juggling React frontends, NestJS APIs, Django backends, and Go services — all with AI agents helping across the stack — context management isn't a nice-to-have. It's the difference between an agent that works for 15 minutes and one that works all day.

### Key Features

**Sandboxed Tool Execution.** Instead of letting raw tool output flood your context window, context-mode provides sandbox tools (`ctx_execute`, `ctx_batch_execute`, `ctx_execute_file`) that run code in isolation and return only the results. A 47-file directory scan that would consume 700 KB of context becomes a single `ctx_execute` call returning 3.6 KB. The agent writes the analysis script; context-mode runs it and returns only the output.

**Session Continuity with FTS5.** Every file edit, git operation, task, error, and user decision is tracked in a local SQLite database with FTS5 full-text indexing. When the conversation compacts, context-mode doesn't dump this data back into context — it indexes events and retrieves only what's relevant via BM25 search. Your agent picks up exactly where it left off. If you start a fresh session without `--continue`, previous session data is deleted immediately — no stale context leaking in.

**Cross-Platform Support.** Context Mode works with Claude Code (via plugin marketplace), Gemini CLI, VS Code Copilot, Cursor, OpenCode, Kiro, Windsurf, Zed, Aider, Amp, and more — 15 platforms total. Hook-capable platforms get automatic routing enforcement. Non-hook platforms need a one-time routing file copy. The installation complexity varies, but the core MCP server is the same everywhere.

**Analytics Dashboard.** The `ctx insight` command opens a local web UI showing 90 metrics, 37 insight patterns, and 4 composite scores — productivity, quality, delegation, and context health — across 23 event categories. You can see exactly how much context you're saving per tool, per session, and across your entire usage history. The `ctx stats` slash command gives a quick per-tool breakdown with token counts and savings ratios.

**"Think in Code" Paradigm.** This is the philosophical core of the tool. Instead of reading 50 files into context to count functions, the agent writes a script that does the counting and logs only the result. One script replaces ten tool calls. This is enforced as a mandatory paradigm across all platforms — the LLM should program the analysis, not compute it. For developers who've watched their agents burn through context reading log files, this is immediately recognizable as the right approach.

**Status Line Integration.** On Claude Code, you can add a status line showing context savings in real time — dollars saved this session, dollars saved across sessions, and efficiency percentage. It's a small feature, but seeing the numbers accumulate makes the value tangible. The status line resolves through the bundled CLI regardless of where the plugin cache lives.

**Automatic Routing Enforcement.** On hook-capable platforms, SessionStart hooks inject routing instructions at runtime. The agent is nudged to prefer sandbox tools over raw Bash/Read/WebFetch without you writing any configuration. On non-hook platforms, you copy a routing file once and the agent follows it. The routing stays focused on where data goes, not on how the model talks.

### Use Cases

- **Large codebase exploration** — When your agent needs to understand a React monorepo with 500 components, context-mode lets it write analysis scripts instead of reading every file. The agent gets the structural overview it needs without filling 60% of the context window with source code.

- **Multi-service debugging** — Fullstack developers working across NestJS, Django, and Go services often need agents to read logs, trace requests, and correlate errors. Context Mode sandboxes the log output so the agent can analyze patterns without drowning in raw text.

- **Long coding sessions** — If you're using Claude Code or Cursor for multi-hour refactoring sessions, context-mode's session continuity means the agent remembers what it changed, what's still pending, and what you asked for three hours ago — even after conversation compaction.

- **CI/CD and DevOps workflows** — Agents processing GitHub issues, access logs, and deployment output generate massive context loads. Context Mode's sandboxing turns a 59 KB GitHub issues dump into a compact summary, keeping the agent focused on the actual task.

- **Team-wide AI adoption** — The analytics dashboard lets engineering leads see how their teams are using AI agents — which tools consume the most context, where efficiency drops, and how much the sandboxing actually saves. Useful for justifying AI tooling budgets.

### Pros and Cons

Pros:
- 98% context reduction is not marketing fluff — the sandbox architecture genuinely prevents raw tool output from entering the context window, and the `ctx stats` command lets you verify savings per tool call.
- Cross-platform support means you can standardize on one context optimization tool across your entire team, whether individuals prefer Claude Code, Cursor, Copilot, or Gemini CLI.
- Session continuity via SQLite FTS5 is clever — it uses BM25 search to retrieve only relevant past events instead of dumping entire session histories back into context, which is what most memory solutions do.
- The "think in code" paradigm produces better agent behavior. Agents that write analysis scripts instead of reading 50 files make fewer mistakes and stay coherent longer.

Cons:
- Hook-based platforms (Claude Code, Gemini CLI) get the best experience. Non-hook platforms require manual routing file setup, and the automatic enforcement that makes context-mode shine is weaker without hooks.
- The tool adds an MCP server to your agent stack, which means another process to manage, another potential point of failure, and slightly more complexity in your setup.
- The analytics dashboard and session tracking require local SQLite, which works fine on single machines but adds friction for developers who work across multiple machines or want shared team analytics.

### Getting Started

```bash
# For Claude Code (recommended — full plugin with hooks and slash commands)
/plugin marketplace add mksglu/context-mode
/plugin install context-mode@context-mode

# Verify installation
/context-mode:ctx-doctor

# For other platforms — global install
npm install -g context-mode

# Add as MCP server (example for Gemini CLI)
# Add to ~/.gemini/settings.json:
# {
#   "mcpServers": {
#     "context-mode": {
#       "command": "context-mode"
#     }
#   }
# }

# Check your savings
ctx stats

# Open the analytics dashboard
ctx insight
```

### Alternatives

**Claude Code's Built-in Compaction** — Claude Code has native conversation compaction that summarizes context when it gets too long. It's free and requires no setup, but it's lossy — the model summarizes what it remembers, which means decisions and context from early in the session get compressed or dropped. Context Mode's FTS5-based session continuity is more precise because it indexes raw events and retrieves only what's relevant via search.

**Mem0 / SuperMemory** — These are memory layers that persist information across sessions, typically using vector embeddings. They solve a different problem — long-term memory across days or weeks — whereas context-mode focuses on optimizing the current session's context window. They're complementary rather than competitive. If your agent runs out of context mid-task, you need context-mode. If your agent forgets your preferences between sessions, you need a memory layer.

**Custom MCP Tool Wrappers** — Some developers write their own MCP wrappers that return summarized output instead of raw data. This works for specific tools but requires per-tool implementation and maintenance. Context Mode provides a general-purpose sandbox that works with any tool output without custom wrappers. The tradeoff is that custom wrappers can be more precisely tuned for specific use cases.

### Verdict

Context Mode is the most practical solution to the context window problem that every AI coding agent user has felt. The 98% reduction claim holds up because it's architectural — raw data goes into a sandbox, compact references come out — not prompt engineering magic. The cross-platform support is genuinely broad, covering every major AI coding agent from Claude Code to Cursor to Gemini CLI. And the "think in code" paradigm is the kind of opinionated design decision that makes tools actually work instead of half-working.

If you're using any AI coding agent for serious development work — not just quick one-off questions, but real multi-hour coding sessions across a fullstack codebase — install context-mode. The Claude Code plugin is the smoothest experience, but even the basic MCP setup on other platforms delivers immediate value. The 17K stars in four months and adoption by teams at Microsoft, Google, Meta, and Stripe tell the story: this solves a problem that developers feel every day.
