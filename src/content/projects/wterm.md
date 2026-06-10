---
name: wterm
description: "Wterm is a web-based terminal emulator from Vercel Labs with a Zig+WASM core, DOM rendering, and React/Vue components for near-native performance."
url: https://github.com/vercel-labs/wterm
stars: 3219
forks: 140
language: TypeScript
tags: ["terminal", "wasm", "zig", "react", "web-components"]
featured: false
publishedAt: 2026-06-10
---

## Wterm

### Overview

Wterm is a terminal emulator that renders to the DOM instead of a canvas. That single design decision changes everything about how a web terminal works — native text selection, clipboard integration, browser find-in-page, and screen reader accessibility come built-in without any extra code. Created by Vercel Labs and released in April 2026, the project has already accumulated over 3,200 GitHub stars in under two months.

The core escape sequence parser is written in Zig and compiled to WebAssembly, producing a ~12 KB binary that handles VT100, VT220, and xterm escape sequences at near-native speed. For applications that need full VT compliance, there's an optional libghostty backend at ~400 KB. The architecture is modular — you pick the pieces you need. A vanilla JS DOM renderer, a React component with a `useTerminal` hook, a Vue 3 component, or just the headless WASM core for custom rendering pipelines.

The problem wterm solves is real. Every existing web terminal emulator either renders to a canvas (losing native text selection and accessibility), or uses a DOM approach with heavy JavaScript that struggles with throughput. Xterm.js, the dominant library in this space, uses a canvas renderer and has accumulated significant complexity over the years. Wterm takes a fundamentally different approach by offloading the parsing to compiled Zig and keeping the rendering layer thin and framework-agnostic.

### Why it matters

Web-based terminals are everywhere — cloud IDEs, DevOps dashboards, CI/CD interfaces, database admin panels, SSH clients. GitHub Codespaces, Gitpod, StackBlitz, and Replit all embed terminal emulators in their products. The market is massive, and the tooling hasn't kept up with modern web platform capabilities.

Wterm's DOM-first approach is significant because it aligns with how browsers are actually optimized. Modern browsers are extraordinarily good at DOM diffing and layout. By rendering terminal rows as actual DOM elements with dirty-row tracking (only touched rows re-render each frame via `requestAnimationFrame`), wterm leverages years of browser rendering optimization instead of fighting against it with a canvas abstraction layer.

The Zig + WASM story matters too. Zig compiles to remarkably small, fast WebAssembly binaries. At 12 KB for the core parser, wterm's WASM payload is smaller than most JavaScript libraries. This isn't just a performance optimization — it's a distribution advantage. The terminal loads fast, runs on any modern browser, and doesn't require any native dependencies. For fullstack developers building internal tools, admin panels, or developer platforms, that's a compelling combination.

### Key Features

**Pluggable Architecture.** Wterm ships two WASM cores: a lightweight Zig parser at ~12 KB for basic VT100/VT220/xterm support, and an optional libghostty backend at ~400 KB for full VT compliance. You choose the core that matches your needs. If you're building a simple log viewer, the lightweight core is more than sufficient. If you need to support vim, tmux, or complex TUI applications, the libghostty backend handles everything.

**DOM Rendering with Dirty-Row Tracking.** Instead of painting pixels to a canvas, wterm renders each terminal row as a DOM element. Only rows that have changed since the last frame get re-rendered, tracked via `requestAnimationFrame`. This means the browser handles text selection, copy/paste, find-in-page, and accessibility natively. No custom selection overlays, no clipboard interception code, no ARIA attribute juggling.

**Framework Components.** The package ecosystem includes `@wterm/react` with a `useTerminal` hook and TypeScript component, `@wterm/vue` for Vue 3 with template ref API, and `@wterm/dom` for vanilla JavaScript. Each component wraps the same headless WASM core, so you get consistent behavior across frameworks. The React integration is particularly clean — mount the component, connect a WebSocket, and you have a working terminal.

**WebSocket Transport with Binary Framing.** The `@wterm/core` package includes a WebSocket transport layer with binary framing and automatic reconnection. Connect to any PTY backend — SSH servers, Docker containers, cloud development environments. The protocol is efficient enough for high-throughput scenarios like streaming build logs or running interactive TUI applications.

**Built-in Markdown Rendering.** The `@wterm/markdown` package can render Markdown directly inside the terminal. This is useful for AI agent interfaces, documentation viewers, or any application where terminal output includes formatted text. It's a small detail, but it shows the project is thinking about modern use cases beyond traditional terminal emulation.

**Theme System with CSS Custom Properties.** Themes are implemented as CSS custom properties, which means you can override them with standard CSS. Ships with Default, Solarized Dark, Monokai, and Light themes out of the box. Because the terminal renders to the DOM, theme changes are instant — no canvas redraw required.

**Alternate Screen Buffer and Scrollback.** Full support for the alternate screen buffer means applications like vim, less, and htop work correctly. The scrollback history uses a configurable ring buffer, so you can control memory usage based on your application's needs.

### Use Cases

- **Cloud IDEs and development environments** — Embed a full terminal in browser-based IDEs like CodeSandbox, StackBlitz, or custom platforms. The DOM rendering means developers get native text selection and find-in-page without extra work.
- **DevOps dashboards and monitoring tools** — Display live logs, build output, and deployment status in internal dashboards. The dirty-row tracking keeps rendering efficient even with high-throughput log streams.
- **Database and API admin panels** — Add interactive terminal access to admin interfaces for Redis, PostgreSQL, or custom APIs. The React component integrates cleanly with existing admin UI frameworks.
- **AI agent interfaces** — The Markdown rendering package and clean component API make wterm a good fit for building conversational AI interfaces that mix terminal output with formatted text.
- **SSH and remote access web clients** — Build browser-based SSH clients with native accessibility and text selection. The WebSocket transport connects directly to SSH backends.

### Pros and Cons

Pros:
- DOM rendering provides native text selection, clipboard, find-in-page, and screen reader support for free — features that canvas-based terminals either lack or implement imperfectly.
- The Zig + WASM core at 12 KB is remarkably small and fast. Load times are negligible, and the parsing performance approaches native speed.
- Framework-agnostic package architecture means the same core works across React, Vue, and vanilla JS projects without duplication.
- Apache-2.0 license from Vercel Labs gives confidence in both the code quality and the licensing story for commercial use.

Cons:
- The project is two months old. API stability is uncertain, and the package ecosystem is still maturing. Production adoption today carries migration risk.
- DOM rendering has inherent limits for extremely high-throughput scenarios (thousands of lines per second) where canvas rendering may still have an edge, though the dirty-row tracking mitigates this significantly.
- The libghostty backend at 400 KB is substantially larger than the core. Applications that need full VT compliance pay a significant payload cost compared to the lightweight core.

### Getting Started

```bash
# Install the React component
pnpm add @wterm/react @wterm/core

# Or install the vanilla DOM renderer
pnpm add @wterm/dom @wterm/core
```

For a React project:

```tsx
import { Terminal } from '@wterm/react';

function App() {
  return (
    <Terminal
      onReady={(terminal) => {
        // Connect to your PTY backend
        const ws = new WebSocket('wss://your-pty-server.com');
        ws.onmessage = (e) => terminal.write(e.data);
        terminal.onData((data) => ws.send(data));
      }}
    />
  );
}
```

For the WASM core in vanilla JS:

```js
import { TerminalCore } from '@wterm/core';
import { createDOMRenderer } from '@wterm/dom';

const core = new TerminalCore();
const renderer = createDOMRenderer(document.getElementById('terminal'), core);
core.write('\x1b[32mHello from wterm!\x1b[0m\r\n');
```

### Alternatives

**Xterm.js** — The established standard for web terminals, used by VS Code, Hyper, and most cloud IDEs. Xterm.js renders to a canvas, which gives it an edge in raw throughput for extreme cases but loses native text selection and accessibility. It's more mature and battle-tested, with a larger ecosystem of addons. Choose Xterm.js if you need production stability today and can work around the canvas limitations.

**Zellij** — A terminal workspace multiplexer written in Rust with a web frontend. Zellij is more opinionated — it's a full multiplexer, not a drop-in component. It's a better fit if you're building a terminal workspace product, but overkill if you just need to embed a terminal in a web application.

**Terminal.css** — A CSS-only approach to styling terminal-like interfaces. Not a real terminal emulator, but useful if you just need the visual aesthetic of a terminal for documentation or demo pages. Choose this if you don't actually need terminal functionality.

### Verdict

Wterm is the most interesting web terminal project I've seen since Xterm.js first gained traction. The DOM-first architecture is the right call for most web applications — native text selection and accessibility alone justify the approach. The Zig + WASM core at 12 KB is genuinely impressive engineering, and the framework-agnostic package structure shows mature thinking about how developers actually build web apps. It's too early to recommend for mission-critical production use, but if you're building a developer tool, internal dashboard, or any web application that needs terminal functionality in mid-2026, wterm deserves serious evaluation. The 3,200 stars in two months from Vercel Labs suggest this project has legs.
