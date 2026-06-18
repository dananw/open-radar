---
name: llmtrim
description: "A Rust-based local proxy that compresses LLM API requests in real-time, cutting costs by 66% without changing your AI tool's answers. Works with Claude Code, Codex, Cursor, and more."
url: https://github.com/fkiene/llmtrim
stars: 72
forks: 4
language: Rust
tags: ["developer-tools", "llm", "cost-optimization", "rust", "ai-agents"]
featured: false
publishedAt: 2026-06-19
---

## llmtrim

### Overview

llmtrim is a local proxy that sits between your AI coding tools and the LLM provider, compressing every request before it hits the wire. It cuts input tokens by 31% and output tokens by 74% — measured across 112 live A/B cases — with no change in answer quality. That translates to a 66% reduction in round-trip cost. The tool runs entirely on your machine. Nothing leaves your network.

Created by Florian Kiene and released on June 7, 2026, llmtrim has already gathered 72 stars in under two weeks. It's written in Rust, ships as a single static binary, and installs in one command. The project is licensed under MPL-2.0, which means you can use it commercially without disclosing your own code — only modifications to llmtrim itself must be shared.

The core problem it solves is simple but expensive: every time you run Claude Code, Codex, Cursor, or Aider, the tool sends massive blobs of text to the LLM. Build logs where only 2 out of 58 lines are errors. Tool schemas resent identically 50 times. JSON arrays with 500 near-identical rows. You pay for every token, every turn. llmtrim strips the waste before it's sent. Same answers, smaller bill.

### Why it matters

If you're using AI coding agents daily — and in 2026, most fullstack developers are — the API bill adds up fast. A typical Claude Code session burns through $0.50 to $2.00 per hour. Teams running multiple agents in CI pipelines or as background workers can easily hit $50-100/day. That's real money, especially for indie developers and small teams.

The existing alternatives optimize one layer. RTK shrinks CLI output. caveman compresses the model's reply. Headroom focuses on aggressive input compression. llmtrim is the first tool that handles the whole round-trip — input, output, cache prefix — and quality-gates every compression step. If a cut would drop answer-relevant content, it reverts. The worst case is zero savings, never a worse outcome.

What makes this especially interesting for fullstack developers is the MCP server mode. You can integrate llmtrim directly into Claude Code or Cursor as a tool, bypassing the proxy entirely. It also ships as a library in Python, Ruby, Swift, and Kotlin, so you can bake token compression into your own applications. This isn't just a CLI wrapper — it's infrastructure.

### Key Features

**Quality-Gated Compression.** Every compression step runs through a quality gate: if removing tokens would lower the model's ability to answer correctly, the cut is reverted automatically. The tool re-measures with the provider's real tokenizer to confirm actual savings. This means llmtrim can never make your bill larger or degrade your results. On the 112-case benchmark, answer quality actually improved slightly from 78.9% to 82.2% after compression.

**Ten Specialized Compressors.** llmtrim doesn't use a one-size-fits-all approach. It runs ten distinct compression stages, each targeting a different source of token waste: tool output folding (repetitive build logs), cache prefix stabilization (so your prompt cache survives), lexical retrieval for long contexts, code skeletonization via tree-sitter (14 languages supported), JSON/TOON encoding for record arrays, deduplication, output control instructions, tool layer trimming, and multimodal image downscaling. The `auto` preset inspects each request and picks the right combination.

**MCP Server Mode.** Run `llmtrim mcp install` and it registers as a Model Context Protocol server in Claude Code. Any MCP client can then call three tools: `llmtrim_compress` for full request bodies, `llmtrim_compress_text` for individual text blobs, and `llmtrim_stats` for your savings ledger. This is the cleanest integration path if you don't want proxy configuration.

**Universal Tool Compatibility.** llmtrim works with any tool that honors `HTTPS_PROXY` and accepts an env-provided CA certificate. That includes Claude Code, Codex CLI, Gemini CLI, Cursor, VS Code extensions, Aider, and OpenCode. The only exception is GitHub Copilot, which pins its certificates and can't be intercepted. For tools that don't support proxies, the MCP server or direct CLI usage covers the gap.

**Live Savings Dashboard.** The `llmtrim status --watch` command shows a real-time dashboard: tokens trimmed, dollars saved off your actual bill, input/output savings bars, and a per-model breakdown. This gives developers immediate feedback on whether the compression is worth it for their specific workload. The dashboard pulls from a local SQLite ledger — nothing is sent externally.

**Cross-Platform Single Binary.** Written in Rust with a static binary distribution. Install via npm (`npm install -g @llmtrim/cli`), Homebrew (`brew install fkiene/tap/llmtrim`), Cargo (`cargo binstall llmtrim`), Scoop, Docker, or the shell installer script. No runtime dependencies, no Python environment, no Node.js requirement beyond the npm install path. Overhead per request is under 10 milliseconds.

**Cache-Aware Architecture.** One of the cleverest design decisions: llmtrim never rewrites content under a `cache_control` marker. This means your Anthropic prompt cache discount survives compression intact. The tool stabilizes the invariant prefix (sorted tool schemas, OpenAI's `prompt_cache_key`) so the cache hit rate stays high. Other compression tools break caching, which can actually increase costs.

### Use Cases

- **Individual developers using Claude Code or Codex daily** — If you're spending $20-50/month on API calls, llmtrim can cut that to $7-17 with zero change in coding quality. The proxy runs silently in the background.
- **Teams running AI agents in CI/CD pipelines** — Multiple agents processing pull requests, generating tests, or reviewing code across a team. At scale, the 66% cost reduction becomes significant.
- **Fullstack developers building AI-powered features** — If your app calls LLM APIs for content generation, summarization, or code completion, the library mode lets you compress requests programmatically before they leave your server.
- **Developers working with large codebases** — The code skeletonization compressor uses tree-sitter to keep relevant function bodies while reducing everything else to signatures. Perfect for monorepos where agents process hundreds of files.
- **Cost-conscious indie hackers and startups** — When every dollar counts, a tool that cuts your LLM bill by two-thirds with a single install command is hard to argue with.

### Pros and Cons

Pros:

- Verified 66% cost reduction across 112 A/B test cases with real provider billing, not estimates or simulations. The numbers are reproducible — the benchmark scripts are included in the repo.
- The quality gate means you literally cannot make things worse. If compression doesn't save tokens, it reverts. This removes the risk that usually comes with aggressive optimization.
- The MCP server integration is elegant. One command to install, and Claude Code gets compression tools without any proxy configuration or certificate management.
- Rust implementation means sub-10ms overhead per request and a single static binary with no runtime dependencies.

Cons:

- At 72 stars and less than two weeks old, the project is very young. The API and configuration surface may change. Production use at this stage requires accepting some instability.
- The MITM proxy approach requires installing a CA certificate, which some developers and security teams will push back on. The certificate is constrained to LLM API domains only, but the technique itself raises eyebrows.
- Anthropic and Gemini token counts use a BPE proxy tokenizer rather than the exact provider tokenizer, so savings for those providers are approximate. OpenAI counts are exact.
- GitHub Copilot compatibility is blocked by certificate pinning, which cuts out a significant portion of the developer market.

### Getting Started

```bash
# Install via npm (any OS, no Rust needed)
npm install -g @llmtrim/cli@latest && llmtrim setup

# Open a new shell — your AI tools now route through llmtrim automatically

# Watch the savings as you work
llmtrim status --watch

# Or install the MCP server for Claude Code integration
llmtrim mcp install

# Test compression on a specific request
echo '{"model":"gpt-4o","messages":[{"role":"user","content":"Hello"}]}' | llmtrim compress --provider openai

# Diagnose any issues
llmtrim doctor

# Uninstall cleanly (removes CA cert, proxy settings, service)
llmtrim uninstall
```

### Alternatives

**RTK (Rust Token Killer)** — A Rust CLI tool that compresses the output of CLI commands before they're sent to AI agents. RTK focuses on the tool-output layer: build logs, test results, grep dumps. It's complementary to llmtrim rather than competitive — you can run RTK to shrink CLI output, then llmtrim compresses the tool schemas and conversation history on top. If you're only concerned with CLI output bloat, RTK alone might suffice.

**Headroom** — A Python-based input compression tool that uses ML models for aggressive summarization. Headroom compresses harder than llmtrim at matched settings (74% vs 58% on aggressive tool output). The tradeoff: it adds 52ms latency per request, requires Python with GB-scale models installed, doesn't compress output, and doesn't preserve the cached prefix. Choose Headroom if raw input compression is your only goal and you can tolerate the overhead.

**caveman** — A lightweight output-only compressor that asks the model for terser responses. It's simpler than llmtrim but covers only the output side and injects 949 tokens of prompt overhead per request. caveman makes sense if you want minimal setup and only care about output cost.

### Verdict

llmtrim is the most practical developer tool I've seen for LLM cost management in 2026. It does one thing — compress API requests — and does it with a level of rigor that's unusual for a project this young. The A/B benchmark methodology is solid, the quality gate eliminates the usual risk of compression, and the integration options (proxy, MCP, CLI, library) cover every workflow. For any fullstack developer running Claude Code, Codex, or Cursor regularly, this is a one-command install that pays for itself immediately. The 66% cost reduction with no quality loss isn't marketing — it's measured, reproducible, and included in the repo. The main caveat is maturity: at two weeks old, expect rough edges and API changes. But the architecture is sound, the Rust implementation is fast, and the author clearly understands both the token economics and the tooling ecosystem. Install it, run `llmtrim status --watch`, and watch your bill drop.
