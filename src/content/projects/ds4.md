---
name: ds4
description: "DwarfStar is antirez's standalone DeepSeek V4 inference engine — run a 284B MoE model locally on your Mac with Metal or CUDA, with an integrated coding agent."
url: https://github.com/antirez/ds4
stars: 12762
forks: 1111
language: C
tags: ["local-inference", "deepseek", "llm", "metal", "cuda", "coding-agent"]
featured: false
publishedAt: 2026-06-02
---

## DS4 (DwarfStar)

### Overview

DwarfStar — the project most people just call "ds4" — is a native inference engine built specifically for DeepSeek V4 Flash and PRO models. It crossed 12,000 GitHub stars in under a month. That kind of velocity usually signals either hype or something genuinely useful; in this case, it's the latter.

The project is created by Salvatore Sanfilippo, better known as antirez, the person who built Redis. If you've used a web application in the last fifteen years, you've used Redis. antirez's track record with systems software is about as good as it gets — he writes small, focused, correct programs and ships them with a clarity that most open source projects never achieve. After leaving Redis Labs, he worked on a few smaller projects, but ds4 is his most substantial release in years. The codebase is 191 commits deep from him personally, with small contributions from a handful of others.

The core problem ds4 solves is deceptively simple: running DeepSeek V4 Flash locally, well. DeepSeek V4 Flash is a 284-billion parameter mixture-of-experts model with a 1-million-token context window. It's genuinely impressive — closer to frontier models than anything else in its weight class. But running a 284B MoE model on consumer hardware requires very specific engineering. Generic GGUF runners work, but they don't optimize for Flash's particular architecture, its compressed KV cache, or its routing behavior. ds4 does. The result is a model that runs on a MacBook Pro with 128GB of RAM at 26 tokens per second, with thinking mode that scales its reasoning effort to match problem complexity. That's not a toy — that's a usable daily-driver coding assistant running entirely on your machine.

### Why it matters

The local inference space has been dominated by llama.cpp for years, and for good reason — it supports hundreds of models across every hardware platform. But that generality is also a limitation. When you try to be everything, you can't be the best at anything specific. ds4 takes the opposite approach: one model, one engine, optimized end-to-end. The GGUF files are custom-crafted for this engine. The quantization is asymmetric — only the routed MoE experts get heavily quantized (IQ2_XXS for up/gate, Q2_K for down), while shared experts and projections stay at full precision. This is not the kind of thing a generic runner does.

For fullstack web developers, the relevance is practical. You're probably using Claude, GPT-4, or Gemini for coding assistance right now. Those are API-dependent, cost money per token, and send your code to someone else's servers. ds4 gives you a 284B-parameter model running on your MacBook that's good enough for real coding work — tool calling, long-context analysis, multi-file refactoring — with zero API costs and complete privacy. The integrated coding agent means you don't even need a separate harness. Run `ds4-agent` and start working.

The timing matters too. DeepSeek has been releasing model updates at a steady clip, and V4 Flash represents a genuine step change in the quality-to-size ratio. antirez is betting that this particular model family deserves dedicated engineering rather than waiting for the next generic runner to catch up. So far, the bet is paying off — the KV cache compression alone lets you run with a 250K context window on 128GB machines, something that would be impossible without model-specific optimization.

### Key Features

**Model-Specific Inference Path.** ds4 is not a generic model runner. It's written in C, doesn't link against GGML, and implements every tensor operation targeting DeepSeek V4's specific MoE architecture. The result is faster inference than you'd get from a general-purpose tool — 26-34 tokens per second on Apple Silicon, depending on the machine. The code is small enough that antirez can validate it against official DeepSeek logits at every context size.

**Asymmetric 2-Bit Quantization.** The quantization strategy is clever and unusual. Only the routed MoE experts — which make up the majority of the model's parameters — get aggressively quantized. Shared experts, projections, and routing layers stay at full precision. This means a 284B parameter model fits in 96-128GB of RAM without becoming incoherent. The imatrix-tuned variants are particularly good; they're calibrated on real coding and reasoning tasks, not generic text.

**On-Disk KV Cache Persistence.** This is the feature that changes what's possible. DeepSeek V4's KV cache is already highly compressed, and ds4 takes advantage of that by treating the disk as a first-class KV cache citizen. You can persist conversation state across sessions, resume long contexts without reprocessing, and work with context windows that would exhaust any machine's RAM. Modern MacBook SSDs are fast enough that the performance hit is minimal.

**Integrated Coding Agent.** ds4 ships with `ds4-agent`, a coding agent that uses tool calling to interact with your filesystem, run commands, and edit code. It's alpha quality, but it works — and it runs entirely locally. For developers who've been paying $20-100/month for cloud-based coding assistants, this is a compelling alternative. The agent understands DeepSeek V4's thinking mode and can handle multi-file refactoring tasks.

**Metal and CUDA Backends.** The primary target is Metal on macOS, starting from MacBooks with 96GB of RAM. NVIDIA CUDA support is first-class, with specific optimizations for the DGX Spark (GB10). AMD ROCm is supported in a separate branch maintained by the community. The build is simple — `make` for Metal, `make cuda-spark` or `make cuda-generic` for NVIDIA.

**PRO Model Support.** For developers with 512GB Mac Studio class machines, ds4 supports DeepSeek V4 PRO as well. PRO is heavier and slower (9-10 tokens per second on M3 Ultra), but it's a stronger model — particularly for translation and tasks that push the edge of knowledge. Distributed PRO Q4 inference across multiple machines is also supported, added in late May 2026.

**Built-In Testing and Validation.** The project includes tools for GGUF generation, imatrix collection, quality testing against official continuations, and speed benchmarking. This isn't a "run it and hope" project — there's a correctness framework that validates the engine's output against DeepSeek's official implementation. Contributors are expected to read CONTRIBUTING.md and run regression tests before submitting PRs.

### Use Cases

- **Local coding assistant** — Run `ds4-agent` for privacy-first coding help that handles tool calling, multi-file editing, and long-context analysis without sending your code to any API.
- **Private document analysis** — Process confidential documents, contracts, or codebases locally with the 1-million-token context window. No data leaves your machine.
- **Offline AI development** — Work on AI-powered features for your web app without needing an internet connection or API keys. Test prompts, tool calling, and agent flows against a real model.
- **Cost reduction for heavy AI users** — If you're spending $200+/month on API calls for coding assistance, a 128GB MacBook running ds4 pays for itself in a few months.
- **Research and experimentation** — Study DeepSeek V4's MoE routing, quantization behavior, and thinking patterns with a purpose-built tool that gives you direct access to the model internals.

### Pros and Cons

Pros:
- antirez's engineering quality is exceptional. The codebase is small (~1k lines of core inference), well-documented, and actively maintained with 191 commits from the lead developer in under a month.
- The 2-bit quantization actually works. Coding agents running on the q2-imatrix variant produce reliable tool calls and coherent multi-step reasoning — this isn't just a demo.
- On-disk KV cache persistence is a genuine innovation that enables context windows impossible with RAM-only approaches.
- Zero API costs, zero data transmission, zero dependency on third-party uptime. Your coding assistant works on an airplane.

Cons:
- Hardware requirements are steep. You need at least 96GB of RAM for Flash, and 512GB for PRO. Most developers' machines don't qualify.
- The project is explicitly beta quality. antirez says it will take months to reach stability. Expect rough edges, especially around the coding agent.
- Single-model focus means you can't switch to Llama, Qwen, or other architectures. If DeepSeek V4 gets superseded quickly, the engine's relevance narrows.
- The coding agent (`ds4-agent`) is alpha quality and lacks the polish of Claude Code, Cursor, or other commercial tools.

### Getting Started

```bash
# Clone the repository
git clone https://github.com/antirez/ds4
cd ds4

# Download the model (q2-imatrix for 96/128GB machines)
./download_model.sh q2-imatrix

# Build for macOS Metal
make

# Run the CLI
./ds4

# Or start the coding agent
./ds4-agent

# Start the HTTP API server
./ds4-server
```

For NVIDIA CUDA:
```bash
# Build for DGX Spark
make cuda-spark

# Or build for other CUDA GPUs
make cuda-generic

# Run
./ds4
```

### Alternatives

**llama.cpp** — The original and most popular local inference engine. Supports hundreds of models across every hardware platform. Choose llama.cpp when you need model flexibility — if you want to run Llama 3, Qwen 2.5, Mistral, and DeepSeek all from one tool, llama.cpp is the right choice. ds4 beats it on DeepSeek V4 specifically, but doesn't support anything else.

**vLLM** — A high-throughput inference server focused on serving models to multiple users simultaneously. Choose vLLM when you're building a production API service that needs continuous batching, PagedAttention, and multi-GPU serving. ds4 is for personal local use, not production serving infrastructure.

**Ollama** — The friendliest way to run local models, with a one-command install and a library of pre-packaged models. Choose Ollama when you want the simplest possible setup and don't care about squeezing maximum performance out of DeepSeek V4. ds4 requires more technical investment but delivers better performance and more control.

### Verdict

DS4 is the most interesting local inference project I've seen since llama.cpp first landed. antirez brings a level of engineering rigor — model-specific optimization, asymmetric quantization, on-disk KV caching — that generic runners simply don't attempt. The 12,000-star velocity in a month reflects genuine developer demand for a tool that makes DeepSeek V4 feel finished on consumer hardware, not just runnable.

The catch is the hardware floor. If you don't have 96GB of RAM, this isn't for you today. But for developers who do have the hardware — particularly MacBook Pro M3/M4 Max or M5 Max owners — ds4 turns your laptop into a serious local AI workstation. The integrated coding agent is early but promising, and the HTTP API server means you can point your existing tools at it. If you're spending real money on AI APIs and care about privacy, this is worth the setup time. If antirez maintains the development pace (191 commits in a month suggests he will), ds4 could become the standard way to run DeepSeek models locally.
