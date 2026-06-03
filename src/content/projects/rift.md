---
name: rift
description: "Rift is a Rust-powered git worktree alternative with copy-on-write snapshots that create instant workspace copies in under 0.1 seconds."
url: https://github.com/anomalyco/rift
stars: 474
forks: 6
language: Rust
tags: ["developer-tools", "git", "productivity", "rust", "copy-on-write"]
featured: false
publishedAt: 2026-06-03
---

## Rift

### Overview

Rift is a filesystem-level workspace cloner that makes `git worktree` feel slow. It uses copy-on-write primitives — btrfs snapshots on Linux, APFS `clonefile` on macOS, and XFS reflinks — to create full copies of your project directory in under 0.1 seconds, even on 10GB folders. The copy doesn't actually duplicate data until you modify it. It landed on GitHub in late May 2026 and crossed 470 stars in its first three days.

The project comes from Anomaly, a company that's been building developer infrastructure tooling. The repo is MIT-licensed and written in Rust, with npm and Bun packages for the CLI and a JavaScript/TypeScript FFI API. That dual nature — a Rust binary distributed through the npm registry — makes it accessible to web developers who live in the JavaScript ecosystem without sacrificing the performance that only native code provides.

The core problem Rift solves is one every developer knows: you're working on a feature branch, a hotfix comes in, and you need a clean workspace fast. `git worktree` works but has limitations — it shares the `.git` directory, which means operations like `git gc` or amending commits can interfere across workspaces. Manual `cp -r` is safe but painfully slow on large repos. Docker volumes and VM snapshots are heavyweight. Rift sits in the sweet spot: instant creation, full isolation, negligible disk overhead until you actually change files.

### Why it matters

Developer productivity tools tend to get overlooked in favor of flashier AI announcements, but the compound effect of shaving seconds off repetitive workflows is massive. If you create workspaces 5 times a day and save 30 seconds each time, that's 2.5 minutes daily — which sounds trivial until you multiply it across a team of 20 developers over a year. More importantly, the friction of slow workspace creation shapes behavior: developers avoid creating clean workspaces, they context-switch less, they test in dirty environments. Removing that friction changes how people work.

The timing is also relevant because AI coding agents are creating more parallel work. Tools like Claude Code, Cursor, and Codex increasingly benefit from isolated workspaces where agents can run without polluting your main working directory. Rift's instant workspace creation makes that pattern practical. You can spin up a workspace, let an agent run a refactor, review the diff, and discard it — all in seconds.

The copy-on-write approach isn't new (Docker has used overlayfs for years, and ZFS/btrfs users have known about snapshots forever), but packaging it as a developer-facing CLI tool with a clean API is. The fact that it works through the npm registry and has a JavaScript API means it can be integrated into build scripts, CI pipelines, and custom tooling without requiring ops expertise.

### Key Features

**Instant Copy-on-Write Snapshots.** Rift creates workspace copies by leveraging filesystem-level primitives rather than copying bytes. On btrfs, it creates a writable subvolume snapshot. On macOS, it uses APFS `clonefile`. On XFS, it uses per-file reflinks. The result is sub-second creation regardless of directory size. The benchmark in the repo claims under 0.1 seconds on a 10GB folder, which tracks with how these filesystem features work — the actual data copy is deferred until write operations occur.

**Git-Aware Workspace Isolation.** When the source workspace is a Git repository, Rift's created workspace gets a detached HEAD and retains the index and working-tree state at the time of creation. This means you get a fully functional Git workspace that you can commit, branch, and amend in without affecting the original. It's more isolated than `git worktree` because each workspace has its own `.git` state rather than sharing a common directory.

**JavaScript/TypeScript FFI API.** Beyond the CLI, Rift exposes `create`, `list`, `remove`, `ancestors`, `gc`, and `init` functions through a JavaScript API. It uses Bun's FFI by default and falls back to Node.js's experimental FFI (Node 26.1+). This makes it composable — you can build workspace management into your own scripts, monorepo tools, or CI pipelines. The API throws typed `RiftError` objects with `code` and `path` properties.

**Hierarchical Workspace Management.** Workspaces form a tree. Each created workspace records its parent, and you can list children with `rift list` and trace ancestry with `rift ancestors`. Removed workspaces go to adjacent `.trash` storage rather than being deleted immediately, and `rift gc` handles actual cleanup. This tree structure maps naturally to how developers think about branches and experiments — each workspace is a fork of its parent.

**Shell Integration.** The `rift shell-init zsh` (or bash, nushell) command sets up a wrapper that automatically changes directory after `rift init`, `rift create`, or removal of the current workspace. It's a small thing, but the auto-cd behavior means you're immediately working in the new workspace after creation without an extra `cd` command. Nushell support is a nice touch for developers who've moved beyond bash/zsh.

**Cross-Platform Filesystem Detection.** Rift automatically detects the filesystem backend and chooses the optimal strategy. On Linux with btrfs, it uses subvolume snapshots. On Linux with XFS (reflink-enabled), it uses per-file reflinks. On macOS, it uses APFS `clonefile`. Windows is published to npm but workspace creation isn't implemented yet. The platform table in the README is refreshingly honest about what works and what doesn't.

### Use Cases

- **Hotfix isolation** — You're deep in a feature branch when a production bug report comes in. Instead of stashing or committing WIP, create a rift, fix the bug in the clean workspace, and switch back when done. The whole detour takes seconds.
- **AI agent sandboxing** — Run Claude Code or Codex in an isolated workspace copy so the agent can modify files, run builds, and test changes without touching your main working directory. Review the diff, merge what works, discard the rest.
- **Multi-branch testing** — Test the same change against multiple branches simultaneously by creating rifts from different branch states. Useful for verifying that a library change doesn't break downstream consumers.
- **Code review exploration** — Create a rift to check out a PR branch, explore the changes, run the test suite, and delete the workspace when done. No need to stash your work or maintain a separate worktree.
- **Monorepo partial workspaces** — In large monorepos, create a rift and then prune the directories you don't need. The copy-on-write nature means the pruned files don't cost disk space until the original changes.

### Pros and Cons

Pros:
- Genuinely instant workspace creation through filesystem-level copy-on-write. Not a trick or approximation — the underlying primitives (btrfs snapshots, APFS clonefile) are battle-tested and used by Docker, ZFS, and production storage systems.
- The JavaScript API and npm distribution make it accessible to web developers who wouldn't normally install Rust binaries manually. `npm install -g rift-snapshot` is as low-friction as it gets.
- Git-aware behavior (detached HEAD, retained index state) means you get real Git isolation, not just a filesystem copy. This is a meaningful improvement over `git worktree` for certain workflows.
- MIT licensed with active development — 474 stars in 3 days suggests real developer interest, not manufactured hype.

Cons:
- Explicitly marked as experimental. The README warns that "behavior, interfaces, and implementation details may change without notice." Don't build critical tooling on top of it yet.
- Platform support is limited. Windows doesn't work. On Linux, you need btrfs or reflink-enabled XFS — most default Linux installs use ext4, which means you'd need to reformat or use a separate partition. macOS support is solid though.
- The Node.js FFI binding requires Node 26.1+ with `--experimental-ffi` and `--allow-flags`. That's bleeding-edge Node territory. Bun works more naturally.
- No Windows support at all. The npm package is published but workspace creation throws. For teams with mixed OS environments, this is a non-starter today.

### Getting Started

```bash
# Install globally via npm or Bun
npm install -g rift-snapshot
# or
bun add -g rift-snapshot

# Initialize a project directory
cd ~/code/my-app
rift init

# Create an instant workspace copy
rift create
rift create --name hotfix-auth
rift create --into /fast-ssd/rifts

# List active workspaces
rift list

# Trace workspace ancestry
rift ancestors

# Remove and clean up
rift remove
rift gc

# Shell integration (auto-cd after create/remove)
eval "$(rift shell-init zsh)"
```

JavaScript API usage:

```ts
import { create, list, remove, gc } from "rift-snapshot";

const workspace = create({ from: process.cwd(), name: "feature-test" });
console.log(list({ of: process.cwd() }));
remove({ at: workspace });
gc();
```

### Alternatives

**git worktree** — The built-in Git solution for multiple working directories. It's more mature, works on all platforms, and doesn't require specific filesystem support. But worktrees share the `.git` directory, which means operations like `git gc`, rebasing, or amending can cause issues across workspaces. Choose worktree when you need cross-platform support and don't mind the shared `.git` constraint.

**Docker volumes / dev containers** — Full environment isolation including dependencies, OS packages, and runtime versions. Much heavier than Rift but provides complete reproducibility. Choose Docker when you need environment isolation (different Node versions, system libraries) rather than just file isolation.

**Manual cp / rsync** — The brute-force approach. Works everywhere, no special requirements, but is painfully slow on large repositories (minutes for a 10GB folder vs. sub-second for Rift). Choose manual copy when you need a one-off clone and don't care about speed, or when you're on a filesystem that doesn't support copy-on-write.

### Verdict

Rift is the kind of tool that makes you wonder why it didn't exist before. The `git worktree` gap — shared `.git` state, slow creation on large repos, no filesystem-level deduplication — has been a low-grade annoyance for years, and Rift addresses it with the right abstraction level. It's not trying to replace Git; it's filling in the workspace management layer that Git never built.

The experimental status is real — I wouldn't ship it into a CI pipeline today, and the platform limitations (no Windows, btrfs/XFS requirement on Linux) mean it's currently macOS-first. But the core technology is sound. Copy-on-write filesystem primitives are the same ones Docker, ZFS, and every serious storage system relies on. The question is whether the packaging and API mature before the novelty wears off.

For web developers on macOS who work with AI coding agents and frequently need isolated workspaces, Rift is worth installing today. For everyone else, watch the repo. If Linux ext4 support and Windows materialize, this could become a standard part of the developer toolkit.
