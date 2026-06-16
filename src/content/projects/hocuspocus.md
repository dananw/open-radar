---
name: hocuspocus
description: "Hocuspocus is a self-hosted Yjs CRDT WebSocket backend that makes adding real-time collaboration to any web app straightforward — think Google Docs editing without the Google dependency."
url: https://github.com/ueberdosis/hocuspocus
stars: 2446
forks: 204
language: TypeScript
tags: ["real-time", "collaboration", "crdt", "yjs", "websocket", "self-hosted"]
featured: false
publishedAt: 2026-06-16
---

## Hocuspocus

### Overview

Hocuspocus is a plug-and-play collaboration backend built on Yjs, the most popular CRDT implementation for JavaScript. It hit v4 in early 2026 and just shipped v4.2.0 on June 12, making this one of the most actively maintained real-time collaboration servers in the open-source ecosystem. With 2,400+ GitHub stars and adoption by companies like Outline, Gamma, Saga, and Ahrefs, it's proven itself beyond the demo stage.

The project is maintained by ueberdosis, the German team behind Tiptap — the headless rich text editor that's become the default choice for ProseMirror-based editing in the Vue and React ecosystems. That matters because Hocuspocus isn't a random side project. It's the infrastructure layer that Tiptap's commercial collaboration offering (Tiptap Collab) is built on. The open-source version gives you the same core engine without the cloud dependency.

The core problem Hocuspocus solves: building real-time collaborative editing is genuinely hard. You need WebSocket management, conflict resolution, document persistence, awareness (showing cursors and selections of other users), authentication hooks, and a dozen other edge cases. Most teams that try to build this from scratch spend months on infrastructure instead of product features. Hocuspocus wraps all of that into a server you can spin up in under 10 lines of code.

### Why it matters

Real-time collaboration has shifted from "nice-to-have" to table stakes. Every productivity tool, project management app, and CMS now ships with some form of multiplayer editing. But the implementation options haven't kept up. You either use a hosted service like Liveblocks or Yjs.dev (vendor lock-in, ongoing costs that scale with users), or you build it yourself (months of engineering, ongoing maintenance burden).

Hocuspocus occupies the middle ground. Self-hosted, open-source, but with a plugin architecture that handles the hard parts — persistence, authentication, webhook notifications, rate limiting — through extensions you configure rather than code you write. The extension system in v4 is the real story. It's not just "add a database adapter." You can hook into every lifecycle event: onConnect, onAuthenticate, onLoadDocument, onStoreDocument, onChange. That granularity means you can build exactly the collaboration experience your product needs without fighting the framework.

The timing connects to the CRDT vs OT debate settling firmly in CRDT's favor. Yjs won. Google Docs still uses OT, but virtually every new collaboration tool built since 2023 uses Yjs or a similar CRDT library. Hocuspocus is the most production-ready way to serve Yjs documents over WebSockets.

### Key Features

**Plugin-Based Extension Architecture.** Hocuspocus v4 ships with a composable extension system where each capability is a separate extension. Need SQLite persistence? Add the SQLite extension. Need Redis for multi-instance deployments? Add the Redis extension. Need authentication? Implement the onAuthenticate hook. Each extension is isolated and testable. This is the architectural upgrade that justified the v4 major version bump.

**Built-In Persistence Options.** The official extension library includes SQLite, PostgreSQL, Redis, and RocksDB storage backends. Documents are automatically stored and loaded. You don't write persistence logic — you configure which backend to use. For production deployments, the Redis extension supports multi-server setups where documents are shared across instances.

**Awareness Protocol Support.** Real-time presence — cursors, selections, user names, colors — is handled through Yjs's awareness protocol. Hocuspocus broadcasts awareness updates to all connected clients automatically. Building cursor presence from scratch typically takes weeks. With Hocuspocus and Tiptap or ProseMirror, it works out of the box with a few lines of client configuration.

**Webhook and Webhook Events.** The Webhook extension lets you notify external services when documents change. This is useful for triggering rebuilds, updating search indexes, or syncing content to a CMS. You configure the endpoint and the events you care about. No polling, no cron jobs — push-based updates when content actually changes.

**Multi-Document and Namespace Support.** A single Hocuspocus server can handle thousands of concurrent documents. Each document is identified by a name, and clients connect to specific documents. There's no practical limit on document count, and documents are loaded on demand and can be configured to unload after a period of inactivity to conserve memory.

**Framework Agnostic Client Integration.** The official client library works with any frontend framework. There are community bindings and examples for React, Vue, Svelte, and vanilla JavaScript. The client handles reconnection, document syncing, and awareness updates. Combined with Tiptap, ProseMirror, or SlateJS, you get a complete collaborative editing stack.

**Authentication and Authorization Hooks.** The onAuthenticate hook runs before a client can access a document. You verify tokens, check permissions, and return user metadata that's shared with other connected users. This is essential for any production deployment where documents aren't publicly editable. The hook supports async operations, so you can validate against your database or auth service.

### Use Cases

- **Collaborative document editors** — Build a Google Docs-style editor for your SaaS product. Companies like Outline and Gamma use Hocuspocus to power their real-time editing experiences.
- **Project management tools** — Add multiplayer editing to task descriptions, notes, and kanban card content. The awareness protocol shows who's editing what in real time.
- **CMS and content platforms** — Let multiple editors work on the same article simultaneously. Combine with webhook extensions to trigger rebuilds or notifications when content changes.
- **Whiteboard and canvas apps** — While primarily designed for text documents, Yjs's shared types work for any structured data, including drawing operations and canvas state.
- **Code editors and IDEs** — Pair programming and collaborative code editing. The CRDT approach handles concurrent edits to the same file without merge conflicts.
- **Educational platforms** — Collaborative note-taking, shared workspaces, and real-time group exercises where multiple students interact with the same content.

### Pros and Cons

Pros:
- The extension architecture is genuinely well-designed. Each capability is isolated, composable, and documented. You add what you need and nothing else.
- Battle-tested by real products. Outline (25K+ GitHub stars), Gamma, Saga, and Ahrefs all use this in production. That's not a demo — that's revenue-generating software.
- Self-hosted means no per-user costs. Liveblocks charges $99/month for 1000 MAU. Hocuspocus on a $10/month VPS handles the same load.
- The Tiptap ecosystem integration is seamless. If you're already using Tiptap for your editor, adding Hocuspocus is almost trivial.

Cons:
- The documentation, while improved in v4, still has gaps. Some extension configurations require reading source code to understand all options. The docs site has improved but isn't at the level of Next.js or Prisma.
- Horizontal scaling requires Redis or a similar shared state backend. Running multiple Hocuspocus instances without Redis means documents aren't shared across instances, which limits scaling options.
- WebSocket infrastructure adds operational complexity. You need to handle connection upgrades, load balancer configuration (sticky sessions or Redis pub/sub), and monitoring for long-lived connections. This isn't Hocuspocus's fault — it's inherent to WebSocket-based systems.

### Getting Started

```bash
# Install the server and a persistence extension
npm install @hocuspocus/server @hocuspocus/extension-sqlite

# Create your server
```

```js
import { Server } from '@hocuspocus/server'
import { SQLite } from '@hocuspocus/extension-sqlite'

const server = new Server({
  port: 1234,
  extensions: [
    new SQLite({
      database: 'db.sqlite',
    }),
  ],
})

server.listen()
```

On the client side, install the client library and connect:

```bash
npm install @hocuspocus/provider
```

```js
import { HocuspocusProvider } from '@hocuspocus/provider'

const provider = new HocuspocusProvider({
  url: 'ws://127.0.0.1:1234',
  name: 'my-document',
})

// provider.document is now a Yjs document synced with the server
```

For a full collaborative editor, combine with Tiptap and the Collaboration extension. The Tiptap docs have a complete walkthrough at tiptap.dev/docs/collaboration.

### Alternatives

**Liveblocks** — A hosted real-time collaboration service with a polished developer experience and pre-built UI components. Liveblocks is easier to get started with (no server to manage) but costs $99+/month at scale and creates vendor lock-in. Choose Liveblocks if you want zero infrastructure overhead and your budget supports per-user pricing.

**Y-Sweet (by Jamsocket)** — A managed Yjs hosting service from the team behind Jamsocket. Y-Sweet handles the server infrastructure so you don't have to self-host, but it's a paid service. Choose Y-Sweet if you want managed Yjs hosting without the operational burden of running your own WebSocket server, but still want Yjs compatibility.

**Liveblocks + Yjs adapter** — Liveblocks added Yjs support, so you can use their infrastructure with Yjs documents. This combines Liveblocks's operational simplicity with Yjs's CRDT model. It's the most expensive option but the least operationally complex. Choose this if budget isn't a constraint and you want enterprise-grade infrastructure from day one.

### Verdict

Hocuspocus is the obvious choice if you're building a product that needs real-time collaboration and you want to own your infrastructure. The v4 extension architecture solved the main criticism from earlier versions (monolithic design, hard to customize), and the adoption by products like Outline and Gamma proves it works at scale. The self-hosting angle alone saves thousands of dollars per year compared to hosted alternatives — and for many teams, that's the deciding factor. If you're a fullstack developer building with React, Vue, or any modern frontend framework and your product involves any form of shared editing, Hocuspocus should be on your shortlist. The 2,400 stars undersell it — this is production infrastructure disguised as a GitHub repo.
