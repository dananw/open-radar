---
name: audit
description: "Evilsocket/audit is an 8-stage vulnerability-discovery agent that uses multiple AI agents to find real security bugs in your codebase — built on Claude Code Agent SDK."
url: https://github.com/evilsocket/audit
stars: 590
forks: 86
language: Python
tags: ["security", "ai-agents", "code-audit", "vulnerability-scanning", "claude"]
featured: false
publishedAt: 2026-06-04
---

## audit

### Overview

audit is an 8-stage vulnerability-discovery agent that runs against your codebase using multiple narrow AI agents working in parallel. It hit 590 stars in roughly two weeks after its May 18, 2026 launch, which is a strong signal for a security tool in a space crowded with "AI finds bugs" projects that mostly don't work.

The project is created by Simone Margaritelli, better known as evilsocket — the security researcher behind bettercap (the Swiss Army knife for network attacks, 16K+ stars) and nzyme (wireless intrusion detection). He's been building offensive security tools for over a decade. This matters because most AI code audit tools are built by ML engineers who've never written an exploit. Margaritelli has, and it shows in the design decisions.

The core idea comes from Cloudflare's Project Glasswing blog post, which tested Anthropic's models against Cloudflare's own codebase and found that real vulnerability discovery doesn't come from asking one big model "find bugs here." It comes from many narrow agents working on tightly-scoped questions, deliberate disagreement between agents on different models, reachability tracing to filter out noise, and a feedback loop that turns confirmed bugs into new hunts. audit packages that entire pipeline into a runnable tool.

### Why it matters

Security tooling for developers is in a weird spot. SAST tools (Semgrep, CodeQL, SonarQube) catch known patterns but miss logic bugs. Penetration testing is expensive and happens too late. And the wave of "AI finds your bugs" tools launched in 2024-2025 mostly produced high false-positive rates that made developers ignore them entirely.

audit takes a fundamentally different approach. Instead of pattern matching or asking a single LLM to review everything, it orchestrates multiple specialized agents — a Recon agent that maps the codebase and generates narrowly-scoped Hunt tasks, Hunt agents that each focus on one attack class, a Validate agent on a *different model* that tries to disprove findings, a Trace agent that proves attacker-controlled input can actually reach the vulnerability, and a Feedback agent that turns confirmed bugs into new hunts. This adversarial multi-agent pipeline is what makes the results actually usable.

For fullstack developers running React frontends with NestJS or Django backends and Go microservices, this is the first tool that can audit your entire stack in one pass — from API endpoints to database queries to authentication flows — without requiring you to write custom rules or configure language-specific analyzers.

### Key Features

**8-Stage Pipeline Architecture.** The tool splits vulnerability discovery into Recon, Hunt, Validate, Gapfill, Dedupe, Trace, Feedback, and Report stages. Each stage runs as a separate agent with its own prompt and JSON schema, so outputs are structured and predictable. This isn't "dump code into a prompt and hope" — it's an engineered pipeline where each stage has a specific job and feeds results to the next.

**Adversarial Validation with Model Disagreement.** The Hunt stage uses Sonnet to find potential bugs, and the Validate stage uses Opus to try to *disprove* them. Using different models for finding versus validating is a clever design — it prevents the echo-chamber effect where the same model confirms its own hallucinations. Findings that survive adversarial validation have much higher signal.

**Reachability Tracing.** Most "AI found a vulnerability" reports are noise because they can't prove an attacker-controlled input actually reaches the vulnerable code. The Trace stage walks the call graph and proves (or disproves) that external input flows from an entry point to the sink. Findings that don't trace are dropped. This single feature eliminates the majority of false positives.

**Live-Target Reproduction.** Point the agents at a running deployment with `--target-url` and `--target-creds`, and the tool reproduces findings against the live service instead of just compiling local proof-of-concepts. Hunt agents send real HTTP requests, Validate rejects findings that don't reproduce, and Trace confirms reachability with actual network round-trips. Network egress is restricted to the target host only.

**Git History Mining.** Recon greps the repository's git history for past security patches — looking for CVE references, `sec:` commit prefixes, `fix.*auth`, `sanitize` patterns. Patched files are hardened, but sibling files using the same idiom often aren't. The tool automatically seeds hunts against unpatched copies, catching cross-component bugs that pattern-matching tools miss entirely.

**Cost Containment Controls.** A real production codebase can generate 15-50 Hunt tasks and 25+ findings. The tool includes `--max-concurrency`, `--max-recon-tasks`, and `--max-cost-usd` flags with per-task budget checks that cooperatively abort rather than blowing past your limit. You can run a meaningful audit for $10-30 on most codebases.

**Multi-Provider Model Support.** Ships with Claude subscription billing by default (no API key needed if you use `claude login`), but supports OpenRouter, Amazon Bedrock, Google Vertex, and any Anthropic-compatible gateway. You can mix models per stage via `config/stages.yaml` — use Opus for validation and a cheaper model for initial hunts.

### Use Cases

- **Pre-deployment security review** — Run the audit against your NestJS or Django API before shipping to production. The Trace stage filters out theoretical vulnerabilities and only reports what's actually reachable from external input.
- **Legacy codebase assessment** — Inherited a Go microservice or React app with no security review history? The git history mining feature identifies patterns that were patched in some files but not others, finding bugs you'd never spot by reading code.
- **CI/CD integration** — Use `--max-cost-usd 10` and `--max-concurrency 1` to run a bounded audit on every PR. The structured JSON output feeds directly into your review process.
- **Third-party dependency audit** — Point it at a vendor SDK or open-source library you're evaluating. The multi-agent approach catches logic bugs that dependency scanners miss.
- **Compliance and due diligence** — Generate structured reports for SOC 2 or ISO 27001 evidence. The schema-validated output means you get consistent, auditable results every run.

### Pros and Cons

Pros:
- The adversarial multi-agent design genuinely reduces false positives compared to single-LLM approaches. Cloudflare's own testing showed this architecture outperforms naive "find bugs" prompting by a significant margin.
- Built by a security researcher with 15+ years of offensive security experience, not an ML team that's never written an exploit. The prompts and schemas reflect real attack patterns.
- MIT licensed with no vendor lock-in. Supports multiple model providers and can run entirely on your Claude subscription without metered API costs.

Cons:
- Requires a Claude Pro or Max subscription (or OpenRouter credits) to run. The tool uses the Claude Code Agent SDK, so you're dependent on Anthropic's model availability even with gateway support.
- Hunt agents run with Bash access inside per-task scratch directories but are not OS-level sandboxed. Running against untrusted code requires a disposable VM or container — the README is honest about this.
- The 8-stage pipeline is expensive on large codebases. Even with cost controls, a full audit of a 100K+ LOC repository can run $20-50. Not something you'll run on every commit without budget considerations.

### Getting Started

```bash
# 1. Clone and install
git clone https://github.com/evilsocket/audit.git
cd audit
python -m venv .venv && source .venv/bin/activate
pip install -e .

# 2. Authenticate (pick one)
#    (a) Interactive: claude login
#    (b) Headless/CI: claude setup-token, then set CLAUDE_CODE_OAUTH_TOKEN in .env

# 3. Verify auth
audit auth-check

# 4. Run against your project
audit run --repo /path/to/your/project --run-id my-first-audit

# 5. Check status
audit status --run-id my-first-audit

# 6. Generate report
audit report --run-id my-first-audit --format md > report.md
```

For cost-controlled runs against production codebases:

```bash
audit run --repo /path/to/target \
  --max-concurrency 1 \
  --max-recon-tasks 15 \
  --max-cost-usd 30 \
  --run-id bounded-audit
```

### Alternatives

**Semgrep** — The most popular open-source SAST tool with a large rule library for known vulnerability patterns. Semgrep is faster and cheaper per scan, but it only catches patterns you've written rules for. audit finds logic bugs and novel vulnerability classes that pattern matching can't reach. Use Semgrep for fast CI checks, audit for deeper security reviews.

**Snyk Code** — Real-time SAST integrated into your IDE and CI pipeline. Snyk is better for developer workflow integration and catches common issues early, but its AI features are more limited than audit's multi-agent approach. Use Snyk for continuous monitoring, audit for periodic deep scans.

**GitHub CodeQL** — Semantic code analysis engine that lets you write queries to find vulnerability patterns. CodeQL is extremely powerful for known vulnerability classes and has zero false positives on well-written queries, but requires significant expertise to write custom queries. Use CodeQL for targeted searches, audit for broad discovery without custom query authoring.

### Verdict

This is the most practical AI security tool I've seen for real-world codebases. The 8-stage adversarial pipeline isn't just marketing — it's a direct implementation of architecture that Cloudflare validated against their own production code, and the reachability tracing alone eliminates the false-positive problem that makes most AI audit tools useless. Simone Margaritelli's background in offensive security means the prompts and schemas reflect how actual attackers think, not how ML researchers think attackers should think. At 590 stars two weeks in, the community is voting with their stars. The tool is early (2 open issues, API still settling), and the Claude dependency means you're tied to Anthropic's ecosystem for now. But if you're a fullstack developer running React, NestJS, Django, or Go services and you care about security — and you should — this is worth running against your codebase today.
