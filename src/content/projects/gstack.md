---
name: gstack
description: "Garry Tan's open-source Claude Code setup turns AI into a 23-person virtual engineering team — CEO, designer, QA, security, and release engineer as slash commands."
url: https://github.com/garrytan/gstack
stars: 110179
forks: 16385
language: TypeScript
tags: ["ai-agents", "developer-tools", "claude-code", "productivity", "open-source"]
featured: false
publishedAt: 2026-06-15
---

## gstack

### Overview

gstack is Garry Tan's open-source AI development toolkit — 23 specialist roles and 8 power tools packaged as slash commands for Claude Code and 10 other AI coding agents. It hit 110,000 GitHub stars in three months, which puts it in the top tier of developer tools launched in 2026.

Garry Tan is the President and CEO of Y Combinator. Before YC, he was one of the first engineer/PM/designers at Palantir, co-founded Posterous (acquired by Twitter), and built Bookface, YC's internal social network. He's been building products for twenty years. The context matters because gstack isn't a theoretical framework — it's the actual workflow one of the most connected people in tech uses daily to ship production software.

The core problem gstack solves is the gap between what AI coding agents can do and what developers actually ask them to do. Most people use Claude Code or Codex as a fancy autocomplete. Tan's claim — backed by a detailed methodology document and reproducible scripts — is that his 2026 run rate is roughly 810x his 2013 pace on normalized logical code changes (11,417 vs 14 logical lines/day). Through April 2026, he'd already produced 240x the entire 2013 year across 40+ public and private repos. The point isn't raw LOC, which AI inflates. It's what shipped: 3 production services and 40+ features in 60 days, part-time, while running YC full-time.

### Why it matters

The AI coding agent space is crowded with tools that promise productivity but deliver autocomplete with extra steps. gstack takes a fundamentally different approach: instead of making the AI a faster typist, it makes the AI a team. Each slash command activates a specialist with a defined role, methodology, and quality gates. The `/review` command doesn't just diff your code — it runs a staff engineer's review process, auto-fixes the obvious issues, and flags completeness gaps that pass CI but blow up in production.

This connects to a broader shift in how developers work with AI. Andrej Karpathy said in March 2026 that he hadn't typed a line of code since December 2025. Peter Steinberger built OpenClaw (247K stars) essentially solo with AI agents. The pattern is clear: the bottleneck isn't writing code anymore — it's thinking clearly about what to build and catching the failure modes before users do. gstack encodes that thinking into repeatable processes.

The 110K star count is remarkable, but what's more telling is the adoption pattern. gstack works across 10 AI agents (Claude Code, Codex, OpenCode, Cursor, Hermes, and others), and the team mode auto-updates so entire organizations stay in sync. That cross-agent compatibility is why it's spreading beyond the Claude Code ecosystem.

### Key Features

**23 Specialist Roles as Slash Commands.** Each command activates a distinct persona with specific expertise. `/office-hours` runs a YC-style product interrogation with six forcing questions. `/plan-eng-review` generates ASCII diagrams for data flow, state machines, and error paths. `/cso` runs an OWASP Top 10 plus STRIDE threat model with zero-noise false positive exclusions. These aren't prompts — they're structured methodologies with quality gates.

**Full Sprint Pipeline.** gstack isn't a random collection of tools. The skills run in the order a real sprint runs: Think, Plan, Build, Review, Test, Ship, Reflect. Each skill feeds into the next — `/office-hours` writes a design doc that `/plan-ceo-review` reads, `/plan-eng-review` writes a test plan that `/qa` picks up. Nothing falls through the cracks because every step knows what came before it.

**Real Browser QA.** The `/qa` command opens a real Chromium browser, clicks through flows, finds bugs, fixes them with atomic commits, and auto-generates regression tests for every fix. The `/browse` skill gives the agent eyes with approximately 100ms per command. You can import cookies from Chrome, Arc, Brave, or Edge to test authenticated pages.

**Cross-Agent Compatibility.** gstack works on 10 AI coding agents, not just Claude Code. Setup auto-detects which agents you have installed. OpenAI Codex CLI, OpenCode, Cursor, Factory Droid, Slate, Kiro, Hermes, and GBrain are all supported. Adding a new agent requires one TypeScript config file with zero code changes.

**Team Mode with Auto-Updates.** The `./setup --team` command bootstraps your repo so teammates get gstack automatically. Every Claude Code session starts with a fast auto-update check (throttled to once per hour, network-failure-safe, completely silent). No vendored files, no version drift, no manual upgrades.

**Multi-Agent Coordination.** The `/pair-agent` command shares your browser with any AI agent. One command, one paste, connected. Each agent gets its own tab with scoped tokens, tab isolation, rate limiting, and activity attribution. Auto-launches headed mode so you watch everything, and auto-starts an ngrok tunnel for remote agents.

**Security Audit Pipeline.** The `/cso` command runs OWASP Top 10 and STRIDE threat modeling with 17 false positive exclusions and an 8/10+ confidence gate. Each finding includes a concrete exploit scenario. The `/careful` command warns before destructive commands like `rm -rf`, `DROP TABLE`, or force-push. `/guard` combines safety guardrails with edit locks for maximum protection during production work.

### Use Cases

- **Solo founders shipping fast** — Run `/office-hours` to reframe your product idea, `/autoplan` to get a fully reviewed plan, implement, then `/ship` to open a PR. Eight commands from idea to production.
- **Tech leads doing code review at scale** — Run `/review` on any branch to get staff-engineer-level code review with auto-fixes. Run `/codex` for a second opinion from a different model.
- **Teams standardizing AI workflows** — Install gstack in team mode so every developer gets the same specialist roles and quality gates. Auto-updates keep everyone in sync without version drift.
- **Security-conscious organizations** — Run `/cso` before every release for automated OWASP and STRIDE audits. Combine with `/guard` for maximum safety during production deployments.
- **Developer experience teams** — Run `/plan-devex-review` for interactive DX audits that explore developer personas, benchmark TTHW (time to hello world), and design your onboarding flow.

### Pros and Cons

Pros:

- The sprint pipeline structure is genuinely novel — most AI coding tools are point solutions, but gstack encodes a complete development process from product thinking to deployment.
- Cross-agent compatibility means you're not locked into Claude Code. The same skills work across Codex, Cursor, Hermes, and others.
- MIT license with 110K stars means the community can fork, extend, and maintain this independently of Garry Tan's involvement.

Cons:

- gstack is opinionated by design. If your development process doesn't match Tan's sprint model, you'll fight the tooling rather than benefit from it.
- The 23 specialist roles create a learning curve. New users face a wall of slash commands with overlapping responsibilities, and the documentation (490 lines in the README alone) assumes familiarity with concepts like STRIDE threat modeling and Diataxis documentation frameworks.
- Performance claims (810x productivity) are based on one person's experience with a specific set of repos. Your mileage will vary significantly depending on project complexity, team size, and how well the AI agent handles your specific codebase.

### Getting Started

```bash
# Install gstack for Claude Code (30 seconds)
git clone --single-branch --depth 1 https://github.com/garrytan/gstack.git ~/.claude/skills/gstack
cd ~/.claude/skills/gstack && ./setup

# Or install for multiple agents (auto-detects installed agents)
git clone --single-branch --depth 1 https://github.com/garrytan/gstack.git ~/gstack
cd ~/gstack && ./setup

# Try it: start with office hours to frame your next feature
# In Claude Code:
# /office-hours

# Then plan and build
# /autoplan
# [implement the plan]
# /review
# /ship

# Team mode — auto-update for shared repos
./setup --team
~/.claude/skills/gstack/bin/gstack-team-init required
git add .claude/ CLAUDE.md && git commit -m "require gstack for AI-assisted work"
```

### Alternatives

**Claude Code native skills** — Anthropic's built-in slash commands and skill system are simpler to set up but lack gstack's structured methodology. The native system gives you a blank canvas; gstack gives you a team. Choose native skills if you want minimal overhead and prefer to define your own workflows from scratch.

**OpenClaw** — The 247K-star AI agent that inspired much of gstack's philosophy. OpenClaw is a standalone agent platform with its own skill ecosystem (ClawHub). gstack actually integrates with OpenClaw — you can install native OpenClaw skills from ClawHub. Choose OpenClaw if you want a full agent platform; choose gstack if you want to enhance your existing Claude Code or Codex setup with structured roles.

**Aider** — A terminal-based AI coding assistant focused on pair programming with LLMs. Aider is simpler and more focused on code editing, while gstack covers the entire development lifecycle from product thinking to deployment. Choose Aider if you want a lightweight coding companion without the process overhead.

### Verdict

gstack is the most complete AI development workflow I've seen open-sourced. The 23 specialist roles aren't gimmicks — each one encodes a real engineering methodology with quality gates and cross-references to other skills. The sprint pipeline structure (think, plan, build, review, test, ship, reflect) mirrors how good engineering teams actually work, and the fact that each skill feeds into the next means you don't lose context between steps.

The 110K stars in three months reflect genuine developer demand for structured AI workflows, not just hype around Garry Tan's name. The MIT license and cross-agent compatibility mean this isn't locked to Claude Code or to YC's ecosystem. If you're using AI coding agents daily and feeling like you're underutilizing them, gstack is worth the 30-second install. Start with `/office-hours` on your next feature idea. You'll know within five minutes if the structured approach works for you.
