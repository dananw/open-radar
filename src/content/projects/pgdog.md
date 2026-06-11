---
name: pgdog
description: "PgDog is a Rust-powered PostgreSQL connection pooler, load balancer, and database sharder — a modern PgBouncer alternative with native query parsing."
url: https://github.com/pgdogdev/pgdog
stars: 4692
forks: 191
language: Rust
tags: ["postgresql", "rust", "connection-pooler", "load-balancer", "sharding", "database"]
featured: false
publishedAt: 2026-06-11
---

## PgDog

### Overview

PgDog is a PostgreSQL proxy that handles connection pooling, read replica load balancing, and horizontal sharding — all in a single Rust binary. It sits between your application and your Postgres instances, multiplexing thousands of client connections onto a small pool of server connections while routing queries intelligently based on their content. The project has accumulated 4,692 GitHub stars since its December 2024 launch and just announced external funding in June 2026, signaling it's moving from side project to production infrastructure.

The creator, Lev Kokotov, built PgDog from real operational pain. The project uses `pg_query` — the same PostgreSQL parser extracted from the C source code — to actually understand what queries are doing. This isn't regex matching. PgDog parses the SQL AST and can tell you whether a transaction contains writes, extract sharding keys from WHERE clauses, and route `BEGIN READ ONLY` blocks to replicas. That level of protocol awareness is what separates it from simpler connection poolers.

The core problem PgDog solves is the impedance mismatch between how applications connect to PostgreSQL and how PostgreSQL wants to be connected. A typical NestJS or Django app opens a connection pool of 20-50 connections per process. Run 10 processes and you've burned through 200-500 connections on a database that performs best with maybe 50-100 active connections. PgBouncer has been the standard answer for years, but it's showing its age — limited configuration, no native sharding, no query-aware routing, and a C codebase that's increasingly hard to extend. PgDog takes the same fundamental idea and rebuilds it with modern tooling.

### Why it matters

If you're running PostgreSQL in production with any serious traffic, you're probably already using a connection pooler. The question is whether you're using one that understands your queries or one that just passes bytes through. PgBouncer processes 87% of the world's pooled Postgres traffic according to various industry surveys, and it does the job. But it doesn't parse SQL, doesn't do intelligent load balancing across replicas, and definitely doesn't shard.

PgDog matters because it collapses three separate infrastructure concerns — connection pooling, read/write splitting, and sharding — into a single tool. Instead of running PgBouncer for pooling, HAProxy for load balancing, and custom application logic for shard routing, you configure one TOML file. For teams running Django or Go services against a growing Postgres cluster, this simplifies the infrastructure stack considerably.

The funding announcement is the real signal here. Open source database infrastructure rarely gets funded unless it has real production users and a clear path to sustainability. The June 2026 announcement suggests PgDog is already running in production at companies beyond the creator's own projects. For a Rust project that's only 18 months old, that's fast adoption.

### Key Features

**Protocol-Level Query Parsing.** PgDog uses the actual PostgreSQL parser (`pg_query`) to understand SQL statements at the AST level. It can detect writes (`INSERT`, `UPDATE`, `DELETE`, DDL) and route them to the primary while sending reads (`SELECT`) to replicas. This isn't heuristic matching — it handles CTEs, subqueries, and complex transactions correctly. The parser also extracts sharding keys from WHERE clauses and JOIN conditions to determine optimal shard routing.

**Transaction and Session Pooling.** Like PgBouncer, PgDog supports both transaction-level and session-level connection pooling. But it handles `SET` statements and startup parameters correctly, which is a known PgBouncer weakness. When your Django app issues `SET search_path` or `SET timezone`, PgDog tracks that state per-client and restores it when reusing server connections. It also recovers abandoned transactions automatically, rolling back stale work instead of churning server connections during application crashes.

**Intelligent Load Balancing.** PgDog operates at OSI Layer 7 (application layer) and understands the Postgres wire protocol. It supports three load balancing strategies: round-robin, random, and least-active-connections. Health checks run continuously, removing unhealthy replicas from rotation and re-routing queries automatically. The single-endpoint design means your application connects to one address and PgDog handles the rest — no client-side routing libraries needed.

**Native Database Sharding.** This is where PgDog pulls away from PgBouncer entirely. Configure multiple hosts with different shard numbers and PgDog routes queries to the correct shard based on extracted partition keys. It supports hash-based sharding (matching PostgreSQL's `PARTITION BY HASH`), list-based sharding, and schema-based sharding. Cross-shard queries get merged in memory and returned as a single result set — the client doesn't know it's talking to multiple databases.

**Cloud-Native Authentication.** PgDog supports SCRAM-SHA-256, MD5, and plain password authentication between clients and the proxy. For the proxy-to-database leg, it adds AWS RDS IAM authentication and Azure Workload Identity. This means you can keep simple password auth for your application while PgDog handles the cloud IAM token dance with your managed database. No more rotating RDS auth tokens in application config.

**Kubernetes and Terraform Ready.** PgDog ships with a Helm chart and an ECS Terraform module. The Helm chart deploys PgDog as a sidecar or standalone service with configurable resource limits. The Terraform module handles VPC networking, security groups, and service discovery for AWS deployments. If you're running NestJS or Go services on EKS, adding PgDog is a one-line Helm install.

**TOML Configuration with Sane Defaults.** Two files — `pgdog.toml` and `users.toml` — control everything. A minimal config for a single database is under 10 lines. Sharding, load balancing, failover, and auth settings all have sensible defaults. No YAML, no environment variable soup, no required config maps. The TOML format is explicit and version-control friendly.

### Use Cases

- **Scaling a Django or NestJS application** — When your app server count grows and PostgreSQL connection exhaustion becomes a bottleneck, PgDog pools connections across all instances behind a single endpoint. Drop in without changing application code.

- **Read-heavy workloads with replicas** — If you're running read replicas alongside your primary, PgDog automatically splits reads and writes. Your Go API connects to one PgDog address and gets intelligent routing without any client-side logic.

- **Horizontal scaling via sharding** — When a single Postgres instance can't handle your write volume, PgDog lets you shard across multiple databases using the same partition functions PostgreSQL uses natively. Cross-shard queries are handled transparently.

- **Managed database IAM authentication** — Teams on AWS RDS or Azure who want to use IAM tokens for database auth without embedding the token-refresh logic in every application service.

- **Replacing PgBouncer with modern tooling** — If you're hitting PgBouncer limitations (no query parsing, no sharding, limited auth options), PgDog is a drop-in replacement that speaks the same wire protocol.

### Pros and Cons

Pros:
- Replaces three tools (pooler + load balancer + shard router) with one, simplifying infrastructure and reducing operational overhead. Single binary, single config, single deployment.
- Uses the actual PostgreSQL parser, not regex or heuristics. Query routing decisions are correct by construction, not by pattern matching.
- Rust performance means it handles thousands of connections with minimal CPU and memory overhead. No garbage collection pauses, no connection pool contention.
- Cloud-native auth (RDS IAM, Azure Workload Identity) eliminates the painful token rotation dance that plagues managed database deployments.

Cons:
- Rust compilation from source takes time and requires the Rust toolchain. Pre-built binaries are available but the ecosystem isn't as mature as PgBouncer's 20+ years of packaging.
- Sharding configuration has a learning curve. You need to define sharded tables, choose partition functions, and understand how cross-shard queries work. This isn't "set and forget" — it requires deliberate schema design.
- The AGPL v3 license means you can't embed PgDog in proprietary SaaS products without either open-sourcing your code or negotiating a commercial license. This is more restrictive than PgBouncer's BSD license.
- Documentation is growing but not yet comprehensive. Some advanced features (failover with Patroni, complex sharding topologies) require reading source code or asking on Discord.

### Getting Started

```bash
# Try PgDog with Docker Compose (includes 3 shards)
git clone https://github.com/pgdogdev/pgdog.git
cd pgdog
docker-compose up

# Connect with any PostgreSQL client
PGPASSWORD=*** psql -h 127.0.0.1 -p 6432 -U postgres

# Test sharded inserts and cross-shard reads
INSERT INTO users (id, email) VALUES (1, 'admin@acme.com');
INSERT INTO payments (id, user_id, amount) VALUES (1, 1, 100.0);
SELECT * FROM users WHERE id = 1;
SELECT * FROM payments WHERE user_id = 1;
```

For production on Kubernetes:

```bash
helm repo add pgdogdev https://helm.pgdog.dev
helm install pgdog pgdogdev/pgdog
```

Minimal config for a single Postgres instance:

```toml
# pgdog.toml
[general]
port = 6432
default_pool_size = 10

[[databases]]
name = "myapp"
host = "127.0.0.1"

# users.toml
[[users]]
name = "app_user"
database = "myapp"
password = "your-password"
```

### Alternatives

**PgBouncer** — The industry standard PostgreSQL connection pooler, written in C and deployed in production for over two decades. PgBouncer is battle-tested, BSD-licensed, and available in every Linux distribution's package manager. It handles transaction and session pooling well but has no query parsing, no native sharding, and limited auth options. Choose PgBouncer if you only need basic connection pooling and want maximum ecosystem maturity.

**Supabase Supavisor** — A cloud-native connection pooler written in Elixir, designed specifically for Supabase's managed PostgreSQL platform. Supavisor is multi-tenant by design and handles connection pooling at scale for Supabase's hosted database service. It's open source but tightly coupled to the Supabase ecosystem. Choose Supavisor if you're already on Supabase and want a pooler that integrates with their auth and realtime features.

**Odyssey (Yandex)** — A PostgreSQL connection pooler and request router written in C by Yandex. Odyssey supports multi-threading, TLS, and authentication passthrough. It's more modern than PgBouncer but has a smaller community and less documentation. Choose Odyssey if you need multi-threaded connection pooling in C and want something lighter than PgDog's Rust binary.

### Verdict

PgDog is the most compelling PostgreSQL infrastructure tool I've seen since PgBouncer itself. The combination of connection pooling, intelligent load balancing, and native sharding in a single Rust binary addresses real pain points that every growing application hits. The use of the actual PostgreSQL parser for query routing — not regex, not heuristics — is the kind of engineering decision that pays off in correctness over time. With 4,692 stars and fresh funding, it's clear the project has momentum beyond just Hacker News hype. If you're running PostgreSQL with replicas or considering sharding in the next 12 months, PgDog deserves a serious look over PgBouncer. The AGPL license is the main friction point for commercial use, but for internal infrastructure it's a non-issue.
