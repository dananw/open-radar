---
name: skylight
description: "Skylight is an open-source React app that projects real-time aircraft tracking onto your ceiling using RTL-SDR, with a live sky layer showing stars, moon, and ISS."
url: https://github.com/cpaczek/skylight
stars: 592
forks: 31
language: TypeScript
tags: ["react", "typescript", "rtl-sdr", "raspberry-pi", "real-time", "canvas", "iot"]
featured: false
publishedAt: 2026-06-04
---

## Skylight

### Overview

Skylight is an open-source React and TypeScript application that decodes ADS-B aircraft signals from a cheap RTL-SDR radio and projects the planes flying overhead onto your ceiling through a pointed-up projector. It hit 592 GitHub stars within 24 hours of its June 2, 2026 release, which is remarkable for a hardware-adjacent web project with no company backing.

The project is built by cpaczek, and the reference build centers on San Francisco International (SFO) — but it works anywhere you can set your coordinates and swap in local runway data. The core insight is deceptively simple: a jet you'd hear overhead glides across your ceiling at the same moment, labeled with its airline, aircraft type, and destination. The projector's rectangle disappears against a pure-black background, leaving only aircraft and stars illuminated.

What makes this more than a novelty is the technical depth. The app renders at 60 fps by interpolating the ~1 Hz ADS-B position fixes, tweening between real data points so planes glide smoothly rather than teleporting. It draws the real sky behind the aircraft — sun with accurate position, moon with phase, bright stars with constellation lines, and live satellites including the ISS computed from TLE orbital data. Every setting is tuneable from your phone over LAN, and the whole thing boots straight to a full-screen kiosk on a Raspberry Pi 5.

### Why it matters

This project sits at an interesting intersection for web developers. It's a real-time data visualization app built with React and TypeScript that renders to canvas, handles hardware input (RTL-SDR radio), runs on embedded devices (Raspberry Pi), and serves a mobile control panel over LAN. The technical patterns — interpolation for smooth animation, satellite position computation from orbital elements, responsive canvas rendering — transfer directly to serious frontend work.

The broader context is the growing "physical computing meets web" trend. More developers are building dashboards, visualizations, and control interfaces for IoT hardware using web technologies instead of native toolkits. Skylight demonstrates that React and TypeScript are viable for sub-second real-time rendering when you design the architecture correctly. It also shows how far you can get with commodity hardware: a $25 RTL-SDR dongle, a Raspberry Pi 5, and a $150 LED projector create an experience that feels like it should cost thousands.

### Key Features

**Real-Time Aircraft Rendering at 60fps.** ADS-B data arrives at roughly one position fix per second. Skylight interpolates between these fixes to render smooth motion at 60 frames per second, so aircraft glide across your ceiling instead of jumping between positions. The interpolation renders slightly in the past and tweens between known positions — a technique borrowed from game netcode that works perfectly here.

**Type-Aware Aircraft Glyphs.** Not all planes look the same. Widebodies render larger than regional jets. Helicopters spin their rotors. Turboprops and general aviation aircraft spin their props. The swept-wing glyph style is luminous against the black background, giving each aircraft type a distinct visual identity that you can recognize at a glance.

**Live Sky Layer with Astronomical Data.** Beyond aircraft, Skylight renders the actual sky: the sun at its real position, the moon with accurate phase, bright stars with constellation lines, and live satellites computed from Two-Line Element sets. You can scrub time forward and back from your phone, or jump straight to the next ISS pass. This transforms the project from a flight tracker into a planetarium ceiling.

**Phone-Controlled LAN Dashboard.** Every setting — rotation, theme, color palette, filters, sky toggles — is live-tunable from your phone over the local network. The control panel persists settings across reboots. No cloud service, no account, no app store download. Just open a browser on your phone while both devices are on the same network.

**Dual Data Source Architecture.** You can run Skylight with a local RTL-SDR radio for sub-second real-time data, or switch to a free web API with zero code changes. The API mode is perfect for trying the project without buying hardware — you'll see real aircraft over your configured location, just with slightly higher latency.

**Raspberry Pi Kiosk Mode.** The app boots straight to a full-screen kiosk on a Raspberry Pi 5. Set it up once, point a projector at your ceiling, and it runs continuously. The reference build uses the Pi 5's 8 GB model with active cooling for 24/7 operation. The pure-black background means even a cheap LED projector looks deep and immersive in a dim room.

**Airport and Route Visualization.** Runways are drawn at their true geographic position relative to your location, so you can watch departures and arrivals line up with the actual runway. Each routed flight shows its destination city, local time there, and miles-to-go, plus a faint great-circle arc toward where it's headed. It's a spatial understanding of air traffic that a radar screen can't give you.

### Use Cases

- **Living room ambient display** — Point a projector at your ceiling and watch real aircraft glide overhead while you work on the couch. The pure-black background means the projector rectangle disappears, leaving only illuminated aircraft and stars.
- **Aviation enthusiast installation** — For plane spotters who live near airports, Skylight gives real-time context to the sounds overhead. You can identify each aircraft by type, airline, and destination without checking a phone app.
- **Raspberry Pi project for learning real-time rendering** — The codebase demonstrates canvas rendering, interpolation, satellite orbit computation, and LAN-based device control. It's a complete, working project you can study and modify.
- **Hackerspace or maker lab demo** — The combination of RTL-SDR hardware, real-time web rendering, and projector output makes for an impressive demo at community events. Budget setup costs under $200 total.
- **Creative coding reference** — The comet trails, altitude-graded colors, range rings, and compass orientation demonstrate visual design patterns for real-time data visualization that apply to dashboards, monitoring tools, and data art.

### Pros and Cons

Pros:
- The interpolation architecture solves a real problem in real-time data visualization — how to make sparse data sources feel smooth — and does it cleanly enough to study as a reference implementation.
- The dual data source design (RTL-SDR local vs. web API) means you can try it immediately without hardware, then upgrade to sub-second local data when you're ready to invest $25.
- MIT licensed with 592 stars in the first 24 hours, suggesting strong community interest. The author is already planning a crowdfunding kit at skylightceiling.com.

Cons:
- Hardware dependency limits the audience — you need an RTL-SDR dongle, a Raspberry Pi, and a ceiling-mounted projector to get the full experience. The web API mode works but loses the real-time magic.
- The reference build is SFO-centric. While it works anywhere, swapping in local airport runway data requires manual configuration and understanding of ADS-B coverage in your area.
- No mobile app or PWA — the phone control panel is a web page served over LAN, which works but doesn't persist settings the way a native app would.

### Getting Started

```bash
# Clone the repository
git clone https://github.com/cpaczek/skylight.git
cd skylight

# Install dependencies
npm install

# Start the development server (uses web API by default — no hardware needed)
npm run dev

# Open in browser
# http://localhost:3000
```

For the full hardware setup, you'll need:
- An RTL-SDR Blog V4 with dipole antenna (~$25)
- A Raspberry Pi 5 (8 GB recommended) with active cooling
- A 1080p projector pointed at your ceiling (budget option: Yaber Buffalo Pro U9 at ~$150)
- A micro-HDMI to HDMI cable

Deploy to Raspberry Pi kiosk mode:

```bash
# Build for production
npm run build

# Follow the Pi kiosk setup in the README
# The app boots to full-screen automatically
```

### Alternatives

**FlightRadar24** — The dominant commercial flight tracking service with a web app and mobile apps. FlightRadar24 has vastly more coverage (global ADS-B network) and works without any hardware. But it's a commercial product with subscription tiers, and you're viewing a map — not watching planes cross your ceiling. Choose FlightRadar24 when you want comprehensive flight data; choose Skylight when you want an ambient, physical experience.

**dump1090** — The classic open-source ADS-B decoder that renders aircraft positions on a web-based map. dump1090 is the foundation most flight tracking projects build on, and it's what Skylight uses under the hood for signal decoding. But dump1090 gives you a utilitarian map view, not a ceiling projection with sky rendering and smooth animation. Choose dump1090 when you need raw ADS-B data; choose Skylight when you want it transformed into something beautiful.

**Virtual Sky** — A JavaScript library for rendering interactive sky maps in the browser. Virtual Sky handles the astronomical rendering (stars, constellations, planets) that Skylight's sky layer implements. If you only want the planetarium effect without aircraft tracking, Virtual Sky is more focused. But it doesn't integrate ADS-B data or real-time aircraft rendering.

### Verdict

Skylight is one of those projects that makes you rethink what web technologies can do. The combination of React, TypeScript, and canvas rendering achieving smooth 60fps animation from 1Hz sensor data is technically impressive, and the end result — planes gliding across your ceiling with stars behind them — is genuinely magical. It's not a developer tool in the traditional sense, but the patterns it demonstrates (real-time interpolation, hardware integration, LAN device control, embedded deployment) are directly applicable to serious frontend and IoT work. The 592 stars in 24 hours reflect that dual appeal: it's both a fun project to build and a technically interesting codebase to study. If you have a Raspberry Pi and a projector gathering dust, this is the project that justifies pulling them out.
