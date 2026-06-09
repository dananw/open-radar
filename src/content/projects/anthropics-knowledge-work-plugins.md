---
name: anthropics/knowledge-work-plugins
description: "Anthropic open-sources 11 role-specific AI plugins for Claude Cowork and Claude Code — productivity, sales, data, marketing, legal, finance and more with MCP connectors."
url: https://github.com/anthropics/knowledge-work-plugins
stars: 19909
forks: 2377
language: Python
tags: ["ai-agents", "claude", "productivity", "mcp", "plugins"]
featured: false
publishedAt: 2026-06-10
---

## Anthropic Knowledge Work Plugins

### Overview

Anthropic open-sourced their knowledge work plugins repository in January 2026, and it's already crossed 19,900 GitHub stars with nearly 2,400 forks. That's a velocity you don't see often for what's essentially a collection of markdown and JSON files. The reason is simple: these plugins solve a real problem that every team using Claude for work has hit — how do you make an AI assistant actually understand your specific role, tools, and workflows?

The repo contains 11 role-specific plugins built for Claude Cowork (Anthropic's collaborative AI workspace) and Claude Code. Each plugin bundles domain knowledge, slash commands, and MCP server connectors for a specific job function: productivity, sales, customer support, product management, marketing, legal, finance, data analysis, enterprise search, bio-research, and plugin management itself. No code, no infrastructure, no build steps — just structured markdown and JSON that tell Claude how to behave like a specialist in your domain.

What makes this stand out from the flood of "AI prompt collections" on GitHub is that these are official Anthropic artifacts, built from their own internal usage. The plugins integrate with real tools through MCP — Slack, Notion, Linear, Jira, HubSpot, Snowflake, Databricks, Figma, and dozens more. When you install the sales plugin, Claude doesn't just "know about sales" — it can pull your HubSpot pipeline, prep call briefs from ZoomInfo data, and draft outreach that matches your company's tone.

### Why it matters

The AI agent space has a context problem. Every coding assistant and chatbot starts from zero — no understanding of your org structure, your tools, your processes, your terminology. You spend the first 10 minutes of every conversation re-explaining things that should be built in. Knowledge-work-plugins is Anthropic's answer to that, and it's notable because it comes from the company that makes Claude, not a third-party wrapper.

This also signals a shift in how AI companies compete. The model itself is increasingly commoditized — what matters is the integration layer. Anthropic is essentially saying: here's how to make Claude useful for your entire organization, not just your engineering team. The finance plugin handles journal entries and variance analysis. The legal plugin triages NDAs and reviews contracts. The data plugin writes SQL and validates results before sharing. These aren't toy demos — they're production workflows that real teams can adopt.

The MCP connector architecture is the real technical story here. Each plugin declares its tool integrations through `.mcp.json` files, which means the same plugin structure works whether you're using Claude Cowork in a browser or Claude Code in your terminal. For fullstack developers, this is a pattern worth studying: how to build AI tool integrations that are portable across interfaces.

### Key Features

**Role-Specific Plugin Architecture.** Each of the 11 plugins encodes domain expertise, best practices, and step-by-step workflows for a specific job function. The product-management plugin knows how to write specs, plan roadmaps, and synthesize user research. The finance plugin handles journal entries, reconciliation, and audit support. Claude draws on these skills automatically when the conversation context matches — you don't need to manually activate anything.

**MCP Server Connectors.** Every plugin ships with pre-configured MCP connectors for the tools that role actually uses. The sales plugin connects to HubSpot, Close, Clay, ZoomInfo, and Fireflies. The data plugin connects to Snowflake, Databricks, BigQuery, and Hex. These aren't theoretical integrations — they're production-ready configurations that work out of the box with your existing tool stack.

**Slash Command System.** Beyond passive skills, plugins expose explicit commands you invoke directly. Type `/sales:call-prep` to generate a briefing for an upcoming call, or `/finance:reconciliation` to walk through account reconciliation step by step. Commands are deterministic workflows, not open-ended prompts, which makes them reliable for repeated use.

**File-Based Customization.** The entire plugin system is built on markdown and JSON files. No code compilation, no deployment pipeline, no infrastructure. Swap a connector by editing `.mcp.json`. Add company context by dropping your terminology and org structure into skill files. Adjust workflows by modifying skill instructions. A product manager can customize their own plugin without touching a terminal.

**Plugin Marketplace with Community Contributions.** Anthropic provides a `cowork-plugin-management` plugin that helps you create new plugins or customize existing ones. The structure is deliberately simple — any developer can fork the repo, modify plugins for their organization, and submit PRs. This lowers the barrier to building company-specific AI workflows to near zero.

**Cross-Platform Compatibility.** Plugins work in both Claude Cowork (web-based collaborative workspace) and Claude Code (terminal-based coding agent). Install via the Cowork web UI at claude.com/plugins or via the CLI with `claude plugin install`. The same skill files and commands work in both environments, so your team's AI configuration stays consistent regardless of how people access Claude.

**Enterprise Search Integration.** The enterprise-search plugin deserves special mention — it creates a unified search layer across email, chat, docs, and wikis through a single query interface. For organizations drowning in tool sprawl (Slack + Notion + Confluence + Google Docs + Jira), this alone can justify adoption.

### Use Cases

- **Engineering teams using Claude Code** — Install the productivity plugin to manage tasks across Linear, Jira, and Asana without context-switching. Slash commands like `/productivity:daily-review` pull your calendar and task list into a focused morning briefing.
- **Sales teams preparing for calls** — The sales plugin researches prospects via ZoomInfo, pulls pipeline data from HubSpot, and generates battlecard-style briefings. `/sales:call-prep` replaces 30 minutes of manual research.
- **Data analysts writing queries** — The data plugin connects to your warehouse (Snowflake, BigQuery, Databricks), writes SQL based on natural language descriptions, and validates results before you share them with stakeholders.
- **Product managers writing specs** — The product-management plugin synthesizes user research from Intercom and Pendo, drafts PRDs in your team's format, and tracks competitive landscape changes.
- **Legal teams reviewing contracts** — The legal plugin triages incoming NDAs, flags risk clauses, and drafts templated responses — all while respecting your organization's compliance frameworks.
- **Cross-functional teams building custom plugins** — Use the cowork-plugin-management plugin to create bespoke integrations for internal tools that aren't covered by the 11 pre-built plugins.

### Pros and Cons

Pros:
- Official Anthropic support means these plugins will stay current with Claude's capabilities and won't break randomly when the model updates. The 143 open issues and active commit history show genuine maintenance investment.
- The MCP connector architecture is genuinely portable — the same plugin definitions work across Cowork and Claude Code, which is rare in the AI tooling space.
- File-based customization (markdown + JSON) means non-developers can tailor plugins to their organization. A marketing lead can adjust the marketing plugin's brand voice guidelines without filing a ticket.

Cons:
- These plugins assume you're all-in on the Claude ecosystem. If your team uses a mix of ChatGPT, Gemini, and Claude, the plugin benefits don't transfer — each AI platform has its own integration model.
- The 11 pre-built plugins cover common roles but leave gaps. Frontend development, DevOps, and engineering management don't have dedicated plugins yet, though the structure makes it straightforward to build your own.
- MCP connector availability depends on third-party tool providers maintaining their MCP servers. If HubSpot or Snowflake deprecate their MCP implementations, the corresponding plugin features break.

### Getting Started

```bash
# Install via Claude Code CLI
claude plugin marketplace add anthropics/knowledge-work-plugins

# Install a specific plugin
claude plugin install sales@knowledge-work-plugins
claude plugin install data@knowledge-work-plugins
claude plugin install productivity@knowledge-work-plugins

# Or install from Cowork web UI
# Visit https://claude.com/plugins/
```

Once installed, plugins activate automatically. Skills fire when relevant context appears in your conversation, and slash commands are available immediately:

```bash
# Use slash commands in your Claude session
/sales:call-prep
/data:write-query
/finance:reconciliation
/product-management:write-spec
```

To customize a plugin for your organization:

```bash
# Clone the repo
git clone https://github.com/anthropics/knowledge-work-plugins.git

# Edit connector configurations
vim productivity/.mcp.json

# Add your company context
vim productivity/skills/company-context.md

# Install your customized version
claude plugin install ./productivity
```

### Alternatives

**LangChain Agent Templates** — LangChain provides agent templates and tool integrations through its ecosystem, but they're code-first (Python/TypeScript) and require building your own orchestration layer. Choose LangChain when you need full programmatic control over agent behavior and are building custom applications rather than augmenting an existing AI assistant.

**OpenAI GPTs with Actions** — OpenAI's custom GPTs support tool integrations through OpenAPI specs, but the customization is limited to system prompts and API connections. There's no equivalent to the structured skill/command/connector architecture. Choose GPTs when you need a quick, shareable AI assistant for a narrow task and don't need deep tool integration.

**CrewAI** — An open-source multi-agent framework where you define agent roles, goals, and tool access in Python code. CrewAI is more flexible for building custom agent workflows but requires engineering effort to set up. Choose CrewAI when you're building autonomous agent pipelines rather than augmenting a human-in-the-loop assistant.

### Verdict

This is the most practical open-source contribution to come out of Anthropic's agent strategy. The 19.9K stars in under five months reflect genuine developer and organizational demand — teams want their AI tools to understand their context without weeks of prompt engineering. The file-based, no-code approach is the right call: it makes customization accessible to the people who actually understand the workflows (the sales lead, the finance manager, the product director), not just the engineers. If your team is already using Claude for work, installing these plugins should be a no-brainer. The productivity plugin alone, with its Slack-Notion-Linear-Jira integration, will save most knowledge workers 30+ minutes per day. The real question is whether Anthropic can maintain this as a genuine open-source project rather than letting it become a neglected marketing artifact — but the commit frequency and issue activity as of June 2026 suggest they're serious about it.
