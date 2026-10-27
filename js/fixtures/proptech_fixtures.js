/**
 * HAULITZ FIXTURES: DOMAIN 09 - PROPTECH & REAL ESTATE (HEIZKOSTENV)
 * Target Employers: Vonovia, Scout24, immowelt, Aareon, LEG Immobilien
 */

(function(global) {
  'use strict';

  const ProptechFixtures = {
    domainId: 'proptech',
    scenarios: {
      scenario_a: {
        id: 'scenario_a',
        name: 'Clean Utility Statement (70/30 Statutory)',
        badge: 'Clean Pass',
        expectedResult: 'PASS',
        summary: 'Fully compliant annual heating and utility statement with verified 70/30 consumption-to-area split according to Heizkostenverordnung (HeizkostenV) § 7.',
        document: {
          statementId: 'NKA-VONOVIA-2026-901',
          buildingAddress: 'Kaiserstraße 12, 60311 Frankfurt am Main',
          unitNumber: 'WE 04, 2. OG rechts',
          tenantName: 'Johannes Kling',
          billingPeriod: '01.01.2025 - 31.12.2025',
          totalBuildingCost: 12000.00,
          tenantM2: 75.0,
          totalBuildingM2: 600.0,
          tenantMeterUnits: 1400.0,
          totalBuildingMeterUnits: 10000.0,
          splitRatio: '70/30',
          consumptionCostTenant: 1176.00, // (12000 * 0.70) * (1400 / 10000)
          areaCostTenant: 450.00,         // (12000 * 0.30) * (75 / 600)
          statutoryTenantTotal: 1626.00,
          declaredTenantBilled: 1626.00,
          statute: 'Heizkostenverordnung (HeizkostenV) § 7 Abs. 1'
        }
      },
      scenario_b: {
        id: 'scenario_b',
        name: 'Square-Meter Apportionment Math Trap',
        badge: 'Math Trap',
        expectedResult: 'FAIL',
        summary: 'Landlord miscalculated tenant area share (€595.00 instead of calculated €450.00), resulting in an unjustified €145.00 billing surplus.',
        document: {
          statementId: 'NKA-VONOVIA-2026-902',
          buildingAddress: 'Schillerstraße 8, 70173 Stuttgart',
          unitNumber: 'WE 02, 1. OG links',
          tenantName: 'Laura Schmidt',
          billingPeriod: '01.01.2025 - 31.12.2025',
          totalBuildingCost: 12000.00,
          tenantM2: 75.0,
          totalBuildingM2: 600.0,
          tenantMeterUnits: 1400.0,
          totalBuildingMeterUnits: 10000.0,
          splitRatio: '70/30',
          consumptionCostTenant: 1176.00,
          areaCostTenant: 595.00, // Arithmetic trap: should be 450.00 (Delta: +145.00 EUR)
          statutoryTenantTotal: 1626.00,
          declaredTenantBilled: 1771.00,
          statute: 'BGB § 556 i.V.m. Betriebskostenverordnung (BetrKV)'
        }
      },
      scenario_c: {
        id: 'scenario_c',
        name: 'Illegal 50/50 Allocation Split (HeizkostenV Breach)',
        badge: 'Legal / 15% Reduction',
        expectedResult: 'FAIL',
        summary: 'Landlord applied an unlawful 50/50 split instead of mandatory 70/30 consumption rule in uninsulated pre-1977 building, giving tenant 15% reduction right under § 12.',
        document: {
          statementId: 'NKA-VONOVIA-2026-903',
          buildingAddress: 'Gartenstraße 19, 40211 Düsseldorf',
          unitNumber: 'WE 07, 3. OG',
          tenantName: 'Markus Weber',
          billingPeriod: '01.01.2025 - 31.12.2025',
          totalBuildingCost: 14000.00,
          tenantM2: 80.0,
          totalBuildingM2: 640.0,
          tenantMeterUnits: 1600.0,
          totalBuildingMeterUnits: 11000.0,
          splitRatio: '50/50', // Illegal split under § 7 HeizkostenV
          statutoryTenantTotal: 1781.82,
          declaredTenantBilled: 1892.73,
          statute: 'Heizkostenverordnung (HeizkostenV) § 7 & § 12 Kürzungsrecht'
        }
      }
    }
  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = ProptechFixtures;
  } else {
    global.Haulitz = global.Haulitz || {};
    global.Haulitz.Fixtures = global.Haulitz.Fixtures || {};
    global.Haulitz.Fixtures.proptech = ProptechFixtures;
  }
})(typeof window !== 'undefined' ? window : globalThis);
