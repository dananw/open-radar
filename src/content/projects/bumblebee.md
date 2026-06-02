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

Bumblebee is a read-only inventory collector for package, extension, and developer-tool metadata on macOS and Linux endpoints. Built by Perplexity AI and open-sourced in May 2026, it hit 4,000 GitHub stars within two weeks of launch. That kind of velocity for a security tool — not a framework, not an AI chatbot — says something about how anxious developers have become about supply-chain attacks.

The project fills a gap that existing tools don't quite cover. SBOMs tell you what shipped in your build artifacts. EDR tells you what ran on your network. But when a security advisory drops at 2 AM naming a compromised npm package version, the question your incident response team actually needs answered is simpler and harder: which developer machines on our team have that exact package version sitting on disk right now? Bumblebee answers that question. It scans lockfiles, package-manager metadata, extension manifests, and MCP configuration files — then outputs structured NDJSON records you can match against an exposure catalog.

Perplexity AI is best known for its AI-powered search engine, but the company has been quietly building credibility in developer tooling. Bumblebee is their first major open-source infrastructure release. The tool is written in Go with zero non-stdlib dependencies, ships as a single static binary, and runs without network access. That design philosophy — minimal, auditable, offline-capable — reflects lessons from years of supply-chain incidents where the security tooling itself became an attack vector.

### Why it matters

Supply-chain attacks have become the dominant threat model for software teams. The Synopsys 2025 Open Source Security and Risk Analysis report found that 91% of codebases contained open-source components with known vulnerabilities. The xz-utils backdoor in 2024 demonstrated that even critical infrastructure dependencies can be compromised through social engineering. And the npm ecosystem continues to see weekly incidents involving typosquatted packages and compromised maintainer accounts.

What makes Bumblebee interesting is that it doesn't try to be a vulnerability scanner or a software composition analysis tool. Those already exist (Snyk, Trivy, Socket). Bumblebee solves a narrower, more operational problem: rapid endpoint-level inventory and exposure matching. When your security team gets an alert about a compromised package, they need to know within minutes which machines are affected. Traditional SCA tools scan your codebase or your CI pipeline. Bumblebee scans what's actually installed on your developers' machines — the messy reality of `node_modules`, `.dist-info` directories, browser extensions, and MCP server configs that don't show up in your clean CI builds.

The MCP coverage is particularly forward-looking. As AI coding assistants become standard tooling, developers are configuring MCP servers in Claude Desktop, Cursor, Gemini CLI, and other tools. Those MCP configs can reference packages with known vulnerabilities or point to compromised servers. Bumblebee is the first tool I've seen that treats MCP configurations as a first-class inventory source alongside traditional package managers.

### Key Features

**Single Static Binary with Zero Dependencies.** Bumblebee is written in Go 1.25+ with no third-party libraries. The entire tool compiles to a single binary you can drop onto any macOS or Linux machine. No runtime dependencies, no container required, no package manager to bootstrap. This matters for security tooling — every dependency is a potential attack surface, and Bumblebee eliminates that concern entirely.

**Three Scan Profiles for Different Use Cases.** The `baseline` profile scans global package roots, language toolchains, editor extensions, browser extensions, and MCP configs — a lightweight recurring inventory. The `project` profile targets specific development directories like `~/code` or `~/src`. The `deep` profile walks broad filesystem roots for on-demand incident response. Each profile produces records tagged with `profile` and `root_kind` so receivers can keep populations separate in their analysis pipelines.

**Broad Ecosystem Coverage.** Bumblebee inventories npm (including pnpm, Yarn, and Bun), PyPI, Go modules, RubyGems, Composer, Homebrew, VS Code/Cursor/Windsurf extensions, Chromium and Firefox browser extensions, and MCP server configurations. It reads lockfiles and metadata directly — no `npm ls` or `pip show` execution. The MCP coverage includes `claude_desktop_config.json`, `.mcp.json`, `cline_mcp_settings.json`, `~/.gemini/settings.json`, and `~/.claude.json` configs.

**Exposure Catalog Matching.** Supply an `--exposure-catalog` JSON file with known-compromised package names and versions, and Bumblebee flags exact matches in your inventory. The catalog format is intentionally minimal: ecosystem, package name, version list, severity. Perplexity maintains sample catalogs in the `threat_intel/` directory, built from public threat-intelligence reporting and updated via PRs as new campaigns emerge.

**Read-Only and Offline Operation.** Bumblebee never executes package managers, never reads source files, and never makes network calls. It parses on-disk metadata only. When scanning MCP configs that may contain environment variables or credentials, it extracts server inventory but deliberately suppresses sensitive values from its output records. This read-only design means you can run it on production developer machines without risk of side effects.

**Structured NDJSON Output with Confidence Levels.** Every record includes a `confidence` field: `high` for exact identity and version from canonical metadata, `medium` for reliable identity with partial version info, and `low` for config/path references without proof of an installed version. Each run ends with a `scan_summary` record that downstream systems use to decide whether to promote the scan results to current state. The output format is designed for piping into SIEM systems, databases, or custom analysis tools.

**Built-In Self-Test.** Run `bumblebee selftest` to verify the installation against embedded fixtures using deliberately fake package names. The self-test makes no network calls and completes in milliseconds. It's a fast smoke test for fleet rollouts — if the self-test fails on a machine, you know the binary is corrupted or incompatible before you rely on it during an incident.

### Use Cases

- **Incident response for compromised packages** — When a security advisory drops naming a specific npm or PyPI version, run a deep scan across your team's machines to find exact matches within minutes instead of asking developers to manually check their lockfiles.

- **Recurring developer endpoint inventory** — Schedule baseline scans via cron or launchd to maintain a rolling inventory of what's installed across your engineering team. Feed the NDJSON output into your SIEM or a database for trend analysis and auditing.

- **MCP server configuration auditing** — As your team adopts AI coding tools, audit which MCP servers are configured, what packages they reference, and whether any match known-vulnerable components. This is a new attack surface that most organizations haven't started tracking yet.

- **Compliance and audit preparation** — Generate structured inventory reports showing exactly which open-source components are installed on developer machines, with confidence levels and source attribution. Useful for SOC 2 audits or customer security questionnaires.

- **Browser and editor extension governance** — Inventory installed VS Code, Cursor, and browser extensions across your team. Extensions have full access to the DOM, network, and filesystem — and they're rarely included in traditional SCA scans.

### Pros and Cons

Pros:

- Zero dependencies and a single static binary make it the most auditable security scanner I've seen. You can read the entire source in an afternoon, which matters when you're trusting a tool to scan your developers' machines.

- The read-only design eliminates the class of bugs where a security tool accidentally modifies the system it's scanning. No package manager execution, no source file reads, no network calls.

- MCP configuration scanning is a genuinely novel capability. As AI coding assistants proliferate, the attack surface of MCP server configs is going to grow fast, and Bumblebee is ahead of the curve.

- Exposure catalogs from Perplexity's threat intelligence team provide immediate value without requiring you to build your own intelligence pipeline.

Cons:

- Early-stage project (v0.1.1 as of late May 2026) with limited documentation beyond the README. The `docs/` directory exists but coverage is sparse for advanced use cases like custom transport or state management.

- The tool answers "which machines have this package?" but doesn't assess vulnerability severity, suggest remediation, or integrate with ticketing systems. You'll need additional tooling for the full incident-response workflow.

- Windows support is absent. The scanner targets macOS and Linux only, which excludes a meaningful portion of development teams, particularly in enterprise environments.

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

**Trivy** — Aqua Security's comprehensive vulnerability scanner covers container images, filesystems, and Git repositories. Trivy is more mature and has broader vulnerability database integration, but it scans codebases and build artifacts rather than developer endpoints. Choose Trivy for CI/CD pipeline security and container scanning; choose Bumblebee for developer machine inventory and rapid incident response.

**Socket** — Socket focuses on detecting supply-chain attacks in npm and PyPI packages by analyzing package behavior (network access, filesystem patterns, shell commands). It's a proactive defense that flags suspicious packages before they're known-compromised. Socket is better for preventing supply-chain attacks during development; Bumblebee is better for responding to known compromises after the fact.

**Snyk** — The most popular commercial SCA platform with IDE integrations, CI/CD plugins, and a large vulnerability database. Snyk is a full vulnerability management platform with remediation guidance and prioritization. It's the right choice for teams that want a managed service with SLA support. Bumblebee is the right choice when you need a fast, auditable, offline-capable scanner that you control completely.

### Verdict

Bumblebee is the kind of tool that shouldn't need to exist, but does. The npm ecosystem alone processes over 4 billion package downloads per week, and the gap between "what's in your lockfile" and "what's actually installed on your developers' machines" is wider than most security teams want to admit. Bumblebee closes that gap with a design that's almost aggressively minimal — zero dependencies, read-only, offline, single binary. The MCP configuration scanning is the feature that got my attention. As someone who has Claude Desktop, Cursor, and Gemini CLI all configured with MCP servers, I hadn't considered that those configs represent an untracked inventory of packages and services. Bumblebee treats them as first-class citizens alongside npm and PyPI, and that forward-looking design is going to matter more as AI coding tools become ubiquitous. The tool is young — v0.1.1, limited docs, no Windows support — but the 4,000-star first month and Perplexity's backing suggest it'll mature quickly. If you're responsible for developer security at your organization, run a baseline scan today. You'll probably find something you didn't know was installed.
