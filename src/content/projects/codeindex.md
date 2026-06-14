---
name: codeindex
description: "Codeindex is a Python CLI that builds a temporal code knowledge graph with blast-radius impact scoring and semantic search for AI-assisted development."
url: https://github.com/scheidydude/codeindex
stars: 260
forks: 35
language: Python
tags: ["developer-tools", "code-analysis", "mcp-server", "ai-assisted-development", "static-analysis"]
featured: false
publishedAt: 2026-06-14
---

## Codeindex

### Overview

Codeindex is a Python CLI tool that builds a persistent knowledge graph of your codebase — tracking every dependency, symbol, and structural change over time. It calculates blast-radius impact scores for every file, provides semantic symbol search, and integrates directly with AI coding assistants through an MCP server. Point it at any project and you get a SQLite graph store, per-file risk metrics, and ten different ways to consume the data.

The project appeared on GitHub in late May 2026 and has been steadily climbing. At 260 stars and 35 forks in under a month, it's not a viral sensation — but it's the kind of tool that earns stars the hard way: one developer tries it on a messy codebase, tells a teammate, and the adoption spreads organically. The developer behind it, scheidydude, built something that fills a real gap between "run a linter" and "understand your entire architecture."

The core problem it solves: when you change a file in a large codebase, do you actually know what breaks? Most developers rely on gut feel, test suites (if they exist), or expensive CI runs to find out. Codeindex precomputes that answer. It parses your dependency graph, scores every file by how many other files depend on it (directly and transitively), and lets you query that risk before you touch anything. The blast score formula is `direct + (0.5 × transitive)` — simple enough to reason about, precise enough to be useful.

### Why it matters

AI coding agents are rewriting how developers interact with codebases. Claude Code, Cursor, Codex, and their peers are remarkably good at generating code — but they're blind to architecture. Ask an agent to refactor `auth.py` and it will happily do it without knowing that 16 other files import from it. The result: code that compiles, passes the tests the agent wrote, and breaks production three days later when an edge case in a transitive dependency surfaces.

Codeindex gives AI agents (and humans) structural awareness. Its MCP server exposes ten tools — blast-radius reports, dependency lookups, symbol search, temporal queries — that any MCP-compatible agent can call. Claude Code can ask "what's the blast radius of this file?" before making changes. It can search for a symbol by description ("the function that validates auth tokens") instead of scanning every file. This is the difference between an agent that writes code and one that understands code.

The tool also supports multiple languages out of the box — Python, JavaScript, TypeScript, Go, Ruby, Rust, Java, PHP, and more. In a typical fullstack project where you have a React frontend, a Go API server, and a Python ML service, one `codeindex analyze` command maps all three. That polyglot awareness is increasingly non-negotiable as teams consolidate around AI-assisted workflows.

### Key Features

**Blast-Radius Impact Scoring.** Every file gets a numeric score based on how many files depend on it. The formula weighs direct dependents at full value and transitive dependents at half, producing a risk metric that's easy to reason about. A file with 2 direct and 7 transitive dependents scores 8.5 — flagged as HIGH risk. Run `codeindex impact src/auth.py` before touching auth code and you'll know exactly how many files could break.

**Temporal Code Graph.** Codeindex doesn't just snapshot your current dependencies — it tracks how they change over time. Run `codeindex history` to backfill from git commits, then use `--as-of v1.2.0` on any query to see what the dependency graph looked like at a specific release. This is invaluable for understanding why a regression happened or what changed between versions.

**Hybrid Semantic + Keyword Search.** The `codeindex search` command fuses three retrieval signals using Reciprocal Rank Fusion: embedding similarity (if configured), FTS5 keyword matching over symbol names and docstrings, and graph expansion to include structurally adjacent symbols. If you don't set up an embedding endpoint, it degrades gracefully to keyword + graph — no crash, no config needed. You can search for "validate auth token" and find the exact function even if it's named `verify_jwt_claims`.

**MCP Server with 10 Tools.** Start `codeindex serve --mcp` and any MCP-compatible client (Claude Code, Cursor, custom agents) gets access to blast-radius reports, dependency lookups, symbol search, temporal impact queries, and more. The MCP integration is the reason this tool exists — it bridges the gap between static analysis and AI-assisted development.

**Symbol Index with CLAUDE.md Injection.** The `codeindex symbols` command maps every function, class, struct, and type to its file and line number. With `--claude-md`, it writes a compressed symbol summary directly into your CLAUDE.md so Claude Code loads it automatically. This cuts token usage by 60-90% on symbol-location tasks because the agent does an O(1) lookup instead of scanning every file.

**Zero-Dependency Architecture.** No build step, no npm, no Docker. The SQLite graph store uses Python's stdlib `sqlite3` module. The entire tool installs with `pip install codeindex` and runs anywhere Python runs. The optional semantic search requires an embedding endpoint, but everything else works out of the box.

**Interactive Visualization UI.** Run `codeindex serve --viz` and open a browser to see your codebase as a graph. Five visualization modes: 2D force-directed graph, 3D network, dependency matrix, treemap, and infrastructure graph. Useful for onboarding new team members or presenting architecture reviews — and much faster than drawing boxes in a slide deck.

### Use Cases

- **Pre-refactor risk assessment** — Before touching a core module, run `codeindex impact` to see exactly how many files depend on it. No more "let's refactor auth and hope nothing breaks."
- **AI agent context injection** — Configure the MCP server so Claude Code or Cursor can query your codebase structure in real time. The agent asks "where is the token validation?" and gets an instant answer instead of grep-scanning 400 files.
- **Release diff analysis** — Use `codeindex changed-since v2.0.0` to see exactly which files and dependency edges were added or removed since the last release. Combine with `high-blast` to identify risky changes before deploying.
- **Polyglot monorepo mapping** — In a repo with Python services, a Go CLI, and a TypeScript frontend, `codeindex analyze` builds a unified dependency graph across all three languages. No separate tools per language.
- **New developer onboarding** — The visualization UI lets newcomers explore the dependency graph interactively. Run `codeindex serve --viz` and point them at the treemap view to understand the codebase structure in minutes instead of days.
- **CI pipeline integration** — Add `codeindex high-blast --threshold 5` as a pre-merge check. If a PR touches high-blast files, flag it for additional review automatically.

### Pros and Cons

Pros:
- **Language-agnostic design.** Supports Python, JS/TS, Go, Ruby, Rust, Java, PHP, and more in a single tool. No need to install separate analyzers per language.
- **Zero dependencies beyond Python stdlib.** SQLite is built into Python. No Docker, no Node, no build step. Works on any machine with Python 3.9+.
- **MCP integration is the killer feature.** Ten tools exposed to any MCP-compatible AI agent. This is how coding agents should interact with codebases — with structural awareness, not blind grep.
- **Temporal queries are genuinely useful.** The `--as-of` flag on impact and search queries lets you see the dependency graph at any point in history. Useful for debugging regressions and understanding architectural drift.
- **Graceful degradation.** Semantic search falls back to keyword + graph if no embedding endpoint is configured. Nothing crashes, nothing requires config.

Cons:
- **260 stars means a small community.** Early-stage project with limited ecosystem. If you hit a bug, there may not be a Stack Overflow answer or a GitHub issue with a workaround.
- **No incremental analysis yet.** Running `codeindex analyze` re-scans the entire repo. On very large codebases (10,000+ files), the initial analysis takes time. The `--watch` flag exists but requires the `watchdog` package.
- **License is ambiguous.** The repo lists "Other" as its license, which may cause hesitation in corporate environments that require MIT, Apache, or BSD.

### Getting Started

```bash
# Install
pip install codeindex

# Analyze your repo (writes .codeindex/index.db + codeindex.json)
codeindex analyze ./myproject

# Build the symbol index
codeindex symbols ./myproject --inline --claude-md

# Check blast radius before changing a file
codeindex impact src/auth.py

# Search for a symbol by description
codeindex search "validate auth token"

# See what changed since a release
codeindex changed-since v1.0.0

# Launch interactive visualization
codeindex serve --viz --repo ./myproject
# Open http://localhost:8080

# Start MCP server for Claude Code
codeindex serve --mcp
```

Add the MCP server to `.claude/settings.json`:

```json
{
  "mcpServers": {
    "codeindex": {
      "command": "codeindex",
      "args": ["serve", "--mcp"]
    }
  }
}
```

### Alternatives

**Madge** — The classic dependency graph visualization tool for JavaScript/TypeScript projects. Madge generates visual dependency graphs and detects circular dependencies, but it's limited to JS/TS, has no blast-radius scoring, no temporal analysis, and no MCP integration. Choose Madge when you need a quick visual of a single JS project's imports. Choose Codeindex when you need structural awareness across a polyglot codebase with AI agent integration.

**Dependency-Cruiser** — A powerful dependency analysis tool for JavaScript projects with rule-based validation. You can define rules like "no files in /lib may import from /pages" and enforce them in CI. It's more mature than Codeindex and has a larger community, but it's JS-only and doesn't offer blast-radius scoring or temporal queries. Choose Dependency-Cruiser when you need architectural rule enforcement in a JS/TS project. Choose Codeindex when you need cross-language analysis and AI integration.

**CodeSee** — A commercial code visualization platform that auto-maps your architecture from git history. It offers dependency maps, service maps, and code reviews with architectural context. The visualizations are polished and the onboarding is smooth, but it's a SaaS product with pricing tiers and requires uploading your code to their servers. Choose Codesee when you want a managed, team-friendly architecture visualization. Choose Codeindex when you want a local-first, open-source tool that integrates directly with your AI coding workflow.

### Verdict

Codeindex is the kind of tool that doesn't get enough attention because it solves an unglamorous problem. Nobody posts "I just mapped my dependency graph!" on Twitter. But in a world where AI agents are writing more code than ever, structural awareness is the difference between agents that ship reliable software and agents that create technical debt faster than humans can pay it down. The blast-radius scoring alone is worth the install — knowing that `auth.py` touches 16 other files before you refactor it is the kind of insight that prevents production incidents. The MCP integration makes it genuinely useful for teams already using Claude Code or Cursor, and the polyglot support means you don't need a separate tool for each language in your stack. At 260 stars it's early days, but the architecture is clean, the CLI is well-designed, and the zero-dependency approach means adoption friction is near zero. If you're building anything larger than a toy project with AI assistance, install this today.
