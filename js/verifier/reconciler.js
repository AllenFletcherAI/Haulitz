/**
 * HAULITZ VERIFICATION GATEWAY - 3-WAY RECONCILIATION ENGINE
 * Standard: ASD-STE100 Simplified Technical English
 * 
 * Verifies the enterprise triad:
 * 1. Purchase Order (PO - Agreed Commercial Terms)
 * 2. Delivery Note / Goods Receipt (Lieferschein - Physically Received Goods)
 * 3. Commercial Invoice (Rechnung - Supplier Payment Demand)
 * 
 * Protects ERP staging against:
 * - Overbilling for unreceived short shipments (HGB § 377)
 * - Unauthorized price inflation above agreed PO terms
 * - Phantom line items not in original PO
 */

(function(global) {
  'use strict';

  const Reconciler = {};

  function roundCents(val) {
    return Math.round((val + Number.EPSILON) * 100) / 100;
  }

  /**
   * Run 3-Way Reconciliation Matrix
   * @param {Object} po - Purchase Order { poNumber, supplier, date, currency, items: [{ sku, description, quantity, unitPrice }] }
   * @param {Object} deliveryNote - Delivery Note { deliveryNumber, poNumber, date, items: [{ sku, receivedQuantity }] }
   * @param {Object} invoice - Commercial Invoice { invoiceNumber, poNumber, deliveryNumber, date, items: [{ sku, billedQuantity, billedUnitPrice, declaredTotal }] }
   * @returns {Object} Structured reconciliation report with item matrix
   */
  Reconciler.reconcileThreeWay = function(po, deliveryNote, invoice) {
    if (!po || !deliveryNote || !invoice) {
      return {
        isValid: false,
        status: 'MISSING_DOCUMENTS',
        discrepancies: ['One or more required triad documents (PO, Delivery Note, Invoice) are missing.'],
        matrix: []
      };
    }

    const discrepancies = [];
    const matrix = [];
    let isClean = true;

    // Header reference checks
    const poRefMatch = (deliveryNote.poNumber === po.poNumber) && (invoice.poNumber === po.poNumber);
    if (!poRefMatch) {
      discrepancies.push(`PO Reference mismatch: PO=${po.poNumber}, Delivery=${deliveryNote.poNumber}, Invoice=${invoice.poNumber}`);
      isClean = false;
    }

    // Build lookup maps
    const poMap = new Map();
    (po.items || []).forEach(it => poMap.set(it.sku, it));

    const deliveryMap = new Map();
    (deliveryNote.items || []).forEach(it => deliveryMap.set(it.sku, it));

    // Audit each invoiced line item against PO and Goods Receipt
    (invoice.items || []).forEach((invItem, idx) => {
      const sku = invItem.sku;
      const poItem = poMap.get(sku);
      const delItem = deliveryMap.get(sku);

      const orderedQty = poItem ? parseFloat(poItem.quantity) || 0 : 0;
      const orderedPrice = poItem ? parseFloat(poItem.unitPrice) || 0 : 0;
      const receivedQty = delItem ? parseFloat(delItem.receivedQuantity) || 0 : 0;
      const billedQty = parseFloat(invItem.billedQuantity) || 0;
      const billedPrice = parseFloat(invItem.billedUnitPrice) || 0;
      const declaredLineTotal = parseFloat(invItem.declaredTotal) || roundCents(billedQty * billedPrice);

      let itemStatus = 'VERIFIED_MATCH';
      const itemIssues = [];

      // Check 1: SKU existence in PO
      if (!poItem) {
        itemStatus = 'UNAUTHORIZED_SKU';
        itemIssues.push(`SKU ${sku} does not exist in Purchase Order ${po.poNumber}`);
        isClean = false;
      }

      // Check 2: Quantity Reconciliation (Billed Qty <= Received Qty)
      if (billedQty > receivedQty) {
        itemStatus = 'SHORT_SHIPMENT_OVERBILLING';
        const excess = billedQty - receivedQty;
        itemIssues.push(`Overbilled by ${excess} units: Supplier billed ${billedQty}, warehouse received only ${receivedQty}`);
        isClean = false;
      }

      // Check 3: Price Reconciliation (Billed Unit Price <= Agreed PO Unit Price)
      if (billedPrice > orderedPrice + 0.001) {
        itemStatus = 'PRICE_INFLATION_DETECTED';
        const priceDelta = roundCents(billedPrice - orderedPrice);
        itemIssues.push(`Unit price hike: Invoiced at €${billedPrice.toFixed(2)}, agreed PO cap was €${orderedPrice.toFixed(2)} (+€${priceDelta.toFixed(2)}/unit)`);
        isClean = false;
      }

      const row = {
        index: idx + 1,
        sku,
        description: invItem.description || poItem?.description || 'N/A',
        orderedQty,
        receivedQty,
        billedQty,
        orderedPrice,
        billedPrice,
        declaredLineTotal,
        expectedLineTotal: roundCents(Math.min(billedQty, receivedQty) * Math.min(billedPrice, orderedPrice)),
        financialDelta: roundCents(declaredLineTotal - (Math.min(billedQty, receivedQty) * Math.min(billedPrice, orderedPrice))),
        status: itemStatus,
        issues: itemIssues,
        isValid: itemIssues.length === 0
      };

      matrix.push(row);
      if (itemIssues.length > 0) {
        discrepancies.push(...itemIssues);
      }
    });

    // Check for goods received but completely unbilled
    (deliveryNote.items || []).forEach(delItem => {
      const isBilled = invoice.items.some(inv => inv.sku === delItem.sku);
      if (!isBilled) {
        discrepancies.push(`Received SKU ${delItem.sku} (${delItem.receivedQuantity} units) not billed on invoice.`);
      }
    });

    return {
      isValid: isClean,
      status: isClean ? 'RECONCILIATION_PASSED' : 'RECONCILIATION_FAILED',
      poNumber: po.poNumber,
      deliveryNumber: deliveryNote.deliveryNumber,
      invoiceNumber: invoice.invoiceNumber,
      supplier: po.supplier,
      discrepancies,
      matrix,
      totalLines: matrix.length,
      statutoryReference: 'Handelsgesetzbuch (HGB) § 377 Rügeobliegenheit'
    };
  };

  // Expose to browser window or CommonJS
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = Reconciler;
  } else {
    global.Haulitz = global.Haulitz || {};
    global.Haulitz.Reconciler = Reconciler;
  }
})(typeof window !== 'undefined' ? window : globalThis);
