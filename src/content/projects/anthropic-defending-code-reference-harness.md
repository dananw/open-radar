---
name: anthropic-defending-code-reference-harness
description: "Anthropic's open-source autonomous vulnerability discovery framework for Claude — scan, triage, and patch security bugs with AI agents."
url: https://github.com/anthropics/defending-code-reference-harness
stars: 1001
forks: 79
language: Python
tags: ["security", "ai-agents", "vulnerability-scanning", "claude", "code-analysis"]
featured: false
publishedAt: 2026-06-05
---

## Anthropic Defending Code Reference Harness

### Overview

The Defending Code Reference Harness is Anthropic's open-source reference implementation for autonomous vulnerability discovery and remediation. It crossed 1,000 GitHub stars within two weeks of its May 22, 2026 release, driven largely by a front-page Hacker News thread with 242 points and intense discussion about whether LLMs can actually find real bugs in production code.

This isn't a toy demo. It comes from Anthropic's work with enterprise security teams through their Project Glasswing initiative, where Claude was deployed against real codebases to find C/C++ memory vulnerabilities. The harness implements a full pipeline — recon, threat modeling, scanning, triage, verification, and patch generation — with gVisor sandboxing to safely execute target code during verification. It ships as Claude Code skills you can run interactively and as an autonomous pipeline you can customize for your stack.

The core problem it addresses is the economics of security auditing. Manual code review catches roughly 1-5 bugs per thousand lines of code, costs $200-500 per hour for senior security engineers, and takes weeks for large codebases. Static analysis tools like Semgrep and CodeQL are fast but generate hundreds of false positives that still need human triage. This harness uses Claude to reason about code semantics — not just pattern match — and applies a multi-stage verification pipeline to filter false positives before they hit your inbox.

### Why it matters

Security tooling has been stuck in a rut. SAST tools give you a spreadsheet of findings. DAST tools tell you something might be exploitable. Both require significant human effort to triage and remediate. The result is that most organizations have a growing backlog of unfixed vulnerabilities that nobody wants to touch because the signal-to-noise ratio is terrible.

LLMs change this equation in a specific way: they can read code, understand intent, and reason about whether a finding represents an actual exploitable condition or a false alarm. Anthropic's harness takes this further by adding autonomous patch generation — not just finding the bug, but writing the fix and verifying it compiles and passes tests. That end-to-end loop from detection to verified fix is what makes this different from "run an LLM on your code and hope for the best."

The broader context matters too. The OWASP Agentic Top 10, released in late 2025, identified autonomous AI agents as both a security tool and a security risk. Anthropic's approach — sandboxed execution, explicit capability manifests, gVisor isolation — is a reference architecture for how to run AI agents safely against production code. If you're building any kind of AI-powered developer tool, this repo is worth studying for its safety patterns alone.

### Key Features

**Multi-Stage Vulnerability Pipeline.** The harness implements a five-stage pipeline: reconnaissance (understanding the codebase structure), threat modeling (identifying high-risk areas), scanning (finding potential vulnerabilities), triage (filtering false positives through multi-agent debate), and patching (generating and verifying fixes). Each stage is independently configurable and can be run standalone or as part of the full autonomous flow.

**Claude Code Skills for Interactive Use.** Six built-in skills — `/quickstart`, `/threat-model`, `/vuln-scan`, `/triage`, `/patch`, `/customize` — let you walk through the security workflow interactively. Run `/quickstart` to get a guided tour. Run `/threat-model` on your repo to identify attack surfaces. Run `/vuln-scan` to find issues. Each skill is a Claude Code command you invoke directly in your terminal.

**gVisor Sandbox Isolation.** The autonomous pipeline executes target code during verification, which is inherently dangerous. The harness refuses to run outside a gVisor sandbox unless you explicitly override it. The sandbox includes egress allowlists so the agent can't phone home during execution. A `scripts/setup_sandbox.sh` script handles the Docker and cgroup configuration, with recent fixes for rootless and nested Docker environments.

**ASAN-Based Verification for C/C++.** The reference implementation targets C/C++ memory vulnerabilities using AddressSanitizer. When the scanner identifies a potential buffer overflow, use-after-free, or other memory bug, it writes a test case, compiles with ASAN, and runs it in the sandbox. If ASAN fires, the finding is confirmed. This isn't pattern matching — it's actual execution-based verification that eliminates false positives.

**Customizable for Any Language and Vulnerability Class.** The `/customize` skill walks you through porting the harness to your stack. The general shape — recon, find, verify, report, patch — is language-agnostic. The docs describe how to swap the detector (ASAN for C/C++, Bandit for Python, Semgrep for anything), adjust prompts for your vulnerability class of interest, and configure the verification step for your build system.

**Agent SDK Cookbook Companion.** Anthropic published a companion cookbook on the Claude Agent SDK platform that walks through the same recon → find → triage → report → patch loop using only the SDK, without the full harness infrastructure. This is useful if you want to build your own pipeline from scratch or integrate vulnerability scanning into an existing CI system.

### Use Cases

- **C/C++ codebase security audits** — Teams maintaining legacy C/C++ code (embedded systems, game engines, infrastructure software) can run the harness against their codebase to find memory safety bugs that static analysis tools miss. The ASAN verification step means findings are confirmed, not theoretical.

- **Security team triage automation** — Organizations with large SAST finding backlogs can use the triage skill to have Claude evaluate each finding, determine exploitability, and prioritize what humans actually need to look at. This turns a spreadsheet of 500 findings into a focused list of 20 real bugs.

- **CI/CD security integration** — The Agent SDK cookbook shows how to integrate the scanning pipeline into continuous integration, so new commits are automatically checked for vulnerability patterns. The sandboxing makes this safe to run in automated environments.

- **Custom vulnerability research** — Security researchers can use the `/customize` skill to point the harness at specific vulnerability classes (SQL injection, SSRF, deserialization bugs) in specific languages. The multi-agent verification pipeline reduces the noise that makes automated vulnerability research tedious.

- **Teaching security concepts** — The well-documented pipeline stages and accompanying blog post make this a useful educational tool for teams learning how to think about threat modeling and vulnerability assessment systematically.

### Pros and Cons

Pros:
- The gVisor sandboxing and multi-stage verification pipeline are serious engineering, not a demo. Anthropic learned these patterns from real engagements with enterprise security teams, and the safety architecture is worth studying independently of the vulnerability scanning use case.
- Open source with no vendor lock-in. You can use it with Claude via the API, Bedrock, Vertex, or Azure. The harness is a reference implementation, so you can fork it and adapt it to your own infrastructure.
- The companion blog post and cookbook are unusually good documentation for an open-source security tool. The "Ramp Up" section gives a realistic timeline for getting value from the tool rather than promising instant results.

Cons:
- The reference implementation targets C/C++ memory vulnerabilities specifically. Porting to other languages and vulnerability classes requires meaningful work with the `/customize` skill — it's not plug-and-play for Python or JavaScript codebases.
- The repo explicitly states it "is not maintained and is not accepting contributions." This is a reference implementation, not a community project. If you hit bugs or want features, you're on your own.
- Requires Claude API access and gVisor-compatible Docker for the autonomous pipeline. The interactive skills work in Claude Code without sandboxing, but the full autonomous flow has infrastructure requirements that add friction.

### Getting Started

```bash
# Clone the repo
git clone https://github.com/anthropics/defending-code-reference-harness
cd defending-code-reference-harness

# Open in Claude Code and run the guided tour
claude
> /quickstart

# Run a threat model on your own codebase
> /threat-model /path/to/your/codebase

# Run a vulnerability scan
> /vuln-scan

# Triage findings
> /triage

# Set up the sandbox for autonomous pipeline execution
./scripts/setup_sandbox.sh

# Run the full autonomous pipeline
./bin/vp-sandboxed /path/to/target
```

For the SDK-only approach without the full harness, see the [companion cookbook](https://platform.claude.com/cookbook/claude-agent-sdk-06-the-vulnerability-detection-agent).

### Alternatives

**Semgrep** — The most popular open-source static analysis tool with a large rule library. Semgrep is faster and works across more languages out of the box, but it's pattern-based and generates significant false positives. Choose Semgrep when you need broad coverage and fast CI integration; choose the Anthropic harness when you need deeper reasoning about exploitability and want verified findings.

**CodeQL** — GitHub's semantic code analysis engine that queries code like a database. CodeQL is more mature and has a larger community of query authors, but it requires learning QL (a custom query language) and doesn't generate patches. Choose CodeQL when you have dedicated security engineers who can write and maintain custom queries; choose the Anthropic harness when you want an AI agent to do the heavy lifting.

**Snyk** — A commercial developer security platform that scans code, dependencies, containers, and infrastructure. Snyk is more polished and integrates with more developer workflows, but it's a SaaS product with per-seat pricing. Choose Snyk when you want a managed security solution with broad coverage; choose the Anthropic harness when you want to build your own pipeline with full control and no vendor dependency.

### Verdict

This is the most credible open-source attempt at autonomous vulnerability discovery I've seen. The key word is "credible" — not because it's perfect, but because Anthropic is honest about what it is. The repo calls itself a reference implementation, not a product. The docs acknowledge it won't work on every codebase out of the box. The gVisor sandboxing shows they take the safety implications seriously. And the 1,000 stars in two weeks on a non-maintained reference repo tells you the security community is hungry for this kind of tool.

The practical value right now is highest for C/C++ shops with memory safety concerns and for security teams drowning in SAST false positives. If you're writing TypeScript or Python web apps, the reference implementation won't help you directly — but the architecture patterns, the multi-agent triage approach, and the Agent SDK cookbook are worth studying if you're building any kind of automated security tooling. The fact that this exists as open source, with no vendor lock-in and clear documentation of the pipeline stages, makes it a solid foundation to build on rather than a finished product to deploy.
