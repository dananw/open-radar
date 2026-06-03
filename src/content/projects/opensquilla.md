---
name: opensquilla
description: "OpenSquilla is a token-efficient AI agent with a local model router that cuts LLM costs by 89% while maintaining near-identical benchmark scores."
url: https://github.com/opensquilla/opensquilla
stars: 2398
forks: 161
language: Python
tags: ["ai-agent", "token-optimization", "llm-router", "open-source", "mcp"]
featured: false
publishedAt: 2026-06-03
---

## OpenSquilla

### Overview

OpenSquilla is a token-efficient, microkernel AI agent that routes each conversation turn to the cheapest capable model — cutting LLM costs by up to 89% without sacrificing output quality. It hit 2,400 GitHub stars within a month of its May 2026 launch, which tracks with the developer community's growing frustration over runaway AI API bills.

The project comes from the Open-Squilla team, with 63 commits from the lead contributor and active development through June 2026. Three releases in two weeks (v0.2.0, v0.2.1, v0.3.0) signal a team shipping fast. The project is licensed under Apache 2.0, so there's no vendor lock-in risk.

The core idea is simple but powerful: not every prompt needs the most expensive model. A local LightGBM + ONNX classifier called SquillaRouter scores each turn on length, language, code content, keywords, and semantic embeddings, then routes it across four tiers (T0–T3). Simple queries go to cheaper models; complex reasoning tasks get routed to Claude Opus or GPT-4o. The classification runs entirely on-device — your prompts never leave the machine for routing decisions. On PinchBench 1.2.1, OpenSquilla scored 0.9251 versus OpenClaw's 0.9255, while using 1.72M input tokens versus 3.07M, at a cost of $0.69 versus $6.23.

### Why it matters

The AI agent space is exploding, but most developers building with LLMs face the same problem: API costs scale linearly with usage, and there's no built-in intelligence about which model to use for which task. You end up paying Claude Opus prices for "summarize this paragraph" queries that a smaller model handles fine.

OpenSquilla addresses this with a fundamentally different architecture. Instead of picking one model and hoping the pricing works out, it treats model selection as a routing problem — similar to how load balancers distribute traffic across servers. The local router makes the decision in milliseconds, and the user never sees the complexity.

For fullstack developers building AI-powered features into React, NestJS, or Django applications, this matters because it changes the economics of integrating LLMs. When your cost per intelligent interaction drops by 89%, features that were too expensive to build — like AI-assisted code review, intelligent search, or conversational interfaces — become viable. The 20+ provider support (OpenRouter, OpenAI, Anthropic, Ollama, DeepSeek, Gemini, Qwen, Mistral, Groq, and more) means you're not locked into a single vendor either.

### Key Features

**SquillaRouter — On-Device Model Routing.** The star feature. A LightGBM + ONNX classifier that runs locally and scores each conversation turn across four tiers. T0 handles simple lookups with the cheapest models; T3 routes to frontier models for complex reasoning. Classification happens on-device, so your prompt data stays private until it's sent to the chosen model. The benchmark data backs this up: 89% cost reduction with a 0.04% score difference.

**Adaptive Reasoning and Prompt Scaling.** OpenSquilla doesn't just pick the right model — it also adjusts how much context to send. The system prompt scales with task complexity. Simple queries get lightweight instructions; complex tasks get the full system prompt with all available context. This double optimization (cheaper model + fewer tokens) compounds the savings.

**20+ LLM Provider Support.** The provider registry targets OpenRouter, OpenAI, Anthropic, Ollama, DeepSeek, Gemini, DashScope/Qwen, Moonshot, Mistral, Groq, Zhipu, SiliconFlow, vLLM, LM Studio, and more. Primary-plus-fallback selection means if your preferred provider is down, the agent seamlessly switches to a backup. First-run onboarding exposes only the verified subset, so you don't waste time configuring providers that don't work.

**On-Demand Skills and MCP Integration.** Fifteen bundled skills cover coding, GitHub, cron scheduling, document generation (PPTX, DOCX, XLSX, PDF), summarization, tmux, weather, and more. Skills load only when the task needs them — they're not consuming context on every turn. OpenSquilla works as both an MCP client and server (`opensquilla mcp-server run`), so it integrates with the broader MCP ecosystem.

**Persistent Local Memory.** A curated `MEMORY.md` file plus dated Markdown notes, searched with SQLite full-text keyword search and `sqlite-vec` semantic recall. Embeddings run on-device via bundled ONNX, or you can swap to OpenAI or Ollama. Optional exponential decay keeps old memories from dominating, and an opt-in "dream" consolidation feature organizes memories during idle periods.

**Layered Security Sandbox.** Three policy tiers (Standard, Strict, Locked) with a permission matrix. Bubblewrap isolates code execution on Linux. A denial ledger auto-pauses autonomous runs after repeated denials, rejected outputs are purged, and skill metadata and tool results are XML-escaped against prompt injection. This is more security-conscious than most open-source agents.

**Unified Gateway with Multi-Channel Support.** A Starlette ASGI server on `127.0.0.1:18791` with WebSocket RPC and an embedded control console. Web UI, CLI, and channels for Terminal, Slack, Telegram, Discord, Feishu, DingTalk, WeCom, Matrix, and QQ all share one `TurnRunner`. Every entry point behaves identically — tool dispatch, retries, and decision logging are consistent across surfaces.

### Use Cases

- **Cost-sensitive AI features in production apps** — When you're building AI-powered search, summarization, or code assistance into a React or Next.js app and need to keep per-request costs under a cent, OpenSquilla's router handles the model selection automatically.
- **Developer productivity tools** — The CLI and REPL modes work well for building internal developer tools that need to query LLMs for code review, documentation generation, or debugging assistance without burning through expensive model credits.
- **Multi-channel customer support bots** — The unified gateway with Telegram, Discord, Slack, and WeChat support makes it straightforward to deploy a single AI agent across multiple messaging platforms with consistent behavior.
- **Local-first AI development** — With Ollama and LM Studio support, you can develop and test AI agent workflows entirely locally, then switch to cloud providers for production without changing your code.
- **Scheduled AI workflows** — The built-in `SchedulerEngine` with cron parser lets you set up recurring AI tasks (daily summaries, periodic data analysis, automated reporting) that run through the cost-optimized router.

### Pros and Cons

Pros:
- 89% cost reduction on benchmarked workloads with negligible quality loss — this is a real, measured difference, not a marketing claim.
- Local routing means your prompts stay private until routed; no third-party service sees your data just to pick a model.
- 20+ provider support with fallback selection avoids vendor lock-in and handles provider outages gracefully.
- Active development with three releases in two weeks and daily commits through early June 2026.
- Apache 2.0 license with no usage restrictions.

Cons:
- Python 3.12+ requirement limits deployment on older systems. The SquillaRouter dependencies (ONNX Runtime, LightGBM, NumPy) add installation complexity compared to lighter agents.
- Windows sandbox support is not yet available — Bubblewrap only works on Linux, and macOS Seatbelt currently renders profiles only without execution.
- The 0.3.0 release is still early-stage. 161 forks but relatively small contributor base (63 commits from one lead contributor) raises questions about long-term maintenance.

### Getting Started

```bash
# Install uv (Python package manager) if not already installed
curl -LsSf https://astral.sh/uv/install.sh | sh

# Install OpenSquilla with recommended extras (includes SquillaRouter)
uv tool install --python 3.12 "opensquilla[recommended] @ https://github.com/opensquilla/opensquilla/releases/download/v0.3.0/opensquilla-0.3.0-py3-none-any.whl"

# Run the interactive setup wizard
opensquilla onboard

# Start the gateway
opensquilla gateway run
```

Open the Web UI at `http://127.0.0.1:18791/control/` to configure providers and start chatting. For CLI usage:

```bash
# Interactive REPL
opensquilla chat

# One-shot command (great for scripts)
opensquilla agent -m "Summarize the latest changes in this repo"

# Check system health
opensquilla doctor
```

### Alternatives

**OpenClaw** — The predecessor/inspiration that OpenSquilla benchmarks against. OpenClaw uses a single frontier model (Claude Opus) for all tasks, which produces marginally higher scores but at 9x the cost. Choose OpenClaw if you need the absolute highest quality on every turn and cost isn't a concern.

**LangChain Agents** — The most popular framework for building LLM-powered applications. LangChain gives you more control over the agent loop and supports more integrations, but it doesn't include model routing, cost optimization, or a built-in gateway. Choose LangChain when you need maximum customization and are building a custom agent architecture from scratch.

**Claude Code / Codex CLI** — Single-model coding agents from Anthropic and OpenAI respectively. These are more polished for pure coding tasks but lock you into one provider and don't optimize costs across models. Choose them when you want the best single-model coding experience and don't mind the per-provider pricing.

### Verdict

OpenSquilla is the most practical cost-optimization tool I've seen in the AI agent space. The benchmark numbers are convincing — 0.9251 versus 0.9255 score at $0.69 versus $6.23 — and the local routing architecture is genuinely novel. For fullstack developers integrating LLMs into production applications, the economics change completely when you can route simple queries to cheap models automatically. The 20+ provider support and MCP integration make it stack-agnostic. It's early software with rough edges (no Windows sandbox, small contributor base), but the active release cadence and 2,400-star growth in a month suggest real momentum. If you're building AI features and watching your API bills climb, OpenSquilla is worth running through a proof-of-concept this week.
