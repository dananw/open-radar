---
name: codegraph
description: "CodeGraph is a pre-indexed code knowledge graph that makes AI coding agents 16% cheaper and 58% fewer tool calls — 100% local, 20+ languages, 14 web frameworks."
url: https://github.com/colbymchenry/codegraph
stars: 40335
forks: 2495
language: TypeScript
tags: ["developer-tools", "ai-agents", "code-intelligence", "mcp", "knowledge-graph"]
featured: false
publishedAt: 2026-06-04
---

## CodeGraph

### Overview

CodeGraph hit 40,000 GitHub stars faster than almost any developer tool in recent memory. It's a pre-indexed code knowledge graph that plugs into every major AI coding agent — Claude Code, Cursor, Codex, OpenCode, Gemini CLI, Kiro, and others — and gives them semantic understanding of your codebase instead of making them discover it through expensive grep-and-read cycles.

The project is built by Colby Chenry and first appeared in January 2026. What started as a local tool for his own Claude Code workflow turned into something the broader community clearly wanted: a way to make AI agents understand code structure without burning tokens on exploration. The numbers back it up. In benchmarks across seven real-world open-source codebases — VS Code (TypeScript, ~10K files), Django (Python, ~3K files), Tokio (Rust, ~790 files), and others — CodeGraph delivered 16% cheaper runs, 47% fewer tokens consumed, 22% faster completion times, and 58% fewer tool calls on average. Those aren't marginal gains. That's the difference between an agent that can afford to work on your codebase and one that can't.

The core mechanism is straightforward: CodeGraph builds a knowledge graph of your project — symbol relationships, call graphs, import chains, code structure — and exposes it through an MCP server. When an agent needs to understand how Django's ORM builds a QuerySet, it makes one `codegraph_explore` call and gets the answer. Without CodeGraph, that same agent spawns Explore sub-agents that scan files with grep, glob, and Read, consuming tokens on every tool call before they even find the right code.

### Why it matters

We're in the middle of a fundamental shift in how developers work. AI coding agents are no longer novelties — they're production tools that thousands of developers use daily. But there's a dirty secret: most of the token budget these agents spend goes to exploration, not to actual code generation or problem-solving. An agent working on a 10,000-file codebase might burn through 1.8 million tokens just figuring out where things are before it can answer a single architecture question.

CodeGraph attacks this problem at the infrastructure level. It doesn't try to be a better agent or a smarter model. It gives existing agents a better map. The results are consistent across languages (TypeScript, Python, Go, Rust, Java, Swift), across codebase sizes (110 files to 10,000+), and across agent implementations. On VS Code's codebase specifically, CodeGraph reduced tool calls from 21 to 4 — an 81% drop — while cutting token usage by 64%.

The timing matters too. As AI coding agents move from experimentation to daily driver, the economics of token consumption become a real constraint. Developers are paying $20-200/month for these tools, and every wasted token on a grep search is money spent on discovery rather than on solving the actual problem. CodeGraph makes those subscriptions work harder.

### Key Features

**Pre-indexed Knowledge Graph.** CodeGraph parses your entire codebase with tree-sitter and builds a graph of symbols, types, call edges, imports, and structural relationships. One `codegraph_explore` query returns entry points, related symbols, and code snippets — no expensive exploration agents needed. The index lives in a local SQLite database under `.codegraph/` in your project root.

**Framework-aware Route Detection.** This is the feature that makes CodeGraph genuinely useful for web developers. It recognizes routing patterns across 14 frameworks: Django's `path()` and `re_path()`, NestJS's `@Controller` decorators with `@Get`/`@Post`, Express's `app.get()`, FastAPI's `@router.post()`, Flask blueprints, Rails routes, Spring annotations, Gin/chi/mux handlers, React Router components, and more. It links URL patterns to their handler functions, so querying callers of a controller method surfaces the route that binds it.

**20+ Language Support.** TypeScript, JavaScript, Python, Go, Rust, Java, C#, PHP, Ruby, C, C++, Objective-C, Swift, Kotlin, Dart, Lua, Svelte, Liquid, Pascal/Delphi, and more. The tree-sitter-based parsing means language support is defined by grammar files, not custom code per language. Mixed-language projects (like React Native apps bridging Swift, ObjC, and JavaScript) get cross-language flow analysis.

**Always-Fresh Auto-sync.** File watcher uses native OS events (FSEvents on macOS, inotify on Linux, ReadDirectoryChangesW on Windows) with debounced auto-sync. The graph updates as you code — no manual `codegraph sync` required. During the brief debounce window, tool responses that reference pending files get a staleness banner telling the agent to read the file directly. Connect-time catch-up reconciles edits made while the MCP server was offline.

**100% Local, Zero Data Leakage.** No data leaves your machine. No API keys. No external services. The entire knowledge graph is a SQLite database on your filesystem. This matters for enterprise teams with strict data policies and for developers who don't want their codebase indexed by a third-party service.

**Impact Analysis and Call Graph Tracing.** Trace callers, callees, and the full impact radius of any symbol before making changes. This is the kind of tooling that senior developers use instinctively — "if I change this function, what breaks?" — and CodeGraph gives it to AI agents as a first-class capability. The `trace`, `callers`, `callees`, and `impact` tools work across language boundaries in mixed projects.

**One-command Agent Integration.** `codegraph install` auto-detects which agents you have installed (Claude Code, Cursor, Codex, OpenCode, Hermes Agent, Gemini CLI, Antigravity, Kiro) and writes the MCP server configuration for each. No manual config editing. The uninstall command reverses everything cleanly.

### Use Cases

- **Fullstack web developers working on large monorepos** — If your project mixes a React frontend with a NestJS or Django backend, CodeGraph understands the routing, the service layers, and the call chains across both. One query tells the agent how a request flows from your API route through middleware to the database query.

- **Teams adopting AI coding agents at scale** — When five developers are each running Claude Code on the same codebase, the aggregate token savings from CodeGraph translate directly to lower API costs and faster iteration cycles. The benchmarks show 16% cost reduction on average, with some repos hitting 40%.

- **React Native and mobile developers** — CodeGraph's cross-language bridging is unique. It traces flows from JavaScript through the React Native bridge to native Swift/Kotlin implementations, including TurboModules, Fabric view components, and Expo Modules. No other code intelligence tool does this.

- **Code review and refactoring workflows** — Before merging a PR that touches a shared utility, run an impact analysis to see every caller and dependency. The agent can trace the blast radius in seconds instead of manually grepping through the codebase.

- **Onboarding onto unfamiliar codebases** — New team members (human or AI) can ask architecture-level questions and get precise answers with source references. "How does authentication work in this project?" returns the actual flow, not a list of files to read.

### Pros and Cons

Pros:
- Benchmark-validated improvements across 7 real-world codebases and 7 languages, with the methodology publicly documented and re-validated on Opus 4.8 in June 2026. This isn't marketing — you can reproduce the numbers.
- Framework-aware route detection for 14 web frameworks (Django, NestJS, Express, FastAPI, Flask, Rails, Spring, Gin, React Router, SvelteKit, and more) makes it immediately useful for fullstack web developers.
- 100% local architecture with no external dependencies means zero data leakage and no API keys. The SQLite database stays on your machine.
- Auto-sync with native file watchers means the graph stays current without manual intervention. The staleness banner system handles the edge cases gracefully.

Cons:
- Initial indexing can be slow on very large codebases (VS Code's ~10K files take several minutes). Incremental syncs are fast, but the first `codegraph init -i` on a massive monorepo requires patience.
- The 197 open issues as of June 2026 suggest active development but also rough edges. Some users report occasional false positives in cross-language bridging, particularly in complex React Native setups with custom native modules.
- It only helps when agents use it correctly. If a sub-agent ignores the MCP tools and falls back to file reads anyway, CodeGraph becomes overhead rather than a shortcut. The docs are clear about this, but it requires agents to follow the instructions.

### Getting Started

```bash
# Install globally (no Node.js required — self-contained binary)
curl -fsSL https://raw.githubusercontent.com/colbymchenry/codegraph/main/install.sh | sh

# Or with npm
npm i -g @colbymchenry/codegraph

# Connect to your agents
codegraph install

# Initialize your project and build the index
cd your-project
codegraph init -i
```

The `codegraph install` command auto-detects Claude Code, Cursor, Codex, OpenCode, Hermes Agent, Gemini CLI, Antigravity, and Kiro — then writes the MCP server config for each. After that, agents in this project get semantic code intelligence automatically.

Verify the index is working:

```bash
codegraph status
```

To uninstall from all agents:

```bash
codegraph uninstall
```

### Alternatives

**Aider's repository map** — Aider builds a simpler tag-based map of your codebase using ctags, focused specifically on its own chat-based workflow. It's lighter weight but much less capable — no call graph analysis, no framework-aware routing, no cross-language bridging. Choose Aider's map if you only use Aider and want minimal setup overhead.

**Cline + tree-sitter MCP** — Cline can use custom MCP servers for code intelligence, and some community-built tree-sitter servers exist. But these are typically per-language, lack framework-aware routing, and don't auto-sync. CodeGraph is a more complete solution that works across all agents out of the box.

**Sourcegraph Cody** — Sourcegraph's AI coding assistant includes code graph intelligence, but it's a cloud-connected product that indexes your code on Sourcegraph's infrastructure. For teams with strict data policies, CodeGraph's fully local approach is the better fit. Sourcegraph is stronger for code search across multiple repositories; CodeGraph is stronger for agent-assisted development on a single project.

### Verdict

CodeGraph is the most practical improvement to AI coding agent workflows I've seen this year. The 40K stars didn't appear by accident — developers are starved for tools that make their agents actually understand code rather than blindly searching through it. The benchmarks are unusually rigorous for a developer tool (7 codebases, 7 languages, 4 runs per arm, median reported, re-validated on the latest model), and the results are consistent: 16% cheaper, 58% fewer tool calls, 22% faster. For fullstack web developers working with React, NestJS, Django, or Go backends, the framework-aware route detection alone justifies the five-minute setup. If you're using any AI coding agent daily and your project has more than a few hundred files, install CodeGraph today — the token savings will pay for itself within the first session.
