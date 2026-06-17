---
name: honker
description: "Honker adds Postgres-style NOTIFY/LISTEN, durable task queues, pub/sub, and streams to SQLite — no Redis or message broker required."
url: https://github.com/russellromney/honker
stars: 2859
forks: 69
language: Python
tags: ["sqlite", "pubsub", "task-queue", "database", "developer-tools"]
featured: false
publishedAt: 2026-06-17
---

## Honker

### Overview

Honker is a SQLite extension with language bindings that bring Postgres-style `NOTIFY`/`LISTEN` semantics to SQLite, along with durable pub/sub, at-least-once task queues, event streams, and cron scheduling. It hit 2,800 GitHub stars within two months of its April 2026 launch, driven by a Simon Willison endorsement and a growing developer appetite for SQLite-native infrastructure.

The project is created by Russell Romney, a developer who's clearly spent enough time fighting the "just add Redis" reflex in SQLite-based applications. The core insight is simple but powerful: if SQLite is your primary datastore, your queue should live in the same file. No second database, no broker process, no dual-write problem between your business tables and your job queue. One `.db` file, one transaction, atomic commits.

The problem honker solves is one that nearly every SQLite-backed application eventually hits. You start with SQLite because it's fast, reliable, and zero-config. Then you need background jobs. The standard answer is "add Redis and Celery" or "add RabbitMQ." Suddenly you have a second datastore with its own backup story, a broker process to run and monitor, and a dual-write problem where your business insert and queue enqueue can fail independently. Honker eliminates all of that by making the queue just rows in a table with a partial index, accessed through a SQLite loadable extension.

### Why it matters

SQLite is having a moment. The "SQLite for production" movement has been building for years — Litestream for replication, LiteFS for distributed reads, Turso for edge deployment, and frameworks like Drizzle and Kysely treating SQLite as a first-class target. But the missing piece has always been the infrastructure layer: pub/sub, task queues, and scheduling. Those have been Redis/Celery/RabbitMQ territory, forcing developers to run a second data layer even when SQLite handles everything else.

Honker fills that gap. It's not trying to replace Postgres or compete with distributed message brokers. It's solving the specific problem of "I chose SQLite, and now I need a queue without adding Redis." That's a real pain point, and the project's rapid traction — nearly 3K stars, bindings for 10+ languages, and Simon Willison's stamp of approval within weeks — reflects genuine demand.

The timing connects to a broader shift in how developers think about architecture. The "add Redis for everything" era is being challenged by projects that push more functionality into SQLite. Drizzle brought type-safe SQL. Turso brought edge replication. Litestream brought streaming backups. Honker brings the messaging layer. Together, they're making SQLite viable for a class of applications that previously required a full Postgres or MySQL setup plus a message broker.

### Key Features

**Transactional Outbox Pattern.** The killer feature. You can enqueue a job inside the same transaction as your business write. `INSERT INTO orders` and `queue.enqueue(...)` commit together or roll back together. No partial state, no lost jobs, no need for the outbox table pattern that Postgres developers have been hand-rolling for years. Simon Willison specifically highlighted this as a SQLite implementation of the transactional outbox pattern.

**Single-Digit-Millisecond Wake Latency.** SQLite has no server-side push channel, so honker uses a `PRAGMA data_version` watcher that checks every millisecond. When the counter changes, listeners re-read indexed state. The result is cross-process delivery in single-digit milliseconds without polling overhead. A hundred subscribers share one watcher, and idle listeners run zero SELECTs until work arrives.

**Durable At-Least-Once Queues.** The queue implementation supports retries, delayed jobs, priority ordering, visibility timeouts, dead-letter rows, and task result storage. Claim is a single `UPDATE ... RETURNING` through a partial index on `(queue, priority DESC, run_at, id)`. Ack is a single `DELETE`. Retry-exhausted jobs move to a dead-letter table, so claim speed depends on active jobs, not queue history.

**10+ Language Bindings.** Python, Node.js, Rust, Go, Ruby, Bun, Elixir, .NET/C#, Java/JVM, and Kotlin — all sharing the same underlying SQLite schema and extension. A Python worker can claim jobs written by Node.js. A Go service can enqueue work consumed by Ruby. The extension and schema are the compatibility layer, not a protocol or wire format.

**Built-in Cron and Scheduling.** Time-trigger scheduling with standard cron expressions, 6-field cron, and `@every <duration>` interval syntax. Register periodic tasks with `honker_scheduler_register()`, tick the scheduler on each wake, and get back the list of tasks that are due. No external cron daemon needed for simple periodic work.

**Named Locks and Rate Limiters.** Distributed-style primitives for single-machine coordination: `honker_lock_acquire('backup', 'me', 60)` for advisory locks with TTL, and `honker_rate_limit_try('api', 10, 60)` for sliding-window rate limits. These cover the common patterns where developers reach for Redis just for `SET NX` or rate limiting.

**Framework-Agnostic ORM Integration.** No framework plugins required. Load the extension on your ORM connection, run `honker_bootstrap()`, and call SQL functions inside transactions. Works with SQLAlchemy, SQLModel, Django, Drizzle, Kysely, SQLx, GORM, ActiveRecord, Ecto, Hibernate, jOOQ, MyBatis, and Exposed.

### Use Cases

- **SQLite-backed web apps that need background jobs** — Django or Flask apps, Express servers, or Go services using SQLite can enqueue email sends, image processing, webhook deliveries, and report generation without adding Redis.
- **Local-first and desktop applications** — Electron or Tauri apps that ship with SQLite can use honker for inter-process communication between the main process and workers, all through the same database file.
- **CLI tools and scripts that need scheduling** — Instead of wiring up system cron or a separate scheduler, register tasks with `honker_scheduler_register()` and tick on each wake cycle.
- **Prototyping and side projects** — Skip the Redis/Celery/RabbitMQ setup entirely. One `pip install honker` and you have queues, pub/sub, and scheduling in your existing SQLite database.
- **Edge and serverless deployments** — Where running a separate message broker isn't practical, honker gives you queue semantics through a file-backed SQLite database that deploys with your application.

### Pros and Cons

Pros:
- Eliminates the Redis/Celery dependency for SQLite-backed applications. The queue lives in the same file as your data, in the same transaction. This is the architectural win that makes honker worth evaluating.
- Language bindings cover the major ecosystems (Python, Node, Go, Rust, Ruby, .NET, JVM). Cross-language job consumption works because the schema and extension are shared.
- Simon Willison's endorsement carries weight in the SQLite community, and the project's rapid growth (2.8K stars in two months) suggests real developer demand, not hype.
- Apache-2.0 OR MIT dual license. No strings attached.

Cons:
- Alpha software by the author's own admission. The README says "better than experimental, not beta-quality yet." Expect API changes and edge cases.
- Single-machine only. SQLite's locking model means one host writing one database file. If you need multi-server queue consumption, this isn't the tool — use Postgres + pg-boss or Redis Streams instead.
- The 1ms watcher cadence is a trade-off. Lower idle CPU means raising the interval, which increases delivery latency. For most applications this is fine, but real-time systems should measure on their hardware.

### Getting Started

```bash
# Install
pip install honker

# Quick example — enqueue and consume
python -c "
import honker

db = honker.open('app.db')
emails = db.queue('emails')

# Enqueue inside a transaction
with db.transaction() as tx:
    tx.execute('INSERT INTO orders (user_id) VALUES (?)', [42])
    emails.enqueue({'to': 'alice@example.com'}, tx=tx)

# Consume in another process
import asyncio
async def worker():
    async for job in emails.claim('worker-1'):
        print(f'Sending to {job.payload[\"to\"]}')
        job.ack()

asyncio.run(worker())
"
```

For Node.js:

```bash
npm install @russellthehippo/honker-node
```

For the SQL extension directly:

```sql
.load ./libhonker_ext
SELECT honker_bootstrap();
INSERT INTO _honker_live (queue, payload) VALUES ('emails', '{"to":"alice"}');
SELECT honker_claim_batch('emails', 'worker-1', 32, 300);
```

### Alternatives

**Huey** — A Python-native task queue that supports SQLite, Redis, and in-memory backends. Huey is more mature and has a cleaner Python API, but it's Python-only and doesn't offer the cross-language binding story that honker provides. Choose Huey if you're Python-only and want a battle-tested queue library.

**pg-boss** — The Postgres-side gold standard for job queues using `LISTEN`/`NOTIFY`. If you're already running Postgres, pg-boss is the better choice — it's production-proven and handles multi-server deployments. Honker exists for the cases where Postgres is overkill and SQLite is the right database.

**Redis + Celery** — The traditional answer for Python background jobs. Celery is feature-complete with chains, chords, groups, and a massive ecosystem. But it requires running Redis (or RabbitMQ) as a broker, which adds operational complexity. Honker trades feature breadth for simplicity: if your queue needs are straightforward, honker eliminates an entire infrastructure component.

### Verdict

Honker is the most practical SQLite extension I've seen this year. It doesn't try to be everything — it's single-machine, file-backed, and explicitly doesn't do workflow DAGs or distributed locking. What it does do is solve the "I need a queue but don't want Redis" problem in a principled way, with atomic transactions, cross-language bindings, and performance that's good enough for most applications. The 2.8K stars in two months and Simon Willison's endorsement reflect genuine developer interest, not marketing. If you're building on SQLite and you've been putting off adding a job queue because you don't want the infrastructure overhead, honker is worth evaluating today. It's alpha software, so don't ship it in your banking system yet — but for side projects, prototypes, and SQLite-backed web apps, it's a compelling alternative to the Redis/Celery stack.
