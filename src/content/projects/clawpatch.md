---
name: clawpatch
description: "Clawpatch is an AI-powered code review CLI that maps repos into semantic feature slices, finds bugs, and opens fix PRs — supporting 15+ languages and every major AI provider."
url: https://github.com/openclaw/clawpatch
stars: 743
forks: 109
language: TypeScript
tags: ["code-review", "ai-agents", "cli", "dev-tools", "automation"]
featured: false
publishedAt: 2026-06-15
---

## Clawpatch

### Overview

Clawpatch is an automated code review CLI that actually fixes the problems it finds. It hit 700+ GitHub stars within a month of its May 2026 launch, which is notable for a developer tool that doesn't have a flashy landing page or viral demo video. The traction comes from word of mouth among developers who are tired of code review tools that surface problems but leave the remediation to you.

The project comes from the openclaw organization, which also maintains agent skills and an ACP (Agent Coding Protocol) compatibility layer. That context matters — clawpatch isn't a standalone product trying to sell you a SaaS subscription. It's part of a growing ecosystem of open-source tools designed to make AI coding agents actually useful in real development workflows, not just impressive in demo scenarios.

The core problem clawpatch addresses is the gap between "AI can review code" and "AI can improve code safely." Most AI code review tools generate a list of findings and leave you to sort through false positives and manually apply fixes. Clawpatch takes a different approach: it maps your entire repository into semantic feature slices, reviews each slice with an AI provider of your choice, persists findings with triage states, and then runs explicit fix loops that validate changes against your actual test suite before presenting them. The key word is "explicit" — it doesn't auto-commit or auto-push. You stay in control.

### Why it matters

Code review is one of the biggest bottlenecks in modern development teams. A 2025 McKinsey study found that developers spend roughly 30% of their time on code review activities, and that number climbs in organizations with strict quality gates. Meanwhile, AI code review tools have proliferated, but most of them operate in isolation — they scan a diff, generate comments, and hope someone acts on them.

Clawpatch fits into a different mental model. It treats code review as a continuous, project-aware process rather than a one-shot diff scan. By mapping your entire codebase into semantic slices (routes, components, services, tests), it understands context that a simple diff reviewer misses. A Next.js route handler gets reviewed with awareness of its related React components, API types, and test files. A Django view gets reviewed alongside its serializers and URL patterns.

For fullstack developers working across React, NestJS, Django, and Go, this multi-language, multi-framework awareness is the real value proposition. You don't need separate review tools for each part of your stack.

### Key Features

**Semantic Codebase Mapping.** Clawpatch doesn't just scan files — it builds a structural map of your project. It understands Next.js app routes, React Router configurations, Go packages from `go list`, Django views and Flask endpoints, Laravel controllers and routes, Rust crate structures, and more. This map becomes the foundation for contextual reviews that understand how code fits together, not just what a single file contains.

**Multi-Provider AI Backend.** You're not locked into a single AI model. Clawpatch supports Codex CLI (the default), Claude Code, Cursor Agent, Grok Build, Pi, OpenCode, and any ACP-compatible agent. It also supports MiniMax's OpenAI-compatible API for headless review scenarios. Provider calls use strict JSON schemas, so the output is structured and parseable — not free-form text you have to interpret.

**Findings Lifecycle Management.** Each finding gets a persistent ID, severity level, triage status, and history. You can mark findings as false positives, add notes, and revalidate individual findings or batch-revalidate all open ones. This lifecycle approach means clawpatch works as a long-running quality tool, not a fire-and-forget scanner. Your review state lives in `.clawpatch/` and survives across sessions.

**Explicit Fix Loops with Validation.** When you run `clawpatch fix --finding <id>`, it plans and applies a fix, then runs your configured validation commands (tests, lint, typecheck) against the result. It doesn't commit, push, or open PRs unless you explicitly tell it to with `open-pr`. This safety model matters for production codebases where an overeager AI can cause more harm than the bug it's fixing.

**CI Integration.** The `clawpatch ci` command initializes, maps, reviews, writes a Markdown report, and appends a GitHub step summary — all in one command. This makes it easy to add AI-powered review to your existing CI pipeline without rearchitecting your workflow. The `--since origin/main` flag limits review to changed files, keeping CI runs fast.

**Deslopify Mode.** Beyond bug detection, clawpatch has a `--mode deslopify` flag that focuses specifically on provable code quality improvements — dead code, unnecessary complexity, inconsistent patterns. It's a pragmatic take on the "AI slop" problem that's emerging as more developers use AI assistants to generate code.

**Framework-Aware Validation.** When clawpatch fixes something, it doesn't just run a generic test command. It picks validation targets based on the framework context — `dotnet test` for .NET projects, pytest for Python, ExUnit for Elixir, RSpec for Ruby. This framework awareness extends to the mapping phase, where it understands ASP.NET Core controllers, Phoenix contexts, Ecto migrations, and Laravel form requests.

### Use Cases

- **Fullstack teams with polyglot codebases** — If your frontend is React/Next.js, your API is NestJS or Django, and your services are in Go, clawpatch maps and reviews all of them with a single tool. No need for separate review setups per language.

- **CI/CD quality gates** — Add `clawpatch ci` to your GitHub Actions workflow to get automated AI review on every PR. The structured JSON output integrates with existing reporting tools.

- **Solo developers and small teams without dedicated reviewers** — When you don't have a team of senior engineers to review every PR, clawpatch acts as a consistent, tireless reviewer that catches issues you might miss after staring at the same code for hours.

- **Legacy codebase modernization** — Run clawpatch against an existing codebase to surface technical debt, dead code, and potential bugs systematically. The findings lifecycle management means you can work through issues over multiple sprints.

- **Open source maintainers** — Use clawpatch to review incoming contributions before merging. The explicit fix-and-PR workflow means you can apply suggested fixes and open follow-up PRs without manually editing contributor code.

### Pros and Cons

Pros:

- Multi-language, multi-framework support covers the actual tech stack most fullstack developers use, not just JavaScript or just Python. The mapping engine understands Next.js, Django, Flask, Laravel, Phoenix, Go packages, Rust crates, and .NET projects.
- The explicit safety model (no auto-commit, no auto-push, fix requires finding ID) makes it production-safe. You're not gambling on AI-generated changes landing in your main branch without review.
- Provider-agnostic design means you can use whichever AI model gives the best results for your codebase. Switching from Codex to Claude Code is a config change, not a migration.
- The findings lifecycle (persist, triage, revalidate) turns one-shot reviews into a continuous quality process. This is how real teams actually work through technical debt.

Cons:

- Early CLI status means the interface is command-line only. There's no web dashboard, no VS Code extension, no GitHub integration beyond CI step summaries. Teams that prefer visual review workflows will find it limiting.
- The fix loop still requires manual review of worktree changes. The README is explicit about this — `fix` doesn't land changes. That's the right safety posture, but it means the "automated" part has a manual step in the middle.
- Provider costs can add up. Each review and fix cycle makes API calls to your chosen AI provider. Large codebases with many features will burn through tokens quickly, especially with premium models like Claude or GPT-4.

### Getting Started

```bash
# Install globally
pnpm add -g clawpatch

# Initialize in your project
clawpatch init

# Map your codebase into semantic features
clawpatch map

# Review with parallel jobs
clawpatch review --limit 5 --jobs 3

# Review specifically for code quality improvements
clawpatch review --mode deslopify --limit 3

# See the next actionable finding
clawpatch next

# Inspect a specific finding
clawpatch show --finding <id>

# Fix a specific finding (validates against your tests)
clawpatch fix --finding <id>

# Open a PR with the fix
clawpatch open-pr --patch <patchAttemptId> --draft

# Run as CI step
clawpatch ci --since origin/main --output clawpatch-report.md
```

Check that your provider is available:

```bash
clawpatch doctor
```

### Alternatives

**CodeRabbit** — A hosted AI code review service that integrates directly with GitHub PRs. CodeRabbit is more polished and requires zero setup, but it's a SaaS product with per-seat pricing and no self-hosting option. Better choice if you want review comments inline on PRs without managing a CLI tool.

**Qodo Merge (formerly PR-Agent)** — Another AI code review tool with GitHub integration and both open-source and hosted versions. Qodo has broader language support and a more mature product, but it's focused on review comments rather than the fix-and-validate loop that clawpatch provides. Better choice if you want a battle-tested review tool with team management features.

**Sweep AI** — An AI junior developer that writes code from issues and opens PRs. Sweep is more opinionated — it tries to implement features, not just review code. It's a complement to clawpatch rather than a direct replacement. Better choice if you want AI-generated code from scratch rather than AI-reviewed existing code.

### Verdict

Clawpatch is the code review tool I'd build if I were starting from scratch in mid-2026. The semantic mapping approach is smarter than diff-based review, the multi-provider support means you're not locked into one AI vendor, and the explicit safety model respects the reality that AI-generated fixes need human oversight. At 700 stars in its first month with only 2 open issues, the early community is engaged and the maintainers are responsive. It's early-stage CLI software, so expect rough edges — but for fullstack teams drowning in PR backlogs across multiple languages and frameworks, clawpatch is worth adding to your workflow today. The `deslopify` mode alone makes it worth running against any codebase that's been touched by AI assistants.
