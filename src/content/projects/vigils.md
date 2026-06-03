---
name: vigils
description: "Vigils is a local-first control plane for AI agents — audit logs, secret redaction, sandboxed execution, and human-in-the-loop approvals. Rust + Tauri + Chrome MV3."
url: https://github.com/duncatzat/vigils
stars: 204
forks: 12
language: Rust
tags: ["ai-agents", "security", "rust", "tauri", "mcp", "local-first"]
featured: false
publishedAt: 2026-06-03
---

## Vigils

### Overview

Vigils is a local-first control plane for AI agents. It sits between your agents — Claude Code, Cursor, Zed, MCP clients, browser assistants — and the tools and data they touch. Every tool call gets firewalled, audited, and optionally paused for human approval. Your prompts, secrets, and audit trail never leave your machine. The project launched on May 31, 2026, and picked up over 200 GitHub stars in its first few days, which tracks with the growing anxiety around agent security.

The project is built in Rust as a workspace of 15 focused crates, with a Tauri 2 desktop app (Vue 3 frontend), a CLI MCP gateway, and a Chrome MV3 browser extension. It's Apache-2.0 licensed and runs on Windows, macOS, and Linux. The architecture is modular — audit, policy, firewall, redaction, sandboxing, and the MCP gateway are all independent crates that compose through the Hub binary.

The core problem Vigils solves is one developers are hitting right now: AI agents are getting powerful enough to read files, call APIs, write code, and execute commands on your behalf, but the security model is "trust the agent completely." That's fine when you're running a demo. It's not fine when your agent has access to production databases, API keys, and customer data. Vigils gives you a local checkpoint layer — see what happened, block what shouldn't, and keep credentials out of the conversation entirely.

### Why it matters

The AI agent ecosystem is exploding in mid-2026. Every major IDE ships with some form of agent mode. MCP (Model Context Protocol) is becoming the standard interface for tool use. But the security infrastructure hasn't kept pace. Most developers are running agents with full access to their environment, including secrets, and hoping nothing goes wrong. That's the same "run everything as root" mentality the industry spent two decades moving away from.

Vigils addresses this with a layered approach that feels familiar to anyone who's worked with network firewalls or API gateways. Default-deny policy engine. Tamper-evident audit logs. Secret redaction before data reaches the model. Sandboxed execution with Linux Landlock. It's the kind of infrastructure that should have existed before agents got this capable, but at least it exists now.

What's interesting is the local-first design choice. There are cloud-based agent monitoring platforms emerging, but Vigils bets that developers want their prompts, secrets, and audit trails on their own machines. Given how many companies are still figuring out their AI data governance policies, that bet seems sound. Your security tool shouldn't require you to send your secrets to someone else's server.

### Key Features

**Tamper-Evident Audit Ledger.** Every tool call, file access, and API request gets recorded in a SQLite database with SHA-256 hash chaining — each event links to the previous one, making tampering detectable. Full-text search via SQLite FTS5 lets you query the redacted trail. This isn't just logging; it's a cryptographic chain of custody for everything your agents do.

**Default-Deny Firewall.** Tool calls are gated by a Rust policy DSL with per-agent rules. Nothing runs unless a policy explicitly allows it. You can scope OAuth allow-lists for remote MCP servers. If you've ever used iptables or AWS security groups, the mental model translates directly — deny everything, then open only what you need.

**Human-in-the-Loop Approval.** Destructive or sensitive operations — file writes, network calls, database mutations — pause for review in an Approval Queue. Grants can be scoped to a single call or an entire session. The desktop app shows the full context of what the agent wants to do, so you're not approving blindly. This is the feature that makes agents actually safe to use in production-adjacent workflows.

**Secret and PII Redaction.** Before any text reaches a model, a log file, or the screen, the redaction engine strips credentials and personal data. It uses hard-fingerprint detection for 13+ credential classes (GitHub PATs, Stripe keys, Google/GitLab tokens, database URLs) plus an optional multilingual ML ensemble for PII. A fail-closed merge layer ensures that if detection is uncertain, the data gets masked. The Chrome extension applies the same redaction when you paste into ChatGPT, Claude, or Gemini.

**Secret Lease Broker.** Instead of giving an agent your full AWS credentials or API keys, Vigils creates short-lived credential leases injected only into the child process that needs them. Plaintext secrets are never persisted. When the process exits, the lease is revoked. This is least-privilege execution applied to AI agent workflows.

**Sandbox Runner.** Tool execution happens in Wasm (Wasmtime) or native processes with Linux Landlock LSM filesystem isolation and `env_clear` so child processes don't inherit your shell environment. The sandbox is fail-closed by default — if the isolation guarantee can't be enforced, Vigils refuses to run rather than silently degrading.

**MCP Gateway with Descriptor Pinning.** The Hub sits in front of MCP servers over both stdio and HTTP. It pins tool descriptors and detects drift — if a tool's definition changes between calls, you get an alert. Bare-command stdio upstreams (`npx`, `node`, `python`) resolve via host PATH before being handed to the sandbox. This lets you use any existing MCP server through Vigils without modification.

### Use Cases

- **Developers using Claude Code or Cursor with production access** — The approval queue pauses before the agent writes to your database or deploys to staging. You see exactly what it wants to do and approve or deny with full context.

- **Teams running multiple MCP servers** — Vigils acts as a unified gateway. All tool calls flow through one firewall with consistent policies, audit trails, and secret management. No more hoping each MCP server handles auth correctly.

- **Security-conscious developers pasting code into AI chatbots** — The Chrome MV3 extension redacts API keys, tokens, and PII before your text hits ChatGPT or Claude. Works on any AI site without requiring site-specific integrations.

- **Agent experimentation and debugging** — The Activity Feed and Session Replay let you see exactly what an agent did, in what order, with what inputs and outputs. Invaluable for debugging agent behavior without adding print statements.

- **Compliance and audit requirements** — If your organization needs to demonstrate what AI agents accessed and when, the tamper-evident ledger provides a verifiable record. The SHA-256 hash chain means you can prove the log hasn't been modified after the fact.

### Pros and Cons

Pros:

- Local-first architecture means your secrets and audit data stay on your machine. No cloud dependency, no third-party data processing agreements needed.
- The Rust implementation is fast and memory-efficient. The policy engine evaluates rules in microseconds, and the hash-chained audit ledger adds negligible overhead to tool calls.
- Modular crate architecture means you can use individual components (just the redaction engine, just the audit ledger) without pulling in the full stack.
- The Chrome extension works immediately with any AI chatbot site — no configuration needed for basic secret redaction.
- The security audit scored 9.9/10 with zero critical or high findings (OWASP + STRIDE + supply chain analysis, dated June 3, 2026).

Cons:

- Very new project — three days old as of this writing. The API surface is likely to change, and there's minimal community content or tutorials beyond the official docs.
- Linux Landlock sandboxing requires kernel 5.13+, which limits the sandbox runner on older Linux distributions. Wasm sandboxing works everywhere but constrains what tools can do.
- The policy DSL has a learning curve. Writing correct default-deny policies for complex agent workflows requires understanding both the agent's behavior and Vigils' rule evaluation order.
- No Kubernetes or container orchestration integration yet. If your agents run in containers, you're managing the security boundary yourself.

### Getting Started

```bash
# Download the latest release for your platform
# https://github.com/duncatzat/vigils/releases

# Or build from source (requires stable Rust + Node.js 20+)
git clone https://github.com/duncatzat/vigils.git
cd vigils
cargo build --release -p vigil-hub-cli --bin vigil-hub

# Run as an MCP gateway in front of your existing MCP servers
vigil-hub serve --stdio --upstreams ./upstreams.json

# upstreams.json example:
# {
#   "upstreams": [
#     {
#       "name": "filesystem",
#       "argv": ["npx", "-y", "@modelcontextprotocol/server-filesystem", "/data"]
#     }
#   ]
# }

# Inspect the audit ledger from the command line
vigil-hub inspect --db-path ./vigil.db activity --limit 20

# Launch the desktop app for the full GUI experience
cargo build --release -p vigil-desktop --features gui --bin gui
```

Point your AI agent at `vigil-hub` instead of the raw MCP server. Every tool call now flows through the firewall, gets audited, and can be paused for approval.

### Alternatives

**LLM Guard by Protect AI** — A Python-based toolkit focused on LLM input/output security: prompt injection detection, content filtering, and PII redaction. LLM Guard operates at the model interaction layer, while Vigils operates at the tool execution layer. Use LLM Guard if your primary concern is what goes into and out of the model. Use Vigils if your concern is what the model's agents do to your system.

**Prompt Armor** — A cloud-based platform for AI agent security monitoring and policy enforcement. It offers similar audit and policy features but runs as a SaaS service. Better fit for enterprises that want centralized visibility across teams. Vigils is the better choice if you need everything local and don't want your agent traffic flowing through a third party.

**MCP Inspector** — A developer tool for testing and debugging MCP servers. It shows tool schemas, lets you call tools manually, and displays responses. It's useful for development but doesn't provide runtime security, audit trails, or policy enforcement. Vigils is complementary — use MCP Inspector during development, Vigils in your actual workflow.

### Verdict

Vigils is exactly the kind of infrastructure tool the AI agent ecosystem needs right now. The gap between agent capability and agent security has been growing for months, and most developers have been ignoring it because nothing good existed to fill it. This fills it. The Rust implementation is fast and well-structured. The local-first design respects developer privacy. The layered security model (firewall + audit + redaction + sandbox + approval) covers the threat surface comprehensively.

The project is three days old, so there's risk in early adoption — the API will change, documentation will lag, and edge cases will surface. But the security audit score (9.9/10) and the architectural decisions (default-deny, fail-closed, hash-chained ledger) suggest this was built by people who take security seriously, not just checked boxes. If you're running AI agents with access to anything you care about — production systems, customer data, API keys — Vigils is worth installing today. The 200+ stars in 72 hours suggest the developer community agrees.
