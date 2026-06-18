---
name: kontext-cli
description: "Kontext CLI is a Go-based runtime security platform for AI agents — scoped credentials, policy enforcement, and audit trails for coding agents."
url: https://github.com/kontext-security/kontext-cli
stars: 205
forks: 7
language: Go
tags: ["ai-security", "go", "agent-orchestration", "developer-tools", "mcp"]
featured: false
publishedAt: 2026-06-18
---

## Kontext CLI

### Overview

Kontext CLI is an open-source authorization platform for AI coding agents, written in Go. It sits between you and your agent — Claude Code today, with Goose, Codex, and Cursor adapters planned — and enforces what the agent can actually do. Scoped credentials, deterministic policy rules, a local LLM risk judge, and full audit trails. The project launched in April 2026 and has been shipping aggressively since, with 157 commits from a small core team of three developers.

The lead maintainer is Michel Osswald, who previously worked on security infrastructure at scale. The team is small but focused — three human contributors plus bots handling dependency updates and releases. That's a tight ship for a project handling authorization at the agent-tool boundary, which is arguably the most important unsolved problem in the AI coding agent space right now.

Here's the problem Kontext solves: when you give Claude Code or Cursor access to your codebase, you're giving an LLM-powered system the ability to read files, execute commands, call APIs, and modify your repository. Most developers configure this with a single "yes, trust the agent" toggle. Kontext replaces that toggle with a runtime security layer that classifies every tool call, applies policy, and can block dangerous actions before they execute. According to their documentation, the local decision path goes from agent tool call through a Unix socket to action classification, deterministic policy, probabilistic risk scoring, and then an allow/deny decision — all without sending data to external services.

### Why it matters

The AI coding agent ecosystem has a security gap that most developers are ignoring. Claude Code, Codex, Cursor, and similar tools can execute arbitrary shell commands, modify production configs, and access secrets — all triggered by natural language prompts that may contain subtle injection attacks. A recent analysis byInvariant Labs showed that prompt injection in agentic coding workflows can lead to data exfiltration and unauthorized code changes, and the attack surface grows with every new tool an agent can access.

Kontext is the first serious open-source attempt to solve this at the infrastructure level rather than the prompt level. Instead of hoping your system prompt is robust enough to prevent the agent from running `rm -rf /`, you enforce it with deterministic policy. Instead of trusting that the agent won't exfiltrate your `.env` file, you inject scoped, short-lived credentials that are bound to the current session. This is the kind of security thinking that the web development community adopted years ago with Content Security Policy and OAuth scopes — now applied to AI agents.

For fullstack developers using AI coding tools daily, this matters because the risk isn't theoretical. Every time you let Claude Code modify your NestJS backend or React frontend, you're trusting that the agent won't accidentally (or adversarially) delete database migrations, expose API keys in commits, or run destructive commands on your development machine. Kontext gives you a safety net that's independent of the agent's own judgment.

### Key Features

**Deterministic Policy Engine.** You define allow and deny rules that are evaluated before any tool call executes. Hard policies cover known boundaries — destructive shell commands, production resource access, sensitive file patterns, credential exposure, and data exports. The policy language is designed for real-world use, not academic formal verification. Think of it as Content Security Policy for your AI agent's tool access.

**Probabilistic Risk Detection.** Actions that pass deterministic policy get routed through a local LLM judge for an additional risk assessment. This runs entirely on your machine using llama.cpp with a managed GGUF model — no data leaves your system. The judge evaluates whether a tool call looks suspicious given the conversation context and decides to allow or deny. It's a second layer of defense that catches edge cases your static rules miss.

**Scoped Credential Injection.** Instead of pasting your GitHub token or API keys into agent config files, Kontext uses RFC 8693-compliant OAuth 2.0 Token Exchange to inject short-lived, least-privilege credentials at runtime. Your `.env.kontext` file contains placeholders like `{{kont...ub}}` that Kontext resolves to real tokens for the current session. Credentials are bound to the user, session, and workflow — if the agent tries to use them outside the authorized scope, the request fails.

**Full Audit Trails.** Every tool call, policy decision, and outcome is recorded in a local SQLite database. You get a complete chain of custody: who instructed which agent to do what, what the agent accessed, which tools it called, what policy decisions were made, and what happened next. This is essential for compliance, incident investigation, and understanding what your agents are actually doing with your codebase.

**Observe and Enforce Modes.** By default, Kontext runs in observe mode — it records what it would allow and deny without blocking anything. This lets you understand the impact of your policies before turning on enforcement. Switch to enforce mode with a single environment variable (`KONTEXT_MODE=enforce`) when you're confident in your rules. This gradual adoption path is smart — you don't have to get your policy perfect on day one.

**Local-First Architecture.** The default `kontext start` command runs entirely on your machine. No hosted login, no trace upload, no external dependencies beyond the bundled llama.cpp runtime. The dashboard binds to loopback. Events are stored locally with redaction. This matters for developers working on proprietary codebases who can't send tool call data to third-party services.

**Agent Adapter System.** Claude Code is the first supported agent, with Goose, Codex, and Cursor adapters planned. The adapter architecture uses a hook system (PreToolUse and PostToolUse events) that any agent can implement. This means Kontext isn't locked to one agent — as the ecosystem fragments across more coding tools, the security layer stays consistent.

### Use Cases

- **Solo developers using Claude Code** who want a safety net before letting the agent modify their codebase. Run in observe mode to understand what the agent is doing, then switch to enforce when you're comfortable.
- **Engineering teams adopting AI coding tools** that need audit trails for compliance and security review. The local SQLite store provides a complete record of agent actions without sending data to external services.
- **Open-source maintainers** who want to protect their repositories from accidental or adversarial agent actions. Scoped credentials mean the agent can only access what you explicitly allow.
- **Security-conscious developers** working on proprietary codebases who need to demonstrate that AI agent access is controlled and auditable. The deterministic policy engine provides the kind of access control that enterprise security teams expect.
- **Developers experimenting with multiple AI coding tools** who want a consistent security layer across Claude Code, Codex, Cursor, and future agents. One policy configuration, one audit trail, regardless of which agent is running.

### Pros and Cons

Pros:
- Solves a real, under-addressed security problem in the AI coding agent ecosystem. Most developers are running agents with full shell access and no guardrails.
- Local-first architecture with no external dependencies means it works on air-gapped machines and proprietary codebases. No data leaves your system.
- The observe-then-enforce adoption path is practical — you can understand the impact before turning on blocking, reducing the risk of breaking your workflow.
- Go-based with a clean CLI interface, Homebrew installation, and well-documented architecture. The developer experience matches what Go developers expect.

Cons:
- Only Claude Code is actively supported today. Goose, Codex, and Cursor adapters are planned but not shipped, which limits the tool's value if you're not a Claude Code user.
- 205 stars and a small contributor base (3 human contributors) means the project is early-stage. The policy language and risk detection model are likely to evolve significantly.
- The local LLM judge requires llama.cpp and a GGUF model download, which adds setup complexity and disk space. On machines with limited resources, this could be a friction point.
- No integration with CI/CD pipelines yet — the security layer only protects local development, not automated agent workflows in GitHub Actions or similar.

### Getting Started

```bash
# Install via Homebrew (macOS and Linux)
brew install kontext-security/tap/kontext

# Start a local protected session with Claude Code (observe mode)
kontext start

# The dashboard is available at http://127.0.0.1:4765

# Switch to enforce mode to block risky actions
KONTEXT_MODE=enforce kontext start

# For managed sessions with hosted identity and short-lived credentials
kontext start --managed
```

On first launch, Kontext manages the default GGUF judge model automatically — if the model isn't cached locally, it downloads it before starting the llama-server on loopback. No additional configuration is needed for the basic observe/enforce workflow.

### Alternatives

**Invariant Labs Guardrails** — A Python-based security layer for AI agents that focuses on prompt injection detection and output validation. Invariant is more mature in its detection capabilities but requires Python infrastructure and sends analysis to external services. Kontext's Go-based, local-first approach is better for developers who want zero external dependencies and don't want to add Python to their toolchain.

**Lakera Guard** — A commercial API-based security layer for LLM applications that covers prompt injection, data loss prevention, and content moderation. Lakera is more comprehensive but requires sending all agent interactions to their cloud service. Kontext is the better choice for developers who need to keep their codebase and agent interactions completely local.

**Custom Agent Hooks** — You can build similar functionality yourself using Claude Code's hook system with custom scripts that validate tool calls before execution. This gives you maximum flexibility but requires significant engineering effort to match Kontext's policy engine, risk scoring, and audit trail capabilities. Kontext is the pragmatic choice if you want production-ready security without building it from scratch.

### Verdict

Kontext CLI is the security layer that the AI coding agent ecosystem desperately needs, built by people who clearly understand both the threat model and the developer experience. The local-first architecture, deterministic policy engine, and scoped credential injection are exactly right for the problem. At 205 stars and three contributors, it's early — but the architecture is sound, the CLI is clean, and the team is shipping fast (157 commits in under three months). If you're running Claude Code on any codebase you care about, install Kontext today and run it in observe mode. You'll probably be surprised by what your agent is doing. The security gap between "AI agent with full shell access" and "AI agent with scoped, auditable access" is too large to ignore, and Kontext is currently the best open-source option for closing it.
