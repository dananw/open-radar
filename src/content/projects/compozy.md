---
name: compozy
description: "Compozy is an open-source Go CLI that orchestrates AI coding agents through a structured pipeline from idea to shipped code — 2.2K stars and climbing."
url: https://github.com/compozy/compozy
stars: 2248
forks: 116
language: Go
tags: ["ai-agents", "developer-tools", "cli", "go", "workflow-automation"]
featured: false
publishedAt: 2026-06-06
---

## Compozy

### Overview

Compozy is a single-binary Go CLI that replaces the messy reality of AI-assisted development — scattered prompts, copy-paste review cycles, inconsistent task tracking — with a structured pipeline. It orchestrates AI coding agents through every phase: ideation, PRD generation, technical specification, task breakdown, concurrent execution, and automated PR review remediation. The project hit 2,200+ GitHub stars within its first ten weeks, which is fast for a developer tool that isn't riding a viral demo video.

The project launched on March 28, 2026, and the team has shipped steadily since. It's MIT-licensed, compiles to a single binary with zero runtime dependencies, and works with over 40 AI agents and editors — Claude Code, Codex, Cursor, GitHub Copilot CLI, Gemini CLI, OpenCode, and more. The MCP (Model Context Protocol) integration means it plugs into the emerging standard for AI tool connectivity without custom adapters.

The core problem Compozy solves: most developers using AI coding tools do so in an ad-hoc way. You open Claude Code, paste a prompt, get some code, manually review it, maybe paste it into another agent for a second opinion. There's no pipeline, no memory between runs, no structured artifacts. Compozy turns that chaos into a repeatable workflow where each phase produces markdown artifacts that feed into the next, and agents inherit context from every previous step.

### Why it matters

The AI coding agent ecosystem is exploding — Claude Code, Codex, Cursor, Gemini CLI, OpenCode, and dozens more. But the tooling to orchestrate these agents is still primitive. Most developers use one agent at a time, manually, with no structured workflow. This is like using Git without branches: it works, but you're leaving a massive amount of productivity on the table.

Compozy fills the orchestration gap. It's not another AI coding agent — it's the layer that sits above all of them, turning individual agent calls into a coherent development pipeline. The fact that it's written in Go matters: single binary, no Node.js runtime, no Python venv, no Docker. You `brew install` it and it works. For teams already juggling multiple AI tools, this is the missing glue.

The MCP angle is also significant. As the Model Context Protocol becomes the standard for connecting AI tools to external services, Compozy's native support means it can route agent tasks through MCP servers for Linear, Slack, databases, or custom integrations. This positions it as more than a CLI — it's becoming a platform for AI-native development workflows.

### Key Features

**Structured Pipeline from Idea to PR.** The full workflow is Idea → PRD → TechSpec → Tasks → Execution → Review. Each phase produces markdown files that live in `.compozy/tasks/`. You can start from a raw idea for full research and debate, or jump straight to PRD if you already know what you want to build. The pipeline is optional at every stage — skip what you don't need.

**Codebase-Aware Task Enrichment.** Tasks aren't generic prompts. Compozy spawns parallel agents to explore your actual codebase, discover patterns, and ground every task in real project context. When it generates a "backend" task, it knows your ORM, your auth layer, your folder structure. This eliminates the biggest failure mode of AI coding tools: generating code that doesn't fit the project.

**Multi-Agent Concurrent Execution.** Run tasks through any ACP-capable runtime — change `--ide` to switch between Claude Code, Codex, Cursor, Droid, OpenCode, Pi, Gemini, or Kiro. Tasks execute concurrently with configurable timeouts, retries, and exponential backoff. A live terminal UI shows progress. The daemon model means you can detach and reattach to running workflows.

**Workflow Memory Between Runs.** Agents inherit context from every previous task — decisions, learnings, errors, and handoffs. Two-tier markdown memory with automatic compaction keeps context fresh without manual bookkeeping. This is the feature that makes multi-step workflows actually work, because each agent call builds on what came before instead of starting from zero.

**Provider-Agnostic PR Reviews.** Fetch review comments from CodeRabbit, GitHub PR comments, or run AI-powered reviews internally. All normalize to the same format. After you fix issues, provider threads resolve automatically. This closes the loop on the development cycle — you're not just generating code, you're iterating on it through review.

**Reusable Agents with Local MCP Servers.** Package a prompt, runtime defaults, and optional MCP servers under `.compozy/agents/<name>/`. Run them with `compozy exec --agent <name>`. This lets teams define standardized agent configurations — a "reviewer" agent, a "security auditor" agent, a "test writer" agent — that anyone on the team can invoke consistently.

**Extensible via TypeScript and Go SDKs.** The extension system uses JSON-RPC 2.0 over stdin/stdout with 32 hooks across 6 pipeline phases. Ship custom prompt decorators, lifecycle observers, review providers, and skill packs. Extensions are discovered from workspace, user, and bundled scopes with explicit enablement for security.

### Use Cases

- **Fullstack feature development** — Start with a feature idea, let Compozy generate a PRD, break it into frontend/backend tasks grounded in your codebase, execute them concurrently through Claude Code or Codex, then auto-fix review comments from CodeRabbit.
- **Code review automation** — Pull CodeRabbit or GitHub PR review comments, normalize them, and have AI agents fix each issue with full codebase context. No more manually triaging and fixing review feedback.
- **Team-standardized AI workflows** — Define reusable agents with specific prompts and MCP connections, then share them across the team via version control. Every developer gets consistent AI assistance tuned to your project.
- **Multi-agent codebase refactoring** — Break a large refactoring effort into tasks with dependencies, run them through different agents for parallel execution, and let Compozy handle the ordering and context passing.
- **AI-powered technical writing** — Generate architecture docs, ADRs, and technical specs from code exploration, then refine them through structured review cycles.

### Pros and Cons

Pros:
- Single Go binary with zero dependencies. Install via Homebrew, npm, or `go install`. No runtime to manage, no containers to configure. This is the kind of developer experience that gets adoption.
- Actually supports 40+ agents and editors through ACP, not just one vendor. Switching from Claude Code to Codex is a flag change, not a migration.
- The structured pipeline produces version-controlled markdown artifacts. Every PRD, spec, task, and review is a file you can diff, edit, and track. No black-box state.
- Workflow memory with automatic compaction is genuinely useful. Multi-step AI workflows without memory are basically starting over each time — Compozy fixes this.
- The extension system is well-designed: JSON-RPC 2.0, typed SDKs for TypeScript and Go, explicit security model. Real software engineering, not a hackathon project.

Cons:
- The learning curve is non-trivial. The pipeline concept, daemon model, ACP runtime integration, and extension system give you a lot to learn before you're productive. This isn't a "paste a prompt" tool.
- Still early — created March 28, 2026. The API surface is evolving fast, and v2 task schema migrations are already a thing. Expect breaking changes in the next few months.
- Requires ACP-capable runtimes installed separately. Compozy doesn't include Claude Code or Codex — it orchestrates them. You need at least one runtime set up before you can execute anything.
- The daemon model adds operational complexity. Understanding `daemon start`, workspace registration, run attachment, and the distinction between local and daemon state takes time.

### Getting Started

```bash
# Install via Homebrew (recommended)
brew install compozy/compozy/compozy

# Or via npm
npm install -g @compozy/cli

# Or via Go
go install github.com/compozy/compozy/cmd/compozy@latest

# Set up in your project — interactive agent and skill selection
cd your-project
compozy setup

# Or install everything to every detected agent
compozy setup --all

# Run a workflow from idea to code
compozy tasks run my-feature

# Or execute a single prompt through the ACP stack
compozy exec "Add input validation to the registration form"

# Fetch and fix PR review comments
compozy reviews fetch --provider coderabbit
compozy reviews fix
```

### Alternatives

**Aider** — A Python-based AI pair programming tool that runs in your terminal. Aider is simpler and more focused: it's a single-agent coding assistant that edits files in-place with Git integration. Choose Aider when you want a straightforward AI coding partner without pipeline orchestration. Compozy is for when you need multi-step workflows, concurrent execution, and review automation across multiple agents.

**Claude Code** — Anthropic's official CLI agent. Claude Code is a single powerful agent; Compozy is the orchestration layer above it. You can use Claude Code as Compozy's execution runtime via `--ide claude`. The distinction is scope: Claude Code handles one task well, Compozy coordinates dozens of tasks across a structured pipeline with memory, reviews, and dependency management.

**n8n** — A visual workflow automation platform with AI capabilities. n8n is broader — it connects hundreds of services and handles general automation. Compozy is specifically built for AI-assisted software development workflows. If you need to automate CI/CD, Slack notifications, and data pipelines alongside coding, n8n might be the better fit. If your primary pain point is orchestrating AI coding agents through a development lifecycle, Compozy is purpose-built for that.

### Verdict

Compozy is the most interesting AI development orchestration tool I've seen this year. The idea of a structured pipeline that turns AI coding agents from ad-hoc prompt-and-pray into a repeatable, reviewable workflow resonates with how serious development teams actually work. The Go single-binary distribution, the 40+ agent support through ACP, and the extensible architecture show real engineering maturity for a project that's only ten weeks old. It's not for everyone — the learning curve is real, and the early-stage API stability is a legitimate concern. But if you're a fullstack developer already using Claude Code or Codex and feeling the pain of unstructured AI workflows, Compozy is worth the investment. The 2,200+ stars and active commit history suggest the team is building something that developers actually want.
