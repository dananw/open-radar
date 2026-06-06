---
name: zerolang
description: "Zero is an experimental graph-first programming language from Vercel Labs where AI agents work with semantic program structure instead of raw source text."
url: https://github.com/vercel-labs/zerolang
stars: 4902
forks: 316
language: C
tags: ["programming-language", "ai-agents", "developer-tools", "graph-first", "vercel"]
featured: false
publishedAt: 2026-06-07
---

## Zero (zerolang)

### Overview

Zero is an experimental graph-first programming language built by Vercel Labs. It hit nearly 5,000 GitHub stars within three weeks of its May 15, 2026 launch, which signals something real about developer interest in agent-native tooling. The core idea: source code is a lossy interface for AI agents, so stop making them work with raw text. Give them a compiler-derived semantic graph instead.

The project is created by Chris Tate, a developer at Vercel and creator of SpecUI. He's the sole contributor with 891 commits in the first three weeks, which tells you this is a focused, deliberate effort — not a hackathon project that got popular by accident. Tate's background in developer tooling and the Vercel ecosystem gives the project institutional credibility, even though it's explicitly labeled experimental.

The problem Zero solves is specific and timely. Today's AI coding agents — Claude Code, Codex, Cursor, Copilot — all work by editing source text. They parse strings, apply patches, hope the result compiles, and iterate. That loop is fragile. A text patch has to guess which references are related, whether a call resolves to the intended function, and whether an edit preserved ownership, fallibility, and effects. Zero's compiler exposes a ProgramGraph with typed nodes, resolved references, and graph-hash stale-context checks. Agents can target `node #expr_653eeb6e` instead of "lines 12-15" and get validation before any source is written.

### Why it matters

The agent-tooling space is exploding right now. Every week brings a new coding assistant, a new harness, a new way to chain LLM calls. But almost all of them share the same fundamental limitation: they treat source code as text. They operate at the string level, applying regex patterns and hoping for the best. Zero takes a different approach entirely — it redesigns the language itself to be agent-friendly.

This connects to a broader trend that's becoming impossible to ignore. Vercel has been positioning itself at the intersection of frontend frameworks and AI infrastructure. Zero feels like the systems-level complement to that strategy. If agents are going to write and modify code at scale, the languages they work with need to expose structure, not just characters. Zero is the first serious attempt at building that bridge.

The timing is also notable. Vercel Labs released this alongside zerolang, their Zig-based framework for desktop and mobile apps (4,100 stars). There's a pattern here: Vercel is investing heavily in the toolchain layer where humans and AI agents collaborate. Whether Zero succeeds as a production language is almost beside the point — the design patterns it introduces around graph-based editing and compiler-mediated agent loops will influence the next generation of developer tools.

### Key Features

**ProgramGraph — Semantic Structure for Agents.** The compiler derives a checked graph from source code, exposing node IDs, resolved types, effects, ownership facts, capabilities, and module edges. Agents can navigate this graph by starting from a symbol, diagnostic, or call and gathering only the relevant semantic slice. This is fundamentally different from asking an LLM to parse a file and figure out what's connected.

**Checked Graph Edits.** Instead of applying text patches and hoping they compile, agents submit graph edits that target specific nodes with graph-hash and field-value preconditions. The compiler validates, lowers, writes, formats, reparses, and checks the result as one operation. If the graph hash doesn't match (meaning the context is stale), the edit is rejected. This eliminates an entire class of agent bugs.

**Zero Dependencies, Fast Builds.** The language is written in C with explicit design constraints: token efficiency, low memory usage, fast startup, fast builds, and low runtime latency. No runtime dependencies. This isn't a research prototype that takes 30 seconds to compile hello world — it's built for the kind of tight iteration loops that agents need.

**Version-Matched Skills.** The compiler ships language guides, diagnostics docs, build docs, and stdlib references that match the exact binary version. Agents load these with `zero skills get language` instead of scraping documentation websites. No version drift, no stale docs, no hallucinated API references.

**Compiler-Native Agent Interface.** Every agent-facing surface is a CLI command with structured JSON output: `zero check --json`, `zero graph dump`, `zero fix --plan --json`, `zero explain --json`. No separate language server protocol, no editor plugins, no third-party analysis tools. The compiler is the single source of truth for inspection and repair.

**Explicit Effects and Capabilities.** The language makes side effects, fallibility, ownership, and resource use visible in the type system. This matters for agents because they need to reason about what a function does without reading its entire implementation. A function that raises or accesses the outside world says so in its signature.

**Human-Readable Source as Truth.** Despite the graph-first design, `.0` source files remain the stored artifact. The graph is derived data, not the primary representation. Source stays reviewable, auditable, and formatted — humans can read it, diff it, and approve it in code review. The graph is the agent's work surface, not the human's.

### Use Cases

- **AI agent code modification** — Agents working with Zero programs can submit precise, validated edits instead of text patches. The graph-hash check prevents stale-context bugs that plague current agent workflows.
- **Compiler-as-a-service for agent loops** — The CLI with JSON output makes Zero's compiler usable as a backend for any agent framework. Pipe `zero check --json` output to an LLM and get structured repair suggestions.
- **Rapid prototyping with agent assistance** — The fast build times and zero-dependency design make Zero suitable for quick iteration cycles where an agent proposes changes and a human reviews them.
- **Research into agent-native languages** — Even if you never ship Zero in production, the ProgramGraph design and checked-edit model are worth studying if you're building agent tooling.
- **Systems programming with safety constraints** — The explicit effects and capability model make Zero interesting for small systems where you want agents to reason about side effects without reading every function body.

### Pros and Cons

Pros:
- The graph-edit model is genuinely novel. No other language exposes compiler-derived semantic structure as a first-class agent interface. This solves real problems that current coding agents face daily.
- Vercel backing means sustained engineering investment. Chris Tate's 891 commits in three weeks suggest this isn't a side project that will be abandoned next month.
- The design constraints (zero dependencies, fast builds, low memory) are exactly right for agent workflows where iteration speed matters more than language feature richness.
- Apache 2.0 license means you can actually use this, fork it, and build on it without legal headaches.

Cons:
- Explicitly experimental. The README warns about security vulnerabilities and breaking changes. This is not something to put in production today, and the team is honest about that.
- The `.0` file extension and graph-first mental model require a genuine shift in how you think about programming. There's a learning curve that goes beyond syntax.
- Single contributor (891 commits from one person). If Chris Tate gets hit by a bus or reassigned, the project stalls. The bus factor is 1.
- No ecosystem yet. No package manager, no community libraries, no editor integrations beyond what the CLI provides. You're building from scratch.

### Getting Started

```bash
# Install Zero
curl -fsSL https://zerolang.ai/install.sh | bash
export PATH="$HOME/.zero/bin:$PATH"
zero --version

# Clone the repo and run examples
git clone https://github.com/vercel-labs/zerolang.git
cd zerolang

# Check a program
zero check examples/hello.0

# Run a small executable
zero run examples/add.0

# Dump the ProgramGraph (the key feature)
zero graph dump examples/hello.0

# Get structured diagnostics
zero check --json examples/hello.0

# Get language reference (version-matched)
zero skills get language

# Build a standalone binary
zero build --emit exe --target linux-musl-x64 examples/add.0 --out .zero/out/add
```

### Alternatives

**Roc** — A functional language with ahead-of-compilation and platform-based architecture. Roc is more mature than Zero and has a real community, but it's designed for humans first. It doesn't expose compiler internals as an agent interface. Choose Roc if you want a fast, functional language for building things today.

**Gleam** — A type-safe language for the Erlang VM with excellent error messages and a growing ecosystem. Gleam compiles to both Erlang and JavaScript. It's production-ready with real companies using it, but it has no agent-specific features. Choose Gleam if you need a reliable, type-safe language that runs on the BEAM.

**Unison** — A content-addressed language where functions are identified by hash, not name. Unison's approach to code storage (definitions live in a database, not files) shares some philosophical DNA with Zero's graph-first design. But Unison targets distributed systems, not agent workflows. Choose Unison if you're building distributed infrastructure and want content-addressed code management.

### Verdict

Zero is the most interesting language design experiment I've seen in 2026. The graph-edit model addresses a real, painful limitation of current AI coding tools — they work with text when they should work with structure. At nearly 5,000 stars in three weeks with a single maintainer, the developer interest is organic and strong. It's experimental software from Vercel Labs, so don't rewrite your production stack in it. But if you're building agent tooling, working on compiler infrastructure, or just curious about where programming languages need to go in an AI-first world, Zero deserves your attention. The checked graph-edit loop alone is an idea that every language ecosystem should be thinking about.
