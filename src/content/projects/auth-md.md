---
name: auth.md
description: "auth.md is an open protocol by WorkOS that lets AI agents authenticate to web services on behalf of users — the missing auth layer for the agentic web."
url: https://github.com/workos/auth.md
stars: 359
forks: 30
language: TypeScript
tags: ["auth", "ai-agents", "oauth", "protocol", "identity"]
featured: false
publishedAt: 2026-06-05
---

## auth.md

### Overview

auth.md is an open protocol and reference implementation for something the industry has been awkwardly avoiding: how do AI agents authenticate to web services on behalf of human users? Released by WorkOS in late May 2026, the project hit 350+ GitHub stars in its first two weeks — modest numbers compared to flashy AI frameworks, but the signal matters more than the count. This is infrastructure-level work from a company that already powers auth for thousands of SaaS products.

WorkOS needs little introduction in the developer tooling space. They've built enterprise-grade SSO, directory sync, and user management APIs used by companies like Vercel, Loom, and Webflow. Their decision to publish an open protocol (MIT licensed) rather than a proprietary SDK signals that they see agent authentication as a standards problem, not a product feature. That's a meaningful distinction.

The core problem is this: AI agents — Claude, ChatGPT, Cursor, Codex, custom agents — increasingly need to call APIs on behalf of users. They need to read your GitHub repos, post to your Slack, query your database, update your CRM. Right now, most of this happens through API keys stored in environment variables or OAuth tokens that were never designed for autonomous, long-running agent sessions. auth.md proposes a cleaner model: services publish an AUTH.md file (similar to robots.txt or sitemap.xml) that tells agents exactly how to register, authenticate, and get credentials. Three registration paths cover the spectrum from fully anonymous to fully identity-verified.

### Why it matters

The AI agent ecosystem is growing faster than the authentication infrastructure supporting it. According to Anthropic's own data, Claude Code processes millions of agentic tasks per day. OpenAI's operator agents, Google's Gemini agents, and dozens of startups are all hitting the same wall: there's no standard way for an agent to say "I'm acting on behalf of this user, here's my proof, and here's what I'm allowed to do."

The current workarounds are ugly. API keys are long-lived, hard to scope, and provide no user context. OAuth refresh tokens were designed for browser-based sessions, not autonomous agents that might run for hours. Service-specific auth adapters (one for GitHub, one for Slack, one for Notion) create an N×M integration problem. auth.md tries to collapse this into a single, discoverable protocol that any service can implement and any agent can consume.

This connects to a broader trend: the shift from "AI as a chatbot" to "AI as an actor." When agents stop answering questions and start taking actions — booking meetings, deploying code, managing infrastructure — authentication becomes the critical bottleneck. The MCP (Model Context Protocol) solved the tool discovery problem. auth.md tackles the identity and authorization problem that MCP deliberately left open.

### Key Features

**AUTH.md Discovery File.** Services host an AUTH.md file at their domain (analogous to robots.txt or .well-known/oauth-authorization-server). This file is a procedural recipe that agents read to understand how to authenticate: discover the service metadata, register an identity, claim credentials, and handle revocation. It's human-readable and machine-parseable — you can open any AUTH.md file in a browser and understand the flow.

**Three Registration Paths.** The protocol supports three identity assertion types that cover real-world agent scenarios. ID-JAG (Identity Assertion JWT Authorization Grant) lets an agent provider mint a signed identity token that the service verifies against a JWKS endpoint. Verified email uses an RFC 8628-style device claim ceremony where the user confirms their email through a browser. Anonymous registration lets agents operate immediately with limited scopes, with an optional claim ceremony to upgrade permissions later.

**Standard OAuth Foundation.** auth.md doesn't reinvent the wheel — it extends existing OAuth 2.0 standards. Token exchange uses RFC 7523 JWT-bearer grants. Discovery follows RFC 8414 protected resource metadata. Token revocation uses RFC 7009. This means services already running OAuth can add agent auth incrementally without a new auth stack.

**Scoped Capability Manifests.** Each registration path returns scoped access tokens. An anonymous agent might get `api.read` only. A verified-email agent gets `api.read` and `api.write`. An ID-JAG-verified agent with user consent gets full scopes. This graduated permission model means services can offer agent access without betting everything on identity verification working perfectly.

**Interactive Reference Implementation.** The repo includes working TypeScript implementations of both the agent provider (identity provider that mints ID-JAGs) and agent service (resource server that accepts them). Run `pnpm dev` and you get a local environment with a service at port 8000 and a provider at port 4000. The service homepage walks through all three registration flows interactively, which is the fastest way to understand the protocol.

**Revocation and Event System.** The protocol includes an event notification system where agent providers can revoke identity assertions and services are notified via webhook-style callbacks. This addresses the "zombie agent" problem — an agent whose access should have been terminated but still holds valid tokens.

### Use Cases

- **SaaS platforms adding AI agent access** — If you're building an API that Claude, ChatGPT, or custom agents will call on behalf of your users, auth.md gives you a standard way to accept and verify agent identity without building custom auth flows for each agent provider.

- **Enterprise compliance and audit trails** — Companies deploying internal AI agents need to know which agent acted on behalf of which user. The ID-JAG flow creates a cryptographic chain from user consent to agent action, satisfying audit requirements that API keys cannot.

- **Multi-agent orchestration platforms** — Platforms where multiple agents collaborate (one reads data, another writes, a third monitors) need fine-grained, scoped credentials. auth.md's graduated permission model maps cleanly to this pattern.

- **Developer tooling and CLI agents** — Tools like Cursor, Codex, and custom CLI agents that need to interact with multiple services can use AUTH.md discovery to automatically configure authentication for each service they encounter.

### Pros and Cons

Pros:
- Backed by WorkOS, a company with deep auth expertise and existing relationships with major SaaS platforms. This isn't a random GitHub project — it has institutional weight behind it.
- Built on existing OAuth standards rather than inventing new primitives. Services already running OAuth 2.0 can adopt this incrementally.
- The three-path registration model (ID-JAG, verified email, anonymous) covers the full spectrum of agent trust levels, from "I don't know who this agent is" to "this agent is cryptographically verified."

Cons:
- 359 stars and early-stage adoption. The protocol is only useful if both services and agents implement it, and right now neither side has critical mass. This is a chicken-and-egg problem that standards efforts always face.
- The ID-JAG flow requires agent providers (OpenAI, Anthropic, Google) to mint identity assertions. None have committed to this yet. Without provider support, the strongest verification path doesn't work.
- Complexity overhead for small projects. If you're running a simple API with API key auth, adding auth.md's discovery endpoints, claim ceremonies, and JWKS infrastructure is significant work for uncertain benefit.

### Getting Started

```bash
# Clone the repo
git clone https://github.com/workos/auth.md.git
cd auth.md

# Install dependencies
pnpm install

# Run both service and provider locally
pnpm dev
```

This starts:
- Service at `http://localhost:8000` — walks you through all three registration flows
- Provider at `http://localhost:4000` — mints ID-JAGs for testing

Run one side at a time:

```bash
pnpm dev:service   # just the service
pnpm dev:provider  # just the provider
```

To implement auth.md in your own service, start with the `agent-services/` directory. The README includes full implementation guides, sequence diagrams, and error tables for each registration path.

To add an AUTH.md file to your existing service, copy the template from `AUTH.md` in the repo root and customize the endpoints and scopes for your platform.

### Alternatives

**MCP (Model Context Protocol)** — Anthropic's MCP handles tool discovery and invocation for AI agents but deliberately leaves authentication out of scope. auth.md complements MCP rather than competing with it — you'd use MCP for "what tools are available" and auth.md for "how does the agent prove who it is." If you're already using MCP, auth.md fills the gap MCP doesn't address.

**OAuth 2.0 Device Authorization Grant (RFC 8628)** — The device flow is the closest existing standard to agent authentication, and auth.md actually uses it as the verified-email claim ceremony. But RFC 8628 alone doesn't cover discovery, identity assertions, or scoped capabilities. If your agents only need simple user-delegated access, the raw device flow might be enough. If you need identity verification, revocation, or multi-agent scoping, auth.md adds the missing layers.

**Custom API Key + OAuth Hybrids** — Most teams today roll their own: long-lived API keys for service-to-service calls, OAuth for user-delegated access, and hope that agents fit somewhere in between. This works until you need audit trails, graduated permissions, or interoperability with multiple agent providers. auth.md is the formalization of what most teams are doing ad-hoc.

### Verdict

auth.md is the kind of project that's easy to dismiss as "too early" and dangerous to ignore. The protocol is well-designed, grounded in existing OAuth standards, and addresses a problem that every API provider will face within the next 12 months as AI agents become first-class API consumers. WorkOS has the credibility and customer base to push this toward adoption, and the reference implementation is solid enough to learn from today.

Should you implement auth.md in production right now? Probably not — the ecosystem isn't ready, and the ID-JAG path depends on agent provider support that doesn't exist yet. Should you read the spec, run the demo, and understand the protocol? Absolutely. If you're building APIs that AI agents will call, this is the most thoughtful proposal on the table for how those agents should authenticate. The 350-star count is low because this is infrastructure, not a viral demo. But infrastructure is what lasts.
