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
  - `index.html` & `css/styles.css`: Prussian Navy (#0F2942) executive command center and split inspection workspace.
  - `js/app.js`: Master controller, active scenario runner, modal manager, and GoBD seal chain coordinator.
  - `verify_haulitz.js`: Comprehensive 30-scenario test runner passing with 100% accuracy.
- Restored and updated all 11 core documentation files in `docs/` and `README.md`.

## 2. What We Are Working On Now
- Commit and push to GitHub repository `AllenFletcherAI/Haulitz` to trigger automatic Cloudflare Pages deployment to `https://haulitz.pages.dev`.

## 3. Broken Or Dangerous Items
- None. 30 / 30 test scenarios pass with 100% accuracy. Zero cold starts, $0/month cost, zero secret leaks.

## 4. What To Do Next
- Verify live edge deployment at `https://haulitz.pages.dev`.
- Update LinkedIn portfolio and CV links to showcase Haulitz for German enterprise Solutions Engineer and AI Integration roles.

## 5. Do Not Touch
- Git branch `sgroup-gateway`: Contains historical Python/FastAPI reference implementation.
