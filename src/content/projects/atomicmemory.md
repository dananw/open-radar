---
name: atomicmemory
description: "AtomicMemory is a portable, inspectable semantic memory layer for AI agents with TypeScript SDK, MCP server, and Postgres/pgvector backend."
url: https://github.com/atomicstrata/atomicmemory
stars: 160
forks: 23
language: TypeScript
tags: ["ai-agents", "memory", "typescript", "mcp", "semantic-search"]
featured: false
publishedAt: 2026-06-16
---

## AtomicMemory

### Overview

AtomicMemory is an open-source semantic memory layer designed for AI agents and applications that need to remember, retrieve, and revise context across sessions. It hit 160 stars within its first month on GitHub, which is modest compared to viral repos, but the project's real traction shows up in its benchmark results — leading performance/cost on BEAM-100K, BEAM-1M, and LoCoMo10 against published competitors like Mem0 and Hindsight.

The project is built by Atomicstrata, a team focused on agent infrastructure. What sets their approach apart is the philosophical stance: most memory products ask you to trust a hosted black box with the layer that decides what an AI believes about your users. AtomicMemory takes the opposite position — the interface should be portable, the engine should be inspectable, and the memory system should be able to revise itself when facts change. That's a big deal when you're building production agent systems where hallucinated or stale context has real consequences.

The core problem AtomicMemory solves is deceptively simple: how do you give an AI agent persistent, searchable memory that works across different frameworks, hosting environments, and model providers — without locking yourself into a single vendor's hosted service? The answer is a layered architecture with a core engine (Docker-deployable, backed by Postgres/pgvector), a TypeScript SDK that acts as the portability contract, and adapters for every major framework you're probably already using.

### Why it matters

The AI agent ecosystem in mid-2026 is exploding, but the memory layer is still the weakest link. Every framework — LangChain, Vercel AI SDK, OpenAI Agents, Mastra — rolls its own context management. Most developers end up with ad-hoc solutions: stuffing conversation history into prompts, using simple vector stores with no mutation semantics, or paying for hosted memory services they can't inspect or migrate away from.

AtomicMemory addresses this fragmentation directly. It's the first memory layer I've seen that genuinely works across framework boundaries without requiring you to rewrite your capture and retrieval logic. The MCP server integration means any tool that speaks MCP (Claude Code, Cursor, Codex, Hermes) can share the same memory store. That's not theoretical — it's a practical architectural decision that saves teams from maintaining separate memory silos for each agent host.

The benchmark numbers matter here too. On LoCoMo10, AtomicMemory scores 0.8396 with GPT-4o-mini, which is +0.171 over the Mem0 paper's published result — at $0.066 per query. For teams running agents at scale, that cost difference compounds fast. And unlike hosted alternatives, you can run the whole thing locally on your own Postgres instance.

### Key Features

**Portable SDK Architecture.** The TypeScript SDK is the portability contract. Every adapter — Vercel AI SDK, OpenAI Agents, LangChain, LangGraph, Mastra — is built on the same SDK surface. You can drop down to direct SDK calls at any time and keep the same data, indexes, and retrieval behavior. This means switching frameworks doesn't mean rebuilding your memory layer from scratch.

**Correction-Aware Memory.** Memory isn't just append and recall. Real products need supersession, clarification, deletion, and trust-sensitive revision when users change their minds. AtomicMemory handles mutation decisions explicitly — when a user says "actually, I prefer morning meetings now," the system doesn't just add a new fact alongside the old one. It understands revision semantics.

**MCP Server Integration.** The built-in MCP server lets any MCP-speaking tool — Claude Code, Cursor, Codex, Hermes — read and write to the same memory store. This is the interoperability story that most memory products miss. Your coding agent's context doesn't live in a silo separate from your customer-facing agent's memory.

**Self-Hosted Core with Postgres/pgvector.** The core engine runs as a Docker container backed by Postgres and pgvector. No external dependencies beyond your own infrastructure. For teams with data residency requirements or privacy-sensitive workloads, this is non-negotiable. The hosted option exists for convenience, but there's no capability cliff between self-hosted and hosted modes.

**Framework Adapters.** Integration packages for Vercel AI SDK, OpenAI Agents SDK, LangChain, LangGraph, and Mastra. Each adapter wraps the same SDK, so the memory behavior is consistent regardless of which agent framework you're using. Install the adapter, configure the connection, and you get semantic search and context injection without writing custom retrieval logic.

**CLI and Diagnostics.** The CLI surface handles setup, diagnostics, capture, retrieval, and context packaging. Useful for debugging memory behavior during development — you can inspect what the engine stored, how it ranked results, and what mutation decisions it made. This inspectability is a first-class concern, not an afterthought.

**Model-Surface Portability.** The SDK lets applications swap memory backends, and the core engine separates embeddings, extraction, mutation, reranking, retrieval packaging, and evaluation. Your memory system isn't frozen to one model vintage or embedding provider. When better embedding models ship, you can swap without rewriting your application.

### Use Cases

- **Multi-agent systems** — When you have multiple AI agents (coding, customer support, research) that need to share context without maintaining separate memory silos per agent host. The MCP server makes this straightforward.

- **Customer-facing AI products** — Chatbots and assistants that need to remember user preferences, past interactions, and corrected information across sessions. The correction-aware semantics handle the "actually, I changed my mind" scenario that breaks naive vector-store approaches.

- **Developer tooling** — Coding agents that need persistent project context, architecture decisions, and past debugging sessions. The Claude Code and Cursor plugins make this a drop-in integration.

- **Research and knowledge management** — Applications that ingest documents, conversations, and structured data, then need to retrieve relevant context grounded in prior interactions. The semantic search with scoped retrieval keeps results relevant.

- **Privacy-sensitive deployments** — Healthcare, finance, or legal AI applications where memory data cannot leave your infrastructure. Self-hosted Core with local embeddings keeps everything on your own Postgres instance.

### Pros and Cons

Pros:
- Genuine portability across frameworks and hosting environments — not just a marketing claim, but an architectural reality backed by the SDK-as-contract design.
- Correction-aware memory semantics handle real-world mutation scenarios that naive vector stores ignore entirely.
- Leading performance/cost ratio on established benchmarks (BEAM, LoCoMo10), which matters when you're running agents at scale and costs compound.
- Self-hosted option with no capability cliff — you get the full feature set without depending on a hosted service.

Cons:
- 160 stars and early-stage community means less ecosystem support, fewer tutorials, and more reliance on the core team for bug fixes and feature requests.
- Postgres/pgvector dependency adds infrastructure overhead compared to simple in-memory or file-based memory solutions. Overkill for prototyping or hobby projects.
- Framework adapter coverage is solid but not exhaustive — if you're using a niche agent framework, you may need to build your own adapter on top of the SDK.

### Getting Started

```bash
# Install the SDK directly
npm install @atomicmemory/sdk

# Or install the CLI for diagnostics and setup
npm install -g @atomicmemory/cli

# Framework adapter example (Vercel AI SDK)
npm install @atomicmemory/vercel-ai @atomicmemory/sdk
```

Minimal SDK usage:

```typescript
import { MemoryClient } from '@atomicmemory/sdk';

const memory = new MemoryClient({
  providers: {
    atomicmemory: { apiUrl: 'http://localhost:17350' },
  },
});

await memory.initialize();

// Ingest context
await memory.ingest({
  mode: 'messages',
  messages: [{ role: 'user', content: 'I prefer aisle seats on flights.' }],
  scope: { user: 'demo-user' },
});

// Retrieve relevant memory
const results = await memory.search({
  query: 'seat preference',
  scope: { user: 'demo-user' },
});
```

For the self-hosted core engine, deploy via Docker with Postgres/pgvector and point the SDK at your local instance. Full quickstart documentation is available at docs.atomicstrata.ai.

### Alternatives

**Mem0** — The most well-known AI memory layer with hosted and open-source options. Mem0 has a larger community and more mature documentation, but its open-source version lacks the correction-aware semantics and framework portability that AtomicMemory provides. Choose Mem0 if you want a hosted service with less infrastructure overhead and don't need mutation semantics.

**LangChain Memory Modules** — If you're already deep in the LangChain ecosystem, its built-in memory classes (ConversationBufferMemory, ConversationSummaryMemory) handle basic persistence. But these are tightly coupled to LangChain, lack semantic search across sessions, and have no concept of memory revision. Choose LangChain's memory if your needs are simple and you're not crossing framework boundaries.

**Zep** — Another open-source memory layer focused on chat applications. Zep offers fact extraction and vector search but is more narrowly scoped to conversational context. Choose Zep if your primary use case is chat-based and you don't need the cross-framework portability or MCP integration that AtomicMemory provides.

### Verdict

AtomicMemory is the memory layer the AI agent ecosystem has been missing. The correction-aware semantics alone set it apart from every alternative I've evaluated — in production agent systems, the ability to revise and supersede stored facts is not a nice-to-have, it's a requirement. The portability story is real, not aspirational: you can start with the Vercel AI SDK adapter today, move to LangGraph next quarter, and your memory store follows you without migration pain. The benchmark results are strong, and the self-hosted option means you're not adding another SaaS dependency to your stack. At 160 stars it's still early, and the community is small, but the architecture is right. If you're building AI agents in TypeScript and you've been cobbling together vector stores with no mutation semantics, AtomicMemory is worth evaluating seriously. Start with the SDK, run the core engine locally, and see if the retrieval quality and correction behavior match your use case.
