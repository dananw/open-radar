---
name: extension.js
description: "Extension.js is a zero-config cross-browser extension framework with HMR, TypeScript, and first-class React/Vue/Svelte support. Build Chrome, Edge, and Firefox extensions without build configuration."
url: https://github.com/extension-js/extension.js
stars: 5003
forks: 128
language: TypeScript
tags: ["browser-extension", "developer-tools", "typescript", "react", "cross-browser"]
featured: false
publishedAt: 2026-06-18
---

## Extension.js

### Overview

Extension.js is a zero-config CLI framework for building cross-browser extensions. It hit 5,000 GitHub stars in mid-2026 after a Hacker News front-page post drew 381 points, and it's been downloaded roughly 17,500 times from npm in the past month. Those numbers are modest compared to something like Vite, but for the browser extension tooling space — which has been genuinely neglected — they're significant.

The project is maintained by Cezar Augusto, a developer who's been working on extension developer experience since 2020. The original motivation was simple: building browser extensions still sucks. Manifest V3 fragmentation, browser-specific quirks, no hot reload for content scripts, separate build pipelines for every target. If you've ever tried to build a Chrome extension with React and TypeScript, you know the pain. You end up configuring webpack or rollup, fighting with content script injection, and maintaining separate configs for Chrome and Firefox.

Extension.js collapses all of that into a single CLI. `npx extension@latest create my-extension` scaffolds a project. `npm run dev` starts it with hot module replacement across background, content, popup, and options scripts. `extension build --zip` produces a production bundle ready for the Chrome Web Store or Firefox Add-ons. No build config files to maintain. No plugins to wrangle. It just works.

### Why it matters

The browser extension ecosystem is quietly massive. Chrome alone has over 175,000 extensions, and the market is growing as AI-powered browser tools become mainstream. Every AI assistant, ad blocker, password manager, and developer tool ships as a browser extension. Yet the developer experience has lagged years behind the rest of the web platform.

While frontend frameworks like Next.js, Remix, and Astro have invested heavily in DX, extension developers have been stuck with raw webpack configs or early-generation tools that solve half the problem. Plasmo came first and did good work, but its opinionated structure doesn't fit every project. WXT improved on the concept but still requires configuration. CRXJS focused on Vite integration but doesn't handle Firefox well. Extension.js takes a different approach — it's framework-agnostic, browser-agnostic, and genuinely zero-config.

The timing matters too. Manifest V3 migration is forcing every extension developer to revisit their build tooling. Chrome deprecated Manifest V2 in 2024, and Firefox is following suit. If you're rewriting your extension anyway, you might as well modernize the toolchain. Extension.js is positioned as the path of least resistance for that migration.

### Key Features

**Cross-Browser HMR for Content Scripts.** This is the killer feature. Hot module replacement for content scripts is genuinely hard — you're injecting code into third-party web pages, and most build tools give up on reloading them without a full page refresh. Extension.js handles it natively. Edit your React component in a content script, see the change instantly without losing page state. This alone saves hours per week during development.

**Zero Configuration.** No webpack.config.js, no vite.config.ts, no manifest.json editing. Extension.js auto-generates the manifest based on your project structure. It detects which scripts you have (background, content, popup, options) and builds the manifest accordingly. You can override anything, but the defaults work for 90% of projects.

**Framework-Agnostic Templates.** The CLI scaffolds projects in Vanilla JS, TypeScript, React, Vue, Svelte, and Preact. You pick your framework at creation time and get a working extension with proper typing, HMR, and browser APIs. There's no framework lock-in — you can mix and match. A popup in React with a content script in vanilla TypeScript works fine.

**Managed Browser Binaries.** `extension install firefox` downloads an isolated Firefox build for development. No need to have Firefox installed on your system. `extension install --browser=all` grabs Chrome, Edge, and Firefox in one go. This is especially useful in CI environments where you need clean browser instances for testing.

**Production Store Bundles.** `extension build --zip` produces a ZIP file ready for upload to the Chrome Web Store, Edge Add-ons, or Firefox AMO. There's also `--zip-source` for store source-code review requirements (some stores ask for your source code), and `--polyfill` for cross-browser webextension API compatibility. The build pipeline handles Manifest V3 differences between browsers automatically.

**Run Any GitHub Sample Directly.** Point the CLI at any Chrome extension sample on GitHub and run it immediately: `npx extension dev https://github.com/GoogleChrome/chrome-extensions-samples/tree/main/functional-samples/sample.page-redder`. This is great for learning, debugging, and testing third-party extensions without cloning repos.

**Drop-In Integration.** Already have an extension project? Install Extension.js as a dev dependency and add three scripts to your package.json. It replaces your existing build pipeline without restructuring your codebase. This migration path is realistic — you don't need to start from scratch.

### Use Cases

- **AI browser assistants** — Teams building ChatGPT-like sidebar extensions that need to inject content scripts into every page with React UI overlays. The content script HMR makes iterating on the injection logic fast.
- **Developer productivity tools** — Extensions like React DevTools, Redux DevTools, or Lighthouse that need to run in Chrome, Edge, and Firefox simultaneously. Cross-browser builds from a single codebase.
- **Ad blockers and privacy tools** — Complex extensions with multiple content scripts, background workers, and popup UIs. The manifest auto-generation handles the boilerplate.
- **Internal enterprise extensions** — Companies building Chrome extensions for internal tools. The zero-config approach means non-extension-specialist developers can contribute without learning webpack plugin chains.
- **Extension prototyping** — Quickly testing an extension idea by running a Chrome sample directly from GitHub, modifying it, and shipping a ZIP in minutes.

### Pros and Cons

Pros:
- Genuinely zero-config for most projects. The CLI generates manifests, handles cross-browser differences, and provides HMR without any configuration files. This is a real DX improvement, not a marketing claim.
- First-class TypeScript and React support. Types are well-maintained, and the React template includes proper typing for Chrome extension APIs like `chrome.runtime` and `chrome.storage`.
- Active development with 5,003 stars and growing community. The Discord server is responsive, and the maintainer merges PRs quickly.
- MIT licensed. No vendor lock-in, no paid tiers for advanced features.

Cons:
- npm weekly downloads are still modest at 4,500/week. The community is growing but small compared to established tools like Plasmo (which has been around longer and has more ecosystem integrations).
- Safari support is listed as "Next" (planned) but not available yet. If you need Safari extensions, you'll need a different approach for now.
- The zero-config philosophy means less control over edge cases. Complex extension architectures with unusual manifest configurations may need to eject or use the `--config` flag.

### Getting Started

```bash
# Create a new React extension
npx extension@latest create my-extension --template react
cd my-extension

# Start development with HMR
npm run dev

# Build for production
npx extension@latest build --zip

# Run a Chrome sample directly
npx extension@latest dev https://github.com/GoogleChrome/chrome-extensions-samples/tree/main/functional-samples/sample.page-redder
```

Add to an existing project:

```bash
npm install extension@latest --save-dev
```

```json
{
  "scripts": {
    "dev": "extension dev",
    "build": "extension build --zip",
    "preview": "extension preview"
  }
}
```

### Alternatives

**Plasmo** — The most established browser extension framework with a larger community and more integrations (e.g., built-in messaging, storage abstraction, background jobs). Plasmo uses an opinionated file-based routing system that works well for standard extensions but can feel constraining for complex architectures. Choose Plasmo if you want more built-in abstractions and don't mind the opinionation.

**WXT** — A Vite-powered extension framework that's gained traction for its flexibility and modern toolchain. WXT gives you more control over the build process and supports modules, auto-imports, and i18n out of the box. Choose WXT if you're already invested in the Vite ecosystem and want fine-grained configuration.

**CRXJS** — A Vite plugin focused on Chrome extension development with excellent HMR support. CRXJS is lighter weight than a full framework but doesn't handle Firefox or cross-browser manifest differences. Choose CRXJS if you only target Chrome and want minimal tooling overhead.

### Verdict

Extension.js fills a real gap. Browser extension development has been stuck in a webpack-era time warp while the rest of the frontend ecosystem moved on. The zero-config approach with genuine cross-browser HMR for content scripts is the right abstraction level — it handles the hard parts (manifest generation, browser differences, content script injection) and gets out of your way for everything else.

It's not the most mature option. Plasmo has more integrations and a larger community. WXT offers more configuration flexibility. But Extension.js has the cleanest mental model and the lowest barrier to entry. If you're a React or Vue developer who needs to build a browser extension and doesn't want to learn extension-specific build tooling, this is where I'd start. The 5,000 stars and HN traction suggest the developer community agrees. Keep an eye on Safari support — once that lands, the cross-browser story becomes truly complete.
