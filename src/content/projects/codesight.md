---
name: codesight
description: "CodeSight is a universal AI context generator that cuts token usage by 91x across Claude Code, Cursor, Copilot, and Codex. Supports 14 languages, 30+ frameworks, zero dependencies."
url: https://github.com/Houseofmvps/codesight
stars: 1107
forks: 101
language: TypeScript
tags: ["ai-context", "developer-tools", "token-optimization", "mcp", "static-analysis"]
featured: false
publishedAt: 2026-06-09
---

## CodeSight

### Overview

CodeSight is a universal AI context generator that compiles your entire codebase into a structured markdown file your AI assistant can read in one shot. It hit 1,100 GitHub stars in two months since its April 2026 launch, with 4,200+ monthly npm downloads and zero dependencies. The core value proposition is brutally simple: instead of your AI agent spending 26K–47K tokens exploring your project file by file, CodeSight pre-compiles everything into a 3K–5K token map. That's a 7–12x reduction on the base scan alone.

The tool is built by Kailesk Khumar, founder of HouseofMVPs and Kailxlabs. He also created ultraship (39 expert skills for Claude Code) and claude-rank (an SEO plugin for Claude Code). That background matters — this is someone who's been deep in the AI-assisted development workflow and understands the token economics that make or break these tools.

The problem CodeSight solves is painfully familiar to anyone using AI coding assistants: every new session starts with your agent reading 40–138 files to understand your project. Routes, models, middleware, components, env vars — all discovered through trial and error, burning tokens and time. CodeSight runs 8 parallel detectors (routes, schema, components, dependency graph, middleware, config, libraries, contracts) using AST parsing for TypeScript and regex fallback for 13 other languages. The output is a single markdown file that gives your AI full project context from the first message.

### Why it matters

The AI coding assistant market is exploding, but the token economics are brutal. Claude Code, Cursor, Copilot, and Codex all charge or rate-limit based on token usage. Every token your AI spends rediscovering your project structure is a token it can't spend solving your actual problem. CodeSight addresses this at the infrastructure level — it's not another prompt engineering trick, it's a pre-compilation step that fundamentally changes how much context your AI needs.

The broader trend here is context engineering. As AI agents get more capable, the bottleneck shifts from "can the model do this?" to "does the model have the right information?" CodeSight is one of the first tools to treat this as a systems problem rather than a prompting problem. The wiki feature (v1.6.2) takes this further: instead of loading the full 5K token map every session, your AI reads a 200-token index and pulls one targeted article per question. That's 84x reduction vs. manual exploration.

What makes this relevant for fullstack developers specifically: CodeSight has full AST precision for TypeScript projects (Next.js, NestJS, Hono, Remix, SvelteKit, Nuxt) and battle-tested regex detection for Django, Flask, FastAPI, Go (Gin, Echo, Fiber), Rails, Laravel, Spring Boot, and more. If your stack spans multiple languages — which most real projects do — CodeSight handles all of them in one pass.

### Key Features

**AST-Powered Detection for TypeScript.** When TypeScript is installed in your project, CodeSight uses the actual TypeScript compiler API to parse your code. This means it follows `router.use('/prefix', subRouter)` chains, combines `@Controller('users')` + `@Get(':id')` into `/users/:id`, parses tRPC nesting, and extracts exact Drizzle field types from `.primaryKey().notNull()` chains. No regex guessing — structural analysis that understands your code the way the compiler does.

**Wiki Knowledge Base.** The `--wiki` flag generates `.codesight/wiki/` — a persistent knowledge base that survives across every session. Instead of loading the full context map every conversation, your AI reads a 200-token index and pulls one targeted article (auth.md, database.md, payments.md, etc.) per question. The wiki is committed to git, so every new session starts with full codebase knowledge from the first message.

**Knowledge Mode for Non-Code Context.** `--mode knowledge` maps your markdown notes, ADRs, meeting notes, and retrospectives the same way CodeSight maps code. It detects decision records, meeting notes, retrospectives, specs, and research files automatically. Supports Obsidian vaults, Notion exports, and any folder of markdown files. This is the feature that makes CodeSight useful beyond just code — your architectural decisions and team context become part of the AI's knowledge.

**13 MCP Tools.** Running `npx codesight --mcp` starts an MCP server with 13 tools that Claude Code, Cursor, and other MCP-compatible editors can use directly. Tools include getting the wiki index, reading specific articles, linting wiki health, blast radius analysis, and more. This integrates CodeSight into your editor's native workflow rather than requiring a separate CLI step.

**Blast Radius Analysis.** `npx codesight --blast src/lib/db.ts` shows you exactly which files, routes, models, and components would be affected by changing a specific file. It uses BFS traversal through the import graph up to 3 hops deep. This is genuinely useful for code review and refactoring — you know the blast radius before you touch the code.

**Zero Dependencies, One Command.** `npx codesight` — that's it. No config files, no API keys, no setup. Run it in any project root and get a full context map in under a second for small projects, under a second for medium ones. The zero-dependency design means there's nothing to break, nothing to update, nothing to audit.

**Multi-Language Support Across 14 Languages.** TypeScript gets full AST precision. Everything else — JavaScript, Python, Go, Ruby, Elixir, Java, Kotlin, Rust, PHP, Dart, Swift, C#, and BrightScript — uses battle-tested regex detection across 30+ framework detectors and 13 ORM parsers. The benchmarks show 7.5x savings on Django, 17.2x on Go/Gin, 17.8x on Rails, and 20x on Rust/Actix.

### Use Cases

- **Fullstack projects with mixed stacks** — If your backend is NestJS and your frontend is React, or you're running Django with a Go microservice, CodeSight detects all of them in one pass. No per-framework configuration needed.
- **AI-assisted code reviews** — Run CodeSight before feeding a PR to Claude Code. The context map lets the AI understand the full architecture instead of just the diff, leading to better review feedback.
- **Onboarding new developers** — The generated wiki and context maps serve as living documentation. New team members (human or AI) can understand the project structure without reading every file.
- **Token cost optimization for AI coding tools** — Teams running Claude Code or Cursor at scale can save 7–91x on context tokens per session. At $0.015/1K input tokens for Claude, that's real money over hundreds of sessions.
- **Legacy codebase exploration** — Run CodeSight on a codebase you haven't touched in months. The blast radius and dependency graph features help you understand what changed and what depends on what.

### Pros and Cons

Pros:
- 91x average token reduction across benchmark projects, with real numbers from real codebases — not marketing fluff.
- Zero dependencies means zero supply chain risk. In an era where npm packages get compromised monthly, this matters.
- The wiki knowledge base is a genuinely novel approach to persistent AI context. It's committed to git, survives across sessions, and auto-regenerates with `--watch`.
- Full AST precision for TypeScript (the dominant language in web development) with solid regex fallback for 13 other languages.

Cons:
- The regex fallback for non-TypeScript languages is less accurate. Django route detection hit 88% recall on one benchmark — good, but not perfect. Complex dynamic routing patterns will be missed.
- The knowledge mode (`--mode knowledge`) requires well-structured markdown files. If your team doesn't write ADRs or meeting notes, this feature adds nothing.
- No runtime intelligence — CodeSight is a static analysis tool. It can't tell you which routes are actually hit in production or which models are hot. For that, you'd need something like Fallow's paid runtime layer.
- The tool is two months old. The API surface is still settling, and the 101 open issues suggest there's active churn on detection accuracy.

### Getting Started

```bash
# Run in any project root — zero config, zero setup
npx codesight

# Generate wiki knowledge base
npx codesight --wiki

# Generate optimized config for specific AI tools
npx codesight --init
npx codesight --profile claude-code

# Start as MCP server for Claude Code / Cursor
npx codesight --mcp

# Check blast radius for a specific file
npx codesight --blast src/lib/db.ts

# Map non-code knowledge (ADRs, meeting notes, retros)
npx codesight --mode knowledge

# Open interactive HTML report
npx codesight --open

# Show token savings breakdown
npx codesight --benchmark
```

The output lands in `.codesight/` — commit it to git so every session (and every team member) benefits from pre-compiled context.

### Alternatives

**Fallow** — A Rust-native codebase intelligence tool that offers both static analysis (free) and runtime intelligence (paid). Fallow's static layer covers unused code, duplication, circular deps, and complexity hotspots — broader than CodeSight's focus on AI context. Choose Fallow if you want general codebase health metrics rather than AI-specific token optimization. The runtime layer (hot-path review, cold-path deletion evidence) is unique to Fallow but requires production traffic data.

**Repowise** — Another Python-based codebase intelligence tool focused on engineering teams. Repowise provides code health scores, auto-generated docs, git analytics, and dead code detection via MCP. It's more team-oriented (git analytics, technical debt tracking) while CodeSight is more AI-agent-oriented (token reduction, wiki knowledge bases). Choose Repowise if your primary concern is team code health rather than AI token efficiency.

**Aider's Repository Map** — Aider (the AI coding assistant) has a built-in repository map feature that serves a similar purpose — giving the AI context about your codebase. The difference is that Aider's map is generated fresh each session and optimized for Aider's own workflow. CodeSight is tool-agnostic: the same context map works with Claude Code, Cursor, Copilot, Codex, and any tool that reads markdown. Choose Aider's built-in map if you only use Aider; choose CodeSight if you switch between tools.

### Verdict

CodeSight is the most practical token optimization tool I've seen for AI-assisted development. The 91x average reduction is backed by real benchmarks on real projects, not synthetic tests. The wiki knowledge base feature is genuinely innovative — committing AI-readable documentation to git that persists across sessions is an idea that should be standard practice. The zero-dependency design is a relief in an ecosystem where every npm package is a potential supply chain attack vector. It's two months old with rough edges (the regex fallback for non-TypeScript languages could be tighter, and 101 open issues suggest the API is still settling), but the core value proposition is solid. If you're running Claude Code, Cursor, or any AI coding assistant on a real codebase, run `npx codesight` once and look at the token savings. The numbers speak for themselves.
