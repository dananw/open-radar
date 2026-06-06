---
name: mempalace
description: "MemPalace is a local-first AI memory system with 96.6% recall accuracy, MCP server, and knowledge graph — zero API calls required."
url: https://github.com/MemPalace/mempalace
stars: 53993
forks: 7089
language: Python
tags: ["ai-memory", "mcp", "knowledge-graph", "agents", "local-first"]
featured: false
publishedAt: 2026-06-06
---

## MemPalace

### Overview

MemPalace hit 54,000 GitHub stars in two months. That kind of velocity usually signals either a massive marketing push or a tool that solves a real, painful problem. In this case, it's the latter. MemPalace is a local-first AI memory system that stores conversation history as verbatim text and retrieves it with semantic search — no summarization, no paraphrasing, no cloud API calls.

The project is developed by the MemPalace organization on GitHub and ships as a Python CLI and library. Its architecture is deliberately structured: people and projects become "wings," topics become "rooms," and original content lives in "drawers." This isn't just a naming convention — it's a retrieval strategy. Searches can be scoped to specific wings or rooms instead of hitting a flat corpus, which is why the benchmarks are so strong.

And those benchmarks are the headline. On LongMemEval (500 questions), MemPalace scores 96.6% R@5 with raw semantic search — no heuristics, no LLM reranking, no API key. The hybrid pipeline with keyword boosting and temporal proximity reaches 98.4% on held-out data. Add an LLM reranker and you're above 99%. For anyone building AI agents that need to remember context across sessions, these numbers matter more than any marketing claim.

### Why it matters

The AI agent space has a memory problem. Every LLM-based agent starts each conversation with a blank slate unless you build custom retrieval infrastructure. Teams stitching together vector databases, embedding models, and chunking strategies end up with fragile, one-off solutions. MemPalace packages that entire pipeline into a single tool with reproducible benchmarks.

What makes this particularly relevant right now is the MCP (Model Context Protocol) angle. MemPalace ships 29 MCP tools covering palace reads/writes, knowledge graph operations, cross-wing navigation, and drawer management. That means Claude, ChatGPT, Cursor, and any MCP-compatible tool can query your memory system directly. No glue code, no custom integration layer. The tool also supports Gemini CLI and local models via Ollama.

The local-first design is another differentiator. Nothing leaves your machine unless you opt in. The embedding model runs locally (embeddinggemma-300m, supporting 100+ languages), and the default vector store is ChromaDB. For developers handling sensitive codebases or regulated data, this isn't just a nice-to-have — it's a requirement. The fact that the core benchmark path needs zero API keys makes it accessible to anyone with a Python 3.9+ environment.

### Key Features

**Verbatim Storage Without Summarization.** Most memory systems summarize or extract key facts from conversations, losing nuance and context. MemPalace stores the original text exactly as it appeared. When you search for "why did we switch to GraphQL," you get the actual conversation where that decision was made — not a compressed version that might miss the reasoning. This design choice is why the raw retrieval numbers are so high.

**Structured Palace Architecture.** The wing-room-drawer hierarchy isn't just organizational. It enables scoped search — query a specific project wing instead of scanning everything. For developers managing multiple codebases or clients, this means faster, more relevant results. The structure also maps naturally to how developers think about their work: project, topic, detail.

**Temporal Knowledge Graph.** Beyond vector search, MemPalace includes a temporal entity-relationship graph backed by local SQLite. Entities have validity windows, so you can query what was true at a specific point in time. Add, query, invalidate, and timeline operations are all supported. This is useful for tracking architectural decisions that evolve — "what was our auth strategy in March?" gets a different answer than the same question today.

**MCP Server with 29 Tools.** The built-in MCP server exposes reads, writes, knowledge graph operations, cross-wing navigation, drawer management, and agent diaries. This means any MCP-compatible tool (Claude Desktop, Cursor, Claude Code, custom agents) can interact with your memory system without custom integration code. The MCP protocol is becoming the standard for tool-agent communication, and MemPalace is one of the most complete MCP implementations available.

**Pluggable Vector Backend.** ChromaDB is the default, but the retrieval interface is defined in a single base class. Drop in Pinecone, Qdrant, Weaviate, or any custom backend without touching the rest of the system. The abstraction is clean — implement the interface, swap the config, and your memory system runs on a different store. This avoids the vendor lock-in that plagues many vector database integrations.

**Agent Wing System.** Each specialist agent gets its own wing and diary in the palace. Agents are discoverable at runtime via `mempalace_list_agents` — no bloat in your system prompt. A code review agent, a documentation agent, and a debugging agent each maintain separate memory contexts while sharing the same palace infrastructure. This is how multi-agent systems should handle memory.

**Claude Code Auto-Save Hooks.** Two hooks save conversation state periodically and before context compression. This solves one of the most annoying problems with Claude Code sessions — losing context when sessions expire or get compressed. The hooks are wired to fire automatically, and there's a retention setup checklist in the docs for quick configuration.

### Use Cases

- **Multi-session development projects** — Developers working on a codebase over weeks or months can mine project files and Claude Code sessions into the palace, then search for context across all historical conversations. No more "what was that API change we discussed last Tuesday?"

- **AI agent memory layer** — Teams building custom agents with LangChain, CrewAI, or raw LLM calls can use MemPalace as a drop-in memory backend via the Python API or MCP tools. The agent gets persistent memory without building custom vector storage.

- **Research and knowledge management** — Researchers mining papers, notes, and meeting transcripts can structure them into wings and rooms, then query across the corpus with semantic search. The knowledge graph tracks relationships between concepts over time.

- **Client project isolation** — Consultants or agencies managing multiple client projects can use separate wings per client, ensuring memory contexts never bleed across project boundaries while maintaining a unified search interface.

- **Local-first AI workflows** — Teams in regulated industries (healthcare, finance, legal) that cannot send conversation data to external APIs get full memory capabilities with zero cloud dependencies. The embedding model and vector store run entirely on the developer's machine.

### Pros and Cons

Pros:
- 96.6% retrieval recall on LongMemEval with zero API calls — the benchmark numbers are reproducible from the repo and represent real performance, not cherry-picked results.
- Local-first architecture means no data leaves your machine, no API keys needed for core functionality, and no recurring costs for vector database hosting.
- MCP server integration with 29 tools makes it immediately compatible with Claude, Cursor, and the growing ecosystem of MCP-aware development tools.
- Temporal knowledge graph adds a dimension that pure vector search can't — tracking how information and decisions change over time.

Cons:
- Python-only ecosystem means JavaScript/TypeScript developers need to run a separate Python service or use the MCP tools as an external process. No npm package available.
- ChromaDB default backend has known performance limitations at scale (millions of vectors). Teams with very large corpora may need to implement alternative backends.
- The 300 MB embedding model download is a non-trivial first-install cost, especially for CI/CD environments or containerized deployments where image size matters.
- 569 open issues suggest the API surface is still evolving rapidly. Expect breaking changes between major versions as the project matures.

### Getting Started

```bash
# Install with uv (recommended)
uv tool install mempalace

# Or with pipx
pipx install mempalace

# Or in a virtualenv
python -m venv .venv && source .venv/bin/activate
pip install mempalace

# Initialize a project
mempalace init ~/projects/myapp

# Mine content into the palace
mempalace mine ~/projects/myapp                    # project files
mempalace mine ~/.claude/projects/ --mode convos   # Claude Code sessions

# Search your memory
mempalace search "why did we switch to GraphQL"

# Load context for a new session
mempalace wake-up
```

For MCP integration, add the MemPalace MCP server to your Claude Desktop or Cursor config. Full setup guide at [mempalaceofficial.com/guide/getting-started](https://mempalaceofficial.com/guide/getting-started.html).

### Alternatives

**Mem0** — A popular AI memory layer with cloud and self-hosted options. Mem0 focuses on extracting structured facts from conversations rather than storing verbatim text. It has a cleaner JavaScript/TypeScript SDK and better documentation for web developers, but its retrieval approach loses the nuance that verbatim storage preserves. Choose Mem0 if you need a managed service with a REST API and don't mind the summarization trade-off.

**Supermemory** — Another open-source memory system with a focus on simplicity. Supermemory is lighter weight and easier to set up for basic use cases, but lacks MemPalace's knowledge graph, structured palace architecture, and benchmark depth. Choose Supermemory if you want a minimal memory layer without the complexity of wings, rooms, and temporal graphs.

**Zep** — A commercial memory platform with strong enterprise features and a polished SDK. Zep offers better production tooling (monitoring, analytics, managed infrastructure) but requires cloud hosting and has pricing that scales with usage. Choose Zep if you need enterprise SLAs and don't want to manage your own memory infrastructure.

### Verdict

MemPalace is the most rigorous open-source AI memory system available right now. The 96.6% raw retrieval accuracy on a published, reproducible benchmark is the kind of claim that actually holds up — you can clone the repo and verify it yourself in under an hour. The local-first architecture, MCP integration, and knowledge graph make it more than a vector search wrapper. It's a genuine memory infrastructure layer for AI agents.

The 54K stars in two months reflect real developer demand for this category of tool. If you're building agents that need to remember context across sessions, MemPalace should be your first evaluation. The Python-only limitation is real if you're a pure JavaScript shop, but the MCP tools bridge that gap for any tool that speaks the protocol. Start with `uv tool install mempalace` and mine your Claude Code sessions — you'll have a working memory system in five minutes.
