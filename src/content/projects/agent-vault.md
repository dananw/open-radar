---
name: agent-vault
description: "Agent Vault is an open-source credential proxy by Infisical that prevents AI agents from leaking secrets — brokered access instead of direct credentials."
url: https://github.com/Infisical/agent-vault
stars: 1632
forks: 84
language: Go
tags: ["secrets-management", "ai-agents", "security", "go", "proxy"]
featured: false
publishedAt: 2026-06-10
---

## Agent Vault

### Overview

Agent Vault is an open-source HTTP credential proxy and vault built by Infisical, the company behind one of the most popular open-source secrets management platforms. It hit 1,600 GitHub stars within its first ten weeks, which tracks with the urgency of the problem it solves: AI agents are getting access to production credentials, and those credentials are getting leaked.

The project comes from the Infisical team — the same people who built the developer-first secrets management platform used by tens of thousands of companies. That pedigree matters here. This isn't a weekend security project; it's a purpose-built piece of infrastructure from a team that's been thinking about secrets management for years. Vlad Matsiiako, Infisical's CEO, has been vocal about the gap between how humans manage credentials and how AI agents should — Agent Vault is their answer.

The core problem is credential exfiltration. When you give an AI agent like Claude Code, Codex, or a custom harness direct access to API keys (Anthropic, GitHub, Stripe, whatever), you're trusting that agent to never leak them. But prompt injection attacks are real and documented. A malicious README, a crafted issue comment, or a poisoned dependency can trick an agent into sending your credentials to an attacker's server. Agent Vault eliminates this risk entirely: agents never see real credentials. They route HTTP requests through Agent Vault's MITM proxy, which substitutes dummy values with real ones on the way out.

### Why it matters

Every fullstack developer running AI coding agents in 2026 is dealing with this problem, whether they know it or not. You're setting `ANTHROPIC_API_KEY` and `GITHUB_PAT` as environment variables and hoping your agent doesn't get tricked into leaking them. That's a reasonable bet for local development, but it falls apart the moment you run agents remotely — on a VPS, in a CI pipeline, or inside an ephemeral sandbox.

The broader industry context is clear: AI agents are moving from novelty to production infrastructure. GitHub Copilot, Claude Code, Cursor, and dozens of custom agents are now part of the development workflow. Gartner estimates that by 2027, 40% of enterprise code will be generated or reviewed by AI agents. That means credential management for agents isn't a niche security concern — it's becoming a core infrastructure requirement.

Agent Vault is the first serious open-source attempt to solve this at the protocol level. Instead of relying on the agent to be careful with credentials (a losing bet), it removes credentials from the equation entirely. The agent gets a dummy key, routes requests through the proxy, and the proxy does the substitution. If the agent leaks the dummy key, it's useless to an attacker. That's a fundamentally different security model, and it's the right one for the agentic era.

### Key Features

**Credential Brokering.** Agent Vault sits between your AI agents and the APIs they call, substituting dummy credential values with real ones on outbound requests. You store your actual `ANTHROPIC_API_KEY`, `GITHUB_PAT`, and other secrets in the vault, then configure your agent to use placeholder values like `__anthropic_api_key__`. The proxy intercepts every request and swaps the placeholders for real credentials before forwarding. If an attacker tricks the agent into leaking the placeholder, they get nothing useful.

**Transparent Proxy Architecture.** Agent Vault uses a standard MITM HTTPS proxy on port 14322. Your agent just needs `HTTPS_PROXY` set — no SDK changes, no tool modifications, no special libraries. MCP tools, CLI tools, SDKs, and raw HTTP requests all work because the proxy operates at the network level. This means existing agent setups require minimal changes to adopt Agent Vault.

**Pluggable Credential Stores.** By default, Agent Vault encrypts and stores credentials locally. But you can back it with external systems like Infisical's cloud or self-hosted instance by setting `INFISICAL_URL` and creating vaults with `--credential-store=infisical`. This is critical for teams that already have secrets management infrastructure — you don't want a separate silo for agent credentials.

**Egress Filtering and Access Control.** You can define service rules that control which agents access which APIs. An agent running code reviews might only need access to GitHub and Anthropic; an agent handling deployments might need AWS and Stripe. Agent Vault enforces these boundaries at the proxy level. In strict mode (`unmatched_host_policy=deny`), any request to an unconfigured service returns a 403.

**Multi-Tenancy and Token Management.** Create separate agent identities with scoped tokens. For long-running agents, you create a persistent agent entry and get a durable token. For ephemeral sandboxes (Docker containers, Firecracker VMs, Daytona workspaces), you can mint short-lived, vault-scoped tokens that expire when the sandbox shuts down. The TypeScript SDK makes this programmatic — `buildProxyEnv()` generates the full environment variable set your sandbox needs.

**Request Logging and Audit Trail.** Every authenticated request flowing through Agent Vault gets logged. This gives you visibility into what your AI agents are actually doing — which APIs they're calling, how often, and with what parameters. For teams running multiple agents, this is the audit trail you need for compliance and debugging.

**Single Binary Deployment.** Agent Vault ships as a single Go binary that acts as both server and CLI client. Install it with a one-line curl script, run `agent-vault server -d`, and you're up. Docker deployment is equally straightforward. The management UI runs on port 14321 and walks you through initial setup.

### Use Cases

- **Remote AI coding agents** — Running Claude Code, Codex, or OpenCode on a VPS or cloud instance where you can't trust the environment. Agent Vault sits on a separate machine and brokers credentials, so even if the VPS is compromised, your API keys stay safe.

- **CI/CD pipelines with AI agents** — When your GitHub Actions or GitLab CI pipeline spins up an AI agent to review code, generate tests, or handle deployments, Agent Vault provides scoped, temporary credentials instead of exposing long-lived secrets to the pipeline environment.

- **Ephemeral sandbox environments** — Platforms like Daytona, E2B, and Firecracker spin up disposable containers for agent work. The TypeScript SDK lets your orchestrator mint short-lived tokens and inject proxy config automatically — the sandboxed agent calls APIs normally without ever seeing real credentials.

- **Multi-agent teams** — When you're running multiple specialized agents (one for code, one for docs, one for deployments), each gets its own scoped token with access only to the services it needs. No more sharing a single set of API keys across all agents.

- **Enterprise compliance requirements** — Organizations that need audit trails for API access can use Agent Vault's request logging to track every authenticated call made by every agent, satisfying SOC 2 and similar compliance frameworks.

### Pros and Cons

Pros:
- Solves a real, documented security problem (credential exfiltration via prompt injection) that every developer running AI agents faces today. The MITM proxy approach is architecturally sound — agents genuinely cannot leak credentials they never see.
- Built by Infisical, a team with deep secrets management expertise and a large existing user base. This isn't a side project; it's a strategic product from an established company.
- Minimal integration friction — works with any agent that supports HTTP proxy settings. No SDK lock-in, no framework-specific adapters. Set `HTTPS_PROXY` and you're done.

Cons:
- MITM proxy architecture means you need to install a custom CA certificate on agent machines. This adds operational complexity, especially in containerized environments where certificate management is already painful.
- The project is in preview status (explicitly stated in the README). The API is subject to change, and the enterprise features behind the `ee` directory aren't fully documented yet.
- Running Agent Vault on a separate host is a security best practice, but it adds infrastructure overhead. For solo developers running agents locally, the threat model might not justify the extra complexity.

### Getting Started

```bash
# Install Agent Vault (macOS and Linux)
curl --proto '=https' --proto-redir '=https' --tlsv1.2 -fsSL https://get.agent-vault.dev | sh

# Start the server with a master password
export AGENT_VAULT_MASTER_PASSWORD=your-secure-password
agent-vault server -d

# Or deploy with Docker
docker run -it -p 14321:14321 -p 14322:14322 \
  -e AGENT_VAULT_MASTER_PASSWORD=your-password \
  -v agent-vault-data:/data infisical/agent-vault
```

Open the management UI at `http://localhost:14321`, create your first vault and credentials, then run your agent through it:

```bash
# Run Claude Code through Agent Vault
agent-vault run -- claude

# Run any agent through a specific vault
agent-vault vault run -- codex
```

For programmatic integration with TypeScript:

```bash
npm install @infisical/agent-vault-sdk
```

```typescript
import { AgentVault, buildProxyEnv } from "@infisical/agent-vault-sdk";

const av = new AgentVault({
  token: "YOUR_AGENT_TOKEN",
  address: "http://localhost:14321",
});
const session = await av
  .vault("my-vault")
  .sessions.create({ vaultRole: "proxy" });

const env = buildProxyEnv(session.containerConfig!, "/etc/ssl/agent-vault-ca.pem");
// Pass `env` as environment variables to your sandbox
```

### Alternatives

**Infisical (direct)** — If you're already using Infisical for secrets management, you might wonder why you need Agent Vault separately. The difference is architectural: Infisical returns credentials to your application (or agent), which then uses them directly. Agent Vault never returns credentials — it brokers access at the proxy level. For human-operated applications, Infisical alone is fine. For AI agents, the proxy model is significantly safer.

**mitmproxy / Squid** — General-purpose MITM proxies can technically perform credential injection, but they require custom scripting and lack agent-specific features like token management, multi-tenancy, and the CLI ergonomics that make Agent Vault practical for coding agent workflows. If you're already running mitmproxy and want to add credential brokering, it's possible but not pleasant.

**Environment variable injection (no proxy)** — The simplest approach: just set API keys as environment variables and trust your agent. This works for local development and low-stakes scenarios, but it's fundamentally the model Agent Vault replaces. If your agent touches production systems or runs remotely, the risk of credential exfiltration through prompt injection makes this approach untenable.

### Verdict

Agent Vault is the right tool at the right time. As AI coding agents move from local experiments to production infrastructure, the naive "just set the env var" approach to credentials is a liability. Prompt injection is a real attack vector, and the only way to eliminate credential exfiltration is to ensure agents never hold credentials in the first place. That's exactly what Agent Vault does. The 1,600-star growth in ten weeks, combined with Infisical's track record, suggests this will become standard infrastructure for teams running AI agents. If you're running Claude Code, Codex, or any custom agent that touches production APIs, evaluate Agent Vault now — before a prompt injection attack evaluates your current setup for you.
