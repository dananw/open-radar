---
name: pilotdeck
description: "PilotDeck is an open-source AI agent operating system with workspace isolation, white-box memory, and smart model routing that cuts LLM costs by 70%."
url: https://github.com/OpenBMB/PilotDeck
stars: 2763
forks: 265
language: TypeScript
tags: ["ai-agents", "llm", "productivity", "agent-os", "model-routing"]
featured: false
publishedAt: 2026-06-02
---

## PilotDeck

### Overview

PilotDeck is an open-source agent operating system built around the concept of WorkSpaces — isolated environments where each project gets its own filesystem, memory store, and skill set. Launched on May 22, 2026, it crossed 2,700 GitHub stars in its first week, which speaks to how hungry developers are for a real agent orchestration platform.

The project comes from serious pedigree: Tsinghua University's THUNLP lab, ModelBest, OpenBMB, and AI9Stars. This is the same group behind MiniCPM and other well-known Chinese AI research projects. When an NLP research group at one of China's top universities ships an open-source tool, it tends to have solid engineering underneath.

The core problem PilotDeck tackles is that most AI agent tools are built for one-shot interactions — you ask, it answers, done. But real productivity work involves multiple projects running in parallel, long-running tasks that need to continue while you're away, and costs that spiral out of control when you send everything to frontier models. PilotDeck addresses all three: workspace-scoped isolation prevents cross-project memory pollution, always-on background execution lets agents keep working after you sign off, and smart routing automatically matches task complexity to the right model tier.

### Why it matters

The agent tooling space has exploded in 2026. Claude Code, Cursor, Codex, and dozens of others compete on reasoning quality and IDE integration. But almost all of them share a fundamental limitation: they treat every interaction as isolated. There's no persistent memory you can inspect, no cost tracking per task, no way to run lightweight sub-agents for simple work while reserving expensive models for hard problems.

PilotDeck's approach — workspace isolation with white-box memory and intelligent model routing — addresses gaps that most agent tools haven't even acknowledged yet. The smart routing benchmarks are particularly compelling: their internal testing shows a 70% cost reduction on social media workflows by routing simple tasks to cheaper models while keeping frontier models for planning checkpoints. On 7 complex benchmark tasks, a "strong main + light sub" routing setup matched or beat single frontier model setups at one-sixth the cost.

For fullstack developers juggling multiple projects — a React frontend here, a NestJS API there, maybe a Go microservice — the workspace isolation model makes intuitive sense. Each project's agent context stays separate. Memory doesn't bleed. And you can actually see and edit what the agent remembers about your project, which is something most competitors can't offer.

### Key Features

**Workspace-Level Isolation.** Every project gets its own file system, memory store, and skill set. Run agents on your React app and your Go backend simultaneously without context pollution. The isolation is enforced at the system level, not just through prompt engineering — each workspace is a genuinely separate environment with bounded retrieval scope.

**White-box Memory System.** Memory generation, extraction, storage, and retrieval are fully visible and auditable. When the AI misremembers something about your codebase, you can pinpoint the exact memory entry that caused it and fix or delete it directly. The built-in Dream Mode consolidates memory during idle windows, and supports one-click rollback to prior states. This is a major differentiator — most agent tools give you zero visibility into their internal memory.

**Smart Model Routing.** Task difficulty is automatically detected and matched to the appropriate model tier. Complex planning and architecture decisions go to flagship models like Claude Opus or GPT-4o, while routine formatting and simple edits drop to lighter models like Sonnet or MiniMax. Their benchmarks show 70% cost reduction on social media workloads and competitive quality at one-sixth the cost on complex multi-task benchmarks.

**Always-on Background Execution.** PilotDeck breaks the synchronous "ask and answer" loop. After you leave, the agent continues discovering candidate tasks, running long-horizon monitors, and delivering results as local files with summary reports. For developers, this means your agent can keep refactoring overnight, run test suites, or monitor build pipelines without you babysitting the terminal.

**MCP Native Support.** The entire system natively supports the Model Context Protocol (MCP), behaving consistently across Web, CLI, and IM frontends. Any MCP server integrates as a first-class plugin. This means the growing ecosystem of MCP tools — from file system access to database queries to web search — works out of the box.

**Open Plugin Architecture.** Extension is straightforward with `plugin.json`-based configuration. Register custom tools, pull community skills via ClawHub, intercept lifecycle hooks like `PreToolUse` and `UserPromptSubmit`, or plug in your own memory store provider. The boundary between core and plugins is strict.

**Multi-Frontend Access.** Run PilotDeck through its Web UI, CLI, or integrate it into IM platforms like WeChat and Feishu. The same workspace, memory, and routing logic works across all interfaces. For teams already using enterprise messaging, this means agents are one message away.

### Use Cases

- **Multi-project fullstack development** — Manage React, NestJS, Django, and Go projects simultaneously with isolated agent contexts and no memory bleed between codebases.
- **Long-running code refactoring tasks** — Kick off a refactoring job on a large codebase, walk away, and come back to completed deliverables with a summary report on disk.
- **Cost-optimized LLM workflows** — Route simple code formatting and boilerplate to cheap models while reserving frontier models for architecture decisions and complex debugging.
- **Content and document generation** — Generate research reports, whitepapers, or documentation through multi-step agent workflows that persist across sessions.
- **AI engineering platform development** — Build and iterate on AI/ML platforms where the agent remembers previous design decisions and can maintain context across long development cycles.

### Pros and Cons

Pros:
- Smart routing benchmarks are real and quantified — 70% cost reduction on production workflows with specific dollar figures ($2.83 vs $12.58 for equivalent quality output).
- White-box memory is genuinely useful. Being able to inspect, edit, and rollback agent memory entries addresses a real pain point that other tools ignore entirely.
- Backed by Tsinghua THUNLP and OpenBMB, with active development from a team that has shipped multiple successful AI research projects (MiniCPM, UltraRAG).
- MCP-native design means it plugs into the growing ecosystem of Model Context Protocol servers without custom adapters.

Cons:
- Open-sourced on May 22, 2026 — this is barely two weeks old. Expect rough edges, incomplete documentation, and potential breaking changes in the near term.
- The UI and docs have a strong Chinese-language bias. English documentation exists but is thinner, and some UI elements default to Chinese.
- AGPL v3.0 license is restrictive for commercial use. If you're building a product that embeds PilotDeck, you'll need to evaluate the license implications carefully.
- Docker and macOS/Linux focused. Windows developers will need WSL2 or a container-based setup.

### Getting Started

```bash
# Option A: One-line install (macOS / Linux)
curl -fsSL https://raw.githubusercontent.com/OpenBMB/PilotDeck/main/install.sh | bash

# Start the server
pilotdeck            # opens at http://localhost:3001
pilotdeck status     # check runtime status

# Option B: From source
git clone https://github.com/OpenBMB/PilotDeck.git
cd PilotDeck
npm install
cd ui && npm install

# Configure your model provider (or use the Web UI settings panel)
# Edit ~/.pilotdeck/pilotdeck.yaml:
cat > ~/.pilotdeck/pilotdeck.yaml << EOF
schemaVersion: 1
agent:
  model: deepseek/deepseek-v4-pro
model:
  providers:
    deepseek:
      protocol: openai
      url: https://api.deepseek.com/v1
      apiKey: YOUR_KEY_HERE
EOF

# Start in dev mode
cd ui && npm run dev    # http://localhost:5173

# Option C: Docker Compose
docker compose up -d
```

### Alternatives

**Claude Code** — Anthropic's agent tool excels at single-session coding tasks with deep reasoning and tight IDE integration. It's more mature and polished than PilotDeck, but lacks workspace isolation, white-box memory, and multi-model routing. Choose Claude Code when you need the best single-model reasoning for focused coding sessions.

**OpenCode** — A terminal-based coding agent with a focus on simplicity and the developer CLI experience. It's lighter weight and easier to get started with, but doesn't offer background execution, memory management, or cost optimization features. Choose OpenCode when you want a straightforward CLI agent without the orchestration overhead.

**Claude Cowork** — Anthropic's project-level agent isolation tool that introduced the concept of per-project agent environments on desktop. It's more tightly integrated with the Claude ecosystem but less flexible in model choice and lacks the smart routing and always-on capabilities. Choose Cowork when you're already deep in the Anthropic ecosystem and want native integration.

### Verdict

PilotDeck is the most interesting agent orchestration platform I've seen in 2026. The smart routing alone — cutting LLM costs by 70% while maintaining output quality — justifies giving it a serious look. The white-box memory system solves a problem that most agent tools haven't even acknowledged: you should be able to see and control what your AI remembers. The workspace isolation model maps directly to how developers actually work across multiple projects. It's barely two weeks old and shows it — the docs are rough, the English support is incomplete, and the AGPL license will scare off some commercial users. But the engineering underneath is solid, the backing team has real research credentials, and 2,700 stars in a week suggests the developer community sees the same potential I do. If you're running multiple AI-assisted projects and burning money on frontier models for every task, PilotDeck is worth evaluating now, even in its early state.
