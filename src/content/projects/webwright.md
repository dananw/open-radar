---
name: webwright
description: "Webwright is Microsoft's lightweight browser agent framework that achieves SOTA results on long-horizon web tasks using code-as-action paradigm with Playwright."
url: https://github.com/microsoft/Webwright
stars: 5193
forks: 309
language: Python
tags: ["browser-agent", "ai", "automation", "playwright", "microsoft"]
featured: false
publishedAt: 2026-06-08
---

## Webwright

### Overview

Webwright is Microsoft Research's answer to the browser agent problem, and it's the most refreshingly minimal take I've seen in a crowded field. At just ~1,500 lines of code, it achieves state-of-the-art results on two real-website benchmarks — 86.7% on Online-Mind2Web and 60.1% on the long-horizon Odysseys benchmark — beating frameworks with ten times the complexity.

The project launched in early May 2026 and crossed 5,000 GitHub stars within a month. That growth rate makes sense when you look at the design philosophy: instead of building yet another multi-agent orchestration layer, Webwright gives the LLM a terminal and lets it write Python scripts to control a browser. The browser is disposable. The code is the artifact. It's the kind of insight that feels obvious in retrospect but nobody had shipped cleanly before.

The core insight is architectural. Most web agents treat the browser session as the workspace — at each step, the model receives the current page state and predicts a single next action. Webwright flips this: the agent writes a complete, reusable Python script, executes it, inspects screenshots when needed, and repairs the code if something breaks. The persistent artifact isn't the browser session. It's the code and logs in your local workspace. That shift matters because it means your web automation is reproducible, debuggable, and composable — properties that step-by-step agents fundamentally cannot provide.

### Why it matters

The browser agent space has been heating up since mid-2025, with projects like browser-use, Stagehand, and various Claude Code plugins competing for developer attention. But most of them share the same architectural assumption: the agent should predict one action at a time in a loop. That works for simple tasks. It falls apart on long-horizon workflows — the kind where you need to book a flight with specific constraints, compare prices across multiple sites, or fill out a multi-step government form.

Webwright's code-as-action paradigm solves this elegantly. When the agent writes a script with loops, conditionals, and error handling, it can generalize across similar tasks without re-predicting the same low-level sequences. A script that books a flight for one date works for any date with a parameter change. That's composability that step-by-step agents can't match.

For fullstack developers, this hits different. You already think in code. You already know Playwright. Webwright doesn't ask you to learn a new DSL or debug an opaque agent loop — it's just Python scripts that control a browser. If you're building internal tools, scraping workflows, or testing pipelines that need AI-driven navigation, Webwright is the framework that respects your existing mental model.

### Key Features

**Code-as-Action Paradigm.** Instead of predicting discrete UI actions (click, type, scroll), the agent writes complete Python scripts using Playwright. This means the output is reusable, debuggable, and version-controllable — just like any other code you write. The scripts handle dynamic behaviors like lazy loading and re-rendering because the agent writes proper wait conditions, not pixel coordinates.

**Minimal Footprint.** The entire framework is roughly 1,500 lines of code spread across a few files: the core agent loop (~450 lines), the Playwright environment (~570 lines), and the CLI (~150 lines). There are no hidden abstractions, no graph engines, no plugin layers. You can read the whole codebase in an afternoon and fork it for your specific needs.

**Pluggable Model Backends.** Webwright supports OpenAI, Anthropic, and OpenRouter out of the box, each implemented in 150-200 lines. Adding a new backend means writing one file. The framework doesn't lock you into any particular model provider, and the benchmarks show strong results across GPT-5.4, Claude Opus 4.7, and even smaller models like Qwen-3.5-9B when paired with reusable tool scripts.

**Workspace-as-State Architecture.** The browser is disposable — the agent can spawn fresh sessions, inspect screenshots, and discard them freely. What persists is the workspace: code files, trajectories, screenshots, and logs written to disk. This makes debugging straightforward. When something fails, you have the exact script, the exact screenshots, and the exact error. No opaque agent state to reverse-engineer.

**Task2UI Mode.** A recent addition (May 2026) that lets Webwright complete a task and render the results into an HTML-based web app you can view and reuse. This turns a browser automation script into a lightweight dashboard — useful for data extraction workflows where you want a human-readable output, not just a JSON dump.

**Agent Skill Integration.** Webwright ships as a plugin/skill for Claude Code, Codex, OpenClaw, and Hermes Agent. Install it with `/plugin install webwright@webwright` and your existing coding agent gains browser capabilities. This is the fastest path to adding web automation to an agent-driven workflow without rewriting your toolchain.

**SOTA Benchmark Results.** On Online-Mind2Web (300 tasks), Webwright hits 86.7% with GPT-5.4 — the highest among open-sourced harnesses. On Odysseys (200 long-horizon tasks), it scores 60.1%, which is +15.6 points over the prior SOTA. These aren't cherry-picked numbers. The benchmarks use real websites with real complexity, and the results are reproducible.

### Use Cases

- **Internal tool automation** — Automate repetitive multi-step workflows in admin dashboards, CRMs, or ERP systems where APIs aren't available. The generated scripts are reusable and can be scheduled.
- **Web scraping at scale** — Build robust scraping pipelines that handle dynamic content, pagination, and authentication. The code-as-action approach means your scrapers are proper programs, not fragile selector chains.
- **QA and regression testing** — Generate browser test scripts from natural language descriptions. The Playwright output integrates directly with existing test frameworks.
- **Research and data collection** — Automate data gathering from multiple websites for market research, price comparison, or academic studies. The Task2UI mode makes results immediately viewable.
- **Agent-driven development workflows** — Add browser capabilities to Claude Code, Codex, or Hermes Agent for tasks that require web interaction — checking documentation, testing deployed apps, or verifying production behavior.

### Pros and Cons

Pros:

- The code-as-action paradigm produces reusable, debuggable scripts instead of opaque agent state. When something breaks, you have the exact code and screenshots — no reverse-engineering required.
- At ~1,500 lines of code, the entire framework is readable and forkable. No hidden magic, no framework lock-in, no 10,000-line abstractions to navigate.
- SOTA benchmark results on real-website tasks prove the approach works in practice, not just in demos. The 60.1% on Odysseys long-horizon tasks is a meaningful improvement over prior approaches.
- Native integration with Claude Code, Codex, OpenClaw, and Hermes Agent means you can add browser capabilities to your existing workflow with one plugin install.

Cons:

- Python-only means you need a Python environment even if your stack is TypeScript or Go. The Playwright dependency adds setup friction for teams not already using it.
- The code-as-action paradigm works best when the agent has time to write and iterate. For simple, single-step interactions (click one button, fill one field), the overhead of script generation may not be worth it compared to direct action prediction.
- Benchmarks use a 100-step budget, which is generous. Real-world performance on tighter constraints or with rate-limited websites hasn't been as thoroughly documented.

### Getting Started

```bash
# Install Webwright
pip install webwright

# Run a task with the CLI
webwright run "Search for the cheapest round-trip flight from SFO to JFK next month" \
  --model openai --max-steps 50

# Use as a Python library
from webwright import Agent, PlaywrightEnvironment

env = PlaywrightEnvironment()
agent = Agent(model="anthropic", environment=env)
result = agent.run("Find the top 5 HN stories and summarize them")
print(result.code)  # The generated Python script
print(result.screenshots)  # Captured screenshots

# Install as a Claude Code skill
# In your Claude Code session:
/plugin install webwright@webwright
```

### Alternatives

**browser-use** — The most popular open-source browser agent with 50K+ GitHub stars. browser-use uses an observe-predict-execute loop with indexed DOM actions, which is simpler to set up but produces non-reusable agent state. Choose browser-use when you want a quick, interactive browser agent and don't need reproducible scripts. Choose Webwright when you need automation that's debuggable and composable.

**Stagehand (Browserbase)** — A hybrid framework that combines code with natural-language primitives (`act`, `extract`, `agent`). Stagehand is more opinionated and has a hosted infrastructure layer. It's a better fit for teams that want a managed browser cloud with built-in session recording. Webwright is the better choice when you want full control and minimal dependencies.

**agent-browser (Vercel)** — A CLI tool that works as a micro-step executor for other agents like Claude Code and Codex. It's lighter than Webwright but more constrained — each invocation handles one discrete action. Choose agent-browser when your agent just needs occasional browser access. Choose Webwright when you're building end-to-end browser automation workflows.

### Verdict

Webwright is the browser agent framework I'd reach for in mid-2026. The code-as-action paradigm isn't just clever — it produces results that beat every competing approach on real benchmarks. At 1,500 lines of code, it's the rare AI framework you can actually understand, debug, and extend without reading a PhD thesis. The Microsoft Research pedigree gives it credibility, and the rapid adoption (5K stars in a month) suggests the developer community agrees with the design choices. If you're building anything that involves AI-driven browser automation — internal tools, scraping pipelines, QA workflows, or agent integrations — Webwright deserves a serious look. The fact that it plugs directly into Claude Code, Codex, and Hermes Agent as a skill makes adoption almost frictionless. This is how browser agents should have worked from the start.
