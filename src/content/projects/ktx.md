---
name: ktx
description: "ktx is a self-improving context layer that teaches AI agents how to query your data warehouse accurately — with approved metrics, join graphs, and business knowledge."
url: https://github.com/Kaelio/ktx
stars: 1211
forks: 64
language: TypeScript
tags: ["data-agent", "semantic-layer", "mcp", "ai-agents", "developer-tools"]
featured: false
publishedAt: 2026-06-16
---

## ktx

### Overview

ktx is a self-improving context layer that teaches AI agents how to query your data warehouse accurately. It crossed 1,200 GitHub stars in just over a month since its May 2026 launch, with a Y Combinator P25 backing that gives it immediate credibility in the data tooling space. The project is built by Kaelio, a startup focused on making AI agents reliable at data tasks.

The core problem ktx solves is one every data team has experienced: you ask Claude Code or Codex to write a SQL query, and it invents its own metric logic, re-explores your warehouse from scratch, and returns numbers that don't match your approved definitions. A simple question like "what's our monthly recurring revenue?" becomes a guessing game because the agent doesn't know which columns to join, which filters to apply, or which definition of MRR your finance team actually uses.

ktx addresses this by building a local context layer that combines three things: your warehouse schema (with detected joinable columns and resolved fan/chasm traps), your existing semantic layers from dbt or MetricFlow, and your team's scattered business knowledge from Notion, Looker, and wikis. It then serves all of this to agents through MCP, so Claude Code, Codex, Cursor, or OpenCode can query your data with approved, reusable metric definitions instead of improvising.

### Why it matters

The AI agent ecosystem is exploding, but there's a massive reliability gap when agents touch data. According to a 2025 Monte Carlo Data survey, 68% of data teams reported that AI-generated SQL queries produced incorrect results at least some of the time. The problem isn't that LLMs can't write SQL — they're actually quite good at it. The problem is they lack context about your specific business logic, approved definitions, and data relationships.

Traditional semantic layers (dbt Metrics, MetricFlow, Cube) partially solve this, but they demand constant manual upkeep and don't absorb the rest of your company's knowledge. And general-purpose agents ignore them entirely, preferring to re-explore tables from scratch each time. ktx sits in the middle: it ingests your existing semantic layer, enriches it with wiki content and raw-table introspection, and exposes everything through a standard MCP interface that any agent can consume.

This connects to a broader trend in the developer tools space. The most interesting open-source projects right now aren't building new AI agents — they're building the infrastructure that makes existing agents reliable. ktx is a prime example of that shift. It's not trying to replace Claude Code or Codex. It's trying to make them actually useful for data work.

### Key Features

**Automatic Warehouse Context Building.** ktx samples your tables, captures metadata and usage patterns, detects joinable columns through foreign key analysis and naming conventions, and annotates sources so agents write better queries. You don't manually define relationships — ktx discovers them and flags contradictions for human review. This alone saves hours of documentation work.

**Semantic Layer Ingestion.** If you already have dbt models, MetricFlow definitions, or LookML explores, ktx ingests them directly. It combines your existing semantic layer with raw-table introspection and wiki content into one searchable surface. Agents get the approved definitions you've already built, plus context they never had before.

**Wiki and Knowledge Absorption.** ktx ingests content from Notion, Looker, Metabase, and team wikis, then organizes it, removes duplicates, and flags contradictions. Your refund policy docs, business glossary, and metric definitions all become part of the context agents can search. This is the piece traditional semantic layers completely miss.

**Join Graph with Trap Resolution.** The semantic layer automatically resolves chasm traps (missing intermediate joins) and fan traps (duplicate rows from one-to-many joins) through a computed join graph. Agents fetch metrics declaratively instead of rewriting canonical SQL each time. This prevents the classic bug where an agent joins orders to customers through the wrong path and double-counts revenue.

**MCP Server for Agent Integration.** ktx exposes its context through a local MCP server that Claude Code, Codex, Cursor, and OpenCode can connect to directly. Combined full-text and semantic search across wiki pages and semantic-layer entities means agents find the right context without hallucinating. The MCP server runs on demand — no hosted service, no data leaving your machine.

**Read-Only by Design.** ktx never writes to your database. All connections are read-only. This is a deliberate security choice that makes it safe to give agents warehouse access without worrying about accidental data modification. Your production database stays protected while agents get the context they need.

**Multi-Warehouse Support.** Works with PostgreSQL, Snowflake, BigQuery, ClickHouse, MySQL, SQL Server, and SQLite out of the box. Integrates with dbt, MetricFlow, LookML, Looker, Metabase, and Notion. If your data stack uses any combination of these tools, ktx can bridge the gap between them and your AI agents.

### Use Cases

- **Data analytics teams** — When analysts use Claude Code or Codex to explore data, ktx ensures the agent uses approved metric definitions instead of inventing its own. A question like "show me churn by cohort" produces consistent, correct results every time.

- **Fullstack developers building data features** — If you're building dashboards or reporting features in React or Next.js and need to query a warehouse, ktx gives your AI coding agent the context to write correct SQL without your manual guidance.

- **Organizations with scattered knowledge** — When business definitions live across dbt, Looker, Notion, and team wikis, ktx consolidates everything into one searchable layer. New team members and AI agents both benefit from unified context.

- **BI teams migrating or consolidating** — If you're moving from Looker to Metabase or reorganizing your dbt project, ktx provides a unified semantic surface that agents can query regardless of the underlying tool.

- **Data engineering workflows** — When building ETL pipelines or data models, ktx helps coding agents understand existing table relationships and approved transformations, reducing the back-and-forth of manual context provision.

### Pros and Cons

Pros:
- Solves a real, painful problem that every data team faces when working with AI agents. The gap between "agents can write SQL" and "agents write correct SQL for your specific warehouse" is massive.
- Ingests existing tools rather than replacing them. If you've already invested in dbt or Looker, ktx layers on top instead of asking you to start over.
- Local-first architecture with no hosted service means your data stays on your machine. The only external calls go to the LLM provider you configure.
- YC backing and active development suggest the project has runway to mature. The team is shipping fast with good documentation.

Cons:
- Requires a SQL warehouse to be useful — ktx sits on top of one, it doesn't provide one. If you don't have a data warehouse, this tool isn't for you.
- The context building step takes time on large warehouses. Initial ingestion of hundreds of tables with wiki content can be slow, though subsequent updates are incremental.
- Still early-stage with a small community. The Slack workspace and GitHub issues are active, but you won't find the ecosystem of blog posts and tutorials that more established tools have.
- Relies on LLM API calls for context building and reconciliation. You need either an Anthropic API key, a Claude Pro/Max subscription, or local Codex authentication.

### Getting Started

```bash
# Install ktx globally
npm install -g @kaelio/ktx

# Run interactive setup — configures providers, connections, and builds context
ktx setup

# Check project readiness
ktx status

# Build context for all configured connections
ktx ingest

# Search semantic sources
ktx sl "revenue"

# Search wiki pages
ktx wiki "refund policy"

# Start the MCP server for agent clients
ktx mcp start
```

### Alternatives

**dbt Semantic Layer** — dbt's built-in metrics layer provides approved metric definitions and query compilation. It's more mature and widely adopted, but it requires manual metric definition and doesn't absorb wiki content or detect joinable columns automatically. Choose dbt when you want a tightly integrated transformation-and-metrics pipeline and don't need AI agent context.

**Cube** — Cube is a universal semantic layer that works across multiple data sources and visualization tools. It has a strong API-first approach and good caching. But like dbt, it requires manual setup and doesn't learn from your existing knowledge base. Choose Cube when you need a production-grade API layer for metrics serving, not agent context.

**LangChain SQL Agent** — LangChain's SQL agent toolkit lets you build custom agents that query databases with natural language. It's flexible and well-documented, but it re-explores your schema on every question and doesn't maintain persistent context about approved metrics or business logic. Choose LangChain when you need to build a custom agent from scratch and are willing to handle context management yourself.

### Verdict

ktx is one of the most practical tools I've seen for making AI agents useful at real data work. The problem it solves — agents generating incorrect SQL because they lack business context — is universal and expensive. Every data team has war stories about AI-generated queries that looked right but returned wrong numbers because the agent didn't know about a specific filter or join path. ktx attacks this problem from the right angle: instead of trying to make agents smarter, it gives them the context they need to be accurate. The local-first, read-only design is exactly what you want when giving any tool access to your data warehouse. The YC backing and 1,200+ stars in a month suggest the team has both the technical chops and the community momentum to make this stick. If you're using Claude Code, Codex, or any AI coding agent with a SQL warehouse, ktx should be one of the first tools you set up.
