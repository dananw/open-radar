---
name: improve
description: "Shadcn's agent skill audits your codebase with an expensive model and writes execution plans for cheaper AI models — 5K stars in its first week."
url: https://github.com/shadcn/improve
stars: 5181
forks: 191
language: TypeScript
tags: ["ai-agents", "code-audit", "developer-tools", "llm", "agent-skills"]
featured: false
publishedAt: 2026-06-18
---

## improve

### Overview

improve is an agent skill created by shadcn — the developer behind shadcn/ui, arguably the most influential UI component library of the last three years. It hit 5,181 stars and 191 forks within its first week on GitHub (launched June 10, 2026). That velocity alone tells you something: developers have been waiting for this exact idea.

The concept is deceptively simple. You point improve at a codebase. It uses your most capable (and expensive) model to audit the entire repository — mapping conventions, identifying issues across nine categories, and writing detailed implementation plans. Those plans get handed to cheaper models for execution. The expensive model does the thinking. The cheap model does the typing. The skill never touches your source code itself.

This is a fundamentally different take on AI-assisted development. Most tools try to make one model do everything — read, plan, implement, test, ship. improve splits that pipeline at the intelligence boundary. The part that requires deep understanding and judgment stays expensive. The part that's mechanical execution gets offloaded. It's the kind of architecture that makes you wonder why nobody did it sooner.

### Why it matters

The AI coding tool landscape in mid-2026 is a mess of competing CLIs, IDE integrations, and agent frameworks. Every provider wants you to use their model for everything. But the economics don't make sense. Running Claude Opus or GPT-4.5 on every line of a simple refactor is like hiring a senior architect to move boxes. You need the expensive brain for the hard parts — understanding intent, judging tradeoffs, writing specs — and a cheaper hand for the rest.

improve operationalizes this insight. It's built on the Agent Skills format (agentskills.io), which means it works in any compatible agent environment. Claude Code, Cursor, Codex, custom setups — doesn't matter. The plans it produces are plain markdown files in a `plans/` directory, self-contained enough that any model (or human) can pick them up and execute.

For fullstack teams running React frontends, NestJS APIs, Django backends, or Go services, this is particularly relevant. The tool audits correctness, security, performance, test coverage, tech debt, dependencies, DX, docs, and even suggests new features. It runs across nine parallel sub-agents, then re-reads every cited location itself to filter false positives before showing you anything. That vetting step is what separates this from generic "find issues" tools.

### Key Features

**Multi-Category Parallel Audit.** improve fans out sub-agents across nine categories simultaneously: correctness, security, performance, test coverage, tech debt, dependencies and migrations, DX, documentation, and direction (feature suggestions). Each sub-agent produces findings with file:line evidence, impact ratings, effort estimates, and confidence scores. The parallelization means a full audit of a large monorepo doesn't take an eternity.

**Self-Vetting False Positive Filter.** Sub-agents over-report by design. The advisor model then re-reads every cited code location itself before surfacing findings. False positives get dropped silently. Wrong attributions get corrected. Rejections get recorded with reasons so they don't reappear in future runs. This two-pass approach produces dramatically cleaner output than single-pass linters or analyzers.

**Prioritized Findings Table.** Results land in a table ordered by leverage — impact divided by effort, weighted by confidence. You don't get a flat list of 200 issues. You get a ranked view where the top items represent the highest return on time invested. Pick the ones you want planned, and the skill generates individual plan files.

**Executable Implementation Plans.** Each plan is a self-contained markdown file with exact file paths, current-state code excerpts, repo conventions, and verified commands as verification gates. Plans are written for the weakest plausible executor — a model that has never seen the advisor session and may be much smaller. Every step ends with a command and expected output. Done criteria are machine-checkable. The executor never has to guess whether it succeeded.

**Branch-Scoped Reviews.** Running `/improve branch` scopes the audit to only what the current branch changes. This makes it a powerful pre-PR tool — get a senior-level review of your diff without waiting for a human reviewer. It catches issues that standard CI linting misses: architectural concerns, missing tests for edge cases, security implications of specific changes.

**Plan Lifecycle Management.** Plans aren't fire-and-forget. The `/improve reconcile` command processes what happened since the last run: verifies DONE plans still hold, investigates BLOCKED ones and rewrites around obstacles, refreshes plans that drifted from their original assumptions, and retires findings that got fixed independently. This turns one-off audits into a persistent improvement backlog.

**GitHub Issues Integration.** Pass `--issues` to any command and the skill publishes plans as GitHub issues with the same self-contained body. This means work items live where your team already tracks work — no context-switching between the agent session and your project board. Any agent or human can pick up an issue and execute it.

### Use Cases

- **Pre-PR code review** — Run `/improve branch` before opening a PR. Get a thorough audit of your diff covering security, performance, and correctness without waiting for a human reviewer. Particularly useful for solo developers or small teams without dedicated reviewers.

- **Legacy codebase modernization** — Point improve at a Django or Express monolith that's accumulated years of tech debt. Get a prioritized list of what to fix first, with self-contained plans that junior developers (or cheap AI models) can execute independently.

- **Security audit before production** — Run `/improve security` to get a focused security audit with file:line evidence. Plans include exact remediation steps and verification commands. Useful for startups shipping fast without a dedicated security team.

- **Onboarding new team members** — New developers can run `/improve` on a repo they've never seen. The audit output doubles as a codebase map — conventions, architecture decisions, tech debt hotspots, and areas that need attention. The plans give them concrete first tasks.

- **AI cost optimization** — Teams spending heavily on Claude Opus or GPT-4.5 for coding tasks can use improve to shift the expensive model to planning only. Execute the plans with Claude Sonnet, GPT-4o-mini, or even local models. The quality stays high because the plan contains all the context the executor needs.

### Pros and Cons

Pros:

- **Shadcn's credibility and design sense.** The creator built shadcn/ui, which has 80K+ stars and is used by virtually every React project in 2026. The tool reflects the same philosophy: minimal, well-designed, and opinionated in the right ways.

- **Model-agnostic by design.** Works with any LLM provider through the Agent Skills format. You're not locked into Anthropic or OpenAI. Use Claude for planning, GPT-4o for execution, or mix and match based on cost and capability.

- **Plans are human-readable.** The markdown output isn't just for AI executors. Developers can read, edit, and discuss plans before execution. This makes it a collaboration tool, not just an automation tool.

- **Self-contained execution context.** Plans inline everything the executor needs — code excerpts, conventions, commands, expected outputs. No back-and-forth clarification needed. This is what makes cheap model execution viable.

- **Persistent improvement backlog.** The reconcile command turns one-off audits into an ongoing improvement process. Plans track their own state and adapt to codebase changes.

Cons:

- **Requires Agent Skills compatible environment.** Not every developer uses Claude Code, Cursor, or an agent that supports the skills format. If you're in a different ecosystem, adoption requires setup work.

- **Quality depends on the advisor model.** The planning phase is only as good as the model running it. Using a less capable model for the audit produces weaker plans, which defeats the purpose of the two-tier architecture.

- **No built-in CI integration.** There's no GitHub Action or CI pipeline hook yet. You run it manually from your agent. For teams that want automated audits on every PR, this is a gap that will need filling.

### Getting Started

```bash
# Install the skill in your agent
npx skills add shadcn/improve

# Run a full audit
/improve

# Quick pass — cheaper, top findings only
/improve quick

# Focused security audit
/improve security

# Audit only your current branch changes
/improve branch

# Get feature suggestions for where to take the project
/improve next

# Skip audit, write a plan for one specific thing
/improve plan "Add rate limiting to the API endpoints"

# Execute a plan with a cheaper model
/improve execute 001

# Clean up and refresh the plan backlog
/improve reconcile

# Publish plans as GitHub issues
/improve --issues
```

### Alternatives

**CodeRabbit** — An AI code review tool that runs as a GitHub App and comments directly on PRs. It's more turnkey than improve (no agent setup required) and integrates natively with GitHub workflows. Choose CodeRabbit when you want automated PR reviews without running an agent locally. It's weaker on deep architectural analysis and doesn't produce reusable implementation plans.

**Sweep AI** — An AI junior developer that takes GitHub issues and turns them into PRs. It's closer to the "executor" side of improve's architecture. Sweep handles the full cycle from issue to PR, while improve focuses on the planning layer. Choose Sweep when you want end-to-end automation from ticket to merged code, but expect less sophistication in the audit and planning phases.

**Qodo (formerly CodiumAI)** — Generates tests and does code analysis integrated into your IDE. It's stronger on test generation specifically and works as a VS Code / JetBrains extension rather than an agent skill. Choose Qodo when your primary need is test coverage improvement and you prefer IDE-integrated tooling over CLI-based agent workflows.

### Verdict

improve is the most interesting AI developer tool I've seen in 2026, and it's not close. The two-tier model architecture — expensive brain for planning, cheap hands for execution — is the kind of idea that seems obvious in retrospect but nobody nailed until now. Five thousand stars in a week from a solo developer's side project speaks to how badly the market wanted this. For any team already using AI coding agents, this should be in your toolkit within the month. The plans it produces are genuinely useful even if you never let an AI execute them — they read like senior engineer code reviews with actionable next steps. The main limitation is the Agent Skills dependency, which narrows the audience to developers already in the Claude Code / Cursor ecosystem. But if that's you, stop reading and go install it.
