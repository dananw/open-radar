---
name: codex-plus-plus
description: "Codex++ is an open-source enhancement launcher for OpenAI's Codex App — relay injection, plugin unlock, session management, and user scripts via CDP."
url: https://github.com/BigPizzaV3/CodexPlusPlus
stars: 18160
forks: 1136
language: Rust
tags: ["ai-tools", "developer-tools", "codex", "tauri", "productivity"]
featured: false
publishedAt: 2026-06-14
---

## Codex++

### Overview

Codex++ is an external enhancement launcher and manager for OpenAI's Codex App. It hit 18,000 GitHub stars in just over a month, which is remarkable for a tool that essentially wraps another product. The v1.2.4 release alone pulled 289,000 downloads. Those numbers tell you something: developers love Codex, but they want more control over it.

The project is built by BigPizzaV3, a developer from the Chinese tech community who clearly spends a lot of time inside Codex. The architecture is clean — a Rust backend handles the heavy lifting (launching, injection, configuration), while a Tauri 2.x + React frontend provides the management UI with dark and light themes. There's no Electron bloat here. The whole thing is under 10MB and requires no extra runtime.

The core problem Codex++ solves is that the official Codex App is a closed box. You get what OpenAI gives you. No relay injection for custom API providers. No way to unlock hidden plugins. No session management beyond what's built in. No user scripts. Codex++ uses the Chromium DevTools Protocol to inject enhancements externally — it never touches Codex's `app.asar` or writes DLLs into the installation. Think of it as a browser extension, but for a desktop app.

### Why it matters

If you're a fullstack developer using Codex for AI-assisted coding — whether you're writing React components, debugging NestJS services, or scaffolding Django APIs — you've probably hit at least one limitation. Maybe your API key budget runs through a relay provider and Codex doesn't support custom base URLs natively. Maybe you want to delete old sessions that are cluttering your workspace. Maybe you want to export your conversation history for documentation.

Codex++ addresses all of these with a non-invasive injection approach. The relay injection feature is probably the killer use case: it lets you route Codex's model requests through any compatible API provider while keeping your official ChatGPT login state intact. Your account features and plugins keep working. Only the model requests go through your custom endpoint. This is a big deal for developers in regions where direct OpenAI access is expensive or unreliable, and for teams that want to route traffic through their own API gateways for cost control.

The broader trend here is the "enhancement layer" pattern that's emerging across AI developer tools. We saw it with Codex++ for Codex, we've seen similar projects for Claude Code, and we'll see more. Developers don't just want to use AI tools — they want to customize, extend, and optimize them. Codex++ is the most successful implementation of this pattern so far, and its architecture is worth studying.

### Key Features

**Relay Injection.** Route Codex's model requests through any compatible API provider while keeping your official ChatGPT login. You add relay profiles with a custom Base URL and key in the manager, select the active profile, and apply. Codex++ writes the configuration to `~/.codex/config.toml` using the `CodexPlusPlus` provider name. Switching back to official mode is one click. This hybrid approach means you get the best of both worlds — official account features plus custom API routing.

**External CDP Injection.** Codex++ never modifies the original Codex installation. It uses the Chromium DevTools Protocol to inject a renderer script (`renderer-inject.js`) into the Codex page at startup. This is the same technique browser devtools use to interact with web pages. The result: zero risk of breaking your Codex installation, and Codex updates won't conflict with Codex++ enhancements.

**Plugin Entry Unlock and Forced Install.** Codex has plugins that may not be visible in all configurations. Codex++ can unlock the plugin entry and force-install plugins that Codex might not show by default. When relay injection is active, this becomes unnecessary (the relay mode handles it), but for users running in official mode, it's a useful capability.

**Session Management.** Delete sessions that Codex doesn't let you remove through the normal UI. Export session history as Markdown files for documentation or sharing. Move projects between locations. The Timeline feature provides a visual history of your coding sessions. These are small quality-of-life improvements that add up when you're using Codex for hours every day.

**User Script System.** Codex++ includes an independent user script manager with startup injection. You can write custom JavaScript that runs in the Codex page context, automating repetitive tasks or adding UI modifications. Scripts are managed through the Tauri manager interface and injected automatically when Codex launches.

**Provider Sync.** Switch between different API providers and Codex++ keeps your session history visible across switches. Provider Sync maintains backups in `~/.codex/backups_state/provider-sync` so you don't lose context when changing configurations. This is particularly useful for developers who use different providers for different tasks — one for code generation, another for debugging.

**Upstream Worktree Creation.** For Git users, Codex++ can create worktrees from `upstream/<base-branch>` after fetching the remote branch. This reduces conflicts caused by stale local HEAD state, which is a common pain point when multiple AI sessions are working on the same repository. It's a small feature, but it shows the developers understand real Git workflows.

### Use Cases

- **API relay routing** — Developers using third-party API providers (for cost savings or regional access) can route Codex model requests through their provider while keeping official account features intact
- **Session cleanup and export** — Teams building documentation from AI-assisted coding sessions can export conversation history as Markdown and clean up old sessions
- **Custom automation** — Power users can write user scripts to automate repetitive Codex workflows, like auto-filling prompts or modifying the UI for their specific needs
- **Plugin access** — Developers who can't see certain Codex plugins in their configuration can unlock and force-install them through Codex++
- **Multi-provider workflows** — Teams using different API providers for different tasks can switch seamlessly with Provider Sync maintaining context across switches

### Pros and Cons

Pros:
- Non-invasive architecture that never modifies the original Codex installation, eliminating the risk of breaking your setup or conflicting with Codex updates
- Massive community adoption with 18,000+ stars and nearly 300,000 downloads per release, indicating strong real-world utility and active maintenance
- Lightweight Tauri 2.x build under 10MB with no Electron overhead, fast startup, and native performance on Windows and macOS
- Relay injection solves a real pain point for developers who need custom API routing without losing official account features

Cons:
- No license file, which creates legal ambiguity for contributors and companies wanting to use or fork the project
- Primarily developed by a Chinese-language community with English documentation as a secondary effort, which may affect support quality for English-speaking users
- The project depends on Codex App's internal page structure — if OpenAI changes the UI, the CDP injection scripts may break until updated
- The recommendation/ads system loads content from external JSON files, which some users may find intrusive even if it's opt-in

### Getting Started

```bash
# Download the latest release from GitHub
# Windows: CodexPlusPlus-*-windows-x64-setup.exe
# macOS Intel: CodexPlusPlus-*-macos-x64.dmg
# macOS Apple Silicon: CodexPlusPlus-*-macos-arm64.dmg

# After installation, launch "Codex++ Manager" to configure:
# 1. Add relay profiles with your API Base URL and key
# 2. Select the active profile and apply relay injection
# 3. Launch "Codex++" to start Codex with enhancements

# For development (building from source):
git clone https://github.com/BigPizzaV3/CodexPlusPlus.git
cd CodexPlusPlus

# Frontend checks
cd apps/codex-plus-manager
npm install
npm run check
npm run vite:build

# Rust checks
cd ../..
cargo fmt --check
cargo test
cargo build --release
```

### Alternatives

**OpenCode** — An open-source AI coding agent that runs in the terminal. Unlike Codex++, which enhances an existing GUI app, OpenCode is a standalone CLI tool. Choose OpenCode if you prefer terminal-based workflows and don't want to depend on OpenAI's Codex App at all. Codex++ is better if you like Codex's UI but want more control over its behavior.

**Claude Code enhancement skills** — Various community projects (like guard-skills, builderio-skills) add capabilities to Claude Code through skill files. These are text-based configurations rather than code injection. They're simpler to set up but far less powerful than Codex++'s CDP-based approach. Choose these if you're using Claude Code instead of Codex and want lightweight customization.

**Direct API usage** — If all you need is custom API routing, you can skip Codex entirely and use the OpenAI API (or compatible endpoints) directly through your own client. This gives you maximum control but requires building your own UI. Codex++ is the middle ground — keep Codex's polished interface while adding the customizations you need.

### Verdict

Codex++ is the most successful "enhancement layer" project in the AI coding tool space right now. 18,000 stars and 290,000 downloads per release in under six weeks is not normal growth — it reflects genuine demand for what the tool provides. The relay injection feature alone justifies its existence for developers who need custom API routing, and the session management and user script features make it a daily-driver tool for power users. The CDP-based architecture is smart: it's non-invasive, survives Codex updates (mostly), and keeps the door open for future enhancements. The lack of a license is a real concern, and the ads system in recommendations will bother some people. But if you're using OpenAI Codex for your daily development work and you've hit any of its limitations, this is the first thing you should install. It's particularly valuable for fullstack developers working across React, NestJS, Django, and Go who use Codex as their primary AI coding assistant and need the flexibility that the official app doesn't provide.
