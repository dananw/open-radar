---
name: codeburn
description: "CodeBurn is an open-source TUI dashboard that tracks AI coding token usage, cost, and performance across 25 tools — Claude Code, Codex, Cursor, and more."
url: https://github.com/getagentseal/codeburn
stars: 7604
forks: 572
language: TypeScript
tags: ["developer-tools", "ai-coding", "cost-observability", "cli", "open-source"]
featured: false
publishedAt: 2026-06-04
---

## CodeBurn

### Overview

CodeBurn is an open-source terminal dashboard that shows you exactly where your AI coding money goes. It tracks token usage, cost, and performance across 25 AI coding tools — Claude Code, Codex, Cursor, Gemini CLI, GitHub Copilot, and about twenty others. The project hit 7,600 GitHub stars within seven weeks of its April 2026 launch, which tracks with how many developers are currently burning through AI coding budgets without any visibility into where the tokens actually land.

The project is built by the team at GetAgentSeal. It's a TypeScript CLI tool that reads session data directly from your local disk — no wrapper, no proxy, no API keys required. It prices every API call using LiteLLM's model pricing database, cached locally for 24 hours, with hardcoded fallbacks for Claude and GPT models to prevent fuzzy-matching mispricing. The whole thing runs locally, which is a deliberate design choice: your code and prompts never leave your machine.

The core problem it solves is painfully familiar to anyone using AI coding tools professionally. You're paying for Claude Code, maybe Codex too, possibly Cursor on the side. Your team is spending hundreds or thousands of dollars per month on AI-assisted development. But when someone asks "how much did that feature cost to build?" or "which model is actually cheapest for our refactoring work?" — nobody has an answer. CodeBurn gives you that answer.

### Why it matters

AI coding tools have gone from experimental to essential in roughly 18 months. Claude Code, Cursor, Codex, Gemini CLI, and their peers are now standard equipment for professional developers. The problem is that most teams have zero cost observability. They see a monthly bill from Anthropic or OpenAI and treat it as a fixed cost, like electricity. It's not. It's a variable cost that varies wildly by task type, model choice, and developer behavior.

The timing is significant. As AI coding moves from individual experimentation to team-wide adoption, cost management becomes a real engineering concern. A senior developer running Claude Opus for everything might cost 5x more than a teammate who switches between Opus for architecture and Haiku for quick edits. CodeBurn makes that visible. The `compare` command lets you run side-by-side model comparisons, and the `optimize` command scans your sessions for waste and gives you copy-paste fixes.

This connects to a broader trend: the AI coding tool ecosystem is fragmenting fast. There are now 25+ tools competing for developer attention, and many developers use two or three simultaneously. CodeBurn is the first tool that unifies cost tracking across all of them. That cross-tool visibility is what makes it genuinely useful rather than just another dashboard.

### Key Features

**25 Provider Support.** CodeBurn auto-detects which AI coding tools you have installed and reads their session data directly. It supports Claude Code, Claude Desktop, Cline, Codex, Cursor, Cursor Agent, Forge, Gemini CLI, Mistral Vibe, GitHub Copilot, IBM Bob, Kiro, OpenCode, OpenClaw, Pi, OMP, Droid, Roo Code, KiloCode, Qwen, Kimi Code CLI, Goose, Antigravity, Crush, and Warp. Each provider has documented data locations and known quirks. If multiple providers have data on disk, press `p` in the dashboard to toggle between them.

**13 Task Categories.** Every session is classified into one of 13 categories: Coding, Debugging, Feature Dev, Refactoring, Testing, Exploration, Planning, Delegation, Git Ops, Build/Deploy, Brainstorming, Conversation, and General. The classification is fully deterministic — no LLM calls, no API costs. It uses tool usage patterns and user message keywords to categorize each turn. This means you can see whether your team spends more tokens on debugging than on writing new code, and adjust accordingly.

**One-Shot Rate Tracking.** For code-editing tasks, CodeBurn tracks file-aware retry cycles. A retry is when the same file gets re-edited after a shell command in between — Edit foo.ts, Bash, Edit foo.ts counts as a retry. Editing different files across shell steps doesn't. The one-shot column shows the percentage of edit turns that succeeded without retries. Coding at 90% means the AI got it right first try 9 out of 10 times. This metric alone tells you more about your AI coding effectiveness than any benchmark.

**Optimize Command.** Run `codeburn optimize` to scan your sessions for waste. It identifies patterns like redundant context loading, excessive tool calls, and expensive model usage for simple tasks. The output includes copy-paste fixes — specific prompt adjustments or model switching recommendations. Scope it to today, the last week, or the last 30 days with the `-p` flag.

**Model Comparison.** The `compare` command gives you side-by-side model analysis. See exactly how much each model costs per task type, what the one-shot rates look like, and where cheaper models could replace expensive ones without quality loss. This is the feature that actually changes developer behavior.

**Yield Analysis.** The `yield` command tracks productive versus reverted or abandoned spend. Not every AI coding session results in committed code. Some sessions produce code that gets reverted. Some get abandoned entirely. CodeBurn tracks this ratio so you can see your effective cost per useful line of code, not just your raw token spend.

**Zero-Config Local Operation.** Everything runs locally with no configuration. Install it, run it, and it finds your session data automatically. No API keys to manage, no proxy to configure, no data leaving your machine. The pricing data comes from LiteLLM and is cached locally. Hardcoded fallbacks for all Claude and GPT models prevent the kind of fuzzy-match mispricing that would make the cost numbers unreliable.

### Use Cases

- **Engineering managers tracking AI spend** — See per-project, per-model, and per-developer cost breakdowns to make informed decisions about tool allocation and model selection.
- **Individual developers optimizing their workflow** — Use the optimize and compare commands to find the cheapest model that produces equivalent quality for each task type.
- **Teams evaluating AI coding tools** — Run CodeBurn across multiple providers simultaneously to get objective cost and quality comparisons before committing to a platform.
- **Freelancers billing AI costs to clients** — Export cost data per project with `codeburn export` to justify AI-assisted development charges with real numbers.
- **DevOps tracking CI/CD AI usage** — Monitor token consumption in automated pipelines where AI tools handle code review, test generation, or deployment scripts.

### Pros and Cons

Pros:
- Zero-config local operation means you can start tracking costs in under a minute. No API keys, no proxy setup, no data leaving your machine.
- Cross-tool support across 25 providers is unmatched. No other tool gives you unified cost visibility across Claude Code, Codex, Cursor, and their peers.
- The one-shot rate metric is genuinely useful — it tells you how often the AI gets code right on the first try, which correlates directly with cost efficiency.
- Active development with rapid provider additions. The project added support for Mistral Vibe, Kimi Code CLI, and several others within weeks of launch.

Cons:
- Token estimation varies by provider. Some tools (Cursor, Kiro, GitHub Copilot) don't expose exact token counts, so CodeBurn estimates from content length. The numbers are useful for trends but not precise billing.
- The TUI dashboard requires a terminal with decent rendering. It works in iTerm2, Kitty, and modern terminals, but older terminals may have display issues.
- No web dashboard or API. If your team wants shared cost visibility, everyone needs to run CodeBurn locally. There's no central server mode for team-wide aggregation.

### Getting Started

```bash
# Install globally
npm install -g codeburn

# Or with Homebrew
brew install codeburn

# Or run directly
npx codeburn

# Launch the interactive dashboard (default: last 7 days)
codeburn

# Check today's usage
codeburn today

# View this month's breakdown
codeburn month

# Find waste and get optimization suggestions
codeburn optimize

# Compare models side by side
codeburn compare

# Track productive vs abandoned spend
codeburn yield

# Export cost data as CSV
codeburn export

# Filter to a specific provider
codeburn report --provider claude

# Get a compact one-liner summary
codeburn status
```

Arrow keys switch between Today, 7 Days, 30 Days, Month, and 6 Months views. Press `q` to quit, `c` for model comparison, `o` for optimize, `p` to toggle providers. The dashboard auto-refreshes every 30 seconds by default.

### Alternatives

**Helicone** — A hosted LLM observability platform that tracks costs across API calls. Helicone requires routing your API calls through their proxy, which adds latency and means your prompts pass through their infrastructure. It's better for teams that want a web dashboard and don't mind the proxy model. CodeBurn is the better choice if you want zero-config local tracking with no data leaving your machine.

**LiteLLM** — The pricing database that CodeBurn uses internally. LiteLLM itself is a proxy server that unifies LLM API calls and tracks costs. It's more powerful for teams running centralized AI infrastructure, but requires configuration and a running server. CodeBurn is simpler for individual developers who just want to see what they're spending.

**LangSmith** — LangChain's observability platform for LLM applications. It's designed for tracking AI agent and chain performance, not individual developer coding costs. Better choice if you're building AI applications with LangChain and need trace-level debugging. Overkill if you just want to know how much Claude Code cost you this week.

### Verdict

CodeBurn fills a gap that most developers didn't realize they had until they saw the numbers. The moment you run it and discover you've spent $47 on debugging alone this week — or that your one-shot rate is 60% instead of the 90% you assumed — you start making different decisions. The 7,600 stars in seven weeks reflect genuine demand, not hype. If you're using any AI coding tool professionally and you don't have cost visibility, CodeBurn is the tool to install today. It's free, it's local, it takes 30 seconds to set up, and the optimize command alone will probably save you more than it costs to read this paragraph.
