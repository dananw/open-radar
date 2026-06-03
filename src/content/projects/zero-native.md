---
name: zero-native
description: "Vercel Labs' zero-native lets web developers build native desktop and mobile apps with Zig backends and any web frontend — tiny binaries, fast rebuilds, real native power."
url: https://github.com/vercel-labs/zero-native
stars: 4083
forks: 168
language: Zig
tags: ["native-apps", "zig", "desktop", "web-ui", "vercel", "cross-platform"]
featured: false
publishedAt: 2026-06-03
---

## zero-native

### Overview

zero-native is a Zig-based desktop app shell that wraps modern web frontends — React, Next.js, Vue, Svelte — into native applications. It landed on GitHub on May 8, 2026, and crossed 4,000 stars in under a month. The project comes from Vercel Labs, which immediately gives it a credibility boost in the web developer community.

The core contributor is ctate, who has 62 commits on the repo and appears to be a Vercel engineer working on native platform tooling. The first release (v0.1.8) dropped on May 9, with rapid iteration since — v0.1.9 the same day and v0.2.0 by May 13. That cadence suggests an active internal effort, not a weekend side project.

The problem it solves is one web developers have been bumping into for years: you know React, you know TypeScript, but the moment someone asks for a desktop app, you're staring at Electron's 200MB+ bundle size or learning Swift/Kotlin from scratch. zero-native takes a different approach. Your frontend stays exactly as it is. The native layer is Zig — small, fast, and capable of calling C directly when you need real platform access. The result is an app that ships as a 2MB binary instead of a 200MB one, uses a fraction of the memory, and still renders your React components.

### Why it matters

The desktop app space has been dominated by Electron for nearly a decade. VS Code, Slack, Discord, Notion — they're all Electron. And while Electron is battle-tested, the developer community has been vocal about its costs: massive bundles, high memory usage (each app is a full Chromium instance), and slow cold starts. Tauri emerged in 2020 as a Rust-based alternative, and it's gained serious traction — but it asks web developers to learn Rust, which is a steep curve.

zero-native threads the needle differently. Zig is lower-level than Rust in some ways (manual memory management, no borrow checker), but it's also simpler to read and write for developers coming from C or even Go. The Zig build system is fast. Compilation is fast. And because Zig calls C directly with zero overhead, you can use platform SDKs, native libraries, codecs, and system integrations without writing bindings or wrapper layers.

For the fullstack developer running React or Next.js on the frontend, the pitch is almost too simple: `zero-native init my_app --frontend next`, then `zig build run`. Your Next.js app opens in a native window. No Electron. No Chromium bundled. No Rust to learn. That's a compelling onboarding story for any web developer who wants to ship a desktop app without leaving their ecosystem.

### Key Features

**System WebView or Chromium — Your Choice.** By default, zero-native uses the platform's built-in WebView: WKWebView on macOS, WebKitGTK on Linux, Edge WebView2 on Windows. This keeps binaries small (around 2MB) and startup fast. When you need rendering consistency across platforms, you can opt into Chromium through CEF as a platform-specific runtime. The choice is explicit and per-project, not a hidden default.

**Zig Native Layer with Direct C Interop.** The app shell is written in Zig, which compiles to native code and calls C libraries directly — no FFI overhead, no binding generation. Need to use a platform API, a video codec, or a native UI component? You call it from Zig as if it were C. This is a massive advantage over Electron (where native modules are painful) and even Tauri (where Rust bindings add friction).

**JavaScript-to-Zig Bridge with Security Controls.** `window.zero.invoke()` is the bridge between your web frontend and native code. Every call is size-limited, origin-checked, and permission-checked. You explicitly register which Zig functions the WebView can call. This is a deliberate security design — the WebView is treated as untrusted by default, which is the right model for apps that load dynamic content.

**Fast Rebuilds for Native Code.** Zig's incremental compilation is fast — typically sub-second for the native shell layer. Your frontend still uses its own tooling (Vite, Next.js dev server, etc.), so the hot-reload experience for your React code is unchanged. But when you modify the Zig side — adding a native command, changing a platform integration — you're not waiting minutes for Rust to compile. This matters during development velocity.

**Framework Starter Templates.** The repo ships with working examples for Next.js, React, Svelte, and Vue, plus iOS and Android embedding examples. Each example is a complete app with `app.zon` (the manifest), a Zig shell, and a minimal frontend. The mobile embedding path exposes a C ABI through `libzero-native.a`, so native mobile apps can host your web UI as a component.

**Declarative App Manifest.** `app.zon` is Zig's answer to Electron's `package.json` or Tauri's `tauri.conf.json`. It declares app ID, name, version, web engine choice, security policy (allowed origins, navigation rules), window configuration (size, title, label), permissions, and capabilities. It's a single file that controls everything about how the native shell behaves.

**Apache-2.0 License.** The project uses a permissive open-source license, which means you can use it in commercial products, modify it, and redistribute it. For a Vercel Labs project, this is the right call — it signals that this isn't a walled garden experiment.

### Use Cases

- **Internal tools and dashboards** — If you already have a Next.js admin panel and your team wants a desktop app for it (with offline access, system tray integration, native menus), zero-native gives you that without rewriting anything.

- **Developer tools and CLI companions** — Tools like database clients, API explorers, or monitoring dashboards that benefit from being a native app (window management, keyboard shortcuts, system notifications) but whose UI is best built with web tech.

- **Prototyping native app ideas** — When you want to test whether a desktop app concept works before investing in Swift or Kotlin development. Ship a working prototype in hours instead of weeks.

- **Cross-platform desktop apps for small teams** — Teams that don't have native developers but need to ship macOS, Linux, and Windows apps from a single codebase. The Zig layer handles platform differences; your React code stays the same.

- **Mobile app embedding** — The iOS and Android examples show how to embed zero-native's WebView as a component in a native mobile app. This is useful when your mobile app has a hybrid architecture and you want a consistent web rendering layer.

### Pros and Cons

Pros:

- **Tiny binary size compared to Electron.** A system WebView app ships at roughly 2MB versus Electron's 200MB+ baseline. For users downloading your app on a slow connection or running it on resource-constrained machines, this is a real difference.

- **No new language to learn for the frontend.** Your React, Next.js, Vue, or Svelte code works unchanged. The Zig layer only matters when you need native platform access, and the bridge API is simple enough that most web developers can use it without deep Zig knowledge.

- **Direct C interop without wrappers.** Zig's C calling convention is zero-cost. If you need to use a platform SDK, a database driver, or a native library, you call it directly. No binding generation, no FFI layer, no compile-time code generation.

- **Backed by Vercel Labs.** This isn't a solo developer's side project. The backing suggests long-term investment, and the rapid release cadence (three releases in the first week) confirms active development.

Cons:

- **Pre-release status.** The README explicitly says "pre-release." Mobile embedding is demonstrated but not production-ready. Windows support exists but may have rough edges. You should not ship critical applications on this yet.

- **Zig is still a niche language.** While Zig is simpler than Rust, it's far less popular. Finding Zig developers for hire is hard. Debugging Zig issues requires familiarity with a language that most web developers haven't touched. The ecosystem of Zig libraries is small.

- **No hot module replacement for Zig code.** Frontend HMR works as expected (Vite, Next.js fast refresh), but changes to the Zig native layer require a full rebuild. It's fast (sub-second), but it's not the instant feedback loop you get with pure web development.

- **System WebView fragmentation.** Using the platform WebView means your app renders slightly differently on macOS (WKWebView) vs Linux (WebKitGTK) vs Windows (WebView2). If you need pixel-perfect consistency, you need to opt into Chromium/CEF, which increases bundle size.

### Getting Started

Install the CLI globally:

```bash
npm install -g zero-native
```

Initialize a new project with Next.js:

```bash
zero-native init my_app --frontend next
cd my_app
```

Run the app:

```bash
zig build run
```

This opens a native desktop window rendering your Next.js app. The frontend runs on its normal dev server; the Zig shell hosts the WebView that loads it.

To use React instead of Next.js:

```bash
zero-native init my_react_app --frontend react
cd my_react_app
zig build run
```

The `app.zon` manifest controls everything — web engine, security policy, window configuration:

```zig
.{
    .id = "com.example.my-app",
    .name = "my-app",
    .display_name = "My App",
    .version = "0.1.0",
    .web_engine = "system",
    .permissions = .{ "window" },
    .capabilities = .{ "webview", "js_bridge" },
    .security = .{
        .navigation = .{
            .allowed_origins = .{ "zero://app", "http://127.0.0.1:5173" },
        },
    },
    .windows = .{
        .{ .label = "main", .title = "My App", .width = 960, .height = 640 },
    },
}
```

### Alternatives

**Electron** — The incumbent. Electron bundles Chromium and Node.js into every app, giving you a consistent rendering environment and access to the entire npm ecosystem for native modules. It's battle-tested and powers VS Code, Slack, and Discord. But the bundle size (200MB+), memory overhead (each app runs its own Chromium), and cold start times are real costs. Choose Electron when you need maximum compatibility, a mature ecosystem, and don't care about binary size.

**Tauri** — The Rust-based alternative that's been gaining momentum since 2020. Tauri also uses system WebViews and produces small binaries, but the backend is Rust instead of Zig. Tauri has a larger community, more plugins, and better documentation at this point. Choose Tauri when you want the small-binary approach with a more mature project and your team is comfortable writing Rust. The tradeoff is Rust's steeper learning curve and longer compile times compared to Zig.

**Neutralinojs** — Another lightweight alternative that uses system WebViews with a C++ backend. It's simpler than both Electron and Tauri, with a lower barrier to entry. But it has a smaller ecosystem, less active development, and fewer platform integration options. Choose Neutralinojs when you want the absolute simplest path to a desktop app from web code and don't need deep native integration.

### Verdict

zero-native is the most interesting thing Vercel Labs has shipped this year. It solves a real problem — web developers who want to build native apps without learning Swift, Kotlin, or Rust — with an approach that feels native to the web ecosystem. The Zig choice is bold but smart: fast compilation, direct C access, tiny binaries. At 4,000+ stars in under a month, the developer community is clearly interested. The pre-release status means you shouldn't bet your production app on it today, but if you're exploring native desktop options for your React or Next.js project, this is the framework to watch. The onboarding story (`zero-native init --frontend next`, then `zig build run`) is the cleanest I've seen in the native-app-from-web-code space. For fullstack web developers who want to ship desktop apps without leaving their comfort zone, zero-native is worth a serious look right now.
