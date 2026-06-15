---
name: cua
description: "Cua is open-source infrastructure for building computer-use agents — sandboxes, SDKs, and benchmarks that let AI control desktops across macOS, Linux, Windows, and Android."
url: https://github.com/trycua/cua
stars: 18064
forks: 1169
language: Python
tags: ["ai-agents", "computer-use", "sandbox", "automation", "open-source"]
featured: false
publishedAt: 2026-06-16
---

## Cua

### Overview

Cua (pronounced "koo-ah") is an open-source platform for building, benchmarking, and deploying AI agents that use computers. Not browser automation — actual desktop control. The agent sees the screen, moves the mouse, types on the keyboard, and completes tasks across macOS, Linux, Windows, and Android. With 18,000+ GitHub stars and backing from Y Combinator's X25 batch, it's become the reference infrastructure layer for computer-use agents in 2026.

The project is maintained by trycua, a team that shipped the first version in early 2025 and has been iterating aggressively since. Their approach is modular: you get sandboxes for running agents in isolated VMs, a Python SDK for controlling those sandboxes, Cua Drivers for background desktop automation, and Cua-Bench for evaluating agent performance against standardized benchmarks. Each piece works independently, but they compose into a full agent development stack.

The core problem Cua solves is the gap between "AI can generate code" and "AI can actually use a computer." Most developers building agent workflows today are stuck with browser-only automation (Playwright, Puppeteer) or fragile screen-scraping scripts. Cua gives agents the same tools a human has — a real desktop, a real mouse, a real keyboard — in a sandboxed environment that won't wreck your production machine. The Python API is clean enough that you can spin up a sandbox and start clicking in under ten lines of code.

### Why it matters

Computer-use agents are the next frontier after coding assistants. GitHub Copilot, Cursor, and Claude Code handle text — writing code, editing files, running terminal commands. But a huge class of tasks requires interacting with GUIs: testing a web app's UI flows, automating desktop software that has no API, filling out forms in legacy enterprise systems, or running QA scenarios that can't be expressed as unit tests. Cua provides the infrastructure to make those agents practical.

The timing is significant. Anthropic released Computer Use in late 2024, OpenAI followed with Operator in early 2025, and Google shipped Project Mariner. Every major AI lab is investing in agents that can see and interact with screens. But the tooling for developers to build and evaluate these agents has lagged behind the model capabilities. Cua fills that gap with an open-source, vendor-neutral platform that works with any model provider — OpenAI, Anthropic, local models, whatever you want to plug in.

For fullstack developers, the practical angle is testing and automation. Imagine an agent that can navigate your React app, click through checkout flows, fill out forms, and verify that the right elements appear — without you writing a single selector or maintaining brittle test scripts. Or an agent that can interact with your company's internal admin panel (the one with no API) to pull reports or update records. Cua makes those scenarios buildable today.

### Key Features

**Unified Sandbox API Across All Operating Systems.** The Python SDK provides a single `Sandbox` class that works identically whether you're spinning up a Linux container, a macOS VM, a Windows instance, or even an Android emulator. You call `Sandbox.ephemeral(Image.linux())` or `Image.macos()` and get the same interface — screenshots, mouse clicks, keyboard input, shell commands. This means you can write agent logic once and test it across platforms without rewriting anything. The cloud option (cua.ai) handles the infrastructure; the local option uses QEMU.

**Background Desktop Automation with Cua Drivers.** This is the feature that separates Cua from browser automation tools. Cua Drivers let agents control native desktop applications in the background — the agent clicks and types without stealing your cursor or window focus. It works on macOS and Windows (Linux is pre-release), and integrates directly with Claude Code, Cursor, Codex, and OpenClaw as an MCP server. One `claude mcp add` command and your coding agent can drive any desktop app.

**Standardized Benchmarking with Cua-Bench.** If you're training or fine-tuning a computer-use model, you need to measure how well it performs. Cua-Bench provides standardized evaluation against OSWorld, ScreenSpot, Windows Arena, and custom task sets. You can run benchmarks in parallel, export agent trajectories for training data, and compare results across model versions. The benchmark registry at cuabench.ai lets the community share and discover evaluation tasks.

**Lume — macOS Virtualization on Apple Silicon.** Cua includes Lume, a macOS/Linux VM manager built on Apple's Virtualization.Framework. It gives you near-native performance on Apple Silicon Macs, which matters because macOS sandboxes are the hardest to get right (no Docker, no easy containerization). Lume pulls pre-built macOS images and runs them with full GUI support, making it possible to build and test macOS-targeting agents on any Apple Silicon machine.

**MCP Server Integration for Existing Agent Workflows.** Rather than requiring you to adopt Cua's full stack, the Cua Driver plugs into existing agent tools via the Model Context Protocol. Add it to Claude Code as an MCP server and your coding agent gains the ability to interact with desktop GUIs alongside its existing file and terminal capabilities. This incremental adoption path means you don't have to rewrite your agent architecture — just add desktop control as another tool.

**Docker-Compatible Interface via Lumier.** For teams already using Docker in their CI/CD pipelines, Lumier wraps Lume VMs behind a Docker-compatible API. This lets you treat macOS and Windows VMs like containers — pull images, run them, exec into them, stop them — using familiar tooling. It's a pragmatic bridge between the container world and the VM world that computer-use agents require.

**Agent Trajectory Export for Training.** Every action an agent takes in a Cua sandbox — every screenshot, click, keystroke, and resulting state change — can be recorded and exported as a trajectory. These trajectories are the training data for fine-tuning computer-use models. The export format is structured JSON that plugs directly into reinforcement learning pipelines, making Cua not just an inference platform but a training data generation tool.

### Use Cases

- **UI testing and QA automation** — Fullstack developers building React or Vue apps can deploy agents that navigate the UI, fill forms, click buttons, and verify visual states without maintaining Playwright selectors that break every sprint.
- **Legacy system automation** — Enterprise developers stuck with desktop-only software (SAP, Oracle, internal tools with no API) can build agents that interact with those GUIs to extract data or perform routine operations.
- **Desktop app development** — Developers building native macOS or Windows apps can use Cua sandboxes to run automated UI tests across different OS versions without maintaining physical test machines.
- **Agent model training and evaluation** — ML engineers working on vision-language models can use Cua-Bench to evaluate their models' computer-use capabilities and export trajectories for fine-tuning.
- **RPA (Robotic Process Automation)** — Operations teams can replace expensive commercial RPA tools (UiPath, Automation Anywhere) with open-source Cua agents that run the same workflows at zero licensing cost.

### Pros and Cons

Pros:

- Truly cross-platform sandbox support — Linux, macOS, Windows, and Android from a single Python API — which no other open-source tool offers at this level of integration.
- YC-backed with 18,000+ stars and active development, meaning the project has funding, community momentum, and a real shot at long-term sustainability.
- MCP server integration means you can add desktop control to existing Claude Code or Cursor workflows without adopting an entirely new framework.
- MIT licensed with a modular architecture — use just the sandbox, just the benchmarks, just the driver, or the full stack depending on your needs.
- Benchmarking infrastructure (Cua-Bench) with trajectory export creates a feedback loop between evaluation and training that benefits the entire computer-use agent ecosystem.

Cons:

- macOS and Windows sandboxes require either the cua.ai cloud service or local VM infrastructure (QEMU/Lume), which adds complexity compared to simple Docker-based solutions for Linux-only use cases.
- The Python SDK requires Python 3.11+, which may conflict with some project environments that are still on older versions.
- Cloud pricing for cua.ai isn't transparently listed on the site — you need to sign up to understand costs, which makes it hard to evaluate for budget-conscious teams.
- Computer-use agents are inherently slower and more expensive than API-based automation. If your task has an API, using the API will always be faster and more reliable than pixel-clicking.
- Early-stage documentation — while the SDK reference exists, the guides and examples are still catching up with the feature set. You'll likely hit the Discord for help on anything non-trivial.

### Getting Started

Install the Python SDK and spin up your first sandbox:

```bash
# Install Cua (requires Python 3.11+)
pip install cua

# For background desktop automation (macOS/Linux)
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/trycua/cua/main/libs/cua-driver/scripts/install.sh)"

# Add as MCP server to Claude Code
claude mcp add --transport stdio cua-driver -- cua-driver mcp
```

Build a simple agent that takes a screenshot and clicks:

```python
from cua import Sandbox, Image

async with Sandbox.ephemeral(Image.linux()) as sb:
    # Run a command
    result = await sb.shell.run("echo hello from Cua")
    
    # Take a screenshot
    screenshot = await sb.screenshot()
    
    # Interact with the desktop
    await sb.mouse.click(100, 200)
    await sb.keyboard.type("Hello from Cua!")
```

For benchmarking, clone the repo and run against standard datasets:

```bash
git clone https://github.com/trycua/cua && cd cua/cua-bench
uv tool install -e . && cb image create linux-docker
cb run dataset datasets/cua-bench-basic --agent cua-agent --max-parallel 4
```

### Alternatives

**Anthropic Computer Use** — Anthropic's built-in computer-use capability in Claude is the most direct competitor for inference-time desktop control. It's model-tied (Claude only), doesn't provide sandboxing infrastructure, and has no benchmarking layer. Choose Anthropic's native tool if you're already all-in on Claude and want the simplest possible integration. Choose Cua if you want model flexibility, local execution, or evaluation capabilities.

**Playwright / Puppeteer** — Browser automation frameworks that handle web-based tasks extremely well with deterministic selectors and network interception. They're faster and more reliable for anything that lives in a browser. Choose Playwright for web testing and scraping. Choose Cua when you need to interact with native desktop applications, mobile apps, or browser scenarios that require visual understanding rather than DOM access.

**OpenAdp / Open Interpreter** — Open-source tools for general-purpose AI agent execution that can run code and interact with systems. They focus on code execution and terminal control rather than visual desktop interaction. Choose them for agent workflows that can be expressed as scripts or terminal commands. Choose Cua when the target application has a GUI and no programmatic API.

### Verdict

Cua is the most complete open-source infrastructure for computer-use agents available right now, and it's not particularly close. The combination of cross-platform sandboxes, background desktop automation, standardized benchmarking, and MCP integration covers the full lifecycle from development to evaluation to production deployment. At 18,000+ stars with YC backing, it has the community momentum and funding to keep improving. The main tradeoff is complexity — if you just need to automate a web form, Playwright is simpler and faster. But if you're building agents that need to interact with real desktops across operating systems, Cua is the infrastructure you should start with. The modular design means you can adopt just the pieces you need (sandbox only, driver only, benchmarks only) without committing to the full stack. For fullstack developers exploring AI agent workflows in 2026, this is the project to have on your radar.
