---
name: system-prompts-leaks
description: "Extracted system prompts from 50+ AI models and tools including Claude, ChatGPT, Gemini, Codex, Cursor, and Copilot. 43K+ stars on GitHub."
url: https://github.com/asgeirtj/system_prompts_leaks
stars: 43191
forks: 7159
language: JavaScript
tags: ["ai", "prompt-engineering", "llm", "open-source", "developer-tools"]
featured: false
publishedAt: 2026-06-18
---

## System Prompts Leaks

### Overview

System Prompts Leaks is a community-maintained repository that documents the hidden system prompt instructions behind virtually every major AI chatbot and coding tool on the market. With over 43,000 GitHub stars and 7,100 forks, it has become the definitive reference for understanding what instructions AI models actually receive before they start talking to you. The Washington Post featured it in May 2026 with the headline "See the hidden rules behind AI. Then use them to rewrite this article" — a sign that this project has crossed from niche developer curiosity into mainstream relevance.

The repository is maintained by asgeirtj (Asgeir Sveen) and has been continuously updated since its creation in May 2025. It currently covers system prompts from Anthropic (Claude Fable 5, Opus 4.8, Claude Code, Claude Design), OpenAI (GPT-5.5 Thinking, GPT-5.5 Instant, Codex, plus every major version going back to GPT-4o), Google (Gemini 3.5 Flash, Gemini 3.1 Pro, Antigravity CLI), xAI (Grok), Microsoft (VS Code Copilot Agent, Copilot), Perplexity, Cursor, Docker Gordon AI, and Zed AI. Each prompt is extracted, documented, and timestamped. When new models ship, the repo typically has their system prompts within days.

The core problem this solves is opacity. Every AI model you interact with has a system prompt — a set of instructions that shapes its behavior, defines its capabilities, sets its safety boundaries, and determines how it responds to edge cases. These prompts are invisible to users and most developers. Yet they directly affect the output you get when building AI-powered features, writing prompts for production systems, or debugging unexpected model behavior. Without seeing the system prompt, you're guessing at the rules of a game you can't see.

### Why it matters

If you're building anything with AI in 2026 — an AI-powered feature in your React app, an agent workflow in your backend, a chatbot for your product — you're writing prompts against models whose behavior is shaped by hidden instructions. The system prompt is the most important piece of context your model receives, and until recently, nobody outside the AI companies knew what was in them.

This repository changes that. It gives developers a concrete understanding of how each model actually works. Want to know why Claude refuses certain requests? Check the system prompt — it literally says "I should not produce content that could be used to create weapons of mass destruction." Want to understand why ChatGPT handles coding differently than Claude Code? Compare their system prompts side by side. Want to know what capabilities Codex actually has vs. what OpenAI's docs claim? The extracted prompt is the ground truth.

The broader trend here is transparency in AI tooling. As AI models become infrastructure — embedded in IDEs, CI/CD pipelines, customer support systems, and content workflows — developers need to understand the constraints they're working within. System Prompts Leaks is the closest thing we have to documentation for the undocumented behavior of the tools that increasingly write, review, and deploy our code.

### Key Features

**Comprehensive Model Coverage.** The repo covers 50+ distinct system prompts across Anthropic, OpenAI, Google, xAI, Microsoft, Perplexity, Cursor, and others. Each major model version gets its own file — Claude Fable 5, Opus 4.8, Sonnet 4.6, GPT-5.5 Thinking, GPT-5.5 Instant, Codex, Gemini 3.5 Flash, and many more. Tool-specific prompts are separated: Claude Code's system prompt is distinct from Claude's chat prompt, and VS Code Copilot Agent has its own extracted instructions.

**Version-by-Version Diffs.** When Anthropic released Claude Fable 5, the repo included a link to a diff against Opus 4.8 so developers could see exactly what changed. This is incredibly useful for understanding how model behavior evolves between releases. If your prompts suddenly work differently after a model update, the diff tells you why.

**Developer Tool Prompts.** Beyond chatbot prompts, the repo extracts system prompts from developer-facing tools: Claude Code, Codex CLI (with per-model prompts and plan mode), VS Code Copilot Agent, Cursor, and Docker Gordon AI. These are the tools developers use daily, and understanding their internal instructions helps you write better prompts and debug unexpected behavior.

**Tool and Integration Details.** The repository doesn't just capture the main system prompt — it also documents tool-specific instructions. Claude Code's glob tool, grep tool, and deferred tools each have their own extracted prompts. OpenAI's web search, deep research, Python execution, image generation, memory, and file search tools are all documented. This granularity matters when you're building integrations that depend on specific tool capabilities.

**Regular Update Cadence.** The repository is updated within days of new model releases. The most recent entries (Claude Fable 5, Claude Code on Opus 4.8, GPT-5.5) were all added in May-June 2026. The traffic badge shows consistent weekly views, and the community actively submits PRs with new prompts. This isn't a stale archive — it's a living document that tracks the AI industry in real time.

**Raw and Human-Readable Formats.** For Anthropic models, the repo provides both raw prompts (exactly as extracted, with tool definitions and XML) and human-readable versions that strip away the technical scaffolding. This dual format is useful: the raw version helps you understand exactly what the model receives, while the human-readable version helps you understand the behavioral instructions.

**CC0 Public Domain License.** The entire repository is released under Creative Commons Zero — effectively public domain. You can use the extracted prompts in your own research, tooling, or analysis without any attribution requirements. This licensing choice reflects the project's mission: these prompts should be public knowledge, not trade secrets.

### Use Cases

- **Prompt engineering for production systems** — If you're building AI features in your app, understanding the system prompt tells you what constraints the model already operates under. You don't need to duplicate safety instructions or capability descriptions that the system prompt already handles.

- **Debugging unexpected model behavior** — When a model refuses a request or produces unexpected output, the system prompt often explains why. Instead of guessing and iterating blindly, check the extracted prompt for the relevant instructions.

- **Comparing models for your use case** — Thinking about switching from Claude to GPT-5.5 for your backend agent? Compare their system prompts to understand the behavioral differences that docs don't cover. Claude's approach to tool use is fundamentally different from OpenAI's, and the prompts make that explicit.

- **Building AI-powered developer tools** — If you're building an IDE extension, CI/CD integration, or code review tool that uses AI, the extracted prompts from Claude Code, Codex, and Copilot Agent show you how the existing tools are structured. Use them as reference architectures.

- **Security and red team research** — Understanding what instructions a model has received is the first step in testing its boundaries. Security researchers use these prompts to identify potential vulnerabilities in AI-powered systems.

- **Teaching prompt engineering** — The repository is an excellent educational resource. Instead of abstract prompt engineering advice, students and junior developers can study real production prompts from companies spending billions on AI.

### Pros and Cons

Pros:
- The most comprehensive collection of AI system prompts available anywhere, covering 50+ prompts across all major providers. Nothing else comes close in scope or update frequency.
- Featured by The Washington Post, which validates both the accuracy and the cultural significance of the project. The extracted prompts have been verified by researchers and journalists.
- The diff feature for tracking changes between model versions is genuinely unique and immediately practical for developers managing AI integrations across model updates.
- CC0 license means zero friction for using this in your own projects, research, or company documentation.

Cons:
- The extracted prompts may not always be complete or perfectly accurate. Companies can modify system prompts server-side without changing the model version, and extraction methods aren't foolproof. Treat them as high-quality approximations, not ground truth.
- The repository is primarily a collection of markdown files with minimal tooling. There's no API, no search functionality, no structured data format. If you want to programmatically analyze prompts across models, you'll need to build your own tooling.
- Some of the extracted prompts contain internal tool definitions and technical scaffolding that can be overwhelming. The raw format requires significant effort to parse and understand, especially for developers new to prompt engineering.
- The project exists in a legal and ethical gray area. Companies consider their system prompts proprietary. While the repo has been up for over a year without takedowns, the legal landscape around AI prompt extraction is unsettled.

### Getting Started

The repository is a collection of markdown files — no installation required. Browse directly on GitHub:

```bash
# Clone the repository for local browsing and analysis
git clone https://github.com/asgeirtj/system_prompts_leaks.git
cd system_prompts_leaks

# List all Anthropic prompts
ls Anthropic/

# View the latest Claude system prompt
cat Anthropic/claude-fable-5.md

# Compare two versions (requires diff tool)
diff Anthropic/claude-opus-4.8.md Anthropic/claude-fable-5.md

# List all OpenAI Codex prompts
ls OpenAI/Codex/
```

For developers who want to use these prompts in their own tooling:

```bash
# Search for specific instructions across all prompts
grep -r "tool_use" Anthropic/ --include="*.md"

# Find all prompts that mention a specific topic
grep -rl "safety" . --include="*.md" | head -20

# Extract just the behavioral instructions (skip tool definitions)
# Claude prompts typically have a "Core behavioral guidelines" section
grep -A 50 "Core behavioral" Anthropic/claude-fable-5.md
```

### Alternatives

**Anthropic's Published Prompts** — Anthropic officially publishes some Claude system prompts on their website (the repo includes these in the `Anthropic/Official/` directory). The official versions are guaranteed accurate but only cover a subset of models and are published on Anthropic's schedule, not when the model ships. Choose the official source when you need guaranteed accuracy; choose System Prompts Leaks when you need breadth and speed.

**OpenAI Model Spec** — OpenAI publishes a "Model Spec" document that describes the principles and rules governing ChatGPT's behavior. It's more abstract than a raw system prompt — think design philosophy vs. implementation details. The Model Spec tells you what OpenAI intends; System Prompts Leaks shows you what the model actually receives. Both are useful, but for different reasons.

**Simon Willison's Blog** — Simon Willison (co-creator of Django) regularly writes detailed analyses of AI system prompts and their implications. His blog posts provide expert commentary and context that the raw prompts lack. If System Prompts Leaks is the primary source, Simon's blog is the best secondary analysis. Subscribe to both.

### Verdict

System Prompts Leaks is the most important transparency project in the AI ecosystem right now, and it's not even close. At 43,000 stars, it has more GitHub stars than most of the AI frameworks developers argue about on Twitter. The Washington Post doesn't feature random GitHub repos — they featured this one because it reveals something the industry would prefer to keep hidden. For fullstack developers building AI-powered features, this repository is essential reading. You cannot effectively prompt-engineer against a model whose instructions you haven't read. You cannot debug unexpected behavior without understanding the constraints the model operates under. And you cannot evaluate whether a model fits your use case without comparing its system prompt to alternatives. The repo's only real weakness is that it's a flat collection of markdown files without programmatic access, but that's a minor complaint against a project that has done more for AI transparency than any corporate initiative. Bookmark it, clone it, and check it every time a new model drops.
