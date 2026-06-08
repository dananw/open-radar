---
name: tencentdb-agent-memory
description: "TencentDB Agent Memory gives AI agents layered long-term memory with Mermaid symbolic compression, cutting token usage by 61% and boosting task success by 51%."
url: https://github.com/TencentCloud/TencentDB-Agent-Memory
stars: 5134
forks: 440
language: TypeScript
tags: ["ai-agents", "memory", "llm", "typescript", "local-first"]
featured: false
publishedAt: 2026-06-08
---

## TencentDB Agent Memory

### Overview

TencentDB Agent Memory is a fully local long-term memory system for AI agents. It launched in April 2026 from Tencent Cloud's database team and crossed 5,000 GitHub stars within two months. The project tackles one of the most persistent problems in agentic AI: agents forget everything between sessions, and the naive fix — stuffing more history into the context window — destroys both performance and cost efficiency.

The team behind it is TencentDB, Tencent Cloud's managed database division. These aren't hobbyists building a weekend project. Tencent operates some of the largest database deployments in Asia, and that experience with large-scale data systems shows in the architecture. The project is licensed MIT and ships as an OpenClaw plugin and a Hermes Gateway adapter, making it accessible to developers already using either agent framework.

The core insight is deceptively simple: memory should be hierarchical, not flat. Most agent memory systems dump everything into a vector store and call it a day. TencentDB Agent Memory instead builds a four-layer semantic pyramid — raw conversations at the bottom, atomic facts above that, scenario blocks higher up, and a user persona profile at the top. Each layer compresses the one below it while preserving a deterministic drill-down path back to the original evidence. The benchmark numbers are striking: 61.38% reduction in token usage and 51.52% relative improvement in task pass rate on the WideSearch benchmark, with PersonaMem accuracy jumping from 48% to 76%.

### Why it matters

The AI agent space is moving fast, but memory remains the weakest link. Every coding assistant, customer support bot, and personal AI starts from zero each session. Users repeat themselves constantly — the same preferences, the same project context, the same workflow conventions. This is wasteful for humans and expensive for machines, since re-explaining context burns tokens on every single turn.

The timing is significant. As agents get more capable and handle longer, more complex tasks, the context window pressure becomes a real engineering constraint. SWE-bench runs 50 consecutive tasks per session to test context accumulation, and that's exactly where flat memory systems collapse. TencentDB Agent Memory's layered approach means the agent only keeps the lightweight Mermaid symbol graph in context during normal operation, drilling down to full logs only when it needs to verify a detail. This is a fundamentally different architecture from "embed everything, retrieve top-k."

For fullstack developers building AI-powered features — a chatbot in your Next.js app, an AI assistant in your NestJS backend, an agent that manages your Django admin — this solves a real production problem without requiring a vector database subscription or external API calls.

### Key Features

**Four-Layer Semantic Pyramid.** The long-term memory system organizes information into L0 (raw conversation), L1 (atomic facts), L2 (scenario blocks), and L3 (user persona). Each layer is progressively more compressed and structured. The Persona layer carries day-to-day preferences and communication style, while the system only drills down to Atoms when specific details matter. This is the opposite of flat vector storage — it's structured like how human memory actually works.

**Mermaid Symbolic Memory for Short-Term Context.** Instead of keeping verbose tool outputs in the context window, TencentDB Agent Memory offloads full logs to external files and replaces them with a compact Mermaid symbol graph. The agent reasons over this graph during normal operation, using `node_id` references to retrieve full text only when verification is needed. The result: hundreds of tokens instead of hundreds of thousands for long-running tasks.

**Hybrid Retrieval with BM25 and Vector Search.** The recall system combines keyword search (BM25 via jieba for Chinese, standard tokenization for English) with semantic vector search using Reciprocal Rank Fusion. This hybrid approach catches both exact matches and semantically similar memories that pure vector search might miss. You can also switch to keyword-only or embedding-only modes depending on your workload.

**Zero-Configuration Local Backend.** By default, everything runs on SQLite with sqlite-vec for vector operations. No external database, no API keys, no cloud services required. The system works out of the box after installation. For production deployments, there's an optional Tencent Cloud Vector Database backend, but the local setup is genuinely useful for development and small-scale deployments.

**White-Box Debuggability.** When memory recall goes wrong, you can inspect every layer as readable files. L2 Scenarios are plain Markdown. The user persona lives in `persona.md` and traces back to the Scenarios that produced it. Short-term task canvases are Mermaid diagrams that both humans and agents can read. The debugging workflow is a deterministic walk along the Persona → Scenario → Atom → Conversation chain, not a guess-and-check against opaque vector scores.

**OpenClaw and Hermes Integration.** The project ships as a plugin for OpenClaw and as a Gateway adapter for Hermes Agent. Installation is a single command for OpenClaw (`openclaw plugins install @tencentdb-agent-memory/memory-tencentdb`), and the Hermes Docker setup is a one-liner. The architecture is framework-agnostic at its core — the `TdaiCore + HostAdapter` pattern means porting to other agent frameworks is straightforward.

**Configurable Pipeline Triggers.** Memory extraction runs on a configurable schedule — every N conversations, after idle timeouts, or on-demand. The L1 extraction triggers every 5 turns by default, with warm-up doubling (1→2→4→…) for new sessions. L2 persona generation fires every 50 new memories. These defaults work well for most use cases, but everything is tunable for long-task or long-session scenarios.

### Use Cases

- **AI coding assistants** — Agents that work across multiple sessions on the same codebase remember project conventions, preferred patterns, and past decisions without re-reading the entire repository each time.
- **Customer support bots** — Support agents that recall previous interactions with the same customer, their communication preferences, and unresolved issues across sessions.
- **Personal AI assistants** — Long-running assistants that learn your workflow, preferred tools, output formats, and communication style over weeks of interaction.
- **Multi-agent systems** — Shared memory across agent instances, so a research agent's findings are available to a writing agent without re-processing.
- **Fullstack apps with AI features** — Any React, NestJS, or Django application that embeds AI capabilities and needs the agent to maintain context across user sessions without blowing up API costs.

### Pros and Cons

Pros:
- Benchmark-backed performance claims with real numbers: 61% token reduction on WideSearch, 51% pass rate improvement, and PersonaMem accuracy jumping from 48% to 76%. These aren't marketing numbers — they're measured over continuous long-horizon sessions.
- Truly local-first architecture with SQLite. No external dependencies, no vendor lock-in, no surprise bills. Works offline and in air-gapped environments.
- The Mermaid symbolic memory approach is genuinely novel. Compressing task state into human-readable diagrams that agents can also reason over is clever engineering, not just a gimmick.

Cons:
- The project is two months old (April 2026). While the TencentDB team has production experience, this specific codebase hasn't been battle-tested at scale by the open-source community yet. Expect API changes.
- The default SQLite backend works for development but may hit limits in high-throughput production scenarios. The Tencent Cloud Vector Database backend is the production path, which introduces a cloud dependency.
- Integration is currently limited to OpenClaw and Hermes. If you're using LangChain, CrewAI, or a custom agent framework, you'll need to write your own adapter using the core `TdaiCore` API.

### Getting Started

```bash
# Install the OpenClaw plugin
openclaw plugins install @tencentdb-agent-memory/memory-tencentdb
openclaw gateway restart

# Or install via npm for programmatic use
npm install @tencentdb-agent-memory/memory-tencentdb

# Enable in your OpenClaw config (~/.openclaw/openclaw.json)
# Add: "memory-tencentdb": { "enabled": true }

# For Hermes via Docker:
cd docker/opensource
docker build -f Dockerfile.hermes -t hermes-memory .
docker run -d --name hermes-memory -p 8420:8420 \
  -e MODEL_API_KEY="your-key" \
  -v hermes_data:/opt/data \
  hermes-memory

# Verify the gateway is running
curl http://localhost:8420/health

# Enable short-term compression (optional, requires ≥ 0.3.4)
# In openclaw.json:
# "memory-tencentdb": { "config": { "offload": { "enabled": true } } }
```

### Alternatives

**Mem0** — The most popular open-source memory layer for AI agents, with a hosted cloud option and self-hosted deployment. Mem0 uses a simpler flat memory model with vector embeddings and graph relationships. It has broader framework support (LangChain, CrewAI, AutoGen) and a more mature API, but lacks TencentDB Agent Memory's hierarchical compression and Mermaid symbolic approach. Choose Mem0 if you need wide framework compatibility today and don't need the token savings from layered compression.

**Zep** — A memory server focused on temporal knowledge graphs for conversational AI. Zep excels at extracting structured facts from conversations and building knowledge graphs over time. It's more established in production deployments but requires a separate server process and has a commercial cloud tier. Choose Zep if your primary need is knowledge graph construction from conversations rather than general-purpose agent memory with context compression.

**LangChain Memory Modules** — LangChain's built-in memory abstractions (ConversationBufferMemory, ConversationSummaryMemory, ConversationKGMemory) cover basic use cases without adding another dependency. They're simpler and tightly integrated with the LangChain ecosystem, but they lack the layered architecture, symbolic compression, and cross-session persistence that TencentDB Agent Memory provides. Stick with LangChain's memory if your needs are simple and you're already deep in the LangChain ecosystem.

### Verdict

TencentDB Agent Memory is the most technically interesting agent memory project I've come across in 2026. The four-layer pyramid architecture and Mermaid symbolic compression aren't just incremental improvements over flat vector storage — they represent a different way of thinking about how agents should remember things. The benchmark numbers (61% token reduction, 51% pass rate improvement) are compelling, and the fact that it runs entirely locally on SQLite makes it accessible to individual developers, not just enterprises with infrastructure budgets. The two-month age is a legitimate concern, and the limited framework support means you're somewhat locked into the OpenClaw/Hermes ecosystem for now. But if you're building AI agent features in your fullstack application and you're tired of agents that forget everything between turns, this is worth evaluating today. The TencentDB team clearly understands production database systems, and that expertise translates into an architecture that's designed for real workloads, not just demos.
