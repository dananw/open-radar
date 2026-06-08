---
name: sandbox-runtime
description: "Anthropic's open-source sandbox runtime for AI agents — enforce filesystem and network restrictions at the OS level without containers. Built for Claude Code, works everywhere."
url: https://github.com/anthropic-experimental/sandbox-runtime
stars: 4352
forks: 317
language: TypeScript
tags: ["ai-security", "sandboxing", "mcp", "claude-code", "agents"]
featured: false
publishedAt: 2026-06-09
---

## Sandbox Runtime

### Overview

Sandbox Runtime (`srt`) is Anthropic's open-source tool for sandboxing arbitrary processes at the OS level. It enforces filesystem and network restrictions without requiring Docker, VMs, or any container runtime. At 4,350+ GitHub stars and 317 forks since its October 2025 release, it's become the de facto standard for developers who need to run AI-generated code safely on their machines.

The project lives under `anthropic-experimental`, which means it originated from Anthropic's internal tooling for Claude Code. That's significant — this isn't a theoretical security paper. It's battle-tested infrastructure that Claude Code uses in production to prevent AI agents from reading your SSH keys, exfiltrating environment variables, or making unauthorized network requests. Anthropic open-sourced it as a "beta research preview" to help the broader ecosystem build safer agentic systems, and the development pace has been aggressive. The last commit landed June 5, 2026, with 118 open issues showing active community engagement.

The core problem it solves is deceptively simple: when you let an AI agent run commands on your machine, you need guardrails. Traditional approaches either trust the agent completely (dangerous) or run it in a Docker container (slow, complex, breaks local tooling). Sandbox Runtime threads the needle by using native OS primitives — `sandbox-exec` with Seatbelt profiles on macOS, `bubblewrap` with network namespace isolation on Linux — to create lightweight security boundaries around any process. The overhead is negligible. The protection is real.

### Why it matters

AI coding agents are everywhere in 2026. Claude Code, Cursor, Copilot, Codex — developers are increasingly letting AI tools execute shell commands, read files, and make network requests on their behalf. The security implications are massive. A compromised or hallucinating agent with unrestricted filesystem access can read `~/.ssh/id_rsa`, scrape `.env` files, or modify system configurations. A 2025 Snyk report found that 67% of developers using AI coding tools had experienced at least one incident where the agent accessed files outside the intended scope.

Sandbox Runtime addresses this by making security the default, not an afterthought. Network access is denied unless you explicitly allow specific domains. Write access is denied unless you explicitly allow specific paths. This deny-by-default model is exactly what you want when the thing executing commands is a probabilistic language model that might misinterpret your intent.

The MCP (Model Context Protocol) integration is what makes this especially relevant for fullstack developers. You can wrap any MCP server with `srt` and instantly restrict its capabilities. Your filesystem MCP server can read your project directory but not your SSH keys. Your network MCP server can reach your API endpoints but not arbitrary hosts. This is the missing security layer that the MCP ecosystem desperately needed.

### Key Features

**OS-Level Sandboxing Without Containers.** Sandbox Runtime uses `sandbox-exec` on macOS and `bubblewrap` on Linux — native OS primitives that enforce restrictions at the kernel level. There's no Docker daemon to manage, no image to build, no container lifecycle to orchestrate. The sandboxed process runs directly on your machine with the same performance characteristics as an unsandboxed process, but with hard limits on what it can access.

**Dual Isolation Model.** Both filesystem and network isolation are enforced simultaneously, and both are deny-by-default. Filesystem access uses a deny-then-allow pattern for reads (everything allowed except what you deny, with allow taking precedence) and an allow-only pattern for writes (nothing allowed except what you explicitly permit). Network access is fully allow-only — an empty `allowedDomains` list means zero network connectivity. This asymmetry is intentional and reflects real security priorities.

**MCP Server Sandboxing.** Any MCP server can be sandboxed by wrapping its command with `srt`. In your `.mcp.json` configuration, replace `"command": "npx"` with `"command": "srt"` and add `"npx"` to the args. The MCP server inherits your `~/.srt-settings.json` restrictions automatically. This is the lowest-friction way to add security boundaries to the MCP ecosystem, and it works with every MCP server regardless of what language it's written in.

**Programmatic TypeScript API.** Beyond the CLI, Sandbox Runtime exports a full TypeScript library. The `SandboxManager` class lets you initialize sandbox configurations, wrap commands programmatically, and handle violations in code. This is essential for building custom agent frameworks or CI pipelines that need fine-grained control over what AI-generated code can do.

**Violation Monitoring and Tracking.** On macOS, Sandbox Runtime taps into the system's sandbox violation log store for real-time monitoring. The `SandboxViolationStore` tracks which restrictions were triggered and by which process. This gives you visibility into what your AI agents are trying to do — which is invaluable for tuning your security policies and detecting anomalous behavior before it becomes a problem.

**Cross-Platform Consistency.** The same configuration file (`~/.srt-settings.json`) works on both macOS and Linux with consistent behavior. The underlying mechanisms differ (Seatbelt profiles vs. bubblewrap namespaces), but the API and configuration format are identical. Developers on mixed teams can share security policies without platform-specific adjustments.

**Git and Development Tool Awareness.** The sandbox understands development workflows. You can configure it to allow specific Unix sockets (like Docker's socket), permit local port binding for development servers, and set up ignore rules for known-safe violations. The `ignoreViolations` configuration lets you suppress noise from legitimate tool behavior without weakening your overall security posture.

### Use Cases

- **AI coding agent safety** — Wrap Claude Code, Cursor, or any AI agent that executes shell commands to prevent unauthorized file access or network exfiltration. The agent can work in your project directory but can't touch `~/.ssh`, `.env`, or system files.

- **MCP server hardening** — Add security boundaries to any Model Context Protocol server by wrapping its startup command with `srt`. Your filesystem MCP server reads your code but not your credentials. Your network MCP server reaches your APIs but not arbitrary endpoints.

- **CI/CD pipeline security** — Run untrusted build scripts or AI-generated test commands in sandboxed environments within your CI pipeline. The TypeScript API makes it straightforward to integrate with existing Node.js-based CI tooling.

- **Local development isolation** — Sandbox experimental npm packages, unfamiliar CLI tools, or community scripts that you want to try without risking your local environment. The performance overhead is negligible compared to Docker-based alternatives.

- **Multi-agent orchestration** — When running multiple AI agents in parallel (dynamic workflows, fan-out patterns), sandbox each agent independently with different permission sets. One agent gets read access to docs, another gets write access to source, neither gets unrestricted network access.

### Pros and Cons

Pros:
- Near-zero overhead compared to container-based sandboxing. Processes run at native speed with kernel-level enforcement, making it practical to sandbox every command, not just high-risk ones.
- The deny-by-default security model is exactly right for AI agents. You start with maximum restriction and explicitly loosen only what's needed, which is the opposite of how most developer tools work.
- Anthropic backing means this is actively maintained with security patches. The June 2026 commit history shows rapid iteration on TLS handling, SSH hardening, and macOS-specific fixes.

Cons:
- Linux support requires `bubblewrap` to be installed separately, and the network isolation model differs from macOS in ways that can surprise you. Unix socket filtering uses seccomp on Linux (which can't filter by path) versus explicit path allowlisting on macOS.
- Beta research preview status means the API and configuration format may change. Production systems should pin versions carefully and test upgrades in isolation.
- The `srt-settings.json` configuration is global by default (`~/.srt-settings.json`), which means all sandboxed processes share the same policy. Per-project configuration requires the `--settings` flag, adding friction to multi-project workflows.

### Getting Started

```bash
# Install globally
npm install -g @anthropic-ai/sandbox-runtime

# Run a command in the sandbox (all network + filesystem restricted by default)
srt echo "hello from the sandbox"

# Check what gets blocked
srt --debug curl https://example.com

# Configure permissions
cat > ~/.srt-settings.json << 'EOF'
{
  "network": {
    "allowedDomains": ["github.com", "*.github.com", "registry.npmjs.org"]
  },
  "filesystem": {
    "denyRead": ["~/.ssh", "~/.aws"],
    "allowWrite": [".", "/tmp"],
    "denyWrite": [".env"]
  }
}
EOF

# Now this works (allowed domain)
srt curl https://api.github.com

# And this is blocked (not in allowlist)
srt curl https://evil.com

# Use in MCP configuration
# In your .mcp.json, wrap any MCP server:
# { "command": "srt", "args": ["npx", "-y", "@modelcontextprotocol/server-filesystem"] }
```

### Alternatives

**Docker containers** — The traditional approach to sandboxing untrusted code. Docker provides stronger isolation (separate filesystem, separate network stack, separate process namespace) but at significant overhead. Container startup adds seconds, volume mounting introduces permission complexity, and the developer experience is worse. Choose Docker when you need full OS-level isolation for untrusted binaries. Choose Sandbox Runtime when you need lightweight, fast sandboxing for AI agent commands that run frequently.

**Firejail** — A Linux-native sandboxing tool that uses seccomp, namespaces, and filesystem overlays. Firejail is more mature and has a larger rule library, but it's Linux-only and doesn't have the MCP integration or TypeScript API that Sandbox Runtime provides. Choose Firejail if you're on Linux and need battle-tested sandboxing for desktop applications. Choose Sandbox Runtime if you're building AI agent infrastructure and need cross-platform support.

**Bubblewrap (standalone)** — The Linux primitive that Sandbox Runtime uses under the hood. Running `bwrap` directly gives you maximum control over namespace configuration, but you lose the cross-platform abstraction, the TypeScript API, the MCP integration, and the configuration management that Sandbox Runtime adds. Choose standalone bubblewrap if you need to customize namespace isolation beyond what `srt` exposes. For most developers, the abstraction layer is worth it.

### Verdict

Sandbox Runtime is the security tool that the AI agent ecosystem needed yesterday. Every developer running Claude Code, Cursor, or any AI agent that executes shell commands should be using this or something like it. The deny-by-default model, the negligible performance overhead, and the one-line MCP integration make it the lowest-friction way to add real security boundaries to AI-assisted development. It's beta software from Anthropic's experimental namespace, so treat it accordingly — pin versions, test upgrades, don't bet your production security on it without your own evaluation. But for local development and agent tooling, it's already the best option available. The 4,350 stars and active commit history suggest the community agrees, and the Apache-2.0 license means you can adopt it without legal friction.
