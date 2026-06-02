---
name: zerolang
description: "Zerolang is a graph-first programming language from Vercel Labs where AI agents work with semantic program structure instead of raw source text."
url: https://github.com/vercel-labs/zerolang
stars: 4787
forks: 308
language: C
tags: ["programming-language", "ai-agents", "developer-tools", "vercel", "graph-compiler"]
featured: false
publishedAt: 2026-06-02
---

## Zerolang

### Overview

Zerolang is an experimental graph-first programming language built by Vercel Labs. Launched on May 15, 2026, it pulled nearly 5,000 GitHub stars in under three weeks. That kind of velocity usually signals either hype or genuine novelty — in this case, it's leaning heavily toward novelty.

The project comes from the team behind Vercel, Next.js, and the Turbopack bundler. Guillermo Rauch's fingerprints are all over the modern web stack, and zerolang represents their first serious bet on a programming language. The core premise: AI agents are writing and modifying code at an accelerating rate, but they're doing it through text manipulation — search-and-replace, regex patches, line-range edits. That's a lossy interface. Zerolang gives agents a compiler-derived graph they can inspect and edit semantically instead.

The language itself uses `.0` file extensions, compiles to native executables with zero dependencies, and targets fast startup, low memory usage, and token efficiency. It's written in C, ships as a single binary, and has no runtime garbage collector. The syntax reads like a cleaned-up Rust — typed signatures, infix expressions, explicit capability passing, and fallible functions marked with `raises`.

### Why it matters

Every major AI coding tool — Cursor, GitHub Copilot, Claude Code, Codex — operates on source text. They read files as strings, generate patches as text diffs, and rely on external linters and compilers to catch mistakes after the fact. This works, but it's fundamentally limited. When an agent edits a text range, it has to guess whether the change preserves ownership rules, whether the function it's renaming is the right one, whether the import graph is still valid. Zerolang collapses that guesswork.

The graph-first approach isn't just an academic exercise. The compiler derives a `ProgramGraph` from source that exposes node IDs, graph hashes, resolved types, effects, ownership facts, capability constraints, and module edges. An agent can target `node #610c78bf` instead of "lines 42-47," require a specific graph hash to reject stale context, and let the compiler validate the edit before touching source text. This is a fundamentally different editing model.

The timing matters too. As AI agents move from autocomplete to autonomous code generation, the interface between agents and codebases becomes a bottleneck. Zerolang is betting that the language itself should be agent-aware, not just the tooling around it. Whether zerolang specifically wins or not, this idea — that programming languages need first-class agent APIs — is going to shape language design over the next five years.

### Key Features

**ProgramGraph as the Agent Interface.** The compiler derives a checked graph from source that agents can query instead of parsing text. Nodes represent functions, parameters, method calls, and literals with stable IDs. Edges represent calls, arguments, and body containment. Graph hashes act as stale-context detectors — if the hash doesn't match what the agent inspected, the edit is rejected. This eliminates an entire class of merge-conflict-style bugs that plague text-based agent workflows.

**Checked Graph Edits.** Instead of generating text patches, agents submit semantic operations: "set field X on node Y, expecting current value Z." The compiler validates the edit against the graph, checks preconditions, rewrites source, reformats, reparses, and rechecks as a single atomic operation. This replaces the typical agent loop of edit → format → lint → check → fix with one compiler-mediated command. The `zero graph patch` CLI is the entry point.

**Compiler-Native Agent Contracts.** Most languages expose diagnostics, type info, and symbols through separate tools (LSP, linters, AST parsers). Zerolang bakes all of it into the compiler CLI with stable JSON output. `zero check --json` gives structured diagnostics with repair metadata. `zero fix --plan --json` produces typed repair proposals without editing files. `zero graph --json` dumps modules, imports, public symbols, capabilities, effects, and ownership facts. Everything an agent needs is one command away.

**Version-Matched Skill Files.** The compiler ships language guides, diagnostic explanations, and stdlib references as skill text bundled with the binary. `zero skills get language` prints the exact language rules matching the installed compiler version. This solves a real problem: agents using outdated documentation or mismatched tool versions. The skills stay in sync because they ship with the compiler.

**Token-Efficient Source Format.** The `.0` source format is intentionally regular and compact. The design goal is source that behaves like durable data — easy to index, compare, format, and audit. For agents, this means fewer tokens consumed per inspection. The compiler's structured output further reduces the context needed by giving agents only the semantic facts they asked for, not entire file contents.

**Zero-Dependency Native Compilation.** The compiler is written in C, produces static binaries, and has no runtime dependencies. Build targets include linux-musl-x64 with more planned. Startup is fast, memory footprint is low, and there's no garbage collector pause. This matters for agent workflows where compilation and checking happen frequently in tight loops.

**Capability-Based Safety Model.** Functions explicitly declare capabilities (like `World` for I/O) and fallibility (`raises`). The compiler tracks these through the graph, so agents can reason about side effects without reading function bodies. A function that doesn't declare `raises` can't throw — the compiler enforces it, not a linter.

### Use Cases

- **AI agent code generation pipelines** — Teams building autonomous coding agents can use zerolang's graph API as a higher-fidelity interface than text diffs, reducing hallucination-driven bugs in generated code.
- **Compiler-as-IDE workflows** — Developers who prefer CLI-driven development get structured diagnostics, typed fix plans, and semantic navigation without installing LSP servers or editor plugins.
- **Agent-assisted refactoring** — Large-scale renames, API migrations, and architectural changes can be expressed as graph operations with hash-based stale detection, making agent-driven refactors safer.
- **Educational compiler projects** — The clean C codebase and graph-first design make zerolang an interesting study target for anyone building language tooling or thinking about how compilers can serve agents.
- **Prototyping agent-aware language features** — Researchers and language designers can use zerolang as a testbed for ideas about how programming languages should evolve to support AI collaboration.

### Pros and Cons

Pros:
- Genuinely novel approach to the agent-code interface problem. No other language has compiler-native graph editing as a first-class feature.
- Backed by Vercel Labs with experienced systems engineers. The code quality and design thinking are high.
- Apache 2.0 license, active development (commits daily since launch), and rapid community adoption.
- The compiler CLI contracts are well-designed — stable JSON output, repair metadata, and structured diagnostics are useful even outside agent workflows.

Cons:
- Explicitly experimental and not production-ready. The README warns about security vulnerabilities and unstable APIs.
- The `.0` file ecosystem is obviously zero — no libraries, no package manager, no community packages. You're building everything from scratch.
- C-based codebase limits contributor accessibility compared to Rust or TypeScript projects.
- No runtime garbage collection means manual memory management, which is a hard sell for most application developers.

### Getting Started

```bash
# Install zerolang
curl -fsSL https://zerolang.ai/install.sh | bash
export PATH="$HOME/.zero/bin:$PATH"

# Verify installation
zero --version

# Check a program
zero check examples/hello.0

# Run a small executable
zero run examples/add.0

# Inspect the program graph
zero graph dump examples/hello.0

# Get structured diagnostics
zero check --json examples/hello.0

# View the language reference
zero skills get language
```

The `examples/` directory in the repository has several working programs including an agent repair demo that shows the full check → explain → plan → fix workflow.

### Alternatives

**Rust** — If you want a systems language with strong type safety and ownership semantics, Rust is the mature choice. It doesn't have zerolang's graph-first agent API, but its borrow checker provides similar safety guarantees. The rust-analyzer LSP gives agents decent structured access to code, though it's bolted on rather than built in. Choose Rust when you need production-grade systems code with a massive ecosystem.

**Zig** — Another C-alternative focused on simplicity and performance. Zig has comptime, explicit allocators, and no hidden control flow — values that overlap with zerolang's design philosophy. Andrew Kelley's team at the Zig Software Foundation is doing excellent work. But Zig doesn't address the agent interface problem at all. Choose Zig when you need a better C for systems programming today.

**Roc** — A functional language designed for fast, friendly, and functional programming with a unique platform-based architecture. Roc is interesting as a language design experiment but targets a different problem space (application development with platform abstraction). It shares zerolang's experimental spirit but not its agent-first focus. Choose Roc if you're interested in functional language design rather than agent tooling.

### Verdict

Zerolang is the most thought-provoking language project I've seen in 2026. The core insight — that source text is a lossy interface for AI agents and the compiler should provide something better — is one of those ideas that feels obvious in retrospect but nobody had built before. The ProgramGraph and checked graph edit model are genuinely novel contributions to how we think about the agent-code relationship.

That said, this is research-grade software. The language has no ecosystem, the API is unstable, and the README is upfront about production readiness being nowhere close. What it does have is a compelling vision, a capable team at Vercel Labs, and the kind of developer mindshare (5K stars in three weeks) that usually precedes real ecosystem growth. If you're building AI coding tools, agent frameworks, or thinking about how programming languages should evolve for an agent-heavy future, zerolang deserves a spot on your reading list. Whether it becomes a real language or just influences the next generation of language design, the ideas here are worth understanding.
