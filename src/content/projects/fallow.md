---
name: fallow
description: "Fallow is a Rust-native codebase intelligence engine for TypeScript and JavaScript — dead code detection, duplication analysis, PR risk gates, and structured output for humans, CI, and AI agents."
url: https://github.com/fallow-rs/fallow
stars: 3281
forks: 102
language: Rust
tags: ["static-analysis", "typescript", "developer-tools", "code-quality", "ai-agents"]
featured: false
publishedAt: 2026-06-07
---

## Fallow

### Overview

Fallow is a codebase intelligence engine for TypeScript and JavaScript projects, written in Rust for speed. It hit 3,200 GitHub stars within three months of its March 2026 launch, which is notable for a static analysis tool that isn't backed by a major company or riding an AI hype wave. The growth is organic — developers discovering it through word of mouth and CI pipeline recommendations.

The project is built by a team that clearly understands the pain of maintaining large JS/TS codebases. The tagline — "Deterministic codebase intelligence" — is a deliberate contrast to the AI-everything trend. Fallow doesn't use AI to generate findings. It uses graph-based static analysis to produce deterministic, traceable evidence that humans and agents can inspect. That distinction matters more than it sounds. When your CI pipeline fails a PR, you want to know exactly why, with reproducible results. Fallow delivers that.

The core problem Fallow solves: your TypeScript codebase has dead code nobody dares delete, duplicated logic nobody remembers writing, circular dependencies that make refactoring terrifying, and complexity hotspots that cost you hours in every PR review. ESLint checks files. TypeScript checks types. Fallow checks the codebase as a system — connections, boundaries, hygiene, and architecture. It answers questions like "what changed?", "what got riskier?", "what should I review first?", and "what can be safely removed?" with structured data instead of gut feelings.

### Why it matters

The timing connects to a real shift in how teams build software. AI coding tools — Claude Code, Cursor, Copilot, Codex — are accelerating code creation. But they're not eliminating the need for review, cleanup, or architecture maintenance. If anything, they're making the problem worse. AI-generated code tends to duplicate existing patterns, introduce unused abstractions, and cross architectural boundaries without understanding why those boundaries exist. Teams using AI coding tools need deterministic analysis more than teams writing code by hand.

Fallow fills that gap with a tool that's built for the AI-assisted development era. It has an MCP server, an LSP, structured JSON output, and typed output contracts so AI agents can query the codebase directly. The agent integration isn't bolted on — it's a first-class feature. When Claude Code or Cursor generates a change, Fallow can audit it, flag risky complexity, detect duplication, and suggest safe cleanup actions. That's a workflow that didn't exist six months ago, and Fallow is one of the first tools designed around it.

The Rust implementation matters too. Running `npx fallow audit` on a mid-size TypeScript project completes in under a second. No Node.js runtime required for the static analysis. No config needed for the first run. 118 framework plugins handle Next.js, Remix, Astro, Angular, and every other JS/TS framework automatically. That zero-config, sub-second experience is what gets developers to actually use a tool instead of ignoring it.

### Key Features

**Dead Code Detection.** Fallow identifies unused files, unused exports, unused dependencies, unused types, unused enum members, unused class members, stale suppression comments, and code paths that appear safe for removal. It handles real-world complexity — arrow-wrapped dynamic imports like `React.lazy()`, script multiplexers like `concurrently`, JSDoc visibility tags, and monorepo workspace packages. The analysis is granular enough to distinguish between "this export is used" and "this export is used only in tests" without manual configuration.

**Duplication Analysis.** Four detection modes — strict (exact tokens), mild (AST-based, the default), weak (different string literals), and semantic (renamed variables and literals) — catch copy-pasted code blocks across your codebase. The suffix-array algorithm avoids the quadratic pairwise comparison that makes other duplication tools slow. Repeated atomic function calls to existing shared abstractions are filtered by default, so you don't get false positives on normal usage patterns.

**PR Risk Gate.** The `fallow audit` command compares changed files against the base branch and emits a verdict: pass, warn, or fail. It splits findings into "introduced by this PR" and "pre-existing" so reviewers know exactly what's new. Per-analysis baselines let you suppress known legacy issues without ignoring new ones. The GitHub Action posts inline review comments with suggestions, sticky PR summaries, and SARIF uploads for GitHub Code Scanning.

**Health Scoring.** A compact 0-100 health score with letter grade covers maintainability, complexity, duplication, dependency hygiene, and architecture. File-level maintainability indexes, git-churn-weighted hotspots, bus factor analysis, and ranked refactoring targets give teams concrete priorities. Trend tracking compares scores over time so you know if the codebase is getting better or worse.

**Architecture Boundary Enforcement.** Zero-config presets for bulletproof, layered, hexagonal, and feature-sliced architectures detect circular dependencies, boundary violations across layers and modules, re-export chains, and cross-package cycles in monorepos. You don't need to write custom rules — Fallow understands common architectural patterns and flags violations automatically.

**Agent-Ready Integration.** An MCP server, an LSP, and typed JSON output contracts (`import type { CheckOutput } from "fallow/types"`) let AI agents query the codebase directly. Every issue carries a machine-actionable `actions` array with an `auto_fixable` flag. Agents can ask "who imports this symbol?", "why is this export considered unused?", "what changed in this PR?", and "what cleanup action is safest?" and get structured, traceable answers.

**Runtime Intelligence (Optional).** The paid Fallow Runtime layer merges production execution evidence — hot paths, cold code, runtime-weighted health, stale feature flags — into the static analysis. V8 coverage dumps and Istanbul `coverage-final.json` files become input for smarter PR review and safer deletion decisions. Static analysis tells you what's connected; runtime intelligence tells you what actually runs.

### Use Cases

- **PR review automation** — Teams using GitHub Actions or GitLab CI can gate every pull request with `fallow audit`, getting inline review comments, SARIF uploads, and pass/warn/fail verdicts before code merges. Especially valuable when AI coding tools generate large changesets that humans can't review line by line.

- **Legacy codebase cleanup** — Projects with years of accumulated technical debt use `fallow dead-code` and `fallow dupes` to identify safe removal candidates and duplicated logic. The grouped output (by CODEOWNERS, directory, or workspace package) lets teams triage cleanup work across squads.

- **AI agent code review** — Development teams using Claude Code, Cursor, or Copilot integrate Fallow via MCP or JSON output so agents can self-audit before submitting changes. The agent runs `fallow audit --format json`, inspects findings, applies safe fixes, and hands the result to a human reviewer with better evidence.

- **Monorepo health monitoring** — Teams running Turborepo, Nx, or pnpm workspaces use `fallow health --group-by package --score` to track per-package quality scores, detect cross-package circular dependencies, and identify which workspace packages need refactoring attention.

- **Onboarding and codebase exploration** — New team members use `fallow health --hotspots` to understand where the risky code lives, `fallow dead-code` to find what's unused, and `fallow dupes` to see where logic is duplicated. The structured output replaces tribal knowledge with data.

### Pros and Cons

Pros:
- Sub-second analysis on mid-size projects thanks to the Rust implementation. No Node.js runtime required for static analysis. Zero config for the first run.
- Deterministic, reproducible findings — no AI hallucinations in the analysis itself. Every issue is traceable with evidence, which makes it trustworthy for CI gates.
- Excellent agent integration with MCP server, LSP, and typed JSON output contracts. Built for the AI-assisted development era, not bolted on after the fact.
- 118 framework plugins covering Next.js, Remix, Astro, Angular, and every major JS/TS framework. The framework detection is automatic.

Cons:
- The optional Runtime Intelligence layer is a paid team feature. Free users get static analysis only, which means no production execution evidence for hot-path review and cold-path deletion.
- TypeScript and JavaScript only. If your stack includes Python, Go, or Rust codebases, you'll need separate tools for those languages.
- The analysis surface is deep and the CLI has many flags. New users might feel overwhelmed by the options despite the zero-config first-run experience. The documentation is thorough but dense.

### Getting Started

```bash
# One-off audit (no install needed)
npx fallow audit

# Install as a dev dependency
npm install --save-dev fallow

# Full codebase analysis: cleanup + duplication + health
npx fallow

# Dead code detection
npx fallow dead-code

# Duplication analysis
npx fallow dupes

# Health score with hotspots and refactor targets
npx fallow health --score --hotspots --targets

# PR audit with JSON output (for CI or agents)
npx fallow audit --format json

# Preview automatic cleanup
npx fallow fix --dry-run
```

For AI agent integration, set up the MCP server:

```bash
# The MCP server is included with the npm package
# Add to your MCP config:
{
  "mcpServers": {
    "fallow": {
      "command": "npx",
      "args": ["fallow", "mcp"]
    }
  }
}
```

### Alternatives

**Knip** — A TypeScript/JavaScript dead code detector that's simpler and more focused. Knip finds unused files, exports, and dependencies but doesn't do duplication analysis, complexity scoring, architecture enforcement, or PR risk gating. Better choice if you only need dead code detection and want a lighter tool with fewer moving parts.

**SonarQube/SonarCloud** — The enterprise standard for code quality with broad language support. SonarQube covers more languages and has a mature ecosystem of plugins, but it's heavier to set up, requires a running server, and its JavaScript/TypeScript analysis is less granular than Fallow's. Better choice if you need cross-language quality reporting in a large enterprise environment.

**Semgrep** — A fast, open-source static analysis tool focused on security patterns and custom rules. Semgrep excels at finding security vulnerabilities and enforcing coding standards but doesn't do dead code detection, duplication analysis, or architecture boundary enforcement. Better choice if security scanning is your primary concern and codebase health is secondary.

### Verdict

Fallow is the most interesting static analysis tool I've seen for the TypeScript ecosystem in years. The Rust-native speed, zero-config experience, and first-class agent integration make it genuinely useful in a way that heavier tools like SonarQube never were for smaller teams. The 3,200 stars in three months with no major company backing suggests the developer community sees real value in "deterministic codebase intelligence" — especially as AI-generated code makes quality analysis more important, not less. If you're maintaining a TypeScript or JavaScript project of any meaningful size, Fallow is worth running once to see what it finds. The dead code and duplication results alone will probably surprise you.
