---
name: tensorzero
description: "TensorZero is an open-source Rust LLMOps platform unifying LLM gateway, observability, evaluation, and optimization with sub-millisecond latency overhead."
url: https://github.com/tensorzero/tensorzero
stars: 11647
forks: 920
language: Rust
tags: ["llm", "ai-infrastructure", "gateway", "observability", "rust"]
featured: false
publishedAt: 2026-06-16
---

## TensorZero

### Overview

TensorZero is an open-source LLMOps platform written in Rust that unifies an LLM gateway, observability, evaluation, optimization, and experimentation into a single system. It crossed 11,600 GitHub stars and has become one of the most active Rust projects in the AI infrastructure space, with over 7,500 commits and a development velocity that puts most VC-backed startups to shame.

The project was created by Viraj Mehta and the TensorZero team, who come from a machine learning systems background. The core insight that shaped the product: most teams building with LLMs end up stitching together five or six different tools — a gateway like LiteLLM, an observability platform like LangSmith, an eval framework, a prompt management system, and an A/B testing tool. TensorZero collapses all of that into one self-hosted binary.

The numbers back up the ambition. TensorZero claims less than 1 millisecond p99 latency overhead at 10,000+ queries per second for its gateway, benchmarked on commodity hardware. That's not marketing fluff — it's a direct consequence of building the proxy layer in Rust with async I/O and zero-copy deserialization. The platform currently fuels roughly 1% of global LLM API spend, according to the team's own telemetry, which tracks with the kind of enterprise adoption you see from companies ranging from frontier AI startups to Fortune 10 enterprises.

### Why it matters

The LLM infrastructure landscape in 2026 is fragmented in a way that reminds me of the early Kubernetes ecosystem. Everyone agrees you need a gateway, observability, and some form of evaluation, but the tooling is scattered across a dozen incompatible products. LiteLLM handles the gateway but punts on observability. LangSmith does tracing but doesn't touch routing or optimization. Braintrust covers evals but you're still wiring up your own proxy. The result is that even well-resourced teams spend weeks on integration plumbing instead of building product features.

TensorZero takes the position that these capabilities are fundamentally coupled — your observability data should feed directly into your optimization loop, which should inform your routing decisions, which should be validated by your eval framework. When they're separate systems, you lose the feedback cycle. When they're one system, you get something like TensorZero's Autopilot: an automated AI engineer that reads your inference logs, identifies underperforming prompts, proposes improvements, runs A/B tests, and ships the winner. That's not a demo — it's a production feature that multiple companies are running in anger.

For fullstack developers specifically, this matters because the OpenAI SDK compatibility means you can drop TensorZero into an existing NestJS, Django, or Go backend with a one-line config change. You don't need to learn a new SDK or rewrite your LLM calls. The gateway speaks the OpenAI protocol natively, and you get observability, caching, and rate limiting for free.

### Key Features

**Unified LLM Gateway with Sub-Millisecond Overhead.** The gateway supports every major provider — OpenAI, Anthropic, Google, DeepSeek, Mistral, Groq, AWS Bedrock, Azure, and 15+ others — through a single OpenAI-compatible API. The Rust implementation delivers less than 1ms p99 latency overhead, which means the proxy itself is never your bottleneck. You get automatic retries, fallbacks, load balancing, and granular timeouts out of the box. For teams hitting multiple providers or running self-hosted models via vLLM and SGLang, this is the routing layer you'd build yourself if you had three months to spare.

**Built-In Observability with ClickHouse Backend.** Every inference request, response, token count, latency measurement, and cost estimate gets stored automatically. The observability layer uses ClickHouse as its analytical backend, which means you can query millions of inference records with sub-second response times. The UI shows traces, metrics dashboards, and per-function breakdowns. For developers who've been exporting CSVs from LangSmith and building their own dashboards, this is a significant quality-of-life improvement.

**Automated Optimization with TensorZero Autopilot.** Autopilot analyzes your inference patterns, identifies areas where prompts or model choices are underperforming, and automatically generates optimized variants. It runs statistical A/B tests against your production traffic and promotes winners. The team claims dramatic improvements across diverse LLM tasks — from code generation to customer support to data extraction. This is the feature that separates TensorZero from being "just another gateway."

**Structured Outputs and Schema Enforcement.** Define JSON schemas for your LLM responses and TensorZero enforces them at the gateway level. This means your application code gets typed, validated responses without client-side parsing or retry logic. For TypeScript developers using Zod or Python developers using Pydantic, the gateway handles the structured output generation so your backend code stays clean.

**Experimentation and A/B Testing Framework.** Run controlled experiments across models, prompts, and inference strategies with built-in statistical significance testing. Route traffic between variants, measure quality metrics against human feedback or automated evaluators, and make data-driven decisions about which configuration ships. This replaces the custom experimentation frameworks that most ML teams build (badly) in-house.

**Incremental Adoption with Composable Architecture.** You don't have to adopt the entire platform. Use just the gateway, or just observability, or just the eval framework. Each component works independently and integrates with existing tools. The gateway plays nicely with OpenTelemetry for distributed tracing, and the Python SDK follows the OpenAI SDK conventions so switching is literally a base URL change.

**Production-Grade Infrastructure in Rust.** The entire platform is a single Rust binary with a ClickHouse dependency for analytics. No JVM, no Node.js runtime, no Python GIL issues under load. The self-hosted deployment is a Docker Compose file. For teams tired of babysitting Java-based enterprise tools that consume 4GB of heap before serving their first request, the resource efficiency is a genuine advantage.

### Use Cases

- **Multi-provider LLM applications** — Teams routing requests across OpenAI, Anthropic, and self-hosted models need a unified gateway with fallback logic. TensorZero handles provider failover, cost tracking, and latency-based routing in one layer.

- **Production AI agent systems** — Agents making dozens of LLM calls per task need observability that shows the full chain of reasoning, not just individual requests. TensorZero's trace-level visibility lets you debug agent behavior at scale.

- **Prompt engineering at scale** — Product teams iterating on prompts for customer-facing features need A/B testing infrastructure that's statistical, not vibes-based. TensorZero's experimentation framework provides p-values, not gut feelings.

- **Cost optimization for high-volume LLM usage** — Organizations spending $10K+/month on LLM APIs can use TensorZero's routing and caching to reduce costs by 20-40% without sacrificing quality, by routing simpler queries to cheaper models.

- **Compliance and audit requirements** — Enterprise teams that need to log every LLM interaction for regulatory compliance get automatic inference storage with the self-hosted deployment, keeping data on-premises.

### Pros and Cons

Pros:
- The Rust-based gateway genuinely delivers on its performance claims — sub-millisecond overhead at 10K+ QPS is impressive and independently verifiable with the published benchmarks.
- Unified platform eliminates the integration tax of stitching together 4-5 separate LLM tools, saving weeks of engineering time for teams building production AI features.
- Open source with Apache 2.0 license means no vendor lock-in. Self-host on your own infrastructure, keep your data, and avoid the SaaS tax that compounds at scale.
- Autopilot's automated optimization is a genuine differentiator — no other open-source tool offers closed-loop prompt and model optimization against production traffic.

Cons:
- ClickHouse dependency adds operational complexity. It's a powerful analytical database, but running and tuning ClickHouse is non-trivial if your team doesn't have database operations experience.
- The feature surface area is massive, which means the learning curve is steeper than a single-purpose tool like LiteLLM. Expect 1-2 weeks to get comfortable with the full platform.
- The Rust codebase, while performant, limits the contributor pool. If you need to fork and customize heavily, finding Rust engineers who understand LLM infrastructure is harder than finding Python developers.

### Getting Started

```bash
# Quick start with Docker Compose
git clone https://github.com/tensorzero/tensorzero.git
cd tensorzero
docker compose up -d

# The gateway runs on http://localhost:3000
# The UI runs on http://localhost:4000

# Install the Python client
pip install tensorzero

# Use with the OpenAI SDK (zero code changes)
export OPENAI_BASE_URL=http://localhost:3000/openai/v1
export OPENAI_API_KEY=tensorzero  # any string works for local

# Or use the TensorZero Python SDK directly
from tensorzero import TensorZeroGateway

with TensorZeroGateway("http://localhost:3000") as client:
    response = client.inference(
        function_name="chat",
        input={"messages": [{"role": "user", "content": "Hello!"}]},
    )
    print(response)
```

Define a function and model config in `tensorzero.toml`:

```toml
[functions.chat]
type = "chat"

[functions.chat.variants.gpt4o]
type = "chat_completion"
model = "gpt-4o"

[functions.chat.variants.claude]
type = "chat_completion"
model = "claude-sonnet-4-20250514"
weight = 0.0  # start with 0, increase for A/B tests
```

### Alternatives

**LiteLLM** — The most popular open-source LLM gateway, written in Python. LiteLLM excels at provider translation and has a broader provider list, but it lacks observability, evaluation, and optimization. If you only need a gateway and prefer Python, LiteLLM is the simpler choice. If you need the full LLMOps stack, TensorZero replaces LiteLLM plus three other tools.

**LangSmith** — LangChain's commercial observability and evaluation platform. LangSmith has a more polished UI and deeper LangChain integration, but it's a SaaS product that doesn't offer a gateway or self-hosted optimization. For teams already invested in the LangChain ecosystem who don't mind cloud-hosted observability, LangSmith is the path of least resistance. For teams wanting self-hosted control and gateway capabilities, TensorZero is the stronger option.

**Braintrust** — A commercial LLMOps platform focused on evaluation and experimentation. Braintrust has excellent eval tooling and a slick developer experience, but it's SaaS-only and doesn't include a gateway. If evaluation is your primary pain point and you're comfortable with cloud-hosted tools, Braintrust is worth considering. If you want gateway + observability + eval in one self-hosted package, TensorZero covers more ground.

### Verdict

TensorZero is the most complete open-source LLMOps platform available in 2026, and it's not particularly close. The combination of a Rust gateway with sub-millisecond overhead, ClickHouse-backed observability, and automated prompt optimization through Autopilot creates a feedback loop that no other single tool matches. The 11,600 stars and adoption by companies from startups to Fortune 10 suggest this isn't just an interesting side project — it's becoming infrastructure.

The tradeoff is complexity. This isn't a drop-in replacement for a single tool; it's a platform that asks you to rethink how your LLM infrastructure fits together. Teams with 2-3 LLM calls in their app might find it overkill. But for anyone running production AI features at scale — multiple models, high QPS, cost sensitivity, quality requirements — TensorZero is the tool I'd recommend evaluating first. The fact that you can adopt incrementally (gateway only, observability only, full stack) makes the entry cost manageable. Start with the gateway, add observability when you need it, and let Autopilot earn its keep once you have enough traffic to optimize against.
