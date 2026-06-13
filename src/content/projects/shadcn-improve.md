---
name: improve
description: "Improve is an agent skill by shadcn that audits codebases with expensive AI models and writes executable plans for cheaper models to implement — smart cost optimization for AI-assisted development."
url: https://github.com/shadcn/improve
stars: 2446
forks: 87
language: TypeScript
tags: ["ai-agents", "code-audit", "developer-tools", "cost-optimization", "open-source"]
featured: false
publishedAt: 2026-06-13
---

## Improve

### Overview

Improve is an agent skill that audits any codebase and writes self-contained implementation plans for cheaper AI models to execute. Created by shadcn — the developer behind the massively popular shadcn/ui component library (55K+ stars) — it launched on June 10, 2026, and crossed 2,400 GitHub stars in three days. That kind of velocity tracks with shadcn's track record: when he ships something, the developer community pays attention.

The core insight is simple but powerful: not every AI coding task needs the same model. Understanding a codebase, judging what's worth fixing, and writing a precise spec requires deep reasoning. Executing a well-written plan with exact file paths, code excerpts, and verification commands is mechanical work. Improve splits these two responsibilities cleanly. Your most capable model (Claude Opus, GPT-4o, Gemini Ultra) handles the intelligence-heavy audit phase. Cheaper models (Claude Sonnet, GPT-4o-mini, open-source alternatives) handle execution. The result is better outcomes at a fraction of the cost.

The tool works as a skill in any agent that supports the Agent Skills format — Claude Code, Cursor, Codex, and others. It writes plans as plain markdown files in a `plans/` directory, so any agent or human can pick them up. There's no lock-in, no proprietary format, no cloud dependency. Install with `npx skills add shadcn/improve`, point it at your repo, and it starts working.

### Why it matters

AI-assisted coding has a cost problem. Developers running Claude Opus or GPT-4o for every task — including mechanical refactors, simple bug fixes, and boilerplate generation — are burning through API credits faster than necessary. A single deep audit of a medium-sized codebase can cost $5-15 with a top-tier model. Running that same model to execute the 15 plans it produced? That's another $30-75 you didn't need to spend.

Improve addresses this by formalizing a pattern many senior developers already use informally: think hard first, then delegate the grunt work. The difference is that Improve makes this workflow systematic and reproducible. It produces plans specifically designed for weaker models — self-contained, with inlined context, verification gates, and explicit STOP conditions so a smaller model doesn't improvise when it hits something unexpected.

This also connects to a broader trend in the AI tooling space: the shift from "one model does everything" to multi-model orchestration. Microsoft's SkillOpt trains reusable natural-language skills for frozen LLM agents. Anthropic's tooling increasingly separates planning from execution. Improve brings this same principle to the individual developer workflow, and it does it in a way that's immediately practical rather than theoretical.

The shadcn name carries significant weight here. His component library is embedded in virtually every modern React project. If he's building tooling for a multi-model development workflow, that's a signal the ecosystem is moving in this direction.

### Key Features

**Multi-Model Cost Optimization.** The fundamental design separates expensive reasoning from cheap execution. You run `/improve` with your best model to generate an audit and plans, then hand those plans to cheaper models via `/improve execute 001`. The skill dispatches executors in isolated git worktrees, reviews their diffs against the plan, and reports back with an approve/revise/block verdict. You keep control of merging.

**Nine-Category Parallel Audit.** The audit fans out parallel subagents across correctness, security, performance, test coverage, tech-debt, dependencies and migrations, developer experience, documentation, and direction (feature suggestions). Every finding carries file:line evidence, impact assessment, effort estimate, and confidence score. This isn't a superficial lint — it reads your code and makes specific, evidence-backed claims.

**Self-Healing Plan Validation.** Subagents over-report by design. The advisor re-reads every cited location before showing findings to you. False positives get dropped silently. Wrong attributions get corrected. Rejections get recorded with reasons so they don't reappear in future runs. This vetting step is what makes the output trustworthy enough to hand to a weaker model.

**Executable Plan Format.** Plans are written for the weakest plausible executor — a model that has never seen the advisor session and may be significantly smaller. Each plan inlines exact file paths, current-state code excerpts, repo conventions with exemplar files, and verified build/test/lint commands as verification gates. No "as discussed above" references. No ambiguity. The executor never has to guess whether it succeeded.

**Intent-Aware Reconnaissance.** Before auditing, Improve maps the repo's stack, conventions, and build commands. It also ingests intent documents — ADRs, PRDs, CONTEXT.md, DESIGN.md, PRODUCT.md — so decided tradeoffs aren't re-flagged as findings and direction suggestions stay grounded in stated product intent. If your repo already documents its decisions, the tool respects them.

**Plan Lifecycle Management.** Plans aren't fire-and-forget. The `/improve reconcile` command processes what happened since the last run: verifies DONE plans still hold, investigates BLOCKED ones and rewrites around obstacles, refreshes drifted plans, and retires findings that got fixed independently. Each plan stamps the git commit it was written against, so executors run a mechanical drift check before touching anything.

**GitHub Issues Integration.** Pass `--issues` to publish plans directly as GitHub issues with the same self-contained body. This means any agent or human can pick up work where it already lives — in your issue tracker — rather than hunting through a plans directory.

### Use Cases

- **Pre-PR code review** — Run `/improve branch` before opening a pull request. It scopes the audit to just what your branch changes and produces targeted improvement plans for anything it catches.
- **Legacy codebase onboarding** — New team members (or AI agents) can run `/improve deep` to get a comprehensive audit with prioritized findings. The plans serve as guided exploration of what needs attention.
- **Cost-conscious AI development workflows** — Teams spending $200+/month on API credits can use Improve to route 80% of execution work to cheaper models while keeping top-tier reasoning for the audit phase.
- **Security and performance audits** — Run `/improve security` or `/improve perf` for focused deep-dives. Findings include specific file locations and evidence, not generic advice.
- **Open source project maintenance** — Maintainers can run `/improve next` to get feature suggestions grounded in the codebase's actual patterns and stated direction, then publish the best ones as issues for community contributors.
- **CI/CD integration** — Run `/improve reconcile` on a schedule to keep a living backlog of improvement plans that track with the codebase's evolution.

### Pros and Cons

Pros:
- The multi-model strategy genuinely reduces costs. Running a capable model only for planning and cheaper models for execution can cut API spend by 60-80% on codebase improvement tasks, based on the cost differential between Opus-tier and Sonnet-tier models.
- Plans are designed to be self-contained and machine-verifiable, which means they actually work when handed to weaker models — unlike most AI-generated code suggestions that assume context the executor doesn't have.
- The shadcn pedigree means the tool is well-designed and likely to maintain momentum. The skill format makes it portable across agents.

Cons:
- Three days old as of this writing. The 6 open issues suggest the API surface is still settling, and there's no published benchmark data on how well cheaper models execute the plans.
- Requires a capable model for the audit phase, so there's a minimum cost floor. Running `/improve deep` on a large codebase with Claude Opus could cost $10-20 per run.
- The tool deliberately never modifies source code — it only writes plans. Developers looking for a "fix everything" tool will be disappointed. The extra step of handing plans to an executor adds friction.

### Getting Started

```bash
# Install the skill
npx skills add shadcn/improve

# Run a quick audit (cheaper pass — hotspots and top findings only)
/improve quick

# Run a full audit → prioritize findings → select which to plan
/improve

# Execute a specific plan with a cheaper model
/improve execute 001

# Before a PR — audit only what your branch changes
/improve branch

# Clean up the plan backlog
/improve reconcile

# Publish plans as GitHub issues
/improve --issues
```

Plans are written to `plans/` as markdown files. Read them, review them, and hand them to any agent or human executor.

### Alternatives

**Sweep AI** — A GitHub-integrated AI tool that turns issues into pull requests automatically. Sweep is more end-to-end (issue → PR) but less transparent about what it's doing under the hood. Choose Sweep when you want full automation and trust the tool to both plan and implement. Choose Improve when you want control over the planning phase and cost optimization across model tiers.

**CodeRabbit** — An AI code review tool that runs automatically on pull requests. CodeRabbit is better for CI-integrated review workflows where you want automated feedback on every PR. Improve is better for proactive codebase improvement — finding and planning fixes before they become PRs.

**Codium PR-Agent** — Open-source AI tool for pull request analysis, review, and description generation. PR-Agent focuses on the PR lifecycle (review, describe, improve suggestions) while Improve focuses on the pre-PR phase (audit the whole codebase, produce improvement plans). They're complementary rather than competing.

### Verdict

Improve is the most practical tool I've seen for making AI-assisted development cost-effective at scale. The insight — use expensive models where intelligence compounds, cheap models everywhere else — is obvious in hindsight but nobody had formalized it into a reusable workflow until now. The self-contained plan format with verification gates is the key engineering decision: it's what makes the whole multi-model strategy actually work rather than producing plans that fall apart in execution. Three days old and 2,400 stars isn't just hype — it's recognition that this pattern fills a real gap. If you're running AI coding agents daily and watching your API bill climb, install this today. The audit alone is worth it, even if you never hand a plan to a cheaper model.
