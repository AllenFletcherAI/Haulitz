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
