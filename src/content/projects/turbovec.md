---
name: turbovec
description: "Turbovec is a Rust vector index with Python bindings built on Google's TurboQuant algorithm — faster than FAISS with zero training phase and 16x compression."
url: https://github.com/RyanCodrai/turbovec
stars: 8656
forks: 805
language: Python
tags: ["vector-search", "rust", "python", "rag", "quantization", "embeddings"]
featured: false
publishedAt: 2026-06-09
---

## Turbovec

### Overview

Turbovec is a Rust vector index with Python bindings that compresses and searches high-dimensional embeddings faster than FAISS — with no training step, no parameter tuning, and no rebuilds as your corpus grows. It hit 8,600 GitHub stars in under three months, with 1,700 of those arriving in a single day this week. That kind of velocity usually means a tool solved a problem people were actively frustrated by.

The project is built on Google Research's TurboQuant algorithm, published on arXiv in April 2025. The core insight is elegant: after applying a random rotation to your vectors, every coordinate follows a known distribution regardless of the input data. That means you can precompute the optimal quantization codebook from the math alone, not from your data. No k-means clustering, no separate train phase, no hyperparameter sweeps. You add vectors and they're immediately searchable.

The practical impact is significant. A 10 million document corpus that takes 31 GB of RAM as float32 fits in 4 GB with turbovec. Search latency beats FAISS IndexPQFastScan by 12–20% on ARM (Apple Silicon) and matches or beats it on x86. For fullstack developers building RAG pipelines, recommendation systems, or semantic search features, this changes the economics of what you can run on a single machine.

### Why it matters

Vector search has become a core building block for modern web applications. Every product with semantic search, RAG-powered chat, or content recommendations needs a vector index somewhere in the stack. The problem is that existing solutions force you into uncomfortable tradeoffs. FAISS is fast but requires a training phase and significant RAM. Managed vector databases (Pinecone, Weaviate, Qdrant) add latency, cost, and a dependency on someone else's infrastructure. For many applications — especially privacy-sensitive ones or startups watching their cloud bills — none of these options feel right.

Turbovec fills that gap. It's a local-first, pure-Python-install library that runs entirely on your machine or in your VPC. No data leaves your infrastructure. No managed service to pay for. No training phase to schedule. You `pip install turbovec`, add your vectors, and search. The Rust core handles the heavy lifting with hand-written SIMD kernels (NEON on ARM, AVX-512BW on x86), while the Python bindings keep the API clean and familiar.

The timing matters too. As AI agents become more common in web applications, the demand for fast, cheap vector search is exploding. Every RAG pipeline, every semantic search feature, every recommendation engine needs this. Turbovec makes it practical to embed production-quality vector search directly in your Python backend — Django, FastAPI, Flask — without spinning up a separate vector database service.

### Key Features

**Zero-Training Quantization.** Traditional product quantization requires a separate training phase where you cluster your data to learn codebooks. Turbovec skips this entirely. The TurboQuant algorithm uses a random rotation to make vector coordinates follow a known Beta distribution, then applies precomputed Lloyd-Max quantization. You add vectors and they're searchable immediately. No train step means no stale codebooks, no rebuilds as your corpus grows, and no hyperparameter tuning.

**SIMD-Optimized Search Kernels.** The search kernel is hand-written in Rust with platform-specific intrinsics — NEON for Apple Silicon and ARM, AVX-512BW for modern x86, with an AVX2 fallback. These aren't compiler auto-vectorized loops; they're carefully tuned implementations with nibble-split lookup tables. The result: 12–20% faster than FAISS FastScan on ARM and competitive-or-better performance on x86.

**16x Compression with Minimal Recall Loss.** At 4-bit quantization, a 1536-dimensional vector (standard for OpenAI embeddings) shrinks from 6,144 bytes to 768 bytes. At 2-bit, it's 384 bytes — a 16x compression ratio. The recall numbers are competitive with FAISS PQ across the board, and turbovec actually beats FAISS by 0.4–3.4 points at R@1 on OpenAI embeddings at both 2-bit and 4-bit.

**Filtered Search at the Kernel Level.** Need to search only within a subset of your corpus — a specific tenant, a time window, an ACL-filtered set? Pass an allowlist to `search()` and the filtering happens inside the SIMD kernel at 32-vector block granularity. Blocks with no allowed slots are short-circuited before any scoring work. No over-fetching, no recall hit on selective filters, and the output length is exactly `min(k, len(allowed))`.

**Framework Integrations.** Turbovec ships drop-in replacements for the vector stores in LangChain, LlamaIndex, Haystack, and Agno. Swap one import and your existing RAG pipeline gets the performance boost without changing any other code. This is the kind of pragmatic integration work that makes a library actually get adopted.

**Stable External IDs with O(1) Deletes.** The `IdMapIndex` wrapper lets you use your own uint64 IDs instead of internal slot indices. Delete by ID in O(1) time. Your IDs survive serialization roundtrips, so you can map database primary keys directly to vector store IDs without maintaining a separate lookup table.

### Use Cases

- **RAG pipelines for AI-powered web apps** — If you're building a chatbot or Q&A feature over your documentation, product catalog, or knowledge base, turbovec handles the retrieval step locally without a managed vector database. Works directly with LangChain and LlamaIndex.

- **Semantic search in SaaS products** — Add natural-language search to your Django or FastAPI backend. Users type a question, you embed it with your preferred model, and turbovec finds the most relevant results from your corpus in milliseconds.

- **Content recommendation engines** — For e-commerce or media platforms, turbovec can power "similar items" or "you might also like" features by searching for nearest neighbors in embedding space. The filtered search feature lets you restrict results to a specific category, user segment, or time range.

- **Privacy-sensitive applications** — Healthcare, legal, finance — any domain where data can't leave your infrastructure. Turbovec runs entirely locally with no external dependencies or telemetry. Pair it with a local embedding model for a fully air-gapped stack.

- **Cost-conscious startups** — Instead of paying for Pinecone or Weaviate per query, run turbovec on your existing application server. A 10M vector index fits in 4 GB of RAM — well within the budget of a $20/month VPS.

### Pros and Cons

Pros:
- No training phase means you can start searching immediately after adding vectors, and the index stays fresh as your corpus grows without rebuilds.
- The compression ratio (16x at 2-bit) dramatically reduces memory costs, making it practical to run vector search on commodity hardware instead of dedicated vector database instances.
- Filtered search at the kernel level is a genuine technical advantage — most vector databases do post-filtering, which wastes compute and can reduce result counts below your requested k.

Cons:
- Python bindings only for now — no JavaScript/TypeScript or Go SDK, which limits adoption in Node.js backends or Go microservices. You'd need to wrap it in a service.
- The TurboQuant algorithm assumes high-dimensional embeddings work best. At low dimensions (under ~300), the performance advantage over FAISS narrows, and at very low dimensions FAISS can actually beat it at R@1 for 2-bit quantization.
- Relatively new project (March 2026) means the ecosystem is still building. No production war stories yet, and the API surface may evolve.

### Getting Started

```bash
# Install from PyPI
pip install turbovec

# Basic usage
python3 -c "
from turbovec import TurboQuantIndex
import numpy as np

# Create index for 1536-dim embeddings (OpenAI ada-002, text-embedding-3, etc.)
index = TurboQuantIndex(dim=1536, bit_width=4)

# Add vectors — searchable immediately, no training
vectors = np.random.randn(10000, 1536).astype(np.float32)
index.add(vectors)

# Search
query = np.random.randn(1, 1536).astype(np.float32)
scores, indices = index.search(query, k=10)
print(f'Top 10 results: {indices[0]}')

# Save and load
index.write('my_index.tq')
loaded = TurboQuantIndex.load('my_index.tq')
"
```

For LangChain integration:

```bash
pip install turbovec[langchain]
```

```python
from turbovec import TurboQuantIndex
from langchain_core.vectorstores import InMemoryVectorStore
# Drop-in replacement — same API, faster search
```

### Alternatives

**FAISS** — Meta's vector search library is the industry standard and the benchmark turbovec measures itself against. FAISS offers more index types (IVF, HNSW, OPQ) and has years of production hardening. Choose FAISS if you need IVF-style indexes for billion-scale datasets or if your team already has expertise tuning FAISS pipelines. Choose turbovec if you want zero-config, zero-training vector search that just works.

**Qdrant** — An open-source vector database written in Rust with a client-server architecture, rich filtering, and a web UI. Qdrant is more feature-complete as a standalone service (multi-tenancy, snapshots, collections). Choose Qdrant if you need a dedicated vector database with a full query language and horizontal scaling. Choose turbovec if you want an in-process library with no server overhead.

**LanceDB** — An embedded vector database that stores data in Lance columnar format, with multimodal support and a serverless architecture. LanceDB is interesting for applications that need both vector search and structured data in the same store. Choose LanceDB if you want a unified storage layer. Choose turbovec if pure vector search performance and memory efficiency are your primary concerns.

### Verdict

Turbovec is the most practical vector search library I've seen for developers who want production-quality retrieval without the operational overhead of a managed vector database. The zero-training aspect alone is a significant improvement over FAISS for the common case — you add vectors and search, no babysitting required. The compression numbers are real, the SIMD kernels are genuinely faster on ARM, and the framework integrations mean you can drop it into an existing LangChain or LlamaIndex pipeline with a one-line import change. It's early days (three months old, no major production deployments yet), and the Python-only API limits its reach. But if you're building RAG features in a Python backend and you care about latency, memory cost, or data privacy, turbovec deserves serious evaluation. The 8,600 stars and 1,700-star single-day spike suggest the developer community has been waiting for exactly this kind of tool.
