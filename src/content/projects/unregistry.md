---
name: unregistry
description: "Push Docker images directly to remote servers over SSH without an external registry — like rsync for containers. Written in Go."
url: https://github.com/psviderski/unregistry
stars: 4767
forks: 88
language: Go
tags: ["docker", "devops", "go", "deployment", "containers"]
featured: false
publishedAt: 2026-06-06
---

## Unregistry

### Overview

Unregistry is a lightweight container image registry that stores and serves images directly from your Docker daemon's storage. Its killer feature is `docker pussh` (extra 's' for SSH) — a command that pushes Docker images straight to remote servers over SSH, transferring only the missing layers. It crossed 4,700 GitHub stars after a Hacker News front-page appearance in early June 2026, where it hit 726 points and sparked a long discussion about deployment pain points.

The project is created by Pavel Sviderski, who also built [Uncloud](https://github.com/psviderski/uncloud), a lightweight tool for deploying containers across multiple Docker hosts. Unregistry started as infrastructure for Uncloud — they needed something simpler than a full registry but more efficient than `docker save | ssh server docker load`. That origin story matters: this isn't a solution looking for a problem. It was built to scratch a specific itch that every developer who deploys Docker containers has felt.

The core problem is painfully familiar. You build a Docker image locally. You need it on your server. Your options are: push to Docker Hub or GHCR (exposes your code or costs money for private repos), run a self-hosted registry (another service to maintain, secure, and store), use `docker save/load` (transfers the entire image even when 90% already exists on the server), or rebuild remotely (wastes time and server resources). Unregistry eliminates all of these tradeoffs with a single command that works like `rsync` for Docker images.

### Why it matters

For fullstack web developers, deployment is where good intentions go to die. You've built your React frontend, your NestJS API, your Go microservice — and now you need to get those containers onto a VPS without paying for a registry subscription or maintaining extra infrastructure. The Docker ecosystem has been surprisingly hostile to this simple use case. Docker Hub's free tier limits you to one private repo. GitHub Container Registry requires authentication setup. Self-hosted solutions like Harbor or the official registry distribution are heavyweight for a solo developer or small team.

Unregistry fits into a broader trend of developer tools that eliminate middlemen. Just as Cloudflare Pages removed the need for a separate CDN, and SQLite removed the need for a database server for many apps, Unregistry removes the need for a container registry for direct deployment workflows. It's especially relevant now that containerd image store is becoming the default in Docker — Unregistry stores images natively in containerd, meaning zero duplication and instant availability.

The Go implementation matters too. The entire `docker-pussh` plugin is a shell script that orchestrates SSH tunnels and temporary containers. There's no daemon to install, no configuration file to write, no systemd service to manage. You install the plugin, and `docker pussh` just works. That simplicity is why it spread so fast on HN — developers could try it in under two minutes.

### Key Features

**Direct SSH Image Transfer.** The `docker pussh` command establishes an SSH tunnel to the remote server, starts a temporary unregistry container, forwards a local port, and pushes only the missing layers. It's the same differential transfer logic that makes `rsync` fast, applied to container images. If your server already has 90% of the layers from a previous deploy, only that last 10% gets transferred.

**Zero Infrastructure Required.** No registry server to set up, no TLS certificates to manage, no authentication to configure, no storage backends to provision. Unregistry runs as a temporary container on the remote host during the push operation, then stops itself. The image ends up directly in the Docker daemon's storage on the server. For solo developers and small teams, this removes a significant operational burden.

**Containerd Native Storage.** When Docker's containerd image store is enabled (increasingly the default), Unregistry stores images directly in containerd's image store. This means images pushed through Unregistry are immediately available to Docker with zero duplication. No double-storage, no extra pull step. The image exists once and Docker can use it directly.

**Docker CLI Plugin Architecture.** Unregistry installs as a standard Docker CLI plugin. After installation, `docker pussh` appears alongside built-in commands like `docker push` and `docker pull`. It respects your existing SSH configuration, including custom keys, ports, and config files. The familiar interface means zero learning curve — if you can type `docker push`, you can type `docker pussh`.

**Multi-Platform Image Support.** For teams building multi-architecture images (common when your dev machine is ARM Mac but your server is x86), Unregistry supports pushing specific platforms with `--platform linux/amd64`. Your local Docker needs containerd image store enabled for multi-platform support, but the Unregistry side handles it transparently.

**Layer Deduplication and Efficiency.** Before transferring anything, Unregistry compares the local image layers against what already exists on the remote server. Only layers that are missing get transferred over the SSH tunnel. For iterative deployments where you're changing a single file in a 500MB image, this can reduce transfer size from minutes to seconds.

### Use Cases

- **Solo developer deploying to a VPS** — You have a $5/month DigitalOcean droplet and a Dockerized Next.js app. Instead of setting up GHCR auth or a private registry, just `docker pussh myapp:latest root@myserver` and you're done.
- **Small team with multiple staging servers** — Push the same image to staging, QA, and production servers without maintaining a shared registry. Each server gets exactly the layers it needs.
- **CI/CD pipelines that skip the registry** — In your GitHub Actions workflow, build the image and push it directly to the deployment server. Eliminates the registry as a bottleneck and attack surface.
- **Air-gapped or restricted environments** — When your servers can't reach Docker Hub or GHCR, pre-load the Unregistry image once and then push all subsequent images over SSH. No internet required for the actual image transfers.
- **Side projects and hobby deployments** — When you don't want to think about container registries at all. The overhead of configuring a registry for a weekend project is absurd. Unregistry makes the simple thing simple.

### Pros and Cons

Pros:

- Eliminates the need for any container registry infrastructure. For developers who just want to deploy their apps, this removes an entire category of operational complexity.
- Layer-level differential transfers make it fast. The `rsync` analogy is accurate — you're not re-uploading unchanged base layers every time you rebuild your app image.
- Zero configuration. Install the plugin, and `docker pussh` works with your existing SSH setup. No config files, no environment variables (unless you want custom settings).
- Apache 2.0 license and active maintenance from the Uncloud team, with 88 forks and a Discord community for support.

Cons:

- Requires SSH access to the remote server with Docker permissions. If your hosting provider only offers a web UI or API for deployments (like Railway, Render, or Fly.io), Unregistry won't help you.
- The containerd image store requirement for optimal performance is still not the default on all Docker installations. Without it, you get double storage and an extra pull step.
- Windows is not officially supported. You can try WSL 2, but it's not a first-class experience.
- Single-server pushes only. If you need to deploy to 50 servers simultaneously, a proper registry with pull-based deployment is still the better architecture.

### Getting Started

```bash
# Install via Homebrew (macOS/Linux)
brew install psviderski/tap/docker-pussh

# Create the Docker CLI plugin symlink
mkdir -p ~/.docker/cli-plugins
ln -sf $(brew --prefix)/bin/docker-pussh ~/.docker/cli-plugins/docker-pussh

# Verify installation
docker pussh --help

# Push an image to a remote server
docker pussh myapp:latest user@server.example.com

# With a specific SSH key
docker pussh myapp:latest ubuntu@192.168.1.100 -i ~/.ssh/id_rsa

# With a custom SSH port
docker pussh myapp:latest user@server:2222

# Push a specific platform (e.g., x86 server from ARM Mac)
docker pussh myapp:latest user@server --platform linux/amd64
```

### Alternatives

**Docker Hub / GitHub Container Registry** — The default choice for most teams. Works well when you're okay with public images or paying for private repos. The advantage is ecosystem integration: automated builds, vulnerability scanning, and team access controls. Choose a hosted registry when you need collaboration features, CI/CD integration, or don't have SSH access to your servers.

**Harbor** — The enterprise-grade self-hosted registry. Replication, RBAC, vulnerability scanning, and chartmuseum integration. It's the right choice when you're running a platform team that needs to manage images across multiple environments with fine-grained access control. Massive overkill for pushing a side project to a VPS.

**`docker save | ssh server docker load`** — The zero-dependency approach that Unregistry explicitly improves upon. It works, but it transfers the entire image every time, regardless of what's already on the server. For a 200MB image on a slow connection, that's painful. Unregistry gives you the same simplicity with differential transfers.

### Verdict

Unregistry is one of those tools that makes you wonder why it didn't exist years ago. The problem it solves — getting a Docker image from your laptop to your server without ceremony — is something every developer faces, and the existing solutions are all不同程度 annoying. Docker Hub wants your money or your privacy. Self-hosted registries are operational overhead. `docker save/load` is wasteful. Unregistry cuts through all of it with a single command that does exactly what you expect.

It's not going to replace Harbor at a Fortune 500 company, and it's not trying to. It's for the developer who builds a Docker image and wants it on their server *now*, without configuring anything. At 4,700 stars and climbing, with active development from the Uncloud team, it's earned its place in the "why didn't I know about this sooner" category. If you deploy Docker containers to servers you have SSH access to, install it today. You'll use it within the week.
