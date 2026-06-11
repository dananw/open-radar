---
name: lowfat
description: "Rust CLI that filters noisy shell command output before it reaches AI coding agents, saving up to 91% of tokens with a plugin-based architecture."
url: https://github.com/zdk/lowfat
stars: 486
forks: 16
language: Rust
tags: ["developer-tools", "cli", "token-optimization", "ai-agents", "rust"]
featured: false
publishedAt: 2026-06-11
---

## Lowfat

### Overview

Lowfat is a lightweight Rust CLI tool that sits between your shell commands and your AI coding agent, stripping unnecessary noise from command output before it consumes tokens. It hit 156 points on Hacker News when the creator posted the "Show HN" thread, and has accumulated 486 GitHub stars since its April 2026 launch. The project just shipped v0.6.9 on June 10th, so it's under active development with releases every few days.

The tool was created by the team behind zdk, and the philosophy is distinctly UNIX: small binary, composable pipes, no telemetry. While competitors like rtk take a batteries-included approach with 100+ built-in commands, lowfat ships just 6 curated filters (git, docker, grep, find, ls, tree) and lets you extend everything else with a custom plugin DSL. The tradeoff is deliberate — the maintainers believe a minimal core you understand beats a magic black box you don't.

The core problem lowfat solves is painfully real for anyone using Claude Code, Codex, or Cursor with agent mode. Every time your agent runs `git status`, `docker ps`, or `ls -la`, the full output — help text, formatting hints, color codes, boilerplate instructions — gets dumped into the context window. That's tokens you're paying for, and most of it carries zero signal. Lowfat's benchmarks show it can compress `git log` output by 93% at the "full" level and 97% at "ultra," while `git diff` drops by 96% at ultra. Those numbers add up fast when your agent is running dozens of shell commands per session.

### Why it matters

We're in a weird moment where developers are spending real money on AI coding agents, but the tooling to optimize that spend is still primitive. Claude Code charges by token, Codex charges by token, Cursor charges by token — and a surprising chunk of those tokens are the agent reading verbose CLI output that a human would skim in half a second. Lowfat attacks this problem at the right layer: the pipe between command output and agent input.

The timing connects to a broader trend. As AI coding agents move from novelty to daily driver, the economics matter more. A developer running Claude Code for 8 hours might execute hundreds of shell commands. If each one burns 200-500 unnecessary tokens on boilerplate, that's tens of thousands of wasted tokens per day. At current pricing, that's not catastrophic, but it's the kind of friction that makes you hesitate before asking the agent to explore. Lowfat removes that hesitation by making every command leaner without losing the information your agent actually needs.

What I find most interesting about lowfat specifically is the plugin architecture. The `.lf` DSL for writing custom filters is genuinely useful — you can target specific commands in your own stack (terraform, kubectl, npm, whatever) and define exactly what to keep and what to strip at each compression level. That's the kind of extensibility that turns a clever hack into infrastructure you can actually depend on.

### Key Features

**Three Compression Levels.** Every filter ships with `lite`, `full`, and `ultra` presets. Lite is conservative — it removes obvious boilerplate but keeps most output intact. Full strips formatting noise and redundant lines. Ultra is aggressive, dropping everything that isn't directly actionable. You pick the level globally or override per-command with `LOWFAT_LEVEL=lite lowfat git log`. The flexibility matters because different tasks need different fidelity.

**Claude Code Hook Integration.** Drop a JSON snippet into `.claude/settings.json` and lowfat automatically intercepts every Bash tool call your agent makes. The hook runs as a PreToolUse handler, so the agent never sees the raw output — it gets the filtered version as if that's what the command produced. Setup takes under 30 seconds and works immediately.

**Plugin DSL with `.lf` Files.** Custom filters are written in a purpose-built DSL that supports regex matching, line selectors, and conditional keeps. The scaffold command `lowfat plugin new terraform` generates the directory structure and a template you fill in. Plugins can also use shell scripts or Python (via PEP 723 and uv) for complex transformations. This is how you extend lowfat beyond the 6 built-in commands.

**Savings Analytics and History.** The `lowfat stats` command shows lifetime token savings, and `lowfat history` ranks your commands by potential savings so you know where to focus optimization efforts. The `lowfat stats --audit` flag shows recent plugin executions with before/after token counts. Everything is local — no telemetry, no cloud dashboard.

**Agent-Aware Shell Integration.** When lowfat detects it's running inside an agent environment (checks for `CLAUDECODE=1` or `CODEX_ENV` variables), it auto-activates. You can also force it on with `LOWFAT_ENABLE=1` for any shell. The shell init hook (`lowfat shell-init zsh`) rewrites command prefixes transparently, so `git status` becomes `lowfat git status` without you thinking about it.

**OpenCode Plugin Support.** One-command install for OpenCode: `lowfat opencode install` writes the plugin config and you're done. The team clearly watches which agents are gaining traction and ships native integrations for them. Claude Code, OpenCode, shell, and Pi agent are all supported today.

### Use Cases

- **AI-heavy development sessions** — When you're pair-programming with Claude Code or Codex for hours, every shell command the agent runs gets filtered. Over a full day, the cumulative savings are substantial, and the agent's responses improve because it's not parsing irrelevant noise.

- **Large monorepo exploration** — Running `git log`, `git diff`, or `ls -la` in a massive repo produces enormous output. Lowfat's ultra mode can cut that by 90%+, which means your agent can explore more of the codebase before hitting context limits.

- **Docker-heavy workflows** — `docker ps` and `docker images` output includes column formatting, status text, and size information that agents rarely need. The built-in docker filters strip that noise cleanly.

- **Custom toolchain optimization** — If your stack uses terraform, kubectl, or any CLI with verbose output, you can write a `.lf` plugin to filter exactly what matters for your agent. The plugin doctor command validates your filters against sample output.

- **Cost-conscious teams** — Organizations running AI coding agents at scale can quantify the savings with `lowfat stats` and make a data-driven case for standardizing it across the team.

### Pros and Cons

Pros:
- Measurable token savings backed by real benchmarks, not hand-wavy claims. The head-to-head comparison with rtk shows lowfat compresses git output harder at every level.
- Zero telemetry, zero cloud dependencies. Everything runs locally. The `lowfat stats` command gives you analytics without sending data anywhere.
- Plugin architecture is genuinely extensible. The `.lf` DSL, shell escapes, and Python support (via uv) cover almost any CLI tool you'd want to filter.

Cons:
- Only 6 built-in command filters. If your workflow doesn't revolve around git, docker, grep, find, ls, or tree, you'll need to write custom plugins immediately. The rtk comparison table makes this gap obvious.
- Compression at ultra level can be lossy. The README is honest about this — "verify your agent still has what it needs" — but it means you need to test each level with your specific agent and workflow.
- Rust-only installation via cargo or pre-built binaries. No npm, no pip, no brew formula (actually there is a brew tap: `brew install zdk/tools/lowfat`). The cargo install pulls in the full Rust toolchain if you don't have it.

### Getting Started

```bash
# Install via Homebrew (macOS/Linux)
brew install zdk/tools/lowfat

# Or install via cargo
cargo install lowfat

# Or grab a pre-built binary from GitHub Releases
# https://github.com/zdk/lowfat/releases

# Set up Claude Code hook — add to .claude/settings.json:
# {
#   "hooks": {
#     "PreToolUse": [{
#       "matcher": "Bash",
#       "hooks": [{ "type": "command", "command": "lowfat hook" }]
#     }]
#   }
# }

# Or activate shell integration
echo 'eval "$(lowfat shell-init zsh)"' >> ~/.zshrc

# Test it
lowfat git status
lowfat git log
lowfat docker ps

# Check your savings
lowfat stats
lowfat history

# Write a custom plugin
lowfat plugin new mytool
lowfat plugin doctor
```

### Alternatives

**rtk** — The closest competitor with 100+ built-in commands versus lowfat's 6. rtk takes a batteries-included approach with a TOML DSL for custom filters and integrations for 14 different AI tools. Choose rtk if you want maximum out-of-the-box coverage and don't want to write plugins. Choose lowfat if you prefer a minimal, transparent core you can inspect and extend yourself.

**context-mode** — A different approach to the same problem, focusing on context window management rather than command output filtering. It works at a higher level, managing what gets sent to the agent across the entire session rather than per-command. Less surgical than lowfat but covers more ground.

**tamp** — Another token-saving tool in the space, with a focus on prompt compression rather than CLI output filtering. It targets the agent's input side rather than the command output side. Different layer of the same problem.

### Verdict

Lowfat is the kind of tool that makes you wonder why it didn't exist sooner. If you're running AI coding agents daily — Claude Code, Codex, Cursor, OpenCode, any of them — and you're not filtering command output, you're burning tokens on noise. The benchmarks are honest and the savings are real: 91% on git status, 93% on git log, 96% on git diff at ultra. The plugin system means you're not locked into the 6 built-in filters, and the `.lf` DSL is simple enough that writing a custom filter takes minutes, not hours. The 486-star growth since April and 156-point HN reception suggest the developer community agrees this is a problem worth solving. The main risk is that agent platforms will eventually build this filtering natively — Claude Code could add output compression tomorrow and make lowfat redundant. But until that happens, this is a smart, well-engineered piece of infrastructure that pays for itself on day one.
