---
name: gofr
description: "GoFr is an opinionated Go microservices framework with built-in observability, database migrations, gRPC, and Kubernetes-ready deployment. CNCF-listed."
url: https://github.com/gofr-dev/gofr
stars: 21367
forks: 1763
language: Go
tags: ["go", "microservices", "framework", "observability", "grpc"]
featured: false
publishedAt: 2026-06-08
---

## GoFr

### Overview

GoFr is an opinionated Go microservices framework that ships with built-in observability, database support, pub/sub, gRPC, and Kubernetes-ready deployment out of the box. It has accumulated over 21,000 GitHub stars since its October 2023 launch and is listed in the CNCF Landscape, which signals a level of production-readiness that most Go frameworks can't claim.

The project is maintained by the GoFr development team and backed by JetBrains. It's Apache-2.0 licensed and actively developed — the latest release (v1.56.7) dropped on June 5, 2026, with the previous release just two weeks before that. The release cadence is consistent, with minor versions shipping every week or two. That kind of velocity suggests a healthy maintainer team and an engaged community.

The core problem GoFr solves is the boilerplate tax on Go microservices. Every Go developer knows the drill: set up a router, wire up a database connection, configure logging, add tracing, set up health checks, handle graceful shutdown, write middleware for auth and circuit breaking. You end up copying the same 500 lines of infrastructure code across every service. GoFr collapses all of that into a single framework import and a few configuration lines. You write your business logic; GoFr handles the rest.

### Why it matters

The Go ecosystem has no shortage of web frameworks — Gin, Echo, Fiber, Chi — but they're all HTTP routers at heart. They give you request handling and middleware, then leave you to wire up everything else yourself. GoFr takes a different stance: it's a microservice framework, not a web framework. The distinction matters. A microservice needs observability, service-to-service communication, database migrations, pub/sub messaging, health checks, and deployment configuration. GoFr provides all of that as first-class primitives, not afterthoughts you bolt on with third-party libraries.

This is particularly relevant for fullstack developers who use Go for backend services alongside React, Next.js, or similar frontend frameworks. If you're building a NestJS-style architecture in Go — with multiple services, database layers, message queues, and API gateways — GoFr gives you the same "batteries included" experience that NestJS provides in the TypeScript world. The opinionated structure means your team spends less time debating architectural choices and more time shipping features.

The CNCF listing is worth noting. It means GoFr has passed a basic bar for cloud-native tooling and is recognized alongside projects like Istio, Prometheus, and Envoy in the landscape. That's not a trivial endorsement — it signals that the framework is designed for real production workloads, not just tutorials.

### Key Features

**Built-in OpenTelemetry Observability.** Every GoFr application automatically emits structured logs, distributed traces, and metrics without any configuration. You get a `/trace` endpoint, Prometheus-compatible metrics, and structured JSON logs out of the box. The framework instruments database queries, HTTP calls, pub/sub operations, and custom handlers. This means you can plug GoFr services into Jaeger, Grafana, or Datadog on day one — no manual instrumentation needed.

**Database Migrations and Multi-Database Support.** GoFr supports MySQL, PostgreSQL, ClickHouse, MongoDB, SQLite, and SurrealDB as first-class datasources. Each database gets automatic health checks and connection pooling. More importantly, GoFr includes a built-in migration system that runs on application startup. You write SQL migration files, and GoFr applies them in order. This eliminates the need for tools like golang-migrate or Flyway in most cases.

**gRPC and REST with Zero Boilerplate.** You can expose both REST and gRPC endpoints from the same GoFr application. For REST, the framework handles routing, request binding, validation, and response serialization. For gRPC, GoFr generates the server scaffolding and integrates it into the same observability pipeline. The API is clean — `app.GET("/users", handler)` and `app.RegisterGRPCService(pb.RegisterUserServiceServer, &service{})` — and both protocols share the same middleware, auth, and tracing infrastructure.

**Pub/Sub with Kafka, Google Pub/Sub, NATS, and MQTT.** Message-driven architectures are a first-class concern in GoFr. The framework provides publisher and subscriber interfaces for Kafka, Google Cloud Pub/Sub, NATS, Azure Event Hub, and MQTT. You write a subscriber handler, configure the broker in your `.env` file, and GoFr handles connection management, retries, and dead-letter routing. The pub/sub operations are automatically traced, so you get end-to-end visibility across synchronous and asynchronous flows.

**Circuit Breaker for Service-to-Service Calls.** When your microservice calls another HTTP service, GoFr wraps the call with a circuit breaker by default. If the downstream service starts failing, the circuit opens and returns a fallback response instead of cascading the failure. This is a pattern that every production microservice needs but few teams implement correctly. GoFr makes it a default behavior, not an opt-in feature.

**Cron Jobs and Async Processing.** GoFr includes a built-in cron scheduler that runs jobs inside your application process. You define cron expressions and handlers, and GoFr manages the scheduling, execution, and error handling. The cron jobs are instrumented with the same observability pipeline as HTTP handlers, so you get traces and metrics for background work without extra setup.

**Kubernetes-Native Deployment.** The framework is designed for container-first deployment. GoFr applications expose health check endpoints (`/health`), readiness probes, and graceful shutdown handlers that work with Kubernetes lifecycle hooks. The configuration system reads from environment variables, which maps cleanly to Kubernetes ConfigMaps and Secrets. You can go from `go build` to a running Kubernetes deployment with a standard Dockerfile and a few YAML manifests.

### Use Cases

- **API gateway services** — GoFr's REST and gRPC support, combined with circuit breakers and middleware, makes it a solid choice for API gateway layers that aggregate multiple downstream services.
- **Event-driven backend systems** — The built-in pub/sub support for Kafka, NATS, and Google Pub/Sub makes GoFr a natural fit for event-driven architectures where services communicate through messages rather than direct HTTP calls.
- **Fullstack Go backends with React/Next.js frontends** — If your team uses Go for the API layer and React or Next.js for the frontend, GoFr provides the same "batteries included" experience that NestJS offers in the TypeScript ecosystem.
- **Data pipeline services** — With ClickHouse support, cron jobs, and pub/sub, GoFr works well for services that ingest, transform, and route data between systems.
- **Microservice prototypes and hackathon projects** — The opinionated defaults mean you can spin up a fully instrumented microservice in minutes, which is valuable for rapid prototyping.

### Pros and Cons

Pros:
- Built-in observability eliminates the most common gap in Go microservices. Most teams spend days wiring up logging, tracing, and metrics — GoFr gives you all three on line one.
- The opinionated structure reduces decision fatigue. You don't need to choose between 15 router libraries, 8 ORM options, and 12 logging packages. GoFr picks reasonable defaults and lets you override when needed.
- Active development with a weekly release cadence and 1,763 forks suggests a healthy contributor base. The CNCF listing adds credibility for enterprise adoption.
- Multi-database support with automatic health checks means you can connect to Postgres, MySQL, MongoDB, and ClickHouse without writing connection management code.

Cons:
- The opinionated approach means you're locked into GoFr's way of doing things. If you need a custom middleware chain or non-standard request lifecycle, the framework can feel constraining compared to more flexible alternatives like Echo or Chi.
- Go 1.24+ requirement means you can't use it on older Go installations. Some enterprise environments lag behind on Go versions.
- The framework is Go-specific and doesn't have the cross-language ecosystem that gRPC or OpenTelemetry provide natively. If your team mixes Go with Python or Node.js services, GoFr's benefits are limited to the Go services.
- Documentation is decent but not exceptional. The official docs cover the basics well, but advanced patterns (custom datasources, complex middleware chains) require reading source code or asking on Discord.

### Getting Started

```bash
# Install GoFr
go get -u gofr.dev/pkg/gofr

# Create a simple service
mkdir myservice && cd myservice
go mod init myservice
```

Create `main.go`:

```go
package main

import "gofr.dev/pkg/gofr"

func main() {
    app := gofr.New()

    app.GET("/greet", func(ctx *gofr.Context) (any, error) {
        return "Hello World!", nil
    })

    app.GET("/users", func(ctx *gofr.Context) (any, error) {
        // Database query with automatic tracing
        users, err := ctx.SQL.QueryContext(ctx, "SELECT * FROM users")
        if err != nil {
            return nil, err
        }
        return users, nil
    })

    app.Run() // listens on :8000
}
```

Run the service:

```bash
go run main.go
```

The service starts on port 8000 with automatic logging, tracing, and health checks at `/health`.

### Alternatives

**Gin** — The most popular Go HTTP framework with 80K+ stars. Gin is faster for pure HTTP workloads and has a larger ecosystem of middleware. Choose Gin if you only need a router and want maximum flexibility in picking your own observability, database, and messaging libraries. Choose GoFr if you want all of that integrated.

**Echo** — Another high-performance Go web framework focused on simplicity and minimal allocation. Echo is lighter than GoFr and gives you more control over the request lifecycle. Better choice for simple REST APIs where you don't need pub/sub, gRPC, or built-in migrations.

**NestJS** — If you're in the TypeScript ecosystem, NestJS provides a similar "batteries included" experience with modules, dependency injection, and built-in support for databases, queues, and microservices. NestJS is the right choice if your team is TypeScript-first. GoFr is the Go equivalent for teams that want the same structure without leaving Go.

### Verdict

GoFr is the best "NestJS for Go" option available today. It takes the same opinionated, batteries-included approach that made NestJS popular in the TypeScript world and applies it to Go microservices. The built-in observability alone justifies the framework — most Go teams spend their first week on a new service wiring up logging, tracing, and metrics, and GoFr gives you all three for free. The CNCF listing and 21K stars suggest real production adoption, and the weekly release cadence shows the project isn't slowing down. If you're building Go microservices in 2026 and you're tired of assembling infrastructure from scratch, GoFr is worth a serious look.
