---
name: opensrc
description: "Give AI coding agents access to actual npm, PyPI, and crates.io source code with a single CLI command. Fetch, cache, and search any package source."
url: https://github.com/vercel-labs/opensrc
stars: 2574
forks: 169
language: Rust
tags: ["developer-tools", "ai-coding", "cli", "npm", "source-code"]
featured: false
publishedAt: 2026-06-16
---

## opensrc

### Overview

opensrc is a CLI tool from Vercel Labs that fetches and caches source code from npm, PyPI, crates.io, GitHub, GitLab, and Bitbucket — then hands the local path to your AI coding agent. It has 2,574 GitHub stars and 169 forks as of mid-June 2026, with steady growth since its January launch. The core binary is written in Rust with a TypeScript wrapper for npm distribution.

The project sits inside Vercel's experimental Labs division, which has been pumping out tools at a rapid clip this year — deepsec, mdxg, zerolang, and zero-native all came from the same team. opensrc is the most practically useful of the bunch. It solves a concrete problem: when Claude Code, Cursor, or Copilot asks to read a dependency's source, it usually can't. It gets type stubs at best, or a wall of "module not found" errors at worst. opensrc bridges that gap by resolving packages through their registry APIs, shallow-cloning at the correct version tag, and caching everything at `~/.opensrc/`.

The CLI weighs in as a single native Rust binary when installed globally via npm. No Node.js runtime overhead on execution. It resolves lockfile versions automatically for npm projects, so you get the exact version your project uses — not latest, not some arbitrary tag. For Python and Rust packages, it pulls from PyPI and crates.io respectively. GitHub, GitLab, and Bitbucket repos work too, with Bitbucket Cloud support added in mid-April.

### Why it matters

AI coding agents are only as good as their context. The standard setup today gives your agent access to your project files and maybe some documentation. But when it hits a dependency it doesn't understand — a Zod validation error it can't trace, a React internals function it's guessing at, a Next.js router behavior it's hallucinating — it's stuck. It generates code based on assumptions rather than actual source.

This is a context engineering problem, and it's becoming the bottleneck in AI-assisted development. Tools like CodeSight and CodeGraph try to solve it by building knowledge graphs of your own codebase. opensrc takes a different angle: make external dependency source code trivially accessible. The philosophy is simple — if your agent can `cat` the actual Zod source file, it will write better Zod code. No embeddings, no RAG pipeline, no vector database. Just source code on disk.

The multi-registry support is what makes this practical. A typical fullstack project pulls from npm (React, Next.js, NestJS), PyPI (Django, FastAPI), and crates.io (if you're using any Rust tooling). opensrc handles all three natively. You can run `rg "parse" $(opensrc path zod react pypi:flask crates:serde)` and search across all of them in one shot.

### Key Features

**Registry-Agnostic Package Resolution.** opensrc doesn't care where your dependency lives. npm is the default, but prefixes like `pypi:`, `crates:`, `gitlab:`, and `bitbucket:` route to the right registry. The resolver hits the registry API, finds the git repository URL, and clones at the matching version tag. This means one tool for your entire dependency graph, regardless of language.

**Lockfile-Aware Version Detection.** When you run `opensrc path zod` inside an npm project, it reads your `package-lock.json` or `pnpm-lock.yaml` to find the exact installed version. You get the source code for the version you're actually using, not whatever is latest on npm. This matters when debugging version-specific behavior — your agent reads the same code that's running in production.

**Composable Unix Interface.** The tool follows the Unix philosophy. `opensrc path` prints an absolute path to stdout. That's it. You compose it with `rg`, `cat`, `find`, `grep`, or any tool you already use. No custom search syntax, no proprietary query language. If you can search files, you can search package source. This composability is why it works so well with AI agents — they already know how to use `cat` and `rg`.

**Global Caching with Version Tracking.** First run fetches and clones. Every subsequent call returns the cached path instantly — sub-millisecond. The cache lives at `~/.opensrc/` and tracks metadata in `sources.json`. You can list cached packages with `opensrc list`, clean specific registries with `clean --npm` or `clean --pypi`, or nuke everything with `opensrc clean`. The `OPENSRC_HOME` environment variable overrides the cache location for CI or team-shared setups.

**Multi-Package Batch Operations.** You can pass multiple packages in a single call: `opensrc path zod react next` prints three paths, one per line. The `opensrc fetch` command pre-warms the cache without printing paths, which is useful for CI pipelines or Docker builds where you want dependencies available before your agent starts working.

**Native Rust Performance.** The core resolver and cloner are written in Rust — 54.8% of the codebase. The npm wrapper is a thin TypeScript shell that invokes the native binary. Typical invocation adds under 10ms of overhead. For a tool that sits between your agent and every file read, that latency budget matters. Nobody wants their AI coding session bottlenecked by a slow dependency fetcher.

### Use Cases

- **AI coding agent context enrichment** — When Claude Code or Cursor hits a dependency it doesn't understand, pipe the actual source into context instead of guessing. Run `cat $(opensrc path zod)/src/types.ts` to show your agent the real type definitions.
- **Dependency debugging** — Trace a bug through the actual source of your dependencies. No more reading outdated docs or Stack Overflow answers from three years ago. Read the code your project is actually running.
- **Codebase search across dependencies** — Find every usage of a pattern across your entire dependency tree with a single `rg` command. Useful when migrating APIs or understanding how a library handles a specific edge case.
- **Onboarding and code review** — New team members can quickly explore how dependencies work by reading source instead of guessing from type stubs. Combine with `opensrc fetch` in a project setup script so everything is cached before day one.
- **Multi-language project support** — Fullstack projects mixing JavaScript, Python, and Rust dependencies get unified source access through one CLI. No separate tools per ecosystem.

### Pros and Cons

Pros:
- Solves a real, immediate problem for anyone using AI coding agents. The "agent can't see dependency source" issue hits daily, and opensrc fixes it with zero configuration.
- Unix-philosophy design means it composes with everything. No lock-in, no proprietary format, just file paths you can use with any tool.
- Multi-registry support covering npm, PyPI, crates.io, GitHub, GitLab, and Bitbucket means one tool for polyglot projects instead of three separate solutions.
- Active development from Vercel Labs with meaningful releases — the v0.7.2 release in April added the `fetch` subcommand, Bitbucket support, and lockfile parser improvements.

Cons:
- No MCP server integration out of the box. You need to wire it into your agent's tool configuration yourself — there's no drop-in plugin for Claude Code or Cursor yet.
- Cache can grow large if you're fetching many packages across multiple versions. There's no automatic pruning or size limit; you need to manage it manually with `opensrc clean`.
- Shallow cloning from registries depends on the package having a proper git repository linked. Some npm packages publish from monorepos or use build-only publishing, which can cause resolution failures.

### Getting Started

```bash
# Install globally via npm (gives you the native Rust binary)
npm install -g opensrc

# Search a package's source
rg "parse" $(opensrc path zod)

# Read a specific file from a dependency
cat $(opensrc path zod)/src/types.ts

# Work with Python packages
find $(opensrc path pypi:requests) -name "*.py"

# Work with Rust crates
ls $(opensrc path crates:serde)/src/

# Multi-package search
rg "Router" $(opensrc path react next zod)

# Specific version
rg "ZodError" $(opensrc path zod@3.22.0)

# Pre-warm cache for CI
opensrc fetch zod react next pypi:flask

# List cached packages
opensrc list

# Clean up
opensrc clean --npm
```

### Alternatives

**Context7** — A hosted service that indexes npm package documentation and source for AI consumption. It uses an API and MCP server rather than local caching. Choose Context7 if you want a zero-setup hosted experience and don't mind depending on an external service for your agent's context. opensrc is better when you want everything local, fast, and offline-capable.

**vercel-labs/deepsec** — Another Vercel Labs project focused on deep source code analysis for security auditing. It's more specialized — aimed at finding vulnerabilities in dependencies rather than general-purpose source access. If your primary concern is security review of your dependency tree, deepsec is the better tool. For day-to-day coding agent context, opensrc is more practical.

**npm pack + manual extraction** — You can always download package tarballs with `npm pack` and extract them manually. This works but requires scripting, doesn't handle version resolution from lockfiles, and breaks for non-npm registries. opensrc wraps all that complexity into a single command and adds caching on top.

### Verdict

opensrc is the kind of tool that makes you wonder why it didn't exist before. The problem it solves — AI agents not being able to see dependency source code — is so fundamental to the current wave of AI-assisted development that it feels inevitable in hindsight. The Vercel Labs team built it with the right abstractions: a Rust binary for speed, Unix composability for flexibility, and multi-registry support for real-world polyglot projects. At 2,574 stars with active development and a clear v0.7+ release cadence, it has enough momentum to become a standard part of the AI coding toolkit. If you're running Claude Code, Cursor, Copilot, or any agent that reads files, install this today. Your agent's output quality will improve noticeably once it can actually read the code it's depending on.
