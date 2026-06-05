---
name: sandboxed
description: "Self-hosted Go platform for AI app-builder products — isolated Docker sandboxes with live preview URLs, idle sleep/wake, and built-in coding agents."
url: https://github.com/tastyeffectco/sandboxes
stars: 381
forks: 6
language: Go
tags: ["sandbox", "ai-agents", "devtools", "self-hosted", "docker", "go"]
featured: false
publishedAt: 2026-06-05
---

## Sandboxed

### Overview

Sandboxed is an open-source Go platform that gives you the backend infrastructure behind AI app-builder products like Lovable, Bolt, and v0 — but self-hosted, on your own server, in one command. It hit 380 GitHub stars within 48 hours of its June 3, 2026 launch, which tracks with how hungry developers are for this kind of infrastructure without the vendor lock-in.

The project comes from TastyEffect Co., a small team focused on developer tooling. Their pitch is direct: if you're building a product where users type "build me a todo app" and a working website appears at its own URL, sandboxed gives you that plumbing without spending months on multi-tenant isolation, preview routing, and cost control. It's the kind of project that makes you wonder why something like this didn't exist sooner.

Here's what it actually does. You send one HTTP request, and sandboxed spins up an isolated Linux container with its own filesystem and memory limits. It runs an AI coding agent inside that container — OpenCode and Claude Code CLIs come pre-installed — and gives the resulting app a live preview URL. When nobody's using a sandbox, it goes to sleep and frees the RAM. When someone opens the preview link again, it wakes up transparently. One ordinary server can hold dozens of sandboxes instead of needing one VM per user.

### Why it matters

The AI app-builder space has exploded over the past year. Lovable raised $200M, Bolt (by StackBlitz) is growing fast, and v0 by Vercel is pushing the same pattern. But all of them are closed SaaS products. If you wanted to build something similar — whether as a startup, an internal tool, or an open-source alternative — you'd spend months just on the infrastructure layer: container orchestration, preview URL routing, idle management, agent lifecycle, and crash recovery.

Sandboxed collapses that into a single Go binary plus Docker. It uses SQLite for state, Traefik for URL routing, and the Docker CLI for container management. No Kubernetes, no separate database server, no message queue. The README is honest about what it is: a strong starting point for shipping fast, not a production-hardened platform for running untrusted code at scale. That honesty is refreshing in a space full of overpromising.

For fullstack developers, this is interesting because it lowers the barrier to building AI-powered development tools. You can have a working prototype of an AI app-builder in an afternoon instead of a quarter. The fact that it's written in Go — fast, single binary, minimal dependencies — means it fits well into existing Go infrastructure and doesn't require a Node.js or Python runtime.

### Key Features

**One-Command Install.** Run `./install.sh` and you get a working API plus preview URLs. The script checks Docker, writes a `.env` file, builds the sandbox base image and control plane, and starts the whole stack. The API is live at `http://127.0.0.1:9090` immediately. No Helm charts, no Terraform modules, no "configure these 15 environment variables first."

**Built-In Coding Agents.** Every sandbox ships with OpenCode and Claude Code CLIs pre-installed. You submit a prompt via the API, and the agent writes code into the sandbox's workspace. Progress streams back via Server-Sent Events. You can inject your own API keys at sandbox creation time, or use OpenCode's free plan out of the box for testing.

**Live Preview URLs with Automatic Routing.** Each sandbox gets a clean preview URL like `http://s-<id>-3000.preview.localhost`. Traefik handles the routing automatically — sandboxes self-register their routes when they start. On a real domain with TLS, you get `https://s-<id>-3000.preview.yourdomain.com` with Let's Encrypt wildcard certificates. No port bookkeeping, no DNS configuration per sandbox.

**Idle Sleep and Wake-on-Request.** This is the feature that makes the economics work. Idle sandboxes stop automatically, freeing their memory. When someone opens the preview URL, the sandbox wakes up transparently — there's a warming-up page, a readiness probe, and request holding so the user doesn't see an error. The difference between always-on VMs and this approach is the difference between a $20/month server and a $2,000/month cluster.

**Crash Recovery via SQLite Reconciler.** SQLite is the single source of truth for sandbox state. A reconciler converges Docker back to the database on every boot, so the system survives host reboots without losing track of what's running. This is the kind of boring, reliable design that matters when you have real users depending on your platform.

**REST API with Full Sandbox Lifecycle.** Create, list, execute commands, stream agent progress, read and write files, stop, destroy, and purge — all via HTTP endpoints with bearer token authentication. The API is designed to be called from your app backend, per user, at scale. There's also a complete `AGENTS.md` runbook for driving sandboxes programmatically.

**Hardened Container Isolation.** Sandboxes run with `cap-drop ALL`, `no-new-privileges`, and read-only rootfs by default. Per-sandbox memory and PID limits prevent one user from taking down the rest. There's even a host-memory pressure reaper that kills sandboxes if the host runs low. It's not VM-level isolation, but it's solid for running your own users' code.

### Use Cases

- **AI app-builder products** — Give users a text input, have an agent build an app, and serve it at a live URL. This is the primary use case and what the project was designed for.
- **Coding playgrounds and education platforms** — Students get isolated environments where they can experiment without affecting each other. The preview URL makes it easy to share work.
- **Per-branch preview environments** — Spin up a sandbox for each pull request or feature branch. The sleep/wake economics make this affordable even for small teams.
- **Agent development and testing** — Test AI coding agents in isolated environments with real file systems and network access. Stream agent progress and capture durable results.
- **Multi-tenant SaaS backends** — Any product where each user needs their own isolated environment with a live URL. The API is designed for this pattern from the start.

### Pros and Cons

Pros:

- The architecture is genuinely simple — one Go binary, SQLite, Docker CLI, and Traefik. You could read the entire control plane in an afternoon. That's rare for infrastructure software.
- The idle sleep/wake economics are the killer feature. Running dozens of sandboxes on a single $20/month server changes the calculus for indie developers and small teams building AI tools.
- MIT licensed with no vendor lock-in. You own your data, your margins, and your roadmap. The team is explicit about this being a starting point you can build a business on.
- The API design is clean and well-documented. RESTful endpoints with SSE streaming for agent progress. The `AGENTS.md` runbook shows how to drive it programmatically.

Cons:

- Two-day-old project with 380 stars and a single contributor. The beta label is real — expect breaking changes, missing edge cases, and rough documentation. Don't put production traffic on this yet.
- Container isolation uses hardened Docker, not VMs. Fine for running your own users' code, but insufficient for running untrusted strangers' code. The README is honest about this and recommends gVisor, Kata, or Firecracker for that use case.
- Single-server only today. No multi-host sharding, no Kubernetes backend. The control plane talks to Docker via the CLI boundary, so a k8s backend is described as "an interface swap, not a rewrite," but it doesn't exist yet.
- API auth is off by default. Fine for local development, but you need to remember to turn it on before exposing the API port. The README warns about this, but it's still a footgun.

### Getting Started

```bash
# Clone and install (requires Docker Engine + Compose plugin on Linux)
git clone https://github.com/tastyeffectco/sandboxes.git
cd sandboxes
./install.sh

# Verify the API is running
curl http://127.0.0.1:9090/healthz
# → ok

# Create a sandbox that will serve on port 3000
API=http://127.0.0.1:9090
ID=$(curl -s -XPOST $API/sandbox -H 'content-type: application/json' \
       -d '{"ports":[3000]}' | sed -E 's/.*"id":"([^"]+)".*/\1/')
echo "sandbox: $ID"

# Have an agent build a Vite app
curl -s -XPOST $API/v1/sandboxes/$ID/tasks \
  -H 'content-type: application/json' \
  -d '{
    "prompt": "create a Vite app that shows a todo list and run it on port 3000",
    "agent": "opencode"
  }'

# Stream the agent progress
curl -N $API/v1/sandboxes/$ID/tasks/<taskId>/events

# Open the live preview
# http://s-<id>-3000.preview.localhost
```

To inject your own API key for Claude Code instead of OpenCode's free plan:

```bash
curl -s -XPOST $API/sandbox -d '{
  "ports": [3000],
  "env": {"ANTHROPIC_API_KEY": "sk-ant-..."}
}'
```

### Alternatives

**Daytona** — A more mature dev environment manager that supports multiple backends (Docker, SSH, cloud VMs) and has a VS Code integration. Daytona is better if you need remote development environments for individual developers. Sandboxed is better if you're building a multi-tenant product where each user gets an isolated environment with a preview URL and an AI agent.

**Gitpod / GitHub Codespaces** — Cloud-hosted development environments with full IDE support. These are polished, production-ready products, but they're SaaS offerings with per-user pricing. Sandboxed is self-hosted and designed for building products on top of, not for providing development environments to your team.

**Devbox by Jetify** — Reproducible development environments using Nix. Devbox solves the "works on my machine" problem for individual developers but doesn't address multi-tenant isolation, preview URLs, or AI agent orchestration. Different problem, different tool.

### Verdict

Sandboxed is the most practical open-source answer to "how do I build my own Lovable/Bolt/v0" that I've seen. It's two days old and beta-quality, so temper your expectations — this is a starting point, not a finished product. But the architecture decisions are sound: Go for the control plane, SQLite for state, Docker for isolation, Traefik for routing. The idle sleep/wake feature alone makes this worth evaluating if you're building any kind of multi-tenant AI development tool. If you're a fullstack developer who wants to ship an AI app-builder product without spending six months on infrastructure, sandboxed gives you a running start. Watch this repo — with 380 stars in 48 hours, the community interest is clearly there.
