---
name: aisoc
description: "AiSOC is an open-source, self-hostable AI Security Operations Center with LangGraph agents, 50+ connectors, and MITRE ATT&CK investigation — MIT-licensed."
url: https://github.com/beenuar/AiSOC
stars: 1331
forks: 137
language: Python
tags: ["cybersecurity", "ai-agents", "siem", "self-hosted", "open-source"]
featured: false
publishedAt: 2026-06-05
---

## AiSOC

### Overview

AiSOC is an open-source, self-hostable AI Security Operations Center. It hit 1,300 GitHub stars within a month of its May 2026 launch, which is notable for a security tool — that space moves slower than the JavaScript ecosystem, and trust is harder to earn.

The project is built by a team that clearly knows SOC operations. The architecture reads like someone who's spent years stitching together Splunk, CrowdStrike, and a dozen SaaS security tools, then decided to burn it all down and rebuild it as a single, coherent stack. The orchestrator is a ~600-line LangGraph in Python. The frontend is Next.js. There are Go-based osquery extensions. And the whole thing runs on your infrastructure with zero callbacks to a vendor cloud.

The core pitch: security teams currently buy a SIEM from one vendor, a SOAR from another, threat intel from a third, and then hire consultants to make them talk to each other. AiSOC collapses that into one stack. You get alert ingestion from 50+ sources, real-time correlation with deduplication, AI-driven investigation grounded in MITRE ATT&CK, and automated response — all MIT-licensed and self-hostable. The agent's prompts, tool calls, and rationale are logged step-by-step in an "Investigation Ledger" that's replayable later. That transparency alone sets it apart from every closed-source AI SOC vendor.

### Why it matters

The security operations market is dominated by closed-source vendors charging enterprise prices. Splunk, CrowdStrike, SentinelOne, Palo Alto — they all sell proprietary platforms where the AI investigation is a black box. You see the output, but you can't inspect the reasoning. For regulated industries (finance, healthcare, government), that's becoming a compliance problem.

AiSOC addresses a real gap: an open-source SOC where the AI agent is as inspectable as the code it runs on. The project ships a public eval harness that gates every PR — a 200-incident synthetic dataset, a 1,000-alert noisy stream, and per-template macro scores. That's not marketing; it's CI-gated quality assurance for security detection logic.

For fullstack developers, AiSOC is also a masterclass in building complex multi-service applications. The stack touches Python (FastAPI), TypeScript (Next.js), Go (osquery extensions), Kafka, Postgres, Redis, Neo4j, ClickHouse, and Qdrant. If you want to see how a production-grade polyglot system is architected — with proper tenant isolation, credential vaults, and multi-cloud Terraform — this repo is worth studying even if you never deploy it.

### Key Features

**50+ Click-and-Connect Data Sources.** The connector catalog spans EDR/XDR (CrowdStrike, SentinelOne, Microsoft Defender), SIEM (Splunk, Sentinel, Elastic, Datadog), cloud (AWS Security Hub, GuardDuty, Azure Activity, GCP SCC), identity (Okta, Entra, Auth0), SaaS (M365, Google Workspace, Cloudflare, ServiceNow), and more. Each connector renders a schema-driven form, runs a live test connection before save, and encrypts every secret with Fernet AES-128-CBC + HMAC-SHA256 in a CredentialVault.

**LangGraph Multi-Agent Investigation.** Four specialized agents — DetectAgent, TriageAgent, HuntAgent, RespondAgent — form a pipeline orchestrated by a ~600-line LangGraph. Every LLM call is logged with the full prompt, response, evidence cited, and downstream tool calls. The Investigation Ledger makes agent decisions auditable and replayable, which is a requirement for any SOC operating under regulatory frameworks.

**Public Eval Harness CI-Gated on Every PR.** Five test suites gate every merge: a 200-incident synthetic dataset from 55 templates, a 1,000-alert noisy stream for alert-reduction measurement, a schema/coverage gate validating ~360 backing events across 14 log sources, and per-template macro scores so a single broken template can't hide behind 199 working ones. This is how security tooling should be validated.

**MCP Server for IDE Integration.** AiSOC ships an MCP server (`@aisoc/mcp` on npm) so analysts can query alerts, run investigations, and replay agent decisions from Claude Desktop, Cursor, Continue, or Cody. Thirteen tools cover discovery, deep-dive, lake queries, and the action/replay set. This is the kind of developer-facing integration that makes a security tool actually usable.

**Detection-as-Code with Eval Gates.** Detection rules follow a propose → review → eval-gate → promote lifecycle. Every proposal carries an eval result from the harness; candidates that regress MITRE accuracy can't be promoted. When an alert is marked as a false positive, the agent drafts a Sigma rule fix via LLM and creates a DAC proposal through the same human-review workflow. Closed-loop detection engineering.

**Multi-Cloud Terraform + One-Click Deploys.** First-class deployment configs for Fly.io (~$14/mo), Render (one-click), Railway, Coolify, Kubernetes/Helm, and Terraform skeletons for AWS, GCP Cloud Run, and Azure Container Apps. The one-shot demo boots from `git clone` to a seeded investigation in about 3.5 minutes warm.

**L0–L4 Automation Maturity Model.** Automation is gated through maturity tiers — L0 (manual) through L4 (fully autonomous with human sign-off). Per-action confidence thresholds (e.g., `block_ip ≥ 0.90`, `close_alert ≥ 0.60`) gate every autonomous decision. Tenant admins tune thresholds via API. Every guardrail decision is logged.

### Use Cases

- **Security teams replacing expensive SIEM/SOAR stacks** — AiSOC gives you correlation, investigation, and response in one self-hosted stack, eliminating the integration tax of stitching together Splunk + Tines + a threat intel feed.
- **Fullstack developers studying production polyglot architecture** — the codebase touches Python, TypeScript, Go, Kafka, Neo4j, ClickHouse, and Qdrant with proper tenant isolation and credential management. It's a real-world reference for building complex multi-service systems.
- **Regulated industries requiring auditable AI** — the Investigation Ledger logs every LLM prompt, response, and tool call. For SOC 2, ISO 27001, NIST CSF, PCI-DSS, or HIPAA environments, that audit trail is a compliance requirement, not a nice-to-have.
- **MSSPs managing multiple clients** — the multi-tenant RLS model with a parent-tenant console supports onboarding child tenants, cross-tenant action delegation, and rollup metrics.
- **Security engineers building custom detections** — the Detection-as-Code pipeline with eval gates, natural-language detection authoring (English → Sigma + KQL + SPL + ES|QL), and closed-loop FP feedback makes detection engineering accessible.

### Pros and Cons

Pros:

- MIT-licensed with zero vendor lock-in — the entire stack runs on your infrastructure with no callbacks. The orchestrator is small enough (~600 lines of LangGraph) to read end-to-end and modify.
- The Investigation Ledger is genuinely novel. Every agent decision is logged with full prompts, responses, evidence, and tool calls. No other open-source SOC does this.
- The eval harness is CI-gated and public, not marketing fluff. 200-incident synthetic dataset, 1,000-alert stream, per-template macro scores. This is how security tooling should be validated.
- Deployment flexibility is excellent — from a one-click Render deploy to production-grade Kubernetes/Helm with ClickHouse, Kafka, OpenSearch, Neo4j, and Qdrant.
- Active development with 52 first-party connectors, 800+ native detection rules, and a v7.4.0 release within a month of launch.

Cons:

- The full production stack (ClickHouse, Kafka, OpenSearch, Neo4j, Qdrant) is resource-heavy. The demo profile is lean, but a real deployment needs serious infrastructure budget.
- Preview status with 89K lines of README suggests the project is ambitious but still settling its API surface. Expect breaking changes in the near term.
- The LLM dependency for agent investigation means you need API keys for OpenAI or Anthropic for the AI features. A deterministic fallback mode exists but is less capable.
- The AGPL license on some components and the sheer breadth of the feature set (50+ connectors, MSSP console, CSPM, UEBA, honeytokens) may overwhelm teams looking for a simpler starting point.

### Getting Started

```bash
# One-click installer — zero prerequisites (Linux/macOS)
curl -fsSL https://raw.githubusercontent.com/beenuar/AiSOC/main/install.sh | bash

# Or clone and run the demo with Docker
git clone https://github.com/beenuar/AiSOC.git
cd AiSOC
pnpm aisoc:demo

# Quick 4-case demo (under 4 minutes)
pnpm aisoc:demo --quick
```

The demo auto-logs you in as `demo@tryaisoc.com` and lands on a seeded LockBit 3.0 ransomware investigation (`INC-RT-001`). Stop with `pnpm aisoc:demo:down`.

For Claude Desktop / Cursor integration:

```bash
npx -y @aisoc/mcp install --host claude \
  --aisoc-url https://aisoc.your-company.com \
  --api-key aisoc_pat_xxxxxxxxxxxx
```

### Alternatives

**Wazuh** — The most popular open-source SIEM with 1,200+ detection rules and a large community. Wazuh is more mature and has a wider deployment base, but lacks AiSOC's AI-driven investigation, Investigation Ledger, and Detection-as-Code pipeline. Choose Wazuh if you need a battle-tested SIEM without the AI layer.

**Splunk Enterprise Security** — The industry standard for SIEM with 1,000+ apps and a massive ecosystem. Splunk is proprietary, expensive (per-ingest-GB pricing), and its AI features (Splunk AI Assistant) are partial at best. Choose Splunk if your organization is already invested in the ecosystem and budget isn't a constraint.

**Shuffle SOAR** — An open-source SOAR platform focused on workflow automation. Shuffle is lighter weight and easier to get started with, but lacks AiSOC's correlation engine, detection management, and multi-agent investigation. Choose Shuffle if you only need SOAR automation without the full SOC stack.

### Verdict

AiSOC is the most ambitious open-source security project I've seen in 2026. The combination of a LangGraph multi-agent investigation engine, a public eval harness gated on every PR, and an Investigation Ledger that makes every AI decision auditable addresses the three biggest complaints about closed-source SOC platforms: opacity, unverifiable claims, and vendor lock-in. The 50+ connectors and 800+ detection rules mean it's not a toy — it's a real SOC platform that happens to be open-source. The tradeoff is complexity: the full production stack requires ClickHouse, Kafka, OpenSearch, Neo4j, and Qdrant, which is not a weekend hobby project to operate. But for security teams at organizations that need an auditable, self-hosted AI SOC — especially in regulated industries — AiSOC is worth serious evaluation. The 1,300 stars in a month and rapid iteration to v7.4.0 suggest a team that's shipping fast and listening to users.
