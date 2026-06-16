---
name: loop-engineering
description: "Loop Engineering provides practical patterns and CLI tools for designing systems that orchestrate AI coding agents — stop prompting, start engineering loops."
url: https://github.com/cobusgreyling/loop-engineering
stars: 310
forks: 42
language: JavaScript
tags: ["ai-agents", "developer-tools", "cli", "automation", "claude-code"]
featured: false
publishedAt: 2026-06-17
---

## Loop Engineering

### Overview

Loop Engineering is a reference repository and toolkit for a concept that's rapidly gaining traction among developers who use AI coding agents daily: instead of prompting agents yourself, you design the system that does the prompting for you. Created by Cobus Greyling and inspired by essays from Addy Osmani (Chrome team) and Boris Cherny (Head of Claude Code at Anthropic), the project hit 310 stars in its first week after launching June 9, 2026.

The core idea is deceptively simple. Boris Cherny said it plainly: "I don't prompt Claude anymore. I have loops running that prompt Claude and figuring out what to do. My job is to write loops." That quote captures the shift happening right now. Developers who use Claude Code, Codex, Cursor, or Grok are discovering that the real leverage isn't in crafting better prompts — it's in building recursive systems that triage, implement, verify, and ship on a schedule, with human gates for risky decisions.

The repository itself is practical, not theoretical. It ships seven production-ready loop patterns (Daily Triage, PR Babysitter, CI Sweeper, Dependency Sweeper, Changelog Drafter, Post-Merge Cleanup, Issue Triage), three npm CLI tools, starter kits for each major agent tool, and an interactive pattern picker on GitHub Pages. The patterns are designed to work across Grok, Claude Code, Codex, and GitHub Actions — not locked to a single vendor.

### Why it matters

The AI coding agent space is moving fast, but most developers are still stuck in the "prompt and pray" phase. They write a prompt, watch the agent work, correct mistakes, repeat. That workflow doesn't scale. Loop engineering is the next step: designing durable, repeatable systems where agents operate on a cadence, with verification gates and escalation paths. It's the difference between being a pilot and being an air traffic controller.

This connects to a broader trend. As AI agents get more capable, the bottleneck shifts from "can the agent write good code?" to "can the developer design good guardrails?" The Loop Engineering repo addresses exactly that gap. It's also one of the first projects to provide a cross-tool framework — most agent tooling is vendor-specific, but loops work the same way regardless of whether you're using Claude Code or Codex underneath.

For fullstack developers in particular, this matters because loops handle the tedious parts of the job: triaging issues, sweeping for dependency updates, babysitting CI, drafting changelogs. These are tasks every team does manually, often poorly. A well-designed loop handles them at 2 AM without burning out a human.

### Key Features

**Seven Production Loop Patterns.** Each pattern includes a documented cadence, a starter kit, an expected maturity level (L1 report-only through L3 unattended), and token cost estimates. Daily Triage runs on a 1-2 hour schedule and generates reports. PR Babysitter watches PRs every 5-15 minutes. These aren't hypothetical — they're the patterns developers are actually shipping to production.

**Three npm CLI Tools.** `loop-audit` scores your project's loop readiness and suggests improvements. `loop-init` scaffolds a starter with budget and run-log configuration. `loop-cost` estimates token spend for a given pattern and cadence. All three run via `npx` with no install required, which means you can evaluate the approach in under five minutes.

**Cross-Tool Compatibility.** The patterns map to Grok, Claude Code, Codex, and GitHub Actions with tool-specific examples. A primitives matrix in the docs shows which loop building blocks (automations, worktrees, skills, plugins, sub-agents, memory) each tool supports. This avoids the common problem of being locked into one agent vendor's ecosystem.

**Phased Rollout Framework.** Loops are designed to ship incrementally. L1 is report-only — the agent triages and reports but doesn't fix anything. L2 adds assisted fixes with human approval. L3 is fully unattended. The loop-design-checklist provides a rubric for when to advance levels. This prevents the "let the AI run wild" failure mode that burns teams on agent automation.

**Interactive Pattern Picker.** The GitHub Pages showcase at cobusgreyling.github.io/loop-engineering lets you browse patterns interactively, compare them by cadence and token cost, and pick the right starting point for your team. It's a nice touch that makes the concepts concrete instead of abstract.

**Safety and Failure Mode Documentation.** The repo includes a failure modes catalog (written in incident-report style), an anti-patterns guide, and a multi-loop coordination doc for when loops collide. This honest documentation of what can go wrong is rare in AI tooling projects. It also includes a denylist system, auto-merge policies, and MCP scope controls.

**Community Patterns and Stories.** Beyond the core seven patterns, the repo accepts community contributions. There's a stories directory with real wins and honest failures from developers who've deployed loops in production. This ground-truth feedback loop is what turns a reference repo into a living practice.

### Use Cases

- **Solo developers using AI agents** — Set up a Daily Triage loop to automatically scan issues, categorize them, and draft responses. You review the output instead of doing the triage yourself, saving 30-60 minutes per day.

- **Small teams with CI/CD pipelines** — Deploy the CI Sweeper pattern to automatically diagnose and fix flaky tests, update failing snapshots, and patch deprecated API calls. Start at L1 (report-only) and graduate to L2 once you trust the output.

- **Open source maintainers** — Use the Dependency Sweeper pattern on a 6-hour cadence to monitor for security patches and version bumps across your dependency tree. The loop creates PRs with changelogs and test results attached.

- **Engineering managers tracking team velocity** — The Changelog Drafter pattern runs on tags or a daily schedule, summarizing merged PRs into a human-readable changelog. No more forgetting to write release notes.

- **Teams migrating to agent-assisted development** — Start with the PR Babysitter pattern at L1 to watch PRs for style violations, missing tests, and documentation gaps. It's a low-risk way to introduce agent automation without giving it write access.

### Pros and Cons

Pros:
- The phased rollout framework (L1 → L2 → L3) is genuinely useful. Most agent automation projects skip this and teams end up disabling the whole thing after one bad experience. Loop Engineering's approach of "report first, fix later" builds trust incrementally.
- Cross-tool support is a real differentiator. You can switch from Claude Code to Codex without rewriting your loops, since the patterns abstract away the agent-specific details.
- The CLI tools work via npx with zero configuration. `npx @cobusgreyling/loop-audit . --suggest` gives you actionable feedback in seconds. That friction-free evaluation path matters for adoption.

Cons:
- Token costs can escalate quickly. The CI Sweeper pattern at 5-15 minute cadences with sub-agents can burn through significant API budgets. The repo acknowledges this honestly, but teams need to run the cost estimator before committing.
- The project is barely a week old (launched June 9, 2026). While the patterns are grounded in real usage by the author and referenced practitioners, the community contribution pipeline is still thin. More production battle-testing is needed.
- The concept requires a mental shift. Developers accustomed to direct prompting need to think in terms of systems design, not prompt design. The learning curve is real, especially for teams new to agent automation.

### Getting Started

```bash
# 1. Audit your project's loop readiness
npx @cobusgreyling/loop-audit . --suggest

# 2. Scaffold a starter pattern (Daily Triage for Grok)
npx @cobusgreyling/loop-init . --pattern daily-triage --tool grok

# 3. Estimate token costs for your chosen cadence
npx @cobusgreyling/loop-cost --pattern daily-triage --level L1

# 4. Start in report-only mode
# In your agent (Grok example):
/loop 1d Run loop-triage. Update STATE.md. No auto-fix in week one.

# 5. Explore the interactive pattern picker
# https://cobusgreyling.github.io/loop-engineering/#interactive
```

### Alternatives

**Claude Code Skills / Cursor Rules** — These are vendor-specific approaches to giving agents persistent project knowledge. They work well for single-agent setups but don't address scheduling, multi-step orchestration, or cross-tool portability. Choose skills/rules when you need simple context injection; choose Loop Engineering when you need automated, recurring agent workflows.

**GitHub Actions with AI Steps** — You can wire AI calls directly into GitHub Actions workflows, and many teams do this for code review or changelog generation. The downside is that you're building the orchestration from scratch each time. Loop Engineering provides pre-built patterns with verification gates and safety documentation that would take weeks to replicate manually.

**Devin / SWE-Agent / OpenHands** — These are full autonomous coding agents that can take a GitHub issue and ship a PR. They're powerful but expensive and unpredictable. Loop Engineering takes a more conservative approach: structured patterns with human gates, phased rollout, and explicit cost controls. Choose autonomous agents for greenfield exploration; choose loops for recurring maintenance tasks on production codebases.

### Verdict

Loop Engineering is the most practical entry point I've seen for developers who want to move beyond manual prompting. The concept isn't new — Boris Cherny and Addy Osmani have been talking about it for months — but this is the first project that packages it into patterns you can clone, CLIs you can run, and checklists you can ship against. The phased rollout framework alone makes it worth studying. At 310 stars in its first week, with endorsements from the Anthropic Claude Code team lead, this is clearly resonating with developers who've hit the ceiling of prompt-based workflows. If you're using any AI coding agent on a daily basis, spend 30 minutes with the audit tool and pattern picker. The investment pays off the first time a loop catches a dependency vulnerability at 3 AM while you're asleep.
