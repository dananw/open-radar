---
name: codebase-memory-mcp
description: "High-performance code intelligence MCP server that indexes codebases into persistent knowledge graphs — 158 languages, sub-ms queries, 99% fewer tokens for AI coding agents."
url: https://github.com/DeusData/codebase-memory-mcp
stars: 4886
forks: 464
language: C
tags: ["mcp-server", "code-intelligence", "ai-agents", "developer-tools", "knowledge-graph"]
featured: false
publishedAt: 2026-06-18
---

## codebase-memory-mcp

### Overview

codebase-memory-mcp is a code intelligence MCP server that builds persistent knowledge graphs from source code repositories. It hit 4,800 GitHub stars by mid-June 2026, and the trajectory makes sense — every team using Claude Code, Codex, or Gemini CLI runs into the same wall: the agent reads files one at a time, burns through tokens, and loses structural context between queries. This tool fixes that by pre-indexing the entire codebase into a graph database and serving structural queries in under a millisecond.

The project is built by DeusData in pure C with zero runtime dependencies. The binary vendors 158 tree-sitter grammars and a lightweight implementation of language-server-style type resolution for 9 languages (Python, TypeScript, JavaScript, Go, C, C++, Java, Kotlin, Rust, PHP, C#). There's also a published research paper behind it — arXiv:2603.27277 — which evaluated the approach across 31 real-world repositories and measured 83% answer quality with 10x fewer tokens and 2.1x fewer tool calls compared to file-by-file exploration.

The core problem it solves is token waste. When an AI agent explores a codebase naively — grepping, reading files, grepping again — it burns hundreds of thousands of tokens on structural questions that a graph query can answer in a single call. Five structural queries consumed ~3,400 tokens through codebase-memory-mcp versus ~412,000 tokens through file-by-file search. That's a 99.2% reduction. For teams running hundreds of agent sessions per day, the cost savings alone justify the tool.

### Why it matters

The MCP ecosystem is exploding. Every week brings a new MCP server for databases, APIs, or file systems. But code intelligence — understanding what calls what, where a function is defined, which services talk to each other — has been the missing piece. Most AI coding agents still treat codebases as flat file collections. They grep for function names, read surrounding context, and hope for the best. That approach works for small projects and falls apart at scale.

codebase-memory-mcp fills this gap by giving agents a structural model of the code. Instead of reading 50 files to understand the call chain, the agent runs a single graph traversal query. The tool indexes everything: functions, classes, call chains, HTTP routes, cross-service links, data flows, and even infrastructure-as-code (Dockerfiles, Kubernetes manifests). For fullstack developers working across React frontends, NestJS backends, Django services, and Go microservices, this means the agent can trace a request from the API route through the service layer to the database query without burning context windows.

The design decision to stay LLM-free is smart. Other code graph tools embed their own language model for natural-language-to-query translation. codebase-memory-mcp instead relies on the agent you're already talking to — Claude, GPT, Gemini — to translate your question into a graph query. No extra API keys, no extra cost, no model configuration. It's a pure structural backend that does one thing extremely well.

### Key Features

**158-Language Tree-Sitter Indexing.** The binary ships with vendored tree-sitter grammars for 158 languages compiled directly in. There's nothing to install, nothing that breaks on version mismatches. When you run `index_repository`, it parses every file into an AST, extracts symbols (functions, classes, methods, interfaces), and builds a knowledge graph with typed edges (CALLS, IMPORTS, DEFINES, IMPLEMENTS, INHERITS). For a Django project with Python backends and TypeScript frontends, both sides get full structural coverage.

**Hybrid LSP Semantic Resolution.** Beyond raw AST parsing, the tool implements lightweight language-server-style type resolution for 9 languages. This means it can follow method calls through class hierarchies, resolve generic type parameters, handle JSX component dispatch, and track PHP namespace resolution. For TypeScript projects — which make up the majority of modern fullstack codebases — this gives you type-aware call graph traversal that goes far beyond what grep or basic AST tools provide.

**Sub-Millisecond Graph Queries.** The knowledge graph is stored in SQLite with optimized indexes. Cypher-like queries (`MATCH (f:Function)-[:CALLS]->(g) WHERE f.name = 'ProcessOrder' RETURN g.name`) execute in under 1 millisecond. Name searches with regex patterns complete in under 10ms. Dead code detection across the full graph takes about 150ms. The Linux kernel — 28 million lines of code, 75,000 files — indexes in 3 minutes producing 4.81 million nodes and 7.72 million edges.

**11-Agent Auto-Configuration.** The `install` command detects every supported coding agent on your system and configures MCP entries, instruction files, and pre-tool hooks for each. It works with Claude Code, Codex CLI, Gemini CLI, Zed, OpenCode, Antigravity, Aider, KiloCode, VS Code, OpenClaw, and Kiro. For Claude Code specifically, it sets up pre-tool hooks that augment grep and glob results with graph context — so even when the agent falls back to file search, it gets structural hints.

**Team-Shared Graph Artifacts.** You can commit a single zstd-compressed snapshot of the knowledge graph (`.codebase-memory/graph.db.zst`) to your repository. Teammates who clone the repo skip the full reindex — the artifact is imported and only their local diff is indexed incrementally. The compression ratio is typically 8–13:1, and a `.gitattributes` line with `merge=ours` is auto-created to prevent merge conflicts on the binary file.

**Cross-Service Linking.** For microservice architectures, the tool detects HTTP call sites and matches them to route definitions across service boundaries. It supports REST, gRPC, GraphQL, and tRPC detection, plus channel detection for Socket.IO, EventEmitter, and generic pub-sub patterns across 8 languages. This means an agent can trace a frontend API call through the NestJS controller to the Django service it communicates with — all through graph queries.

**Built-in 3D Graph Visualization.** The optional UI variant runs an interactive 3D visualization of your knowledge graph at `localhost:9749`. It uses multi-galaxy layouts for cross-repo architecture visualization, so you can see how services connect, which modules are tightly coupled, and where the dead code lives. It's the kind of tool you pull up in an architecture review meeting.

### Use Cases

- **Onboarding onto unfamiliar codebases** — New team members (or their AI agents) can ask "what calls the payment processor?" and get a complete call chain in milliseconds instead of spending an hour reading files.
- **Refactoring impact analysis** — Before renaming a function or changing a database schema, trace all callers and affected services through the graph. The `detect_changes` tool maps uncommitted changes to affected symbols with risk classification.
- **Dead code detection** — Find functions with zero callers across the entire codebase, excluding entry points. Useful for cleanup sprints before major releases.
- **Cross-service debugging** — Trace a request from the React frontend through the NestJS API gateway to the Django microservice and the Go worker, all through graph queries that return structured results.
- **Architecture documentation** — The `get_architecture` tool returns languages, packages, entry points, routes, hotspots, boundaries, layers, and clusters in a single call. Use it to generate or verify architecture decision records.
- **CI/CD integration** — Index the codebase in CI, run structural queries as quality gates, and flag new dead code or broken call chains before they ship.

### Pros and Cons

Pros:

- **Dramatic token reduction.** The arXiv paper documents 99.2% fewer tokens for structural queries. For teams spending significant amounts on AI agent API calls, this tool pays for itself immediately.
- **Zero dependencies, single binary.** No Docker, no runtime, no API keys. Download, run `install`, restart your agent. The entire setup takes under a minute.
- **Research-backed approach.** The published paper (arXiv:2603.27277) evaluated across 31 real repositories with rigorous methodology. This isn't a weekend project — it's a well-engineered system with measurable results.
- **Broad agent support.** Works with 11 different coding agents out of the box. If you switch from Claude Code to Codex CLI next month, the same knowledge graph serves both.

Cons:

- **Indexing time for large monorepos.** While the Linux kernel indexes in 3 minutes, very large monorepos with millions of lines across hundreds of packages may take longer. The fast-index mode helps but produces fewer nodes.
- **C binary distribution complexity.** While the binary is static and self-contained, some corporate environments are uncomfortable running unsigned C binaries. The SLSA 3 provenance and VirusTotal scanning help, but security reviews may still slow adoption.
- **No built-in LLM.** This is a deliberate design choice, but it means the tool is only as good as the agent's ability to formulate graph queries. If your agent doesn't know to use `trace_path` instead of `grep`, you won't get the benefits.

### Getting Started

```bash
# One-line install (macOS / Linux)
curl -fsSL https://raw.githubusercontent.com/DeusData/codebase-memory-mcp/main/install.sh | bash

# With 3D graph visualization UI
curl -fsSL https://raw.githubusercontent.com/DeusData/codebase-memory-mcp/main/install.sh | bash -s -- --ui

# Or via package managers
npm install -g codebase-memory-mcp
pip install codebase-memory-mcp
brew install deusdata/tap/codebase-memory-mcp

# Index your project (after restarting your agent)
# Just say: "Index this project"

# Or use the CLI directly
codebase-memory-mcp cli index_repository '{"path": "."}'
codebase-memory-mcp cli search_graph '{"name_pattern": ".*Handler.*"}'
codebase-memory-mcp cli trace_path '{"function_name": "ProcessOrder", "direction": "inbound"}'

# Enable auto-indexing on MCP session start
codebase-memory-mcp config set auto_index true

# Update to latest version
codebase-memory-mcp update
```

### Alternatives

**Graphify (by Sourcegraph)** — Graphify is Sourcegraph's code graph offering, integrated into their broader code intelligence platform. It's stronger for enterprise deployments with existing Sourcegraph infrastructure, but it requires a Sourcegraph instance and doesn't work as a standalone MCP server. Choose Graphify if your team already pays for Sourcegraph; choose codebase-memory-mcp if you want a self-contained, zero-infrastructure solution.

**Aider's repository map** — Aider generates a repository map by parsing files with tree-sitter and feeding the structure to the LLM. It's simpler and built into Aider's workflow, but it regenerates the map on every session and doesn't persist relationships. For Aider-only users working on small projects, the built-in map may be sufficient. For multi-agent setups or large codebases, codebase-memory-mcp's persistent graph is a significant upgrade.

**Ctags / Universal Ctags** — The classic approach to code indexing. Ctags generates tag files that editors use for jump-to-definition. It's fast and universally supported, but it only captures definitions — no call graphs, no cross-service linking, no semantic type resolution. If all you need is "go to definition," ctags is fine. If you need "what calls this function across three services," you need a graph.

### Verdict

codebase-memory-mcp is the most impactful developer tool I've seen in the MCP ecosystem this year. The 99.2% token reduction stat alone makes it worth evaluating, but the real value is structural — it gives AI agents a model of your code that they simply don't have otherwise. Every fullstack team running Claude Code or Codex on a non-trivial codebase should try this for a week and measure the difference. The zero-dependency, single-binary distribution makes adoption frictionless, the 11-agent support means you're not locked into one tool, and the published research gives you confidence this isn't just vibes-based engineering. At nearly 5,000 stars and climbing, the community agrees: code intelligence is the missing layer in the AI coding stack, and this tool delivers it.
