---
name: cupcake
description: "Cupcake is a Rust-based policy enforcement layer for AI coding agents using OPA/Rego. Deterministic guardrails for Claude Code, Cursor, and OpenCode without consuming model context."
url: https://github.com/eqtylab/cupcake
stars: 270
forks: 23
language: Rust
tags: ["ai-agents", "security", "opa", "policy-as-code", "coding-agents"]
featured: false
publishedAt: 2026-06-18
---

## Cupcake

### Overview

Cupcake is a policy enforcement layer for AI coding agents. It intercepts agent actions — file writes, git pushes, shell commands — and evaluates them against user-defined rules written in OPA/Rego, compiled to WebAssembly. The result is deterministic guardrails that run before your agent does something stupid, without eating into your model's context window.

The project comes from EQTYLab, with agentic safety research support from Trail of Bits — the security consultancy known for auditing critical crypto and infrastructure projects. That pedigree matters here. This isn't a weekend hack to wrap Claude Code hooks. It's a principled approach to the problem of AI agents operating in production environments where "the model said it was fine" isn't an acceptable audit trail.

The core problem Cupcake solves is deceptively simple: AI coding agents are powerful but inconsistent at following rules. Your `CLAUDE.md` file might say "never push to main" or "always run tests before committing," but as context grows and conversations get long, agents forget, hallucinate, or simply ignore those instructions. Cupcake moves those rules out of the prompt and into enforceable policy-as-code. The agent proposes an action, Cupcake evaluates it against compiled Wasm policies in sub-millisecond time, and returns a structured decision — allow, block, modify, warn, or require human review.

### Why it matters

Every team using AI coding agents in 2026 has hit the same wall: you can tell the agent what to do, but you can't guarantee it listens. The `CLAUDE.md` approach works for suggestions, not enforcement. Cursor rules are guidelines, not guardrails. When your agent force-pushes to production at 2 AM because it "forgot" the branch protection rule buried in paragraph 14 of your system prompt, guidelines don't help.

Cupcake addresses this with the same mental model that infrastructure teams already use for Terraform, Kubernetes, and CI/CD pipelines: policy-as-code. If you've ever used Open Policy Agent to enforce deployment rules, Cupcake applies the same Rego language to AI agent actions. The policies compile to WebAssembly, run in a sandbox, and execute in under a millisecond. No round-trips to an external service. No token consumption. No "hoping the model follows instructions."

The timing is relevant because AI agents are moving from personal productivity tools to team infrastructure. When one developer uses Cursor for side projects, the stakes are low. When your engineering team runs Claude Code across a monorepo with production credentials, database access, and deployment keys, you need more than prompt engineering. Cupcake fills that gap without requiring agents to change their behavior — it sits in the hook layer and intercepts actions before they execute.

### Key Features

**OPA/Rego Policy Engine.** Policies are written in Open Policy Agent's Rego language, a purpose-built language for policy decisions that's been battle-tested in Kubernetes admission controllers, API gateways, and cloud infrastructure for years. If your team already uses OPA for infrastructure policies, you can apply the same tooling and workflows to AI agent governance. Policies compile to WebAssembly for fast, sandboxed evaluation — no runtime dependencies, no external policy servers.

**Five Decision Types.** Cupcake returns structured decisions to the agent runtime: Allow (proceed normally), Modify (transform the action before execution), Block (stop and explain why), Warn (proceed but log), and Require Review (pause for human approval). The Block decision includes human-readable feedback so the agent can self-correct rather than just failing silently. The Modify decision is particularly useful — policies can sanitize commands, add safety flags, or enforce naming conventions without the agent even knowing.

**Multi-Harness Support.** First-class integrations for Claude Code, Cursor, Factory AI, and OpenCode. Each harness uses native event formats, so policies can access harness-specific capabilities. Gemini CLI and AMP support are coming soon. The harness-specific policy directories (`policies/claude/`, `policies/cursor/`, etc.) keep things organized when you're supporting multiple tools across a team.

**Signal Enrichment.** Before evaluating a policy, Cupcake gathers real-time signals from the environment — the current Git branch, CI status, database metadata, file paths, and more. This means policies can make context-aware decisions. A policy can allow `git push` on feature branches but block it on `main`, or allow file writes to `src/` but block them to `infra/production/`. The signals are packaged into a JSON input alongside the agent's proposed action.

**MCP Tool Governance.** Native support for Model Context Protocol tools. You can write policies that target specific MCP tool patterns like `mcp__memory__*` or `mcp__github__*`, giving you granular control over which MCP capabilities your agents can use. As MCP becomes the standard for agent-tool integration, this kind of governance will be essential for enterprise deployments.

**LLM-as-Judge Fallback.** For rules that are hard to express deterministically, Cupcake can route actions through a secondary LLM or agent for evaluation. This "Watchdog" mode handles the fuzzy cases — "is this code change architecturally appropriate?" or "does this commit message meet our standards?" — that pure Rego policies can't cover. It's a pragmatic compromise between deterministic enforcement and the flexibility that makes AI agents useful in the first place.

**TypeScript Bindings.** Cupcake provides native JavaScript/TypeScript bindings so it can be embedded in web-based agent frameworks. If you're building on LangChain, Vercel AI SDK, Google ADK, or any JS-based agent framework, you can integrate Cupcake's policy engine directly into your application rather than relying on CLI hooks.

### Use Cases

- **Preventing destructive git operations** — Block force-pushes to protected branches, require test passage before commits, enforce conventional commit messages. The most common use case and the easiest to implement with a few lines of Rego.

- **Enforcing file access boundaries** — Restrict which directories an agent can write to, prevent modifications to infrastructure-as-code files, block access to secrets or credential files. Essential for teams where agents have repository-wide access.

- **Compliance and audit trails** — Every Cupcake evaluation generates structured logs with the input action, signals, policy decision, and reasoning. For teams that need to demonstrate what AI agents did and why (SOC 2, ISO 27001, internal governance), this provides a deterministic audit trail that prompt logs can't match.

- **MCP tool restrictions** — Control which MCP servers and tools your agents can access. Block an agent from using deployment tools in development environments, or restrict memory tools to read-only mode during code review.

- **Graduated autonomy** — Start agents in "Require Review" mode for sensitive operations, then relax to "Warn" as confidence grows. This lets teams adopt AI agents incrementally without jumping straight to full autonomy.

### Pros and Cons

Pros:
- Deterministic enforcement that doesn't consume model context or depend on the model "following instructions." The policy engine is separate from the AI, which is exactly the right architecture.
- OPA/Rego is a mature, well-understood policy language with extensive documentation and community resources. You're not learning a new DSL — you're applying existing infrastructure skills to a new domain.
- Sub-millisecond evaluation means zero perceptible latency in the agent's workflow. The hook fires, the policy evaluates, and the agent proceeds (or doesn't) without any noticeable delay.
- Trail of Bits involvement and SLSA 3 supply chain security certification suggest serious attention to the project's own security posture.

Cons:
- 270 stars and relatively early stage (v0.5.1). The API surface is likely still evolving, and breaking changes are possible. Not yet the kind of project you'd bet a production pipeline on without active monitoring.
- OPA/Rego has a learning curve. If your team hasn't used policy-as-code before, writing Rego policies adds a new skill requirement. The policy studio and examples help, but it's still a new language to learn.
- Harness-specific feature gaps — context injection works in Claude Code and Factory AI but not Cursor, and Modify decisions aren't universal. You need to check the compatibility matrix for your specific agent setup.

### Getting Started

```bash
# Install via Homebrew (macOS/Linux)
brew install eqtylab/tap/cupcake

# Or install via Nix
nix profile install github:eqtylab/cupcake#cupcake-cli

# Or download from GitHub releases
# https://github.com/eqtylab/cupcake/releases

# Initialize Cupcake in your project
cupcake init

# This creates a cupcake/ directory with example policies
# Edit policies/claude/security.rego to define your rules

# Run with Claude Code
cupcake watch claude

# Run with Cursor
cupcake watch cursor

# Run with OpenCode
cupcake watch opencode
```

Check the policy studio for interactive examples:

```bash
# Open the policy studio (web UI for testing policies)
cupcake studio
```

### Alternatives

**Guard Skills (amElnagdy/guard-skills)** — A collection of Claude Code skills that catch AI-generated failure modes in code, tests, and docs. Guard Skills work at the prompt level, providing quality gates as agent instructions. Choose Guard Skills when you want lightweight, prompt-based checks without installing a separate tool. Choose Cupcake when you need deterministic enforcement that the agent can't override.

**NVIDIA SkillSpector** — An agent skill validation framework that focuses on testing and verifying agent capabilities before deployment. SkillSpector is more about validating what an agent can do; Cupcake is about controlling what an agent does in real-time. Different concerns, potentially complementary.

**Custom Claude Code Hooks** — Claude Code's native hook system lets you run scripts before and after agent actions. You could build basic policy enforcement with shell scripts. Cupcake replaces that DIY approach with a proper policy engine, Wasm compilation, signal enrichment, and multi-harness support. If your rules are simple ("block `rm -rf`"), hooks work fine. If you need structured policies with audit trails, Cupcake is the better foundation.

### Verdict

Cupcake is the right idea at the right time. As AI coding agents move from personal tools to team infrastructure, deterministic policy enforcement becomes a necessity, not a nice-to-have. The OPA/Rego foundation is smart — it reuses a mature policy language that infrastructure teams already know, and the WebAssembly compilation means evaluation is fast and sandboxed. At 270 stars, it's early, and you should expect API changes. But the architecture is sound, the Trail of Bits involvement adds credibility, and the multi-harness support means you're not locked into a single agent vendor. If your team runs AI coding agents against production codebases, Cupcake deserves a serious look — start with a few blocking policies for destructive operations, and expand from there.
