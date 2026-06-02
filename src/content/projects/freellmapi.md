---
name: freellmapi
description: "FreeLLMAPI stacks free tiers from 16 LLM providers into one OpenAI-compatible endpoint — 1.7B tokens/month with smart routing and automatic failover."
url: https://github.com/tashfeenahmed/freellmapi
stars: 7045
forks: 1131
language: TypeScript
tags: ["llm", "api-proxy", "openai-compatible", "developer-tools", "self-hosted"]
featured: false
publishedAt: 2026-06-02
---

## FreeLLMAPI

### Overview

FreeLLMAPI is a self-hosted TypeScript proxy that aggregates the free tiers of 16 LLM providers — Google Gemini, Groq, Cerebras, SambaNova, Mistral, OpenRouter, GitHub Models, Cohere, Cloudflare, HuggingFace, Z.ai, Ollama Cloud, Kilo, Pollinations, LLM7, and NVIDIA — behind a single OpenAI-compatible `/v1/chat/completions` endpoint. Stack them together and you get roughly 1.7 billion tokens per month of working inference capacity, at zero cost. The project hit 7,000 GitHub stars in about six weeks after its April 2026 launch, which says a lot about how many developers are tired of juggling a dozen API keys and SDK configurations just to experiment with different models.

The project is built by Tashfeen Ahmed, a developer who's clearly spent time dealing with the pain of provider fragmentation. The architecture is clean: an Express server handles the proxy logic, a React + Vite dashboard (shadcn/ui) lets you manage keys and view analytics, and SQLite with AES-256-GCM encryption stores your provider credentials safely. It runs on anything Node 20+ supports — your laptop, a VPS, even a Raspberry Pi. The whole thing sits at around 40 MB of memory at idle.

The core problem it solves is deceptively simple but practically annoying. Every major AI lab now offers a free tier — a few million tokens per month, a few thousand requests per day. On its own, each tier is a toy. But if you've got accounts at Google, Groq, Cerebras, Mistral, and a handful of others, the combined capacity is genuinely usable for prototyping, side projects, and experimentation. The issue is managing them: different SDKs, different rate limits, different error formats, different auth schemes. FreeLLMAPI collapses all of that into one endpoint that any OpenAI-compatible client can talk to. Point your existing code at `http://localhost:3001/v1` and forget about provider management.

### Why it matters

The LLM landscape in mid-2026 is fragmented in a way that punishes individual developers the hardest. Big companies can afford dedicated AI infrastructure teams. Solo developers and small teams are left signing up for eight different free tiers, reading eight different API docs, and writing custom retry logic for each one. FreeLLMAPI is a response to that reality — not a product, but a developer utility that makes the free-tier ecosystem actually usable.

What's interesting is the router design. It doesn't just round-robin through providers. It tracks per-key rate limits (RPM, RPD, TPM, TPD), runs periodic health checks, maintains a configurable fallback chain, and applies sticky sessions so multi-turn conversations don't randomly switch models mid-thread (which causes hallucination spikes). When a provider returns a 429 or 5xx, the router puts that key on cooldown and moves to the next one — up to 20 retry attempts. This isn't naive load balancing; it's thoughtful engineering around the specific constraints of free-tier APIs.

The timing connects to a broader shift: developers are building more AI-powered features into regular apps, not just building "AI apps." If you're a fullstack developer adding an AI chat feature to a SaaS product, or using LLMs for code review in your CI pipeline, or prototyping an agent workflow, you need inference capacity during development. FreeLLMAPI gives you that capacity without touching your production API budget.

### Key Features

**OpenAI-Compatible Wire Format.** The proxy implements `POST /v1/chat/completions` and `GET /v1/models` exactly as the OpenAI SDKs expect. This means zero code changes in your existing apps — swap the `base_url` and you're done. It works with the official OpenAI Python/Node SDKs, LangChain, LlamaIndex, Continue, Hermes Agent, and anything else that speaks OpenAI. The `/v1/responses` endpoint (the wire format current Codex CLI versions require) is also implemented as a translating shim over the same router.

**Smart Router with Fallback Chain.** The router picks the highest-priority model that has a healthy key and is under its rate limits. On failure, it puts the failing key on a short cooldown and retries down the fallback chain. You can reorder the chain from the dashboard — put your fastest/strongest providers at the top, let weaker ones serve as safety nets. Every response carries an `X-Routed-Via: <platform>/<model>` header so you know exactly which provider served each call.

**Per-Key Rate Tracking.** Instead of hitting a provider's limit and getting hard-blocked, the router maintains in-memory RPM/RPD/TPM/TPD counters backed by SQLite. It always selects a key that's under its caps. This means you effectively get the combined throughput of all your free tiers rather than the bottleneck of whichever one you happen to hit first. When a counter resets (usually at UTC midnight), that provider becomes available again automatically.

**Sticky Sessions.** Multi-turn conversations stay pinned to the same model for 30 minutes. This is a subtle but important feature — switching models mid-conversation causes hallucination spikes because different models have different context handling. The sticky session implementation prevents that degradation without requiring any configuration from the user.

**Encrypted Key Storage with Unified Auth.** Provider API keys are encrypted with AES-256-GCM before they hit SQLite; decryption happens in memory just before a request. Your apps authenticate to the proxy with a single `freellmapi-…` bearer token, so upstream provider keys never leave your server. The admin dashboard uses email + password authentication with scrypt-hashed credentials and session tokens.

**Vision and Tool Calling Support.** When a request contains images, the router automatically restricts itself to vision-capable models (Gemini 2.5/3.x, Llama 4 Scout/Maverick, GPT-4o/4.1). If no vision model is enabled, you get a clear 422 error instead of silent image dropping. OpenAI-style tool calling is fully supported — `tools` and `tool_choice` parameters pass through, and multi-step tool call flows (assistant `tool_calls` → `tool` role follow-up → final answer) work across every compatible provider.

**Admin Dashboard with Analytics.** The React + Vite dashboard shows per-request logging with latency, token counts, success rate, and per-provider breakdowns over 24h/7d/30d windows. You can manage keys, reorder the fallback chain, inspect analytics, and run prompts in a built-in playground — all from the browser. Dark mode included.

### Use Cases

- **Prototyping AI features** — If you're building an AI chat widget, a code assistant, or an agent workflow for a side project, FreeLLMAPI gives you free inference capacity during development without burning production API credits.
- **Multi-model experimentation** — Compare how different models handle the same prompt by routing through the fallback chain. The `X-Routed-Via` header tells you which provider served each response, making A/B testing straightforward.
- **Local development for AI-powered apps** — Point your local dev environment at `localhost:3001` and stop worrying about rate limits during hot-reload cycles. The proxy handles provider failover transparently.
- **Agent and workflow development** — Building an AI agent that needs reliable inference? The automatic failover and sticky sessions make FreeLLMAPI more resilient than hitting a single provider directly, even during development.
- **Cost-conscious experimentation** — Students, indie developers, and researchers who want to experiment with LLM APIs without signing up for paid tiers get a single endpoint that aggregates multiple free quotas.

### Pros and Cons

Pros:
- Genuinely usable free inference capacity. The combined ~1.7 billion tokens/month across 16 providers is enough for serious prototyping, not just toy demos. The router makes it practical by handling failover and rate limits automatically.
- Zero lock-in. The OpenAI-compatible wire format means any existing OpenAI client works without modification. Swap out the base_url and you're connected to 16 providers simultaneously.
- Thoughtful security design. AES-256-GCM encrypted key storage, unified bearer tokens, and dashboard authentication. Provider keys never leave your server and never get exposed to client applications.
- Active development with a responsive maintainer. 7,000 stars and 1,100 forks in six weeks, with 31 open issues suggesting the project is growing but manageable.

Cons:
- No frontier models. The free-tier catalog tops out around Llama 3.3 70B, GLM-4.5, Qwen 3 Coder, and Gemini 2.5 Pro. You won't get GPT-5 or Claude Opus-class reasoning. For hard problems, you still need a paid API.
- Intelligence degrades throughout the day. Your top-ranked models (Gemini 2.5 Pro, GPT-4o via GitHub Models) have the lowest daily caps. Once they're exhausted, the router falls to smaller models. Expect the effective quality to drop in the evening, then reset at UTC midnight.
- Latency varies significantly. Cerebras and Groq are extremely fast; other providers are not. You get whichever one is available, and the response time can swing from 200ms to several seconds depending on the provider.
- Free tiers change without notice. Providers regularly tighten, loosen, or remove their free offerings. When that happens, you'll see 429s or auth errors until the catalog is updated.
- Single-user by design. No multi-tenant auth, no per-user billing. This is a personal tool, not something you expose to a team or the internet.

### Getting Started

```bash
# Clone and run with Docker (recommended)
git clone https://github.com/tashfeenahmed/freellmapi.git
cd freellmapi

# Generate encryption key
ENCRYPTION_KEY="$(openssl rand -hex 32)"
printf "ENCRYPTION_KEY=%s\nPORT=3001\n" "$ENCRYPTION_KEY" > .env

# Start with Docker Compose
docker compose up -d
```

Open http://localhost:3001, add your provider keys on the **Keys** page, reorder the **Fallback Chain**, and grab your unified API key. Then use it in any OpenAI-compatible client:

```python
from openai import OpenAI

client = OpenAI(
    base_url="http://localhost:3001/v1",
    api_key="freellmapi-your-unified-key",
)

# Let the router pick the best available model
resp = client.chat.completions.create(
    model="auto",
    messages=[{"role": "user", "content": "Summarize the fall of Rome in one sentence."}],
)
print(resp.choices[0].message.content)
print("Routed via:", resp.headers.get("x-routed-via"))
```

For local development without Docker:

```bash
npm install
npm run dev      # server on :3001, dashboard on :5173, both with HMR
npm test         # run the test suite
```

To expose it on your LAN (e.g., a Raspberry Pi):

```bash
HOST_BIND=0.0.0.0 docker compose up -d
```

### Alternatives

**LiteLLM** — The most established LLM proxy with support for 100+ providers and a much larger feature set (embeddings, image generation, budgeting, multi-tenant auth). LiteLLM is the better choice if you need production-grade features like team management, per-user budgets, or a wider provider catalog. FreeLLMAPI is simpler to set up and specifically optimized for stacking free tiers with automatic failover — choose it when you want a lightweight personal proxy, not an enterprise gateway.

**OpenRouter** — A hosted service that aggregates multiple providers behind a single API, including free-tier models. OpenRouter requires no self-hosting and handles routing/failover for you, but you're limited to their catalog and pricing model. FreeLLMAPI gives you direct control over which providers you use, keeps your keys local, and doesn't take a cut of paid requests. Choose OpenRouter when you don't want to run infrastructure; choose FreeLLMAPI when you want control and zero cost.

**Portkey** — An AI gateway focused on reliability features like fallbacks, load balancing, and observability for production workloads. Portkey targets teams running LLM-powered products at scale with features like semantic caching and guardrails. It's overkill for personal experimentation. FreeLLMAPI is the right tool when you're a solo developer who just wants to aggregate free tiers without enterprise overhead.

### Verdict

FreeLLMAPI is the kind of tool that makes you wonder why it didn't exist sooner. The premise — stack every free LLM tier into one endpoint — sounds almost too simple, but the execution is solid. The router is genuinely smart about rate limits and failover, the encrypted key storage is a nice security touch, and the admin dashboard is polished enough that you don't need to touch config files. The 7,000 stars in six weeks reflect real demand: developers want to experiment with LLMs without paying for every API call during prototyping.

The limitations are real but honest. You're not getting frontier model intelligence, quality degrades as daily caps are hit, and latency varies. But for prototyping, side projects, and learning, those trade-offs are perfectly acceptable. If you're a fullstack developer building AI features into a regular app and you want free inference capacity during development, FreeLLMAPI is worth running locally. It takes five minutes to set up with Docker, and the unified endpoint means your existing OpenAI SDK code works without changes.
