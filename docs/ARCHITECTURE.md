# System Architecture Map (Haulitz)
Standard: ASD-STE100 Simplified Technical English · Habit 06

## 1. High-Level Topology
Haulitz is a Universal Data Verification Gateway for enterprise ERP systems (SAP, Microsoft SQL Server). It runs as a high-performance Single-Page Application deployed to Cloudflare Pages edge CDN.

```
┌────────────────────────────────────────────────────────────────────────┐
│                        Cloudflare Pages Edge CDN                       │
│                        (https://haulitz.pages.dev)                     │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                 HAULITZ CLIENT RUNTIME (Pure Vanilla JS)               │
├───────────────────────────────────┬────────────────────────────────────┤
│ 10-DOMAIN COMMAND CENTER          │ DETERMINISTIC VERIFICATION ENGINE  │
│ • FinTech & Corporate Invoicing   │ • ISO 6346 Modulo-11 Checksums     │
│ • Freight & Maritime Logistics    │ • EAN-13 & IBAN Modulo-97 Checks   │
│ • Supply Chain & Manufacturing    │ • German Statutory VAT (19% / 7%)  │
│ • InsurTech & Claims Processing   │ • 3-Way Reconciliation Engine      │
│ • LegalTech & Regulatory LkSG     │ • GoBD § 147 AO SHA-256 Hasher     │
│ • HealthTech & Medical GOÄ        │ • Heating Apportionment (HeizkostV)│
│ • E-Commerce & Retail ASIN        ├────────────────────────────────────┤
│ • CleanTech & Renewable Energy    │ DOWNSTREAM EXPORT GENERATORS       │
│ • PropTech & Real Estate          │ • Parameterized T-SQL (SAP/MS-SQL) │
│ • Enterprise ERP & IT Consulting  │ • C# .NET 8 Gateway Client SDK     │
│                                   │ • GoBD UTF-8 BOM CSV Ledger Export │
│                                   │ • Formal German Legal Claim Memos  │
└───────────────────────────────────┴────────────────────────────────────┘
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│               ENTERPRISE DOWNSTREAM CONSUMERS (Simulated)              │
│  • SAP ERP (MM / FI / Real Estate) via Staging Tables                  │
│  • Microsoft SQL Server via Parameterized T-SQL                        │
│  • Customs Authorities & Tax Auditors via GoBD § 147 AO CSV Ledger    │
└────────────────────────────────────────────────────────────────────────┘
```

## 2. The Ingestion & Verification Pipeline ("The Airbag")
1. **Source Document Payload:** Ingests vendor invoices, bills of lading, repair estimates, or LkSG declarations.
2. **Deterministic Verification Gate:** Pure mathematical and regulatory validation tests every field without external AI API calls.
3. **Branching Outcome:**
   - **PASS (`VERIFIED_CLEAN`):** Generates immutable SHA-256 GoBD seal and parameterized T-SQL staging script.
   - **FAIL (`QUARANTINE_HOLD`):** Highlights exact arithmetic or regulatory variance and auto-drafts German legal dispute notice citing relevant code (§ 14 UStG, ADSp 2017, § 412 HGB, LkSG § 7, GOÄ § 12).


## 3. Directory Hierarchy & Clean Root Encapsulation
The codebase organizes all assets, code, workspaces, and tests into a clean, intuitive structure:

```
Haulitz/
├── index.html                      # Central deterministic gateway portal & interactive scanner
├── _worker.js                      # Cloudflare Workers edge router with route aliasing & security headers
├── package.json                    # Project manifest & standard scripts (npm test, npm start)
├── README.md                       # Repository overview and setup guide
├── .gitignore                      # Git exclusion rules
├── .assetsignore                   # Edge CDN packaging exclusion rules
├── css/                            # Global design system & studio styles
│   ├── styles.css
│   └── workspace-modern.css
├── js/                             # Client-side core logic & domain modules
│   ├── app.js                      # Central application controller & scanner presets
│   ├── verification-engine.js      # Core statutory mathematics & checksum formulas
│   └── domains/                    # 10 domain rule modules (fintech, maritime, etc.)
├── workspaces/                     # 10 dedicated full-screen industry workspace interfaces
│   ├── cleantech.html
│   ├── ecommerce.html
│   ├── erp-staging.html
│   ├── fintech.html
│   ├── healthtech.html
│   ├── insurtech.html
│   ├── legaltech.html
│   ├── logistics.html
│   ├── proptech.html
│   └── supply-chain.html
├── tests/                          # Automated verification test suite
│   └── verify_haulitz.js           # 30/30 statutory verification scenarios test runner
├── scripts/                        # Build & code generation utilities
│   └── generate_domain_pages.js    # Workspace HTML template generator
└── docs/                           # Senior engineering memory bank (11 core files)
    ├── ARCHITECTURE.md
    ├── DECISIONS.md
    ├── HANDOVER.md
    └── ...
```
