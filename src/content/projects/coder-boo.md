---
name: boo
description: "A GNU screen-style terminal multiplexer built on libghostty with AI agent automation primitives — sessions that survive disconnects."
url: https://github.com/coder/boo
stars: 276
forks: 7
language: Zig
tags: ["terminal", "multiplexer", "zig", "ai-agents", "ghostty", "devtools"]
featured: false
publishedAt: 2026-06-13
---

## Boo

### Overview

Boo is a terminal multiplexer from Coder — the company behind the popular remote development environment platform — that brings GNU screen's session model into the modern era by swapping its decades-old terminal emulator for Ghostty's VT core. It launched on June 10, 2026 and picked up 276 stars in its first three days, which is fast for a Zig-based CLI tool competing in a space dominated by tmux.

The project is written in Zig and built on `libghostty-vt`, the terminal emulation library extracted from Ghostty (the terminal emulator that's been eating the dev world since late 2024). Coder is a well-funded devtools company whose core product revolves around remote development — terminals, SSH, containers. Building a multiplexer is a natural extension of that expertise, and it shows in the design.

The core problem boo solves is the gap between what modern terminal programs emit and what GNU screen's aging emulator can handle. Screen parses all output through its own built-in terminal emulator and redraws from that state on reattach. But that emulator is decades old — anything it doesn't understand gets dropped or mangled. Boo replaces that layer with libghostty-vt, so the saved state matches what your terminal would actually display. Terminal queries are answered while detached, so TUIs don't hang waiting for input that will never come.

### Why it matters

Terminal multiplexers are one of those tools every developer uses but few think about. Tmux has been the default choice for over 15 years, and GNU screen before that. Both work, but neither was designed for the era of AI agents driving interactive programs.

Boo's real innovation isn't the libghostty swap — though that alone makes redraws dramatically more faithful. It's the automation model. Every command except `attach` works without a TTY. You can create sessions, send input, read screen state, and wait for conditions — all from scripts or AI agents. The `peek` command doesn't dump raw bytes; it reconstructs the rendered screen from terminal state, including styles, cursor position, and scrollback. That means an AI agent sees exactly what a human would see.

This matters because the coding agent ecosystem is exploding. Claude Code, Codex, Cursor, and dozens of other tools need to drive terminal sessions programmatically. The current approach — wrapping tmux with fragile `-X stuff` commands and `capture-pane` — is brittle and lossy. Boo provides first-class primitives for this: `send`, `peek --json`, `wait --text`, `wait --idle`. No sleep-and-poll loops. No guessing when output has settled.

### Key Features

**libghostty-VT Terminal Emulation.** Every session's output is parsed through Ghostty's terminal emulation core, the same engine powering one of the most popular modern terminal emulators. This means SGR styles, cursor position, scrolling regions, window title, and terminal modes are all faithfully preserved. When you reattach to a detached session, the redraw is pixel-accurate — not a best-effort approximation like GNU screen.

**Agent-Friendly Automation Primitives.** `boo send` types into sessions without a TTY. `boo peek` reads the rendered screen as structured data. `boo wait --text` blocks until specific text appears. `boo wait --idle` waits for output to settle. All commands support `--json` output for machine parsing. Exit codes are well-defined: 0 for success, 3 for missing session, 4 for timeout. This is the first multiplexer designed from the ground up for AI agent workflows.

**GNU Screen Keybinding Model.** Boo follows screen's defaults — `Ctrl-A d` to detach, `Ctrl-A a` to send a literal prefix. If you've used screen, you already know boo. It deliberately avoids tmux's complexity: no windows within sessions, no panes, no status bar configuration. One session per task, with `boo ui` to juggle them.

**Full-Screen Session Manager.** `boo ui` opens a sidebar listing all sessions with keyboard navigation for switching, resizing, creating, and killing sessions. It's simple but functional — think of it as a lightweight alternative to tmux's session tree.

**Faithful Detached State.** While detached, terminal queries (DSR, DA, XTWINOPS) are answered by libghostty's stream handler. TUI programs that ask "what terminal are you?" get a real answer instead of hanging. This is a subtle but important improvement — many terminal programs block on startup waiting for query responses.

**One-Command Install.** A single curl-pipe-sh installs pre-built binaries for Linux and macOS. Zig 0.15.2 is only needed for building from source. Nix users get `nix develop` and `nix build` out of the box.

### Use Cases

- **AI agent sandboxes** — Claude Code, Codex, or custom agents that need to run commands, read output, and react to screen state without fragile tmux wrappers. Boo's `peek --json` gives agents a structured view of exactly what's on screen.
- **Remote development on SSH servers** — Long-running builds, test suites, or deployment processes that need to survive SSH disconnects. Detach with `Ctrl-A d`, reconnect later with `boo attach`.
- **CI/CD pipeline debugging** — Create detached sessions running build scripts, send commands, wait for specific output patterns, and capture screen state for error reports.
- **Multi-task server administration** — One session per service (database, API server, logs, monitoring) with `boo ui` to switch between them. Simpler than tmux splits when you don't need side-by-side views.
- **Scripted terminal interactions** — Any automation that needs to drive an interactive CLI tool — database migrations, deployment scripts, interactive prompts — without expect-style scripting.

### Pros and Cons

Pros:
- **Agent-first design is genuinely novel.** No other multiplexer has first-class `send`, `peek`, `wait` primitives that work without a TTY. This fills a real gap in the AI agent toolchain.
- **Ghostty's terminal emulator is excellent.** Drawing on libghostty-vt means faithful redraws and support for modern terminal features that GNU screen mangling.
- **Backed by a real company.** Coder has funding, engineers, and a product that depends on good terminal tooling. This isn't going to be abandoned in three months.
- **Simple mental model.** One session per task, screen-style keybindings, no configuration file to maintain. Less is more.

Cons:
- **Young project with real limitations.** No split panes, no tab sharing (`-x` equivalent), no configurable prefix key. The caveats section of the README is honest about this.
- **Zig ecosystem is small.** Contributing requires Zig 0.15.2 knowledge, which limits the contributor pool compared to Go or Rust projects.
- **Not a tmux replacement for power users.** If you rely on tmux panes, scripting with `-X`, or complex status bars, boo isn't there yet. It's a different tool with a different philosophy.

### Getting Started

```bash
# Install (Linux and macOS)
curl -fsSL https://raw.githubusercontent.com/coder/boo/main/install.sh | sh

# Create and name a session
boo new work

# Detach with Ctrl-A d, then reattach
boo attach work

# Automation loop (works without a TTY)
boo new build -d -- bash
boo send build --text 'npm test' --enter
boo wait build --idle --timeout 30s
boo peek build --scrollback --json
boo kill build

# Full-screen session manager
boo ui
```

### Alternatives

**tmux** — The standard terminal multiplexer for 15+ years. Tmux has split panes, extensive scripting with `-X stuff` and `capture-pane`, a rich plugin ecosystem, and battle-tested stability. Choose tmux if you need pane layouts, shared sessions, or deep customization. Boo is better when you want simpler session management and first-class automation primitives for AI agents.

**GNU screen** — Boo's spiritual ancestor. Screen uses the same session model (one task per session, `Ctrl-A` prefix), but its terminal emulator is ancient. Programs using modern escape sequences often render incorrectly on reattach. Boo is what screen would be if it were rewritten today — same philosophy, modern internals.

**Zellij** — A Rust-based terminal multiplexer with a layout system, plugin architecture, and floating panes. Zellij targets developers who want a more visual, IDE-like terminal experience. It's the opposite of boo's minimalist approach. Choose Zellij if you want a rich TUI; choose boo if you want sessions and automation without the complexity.

### Verdict

Boo is the most interesting terminal tool I've seen since Ghostty itself. It's not trying to be tmux — it's trying to be the multiplexer that AI agents actually need. The `peek --json` and `wait --text` primitives alone justify its existence in a world where every coding assistant needs to drive terminal sessions. The libghostty-vt foundation means redraws work properly, which is table stakes that GNU screen has been failing at for years.

The limitations are real and worth noting: no splits, no shared sessions, no configurable prefix. But Coder is a real company with real engineers, and the project is three days old. The core architecture is right. If you're building AI agent tooling or just want a cleaner screen experience, boo is worth trying now. If you're a tmux power user with 47 custom keybindings and a status bar that shows the weather, wait six months.
