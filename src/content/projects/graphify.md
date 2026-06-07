---
name: graphify
description: "Graphify turns any codebase into a queryable knowledge graph for AI coding assistants. Map your fullstack project — code, SQL schemas, docs — in one command."
url: https://github.com/safishamsi/graphify
stars: 61623
forks: 6376
language: Python
tags: ["knowledge-graph", "ai-tools", "code-analysis", "developer-productivity", "rag"]
featured: false
publishedAt: 2026-06-08
---

## Graphify

### Overview

Graphify is an AI coding assistant skill that maps your entire project — source code, SQL schemas, documentation, PDFs, images, even videos — into a queryable knowledge graph. Run `/graphify .` in your terminal and you get an interactive HTML visualization, a markdown report with architectural highlights, and a JSON graph file your AI tools can query without re-reading your files. It hit 61,000 GitHub stars in two months after its April 2026 launch, making it one of the fastest-growing developer tools of the year.

The project is built by Safi Shamsi, a Y Combinator S26 founder who previously worked on large-scale knowledge graph systems. The YC backing isn't just a badge — it signals that this is a product with real commercial intent, not a weekend experiment. Graphify Labs has published "The Memory Layer," a companion book on how knowledge graphs can serve as persistent context for AI agents, which gives you a sense of the depth behind the tool.

The core problem Graphify solves is context fragmentation. A typical fullstack project has React components in one directory, NestJS or Django backend code in another, database migrations somewhere else, infrastructure configs scattered around, and documentation in a wiki nobody updates. When you ask an AI coding assistant to help with a bug or feature, it has to read all these files fresh every time. Graphify pre-processes everything into a graph structure that captures relationships between files, functions, classes, database tables, and API endpoints. Your AI assistant gets a map instead of a pile of raw text.

### Why it matters

The AI coding assistant market is exploding — Claude Code, Cursor, Codex, Gemini CLI, and a dozen others are competing for developer workflows. But they all share the same fundamental limitation: context windows are finite, and real codebases are large. A mid-size fullstack project with a React frontend, NestJS API, PostgreSQL database, and Docker infrastructure can easily exceed 500 files. No AI tool can hold all of that in context at once.

Graphify addresses this by acting as a persistent memory layer. Instead of feeding raw files to your AI assistant, you feed it a structured graph that captures the relationships between components. When Claude Code needs to understand how a React hook connects to a NestJS controller that queries a specific database table, the graph has that path pre-computed. This is a fundamentally different approach from "stuff more files into the context window."

The tool supports 20+ AI coding assistants out of the box — Claude Code, Codex, OpenCode, Cursor, Gemini CLI, GitHub Copilot CLI, VS Code Copilot Chat, Aider, Amp, OpenClaw, Factory Droid, Trae, Hermes, Kimi Code, Kiro, Pi, Devin CLI, and Google Antigravity. That breadth of support means you're not locking yourself into a single AI vendor. The graph you build works everywhere.

### Key Features

**One-Command Project Mapping.** Run `graphify .` and the tool uses tree-sitter to parse your source code across 30+ programming languages, extracts SQL schema relationships, processes documentation files, and builds a unified knowledge graph. The output lands in a `graphify-out/` directory with three files: an interactive HTML visualization, a markdown report, and a JSON graph file. No configuration needed for the default case.

**Interactive Graph Visualization.** The `graph.html` file opens in any browser and lets you click nodes, filter by type (functions, classes, modules, tables), search for specific entities, and explore connections. For a fullstack developer, this means you can visually trace how a React component's API call flows through a NestJS controller to a Prisma query to a PostgreSQL table. It's the kind of architectural understanding that normally takes hours of code reading.

**Multi-Language Tree-Sitter Parsing.** Graphify uses tree-sitter grammars to parse source code, which means it understands the actual AST structure of your code — not just text patterns. This matters for accuracy. A regex-based tool might confuse a function definition with a function call. Tree-sitter knows the difference. It supports TypeScript, JavaScript, Python, Go, Rust, Java, C++, and dozens more, making it viable for polyglot fullstack projects.

**SQL Schema Analysis.** Feed Graphify a database schema (SQL files, Prisma schema, Django models, or live database introspection) and it maps table relationships, foreign keys, indexes, and query patterns into the graph. For fullstack developers, this is huge — you can see which backend endpoints touch which database tables, and which frontend components depend on that data. The gap between "frontend code" and "database schema" finally gets a visual bridge.

**Mermaid Call-Flow Diagrams.** Run `graphify export callflow-html` and you get a readable architecture page with Mermaid diagrams showing function call chains, API endpoint flows, and data pipelines. This is particularly useful for documenting NestJS microservice architectures or Django REST API flows where the request path crosses multiple files and modules.

**Agent-Native Design.** The JSON graph output is designed to be consumed by AI agents. When Claude Code or Cursor queries the graph, it gets structured data about your project's architecture without having to re-parse files. This dramatically reduces token usage — the graph is a compressed representation of your codebase's structure. For developers paying per token on AI coding tools, this translates directly to cost savings.

**Leiden Community Detection.** Graphify uses the Leiden algorithm (the same community detection method used in academic citation networks) to identify clusters of related code. It automatically groups tightly-coupled functions, classes, and modules into logical "communities" that often correspond to features or domains in your application. This gives you an objective measure of your codebase's modularity.

### Use Cases

- **Onboarding to a new fullstack codebase** — Instead of reading through hundreds of files to understand how a React + NestJS + PostgreSQL project is structured, run Graphify and explore the interactive visualization. You'll see the architecture in minutes instead of days.

- **Refactoring planning** — Before splitting a monolithic Django app into microservices, use Graphify to identify which modules are tightly coupled and which are relatively independent. The Leiden community detection gives you objective boundaries for service decomposition.

- **AI-assisted development** — Feed the graph.json to Claude Code or Cursor before asking it to implement a feature. The AI gets a structural map of your project instead of raw files, leading to more accurate suggestions that respect your existing architecture.

- **Database-to-frontend tracing** — When a database migration is needed, use Graphify to trace which API endpoints and frontend components depend on the affected tables. No more grep-based archaeology to find downstream impacts.

- **Code review and documentation** — Export Mermaid call-flow diagrams for pull requests or architecture documentation. The visual representation helps reviewers understand changes that span multiple files and modules.

- **Legacy codebase exploration** — For inherited projects with poor documentation, Graphify creates a living map of the codebase that stays current as code changes. Run it periodically to track how the architecture evolves.

### Pros and Cons

Pros:
- The one-command setup is genuinely frictionless. No config files, no YAML, no "add these 15 plugins." Run `graphify .` and get results in under a minute for most projects. This low barrier to entry explains the explosive growth.
- Multi-assistant support means you're not betting on one AI vendor. The same graph works with Claude Code today and whatever tool wins the market next year. That's strategic insurance for developer workflows.
- The tree-sitter-based parsing is significantly more accurate than regex or text-based approaches. It understands language semantics, not just text patterns, which means fewer false positives in the dependency graph.

Cons:
- Python 3.10+ is required, which adds a dependency for teams that don't already have Python in their toolchain. JavaScript/TypeScript-only teams might find this friction annoying, though uv makes installation painless.
- The tool is opinionated about output format. The HTML visualization and Mermaid diagrams are useful but not customizable. If you need a specific visualization format for your team's documentation pipeline, you'll need to process the JSON graph yourself.
- Large monorepos (10,000+ files) can take several minutes to process and produce graphs that are difficult to navigate visually. The JSON output remains useful for AI consumption, but the interactive HTML visualization becomes unwieldy at that scale.

### Getting Started

```bash
# Install with uv (recommended)
uv tool install graphifyy

# Or with pipx
pipx install graphifyy

# Or with pip
pip install graphifyy

# Map your project
cd your-project
graphify .

# Explore the output
open graphify-out/graph.html

# Export Mermaid call-flow diagrams
graphify export callflow-html
```

For AI coding assistants, add the skill to your project:

```bash
# Claude Code — the skill file is auto-detected
graphify .

# Then in Claude Code, the agent can query:
# "Using the graph, show me how the user auth flow works"
```

The `graphify-out/graph.json` file is the machine-readable graph. Load it in Python for custom analysis:

```python
import json
with open('graphify-out/graph.json') as f:
    graph = json.load(f)

# graph['nodes'] — all entities (functions, classes, tables, files)
# graph['edges'] — all relationships (calls, imports, queries, contains)
```

### Alternatives

**Understand-Anything (Lum1104/Understand-Anything)** — A TypeScript tool that also creates interactive knowledge graphs from codebases, but focuses more on visual exploration than AI agent integration. Understand-Anything produces prettier graphs but lacks Graphify's multi-assistant support and SQL schema analysis. Choose it when visualization quality matters more than AI tool integration.

**Sourcegraph** — The established code intelligence platform with code search, navigation, and AI-powered explanations. Sourcegraph is more mature and works at enterprise scale, but it's a SaaS product (with a self-hosted option) rather than an open-source CLI tool. Choose it when you need team-wide code intelligence with access controls and audit logs, not just personal project mapping.

**Aider with repository map** — Aider's built-in repository map feature does lightweight codebase analysis to improve AI context. It's simpler than Graphify — no visualization, no graph export, no multi-assistant support — but it's integrated directly into Aider's workflow with zero extra setup. Choose it if Aider is your only AI coding tool and you want something that just works without a separate step.

### Verdict

Graphify is the most practical tool I've seen for solving the "AI doesn't understand my codebase" problem. The one-command setup, multi-assistant support, and tree-sitter-based accuracy make it a no-brainer for any fullstack developer using AI coding tools regularly. The 61K stars in two months aren't hype — the tool genuinely works, and the YC backing suggests it'll keep improving. The SQL schema analysis alone makes it worth trying if you're working on a React + NestJS + PostgreSQL stack and you're tired of explaining your database structure to Claude Code every session. Install it, run it once on your biggest project, and see the graph. You'll immediately understand why this caught fire.
