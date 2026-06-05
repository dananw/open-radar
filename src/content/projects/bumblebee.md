---
name: bumblebee
description: "Bumblebee is a Go-based supply-chain scanner from Perplexity AI that inventories npm, pip, Go, and MCP packages across developer machines to detect exposure to compromised dependencies."
url: https://github.com/perplexityai/bumblebee
stars: 4284
forks: 377
language: Go
tags: ["supply-chain-security", "go", "developer-tools", "security", "devops"]
featured: false
publishedAt: 2026-06-05
---

## Bumblebee

### Overview

Bumblebee is a read-only inventory collector that scans developer machines for package, extension, and tool metadata to detect exposure to known supply-chain compromises. Launched by Perplexity AI on May 20, 2026, it accumulated over 4,200 GitHub stars in just two weeks — a velocity that speaks to how badly the developer community needed this kind of tool. It's a single static Go binary with zero non-stdlib dependencies, and it works by reading lockfiles and package-manager metadata without ever executing package managers or touching source code.

The project comes from Perplexity AI, the company best known for its AI-powered search engine. This is their first major open-source developer tool, and it's a surprisingly practical one. Rather than building another AI wrapper, they shipped a focused utility that answers a specific incident-response question: when a supply-chain advisory drops naming a compromised package version, which developer machines in your org actually have that version installed right now? It's the kind of tool you don't think about until you need it, and when you need it, you need it fast.

The problem Bumblebee addresses is increasingly urgent. The npm ecosystem alone saw over 700 malicious package incidents in 2025, according to Phylum's threat reports. The xz-utils backdoor in 2024 showed that even widely-used infrastructure packages can be compromised. SBOMs tell you what shipped in production, and EDR tells you what touched the network, but neither answers the question of which developer laptops have a vulnerable package version sitting in their node_modules. Bumblebee fills that gap by turning scattered on-disk state — lockfiles, extension manifests, MCP configs — into structured NDJSON records that security teams can query against exposure catalogs.

### Why it matters

Supply-chain attacks have become one of the most effective vectors for compromising software organizations, and the response tooling hasn't kept up. When a new CVE or advisory drops, security teams scramble to answer "who's affected?" — and that question is surprisingly hard to answer across a fleet of developer machines. Each developer has different projects, different package managers, different editor extensions. Traditional asset management tools don't track this granular level of dependency state.

Bumblebee matters because it's the first tool from a credible, well-funded company that treats developer-endpoint inventory as a first-class security concern. Perplexity AI's involvement gives it immediate visibility and a higher likelihood of long-term maintenance compared to solo-developer security tools. The Go implementation means it runs on any platform, deploys as a single binary, and scans quickly — properties that matter when you're trying to assess exposure across hundreds of machines during an active incident.

The MCP and agent-skills coverage is particularly forward-looking. As AI coding assistants become standard tooling, developers are installing MCP servers and agent skill packages that have their own supply-chain risks. Bumblebee inventories these alongside traditional packages, acknowledging that the modern developer's attack surface extends well beyond npm and pip.

### Key Features

**Zero-Dependency Single Binary.** Bumblebee is compiled as a single static Go binary with no non-stdlib dependencies. This means no runtime requirements, no container images to manage, no interpreter versions to worry about. You can drop it on any macOS or Linux machine and it works. For security tooling, this simplicity is a feature — fewer dependencies means fewer supply-chain risks in the tool that's supposed to detect supply-chain risks.

**Three Scan Profiles.** The tool offers three profiles — `baseline`, `project`, and `deep` — designed for different use cases and cadences. `baseline` scans global package roots and editor extensions for recurring lightweight inventory. `project` targets specific development directories. `deep` walks broad paths like `$HOME` for on-demand incident response. This tiered approach means you can run lightweight scans frequently without the overhead of full filesystem walks.

**Broad Ecosystem Coverage.** Bumblebee covers npm, pnpm, Yarn, Bun, PyPI, Go modules, RubyGems, Composer, MCP configs, agent skills, VS Code/Cursor/Windsurf extensions, browser extensions, and Homebrew packages. That's 13 ecosystem families from a single tool. For a fullstack developer working across React, NestJS, Django, and Go, this means one scan catches everything — no need for separate tools per language.

**Exposure Catalog Matching.** When given a JSON catalog of known-compromised packages, Bumblebee flags exact matches in your inventory with severity levels. The `threat_intel/` directory ships with maintained catalogs built from public threat-intelligence reporting, assembled using Perplexity's own AI capabilities. You can also create custom catalogs for internal advisories. The matching is exact — `(ecosystem, name, version)` — so there are no false positives from fuzzy matching.

**Read-Only Operation.** Bumblebee never executes package managers, never reads source files, and never makes network calls. It reads only lockfiles, install metadata, extension manifests, and config files. This is critical for security tooling — the scanner itself cannot be a vector for supply-chain attacks. MCP host configs that contain credentials or environment values are parsed for server inventory but those sensitive values are never emitted in the output records.

**Structured NDJSON Output.** Every scan produces NDJSON (one JSON object per line) with consistent schema versioning, content-addressed record IDs, and per-record confidence levels. This makes the output pipeline-friendly — pipe it to jq, ingest it into a SIEM, or ship it to a central collector. The `scan_summary` record at the end of each run gives receivers a clear signal for state promotion.

**Built-In Self-Test.** Running `bumblebee selftest` executes an end-to-end check against embedded fixtures with deliberately fake package names. It makes no network calls and completes in milliseconds. This is useful for fleet deployments — run the self-test as a pre-deployment smoke test to verify the binary works before rolling it out.

### Use Cases

- **Incident response when a supply-chain advisory drops** — When a compromised npm package is reported, security teams can immediately scan all developer machines to find exact matches, rather than asking developers to manually check their lockfiles.

- **Continuous developer-endpoint inventory** — Run `baseline` scans daily via cron or systemd to maintain a rolling inventory of what's installed across your development fleet, useful for compliance audits and license tracking.

- **MCP and AI tool supply-chain auditing** — As teams adopt AI coding assistants with MCP servers and agent skills, Bumblebee inventories those alongside traditional packages, catching risks in this new attack surface.

- **Pre-merge security gates** — Integrate Bumblebee scans into CI pipelines to verify that new dependencies don't match known exposure catalogs before code reaches main branches.

- **Migration planning and dependency analysis** — Use the structured inventory output to understand what packages are actually installed across your org before planning major upgrades or migrations.

### Pros and Cons

Pros:
- Backed by Perplexity AI, a well-funded company with strong engineering talent, which increases the likelihood of long-term maintenance and threat-intel catalog updates.
- Genuinely zero dependencies and single binary — unlike most security scanners that require Python, Node.js, or Docker, Bumblebee just works after download.
- The read-only, no-network-calls design makes it one of the safest security tools to deploy — it can't accidentally modify your environment or exfiltrate data.

Cons:
- Only supports macOS and Linux — Windows developers are out of luck, which matters for teams with mixed development environments.
- Version 0.1 means the tool is still early — the MCP coverage doesn't parse non-JSON configs like Codex's TOML or Continue's YAML yet, and the ecosystem coverage will need to expand.
- The exposure catalog approach requires someone to maintain the catalogs; if your threat-intel feed goes stale, the matching becomes less useful over time.

### Getting Started

```bash
# Install the latest release (requires Go 1.25+)
go install github.com/perplexityai/bumblebee/cmd/bumblebee@latest

# Verify the installation works
bumblebee selftest
# selftest OK (2 findings in 1ms)

# Run a baseline inventory scan
bumblebee scan --profile baseline > inventory.ndjson

# Scan specific project directories
bumblebee scan --profile project \
  --root "$HOME/code" \
  --root "$HOME/Developer"

# Filter to specific ecosystems
bumblebee scan --profile baseline \
  --ecosystem npm,pypi \
  --ecosystem go

# Run an exposure check against threat intel
bumblebee scan --profile deep \
  --root "$HOME" \
  --exposure-catalog ./threat_intel/ \
  --findings-only \
  --max-duration 10m
```

### Alternatives

**Socket.dev** — Socket is a commercial supply-chain security platform that focuses on proactive detection of malicious packages in npm and PyPI ecosystems. It analyzes package behavior before you install, which is a different angle from Bumblebee's post-install inventory approach. Socket is better for preventing compromises; Bumblebee is better for responding to advisories after they drop. For most teams, you'd want both.

**SBOM Tools (Syft, Trivy)** — Traditional SBOM generators like Syft and Trivy produce software bills of materials for container images and build artifacts. They answer "what shipped?" but not "what's on every developer's laptop right now?" Bumblebee's endpoint-focused approach complements SBOM tools rather than replacing them. Use SBOMs for production artifacts and Bumblebee for developer machines.

**npm audit / pip audit** — These language-specific tools check installed packages against known vulnerability databases. They're simpler to use but only cover a single ecosystem per run and require executing the package manager. Bumblebee covers 13 ecosystem families in a single scan without executing anything, making it more suitable for fleet-wide incident response.

### Verdict

Bumblebee is the supply-chain scanner that should have existed three years ago. The xz-utils incident, the countless npm typosquatting campaigns, and the increasing sophistication of package-ecosystem attacks all pointed to the need for a fast, read-only, multi-ecosystem inventory tool for developer machines. Perplexity AI shipping it as a Go binary with zero dependencies is the right call — security tools should be the simplest things in your stack, not the most complex. At two weeks old with 4,200 stars, it's too early to call it battle-tested, but the architecture decisions are sound: read-only, no network calls, structured output, content-addressed records. If you're running a development team of any size and you don't have a way to quickly answer "which machines have this compromised package installed?", Bumblebee is worth evaluating today. The maintained threat-intel catalogs from Perplexity's AI-assisted research are a differentiator that solo-developer alternatives can't easily replicate.
