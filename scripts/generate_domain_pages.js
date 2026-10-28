// scripts/generate_domain_pages.js
// Generates the 10 dedicated standalone HTML workspaces

const fs = require('fs');
const path = require('path');

const pages = [
  { file: 'fintech.html', domain: 'fintech', num: '01', fixture: 'js/fixtures/fintech_fixtures.js', title: 'FinTech & Corporate Invoicing' },
  { file: 'logistics.html', domain: 'logistics', num: '02', fixture: 'js/fixtures/logistics_fixtures.js', title: 'Freight & Maritime Logistics' },
  { file: 'supply-chain.html', domain: 'supply', num: '03', fixture: 'js/fixtures/supply_fixtures.js', title: 'Supply Chain & Manufacturing' },
  { file: 'insurtech.html', domain: 'insurtech', num: '04', fixture: 'js/fixtures/insurtech_fixtures.js', title: 'InsurTech & Claims Processing' },
  { file: 'legaltech.html', domain: 'legaltech', num: '05', fixture: 'js/fixtures/legaltech_fixtures.js', title: 'LegalTech & Regulatory Contracts' },
  { file: 'healthtech.html', domain: 'healthtech', num: '06', fixture: 'js/fixtures/healthtech_fixtures.js', title: 'HealthTech & Medical Admin' },
  { file: 'ecommerce.html', domain: 'ecommerce', num: '07', fixture: 'js/fixtures/ecommerce_fixtures.js', title: 'E-Commerce & Retail Operations' },
  { file: 'cleantech.html', domain: 'cleantech', num: '08', fixture: 'js/fixtures/cleantech_fixtures.js', title: 'CleanTech & Renewable Energy' },
  { file: 'proptech.html', domain: 'proptech', num: '09', fixture: 'js/fixtures/proptech_fixtures.js', title: 'PropTech & Real Estate' },
  { file: 'erp-staging.html', domain: 'erp', num: '10', fixture: 'js/fixtures/erp_fixtures.js', title: 'Enterprise ERP & IT Consulting' }
];

function generateHTML(p) {
  return `<!DOCTYPE html>
<html lang="de" class="h-full" data-theme="dark">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>HAULITZ | ${p.title} Workspace</title>
  
  <!-- Favicons -->
  <link rel="icon" type="image/svg+xml" href="assets/favicon.svg">
  <link rel="shortcut icon" href="assets/favicon.ico">
  <meta name="theme-color" content="#07080a">

  <!-- Typography & Icons -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
  
  <!-- Master Stylesheet -->
  <link rel="stylesheet" href="css/styles.css?v=3.1">

  <!-- Lenis Smooth Inertial Scroll CDN -->
  <script src="https://unpkg.com/lenis@1.1.18/dist/lenis.min.js"></script>

  <!-- Clerk Authentication Web SDK -->
  <script async crossorigin="anonymous" data-clerk-publishable-key="pk_test_YXB0LWxlb3BhcmQtMTc0Ny5jbGVyay5hY2NvdW50cy5kZXYk" src="https://apt-leopard-1747.clerk.accounts.dev/npm/@clerk/clerk-js@5/dist/clerk.browser.js"></script>

  <!-- Theme Hydration -->
  <script>
    (function() {
      try {
        const savedTheme = localStorage.getItem('haulitz_theme');
        if (savedTheme === 'light') {
          document.documentElement.setAttribute('data-theme', 'light');
        } else {
          document.documentElement.setAttribute('data-theme', 'dark');
        }
      } catch (e) {
        document.documentElement.setAttribute('data-theme', 'dark');
      }
    })();
  </script>
</head>
<body data-domain="${p.domain}">

  <!-- Global Header Bar -->
  <header class="header-bar">
    <div class="brand-wrapper">
      <div class="brand-badge">HZ</div>
      <a href="index.html" class="back-gateway-link" id="back-link">
        <i class="fa-solid fa-arrow-left"></i> Zurück zum Haulitz Gateway
      </a>
    </div>

    <div class="header-controls">
      <!-- Live Frankfurt Database Latency Beacon -->
      <div class="live-beacon">
        <span class="beacon-dot"></span>
        <span class="font-mono-code">Frankfurt eu-central-1: <strong id="hdr-ping-ms" class="text-emerald">...</strong></span>
      </div>

      <!-- Clerk Enterprise Authentication Container -->
      <div class="clerk-auth-container" id="clerk-auth-container">
        <button id="clerk-sign-in-btn" class="clerk-btn" aria-label="Enterprise Sign In">
          <i class="fa-solid fa-building-shield"></i> <span>Enterprise Sign-In</span>
        </button>
      </div>

      <!-- Theme Switcher -->
      <button id="theme-toggle-btn" class="lang-pill-btn" aria-label="Toggle dark/light theme">
        <i class="fa-solid fa-moon" id="theme-icon"></i> <span id="theme-text">Dunkel</span>
      </button>

      <!-- Language Switcher -->
      <button id="lang-toggle-btn" class="lang-pill-btn" aria-label="Toggle language">
        <i class="fa-solid fa-globe"></i> <span id="lang-btn-text">DE</span>
      </button>
    </div>
  </header>

  <!-- Dedicated Domain Workspace Page -->
  <main class="domain-page-container">
    
    <!-- Top Domain Meta Header -->
    <section class="domain-page-header">
      <div class="domain-header-left">
        <div class="domain-badge-large" id="active-domain-badge">${p.num}</div>
        <div>
          <h1 class="domain-title-large" id="active-domain-title">${p.title}</h1>
          <p class="domain-meta-line" id="active-domain-targets">Lade Spezifikationen...</p>
        </div>
      </div>

      <div class="scenario-btn-group">
        <button class="scenario-btn btn-scenario-a active" id="btn-scenario-a" data-scenario="scenario_a">
          <i class="fa-solid fa-circle-check"></i> <span id="label-scenario-a">Szenario A: Valider Beleg</span>
        </button>
        <button class="scenario-btn btn-scenario-b" id="btn-scenario-b" data-scenario="scenario_b">
          <i class="fa-solid fa-triangle-exclamation"></i> <span id="label-scenario-b">Szenario B: Rechnerische Falle</span>
        </button>
        <button class="scenario-btn btn-scenario-c" id="btn-scenario-c" data-scenario="scenario_c">
          <i class="fa-solid fa-gavel"></i> <span id="label-scenario-c">Szenario C: Gesetzesverstoß</span>
        </button>
      </div>
    </section>

    <!-- Split Inspection Workspace Card -->
    <div class="workspace-card-wrapper">
      <div class="inspection-workspace">
        
        <!-- Left Pane: Authentic Physical Document Sheet -->
        <div class="left-dossier-pane">
          <div class="pane-title-bar">
            <span class="pane-title"><i class="fa-regular fa-file-lines"></i> <span id="label-dossier-title">Quelldokument-Dossier (Physische Vorlage)</span></span>
            <span class="rule-badge pass" id="dossier-doc-type">Dokument</span>
          </div>

          <!-- Authentic Physical Paper Container with Dark Slate Ink -->
          <div class="document-canvas-container" id="dossier-card-content">
            <!-- Rendered by js/domain_page.js -->
          </div>

          <div id="dossier-footer-note" style="font-size: 0.74rem; color: var(--color-text-muted); display:flex; align-items:center; gap:0.4rem; margin-top: auto;">
            <i class="fa-solid fa-shield-halved text-emerald"></i> Revisionssichere Dokumentenvorlage; deterministisch im Browser validiert.
          </div>
        </div>

        <!-- Right Pane: Deterministic Verification Cockpit -->
        <div class="right-cockpit-pane">
          <div class="pane-title-bar">
            <span class="pane-title"><i class="fa-solid fa-gauge-high"></i> <span id="label-cockpit-title">Deterministisches Prüf-Cockpit</span></span>
            <span class="rule-badge pass font-mono-code" id="audit-latency-badge">&lt; 2ms AUSFÜHRUNG</span>
          </div>

          <!-- Status Banner -->
          <div class="audit-status-banner status-clean" id="audit-status-banner">
            <div class="status-main">
              <i class="fa-solid fa-circle-check status-main-icon" id="status-icon"></i>
              <div>
                <div class="status-text-title" id="status-text-title">REVISIONSFÄHIG_VERIFIZIERT</div>
                <div class="status-text-subtitle" id="status-text-subtitle">Alle mathematischen und gesetzlichen Schutzschranken bestanden. Freigabe für ERP-Staging erteilt.</div>
              </div>
            </div>
            <div class="status-badge-wrapper">
              <span class="rule-badge pass" id="status-pill-badge">STAGING_AUTORISIERT</span>
            </div>
          </div>

          <!-- Rule Checklist Breakdown -->
          <div id="checklist-heading-label" style="font-weight: 800; font-size: 0.78rem; color: var(--color-text-main); text-transform: uppercase;">
            VERIFIZIERUNGSSCHRANKEN:
          </div>
          <ul class="rule-checklist" id="rule-checklist-container">
            <!-- Populated dynamically -->
          </ul>

          <!-- Variance Summary Callout (Revealed when trap occurs) -->
          <div class="variance-card" id="variance-card" style="display: none;">
            <div class="variance-title" id="variance-card-title"><i class="fa-solid fa-triangle-exclamation"></i> RECHNERISCHE / GESETZLICHE ABWEICHUNG FESTGESTELLT</div>
            <div class="variance-body" id="variance-text">Kritische rechnerische Diskrepanz ermittelt.</div>
            
            <!-- Direct Resend Dispute Dispatch Trigger -->
            <button class="btn-dispute-dispatch" id="btn-dispatch-dispute">
              <i class="fa-solid fa-paper-plane"></i>
              <span id="btn-dispatch-dispute-text">Rechtssichere Mängelrüge per Resend an allensimeonfletcher@gmail.com senden</span>
            </button>
          </div>

          <!-- CFO Executive Recap Box -->
          <div class="cfo-recap-box" id="cfo-recap-box" style="display: none;">
            <div class="cfo-recap-header">
              <span class="cfo-recap-title" id="label-cfo-recap-title">
                <i class="fa-solid fa-briefcase"></i> CFO-EXEKUTIV-ZUSAMMENFASSUNG
              </span>
              <button class="btn-copy-action" id="btn-copy-cfo-recap">
                <i class="fa-regular fa-copy"></i> <span id="btn-copy-cfo-text">Kopieren</span>
              </button>
            </div>
            <div class="cfo-recap-content" id="cfo-recap-content">
              <!-- Bullets -->
            </div>
          </div>

          <!-- Legal Dispute Memo Box -->
          <div class="legal-memo-box" id="legal-memo-box" style="display: none;">
            <div class="legal-memo-header">
              <span><i class="fa-solid fa-file-contract"></i> <span id="label-memo-header">AUTOMATISIERTE GESETZLICHE MÄNGELRÜGE</span></span>
              <button class="btn-copy-action" id="btn-copy-memo">
                <i class="fa-regular fa-copy"></i> <span id="btn-copy-memo-text">Mahnung kopieren</span>
              </button>
            </div>
            <div class="legal-memo-content" id="legal-memo-content">
              <!-- Legal notice text -->
            </div>
          </div>
        </div>
      </div>

      <!-- GoBD SHA-256 Cryptographic Seal Strip -->
      <div class="gobd-seal-strip">
        <div class="gobd-info">
          <span class="gobd-seal-label" id="gobd-seal-label"><i class="fa-solid fa-fingerprint text-emerald"></i> GoBD § 147 AO Kryptografisches Prüfsiegel:</span>
          <span class="gobd-hash-display font-mono-code" id="gobd-current-hash">e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855</span>
        </div>
        <div class="gobd-actions">
          <button class="btn-commit-audit" id="btn-commit-to-db">
            <i class="fa-solid fa-database"></i>
            <span id="btn-commit-text">In Frankfurt Neon DB festschreiben</span>
          </button>
        </div>
      </div>
    </div>
  </main>

  <!-- Interactive Toast Notification -->
  <div class="toast-notification" id="toast-notification">
    <i class="fa-solid fa-circle-check text-emerald" id="toast-icon"></i>
    <span id="toast-message">Meldung erfolgreich gesendet</span>
  </div>

  <!-- Master JavaScript Application Engine -->
  <script src="js/verifier/arithmetic.js"></script>
  <script src="js/verifier/checksums.js"></script>
  <script src="js/verifier/gobd_hasher.js"></script>
  <script src="js/verifier/reconciler.js"></script>
  <script src="js/generators/legal_memos.js"></script>
  <script src="js/generators/sql_staging.js"></script>
  <script src="${p.fixture}"></script>
  <script src="js/domains.js"></script>
  <script src="js/domain_page.js?v=3.1"></script>
</body>
</html>
`;
}

pages.forEach(p => {
  const filePath = path.join(__dirname, '..', p.file);
  fs.writeFileSync(filePath, generateHTML(p), 'utf8');
  console.log('Created standalone domain page:', p.file);
});
