---
name: xiaoluolyg-god
description: "GOD is an open-source real-time control room for AI agent societies — pause time, whisper to agents, and inject instructions from a React/Vite + FastAPI stack."
url: https://github.com/XiaoLuoLYG/GOD
stars: 626
forks: 83
language: Python
tags: ["ai-agents", "multi-agent", "react", "simulation", "control-room"]
featured: false
publishedAt: 2026-06-16
---

## GOD · Govern · Observe · Direct

### Overview

GOD is an open-source control room for simulating and steering societies of AI agents in real time. It crossed 600 GitHub stars in its first month after launching in May 2026, which is notable for a research-oriented tool that isn't backed by a major company or a viral marketing push.

The project comes from XiaoLuoLYG, a developer working at the intersection of multi-agent simulation and web technology. The architecture is a full-stack React/Vite frontend paired with a Python/FastAPI backend and a WebSocket-connected agent runtime. If you've ever wanted to build a SimCity-style world where every resident is powered by an LLM — and you want to pause, poke, and redirect them mid-simulation — this is the tool for that.

The core problem GOD solves is observability and control in multi-agent systems. Most agent frameworks let you run agents and watch outputs. GOD lets you intervene. Pause the simulation at any step, whisper a question to a single agent or broadcast to the whole town, inject instructions that agents read on their next turn, then scrub backward through a pixel-perfect replay. It's the difference between watching a security camera feed and being able to walk into the room and talk to the people on screen.

### Why it matters

Multi-agent AI is moving from research papers to production systems fast. Companies are building customer support swarms, coding agent teams, and workflow orchestration platforms where dozens of LLM agents interact simultaneously. The problem is that these systems are black boxes — you see inputs and outputs but can't observe or influence the intermediate reasoning steps.

GOD addresses that gap with a visual, interactive approach. The React frontend renders a pixel-art town map where you watch agents move between locations, interact with each other, and carry out their routines. You can click any agent to see their full profile — age, personality, goals, relationships, current emotional state. Then you can inject a message mid-run and watch how it cascades through the social network.

For fullstack developers, this is an interesting architectural reference. The frontend uses React 18 with Vite 6, communicating over WebSocket with a FastAPI backend. The agent runtime runs out-of-process and connects via local WebSocket. Experiment data, replay stores, and configuration all live in local SQLite. It's a clean separation of concerns that any web developer can understand and extend.

### Key Features

**Pause-and-Scrub Replay Control.** GOD treats agent simulation as a timeline you can navigate. Pause at any step, jump to a specific point, fast-forward, or auto-play. The pixel town map updates in real time to show each agent's location, action, and status at any given moment. This is fundamentally different from log-file debugging — you're watching a visual replay, not scrolling through text.

**Mid-Run Agent Communication.** Send natural-language questions to a single agent, a group, or the entire town while the simulation is running. Use the `/ask` command with `@AgentName` mentions to target specific residents. The agent reads your question on its next turn and responds in character, based on their personality, current situation, and relationship context.

**Real-Time Instruction Injection.** The `/intervene` command lets you inject instructions that agents incorporate into their next reasoning step. Want to see how a town reacts to a sudden event? Inject "A thunderstorm rolls in" and watch the agents adapt their behavior. This is powerful for testing how agent societies handle unexpected situations.

**No-Code Setup Wizard.** A browser-based wizard walks you through creating an experiment: paste your OpenAI-compatible API key, choose or describe a scenario, let GOD generate agent profiles and step plans, edit them in a visual editor, then launch. No `.env` file editing, no CLI flags, no glue scripts. The wizard handles model configuration, scenario creation, agent generation, and map selection.

**Agent Studio and Map Studio.** Two visual editors for customizing your simulation. Agent Studio is a map-aware wizard for creating residents — define their seed, identity, appearance, personality, routine, relationships, and goals. Map Studio lets you generate or upload a Tiled JSON map, calibrate locations and collisions, validate it, and publish it as a local map package. Both editors run in the browser.

**Pluggable Map System.** Maps are self-contained packages in `agentsociety/custom/maps/<map_id>/` with YAML configuration, Tiled JSON layouts, PNG tilesets, and optional character and location assets. GOD discovers map packages automatically — drop one in the folder and it appears in the setup wizard. Two built-in experiments ship out of the box: a 10-resident slice-of-life town and a PKU campus scenario.

**Local-First Architecture.** Everything runs on your machine. The control room, backend, runtime, experiment files, and replay store are all local. The only external dependency is your chosen LLM endpoint (any OpenAI-compatible API works). No cloud accounts, no data leaving your machine, no vendor lock-in.

### Use Cases

- **Multi-agent research and prototyping** — Test how agent populations react to different stimuli, social structures, and environmental changes without building infrastructure from scratch.
- **LLM behavior analysis** — Observe how different models handle complex social reasoning, emotional responses, and multi-party conversations in a controlled environment.
- **Educational demonstrations** — Show students or stakeholders how AI agents make decisions, form relationships, and respond to interventions in a visual, intuitive format.
- **Game AI prototyping** — Build and test NPC behavior systems with real LLM-driven characters before integrating into a game engine.
- **Fullstack architecture reference** — Study the React/Vite + FastAPI + WebSocket + SQLite stack as a template for building real-time interactive applications with AI backends.

### Pros and Cons

Pros:
- The pause-whisper-intervene loop is genuinely novel. No other open-source tool gives you this level of real-time control over agent societies with a visual interface.
- Clean fullstack architecture (React 18, Vite 6, FastAPI, WebSocket, SQLite) that any web developer can understand, fork, and extend.
- Local-first design means zero cloud dependencies beyond your LLM API key. Works with any OpenAI-compatible endpoint.
- Active development — 6 PRs merged in the first month covering localization, command UI, Agent Studio, and Map Studio.

Cons:
- Alpha status with a small team. The API surface and data formats are likely to change, and documentation beyond the README is thin.
- The pixel-art town aesthetic is charming but may feel limiting for developers who want a more clinical, data-heavy visualization of agent behavior.
- Python 3.11+ required for the backend, and the setup script assumes a Unix-like environment. Windows support exists via `god.cmd` but is less tested.
- Performance with large agent populations (50+) is unproven — the current demos use 10 residents, and scaling the WebSocket replay to hundreds of agents could hit bottlenecks.

### Getting Started

```bash
# Clone and start (the script handles everything)
git clone https://github.com/XiaoLuoLYG/GOD.git
cd GOD
./scripts/god.sh start
```

On Windows PowerShell:

```powershell
.\scripts\god.cmd start
```

The script installs dependencies, opens a browser-based setup wizard, and waits for you to configure your model and experiment. Point it at any OpenAI-compatible API (OpenAI, OpenRouter, local vLLM, Ollama with OpenAI mode) and choose a built-in experiment or create your own.

Useful commands:

```bash
./scripts/god.sh configure  # reopen setup wizard
./scripts/god.sh new-run    # wipe and restart current experiment
./scripts/god.sh status     # check ports and model status
./scripts/god.sh stop       # shut down everything
```

### Alternatives

**Generative Agents (Stanford)** — The original "Smallville" paper and codebase that inspired projects like GOD. Stanford's implementation is research-grade with detailed social behavior modeling but has no visual control room, no pause/scrub replay, and no real-time intervention. Choose it if you're doing academic research and need the exact paper implementation.

**AutoGen (Microsoft)** — A multi-agent conversation framework focused on task-solving agent teams rather than social simulation. AutoGen is more mature and better documented, with support for complex agent topologies and tool use. Choose it if you need agents to collaborate on coding, analysis, or workflow tasks rather than simulating social behavior.

**CrewAI** — A production-oriented multi-agent framework with role-based agent design and task delegation. CrewAI has better documentation, more integrations, and a larger community. Choose it if you're building a real product with agent teams and need reliability over simulation fidelity.

### Verdict

GOD is the most interesting multi-agent visualization tool I've seen this year. The idea of a "god mode" for agent societies — pause time, whisper to individuals, inject chaos, watch it ripple — is compelling for anyone building or studying multi-agent systems. The React/Vite + FastAPI stack makes it approachable for fullstack developers, and the local-first architecture means you can experiment without worrying about cloud costs or data privacy.

It's early-stage software. The 626-star growth in one month without any major company backing suggests real developer interest, but the small team and alpha status mean you should treat it as a research tool, not production infrastructure. If you're a fullstack developer curious about multi-agent AI, GOD is worth cloning and running for an afternoon. You'll learn more about agent behavior in 30 minutes of interactive play than in hours of reading papers.
