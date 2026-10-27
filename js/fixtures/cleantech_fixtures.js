/**
 * HAULITZ FIXTURES: DOMAIN 08 - CLEANTECH & RENEWABLE ENERGY
 * Target Employers: 1Komma5°, Enpal, EnBW, SMA Solar, Sonnen
 */

(function(global) {
  'use strict';

  const CleantechFixtures = {
    domainId: 'cleantech',
    scenarios: {
      scenario_a: {
        id: 'scenario_a',
        name: 'Clean PV Grid Connection Application',
        badge: 'Clean Pass',
        expectedResult: 'PASS',
        summary: 'Fully compliant solar photovoltaic installation dossier with verified DC string math and AC inverter output within utility grid connection limits.',
        document: {
          projectId: 'PV-CLEAN-2026-701',
          installationSite: 'Sonnenallee 42, 79100 Freiburg, Germany',
          gridOperator: 'Netze BW GmbH',
          contractor: '1Komma5° Solar Operations GmbH',
          panelsKwp: 22.5,
          inverterKw: 20.0,
          gridCapKw: 25.0, // Inverter 20kW <= Grid 25kW
          stringCount: 4,
          modulesPerString: 14,
          stringVoltageV: 560.0,
          stringCurrentA: 10.0,
          declaredDcPowerKw: 22.4,
          statutoryStandard: 'VDE-AR-N 4105 (Erzeugungsanlagen am Niederspannungsnetz)'
        }
      },
      scenario_b: {
        id: 'scenario_b',
        name: 'DC String Wattage Math Discrepancy Trap',
        badge: 'Math Trap',
        expectedResult: 'FAIL',
        summary: 'Electrical engineering discrepancy where calculated string wattage (4 strings * 560V * 10A = 22.4 kW) does not match declared DC input (25.5 kW, a 3.1 kW delta).',
        document: {
          projectId: 'PV-CLEAN-2026-702',
          installationSite: 'Gewerbegebiet Süd 18, 86150 Augsburg, Germany',
          gridOperator: 'Lechwerke Verteilnetz GmbH',
          contractor: 'Enpal Photovoltaik Montage GmbH',
          panelsKwp: 25.5,
          inverterKw: 20.0,
          gridCapKw: 30.0,
          stringCount: 4,
          modulesPerString: 14,
          stringVoltageV: 560.0,
          stringCurrentA: 10.0,
          calculatedDcPowerKw: 22.4,
          declaredDcPowerKw: 25.5, // Math trap: 3.1 kW mismatch!
          statutoryStandard: 'DIN EN 62446-1 (Photovoltaik-Systeme Prüfanforderungen)'
        }
      },
      scenario_c: {
        id: 'scenario_c',
        name: 'Inverter Peak Grid Capacity Overage (VDE Breach)',
        badge: 'Legal / Grid Cap',
        expectedResult: 'FAIL',
        summary: 'Contractor installed a 25.0 kW AC inverter on a house service connection limited by the utility to 18.0 kW, exceeding legal feed-in limits by 7.0 kW without EnFluRi protection.',
        document: {
          projectId: 'PV-CLEAN-2026-703',
          installationSite: 'Waldweg 7, 72070 Tübingen, Germany',
          gridOperator: 'Stadtwerke Tübingen GmbH',
          contractor: 'SolarCraft Süd GmbH',
          panelsKwp: 28.4,
          inverterKw: 25.0, // Exceeds 18.0 kW grid cap!
          gridCapKw: 18.0,
          stringCount: 4,
          modulesPerString: 16,
          stringVoltageV: 640.0,
          stringCurrentA: 11.0,
          declaredDcPowerKw: 28.16,
          statutoryStandard: 'VDE-AR-N 4105 Einspeisebegrenzung'
        }
      }
    }
  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = CleantechFixtures;
  } else {
    global.Haulitz = global.Haulitz || {};
    global.Haulitz.Fixtures = global.Haulitz.Fixtures || {};
    global.Haulitz.Fixtures.cleantech = CleantechFixtures;
  }
})(typeof window !== 'undefined' ? window : globalThis);
