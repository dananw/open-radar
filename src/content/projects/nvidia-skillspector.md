---
name: nvidia-skillspector
description: "NVIDIA SkillSpector is an open-source security scanner for AI agent skills — 64 vulnerability patterns, two-stage analysis, and risk scoring for Claude Code, Codex, and MCP tools."
url: https://github.com/NVIDIA/SkillSpector
stars: 2669
forks: 212
language: Python
tags: ["ai-security", "agent-skills", "vulnerability-scanner", "nvidia", "mcp"]
featured: false
publishedAt: 2026-06-12
---

## NVIDIA SkillSpector

### Overview

SkillSpector is an open-source security scanner built by NVIDIA that checks AI agent skills for vulnerabilities, malicious patterns, and security risks before you install them. It launched in March 2026 and has accumulated 2,600+ stars on GitHub, which tracks with the urgency of the problem it addresses. If you're running Claude Code, Codex CLI, Gemini CLI, or any agent that loads third-party skills, you need something like this.

The project comes out of NVIDIA's research division, backed by the paper "Agent Skills in the Wild: An Empirical Study of Security Vulnerabilities at Scale" (Liu et al., 2026). The researchers scanned 42,447 skills from major marketplaces and found that 26.1% contain at least one vulnerability, while 5.2% show likely malicious intent. Skills with executable scripts are 2.12x more likely to be vulnerable. Those numbers are hard to ignore.

The core problem is straightforward: AI agent skills execute with implicit trust and minimal vetting. When you install a skill for Claude Code or Codex, it often gets access to your filesystem, environment variables, network, and shell. There's no app store review process, no permission system, no sandboxing by default. SkillSpector fills that gap by giving you a security report before you let a skill run on your machine.

### Why it matters

The AI agent ecosystem is growing fast, and the security tooling hasn't kept pace. Every week brings new skill marketplaces, MCP servers, and agent extensions. Developers are installing these with the same casualness they'd install an npm package, but the blast radius is much larger — a malicious skill can read your SSH keys, exfiltrate your environment variables, or modify your codebase in ways you won't notice until it's too late.

NVIDIA's research numbers paint a clear picture: one in four skills has a vulnerability, and one in twenty is likely malicious. This isn't theoretical. The attack surface includes prompt injection, data exfiltration, privilege escalation, memory poisoning, supply chain attacks, and MCP-specific threats like tool poisoning and least-privilege violations. SkillSpector covers all of these with 64 detection patterns across 16 categories.

What makes this tool particularly relevant right now is the MCP explosion. As more developers build and share MCP servers, the need for automated security vetting becomes critical. SkillSpector already includes MCP-specific analyzers for least-privilege violations and tool poisoning — patterns that most security tools don't even know to look for.

### Key Features

**64 Vulnerability Patterns Across 16 Categories.** This is the most comprehensive detection set I've seen for agent skill security. Categories include prompt injection (5 patterns), data exfiltration (4), privilege escalation (3), supply chain (6), excessive agency (4), output handling (3), system prompt leakage (3), memory poisoning (3), tool misuse (3), rogue agent (2), trigger abuse (3), behavioral AST (8), taint tracking (5), YARA signatures (4), MCP least privilege (4), and MCP tool poisoning (4). Each pattern has a severity level and confidence score.

**Two-Stage Analysis Pipeline.** Stage 1 is fast static analysis using regex pattern matching, AST-based behavioral analysis, and live vulnerability lookups via OSV.dev. Stage 2 is optional LLM semantic analysis that evaluates context and intent, filters false positives, and provides human-readable explanations. The static stage catches most issues with high recall; the LLM stage improves precision to around 87%. You can skip the LLM stage with `--no-llm` for faster scans.

**Live Vulnerability Lookups via OSV.dev.** The SC4 analyzer queries the OSV.dev API in real time to check dependencies against tens of thousands of CVEs across PyPI and npm. No API key required. Queries are batched, results are cached for one hour, and there's an automatic offline fallback if the API is unreachable. This catches known vulnerable dependencies that static pattern matching would miss.

**MCP-Specific Security Analyzers.** SkillSpector includes dedicated analyzers for MCP (Model Context Protocol) threats — a category most security tools haven't caught up with yet. The least-privilege analyzer detects when code uses capabilities not listed in declared permissions, wildcard permissions, and missing permission declarations. The tool-poisoning analyzer catches hidden instructions in metadata, Unicode deception attacks, parameter description injection, and description-behavior mismatches.

**Risk Scoring with Clear Recommendations.** Every scan produces a 0-100 risk score with severity labels: LOW (0-20, SAFE), MEDIUM (21-50, CAUTION), HIGH (51-80, DO NOT INSTALL), CRITICAL (81-100, DO NOT INSTALL). CRITICAL issues add 50 points, HIGH adds 25, MEDIUM adds 10, LOW adds 5. Executable scripts get a 1.3x multiplier. The scoring is transparent and tunable.

**Multiple Output Formats.** Terminal output for interactive use, JSON for programmatic integration, Markdown for documentation, and SARIF for CI/CD pipelines and IDE tooling. The SARIF support is particularly useful — you can integrate skill scanning into your GitHub Actions workflow and get findings in the same security dashboard as your other code scanning results.

**Multi-Format Input.** Scan Git repos, URLs, zip files, directories, or single SKILL.md files. This flexibility matters because skills are distributed in different ways — some live in Git repos, some are downloaded as zip files, some are just markdown files with embedded scripts.

### Use Cases

- **Pre-installation vetting** — Run `skillspector scan https://github.com/user/skill` before installing any third-party agent skill. This should be a reflex, like running `npm audit` before deploying.
- **CI/CD security gates** — Integrate SARIF output into your GitHub Actions or GitLab CI pipeline to automatically scan skill dependencies on every commit. Block merges when critical or high-severity findings appear.
- **MCP server auditing** — Use the MCP-specific analyzers to verify that community MCP servers follow least-privilege principles and don't contain tool-poisoning patterns before connecting them to your agents.
- **Security research and red-teaming** — The comprehensive pattern set and Python API make it useful for security researchers studying the agent skill ecosystem. Run batch scans across marketplaces to identify trends.
- **Enterprise skill governance** — Organizations deploying AI agents at scale can use SkillSpector to establish security baselines for approved skills, with JSON output feeding into internal compliance dashboards.

### Pros and Cons

Pros:
- The 64-pattern detection set is the most comprehensive available for agent skill security, covering everything from basic prompt injection to advanced taint tracking and YARA signatures. No other tool comes close to this coverage.
- The two-stage pipeline (static + LLM) gives you fast scans when you need speed and deeper analysis when you need precision. The `--no-llm` flag means you can run it without API keys or in air-gapped environments.
- MCP-specific analyzers address an attack surface that most security tools haven't recognized yet. As MCP adoption grows, this early coverage becomes increasingly valuable.
- SARIF output enables integration with existing CI/CD and IDE security tooling, which means you don't need a separate workflow for skill scanning.

Cons:
- The LLM semantic analysis requires API access to OpenAI, Anthropic, or NVIDIA build, which adds cost and latency to scans. The static-only mode is faster but has more false positives.
- The research backing is strong (42,447 skills analyzed), but the tool itself is relatively new. The pattern set will need continuous updates as attackers develop new techniques specific to agent ecosystems.
- Non-English content, image-based attacks, and encrypted/binary code are explicitly listed as limitations. If skills embed malicious payloads in non-Latin scripts or images, they'll slip through.

### Getting Started

```bash
# Clone and install
git clone https://github.com/NVIDIA/skillspector.git
cd skillspector
python3 -m venv .venv && source .venv/bin/activate
make install

# Scan a local skill directory (static analysis only)
skillspector scan ./my-skill/

# Scan a Git repository
skillspector scan https://github.com/user/my-skill

# Scan with LLM semantic analysis (requires API key)
export SKILLSPECTOR_PROVIDER=openai
export OPENAI_API_KEY=sk-...
skillspector scan ./my-skill/

# Generate a SARIF report for CI/CD
skillspector scan ./my-skill/ --format sarif --output report.sarif

# JSON output for programmatic use
skillspector scan ./my-skill/ --format json --output report.json
```

For Python API integration:

```python
from skillspector import graph

result = graph.invoke({
    "input_path": "/path/to/skill",
    "output_format": "json",
    "use_llm": True,
})

print(f"Risk Score: {result['risk_score']}/100")
print(f"Severity: {result['risk_severity']}")
for finding in result["filtered_findings"]:
    print(f"[{finding['severity']}] {finding['rule_id']}: {finding['message']}")
```

### Alternatives

**ClawPatrol by Deno** — A security firewall for AI agents that operates at the wire level, parsing agent traffic and gating actions against HCL rules. Where SkillSpector scans skills before installation, ClawPatrol monitors and controls agent behavior at runtime. Different layer of the security stack. Use ClawPatrol when you need runtime enforcement, SkillSpector when you need pre-installation vetting.

**Semgrep with custom rules** — You could write custom Semgrep rules to catch some of the patterns SkillSpector detects (exec calls, env variable access, network exfiltration). Semgrep is more mature and has better IDE integration, but it doesn't understand agent skill semantics, MCP protocols, or the specific attack patterns in the agent ecosystem. Use Semgrep for general code security; use SkillSpector for agent-specific threats.

**Manual code review** — Reading every skill's source code before installation is the gold standard, but it doesn't scale. With 42,000+ skills in the ecosystem and new ones appearing daily, automated scanning is the only practical approach. SkillSpector's static analysis gives you 80% of the value at 5% of the time cost.

### Verdict

SkillSpector is the security tool the AI agent ecosystem needed yesterday. The research backing is solid — scanning 42,447 skills and finding 26.1% vulnerable isn't a toy dataset. The 64-pattern detection set covers attack vectors that most developers haven't even considered yet, particularly around MCP tool poisoning and memory poisoning. If you're building with AI agents in production, running SkillSpector before installing any third-party skill should be as automatic as running `npm audit` or `pip check`. It's not perfect — the LLM analysis adds cost, and the tool is still young — but it's the best option available right now, and it's backed by NVIDIA's security research team. That combination of research depth and practical tooling is rare.
