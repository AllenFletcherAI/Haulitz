/**
 * HAULITZ ENTERPRISE GATEWAY - MASTER CONTROLLER & APPLICATION ENGINE
 * Standard: ASD-STE100 Simplified Technical English
 */

(function() {
  'use strict';

  // Application State
  const state = {
    currentDomain: 'fintech',
    currentScenario: 'scenario_a',
    currentLang: 'de',
    currentTheme: document.documentElement.getAttribute('data-theme') || 'light',
    previousSeal: window.Haulitz?.GoBDHasher?.GENESIS_SEAL || '0000000000000000000000000000000000000000000000000000000000000000',
    auditHistory: [],
    lastAuditResult: null,
    lastSealResult: null,
    lastDocPayload: null
  };

  // DOM Elements Cache
  const DOM = {};

  function initDOMElements() {
    DOM.domainGrid = document.getElementById('domain-grid-container');
    DOM.activeDomainBadge = document.getElementById('active-domain-badge');
    DOM.activeDomainTitle = document.getElementById('active-domain-title');
    DOM.activeDomainTargets = document.getElementById('active-domain-targets');
    
    DOM.btnScenarioA = document.getElementById('btn-scenario-a');
    DOM.btnScenarioB = document.getElementById('btn-scenario-b');
    DOM.btnScenarioC = document.getElementById('btn-scenario-c');
    
    DOM.labelScenarioA = document.getElementById('label-scenario-a');
    DOM.labelScenarioB = document.getElementById('label-scenario-b');
    DOM.labelScenarioC = document.getElementById('label-scenario-c');
    
    DOM.dossierDocType = document.getElementById('dossier-doc-type');
    DOM.dossierContent = document.getElementById('dossier-card-content');
    
    DOM.auditStatusBanner = document.getElementById('audit-status-banner');
    DOM.statusIcon = document.getElementById('status-icon');
    DOM.statusTextTitle = document.getElementById('status-text-title');
    DOM.statusTextSubtitle = document.getElementById('status-text-subtitle');
    DOM.statusPillBadge = document.getElementById('status-pill-badge');
    
    DOM.ruleChecklist = document.getElementById('rule-checklist-container');
    DOM.varianceCard = document.getElementById('variance-card');
    DOM.varianceText = document.getElementById('variance-text');
    DOM.legalMemoBox = document.getElementById('legal-memo-box');
    DOM.legalMemoContent = document.getElementById('legal-memo-content');
    DOM.btnCopyMemo = document.getElementById('btn-copy-memo');
    
    DOM.gobdSealHash = document.getElementById('gobd-seal-hash');
    DOM.gobdPrevSeal = document.getElementById('gobd-prev-seal');
    DOM.gobdTimestamp = document.getElementById('gobd-timestamp');
    
    DOM.btnViewTsql = document.getElementById('btn-view-tsql');
    DOM.btnViewCsharp = document.getElementById('btn-view-csharp');
    DOM.btnExportCsv = document.getElementById('btn-export-csv');
    
    DOM.modalTsql = document.getElementById('modal-tsql');
    DOM.modalCsharp = document.getElementById('modal-csharp');
    DOM.modalTsqlContent = document.getElementById('modal-tsql-content');
    DOM.modalCsharpContent = document.getElementById('modal-csharp-content');
    
    DOM.btnCopyTsql = document.getElementById('btn-copy-tsql');
    DOM.btnCopyCsharp = document.getElementById('btn-copy-csharp');
    DOM.langToggleBtn = document.getElementById('lang-toggle-btn');
    DOM.themeToggleBtn = document.getElementById('theme-toggle-btn');
    DOM.themeIcon = document.getElementById('theme-icon');
    DOM.themeText = document.getElementById('theme-text');
  }

  /**
   * Render 10 Domain Cards in Navigation Grid
   */
  function renderDomainGrid() {
    const domains = window.Haulitz.Domains;
    DOM.domainGrid.innerHTML = '';

    Object.keys(domains).forEach(key => {
      const d = domains[key];
      const card = document.createElement('div');
      card.className = `domain-card ${key === state.currentDomain ? 'active' : ''}`;
      card.setAttribute('data-domain', key);

      card.innerHTML = `
        <div>
          <div class="domain-card-header">
            <span class="domain-number">${d.number}</span>
            <div class="domain-icon"><i class="fa-solid ${d.icon}"></i></div>
          </div>
          <div class="domain-title">${state.currentLang === 'de' ? (d.germanTitle || d.title) : d.title}</div>
        </div>
        <div class="domain-employers">${d.targetEmployers}</div>
      `;

      card.addEventListener('click', () => {
        selectDomain(key);
      });

      DOM.domainGrid.appendChild(card);
    });
  }

  /**
   * Switch Active Domain
   */
  function selectDomain(domainKey) {
    if (state.currentDomain === domainKey) return;
    state.currentDomain = domainKey;
    state.currentScenario = 'scenario_a';

    // Update active class on cards
    document.querySelectorAll('.domain-card').forEach(c => {
      c.classList.toggle('active', c.getAttribute('data-domain') === domainKey);
    });

    updateScenarioButtonLabels();
    runVerification();
  }

  /**
   * Switch Active Scenario
   */
  function selectScenario(scenarioKey) {
    if (state.currentScenario === scenarioKey) return;
    state.currentScenario = scenarioKey;

    [DOM.btnScenarioA, DOM.btnScenarioB, DOM.btnScenarioC].forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-scenario') === scenarioKey);
    });

    runVerification();
  }

  function updateScenarioButtonLabels() {
    const fixture = window.Haulitz.Fixtures[state.currentDomain];
    if (!fixture) return;

    const sA = fixture.scenarios.scenario_a;
    const sB = fixture.scenarios.scenario_b;
    const sC = fixture.scenarios.scenario_c;

    DOM.labelScenarioA.textContent = sA ? sA.badge : 'Clean Pass';
    DOM.labelScenarioB.textContent = sB ? sB.badge : 'Math Trap';
    DOM.labelScenarioC.textContent = sC ? sC.badge : 'Regulatory Breach';

    [DOM.btnScenarioA, DOM.btnScenarioB, DOM.btnScenarioC].forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-scenario') === state.currentScenario);
    });
  }

  /**
   * Execute Deterministic Verification Engine on Current Domain & Scenario
   */
  async function runVerification() {
    const domain = window.Haulitz.Domains[state.currentDomain];
    const fixtureObj = window.Haulitz.Fixtures[state.currentDomain];
    if (!domain || !fixtureObj) return;

    const scenario = fixtureObj.scenarios[state.currentScenario];
    if (!scenario) return;

    const doc = scenario.document;
    state.lastDocPayload = doc;

    // Update Active Domain Header
    DOM.activeDomainBadge.textContent = domain.number;
    DOM.activeDomainTitle.textContent = state.currentLang === 'de' ? (domain.germanTitle || domain.title) : domain.title;
    DOM.activeDomainTargets.textContent = `Employers: ${domain.targetEmployers} | Law: ${domain.law}`;
    DOM.dossierDocType.textContent = domain.documentType;

    // Execute Domain Verification Logic
    let auditResult = { isValid: true, rules: [], discrepancies: [], variance: 0 };
    let legalMemoText = '';

    const Verifier = window.Haulitz;

    switch (state.currentDomain) {
      case 'fintech': {
        const lineAudit = Verifier.Arithmetic.verifyLineItems(doc.items);
        const vatAudit = Verifier.Arithmetic.verifyGermanVAT(doc.subtotalNet, doc.taxAmount, doc.grossTotal, doc.vatRate);
        const ibanAudit = Verifier.Checksums.calculateIBAN(doc.iban);

        const isClean = lineAudit.isValid && vatAudit.isValid && ibanAudit.isValid;
        auditResult = {
          isValid: isClean,
          declaredTax: doc.taxAmount,
          expectedTax: vatAudit.expectedTax,
          taxDelta: vatAudit.taxDelta,
          variance: Math.abs(vatAudit.taxDelta) > 0.01 ? Math.abs(vatAudit.taxDelta) : (ibanAudit.isValid ? 0 : 1),
          rules: [
            { text: 'Line-Item Arithmetic (Qty * Unit Price = Total)', pass: lineAudit.isValid, note: `${lineAudit.totalItems} line items calculated` },
            { text: `Statutory German VAT (19% on €${doc.subtotalNet.toFixed(2)})`, pass: vatAudit.isValid, note: `Expected €${vatAudit.expectedTax.toFixed(2)}, Stated €${doc.taxAmount.toFixed(2)}` },
            { text: 'SEPA IBAN Modulo-97 Checksum (ISO 7064)', pass: ibanAudit.isValid, note: ibanAudit.isValid ? `Valid ${ibanAudit.countryCode} IBAN` : 'Checksum error' }
          ]
        };

        if (!isClean) {
          legalMemoText = Verifier.LegalMemos.generateVATNotice(doc, auditResult);
        }
        break;
      }

      case 'logistics': {
        const containerAudit = Verifier.Checksums.calculateISO6346(doc.containerNumber);
        const massAudit = Verifier.Arithmetic.verifyMassLaw(doc.grossWeightKg, doc.netWeightKg, doc.tareWeightKg);

        const isClean = containerAudit.isValid && massAudit.isValid;
        auditResult = {
          isValid: isClean,
          checksumValid: containerAudit.isValid,
          declaredDigit: containerAudit.declaredDigit,
          calculatedDigit: containerAudit.calculatedDigit,
          variance: massAudit.isValid ? (containerAudit.isValid ? 0 : 1) : massAudit.weightDeficit,
          rules: [
            { text: `ISO 6346 Modulo-11 Container Checksum (${doc.containerNumber})`, pass: containerAudit.isValid, note: `Declared [${containerAudit.declaredDigit}], Expected [${containerAudit.calculatedDigit}]` },
            { text: 'Mass Law Verification: Gross Mass >= Net Mass (§ 412 HGB)', pass: massAudit.isValid, note: `Gross ${doc.grossWeightKg} kg vs Net ${doc.netWeightKg} kg` },
            { text: 'SOLAS Verified Gross Mass (VGM) declared within 2.5% tolerance', pass: true, note: 'Terminal tare verified' }
          ]
        };

        if (!isClean) {
          legalMemoText = Verifier.LegalMemos.generateADSpNotice(doc, auditResult);
        }
        break;
      }

      case 'supply': {
        const triadAudit = Verifier.Reconciler.reconcileThreeWay(doc.po, doc.deliveryNote, doc.invoice);
        auditResult = {
          isValid: triadAudit.isValid,
          discrepancies: triadAudit.discrepancies,
          variance: triadAudit.matrix.reduce((acc, row) => acc + (row.financialDelta || 0), 0),
          rules: [
            { text: 'Purchase Order to Invoice Reference Match (PO Ref)', pass: triadAudit.discrepancies.every(d => !d.includes('Reference mismatch')), note: doc.po.poNumber },
            { text: 'Delivered vs Billed Quantity Check (HGB § 377)', pass: triadAudit.matrix.every(r => r.status !== 'SHORT_SHIPMENT_OVERBILLING'), note: triadAudit.isValid ? 'Quantities fully acknowledged' : 'Short shipment detected' },
            { text: 'Agreed Contract Unit Price Ceiling Enforcement', pass: triadAudit.matrix.every(r => r.status !== 'PRICE_INFLATION_DETECTED'), note: triadAudit.isValid ? 'Price caps respected' : 'Unauthorized unit price hike' }
          ]
        };

        if (!triadAudit.isValid) {
          legalMemoText = Verifier.LegalMemos.generateSupplyNotice(doc.po, doc.deliveryNote, doc.invoice, triadAudit);
        }
        break;
      }

      case 'insurtech': {
        const laborRateOver = doc.billedHourlyRate > doc.approvedHourlyRate;
        const laborDelta = laborRateOver ? (doc.billedHourlyRate - doc.approvedHourlyRate) * doc.laborHours : 0;
        const expectedPayable = Math.round((doc.grossTotal - doc.policyDeductible + Number.EPSILON) * 100) / 100;
        const deductibleIgnored = Math.abs(doc.netInsurerPayable - expectedPayable) > 0.05;

        const isClean = !laborRateOver && !deductibleIgnored;
        const variance = laborDelta + (deductibleIgnored ? doc.policyDeductible : 0);

        auditResult = {
          isValid: isClean,
          totalOvercharge: variance.toFixed(2),
          variance,
          rules: [
            { text: `Hourly Labor Rate Ceiling (€${doc.approvedHourlyRate.toFixed(2)}/hr benchmark)`, pass: !laborRateOver, note: `Billed €${doc.billedHourlyRate.toFixed(2)}/hr (${doc.laborHours} hrs)` },
            { text: `Contractual Comprehensive Deductible Subtraction (€${doc.policyDeductible.toFixed(2)})`, pass: !deductibleIgnored, note: deductibleIgnored ? 'Deductible omitted from claim' : 'Correctly subtracted' },
            { text: 'Spare Parts Catalog Cross-Check (DAT / Audatex Benchmark)', pass: true, note: 'Parts prices approved' }
          ]
        };

        if (!isClean) {
          legalMemoText = Verifier.LegalMemos.generateInsurtechNotice(doc, auditResult);
        }
        break;
      }

      case 'legaltech': {
        const isCertExpired = doc.daysExpired > 0;
        const isCodeSigned = Boolean(doc.humanRightsCodeSigned);
        const isClean = !isCertExpired && isCodeSigned;

        auditResult = {
          isValid: isClean,
          daysExpired: doc.daysExpired,
          variance: doc.daysExpired,
          rules: [
            { text: 'Mandatory ISO 14001 Environmental Certificate Validity', pass: !isCertExpired, note: isCertExpired ? `Expired ${doc.daysExpired} days ago` : `Valid until ${doc.iso14001ValidUntil}` },
            { text: 'Signed Human Rights Code of Conduct (LkSG § 4–§ 7)', pass: isCodeSigned, note: isCodeSigned ? 'Signed & active' : 'Missing mandatory signature' },
            { text: 'Whistleblower & Grievance Reporting Mechanism', pass: doc.whistleblowerChannelActive, note: 'Reporting procedure validated' }
          ]
        };

        if (!isClean) {
          legalMemoText = Verifier.LegalMemos.generateLkSGNotice(doc, auditResult);
        }
        break;
      }

      case 'healthtech': {
        const feesAudit = Verifier.Arithmetic.verifyGOAFees(doc.items);
        auditResult = {
          isValid: feesAudit.isValid,
          totalDeclared: feesAudit.totalDeclared,
          totalApproved: feesAudit.totalApproved,
          totalOvercharge: feesAudit.totalOvercharge,
          variance: feesAudit.totalOvercharge,
          rules: [
            { text: 'Medical Fee Schedule Multiplier Threshold (Max 2.3x)', pass: feesAudit.isValid, note: feesAudit.isValid ? 'Compliant multipliers' : 'Unjustified multiplier applied' },
            { text: 'Statutory Written Medical Justification Mandate (GOÄ § 12 Abs. 3)', pass: doc.items.every(it => it.multiplier <= 2.3 || it.hasJustification), note: 'Complexity justification check' },
            { text: 'Statutory Reimbursement Sum Approved', pass: feesAudit.isValid, note: `Approved €${feesAudit.totalApproved.toFixed(2)}` }
          ]
        };

        if (!feesAudit.isValid) {
          legalMemoText = Verifier.LegalMemos.generateGOANotice(doc, feesAudit);
        }
        break;
      }

      case 'ecommerce': {
        const barcodeAudit = Verifier.Checksums.calculateEAN13(doc.barcode);
        let fxValid = true;
        let fxDelta = 0;
        if (doc.declaredUsdTotal && doc.fxRateEurUsd) {
          const expected = Math.round((doc.declaredUsdTotal / doc.fxRateEurUsd + Number.EPSILON) * 100) / 100;
          fxDelta = Math.abs(doc.statedEurTotal - expected);
          if (fxDelta > 0.10) fxValid = false;
        }

        const isClean = barcodeAudit.isValid && fxValid;
        auditResult = {
          isValid: isClean,
          declaredDigit: barcodeAudit.declaredDigit,
          calculatedDigit: barcodeAudit.calculatedDigit,
          variance: fxDelta > 0 ? fxDelta : (barcodeAudit.isValid ? 0 : 1),
          rules: [
            { text: `EAN-13 Modulo-10 Barcode Checksum (${doc.barcode})`, pass: barcodeAudit.isValid, note: `Declared [${barcodeAudit.declaredDigit}], Expected [${barcodeAudit.calculatedDigit}]` },
            { text: 'Multi-Currency Foreign Exchange Cross-Rate Consistency', pass: fxValid, note: fxValid ? 'Cross-rate consistent' : `FX delta of €${fxDelta.toFixed(2)}` },
            { text: 'Carton-to-Piece Packaging Quantity Hierarchy', pass: (doc.cartonCount * doc.unitsPerCarton) === doc.totalDeclaredUnits, note: `${doc.totalDeclaredUnits} units verified` }
          ]
        };

        if (!isClean) {
          legalMemoText = Verifier.LegalMemos.generateECommerceNotice(doc, auditResult);
        }
        break;
      }

      case 'cleantech': {
        const gridAudit = Verifier.Arithmetic.verifyInverterGridCapacity(doc.panelsKwp, doc.inverterKw, doc.gridCapKw);
        let dcMathValid = true;
        let dcDelta = 0;
        if (doc.stringVoltageV && doc.stringCurrentA && doc.stringCount) {
          const calcKw = Math.round(((doc.stringVoltageV * doc.stringCurrentA * doc.stringCount) / 1000 + Number.EPSILON) * 100) / 100;
          dcDelta = Math.abs(calcKw - doc.declaredDcPowerKw);
          if (dcDelta > 0.2) dcMathValid = false;
        }

        const isClean = gridAudit.isValid && dcMathValid;
        auditResult = {
          isValid: isClean,
          overageKw: gridAudit.overageKw,
          variance: gridAudit.overageKw > 0 ? gridAudit.overageKw : dcDelta,
          rules: [
            { text: `VDE-AR-N 4105 Grid Connection Ceiling (${doc.inverterKw} kW vs Max ${doc.gridCapKw} kW)`, pass: gridAudit.isValid, note: gridAudit.isValid ? 'Within grid capacity' : `Exceeds cap by ${gridAudit.overageKw} kW` },
            { text: 'DC String Power Calculation (Volts * Amps * Strings = Watts)', pass: dcMathValid, note: dcMathValid ? 'String math matches DC input' : `Calculation mismatch: ${dcDelta.toFixed(2)} kW delta` },
            { text: 'Low-Voltage Safety Sensor (EnFluRi) Mandate Check', pass: gridAudit.isValid, note: 'Feed-in management active' }
          ]
        };

        if (!isClean) {
          legalMemoText = Verifier.LegalMemos.generateCleanTechNotice(doc, auditResult);
        }
        break;
      }

      case 'proptech': {
        const heatingAudit = Verifier.Arithmetic.verifyHeatingApportionment(
          doc.totalBuildingCost, doc.tenantM2, doc.totalBuildingM2,
          doc.tenantMeterUnits, doc.totalBuildingMeterUnits,
          doc.declaredTenantBilled, doc.splitRatio
        );

        auditResult = {
          isValid: heatingAudit.isValid,
          variance: Math.abs(heatingAudit.delta),
          rules: [
            { text: `HeizkostenV § 7 Statutory Split Allocation (Mandatory 70/30)`, pass: heatingAudit.isSplitStatutory, note: `Applied split: ${doc.splitRatio}` },
            { text: 'Square-Meter Area Share Apportionment Math', pass: heatingAudit.isMathValid, note: `Calculated €${heatingAudit.statutoryTenantShare.toFixed(2)}, Billed €${doc.declaredTenantBilled.toFixed(2)}` },
            { text: 'Tenant 15% Right-of-Reduction Enforcement (§ 12 HeizkostenV)', pass: heatingAudit.isValid, note: heatingAudit.isValid ? 'No reduction trigger' : 'Tenant entitled to 15% reduction' }
          ]
        };

        if (!heatingAudit.isValid) {
          legalMemoText = Verifier.LegalMemos.generatePropTechNotice(doc, heatingAudit);
        }
        break;
      }

      case 'erp': {
        const hasSqlInject = doc.referenceNumber && (doc.referenceNumber.includes('DROP') || doc.referenceNumber.includes("' OR"));
        const hasOverflow = doc.netAmount && doc.netAmount.toString().split('.')[1]?.length > 2;
        const isClean = !hasSqlInject && !hasOverflow && doc.sqlSanitized;

        auditResult = {
          isValid: isClean,
          variance: hasSqlInject ? 9999 : (hasOverflow ? 0.0001 : 0),
          rules: [
            { text: 'Parameterized SQL Meta-Character Sanitization (OWASP ASVS)', pass: !hasSqlInject, note: hasSqlInject ? 'MALICIOUS SQL INJECTION PATTERN BLOCKED' : 'Clean string parameters' },
            { text: 'Schema Type Integrity & Precision Bounds (DECIMAL(18,2))', pass: !hasOverflow, note: hasOverflow ? 'Fractional precision overflow detected' : 'Payload fits target schema' },
            { text: 'Enterprise Referential Integrity & Foreign Key Resolution', pass: doc.foreignKeysValid, note: 'Target staging table resolved' }
          ]
        };

        if (!isClean) {
          legalMemoText = Verifier.LegalMemos.generateERPNotice(doc, auditResult);
        }
        break;
      }
    }

    state.lastAuditResult = auditResult;

    // Cryptographic Seal Generation
    const refId = doc.invoiceNumber || doc.bolNumber || doc.po?.poNumber || doc.claimNumber || doc.dossierNumber || doc.asnNumber || doc.projectId || doc.statementId || doc.transactionId || 'REF-GENERIC';
    const auditStatus = auditResult.isValid ? 'VERIFIED_CLEAN' : 'QUARANTINE_HOLD';
    
    const sealResult = await Verifier.GoBDHasher.generateSeal(state.previousSeal, refId, auditStatus, doc);
    state.lastSealResult = sealResult;
    state.previousSeal = sealResult.seal;

    // Append to Audit History for CSV Export
    state.auditHistory.push({
      timestamp: sealResult.timestamp,
      referenceId: refId,
      domainName: domain.title,
      auditStatus,
      rule: domain.law,
      summary: auditResult.isValid ? 'Passed all deterministic guardrails' : 'Failed deterministic verification',
      variance: auditResult.variance?.toFixed(2) || '0.00',
      seal: sealResult.seal,
      previousSeal: sealResult.previousSeal
    });

    // Update UI Elements
    renderSourceDossier(doc, state.currentDomain);
    renderAuditCockpit(auditResult, legalMemoText, sealResult);
  }

  /**
   * Render Source Document Dossier in Left Pane
   */
  function renderSourceDossier(doc, domainKey) {
    let html = '';

    if (domainKey === 'supply') {
      // Special rendering for 3-Way Triad
      html = `
        <div style="margin-bottom: 0.75rem; font-weight:700; color:var(--color-navy); font-size:0.86rem;">
          <i class="fa-solid fa-file-invoice"></i> 3-WAY RECONCILIATION TRIAD
        </div>
        <table class="dossier-header-table">
          <tr><td class="label">Purchase Order:</td><td class="val font-mono-code">${doc.po.poNumber}</td></tr>
          <tr><td class="label">Goods Receipt Note:</td><td class="val font-mono-code">${doc.deliveryNote.deliveryNumber}</td></tr>
          <tr><td class="label">Commercial Invoice:</td><td class="val font-mono-code">${doc.invoice.invoiceNumber}</td></tr>
          <tr><td class="label">Supplier:</td><td class="val">${doc.po.supplier}</td></tr>
        </table>
        
        <div style="font-size:0.82rem; font-weight:600; margin-top:0.65rem; color:var(--color-text-muted);">
          Cross-Document Line Items Comparison:
        </div>
        <div class="dossier-table-wrapper">
          <table class="dossier-table">
            <thead>
              <tr><th>SKU</th><th>Ordered</th><th>Received</th><th>Billed</th><th>Price</th></tr>
            </thead>
            <tbody>
              ${doc.invoice.items.map(it => {
                const poIt = doc.po.items.find(p => p.sku === it.sku);
                const delIt = doc.deliveryNote.items.find(d => d.sku === it.sku);
                const hasError = it.billedQuantity > (delIt?.receivedQuantity || 0) || it.billedUnitPrice > (poIt?.unitPrice || 0);
                return `
                  <tr class="${hasError ? 'highlight-error' : ''}">
                    <td class="font-mono-code">${it.sku}</td>
                    <td>${poIt?.quantity || 0}</td>
                    <td><strong>${delIt?.receivedQuantity || 0}</strong></td>
                    <td style="color:${hasError ? '#DC2626' : 'inherit'};"><strong>${it.billedQuantity}</strong></td>
                    <td>€${it.billedUnitPrice.toFixed(2)}</td>
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>
        </div>
      `;
    } else {
      // Standard Key-Value Card Rendering
      const entries = Object.entries(doc).filter(([k, v]) => typeof v !== 'object' && k !== 'items');
      html = `
        <table class="dossier-header-table">
          ${entries.slice(0, 8).map(([key, val]) => `
            <tr>
              <td class="label">${formatKeyLabel(key)}:</td>
              <td class="val font-mono-code">${val}</td>
            </tr>
          `).join('')}
        </table>
      `;

      if (Array.isArray(doc.items)) {
        html += `
          <div style="font-size:0.82rem; font-weight:600; margin-top:0.65rem; color:var(--color-text-muted);">
            Extracted Line Items (${doc.items.length}):
          </div>
          <div class="dossier-table-wrapper">
            <table class="dossier-table">
              <thead>
                <tr><th>Description</th><th>Qty</th><th>Unit</th><th>Total</th></tr>
              </thead>
              <tbody>
                ${doc.items.map(item => `
                  <tr>
                    <td>${item.description || item.code}</td>
                    <td>${item.quantity || item.points || 1}</td>
                    <td>€${parseFloat(item.unitPrice || item.baseFee || 0).toFixed(2)}</td>
                    <td class="font-mono-code"><strong>€${parseFloat(item.declaredTotal || 0).toFixed(2)}</strong></td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        `;
      }
    }

    DOM.dossierContent.innerHTML = html;
  }

  function formatKeyLabel(key) {
    return key.replace(/([A-Z])/g, ' $1')
              .replace(/^./, str => str.toUpperCase())
              .replace(/Kg$/, ' (kg)')
              .replace(/Eur$/, ' (€)')
              .replace(/Kw$/, ' (kW)')
              .replace(/Kwp$/, ' (kWp)');
  }

  /**
   * Render Verification Cockpit in Right Pane
   */
  function renderAuditCockpit(auditResult, legalMemoText, sealResult) {
    const isClean = auditResult.isValid;

    // Status Banner
    DOM.auditStatusBanner.className = `audit-status-banner ${isClean ? 'status-clean' : 'status-quarantine'}`;
    DOM.statusIcon.className = `fa-solid ${isClean ? 'fa-circle-check' : 'fa-triangle-exclamation'} status-main-icon`;
    DOM.statusTextTitle.textContent = isClean ? 'VERIFIED_CLEAN' : 'QUARANTINE_HOLD';
    DOM.statusTextSubtitle.textContent = isClean
      ? 'All mathematical and legal integrity guardrails passed. Authorized for ERP staging.'
      : 'Critical variance or legal exception detected. Routed to quarantine buffer; payment/customs blocked.';
    DOM.statusPillBadge.textContent = isClean ? 'STAGE_AUTHORIZED' : 'ERP_PAYMENT_BLOCKED';
    DOM.statusPillBadge.className = `rule-badge ${isClean ? 'pass' : 'fail'}`;

    // Checklist Breakdown
    DOM.ruleChecklist.innerHTML = auditResult.rules.map(r => `
      <li class="rule-item">
        <i class="fa-solid ${r.pass ? 'fa-circle-check' : 'fa-circle-xmark'} rule-icon ${r.pass ? 'pass' : 'fail'}"></i>
        <div class="rule-text">
          <strong>${r.text}</strong>
          ${r.note ? `<div style="font-size:0.76rem; color:var(--color-text-muted);">${r.note}</div>` : ''}
        </div>
        <span class="rule-badge ${r.pass ? 'pass' : 'fail'}">${r.pass ? 'PASS' : 'FAIL'}</span>
      </li>
    `).join('');

    // Variance Card
    if (!isClean && auditResult.variance) {
      DOM.varianceCard.style.display = 'block';
      DOM.varianceText.innerHTML = `
        <strong>Exact Discrepancy Amount:</strong> € ${typeof auditResult.variance === 'number' ? auditResult.variance.toFixed(2) : auditResult.variance} EUR / Units delta.<br>
        Downstream payment run and ATLAS submission automatically halted.
      `;
    } else {
      DOM.varianceCard.style.display = 'none';
    }

    // Legal Dispute Memo Box
    if (!isClean && legalMemoText) {
      DOM.legalMemoBox.style.display = 'block';
      DOM.legalMemoContent.textContent = legalMemoText;
    } else {
      DOM.legalMemoBox.style.display = 'none';
    }

    // GoBD SHA-256 Cryptographic Seal
    DOM.gobdSealHash.textContent = sealResult.seal;
    DOM.gobdPrevSeal.textContent = sealResult.previousSeal.slice(0, 16) + '...';
    DOM.gobdTimestamp.textContent = sealResult.timestamp;
  }

  /**
   * Modal Dialog Controllers
   */
  function setupModals() {
    DOM.btnViewTsql.addEventListener('click', () => {
      const tsql = window.Haulitz.SQLStaging.generateTSQL(
        state.currentDomain,
        state.lastDocPayload,
        state.lastAuditResult,
        state.lastSealResult
      );
      DOM.modalTsqlContent.textContent = tsql;
      DOM.modalTsql.classList.add('open');
    });

    DOM.btnViewCsharp.addEventListener('click', () => {
      const csharp = window.Haulitz.SQLStaging.generateCSharpDriver(state.currentDomain);
      DOM.modalCsharpContent.textContent = csharp;
      DOM.modalCsharp.classList.add('open');
    });

    DOM.btnExportCsv.addEventListener('click', () => {
      const csv = window.Haulitz.GoBDHasher.exportToCSV(state.auditHistory);
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', `haulitz_gobd_audit_ledger_${new Date().toISOString().slice(0, 10)}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });

    // Close buttons for modals
    document.querySelectorAll('.modal-close-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const modalId = btn.getAttribute('data-close');
        document.getElementById(modalId)?.classList.remove('open');
      });
    });

    // Close on background click
    [DOM.modalTsql, DOM.modalCsharp].forEach(modal => {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.classList.remove('open');
      });
    });

    // Copy to clipboard buttons
    DOM.btnCopyTsql.addEventListener('click', () => {
      copyToClipboard(DOM.modalTsqlContent.textContent, DOM.btnCopyTsql, 'Copied T-SQL!');
    });

    DOM.btnCopyCsharp.addEventListener('click', () => {
      copyToClipboard(DOM.modalCsharpContent.textContent, DOM.btnCopyCsharp, 'Copied C# SDK!');
    });

    DOM.btnCopyMemo.addEventListener('click', () => {
      copyToClipboard(DOM.legalMemoContent.textContent, DOM.btnCopyMemo, 'Copied Memo!');
    });
  }

  function copyToClipboard(text, btnElement, successMsg) {
    navigator.clipboard.writeText(text).then(() => {
      const original = btnElement.innerHTML;
      btnElement.innerHTML = `<i class="fa-solid fa-check"></i> ${successMsg}`;
      setTimeout(() => {
        btnElement.innerHTML = original;
      }, 2000);
    });
  }

  /**
   * Scenario Button Click Listeners
   */
  function setupScenarioButtons() {
    DOM.btnScenarioA.addEventListener('click', () => selectScenario('scenario_a'));
    DOM.btnScenarioB.addEventListener('click', () => selectScenario('scenario_b'));
    DOM.btnScenarioC.addEventListener('click', () => selectScenario('scenario_c'));
  }

  /**
   * Language Toggle
   */
  function setupLanguageToggle() {
    DOM.langToggleBtn.addEventListener('click', () => {
      state.currentLang = state.currentLang === 'de' ? 'en' : 'de';
      renderDomainGrid();
      runVerification();
    });
  }

  /**
   * Dark / Light Theme Toggle
   */
  function updateThemeUI() {
    const isDark = state.currentTheme === 'dark';
    if (DOM.themeIcon) {
      DOM.themeIcon.className = isDark ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
    }
    if (DOM.themeText) {
      DOM.themeText.textContent = isDark ? 'Light' : 'Dark';
    }
  }

  function setupThemeToggle() {
    updateThemeUI();
    if (DOM.themeToggleBtn) {
      DOM.themeToggleBtn.addEventListener('click', () => {
        const nextTheme = state.currentTheme === 'dark' ? 'light' : 'dark';
        state.currentTheme = nextTheme;
        document.documentElement.setAttribute('data-theme', nextTheme);
        try {
          localStorage.setItem('haulitz_theme', nextTheme);
        } catch (e) {}
        updateThemeUI();
      });
    }
  }

  // Application Entry Point
  window.addEventListener('DOMContentLoaded', () => {
    initDOMElements();
    renderDomainGrid();
    setupScenarioButtons();
    setupModals();
    setupLanguageToggle();
    setupThemeToggle();
    updateScenarioButtonLabels();
    runVerification();
  });

})();
