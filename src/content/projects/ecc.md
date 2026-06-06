---
name: ecc
description: "ECC is a harness-native operator system for agentic work — 209K stars, 251 skills, 63 agents across Claude Code, Codex, Cursor, Gemini, and more."
url: https://github.com/affaan-m/ECC
stars: 209104
forks: 32069
language: JavaScript
tags: ["ai-agents", "developer-tools", "claude-code", "productivity", "cross-harness"]
featured: false
publishedAt: 2026-06-07
---

## ECC

### Overview

ECC is the most starred open-source agent harness system on GitHub right now. At 209,000 stars and 32,000 forks in under five months, it has grown faster than almost any developer tool in recent memory. The weekly growth alone — 10,000+ new stars per week on the GitHub trending charts — signals something beyond hype. Developers are actually using this.

The project is maintained by Affaan Mustafa, a solo developer who has been shipping weekly releases since January 2026. That cadence matters. v1.7.0 brought cross-platform expansion. v1.8.0 introduced the harness performance system. v1.9.0 added selective install and 12 language ecosystems. v2.0.0-rc.1, released May 25, 2026, brought a Rust control-plane prototype and dashboard GUI. Each release has been substantive, not cosmetic.

The core problem ECC solves: if you use multiple AI coding agents — Claude Code for one project, Codex for another, Cursor for a third — you end up duplicating skills, rules, hooks, and MCP configurations across each tool. Every harness has its own format, its own loading mechanism, its own quirks. ECC provides a shared substrate of portable assets that adapt to each harness at the edge. Write a skill once, install it everywhere.

### Why it matters

The AI coding agent landscape is fragmenting fast. Claude Code, OpenAI Codex, Cursor, Gemini CLI, OpenCode, Goose, Amp, Kiro — there are now dozens of agentic coding tools competing for developer mindshare. Each has its own extension model, its own way of defining skills and rules. For developers who work across multiple tools (and most do), this creates real operational overhead.

ECC addresses this by treating the agent harness as an execution surface, not the source of truth. Skills, rules, hooks, and MCP configurations live in one repository. Harness-specific adapters translate them into the format each tool expects. This is the same insight that made Kubernetes successful — define your desired state once, let the runtime handle the specifics.

The timing connects to a broader shift in how developers work. According to GitHub's 2025 Octoverse report, 92% of developers have used AI coding tools. But most are using them ad hoc — a skill here, a rule there, no systematic approach. ECC provides that system. It's not a tool you install and forget. It's an operating methodology for agent-augmented development.

### Key Features

**Cross-Harness Skill Portability.** Skills are defined as `SKILL.md` files with YAML frontmatter — name, description, origin, usage conditions. The same skill installs into Claude Code as a plugin, into Codex via `AGENTS.md`, into Cursor under `.cursor/`, and into OpenCode through its plugin system. The skill author writes once; the harness adapters handle the rest. This eliminates the biggest pain point of multi-tool workflows.

**251 Production Skills Across 12 Language Ecosystems.** The skill catalog covers TypeScript, Python, Go, Java, Kotlin, PHP, Perl, C++, Rust, and more. Skills range from language-specific patterns (`nestjs-patterns`, `pytorch-patterns`) to operational workflows (`parallel-execution-optimizer`, `benchmark-optimization-loop`) to content creation (`manim-video`, `remotion-video-creation`). Each skill has been refined through real daily use, not written speculatively.

**63 Specialized Agents.** ECC ships with purpose-built agents for code review, build resolution, and domain-specific work across multiple languages. The `typescript-reviewer`, `pytorch-build-resolver`, `java-reviewer`, and `kotlin-reviewer` agents are designed to catch issues that generic agents miss. They encode institutional knowledge about common failure patterns in each ecosystem.

**AgentShield Security Scanning.** The security layer scans for prompt injection vectors, credential leakage, unsafe tool calls, and sandbox escape attempts. This is the first agent framework I've seen that takes adversarial security seriously at the skill level. The security guide documents attack vectors, sandboxing strategies, and sanitization patterns — material that most AI tool documentation ignores entirely.

**Hook System with Cross-Harness Adapters.** Hooks execute at defined lifecycle points — pre-commit, post-generation, session start, session end. In Claude Code, hooks run natively. In Codex, they're instruction-driven. In Cursor, an adapter layer translates hook definitions into Cursor's format. The hook system enables automated quality gates: lint after generation, test before commit, security scan on every change.

**MCP Configuration Management.** ECC manages Model Context Protocol server configurations across harnesses. Define your MCP servers once (GitHub, Context7, Exa, Firecrawl, Playwright, or custom), and ECC installs the correct configuration format for each agent tool. This eliminates the most tedious part of setting up a new coding agent.

**ECC 2.0 Alpha with Rust Control Plane.** The v2.0.0-rc.1 release introduces a Rust-based control plane that provides `dashboard`, `start`, `sessions`, `status`, `stop`, `resume`, and `daemon` commands. The Tkinter-based desktop GUI adds dark/light theme toggle and project management. Session orchestration with SQLite state tracking brings structure to multi-agent workflows.

### Use Cases

- **Multi-harness development teams** where different developers prefer different AI coding tools but need shared standards for code quality, security, and workflow patterns.
- **Enterprise agent governance** where organizations need consistent security scanning, hook enforcement, and skill definitions across all AI coding tools used by engineering teams.
- **Solo developers running parallel agents** who want to spin up Claude Code, Codex, and Cursor on different worktrees without duplicating configuration. ECC's worktree-native orchestration handles this.
- **Language-polyglot projects** spanning TypeScript backends, Python ML pipelines, and Go infrastructure services. ECC's 12-language ecosystem coverage means consistent tooling across the stack.
- **Agent security auditing** where teams need to validate that AI-generated code doesn't introduce prompt injection vectors, credential leaks, or unsafe tool patterns.

### Pros and Cons

Pros:

- The cross-harness architecture is genuinely novel. No other project attempts to unify skills, rules, hooks, and MCP configs across 8+ agent tools. The portability model works because skills are mostly instructions and constraints, not harness-specific code.
- The skill catalog is deep and practical. 251 skills refined through 10+ months of daily production use beats anything in the agent tooling space. These aren't demo examples — they encode real workflow patterns.
- MIT license and fully open source. The paid ECC Pro tier adds private repo support and a GitHub App, but the core system is completely free. No feature gating on the open-source release.

Cons:

- Solo maintainer risk is real. 209K stars and 32K forks backed by one person is a concentration of bus factor that should concern anyone building critical workflows on ECC. The project needs more core contributors.
- The learning curve is steep. ECC is a system, not a tool. Understanding skills, hooks, agents, MCP configs, harness adapters, and the orchestration layer requires significant upfront investment. The documentation is extensive but dense.
- ECC 2.0 is alpha software. The Rust control plane and dashboard GUI are promising but not production-ready. Teams adopting ECC today are building on v1.x, which will see breaking changes when v2.0 lands.

### Getting Started

```bash
# Clone the repository
git clone https://github.com/affaan-m/ECC.git
cd ECC

# Install for Claude Code
npx ecc install --harness claude

# Install for Codex
npx ecc install --harness codex

# Install for Cursor
npx ecc install --harness cursor

# Run the security scan
npx ecc security scan

# View installed skills
npx ecc skills list

# Check harness compatibility
npx ecc status --markdown
```

### Alternatives

**obra/superpowers** — A simpler agentic skills framework focused on methodology over infrastructure. Superpowers defines development workflows (plan, implement, verify) as structured processes. Choose it when you want a lightweight skill system without the full harness adapter layer. ECC is better when you need cross-tool portability and a large pre-built skill catalog.

**revfactory/harness** — A meta-skill that auto-generates domain-specific agent teams from descriptions. Harness focuses on team architecture patterns — which agents to create, how they specialize, what skills they need. It's complementary to ECC rather than competitive. Use harness to design your agent team, then use ECC to implement and port the skills across tools.

**danielmiessler/Personal_AI_Infrastructure** — A framework for building personal AI agent systems with structured workflows and tool integrations. More opinionated about the operator lifestyle — content creation, research, knowledge management. Choose it when you want a curated personal productivity stack. ECC is better for team-scale agent governance and cross-harness standardization.

### Verdict

ECC is the most ambitious attempt to solve the agent fragmentation problem in the developer tools space. 209,000 stars in five months isn't an accident — it reflects a real pain point that every developer using multiple AI coding tools has experienced. The cross-harness skill portability model is the right abstraction. Skills are instructions and constraints, not code — so they should travel across tools. ECC makes that work.

The risk is concentration. One maintainer, 32,000 forks, weekly releases across 12 language ecosystems. That's heroic but fragile. If you're a team considering ECC, the smart move is to adopt the skill format and portability conventions now while contributing back. The format is stable enough to bet on even if the project's governance evolves. For solo developers running multiple agents, ECC is already the best available option — nothing else comes close to its skill catalog depth and cross-harness coverage.
