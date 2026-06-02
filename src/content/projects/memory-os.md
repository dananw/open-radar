---
name: memory-os
description: "Memory OS is a 7-layer memory operating system for Hermes Agent — persistent memory with Qdrant, structured facts with trust scoring, and a Ground Truth hierarchy that makes agents actually use injected context."
url: https://github.com/ClaudioDrews/memory-os
stars: 597
forks: 46
language: Python
tags: ["ai-agents", "memory", "hermes-agent", "local-first", "developer-tools"]
featured: false
publishedAt: 2026-06-03
---

## Memory OS

### Overview

Memory OS is a complete memory infrastructure layer for Hermes Agent that solves the most persistent problem in AI agent tooling: amnesia. Launched on May 31, 2026, it accumulated nearly 600 GitHub stars in its first three days — a velocity that suggests the developer community has been waiting for exactly this kind of solution.

The project was built by Claudio Drews, a developer who ran Hermes Agent daily in production and hit every limitation of stock memory handling. Rather than patch around the edges, he designed a seven-layer memory architecture from scratch: workspace files, session history with full-text search, structured facts with trust scoring, cross-session fabric recall, a Qdrant vector database with hybrid search, an auto-curating LLM wiki, and — most critically — a Ground Truth hierarchy that forces the agent to actually use injected context instead of ignoring it and re-discovering the same information from scratch.

The core problem is one every Hermes user recognizes. You spend hours teaching the agent your stack, your preferences, your project structure. Next session, it acts like it's meeting you for the first time. You repeat context. You re-explain decisions. You burn tokens re-establishing facts that should be permanent. Memory OS fixes this by giving the agent a persistent, searchable, self-organizing memory system that runs entirely on your machine.

### Why it matters

The AI agent ecosystem has a memory crisis. Every major agent framework — Hermes, Claude Code, Cursor, Windsurf — treats conversation history as disposable. You get a context window, you fill it up, and when the session ends, everything not manually saved vanishes. Cloud memory services like mem0, Zep, and Letta offer partial solutions, but they're cloud-first, subscription-based, and vendor-locked. For developers who run Hermes Agent with local models via Ollama, or who work on proprietary codebases that can't touch third-party servers, none of those options work.

Memory OS fills this gap with a fully local stack. Qdrant runs in Docker on your machine. SQLite databases hold your facts and session history. No data leaves your infrastructure. No subscription required. And it works with any LLM provider Hermes supports — OpenRouter, OpenAI, Anthropic, Ollama, or self-hosted models.

The timing matters too. Hermes Agent adoption has accelerated through 2026, but the experience gap between a fresh install and a tuned, memory-rich agent is enormous. Memory OS compresses that gap. It turns Hermes from a stateless tool into a long-term collaborator that remembers your projects, your decisions, your coding patterns, and your reasoning across every session. That's not a nice-to-have — it's the difference between an AI assistant and an AI colleague.

### Key Features

**7-Layer Memory Architecture.** Memory OS organizes memory into seven distinct layers, each handling a different aspect of persistence. Layer 1 (Workspace) injects MEMORY.md, USER.md, and CREATIVE.md into every system prompt. Layer 2 (Sessions) provides full-text search across your entire conversation history via SQLite FTS5. Layer 3 (Structured Facts) stores durable facts with entity resolution and trust scoring. Layer 4 (Fabric) handles cross-session recall through a heavily modified Icarus plugin fork. Layer 5 (Vector Database) uses Qdrant with 4096-dimensional cosine similarity plus BM25 sparse vectors. Layer 6 (LLM Wiki) auto-curates a knowledge vault. Layer 7 (Ground Truth) is the identity layer that makes everything else work.

**Ground Truth Hierarchy.** This is the feature that separates Memory OS from every other memory solution. Without it, the agent receives injected context but ignores it — it calls Qdrant APIs to verify points that are already in the prompt, runs fabric_recall to re-find entries that were just injected, and probes fact_store to confirm facts it was already told. Layer 7 instructs the agent at the system prompt level that injected memory is authoritative. The result: no wasted rediscovery, no token burn, no memory-zero behavior despite perfect injection. It's a simple insight with massive impact on token efficiency.

**Structured Facts with Trust Scoring.** Memory OS doesn't just store facts — it tracks how reliable they are. Each fact carries a trust score that evolves through an automatic feedback loop. When the agent uses a fact and it proves correct, the score increases. When a fact conflicts with new information, the score drops. Entity resolution prevents duplicate facts about the same concept. Over time, the fact store becomes more reliable than any static knowledge base because it self-corrects based on actual usage.

**Hybrid Vector Search with 4-Level Fallback.** The Qdrant integration uses a sophisticated fallback cascade: hybrid search (dense + sparse vectors) tries first, then dense-only, then lexical search, and finally SQLite full-text search as the last resort. A weekly decay scanner archives stale entries, and semantic deduplication merges entries with cosine similarity above 0.92. This means search results are always relevant, always fast, and never cluttered with outdated information.

**Self-Curating LLM Wiki.** Memory OS maintains an auto-curated vault organized into concepts, entities, and comparisons. The wiki isn't static — it's continuously ingested into Qdrant via a wiki-continuous-ingest pipeline, so new knowledge is always searchable. The Vault Curator component handles frontmatter enrichment, semantic linking, and MOC (Map of Content) index generation. Think of it as a personal knowledge graph that builds itself from your conversations.

**Surgical Context Injection.** Instead of dumping everything the agent might need into the context window, Memory OS uses gated retrieval with relevance thresholds. Each memory source is scored for relevance to the current query. Per-session deduplication prevents the same context from appearing twice. A social-closer filter skips trivial messages entirely. The agent gets exactly the context it needs — nothing more, nothing less. This is critical for developers running models with 8k-32k context windows where every token counts.

**Provider-Agnostic Local Infrastructure.** The entire memory stack runs in Docker — Qdrant for vectors, Redis for task queuing, ARQ for async workers. It works with any LLM provider Hermes supports. There's no cloud component, no API key for memory services, no subscription. If you can run Hermes, you can run Memory OS. This matters for enterprise teams with strict data residency requirements and solo developers who don't want another monthly bill.

### Use Cases

- **Long-running project development** — Developers working on multi-week or multi-month projects who need the agent to remember architectural decisions, code patterns, and past debugging sessions without re-explaining context every morning.
- **Enterprise teams with data residency requirements** — Organizations that can't send conversation history or code context to cloud memory services but still want persistent agent memory. Everything runs in Docker on internal infrastructure.
- **Multi-project developers** — Engineers who switch between several codebases and need the agent to maintain separate context for each project, with structured facts about each stack, each decision history, each team's conventions.
- **Hermes Agent power users** — Anyone running Hermes daily who has hit the frustration of amnesiac sessions. Memory OS transforms the agent from a stateless assistant into a persistent collaborator that improves over time.
- **Local model enthusiasts** — Developers running Hermes with Ollama or local models who need memory infrastructure that doesn't depend on cloud services. Works with Qwen3, DeepSeek, Llama 4, or any OpenAI-compatible endpoint.

### Pros and Cons

Pros:
- Solves the single biggest pain point in agent tooling — persistent, intelligent memory that actually gets used by the agent, not just injected and ignored.
- Fully local and private. No cloud dependency, no subscription, no vendor lock-in. Runs in Docker with Qdrant, Redis, and SQLite.
- The Ground Truth hierarchy is a genuinely novel insight. No other memory solution addresses the "injected but ignored" problem.
- Trust scoring on structured facts means the memory system self-corrects over time, becoming more reliable with use.
- Active development with fast community adoption — 600 stars in three days signals real demand.

Cons:
- Infrastructure overhead is real. You need Docker running Qdrant, Redis, and an ARQ worker, plus Python 3.11+. That's heavier than a simple plugin install.
- Tightly coupled to Hermes Agent. If you use Claude Code, Cursor, or another agent, Memory OS doesn't apply. The Ground Truth hierarchy is Hermes-specific.
- The project is three days old. Documentation covers the architecture well, but edge cases, upgrade paths, and long-term stability are unproven.
- Seven layers is a lot of conceptual overhead. New users may struggle to understand which layer does what and how they interact.

### Getting Started

```bash
# Clone the repository
git clone https://github.com/ClaudioDrews/memory-os.git
cd memory-os

# Start the infrastructure (Qdrant + Redis + ARQ)
docker compose up -d

# Install Python dependencies
pip install -r requirements.txt

# Configure your LLM provider in config.yaml
cp config.example.yaml config.yaml
# Edit config.yaml with your provider settings

# Initialize the memory system
python -m memory_os init

# Verify all layers are running
python -m memory_os status
```

### Alternatives

**mem0** — A popular memory layer for AI agents with a hosted cloud API. It offers automatic memory extraction and retrieval, but it's cloud-first with a subscription model. Choose mem0 if you want a managed service with zero infrastructure setup and don't mind sending your conversation data to a third party. Avoid it if you need local-first privacy or run Hermes Agent specifically.

**Zep** — A long-term memory service for AI assistants that focuses on temporal knowledge graphs and user modeling. Zep has strong enterprise features and better multi-user support than Memory OS, but it's also cloud-hosted and subscription-based. Choose Zep for production SaaS applications with multiple end users. Avoid it for personal agent setups or privacy-sensitive environments.

**Letta (formerly MemGPT)** — A research-focused memory framework that pioneered the concept of virtual context management for LLMs. Letta's approach to tiered memory is conceptually similar to Memory OS, but it's designed as a standalone agent framework rather than a memory layer for an existing agent. Choose Letta if you're building a custom agent from scratch. Avoid it if you're already committed to Hermes Agent and want drop-in memory.

### Verdict

Memory OS is the most important Hermes Agent community project to emerge in 2026 so far. The seven-layer architecture is overengineered in the best way — each layer exists because the author hit a specific failure mode in production and built the fix. The Ground Truth hierarchy alone is worth the install. It addresses the fundamental problem that no other memory solution has tackled: getting the agent to actually use the memory you inject instead of burning tokens to rediscover it. The local-first, provider-agnostic design means it works for everyone from solo developers running Ollama on a laptop to enterprise teams with air-gapped infrastructure. Yes, the infrastructure requirements are heavier than a simple plugin, and yes, the project is three days old with unproven stability. But if you run Hermes Agent daily and you're tired of amnesiac sessions, this is the project to watch. At 600 stars in 72 hours, the community agrees.
