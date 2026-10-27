/**
 * HAULITZ FIXTURES: DOMAIN 06 - HEALTHTECH & MEDICAL ADMIN (GOÄ)
 * Target Employers: CompuGroup Medical, Doctolib, Dedalus, Medatixx
 */

(function(global) {
  'use strict';

  const HealthtechFixtures = {
    domainId: 'healthtech',
    scenarios: {
      scenario_a: {
        id: 'scenario_a',
        name: 'Clean GOÄ Liquidation (Standard Multipliers)',
        badge: 'Clean Pass',
        expectedResult: 'PASS',
        summary: 'Statutory private medical invoice adhering to GOÄ fee schedule rules with compliant 2.3x standard multipliers and exact line item totals.',
        document: {
          invoiceNumber: 'GOAE-2026-8812',
          patientId: 'PAT-DE-9921',
          physician: 'Prof. Dr. med. Christian von Berg',
          clinic: 'Zentrum für Innere Medizin & Kardiologie München',
          treatmentDate: '2026-10-12',
          items: [
            { code: 'GOÄ-1', description: 'Beratung - auch mittels Fernsprecher', baseFee: 4.66, multiplier: 2.3, declaredTotal: 10.72, hasJustification: true },
            { code: 'GOÄ-7', description: 'Vollständige Untersuchung mindestens eines Organsystems', baseFee: 9.33, multiplier: 2.3, declaredTotal: 21.46, hasJustification: true },
            { code: 'GOÄ-651', description: 'Elektrokardiographische Untersuchung in Ruhe (12-Kanal-EKG)', baseFee: 14.57, multiplier: 2.3, declaredTotal: 33.51, hasJustification: true },
            { code: 'GOÄ-415', description: 'Ultraschalluntersuchung Echokardiographie', baseFee: 46.63, multiplier: 2.3, declaredTotal: 107.25, hasJustification: true }
          ],
          totalClaimed: 172.94,
          statutoryRule: 'GOÄ § 5 Abs. 2 (Regelhöchstsatz 2,3x)'
        }
      },
      scenario_b: {
        id: 'scenario_b',
        name: 'Arithmetic Calculation Trap in Line Math',
        badge: 'Math Trap',
        expectedResult: 'FAIL',
        summary: 'Line item math discrepancy where ultrasound code GOÄ-415 was billed as €157.25 instead of the calculated €107.25 (€50.00 calculation error).',
        document: {
          invoiceNumber: 'GOAE-2026-8813',
          patientId: 'PAT-DE-9922',
          physician: 'Dr. med. Ursula Krause',
          clinic: 'Praxisklinik Radiologie Berlin-Mitte',
          treatmentDate: '2026-10-14',
          items: [
            { code: 'GOÄ-1', description: 'Symptombezogene Untersuchung', baseFee: 4.66, multiplier: 2.3, declaredTotal: 10.72, hasJustification: true },
            { code: 'GOÄ-415', description: 'Duplex-Sonographie abdomineller Gefäße', baseFee: 46.63, multiplier: 2.3, declaredTotal: 157.25, hasJustification: true } // Arithmetic trap: declared is 157.25 instead of 107.25
          ],
          totalClaimed: 167.97,
          statutoryRule: 'GOÄ § 12 Rechnungslegung'
        }
      },
      scenario_c: {
        id: 'scenario_c',
        name: 'Unjustified 3.5x Multiplier Ceiling Breach',
        badge: 'Legal / Multiplier',
        expectedResult: 'FAIL',
        summary: 'Physician applied the absolute statutory ceiling of 3.5x on neurological diagnostic code GOÄ-800 without the mandatory written medical justification report.',
        document: {
          invoiceNumber: 'GOAE-2026-8814',
          patientId: 'PAT-DE-9923',
          physician: 'Dr. med. Heinrich Bauer',
          clinic: 'Neurologische Fachpraxis Frankfurt am Main',
          treatmentDate: '2026-10-16',
          disputedCode: 'GOÄ-800',
          appliedMultiplier: 3.5,
          items: [
            { code: 'GOÄ-800', description: 'Eingehende neurologische Untersuchung', baseFee: 15.15, multiplier: 3.5, declaredTotal: 53.03, hasJustification: false }, // No justification!
            { code: 'GOÄ-825', description: 'Elektromyographische Untersuchung (EMG)', baseFee: 26.23, multiplier: 3.5, declaredTotal: 91.81, hasJustification: false }
          ],
          totalClaimed: 144.84,
          statutoryRule: 'GOÄ § 5 Abs. 2 i.V.m. § 12 Abs. 3'
        }
      }
    }
  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = HealthtechFixtures;
  } else {
    global.Haulitz = global.Haulitz || {};
    global.Haulitz.Fixtures = global.Haulitz.Fixtures || {};
    global.Haulitz.Fixtures.healthtech = HealthtechFixtures;
  }
})(typeof window !== 'undefined' ? window : globalThis);
