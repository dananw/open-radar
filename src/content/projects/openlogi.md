---
name: openlogi
description: "OpenLogi is a Rust-native, local-first alternative to Logitech Options+ for remapping buttons, DPI, and SmartShift — no account, no telemetry, plain TOML config."
url: https://github.com/AprilNEA/OpenLogi
stars: 4737
forks: 91
language: Rust
tags: ["rust", "local-first", "desktop-app", "privacy", "hid++", "developer-tools"]
featured: false
publishedAt: 2026-06-13
---

## OpenLogi

### Overview

OpenLogi is a native desktop application that replaces Logitech Options+ for configuring Logitech mice. It hit 4,700 GitHub stars within three weeks of its late May 2026 launch, which tells you exactly how many developers despise the official software.

The project is created by AprilNEA, a developer who's been building Rust desktop tooling and clearly got tired of Logitech's mandatory account creation, telemetry collection, and Electron-based bloat. The frustration is shared — Logitech Options+ requires a login to change your DPI, phones home constantly, and eats 300MB+ of RAM for what should be a simple device configuration tool.

OpenLogi talks directly to Logitech HID++ mice over Bolt receivers, Bluetooth, or wired connections. It ships two binaries: a GPUI-based desktop GUI with an interactive mouse diagram, and a CLI for headless management. Button remapping, DPI presets, SmartShift wheel control, per-application profile overlays — all configured through a plain TOML file. No cloud, no account, no telemetry. The only network calls are device-image fetches and an opt-in, off-by-default update check.

### Why it matters

The local-first movement has been gaining momentum across the software industry, but most of the conversation focuses on web apps and databases. OpenLogi brings the same philosophy to hardware configuration software — a category that's been dominated by bloated, cloud-dependent vendor tools for decades.

Logitech Options+ is a perfect example of everything wrong with modern desktop software. It requires an account for basic device configuration. It collects telemetry. It runs as an Electron app consuming hundreds of megabytes of RAM. And it doesn't even support Linux. For the millions of developers using MX Master mice as their daily driver, this creates a real daily friction point.

OpenLogi flips the script. It's written in Rust with GPUI (the GPU-accelerated UI framework from the Zed editor team), so it's fast and lightweight. Configuration lives in a plain TOML file you can version control, diff, and sync across machines. It supports macOS, Linux, and has early Windows builds. And it does things Options+ can't — like moving the gesture button to any physical button, or running proper CLI diagnostics. This is what happens when a developer builds a tool for developers.

### Key Features

**Native Rust + GPUI Architecture.** OpenLogi is built with GPUI, the same GPU-accelerated UI framework powering the Zed editor. No Electron, no web runtime, no resident updater processes. The GUI renders at native speed with a fraction of the memory footprint. The interactive mouse diagram with clickable hotspots feels snappy because it is — there's no JavaScript runtime between you and the UI.

**HID++ Protocol Communication.** The app talks directly to Logitech devices using the HID++ protocol over Bolt receivers, Unifying receivers, Bluetooth-direct, and wired connections. DPI changes and SmartShift adjustments write straight to the device hardware. No intermediary services, no vendor daemons running in the background eating CPU cycles.

**41-Action Button Remapping Catalog.** Each button on your Logitech mouse can be assigned one of 41 built-in actions — media controls, app launching, mission control, custom keyboard shortcuts, DPI cycling, and more. Actions are authored in the TOML config file, so you can define complex multi-key shortcuts that would take five clicks in Options+ to configure (if they were even available).

**Per-Application Profile Overlays.** OpenLogi detects the focused application and automatically switches button profiles. Your MX Master behaves differently in Figma than in VS Code than in Chrome. Profiles are defined in TOML and activate on app focus — no manual switching required. macOS and Linux (X11) are fully supported, with Wayland support in progress.

**SmartShift Wheel Control.** The SmartShift panel gives you direct control over wheel mode (ratchet vs. free-spin), sensitivity thresholds, and permanent ratchet settings via HID++ feature 0x2111. Options+ buries these settings behind three menus. OpenLogi puts them one click away with real-time feedback.

**Plain TOML Configuration.** Every setting lives in a single TOML file. You can read it, diff it, commit it to your dotfiles repo, and copy it between machines. This is a deliberate design choice — configuration should be portable, version-controllable, and human-readable. No binary blobs, no hidden databases, no export/import wizards.

**Linux as a First-Class Citizen.** Options+ doesn't support Linux at all. OpenLogi ships .deb and .rpm packages with proper udev rules, systemd user units, and evdev/uinput hooks. It's not a port or an afterthought — Linux is a primary platform with full GUI and agent support.

### Use Cases

- **Developers with MX Master mice** who refuse to create a Logitech account just to change their DPI settings. Install OpenLogi, edit the TOML file, done.
- **Linux users** who've been stuck with Solaar or raw HID++ commands because Logitech won't ship Options+ for their platform. OpenLogi gives them a proper GUI with the same feature set.
- **Teams standardizing mouse configs** — version-control the TOML file in a shared dotfiles repo and distribute consistent button mappings across the engineering team.
- **Privacy-conscious professionals** who don't want their mouse configuration software phoning home. OpenLogi's only network calls are opt-in update checks and device-image fetches.
- **Power users** who want gesture buttons on non-standard physical buttons, per-app profile overlays, or CLI-driven device diagnostics that Options+ simply doesn't offer.

### Pros and Cons

Pros:
- Solves a real, daily pain point for millions of Logitech mouse users. The 4,700 stars in three weeks reflect genuine demand, not hype.
- Rust + GPUI means it's fast, lightweight, and doesn't bring Electron's memory overhead. The GUI feels native because it is native.
- Plain TOML config is the right design choice for a developer tool. Version-controllable, diffable, portable.
- Linux support with proper packaging (udev rules, systemd units, .deb/.rpm) shows serious engineering, not a quick port.

Cons:
- Windows support is described as "early, untested preview." If you're on Windows, you're in uncharted territory.
- Only supports Logitech HID++ devices. If you use a Razer, SteelSeries, or other brand mouse, this isn't for you.
- Per-application profile switching on Linux is limited to X11 — Wayland users will need to wait for that to land.
- The project is three weeks old. Expect API changes, config format evolution, and occasional breakage as features stabilize.

### Getting Started

```bash
# macOS — install via Homebrew (recommended)
brew install --cask openlogi

# Or download the .dmg from the latest release
# https://github.com/AprilNEA/OpenLogi/releases/latest

# Linux — Debian/Ubuntu
sudo dpkg -i openlogi_*.deb
systemctl --user enable --now openlogi-agent.service

# Linux — Fedora/RHEL
sudo rpm -i openlogi-*.rpm
systemctl --user enable --now openlogi-agent.service

# CLI usage — list connected devices
openlogi list

# Edit configuration
# Config file location: ~/.config/openlogi/config.toml
```

Quit Logitech Options+ first — both applications fight over HID++ access and only one can own a given receiver at a time.

### Alternatives

**Logitech Options+** — The official Logitech software. Supports more device types (keyboards, webcams) and has a polished UI, but requires an account, collects telemetry, runs as an Electron app, and doesn't support Linux. Choose it if you need keyboard configuration or broader device support and don't mind the overhead.

**Solaar** — The long-standing open-source Linux alternative for Logitech device management. Written in Python with a GTK UI. Solaar handles pairing and basic configuration but lacks OpenLogi's button remapping depth, SmartShift controls, and per-app profiles. Choose it if you need a mature, battle-tested Linux tool and don't need advanced remapping.

**Mouser** — A macOS-only Logitech mouse configuration tool. Simpler than OpenLogi with a focus on basic button remapping. Choose it if you're on macOS and want a lightweight option without the full feature set.

### Verdict

OpenLogi is the kind of project that makes you wonder why it didn't exist sooner. Every developer with an MX Master mouse has felt the frustration of Options+ — the mandatory login, the telemetry, the Electron bloat, the missing Linux support. OpenLogi solves all of that with a Rust-native app that talks directly to the hardware.

The 4,700 stars in three weeks aren't vanity metrics. They represent developers who've been waiting for exactly this tool. The TOML config approach, the CLI diagnostics, the per-app profiles — these are features built by someone who actually uses a Logitech mouse for development work, not by a product team optimizing for engagement metrics. If you're on macOS or Linux and use a Logitech mouse, install it today. Windows users should wait for the platform to stabilize, but keep it on your radar.
