/**
 * HAULITZ FIXTURES: DOMAIN 04 - INSURTECH & CLAIMS PROCESSING
 * Target Employers: Allianz, Munich Re, wefox, Clark, ERGO
 */

(function(global) {
  'use strict';

  const InsurtechFixtures = {
    domainId: 'insurtech',
    scenarios: {
      scenario_a: {
        id: 'scenario_a',
        name: 'Clean Workshop Claim & Deductible',
        badge: 'Clean Pass',
        expectedResult: 'PASS',
        summary: 'Fully compliant accident repair claim adhering to regional DAT labor rate caps (€135.00/hr) with exact policy deductible deduction (€300.00).',
        document: {
          claimNumber: 'CLM-ALLIANZ-2026-9001',
          policyNumber: 'POL-DE-883921',
          policyholder: 'Maximilian Krause',
          vehicleVin: 'WVWZZZ3CZWE120934',
          vehicleModel: 'Volkswagen Passat Variant 2.0 TDI',
          repairShop: 'Autohaus & Karosseriebau Schmidt GmbH',
          laborHours: 12.5,
          billedHourlyRate: 135.00, // Below 140.00 ceiling
          approvedHourlyRate: 140.00,
          totalLaborCost: 1687.50,
          partsCost: 2150.00,
          paintMaterialCost: 450.00,
          subtotalNet: 4287.50,
          vatAmount: 814.63,
          grossTotal: 5102.13,
          policyDeductible: 300.00,
          netInsurerPayable: 4802.13
        }
      },
      scenario_b: {
        id: 'scenario_b',
        name: 'Deductible Omission Trap (€500 Variance)',
        badge: 'Math Trap',
        expectedResult: 'FAIL',
        summary: 'Repair workshop billed full gross claim amount directly to insurer without deducting the mandatory €500.00 comprehensive deductible (Selbstbeteiligung).',
        document: {
          claimNumber: 'CLM-ALLIANZ-2026-9002',
          policyNumber: 'POL-DE-994012',
          policyholder: 'Sabine Hoffmann',
          vehicleVin: 'WAUZZZ8V7FA019283',
          vehicleModel: 'Audi A3 Sportback 35 TFSI',
          repairShop: 'Express Karosserie & Lackierzentrum KG',
          laborHours: 10.0,
          billedHourlyRate: 140.00,
          approvedHourlyRate: 140.00,
          totalLaborCost: 1400.00,
          partsCost: 1800.00,
          paintMaterialCost: 350.00,
          subtotalNet: 3550.00,
          vatAmount: 674.50,
          grossTotal: 4224.50,
          policyDeductible: 500.00,
          netInsurerPayable: 4224.50 // Trap: Deductible was not subtracted! Should be 3724.50
        }
      },
      scenario_c: {
        id: 'scenario_c',
        name: 'Excessive Hourly Labor Rate (€190/hr vs €140)',
        badge: 'Legal / Rate Cap',
        expectedResult: 'FAIL',
        summary: 'Workshop charged €190.00/hour for bodywork exceeding contractual benchmark cap of €140.00/hr, triggering automated BGB § 249 / VVG § 86 reduction notice.',
        document: {
          claimNumber: 'CLM-ALLIANZ-2026-9003',
          policyNumber: 'POL-DE-102948',
          policyholder: 'Dr. Stefan Lindner',
          vehicleVin: 'WBA5R11030FG99201',
          vehicleModel: 'BMW 320d Touring',
          repairShop: 'Premium Munich Bodywork Specialists',
          laborHours: 15.0,
          billedHourlyRate: 190.00, // Exceeds 140.00 cap by 50.00/hr!
          approvedHourlyRate: 140.00,
          totalLaborCost: 2850.00,
          partsCost: 2400.00,
          paintMaterialCost: 600.00,
          subtotalNet: 5850.00,
          vatAmount: 1111.50,
          grossTotal: 6961.50,
          policyDeductible: 300.00,
          netInsurerPayable: 6661.50
        }
      }
    }
  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = InsurtechFixtures;
  } else {
    global.Haulitz = global.Haulitz || {};
    global.Haulitz.Fixtures = global.Haulitz.Fixtures || {};
    global.Haulitz.Fixtures.insurtech = InsurtechFixtures;
  }
})(typeof window !== 'undefined' ? window : globalThis);
