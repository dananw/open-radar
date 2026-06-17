---
name: mimo-code
description: "MiMo-Code is Xiaomi's open-source terminal-native AI coding assistant with persistent memory, subagent orchestration, and self-improving features — a serious Claude Code alternative."
url: https://github.com/XiaomiMiMo/MiMo-Code
stars: 9529
forks: 412
language: TypeScript
tags: ["ai-coding", "terminal", "agents", "developer-tools", "open-source"]
featured: false
publishedAt: 2026-06-17
---

## MiMo-Code

### Overview

MiMo-Code is a terminal-native AI coding assistant from Xiaomi that accumulated over 9,500 GitHub stars in its first week of release in June 2026. It's built as a fork of OpenCode, but the additions are substantial enough that calling it "just a fork" misses the point. Xiaomi's team layered on persistent memory, subagent orchestration, goal-driven autonomous loops, and a self-improvement system that learns from your past sessions.

The project comes out of Xiaomi's MiMo AI team, which has been building large language models (MiMo-V2.5) and integrating them across Xiaomi's ecosystem. This is a hardware company with a serious AI research arm — not a startup throwing a wrapper around GPT. The team includes engineers who built the MiMo model family, which matters because MiMo-Code ships with a free-tier MiMo Auto channel that requires zero configuration. You install it and start coding.

The core problem MiMo-Code tackles is context loss. Every AI coding assistant today suffers from the same fundamental issue: you start a session, build up understanding of your codebase, then lose it all when the session ends or the context window fills up. MiMo-Code's persistent memory system stores project knowledge, architecture decisions, and session checkpoints in SQLite with full-text search, then reinjects relevant context when you resume. For developers working on large codebases across multiple sessions, this is a meaningful improvement over starting from scratch every time.

### Why it matters

The AI coding assistant space has exploded since Claude Code launched, but most alternatives are thin wrappers around a single LLM provider. MiMo-Code takes a different approach: it's provider-agnostic (works with OpenAI, Anthropic, Google, OpenRouter, and any OpenAI-compatible API), terminal-native (no IDE lock-in), and open source under MIT license. The free MiMo Auto channel means developers can try it without provisioning API keys, which removes the biggest friction point for adoption.

What makes this particularly interesting for the broader ecosystem is the "Dream & Distill" system. The `/dream` command scans your recent session traces and extracts persistent knowledge into project memory. The `/distill` command identifies repeated manual workflows and packages them into reusable skills. This is the first open-source coding assistant that actively tries to get better at your specific project over time, rather than treating every session as independent. Whether this actually works well in practice is still being validated by the community, but the design direction is where AI coding tools need to go.

The timing matters too. We're in a period where AI coding agents are moving from "autocomplete on steroids" to genuine autonomous workers. MiMo-Code's goal/stop condition system — where an independent judge model evaluates whether the agent actually completed its task before allowing it to stop — addresses one of the most common failure modes in autonomous coding: premature task completion. The agent claims it's done, but it's not. Having a separate model verify completion is a practical solution.

### Key Features

**Persistent Memory with Full-Text Search.** MiMo-Code maintains a cross-session memory system backed by SQLite FTS5. Project memory (`MEMORY.md`), session checkpoints (`checkpoint.md`), scratch notes, and per-task progress logs are all stored and indexed. When you resume a session, the agent reconstructs its understanding from these artifacts rather than starting from zero. This eliminates the "remind me what we were doing" pattern that plagues every other AI coding tool.

**Multiple Agent Modes.** Three primary agents serve different workflows: `build` (full tool permissions for development), `plan` (read-only analysis for code exploration and solution design), and `compose` (orchestration for specs-driven development with built-in skills for planning, execution, code review, TDD, debugging, verification, and merging). Switch between them with Tab. Subagents are created on demand with lifecycle tracking, cancellation, and background execution.

**Goal-Driven Autonomous Loops.** The `/goal` command sets a stopping condition for a session. When the agent tries to stop, an independent judge model evaluates the conversation to verify the condition is actually satisfied. This prevents the common failure mode where an autonomous agent declares victory prematurely. For long-running coding tasks, this is a significant reliability improvement over trusting the agent's self-assessment.

**Dream & Distill Self-Improvement.** The `/dream` command scans recent session traces, extracts persistent knowledge, and removes outdated entries from project memory. The `/distill` command identifies repeated manual workflows and proposes packaging them as reusable skills, subagents, or commands. Over time, the assistant develops project-specific expertise. This is the feature that distinguishes MiMo-Code from "just another Claude Code clone."

**Intelligent Context Management.** Automatic checkpoints decide when to save session state based on context window usage. When context approaches the limit, MiMo-Code reconstructs it from the latest checkpoint, project memory, task progress, and recent messages. A token budget system controls how much memory content enters context, with importance ranking so the most relevant information gets priority.

**Voice Input.** Real-time streaming voice input powered by TenVAD and MiMo ASR. Activate with `/voice`, then speak — audio is segmented by pauses and transcribed incrementally. The ASR model (`mimo-v2.5-asr`) runs on Xiaomi's platform, with voice control mode available through OpenRouter. It's a niche feature, but for developers who want to dictate complex instructions while their hands are on the keyboard, it's surprisingly useful.

**Provider Flexibility.** MiMo-Code connects to MiMo Auto (free, zero-config), Xiaomi's MiMo Platform (OAuth), Claude (import existing auth), or any OpenAI-compatible API via custom provider configuration. Max Mode enables parallel best-of-N reasoning with judge selection. You're not locked into a single model or provider, which is important as the LLM landscape shifts monthly.

### Use Cases

- **Large codebase maintenance** — Teams working on monorepos or multi-service architectures benefit from persistent memory that retains architecture decisions, naming conventions, and known gotchas across sessions. The `/improve deep` style audit mode catches tech debt.
- **Autonomous refactoring** — Set a goal like "migrate all API routes from Express to Hono" and let the agent work with the stop-condition judge verifying each migration is complete before moving on. The subagent system can parallelize across files.
- **Specs-driven development** — Use Compose mode to write a specification, then let the agent handle planning, TDD implementation, code review, and verification. The built-in skills cover the full lifecycle from spec to shipped code.
- **Quick prototyping** — The free MiMo Auto channel and zero-config setup make it easy to spin up a coding session for exploratory work. Voice input lets you describe what you want while looking at reference material.
- **Team onboarding** — New team members inherit project memory that encodes institutional knowledge. The agent already knows the project's conventions, test commands, and deployment process from previous sessions.

### Pros and Cons

Pros:
- Free tier with MiMo Auto means zero barrier to entry — no API keys, no credit card, no configuration. Install and run.
- Persistent memory is a genuine differentiator. Other tools claim "context awareness" but MiMo-Code actually stores and retrieves project knowledge across sessions with full-text search.
- Provider-agnostic architecture avoids the lock-in problem that affects tools tied to a single LLM vendor. Switch models without losing your workflow.
- The goal/stop-condition system with independent judge verification is a smart solution to premature task completion, a real problem in autonomous coding agents.

Cons:
- MiMo Auto (the free tier) uses Xiaomi's own model, which may not match Claude or GPT-4 quality for complex reasoning tasks. You'll likely want to connect a premium provider for serious work.
- The Dream & Distill features are novel but unproven at scale. Early community feedback suggests the knowledge extraction works but can sometimes store incorrect or outdated information that needs manual cleanup.
- Being a fork of OpenCode means the codebase carries some architectural debt from the upstream project. The team has added significantly, but integration seams are visible in places.
- Documentation is primarily community-driven and still catching up with the feature set. Some advanced configuration options are only documented in the source code.

### Getting Started

```bash
# Install via curl (one-line setup)
curl -fsSL https://mimo.xiaomi.com/install | bash

# Or install via npm
npm install -g @mimo-ai/cli

# Run
mimo
```

First launch walks you through provider configuration. Select MiMo Auto for zero-config usage, or connect your existing API key.

```bash
# Enable persistent memory for your project
mimo
# Then inside the session:
/memory init

# Set a goal for autonomous work
/goal Refactor all database queries to use parameterized statements

# Use Dream to extract knowledge from recent sessions
/dream

# Use Distill to identify reusable workflows
/distill
```

Configuration lives in `.mimocode/mimocode.json` per-project or `~/.config/mimocode/mimocode.json` globally.

### Alternatives

**Claude Code** — Anthropic's official terminal coding agent. More polished, better documented, and backed by Claude's strong reasoning capabilities. But it's tied to Anthropic's models, has no persistent memory across sessions, and costs $20/month minimum via the Max plan. Choose Claude Code when you want the most reliable single-model experience and don't mind the vendor lock-in.

**Aider** — The original open-source AI pair programming tool, focused on git-aware code editing with automatic commits. Aider is more mature and has a larger community, but lacks MiMo-Code's persistent memory, subagent orchestration, and autonomous goal system. Choose Aider when you want a simpler, git-centric workflow without the complexity of agent modes and memory systems.

**Goose** — Block's open-source AI agent (now part of the AgentSkills ecosystem). Goose focuses on extensibility through a plugin system and integrates well with enterprise workflows. It doesn't have MiMo-Code's persistent memory or self-improvement features. Choose Goose when you need enterprise-grade plugin architecture and team collaboration features.

### Verdict

MiMo-Code is the most ambitious open-source Claude Code alternative to emerge in 2026. The persistent memory and Dream/Distill self-improvement system address real pain points that every developer using AI coding tools has experienced — losing context between sessions and repeating the same instructions. The free MiMo Auto tier removes adoption friction entirely, and the provider-agnostic design means you can experiment without committing to a single vendor. It's early (first release June 2026, 9.5K stars in a week), so expect rough edges and API changes. But the architectural direction is right, and the team behind it has both the engineering talent and the financial backing to iterate quickly. If you're a fullstack developer who lives in the terminal and wants an AI coding assistant that learns your project over time, MiMo-Code is worth installing today.
