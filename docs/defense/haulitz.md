# Whiteboard Defense Brief: Haulitz Universal Enterprise Verification Gateway
Standard: ASD-STE100 Simplified Technical English · Habit 16

## 1. What It Does (In Two Sentences)
Haulitz is a universal data verification gateway that sits between unstructured business inputs and enterprise ERP databases (SAP and Microsoft SQL Server). It runs deterministic mathematical, regulatory, and checksum guardrails on extracted data to eliminate AI hallucinations, billing errors, and customs liability.

## 2. How It Works (Bird's-Eye Walkthrough)
1. **Document Ingestion:** The user selects one of 10 enterprise domains and loads a canonical test scenario (clean record, math trap, or legal exception).
2. **Deterministic Airbag Verification:** The client-side verification engine checks ISO 6346 Modulo-11 container checksums, EAN-13 barcodes, IBAN Modulo-97, German statutory VAT (19%/7%), line-item math, and 3-way document matching without external AI calls.
3. **Audit Ledger Sealing:** Clean records receive a sequential SHA-256 cryptographic seal compliant with GoBD § 147 AO and generate parameterized T-SQL staging scripts for SAP and MS SQL Server.
4. **Quarantine Routing:** Failed records trigger an immediate quarantine hold, compute the exact variance, and auto-draft an official German legal dispute notice citing relevant commercial law (ADSp 2017, § 412 HGB, § 14 UStG, LkSG § 7, GOÄ § 12).

## 3. Key Design Choices & Trade-offs
- **Edge Deployment over Backend Containers:** Zero cold starts, <30 ms latency across Europe, $0/month cost forever on Cloudflare Pages.
- **Pre-Cached Canonical Fixtures over File Uploads:** Recruiters evaluate real enterprise workflows with 1 click instead of downloading files.
- **Client-Side Cryptography:** Browser `crypto.subtle` computes real SHA-256 digests offline.

## 4. Where Does It Break Under Load?
- **Current Limit:** Client-side memory limits if processing hundreds of thousands of ledger rows in browser RAM.
- **Alarm / Protection:** Client caches only the most recent 100 audit events in memory and exports historical ledgers to GoBD UTF-8 BOM CSV files.

## 5. What We Would Improve With More Time
- Implement WebAssembly (Rust) acceleration for batch auditing 100,000+ invoices in milliseconds.
- Add WebRTC peer-to-peer supervisor override authorization for distributed accounting teams.
