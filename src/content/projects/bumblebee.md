---
name: bumblebee
description: "Bumblebee is a read-only Go scanner by Perplexity AI that inventories packages, extensions, and MCP configs on developer machines for supply-chain exposure checks."
url: https://github.com/perplexityai/bumblebee
stars: 4114
forks: 363
language: Go
tags: ["supply-chain-security", "go", "developer-tools", "open-source", "sbom"]
featured: false
publishedAt: 2026-06-02
---

## Bumblebee

### Overview

Bumblebee is a read-only inventory collector for package, extension, and developer-tool metadata on macOS and Linux endpoints. Built by Perplexity AI and open-sourced in May 2026, it hit 4,000 GitHub stars within two weeks. That velocity for a security tool — not a framework, not an AI chatbot — says something about how anxious developers have become about supply-chain attacks.

The project fills a gap existing tools don't cover. SBOMs tell you what shipped in your build artifacts. EDR tells you what ran on your network. But when a security advisory drops at 2 AM naming a compromised npm package, the question your incident response team needs answered is: which developer machines have that exact package version on disk right now? Bumblebee answers that by scanning lockfiles, package-manager metadata, extension manifests, and MCP configuration files, then outputting structured NDJSON records you can match against an exposure catalog.

The tool is written in Go with zero non-stdlib dependencies, ships as a single static binary, and runs without network access. That design philosophy — minimal, auditable, offline-capable — reflects lessons from years of supply-chain incidents where the security tooling itself became an attack vector.

### Why it matters

Supply-chain attacks have become the dominant threat model for software teams. The Synopsys 2025 report found that 91% of codebases contained open-source components with known vulnerabilities. The npm ecosystem sees weekly incidents involving typosquatted packages and compromised maintainer accounts.

What makes Bumblebee interesting is that it doesn't try to be a vulnerability scanner or SCA tool. Those already exist (Snyk, Trivy, Socket). Bumblebee solves a narrower, more operational problem: rapid endpoint-level inventory and exposure matching. Traditional SCA tools scan your codebase or CI pipeline. Bumblebee scans what's actually installed on your developers' machines — the messy reality of `node_modules`, browser extensions, and MCP server configs that don't show up in clean CI builds.

The MCP coverage is particularly forward-looking. As AI coding assistants become standard tooling, developers are configuring MCP servers in Claude Desktop, Cursor, and Gemini CLI. Those configs can reference packages with known vulnerabilities. Bumblebee is the first tool I've seen that treats MCP configurations as a first-class inventory source alongside traditional package managers.

### Key Features

**Single Static Binary with Zero Dependencies.** Bumblebee is written in Go 1.25+ with no third-party libraries. The entire tool compiles to a single binary you can drop onto any macOS or Linux machine. No runtime dependencies, no container required. For security tooling, every dependency is a potential attack surface — Bumblebee eliminates that concern entirely.

**Three Scan Profiles for Different Use Cases.** The `baseline` profile scans global package roots, toolchains, editor extensions, browser extensions, and MCP configs — a lightweight recurring inventory. The `project` profile targets specific development directories like `~/code`. The `deep` profile walks broad filesystem roots for on-demand incident response. Each profile produces records tagged with `profile` and `root_kind` so receivers can keep populations separate.

**Broad Ecosystem Coverage.** Bumblebee inventories npm (including pnpm, Yarn, and Bun), PyPI, Go modules, RubyGems, Composer, Homebrew, VS Code/Cursor/Windsurf extensions, Chromium and Firefox browser extensions, and MCP server configurations. It reads lockfiles and metadata directly — no `npm ls` or `pip show` execution.

**Exposure Catalog Matching.** Supply an `--exposure-catalog` JSON file with known-compromised package names and versions, and Bumblebee flags exact matches. The catalog format is minimal: ecosystem, package name, version list, severity. Perplexity maintains sample catalogs in the `threat_intel/` directory, updated via PRs as new campaigns emerge.

**Read-Only and Offline Operation.** Bumblebee never executes package managers, never reads source files, and never makes network calls. When scanning MCP configs that may contain credentials, it extracts server inventory but deliberately suppresses sensitive values from output records.

**Structured NDJSON Output with Confidence Levels.** Every record includes a `confidence` field: `high` for exact identity and version from canonical metadata, `medium` for reliable identity with partial version info, and `low` for config/path references without proof of an installed version. Each run ends with a `scan_summary` record for downstream state management.

**Built-In Self-Test.** Run `bumblebee selftest` to verify the installation against embedded fixtures using fake package names. No network calls, completes in milliseconds. A fast smoke test for fleet rollouts.

### Use Cases

- **Incident response for compromised packages** — When a security advisory drops, run a deep scan across your team's machines to find exact matches within minutes instead of asking developers to manually check their lockfiles.

- **Recurring developer endpoint inventory** — Schedule baseline scans via cron or launchd to maintain a rolling inventory of what's installed across your engineering team. Feed the NDJSON output into your SIEM or a database for auditing.

- **MCP server configuration auditing** — As your team adopts AI coding tools, audit which MCP servers are configured and whether any reference known-vulnerable packages. This is a new attack surface most organizations haven't started tracking.

- **Browser and editor extension governance** — Inventory installed VS Code, Cursor, and browser extensions across your team. Extensions have full access to the DOM, network, and filesystem — and they're rarely included in traditional SCA scans.

### Pros and Cons

Pros:

- Zero dependencies and a single static binary make it the most auditable security scanner I've seen. You can read the entire source in an afternoon.

- The read-only design eliminates the class of bugs where a security tool accidentally modifies the system it's scanning. No package manager execution, no source file reads, no network calls.

- MCP configuration scanning is a genuinely novel capability. As AI coding assistants proliferate, the attack surface of MCP server configs is going to grow fast.

- Exposure catalogs from Perplexity's threat intelligence team provide immediate value without requiring you to build your own intelligence pipeline.

Cons:

- Early-stage project (v0.1.1 as of late May 2026) with limited documentation beyond the README. Advanced use cases like custom transport or state management are sparsely documented.

- The tool answers "which machines have this package?" but doesn't assess vulnerability severity or suggest remediation. You'll need additional tooling for the full incident-response workflow.

- Windows support is absent. The scanner targets macOS and Linux only, which excludes a meaningful portion of development teams in enterprise environments.

### Getting Started

```bash
# Install the latest release
go install github.com/perplexityai/bumblebee/cmd/bumblebee@latest

# Verify the installation
bumblebee selftest

# Run a baseline inventory of your machine
bumblebee scan --profile baseline > inventory.ndjson

# Scan specific project directories
bumblebee scan --profile project \
  --root "$HOME/code" \
  --root "$HOME/projects"

# Check for exposure against a known advisory
bumblebee scan --profile deep \
  --root "$HOME" \
  --exposure-catalog ./catalog.json \
  --findings-only

# Preview what roots a profile would scan
bumblebee roots --profile baseline
```

The output is NDJSON — one JSON object per line. Pipe it to `jq` for filtering, store it in a database, or feed it into your SIEM. Each record includes endpoint metadata, ecosystem, package name, version, confidence level, and source attribution.

### Alternatives

**Trivy** — Aqua Security's vulnerability scanner covers container images, filesystems, and Git repositories. More mature with broader vulnerability database integration, but it scans codebases and build artifacts rather than developer endpoints. Choose Trivy for CI/CD pipeline security; choose Bumblebee for developer machine inventory.

**Socket** — Socket detects supply-chain attacks in npm and PyPI by analyzing package behavior (network access, filesystem patterns, shell commands). It's proactive defense that flags suspicious packages before they're known-compromised. Socket prevents attacks during development; Bumblebee responds to known compromises after the fact.

**Snyk** — The most popular commercial SCA platform with IDE integrations, CI/CD plugins, and a large vulnerability database. Snyk is a full vulnerability management platform with remediation guidance. Right choice for teams wanting a managed service. Bumblebee is right when you need a fast, auditable, offline-capable scanner you control completely.

### Verdict

Bumblebee is the kind of tool that shouldn't need to exist, but does. The npm ecosystem alone processes over 4 billion package downloads per week, and the gap between "what's in your lockfile" and "what's actually installed on your developers' machines" is wider than most security teams want to admit. Bumblebee closes that gap with a design that's almost aggressively minimal — zero dependencies, read-only, offline, single binary. The MCP configuration scanning got my attention. As someone with Claude Desktop, Cursor, and Gemini CLI all configured with MCP servers, I hadn't considered that those configs represent an untracked inventory of packages and services. Bumblebee treats them as first-class citizens alongside npm and PyPI, and that forward-looking design will matter more as AI coding tools become ubiquitous. The tool is young — v0.1.1, limited docs, no Windows support — but the 4,000-star first month and Perplexity's backing suggest it'll mature quickly. If you're responsible for developer security, run a baseline scan today. You'll find something you didn't know was installed.
