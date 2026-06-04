---
name: sandboxed
description: "Sandboxed is an open-source Go engine for building AI app-builder products — isolated containers, live preview URLs, and agent orchestration in one command."
url: https://github.com/tastyeffectco/sandboxes
stars: 134
forks: 12
language: Go
tags: ["go", "docker", "sandbox", "ai-agents", "developer-tools", "self-hosted"]
featured: false
publishedAt: 2026-06-04
---

## Sandboxed

### Overview

Sandboxed is the open-source backend engine behind AI app-builder products like Lovable, Bolt, v0, and Replit — except you can run it yourself. Created by the team at TastyEffect and launched on June 3, 2026, it racked up 134 stars in its first day, which tells you something about developer demand for this category of tool. The project is MIT-licensed and written in Go, with a deliberately small footprint: one binary, SQLite, Docker, and Traefik.

The pitch is clean. You send one HTTP request to the API. It spins up an isolated Linux container, runs an AI coding agent inside it (OpenCode and Claude Code come pre-installed), and gives the resulting app a live preview URL. When nobody's looking at a sandbox, it goes to sleep and frees the RAM. When someone opens the preview link again, it wakes up instantly. Files persist on disk the whole time. One ordinary $20/month server can hold dozens of concurrent sandboxes instead of needing one VM per user.

The problem sandboxed solves is real. If you've ever tried to build a "describe an app, see it live" product, you know the hard part isn't the prompt — it's the infrastructure. Multi-tenant isolation so one user's code can't touch another's. Per-user preview URLs with automatic routing and TLS. Cost control so idle environments don't drain your budget. Agent orchestration that streams progress and captures results. Persistence and crash recovery. That's months of platform engineering work. Sandboxed compresses it into a single `./install.sh`.

### Why it matters

The AI app-builder space is exploding. Vercel's v0, Lovable, Bolt, and Replit have proven there's massive demand for tools that turn natural language into working applications. But all of them are closed-source SaaS products with vendor lock-in. If you want to build your own version — for a startup, an internal tool, or a platform play — you've been on your own until now.

Sandboxed changes that equation. It gives you the core infrastructure layer that these products are built on, minus the proprietary bits. The architecture is intentionally boring and readable: SQLite for state, Docker for containers, Traefik for routing, a single Go binary for the control plane. You could read the entire codebase in an afternoon. That's a feature, not a limitation — it means you can extend it, debug it, and trust it in production.

The timing connects to a broader shift. AI coding agents are getting good enough that "generate a working app from a prompt" is now a viable product category. But the infrastructure to run these agents safely at scale — with isolation, cost control, and preview URLs — hasn't been available as open source. Sandboxed fills that gap. For fullstack developers working with React, NestJS, Django, or Go, this is the missing piece if you want to build on top of the AI agent wave instead of just consuming someone else's API.

### Key Features

**One-Command Setup.** Run `./install.sh` and you have a working API plus preview routing. No Kubernetes, no Helm charts, no YAML configuration files that span hundreds of lines. Docker Engine with the Compose plugin on Linux is the only requirement. The installer checks your environment, writes a `.env` file, builds the sandbox base image and control plane, and starts the whole stack. The API is live at `http://127.0.0.1:9090` within minutes.

**Isolated Multi-Tenant Containers.** Each sandbox runs in its own hardened Docker container with capability dropping (`cap-drop ALL`), `no-new-privileges`, and a read-only root filesystem. Per-sandbox memory and PID limits prevent one user from consuming resources meant for others. A host-memory pressure reaper kills sandboxes that exceed their bounds. This isn't full VM isolation — the README is honest about that — but it's solid for running code from trusted or semi-trusted users.

**Live Preview URLs with Auto-Routing.** Every sandbox gets a clean preview URL like `http://s-<id>-3000.preview.localhost`. Traefik v3's Docker provider handles the routing automatically — sandboxes self-register their routes when they start. On a real domain with TLS, you get `https://s-<id>-3000.preview.yourdomain.com` with a single wildcard certificate via Let's Encrypt DNS-01. No port bookkeeping, no collisions, no manual configuration.

**Sleep-on-Idle, Wake-on-Request.** Idle sandboxes stop automatically via `docker stop`, freeing their RAM. The next time someone opens the preview URL, the sandbox wakes up transparently with a warming-up page and readiness probe. This is the difference between a $20 server handling 50 users and a $2,000 cluster doing the same thing. The idle timeout is configurable, and you can send a keepalive POST to postpone the reaper for active sessions.

**Built-In AI Agent Orchestration.** The base sandbox image ships with OpenCode and Claude Code CLIs pre-installed. Submit a prompt via the API, and the agent builds the app inside the sandbox. Progress streams back as Server-Sent Events. You can inject your own API keys at sandbox creation time, or use OpenCode's free plan out of the box. The agent lifecycle is first-class: submit, stream, capture result, retry — not just "fire and forget."

**Persistent Workspaces with Crash Recovery.** Each sandbox has a bind-mounted workspace directory that persists across container restarts and server reboots. SQLite (in WAL mode) is the single source of truth. A reconciler converges Docker's actual state to the database on every boot, so if the host restarts unexpectedly, everything comes back cleanly. Destroy a container and the workspace survives. Purge it when you actually want the data gone.

**Full REST API with File Management.** The API covers the complete lifecycle: create, list, get, exec commands, stop, destroy, purge. A file management endpoint lets you read, write, and list workspace files without entering the container. Health and readiness endpoints (`/healthz`, `/readyz`) are built in for load balancer integration. Auth is off by default for local development, with token-based auth available for production.

### Use Cases

- **AI app-builder products** — Build a "describe an app, see it live" SaaS like Lovable or Bolt. Sandboxed gives you the multi-tenant infrastructure on day one so you can focus on the prompt engineering and UX.
- **Agent development platforms** — Run AI coding agents safely at scale. Each agent gets its own isolated environment with persistent state and a live URL to show results.
- **Per-branch preview environments** — Give every pull request or feature branch its own sandbox with a unique URL. Great for design review, QA, and stakeholder demos.
- **Coding playgrounds and education** — Let students or workshop participants write and run code in isolated environments without risking the host system. Sleep-on-idle keeps costs manageable.
- **Internal developer platforms** — Give your team on-demand development environments that spin up in seconds and clean up automatically. Works with any language or framework that runs in Docker.

### Pros and Cons

Pros:
- The architecture is deliberately simple and readable — one Go binary, SQLite, Docker, Traefik. You can understand the entire system in an afternoon, which makes it trustworthy and extensible.
- Sleep-on-idle with wake-on-request is a genuine cost innovation. Running dozens of sandboxes on a single $20/month server instead of one VM per user changes the economics of multi-tenant development platforms.
- MIT license with no vendor lock-in. You own your data, your margins, and your roadmap. Ship what you build on it.
- Honest documentation about what's simple on purpose and what to harden before scaling. The team doesn't pretend Docker containers are as secure as VMs for untrusted code.

Cons:
- Beta quality with 134 stars means limited production battle-testing. The project is one day old as of this writing — expect breaking changes and rough edges.
- Docker container isolation isn't sufficient for running truly untrusted code from strangers. The README acknowledges this and recommends VM-per-tenant (gVisor, Kata, Firecracker) for that use case.
- Single-server architecture means you can't distribute sandboxes across multiple hosts yet. Multi-host sharding is listed as a future concern, not a current feature.

### Getting Started

Requirements: Docker Engine with the Compose plugin on Linux.

```bash
# Clone and install
git clone https://github.com/tastyeffectco/sandboxes.git
cd sandboxes
./install.sh

# Verify the API is running
curl http://127.0.0.1:9090/healthz

# Create a sandbox
ID=$(curl -s -XPOST http://127.0.0.1:9090/sandbox \
  -H 'content-type: application/json' \
  -d '{"ports":[3000]}' | sed -E 's/.*"id":"([^"]+)".*/\1/')

# Have an agent build an app inside it
curl -s -XPOST http://127.0.0.1:9090/v1/sandboxes/$ID/tasks \
  -H 'content-type: application/json' \
  -d '{"prompt":"create a Vite app that shows a todo list and run it on port 3000","agent":"opencode"}'

# Stream the agent's progress
curl -N http://127.0.0.1:9090/v1/sandboxes/$ID/tasks/<taskId>/events

# Open the live preview
# http://s-<id>-3000.preview.localhost
```

For production with TLS, point `*.preview.yourdomain.com` at the host, enable the `websecure` entrypoint in Traefik, and configure Let's Encrypt DNS-01 for a wildcard certificate.

### Alternatives

**Lovable / Bolt / v0** — These are the closed-source SaaS products that sandboxed is modeled after. They offer polished UX, managed infrastructure, and built-in hosting. Choose them if you want a turnkey product without running your own infrastructure. Choose sandboxed if you want control over the stack, your data, and your margins.

**Daytona** — An open-source dev environment manager that focuses on per-developer workspaces (like GitHub Codespaces but self-hosted). Daytona is more mature and feature-rich for developer productivity use cases, but it doesn't include the AI agent orchestration or the "build an app from a prompt" workflow that sandboxed targets. Different problem, similar infrastructure layer.

**Gitpod / GitHub Codespaces** — Cloud-hosted development environments with preview URLs and multi-tenant isolation. More polished and reliable than a self-hosted solution, but you're paying per-user pricing to a vendor and you don't control the infrastructure. Sandbox is for teams that need to own the platform.

### Verdict

Sandboxed is the most interesting infrastructure project I've seen for the AI app-builder space. It takes the core technical challenges — multi-tenant isolation, preview routing, sleep-on-idle cost control, agent orchestration — and distills them into a single Go binary you can deploy in minutes. The architecture is deliberately simple, which is the right call for a v1: boring technology that works beats clever technology that doesn't. At 134 stars on day one with MIT licensing, it has the momentum and the licensing to become the standard open-source foundation for this category. The beta quality and single-server limitation are real constraints, but they're the kind you can work around. If you're building anything that involves "run code in isolated environments at scale" — whether that's an AI app-builder, an agent platform, or a coding playground — sandboxed deserves a serious look right now.
