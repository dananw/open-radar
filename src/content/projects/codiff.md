---
name: codiff
description: "Codiff is a beautiful, minimal local diff viewer for Git with LLM-powered walkthroughs and inline PR/MR review comments. Built in TypeScript."
url: https://github.com/nkzw-tech/codiff
stars: 894
forks: 54
language: TypeScript
tags: ["git", "diff-viewer", "code-review", "developer-tools", "typescript"]
featured: false
publishedAt: 2026-06-17
---

## Codiff

### Overview

Codiff is a local diff viewer for Git that does something most diff tools don't: it treats code review as a first-class workflow, not an afterthought. Launched in May 2026 by NKZW Tech, it hit nearly 900 GitHub stars within its first month, which is notable for a developer tool that competes in a space where most developers have settled for `git diff` in the terminal or the built-in views in VS Code and JetBrains.

The project comes from NKZW Tech, a team that previously built Vento, a fast JavaScript template engine, and Vento Pack (vp), a monorepo build tool. That background shows in Codiff's design — it's fast, opinionated about what matters, and doesn't try to be everything. The tool is built on Electron but feels native, with a command bar, keyboard-driven navigation, and split/unified diff views that render without the lag you'd expect from a web-based desktop app.

The core problem Codiff solves is the gap between "seeing what changed" and "understanding what changed." Traditional diff tools show you red and green lines. Codiff adds an LLM-generated narrative walkthrough that explains the intent behind changes, supports inline review comments on GitHub pull requests and GitLab merge requests, and lets you commit directly from the review interface. It's the difference between reading a raw git log and having someone walk you through the change.

### Why it matters

Code review is one of the highest-leverage activities in software development, yet the tools for it are surprisingly primitive. GitHub's PR interface is fine for small changes, but anything over 500 lines becomes a scroll-fest. Most local diff viewers haven't evolved much beyond what WinMerge offered in 2004. Codiff represents a shift: what if your diff tool understood the code, not just the text?

The LLM walkthrough feature is the headline, but the real value is in the workflow. You run `codiff` from any repo, get a clean interface showing exactly what changed, optionally generate an AI walkthrough that explains the change in plain language, add inline review comments, and push — all without leaving the app. For teams doing trunk-based development with frequent small PRs, this eliminates the context-switching cost of bouncing between terminal, browser, and IDE.

The timing connects to a broader trend of AI-assisted developer workflows. Tools like Cursor, Claude Code, and Copilot are changing how code gets written. Codiff addresses the other side: how code gets reviewed. As AI agents write more code, the review step becomes more important, not less. A tool that makes review faster and more thorough has a real place in the modern stack.

### Key Features

**LLM-Powered Walkthroughs.** Run `codiff -w` and get an AI-generated narrative that explains what the diff does and why. It supports both OpenAI Codex and Claude Code as backends, selected via config or the `--agent` flag. The walkthrough isn't just a summary — it's structured with hunk IDs and review-order constraints, so it guides you through the change in a logical sequence rather than dumping a wall of text.

**Inline Review Comments.** Comment directly on GitHub pull requests and GitLab merge requests from within Codiff. No need to open a browser. You can also copy review comments as Markdown for follow-ups in Slack, Notion, or wherever your team tracks work. Comments are anchored to specific lines, just like in GitHub's web UI.

**GitHub PR and GitLab MR Support.** Review a pull request with `codiff pr 75` or a merge request with `codiff mr 23`. Codiff derives the host and project path from your Git remote, so there's no instance-specific configuration needed. It works with GitHub, GitLab, and any GitLab self-hosted instance — you pass the full URL or just the number.

**Command Bar Navigation.** Press Cmd+Shift+P (or Ctrl+Shift+P on Linux/Windows) to open a command bar that lets you filter files, find in diffs, toggle viewed status, switch diff layout, and open files in your editor. It's the same command palette pattern that VS Code popularized, applied to code review.

**Native Performance on Electron.** Codiff is built with TypeScript on Electron but uses Vento Pack for its build pipeline, which keeps the bundle tight. The app launches fast, renders diffs without jank, and handles large repositories without choking. Multiple repos open in separate windows, each isolated.

**Agent Skill Integration.** Install Codiff's skill into Claude Code, Codex, Pi, or OpenCode, and your AI agent can invoke Codiff directly. The `$codiff` command writes a narrative walkthrough and opens it in Codiff, preserving the conversation context. This turns Codiff into the visual layer for AI-assisted code review.

### Use Cases

- **Daily PR reviews** — Pull up any GitHub PR or GitLab MR from the terminal, read the AI walkthrough, add inline comments, and submit your review without touching a browser.
- **Pre-commit review** — Run `codiff` in any repo to see exactly what you're about to commit. The staged and unstaged changes are shown side by side, with file-level navigation.
- **Onboarding to a new codebase** — Use walkthroughs to understand what recent changes do. Instead of reading raw diffs, get an AI explanation that connects the dots between related changes.
- **AI agent code review workflow** — When Claude Code or Codex generates a change, use Codiff to review it visually. The agent skill integration means the AI can open its own work in Codiff for human review.
- **Commit archaeology** — Run `codiff a1b2c3d` to review a specific commit with full context, or `codiff main` to see everything your branch changes compared to the target.

### Pros and Cons

Pros:
- The LLM walkthrough feature is genuinely useful, not gimmicky. It uses structured output with hunk IDs and review ordering, so the explanation maps directly to the diff view. Most AI code tools just summarize — Codiff guides.
- First-class GitLab support is rare in this space. Most diff tools assume GitHub; Codiff handles GitLab self-hosted instances without extra configuration.
- The command bar and keyboard shortcuts make it fast to navigate large diffs. The "toggle viewed" feature alone saves significant time on PRs with 30+ files.

Cons:
- Electron-based, so it carries the usual memory overhead (~150-200MB baseline). If you're on a machine with 8GB RAM and multiple Electron apps already running, you'll feel it.
- The LLM walkthrough feature requires a running Codex or Claude Code CLI with valid credentials. There's no built-in AI — it shells out to external tools. This adds setup friction and means walkthrough quality depends on your backend choice.
- macOS-first development. Linux and Windows are supported but the experience is less polished — the terminal helper install flow, for example, is documented only for macOS.

### Getting Started

```bash
# Install via Homebrew (macOS)
brew install --cask nkzw-tech/tap/codiff

# Or download from GitHub Releases for your platform
# https://github.com/nkzw-tech/codiff/releases

# Install the terminal helper (macOS: Codiff > Install Terminal Helper)
# Then use from any Git repository:
codiff                          # review working tree changes
codiff main                     # review branch vs main
codiff a1b2c3d                  # review a specific commit
codiff pr 75                    # review a GitHub PR
codiff -w                       # generate LLM walkthrough (requires Codex or Claude CLI)

# Configure walkthroughs
# Open Codiff > Open Config File... and set:
# "agentBackend": "codex" or "claude"
# "claudeModel": "claude-sonnet-4-6"
```

### Alternatives

**GitHub Desktop** — The default choice for developers who want a GUI for Git. It's simpler, more widely used, and has better staging/unstaging UX. But it lacks AI walkthroughs, inline PR review comments, and keyboard-driven navigation. Choose GitHub Desktop if you just need a visual Git client and don't care about code review workflows.

**VS Code's Built-in Diff View** — Good enough for quick comparisons, and it has the advantage of being in your editor. But it doesn't support PR review, doesn't generate walkthroughs, and the side-by-side view gets cramped on smaller screens. Choose VS Code diffs for quick inline checks, Codiff for dedicated review sessions.

**Reviewable** — A web-based code review tool that's more feature-complete for large-team workflows (assignable reviewers, per-line discussions, review status tracking). But it's SaaS, not local, and doesn't integrate with AI walkthroughs. Choose Reviewable if you need enterprise review workflows; choose Codiff if you want a fast local tool with AI assistance.

### Verdict

Codiff fills a gap I didn't realize was so wide until I used it. Every developer reviews code daily, and the tools for it have barely changed in a decade. The LLM walkthrough feature alone makes it worth trying — it's the difference between staring at a 500-line diff and having someone explain it to you in 30 seconds. The GitLab support is a genuine differentiator; most competitors pretend GitLab doesn't exist. At 894 stars in its first month with active development from the NKZW team, this has the momentum to become a standard part of the developer toolkit. If you review more than a few PRs a week, install it and run `codiff -w` on your next review. You'll see the value immediately.
