---
name: files-sdk
description: "Unified storage SDK that gives you one honest API across 40+ blob backends — S3, GCS, Azure, Vercel Blob, Supabase, Dropbox, and more. TypeScript-first, web-standard I/O."
url: https://github.com/haydenbleasel/files-sdk
stars: 1230
forks: 36
language: TypeScript
tags: ["storage", "sdk", "typescript", "blob", "s3", "cloudflare", "vercel"]
featured: false
publishedAt: 2026-06-11
---

## Files SDK

### Overview

Files SDK is a unified storage abstraction that lets you write one upload/download/delete call and swap between 40+ storage backends without changing application code. It hit 1,200 GitHub stars within a month of its May 2026 launch, which tracks — every fullstack developer has dealt with the pain of vendor-locked file storage code.

The project is by Hayden Bleasel, the developer behind next-forge (a popular Next.js production starter with 10K+ stars) and several other widely-used web development tools. He's a core contributor in the Next.js and Vercel ecosystem, and that context matters: Files SDK is designed for the exact stack that modern fullstack teams actually use — Next.js, React, serverless functions, edge runtimes. It's not a generic cloud abstraction layer; it's a storage SDK built by someone who ships production web apps daily.

The core problem it solves is deceptively simple. Every cloud provider has its own SDK for blob storage — AWS has `@aws-sdk/client-s3`, Google has `@google-cloud/storage`, Azure has `@azure/storage-blob`, Vercel has `@vercel/blob`, Cloudflare has their R2 bindings, Supabase has their storage client. Each has different method names, different parameter shapes, different error types, different streaming semantics. If you've ever migrated from S3 to R2 or tried to support both local development and production storage, you know the code churn is real. Files SDK collapses all of that into a single `Files` class with a consistent API surface.

### Why it matters

Storage is the unglamorous infrastructure that every web application needs but nobody wants to think about. The 2025 State of Frontend survey showed that 73% of web applications use at least two storage providers (typically one for production and one for development/testing), and switching between them is consistently ranked as one of the most tedious refactoring tasks. Files SDK eliminates that friction entirely.

What makes this particularly relevant right now is the AI agent angle. Files SDK ships with ready-made tool definitions for the Vercel AI SDK, OpenAI's Responses API and Agents SDK, and Anthropic's Claude Agent SDK. That means your AI agents can browse, read, upload, and manage files in your storage bucket through the same unified interface your application uses. As more teams build AI-powered features that need to interact with user-uploaded files, having a single storage abstraction that works for both human code and agent code is a genuine architectural advantage.

The timing also connects to the broader trend of edge-first development. With adapters for Cloudflare R2, Vercel Blob, Netlify Blobs, and Tigris, Files SDK lets you run the same storage code on edge runtimes that you run on Node.js. No conditional imports, no runtime detection, no separate code paths. That's the kind of boring infrastructure that actually makes developers productive.

### Key Features

**One API Across 40+ Providers.** The core abstraction exposes `upload`, `download`, `head`, `exists`, `delete`, `copy`, `move`, `list`, `listAll`, `url`, and `signedUploadUrl` — the same method signatures whether you're talking to S3, Google Cloud Storage, Azure Blob, Supabase, Firebase, Dropbox, or the local filesystem. Swap an import line and your entire storage layer changes without touching application code. The SDK currently ships adapters for 40+ backends, from enterprise cloud providers to consumer file services.

**Web-Standard I/O.** File bodies are `Blob`, `File`, `ReadableStream`, `Uint8Array`, `ArrayBuffer`, or `string` — standard web platform types, not provider-specific wrappers. This means your upload handlers work identically in Node.js, Bun, Deno, Cloudflare Workers, and browser environments. No polyfills, no adapter layers, no runtime-specific code paths.

**Tree-Shakeable Adapter Architecture.** Each storage provider is a separate entry point (`files-sdk/s3`, `files-sdk/r2`, `files-sdk/gcs`, etc.). You only bundle the adapters you actually import. If your app only uses S3 and the local filesystem, your production bundle doesn't include the Azure, Dropbox, or Google Drive code. The package.json has 63 export paths, each targeting a specific adapter or middleware.

**Escape Hatch to Native Clients.** Every adapter exposes its underlying provider client at `files.raw`. Need to call a provider-specific API that Files SDK doesn't abstract? Access the native S3 client, Google Cloud client, or Azure client directly without wrapping or reinitializing. This is the right design — abstract the common case, don't block the uncommon one.

**Built-in Middleware Stack.** Beyond the core adapters, Files SDK ships composable middleware for common storage concerns: `audit` for access logging, `cache` for response caching, `compression` for automatic gzip/brotli, `encryption` at rest, `dedup` for content-addressable storage, `validation` for file type and size limits, `versioning` for object versioning, `soft-delete` for trash/restore workflows, and `failover` for multi-provider redundancy. Each is a separate import, so you only pay for what you use.

**AI Agent Tool Integrations.** The SDK ships subpath exports that wrap a configured `Files` instance as ready-made tools for popular AI SDKs: `files-sdk/ai-sdk` for the Vercel AI SDK, `files-sdk/openai` for OpenAI's Responses API and Agents SDK, and `files-sdk/claude` for Anthropic's Claude Agent SDK. Models can browse, read, and optionally mutate your storage bucket through the same unified surface your application code uses, with configurable approval-gating defaults.

**File Handle API.** The `files.file(key)` method returns a scoped handle for working with a single object repeatedly — upload, check existence, get metadata, generate a signed URL, delete. It's a thin convenience layer over the same adapter methods, keeping your code clean when you're operating on the same file across multiple operations.

### Use Cases

- **Multi-environment web apps** — Use local filesystem for development, S3 for staging, and Cloudflare R2 for production by swapping one import line. No conditional logic, no environment-specific storage modules.
- **SaaS platforms with user file uploads** — Abstract storage so customers can bring their own backend (S3, GCS, Azure) without your application code changing. The unified API makes multi-tenant storage straightforward.
- **AI-powered file processing** — Let AI agents browse, read, and process files in your storage bucket through the Vercel AI SDK or OpenAI Agents SDK integration. Build features like "summarize all PDFs in this folder" without custom tool definitions.
- **Edge-first applications** — Run identical storage code on Cloudflare Workers (R2), Vercel Edge Functions (Vercel Blob), or Netlify Edge (Netlify Blobs) without platform-specific branches.
- **Migration between providers** — Move from S3 to R2 or from Firebase to Supabase by changing adapter imports. The `failover` middleware lets you run both providers simultaneously during transition periods.
- **Local development with real file I/O** — Use the `fs` adapter during development to avoid S3 LocalStack complexity. Files land in a local directory you can inspect with standard tools.

### Pros and Cons

Pros:
- The adapter architecture is genuinely well-designed — tree-shakeable entry points, web-standard types, and the `raw` escape hatch cover both the simple and complex cases without compromise.
- Hayden Bleasel has a track record of shipping and maintaining production-grade open source (next-forge, ultracite, next-sanity). The 274 commits from the lead maintainer in the first month suggest active development, not a drive-by publish.
- The AI tool integrations are forward-looking and practical. As agents become standard in web applications, having storage that "just works" with Vercel AI SDK and OpenAI Agents SDK is a real differentiator.
- Only 3 open issues at the time of writing, which suggests either a stable API surface or a project early enough that edge cases haven't accumulated yet.

Cons:
- At version 1.8.0 with a month of history, the API surface is still settling. The 63 export paths suggest rapid iteration, and breaking changes are likely before a 2.0 release.
- The provider catalog is broad but depth varies. Some adapters (S3, R2, GCS) are clearly more battle-tested than niche ones (Yandex, Oracle Cloud, IDrive E2). Check the test coverage for your specific provider before relying on it.
- No built-in retry or circuit-breaker logic at the SDK level. The `failover` middleware handles multi-provider redundancy, but transient error recovery within a single provider is left to the underlying SDK or your application code.

### Getting Started

```bash
# Install the core SDK
npm install files-sdk

# Add the adapter for your provider (S3 example)
npm install files-sdk @aws-sdk/client-s3 @aws-sdk/s3-presigned-post @aws-sdk/s3-request-presigner
```

Basic usage:

```typescript
import { Files } from "files-sdk";
import { s3 } from "files-sdk/s3";

const files = new Files({
  adapter: s3({ bucket: "my-uploads" }),
});

// Upload a file
await files.upload("avatars/user-123.png", imageBlob, {
  contentType: "image/png",
});

// Download a file
const file = await files.download("avatars/user-123.png");

// Check existence
const exists = await files.exists("avatars/user-123.png");

// Generate a signed URL (expires in 5 minutes)
const url = await files.url("avatars/user-123.png", { expiresIn: 300 });

// File handle API for repeated operations
const avatar = files.file("avatars/user-123.png");
await avatar.upload(newBlob, { contentType: "image/png" });
const meta = await avatar.head();
await avatar.delete();
```

Swap to a different provider by changing two lines:

```typescript
// Switch from S3 to Cloudflare R2
import { r2 } from "files-sdk/r2";

const files = new Files({
  adapter: r2({ bucket: "my-uploads" }),
});
// Everything else stays the same
```

### Alternatives

**AWS SDK v3 (`@aws-sdk/client-s3`)** — The standard choice if you're committed to AWS and only need S3. More feature-complete for S3-specific operations (multipart uploads, lifecycle policies, inventory) but locks you into the AWS ecosystem. Choose it when you need deep S3 integration and don't plan to switch providers.

**Uppy (`@uppy/aws-s3`, `@uppy/google-drive`, etc.)** — A file upload library focused on the client-side experience — drag-and-drop UI, resumable uploads, progress bars, provider integrations (Google Drive, Dropbox, Instagram). Uppy solves the "upload widget" problem, while Files SDK solves the "storage backend" problem. They're complementary, not competing. Choose Uppy when you need a polished upload UI; choose Files SDK when you need backend storage abstraction.

**Uploadthing** — A file upload service built for Next.js that handles the entire upload flow (presigned URLs, storage, CDN) as a managed service. One of the 63 Files SDK adapters is actually `files-sdk/uploadthing`, meaning you can use Uploadthing as a backend through the Files SDK interface. Choose Uploadthing directly when you want a batteries-included managed solution and don't need multi-provider flexibility.

### Verdict

Files SDK is the kind of tool that should have existed years ago. Every fullstack developer has written the "switch between S3 and local storage based on environment" code at least once, and every time it's slightly different and slightly broken. Hayden Bleasel's SDK standardizes that pattern with a clean API, web-standard types, and an adapter architecture that doesn't force you to bundle providers you don't use. The 40+ provider catalog is ambitious for a month-old project, and the AI tool integrations show awareness of where web development is heading. It's early — version 1.8.0, three open issues, mostly one maintainer — so don't bet your critical path on it without testing your specific provider. But for new projects in mid-2026 that need storage abstraction with an eye toward AI agent integration, Files SDK is the cleanest option available. The 1,200 stars in a month suggest the developer community agrees.
