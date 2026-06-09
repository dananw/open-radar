---
name: pgGraph
description: "pgGraph is a Rust-based PostgreSQL extension that adds graph traversal, shortest path, and relationship queries to your existing tables — no separate graph database needed."
url: https://github.com/Evokoa/pgGraph
stars: 396
forks: 31
language: Rust
tags: ["postgresql", "graph-database", "rust", "postgres-extension", "ai-agents"]
featured: false
publishedAt: 2026-06-10
---

## pgGraph

### Overview

pgGraph is a PostgreSQL extension that brings graph database capabilities directly to your existing relational tables. No data migration. No new query language. No separate database server. You keep your current schema, and pgGraph builds a derived graph index on top of it — then lets you query it with simple SQL functions like `graph.search()`, `graph.shortest_path()`, and `graph.bfs()`.

The project launched in mid-May 2026 and has been steadily gaining traction, crossing 390 stars by early June. It's built by Evokoa, a company focused on AI infrastructure tooling, and written entirely in Rust using the pgrx framework — the same toolkit used by mature Postgres extensions like pgvector. The extension supports PostgreSQL 14 through 18 and is available as a Docker image, Homebrew formula, or PGXN source distribution.

Here's the problem pgGraph solves: every fullstack developer working with Postgres has hit the "relationship query wall." You have users, organizations, projects, and permissions — all connected through foreign keys. Finding "all users within 3 hops of this organization" or "the shortest permission path between two roles" requires recursive CTEs that get ugly fast and perform worse as depth increases. pgGraph compiles your foreign key relationships into a compressed sparse row (CSR) adjacency structure, making traversals O(1) per edge instead of O(n) recursive SQL. It's a fundamentally different execution model for a problem every backend developer faces.

### Why it matters

The graph database market has been dominated by dedicated solutions — Neo4j, Amazon Neptune, ArangoDB — that require running separate infrastructure, learning new query languages (Cypher, Gremlin, SPARQL), and moving data out of your primary database. For most fullstack teams, that operational overhead is a non-starter. You're not going to add Neo4j to your NestJS stack just because you need to query friend-of-friend relationships.

pgGraph sidesteps this entirely. It's a Postgres extension — install it like pgvector or pg_cron, and your existing tables become graph-queryable. This matters because Postgres is already the default database for Django, the most popular choice for NestJS (via TypeORM/Prisma), and increasingly common in Go backends. If you're running Postgres, you can add graph capabilities without changing your architecture, deploying new services, or rewriting queries.

The timing is also significant for the AI agents space. Knowledge graphs are becoming central to retrieval-augmented generation (RAG) pipelines, and AI agents increasingly need to traverse relationship structures — finding connected entities, mapping organizational hierarchies, or discovering shortest paths through permission networks. pgGraph's topics include `ai-agents` and `ai-agents-framework` for good reason: it provides a lightweight graph runtime that agents can query through standard SQL, without the complexity of maintaining a separate graph store.

### Key Features

**CSR-Based Graph Engine.** pgGraph doesn't just add graph syntax to SQL — it compiles your relational data into compressed sparse row adjacency stores. Forward and reverse edge arrays are stored as contiguous memory slices, so traversals execute as raw memory scans rather than recursive SQL joins. The README claims this makes bounded traversals dramatically faster than equivalent recursive CTEs, and the architecture backs that up. The CSR artifacts are persisted as `.pggraph` files that can be memory-mapped across PostgreSQL backends without copying.

**Zero Data Migration.** Your tables stay exactly as they are. pgGraph reads foreign key constraints to discover relationships automatically, then builds a derived graph index from your existing schema. Source tables, constraints, indexes, row-level security, and backup strategies remain standard PostgreSQL concerns. If you drop pgGraph, your data is untouched. This is the single biggest differentiator from Apache AGE, which requires dedicated vertex and edge tables.

**SQL-Native Query Interface.** All graph operations are exposed as SQL functions in the `graph` schema: `graph.build()` to compile the graph, `graph.search()` for node discovery, `graph.bfs()` for breadth-first traversal, `graph.shortest_path()` for pathfinding, and more. No new query language to learn. If your team knows SQL, they can run graph queries. This is especially valuable for Django and NestJS teams where ORMs already generate SQL — you can add graph traversals through raw query endpoints without touching your ORM layer.

**Safety-First Traversal Design.** Unbounded graph expansion is the classic graph database footgun — a query that touches millions of nodes can OOM your server. pgGraph includes explicit circuit breakers: depth limits, visited-node tracking, frontier limits, pagination, and strict memory safeguards. These are built into the engine, not optional configuration flags. For production systems, this predictability matters more than raw speed.

**Multi-Mode Projection.** pgGraph supports two graph projection modes: CSR (compressed sparse row) for read-heavy analytical workloads, and mutable mode for graphs that change frequently. The CSR mode is optimized for repeated bounded traversals over stable topology — think permission hierarchies, organizational structures, or social graphs that update infrequently. Mutable mode trades some read performance for faster graph updates.

**Broad PostgreSQL Compatibility.** The extension supports PostgreSQL 14 through 18, with Docker images tagged per Postgres major version. Installation options include Docker (zero-build quickstart), Homebrew on macOS, PGXN source distribution, and direct pgrx compilation. The project also includes a Streamlit playground for interactive graph exploration with preset datasets.

**AI Agent Integration.** pgGraph positions itself as a graph runtime for AI agent workflows. Knowledge graphs are increasingly used in RAG pipelines to model entity relationships, and agents need to traverse these structures efficiently. Because pgGraph exposes graph queries through standard SQL, any AI framework that can execute database queries — LangChain, LlamaIndex, custom agent loops — can leverage graph traversal without integrating a dedicated graph database driver.

### Use Cases

- **Social networks and user relationships** — Find mutual connections, recommend friends-of-friends, or discover communities within your existing users table. The 2-hop query that would require a painful recursive CTE in plain SQL becomes a single `graph.bfs()` call.

- **Permission and role hierarchies** — Map organizational structures, RBAC permission chains, or multi-tenant access paths. Finding "can user X access resource Y through any permission path" is a shortest-path query.

- **Knowledge graphs for AI agents** — Build entity relationship graphs from your application data and let AI agents traverse them for context retrieval. No separate Neo4j deployment needed.

- **Recommendation engines** — Power "users who liked X also liked Y" style recommendations using collaborative filtering over your existing relational data, expressed as graph traversals.

- **Dependency and impact analysis** — In systems with cascading dependencies (microservices, package managers, CI/CD pipelines), model the dependency graph in Postgres and query impact radius with bounded traversals.

### Pros and Cons

Pros:
- Operates on existing Postgres tables with zero data migration — the lowest-friction path to graph queries for any team already running PostgreSQL.
- Rust/pgrx implementation with CSR memory layout delivers real graph-engine performance without leaving your database. The memory-mapped artifact design is genuinely clever.
- SQL-native interface means no new query language, no new drivers, no new infrastructure. Your existing database connection handles everything.
- Built-in safety mechanisms (depth limits, frontier limits, OOM guards) make it production-friendlier than raw recursive CTEs for graph-style queries.

Cons:
- Early alpha status — the project explicitly warns against production use. Version 0.1.7 with only 4 open issues is encouraging, but the API surface will likely change.
- 396 stars is modest community traction. For comparison, pgvector had 10K+ stars at a similar maturity stage. The ecosystem around pgGraph (ORM integrations, migration tools, tutorials) is essentially nonexistent right now.
- Graph projections need to be explicitly built and managed. Unlike a dedicated graph database where writes immediately update the graph, pgGraph requires `graph.build()` calls to refresh the derived index. For highly dynamic graphs, this adds operational complexity.

### Getting Started

The fastest way to try pgGraph is the Docker image:

```bash
# Pull and run
docker pull ghcr.io/evokoa/pggraph:0.1.7
docker run -d --rm \
  --name pggraph \
  -e POSTGRES_PASSWORD=postgres \
  -p 5432:5432 \
  ghcr.io/evokoa/pggraph:0.1.7

# Verify installation
docker exec pggraph psql -U postgres -d graph \
  -c "SELECT extname, extversion FROM pg_extension WHERE extname IN ('graph', 'pg_cron');"

# Connect and try it
psql -h localhost -U postgres -d graph

# Inside psql — register tables and run graph queries
SELECT graph.build();
SELECT * FROM graph.search('users', 1, 2);
SELECT * FROM graph.shortest_path('users', 1, 42);
```

For a full interactive demo with sample data:

```bash
git clone https://github.com/evokoa/pggraph.git
cd pggraph
scripts/quickstart.sh
```

On macOS with Homebrew:

```bash
brew tap Evokoa/tap
brew install pggraph
brew services start postgresql@17
psql -d postgres -c "CREATE EXTENSION graph;"
```

### Alternatives

**Apache AGE** — The most established graph extension for PostgreSQL, implementing the openCypher query language. AGE requires you to create dedicated vertex and edge tables using its `agtype` format, which means data migration from existing schemas. pgGraph's approach of building derived indexes over existing tables is less featureful but far less disruptive. Choose AGE if you need a full property graph model and are willing to restructure your data; choose pgGraph if you want graph queries on your existing schema with zero migration.

**Neo4j** — The dominant dedicated graph database with a mature ecosystem, Cypher query language, and enterprise features. Neo4j excels at complex graph workloads but requires running separate infrastructure, learning a new query language, and moving data out of Postgres. For teams that need graph capabilities as one feature among many (not the core of their application), pgGraph's extension model is significantly less operational overhead.

**PostgreSQL 19 SQL/PGQ** — The upcoming SQL:2023 graph features in PostgreSQL 19 introduce `CREATE PROPERTY GRAPH` and `GRAPH_TABLE` syntax backed by the standard planner. This will be the "official" way to do graph queries in Postgres, but it won't ship until PostgreSQL 19 is stable (likely late 2026 or 2027). pgGraph fills the gap now with a precomputed execution model optimized for bounded traversals — and could potentially serve as a backend for SQL/PGQ patterns in the future.

### Verdict

pgGraph is the most pragmatic approach to graph queries in PostgreSQL I've seen. Instead of asking you to adopt a new database, learn a new query language, or restructure your schema, it builds a graph runtime on top of what you already have. The Rust/pgrx implementation with CSR adjacency stores is genuinely fast, and the SQL-native interface means any developer who knows Postgres can start running graph queries in minutes.

It's early — alpha status, 396 stars, minimal ecosystem. Don't bet your production system on it today. But if you're a fullstack developer running Postgres (and if you're using Django, NestJS with Prisma, or Go with pgx, you almost certainly are), pgGraph is worth watching closely. The pain point it addresses — "I need graph queries but I don't want to run Neo4j" — is nearly universal, and pgGraph's extension model is the cleanest solution to that problem I've encountered. When it hits 1.0, this could become a standard addition to the Postgres toolkit alongside pgvector and pg_cron.
