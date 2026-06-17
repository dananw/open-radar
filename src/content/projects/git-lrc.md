---
name: git-lrc
description: "git-lrc is a free Go-based tool that hooks into git commit and runs AI code reviews on every diff — catching bugs, security issues, and bad patterns before code ships."
url: https://github.com/HexmosTech/git-lrc
stars: 1356
forks: 181
language: Go
tags: ["code-review", "ai", "git", "developer-tools", "go"]
featured: false
publishedAt: 2026-06-17
---

## git-lrc

### Overview

git-lrc is a Go-based CLI tool that hooks into `git commit` and runs an AI-powered code review on your staged diff before the commit goes through. It's built by HexmosTech, a developer tools company based in India that also makes a broader suite of free developer utilities under their "FreeDevTools" brand. The project launched in February 2026 and has climbed to over 1,350 GitHub stars in four months, with 181 forks and active daily development.

The core problem git-lrc solves is painfully familiar to anyone using AI coding assistants in 2026: AI-generated code looks correct but silently breaks things. It removes edge cases, relaxes validation, introduces expensive API calls, leaks credentials, and changes behavior without flagging any of it. By the time you notice in production, the damage is done. PR-level review tools like CodeRabbit or GitHub's Copilot code review catch problems after the code is already committed and pushed. git-lrc intervenes earlier — at the commit stage — when the change is still fresh and fixing it is cheap.

The tool scans diffs against 10 risk categories and over 100 specific failure patterns, organized into three pillars: Outages (reliability, correctness, performance, operational readiness), Breaches (security and compliance), and Debt (maintainability, testing, documentation). Each finding gets an inline comment at the exact line, with severity badges (Critical, Warning, Info) and explanations of why the pattern is dangerous.

### Why it matters

AI coding assistants are now used by the majority of professional developers, but the quality assurance tooling hasn't kept up. GitHub's own data shows that Copilot suggestions require modification 30-40% of the time. Claude Code, Cursor, and similar agentic tools generate entire files and multi-file changes — the blast radius of a bad generation is much larger than a single autocomplete suggestion. The gap between "AI writes code" and "AI writes correct code" is where bugs ship.

git-lrc fills that gap at the right moment in the workflow. Not in the IDE (where it's optional and easy to skip), not at PR time (where the code is already in the branch and the team is context-switching to review), but at commit — the one step every developer does regardless of their editor, AI tool, or team size. It's the Git hook approach, which means it works with any language, any framework, any editor. React frontend, NestJS backend, Go microservice, Django app — it doesn't matter. If it's a diff, it gets reviewed.

The timing matters too. AI-generated codebases are growing faster than human review capacity. Teams are shipping more code per developer than ever, but the number of senior engineers who can spot subtle bugs hasn't kept pace. Tools that automate the first pass of review and flag the obvious problems let human reviewers focus on architecture, design, and business logic — the things AI still gets wrong.

### Key Features

**Commit-Time Review via Git Hook.** git-lrc installs as a global git hook, so every `git commit` on any repository automatically triggers an AI review of the staged diff. No per-repo configuration needed. The review opens a local web UI showing GitHub-style diffs with inline AI comments. You can also run `git lrc review` manually before committing to iterate on fixes.

**10 Risk Categories with 100+ Failure Patterns.** The review engine checks for problems across three pillars — Outages, Breaches, and Debt. Outages covers reliability (unhandled errors, missing retries, race conditions), correctness (logic errors, null handling, API contract violations), performance (unindexed queries, memory leaks, N+1 patterns), and operational readiness. Breaches covers security (secrets in code, injection, insecure defaults) and compliance. Debt covers maintainability, testing gaps, and documentation. Each category has 10 specific patterns.

**Bring Your Own AI Key (BYOK).** The default setup uses Google's Gemini API (free tier), but you can configure OpenAI, Claude, DeepSeek, OpenRouter, or Atlas Cloud as the review backend. Connectors are managed through the `lrc ui` command. You reorder them to set priority. This means you're not locked into a specific AI provider, and you can use whichever model gives the best reviews for your codebase.

**Repository Rules and Custom Instructions.** You can create a `.lrc/` directory at the root of your repo with custom review instructions — team-specific patterns, preferred approaches, off-limits dependencies. The rules are capped at 3,000 characters intentionally, because a concise set of high-signal guidelines outperforms a twenty-page style guide. Rules are version-controlled alongside your code.

**Iteration Tracking with Coverage Metrics.** Each review cycle is an "iteration." The tool tracks how many iterations you did and what percentage of the final diff was AI-reviewed. This metadata gets appended to the git commit message — `LiveReview Pre-Commit Check: ran (iter:3, coverage:85%)` — so your team can see at a glance which commits went through rigorous review and which were vouched or skipped.

**Issue Navigator and Summary Deck.** The web UI includes an Issue Navigator that lets you filter findings by severity, category, and type. There's also a Summary Deck — a slide-style overview of what changed, what risks were flagged, and the technical highlights. You can copy all issues or "Send to Claude" to feed them back into your AI agent for fixing.

**Claude Code Integration.** Installing git-lrc also installs `claude-lrc`, which gives you the same review workflow as slash commands inside Claude Code — `/lrc:review`, `/lrc:vouch`, `/lrc:skip`. This means you can stay in your AI coding environment and still get the structured review without switching to a terminal.

### Use Cases

- **Solo developers using AI coding assistants** who want a safety net before pushing code — catch the subtle bugs that AI agents introduce without slowing down your workflow
- **Small teams shipping fast** where formal PR reviews are a bottleneck — git-lrc gives every commit a baseline quality check without requiring a second human reviewer
- **Fullstack developers working across React, NestJS, Django, and Go** who need language-agnostic review — the tool works on any diff regardless of the tech stack
- **Security-conscious teams** that want to catch hardcoded secrets, injection vulnerabilities, and insecure defaults before they reach the repository
- **Engineering managers** who want visibility into code quality without micromanaging — the git log tracking shows which commits were reviewed, how many iterations, and what coverage

### Pros and Cons

Pros:
- Completely free at the individual tier (30k LOC/month), with BYOK so you bring your own AI API keys. No per-seat pricing that punishes growing teams.
- Works at commit time, not PR time — catches problems before they enter git history, which is earlier than every competing tool.
- Language and framework agnostic — works on React, Go, Python, TypeScript, whatever. The git hook approach means zero per-project setup.
- The iteration and coverage tracking in git messages creates an auditable quality trail without any extra process overhead.

Cons:
- The free tier's 30k LOC/month limit will run out quickly on large codebases or teams that commit frequently. Premium starts at $32/month for 100k LOC.
- Review quality depends on the underlying AI model. Gemini (the default) may miss nuances that Claude or GPT-4 catch, especially on complex architectural patterns.
- The tool opens a browser-based web UI for every review, which adds friction if you're working in a headless environment or prefer terminal-only workflows.

### Getting Started

```bash
# Install via IPM (recommended)
curl -L https://hexmos.com/ipm-install | bash && ipm i HexmosTech/git-lrc

# Or direct install on Linux/macOS
curl -fsSL https://hexmos.com/lrc-install.sh | bash

# One-time setup (opens browser for API keys)
git lrc setup

# Initialize repo-specific rules (optional)
lrc config init

# Review before committing
git add .
git lrc review

# Or let it run automatically on commit
git add .
git commit -m "your changes"
# Review launches automatically — Commit, Commit & Push, or Skip
```

### Alternatives

**CodeRabbit** — A cloud-based AI code review platform that integrates at the PR level. CodeRabbit is more feature-rich for team workflows (review threads, auto-approvals, learning from feedback) but operates after code is already pushed. Better choice if you want a full PR review experience with team collaboration features.

**Qodo Merge (formerly PR-Agent)** — An open-source AI code review tool that also works at the PR level. Supports multiple AI backends and has strong GitLab integration. Better choice if your team does all review at the PR stage and wants an open-source option with self-hosting.

**Sourcery** — An AI code review tool focused on Python that suggests refactoring improvements. More opinionated about code style and patterns. Better choice if you're a Python-heavy team that wants automated refactoring suggestions rather than security and reliability checks.

### Verdict

git-lrc fills a gap that surprisingly few tools have targeted: the commit-time review window. Every other AI code review tool operates at the PR level, which means bad code is already in the branch by the time you see the feedback. For developers using AI coding assistants — and in mid-2026 that's most of us — having a lightweight, free, language-agnostic safety net at commit time is genuinely useful. The 1,350 stars in four months reflect real adoption, not hype. The iteration tracking and coverage metrics are a smart addition that turns a simple hook into something that gives engineering managers real visibility. If you're a fullstack developer shipping AI-generated code across multiple languages and frameworks, git-lrc is worth the sixty seconds it takes to install.
