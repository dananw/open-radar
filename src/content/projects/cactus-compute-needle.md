---
name: needle
description: "Needle distills Gemini tool calling into a 26M parameter model that runs on phones, watches, and glasses — open weights, local finetuning included."
url: https://github.com/cactus-compute/needle
stars: 2605
forks: 176
language: Python
tags: ["ai-agents", "edge-ai", "tool-calling", "on-device", "gemini"]
featured: false
publishedAt: 2026-06-15
---

## Needle

### Overview

Needle is a 26-million-parameter model that does one thing extremely well: function calling. It was distilled from Gemini 3.1 and beats FunctionGemma-270M, Qwen-0.6B, Granite-350M, and LFM2.5-350M on single-shot function call benchmarks. The kicker? It runs on your phone, your watch, maybe your glasses. Weights are fully open on HuggingFace, the dataset generation pipeline is public, and you can finetune it locally on a Mac or PC with a single command.

The project comes from Cactus Compute, a team focused on making AI practical for consumer hardware. They've built a custom architecture they call "Simple Attention Networks" — d=512, 8 heads with 4 KV cache, BPE vocabulary of 8192 tokens. The encoder has 12 layers (no FFN, just self-attention with GQA and RoPE), and the decoder has 8 layers with cross-attention back to the encoder. It's a deliberately minimal design. Pretrained on 16 TPU v6e for 200B tokens in 27 hours, then post-trained on 2B tokens of single-shot function call data in 45 minutes.

The benchmark numbers are what got the HN crowd excited — 776 points on the Show HN post. Needle handles the "which function should I call and with what arguments" problem that every AI agent framework hits. Instead of routing every tool call through a 70B+ model or a paid API, you run a 26M model locally at 6,000 tokens/sec prefill and 1,200 tokens/sec decode on Cactus runtime. That's fast enough for real-time voice agents and interactive tools.

### Why it matters

The AI agent space is hitting an infrastructure wall. Every agent framework — LangChain, CrewAI, AutoGen, the lot — eventually runs into the same problem: tool calling is expensive and slow when you're routing through cloud APIs. A single agent loop with 5 tool calls might cost $0.02 and take 3 seconds. Scale that to thousands of users and the economics break fast.

Needle offers a different path. Instead of sending every function call decision to GPT-4 or Claude, you run a tiny specialized model locally. It only does one thing — decide which function to call and extract the arguments — but it does that one thing better than models 10x its size. For developers building AI-powered web apps with React frontends and NestJS or Django backends, this means you can embed intelligent tool routing directly in your service layer without the latency and cost of external API calls.

The open weights and local finetuning story is what makes this genuinely useful rather than just impressive on paper. You define your own tools, generate training data via Gemini, finetune Needle on your specific function schema, and deploy a model that knows your API intimately. The playground UI makes this a click-through experience. No ML expertise required.

### Key Features

**Specialized Architecture for Function Calling.** Needle uses a "Simple Attention Network" with an encoder-decoder design optimized specifically for tool call extraction. The encoder processes the user query, the decoder generates structured function calls. No general-purpose chat overhead — just the minimal computation needed to map a natural language request to a function name and arguments. This focus is why a 26M model outperforms models 10-25x larger on this specific task.

**Open Weights and Full Training Pipeline.** The model weights live on HuggingFace under Cactus-Compute/needle. The dataset generation pipeline is public — you can see exactly how the training data was synthesized from Gemini 3.1. This isn't a "trust us, it works" release. You can inspect, modify, and retrain the entire pipeline.

**One-Command Local Finetuning.** Run `needle finetune data.jsonl` and the CLI handles everything — auto-downloads weights if needed, trains on your custom tool definitions, evaluates, and bundles the result. The JSONL format is simple: each line has a `query`, `tools` (JSON schema), and `answers` (the expected function calls). You can generate this data automatically via the playground or write it by hand.

**Interactive Playground UI.** `needle playground` launches a Gradio web interface at localhost:7860 where you can test tool calling with your own function definitions, generate training data using Gemini, finetune, and evaluate — all in one interface. This lowers the barrier from "interesting paper" to "working in my project" dramatically.

**Cactus Runtime Performance.** On the Cactus inference engine, Needle runs at 6,000 tokens/sec prefill and 1,200 tokens/sec decode. That's fast enough for real-time voice agents, interactive CLI tools, and web backends where latency matters. The runtime is designed for consumer hardware — phones, laptops, edge devices.

**Standard Tool Schema Format.** Needle uses the same JSON schema format that OpenAI, Anthropic, and Google use for function definitions. If you already have tool definitions for Claude or GPT, they work with Needle without modification. No adapter layer, no format conversion.

### Use Cases

- **AI agent backends** — Replace expensive cloud API calls for tool routing in your NestJS or Django agent service. Run Needle locally to decide which function to call, then execute it server-side. Cuts latency from 800ms to under 50ms per tool decision.

- **Voice assistants on edge devices** — Build voice-controlled home automation or wearable interfaces where every millisecond of latency matters. Needle's 26M footprint means it runs on a Raspberry Pi or Android phone without sweating.

- **Multi-agent orchestration** — When you have a swarm of specialized agents, each one needs to decide which tools to call. Running a full LLM for each decision is wasteful. Needle handles the routing layer cheaply and fast.

- **Offline-first applications** — Apps that need to work without internet connectivity — field tools, remote diagnostics, travel apps. Needle runs entirely locally, so your tool calling works in airplane mode.

- **Cost-sensitive SaaS products** — If your product makes thousands of agent loops per day per user, the API costs add up. Needle handles the common tool-calling patterns locally, and you only escalate to a larger model for complex reasoning.

### Pros and Cons

Pros:
- Beats models 10-25x larger on single-shot function calling benchmarks. The specialization pays off — general-purpose models waste capacity on capabilities you don't need for this task.
- Open weights with full training pipeline transparency. You can inspect, audit, and modify everything. No black boxes.
- Local finetuning is genuinely accessible. The playground UI means you don't need ML expertise to adapt Needle to your specific tool definitions.

Cons:
- Single-purpose model. Needle does function calling and nothing else. It can't hold a conversation, explain its reasoning, or handle multi-step planning. You still need a larger model for the actual intelligence.
- Small models can be finicky, as the authors note. Edge cases in tool selection may produce unexpected results, especially with ambiguous queries or overlapping function signatures.
- The Cactus runtime (where the 6K tokens/sec numbers come from) is a separate project with its own learning curve. Running Needle via the Python library is simpler but slower.

### Getting Started

```bash
# Clone and set up
git clone https://github.com/cactus-compute/needle.git
cd needle && source ./setup

# Launch the interactive playground
needle playground
# Opens at http://127.0.0.1:7860

# Use in Python
from needle import SimpleAttentionNetwork, load_checkpoint, generate, get_tokenizer

params, config = load_checkpoint("checkpoints/needle.pkl")
model = SimpleAttentionNetwork(config)
tokenizer = get_tokenizer()

result = generate(
    model, params, tokenizer,
    query="What's the weather in San Francisco?",
    tools='[{"name":"get_weather","description":"Get current weather for a city.","parameters":{"location":{"type":"string","description":"City name.","required":true}}}]',
    stream=False,
)
print(result)
# [{"name":"get_weather","arguments":{"location":"San Francisco"}}]

# Finetune on your own tools
needle finetune my_tools.jsonl
```

### Alternatives

**FunctionGemma-270M** — Google's function-calling model at 270M parameters, roughly 10x Needle's size. FunctionGemma handles a broader range of tasks but is slower and more resource-intensive. Choose it when you need function calling plus basic reasoning in a single model, and you have the compute budget for it.

**Gorilla LLM** — Berkeley's tool-calling LLM that supports over 1,600 APIs. Gorilla is much larger (7B+) and focuses on breadth of API coverage rather than edge deployment. Better choice when you need to handle a huge variety of APIs and can afford cloud inference costs.

**Native tool calling in GPT-4/Claude** — The simplest option: just use the tool calling features built into frontier models. Works great when latency and cost aren't concerns. Choose this path when your agent makes relatively few tool calls and you need the full reasoning capabilities of a large model alongside the function selection.

### Verdict

Needle is the most interesting edge AI project I've seen this year. The core insight — that you can distill a specific capability (tool calling) into a model small enough to run anywhere — has real implications for how we build AI-powered applications. If you're a fullstack developer building agent backends with NestJS or Django, Needle lets you handle the tool routing layer locally at a fraction of the cost and latency of cloud APIs. The 776 HN points and 2,600+ GitHub stars in a month suggest the developer community sees the same potential. It's early days — the model is finicky, the runtime ecosystem is nascent, and you still need a larger model for actual reasoning. But for the specific problem of "which function should I call with what arguments," Needle is remarkably capable for its size. Worth prototyping with if you're building anything that makes frequent tool calls.