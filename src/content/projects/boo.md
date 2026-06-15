---
name: boo
description: "Boo is a GNU screen-style terminal multiplexer built on libghostty with agent-friendly automation primitives — ideal for developers and AI coding agents."
url: https://github.com/coder/boo
stars: 502
forks: 13
language: Zig
tags: ["terminal", "developer-tools", "ghostty", "ai-agents", "zig"]
featured: false
publishedAt: 2026-06-15
---

## Boo

### Overview

Boo launched on June 10, 2026, from Coder — the company behind the popular remote development environment platform. Within days it crossed 500 stars, which is notable for a terminal multiplexer in a market that already has tmux and GNU screen. The reason for the fast adoption is clear once you read the README: this isn't just another terminal multiplexer. It's a terminal multiplexer designed for the age of AI coding agents.

The project is built on libghostty-vt, the terminal emulation core extracted from Mitchell Hashimoto's Ghostty terminal emulator. Ghostty itself has become one of the most popular terminal emulators in recent years, praised for its speed and correctness. Boo takes that same VT parsing engine and uses it as the backbone for session management. Every byte of output from every session is parsed through Ghostty's terminal emulator, meaning boo always knows the exact screen state — contents, styles, cursor position, scrollback, and terminal modes.

Written in Zig, boo follows the GNU screen model: one session per task, a familiar `Ctrl-A` prefix key, and detach/reattach semantics that work over Unix sockets. But the real innovation is in its automation primitives. Commands like `send`, `peek`, `wait`, and `--json` output are designed to work without a TTY, making boo a natural sandbox for scripts and AI agents that need to drive interactive programs. This is where the project diverges from everything else in the terminal multiplexer space.

### Why it matters

Terminal multiplexers haven't changed much in decades. GNU screen was released in 1987. Tmux arrived in 2007 as a cleaner alternative. Both solve the same core problem: keep sessions alive across disconnects. But the world has changed. AI coding agents — Claude Code, Codex, Cursor, Copilot — now spend significant time running commands in terminals, reading output, and deciding what to do next. They need to interact with terminal sessions programmatically, and the existing tools make this painful.

Tmux's scripting interface (`tmux send-keys`, `tmux capture-pane`) works, but it's a collection of ad-hoc commands bolted onto a tool designed for humans. The output is raw bytes, not parsed screen state. You get the scrollback buffer as text, but not the structured representation of what's actually on screen. For an AI agent that needs to understand "is the build done?" or "did the test pass?", this means parsing raw terminal output with regex — fragile and error-prone.

Boo takes a fundamentally different approach. Because every session's output is parsed through a real terminal emulator (libghostty-vt), `boo peek --json` returns structured data: the rendered screen contents, cursor position, window title, and terminal dimensions. `boo wait --text "passed"` blocks until that string appears on the rendered screen, not in the raw output stream. `boo wait --idle` waits until output has been quiet for 2 seconds. This is what AI agents actually need — semantic access to terminal state, not byte-level output parsing.

### Key Features

**libghostty Terminal Emulation.** Every session's output runs through Ghostty's VT core, the same engine powering one of the fastest terminal emulators available. This means boo handles modern terminal sequences correctly — SGR styles, scrolling regions, window title changes, cursor positioning, and terminal queries. When you reattach to a session, the screen is redrawn from parsed state, not from a raw byte log. TUI applications like htop, vim, and lazygit render correctly on reattach.

**Agent-Friendly Automation.** This is the headline feature. `boo send --text 'make' --enter` types into a detached session. `boo peek --scrollback` reads the rendered screen. `boo wait --text "Build complete"` blocks until that text appears. `boo wait --idle` waits for output to settle. All of these work without a TTY — you can drive boo from a script, a cron job, or an AI agent's tool-use loop. The `--json` flag on `ls` and `peek` gives machine-readable output with structured screen state.

**GNU Screen Compatibility.** If you've used GNU screen, you already know boo. Same `Ctrl-A` prefix key. Same `d` to detach. Same session model — one task per session, no splits or tabs inside a session. The learning curve is near zero. `boo new`, `boo attach`, `boo ls`, `boo kill` — the commands are intuitive and follow screen's conventions.

**Full-Screen Session Manager.** `boo ui` opens a full-screen TUI for managing sessions, with a sidebar listing all active sessions. Switch between them, resize the sidebar, create new sessions, and kill existing ones — all from a keyboard-driven interface. This is the modern alternative to screen's bare-bones session listing.

**Proper Exit Codes.** Boo uses meaningful exit codes: 0 for success, 1 for errors, 2 for usage errors, 3 for no such session, and 4 for wait timeouts. This matters enormously for scripting and agent integration. Instead of parsing stderr output to figure out what went wrong, your automation can check the exit code directly.

**Lightweight Architecture.** Each session is a forked daemon process that owns a PTY and a libghostty terminal state. The client communicates over a Unix socket with a framed protocol. No central server, no configuration files, no databases. Create a session, it runs. Detach, it keeps running. Reattach, it redraws from state. The architecture is simple enough to understand in five minutes.

**Nix and Cross-Platform Support.** Boo ships with Nix flake support (`nix develop`, `nix build`) and pre-built binaries for Linux and macOS on the releases page. The install script handles everything: `curl -fsSL https://raw.githubusercontent.com/coder/boo/main/install.sh | sh`. Build from source requires Zig 0.15.2, and the libghostty dependency is fetched automatically.

### Use Cases

- **AI coding agent orchestration** — Run Claude Code or Codex inside a boo session, then use `peek` and `wait` to monitor progress without interfering. The agent can read the screen state programmatically and make decisions based on what's actually rendered.

- **Remote development workflows** — SSH into a remote machine, start a boo session running your dev server, disconnect, and reattach later. The terminal state is preserved exactly as you left it, including TUI applications.

- **CI/CD pipeline debugging** — Run long-running build or test processes in detached boo sessions. Use `wait --text "PASSED"` or `wait --text "FAILED"` in your pipeline scripts to block until completion without polling.

- **Multi-project development** — Keep separate boo sessions for your frontend (React dev server), backend (NestJS or Django), database, and logs. Switch between them with `boo ui` or `boo attach`.

- **Scripting interactive programs** — Drive interactive CLI tools that expect TTY input. Send commands with `boo send`, read output with `boo peek`, and wait for prompts with `boo wait`. No need to figure out expect or pty libraries.

### Pros and Cons

Pros:

- **Built on proven technology.** Ghostty's terminal emulation is battle-tested across millions of sessions. Boo inherits that correctness rather than building a terminal emulator from scratch. TUI apps just work.

- **Purpose-built for automation.** Unlike tmux's bolted-on scripting, boo's `send`/`peek`/`wait` primitives were designed from day one for programmatic access. The `--json` output, meaningful exit codes, and TTY-free operation reflect real understanding of how agents and scripts interact with terminals.

- **Zero learning curve for screen users.** If you know GNU screen, you know boo. The command names, key bindings, and session model are familiar. Migration is trivial.

- **Backed by Coder.** This isn't a solo weekend project. Coder is a funded company with a track record in developer tooling. The project is MIT-licensed and actively maintained.

Cons:

- **Young project with real limitations.** One attached client per session (no shared sessions like tmux's `-x`). One window per session (no splits). The `Ctrl-A` prefix isn't configurable yet. Pasted bytes containing `0x01` are interpreted as the prefix key. These are documented and expected to improve.

- **Zig dependency for building from source.** If you want to contribute or build from source, you need Zig 0.15.2. It's not a mainstream language yet, which may limit the contributor pool.

- **No Windows support.** Boo is Linux and macOS only. If your workflow includes Windows, you're out of luck.

### Getting Started

```sh
# Install boo
curl -fsSL https://raw.githubusercontent.com/coder/boo/main/install.sh | sh

# Create a new named session
boo new myproject

# Detach with Ctrl-A d, then reattach later
boo attach myproject

# List all sessions
boo ls

# Full-screen session manager
boo ui

# Automation examples (work without a TTY)
boo new build -d -- bash          # detached session running bash
boo send build --text 'make' --enter   # send a command
boo wait build --idle              # wait for output to settle
boo peek build --scrollback        # read the screen
boo peek build --json              # structured output for scripts
boo kill build                     # clean up
```

### Alternatives

**tmux** — The de facto standard terminal multiplexer for over 15 years. Tmux is mature, feature-rich, and has a massive ecosystem of plugins and integrations. It supports splits, tabs, and shared sessions (`tmux attach -t session -x`). If you need pane splits inside a session or rely on tmux-specific plugins, stick with tmux. But tmux's scripting interface (`send-keys`, `capture-pane`) operates on raw bytes, not parsed screen state, which makes agent integration fragile.

**GNU screen** — The original. Screen has been around since 1987 and is installed on virtually every Unix system by default. It's the model boo is based on. If you need maximum portability and don't care about modern terminal sequences or agent-friendly automation, screen still works. But its terminal emulator is decades behind modern standards, and TUI apps often render incorrectly on reattach.

**Zellij** — A newer terminal multiplexer written in Rust with a focus on layout management and plugin extensibility. Zellij has a modern API, WASM-based plugins, and built-in floating panes. It's a good choice if you want a batteries-included multiplexer with a rich UI. But its architecture is heavier than boo's, and it doesn't have the same focus on agent-friendly automation primitives.

### Verdict

Boo is the first terminal multiplexer that takes AI agent integration seriously, and that alone makes it worth watching. The decision to build on libghostty-vt was smart — instead of writing yet another terminal emulator, Coder stood on the shoulders of one of the best modern implementations. The result is a tool that handles the basics (detach/reattach, session management) with modern correctness, while adding automation primitives that feel native rather than retrofitted.

Is it ready to replace tmux for daily use? Not yet. The one-client-per-session limitation and lack of splits mean it's better suited as a focused automation tool than a general-purpose multiplexer. But for the specific use case of driving terminal sessions from scripts and AI agents — which is increasingly the dominant pattern in modern development workflows — boo is already ahead of anything else available. If you're building agent workflows or running CI tasks that need to interact with terminal sessions, install boo today. For everything else, give it six months.
