---
name: repository-harness
description: "Rust CLI that structures any repo for AI coding agents — AGENTS.md, feature intake, architecture docs, and test matrices for Claude Code, Codex, and Cursor."
url: https://github.com/hoangnb24/repository-harness
stars: 782
forks: 315
language: Rust
tags: ["developer-tools", "ai-agents", "context-engineering", "coding-agents", "rust"]
featured: false
publishedAt: 2026-06-16
---

## Repository Harness

### Overview

Repository Harness is a Rust CLI that turns any software repository into an agent-ready workspace. It installs a structured operating layer — `AGENTS.md`, feature intake docs, architecture boundaries, test matrices, decision logs, and story packets — so that AI coding agents like Claude Code, Codex, and Cursor can actually understand your project before they start making changes.

The project launched in early May 2026 and has climbed to 782 GitHub stars with 315 forks in roughly six weeks. That kind of growth signals real developer pain. The latest release (v0.1.10, June 13) shows active maintenance with six contributors and a clear roadmap. It's written primarily in Rust (83%), with Shell and PowerShell install scripts for cross-platform support.

The core problem it solves is deceptively simple: coding agents don't understand your repo. They enter with a chat prompt and a shallow file snapshot, then immediately start editing code without knowing the product intent, architecture constraints, or validation expectations. Repository Harness fixes this by giving agents the structured context they need — what to read first, what type of work they're doing, which product contract applies, how risky the change is, and what proof shows the work is done.

### Why it matters

The shift from "prompt engineering" to "context engineering" is the biggest quiet revolution in AI-assisted development right now. OpenAI published their harness engineering manifesto earlier this year, and the idea is spreading fast: agents don't just need better prompts — they need better repositories. Repository Harness is one of the first practical, open-source implementations of that philosophy.

For fullstack developers working with React, NestJS, Django, Go, or AI agent stacks, this matters because the tooling gap between "I have Copilot" and "my agents actually understand my monorepo" is enormous. Most developers are still relying on chat history and scattered README files to onboard AI tools. Repository Harness replaces that with a structured, version-controlled operating layer that any agent can read.

The broader trend is clear: as AI coding agents become standard development tools, the repos that are "agent-ready" will have a significant productivity advantage. This isn't about replacing developers — it's about making sure your AI assistant doesn't waste tokens rediscovering things your team already knows.

### Key Features

**AGENTS.md Shim.** The stable entry point that every coding agent reads first. Repository Harness installs a lightweight `AGENTS.md` file that links to the rest of the harness docs. For Claude Code users, it also creates a `CLAUDE.md` with `@`-imports so the context loads automatically in every session. This is the single most important file — without it, agents have no structured way to discover project context.

**Feature Intake Classification.** The `docs/FEATURE_INTAKE.md` file defines a simple work classification system: tiny, normal, and high-risk. Each category has different expectations for planning, review, and validation. This means agents can self-classify their work and apply the right level of rigor. A typo fix doesn't need the same process as a database migration.

**Architecture Discovery.** `docs/ARCHITECTURE.md` captures boundary rules, module responsibilities, and architectural decisions that would otherwise live in someone's head. For monorepo setups — say a React frontend, NestJS API, and Go microservices — this file tells agents exactly which boundaries they should respect and which patterns to follow.

**Test Matrix and Validation.** `docs/TEST_MATRIX.md` maps behaviors to proof requirements. Instead of agents guessing what "done" looks like, the test matrix explicitly states which tests, checks, or evidence each type of change needs. This is particularly valuable for fullstack projects where a backend change might require frontend integration tests.

**Decision and Story Logs.** The `docs/decisions/` and `docs/stories/` directories maintain durable records of architectural decisions and work items. When a future agent joins the project, it can read these logs to understand why certain choices were made. This prevents the classic AI agent failure mode of re-proposing solutions that were already evaluated and rejected.

**One-Command Installation.** The CLI installs the entire harness with a single `curl | bash` command. It supports `--merge` mode for repos that already have partial harness files, and `--override` for clean reinstalls. The `--claude` flag adds Claude Code-specific imports. Cross-platform support covers macOS, Linux, and Windows PowerShell.

**Template Library.** Reusable templates for specs, stories, decisions, and validation plans live in `docs/templates/`. These aren't just blank forms — they're structured documents designed for both human readability and agent parsing. Each template includes field descriptions and examples.

### Use Cases

- **Fullstack monorepo onboarding** — A React + NestJS + Go project needs agents to understand the architecture boundaries before making changes. Repository Harness installs the docs that prevent cross-boundary violations.
- **Team AI adoption** — A development team is rolling out Claude Code or Cursor across their workflow. Repository Harness gives every agent the same structured context, reducing inconsistent behavior.
- **Open source project standardization** — Maintainers want AI contributors to follow the same patterns as human contributors. The harness docs encode project conventions that agents can read.
- **High-risk change management** — Database migrations, auth changes, and API version updates need extra scrutiny. The feature intake system ensures agents apply the right validation rigor.
- **Multi-agent workflows** — Teams using multiple AI coding tools (Claude Code for planning, Codex for implementation, Cursor for review) need a shared context layer. Repository Harness provides that common ground.

### Pros and Cons

Pros:
- Solves a real, measurable problem — agents waste tokens and produce worse code without structured context. The harness approach directly addresses this with version-controlled docs.
- Language and framework agnostic — works with React, Django, Go, NestJS, or any stack. The harness docs describe your project, not your language.
- Active development with frequent releases — v0.1.8 through v0.1.10 shipped in two weeks, showing the team ships fast and iterates on feedback.
- MIT licensed and self-hosted — no vendor lock-in, no telemetry, no cloud dependency. Your harness docs live in your repo.

Cons:
- Requires discipline to maintain — the harness docs are only useful if they're kept current. Stale architecture docs can mislead agents more than having no docs at all.
- Rust CLI adds a build dependency — while install scripts handle this, teams in restricted environments might need to build from source.
- Still early (v0.1.x) — the API and file structure may change. Production teams should pin versions and test upgrades carefully.
- Overhead for small projects — a simple CRUD app might not need a full harness. The feature intake and test matrix add value primarily for complex, multi-developer repos.

### Getting Started

```bash
# Install harness into your current project
curl -fsSL "https://raw.githubusercontent.com/hoangnb24/repository-harness/main/scripts/install-harness.sh" | bash -s -- --yes

# For Claude Code users — adds CLAUDE.md with @-imports
curl -fsSL "https://raw.githubusercontent.com/hoangnb24/repository-harness/main/scripts/install-harness.sh" | bash -s -- --yes --claude

# Merge with existing docs (preserves your current AGENTS.md)
curl -fsSL "https://raw.githubusercontent.com/hoangnb24/repository-harness/main/scripts/install-harness.sh" | bash -s -- --merge --yes

# Windows PowerShell
& ([scriptblock]::Create((irm "https://raw.githubusercontent.com/hoangnb24/repository-harness/main/scripts/install-harness.ps1"))) -Yes
```

After installation, edit the generated files to match your project:
1. Fill in `docs/ARCHITECTURE.md` with your module boundaries
2. Customize `docs/FEATURE_INTAKE.md` risk categories for your domain
3. Add your first decision to `docs/decisions/`
4. Run your coding agent and watch it read the harness before making changes

### Alternatives

**AGENTS.md (manual)** — Many developers create their own `AGENTS.md` files by hand. This works for simple projects but lacks the structured layering (intake, architecture, test matrix, decisions) that makes agents truly productive. Choose manual AGENTS.md when your project is small enough that a single file captures everything.

**CodeSight** — A TypeScript CLI that generates AI context maps from your codebase, saving tokens by summarizing file relationships. It's a complementary tool — CodeSight helps agents understand code structure, while Repository Harness helps them understand product intent and process. Use both together for the best results.

**Cursor Rules / Claude Project Settings** — IDE-specific configuration files that guide AI behavior within Cursor or Claude. These are useful but tool-specific. Repository Harness is agent-agnostic — the same docs work whether your team uses Claude Code, Codex, Cursor, or any future tool that reads `AGENTS.md`.

### Verdict

Repository Harness is the most practical implementation of the "context engineering" philosophy I've seen in open source. The idea that agents need better repositories, not just better prompts, is going to define the next wave of AI development tooling — and this project is ahead of the curve.

At 782 stars and growing, with active releases every few days, it's clearly resonating with developers who've felt the pain of onboarding AI agents into real codebases. The Rust CLI is fast, the install process is one command, and the generated docs are genuinely useful for both humans and agents. For any fullstack team running a monorepo with React, NestJS, Django, or Go services, installing this harness is a 5-minute investment that pays off immediately in agent output quality.

The main risk is maintenance discipline — stale harness docs are worse than no docs. But that's a team process problem, not a tool problem. If you're serious about making AI coding agents work in production, Repository Harness is the structured foundation you're missing.
