# Test Checklist & Real Proof (Haulitz)
Standard: ASD-STE100 Simplified Technical English · Habit 08

## The Verification Command
Run the complete 30-scenario deterministic audit suite across all 10 target industry domains:

```bash
node verify_haulitz.js
```

## The Real Screen Output (The Receipt)
```text
================================================================
HAULITZ DETERMINISTIC VERIFICATION ENGINE: 30-SCENARIO TEST SUITE
================================================================

[DOMAIN 01] FinTech & Corporate Invoicing (Pleo, Moss, Billie, Personio, Taxfix)
  ✅ PASS [scenario_a] Clean Vendor Invoice (Compliant) -> [VERIFIED_CLEAN]
  ✅ PASS [scenario_b] Arithmetic Trap (€120.00 VAT Variance) -> [QUARANTINE_HOLD]
  ✅ PASS [scenario_c] Corrupted SEPA IBAN (Modulo-97 Breach) -> [QUARANTINE_HOLD]

[DOMAIN 02] Freight & Maritime Logistics (DB Schenker, DHL, Forto, Kuehne+Nagel)
  ✅ PASS [scenario_a] Clean Ocean B/L & Packing List -> [VERIFIED_CLEAN]
  ✅ PASS [scenario_b] Mass Law Deficit Trap (§ 412 HGB) -> [QUARANTINE_HOLD]
  ✅ PASS [scenario_c] Invalid ISO 6346 Container Checksum -> [QUARANTINE_HOLD]

[DOMAIN 03] Supply Chain & Manufacturing (Siemens, Bosch Mittelstand, Festo)
  ✅ PASS [scenario_a] Clean 3-Way Triad Reconciliation -> [VERIFIED_CLEAN]
  ✅ PASS [scenario_b] Short Shipment Overbilling (20 Units Deficit) -> [QUARANTINE_HOLD]
  ✅ PASS [scenario_c] Unauthorized Price Hike (+€15.00/unit) -> [QUARANTINE_HOLD]

[DOMAIN 04] InsurTech & Claims Processing (Allianz, Munich Re, wefox, Clark)
  ✅ PASS [scenario_a] Clean Workshop Claim & Deductible -> [VERIFIED_CLEAN]
  ✅ PASS [scenario_b] Deductible Omission Trap (€500 Variance) -> [QUARANTINE_HOLD]
  ✅ PASS [scenario_c] Excessive Hourly Labor Rate (€190/hr vs €140) -> [QUARANTINE_HOLD]

[DOMAIN 05] LegalTech & Regulatory Contracts (BRYTER, Knowalia, Corporate Legal)
  ✅ PASS [scenario_a] Clean Supplier ESG Audit Dossier -> [VERIFIED_CLEAN]
  ✅ PASS [scenario_b] Expired Environmental Certificate (45 Days) -> [QUARANTINE_HOLD]
  ✅ PASS [scenario_c] Missing Mandatory LkSG Remediation Clause -> [QUARANTINE_HOLD]

[DOMAIN 06] HealthTech & Medical Admin (CompuGroup Medical, Doctolib, Dedalus)
  ✅ PASS [scenario_a] Clean GOÄ Liquidation (Standard Multipliers) -> [VERIFIED_CLEAN]
  ✅ PASS [scenario_b] Arithmetic Calculation Trap in Line Math -> [QUARANTINE_HOLD]
  ✅ PASS [scenario_c] Unjustified 3.5x Multiplier Ceiling Breach -> [QUARANTINE_HOLD]

[DOMAIN 07] E-Commerce & Retail Operations (Zalando, Otto Group, Tradebyte)
  ✅ PASS [scenario_a] Clean Marketplace Inbound ASN Feed -> [VERIFIED_CLEAN]
  ✅ PASS [scenario_b] Multi-Currency FX Arithmetic Trap -> [QUARANTINE_HOLD]
  ✅ PASS [scenario_c] Corrupted EAN-13 Check Digit (Barcode Breach) -> [QUARANTINE_HOLD]

[DOMAIN 08] CleanTech & Renewable Energy (1Komma5°, Enpal, EnBW, SMA Solar)
  ✅ PASS [scenario_a] Clean PV Grid Connection Application -> [VERIFIED_CLEAN]
  ✅ PASS [scenario_b] DC String Wattage Math Discrepancy Trap -> [QUARANTINE_HOLD]
  ✅ PASS [scenario_c] Inverter Peak Grid Capacity Overage (VDE Breach) -> [QUARANTINE_HOLD]

[DOMAIN 09] PropTech & Real Estate (Vonovia, Scout24, immowelt)
  ✅ PASS [scenario_a] Clean Utility Statement (70/30 Statutory) -> [VERIFIED_CLEAN]
  ✅ PASS [scenario_b] Square-Meter Apportionment Math Trap -> [QUARANTINE_HOLD]
  ✅ PASS [scenario_c] Illegal 50/50 Allocation Split (HeizkostenV Breach) -> [QUARANTINE_HOLD]

[DOMAIN 10] Enterprise ERP & IT Consulting (Accenture, Capgemini, msg systems)
  ✅ PASS [scenario_a] Clean Parameterized Ingestion Payload -> [VERIFIED_CLEAN]
  ✅ PASS [scenario_b] Schema Decimal Overflow Trap -> [QUARANTINE_HOLD]
  ✅ PASS [scenario_c] SQL Injection Attack in Vendor Reference -> [QUARANTINE_HOLD]

================================================================
VERIFICATION SUMMARY: 30 / 30 SCENARIOS TESTED SUCCESSFULLY (100%)
GoBD SHA-256 Seal Chain: Verified 30 sequential cryptographic blocks.
================================================================
✅ Enterprise T-SQL and C# Integration Generators Verified.
✅ German Commercial Legal Notices Verified.
```

## The Manual Recruiter Journey Test (Done By Hand)
1. Open `https://haulitz.pages.dev` in browser (or `python -m http.server 8000`).
2. Verify page loads in <30 ms with green beacon "Deterministic Engine Active".
3. Click through each domain (e.g. 01 FinTech, 02 Freight, 03 Supply Chain).
4. Click `[Scenario B: Arithmetic Trap]`: Verify instant crimson alert, exact calculated variance, and auto-generated statutory German legal notice.
5. Click `[View Parameterized T-SQL]`: Verify syntax-highlighted staging query targeting SAP & MS SQL Server.
6. Click `[Export GoBD § 147 AO Ledger (.CSV)]`: Verify valid CSV file with UTF-8 BOM `\uFEFF` downloads instantly.
