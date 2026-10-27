/**
 * HAULITZ FIXTURES: DOMAIN 10 - ENTERPRISE ERP & IT CONSULTING
 * Target Employers: Accenture, Capgemini, msg systems, SAP Ecosystem
 */

(function(global) {
  'use strict';

  const ErpFixtures = {
    domainId: 'erp',
    scenarios: {
      scenario_a: {
        id: 'scenario_a',
        name: 'Clean Parameterized Ingestion Payload',
        badge: 'Clean Pass',
        expectedResult: 'PASS',
        summary: 'Fully typed EDIFACT INVOIC transaction payload ready for Microsoft SQL Server 2022 staging and SAP S/4HANA IDoc dispatch.',
        document: {
          transactionId: 'TXN-ERP-2026-9001',
          sourceSystem: 'SAP_S4HANA_IDOC_INVOIC02',
          companyCode: 'DE10',
          controllingArea: '1000',
          costCenter: 'CC-LOG-4402',
          glAccount: '0000410000',
          vendorId: 'LIFNR-882109',
          referenceNumber: 'REF-SAP-992014',
          documentCurrency: 'EUR',
          netAmount: 18450.00,
          taxAmount: 3505.50,
          grossAmount: 21955.50,
          sqlSanitized: true,
          foreignKeysValid: true,
          stagingTableTarget: '[dbo].[Staging_ERP_Ingest]'
        }
      },
      scenario_b: {
        id: 'scenario_b',
        name: 'Schema Decimal Overflow Trap',
        badge: 'Math Trap',
        expectedResult: 'FAIL',
        summary: 'Legacy ERP payload sends fractional unit price with 6 decimal places exceeding target SQL Server DECIMAL(18,2) precision, triggering arithmetic overflow warning.',
        document: {
          transactionId: 'TXN-ERP-2026-9002',
          sourceSystem: 'LEGACY_AS400_FLATFILE',
          companyCode: 'DE10',
          controllingArea: '1000',
          costCenter: 'CC-MFG-1029',
          glAccount: '0000500100',
          vendorId: 'LIFNR-102938',
          referenceNumber: 'REF-AS400-8812',
          documentCurrency: 'EUR',
          netAmount: 14500.999812, // Precision trap: 6 decimals on 2-decimal staging schema
          taxAmount: 2755.189964,
          grossAmount: 17256.189776,
          sqlSanitized: true,
          foreignKeysValid: true,
          stagingTableTarget: '[dbo].[Staging_ERP_Ingest]'
        }
      },
      scenario_c: {
        id: 'scenario_c',
        name: 'SQL Injection Attack in Vendor Reference',
        badge: 'Security / SQLi',
        expectedResult: 'FAIL',
        summary: 'Untrusted legacy payload contains destructive SQL injection payload (\' OR 1=1; DROP TABLE [dbo].[Staging_ERP_Ingest]; --). Trapped by deterministic gate.',
        document: {
          transactionId: 'TXN-ERP-2026-9003',
          sourceSystem: 'UNTRUSTED_WEBHOOK_PARTNER',
          companyCode: 'DE10',
          controllingArea: '1000',
          costCenter: 'CC-SEC-0001',
          glAccount: '0000999999',
          vendorId: 'MALICIOUS_ACTOR',
          referenceNumber: "INV-9901' OR 1=1; DROP TABLE [dbo].[Staging_ERP_Ingest]; --", // SQL Injection trap!
          documentCurrency: 'EUR',
          netAmount: 99999.00,
          taxAmount: 18999.81,
          grossAmount: 118998.81,
          sqlSanitized: false, // Flagged
          foreignKeysValid: false,
          stagingTableTarget: '[dbo].[Staging_ERP_Ingest]'
        }
      }
    }
  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = ErpFixtures;
  } else {
    global.Haulitz = global.Haulitz || {};
    global.Haulitz.Fixtures = global.Haulitz.Fixtures || {};
    global.Haulitz.Fixtures.erp = ErpFixtures;
  }
})(typeof window !== 'undefined' ? window : globalThis);
