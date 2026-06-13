---
name: fff
description: "FFF is a blazing-fast Rust file search toolkit with MCP server for AI agents, Neovim plugin, and Node.js SDK — frecency-ranked, typo-resistant, git-aware."
url: https://github.com/dmtrKovalenko/fff
stars: 8412
forks: 324
language: Rust
tags: ["file-search", "rust", "mcp", "ai-agents", "neovim", "developer-tools"]
featured: false
publishedAt: 2026-06-14
---

## FFF

### Overview

FFF is a file search library written in Rust that keeps an in-memory index of your entire repository and serves sub-10ms queries through an MCP server, a Neovim plugin, a Node.js SDK, and a C FFI. It crossed 8,000 GitHub stars in under a year, which is notable for what is essentially a replacement for `grep` and `find` — tools most developers thought were already good enough.

The project is by Dmitriy Kovalenko, a developer known in the Neovim ecosystem for building high-performance tooling. FFF started as a Neovim plugin (`fff.nvim`) that people kept praising for its speed, but it turned out the core search engine was useful far beyond the editor. It now powers file search in OpenCode and Nushell, and the MCP server integration means any AI coding agent — Claude Code, Codex, Cursor, Cline — can use it as a drop-in file search backend.

The pitch is simple: ripgrep and fzf are command-line programs. Every invocation forks a new process, re-reads `.gitignore`, re-stats directories, and rebuilds state from scratch. That's fine when you grep once from a terminal. It's terrible when an AI agent runs hundreds of searches per session. On a 500k-file Chromium checkout, that's the difference between 3–9 seconds per ripgrep spawn and sub-10ms per FFF query. FFF keeps the index resident in one long-lived process and exposes it through typed APIs, so every search after the first hits warm memory.

### Why it matters

We're in the middle of a fundamental shift in how code gets written. AI coding agents are no longer novelties — they're running inside every major editor and IDE. But these agents are only as good as their ability to find and understand your codebase. When Claude Code or Cursor needs to locate a function definition, grep a pattern across 500 files, or figure out which files you've been working on, the search tool's performance directly impacts the agent's response time and token efficiency.

The standard approach — shelling out to `rg` or `grep` for every search — burns process-spawn overhead on every call and returns raw text that the agent has to re-parse. FFF returns structured objects with relative paths, line numbers, git status, frecency scores, and definition classification. That means fewer wasted tokens, faster round-trips, and agents that can actually reason about your codebase instead of drowning in raw grep output.

This connects to a broader trend: the tools that made sense for human-in-the-loop workflows are hitting their limits in agent-in-the-loop workflows. FFF is one of the first search tools built from the ground up for the programmatic, high-frequency search patterns that AI agents demand. The MCP server integration makes it a one-command install for any agent that supports the Model Context Protocol, which by mid-2026 includes most of the serious players.

### Key Features

**Frecency-Ranked Results.** Every indexed file carries an access score and a modification score. Files you open frequently and recently surface higher in search results. This is the same idea as VS Code's recently-opened list, but applied to every search query, not just a sidebar. The frecency database persists across sessions, so the tool gets smarter the more you use it.

**Typo-Resistant Fuzzy Matching.** FFF uses Smith-Waterman fuzzy scoring on both file paths and content. A query like `shcema` still finds `schema`. A search for `IsOffTheRecord` finds `is_off_the_record`. Zero-match queries automatically retry as fuzzy and surface the best approximate hits. This is more tolerant than fzf's matching algorithm and works across the entire path, not just filenames.

**MCP Server for AI Agents.** The `fff-mcp` binary runs as an MCP server and exposes `ffgrep`, `fffind`, and `fff-multi-grep` tools to any MCP-capable client. Install with one line via Homebrew or a shell script, and your AI agent gets a file search backend that's dramatically faster and more token-efficient than its built-in grep. The server maintains its own persistent index, so every search after the first is sub-10ms.

**Git-Aware Annotations.** Modified, untracked, staged, and ignored files are tagged in every search result. The watcher talks to libgit2 directly instead of spawning the `git` CLI, so status information is always current without process-spawn overhead. Agents can sort or filter by git status without shelling out.

**Multi-Language SDK Surface.** FFF exposes the same Rust core through five interfaces: a native Rust crate (`fff-search`), a C library (`libfff_c` with a stable ABI), a Node.js/Bun SDK (`@ff-labs/fff-node`), a Neovim plugin (`fff.nvim`), and the MCP server. You can embed it in a Go application via cgo, a Python tool via ctypes, or a VS Code extension via the Node SDK — all using the same fast core.

**Background File Watcher.** The index updates incrementally as files change. You never pay for a full rescan on the hot path. The watcher uses platform-specific filesystem APIs (`getdents64` on Linux, NTFS API on Windows) for efficient change detection. Combined with memory-mapped content caching and SIMD-accelerated search, the per-query cost stays consistently low even in large monorepos.

**Definition-First Classification.** A byte-level scanner on the Rust side tags lines that start with `struct`, `fn`, `class`, `def`, `impl`, and similar keywords. When an agent searches for a symbol, definition lines are boosted in the results. This reduces the number of results an agent has to process and helps it find the right code faster.

### Use Cases

- **AI coding agents in large monorepos** — When Claude Code or Cursor needs to search a 500k-file repository hundreds of times per session, FFF's persistent index turns multi-second ripgrep invocations into sub-10ms queries. The MCP server integration makes this a one-command setup.

- **Neovim developers who want the fastest file picker** — The `fff.nvim` plugin is a drop-in replacement for Telescope's file finder and fzf-lua, with frecency ranking, git status highlighting, and a live grep that supports plain, regex, and fuzzy modes. Demos on the Linux kernel repo (100k files, 8GB) show it keeping up with keystroke-level responsiveness.

- **Building custom search tools and IDE extensions** — The Node.js SDK lets you embed fast file search into any TypeScript application. The `FileFinder.create()` API returns typed objects with file metadata, git status, and frecency scores — no text parsing required. Cursor pagination works across calls.

- **Pre-commit hooks and CI checks that need fast file enumeration** — The Rust crate and C library can be linked directly into build tools. Glob matching via FFF is 10–100x faster than Node.js or Bun's built-in glob implementations, according to the project's benchmarks.

- **Agent skill development** — If you're building Claude Code skills or Codex extensions that need to navigate codebases, the MCP server gives your agent a search tool that wastes fewer tokens on irrelevant results and responds faster than built-in alternatives.

### Pros and Cons

Pros:
- Genuine order-of-magnitude speedup over ripgrep for repeated-search workloads. On the Chromium repo (500k files), FFF serves queries in under 10ms where ripgrep takes 3–9 seconds per invocation. The benchmark data is public and reproducible.
- The MCP server integration is a game-changer for AI agent workflows. One Homebrew install and your agent has a search backend that's faster and more structured than anything built into Claude Code or Cursor.
- Multi-language surface (Rust, C, Node, Neovim, MCP) means you can adopt it incrementally. Start with the MCP server, then embed the Node SDK in your tooling, then link the C library in your build system — same core everywhere.
- Active development with consistent releases. Used by real projects (OpenCode, Nushell) with a responsive maintainer.

Cons:
- Memory footprint is the explicit tradeoff. FFF keeps the index and content cache in RAM. On a 14k-file repo that's about 26 MB; on a 500k-file monorepo, expect a few hundred MB. For most developer machines this is fine, but it's worth knowing.
- For one-shot grep from a terminal, ripgrep is still the right tool. FFF's advantage only kicks in on the second query and beyond. If your workflow is "grep once and leave," you won't see the benefit.
- The project is under a year old and the API surface is still evolving. The Node SDK's type reference is solid, but some edge cases in the C FFI and MCP server may still shift.

### Getting Started

Install the MCP server for your AI agent:

```bash
# macOS / Linux — Homebrew
brew install dmtrKovalenko/fff/fff-mcp

# Or one-line script
curl -L https://dmtrkovalenko.dev/install-fff-mcp.sh | bash

# Windows (PowerShell)
irm https://raw.githubusercontent.com/dmtrKovalenko/fff.nvim/main/install-mcp.ps1 | iex
```

Add the recommended prompt to your project's `CLAUDE.md` or equivalent:

```markdown
For any file search or grep in the current git-indexed directory, use fff tools.
```

For Neovim (lazy.nvim):

```lua
{
  'dmtrKovalenko/fff.nvim',
  build = function()
    require("fff.download").download_or_build_binary()
  end,
  lazy = false,
  keys = {
    { "ff", function() require('fff').find_files() end, desc = 'FFFind files' },
    { "fg", function() require('fff').live_grep() end, desc = 'LiFFFe grep' },
  },
}
```

For Node.js / Bun:

```bash
npm install @ff-labs/fff-node
```

```ts
import { FileFinder } from "@ff-labs/fff-node";

const finder = FileFinder.create({ basePath: process.cwd(), aiMode: true });
if (!finder.ok) throw new Error(finder.error);
await finder.value.waitForScan(10_000);

const files = finder.value.fileSearch("auth middleware", { pageSize: 20 });
const hits = finder.value.grep("validateToken", {
  mode: "plain",
  smartCase: true,
  beforeContext: 1,
  afterContext: 1,
  classifyDefinitions: true,
});

finder.value.destroy();
```

For Rust:

```toml
[dependencies]
fff-search = "0.6"
```

### Alternatives

**ripgrep** — The gold standard for one-shot CLI grep. Written in Rust, uses the same regex engine as FFF. Ripgrep is the better tool when you run a single search from a terminal and exit. FFF is the better tool when you need hundreds of searches in a long-running process. If you're building an agent or editor extension, FFF's persistent index and typed API make it the clear winner.

**fzf** — A general-purpose fuzzy finder for the terminal. fzf is a pure match-and-filter tool with no concept of frecency, git awareness, or programmatic API. FFF's path search is fuzzy like fzf's, but adds frecency ranking, typo resistance across the full path, and a library interface. If you need a terminal fuzzy picker for piped commands, fzf is still great. If you need a search engine embedded in your tool, FFF is the better foundation.

**Telescope (nvim-telescope/telescope.nvim)** — The most popular Neovim fuzzy finder framework. Telescope delegates actual searching to external tools (ripgrep, fd). FFF's Neovim plugin replaces Telescope's file finder and live grep with its own Rust-backed implementation, gaining frecency, git awareness, and faster response on large repos. If you're already invested in Telescope's ecosystem of extensions, switching has a cost. If file search speed is your bottleneck, FFF's picker is worth the migration.

### Verdict

FFF is the kind of tool that makes you reconsider a problem you thought was solved. File search seemed like a settled space — ripgrep and fzf were good enough. But the shift to AI-agent-driven development changes the calculus entirely. When your agent runs 200 searches per session instead of you running 5, the per-query overhead of forking a new process each time becomes a real bottleneck. FFF's persistent-index architecture is the obvious answer to that problem, and the MCP server integration makes it trivially adoptable. The 8,400 stars in under a year reflect genuine developer enthusiasm, not hype — people are using this in production workflows with OpenCode, Nushell, and Claude Code. If you work on a codebase large enough that file search latency matters, or if you're building tools that interact with AI agents, FFF is worth installing today.
