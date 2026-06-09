---
name: cubesandbox
description: "CubeSandbox is a high-performance, hardware-isolated sandbox for AI agents — sub-60ms cold starts, under 5MB memory overhead, and E2B SDK compatibility."
url: https://github.com/TencentCloud/CubeSandbox
stars: 6249
forks: 496
language: Rust
tags: ["ai-agents", "sandbox", "rust", "security", "e2b-alternative"]
featured: false
publishedAt: 2026-06-09
---

## CubeSandbox

### Overview

CubeSandbox is an open-source sandbox service for AI agents, built by Tencent Cloud on top of RustVMM and KVM. It launched in April 2026 and crossed 6,000 GitHub stars within two months — a pace that reflects how badly the AI agent ecosystem needs a better execution environment. The project is listed in the CNCF Landscape under AI Native Infrastructure, which gives it a level of institutional credibility that most new repos don't have.

The team behind it comes from Tencent Cloud's infrastructure division. That matters because Tencent runs one of the largest agent deployment fleets in the world — their internal tooling has been battle-tested at a scale most open-source projects never reach. CubeSandbox is the externalized version of what they built for themselves.

The core problem CubeSandbox solves is deceptively simple: when you let an AI agent execute code, where does it run? Docker containers share a kernel, which means a misbehaving or malicious agent can potentially escape. Traditional VMs are secure but slow — cold starts measured in seconds, memory overhead in the hundreds of megabytes. CubeSandbox lands in the middle: hardware-level isolation with dedicated guest kernels, but cold starts under 60 milliseconds and per-instance memory overhead below 5MB. You can run thousands of sandboxed agents on a single machine.

### Why it matters

The AI agent space is exploding, but the infrastructure layer hasn't kept up. Most agent frameworks today either run code in Docker containers (fast but insecure) or spin up full VMs (secure but expensive and slow). E2B built a commercial solution, but it's closed-source and priced per-sandbox-minute — costs scale linearly with agent usage, which makes it prohibitively expensive for high-throughput agent workloads.

CubeSandbox is E2B-compatible at the SDK level. That means any agent framework already using E2B's Python or JS SDK can switch to CubeSandbox by changing a single environment variable. No business logic changes. No API rewrites. This is the kind of pragmatic compatibility decision that drives adoption — you're not asking developers to bet on a new protocol, you're offering a free, faster, self-hosted alternative to something they're already paying for.

For fullstack developers building AI-powered features — code assistants, automated testing agents, data processing pipelines — CubeSandbox provides the missing execution layer. You can safely let your agent run arbitrary Python, Node.js, or shell commands without worrying about what it might do to your host system. That's not a nice-to-have; it's a requirement for any production agent deployment.

### Key Features

**Sub-60ms Cold Starts.** CubeSandbox uses resource pool pre-provisioning and snapshot cloning to skip traditional boot sequences entirely. The benchmark numbers are real: 60ms at single concurrency, 67ms average under 50 concurrent creations, P95 at 90ms. This is fast enough that users won't perceive a delay when an agent needs a fresh sandbox.

**Hardware-Level Isolation with Dedicated Kernels.** Unlike Docker, which relies on shared-kernel namespaces (and has a long history of container escape CVEs), each CubeSandbox instance runs its own guest OS kernel. An agent executing arbitrary code inside a sandbox has zero ability to affect the host or other sandboxes. This is the same isolation model as a traditional VM, without the performance penalty.

**Under 5MB Memory Overhead Per Instance.** The runtime is aggressively stripped and rebuilt in Rust. Combined with Copy-on-Write memory sharing, a single machine can host thousands of concurrent sandboxes. For comparison, a minimal Docker container uses 10-50MB, and a traditional VM starts at 200MB+.

**E2B SDK Drop-In Replacement.** CubeSandbox implements the E2B protocol natively. If your agent framework already uses E2B's Python SDK (`e2b-code-interpreter`), you switch to CubeSandbox by setting `E2B_API_URL` to your CubeSandbox endpoint. That's it. No code changes, no adapter layers, no migration guides.

**Event-Level Snapshot and Rollback.** The CubeCoW engine (introduced in v0.3.0) supports millisecond-granularity snapshots of running sandboxes. You can checkpoint an agent's state, fork it into parallel exploration paths, or roll back to any previous state. This is particularly useful for reinforcement learning workflows where you want to explore multiple code execution paths from the same starting point.

**eBPF-Powered Network Isolation.** CubeVS, the built-in virtual switch, uses eBPF to enforce strict inter-sandbox network isolation at the kernel level. You can configure fine-grained egress filtering policies — allow an agent to reach your API but not the open internet, or restrict it to specific DNS domains. This level of network control doesn't exist in Docker without significant iptables gymnastics.

**Production-Validated at Tencent Scale.** CubeSandbox has been running in Tencent Cloud's production environment before open-sourcing. The architecture supports both single-node deployment for development and multi-node clusters for production, with CubeMaster handling orchestration and Cubelet managing per-node lifecycle.

### Use Cases

- **AI code execution platforms** — Any service where users or agents submit code to run in isolation. CubeSandbox replaces E2B as the execution backend with better performance and zero licensing cost.
- **Automated testing and CI agents** — Agents that write and run tests, fix failing builds, or validate pull requests need safe execution environments. CubeSandbox provides that with near-zero startup latency.
- **Reinforcement learning for code agents** — The snapshot/rollback capability lets RL training frameworks fork sandbox states and explore multiple execution paths efficiently. Tencent specifically mentions SWE-Bench integration.
- **Multi-tenant agent hosting** — If you're building a platform where multiple users run agents simultaneously, the hardware-level isolation and low memory footprint let you achieve high density without security tradeoffs.
- **Browser automation agents** — Combined with tools like Playwright or Puppeteer, CubeSandbox can run headless browsers in isolated environments for web scraping, testing, or agent-driven web interaction.

### Pros and Cons

Pros:
- Genuine hardware-level isolation (not namespace tricks) with performance that rivals containers. The 60ms cold start number is hard to argue with.
- E2B compatibility means zero-friction migration for existing agent frameworks. This is the kind of pragmatic engineering decision that drives real adoption.
- Self-hosted and open-source (Apache 2.0). No per-minute billing, no vendor lock-in, no usage caps. Run it on your own infrastructure.
- CNCF Landscape listing and Tencent Cloud backing give it staying power that typical GitHub projects lack.

Cons:
- Requires x86_64 Linux with KVM support. No ARM, no macOS, no running inside Docker (without nested virtualization). If your dev machine is an Apple Silicon Mac, you're deploying to a cloud VM or using the QEMU dev environment.
- The project is two months old. The API surface is still settling, documentation has gaps (some pages are Chinese-only), and the community is small. Production use today requires willingness to debug infrastructure issues.
- The E2B compatibility layer works for the SDK interface, but if you've built custom E2B integrations beyond the standard SDK, migration may require more effort than a single env var change.

### Getting Started

CubeSandbox requires a Linux machine with KVM support (bare metal or a cloud VM with nested virtualization enabled).

```bash
# Install via pip (Python SDK)
pip install cubesandbox

# Or pull the Docker-based quickstart (for evaluation only)
docker pull cubesandbox/cubesandbox:latest

# Set your endpoint
export CUBESANDBOX_URL=http://your-server:8080

# Create and run a sandbox (Python SDK, E2B-compatible)
from cubesandbox import Sandbox

sandbox = Sandbox()
sandbox.process.start_and_wait("echo 'Hello from CubeSandbox'")
output = sandbox.process.start_and_wait("python3 -c 'print(2+2)'")
print(output.stdout)  # "4\n"
sandbox.close()
```

For production deployment on bare metal or cloud VMs, follow the [deployment guide](https://github.com/TencentCloud/CubeSandbox/blob/main/docs/guide/bare-metal-deploy.md). The four-step walkthrough covers server provisioning, installation, template creation, and first agent execution.

### Alternatives

**E2B** — The commercial sandbox-as-a-service that CubeSandbox is compatible with. E2B offers a managed cloud with no infrastructure to operate, which is appealing if you don't want to run your own servers. But it's closed-source and priced per sandbox-minute, which gets expensive fast at scale. Choose E2B if you want zero ops overhead and cost isn't a primary concern.

**Docker with gVisor** — Google's gVisor adds a user-space kernel to containers for better isolation than plain Docker, without full VM overhead. It's more mature than CubeSandbox and works on ARM. But gVisor's system call compatibility is incomplete — some workloads break silently — and it still doesn't match hardware-level isolation. Choose gVisor if you need better container security without leaving the Docker ecosystem.

**Firecracker** — AWS's microVM technology that powers Lambda and Fargate. Firecracker pioneered the fast-boot VM model that CubeSandbox builds on. It's battle-proven at massive scale but requires more infrastructure work to deploy as an agent sandbox. CubeSandbox is essentially Firecracker's ideas packaged into a purpose-built agent sandbox service. Choose Firecracker if you're building your own platform from scratch and want maximum control over the virtualization layer.

### Verdict

CubeSandbox is the most practical solution I've seen for the "where do AI agents execute code" problem. The E2B compatibility is the killer feature — it means adoption doesn't require rethinking your agent architecture, just pointing to a different endpoint. The performance numbers (60ms cold starts, 5MB overhead) aren't just impressive on paper; they change what's architecturally possible. You can design agent workflows that create throwaway sandboxes per task without worrying about cost or latency. The Tencent backing and CNCF listing suggest this isn't going to disappear in six months. If you're building anything with AI agents that execute code — and in 2026, who isn't — CubeSandbox deserves a serious look. The main risk is maturity: it's two months old, and production use today requires comfort with early-stage infrastructure. But the trajectory is right, and the engineering decisions are sound.
