---
name: sandboxd
description: "sandboxd is an open-source Go engine for building AI app platforms — self-hosted dev sandboxes with live preview URLs, sleep/wake cost control, and built-in coding agent orchestration."
url: https://github.com/tastyeffectco/sandboxd
stars: 495
forks: 12
language: Go
tags: ["devtools", "ai-agents", "self-hosted", "docker", "go"]
featured: false
publishedAt: 2026-06-08
---

## sandboxd

### Overview

sandboxd is the open-source backend behind products like Lovable, Bolt, v0, and Replit — those apps where you type "build me a todo app" and a working website appears at its own link seconds later. It hit 495 GitHub stars in its first five days after launching on June 3, 2026, which tells you something about developer demand for this category of infrastructure. The project is built by TastyEffect Co. and lives at a deliberately small codebase: one Go binary, Docker, Traefik, and SQLite. No Kubernetes, no message queues, no separate database server.

The core loop is simple. You send an HTTP request, and sandboxd creates an isolated Linux container with its own filesystem and memory limits. You send another request with a prompt, and a coding agent (OpenCode or Claude Code comes pre-installed) writes code into that sandbox. The dev server running inside gets a live, shareable preview URL automatically. When nobody's looking at it, the sandbox goes to sleep and frees its RAM. When someone opens the link again, it wakes up transparently. Files persist on disk the whole time.

The architecture is intentionally boring — and that's a compliment. One Go program tells Docker what to do. Traefik handles URL routing. SQLite is the source of truth. A reconciler converges Docker back to the database on every boot, so the system survives reboots without losing state. You could read the entire control plane in an afternoon. That simplicity is the point: this is infrastructure you can actually understand, debug, and extend without a platform team.

### Why it matters

The "describe an app, see it live" product category has exploded in 2026. Lovable raised $20M, Bolt.new hit millions of users, and v0 from Vercel became a standard prototyping tool. But if you wanted to build your own version of any of these, you were looking at months of platform engineering: multi-tenant container isolation, per-user preview URLs with TLS, idle resource management, agent orchestration, crash recovery. That work is table stakes but not differentiating — exactly the kind of thing that should be open source.

sandboxd fills that gap. It's not trying to be the AI part — it's the infrastructure underneath. The Go binary handles sandbox lifecycle (create, stop, destroy, exec), workspace persistence, idle reaping, memory pressure management, and wake-on-request routing. The agent orchestration layer lets you submit prompts and stream progress via Server-Sent Events. You bring your own product idea and AI layer; sandboxd gives you the platform to run it on.

What makes this particularly relevant for fullstack developers is the tech stack. Go for the control plane means a single binary with no runtime dependencies. SQLite means no database server to manage. Docker means the isolation model is something every developer already understands. Traefik means preview URLs with automatic TLS just work. The entire stack is things you've already used, composed in a way that solves a genuinely hard problem.

### Key Features

**Stop-on-Idle with Wake-on-Request.** Every sandbox has an idle timer. When nobody hits its preview URL for a configurable period, sandboxd runs `docker stop` and frees the container's RAM entirely. The next request to that URL is caught by a Traefik priority-1 catch-all, routed to the control plane, which starts the container, polls the port, and serves a styled "warming up" page that auto-refreshes into the app. This is the difference between a $20/month server handling dozens of users and a $2,000/month cluster running always-on VMs.

**Hardened Container Isolation.** Each sandbox runs under hardened `runc` with `--cap-drop=ALL`, `--security-opt=no-new-privileges`, a read-only rootfs with tmpfs for `/tmp`, hard memory ceilings, PID limits, and file-descriptor ulimits. The threat model is authenticated users running their own code — not anonymous hostile multi-tenancy. The README is honest about when you'd need stronger isolation (VM-per-tenant via gVisor, Kata, or Firecracker) and gives clear guidance on when to upgrade.

**Built-in Agent Orchestration.** Submit a prompt via the API and sandboxd runs a coding agent headlessly inside the sandbox. The OpenCode and Claude Code CLIs ship pre-installed in the base image. Progress streams back via SSE at `/v1/sandboxes/{id}/tasks/{taskId}/events`. You can inject API keys (Anthropic, OpenAI, whatever) at sandbox creation time via the `env` parameter. This isn't a toy integration — it's a proper task lifecycle with durable results.

**Preview URLs with Automatic TLS.** Every sandbox self-registers its route with Traefik via Docker labels. Locally, `*.localhost` resolves to `127.0.0.1` in every modern browser, so preview URLs work with zero DNS and zero certificates. In production, you point a wildcard domain at the host, enable the Traefik certificate resolver (Let's Encrypt DNS-01), and every sandbox gets HTTPS automatically. No per-host ACME limits because one wildcard cert covers everything.

**Crash Recovery via Reconciliation.** On boot, the control plane lists Docker containers, diffs against SQLite, and converges Docker to the database. SQLite is always the truth. If the host reboots, if Docker restarts, if something crashes — the reconciler brings everything back to the correct state. This is the kind of reliability detail that separates a demo from something you'd actually deploy for users.

**Full REST API with File Management.** The API covers the complete lifecycle: create, list, get, exec, keepalive, stop, destroy, purge. There's also a file API (`GET/PUT /v1/sandboxes/{id}/files`) for reading and writing workspace files programmatically — useful for agents that need to inspect or modify code without shelling into the container. Auth is off by default for local development, with bearer token support for production.

### Use Cases

- **AI app-builder products** — You're building the next Lovable or Bolt. Users describe apps, agents build them, each user gets an isolated sandbox with a live URL. sandboxd handles the platform layer so you can focus on the AI and UX.
- **Per-user coding playgrounds** — Educational platforms where each student gets their own environment. No shared state, no one student's code breaking another's, automatic cleanup when they're done.
- **Per-branch preview environments** — Every pull request gets its own sandbox with a preview URL. Reviewers see the actual running app, not just a diff. The sleep/wake economics make this practical even for large teams.
- **Agent development and testing** — You're building a coding agent and need to test it against real dev environments. sandboxd gives you reproducible, isolated sandboxes with a clean API for programmatic control.
- **Multi-app hosting for small teams** — Internal tools, staging environments, demo sites. One server, many apps, each at its own URL, each sleeping when not in use.

### Pros and Cons

Pros:
- The architecture is genuinely simple — one Go binary, Docker, Traefik, SQLite. You can understand the entire system in an afternoon, which makes debugging and extending it realistic.
- The sleep/wake economics are compelling. Dozens of sandboxes sharing a single $20/month server instead of one VM each is a 100x cost difference for light-usage scenarios.
- The API design is clean and well-documented. Every endpoint has clear request/response examples, and the AGENTS.md runbook is copy-pasteable for both humans and AI agents.
- Active development with 495 stars in five days and an honest, transparent README that explicitly calls out what's simple on purpose and what to harden before scaling.

Cons:
- Beta status means the API surface is still settling. The project is five days old as of this writing — expect breaking changes.
- Single-host only today. The control plane talks to one Docker daemon. Multi-host support is described as "an interface swap, not a rewrite," but it doesn't exist yet.
- Container isolation is hardened Docker, not VM-level. For running truly untrusted code from anonymous users, you'd need gVisor, Kata, or Firecracker — and that integration isn't built in.
- The base image build takes several minutes on first run. It caches after that, but the initial install isn't instant.

### Getting Started

```bash
# Clone and install (requires Docker Engine + Compose plugin on Linux)
git clone https://github.com/tastyeffectco/sandboxd.git
cd sandboxd
./install.sh

# Verify it's running
curl http://127.0.0.1:9090/healthz   # -> ok

# Create a sandbox that will serve on port 3000
ID=$(curl -s -XPOST http://127.0.0.1:9090/sandbox \
  -H 'content-type: application/json' \
  -d '{"ports":[3000]}' | sed -E 's/.*"id":"([^"]+)".*/\1/')

# Have an agent build an app inside it
curl -s -XPOST http://127.0.0.1:9090/v1/sandboxes/$ID/tasks \
  -H 'content-type: application/json' \
  -d '{"prompt":"create a Vite app with a todo list on port 3000","agent":"opencode"}'

# Stream the agent progress
curl -N http://127.0.0.1:9090/v1/sandboxes/$ID/tasks/<taskId>/events

# Open the live preview at:
# http://s-<id>-3000.preview.localhost
```

### Alternatives

**Lovable / Bolt.new / v0** — These are the polished, hosted products that sandboxd aims to provide the infrastructure for. They offer better UX, more AI model options, and zero ops burden. Choose them if you want to build apps with AI right now. Choose sandboxd if you want to build the platform yourself — with your own branding, your own AI layer, your own pricing, and full control over the infrastructure.

**Docker Compose + a shell script** — If you need one or two long-lived containers for yourself, this is simpler. sandboxd's own README says so explicitly. The project earns its keep when you're running many sandboxes for other people — that's when the sleep/wake, preview URLs, reconciliation, and API justify the complexity.

**Kubernetes + ArgoCD / DevSpace** — The heavyweight alternative for teams already running k8s. More powerful, more flexible, significantly more complex. sandboxd is deliberately the "one machine, one command" option. The README notes that a k8s Job/Pod backend is "an interface swap, not a rewrite" and invites it as a first contribution.

### Verdict

sandboxd is the most practical open-source project I've seen in the "AI app infrastructure" space. It's not trying to be the AI — it's solving the boring-but-hard platform problems that every "describe an app, see it live" product has to solve: multi-tenant isolation, preview URLs, sleep/wake economics, agent orchestration, crash recovery. The tech choices (Go, Docker, Traefik, SQLite) are deliberately boring and deliberately right. At 495 stars in five days, the community response validates the demand. If you're building any kind of AI-powered development tool — whether it's an app builder, a coding playground, or per-branch preview environments — sandboxd gives you a serious head start on the infrastructure layer. It's beta, it's young, and the README is honest about what needs hardening. But the architecture is sound, the codebase is small enough to actually own, and the MIT license means you can build a real business on top of it.
