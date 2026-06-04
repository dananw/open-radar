---
name: skills-manage
description: "A Tauri desktop app for managing AI coding agent skills across Claude Code, Cursor, Gemini CLI, Codex, and 20+ platforms from one central library."
url: https://github.com/iamzhihuix/skills-manage
stars: 1976
forks: 179
language: TypeScript
tags: ["ai-agents", "developer-tools", "tauri", "react", "skills-management"]
featured: false
publishedAt: 2026-06-05
---

## Skills-Manage

### Overview

Skills-manage is a desktop application that solves a problem most developers didn't know they had until they hit it: managing AI coding agent skills across dozens of platforms. Built with Tauri v2, React 19, and Rust, it gives you a single interface to install, organize, and sync skills across Claude Code, Cursor, Gemini CLI, Codex, and more than 20 other AI coding tools. The repo hit nearly 2,000 GitHub stars within weeks of its April 2026 launch, which tracks with how fast the AI coding agent ecosystem is fragmenting.

The project follows Anthropic's open Agent Skills pattern and uses `~/.agents/skills/` as a canonical central directory. Skills installed there can be symlinked to individual platform directories, so one source of truth drives every tool you use. If you've ever manually copied a `.md` skill file between `~/.claude/skills/`, `~/.cursor/skills/`, and `~/.gemini/skills/`, you already understand why this exists.

The real problem is scale. In early 2026, the AI coding agent landscape exploded — Claude Code, Codex, Gemini CLI, Cursor, Windsurf, Trae, Junie, OpenCode, KiloCode, Amp, Kiro, and a dozen others all support some form of skill or instruction file. Each has its own directory, its own conventions, and its own discovery mechanism. Developers using two or three of these tools end up with fragmented skill libraries, version drift, and no way to know which skills are installed where. Skills-manage collapses that chaos into a single pane of glass.

### Why it matters

The AI coding agent space is moving faster than any single tool can track. According to a May 2026 GitHub survey, 68% of developers using AI coding assistants use more than one tool regularly. That means skill management — the instructions, workflows, and capabilities you've curated for your AI agents — is becoming a real operational burden. Skills-manage addresses this head-on.

What makes this project worth watching is the tech stack and the philosophy. Tauri v2 with React 19 and Rust gives you native performance with a web-standard frontend. The local-first, zero-telemetry approach means your skill library stays on your machine. And the marketplace browsing and GitHub import features mean you're not limited to writing skills from scratch — you can discover and pull in community-contributed skills with authenticated requests and retry logic.

The timing matters too. We're in the middle of a shift from "AI as autocomplete" to "AI as autonomous agent." Skills are the mechanism that makes agents useful — they encode domain knowledge, workflow patterns, and tool-specific behaviors. Managing them well is going to be as important as managing your npm dependencies. Skills-manage is early to that realization.

### Key Features

**Central Skill Library with Per-Platform Installs.** The core concept is a single `~/.agents/skills/` directory that acts as your source of truth. From there, you install skills to individual platforms via symlinks. Add a skill once, make it available everywhere. Uninstall from a specific platform without touching the others. This is the feature that makes the whole app make sense.

**20+ Supported Platforms.** The platform list is impressively comprehensive: Claude Code, Codex CLI, Cursor, Gemini CLI, Trae, Factory Droid, Junie, Qwen, Windsurf, Qoder, Augment, OpenCode, KiloCode, OB1, Amp, Kiro, CodeBuddy, Hermes, Copilot, Aider, and several Chinese-market tools like OpenClaw and QClaw. Custom platforms can be added through Settings, so you're not locked to the built-in list.

**Marketplace Browsing and GitHub Import.** You don't have to write every skill yourself. The built-in marketplace lets you browse published skills and install them with a click. There's also a GitHub repository import wizard that handles authenticated requests and retry fallback, so you can pull skills from any public repo. This turns skill management from a solo activity into a community-driven one.

**Collections for Batch Operations.** Group related skills into collections — say, a "frontend" collection with React, CSS, and accessibility skills, or a "backend" collection with database and API skills. Install an entire collection to a platform in one action. This is particularly useful when onboarding a new AI tool and wanting to replicate your existing setup quickly.

**Discover Scan for Project-Level Skills.** The app scans your filesystem for project-level skill libraries, including Obsidian vault skills under `.skills/`, `.agents/skills/`, and `.claude/skills/`. This means skills you've written for specific projects show up automatically — you don't have to manually register them.

**Full Skill Detail View with AI Explanations.** Each skill gets a rich detail view with Markdown preview, raw source view, and an optional AI-generated explanation. The AI explanation feature calls an external API (you provide the key) to summarize what a skill does, which is useful when you're browsing unfamiliar community skills. This is a smart use of AI that doesn't feel gimmicky.

**Local-First with No Telemetry.** All metadata, collections, scan results, and settings stay in a local SQLite database at `~/.skillsmanage/db.sqlite`. No analytics, no crash reporting, no usage tracking. Network access only happens when you explicitly use marketplace sync, GitHub import, or AI explanation generation. In an era where every dev tool phones home, this is refreshing.

### Use Cases

- **Multi-tool developers** — If you switch between Claude Code for complex refactors, Cursor for daily editing, and Gemini CLI for quick questions, skills-manage keeps your skill library consistent across all three without manual file copying.
- **Team skill distribution** — Create a collection of team-standard skills (coding conventions, architecture patterns, deployment procedures) and install them to every team member's preferred AI tool from one place.
- **Skill authors and publishers** — If you're building skills for the community, the marketplace integration and GitHub import make it easy to test how your skills appear and install in other people's environments.
- **Developers evaluating new AI tools** — When a new coding agent launches, you can install your full skill library to it in seconds instead of spending an hour manually configuring it.
- **Obsidian and knowledge-base users** — The discover scan picks up skills stored in Obsidian vaults, bridging the gap between your knowledge base and your AI coding tools.

### Pros and Cons

Pros:
- Solves a real, growing problem that will only get worse as the AI coding agent market fragments further. The 20+ platform support is genuinely comprehensive.
- Tauri v2 + React 19 + Rust is a modern, performant stack. The app feels fast and the binary is small compared to Electron alternatives.
- Local-first architecture with zero telemetry respects developer privacy. Your skill library never leaves your machine unless you choose to sync.
- Active development — the project went from zero to nearly 2,000 stars in under two months, and the platform support list keeps growing.

Cons:
- Currently only macOS has prebuilt binaries (`.dmg` and `.app.zip`). Windows and Linux users need to build from source, which requires Node.js, pnpm, and a Rust toolchain. This limits adoption.
- The macOS build is unsigned and notarized, which means Gatekeeper will block it by default. Users need to run `xattr -dr com.apple.quarantine` to get it working — a friction point that will scare off less technical users.
- The symlink-based install model assumes all platforms follow the `~/.platform/skills/` convention. Platforms that deviate from this pattern may not work correctly, and the custom platform feature requires understanding the directory structure.
- AI explanation generation requires an external API key and sends skill content to a third-party service, which may concern developers working with proprietary or sensitive skills.

### Getting Started

```bash
# Download the latest release for macOS
# https://github.com/iamzhihuix/skills-manage/releases/latest

# macOS: remove Gatekeeper quarantine after downloading
xattr -dr com.apple.quarantine "/Applications/skills-manage.app"

# Or build from source (requires Node.js, pnpm, Rust toolchain)
git clone https://github.com/iamzhihuix/skills-manage.git
cd skills-manage
pnpm install
pnpm tauri dev
```

Once open, the app scans your existing skill directories automatically. You'll see your central library at `~/.agents/skills/` and any platform-specific skills already installed. From there, you can create collections, browse the marketplace, or import skills from GitHub repos.

### Alternatives

**Manual symlink scripts** — You can manage skill symlinks yourself with shell scripts. This works if you use one or two platforms and know exactly which skills you need. But it doesn't scale, doesn't give you a UI for browsing or searching, and breaks when platform directory conventions change. Skills-manage is the right choice once you're juggling three or more AI coding tools.

**Platform-specific skill management** — Claude Code, Cursor, and others each have their own skill discovery and installation mechanisms. If you only use one platform, its native tooling is probably sufficient. Skills-manage becomes valuable when you're cross-platform and need consistency.

**Dotfiles managers (chezmoi, stow)** — Tools like chezmoi and GNU Stow can manage symlinks for skill directories as part of your broader dotfiles setup. This is a good option if you already have a dotfiles workflow and want skill management integrated into it. Skills-manage offers a visual interface and marketplace features that dotfiles managers don't.

### Verdict

Skills-manage is one of those tools that feels obvious in hindsight. The AI coding agent ecosystem is fragmenting rapidly, and skill management is the kind of infrastructure problem that nobody wants to solve manually. The project's fast growth to nearly 2,000 stars in under two months suggests the developer community agrees. The Tauri v2 + React 19 + Rust stack is modern and performant, and the local-first philosophy is the right call for a tool that handles your AI agent configurations. The main limitation is platform support — macOS-only binaries mean Windows and Linux developers have to build from source, which will slow adoption. But if you're on a Mac and using multiple AI coding agents, this is the kind of tool that saves you real time every week. Install it, import your existing skills, and stop thinking about directory paths.
