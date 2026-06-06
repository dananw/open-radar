---
name: zero-native
description: "Vercel Labs' zero-native builds native desktop and mobile apps with Zig and web UI — tiny binaries, instant rebuilds, and your existing React or Next.js skills."
url: https://github.com/vercel-labs/zero-native
stars: 4113
forks: 171
language: Zig
tags: ["desktop-apps", "zig", "web-ui", "native", "vercel"]
featured: false
publishedAt: 2026-06-07
---

## Zero Native

### Overview

Zero Native is a Zig-based desktop app shell for modern web frontends, built by Vercel Labs. It launched in early May 2026 and crossed 4,000 GitHub stars within its first month — a signal that developers are hungry for something between Electron's bloat and the complexity of going fully native.

The project comes from Vercel Labs, the same team behind Next.js, Turbo, and the Vercel deployment platform. That's important context. Vercel has spent years making the web development experience smoother, and zero-native is their answer to a question that keeps coming up: what happens when your web app needs to be a desktop app? Rather than forcing developers to learn Swift, Kotlin, or C++, zero-native lets you keep your React, Next.js, Svelte, or Vue frontend and wrap it in a native shell that compiles to tiny, fast binaries.

The core problem zero-native solves is the gap between web apps and native apps. Electron solved this a decade ago, but at the cost of bundling an entire Chromium runtime — a hello world Electron app is 150MB+. Tauri improved on that with Rust and system WebViews, but the Rust toolchain can be intimidating for web developers. Zero Native takes a different angle: use Zig for the native layer (fast compilation, direct C interop, no garbage collector), let developers choose between system WebView for minimal footprint or bundled Chromium for rendering consistency, and keep the entire frontend workflow unchanged.

### Why it matters

The desktop app space has been quietly consolidating around two options: Electron (heavy, reliable, huge ecosystem) and Tauri (lighter, Rust-based, growing fast). Zero Native introduces a third path that specifically targets web developers who want native performance without leaving their toolchain.

What makes this interesting isn't just the technology — it's the strategic positioning. Vercel has enormous influence over how web developers build. If zero-native becomes the recommended way to ship desktop apps from the Vercel ecosystem, it could shift the market the same way Next.js shifted how people think about React deployment. The project supports React, Next.js, Svelte, and Vue out of the box with starter templates, and the `zero-native init` command scaffolds a working desktop app in seconds.

The Zig choice is deliberate and smart. Zig compiles fast, produces small binaries, and calls C directly — which means platform SDKs, native libraries, codecs, and system integrations are all accessible without wrapper layers. For web developers who've been burned by Electron's memory usage or who find Rust's borrow checker frustrating, Zig offers a middle ground that's both performant and approachable.

### Key Features

**System WebView or Bundled Chromium.** Zero-native gives you a real choice: use the platform's native WebView (WKWebView on macOS, WebKitGTK on Linux) for the smallest possible binary, or bundle Chromium through CEF when rendering consistency across platforms matters. This isn't an either/or lock-in — you can configure it per-project in the `app.zon` manifest. System WebView apps can be under 5MB. Chromium-bundled apps are larger but guarantee pixel-identical rendering.

**Zig Native Layer with Instant Rebuilds.** The native shell is written in Zig, which means app logic, bridge commands, and platform integrations rebuild in seconds, not minutes. If you've ever waited for a Rust/Tauri rebuild during development, this is a noticeable improvement. Zig's compilation speed is one of its core selling points, and zero-native takes full advantage of it.

**JavaScript-to-Zig Bridge.** The `window.zero.invoke()` API lets your web frontend call native Zig functions directly. Calls are size-limited, origin-checked, permission-checked, and routed only to registered handlers. This is how your React app talks to the file system, system tray, notifications, or any other native capability. The bridge is explicit — you declare what the web layer can access, and everything else is blocked by default.

**Framework-Agnostic Frontend Support.** The project ships starter examples for Next.js, React, Svelte, and Vue. Your frontend code doesn't change. You keep your existing build tooling, state management, and component library. The native shell is transparent to your web code — it just provides the window, the bridge, and the platform integrations.

**Mobile Embedding via C ABI.** Beyond desktop, zero-native exports a C ABI through `libzero-native.a` that iOS and Android host apps can link. This means you can embed your web UI in a native mobile app shell. The examples directory includes iOS and Android integration examples. It's early days for mobile, but the architecture supports it.

**Explicit Security Model.** The WebView is treated as untrusted by default. Navigation is restricted to declared allowed origins. Bridge permissions are opt-in. External link handling is policy-controlled. This is a significant improvement over Electron's default security posture, where the renderer process has more access than it should. The `app.zon` manifest makes the security configuration declarative and reviewable.

**App Manifest with `app.zon`.** Project configuration lives in a single Zig object literal file. It declares app metadata, icons, windows, frontend asset paths, web engine selection, security policy, bridge permissions, and packaging inputs. It's readable, version-controllable, and doesn't require learning a new config format — it's just Zig syntax.

### Use Cases

- **Internal tools and dashboards** — Teams that have web-based admin panels or data dashboards can ship them as desktop apps with system tray integration, offline access, and native notifications without rewriting anything.
- **Creative and productivity apps** — Applications like design tools, note-taking apps, or project management software that need native window management, file system access, and cross-platform consistency while leveraging a web-based UI.
- **Developer tools** — CLI companions, API explorers, database clients, and other dev tools where the UI is a web frontend but the functionality needs native system access like process spawning, file watching, and port binding.
- **Prototyping native app ideas** — Web developers who want to test a desktop app concept without investing in a full native stack. Zero-native lets you validate the idea with your existing skills before committing to platform-specific development.

### Pros and Cons

Pros:

- Dramatically smaller binaries than Electron. System WebView apps can be under 5MB versus 150MB+ for a basic Electron app. Even Chromium-bundled builds are smaller because the Zig shell itself adds minimal overhead.
- The Zig toolchain compiles fast and produces optimized binaries without a garbage collector. Development iteration speed is closer to web development than typical native development.
- Vercel Labs backing means strong documentation, active maintenance, and likely integration with the broader Vercel ecosystem over time. The team has a track record of maintaining open source projects long-term.
- Security-first design with the WebView treated as untrusted by default. Permission declarations in the manifest are explicit and auditable.

Cons:

- Pre-release status means the API is unstable. Desktop support covers macOS 11+ and Linux, with Windows build paths existing but less tested. Production use today is risky.
- Zig is still a niche language. The ecosystem is small compared to Rust (Tauri) or JavaScript (Electron). If you need to integrate a specific native library, there may not be Zig bindings available, and you'll need to write C interop yourself.
- The project is young — only about a month old as of early June 2026. The contributor base is small (3 contributors listed), and the project hasn't faced the kind of real-world stress testing that Electron and Tauri have endured.
- Mobile support is early and requires native iOS/Android host apps. It's not a "write once, run on mobile" solution — you're still writing platform-specific host code for mobile.

### Getting Started

```bash
# Install the CLI globally
npm install -g zero-native

# Create a new app with a Next.js frontend
zero-native init my_app --frontend next
cd my_app

# Build and run the native app
zig build run
```

The first run installs frontend dependencies, builds the native shell, and opens a desktop window rendering your web UI. You can also use `--frontend react`, `--frontend svelte`, or `--frontend vue`.

For mobile embedding, check the `examples/ios` and `examples/android` directories. These show how to link `libzero-native.a` from a native host app.

### Alternatives

**Electron** — The battle-tested option for building desktop apps with web technologies. Electron has a massive ecosystem, extensive documentation, and powers apps like VS Code, Slack, and Discord. It bundles Chromium and Node.js, which means consistent rendering but large binaries (150MB+ baseline) and significant memory usage. Choose Electron when you need maximum compatibility, a proven track record, and don't mind the binary size.

**Tauri** — A Rust-based alternative that uses system WebViews like zero-native does, but with Rust on the backend instead of Zig. Tauri is more mature (v2 stable), has a larger community, and supports mobile more completely. It also has a rich plugin ecosystem and frontend-agnostic design. Choose Tauri when you want the most established lightweight alternative to Electron and are comfortable with Rust.

**Flutter Desktop** — Google's cross-platform framework compiles to native code and supports desktop (Windows, macOS, Linux) alongside mobile and web. It uses Dart and its own widget system rather than web technologies. Choose Flutter when you want a single codebase for mobile and desktop and are willing to invest in learning Dart and Flutter's widget model.

### Verdict

Zero Native is the most interesting addition to the "web-to-native" space since Tauri launched. The Zig choice is bold and smart — fast compilation, tiny binaries, and direct C interop make it a compelling alternative to Rust for the native shell layer. The Vercel Labs backing gives it credibility and staying power that most month-old projects don't have. If you're a web developer building internal tools, developer utilities, or desktop companions to web apps, zero-native deserves a spot on your watchlist. It's pre-release and the contributor base is small, so don't ship production apps on it yet. But for prototyping and early adoption, it's the fastest path from "I have a Next.js app" to "I have a native desktop app" that exists today. The 4,100 stars in a month suggest the developer community agrees.
