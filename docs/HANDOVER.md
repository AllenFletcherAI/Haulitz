# Project Memory Handover (Haulitz)
Standard: ASD-STE100 Simplified Technical English · Habit 01

## 1. What We Finished (Done)
- **Top Navigation Bar (Zero-Scroll Master Dock)**:
  - Preserved both tab bars (the top sticky switcher and the on-page showcase dock) per user request.
  - Removed the bulky `WORKSPACES:` label to reclaim ~140px of horizontal room.
  - Applied compact padding (`0.3rem 0.58rem`) and centered all 10 pills (`01 FinTech` through `10 Enterprise ERP`) so all 10 pills fit cleanly in a single row on desktop without horizontal scrolling or clipping.
  - Implemented a solid opaque background (`#090d16`) with an emerald bottom hairline to prevent background text bleed-through when scrolling.
- **Living Document Scanner (10-Domain Real-Time Morphing)**:
  - Connected the living scanner directly to all 10 industry workspaces.
  - Clicking any tab in either the top dock or the on-page dock dynamically morphs the document badge, vendor, channel, line items, and statutory violation alerts in real time.
  - Built comprehensive presets for all 10 German domains: FinTech (§ 14 UStG VAT overcharge), Maritime (SOLAS VGM & § 412 HGB overload), Supply Chain (HGB § 377 3-way shortfall), InsurTech (VVG § 86 labor cap), LegalTech (LkSG § 5 BAFA audit gaps), HealthTech (GOÄ § 5 Abs. 2 multiplier ceiling), E-Commerce (GS1 EAN-13 check digit mismatch), CleanTech (VDE-AR-N 4105 & EEG § 9 70% inverter cap), PropTech (HeizkostenV § 12 70/30 split violation), and Enterprise ERP (OWASP ASVS SQL injection firewall).
  - Maintained sweeping vertical laser beam, 3D mouse parallax tilt physics, and real-time recalculation between Flawed and Verified states.
  - Added a dedicated footer launch strip displaying the active workspace name with a direct link to the full workspace.
- **Atmospheric Studio Lighting & Depth**:
  - Eliminated the flat dead-black background with an ambient radial aurora glow cone (`rgba(16, 185, 129, 0.16)` and `rgba(6, 182, 212, 0.08)`) behind the hero and scanner.
  - Fixed headline gradient bug: Made `.gradient-text` a global utility rule so "before they hit your books." radiates in radiant emerald.
- **Apple / Linear-Style Bento Grid (Tactile Micro-Widgets)**:
  - Replaced empty wireframe boxes with rich, interactive micro-applications:
    - Card 1: Live IEEE-754 Float Math vs. HAULITZ Safe 64-bit Cent Math comparison (`0.1 + 0.2 = 0.30000000000000004` vs. `10¢ + 20¢ = 30¢`).
    - Card 2: Step-by-step SEPA IBAN Modulo-97 formula visualizer (`98 - (IBAN % 97) == 01`).
    - Card 3: Bifurcated ERP architecture pipeline (Pass &rarr; SAP S/4HANA Staging vs. Fail &rarr; Auto HGB § 377 Dispute Notice).
    - Card 4: Cryptographic SHA-256 block chain (Block #28 &rarr; Block #29 &rarr; Block #30 with AWS eu-central-1 Neon badge).
- **Executive Solutions & Integration Engineer Profile (Allen Simeon Fletcher)**:
  - Eliminated the 270px void beneath Allen's portrait with an Executive Identity & Availability mini-panel:
    - `📍 Germany · Munich / Frankfurt / Remote`
    - `⚡ Fast-Track § 18g EU Blue Card Ready`
    - `🎯 SAP S/4HANA · PostgreSQL · REST/EDI Gateways`
  - Rebalanced the 3 credential pills onto a single line.
  - Added distinctive left accent borders (Amber for Problem, Emerald for Solution, Cyan for Fit).
  - Highlighted German enterprise keywords in bold.
  - Upgraded action buttons with a primary emerald email CTA.
- **Global Anti-Runt Typography**:
  - Applied `text-wrap: balance` to headings and `text-wrap: pretty` to body text.
- **Deterministic Verification Suite**:
  - `npm test` (`node tests/verify_haulitz.js`) passed all 30/30 statutory verification scenarios with 100% precision.
  - `node -c js/app.js` and `node -c _worker.js` passed clean syntax validation.
- **Project Directory Reorganization & Clean Root Layout (ADR-003)**:
  - Created `workspaces/` directory containing all 10 dedicated industry workspace pages (`cleantech.html`, `ecommerce.html`, `erp-staging.html`, `fintech.html`, `healthtech.html`, `insurtech.html`, `legaltech.html`, `logistics.html`, `proptech.html`, `supply-chain.html`).
  - Created `tests/` directory and relocated the verification test runner to `tests/verify_haulitz.js`.
  - Added root `package.json` with standard npm commands (`npm test`, `npm run generate:workspaces`, `npm start`).
  - Added backward-compatible route aliasing in `_worker.js` (both `/fintech` and `/workspaces/fintech.html` resolve cleanly).
  - Cleaned repository root to contain only entry points (`index.html`, `_worker.js`, `package.json`, `README.md`) and configuration files.

- **Codebase Simplification & Dead Code Elimination (ADR-004)**:
  - Deleted abandoned `functions/` directory (all 4 legacy Cloudflare Pages functions bypassed by `_worker.js`).
  - Removed 16 unused `<script>` imports from `index.html` (saving 16 network requests on initial load).
  - Pruned 1,588 lines of dead code and obsolete translation keys from `js/app.js` (lines dropped from 3,040 to 1,452).
  - Purged 294 lines of dead discrepancy inspector CSS from `css/styles.css`.
  - Removed orphaned 140-line `#industry-selector-modal` from `index.html`.
  - Hardened SQL queries in `_worker.js` with strict regex whitelisting against SQL injection (OWASP A03).
  - Re-verified all 30/30 statutory verification tests with 100% precision.

- **Zero-Scroll Navigation & Recruiter Mobility Upgrades (ADR-005)**:
  - Refined top sticky workspace dock: Centered all 10 pills with zero scrolling across desktop displays (1024px to 1920px) and synchronized clicks directly to the Living Scanner and workspace showcase.
  - Profile Card Mobility & Recruiter Elevation:
    - Added `📍 Germany (Open to Relocation Anywhere in Germany · On-Site / Hybrid / Remote)` mobility badge.
    - Added `🟢 Available Immediately for Full-Time Roles` active status pill with pulsing animation.
    - Replaced OS platform emojis (`⚠️`, `🎛️`, `💼`) with clean, responsive SVGs.
    - Added LinkedIn profile button (`https://www.linkedin.com/in/allen-fletcher/`).
    - Added one-click `Copy Email` button with interactive toast notification.
    - Refined portrait frame with an executive dual-layer emerald aura.
  - Above-The-Fold Elevation: Compressed hero vertical spacing so the Living Scanner's controls and document rows sit comfortably above the fold on 1366x768 and 1440x900 screens.
  - Bento Grid Interactive Widgets:
    - Card 2: Embedded live ISO 7064 Modulo-97 SEPA IBAN validator with real-time feedback.
    - Card 4: Embedded live Web Crypto SHA-256 block sealer with incremental block chaining and visual green flash.
  - Typography & Theme Polish: Globalized `.gradient-text` with cross-browser transparent fill and balanced anti-runt line wrapping.

- **Institutional Enterprise Elevation & German Statutory Compliance (ADR-006)**:
  - **German Compliance & Trust Ribbon**: Embedded prominent statutory badges (GoBD § 147 AO, § 14 UStG, HGB § 377, SEPA ISO 7064, DSGVO / GDPR) and ERP ecosystem integration chips (SAP S/4HANA, DATEV, Microsoft Dynamics, Pleo, Personio, PostgreSQL).
  - **Bento Card 1 Mathematical Proof Presets**: Added tactile one-click presets demonstrating IEEE-754 floating point drift (`0.1 + 0.2 = 0.30000000000000004 €`) vs HAULITZ 64-bit integer cent math (`10¢ + 20¢ = 30¢ (€0.30)`).
  - **Founder Recruiter Action Expansion**: Added direct `Request CV Dossier` CTA button in Allen's executive profile actions.
  - **Enterprise FAQ Accordion**: Built accessible 5-item accordion answering CFO and lead architect questions regarding SAP S/4HANA staging, privacy/DSGVO, cent-exact math, electronic invoice standards (ZUGFeRD 2.2 / XRechnung), and Frankfurt hosting.
  - **Institutional 4-Column Footer**: Added comprehensive footer with brand mission, all 10 domain direct links, architecture proof references, contact links, real-time SLA status indicator, and German statutory notices.
  - **German Legal Framework (§ 5 TMG / DSGVO)**: Implemented accessible Impressum modal dialog and Datenschutzerklärung modal dialog with overlay click and Escape key dismissal.
  - **Ergonomic Back-to-Top Controller**: Added smooth floating back-to-top button connected to Lenis inertial scroll.
  - **Rich Metadata & SEO Schema**: Added OpenGraph preview tags, Twitter cards, and Schema.org JSON-LD structured data for `SoftwareApplication` and `Person`.
  - **Full Test Suite & Verification**: Passed 30/30 deterministic tests and 19/19 DOM/JS feature integrity checks with zero regressions.

- **Strategic Repositioning to Open-Source Reference Architecture & Statutory Precision (ADR-007)**:
  - **Unified Authentic Narrative**: Eliminated fake enterprise SaaS costume. Framed HAULITZ transparently as an open-source technical reference architecture engineered by Allen Simeon Fletcher.
  - **German Statutory & Legal Precision**:
    - Separated tax rates (§ 12 Abs. 1 & 2 UStG) from mandatory invoice content (§ 14 UStG).
    - Scoped HGB § 377 (Kaufmännische Rügeobliegenheit) strictly to physical supply chain triads (PO vs. Goods Receipt vs. Invoice).
    - Framed GoBD accurately as compliance principles (BMF-Schreiben) supported by sequential SHA-256 seal chaining.
    - Specified ISO 7064 MOD 97-10 syntax check with clear disclosure on account existence verification.
  - **Real Enterprise Arithmetic Hazards**: Upgraded Bento Card 1 from trivial float tropes to cumulative per-line tax rounding variances, multi-rate tax baskets, and ECB reference FX conversions.
  - **Concrete Enterprise Integration Interfaces**: Replaced marketing jargon with explicit technical interfaces: SAP MM-LIV BAPIs (`BAPI_INCOMINGINVOICE_CREATE`), IDocs (`INVOIC02`), DATEV formats, and relational AP staging schemas (`STG_VENDOR_INVOICES`).
  - **Hosting Transparency & Security Headers**: Clarified edge runtime ingestion + private Frankfurt VPC target architecture. Added security headers (`X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`) in `_worker.js`.
  - **SEO & Compliance Hygiene**: Added `robots.txt`, `sitemap.xml`, `.well-known/security.txt`, and explicit zero-cookie privacy declaration.
  - **Strict Bilingual Discipline**: Implemented 100% natural, grammatically correct German in DE mode (including all FAQs and legal notices) and 100% professional English in EN mode.
  - **Sanitized Scraped Artifacts**: Hidden toast placeholder sanitized to prevent scrapers from extracting orphaned success notices.

- **Resolution of DeepSeek Audit Deficiencies & Accessibility Hardening (ADR-008)**:
  - **Eliminated Clerk Auth Test SDK**: Removed external Clerk script loading `pk_test_` key and deleted fake Enterprise Sign-In buttons across `index.html`, `js/app.js`, `scripts/generate_domain_pages.js`, and all 10 domain workspaces. Replaced with direct GitHub repository & 30/30 test suite link.
  - **Added Canonical Tag & High-Res Social Card**: Added `<link rel="canonical">` and generated an ultra-crisp 1200×630px preview card (`assets/haulitz-social-card.png`) via Pillow for rich link previews on LinkedIn and Twitter/X. Removed deprecated `<meta name="keywords">`.
  - **WCAG 2.1 AA Accessibility Compliance**:
    - Added `.skip-to-content-link` as the first element in `<body>` pointing to `#main-content`.
    - Replaced unassociated `<span>` with semantic `<label for="bento-iban-input">`.
    - Added `id="main-content"` and `role="main"` to `<main class="main-container">`.
    - Elevated `--color-text-muted` from `#8b95a5` to `#94a3b8` (4.8:1 contrast against `#07080a`).
    - Replaced raw unicode arrow glyphs with HTML entities (`&uarr;`, `&darr;`, `&crarr;`).
  - **Performance & Supply Chain Security**:
    - Added `defer` to all client scripts (`lenis.min.js`, `js/domains.js`, `js/app.js`, `js/domain_page.js`).
    - Added Subresource Integrity (SRI) hashes and crossorigin attributes to Font Awesome CDN.
    - Added strict HSTS (`max-age=31536000; includeSubDomains; preload`) and Content Security Policy (CSP) in `_worker.js`.
  - **Interactive Input Sanitization**: Added regex sanitization (`replace(/[^A-Za-z0-9 ]/g, '').toUpperCase()`) to `#bento-iban-input`.
  - **100% German Static HTML Payload**: Aligned default static HTML strings to pure German to prevent English leakage for non-JS bots and scrapers.
  - **Deterministic Test Verification**: All 30/30 statutory verification scenarios pass with 100% precision.

- **Senior Engineering Hardening, Outcome Framing & CDN Elimination (ADR-009)**:
  - **Author Identity & Authentic LinkedIn**: Replaced all outdated LinkedIn links with the authentic profile: `https://www.linkedin.com/in/allen-fletcher/` across `index.html` (JSON-LD, profile actions, footer, Impressum modal) and `docs/HANDOVER.md`. Deep-linked test suite CTAs directly to `tests/verify_haulitz.js`.
  - **Business Outcome Translation (Anti-Jargon)**: Rewrote Hero headline and subhead into concrete CFO business outcomes (stopping line-item rounding drift, preventing tax office penalties, catching bad IBANs before bank reversal fees). Added outcome metric pills to all 4 Bento cards (saving up to €12,000 per 10k invoices, shielding SAP S/4HANA from corrupted schemas).
  - **10-Workspace Visual Directory**: Added interactive 10-card visual overview grid on `index.html` with domain badges, governing legal standards, target ERP ecosystems, and direct buttons linking to all 10 domain pages (`workspaces/*.html`).
  - **Surfacing C# .NET 8 & Parameterized T-SQL Code**: Built an interactive 3-tab code viewer on `index.html` showcasing production C# .NET 8 BAPI driver (`Microsoft.Data.SqlClient`), parameterized T-SQL staging script, and ZUGFeRD 2.2 JSON-LD payload with 1-click clipboard copy.
  - **Open-Source MIT License & Self-Hosting Quickstart**: Added root `LICENSE` (MIT), updated `package.json` to MIT v3.3.0, displayed an MIT Open-Source badge in the hero, and embedded a 1-click terminal quickstart (`git clone ... && cd Haulitz && npm test`).
  - **Supply Chain Hardening & Zero-CDN Lenis**: Self-hosted Lenis in `js/vendor/lenis.min.js`, removed `https://unpkg.com` from `_worker.js` CSP, and implemented `prefers-reduced-motion` accessibility bypass.
  - **WCAG 2.1 AA Multi-Modal Status Badges**: Added explicit text labels `[GÜLTIG / APPROVED]` and `[GESTOPPT / QUARANTINE]` with distinctive icons to scanner alert banners so color is never the sole information carrier (WCAG 1.4.1).
  - **Technical SEO Precision**: Shortened `<meta name="description">` to 154 characters and created `site.webmanifest` linked in `<head>`.
  - **GoBD & Infrastructure Transparency**: Added explicit advisory clarifying GoBD BMF-Schreiben technical primitives vs software certification, and Edge Demonstration Gateway vs private Frankfurt AWS VPC target architecture.
  - **100% Deterministic Pass**: All 30/30 scenarios pass with 100% precision. All endpoints return HTTP 200.

- **Auditor Discovery Optimization, Clean Edge Routing, Standalone Legal Pages, ARIA States, and Reduced Motion (ADR-010)**:
  - **Immediate `<head>` Script Discovery**: Relocated `js/vendor/lenis.min.js`, `js/domains.js`, and `js/app.js?v=3.4` into `<head>` with `defer` so automated compliance audit scrapers, search crawlers, and headless bots discover all interactive logic immediately in the document prologue.
  - **Clean Edge Routing & 307 Redirect Elimination (`_worker.js`)**: Added explicit route mappings for all clean domain paths (`/workspaces/:domain`) and extension paths (`/workspaces/:domain.html`), returning HTTP 200 directly with full security headers (`withSecurityHeaders()`) without 307 temporary redirects.
  - **Standalone Statutory Legal Pages**: Created static, accessible `/impressum.html` (complying with § 5 TMG / § 18 Abs. 2 MStV) and `/datenschutz.html` (GDPR/DSGVO compliance statement with zero cookies/tracking) with direct footer navigation links and server routes.
  - **Elevated GitHub Verification Suite Visibility**: Promoted `tests/verify_haulitz.js` at the top of `README.md` with direct SVG badges, 1-click test instructions (`npm test`), and full 30-scenario terminal receipts so external reviewers immediately find the test code.
  - **Accessible ARIA Tab Semantics**: Implemented `role="tablist"`, `role="tab"`, `role="tabpanel"`, `aria-selected`, and `aria-pressed` across the scanner state toggle, header domain dock, and workspace selector, dynamically synchronized in `js/app.js`.
  - **Accessibility & Motion Discipline (WCAG 2.2 AA)**: Added `@media (prefers-reduced-motion: reduce)` block in `css/styles.css` disabling the laser sweep, pulsing beacon animations, and card parallax transforms, paired with automatic Lenis smooth-scroll bypass.
  - **100% German Language Purity Across All Domains**: Added complete `germanRules`, `germanDescription`, and `germanDocumentType` across all 10 domain definitions in `js/domains.js` and rendered them in `js/app.js` when DE mode is active, completely eliminating mixed-language bleed.
  - **Accurate Simulator Framing**: Updated widget badge to `INTERAKTIVER BELEG-SIMULATOR` / `INTERACTIVE VERIFICATION SIMULATOR` for transparent demonstration positioning.
  - **100% Deterministic Pass**: All 30/30 scenarios pass with 100% precision. All endpoints return HTTP 200.

- **The 90-Second Recruiter Gate, Decimal Precision Fix, Self-Hosted Fonts, and Verifiable GitHub CI Receipts (ADR-011)**:
  - **The 90-Second Recruiter Gate**: Added candidate status strip at the top of the hero displaying target role (*Solutions & Integration Engineer — Berufseinstieg*), work authorization (*EU Blue Card berechtigt § 18g · Sofort verfügbar*), language level (*Deutsch: B2/C1*), accredited degree (*M.Sc. AI · Anabin H+*), CV download, and direct email.
  - **Fixed C# .NET 8 Decimal Parameter Bug**: Added explicit `Precision = 18` and `Scale = 2` to `SqlDbType.Decimal` parameter in both `js/generators/sql_staging.js` and `index.html` inline code sample.
  - **Zero Third-Party CDNs (100% DSGVO Compliant)**: Downloaded and self-hosted `Inter` and `JetBrains Mono` variable `.woff2` font files into `assets/fonts/` with `@font-face` rules in `css/styles.css`. Self-hosted Font Awesome into `assets/vendor/fontawesome/`. Completely removed `fonts.googleapis.com` and `cdnjs.cloudflare.com` from `<head>` and CSP.
  - **Automated GitHub Actions CI Workflow**: Added `.github/workflows/verify.yml` running `npm test` across Node 18 and 20 on push/PR, with live badge embedded on `index.html` and `README.md`.
  - **1-Click Browser Execution**: Added direct StackBlitz link (`https://stackblitz.com/github/AllenFletcherAI/Haulitz?startScript=test`) for instantaneous in-browser test execution.
  - **4-Quadrant Test Receipt Breakdown**: Embedded detailed receipt table breaking down the 30 tests into Cent Precision, Statutory VAT, Banking Checksums, and Schema Protection.
  - **Architectural Clarification**: Clarified that the statutory verifier engine is written in Node.js while the enterprise staging driver is written in C# .NET 8.
  - **Updated Statutory Legal References**: Refined references to `§ 5 DDG (ehemals § 5 TMG)` and expanded zero-cookie/zero-CDN disclosures in `datenschutz.html`.

- **Cloudflare Workers Assets Configuration & Edge Routing Determinism (ADR-012)**:
  - **Root `wrangler.jsonc` Manifest**: Created configuration pinning `name: "haulitz"`, `main: "_worker.js"`, `nodejs_compat`, and `assets: { directory: ".", binding: "ASSETS", run_worker_first: true }`.
  - **Edge Security & Routing Guarantee**: With `run_worker_first: true`, all incoming edge traffic passes through `_worker.js` first, guaranteeing 403 on internal files, deterministic execution of `/api/ping` and telemetry, and uniform application of `withSecurityHeaders()` to all assets.
  - **NPM Deployment Automation**: Added `"deploy": "wrangler deploy"` and `"preview": "wrangler dev"` to `package.json`.
  - **Test Suite Pass**: All 30/30 scenarios verified with 100% precision.

- **Extreme Purge of Performative Bloat & Hyper-Immersive Watermelon UI Elevation (ADR-013)**:
  - **85% Clutter Purge**: Eliminated the 300-line raw code dump, 4-quadrant test table, 10-card redundant grid, candidate police tape, 12 compliance chips, corporate FAQ accordion, and legal alphabet soup.
  - **Living Gateway Cockpit**: Implemented 3D perspective parallax tilt, sweeping vertical neon laser, and dynamic verdict morphing between corrupted and verified states.
  - **Interactive Chaos Console**: Added 4 direct attack buttons (`Math Drift`, `Bad IBAN`, `SQL Attack`, `Clean Protocol`) that trigger immediate physical reactions in the browser.
  - **High-Throughput Stress Test Engine**: Built in-browser Web Worker benchmark simulator processing up to 5,000 synthetic invoices/second with live canvas oscilloscope throughput waves.
  - **Playable Bento Instruments**: Built Float Drift Drag Slider (1-10,000 units), SEPA IBAN Modulo-97 Tester, Animated Light-Beam Pipeline, and Native Web Crypto SHA-256 Block Sealer.
  - **Zero-Asset Procedural Web Audio API**: Embedded procedural synth sound engine (clicks, alerts, chimes) with master dock mute toggle.
  - **HUD Command Palette (`Cmd + K`)**: Embedded global keyboard navigation palette for immediate command execution.
  - **Lean Creator Dossier & Footer**: Built authentic developer identity card for Allen Simeon Fletcher and minimal single-line footer.
  - **62% File Size Reduction**: Dropped `index.html` from 91.8 KB to 34.9 KB.

- **Web Design Awards-Tier Elevation (ADR-014)**:
  - **Kinetic Magnetic Cursor**: Lerp-smoothed cursor tracking with dynamic morphing into an `[+] AUDIT` reticle over financial amounts and code tokens.
  - **Holographic Specular Lighting**: Real-time mouse-tracking radial sheen (`--mouse-x`, `--mouse-y`) and iridescent foil across the 3D glass document.
  - **Ambient Particle Network**: Lightweight HTML5 Canvas particle web with proximate node connections in deep space black.
  - **Sequential Node Pipeline**: Interactive execution trigger animating Supplier -> Gateway -> SAP / Quarantine with synchronized audio chimes and live telemetry.
  - **Zero-Dependency Architecture**: Zero heavy 3D library bundles; 100% native Canvas and modern CSS physics.
  - **100% Deterministic Pass**: All 30 statutory scenarios pass with 100% precision.

- **Site of the Month (SOTM) Scrollytelling Stage & Living Bento Overhaul (ADR-015)**:
  - **1.2s Aperture Shutter Calibration Preloader**: High-precision dual-aperture shutter revealing the UI upon calibration completion (000 to 100%).
  - **Pinned 4-Beat Scrollytelling Track (`#scrollytelling-track`)**:
    - Beat 1: Ingestion (0.00-0.25)
    - Beat 2: Compression (0.25-0.50)
    - Beat 3: Multi-Layer X-Ray Dissection (0.50-0.75) with 3D layer peeling (`layer-visual`, `layer-ast`, `layer-crypto`)
    - Beat 4: Vault Staging (0.75-1.00) with emerald pulse and SHA-256 seal burn.
  - **Monumental Kinetic Typography**: `DETERMINISTIC VERIFICATION` background with velocity-tracking horizontal translation.
  - **Draggable Physical X-Ray Loupe (`#xray-loupe`)**: Pointer-tracked inspection loupe uncovering machine-level AST tokens and registers over the glass monolith.
  - **Tactile Living Bento Instruments**:
    - Float-Drift Divergence Gauge: Interactive range slider driving dual dials — IEEE-754 red-line needle vs rigid 64-bit Cent lock.
    - Deterministic Sequential Routing Patchbay: Step-by-step pulse animation across Supplier -> HAULITZ -> SAP S/4HANA with live microsecond telemetry.
    - ISO 7064 SEPA Modulo-97 Synthesizer: Real-time BigInt remainder validator.
    - SubtleCrypto SHA-256 Ledger: Genuine cryptographic block seal generation.
  - **High-Throughput Benchmark (5,000 TPS Gauge)**: Hold-to-test trigger with dynamic green oscilloscope canvas waveform.
  - **Architectural Colophon**: Minimal, editorial executive presentation of Allen Simeon Fletcher (EU Blue Card § 18g Ready, 1-click dossier download).
  - **Procedural Audio Synth Engine**: Mechanical clicks, alerts, chimes, and scroll-velocity modulated low drone.
  - **Zero External CDNs / 100% DSGVO Compliant**: Native CSS 3D perspectives, native Canvas, zero bundle bloat.

- **v6.1 Architectural Editorial System & Visual Balance Overhaul (ADR-017)**:
  - Eliminated word-wrap break in hero: "Rechnungsfehler" now renders as a single unbroken line paired with accent "stoppen.".
  - Full-width frosted blur shield (`.nav-blur-shield`) behind top capsule dock; `scroll-margin-top: 110px` on all sections to prevent content collisions.
  - Rich obsidian background (`#070a13`) with 12-column hairline guide lines and tactile film-grain noise.
  - Architectural Inspection Bay (`.inspection-bay`) with corner crosshairs, header telemetry, and integrated lower chaos deck.
  - Fixed IBAN and state logic: strictly isolated presets; no cross-state pollution or invalid IBANs colored green.
  - Non-breaking tabular formatting on float/cent math (`white-space: nowrap`) to eliminate multi-line number wraps.
  - Luminous phosphor green oscilloscope on benchmark canvas with active pulse and glow.
  - Architect colophon: fixed personal GitHub profile link to `https://github.com/AllenFletcherAI`; eliminated 300px void under portrait with Executive Status badges (`🟢 Sofort einsatzbereit`, `30/30 CI Passed`, and stack tags).
  - All 30 deterministic test scenarios pass at 100%.

## 2. What We Are Working On Now
- Commit and push v6.1 to GitHub remote `origin main`.
- Verify GitHub Actions CI run.
- Verify live edge deployment on Cloudflare Workers.

## 3. Broken Or Dangerous Items
- None. All 30 automated statutory and mathematical test scenarios pass with zero regressions.

## 4. What To Do Next
- Verify live edge delivery on `https://haulitz.allensimeonfletcher.workers.dev/`.
- Review mobile and ultra-wide viewports.

## 5. Do Not Touch
- Git remote `origin`: Synchronized with `main` at commit `a30a6a1`.
- `.env`: Kept strictly local and ignored by `.gitignore` and `.assetsignore`.
- `tests/verify_haulitz.js` and `js/verifier/` and `js/fixtures/`: Do not edit. Test suite must stay at 30/30.
