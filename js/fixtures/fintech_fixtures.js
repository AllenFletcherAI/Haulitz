/**
 * HAULITZ FIXTURES: DOMAIN 01 - FINTECH & CORPORATE INVOICING
 * Target Employers: Pleo, Moss, Billie, Personio, Taxfix
 */

(function(global) {
  'use strict';

  const FintechFixtures = {
    domainId: 'fintech',
    scenarios: {
      scenario_a: {
        id: 'scenario_a',
        name: 'Clean Vendor Invoice (Compliant)',
        badge: 'Clean Pass',
        expectedResult: 'PASS',
        summary: 'Fully compliant German vendor invoice with matching 19% VAT, exact line item cross-sums, and valid SEPA IBAN.',
        document: {
          invoiceNumber: 'INV-DE-2026-8841',
          issueDate: '2026-10-15',
          dueDate: '2026-11-14',
          supplierName: 'Siemens Energy Logistics GmbH',
          supplierAddress: 'Otto-Hahn-Ring 6, 81739 München, Germany',
          supplierTaxId: 'DE 129 274 202',
          customerName: 'Haulitz Industrial Gateway AG',
          iban: 'DE89370400440532013000',
          bic: 'COBADEFFXXX',
          currency: 'EUR',
          vatRate: 0.19,
          items: [
            { description: 'Cloud Infrastructure Gateway Node (Monthly)', quantity: 2, unitPrice: 1250.00, declaredTotal: 2500.00 },
            { description: 'Dedicated GoBD § 147 AO Ledger Vault', quantity: 1, unitPrice: 850.00, declaredTotal: 850.00 },
            { description: 'Enterprise SLA Tier-1 24/7 Support', quantity: 1, unitPrice: 650.00, declaredTotal: 650.00 }
          ],
          subtotalNet: 4000.00,
          taxAmount: 760.00,
          grossTotal: 4760.00
        }
      },
      scenario_b: {
        id: 'scenario_b',
        name: 'Arithmetic Trap (€120.00 VAT Variance)',
        badge: 'Math Trap',
        expectedResult: 'FAIL',
        summary: 'Vendor invoice where the stated VAT is €640.00 instead of statutory 19% (€760.00), creating an immediate €120.00 tax audit liability under § 14 UStG.',
        document: {
          invoiceNumber: 'INV-DE-2026-8842',
          issueDate: '2026-10-16',
          dueDate: '2026-11-15',
          supplierName: 'Bavaria Cloud Solutions GmbH',
          supplierAddress: 'Leopoldstraße 140, 80804 München, Germany',
          supplierTaxId: 'DE 814 992 110',
          customerName: 'Haulitz Industrial Gateway AG',
          iban: 'DE89370400440532013000',
          bic: 'COBADEFFXXX',
          currency: 'EUR',
          vatRate: 0.19,
          items: [
            { description: 'Enterprise Data Lake Cluster (Monthly)', quantity: 2, unitPrice: 1500.00, declaredTotal: 3000.00 },
            { description: 'Kubernetes Ingestion Gateway Ingress', quantity: 1, unitPrice: 1000.00, declaredTotal: 1000.00 }
          ],
          subtotalNet: 4000.00,
          taxAmount: 640.00, // Intentional trap: should be 760.00 EUR (Delta: -120.00 EUR)
          grossTotal: 4640.00
        }
      },
      scenario_c: {
        id: 'scenario_c',
        name: 'Corrupted SEPA IBAN (Modulo-97 Breach)',
        badge: 'Legal / Checksum',
        expectedResult: 'FAIL',
        summary: 'Vendor invoice contains a transposed check digit in the SEPA IBAN (DE89 vs DE88), which would cause automated SAP payment run failure and bank return fees.',
        document: {
          invoiceNumber: 'INV-DE-2026-8843',
          issueDate: '2026-10-17',
          dueDate: '2026-11-16',
          supplierName: 'Hanseatic Telecom Services GmbH',
          supplierAddress: 'Willy-Brandt-Straße 23, 20457 Hamburg, Germany',
          supplierTaxId: 'DE 215 889 001',
          customerName: 'Haulitz Industrial Gateway AG',
          iban: 'DE88370400440532013000', // Corrupted IBAN check digits
          bic: 'HASPDEHHXXX',
          currency: 'EUR',
          vatRate: 0.19,
          items: [
            { description: 'Fibre Optic High-Speed Dark Fiber Link', quantity: 1, unitPrice: 2200.00, declaredTotal: 2200.00 }
          ],
          subtotalNet: 2200.00,
          taxAmount: 418.00,
          grossTotal: 2618.00
        }
      }
    }
  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = FintechFixtures;
  } else {
    global.Haulitz = global.Haulitz || {};
    global.Haulitz.Fixtures = global.Haulitz.Fixtures || {};
    global.Haulitz.Fixtures.fintech = FintechFixtures;
  }
})(typeof window !== 'undefined' ? window : globalThis);
