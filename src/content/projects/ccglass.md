---
name: ccglass
description: "ccglass is a local proxy and web dashboard that shows exactly what coding agents like Claude Code, Codex, and Kimi send to LLMs — with token tracking, cost estimation, and conversation diffs."
url: https://github.com/jianshuo/ccglass
stars: 406
forks: 27
language: JavaScript
tags: ["developer-tools", "ai-agents", "debugging", "proxy", "llm-observability"]
featured: false
publishedAt: 2026-06-04
---

## ccglass

### Overview

ccglass is a lightweight local proxy and web dashboard that lets you see exactly what your coding agent sends to the model. It supports Claude Code, Codex, OpenCode, DeepSeek-TUI, Reasonix, Kimi, Ollama, OpenRouter, and more. Run one command and you get a live stream of every API request — the full system prompt, tool schemas, message history, token counts, cache-hit rates, and estimated costs per call.

The project is created by Jianshuo Wang, a well-known Chinese tech entrepreneur who co-founded CSDN and has been building developer tools for decades. That background shows in the design decisions — ccglass feels like a tool built by someone who actually uses coding agents daily and got tired of flying blind. The GitHub repo hit 400 stars within two weeks of its late May 2026 launch, which tracks with how many developers are now relying on AI coding agents without any visibility into what those agents are actually doing.

The core problem ccglass solves is simple but expensive: when Claude Code or Codex makes an API call, you have no idea what's in the system prompt, how many tokens each turn burns, or whether your cache strategy is working. These CLIs are Node or native apps that ignore `HTTP_PROXY` and `HTTPS_PROXY`, so traditional tools like Charles or mitmproxy can't intercept the traffic. ccglass sidesteps the entire problem by running a local HTTP proxy that the client connects to — no CA certs, no TLS pinning, no fetch-patching that breaks on updates.

### Why it matters

AI coding agents are becoming a daily tool for professional developers. Claude Code, Cursor, Codex, and their peers are no longer experimental — they're writing production code, running tests, and managing complex multi-step workflows. But the observability story is terrible. Most developers have no idea how much context their agent sends per request, which tools are being called most often, or why a particular conversation suddenly started burning through tokens at 5x the normal rate.

ccglass fills a gap that the agent vendors themselves haven't addressed. Anthropic and OpenAI provide usage dashboards at the account level, but nothing at the per-conversation or per-request level. When you're trying to optimize your agent's token usage — which directly translates to cost and latency — you need request-level visibility. ccglass gives you that without requiring any changes to your agent setup.

The timing matters too. Smart routing and cost optimization are becoming standard features in agent platforms (PilotDeck, for example, routes simple tasks to cheaper models automatically). But you can't optimize what you can't measure. ccglass is the measurement layer that makes cost-conscious agent usage possible.

### Key Features

**Live Request Stream.** Every API call appears instantly in the dashboard. Click to expand the full system prompt, message history, and tool schemas with all escaped strings unescaped. Long blocks fold behind a show/hide toggle, and each row shows its timestamp and tool-call count. You see exactly what the model sees — no abstraction, no filtering.

**Conversation Flow View.** A top-to-bottom sequence diagram of the agent loop shows which tool the model picked from the menu, how it ran locally, and how the result was fed back. `tool_use` and `tool_result` are paired by `call_id` and color-coded. This is the feature that makes ccglass more than a proxy — it's a debugging tool for understanding agent behavior.

**Turn-to-Turn Diff.** Pick any two requests in a session and see exactly what context was added between them. The diff highlights which message blocks carry a cache breakpoint. This is invaluable for understanding why your cache-hit rate is low — usually it's because a system prompt block shifted by one character.

**Token, Cache, and Cost Tracking.** Exact input/output/cache tokens from the response `usage` field, cache-hit rate, and estimated USD per request using per-provider pricing. The session header shows rolled-up totals. If you're spending $50/day on agent calls and want to understand where it's going, this is the answer.

**Broad Provider Support.** Works with Claude Code (Anthropic), Codex (OpenAI), DeepSeek-TUI, Reasonix, Kimi (Moonshot), OpenCode, Ollama, LM Studio, OpenRouter, GLM/Zhipu, AWS Bedrock, and Google Vertex AI. The `run --provider <p> -- <cmd>` escape hatch lets you inspect any client that reads a base-URL env var. IDE extensions like Cursor (BYOK mode), Cline, and Continue.dev work via the `proxy` subcommand.

**Content-Addressed Log Storage.** Captures are stored git-style: each message, the tools array, and the system block are written once to a `blobs/` directory and referenced by hash from per-request manifests. This prevents long sessions from growing quadratically and makes log storage efficient. Auth tokens are masked by default.

**Self-Inspection via MCP.** When wrapping Claude Code, ccglass registers its own query tools so the agent can inspect the very requests it just made, right inside the chat. The agent can literally debug itself. Pass `--no-mcp` to skip this if you prefer.

### Use Cases

- **Cost optimization** — Identify which agent conversations are burning the most tokens and why. Find system prompts that are 10x larger than they need to be, or tool schemas that get re-sent every turn despite being cached.
- **Debugging agent behavior** — When your coding agent does something unexpected, the conversation flow view shows you exactly what tool it picked, what arguments it passed, and what the result was. No more guessing.
- **Provider comparison** — Run the same task through Claude Code and Codex side by side, then compare token usage, latency, and cost in the dashboard. Make data-driven decisions about which agent to use for which tasks.
- **Security auditing** — See exactly what system prompts and tool definitions your agent sends to third-party API providers. Some organizations need this visibility for compliance.
- **IDE agent monitoring** — Use the `proxy` subcommand to inspect Cursor, Cline, or Continue.dev when they're configured with your own API key. See what your IDE-based agent is really doing.

### Pros and Cons

Pros:
- Zero-configuration setup — `npm install -g ccglass` and you're running. No CA certs, no environment variable juggling, no config files to edit.
- Works with every major coding agent and LLM provider. The broad provider support means you don't need different debugging tools for different agents.
- Content-addressed storage is a smart engineering choice that keeps log storage efficient even for long-running agent sessions.
- MIT licensed and actively maintained, with contributions from the community adding new providers regularly.

Cons:
- JavaScript-based agents that use WebSocket transport (like Codex in ChatGPT login mode) bypass the proxy entirely. You need to be in API-key mode for interception to work.
- The dashboard is a local web app — no team sharing or remote access without additional setup. If you want to share debugging sessions with teammates, you're exporting JSON or HAR files.
- No built-in alerting or anomaly detection. It's a passive observation tool, not an active monitoring system. You have to watch the dashboard or review logs manually.

### Getting Started

```bash
# Install globally
npm install -g ccglass

# Launch with interactive client picker
ccglass

# Or specify a client directly
ccglass claude      # inspect Claude Code
ccglass codex       # inspect Codex (API-key mode)
ccglass deepseek    # inspect DeepSeek-TUI
ccglass kimi        # inspect Kimi (via Claude Code)

# Inspect any OpenAI-compatible tool
ccglass run --provider openai -- my-tool --some-flag

# Proxy-only mode for IDE extensions (Cursor, Cline, Continue.dev)
ccglass proxy --provider openai

# Re-open the dashboard over saved logs
ccglass view

# Export a specific request
ccglass export <session>/<seq> --format md
```

The dashboard opens automatically in your browser at `http://127.0.0.1:<port>`. Every API request from your coding agent appears in real time. Click any request to expand the full payload.

### Alternatives

**LangSmith** — LangChain's observability platform provides detailed tracing for LLM applications, but it's designed for developers building their own agent pipelines, not for inspecting third-party coding agents. LangSmith requires instrumentation code; ccglass requires nothing. Choose LangSmith when you're building custom agent applications and need production tracing. Choose ccglass when you want to inspect what Claude Code or Codex is doing without touching any code.

**Helicone** — An LLM observability proxy that sits between your application and the model provider. Helicone provides request logging, cost tracking, and analytics dashboards similar to ccglass, but it's a cloud service with API key management. ccglass is fully local and stateless by comparison. Choose Helicone when you need team-wide observability for production applications. Choose ccglass when you want local, zero-config inspection of your personal coding agent sessions.

**LiteLLM** — A unified API gateway that proxies requests to 100+ LLM providers with built-in logging and cost tracking. LiteLLM is more powerful as a routing and fallback layer, but it requires you to route all your traffic through it. ccglass is simpler — it intercepts traffic from existing tools without changing your setup. Choose LiteLLM when you need centralized API key management and model routing. Choose ccglass when you just want to see what's happening.

### Verdict

ccglass is the debugging tool I didn't know I needed until I tried it. Every developer running Claude Code, Codex, or any other coding agent should have this running in a terminal tab. The token and cost visibility alone is worth the 30-second install — I found system prompts in my own agent sessions that were 3x larger than necessary, and the turn-to-turn diff showed me exactly where my cache strategy was failing. The 400-star growth in two weeks reflects genuine developer demand for agent observability, and the broad provider support means it works regardless of which agent stack you've committed to. It won't replace a full observability platform for production use, but for personal agent debugging and cost optimization, it's the best tool available right now.
