---
name: fluxer
description: "Fluxer is a free, open-source Discord alternative built with TypeScript, Hono, Erlang/OTP, and React — self-hostable messaging and VoIP for communities."
url: https://github.com/fluxerapp/fluxer
stars: 8977
forks: 519
language: TypeScript
tags: ["messaging", "voip", "self-hosted", "typescript", "discord-alternative"]
featured: false
publishedAt: 2026-06-13
---

## Fluxer

### Overview

Fluxer is a free, open-source instant messaging and VoIP platform that aims to be a genuine self-hostable alternative to Discord. It hit nearly 9,000 GitHub stars in just over five months since its January 2026 launch, and already serves over 125,000 users in production — impressive numbers for a project run by essentially two full-time people.

The developer behind Fluxer started using Discord in 2017, joined their bug testing program in 2019, and spent five years thinking about what a community chat app should look like if it were built from scratch with open-source values. When Discord reportedly filed confidential IPO paperwork in February 2026, interest in Fluxer spiked. People started looking for alternatives that wouldn't eventually squeeze them for revenue once investor pressure mounted.

The core problem Fluxer solves is ownership. Discord works well, but it's proprietary, investor-driven, and you have zero control over the platform's direction. Communities that build on Discord are building on rented land. Fluxer keeps the familiar shape of modern community chat — servers, channels, voice calls, screen sharing, reactions, threads — while making every piece of software open and self-hostable. If you run your own instance, every feature is unlocked. No SSO tax, no feature paywalls, no licence key checks.

### Why it matters

The timing here is significant. Discord's potential IPO has been a wake-up call for communities that depend on the platform. When a proprietary app goes public, the incentive structure shifts toward monetization — and users become the product in ways that go beyond advertising. Slack's trajectory after its Salesforce acquisition is a cautionary tale: features got locked behind enterprise tiers, free-tier limits tightened, and the platform increasingly catered to corporate buyers over individual users.

Fluxer represents a broader trend of open-source alternatives reaching production quality faster than ever before. The stack choices are deliberate and modern: TypeScript and Node.js for backend services, Hono as the HTTP framework (a faster, lighter alternative to Express), Erlang/OTP for the real-time WebSocket gateway (because nothing handles concurrent connections like Erlang), React and Electron for desktop and web clients, and even Rust compiled to WebAssembly for performance-critical client code. This isn't a toy project — it's an opinionated, well-architected system that makes hard tradeoff decisions.

For fullstack web developers, Fluxer is worth studying even if you never plan to run a chat server. The codebase demonstrates how to build a real-time application at scale with a polyglot stack, how to integrate voice and video (via LiveKit) into a web application, and how to structure a project that needs to handle 125,000+ users with a tiny team.

### Key Features

**Real-time messaging with Erlang/OTP gateway.** The WebSocket layer runs on Erlang/OTP, which is the gold standard for handling massive numbers of concurrent connections. Typing indicators, presence, and message delivery happen through this gateway. If you've ever wondered how Discord handles millions of concurrent users, the answer is similar architecture — and Fluxer proves you can replicate it with open-source tools.

**Voice and video powered by LiveKit.** Communities and direct messages support voice calls, video calls, and screen sharing through LiveKit, an open-source WebRTC SFU. This isn't a hacky peer-to-peer solution — it's the same infrastructure approach that production video platforms use, and it handles NAT traversal, bandwidth adaptation, and multi-participant calls properly.

**Hono as the HTTP framework.** All HTTP services use Hono, a lightweight web framework that runs on Node.js, Deno, Bun, and edge runtimes. It's significantly faster than Express and has a more modern API with built-in middleware for CORS, JWT, compression, and more. The choice signals that the developer cares about performance and developer experience equally.

**SQLite by default, Cassandra for scale.** Storage uses SQLite for single-instance deployments, keeping the self-hosting story simple — no external database server required. For distributed deployments, there's optional Cassandra support. This pragmatic approach means you can start small and scale horizontally when needed, without changing application code.

**Meilisearch for full-text search.** Message search uses Meilisearch, an open-source search engine that's fast, typo-tolerant, and easy to deploy. It indexes messages, channels, and users, giving communities the kind of instant search experience that Discord charges for in its Nitro tier.

**Custom expressions and rich media.** Communities can upload custom emojis and stickers. Messages support link previews, image and video attachments, and GIF search via KLIPY. These features matter because they're the details that make a chat app feel alive rather than utilitarian.

**Granular permissions and community structure.** Servers support text and voice channels organized into categories with role-based permissions. This is the organizational backbone that makes Discord useful for everything from small friend groups to massive open-source projects — and Fluxer replicates it faithfully.

### Use Cases

- **Open-source project communities** — Teams that want a self-hosted chat platform where they control the data, moderation policies, and feature roadmap. No risk of the platform changing terms or locking features behind paid tiers.
- **Gaming communities** — Groups migrating from Discord who want voice channels, screen sharing, and the familiar server/channel structure without depending on a proprietary platform heading toward IPO.
- **Privacy-focused organizations** — Teams and communities that need end-to-end control over their communication infrastructure, especially in regulated industries or regions with strict data residency requirements.
- **Developer teams studying real-time architecture** — The codebase is a masterclass in polyglot system design: Erlang for concurrency, Rust/WASM for client performance, Hono for HTTP, React for UI. Worth reading even if you never deploy it.
- **European companies** — The hosted instance is run by a European company with clearer incentive structures than Silicon Valley VC-backed alternatives. For organizations concerned about US data jurisdiction, this matters.

### Pros and Cons

Pros:
- Genuinely open-source under AGPLv3 with no feature paywalls or SSO tax. Self-hosters get every feature that hosted users get, which is rare in the chat platform space.
- The tech stack is modern and well-chosen. Erlang/OTP for the WebSocket gateway is the right tool for the job, and the combination of Hono, React, and Rust/WASM shows serious engineering judgment.
- 125,000+ production users with only two full-time employees proves the architecture works at scale. This isn't theoretical — it's battle-tested.

Cons:
- Self-hosting documentation is still being finalized. The README explicitly warns that the current stack isn't very lightweight and asks people to wait before diving deep into self-hosting. Early adopters should expect rough edges.
- The project is young (six months old) and the codebase is mid-refactor. The default branch is literally called "refactor," and PRs aren't fully open yet. Contributing right now requires patience.
- No native mobile apps yet. Mobile support is listed as a top priority, but as of June 2026, you're limited to web and Electron desktop clients. For communities where mobile-first usage is dominant, this is a significant gap.

### Getting Started

Fluxer uses devenv (Nix-based) for development. The setup is straightforward:

```bash
# Install Nix and devenv
# Follow https://devenv.sh/getting-started/

# Clone the repository
git clone https://github.com/fluxerapp/fluxer.git
cd fluxer

# Enter the development environment
devenv shell

# Start all services
devenv up

# Open in browser
# http://localhost:48763/
```

For self-hosting in production, check the docs:

```bash
# Self-hosting guide
# https://docs.fluxer.app/self-hosting

# Bootstrap a LiveKit SFU for voice/video
# See fluxer_devops/livekitctl/README.md
```

The development environment includes a local Mailpit instance for capturing verification emails at `http://localhost:48763/mailpit/`.

### Alternatives

**Discord** — The incumbent. Works well, huge ecosystem, but proprietary and heading toward IPO. Choose Discord if you want zero friction and don't care about platform control. Choose Fluxer if ownership and self-hosting matter to you.

**Matrix (Element)** — The established open-source chat protocol with federation built in. Matrix is more mature and has better mobile support, but its UX has historically lagged behind Discord's polish. Fluxer aims to match Discord's UX more closely while Matrix prioritizes protocol-level federation. Choose Matrix if federation across multiple servers is a priority; choose Fluxer if you want a single-instance Discord-like experience.

**Rocket.Chat** — Another open-source team chat platform with a longer track record. Rocket.Chat is more enterprise-focused with features like omnichannel customer support and LDAP integration. It's a better fit for corporate deployments, while Fluxer targets community use cases with its Discord-like server/channel structure.

### Verdict

Fluxer is the most compelling open-source Discord alternative I've seen in years, and the timing couldn't be better. With Discord heading toward an IPO and Slack's post-acquisition trajectory fresh in everyone's mind, there's real demand for a community chat platform that can't enshittify because the code is open and self-hostable. The 9,000-star growth in five months and 125,000 production users aren't vanity metrics — they reflect genuine community pull. The tech stack is smart: Erlang/OTP for the real-time gateway, Hono for HTTP, React for the client, Rust/WASM where performance matters. It's a polyglot system that makes deliberate choices rather than defaulting to the JavaScript-everything approach. The main risk is maturity — six months old, mid-refactor, no native mobile apps yet. But if you're an open-source community or privacy-conscious organization willing to tolerate some rough edges, Fluxer is worth building on now. The two-person team shipping at this pace suggests the project has real momentum, and getting in early means your feedback shapes the platform's direction.
