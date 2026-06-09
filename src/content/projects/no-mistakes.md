---
name: no-mistakes
description: "no-mistakes is a Go-based local git proxy that runs AI-driven code review, testing, and linting before pushing — ensuring clean PRs every time."
url: https://github.com/kunchenguid/no-mistakes
stars: 1114
forks: 65
language: Go
tags: ["git", "code-review", "ai-agents", "devtools", "ci-cd"]
featured: false
publishedAt: 2026-06-09
---

## no-mistakes

### Overview

no-mistakes is a local git proxy that sits between your branch and your remote. Instead of `git push origin`, you push to a local gate that spins up a disposable worktree, runs an AI-driven validation pipeline — rebase, review, test, docs, lint — and only forwards upstream after every check passes. It then opens a clean PR automatically. The project crossed 1,100 GitHub stars within two months of its April 2026 launch, which is notable for a developer tool in a space (git workflows) that hasn't seen much innovation.

The project is built in Go by kunchenguid, a developer who's been active in the AI-agent tooling space. The tool is cross-platform (macOS, Linux, Windows) and ships as a single binary. What makes it stand out is the agent-native design: it installs a `/no-mistakes` skill for Claude Code, Codex, OpenCode, and other coding agents, so your AI assistant can drive the entire validation flow headlessly.

The core problem it solves is the review bottleneck. AI coding agents generate mountains of code — some brilliant, some slop. At 5,000 lines per diff, you can't manually tell which is which. Most quality infrastructure still lives in the outer loop, after the branch is already public. no-mistakes moves that validation closer to where you're working, before anything reaches your remote.

### Why it matters

The shift toward AI-generated code has created a new problem: volume. Claude Code, Codex, and similar agents can produce hundreds of lines per session. Traditional code review — human eyeballs on a diff — doesn't scale to that pace. CI/CD catches syntax and test failures, but it doesn't catch logic errors, missing documentation, or style drift until the PR is already open and reviewers are already context-switched.

no-mistakes addresses this by making validation a local, pre-push step that's as easy as `git push no-mistakes`. The pipeline is configurable, but the defaults are sensible: review, test, docs, lint. Safe fixes get applied automatically. Anything that touches developer intent gets escalated. The result is that your PRs are cleaner when they land, your CI passes more often on the first run, and your reviewers spend less time on mechanical issues.

The agent integration is what makes this interesting for 2026 specifically. As more developers use AI agents for coding, the workflow needs a quality gate that's native to those agents. no-mistakes installs as a skill, so you can tell Claude Code "implement this feature and gate it with /no-mistakes" and get a validated, PR-ready branch without touching the terminal.

### Key Features

**Disposable Worktree Isolation.** The pipeline runs in an isolated worktree that gets created and destroyed per run. Your working directory stays untouched — no stashing, no branch switching, no risk of losing work. If the pipeline fails, the worktree is cleaned up and your local state is exactly where you left it. This is a significant improvement over tools that modify your working tree directly.

**Agent-Agnostic Design.** Works with Claude, Codex, Rovodev, OpenCode, Pi, or any ACP-compatible agent via `acpx`. The `/no-mistakes` skill is installed automatically during `no-mistakes init` and adapts to whichever agent you're running. You're not locked into a specific AI provider or coding assistant.

**Three Trigger Modes.** You can invoke the gate three ways: `git push no-mistakes` for the explicit Git path, the `no-mistakes` TUI for an interactive wizard, or `/no-mistakes` as an agent skill for headless operation. The TUI mode is particularly nice — run `no-mistakes` after making changes (no commit needed) and a wizard walks you through branching, committing, and pushing through the gate.

**Automatic Safe Fixes.** Mechanical issues — formatting, import ordering, simple lint violations — get fixed automatically by the pipeline. Anything that requires judgment (logic changes, API design decisions, test coverage gaps) gets escalated as a finding you can approve, fix, or skip. This split between "safe to auto-fix" and "needs human decision" is well-calibrated.

**Clean PR Generation.** After every check passes, the gate pushes your branch upstream and opens a PR with an auto-generated body. No manual `git push origin`, no hand-written PR descriptions. The PR body includes what changed and why, generated from the pipeline's findings. Watch CI, auto-fix failures — all in one shot.

**Non-Blocking Workflow.** Because the pipeline runs in a separate worktree, you can keep working on other branches while the gate processes your push. There's no lockfile, no "waiting for gate to finish" state. Fire and forget, check results when you're ready.

**Built-In E2E Testing.** The project has an end-to-end test suite that records real interactions with Claude, Codex, and OpenCode CLIs. When agent wire formats change, `make e2e-record` re-records fixtures. This means the integration actually works against real agents, not mocked responses.

### Use Cases

- **Solo developers using AI agents** — If you're using Claude Code or Codex to generate features, `/no-mistakes` acts as a quality gate before code reaches your repo. You get validated, PR-ready branches without manually reviewing every AI-generated diff.
- **Small teams with light code review** — Teams that don't have dedicated reviewers can use no-mistakes to automate the mechanical parts of review (linting, testing, documentation) and focus human attention on architecture and design decisions.
- **Open source maintainers** — Contributors push through the gate, and maintainers get cleaner PRs with fewer "please fix formatting" comments. The auto-generated PR body also helps with context.
- **CI cost reduction** — By catching failures locally before pushing, you reduce the number of CI runs that fail on trivial issues. For teams paying per CI minute, this adds up.
- **Agent-driven development workflows** — Developers who let AI agents handle entire feature implementations can use `/no-mistakes` as the final validation step, creating a fully automated code-to-PR pipeline.

### Pros and Cons

Pros:
- The disposable worktree model is the right architectural choice — it keeps your working directory clean and makes the pipeline feel like a natural part of the git workflow rather than a bolt-on tool.
- Agent-agnostic design means you're not locked into Claude Code or Codex specifically. The skill system works across multiple agents, and the ACP support future-proofs it.
- The three trigger modes (git, TUI, agent skill) cover every workflow style. You can use it as a simple git alias or as a deep agent integration depending on your setup.
- The project has a real e2e test suite that records against actual agent CLIs, which is rare for tools in this space and suggests the maintainers care about correctness.

Cons:
- At 1,100 stars and two months old, the project is early-stage. The API surface is likely still settling, and you may encounter rough edges around edge cases (monorepos, submodules, unusual git workflows).
- The AI-driven review step requires API access to an LLM provider, which means per-push costs. For developers pushing frequently, this could add up — though the tradeoff is cleaner PRs and less CI waste.
- No built-in support for GitHub Actions or GitLab CI integration yet. The tool is purely local, so teams that rely on CI-based quality gates won't get the same benefit from the remote pipeline.

### Getting Started

```bash
# Install no-mistakes
curl -fsSL https://raw.githubusercontent.com/kunchenguid/no-mistakes/main/docs/install.sh | sh

# Initialize the gate in your repo
cd your-project
no-mistakes init

# Push through the gate instead of origin
git push no-mistakes your-branch

# Or use the TUI wizard (no commit needed)
no-mistakes

# Or use the agent skill
# In Claude Code: /no-mistakes implement the user settings page
```

The `no-mistakes init` command sets up the local gate remote and installs the `/no-mistakes` skill for any detected coding agents. From there, every push to `no-mistakes` runs the validation pipeline.

### Alternatives

**Danger JS** — A Ruby/JavaScript tool that runs during CI to automate code review comments. Danger is more mature and widely adopted, but it runs post-push in your CI pipeline rather than pre-push locally. Choose Danger if you want review automation that lives in CI and works across the team without local setup.

**Husky + lint-staged** — The classic pre-commit hook setup for running linters and formatters on staged files. Husky is simpler and doesn't require AI, but it only catches formatting and lint issues — no code review, no test execution, no PR generation. Choose Husky if your quality needs are purely mechanical and you don't want the complexity of an AI pipeline.

**GitHub Copilot Code Review** — GitHub's built-in AI code review that runs on pull requests. It's zero-setup and integrated into the platform, but it runs after you've already pushed and opened a PR. Choose it if you want AI review feedback within GitHub's UI and don't need the pre-push validation workflow.

### Verdict

no-mistakes is the kind of tool that makes you wonder why it didn't exist before. The idea of gating your git push behind a local AI validation pipeline is obvious in hindsight — especially now that AI agents are generating most of our code. The disposable worktree model is clean, the agent integration is thoughtful, and the three trigger modes mean it works for any workflow style. It's early (1,100 stars, two months old), so expect rough edges and API changes. But if you're using AI coding agents in 2026 and you're tired of pushing slop to CI only to fix it three cycles later, no-mistakes is worth installing today. The `/no-mistakes` agent skill alone — "implement this feature and gate it" — is a workflow upgrade that's hard to go back from.
