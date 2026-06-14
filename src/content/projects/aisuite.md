---
name: aisuite
description: "Andrew Ng's aisuite is a unified Python library for building with multiple LLM providers — one API for OpenAI, Anthropic, Google, Mistral, and more, plus an Agents API with toolkits and MCP support."
url: https://github.com/andrewyng/aisuite
stars: 14334
forks: 1497
language: Python
tags: ["ai", "llm", "python", "agents", "openai-alternative"]
featured: false
publishedAt: 2026-06-15
---

## aisuite

### Overview

aisuite is a lightweight Python library that gives you a single, OpenAI-style interface to every major LLM provider. Created by Andrew Ng's team at DeepLearning.AI, it crossed 14,000 GitHub stars in mid-2026 with 1,497 forks — numbers that reflect real adoption, not just hype. The project started as a simple chat completions wrapper in June 2024 and has since evolved into a two-layer platform: a unified Chat Completions API and a full Agents API with toolkits, state management, and MCP integration.

The library supports OpenAI, Anthropic, Google, Mistral, Hugging Face, AWS Bedrock, Cohere, Ollama, OpenRouter, and others. You swap providers by changing one string in your model name — `"openai:gpt-4o"` becomes `"anthropic:claude-sonnet-4-6"` — and everything else stays the same. No SDK juggling, no adapter pattern boilerplate, no vendor-specific response parsing.

What pushed aisuite from "useful wrapper" to "serious platform" is the Agents API added in 2025. It lets you declare agents with tool functions, run multi-turn tool-calling loops, attach prebuilt toolkits for files, git, and shell operations, and connect any MCP server. There's also a desktop app called OpenCoworker that uses aisuite as its engine — it can read files, send messages, create deliverables, and run scheduled automations.

### Why it matters

Every fullstack developer building AI features in 2026 faces the same problem: which LLM provider do you commit to? OpenAI has the best general reasoning, Anthropic handles long context better, Google offers the best price-performance on Gemini Flash, and local models via Ollama give you zero-latency privacy. The answer changes monthly as providers ship new models and adjust pricing.

Most teams end up writing their own abstraction layer — a thin wrapper that normalizes requests and responses across providers. aisuite is that abstraction layer, done properly, with the backing of Andrew Ng's team and a community of 14K+ developers. It's not trying to be a framework like LangChain or CrewAI. It's a focused utility: one API, many providers, minimal overhead.

The MCP integration is what makes this relevant beyond Python shops. The Model Context Protocol is becoming the standard way to connect LLMs to external tools. aisuite's native MCP support means you can plug in any MCP server — databases, APIs, file systems, custom tools — without writing provider-specific code. For a fullstack developer building an AI-powered feature in a Django backend or a Next.js API route, aisuite handles the LLM layer so you can focus on the product logic.

### Key Features

**Unified Chat Completions API.** The core of aisuite is a drop-in replacement for the OpenAI Python client that works with every major provider. You use the same `client.chat.completions.create()` call, the same message format, the same parameters (`temperature`, `max_tokens`, `tools`). The only thing that changes is the model string. This means you can A/B test providers in production with a one-line change, not a refactor.

**Agents API with Multi-Turn Tool Calling.** Pass plain Python functions as tools and aisuite generates the JSON schemas, executes the calls, and feeds results back to the model automatically. Set `max_turns` to control how many back-and-forth cycles the agent runs. The `response.choices[0].intermediate_messages` field carries the full tool interaction history so you can inspect or continue the conversation.

**Prebuilt Toolkits.** The Agents API ships with sandboxed tool families for common operations: file reading and writing, git history inspection, and shell command execution. You attach them with a one-liner: `tools=[*ai.toolkits.files(root="."), *ai.toolkits.git(root=".")]`. Each toolkit runs in its own sandbox with declared permissions.

**Native MCP Support.** Any MCP server's tools can be passed directly to a model without adapter code. You specify the MCP server as a tool config object with its command and arguments, and aisuite handles the protocol handshake, tool discovery, and execution. This connects your LLM to the growing ecosystem of MCP servers for databases, APIs, and developer tools.

**Tool Policies and Governance.** Production agent systems need guardrails. aisuite provides `RequireApprovalPolicy` for human-in-the-loop approval, allow/deny lists for tool access, and custom callable policies. You can decide per-call whether a tool execution needs human sign-off, which is critical for agents that touch production systems.

**State Stores for Persistence.** Agent runs can be persisted and resumed across processes using in-memory, file-based, or PostgreSQL state stores. This means an agent can start processing a request, save its state, and continue later — useful for long-running tasks or multi-step workflows that span multiple API calls.

**OpenCoworker Desktop App.** The project ships a desktop application built on aisuite that acts as an AI coworker. It reads files with permission, sends and receives messages via Slack and email, creates PDF reports and spreadsheets, and runs scheduled automations like daily news summaries. Available for macOS (Apple Silicon) and Windows.

### Use Cases

- **Django backends with AI features** — Use aisuite to add LLM-powered text generation, summarization, or classification to your Django views without locking into a single provider. Swap between GPT-4o and Claude based on task complexity or cost.

- **Next.js API routes with AI** — Call aisuite from your Python backend service while your Next.js frontend handles the UI. The unified API means your backend doesn't need separate code paths for different providers.

- **Multi-provider cost optimization** — Route simple queries to cheaper models (Gemini Flash, GPT-4o-mini) and complex reasoning tasks to premium models (Claude Opus, GPT-4o) using the same API. Change the model string, not the code.

- **Agent-powered automation** — Build agents that read codebases, run tests, create reports, and file issues. The toolkit system gives agents access to files, git, and shell in a sandboxed environment.

- **Prototyping AI features** — Test the same prompt across five providers in under 10 lines of code. Find the best model for your use case before committing to a provider contract.

### Pros and Cons

Pros:

- The OpenAI-compatible interface means existing code using the OpenAI SDK can switch to aisuite with minimal changes — usually just the import and client initialization.
- Andrew Ng's involvement brings credibility and a community that actually uses the library in production, not just stars from marketing campaigns.
- The MIT license and modular provider system mean you're never locked in. Add a custom provider by implementing a single class in a new file.
- MCP support is forward-looking. As the ecosystem matures, your aisuite-based agent code gets access to new tools without code changes.

Cons:

- Python-only. If your stack is TypeScript/Node.js (NestJS, Next.js), you'll need a Python service or a different library. There's no official TypeScript binding.
- The Agents API is powerful but still young. The toolkit ecosystem is limited to files, git, and shell — you'll need to build custom toolkits for domain-specific operations.
- Provider parity isn't perfect. Some providers don't support all features (e.g., tool calling varies across providers), and aisuite can't fully abstract those differences away.

### Getting Started

```bash
# Install the base package
pip install aisuite

# Or install with a specific provider
pip install 'aisuite[anthropic]'

# Or install with all providers
pip install 'aisuite[all]'
```

Basic usage — swap providers by changing the model string:

```python
import aisuite as ai

client = ai.Client()

response = client.chat.completions.create(
    model="openai:gpt-4o",
    messages=[
        {"role": "system", "content": "You are a helpful assistant."},
        {"role": "user", "content": "Explain React Server Components in 3 sentences."}
    ],
    temperature=0.7
)

print(response.choices[0].message.content)
```

Agent with tools:

```python
import aisuite as ai
from aisuite import Agent, Runner

agent = Agent(
    name="code-reviewer",
    model="anthropic:claude-sonnet-4-6",
    instructions="You are a code reviewer. Analyze the repo and give feedback.",
    tools=[*ai.toolkits.files(root="."), *ai.toolkits.git(root=".")],
)

result = Runner.run(agent, "What changed in the last commit? Summarize in 3 bullets.")
print(result.final_output)
```

### Alternatives

**LiteLLM** — The most direct competitor. LiteLLM also provides a unified interface to 100+ LLM providers with an OpenAI-compatible API. It's more mature (started in 2023) and has a proxy server for team usage, request logging, and budget management. Choose LiteLLM if you need a production proxy with observability and cost tracking. Choose aisuite if you want a simpler library with a first-class Agents API and MCP support.

**LangChain** — A full application framework for LLM-powered apps with chains, agents, memory, retrieval, and integrations. LangChain is much heavier and opinionated — it's a framework, not a utility. Choose LangChain if you're building complex multi-step pipelines with retrieval-augmented generation. Choose aisuite if you want a lightweight provider abstraction without the framework overhead.

**Vercel AI SDK** — The TypeScript answer to the same problem. If your stack is Next.js/Node.js, the Vercel AI SDK gives you a unified interface to multiple providers with streaming, tool calling, and React hooks. Choose Vercel AI SDK if you're all-in on TypeScript. Choose aisuite if your backend is Python (Django, Flask, FastAPI).

### Verdict

aisuite fills a gap that every Python web developer hits within the first week of building AI features: how do you avoid locking into one LLM provider? The answer is usually "write your own wrapper," and aisuite is that wrapper, done by people who understand the ecosystem deeply. The 14K stars reflect genuine utility, not marketing — the library does one thing well and doesn't try to be a framework. The Agents API and MCP support push it beyond a simple wrapper into something you can build real agent systems on. If you're a Django or Python backend developer adding AI capabilities in 2026, aisuite is the first library you should evaluate. The fact that you can switch from GPT-4o to Claude to a local Ollama model by changing one string is worth the dependency alone.
