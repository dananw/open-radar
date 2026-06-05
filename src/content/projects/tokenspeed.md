---
name: tokenspeed
description: "TokenSpeed is an open-source LLM inference engine built for agentic workloads — 580 tokens/sec on Qwen3.5-397B with TensorRT-LLM performance and vLLM-level ease of use."
url: https://github.com/lightseekorg/tokenspeed
stars: 1369
forks: 142
language: Python
tags: ["llm", "inference", "ai-agents", "gpu", "python"]
featured: false
publishedAt: 2026-06-06
---

## TokenSpeed

### Overview

TokenSpeed is an open-source LLM inference engine that claims the fastest inference speeds for agentic workloads. It hit 580 tokens per second on Qwen3.5-397B-A17B, a number that got the PyTorch team to feature it on their official blog. In under a month since its May 6 launch, the repo pulled 1,369 stars and 142 forks — fast growth for what is essentially infrastructure software.

The project comes from LightSeek, an organization focused on high-performance AI tooling. The lead contributor, zhyncs, has 80 commits in the first month alone, with daily activity through early June. The codebase is primarily Python with significant C++ in the scheduler and kernel layers. It's MIT-licensed, which matters for anyone building commercial products on top of it.

The core problem TokenSpeed solves is latency in agent loops. When you're running an AI agent that makes dozens of LLM calls per task — tool use, planning, reflection, code generation — each call's latency compounds. Traditional inference engines optimize for throughput on long sequences (chat, summarization). Agents generate short bursts, many times in parallel. TokenSpeed's scheduler and kernel design specifically targets this pattern, achieving what they call "speed-of-light" performance on NVIDIA Blackwell hardware.

### Why it matters

The inference engine space has been dominated by two camps: TensorRT-LLM (fast but painful to use) and vLLM (easy but leaving performance on the table). TokenSpeed positions itself as the middle ground — TRT-LLM-level speed with vLLM-level developer experience. That's a bold claim, but the PyTorch blog feature and the benchmark numbers suggest they're delivering on it.

For fullstack developers building AI-powered features, the inference layer is becoming a bottleneck you can't ignore. If your React app sends requests to an AI agent backend running NestJS or Django, and that agent makes 10-20 LLM calls per user interaction, shaving 30-50% off each call's latency directly impacts user experience. TokenSpeed's focus on agentic workloads — short sequences, high parallelism, KV cache reuse — maps exactly to this pattern.

The timing is also relevant. NVIDIA's Blackwell GPUs are shipping, and most inference engines haven't optimized for them yet. TokenSpeed has Blackwell-specific kernels (including one of the fastest MLA implementations available), which gives it a concrete advantage on the latest hardware. If you're evaluating inference engines for a new deployment in mid-2026, this needs to be on your shortlist.

### Key Features

**Agentic Workload Scheduler.** The scheduler is a C++ control plane paired with a Python execution plane. It encodes request lifecycle, KV cache ownership, and overlap timing as a finite-state machine, with safe KV resource reuse enforced by the type system at compile time. This is the piece that makes agent loops fast — it eliminates the overhead of repeated setup and teardown that plagues general-purpose engines.

**Static SPMD Compiler.** Instead of asking users to hand-write parallelism logic, TokenSpeed uses a local-SPMD design with a static compiler that generates collective communication from module-boundary placement annotations. You describe where tensors should live; the compiler figures out the communication pattern. This cuts the setup time for distributed inference dramatically.

**Pluggable Kernel System.** The kernel layer has a portable public API and a centralized registry. It includes one of the fastest MLA (Multi-head Latent Attention) implementations on Blackwell hardware, specifically tuned for the short-sequence patterns that agentic workloads produce. The pluggable design means you can swap kernels without touching the rest of the stack.

**Model Coverage.** TokenSpeed supports Qwen 3.5, Kimi K2.5, DeepSeek models, MiniMax, and Nemotron out of the box, with Qwen 3.6, DeepSeek V4, and MiniMax M2.7 on the roadmap. Model recipes are documented and versioned, so you're not guessing at configuration.

**OpenAI-Compatible API.** The entrypoint is an SMG-integrated AsyncLLM that exposes an OpenAI-compatible endpoint. If your backend already talks to OpenAI's API, switching to TokenSpeed is a URL change. No SDK swaps, no protocol changes.

**Blackwell and Hopper Optimization.** The project has dedicated kernel paths for NVIDIA Blackwell (B200) and is working on Hopper optimization. The MLA kernel on B200 is the standout — it's what drives the 580 TPS benchmark on Qwen3.5-397B.

### Use Cases

- **AI agent backends** — If you're running an agent that makes 10-30 LLM calls per user task (code generation, research, tool use), TokenSpeed's agentic scheduler cuts per-call latency significantly compared to vLLM or vanilla TRT-LLM.

- **High-throughput API services** — Teams running OpenAI-compatible API endpoints for internal or customer-facing applications can swap in TokenSpeed for better throughput on the same hardware.

- **Research and benchmarking** — The model recipe system and documented configurations make it straightforward to benchmark different models on the same hardware, useful for teams evaluating which model to deploy.

- **Multi-model serving** — The KV cache management and scheduler design supports running multiple models behind a single endpoint, which simplifies infrastructure for teams that need different models for different tasks.

- **Edge and on-premise deployments** — For teams running inference on their own GPU clusters rather than using cloud APIs, TokenSpeed's performance-per-watt on Blackwell is a concrete advantage.

### Pros and Cons

Pros:
- Genuine performance leadership on agentic workloads — the 580 TPS number on Qwen3.5-397B-A17B is backed by a PyTorch blog post, not just self-reported benchmarks.
- MIT license with active daily development (80+ commits from the lead maintainer in the first month, commits continuing daily through June 2026).
- OpenAI-compatible API means minimal integration work if you're already using LLM APIs in your stack.
- Blackwell-specific kernels give it a head start on hardware that most competitors haven't optimized for yet.

Cons:
- Preview status — the README explicitly says "do not use this preview release for production deployments." Breaking changes are expected as features land.
- Requires NVIDIA GPUs with specific compute capabilities. No AMD, Intel, or CPU fallback yet (MI350 optimization is on the roadmap but not shipped).
- Documentation is sparse compared to vLLM. The docs site exists but coverage is thin — you'll be reading source code for advanced configurations.
- Model coverage is limited compared to vLLM's extensive model library. If you need a niche model, you may need to wait or contribute support yourself.

### Getting Started

```bash
# Clone the repository
git clone https://github.com/lightseekorg/tokenspeed.git
cd tokenspeed

# Install (requires Python 3.10+, CUDA toolkit, and an NVIDIA GPU)
pip install -e .

# Launch a server with a supported model
tokenspeed serve Qwen/Qwen3.5-397B-A17B

# Query the OpenAI-compatible endpoint
curl http://localhost:8000/v1/chat/completions \
  -H "Content-Type: application/json" \
  -d '{
    "model": "Qwen3.5-397B-A17B",
    "messages": [{"role": "user", "content": "Hello!"}],
    "max_tokens": 100
  }'
```

Check the model recipes and configuration docs at https://lightseek.org/tokenspeed/ for advanced setups including multi-GPU parallelism and custom kernel configurations.

### Alternatives

**vLLM** — The most popular open-source inference engine with the largest model library and community. vLLM is easier to set up and has broader hardware support, but TokenSpeed outperforms it on agentic workloads (short sequences, high parallelism). Choose vLLM if you need production stability today or run on non-NVIDIA hardware.

**TensorRT-LLM** — NVIDIA's official inference engine with the deepest hardware integration. TRT-LLM can match TokenSpeed's performance in some configurations but requires significantly more setup and tuning. Choose TRT-LLM if you're already in the NVIDIA ecosystem and need the broadest model support, or if you need production-grade stability.

**SGLang** — A newer inference engine focused on structured generation and programmatic control of LLM outputs. SGLang has its own scheduler optimizations and is gaining traction. Choose SGLang if your workload involves structured output (JSON, code) rather than free-form agent conversations.

### Verdict

TokenSpeed is the most performant inference engine for agentic workloads available right now, and the PyTorch blog feature validates that claim with independent benchmarking. The 580 TPS number on Qwen3.5-397B is not marketing fluff — it's a real result on real hardware. For fullstack developers building AI agent backends, the performance gap between TokenSpeed and vLLM on short-sequence workloads is meaningful enough to evaluate seriously. The MIT license and OpenAI-compatible API lower the adoption barrier. The main risk is maturity — this is preview software with active breaking changes, sparse documentation, and limited model coverage. Don't ship it to production today. But if you're building an inference stack in mid-2026 and you have Blackwell GPUs, TokenSpeed should be on your benchmark shortlist. The development velocity (daily commits, rapid model additions) suggests it'll be production-ready sooner than later.
