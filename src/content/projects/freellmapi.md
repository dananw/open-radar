---
name: freellmapi
description: "FreeLLMAPI stacks free tiers from 16 LLM providers behind one OpenAI-compatible endpoint — ~1.7B tokens/month with smart routing and automatic failover."
url: https://github.com/tashfeenahmed/freellmapi
stars: 7842
forks: 1280
language: TypeScript
tags: ["llm", "ai-infrastructure", "openai-compatible", "proxy", "developer-tools"]
featured: false
publishedAt: 2026-06-06
---

## FreeLLMAPI

### Overview

FreeLLMAPI is a TypeScript proxy server that aggregates the free tiers of 16 LLM providers — Google Gemini, Groq, Cerebras, SambaNova, NVIDIA, Mistral, OpenRouter, GitHub Models, Cohere, Cloudflare, HuggingFace, Z.ai (Zhipu), Ollama Cloud, Kilo, Pollinations, and LLM7 — into a single OpenAI-compatible `/v1/chat/completions` endpoint. Stacked together, those free tiers add up to roughly 1.7 billion tokens per month across 100+ models. The repo hit nearly 8,000 stars within six weeks of its April 2026 launch, which tells you how many developers are tired of paying per-token pricing while prototyping.

The project is built by Tashfeen Ahmed and a growing contributor community. It's MIT-licensed, runs anywhere Node.js 20+ works (including Raspberry Pi), and ships as a Docker image with a React + Vite admin dashboard. The architecture is deliberately simple: an Express proxy sits in front of your OpenAI SDK calls, a router picks the best available model for each request, and per-key rate tracking keeps you under every provider's free-tier cap. No magic, no complex abstractions — just a well-engineered proxy that does one thing well.

The core problem it solves is practical: every major AI lab now offers a free tier, but managing 16 different SDKs, rate limits, and failure modes by hand is a nightmare. FreeLLMAPI collapses that into one endpoint. Point any OpenAI-compatible client at your local server — Python's `openai` library, LangChain, LlamaIndex, Continue, Hermes Agent, or even curl — and it routes transparently across whichever providers you've added keys for. When one provider hits its rate limit, the router automatically fails over to the next one in your configured fallback chain.

### Why it matters

The AI infrastructure space is consolidating around OpenAI-compatible APIs as the de facto standard. Every major provider — Groq, Mistral, Cerebras, SambaNova, Cloudflare — now speaks the same wire format. That convergence creates an opportunity that FreeLLMAPI exploits cleanly: if everyone speaks the same protocol, you can build a router that treats providers as interchangeable backends.

For fullstack developers working with React, NestJS, Django, or Go backends that need LLM integration, the economics matter. Production API calls to GPT-4 or Claude Opus cost real money. But prototyping, testing, and building internal tools don't need frontier models — they need *enough* intelligence at zero cost. FreeLLMAPI fills exactly that gap. You get a unified endpoint that auto-routes to whichever free provider has capacity, with graceful degradation as daily caps reset at UTC midnight.

The project also reflects a broader trend: developers are building their own AI infrastructure layers instead of depending on single-provider setups. Tools like LiteLLM and OpenRouter serve the paid multi-provider use case. FreeLLMAPI specifically targets the "I want to experiment without spending money" use case, and does it with a cleaner UX than hand-rolling provider rotation scripts.

### Key Features

**Smart Router with Automatic Failover.** The router picks the highest-priority model that has a healthy key and is under all its rate limits. On a 429, 5xx, or timeout, it puts the key on a short cooldown and retries the next model in your fallback chain — up to 20 attempts per request. This means your endpoint stays available even when individual providers are overloaded or rate-limited. The fallback chain is fully configurable from the dashboard.

**Per-Key Rate Tracking.** RPM (requests per minute), RPD (requests per day), TPM (tokens per minute), and TPD (tokens per day) counters are tracked per `(platform, model, key)` tuple. The router always picks a key that's under its caps, so you never blow through a provider's free tier accidentally. Counters reset automatically and are backed by SQLite for persistence across restarts.

**Sticky Sessions for Multi-Turn Conversations.** When you're in a multi-turn chat, the router keeps talking to the same model for 30 minutes to avoid the hallucination spike that comes from mid-conversation model switches. This is a subtle but important detail — switching models between turns in a conversation degrades output quality because each model has different context about what was said before.

**AES-256-GCM Encrypted Key Storage.** Provider API keys are encrypted with AES-256-GCM before hitting the SQLite database. Decryption happens in-memory just before a request. You authenticate to the proxy with a single `freellmapi-…` bearer token — your upstream provider keys are never exposed to your applications. This is the right security model for a local proxy.

**OpenAI-Compatible Responses API.** Beyond the standard `/v1/chat/completions`, FreeLLMAPI implements `/v1/responses` — the wire format that current Codex CLI versions require. It's a translating shim over the same router, with full streaming events and tool calls. Tool calling works too: OpenAI-style `tools` and `tool_choice` requests pass through, and assistant `tool_calls` + `tool` role follow-up messages round-trip across every supported provider.

**Admin Dashboard with Analytics.** A React + Vite + shadcn/ui dashboard lets you manage provider keys, reorder the fallback chain, run prompts in a playground, and inspect per-request analytics including latency, token counts, success rate, and per-provider breakdowns over 24h/7d/30d windows. Dark mode included. The dashboard is served from the same Express server — no separate deployment needed.

**Embeddings with Family-Based Routing.** The `/v1/embeddings` endpoint is OpenAI-compatible with one deliberate difference: failover never crosses models. Vectors from different models live in incompatible spaces, so embeddings route by family (one model identity + dimension), and failover only walks providers serving that same family. Supported families include Gemini embeddings, text-embedding-3-large/small, Cohere embed-v4.0, BGE-M3, and several NVIDIA models.

### Use Cases

- **Rapid prototyping with LLMs** — Build a chatbot, content generator, or AI-powered feature in your React or Next.js app without provisioning paid API keys. Point the OpenAI SDK at `localhost:3001` and start coding.
- **Internal tools and dashboards** — NestJS or Django backends that need LLM capabilities for internal admin tools, content moderation, or data processing. FreeLLMAPI gives you a stable endpoint without per-request costs.
- **AI agent development** — Build and test autonomous agents (LangChain, LlamaIndex, Hermes Agent) that make many LLM calls per task. The automatic failover and rate tracking keep your agent running even when individual providers throttle.
- **Learning and experimentation** — Students and hobbyists exploring prompt engineering, RAG pipelines, or fine-tuning workflows who need LLM access without a credit card.
- **Cost-conscious production backends** — Small startups or side projects that can tolerate variable latency and model quality in exchange for zero inference costs during the early growth phase.
- **Local development workflow** — Run FreeLLMAPI on your dev machine alongside your Go or Python backend. The Docker setup takes under a minute, and the unified endpoint means your `.env` files don't need 16 different API key variables.

### Pros and Cons

Pros:
- Zero-cost LLM access across 16 providers and 100+ models. The aggregate free tier is genuinely useful — 1.7 billion tokens/month is enough for serious prototyping and internal tool development.
- True OpenAI compatibility means it works with every existing client library and framework. No vendor-specific SDK changes, no wrapper libraries — just change `base_url`.
- The router's per-key rate tracking and automatic failover are production-quality engineering. The sticky session feature shows attention to real-world usage patterns that most proxy tools miss.
- Active development with 25+ contributors and a responsive maintainer. The ToS review table in the README shows genuine care about doing things correctly.

Cons:
- No frontier models. The free-tier catalog tops out around Llama 3.3 70B, GLM-4.5, and Gemini 2.5 Pro. You will not get GPT-5 or Claude Opus class reasoning through this proxy. For hard reasoning tasks, you still need a paid API.
- Intelligence degrades as the day progresses. Your top-ranked models (usually Gemini 2.5 Pro, GPT-4o via GitHub Models) have the lowest daily caps. Once they hit their limits, the router falls to smaller, weaker models. Expect effective quality to drop in the late hours, then reset at UTC midnight.
- Free tiers change without notice. Providers regularly tighten, loosen, or remove free tiers. When that happens you'll see 429s or auth errors until the catalog is updated. The maintainer publishes re-seed scripts, but you're still at the mercy of provider decisions.
- Single-user by design. No multi-tenant auth, no per-user billing. This is a personal tool, not a SaaS platform. Don't expose it to the internet.

### Getting Started

```bash
# Recommended: Docker Compose
git clone https://github.com/tashfeenahmed/freellmapi.git
cd freellmapi

# Generate an encryption key for at-rest key storage
ENCRYPTION_KEY="$(openssl rand -hex 32)"
printf "ENCRYPTION_KEY=%s\nPORT=3001\n" "$ENCRYPTION_KEY" > .env

docker compose up -d
```

Open http://localhost:3001, add your provider keys on the **Keys** page, reorder the **Fallback Chain** to taste, and grab your unified API key from the dashboard header.

For local development without Docker:

```bash
git clone https://github.com/tashfeenahmed/freellmapi.git
cd freellmapi
npm install
cp .env.example .env
ENCRYPTION_KEY="$(node -e 'console.log(require("crypto").randomBytes(32).toString("hex"))')"
printf "ENCRYPTION_KEY=%s\nPORT=3001\n" "$ENCRYPTION_KEY" > .env
npm run dev
```

Using it from Python:

```python
from openai import OpenAI

client = OpenAI(
    base_url="http://localhost:3001/v1",
    api_key="freellmapi-your-unified-key",
)

resp = client.chat.completions.create(
    model="auto",  # let the router pick
    messages=[{"role": "user", "content": "Summarize the fall of Rome in one sentence."}],
)
print(resp.choices[0].message.content)
print("Routed via:", resp.headers.get("x-routed-via"))
```

Using it from curl:

```bash
curl http://localhost:3001/v1/chat/completions \
  -H "Authorization: Bearer freellmapi-your-key" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "auto",
    "messages": [{"role": "user", "content": "hi"}]
  }'
```

### Alternatives

**LiteLLM** — A Python library and proxy that supports 100+ LLM providers with OpenAI-compatible output. LiteLLM is more mature and handles paid providers well, but it doesn't specifically optimize for free-tier stacking. Better choice if you need a production-grade proxy with enterprise features like budgeting and team management.

**OpenRouter** — A hosted service that routes across 200+ models with a single API key, including 21 free-tier models. OpenRouter is easier to set up (no self-hosting) and offers paid models alongside free ones, but you're dependent on their infrastructure and pricing. Better choice if you want a managed service and don't mind paying for premium models.

**OneAPI** — A Go-based API management and distribution tool that supports multiple LLM providers with token-based billing and quota management. OneAPI is more feature-rich for multi-user deployments and has a larger Chinese developer community, but it's heavier and more complex than FreeLLMAPI's single-user design. Better choice if you need to manage API access for a team.

### Verdict

FreeLLMAPI is the most practical zero-cost LLM infrastructure tool I've seen. The concept — stack every free tier behind one endpoint — is obvious in hindsight, but the execution is what makes it work. The router engineering is solid: per-key rate tracking, automatic failover with cooldowns, sticky sessions for multi-turn conversations, and family-based routing for embeddings. These aren't features you'd hack together in a weekend.

It's not going to replace paid APIs for production workloads. The daily cap exhaustion problem is real — by evening, you're running on whatever scraps are left. And the ToS landscape is a minefield that requires periodic re-evaluation. But for the specific use case of "I want to experiment with LLMs without spending money," FreeLLMAPI is the best option available. The 8K stars in six weeks suggest the developer community agrees. If you're a fullstack developer building AI features into your app and want a local proxy that just works, this is worth the five-minute Docker setup.
