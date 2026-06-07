---
name: sem
description: "Sem is a semantic version control tool built on Git that diffs by entities (functions, classes) instead of lines, with MCP server and 27-language support."
url: https://github.com/Ataraxy-Labs/sem
stars: 2196
forks: 74
language: Rust
tags: ["git", "developer-tools", "code-intelligence", "ai-agents", "tree-sitter"]
featured: false
publishedAt: 2026-06-07
---

## Sem

### Overview

Sem is a semantic version control tool that sits on top of Git and changes how you think about code changes. Instead of showing you "lines 45-52 changed," it tells you "function `authenticateUser` was modified." That's a fundamentally different — and better — way to understand what happened in a commit.

The project comes from Ataraxy Labs, a small team building agent-native infrastructure for software development. They've got a clear thesis: coding agents need structured, entity-level understanding of codebases, not raw text diffs. Sem is their first public tool in a stack that also includes `weave` (an entity-level merge driver), `inspect` (semantic code review), and `opensessions` (a tmux sidebar for coding agents). The 2,200+ stars it picked up since its February 2026 launch, including a spot on the Hacker News front page, suggest the idea resonates.

Under the hood, sem uses tree-sitter to parse 27 programming languages — TypeScript, JavaScript, Python, Go, Rust, Java, C/C++, C#, Ruby, PHP, Swift, Elixir, Vue, Svelte, and more. It extracts every function, class, method, interface, type, and enum as a discrete entity, then diffs at that level. Three-phase matching (exact ID, structural hash, fuzzy similarity) means it catches renames and moves, not just additions and deletions. The structural hashing also distinguishes cosmetic changes — whitespace, formatting, comment tweaks — from real logic changes. If you've ever stared at a 200-line diff trying to figure out what actually changed, you understand the value.

### Why it matters

Line-based diffs are a 50-year-old convention that made sense when code was C and changes were small. Today, a single pull request in a React/NestJS monorepo might touch 30 files across TypeScript, Python, and Go. AI coding agents generate changes in bulk, and reviewing those changes line-by-line is painful and error-prone. Sem gives you the abstraction layer you actually need: "these 4 functions changed, this class was renamed, this interface got a new method."

This connects to a broader shift in developer tooling. Tools like Cursor, Claude Code, and Codex are generating more code than ever, but the review and understanding layer hasn't kept up. Sem fills that gap with structured, machine-readable output (JSON, Markdown) that both humans and AI agents can consume. The built-in MCP server means coding agents can query entity relationships, impact analysis, and blame data directly — no parsing git output required.

For fullstack teams specifically, the multi-language support is the killer feature. Your React frontend writes TypeScript, your API layer is NestJS or Django, your microservices are in Go. Sem handles all of them with the same entity model, giving you a unified view of changes across your entire stack.

### Key Features

**Entity-Level Diffs.** The core feature. Run `sem diff` and instead of a traditional line-based diff, you get a structured list of entities that changed: which functions were added, modified, deleted, renamed, or moved. Each entity includes its file path, type, name, and line range. The verbose mode adds word-level inline highlights so you can see exactly what changed inside a function without wading through unchanged lines.

**Cross-File Impact Analysis.** Run `sem impact authenticateUser` and sem builds a dependency graph showing what breaks if that entity changes — direct dependents, transitive dependencies, and affected tests. This is the kind of analysis that usually requires a full IDE or language server, but sem does it from the command line with no project setup. For a NestJS service where changing a DTO might cascade through controllers, guards, and tests, this saves real debugging time.

**Entity-Level Blame.** `sem blame src/auth.ts` shows who last modified each function, class, and method — not who last touched each line. This is far more useful for understanding code ownership and history. When a production bug traces back to `validateToken`, you want to know who changed that function, not who last edited line 47 of the file.

**27-Language Support with Tree-Sitter.** Full entity extraction for TypeScript, JavaScript, Python, Go, Rust, Java, C/C++, C#, Ruby, PHP, Swift, Elixir, Vue, Svelte, Dart, Kotlin, OCaml, Scala, and more. Plus structured data formats (JSON, YAML, TOML, CSV, Markdown). Custom extensions via `.semrc` config. Extensionless files get auto-detected from content. This covers virtually every fullstack web development scenario.

**Drop-in Git Replacement.** Run `sem setup` once and `git diff` starts showing entity-level output automatically. Every tool that calls `git diff` — your editor, CI pipeline, pre-commit hooks — gets sem output without any configuration changes. A pre-commit hook also shows the entity-level blast radius of staged changes before you commit.

**MCP Server for AI Agents.** Ships with an MCP server exposing 6 tools: `sem_entities`, `sem_diff`, `sem_blame`, `sem_impact`, `sem_log`, `sem_context`. Add it to Claude Code, Cursor, or any MCP-compatible agent and the agent can query your codebase's entity structure, dependencies, and change history directly. The `sem context` command is particularly useful — it generates token-budgeted context for LLMs, fitting an entity plus its dependencies into a strict token limit.

**Multiple Output Formats.** Plain text (git status style), JSON (for CI pipelines and programmatic consumption), and Markdown (for PR descriptions and reports). The JSON output is well-structured with entity IDs, change types, line ranges, and dependency information. This makes it trivial to build custom tooling or integrate sem into existing workflows.

### Use Cases

- **Code review for AI-generated changes** — When Claude Code or Codex modifies 15 files in your React monorepo, `sem diff --format json` gives you a structured summary of which entities changed, making it practical to review bulk AI output without reading every line.

- **Impact analysis before refactoring** — Before renaming a shared TypeScript interface used across your NestJS API and React frontend, `sem impact InterfaceName` shows you exactly which files, functions, and tests will break.

- **Cross-stack change tracking** — In a project with a Go microservice, Django admin, and React frontend, sem gives a unified entity-level view of changes across all three languages in a single diff.

- **CI pipeline integration** — Run `sem diff --format json` in your CI pipeline to automatically generate structured change summaries, detect blast radius, and flag high-impact modifications for mandatory review.

- **Agent-powered code understanding** — Add the MCP server to your coding agent's config so it can query entity relationships, dependencies, and history without parsing raw git output or relying on language servers.

- **Onboarding and code archaeology** — `sem log functionName` shows how a specific function evolved through git history, with content diffs between versions. Far more useful than `git log -p` for understanding why code looks the way it does.

### Pros and Cons

Pros:
- Genuinely novel approach to a problem every developer faces daily. The entity-level abstraction is more useful than line-based diffs for anything beyond trivial changes.
- Works in any Git repo with zero setup. No configuration files, no project-level installation, no language server required.
- The MCP server integration makes this immediately useful for AI-assisted development workflows, which is where the industry is heading fast.
- Rust binary is fast. Parsing a large TypeScript codebase with tree-sitter happens in seconds, not minutes.

Cons:
- Still early. 2,200 stars and 74 forks suggest active interest but the tool is pre-1.0. Expect rough edges, especially with less common languages or complex project structures.
- The three-phase matching (exact, structural hash, fuzzy) can occasionally misidentify entity relationships in heavily refactored code where names and structure both change simultaneously.
- Tree-sitter grammars vary in quality across languages. TypeScript and Python extraction is rock-solid; some less common languages (Fortran, Nix) may have edge cases.

### Getting Started

```bash
# Install via Homebrew (macOS/Linux)
brew install sem-cli

# Or install via npm
npm install --save-dev @ataraxy-labs/sem

# Or build from source (requires Rust)
cargo install --git https://github.com/Ataraxy-Labs/sem sem-cli

# See what entities exist in your project
sem entities

# Entity-level diff of your working changes
sem diff

# Staged changes only
sem diff --staged

# Impact analysis for a specific entity
sem impact authenticateUser

# Entity-level blame
sem blame src/auth.ts

# Track how a function evolved over time
sem log authenticateUser -v

# Replace git diff with sem (one-time setup)
sem setup

# JSON output for CI/agent consumption
sem diff --format json

# Token-budgeted context for LLMs
sem context authenticateUser --budget 4000
```

### Alternatives

**git diff + delta/bat** — The traditional approach. Line-based diffs with syntax highlighting and paging. Fine for small changes and single-language projects. Choose this if you primarily work in one language and your changes are small enough that line-based diffs are manageable. Sem's advantage shows up in multi-file, multi-language changes.

**SemanticDiff (VS Code extension)** — A VS Code extension that provides semantic diffs for select languages inside the editor. More convenient if you never leave VS Code, but limited to what the editor can parse and doesn't have CLI/CI/MCP integration. Sem works everywhere — terminal, CI, agents, editors — because it's a standalone binary.

**CodeSee** — A SaaS code visualization platform that maps codebases and shows change impact. More visual and interactive, but requires uploading your code to a third-party service. Sem is local-first, runs entirely on your machine, and works with any Git repo. Choose CodeSee if you want visual architecture diagrams; choose sem if you want fast, local, agent-compatible semantic diffs.

### Verdict

Sem is the most interesting developer tool I've seen this month. The core insight — that diffs should be about entities, not lines — is obvious in hindsight but nobody has executed it this well before. The tree-sitter foundation means it actually works across real polyglot codebases, not just toy demos. And the MCP server integration makes it immediately relevant for the AI-assisted development workflows that are becoming standard. If you're a fullstack developer working across TypeScript, Python, Go, or any combination thereof, install sem and run `sem setup` today. It's one of those tools that makes you wonder how you worked without it. The 2,200 stars in four months and HN front page appearance suggest the community agrees.
