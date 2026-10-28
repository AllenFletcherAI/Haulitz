# Project Memory Handover (Haulitz)
Standard: ASD-STE100 Simplified Technical English · Habit 01

## 1. What We Finished (Done)
- Preserved historical Python/FastAPI reference implementation safely on git branch `sgroup-gateway`.
- Removed legacy container files (`Dockerfile`, `run.py`, `requirements.txt`, `redline_gateway.db`, and dead `.pyc` bytecode).
- Built pure client-side deterministic verification engine for Cloudflare Pages edge hosting (`https://haulitz.pages.dev`):
  - `js/verifier/checksums.js`: ISO 6346 Modulo-11, EAN-13, SEPA IBAN Modulo-97.
  - `js/verifier/arithmetic.js`: German statutory VAT (19%/7%), line-item math, mass law (§ 412 HGB), HeizkostenV § 7 apportionment, GOÄ multipliers.
  - `js/verifier/reconciler.js`: 3-Way triad matching (PO vs Goods Receipt vs Commercial Invoice).
  - `js/verifier/gobd_hasher.js`: Sequential SHA-256 seal chaining and DATEV/SAP UTF-8 BOM CSV export.
  - `js/generators/sql_staging.js`: Parameterized T-SQL (SAP / MS SQL 2022) & C# .NET 8 client SDK.
  - `js/generators/legal_memos.js`: Statutory German legal dispute notices (§ 14 UStG, ADSp 2017, § 412 HGB, LkSG § 7, GOÄ § 12, HeizkostenV § 7).
  - `js/domains.js`: Master metadata registry for all 10 corporate industry sectors.
  - `js/fixtures/*.js`: 30 rich canonical scenario fixtures across all 10 sectors (Clean Pass, Math Trap, Legal Exception).
- **Elevated UI Design System (Linear / Stripe Standard)**:
  - Replaced bulky hero banner with sleek **Executive Status HUD** (Capital Protected: €184,250.00, Audited: 12,840, SLA: 100%, Latency: <20ms).
  - Refined colors and borders: Prussian Navy (`#0F2942`), crisp 1px borders (`#E2E8F0` / `#1E293B`), zero neon glowing artifacts.
  - Implemented **Top-Level 3-Tab Architecture**:
    - **Tab 1: Verifizierungs-Cockpit (Verification Cockpit)**: 10-domain deterministic Airbag engine with Split Inspection Workspace.
    - **Tab 2: Kunden-Portal & Roadmap (Client Portal & Implementation)**: Client Health Score (98/100), 4-Week SAP S/4HANA Onboarding Roadmap, and Capital Protected Results Tracker.
    - **Tab 3: Bereitstellungs-SOPs (Deployment SOP Library)**: Binding operational procedures for quarantine resolution, § 14 UStG VAT variances, and GoBD SHA-256 chain verification.
  - Implemented **Authentic German Document Canvas**:
    - Simulated realistic DIN 5008 German business letterheads, fold marks (`din-fold-top`, `din-punch-center`), and Ocean Bills of Lading.
    - **Auditor Red Highlighter Marker**: Highlights the exact arithmetic/regulatory defect in Scenarios B & C with high-visibility callout badges.
  - Implemented **CFO Executive Recap Generator**:
    - 1-click generation of a 3-bullet executive brief (Incident, Compliance Risk, Gateway Mitigation) with direct clipboard copy.
  - Default settings strictly locked to **German (de)** and **Light Mode** on fresh load with clean language & theme toggle switches.
- **Verification Proof**:
  - `verify_haulitz.js`: 30 / 30 test scenarios pass with 100% deterministic accuracy.
  - Local preview server running on `http://localhost:8000` with 200 OK status.

## 2. What We Are Working On Now
- Commit and push changes to GitHub repository `AllenFletcherAI/Haulitz` to trigger automated Cloudflare Pages deployment to `https://haulitz.pages.dev`.

## 3. Broken Or Dangerous Items
- None. 30 / 30 test scenarios pass with 100% accuracy. Zero cold starts, $0/month cost, zero secret leaks.

## 4. What To Do Next
- Verify live edge deployment at `https://haulitz.pages.dev`.
- Direct hiring managers and tech leads to `https://haulitz.pages.dev` to demonstrate enterprise ERP integration expertise.

## 5. Do Not Touch
- Git branch `sgroup-gateway`: Contains historical Python/FastAPI reference implementation.
