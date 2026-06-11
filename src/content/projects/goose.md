---
name: goose
description: "Open source AI agent by Block with 48k+ stars — Rust-based desktop, CLI, and API for code, workflows, and automation with MCP support and 70+ extensions."
url: https://github.com/aaif-goose/goose
stars: 48822
forks: 5140
language: Rust
tags: ["ai-agent", "mcp", "open-source", "rust", "llm", "automation"]
featured: false
publishedAt: 2026-06-11
---

## Goose

### Overview

Goose is a general-purpose open source AI agent that runs locally on your machine — and it's one of the most starred AI agent projects on GitHub with over 48,800 stars and 5,100 forks. Built in Rust for performance and portability, it ships as a native desktop app for macOS, Linux, and Windows, a full CLI for terminal workflows, and an API you can embed anywhere. Unlike most AI coding assistants that lock you into a single LLM provider, Goose works with 15+ providers including Anthropic, OpenAI, Google, Ollama, OpenRouter, Azure, and Bedrock. You can even use your existing Claude, ChatGPT, or Gemini subscriptions directly through the Agent Client Protocol (ACP).

The project was originally created by Block (the company behind Square and Cash App) and has since moved to the Agentic AI Foundation (AAIF) under the Linux Foundation. This matters because it means Goose isn't going to get acquired, sunset, or pivoted into a SaaS product — it's governed as a vendor-neutral, community-driven open source project for the long term. The contributor base is substantial: 500+ contributors have committed code, and the project maintains an active Discord community and a Skills Marketplace where users share reusable workflows.

The core architecture is built around the Model Context Protocol (MCP), the open standard for connecting AI agents to tools and data sources. Goose was one of the earliest MCP adopters and ships with 70+ documented extensions — databases, APIs, browsers, GitHub, Google Drive, and more. The agent can spawn subagents for parallel task execution, capture workflows as portable YAML recipes, and render interactive UIs from extensions directly in the desktop app. It's not just a code assistant — it handles research, writing, automation, data analysis, and pretty much anything you'd delegate to a capable junior developer.

### Why it matters

The AI agent space in 2026 is fragmented. Cursor, Windsurf, Claude Code, GitHub Copilot, and a dozen others all compete for developer mindshare, but most of them are proprietary SaaS products with vendor lock-in. Goose stands out because it's genuinely open source (Apache 2.0), runs locally, and doesn't care which LLM you use. For fullstack developers juggling React frontends, NestJS backends, Django services, and Go microservices, this flexibility is significant — you're not betting your workflow on a single provider's pricing model or API stability.

The MCP integration is particularly relevant. As AI agents become the primary consumers of developer tools, the ability to connect your agent to databases, APIs, CI/CD pipelines, and cloud services through a standardized protocol is becoming essential. Goose's 70+ MCP extensions cover most of what a fullstack developer needs daily: database queries, GitHub operations, file system access, web browsing, and more. You can also build custom extensions and share them through the Skills Marketplace, which creates a network effect that benefits the whole ecosystem.

### Key Features

**Multi-Provider LLM Support.** Goose connects to 15+ LLM providers out of the box — Anthropic, OpenAI, Google, Ollama, OpenRouter, Azure, Bedrock, and others. Through ACP, you can even use your existing Claude or ChatGPT subscriptions without buying separate API credits. This is a practical advantage for developers who already pay for one provider and don't want to maintain multiple API keys and billing relationships.

**70+ MCP Extensions.** The extension ecosystem is where Goose becomes genuinely useful for fullstack work. Extensions cover databases (PostgreSQL, MySQL, SQLite), version control (GitHub, GitLab), cloud services (AWS, GCP), browsers for web scraping, file systems, and dozens more. Each extension is an MCP server that the agent discovers and invokes automatically. Install the GitHub extension, and Goose can create PRs, review code, and manage issues. Install the database extension, and it can query your dev database directly.

**Subagents for Parallel Execution.** Goose can spawn independent subagents to handle tasks in parallel — code review on one branch while researching documentation on another, or processing files while writing tests. This keeps the main conversation clean and prevents context window pollution that plagues single-threaded agents. For complex fullstack tasks that involve multiple services, subagents let you decompose work naturally.

**Portable YAML Recipes.** Workflows can be captured as YAML configuration files called recipes. These recipes include instructions, extension configurations, parameters, and even nested subrecipes. Share them with your team, run them in CI pipelines, or publish them to the community marketplace. This turns one-off agent sessions into repeatable, version-controlled automation — useful for things like deployment checks, code review routines, or onboarding tasks.

**MCP Apps with Interactive UIs.** Extensions can render interactive interfaces — buttons, forms, visualizations — directly inside the Goose desktop app. This goes beyond text-based agent interactions and lets developers build agent-powered tools with actual UI components. Think of it as building internal tools where the AI handles the logic and the extension provides the interface.

**Security-First Design.** Goose includes prompt injection detection, tool permission controls, sandbox mode, and an adversary reviewer that watches for unsafe actions. The permission system lets you approve or deny tool calls before they execute, which is critical when an agent has access to your database, file system, or cloud infrastructure. For production-adjacent work, this isn't optional — it's essential.

**Cross-Platform Native Apps.** The desktop app is built in Rust and ships natively for macOS, Linux, and Windows. No Electron overhead, no browser dependency. The CLI works in any terminal, and the API lets you embed Goose capabilities into your own tools or CI pipelines. The Rust foundation means fast startup, low memory usage, and reliable operation across platforms.

### Use Cases

- **Fullstack code generation and refactoring** — Point Goose at your monorepo and ask it to add a new API endpoint with React frontend, NestJS service layer, and database migration. The agent can work across multiple files and services using the appropriate extensions for each technology.

- **Database exploration and debugging** — Connect the PostgreSQL or MySQL extension and let Goose query your dev database, explain slow queries, suggest indexes, or generate test data. More natural than writing raw SQL when you're exploring an unfamiliar schema.

- **Automated code review workflows** — Create a recipe that runs on every PR: check for security issues, validate test coverage, verify API contract changes, and post a summary comment. Run it locally before pushing or integrate it into CI.

- **Documentation and research** — Use the browser extension to research APIs, read documentation, and summarize findings while you code. Goose can pull information from multiple sources and synthesize it into actionable summaries.

- **DevOps and infrastructure tasks** — With cloud extensions, Goose can help manage AWS resources, debug deployment issues, analyze logs, and automate routine ops tasks. The sandbox mode ensures destructive operations require explicit approval.

### Pros and Cons

Pros:
- Genuinely open source under Apache 2.0 with Linux Foundation governance through AAIF. No risk of vendor lock-in, licensing changes, or the project getting absorbed into a proprietary product. The 48k+ star count and 500+ contributors indicate a healthy, self-sustaining community.
- Multi-provider LLM support means you're never stuck with one vendor. Switch between Claude, GPT, Gemini, or local Ollama models based on task requirements, cost, or availability — all within the same tool.
- The MCP extension ecosystem with 70+ integrations covers most fullstack developer needs out of the box, and the Skills Marketplace lets you share and reuse workflows across teams.

Cons:
- Rust-based native apps mean the installation process is less straightforward than npm-based tools. The CLI installer script works, but if you hit platform-specific issues, debugging requires more effort than a typical Node.js tool.
- The recipe system, while powerful, has a learning curve. YAML configurations can get verbose for complex workflows, and the documentation for advanced recipe features (subrecipes, conditional logic) could be more comprehensive.
- Local execution means you're responsible for your own API keys and compute costs. There's no managed cloud option for teams that want centralized billing and usage tracking, which some organizations require.

### Getting Started

```bash
# Install the CLI (macOS, Linux, Windows)
curl -fsSL https://github.com/aaif-goose/goose/releases/download/stable/download_cli.sh | bash

# Or download the desktop app from https://goose-docs.ai/docs/getting-started/installation

# Configure your LLM provider
goose configure

# Start an interactive session
goose session start

# Install MCP extensions (e.g., GitHub)
goose install github

# Run a recipe file
goose run --recipe my-workflow.yaml

# Start the API server for programmatic access
goose serve --port 3000
```

### Alternatives

**Claude Code** — Anthropic's official CLI coding agent. Deep integration with Claude models and excellent at code generation and editing. Choose Claude Code if you're all-in on the Anthropic ecosystem and want the tightest possible Claude integration. Choose Goose if you want multi-provider support, MCP extensions, and a desktop app in addition to the CLI.

**Cursor** — An AI-native code editor built on VS Code with deep AI integration. Cursor offers the best inline editing experience with multi-file awareness and a polished UI. Choose Cursor if you want AI embedded directly in your editor workflow. Choose Goose if you prefer a standalone agent that works alongside any editor, has broader extension support, and doesn't tie you to a specific IDE.

**Aider** — A terminal-based AI pair programmer focused on git-aware code editing. Aider excels at understanding your repo structure and making targeted code changes with clean git commits. Choose Aider if your primary need is code editing with git integration and you want a lightweight, focused tool. Choose Goose if you need a general-purpose agent that handles non-coding tasks, has a desktop UI, and supports a wider range of extensions.

### Verdict

Goose is the most compelling open source AI agent available right now, and the numbers back it up — 48,800+ stars don't happen by accident. What makes it stand out isn't any single feature but the combination of genuine open source governance (Linux Foundation via AAIF), multi-provider flexibility, and a growing MCP extension ecosystem that actually covers real developer workflows. For fullstack developers working across React, NestJS, Django, and Go, the ability to use one agent tool with database extensions, cloud service integrations, and browser automation — all switchable between LLM providers based on the task — is a practical advantage over the locked-in alternatives. The Rust-based native apps feel fast, the CLI is clean, and the recipe system turns one-off sessions into repeatable automation. If you're going to pick one AI agent tool to standardize your team on in 2026, Goose is the safest bet for long-term flexibility.
