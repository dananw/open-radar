---
name: caveman
description: "Caveman is a Claude Code skill that cuts 65% of AI output tokens by making agents talk like caveman — same accuracy, fewer words, lower cost. 70K GitHub stars."
url: https://github.com/JuliusBrussee/caveman
stars: 69935
forks: 3944
language: JavaScript
tags: ["developer-tools", "prompt-engineering", "ai-agents", "token-optimization", "claude-code"]
featured: false
publishedAt: 2026-06-08
---

## Caveman

### Overview

Caveman is a skill plugin for Claude Code that makes your AI coding agent talk like a caveman — dropping filler words, using sentence fragments, and compressing responses while keeping full technical accuracy. The result: roughly 65% fewer output tokens, faster responses, and lower API costs. Created by Julius Brussee in April 2026, the repo exploded to nearly 70,000 GitHub stars in two months. That kind of growth is rare for a developer tool, and it happened almost entirely through word-of-mouth on Twitter and Reddit.

The premise is dead simple. When you ask Claude Code to explain why your React component is re-rendering, you don't need a 118-token essay. You need: "New object ref each render. Inline object prop = new ref = re-render. Wrap in `useMemo`." Same fix. 19 tokens. The agent's reasoning stays intact — caveman only compresses the *output*, not the thinking. Your model still reasons at full capacity; it just stops being polite about it.

What makes caveman interesting beyond the meme is the ecosystem Brussee built around it. There's `caveman-code`, a full terminal coding agent built caveman-style. There's `cavemem` for cross-agent memory compression. There's `cavekit` for spec-driven build loops. And there's `cavegemma`, a fine-tuned Gemma 4 31B model where caveman compression is baked into the weights rather than prompted. One philosophy — agent do more with less — applied at every layer of the stack.

### Why it matters

Token cost is the silent budget killer in AI-assisted development. If you're running Claude Code or a similar agent for eight hours a day, output tokens dominate your spend. Most developers don't think about it because the per-request cost feels small. But multiply verbose responses across hundreds of interactions per day, across a team of ten, across a month — the numbers get ugly fast. Caveman attacks this problem at the prompt level, which is the cheapest place to solve it. No model fine-tuning, no infrastructure changes, no vendor lock-in. One skill file dropped into your agent config.

There's also a research angle. A March 2026 paper titled "Brevity Constraints Reverse Performance Hierarchies in Language Models" (arXiv:2604.00025) found that constraining large models to brief responses *improved* accuracy by 26 points on certain benchmarks. Verbose isn't always better. Sometimes fewer words means more correct answers. Caveman's benchmarks support this — the same technical content, delivered faster, with measurable cost savings. For fullstack developers who use AI agents daily, this is a practical optimization that compounds over time.

### Key Features

**Four Compression Levels.** Caveman ships with four verbosity modes you can switch between mid-session. `lite` drops filler words and pleasantries. `full` is the default caveman mode — fragments, no articles, direct verbs. `ultra` goes telegraphic, stripping everything down to bare essentials. `wenyan` is classical Chinese style, even shorter than ultra. Pick the level that matches your tolerance. One command to switch: `/caveman full`.

**Companion Slash Commands.** Beyond the core compression, caveman adds several utility commands. `/caveman-commit` generates Conventional Commit messages with a 50-character subject line. `/caveman-review` produces one-line PR comments like `L42: 🔴 bug: user null. Add guard.` `/caveman-stats` shows real session token usage, lifetime savings in USD, and a tweetable summary line. Each command is optional — install what you need.

**Memory File Compression.** The `/caveman-compress <file>` command rewrites your project memory files — CLAUDE.md, project notes, preferences — into caveman-speak. This cuts input tokens by roughly 46% on average. Since these files are loaded into context every session, the savings compound. One compression, permanent reduction. URLs, file paths, and code blocks are byte-preserved — only prose gets compressed.

**MCP Middleware (caveman-shrink).** For developers using Model Context Protocol servers, `caveman-shrink` is an npm package that wraps any MCP server and compresses tool descriptions before they reach the model. This reduces the context window footprint of your tool definitions, leaving more room for actual work. Works with any MCP-compatible agent.

**Sub-Agent Delegation (cavecrew).** Caveman includes sub-agent roles — investigator, builder, reviewer — that operate in caveman mode. These sub-agents produce roughly 60% fewer tokens than vanilla sub-agents, which means your main agent's context window stays usable longer. For complex multi-step tasks, this is where the biggest savings happen.

**Universal Agent Support.** The installer auto-detects and configures caveman for Claude Code, Codex, Gemini CLI, Cursor, Windsurf, Cline, GitHub Copilot, and 30+ other agents. One curl command, thirty seconds, works on macOS, Linux, WSL, and Windows PowerShell. If you switch agents later, caveman follows.

**Statusline Integration.** Claude Code shows a `[CAVEMAN] ⛏ 12.4k` badge in the statusline with your lifetime tokens saved. Updates every time you run `/caveman-stats`. It's a small thing, but watching the number climb is oddly motivating.

### Use Cases

- **Cost-conscious development teams** — Teams running AI coding agents across 5-10 developers see meaningful API cost reductions. At 65% output token savings, a team spending $500/month on Claude Code could save over $300/month with zero workflow changes.

- **Long coding sessions** — When you're deep in a debugging session with 200+ agent interactions, verbose responses slow you down. Caveman keeps responses scannable so you can read the fix and move on without parsing paragraphs of explanation.

- **Context window management** — Smaller responses mean your conversation history stays manageable longer. Less garbage in the context window means the agent stays coherent on complex, multi-file refactors.

- **CI/CD and automated agents** — If you're running AI agents in pipelines or automated workflows, output tokens are pure cost with no human reader. Caveman compresses them to the minimum viable output.

- **Multi-agent workflows** — When your main agent delegates to sub-agents, caveman-equipped sub-agents return shorter results, preserving the main agent's context for the actual task.

### Pros and Cons

Pros:
- Measurable 65% average output token reduction with benchmarks published in the repo. The numbers are real — 22% to 87% range depending on task complexity, with the highest savings on explanation-heavy tasks.
- Zero infrastructure changes required. One skill file, one install command, works with your existing agent setup. No vendor lock-in, no new tools to learn.
- The ecosystem approach is smart. caveman-code, cavemem, cavekit, and cavegemma compose together but each works independently. You can adopt one piece or all five.
- MIT licensed and actively maintained. Brussee responds to issues quickly and the community contributes domain-specific optimizations.

Cons:
- The caveman voice can be jarring at first. If you're used to Claude's polite, structured responses, fragments like "Bug in auth middleware. Token expiry check use `<` not `<=`. Fix:" take some getting used to.
- Savings vary heavily by task type. Architecture discussions and code reviews see 30-41% savings, while bug explanations hit 80%+. Don't expect uniform 65% across everything.
- The meme framing might turn off some teams. "Talk like caveman" is fun for individual developers but might not fly in enterprise settings where AI usage is already scrutinized.
- No streaming optimization. Caveman compresses what the agent *says*, but the tokens still stream through the API at the same rate. The savings are in total count, not latency per-token.

### Getting Started

```bash
# macOS / Linux / WSL / Git Bash
curl -fsSL https://raw.githubusercontent.com/JuliusBrussee/caveman/main/install.sh | bash

# Windows (PowerShell 5.1+)
irm https://raw.githubusercontent.com/JuliusBrussee/caveman/main/install.ps1 | iex

# Requires Node ≥ 18. Auto-detects installed agents. Safe to re-run.
```

Once installed, trigger caveman in any session:

```bash
# In Claude Code or compatible agent:
/caveman              # activate full caveman mode
/caveman lite         # lighter compression
/caveman ultra        # maximum compression
/caveman stats        # see your token savings
/caveman-compress CLAUDE.md  # compress a memory file
```

To install for a specific agent only:

```bash
curl -fsSL https://raw.githubusercontent.com/JuliusBrussee/caveman/main/install.sh | bash -s -- --only claude-code
```

### Alternatives

**Answer concisely prompts** — The simplest alternative is adding "Be concise" or "Answer in bullet points" to your system prompt. This gets you maybe 10-20% compression. Caveman's structured approach — fragments, no articles, verb-first sentences — consistently outperforms freeform "be brief" instructions by 40+ points. Choose manual prompts if you want full control over tone and don't mind the lower savings.

**caveman-code** — Brussee's own full terminal coding agent built caveman-style from the ground up. Where caveman (this repo) compresses what an existing agent *says*, caveman-code compresses *everything* — planning, tool calls, memory, output. It claims ~2× fewer tokens than Codex on identical tasks. Choose caveman-code if you want a complete agent replacement rather than a plugin for your current one.

**Custom system prompts** — You could write your own compression rules in a CLAUDE.md or system prompt. The advantage is total control. The disadvantage is you'll spend hours tuning what caveman already optimized across thousands of users. Choose custom prompts if you need domain-specific compression patterns that caveman's general rules don't cover.

### Verdict

Caveman is the most practical AI productivity tool I've seen this year. Not because the idea is novel — "be concise" is obvious — but because the execution is meticulous. The benchmarks are real, the install is frictionless, the savings are immediate, and the ecosystem around it shows this isn't a one-off joke. At 70,000 stars in two months, it's one of the fastest-growing developer tools on GitHub, and that growth is almost entirely organic. If you use Claude Code, Codex, or any AI coding agent daily, install caveman today. It takes thirty seconds and you'll see the difference in your first session. The cost savings alone justify it for any team spending more than $100/month on AI coding tools.
