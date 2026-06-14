---
name: ongrid
description: "Ongrid is an open-source AI ops agent built in Go that correlates metrics, logs, and traces to find root causes — then fixes issues from Slack or Telegram."
url: https://github.com/ongridio/ongrid
stars: 237
forks: 59
language: Go
tags: ["ai-ops", "devops", "observability", "go", "incident-response"]
featured: false
publishedAt: 2026-06-15
---

## Ongrid

### Overview

Ongrid is an open-source AI ops agent that lives in your Slack or Telegram channel and actually understands your infrastructure. Point it at an alert and it correlates metrics, logs, and traces across your topology, identifies the blast radius, pins the root cause to a specific source-code line, and — if you let it — executes the fix. It's built in Go with a React frontend and ships with Prometheus, Loki, Tempo, and Grafana pre-wired.

The project appeared on GitHub in late May 2026 and crossed 230 stars within three weeks. That's not explosive growth, but the trajectory matters more than the absolute number here. The ops AI space is crowded with demos and prototypes; Ongrid is one of the few that ships as a deployable product with a real install script, real integrations, and a real security model. It runs on Ubuntu 22.04+, Debian 12+, and RHEL/Rocky 9, with ARM64 support from day one.

The architecture is coordinator-plus-specialists. A top-level coordinator agent receives the investigation request, then dispatches to domain-specific sub-agents — SRE, network, database — depending on what the signal looks like. Each sub-agent has access to read-only host tools (26+ inspection commands in a sandboxed bash environment), and every tool call is audited. The agent never opens inbound ports to your hosts; the edge component dials out, so there's no SSH port 22 or HTTP port 80 exposed. That's a meaningful security improvement over the "just give the AI agent SSH access" approach some teams are taking.

### Why it matters

The AIOps market has been promising "self-healing infrastructure" for years, but most solutions either require you to buy into a proprietary observability stack or they're thin wrappers around ChatGPT that hallucinate root causes. Ongrid takes a different approach: it meets you where you already are. If your team runs Prometheus and Grafana for metrics, Loki for logs, and Tempo for traces, Ongrid plugs into all of it without replacing anything. The AI agent writes the PromQL queries, walks the topology graph, and correlates signals across all three pillars — something that normally takes an experienced SRE 20-40 minutes during an incident.

For fullstack developers who also handle ops (which is most teams in 2026), the value proposition is concrete. Your NestJS backend throws a 500 error spike at 2 AM. Instead of waking up, SSH-ing in, tailing logs, checking dashboards, and cross-referencing traces, you get a Slack message that says "Database connection pool exhausted on node-3 due to a long-running query from the analytics endpoint, introduced in commit abc123. Recommended action: kill query PID 4821 and increase pool size from 10 to 25." That's not a demo — that's the actual workflow the coordinator agent is designed to execute.

The "bring your own model" design is also worth noting. Ongrid supports Anthropic Claude, OpenAI GPT, Google Gemini, DeepSeek, Zhipu GLM, and Moonshot Kimi, with hot-routing between them. If one provider goes down during an incident (which is exactly when you need your ops agent most), it falls back to the next. That kind of resilience thinking signals a project built by people who've actually been paged at 3 AM.

### Key Features

**Coordinator + Specialist Agent Architecture.** The top-level coordinator doesn't try to do everything itself. It classifies the incoming signal — is this a database issue, a network problem, an application error? — and dispatches to the right specialist sub-agent. Each specialist has tailored tools and context. The SRE agent knows how to walk Kubernetes topology; the DB agent knows how to inspect query plans. This is closer to how real incident response teams work than a single monolithic AI agent.

**Alert-Driven Auto-Investigation.** When an alert fires from Prometheus, Grafana, or any webhook source, Ongrid can automatically spawn an investigation. The investigator agent runs RCA (root cause analysis), correlates metrics/logs/traces, determines blast radius through topology walking, and writes the findings back to the alerting channel. No human needs to initiate anything. This turns your alerting system from a notification mechanism into an active diagnostic tool.

**Zero Inbound Port Architecture.** The edge agent on each host dials out to the Ongrid server — never the other way around. No SSH port 22, no HTTP port 80 or 443 needs to be open on your production hosts. For teams running behind strict firewalls or in regulated environments, this eliminates an entire class of attack surface. The agent also runs host inspection tools in a read-only bash sandbox, and every command execution is logged for audit trails.

**Built-In Full Observability Stack.** Ongrid ships with Prometheus, Loki, Tempo, and Grafana pre-configured and wired together. The agent itself writes the queries — you don't need to teach it PromQL or LogQL. For teams that don't already have observability infrastructure, this is a turnkey solution. For teams that do, it plugs into existing deployments without conflict.

**Browser-Based SSH with Reverse Tunnels.** Need to get a shell on a host during an investigation? Ongrid provides browser-based SSH through reverse tunnels — no keys to manage, no jumpbox to configure, no bastion host to maintain. Every session is audited and can be reviewed later. This is particularly useful for teams that have strict SSH key management policies or need to provide temporary access to contractors.

**Multi-Model LLM Support with Failover.** The agent supports six LLM providers out of the box — Anthropic, OpenAI, Google, DeepSeek, Zhipu, and Moonshot — with hot-routing between them. If your primary model provider hits rate limits or goes down (and they do, especially during peak hours), the agent transparently fails over to the next provider. You can also route different agent types to different models based on cost and capability trade-offs.

**RAG Knowledge and Code Search.** Ongrid indexes your codebase and operational documentation so the agent can reference actual source code when diagnosing issues. When it says "introduced in commit abc123," it's not guessing — it searched your Git history and correlated the deployment timeline with the metric anomaly. This closes the gap between "something is broken" and "here's exactly what changed."

### Use Cases

- **Production incident response for small teams** — A 3-person startup running a NestJS API on a VPS doesn't have a dedicated SRE. Ongrid acts as the always-on ops teammate, investigating alerts and presenting actionable findings in Slack before the on-call engineer even opens their laptop.

- **Infrastructure monitoring for Go backend services** — Teams building microservices in Go can deploy Ongrid to automatically correlate errors across service boundaries. The topology-aware RCA walks the dependency graph and identifies which downstream service is the actual root cause.

- **DevOps automation for Django/NestJS deployments** — When a Django deployment introduces a slow database migration that causes connection pool exhaustion three hours later, Ongrid correlates the deployment event with the metric degradation and points directly at the offending migration.

- **Compliance and audit requirements** — The audited tool execution model means every command the agent runs on production hosts is logged with timestamps, inputs, and outputs. For SOC 2 or ISO 27001 environments, this provides the evidence trail that "the AI looked at the server" requires.

- **Multi-cloud infrastructure management** — Ongrid's edge agent model works across any infrastructure — bare metal, AWS, GCP, Azure, or hybrid — because it dials out rather than requiring inbound access. Deploy the edge component wherever you have hosts and it all connects back to the central coordinator.

### Pros and Cons

Pros:
- Plugs into existing Prometheus/Grafana/Loki/Tempo stacks without replacing them. No vendor lock-in, no rip-and-replace of your current observability investment.
- The zero-inbound-port architecture is a genuine security improvement over SSH-based remote access patterns. Every tool call is sandboxed and audited.
- Multi-model failover means the agent stays operational even when a specific LLM provider has issues. This is critical for a tool that's supposed to help during incidents — the one time you absolutely need it to work.
- Apache 2.0 license with active development. The project has 11 open issues and is releasing frequently (v0.8.5 as of mid-June 2026).

Cons:
- At 237 stars, the community is still small. You won't find extensive Stack Overflow answers or third-party tutorials. The documentation is functional but not comprehensive.
- The built-in observability stack (Prometheus + Loki + Tempo + Grafana) is opinionated. If you use Datadog, New Relic, or Elastic, you'll need to build integrations yourself or wait for community contributions.
- The coordinator agent's routing logic is a black box. When it dispatches to the wrong specialist sub-agent, there's no easy way to see why it made that classification or how to correct it.
- Requires a dedicated server or VM to run the Ongrid stack. This isn't a lightweight sidecar — it's a full platform with its own database, message queue, and observability components.

### Getting Started

```bash
# Download the latest release (AMD64)
wget https://github.com/ongridio/ongrid/releases/download/v0.8.5/ongrid-v0.8.5-linux-amd64.tar.xz
tar -xf ongrid-v0.8.5-linux-amd64.tar.xz && cd ongrid-v0.8.5-linux-amd64

# Run the installer — sets up the full stack (Go backend, React UI, Prometheus, Loki, Tempo, Grafana)
sudo ./install.sh

# For ARM64 servers
wget https://github.com/ongridio/ongrid/releases/download/v0.8.5/ongrid-v0.8.5-linux-arm64.tar.xz
tar -xf ongrid-v0.8.5-linux-arm64.tar.xz && cd ongrid-v0.8.5-linux-arm64
sudo ./install.sh
```

After installation, configure your LLM provider API keys and connect your Slack or Telegram workspace. The agent starts investigating alerts automatically once the integration is connected.

### Alternatives

**PagerDuty + AI Assistant** — PagerDuty's AI features are more mature and come with a polished enterprise experience, but they're proprietary, expensive (starts at $21/user/month for the professional tier), and locked to PagerDuty's alerting ecosystem. Ongrid is the better choice if you want open-source, self-hosted, and model-agnostic AI ops without per-seat licensing.

**Spike.sh + ChatGPT integration** — A lighter-weight incident management tool that some teams pair with ChatGPT for root cause analysis. The manual integration means you're pasting log snippets into ChatGPT during incidents, which is better than nothing but far from the automated correlation and execution that Ongrid provides. Choose Spike.sh if you want simplicity; choose Ongrid if you want automation.

**Shoreline.io** — Shoreline's incident automation platform is the closest commercial analog to Ongrid's approach, with its own agent-based architecture and remediation workflows. It's more feature-complete but comes with enterprise pricing and requires buying into Shoreline's ecosystem. Ongrid is the right pick for teams that want the same architectural pattern under an Apache 2.0 license.

### Verdict

Ongrid is the most practical open-source AIOps tool I've seen that actually ships as a product rather than a proof of concept. The coordinator-plus-specialists architecture mirrors how real incident response works, the zero-inbound-port model is a genuine security win, and the multi-model failover shows engineering maturity that most AI agent projects lack. At 237 stars three weeks after launch, it hasn't broken out yet — but the design decisions are right, and the team is shipping fast. If you're a fullstack developer who also handles ops and you're tired of getting paged at 2 AM to manually grep through logs, Ongrid is worth deploying on a staging environment today. The risk is low (Apache 2.0, self-hosted, no vendor lock-in) and the potential time savings during incidents are significant.
