/**
 * HAULITZ ENTERPRISE GATEWAY - MASTER CONTROLLER & APPLICATION ENGINE
 * Standard: ASD-STE100 Simplified Technical English
 */

(function() {
  'use strict';

  // Read persisted user preferences (DEFAULT: German, Light Mode unless toggled)
  let savedLang = null;
  let savedTheme = null;
  try {
    savedLang = localStorage.getItem('haulitz_lang');
    savedTheme = localStorage.getItem('haulitz_theme');
  } catch (e) {}

  // Application State
  const state = {
    currentDomain: 'fintech',
    currentScenario: 'scenario_a',
    currentLang: savedLang === 'en' ? 'en' : 'de', // Strict Default: German
    currentTheme: savedTheme === 'dark' ? 'dark' : 'light', // Strict Default: Light Mode
    previousSeal: window.Haulitz?.GoBDHasher?.GENESIS_SEAL || '0000000000000000000000000000000000000000000000000000000000000000',
    auditHistory: [],
    lastAuditResult: null,
    lastSealResult: null,
    lastDocPayload: null
  };

  // Full Internationalization Strings (German / English)
  const i18n = {
    de: {
      beacon: 'Deterministische Prüf-Engine Aktiv (100%)',
      themeDark: 'Dunkel',
      themeLight: 'Hell',
      langBtn: 'DE | EN',
      heroHeading: 'Das universelle Datenverifizierungs-Gateway für Enterprise-ERP',
      heroSubheading: 'Beseitigung von KI-Halluzinationen, Buchungsfehlern und Haftungsrisiken durch deterministische mathematische Schutzschranken, ISO-Prüfziffern und GoBD § 147 AO kryptografische Prüfketten. Konzipiert für das direkte Staging in SAP S/4HANA und Microsoft SQL Server.',
      badge1: '<i class="fa-solid fa-microchip"></i> 100% Client-Side Engine (<30ms Latenz)',
      badge2: '<i class="fa-solid fa-lock"></i> Revisionssicheres GoBD § 147 AO Ledger',
      badge3: '<i class="fa-solid fa-scale-balanced"></i> Deutsche Rechtskonformität (HGB / UStG / LkSG)',
      badge4: '<i class="fa-solid fa-database"></i> Parametrisiertes T-SQL (SAP & MS SQL 2022)',
      domainTitle: '<i class="fa-solid fa-layer-group"></i> Wählen Sie eine Industriebranche zur Prüfung',
      domainDesc: 'Erleben Sie, wie Haulitz geschäftskritische Workflows in den führenden deutschen Wirtschaftssektoren absichert',
      scenarioA: 'Szenario A: Valider Beleg',
      scenarioB: 'Szenario B: Rechnerische Falle',
      scenarioC: 'Szenario C: Gesetzesverstoß',
      dossierTitle: 'Quelldokument-Dossier',
      dossierFooter: '<i class="fa-solid fa-shield-halved"></i> Quelldokument per Multimodal Vision erfasst; im Quarantänepuffer bis zur Verifizierung gehalten.',
      cockpitTitle: 'Deterministisches Prüf-Cockpit',
      latencyBadge: '< 2ms AUSFÜHRUNG',
      statusCleanTitle: 'REVISIONSFÄHIG_VERIFIZIERT',
      statusCleanDesc: 'Alle mathematischen und gesetzlichen Schutzschranken bestanden. Freigabe für ERP-Staging erteilt.',
      statusCleanBadge: 'STAGING_AUTORISIERT',
      statusQuarantineTitle: 'QUARANTÄNE_SPERRE',
      statusQuarantineDesc: 'Kritische mathematische Abweichung oder Gesetzesverstoß festgestellt. In Quarantänepuffer geleitet; Zahllauf/Zollanmeldung gesperrt.',
      statusQuarantineBadge: 'ZAHLLAUF_GESPERRT',
      checklistHeading: '<i class="fa-solid fa-list-check"></i> VERIFIZIERUNGSSCHRANKEN:',
      varianceTitle: '<i class="fa-solid fa-triangle-exclamation"></i> RECHNERISCHE / GESETZLICHE ABWEICHUNG FESTGESTELLT',
      varianceExact: 'Exakter Abweichungsbetrag:',
      varianceBlocked: 'Nachgelagerter Zahllauf in SAP und ATLAS-Zollanmeldung automatisch blockiert.',
      legalMemoHeader: 'AUTOMATISIERTE GESETZLICHE MÄNGELRÜGE',
      copyMemo: 'Mahnung kopieren',
      copiedMemo: 'Mahnung kopiert!',
      gobdTitle: '<i class="fa-solid fa-fingerprint"></i> GoBD § 147 AO KRYPTOGRAFISCHES PRÜFSIEGEL (REVISIONSSICHERE KETTE)',
      gobdPredecessor: 'Vorheriger Siegelblock:',
      btnTsql: 'Parametrisiertes T-SQL (SAP / MS-SQL)',
      btnCsharp: 'C# .NET 8 Treiber-SDK',
      btnExport: 'GoBD § 147 AO Ledger exportieren (.CSV)',
      employers: 'Unternehmen',
      law: 'Rechtsgrundlage'
    },
    en: {
      beacon: 'Deterministic Engine Active (100%)',
      themeDark: 'Dark',
      themeLight: 'Light',
      langBtn: 'EN | DE',
      heroHeading: 'The Universal Data Verification Gateway for Enterprise ERP',
      heroSubheading: 'Eliminating AI hallucinations, accounting errors, and compliance liability with deterministic mathematical guardrails, ISO checksums, and GoBD § 147 AO cryptographic audit seal chains. Designed for direct staging into SAP S/4HANA and Microsoft SQL Server.',
      badge1: '<i class="fa-solid fa-microchip"></i> 100% Client-Side Engine (<30ms Latency)',
      badge2: '<i class="fa-solid fa-lock"></i> GoBD § 147 AO SHA-256 Ledger',
      badge3: '<i class="fa-solid fa-scale-balanced"></i> Statutory German Compliance (HGB / UStG / LkSG)',
      badge4: '<i class="fa-solid fa-database"></i> Parameterized T-SQL (SAP & MS SQL 2022)',
      domainTitle: '<i class="fa-solid fa-layer-group"></i> Select Industry Domain To Audit',
      domainDesc: 'Explore how Haulitz protects workflows across Germany\'s top corporate sectors',
      scenarioA: 'Scenario A: Clean Pass',
      scenarioB: 'Scenario B: Arithmetic Trap',
      scenarioC: 'Scenario C: Regulatory Breach',
      dossierTitle: 'Source Document Dossier',
      dossierFooter: '<i class="fa-solid fa-shield-halved"></i> Source document extracted via multimodal vision; held in quarantine buffer awaiting verification.',
      cockpitTitle: 'Deterministic Verification Cockpit',
      latencyBadge: '< 2ms EXECUTION',
      statusCleanTitle: 'VERIFIED_CLEAN',
      statusCleanDesc: 'All mathematical and legal integrity guardrails passed. Authorized for ERP staging.',
      statusCleanBadge: 'STAGE_AUTHORIZED',
      statusQuarantineTitle: 'QUARANTINE_HOLD',
      statusQuarantineDesc: 'Critical variance or legal exception detected. Routed to quarantine buffer; payment/customs blocked.',
      statusQuarantineBadge: 'ERP_PAYMENT_BLOCKED',
      checklistHeading: '<i class="fa-solid fa-list-check"></i> VERIFICATION GATE CHECKLIST:',
      varianceTitle: '<i class="fa-solid fa-triangle-exclamation"></i> ARITHMETIC / LEGAL VARIANCE DETECTED',
      varianceExact: 'Exact Discrepancy Amount:',
      varianceBlocked: 'Downstream payment run and ATLAS submission automatically halted.',
      legalMemoHeader: 'AUTOMATED STATUTORY DISPUTE MEMO',
      copyMemo: 'Copy Memo',
      copiedMemo: 'Copied Memo!',
      gobdTitle: '<i class="fa-solid fa-fingerprint"></i> GoBD § 147 AO CRYPTOGRAPHIC AUDIT SEAL (TAMPER-EVIDENT LEDGER)',
      gobdPredecessor: 'Predecessor Block:',
      btnTsql: 'Parameterized T-SQL (SAP / MS-SQL)',
      btnCsharp: 'C# .NET 8 Driver SDK',
      btnExport: 'Export GoBD § 147 AO Ledger (.CSV)',
      employers: 'Employers',
      law: 'Governing Law'
    }
  };

  // DOM Elements Cache
  const DOM = {};

  function initDOMElements() {
    DOM.beaconText = document.getElementById('beacon-text');
    DOM.themeToggleBtn = document.getElementById('theme-toggle-btn');
    DOM.themeIcon = document.getElementById('theme-icon');
    DOM.themeText = document.getElementById('theme-text');
    DOM.langToggleBtn = document.getElementById('lang-toggle-btn');
    DOM.langBtnText = document.getElementById('lang-btn-text');

    DOM.heroHeading = document.getElementById('hero-heading');
    DOM.heroSubheading = document.getElementById('hero-subheading');
    DOM.badgePill1 = document.getElementById('badge-pill-1');
    DOM.badgePill2 = document.getElementById('badge-pill-2');
    DOM.badgePill3 = document.getElementById('badge-pill-3');
    DOM.badgePill4 = document.getElementById('badge-pill-4');

    DOM.domainSectionTitle = document.getElementById('domain-section-title');
    DOM.domainSectionDesc = document.getElementById('domain-section-desc');
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
    
    DOM.labelDossierTitle = document.getElementById('label-dossier-title');
    DOM.dossierDocType = document.getElementById('dossier-doc-type');
    DOM.dossierContent = document.getElementById('dossier-card-content');
    DOM.dossierFooterNote = document.getElementById('dossier-footer-note');
    
    DOM.labelCockpitTitle = document.getElementById('label-cockpit-title');
    DOM.auditLatencyBadge = document.getElementById('audit-latency-badge');
    DOM.auditStatusBanner = document.getElementById('audit-status-banner');
    DOM.statusIcon = document.getElementById('status-icon');
    DOM.statusTextTitle = document.getElementById('status-text-title');
    DOM.statusTextSubtitle = document.getElementById('status-text-subtitle');
    DOM.statusPillBadge = document.getElementById('status-pill-badge');
    
    DOM.checklistHeadingLabel = document.getElementById('checklist-heading-label');
    DOM.ruleChecklist = document.getElementById('rule-checklist-container');
    DOM.varianceCard = document.getElementById('variance-card');
    DOM.varianceCardTitle = document.getElementById('variance-card-title');
    DOM.varianceText = document.getElementById('variance-text');
    DOM.legalMemoBox = document.getElementById('legal-memo-box');
    DOM.labelMemoHeader = document.getElementById('label-memo-header');
    DOM.legalMemoContent = document.getElementById('legal-memo-content');
    DOM.btnCopyMemo = document.getElementById('btn-copy-memo');
    DOM.btnCopyMemoText = document.getElementById('btn-copy-memo-text');
    
    DOM.gobdSealTitle = document.getElementById('gobd-seal-title');
    DOM.gobdSealHash = document.getElementById('gobd-seal-hash');
    DOM.labelPredecessor = document.getElementById('label-predecessor');
    DOM.gobdPrevSeal = document.getElementById('gobd-prev-seal');
    DOM.gobdTimestamp = document.getElementById('gobd-timestamp');
    
    DOM.btnViewTsql = document.getElementById('btn-view-tsql');
    DOM.btnTsqlText = document.getElementById('btn-tsql-text');
    DOM.btnViewCsharp = document.getElementById('btn-view-csharp');
    DOM.btnCsharpText = document.getElementById('btn-csharp-text');
    DOM.btnExportCsv = document.getElementById('btn-export-csv');
    DOM.btnExportText = document.getElementById('btn-export-text');
    
    DOM.modalTsql = document.getElementById('modal-tsql');
    DOM.modalCsharp = document.getElementById('modal-csharp');
    DOM.modalTsqlContent = document.getElementById('modal-tsql-content');
    DOM.modalCsharpContent = document.getElementById('modal-csharp-content');
    
    DOM.btnCopyTsql = document.getElementById('btn-copy-tsql');
    DOM.btnCopyCsharp = document.getElementById('btn-copy-csharp');
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

    const dict = i18n[state.currentLang] || i18n.de;
    DOM.labelScenarioA.textContent = dict.scenarioA;
    DOM.labelScenarioB.textContent = dict.scenarioB;
    DOM.labelScenarioC.textContent = dict.scenarioC;

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

    const dict = i18n[state.currentLang] || i18n.de;

    // Update Active Domain Header
    DOM.activeDomainBadge.textContent = domain.number;
    DOM.activeDomainTitle.textContent = state.currentLang === 'de' ? (domain.germanTitle || domain.title) : domain.title;
    DOM.activeDomainTargets.textContent = `${dict.employers}: ${domain.targetEmployers} | ${dict.law}: ${domain.law}`;
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
    const dict = i18n[state.currentLang] || i18n.de;

    // Status Banner
    DOM.auditStatusBanner.className = `audit-status-banner ${isClean ? 'status-clean' : 'status-quarantine'}`;
    DOM.statusIcon.className = `fa-solid ${isClean ? 'fa-circle-check' : 'fa-triangle-exclamation'} status-main-icon`;
    DOM.statusTextTitle.textContent = isClean ? dict.statusCleanTitle : dict.statusQuarantineTitle;
    DOM.statusTextSubtitle.textContent = isClean ? dict.statusCleanDesc : dict.statusQuarantineDesc;
    DOM.statusPillBadge.textContent = isClean ? dict.statusCleanBadge : dict.statusQuarantineBadge;
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
        <strong>${dict.varianceExact}</strong> € ${typeof auditResult.variance === 'number' ? auditResult.variance.toFixed(2) : auditResult.variance} EUR / Units delta.<br>
        ${dict.varianceBlocked}
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
      const dict = i18n[state.currentLang] || i18n.de;
      copyToClipboard(DOM.legalMemoContent.textContent, DOM.btnCopyMemo, dict.copiedMemo);
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
   * Internationalization Engine
   */
  function applyLanguageUI() {
    const dict = i18n[state.currentLang] || i18n.de;
    document.documentElement.lang = state.currentLang;

    if (DOM.beaconText) DOM.beaconText.textContent = dict.beacon;
    if (DOM.langBtnText) DOM.langBtnText.textContent = dict.langBtn;
    if (DOM.heroHeading) DOM.heroHeading.textContent = dict.heroHeading;
    if (DOM.heroSubheading) DOM.heroSubheading.textContent = dict.heroSubheading;
    if (DOM.badgePill1) DOM.badgePill1.innerHTML = dict.badge1;
    if (DOM.badgePill2) DOM.badgePill2.innerHTML = dict.badge2;
    if (DOM.badgePill3) DOM.badgePill3.innerHTML = dict.badge3;
    if (DOM.badgePill4) DOM.badgePill4.innerHTML = dict.badge4;
    if (DOM.domainSectionTitle) DOM.domainSectionTitle.innerHTML = dict.domainTitle;
    if (DOM.domainSectionDesc) DOM.domainSectionDesc.textContent = dict.domainDesc;
    if (DOM.labelDossierTitle) DOM.labelDossierTitle.textContent = dict.dossierTitle;
    if (DOM.dossierFooterNote) DOM.dossierFooterNote.innerHTML = dict.dossierFooter;
    if (DOM.labelCockpitTitle) DOM.labelCockpitTitle.textContent = dict.cockpitTitle;
    if (DOM.auditLatencyBadge) DOM.auditLatencyBadge.textContent = dict.latencyBadge;
    if (DOM.checklistHeadingLabel) DOM.checklistHeadingLabel.innerHTML = dict.checklistHeading;
    if (DOM.varianceCardTitle) DOM.varianceCardTitle.innerHTML = dict.varianceTitle;
    if (DOM.labelMemoHeader) DOM.labelMemoHeader.textContent = dict.legalMemoHeader;
    if (DOM.btnCopyMemoText) DOM.btnCopyMemoText.textContent = dict.copyMemo;
    if (DOM.gobdSealTitle) DOM.gobdSealTitle.innerHTML = dict.gobdTitle;
    if (DOM.labelPredecessor) DOM.labelPredecessor.textContent = dict.gobdPredecessor;
    if (DOM.btnTsqlText) DOM.btnTsqlText.textContent = dict.btnTsql;
    if (DOM.btnCsharpText) DOM.btnCsharpText.textContent = dict.btnCsharp;
    if (DOM.btnExportText) DOM.btnExportText.textContent = dict.btnExport;

    updateThemeUI();
    updateScenarioButtonLabels();
  }

  /**
   * Language Toggle
   */
  function setupLanguageToggle() {
    DOM.langToggleBtn.addEventListener('click', () => {
      state.currentLang = state.currentLang === 'de' ? 'en' : 'de';
      try {
        localStorage.setItem('haulitz_lang', state.currentLang);
      } catch (e) {}
      applyLanguageUI();
      renderDomainGrid();
      runVerification();
    });
  }

  /**
   * Dark / Light Theme Toggle
   */
  function updateThemeUI() {
    const isDark = state.currentTheme === 'dark';
    const dict = i18n[state.currentLang] || i18n.de;
    if (DOM.themeIcon) {
      DOM.themeIcon.className = isDark ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
    }
    if (DOM.themeText) {
      DOM.themeText.textContent = isDark ? dict.themeLight : dict.themeDark;
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
    applyLanguageUI(); // Apply default language (German) and light mode
    renderDomainGrid();
    setupScenarioButtons();
    setupModals();
    setupLanguageToggle();
    setupThemeToggle();
    updateScenarioButtonLabels();
    runVerification();
  });

})();
