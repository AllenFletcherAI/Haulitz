/**
 * HAULITZ FIXTURES: DOMAIN 07 - E-COMMERCE & RETAIL OPERATIONS
 * Target Employers: Zalando, Otto Group, Tradebyte, About You
 */

(function(global) {
  'use strict';

  const EcommerceFixtures = {
    domainId: 'ecommerce',
    scenarios: {
      scenario_a: {
        id: 'scenario_a',
        name: 'Clean Marketplace Inbound ASN Feed',
        badge: 'Clean Pass',
        expectedResult: 'PASS',
        summary: 'Fully validated marketplace ASN with verified EAN-13 / GTIN barcode (4006381333931) and consistent packaging quantity hierarchy.',
        document: {
          asnNumber: 'ASN-ZAL-2026-9901',
          merchantName: 'Nordic Living Goods GmbH',
          warehouseLocation: 'Erfurt Logistic Hub 3 (DE-ERF3)',
          deliveryDate: '2026-10-18',
          sku: 'STAB-BOSS-PEN-400',
          itemTitle: 'Stabilo Boss Original Highlighter Pack of 4',
          barcode: '4006381333931', // Valid EAN-13 check digit (1)
          cartonCount: 50,
          unitsPerCarton: 10,
          totalDeclaredUnits: 500,
          unitCostEur: 3.40,
          totalBatchValueEur: 1700.00,
          hsTariffCode: '9608.20.00'
        }
      },
      scenario_b: {
        id: 'scenario_b',
        name: 'Multi-Currency FX Arithmetic Trap',
        badge: 'Math Trap',
        expectedResult: 'FAIL',
        summary: 'Inbound consignment from US supplier where converted EUR amount (€4,200.00) deviates from declared $5,000.00 USD at EUR/USD 1.0850 rate by €407.83.',
        document: {
          asnNumber: 'ASN-ZAL-2026-9902',
          merchantName: 'Pacific Audio Imports Corp.',
          warehouseLocation: 'Mönchengladbach Hub (DE-MGL1)',
          deliveryDate: '2026-10-19',
          sku: 'PAC-NOISE-CAN-09',
          itemTitle: 'Active Noise Cancelling Wireless Headphones',
          barcode: '4006381333931',
          cartonCount: 20,
          unitsPerCarton: 10,
          totalDeclaredUnits: 200,
          declaredUsdTotal: 5000.00,
          fxRateEurUsd: 1.0850,
          expectedEurTotal: 4608.29,
          statedEurTotal: 4200.00, // Arithmetic trap: €408.29 deficit!
          hsTariffCode: '8518.30.00'
        }
      },
      scenario_c: {
        id: 'scenario_c',
        name: 'Corrupted EAN-13 Check Digit (Barcode Breach)',
        badge: 'Legal / Barcode',
        expectedResult: 'FAIL',
        summary: 'Inbound shipment contains invalid barcode 4006381333939 (expected check digit 1). Blocked from WMS high-bay warehouse putaway to avoid unsellable lost inventory.',
        document: {
          asnNumber: 'ASN-ZAL-2026-9903',
          merchantName: 'Bavarian Apparel Design KG',
          warehouseLocation: 'Lahr Logistics Park (DE-LHR1)',
          deliveryDate: '2026-10-20',
          sku: 'BAV-MERINO-KNIT-XL',
          itemTitle: 'Extra Fine Merino Wool Pullover Midnight Blue',
          barcode: '4006381333939', // Corrupted check digit (9 instead of 1)
          cartonCount: 25,
          unitsPerCarton: 20,
          totalDeclaredUnits: 500,
          unitCostEur: 28.50,
          totalBatchValueEur: 14250.00,
          hsTariffCode: '6110.12.90'
        }
      }
    }
  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = EcommerceFixtures;
  } else {
    global.Haulitz = global.Haulitz || {};
    global.Haulitz.Fixtures = global.Haulitz.Fixtures || {};
    global.Haulitz.Fixtures.ecommerce = EcommerceFixtures;
  }
})(typeof window !== 'undefined' ? window : globalThis);
