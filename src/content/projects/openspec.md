---
name: openspec
description: "OpenSpec is a spec-driven development framework for AI coding assistants — write specs before code, then let your AI implement them with 25+ tool integrations."
url: https://github.com/Fission-AI/OpenSpec
stars: 53145
forks: 3725
language: TypeScript
tags: ["spec-driven-development", "ai-coding", "context-engineering", "developer-tools", "typescript"]
featured: false
publishedAt: 2026-06-06
---

## OpenSpec

### Overview

OpenSpec is a spec-driven development (SDD) framework that sits between you and your AI coding assistant. It forces a structured planning phase before any code gets written — proposals, specs, design docs, task lists — so your AI actually knows what to build instead of guessing from a vague chat prompt. The project has exploded to 53,000+ GitHub stars and 484,000 monthly npm downloads as of June 2026, making it one of the fastest-growing developer tools this year.

The project comes from Fission AI, a team that's been building at the intersection of AI tooling and developer workflows. Their thesis is simple: AI coding assistants are powerful but unreliable when requirements only live in chat history. You describe what you want, the AI builds something, and three iterations later you're still arguing about edge cases that should have been specified upfront. OpenSpec adds a lightweight structure layer that aligns human intent and AI output before implementation begins.

The core problem it solves is context engineering for AI agents. Every fullstack developer using Claude Code, Cursor, Copilot, or Codex has experienced the frustration of AI-generated code that misses the mark. Not because the model is dumb, but because the prompt was ambiguous. OpenSpec creates a persistent, structured artifact trail — proposal, specs, design, tasks — that gives AI assistants the context they need to produce correct code on the first pass. According to their docs, teams using the expanded workflow report significantly fewer revision cycles.

### Why it matters

The "vibe coding" era has a quality problem. Developers are shipping AI-generated code faster than ever, but the defect rate is climbing. A May 2026 survey from Stack Overflow found that 67% of developers using AI coding tools regularly encounter unexpected behavior in generated code. The root cause isn't model capability — it's specification gaps. OpenSpec addresses this directly by making specs a first-class part of the AI coding workflow, not an afterthought.

What makes OpenSpec particularly interesting is its tool-agnostic approach. It doesn't care whether you're using Claude Code, Cursor, Codex, Gemini CLI, GitHub Copilot, or any of the 25+ supported tools. It installs skills and slash commands into whichever tools you select, and the workflow stays consistent. This matters because the AI coding tool landscape changes monthly, and locking into one tool's workflow is risky. OpenSpec gives you a portable planning layer that survives tool switches.

The timing connects to a broader industry shift toward "context engineering" — the idea that the quality of AI output depends more on the quality of input context than on model improvements alone. OpenSpec is essentially a context engineering framework for software development, and its rapid adoption suggests the market agrees this is the right abstraction level.

### Key Features

**Slash Command Workflow.** OpenSpec exposes a set of `/opsx:` slash commands that work inside your AI coding tool. The core set includes `propose`, `explore`, `apply`, `sync`, and `archive`. Run `/opsx:propose add-dark-mode` and the AI scaffolds a complete change folder with proposal, specs, design doc, and task checklist. Then `/opsx:apply` implements the tasks. It's a structured conversation, not a freeform chat.

**25+ Tool Integrations.** OpenSpec supports Claude Code, Cursor, Codex, Gemini CLI, GitHub Copilot, Windsurf, Cline, RooCode, OpenCode, Kiro, Amazon Q Developer, and many more. During `openspec init`, you select which tools to configure, and it installs the appropriate skills and command files. This is the broadest tool support of any spec framework I've seen.

**Brownfield-First Design.** Most spec tools assume you're starting from scratch. OpenSpec's delta-based approach works with existing codebases. You specify changes to existing behavior, not full system descriptions. This makes it practical for the majority of real-world development, which happens on established projects.

**Artifact-Guided Implementation.** The workflow produces structured artifacts — `proposal.md`, `specs/`, `design.md`, `tasks.md` — that serve as persistent context for your AI assistant. Each artifact answers a different question: why are we building this, what exactly needs to happen, how will it work technically, and what's the implementation order. The AI reads these artifacts instead of relying on ephemeral chat context.

**Coordination Workspaces.** For multi-repo projects, OpenSpec supports coordination workspaces that link multiple repositories into a unified planning view. This is beta functionality, but it addresses a real need for teams where a feature spans frontend, backend, and infrastructure repos.

**CLI and Programmatic Access.** Beyond slash commands, OpenSpec has a full CLI (`openspec init`, `openspec update`, `openspec config profile`) for setup and configuration. Non-interactive modes support CI/CD integration with `--tools` and `--profile` flags. You can script the entire setup for team onboarding.

**Community Schema Ecosystem.** Third-party schema bundles let you customize workflows and artifact templates. Think of them as plugins for the planning process itself — opinionated workflow templates that match your team's engineering culture.

### Use Cases

- **Feature development on existing codebases** — Use `/opsx:propose` to define a feature, generate specs and design docs, then let your AI implement it task by task. Works especially well for complex features that touch multiple files and services.
- **Team onboarding and alignment** — New team members read the `openspec/specs/` directory to understand how the system works. Changes are documented in `openspec/changes/` with full context on what was decided and why.
- **Multi-tool development workflows** — Teams where some developers use Cursor and others use Claude Code can share the same spec artifacts. The planning layer is tool-agnostic.
- **Refactoring large codebases** — Use the spec system to document current behavior before refactoring, then use `/opsx:apply` to implement changes incrementally with verification at each step.
- **AI-assisted code review** — The spec artifacts serve as a review checklist. Reviewers can verify implementation against the documented spec, not just the diff.

### Pros and Cons

Pros:
- 484,000 monthly npm downloads and 53K GitHub stars indicate massive community adoption and ongoing investment. This isn't a abandoned side project.
- Tool-agnostic design means you're not locked into any single AI coding assistant. Switch tools without losing your workflow.
- The brownfield-first philosophy makes it practical for real projects, not just greenfield demos. Most development happens on existing codebases.
- MIT licensed with active development — the expanded workflow with coordination workspaces shows the team is thinking beyond simple use cases.

Cons:
- Adds ceremony to the coding workflow. For small changes (bug fixes, typos, simple additions), the propose-spec-design-tasks cycle feels like overhead. The core profile helps, but there's still friction.
- Quality depends on model capability. OpenSpec works best with high-reasoning models like Claude Opus or Codex 5.5. Using weaker models produces mediocre specs that don't meaningfully improve output.
- The 384 open issues suggest the API surface is still evolving. Expect breaking changes as the project matures.

### Getting Started

```bash
# Install globally
npm install -g @fission-ai/openspec@latest

# Navigate to your project and initialize
cd your-project
openspec init

# Select your AI tools during setup (Claude Code, Cursor, Codex, etc.)
# Then use slash commands in your AI assistant:
# /opsx:propose your-feature-name
# /opsx:apply
# /opsx:archive
```

For team setups with specific tools:

```bash
# Configure specific tools non-interactively
openspec init --tools claude,cursor

# Configure all supported tools
openspec init --tools all

# Use expanded workflow
openspec config profile
openspec update
```

### Alternatives

**Spec Kit (GitHub)** — GitHub's official spec framework that's more thorough but significantly heavier. Spec Kit uses rigid phase gates and requires more setup. Better choice if you want maximum rigor and don't mind the ceremony. OpenSpec is lighter and more flexible for teams that want structure without waterfall.

**Kiro (AWS)** — AWS's AI-powered IDE that has spec-driven development baked in natively. Kiro is powerful but locks you into their IDE and limits you to Claude models. OpenSpec works with the tools and models you already use, which matters if your team has diverse tool preferences.

**No spec tool at all** — Plenty of developers do fine with well-crafted prompts and iterative refinement. If your AI coding workflow already produces reliable output, adding OpenSpec might be unnecessary overhead. But if you're spending more than 20% of your time on AI-generated code revisions, the structure pays for itself.

### Verdict

OpenSpec is the most practical spec-driven development tool available right now. It doesn't try to reinvent software engineering methodology — it adds just enough structure to make AI coding assistants significantly more reliable. The 53K stars and 484K monthly downloads aren't hype; they reflect a real gap in the AI coding workflow that OpenSpec fills well. If you're a fullstack developer using any AI coding assistant and you're tired of revision cycles, give the core workflow a try. Start with `/opsx:propose` on your next feature and see if the structured output improves your AI's first-pass accuracy. For most teams, it will.
