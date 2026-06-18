---
name: lore
description: "Lore is Epic Games' next-gen open source version control system built in Rust — designed for massive repos with large binary assets, with SDKs for JS, Python, Go, and more."
url: https://github.com/EpicGames/lore
stars: 1889
forks: 78
language: Rust
tags: ["version-control", "developer-tools", "open-source", "rust", "epic-games"]
featured: false
publishedAt: 2026-06-18
---

## Lore

### Overview

Lore is a next-generation open source version control system built by Epic Games, and it hit the Hacker News front page with over 1,000 points within days of its public announcement. That kind of signal is rare for a developer tool — it means the project tapped into a frustration that thousands of developers already felt but hadn't seen addressed.

Written in Rust and released under the MIT license, Lore is designed from scratch for repositories that mix code with large binary assets. Think game development, but also think ML model files, design assets, video production pipelines, and any project where your `.gitignore` is doing heavy lifting to avoid storing files that actually matter. The project was created by Epic Games' internal tools team and has been running in production as the built-in version control for UEFN (Unreal Editor for Fortnite), where creators version their islands through it daily.

The core technical innovation is content-addressed storage organized as Merkle trees with an immutable revision chain. Every piece of data — whether it's a one-line config file or a 4GB texture — flows through the same storage primitives as opaque bytes, with text-aware features layered on top. Files are stored as reusable chunks with indexed lookup, which means a 2GB binary that changes by 10MB only transfers and stores that 10MB delta. Git, by comparison, was never designed for this. Git LFS is a bolt-on that adds complexity without solving the fundamental architecture mismatch.

### Why it matters

The version control space has been stagnant for over a decade. Git won the DVCS wars and then just... stopped evolving for large-scale use cases. Perforce became the default in game studios not because it's great, but because Git can't handle the workload. That's a problem that extends well beyond gaming — any team working with large datasets, trained models, media assets, or design files hits the same wall.

Lore represents the first serious attempt by a major company to rethink version control from first principles for modern workloads. The fact that it's MIT-licensed and fully open source matters enormously. Epic isn't building a walled garden — they're explicitly designing for third-party implementation, public specification, and community governance. The roadmap includes a VS Code plugin, OAuth integration, multi-server replication, and open-source desktop and web clients.

For web developers specifically, this connects to a real pain point. Modern fullstack projects increasingly include large assets: generated images, video content, ML model weights for local inference, trained embeddings for RAG pipelines. The JavaScript and Python SDKs mean you can integrate Lore into build scripts, CI/CD pipelines, and deployment workflows without leaving your existing toolchain. If you've ever had to explain Git LFS to a junior developer or debug a corrupted LFS pointer file, you understand why a purpose-built alternative matters.

### Key Features

**Content-Addressed Storage with Merkle Trees.** Repository data is stored and referenced by content hash, enabling fast comparisons, cryptographic integrity checks, and automatic deduplication across history and branches. This is similar to Git's object model but designed from the ground up to handle binary content efficiently, not as an afterthought.

**Chunked Storage for Large Files.** Instead of storing binary files as monolithic blobs, Lore splits them into reusable chunks with indexed lookup. A 500MB texture file that gets a small update only needs to transfer and store the modified chunks. This makes both storage and network operations dramatically more efficient than Git LFS, which still transfers entire files.

**Sparse Workspaces with On-Demand Hydration.** You don't need to download the entire repository to start working. Lore materializes only the files you need, fetching additional data on demand. This is the equivalent of Git's sparse checkout, but built into the architecture rather than grafted on as a workaround. For monorepos with millions of files, this changes the onboarding experience completely.

**Free Branching with Lightweight References.** Branches are mutable references that don't duplicate underlying data, so creating and switching branches has near-zero overhead. The familiar Git workflow of branching, experimenting, and merging carries over — but without the performance penalty on large repositories.

**Full-Surface Multi-Language SDKs.** Lore ships with official SDKs for C/C++, Rust, Go, Python, JavaScript, and C#. The JavaScript and Python packages are available through npm and pip respectively. This means integration into existing build tools, CI pipelines, and automation scripts is straightforward — you're not locked into a proprietary CLI.

**Three-Way Merge for Text, Explicit Conflict Resolution for Binaries.** Text files get standard three-way merge handling for the common case of two contributors editing different parts of the same file. Binary files surface as explicit divergence that the user resolves by choosing which version to carry forward. File locking is available now (inform-based, not enforce-based), with scalable enforcement on the roadmap.

**Centralized Server with Replaceable Storage Backends.** The reference implementation uses AWS S3 for durable storage and DynamoDB for mutable metadata, but the storage and transport layers sit behind documented interfaces. Third-party backends can implement their own. Local mode runs with zero configuration — no cloud account, no certificates, no external dependencies.

### Use Cases

- **Game development teams** managing large binary assets (textures, models, audio) alongside code — the original design target, and where Lore's chunked storage provides the most dramatic improvement over Git LFS.
- **ML/AI teams** versioning trained model weights, embeddings, and dataset files that are too large for Git but need proper revision history and branch-based experimentation.
- **Fullstack teams with media-heavy projects** — e-commerce sites with thousands of product images, video platforms, or design system repositories with large component libraries.
- **Monorepo architectures** where sparse checkout performance matters and developers need to work on a subset of a massive codebase without cloning everything.
- **CI/CD pipelines** that need programmatic access to version control operations — the JavaScript and Python SDKs integrate directly into build scripts and deployment automation.

### Pros and Cons

Pros:
- MIT-licensed and fully open source with a public specification, meaning no vendor lock-in and the ability to implement custom backends or clients. Epic has committed that core functionality will never be paywalled.
- Purpose-built architecture for large binary assets that handles multi-gigabyte files efficiently, solving a problem that Git LFS only papered over.
- Backed by Epic Games with production usage in UEFN, giving it credibility and long-term maintenance assurance that hobby projects can't match.
- Multi-language SDKs (JS, Python, Go, C#, Rust, C/C++) make integration into existing toolchains practical from day one.

Cons:
- Pre-stable 0.x release means APIs and protocols may change before 1.0. Production adoption today requires accepting potential migration work for breaking changes.
- No VS Code plugin, OAuth integration, or multi-server replication yet — these are on the roadmap but not shipping. The current developer experience is CLI-first.
- File locking is inform-based only, not enforced. Teams working with binary assets where conflicts are expensive need to establish workflow discipline rather than relying on the tool to prevent simultaneous edits.
- Limited ecosystem compared to Git — no GitHub/GitLab integration, no established CI/CD templates, no Stack Overflow answers. You're an early adopter.

### Getting Started

```bash
# Download the latest release for your platform
# Visit: https://github.com/EpicGames/lore/releases

# Or clone and build from source (requires Rust toolchain)
git clone https://github.com/EpicGames/lore.git
cd lore
cargo build --release

# Start a local server (zero configuration needed)
./target/release/lore-server --local

# Create your first repository
./target/release/lore init my-project
cd my-project

# Add and submit files
echo "Hello, Lore!" > README.md
./target/release/lore add README.md
./target/release/lore commit -m "Initial commit"

# Create a branch
./target/release/lore branch feature/new-thing
./target/release/lore checkout feature/new-thing
```

For the JavaScript SDK:

```bash
npm install @epicgames/lore-js
```

For the Python SDK:

```bash
pip install lore-python
```

Read the full quickstart guide at https://epicgames.github.io/lore/tutorials/quickstart/

### Alternatives

**Git + Git LFS** — The incumbent solution for versioning large files. Git LFS works for moderate binary workloads but adds complexity (pointer files, separate storage server, `git lfs pull` commands) and doesn't solve the fundamental performance issues with very large repositories. Choose Git LFS if your team is already invested in the Git ecosystem and your binary assets are under 100GB total.

**Perforce (Helix Core)** — The industry standard in game development and enterprise environments with large binary assets. Perforce handles massive repositories well but is proprietary, expensive, and requires dedicated server infrastructure. Choose Perforce if you need battle-tested enterprise support and your organization can absorb the licensing costs.

**Plastic SCM (now Unity Version Control)** — Another version control system designed for game development with strong binary file support and a visual merge tool for non-code assets. Acquired by Unity, it has good integration with the Unity engine but less relevance outside that ecosystem. Choose Plastic SCM if you're a Unity shop and want tight engine integration.

### Verdict

Lore is the most significant version control announcement since Git itself, and I don't say that lightly. The combination of a principled architecture (content-addressed Merkle trees, chunked binary storage, sparse workspaces), an MIT license, and backing from a company that actually runs it in production at scale makes this qualitatively different from every previous "Git alternative" that's appeared and faded. The 1,087 Hacker News points and nearly 1,900 GitHub stars within a month confirm that the developer community sees the same potential. It's early — the 0.x status, missing VS Code integration, and incomplete locking are real limitations — but the trajectory is clear. If your projects involve anything larger than text files, Lore deserves a spot on your watchlist. For game studios, ML teams, and media-heavy web projects, it's worth prototyping with today.
