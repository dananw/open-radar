---
name: helixdb
description: "HelixDB is a YC-backed graph-vector database built from scratch in Rust for AI applications — combining knowledge graphs, vector search, and relational data in one platform."
url: https://github.com/HelixDB/helix-db
stars: 4769
forks: 252
language: Rust
tags: ["database", "graph-database", "vector-db", "rust", "ai", "rag"]
featured: false
publishedAt: 2026-06-11
---

## HelixDB

### Overview

HelixDB is a graph-vector database built from scratch in Rust, designed specifically for AI applications that need knowledge graphs, vector search, and structured data in one place. It hit 4,700 GitHub stars and 250+ forks in under a year, with the Y Combinator backing giving it the kind of credibility that takes most database projects years to earn.

The team behind HelixDB is small and focused. They built the entire storage engine in Rust — not a wrapper around SQLite or a fork of an existing graph database. That matters because it means the query planner, storage format, and transaction system were all designed with the graph-vector hybrid model in mind from day one. The project launched through YC's "Launch YC" program with the tagline "The Database for RAG & AI," and that positioning has clearly resonated with developers building AI-native applications.

The core problem HelixDB solves is the "five databases" problem. If you're building an AI application today, you probably need a relational database for your app data, a vector database for embeddings, a graph database for knowledge relationships, a key-value store for caching, and maybe a document store for flexible schemas. That's five systems to deploy, maintain, and keep in sync. HelixDB collapses all of these into a single platform with a unified query language. You write graph traversals that also do vector similarity search, and the data model supports nodes, edges, vectors, key-value pairs, and documents natively.

### Why it matters

The database landscape for AI applications is fragmented in a way that reminds me of the early days of web development, when you'd cobble together MySQL, Memcached, Redis, and Elasticsearch just to build a search feature. Every AI application today faces the same integration tax: Pinecone or Weaviate for vectors, Neo4j or ArangoDB for graphs, Postgres for relational data, and Redis for caching. The operational overhead is real, and the data consistency problems are worse.

HelixDB takes a position that a single database can handle all of these workloads if the storage engine is designed correctly. That's a bold claim, but the Rust implementation and the active release cadence (v3.0.5 dropped on June 5, 2026, with v3.0.4 the day before) suggest the team is shipping fast. The TypeScript SDK means it plugs directly into the React/Node.js ecosystem without friction, and the Rust SDK gives backend developers native performance.

What caught my attention on Hacker News (85 points on a "Show HN" thread) was the `helix chef` command — an interactive bootstrapper that scaffolds a project, starts a local instance, seeds example data, and can hand off to a coding agent (Claude Code, Codex, OpenCode) to build a working app from a one-line description. That kind of developer experience is rare in the database world.

### Key Features

**Graph-Vector Hybrid Data Model.** HelixDB treats graph traversals and vector similarity search as first-class operations that can be combined in a single query. You can traverse relationships between nodes and filter by vector distance in the same request. This is exactly what RAG applications need — retrieve related entities through graph connections, then rank them by embedding similarity.

**TypeScript and Rust SDKs with DSL.** Queries are authored using a fluent DSL in either TypeScript or Rust, producing the same JSON AST. The TypeScript SDK uses a builder pattern that feels natural to frontend developers: `g().addN("User", { name: "John" })` creates a node, `g().nWithLabel("User").where(Predicate.eq("name", "John"))` queries it. No raw Cypher or Gremlin to learn.

**One-Command Local Development.** `helix start dev` spins up a local instance on port 6969 with in-memory storage. Add `--disk` to persist across restarts. The CLI manages the entire lifecycle — init, start, stop, query, deploy. This is the kind of friction-free local dev experience that made SQLite and Redis popular.

**`helix chef` Interactive Bootstrapper.** This is the standout developer experience feature. Run `helix chef`, answer what you want to build, and it scaffolds a project with example data, starts a local instance, and generates a prompt file for coding agents. If Claude Code or Codex is available, it hands off and builds a working app — frontend included.

**Object-Storage-Backed Cloud.** HelixDB Cloud runs on object storage with integrated vector and full-text search, ACID transactions, a single writer with auto-scaling readers, and high availability (3+ gateways and DB nodes). The cloud architecture avoids the expensive-VM problem that plagues managed database services like PlanetScale or Neon.

**ACID Transactions with Multi-Model Support.** Full ACID guarantees across graph, vector, key-value, document, and relational operations. This is non-negotiable for production AI applications that need consistent state — you can't have a knowledge graph where some edges exist but their connected nodes don't.

**Rust Performance.** Being built from scratch in Rust means no garbage collector pauses, predictable latency, and efficient memory usage. The query planner optimizes graph traversals and vector searches together, which is something you can't do when graph and vector databases are separate systems.

### Use Cases

- **RAG applications with knowledge graphs** — Store documents as graph nodes with vector embeddings, traverse relationships to find context, then rank by similarity. The unified query model eliminates the "query two databases and merge results" pattern.
- **AI agent memory systems** — Agents need to store and retrieve structured knowledge (entities, relationships, facts) alongside unstructured embeddings. HelixDB's multi-model approach handles both without requiring a separate vector store.
- **Recommendation engines** — Model user-item interactions as a graph, embed item features as vectors, and combine graph-based collaborative filtering with embedding-based content filtering in a single query.
- **Fraud detection and anomaly analysis** — Graph traversals to find suspicious connection patterns, combined with vector similarity to flag transactions that look like known fraud vectors.
- **Content management with semantic search** — Store content as documents with typed relationships (author→article→topic), embed text for semantic search, and use graph queries for navigation and discovery.

### Pros and Cons

Pros:
- Eliminates the multi-database integration tax that every AI application pays today. One system, one query language, one deployment.
- The TypeScript SDK with fluent DSL lowers the barrier for frontend and fullstack developers who don't want to learn Cypher or Gremlin.
- `helix chef` is genuinely innovative — I haven't seen a database CLI that bootstraps a full app through an AI coding agent before.
- Very active development: 3 releases in 4 days (v3.0.3 through v3.0.5), 22 contributors, and 8 open issues suggest a healthy project velocity.

Cons:
- Young project with a small team. Production readiness is the open question — 4,700 stars is impressive but doesn't prove the database handles real workloads at scale.
- The graph-vector hybrid query model is novel, which means fewer community resources, Stack Overflow answers, and battle-tested patterns compared to Postgres+pgvector or Neo4j.
- Cloud pricing isn't transparent on the website. The object-storage architecture should be cheaper than VM-based managed databases, but you need to contact sales for details.
- No mention of horizontal sharding or multi-region replication for the graph data. Fine for most applications, but a limitation for globally distributed systems.

### Getting Started

```bash
# Install the CLI
curl -sSL "https://install.helix-db.com" | bash

# Quick start with the interactive bootstrapper
helix chef

# Or manual setup
mkdir my-helix-app && cd my-helix-app
helix init
helix start dev

# Send a query
helix query dev --file examples/request.json

# Stop when done
helix stop dev
```

For the TypeScript SDK:

```bash
npm init -y
npm install @helix-db/helix-db
```

```ts
import { g, Predicate, writeBatch, readBatch, defineParams, param } from "@helix-db/helix-db";

const addUser = defineParams({ name: param.string() });
function createUser(p = addUser) {
  return writeBatch()
    .varAs("user",
      g().addN("User", { name: "John Doe" })
    )
    .returning(["user"]);
}

const result = await fetch("http://localhost:6969/v1/query", {
  method: "POST",
  headers: { "content-type": "application/json" },
  body: createUser().toDynamicJson(addUser, { name: "John Doe" }),
}).then(r => r.json());
```

### Alternatives

**Neo4j + Pinecone** — The most common graph + vector combination today. Neo4j is the market leader in graph databases with a mature query language (Cypher) and extensive tooling. Pinecone is a managed vector database with excellent performance. The advantage of this combo is maturity and community size. The disadvantage is running two systems, managing data sync between them, and paying for two services. Choose this if you need battle-tested production infrastructure and can tolerate the integration complexity.

**SurrealDB** — Another multi-model database that supports graph, document, relational, and key-value data. SurrealDB is more mature (v2.x) and has a SQL-like query language that's easier to learn. It lacks native vector search, though — you'd need to pair it with pgvector or a separate vector store. Choose SurrealDB if you want multi-model flexibility without the AI-first positioning, or if you prefer SQL-like queries over graph DSLs.

**Postgres + pgvector** — The pragmatic choice. Postgres already handles relational data, and pgvector adds vector similarity search. You lose the graph traversal capabilities, but you gain decades of production hardening, a massive ecosystem, and the ability to use raw SQL. Choose this if your data model is primarily relational with some vector search needs, and you don't need graph traversals.

### Verdict

HelixDB is the most interesting database project I've seen in the AI space this year. The graph-vector hybrid model directly addresses the integration pain that every developer building RAG applications or AI agent memory systems feels today. The TypeScript SDK is well-designed, the `helix chef` bootstrapper is a genuinely creative developer experience play, and the Rust implementation gives me confidence in the performance fundamentals. It's YC-backed, actively developed (22 contributors, releases every day or two), and the community is growing fast.

The honest risk is maturity. This is a v3.x project that's been public for about seven months. Production databases need years of hardening, and HelixDB hasn't had that yet. If you're building a side project, a prototype, or an internal tool, I'd seriously evaluate it today. For production systems handling critical data, I'd watch it for another six months and see how the cloud service performs under real workloads. But the trajectory is right — this is the kind of project that could become the default database for AI-native applications within a year.
