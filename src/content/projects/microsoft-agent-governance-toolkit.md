---
name: microsoft-agent-governance-toolkit
description: "Microsoft's open-source toolkit for governing autonomous AI agents — policy enforcement, zero-trust identity, execution sandboxing, and audit logging. Covers 10/10 OWASP Agentic Top 10."
url: https://github.com/microsoft/agent-governance-toolkit
stars: 3925
forks: 539
language: Python
tags: ["ai-agents", "security", "governance", "python", "typescript"]
featured: false
publishedAt: 2026-06-04
---

## Microsoft Agent Governance Toolkit

### Overview

The Agent Governance Toolkit (AGT) is Microsoft's answer to a problem most teams haven't fully reckoned with yet: how do you control autonomous AI agents in production? It hit 3,900 GitHub stars within three months of its March 2026 launch, which is fast for a governance tool — most developers don't get excited about compliance frameworks. But AGT isn't really a compliance framework. It's a deterministic policy enforcement layer that sits between your AI agent and every external action it wants to take.

The project comes out of Microsoft's internal AI safety and security teams, the same people behind the AI Red Teaming Agent and the "Lessons from Red Teaming 100 Generative AI Products" report. That background shows. The toolkit covers all 10 categories of the OWASP Agentic Top 10 with deterministic controls — not prompt-level guardrails, not "please follow the rules" system prompts, but actual code-level interception of every tool call, message send, and agent delegation. The difference matters: Andriushchenko et al. (ICLR 2025) demonstrated a 100% attack success rate on GPT-4o, Claude 3, and Llama-3 using adaptive jailbreak attacks. Prompt-level safety is a polite request to a stochastic system. AGT makes misbehavior structurally impossible.

The core problem AGT solves is deceptively simple to state: your AI agent calls tools, browses the web, queries databases, and delegates to other agents. Once deployed, it makes decisions autonomously. You need to know if an action is allowed, which agent did it, and you need tamper-evident proof of what happened. OAuth scopes and IAM roles control which services an agent can reach, not what it does once connected. Five agents sharing a single API key means "an agent did it" is not an incident response.

### Why it matters

We're in the early innings of deploying autonomous agents in production, and the security tooling is lagging behind the capabilities. Every week there's a new framework for building agents — LangGraph, CrewAI, OpenAI Agents SDK, AutoGen — but almost nothing for governing them after deployment. If you're running agents that can send emails, query databases, modify files, or call external APIs, you need deterministic controls. AGT fills that gap with a framework-agnostic approach that works across all the major agent frameworks.

The timing connects to the OWASP Agentic Top 10, published in early 2026, which formalized the risk categories specific to autonomous agents. AGT is the first major open-source toolkit to claim full coverage of those categories, and it backs that up with 992 conformance tests across 10 formal specifications. That's not marketing — it's engineering rigor you can verify. For fullstack developers building AI-powered features into React, NestJS, or Django applications, this is the missing piece between "my agent works" and "my agent is safe to ship."

### Key Features

**Deterministic Policy Engine.** Every tool call is intercepted in application code before the agent's intent reaches the wire. Define policies in YAML with conditions, actions, and priority levels. A rule can block destructive operations (`drop`, `delete`, `truncate`), require human approval for sensitive actions (`send_email`), or allow anything that doesn't match a deny rule. The engine evaluates policies in milliseconds and raises `GovernanceDenied` if an action is blocked. No prompt injection can bypass it because the check happens outside the model.

**Zero-Trust Agent Identity.** In multi-agent systems, you need cryptographic identity for every agent, not shared API keys. AGT implements SPIFFE-compatible identity with DID (Decentralized Identifiers) and mutual TLS. Each agent gets a verifiable identity, and every action is attributed to a specific agent. When something goes wrong at 3 AM, you know exactly which agent did what.

**Four-Ring Execution Sandbox.** Agents run in privilege rings that constrain what they can access. Ring 0 is read-only. Ring 1 adds write to declared resources. Ring 2 adds network access. Ring 3 is full access. You assign rings based on the agent's role and risk profile. The sandbox enforces these boundaries at runtime, not as suggestions but as hard limits.

**Tamper-Evident Audit Logging.** Every governance decision — allowed, denied, or approved — is logged with the full decision record: what policy was active, what the agent requested, and why it was allowed or denied. The audit trail uses Merkle tree integrity, so you can prove the logs haven't been modified. This is what auditors and regulators need, and it's what most agent deployments completely lack.

**MCP Security Gateway.** AGT includes a dedicated security layer for Model Context Protocol servers. It detects tool poisoning attempts, monitors for drift in tool behavior, catches typosquatting attacks on tool names, and scans for hidden instructions in tool descriptions. If you're running MCP servers for your agents, this is the first real security layer for that protocol.

**Multi-Language SDKs.** The core policy engine runs in Python, but there are SDKs for TypeScript, .NET, Rust, and Go. The TypeScript SDK powers the Claude Code and Copilot CLI integrations. The Go and Rust SDKs cover backend services. Python has the full stack with 45 consolidated packages. This isn't a Python-only tool — it meets you wherever your agents run.

**CLI for Compliance and Red-Teaming.** The `agt` CLI includes `verify` for OWASP compliance checks, `red-team scan` for prompt injection audits against your prompts, and `lint-policy` for validating policy files. You can run `agt verify --strict` in CI and fail builds on weak governance evidence. This makes agent governance something you can enforce in your pipeline, not just hope for in production.

### Use Cases

- **Production AI agents with tool access** — If your agent sends emails, modifies databases, or calls payment APIs, AGT lets you define exactly which actions are allowed, which require approval, and which are blocked entirely.
- **Multi-agent systems** — When you have agents delegating to other agents, AGT provides cryptographic identity for each agent and tracks the full delegation chain. No more "an agent did it" as an incident explanation.
- **Regulated industries** — Healthcare, finance, and government deployments need audit trails. AGT's Merkle-anchored decision logs provide tamper-evident proof of every governance decision, mapped to OWASP, NIST AI RMF, EU AI Act, and SOC 2.
- **MCP server deployments** — If you're running MCP servers for your agents, AGT's security gateway detects tool poisoning, drift, and typosquatting attacks that could compromise your agent's behavior.
- **CI/CD pipeline enforcement** — Run `agt verify --strict` in your pipeline to enforce governance standards before deployment. Fail builds on weak evidence or non-compliant policies.

### Pros and Cons

Pros:
- Deterministic enforcement means no prompt injection can bypass governance controls. This is architecturally stronger than any prompt-level safety approach.
- Multi-language SDKs (Python, TypeScript, .NET, Rust, Go) mean you can adopt it regardless of your backend stack. The TypeScript SDK works with NestJS and Node.js backends, Python with Django, Go with your microservices.
- 992 conformance tests across 10 formal specifications provide real confidence that the implementation matches the spec. This isn't hand-wavy — it's engineering.
- Framework-agnostic adapters for LangGraph, CrewAI, OpenAI Agents SDK, AutoGen, Semantic Kernel, and more mean you don't need to rewrite your agent to adopt governance.

Cons:
- Public Preview status means breaking changes are possible before GA. The API surface is still settling, and some features (like the Rust SDK) are less mature than the Python core.
- The full stack has a significant learning curve. The package ecosystem (45 Python packages consolidated into 5 distributions) can be overwhelming. Most teams only need `agent-governance-toolkit-core` and the `govern()` decorator.
- Azure-integrated features require Azure credentials. If you're not in the Azure ecosystem, you'll miss some capabilities like the AI Foundry deployment integration and Azure AD identity federation.

### Getting Started

```bash
# Install the full toolkit
pip install agent-governance-toolkit[full]

# Or just the core (most teams start here)
pip install agent-governance-toolkit-core
```

Govern any tool function in two lines:

```python
from agentmesh.governance import govern

safe_tool = govern(my_tool, policy="policy.yaml")
```

Define your policy:

```yaml
# policy.yaml
apiVersion: governance.toolkit/v1
name: production-policy
default_action: allow
rules:
  - name: block-destructive
    condition: "action.type in ['drop', 'delete', 'truncate']"
    action: deny
    description: "Destructive operations require human approval"

  - name: require-approval-for-send
    condition: "action.type == 'send_email'"
    action: require_approval
    approvers: ["security-team"]
```

For TypeScript (NestJS, Node.js):

```typescript
import { PolicyEngine } from "@microsoft/agent-governance-sdk";

const engine = new PolicyEngine([
  { action: "web_search", effect: "allow" },
  { action: "shell_exec", effect: "deny" },
]);
engine.evaluate("web_search"); // "allow"
engine.evaluate("shell_exec"); // "deny"
```

CLI tools for compliance and CI:

```bash
agt doctor                                        # check installation
agt verify                                        # OWASP compliance check
agt verify --evidence ./agt-evidence.json --strict # fail CI on weak evidence
agt red-team scan ./prompts/ --min-grade B         # prompt injection audit
```

### Alternatives

**Guardrails AI** — A Python library focused on validating LLM outputs against schemas and rules. Guardrails is output-focused (does the response match the expected format?) while AGT is action-focused (should this tool call be allowed?). Choose Guardrails when you need to validate what the model says. Choose AGT when you need to control what the model does.

**Lakera Guard** — A commercial API for prompt injection detection and content filtering. Lakera operates at the prompt layer, analyzing inputs for adversarial patterns. AGT operates at the execution layer, intercepting actions regardless of how the prompt was crafted. Lakera is easier to adopt (it's an API call), but AGT provides stronger guarantees because it doesn't rely on detecting attacks — it prevents their consequences.

**Nemo Guardrails (NVIDIA)** — An open-source toolkit for adding topical and safety rails to LLM-powered applications. NeMo focuses on conversational guardrails (keeping the agent on topic, preventing harmful outputs) while AGT focuses on operational governance (controlling tool access, enforcing approval workflows, auditing decisions). They're complementary — you could use NeMo for conversational safety and AGT for action-level governance.

### Verdict

The Agent Governance Toolkit is the most comprehensive open-source framework for controlling autonomous AI agents in production. The deterministic enforcement model — intercepting actions in application code rather than hoping prompt-level safety holds — is the right architectural approach. The 992 conformance tests and 10 formal specifications show this is serious engineering, not a proof of concept. The multi-language SDKs cover every backend stack a fullstack developer might use. The main risk is the Public Preview status: expect API changes before GA, and some features are less mature than others. But if you're deploying AI agents with real-world tool access in 2026, this is the project to evaluate first. The OWASP Agentic Top 10 coverage alone makes it worth the investment.
