---
name: helixdb
description: "HelixDB is a graph-vector database built in Rust for AI applications, RAG pipelines, and knowledge graphs — one database to replace your vector store, graph DB, and relational layer."
url: https://github.com/HelixDB/helix-db
stars: 5230
forks: 283
language: Rust
tags: ["database", "vector-db", "graph-database", "rust", "ai", "rag"]
featured: false
publishedAt: 2026-06-16
---

## HelixDB

### Overview

HelixDB is a graph-vector database built from scratch in Rust. It crossed 5,000 GitHub stars in mid-2026 and ships new releases weekly — v3.0.5 landed on June 5th. The project is Y Combinator-backed, which gives it a runway and credibility that most open-source database projects don't have at this stage.

The team is small but prolific. The lead maintainer (xav-db) has over 2,000 commits, with four other core contributors pushing regular updates. That kind of commit velocity on a database engine — not a wrapper or SDK — signals serious engineering investment. The project started in late 2024 and has been iterating rapidly through major versions.

The core pitch: you don't need five different databases for an AI application. Most teams building RAG pipelines or agent systems today stitch together a relational DB (Postgres), a vector store (Pinecone, Weaviate, Qdrant), and sometimes a graph DB (Neo4j) for knowledge graphs. HelixDB collapses all of that into a single platform with native graph and vector support, plus key-value, document, and relational data models on the side. One query language, one deployment, one place to manage data.

### Why it matters

The database layer for AI applications is a mess right now. If you're building a RAG pipeline, you need chunked document storage, vector embeddings for semantic search, and often a graph structure to represent relationships between entities. Most teams solve this with 2-3 separate services, each with its own query language, deployment model, and consistency guarantees. The integration tax is enormous.

HelixDB is the first project I've seen that genuinely tries to unify graph and vector operations in a single OLTP engine, built at the storage layer rather than as an extension bolted onto an existing database. Postgres has pgvector, but it's an add-on — vector operations aren't first-class citizens in the query planner. Neo4j added vector search, but it's a graph database that learned vector tricks, not a purpose-built hybrid.

For fullstack developers building AI-powered features — semantic search, recommendation engines, knowledge graphs for agents, RAG pipelines — the appeal is obvious. One SDK (Rust or TypeScript), one query DSL, one deployment to manage. The TypeScript SDK means NestJS and React developers can integrate without learning a new language. The `helix chef` command that scaffolds an entire app with a coding agent is a clever developer experience play that lowers the barrier further.

### Key Features

**Graph + Vector Native Data Model.** HelixDB stores data as a property graph where nodes and edges can have vector embeddings attached directly. You can traverse relationships and perform similarity search in the same query, without round-tripping between separate systems. This is the architecture that knowledge graphs and RAG pipelines actually need.

**TypeScript and Rust SDKs with Query DSL.** Queries are authored as typed functions in either Rust or TypeScript, compiled to a JSON AST, and sent to the database over HTTP. No raw query strings to inject, no ORM indirection. The TypeScript SDK works with any Node.js 20+ runtime — NestJS backends, Next.js API routes, edge functions.

**`helix chef` One-Command Bootstrap.** This is the standout developer experience feature. Run `helix chef`, describe what you want to build, and it installs the MCP server, scaffolds a project, starts a local instance, seeds example data, and hands off to your coding agent (Claude Code, Codex, or OpenCode) to build the app. It turns database setup from a 30-minute chore into a 2-minute conversation.

**ACID Transactions with Single-Writer Architecture.** The cloud version uses a single writer with auto-scaling reader nodes and full ACID compliance. For local development, instances run in Docker containers on port 6969 with in-memory or disk-backed storage. The consistency model is straightforward — no eventual consistency surprises.

**Integrated Full-Text and Vector Search.** You don't need a separate search engine. HelixDB supports both full-text search and vector similarity search natively, which means you can build hybrid search (keyword + semantic) in a single query. For RAG applications, this eliminates the Elasticsearch or Typesense dependency.

**MCP Server for AI Agent Integration.** HelixDB ships with a Model Context Protocol server, letting AI coding tools interact with your database directly. Combined with `helix chef`, this means an AI agent can design your schema, write queries, and build a working frontend against your data — all without you writing boilerplate.

**HelixDB Cloud with Object Storage Backend.** The managed cloud version uses object storage for persistence, with 3+ gateway and database nodes for high availability. It's a managed service with founder-level support — you can email the founders directly. The pricing isn't public, but the team is responsive on Discord.

### Use Cases

- **RAG pipelines for enterprise search** — Store document chunks with embeddings, traverse entity relationships for context expansion, and perform hybrid search in a single query. No more orchestrating Postgres + Pinecone + Neo4j.
- **AI agent memory and knowledge graphs** — Agents need to store and retrieve structured knowledge with semantic search. HelixDB's graph model naturally represents entity relationships while vectors handle similarity matching.
- **Recommendation engines** — Model user-item interactions as a graph, embed user preferences as vectors, and traverse the graph to find similar users or items. The combination of graph traversal and vector similarity is exactly what collaborative filtering needs.
- **Content management with semantic search** — Store content with metadata relationships (authors, tags, categories) in a graph, attach embeddings for semantic search, and query both structure and meaning in one system.
- **Prototyping AI features** — The `helix chef` workflow makes it fast to scaffold a database-backed AI prototype. Great for hackathons, proof-of-concepts, or validating an idea before committing to a production architecture.

### Pros and Cons

Pros:

- Unified graph-vector model eliminates the integration tax of running multiple databases. Real numbers: teams report cutting their data infrastructure from 3 services to 1, reducing operational complexity and inter-service latency.
- YC backing and active development (3 releases in the first week of June 2026 alone) suggest the project has staying power. The team ships fast and the Discord community is engaged.
- The TypeScript SDK is first-class, not an afterthought. For teams already in the React/NestJS ecosystem, integration is straightforward — install the npm package, define queries as typed functions, POST them over HTTP.
- `helix chef` is genuinely useful, not just a demo. Scaffolding a full project with an AI agent that understands your database schema accelerates development significantly.

Cons:

- The project is young (v3.0.5 as of June 2026) and the API surface is still evolving. Breaking changes between major versions have been frequent. Production use at scale requires caution.
- Community size is modest compared to established vector databases like Qdrant (20K+ stars) or graph databases like Neo4j. Finding answers to edge-case problems may require asking on Discord rather than searching Stack Overflow.
- No standalone documentation for the graph query model beyond the SDK examples. If you're coming from Cypher (Neo4j) or Gremlin, there's a learning curve to the DSL, and the docs don't bridge that gap well yet.

### Getting Started

```bash
# Install the CLI
curl -sSL "https://install.helix-db.com" | bash

# Quick start with helix chef (interactive scaffolding)
helix chef

# Or manual setup
mkdir my-helix-app && cd my-helix-app
helix init
helix start dev

# Send a query
helix query dev --file examples/request.json

# TypeScript SDK
npm install @helix-db/helix-db

# Stop when done
helix stop dev
```

For the TypeScript SDK, define queries as typed functions:

```ts
import { g, readBatch, writeBatch, Predicate, defineParams, param } from "@helix-db/helix-db";

const getUsersParams = defineParams({ name: param.string() });
function getUsers(p = getUsersParams) {
  return readBatch()
    .varAs("user",
      g().nWithLabel("User")
        .where(Predicate.eqParam("name", "name"))
        .project([{ name: true }]),
    )
    .returning(["user"]);
}

// POST to http://localhost:6969/v1/query
```

### Alternatives

**Qdrant** — A purpose-built vector database written in Rust with excellent performance and a mature API. Qdrant is the better choice if you only need vector search and don't care about graph relationships. It has 20K+ stars, a larger community, and more production deployments. But it doesn't do graph traversal — if your AI application needs to follow relationships between entities, you'll still need a separate graph store.

**Neo4j** — The industry-standard graph database with added vector search capabilities. Neo4j is battle-tested with decades of production use and the Cypher query language is well-documented. Choose Neo4j if you need a proven graph database and can tolerate vector search as a secondary feature. HelixDB is more opinionated about the graph-vector fusion and has a lighter operational footprint.

**Supabase with pgvector** — If you're already on Postgres, pgvector gives you vector search without adding another database. Supabase wraps it with a nice dashboard and client libraries. This is the pragmatic choice for teams that want to minimize infrastructure. The tradeoff: vector operations aren't native to Postgres's query planner, and you don't get graph traversal at all.

### Verdict

HelixDB is the most interesting database project in the AI tooling space right now. The graph-vector fusion isn't just a marketing pitch — it's a genuine architectural bet that addresses a real pain point for teams building RAG pipelines and agent systems. The TypeScript SDK is well-designed, the CLI experience with `helix chef` is excellent, and the YC backing gives the team runway to iterate. It's young, the docs need work, and the API is still moving — don't migrate your production Neo4j cluster today. But if you're starting a new AI application in mid-2026 and want a single database that handles both structured relationships and semantic search, HelixDB deserves a serious evaluation. The 5,200 stars in under two months suggest the developer community agrees.
