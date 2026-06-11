---
name: clawpatrol
description: "Claw Patrol is a Go-based security firewall for AI agents from the Deno team — parse agent traffic at the wire, gate actions with HCL rules before they reach production."
url: https://github.com/denoland/clawpatrol
stars: 753
forks: 31
language: Go
tags: ["ai-security", "agents", "go", "firewall", "devops"]
featured: false
publishedAt: 2026-06-12
---

## Claw Patrol

### Overview

Claw Patrol is a security firewall for AI agents, built by the Deno team and written in Go. It sits between your coding agents and production infrastructure, intercepting traffic at the wire protocol level and gating every action against rules you define in HCL. Think of it as a WAF, but for AI agents instead of web requests.

The project launched on April 28, 2026, and has climbed to 753 GitHub stars in roughly six weeks. That's notable growth for a DevOps security tool — most agent security projects barely crack a hundred stars in their first month. The Deno pedigree helps. The team behind Deno, the JavaScript runtime that bet on security-first design years before it was fashionable, now applying the same philosophy to the agent problem.

The core problem is real and getting worse by the week. AI coding agents — Claude Code, Codex, Cursor, Goose, and dozens of others — now have direct access to databases, Kubernetes clusters, CI pipelines, and production systems. A single hallucinated `kubectl delete` or a badly-scoped SQL `DELETE FROM` can cause real damage. Existing solutions are either too coarse (network firewalls that can't distinguish agent traffic from human traffic) or too fine-grained (manual approval for every single action, which kills agent velocity). Claw Patrol tries to find the middle ground: protocol-aware filtering with declarative rules.

### Why it matters

We're in the middle of a fundamental shift in how software gets built. AI agents are no longer just suggesting code in your editor — they're running database migrations, deploying to production, managing infrastructure, and interacting with live systems. The 2025 Stack Overflow developer survey showed that 72% of developers using AI tools reported at least one incident where an agent performed an unintended action in a production environment. That number is only going up as agents get more capable and more autonomous.

The security tooling hasn't kept pace. Traditional firewalls and API gateways don't understand agent context — they see HTTP requests, not the intent behind them. Role-based access control helps, but it's too static for agents whose permissions should shift based on what they're actually trying to do. Claw Patrol fills this gap with a purpose-built proxy that understands the protocols agents use (Postgres wire protocol, Kubernetes API, HTTP) and can make decisions based on the semantic content of those requests.

What makes this particularly interesting is the team behind it. Deno has been thinking about security boundaries since day one — their runtime requires explicit permissions for file access, network access, and environment variables. Claw Patrol applies that same mental model to the broader agent ecosystem. You don't trust the agent by default. You write explicit rules about what it can and cannot do, and the proxy enforces them at the infrastructure level.

### Key Features

**Protocol-Level Traffic Parsing.** Claw Patrol doesn't just look at HTTP headers. It understands the wire protocols for PostgreSQL, ClickHouse, Kubernetes, and generic HTTP. For SQL databases, it extracts the verb (SELECT, INSERT, DELETE, DROP) and the target tables. For Kubernetes, it reads the resource type, verb, and namespace. This means you can write rules like "block any agent from running DROP TABLE" without needing to modify the agent itself.

**HCL-Based Declarative Rules.** Rules are written in HashiCorp Configuration Language, the same format used by Terraform and Nomad. Each rule specifies an endpoint, a CEL (Common Expression Language) condition evaluated against the parsed wire facts, and a verdict (allow, deny, or pause for human approval). The HCL format is readable by anyone who's done infrastructure-as-code, and the CEL expressions give you enough expressiveness to write precise policies without a custom DSL.

**Human-in-the-Loop Approval.** When a rule's verdict is "pause," the request is held until a human approves or rejects it. This is critical for high-risk operations — imagine an agent trying to delete a Kubernetes pod or truncate a database table. Instead of silently blocking (which breaks the agent's workflow) or silently allowing (which risks production), Claw Patrol gates the action and sends a notification. The agent waits, the human decides.

**Three Deployment Modes.** You can run Claw Patrol as a standalone gateway proxy, join an existing gateway via WireGuard tunnel from any host, or wrap a single agent's process tree with `clawpatrol run`. That last mode is particularly clever — it opens a per-process network namespace on Linux (or NetworkExtension on macOS) so only the wrapped command's traffic goes through the gateway. No system-wide configuration needed.

**Tailscale and WireGuard Integration.** The gateway accepts clients tunneling in via WireGuard or Tailscale, which means you can deploy it across distributed infrastructure without complex networking setup. Your agent running on a CI server in one cloud can route through a Claw Patrol gateway in another, with encrypted tunnels in between.

**Zero-Trust Agent Networking.** The default posture is deny. If a request doesn't match any rule, it's blocked. This inverts the typical agent networking model where agents have broad network access and you hope nothing goes wrong. With Claw Patrol, agents can only reach the specific endpoints and perform the specific operations you've explicitly allowed.

### Use Cases

- **Coding agents with database access** — Prevent an AI agent from running destructive SQL operations like DROP, DELETE without WHERE clauses, or TRUNCATE on production databases while still allowing SELECT and safe INSERT/UPDATE operations.
- **Kubernetes-managed deployments** — Gate an agent's kubectl commands so it can read pod status and logs but cannot delete pods, modify secrets, or change cluster-wide configurations without human approval.
- **Multi-agent CI/CD pipelines** — When multiple agents collaborate on a deployment pipeline, Claw Patrol ensures each agent can only interact with the infrastructure segments it's authorized for, preventing lateral movement.
- **Compliance and audit trails** — Every request that passes through the gateway is logged with the agent's action, the matched rule, and the verdict. This creates an audit trail for SOC 2 and similar compliance frameworks that need to demonstrate control over automated access.
- **Gradual agent autonomy** — Start with all rules set to "pause" for human approval, then progressively relax to "allow" as you build confidence in an agent's behavior on specific operations.

### Pros and Cons

Pros:
- Protocol-aware parsing means rules are semantically meaningful, not just network-level allowlists. You can distinguish between a SELECT and a DELETE on the same database connection.
- The Deno team has a proven track record of building security-first developer tools. They've been thinking about permission models since 2018.
- HCL + CEL is a battle-tested configuration stack. Infrastructure teams already know these formats, reducing the learning curve.
- The per-process tunneling mode (`clawpatrol run`) is elegant — you can protect a single agent without touching system-wide networking.

Cons:
- 79 open issues as of mid-June 2026 suggest the API surface is still maturing. Expect breaking changes to the config format in the coming months.
- Protocol support is currently limited to Postgres, ClickHouse, Kubernetes, and HTTP. If your agent interacts with Redis, MongoDB, or custom TCP services, you're out of luck for now.
- The human-in-the-loop approval workflow requires a notification and response mechanism that isn't fully built out yet. For now, it's more of a "request pauses and waits" model than a polished approval dashboard.

### Getting Started

```bash
# Install Claw Patrol
curl -fsSL https://clawpatrol.dev/install.sh | sh

# Create a basic config file
cat > config.hcl << 'EOF'
endpoint "k8s-prod" {
  type = "kubernetes"
  addr = "https://kubernetes.default.svc"
}

rule "k8s-no-secrets" {
  endpoint  = k8s-prod
  condition = "k8s.resource == 'secrets'"
  verdict   = "deny"
  reason    = "Secret values must not leave the cluster via the agent"
}

rule "k8s-no-delete" {
  endpoint  = k8s-prod
  condition = "k8s.verb == 'delete'"
  verdict   = "pause"
  reason    = "All deletes require human approval"
}
EOF

# Run the gateway
clawpatrol gateway config.hcl

# Wrap an agent process
clawpatrol run claude
```

### Alternatives

**AgentGateway** — A Linux Foundation project focused on agent-to-LLM and agent-to-tool communication with MCP and A2A protocol support. AgentGateway operates at the application protocol level (MCP messages, tool calls) rather than the wire protocol level. Choose AgentGateway when you need to route and secure agent communication patterns; choose Claw Patrol when you need to gate raw infrastructure access at the network layer.

**Cedar (AWS)** — AWS's open-source policy language for authorization. Cedar is a general-purpose authorization engine that can be embedded into applications. It's more mature and has a formal verification framework, but it requires you to build the integration layer yourself. Claw Patrol gives you a ready-made proxy that understands specific wire protocols out of the box. Choose Cedar when you need fine-grained authorization in your own application code; choose Claw Patrol when you need to intercept and filter agent traffic to existing infrastructure.

**OPA/Rego (Open Policy Agent)** — The industry-standard policy engine, also from the HashiCorp ecosystem. OPA can evaluate policies against any JSON-structured input, and it's widely used in Kubernetes admission controllers. The difference is that OPA requires you to feed it structured data — it doesn't parse wire protocols itself. Claw Patrol handles the parsing layer and feeds the extracted facts into CEL expressions. Choose OPA when you already have a policy infrastructure and want to extend it; choose Claw Patrol when you need a turnkey solution for agent traffic filtering.

### Verdict

Claw Patrol is the most practical answer I've seen to the question "how do I let AI agents touch production without losing sleep?" The protocol-aware parsing is the killer feature — being able to write a rule that blocks `DELETE FROM users` but allows `SELECT FROM users` on the same database connection, without modifying the agent or the database, is exactly what's needed right now. The Deno team's security-first DNA shows in every design decision, from the zero-trust default posture to the per-process tunneling mode. At 753 stars and six weeks old, it's early days, and the 79 open issues confirm the API is still settling. But if you're running AI agents against production infrastructure today — and let's be honest, most teams doing serious agent work are — Claw Patrol deserves a spot in your stack. The HCL configuration will feel familiar to anyone who's done Terraform work, and the three deployment modes mean you can start small (wrapping a single agent process) and scale up to a full gateway as your agent fleet grows.
