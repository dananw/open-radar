---
name: patent
description: "A Rust CLI that searches 11 developer registries at once to find prior art for your code ideas using local semantic search and AI verdicts."
url: https://github.com/r14dd/patent
stars: 252
forks: 6
language: Rust
tags: ["developer-tools", "cli", "semantic-search", "rust", "productivity"]
featured: false
publishedAt: 2026-06-05
---

## Patent

### Overview

Patent is a Rust CLI tool that searches 11 developer registries in a single command to find prior art for your code ideas. It hit 250 stars within its first week on GitHub, which is impressive for a developer tool with no company backing and no marketing budget — just a useful idea executed well.

The project is built by r14dd, a solo developer who clearly spends a lot of time in the terminal. The tool uses local embeddings (AllMiniLM-L6-V2 via fastembed) for semantic ranking and an optional local LLM through Ollama for generating verdicts. Everything runs on your machine by default. No API keys, no cloud calls, no tracking.

The core problem it solves is one every developer has faced: you have an idea for a tool or library, you spend a weekend building it, and then discover three mature alternatives already exist on npm. Patent lets you check the entire developer ecosystem in seconds before you commit time to building something that might already exist. It searches crates.io, npm, PyPI, GitHub, Go packages, Maven, NuGet, RubyGems, Docker Hub, VS Code Marketplace, and Hacker News — then ranks every result by cosine similarity to your idea.

### Why it matters

The developer tools ecosystem is massive and fragmented. npm alone has over 2 million packages. PyPI has over 500,000. Crates.io crossed 150,000 crates. Docker Hub has millions of images. Finding the right existing solution across these registries typically means opening 10 browser tabs and searching each one manually. Patent collapses that into a single terminal command.

This connects to a real trend in developer productivity. The rise of AI coding assistants means developers are generating code faster than ever, but the question of "should I build this at all?" hasn't been solved by AI. If anything, AI makes it easier to waste time rebuilding things that already exist. Patent addresses the discovery problem that sits upstream of the coding problem.

The local-first approach is also notable. Most developer search tools either hit cloud APIs (rate-limited, privacy concerns) or require accounts. Patent runs embeddings on your machine and defaults to a local LLM for verdicts. The tool gracefully degrades too — if the LLM isn't available or a registry times out, you still get ranked results without the AI verdict. That resilience matters for a tool developers will rely on daily.

### Key Features

**11-Registry Search in One Command.** Patent searches crates.io, npm, PyPI, GitHub, Go packages, Maven, NuGet, RubyGems, Docker Hub, VS Code Marketplace, and Hacker News simultaneously. You describe your idea in plain English and get results from across the entire developer ecosystem. No more tab-hopping between registries.

**Semantic Ranking with Local Embeddings.** Every result is scored by cosine similarity using AllMiniLM-L6-V2 embeddings running locally via fastembed. This means results are ranked by semantic meaning, not just keyword matching. Searching "distributed key-value store in rust" finds etcd, TiKV, and CockroachDB even if they don't use those exact words in their descriptions.

**AI Verdicts with Ollama.** A local LLM classifies your search space as Open, Crowded, or Saturated and identifies gaps you could fill. The verdict is honest — it can prove something exists but never claims something doesn't. You can also point it at any OpenAI-compatible API with `--api-base` if you prefer a cloud model.

**Smart Registry Selection.** The tool is smart about where it searches. Mention "rust" and it prioritizes crates.io. Mention "docker" and it hits Docker Hub. GitHub and Hacker News are always searched since they're language-agnostic. With no language signal, it does a broad sweep across the largest registries.

**Interactive TUI with Fallback JSON.** Results render in a scrollable, filterable TUI built with Ratatui. You can sort by relevance, open detail popups, and launch URLs with a single keypress. For scripting and pipelines, `--json` gives you structured output you can pipe into jq or your own tooling.

**Instant Mode.** The `--fast` flag skips the LLM entirely and gives you ranked results immediately, with a saturation level derived from similarity scores alone. This is useful when you just want to see what exists without waiting for a model to generate a verdict.

**Graceful Degradation.** If the LLM crashes, isn't pulled, or a registry times out, Patent still renders results. Sources that fail are shown as "not reached" — never fatal. This is the right design for a developer tool. You don't want a search to blow up because Ollama ran out of memory.

### Use Cases

- **Idea validation before building** — You're about to spend a weekend building a React infinite scroll component. Run `patent "react component for infinite scroll"` first and see if there are already five well-maintained options.
- **Competitive analysis** — Survey an entire ecosystem for a category of tool in one command instead of manually searching each registry. Useful for technical blog posts, conference talks, or evaluating where to contribute.
- **Finding existing solutions to integrate** — Instead of building from scratch, search for what already exists in your language ecosystem and pick the best option based on the ranked results.
- **Research for technical writing** — Writing a comparison of Go HTTP frameworks? Patent gives you a ranked list across registries in seconds, including Hacker News discussions that might surface lesser-known options.
- **Onboarding to a new ecosystem** — Joining a project that uses Rust? Search for common tool categories ("logging", "config", "cli framework") to quickly map the landscape.

### Pros and Cons

Pros:
- Searches 11 registries in a single command, saving significant time compared to manual searching across npm, PyPI, crates.io, and others individually.
- Local-first architecture means no API keys, no rate limits, and no privacy concerns. Embeddings run on your machine, and the LLM defaults to Ollama.
- Graceful degradation is well-implemented — partial failures don't break the tool, and results still render without the AI verdict.

Cons:
- 250 stars means a small community. Documentation is decent but sparse, and you're unlikely to find Stack Overflow answers or tutorials outside the README.
- The semantic search quality depends on the AllMiniLM-L6-V2 model, which is small and fast but not as accurate as larger embedding models for nuanced developer tool descriptions.
- Rust-only installation via `cargo install` excludes developers who don't have a Rust toolchain. No Homebrew, npm, or pip package yet.

### Getting Started

```bash
# Install from crates.io
cargo install patent

# Search for prior art
patent "interactive cli to kill whatever's on a port"

# Get structured JSON output
patent "react component for infinite scroll" --json | jq .

# Skip the AI verdict for instant results
patent "kubernetes log viewer" --fast

# Use a cloud API instead of local Ollama
patent "distributed cache in go" --api-base https://api.openai.com/v1
```

### Alternatives

**npm-search / pip search / cargo search** — The built-in search commands for individual package managers. They work fine for single-registry searches but require you to run separate commands for each ecosystem and don't do semantic ranking. Patent replaces all of them with one command and adds similarity scoring. Choose the native tools when you already know which registry you're targeting.

**Libraries.io** — A web-based service that tracks open source packages across 40+ registries with dependency monitoring and notifications. It has a much larger registry coverage and better UI for browsing, but requires a browser, an account, and doesn't do semantic search on your idea description. Choose Libraries.io when you need ongoing monitoring of a package ecosystem rather than one-off prior art searches.

**Socket.dev** — Focuses on supply chain security for npm and PyPI packages, analyzing dependency trees for vulnerabilities and suspicious behavior. It's better for security auditing of packages you're already using, not for discovering what exists. Choose Socket when you're evaluating the safety of a known package, not when you're searching for alternatives.

### Verdict

Patent is the kind of tool that should exist but didn't until now. The developer ecosystem is too large and too fragmented for manual registry searches to be efficient, and the fact that it runs entirely locally — embeddings, ranking, and AI verdict — makes it practical for daily use without API costs or privacy trade-offs. At 250 stars in its first week, it's clearly filling a gap developers felt. The Rust-only installation is a friction point that will limit adoption until Homebrew or npm packages arrive, and the community is small enough that you're mostly relying on the README for guidance. But for any developer who's ever spent a weekend building something that already existed, this tool pays for itself on first use. It's particularly valuable for fullstack developers who work across multiple language ecosystems — searching npm and PyPI and crates.io in one command is a genuine time saver that browser tabs can't match.
