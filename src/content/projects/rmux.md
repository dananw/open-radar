---
name: rmux
description: "RMUX is a modern Rust terminal multiplexer with a typed SDK — drive any CLI or TUI app from code. Native on Linux, macOS, and Windows."
url: https://github.com/Helvesec/rmux
stars: 1521
forks: 67
language: Rust
tags: ["terminal", "multiplexer", "rust", "ai-agents", "sdk", "cli"]
featured: false
publishedAt: 2026-06-04
---

## RMUX

### Overview

RMUX is a modern, async Rust terminal multiplexer that does something tmux never could: let you drive terminal sessions from code with a typed SDK. It hit 1,500 GitHub stars within three weeks of its May 2026 launch, which is fast for a terminal tool in a space dominated by tmux and Zellij. The project is built by Helvesec, a security-focused tooling company, and it shows — the architecture is clean, the unsafe surface is minimal (`#![forbid(unsafe_code)]` in upper-level crates), and the web sharing feature uses post-quantum end-to-end encryption.

The core idea is simple but powerful. Traditional multiplexers are human-facing tools — you open a terminal, split some panes, maybe script a few keybindings. RMUX flips that model. It ships a public Rust SDK (`rmux-sdk`) that lets your code create sessions, send commands, wait for output, and read snapshots programmatically. It also includes `ratatui-rmux`, a Ratatui widget for embedding live terminal panes inside Rust TUI applications. If you're building AI agents that need to interact with CLI tools, developer environments that need embedded terminals, or automation pipelines that need persistent shell sessions, RMUX is the infrastructure layer you've been missing.

The project supports 90+ tmux commands out of the box and has native support for Linux, macOS, and Windows (no WSL required — it uses ConPTY on Windows). It reads tmux.conf as a migration fallback, so switching from tmux is mostly painless. The CLI is compatible enough that your muscle memory transfers, and the daemon architecture means sessions survive process restarts.

### Why it matters

The terminal multiplexer space has been static for years. tmux is 18 years old and still the default choice. Zellij brought a modern Rust rewrite with a plugin system, but it's still fundamentally a human-facing tool. Meanwhile, AI agents are increasingly running shell commands, interacting with CLI tools, and needing persistent terminal sessions — and they're doing it through fragile wrappers around tmux or raw PTY allocation.

RMUX addresses this gap directly. The typed SDK means agent frameworks can create terminal sessions, send commands, and read structured output without parsing raw terminal escape sequences. The `wait_for_text` method in the SDK is exactly what an agent needs to know when a command has finished. The snapshot API gives you a clean grid of characters and styles. This is terminal infrastructure designed for the age of AI agents, not just human operators.

The web sharing feature is also worth noting. You can expose a terminal pane through an encrypted WebSocket and interact with it from a browser. For remote development, pair programming, or debugging agent sessions, this is genuinely useful — and the post-quantum E2EE means the security model isn't an afterthought.

### Key Features

**Typed Rust SDK for Programmatic Control.** The `rmux-sdk` crate lets you create sessions, split panes, send text, and wait for output — all with async Rust types. No more parsing raw terminal bytes or shelling out to tmux commands and regex-matching the output. The SDK handles connection management, timeouts, and reconnection automatically. You add `rmux-sdk` and `tokio` to your `Cargo.toml` and you're running in five lines of code.

**Ratatui Widget for Embedded Terminals.** The `ratatui-rmux` crate provides a `PaneWidget` that renders live terminal panes inside any Ratatui TUI application. If you're building a Rust desktop app with an embedded terminal — think a developer IDE, a monitoring dashboard, or an agent control panel — you get a production-quality terminal widget without writing a PTY renderer from scratch.

**Native Windows Support via ConPTY.** Unlike tmux (which requires WSL or Cygwin on Windows) and Zellij (Linux/macOS only), RMUX runs natively on Windows using the ConPTY API. This matters for cross-platform teams and for AI agent frameworks that need to work on developer machines regardless of OS. The IPC layer uses named pipes on Windows and Unix sockets on Linux/macOS.

**Web Share with Post-Quantum E2EE.** The `rmux web-share` command exposes a terminal pane through an encrypted WebSocket accessible from any browser. The encryption uses hybrid post-quantum key exchange (not just standard TLS), and execution stays on your machine — the browser is a remote display/input, not a compute surface. You can tunnel it through localhost-run or bring your own ingress.

**tmux Configuration Migration.** RMUX imports your existing `tmux.conf` as a fallback when no RMUX config file is found. It supports static options and key unbindings, so your existing configuration mostly transfers. Set `RMUX_DISABLE_TMUX_FALLBACK=1` to opt out. This is a pragmatic design choice — they're not asking you to rewrite your config from scratch.

**Agent Orchestration Demos.** The project ships with working demos for multi-agent orchestration, agent broadcast arenas (multiple agents writing to the same session), terminal automation (like Playwright for terminals), and even a mini-Zellij built on the SDK. These aren't toy examples — the orchestration demo is 514 lines, and the broadcast demo is over 2,000 lines. They demonstrate real patterns for building agent-powered terminal workflows.

**Graphics Passthrough.** RMUX supports Kitty graphics and SIXEL passthrough for terminals that support them (Kitty, Ghostty, WezTerm, foot, mintty). This means image display inside terminal panes works for tools like `kitten icat` or SIXEL-capable viewers. It's opt-in via `set -g allow-passthrough on` in your config.

### Use Cases

- **AI agent frameworks** — Give your agents persistent terminal sessions with structured output reading. The SDK's `wait_for_text` and `snapshot` methods are purpose-built for agent-to-terminal interaction, replacing fragile tmux wrappers.
- **Developer environment tools** — Build IDEs, code editors, or dev dashboards with embedded terminal panes using the Ratatui widget. The SDK handles session lifecycle so your app focuses on UX.
- **Remote pair programming** — Share a terminal session through the browser with `rmux web-share`. The post-quantum E2EE means you can expose it over a tunnel without worrying about plaintext interception.
- **CI/CD debugging** — Attach to long-running build sessions, share them with teammates through the web interface, and keep sessions alive across disconnections.
- **Cross-platform terminal automation** — Write once, run on Linux, macOS, and Windows. The ConPTY backend means your automation scripts don't need platform-specific PTY handling.

### Pros and Cons

Pros:
- The typed SDK is the real differentiator. No other multiplexer gives you this level of programmatic control with proper async Rust types. If you're building anything that needs to interact with terminal sessions from code, this saves weeks of PTY plumbing work.
- Native Windows support through ConPTY fills a real gap. tmux on Windows has always been a pain point, and RMUX handles it cleanly without WSL dependencies.
- The security posture is serious. `#![forbid(unsafe_code)]` in upper-level crates, post-quantum E2EE for web sharing, and a minimal attack surface by design. This comes from a security company, not a weekend project.
- The tmux migration path is pragmatic. Reading tmux.conf as a fallback means you can try RMUX without committing to a full config rewrite.

Cons:
- 1,500 stars and version 0.5.0 means this is still early. Expect API changes, missing edge cases, and the occasional rough edge. Production use at this stage requires tolerance for breaking changes.
- The Rust-only SDK is a limitation for the broader agent ecosystem. Python and TypeScript SDKs would dramatically expand the user base, but they don't exist yet. You'd need FFI bindings or a wrapper service.
- The documentation is functional but not extensive. The API reference exists, but deeper guides on agent integration patterns, custom command registration, and advanced workspace management are still thin.
- tmux has 18 years of battle-testing, plugin ecosystem, and community knowledge. RMUX is architecturally superior for programmatic use, but for pure human-facing multiplexing, the ecosystem advantage is still with tmux.

### Getting Started

```bash
# Linux/macOS — portable installer
curl -fsSL https://rmux.io/install.sh | sh

# macOS — Homebrew
brew install helvesec/rmux/rmux

# Windows — PowerShell
irm https://rmux.io/install.ps1 | iex

# Any platform — Cargo
cargo install rmux --locked
```

CLI quickstart:

```bash
rmux new-session -d -s work
rmux split-window -h -t work
rmux send-keys -t work 'echo "hello from rmux"' Enter
rmux attach-session -t work
```

SDK quickstart (add to your `Cargo.toml`):

```toml
[dependencies]
rmux-sdk = "0.5"
tokio = { version = "1", features = ["rt-multi-thread", "macros"] }
```

```rust
use std::time::Duration;
use rmux_sdk::{EnsureSession, EnsureSessionPolicy, Rmux, SessionName, TerminalSizeSpec};

#[tokio::main]
async fn main() -> rmux_sdk::Result<()> {
    let rmux = Rmux::builder()
        .default_timeout(Duration::from_secs(5))
        .connect_or_start()
        .await?;

    let session = rmux
        .ensure_session(
            EnsureSession::named(SessionName::new("work")?)
                .policy(EnsureSessionPolicy::CreateOrReuse)
                .detached(true)
                .size(TerminalSizeSpec::new(120, 32)),
        )
        .await?;

    let pane = session.pane(0, 0);
    pane.send_text("echo 'agent connected'\n").await?;
    pane.wait_for_text("agent connected").await?;

    let snapshot = pane.snapshot().await?;
    println!("{}x{}", snapshot.cols, snapshot.rows);
    Ok(())
}
```

Web sharing:

```bash
rmux web-share                          # loopback only
rmux web-share -t work                  # share named session
rmux web-share --tunnel-provider localhost-run  # expose via tunnel
```

### Alternatives

**tmux** — The industry standard for 18 years. tmux is battle-tested, has an enormous plugin ecosystem, and runs everywhere. For pure human-facing terminal multiplexing, tmux is still the safe choice. RMUX is better when you need programmatic control, typed SDK access, or native Windows support without WSL. If your use case is "split some panes and keep sessions alive," tmux is fine. If your use case is "drive terminal sessions from code," RMUX is purpose-built for that.

**Zellij** — A modern Rust terminal multiplexer with a plugin system and floating panes. Zellij has a more polished human-facing UX and a growing plugin ecosystem. It's a better choice if you want a tmux replacement focused on developer experience and visual layout. RMUX is better when you need a SDK for programmatic control, web sharing, or cross-platform support including native Windows. Zellij's plugin system is for extending the multiplexer; RMUX's SDK is for embedding the multiplexer in your application.

**iTerm2 / WezTerm** — Terminal emulators with multiplexing features built in. These are great for individual developers who want multiplexing integrated with their terminal emulator. They don't solve the programmatic control problem — you can't drive iTerm2 sessions from a Rust agent the way you can with RMUX's SDK. Choose a terminal emulator when you want a better terminal experience; choose RMUX when you want terminal infrastructure for your applications.

### Verdict

RMUX is the most interesting terminal infrastructure project I've seen since tmux itself. The typed SDK approach fills a gap that's been growing wider as AI agents become mainstream — every agent framework right now is reinventing PTY management with varying degrees of fragility. RMUX gives you a proper foundation: async Rust types, session management, structured snapshots, and a web sharing layer with real encryption. The 1,500 stars in three weeks and the quality of the demo projects (the broadcast arena alone is 2,000+ lines) suggest this project has real momentum. If you're building AI agents that interact with CLI tools, or developer tools that need embedded terminals, start paying attention to RMUX now while the API is still shaping up. The Rust-only SDK is a real limitation for the Python-heavy AI ecosystem, but if that gets solved (and the architecture suggests it's designed for it), RMUX could become the default terminal layer for agent frameworks.
