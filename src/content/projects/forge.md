---
name: forge
description: "Python framework that makes self-hosted LLM tool-calling reliable — guardrails boost 8B models from 5% to 84% accuracy on agentic tasks."
url: https://github.com/antoinezambelli/forge
stars: 2059
forks: 144
language: Python
tags: ["ai-agents", "llm", "guardrails", "tool-calling", "self-hosted"]
featured: false
publishedAt: 2026-06-13
---

## Forge

### Overview

Forge is a Python reliability layer for self-hosted LLM tool-calling. It sits between your application and a local model server (Ollama, llama.cpp, vLLM) or Anthropic's API, applying guardrails that dramatically improve tool-calling accuracy. The headline number is hard to ignore: forge takes an 8B parameter local model from single-digit success rates to 84% across its 26-scenario evaluation suite. It even lifted Claude Sonnet 4.6 from 85% to 98% on the same workload.

The project comes from Antoine Zambelli, who built it while working on production agentic systems where small local models kept failing at structured tool calls. The frustration was familiar to anyone who's tried to use an 8B model for anything beyond simple chat — the model knows what it wants to do but can't reliably format tool calls, handle multi-step sequences, or recover from malformed outputs. Forge addresses each of those failure modes with composable middleware: rescue parsing fixes broken JSON, retry nudges guide the model back on track after errors, and response validation catches hallucinated parameters before they reach your code.

The project hit the front page of Hacker News with 687 points, which tells you something about the demand for this kind of tooling. The "self-hosted AI" movement is growing fast, driven by privacy concerns, cost control, and the improving quality of small models. But the gap between "runs locally" and "works reliably in production" is still enormous. Forge is one of the first projects to systematically close that gap for tool-calling specifically.

### Why it matters

The AI agent ecosystem is splitting into two camps: cloud-dependent systems that call OpenAI or Anthropic APIs, and self-hosted setups that run models locally. The cloud camp has better tool-calling reliability because frontier models are just better at structured output. The self-hosted camp has cost control, privacy, and offline capability — but their agents break constantly because 8B models are terrible at following tool-calling protocols.

This gap is a real problem. A Django developer building an internal AI assistant for their team doesn't want to route every request through Anthropic's API. They want to run Mistral or Llama locally, define some tools (query the database, call the REST API, generate a report), and have the agent use them correctly. Without something like forge, that agent will hallucinate tool names, mangle JSON parameters, and fail to recover from errors 90% of the time.

Forge makes the self-hosted path viable for production use cases. The proxy server mode is particularly clever — you point existing tools like Continue, aider, or Claude Code at forge's proxy endpoint, and the client thinks it's talking to a much smarter model. No code changes, no SDK migration, just better results from the same hardware. For fullstack developers who already have a Python backend (Django, FastAPI, Flask), integrating forge's guardrails into their agent loops is straightforward.

### Key Features

**Proxy Server Mode.** Drop-in proxy that speaks both OpenAI chat-completions and Anthropic Messages APIs. Point any compatible client at it — opencode, Continue, aider, even Claude Code — and forge applies guardrails transparently. The client thinks it's talking to a smarter model. Run it with `python -m forge.proxy` and route your existing tools through it without rewriting anything.

**Rescue Parsing.** When a model returns malformed JSON in a tool call (missing quotes, trailing commas, wrong types), forge doesn't just fail. It attempts to fix the output using multiple parsing strategies — extracting partial parameters, inferring types from the schema, and reconstructing valid calls from broken ones. This alone recovers a significant percentage of would-be failures from small models.

**Retry Nudges.** After a failed tool call, forge doesn't just retry with the same prompt. It injects a nudge message that explains what went wrong and how to fix it, giving the model context to self-correct. The nudges are parameterized — you can control how many retries to attempt and what feedback to include. This is the kind of detail that separates "works in a demo" from "works in production."

**Required Steps and Prerequisites.** While forge's guardrails work with zero configuration, you can optionally constrain the agent loop. Define required steps that must execute before the agent can terminate, set prerequisites (steps A and B must complete before C), and specify terminal tools that end the loop. This gives you explicit control over workflow structure without forcing it.

**Composable Middleware Architecture.** Forge's guardrails are implemented as middleware that you can plug into your own orchestration loop. Use the rescue parser standalone, combine it with retry nudges, or layer in response validation — each piece works independently. If you already have an agent framework (LangChain, CrewAI, custom), you can adopt forge's reliability stack without migrating.

**SlotWorker for Multi-Agent GPU Sharing.** For teams running multiple specialized agents on shared hardware, SlotWorker provides priority-queued access to a single inference slot with auto-preemption. A high-priority agent can interrupt a lower-priority one, use the GPU, and let the interrupted agent resume. This is practical for production deployments where GPU resources are scarce.

**Backend Flexibility.** Forge supports Ollama, llama-server (llama.cpp), Llamafile, vLLM, and Anthropic as backends. Switch between them by changing a config line. The eval suite shows llama-server performing best, but Ollama is easier to set up for development. Anthropic support means you can use forge's guardrails even with cloud APIs when you want the reliability boost.

### Use Cases

- **Internal AI assistants with tool access** — Give your team a chatbot that queries your Django database, calls your REST APIs, and generates reports. Forge's guardrails make small local models reliable enough for these structured tasks without burning API credits.

- **Code generation and refactoring tools** — Build a coding agent that reads files, makes edits, and runs tests. Point it through forge's proxy to get reliable tool-calling from a local model. The rescue parsing handles the messy JSON that code-focused models often produce.

- **Data pipeline automation** — Create agents that extract data from multiple sources, transform it, and load it into your warehouse. Forge's required steps and prerequisites ensure the agent completes each stage before moving on, and retry nudges handle transient API failures.

- **Customer support with knowledge base lookup** — Deploy a support agent that searches your docs, retrieves relevant articles, and generates responses. Forge's guardrails prevent the agent from hallucinating search queries or returning malformed API calls.

- **Self-hosted AI for regulated industries** — Healthcare, finance, and government teams that can't send data to external APIs can run local models with forge's guardrails, achieving reliability comparable to cloud models while keeping everything on-premises.

### Pros and Cons

Pros:
- The accuracy improvement is real and measurable. Taking an 8B model from single digits to 84% on structured tool-calling tasks is a game-changer for self-hosted AI. The eval suite with 26 scenarios gives you confidence the improvements generalize.
- Proxy server mode is brilliant for adoption. You can improve your existing tools without rewriting code — just point them at forge's endpoint. This lowers the barrier dramatically compared to frameworks that require you to rebuild your agent from scratch.
- Composable middleware means you're not locked in. Use the full framework or just the pieces you need. The architecture respects that most teams already have some agent infrastructure and don't want to replace it entirely.

Cons:
- Python 3.12+ requirement excludes teams on older versions. Many production environments still run 3.10 or 3.11, and upgrading Python versions in existing projects isn't always trivial.
- The project is relatively young (created February 2026). While the eval results are impressive, real-world edge cases in production agentic systems will surface issues that the test suite doesn't cover. Expect rough edges.
- Documentation covers the basics well but lacks depth on advanced patterns — custom middleware composition, complex workflow topologies, and integration with existing orchestration frameworks. You'll spend time reading source code for anything beyond the quick-start examples.

### Getting Started

```bash
# Install forge
pip install forge-guardrails                # core only
pip install "forge-guardrails[anthropic]"   # + Anthropic client

# Set up a local model server (pick one)
# Option A: llama-server (recommended for best results)
llama-server -m path/to/model.gguf --jinja -ngl 999 --port 8080

# Option B: Ollama (easier setup)
ollama pull ministral-3:8b-instruct-2512-q4_K_M
```

```python
import asyncio
from pydantic import BaseModel, Field
from forge import (
    Workflow, ToolDef, ToolSpec,
    WorkflowRunner, LlamafileClient,
)

def get_weather(city: str) -> str:
    return f"72°F and sunny in {city}"

class GetWeatherParams(BaseModel):
    city: str = Field(description="City name")

workflow = Workflow(
    name="weather",
    description="Look up weather for a city.",
    tools={
        "get_weather": ToolDef(
            spec=ToolSpec(
                name="get_weather",
                description="Get current weather",
                parameters=GetWeatherParams,
            ),
            callable=get_weather,
        ),
    },
    terminal_tool="get_weather",
)

runner = WorkflowRunner(client=LlamafileClient(base_url="http://localhost:8080"))
result = asyncio.run(runner.run(workflow, "What's the weather in San Francisco?"))
print(result)
```

For proxy mode (drop-in improvement for existing tools):

```bash
# Start the proxy between your client and model server
python -m forge.proxy --backend http://localhost:8080 --port 9000

# Point your existing tools at http://localhost:9000
```

### Alternatives

**Vercel AI SDK** — The go-to choice for TypeScript developers building AI features in Next.js apps. Vercel AI SDK handles model routing, streaming, and structured output beautifully, but it targets cloud APIs and doesn't address the reliability gap for small local models. Choose it when you're building in TypeScript and using cloud models exclusively.

**LangChain** — The most popular general-purpose AI framework, available in both Python and TypeScript. LangChain gives you agents, chains, tools, memory, and a massive integration ecosystem. But it doesn't specifically address tool-calling reliability for small models — its abstractions are higher-level and don't include rescue parsing or retry nudges. Choose LangChain when you need a full agent framework and are using models that already handle tool-calling well.

**Outlines** — A Python library for structured generation from LLMs, using constrained decoding to force models to produce valid JSON. Outlines works at the token level (modifying the model's output distribution) while forge works at the response level (parsing and fixing after generation). Outlines requires more setup and model-server integration, but its approach can be more reliable for strict schemas. Choose Outlines when you need guaranteed-valid output and can control your inference server.

### Verdict

Forge is the most practical tool I've seen for making self-hosted LLM agents actually work. The proxy mode alone justifies its existence — point your existing tools at it and get a measurable reliability boost without changing a line of code. The 84% accuracy number for 8B models isn't marketing fluff; it comes from a 26-scenario eval suite that the author publishes and maintains. At 2,059 stars and climbing after a 687-point HN front page, the project has clear momentum. If you're running local models for any kind of tool-calling agent — whether that's a Django management command, a FastAPI service, or a standalone automation script — forge should be in your stack. The composable middleware architecture means adoption is incremental: start with the proxy, graduate to WorkflowRunner, and pull in individual guardrails as needed. The Python 3.12+ requirement and the project's youth are real limitations, but the results speak for themselves.
