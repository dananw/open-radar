---
name: gsd-core
description: "Context engineering framework that eliminates AI coding agent context rot with fresh-subagent architecture and spec-driven development across 10+ runtimes."
url: https://github.com/open-gsd/gsd-core
stars: 2469
forks: 149
language: JavaScript
tags: ["ai-agents", "context-engineering", "claude-code", "developer-tools", "spec-driven-development"]
featured: false
publishedAt: 2026-06-03
---

## GSD Core

### Overview

GSD Core is a context engineering and spec-driven development framework that gives AI coding agents a disciplined structure for building software. It crossed 2,400 GitHub stars in under two weeks after its May 22 launch — a pace that tells you developers are hitting the wall it addresses. The tagline is "Git. Ship. Done." and the mechanism is a five-step phase loop (Discuss, Plan, Execute, Verify, Ship) that runs heavy work in fresh-context subagents while keeping your main session lean.

The project comes from the OpenBMB ecosystem — the same group behind MiniCPM and other open-source AI tooling — though the primary contributors (trek-e with 1,700+ commits, glittercowboy with 900+) have been driving it as a focused developer-tools project. It's MIT licensed, written in JavaScript/TypeScript, and published on npm as `@opengsd/gsd-core`. The latest release (v1.2.0) dropped May 31 with security hardening and secret scanning improvements.

The core problem GSD Core tackles is **context rot** — the silent quality degradation that happens as an AI agent's context window fills up during a long coding session. This isn't a bug in any specific model. It's a structural property of how transformer attention works over long sequences. Early instructions get pushed to the edges of what the model can attend to. Nuance from the first few exchanges competes against everything that came later. The model doesn't fail loudly; it just starts contradicting earlier decisions, drifting on code style, and hallucinating function signatures it had correct twenty messages ago. GSD Core's answer is to never let a single session accumulate that much history in the first place.

### Why it matters

If you're using Claude Code, Cursor, Copilot, Codex, or any of the half-dozen AI coding assistants available in 2026, you've experienced context rot. You start a session with a clear plan, the agent does good work for the first few tasks, and then quality drops. You `/clear` and lose all context. You try to re-explain, but something is always lost. GSD Core is the first framework I've seen that treats this as a first-class engineering problem rather than something you just tolerate.

The broader trend here is "context engineering" — the idea that how you structure and deliver information to an AI agent matters as much as the model itself. Andrej Karpathy called it the new prompt engineering. GSD Core operationalizes that insight with a concrete system: structured artifacts (STATE.md, CONTEXT.md, PLAN.md, RESEARCH.md) that survive session boundaries, subagents that each start with a clean 200k-token context window, and a verification step that checks what was built against what was planned. It's not magic. It's process.

For fullstack developers juggling React frontends, NestJS APIs, Django services, and Go microservices — the kind of codebase where a single feature might touch five files across three languages — context rot is especially painful. The planning and execution complexity exceeds what a single agent session can hold reliably. GSD Core's phase loop decomposes that work into bounded units that each fit comfortably within a fresh context window.

### Key Features

**Fresh-Context Subagent Architecture.** The central design choice. Your main session acts as a thin orchestrator that spawns specialized subagents — researchers, planners, executors, verifiers — each starting with a clean 200k-token context window. The orchestrator never touches source files directly. It routes work, collects results, and updates shared state. Because it does very little itself, its context window grows slowly and predictably. Heavy work happens in agents that operate at full capacity, unencumbered by accumulated history.

**Five-Step Phase Loop.** Every unit of work moves through Discuss → Plan → Execute → Verify → Ship in order. The Discuss step captures implementation decisions before planning begins. Plan decomposes work into dependency-ordered tasks with explicit acceptance criteria. Execute runs those plans in parallel waves. Verify walks through what was built and generates fix plans for discrepancies. Ship creates the PR and archives the artifacts. Each step exists because it catches a class of failure the previous step cannot.

**Spec-Driven Artifacts.** Every phase produces structured Markdown and JSON files in a `.planning/` directory: CONTEXT.md captures decisions, RESEARCH.md records findings, PLAN.md breaks work into bounded tasks, VERIFICATION.md tracks what passed and what didn't. These aren't throwaway notes — they're durable artifacts that any subsequent agent can read directly. Restart your session, switch machines, hand off to a teammate: the artifacts carry the context forward.

**Multi-Runtime Support.** GSD Core works across Claude Code, OpenCode, Gemini CLI, Kilo, Codex, Copilot, Cursor, Windsurf, Trae, Cline, Augment Code, and more. The installer detects your runtime and configures accordingly. This matters because teams don't all use the same AI coding tool, and GSD Core's value increases when it provides a consistent workflow layer across all of them.

**Context Window Monitoring.** Built-in tracking of how much of each agent's context window is consumed, with alerts when utilization crosses thresholds. This turns a vague "the model seems confused" into a measurable signal. If an executor is at 85% context utilization, you know to expect degraded output and can intervene before the code ships.

**Parallel Execution with Dependency Waves.** Plans are ordered into waves where tasks within the same wave touch non-overlapping concerns. Executors in the same wave run in parallel, each with their own fresh context. When a wave finishes, the orchestrator merges state and starts the next wave. This cuts execution time significantly on multi-file features without introducing merge conflicts.

**Verification Debt Tracking.** When the verifier finds discrepancies between what was planned and what was built, it doesn't just flag them — it generates targeted fix plans and tracks them as "verification debt." You can see at a glance how much cleanup work remains before a phase is genuinely done, not just functionally complete.

### Use Cases

- **Multi-file feature development** — When a feature spans a React component, a NestJS controller, a Prisma migration, and a Go microservice, GSD Core decomposes the work into parallel plans that execute independently and verify against shared acceptance criteria.

- **Long-running refactoring sessions** — Refactors that touch dozens of files across hours of work are where context rot hits hardest. GSD Core's phase loop keeps each refactoring step bounded and verified before moving to the next.

- **Team onboarding to AI-assisted development** — The structured artifacts (PLAN.md, CONTEXT.md) give new team members a readable record of what was decided and why, not just what code was written. It makes AI coding sessions auditable.

- **Cross-cutting concerns** — Authentication, error handling, logging, and other patterns that touch many files benefit from the plan-checker's ability to verify consistency across parallel execution waves.

- **Brownfield codebase integration** — GSD Core includes codebase mapping features that research an existing project's structure, conventions, and patterns before planning any changes. This prevents the common problem of an AI agent generating code that works but doesn't match the project's style.

### Pros and Cons

Pros:

- Solves a real, measurable problem. Context rot is not theoretical — every developer using AI coding assistants has experienced it. GSD Core's approach of fresh subagents with structured artifacts is a genuine architectural solution, not a workaround.

- Runtime-agnostic design means you're not locked into a single AI tool. Teams where some developers use Claude Code and others use Cursor can share the same workflow discipline through GSD Core's abstraction layer.

- The `.planning/` directory full of plain Markdown files is a smart choice. No opaque databases, no vendor-specific formats. You can inspect, edit, version-control, and grep through every artifact the system produces.

- Rapid iteration — the project went from initial commit to v1.2.0 with 100+ features in about 10 days. The contributor activity (1,700+ commits from the primary maintainer) suggests sustained momentum rather than a hype-driven launch.

Cons:

- Overhead is real. Running a full phase loop (Discuss → Plan → Execute → Verify → Ship) takes more elapsed time than just asking an AI to "write this feature." For small, well-understood changes, that overhead isn't justified. The `/gsd-quick` and `/gsd-fast` commands mitigate this, but the primary value is for complex work.

- The learning curve is non-trivial. GSD Core introduces its own vocabulary (phases, milestones, waves, verification debt) and workflow. Developers who are already productive with a simpler "chat and iterate" approach may resist the added ceremony.

- Node.js dependency for installation. The `npx @opengsd/gsd-core@latest` installer requires Node.js, and while there are alternative install paths for other runtimes, the primary experience assumes an npm ecosystem.

- The project is very young (under two weeks old). While the feature set is impressively comprehensive, real-world stability and edge cases haven't been fully tested by a broad user base yet.

### Getting Started

```bash
# Install via npx (requires Node.js)
npx @opengsd/gsd-core@latest

# The installer will prompt for your runtime (Claude Code, Cursor, etc.)
# and whether to install globally or locally

# Start your first project
/gsd-new-project

# Begin the phase loop for your first milestone
/gsd-discuss-phase    # Capture implementation decisions
/gsd-plan-phase       # Research, decompose, and plan
/gsd-execute-phase    # Run plans in parallel waves
/gsd-verify-phase     # Check what was built against what was planned
/gsd-ship-phase       # Create PR and archive

# For quick changes that don't need the full loop
/gsd-quick "fix the login button styling"

# Run the full loop autonomously
/gsd-autonomous       # Runs all phases without pausing
```

### Alternatives

**Claude Code /include and custom instructions** — The simplest approach to context management is manually curating your Claude Code project instructions and using `/include` to load relevant files. This works well for small projects and individual sessions. Choose this over GSD Core when your work is mostly single-file or short-session tasks where context rot isn't a real concern. No external tooling required.

**Aider** — A terminal-based AI coding assistant that supports multiple models and has its own context management through repository maps and chat history files. Aider is lighter weight and more focused on the "chat with your codebase" use case. Choose it over GSD Core when you want a simpler, more direct coding assistant without the phase-loop ceremony. It's better for ad-hoc coding sessions than structured multi-phase projects.

**Cursor / Windsurf built-in context** — IDE-integrated AI tools like Cursor and Windsurf have their own approaches to context management — indexing your codebase, maintaining conversation history, and using rules files. These are more tightly integrated with the editing experience. Choose them over GSD Core when you prefer a GUI-driven workflow and your projects don't require the structured planning artifacts that GSD Core produces.

### Verdict

GSD Core is the most interesting developer tool I've seen come out of the May 2026 GitHub trending wave. It addresses a problem that every developer using AI coding assistants has felt but few have articulated clearly: context rot is the primary bottleneck preventing AI agents from handling complex, multi-file work reliably. The fresh-subagent architecture with structured artifacts is an elegant solution, and the fact that it works across 10+ AI coding runtimes makes it genuinely useful in heterogeneous teams.

The 2,400 stars in under two weeks reflect real demand, not just hype. Developers are shipping AI-assisted features at increasing scale, and the limitations of "just chat with the model" are becoming painful enough that structured alternatives get traction. GSD Core won't replace your AI coding assistant — it wraps around it with process discipline. If you're doing single-file fixes, skip it. If you're building features that span a React frontend, a NestJS API, and a database migration, give it a serious look. The phase loop's overhead pays for itself the first time it prevents a context-rot-driven mistake that would have cost you an afternoon of rework.
