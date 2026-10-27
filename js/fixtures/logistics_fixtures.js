/**
 * HAULITZ FIXTURES: DOMAIN 02 - FREIGHT & MARITIME LOGISTICS
 * Target Employers: DB Schenker, DHL Global Forwarding, Forto, Kuehne+Nagel
 */

(function(global) {
  'use strict';

  const LogisticsFixtures = {
    domainId: 'logistics',
    scenarios: {
      scenario_a: {
        id: 'scenario_a',
        name: 'Clean Ocean B/L & Packing List',
        badge: 'Clean Pass',
        expectedResult: 'PASS',
        summary: 'Compliant Ocean Bill of Lading with valid ISO 6346 Modulo-11 container checksum (MSCU1234566) and physical mass law compliance.',
        document: {
          bolNumber: 'MEDU-HAM-994012',
          bookingNumber: 'BKG-2026-8819',
          carrier: 'Mediterranean Shipping Company (MSC)',
          vessel: 'MSC GÜLSÜN / Voyage 264E',
          portOfLoading: 'Shanghai (CNSHA)',
          portOfDischarge: 'Hamburg (DEHAM)',
          containerNumber: 'MSCU1234566', // Valid ISO 6346 check digit (6)
          sealNumber: 'EU9940128',
          isoSize: '40HC',
          grossWeightKg: 19450,
          netWeightKg: 16800,
          tareWeightKg: 2650,
          incoterms: 'FOB Shanghai (Incoterms 2020)',
          hsCode: '8471.50.00',
          cargoDescription: 'Industrial Automation Processing Units'
        }
      },
      scenario_b: {
        id: 'scenario_b',
        name: 'Mass Law Deficit Trap (§ 412 HGB)',
        badge: 'Math Trap',
        expectedResult: 'FAIL',
        summary: 'Critical mass deficit where declared Gross Weight (14,200 kg) is lower than Net Weight (16,800 kg), in direct violation of German Commercial Code § 412 HGB.',
        document: {
          bolNumber: 'MEDU-HAM-994013',
          bookingNumber: 'BKG-2026-8820',
          carrier: 'Hapag-Lloyd AG',
          vessel: 'HAMBURG EXPRESS / Voyage 119W',
          portOfLoading: 'Ningbo (CNNGB)',
          portOfDischarge: 'Rotterdam (NLRTM)',
          containerNumber: 'HLXU3249112', // Valid container checksum (isolating weight trap)
          sealNumber: 'HL8812903',
          isoSize: '40GP',
          grossWeightKg: 14200, // Deficit trap: gross must exceed net
          netWeightKg: 16800,
          tareWeightKg: 3800,
          incoterms: 'CIF Rotterdam (Incoterms 2020)',
          hsCode: '8504.40.90',
          cargoDescription: 'Solid State Inverter Assemblies'
        }
      },
      scenario_c: {
        id: 'scenario_c',
        name: 'Invalid ISO 6346 Container Checksum',
        badge: 'Legal / Checksum',
        expectedResult: 'FAIL',
        summary: 'Container serial number declared as MSCU1234560 where calculated Modulo-11 check digit is 7. Quarantined to avoid terminal demurrage fees (€250/day).',
        document: {
          bolNumber: 'MEDU-HAM-994014',
          bookingNumber: 'BKG-2026-8821',
          carrier: 'Maersk Line A/S',
          vessel: 'MADRID MAERSK / Voyage 261W',
          portOfLoading: 'Singapore (SGSIN)',
          portOfDischarge: 'Hamburg (DEHAM)',
          containerNumber: 'MSCU1234560', // Corrupted check digit (0 instead of 7)
          sealNumber: 'MSK0049102',
          isoSize: '40HC',
          grossWeightKg: 22100,
          netWeightKg: 19800,
          tareWeightKg: 2300,
          incoterms: 'DAP Hamburg (Incoterms 2020)',
          hsCode: '8479.89.97',
          cargoDescription: 'Robotic Pick-and-Place Arms'
        }
      }
    }
  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = LogisticsFixtures;
  } else {
    global.Haulitz = global.Haulitz || {};
    global.Haulitz.Fixtures = global.Haulitz.Fixtures || {};
    global.Haulitz.Fixtures.logistics = LogisticsFixtures;
  }
})(typeof window !== 'undefined' ? window : globalThis);
