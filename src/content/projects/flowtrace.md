---
name: flowtrace
description: "Flowtrace turns AI agent tasks into structured, reusable flows with git-backed audit trails — no more lost chat logs or opaque one-shot runs."
url: https://github.com/AIScientists-Dev/Flowtrace
stars: 387
forks: 22
language: TypeScript
tags: ["ai-agents", "developer-tools", "workflow", "cli", "traceability"]
featured: false
publishedAt: 2026-06-19
---

## Flowtrace

### Overview

Flowtrace is an open-source CLI and web UI that turns AI agent work into structured, inspectable, reusable flows. Instead of running a task in a chat window and losing the output when you close the tab, Flowtrace breaks the work into discrete steps, writes each step's output to disk, and tracks the whole run in git. You get a visual flow you can follow, verify, steer, and re-run.

The project comes from MorphMind AI and landed on GitHub in early May 2026. It's small — 387 stars and 22 forks as of mid-June — but the idea resonates with anyone who's tried to use Claude Code, Codex, or Cursor for anything beyond a quick question. The problem it solves is real: agent sessions are opaque, ephemeral, and hard to reproduce. Flowtrace gives them structure.

The core mechanic is simple. You define a trace — a JSON file describing steps, their dependencies, and the final deliverable. The agent runs through the steps one at a time. Each step writes its output to a file. The whole thing lives in a git repository, so every change is committed, every state is recoverable, and you can diff any two runs. A built-in web server at `localhost:3000` visualizes the flow as a node graph with live status.

### Why it matters

AI coding agents are becoming a standard part of the developer toolkit. Claude Code, Codex, Cursor, Windsurf — the list grows every month. But the interaction model is still fundamentally chat-based. You type a request, the agent does work, and you scroll through a wall of text trying to figure out what happened. For a quick code fix, that's fine. For anything complex — a security audit, a research report, a multi-step data pipeline — it falls apart.

The industry is starting to recognize this. Agent harnesses, coding frameworks, and structured execution models are the hottest category on GitHub right now. Flowtrace sits in a specific niche: it's not another agent framework or a replacement for Claude Code. It's a layer that sits on top of your existing agent and gives the work a shape you can inspect, version, and repeat.

The git-backed audit trail matters more than people realize. In regulated industries — finance, healthcare, government — being able to show exactly what an AI agent did, step by step, with full provenance, is not a nice-to-have. It's a requirement. Flowtrace provides that out of the box, not as a bolt-on compliance feature but as the fundamental data model.

### Key Features

**Step-Based Execution Model.** A trace is a directed graph of steps, declared in `trace.json`. Each step has a contract (`STEP.md`), its own scripts, and its own resources. The agent moves through steps sequentially or in parallel based on dependencies. This is fundamentally different from a chat thread — the structure is explicit, not implicit.

**Git as Audit Trail.** Every CLI write makes one git commit, scoped to exactly the paths it changed. State files, reply files, and asset files are committed. Scratch files stay untracked. You get a complete, diffable history of every run without configuring anything. Stop a run midway, come back days later, and resume from exactly where you left off.

**Steerable Re-Execution.** Fix one step and only what depends on it re-runs. The rest stays put. This is the killer feature for complex workflows — if step 3 of 12 produces a bad chart, you fix step 3 and steps 4 through 12 re-run with the corrected input. Steps 1 and 2 are untouched. No redoing work that was already correct.

**Built-In Web Viewer.** Run `flowtrace serve` and open `http://localhost:3000` to see your trace as an interactive node graph. Each step lights up as it runs. Click any step to see its full output, version history, and the files it produced. Time-travel through the git history right in the browser.

**Agent-Native Design.** Flowtrace works with Claude Code, Codex, and Cursor out of the box. You can point any of these agents at a trace folder and say "run this." The agent reads the step contracts, executes each one, and writes structured outputs. There's also a `/make-trace` skill that turns any existing skill file, runbook, or chat log into a trace.

**Nine Reference Examples.** The repo ships with production-quality examples spanning multiple domains: SaaS acquisition due diligence, security CI/CD pipeline gates, tailored resume generation, comprehensive stock analysis, industry deep-dive reports, bug-fix learning loops, weekly paid-ads optimization, talk-to-deck conversion, and distilling expertise into reusable skills. Each example runs with one command.

**Structured Data Flow.** Steps pass data through files, not parameters. Each step writes its output to a known location, and downstream steps read from there. This means intermediate results are always inspectable — you can open any file at any point and see exactly what the agent produced, not just its summary.

### Use Cases

- **Multi-step research and analysis** — Run a stock analysis or due diligence report as a trace where each research angle is a separate step. Verify each finding independently, fix bad assumptions without redoing the whole report, and keep the full provenance chain.

- **Security and compliance gates** — Build CI/CD security checks as a trace with pass/fail gates at each step. The git history proves what was checked, what passed, and what was flagged. Useful for SOC 2, HIPAA, or any environment that requires audit trails.

- **Reusable content pipelines** — Turn a one-off task (writing a blog post, generating a slide deck, building a report) into a trace you can re-run with new inputs. The method is captured, not just the output.

- **Team handoffs** — When one developer starts a complex agent task and another needs to finish it, the trace captures the full state. Every step's inputs, outputs, and decisions are in files and git history, not buried in a chat export.

- **Agent skill development** — Use Flowtrace to iterate on agent skills. Run a skill as a trace, see which steps produce bad outputs, adjust the step contract, and re-run. The version history shows exactly what changed and why.

### Pros and Cons

Pros:

- Solves a real problem that every developer using AI agents has encountered — the opacity and ephemerality of agent work. The git-backed approach is elegant and requires zero configuration.
- Works with existing tools (Claude Code, Codex, Cursor) rather than requiring you to adopt a new agent framework. Low switching cost.
- The step-based model with selective re-execution saves significant time on complex workflows where parts of the output are correct and parts need fixing.
- MIT licensed with nine production-quality examples that demonstrate real use cases, not toy demos.

Cons:

- Early stage with 387 stars means the community is small. Finding help, plugins, or pre-built traces outside the nine examples requires building your own.
- The trace definition format (`trace.json` + `STEP.md`) adds overhead for simple tasks. If you just need a quick code fix, Flowtrace is overkill — it earns its place on tasks complex enough to need structure.
- Local-only by default. The web viewer runs on localhost. There's no hosted version, no team collaboration features, and no cloud sync. Fine for individual developers, limiting for teams that want shared trace visibility.
- TypeScript/Node.js dependency. The CLI is a Node.js application, which adds a runtime requirement for developers not already in that ecosystem.

### Getting Started

```bash
# Clone and install
git clone https://github.com/AIScientists-Dev/flowtrace.git
cd flowtrace
./scripts/install.sh        # builds + symlinks flowtrace to ~/.local/bin/

# Try a reference example
bash scripts/examples/tailored-resume/build.sh   # → ~/traces/tailored-resume/
flowtrace serve                                   # → http://localhost:3000

# Or point your agent at it
# In Claude Code / Codex / Cursor, open the flowtrace folder and say:
# "Install Flowtrace and run the tailored-resume example."
```

To create your own trace, copy the `/make-trace` skill into your agent's skills directory and run `/make-trace` against any existing skill file, runbook, or chat log. The skill generates a trace skeleton you can customize.

### Alternatives

**AgentSkills / SKILL.md ecosystem** — The broader agent skills community (Addy Osmani's agent-skills, BuilderIO/skills, and the SKILL.md convention) provides structured ways to define agent tasks. These are complementary rather than competitive — you can turn any SKILL.md into a Flowtrace. The difference is that SKILL.md defines *what* to do; Flowtrace captures *what happened* when you did it.

**LangGraph / CrewAI** — These are full agent frameworks that define multi-step workflows in code. They're more powerful for building custom agent systems but require you to adopt their programming model. Flowtrace is lighter — it sits on top of your existing agent and adds structure after the fact. Choose LangGraph if you're building a custom agent system; choose Flowtrace if you want to add structure to work you're already doing with Claude Code or Codex.

**Humanloop / LangSmith** — These are observability platforms for LLM applications. They track API calls, costs, and outputs. Flowtrace is different — it's not about monitoring an API, it's about structuring the work itself. The trace is the artifact, not a log of the artifact's creation. Choose observability platforms for production LLM apps; choose Flowtrace for developer-facing agent workflows.

### Verdict

Flowtrace is the kind of tool that makes you wonder why nobody built it sooner. The core insight — that agent work needs structure, not just more chat — is obvious in hindsight. Every developer who's used Claude Code for a complex task has felt the pain of scrolling through hundreds of lines of output trying to figure out what happened. Flowtrace fixes that with a simple, git-native model that requires zero infrastructure.

It's early days. 387 stars, nine examples, a small Discord community. But the architecture is clean, the problem is real, and the solution is appropriately scoped — it doesn't try to replace your agent or your editor, it just gives the work a shape. If you're doing anything with AI agents beyond quick one-off questions, Flowtrace is worth the 10 minutes it takes to try one of the examples. The stock analysis trace alone is a compelling demo.
