---
name: crabtrap
description: "Open-source HTTP proxy by Brex that uses LLM-as-a-judge to secure AI agents in production. Static rules + AI policy evaluation with full audit trail."
url: https://github.com/brexhq/CrabTrap
stars: 673
forks: 51
language: Go
tags: ["security", "ai-agents", "proxy", "go", "llm"]
featured: false
publishedAt: 2026-06-18
---

## CrabTrap

### Overview

CrabTrap is an HTTP/HTTPS forward proxy built by Brex that sits between AI agents and external APIs, evaluating every outbound request against security policies before it reaches the internet. It's written in Go, ships as a Docker container, and uses a two-tier evaluation model: deterministic static rules checked first, then an LLM-based policy judge for anything the rules don't cover. Every request, decision, and response gets logged to PostgreSQL for a complete audit trail.

The project comes from Brex, the fintech company that handles corporate spending cards and expense management for startups and enterprises. That's a company that processes real money and has actual compliance requirements — not a weekend project from someone experimenting with LLM safety. When Brex builds a security tool for AI agents, it's because they hit the problem in production and needed a principled solution. The repo went public in April 2026 and has been steadily gaining traction since.

The core problem CrabTrap solves is one every engineering team running AI agents will eventually face: your agent needs to call external APIs — Slack, GitHub, Gmail, payment processors, databases — but you can't just let it send whatever it wants wherever it wants. A compromised prompt could exfiltrate data to an attacker's endpoint. A hallucinating agent could POST sensitive information to the wrong service. A prompt injection could trick your agent into making destructive API calls. CrabTrap intercepts all of that traffic and makes a real-time decision: allow, block, or escalate.

### Why it matters

The AI agent ecosystem has a blind spot. We spend enormous effort on prompt engineering, model selection, and tool integration, but the outbound traffic from agents is largely unmonitored. Your agent connects to 15 different APIs, stores credentials in environment variables, and makes HTTP requests that nobody inspects. If the agent gets compromised — through prompt injection, a malicious tool, or just a hallucination — there's nothing between it and the internet.

CrabTrap fills this gap using a mental model that infrastructure engineers already understand: a proxy with policies. It's the same pattern as a corporate web proxy or an API gateway, but tuned for the specific risks of AI agents. The static rules handle the obvious cases (block requests to known-bad domains, allow requests to approved API endpoints), while the LLM judge handles the nuanced ones (is this request consistent with the agent's stated purpose? does the payload contain data that shouldn't be leaving the network?).

The timing matters because AI agents are moving from personal experiments to production infrastructure. When your Claude Code instance pushes to GitHub on your laptop, the stakes are low. When your autonomous agent handles customer support, processes payments, or manages cloud infrastructure, you need guardrails that don't rely on the model "following instructions." CrabTrap provides those guardrails without requiring changes to the agent itself — it's a transparent proxy that works with any agent framework.

### Key Features

**Two-Tier Policy Evaluation.** CrabTrap checks deterministic static rules first — URL prefix, exact match, or glob patterns with optional HTTP method filters. If a rule matches, the decision is instant with no LLM call. Only unmatched requests hit the LLM judge. This keeps latency low for known-good traffic while catching novel or suspicious requests with AI analysis. Deny rules always take priority over allow rules.

**HTTPS Interception with Custom CA.** The proxy generates per-host TLS certificates from a custom Certificate Authority, allowing it to decrypt and inspect HTTPS traffic in transit. This is the same MITM technique used by corporate security tools, but applied specifically to agent traffic. The CA cert needs to be installed on the agent's environment, which is a one-time setup step.

**SSRF Protection.** CrabTrap blocks requests to private networks including RFC 1918 ranges, loopback, link-local, Carrier-Grade NAT, and IPv6 ULA/NAT64/6to4 addresses. It also includes DNS-rebinding prevention. This stops a compromised agent from pivoting to internal services — your database, your Redis cache, your internal admin panels.

**Per-Agent LLM Policies.** Each agent gets its own natural-language security policy evaluated by an LLM. The policy describes what the agent is allowed to do in plain English — "This agent manages GitHub issues and pull requests. It should not access payment APIs or send emails." The LLM judge evaluates each request against this policy and returns an allow/deny decision with a reason.

**Policy Builder.** CrabTrap includes an agentic loop that analyzes observed traffic and automatically drafts security policies. Point it at a day's worth of audit logs and it will propose rules that cover the patterns it sees. This is useful for bootstrapping policies in environments where you don't yet know what "normal" looks like.

**Audit Trail with Eval System.** Every request, decision, and response is recorded in PostgreSQL. The eval system lets you replay historical audit entries against a modified policy to measure accuracy before deploying changes. This is critical for compliance — you can prove that your security policies are working and demonstrate what would change if you update them.

**Circuit Breaker and Fallback.** After 5 consecutive LLM failures, the circuit trips and stops sending requests to the judge for 10 seconds. During the cooldown, you can configure the fallback behavior: deny all unmatched requests (safe default) or passthrough (less secure but avoids downtime). This prevents a down LLM provider from blocking all agent traffic or, worse, allowing everything through.

### Use Cases

- **Production AI agents with API access** — Any agent that calls external services (Slack, GitHub, payment APIs) through HTTP benefits from having CrabTrap as a checkpoint. It catches prompt injection attacks that try to exfiltrate data through outbound requests.
- **Compliance-heavy industries** — Finance, healthcare, and legal teams need audit trails for every external API call their agents make. CrabTrap's PostgreSQL logging provides exactly that, with the eval system for policy testing.
- **Multi-agent systems** — When you run multiple agents with different permission levels, CrabTrap's per-agent policies let you enforce granular access controls. Your customer support agent can hit the CRM API but not the deployment pipeline.
- **Development and staging environments** — Use CrabTrap during development to understand what your agents are actually sending to external services. The audit logs reveal traffic patterns you didn't know existed.

### Pros and Cons

Pros:
- Built by Brex with real production requirements — this isn't academic research, it's battle-tested security tooling from a company that processes financial transactions at scale.
- Two-tier evaluation keeps latency low for known traffic while catching edge cases with LLM analysis. Static rules handle 90%+ of requests without any model calls.
- The policy builder and eval system are genuinely useful for iterating on security rules. Most competing tools give you a config file and wish you luck.

Cons:
- HTTPS interception requires installing a custom CA certificate in every agent environment. This adds operational complexity and doesn't work with agents you don't control (managed services, third-party tools).
- The LLM judge adds latency and cost to every unmatched request. In high-throughput environments, the LLM evaluation can become a bottleneck or a significant line item.
- No human-in-the-loop approval mechanism. Decisions are fully automatic — there's no way to queue a suspicious request for manual review before allowing or blocking it.

### Getting Started

CrabTrap runs as a Docker container alongside PostgreSQL:

```bash
# Clone and start
git clone https://github.com/brexhq/CrabTrap.git
cd CrabTrap
docker compose up -d

# Copy the generated CA cert
docker compose cp crabtrap:/app/certs/ca.crt ./ca.crt

# Create an admin user
admin_token=$(docker compose exec -it crabtrap ./gateway create-admin-user admin | tail -n1 | cut -d" " -f2)

# Create an agent user
curl -X POST http://localhost:8081/admin/users \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer ${admin_token}" \
  -d '{"id": "my-agent", "is_admin": false}'

# Point your agent at the proxy
export HTTP_PROXY=http://localhost:8080
export HTTPS_PROXY=http://localhost:8080
export SSL_CERT_FILE=./ca.crt
```

The admin UI is available at `http://localhost:8081` where you can manage policies, view audit logs, and run the policy builder.

### Alternatives

**Cupcake (EQTYLab)** — A policy enforcement layer that uses OPA/Rego compiled to WebAssembly. Cupcake operates at the action level (file writes, git pushes, shell commands) rather than the HTTP level. Choose Cupcake when you need to control what agents do inside your codebase. Choose CrabTrap when you need to control what agents send to the internet.

**AWS WAF / Cloudflare WAF** — Traditional web application firewalls protect inbound traffic to your services. They don't inspect outbound requests from your agents. CrabTrap is specifically a forward proxy for agent-originated traffic, which is a different traffic direction entirely.

**Custom middleware in your agent framework** — You could build request filtering directly into your agent's code using LangChain callbacks or custom middleware. The tradeoff is that this couples security to your agent implementation. CrabTrap works with any agent framework because it's a transparent proxy — no code changes required.

### Verdict

CrabTrap is the most practical open-source solution I've seen for the "agents talking to the internet" problem. The two-tier approach — fast static rules first, LLM judge for the rest — is the right architecture for production systems where you need both speed and nuance. The fact that it comes from Brex, a company with real compliance obligations, gives it credibility that weekend projects lack. The policy builder is a killer feature for teams that don't know what "normal" agent traffic looks like yet. If you're running AI agents that make HTTP requests in any environment that matters, CrabTrap should be in your stack. It's not a complete security solution — it doesn't handle inbound traffic, response filtering, or human approval workflows — but for the specific problem of outbound agent traffic, it's the best tool available right now.
