/**
 * HAULITZ VERIFICATION GATEWAY - DETERMINISTIC ARITHMETIC ENGINES
 * Standard: ASD-STE100 Simplified Technical English
 * 
 * Verifications implemented:
 * 1. Line-Item Product Verification (Quantity * Unit Price = Total)
 * 2. Statutory German VAT Calculation (§ 14 UStG - 19% standard, 7% reduced)
 * 3. Commercial Mass Law (§ 412 HGB - Gross Weight >= Net Weight)
 * 4. Heating Cost Apportionment (HeizkostenV § 7 - 70/30 or 50/50 consumption/area)
 * 5. Medical Fee Schedule Multiplier (GOÄ § 5 / § 12 - 2.3x standard ceiling)
 * 6. Photovoltaic Grid Inverter Capacity (VDE-AR-N 4105 - String Wattage vs Grid Service)
 */

(function(global) {
  'use strict';

  const Arithmetic = {};

  /**
   * Helper: Round float to 2 decimal places with banker's / financial precision
   */
  function roundToCents(amount) {
    return Math.round((amount + Number.EPSILON) * 100) / 100;
  }

  /**
   * Line Item Verification
   * @param {Array<Object>} items - Array of { description, quantity, unitPrice, declaredTotal }
   * @returns {Object} Verification results with item-by-item breakdown
   */
  Arithmetic.verifyLineItems = function(items) {
    if (!Array.isArray(items) || items.length === 0) {
      return {
        isValid: false,
        totalItems: 0,
        calculatedSubtotal: 0,
        declaredSubtotal: 0,
        discrepancies: [],
        error: 'No line items provided'
      };
    }

    let calculatedSubtotal = 0;
    let declaredSubtotal = 0;
    const itemResults = [];
    const discrepancies = [];

    items.forEach((item, idx) => {
      const qty = parseFloat(item.quantity) || 0;
      const price = parseFloat(item.unitPrice) || 0;
      const declared = parseFloat(item.declaredTotal) || 0;

      const calculated = roundToCents(qty * price);
      const delta = roundToCents(declared - calculated);
      const isMatch = Math.abs(delta) <= 0.01;

      calculatedSubtotal = roundToCents(calculatedSubtotal + calculated);
      declaredSubtotal = roundToCents(declaredSubtotal + declared);

      const result = {
        index: idx + 1,
        description: item.description || `Item #${idx + 1}`,
        quantity: qty,
        unitPrice: price,
        declaredTotal: declared,
        calculatedTotal: calculated,
        delta,
        isValid: isMatch
      };

      itemResults.push(result);
      if (!isMatch) {
        discrepancies.push(result);
      }
    });

    const subtotalDelta = roundToCents(declaredSubtotal - calculatedSubtotal);

    return {
      isValid: discrepancies.length === 0 && Math.abs(subtotalDelta) <= 0.01,
      totalItems: items.length,
      calculatedSubtotal,
      declaredSubtotal,
      subtotalDelta,
      itemResults,
      discrepancies
    };
  };

  /**
   * Statutory German VAT Verification (§ 14 UStG)
   * @param {number} declaredSubtotal - Net amount in EUR
   * @param {number} declaredTax - Tax amount in EUR
   * @param {number} declaredGross - Gross total in EUR
   * @param {number} vatRate - Standard 0.19 (19%) or reduced 0.07 (7%)
   * @returns {Object} VAT audit result
   */
  Arithmetic.verifyGermanVAT = function(declaredSubtotal, declaredTax, declaredGross, vatRate = 0.19) {
    const net = parseFloat(declaredSubtotal) || 0;
    const tax = parseFloat(declaredTax) || 0;
    const gross = parseFloat(declaredGross) || 0;

    const expectedTax = roundToCents(net * vatRate);
    const expectedGross = roundToCents(net + expectedTax);

    const taxDelta = roundToCents(tax - expectedTax);
    const grossDelta = roundToCents(gross - expectedGross);

    const isTaxValid = Math.abs(taxDelta) <= 0.01;
    const isGrossValid = Math.abs(grossDelta) <= 0.01;

    return {
      isValid: isTaxValid && isGrossValid,
      isTaxValid,
      isGrossValid,
      declaredSubtotal: net,
      declaredTax: tax,
      declaredGross: gross,
      expectedTax,
      expectedGross,
      taxDelta,
      grossDelta,
      vatRatePercent: vatRate * 100
    };
  };

  /**
   * Mass Law Verification (§ 412 HGB)
   * Enforces that Gross Weight must be greater than or equal to Net Weight
   * @param {number} grossKg - Declared gross mass in kg
   * @param {number} netKg - Declared net mass in kg
   * @param {number} tareKg - Declared or calculated tare in kg
   * @returns {Object} Mass law audit result
   */
  Arithmetic.verifyMassLaw = function(grossKg, netKg, tareKg = 0) {
    const gross = parseFloat(grossKg) || 0;
    const net = parseFloat(netKg) || 0;
    const tare = parseFloat(tareKg) || 0;

    const expectedMinGross = roundToCents(net + tare);
    const isValid = gross >= net && (tare === 0 || gross >= expectedMinGross - 0.5);

    return {
      isValid,
      grossKg: gross,
      netKg: net,
      tareKg: tare,
      expectedMinGross,
      weightDeficit: isValid ? 0 : roundToCents(net - gross),
      rule: '§ 412 HGB (Gross Mass >= Net Mass + Tare)'
    };
  };

  /**
   * German Heating Cost Apportionment (HeizkostenV § 7)
   * Statutory rule: 70% based on measured consumption, 30% based on square meters
   * @param {number} totalCost - Total heating bill for the building
   * @param {number} tenantM2 - Area of tenant apartment
   * @param {number} totalM2 - Total area of the building
   * @param {number} tenantUnits - Units measured by tenant meter
   * @param {number} totalUnits - Total units across building meters
   * @param {number} declaredTenantShare - What landlord billed
   * @param {string} splitRatio - "70/30" (statutory) or "50/50" (conditional/invalid)
   * @returns {Object} Apportionment audit result
   */
  Arithmetic.verifyHeatingApportionment = function(totalCost, tenantM2, totalM2, tenantUnits, totalUnits, declaredTenantShare, splitRatio = "70/30") {
    const total = parseFloat(totalCost) || 0;
    const tArea = parseFloat(tenantM2) || 0;
    const bArea = parseFloat(totalM2) || 1;
    const tUnits = parseFloat(tenantUnits) || 0;
    const bUnits = parseFloat(totalUnits) || 1;
    const billed = parseFloat(declaredTenantShare) || 0;

    let consumptionFactor = 0.70;
    let areaFactor = 0.30;
    let isSplitStatutory = true;

    if (splitRatio === "50/50") {
      consumptionFactor = 0.50;
      areaFactor = 0.50;
      isSplitStatutory = false; // Flag potential violation under standard residential HeizkostenV
    }

    const consumptionPool = total * consumptionFactor;
    const areaPool = total * areaFactor;

    const tenantConsumptionCost = consumptionPool * (tUnits / bUnits);
    const tenantAreaCost = areaPool * (tArea / bArea);
    const statutoryTenantShare = roundToCents(tenantConsumptionCost + tenantAreaCost);

    const delta = roundToCents(billed - statutoryTenantShare);
    const isMathValid = Math.abs(delta) <= 0.05;

    return {
      isValid: isMathValid && isSplitStatutory,
      isMathValid,
      isSplitStatutory,
      statutoryTenantShare,
      billedTenantShare: billed,
      delta,
      consumptionCost: roundToCents(tenantConsumptionCost),
      areaCost: roundToCents(tenantAreaCost),
      splitUsed: splitRatio,
      expectedSplit: "70/30",
      rule: 'Heizkostenverordnung (HeizkostenV) § 7'
    };
  };

  /**
   * German Medical Fee Schedule Multiplier Audit (GOÄ § 5 / § 12)
   * Standard threshold is 2.3x. Multipliers up to 3.5x require written medical justification.
   * Multipliers above 3.5x require formal prior written agreement.
   * @param {Array<Object>} medicalItems - Array of { code, description, points, baseFee, multiplier, declaredTotal, hasJustification }
   * @returns {Object} Fee schedule audit result
   */
  Arithmetic.verifyGOAFees = function(medicalItems) {
    if (!Array.isArray(medicalItems) || medicalItems.length === 0) {
      return { isValid: false, discrepancies: [], error: 'No medical items provided' };
    }

    const itemResults = [];
    const discrepancies = [];
    let totalApproved = 0;
    let totalDeclared = 0;

    medicalItems.forEach((item, idx) => {
      const base = parseFloat(item.baseFee) || 0;
      const mult = parseFloat(item.multiplier) || 1.0;
      const declared = parseFloat(item.declaredTotal) || 0;
      const justified = Boolean(item.hasJustification);

      let allowedMultiplier = 2.3;
      let status = 'APPROVED_STANDARD';

      if (mult > 3.5) {
        status = 'EXCEEDS_MAX_LEGAL_CEILING';
      } else if (mult > 2.3) {
        if (justified) {
          status = 'APPROVED_JUSTIFIED_COMPLEXITY';
          allowedMultiplier = mult;
        } else {
          status = 'REJECTED_UNJUSTIFIED_MULTIPLIER';
          allowedMultiplier = 2.3; // Default to statutory cap without doctor justification
        }
      } else {
        allowedMultiplier = mult;
      }

      const approvedTotal = roundToCents(base * allowedMultiplier);
      const isCompliant = (mult <= 2.3) || (mult <= 3.5 && justified);

      totalApproved = roundToCents(totalApproved + approvedTotal);
      totalDeclared = roundToCents(totalDeclared + declared);

      const result = {
        index: idx + 1,
        code: item.code,
        description: item.description,
        baseFee: base,
        appliedMultiplier: mult,
        allowedMultiplier,
        declaredTotal: declared,
        approvedTotal,
        overchargeDelta: roundToCents(declared - approvedTotal),
        hasJustification: justified,
        status,
        isValid: isCompliant && Math.abs(declared - approvedTotal) <= 0.02
      };

      itemResults.push(result);
      if (!result.isValid) {
        discrepancies.push(result);
      }
    });

    return {
      isValid: discrepancies.length === 0,
      totalDeclared,
      totalApproved,
      totalOvercharge: roundToCents(totalDeclared - totalApproved),
      itemResults,
      discrepancies,
      rule: 'Gebührenordnung für Ärzte (GOÄ) § 5 Abs. 2 / § 12'
    };
  };

  /**
   * Photovoltaic Grid Inverter Capacity Verification (VDE-AR-N 4105)
   * Enforces that Inverter Peak AC Capacity (kW) must not exceed Local Grid Service Connection Cap (kW)
   * @param {number} panelsKwp - Solar panel peak capacity (kWp)
   * @param {number} inverterKw - Inverter maximum AC output (kW)
   * @param {number} gridCapKw - Local utility grid connection allowance (kW)
   * @returns {Object} VDE compliance audit result
   */
  Arithmetic.verifyInverterGridCapacity = function(panelsKwp, inverterKw, gridCapKw) {
    const panels = parseFloat(panelsKwp) || 0;
    const inverter = parseFloat(inverterKw) || 0;
    const grid = parseFloat(gridCapKw) || 0;

    const overageKw = roundToCents(Math.max(0, inverter - grid));
    const isValid = inverter <= grid;

    return {
      isValid,
      panelsKwp: panels,
      inverterKw: inverter,
      gridCapKw: grid,
      overageKw,
      inverterRatio: roundToCents(panels > 0 ? inverter / panels : 0),
      rule: 'VDE-AR-N 4105 Erzeugungsanlagen am Niederspannungsnetz'
    };
  };

  // Expose to browser window or CommonJS
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = Arithmetic;
  } else {
    global.Haulitz = global.Haulitz || {};
    global.Haulitz.Arithmetic = Arithmetic;
  }
})(typeof window !== 'undefined' ? window : globalThis);
