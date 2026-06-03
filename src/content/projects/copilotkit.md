---
name: copilotkit
description: "CopilotKit is a React SDK for building agent-native apps with generative UI, shared state, and human-in-the-loop workflows. 31K+ stars, 1M monthly npm downloads."
url: https://github.com/CopilotKit/CopilotKit
stars: 31908
forks: 4119
language: TypeScript
tags: ["react", "ai-agents", "generative-ui", "ag-ui-protocol", "typescript"]
featured: false
publishedAt: 2026-06-03
---

## CopilotKit

### Overview

CopilotKit is the React SDK for building agent-native applications. It hit 31,000 GitHub stars and crossed 1 million monthly npm downloads in early 2026, making it the most widely adopted framework for embedding AI agents directly into frontend applications. If you've been building chat widgets on top of your React app and calling it an "AI feature," CopilotKit is what a real integration looks like.

The team behind it created the AG-UI Protocol (Agent-User Interaction Protocol), which has been adopted by Google, LangChain, AWS, Microsoft, Mastra, and PydanticAI. That's not a vanity list — it means there's now a standardized wire protocol for how agents communicate with user interfaces, and CopilotKit is the reference implementation for React. Before AG-UI, every team was reinventing the same SSE/WebSocket plumbing. Now there's a shared standard, and CopilotKit sits on top of it.

The core problem CopilotKit solves is this: connecting an LLM backend to a chat bubble is easy. Connecting an LLM backend to your actual application — where the agent can read and write state, render dynamic UI components, call backend tools that return visual results, and pause to ask the user for input — is genuinely hard. CopilotKit handles all of that with React hooks and components, so you spend your time building features instead of infrastructure.

### Why it matters

Every SaaS product is racing to add AI features right now. The companies winning that race aren't the ones with the best prompts — they're the ones that figured out how to make agents feel like a native part of their application. Think about how Linear's AI creates issues directly in your workspace, or how Notion's AI generates content inline with your documents. That's the bar.

CopilotKit gets you there without building the agent-UI plumbing from scratch. The AG-UI Protocol angle is what makes this more than another chat SDK. When LangGraph, CrewAI, and the major cloud providers all speak the same protocol, your frontend code becomes portable across agent backends. You're not locked into one AI provider or orchestration framework. That interoperability is going to matter a lot as the agent ecosystem matures over the next 12-18 months.

### Key Features

**useAgent Hook.** The centerpiece of the SDK. This React hook gives you direct programmatic control over an agent's state from any component. Call `agent.setState({ city: "NYC" })` from a button click, and the agent sees that update in real time. Read the agent's state in your JSX like any other React state. This shared-state model is what separates CopilotKit from slapping a chat window in a sidebar — the agent and your UI are genuinely synchronized.

**Generative UI.** Agents can dynamically render React components at runtime based on context and user intent. There are three approaches: Static AG-UI at the protocol level, Declarative A2UI for mapping agent outputs to your component library, and Open-Ended MCP Apps for maximum flexibility. An agent analyzing sales data can render a chart. An agent filling out a form can present the form itself. This is the feature that makes users forget they're talking to an AI.

**Human-in-the-Loop Workflows.** Agents can pause mid-execution to request user input, confirmation, or edits before continuing. This isn't an afterthought — it's built into the protocol. For any production agent that touches real data or takes real actions, you need humans in the loop. CopilotKit makes that pattern first-class rather than something you hack together with conditional logic.

**Backend Tool Rendering.** When your agent calls a backend tool — say, a database query or an API call — the result can be rendered as a UI component directly in the client. The agent calls `queryDatabase()` and the user sees a formatted table, not a JSON blob in a chat message. This closes the loop between "agent does something" and "user sees the result in context."

**Multi-Framework Agent Support.** Works with LangGraph, CrewAI, OpenAI, Anthropic, Mastra, PydanticAI, and any custom backend that implements the AG-UI protocol. You write your React code once and swap agent backends without touching the frontend. The `npx copilotkit@latest init` command integrates into existing Next.js, Vite, or Remix projects in under a minute.

**Copilot Sidebar and Chat UI.** A production-ready chat interface component with streaming support, tool call visualization, and agent response rendering. Fully customizable, or use the headless mode to build your own UI with the underlying hooks. The default sidebar looks good enough for most internal tools without any styling work.

### Use Cases

- **AI-powered SaaS products** — Building copilot features into existing products where the agent needs to read user context, interact with the app's data model, and take actions. Think CRM assistants, project management AI, or code review copilots.

- **Internal tools with AI assistance** — Admin dashboards and internal apps where employees interact with AI to query databases, generate reports, or automate workflows. The human-in-the-loop pattern is critical here.

- **Data exploration interfaces** — Dashboards where users converse with their data. The agent generates charts, filters datasets, and explains anomalies, all rendered as native UI components rather than text descriptions.

- **Multi-step agent workflows** — Complex tasks that require multiple back-and-forth exchanges between the user and agent. The shared state model keeps everything synchronized across steps without you managing state manually.

- **Agent marketplace or platform** — If you're building a platform where different agents can be plugged in, AG-UI compliance means any compatible agent works with your frontend out of the box.

### Pros and Cons

Pros:
- 1 million+ monthly npm downloads and 163 contributors mean the ecosystem is real, not aspirational. You won't be the only one debugging an issue at 2 AM.
- AG-UI Protocol adoption by Google, AWS, and LangChain means your frontend investment is portable across agent backends. This is the kind of standardization that makes technology sticky.
- The generative UI approach is genuinely different from chat-widget-in-a-sidebar. Agents can render full application UI, not just text responses.
- Weekly releases (v1.59.2 as of late May 2026) show active, consistent development. The team ships fast without being reckless.

Cons:
- React-only (with recent Angular support). If you're on Vue, Svelte, or vanilla JS, you're out of luck. The ecosystem is firmly React-first.
- The rapid release cadence means the API surface does shift. Code you write today might need updates in a few months. Pin your versions.
- The full power requires a backend that speaks AG-UI. If you're just calling OpenAI's API directly, you'll use maybe 30% of what CopilotKit offers. The real value shows up with LangGraph or CrewAI on the backend.
- Enterprise features (Copilot Cloud, advanced analytics) are behind a commercial tier. The open-source version is fully functional, but scaling to large teams may push you toward paid offerings.

### Getting Started

```bash
# New project — scaffold with your framework
npx copilotkit@latest create -f next

# Existing project — add CopilotKit to your app
npx copilotkit@latest init
```

This sets up the CopilotKit provider, configures your API route, and adds the chat sidebar component. To use the `useAgent` hook with a LangGraph backend:

```bash
# Create an AG-UI agent app
npx create-ag-ui-app my-agent-app
```

Then in your React component:

```tsx
import { useAgent } from "@copilotkit/react-core";

function MyComponent() {
  const { agent } = useAgent({ agentId: "my_agent" });

  return (
    <div>
      <h1>{agent.state.city}</h1>
      <button onClick={() => agent.setState({ city: "NYC" })}>
        Set City
      </button>
    </div>
  );
}
```

Install the Claude Code plugin for AI-assisted development within the CopilotKit codebase:

```bash
claude plugin marketplace add https://github.com/CopilotKit/CopilotKit
claude plugin install copilotkit
```

### Alternatives

**Vercel AI SDK** — The other major player in the React + AI space. Vercel's SDK is excellent for streaming text completions and simple chat interfaces, with first-class Next.js integration. It's simpler to get started with if you just need a chat UI backed by OpenAI or Anthropic. Choose it over CopilotKit when your AI feature is primarily conversational and doesn't need shared state, generative UI, or multi-agent orchestration.

**LangChain Chat Widgets** — LangChain provides its own React components for rendering agent conversations. They're tightly integrated with LangChain's ecosystem but lack CopilotKit's generative UI capabilities and the AG-UI protocol's interoperability. Choose them if you're already deep in LangChain and want the simplest possible integration, accepting the tighter vendor lock-in.

**Custom SSE/WebSocket Implementation** — Rolling your own agent-UI connection gives you complete control. Teams with specific performance requirements or unusual architectures sometimes go this route. The trade-off is significant engineering time — you'll rebuild streaming, state synchronization, tool call rendering, and error handling that CopilotKit provides out of the box. Only choose this if your requirements genuinely don't fit the AG-UI model.

### Verdict

CopilotKit has crossed the line from "interesting framework" to "industry standard." Over a million monthly npm downloads, adoption by the major cloud and AI orchestration platforms through AG-UI, and a team that ships weekly — this is the React AI SDK that won. If you're building agent features into a React application in mid-2026, starting with CopilotKit is the obvious choice. The generative UI model and shared-state architecture are fundamentally better than bolting a chat widget onto your app, and the AG-UI protocol means your frontend work survives whatever backend changes come next. The only teams that should look elsewhere are those not on React, or those whose AI feature is genuinely just a text completion box. For everything else, CopilotKit is the answer.
