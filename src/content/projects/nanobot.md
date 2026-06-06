---
name: nanobot
description: "Nanobot is a lightweight open-source Python AI agent with WebUI, multi-channel chat, MCP support, and memory — 43K+ stars on GitHub."
url: https://github.com/HKUDS/nanobot
stars: 43788
forks: 7740
language: Python
tags: ["ai-agent", "python", "mcp", "chatbot", "developer-tools"]
featured: false
publishedAt: 2026-06-07
---

## Nanobot

### Overview

Nanobot is an open-source, ultra-lightweight personal AI agent written in Python. It hit 43,000 GitHub stars in just four months after its February 2026 launch, with over 7,700 forks and commits landing daily through early June. The release cadence alone tells a story — v0.1.4 through v0.2.1 shipped between March and June 2026, each one adding substantial features like Dream memory, goal-oriented workflows, and a bundled WebUI workbench.

The project originates from HKUDS (Hong Kong University Data Science Lab), started by Xubin Ren as a personal open-source project. That academic-but-practical DNA shows up in the architecture. The core agent loop is intentionally small and readable — messages arrive from chat channels, the LLM decides when tools are needed, and memory or skills get pulled in as context. No heavy orchestration framework, no dependency on LangChain or similar abstraction layers. Just a clean loop that's easy to extend.

The problem nanobot solves is deceptively simple: most AI agent frameworks are either too lightweight (just a CLI wrapper around an API) or too heavy (full orchestration platforms that require their own infrastructure). Nanobot threads the needle. You get a real agent with persistent memory, multi-channel chat integration (Telegram, Discord, Slack, WeChat, Feishu, WhatsApp, Matrix, and more), MCP tool support, web search, image generation, cron scheduling, and a WebUI — all in a single `pip install`. The agent runs locally, connects to your preferred LLM provider, and talks to you through whatever chat app you already use.

### Why it matters

The AI agent space in 2026 is fragmented. You have heavyweight platforms like CrewAI and AutoGen for multi-agent orchestration, lightweight coding assistants like Cursor and Claude Code for development tasks, and a growing ecosystem of MCP-compatible tools. What's missing is a middle ground — something that works as a daily personal agent across multiple contexts without requiring a cloud subscription or a PhD to configure.

Nanobot fills that gap for developers who want an agent they truly own. It's self-hosted, MIT-licensed, and stores everything locally. The multi-channel architecture means you can interact with the same agent from your phone (Telegram), your team's workspace (Slack or Discord), or a browser tab (WebUI). That flexibility matters for developers who live across multiple platforms and want a single agent brain that follows them.

The MCP integration is particularly relevant for fullstack developers. Nanobot can connect to any MCP-compatible tool server, which means it can interact with databases, APIs, file systems, and development tools through a standardized protocol. Combined with the Python SDK and OpenAI-compatible API endpoint, you can embed nanobot into your existing workflows — trigger it from a NestJS backend, call it from a Django management command, or integrate it into a Go service via the REST API.

### Key Features

**Multi-Channel Chat Architecture.** Nanobot connects to 15+ chat platforms out of the box — Telegram, Discord, Slack, WeChat, Feishu, WhatsApp, Matrix, DingTalk, QQ, and more. Each channel is a plugin with its own media handling, threading, and formatting support. You talk to the same agent from wherever you are, and the conversation context carries across channels. This isn't a bolt-on feature; the channel system is a first-class abstraction in the core architecture.

**Dream Memory System.** The two-stage memory system (introduced in v0.1.5) consolidates conversation history into structured long-term memory. The agent remembers context across sessions, learns from interactions, and can recall relevant information when you ask about something you discussed weeks ago. Memory is stored locally and can be backed up, exported, or pruned. For developers building knowledge-heavy workflows, this eliminates the "cold start" problem that plagues most chat-based agents.

**MCP Tool Integration.** Nanobot supports the Model Context Protocol natively, connecting to MCP tool servers for database queries, file operations, web scraping, API calls, and more. You can configure multiple MCP servers, and the agent decides which tools to invoke based on the conversation context. The v0.2.0 release added MCP presets and CLI Apps, letting you package tool configurations into reusable units.

**Bundled WebUI Workbench.** The v0.2.1 "Workbench Release" turned the WebUI from a simple chat interface into a full agent workspace. You get thought/response timelines, live file-edit activity tracking, project workspaces, model and context controls, and sustained goal management. It runs as a local Vite dev server and supports LAN access, so you can open it from any device on your network.

**OpenAI-Compatible API.** Nanobot exposes a local API endpoint that's compatible with the OpenAI chat completions format. This means you can integrate it into any system that speaks the OpenAI protocol — your React frontend, your Go backend, your Python scripts. SSE streaming is supported, and file uploads work through the standard multipart format. It's the easiest path to embedding an AI agent into an existing fullstack application.

**Goal-Oriented Workflows.** The `/goal` command (v0.2.0) lets you set sustained objectives that persist across conversation turns. The agent tracks progress, breaks down complex tasks into steps, and reports on completion. This turns nanobot from a reactive chatbot into a proactive assistant that can handle multi-day projects — monitoring a deployment, tracking a research task, or managing a content pipeline.

**Broad LLM Provider Support.** Works with OpenAI, Anthropic, Google Gemini, DeepSeek, Ollama (local models), Azure OpenAI, AWS Bedrock, GitHub Copilot, OpenRouter, VolcEngine, StepFun, MiniMax, Kimi, NVIDIA NIM, LM Studio, and more. The `fallback_models` configuration lets you set up automatic failover between providers. If your primary API goes down, the agent switches to a backup without losing context.

### Use Cases

- **Personal productivity agent** — Set up nanobot on your home server, connect it to Telegram, and use it for reminders, web searches, document analysis, and daily briefings. The cron scheduling system handles recurring tasks automatically.
- **Development workflow assistant** — Connect nanobot to MCP tools for your database, file system, and deployment pipeline. Ask it to check server status, run migrations, or summarize error logs — all from Slack or Discord.
- **Multi-platform customer support bot** — Deploy nanobot with WeChat, WhatsApp, and Telegram channels for a small business. The shared memory system means conversations started on one platform continue seamlessly on another.
- **Research and knowledge management** — Use the Dream memory system to build a personal knowledge base. Feed it documents, ask questions, and let the agent surface relevant information from past conversations.
- **API-embedded AI service** — Run nanobot as a background service with the OpenAI-compatible API, and call it from your React frontend or Go backend for intelligent features without managing your own LLM infrastructure.

### Pros and Cons

Pros:
- Truly lightweight — the entire agent installs via `pip install nanobot-ai` and runs with a single command. No Docker required for basic usage, no cloud account needed.
- Multi-channel support is genuinely comprehensive. Most competing tools support one or two platforms; nanobot covers 15+ with proper media handling, threading, and formatting for each.
- The OpenAI-compatible API makes integration trivial. Any system that talks to OpenAI can talk to nanobot with zero code changes.
- Extremely active development — daily commits, weekly releases, and responsive issue handling. The project shipped 8 major releases in 4 months.

Cons:
- Python 3.11+ requirement limits deployment on older systems. Some enterprise environments still run Python 3.9 or 3.10.
- The configuration surface area is large. With 15+ chat channels, dozens of LLM providers, MCP servers, memory settings, and tool configurations, the initial setup can feel overwhelming despite the interactive wizard.
- No built-in authentication or multi-user support for the WebUI. If you expose it on a network, you need to handle access control yourself with a reverse proxy.
- The Dream memory system, while powerful, can accumulate significant local storage over time for heavy users. There's no automatic cleanup policy yet.

### Getting Started

```bash
# Install from PyPI
pip install nanobot-ai

# Run the interactive setup wizard
nanobot setup

# Start the agent (connects to your configured channels)
nanobot run

# Or start just the WebUI
nanobot webui

# Access the OpenAI-compatible API
# Default endpoint: http://localhost:8080/v1/chat/completions
curl http://localhost:8080/v1/chat/completions \
  -H "Content-Type: application/json" \
  -d '{"model": "default", "messages": [{"role": "user", "content": "Hello!"}]}'
```

For Docker deployment:

```bash
docker pull nanobotai/nanobot:latest
docker run -d -v ~/.nanobot:/root/.nanobot -p 8080:8080 nanobotai/nanobot:latest
```

### Alternatives

**Open Interpreter** — A Python-based AI agent that runs code locally through a terminal interface. Open Interpreter is simpler and more focused on code execution, but lacks nanobot's multi-channel architecture, memory system, and MCP integration. Choose it if you only need a local coding assistant and don't care about chat platform integration.

**n8n** — A workflow automation platform with native AI capabilities and 400+ integrations. n8n is more mature and has a visual workflow builder, but it's a heavier deployment (requires Node.js, a database, and typically Docker). Nanobot is better if you want a lightweight agent you can run anywhere n8n is overkill. n8n is better if you need complex multi-step automation workflows with conditional logic and external service integrations.

**Hermes Agent** — A Python-based AI agent framework with skill management, plugin architecture, and cron scheduling. Hermes is more opinionated about its agent loop and skill system, while nanobot is more flexible in its channel and provider support. Choose Hermes if you want a structured skill-based agent; choose nanobot if you want maximum channel and provider flexibility.

### Verdict

Nanobot is the most practical open-source AI agent I've seen for developers who want a personal agent they actually own. The 43K stars in four months aren't hype — they reflect genuine utility. The multi-channel architecture solves a real problem (talking to your agent from wherever you are), the MCP integration connects it to your existing tools, and the OpenAI-compatible API means you can embed it into any system without friction. It's Python, it's MIT-licensed, and it runs on your hardware. The configuration complexity is the main barrier to entry, but the interactive wizard handles most of it. If you're a fullstack developer looking to add an AI agent to your workflow without signing up for another cloud service, nanobot is worth a serious look.
