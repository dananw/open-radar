---
name: forkd
description: "Forkd is a microVM sandbox runtime that spawns 100 KVM-isolated AI agent sandboxes in 101ms using Firecracker snapshot copy-on-write — the fastest open-source agent fan-out primitive available."
url: https://github.com/deeplethe/forkd
stars: 1258
forks: 90
language: Rust
tags: ["ai-agents", "sandbox", "microvm", "rust", "firecracker", "kvm"]
featured: false
publishedAt: 2026-06-03
---

## Forkd

### Overview

Forkd is a microVM sandbox runtime for AI agent fan-out, built on Firecracker. It spawns 100 KVM-isolated children in 101 milliseconds from a warmed parent snapshot, with each child inheriting the parent's address space via kernel-level copy-on-write. That number isn't a typo — 101 ms for 100 separate virtual machines, each with its own kernel, network namespace, and cgroup memory limit.

The project comes from deeplethe, a small team focused on AI infrastructure primitives. They released forkd in mid-May 2026 and it crossed 1,200 GitHub stars within three weeks. The benchmark data is unusually thorough for a project this young — every comparison table cites the exact host hardware, kernel version, and measurement methodology. The lead maintainer even filed PRs against competing projects (CubeSandbox) to fix measurement inconsistencies, which tells you something about the engineering rigor here.

The core problem forkd solves is the cold-start tax on AI agent sandboxes. When you're running code interpreters, evaluation harnesses, or per-user code execution, every new sandbox traditionally means a fresh container or VM boot. If your agent needs numpy, torch, and a JIT-warmed Python runtime, that cold boot takes seconds. Forkd sidesteps this entirely: boot the parent once, warm it up, snapshot it, and every child forks from that warmed state in roughly 1 ms of spawn overhead. The 100 ms wall-clock at N=100 comes from I/O contention on restoring 100 snapshots simultaneously, not from per-child cost.

### Why it matters

The AI agent ecosystem is hitting an inflection point where fan-out is the default architecture. Code interpreters spawn sandboxed kernels per conversation turn. Evaluation frameworks like SWE-bench run hundreds of repository checkouts in parallel. Multi-agent systems branch mid-reasoning to explore different solution paths. Every one of these patterns needs fast, isolated sandbox creation — and the existing options are either slow (Docker at 335 seconds for 100 containers, gVisor at 289 seconds) or proprietary (Modal's snapshot fork isn't open source).

Forkd occupies a unique position: it's the only open-source project that combines KVM-level hardware isolation with sub-second fan-out at scale. E2B uses Firecracker but doesn't expose fork-from-warm in its open-source code. CubeSandbox achieves faster cold-starts (<60 ms advertised for single instances) but doesn't support fork-from-warm yet. Daytona targets long-lived workspaces, not short-lived fan-out. The comparison table in forkd's README is the most honest sandbox benchmark I've seen — it includes caveats, retracted measurements, and explicit notes about what each project was actually designed for.

For fullstack developers building AI-powered features — chatbots with code execution, agent-driven testing, automated code review — forkd represents the infrastructure layer that makes these patterns economically viable at scale. A single 8 GiB pod can idle-pool 50 agents sharing one warmed parent, with 0.12 MiB of copy-on-write overhead per child.

### Key Features

**Snapshot Copy-on-Write Forking.** The parent VM boots once, imports your runtime (Python + dependencies, JIT-warmed JVM, pre-loaded ML model), and is paused to disk. Each child is a separate Firecracker process that `mmap`s the parent's memory image with `MAP_PRIVATE`. The kernel implements copy-on-write at the page level, so children share the parent's resident memory until they diverge. This is the same primitive as `fork(2)` in Unix, but applied to entire virtual machines.

**Live BRANCH Mode.** Version 0.4 introduced the ability to pause a running sandbox, snapshot its in-flight state, and resume — all in 56 ms p50 / 64 ms p90 on a 1.5 GiB source. This means an agent can fork mid-thought, not only at warm-up. A LangGraph ReAct loop can be BRANCHed while it's reasoning, with three grandchildren each receiving different steering hints while inheriting the same prior reasoning state. The pause window is disk-independent (memory copy runs after resume), so it's 3.6× faster than the v0.3 Diff approach.

**KVM Hardware Isolation.** Each child is its own Firecracker microVM backed by KVM. Escape requires a hypervisor or kernel vulnerability, not a `runc` regression. Per-child network namespaces, per-child cgroup v2 memory limits, and independent `/dev/urandom` re-seeded by `vmgenid`. This is real VM isolation, not container namespace tricks.

**E2B-Compatible Python SDK.** The Python SDK provides a drop-in replacement for `from e2b import Sandbox` — just change the import to `from forkd import Sandbox`. Your existing code-interpreter integrations work without modification. There's also a TypeScript SDK (`npm install @deeplethe/forkd`) and an MCP server (`pip install forkd-mcp`) for Claude Desktop, Claude Code, Cursor, and Cline integration.

**REST API with Prometheus Metrics.** The daemon exposes a REST API on Unix socket or TCP with bearer-token auth. `POST /v1/sandboxes n=100` spawns 100 children in one call. The `/metrics` endpoint exposes Prometheus-compatible stats, and there's an append-only JSON audit log for production observability. A systemd unit ships for deployment.

**Docker Image to Snapshot Pipeline.** `forkd from-image python:3.12-slim --tag py-numpy --extra python3-numpy` wraps Docker pull, ext4 conversion, boot, warmup, pause, and tag registration into a single command. First run takes 2-3 minutes; subsequent forks from the cached snapshot are milliseconds. A Hub registry (`forkd pull deeplethe/langgraph-react`) provides pre-built snapshot packs.

**Kubernetes-Native Deployment.** One forkd-controller Pod hosts N sandbox children. The K8s scheduler runs once at Pod creation regardless of fan-out, versus one Pod-per-sandbox in Kata or Firecracker-on-K8s designs. Starter manifests ship at `packaging/k8s/`. Requires nodes with `/dev/kvm` and cgroup v2.

### Use Cases

- **AI code interpreters** — Each conversation turn or tool call spawns a fresh kernel. The warmed parent carries SciPy, torch, and your ML runtime, so per-request `import numpy` collapses to zero. This is the workload shape Anthropic, OpenAI, and Modal code-interpreter products are all on.

- **SWE-bench-style evaluation harnesses** — Hundreds of repository checkouts or test rollouts in parallel without paying Docker cold-start per task. Each child runs `pytest` inside a real Linux VM, isolated by KVM.

- **Multi-agent branching and fan-out** — A LangGraph ReAct loop gets BRANCHed mid-thought, with three grandchildren each receiving different steering hints. The source agent's reasoning state travels with each branch unchanged, but divergent LLM calls produce different solutions.

- **Per-user code execution at scale** — Many short-lived sandboxes sharing one warmed parent, each child KVM-isolated per user. A single 8 GiB pod can idle-pool 50 agents.

- **Untrusted CI pipelines** — `git clone`, `pip install`, `pytest` inside a real Linux VM, not a container namespace. Hardware isolation means a compromised test can't escape to the host.

- **Self-hosted alternative to managed sandbox SaaS** — One Linux box with KVM, single-binary daemon, Apache 2.0 license. No per-second cloud fees, no vendor lock-in.

### Pros and Cons

Pros:

- Benchmarks are exceptionally thorough and honest — every comparison includes exact hardware, kernel version, and measurement methodology. The maintainer filed PRs against competing projects to fix measurement inconsistencies.
- The E2B-compatible Python SDK means existing code-interpreter integrations work with a one-line import change. No rewrite required.
- KVM isolation is real hardware-level security, not container namespace tricks. Per-child network namespaces and cgroup memory limits make multi-tenant deployment safe.
- Apache 2.0 license with no vendor SDK restrictions. REST API, Python SDK, TypeScript SDK, and MCP server cover the major integration paths.
- The BRANCH primitive is genuinely novel — pausing a running VM, snapshotting its state, and resuming in 56 ms enables agent architectures that weren't possible before.

Cons:

- Linux-only with KVM requirement. No macOS support (BoxLite covers that with Hypervisor.framework), no Windows. You need bare-metal or nested virtualization on cloud instances.
- Firecracker dependency means x86_64 only. ARM64 support would require significant work given the KVM and Firecracker constraints.
- The 100 ms fan-out number is for spawning children from a pre-existing snapshot. Building the initial snapshot from a Docker image takes 2-3 minutes the first time, though it's cached after that.
- Documentation is thorough but assumes Linux systems knowledge. The `forkd doctor` command helps diagnose issues, but the setup process (KVM, tap devices, network namespaces) isn't beginner-friendly.

### Getting Started

```bash
# Install CLI + daemon binaries (pre-built tarball, no Rust toolchain needed)
curl -sSL https://github.com/deeplethe/forkd/releases/download/v0.3.4/forkd-v0.3.4-x86_64-linux.tar.gz \
  | sudo tar -xz -C /usr/local/bin/

# Host bring-up (one-time)
sudo bash scripts/setup-host.sh           # KVM + tap device
sudo bash scripts/netns-setup.sh 3        # per-child network namespaces

# Sanity-check
forkd doctor                              # 16 checks, green-lights everything

# Install Python SDK
pip install forkd

# Pull a pre-built snapshot and fork 3 children
forkd pull deeplethe/langgraph-react
sudo -E forkd fork --tag langgraph -n 3 --per-child-netns
```

Python SDK usage:

```python
from forkd import Sandbox   # drop-in for `from e2b import Sandbox`

with Sandbox() as sb:
    print(sb.commands.run("uname -a").stdout)
    print(sb.eval("numpy.zeros(5).tolist()"))    # reuses warmed PID 1
```

Controller daemon for lifecycle management:

```python
from forkd import Controller

c = Controller()
parent = c.spawn_sandboxes("pyagent", n=1, live_fork=True)[0]
# ... drive parent ... then BRANCH live + fire-and-forget
branch = c.branch_sandbox(parent["id"], mode="live", wait=False)
```

### Alternatives

**E2B** — The most popular managed sandbox service for AI code interpreters. E2B uses Firecracker internally but doesn't expose fork-from-warm in its open-source code. Better choice if you want a fully managed service with billing, monitoring, and a web dashboard, and you're willing to pay per-second cloud fees. Forkd is the better fit if you need self-hosted control or want to avoid vendor lock-in.

**CubeSandbox** — Tencent's RustVMM-based microVM project with faster pure cold-start times (<60 ms advertised for single instances on high-core-count hosts). CubeSandbox is designed for cold-boot scenarios where you don't have a pre-warmed parent. Forkd's fork-from-warm approach wins when you have a heavy runtime (Python + ML libraries) that you want to amortize across many children. CubeSandbox's fork-from-warm support is listed as "coming soon."

**Daytona** — An OCI-based workspace runtime where each user owns one long-lived sandbox. Daytona is designed for developer environments, not short-lived fan-out. If your use case is "give each developer a persistent cloud workspace," Daytona is the right choice. If your use case is "spawn 100 sandboxes for a parallel evaluation run," forkd is purpose-built for that pattern.

### Verdict

Forkd is the most technically impressive sandbox runtime I've seen released as open source. The 101 ms figure for 100 KVM-isolated children isn't marketing — it's reproducible on commodity hardware with a 14.5 MiB snapshot pack. The BRANCH primitive (pause a running VM, snapshot its state, resume in 56 ms) enables agent architectures that simply weren't practical before: branching mid-reasoning, forking code-interpreter sessions, running parallel evaluations without cold-start penalties. The engineering quality stands out — the comparison tables are honest, the benchmarks include caveats and retracted measurements, and the maintainer filed PRs against competing projects to fix inconsistencies. The main limitation is the Linux + KVM + x86_64 requirement, which rules out macOS development and ARM64 deployment. If you're building AI agent infrastructure and you have Linux boxes with KVM, forkd should be your first evaluation. The Apache 2.0 license, E2B-compatible SDK, and MCP server mean the integration cost is near zero.
