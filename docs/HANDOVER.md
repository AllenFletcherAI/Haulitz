# Project Memory Handover (Haulitz)
Standard: ASD-STE100 Simplified Technical English · Habit 01

## 1. What We Finished (Done)
- Preserved previous S-Group Gateway iteration safely on git branch `sgroup-gateway`.
- Bootstrapped core plain-language documentation files in `docs/`.
- Written `docs/DECISIONS.md` (ADR-001: Cloudflare Pages edge static SPA vs sleeping container backend).
- Written `docs/CONSTRAINTS.md` (Hard safety rules: NEVER, ALWAYS, ONLY).
- Written `docs/ARCHITECTURE.md` (1-page system topology map and pipeline flow).

## 2. What We Are Working On Now
- Step 2: Core Verification Modules in `js/verifier/`:
  - `checksums.js`: ISO 6346 Modulo-11, EAN-13, IBAN Modulo-97.
  - `arithmetic.js`: German statutory VAT, line-item math, heating cost apportionment.
  - `reconciler.js`: 3-Way reconciliation engine (PO vs Delivery Note vs Commercial Invoice).
  - `gobd_hasher.js`: Tamper-evident SHA-256 GoBD § 147 AO hash chain.

## 3. Broken Or Dangerous Items
- None. Clean working tree on main branch.

## 4. What To Do Next
- Build Step 2: Core Verification Modules in `js/verifier/`.
- Build Step 3: Domain Fixtures for all 10 target sectors in `js/fixtures/` and registry in `js/domains.js`.
- Build Step 4: Enterprise Generators in `js/generators/` (`sql_staging.js` and `legal_memos.js`).
- Build Step 5: Master UI (`index.html` and `css/styles.css`).
- Build Step 6: Application controller and state manager (`js/app.js`).
- Build Step 7: Local verification tests (30 scenarios across 10 domains).
- Build Step 8: Cloudflare Pages deployment to `https://haulitz.pages.dev`.

## 5. Do Not Touch
- Git branch `sgroup-gateway`: Contains historical Python/FastAPI reference implementation.
