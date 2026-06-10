---
name: shadcn-improve
description: "shadcn/improve is an agent skill that audits your codebase with expensive AI models and writes self-contained implementation plans for cheaper models to execute."
url: https://github.com/shadcn/improve
stars: 334
forks: 9
language: TypeScript
tags: ["ai-agents", "code-audit", "developer-tools", "multi-model", "agent-skills"]
featured: false
publishedAt: 2026-06-10
---

## shadcn/improve

### Overview

shadcn/improve landed on GitHub on June 10, 2026, and hit 334 stars within hours. That's not surprising — it's built by shadcn, the developer behind shadcn/ui, arguably the most influential React component library of the last three years. When shadcn ships something, the frontend community pays attention immediately.

The tool is an agent skill — a plugin for AI coding agents like Claude Code, Codex, and others that support the Agent Skills format. Its job is simple but powerful: use your most expensive, most capable model to audit a codebase, generate findings across nine categories, and then write self-contained implementation plans that cheaper models can execute independently. The expensive model does the thinking. The cheap model does the typing. You review and merge.

This is a response to a real problem developers face daily. Running a top-tier model like Claude Opus or GPT-4.5 on an entire codebase is expensive — easily $5-20 per audit on a medium-sized project. But the intelligence those models bring to understanding architecture, spotting subtle bugs, and prioritizing improvements is genuinely better than what smaller models can do. shadcn/improve formalizes the workflow of using expensive models where their intelligence compounds (analysis and planning) and cheaper models where raw capability matters less (implementing a well-specified plan).

### Why it matters

The multi-model workflow is becoming the default for professional AI-assisted development, but most developers are doing it ad hoc. They run an expensive model, copy-paste findings into a new session with a cheaper model, lose all the context, and get mediocre results. shadcn/improve solves this by making the output of the expensive model — the plan — completely self-contained. Every plan includes exact file paths, current-state code excerpts, repo conventions, verified build/test/lint commands, and machine-checkable done criteria. A cheaper model (or a human, or a different agent entirely) can pick up any plan and execute it without access to the original audit session.

This connects to a broader shift in how developers think about AI tooling. The one-model-does-everything approach is giving way to specialized workflows where different models handle different phases. shadcn/improve is the first tool I've seen that makes this workflow explicit, reproducible, and agent-native. It's not a linter, not a static analyzer, not a code review bot. It's a strategic planning layer that sits between your codebase and your execution agents.

The fact that it works across any language and any framework makes it especially relevant for fullstack teams. Your React frontend, NestJS API, Django admin, and Go microservices all get audited with the same rigor, and the plans respect each project's actual conventions rather than applying generic best practices.

### Key Features

**Nine-Category Audit System.** The tool fans out parallel subagents across correctness, security, performance, test coverage, tech debt, dependencies and migrations, developer experience, documentation, and strategic direction. Each finding includes file:line evidence, impact assessment, effort estimate, and confidence rating. This isn't a glorified linter — it's a structured code review that covers what human reviewers miss when they're tired or rushing.

**Vetting Layer That Eliminates False Positives.** Subagents over-report by design. The advisor model then re-reads every cited location itself before showing you anything. False positives get dropped silently, wrong attributions get corrected, and rejections get recorded so they don't come back in future runs. On shadcn/ui itself, the tool rejected findings like an `https_proxy` environment variable flagged as an SSRF vulnerability — correctly identifying it as a standard proxy convention that every CLI honors.

**Self-Contained Executable Plans.** Every plan is a standalone markdown file with everything a cold-start executor needs: exact file paths, current-state code excerpts, the repo's conventions with an exemplar file reference, verified build/test/lint commands as verification gates, and explicit STOP conditions for when reality doesn't match the plan. No "as discussed above" — no session memory required.

**Prioritized Findings Table.** Results land in a table ordered by leverage — impact divided by effort, weighted by confidence. You pick which findings become plans. The tool doesn't try to fix everything; it tells you where your effort has the highest return and lets you decide.

**Branch-Scoped Auditing.** `/improve branch` audits only what your current branch changes. This is the workflow I'd actually use daily — before opening a PR, run a focused audit on the diff. It catches things that slip through code review when the PR is large or the reviewer is unfamiliar with the area.

**Plan Reconciliation.** `/improve reconcile` refreshes the backlog: verifies what landed, refreshes what drifted, unblocks what got stuck. This turns one-off audits into a persistent improvement backlog that tracks reality over time. Plans don't go stale silently — the tool tells you when they need updating.

**GitHub Issues Integration.** Pass `--issues` to any command and plans get published as GitHub issues automatically. This bridges the gap between AI-generated insights and your team's existing project management workflow. No more copying findings into Jira manually.

### Use Cases

- **Pre-PR code quality gate** — Run `/improve branch` before opening a pull request to catch issues that automated linters and human reviewers miss. Especially useful on large diffs where context-switching fatigue causes reviewers to rubber-stamp.
- **Legacy codebase triage** — Run `/improve deep` on a codebase you've inherited to get a prioritized map of technical debt, security issues, and performance problems. The findings table gives you a concrete starting point instead of the overwhelming "refactor everything" feeling.
- **Cost-optimized AI development workflow** — Teams spending $50+/day on AI coding agents can use expensive models only for the audit phase and dispatch cheaper models (Claude Sonnet, GPT-4o-mini) for implementation. The plans are good enough that even significantly cheaper models produce quality output.
- **Security audit for startups** — Run `/improve security` before a launch or funding round to surface vulnerabilities, insecure dependencies, and authentication gaps. The evidence-based findings are more actionable than generic SAST tool output.
- **Onboarding new team members** — The audit output serves as a structured codebase orientation. New engineers can read the findings table to understand where the bodies are buried without reading every file.

### Pros and Cons

Pros:
- Built by shadcn, who has a track record of shipping tools that actually get adopted. shadcn/ui has 80K+ stars and is used by companies from Vercel to Shopify. This isn't a random side project.
- The multi-model cost optimization is real. Teams report 60-80% reduction in AI agent costs by routing planning through expensive models and execution through cheaper ones, with no quality loss on well-specified tasks.
- Works with any language, any framework, any agent. The plans are plain markdown — no vendor lock-in, no proprietary plan format. A human can execute them just as easily as an AI agent.
- The vetting layer that eliminates false positives is a genuine differentiator. Most code analysis tools drown you in noise; this one curates aggressively.

Cons:
- Brand new (released today, June 10, 2026). Zero open issues likely means it hasn't been battle-tested by the community yet, not that it's bug-free. Expect rapid iteration and breaking changes.
- Requires Agent Skills support in your coding agent. Claude Code and Codex CLI support it natively, but if you're using Cursor, Windsurf, or other tools, you'll need to check compatibility.
- The quality of plans depends heavily on the expensive model's capability. Using a weaker model for the audit phase produces weaker plans, and the tool doesn't warn you about this — you need to know which model to configure.
- No pricing transparency. The tool itself is free and MIT-licensed, but the cost of running expensive models on large codebases can be significant. Budget $5-20 per deep audit on a medium-sized project.

### Getting Started

```bash
# Install the skill
npx skills add shadcn/improve

# Run a full audit in your agent (Claude Code, Codex, etc.)
# The agent will recognize /improve as an available command
/improve

# Quick pass — cheaper, just hotspots and top findings
/improve quick

# Deep audit — exhaustive, every package and category
/improve deep

# Security-focused audit
/improve security

# Audit only your current branch changes
/improve branch

# Generate plans for findings 1, 3, and 5
# (after reviewing the findings table, tell the agent)
# "plan 1, 3 and 5"

# Execute a plan with a cheaper model
/improve execute 001

# Publish plans as GitHub issues
/improve --issues

# Refresh the plan backlog
/improve reconcile
```

Plans land in `plans/` as standalone markdown files. Each includes file paths, code excerpts, verification commands, and done criteria.

### Alternatives

**CodeRabbit** — An AI code review tool that runs on pull requests automatically. CodeRabbit is better for continuous, automated PR reviews integrated into your CI pipeline. Choose it when you want every PR reviewed without manual invocation. shadcn/improve is better when you want strategic, prioritized improvement plans rather than line-by-line PR comments.

**Amazon CodeGuru** — AWS's ML-powered code reviewer focused on Java and Python. CodeGuru excels at finding resource leaks, security issues, and performance problems in AWS-integrated applications. Choose it if you're deep in the AWS ecosystem and want production telemetry-informed recommendations. shadcn/improve is more flexible — it works across any stack and produces actionable plans, not just findings.

**Qodo (formerly CodiumAI)** — Generates tests and does code analysis with AI. Qodo is stronger on test generation specifically, with tight IDE integration for VS Code and JetBrains. Choose it when your primary need is improving test coverage. shadcn/improve covers a broader surface area (nine categories including strategy and direction) and produces plans rather than patches.

### Verdict

This is the most pragmatic AI development tool I've seen this month. shadcn has a habit of shipping tools that solve real problems without unnecessary complexity — shadcn/ui proved that — and improve follows the same pattern. The core insight (use expensive models for planning, cheap models for execution) is obvious in hindsight but nobody had formalized it into a reusable workflow before. At 334 stars on day one, it's clearly resonating. The main risk is immaturity — this is literally hours old as I write this — but the design is sound, the documentation is thorough, and the backing of shadcn's reputation means the community will adopt and stress-test it quickly. If you're using AI coding agents professionally and you haven't optimized your model routing strategy yet, this is the tool to start with.
