---
name: mnemo
description: "Mnemo is a local-first AI memory sidecar built in Rust — persistent knowledge graph, entity extraction, and semantic retrieval for any LLM, zero cloud dependency."
url: https://github.com/zaydmulani09/mnemo
stars: 193
forks: 6
language: Rust
tags: ["ai-memory", "knowledge-graph", "llm", "rust", "local-first"]
featured: false
publishedAt: 2026-06-07
---

## Mnemo

### Overview

Mnemo is a local-first AI memory layer that gives any LLM persistent, structured memory between sessions. It's a single Rust binary that acts as a sidecar service — you POST text to it, it extracts entities and relationships using your configured LLM, builds a knowledge graph in SQLite, and injects scored, ranked context back into future prompts. All in under 50ms retrieval latency. No cloud, no Python runtime, no vendor lock-in.

The project is built by zaydmulani09, a developer who clearly got tired of watching LLM applications lose context between conversations. The repo has been active since early April 2026 with steady commits focused on documentation, API design, and performance. It's MIT-licensed, ships on crates.io as `mnemo-core` and on PyPI as `mnemo-sdk`, and supports Docker deployment with Ollama for a fully free, fully local setup.

The core problem mnemo solves is one every developer building custom LLM pipelines has hit: your AI has no memory. You build a chatbot, a coding assistant, or an internal tool, and every conversation starts from zero. Existing solutions either require cloud services (adding latency, cost, and privacy concerns), store memory as flat text dumps with no structure, or lock you into a specific LLM provider. Mnemo takes a different approach — it treats memory as a graph problem, with entities as nodes and relationships as weighted edges, then traverses that graph at query time to find relevant context.

### Why it matters

The AI memory space is heating up fast. Every major framework — LangChain, LlamaIndex, CrewAI — ships some form of memory component, but most are thin wrappers around vector stores with basic retrieval. They work for simple use cases but fall apart when you need structured, persistent memory that understands relationships between concepts. If your assistant talked about "the payment service" yesterday and "Stripe integration" today, a flat vector store might not connect those dots.

Mnemo's graph-based approach is what sets it apart. Entities are deduplicated across sessions by name and type, relationships are weighted, and retrieval uses a 6-stage pipeline: full-text chunk search, entity name search, graph expansion via BFS, relation filtering, scoring and ranking, and final context assembly. Direct matches always score higher than graph-expanded results (0.5x weighting), so you get precision with recall as a bonus.

The timing matters too. As of mid-2026, the developer community is building more custom AI pipelines than ever — not just using ChatGPT, but wiring together Ollama, local models, RAG pipelines, and multi-agent systems. These builders need memory that's fast, local, and works with whatever LLM they choose. Mnemo is built exactly for that audience.

### Key Features

**Knowledge Graph with Entity Extraction.** Every piece of text you ingest gets processed through your configured LLM to extract named entities (people, tools, places, concepts) and the relationships between them. Entities are deduplicated by name+type across sessions, and aliases are merged automatically. The graph lives in SQLite with an in-memory petgraph overlay for fast traversal. This means your memory gets smarter as you add more data — the graph density increases, and retrieval quality improves.

**6-Stage Retrieval Pipeline.** When you query mnemo, it doesn't just do a vector similarity search. It runs a multi-stage pipeline: full-text chunk search, entity name matching, BFS graph expansion (configurable depth up to 5 hops), relation filtering, confidence scoring, and context assembly. The result is a ranked `context_prompt` string you inject directly into your LLM's system prompt. Retrieval latency averages 4.2ms on Apple M2 hardware.

**Provider-Agnostic LLM Backend.** Mnemo works with Ollama (fully local, free), OpenAI, Anthropic, or any OpenAI-compatible API. You set the base URL and model via environment variables or a TOML config file. This means you can start with Ollama for development, switch to GPT-4o-mini for production, and move to Anthropic later — all without changing your application code. The entity extraction quality depends on your model, but the architecture doesn't care which one you use.

**Single Static Binary.** The entire server compiles to a single Rust binary. No Python environment, no Node.js runtime, no Docker required (though Docker is available). You can deploy it on a Raspberry Pi, a VPS, or alongside your application in a container. The SQLite database is a single file you can back up, move, or replicate. This is deliberately simple — mnemo is a sidecar, not a platform.

**REST API + Python SDK + CLI.** Three interfaces for the same functionality. The REST API (Axum-based) handles HTTP requests from any language. The Python SDK (`pip install mnemo-sdk`) provides both sync and async clients with type hints. The CLI lets you ingest, search, list entities, and check stats from the terminal. You can use all three simultaneously against the same running server.

**Full-Text Search and Graph Neighbors.** Beyond the retrieval pipeline, mnemo exposes direct search endpoints. `POST /search` does full-text search across both entities and chunks. `GET /entities/:id/neighbors` traverses the knowledge graph to a configurable depth (max 5), returning related entities with their relationship types and weights. This makes it useful not just for prompt injection but for exploring your accumulated knowledge.

**Performance-Built for Real-Time Use.** Entity insert averages 0.12ms. Full-text search averages 0.28ms. Even the full retrieval pipeline with graph expansion runs in 4.2ms. These are debug build numbers — release builds are 3-5x faster. The benchmarks are included in the repo (`cargo run -p mnemo-bench`) so you can verify on your own hardware. This matters because memory retrieval happens on every prompt — it can't add noticeable latency.

### Use Cases

- **Custom AI chatbots with persistent memory** — Build a customer support bot that remembers previous interactions, customer preferences, and past issues across sessions without sending data to external memory services.
- **Coding assistants that learn your codebase** — Ingest documentation, code reviews, and architecture decisions so your AI assistant understands project context, team conventions, and technical debt over time.
- **Research and knowledge management** — Feed articles, notes, and meeting transcripts into mnemo, then query it later to find connections between ideas, people, and projects you've discussed.
- **Multi-agent systems with shared memory** — Multiple agents can write to and read from the same mnemo instance, building a shared knowledge graph that persists across agent runs and orchestrations.
- **Local-first AI applications** — For privacy-sensitive use cases (healthcare, legal, finance) where data can't leave the network, mnemo runs entirely on your infrastructure with zero cloud dependencies.

### Pros and Cons

Pros:
- The graph-based retrieval is genuinely better than flat vector store approaches for complex, multi-session memory. Entity deduplication and relationship traversal catch connections that similarity search misses.
- Zero cloud dependency and a single Rust binary make deployment trivial. No Python environment to manage, no vendor APIs to worry about, no recurring costs for the memory layer itself.
- Provider-agnostic design means you're not locked into any LLM. Switch between Ollama, OpenAI, and Anthropic by changing environment variables. Your memory data stays the same.
- Performance numbers are real — 4.2ms retrieval with graph expansion is fast enough for real-time prompt injection without noticeable latency.

Cons:
- At 193 stars and a single maintainer, the project is early-stage. The API surface is likely to change, and there's no guarantee of long-term maintenance. Production use requires accepting that risk.
- Entity extraction quality depends entirely on your LLM. With smaller local models (like llama3 via Ollama), extraction is noisier and less accurate than with GPT-4o or Claude. You get what you pay for in model quality.
- SQLite works fine for single-instance deployments, but there's no built-in support for distributed or multi-node setups. If you need memory shared across multiple servers, you'll need to handle replication yourself.

### Getting Started

```bash
# Path A: Docker + Ollama (fully local, fully free)
git clone https://github.com/zaydmulani09/mnemo
cd mnemo
docker compose up -d

# Pull the model (~4 GB first time)
docker exec mnemo-ollama ollama pull llama3

# Verify health
curl http://localhost:8080/health

# Path B: Install from source
cargo install --path crates/mnemo-api

# Run with Ollama
export MNEMO_LLM_BASE_URL=http://localhost:11434/v1
mnemo-api

# Or run with OpenAI
export MNEMO_LLM_BASE_URL=https://api.openai.com/v1
export MNEMO_LLM_API_KEY=sk-***
export MNEMO_LLM_MODEL=gpt-4o-mini
export MNEMO_LLM_PROVIDER=openai
mnemo-api
```

Store and retrieve memories:

```bash
# Python SDK
pip install mnemo-sdk

python3 -c "
from mnemo import MnemoClient
client = MnemoClient()

# Store a memory
client.ingest('Alice is a principal engineer at Stripe working on payments')

# Retrieve relevant context
context = client.get_context('what does Alice work on?')
print(context)
"

# Or use the CLI
cargo install --path crates/mnemo-cli
mnemo ingest "I use Neovim and prefer dark mode"
mnemo search "what editor do I use?"
mnemo entities
```

### Alternatives

**Mem0** — The most popular open-source AI memory layer with 25K+ GitHub stars. Mem0 uses vector embeddings for memory storage and retrieval, supports multiple LLM providers, and offers both self-hosted and cloud options. It's more mature and has a larger community, but lacks mnemo's knowledge graph layer. Choose Mem0 if you want a battle-tested solution with cloud hosting and don't need graph-based entity relationships.

**LangChain Memory Modules** — LangChain ships several memory implementations (ConversationBufferMemory, ConversationSummaryMemory, VectorStoreRetrieverMemory) that integrate directly with its chain/pipeline architecture. These are convenient if you're already using LangChain, but they're tightly coupled to the framework and most store memory as flat text or simple vectors. Choose LangChain's memory if you're building within its ecosystem and need memory as a component, not a standalone service.

**Zep** — An open-source memory server for AI assistants that focuses on conversation history, user fact extraction, and retrieval. Zep has a Go-based server, supports multiple databases, and offers both open-source and cloud versions. It's more focused on conversation management than knowledge graph construction. Choose Zep if your primary need is conversation history with some fact extraction, rather than structured entity-relationship memory.

### Verdict

Mnemo is the kind of project that solves a real, specific problem without over-engineering the solution. The knowledge graph approach to AI memory is smarter than dumping everything into a vector store, and the Rust implementation means it's fast enough to sit in the critical path of every LLM call without adding latency. The provider-agnostic design and single-binary deployment are exactly right for the current moment — developers are building custom AI pipelines with local models, and they need memory infrastructure that doesn't require a cloud subscription or a Python environment.

It's early days. 193 stars and a single maintainer means this isn't production-ready for mission-critical systems. But for developers building personal AI tools, internal assistants, or prototyping multi-agent systems, mnemo is worth trying today. The graph-based retrieval genuinely produces better context than flat vector search, and the 50ms retrieval latency means you won't think twice about calling it on every prompt. If the project keeps growing, it could become the default memory layer for local-first AI applications.
