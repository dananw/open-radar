---
name: zvec
description: "Zvec is an in-process vector database from Alibaba — think SQLite for embeddings. 10K+ stars, hybrid search, and SDKs for Python, Node, Go, and Rust."
url: https://github.com/alibaba/zvec
stars: 10566
forks: 611
language: C++
tags: ["vector-database", "ai", "rag", "embedded", "search"]
featured: false
publishedAt: 2026-06-17
---

## Zvec

### Overview

Zvec is an in-process vector database built by Alibaba Group. It crossed 10,000 GitHub stars shortly after its v0.5.0 release on June 12, 2026, which added full-text search, hybrid retrieval, and a DiskANN index for billion-scale datasets. The core idea is simple: instead of running a separate vector database server (Milvus, Qdrant, Weaviate), you embed Zvec directly in your application the same way you'd use SQLite for relational data.

The project was born inside Alibaba's infrastructure team, where it handled production workloads at scale before open-sourcing. That matters because most open-source vector databases are built by startups iterating on an idea. Zvec came from a company that processes billions of similarity queries daily across search, recommendation, and RAG systems. The engineering decisions reflect that pressure — WAL-based durability, concurrent read access, and indexes that scale from in-memory to disk-backed.

The problem Zvec solves is the operational overhead of running a separate vector database. If you're building a RAG pipeline, a recommendation engine, or a semantic search feature, you typically need to deploy and manage a vector database alongside your application. That's another service to monitor, scale, and debug. Zvec eliminates that by running inside your process. You `pip install zvec` (or `npm install @zvec/zvec`), define a schema, insert vectors, and query — no servers, no Docker, no configuration files.

### Why it matters

The vector database market has exploded since 2023, but most solutions are client-server architectures designed for dedicated infrastructure teams. That's fine for companies running大规模 RAG systems, but it's overkill for the majority of developers who just need fast similarity search inside their application. Zvec fills a gap that the big players (Pinecone, Milvus, Weaviate) have mostly ignored: the embedded, zero-config use case.

The timing is significant. As AI agents and RAG pipelines become standard in web applications, developers need vector search that's as easy to use as an ORM. You don't deploy a separate PostgreSQL server for every small app — you use SQLite. Zvec applies the same logic to vectors. The v0.5.0 release makes this even more compelling by adding full-text search and hybrid retrieval, so you can combine keyword matching with semantic similarity in a single query without bolting on Elasticsearch.

For fullstack developers building with React, NestJS, Django, or Go, Zvec offers a path to adding AI-powered search and recommendations without introducing new infrastructure dependencies. The Node.js and Python SDKs mean it works in both backend environments, and the Go and Rust bindings cover the systems-level use cases.

### Key Features

**In-Process Architecture.** Zvec runs inside your application process, not as a separate service. There's no network hop, no connection pooling, no service discovery. You create a collection, insert vectors, and query them from the same codebase. This cuts latency to microseconds for local queries and eliminates an entire class of operational failures — no more debugging why your vector database connection dropped at 3am.

**Hybrid Search.** The v0.5.0 release introduced `MultiQuery`, which combines dense vector similarity, sparse vector matching, full-text search, and scalar filters in a single query. This is what production RAG systems actually need — you rarely want pure semantic search or pure keyword search. You want "find documents semantically similar to this query, filtered by date range, with keyword matching on the title." Zvec does that in one call.

**Full-Text Search (FTS).** Native keyword-based search built into the engine, not bolted on via an external service. You attach an FTS index to any string field and query it with natural-language or structured expressions. For web applications, this means you can offer both "search by meaning" and "search by exact term" from the same database without running Elasticsearch alongside your vector store.

**DiskANN Index.** For datasets that don't fit in memory, Zvec's DiskANN index keeps the bulk of the index on disk while maintaining fast query performance. This makes billion-scale vector search feasible on machines with limited RAM — important for developers running on commodity hardware or edge devices where you can't just throw more memory at the problem.

**Multi-Language SDKs.** Official bindings for Python (`pip install zvec`), Node.js (`npm install @zvec/zvec`), Go, Rust, and Dart/Flutter. The Python and Node.js SDKs are the most mature, with the Go and Rust bindings wrapping the C API via cgo and FFI respectively. For a fullstack developer, this means the same vector database works in your Django backend, your NestJS API, and your Go microservices.

**WAL-Based Durability.** Write-ahead logging guarantees that data survives process crashes and power failures. This is table stakes for a database, but many embedded vector stores skip it or implement it poorly. Zvec's WAL is production-tested at Alibaba scale, so you're not trusting your data to a weekend project.

**Concurrent Read Access.** Multiple processes can read from the same collection simultaneously, with writes being single-process exclusive. This matches the SQLite concurrency model and works well for web applications where multiple worker processes serve read-heavy workloads.

### Use Cases

- **RAG pipelines in web apps** — Store document embeddings alongside your application code, query them with hybrid search, and feed results to your LLM without a separate vector database deployment.
- **Semantic search features** — Add "search by meaning" to any web application. Users type natural language queries, Zvec finds semantically similar content from your vector index.
- **Recommendation engines** — Store user and item embeddings, compute similarity on the fly, and serve recommendations directly from your application process with sub-millisecond latency.
- **AI agent memory** — Give your AI agents persistent vector memory that lives alongside their code. No external services to manage, no network latency for memory lookups.
- **Edge and offline applications** — Zvec runs anywhere your code runs, including edge devices and offline environments. Build search features that work without internet connectivity.

### Pros and Cons

Pros:
- Zero operational overhead — no servers to deploy, monitor, or scale. Install the package and start querying in seconds.
- Hybrid search (vector + FTS + scalar filters) in a single query eliminates the need for separate Elasticsearch or Meilisearch deployments.
- Battle-tested at Alibaba scale, which gives more confidence than a startup's weekend project.
- Active development with 496 merged PRs, 5 contributors with 25+ commits each, and releases every few weeks.

Cons:
- Single-process write access limits horizontal scaling for write-heavy workloads. If you need distributed writes, you still need Milvus or Qdrant.
- The Go and Rust SDKs are newer and less mature than the Python and Node.js bindings. Expect rough edges in the non-Python/Node ecosystems.
- No built-in replication or clustering — this is an embedded database, not a distributed system. Don't try to replace a production Milvus cluster with it.
- Documentation is decent but still catching up to the feature set. Some advanced configurations require reading source code.

### Getting Started

```bash
# Python
pip install zvec

# Node.js
npm install @zvec/zvec
```

Basic Python usage:

```python
import zvec

# Define a collection with a vector field
schema = zvec.CollectionSchema(
    name="documents",
    vectors=zvec.VectorSchema("embedding", zvec.DataType.VECTOR_FP32, 768),
    fields=[
        zvec.FieldSchema("text", zvec.DataType.STRING),
    ],
)

# Create and open the collection
collection = zvec.create_and_open(path="./my_vectors", schema=schema)

# Insert documents with embeddings
collection.insert([
    zvec.Doc(id="doc_1", vectors={"embedding": [0.1, 0.2, ...]}, fields={"text": "hello world"}),
    zvec.Doc(id="doc_2", vectors={"embedding": [0.3, 0.4, ...]}, fields={"text": "goodbye world"}),
])

# Query by vector similarity
results = collection.query(
    zvec.VectorQuery("embedding", vector=[0.15, 0.25, ...]),
    topk=10
)
```

Node.js usage:

```javascript
const { CollectionSchema, VectorSchema, DataType } = require("@zvec/zvec");

const schema = new CollectionSchema({
  name: "documents",
  vectors: new VectorSchema("embedding", DataType.VECTOR_FP32, 768),
});

const collection = await zvec.createAndOpen({ path: "./my_vectors", schema });
// Insert and query similarly to the Python API
```

### Alternatives

**Qdrant** — A Rust-based vector database with a client-server architecture, rich filtering, and excellent performance. Qdrant is the better choice when you need distributed deployment, replication, or a dedicated vector search service. Choose Zvec when you want zero-config embedded search without running another service.

**SQLite-vss** — An SQLite extension for vector search that adds vector similarity to SQLite databases. It's a natural fit if you're already using SQLite and want to add vector search to existing tables. Zvec is purpose-built for vector workloads with better index types (HNSW, IVF, DiskANN) and hybrid search capabilities. Choose SQLite-vss for simple additions to existing SQLite databases; choose Zvec for anything more complex.

**LanceDB** — An embedded vector database written in Rust with a columnar storage format. LanceDB has a similar "no server" philosophy and supports multimodal data. It's a strong alternative if you need Apache Arrow integration or work heavily with image/video embeddings. Zvec has broader language SDK coverage and the v0.5.0 hybrid search is more mature.

### Verdict

Zvec is the most practical vector database for developers who don't want to operate a vector database. The "SQLite for embeddings" pitch is accurate — you install a package, define a schema, and query. No Docker, no Kubernetes, no connection strings. The v0.5.0 release with full-text search and hybrid retrieval makes it genuinely useful for production RAG pipelines, not just toy demos. At 10K+ stars with active development from Alibaba's engineering team, it has the momentum and backing to stick around. If you're building AI features into a web application and don't need distributed vector search, Zvec should be your first choice. Save the Milvus deployment for when you actually need it.
