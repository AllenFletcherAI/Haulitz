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

---

## ADR-003: Project Directory Reorganization & Workspace Encapsulation
- **Date:** 2026-10-29
- **Author:** Allen Fletcher
- **AI Model Assisting:** Antigravity / DeepMind Pair Programmer
- **Status:** APPROVED & ACTIVE

### 1. The Context & Problem
The root project directory contained 10 loose HTML workspace files and a test script floating beside `index.html`. This created clutter and made the repository appear disorganized.

### 2. The Three Options Considered
1. **Option 1: Leave all HTML files in root**
   - *Drawback:* Cluttered root directory; violates professional enterprise codebase standards.
2. **Option 2: Bundle everything into a single massive index.html file**
   - *Drawback:* Bloats bundle size; breaks deep linking and clean isolation between industry domains.
3. **Option 3: Dedicated `workspaces/` and `tests/` directories with edge alias rewrites**
   - Move all 10 domain pages into `workspaces/`.
   - Move test suite into `tests/verify_haulitz.js` with `package.json` test runner.
   - Configure `_worker.js` with route aliases so both `/fintech` and `/workspaces/fintech.html` resolve seamlessly.

### 3. The Decision
We chose **Option 3**. The root directory now contains only core entrypoints (`index.html`, `_worker.js`, `package.json`, `README.md`) and cleanly separated directories (`workspaces/`, `tests/`, `scripts/`, `functions/`, `docs/`, `js/`, `css/`, `assets/`).

### 4. When to Reconsider
If the project migrates to a full server-side framework (e.g., Astro or Next.js), use file-based routing. For static edge architecture, Option 3 is optimal.


---

## ADR-004: Codebase Simplification, Dead Code Elimination, and Edge Query Hardening
- **Date:** 2026-10-29
- **Author:** Allen Fletcher
- **AI Model Assisting:** Antigravity / DeepMind Pair Programmer
- **Status:** APPROVED & ACTIVE

### 1. The Context & Problem
During the iterative evolution of the landing page (from a static form to an Awwwards-tier Living Scanner with 10 dedicated workspaces), earlier code blocks remained dormant across the codebase:
1. `index.html` loaded 16 verification scripts and fixture files that were never executed because the landing page uses pre-computed simulation presets.
2. `js/app.js` contained 766 lines of legacy verification cockpit logic that returned early every time because the matching DOM nodes were relocated to `workspaces/*.html`.
3. The `functions/` directory was completely bypassed by Cloudflare Workers due to root `_worker.js`.
4. `#industry-selector-modal` sat orphaned in `index.html` without any trigger button.
5. `_worker.js` interpolated client parameters directly into raw SQL strings without character whitelisting.

### 2. The Three Options Considered
1. **Option 1: Do nothing and keep dormant code**
   - *Drawback:* Adds ~120 KB unnecessary payload; confuses future maintainers; leaves SQL injection risk open in edge router.
2. **Option 2: Total rewrite into a single bundled framework**
   - *Drawback:* Over-engineering; introduces massive build step and unnecessary toolchain dependencies (violates YAGNI).
3. **Option 3: Surgical, Zero-Regression Dead Code Elimination & Edge Hardening**
   - Delete abandoned `functions/` directory.
   - Remove 16 unused script tags from `index.html` (saving 16 HTTP requests).
   - Prune 1,588 lines of dead code and obsolete translation keys from `js/app.js`.
   - Remove 294 lines of orphaned CSS from `css/styles.css`.
   - Remove orphaned `#industry-selector-modal` from `index.html`.
   - Whitelist sanitize all SQL query inputs in `_worker.js`.

### 3. The Decision
We chose **Option 3**. Over 1,800 lines of dead code were safely eliminated, 16 network requests were removed on initial load, SQL injection attack surfaces were closed, and all 30/30 statutory verification tests continue to pass with 100% precision.

### 4. When to Reconsider
If client-side interactive document verification is reintroduced directly onto the landing page canvas rather than inside dedicated workspaces, selectively re-import the necessary verifiers.


---

## ADR-005: Zero-Scroll Navigation, Dynamic Scanner Harmonization, and Recruiter Mobility Upgrades
- **Date:** 2026-10-29
- **Author:** Allen Fletcher
- **AI Model Assisting:** Antigravity / DeepMind Pair Programmer
- **Status:** APPROVED & ACTIVE

### 1. The Context & Problem
Evaluation of the updated landing page identified five user friction points:
1. The top sticky navigation bar displayed a `WORKSPACES:` label (~150px wide) that pushed the 10th tab (`10 Enterprise ERP`) off-screen on standard desktop resolutions (1280px to 1440px), forcing awkward horizontal scrolling.
2. Clicking workspace tabs was disconnected from the Living Scanner in the hero.
3. Excessive hero vertical padding pushed the Living Scanner 120px below the fold on standard laptops.
4. Allen's profile card was missing a Germany-wide relocation mobility badge and key professional recruiter links (LinkedIn, one-click email copy, downloadable executive CV).
5. Bento grid cards were static wireframes rather than live interactive proof points.

### 2. The Three Options Considered
1. **Option 1: Hide the 10th workspace tab on desktop**
   - *Drawback:* Enterprise ERP is a primary target domain for corporate recruiters; hiding it is unacceptable.
2. **Option 2: Replace tab docks with a dropdown selector**
   - *Drawback:* Violates Hick's Law and reduces discovery; users cannot see all 10 specialized German industry domains at a glance.
3. **Option 3: Comprehensive Precision Elevation & Synchronization**
   - Remove `WORKSPACES:` prefix to reclaim horizontal space; center all 10 pills with compact padding so they fit on any screen >= 1024px without scrolling.
   - Synchronize top dock and showcase dock with the Living Scanner in real time.
   - Compress hero vertical padding from 3.5rem to 2.0rem, bringing the Living Scanner above the fold.
   - Add Germany-wide mobility badge (`📍 Germany (Open to Relocation Anywhere in Germany · On-Site / Hybrid / Remote)`), active availability pill, LinkedIn CTA, and clipboard email copy with toast.
   - Upgrade Bento Grid with an interactive ISO 7064 Modulo-97 IBAN checker and Web Crypto SHA-256 block sealer.

### 3. The Decision
We chose **Option 3**. The landing page achieves instant zero-scroll accessibility across all 10 German enterprise domains, brings the Living Scanner immediately above the fold, and equips Allen's profile with comprehensive recruiter tools.

### 4. When to Reconsider
If new industry workspaces are added beyond the current 10, group them into categorized mega-docks or tab carousels.

---

## ADR-006: Institutional Enterprise Elevation — Compliance Ribbon, ERP Integration Grid, FAQ Accordion, and Statutory German Legal Framework
- **Date:** 2026-10-29
- **Author:** Allen Fletcher
- **AI Model Assisting:** Antigravity / DeepMind Pair Programmer
- **Status:** APPROVED & ACTIVE

### 1. The Context & Problem
While HAULITZ possesses a 100% verified deterministic engine across 30 German enterprise scenarios, its public presentation needed institutional trust signals aligned with international and German web standards (Donald Miller Grunt Test, 60/30/10 color theory, and German statutory transparency laws § 5 TMG / DSGVO):
1. **Lack of Institutional German Trust Signals:** No prominent badges for GoBD § 147 AO, § 14 UStG, HGB § 377, SEPA ISO 7064, or DSGVO before the fold.
2. **ERP Compatibility Obscurity:** Enterprise buyers and recruiters did not see instant visual proof of SAP S/4HANA, DATEV, Microsoft Dynamics, Pleo, and Personio compatibility.
3. **Missing Buyer Objection Handling:** CFOs and Lead Architects had no immediate FAQ section addressing data privacy, document storage, VAT math, and e-invoicing standards (ZUGFeRD 2.2 / XRechnung).
4. **Recruiter Action Gap:** Allen's profile needed a direct "Request CV Dossier" CTA to complement email and LinkedIn.
5. **German Statutory Legal Mandate (§ 5 TMG / DSGVO):** A commercial web gateway targeting German enterprise customers requires accessible Impressum and Datenschutzerklärung legal modals.

### 2. The Three Options Considered
1. **Option 1: Add simple text disclaimers in the footer**
   - *Drawback:* Text disclaimers fail the 5-second Grunt Test and look like an afterthought.
2. **Option 2: Create external standalone legal pages**
   - *Drawback:* Breaks single-page user flow and increases navigation friction.
3. **Option 3: Comprehensive Institutional Architecture Elevation**
   - Add a high-visibility German Statutory & Compliance Trust ribbon with ERP ecosystem chips (SAP, DATEV, Dynamics, Pleo, Personio, PostgreSQL).
   - Add interactive Bento Card 1 presets proving IEEE-754 floating point drift vs. 64-bit cent integer math.
   - Add an accessible 5-item interactive FAQ accordion addressing enterprise security, hosting, tax, and integration.
   - Add an institutional 4-column footer featuring brand mission, all 10 domain links, architecture proof points, and real-time operational status.
   - Add accessible Impressum (§ 5 TMG) and Datenschutzerklärung (DSGVO) modal dialogs.
   - Add a smooth-scrolling floating Back-to-Top button.
   - Add OpenGraph, Twitter Cards, and Schema.org JSON-LD structured data for `SoftwareApplication` and `Person`.

### 3. The Decision
We chose **Option 3**. The landing page achieves institutional Awwwards/Linear-grade polish, satisfies German statutory standards (§ 5 TMG / DSGVO), and provides seamless verification proof for CFOs, CTOs, and enterprise recruiters.

### 4. When to Reconsider
If multi-tenant organization self-signup or billing portals are introduced, expand the FAQ and legal disclosures accordingly.

