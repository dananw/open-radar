---
name: files-sdk
description: "Files SDK is a unified TypeScript storage library with 50+ adapters for S3, GCS, Azure, Vercel Blob, and more — one API, web-standard I/O, AI tool integrations."
url: https://github.com/haydenbleasel/files-sdk
stars: 1188
forks: 32
language: TypeScript
tags: ["storage", "sdk", "typescript", "s3", "ai-agents"]
featured: false
publishedAt: 2026-06-03
---

## Files SDK

### Overview

Files SDK is a unified TypeScript storage library that gives you one clean API across 50+ storage backends — S3, Google Cloud Storage, Azure Blob, Vercel Blob, Cloudflare R2, MinIO, Dropbox, Google Drive, OneDrive, Supabase, Firebase, and a lot more. It hit 1,100 stars in under a month after its May 2026 launch, which is fast for a utility library without a flashy demo.

The project comes from Hayden Bleasel, a San Francisco-based developer with 1,400 GitHub followers and a track record of clean open-source work (his `ghost` game server library has a following). He's clearly someone who's dealt with storage abstraction pain in production and decided to solve it properly rather than write another wrapper.

The core problem is familiar to every fullstack developer: you start with local filesystem storage, move to S3 when you deploy, then your PM says "we need to support Google Drive too," and suddenly you're maintaining three different storage integrations with incompatible APIs. Files SDK collapses all of that into a single interface. Upload, download, delete, list, copy, move — same function signatures whether you're targeting S3, Azure, or the local filesystem. And the bodies are web-standard types: `Blob`, `File`, `ReadableStream`, `Uint8Array`, `ArrayBuffer`, `string`. No provider-specific types leak into your application code.

### Why it matters

Storage abstraction isn't a new problem — there are older libraries like `pkgcloud` and various S3 wrappers — but Files SDK arrives at a moment when two trends make it more relevant than ever.

First, the storage landscape has fragmented. Ten years ago you used S3 or maybe Google Cloud Storage. Today developers choose between S3, R2, MinIO, Supabase Storage, UploadThing, Vercel Blob, Netlify Blobs, Cloudinary, Firebase Storage, and dozens of others. Each has its own SDK, its own types, its own authentication model. The cognitive overhead of switching between them — or supporting multiple — has become a real tax on development velocity.

Second, AI agents need file access. The Vercel AI SDK, OpenAI's Agents SDK, and Anthropic's Claude Agent SDK all have tool-calling interfaces where models need to browse, read, and write files. Files SDK ships ready-made tool wrappers for all three — `files-sdk/ai-sdk`, `files-sdk/openai`, `files-sdk/claude` — so your agent can interact with your storage backend through the same unified surface as your application code. That's a surprisingly hard thing to do well, and the fact that it ships out of the box is a strong signal about where this library is heading.

### Key Features

**50+ Storage Adapters.** The adapter catalog covers the full spectrum: S3 and every S3-compatible store (R2, MinIO, DigitalOcean Spaces, Backblaze B2, Wasabi, Filebase, Storj), the big three cloud providers (AWS, GCS, Azure), edge/serverless platforms (Vercel Blob, Netlify Blobs, Cloudflare R2), developer-focused services (Supabase, Firebase, PocketBase, Convex, UploadThing, Appwrite), consumer providers (Dropbox, Google Drive, OneDrive, SharePoint, Box), and protocol-based options (FTP, SFTP, local filesystem). Each adapter is a separate entry point — you only bundle what you import.

**Web-Standard I/O.** All file operations accept and return standard web types: `Blob`, `File`, `ReadableStream`, `Uint8Array`, `ArrayBuffer`, or `string`. No AWS SDK types, no Azure-specific buffers, no custom wrappers. This means your upload handler works identically whether the file comes from a browser `<input>`, a Node.js buffer, or a worker stream. The API shape stays constant across environments.

**AI Tool Integrations.** Files SDK ships subpath exports that wrap a configured `Files` instance as ready-made tools for the Vercel AI SDK, OpenAI's Responses API and Agents SDK, and Anthropic's Claude Agent SDK. Models can browse, read, and optionally mutate your storage bucket through tool calling, with approval-gating defaults so the AI doesn't go rogue deleting your files. This is the kind of integration that would take days to build manually and it's just an import away.

**File Handles.** The `files.file(key)` method returns a scoped handle for working with a single object repeatedly. Call `upload`, `exists`, `head`, `url`, `delete` on the handle without repeating the key. It's a thin convenience layer, but it makes code that works with specific files — user avatars, document uploads, config files — much cleaner. Handles don't require adapters to implement anything extra.

**CLI and MCP Server.** The `files` binary gives you full SDK parity from the command line. Upload, download, list, sync, manage any connected storage backend without writing code. The MCP server means AI tools like Claude Desktop can interact with your storage directly. Both came in the v1.6.0 release, showing the project's commitment to making storage accessible beyond the TypeScript runtime.

**Sync Between Providers.** The `sync()` method (added in v1.7.0) mirrors objects between two providers incrementally, skipping files that are already identical by comparing size and etag. Need to replicate from S3 to R2? Or mirror a Dropbox folder to local storage? One function call with optional pruning to delete destination objects that don't exist at the source.

**Escape Hatch via Native Clients.** Every adapter exposes its underlying native client at `files.raw`. When you need S3 multipart upload with custom part sizes, or Azure's specific blob tier settings, you don't hit a wall — you reach through to the native SDK. This design philosophy — unified API for 95% of operations, direct access for the other 5% — is pragmatic and avoids the trap of over-abstraction.

### Use Cases

- **Multi-cloud storage migration** — Moving from AWS S3 to Cloudflare R2 (or any combination) without rewriting application code. Swap the adapter import, test, deploy. The sync method handles data migration too.

- **AI-powered file management** — Building agents that browse, organize, and process files in your storage bucket. The AI SDK integrations let you give Claude or GPT structured access to your files with approval controls.

- **Fullstack apps with serverless backends** — A Next.js app on Vercel using Vercel Blob in production and local filesystem in development. Same code, different adapter based on environment. No conditional imports or feature flags needed.

- **Content pipelines and media processing** — Upload to one provider, process (resize, compress, transcode), store results in another. The unified API makes multi-step storage workflows read naturally.

- **Developer tools and CLIs** — Building tools that need to interact with cloud storage without knowing which provider the user prefers. The CLI ships as part of the package, so you can wrap it or use the programmatic API.

### Pros and Cons

Pros:
- The adapter count (50+) is genuinely impressive and covers providers most developers haven't heard of, let alone considered. This is a library that will grow with your infrastructure choices rather than constrain them.
- Web-standard types mean zero friction between browser, Node.js, Deno, Bun, and edge runtime environments. No polyfills, no type gymnastics.
- The AI tool integrations are ahead of the curve — most storage libraries haven't even considered this use case yet. Files SDK treats AI agents as first-class consumers.
- MIT licensed with active development: 7 releases in 3 weeks, each adding meaningful features (bulk operations, CLI, MCP server, sync).

Cons:
- At 1,188 stars and 32 forks, the community is still small. You're early-adopting, which means fewer Stack Overflow answers, fewer blog posts, and a higher chance of encountering edge cases that haven't been tested.
- Each adapter's peer dependencies add install complexity. Supporting S3 + GCS + Azure means three separate SDK packages plus files-sdk itself. Not a problem in practice, but the initial setup can feel heavy.
- The project is under a month old. While the code quality looks solid and the TypeScript types are well-designed, production confidence takes time to build. Breaking changes are possible before a v2 stable.

### Getting Started

```bash
# Install the core package
npm install files-sdk

# Add the adapter(s) you need — example with S3
npm install files-sdk @aws-sdk/client-s3 @aws-sdk/s3-presigned-post @aws-sdk/s3-request-presigner

# For Cloudflare R2
npm install files-sdk @aws-sdk/client-s3 @aws-sdk/s3-presigned-post @aws-sdk/s3-request-presigner

# For Vercel Blob
npm install files-sdk @vercel/blob

# For local filesystem (no extra deps)
npm install files-sdk
```

Basic usage:

```typescript
import { Files } from "files-sdk";
import { s3 } from "files-sdk/s3";

const files = new Files({
  adapter: s3({ bucket: "uploads" }),
});

// Upload
await files.upload("avatars/abc.png", file, { contentType: "image/png" });

// Download
const got = await files.download("avatars/abc.png");

// Check existence
const exists = await files.exists("avatars/abc.png");

// Generate a presigned URL
const url = await files.url("avatars/abc.png", { expiresIn: 300 });

// File handle for repeated access
const avatar = files.file("avatars/abc.png");
await avatar.upload(file, { contentType: "image/png" });
const meta = await avatar.head();
await avatar.delete();
```

Swap adapters by changing one import line — the rest of your code stays identical:

```typescript
import { gcs } from "files-sdk/gcs";
// import { azure } from "files-sdk/azure";
// import { vercelBlob } from "files-sdk/vercel-blob";

const files = new Files({
  adapter: gcs({ bucket: "my-bucket" }),
});
```

Use with AI agents:

```typescript
import { createTools } from "files-sdk/ai-sdk";

const tools = createTools(files);
// Pass to your Vercel AI SDK agent — files become available as tools
```

### Alternatives

**AWS SDK v3 (`@aws-sdk/client-s3`)** — The official AWS SDK is the most mature option if you're only using S3. It supports every S3 feature including multipart uploads, object locking, and inventory. But it's AWS-only, the API is verbose, and the types are heavy. Choose it when you need deep S3-specific features and know you'll never switch providers.

**Cloudflare R2 SDK** — If you're all-in on Cloudflare, the R2 SDK via `@aws-sdk/client-s3` with R2 endpoints works fine. But it's just S3 with a different endpoint — you get no abstraction layer, no AI integrations, and switching to another provider means rewriting everything. Files SDK uses the same S3 compatibility layer but gives you portability.

**Uppy** — A file upload library focused on the browser experience (drag-and-drop, progress bars, resumable uploads). Uppy is complementary rather than competitive — it handles the frontend upload UX while Files SDK handles the backend storage abstraction. You could use both together: Uppy for the upload widget, Files SDK for the server-side storage operations.

### Verdict

Files SDK is the storage abstraction library TypeScript developers didn't know they needed until they tried it. The 50+ adapter count is not padding — every adapter listed has real users with real use cases, from the obvious (S3, GCS) to the niche (Storj, IDrive E2, Yandex). The web-standard I/O decision means this library works everywhere JavaScript runs, and the AI tool integrations position it well for the agent-heavy development workflows that are becoming standard. It's young — less than a month old — and that's the main risk. But the code is clean, the TypeScript types are excellent, the release cadence is aggressive, and the design philosophy (unified API for common operations, escape hatch for everything else) is exactly right. If you're building a fullstack app in 2026 and want storage portability without the overhead of a full ORM or abstraction layer, Files SDK is worth adding to your stack today.
