---
name: headroom
description: "Headroom is a context compression layer for AI agents that reduces token usage by 60-95% while preserving answer accuracy. Works as a library, proxy, or MCP server."
url: https://github.com/chopratejas/headroom
stars: 8405
forks: 560
language: Python
tags: ["ai-agents", "context-engineering", "token-optimization", "mcp", "llm"]
featured: false
publishedAt: 2026-06-03
---

## Headroom

### Overview

Headroom is a context compression layer that sits between your AI agent and the LLM provider. It compresses tool outputs, logs, RAG chunks, files, and conversation history before they reach the model — delivering 60-95% token savings while preserving answer accuracy. The project launched in January 2026 and has already accumulated over 8,400 GitHub stars, which tracks with how much developers are feeling the pain of context window limits and API costs.

The project is built by chopratejas, and it ships with a custom HuggingFace model called Kompress-base trained specifically on agentic traces. That's a differentiator — most token-reduction tools either truncate blindly or use generic summarization. Headroom detects content type (JSON, code, prose, images) and routes each piece through a specialized compressor. The architecture is opinionated in a good way: SmartCrusher handles structured data, CodeCompressor uses AST-aware parsing for Python, JS, Go, Rust, Java, and C++, and Kompress-base covers natural language.

The core problem is real and growing. Every AI coding agent — Claude Code, Cursor, Codex, Copilot — hits context limits during non-trivial sessions. A codebase exploration that returns 78,000 tokens of search results burns through your context budget before you've started reasoning about the problem. Headroom compresses that same workload to about 41,000 tokens (47% savings) on the low end, and a structured code search from 17,765 tokens down to 1,408 (92% savings) on the high end. The benchmarks on GSM8K, TruthfulQA, SQuAD v2, and BFCL show accuracy is preserved — in some cases slightly improved.

### Why it matters

Context engineering is becoming the defining challenge of AI-native development. The shift from "prompt engineering" to "context engineering" reflects a reality: the quality of what you feed the model matters more than how you phrase the question. But context is expensive. API costs scale linearly with token count, and most agents generate massive amounts of intermediate context (tool outputs, search results, file contents) that the model only needs a fraction of.

Headroom fills a gap that existing solutions handle poorly. OpenAI's built-in compaction only works on conversation history and only within their ecosystem. Hosted compression services like Compresr and Token Co. require sending your data to their API — a non-starter for teams working with proprietary code. Headroom runs entirely locally, works across every major agent framework, and its CCR (Compress-Check-Retrieve) system means compressed data is reversible — the LLM can retrieve originals on demand if it needs the full context.

The cross-agent memory feature is particularly forward-looking. If you use Claude Code for architecture decisions and Codex for implementation, Headroom maintains a shared memory store with agent provenance and auto-deduplication. That's a workflow pattern that's becoming standard among senior developers, and no other compression tool addresses it.

### Key Features

**Content-Aware Compression Pipeline.** Headroom doesn't just truncate or summarize — it detects what kind of content it's dealing with and picks the right compressor. JSON tool outputs go through SmartCrusher (which understands arrays of dicts, nested objects, mixed types). Source code goes through CodeCompressor with AST-aware parsing for six languages. Natural language goes through Kompress-base, a model trained specifically on agentic traces. This routing happens automatically via the ContentRouter component.

**Reversible Compression (CCR).** This is the feature that separates Headroom from every other compression tool. Compressed context isn't lost — the originals are stored locally and the LLM can call `headroom_retrieve` to get them back if it needs the full data. This means you get token savings without the risk of the model losing critical information. It's a safety net that makes aggressive compression viable in production.

**Four Integration Modes.** You can use Headroom as a Python/TypeScript library (`compress(messages)`), as a zero-code-change HTTP proxy (`headroom proxy --port 8787`), as a one-command agent wrapper (`headroom wrap claude`), or as an MCP server with `headroom_compress`, `headroom_retrieve`, and `headroom_stats` tools. The proxy mode is particularly clever — point any OpenAI-compatible client at it and get compression without touching your code.

**CacheAligner for Provider KV Caches.** Anthropic and OpenAI both offer KV cache discounts, but only if your prompt prefixes stay stable across requests. Headroom's CacheAligner stabilizes these prefixes so you actually hit the cache. Most developers don't realize their cache hit rate is abysmal because their tool outputs change slightly between calls. This is free money left on the table.

**Cross-Agent Memory System.** SharedContext lets multiple agents (Claude Code, Codex, Gemini, Cursor) read and write to a common memory store with provenance tracking. Auto-deduplication prevents the same information from being stored twice across agents. For developers who use different agents for different tasks — architecture review in one, implementation in another — this eliminates the context fragmentation problem.

**`headroom learn` for Failure Mining.** The `headroom learn` command analyzes failed agent sessions and writes corrections to `CLAUDE.md`, `AGENTS.md`, or `GEMINI.md`. It's a feedback loop that makes your agents improve over time based on actual failure patterns, not generic best practices. This turns Headroom from a passive compression tool into an active learning system.

**Framework-Native Integrations.** Headroom wraps cleanly into the Anthropic SDK (`withHeadroom(new Anthropic())`), OpenAI SDK, Vercel AI SDK (`wrapLanguageModel` with middleware), LiteLLM (callback), LangChain, Agno, and Strands. It also works as ASGI middleware for Python web apps. The integration surface is impressively broad for a project this young.

### Use Cases

- **AI coding agent sessions** — Developers running Claude Code, Codex, or Cursor on large codebases hit context limits constantly. Headroom compresses tool outputs and search results in real-time, keeping sessions productive without manual context management.

- **RAG pipelines with large retrieval sets** — Applications retrieving 50-100 document chunks for a single query can compress the irrelevant portions while preserving the relevant ones. The benchmarks show 92% savings on search-heavy workloads.

- **Multi-agent workflows** — Teams running multiple AI agents that share context (e.g., one agent for planning, another for coding, another for testing) benefit from the shared memory store and cross-agent deduplication.

- **Cost optimization for high-volume API usage** — Companies spending $5K+/month on LLM APIs can reduce costs by 60-95% on context-heavy operations without changing their prompts or switching providers.

- **SRE and incident debugging** — The benchmarks show 92% compression on SRE incident debugging workloads (65,694 → 5,118 tokens). For teams using AI to analyze logs and traces during incidents, this is a direct cost and latency win.

- **MCP-based tool chains** — Any MCP-compatible client can call `headroom_compress` and `headroom_retrieve` as tools, making compression a first-class part of the tool chain rather than an external wrapper.

### Pros and Cons

Pros:
- 60-95% token savings on real agent workloads with accuracy preserved on standard benchmarks (GSM8K ±0.000, TruthfulQA +0.030, SQuAD v2 97%, BFCL 97%).
- Runs entirely locally — no data leaves your machine, which matters for teams working with proprietary code or regulated environments.
- Four integration modes (library, proxy, agent wrap, MCP) mean you can adopt it incrementally without rewriting anything.
- Reversible compression via CCR eliminates the risk of losing critical context — the LLM can always retrieve originals.

Cons:
- Python 3.10+ required, which excludes teams stuck on older Python versions in legacy environments.
- The ML model (Kompress-base) adds a dependency and download overhead. Teams that only need JSON/code compression can skip it, but the full experience requires it.
- Proxy mode adds a network hop between your agent and the LLM provider, which introduces ~10-50ms latency per request. Usually negligible, but matters for latency-sensitive applications.

### Getting Started

```bash
# Install (Python - everything included)
pip install "headroom-ai[all]"

# Install (Node/TypeScript)
npm install headroom-ai

# Wrap your coding agent in one command
headroom wrap claude              # wraps Claude Code
headroom wrap codex               # wraps Codex
headroom wrap cursor              # prints Cursor config to paste

# Or run as a zero-code-change proxy
headroom proxy --port 8787
# Then point your client at http://localhost:8787

# Or use as a library in your Python app
from headroom import compress
result = compress(messages, model="claude-3-5-sonnet")

# Or install as an MCP server
headroom mcp install

# Check your savings
headroom stats
```

### Alternatives

**RTK** — A CLI tool that rewrites shell command outputs (git show, ls, installers) to be more compact. RTK focuses specifically on CLI output rewriting and does that job well. Headroom actually ships with RTK included for shell-output compression, but adds compression for JSON, code, prose, images, and conversation history on top. Choose RTK alone if you only need CLI output compaction and want a smaller footprint.

**OpenAI Compaction** — Built into the OpenAI API, this compresses conversation history when you hit context limits. It's zero-setup if you're already in the OpenAI ecosystem, but it only works on conversation history (not tool outputs, RAG chunks, or files), only works with OpenAI, and isn't reversible. Headroom covers everything, works cross-provider, and lets you retrieve originals.

**Lean-ctx** — A CLI context tool that handles CLI commands, MCP tools, and editor rules. Lean-ctx is narrower in scope but simpler to set up. Headroom can actually use lean-ctx as its CLI context tool (`HEADROOM_CONTEXT_TOOL=lean-ctx`), so they're more complementary than competing. Choose lean-ctx if you want a focused CLI context tool without the compression pipeline.

### Verdict

Headroom is the most practical answer I've seen to the "context is too expensive" problem that every AI agent developer faces. The numbers are real — 92% compression on code search, 73% on issue triage, with benchmark accuracy preserved or improved. What makes it worth adopting now rather than waiting is the integration story: you can start with `headroom wrap claude` today and get savings without changing a single line of your existing workflow. The reversible compression via CCR removes the main objection to aggressive compression ("what if the model needs the original?"), and the cross-agent memory system addresses a workflow pattern that's only going to become more common. If you're spending more than $100/month on LLM APIs or regularly hitting context limits in your coding sessions, this should be on your shortlist.
