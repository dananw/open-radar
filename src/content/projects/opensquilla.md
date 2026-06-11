---
name: opensquilla
description: "Token-efficient microkernel AI agent with local model router, persistent memory, layered sandbox, and support for 20+ LLM providers — same budget, higher intelligence density."
url: https://github.com/opensquilla/opensquilla
stars: 3825
forks: 299
language: Python
tags: ["ai-agent", "llm", "token-optimization", "developer-tools", "mcp", "open-source"]
featured: false
publishedAt: 2026-06-11
---

## OpenSquilla

### Overview

OpenSquilla is a token-efficient, microkernel AI agent that routes every conversation turn to the cheapest capable model — cutting your LLM spend without sacrificing output quality. It hit 3,800+ GitHub stars within weeks of its May 2026 launch, and the number keeps climbing. The project is Apache 2.0 licensed, written in Python 3.12+, and runs on Windows, macOS, and Linux.

The core idea is deceptively simple: not every prompt needs GPT-4o or Claude Opus. A quick "what's the weather?" should route to a cheap, fast model. A complex code architecture review should go to the heavy hitter. OpenSquilla's SquillaRouter — a local LightGBM + ONNX classifier — scores each turn on length, language, code density, keywords, and semantic embeddings, then dispatches it across four tiers (T0–T3) to the most cost-effective model that can handle the task. Classification happens entirely on-device, so your prompts never leave the machine for routing decisions.

The project positions itself as an alternative to single-model agent frameworks like Hermes Agent and OpenClaw, both of which it can migrate from directly (`opensquilla migrate hermes --apply`). What makes OpenSquilla stand out is the combination of intelligent routing, a unified gateway that serves Web UI, CLI, and chat channels through the same turn loop, and a layered security sandbox — all in one package.

### Why it matters

LLM costs are the elephant in the room for any team building AI-powered tools. A fullstack developer using AI agents for code review, documentation generation, and task automation can easily burn through $50–100/day on API calls. Most of that spend is wasteful — simple lookups and formatting tasks hitting the same expensive model as complex reasoning. OpenSquilla's tiered routing addresses this directly. Early users report 40–60% cost reductions with no noticeable quality drop on routine tasks.

The broader trend here is the shift from "one model for everything" to intelligent model selection. OpenRouter pioneered multi-provider access; OpenSquilla takes it further with automated, turn-level routing. The SquillaRouter classifier runs locally, adds negligible latency, and improves over time as it learns your usage patterns. This is how AI agent infrastructure needs to work — smart dispatch, not brute-force spending.

For developers already deep in the agent ecosystem, OpenSquilla's MCP client/server support and migration paths from Hermes Agent and OpenClaw make adoption frictionless. You don't have to rebuild your skills, memory, or channel configurations from scratch.

### Key Features

**SquillaRouter — On-Device Model Routing.** A local LightGBM + ONNX classifier scores every conversation turn and routes it to the cheapest capable model across four tiers. It analyzes turn length, language, code content, keywords, and semantic embeddings — all running on your machine. No prompt data leaves your device for routing decisions. The `recommended` install profile includes the router and its model assets out of the box.

**20+ LLM Provider Support.** The provider registry targets OpenRouter, OpenAI, Anthropic, Ollama, DeepSeek, Gemini, DashScope/Qwen, Moonshot, Mistral, Groq, Zhipu, SiliconFlow, vLLM, LM Studio, and more. Primary-plus-fallback selection means you can set a preferred provider and automatically fall back to alternatives when it's down or rate-limited. First-run onboarding exposes only the verified subset for your configuration.

**Persistent Local Memory.** A curated `MEMORY.md` plus dated Markdown notes, searchable via SQLite full-text keyword search and `sqlite-vec` semantic recall. Embeddings run on-device through bundled ONNX, or you can swap to OpenAI or Ollama embeddings. There's optional exponential decay for memory relevance and an opt-in "dream" consolidation mode that summarizes and compresses old memories overnight.

**Layered Security Sandbox.** Three policy tiers — Standard, Strict, and Locked — control what the agent can do on your system. Bubblewrap isolates code execution on Linux. A denial ledger auto-pauses autonomous runs after repeated permission rejections, and rejected outputs are purged from context. Skill metadata and tool results are XML-escaped against prompt injection attacks. This is serious security engineering, not an afterthought.

**Unified Gateway Architecture.** A Starlette ASGI server on `127.0.0.1:18791` with WebSocket RPC and an embedded control console. Web UI, CLI (`opensquilla chat`), and messaging channels — Slack, Telegram, Discord, Feishu, DingTalk, WeCom, Matrix, QQ — all share a single `TurnRunner`. Tool dispatch, retries, and decision logging behave identically across every surface. No divergent behavior between the web interface and the terminal.

**On-Demand Skills and MCP Integration.** Fifteen bundled skills covering coding, GitHub operations, cron scheduling, document generation (PPTX, DOCX, XLSX, PDF), summarization, tmux, weather, and more — loaded only when the task requires them. OpenSquilla works as both an MCP client and server (`opensquilla mcp-server run`), so it integrates cleanly with the broader agent tool ecosystem. Skills can be authored, installed, and published from the CLI.

**Cross-Surface Cron and Scheduling.** A `SchedulerEngine` with an in-tree cron parser runs recurring jobs via `opensquilla cron`. Jobs support structured schedules, timezone-aware exact/every/cron expressions, channel or webhook delivery, failure destinations, and manual triggers. WebUI, CLI, and RPC all expose the same scheduling controls.

### Use Cases

- **Cost-conscious AI development teams** — Route routine tasks (formatting, simple lookups, status checks) to cheap models while reserving expensive ones for complex reasoning. Cut your monthly LLM bill by 40–60% without changing your workflow.
- **Fullstack developers building AI-powered tools** — Use the MCP server to let your coding agents access OpenSquilla's capabilities — file operations, web search, document generation — through a standardized protocol.
- **Teams running multi-channel chatbots** — Deploy a single agent across Slack, Telegram, Discord, and internal channels with consistent behavior, shared memory, and unified session management.
- **Developers migrating from Hermes Agent or OpenClaw** — Import your existing memory, persona files, skills, and channel configurations with `opensquilla migrate` instead of rebuilding from scratch.
- **Security-conscious organizations** — The layered sandbox with Bubblewrap isolation, denial ledger, and prompt injection defenses provides guardrails for autonomous agent operation in sensitive environments.
- **Automation and scheduling workflows** — Use the built-in cron engine to run recurring agent tasks — code reviews, report generation, data aggregation — with timezone-aware scheduling and multi-channel delivery.

### Pros and Cons

Pros:
- The token routing is the real differentiator. SquillaRouter genuinely reduces costs without the user noticing quality differences on routine tasks. Local ONNX inference means zero additional latency for routing decisions.
- Provider breadth is excellent. 20+ backends with automatic fallback means you're never locked into one vendor. If Anthropic goes down, you fail over to OpenAI or a local Ollama instance seamlessly.
- The migration tooling is thoughtful. Being able to import from Hermes Agent and OpenClaw — including memory, skills, persona files, and channel configs — removes the biggest barrier to switching.

Cons:
- The install process is heavier than competitors. The `recommended` profile pulls in ONNX Runtime, LightGBM, NumPy, and tokenizers for the SquillaRouter. If you just want a simple agent with one provider, the core profile is lighter but you lose the routing magic.
- Windows sandbox support is missing. Bubblewrap only works on Linux; macOS Seatbelt currently renders profiles but doesn't execute them. Windows users get no sandbox isolation yet.
- The documentation is extensive but dense. The README alone is massive, and the product guide, changelogs, and release notes add more surface area. New users might feel overwhelmed navigating the configuration options.

### Getting Started

```bash
# Install uv (Python package manager) if you don't have it
curl -LsSf https://astral.sh/uv/install.sh | sh
. "$HOME/.local/bin/env"

# Install OpenSquilla with the recommended profile (includes SquillaRouter)
uv tool install --python 3.12 "opensquilla[recommended] @ https://github.com/opensquilla/opensquilla/releases/download/v0.3.1/opensquilla-0.3.1-py3-none-any.whl"

# Run the interactive setup wizard
opensquilla onboard

# Start the gateway (Web UI at http://127.0.0.1:18791/control/)
opensquilla gateway run

# Or use the CLI chat interface
opensquilla chat

# One-shot mode for scripting
opensquilla agent -m "Review this code for security issues"
```

### Alternatives

**Hermes Agent** — A well-established AI agent framework with a rich skill ecosystem and plugin architecture. Hermes focuses on extensibility and has a larger community with more third-party skills. Choose Hermes if you need maximum plugin compatibility and don't mind paying for a single premium model. OpenSquilla wins on cost optimization through automatic routing.

**OpenClaw** — Another open-source AI agent with strong terminal integration and a focus on developer workflows. OpenClaw has a simpler mental model — one agent, one model, one configuration. Choose OpenClaw if you want minimal complexity and already have a preferred LLM provider. OpenSquilla is better when you want to leverage multiple providers intelligently.

**LiteLLM** — A proxy layer that gives you a unified API across 100+ LLM providers. LiteLLM handles provider abstraction but doesn't include agent capabilities, memory, scheduling, or a UI. Choose LiteLLM if you need a provider proxy for your own agent framework. OpenSquilla is the right pick when you want the full agent stack with routing baked in.

### Verdict

OpenSquilla is the most practical answer to the "which model should I use?" problem that every AI agent user faces. The SquillaRouter alone justifies the project's existence — local, low-latency classification that routes cheap tasks to cheap models and hard tasks to capable ones. At 3,800+ stars in its first month, the community clearly agrees. The unified gateway, 20+ provider support, MCP integration, and migration paths from Hermes and OpenClaw make it a serious contender for anyone building AI-powered development workflows. The install weight and missing Windows sandbox are real gaps, but neither is a dealbreaker for the target audience — developers who care about cost efficiency and want a single agent that works everywhere. If you're running an AI agent for daily development tasks and haven't looked at token routing yet, OpenSquilla is where you start.
