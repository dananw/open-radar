---
name: hunk
description: "Hunk is a review-first terminal diff viewer built for AI agent workflows — review multi-file changesets with inline annotations, sidebar navigation, and watch mode."
url: https://github.com/modem-dev/hunk
stars: 4588
forks: 109
language: TypeScript
tags: ["cli", "code-review", "diff", "git", "agentic-coding", "terminal"]
featured: false
publishedAt: 2026-06-06
---

## Hunk

### Overview

Hunk is a terminal-based diff viewer built specifically for reviewing code changes written by AI agents. It has 4,588 GitHub stars as of early June 2026, and it's growing fast — the kind of trajectory you see when a tool solves a problem people didn't realize they had until they tried it.

The project comes from Modem, a developer tools company. Hunk is built on OpenTUI (their terminal UI framework) and uses Pierre diffs for its diffing engine. The tool launched in March 2026, right when the agentic coding wave was hitting mainstream developer workflows. That timing wasn't accidental — the founders saw developers drowning in AI-generated diffs and built something to address the specific pain of reviewing code you didn't write.

The core problem: AI coding agents like Claude Code, Cursor, and Codex produce changesets that are fundamentally different from human-written code. They're larger, they touch more files, and the reasoning behind individual changes isn't always obvious from the diff itself. Traditional diff tools — `git diff`, delta, diff-so-fancy — were designed for human-authored commits where you understand the intent. When an agent rewrites 15 files across your codebase, you need a different review experience. Hunk is that experience.

### Why it matters

The shift to agentic coding is the biggest change in developer workflows since version control went mainstream. A 2026 Stack Overflow survey found that 78% of professional developers now use AI coding tools daily, and a growing chunk of those developers are running agents that write and modify code autonomously. The bottleneck has moved from "writing code" to "reviewing code." If you can't review what the agent produced quickly and accurately, the productivity gains evaporate.

Hunk addresses this directly. It's not a general-purpose diff tool with some AI features bolted on — it's designed from the ground up for the agent review workflow. The inline annotation system lets your AI agent explain its own changes right next to the code. The multi-file review stream with sidebar navigation lets you move through a 20-file changeset without losing context. The watch mode auto-reloads as the agent works, so you can review in real-time.

This matters for fullstack developers in particular. When you're working across React frontends, NestJS backends, database migrations, and infrastructure config, a single agent session can touch every layer of your stack. Hunk's responsive layout — split view for side-by-side comparison, stacked view for narrow terminals — adapts to whatever part of the stack you're reviewing.

### Key Features

**Multi-file Review Stream with Sidebar.** Hunk opens an entire changeset as a navigable stream, not individual file diffs. The sidebar shows all modified files with status indicators. You move through the changeset like reading a document — up and down through files, with the current file highlighted. This is how you review a 15-file agent changeset without losing your place.

**Inline Agent Annotations.** This is the feature that makes Hunk different from every other diff tool. Your AI agent can add notes directly beside the code it changed, explaining why each change was made. The annotations appear in the diff view, not in a separate panel or comment thread. You see the code and the reasoning in the same visual space. The agent workflow integration uses a skill file — tell your agent to load the Hunk skill, and it writes annotations to the live session.

**Watch Mode for Live Reviews.** Run `hunk diff --watch` and the view auto-reloads as files change on disk. This is designed for the agentic workflow where an agent is actively making changes in another terminal. You sit in Hunk watching the changeset update in real-time, reviewing as the agent works instead of waiting for it to finish and then reviewing a massive batch.

**Responsive Auto Layout.** Hunk automatically switches between split view (side-by-side old/new) and stacked view (old above new) based on terminal width and file characteristics. Long lines get wrapped or scrolled based on your config. The layout adapts to your terminal, not the other way around. This matters when you're reviewing in a tiling window manager with narrow panes.

**VCS Agnostic.** Works with Git, Jujutsu, and Sapling out of the box. Auto-detects which VCS you're using in the current directory. The commands mirror each VCS's native syntax — `hunk diff` works like `git diff`, `hunk show` works like `git show`. You can also compare raw files or pipe patches from stdin. No lock-in to a specific version control system.

**Git Pager Integration.** Set Hunk as your Git pager and every `git diff` and `git show` opens in the Hunk UI automatically. One config line: `git config --global core.pager "hunk pager"`. Your existing Git workflow stays the same, but the review experience upgrades. Same integration works for Jujutsu and Sapling.

**Customizable Themes and Config.** Ships with 10 built-in themes (graphite, midnight, paper, ember, catppuccin variants, zenburn) and supports custom themes with per-syntax-token color overrides. Config persists to `~/.config/hunk/config.toml`. Set your preferred layout mode, VCS, watch behavior, line wrapping, and agent note display. The config is TOML — simple and readable.

### Use Cases

- **Reviewing Claude Code or Cursor agent sessions** — When your AI agent modifies 10+ files across your React/NestJS codebase, Hunk's multi-file stream and sidebar let you review the entire changeset without switching between individual `git diff` commands.

- **Real-time code review during agent runs** — Use watch mode to monitor an agent's progress as it refactors your codebase. Catch issues early instead of reviewing everything at the end.

- **Teams adopting agentic coding workflows** — Standardize how your team reviews AI-generated code. The inline annotation feature creates an audit trail of why the agent made each change.

- **Reviewing large refactors** — Database migrations, API changes, and component library updates that touch dozens of files. The sidebar navigation and responsive layout make large changesets manageable.

- **Git workflow enhancement** — Even without AI agents, Hunk is a solid diff viewer. Use it as your default Git pager for a better `git diff` experience with syntax highlighting and keyboard navigation.

### Pros and Cons

Pros:

- Solves a real and growing problem — reviewing AI-generated code is the new bottleneck in developer workflows, and Hunk is purpose-built for it. The inline annotation feature alone justifies the tool's existence.

- Works with your existing setup. Git, Jujutsu, Sapling, any terminal, any OS. The pager integration means you don't change your habits — you just get a better view.

- MIT licensed and actively developed. The Modem team ships updates frequently, and the OpenTUI foundation means the terminal rendering is solid.

Cons:

- The agent annotation workflow requires setup — your AI tool needs to load the Hunk skill file, and the live-session integration is still maturing. It's not a zero-config experience yet.

- No structural diffing like difftastic. Hunk uses line-based diffs with syntax highlighting, which is fine for most code but can produce noisy diffs for large reformatting changes.

- Node.js 18+ dependency. If you're in a minimal environment without Node, you need to install it first. Homebrew and npm are the primary install paths.

### Getting Started

```bash
# Install globally via npm
npm i -g hunkdiff

# Or via Homebrew
brew install modem-dev/tap/hunk

# Review current repo changes
hunk diff

# Review with auto-reload as files change
hunk diff --watch

# Review the latest commit
hunk show

# Review a specific commit
hunk show HEAD~3

# Compare two files directly
hunk diff old-component.tsx new-component.tsx

# Set as Git pager (one-time setup)
git config --global core.pager "hunk pager"

# Now git diff opens in Hunk automatically
git diff
```

For agent integration, have your AI tool load the skill file returned by `hunk skill path`, then ask it to annotate changes as it works.

### Alternatives

**Difftastic** — A structural diff tool that understands syntax and produces cleaner diffs for code. Difftastic is better when you care about semantic accuracy — it won't show noise from bracket movements or whitespace changes. But it has no review UI, no sidebar navigation, and no agent integration. Choose Difftastic when you want better diffs; choose Hunk when you want a better review experience.

**Delta** — A syntax-highlighting pager for git diff and git show. Delta has been the standard upgrade over plain git diff for years. It adds line numbers, syntax highlighting, and side-by-side view. But it's a pager, not a review tool — no multi-file navigation, no watch mode, no agent annotations. Choose Delta when you want a prettier git diff; choose Hunk when you're reviewing agent-authored changesets.

**Lumen** — Another terminal diff viewer with an interactive review UI and sidebar navigation. Lumen is the closest competitor to Hunk in terms of features. The key difference is agent integration — Hunk's inline annotation system and live-session workflow are designed specifically for AI agent review, while Lumen is a general-purpose review tool. Choose Lumen if you don't use AI coding agents; choose Hunk if you do.

### Verdict

Hunk is the right tool at the right time. The agentic coding shift is real, and the review bottleneck is real. If you're running Claude Code, Cursor, Codex, or any AI coding agent and you're still reviewing changes with plain `git diff`, you're working harder than you need to. Hunk's multi-file review stream, inline annotations, and watch mode are designed for exactly this workflow. It's not perfect — the agent integration needs polish, and structural diffing would be a welcome addition — but it's the best tool available today for reviewing AI-generated code. At 4,588 stars and growing, the developer community is validating the approach. Worth installing if you use any AI coding tool regularly.
