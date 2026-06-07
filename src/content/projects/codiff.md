---
name: codiff
description: "Fast, beautiful local diff viewer with LLM-powered walkthroughs for reviewing Git changes before committing. Built for developers who code with AI agents."
url: https://github.com/nkzw-tech/codiff
stars: 630
forks: 36
language: TypeScript
tags: ["git", "diff-viewer", "code-review", "developer-tools", "ai-agents"]
featured: false
publishedAt: 2026-06-07
---

## Codiff

### Overview

Codiff is a minimal, native diff viewer for reviewing staged and unstaged Git changes before you commit. It launched mid-May 2026 and crossed 600 GitHub stars within three weeks — a pace that suggests developers have been waiting for something like this.

The project comes from NKZW Tech, a small engineering team that builds developer tooling. Their other work includes Nitro Modules for React Native and various TypeScript libraries. The team clearly cares about local-first, fast tooling — Codiff is a native desktop app, not an Electron wrapper, and it shows in the performance.

The core problem Codiff solves: reviewing code changes in the terminal is painful, especially when AI agents generate large diffs across multiple files. Traditional `git diff` output is wall-of-text that's hard to parse visually. GitHub's PR interface is better but requires pushing code first. Codiff gives you a fast, local, visual review experience that works before you commit — and it can ask an LLM to suggest a review order so you're not lost in a 30-file changeset.

### Why it matters

We're in an era where AI coding agents (Claude Code, Codex, Cursor) generate significant chunks of our code. The bottleneck has shifted from writing code to reviewing it. A 2025 GitHub survey found that developers spend 30-40% of their time on code review. When an agent rewrites 15 files across your codebase, that review time compounds fast.

Codiff addresses this directly with its LLM walkthrough feature. Run `codiff -w` and the tool asks Codex or Claude Code to analyze the changeset and suggest a logical review order — which files to look at first, what the key changes are, and how they connect. This is a practical use of AI in the development workflow, not a gimmick.

The timing matters too. Git's built-in diff tools haven't evolved much in a decade. VS Code's diff view is decent but tied to the editor. Tools like Delta and Diff2Html improve terminal diffs but don't offer integrated AI assistance or inline review comments. Codiff fills a gap that's gotten wider as AI-generated code becomes the norm.

### Key Features

**LLM-Powered Walkthroughs.** Run `codiff -w` to get an AI-generated review order and context for your changes. It supports both OpenAI Codex and Claude Code as backends, configured via `settings.agentBackend`. The agent analyzes the full changeset, identifies dependencies between files, and suggests a logical reading order. This alone saves 10-15 minutes on medium-to-large changesets.

**Native Performance.** Codiff is a native desktop application, not Electron. It launches fast and handles large repositories without the memory bloat you'd get from a web-based wrapper. Multiple repositories open in separate native windows, each maintaining independent state.

**Inline Review Comments.** Click on any changed line to add a review comment directly in the diff view. When you're done, copy all comments as Markdown with one action — paste them into a PR description, a Slack message, or a follow-up task. This bridges the gap between local review and team collaboration.

**Command Bar.** Press `Cmd+Shift+P` (or `Ctrl+Shift+P` on Linux/Windows) to open a command palette with filtered actions: focus file filter, find in diffs, show file tree, toggle viewed status, copy review comments, open file in editor. It's the same interaction pattern developers already know from VS Code.

**Split and Unified Diff Layouts.** Switch between side-by-side and unified diff views from the command bar or configuration. The `settings.diffStyle` config option lets you set your default, and word wrap is configurable for long lines. Small details, but they matter when you're reviewing code for an hour.

**Commit and File History.** Review specific commits with `codiff a1b2c3d`, not just staged changes. This makes it useful for post-commit review, investigating what changed in a particular revision, or walking through a branch's history before merging.

**Configurable Editor Integration.** Set `settings.editorCommand` to open files directly in your preferred editor from the diff view. Use `{file}` and `{repo}` placeholders for the file path and repository root. Works with VS Code, Sublime, Vim, or whatever you actually use.

### Use Cases

- **Reviewing AI-generated code** — When Claude Code or Codex generates changes across 10+ files, use `codiff -w` to get an intelligent review order instead of reading diffs file-by-file alphabetically.
- **Pre-commit quality checks** — Launch Codiff from any Git repository to visually inspect staged changes before committing. Catch unintended modifications, debug leftovers, or formatting issues.
- **Commit archaeology** — Pass a commit hash to review what changed in a specific revision. Useful for understanding why a particular change was made or investigating when a bug was introduced.
- **Team code review prep** — Add inline comments on changed lines, copy them as Markdown, and paste into your PR description or team channel before requesting formal review.
- **Multi-repo workflows** — Working on a microservices architecture? Open multiple repositories simultaneously in separate native windows, each with its own diff state.

### Pros and Cons

Pros:
- LLM walkthrough feature is genuinely useful for large changesets — not a toy demo, but a practical workflow improvement for developers who use AI coding agents daily.
- Native app performance is noticeably faster than Electron-based alternatives. Launches in under a second, handles large diffs without lag.
- Inline review comments with Markdown export bridge the gap between local review and team collaboration workflows.

Cons:
- macOS-focused at launch, with Homebrew as the primary install method. Linux and Windows support exists but the experience may be less polished.
- LLM walkthroughs require a working Codex or Claude Code CLI installation and valid API credentials — adds setup friction if you're not already using these tools.
- 600 stars and 5 open issues suggest active but early-stage development. Expect breaking changes in configuration format or CLI behavior.

### Getting Started

```bash
# Install via Homebrew (macOS)
brew install --cask nkzw-tech/tap/codiff

# Or download from GitHub Releases
# https://github.com/nkzw-tech/codiff/releases

# After installing the app, install the terminal helper
# Open: Codiff > Install Terminal Helper

# Review staged changes in current repository
codiff

# Review a specific repository
codiff /path/to/repository

# Review a specific commit
codiff a1b2c3d

# Start with LLM-generated walkthrough (requires Codex or Claude Code CLI)
codiff -w
codiff -w a1b2c3d

# Configure Codiff
# Open: Codiff > Open Config File...
# Or edit ~/.codiff/codiff.jsonc
```

### Alternatives

**Delta** — A syntax-highlighting pager for git diff, git log, and git show output in the terminal. Delta improves the terminal diff experience significantly with syntax highlighting, line numbers, and side-by-side view. It's the right choice if you want better terminal diffs without leaving the command line. Codiff is better when you want a full GUI review experience with AI assistance and inline comments.

**VS Code Diff View** — Built into VS Code, supports inline comments via GitHub Pull Requests extension, and handles most diff review needs. It's already installed for most developers. Codiff is better when you want a dedicated, fast review experience that's separate from your editor — especially useful when reviewing AI agent output before it touches your working files.

**GitKraken / Sublime Merge** — Full-featured Git GUIs with visual diff viewers, merge conflict resolution, and commit history browsers. Both are polished commercial products with more Git features than Codiff. Codiff is better when your primary need is fast diff review with AI walkthrough support, not full Git management.

### Verdict

Codiff is the diff viewer I didn't know I needed until I started using AI coding agents heavily. The LLM walkthrough feature alone justifies the install — when Claude Code touches 15 files in my codebase, I need a review order, not a wall of green and red. The native performance is a real advantage over Electron tools, and the inline comment workflow with Markdown export fits naturally into how teams actually review code. It's early-stage software with rough edges (the config schema is still settling, platform support is uneven), but 630 stars in three weeks tells me the developer community sees the same gap I do. If you're using Claude Code, Codex, or any AI agent that generates multi-file changesets, Codiff should be in your toolchain.
