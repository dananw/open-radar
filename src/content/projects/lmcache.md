---
name: lmcache
description: "LMCache is a KV cache management layer that slashes LLM inference latency by reusing computed attention states across requests, sessions, and GPU clusters."
url: https://github.com/LMCache/LMCache
stars: 8741
forks: 1298
language: Python
tags: ["llm", "inference", "kv-cache", "vllm", "pytorch"]
featured: false
publishedAt: 2026-06-13
---

## LMCache

### Overview

LMCache is a KV cache management layer for LLM inference that solves one of the most expensive problems in production AI: recomputing the same attention states over and over. It hit 8,700 GitHub stars and joined the PyTorch Foundation in October 2025, which signals real institutional backing — not just another side project with a clever README.

The project is built by a team that's been deep in the LLM infrastructure space. NVIDIA Dynamo integrated LMCache in September 2025, and CoreWeave partnered with them to optimize inference for Cohere's models. When the companies running your GPU clusters adopt a tool, that's a meaningful endorsement.

The core problem is straightforward: every time you send a prompt to an LLM, the model computes key-value pairs for every token in the context window. If you're running a chatbot with a system prompt, a RAG pipeline with repeated document prefixes, or a multi-turn conversation, you're burning GPU cycles recomputing identical KV states. LMCache intercepts those states, stores them in CPU memory, GPU memory, or across a distributed cluster, and reuses them on subsequent requests. The result is dramatically lower time-to-first-token (TTFT) and reduced GPU utilization.

### Why it matters

LLM inference costs dominate most AI product budgets. A single H100 GPU runs $2-4/hour on major cloud providers, and most teams are running clusters of them. If you can cut KV cache recomputation by 50-90% for repetitive workloads — which is exactly what LMCache claims — that's real money back.

The timing is also important. Multi-turn agentic workflows are becoming the norm, not the exception. Every time an AI agent calls a tool, processes the result, and continues the conversation, the full context gets reprocessed. LMCache's May 2026 benchmark on AMD MI300X specifically targets this pattern, showing significant speedups for multi-turn agentic workloads. As more developers build AI agents with frameworks like LangChain, CrewAI, or custom implementations, the underlying inference layer needs to handle repeated context efficiently.

LMCache also fills a gap that vLLM alone doesn't address. vLLM is the dominant open-source LLM serving engine, and LMCache layers on top of it as a drop-in acceleration component. You don't need to rewrite your serving infrastructure — just add LMCache and configure where the cache lives.

### Key Features

**Transparent KV Cache Reuse.** LMCache intercepts KV states from the attention layers and stores them externally. When a matching prefix appears in a subsequent request, the cached states are loaded directly instead of being recomputed. This works automatically with vLLM — no changes to your application code required. The system supports prefix matching, so even partial overlaps between prompts get optimized.

**Multi-Tier Storage Architecture.** Cache entries can live in GPU memory (fastest), local CPU memory, or remote storage. The system automatically manages eviction and promotion based on access patterns. You can configure it to spill to Redis, local disk, or a distributed LMCache server. This tiered approach means you're not limited by GPU memory when caching long contexts or large numbers of conversation histories.

**Multi-Node P2P Cache Sharing.** In production, you often run multiple vLLM instances behind a load balancer. Without LMCache, each instance maintains its own cache — if request 1 hits instance A and request 2 hits instance B, the cache is cold. LMCache's P2P architecture lets instances share cached KV states over the network. The January 2026 release made this production-ready, and it's the feature that matters most for real deployments.

**Multiprocess Architecture.** The April 2026 release introduced a new multiprocess architecture that separates the cache management from the inference process. This yields a 10x performance boost for Mixture-of-Experts (MoE) models, which are increasingly common in production (Mixtral, DeepSeek, etc.). The architecture also improves stability — cache management failures don't crash the inference process.

**vLLM Integration.** LMCache is designed as a layer on top of vLLM, the most popular open-source LLM serving engine. Integration is a configuration change, not a code change. You add LMCache config to your vLLM startup and the system handles the rest. This matters because most production LLM deployments already use vLLM, and switching serving engines is a high-friction operation.

**Broad Hardware Support.** LMCache works on NVIDIA CUDA, AMD ROCm, and supports both training and inference workloads. The May 2026 agentic workload benchmark was run on AMD MI300X, showing the team takes multi-platform support seriously. This matters for teams running heterogeneous GPU clusters or negotiating with multiple cloud providers.

**PyTorch Foundation Membership.** LMCache joined the PyTorch Foundation in October 2025, which means it's part of the official PyTorch ecosystem alongside projects like vLLM and TorchServe. This provides governance, long-term sustainability, and integration with the broader PyTorch toolchain.

### Use Cases

- **RAG pipelines** — When your retrieval system returns the same document chunks across multiple queries, LMCache caches the KV states for those chunks. Subsequent queries with overlapping context skip the recomputation entirely, cutting TTFT from seconds to milliseconds.

- **Multi-turn chatbots** — Every turn in a conversation recomputes the full context. LMCache preserves the KV states from previous turns, so only the new user message needs processing. This is especially valuable for customer support bots with long conversation histories.

- **AI agent workflows** — Agents that call tools, process results, and continue reasoning build up long contexts quickly. LMCache's agentic workload benchmarks show meaningful speedups for exactly this pattern, which is becoming the dominant LLM application architecture.

- **Multi-tenant serving** — If you're serving multiple customers from the same vLLM cluster, many customers share similar system prompts or document templates. LMCache's prefix matching deduplicates this shared context across requests from different tenants.

- **Cost optimization for high-traffic services** — Teams spending $10K+/month on GPU inference can use LMCache to reduce the number of GPUs needed for the same throughput. The cache hits translate directly to reduced GPU utilization.

### Pros and Cons

Pros:
- Drop-in integration with vLLM means low adoption friction — no code changes, just configuration. This is critical for production teams that can't afford to rewrite their serving layer.
- Multi-node P2P cache sharing solves the real-world problem of load-balanced inference clusters, not just single-instance optimization. Most competing solutions only work on a single GPU.
- PyTorch Foundation membership and NVIDIA Dynamo integration provide strong signals of long-term viability and industry backing.

Cons:
- Requires GPU infrastructure to see real benefits. If you're running a single model on a single GPU with short contexts, the overhead of managing a cache layer may not justify the gains. LMCache is an infrastructure tool for teams at scale.
- The documentation is technical and assumes familiarity with LLM serving concepts. Getting started requires understanding vLLM configuration, KV cache mechanics, and your specific workload patterns. Not beginner-friendly.
- Memory overhead for the cache itself can be significant. Caching long contexts (32K+ tokens) across many conversations requires substantial CPU memory or distributed storage. You're trading GPU compute for memory infrastructure.

### Getting Started

```bash
# Install LMCache
pip install lmcache

# Or install with vLLM integration
pip install lmcache[vllm]

# Run vLLM with LMCache enabled
vllm serve mistralai/Mistral-7B-Instruct-v0.2 \
    --lmcache-config-file lmcache-config.yaml
```

Create a basic `lmcache-config.yaml`:

```yaml
chunk_size: 256
local_device: "cpu"
remote_url: null
pipelne_parallel: false
```

For multi-node setups, configure the LMCache server:

```bash
# Start LMCache backend server
lmcache-server 0.0.0.0 65432

# Point your vLLM instances to the shared cache
# In lmcache-config.yaml:
# remote_url: "lm://<server-ip>:65432"
```

Verify it's working by running the same prompt twice and checking the TTFT improvement:

```python
from openai import OpenAI
client = OpenAI(base_url="http://localhost:8000/v1", api_key="dummy")

# First request — cold cache, normal latency
response1 = client.chat.completions.create(
    model="mistralai/Mistral-7B-Instruct-v0.2",
    messages=[{"role": "user", "content": "Explain quantum computing in detail..."}]
)

# Second request — warm cache, dramatically faster TTFT
response2 = client.chat.completions.create(
    model="mistralai/Mistral-7B-Instruct-v0.2",
    messages=[{"role": "user", "content": "Explain quantum computing in detail..."}]
)
```

### Alternatives

**vLLM's built-in prefix caching** — vLLM has its own prefix caching feature that reuses KV states for matching prompt prefixes within a single instance. It's simpler to configure and doesn't require an additional component. Choose it when you have a single-instance deployment with short-lived cache needs. LMCache is better when you need cross-instance sharing, persistent caching, or tiered storage.

**SGLang** — Another high-performance LLM serving engine with its own RadixAttention-based caching system. SGLang's caching is tightly integrated with its runtime and works well for structured generation workloads. Choose SGLang when you're starting fresh and want a serving engine with built-in caching. Choose LMCache when you're already on vLLM and want to add caching without migrating.

**NVIDIA Dynamo** — NVIDIA's own distributed inference framework, which actually integrates LMCache as a component. Dynamo is a more comprehensive orchestration layer that handles model parallelism, routing, and caching. Choose Dynamo when you need full-stack inference orchestration. Choose LMCache when you want targeted KV cache optimization on your existing vLLM deployment.

### Verdict

LMCache is the most practical KV cache optimization tool I've seen for production vLLM deployments. The multi-node P2P sharing is the killer feature — it solves the real problem that most teams face when running load-balanced inference clusters. The PyTorch Foundation membership and NVIDIA integration give it staying power that most open-source ML infrastructure tools lack. If you're running vLLM in production with multi-turn workloads, RAG pipelines, or agentic systems, and you're spending meaningful money on GPUs, LMCache is worth benchmarking against your current setup. The overhead is minimal, the integration is clean, and the potential cost savings are substantial. For teams just getting started with LLM serving, focus on getting vLLM working first — LMCache is an optimization layer, not a prerequisite.
