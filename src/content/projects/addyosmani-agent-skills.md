---
name: addyosmani-agent-skills
description: "Production-grade engineering skills for AI coding agents by Addy Osmani — 23 structured workflows for Claude Code, Cursor, Gemini CLI, and more."
url: https://github.com/addyosmani/agent-skills
stars: 49608
forks: 5542
language: Shell
tags: ["ai-agents", "developer-tools", "coding-agents", "claude-code", "cursor", "productivity"]
featured: false
publishedAt: 2026-06-10
---

## Agent Skills

### Overview

Agent Skills is a collection of 23 production-grade engineering workflows for AI coding agents, created by Addy Osmani and published in February 2026. It crossed 49,000 GitHub stars by early June — that kind of growth in under four months signals real developer demand, not hype. The project encodes the habits, quality gates, and decision frameworks that senior engineers use daily and packages them so AI agents follow them consistently.

Addy Osmani is an Engineering Manager on the Google Chrome team, author of "Learning JavaScript Design Patterns" and several other influential web development books, and creator of popular tools like Lighthouse and Critical. He's been writing about web performance and developer tooling for over a decade. When someone with that background ships a project aimed at making AI coding agents more disciplined, developers pay attention.

The core problem Agent Skills solves is deceptively simple: AI coding agents write code fast but often skip the steps that make code production-ready. They don't spec before coding. They don't break work into atomic tasks. They don't write tests as proof. They don't review with structured criteria. Agent Skills gives these agents a 7-command lifecycle — `/spec`, `/plan`, `/build`, `/test`, `/review`, `/code-simplify`, `/ship` — that maps to how experienced engineers actually work. Each command activates the right skills automatically, and skills also trigger contextually: designing an API pulls in `api-and-interface-design`, building UI activates `frontend-ui-engineering`.

### Why it matters

The AI coding agent space has exploded since early 2025. Claude Code, Cursor, Windsurf, GitHub Copilot, Gemini CLI — developers now have more options than ever for AI-assisted development. But there's a quality gap. These agents are fast at generating code and mediocre at generating *good* code. They'll build a feature without writing tests, create an API without thinking about error semantics, or ship a component without considering accessibility. The output looks correct but doesn't hold up under real-world conditions.

Agent Skills addresses this by treating AI agents like junior developers who need guardrails. The skills encode institutional knowledge — things like "always verify framework decisions against official docs" (source-driven-development), "review every non-trivial decision adversarially" (doubt-driven-development), or "measure before optimizing" (performance-optimization). These aren't generic prompts. They're structured workflows with verification gates, anti-rationalization tables, and specific criteria for when to apply each one.

The project also represents a shift in how we think about AI agent configuration. Instead of writing long system prompts or tweaking model parameters, you give your agent a library of domain-specific skills. It's closer to how teams onboard new engineers — you don't give them a style guide and say "go." You pair them with experienced developers who model the workflow.

### Key Features

**7-Command Development Lifecycle.** The slash commands — `/spec`, `/plan`, `/build`, `/test`, `/review`, `/code-simplify`, `/ship` — cover the entire development cycle from idea to production. Each command activates a curated set of skills relevant to that phase. You don't need to remember which skill applies when; the commands do the routing.

**23 Specialized Skills.** The pack includes skills for spec-driven development, test-driven development, incremental implementation, API design, frontend UI engineering, security hardening, performance optimization, code review, CI/CD, documentation, and more. Each skill is a self-contained Markdown workflow with steps, verification gates, and anti-rationalization tables that prevent the agent from rationalizing bad decisions.

**Context-Aware Activation.** Skills trigger automatically based on what the agent is doing, not just what command you ran. Building a React component? Frontend UI engineering activates. Designing a REST endpoint? API and interface design kicks in. This contextual awareness means the agent applies the right quality standards without manual intervention.

**Doubt-Driven Development.** One of the most interesting skills in the pack. It implements an adversarial review loop — CLAIM, EXTRACT, DOUBT, RECONCILE, STOP — where the agent questions its own decisions in a fresh context. For high-stakes changes (production code, security, irreversible decisions), it can escalate to a cross-model review. This directly addresses the "confident but wrong" failure mode that plagues AI agents.

**Multi-Agent Platform Support.** Works with Claude Code (recommended), Cursor, Gemini CLI, Windsurf, OpenCode, GitHub Copilot, Kiro, and any agent that accepts system prompts or instruction files. The skills are plain Markdown, so portability is built in. Install via marketplace, clone locally, or copy individual SKILL.md files into your agent's rules directory.

**Source-Driven Development.** The `source-driven-development` skill forces the agent to ground every framework decision in official documentation. It verifies claims against authoritative sources, cites what it references, and flags what remains unverified. This counters the tendency of LLMs to hallucinate API details or recommend deprecated patterns.

**Frontend and API Specializations.** Two skills specifically target fullstack web developers. `frontend-ui-engineering` covers component architecture, design systems, state management, responsive design, and WCAG 2.1 AA accessibility. `api-and-interface-design` covers contract-first design, Hyrum's Law, error semantics, and boundary validation. These aren't generic advice — they're structured workflows with specific checkpoints.

### Use Cases

- **Solo developers using Claude Code or Cursor** who want their AI agent to follow production-grade practices instead of generating quick-and-dirty code. Install once, and every coding session automatically benefits from structured workflows.

- **Teams standardizing AI agent behavior** across multiple developers. Instead of each developer writing their own prompts, the team shares a common skill library that ensures consistent code quality, testing standards, and review criteria.

- **Fullstack web developers building React/NestJS/Django/Go applications** who want their AI agent to apply framework-specific best practices. The frontend-ui-engineering and api-and-interface-design skills encode patterns specific to modern web stacks.

- **Developers working on high-stakes code** (security-sensitive features, production systems, irreversible migrations) who need the agent to apply extra scrutiny. The doubt-driven-development skill provides adversarial review that catches issues standard prompting misses.

- **Engineering managers onboarding junior developers** — the skills work as documentation of engineering best practices even when not used with an AI agent. New team members can read the workflows to understand how the team approaches spec, build, test, and ship.

### Pros and Cons

Pros:
- Created by Addy Osmani, whose track record with Chrome DevTools, Lighthouse, and web performance tooling gives the project immediate credibility. The skills reflect real production engineering experience, not theoretical best practices.
- Platform-agnostic design means you're not locked into a single AI coding tool. Skills work with Claude Code, Cursor, Gemini CLI, Windsurf, Copilot, and any agent that reads Markdown instruction files.
- The 49K-star growth in under four months indicates genuine developer adoption, not marketing-driven attention. The community is actively contributing skills and integration docs.

Cons:
- Skills are Shell/Markdown-based, which means they're instruction files rather than executable code. The agent has to "choose" to follow them — there's no enforcement mechanism if the model decides to skip steps.
- 23 skills is a lot to absorb. New users might feel overwhelmed by the catalog and default to using only the 7 slash commands without exploring the individual skills that would benefit their specific workflow.
- The quality of skill execution depends heavily on the underlying model. Claude Code handles the structured workflows well, but weaker models may struggle with the verification gates and anti-rationalization checks.

### Getting Started

```bash
# Install via Claude Code marketplace (recommended)
/plugin marketplace add addyosmani/agent-skills
/plugin install agent-skills@addy-agent-skills

# Or clone locally for any agent
git clone https://github.com/addyosmani/agent-skills.git

# For Cursor — copy skills into your rules directory
cp -r agent-skills/skills/* .cursor/rules/

# For Gemini CLI
gemini skills install https://github.com/addyosmani/agent-skills.git --path skills

# Start a session and use slash commands
# /spec  — Define what to build
# /plan  — Break it into tasks
# /build — Implement incrementally
# /test  — Write tests as proof
# /review — Code review before merge
# /ship  — Deploy with confidence
```

### Alternatives

**Cursor Rules / .cursorrules** — Community-maintained rule files for Cursor that encode best practices for specific frameworks and languages. More fragmented than Agent Skills (hundreds of individual rule files vs. a unified skill system) but more granular for specific tech stacks. Choose this if you want framework-specific rules without the full lifecycle workflow.

**Claude Code Custom Instructions** — Anthropic's built-in way to customize Claude Code behavior through project-level instruction files. Simpler to set up but less structured — you're writing freeform prompts rather than following a tested skill workflow. Good for lightweight customization, insufficient for enforcing production-grade practices.

**Cline/Roo Code Rules** — Similar concept of structured rules for AI coding agents, but focused on the Cline/Roo Code ecosystem. Less cross-platform portability than Agent Skills. Worth considering if you're committed to the Cline/Roo ecosystem specifically.

### Verdict

Agent Skills is the most practical framework I've seen for making AI coding agents behave like senior engineers. The 7-command lifecycle gives structure to what's otherwise a chaotic "generate and hope" workflow, and the 23 individual skills encode genuinely useful engineering practices — not generic advice, but specific workflows with verification gates and anti-pattern detection. The 49K stars in under four months reflect real demand, and Addy Osmani's involvement ensures the skills are grounded in production experience rather than theory. If you're using Claude Code, Cursor, or any AI coding agent for serious development work, installing Agent Skills should be one of the first things you do. The doubt-driven-development skill alone is worth the setup time for anyone working on code where correctness matters.
