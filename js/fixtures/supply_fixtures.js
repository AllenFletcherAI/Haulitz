/**
 * HAULITZ FIXTURES: DOMAIN 03 - SUPPLY CHAIN & MANUFACTURING (3-WAY MATCH)
 * Target Employers: Siemens, Bosch Mittelstand, Festo, Schaeffler
 */

(function(global) {
  'use strict';

  const SupplyFixtures = {
    domainId: 'supply',
    scenarios: {
      scenario_a: {
        id: 'scenario_a',
        name: 'Clean 3-Way Triad Reconciliation',
        badge: 'Clean Pass',
        expectedResult: 'PASS',
        summary: 'Purchase Order, Delivery Receipt, and Commercial Invoice match 100% on SKUs, received quantities, and agreed unit price caps.',
        document: {
          po: {
            poNumber: 'PO-SIEMENS-2026-901',
            supplier: 'Festo Pneumatics & Controls GmbH',
            date: '2026-09-20',
            currency: 'EUR',
            items: [
              { sku: 'FESTO-PNEU-V01', description: 'Directional Proportional Solenoid Valve', quantity: 100, unitPrice: 45.00 }
            ]
          },
          deliveryNote: {
            deliveryNumber: 'LS-FESTO-88301',
            poNumber: 'PO-SIEMENS-2026-901',
            date: '2026-10-05',
            items: [
              { sku: 'FESTO-PNEU-V01', receivedQuantity: 100 }
            ]
          },
          invoice: {
            invoiceNumber: 'RE-FESTO-44021',
            poNumber: 'PO-SIEMENS-2026-901',
            deliveryNumber: 'LS-FESTO-88301',
            date: '2026-10-08',
            items: [
              { sku: 'FESTO-PNEU-V01', billedQuantity: 100, billedUnitPrice: 45.00, declaredTotal: 4500.00 }
            ]
          }
        }
      },
      scenario_b: {
        id: 'scenario_b',
        name: 'Short Shipment Overbilling (20 Units Deficit)',
        badge: 'Math Trap',
        expectedResult: 'FAIL',
        summary: 'Vendor invoiced for the entire order of 100 units (€4,500.00), but warehouse goods receipt acknowledges only 80 units delivered. Blocked under HGB § 377.',
        document: {
          po: {
            poNumber: 'PO-SIEMENS-2026-902',
            supplier: 'Bosch Rexroth Industrial Drives AG',
            date: '2026-09-25',
            currency: 'EUR',
            items: [
              { sku: 'BOSCH-SERVO-M02', description: 'Synchronous Servo Motor 4.5kW', quantity: 100, unitPrice: 120.00 }
            ]
          },
          deliveryNote: {
            deliveryNumber: 'LS-BOSCH-77192',
            poNumber: 'PO-SIEMENS-2026-902',
            date: '2026-10-10',
            items: [
              { sku: 'BOSCH-SERVO-M02', receivedQuantity: 80 } // Short shipment: 20 units missing
            ]
          },
          invoice: {
            invoiceNumber: 'RE-BOSCH-33109',
            poNumber: 'PO-SIEMENS-2026-902',
            deliveryNumber: 'LS-BOSCH-77192',
            date: '2026-10-12',
            items: [
              { sku: 'BOSCH-SERVO-M02', billedQuantity: 100, billedUnitPrice: 120.00, declaredTotal: 12000.00 } // Invoiced for full 100!
            ]
          }
        }
      },
      scenario_c: {
        id: 'scenario_c',
        name: 'Unauthorized Price Hike (+€15.00/unit)',
        badge: 'Legal / Contract',
        expectedResult: 'FAIL',
        summary: 'Vendor billed €60.00/unit when agreed PO contract price was fixed at €45.00/unit, generating an unapproved €1,500.00 price variance.',
        document: {
          po: {
            poNumber: 'PO-SIEMENS-2026-903',
            supplier: 'Schaeffler Precision Bearings SE',
            date: '2026-10-01',
            currency: 'EUR',
            items: [
              { sku: 'SCHAEFFLER-BRG-88', description: 'High-Load Angular Contact Ball Bearing', quantity: 100, unitPrice: 45.00 }
            ]
          },
          deliveryNote: {
            deliveryNumber: 'LS-SCHAEFFLER-1029',
            poNumber: 'PO-SIEMENS-2026-903',
            date: '2026-10-14',
            items: [
              { sku: 'SCHAEFFLER-BRG-88', receivedQuantity: 100 }
            ]
          },
          invoice: {
            invoiceNumber: 'RE-SCHAEFFLER-5592',
            poNumber: 'PO-SIEMENS-2026-903',
            deliveryNumber: 'LS-SCHAEFFLER-1029',
            date: '2026-10-16',
            items: [
              { sku: 'SCHAEFFLER-BRG-88', billedQuantity: 100, billedUnitPrice: 60.00, declaredTotal: 6000.00 } // Price hike +15.00/unit
            ]
          }
        }
      }
    }
  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = SupplyFixtures;
  } else {
    global.Haulitz = global.Haulitz || {};
    global.Haulitz.Fixtures = global.Haulitz.Fixtures || {};
    global.Haulitz.Fixtures.supply = SupplyFixtures;
  }
})(typeof window !== 'undefined' ? window : globalThis);
