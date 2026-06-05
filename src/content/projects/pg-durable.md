---
name: pg-durable
description: "Microsoft's pg_durable brings durable execution directly into PostgreSQL — define fault-tolerant, long-running workflows in SQL with automatic checkpointing and crash recovery."
url: https://github.com/microsoft/pg_durable
stars: 540
forks: 9
language: Rust
tags: ["postgresql", "durable-execution", "workflows", "microsoft", "backend"]
featured: false
publishedAt: 2026-06-06
---

## pg_durable

### Overview

pg_durable is a PostgreSQL extension that brings durable execution directly inside the database. Built by Microsoft and written in Rust, it lets you define long-running, fault-tolerant workflows as SQL functions — with automatic checkpointing, crash recovery, and step-level retries. No external orchestrator. No queue. No separate worker service. Just Postgres.

The project has been in development since February 2026 and recently hit 540 GitHub stars after trending on Hacker News with 260+ points. The top contributor, pinodeca, has over 120 commits, and the team is actively developing it as part of Microsoft's broader push to bring compute closer to data. It's available now in Azure HorizonDB, Microsoft's new PostgreSQL cloud service built with pg_durable inside.

The core problem it solves is one every backend developer knows: making background jobs reliable. You have a multi-step process — chunk some documents, call an embedding API, upsert into pgvector. Today you stitch together pg_cron, a jobs table, status columns, retry counters, and a polling worker. Or you pull in Airflow, Temporal, or Step Functions. Either way, you're managing state across multiple systems, and when something crashes halfway through, you're debugging partial completions at 2 AM. pg_durable moves all of that into Postgres itself.

### Why it matters

Durable execution has become a standard pattern in backend engineering. Temporal raised $150M+ and powers workflows at Netflix, Stripe, and Snap. DBOS emerged from the MIT/Stanford database community to bring durable workflows closer to the database. Inngest, Restate, and Propel are all building in this space. The pattern is clear: developers want their workflow logic to live near their data, and they want crash recovery without operational complexity.

pg_durable takes this trend to its logical conclusion — put the workflow engine inside Postgres itself. For the millions of teams already running PostgreSQL (which is roughly 45% of developers according to Stack Overflow's 2025 survey), this means zero new infrastructure. No new service to deploy, monitor, scale, or secure. Your workflows share the same backup, auth, and replication model as your data.

This matters especially for AI/ML pipelines, which are inherently multi-step and failure-prone. Calling an LLM API, processing the response, storing embeddings, updating a knowledge graph — each step can fail independently. pg_durable lets you define that pipeline in SQL, checkpoint between steps, and resume from exactly where you left off after any failure. For teams building RAG systems, document processing pipelines, or agent memory backends on Postgres, this is a compelling alternative to external orchestrators.

### Key Features

**Durable Checkpointing.** Every step in a pg_durable workflow is automatically checkpointed. If the database crashes, restarts, or a step fails, execution resumes from the last successful checkpoint. No manual replay, no duplicate processing, no "which rows did I already process?" debugging sessions.

**SQL-Native Workflow Definition.** Workflows are defined as composable SQL functions using operators like `~>` (sequential) and `|=>` (parallel fan-out). You start a workflow with `df.start()` and get back an instance ID. The entire definition lives in your database schema, versioned alongside your tables and views.

**Parallel Fan-Out and Join.** pg_durable supports running independent steps in parallel and joining results. Need to query three tables simultaneously and aggregate the results? Define it as a parallel branch in your workflow graph. The runtime handles the coordination.

**Step-Level Retries with Backoff.** Failed steps are automatically retried with configurable backoff policies. API call timed out? pg_durable retries it. External service returned a 500? Retry with exponential backoff. You configure the retry policy per step, not per workflow.

**Operational Visibility via SQL.** Workflow status, progress, and results are queryable from standard Postgres tables like `df.instances`. No separate dashboard to learn, no external API to poll. Want to know which workflows are running, which failed, and why? Write a SQL query.

**External HTTP Calls from SQL.** Workflows can call external APIs as steps. This means you can orchestrate LLM API calls, webhook processing, and enrichment pipelines directly from your database functions, with the same durability guarantees as any other step.

**Zero Infrastructure Overhead.** pg_durable runs as a Postgres extension with a background worker. No separate services to deploy, no message queues to configure, no orchestrator to scale. If you have Postgres, you have durable execution.

### Use Cases

- **Vector embedding pipelines** — Chunk documents, call an embedding API, and upsert into pgvector with automatic retries and checkpointing. If the embedding API goes down mid-batch, resume from the last successful chunk.

- **ETL and data ingestion** — Stage, deduplicate, transform, and publish data in multi-step pipelines. Each step is durable, so a crash during the transform phase doesn't mean re-processing the entire batch.

- **AI agent memory and tool orchestration** — Orchestrate multi-step agent workflows that call LLMs, process responses, update knowledge graphs, and trigger follow-up actions — all with crash recovery.

- **Scheduled maintenance and runbooks** — Define maintenance procedures as durable workflows: detect bloat, notify the team, wait for approval, then execute cleanup. Each step survives restarts.

- **Webhook processing and event pipelines** — Receive a webhook, validate it, enrich data from external APIs, update multiple tables, and trigger downstream notifications — durably, with retries on each external call.

### Pros and Cons

Pros:
- Zero new infrastructure if you already run PostgreSQL. No orchestrator, no queue, no separate worker fleet to manage. This is a genuine operational simplification for small-to-medium teams.
- SQL-native workflow definition means your workflow logic is versioned, reviewed, and deployed alongside your schema. No drift between your database state and your orchestration code.
- Microsoft backing and active development with 120+ commits from the lead contributor. This isn't a weekend project — it's part of Microsoft's Azure HorizonDB strategy.

Cons:
- PostgreSQL extension requirement means you can't use it with managed Postgres services that don't support custom extensions (most serverless Postgres providers, for example).
- The "workflows in SQL" model works well for data-centric pipelines but gets awkward when you need complex application logic, conditional branching with external state, or rich error handling. Some workflows are just better expressed in Python or TypeScript.
- Relatively young project (February 2026). The API surface may change, and the ecosystem of examples and community knowledge is still thin compared to Temporal or DBOS.

### Getting Started

pg_durable requires PostgreSQL 17 or 18. Build and install the extension:

```bash
# Clone the repository
git clone https://github.com/microsoft/pg_durable.git
cd pg_durable

# Build (requires Rust toolchain and PostgreSQL dev headers)
cargo install --path .

# Enable in your database
psql -c "CREATE EXTENSION pg_durable;"

# Define a durable workflow
psql << 'SQL'
CREATE FUNCTION my_pipeline(doc_id int) RETURNS void
LANGUAGE plpgsql AS $$
BEGIN
  -- Step 1: Extract text
  PERFORM df.start('extract', doc_id);
  -- Step 2: Call embedding API (durable HTTP call)
  PERFORM df.start('embed', doc_id);
  -- Step 3: Upsert into pgvector
  PERFORM df.start('store', doc_id);
END;
$$;

-- Start a workflow instance
SELECT df.start('my_pipeline', 42);

-- Check status
SELECT * FROM df.instances ORDER BY started_at DESC LIMIT 5;
SQL
```

For a quicker evaluation, try it in [Azure HorizonDB](https://aka.ms/AzureHorizonDB), which has pg_durable pre-installed.

### Alternatives

**Temporal** — The heavyweight champion of durable execution. Temporal offers language-native workflow definitions in Go, Java, TypeScript, and Python with a mature ecosystem and battle-tested reliability at companies like Netflix and Stripe. Choose Temporal when you need complex workflow logic expressed in a general-purpose language, multi-language support, or a proven production track record at massive scale. pg_durable wins when you want zero additional infrastructure and your workflows are naturally data-centric.

**DBOS** — Created by the MIT/Stanford database research community, DBOS brings durable execution to TypeScript and Python with a Postgres-backed state store. It's closer to pg_durally philosophically — both believe compute should live near data — but DBOS works as an application-level library rather than a database extension. Choose DBOS when you want durable workflows in TypeScript or Python with Postgres backing but can't or don't want to install Postgres extensions.

**Inngest** — A serverless durable execution platform that triggers workflows from events. Inngest manages the infrastructure for you and integrates well with Next.js, Remix, and other modern frameworks. Choose Inngest when you want a fully managed solution with a generous free tier and don't want to manage any infrastructure at all. pg_durable is for teams that want full control and already operate Postgres.

### Verdict

pg_durable is one of the most interesting backend tools I've seen this year. The "durable execution inside Postgres" pitch sounds niche until you realize how many teams are already running multi-step background jobs against PostgreSQL with janky pg_cron plus status-table setups. Microsoft is clearly betting that the database should be the workflow engine for data-centric workloads, and the 260+ point Hacker News reception suggests the developer community agrees. If you're running PostgreSQL 17+ and your background jobs are mostly "do something to data, call an API, update more data," pg_durable could eliminate an entire category of infrastructure from your stack. It's young, the API will evolve, and complex application-level workflows still belong in Temporal or code — but for data pipelines, ETL, and AI/ML orchestration, this is worth building on today.
