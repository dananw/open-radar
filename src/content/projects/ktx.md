---
name: ktx
description: "Kaelio/ktx is a self-improving context layer that teaches AI agents to query your data warehouse accurately with approved metrics, semantic layers, and MCP integration."
url: https://github.com/Kaelio/ktx
stars: 830
forks: 44
language: TypeScript
tags: ["ai-agents", "data-analytics", "semantic-layer", "mcp", "developer-tools"]
featured: false
publishedAt: 2026-06-03
---

## ktx

### Overview

ktx is a self-improving context layer that teaches AI agents how to query your data warehouse accurately. Built by Kaelio, a Y Combinator P25 startup, it hit 830 GitHub stars within three weeks of its May 2026 launch — a signal that the "AI agents querying data" problem is real and underserved.

The project is built in TypeScript with a Python semantic layer backend. The core team comes from the analytics engineering world, which shows in the design choices: ktx doesn't try to replace your warehouse or your BI tool. It sits between your data stack and your AI agent, building a living map of your warehouse schema, approved metric definitions, joinable columns, and scattered business knowledge — then serves that context to agents at query time through MCP.

The problem it solves is specific and painful. When you ask Claude Code or Codex to "calculate monthly recurring revenue," the agent has to figure out which tables to join, which columns mean what, and what formula your finance team actually uses. Without context, it invents its own logic. The result: numbers that don't match your dashboards, joins that produce duplicates, and queries that take 30 seconds when they should take 3. ktx eliminates that guesswork by giving agents a pre-built semantic understanding of your warehouse before they write a single line of SQL.

### Why it matters

The AI agent ecosystem is moving fast, but the data layer has been an afterthought. Most developer-facing AI tools focus on code generation, file editing, and terminal automation. When those same agents need to answer data questions — "how many signups did we get last week?" or "what's our churn rate by cohort?" — they fall apart. They either can't access the warehouse, or they can but they query it blindly.

Traditional semantic layers (dbt metrics, MetricFlow, LookML) were built for BI tools, not for LLMs. They define metrics in YAML or Python, but they don't provide the runtime context agents need: which columns are joinable, what business terms map to which tables, or where the documented definitions live. ktx bridges that gap. It ingests your existing semantic layer (dbt, MetricFlow, LookML), samples your warehouse tables, and combines everything into a unified context that agents can search through MCP.

This matters for fullstack developers specifically. If you're building internal tools with React frontends and NestJS or Django backends, your team eventually needs data. Right now, that means either writing SQL manually or building dashboard UIs. With ktx, your AI coding agent becomes a reliable data analyst — one that knows your schema, respects your metric definitions, and never invents revenue numbers.

### Key Features

**Automatic Warehouse Context Building.** ktx connects to your PostgreSQL, Snowflake, BigQuery, ClickHouse, MySQL, or SQL Server warehouse and samples tables to capture metadata, column types, usage patterns, and relationships. It detects joinable columns automatically, even across schemas. You don't have to manually annotate your warehouse — ktx builds the map from what's already there.

**Semantic Layer Ingestion.** If you already use dbt, MetricFlow, LookML, or Metabase models, ktx ingests them directly. It reads your metric definitions, dimension hierarchies, and transformation logic, then merges them with the raw-table context it built from sampling. The result is a single searchable surface instead of three disconnected sources. This is the feature that makes ktx practical for existing data teams.

**Wiki and Knowledge Absorption.** Business knowledge lives in Notion pages, Confluence docs, Slack threads, and team wikis — scattered and unstructured. ktx ingests that content, organizes it, removes duplicates, and flags contradictions for human review. When an agent asks "what does 'activated user' mean?", ktx finds the documented definition instead of guessing.

**MCP Server for Agent Execution.** ktx runs a local MCP daemon that exposes combined full-text and semantic search across your wiki and semantic layer. Claude Code, Codex, Cursor, OpenCode, and any MCP-compatible agent can query it. The MCP server compiles declarative metric requests into read-only SQL that runs against your warehouse. Agents get accurate numbers without ever touching your database directly.

**Read-Only by Design.** ktx never writes to your warehouse. Connections are read-only. The only data leaving your machine goes to the LLM provider you configured — Anthropic API, Google Vertex AI, or your local Claude Code session. There's no hosted service. The MCP daemon runs on demand when an agent needs it.

**Self-Improving Context.** The context layer isn't static. As your warehouse schema evolves, as new dbt models ship, as team wikis get updated, ktx re-ingests and rebuilds context. It detects contradictions between sources — for example, if your dbt metric definition says MRR includes expansion but your wiki says it doesn't — and flags them for human review. The context gets more accurate over time.

**CLI-First Workflow.** Everything is driven through the CLI: `ktx setup` to initialize, `ktx ingest` to build context, `ktx sl "revenue"` to search semantic sources, `ktx wiki "refund policy"` to search knowledge, and `ktx mcp start` to serve agents. The project layout is clean — YAML config, Markdown wiki files, and semantic-layer YAML that you can commit to Git.

### Use Cases

- **Data team onboarding** — New analysts can ask agents natural language questions about the warehouse and get answers that match approved definitions, instead of spending weeks learning which tables to join.
- **Internal tool development** — Fullstack developers building React dashboards with NestJS or Django backends can use agents to generate accurate SQL queries for their data endpoints, backed by ktx's semantic context.
- **BI tool migration** — When moving from Looker to Metabase or from one semantic layer to another, ktx preserves the metric definitions and business context so agents (and humans) don't lose institutional knowledge.
- **Automated reporting pipelines** — AI agents can generate weekly reports, executive summaries, and anomaly alerts that use the same metric definitions as your dashboards, ensuring consistency across all outputs.
- **Ad-hoc data exploration** — Product managers and engineers can ask "what's our activation rate for users who signed up via the new onboarding flow?" and get an answer grounded in your actual schema, not a hallucinated query.

### Pros and Cons

Pros:
- Solves a real problem that no other open-source tool addresses — giving AI agents reliable data warehouse context without manual annotation.
- Ingests existing tools (dbt, LookML, Metabase, Notion) instead of asking you to start from scratch. If you already have a semantic layer, ktx makes it agent-ready.
- Local-first architecture with no hosted service means your schema and data never leave your infrastructure. Read-only connections add another safety layer.
- Y Combinator P25 backing and active development (multiple commits daily in the first three weeks) suggest the team is serious about long-term maintenance.
- Apache 2.0 license means no usage restrictions for commercial or internal projects.

Cons:
- Requires an existing SQL warehouse — ktx is a context layer, not a database. If you don't have a warehouse, it can't help you.
- Early-stage project with 830 stars. The API surface is still evolving, and the documentation, while good, may lag behind rapid development.
- Depends on LLM providers for context building (Anthropic API, Vertex AI, or local Claude Code session). If you're not already paying for one of those, there's an additional cost.
- The semantic layer Python backend adds complexity for teams that are pure TypeScript. You'll need Python 3.10+ installed alongside Node.js.

### Getting Started

```bash
# Install globally
npm install -g @kaelio/ktx

# Initialize a project (interactive setup)
ktx setup

# Check everything is configured
ktx status

# Build context from your data sources
ktx ingest

# Search your semantic layer
ktx sl "monthly recurring revenue"

# Search your wiki
ktx wiki "refund policy"

# Start the MCP server for your AI agent
ktx mcp start
```

If you're already using Claude Code or Codex, you can install ktx directly through the agent:

```text
Run npx skills add Kaelio/ktx --skill ktx and use the ktx skill to install
and configure ktx in this project.
```

The project layout after setup:

```text
my-project/
├── ktx.yaml                         # Project configuration
├── semantic-layer/<connection-id>/  # YAML semantic sources
├── wiki/global/                     # Shared business context
├── wiki/user/<user-id>/             # User-scoped notes
├── raw-sources/<connection-id>/     # Ingest artifacts and reports
└── .ktx/                            # Local state, git-ignored
```

### Alternatives

**dbt Semantic Layer (MetricFlow)** — dbt's built-in semantic layer defines metrics in Python and serves them through dbt Cloud. It's more mature and has a larger community, but it's designed for BI tools, not AI agents. dbt Cloud is a paid hosted service. ktx actually ingests dbt metrics and makes them agent-accessible, so the two tools are complementary rather than competitive.

**Cube (Cube.js)** — An open-source semantic layer that provides a REST and GraphQL API for metrics. Cube is more established (8 years, 18K+ stars) and has a richer caching layer. But it requires manual metric definition in YAML and doesn't integrate with AI agents natively. Better choice if you need a production-grade metrics API for dashboards, less useful if your primary consumer is an AI coding agent.

**LangChain SQL Agent** — LangChain's SQL agent toolkit lets LLMs query databases directly. It generates SQL from natural language without a semantic layer. The problem: it reinvents metric logic on every query, has no concept of approved definitions, and can produce inconsistent results. ktx is the principled version of what LangChain SQL agents try to do ad-hoc.

### Verdict

ktx is the missing infrastructure piece for AI agents that need to work with real data. Every team using Claude Code, Codex, or Cursor for development work eventually hits the "ask about data" wall — the agent can write code but can't query the warehouse reliably. ktx fixes that, and it does it without requiring you to abandon your existing dbt, LookML, or Metabase setup. The Y Combinator backing and the pace of development (multiple daily commits, active Slack community) suggest this project has real momentum. If you're a fullstack developer with a SQL warehouse and AI coding agents in your workflow, ktx deserves a spot in your stack today. The 830 stars in three weeks, with zero marketing spend, tells you the problem resonates.
