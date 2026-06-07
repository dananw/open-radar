---
name: semble
description: "Semble is a fast code search library for AI agents that uses 98% fewer tokens than grep+read, with MCP server support and zero setup required."
url: https://github.com/MinishLab/semble
stars: 4892
forks: 205
language: Python
tags: ["code-search", "ai-agents", "mcp", "developer-tools", "embeddings"]
featured: false
publishedAt: 2026-06-07
---

## Semble

### Overview

Semble is a code search library purpose-built for AI coding agents. It hit nearly 5,000 GitHub stars within two months of its April 2026 launch, which tracks with the explosion of agent-driven development workflows. The pitch is direct: when your AI agent needs to find code, it shouldn't have to grep through entire files and burn through your context window. Semble returns only the relevant code snippets, using roughly 98% fewer tokens than the standard grep-and-read approach.

The project comes from MinishLab, a research-focused team led by Thomas van Dongen and Stephan Tulkens. They're the same people behind Model2Vec, a lightweight embedding library that's gained traction for running semantic search without transformer overhead. That background matters because Semble's core trick — fast, accurate code retrieval on CPU — comes from their expertise in static embeddings. Their potion-code-16M model is specifically trained for code understanding and runs without any API calls or GPU requirements.

The problem Semble solves is concrete and measurable. Coding agents like Claude Code, Cursor, and Codex routinely explore unfamiliar codebases by grepping for patterns, reading full files, and stuffing results into their context windows. On a medium-sized repo, that process consumes 50-100K tokens just to find the right files. Semble's benchmarks show it achieves 94% recall at only 2,000 tokens, while grep+read needs a full 100K context window to hit 85% recall. For developers running multiple agent sessions per day, that token savings translates directly to faster responses and lower costs.

### Why it matters

The AI coding agent ecosystem is growing fast, but the infrastructure underneath is still primitive. Most agents search code the same way developers did in 2005 — grep, find, read. That works fine when a human is filtering results, but agents need precision. They can't afford to read 50 files to find the one function they need. Semble fills that gap with a tool that's specifically designed for how agents think about code.

What makes this particularly interesting is the MCP integration. Semble ships as a Model Context Protocol server, which means it plugs directly into Claude Code, Cursor, Codex, OpenCode, and VS Code without custom integration work. The agent calls `search` with a natural-language query like "How is authentication handled?" and gets back only the relevant code chunks. No file reading, no context bloat. It also supports `find_related` — give it a file path and line number, and it returns semantically similar code elsewhere in the repo. That's genuinely useful for understanding how a codebase is structured.

The timing connects to a broader shift. As coding agents become the primary way developers interact with large codebases, the tools that mediate that interaction matter more. Semble isn't trying to be an agent itself — it's infrastructure that makes every agent better. That positioning is smart.

### Key Features

**Sub-second indexing with no GPU required.** Semble indexes an average repository in about 250 milliseconds and answers queries in roughly 1.5 milliseconds, all on CPU. The secret is their static Model2Vec embeddings — there's no transformer forward pass at query time. The potion-code-16M model produces fixed embeddings that can be compared with simple dot products. This means you can run it on a $5/month VPS without thinking twice.

**Hybrid retrieval with code-aware reranking.** Semble doesn't just do semantic search. It combines Model2Vec embeddings for semantic similarity with BM25 for lexical matching on identifiers and API names, then fuses the results using Reciprocal Rank Fusion. After that, it applies code-specific signals: definition boosts for chunks that define a queried symbol, identifier stemming to catch `parseConfig` when you search for `parse config`, file coherence scoring, and noise penalties for test files and declaration stubs. The result is retrieval that understands code structure, not just text similarity.

**Three integration modes for any workflow.** Semble works as an MCP server that agents call directly, as a CLI tool for scripts and manual searches, or as a Python library for custom tooling. The `semble install` command auto-detects your coding agents and offers to set up the right integrations. You can also add CLI guidance to your AGENTS.md or CLAUDE.md files so agents know to use Semble instead of grep.

**Token savings tracking.** The `semble savings` command shows exactly how many tokens you've saved across all searches, broken down by time period. In their example output, a week of typical usage saves around 312K tokens (90% reduction). For teams running agents on paid API tiers, that's real money.

**Remote repository support.** Pass a git URL instead of a local path and Semble clones and indexes the repo on demand. This is useful for exploring dependencies, reviewing open-source code, or searching repos you haven't cloned locally. The index is cached after the first run.

**Code-aware file handling.** Semble reads `.gitignore` and `.sembleignore` files to control what gets indexed. It automatically skips `node_modules/`, `.venv/`, `dist/`, `build/`, `__pycache__/`, and similar directories. You can force-include non-default file types with the `!` prefix pattern (like `!*.proto` for Protobuf files). The tree-sitter-based chunking splits files along syntactic boundaries rather than arbitrary line counts, so chunks correspond to actual functions, classes, and blocks.

### Use Cases

- **Large codebase exploration** — When an agent needs to understand how a feature works across dozens of files, Semble returns the relevant snippets without reading entire modules. Especially useful for monorepos where grep returns hundreds of matches.

- **Code review automation** — Agents reviewing pull requests can use `find_related` to discover similar patterns elsewhere in the codebase, catching inconsistencies or duplicated logic that a simple diff wouldn't surface.

- **Onboarding to unfamiliar projects** — New team members (human or agent) can ask natural-language questions about the codebase and get targeted answers. "How does the payment flow work?" returns the relevant handler, service, and model code without manual navigation.

- **Cross-repository research** — Compare implementation patterns across related open-source projects by searching remote repos via git URL. Useful for evaluating libraries or understanding how different projects solve the same problem.

- **CI/CD pipeline integration** — Use the CLI in build scripts or pre-commit hooks to verify that new code follows existing patterns, or to find all usages of a deprecated API before merging.

### Pros and Cons

Pros:
- 98% token reduction vs. grep+read is a massive efficiency gain for agent workflows. The benchmarks are rigorous — 1,250 queries across 63 repositories in 19 languages.
- Zero external dependencies for running. No API keys, no GPU, no cloud services. Everything runs locally on CPU in milliseconds.
- MCP server integration means it works with every major coding agent out of the box. No custom glue code needed.
- The hybrid retrieval approach (semantic + lexical + code-aware reranking) produces genuinely better results than either method alone.

Cons:
- Python-only ecosystem. If your agent infrastructure is in Go, Rust, or TypeScript, you're calling a Python subprocess or MCP server — not embedding it natively.
- The static embedding model (potion-code-16M) trades some quality for speed. At 99% of a 137M-parameter transformer's quality, it's close but not identical. For highly specialized codebases (domain-specific languages, niche frameworks), the gap might be wider.
- Index caching is per-machine. In a team setting, each developer's agent builds its own index rather than sharing a central one. For large repos, that's duplicated work.

### Getting Started

```bash
# Install with uv (recommended)
uv tool install semble
semble install

# Or install with pip
pip install semble
semble install

# Search a local repo
semble search "authentication flow" ./my-project

# Search a remote repo
semble search "save model to disk" https://github.com/MinishLab/model2vec

# Find code similar to a specific location
semble find-related src/auth.py 42 ./my-project

# Check your token savings
semble savings

# Use as a Python library
python -c "
from semble import SembleIndex
index = SembleIndex.from_path('./my-project')
results = index.search('database connection pooling', top_k=5)
for r in results:
    print(f'{r.chunk.file_path}:{r.chunk.start_line}')
    print(r.chunk.content[:200])
"
```

For MCP server setup with Claude Code, Cursor, or other agents, run `semble install` and follow the interactive prompts. It detects which agents you have installed and configures them automatically.

### Alternatives

**Greptile** — A hosted AI code review and search platform that indexes your repos in the cloud. Greptile offers more features (PR review, team collaboration, Slack integration) but requires sending your code to their servers and paying per-query. Choose Greptile if you want a managed service with a UI and team features. Choose Semble if you want local, private, zero-cost search.

**Aider's repo map** — Aider, the AI pair programming tool, builds a repository map by parsing ASTs and summarizing files. It's designed specifically for Aider's workflow and uses tree-sitter for parsing, similar to Semble. But it's not a standalone search tool — it's embedded in Aider's architecture. If you're already using Aider, its built-in repo map might be sufficient. If you need search across agents or scripts, Semble is the better choice.

**Sourcegraph Cody** — Sourcegraph's AI coding assistant includes code search powered by their enterprise-grade search infrastructure. Cody offers more sophisticated features like cross-repo search, precise code intelligence, and IDE integration. But it's a commercial product with usage limits on the free tier, and the search is designed for human-driven workflows rather than agent tool calls. For agent-native search, Semble is purpose-built.

### Verdict

Semble is the kind of infrastructure tool that should have existed the moment coding agents started reading files. The 98% token reduction claim sounds marketing-heavy, but the benchmarks back it up — 1,250 queries across 63 repos in 19 languages, with rigorous comparisons against grep+read and a 137M-parameter transformer. The fact that it runs on CPU in milliseconds with zero configuration makes it practically frictionless to adopt. If you're building or using AI coding agents in mid-2026, Semble is the kind of tool you add to your setup once and forget about — because it just works. The MCP integration means it'll be relevant as the agent ecosystem evolves, and the MIT license means you can embed it anywhere. At nearly 5,000 stars and active development from the MinishLab team, this has the momentum to become standard infrastructure for agent-driven development.
