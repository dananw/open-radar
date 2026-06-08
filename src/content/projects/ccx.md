---
name: ccx
description: "CCX is a Go-based unified AI API proxy that routes Claude, OpenAI, Codex, and Gemini through a single endpoint with smart failover and web admin."
url: https://github.com/BenedictKing/ccx
stars: 3429
forks: 257
language: Go
tags: ["ai-infrastructure", "api-proxy", "go", "developer-tools", "claude"]
featured: false
publishedAt: 2026-06-09
---

## CCX

### Overview

CCX is a high-performance AI API proxy written in Go that unifies Claude Messages, OpenAI Chat Completions, OpenAI Images, Codex Responses, and Gemini into a single endpoint. Since its January 2026 launch, it has accumulated over 3,400 GitHub stars and 250+ forks, with more than 100 releases — a pace that signals serious, sustained development rather than a weekend project.

The project is built by BenedictKing, a developer who clearly lives in the AI infrastructure trenches. The codebase is clean Go with an embedded frontend, and the architecture reflects someone who has dealt with the real pain of managing multiple AI provider APIs in production. The single-binary deployment model, the dual-key authentication system, and the channel orchestration logic all point to production-grade thinking.

Here's the core problem CCX solves: if you're building anything that touches multiple AI providers — and in 2026, most serious applications do — you're juggling different API formats, different authentication schemes, different rate limits, and different failure modes. Your Claude calls use Messages API, your OpenAI calls use Chat Completions, your Gemini calls use a completely different endpoint structure. CCX collapses all of that into one proxy with protocol translation, so your application speaks one language and CCX handles the rest.

### Why it matters

The AI API landscape in mid-2026 is fragmented. Every major provider has its own protocol, its own pricing model, and its own reliability characteristics. Claude excels at reasoning tasks, GPT-4o handles multimodal well, Gemini has strong context windows, and Codex is pushing agentic coding. Most production systems need to route across multiple providers depending on the task, cost, and availability.

OpenRouter exists and solves this at the SaaS level, but CCX gives you the same capability self-hosted with full control over your API keys, routing logic, and data. For teams running AI-intensive applications — RAG pipelines, agentic workflows, multi-model evaluation systems — having a local proxy with smart failover is significantly better than scattering provider credentials across your codebase.

The Go implementation matters too. Go's concurrency model (goroutines, channels) maps naturally to proxy workloads. CCX can handle thousands of concurrent requests with minimal memory overhead, and the single-binary deployment means no runtime dependencies. Drop it on a server, set your environment variables, and you have a production API gateway.

### Key Features

**Unified API Gateway.** CCX exposes a single backend that translates between protocols. Your app sends requests to `/v1/chat/completions` (OpenAI format) and CCX routes to Claude, Gemini, or OpenAI based on your configuration. No more maintaining separate client libraries and error handling for each provider.

**Channel Orchestration with Smart Scheduling.** You configure multiple upstream channels (API keys from different providers or resellers) with priorities, health checks, and promotion windows. CCX automatically routes traffic to healthy channels, promotes backup channels when primary ones fail, and recovers gracefully when they come back online.

**Web Admin Console.** A built-in web UI at the same port gives you visual channel management, drag-and-drop priority adjustment, real-time traffic stats, request logs, and channel testing. No separate dashboard service to deploy — it's embedded in the binary.

**Failover and Circuit Recovery.** When a provider starts returning errors or hitting rate limits, CCX detects the pattern and shifts traffic to healthy alternatives. Circuit breaker logic prevents cascading failures. When the failing channel recovers, CCX gradually routes traffic back. This is the kind of resilience logic that production AI applications need but few teams implement correctly.

**Multi-Key Management with Rotation.** Configure multiple API keys per channel. CCX rotates through them to spread rate limits, and you can set per-channel model allowlists and route prefixes. For teams managing dozens of API keys across providers, this alone saves significant operational overhead.

**Single Binary Deployment.** The Go backend embeds all frontend assets. You download one binary, set environment variables (proxy key, admin key, port, language), and run it. Docker and Docker Compose are also supported. No Node.js runtime, no database to manage, no separate frontend build step.

**Responses Session Tracking.** For multi-turn workflows using the Codex Responses API, CCX tracks sessions and routes follow-up requests to the same upstream channel, maintaining conversation continuity across the proxy layer.

### Use Cases

- **Multi-provider AI applications** — You're building a product that uses Claude for analysis, GPT-4o for image understanding, and Gemini for long-context tasks. CCX gives you one endpoint and automatic failover when any provider has issues.

- **Cost optimization across providers** — Route requests to the cheapest available provider for each task type. Configure priority channels that prefer lower-cost resellers, with automatic fallback to direct provider APIs when quality matters more than cost.

- **Development and testing teams** — Multiple developers need AI API access but you don't want to scatter API keys across individual dev machines. CCX acts as a centralized gateway with access control and usage logging.

- **Agentic workflows with mixed models** — Your AI agents use different models for different steps (planning, coding, reviewing). CCX handles the routing and protocol translation so your agent framework doesn't need provider-specific code.

- **API key management for teams** — You have 15 Claude API keys and 8 OpenAI keys from different accounts. CCX manages rotation, load balancing, and failover across all of them through a single admin interface.

### Pros and Cons

Pros:

- Single-binary deployment eliminates runtime dependencies and simplifies operations. The embedded web UI means no separate dashboard to maintain.
- Smart channel orchestration with circuit breaker logic is production-grade infrastructure that most teams don't build themselves. The failover actually works.
- The Go implementation handles high concurrency well. Goroutines and channels are a natural fit for proxy workloads, and memory footprint stays low under load.
- MIT licensed with active development — 100+ releases since January 2026, responsive to issues, and a growing community of contributors.

Cons:

- Documentation is sparse compared to mature projects. The README covers basics but advanced configuration (custom headers, model mapping, proxy chains) requires reading the source code or asking in the community channels.
- The web UI is functional but not polished. It works for management and monitoring, but don't expect the visual design quality of a commercial dashboard.
- No built-in rate limiting per client. CCX manages upstream rate limits but doesn't throttle downstream consumers — you'll need a separate layer for that if you're exposing CCX to external users.
- Primarily maintained by Chinese-speaking developers. While the English README and UI translation exist, some documentation and community discussions are in Chinese.

### Getting Started

```bash
# Option 1: Binary (recommended)
# Download from https://github.com/BenedictKing/ccx/releases/latest
# macOS users can also use Homebrew:
brew tap BenedictKing/ccx && brew install --cask ccx-desktop

# Create configuration
cat > .env << 'EOF'
PROXY_ACCESS_KEY=your-proxy-access-key
PORT=3688
ENABLE_WEB_UI=true
APP_UI_LANGUAGE=en
ADMIN_ACCESS_KEY=your-admin-secret-key
EOF

# Run the binary
./ccx

# Option 2: Docker
docker run -d \
  --name ccx \
  -p 3000:3000 \
  -e PROXY_ACCESS_KEY=your-proxy-access-key \
  -e APP_UI_LANGUAGE=en \
  -v $(pwd)/.config:/app/.config \
  crpi-i19l8zl0ugidq97v.cn-hangzhou.personal.cr.aliyuncs.com/bene/ccx:latest

# Option 3: Build from source (Go 1.25+ and Bun required)
git clone https://github.com/BenedictKing/ccx
cd ccx
cp backend-go/.env.example backend-go/.env
make install
make run
```

Open `http://localhost:3000` to access the web admin. Add your first channel with a provider API key, then test it:

```bash
# Test Claude proxy
curl http://localhost:3000/v1/messages \
  -H "Authorization: Bearer your-proxy-access-key" \
  -H "Content-Type: application/json" \
  -d '{"model":"claude-sonnet-4-20250514","max_tokens":100,"messages":[{"role":"user","content":"Hello"}]}'

# Test OpenAI proxy
curl http://localhost:3000/v1/chat/completions \
  -H "Authorization: Bearer your-proxy-access-key" \
  -H "Content-Type: application/json" \
  -d '{"model":"gpt-4o","messages":[{"role":"user","content":"Hello"}]}'
```

### Alternatives

**OpenRouter** — A hosted SaaS service that provides unified API access to 100+ models through a single endpoint. OpenRouter handles provider management, billing, and routing without any self-hosting. The tradeoff is you're sending all your AI traffic through a third party, paying their markup, and depending on their uptime. CCX gives you the same routing capability with full control over your keys and data, at the cost of running your own infrastructure.

**LiteLLM** — A Python-based proxy that supports 100+ LLM providers with a similar unified API approach. LiteLLM has a larger community and more provider integrations, but it's heavier (Python runtime, database dependencies) and slower under high concurrency. Choose LiteLLM if you need maximum provider coverage and don't mind the operational overhead. Choose CCX if you want a lightweight, high-performance Go binary with simpler deployment.

**One-API** — Another Chinese-origin open-source API proxy with a web admin and multi-provider support. One-API has a larger feature set (user management, billing, token tracking) but is built on a heavier stack. CCX is more focused on the proxy and failover logic with a cleaner architecture. Choose One-API if you need built-in user management and billing. Choose CCX if you want a focused, performant proxy.

### Verdict

CCX is the most practical self-hosted AI API proxy I've seen for teams that need multi-provider routing without the complexity of a full platform. The 3,400 stars in five months reflect genuine developer demand — people are tired of scattering API keys across their codebase and building ad-hoc failover logic. The Go implementation means it runs anywhere with minimal resources, the embedded web UI eliminates dashboard overhead, and the channel orchestration is smart enough for production use. It's not trying to be a platform (no user management, no billing, no analytics platform). It's a focused proxy that does one thing well. If you're running multiple AI providers in production and want a single, reliable gateway with visual management, CCX is worth deploying today.
