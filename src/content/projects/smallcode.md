---
name: smallcode
description: "SmallCode is an AI coding agent built for local 8B-35B models — patch-first editing, context budgeting, and forgiving tool parsing that makes small LLMs actually useful for coding."
url: https://github.com/Doorman11991/smallcode
stars: 1733
forks: 130
language: JavaScript
tags: ["ai-agent", "local-llm", "coding-agent", "privacy", "developer-tools"]
featured: false
publishedAt: 2026-06-03
---

## SmallCode

### Overview

SmallCode is a terminal-native AI coding agent designed specifically for small language models — the 8B to 35B parameter range that runs on consumer hardware. It hit 1,700 GitHub stars within two weeks of its May 2026 launch, which signals real demand for a coding agent that doesn't require a $20/month API subscription or a cloud connection.

The project takes a fundamentally different approach from tools like Cursor, OpenCode, or Claude Code. Those tools assume you're using frontier models with 128k+ context windows and near-perfect tool calling. SmallCode assumes your model is running locally via Ollama, LM Studio, or llama.cpp, and it compensates for the limitations that come with smaller models — limited context, unreliable JSON output, tendency to hallucinate file contents, and poor multi-step reasoning.

The core problem it solves: developers want AI coding assistance without sending their code to third-party servers, without paying per-token API costs, and without depending on internet connectivity. But existing local coding agents are designed for frontier models and break down when you point them at a 14B parameter model. SmallCode is purpose-built for that gap.

### Why it matters

The local LLM ecosystem has matured fast. Models like Qwen3 8B, DeepSeek V4, and Llama 4 Scout can handle real coding tasks when given the right tooling. The problem is that coding agents designed for Claude Sonnet or GPT-5 treat local models as afterthoughts — they dump massive system prompts into 8k context windows, expect reliable JSON tool calls, and write entire files when they should be patching. SmallCode flips that assumption.

This connects to a broader trend: privacy-conscious development is no longer niche. Enterprise teams can't send proprietary code to cloud APIs. Solo developers in regions with expensive or unreliable internet need offline-first tools. And cost-sensitive teams running internal models want agents that actually work with their hardware budget. SmallCode addresses all three without pretending to be something it's not.

The project also introduces MarrowScript, a declarative cognition layer that compiles to TypeScript — one 50-line `.marrow` file generates 1,400+ lines of runtime code with caching, retry, validation, and budget enforcement. That's a genuinely novel approach to making small models behave predictably.

### Key Features

**Patch-First Editing.** Instead of asking the model to reproduce entire files (which small models truncate, hallucinate, or drift on), SmallCode uses search-and-replace as its primary edit primitive. The model describes what to change and where, and SmallCode applies the patch. This is more context-efficient and dramatically reduces file corruption — the most common failure mode with local coding agents.

**2-Stage Tool Routing.** Most coding agents dump all 15-20 tool schemas into every prompt. SmallCode splits this into two stages: the model first picks a category (read/write/search/run/plan), then receives only the relevant tool schemas. This halves the schema context overhead, which is critical when your model has 8-16k usable context.

**Forgiving Tool Call Parser.** Small models produce messy output. SmallCode parses tool calls from JSON, YAML, XML, Hermes format, Liquid AI's custom markers, or plain text. It auto-repairs common mistakes like wrong parameter names and type mismatches, and falls back to scanning `reasoning_content` when `content` is empty. This is the kind of engineering that makes the difference between "works in a demo" and "works on my machine."

**Context Budget Engine.** Tool results are capped at 4k characters, mid-turn eviction drops old results when context grows too large, and semantic compression summarizes history instead of dropping it. The agent never exceeds your model's context window. You can also cap the thinking budget per call to prevent reasoning models from burning thousands of tokens on trivial tasks.

**Model Escalation with Guardrails.** When the local model hard fails after retry and decomposition, SmallCode can optionally escalate to a stronger cloud model (Claude, OpenAI, DeepSeek). This is fully opt-in and session-limited to prevent runaway costs. You keep local-first as the default, with cloud as a safety net — not the other way around.

**Hybrid Code Search.** The `hybrid_search` tool combines exact matching (regex/keyword, the precision of grep) with semantic ranking (find code that does a thing even when it doesn't contain the query words). It runs fully offline with zero model downloads, using a local BM25 plus hashed-vector engine that runs instantly on CPU. Four modes: hybrid (default), regex, keyword, and semantic.

**Persistent Shell Sessions.** Bash calls share a long-lived shell process so `cd`, environment variables, and shell variables persist across calls. Without this, every bash call is a fresh process, breaking multi-step tasks like "cd src then run pytest." Optional cwd-containment refuses any directory escape that would leave the project root.

### Use Cases

- **Privacy-sensitive enterprise development** — Teams working on proprietary codebases who can't send code to cloud APIs but still want AI coding assistance with models running on internal infrastructure.
- **Offline and low-connectability environments** — Developers in regions with expensive or unreliable internet, or working on air-gapped networks, who need a coding agent that works entirely locally.
- **Cost-conscious solo developers** — Independent developers who want AI assistance without $20/month subscriptions or per-token API costs. Run a 14B model on a laptop GPU and get real coding help.
- **Fullstack web development with local models** — React, NestJS, Django, and Go developers who want an agent that understands their stack but runs on a local Qwen3 or DeepSeek model instead of requiring Claude or GPT-5.
- **Learning and experimentation** — Students and junior developers exploring AI coding agents who don't want to commit to paid API tiers. Install, point at a local model, and start building.

### Pros and Cons

Pros:
- Genuinely novel architecture for small models — the patch-first editing, 2-stage routing, and forgiving parser solve real problems that other agents ignore.
- Fully local and private by default. No code leaves your machine unless you explicitly configure cloud escalation.
- Smart cost controls — context budgeting, thinking budget caps, and session-limited escalation prevent runaway token usage.
- Active development with rapid iteration. 1,700 stars in two weeks and responsive issue tracking.
- Works with any OpenAI-compatible endpoint — Ollama, LM Studio, llama.cpp, vLLM, or remote APIs.

Cons:
- JavaScript/Node.js codebase may not appeal to developers who prefer Python or Go tooling. The entry point is a 1,570-line single file, which is a lot to grok.
- Small models still struggle with complex multi-step tasks. The architecture helps, but a 14B model is not going to match Claude Sonnet on refactoring a 5,000-line file.
- The MarrowScript dependency and BoneScript integration add conceptual overhead. You're learning SmallCode's ecosystem, not just a coding agent.
- Documentation is solid but the project is young — expect rough edges and breaking changes in the near term.

### Getting Started

```bash
# Install globally via npm
npm install -g smallcode

# Or run directly with npx
npx smallcode

# Start in your project directory
cd my-project
smallcode

# Configure your local model
cat > .env <<'EOF'
SMALLCODE_MODEL=qwen3:8b
SMALLCODE_BASE_URL=http://localhost:11434/v1
EOF

# For the fullscreen TUI
smallcode

# Classic readline fallback if TUI has issues
smallcode --classic

# Build the local RAG database for code search
npm run rag:index
npm run rag:index -- --preset broad
```

For cloud escalation on hard failures, add optional API keys:

```bash
# .env
ANTHROPIC_API_KEY=sk-***
OPENROUTER_API_KEY=sk-***
```

### Alternatives

**OpenCode** — A Go-based coding agent designed for frontier models. OpenCode assumes large context windows and reliable tool calling, so it works brilliantly with Claude Sonnet or GPT-5 but degrades significantly with smaller models. Choose OpenCode if you're using cloud APIs and want a Go-native tool; choose SmallCode if you're running local models.

**Aider** — A Python-based pair programming tool that supports multiple LLM backends including local models. Aider is more mature and has better Git integration, but it's designed around full-file edits rather than patches, which makes it less reliable with small models. Choose Aider if you need battle-tested Git workflows; choose SmallCode if your local model keeps corrupting files.

**Continue** — A VS Code/JetBrains extension that brings AI coding assistance into your IDE. Continue supports local models and has a plugin ecosystem, but it's an IDE extension rather than a terminal-native agent. Choose Continue if you prefer staying in your editor; choose SmallCode if you want a terminal-first workflow with deeper small-model optimization.

### Verdict

SmallCode is the first coding agent I've seen that takes small models seriously as a primary target rather than treating them as a fallback. The patch-first editing alone solves the single biggest pain point of running local coding agents — file corruption from models that can't reproduce entire files reliably. Add the 2-stage tool routing, forgiving parser, and context budget engine, and you have something that actually makes a 14B parameter model useful for real coding work. It's not going to replace Claude Code for complex refactoring, but that's not the point. If you're running local models for privacy, cost, or offline reasons, SmallCode is the agent that was missing from the ecosystem. The 1,700 stars in two weeks suggest the developer community agrees.
