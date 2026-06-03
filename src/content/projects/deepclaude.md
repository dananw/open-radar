---
name: deepclaude
description: "Swap Claude Code's brain for DeepSeek V4 Pro or OpenRouter — same autonomous agent loop, 17x cheaper. MIT licensed, 2K+ GitHub stars."
url: https://github.com/aattaran/deepclaude
stars: 2029
forks: 126
language: JavaScript
tags: ["ai-coding-agent", "cost-optimization", "claude-code", "deepseek", "developer-tools"]
featured: false
publishedAt: 2026-06-03
---

## DeepClaude

### Overview

DeepClaude is a shell wrapper that lets you run Claude Code's full autonomous agent loop — file editing, bash execution, subagent spawning, multi-step coding — powered by DeepSeek V4 Pro, OpenRouter, Fireworks AI, or any Anthropic-compatible backend instead of Anthropic's own API. The result is the same UX at a fraction of the cost. The repo hit 2,000 GitHub stars within a month of its May 2026 launch, which tracks with how many developers are feeling the pinch of Claude Code's $200/month Max plan.

The project was built by aattaran, and while there isn't a big-name company behind it, the approach is clever rather than complex. DeepClaude doesn't fork Claude Code or reimplement its agent loop. It sets environment variables (`ANTHROPIC_BASE_URL`, `ANTHROPIC_AUTH_TOKEN`, and model name overrides) per-session, launches Claude Code as normal, then restores your original settings on exit. Claude Code thinks it's talking to Anthropic's API. It's actually talking to DeepSeek through an Anthropic-compatible proxy layer.

The core problem it solves is economic. Claude Code is arguably the best autonomous coding agent available today, but the Max plan costs $200/month with usage caps, and API usage at $15/M output tokens adds up fast during heavy agent loops. DeepSeek V4 Pro scores 96.4% on LiveCodeBench and costs $0.87/M output tokens — roughly 17x cheaper. For the 80% of coding tasks that are routine (boilerplate, refactors, test writing, file restructuring), the quality difference is negligible. DeepClaude lets you reserve Claude Opus for the 20% of tasks that actually need it.

### Why it matters

The AI coding agent space is moving fast, but cost remains the biggest barrier to adoption for individual developers and small teams. Anthropic's Max plan is priced for enterprise budgets. OpenAI's Codex and Google's Jules have their own pricing models. Meanwhile, open-source models like DeepSeek V4 Pro are closing the quality gap at a fraction of the price.

DeepClaude represents a pattern we're going to see more often: infrastructure tools that decouple the UX layer (Claude Code's excellent agent loop) from the intelligence layer (the LLM doing the thinking). This is the same pattern that made OpenRouter successful for chat interfaces — the best UI shouldn't be locked to a single model provider. For fullstack developers who use Claude Code daily, DeepClaude is the difference between an experimental toy and a sustainable workflow tool.

The mid-session backend switching feature is particularly interesting. You can start a session with DeepSeek for routine scaffolding, then switch to Anthropic Opus when you hit a complex architectural decision — all without restarting Claude Code or losing your context. That kind of flexibility didn't exist before.

### Key Features

**Zero-Change Claude Code Experience.** DeepClaude doesn't modify Claude Code's source code or agent loop. It sets environment variables that redirect API calls, then launches Claude Code normally. Every feature that works in Claude Code — file reading, editing, bash execution, glob/grep search, subagent spawning, git operations — works identically through DeepClaude. The only difference is which model processes your prompts.

**Multi-Backend Support with Cost Transparency.** Four backends are supported out of the box: DeepSeek (default, $0.87/M output), OpenRouter ($0.87/M output, lowest US/EU latency), Fireworks AI ($3.48/M output, fastest inference on US servers), and Anthropic ($15/M output, original Claude Opus). The `--cost` flag shows a side-by-side pricing comparison. The `--benchmark` flag runs latency tests across all configured providers so you can pick the best one for your location.

**Live Mid-Session Backend Switching.** A local proxy on `localhost:3200` intercepts API calls and exposes a `/_proxy/mode` endpoint. Inside Claude Code, you can type `/deepseek` or `/anthropic` to switch backends instantly — no restart, no terminal commands, no lost context. This is the standout feature. Start cheap, switch to expensive when the problem demands it.

**Automatic Context Caching.** DeepSeek's API automatically caches system prompts and file context, charging $0.004/M for cached tokens versus $0.44/M uncached. During long agent loops where the same project context is sent repeatedly, this makes multi-step tasks dramatically cheaper. Anthropic's manual `cache_control` mechanism isn't used — DeepSeek handles it transparently.

**Per-Session Isolation.** Environment variables are set only for the duration of the Claude Code session. When you exit, your original `ANTHROPIC_BASE_URL` and auth tokens are restored. There's no global configuration change, no risk of accidentally routing production API calls through a proxy. This makes it safe to use on shared machines or in CI environments.

**Cross-Platform Shell Scripts.** The tool ships as a bash script for macOS/Linux and a PowerShell script for Windows. No Node.js runtime, no compiled binary, no dependencies. Install is a single `ln -s` or `Copy-Item`. You can read the entire implementation in a few minutes, which matters for trust when you're routing API credentials through a third-party tool.

### Use Cases

- **Daily Claude Code users hitting usage caps** — If you burn through your Max plan allowance mid-month, DeepClaude lets you continue working with DeepSeek at 1/17th the cost for routine tasks.
- **Startup developers watching their burn rate** — Teams spending $200-500/month on Claude Code API costs can cut that to $20-80/month by routing most requests through DeepSeek and reserving Opus for hard problems.
- **Open source maintainers doing bulk refactoring** — Large-scale code changes (dependency updates, API migrations, test generation) are routine tasks where DeepSeek V4 Pro performs comparably to Claude Opus at a fraction of the cost.
- **Developers evaluating LLM backends** — The `--benchmark` and `--switch` features make it easy to compare DeepSeek, OpenRouter, Fireworks, and Anthropic side-by-side on your actual codebase, not synthetic benchmarks.
- **CI/CD pipelines that need autonomous coding** — Running Claude Code in automated workflows (code review, issue triage, patch generation) becomes economically viable when each run costs cents instead of dollars.

### Pros and Cons

Pros:
- Genuine 10-17x cost reduction for the majority of coding tasks without meaningful quality degradation on routine work. The cost comparison table with real usage scenarios (light, heavy, auto-loop) is refreshingly honest.
- Zero modification to Claude Code means you get upstream updates automatically. When Anthropic ships new Claude Code features, they work through DeepClaude on day one.
- The mid-session switching feature solves the real workflow problem of "I need cheap for grunt work and expensive for architecture decisions." No other tool offers this.
- MIT licensed, readable shell scripts. You can audit the entire implementation in 10 minutes. No binary blobs, no obfuscated code.

Cons:
- DeepSeek's Anthropic compatibility layer doesn't support image/vision input, so you can't use Claude Code's screenshot analysis or visual debugging features when running on DeepSeek.
- MCP server tools don't work through the compatibility layer, which limits integration with external tool servers that Claude Code normally supports.
- The proxy runs on localhost:3200, which could conflict with other local services. There's no configuration option to change the port.
- DeepSeek's servers are in China, which may introduce latency issues for developers in the Americas or Europe. OpenRouter mitigates this but at the same price point.

### Getting Started

```bash
# Clone the repository
git clone https://github.com/aattaran/deepclaude.git
cd deepclaude

# Make the script executable and symlink it
chmod +x deepclaude.sh
sudo ln -s "$(pwd)/deepclaude.sh" /usr/local/bin/deepclaude

# Set your DeepSeek API key
export DEEPSEEK_API_KEY="sk-your-key-here"

# Launch Claude Code with DeepSeek V4 Pro
deepclaude

# Check pricing comparison
deepclaude --cost

# Test latency across providers
deepclaude --benchmark

# Use OpenRouter instead (cheapest from US/EU)
deepclaude --backend or

# Switch backend mid-session (inside Claude Code)
# Just type: /deepseek  or  /anthropic
```

### Alternatives

**Claude Code Max Plan** — Anthropic's official $200/month plan gives you Claude Opus with usage caps and no configuration needed. If you primarily do complex architectural work where Opus quality matters and cost isn't a concern, the Max plan is simpler. DeepClaude makes sense when you're cost-sensitive or when most of your agent work is routine.

**Aider** — An open-source AI coding assistant that supports multiple LLM backends natively (DeepSeek, OpenAI, Anthropic, local models). Aider has its own agent loop and file editing system, so it's a true alternative rather than a wrapper. Choose Aider if you want a model-agnostic coding tool from the ground up, but expect a different UX than Claude Code's polished interface.

**OpenCode / Continue** — Open-source coding agents with multi-model support built in. These tools have their own strengths (OpenCode's terminal UI, Continue's IDE integration) but lack Claude Code's autonomous multi-step agent loop maturity. If you're not committed to Claude Code's workflow, these are worth evaluating independently.

### Verdict

DeepClaude is a pragmatic tool that solves a real economic problem. Claude Code's agent loop is genuinely the best in class for autonomous coding, but $200/month is steep for individual developers and small teams. DeepClaude doesn't try to be a Claude Code replacement — it's a cost optimization layer that lets you use the same tool at 1/10th to 1/17th the price for most tasks. The mid-session switching feature alone makes it worth installing: start every session cheap, escalate to Opus when the problem demands it. The 2,000+ stars in a month reflect genuine demand, not hype. If you use Claude Code regularly and aren't on an unlimited enterprise budget, install DeepClaude today.
