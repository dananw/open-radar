---
name: googleworkspace-cli
description: "One CLI for all Google Workspace built in Rust — dynamically generates commands from Discovery Service with 100+ AI agent skills included"
url: https://github.com/googleworkspace/cli
stars: 27034
forks: 1423
language: Rust
tags: ["cli", "google-workspace", "ai-agents", "developer-tools", "automation"]
featured: false
publishedAt: 2026-06-13
---

## gws — Google Workspace CLI

### Overview

`gws` is a single command-line tool that covers every Google Workspace API — Drive, Gmail, Calendar, Sheets, Docs, Chat, Admin, and more. Built in Rust and installed via npm or Homebrew, it hit 27,000 stars in just three months after its March 2026 launch. That kind of velocity usually means a tool solved a real pain point, and in this case it's the absurd complexity of interacting with Google Workspace programmatically.

The core idea is clever: instead of maintaining a static command set that rots every time Google ships a new API endpoint, `gws` reads Google's own Discovery Service at runtime and builds its entire command surface dynamically. When Google adds a method to the Sheets API next Tuesday, `gws` picks it up automatically. No version bumps, no waiting for maintainers to catch up. This is the kind of architectural decision that makes you wonder why every API wrapper doesn't work this way.

The project lives under the `googleworkspace` GitHub org, which gives it a semi-official standing even though the README explicitly states it's not an officially supported Google product. The maintainers are active — the repo was updated today — and the issue tracker shows rapid iteration on auth flows, agent skills, and edge cases.

### Why it matters

Every fullstack developer touches Google Workspace whether they want to or not. You're probably pulling data from Sheets for a dashboard, sending automated emails via Gmail, managing files in Drive, or coordinating team schedules through Calendar. The official Google API client libraries are verbose, require boilerplate for every service, and force you to deal with separate auth flows per API. Most developers end up writing the same 50 lines of OAuth setup and pagination logic in every project.

`gws` collapses all of that into a single binary with consistent syntax. More importantly for 2026, it ships with 100+ AI agent skills — pre-built `SKILL.md` files that let tools like Claude Code, OpenCode, and Gemini CLI interact with Google Workspace without custom integration code. This is the bridge between "I use Google Workspace" and "my AI agent manages my Google Workspace." The agent angle is what makes this tool timely rather than just convenient.

The structured JSON output and `--dry-run` flag also make it genuinely useful in CI/CD pipelines. You can script Workspace operations in your deployment workflow without maintaining a custom integration layer. That's a real productivity win for teams that live in Google's ecosystem.

### Key Features

**Dynamic command generation from Discovery Service.** `gws` doesn't ship a hardcoded list of commands. It queries Google's Discovery API at runtime and builds its command surface from the live API definitions. This means zero lag between Google shipping a new endpoint and you being able to use it from the CLI. The introspection capability alone — `gws schema drive.files.list` showing you the full request/response schema — is worth the install.

**100+ AI agent skills included.** The repo ships `SKILL.md` files for every supported API, plus higher-level helpers for common workflows and 50 curated recipes covering Gmail, Drive, Docs, Calendar, and Sheets. Install them all with `npx skills add https://github.com/googleworkspace/cli` or cherry-pick specific services. These skills work with Claude Code, OpenCode, Hermes Agent, and other agent frameworks out of the box.

**Multiple authentication strategies.** OAuth interactive flow, service accounts, pre-obtained tokens, headless/CI export — `gws` handles all of them with a clear precedence chain. The `gws auth setup` command automates Cloud project creation and API enabling when you have `gcloud` installed. Credentials are encrypted at rest with AES-256-GCM using your OS keyring.

**Structured JSON output everywhere.** Every command returns clean JSON by default, designed to be piped into `jq`, consumed by scripts, or fed to LLMs. Pagination is handled with `--page-all` for NDJSON streaming. No parsing HTML tables or scraping text output.

**Gemini CLI extension support.** Install `gws` as a Gemini CLI extension and your Gemini agent gets direct access to all Workspace commands. The extension inherits your terminal's auth, so setup is a one-time thing. This is Google's own AI agent getting first-class access to Google's own workspace tools.

**Dry-run and schema introspection.** `--dry-run` previews the HTTP request without executing it, which is invaluable for debugging complex API calls. `gws schema <method>` shows the full request and response schemas for any API method. These two features together mean you can explore and prototype Workspace integrations interactively without writing code.

**Cross-platform with multiple install paths.** Pre-built binaries for macOS, Linux, and Windows on the GitHub Releases page. npm package for the Node.js crowd. Homebrew formula for macOS users. Nix flake for reproducible environments. Cargo install from source for Rust developers. The binary is a single file with no runtime dependencies.

### Use Cases

- **Automated reporting pipelines** — Pull data from Google Sheets, transform it, and push results back or send via Gmail. Perfect for weekly team reports or dashboard data feeds that currently require manual exports.

- **CI/CD workspace automation** — Send deployment notifications to Google Chat, update tracking spreadsheets, or manage shared Drive folders as part of your build pipeline. The structured JSON output plays nicely with shell scripts.

- **AI agent workflows** — Let your Claude Code or OpenCode agent read your emails, manage your calendar, organize Drive files, or draft documents. The 100+ skills mean the agent can handle complex multi-step Workspace operations.

- **Bulk operations on Workspace data** — Archive old emails, clean up Drive folders, batch-update spreadsheet rows, or manage Google Chat spaces. The pagination handling and NDJSON streaming make large-scale operations practical.

- **Developer tooling integration** — Build internal tools that read from or write to Google Workspace without maintaining separate API client code. The dynamic command surface means your tooling stays current automatically.

### Pros and Cons

Pros:
- **Zero maintenance burden for API changes.** The dynamic Discovery Service approach means the tool stays current without version bumps. When Google deprecates or adds endpoints, `gws` adapts automatically.
- **Exceptional agent integration.** The 100+ SKILL.md files are genuinely useful, not marketing fluff. They cover real workflows like "find emails from last week with attachments" or "create a budget spreadsheet with formulas."
- **Rust binary performance.** Cold startup is fast, and the single-binary distribution means no dependency hell. Compare this to the official Python or Node.js Google API clients that require virtual environments or node_modules.

Cons:
- **OAuth setup complexity.** Despite the `gws auth setup` wizard, the initial Google Cloud project configuration is still a multi-step process involving the Cloud Console, consent screens, and test user registration. Google's OAuth flow is the tool's biggest friction point, not the tool itself.
- **Scope limits in testing mode.** If your OAuth app is unverified, Google limits consent to ~25 scopes. The `recommended` preset uses 85+ scopes and will fail for unverified apps. You need to either verify your app or select individual services.
- **Not officially supported.** The README is explicit about this. For production-critical workflows, you're depending on community maintenance. The active development and Google org ownership reduce this risk, but it's worth noting.

### Getting Started

```bash
# Install via npm (downloads the Rust binary automatically)
npm install -g @googleworkspace/cli

# Or via Homebrew on macOS/Linux
brew install googleworkspace-cli

# One-time auth setup (requires gcloud CLI)
gws auth setup
gws auth login

# List your recent Drive files
gws drive files list --params '{"pageSize": 5}'

# Create a spreadsheet
gws sheets spreadsheets create --json '{"properties": {"title": "Q1 Budget"}}'

# Send a Chat message (dry-run to preview)
gws chat spaces messages create \
  --params '{"parent": "spaces/xyz"}' \
  --json '{"text": "Deploy complete."}' \
  --dry-run

# Introspect any API method's schema
gws schema drive.files.list

# Install all AI agent skills
npx skills add https://github.com/googleworkspace/cli
```

### Alternatives

**Google API Client Libraries (official)** — The official Python, Node.js, and Java client libraries give you fine-grained control but require significant boilerplate per service. Each API (Drive, Sheets, Gmail) has its own client class, auth setup, and pagination handling. Choose these when you need deep integration in a specific language or when you're building a production application that needs the stability guarantee of official libraries.

**Gam (Google Apps Manager)** — A mature CLI tool focused specifically on Google Workspace domain administration. Gam excels at admin tasks like managing users, groups, and organizational units. Choose Gam when your primary use case is Workspace administration at scale rather than general API interaction or AI agent integration.

**gcloud CLI** — Google's own CLI covers some Workspace operations through its API surface, but it's primarily focused on Google Cloud Platform services. The Workspace coverage is limited and the syntax is different from `gws`. Choose `gcloud` when you're already deep in the GCP ecosystem and only need occasional Workspace access.

### Verdict

`gws` is the tool I'd build if I had a weekend and infinite patience — except it's better than what I'd build because someone actually thought through the auth flows, the agent skill format, and the dynamic command generation properly. For any fullstack developer who interacts with Google Workspace APIs, this eliminates the most annoying part of the job: maintaining API client code across multiple Google services. The 27,000 stars in three months tell the story — developers were waiting for this. The agent skills angle makes it especially relevant in 2026, where the gap between "I use Google Workspace" and "my AI agent manages my Google Workspace" is closing fast. Install it, run `gws auth setup`, and stop writing OAuth boilerplate forever.
