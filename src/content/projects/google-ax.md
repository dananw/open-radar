---
name: google-ax
description: "Google's open-source distributed agent runtime in Go — resumable execution, event logging, and Kubernetes-native orchestration for AI agents at scale."
url: https://github.com/google/ax
stars: 1621
forks: 89
language: Go
tags: ["ai-agents", "distributed-systems", "go", "kubernetes", "agent-runtime"]
featured: false
publishedAt: 2026-06-09
---

## Google AX (Agent Executor)

### Overview

AX is Google's open-source distributed agent runtime, written in Go. It hit 1,600 GitHub stars within ten weeks of its late-March 2026 launch — modest compared to some viral repos, but the contributor profile tells a different story. The primary author is rakyll (Jaana B. Dogan), one of the most respected Go developers in the industry, known for her work on Go tooling at Google, the Go runtime, and the pprof ecosystem. When someone with that track record builds an agent runtime from scratch, it's worth paying attention.

The project addresses a specific gap: as AI agents move from simple chat loops to long-running, multi-step autonomous workflows, the infrastructure underneath them breaks down. Current agent frameworks handle the happy path well, but they struggle with failure recovery, distributed execution, and observability. AX tries to solve this by providing a proper runtime layer — think of it as the Kubernetes of agent execution. It coordinates agentic loops, manages executions with durable event logging, and communicates with both local and remote actors through gRPC.

The architecture separates concerns cleanly. A central Controller handles execution orchestration and maintains a durable event log. Agents run as isolated actors — either locally or remotely — and communicate through resumable streams. Tools are MCP servers. Skills are registered capabilities. Everything is auditable through the event log, and executions can be resumed from any point after failure or interruption.

### Why it matters

The agent ecosystem in mid-2026 is exploding, but the infrastructure layer is immature. Most developers are building agents with frameworks that assume single-process, single-machine execution. That works for demos and prototypes, but production agent systems need distributed execution, failure recovery, and observability. These are hard distributed systems problems, and most agent frameworks aren't designed to solve them.

AX represents a shift in how we think about agent infrastructure. Instead of treating agents as application code that happens to call LLMs, AX treats agent execution as a distributed systems problem — with all the guarantees that implies. Durable event logs, resumable execution, single-writer consistency, and isolated actors are patterns borrowed from battle-tested distributed systems, applied to the agent domain.

The Kubernetes angle is significant too. AX is designed to run on Agent Substrate, Google's Kubernetes-native agent execution layer. Google published a blog post about bringing agent sandbox capabilities to GKE, and AX is the runtime that sits on top. For teams already running infrastructure on Kubernetes, this means agent workloads can be managed with the same tooling and abstractions they already know. For fullstack developers building AI-powered backends in Go, this is the kind of infrastructure that makes production agent systems feasible rather than fragile.

### Key Features

**Distributed Runtime with Isolated Actors.** Controllers, skills, tools, and agents all execute in isolation as separate processes or containers. This means a crashing tool doesn't take down the agent, and a misbehaving agent doesn't corrupt the controller's state. Each actor communicates through gRPC with resumable streams, so network interruptions don't lose in-flight work.

**Durable Event Log and Resumable Execution.** Every user and agent action is recorded in a durable event log. If the controller crashes, the agent restarts, or the client disconnects, execution resumes from the last recorded event — not from scratch. This is the feature that separates AX from toy agent frameworks. Long-running tasks that take minutes or hours can survive infrastructure failures without losing progress.

**Single-Writer Consistency Model.** The controller acts as the single writer for execution state, eliminating race conditions and state corruption that plague multi-threaded agent systems. This architectural choice trades some throughput for correctness, which is the right tradeoff for agent systems where a single corrupted state can cascade into hours of wasted LLM calls.

**MCP Tool Integration.** Tools in AX are MCP (Model Context Protocol) servers, which means any MCP-compatible tool works out of the box. The controller can spawn tool processes, manage their lifecycle, and route tool calls from agents. This is a practical design decision — the MCP ecosystem is growing fast, and AX doesn't force you to rewrite existing tools.

**Kubernetes-Native Deployment.** AX is designed to run on Agent Substrate, a Kubernetes layer that provides higher density for agentic workloads. Manifests are provided for Kubernetes deployment, and the runtime handles actor scheduling, health checking, and resource management through standard Kubernetes primitives. If you know kubectl, you know how to deploy agents.

**Built-in Auditing and Policy Controls.** All agent calls flow through the controller, which means you can audit every action, enforce policies, and set guardrails without modifying agent code. This is critical for production systems where agents interact with external APIs, databases, or user data.

**Custom Agent Support via gRPC.** You can write custom agents in any language that supports gRPC, and AX will coordinate their execution. The `AgentService.Connect` RPC lets you register remote agents that the controller can spawn and manage. This means your agent logic can be Python, TypeScript, Rust — whatever makes sense for the task — while AX handles the orchestration.

### Use Cases

- **Long-running autonomous agents** — Agents that need to execute multi-step workflows over hours or days, where failure recovery and progress tracking are essential. Think data pipeline agents, research agents, or automated code review systems.
- **Multi-agent orchestration** — Systems where multiple specialized agents need to coordinate — a planning agent, a coding agent, a testing agent — with the runtime managing state transitions and communication between them.
- **Production AI backends** — Fullstack developers building Go-based backends that need to expose agent capabilities as APIs, with proper observability, retry logic, and resource management.
- **Kubernetes-native AI infrastructure** — Teams running on GKE or any Kubernetes cluster that want to manage agent workloads with the same tooling they use for web services and microservices.
- **Auditable AI systems** — Applications where every agent action needs to be logged and reviewable — compliance-sensitive environments, financial services, or healthcare AI.

### Pros and Cons

Pros:
- Built by rakyll and the Google Go team, with deep expertise in distributed systems and Go runtime internals. The design decisions reflect years of production experience, not academic abstractions.
- Durable event log and resumable execution solve the hardest problem in production agent systems — surviving failures without losing progress. Most competing frameworks don't even attempt this.
- MCP tool integration means you don't need to rewrite existing tools. The growing MCP ecosystem works out of the box.
- Kubernetes-native design means agent workloads integrate with existing infrastructure tooling — monitoring, logging, scaling, and deployment pipelines.

Cons:
- Early stage at v0.1.0 with a temporary freeze on external PRs. The API surface will change significantly before a stable release. Don't build production systems on this today without expecting breaking changes.
- Go-only runtime means the controller and core infrastructure require Go. While custom agents can be written in other languages, the core system is Go-native.
- The distributed systems approach adds complexity that solo developers or small teams might not need. If your agent runs on a single machine and finishes in seconds, AX is overkill.
- Documentation is sparse. The README is solid, but there's no comprehensive guide, tutorial series, or API reference yet. You'll be reading source code.

### Getting Started

```bash
# Install the AX CLI
go install github.com/google/ax/cmd/ax@latest

# Verify installation
ax --help

# Run a basic execution with built-in agents
ax exec --input "Can you list me this directory?"

# Continue a conversation
ax exec \
  --conversation d85a4b4e-c53b-4c84-b879-f10d905bce40 \
  --input "Show me the contents of README.md"

# Resume from a specific sequence number (after disconnect)
ax exec \
  --conversation d85a4b4e-c53b-4c84-b879-f10d905bce40 \
  --last-seq 12 \
  --resume

# Run with a specific agent
ax exec \
  --agent coding \
  --input "Write me a simple HTTP server in Python"
```

For custom agents, see the `examples/remote_agent/` directory in the repo. It demonstrates a gRPC-based remote agent that the AX controller can spawn and manage.

### Alternatives

**LangGraph** — LangChain's agent orchestration framework, written in Python. LangGraph is more mature, has a larger community, and offers a visual graph-based workflow editor. It's the better choice if you're in the Python ecosystem and need something production-ready today. But it doesn't provide durable execution or distributed actor isolation — those are application-level concerns in LangGraph, infrastructure-level guarantees in AX.

**CrewAI** — A Python framework for multi-agent systems with role-based agent definitions and tool integration. CrewAI is easier to get started with and has better documentation. Choose it for prototyping multi-agent systems quickly. Choose AX when you need the execution to survive crashes, scale across machines, and integrate with Kubernetes.

**Temporal** — A general-purpose durable execution platform that can be used for agent workflows. Temporal is battle-tested at massive scale and supports multiple languages. It's the most mature option for durable execution, but it's a general workflow engine, not an agent-specific runtime. AX adds agent-specific primitives — tool management, agent registration, MCP integration — that Temporal doesn't provide out of the box.

### Verdict

AX is the most architecturally serious agent runtime I've seen from a major tech company. The decision to build it in Go, with durable event logs and Kubernetes-native deployment, reflects a production-first mindset that's rare in the agent framework space. It's early — v0.1.0 with no stable API — and the temporary PR freeze means the community can't contribute yet. But the foundation is solid, the lead developer's track record is impeccable, and the design addresses real problems that other frameworks ignore. If you're building agent systems in Go and you need them to work in production, not just in demos, AX is the project to watch. Check back in three months — by then, the API should be more stable and the ecosystem around it should be forming.
