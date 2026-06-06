---
name: codex-shim
description: "codex-shim is a local Python proxy that lets you run Codex Desktop against any BYOK model — OpenAI, Anthropic, DeepSeek, Gemini, Ollama — while keeping native agent loops and streaming intact."
url: https://github.com/0xSero/codex-shim
stars: 780
forks: 75
language: Python
tags: ["ai-agents", "developer-tools", "codex", "proxy", "byok"]
featured: false
publishedAt: 2026-06-06
---

## codex-shim

### Overview

codex-shim is a local Python/aiohttp server that sits between Codex Desktop and any upstream model provider you configure. It exposes an OpenAI Responses-compatible endpoint on loopback, routes each request to the matching upstream — OpenAI chat completions, Anthropic Messages, a generic OpenAI-shaped endpoint, or even your ChatGPT subscription's Codex backend — then translates streaming responses back into the shape Codex expects. The repo hit 780 stars in about two weeks after its late-May 2026 launch, which is fast for a developer tool with zero marketing budget.

The project is by 0xSero, a developer who clearly spends a lot of time inside Codex Desktop and got tired of being locked to whatever models OpenAI's server-side config allows. That's a real pain point. Codex Desktop has a Statsig-controlled allowlist that hides any model whose slug isn't on a hardcoded list. You can't just point it at your DeepSeek API key or your local Ollama instance and expect it to work. codex-shim solves this by becoming the local provider that Codex talks to, while routing upstream to whatever you actually want to use.

The practical outcome: you keep Codex Desktop's native UX — the model picker, the agent loops, function calls, tool outputs, reasoning blocks, image-capable models, shell-command metadata, and streaming SSE — while routing to any model you have an API key for. No Codex rebuild. No request replay workflow. Just a local proxy that translates between protocol shapes.

### Why it matters

The AI coding agent space is moving fast, and model lock-in is becoming a real friction point. OpenAI's Codex is arguably the most capable coding agent available today, but it only shows you models from its own catalog. If you're paying for a Claude subscription, running DeepSeek locally, or have an OpenRouter account with access to dozens of models, you can't use them inside Codex without workarounds.

This is a problem that compounds. Developers who use multiple AI providers — and in 2026, that's most serious developers — end up maintaining separate workflows for each tool. Codex for one set of tasks, Claude Code for another, Cursor for a third. codex-shim collapses that by making Codex a universal frontend for any model. You pick your model from the same Codex picker you already use, and the shim handles the translation.

The tool also ships with an Auto Router feature that uses a cheap classifier model to route each task to the cheapest configured model that can handle it. Simple formatting tasks go to a cheap model. Hard reasoning tasks escalate to Claude Opus or GPT-5.5. This kind of intelligent routing is what enterprise AI platforms charge premium prices for, and codex-shim gives it to you as a local feature.

### Key Features

**Multi-Provider Translation Layer.** The shim translates between Codex's Responses API format and three upstream protocol shapes: OpenAI chat completions, Anthropic Messages, and generic OpenAI-shaped endpoints. This covers OpenAI, Anthropic, DeepSeek, Gemini, OpenRouter, Z.ai, and any local server that speaks the OpenAI chat completions format. Tool calls, reasoning blocks, and streaming SSE are translated rather than flattened into plain text, so Codex's agent loops stay intact.

**ChatGPT and Cursor Subscription Passthrough.** If you have a valid Codex access token in `~/.codex/auth.json`, the shim can route traffic to ChatGPT's Codex backend under the `gpt-5.5` slug. Similarly, if `cursor-agent login` is active, it exposes `composer-2-5` through your Cursor subscription — no Dashboard API key required. This means you can use your existing subscriptions through the same interface.

**Auto Router with Cost Optimization.** The optional Auto Router uses a cheap classifier model to analyze each task and route it to the most cost-effective configured model that can handle it. Simple tasks stay cheap. Complex reasoning tasks escalate to more capable models. The maintainer reports multi-x reductions in billed input tokens on real coding-agent runs when combining this with a prompt-catching proxy.

**Ollama and Local Model Support.** Configure any local model running through Ollama or any OpenAI-compatible server as a `generic-chat-completion-api` provider. The shim translates between Codex's Responses API and the chat completions format automatically. This is the easiest way to run Codex against local models without modifying either Codex or your local inference server.

**Native Agent Loop Preservation.** Unlike naive proxy approaches that convert everything to plain text, codex-shim preserves function calls, tool outputs, reasoning blocks, image-capable model detection, and shell-command metadata through the translation layer. This means Codex's agentic behavior — multi-step tool use, code execution, file editing — works identically through the shim as it does with native OpenAI models.

**macOS Picker Patch.** Codex Desktop uses a server-side Statsig allowlist to hide non-approved model slugs from the picker. The included ASAR patch flips this allowlist branch so the picker renders all catalog entries. This is macOS-specific and optional — the shim server itself works on any platform without patching.

**Managed Config Lifecycle.** The shim manages its own block in `~/.codex/config.toml` and backs up existing config before making changes. `codex-shim disable` removes the managed block and restores displaced keys. Repeated enable/disable cycles are idempotent — no config pollution accumulates over time.

### Use Cases

- **Multi-provider developers** who pay for both OpenAI and Anthropic subscriptions and want to switch between models in Codex Desktop without maintaining separate workflows for each tool.

- **Cost-conscious teams** that want to route cheap tasks to inexpensive models while escalating hard problems to frontier models. The Auto Router handles this automatically based on task complexity.

- **Local model enthusiasts** running Ollama or vLLM on their own hardware who want to use their local models through Codex Desktop's native interface instead of building custom tooling around raw API calls.

- **Developers in regions with API restrictions** who need to route through alternative providers or proxies while keeping Codex Desktop's full feature set intact.

- **Enterprise teams evaluating model providers** who want to A/B test different models on the same coding tasks without switching tools or maintaining parallel agent setups.

### Pros and Cons

Pros:
- Preserves Codex's full agent loop — function calls, tool outputs, reasoning blocks, streaming — through the translation layer. This is not a text-only proxy; it's a protocol translator.
- MIT licensed with a clean Python/aiohttp codebase. The test suite covers settings generation, request translation, server routing, and CLI UX.
- The Auto Router feature provides genuine cost optimization that would otherwise require a separate enterprise platform. Early user reports suggest meaningful savings on real workloads.
- Cross-platform support (macOS, Windows, Linux, WSL, Git Bash) with platform-specific handling documented clearly in the README.

Cons:
- 780 stars and a young project means the translation layer may have edge cases with specific model providers. The maintainer acknowledges this and asks for captured stream fixtures for tricky tool-call cases.
- The macOS picker patch requires repacking Electron ASAR files and re-signing, which is fragile and may break with Codex Desktop updates. The Windows Store/MSIX version has its own allowlist quirks that the patch doesn't address.
- No API key management or encryption — keys are stored in plain JSON files. This is standard for local dev tools but worth noting for security-conscious teams.
- The ChatGPT passthrough depends on having a valid `tokens.access_token`, which may expire or be revoked by OpenAI. This is a dependency on OpenAI's auth system that could break without warning.

### Getting Started

```bash
# Clone and install
git clone https://github.com/0xSero/codex-shim ~/codex-shim
cd ~/codex-shim
python3 -m pip install --user -e .

# Configure your models
mkdir -p ~/.codex-shim
cat > ~/.codex-shim/models.json << 'EOF'
{
  "models": [
    {
      "model": "gpt-5.5",
      "provider": "openai",
      "base_url": "https://api.openai.com/v1",
      "api_key": "sk-your-key-here",
      "display_name": "OpenAI GPT-5.5"
    },
    {
      "model": "claude-opus-4-7-20251109",
      "provider": "anthropic",
      "base_url": "https://api.anthropic.com/v1",
      "api_key": "sk-ant-your-key-here",
      "display_name": "Claude Opus 4.7"
    }
  ]
}
EOF

# Generate catalog and start the shim
codex-shim generate
codex-shim start

# Launch Codex Desktop with the shim wired in
codex-shim app .

# Or use the CLI directly
codex-shim codex -- "inspect this repo and summarize the architecture"

# List available models
codex-shim list

# Switch active model
codex-model claude-opus-4-7-20251109
```

### Alternatives

**LiteLLM** — A Python library and proxy server that provides a unified interface to 100+ LLM providers. LiteLLM is more mature and supports more providers, but it doesn't integrate with Codex Desktop specifically. Choose LiteLLM when you need a general-purpose model proxy for your own applications, not for wiring into Codex's native UX.

**OpenRouter** — A hosted API that routes to multiple model providers through a single OpenAI-compatible endpoint. OpenRouter handles the protocol translation server-side, so there's no local setup. But it adds a network hop and takes a margin on every request. Choose OpenRouter when you want a zero-setup multi-provider experience and don't mind the latency and cost overhead.

**aider** — An open-source AI coding assistant that runs in your terminal and supports multiple model providers natively. aider doesn't integrate with Codex Desktop but provides its own agentic coding experience with multi-model support. Choose aider when you want a standalone coding agent that's model-agnostic from the start, rather than a shim that makes an existing tool model-agnostic.

### Verdict

codex-shim fills a gap that OpenAI probably doesn't want to fill: letting developers use non-OpenAI models inside Codex Desktop. The 780 stars in two weeks suggest this is a real pain point, not a solution looking for a problem. The translation layer is technically sound — preserving tool calls, reasoning blocks, and streaming through protocol conversion is non-trivial, and the test suite covers the critical paths. If you're a Codex Desktop user who also has API keys for other providers, this is worth installing today. The Auto Router alone justifies the setup time if you're doing serious coding-agent work and care about cost. The main risk is that OpenAI could break this by changing Codex's protocol or tightening the Statsig allowlist, but that's the nature of tools that work around vendor restrictions. For now, it works, it's well-documented, and it solves a real problem.
