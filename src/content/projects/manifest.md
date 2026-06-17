---
name: manifest
description: "Manifest is an open-source AI model router that cuts LLM costs up to 70% by routing queries to the best model. Supports 300+ models, 18 providers, self-hosted or cloud."
url: https://github.com/mnfst/manifest
stars: 7029
forks: 451
language: TypeScript
tags: ["ai", "llm-router", "cost-optimization", "developer-tools", "open-source"]
featured: false
publishedAt: 2026-06-18
---

## Manifest

### Overview

Manifest is an open-source smart model router for AI agents and applications. It sits between your code and LLM providers, analyzing each query's complexity and routing it to the most cost-effective model that can handle it — claiming up to 70% savings on AI spend. The project has accumulated over 7,000 GitHub stars and is actively maintained with regular releases.

The project is built in TypeScript and ships as a Docker container. It connects to 300+ models across 18 providers — OpenAI, Anthropic, Google, xAI, DeepSeek, Mistral, Qwen, Moonshot, MiniMax, Xiaomi MiMo, Z.ai, BytePlus, OpenRouter, GitHub Copilot, Ollama, LM Studio, llama.cpp, and any custom OpenAI/Anthropic-compatible endpoint. The key differentiator is that you can mix API keys, paid subscriptions (like ChatGPT Pro or Claude Max), and local models all through the same routing layer.

The core problem Manifest solves is cost management in multi-model AI applications. Most teams using LLMs today either hard-code a single expensive model for everything or manually switch between models in their code. Both approaches waste money — you don't need GPT-5-level reasoning for a simple classification task, and you don't want DeepSeek handling a complex code generation task that needs Claude's nuance. Manifest automates this decision at the infrastructure layer.

### Why it matters

If you're building any kind of AI-powered application in 2026 — chatbots, agents, RAG pipelines, content generation — you're probably burning through API credits faster than you'd like. The LLM landscape has exploded: there are dozens of capable models from different providers, each with different pricing, speed, and quality characteristics. Managing this manually is unsustainable.

Manifest fits into a growing category of AI infrastructure tools that abstract away provider complexity. What makes it interesting is the subscription reuse angle — you can route queries through your existing ChatGPT Pro or Claude Max subscription when appropriate, falling back to API keys for higher-volume or specialized workloads. For a fullstack developer running a side project or small SaaS, this could mean the difference between $200/month and $50/month in AI costs.

The self-hosted option is a big deal too. Your query data, routing logic, and cost tracking stay on your infrastructure. For teams with compliance requirements or just a healthy skepticism of SaaS lock-in, this matters. The Docker setup is genuinely one command, and the admin UI at localhost:2099 gives you visibility into every request.

### Key Features

**Intelligent Query Routing.** Manifest analyzes incoming queries based on complexity, specificity, and custom HTTP headers, then routes each one to the optimal model. A simple "summarize this text" gets sent to a cheaper, faster model like GPT-5-mini, while a complex reasoning task gets routed to Claude Opus or GPT-5. You define the routing rules; the system handles the rest. This is where the 70% cost savings claim comes from.

**300+ Models, 18 Providers, One Endpoint.** All your models — cloud API, paid subscription, local Ollama instance — are accessible through a single `/auto` endpoint. No more maintaining separate client configurations for each provider. Add a new model by connecting its API key or subscription, and it's immediately available for routing. The provider table in the docs shows every supported integration with its authentication method.

**Subscription Reuse.** This is Manifest's most unusual feature. You can route queries through existing ChatGPT Plus/Pro/Team, Claude Max/Pro, Kimi Coding Plan, MiniMax Coding Plan, MiMo Token Plan, GLM Coding Plan, OpenCode Go, ModelArk Coding Plan, GitHub Copilot, or Ollama Cloud subscriptions. Instead of paying per-token API rates for everything, you leverage subscriptions you're already paying for.

**Cost Tracking and Budget Controls.** Every single API call is logged with token counts, costs, and model metadata. Set up spending notifications, hard budget limits, and per-provider caps. The dashboard shows real-time cost breakdowns by model, provider, and time period. For teams managing AI budgets, this level of visibility is essential, not optional.

**Automatic Fallbacks.** When a query fails on the primary model — rate limits, timeouts, provider outages — Manifest automatically retries on a fallback model you've configured. This keeps your application running even when individual providers have issues. You define the fallback chain; the system handles failover transparently.

**Self-Hosted with Full Data Control.** The entire system runs as a single Docker container. Your query data, routing logic, and cost analytics never leave your infrastructure. The admin UI at localhost:2099 provides the same management interface as the cloud version. For regulated industries or privacy-conscious teams, this is a non-negotiable requirement.

**Custom Provider Support.** Any service that implements the OpenAI `/v1/chat/completions` or Anthropic `/v1/messages` API format works as a provider. This means you can route to fine-tuned models, internal APIs, or emerging providers without waiting for official integration. The custom provider setup is just an endpoint URL and an API key.

### Use Cases

- **AI-powered SaaS applications** — Route customer queries to cost-effective models for simple requests and escalate to premium models for complex ones. A customer support chatbot doesn't need Claude Opus for "what are your hours?"
- **Agent frameworks and multi-step workflows** — When your AI agent needs to call multiple models in a pipeline (planning, execution, verification), Manifest optimizes each call independently. Use cheap models for planning steps and expensive ones for final output generation.
- **Development and testing environments** — Route dev/staging traffic to local Ollama models while production uses cloud APIs. Same codebase, different routing rules per environment.
- **Multi-tenant platforms** — Different tenants can have different cost profiles and model preferences. A free tier gets routed to cheaper models; enterprise customers get premium routing.
- **Cost-constrained projects** — Solo developers and small teams running AI features in side projects. Set a monthly budget cap and let Manifest optimize within that constraint.

### Pros and Cons

Pros:
- The subscription reuse feature is genuinely novel — using your existing ChatGPT Pro subscription as a provider alongside API keys isn't something you see in other routing tools. This alone can cut costs significantly for small teams.
- Self-hosted Docker deployment with one command means no vendor lock-in at the infrastructure level. Your data stays on your servers.
- The provider ecosystem is the widest I've seen in an open-source router — 18 providers including local model support via Ollama, LM Studio, and llama.cpp covers virtually every LLM deployment scenario.

Cons:
- Beta status means the routing logic is still being tuned. The 70% savings claim depends heavily on your workload mix and routing configuration — your mileage will vary.
- The intelligent routing requires configuration and tuning to work well. Out of the box, it's a pass-through. You need to define complexity thresholds and model mappings to get real savings.
- No native SDK for popular frameworks (LangChain, LlamaIndex, Vercel AI SDK). You integrate via the OpenAI-compatible API endpoint, which works but adds a network hop compared to direct provider calls.

### Getting Started

```bash
# Self-hosted with Docker (recommended)
bash <(curl -sSL https://raw.githubusercontent.com/mnfst/manifest/main/docker/install.sh)

# Open http://localhost:2099 and create your admin account
# Then configure your providers (API keys, subscriptions, local models)
# Point your application to http://localhost:2099/v1/chat/completions
```

For cloud version, go to [app.manifest.build](https://app.manifest.build) and follow the setup guide.

Integrate with your existing OpenAI-compatible code:

```python
# Just change the base_url — no code changes needed
import openai

client = openai.OpenAI(
    base_url="http://localhost:2099/v1",
    api_key="your-manifest-key"
)

response = client.chat.completions.create(
    model="auto",  # Let Manifest choose the best model
    messages=[{"role": "user", "content": "Explain quantum computing"}]
)
```

### Alternatives

**LiteLLM** — The most established open-source LLM proxy with 100+ provider support. LiteLLM is more mature and has broader framework integrations (LangChain, LlamaIndex, etc.), but it's primarily a proxy/adapter, not an intelligent router. It doesn't do complexity-based routing or subscription reuse. Choose LiteLLM if you need a stable, well-documented proxy without the routing intelligence.

**OpenRouter** — A hosted API gateway that routes to 300+ models. OpenRouter handles the routing and billing for you, which is simpler but means you're paying their markup on every request and you don't control the routing logic. Manifest is the self-hosted alternative where you own the routing decisions. Choose OpenRouter if you want zero infrastructure overhead and don't mind the per-token markup.

**Portkey** — An AI gateway focused on reliability and observability with automatic retries, fallbacks, and cost tracking. Portkey is more enterprise-focused with features like guardrails and prompt management. It's a SaaS product with a free tier. Choose Portkey if you need enterprise governance features and prefer a managed service over self-hosting.

### Verdict

Manifest fills a real gap in the AI infrastructure stack. The idea of routing queries to the right model based on complexity isn't new, but doing it open-source with subscription reuse and self-hosting is. For a fullstack developer building AI features into a React/NestJS/Django/Go application, having a single endpoint that intelligently routes to the cheapest capable model is genuinely useful.

The 7,000+ stars and active development suggest the community sees value in this approach. The beta status is the main caveat — expect rough edges in routing accuracy and some API surface changes. But if you're spending more than $100/month on LLM APIs and you're comfortable with Docker, Manifest is worth a weekend experiment. The potential 70% cost reduction (realistic or not) makes it worth evaluating against your actual workload.
