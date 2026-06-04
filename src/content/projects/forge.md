---
name: forge
description: "Forge is a Python reliability layer for self-hosted LLM tool-calling — boosting 8B models from single digits to 84% on multi-step agentic tasks with zero-config guardrails."
url: https://github.com/antoinezambelli/forge
stars: 1981
forks: 140
language: Python
tags: ["llm", "tool-calling", "agents", "self-hosted", "guardrails", "python"]
featured: false
publishedAt: 2026-06-04
---

## Forge

### Overview

Forge is a Python framework that makes self-hosted LLM tool-calling reliable. It takes an 8B local model from single-digit accuracy to 84% across its 26-scenario evaluation suite — and lifts Sonnet 4.6 from 85% to 98% on the same workload. Those aren't marginal improvements. That's the difference between "this model can't do tool calls" and "this model ships to production."

The project is built by Antoine Zambelli, and it's backed by a published IEEE paper: *Forge: A Reliability Layer for Self-Hosted LLM Tool-Calling.* Academic backing for an open-source tool is uncommon, and it matters here because the core technical claims — rescue parsing, retry nudges, synthetic tool injection — are peer-reviewed, not just marketing claims on a README.

The fundamental problem Forge solves is that small local models are terrible at structured tool calling. They produce malformed JSON, pick the wrong format, hallucinate tool names, or just output bare text when they should be calling tools. Forge sits between your application and the model backend, intercepting every response and applying a stack of guardrails: response validation, rescue parsing for malformed outputs, retry loops with corrective nudges, and a synthetic `respond` tool that forces the model to choose between calling a tool and producing text. The result is a local 8B model that behaves like something much larger.

### Why it matters

The self-hosted LLM space is exploding. Ollama crossed 100 million downloads, llama.cpp powers everything from Raspberry Pi setups to enterprise GPU clusters, and tools like Continue, aider, and OpenCode are pushing local-first development workflows mainstream. But there's a dirty secret: small models are unreliable at the structured output that agentic workflows demand. You can run Mistral 3B locally, but try getting it to reliably call three tools in sequence and you'll spend more time debugging malformed responses than building features.

Forge fills exactly this gap. It doesn't try to be an agent orchestrator or a coding framework — it sits inside one agentic loop and makes tool calls work. That narrow scope is its strength. The proxy mode means you can point existing tools (aider, Continue, Cline, even Claude Code) at a Forge-guarded local model and get dramatically better results without rewriting anything.

The timing matters too. Every coding agent is moving toward local model support — Cursor has local models, Continue is built around them, and the cost savings are enormous. But the reliability gap between local and cloud models on tool-calling tasks is what's holding adoption back. Forge directly attacks that gap with a concrete, measurable solution.

### Key Features

**Rescue Parsing.** When a model emits tool calls in the wrong format — JSON stuffed in a code fence, Mistral's `[TOOL_CALLS]name{args}` syntax, or Qwen's `<tool_call>` XML — Forge extracts the structured call and re-emits it in the canonical OpenAI `tool_calls` schema. This single feature accounts for the biggest practical improvement for Mistral-family models, which tend to produce well-structured tool calls in their own non-standard format.

**Synthetic `respond` Tool Injection.** Small models (~8B parameters) can't reliably decide between producing text and calling a tool. Forge solves this by injecting a synthetic `respond` tool whenever tools are present in the request. The model calls `respond` instead of generating bare text, and Forge strips it from the outbound response. The client sees a normal text completion and never knows the tool existed. This is the kind of pragmatic engineering that makes local models actually usable.

**Drop-In Proxy Server.** Run `python -m forge.proxy` and you get a server speaking both OpenAI's chat-completions API and Anthropic's Messages API (`/v1/messages`). Point any existing client at it — OpenAI-compatible tools, Claude Code, anything — and Forge applies guardrails transparently. The client thinks it's talking to a smarter model. No Python rewrite required.

**Multi-Backend Support.** Forge works with Ollama, llama-server (llama.cpp), Llamafile, vLLM, and Anthropic. The managed mode spins up backends automatically; external mode talks to whatever endpoint you point it at. The eval suite tests against multiple backends so you can pick the right one for your hardware. llama-server consistently produces the best results in Forge's evaluations, but Ollama is easier to set up for quick experiments.

**WorkflowRunner with Step Enforcement.** For multi-step agent loops, Forge's `WorkflowRunner` manages the full lifecycle: system prompts, tool execution, context compaction, and guardrails. You can define `required_steps` and `prerequisites` to enforce ordering constraints. The `SlotWorker` extension adds priority-queued access to a shared inference slot with auto-preemption — useful when multiple specialist workflows share a single GPU.

**26-Scenario Evaluation Harness.** Forge ships with a comprehensive eval suite that measures tool-calling reliability across real scenarios — not synthetic benchmarks. Run `python -m tests.eval.batch_eval --config all --runs 50` to qualify any model-backend combination before deploying. The eval includes an OG-18 baseline tier and an 8-scenario advanced-reasoning tier for top-end separation. This is the kind of rigor you'd expect from an IEEE-published project.

**Composable Middleware.** If you already have an orchestration loop and don't want to adopt Forge's `WorkflowRunner`, you can import the guardrails stack as middleware. Response validation, rescue parsing, step enforcement, and error tracking are independently composable. You control the loop; Forge validates the outputs.

### Use Cases

- **Local coding agents** — Teams running aider, Continue, or Cline with local models can use the proxy mode to dramatically improve tool-calling reliability without changing their setup. Point the proxy at a Forge-guarded model and watch malformed responses drop.

- **Self-hosted chat assistants** — Customer support bots, internal knowledge bases, or personal assistants running on local hardware. Forge's guardrails make 8B models reliable enough for production use where tool calls trigger real actions (database queries, API calls, file operations).

- **Multi-agent GPU sharing** — When multiple agent workflows need inference on a shared GPU, `SlotWorker` provides priority-queued access with auto-preemption. A critical production agent can preempt a background research task without manual orchestration.

- **Prototype-to-production agent pipelines** — Use the eval harness to qualify model-backend combinations during development, then deploy with confidence. The 26-scenario suite catches reliability regressions before they hit production.

- **Claude Code with local models** — Set `ANTHROPIC_BASE_URL` to the Forge proxy and run Claude Code against a local model. Forge serves the Anthropic Messages API and applies guardrails, making the experience significantly more reliable than raw local inference.

### Pros and Cons

Pros:
- Measurable, reproducible improvements backed by a published IEEE paper. The eval harness lets you verify claims against your own model-backend combinations instead of trusting marketing numbers.
- The proxy mode requires zero code changes — point existing tools at the proxy and get better results. This is the lowest-friction path to reliable local model tool-calling available.
- Five releases in two weeks (v0.7.0 through v0.7.4 as of June 2026) with substantive improvements each time. The project is moving fast without sacrificing quality.
- MIT licensed with 865 deterministic unit tests. You can fork it, extend it, or contribute without worrying about licensing or test coverage.

Cons:
- Python 3.12+ requirement excludes teams stuck on older Python versions. The `pydantic` dependency adds another constraint for environments with strict dependency policies.
- The eval suite uses Ministral-3-8B-Instruct as its primary benchmark model. Results on other architectures (Qwen, Llama, Gemma) may vary, and the MODEL_GUIDE.md doesn't cover every popular local model.
- Not an agent orchestrator by design — if you need multi-agent graphs, DAG planners, or cross-agent coordination, you'll still need a framework like LangGraph or CrewAI alongside Forge. It solves one problem well but doesn't try to solve everything.

### Getting Started

```bash
# Install the core package
pip install forge-guardrails

# Or with Anthropic support
pip install "forge-guardrails[anthropic]"

# Set up a backend (llama-server recommended for best results)
# Download a model, then:
llama-server -m path/to/Ministral-3-8B-Instruct-2512-Q8_0.gguf --jinja -ngl 999 --port 8080

# Quick proxy mode — point any OpenAI-compatible client at localhost:8081
python -m forge.proxy --backend-url http://localhost:8080 --port 8081

# Or let Forge manage the backend automatically
python -m forge.proxy --backend llamaserver --gguf path/to/model.gguf --port 8081
```

Then configure your client to use `http://localhost:8081/v1` as the API base URL. For Claude Code, set `ANTHROPIC_BASE_URL=http://localhost:8081`.

For direct Python usage:

```python
import asyncio
from forge import Workflow, ToolDef, ToolSpec, WorkflowRunner, LlamafileClient

# Define tools, pick a backend, run structured agent loops
# See the User Guide for multi-turn and context management
```

### Alternatives

**LangChain / LangGraph** — The dominant agent orchestration framework with a huge ecosystem. LangGraph handles multi-agent coordination, state machines, and complex workflow graphs that Forge explicitly doesn't try to solve. Choose LangGraph when you need agent orchestration; choose Forge when you need tool-calling reliability for a single agent loop.

**Guardrails AI** — A validation framework focused on structured output schemas and content moderation. Guardrails AI is broader in scope (it handles RAG pipelines, content filtering, and output formatting) but doesn't address the specific problem of malformed tool calls from local models. Forge's rescue parsing and synthetic tool injection are more targeted solutions for the tool-calling reliability gap.

**Outlines** — A library for structured generation from language models using constrained decoding. Outlines works at the token level to force valid JSON output, which is a different approach from Forge's post-hoc rescue parsing. Outlines requires model-level integration and doesn't work as a drop-in proxy. Choose Outlines when you control the inference stack and want guaranteed valid output; choose Forge when you need a transparent proxy that works with existing tools.

### Verdict

Forge is the most practical open-source tool I've seen for making local LLMs usable in agentic workflows. The proxy mode alone — run one command, point your existing tools at it, get dramatically better results — makes it worth installing for anyone running local models. The fact that it's backed by a peer-reviewed paper and ships with a 26-scenario eval suite separates it from the wave of "reliability" tools that offer hand-wavy improvements. Five releases in two weeks signals a maintainer who's actively iterating, not just parking a repo. If you're building anything that involves local models and tool calls — coding agents, chat assistants, automation pipelines — Forge should be in your stack.
