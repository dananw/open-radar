---
name: iroh
description: "Iroh is a Rust networking library that dials cryptographic keys instead of IP addresses — the foundation for local-first and P2P apps that just hit v1.0."
url: https://github.com/n0-computer/iroh
stars: 8906
forks: 425
language: Rust
tags: ["networking", "p2p", "rust", "local-first", "quic"]
featured: false
publishedAt: 2026-06-16
---

## Iroh

### Overview

Iroh hit version 1.0.0 on June 15, 2026, and the timing couldn't be better. The project has been brewing since 2022, accumulated nearly 9,000 GitHub stars, and just landed on the Hacker News front page with 886 upvotes and 276 comments. That's a strong signal that the developer community has been waiting for this.

The project is built by n0-computer (stylized as "number zero"), a small team focused on one idea: IP addresses are a terrible way to find things on the network. Instead of connecting to `192.168.1.42:8080`, Iroh lets you dial a cryptographic public key. The library then figures out how to reach that peer — direct connection, NAT holepunching, relay servers, multipath — without you caring about the underlying network topology. It's built on QUIC, the protocol that underpins HTTP/3, so you get encryption, multiplexing, and congestion control for free.

The core problem Iroh solves is deceptively simple: making peer-to-peer networking actually work in practice. NAT traversal has been the graveyard of P2P ambitions for two decades. Every home router, corporate firewall, and carrier-grade NAT adds another layer of indirection that breaks direct connections. Iroh handles this with a combination of ICE-style connectivity checks, relay servers for when direct connections fail, and multipath support that can use multiple network interfaces simultaneously. The result is a networking stack where two devices can reliably find and talk to each other, regardless of where they sit on the network.

### Why it matters

The local-first software movement has been building momentum for years, but the networking layer has always been the weak link. Projects like Automerge and CRDTs solved the data synchronization problem, but getting two devices to actually connect remained painful. You either needed a centralized server (defeating the purpose) or you had to write custom NAT traversal code (a nightmare). Iroh fills that gap.

For fullstack developers, this opens up architectures that weren't practical before. Imagine a collaborative editing tool where peers connect directly without routing through your servers. Or a mobile app that syncs data with a desktop app over the local network when they're in the same room, and falls back to relay servers when they're not. Or a backend service that can be addressed by a stable public key instead of a fragile IP address that changes every time you redeploy.

The v1.0 release matters because it signals API stability. The n0-computer team has been transparent about breaking changes throughout the pre-1.0 period — the changelog shows dozens of breaking changes in the last year alone. Now that 1.0 is out, the API contract is stable. You can build on Iroh without worrying that next month's release will require a rewrite. That's the kind of commitment that makes a library production-ready.

### Key Features

**Key-Based Addressing.** Instead of IP addresses and ports, you connect to peers using their NodeId — a ed25519 public key. This means a server or peer has a stable identity regardless of where it's deployed. Move it to a different machine, different cloud provider, or different continent, and clients can still reach it by the same key. No DNS configuration, no load balancer rewrites.

**Automatic NAT Traversal.** Iroh implements a connectivity stack that tries direct connections first, attempts NAT holepunching via STUN-like probes, and falls back to relay servers when neither works. The developer doesn't configure any of this — the library handles it. In practice, this means P2P connections work across home routers, corporate firewalls, and mobile networks without manual port forwarding.

**QUIC Transport Layer.** All connections use QUIC, which gives you TLS 1.3 encryption by default, stream multiplexing (no head-of-line blocking), and modern congestion control. This isn't a custom protocol bolted onto UDP — it's the same transport that powers HTTP/3, battle-tested at scale by Google, Cloudflare, and others.

**Relay Infrastructure.** When direct connections aren't possible, Iroh routes traffic through relay servers. The default relay runs at `relay.iroh.computer`, but you can self-host your own. Relays are lightweight and the protocol is designed to minimize latency — once a direct path is discovered, traffic switches over automatically.

**Multipath Support.** Iroh can use multiple network interfaces simultaneously. If a device has both WiFi and cellular connectivity, Iroh can use both to improve reliability and throughput. This is particularly valuable for mobile applications where network conditions change frequently.

**Modular Architecture.** The library is split into focused crates: `iroh` for the core networking, `iroh-relay` for relay server implementation, `iroh-blobs` for content-addressed data transfer, and `iroh-docs` for document synchronization. You can use just the networking layer, or compose the higher-level primitives for a complete P2P application stack.

**Rust-First with WASM Potential.** Iroh is written in Rust, which means it compiles to native code on servers and embedded targets. The Rust ecosystem's WebAssembly support means Iroh can theoretically run in browsers, though this is still maturing. For backend services in Go or Node.js, FFI bindings are the path forward.

### Use Cases

- **Local-first collaborative apps** — Build document editors, project management tools, or design tools where peers sync directly without a central server. Combine Iroh with CRDTs like Automerge for conflict-free data synchronization.

- **IoT device mesh networks** — Connect sensors, actuators, and controllers using stable node identities instead of fragile IP assignments. Devices can discover and communicate with each other even on dynamic networks.

- **Decentralized backend services** — Replace service discovery and load balancing with key-based addressing. A service advertises its public key, and clients connect directly without needing DNS or a service mesh.

- **Mobile-to-desktop sync** — Build apps that sync data between a user's phone and laptop using local network connections when possible, with relay fallback for remote sync.

- **Peer-to-peer content distribution** — Use `iroh-blobs` for content-addressed file sharing where data is identified by its hash and can be fetched from any peer that has it, similar to IPFS but with better NAT traversal.

### Pros and Cons

Pros:
- The key-based addressing model is genuinely novel and solves real problems in distributed systems. No other networking library makes P2P this easy.
- v1.0 API stability means you can commit to Iroh in production without worrying about constant breaking changes. The team earned this milestone through rigorous pre-release iteration.
- QUIC foundation gives you modern transport features (encryption, multiplexing, congestion control) without having to implement them yourself.
- Active development with 4300+ commits and a responsive maintainer team. The 140 open issues suggest healthy engagement, not neglect.

Cons:
- Rust-only means you need Rust expertise on your team. For Go or Python backends, you'll need FFI bindings or a separate networking layer, which adds complexity.
- Browser support via WebAssembly is still experimental. If your primary target is web-to-web P2P, WebRTC remains the more mature option today.
- The relay infrastructure adds a dependency on n0-computer's servers for the default configuration. Self-hosting is possible but adds operational overhead.
- The documentation, while improving, still has gaps. The API reference is solid, but high-level guides for common patterns (like combining Iroh with a CRDT library) are sparse.

### Getting Started

```bash
# Add iroh to your Rust project
cargo add iroh

# For content-addressed blob transfer
cargo add iroh-blobs

# For document synchronization
cargo add iroh-docs
```

A minimal peer-to-peer connection example:

```rust
use iroh::{Endpoint, NodeId};
use std::str::FromStr;

#[tokio::main]
async fn main() -> anyhow::Result<()> {
    // Create an endpoint — this generates a keypair and starts listening
    let endpoint = Endpoint::builder().discovery_n0().bind().await?;

    println!("Our NodeId: {}", endpoint.node_id());

    // Connect to a peer by their public key
    let node_id = NodeId::from_str("abc123...")?;
    let conn = endpoint.connect(node_id, b"my-alpn").await?;

    // Open a bidirectional stream
    let (mut send, mut recv) = conn.open_bi().await?;

    // Send data
    send.write_all(b"Hello from Iroh!").await?;
    send.finish()?;

    // Read response
    let response = recv.read_to_end(1024).await?;
    println!("Received: {:?}", String::from_utf8_lossy(&response));

    Ok(())
}
```

Run the relay server locally for testing:

```bash
# Clone and run the relay server
git clone https://github.com/n0-computer/iroh.git
cd iroh
cargo run --bin iroh-relay -- --dev
```

### Alternatives

**libp2p** — The networking layer behind IPFS and Ethereum 2.0. libp2p is more mature and has a larger ecosystem with implementations in Go, Rust, JavaScript, and Python. It's the better choice if you need broad language support or are building on top of an existing libp2p-based protocol. However, libp2p's API surface is significantly larger and more complex — Iroh's focused approach is easier to get started with.

**WebRTC** — The browser-native P2P standard. WebRTC has universal browser support and mature NAT traversal via ICE/TURN/STUN. It's the right choice if your primary use case is browser-to-browser communication. Iroh is better suited for server-to-server, server-to-device, and native app scenarios where you need stable node identities and don't want to deal with SDP negotiation.

**Hyperswarm** — A DHT-based peer discovery library from the Hypercore/Dat ecosystem. Hyperswarm uses a distributed hash table for peer discovery, which is more decentralized than Iroh's relay-based approach. Choose Hyperswarm if you want fully decentralized peer discovery and are working in the Node.js ecosystem. Iroh's QUIC-based transport is faster and more reliable than Hyperswarm's TCP-based connections.

### Verdict

Iroh is the most compelling P2P networking library to ship a 1.0 in years. The "dial keys, not IPs" mental model is simple enough to explain in one sentence, and the implementation backs it up with real NAT traversal, QUIC transport, and relay fallback. For fullstack developers exploring local-first architectures, decentralized backends, or IoT mesh networking, Iroh eliminates the hardest part of the stack — actually getting peers connected. The 8,900-star community and 886-point HN launch validate that the developer community has been waiting for this. If you're starting a new Rust project that needs peer-to-peer networking, Iroh should be your default choice. For Go or Python shops, watch the FFI binding ecosystem — it's coming.
