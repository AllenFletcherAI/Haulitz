# Project Decisions Log (Haulitz)
Standard: ASD-STE100 Simplified Technical English · Habit 02

## ADR-001: Pure Client-Side Edge Architecture vs. Container Backends
- **Date:** 2026-10-28
- **Author:** Allen Fletcher
- **AI Model Assisting:** Gemini 3.8 Flash (High)
- **Status:** APPROVED & ACTIVE

### 1. The Context & Problem
We need to present Haulitz to German enterprise hiring managers and technical directors (DB Schenker, Pleo, Siemens, Allianz, Doctolib). A recruiter spends 20 to 45 seconds on a portfolio. If a portfolio takes 60 seconds to wake up from sleep or shows an HTTP 502 error, the hiring manager leaves immediately.

### 2. The Three Options Considered
1. **Option 1: Free Container Host (Render / Railway / Fly.io)**
   - *Cost:* $0/month.
   - *Drawback:* Container goes to sleep after 15 minutes. Cold-start delay is 50 to 90 seconds. Unreliable under recruiter traffic.
2. **Option 2: Dedicated Cloud VPS (Hetzner / AWS EC2)**
   - *Cost:* €5 to €15/month recurring.
   - *Drawback:* Violates the strict $0 out-of-pocket constraint. Requires ongoing Linux OS kernel updates, firewall maintenance, and SSL renewal.
3. **Option 3: Global Edge Static Application on Cloudflare Pages (`haulitz.pages.dev`)**
   - *Cost:* $0/month forever.
   - *Latency:* < 30 ms in Frankfurt, Munich, Berlin, and Zurich.
   - *Reliability:* 100% uptime, zero cold starts, zero server maintenance. Core verification algorithms (ISO 6346 Modulo-11, VAT arithmetic, 3-way reconciliation, SHA-256 seal chaining) execute 100% deterministically in the client browser runtime.

### 3. The Decision
We chose **Option 3: Cloudflare Pages Edge Deployment**. All verification algorithms run in modular client JavaScript with pre-cached canonical enterprise test fixtures. Recruiters test real mathematical and legal verification rules in one click without waiting for server wakeups or uploading local files.

### 4. When to Reconsider
If customers require private on-premise relational database synchronization behind corporate firewalls with real SAP NetWeaver RFC connectors, build an optional sovereign microservice container. For the public evaluation portal, Option 3 remains permanent.


---

## ADR-002: Luxury Obsidian Design System & Interactive Discrepancy Inspector
- **Date:** 2026-10-29
- **Author:** Allen Fletcher
- **AI Model Assisting:** Antigravity / DeepMind Pair Programmer
- **Status:** APPROVED & ACTIVE

### 1. The Context & Problem
Screen feedback revealed that a repeating 32px coordinate grid gave the interface the look of a student math workbook rather than enterprise B2B SaaS. In addition, a sticky quick-switch pill floating at the bottom center occluded key content in pipeline step 02 and covered the founder's direct contact links. Text subtitles also suffered from partial German translation leakage ("Denglish") in English mode.

### 2. The Three Options Considered
1. **Option 1: Minimal text edits only**
   - *Drawback:* Leaves the coordinate grid and floating pill in place; page remains cluttered and covers core UI elements.
2. **Option 2: Shift floating switcher to a side dock**
   - *Drawback:* Competes with mobile viewports and adds visual noise; redundant with top navbar and top workspaces grid.
3. **Option 3: Complete Luxury Elevation & Intentional Layout**
   - Eradicate floating obstruction pill completely (rely on top navbar `Ctrl+K` command palette and prominent top 10 workspaces section).
   - Replace harsh coordinate grid with luxury obsidian radial illumination.
   - Implement an interactive Before/After Discrepancy Inspector widget ("Show, Don't Just Tell").
   - 100% complete bilingual isolation across all telemetry, pipeline tags, and card metadata.
   - Refactor founder presentation into a crisp 3-pillar executive format (The Problem, The Technical Bridge, The Qualifications).

### 3. The Decision
We chose **Option 3**. The resulting interface delivers zero content occlusion, specular glassmorphism, instant interactive proof of deterministic verification, and 100% linguistic purity.

### 4. When to Reconsider
If user telemetry shows high demand for persistent navigation on ultrawide monitors, implement an unobtrusive top-bar breadcrumb rather than a floating viewport obstruction.
