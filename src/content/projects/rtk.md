---
name: rtk
description: "RTK is a Rust CLI proxy that sits between your AI coding agent and the shell, compressing command output by 60-90% to slash LLM token costs."
url: https://github.com/rtk-ai/rtk
stars: 63169
forks: 3895
language: Rust
tags: ["developer-tools", "ai-coding", "token-optimization", "rust", "cli"]
featured: false
publishedAt: 2026-06-17
---

## RTK

### Overview

RTK (Rust Token Killer) is a CLI proxy that intercepts shell commands executed by AI coding agents and compresses their output before it hits the LLM context window. It claims 60-90% token reduction on common dev operations, and the numbers hold up. A typical 30-minute Claude Code session that burns through ~118,000 tokens on raw shell output drops to ~23,900 tokens with RTK in the pipeline. That's not a marginal improvement — it's a fundamental shift in how much AI-assisted coding actually costs.

The project launched in January 2026 and has accumulated over 63,000 GitHub stars in five months. It's written in Rust as a single binary with zero runtime dependencies, which means installation is a one-liner via Homebrew or curl. The latest release (v0.42.4, June 12 2026) shows active maintenance with security hardening and regular bug fixes. The maintainer ships frequently — there have been over 40 minor releases since January.

The core problem RTK solves is straightforward but underappreciated: AI coding agents like Claude Code, Cursor, and Copilot execute dozens of shell commands per session. Each command returns raw output — full directory listings, verbose git logs, complete test output with passing tests included. That output goes straight into the LLM's context, burning tokens on noise. A `git push` that returns 15 lines of "Enumerating objects... Counting objects... Delta compression..." costs 200 tokens when the useful information is "ok main" — 10 tokens. RTK sits in the middle and strips the noise.

### Why it matters

The economics of AI-assisted coding are becoming a real concern. Claude Code, Cursor, and similar tools charge by token consumption or have rate limits tied to usage. Developers running agentic workflows — where the AI executes 50-100 shell commands to complete a task — are burning through budgets faster than expected. RTK addresses this at the infrastructure level rather than asking developers to change their workflows.

What makes RTK interesting architecturally is that it's a transparent proxy. You don't rewrite your prompts or change how you use your AI tool. You run `rtk init -g`, restart your agent, and every Bash tool call automatically gets rewritten. The agent calls `git status`, RTK intercepts it, runs `rtk git status`, and returns compact output. The agent doesn't know the difference, but the token bill drops by 80%.

The project also reflects a broader trend: as AI coding tools move from novelty to daily driver, the infrastructure around them needs optimization. We're seeing this with context caching in Claude and Gemini, with prompt compression tools, and now with output compression at the shell level. RTK is the most practical implementation of this idea I've seen — it works today, with real numbers, across 14 different AI coding tools.

### Key Features

**Smart Output Filtering.** RTK applies four compression strategies per command type: smart filtering removes noise like comments and whitespace, grouping aggregates similar items by directory or error type, truncation keeps relevant context while cutting redundancy, and deduplication collapses repeated log lines with counts. Each strategy is tuned per command — `cargo test` gets different treatment than `git diff`.

**100+ Supported Commands.** The command coverage is extensive. Git operations, test runners (Jest, Vitest, Playwright, pytest, go test, cargo test), build tools (ESLint, TypeScript, Next.js, ruff, golangci-lint), package managers (pnpm, pip, prisma), container tools (Docker, kubectl), AWS CLI, and GitHub CLI all have dedicated filters. Each filter is hand-tuned for that specific tool's output format.

**Transparent Auto-Rewrite Hook.** The hook system intercepts Bash tool calls before execution. For Claude Code it uses the PreToolUse hook, for Gemini CLI it uses BeforeTool, for Cursor it uses hooks.json. The result is 100% RTK adoption across all conversations and subagents with zero manual intervention. You install it once and forget it exists.

**Token Savings Analytics.** The `rtk gain` command shows cumulative savings with ASCII graphs, daily breakdowns, and per-project history. The `rtk discover` command scans past sessions to find missed optimization opportunities. This visibility matters — you can actually measure the ROI, not just trust the marketing.

**Single Rust Binary.** No runtime dependencies, no configuration files, no daemon process. Download the binary, run `rtk init -g`, done. The binary is under 10MB and runs on macOS (Intel and ARM), Linux, and Windows (via WSL for full support, native for limited support). Installation via Homebrew is one command.

**Multi-Agent Support.** RTK works with 14 AI coding tools: Claude Code, GitHub Copilot, Cursor, Gemini CLI, Codex, Windsurf, Cline, Roo Code, OpenCode, Kilo Code, Antigravity, Pi, Hermes, and more. Each integration uses the appropriate hook mechanism for that tool. Switching AI tools doesn't mean losing RTK's benefits.

**Granular Verbosity Control.** The `-u` (ultra-compact) flag uses ASCII icons and inline format for maximum token savings. The `-v` through `-vvv` flags increase verbosity when you need more detail. Commands like `rtk read file.rs -l aggressive` strip function bodies entirely, returning only signatures. You can tune the compression level per use case.

### Use Cases

- **Cost-conscious developers using Claude Code or Cursor** — If you're paying per token or hitting rate limits, RTK cuts your shell output costs by 60-90% with zero workflow changes. The savings compound over long sessions.

- **Teams running agentic CI/CD pipelines** — AI agents executing build, test, and deploy commands in automated workflows generate massive token consumption. RTK's `--auto-patch` flag enables non-interactive installation for CI environments.

- **Developers working on large codebases** — Monorepos with thousands of files produce verbose output from every command. RTK's directory grouping and truncation keep the relevant context without flooding the LLM with noise.

- **Multi-tool developers** — If you switch between Claude Code, Cursor, and Copilot depending on the task, RTK's multi-agent support means you get consistent token savings across all tools.

- **Python/Go/Rust polyglot developers** — RTK has dedicated filters for pytest, go test, cargo test, ruff, golangci-lint, and cargo clippy. Each filter is tuned for that tool's specific output format.

### Pros and Cons

Pros:
- The 60-90% token reduction claim is real and measurable. The `rtk gain` analytics let you verify savings per session, per project, and per command type. No hand-waving.
- Zero-configuration transparent proxy means no workflow changes. Install once, restart your AI tool, and every Bash call gets optimized automatically.
- Single Rust binary with no dependencies makes installation and distribution trivial. Homebrew, curl installer, or direct binary download — all work.

Cons:
- Only compresses Bash tool calls. Claude Code's built-in tools (Read, Grep, Glob) bypass the hook entirely, so you need to use shell equivalents or call `rtk read` / `rtk grep` explicitly.
- Windows support is limited. The auto-rewrite hook requires a Unix shell, so native Windows falls back to CLAUDE.md injection mode. WSL is recommended for full functionality.
- Aggressive compression modes can strip context you actually need. The `-l aggressive` flag on file reads removes function bodies, which might be too much when debugging complex logic.

### Getting Started

```bash
# Install via Homebrew (macOS/Linux)
brew install rtk

# Or install via curl
curl -fsSL https://raw.githubusercontent.com/rtk-ai/rtk/refs/heads/master/install.sh | sh

# Initialize for your AI tool
rtk init -g                     # Claude Code (default)
rtk init -g --gemini            # Gemini CLI
rtk init -g --codex             # Codex (OpenAI)
rtk init -g --agent cursor      # Cursor
rtk init -g --agent windsurf    # Windsurf
rtk init --agent cline          # Cline / Roo Code
rtk init --agent hermes         # Hermes

# Restart your AI tool, then test
rtk --version                   # Should show "rtk 0.42.4"
rtk gain                        # Check token savings stats
rtk git status                  # Compact git status
rtk cargo test                  # Compressed test output
```

### Alternatives

**Prompt compression tools (LLMLingua, Selective Context)** — These compress the input prompt rather than the tool output. They operate at a different layer — reducing the context you send to the LLM, not the context generated by shell commands. RTK and prompt compression are complementary, not competing. Use both if you're serious about token optimization.

**Manual prompt engineering** — You can instruct your AI agent to use `--quiet` flags, pipe output through `head`, or use structured output formats. This works but requires per-command discipline and breaks when you forget. RTK automates what you'd otherwise do manually across 100+ command variants.

**Context window caching (Claude, Gemini)** — Provider-level caching reduces cost on repeated context but doesn't address the root problem of verbose output entering the context in the first place. RTK reduces what goes into the cache; caching reduces what you pay for what's already there. Different layers, both useful.

### Verdict

RTK is the most practical developer tool I've seen in the AI coding space. It solves a real problem — token waste from verbose shell output — with a clean technical approach and measurable results. The 63K stars in five months reflect genuine developer demand, not hype. If you're using any AI coding agent regularly, RTK should be in your toolkit. The installation is a one-liner, the savings are immediate, and the transparency means you don't change how you work. The only caveat is the Bash-only limitation on Claude Code's built-in tools, but that's a constraint of the agent, not RTK. For the 80% of AI coding work that happens through shell commands, this is a no-brainer install.
