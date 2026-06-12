---
name: novu
description: "Novu is the open-source notification infrastructure unifying email, SMS, push, chat, and in-app channels through a single API for developers and AI agents."
url: https://github.com/novuhq/novu
stars: 39102
forks: 4319
language: TypeScript
tags: ["notifications", "typescript", "developer-tools", "infrastructure", "react"]
featured: false
publishedAt: 2026-06-13
---

## Novu

### Overview

Novu is an open-source notification infrastructure that gives developers a single API to send messages across email, SMS, push notifications, chat platforms, and in-app channels. With over 39,000 GitHub stars and 4,300 forks, it's one of the most widely adopted developer tools in the notification space — and it's been gaining fresh momentum since rebranding itself as communication infrastructure for both products and AI agents.

The project was founded by Nevo David and Dima Grossman in 2021. Before Novu, building multi-channel notifications meant cobbling together separate SDKs for SendGrid, Twilio, Firebase Cloud Messaging, and Slack, then maintaining the integration logic yourself. Every time you wanted to add a channel or switch providers, you'd rewrite chunks of code. Novu's founding team experienced this pain firsthand at previous startups and decided to abstract the entire notification stack behind a unified interface.

The core problem Novu solves is deceptively simple but widespread: every product needs notifications, and every team rebuilds the same infrastructure from scratch. According to Novu's own data, teams spend an average of 3-4 weeks building notification systems that still lack proper delivery tracking, user preference management, and multi-channel orchestration. Novu collapses that timeline to hours while adding features most teams never get around to building — like digest batching, channel fallback logic, and a real-time notification inbox component.

### Why it matters

Notifications are the connective tissue between your application and your users, yet the developer experience around them has barely evolved in a decade. You either use a managed service like OneSignal or Courier (which lock you into their pricing and infrastructure) or build it yourself (which means months of work and ongoing maintenance). Novu occupies a rare middle ground: it's open-source, self-hostable, and provider-agnostic, but it also offers a managed cloud for teams that don't want to operate infrastructure.

The timing is significant. AI agents are increasingly performing actions that require user notification — a completed task, a generated report, an approval request. Novu's recent pivot toward "communication infrastructure for agents and products" reflects this reality. The workflow-as-code model lets you define notification logic that responds to events from your application or your AI agents, with branching conditions, delays, and multi-step orchestration built in.

For fullstack developers working with React, NestJS, Django, or Go, Novu provides SDKs and embeddable components that integrate cleanly into existing stacks. The React notification center component alone saves weeks of frontend work. And because Novu is provider-agnostic, switching from SendGrid to Resend or from Twilio to Vonage is a configuration change, not a code rewrite.

### Key Features

**Workflow-as-Code Engine.** Novu lets you define notification workflows in TypeScript using a declarative API. You chain steps together — in-app notification, wait period, digest window, email — with conditional logic at each node. The workflow engine handles state management, retries, and durability. This is fundamentally different from the "fire and forget" approach of most notification libraries. Your notification logic becomes version-controlled, testable, and reviewable like any other code.

**Unified Provider Abstraction.** Novu supports 30+ providers across five channels: email (SendGrid, Resend, SES, Postmark, Mailgun, and more), SMS (Twilio, Plivo, Vonage, Telnyx), push (FCM, APNS, Expo, OneSignal), chat (Slack, Discord, MS Teams), and in-app. You configure providers through the dashboard or API, and Novu handles the provider-specific formatting, delivery tracking, and error handling. Switching providers is a one-line config change.

**Embeddable Notification Center.** Drop a fully functional, real-time notification inbox into your React, Vue, or Angular app with a single component import. The notification center supports read/unread states, action buttons, archiving, and real-time updates via WebSocket. For teams building SaaS products, this eliminates months of frontend notification UI work. The component is customizable through theming and custom render functions.

**Content Management System.** Novu includes a visual template editor for notification content. Non-technical team members can edit email subjects, SMS bodies, and push notification text without touching code. Templates support dynamic variables, conditional blocks, and multi-language content. This separates content from logic — developers define workflows, designers and marketers manage the message content.

**Digest and Delay Batching.** Instead of sending a notification for every event, Novu can accumulate events over a time window and send a single digest notification. Configure a 30-minute batching window for comment notifications, and users get one "You have 5 new comments" message instead of five separate pings. This feature alone dramatically improves user experience and reduces notification fatigue.

**GitOps Deployment Flow.** Novu workflows are defined in code and deployed through your CI/CD pipeline. There's no separate "notification configuration" to keep in sync with your codebase. The Novu CLI validates workflow definitions against schemas (Zod, JSON Schema, or class validators) before deployment. This is the DevOps-native approach that large engineering teams need.

**Agent Communication Support.** The recent rebranding to "communication infrastructure for agents and products" isn't just marketing. Novu's architecture supports event-driven notification patterns that work naturally with AI agent workflows. An agent that completes a research task, generates a report, or needs human approval can trigger Novu workflows programmatically, routing notifications through the appropriate channel based on urgency and user preferences.

### Use Cases

- **SaaS product notifications** — User-facing apps that need real-time in-app notification feeds, email digests, and push alerts for events like comments, mentions, and status changes. The embeddable notification center component handles the frontend.
- **AI agent task notifications** — When your AI agents complete long-running tasks, generate outputs, or need human review, Novu routes the notification through the right channel based on urgency. Slack for urgent, email for informational.
- **Multi-tenant platform communication** — Platforms where different tenants need different notification providers (one customer uses SendGrid, another uses SES). Novu's provider abstraction handles this at the infrastructure level.
- **Transactional email and SMS pipelines** — Order confirmations, password resets, two-factor codes, and appointment reminders. Novu's template system and provider fallback logic ensure reliable delivery.
- **Developer platform notification APIs** — Products that offer notification features to their own users (like a project management tool notifying team members) can use Novu as the underlying infrastructure.

### Pros and Cons

Pros:
- Provider-agnostic design means no vendor lock-in. You can start with the managed cloud and migrate to self-hosted, or switch email providers without changing application code.
- The workflow-as-code model is genuinely better than configuration-file approaches. Your notification logic lives in version control, gets reviewed in PRs, and deploys through CI/CD.
- The embeddable notification center component is production-ready and saves weeks of frontend development. It handles real-time updates, read states, and custom actions out of the box.
- 39,000+ GitHub stars and an active Discord community mean the project has real momentum and community support. Issues get triaged, and the roadmap is publicly visible.

Cons:
- The self-hosted deployment requires MongoDB, Redis, and a queue system (BullMQ), which adds operational complexity compared to simpler notification libraries. Running it in production is not trivial.
- The cloud free tier limits you to 30,000 events per month, which can be consumed quickly during development and testing. The paid tiers start at $250/month for the Growth plan, which may be steep for small projects.
- Provider-specific features (like SendGrid's dynamic templates or Twilio's WhatsApp Business API) are abstracted away. If you need deep provider integration, the unified API becomes a constraint rather than a convenience.
- The project has gone through significant architectural changes in its lifetime (from a monolith to a more modular structure), and some documentation and community resources reference outdated patterns.

### Getting Started

```bash
# Install the Novu CLI
npx novu-labs@latest init

# Create a workflow in your project
npm install @novu/node

# Set up your environment
export NOVU_API_KEY=your-api-key

# Run the local development tunnel
npx novu-labs@latest echo
```

Define a notification workflow in TypeScript:

```typescript
import { client } from '@novu/node';

client.workflow('new-comment', async ({ step, subscriber }) => {
  await step.inApp('notify', async () => {
    return {
      body: `${subscriber.firstName}, you have a new comment on your post.`
    };
  });

  const { events } = await step.digest('30 min');

  await step.email('digest-email', async () => {
    return {
      subject: `You have ${events.length} new comments`,
      body: renderDigestEmail(events)
    };
  });
});
```

Deploy workflows through your CI/CD pipeline:

```bash
npx novu-labs@latest sync
```

Add the notification center to your React app:

```bash
npm install @novu/notification-center
```

```tsx
import { NovuProvider, NotificationCenter } from '@novu/notification-center';

function App() {
  return (
    <NovuProvider subscriberId="user-123" applicationIdentifier="your-app-id">
      <NotificationCenter />
    </NovuProvider>
  );
}
```

### Alternatives

**Courier** — A managed notification API that's more opinionated and easier to set up initially. Courier's visual template designer is more polished than Novu's, and it supports 50+ providers out of the box. The tradeoff is vendor lock-in and pricing that scales with message volume. Choose Courier if you want a fully managed solution and don't need self-hosting.

**OneSignal** — Focused primarily on push notifications with a generous free tier. OneSignal is simpler for mobile push use cases but doesn't offer the multi-channel workflow orchestration or the code-as-configuration model that Novu provides. Choose OneSignal if push notifications are your primary channel and you don't need email or SMS.

**Knock** — Another notification infrastructure platform with a similar workflow model. Knock's API design is clean and its dashboard is well-built, but it's a closed-source managed service. Knock offers a free tier with up to 10,000 events per month. Choose Knock if you prefer a managed service with good developer experience and don't need self-hosting.

### Verdict

Novu is the most complete open-source notification infrastructure available today. The 39,000-star count isn't vanity — it reflects genuine adoption by teams that needed to stop rebuilding notification systems from scratch. The workflow-as-code model is the right abstraction for notification logic, and the embeddable notification center component is a practical shortcut that saves real engineering time.

The self-hosted deployment is heavier than I'd like (MongoDB, Redis, queue workers), and the cloud pricing may give small teams pause. But for mid-size and larger engineering organizations, Novu solves a problem that every product team faces and most handle poorly. If you're building a SaaS product, integrating AI agent notifications, or just tired of maintaining your own notification plumbing, Novu deserves a serious look. The recent pivot toward agent communication infrastructure positions it well for where software is heading.
