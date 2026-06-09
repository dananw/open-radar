---
name: nvidia-openshell
description: "NVIDIA OpenShell is a sandboxed runtime for autonomous AI agents with declarative YAML policies, MicroVM isolation, and network-level security controls."
url: https://github.com/NVIDIA/OpenShell
stars: 6983
forks: 834
language: Rust
tags: ["ai-agents", "sandbox", "security", "rust", "nvidia"]
featured: false
publishedAt: 2026-06-10
---

## NVIDIA OpenShell

### Overview

NVIDIA OpenShell is a sandboxed runtime for autonomous AI agents. It hit nearly 7,000 GitHub stars in just four months since its February 2026 launch, with 834 forks and releases shipping almost daily — v0.0.59 dropped on June 9. That velocity, combined with the NVIDIA backing, makes it one of the fastest-growing AI infrastructure projects of 2026.

The project comes from NVIDIA's internal need to run AI coding agents safely. The team behind it includes Drew (247 commits), John Myers (149 commits), and Pim Lock (93 commits) — engineers who clearly eat their own cooking. The README is blunt about the status: "Alpha software — single-player mode." But the release cadence tells a different story. This is being developed with serious intent.

The core problem OpenShell solves is straightforward: AI agents like Claude Code, Codex, and OpenCode need to execute commands, read files, and make network requests. Running them on your host machine means a hallucinated `rm -rf` or a prompt injection attack can destroy your system. OpenShell wraps agent execution in MicroVM-backed sandboxes with declarative YAML policies that control exactly what the agent can access. Think of it as a firewall for your AI agent — not after the fact, but enforced at the infrastructure level before any command runs.

### Why it matters

The AI agent ecosystem is exploding. Every major coding assistant — Claude Code, GitHub Copilot, Cursor, OpenCode — now ships with terminal access and file system operations. The problem is that these agents run with the same permissions as your user account. A malicious prompt, a hallucinated command, or a compromised MCP server can exfiltrate your SSH keys, delete your `.env` files, or tunnel data to an external server.

This isn't theoretical. Prompt injection attacks against coding agents have been documented in academic papers since 2024, and the OWASP Top 10 for LLM Applications explicitly calls out "excessive agency" as a critical risk. OpenShell addresses this head-on with a layered security model: MicroVM isolation for the process, network proxy for outbound traffic, and YAML policies for fine-grained access control.

For fullstack developers, this is especially relevant. You're running agents that touch your database credentials, your API keys, your deployment tokens. A single compromised agent session can cascade across your entire stack. OpenShell gives you a way to contain that blast radius without giving up the productivity gains of autonomous coding agents.

### Key Features

**MicroVM-Backed Sandboxing.** Each agent session runs inside a lightweight virtual machine, not just a container. This provides hardware-level isolation between the agent and your host system. The sandbox includes Python 3.14, Node.js 22, git, and common developer tools out of the box. Even if the agent executes a malicious command, it can't escape the VM boundary to access your host filesystem or credentials.

**Declarative YAML Policies.** Network access, file system mounts, and environment variables are governed by YAML policy files. You define what the agent can reach — specific API endpoints, particular directories, certain environment variables — and the runtime enforces it without the agent knowing. This is the same "policy as code" model that made Kubernetes RBAC successful, applied to AI agent security.

**HTTP Method and Path-Level Network Controls.** The built-in proxy doesn't just allow or deny domains. It inspects HTTP methods and URL paths. You can let an agent read from the GitHub API (`GET /repos/*`) while blocking write operations (`POST`, `PUT`, `DELETE`). This granularity is critical for agents that interact with multiple APIs during a single session.

**Agent-First Design with Built-In Skills.** OpenShell ships with agent skills for gateway troubleshooting, policy generation, and environment setup. The CLI supports `openshell sandbox create -- claude` (or `-- opencode`, `-- codex`, `-- copilot`) to spin up a pre-configured environment for your agent of choice. The project expects contributors to use these skills, not just build them.

**One-Command Installation.** Getting started takes a single curl command. No Docker Compose files, no configuration wizard. The binary installer handles everything, and the sandbox image pulls automatically on first use. For teams, there's also a Helm chart for Kubernetes deployment, though that path is still marked experimental.

**Policy Enforcement Without Restart.** You can modify YAML policies while a sandbox is running. The proxy picks up changes immediately, so you can tighten or relax permissions based on what the agent is doing in real time. This is useful for progressive trust — start restrictive, open up as the agent demonstrates good behavior.

### Use Cases

- **Running Claude Code or Codex on production codebases** — Keep the agent away from `.env` files, deployment keys, and database credentials while letting it read and modify source code freely.
- **AI-powered code review in CI/CD pipelines** — Spin up ephemeral sandboxes for agent-based PR reviews that can read the diff but can't access secrets or make outbound requests to unapproved endpoints.
- **Multi-agent orchestration** — Run multiple agents in isolated sandboxes with different permission levels. The planning agent gets read-only access to the full codebase; the implementation agent gets write access to specific directories.
- **Teaching and experimentation** — Let junior developers or students use AI coding agents without worrying about accidental damage to shared development environments or cloud infrastructure.
- **Enterprise compliance** — Satisfy SOC 2 and ISO 27001 requirements around access controls by demonstrating that AI agent sessions are sandboxed with auditable policy enforcement.

### Pros and Cons

Pros:
- NVIDIA backing means this isn't going to disappear. The company has strategic interest in safe AI agent infrastructure, and the Apache 2.0 license ensures community continuity.
- The YAML policy model is familiar to anyone who's worked with Kubernetes, Docker Compose, or Terraform. No new mental model to learn.
- Hardware-level MicroVM isolation is fundamentally stronger than container-based approaches. Containers share a kernel; MicroVMs don't.
- Active development with 59 releases in four months and daily commits. The team is responsive to issues and ships fixes fast.

Cons:
- Alpha status means the API surface is unstable. Policies that work today might need rewriting after the next release. Don't build critical infrastructure on it yet.
- The "single-player mode" limitation means it's currently designed for individual developer machines, not team or CI/CD environments. Multi-tenant support is on the roadmap but not here yet.
- MicroVM overhead adds startup latency compared to running agents directly on the host. On lower-end machines, this can be noticeable — expect 2-5 seconds per sandbox creation.
- The project is Rust-based but installs as a binary. If you need to customize the runtime itself, you're building from source with a Rust toolchain, which raises the contribution barrier.

### Getting Started

```bash
# Install OpenShell (recommended)
curl -LsSf https://raw.githubusercontent.com/NVIDIA/OpenShell/main/install.sh | sh

# Or install from PyPI (requires uv)
uv tool install -U openshell

# Create a sandbox for Claude Code
openshell sandbox create -- claude

# Create a sandbox for OpenAI Codex
openshell sandbox create -- codex

# Create a sandbox with a custom policy
openshell sandbox create --policy my-policy.yaml

# List running sandboxes
openshell sandbox list

# Apply a network policy
openshell policy set --allow "GET https://api.github.com/repos/*"
```

Deploy to Kubernetes (experimental):

```bash
helm install openshell oci://ghcr.io/nvidia/openshell/helm-chart
```

### Alternatives

**Daytona** — A development environment manager that creates isolated workspaces for developers and AI agents. Daytona focuses on full development environment provisioning (IDE, dependencies, runtime) rather than security sandboxing. Choose Daytona if you need reproducible dev environments; choose OpenShell if your primary concern is preventing agent-caused damage.

**E2B (Code Interpreter SDK)** — Cloud-hosted sandboxes for running AI-generated code. E2B is a SaaS product with per-session pricing, making it simpler to adopt but introducing vendor lock-in and latency. OpenShell runs locally or in your own infrastructure, giving you full control over data residency and cost.

**Modal** — A serverless platform that can run AI agent code in sandboxed containers. Modal handles scaling and infrastructure but requires you to write code against its SDK. OpenShell is agent-agnostic — it works with any coding agent through a simple CLI interface without requiring code changes.

### Verdict

OpenShell is the most practical answer to the question "how do I run AI agents safely" that I've seen from a major tech company. The MicroVM approach is technically superior to container-based sandboxing, the YAML policy model is immediately legible to anyone with DevOps experience, and the NVIDIA backing provides confidence that this won't be abandoned in six months. It's alpha software with real rough edges — the single-player limitation, the unstable API, the startup latency — but the trajectory is clear. If you're running Claude Code, Codex, or any autonomous coding agent against a codebase you care about, OpenShell deserves a slot in your toolchain today. The 7K stars and 834 forks in four months suggest the developer community agrees.
