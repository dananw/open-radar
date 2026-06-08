---
name: headroom
description: "Headroom is a context compression layer for AI agents that reduces token usage by 60-95% while preserving answer quality. Library, proxy, MCP server."
url: https://github.com/chopratejas/headroom
stars: 18395
forks: 1170
language: Python
tags: ["ai", "token-optimization", "context-engineering", "mcp", "llm", "agent-infrastructure"]
featured: false
publishedAt: 2026-06-09
---

## Headroom

### Overview

Headroom is a context compression layer for AI agents. It sits between your application and the LLM, compressing everything the model reads — tool outputs, logs, RAG chunks, files, and conversation history — before it hits the context window. The result: 60-95% fewer tokens with the same answers. The project hit 18,000 GitHub stars in under three months, which tells you how badly developers need this.

The project is built by Chopra Tejas, a developer who's been working at the intersection of LLM tooling and developer productivity. Headroom isn't a research paper — it's a production-ready tool that ships as a Python library, a TypeScript library, a drop-in HTTP proxy, and an MCP server. You can integrate it in 60 seconds or wrap your existing coding agent with a single command.

The core problem is brutal and simple: LLM context windows are expensive and finite. A typical coding agent session burns through hundreds of thousands of tokens reading tool outputs, search results, and file contents. Most of that content is redundant, verbose, or structurally bloated. Headroom detects the content type, routes it to the right compressor, and delivers a compressed version that preserves the information the LLM actually needs. It's not lossy truncation — it's intelligent compression with a retrieval fallback called CCR (Compressed Content Retrieval) that lets the LLM request the original if it needs more detail.

### Why it matters

The AI agent ecosystem is exploding, but the economics are brutal. Running Claude, GPT-4, or Gemini on real-world agent workloads costs real money, and most of that spend is wasted on bloated context. A code search returning 100 results might dump 17,000 tokens into the context window when 1,400 would do. SRE debugging sessions routinely push 65,000+ tokens of logs and metrics that could compress to 5,000.

This is a context engineering problem, not a model problem. The models are good enough — the bottleneck is what we feed them. Headroom addresses this at the infrastructure layer, which is where it belongs. You shouldn't have to rewrite your prompts or redesign your agent architecture to save on tokens. You should be able to drop in a compression layer and get immediate savings.

The broader trend is clear: as AI agents handle more complex, multi-step tasks, context management becomes the critical bottleneck. Tools like Cursor, Claude Code, and Codex are pushing agents into production workflows, and the token costs compound fast. Headroom's approach — compress locally, retrieve on demand — is the kind of pragmatic infrastructure that makes agentic AI economically viable for teams that aren't operating at OpenAI's budget.

### Key Features

**ContentRouter with Automatic Type Detection.** Headroom inspects incoming content and routes it to the right compressor. JSON tool outputs go to SmartCrusher, which strips redundant keys and collapses nested structures. Code files go to CodeCompressor, which uses AST parsing to remove comments, docstrings, and boilerplate while preserving semantic meaning. General text goes to Kompress-base, a fine-tuned model hosted on Hugging Face. You don't configure any of this — it's automatic.

**Six Compression Algorithms.** The toolkit includes SmartCrusher for JSON, CodeCompressor for source code (Python, TypeScript, Go, Java, and more), Kompress-base for natural language, plus specialized compressors for logs, RAG chunks, and conversation history. Each algorithm is tuned for its content type. A generic text compressor would mangle JSON; a JSON compressor would destroy prose. Headroom gets this right.

**Drop-in Proxy Mode.** Run `headroom proxy --port 8787` and point your LLM client at localhost:8787. Zero code changes. Works with any language, any framework, any LLM provider. The proxy intercepts requests, compresses the context, forwards to the real API, and returns the response. This is the fastest way to get savings without touching your codebase.

**Agent Wrapping in One Command.** `headroom wrap claude` or `headroom wrap codex` or `headroom wrap cursor` — one command to wrap your existing coding agent with compression. The wrapper intercepts the agent's tool calls, compresses outputs before they hit the context, and handles retrieval requests transparently. You keep using your agent exactly as before, but with 60-90% fewer tokens.

**MCP Server for Any Client.** Headroom ships as an MCP (Model Context Protocol) server with three tools: `headroom_compress`, `headroom_retrieve`, and `headroom_stats`. Any MCP-compatible client — Claude Desktop, Cursor, custom agents — can use it. The compress tool takes content and returns a compressed version. The retrieve tool lets the LLM request the original if the compressed version isn't sufficient. Stats gives you visibility into savings.

**CCR (Compressed Content Retrieval).** This is what separates Headroom from naive compression. Compressed content is stored locally with a reference to the original. The LLM gets a `headroom_retrieve` tool it can call when the compressed version lacks detail. The originals are never deleted. This makes compression safe — you're not throwing away information, you're making it lazy-loaded.

**Cross-Agent Memory.** Headroom maintains a shared memory store across different agents. If Claude Code compresses a file and Codex later needs the same file, Headroom serves the cached compression. It auto-deduplicates across sessions and agents. For teams running multiple coding agents, this eliminates redundant processing and keeps costs down.

### Use Cases

- **Coding agents in production** — Teams running Claude Code, Cursor, or Codex on real codebases see immediate token savings. A 100-result code search that normally costs 17,765 tokens compresses to 1,408 — a 92% reduction. Multiply that across hundreds of agent sessions per day and the cost savings are substantial.

- **SRE and incident debugging** — Production debugging sessions generate massive log output. Headroom compresses 65,000+ tokens of logs and metrics to around 5,000 while preserving the errors, anomalies, and patterns the LLM needs to diagnose the issue.

- **RAG pipelines** — Retrieval-augmented generation systems pull large document chunks that often contain redundant information. Headroom compresses RAG results before they hit the LLM, reducing costs without sacrificing answer quality. Benchmarks show 73% savings on GitHub issue triage tasks.

- **Multi-agent workflows** — Teams running multiple AI agents (coding, testing, documentation) benefit from cross-agent memory and shared compression caches. One agent's compression work benefits all others.

- **Cost-sensitive startups** — Smaller teams that can't afford to burn through API credits on verbose tool outputs get immediate, measurable savings with a one-line integration.

### Pros and Cons

Pros:
- Measurable, proven savings: benchmarks show 60-95% token reduction across real workloads (code search, SRE debugging, issue triage, codebase exploration) with answer quality preserved.
- Multiple integration modes (library, proxy, agent wrap, MCP) mean you can adopt it incrementally without rewriting anything. The proxy mode is particularly clever — zero code changes.
- CCR reversible compression is a genuinely smart design. You're not losing information, you're making it lazy-loaded. The LLM can always retrieve the original if needed.
- Apache 2.0 license, active development, strong community growth (18k+ stars in months), and support for both Python and TypeScript ecosystems.

Cons:
- The ML-based Kompress-base compressor requires downloading a model from Hugging Face, which adds setup complexity and disk space. The non-ML compressors (SmartCrusher, CodeCompressor) work without it.
- Proxy mode introduces a network hop between your app and the LLM provider. For latency-sensitive applications, the inline library mode is better but requires code changes.
- Accuracy benchmarks are self-reported. While the numbers look solid, independent third-party benchmarks on diverse workloads would strengthen confidence. The project is still young enough that edge cases in compression quality may surface.

### Getting Started

```bash
# Install (Python)
pip install "headroom-ai[all]"

# Or install (Node/TypeScript)
npm install headroom-ai

# Quick start — proxy mode (zero code changes)
headroom proxy --port 8787
# Point your LLM client at http://localhost:8787

# Or wrap a coding agent
headroom wrap claude

# Or use inline in Python
python3 -c "
from headroom import compress
result = compress([{'role': 'user', 'content': 'your long content here'}])
print(result)
"

# Check savings
headroom perf
```

### Alternatives

**LLMLingua / LLMLingua-2** — Microsoft's prompt compression library that uses a small model to select important tokens. It's research-backed and well-cited, but it focuses on prompt compression only, not tool outputs or agent workflows. LLMLingua doesn't have proxy mode, MCP integration, or cross-agent memory. Choose LLMLingua if you need academic rigor and only care about prompt-level compression.

**Not Diamond** — A routing layer that sends queries to the cheapest model that can handle them. It reduces costs by choosing cheaper models for simpler tasks rather than compressing context. Different philosophy: Not Diamond optimizes which model you use, Headroom optimizes what you feed the model. They're complementary — you could use both.

**Manual context windowing** — Many teams just truncate or summarize context manually in their agent code. This works for simple cases but breaks down as complexity grows. You end up maintaining brittle prompt engineering that's specific to each use case. Headroom generalizes the problem and handles it at the infrastructure layer.

### Verdict

Headroom is the most practical token optimization tool I've seen for the agentic AI era. The 60-95% savings claims are backed by concrete benchmarks on realistic workloads, and the multiple integration modes (library, proxy, agent wrap, MCP) mean you can adopt it without restructuring your stack. The CCR reversible compression design is the key insight — you're not throwing away context, you're making it lazy-loaded, which makes compression safe for production use. If you're building with AI agents and watching your API bills climb, this should be your first stop. The 18,000-star growth in months reflects genuine developer demand, not hype. The Apache 2.0 license and active maintainer engagement make it a solid bet for teams of any size.
