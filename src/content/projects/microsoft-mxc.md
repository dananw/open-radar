---
name: microsoft-mxc
description: "Microsoft MXC is a sandboxed code execution system with a TypeScript SDK for safely running untrusted code, plugins, and AI agent output across Windows, Linux, and macOS."
url: https://github.com/microsoft/mxc
stars: 549
forks: 24
language: TypeScript
tags: ["sandbox", "security", "typescript", "ai-agents", "microsoft"]
featured: false
publishedAt: 2026-06-07
---

## Microsoft MXC (eXecution Container)

### Overview

Microsoft MXC is a sandboxed code execution system built to run untrusted code — AI model output, third-party plugins, arbitrary tool calls — safely across Windows, Linux, and macOS. The project appeared on GitHub's trending page in early June 2026 and crossed 500 stars within its first week, which tracks with how urgently the developer community needs better sandboxing primitives.

The project is published by Microsoft's core engineering team. The native binary layer is written in Rust, while the developer-facing API ships as a TypeScript SDK available on npm as `@microsoft/mxc-sdk`. That combination matters: Rust gives you memory safety and tight OS-level control for the containment layer, while TypeScript gives you the ergonomic interface most web and backend developers already know. You don't need to learn a new language or runtime to sandbox your code.

The core problem MXC solves is straightforward but hard: when your application runs code from an LLM, a plugin marketplace, or a user-provided script, you need guarantees that the code can't read arbitrary files, make network requests to malicious hosts, or access the clipboard. Existing solutions range from Docker containers (heavy, slow startup) to WebAssembly runtimes (limited system access) to process-level restrictions (platform-specific, easy to get wrong). MXC tries to sit in the middle — lighter than a VM, more capable than WASM, with a unified API that works identically on all three major operating systems.

### Why it matters

The timing of MXC connects directly to the AI agent explosion of 2025-2026. Every coding assistant, every MCP server, every agentic workflow eventually hits the same wall: you need to execute something untrusted, and you need it not to destroy the host system. Docker works but adds 500ms+ of startup latency per container. WebAssembly sandboxes like WasmEdge and Wasmer are fast but can't access the filesystem or network in a controlled way without custom bindings per host. Process-level sandboxing with seccomp or AppArmor requires deep Linux expertise and doesn't port to macOS or Windows.

MXC offers a different model. You describe your sandbox policy in JSON — which paths are readable, which are writable, whether outbound network is allowed, what the timeout is — and the SDK spawns a contained process using the best available backend for the platform. On Linux, that's Bubblewrap or LXC. On Windows, it's ProcessContainer (AppContainer-based) or Windows Sandbox. On macOS, it's Seatbelt. The developer writes one config, and the runtime picks the right containment mechanism.

This is the kind of infrastructure tool that becomes invisible once it's adopted. You don't think about it — you just wrap your untrusted execution calls in MXC and move on. The fact that it's from Microsoft and MIT-licensed makes it a reasonable bet for production use, though the alpha status means you should test thoroughly before deploying.

### Key Features

**Cross-Platform Containment Backends.** MXC ships nine different backend implementations: ProcessContainer and Windows Sandbox for Windows, Bubblewrap and LXC for Linux, Seatbelt for macOS, plus experimental MicroVM (NanVix), Hyperlight, IsolationSession, and WSLC backends. The SDK auto-detects the host platform and selects the best available backend. You write one configuration file, and it works everywhere.

**JSON-Based Policy Configuration.** Security policies are defined in a versioned JSON schema (currently `0.6.0-alpha`). You specify filesystem access (read-only and read-write paths), network rules (allow/block outbound, host filtering), UI access (clipboard, display, GUI controls), and timeouts — all in a declarative format. No imperative code needed for the security boundary itself.

**TypeScript SDK with Two APIs.** The `@microsoft/mxc-sdk` npm package provides a one-shot API for simple "run this command in a sandbox" use cases, plus a state-aware lifecycle API (`provisionSandbox`, `startSandbox`, `execInSandboxAsync`, `stopSandbox`, `deprovisionSandbox`) for long-lived sandboxed sessions. The one-shot API is what most developers will use; the lifecycle API is for agent frameworks that need persistent execution environments.

**Policy-Driven Filesystem Isolation.** Each sandbox gets explicit lists of read-only and read-write paths. The SDK provides helper functions like `getAvailableToolsPolicy()` and `getTemporaryFilesPolicy()` to generate sensible defaults. A sandbox running user-provided Python code gets access to the Python binary and a temp directory — nothing else. This is the most important security boundary in the system.

**Network Access Controls.** Sandboxes can have outbound networking fully blocked, allowed with host filtering, or proxied through a specific endpoint. For AI agent use cases, blocking outbound network by default and whitelisting specific API endpoints is the common pattern. Note: network proxying isn't yet supported on macOS.

**State-Aware Sandbox Lifecycle.** Beyond one-shot execution, MXC supports a multi-step lifecycle: provision (prepare the sandbox environment), start (launch it), exec (run commands inside), stop (terminate), and deprovision (clean up). This is designed for agent frameworks that need to spin up a sandbox, run multiple tool calls inside it, and tear it down when the session ends.

**Native Rust Binary with TypeScript Glue.** The containment layer is a Rust binary that does the actual OS-level sandboxing. The TypeScript SDK wraps it, handling config parsing, platform detection, and child process management. This architecture means the security-critical code is in a memory-safe systems language, while the developer interface is in the language most web developers already use.

### Use Cases

- **AI agent code execution** — Wrapping tool calls from LLM-based agents (Claude, GPT, etc.) in a sandbox so generated code can't access the host filesystem beyond approved paths. The one-shot API is a natural fit here.

- **Plugin and extension marketplaces** — Running third-party plugins in isolation with declared capability manifests. A plugin requesting `read:content` and `email:send` gets exactly those permissions, enforced at the OS level.

- **CI/CD pipeline isolation** — Running untrusted build scripts or test commands in a sandboxed environment with controlled filesystem access and network rules. Lighter than Docker for simple command execution.

- **Educational platforms and coding playgrounds** — Letting students run arbitrary code in a browser-connected sandbox without risking the server. The state-aware lifecycle API supports interactive REPL-like sessions.

- **Local development with untrusted tools** — Running npm scripts, pip packages, or other community tools that might contain malicious post-install hooks. MXC can restrict the install step to a temp directory with no network access.

### Pros and Cons

Pros:
- Unified API across Windows, Linux, and macOS means you don't need platform-specific sandboxing code. Write once, contain everywhere.
- The Rust + TypeScript architecture splits concerns correctly — security-critical containment in Rust, developer ergonomics in TypeScript.
- Backed by Microsoft with MIT license. This isn't a weekend project — it's infrastructure that Microsoft itself needs for Copilot and other AI products.
- JSON-based policy definition is simple enough for non-security-experts to reason about. The helper functions generate sensible defaults.

Cons:
- Alpha status with `0.6.0-alpha` schema version. The README explicitly warns that policies are "overly permissive" in the current release and that no profiles should be treated as security boundaries yet.
- Requires building from source (Rust toolchain + Node.js). No pre-built binaries or Docker image available yet. This adds friction for teams that just want to try it.
- Some backends have significant platform limitations. Network proxying doesn't work on macOS, denied paths aren't supported on Windows, and the experimental backends (MicroVM, Hyperlight) require specific hardware or OS builds.

### Getting Started

```bash
# Install the TypeScript SDK
npm install @microsoft/mxc-sdk

# Clone the repo for the native binary (required for now)
git clone https://github.com/microsoft/mxc.git
cd mxc

# Build for your platform
# Linux:
./build.sh
# macOS:
./build-mac.sh
# Windows:
build.bat
```

Then use the SDK in your project:

```typescript
import {
  spawnSandboxFromConfig, createConfigFromPolicy,
  getAvailableToolsPolicy, getTemporaryFilesPolicy,
  getPlatformSupport,
} from '@microsoft/mxc-sdk';

if (!getPlatformSupport().isSupported) {
  throw new Error('MXC not available on this host');
}

const tools = getAvailableToolsPolicy(process.env);
const temp  = getTemporaryFilesPolicy();

const config = createConfigFromPolicy({
  version: '0.6.0-alpha',
  filesystem: {
    readonlyPaths:  tools.readonlyPaths,
    readwritePaths: temp.readwritePaths,
  },
  network: { allowOutbound: false },
  timeoutMs: 30_000,
});
config.process!.commandLine = 'python -c "print(\'hello from sandbox\')"';

const child = spawnSandboxFromConfig(config, { usePty: false });
child.stdout!.on('data', (d) => process.stdout.write(d));
child.on('close', (code) => console.log('exit:', code));
```

Run Rust unit tests and SDK tests:

```bash
# From src/
cargo test --workspace

# From sdk/
npm test
npm run test:integration
```

### Alternatives

**gVisor** — Google's application kernel for container sandboxing. gVisor intercepts system calls and implements a subset of the Linux kernel in userspace. It's more mature and battle-tested (powers Google Cloud's GKE Sandbox), but it's Linux-only and requires container runtime integration. Choose gVisor when you need production-grade container isolation on Linux and don't care about cross-platform support.

**Bubblewrap (bwrap)** — The Linux-native sandboxing tool that MXC actually uses as its default Linux backend. You can use Bubblewrap directly without MXC, and many projects do. The advantage of using it directly is zero dependencies; the advantage of MXC is the cross-platform abstraction layer and the TypeScript SDK. Choose Bubblewrap directly when you only target Linux and want minimal dependencies.

**Wasmtime / Wasmer** — WebAssembly runtimes that provide sandboxed execution by default through WASM's linear memory model. They're fast and have strong security guarantees, but system call access requires explicit host function bindings. Choose WASM runtimes when your untrusted code can be compiled to WebAssembly and doesn't need arbitrary filesystem or network access.

### Verdict

MXC is the sandboxing primitive that the AI agent ecosystem has been missing. Docker is too heavy for per-tool-call isolation. WASM is too restrictive for code that needs filesystem access. Process-level sandboxing is too platform-specific. MXC fills that gap with a clean TypeScript API and real OS-level containment underneath. It's early — the alpha warnings in the README are honest, and you shouldn't ship this to production without thorough testing. But the architecture is right, the backing is serious (Microsoft, MIT license, Rust core), and the timing is perfect. If you're building an AI agent framework, a plugin system, or anything that runs untrusted code, watch this project closely. The 500-star first week suggests the developer community agrees.
