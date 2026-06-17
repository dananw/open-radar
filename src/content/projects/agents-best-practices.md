---
name: agents-best-practices
description: "A provider-neutral Agent Skill for designing, auditing, and building production-safe AI agent harnesses — with MVP blueprints, permission models, and runtime discipline."
url: https://github.com/DenisSergeevitch/agents-best-practices
stars: 1961
forks: 170
language: Markdown
tags: ["ai-agents", "agent-skill", "developer-tools", "prompt-engineering", "open-source"]
featured: false
publishedAt: 2026-06-17
---

## agents-best-practices

### Overview

`agents-best-practices` is an Agent Skill — a portable knowledge package that works in Claude Code, Codex, and any agent runtime that supports the Agent Skills specification. It hit 1,961 stars within a month of its May 2026 launch. The project is authored by Denis Sergeevitch and takes a provider-neutral stance: it doesn't care whether you're using OpenAI, Anthropic, or OpenAI-compatible APIs. The harness design patterns apply regardless.

The core idea is deceptively simple: *"The model proposes actions; the harness validates, authorizes, executes, records, and returns observations."* That single sentence captures what most AI agent implementations get wrong. Developers bolt tools onto a model and call it an agent. This skill treats the model as one component in a larger runtime — the harness — that enforces permissions, budgets, structured observations, and approval gates.

The skill contains 17 reference documents covering MVP blueprints, security evals, prompt caching strategies, and provider API patterns. It activates when a conversation touches agent architecture, harness design, tool permissions, workflow orchestration, or production readiness.

### Why it matters

Every fullstack developer in 2026 is either building AI features or about to. React frontends talking to NestJS backends that call LLM APIs, Django apps with agent-powered workflows, Go services orchestrating multi-step AI pipelines — the pattern is everywhere. But most implementations share the same problems: tools are too broad, permissions are model-decided instead of runtime-enforced, and there's no structured way to handle approval flows for high-risk actions.

This skill addresses the gap between "I can call an LLM API" and "I can ship a production-safe agent." The reference documents are concrete patterns: how to structure a model-tool-observation loop, how to classify tools by risk level, how to implement approval gates that live outside the model's context window, and how to set budgets for steps, time, tokens, and cost.

The timing matters too. The Agent Skills specification (agentskills.io) is gaining traction as a portable format for packaging domain knowledge. This skill is one of the most comprehensive implementations of that spec — and it's MIT licensed, so you can fork it, adapt it, and ship it in your own projects.

### Key Features

**Provider-Neutral Harness Design.** The skill doesn't lock you into OpenAI or Anthropic. It includes reference documents for both provider API patterns and OpenAI-compatible endpoints. Your harness architecture stays the same whether you switch from Claude to GPT to a self-hosted model. This is the kind of boring infrastructure decision that saves you a rewrite six months later.

**MVP Agent Blueprint Generator.** Describe your domain and the skill generates the smallest useful production-safe agent harness. Not a vague checklist — a concrete blueprint with core loop, minimal tools classified by risk, and a launch gate with measurable criteria. The blueprint for an account renewal risk agent, for example, specifies exactly five tools, their permission classes, and a launch gate requiring 20 historical account traces with 80% human acceptance.

**Typed Tools and Risk-Class Permissions.** The skill enforces a principle most agent implementations ignore: never expose broad tools like `execute_anything`, `send_message`, or `write_database`. Instead, each action is a narrow typed tool with structured results and deterministic permission checks. Tools are classified by risk — reads can be autonomous when scoped, drafts can be autonomous when labeled, but external writes, deploys, and financial operations require approval records outside the model.

**Runtime Budgets and Termination.** Every agent loop gets hard budgets: step count, wall-clock time, token consumption, cost ceiling, and tool-call limits. When a budget is exhausted, the loop terminates with a structured reason — not an infinite retry or a silent hang. This is the difference between a demo and a production system.

**Context, Memory, and Compaction Patterns.** Long-running agents need context management that doesn't lose active state during compaction. The skill's reference on context-memory-compaction covers how to store plans, approvals, todos, and artifacts outside the prompt, and how to rehydrate active state (not chat history) after compaction. This solves the "agent forgets why it made a decision" problem that plagues most implementations.

**Security Evals and Launch Gates.** The skill includes concrete eval categories: injection resistance, missing tool result handling, timeout behavior, budget exhaustion, and approval bypass attempts. Launch gates require passing traces, not just unit tests. The reference on security-evals-observability is the most practical guide to agent safety I've found outside of a production incident postmortem.

**Coding Agent Overlay.** A dedicated reference document overlays the general harness patterns onto repository-facing coding agents — the kind Claude Code and Codex implement. It covers file-scoped tools, diff-based proposals, test verification loops, and the specific permission model that prevents a coding agent from pushing to main without review.

### Use Cases

- **Building your first AI agent** — Use the MVP blueprint generator to get a concrete starting point instead of staring at LangChain docs wondering what tools to expose.
- **Auditing an existing agent** — Point the skill at your current implementation and get specific failure points: missing budgets, unbounded tool results, no approval gates for external writes.
- **Designing tool and permission architecture** — For any agent that touches real systems (CRM, deploy APIs, databases), the risk-class framework tells you exactly which actions need approval records and which can be autonomous.
- **Multi-provider migration** — If you're moving from OpenAI to Anthropic or adding a self-hosted model, the provider-neutral patterns keep your harness architecture stable.
- **Team onboarding** — New developers building agent features get a structured reference instead of learning from production incidents.

### Pros and Cons

Pros:

- Provider-neutral design means you're not locked into a single AI vendor. The harness patterns work with any model API.
- The 17 reference documents are genuinely comprehensive — covering everything from MVP blueprints to prompt caching cost optimization to incident response.
- Works as a skill in Claude Code, Codex, and any Agent Skills-compatible runtime. No proprietary IDE or platform required.
- The risk-class permission model is the most practical framework I've seen for deciding which agent actions need human approval.

Cons:

- It's a knowledge package, not a code library. You still need to implement the patterns yourself in your specific stack (React, NestJS, Django, Go, whatever).
- The reference documents are dense. A developer new to agent architecture might find the 17-document structure overwhelming without guidance on where to start.
- No built-in integration with popular agent frameworks like LangChain or CrewAI. The patterns are framework-agnostic, which means more adaptation work.
- At 1,961 stars, the community is still growing. You won't find as many blog posts, tutorials, or Stack Overflow answers as you would for more established tools.

### Getting Started

```bash
# Install via Agent Skills CLI (works with any compatible agent)
npx skills add DenisSergeevitch/agents-best-practices -g

# Or install manually for Claude Code
mkdir -p "$HOME/.claude/skills"
git clone https://github.com/DenisSergeevitch/agents-best-practices.git \
  "$HOME/.claude/skills/agents-best-practices"

# Or for Codex
mkdir -p "${CODEX_HOME:-$HOME/.codex}/skills"
git clone https://github.com/DenisSergeevitch/agents-best-practices.git \
  "${CODEX_HOME:-$HOME/.codex}/skills/agents-best-practices"
```

Once installed, the skill activates when your conversation touches agent architecture. Start with an MVP blueprint:

```text
Build an agent for [your domain]. It should [your requirements].
```

Or audit an existing agent:

```text
Audit the harness for our [existing agent]. Check for missing budgets,
unbounded tool results, and permission gaps.
```

The skill will reference specific documents from `references/` as needed. Read `references/mvp-agent-blueprint.md` first if you're building from scratch.

### Alternatives

**LangChain / LangGraph** — The most popular agent framework with pre-built tools and integrations. LangChain gives you runnable code out of the box; `agents-best-practices` gives you architectural patterns. Choose LangChain to ship fast with pre-built components. Choose `agents-best-practices` to understand the harness design decisions before committing to a framework.

**CrewAI** — A multi-agent orchestration framework for defining agent roles, tasks, and collaboration patterns. CrewAI is more opinionated about multi-agent workflows; `agents-best-practices` focuses on single-agent harness discipline first. Choose CrewAI if your use case genuinely needs multiple agents. Choose `agents-best-practices` to get the single-agent foundation right before adding complexity.

**Anthropic's Agent Guide** — Official documentation on building agents with Claude, including tool use and long-running harness patterns. It's Claude-specific but authoritative. `agents-best-practices` synthesizes patterns across providers. Choose Anthropic's guide if you're committed to Claude. Choose `agents-best-practices` for provider-neutral patterns or multi-model builds.

### Verdict

This is the reference I wish existed when I started building AI agents. Most agent tutorials teach you how to call a model and attach tools — the easy part. `agents-best-practices` teaches you the hard part: how to build a harness that won't embarrass you in production. The risk-class permission model alone is worth the install. If you're a fullstack developer adding AI agent features to your React, NestJS, Django, or Go applications, start here before you pick a framework. Getting the harness right at the start is 10x cheaper than fixing it after a production incident.
