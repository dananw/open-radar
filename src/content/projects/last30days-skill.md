---
name: last30days-skill
description: "AI agent skill that researches any topic across Reddit, X, YouTube, HN, Polymarket, and 10+ platforms — then synthesizes a grounded brief scored by real engagement."
url: https://github.com/mvanhorn/last30days-skill
stars: 43375
forks: 1850
language: Python
tags: ["ai-agents", "research", "developer-tools", "claude-code", "open-source"]
featured: false
publishedAt: 2026-06-17
---

## /last30days

### Overview

/last30days is an AI agent skill that searches across Reddit, X, YouTube, Hacker News, Polymarket, TikTok, Instagram, and a dozen other platforms in parallel, then synthesizes everything into a single grounded brief. It hit 43,000 GitHub stars in under five months, with nearly 10,000 of those coming in the past week alone. That kind of velocity tells you something: people were starving for this.

The project is built by Matt Vanhorn, a developer who originally created it to keep up with the pace of AI news. The training data for every LLM is months behind what Reddit and X communities have already figured out. So he built a tool that searches people instead of editors — upvotes, likes, engagement metrics, and Polymarket odds backed by real money become the ranking signal, not SEO games. What started as a personal research tool for AI news turned into something much bigger: sales prep, meeting intelligence, competitive analysis, trip planning, and deep dives on any topic where "what people are actually talking about" matters more than "what Google's algorithm surfaced."

The core insight is that no single AI has access to all these platforms. Google search doesn't touch Reddit comments or X posts. ChatGPT has a deal with Reddit but can't search X or TikTok. Gemini has YouTube but not Reddit. Claude has none of them natively. Each platform is a walled garden with its own API, its own tokens, its own auth. /last30days lets you bring your own keys and browser sessions, and suddenly an AI agent can search all of them at once, score them against each other, and tell you what actually matters.

### Why it matters

The way developers research tools, frameworks, and technologies is broken. You Google "NestJS vs Express" and get a blog post from 2024 that was written for SEO. You search Reddit and find a thread from last week with 847 upvotes where actual developers are debating the tradeoffs in real time. The Reddit thread is more useful, but it's buried under layers of platform friction — you have to know which subreddit to search, which comments are signal vs. noise, and how to cross-reference what one person said on X against what the community settled on in a Hacker News thread.

/last30days collapses that workflow. Type `/last30days NestJS vs Express` and the agent resolves the right subreddits (r/node, r/nestjs), the right X handles (the NestJS creator, key contributors), the right YouTube channels (tech reviewers who covered both), and searches all of them in parallel. It scores results by engagement — a Reddit comment with 400 upvotes outweighs a blog post nobody read. It merges cross-platform clusters (the same story on Reddit, X, and YouTube becomes one item, not three). And it synthesizes everything into a brief with citations.

For fullstack developers, this is a research multiplier. Before adopting a new ORM, you can see what the community actually thinks. Before migrating from Django to FastAPI, you can read the real pain points people hit. Before choosing between Prisma and Drizzle, you can see which one is gaining momentum and why. The data is fresh — last 30 days, not last 30 months.

### Key Features

**Multi-platform parallel search.** The engine searches Reddit (with comments and upvote counts), X/Twitter, YouTube (full transcripts), TikTok, Instagram Reels, Threads, Bluesky, Hacker News, Polymarket, GitHub, Pinterest, Digg, and web search — all in parallel. Each platform uses its own authentication (API keys, browser sessions, or public endpoints), and the engine handles the orchestration. Reddit, HN, Polymarket, and GitHub work immediately with zero configuration.

**Engagement-based scoring.** Instead of relying on search engine algorithms, results are ranked by what real people actually engaged with. A Reddit thread with 1,500 upvotes scores higher than a blog post nobody read. A TikTok with 3.6M views carries more cultural weight than a press release. Polymarket odds backed by real money volume are harder to argue with than a pundit's guess. This is social relevancy, not SEO relevancy.

**Intelligent entity resolution.** The v3 engine doesn't just search for keywords — it resolves who and what matters before searching. Type "OpenClaw" and it resolves @steipete (the creator), r/openclaw, r/ClaudeCode, the right YouTube channels and TikTok hashtags. "Peter Steinberger" resolves to @steipete on X, steipete on GitHub, and the relevant subreddits. Bidirectional: person to company, product to founder, name to GitHub profile. This pre-research step is why v3 finds content that keyword-based search never could.

**Cross-source cluster merging.** When the same story appears on Reddit, X, and YouTube, the engine merges them into one cluster instead of showing three separate items. Entity-based overlap detection catches matches even when the titles use different words. The result is a deduplicated narrative, not a firehose of redundant links.

**Shareable HTML briefs.** Ask for an HTML brief (`--emit=html`) and the skill saves a self-contained, dark-mode, print-friendly file with inline CSS, system-font fallbacks behind Inter and JetBrains Mono, and zero JavaScript. Drop it into Slack, email, or Notion. The chat response includes the file path so you can open or share it immediately.

**Single-pass comparisons.** Running "X vs Y" used to require three serial passes taking 12+ minutes. v3 runs one pass with entity-aware subqueries for both sides simultaneously. Same depth, 3 minutes. The `--competitors` flag auto-discovers the top 2 peers via web search and runs a 3-way comparison automatically.

**Best Takes and ELI5 mode.** Every brief ends with a "Best Takes" section — the cleverest one-liners, most viral quotes, and reactions that make you want to share the research. A second judge scores results for humor, wit, and virality alongside relevance. Say "eli5 on" after any run and the synthesis rewrites in plain language with no jargon, same data, same citations.

### Use Cases

- **Pre-meeting intelligence** — Before meeting a CEO, investor, or potential hire, run `/last30days [name]` to see their recent tweets, podcast transcripts, GitHub activity, and what the community is saying about them. One developer described it as "replacing 90 minutes of manual tab-by-tab research."
- **Technology evaluation** — Before adopting a new framework or tool, search for real community sentiment. `/last30days Drizzle ORM` shows what developers are actually hitting in production, not what the marketing page claims.
- **Competitive analysis** — `/last30days YourProduct --competitors` auto-discovers peers and runs a side-by-side comparison with live star counts, feature requests, and community sentiment from across platforms.
- **Content research** — Writers and creators use it to understand what's trending in their niche before writing. The engagement scoring ensures you're covering what people actually care about, not what an algorithm thinks they should.
- **Hiring signals** — `/last30days CompanyName --hiring-signals` surfaces current job postings and career pages as cited evidence for where a company is investing, what teams are growing, and what skills they're hiring for.
- **Event and trip planning** — `/last30days Universal Epic Universe` shows wait times, community complaints, what's under construction, and what insiders are saying — data that's scattered across Reddit, YouTube, and TikTok but nowhere on Google.

### Pros and Cons

Pros:
- Covers 14+ platforms that no single search engine or AI touches together. Reddit comments, X threads, YouTube transcripts, TikTok captions, and Polymarket odds in one query — this simply doesn't exist anywhere else.
- Zero-config baseline. Reddit (with comments), HN, Polymarket, and GitHub work immediately with no API keys. The setup wizard unlocks more sources in 30 seconds.
- MIT licensed, 1,012 tests passing, no tracking or analytics. Your research stays on your machine. The project is actively maintained with frequent releases.
- Works across 50+ AI agent hosts including Claude Code, Codex, Cursor, Copilot, Gemini CLI, OpenClaw, and more via the Agent Skills standard.

Cons:
- Full platform coverage requires multiple API keys and subscriptions. X search needs a browser session, TikTok/Instagram/Threads need a ScrapeCreators key (100 free credits, then pay-as-you-go), and Perplexity Sonar needs an OpenRouter key. Free tier is functional but limited.
- Python 3.12+ dependency with Node.js for the X search client. Not a single-binary install — you need both runtimes available. The yt-dlp dependency for YouTube transcripts adds another moving part.
- Research quality depends on the reasoning model's ability to synthesize. The engine does the searching and scoring, but the AI agent does the final synthesis. Weak models produce weaker briefs.
- ScrapeCreators is a third-party dependency for TikTok, Instagram, Threads, and Pinterest. If that service goes down or changes pricing, those sources break.

### Getting Started

```bash
# Claude Code (recommended — auto-updates via marketplace)
/plugin marketplace add mvanhorn/last30days-skill
/plugin install last30days

# Codex, Cursor, Copilot, Gemini CLI, or any of 50+ Agent Skills hosts
npx skills add mvanhorn/last30days-skill -g

# OpenClaw
clawhub install last30days-official

# Manual install
git clone https://github.com/mvanhorn/last30days-skill.git
ln -s "$(pwd)/last30days-skill/skills/last30days" ~/.claude/skills/last30days

# Run it
/last30days NestJS vs Express
/last30days Peter Steinberger
/last30days YourProduct --competitors
/last30days OpenClaw --emit=html
```

### Alternatives

**Tavily / Perplexity API** — These are API-based search services that return grounded web results with citations. They're useful for programmatic search but cover only web sources — no Reddit comments, no X threads, no YouTube transcripts, no TikTok. Choose them when you need a clean API for your own application, not when you need the full social media research picture.

**Manual research (Reddit + X + YouTube tabs)** — This is what most developers do today. Open Reddit, search the right subreddit, scroll past memes to find the useful thread. Open X, find the right accounts, read their recent posts. Open YouTube, find a video, scrub through 45 minutes for the 5 relevant sentences. /last30days automates all of this and adds engagement scoring, cross-source deduplication, and synthesis. The manual approach still works, but it takes 90 minutes instead of 3.

**Exa.ai / Andi Search** — Semantic search engines that try to understand query intent and return relevant results. They're better than Google for developer queries but still limited to web content. They don't search Reddit comments, X threads, or social media engagement signals. Choose them for quick web lookups, not for deep social media research.

### Verdict

/last30days is the most useful AI agent skill I've seen for developer research. The 43K star count isn't hype — it's because the tool solves a real problem that every developer faces: "what do people who actually use this thing think about it?" Google can't answer that. ChatGPT can't answer that. But a tool that searches Reddit upvotes, X threads, YouTube transcripts, and Polymarket odds in parallel and synthesizes the results? That answers it. The free tier covers Reddit, HN, Polymarket, and GitHub with zero configuration, which is already more useful than most research tools. Add a ScrapeCreators key and you unlock TikTok, Instagram, and Threads. The v3 engine's intelligent entity resolution is the real differentiator — it figures out who and what matters before searching, which is why it finds content that keyword-based tools miss entirely. If you use Claude Code, Codex, Cursor, or any AI coding agent, install this today. It changes how you evaluate every technical decision.
