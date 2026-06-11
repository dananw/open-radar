---
name: agentgateway
description: "Agentgateway is an open-source Rust proxy for AI agents with MCP and A2A protocol support — security, observability, and governance for agentic AI systems."
url: https://github.com/agentgateway/agentgateway
stars: 3215
forks: 531
language: Rust
tags: ["ai-agents", "mcp", "proxy", "rust", "ai-gateway", "a2a"]
featured: false
publishedAt: 2026-06-11
---

## Agentgateway

### Overview

Agentgateway is an open-source proxy built on AI-native protocols — MCP (Model Context Protocol) and A2A (Agent-to-Agent) — that provides security, observability, and governance for agent-to-LLM, agent-to-tool, and agent-to-agent communication. It's a Linux Foundation project written in Rust, currently at 3,200+ GitHub stars with 531 forks and active weekly releases.

The project launched in March 2025 and has been gaining traction steadily through 2026. The most recent release (v1.3.0-alpha.1) dropped in late May 2026, showing consistent development velocity. It's backed by the Linux Foundation, which gives it institutional credibility that most open-source AI infrastructure projects lack. The maintainers hold regular community meetings and publish recordings — a sign of serious project governance.

The core problem agentgateway solves is one that didn't exist 18 months ago: how do you secure, monitor, and control traffic between AI agents, LLMs, and external tools? As organizations deploy autonomous agents that call multiple LLM providers, access databases, invoke APIs, and communicate with other agents, the lack of a network-layer control plane becomes a real operational risk. Agentgateway positions itself as that missing control plane.

### Why it matters

If you're building anything with AI agents in 2026 — whether that's a customer support bot, a code generation pipeline, or an autonomous research system — you're dealing with a growing mess of API keys, provider endpoints, tool connections, and inter-agent communication. Most teams handle this with application-level code: custom middleware, hand-rolled retry logic, scattered API key management. It works until it doesn't.

The MCP protocol has become the de facto standard for connecting LLMs to external tools, and A2A (Agent-to-Agent) is Google's emerging protocol for agent interoperability. Agentgateway speaks both natively. Instead of building protocol handling into every agent framework, you route traffic through a single proxy that understands these protocols at the wire level. That's a fundamentally different approach from bolting MCP support onto your application code.

What's interesting is the Kubernetes-native angle. Agentgateway has a built-in controller and Gateway API support, which means it fits into existing infrastructure patterns that platform teams already know. For organizations running microservices on Kubernetes, adding AI agent infrastructure through the same networking primitives (routes, policies, observability) is a much easier sell than deploying a standalone AI platform.

### Key Features

**LLM Gateway with Unified API.** Route traffic to OpenAI, Anthropic, Gemini, Bedrock, and other major providers through a single OpenAI-compatible endpoint. The gateway handles budget controls, prompt enrichment, load balancing across multiple API keys, and automatic failover when a provider goes down. You stop managing provider-specific SDKs in your application code.

**MCP Gateway.** Connect LLMs to external tools and data sources via the Model Context Protocol. Supports stdio, HTTP, SSE, and Streamable HTTP transports. Includes tool federation (combining tools from multiple MCP servers), OpenAPI integration for converting REST APIs into MCP tools, and OAuth authentication for tool access. This is the most complete MCP gateway implementation available.

**A2A Gateway.** Enable secure agent-to-agent communication using Google's A2A protocol. Handles capability discovery, modality negotiation, and task collaboration between agents from different frameworks. If you're running multi-agent systems where agents from different teams or vendors need to cooperate, this is the infrastructure layer for that.

**Multi-Layered Guardrails.** Content filtering at the proxy level using regex patterns, OpenAI moderation API, AWS Bedrock Guardrails, Google Model Armor, and custom webhook-based guards. The key insight is that guardrails at the proxy layer catch everything — not just traffic from agents that remembered to include the guardrail code.

**Kubernetes Inference Routing.** Intelligent routing to self-hosted models using Kubernetes Inference Gateway extensions. Makes routing decisions based on GPU utilization, KV cache state, LoRA adapter availability, and queue depth. This is specifically useful for teams running their own model infrastructure alongside commercial API providers.

**Security and Observability Stack.** JWT authentication, API keys, OAuth support, fine-grained RBAC with a CEL (Common Expression Language) policy engine, rate limiting, TLS termination, and full OpenTelemetry integration with metrics, logs, and distributed tracing. The CEL policy engine is particularly powerful — you can write expressive policies without compiling custom code.

**Built-in Web UI.** A visual dashboard for configuring the gateway, monitoring traffic in real-time, and debugging agent interactions. Most proxy tools force you into YAML configuration files; having a UI for setup and observability lowers the barrier to entry significantly.

### Use Cases

- **Multi-provider LLM applications** — Teams that use OpenAI for some tasks, Anthropic for others, and self-hosted models for internal work can unify all traffic through a single gateway with automatic failover and cost tracking per provider.

- **MCP-based tool integrations** — If your agents need to access databases, file systems, web search, or custom APIs through MCP, the gateway handles tool federation, transport negotiation, and authentication centrally instead of per-agent.

- **Multi-agent systems** — Organizations running agents from different frameworks (LangChain, CrewAI, AutoGen, custom) that need to communicate securely. The A2A gateway provides the interoperability layer without requiring agents to share infrastructure.

- **Enterprise AI governance** — Compliance teams that need to audit all LLM traffic, enforce content policies, and track spending across teams and projects. The proxy-level guardrails and virtual key system provide centralized control.

- **Kubernetes-native AI infrastructure** — Platform teams that want to add AI agent networking to their existing Kubernetes stack using familiar Gateway API patterns instead of deploying separate AI infrastructure.

### Pros and Cons

Pros:
- Linux Foundation backing gives it institutional longevity that venture-backed competitors lack. The governance model with regular community meetings and published roadmaps reduces bus-factor risk.
- The protocol-native approach (MCP and A2A at the wire level) is architecturally superior to application-level integrations. You get protocol correctness and security enforcement for free.
- Kubernetes Gateway API support means it integrates with existing infrastructure tooling rather than requiring a separate operational stack.
- Apache 2.0 license with no open-core bait-and-switch. The full feature set is available without enterprise licenses.

Cons:
- Still in alpha/beta territory. The latest release is v1.3.0-alpha.1, and the project has 237 open issues. Production readiness is a real question for risk-averse teams.
- The A2A protocol itself is very new (announced by Google in 2025). If A2A doesn't gain widespread adoption, that gateway feature becomes dead weight.
- Rust-based deployment means the binary is fast but the contributor pool is smaller than Go or TypeScript alternatives. Customizing the gateway internals requires Rust expertise.
- The documentation is functional but not comprehensive. Getting started is easy, but advanced configuration (custom policies, Kubernetes CRDs, multi-cluster setups) requires digging into source code.

### Getting Started

```bash
# Quick start with Docker
docker run -p 8080:8080 agentgateway/agentgateway

# Or install from source (requires Rust toolchain)
git clone https://github.com/agentgateway/agentgateway.git
cd agentgateway
cargo build --release

# Run with default configuration
./target/release/agentgateway

# Access the web UI
open http://localhost:8080
```

Configure your first LLM provider through the web UI or create a config file:

```yaml
# config.yaml
providers:
  - name: openai
    type: openai
    api_key: ${OPENAI_API_KEY}
  - name: anthropic
    type: anthropic
    api_key: ${ANTHROPIC_API_KEY}

routes:
  - path: /v1/*
    backends:
      - provider: openai
        weight: 80
      - provider: anthropic
        weight: 20
```

Deploy to Kubernetes using the Helm chart:

```bash
helm repo add agentgateway https://agentgateway.dev/charts
helm install agentgateway agentgateway/agentgateway
```

### Alternatives

**LiteLLM** — The most popular LLM proxy, written in Python. LiteLLM handles provider unification and load balancing well but lacks MCP gateway, A2A support, and native Kubernetes integration. It's easier to get started with (Python, pip install) and has a larger community. Choose LiteLLM if you just need a simple provider proxy without agent infrastructure concerns.

**Bifrost** — A Go-based AI gateway focused on raw performance (claims 50x faster than LiteLLM). Bifrost has MCP client support and semantic caching, but its A2A story is weaker. It's more enterprise-focused with a commercial entity behind it. Choose Bifrost if throughput and latency are your primary concerns and you prefer Go over Rust.

**Kong Gateway** — The established API gateway that's adding AI-specific features (AI proxy plugins, LLM rate limiting). Kong has the operational maturity and plugin ecosystem that agentgateway lacks, but its AI features feel bolted-on rather than native. Choose Kong if you already run Kong for your API infrastructure and want to extend it to AI traffic.

### Verdict

Agentgateway is the most architecturally complete solution for AI agent networking that exists in open source today. The combination of LLM gateway, MCP gateway, and A2A gateway in a single Rust binary is unique — no other project covers all three layers. The Linux Foundation backing and active release cadence (five releases in May 2026 alone) suggest this project has legs.

That said, it's early. Alpha releases, 237 open issues, and a relatively small contributor base (compared to mature infrastructure projects) mean you should evaluate it carefully before putting it in front of production traffic. The smart play is to run it in staging or development environments now, understand the configuration model, and be ready when it hits stable. For teams building multi-agent systems on Kubernetes, this is the project to watch. For simpler single-LLM applications, LiteLLM remains the pragmatic choice today.
