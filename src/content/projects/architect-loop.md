---
name: architect-loop
description: "Claude Fable 5 as architect, GPT-5.5 Codex as builder — a research-backed cross-vendor agent loop skill for Claude Code with parallel worktrees and frozen gates."
url: https://github.com/DanMcInerney/architect-loop
stars: 322
forks: 22
language: HTML
tags: ["ai-agents", "claude-code", "multi-agent", "developer-tools", "coding-agents"]
featured: false
publishedAt: 2026-06-14
---

## architect-loop

### Overview

architect-loop is a Claude Code skill that splits AI coding work across two models: Claude Fable 5 handles planning, spec-writing, and review, while GPT-5.5 Codex handles implementation and research. It launched on June 12, 2026, and crossed 300 GitHub stars in two days. For a project that's essentially a collection of prompt engineering files and shell scripts, that kind of traction tells you something about where the AI coding ecosystem is heading.

The project comes from Dan McInerney, a security researcher with a long track record in offensive security tooling. The origin is practical: he saw a post by @jumperz on X about using Fable with Codex subagents, couldn't find an easy way to run that pattern, and built it. The design document backs every decision with citations from research on multi-agent systems, weak planners vs. weak executors, and production deep-research architectures.

The core idea is simple but powerful. Most AI coding agents operate as a single model doing everything — planning, coding, testing, reviewing. architect-loop argues that weak planners hurt more than weak executors, so it assigns the planning role to the strongest reasoning model available (Claude Fable 5) and delegates execution to a fast, capable builder (GPT-5.5 Codex). The repo itself serves as the only shared memory — specs, gates, lane files, and git history. Nothing exists outside the repo. This constraint forces rigor: if it's not committed, it didn't happen.

### Why it matters

The single-model coding agent is hitting its ceiling. Claude Code, Codex, Cursor — they're all impressive, but they share a fundamental limitation: one context window doing everything. Planning degrades when the model is also worrying about implementation details. Execution suffers when the model is second-guessing its own architecture. architect-loop addresses this by giving each model a role that matches its strengths.

This is also the first serious open-source implementation of cross-vendor multi-agent coding. Claude and GPT-5.5 have different strengths — Claude's reasoning is deeper, Codex's implementation speed is unmatched. Using them together, with the repo as the coordination layer, is a pattern that will likely become standard as more capable models arrive. The research backing is solid: the DESIGN.md file cites studies on manager-worker topologies, frozen external gates vs. trusting agent self-reporting, and why memory files rot.

For fullstack developers building with React, NestJS, Django, or Go, the practical value is clear. architect-loop can spec a feature, split it into parallel worktrees with non-overlapping file sets, dispatch builders to implement each slice independently, and then have the architect verify that the actual diff matches the spec's intent — not just that tests pass. That last point matters: the project explicitly notes that passing tests do not equal mergeable work, and that agents game visible tests.

### Key Features

**Architect-Builder Split.** Claude Fable 5 acts as the architect — it specs work, defines acceptance gates, dispatches builders, and judges results. It never writes code. GPT-5.5 Codex acts as the builder — it receives a spec, argues with it (silent compliance is treated as a defect), implements only its declared files, and reports raw results. This separation means each model operates in a role that matches its strengths, and neither context window gets polluted with the other's concerns.

**Parallel Worktree Isolation.** Each builder runs in its own git worktree, so file conflicts are structurally impossible. The architect checks file sets for overlap before dispatching. If two lanes touch the same file, the spec gets re-split. This isn't just good practice — it's the difference between a multi-agent system that works and one that creates merge conflicts faster than a human team.

**Frozen Acceptance Gates.** The architect writes acceptance criteria to `docs/gates/` before any builder starts. These gates are read-only — if a builder edits a gate file, the slice fails automatically. The architect then runs the gate commands itself, because builder claims are treated as hearsay. This pattern comes directly from production systems where self-reported success from agents is unreliable.

**Research Loop with Source Discipline.** The `/architect-research` command runs a separate research workflow: a cheap Codex scout maps the topic (~10 searches), Fable designs 3-6 topic-specific lanes from the scout's map, parallel Codex researchers run under hard budgets with strict findings discipline (URL + date + quote + confidence tag; NOT FOUND beats inference), and Fable verifies with ≥2 independent sources per load-bearing claim before writing a decision-oriented report.

**Repo as Only Memory.** All state lives in the repository — `docs/HANDOFF.md` (a short table of contents, pruned every session), `docs/gates/`, `docs/lanes/`, and git history. Not in the repo = didn't happen. This is a deliberate design choice backed by research showing that external memory files rot over time. The handoff file stays short by design, with detail living in linked gate and lane files.

**Supervision and Stall Triage.** The system includes liveness checks on dispatched builder runs, stall triage that diagnoses the child process tree and kills the narrowest failing process, and explicit timeouts on every long command. If a builder wrecks things, nothing reaches a branch until the architect's tamper, boundary, and gate checks pass — worktrees are discarded and re-dispatched from the freeze commit.

**No API Keys Required.** Runs on subscriptions you already have. Claude Code uses your Claude plan; Codex CLI uses your ChatGPT plan. The cost model is transparent: builder runs draw on your ChatGPT plan's 5-hour and weekly quotas, while the architect's sessions are minutes, not hours.

### Use Cases

- **Feature development for fullstack apps** — Spec a React component with NestJS backend, split into frontend and backend lanes, dispatch builders in parallel, and have the architect verify integration. Works for any stack that runs in a container.

- **Codebase refactoring** — The architect identifies refactoring targets, specs the changes with acceptance gates, and dispatches builders to handle isolated file sets. The frozen gate pattern prevents builders from making changes that break the refactoring contract.

- **Research-before-build decisions** — Use `/architect-research` to evaluate libraries, architectures, or approaches before committing to implementation. The source discipline (citations, confidence tags, adversarial verification) produces reports you can actually trust.

- **Multi-framework projects** — When your project spans React frontend, Go microservices, and Python data pipelines, architect-loop can assign each framework to a specialized builder lane while the architect maintains cross-cutting consistency.

- **Open source contribution workflows** — Fork, run architect-loop to spec and implement a feature with proper gates and review, and submit a PR that includes the spec, gates, and evidence. Reviewers get a clear audit trail.

- **Teaching and onboarding** — The spec-first, gate-enforced workflow forces explicit thinking about what "done" means before any code is written. Useful for teams adopting AI coding tools who need guardrails.

### Pros and Cons

Pros:

- Research-backed design with citations for every major decision. This isn't a weekend project — the DESIGN.md file references studies on multi-agent coordination, memory decay, and production deep-research architectures.
- Cross-vendor approach leverages the actual strengths of different models rather than forcing one model to do everything. Claude's reasoning depth paired with Codex's implementation speed is a practical combination.
- The frozen gate pattern addresses the real problem of agents gaming visible tests and producing PRs that pass CI but aren't actually mergeable work.

Cons:

- Requires both a Claude subscription and a ChatGPT subscription. The cost of running both plans may not be justified for small projects or solo developers on a budget.
- Only 322 stars and 22 forks — the community is small and the project is two days old. Expect rough edges, and don't count on Stack Overflow answers yet.
- The workflow is heavier than a single-model approach. For simple tasks (fix a typo, add a CSS class), running the full architect-builder loop is overkill. This is designed for multi-file, multi-slice work.

### Getting Started

```bash
# Clone and install
git clone https://github.com/DanMcInerney/architect-loop.git
cd architect-loop && ./install.sh

# Install the Codex CLI (builder)
npm i -g @openai/codex@latest

# Run the build loop (in any repo with Claude Code configured)
/architect

# Run the research loop
/architect-research <what you're considering>
```

The install script adds two skills to Claude Code. You need Claude Code on any paid plan and the Codex CLI signed into a ChatGPT plan. No API keys required — it runs on your existing subscriptions.

### Alternatives

**Claude Code with subagents** — Claude Code has built-in subagent support where a primary model dispatches work to child sessions. architect-loop improves on this by adding cross-vendor capability (using Codex instead of another Claude session), frozen gates that builders can't tamper with, and research-backed supervision patterns. Choose Claude Code subagents when you want simplicity and don't need the architect-builder separation.

**Duel-Agents** — A routing layer that runs prompts against multiple LLM models and picks the cheapest winning answer. Different philosophy: Duel-Agents optimizes for cost by trying the same task on different models, while architect-loop optimizes for quality by giving different roles to different models. Choose Duel-Agents when you want to save money on single tasks; choose architect-loop when you want to tackle complex multi-file work.

**Manual multi-agent orchestration** — You could build this pattern yourself with shell scripts, Claude Code's API, and Codex CLI. architect-loop saves you the research (12 enforced rules, failure-mode table, cited sources) and the implementation (dispatch.md, stall triage, worktree fan-out). Choose manual orchestration when you need full control over the workflow; choose architect-loop when you want the research-backed defaults.

### Verdict

architect-loop is the most thoughtful multi-agent coding skill I've seen. The cross-vendor approach — using Claude for planning and Codex for execution — is smart engineering, not hype. The research backing is real: every design decision in DESIGN.md has a citation, and the frozen gate pattern directly addresses the well-documented problem of agents producing code that passes tests but isn't actually correct. At 322 stars in two days, the community is responding to something real here. If you're already paying for both Claude and ChatGPT plans, and you're working on anything more complex than a single-file fix, architect-loop is worth trying. The spec-first, gate-enforced workflow forces better thinking even when the models are the same ones you'd use anyway.
