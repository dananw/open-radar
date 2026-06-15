---
name: forkd
description: "Fork() for AI agent microVMs — spawn 100 KVM-isolated sandboxes in 101ms from a warm parent snapshot using Firecracker and copy-on-write."
url: https://github.com/deeplethe/forkd
stars: 2418
forks: 190
language: Rust
tags: ["ai-agents", "microvm", "sandbox", "rust", "kvm", "infrastructure"]
featured: false
publishedAt: 2026-06-16
---

## forkd

### Overview

forkd is a microVM sandbox runtime built for AI agent fan-out. It lets you spawn 100 KVM-isolated Firecracker microVMs in 101 milliseconds from a warmed parent snapshot. That number sounds wrong until you understand the trick: the parent VM boots once, loads your entire runtime (Python + dependencies, JIT-warmed JVM, whatever), then pauses to disk. Each child `mmap`s that memory image with `MAP_PRIVATE`, and the Linux kernel implements copy-on-write at the page level. Children share the parent's resident memory until they write to it. You get per-child hardware isolation at a cost closer to `fork(2)` than to a cold-boot VM.

The project comes from deeplethe, a team focused on infrastructure for AI agent workloads. They built forkd on top of Firecracker, the same virtualization technology that powers AWS Lambda. The core insight is that AI agents increasingly need to fan out — spawning dozens or hundreds of short-lived sandboxes for code execution, tool use, evaluation rollouts, and parallel reasoning. Existing container runtimes like Docker (335 seconds for 100 sandboxes) and even gVisor (288 seconds) are far too slow for this pattern. Forkd collapses that to 101ms.

Beyond the raw spawn speed, forkd introduced BRANCH in v0.3: pause a *running* sandbox, snapshot its in-flight state, and resume the copy in ~150ms. By v0.4, live BRANCH brought the pause window down to 56ms p50 on a 1.5 GiB source. This means an agent can fork mid-thought — not just at warm-up. A thinking agent can be branched into multiple children, each receiving different steering hints while inheriting the same prior reasoning state and filesystem.

### Why it matters

The AI agent infrastructure space is heating up fast, and sandbox isolation is becoming the critical bottleneck. Every coding agent, every tool-using LLM, every evaluation pipeline needs to run untrusted code somewhere. Docker containers offer weak isolation (shared kernel). Full VMs are too slow to spin up on demand. gVisor trades performance for security in ways that break many real workloads. Forkd sits in a sweet spot that nobody else has claimed: hardware-level KVM isolation with spawn latencies that work for request-path fan-out.

The benchmarks are hard to argue with. On the same host, Docker manages 335 seconds for 100 sandboxes. CubeSandbox (Tencent's RustVMM-based offering) does 1.06 seconds on its fast path. Forkd does 101ms. That's a 3,300x improvement over Docker and a 10x improvement over the next-fastest microVM runtime. Memory efficiency is equally striking: 0.12 MiB delta per sandbox versus 5 MiB for CubeSandbox and 84 MiB for raw Firecracker cold-boot.

The timing connects to a real shift in how agents are being built. LangGraph, CrewAI, and similar frameworks increasingly use fan-out patterns — spawning parallel agents to explore different solution paths, run evaluations, or execute tools concurrently. When each branch needs its own isolated filesystem and network namespace, the spawn cost becomes the bottleneck. Forkd eliminates that bottleneck entirely.

### Key Features

**Snapshot CoW Forking.** The parent VM boots once and is paused to disk with its full memory state. Children `mmap` that image with `MAP_PRIVATE`, and the kernel handles copy-on-write at the page level. This means a 1.5 GiB Python runtime with numpy, pandas, and scikit-learn loaded costs essentially zero per child until they diverge. The 0.12 MiB per-sandbox memory delta comes from the Firecracker process overhead, not from duplicating the parent's address space.

**Live BRANCH.** Pause a running sandbox, snapshot its in-flight state, and resume — all in 56ms p50 (v0.4 live mode). This is the feature that makes forkd genuinely novel. An agent can be branched mid-reasoning, with each child inheriting the exact state of the parent's thought process. The v0.4 live mode collapses the source-pause window from ~200ms to 56ms by running the memory copy asynchronously after resume. With `wait: false`, the caller returns in ~10ms while the background copy completes — a 200x improvement for fire-and-forget BRANCH from agent code.

**Diff-Snapshot Chains (v0.5).** Instead of creating full copies for each layer of your runtime, forkd stacks diff snapshots into chains. Install numpy into a base Python image, then pandas on top, then scikit-learn — each layer records only the delta. The daemon walks the chain at spawn time and assembles the memory image in one pass. This means you can build complex, layered runtimes without paying the storage cost of duplicating the base for every combination.

**Hardware KVM Isolation.** Each child is its own Firecracker microVM backed by KVM. Escape requires a hypervisor or kernel vulnerability, not a container runtime regression. Per-child network namespaces, per-child cgroup v2 memory limits, and independent `/dev/urandom` re-seeded by `vmgenid`. This is the same isolation model that AWS bet on for Lambda and Fargate.

**Full Linux Per Child.** Unlike function-level snapshot runtimes that trade single-vCPU and serial I/O for raw spawn speed, forkd children get multi-vCPU, full TCP networking, `apt install`, and outbound HTTPS. You can run real Python servers, model inference, or any workload that needs a complete kernel. This matters for agents that need to start local development servers, make network requests, or install packages at runtime.

**REST API and SDKs.** Forkd exposes a REST API on Unix socket or TCP, with Python and TypeScript SDKs. There's a CLI for direct management, Prometheus `/metrics` for observability, an append-only JSON audit log, and a systemd unit for production deployment. The MCP server integration means AI tools can interact with sandboxes directly.

### Use Cases

- **AI coding agents** that need to execute untrusted code in isolated environments. Each code execution spawns a fresh microVM that inherits the warmed Python runtime, runs the code, and returns results — all in under 200ms.
- **Parallel agent reasoning** where a single agent fans out into multiple branches to explore different solution paths. Each branch gets its own isolated filesystem and network namespace while sharing the parent's reasoning state.
- **Evaluation pipelines** that need to run hundreds of test cases in parallel, each in a clean sandbox. The 101ms spawn time for 100 sandboxes makes per-test-case isolation economically viable.
- **Multi-tenant agent platforms** where different users' agents need strict isolation. KVM-level boundaries ensure one tenant's agent can't access another's filesystem or network.
- **Development environment provisioning** where you need to spin up isolated environments quickly for CI/CD, preview deployments, or sandboxed testing. The snapshot chain feature lets you pre-bake complex environments.

### Pros and Cons

Pros:

- Benchmarks are extraordinary and independently reproducible — 101ms for 100 sandboxes versus 335 seconds for Docker on the same hardware. The team provides full reproduction scripts and methodology.
- Live BRANCH is genuinely novel infrastructure. No other runtime lets you snapshot a running VM's in-flight state in 56ms and resume it as a new child. This enables agent patterns that weren't previously possible.
- Apache 2.0 license with no vendor SDK lock-in. The Firecracker foundation is battle-tested at AWS scale, and the forkd layer on top is cleanly separated.
- Active development with rapid iteration — v0.3 to v0.5 shipped within weeks, each with measurable performance improvements and detailed design docs.

Cons:

- Linux-only and requires KVM support. This means bare-metal servers or nested virtualization — no running on standard cloud VMs without KVM passthrough. macOS and Windows developers need a Linux VM or remote server.
- The Firecracker fork dependency adds operational complexity. You need the specific deeplethe/firecracker branch, not upstream Firecracker. The `forkd doctor` command helps verify setup, but the initial configuration is non-trivial.
- Diff-snapshot chains add latency at spawn time — the per-link tax ranges from 446ms to 692ms depending on layer size. For deep chains, this can offset the base spawn advantage. The compact command helps but requires manual management.

### Getting Started

```bash
# Install forkd (requires Linux >= 5.7 with KVM support)
pip install forkd

# Check system prerequisites
forkd doctor

# Start the forkd daemon
sudo forkd serve

# Spawn 10 sandboxes from the default Python image
forkd fork --tag py-base -n 10

# Run code in a sandbox
forkd eval <sandbox-id> "import sys; print(sys.version)"

# Create a snapshot with custom dependencies
forkd snapshot --tag py-data --exec "pip install numpy pandas"

# Spawn from the custom snapshot
forkd fork --tag py-data -n 5

# Python SDK usage
from forkd import Controller

c = Controller()
sandboxes = c.spawn_sandboxes("py-data", n=5)
result = c.eval_sandbox(sandboxes[0]["id"], "import numpy; numpy.__version__")

# Live BRANCH a running sandbox
parent = c.spawn_sandboxes("pyagent", n=1, live_fork=True)[0]
branch = c.branch_sandbox(parent["id"], mode="live", wait=False)
```

### Alternatives

**CubeSandbox (Tencent Cloud)** — A RustVMM-based microVM runtime with a focus on cold-boot speed. CubeSandbox achieves <60ms single-instance startup on large hosts and has a mature pooling system. It's a better fit when you need long-lived, stateful sandboxes rather than rapid fan-out. Choose CubeSandbox when your workload is one sandbox per user session, not 100 sandboxes per agent decision.

**Docker / runc** — The default choice for most teams, Docker containers offer the broadest ecosystem and simplest operational model. But shared-kernel isolation is a real security concern for untrusted code execution, and 335 seconds for 100 containers makes per-request fan-out impractical. Choose Docker when isolation requirements are low and spawn frequency is modest.

**Firecracker (raw)** — You can use Firecracker directly for microVM isolation without forkd's snapshot-and-fork layer. Raw Firecracker cold-boots in ~759ms and uses 84 MiB per VM. This is fine for long-running workloads where startup time doesn't matter. Choose raw Firecracker when you don't need the fan-out pattern and want to avoid the forkd dependency.

### Verdict

forkd is the most interesting piece of infrastructure I've seen for the AI agent sandbox problem. The core premise — use your parent VM's memory as a CoW template and let the kernel do the heavy lifting — is elegant, and the benchmarks back it up with real numbers on real hardware. 101ms for 100 KVM-isolated sandboxes isn't just fast; it's a qualitative shift in what's possible. Agent frameworks can now treat sandbox creation as a near-zero-cost operation, which opens up patterns like per-tool-call isolation and real-time branching that were previously impractical.

The project is early — v0.5 shipped the diff-snapshot chain feature, and there are rough edges around the Firecracker fork dependency and Linux-only constraints. But the design is sound, the code is well-documented with detailed design docs and reproducible benchmarks, and the Apache 2.0 license means no vendor strings attached. If you're building AI agents that execute code, run tools, or need to fan out into parallel reasoning paths, forkd deserves serious evaluation. It turns sandbox isolation from a bottleneck into a non-event.
