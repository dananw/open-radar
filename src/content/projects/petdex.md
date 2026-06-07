---
name: petdex
description: "Petdex is an open-source gallery of animated companions for coding agents like Codex, Claude Code, and Gemini CLI — install, create, and showcase pixel pets with one command."
url: https://github.com/crafter-station/petdex
stars: 2911
forks: 118
language: TypeScript
tags: ["nextjs", "drizzle-orm", "developer-tools", "ai-agents", "pixel-art"]
featured: false
publishedAt: 2026-06-07
---

## Petdex

### Overview

Petdex hit 2,900 GitHub stars in just over a month. That's a lot of attention for what's essentially a Pokédex for coding agent mascots — but the speed makes sense once you see the execution. It's a three-part system: a web gallery at petdex.dev, a CLI that installs pets into your coding environment with one command, and a desktop app that floats a reactive mascot on your screen, responding to your agent's activity in real time.

The project comes from Crafter Station, a dev studio led by Railly Hugo (@RaillyHugo). They've built a surprisingly polished product for something that started as a fun community project. The tech stack reads like a modern fullstack developer's dream: Next.js 16, React 19, Tailwind CSS, Drizzle ORM with Postgres, Clerk for authentication, Cloudflare R2 for asset storage, and Bun for the CLI. The desktop component is built with Zig on a fork of Vercel's zero-native.

The core idea is simple but clever. Coding agents like Codex and Claude Code now support animated pets — little pixel-art companions that sit in your terminal or editor. Petdex standardizes the format (an 8×9 spritesheet with named animation states like idle, wave, run, failed, and review), hosts a community gallery where anyone can submit creations, and provides the infrastructure to install them everywhere. There are already 21 open-source projects building on the Petdex API and format.

### Why it matters

This project is interesting beyond the novelty factor. It's a case study in how to build a modern fullstack application with the latest tooling — and the architecture decisions are worth studying. The combination of Next.js 16's app router with Drizzle ORM for type-safe database queries, Clerk for authentication with OAuth PKCE, and Cloudflare R2 for media storage is a pattern that works for real production applications.

The AI agent angle is what makes it timely. As coding agents become more capable and more widely adopted, the ecosystem around them is growing fast. Petdex sits at the intersection of developer tooling and community-driven content — similar to how VS Code extensions became a massive ecosystem. The fact that it already supports Codex, Claude Code, OpenCode, and Gemini CLI means it's positioning itself as the universal standard for agent companions.

For fullstack developers, the codebase is worth exploring as a reference implementation. The Drizzle schema design, the CLI auth flow with Clerk OAuth and PKCE, the monorepo structure with separate packages for web, CLI, desktop, and Discord bot — these patterns transfer directly to production SaaS applications.

### Key Features

**Standardized Pet Package Format.** Every pet is just two files: a `pet.json` metadata file and a spritesheet image (WebP or PNG) rendered as an 8×9 grid of 192×208 pixel frames. Animation states map to rows: idle, wave, run, failed, review, jump, and two extras. This simplicity means anyone can create a pet without understanding the underlying platform — just draw 72 frames and write some JSON.

**One-Command CLI Installation.** The `npx petdex install <slug>` command downloads a pet directly into your coding agent's configuration directory. No manual file copying, no configuration editing. The CLI handles authentication via Clerk OAuth with PKCE, pet selection, and agent hook installation. It ships as a single npm binary built with Bun.

**Desktop Companion App.** Built with Zig on a fork of Vercel's zero-native, the desktop app floats a pet on your screen that reacts to your coding agent's activity. When your agent is idle, the pet idles. When it's running code, the pet runs. When it fails, the pet shows a failed animation. The desktop app communicates with coding agents via HTTP sidecar hooks.

**Community Gallery with Review Process.** The web gallery at petdex.dev lets anyone submit pets through a web form or CLI command. Submissions go through an admin review process before being published. The gallery includes collections, faceted browsing, and a "Built with Petdex" showcase of 21+ community projects.

**Public API and Manifest.** The `/api/manifest` endpoint returns every approved pet with its slug, spritesheet URL, animation states, and metadata. This makes it trivial to build custom clients, Discord bots, wearables, or any other integration. The API is the stable surface that the community builds on.

**Monorepo with Clean Package Boundaries.** The repository is organized as a monorepo with distinct packages: `petdex-cli` for the npm binary, `petdex-desktop` for the Zig-based desktop app, and a Discord bot. The web app uses Next.js 16's app router with internationalization support. This structure makes it easy to contribute to one part without understanding the entire codebase.

**Agent Integration Hooks.** Petdex wires into coding agents through hooks that map agent activity to pet animation states. Supported agents include Codex, Claude Code, OpenCode, and Gemini CLI. The `/petdex` command inside agents lets you check status, switch pets, and manage your companion without leaving your coding environment.

### Use Cases

- **Developer personalization** — Add a fun, animated companion to your coding environment that reacts to your agent's activity, making long coding sessions more enjoyable
- **Learning modern fullstack patterns** — Study the codebase as a reference implementation of Next.js 16, Drizzle ORM, Clerk auth, and Cloudflare R2 in a real production app
- **Community content platform** — Build similar gallery or marketplace applications using Petdex's architecture as a template for user-generated content with review workflows
- **AI agent ecosystem development** — Contribute to the growing ecosystem around coding agents by creating pets, building clients, or extending the platform
- **Monorepo architecture reference** — Use the project's structure as a template for building multi-package TypeScript monorepos with Bun, Next.js, and native desktop components

### Pros and Cons

Pros:
- The pet package format is brilliantly simple — two files, well-documented, and easy for anyone to create without platform-specific knowledge
- The tech stack is cutting-edge (Next.js 16, React 19, Drizzle, Bun) and the code quality is high, making it a valuable learning resource
- Active development with multiple commits daily and regular releases (desktop v0.2.2 shipped June 4, 2026)
- Multi-agent support (Codex, Claude Code, OpenCode, Gemini CLI) means it's not locked to a single platform

Cons:
- The desktop app only supports macOS currently, leaving Windows and Linux users without the floating companion experience
- The project is still early — the API surface and pet format may evolve, which could break custom integrations
- The niche appeal (animated coding mascots) limits the audience compared to developer tools with broader utility
- Relies on Clerk for authentication, which adds a third-party dependency that some self-hosters may want to avoid

### Getting Started

```bash
# Install a pet
npx petdex install boba

# Initialize the desktop app and agent hooks
npx petdex init

# Verify your setup
npx petdex doctor

# Run the full stack locally
git clone https://github.com/crafter-station/petdex.git
cd petdex
bun install
bun run dev:docker
```

Open localhost:3000 to see the gallery. The Docker setup includes Postgres and Redis, so you get the full stack running in about 30 seconds.

To create your own pet, use the `hatch-pet` skill inside Codex or visit petdex.dev/create for the visual creator tools. Submit your creation with `npx petdex submit ./my-pet/`.

### Alternatives

**VS Code Pets** — The original coding companion extension for VS Code. It's more mature and specifically designed for VS Code, but lacks Petdex's multi-agent support, community gallery, and standardized format. Choose VS Code Pets if you only use VS Code and want a simpler, editor-specific solution.

**Custom spritesheet implementations** — You could build your own animated companion by embedding spritesheets directly in your agent configuration. This avoids the dependency on Petdex's infrastructure but means you miss the community gallery, CLI tooling, and desktop app. Choose this approach if you want full control and don't need the ecosystem.

**Tamagotchi-style terminal tools** — Projects like `gotchi` and other terminal-based virtual pets exist, but they're standalone terminal applications without integration into coding agents. They're fun but disconnected from your actual development workflow. Choose them if you want a terminal pet that's independent of your coding tools.

### Verdict

Petdex is a surprisingly well-executed project for something in the "fun developer tools" category. The 2,900 stars in five weeks reflect genuine community enthusiasm, not just novelty. The architecture is clean, the tech stack is modern, and the multi-agent approach positions it as the standard for coding agent companions rather than a single-platform plugin. If you're a fullstack developer looking for a reference implementation of Next.js 16 with Drizzle, Clerk, and Bun in a real monorepo, the codebase alone is worth exploring. And if you want to add a pixel-art companion to your coding setup, `npx petdex install boba` is about as frictionless as it gets.
