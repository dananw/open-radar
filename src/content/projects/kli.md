---
name: kli
description: "kli is a fast, keyboard-driven Kubernetes TUI built in Go with Bubble Tea — browse any resource, edit objects, follow logs, and shell into pods without leaving the terminal."
url: https://github.com/bjarneo/kli
stars: 276
forks: 8
language: Go
tags: ["kubernetes", "cli", "tui", "golang", "devops", "terminal"]
featured: false
publishedAt: 2026-06-16
---

## kli

### Overview

kli is a keyboard-driven terminal UI for Kubernetes that launched on June 13, 2026, and picked up 276 stars in its first three days. It's built in Go on top of Charmbracelet's Bubble Tea framework — the same ecosystem that produced Glow, Soft Serve, and the increasingly popular Lip Gloss styling library. The project is created by bjarneo (Bjarne Olav Schei), a developer who goes by @iamdothash on X.

The tool positions itself as a faster, more focused alternative to k9s. Where k9s has accumulated years of configuration options and plugin systems, kli strips the experience down to what most developers actually need: browse resources, read configs, tail logs, shell into pods, edit objects, and scale workloads. It ships with five releases in its first 48 hours, which tells you something about the pace of development. The README describes it as "inspired by k9s, Lens, and lazygit" — and the lazygit influence shows in the layout and keybinding philosophy.

The core problem kli solves is context-switching fatigue. If you're a backend or platform developer working with Kubernetes regularly, you know the drill: `kubectl get pods`, `kubectl describe`, `kubectl logs -f`, `kubectl exec -it`, `kubectl edit` — over and over, across namespaces and contexts. kli collapses all of that into a single terminal pane with vim-style navigation and a cockpit overview that shows cluster health at a glance.

### Why it matters

The Kubernetes tooling landscape hasn't changed much since k9s launched in 2019. k9s is excellent — 27K+ stars, active maintenance, wide adoption — but it's also accumulated complexity. New developers face a steep learning curve with its plugin system, skins, and configuration layers. Lens went the other direction with a desktop GUI, then pivoted to a SaaS model that alienated parts of its community. There's a gap for a tool that's simpler than k9s but still terminal-native.

kli fills that gap with a clean implementation. It uses the Kubernetes API's `Table` representation — the same one `kubectl get` uses internally — so columns match what developers expect for every resource type, including CRDs. The cockpit overview pulls live metrics from the metrics API, showing CPU and memory gauges alongside pod phase counts and recent warning events. It's the kind of tool that makes you wonder why someone didn't build it sooner.

The Bubble Tea foundation matters too. Charmbracelet's TUI ecosystem has matured significantly — Bubble Tea for the runtime, Lip Gloss for styling, Bubbles for common components. Building on this stack means kli gets accessible colors, responsive layouts, and a composable architecture for free. The developer doesn't need to reinvent terminal rendering; they can focus on the Kubernetes-specific logic.

### Key Features

**Cockpit Overview.** kli opens on a single-screen cluster dashboard showing server version, node readiness with pressure conditions (DiskPressure, MemoryPressure, NotReady), live CPU and memory gauges from the metrics API, pod counts by phase with not-ready and crashlooping breakdowns, deployment readiness, and deduplicated warning events with recurrence counts. It refreshes every few seconds. This is the view you want when you SSH into a cluster and need to know what's broken right now.

**Server-Rendered Resource Tables.** Every resource type — pods, deployments, services, ConfigMaps, CRDs — gets a table with the same columns as `kubectl get`. kli asks the API server for its `Table` representation directly, so the output matches what kubectl shows. The resource catalog and alias map (short names like `po`, `deploy`, `svc`) are built at startup via API discovery. If an aggregated API is down, kli warns about partial discovery instead of silently hiding resource kinds.

**Context-Aware Actions.** The bottom bar adapts to what you're looking at. Pods show logs and shell options. Nodes show a node shell option. Workloads (deployments, statefulsets, daemonsets) show scale and restart. CronJobs show trigger. This context-sensitivity means the relevant actions are always visible without memorizing keybindings — though the full keybinding reference is one `?` press away.

**vim-Style Navigation with Command Palette.** Navigation follows vim conventions: `j`/`k` for up/down, `g`/`G` for top/bottom, `Ctrl+u`/`Ctrl+d` for half-page scrolling, `Tab` to switch panes, `/` to filter. The `:` key jumps to any resource type by name or alias, and `Ctrl+K` opens a fuzzy command palette that can run any action and jump to any resource. This is the lazygit influence — the keybindings feel natural if you've used any modern TUI tool.

**Edit-in-Editor with Safe Apply.** Press `e` on any resource to open it in your `$EDITOR` (nvim, vim, nano, or vi) inside a TUI overlay. Save and quit, then confirm the apply. If you make no changes, nothing is sent to the cluster. kli rejects edits that change the object's kind or name, preventing accidental resource mutation. `Ctrl+\` cancels without applying. It's the same workflow as `kubectl edit` but without leaving the TUI.

**Customizable Sidebar with CRD Support.** The sidebar lists common built-in resources by default. CRDs are hidden until you explicitly add them via `~/.config/kli/config.yaml`. Run `kli config init` to seed the config, then add entries under any section. The `resource` field accepts plural, singular, kind, short name, or group-qualified keys (`scaledobjects.keda.sh`) to avoid ambiguity. Resources your cluster doesn't expose are automatically dropped, and empty sections are hidden.

**Node Shell via Debug Pods.** Press `s` on a node to get a privileged debug pod pinned to that node with the host filesystem mounted at `/host`, then drops you into a `chroot /host` shell — the same mechanism as `kubectl debug node`. The debug pod is deleted when you exit or detach. Override the image with `$KLI_DEBUG_IMAGE` (defaults to `busybox`). This is incredibly useful for debugging node-level issues without SSH access.

### Use Cases

- **Daily Kubernetes operations** — Developers who spend significant time managing deployments, debugging pod failures, and checking service health. kli replaces the constant `kubectl get` / `kubectl describe` / `kubectl logs` cycle with a single persistent TUI.

- **Platform engineering and SRE work** — Engineers managing multiple clusters and namespaces who need quick context-switching. The `c` key switches kubeconfig context, `n` switches namespace, and both are remembered between sessions via `~/.config/kli/state.json`.

- **Incident response** — When something breaks, kli's cockpit overview shows cluster health at a glance: which nodes are under pressure, which pods are crashlooping, and what recent warning events have fired. No need to run five separate kubectl commands to assess the situation.

- **CRD-heavy clusters** — Teams running operators like KEDA, cert-manager, or OpenTelemetry can add their custom resources to the sidebar and browse them with the same TUI experience as built-in resources.

- **Remote cluster management** — For developers who SSH into bastion hosts or jump boxes, kli runs entirely in the terminal with no GUI dependency. It's a better experience than tmux with multiple kubectl windows.

### Pros and Cons

Pros:
- The cockpit overview is genuinely useful — getting cluster health, metrics, and recent events in a single view saves minutes of kubectl commands during incident response.
- Five releases in 48 hours shows extremely active development, with features like regex log filtering, log line wrapping, and CRD sidebar documentation landing in rapid succession.
- Zero configuration required for basic use — install the binary, point it at a cluster, and it works. The optional config file only matters when you want CRDs in the sidebar.
- The `C` key showing the equivalent `kubectl` command is a clever onboarding feature — new team members can learn kubectl syntax while using the TUI.

Cons:
- 276 stars and 3 days old means the project is very early. API surface and keybindings may change. There are no published stability guarantees yet.
- Single maintainer (60 commits from bjarneo, 1 from a contributor). Long-term maintenance depends on one person's continued interest and availability.
- No plugin system or extension mechanism. k9s has a plugin ecosystem for custom resource views and actions; kli currently has none. If you need custom workflows, you're out of luck.
- Requires the Kubernetes metrics API for CPU/memory displays. Clusters without metrics-server installed get a degraded cockpit view — the gauges are simply omitted, which isn't communicated clearly in the UI.

### Getting Started

```bash
# Install via the installer script
curl -fsSL https://raw.githubusercontent.com/bjarneo/kli/main/install.sh | sh

# Or install with Go (requires Go 1.26.3+)
go install github.com/bjarneo/kli@latest

# Or build from source
git clone https://github.com/bjarneo/kli.git
cd kli
make install

# Basic usage — current context, remembered namespace
kli

# Start in a specific namespace
kli -n kube-system

# Start on a specific resource type
kli --resource deploy

# Use a theme
kli --theme tokyonight

# Initialize config for CRD sidebar customization
kli config init

# Upgrade to latest release
kli upgrade
```

Press `?` for the full keybinding reference. Press `Ctrl+K` to open the command palette. Press `:` to jump to any resource type.

### Alternatives

**k9s** — The established Kubernetes TUI with 27K+ stars and a mature plugin ecosystem. k9s is more feature-complete with custom resource views, plugin hooks, skins, and pulse monitoring. Choose k9s if you need plugin extensibility, custom resource columns, or have invested time in its configuration system. kli is the better pick if you want something simpler that works out of the box with less configuration overhead.

**Lens** — A desktop GUI for Kubernetes that provides a visual dashboard, Helm chart management, and built-in Prometheus metrics. Lens was the go-to for developers who preferred graphical interfaces, but its pivot to a SaaS model (Lens Desktop with paid features) has pushed many users toward alternatives. Choose Lens if you want a full GUI experience and don't mind the commercial model. kli is better for developers who prefer terminal-native workflows.

**kubecolor / kubectl aliases** — For developers who just want better kubectl output, tools like kubecolor add color to kubectl commands, and shell aliases reduce typing. These are lighter-weight solutions that don't require learning a new TUI. Choose this approach if your Kubernetes interactions are brief and infrequent. kli makes sense when you're spending 30+ minutes a day navigating clusters.

### Verdict

kli is three days old and already more polished than most Kubernetes tools at three months. The cockpit overview alone justifies the install — getting node pressure conditions, live metrics, and deduplicated warning events in a single screen is the kind of thing that saves real time during incidents. The Bubble Tea foundation gives it a modern feel that k9s lacks, and the lazygit-inspired navigation makes it intuitive for anyone who's used a TUI tool in the last few years.

The risk is obvious: it's a single-maintainer project with 276 stars and no stability guarantees. Don't bet your production workflow on it today. But if you're a backend or platform developer who lives in the terminal and wants a Kubernetes TUI that doesn't require a weekend of configuration, install kli and try it for a week. The five releases in 48 hours suggest the maintainer is shipping fast and listening to feedback. This is the kind of project that either fizzles out or becomes the next k9s — and the early momentum leans toward the latter.
