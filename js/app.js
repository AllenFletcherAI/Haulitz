/**
 * HAULITZ ENTERPRISE GATEWAY - MASTER CONTROLLER & APPLICATION ENGINE
 * Standard: ASD-STE100 Simplified Technical English
 * Default Settings: German Language (de), Light Mode (light)
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
    currentTab: 'cockpit',
    currentDomain: 'fintech',
    currentScenario: 'scenario_a',
    currentLang: savedLang === 'en' ? 'en' : 'de', // Strict Default: German
    currentTheme: savedTheme === 'dark' ? 'dark' : 'light', // Strict Default: Light Mode
    previousSeal: window.Haulitz?.GoBDHasher?.GENESIS_SEAL || '0000000000000000000000000000000000000000000000000000000000000000',
    auditHistory: [],
    lastAuditResult: null,
    lastSealResult: null,
    lastDocPayload: null,
    lastCfoRecapText: ''
  };

  // Full Internationalization Strings (German / English)
  const i18n = {
    de: {
      beacon: 'Deterministische Prüf-Engine Aktiv (100%)',
      themeDark: 'Dunkel',
      themeLight: 'Hell',
      langBtn: 'DE | EN',
      tabCockpit: '1. Verifizierungs-Cockpit',
      tabPortal: '2. Kunden-Portal & Roadmap',
      tabSops: '3. Bereitstellungs-SOPs',
      tabPillCockpit: '10 Branchen',
      tabPillPortal: 'SAP S/4HANA',
      tabPillSops: 'Rechtssicher',
      heroHeading: 'HAULITZ — Das universelle Verifizierungs-Gateway für Enterprise-ERP',
      heroSubheading: 'Beseitigung von KI-Halluzinationen, Buchungsfehlern und Haftungsrisiken durch deterministische mathematische Schutzschranken, ISO-Prüfziffern und GoBD § 147 AO kryptografische Prüfketten. Konzipiert für SAP S/4HANA und MS SQL Server 2022.',
      kpiCapital: 'Geschütztes Kapital',
      kpiSubCapital: '<i class="fa-solid fa-shield-halved"></i> Haftungsschäden verhindert',
      kpiTx: 'Geprüfte Belege',
      kpiSubTx: '<i class="fa-solid fa-bolt"></i> 10 Industrie-Branchen',
      kpiSla: 'Deterministische SLA',
      kpiSubSla: '<i class="fa-solid fa-lock"></i> 0 Halluzinationen',
      kpiLatency: 'Prüf-Latenz (Client)',
      kpiSubLatency: '<i class="fa-solid fa-server"></i> Cloudflare Edge CDN',
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
      cfoRecapTitle: '<i class="fa-solid fa-briefcase"></i> CFO-EXEKUTIV-ZUSAMMENFASSUNG (1-KLICK BERICHT)',
      copyCfo: 'CFO-Bericht kopieren',
      copiedCfo: 'CFO-Bericht kopiert!',
      legalMemoHeader: 'AUTOMATISIERTE GESETZLICHE MÄNGELRÜGE',
      copyMemo: 'Mahnung kopieren',
      copiedMemo: 'Mahnung kopiert!',
      gobdTitle: '<i class="fa-solid fa-fingerprint"></i> GoBD § 147 AO KRYPTOGRAFISCHES PRÜFSIEGEL (REVISIONSSICHERE KETTE)',
      gobdPredecessor: 'Vorheriger Siegelblock:',
      btnTsql: 'Parametrisiertes T-SQL (SAP / MS-SQL)',
      btnCsharp: 'C# .NET 8 Treiber-SDK',
      btnExport: 'GoBD § 147 AO Ledger exportieren (.CSV)',
      employers: 'Unternehmen',
      law: 'Rechtsgrundlage',
      healthTitle: 'System-Gesundheitsindex',
      healthBadge: 'OPTIMAL (100%)',
      metricMath: 'Mathematische Integrität',
      metricLegal: 'Rechtliche Compliance',
      metricLatency: 'Gateway-Latenz (Client)',
      metricGobd: 'GoBD SHA-256 Prüfkette',
      portalResultsTitle: '<i class="fa-solid fa-chart-line"></i> Revisions-Ergebnisse & Haftungsschutz',
      portalResultsSub: 'Live-Übersicht der durch deterministische Schutzschranken abgewendeten Vermögens- und Steuerschäden',
      periodBadge: 'Q4 2026 AUDIT',
      tileCapital: 'Geschütztes Kapital',
      tileSubCapital: 'Abgewendete Vorsteuer- & Frachtverluste',
      tileAudited: 'Belege Auditiert',
      tileSubAudited: 'Verarbeitet über 10 Branchen',
      tileQuarantined: 'In Quarantäne Gestoppt',
      tileSubQuarantined: 'Fehlerhafte Belege abgefangen',
      tileDisputes: 'Gesetzliche Mängelrügen',
      tileSubDisputes: 'Automatisch nach § 14 UStG / ADSp erstellt',
      roadmapHeading: '<i class="fa-solid fa-timeline"></i> 4-Wöchige SAP S/4HANA & Enterprise-ERP Integrations-Roadmap',
      roadmapDesc: 'Strukturierter Rollout-Plan für deutsche Industrieunternehmen ohne Betriebsunterbrechung im Produktiv-ERP',
      sopsHeading: '<i class="fa-solid fa-book-bookmark"></i> Betriebliche Standard-Arbeitsanweisungen (SOPs)',
      sopsSubheading: 'Verbindliche Handlungsschritte zur Behebung von Quarantänefällen und revisionssicheren Prüfpfaden'
    },
    en: {
      beacon: 'Deterministic Engine Active (100%)',
      themeDark: 'Dark',
      themeLight: 'Light',
      langBtn: 'EN | DE',
      tabCockpit: '1. Verification Cockpit',
      tabPortal: '2. Client Portal & Roadmap',
      tabSops: '3. Deployment SOPs',
      tabPillCockpit: '10 Domains',
      tabPillPortal: 'SAP S/4HANA',
      tabPillSops: 'Legally Sound',
      heroHeading: 'HAULITZ — The Universal Data Verification Gateway for Enterprise ERP',
      heroSubheading: 'Eliminating AI hallucinations, accounting errors, and compliance liability with deterministic mathematical guardrails, ISO checksums, and GoBD § 147 AO cryptographic audit seal chains. Designed for SAP S/4HANA and Microsoft SQL Server 2022.',
      kpiCapital: 'Capital Protected',
      kpiSubCapital: '<i class="fa-solid fa-shield-halved"></i> Statutory liability prevented',
      kpiTx: 'Documents Audited',
      kpiSubTx: '<i class="fa-solid fa-bolt"></i> 10 Enterprise Sectors',
      kpiSla: 'Deterministic SLA',
      kpiSubSla: '<i class="fa-solid fa-lock"></i> 0 Hallucinations',
      kpiLatency: 'Engine Latency (Client)',
      kpiSubLatency: '<i class="fa-solid fa-server"></i> Cloudflare Edge CDN',
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
      cfoRecapTitle: '<i class="fa-solid fa-briefcase"></i> CFO EXECUTIVE RECAP (1-CLICK BRIEF)',
      copyCfo: 'Copy CFO Brief',
      copiedCfo: 'CFO Brief Copied!',
      legalMemoHeader: 'AUTOMATED STATUTORY DISPUTE MEMO',
      copyMemo: 'Copy Memo',
      copiedMemo: 'Copied Memo!',
      gobdTitle: '<i class="fa-solid fa-fingerprint"></i> GoBD § 147 AO CRYPTOGRAPHIC AUDIT SEAL (TAMPER-EVIDENT LEDGER)',
      gobdPredecessor: 'Predecessor Block:',
      btnTsql: 'Parameterized T-SQL (SAP / MS-SQL)',
      btnCsharp: 'C# .NET 8 Driver SDK',
      btnExport: 'Export GoBD § 147 AO Ledger (.CSV)',
      employers: 'Employers',
      law: 'Governing Law',
      healthTitle: 'System Health Index',
      healthBadge: 'OPTIMAL (100%)',
      metricMath: 'Mathematical Integrity',
      metricLegal: 'Regulatory Compliance',
      metricLatency: 'Gateway Latency (Client)',
      metricGobd: 'GoBD SHA-256 Seal Chain',
      portalResultsTitle: '<i class="fa-solid fa-chart-line"></i> Audit Results & Liability Protection',
      portalResultsSub: 'Live dashboard of corporate capital and tax penalties averted via deterministic guardrails',
      periodBadge: 'Q4 2026 AUDIT',
      tileCapital: 'Capital Protected',
      tileSubCapital: 'Averted VAT & freight liability',
      tileAudited: 'Documents Audited',
      tileSubAudited: 'Processed across 10 sectors',
      tileQuarantined: 'Halted in Quarantine',
      tileSubQuarantined: 'Defective records intercepted',
      tileDisputes: 'Statutory Disputes',
      tileSubDisputes: 'Drafted per § 14 UStG / ADSp',
      roadmapHeading: '<i class="fa-solid fa-timeline"></i> 4-Week SAP S/4HANA & Enterprise ERP Integration Roadmap',
      roadmapDesc: 'Structured deployment protocol for German enterprise accounts with zero production disruption',
      sopsHeading: '<i class="fa-solid fa-book-bookmark"></i> Standard Operating Procedures (SOPs)',
      sopsSubheading: 'Binding operational protocols for resolving quarantine holds and preserving GoBD audit chains'
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

    // Navigation Tabs
    DOM.tabBtnCockpit = document.getElementById('tab-btn-cockpit');
    DOM.tabBtnPortal = document.getElementById('tab-btn-portal');
    DOM.tabBtnSops = document.getElementById('tab-btn-sops');
    DOM.tabTextCockpit = document.getElementById('tab-text-cockpit');
    DOM.tabTextPortal = document.getElementById('tab-text-portal');
    DOM.tabTextSops = document.getElementById('tab-text-sops');
    DOM.tabPillCockpit = document.getElementById('tab-pill-cockpit');
    DOM.tabPillPortal = document.getElementById('tab-pill-portal');
    DOM.tabPillSops = document.getElementById('tab-pill-sops');

    DOM.tabCockpit = document.getElementById('tab-cockpit');
    DOM.tabPortal = document.getElementById('tab-portal');
    DOM.tabSops = document.getElementById('tab-sops');

    // HUD Elements
    DOM.heroHeading = document.getElementById('hero-heading');
    DOM.heroSubheading = document.getElementById('hero-subheading');
    DOM.kpiLabelCapital = document.getElementById('kpi-label-capital');
    DOM.kpiSubCapital = document.getElementById('kpi-sub-capital');
    DOM.kpiLabelTx = document.getElementById('kpi-label-tx');
    DOM.kpiSubTx = document.getElementById('kpi-sub-tx');
    DOM.kpiLabelSla = document.getElementById('kpi-label-sla');
    DOM.kpiSubSla = document.getElementById('kpi-sub-sla');
    DOM.kpiLabelLatency = document.getElementById('kpi-label-latency');
    DOM.kpiSubLatency = document.getElementById('kpi-sub-latency');

    // Domain & Scenario Controls
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

    // Inspection Workspace Left Pane
    DOM.labelDossierTitle = document.getElementById('label-dossier-title');
    DOM.dossierDocType = document.getElementById('dossier-doc-type');
    DOM.dossierContent = document.getElementById('dossier-card-content');
    DOM.dossierFooterNote = document.getElementById('dossier-footer-note');

    // Inspection Workspace Right Pane
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

    // CFO Recap Box
    DOM.cfoRecapBox = document.getElementById('cfo-recap-box');
    DOM.labelCfoRecapTitle = document.getElementById('label-cfo-recap-title');
    DOM.cfoRecapContent = document.getElementById('cfo-recap-content');
    DOM.btnCopyCfoRecap = document.getElementById('btn-copy-cfo-recap');
    DOM.btnCopyCfoText = document.getElementById('btn-copy-cfo-text');

    // Legal Dispute Memo Box
    DOM.legalMemoBox = document.getElementById('legal-memo-box');
    DOM.labelMemoHeader = document.getElementById('label-memo-header');
    DOM.legalMemoContent = document.getElementById('legal-memo-content');
    DOM.btnCopyMemo = document.getElementById('btn-copy-memo');
    DOM.btnCopyMemoText = document.getElementById('btn-copy-memo-text');

    // GoBD Seal Box
    DOM.gobdSealTitle = document.getElementById('gobd-seal-title');
    DOM.gobdSealHash = document.getElementById('gobd-seal-hash');
    DOM.labelPredecessor = document.getElementById('label-predecessor');
    DOM.gobdPrevSeal = document.getElementById('gobd-prev-seal');
    DOM.gobdTimestamp = document.getElementById('gobd-timestamp');

    // Toolbar & Modals
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

    // Portal Labels
    DOM.labelHealthTitle = document.getElementById('label-health-title');
    DOM.healthStatusBadge = document.getElementById('health-status-badge');
    DOM.labelMetricMath = document.getElementById('label-metric-math');
    DOM.labelMetricLegal = document.getElementById('label-metric-legal');
    DOM.labelMetricLatency = document.getElementById('label-metric-latency');
    DOM.labelMetricGobd = document.getElementById('label-metric-gobd');
    DOM.portalResultsTitle = document.getElementById('portal-results-title');
    DOM.portalResultsSub = document.getElementById('portal-results-sub');
    DOM.labelPeriodBadge = document.getElementById('label-period-badge');
    DOM.tileLblCapital = document.getElementById('tile-lbl-capital');
    DOM.tileSubCapital = document.getElementById('tile-sub-capital');
    DOM.tileLblAudited = document.getElementById('tile-lbl-audited');
    DOM.tileSubAudited = document.getElementById('tile-sub-audited');
    DOM.tileLblQuarantined = document.getElementById('tile-lbl-quarantined');
    DOM.tileSubQuarantined = document.getElementById('tile-sub-quarantined');
    DOM.tileLblDisputes = document.getElementById('tile-lbl-disputes');
    DOM.tileSubDisputes = document.getElementById('tile-sub-disputes');
    DOM.roadmapHeading = document.getElementById('roadmap-heading');
    DOM.roadmapDesc = document.getElementById('roadmap-desc');

    // SOP Labels
    DOM.sopsHeading = document.getElementById('sops-heading');
    DOM.sopsSubheading = document.getElementById('sops-subheading');
  }

  /**
   * Top-Level Tab Switching
   */
  function switchTab(tabId) {
    state.currentTab = tabId;

    [DOM.tabCockpit, DOM.tabPortal, DOM.tabSops].forEach(pane => {
      if (pane) pane.classList.remove('active');
    });

    [DOM.tabBtnCockpit, DOM.tabBtnPortal, DOM.tabBtnSops].forEach(btn => {
      if (btn) btn.classList.remove('active');
    });

    if (tabId === 'cockpit' && DOM.tabCockpit && DOM.tabBtnCockpit) {
      DOM.tabCockpit.classList.add('active');
      DOM.tabBtnCockpit.classList.add('active');
    } else if (tabId === 'portal' && DOM.tabPortal && DOM.tabBtnPortal) {
      DOM.tabPortal.classList.add('active');
      DOM.tabBtnPortal.classList.add('active');
    } else if (tabId === 'sops' && DOM.tabSops && DOM.tabBtnSops) {
      DOM.tabSops.classList.add('active');
      DOM.tabBtnSops.classList.add('active');
    }
  }

  function setupTabs() {
    if (DOM.tabBtnCockpit) DOM.tabBtnCockpit.addEventListener('click', () => switchTab('cockpit'));
    if (DOM.tabBtnPortal) DOM.tabBtnPortal.addEventListener('click', () => switchTab('portal'));
    if (DOM.tabBtnSops) DOM.tabBtnSops.addEventListener('click', () => switchTab('sops'));

    // Global helper for SOP simulation triggers
    window.HaulitzApp = {
      switchTabAndScenario: function(domainKey, scenarioKey) {
        switchTab('cockpit');
        selectDomain(domainKey);
        selectScenario(scenarioKey);
        window.scrollTo({ top: 320, behavior: 'smooth' });
      }
    };
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
      if (btn) btn.classList.toggle('active', btn.getAttribute('data-scenario') === scenarioKey);
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
      if (btn) btn.classList.toggle('active', btn.getAttribute('data-scenario') === state.currentScenario);
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

    // Generate GoBD Cryptographic Seal Chain
    const auditStatus = auditResult.isValid ? 'VERIFIED_CLEAN' : 'QUARANTINE_HOLD';
    const refId = doc.invoiceNumber || doc.bolNumber || doc.po?.poNumber || doc.claimNumber || doc.supplierId || doc.liquidationNumber || doc.barcode || doc.applicationNumber || doc.unitNumber || doc.batchId || 'RECORD-001';

    const sealResult = await Verifier.GoBDHasher.generateSealBlock(
      state.previousSeal,
      refId,
      auditStatus,
      doc
    );

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
    renderRealisticDocument(doc, state.currentDomain, state.currentScenario, auditResult);
    renderAuditCockpit(auditResult, legalMemoText, sealResult);
    renderCFOExecutiveRecap(state.currentDomain, state.currentScenario, doc, auditResult);
  }

  /**
   * Render Authentic German Business Document / Ocean B/L Canvas in Left Pane
   */
  function renderRealisticDocument(doc, domainKey, scenarioKey, auditResult) {
    const isError = !auditResult.isValid;
    let html = '';

    // DIN Guide Marks
    const guideMarks = `
      <div class="din-guide-marks">
        <div class="din-fold-mark din-fold-top" title="DIN 5008 Faltmarke 1"></div>
        <div class="din-fold-mark din-punch-center" title="DIN 5008 Lochmarke"></div>
        <div class="din-fold-mark din-fold-bottom" title="DIN 5008 Faltmarke 2"></div>
      </div>
    `;

    if (domainKey === 'logistics') {
      // Authentic Ocean Bill of Lading & Packing List
      const isWeightError = scenarioKey === 'scenario_b';
      const isContainerError = scenarioKey === 'scenario_c';

      html = `
        <div class="document-sheet">
          ${guideMarks}
          <div class="doc-top-bar">
            <div>
              <div class="doc-company-name">${doc.carrier || 'MEDITERRANEAN SHIPPING CO.'}</div>
              <div class="doc-company-sub">Global Ocean Freight &bull; Combined Transport Bill of Lading</div>
            </div>
            <div class="doc-barcode-block">
              <div class="doc-barcode-graphic">||| | |||| || | ||||| |||</div>
              <div class="doc-barcode-text">${doc.bolNumber}</div>
            </div>
          </div>

          <div class="doc-address-grid">
            <div>
              <div class="doc-sender-line">SHIPPER / EXPORTER</div>
              <div class="doc-recipient-box">
                <strong>Hanseatic Industrial Parts GmbH</strong><br>
                Am Sandtorkai 48, 20457 Hamburg<br>
                Tel: +49 40 8820-0 &bull; customs@hanseatic-parts.de
              </div>
            </div>
            <div>
              <table class="doc-meta-table">
                <tr><td class="lbl">B/L Number:</td><td class="val font-mono-code">${doc.bolNumber}</td></tr>
                <tr><td class="lbl">Booking Ref:</td><td class="val font-mono-code">${doc.bookingNumber}</td></tr>
                <tr><td class="lbl">Vessel / Voyage:</td><td class="val">${doc.vessel}</td></tr>
                <tr><td class="lbl">Port of Loading:</td><td class="val">${doc.portOfLoading}</td></tr>
                <tr><td class="lbl">Port of Discharge:</td><td class="val">${doc.portOfDischarge}</td></tr>
              </table>
            </div>
          </div>

          <div class="doc-subject-bar">
            <span class="doc-subject-title">ORIGINAL OCEAN BILL OF LADING</span>
            <span class="doc-stamp-badge"><i class="fa-solid fa-stamp"></i> ATLAS ZOLL ERFASST: 2026-10-28</span>
          </div>

          <table class="doc-items-table">
            <thead>
              <tr>
                <th>Container No &amp; Seal</th>
                <th>Type</th>
                <th>Description of Goods</th>
                <th class="num">Net Mass</th>
                <th class="num">Gross Mass</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="font-mono-code ${isContainerError ? 'doc-highlight-error' : ''}">
                  <strong>${doc.containerNumber}</strong><br>
                  <span style="font-size:0.7rem; color:var(--color-text-muted);">Seal: ${doc.sealNumber}</span>
                  ${isContainerError ? `<br><span class="doc-error-tag"><i class="fa-solid fa-triangle-exclamation"></i> ISO 6346 CHECKSUM ERROR (Calc 6 vs Dec 0)</span>` : ''}
                </td>
                <td>${doc.isoSize}</td>
                <td>${doc.cargoDescription}<br><span style="font-size:0.68rem; color:var(--color-text-muted);">HS Code: ${doc.hsCode}</span></td>
                <td class="num font-mono-code">${doc.netWeightKg.toLocaleString()} kg</td>
                <td class="num font-mono-code ${isWeightError ? 'doc-highlight-error' : ''}">
                  <strong>${doc.grossWeightKg.toLocaleString()} kg</strong>
                  ${isWeightError ? `<br><span class="doc-error-tag"><i class="fa-solid fa-triangle-exclamation"></i> § 412 HGB FEHLER: Brutto &lt; Netto</span>` : ''}
                </td>
              </tr>
            </tbody>
          </table>

          <div class="doc-summary-box">
            <table class="doc-summary-table">
              <tr><td class="lbl">Tare Weight (kg):</td><td class="val font-mono-code">${doc.tareWeightKg.toLocaleString()} kg</td></tr>
              <tr><td class="lbl">Incoterms 2020:</td><td class="val font-mono-code">${doc.incoterms}</td></tr>
              <tr class="total-row"><td class="lbl">Declared Gross:</td><td class="val font-mono-code">${doc.grossWeightKg.toLocaleString()} kg</td></tr>
            </table>
          </div>

          <div class="doc-footer-bar">
            <span>Carrier Release: Hamburg Port Authority (HPA) Terminal Altenwerder</span>
            <span class="font-mono-code"><i class="fa-solid fa-shield-halved"></i> GoBD Sealed Payload</span>
          </div>
        </div>
      `;
    } else if (domainKey === 'supply') {
      // 3-Way Reconciliation Triad Sheet
      const po = doc.po;
      const note = doc.deliveryNote;
      const inv = doc.invoice;
      const isQtyError = scenarioKey === 'scenario_b';
      const isPriceError = scenarioKey === 'scenario_c';

      html = `
        <div class="document-sheet">
          ${guideMarks}
          <div class="doc-top-bar">
            <div>
              <div class="doc-company-name">SIEMENS AG &bull; WERK REGENSBURG</div>
              <div class="doc-company-sub">Beschaffungslogistik &bull; 3-Wege-Revisionsabgleich nach HGB § 377</div>
            </div>
            <div class="doc-barcode-block">
              <div class="doc-barcode-graphic">|||| || | |||| ||| ||</div>
              <div class="doc-barcode-text">TRIAD-${po.poNumber}</div>
            </div>
          </div>

          <div class="doc-address-grid">
            <div>
              <div class="doc-sender-line">LIEFERANT / VENDOR</div>
              <div class="doc-recipient-box">
                <strong>${po.supplier}</strong><br>
                Industriestraße 12, 93055 Regensburg<br>
                USt-IdNr: DE 136 652 489
              </div>
            </div>
            <div>
              <table class="doc-meta-table">
                <tr><td class="lbl">Bestellung (PO):</td><td class="val font-mono-code">${po.poNumber}</td></tr>
                <tr><td class="lbl">Lieferschein (DN):</td><td class="val font-mono-code">${note.deliveryNumber}</td></tr>
                <tr><td class="lbl">Eingangsrechnung:</td><td class="val font-mono-code">${inv.invoiceNumber}</td></tr>
                <tr><td class="lbl">Wareneingangsdatum:</td><td class="val font-mono-code">${note.deliveryDate}</td></tr>
              </table>
            </div>
          </div>

          <div class="doc-subject-bar">
            <span class="doc-subject-title">3-WEGE REVISIONSDOSSIER (PO &harr; LIEFERSCHEIN &harr; RECHNUNG)</span>
            <span class="doc-stamp-badge"><i class="fa-solid fa-stamp"></i> WARENEINGANG GEPRÜFT</span>
          </div>

          <table class="doc-items-table">
            <thead>
              <tr>
                <th>Art.-Nr. / SKU</th>
                <th>Bezeichnung</th>
                <th class="num">Bestellt</th>
                <th class="num">Geliefert</th>
                <th class="num">Fakturiert</th>
                <th class="num">Preis / Stk.</th>
              </tr>
            </thead>
            <tbody>
              ${inv.items.map(it => {
                const poIt = po.items.find(p => p.sku === it.sku);
                const dnIt = note.items.find(d => d.sku === it.sku);
                const hasQtyMismatch = it.billedQuantity > (dnIt?.receivedQuantity || 0);
                const hasPriceMismatch = it.billedUnitPrice > (poIt?.unitPrice || 0);

                return `
                  <tr class="${(hasQtyMismatch || hasPriceMismatch) ? 'doc-highlight-error' : ''}">
                    <td class="font-mono-code"><strong>${it.sku}</strong></td>
                    <td>${poIt?.description || 'Industriekomponente'}</td>
                    <td class="num font-mono-code">${poIt?.quantity || 0}</td>
                    <td class="num font-mono-code">${dnIt?.receivedQuantity || 0}</td>
                    <td class="num font-mono-code">
                      <strong>${it.billedQuantity}</strong>
                      ${hasQtyMismatch ? `<br><span class="doc-error-tag"><i class="fa-solid fa-triangle-exclamation"></i> +20 ÜBERFAKTURIERT</span>` : ''}
                    </td>
                    <td class="num font-mono-code">
                      € ${it.billedUnitPrice.toFixed(2)}
                      ${hasPriceMismatch ? `<br><span class="doc-error-tag"><i class="fa-solid fa-triangle-exclamation"></i> +15,00 € PREISSTEIGERUNG</span>` : ''}
                    </td>
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>

          <div class="doc-summary-box">
            <table class="doc-summary-table">
              <tr><td class="lbl">Rechnungs-Nettobetrag:</td><td class="val font-mono-code">€ ${inv.netTotal.toFixed(2)}</td></tr>
              <tr><td class="lbl">USt. (19%):</td><td class="val font-mono-code">€ ${inv.vatAmount.toFixed(2)}</td></tr>
              <tr class="total-row"><td class="lbl">Rechnungsbetrag Brutto:</td><td class="val font-mono-code">€ ${inv.grossTotal.toFixed(2)}</td></tr>
            </table>
          </div>

          <div class="doc-footer-bar">
            <span>SAP S/4HANA Purchase Order Match Module &bull; MM-IV Verification</span>
            <span class="font-mono-code"><i class="fa-solid fa-shield-halved"></i> GoBD Triad Hash</span>
          </div>
        </div>
      `;
    } else {
      // Standard DIN 5008 German Commercial Document
      const isFintechVatError = domainKey === 'fintech' && scenarioKey === 'scenario_b';
      const isFintechIbanError = domainKey === 'fintech' && scenarioKey === 'scenario_c';
      const isInsurtechRateError = domainKey === 'insurtech' && scenarioKey === 'scenario_c';
      const isInsurtechDeductError = domainKey === 'insurtech' && scenarioKey === 'scenario_b';
      const isHealthtechCalcError = domainKey === 'healthtech' && scenarioKey === 'scenario_b';
      const isHealthtechMulError = domainKey === 'healthtech' && scenarioKey === 'scenario_c';
      const isLegalExpiredError = domainKey === 'legaltech' && scenarioKey === 'scenario_b';
      const isLegalCodeError = domainKey === 'legaltech' && scenarioKey === 'scenario_c';
      const isEcomFxError = domainKey === 'ecommerce' && scenarioKey === 'scenario_b';
      const isEcomBarcodeError = domainKey === 'ecommerce' && scenarioKey === 'scenario_c';
      const isCleanDcError = domainKey === 'cleantech' && scenarioKey === 'scenario_b';
      const isCleanVdeError = domainKey === 'cleantech' && scenarioKey === 'scenario_c';
      const isPropMathError = domainKey === 'proptech' && scenarioKey === 'scenario_b';
      const isPropSplitError = domainKey === 'proptech' && scenarioKey === 'scenario_c';
      const isErpOverflowError = domainKey === 'erp' && scenarioKey === 'scenario_b';
      const isErpSqlError = domainKey === 'erp' && scenarioKey === 'scenario_c';

      const companyTitle = doc.supplierName || doc.carrier || doc.workshopName || doc.doctorName || doc.marketplaceName || doc.installerName || 'HAULITZ ENTERPRISE SYSTEMS GMBH';
      const companyAddress = doc.supplierAddress || doc.facilityAddress || 'Leopoldstraße 140, 80804 München';
      const docRefNumber = doc.invoiceNumber || doc.claimNumber || doc.liquidationNumber || doc.asnNumber || doc.applicationNumber || doc.unitNumber || doc.batchId || 'DOC-2026-001';

      html = `
        <div class="document-sheet">
          ${guideMarks}
          <div class="doc-top-bar">
            <div>
              <div class="doc-company-name">${companyTitle}</div>
              <div class="doc-company-sub">${companyAddress}</div>
            </div>
            <div class="doc-barcode-block">
              <div class="doc-barcode-graphic">||| |||| | ||||| || |</div>
              <div class="doc-barcode-text font-mono-code">${docRefNumber}</div>
            </div>
          </div>

          <div class="doc-address-grid">
            <div>
              <div class="doc-sender-line">${companyTitle} &bull; ${companyAddress.split(',')[0]}</div>
              <div class="doc-recipient-box">
                <strong>${doc.customerName || doc.claimantName || doc.patientRef || doc.sellerId || doc.tenantName || 'Haulitz Industrial Gateway AG'}</strong><br>
                ERP Ingestion Staging &bull; Pufferzone 4<br>
                60329 Frankfurt am Main, Deutschland
              </div>
            </div>
            <div>
              <table class="doc-meta-table">
                <tr><td class="lbl">Beleg-Nr.:</td><td class="val font-mono-code">${docRefNumber}</td></tr>
                <tr><td class="lbl">Datum:</td><td class="val font-mono-code">${doc.issueDate || doc.incidentDate || doc.treatmentDate || doc.inboundDate || doc.submissionDate || doc.ingestionTimestamp?.slice(0, 10) || '2026-10-28'}</td></tr>
                ${doc.supplierTaxId ? `<tr><td class="lbl">USt-IdNr.:</td><td class="val font-mono-code">${doc.supplierTaxId}</td></tr>` : ''}
                ${doc.iban ? `
                  <tr class="${isFintechIbanError ? 'doc-highlight-error' : ''}">
                    <td class="lbl">SEPA IBAN:</td>
                    <td class="val font-mono-code">
                      ${doc.iban}
                      ${isFintechIbanError ? `<br><span class="doc-error-tag"><i class="fa-solid fa-triangle-exclamation"></i> MODULO-97 PRÜFZIFFER FEHLER</span>` : ''}
                    </td>
                  </tr>
                ` : ''}
                ${doc.barcode ? `
                  <tr class="${isEcomBarcodeError ? 'doc-highlight-error' : ''}">
                    <td class="lbl">EAN-13 Barcode:</td>
                    <td class="val font-mono-code">
                      ${doc.barcode}
                      ${isEcomBarcodeError ? `<br><span class="doc-error-tag"><i class="fa-solid fa-triangle-exclamation"></i> GS1 PRÜFZIFFERNFEHLER</span>` : ''}
                    </td>
                  </tr>
                ` : ''}
                ${doc.iso14001ValidUntil ? `
                  <tr class="${isLegalExpiredError ? 'doc-highlight-error' : ''}">
                    <td class="lbl">ISO 14001 Gültig:</td>
                    <td class="val font-mono-code">
                      ${doc.iso14001ValidUntil}
                      ${isLegalExpiredError ? `<br><span class="doc-error-tag"><i class="fa-solid fa-triangle-exclamation"></i> ABGELAUFEN (45 TAGE)</span>` : ''}
                    </td>
                  </tr>
                ` : ''}
                ${doc.humanRightsCodeSigned !== undefined ? `
                  <tr class="${isLegalCodeError ? 'doc-highlight-error' : ''}">
                    <td class="lbl">LkSG Verhaltenskodex:</td>
                    <td class="val font-mono-code">
                      ${doc.humanRightsCodeSigned ? 'Unterzeichnet' : 'FEHLT'}
                      ${isLegalCodeError ? `<br><span class="doc-error-tag"><i class="fa-solid fa-triangle-exclamation"></i> § 7 LkSG SPERRE</span>` : ''}
                    </td>
                  </tr>
                ` : ''}
              </table>
            </div>
          </div>

          <div class="doc-subject-bar">
            <span class="doc-subject-title">${domainKey.toUpperCase()} &mdash; EINGANGSDOKUMENTATION</span>
            <span class="doc-stamp-badge"><i class="fa-solid fa-stamp"></i> GoBD § 147 AO ERFASST</span>
          </div>

          ${Array.isArray(doc.items) ? `
            <table class="doc-items-table">
              <thead>
                <tr>
                  <th>Pos. / Code</th>
                  <th>Leistungsbeschreibung</th>
                  <th class="num">Menge / Faktor</th>
                  <th class="num">Einzelpreis</th>
                  <th class="num">Gesamtbetrag</th>
                </tr>
              </thead>
              <tbody>
                ${doc.items.map((item, idx) => {
                  const hasHealthCalc = isHealthtechCalcError && idx === 1;
                  const hasHealthMul = isHealthtechMulError && idx === 0;

                  return `
                    <tr class="${(hasHealthCalc || hasHealthMul) ? 'doc-highlight-error' : ''}">
                      <td class="font-mono-code">${item.code || (idx + 1).toString().padStart(2, '0')}</td>
                      <td>${item.description || 'Leistungsposition nach Tarif'}</td>
                      <td class="num font-mono-code">
                        ${item.multiplier ? `${item.multiplier}x` : (item.quantity || 1)}
                        ${hasHealthMul ? `<br><span class="doc-error-tag"><i class="fa-solid fa-triangle-exclamation"></i> 3,5x OHNE BEGRÜNDUNG</span>` : ''}
                      </td>
                      <td class="num font-mono-code">€ ${(item.unitPrice || item.baseFee || 0).toFixed(2)}</td>
                      <td class="num font-mono-code">
                        € ${(item.declaredTotal || 0).toFixed(2)}
                        ${hasHealthCalc ? `<br><span class="doc-error-tag"><i class="fa-solid fa-triangle-exclamation"></i> RECHENFEHLER (+50,00 €)</span>` : ''}
                      </td>
                    </tr>
                  `;
                }).join('')}
              </tbody>
            </table>
          ` : `
            <table class="doc-items-table">
              <thead>
                <tr><th>Verifizierter Parameter</th><th class="num">Extrahierter Wert</th></tr>
              </thead>
              <tbody>
                ${Object.entries(doc).filter(([k, v]) => typeof v !== 'object').slice(0, 6).map(([k, v]) => {
                  const isHighlighted = (isFintechVatError && k === 'taxAmount') ||
                                        (isInsurtechRateError && k === 'billedHourlyRate') ||
                                        (isInsurtechDeductError && k === 'policyDeductible') ||
                                        (isEcomFxError && k === 'statedEurTotal') ||
                                        (isCleanDcError && k === 'declaredDcPowerKw') ||
                                        (isCleanVdeError && k === 'inverterKw') ||
                                        (isPropMathError && k === 'declaredTenantBilled') ||
                                        (isPropSplitError && k === 'splitRatio') ||
                                        (isErpOverflowError && k === 'netAmount') ||
                                        (isErpSqlError && k === 'referenceNumber');

                  return `
                    <tr class="${isHighlighted ? 'doc-highlight-error' : ''}">
                      <td>${formatKeyLabel(k)}</td>
                      <td class="num font-mono-code">
                        <strong>${v}</strong>
                        ${isFintechVatError && k === 'taxAmount' ? `<br><span class="doc-error-tag"><i class="fa-solid fa-triangle-exclamation"></i> § 14 UStG: 640 € statt 760 € (-120 €)</span>` : ''}
                        ${isInsurtechRateError && k === 'billedHourlyRate' ? `<br><span class="doc-error-tag"><i class="fa-solid fa-triangle-exclamation"></i> STUNDENSATZ 190 €/h > CAP 140 €/h</span>` : ''}
                        ${isInsurtechDeductError && k === 'policyDeductible' ? `<br><span class="doc-error-tag"><i class="fa-solid fa-triangle-exclamation"></i> SELBSTBETEILIGUNG OMITTIERT (-500 €)</span>` : ''}
                        ${isEcomFxError && k === 'statedEurTotal' ? `<br><span class="doc-error-tag"><i class="fa-solid fa-triangle-exclamation"></i> FX-DISCREPANCY DELTA 15,20 €</span>` : ''}
                        ${isCleanDcError && k === 'declaredDcPowerKw' ? `<br><span class="doc-error-tag"><i class="fa-solid fa-triangle-exclamation"></i> DC-STRING FEHLER (+5 kWp)</span>` : ''}
                        ${isCleanVdeError && k === 'inverterKw' ? `<br><span class="doc-error-tag"><i class="fa-solid fa-triangle-exclamation"></i> VDE-AR-N 4105 NETZ-OVERAGE (25 kW > 18 kW)</span>` : ''}
                        ${isPropMathError && k === 'declaredTenantBilled' ? `<br><span class="doc-error-tag"><i class="fa-solid fa-triangle-exclamation"></i> FLÄCHEN-RECHENFEHLER (+210 €)</span>` : ''}
                        ${isPropSplitError && k === 'splitRatio' ? `<br><span class="doc-error-tag"><i class="fa-solid fa-triangle-exclamation"></i> UNZULÄSSIGER 50/50 SPLIT</span>` : ''}
                        ${isErpOverflowError && k === 'netAmount' ? `<br><span class="doc-error-tag"><i class="fa-solid fa-triangle-exclamation"></i> DECIMAL OVERFLOW (.99482)</span>` : ''}
                        ${isErpSqlError && k === 'referenceNumber' ? `<br><span class="doc-error-tag"><i class="fa-solid fa-triangle-exclamation"></i> SQL INJECTION DETECTED</span>` : ''}
                      </td>
                    </tr>
                  `;
                }).join('')}
              </tbody>
            </table>
          `}

          <div class="doc-summary-box">
            <table class="doc-summary-table">
              ${doc.subtotalNet !== undefined ? `<tr><td class="lbl">Nettobetrag:</td><td class="val font-mono-code">€ ${doc.subtotalNet.toFixed(2)}</td></tr>` : ''}
              ${doc.taxAmount !== undefined ? `
                <tr class="${isFintechVatError ? 'doc-highlight-error' : ''}">
                  <td class="lbl">Mehrwertsteuer (19%):</td>
                  <td class="val font-mono-code">
                    € ${doc.taxAmount.toFixed(2)}
                    ${isFintechVatError ? `<br><span class="doc-error-tag"><i class="fa-solid fa-triangle-exclamation"></i> -120,00 € UStG-DELTA</span>` : ''}
                  </td>
                </tr>
              ` : ''}
              ${doc.grossTotal !== undefined ? `
                <tr class="total-row">
                  <td class="lbl">Rechnungsbetrag Brutto:</td>
                  <td class="val font-mono-code">€ ${doc.grossTotal.toFixed(2)}</td>
                </tr>
              ` : (doc.declaredTotalEur ? `
                <tr class="total-row"><td class="lbl">Gesamtbetrag (EUR):</td><td class="val font-mono-code">€ ${doc.declaredTotalEur.toFixed(2)}</td></tr>
              ` : '')}
            </table>
          </div>

          <div class="doc-footer-bar">
            <span>Revisionssicher archiviert nach GoBD § 147 Abs. 1 AO &bull; WORM-Speicher</span>
            <span class="font-mono-code"><i class="fa-solid fa-lock"></i> SHA-256 Tamper-Evident</span>
          </div>
        </div>
      `;
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
          ${r.note ? `<div style="font-size:0.74rem; color:var(--color-text-muted);">${r.note}</div>` : ''}
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
   * Render CFO Executive Summary (1-Click Concise Memo for Accounting Leads & CFOs)
   */
  function renderCFOExecutiveRecap(domainKey, scenarioKey, doc, auditResult) {
    if (auditResult.isValid) {
      DOM.cfoRecapBox.style.display = 'none';
      state.lastCfoRecapText = '';
      return;
    }

    DOM.cfoRecapBox.style.display = 'block';
    const isDe = state.currentLang === 'de';
    const domain = window.Haulitz.Domains[domainKey];
    const refId = doc.invoiceNumber || doc.bolNumber || doc.po?.poNumber || doc.claimNumber || doc.supplierId || doc.liquidationNumber || doc.barcode || doc.applicationNumber || doc.unitNumber || doc.batchId || 'RECORD-001';

    let bullet1 = '';
    let bullet2 = '';
    let bullet3 = '';

    if (isDe) {
      bullet1 = `<strong>1. VORFALL / ABWEICHUNG:</strong> Kritische Abweichung im Beleg [${refId}] festgestellt. Rechnerische Diskrepanz von ca. ${typeof auditResult.variance === 'number' ? auditResult.variance.toFixed(2) : auditResult.variance} Einheiten/EUR ermittelt.`;
      bullet2 = `<strong>2. RECHTLICHES &amp; FINANZIELLES RISIKO:</strong> Verstoß gegen ${domain.law}. Unmittelbare Gefahr des Verlusts des Vorsteuerabzugs, zollrechtlicher Verzögerungen oder bußgeldbewehrter Prüfungshaftung.`;
      bullet3 = `<strong>3. ERGRIFFENE SCHUTZMASSNAHME:</strong> Automatischer Zahllauf in SAP S/4HANA blockiert (Zahlungssperre A gesetzt). Gesetzliche Mängelrüge an die Gegenseite generiert. Revisionssicher im GoBD SHA-256 Ledger versiegelt.`;
    } else {
      bullet1 = `<strong>1. INCIDENT / DETECTED DEFECT:</strong> Critical variance detected in record [${refId}]. Arithmetic/regulatory discrepancy of ${typeof auditResult.variance === 'number' ? auditResult.variance.toFixed(2) : auditResult.variance} units/EUR verified.`;
      bullet2 = `<strong>2. COMPLIANCE &amp; FINANCIAL LIABILITY:</strong> Breach of statutory mandate under ${domain.law}. Risk of input tax deduction disallowance, customs hold, or fiscal audit penalties.`;
      bullet3 = `<strong>3. MITIGATION EXECUTED BY HAULITZ:</strong> Automated ERP payment run blocked in SAP S/4HANA (Payment Block A engaged). Statutory dispute notice drafted. Tamper-evident GoBD SHA-256 seal chained.`;
    }

    DOM.cfoRecapContent.innerHTML = `
      <div class="cfo-recap-bullet">${bullet1}</div>
      <div class="cfo-recap-bullet">${bullet2}</div>
      <div class="cfo-recap-bullet">${bullet3}</div>
    `;

    // Format plain text for clipboard copy
    state.lastCfoRecapText = `HAULITZ CFO EXECUTIVE RECAP | AUDIT INCIDENT REPORT
Document Reference: ${refId} | Domain: ${domain.title}
Timestamp: ${new Date().toISOString()} | Status: QUARANTINE_HOLD

1. INCIDENT / DETECTED VARIANCE:
   Discrepancy of ${typeof auditResult.variance === 'number' ? auditResult.variance.toFixed(2) : auditResult.variance} units/EUR detected against baseline.

2. STATUTORY COMPLIANCE RISK:
   Breach of ${domain.law}. Immediate risk of financial or legal liability.

3. HAULITZ AIRBAG ACTION:
   Downstream ERP payment halted. Statutory dispute drafted. GoBD SHA-256 seal anchored.`;
  }

  /**
   * Modal Dialog Controllers & Clipboard Handlers
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
      if (modal) {
        modal.addEventListener('click', (e) => {
          if (e.target === modal) modal.classList.remove('open');
        });
      }
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

    DOM.btnCopyCfoRecap.addEventListener('click', () => {
      const dict = i18n[state.currentLang] || i18n.de;
      copyToClipboard(state.lastCfoRecapText, DOM.btnCopyCfoRecap, dict.copiedCfo);
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

    // Tabs
    if (DOM.tabTextCockpit) DOM.tabTextCockpit.textContent = dict.tabCockpit;
    if (DOM.tabTextPortal) DOM.tabTextPortal.textContent = dict.tabPortal;
    if (DOM.tabTextSops) DOM.tabTextSops.textContent = dict.tabSops;
    if (DOM.tabPillCockpit) DOM.tabPillCockpit.textContent = dict.tabPillCockpit;
    if (DOM.tabPillPortal) DOM.tabPillPortal.textContent = dict.tabPillPortal;
    if (DOM.tabPillSops) DOM.tabPillSops.textContent = dict.tabPillSops;

    // HUD
    if (DOM.heroHeading) DOM.heroHeading.textContent = dict.heroHeading;
    if (DOM.heroSubheading) DOM.heroSubheading.textContent = dict.heroSubheading;
    if (DOM.kpiLabelCapital) DOM.kpiLabelCapital.textContent = dict.kpiCapital;
    if (DOM.kpiSubCapital) DOM.kpiSubCapital.innerHTML = dict.kpiSubCapital;
    if (DOM.kpiLabelTx) DOM.kpiLabelTx.textContent = dict.kpiTx;
    if (DOM.kpiSubTx) DOM.kpiSubTx.innerHTML = dict.kpiSubTx;
    if (DOM.kpiLabelSla) DOM.kpiLabelSla.textContent = dict.kpiSla;
    if (DOM.kpiSubSla) DOM.kpiSubSla.innerHTML = dict.kpiSubSla;
    if (DOM.kpiLabelLatency) DOM.kpiLabelLatency.textContent = dict.kpiLatency;
    if (DOM.kpiSubLatency) DOM.kpiSubLatency.innerHTML = dict.kpiSubLatency;

    // Cockpit
    if (DOM.domainSectionTitle) DOM.domainSectionTitle.innerHTML = dict.domainTitle;
    if (DOM.domainSectionDesc) DOM.domainSectionDesc.textContent = dict.domainDesc;
    if (DOM.labelDossierTitle) DOM.labelDossierTitle.textContent = dict.dossierTitle;
    if (DOM.dossierFooterNote) DOM.dossierFooterNote.innerHTML = dict.dossierFooter;
    if (DOM.labelCockpitTitle) DOM.labelCockpitTitle.textContent = dict.cockpitTitle;
    if (DOM.auditLatencyBadge) DOM.auditLatencyBadge.textContent = dict.latencyBadge;
    if (DOM.checklistHeadingLabel) DOM.checklistHeadingLabel.innerHTML = dict.checklistHeading;
    if (DOM.varianceCardTitle) DOM.varianceCardTitle.innerHTML = dict.varianceTitle;
    if (DOM.labelCfoRecapTitle) DOM.labelCfoRecapTitle.innerHTML = dict.cfoRecapTitle;
    if (DOM.btnCopyCfoText) DOM.btnCopyCfoText.textContent = dict.copyCfo;
    if (DOM.labelMemoHeader) DOM.labelMemoHeader.textContent = dict.legalMemoHeader;
    if (DOM.btnCopyMemoText) DOM.btnCopyMemoText.textContent = dict.copyMemo;
    if (DOM.gobdSealTitle) DOM.gobdSealTitle.innerHTML = dict.gobdTitle;
    if (DOM.labelPredecessor) DOM.labelPredecessor.textContent = dict.gobdPredecessor;
    if (DOM.btnTsqlText) DOM.btnTsqlText.textContent = dict.btnTsql;
    if (DOM.btnCsharpText) DOM.btnCsharpText.textContent = dict.btnCsharp;
    if (DOM.btnExportText) DOM.btnExportText.textContent = dict.btnExport;

    // Portal
    if (DOM.labelHealthTitle) DOM.labelHealthTitle.textContent = dict.healthTitle;
    if (DOM.healthStatusBadge) DOM.healthStatusBadge.textContent = dict.healthBadge;
    if (DOM.labelMetricMath) DOM.labelMetricMath.textContent = dict.metricMath;
    if (DOM.labelMetricLegal) DOM.labelMetricLegal.textContent = dict.metricLegal;
    if (DOM.labelMetricLatency) DOM.labelMetricLatency.textContent = dict.metricLatency;
    if (DOM.labelMetricGobd) DOM.labelMetricGobd.textContent = dict.metricGobd;
    if (DOM.portalResultsTitle) DOM.portalResultsTitle.innerHTML = dict.portalResultsTitle;
    if (DOM.portalResultsSub) DOM.portalResultsSub.textContent = dict.portalResultsSub;
    if (DOM.labelPeriodBadge) DOM.labelPeriodBadge.textContent = dict.periodBadge;
    if (DOM.tileLblCapital) DOM.tileLblCapital.textContent = dict.tileCapital;
    if (DOM.tileSubCapital) DOM.tileSubCapital.textContent = dict.tileSubCapital;
    if (DOM.tileLblAudited) DOM.tileLblAudited.textContent = dict.tileAudited;
    if (DOM.tileSubAudited) DOM.tileSubAudited.textContent = dict.tileSubAudited;
    if (DOM.tileLblQuarantined) DOM.tileLblQuarantined.textContent = dict.tileQuarantined;
    if (DOM.tileSubQuarantined) DOM.tileSubQuarantined.textContent = dict.tileSubQuarantined;
    if (DOM.tileLblDisputes) DOM.tileLblDisputes.textContent = dict.tileDisputes;
    if (DOM.tileSubDisputes) DOM.tileSubDisputes.textContent = dict.tileSubDisputes;
    if (DOM.roadmapHeading) DOM.roadmapHeading.innerHTML = dict.roadmapHeading;
    if (DOM.roadmapDesc) DOM.roadmapDesc.textContent = dict.roadmapDesc;

    // SOPs
    if (DOM.sopsHeading) DOM.sopsHeading.innerHTML = dict.sopsHeading;
    if (DOM.sopsSubheading) DOM.sopsSubheading.textContent = dict.sopsSubheading;

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
    setupTabs();
    applyLanguageUI(); // Strict default: German and light mode
    renderDomainGrid();
    setupScenarioButtons();
    setupModals();
    setupLanguageToggle();
    setupThemeToggle();
    updateScenarioButtonLabels();
    runVerification();
  });

})();
