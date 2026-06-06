---
name: termcn
description: "TermCN is a free open-source terminal UI component library for React with 274 components — shadcn/ui for the command line, with AI chat, streaming text, and data visualization built in."
url: https://github.com/shadcn-labs/termcn
stars: 511
forks: 20
language: TypeScript
tags: ["terminal", "react", "cli", "tui", "shadcn", "ink", "ai-components"]
featured: false
publishedAt: 2026-06-06
---

## TermCN

### Overview

TermCN is a terminal UI component library for React that ships 274 ready-to-use components. It hit 500 GitHub stars in about two months after its April 2026 launch, which is fast for a TUI library — most terminal tooling lives in relative obscurity. The reason for the traction is the pitch: it's shadcn/ui, but for your terminal.

The project comes from shadcn-labs, the same ecosystem that gave us the dominant web component library shadcn/ui. The primary maintainer, Aniket-508, has pushed 218 commits in two months. That velocity matters for a library this ambitious — 274 components is a lot of surface area to maintain, and the commit graph shows sustained daily work rather than a weekend burst.

The core problem TermCN solves is the gap between web and terminal UI quality. Web developers have shadcn/ui, Radix, and hundreds of polished component libraries. Terminal developers get Boxen and chalk. If you're building a CLI tool, a local dev server dashboard, or an AI agent interface that runs in the terminal, you're writing layout code from scratch every time. TermCN changes that equation entirely. You write React components with the same declarative patterns you use for web apps, and they render in the terminal with proper theming, keyboard navigation, and accessibility.

### Why it matters

The terminal is experiencing a renaissance. Claude Code, Cursor, Codex, Gemini CLI — the most important developer tools of 2025-2026 are terminal-first. These tools need rich interfaces: chat bubbles, streaming text, tool approval prompts, file diff views, progress indicators. Every team building an AI coding agent is reinventing the same TUI components, poorly.

TermCN standardizes that layer. It's built on Ink (Vadim Demedev's React renderer for terminals) and OpenTUI, and it follows the exact same installation pattern as shadcn/ui — copy components into your project via CLI, own the code, customize freely. There's no runtime dependency bloat. You install what you use. If you're a React developer who's ever run `npx shadcn@latest add button`, the TermCN workflow is immediately familiar.

The timing connects to a real shift: fullstack developers are building more CLI tools than ever. MCP servers, local-first dev tools, infrastructure CLIs, agent orchestration — these all need terminal interfaces, and most of them look terrible. TermCN gives you 274 components to fix that without learning a new paradigm.

### Key Features

**274 Production-Ready Components.** This is a staggering number for a two-month-old project. The library covers layout (box, grid, columns, center), navigation (command-palette, tabs, sidebar, menu, breadcrumb), data display (data-grid, json viewer, key-value pairs, markdown renderer), and feedback (alerts, dialogs, confirmations, progress indicators). Each component accepts theme tokens and adapts to the terminal's color scheme automatically.

**AI-Specific Components.** This is where TermCN stands out from generic TUI libraries. It ships chat-message, chat-thread, streaming-text, thinking-block, tool-approval, tool-call, and model-selector components — purpose-built for the AI agent UIs that dominate developer tooling right now. The streaming-text component handles token-by-token rendering with a blinking cursor. The tool-approval component shows risk-level badges and supports auto-deny timeouts. These aren't afterthoughts; they're clearly designed by someone who's built real agent interfaces.

**shadcn/ui Compatible Workflow.** TermCN uses the same registry format and CLI as shadcn/ui. Run `npx shadcn@latest add "https://termcn.dev/r/card"` and the component code lands in your project. No node_modules bloat. You own the code. The `components.json` configuration mirrors shadcn/ui's structure, so if you already use shadcn for your web app, adding terminal components to the same project is frictionless.

**Data Visualization in the Terminal.** Bar charts, line charts, sparklines, heat maps, gauges, and progress circles — all rendered with Unicode braille characters and box-drawing. The sparkline component is particularly clever: inline Unicode braille that fits on a single terminal row. For CLI tools that report metrics, build times, or test coverage, these components replace ad-hoc ASCII art hacks.

**Dual Renderer Support.** Every component ships in two variants: one built on Ink (the established React terminal renderer) and one on OpenTUI (a newer, more performant alternative). The `opentui-*` prefixed components use OpenTUI's rendering engine, which the project claims offers better performance for complex layouts. You pick your renderer at install time. This is a pragmatic architectural choice — Ink is battle-tested, OpenTUI is faster, and both get first-class support.

**Full Terminal TUI Toolkit.** Beyond individual widgets, TermCN provides app-shell (full-screen layout with header, tip bar, and scrollable content area), embedded-terminal (PTY integration via node-pty), file-picker, directory-tree, and git-status components. These are the building blocks for complete terminal applications, not just decorative elements. You can build a fully interactive TUI app — think lazygit-level polish — using only TermCN components.

**Theming System.** Built-in themes include Monokai, Matrix (green code rain), and several others. Components consume theme tokens through React context, so switching themes is a single provider change. The theming architecture mirrors shadcn/ui's CSS variable approach, adapted for terminal color codes.

### Use Cases

- **AI agent CLI tools** — Building a Claude Code or Cursor-style terminal interface? The chat-message, streaming-text, tool-approval, and thinking-block components handle 80% of the UI work out of the box.
- **Developer productivity CLIs** — Data grids for tabular output, diff views for code review workflows, git-status displays for custom Git tooling, and command palettes for keyboard-driven navigation.
- **Infrastructure and DevOps dashboards** — Real-time monitoring in the terminal with sparklines, heat maps, gauges, and multi-progress indicators for parallel pipeline visualization.
- **Local-first development tools** — Build interactive TUIs for database browsers, API testers, or deployment tools with forms, file pickers, and embedded terminal panels.
- **CLI onboarding flows** — The login-flow, help-screen, and banner components create polished first-run experiences without building them from scratch.

### Pros and Cons

Pros:
- 274 components in two months is remarkable velocity. The coverage is broad enough that you rarely need to build custom TUI components from scratch, which saves days of work on any non-trivial CLI project.
- The shadcn/ui-compatible installation model is proven and developer-friendly. No runtime dependency bloat, full code ownership, and the same workflow millions of React developers already know.
- Purpose-built AI components (streaming text, tool approval, thinking blocks) address the exact UI patterns that every AI tool builder needs. This alone makes TermCN worth evaluating if you're building any agent-facing CLI.

Cons:
- 511 stars and 20 forks suggest the community is still small. You're an early adopter, which means fewer Stack Overflow answers, fewer blog posts, and fewer battle-tested patterns from other users.
- Dual renderer support (Ink and OpenTUI) doubles the maintenance surface area. If the project loses momentum, one renderer may fall behind. Ink is the safer bet today, but OpenTUI components may lag on bug fixes.
- Terminal rendering has inherent limitations — no pixel-perfect layouts, no hover states (in most terminals), and font/emoji rendering varies wildly across terminal emulators. TermCN does its best, but your UI will look different in iTerm2 vs. Windows Terminal vs. Alacritty.

### Getting Started

```bash
# Add TermCN to an existing project (requires React + Ink)
npx shadcn@latest init
npx shadcn@latest add "https://termcn.dev/r/app-shell"

# Or add specific components
npx shadcn@latest add "https://termcn.dev/r/chat-message"
npx shadcn@latest add "https://termcn.dev/r/streaming-text"
npx shadcn@latest add "https://termcn.dev/r/command-palette"

# Create a minimal app
mkdir my-tui && cd my-tui
npm init -y
npm install react ink @types/react @types/ink
npx shadcn@latest add "https://termcn.dev/r/card"
npx shadcn@latest add "https://termcn.dev/r/bar-chart"
```

Use the components in your React terminal app:

```tsx
import { render, Box, Text } from "ink";
import { Card } from "./components/card";
import { BarChart } from "./components/bar-chart";

function App() {
  return (
    <Box flexDirection="column" padding={1}>
      <Card title="Build Metrics">
        <BarChart
          data={[
            { label: "Mon", value: 42 },
            { label: "Tue", value: 78 },
            { label: "Wed", value: 63 },
          ]}
        />
      </Card>
    </Box>
  );
}

render(<App />);
```

### Alternatives

**Ink** — The underlying React terminal renderer that TermCN builds on. Ink gives you the primitives (Box, Text, useInput) but no pre-built components. Choose Ink directly if you want full control over every pixel and don't need a component library. Choose TermCN if you want to ship a polished TUI in hours instead of days.

**Bubble Tea (Go)** — Charm's Go-based TUI framework with a component ecosystem (Bubbles). If you're building CLI tools in Go rather than TypeScript, Bubble Tea is the established choice. It's been around since 2020, has a large community, and Charm's lipgloss styling library is excellent. TermCN only makes sense if you're in the React/TypeScript ecosystem.

**Textual (Python)** — A Python TUI framework from the Rich library creators. Textual ships its own component library (buttons, inputs, data tables, trees) and has a CSS-like styling system. It's more mature than TermCN with a larger community. Choose Textual if your CLI tool is Python-based; choose TermCN if it's TypeScript/React.

### Verdict

TermCN is the most compelling TUI component library I've seen for the React ecosystem. The 274-component count is aggressive for a two-month-old project, and the AI-specific components (streaming text, tool approval, thinking blocks) show clear understanding of what developers are actually building in 2026. The shadcn/ui installation model is the right call — it's proven, developer-friendly, and avoids the dependency bloat that plagues most component libraries.

The risk is adoption maturity. At 511 stars, you're early. If the project loses momentum, you'll own 274 components that nobody else maintains. But the commit velocity (218 commits from one maintainer in two months) and the backing of the shadcn-labs ecosystem suggest this has legs. If you're building a CLI tool, an AI agent interface, or a local dev dashboard in TypeScript, TermCN should be on your shortlist. The alternative is writing terminal layout code by hand, and nobody has time for that anymore.
