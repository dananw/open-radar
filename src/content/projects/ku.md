---
name: ku
description: "A fast keyboard-driven Kubernetes TUI built with Go and BubbleTea. Browse resources, edit objects, follow logs, and shell into pods without leaving the terminal."
url: https://github.com/bjarneo/ku
stars: 329
forks: 12
language: Go
tags: ["kubernetes", "tui", "go", "devops", "kubectl", "terminal"]
featured: false
publishedAt: 2026-06-18
---

## ku

### Overview

ku is a keyboard-driven terminal UI for Kubernetes, built in Go with Charm's BubbleTea framework. It hit 300 GitHub stars within five days of its June 13 launch, which is a strong signal for a CLI tool in a space dominated by k9s. The name is short for Kubernetes — and also the Norwegian word for cow, which explains the ASCII art.

The project is created by bjarneo (known on X as @iamdothash), a Norwegian developer. The tool draws inspiration from k9s, Lens, and lazygit, taking the keyboard-first philosophy of each and combining them into a single binary. Unlike k9s, which has accumulated years of complexity and configuration surface area, ku takes a cleaner approach: read-only by default, with a toggle for edit mode that requires explicit confirmation.

The core problem ku solves is the friction between `kubectl` commands and full GUI tools like Lens or Rancher. Developers who live in the terminal know the pain: you need to check a pod status, so you type `kubectl get pods -n my-namespace`, then `kubectl describe pod`, then `kubectl logs`, then maybe `kubectl exec`. Each command is a context switch. ku collapses all of that into a single interactive interface where you navigate with arrow keys and Tab, with every available action visible in the status bar.

### Why it matters

The Kubernetes tooling landscape hasn't changed much since k9s became the default terminal UI for cluster management. k9s is powerful, but its configuration is sprawling, its plugin system is complex, and new users face a steep learning curve. ku offers a different philosophy: sensible defaults, minimal configuration, and safety-first design.

What makes ku interesting for Go developers specifically is the BubbleTea foundation. Charm's TUI framework has become the standard for building terminal applications in Go, and ku is a good example of how far you can push it. The cockpit overview on launch — showing cluster health, node CPU and memory gauges, pod status, and recent warnings — feels polished in a way that most Go TUI tools don't.

There's also a broader trend here: developers are consolidating their toolchains. The same people writing React frontends and Go backends want their infrastructure tools to feel as polished as their IDE. ku fits that expectation. It's fast, it looks good, and it doesn't require reading a 50-page configuration guide to get started.

### Key Features

**Read-Only Safety Mode.** ku starts in read-only mode by default. Every mutating action — edit, delete, rollout restart, scale, CronJob trigger, cordon, drain, and shell into pods — is disabled. You can browse, describe, view YAML, tail logs, and preview kubectl commands without risk. This is the single best design decision in the project. For teams where multiple developers have cluster access, the default read-only state prevents accidental damage. Toggle edit mode with `Shift+E` when you actually need to make changes.

**Cockpit Overview Dashboard.** On launch, ku shows a cockpit view with cluster health metrics: node CPU and memory gauges, pod and deployment status, and recent warning events. This gives you an immediate sense of whether something is wrong without running five separate kubectl commands. It's the kind of at-a-glance information that makes morning check-ins faster.

**lazygit-Style Layout.** The interface follows the lazygit pattern: a left sidebar for resource navigation, Tab to switch between panes, and a persistent status bar showing available keybindings. If you've used lazygit for Git operations, ku will feel immediately familiar. The status bar is context-aware — it only shows keys that work in the current mode and context, reducing visual noise.

**Developer View Mode.** The `--dev` flag switches to a developer view that hides cluster admin resources — nodes, persistent volumes, storage classes, namespaces, events — and disables node operations. CRD discovery is turned off too. This mode is designed for application developers who only manage their own services, not the cluster infrastructure. It composes with edit mode, so you can have `ku --dev --edit` for a focused development workflow.

**Customizable Sidebar with CRD Support.** ku reads an optional config file from `~/.config/ku/config.yaml` for sidebar customization. Adding CRDs is straightforward: run `ku config init` to seed the defaults, then add entries under any section. The `resource` field accepts plural, singular, kind, short name, or group-qualified keys. Resources your cluster doesn't expose are automatically dropped, and empty sections are hidden. This means you can add KEDA ScaledObjects, cert-manager certificates, or OpenTelemetry collectors to your sidebar without cluttering the interface with unavailable resources.

**kubectl Command Preview.** Press `C` to see the equivalent kubectl command for any action you're about to take. This is a learning feature that doubles as a debugging tool. If you're trying to figure out how to do something in ku, the command preview shows you the kubectl equivalent. Over time, you build up muscle memory for both tools simultaneously.

**Theme Support and Session Memory.** ku matches your terminal's ANSI colors in light or dark mode, with Tokyo Night as a fallback theme (activate with `--theme tokyonight`). It also remembers your last context and namespace between sessions, so you don't have to re-navigate every time you open it.

### Use Cases

- **Daily cluster check-ins** — Start ku, glance at the cockpit overview, check for warnings or failing pods, and exit. Takes 10 seconds instead of running three kubectl commands.
- **Debugging production issues** — Navigate to the failing pod, view logs, describe the resource, and shell in to investigate, all without leaving the TUI. The read-only default means you won't accidentally delete something while investigating.
- **Application development workflow** — Use `ku --dev` to focus on your own services without seeing cluster infrastructure. Combined with `--edit`, you can scale deployments, restart rollbacks, and trigger CronJobs from the same interface.
- **Onboarding new team members** — The visible keybindings and kubectl command preview make ku a teaching tool. New developers can explore the cluster safely in read-only mode and learn kubectl commands through the preview feature.
- **CRD-heavy environments** — Teams using KEDA, cert-manager, ArgoCD, or other CRD-based tools can add their custom resources to the sidebar for quick access without remembering CRD names.

### Pros and Cons

Pros:
- Read-only by default is a safety feature that k9s doesn't offer. In shared cluster environments, this prevents accidental mutations from developers who are just browsing.
- Single binary with no dependencies. Install with `go install` or the curl installer, and you're running in seconds. No runtime dependencies, no container images, no package manager required.
- The BubbleTea foundation makes the TUI responsive and lightweight. Resource tables render quickly even in clusters with hundreds of pods.
- The `--dev` mode is genuinely useful for application developers who don't care about cluster infrastructure. It reduces cognitive load by hiding irrelevant resources.

Cons:
- Five days old with 329 stars means the project is very early. Expect breaking changes, missing features, and edge cases that haven't been tested. The documentation is minimal beyond the README.
- No plugin system yet. k9s has a mature plugin ecosystem for extending functionality. If you rely on k9s plugins, ku won't replace it today.
- Limited to kubectl-compatible operations. There's no built-in port-forwarding UI, no Helm integration, and no multi-cluster support. These are features that power users expect from a full k9s replacement.

### Getting Started

```bash
# Install with the one-liner
curl -fsSL https://raw.githubusercontent.com/bjarneo/ku/main/install.sh | sh

# Or install with Go
go install github.com/bjarneo/ku@latest

# Start ku (requires a reachable Kubernetes cluster)
ku

# Start in a specific namespace
ku -n my-namespace

# Start on a specific resource type
ku --resource deploy

# Start with developer view (hides cluster admin resources)
ku --dev

# Start in edit mode (mutations enabled)
ku --edit

# Initialize config for sidebar customization
ku config init
```

Press `?` for help, `Ctrl+K` for the command palette, and `Shift+E` to toggle edit mode.

### Alternatives

**k9s** — The established standard for Kubernetes TUI management. k9s has been around since 2019 and has a mature feature set including plugins, themes, pulse metrics, and XRay views. It's more configurable than ku and has a larger community. Choose k9s if you need plugin support, multi-cluster management, or a battle-tested tool that's been through years of production use. The learning curve is steeper, but the ceiling is higher.

**Lens** — A full desktop GUI for Kubernetes with a visual dashboard, resource graphs, and integrated terminal. Lens is the right choice for teams that prefer visual interfaces over terminal workflows, or for cluster administrators who need real-time resource monitoring with charts and graphs. It's heavier than ku but offers a more complete management experience.

**kubecolor + kubectl** — For developers who prefer raw kubectl but want colorized output, kubecolor wraps kubectl commands with syntax highlighting. This is the minimalist approach — no TUI, no navigation, just colored output on your existing workflow. Choose this if you want to stay as close to kubectl as possible while making the output more readable.

### Verdict

ku is five days old, has 329 stars, and is clearly resonating with Go developers and DevOps engineers who want a simpler alternative to k9s. The read-only-by-default safety model is the standout feature — it's the kind of design decision that shows the developer has actually worked in environments where someone accidentally scaled a production deployment to zero. The BubbleTea foundation makes it fast and responsive, and the lazygit-style layout means most developers can pick it up without reading documentation. It's too early to call this a k9s replacement — no plugins, no multi-cluster, minimal docs — but for developers who want a clean, safe Kubernetes TUI for daily cluster interactions, ku is worth tracking. The growth trajectory suggests the developer community agrees.
