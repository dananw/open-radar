---
name: oh-my-pi
description: "Oh My Pi is a terminal-based AI coding agent with 10K+ GitHub stars — hash-anchored edits, 40+ LLM providers, LSP integration, and benchmark-optimized tool formats."
url: https://github.com/can1357/oh-my-pi
stars: 10505
forks: 877
language: TypeScript
tags: ["ai-agent", "coding-agent", "terminal", "typescript", "developer-tools"]
featured: false
publishedAt: 2026-06-05
---

## Oh My Pi

### Overview

Oh My Pi (omp) is a terminal-based AI coding agent that's racked up over 10,500 GitHub stars since its December 2025 launch. It's a fork of Mario Zechner's Pi coding agent, but the fork has arguably eclipsed the original — the contributor graph shows 4,420 commits from the lead maintainer (Can Bolay, a prolific systems programmer) against 1,343 from the original Pi author. That kind of sustained investment over six months signals something more than a weekend project.

The core pitch is "benchmaxxed tools." Most coding agents bolt an edit format onto an LLM and hope for the best. Oh My Pi takes a different approach: every built-in tool — read, search, edit, LSP operations — has been iteratively optimized against real benchmarks with multiple models. The results are concrete. Grok Code Fast went from 6.7% to 68.3% edit accuracy the moment the tool format stopped eating the model alive. Gemini 3 Flash gained 5 percentage points over Google's own str_replace format. MiniMax's pass rate more than doubled. Same weights, same prompts — just better tool schemas.

The project is built in TypeScript with a ~27,000-line Rust core, runs on Bun, and ships as a single binary across macOS, Linux, and Windows. It supports 40+ LLM providers out of the box, includes 32 built-in tools, 13 LSP operations, and 27 DAP (debug adapter) operations. That's a wider surface area than most IDEs expose to their own plugins.

### Why it matters

The AI coding agent space is crowded. Claude Code, Cursor, Aider, OpenCode, Windsurf — every few weeks there's a new entrant. But most of these tools share a common weakness: their tool formats are designed for one model family and work poorly with others. Switch from Claude to Gemini or Grok and your edit success rate tanks. Oh My Pi attacks this problem head-on by treating tool format optimization as a first-class engineering concern, not an afterthought.

For fullstack web developers who work across multiple LLM providers — maybe Claude for complex refactors, Gemini for quick edits, a local model for offline work — this provider-agnostic approach matters. You shouldn't have to rewrite your workflow because you switched models. The 40+ provider support isn't just a checkbox; each provider gets tuned tool formats that actually work.

The LSP integration angle is equally important. Most coding agents parse files as text. Oh My Pi connects to language servers, so the agent gets the same semantic understanding your IDE has — go-to-definition, find references, type information, diagnostics. When you're working across React, NestJS, Django, and Go codebases in a single session, that semantic awareness is the difference between an agent that guesses and one that knows.

### Key Features

**Benchmaxxed Tool Formats.** Every built-in tool has been optimized against real benchmarks with multiple LLM providers. The edit format alone caused a 10x improvement for Grok Code Fast (6.7% to 68.3%). This isn't prompt engineering voodoo — it's systematic testing of tool schemas against model capabilities, with concrete pass-rate metrics published for each model.

**LSP Integration.** Thirteen language server protocol operations are wired into every write. The agent gets go-to-definition, find-references, hover documentation, diagnostics, and code actions — the same semantic tools your IDE uses. This is particularly valuable in polyglot projects where you're switching between TypeScript, Python, and Go in a single session.

**DAP Debugging Support.** Twenty-seven debug adapter protocol operations let the agent set breakpoints, step through code, inspect variables, and evaluate expressions. Most coding agents can't debug at all; they just read error messages and guess. Oh My Pi can actually trace through your code.

**Code Execution with Tool-Calling Bridge.** Persistent Python and Bun kernels run inside the agent, and either can call back into the agent's own tools — read, search, task — over a loopback bridge. Load a CSV with tool.read from inside Python, chart it from JavaScript, and never leave the session. This is more capable than the typical "run a sandbox and capture output" approach.

**40+ Provider Support.** Works with OpenAI, Anthropic, Google, Grok, MiniMax, Mistral, and dozens of others. Each provider gets optimized tool formats and model-specific prompt adjustments. Switch providers mid-session without losing context or changing your workflow.

**Subagents for Parallel Work.** Dispatch specialized subagents (coder, explore, plan) in isolated contexts while keeping the main conversation clean. Useful for large refactors where you want the agent to explore the codebase in parallel before making changes.

**Single Binary Distribution.** Install with one curl command — no Node.js setup, no PATH gymnastics, no global module conflicts. Shell completions for bash, zsh, and fish are generated from live command metadata, so they never drift from the actual CLI.

### Use Cases

- **Polyglot fullstack projects** — Developers working across React, NestJS, Django, and Go benefit from LSP-aware editing that understands each language's semantics, not just its syntax.
- **Model-hopping workflows** — Teams that use Claude for architecture, Gemini for bulk edits, and a local model for sensitive code can switch providers without retraining their muscle memory.
- **Debugging complex issues** — The DAP integration lets the agent step through code and inspect state, which is far more effective than the "read the stack trace and guess" approach most agents use.
- **Data exploration and prototyping** — The Python/Bun execution bridge with tool-calling lets you load data, analyze it, and build visualizations in a single agent session without context-switching to a notebook.
- **Large-scale refactoring** — Subagents can explore a codebase in parallel, map dependencies, and propose changes while the main agent coordinates the overall plan.

### Pros and Cons

Pros:
- The benchmaxxed tool format approach produces measurably better results across multiple model families. The 10x improvement on Grok Code Fast isn't marketing — it's published benchmark data.
- LSP and DAP integration gives the agent semantic understanding that text-only agents lack. This matters most in large, polyglot codebases.
- Active development with 4,420 commits from the lead maintainer in six months, plus a growing community (877 forks, 274 open issues suggesting active use).
- Single binary distribution with no runtime dependencies makes installation painless across all platforms.

Cons:
- It's a fork of Pi, and the relationship between the fork and upstream could get complicated. The original Pi project still exists and evolves independently.
- 274 open issues as of June 2026 suggest the API surface is still settling. Expect breaking changes.
- The Rust core adds complexity for contributors who want to modify the low-level tool implementations. You need both TypeScript and Rust skills to contribute to the full stack.
- No GUI — it's terminal-only. Developers who prefer visual interfaces won't find a desktop app or web UI here.

### Getting Started

```bash
# Install via the official script (macOS/Linux)
curl -fsSL https://omp.sh/install | sh

# Or install via Bun (recommended for Bun users)
bun install -g @oh-my-pi/pi-coding-agent

# Windows (PowerShell)
irm https://omp.sh/install.ps1 | iex

# Verify installation
omp --version

# Start an interactive session in your project
cd your-project
omp

# Set up shell completions (zsh example)
eval "$(omp completions zsh)"
```

On first launch, configure your preferred provider:

```
/model anthropic/claude-sonnet-4-20250514
```

Or use environment variables:

```bash
export ANTHROPIC_API_KEY=sk-ant-...
omp
```

### Alternatives

**Claude Code** — Anthropic's official terminal coding agent. More tightly integrated with Claude models and Anthropic's ecosystem, but locked to a single provider. Better choice if you only use Claude and want the deepest possible integration with Anthropic's features (extended thinking, computer use, etc.).

**Aider** — A Python-based pair programming agent that's been around longer and has a larger community. Aider excels at git-aware editing and has excellent multi-file edit support. Better choice if you want a mature, well-documented tool with strong git integration and don't need LSP/DAP features.

**OpenCode** — An open-source coding agent that ships pre-installed in many sandboxed environments. OpenCode is simpler and more focused — good for quick tasks in containerized setups. Better choice if you need a lightweight agent for CI/CD pipelines or sandbox environments where Oh My Pi's full feature set is overkill.

### Verdict

Oh My Pi is the most technically ambitious coding agent I've seen in the terminal. The benchmaxxed approach — actually benchmarking tool formats against multiple models and publishing the results — is refreshingly rigorous in a space full of vibes-based claims. The LSP and DAP integration puts it in a different category from text-only agents like Aider or basic CLI wrappers. If you're a fullstack developer who works across multiple languages and LLM providers, and you're comfortable in a terminal, this is worth trying over the more popular alternatives. The 10.5K stars in six months, mostly organic growth from the developer community rather than a big company backing, suggest the tool is earning its reputation on merit. The main risk is maturity — 274 open issues and active API evolution mean you'll hit rough edges. But for a tool this capable, that's a trade-off worth making early.
