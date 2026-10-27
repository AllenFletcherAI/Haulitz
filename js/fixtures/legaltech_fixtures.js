/**
 * HAULITZ FIXTURES: DOMAIN 05 - LEGALTECH & REGULATORY CONTRACTS (LkSG)
 * Target Employers: BRYTER, Knowalia, Corporate Legal Ops
 */

(function(global) {
  'use strict';

  const LegaltechFixtures = {
    domainId: 'legaltech',
    scenarios: {
      scenario_a: {
        id: 'scenario_a',
        name: 'Clean Supplier ESG Audit Dossier',
        badge: 'Clean Pass',
        expectedResult: 'PASS',
        summary: 'Fully compliant Tier-1 supplier audit dossier with valid ISO 14001 environmental cert, active SA 8000 social standard, and signed LkSG Code of Conduct.',
        document: {
          dossierNumber: 'ESG-LKSG-2026-101',
          vendorId: 'VEND-TIER1-9920',
          supplierName: 'Stahlwerke Rheinland Precision SE',
          countryOfOperation: 'Germany',
          iso14001ValidUntil: '2027-12-31',
          sa8000ValidUntil: '2028-06-30',
          humanRightsCodeSigned: true,
          whistleblowerChannelActive: true,
          grievanceProcedureStatus: 'APPROVED_COMPLIANT',
          auditScorePercent: 96.5,
          daysExpired: 0,
          complianceStatus: 'VERIFIED_COMPLIANT'
        }
      },
      scenario_b: {
        id: 'scenario_b',
        name: 'Expired Environmental Certificate (45 Days)',
        badge: 'Math / Expiry Trap',
        expectedResult: 'FAIL',
        summary: 'Mandatory ISO 14001 environmental management certificate expired 45 days ago, triggering immediate supplier quarantine under LkSG § 7 Abs. 1.',
        document: {
          dossierNumber: 'ESG-LKSG-2026-102',
          vendorId: 'VEND-TIER1-8840',
          supplierName: 'Global Titanium Foundry Ltd.',
          countryOfOperation: 'India / Tamil Nadu',
          iso14001ValidUntil: '2026-09-01', // Expired!
          sa8000ValidUntil: '2027-04-15',
          humanRightsCodeSigned: true,
          whistleblowerChannelActive: true,
          grievanceProcedureStatus: 'EXPIRED_ENVIRONMENTAL_AUDIT',
          auditScorePercent: 62.0,
          daysExpired: 45,
          complianceStatus: 'QUARANTINE_HOLD'
        }
      },
      scenario_c: {
        id: 'scenario_c',
        name: 'Missing Mandatory LkSG Remediation Clause',
        badge: 'Legal / Contract',
        expectedResult: 'FAIL',
        summary: 'Supplier master agreement lacks the statutory contractual assurance clause required by LkSG § 7 Abs. 2, blocking SAP MM vendor approval.',
        document: {
          dossierNumber: 'ESG-LKSG-2026-103',
          vendorId: 'VEND-TIER1-7712',
          supplierName: 'Orient Battery Components Corp.',
          countryOfOperation: 'Vietnam',
          iso14001ValidUntil: '2027-09-30',
          sa8000ValidUntil: '2027-09-30',
          humanRightsCodeSigned: false, // Refused mandatory compliance addendum!
          whistleblowerChannelActive: false,
          grievanceProcedureStatus: 'REMEDIAL_CLAUSE_MISSING',
          auditScorePercent: 54.0,
          daysExpired: 0,
          complianceStatus: 'REJECTED_NON_COMPLIANT'
        }
      }
    }
  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = LegaltechFixtures;
  } else {
    global.Haulitz = global.Haulitz || {};
    global.Haulitz.Fixtures = global.Haulitz.Fixtures || {};
    global.Haulitz.Fixtures.legaltech = LegaltechFixtures;
  }
})(typeof window !== 'undefined' ? window : globalThis);
