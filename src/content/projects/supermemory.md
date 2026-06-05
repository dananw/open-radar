---
name: supermemory
description: "Supermemory is the open-source memory and context engine for AI — #1 on all major benchmarks, giving your AI persistent memory across conversations."
url: https://github.com/supermemoryai/supermemory
stars: 25558
forks: 2238
language: TypeScript
tags: ["ai-memory", "context-engine", "rag", "developer-tools", "ai-agents"]
featured: false
publishedAt: 2026-06-05
---

## Supermemory

### Overview

Supermemory is an open-source memory and context engine for AI applications. It ranks #1 on all three major AI memory benchmarks — LongMemEval (81.6%), LoCoMo, and ConvoMem — and has accumulated over 25,000 GitHub stars since its launch. The project provides a single API that handles memory extraction, user profiles, hybrid search (RAG + memory), file processing, and external data connectors.

The project is built by Dhravya Shah, a 20-year-old San Francisco-based developer and 2x acquired founder who leads a small research lab focused on AI memory infrastructure. The core team has pushed over 800 commits from the lead contributor alone, with the repository showing consistent daily activity through June 2026. That level of shipping velocity matters for infrastructure software — you want to bet on a project that moves fast and stays maintained.

The core problem Supermemory solves is deceptively simple: AI tools forget everything between conversations. Every chat starts from zero. Your preferences, your project context, your past decisions — gone. Existing approaches (RAG, vector databases, embedding pipelines) retrieve document chunks but don't track facts about users over time. Supermemory distinguishes between the two: RAG retrieves what's in your documents, while memory extracts and tracks what it learns about you. It understands that "I just moved to San Francisco" supersedes "I live in NYC." It knows that "I have an exam tomorrow" should expire after the date passes. That temporal reasoning and contradiction handling is what makes it more than a fancy vector store.

### Why it matters

The AI agent space is exploding, but most agents are essentially goldfish — brilliant for one conversation, clueless in the next. Every major AI product team is hitting the same wall: how do you give your AI persistent, evolving context without building a custom memory pipeline from scratch? Supermemory positions itself as the answer — a drop-in memory layer that works across Claude, Cursor, Windsurf, VS Code, and any MCP-compatible tool.

This connects to a broader shift in how developers build AI applications. The first wave was about model quality. The second wave was about tool use and function calling. The third wave — the one we're entering now — is about memory and personalization. Gartner's 2026 AI development report identifies persistent context as the top differentiator for AI products this year. Supermemory is one of the few open-source projects that's actually production-ready in this space, and its benchmark dominance gives it credibility that most alternatives lack.

For fullstack developers building AI-powered features into web applications, Supermemory eliminates the most painful part of the stack. You don't need to set up Pinecone or Weaviate, design chunking strategies, build embedding pipelines, or figure out how to maintain user profiles across sessions. One API call stores context, one call retrieves it with the user's profile attached. The framework integrations (Vercel AI SDK, LangChain, Mastra, OpenAI Agents SDK) mean it slots into existing codebases without architectural changes.

### Key Features

**Memory Engine with Temporal Reasoning.** Supermemory doesn't just store and retrieve — it understands time. When a user says "I prefer dark mode," that becomes a persistent fact. When they later say "actually, light mode for this project," the engine handles the contradiction. Temporary facts auto-expire. Outdated information gets replaced. This temporal awareness is what separates real memory from glorified caching.

**Automatic User Profiles.** Every container (user, session, project) gets an auto-maintained profile with static facts (preferences, role, tech stack) and dynamic context (current project, recent activity). One API call at ~50ms latency returns the full profile plus relevant search results. Inject this into your system prompt and your agent instantly knows who it's talking to. No manual profile management needed.

**Hybrid Search (RAG + Memory).** A single query searches both your knowledge base documents and user memories simultaneously. Search for "how do I deploy?" and you get deployment docs from your RAG pipeline plus the user's personal deployment preferences from memory. The search modes let you control this — hybrid (default), memories-only, or documents-only — depending on your use case.

**Framework Integrations.** Drop-in wrappers for Vercel AI SDK, LangChain, LangGraph, OpenAI Agents SDK, Mastra, Agno, and n8n. The `withSupermemory()` wrapper adds memory to any existing AI model or agent configuration. MCP server support means it works with Claude Desktop, Cursor, Windsurf, VS Code, and Claude Code out of the box. This integration breadth is unusual for a project this young.

**Connectors with Real-Time Sync.** Auto-sync data from Google Drive, Gmail, Notion, OneDrive, GitHub, and web crawlers into your knowledge base. Documents are automatically processed, chunked, and made searchable. Real-time webhooks keep everything current without manual re-indexing. For teams drowning in scattered documentation, this is the feature that sells the product.

**Multi-Modal File Processing.** Upload PDFs, images (with OCR), videos (with transcription), and code (with AST-aware chunking) and they become searchable context. The code chunking is particularly smart — it understands function boundaries and imports rather than splitting on arbitrary character counts. For developer tools, this makes the difference between useful and useless retrieval.

**Open-Source MemoryBench.** Supermemory ships its own benchmarking framework for standardized, reproducible comparisons of memory providers. You can run head-to-head benchmarks of Supermemory against Mem0, Zep, and other providers on your own data. This transparency is rare — most AI infrastructure projects hide behind marketing claims instead of letting you verify performance yourself.

### Use Cases

- **AI-powered SaaS products** — Add persistent user memory to any AI feature. Your chatbot remembers customer preferences, past issues, and account context across sessions without building custom infrastructure.
- **Developer tools and IDE extensions** — Give coding assistants project-specific context that persists across sessions. The MCP integration means this works in Cursor, VS Code, and Claude Code today.
- **Customer support automation** — Support agents that remember previous interactions, customer preferences, and resolved issues. No more "can you describe your setup again?" every conversation.
- **Personal AI assistants** — Build personal productivity tools that learn your habits, preferences, and workflows over time. The browser extension and consumer app demonstrate this use case out of the box.
- **Multi-tenant knowledge management** — Teams and organizations that need shared context across AI tools. Container tags separate contexts by user, project, or organization.

### Pros and Cons

Pros:

- #1 on all three major AI memory benchmarks (LongMemEval, LoCoMo, ConvoMem) with published, reproducible results. This isn't marketing — you can verify it yourself with MemoryBench.
- Extremely fast integration path. The framework wrappers and MCP support mean you can add memory to an existing AI application in under 10 minutes, not days.
- Active development with 800+ commits from the lead contributor, daily updates, and a growing Discord community. The project is shipping faster than most competitors.
- MIT licensed with full source code available. The memory engine, connectors, and benchmarking tools are all open source, not gated behind enterprise tiers.

Cons:

- The hosted API has usage limits on the free tier. Heavy usage requires paid plans, and self-hosting the full stack (including connectors and file processing) is non-trivial.
- The memory extraction relies on LLM calls under the hood, which adds latency and cost beyond the raw API pricing. For high-volume applications, this compounds.
- Relatively young project (launched 2024, hit stride in 2025-2026). The API surface is still evolving — expect breaking changes as the memory ontology and search modes mature.
- Connector coverage is good but not exhaustive. If your data lives in Slack, Jira, or Confluence, you'll need to build custom connectors or wait for support.

### Getting Started

```bash
# Install the SDK
npm install supermemory
# or
pip install supermemory

# MCP quick install for Claude Desktop, Cursor, VS Code, etc.
npx -y install-mcp@latest https://mcp.supermemory.ai/mcp --client claude --oauth=yes

# Basic usage in TypeScript
import Supermemory from "supermemory";

const client = new Supermemory();

// Store a memory
await client.add({
  content: "User prefers TypeScript, uses NestJS for backends, deploys on Cloudflare Workers",
  containerTag: "user_123",
});

// Retrieve profile + relevant memories
const { profile, searchResults } = await client.profile({
  containerTag: "user_123",
  q: "What's the user's tech stack?",
});

// profile.static  → ["Prefers TypeScript", "Uses NestJS for backends"]
// profile.dynamic → ["Currently working on auth migration"]
// searchResults   → Relevant memories ranked by similarity

// Hybrid search (RAG + Memory)
const results = await client.search.memories({
  q: "deployment preferences",
  containerTag: "user_123",
  searchMode: "hybrid",
});
```

For Vercel AI SDK integration:

```typescript
import { withSupermemory } from "@supermemory/tools/ai-sdk";
import { openai } from "@ai-sdk/openai";

const model = withSupermemory(openai("gpt-4o"), {
  containerTag: "user_123",
  customId: "conversation_1",
});
```

### Alternatives

**Mem0** — Another popular open-source memory layer with a similar pitch. Mem0 has a larger community (30K+ stars) and supports more database backends, but consistently ranks below Supermemory on LongMemEval and LoCoMo benchmarks. Choose Mem0 if you need self-hosted memory with Postgres or Redis backends and don't mind lower recall accuracy.

**Zep** — A memory and RAG platform focused on enterprise use cases. Zep offers more granular control over extraction rules and knowledge graph construction, which matters for complex multi-entity applications. It's a better fit if you need fine-tuned memory extraction logic and are willing to invest in configuration. Supermemory wins on out-of-the-box performance and integration speed.

**LangChain Memory Modules** — If you're already deep in the LangChain ecosystem, its built-in memory modules (ConversationBufferMemory, ConversationSummaryMemory) handle basic persistence. But they're simple — no user profiles, no temporal reasoning, no contradiction handling. They work for prototypes. For production applications with real users, you'll outgrow them fast and end up building what Supermemory already provides.

### Verdict

Supermemory is the most compelling open-source memory infrastructure I've seen for AI applications. The benchmark results are real and reproducible, the API design is clean, and the integration story is genuinely fast — not "fast for an infrastructure project" but actually fast. If you're building any AI-powered feature that needs to remember users across sessions, this should be your first stop. The 25K stars and daily commit activity suggest the developer community agrees. The main risk is that the project is young and the API will evolve, but the MIT license and active maintenance make that an acceptable tradeoff. For fullstack developers working with React frontends and NestJS or Go backends, the TypeScript SDK and Vercel AI SDK wrapper mean you can add persistent memory to your stack in an afternoon, not a sprint.
