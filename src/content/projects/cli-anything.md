---
name: cli-anything
description: "CLI-Anything generates agent-native CLI wrappers for any software in one command, letting AI agents control Blender, GIMP, LibreOffice, and 100+ tools through structured commands."
url: https://github.com/HKUDS/CLI-Anything
stars: 42743
forks: 4023
language: Python
tags: ["ai-agents", "cli", "developer-tools", "automation", "open-source"]
featured: false
publishedAt: 2026-06-12
---

## CLI-Anything

### Overview

CLI-Anything hit 42,000 GitHub stars in three months. That kind of velocity usually signals either a hype cycle or a genuine gap in the ecosystem. In this case, it's the latter. The project solves a problem every developer working with AI agents has hit: agents can reason brilliantly but can't actually use real software. They can write you a Blender script but can't open Blender and render a scene. CLI-Anything fixes that by auto-generating a full CLI harness for any software, making it agent-native in one command.

The project comes out of HKUDS (the Hong Kong University Data Science lab), and the academic backing shows in the rigor. There's a published technical report on arXiv (2606.03854), 2,461 passing tests across 18 major applications, and a 7-phase automated pipeline that goes from source code analysis to PyPI publishing. This isn't a weekend hack — it's a research-backed system that happens to be incredibly practical.

The core idea is simple: CLI is the universal interface for both humans and AI agents. Text commands match LLM output formats, `--help` flags provide self-describing documentation that agents can discover, and structured JSON output eliminates parsing complexity. Rather than building fragile UI automation or limited API wrappers, CLI-Anything generates a complete Click-based Python CLI with REPL, JSON output, undo/redo, and session management — for any software with a codebase.

### Why it matters

The AI agent ecosystem is exploding, but there's a massive bottleneck: agents are stuck in sandboxes. They can write code, reason about problems, and generate plans, but they can't interact with the actual professional tools that humans use daily. Current solutions fall into two camps, both flawed. UI automation (screenshots + clicking) is fragile and breaks constantly. API wrappers are limited to whatever the software vendor chose to expose, which is often a fraction of the full capability set.

CLI-Anything takes a third approach: generate a CLI that talks directly to the software's actual backend. Blender's `bpy` Python API, LibreOffice's headless mode, GIMP's Script-Fu — the real thing, not a toy reimplementation. The demos are convincing: agents building Curiosity rover models in FreeCAD, creating HTTPS handshake diagrams in Draw.io, even playing Slay the Spire II autonomously. These aren't toy examples — they're complex, multi-step workflows that would be nearly impossible with UI automation.

For fullstack developers building AI-powered tools, this changes the calculus. Instead of writing custom integrations for every tool your agent needs to use, you generate a CLI harness once and your agent gets structured, reliable access. The CLI-Hub package manager means you don't even need to generate anything — just `cli-hub install gimp` and your agent can start using GIMP immediately.

### Key Features

**7-Phase Automated Pipeline.** Feed it a codebase and the system runs through analysis, architecture design, implementation, test planning, test writing, documentation, and publishing — all automatically. The pipeline uses a Claude Code plugin but works with Pi, OpenClaw, Codex, Hermes, and other coding agents. Each phase builds on the previous one, and the output is a pip-installable Python package.

**Authentic Software Integration.** This is the feature that separates CLI-Anything from every other agent-tool bridge. Generated CLIs call real application backends — Blender renders actual 3D scenes via `bpy`, LibreOffice generates real PDFs through headless mode, Audacity processes audio through `sox`. No screenshots, no pixel-clicking, no toy implementations. The 2,461 tests validate against real software installations.

**CLI-Hub Package Manager.** `pip install cli-anything-hub` gives you a central registry to browse, search, install, update, and uninstall CLI harnesses. `cli-hub list` shows everything available, `cli-hub install gimp` sets up a GIMP CLI in seconds. The hub covers 18+ major applications with more added weekly through community contributions. Agents can also use the CLI-Hub meta-skill to autonomously discover and install the right CLI for a task.

**SKILL.md Auto-Generation.** Every generated CLI ships with a `SKILL.md` file that makes it discoverable by AI agents through standard skill protocols. The file includes YAML frontmatter, command group documentation, usage examples, and agent-specific guidance for JSON output and error handling. Install the meta-skill with `npx skills add HKUDS/CLI-Anything --skill cli-hub-meta-skill -g -y` and agents can find and use any CLI autonomously.

**Multi-Platform Agent Support.** CLI-Anything works across the agent ecosystem — Claude Code (plugin marketplace), Pi (extension), OpenClaw (skill), Codex (skill), Hermes (skill), OpenCode (commands), GitHub Copilot CLI (plugin), Goose, Qodercli, and Reasonix. The generated CLI format is the same regardless of which agent built it, so you're not locked into a single platform.

**Structured JSON Output.** Every command supports `--json` flag for structured output that agents can parse reliably. This eliminates the brittle text parsing that plagues most agent-tool integrations. Combined with the self-describing `--help` flags, agents can discover capabilities, understand parameters, and consume results without custom parsing logic.

**Refinement Loop.** After the initial build, `/cli-anything:refine` performs gap analysis between the software's full capabilities and current CLI coverage, then implements missing commands, tests, and documentation incrementally. Run it multiple times to expand coverage — each pass is non-destructive and additive.

### Use Cases

- **Automating creative workflows** — Agents use GIMP, Blender, Inkscape, or Krita to produce images, 3D models, and vector graphics without human intervention. A marketing team could have an agent generate social media graphics from templates automatically.

- **Document and office automation** — LibreOffice CLI lets agents convert documents, generate spreadsheets, and build presentations programmatically. Combine with data pipelines for automated report generation.

- **Agent-powered development environments** — Give your coding agent access to n8n for workflow automation, Jenkins for CI/CD, or Gitea for repository management through structured CLI commands instead of fragile API calls.

- **Research and data analysis** — Agents use QGIS for geospatial analysis, FreeCAD for CAD modeling, or Zotero for reference management. The scientific computing category covers ImageJ, ParaView, Gephi, and more.

- **Building agent-native internal tools** — Feed your company's internal tool codebase to CLI-Anything and get a CLI that agents can use immediately. Custom enterprise software becomes agent-accessible without building APIs.

### Pros and Cons

Pros:

- Solves a real, universal problem in the agent ecosystem. Every team building AI agents hits the "agents can't use real software" wall, and this is the most principled solution available.
- The 7-phase pipeline produces genuinely production-grade output — 2,461 tests, real software validation, proper packaging. This isn't a code generation toy.
- CLI-Hub creates a network effect. The more CLIs the community builds, the more valuable the ecosystem becomes for every agent platform.
- Apache 2.0 license with active development from HKUDS and a growing contributor community. New CLIs land weekly.

Cons:

- Python-only output. Generated CLIs are Click-based Python packages. If your stack is Go or Rust, you'll need Python installed to use them.
- Some CLIs require the target software installed locally. The Blender CLI needs Blender, the GIMP CLI needs GIMP — there's no cloud fallback for desktop applications.
- The 7-phase pipeline is compute-intensive and takes significant time for complex software. Generating a CLI for a large codebase like Blender isn't instant.
- Community-contributed CLIs vary in quality. The in-repo harnesses (GIMP, Blender, LibreOffice) are well-tested, but some public registry entries may be less polished.

### Getting Started

```bash
# Install the CLI-Hub package manager
pip install cli-anything-hub

# Browse available CLIs
cli-hub list
cli-hub search blender

# Install and use a CLI immediately
cli-hub install gimp
cli-anything-gimp --help
cli-anything-gimp --json project new --width 1920 --height 1080 -o poster.json

# Or build a new CLI for any software (requires Claude Code, Pi, or other agent)
# Add the Claude Code plugin marketplace
/plugin marketplace add HKUDS/CLI-Anything
/plugin install cli-anything

# Generate a complete CLI harness
/cli-anything ./path-to-software

# Refine coverage iteratively
/cli-anything:refine ./path-to-software "batch processing and filters"
```

### Alternatives

**MCP (Model Context Protocol)** — Anthropic's protocol for connecting AI models to external tools via JSON-RPC servers. MCP requires each tool to implement a custom server, while CLI-Anything auto-generates the interface from source code. Choose MCP when you're building a custom integration for a specific tool with a dedicated team. Choose CLI-Anything when you want agent access to many tools quickly.

**LangChain Tool Use** — LangChain provides a framework for giving LLMs access to external tools through function calling. The integrations are hand-built and cover popular APIs. CLI-Anything generates tool access automatically for any software with a codebase, not just pre-built integrations. Choose LangChain when you need a curated set of well-documented integrations. Choose CLI-Anything when you need access to niche or internal tools that don't have LangChain support.

**UI Automation (Playwright, Puppeteer)** — Browser and desktop automation through screenshot analysis and click simulation. It works for any software with a GUI but is fragile, slow, and expensive in tokens. CLI-Anything bypasses the GUI entirely by talking to software backends directly. Choose UI automation when the software has no programmatic interface whatsoever. Choose CLI-Anything in every other case.

### Verdict

CLI-Anything is the most practical bridge between AI agents and real software that exists right now. The 42K stars in three months reflect genuine developer demand — every team building agents has hit the wall where their AI can reason about a task but can't actually execute it in real software. The 7-phase pipeline produces production-grade CLIs, the CLI-Hub creates a growing ecosystem of ready-to-use harnesses, and the multi-platform support means you're not betting on a single agent framework. It's Python-only output and requires local software installation, which limits some deployment scenarios. But for any developer building AI agents that need to interact with professional tools — whether that's Blender for 3D, LibreOffice for documents, GIMP for images, or your company's internal software — CLI-Anything is the fastest path from "agent can't use it" to "agent controls it fluently." The academic rigor from HKUDS, combined with the rapidly growing community contribution pipeline, suggests this project has serious staying power.
