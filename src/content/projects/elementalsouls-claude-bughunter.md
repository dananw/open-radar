---
name: claude-bughunter
description: "Claude-BugHunter is a 71-skill bundle for Claude Code that turns your AI agent into a senior bug-hunting researcher with 681 disclosed-report patterns across 24 vulnerability classes."
url: https://github.com/elementalsouls/Claude-BugHunter
stars: 2173
forks: 331
language: Python
tags: ["security", "bug-bounty", "claude-code", "pentesting", "ai-agents"]
featured: false
publishedAt: 2026-06-14
---

## Claude-BugHunter

### Overview

Claude-BugHunter is a drop-in skill bundle that transforms Claude Code from a general-purpose coding assistant into a focused bug-hunting and red-team operator. It ships 71 skills, 15 slash commands, and 681 disclosed-report patterns curated across 24 core vulnerability classes. Since its May 2026 release, it has accumulated over 2,100 GitHub stars and a growing community of security researchers and fullstack developers using it to audit their own applications.

The project is built by Sachin Sharma, a bug hunting and GenAI security researcher. What sets this apart from generic "security audit" prompts is the depth of real-world pattern curation — the 681 patterns come from actual disclosed HackerOne reports, not abstract OWASP descriptions. That means the skills carry chain templates, bypass techniques, and payload variations that real triagers have paid for, which is a fundamentally different knowledge base than what you get from a textbook.

The core problem it solves is scale. Most developers know they should test their applications for security vulnerabilities, but the gap between "I should check for XSS" and "I can systematically hunt for 15 different XSS variants across my React frontend, NestJS API, and Go microservices" is enormous. Claude-BugHunter bridges that gap by encoding expert-level hunting methodology into skills that load automatically based on what you're testing.

### Why it matters

Security tooling for individual developers has been stuck in two extremes: automated scanners that find obvious issues but miss logic bugs, and manual pentesting that requires years of specialized experience. AI agents are changing this equation, but only if they carry the right knowledge. A generic LLM can explain what SSRF is; Claude-BugHunter can walk through 23 different SSRF chain templates with specific bypass techniques for common WAF configurations.

The timing connects to a real industry shift. Bug bounty programs on HackerOne and Bugcrowd have paid out over $300 million to researchers, and the demand for security testing far outstrips the supply of qualified testers. For fullstack developers building with React, NestJS, Django, or Go, having a tool that can systematically audit your application against patterns from 681 real vulnerability reports is genuinely useful — not as a replacement for professional pentests, but as a first-pass quality gate before you ship.

The Claude Code integration is what makes this practical. You describe what you're testing in plain English and the relevant skills load automatically. No memorizing command syntax, no configuring rule sets. Point it at your local dev server and say "test this API for authentication bypass" and it knows what to do.

### Key Features

**71 Auto-Loading Skills.** The skills are organized across 13 web application hunting classes (XSS, SQLi, SSRF, IDOR, LFI, SSTI, XXE, CSRF, CORS, open-redirect, and more), 7 authentication and identity skills, 15 API and infrastructure skills, and 6 advanced concurrency and deserialization skills. Each skill loads based on topic detection — describe your target and the right skills activate without explicit invocation.

**681 Disclosed-Report Patterns.** Every hunt-* skill encodes patterns from real HackerOne disclosed reports. This isn't theoretical — the XSS skill alone carries multiple variant chains including mutation XSS, DOM clobbering to XSS, and filter bypass techniques that worked against production applications. The patterns include the actual payloads, the reasoning chain, and the validation steps that triagers accepted.

**Enterprise Attack Surface Coverage.** Beyond web application hunting, the bundle includes skills for M365/Entra ID, Okta-as-IdP, on-premises SharePoint, VMware vCenter, SSL VPN appliances (Cisco, Fortinet, Citrix, Palo Alto, Pulse, SonicWall, F5), and cloud IAM misconfigurations. This makes it relevant for external red-team engagements, not just bug bounty hunting.

**Four-Harness Portability.** The skills run on Claude Code, OpenCode, OpenAI Codex CLI, and Hermes Agent. One install command copies skills to every harness's path. The knowledge layer ports everywhere; slash commands and the /hunt engine stay Claude-Code-specific by design.

**Engagement Folder Scaffolding.** The `cbh` CLI creates structured engagement folders with state tracking, evidence organization, and submission ID management. This solves the messy-folder problem that plagues manual bug hunting — findings, screenshots, and reports stay organized throughout an engagement.

**7-Question Validation Gate.** Before anything gets submitted, the triage-validation skill runs a 7-question gate that checks scope, program acceptance, impact assessment, and evidence quality. This prevents the common mistake of submitting out-of-scope or low-quality reports that waste everyone's time.

**Burp Suite MCP Integration.** The bundle integrates with Burp Suite through MCP, letting Claude Code drive Burp's scanning capabilities directly. This combines AI-guided reasoning with traditional automated scanning in a single workflow.

### Use Cases

- **Fullstack developers auditing their own applications** — Point Claude-BugHunter at your React/NestJS or Django/Go stack before deploying. It systematically tests for the vulnerability classes most relevant to your tech stack, using patterns from real-world reports.
- **Security researchers running bug bounty engagements** — Use the engagement scaffolding and 681 pattern library to work HackerOne or Bugcrowd targets more efficiently. The hypothesis discipline enforced by the methodology skills prevents wasted effort on low-probability findings.
- **Development teams running pre-release security reviews** — Integrate the /hunt command into your CI/CD pipeline or pre-release checklist. The skills produce structured findings with file:line references that developers can act on immediately.
- **Red-team operators conducting external assessments** — The enterprise platform skills cover the initial-access phase of external red-team engagements against monitored enterprise targets, including current 2024-2026 CVE chains.
- **Security-conscious startups without dedicated AppSec teams** — Use Claude-BugHunter as a first-pass security review before engaging professional pentesters. It won't replace a human expert, but it catches the obvious issues and raises the baseline.

### Pros and Cons

Pros:
- The 681 disclosed-report patterns represent real-world attack knowledge that would take years to accumulate manually. Each pattern includes payloads, bypass techniques, and validation steps from reports that actually paid out.
- Auto-loading skills based on topic detection means zero configuration overhead. You describe your target in plain English and the right skills activate.
- The 7-question validation gate and evidence hygiene skills enforce professional discipline that prevents sloppy submissions — a real problem in the bug bounty community.
- Four-harness portability means the knowledge layer works across Claude Code, Codex CLI, OpenCode, and Hermes Agent without modification.

Cons:
- The bundle is explicitly scoped to external attack surfaces only. Internal Active Directory attacks, C2 frameworks, post-exploitation, and lateral movement are deliberately excluded. If you need internal red-team capabilities, you'll need separate tooling.
- Claude Code's runtime cyber safeguards can block authorized offensive security work by default. You need to enroll in Anthropic's Cyber Verification Program (CVP) to get safeguards adjusted for legitimate dual-use work, which adds friction.
- The 71 skills generate significant context when multiple load simultaneously. Complex engagements that activate many skills at once can push against context window limits, requiring careful session management.
- It requires Claude Code specifically for the full experience. The slash commands and /hunt engine are Claude-Code-only; other harnesses get the knowledge layer but lose the interactive command interface.

### Getting Started

```bash
# Option A: Install as a Claude Code plugin (recommended)
# From inside Claude Code:
/plugin marketplace add elementalsouls/Claude-BugHunter
/plugin install claude-bughunter@elementalsouls

# Option B: Copy install (no plugin system)
git clone https://github.com/elementalsouls/Claude-BugHunter.git
cd Claude-BugHunter
bash scripts/install.sh

# Install with Burp MCP integration and all harnesses
bash scripts/install.sh --all --burp-mcp
```

Once installed, open Claude Code and describe what you're testing:

```
> Testing my React + NestJS app at localhost:3000 — check for authentication
  bypass and IDOR vulnerabilities in the API endpoints.

  ⟳ loading skills: hunt-auth-bypass, hunt-idor, bb-methodology ...
    → mapping API routes ... 23 endpoints found
    → testing auth bypass patterns on /api/users/:id ...
    → found: missing authorization check on GET /api/users/:id (IDOR)
```

### Alternatives

**OWASP ZAP** — The established open-source web application security scanner. ZAP is fully automated and runs without an LLM, making it faster for bulk scanning and easier to integrate into CI/CD pipelines. But it operates on pattern matching, not reasoning — it can find known vulnerability signatures but struggles with logic bugs, chained exploits, and novel bypass techniques that Claude-BugHunter's reasoning-based approach handles better. Choose ZAP when you need automated, repeatable scans without LLM costs.

**Nuclei (ProjectDiscovery)** — A fast, template-based vulnerability scanner with a massive community template library. Nuclei excels at CVE detection and known-vulnerability checks across large attack surfaces. It's faster than any LLM-based tool for breadth-first scanning. But its templates are static patterns — they don't adapt to your specific application architecture or chain multiple findings into exploit scenarios. Choose Nuclei when you need speed and coverage across many targets, and pair it with Claude-BugHunter for deep, reasoning-based analysis.

**Snyk** — A developer-first security platform that integrates into your IDE and CI/CD pipeline. Snyk is better for dependency vulnerability scanning and container security — areas Claude-BugHunter doesn't cover. It also provides fix suggestions and automated PR remediation. Choose Snyk for supply-chain security and dependency management, and Claude-BugHunter for application-layer vulnerability hunting and bug bounty work.

### Verdict

Claude-BugHunter is the most practical application of AI to offensive security I've seen. The 681 disclosed-report patterns alone represent thousands of hours of curated knowledge from real bug bounty payouts, and wrapping that in auto-loading Claude Code skills makes it accessible to developers who aren't security specialists. It won't replace a professional pentester — the scope limitations and Claude's runtime safeguards make that clear — but as a pre-release security gate for fullstack applications, it fills a genuine gap. The 2,100+ stars in five weeks and the active community contributions suggest the pattern library will keep growing. If you're building with React, NestJS, Django, or Go and you're not running systematic security checks before deploy, this is the lowest-friction way to start.
