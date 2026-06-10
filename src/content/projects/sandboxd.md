---
name: sandboxd
description: "Self-hosted dev sandboxes with preview URLs — the open-source engine behind AI app-builders like Lovable and Bolt, built in Go."
url: https://github.com/tastyeffectco/sandboxd
stars: 558
forks: 18
language: Go
tags: ["sandbox", "dev-environment", "docker", "ai-agent", "self-hosted"]
featured: false
publishedAt: 2026-06-11
---

## sandboxd

### Overview

sandboxd is a self-hosted engine that gives every user an isolated cloud dev environment, a built-in coding agent, and a live preview URL — all running on your own server with a single command. It launched on June 3, 2026, and crossed 500 GitHub stars in its first week. That kind of velocity usually means a tool hit a nerve.

The project comes from Tastyeffect, the team behind Upilote. Their pitch is simple: tools like Lovable, Bolt, v0, and Replit all solve the same infrastructure problem — spinning up isolated environments where AI agents can write and preview code. sandboxd is the open-source version of that infrastructure. Instead of paying per-seat for a hosted platform, you run one Go binary on a machine with Docker and you're done.

The core loop is clean. You POST to the API, a private Linux container spins up with its own filesystem and memory limits. You send it a prompt, and a coding agent (OpenCode or Claude Code, pre-installed) writes code into that workspace. The dev server inside the sandbox becomes instantly reachable at a shareable preview URL. When nobody's looking at it, the sandbox goes to sleep, freeing RAM. When someone opens the link again, it wakes up — files intact, state preserved. One ordinary $20/month server can hold dozens of users instead of needing one VM each.

### Why it matters

The AI app-builder category is exploding. Lovable raised $7M, Bolt hit $40M ARR in months, and v0 from Vercel is pushing hard into the space. But the infrastructure underneath all these products is remarkably similar: isolate code, run an agent, serve a preview. Most teams build this from scratch, burning months on container orchestration, URL routing, idle management, and crash recovery.

sandboxd collapses that work into a single deployable unit. For a fullstack developer building the next Lovable clone or an internal tool that lets non-technical teammates describe apps in plain English, this removes the biggest blocker. You get the boring-but-hard parts — multi-tenant isolation, Traefik-based preview routing, stop-on-idle cost control, and a reconciler that survives reboots — handled out of the box.

The architecture choices are opinionated in a good way. SQLite for state (no Postgres to manage), the Docker CLI as the container boundary (no Kubernetes), and Traefik for routing (no custom proxy). It's deliberately simple. The README says you could read the whole control plane in an afternoon, and that's not hyperbole — the Go binary shells out to `docker` commands and talks to SQLite. That simplicity is a feature, not a limitation, especially for solo developers or small teams who need to move fast.

### Key Features

**One-Command Install.** Run `./install.sh` and you have a working API with preview URLs. The script checks Docker, writes a `.env` file, builds the sandbox base image, builds the control plane, and starts the entire stack. No Kubernetes manifests, no Helm charts, no separate database server to provision. The API is live at `http://127.0.0.1:9090` within minutes.

**Agent Orchestration Built In.** Every sandbox ships with OpenCode and Claude Code CLIs pre-installed. You submit a prompt via the API and the agent works inside the sandbox, writing code, running dev servers, and producing a live result. Progress streams back as Server-Sent Events, so you can show real-time updates to your users. This isn't just `docker exec` firing a command — it's a proper task lifecycle with durable results.

**Stop-on-Idle, Wake-on-Request.** This is the cost control feature that makes the whole thing viable at scale. Idle sandboxes automatically stop via `docker stop`, freeing their memory. When someone opens the preview URL, the sandbox wakes up transparently — the request holds until the environment is ready, then serves. The difference between always-on VMs and sleep/wake sandboxes is the difference between a $20 server and a $2,000 cluster.

**Preview URLs with Automatic TLS.** Each sandbox gets a clean preview URL like `http://s-<id>-3000.preview.localhost`. Traefik handles all the routing — sandboxes self-register their routes when they start. For production, you point a wildcard domain at the host, enable Let's Encrypt DNS-01, and every preview gets HTTPS automatically. No per-host ACME limits, no manual certificate management.

**Hardened Container Isolation.** Sandboxes run with `cap-drop ALL`, `no-new-privileges`, and a read-only root filesystem. Per-sandbox memory and PID limits prevent one user's runaway process from affecting others. A host-memory pressure reaper kills sandboxes that exceed their limits. It's not VM-level isolation (the README is honest about this), but it's strong enough for trusted users and internal tooling.

**Persistent Workspaces with Crash Recovery.** Each sandbox gets a bind-mounted directory that persists across stop/start cycles and even host reboots. SQLite is the source of truth, and a reconciler converges Docker's actual state to the database on every boot. If the host crashes, sandboxes recover automatically — no manual intervention needed.

**Full File API.** Beyond exec and agent tasks, sandboxd exposes GET/PUT endpoints for listing, reading, and writing workspace files. This lets your application backend manipulate sandbox contents programmatically — useful for template injection, configuration management, or building custom IDEs on top of the sandbox.

### Use Cases

- **AI app-builder SaaS** — Build the next Lovable or Bolt. Users describe what they want, your agent writes it, and they see it live at a URL. sandboxd handles the infrastructure so you can focus on the UX and the prompts.

- **Coding playgrounds and education platforms** — Give students isolated environments where they can experiment without affecting each other. The idle-sleep feature keeps costs low when classrooms aren't in active use.

- **Per-branch preview environments** — Every pull request gets its own sandbox with a preview URL. Reviewers see the actual running app, not just a diff. Works for any framework — React, Vue, Django, Go, whatever runs in a container.

- **Internal tooling platforms** — Let non-technical team members describe tools in plain English. An agent builds them in a sandbox, and the team gets a live URL to test. No DevOps bottleneck.

- **Multi-tenant agent platforms** — If you're building a product where each user gets their own AI coding environment, sandboxd is the multi-tenant layer you'd otherwise spend months building.

- **Demo and showcase environments** — Sales teams get live, interactive demos at unique URLs instead of screenshots or recordings. Each prospect gets their own sandbox that spins up on demand.

### Pros and Cons

Pros:
- Deliberately simple architecture — SQLite, Docker CLI, Traefik, one Go binary. You can understand the entire system in an afternoon, which means you can debug and extend it without fighting abstraction layers.
- The idle-sleep/wake-on-request model is the single most important cost optimization for sandbox platforms, and it works out of the box. This alone saves hundreds of dollars per month compared to always-on VM approaches.
- MIT licensed with no vendor lock-in. Own your data, your margins, and your roadmap. The README explicitly encourages building commercial products on top of it.
- Active development with commits every few days since launch. The team responds to issues quickly and the architecture docs are thorough.

Cons:
- Docker-level isolation is not enough for running truly untrusted code from strangers. The README is transparent about this — for that use case, you need VMs (gVisor, Kata, Firecracker). This is a conscious trade-off for simplicity.
- Single-server architecture means you can't distribute sandboxes across multiple machines yet. Fine for starting out, but a limitation once you outgrow one host.
- Beta status with only 18 forks suggests limited community contribution so far. The project is a few weeks old, so this is expected, but it means you're early and the edges are still rough.

### Getting Started

```bash
# Clone and install (requires Docker Engine + Compose plugin on Linux)
git clone https://github.com/tastyeffectco/sandboxd.git
cd sandboxd
./install.sh

# Verify the API is running
curl http://127.0.0.1:9090/healthz
# → ok

# Create a sandbox
ID=$(curl -s -XPOST http://127.0.0.1:9090/sandbox \
  -H 'content-type: application/json' \
  -d '{"ports":[3000]}' | sed -E 's/.*"id":"([^"]+)".*/\1/')
echo "sandbox: $ID"

# Have an agent build an app
curl -s -XPOST http://127.0.0.1:9090/v1/sandboxes/$ID/tasks \
  -H 'content-type: application/json' \
  -d '{"prompt":"create a Vite app that shows a todo list and run it on port 3000","agent":"opencode"}'

# Stream the agent's progress
curl -N http://127.0.0.1:9090/v1/sandboxes/$ID/tasks/<taskId>/events

# Open the live preview at:
# http://s-<id>-3000.preview.localhost
```

Inject your own API key for model access:

```bash
curl -s -XPOST http://127.0.0.1:9090/sandbox \
  -d '{"ports":[3000],"env":{"ANTHROPIC_API_KEY":"sk-ant-..."}}'
```

### Alternatives

**Daytona** — A more mature dev environment manager that supports multiple providers (Docker, VMs, cloud). Daytona is better if you need workspace management for developer teams (think Gitpod alternative). sandboxd is better if you're building an AI app-builder product where each end-user gets an isolated environment with an agent and a preview URL. Different use case, different architecture.

**Docker Compose / docker run** — If you need one or two containers for yourself, a shell script is simpler. sandboxd explicitly says this. The value kicks in when you're running many sandboxes for other people — that's when URL routing, idle management, crash recovery, and API-driven lifecycle matter. Don't use a platform when a script will do.

**E2B (e2b-dev/E2B)** — A hosted sandbox platform with a Python/JS SDK. E2B handles the infrastructure for you (no self-hosting) and charges per sandbox-minute. Better if you want zero ops and don't mind vendor lock-in. sandboxd is better if you want to own the infrastructure, control costs, and customize the environment deeply.

### Verdict

sandboxd is the most practical open-source answer to "how do I build my own Lovable" that exists right now. It's not trying to be a Kubernetes distribution or a general-purpose dev environment manager — it's specifically designed for the AI app-builder use case, and that focus shows in every architectural decision. The stop-on-idle model alone makes it viable at a price point that would be impossible with always-on VMs. At 558 stars in its first week, the developer community is clearly paying attention. If you're building a product where users describe apps and see them live, sandboxd should be your starting point. Build on it, harden it as you grow, and ship something real.
