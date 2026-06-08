---
name: agentmemory
description: "AgentMemory is a persistent memory engine for AI coding agents with 53 MCP tools, hybrid search, and zero-config auto-capture. Works with Claude Code, Cursor, Codex, Copilot, and 15+ agents."
url: https://github.com/rohitg00/agentmemory
stars: 21769
forks: 1791
language: TypeScript
tags: ["ai-agents", "memory", "mcp", "typescript", "developer-tools"]
featured: false
publishedAt: 2026-06-08
---

## AgentMemory

### Overview

AgentMemory is a persistent memory engine for AI coding agents. It hit 21,000 GitHub stars in just over three months since its February 2026 launch, which tells you how badly developers wanted this problem solved. The project sits at the intersection of two trends that are reshaping how we write software: AI coding agents that actually work, and the desperate need for those agents to remember what they did last session.

The project is created by Rohit Ghosh, who published a design doc as a GitHub Gist that went viral (1,3K stars, 182 forks) before any code shipped. That gist extended Karpathy's LLM Wiki pattern with confidence scoring, lifecycle management, knowledge graphs, and hybrid search. AgentMemory is the production implementation of that design. It's built on the iii engine, a Rust-based runtime that handles the heavy lifting of indexing, embedding, and retrieval.

The core problem is simple but painful: every coding agent forgets everything when the session ends. You waste the first five minutes of every session re-explaining your stack, your conventions, your architecture decisions. Claude Code has MEMORY.md, Cursor has notepads, Cline has memory bank — these work like sticky notes. AgentMemory is the searchable database behind the sticky notes. It silently captures every tool use via hooks, compresses observations into structured memory, and injects the right context when the next session starts. The benchmarks show 95.2% retrieval recall at R@5 on the LongMemEval-S dataset (ICLR 2025, 500 questions), and it uses 92% fewer tokens than loading everything into context.

### Why it matters

The AI coding agent space has matured fast. Claude Code, Cursor, Codex CLI, Copilot CLI, Gemini CLI — there are now a dozen serious tools developers use daily. But they all share the same fundamental flaw: statelessness. Every session starts from scratch. Built-in memory systems like CLAUDE.md cap out at around 200 lines and go stale quickly. At 240 observations, you're burning 22K+ tokens just loading context, which eats into your budget and slows down responses.

AgentMemory solves this with a proper memory layer that works across all agents simultaneously. One server, shared memories. Your Claude Code session captures auth middleware decisions. Your Cursor session the next day already knows about them. The MCP protocol makes this agent-agnostic — it works with anything that speaks MCP or HTTP. That's 15+ agents supported out of the box, with native plugins for the big five (Claude Code, Codex, Copilot, Cursor, Gemini CLI).

The timing matters too. We're moving from "AI helps me write code" to "AI writes code for me." That shift requires memory. An agent that can execute complex multi-session workflows — set up auth in session one, add rate limiting in session two, deploy in session three — needs to remember the decisions made along the way. AgentMemory is the infrastructure piece that makes that possible.

### Key Features

**Automatic Capture via Hooks.** AgentMemory registers 12 lifecycle hooks with your coding agent — SessionStart, UserPromptSubmit, PreToolUse, PostToolUse, PostToolUseFailure, PreCompact, SubagentStart, SubagentStop, Stop, SessionEnd, Notification, and TaskCompleted. Every tool use is recorded automatically. No manual `add()` calls, no saving notes. The agent works, and AgentMemory silently captures what happened. A SHA-256 dedup with a 5-minute window prevents duplicate observations from cluttering the store.

**Triple-Stream Hybrid Search.** The retrieval system combines BM25 keyword matching, dense vector embeddings, and knowledge graph traversal, fused with Reciprocal Rank Fusion (k=60). BM25 handles exact term matches and supports Greek, Cyrillic, Hebrew, Arabic, and accented Latin out of the box. Vector search uses cosine similarity over dense embeddings (local all-MiniLM-L6-v2 by default, or OpenAI/Gemini/Voyage/Cohere). Graph search does BFS traversal over extracted entities. The RRF fusion produces results that none of the individual streams could match alone — 95.2% R@5 on LongMemEval-S versus 86.2% for BM25-only.

**4-Tier Memory Consolidation.** Inspired by how human brains process memory, AgentMemory organizes information into Working (raw observations from tool use), Episodic (compressed session summaries), Semantic (extracted facts and patterns), and Procedural (workflows and decision patterns). Memories decay over time following the Ebbinghaus curve — frequently accessed memories strengthen while stale ones auto-evict. Contradictions are detected and resolved automatically.

**53 MCP Tools.** The most comprehensive MCP memory toolkit available. Core tools cover recall, smart search, session history, timeline, project profiling, and memory export. Extended tools add knowledge graph queries, 4-tier consolidation, team sharing with namespacing, audit trails with governance deletion, git-versioned snapshots, action management with dependencies and leases, inter-agent messaging via signals, event-driven sentinels, ephemeral action graphs, and health diagnostics. Six MCP resources and three prompts round out the server.

**Cross-Agent Memory Sharing.** One AgentMemory server instance serves all your coding agents simultaneously. Claude Code, Cursor, Codex CLI, Copilot CLI, Gemini CLI, Cline, Roo Code, Windsurf, OpenCode, Goose, Aider, and more — they all share the same memory store. The MCP protocol handles coordination, with lease-based exclusivity for multi-agent workflows and signal-based messaging between agents. Your team can have namespaced shared and private memories.

**Privacy-First Design.** Before any observation is stored, it passes through a privacy filter that strips API keys, secrets, and content tagged with `<private>`. The system uses circuit breakers and provider fallback chains for self-healing. All data lives locally in SQLite by default — no external databases required. The real-time viewer on port 3113 lets you inspect exactly what's being captured and stored.

**Session Replay and Import.** Every session AgentMemory records is replayable through the viewer. Open the Replay tab, pick a session, and scrub through the timeline — prompts, tool calls, tool results, and responses render as discrete events with play/pause and speed control. You can also import existing Claude Code JSONL transcripts with `agentmemory import-jsonl`, bringing historical sessions into the searchable memory store.

### Use Cases

- **Multi-session development workflows** — Set up JWT auth in session one, add rate limiting in session two, and the agent already knows your middleware stack, test coverage, and library choices. No re-explaining between sessions.
- **Team knowledge sharing** — Multiple developers working on the same codebase share a memory server. One developer's architectural decisions become searchable context for the whole team.
- **Complex debugging across sessions** — Track down a bug that spans multiple sessions. AgentMemory preserves the investigation trail — what was tried, what was ruled out, what the root cause turned out to be.
- **AI agent orchestration** — Build multi-agent workflows where specialized agents (frontend, backend, testing) coordinate through shared memory with lease-based exclusivity and signal messaging.
- **Onboarding new team members** — New developers get instant access to the project's decision history. Search for "why did we choose jose over jsonwebtoken" and get the answer from the actual session where that decision was made.
- **Token budget optimization** — Teams running expensive models (Claude Opus, GPT-4) save significantly on token costs. AgentMemory uses ~1,900 tokens per session versus 22K+ for loading everything into context.

### Pros and Cons

Pros:
- 95.2% retrieval accuracy (R@5) on the LongMemEval-S benchmark, outperforming BM25-only by 9 percentage points. The hybrid search actually works.
- Zero external dependencies — runs on SQLite with local embeddings by default. No Qdrant, no pgvector, no managed cloud service required.
- Works with 15+ coding agents out of the box, with native plugins for the five most popular (Claude Code, Codex, Copilot, Cursor, Gemini CLI). One server serves all of them.
- 1,423+ tests passing with active CI. The project has solid engineering discipline for something three months old.

Cons:
- The iii engine dependency adds complexity. It's a separate Rust binary that needs to be installed (or Docker used as fallback). Windows support requires manual setup of about 10-20 minutes.
- Three months old with 21K stars means rapid growth but also rapid API evolution. The CHANGELOG suggests breaking changes are still happening.
- The 53-tool MCP surface is comprehensive but overwhelming. Most developers will use 5-10 tools regularly. The learning curve for the full feature set (leases, signals, sentinels, sketches) is steep.
- Memory quality depends on the LLM doing the compression. Garbage in, garbage out — if the agent's tool outputs are noisy, the compressed memories will be too.

### Getting Started

```bash
# Install globally (recommended)
npm install -g @agentmemory/agentmemory

# Start the memory server
agentmemory

# In another terminal: seed sample data and see recall in action
agentmemory demo

# Connect to your agent
agentmemory connect claude-code    # or: codex, copilot-cli, cursor, gemini-cli

# Install native skills so the agent knows when to use memory tools
npx skills add rohitg00/agentmemory -y

# Open the real-time viewer
open http://localhost:3113
```

The demo seeds three realistic sessions (JWT auth, N+1 query fix, rate limiting) and runs semantic searches against them. You'll see it find "N+1 query fix" when you search "database performance optimization" — keyword matching alone can't do that.

For MCP-only usage without the full server:

```bash
npx -y @agentmemory/mcp
```

### Alternatives

**mem0** — The most popular memory layer for AI applications with 58K stars. Mem0 is an API-first memory service that extracts and stores facts from conversations. It's more general-purpose (not coding-agent-specific) and requires external vector storage (Qdrant or pgvector). Its published retrieval accuracy on LoCoMo is 68.5% R@5, well below AgentMemory's 95.2% on LongMemEval-S. Choose mem0 if you need memory for chatbots or general AI apps rather than coding agents.

**supermemory** — A memory API for the AI era with 26K stars, built on Cloudflare Workers and D1. Supermemory is a managed cloud service — you don't run it yourself. It's simpler to set up (no engine to install) but gives up control over your data. Its retrieval accuracy is self-reported without published benchmarks. Choose supermemory if you want a zero-ops cloud memory service and don't mind your data living on Cloudflare.

**MemPalace** — An open-source vector memory system with 54K stars. MemPalace focuses on vector-only storage without the hybrid search (BM25 + vector + graph) that AgentMemory provides. It lacks auto-capture hooks, MCP server integration, and cross-agent coordination. Choose MemPalace if you need a simple vector store for embeddings and don't need the full agent memory lifecycle.

### Verdict

AgentMemory is the most complete solution I've seen for the AI coding agent memory problem. The 95.2% retrieval accuracy on a published benchmark (not self-reported) puts it ahead of every competitor. The MCP-first design means it works with every major coding agent without vendor lock-in. And the fact that it runs entirely locally with zero external dependencies makes it practical for individual developers, not just teams with infrastructure budgets. The iii engine dependency is a real friction point — installing a separate Rust binary isn't ideal — but the Docker fallback and npx-based quickstart mitigate it. At three months old with 21K stars and 1,423 tests, it has the velocity and engineering quality of a project that's going to stick around. If you're using any AI coding agent seriously, AgentMemory is worth the 5-minute setup. Your future sessions will thank you.
