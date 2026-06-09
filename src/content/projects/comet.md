---
name: comet
description: "Comet is a spec-driven development workflow tool that chains OpenSpec and Superpowers into a 5-phase automated pipeline for AI coding agents — from idea to archive."
url: https://github.com/rpamis/comet
stars: 948
forks: 119
language: TypeScript
tags: ["ai-agents", "workflow", "spec-driven-development", "developer-tools", "coding-agents"]
featured: false
publishedAt: 2026-06-09
---

## Comet

### Overview

Comet is a spec-driven development workflow tool that combines OpenSpec and Superpowers into a five-phase automated pipeline for AI coding agents. It hit 948 GitHub stars in under a month since its May 2026 launch, which tracks with the explosive growth of the AI coding agent ecosystem.

The project is created by rpamis, a developer who's clearly spent significant time working with AI coding tools like Claude Code, Codex, and Cursor. The frustration Comet addresses is specific: when you're using AI agents to build software, the workflow breaks down between "what to build" and "how to build it." OpenSpec handles requirements and spec lifecycle. Superpowers handles technical design and execution. Neither does both well. Comet chains them together with guard scripts, state machines, and automated handoffs.

The core problem is real. If you've ever used Claude Code or Codex for a non-trivial feature, you've hit this: the agent forgets what it was doing mid-session. It re-reads your entire codebase to figure out where it left off. It burns tokens re-discovering context that should have been preserved. Comet's `.comet.yaml` state file records the current phase, execution mode, verification results, and archive status. When you resume, the agent reads that file and picks up exactly where it stopped. That alone saves significant time and money on longer tasks.

### Why it matters

The AI coding agent space is moving fast. Claude Code, Codex, Cursor, Windsurf, Gemini CLI — there are now dozens of tools that can write code for you. But the workflow layer is still primitive. Most developers interact with these tools through ad-hoc prompts, hoping the agent remembers the plan. Comet is one of the first tools to formalize this workflow into a structured, resumable pipeline.

This connects to a broader trend: spec-driven development (SDD) is gaining traction as teams realize that AI agents work better with explicit specifications than vague instructions. OpenSpec popularized the concept. Superpowers added TDD-driven execution. Comet is the glue that makes them work together without manual intervention. The fact that it supports 28 AI coding platforms — from Claude Code and Codex to Cursor, Windsurf, Cline, Gemini CLI, Amazon Q, and many more — shows the demand for a platform-agnostic workflow layer.

For fullstack developers specifically, this matters because your work spans multiple layers. You're building a React frontend, a NestJS API, maybe a Django admin panel, and deploying to cloud infrastructure. A single feature might touch all of these. Comet's phase-based approach lets you break that work into manageable chunks with explicit handoffs, so the agent doesn't try to do everything at once and lose context.

### Key Features

**Five-Phase Workflow Pipeline.** The core of Comet is a structured pipeline: Open (proposal, design, task breakdown), Deep Design (brainstorming, design doc), Plan & Build (implementation plan, code commits), Verify & Finish (testing, verification report), and Archive (delta spec sync, status annotation). Each phase has defined entry and exit conditions enforced by guard scripts. The agent can't advance to the next phase without meeting the exit criteria.

**Resumable State Machine.** Comet records everything in `.comet.yaml` — current phase, execution mode, verification results, archive status. Close your AI coding session halfway through? Run `/comet` and it reads the active spec, identifies which phase was executing, and continues from there. No more re-reading the entire codebase to figure out where you left off.

**28 Platform Support.** `comet init` auto-detects which AI coding platforms you have installed and deploys skills to all of them. The list includes Claude Code, Codex, Cursor, Windsurf, Cline, RooCode, Continue, GitHub Copilot, Gemini CLI, Amazon Q Developer, Kilo Code, Kiro, Junie, and 15 more. Each platform gets skills in its native directory format.

**Guard Scripts as Infrastructure.** Instead of trusting the agent to say "I'm done," Comet uses shell scripts (`comet-guard.sh`, `comet-yaml-validate.sh`, `comet-state.sh`) to validate phase transitions. These scripts check task completion, state field values, verification evidence, and archive conditions. It's a principled approach to a real problem: agents are optimistic about their own progress.

**Nested Skill Orchestration.** Comet doesn't just run its own skills — it triggers capabilities from OpenSpec and Superpowers at the right moments. The design shows how to reliably trigger nested skills without the agent doing "look-alike" operations (writing files based on descriptions instead of actually invoking the skill). This is a pattern worth studying if you're building your own agent workflows.

**Hotfix and Tweak Presets.** Not every change needs the full five-phase treatment. `/comet-hotfix` skips brainstorming for quick bug fixes. `/comet-tweak` skips both brainstorming and full planning for small changes. These presets acknowledge that rigid process kills velocity for minor work.

### Use Cases

- **Multi-layer feature development** — Building a feature that spans React components, NestJS resolvers, and database migrations. Comet breaks the work into phases so the agent handles each layer deliberately instead of jumping between them.

- **Long-running refactoring tasks** — Restructuring a codebase across sessions. The state machine preserves context between sessions, so you can stop for the day and resume tomorrow without the agent re-analyzing everything.

- **Team coding standards enforcement** — Using Comet's guard scripts to ensure AI-generated code passes verification before moving to the next phase. The agent can't skip testing or archive incomplete work.

- **Learning spec-driven development** — Comet's workflow is a practical reference for how to combine multiple agent skills into a coherent pipeline. The README doubles as a tutorial on skill orchestration patterns.

- **Multi-platform AI development** — Working across Claude Code at work and Codex at home. Comet installs the same workflow to both platforms, so the experience is consistent regardless of which tool you're using.

### Pros and Cons

Pros:
- Solves a real pain point — context loss between AI coding sessions — with a principled state machine approach rather than ad-hoc prompting hacks.
- 28 platform support means you're not locked into a single AI coding tool. Install once, use everywhere.
- Guard scripts enforce quality gates at phase transitions, preventing the common problem of agents declaring "done" without actually verifying their work.
- The nested skill orchestration pattern is genuinely useful knowledge for anyone building agent workflows, even if you don't use Comet itself.

Cons:
- The tool assumes familiarity with the agent skills ecosystem. If you haven't used OpenSpec or Superpowers, the value proposition is harder to grasp.
- Shell scripts for guard conditions work cross-platform (macOS, Linux, Windows Git Bash) but add a Bash dependency that not all teams are comfortable with in their Node.js projects.
- At 948 stars and less than a month old, the community is small. Breaking changes are likely as the API surface settles.
- The five-phase workflow is opinionated. If your team's process doesn't map to this lifecycle, you'll fight the tool rather than benefit from it.

### Getting Started

```bash
# Install globally
npm install -g @rpamis/comet

# Initialize in your project
cd your-project
comet init

# comet init will:
# 1. Auto-detect installed AI coding platforms
# 2. Install OpenSpec skills
# 3. Install Superpowers skills
# 4. Deploy Comet skills to selected platforms
# 5. Create working directories

# Start a new feature
# In your AI coding agent, run:
/comet

# Check status
comet status

# Diagnose installation
comet doctor
```

For platforms using the generic skills CLI (like OpenClaw or Hermes):

```bash
npx skills add rpamis/comet
```

### Alternatives

**OpenSpec** — The spec lifecycle management tool that Comet builds on. OpenSpec handles proposals, spec tracking, and archiving but lacks the execution and verification layers that Superpowers provides. Use OpenSpec directly if you only need spec management without the full development workflow.

**Superpowers** — The brainstorming and TDD-driven development tool that Comet also integrates. Superpowers generates spec documents after brainstorming, but its documents lack stateful design — agents forget to check off tasks, and resumption requires re-reading everything. Use Superpowers directly if you want its development methodology without the spec lifecycle management.

**SKILL.md / AlignDev** — Tools for generating shared coding standards and skill files for AI coding agents. These focus on consistency across a team rather than workflow orchestration. Use them if your problem is "our agents write inconsistent code" rather than "our agents lose context between sessions."

### Verdict

Comet is the most practical workflow tool I've seen for AI coding agents. The state machine approach to resumable sessions alone justifies its existence — anyone who's wasted tokens on an agent re-discovering context after a session break knows this pain. The five-phase pipeline is opinionated but well-designed, and the guard scripts enforce quality in a way that prompt-based approaches can't. It's young software with a small community, so expect rough edges. But if you're using Claude Code, Codex, or any of the 28 supported platforms for non-trivial development work, Comet is worth a serious look. The 948 stars in under a month suggest the developer community agrees that AI coding workflows need more structure than "just prompt it and hope."
