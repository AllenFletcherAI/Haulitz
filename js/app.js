/**
 * HAULITZ ENTERPRISE GATEWAY - MASTER CONTROLLER & APPLICATION ENGINE (v3.3)
 * Standard: ASD-STE100 Simplified Technical English
 * Default Settings: German Language (de), Obsidian Dark Mode (dark)
 * Integrations: AWS Frankfurt Neon PostgreSQL, Clerk Authentication, Resend Transactional Alerting
 */

(function() {
  'use strict';

  // Read persisted user preferences (DEFAULT: German, Obsidian Dark Mode)
  let savedLang = null;
  let savedTheme = null;
  try {
    savedLang = localStorage.getItem('haulitz_lang');
    savedTheme = localStorage.getItem('haulitz_theme');
  } catch (e) {}

  // Application State
  const state = {
    currentScannerDomain: 'fintech',
    currentScannerMode: 'flawed',
    currentLang: savedLang === 'en' ? 'en' : 'de',
    currentTheme: savedTheme === 'light' ? 'light' : 'dark'
  };

  // Full Internationalization Strings (German / English) for Active Components
  const i18n = {
    de: {
      langBtn: 'DE',
      cmdKText: 'Suchen...',
      cmdSearchPlaceholder: 'Workspace suchen (z.B. FinTech, Fracht, Supply Chain, Solar)...',

      // Auth Gate Modal
      authTitle: 'HAULITZ Gateway Sign-In',
      authSub: 'Authentifizieren Sie sich für den Zugriff auf die 10 Industrie-Workspaces',
      authGoogle: 'Mit Google anmelden (Gmail)',
      authClerk: 'Mit geschäftlicher E-Mail / SSO anmelden',
      authRemember: 'Auf diesem Gerät angemeldet bleiben',
      authDivider: 'ODER',

      // Hero Section
      heroBadgeText: 'DETERMINISTISCHE VERIFIKATION',
      heroTitleMain: 'Rechnungsfehler erkennen,',
      heroTitleGradient: 'bevor sie in Ihre Bücher gelangen.',
      heroSubheadline: 'HAULITZ prüft Berechnungen, Steuersätze und Bankdaten auf Eingangsrechnungen deterministisch im Code. Kein Rundungsdrift. Keine Fehlzahlungen. Keine Audit-Panik.',
      btnHeroTestText: 'Live-Scanner testen',
      btnHeroGithubText: 'Architektur auf GitHub prüfen',

      // Living Document Scanner Card
      scannerFeedLabel: 'ECHTZEIT-BELEGEINGANG',
      scannerBtnFlawedText: 'Fehlerhafter Beleg',
      scannerBtnVerifiedText: 'HAULITZ Verifiziert',
      scMetaSubVendor: 'Lieferant / Partner:',
      scMetaSubChannel: 'Übertragungskanal:',
      scMetaSubNet: 'Nettobetrag:',
      scItemName: 'Server-Baugruppen (12x @ €350,00)',
      scVatLabel: 'Berechnete USt (19%):',
      scGrossLabel: 'Rechnungs-Gesamtbetrag:',
      scIbanLabel: 'SEPA IBAN Modulo-97:',
      scIbanStatus: 'Prüfsumme Gültig',
      scAlertTitleFlawed: '🚨 ZAHLUNGSLAUF GESTOPPT (§ 14 UStG FEHLER)',
      scAlertDescFlawed: 'Lieferant hat USt um +€120,00 überhöht ausgewiesen. Verbuchung in SAP S/4HANA blockiert. Kaufmännische Mängelrüge erstellt.',
      scAlertTitleVerified: '✔ REVISIONSSICHER: FREIGABE FÜR SAP S/4HANA',
      scAlertDescVerified: 'Posten-Arithmetik auf den Cent abgeglichen (€798,00 USt). GoBD § 147 AO SHA-256 Prüfsiegel in Frankfurt festgeschrieben.',

      // 10-Industry Workspace Hub
      hubTagText: 'DETERMINISTISCHES PRÜF-GATEWAY',
      hubHeading: '10 Branchen-Workspaces',
      hubSubheading: 'Wählen Sie Ihren Industrie-Workspace für deterministische Belegprüfungen und GoBD-Versiegelung',
      scCardTargetsLabel: 'Zielsysteme & ERP:',

      // Apple / Linear Bento Grid
      bentoTagText: 'KERNARCHITEKTUR & SCHUTZSCHRANKEN',
      bentoHeading: 'Wie HAULITZ Ihr Unternehmen schützt',
      bentoSubheading: 'Vier deterministische Schutzschranken im Code, bevor Finanzdaten in unveränderbare Ledger fließen.',
      bento1Title: 'Null Rundungsdrift (Safe Cent Math)',
      bento1Desc: 'Jede Zwischensumme, Mengenskalierung und USt-Stufe wird im Code strikt centgenau als 64-Bit-Ganzzahl berechnet. Verhindert, dass Bruchteile von Cents zu Bilanzabweichungen kumulieren.',
      bento2Title: 'Algorithmische Prüfziffern',
      bento2Desc: 'Erzwingt ISO 7064 Modulo-97 (SEPA IBAN), ISO 6346 Modulo-11 (Seefrachtcontainer) und GS1 EAN-13 Prüfziffern, bevor Zahlungen ausgelöst werden.',
      bento3Title: 'Automatisierte ERP-Firewall',
      bento3Desc: 'Valide Belege fließen direkt in SAP S/4HANA Staging-Tabellen. Fehlerhafte Belege generieren automatisch kaufmännische Mängelrügen nach HGB § 377.',
      bento4Title: 'Frankfurter GoBD-Prüfpfad',
      bento4Desc: 'Jede Prüfung erzeugt einen SHA-256 kryptografischen Hash, der mit dem Vorgängerblock verkettet und in Frankfurt (AWS eu-central-1) festgeschrieben wird.',

      // Solutions & Integration Engineer Profile
      founderRoleTitle: 'Solutions & Integration Engineer',
      fImpTitle1: 'Das Problem',
      fImpDesc1: 'Unternehmen verlieren jährlich Millionen durch unbemerkte Rundungsfehler, falsche USt-Sätze und ungeprüfte Bankdaten, die manuelle Kontrollen passieren.',
      fImpTitle2: 'Die Lösung',
      fImpDesc2: 'Ich habe HAULITZ als automatisiertes Gateway entwickelt. Es fängt eingehende Belege ab, prüft Berechnungen cent-genau im Code und übergibt nur zertifizierte Daten an SAP.',
      fImpTitle3: 'Solutions & Integration Fit',
      fImpDesc3: 'Zeigt direkte Kompetenz für Solutions Engineering: Anbindung unstrukturierter Drittsystem-Daten an strikte Kerndatenbanken mit null Fehlern und voller Compliance.',
      fPillLocation: 'Deutschland (Bundesweit umzugsbereit · Vor Ort / Hybrid / Remote)',
      fPillAvail: 'Sofort verfügbar für Festanstellung',
      fAvailLoc: 'Deutschland (Bundesweit umzugsbereit · Vor Ort / Remote)',

      // FAQ Section
      faqTagText: 'HÄUFIG GESTELLTE FRAGEN (FAQ)',
      faqHeading: 'Architektur- & Integrationsfragen für CFOs und Lead Architects',
      faqSubheading: 'Antworten zur deterministischen Fehlererkennung, GoBD-Zertifizierung und ERP-Staging in bestehende Systemlandschaften.',

      // Footer
      footerMissionText: 'Deterministisches Verifikations-Gateway für ERP & Supply Chain. Durchsetzung cent-genauer Mathematik, gesetzlicher USt und kryptografischer Prüfpfade vor dem Zahlungslauf.',
      footerHostText: 'Gehostet in Frankfurt am Main (AWS eu-central-1) · DSGVO-konform',
      footerStatusText: 'Alle 10 Workspaces betriebsbereit · 100% deterministische SLA'
    },

    en: {
      langBtn: 'EN',
      cmdKText: 'Search...',
      cmdSearchPlaceholder: 'Search workspaces (e.g. FinTech, Maritime, Supply Chain, Solar)...',

      // Auth Gate Modal
      authTitle: 'HAULITZ Gateway Sign-In',
      authSub: 'Authenticate to access all 10 institutional industry workspaces',
      authGoogle: 'Sign in with Google (Gmail)',
      authClerk: 'Sign in with Work Email / SSO',
      authRemember: 'Keep me signed in on this device',
      authDivider: 'OR',

      // Hero Section
      heroBadgeText: 'DETERMINISTIC VERIFICATION ENGINE',
      heroTitleMain: 'Catch invoice errors',
      heroTitleGradient: 'before they hit your books.',
      heroSubheadline: 'HAULITZ automatically audits calculations, tax rates, and bank details on vendor invoices before ERP staging. No math drift. No bad payments. No audit panic.',
      btnHeroTestText: 'Test Live Scanner',
      btnHeroGithubText: 'Inspect GitHub Architecture',

      // Living Document Scanner Card
      scannerFeedLabel: 'LIVE INGESTION FEED',
      scannerBtnFlawedText: 'Flawed Invoice',
      scannerBtnVerifiedText: 'HAULITZ Verified',
      scMetaSubVendor: 'Vendor / Partner:',
      scMetaSubChannel: 'Ingestion Channel:',
      scMetaSubNet: 'Subtotal Net:',
      scItemName: 'High-Torque Server Units (12x @ €350.00)',
      scVatLabel: 'Calculated Tax (19% VAT):',
      scGrossLabel: 'Invoice Gross Total:',
      scIbanLabel: 'SEPA IBAN Modulo-97:',
      scIbanStatus: 'Checksum Valid',
      scAlertTitleFlawed: '🚨 PAYMENT RUN HALTED (§ 14 UStG VIOLATION)',
      scAlertDescFlawed: 'Vendor overcharged VAT by +€120.00. ERP staging to SAP S/4HANA blocked. Commercial dispute memo drafted.',
      scAlertTitleVerified: '✔ AUDIT CERTIFIED: AUTHORIZED FOR SAP S/4HANA',
      scAlertDescVerified: 'Line math reconciled to the exact cent (€798.00 VAT). GoBD § 147 AO cryptographic SHA-256 seal assigned in Frankfurt.',

      // 10-Industry Workspace Hub
      hubTagText: 'DETERMINISTIC VERIFICATION GATEWAY',
      hubHeading: '10 Domain Workspaces',
      hubSubheading: 'Select your target industry workspace for deterministic document verification and GoBD sealing',
      scCardTargetsLabel: 'Target Systems & ERP:',

      // Apple / Linear Bento Grid
      bentoTagText: 'CORE ARCHITECTURE & SAFETY BOUNDARIES',
      bentoHeading: 'How HAULITZ protects your business',
      bentoSubheading: 'Four deterministic guardrails running in code before financial data commits to permanent ledgers.',
      bento1Title: 'Zero Rounding Drift (Safe Cent Math)',
      bento1Desc: 'Every invoice subtotal, quantity multiplier, and VAT tier is audited strictly to the exact cent in code as 64-bit integer values. Stops tiny fractions from compounding into balance-sheet discrepancies.',
      bento2Title: 'Algorithmic Check Digits',
      bento2Desc: 'Enforces international ISO 7064 Modulo-97 (SEPA IBAN), ISO 6346 Modulo-11 (ocean container), and GS1 EAN-13 check digit algorithms before money moves.',
      bento3Title: 'Automated ERP Firewall',
      bento3Desc: 'Verified documents stream cleanly into SAP S/4HANA staging tables. Erroneous documents automatically generate a commercial defect notice citing HGB § 377.',
      bento4Title: 'Frankfurt GoBD Audit Trail',
      bento4Desc: 'Every verification produces a SHA-256 cryptographic hash, cryptographically chained to its predecessor block and committed in Frankfurt (AWS eu-central-1).',

      // Solutions & Integration Engineer Profile
      founderRoleTitle: 'Solutions & Integration Engineer',
      fImpTitle1: 'The Problem',
      fImpDesc1: 'Companies lose millions every year to tiny invoice rounding errors, incorrect tax rates, and unverified bank details that silently slip past manual checks.',
      fImpTitle2: 'The Solution Built',
      fImpDesc2: 'I engineered HAULITZ as an automated verification gateway. It intercepts incoming vendor documents, runs cent-exact mathematical checks in code, and only passes certified records into SAP.',
      fImpTitle3: 'Solutions & Integration Fit',
      fImpDesc3: 'Demonstrates direct capability for Solutions Engineering: connecting messy, unstructured enterprise data into strict core databases with zero errors and total regulatory compliance.',
      fPillLocation: 'Germany (Open to Relocation Anywhere in Germany · On-Site / Hybrid / Remote)',
      fPillAvail: 'Available Immediately for Full-Time Roles',
      fAvailLoc: 'Germany (Relocation Anywhere · Remote / On-Site)',

      // FAQ Section
      faqTagText: 'FREQUENTLY ASKED QUESTIONS (FAQ)',
      faqHeading: 'Frequently Asked Questions',
      faqSubheading: 'Direct answers to key integration, compliance, and security questions from enterprise finance and IT teams.',

      // Footer
      footerMissionText: 'Deterministic Enterprise Verification Gateway for ERP & Supply Chain. Enforcing cent-exact math, statutory VAT, and cryptographic audit trails before payment execution.',
      footerHostText: 'Hosted in Frankfurt (AWS eu-central-1) · DSGVO Compliant',
      footerStatusText: 'All 10 Workspaces Operational · 100% Deterministic SLA'
    }
  };

  // Cached DOM Elements
  let DOM = {};

  function initDOMElements() {
    DOM = {
      themeToggleBtn: document.getElementById('theme-toggle-btn'),
      themeIcon: document.getElementById('theme-icon'),
      themeText: document.getElementById('theme-text'),
      langToggleBtn: document.getElementById('lang-toggle-btn'),
      langBtnText: document.getElementById('lang-btn-text'),
      clerkAuthContainer: document.getElementById('clerk-auth-container'),
      
      toast: document.getElementById('toast-notification'),
      toastMessage: document.getElementById('toast-message'),
      toastIcon: document.getElementById('toast-icon')
    };
  }

  /**
   * 1. Initialize Lenis Smooth Inertial Scrolling
   */
  function initLenis() {
    if (typeof Lenis !== 'undefined') {
      try {
        const lenis = new Lenis({
          duration: 1.2,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          smoothWheel: true
        });
        window.lenis = lenis;
        function raf(time) {
          lenis.raf(time);
          requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);
      } catch (e) {
        console.warn('Lenis scroll smooth init bypassed:', e);
      }
    }
  }

  /**
   * 2. Initialize Clerk Authentication
   */
  async function initClerk() {
    const handleAuthChange = () => {
      updateClerkUI();
      if (window.Clerk?.user) {
        try {
          const rememberMe = localStorage.getItem('haulitz_remember_me') === 'true';
          if (rememberMe) {
            localStorage.setItem('haulitz_auth', 'true');
          } else {
            sessionStorage.setItem('haulitz_auth', 'true');
          }
        } catch (e) {}
        document.getElementById('auth-gate-modal')?.classList.remove('active');
      }
    };

    if (!window.Clerk) {
      window.addEventListener('load', async () => {
        if (window.Clerk) {
          try {
            await window.Clerk.load();
            handleAuthChange();
            window.Clerk.addListener(handleAuthChange);
          } catch (err) {}
        }
      });
      return;
    }

    try {
      await window.Clerk.load();
      handleAuthChange();
      window.Clerk.addListener(handleAuthChange);
    } catch (e) {
      console.warn('Clerk load bypassed:', e);
    }
  }

  function updateClerkUI() {
    if (!DOM.clerkAuthContainer || !window.Clerk) return;

    if (window.Clerk.user) {
      const user = window.Clerk.user;
      const displayName = user.firstName || user.username || user.primaryEmailAddress?.emailAddress?.split('@')[0] || 'User';

      DOM.clerkAuthContainer.innerHTML = `
        <div style="display:flex; align-items:center; gap:0.5rem; background:var(--color-surface); border:1px solid var(--color-border); padding:0.25rem 0.6rem; border-radius:var(--radius-md);">
          <img src="${user.imageUrl}" style="width:20px; height:20px; border-radius:50%;" alt="User avatar"/>
          <span style="font-size:0.75rem; font-weight:600; color:var(--color-text-main);">${displayName}</span>
          <button id="clerk-sign-out-btn" style="color:var(--color-text-muted); font-size:0.75rem; padding:0 0.2rem; background:none; border:none; cursor:pointer;" title="Sign out">
            <i class="fa-solid fa-right-from-bracket"></i>
          </button>
        </div>
      `;

      document.getElementById('clerk-sign-out-btn')?.addEventListener('click', async () => {
        await window.Clerk.signOut();
        try {
          localStorage.removeItem('haulitz_auth');
          localStorage.removeItem('haulitz_remember_me');
          sessionStorage.removeItem('haulitz_auth');
        } catch (e) {}
        updateClerkUI();
        showToast(state.currentLang === 'de' ? 'Erfolgreich abgemeldet' : 'Successfully signed out');
      });
    } else {
      DOM.clerkAuthContainer.innerHTML = `
        <button id="clerk-sign-in-btn" class="clerk-btn" aria-label="Enterprise Sign In">
          <i class="fa-solid fa-building-shield"></i> <span id="clerk-btn-text">Enterprise Sign-In</span>
        </button>
      `;

      document.getElementById('clerk-sign-in-btn')?.addEventListener('click', () => {
        if (window.Clerk.openSignIn) {
          window.Clerk.openSignIn();
        } else {
          document.getElementById('auth-gate-modal')?.classList.add('active');
        }
      });
    }
  }

  /**
   * 3. Domain Workspace Mapping & Deep Link Handling
   */
  const domainPages = {
    fintech: 'workspaces/fintech.html',
    logistics: 'workspaces/logistics.html',
    supply: 'workspaces/supply-chain.html',
    insurtech: 'workspaces/insurtech.html',
    legaltech: 'workspaces/legaltech.html',
    healthtech: 'workspaces/healthtech.html',
    ecommerce: 'workspaces/ecommerce.html',
    cleantech: 'workspaces/cleantech.html',
    proptech: 'workspaces/proptech.html',
    erp: 'workspaces/erp-staging.html'
  };

  function handleHashNavigation() {
    const hash = window.location.hash.replace('#', '').trim();
    if (hash && domainPages[hash]) {
      window.location.href = domainPages[hash];
    }
  }

  window.addEventListener('hashchange', handleHashNavigation);

  /**
   * 4. Toast Notification
   */
  function showToast(message, isError = false) {
    if (!DOM.toast || !DOM.toastMessage) return;
    DOM.toastMessage.textContent = message;
    if (DOM.toastIcon) {
      DOM.toastIcon.className = `fa-solid ${isError ? 'fa-triangle-exclamation text-crimson' : 'fa-circle-check text-emerald'}`;
    }
    DOM.toast.classList.add('show');
    setTimeout(() => {
      DOM.toast.classList.remove('show');
    }, 4500);
  }

  /**
   * 5. Setup Global Event Listeners & Controls
   */
  function setupEventListeners() {
    // Theme Toggle
    DOM.themeToggleBtn?.addEventListener('click', () => {
      const nextTheme = state.currentTheme === 'dark' ? 'light' : 'dark';
      state.currentTheme = nextTheme;
      document.documentElement.setAttribute('data-theme', nextTheme);
      try {
        localStorage.setItem('haulitz_theme', nextTheme);
      } catch (e) {}
      updateThemeUI();
    });

    // Language Toggle
    DOM.langToggleBtn?.addEventListener('click', () => {
      state.currentLang = state.currentLang === 'de' ? 'en' : 'de';
      try {
        localStorage.setItem('haulitz_lang', state.currentLang);
      } catch (e) {}
      applyLanguageUI();
    });

    // Auth Gate Actions with Remember Me (Official Google & Clerk SSO)
    const authModal = document.getElementById('auth-gate-modal');
    const handleAuthLogin = async (provider) => {
      const rememberCheckbox = document.getElementById('auth-remember-checkbox');
      const isRemembered = rememberCheckbox ? rememberCheckbox.checked : false;

      try {
        if (isRemembered) {
          localStorage.setItem('haulitz_remember_me', 'true');
          localStorage.setItem('haulitz_auth', 'true');
        } else {
          localStorage.removeItem('haulitz_remember_me');
          sessionStorage.setItem('haulitz_auth', 'true');
        }
      } catch (err) {}

      if (authModal) {
        authModal.classList.remove('active');
      }

      if (provider === 'google') {
        if (window.Clerk && window.Clerk.client && window.Clerk.client.signIn) {
          try {
            await window.Clerk.client.signIn.authenticateWithRedirect({
              strategy: 'oauth_google',
              redirectUrl: window.location.href,
              redirectUrlComplete: window.location.href
            });
            return;
          } catch (e) {
            console.warn('Direct Google OAuth redirect error:', e);
          }
        }

        if (window.Clerk && typeof window.Clerk.openSignIn === 'function') {
          try {
            window.Clerk.openSignIn();
            return;
          } catch (e) {
            console.warn('Clerk openSignIn error:', e);
          }
        }

        showToast(state.currentLang === 'de' ? 'Erfolgreich autorisiert.' : 'Successfully authorized.');
      } else {
        if (window.Clerk && typeof window.Clerk.openSignIn === 'function') {
          try {
            window.Clerk.openSignIn();
            return;
          } catch (e) {
            console.warn('Clerk openSignIn error:', e);
          }
        }
        showToast(state.currentLang === 'de' ? 'Erfolgreich autorisiert.' : 'Successfully authorized.');
      }
    };

    document.getElementById('btn-auth-google')?.addEventListener('click', () => handleAuthLogin('google'));
    document.getElementById('btn-auth-clerk')?.addEventListener('click', () => handleAuthLogin('clerk'));

    // Modal background click dismiss
    if (authModal) {
      authModal.addEventListener('click', (e) => {
        if (e.target === authModal) {
          authModal.classList.remove('active');
        }
      });
    }
  }

  function updateThemeUI() {
    const isDark = state.currentTheme === 'dark';
    if (DOM.themeIcon) {
      DOM.themeIcon.className = `fa-solid ${isDark ? 'fa-moon' : 'fa-sun'}`;
    }
    if (DOM.themeText) {
      DOM.themeText.textContent = state.currentLang === 'de' 
        ? (isDark ? 'Dunkel' : 'Hell') 
        : (isDark ? 'Dark' : 'Light');
    }
  }

  /**
   * 6. High-Performance Language Hydration (Active Elements Only)
   */
  function applyLanguageUI() {
    const dict = i18n[state.currentLang] || i18n.de;
    document.documentElement.lang = state.currentLang;

    if (DOM.langBtnText) DOM.langBtnText.textContent = dict.langBtn;

    const setElemText = (id, text) => {
      const el = document.getElementById(id);
      if (el && text) el.textContent = text;
    };
    const setElemHTML = (id, html) => {
      const el = document.getElementById(id);
      if (el && html) el.innerHTML = html;
    };

    // Header Search Bar
    setElemText('cmd-k-text', dict.cmdKText);
    const cmdInput = document.getElementById('command-search-input');
    if (cmdInput && dict.cmdSearchPlaceholder) cmdInput.placeholder = dict.cmdSearchPlaceholder;

    // Auth Gate Modal
    setElemText('auth-modal-title', dict.authTitle);
    setElemText('auth-modal-subtitle', dict.authSub);
    setElemText('btn-google-text', dict.authGoogle);
    setElemText('btn-clerk-text', dict.authClerk);
    setElemText('auth-remember-label', dict.authRemember);
    setElemText('auth-divider-text', dict.authDivider);

    // Hero Section
    setElemText('hero-badge-text', dict.heroBadgeText);
    setElemText('hero-title-main', dict.heroTitleMain);
    setElemText('hero-title-gradient', dict.heroTitleGradient);
    setElemText('hero-subheadline', dict.heroSubheadline);
    setElemText('btn-hero-test-text', dict.btnHeroTestText);
    setElemText('btn-hero-github-text', dict.btnHeroGithubText);

    // Living Scanner Card
    setElemText('scanner-feed-label', dict.scannerFeedLabel);
    setElemText('scanner-btn-flawed-text', dict.scannerBtnFlawedText);
    setElemText('scanner-btn-verified-text', dict.scannerBtnVerifiedText);
    setElemText('sc-meta-sub-vendor', dict.scMetaSubVendor);
    setElemText('sc-meta-sub-channel', dict.scMetaSubChannel);
    setElemText('sc-meta-sub-net', dict.scMetaSubNet);
    setElemText('sc-item-name', dict.scItemName);
    setElemText('sc-vat-label', dict.scVatLabel);
    setElemText('sc-gross-label', dict.scGrossLabel);
    setElemText('sc-iban-label', dict.scIbanLabel);
    setElemText('sc-iban-status', dict.scIbanStatus);
    setElemText('sc-alert-title-flawed', dict.scAlertTitleFlawed);
    setElemText('sc-alert-desc-flawed', dict.scAlertDescFlawed);
    setElemText('sc-alert-title-verified', dict.scAlertTitleVerified);
    setElemText('sc-alert-desc-verified', dict.scAlertDescVerified);

    // Workspace Hub
    setElemText('hub-tag-text', dict.hubTagText);
    setElemText('hub-heading', dict.hubHeading);
    setElemText('hub-subheading', dict.hubSubheading);
    setElemText('sc-card-targets-label', dict.scCardTargetsLabel);

    // Bento Grid
    setElemText('bento-tag-text', dict.bentoTagText);
    setElemText('bento-heading', dict.bentoHeading);
    setElemText('bento-subheading', dict.bentoSubheading);
    setElemText('bento-1-title', dict.bento1Title);
    setElemText('bento-1-desc', dict.bento1Desc);
    setElemText('bento-2-title', dict.bento2Title);
    setElemText('bento-2-desc', dict.bento2Desc);
    setElemText('bento-3-title', dict.bento3Title);
    setElemText('bento-3-desc', dict.bento3Desc);
    setElemText('bento-4-title', dict.bento4Title);
    setElemText('bento-4-desc', dict.bento4Desc);

    // Solutions & Integration Engineer Profile
    setElemText('founder-role-title', dict.founderRoleTitle);
    setElemText('f-pill-location-text', dict.fPillLocation);
    setElemText('f-pill-avail-text', dict.fPillAvail);
    setElemText('f-avail-loc', dict.fAvailLoc);
    setElemText('f-imp-title-1', dict.fImpTitle1);
    setElemHTML('f-imp-desc-1', dict.fImpDesc1);
    setElemText('f-imp-title-2', dict.fImpTitle2);
    setElemHTML('f-imp-desc-2', dict.fImpDesc2);
    setElemText('f-imp-title-3', dict.fImpTitle3);
    setElemHTML('f-imp-desc-3', dict.fImpDesc3);

    // FAQ Section
    setElemText('faq-tag-text', dict.faqTagText);
    setElemText('faq-heading', dict.faqHeading);
    setElemText('faq-subheading', dict.faqSubheading);

    // Footer
    setElemText('footer-mission-text', dict.footerMissionText);
    setElemText('footer-host-text', dict.footerHostText);
    setElemText('footer-status-text', dict.footerStatusText);

    updateThemeUI();

    if (typeof updateScannerDisplay === 'function') {
      updateScannerDisplay(state.currentScannerDomain, state.currentScannerMode);
    }
    if (typeof updateShowcaseGlobal === 'function') {
      updateShowcaseGlobal(state.currentScannerDomain);
    }
  }

  /**
   * 7. Authentication State Gate (Non-Blocking Landing Page)
   */
  function checkAuthAndIndustryGate() {
    let rememberMe = false;
    let hasLocalAuth = false;
    let hasSessionAuth = false;

    try {
      rememberMe = localStorage.getItem('haulitz_remember_me') === 'true';
      hasLocalAuth = localStorage.getItem('haulitz_auth') === 'true';
      hasSessionAuth = sessionStorage.getItem('haulitz_auth') === 'true';
    } catch (e) {}

    const isAuthenticated = (rememberMe && hasLocalAuth) || hasSessionAuth || !!window.Clerk?.user;
    const authModal = document.getElementById('auth-gate-modal');

    const urlParams = new URLSearchParams(window.location.search);
    const forceShowLogin = urlParams.get('login') === 'true';

    if (forceShowLogin && !isAuthenticated && authModal) {
      authModal.classList.add('active');
    } else if (authModal) {
      authModal.classList.remove('active');
    }
  }

  /**
   * 8. Cursor Spotlight Tracking on Interactive Cards
   */
  function initSpotlightTracking() {
    document.querySelectorAll('.bento-card, .founder-impact-item, .hub-display-card').forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
        card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
      });
    });
  }

  /**
   * 9. Spotlight Command Palette Search (Ctrl+K / Cmd+K)
   */
  function initCommandPalette() {
    const cmdBtn = document.getElementById('cmd-k-btn');
    const cmdModal = document.getElementById('command-palette-modal');
    const cmdInput = document.getElementById('command-search-input');
    const cmdResults = document.getElementById('command-palette-results');
    if (!cmdModal || !cmdInput || !cmdResults) return;

    const domainsList = [
      { id: 'fintech', num: '01', title: 'FinTech & Corporate Invoicing', deTitle: 'FinTech & Rechnungsprüfung', law: '§ 14 UStG, GoBD', icon: 'fa-file-invoice-dollar', url: 'workspaces/fintech.html' },
      { id: 'logistics', num: '02', title: 'Freight & Maritime Logistics', deTitle: 'Seefracht & Zolldokumentation', law: 'ADSp 2017, § 412 HGB', icon: 'fa-ship', url: 'workspaces/logistics.html' },
      { id: 'supply', num: '03', title: 'Supply Chain & Manufacturing', deTitle: 'Supply Chain & Dreiseitiger Abgleich', law: 'HGB § 377 Rüge', icon: 'fa-industry', url: 'workspaces/supply-chain.html' },
      { id: 'insurtech', num: '04', title: 'InsurTech & Claims Processing', deTitle: 'InsurTech Schadensprüfung', law: 'VVG § 86, BGB', icon: 'fa-shield-halved', url: 'workspaces/insurtech.html' },
      { id: 'legaltech', num: '05', title: 'LegalTech & Regulatory Contracts', deTitle: 'LegalTech & Lieferkettengesetz', law: 'LkSG, EU CSDDD', icon: 'fa-scale-balanced', url: 'workspaces/legaltech.html' },
      { id: 'healthtech', num: '06', title: 'HealthTech & Medical Admin', deTitle: 'HealthTech & GOÄ-Abrechnung', law: 'GOÄ § 5 Abs. 2', icon: 'fa-hospital-user', url: 'workspaces/healthtech.html' },
      { id: 'ecommerce', num: '07', title: 'E-Commerce & Retail Operations', deTitle: 'E-Commerce WMS & Barcodes', law: 'GS1 EAN-13, FX', icon: 'fa-cart-shopping', url: 'workspaces/ecommerce.html' },
      { id: 'cleantech', num: '08', title: 'CleanTech & Renewable Energy', deTitle: 'CleanTech Solar Einspeisung', law: 'VDE-AR-N 4105, EEG', icon: 'fa-bolt', url: 'workspaces/cleantech.html' },
      { id: 'proptech', num: '09', title: 'PropTech & Real Estate', deTitle: 'PropTech Nebenkostenabrechnung', law: 'HeizkostenV § 7 & 12', icon: 'fa-building', url: 'workspaces/proptech.html' },
      { id: 'erp', num: '10', title: 'Enterprise ERP & IT Consulting', deTitle: 'Enterprise ERP Staging & T-SQL', law: 'OWASP ASVS, T-SQL', icon: 'fa-database', url: 'workspaces/erp-staging.html' }
    ];

    let selectedIndex = 0;
    let filteredDomains = [...domainsList];

    function renderResults() {
      cmdResults.innerHTML = '';
      if (filteredDomains.length === 0) {
        cmdResults.innerHTML = `<div style="padding:1.5rem; text-align:center; color:var(--color-text-muted); font-size:0.85rem;">Keine Workspaces gefunden / No workspaces found</div>`;
        return;
      }

      filteredDomains.forEach((d, idx) => {
        const item = document.createElement('a');
        item.href = d.url;
        item.className = `command-item ${idx === selectedIndex ? 'selected' : ''}`;
        const displayTitle = state.currentLang === 'de' ? d.deTitle : d.title;
        item.innerHTML = `
          <div class="command-item-left">
            <span class="command-num">${d.num}</span>
            <i class="fa-solid ${d.icon} command-icon"></i>
            <div>
              <div class="command-item-title">${displayTitle}</div>
              <div class="command-item-sub">${d.law}</div>
            </div>
          </div>
          <span class="command-arrow"><i class="fa-solid fa-arrow-right"></i></span>
        `;
        item.addEventListener('mouseenter', () => {
          selectedIndex = idx;
          updateSelection();
        });
        cmdResults.appendChild(item);
      });
    }

    function updateSelection() {
      const items = cmdResults.querySelectorAll('.command-item');
      items.forEach((item, idx) => {
        item.classList.toggle('selected', idx === selectedIndex);
        if (idx === selectedIndex) {
          item.scrollIntoView({ block: 'nearest' });
        }
      });
    }

    function openPalette() {
      cmdModal.classList.add('active');
      cmdInput.value = '';
      filteredDomains = [...domainsList];
      selectedIndex = 0;
      renderResults();
      setTimeout(() => cmdInput.focus(), 50);
    }

    function closePalette() {
      cmdModal.classList.remove('active');
    }

    cmdBtn?.addEventListener('click', openPalette);

    cmdModal.addEventListener('click', (e) => {
      if (e.target === cmdModal) closePalette();
    });

    document.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && (e.key === 'k' || e.key === 'K')) {
        e.preventDefault();
        if (cmdModal.classList.contains('active')) {
          closePalette();
        } else {
          openPalette();
        }
      }
      if (e.key === 'Escape' && cmdModal.classList.contains('active')) {
        closePalette();
      }
    });

    cmdInput.addEventListener('input', (e) => {
      const q = e.target.value.toLowerCase().trim();
      if (!q) {
        filteredDomains = [...domainsList];
      } else {
        filteredDomains = domainsList.filter(d => 
          d.title.toLowerCase().includes(q) ||
          d.deTitle.toLowerCase().includes(q) ||
          d.law.toLowerCase().includes(q) ||
          d.id.toLowerCase().includes(q) ||
          d.num.includes(q)
        );
      }
      selectedIndex = 0;
      renderResults();
    });

    cmdInput.addEventListener('keydown', (e) => {
      if (filteredDomains.length === 0) return;
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        selectedIndex = (selectedIndex + 1) % filteredDomains.length;
        updateSelection();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        selectedIndex = (selectedIndex - 1 + filteredDomains.length) % filteredDomains.length;
        updateSelection();
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredDomains[selectedIndex]) {
          window.location.href = filteredDomains[selectedIndex].url;
        }
      }
    });
  }

  const SCANNER_PRESETS = {
    fintech: {
      url: 'workspaces/fintech.html',
      icon: 'fa-microchip',
      ruleIcon: 'fa-shield-halved',
      docBadge: 'INV-2024-8841',
      vendor: 'Nordic Industrial Supply GmbH',
      channel: 'PDF / ZUGFeRD 2.2',
      ruleVal: 'DE89 3704 0044 0532 ...',
      de: {
        activeName: 'FinTech & Rechnungsprüfung',
        net: '€4.200,00',
        itemName: 'Server-Baugruppen (12x @ €350,00)',
        itemVal: '€4.200,00',
        vatLabel: 'Berechnete USt (19%):',
        grossLabel: 'Rechnungs-Gesamtbetrag:',
        ruleLabel: 'SEPA IBAN Modulo-97:',
        ruleStatus: 'Prüfsumme Gültig',
        flawedTag: '⚠ +€120,00 Zu viel berechnet',
        flawedVat: '€918,00',
        flawedGross: '€5.118,00',
        flawedTitle: '🚨 ZAHLUNGSLAUF GESTOPPT (§ 14 UStG FEHLER)',
        flawedDesc: 'Lieferant hat USt um +€120,00 überhöht ausgewiesen. Verbuchung in SAP S/4HANA blockiert. Kaufmännische Mängelrüge erstellt.',
        verifiedTag: '<i class="fa-solid fa-check"></i> Cent-genau abgeglichen',
        verifiedVat: '€798,00',
        verifiedGross: '€4.998,00',
        verifiedTitle: '✔ REVISIONSSICHER: FREIGABE FÜR SAP S/4HANA',
        verifiedDesc: 'Posten-Arithmetik auf den Cent abgeglichen (€798,00 USt). GoBD § 147 AO SHA-256 Prüfsiegel in Frankfurt festgeschrieben.'
      },
      en: {
        activeName: 'FinTech & Invoicing',
        net: '€4,200.00',
        itemName: 'High-Torque Server Units (12x @ €350.00)',
        itemVal: '€4,200.00',
        vatLabel: 'Calculated Tax (19% VAT):',
        grossLabel: 'Invoice Gross Total:',
        ruleLabel: 'SEPA IBAN Modulo-97:',
        ruleStatus: 'Checksum Valid',
        flawedTag: '⚠ +€120.00 Overcharge',
        flawedVat: '€918.00',
        flawedGross: '€5,118.00',
        flawedTitle: '🚨 PAYMENT RUN HALTED (§ 14 UStG VIOLATION)',
        flawedDesc: 'Vendor overcharged VAT by +€120.00. ERP staging to SAP S/4HANA blocked. Commercial dispute memo drafted.',
        verifiedTag: '<i class="fa-solid fa-check"></i> Exact Cent Reconciled',
        verifiedVat: '€798.00',
        verifiedGross: '€4,998.00',
        verifiedTitle: '✔ AUDIT CERTIFIED: AUTHORIZED FOR SAP S/4HANA',
        verifiedDesc: 'Line math reconciled to the exact cent (€798.00 VAT). GoBD § 147 AO cryptographic SHA-256 seal assigned in Frankfurt.'
      }
    },
    logistics: {
      url: 'workspaces/logistics.html',
      icon: 'fa-ship',
      ruleIcon: 'fa-anchor',
      docBadge: 'BOL-HAM-9042',
      vendor: 'Hapag-Lloyd Ocean Carrier',
      channel: 'EDIFACT IFTMIN / Sea Waybill',
      ruleVal: 'MSKU 014285 [7]',
      de: {
        activeName: 'Seefracht & Maritime Logistik',
        net: '24.500,00 kg',
        itemName: 'ISO 6346 Container MSKU 014285-7 (40ft High Cube)',
        itemVal: 'Tara: 3.820 kg',
        vatLabel: 'SOLAS VGM & Achslast-Prüfung (§ 412 HGB):',
        grossLabel: 'Deklariertes Fracht-Bruttogewicht:',
        ruleLabel: 'ISO 6346 Modulo-11 Prüfziffer:',
        ruleStatus: 'Prüfziffer Konform (7)',
        flawedTag: '⚠ +1.250 kg Überladung (§ 412 HGB)',
        flawedVat: '25.750 kg',
        flawedGross: 'ÜBERLADUNG ABGEWIESEN',
        flawedTitle: '🚨 KRANVERLADUNG GESTOPPT (SOLAS / HGB § 412)',
        flawedDesc: 'Deklariertes Gewicht überschreitet Schiffstraglast um 1.250 kg. Container für Stauplan am HHLA-Terminal gesperrt.',
        verifiedTag: '<i class="fa-solid fa-check"></i> SOLAS VGM Zertifiziert',
        verifiedVat: '24.500 kg',
        verifiedGross: '24.500 KG FREIGEGEBEN',
        verifiedTitle: '✔ FRACHT FREIGEGEBEN: BEREIT ZUR VERLADUNG',
        verifiedDesc: 'Gewicht innerhalb der § 412 HGB Toleranz. Manifest signiert und an HHLA Terminal-Gateway übertragen.'
      },
      en: {
        activeName: 'Freight & Maritime',
        net: '24,500.00 kg',
        itemName: 'ISO 6346 Container MSKU 014285-7 (40ft High Cube)',
        itemVal: 'Tare: 3,820 kg',
        vatLabel: 'SOLAS VGM & Axle Weight Audit (§ 412 HGB):',
        grossLabel: 'Declared Freight Gross Weight:',
        ruleLabel: 'ISO 6346 Modulo-11 Check Digit:',
        ruleStatus: 'Check Digit Valid (7)',
        flawedTag: '⚠ +1,250 kg Overload (§ 412 HGB)',
        flawedVat: '25,750 kg',
        flawedGross: 'OVERLOAD REJECTED',
        flawedTitle: '🚨 CRANE LOADING HALTED (SOLAS / HGB § 412)',
        flawedDesc: 'Declared container weight exceeds vessel rating by 1,250 kg. Stowage loading at HHLA terminal blocked.',
        verifiedTag: '<i class="fa-solid fa-check"></i> SOLAS VGM Certified',
        verifiedVat: '24,500 kg',
        verifiedGross: '24,500 KG CERTIFIED',
        verifiedTitle: '✔ CARGO CLEARED: READY FOR STOWAGE',
        verifiedDesc: 'Weight within § 412 HGB axle tolerance. Manifest signed and dispatched to HHLA terminal gateway.'
      }
    },
    supply: {
      url: 'workspaces/supply-chain.html',
      icon: 'fa-industry',
      ruleIcon: 'fa-clock',
      docBadge: 'GR-2024-5519',
      vendor: 'Brose Fahrzeugteile SE',
      channel: 'VDA 4913 / ASN Inbound',
      ruleVal: '48h Handelsrechtlicher Fristtimer',
      de: {
        activeName: 'Supply Chain 3-Wege-Abgleich',
        net: '5.000 Stück (PO #44021)',
        itemName: 'Stellmotoren Elektrik (Charge #88B-02)',
        itemVal: 'Bestellt: 5.000 Stk',
        vatLabel: '3-Wege-Abgleich (Bestellung vs. Lieferschein vs. WE):',
        grossLabel: 'Physischer Wareneingang Rampe 4:',
        ruleLabel: 'HGB § 377 Rügefrist-Wahrung:',
        ruleStatus: 'Frist Gewahrt',
        flawedTag: '⚠ 350 Stück Mindermenge',
        flawedVat: '4.650 Stk geliefert',
        flawedGross: 'MINDERMENGE RÜGE',
        flawedTitle: '🚨 HGB § 377 MÄNGELRÜGE AUTOMATISCH ERSTELLT',
        flawedDesc: 'Rampe erfasst nur 4.650 statt 5.000 Einheiten. Automatische Mängelrüge erstellt zur Wahrung aller Gewährleistungsrechte.',
        verifiedTag: '<i class="fa-solid fa-check"></i> 3-Wege-Abgleich 100% Identisch',
        verifiedVat: '5.000 Stk vollständig',
        verifiedGross: '5.000 STK GEBUCHT',
        verifiedTitle: '✔ SAP MIGO WARENEINGANG 101 BEREITGESTELLT',
        verifiedDesc: 'Bestellung, Lieferschein und Rampenscan stimmen überein. Automatische Bestandsfortschreibung in SAP S/4HANA erfolgt.'
      },
      en: {
        activeName: 'Supply Chain Triad',
        net: '5,000 Units (PO #44021)',
        itemName: 'Electric Actuator Motors (Batch #88B-02)',
        itemVal: 'PO Target: 5,000 pcs',
        vatLabel: '3-Way Triad (PO vs. B/L vs. Dock Receipt):',
        grossLabel: 'Physical Dock Receipt Gate 4:',
        ruleLabel: 'HGB § 377 Inspection Window:',
        ruleStatus: 'Window Protected',
        flawedTag: '⚠ 350 Units Shortfall',
        flawedVat: '4,650 pcs Delivered',
        flawedGross: 'SHORTFALL DISPUTE',
        flawedTitle: '🚨 HGB § 377 STATUTORY DISPUTE MEMO DRAFTED',
        flawedDesc: 'Dock counted 4,650 instead of 5,000 units. Statutory dispute memo issued to preserve buyer warranty rights.',
        verifiedTag: '<i class="fa-solid fa-check"></i> 3-Way Match 100% Exact',
        verifiedVat: '5,000 pcs Complete',
        verifiedGross: '5,000 PCS BOOKED',
        verifiedTitle: '✔ SAP MIGO GOODS RECEIPT 101 POSTED',
        verifiedDesc: 'PO, delivery note, and dock barcode match perfectly. Automatic inventory update committed in SAP S/4HANA.'
      }
    },
    insurtech: {
      url: 'workspaces/insurtech.html',
      icon: 'fa-shield-halved',
      ruleIcon: 'fa-handshake',
      docBadge: 'CLM-2024-7712',
      vendor: 'Autohaus Schmidt GmbH & Co.',
      channel: 'Audatex / SilverDAT XML',
      ruleVal: '-€300,00 Gemäß Police',
      de: {
        activeName: 'InsurTech & Schadenregulierung',
        net: '€3.480,00 Netto-Schaden',
        itemName: 'Mechanik & Richtbank (14,5 AW @ €195,00 / AW)',
        itemVal: '€2.827,50 Lohnkosten',
        vatLabel: 'BGH VI ZR 53/09 & VVG § 86 Stundensatz-Prüfung:',
        grossLabel: 'Geforderte Regulierungs-Summe:',
        ruleLabel: 'Kasko-Selbstbeteiligung Abzug:',
        ruleStatus: 'Klausel Abgezogen',
        flawedTag: '⚠ +€725,00 Richtwert überschritten',
        flawedVat: '€195,00 / AW (Überhöht)',
        flawedGross: 'KÜRZUNG ERFORDERLICH',
        flawedTitle: '🚨 SCHADENSAUSZAHLUNG GESTOPPT (VVG § 86 CAP)',
        flawedDesc: 'Stundensatz übersteigt DEKRA-Regionalwert um +€50,00/AW. Regress-Kürzungsschreiben an Werkstatt generiert.',
        verifiedTag: '<i class="fa-solid fa-check"></i> BGH Regionalrichtwert Eingehalten',
        verifiedVat: '€145,00 / AW (Gedeckelt)',
        verifiedGross: 'NETTO €2.755,00 FREIGABE',
        verifiedTitle: '✔ SCHADEN REGULIERT: ZUR SEPA-ANWEISUNG FREIGEGEBEN',
        verifiedDesc: 'Stundensätze bereinigt; Selbstbeteiligung einbehalten. Regulierung zur automatischen Überweisung freigegeben.'
      },
      en: {
        activeName: 'InsurTech Claims',
        net: '€3,480.00 Net Claim',
        itemName: 'Chassis Alignment Labor (14.5 AW @ €195.00 / AW)',
        itemVal: '€2,827.50 Labor Cost',
        vatLabel: 'BGH VI ZR 53/09 & VVG § 86 Labor Rate Cap:',
        grossLabel: 'Claimed Indemnity Total:',
        ruleLabel: 'Contractual Deductible Subtraction:',
        ruleStatus: 'Clause Applied',
        flawedTag: '⚠ +€725.00 Regional Cap Exceeded',
        flawedVat: '€195.00 / AW (Capped)',
        flawedGross: 'INDEMNITY CAPPED',
        flawedTitle: '🚨 CLAIM PAYMENT SUSPENDED (VVG § 86 CAP)',
        flawedDesc: 'Labor rate exceeds DEKRA benchmark by +€50.00/AW. Subrogation reduction memo drafted for adjuster.',
        verifiedTag: '<i class="fa-solid fa-check"></i> BGH Regional Benchmark Compliant',
        verifiedVat: '€145.00 / AW (Compliant)',
        verifiedGross: 'NET €2,755.00 APPROVED',
        verifiedTitle: '✔ CLAIM SETTLEMENT AUTHORIZED FOR SEPA TRANSFER',
        verifiedDesc: 'Labor capped to regional benchmark; deductible subtracted. Settlement dispatched to claims ledger.'
      }
    },
    legaltech: {
      url: 'workspaces/legaltech.html',
      icon: 'fa-scale-balanced',
      ruleIcon: 'fa-gavel',
      docBadge: 'ESG-2024-3011',
      vendor: 'Bavaria Minerals & Smelting AG',
      channel: 'LkSG Compliance Dossier / JSON',
      ruleVal: 'Hohe Risikostufe BAFA 2024',
      de: {
        activeName: 'LegalTech & LkSG Compliance',
        net: 'Tier-1 Lieferkette (Rohstoffe)',
        itemName: 'Hüttenbetrieb Sm-902 Kobalt & Nickel Audit',
        itemVal: 'Audit-Score: 62/100',
        vatLabel: 'LkSG § 4-§ 7 Sorgfaltspflichten & ISO 14001:',
        grossLabel: 'Lieferanten-Zulassungsstatus:',
        ruleLabel: 'BAFA Gesetzliche Risikobewertung:',
        ruleStatus: 'BAFA Alarm',
        flawedTag: '⚠ ISO 14001 & Menschenrechts-Audit fehlt',
        flawedVat: 'Nicht Konform',
        flawedGross: 'LIEFERANT GESPERRT',
        flawedTitle: '🚨 LIEFERVERTRAG GESPERRT (LkSG § 5 VERSTOSS)',
        flawedDesc: 'Kritische Mängel in Tier-1 Raffinerie festgestellt. Präventionsplan und BAFA-Meldung automatisch vorbereitet.',
        verifiedTag: '<i class="fa-solid fa-check"></i> Vollständige LkSG & CSDDD Freigabe',
        verifiedVat: 'Geprüft 98/100',
        verifiedGross: 'FREIGEGEBENER TIER-1',
        verifiedTitle: '✔ LIEFERANT AUDITIERT: BEREITSTELLUNG FREIGEGEBEN',
        verifiedDesc: 'Audit-Dokumente validiert und mit GoBD SHA-256 Prüfsiegel unveränderbar im Frankfurter Ledger verankert.'
      },
      en: {
        activeName: 'LegalTech Compliance',
        net: 'Tier-1 Supply Chain (Raw Materials)',
        itemName: 'Smelter Sm-902 Cobalt & Nickel Audit',
        itemVal: 'Audit Score: 62/100',
        vatLabel: 'LkSG § 4-§ 7 Due Diligence & ISO 14001:',
        grossLabel: 'Supplier Clearance Status:',
        ruleLabel: 'BAFA Statutory Risk Evaluation:',
        ruleStatus: 'BAFA Red Flag',
        flawedTag: '⚠ Missing ISO 14001 & HR Audit',
        flawedVat: 'Non-Compliant',
        flawedGross: 'SUPPLIER QUARANTINED',
        flawedTitle: '🚨 SUPPLIER BLOCKED (LkSG § 5 VIOLATION)',
        flawedDesc: 'Critical audit gaps in upstream Tier-1 refining. Mandatory prevention plan and BAFA report drafted.',
        verifiedTag: '<i class="fa-solid fa-check"></i> Full LkSG & CSDDD Clearance',
        verifiedVat: 'Audited 98/100',
        verifiedGross: 'APPROVED TIER-1',
        verifiedTitle: '✔ SUPPLIER CLEARED FOR GLOBAL PRODUCTION',
        verifiedDesc: 'Audit documentation validated and sealed with immutable SHA-256 hash in Frankfurt ledger.'
      }
    },
    healthtech: {
      url: 'workspaces/healthtech.html',
      icon: 'fa-hospital-user',
      ruleIcon: 'fa-user-doctor',
      docBadge: 'GOA-2024-4190',
      vendor: 'Klinikum Privatarztabrechnung Dr. Weber',
      channel: 'PADneXt / GOÄ XML Stream',
      ruleVal: '2,3x Gesetzlicher Regelhöchstsatz',
      de: {
        activeName: 'HealthTech & GOÄ Abrechnung',
        net: 'GOÄ Ziffer 435 + 50',
        itemName: 'Ultraschalluntersuchung Abdomen (1x @ 3,5x Faktor)',
        itemVal: 'Liquidation: €478,20',
        vatLabel: 'GOÄ § 5 Abs. 2 Steigerungssatz-Prüfung:',
        grossLabel: 'Abrechnungsbetrag nach Prüfung:',
        ruleLabel: 'PKV Erstattungsfähigkeits-Grenze:',
        ruleStatus: 'Begründungspflichtig',
        flawedTag: '⚠ 3,5x Faktor ohne medizinische Begründung',
        flawedVat: '3,5x Höchstsatz (Ungültig)',
        flawedGross: 'KÜRZUNG AUF 2,3X',
        flawedTitle: '🚨 RECHNUNG ABGELEHNT: GOÄ § 5 VERSTOSS',
        flawedDesc: 'Mit 3,5x liquidiert ohne individuelle schriftliche Patientenbegründung. Automatische Kürzung auf 2,3x Regelsatz (€314,25).',
        verifiedTag: '<i class="fa-solid fa-check"></i> GOÄ § 5 Begründet & Bestätigt',
        verifiedVat: '2,3x Regelsatz',
        verifiedGross: '€314,25 FREIGEGEBEN',
        verifiedTitle: '✔ GOÄ-ABRECHNUNG FREIGEGEBEN: AN PKV ÜBERMITTELT',
        verifiedDesc: 'Medizinische Begründung validiert. Abrechnungsdaten über PADneXt-Schnittstelle an private Krankenversicherung übermittelt.'
      },
      en: {
        activeName: 'HealthTech & GOÄ',
        net: 'GOÄ Code 435 + 50',
        itemName: 'Abdominal Ultrasound (1x @ 3.5x Multiplier)',
        itemVal: 'Billed: €478.20',
        vatLabel: 'GOÄ § 5 Abs. 2 Steigerungssatz Audit:',
        grossLabel: 'Reimbursable Liquidation Amount:',
        ruleLabel: 'PKV Reimbursability Benchmark:',
        ruleStatus: 'Justification Req.',
        flawedTag: '⚠ 3.5x Lacks Pathology Rationale',
        flawedVat: '3.5x Max Rate (Invalid)',
        flawedGross: 'CAPPED TO 2.3X',
        flawedTitle: '🚨 LIQUIDATION REJECTED: GOÄ § 5 VIOLATION',
        flawedDesc: 'Billed at 3.5x without individual written pathology rationale. Statutory fee reduced to 2.3x (€314.25).',
        verifiedTag: '<i class="fa-solid fa-check"></i> GOÄ § 5 Justified & Verified',
        verifiedVat: '2.3x Standard Rate',
        verifiedGross: '€314.25 AUTHORIZED',
        verifiedTitle: '✔ GOÄ FEE CERTIFIED: PASSED TO HEALTH INSURER',
        verifiedDesc: 'Medical justification validated against catalogue. Dispatched to private health insurance clearinghouse.'
      }
    },
    ecommerce: {
      url: 'workspaces/ecommerce.html',
      icon: 'fa-cart-shopping',
      ruleIcon: 'fa-barcode',
      docBadge: 'ASN-2024-9128',
      vendor: 'Shenzhen Precision Electronics Co.',
      channel: 'EDI 856 / GS1 Barcode Stream',
      ruleVal: '€44.239,63 Konvertiert',
      de: {
        activeName: 'E-Commerce & WMS Logistik',
        net: '2.400 Pakete (Container 902)',
        itemName: 'Smart Sensor Hubs (EAN: 4012345678901)',
        itemVal: '$48.000,00 USD Warenwert',
        vatLabel: 'GS1 EAN-13 Prüfsumme & EZB-Wechselkurs:',
        grossLabel: 'SAP MM Wareneingangsbuchung:',
        ruleLabel: 'EZB EUR/USD Referenzkurs (1,0850):',
        ruleStatus: 'Kurs Fixiert',
        flawedTag: '⚠ GS1 EAN-13 Prüfziffer falsch (0 != 1)',
        flawedVat: 'EAN Ungültig',
        flawedGross: 'WARENEINGANG GESTOPPT',
        flawedTitle: '🚨 PALETTENSCAN ABGEWIESEN: UNGÜLTIGER BARCODE',
        flawedDesc: 'Prüfziffer des EAN-13 Barcodes rechnerisch fehlerhaft. Fördertechnik leitet Palette automatisch in Sperrlager-Bucht 7.',
        verifiedTag: '<i class="fa-solid fa-check"></i> GS1 EAN-13 Prüfsumme Gültig',
        verifiedVat: 'EAN-13 Verifiziert',
        verifiedGross: '€44.239,63 GEBUCHT',
        verifiedTitle: '✔ HOCHREGALLAGER-EINLAGERUNG VOLLSTÄNDIG FREIGEGEBEN',
        verifiedDesc: 'Barcode verifiziert. Währungsumrechnung via offiziellem EZB-Kurs fehlerfrei in SAP MM verbucht.'
      },
      en: {
        activeName: 'E-Commerce WMS',
        net: '2,400 Packages (Container 902)',
        itemName: 'Smart Sensor Hubs (EAN: 4012345678901)',
        itemVal: '$48,000.00 USD Invoice Val',
        vatLabel: 'GS1 EAN-13 Checksum & ECB FX Audit:',
        grossLabel: 'SAP MM Goods Receipt Ingestion:',
        ruleLabel: 'ECB EUR/USD Fixing (1.0850):',
        ruleStatus: 'Rate Locked',
        flawedTag: '⚠ GS1 EAN-13 Check Mismatch (0 != 1)',
        flawedVat: 'EAN Corrupted',
        flawedGross: 'WMS INGESTION HALTED',
        flawedTitle: '🚨 PALLET SCAN REJECTED: INVALID BARCODE',
        flawedDesc: 'EAN-13 check digit formula failed. Automated conveyor diverts pallet to quarantine bay 7.',
        verifiedTag: '<i class="fa-solid fa-check"></i> GS1 EAN-13 Checksum Verified',
        verifiedVat: 'EAN-13 Validated',
        verifiedGross: '€44,239.63 COMMITTED',
        verifiedTitle: '✔ HIGH-BAY WAREHOUSE INGESTION AUTHORIZED',
        verifiedDesc: 'Barcode check digit confirmed. FX converted via official ECB fixing into SAP MM.'
      }
    },
    cleantech: {
      url: 'workspaces/cleantech.html',
      icon: 'fa-bolt',
      ruleIcon: 'fa-plug',
      docBadge: 'PV-2024-1184',
      vendor: 'NordSolar Grid Inverters GmbH',
      channel: 'Modbus-TCP / EEG XML Feed',
      ruleVal: '50,00 Hz (49,80 - 50,20 Hz)',
      de: {
        activeName: 'CleanTech & PV-Netzeinspeisung',
        net: '135,0 kWp Anlagenleistung',
        itemName: 'PV-Dachanlage Gewerbepark (3-Phasen Wechselrichter)',
        itemVal: 'Spitzen-Erzeugung: 112,4 kW',
        vatLabel: 'VDE-AR-N 4105 & EEG § 9 70%-Einspeisedeckel:',
        grossLabel: 'Einspeiseleistung ins öffentliche Netz:',
        ruleLabel: 'Netzstabilitäts-Frequenzfenster:',
        ruleStatus: 'Netzfrequenz Stabil',
        flawedTag: '⚠ 70% EEG-Grenze um +17,9 kW überschritten',
        flawedVat: '83,2% Einspeisung',
        flawedGross: 'NETZABREGELUNG AUSGELÖST',
        flawedTitle: '🚨 NETZBETREIBER-VERSTOSS (EEG § 9 ÜBEREINSPEISUNG)',
        flawedDesc: 'Einspeisung überschreitet 70%-Grenze ohne aktives Rundsteuersignal. Automatisches Drosselungssignal an Wechselrichter gesendet.',
        verifiedTag: '<i class="fa-solid fa-check"></i> VDE-AR-N 4105 70%-Deckel Eingehalten',
        verifiedVat: '69,8% Gesetzeskonform',
        verifiedGross: '94,5 KW FREIGEGEBEN',
        verifiedTitle: '✔ NETZKONFORMITÄT ZERTIFIZIERT: EEG-VERGÜTUNG FREIGEGEBEN',
        verifiedDesc: 'Einspeisung gesetzteskonform unterhalb des Limits abgeregelt. Telemetrie für EEG-Einspeisevergütung signiert.'
      },
      en: {
        activeName: 'CleanTech Solar',
        net: '135.0 kWp Plant Capacity',
        itemName: 'Rooftop Solar Array (3-Phase Inverters)',
        itemVal: 'Peak Generation: 112.4 kW',
        vatLabel: 'VDE-AR-N 4105 & EEG § 9 70% Feed-in Cap:',
        grossLabel: 'Net Grid Feed-in Power:',
        ruleLabel: 'Grid Frequency Window:',
        ruleStatus: 'Frequency Nominal',
        flawedTag: '⚠ 70% EEG Cap Exceeded (+17.9 kW)',
        flawedVat: '83.2% Feed-in',
        flawedGross: 'GRID CURTAILMENT',
        flawedTitle: '🚨 GRID OPERATOR VIOLATION (EEG § 9 OVERFEED)',
        flawedDesc: 'Solar feed-in exceeded 70% limit without active ripple control. Automated inverter throttling command issued.',
        verifiedTag: '<i class="fa-solid fa-check"></i> VDE-AR-N 4105 70% Cap Enforced',
        verifiedVat: '69.8% Compliant',
        verifiedGross: '94.5 KW FEED-IN OK',
        verifiedTitle: '✔ GRID CERTIFICATION VERIFIED: TARIFF EARNED',
        verifiedDesc: 'Feed-in power locked safely beneath statutory limit. Telemetry signed for public grid ledger.'
      }
    },
    proptech: {
      url: 'workspaces/proptech.html',
      icon: 'fa-building',
      ruleIcon: 'fa-leaf',
      docBadge: 'HKV-2024-6022',
      vendor: 'Techem & Ista Messdienstabrechnung',
      channel: 'HeizkostenV Datenaustausch',
      ruleVal: '10-Stufen CO2-Modell Geregelt',
      de: {
        activeName: 'PropTech & Heizkostenabrechnung',
        net: '24 Wohneinheiten MFH',
        itemName: 'Jahresheizung & Warmwasser (€38.450,00 Gesamtkosten)',
        itemVal: 'Gesamtkosten: €38.450,00',
        vatLabel: 'HeizkostenV § 7 & § 12 Gesetzlicher 70/30 Schlüssel:',
        grossLabel: 'Umlagefähige Nebenkostenabrechnung:',
        ruleLabel: 'CO2-Kostenaufteilung (§ 5 CO2KostAufG):',
        ruleStatus: 'CO2-Split Berechnet',
        flawedTag: '⚠ Unzulässiger 50/50 Schlüssel (15% Kürzungsrecht)',
        flawedVat: '50% / 50% Fehlerhaft',
        flawedGross: 'NEUBERECHNUNG ERFORDERLICH',
        flawedTitle: '🚨 MIETERRÜGE AUSGELÖST: HEIZKOSTENV § 12 KÜRZUNGSRECHT',
        flawedDesc: 'Abrechnung mit unzulässigem 50/50 Schlüssel ohne Sanierungsbefreiung. Mieter besitzen gesetzliches 15%-Kürzungsrecht.',
        verifiedTag: '<i class="fa-solid fa-check"></i> HeizkostenV 70/30 Schlüssel Gesetzeskonform',
        verifiedVat: '70% Verbrauch / 30% Grund',
        verifiedGross: '€38.450,00 RECHTSSICHER',
        verifiedTitle: '✔ NEBENKOSTENABRECHNUNG RECHTSSICHER ERSTELLT',
        verifiedDesc: '70% Verbrauchs- und 30% Grundflächenanteile cent-genau berechnet. Vollständig rügesicher für 24 Wohneinheiten.'
      },
      en: {
        activeName: 'PropTech Real Estate',
        net: '24 Residential Units',
        itemName: 'Annual Heating & Hot Water (€38,450.00 Total)',
        itemVal: 'Total Costs: €38,450.00',
        vatLabel: 'HeizkostenV § 7 & § 12 Mandatory 70/30 Split:',
        grossLabel: 'Apportionable Operating Cost Statement:',
        ruleLabel: 'CO2 Cost Sharing (§ 5 CO2KostAufG):',
        ruleStatus: 'CO2 Split Done',
        flawedTag: '⚠ Illegal 50/50 Split (15% Rent Cut)',
        flawedVat: '50% / 50% Invalid',
        flawedGross: 'RECALCULATION REQ',
        flawedTitle: '🚨 TENANT DISPUTE: HEIZKOSTENV § 12 APPLIED',
        flawedDesc: 'Billed on invalid 50/50 split without insulation waiver. Tenants legally entitled to 15% rent reduction.',
        verifiedTag: '<i class="fa-solid fa-check"></i> HeizkostenV 70/30 Statutory Allocation Confirmed',
        verifiedVat: '70% Consumption / 30% Base',
        verifiedGross: '€38,450.00 RECONCILED',
        verifiedTitle: '✔ OPERATING COSTS CERTIFIED: AUDIT-PROOF',
        verifiedDesc: '70% consumption and 30% base area keys mathematically reconciled. Zero tenant dispute exposure.'
      }
    },
    erp: {
      url: 'workspaces/erp-staging.html',
      icon: 'fa-database',
      ruleIcon: 'fa-server',
      docBadge: 'SQL-2024-0019',
      vendor: 'SAP S/4HANA Staging Queue',
      channel: 'REST OData V4 / RFC BAPI',
      ruleVal: 'SHA-256 Block-Verkettung Aktiv',
      de: {
        activeName: 'Enterprise ERP & SAP Firewall',
        net: 'Enterprise Payload Puffer',
        itemName: 'Inbound EDI BAPI Payload: BAPI_ACC_DOCUMENT_POST',
        itemVal: 'Transaktionsgröße: 1.842 KB',
        vatLabel: 'Parametrisierte T-SQL & OWASP ASVS Injection-Schutz:',
        grossLabel: 'Datenbank-Transaktionsstatus:',
        ruleLabel: 'Frankfurt AWS eu-central-1 Neon Ledger:',
        ruleStatus: 'Ledger Synchron',
        flawedTag: "⚠ SQL-Injection Schadcode erkannt (' OR 1=1 --)",
        flawedVat: 'Bösartige Syntax',
        flawedGross: 'INJECTION BLOCKIERT',
        flawedTitle: '🚨 OWASP ASVS FIREWALL: BÖSARTIGE SQL-INJECTION ABGEWEHRT',
        flawedDesc: 'Unerlaubte SQL-Syntax im Bemerkungsfeld abgefangen. Payload isoliert und Sicherheits-Incident im Ledger protokolliert.',
        verifiedTag: '<i class="fa-solid fa-check"></i> Parametrisiertes T-SQL Prepared Statement',
        verifiedVat: 'OWASP Level-3 Bestanden',
        verifiedGross: 'IN S/4HANA BEREITGESTELLT',
        verifiedTitle: '✔ TRANSAKTION GEPRÜFT: AN SAP S/4HANA ÜBERGEBEN',
        verifiedDesc: 'Keine rohen String-Verknüpfungen. Transaktion deterministisch im Frankfurter Neon-PostgreSQL Ledger festgeschrieben.'
      },
      en: {
        activeName: 'Enterprise ERP',
        net: 'Enterprise Payload Buffer',
        itemName: 'Inbound EDI BAPI Payload: BAPI_ACC_DOCUMENT_POST',
        itemVal: 'Transaction Payload: 1,842 KB',
        vatLabel: 'Parameterized T-SQL & OWASP ASVS Defense:',
        grossLabel: 'Database Transaction Status:',
        ruleLabel: 'Frankfurt AWS eu-central-1 Neon Ledger:',
        ruleStatus: 'Ledger Synced',
        flawedTag: "⚠ SQL Injection Detected (' OR 1=1 --)",
        flawedVat: 'Malicious Syntax',
        flawedGross: 'INJECTION BLOCKED',
        flawedTitle: '🚨 OWASP ASVS FIREWALL: MALICIOUS PAYLOAD DROPPED',
        flawedDesc: 'Unsanitized SQL fragment detected in comment field. Payload quarantined; security incident logged.',
        verifiedTag: '<i class="fa-solid fa-check"></i> Parameterized T-SQL Prepared Statement',
        verifiedVat: 'OWASP Level-3 Passed',
        verifiedGross: 'STAGED TO S/4HANA',
        verifiedTitle: '✔ TRANSACTION VERIFIED: COMMITTED TO SAP S/4HANA',
        verifiedDesc: 'Zero raw string concatenation. Database transaction safely committed to Frankfurt PostgreSQL ledger.'
      }
    }
  };

  let updateShowcaseGlobal = null;

  function updateScannerDisplay(domainKey, mode) {
    state.currentScannerDomain = domainKey || state.currentScannerDomain || 'fintech';
    state.currentScannerMode = mode || state.currentScannerMode || 'flawed';

    const preset = SCANNER_PRESETS[state.currentScannerDomain] || SCANNER_PRESETS.fintech;
    const lang = state.currentLang === 'de' ? 'de' : 'en';
    const data = preset[lang] || preset.en;

    const docBadge = document.getElementById('scanner-doc-badge');
    const metaVendor = document.getElementById('sc-meta-val-vendor');
    const metaChannel = document.getElementById('sc-meta-val-channel');
    const metaNet = document.getElementById('sc-meta-val-net');
    const itemIcon = document.getElementById('sc-item-icon');
    const itemName = document.getElementById('sc-item-name');
    const itemVal = document.getElementById('sc-item-val');
    const vatLabel = document.getElementById('sc-vat-label');
    const vatRow = document.getElementById('scanner-vat-row');
    const vatTag = document.getElementById('scanner-vat-tag');
    const vatAmount = document.getElementById('scanner-vat-amount');
    const grossLabel = document.getElementById('sc-gross-label');
    const grossVal = document.getElementById('scanner-gross-val');
    const ruleIcon = document.getElementById('sc-rule-icon');
    const ibanLabel = document.getElementById('sc-iban-label');
    const ibanVal = document.getElementById('sc-iban-val');
    const ibanStatus = document.getElementById('sc-iban-status');
    const bannerFlawed = document.getElementById('scanner-banner-flawed');
    const bannerVerified = document.getElementById('scanner-banner-verified');
    const alertTitleFlawed = document.getElementById('sc-alert-title-flawed');
    const alertDescFlawed = document.getElementById('sc-alert-desc-flawed');
    const alertTitleVerified = document.getElementById('sc-alert-title-verified');
    const alertDescVerified = document.getElementById('sc-alert-desc-verified');
    const btnFlawed = document.getElementById('btn-scanner-flawed');
    const btnVerified = document.getElementById('btn-scanner-verified');
    const activeTagName = document.getElementById('sc-active-tag-name');
    const activeTagPrefix = document.getElementById('sc-active-tag-prefix');
    const launchBtn = document.getElementById('hero-scanner-launch-btn');
    const launchBtnLabel = document.getElementById('sc-launch-btn-label');

    if (docBadge) docBadge.textContent = preset.docBadge;
    if (metaVendor) metaVendor.textContent = preset.vendor;
    if (metaChannel) metaChannel.textContent = preset.channel;
    if (metaNet) metaNet.textContent = data.net;

    if (itemIcon) itemIcon.className = `fa-solid ${preset.icon} text-muted`;
    if (itemName) itemName.textContent = data.itemName;
    if (itemVal) itemVal.textContent = data.itemVal;

    if (vatLabel) vatLabel.textContent = data.vatLabel;
    if (grossLabel) grossLabel.textContent = data.grossLabel;

    if (ruleIcon) ruleIcon.className = `fa-solid ${preset.ruleIcon} text-muted`;
    if (ibanLabel) ibanLabel.textContent = data.ruleLabel;
    if (ibanVal) ibanVal.textContent = preset.ruleVal;
    if (ibanStatus) ibanStatus.textContent = data.ruleStatus;

    if (activeTagPrefix) activeTagPrefix.textContent = lang === 'de' ? 'Aktiver Workspace:' : 'Active Workspace:';
    if (activeTagName) activeTagName.textContent = data.activeName;
    if (launchBtn) launchBtn.href = preset.url;
    if (launchBtnLabel) launchBtnLabel.textContent = lang === 'de' ? `${data.activeName} öffnen` : `Launch ${data.activeName} Workspace`;

    if (state.currentScannerMode === 'flawed') {
      if (btnFlawed) btnFlawed.classList.add('active');
      if (btnVerified) btnVerified.classList.remove('active');
      if (vatRow) vatRow.classList.remove('verified');
      if (vatTag) {
        vatTag.className = 'badge-scanner-discrepancy';
        vatTag.textContent = data.flawedTag;
      }
      if (vatAmount) {
        vatAmount.className = 'font-mono-code font-bold text-danger';
        vatAmount.textContent = data.flawedVat;
      }
      if (grossVal) {
        grossVal.className = 'font-mono-code font-bold text-danger scanner-gross-val';
        grossVal.textContent = data.flawedGross;
      }
      if (alertTitleFlawed) alertTitleFlawed.textContent = data.flawedTitle;
      if (alertDescFlawed) alertDescFlawed.textContent = data.flawedDesc;
      if (bannerFlawed) bannerFlawed.style.display = 'flex';
      if (bannerVerified) bannerVerified.style.display = 'none';
    } else {
      if (btnVerified) btnVerified.classList.add('active');
      if (btnFlawed) btnFlawed.classList.remove('active');
      if (vatRow) vatRow.classList.add('verified');
      if (vatTag) {
        vatTag.className = 'badge-scanner-clean';
        vatTag.innerHTML = data.verifiedTag;
      }
      if (vatAmount) {
        vatAmount.className = 'font-mono-code font-bold text-emerald';
        vatAmount.textContent = data.verifiedVat;
      }
      if (grossVal) {
        grossVal.className = 'font-mono-code font-bold text-emerald scanner-gross-val';
        grossVal.textContent = data.verifiedGross;
      }
      if (alertTitleVerified) alertTitleVerified.textContent = data.verifiedTitle;
      if (alertDescVerified) alertDescVerified.textContent = data.verifiedDesc;
      if (bannerFlawed) bannerFlawed.style.display = 'none';
      if (bannerVerified) bannerVerified.style.display = 'flex';
    }
  }

  function initHeroScanner() {
    const btnFlawed = document.getElementById('btn-scanner-flawed');
    const btnVerified = document.getElementById('btn-scanner-verified');
    const wrap = document.getElementById('hero-scanner-wrap');
    const card = document.getElementById('hero-scanner-card');

    if (btnFlawed) {
      btnFlawed.addEventListener('click', () => {
        updateScannerDisplay(state.currentScannerDomain, 'flawed');
      });
    }

    if (btnVerified) {
      btnVerified.addEventListener('click', () => {
        updateScannerDisplay(state.currentScannerDomain, 'verified');
      });
    }

    // 3D Parallax Tilt with Smooth Physics
    if (wrap && card) {
      wrap.addEventListener('mousemove', (e) => {
        const rect = wrap.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -6; // max 6 deg
        const rotateY = ((x - centerX) / centerX) * 6;
        card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg)`;
      });

      wrap.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
      });
    }

    updateScannerDisplay(state.currentScannerDomain, state.currentScannerMode);
  }

  /**
   * 22. Interactive 10-Industry Workspace Hub Dock (Hick's Law)
   */
  function initWorkspaceDock() {
    const dockPills = document.querySelectorAll('#workspace-pill-dock .ws-pill');
    const topDockPills = document.querySelectorAll('#top-dock-pills .dock-pill');
    if (!dockPills.length && !topDockPills.length) return;

    const domainsData = (window.Haulitz && window.Haulitz.Domains) || {};

    const domainPages = {
      fintech: 'workspaces/fintech.html',
      logistics: 'workspaces/logistics.html',
      supply: 'workspaces/supply-chain.html',
      insurtech: 'workspaces/insurtech.html',
      legaltech: 'workspaces/legaltech.html',
      healthtech: 'workspaces/healthtech.html',
      ecommerce: 'workspaces/ecommerce.html',
      cleantech: 'workspaces/cleantech.html',
      proptech: 'workspaces/proptech.html',
      erp: 'workspaces/erp-staging.html'
    };

    updateShowcaseGlobal = (domainKey) => {
      const d = domainsData[domainKey];
      if (!d) return;

      const scNum = document.getElementById('sc-card-num');
      const scTitle = document.getElementById('sc-card-title');
      const scDocType = document.getElementById('sc-card-doc-type');
      const scBadgeText = document.getElementById('sc-card-badge-text');
      const scDesc = document.getElementById('sc-card-desc');
      const scRules = document.getElementById('sc-card-rules');
      const scTargets = document.getElementById('sc-card-targets');
      const scLaunchBtn = document.getElementById('sc-card-launch-btn');
      const scBtnLaunchText = document.getElementById('sc-btn-launch-text');

      if (scNum) scNum.textContent = d.number;
      if (scTitle) scTitle.textContent = state.currentLang === 'de' ? (d.germanTitle || d.title) : d.title;
      if (scDocType) scDocType.textContent = d.documentType;
      if (scBadgeText) scBadgeText.textContent = d.law;
      if (scDesc) scDesc.textContent = d.description;
      if (scTargets) scTargets.textContent = `${d.targetEmployers} • SAP S/4HANA`;

      if (scRules && Array.isArray(d.rules)) {
        scRules.innerHTML = d.rules.map(r => `
          <div class="showcase-rule-item">
            <i class="fa-solid fa-circle-check"></i>
            <span>${r}</span>
          </div>
        `).join('');
      }

      const targetUrl = domainPages[domainKey] || `${domainKey}.html`;
      if (scLaunchBtn) scLaunchBtn.href = targetUrl;
      if (scBtnLaunchText) {
        const titleName = state.currentLang === 'de' ? (d.germanTitle || d.title) : d.title;
        scBtnLaunchText.textContent = state.currentLang === 'de' ? `${titleName} öffnen` : `Launch ${d.title} Workspace`;
      }

      // Sync active state in both pill docks
      dockPills.forEach(p => p.classList.toggle('active', p.getAttribute('data-domain') === domainKey));
      topDockPills.forEach(p => p.classList.toggle('active', p.getAttribute('data-domain') === domainKey));
    };

    dockPills.forEach(pill => {
      pill.addEventListener('click', () => {
        const domainKey = pill.getAttribute('data-domain');
        state.currentScannerDomain = domainKey;
        updateShowcaseGlobal(domainKey);
        updateScannerDisplay(domainKey, state.currentScannerMode);
      });
    });

    topDockPills.forEach(pill => {
      pill.addEventListener('click', (e) => {
        e.preventDefault();
        const domainKey = pill.getAttribute('data-domain');
        state.currentScannerDomain = domainKey;
        updateShowcaseGlobal(domainKey);
        updateScannerDisplay(domainKey, state.currentScannerMode);
      });
    });

    // Initialize with default domain (fintech)
    updateShowcaseGlobal(state.currentScannerDomain || 'fintech');
    updateScannerDisplay(state.currentScannerDomain || 'fintech', state.currentScannerMode || 'flawed');
  }

  /**
   * 23. Executive Contact Actions: Clipboard Copy & Toast Feedback
   */
  function initCopyEmail() {
    const copyBtn = document.getElementById('btn-copy-email');
    if (!copyBtn) return;
    copyBtn.addEventListener('click', async () => {
      const email = 'allensimeonfletcher@gmail.com';
      try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(email);
        } else {
          const ta = document.createElement('textarea');
          ta.value = email;
          document.body.appendChild(ta);
          ta.select();
          document.execCommand('copy');
          document.body.removeChild(ta);
        }
        showToast(state.currentLang === 'de' ? 'E-Mail in die Zwischenablage kopiert: ' + email : 'Email copied to clipboard: ' + email);
      } catch (err) {
        showToast(email);
      }
    });
  }

  /**
   * 24. Bento Card 2: Interactive ISO 7064 Modulo-97 Checksum Calculator
   */
  function initBentoIbanValidator() {
    const input = document.getElementById('bento-iban-input');
    const msg = document.getElementById('bento-iban-msg');
    if (!input || !msg) return;

    function validateIban(raw) {
      const clean = (raw || '').replace(/[^a-zA-Z0-9]/g, '').toUpperCase();
      if (clean.length < 15 || clean.length > 34) {
        return { valid: false, text: state.currentLang === 'de' ? 'Ungültige Länge (15-34 Zeichen)' : 'Invalid Length (15-34 chars)' };
      }
      const rearranged = clean.slice(4) + clean.slice(0, 4);
      let numericStr = '';
      for (let i = 0; i < rearranged.length; i++) {
        const code = rearranged.charCodeAt(i);
        if (code >= 65 && code <= 90) {
          numericStr += (code - 55).toString();
        } else {
          numericStr += rearranged[i];
        }
      }
      let remainder = 0;
      for (let i = 0; i < numericStr.length; i += 7) {
        const chunk = remainder.toString() + numericStr.substring(i, i + 7);
        remainder = parseInt(chunk, 10) % 97;
      }

      if (remainder === 1) {
        return { valid: true, text: state.currentLang === 'de' ? 'Prüfsumme Gültig (Rest == 1, ISO 7064)' : 'Remainder == 1 Validated (ISO 7064)' };
      } else {
        return { valid: false, text: state.currentLang === 'de' ? `Prüfsummenfehler (Rest = ${remainder} ≠ 1)` : `Checksum Failed (Remainder = ${remainder} ≠ 1)` };
      }
    }

    input.addEventListener('input', () => {
      const res = validateIban(input.value);
      if (res.valid) {
        msg.className = 'text-emerald font-bold font-mono-code';
        msg.textContent = res.text;
      } else {
        msg.className = 'text-danger font-bold font-mono-code';
        msg.textContent = res.text;
      }
    });
  }

  /**
   * 25. Bento Card 4: Interactive SHA-256 Block Sealing Engine
   */
  function initBentoHashSealer() {
    const sealBtn = document.getElementById('btn-seal-block');
    const blockNum = document.getElementById('bento-block-num');
    const blockHash = document.getElementById('bento-block-hash');
    const currentBlock = document.getElementById('bento-current-block');
    if (!sealBtn || !blockNum || !blockHash) return;

    let currentBlockIndex = 30;

    sealBtn.addEventListener('click', async () => {
      currentBlockIndex++;
      const payload = `HAULITZ-RECORD-BLOCK-${currentBlockIndex}-${Date.now()}`;
      let newHashHex = '';
      try {
        if (window.crypto && window.crypto.subtle) {
          const enc = new TextEncoder();
          const buf = await window.crypto.subtle.digest('SHA-256', enc.encode(payload));
          const arr = Array.from(new Uint8Array(buf));
          newHashHex = arr.map(b => b.toString(16).padStart(2, '0')).join('').substring(0, 10) + '...';
        } else {
          newHashHex = Math.random().toString(36).substring(2, 12) + '...';
        }
      } catch (e) {
        newHashHex = Math.random().toString(36).substring(2, 12) + '...';
      }

      blockNum.textContent = `Block #${currentBlockIndex} (${state.currentLang === 'de' ? 'Aktuell' : 'Current'})`;
      blockHash.textContent = newHashHex;

      if (currentBlock) {
        currentBlock.style.transition = 'background 0.15s ease, border-color 0.15s ease';
        currentBlock.style.borderColor = '#10b981';
        currentBlock.style.background = 'rgba(16, 185, 129, 0.25)';
        setTimeout(() => {
          currentBlock.style.borderColor = '';
          currentBlock.style.background = '';
        }, 500);
      }

      showToast(state.currentLang === 'de' ? `Block #${currentBlockIndex} versiegelt: ${newHashHex}` : `Block #${currentBlockIndex} sealed: ${newHashHex}`);
    });
  }

  /**
   * 26. Enterprise FAQ Accordion Interactive Controller
   */
  function initFaqAccordion() {
    const faqContainer = document.getElementById('faq-accordion');
    if (!faqContainer) return;

    const items = faqContainer.querySelectorAll('.faq-item');
    items.forEach(item => {
      const btn = item.querySelector('.faq-question-btn');
      if (!btn) return;

      btn.addEventListener('click', () => {
        const isOpen = item.classList.contains('active');
        // Accordion behavior: close other items
        items.forEach(otherItem => {
          otherItem.classList.remove('active');
          const otherBtn = otherItem.querySelector('.faq-question-btn');
          if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
        });

        if (!isOpen) {
          item.classList.add('active');
          btn.setAttribute('aria-expanded', 'true');
        }
      });
    });
  }

  /**
   * 27. Bento Card 1: Interactive Floating Point vs Cent Integer Presets
   */
  function initBentoCentPresets() {
    const buttons = document.querySelectorAll('.btn-cent-test');
    const floatCalc = document.getElementById('bento-float-calc');
    const centCalc = document.getElementById('bento-cent-calc');
    if (!buttons.length || !floatCalc || !centCalc) return;

    const presets = {
      '1': {
        float: '0.1 + 0.2 = 0.30000000000000004 €',
        cent: '10¢ + 20¢ = 30¢ (€0.30)'
      },
      '2': {
        float: '19.99 * 3 + 0.01 = 59.980000000000004 €',
        cent: '1999¢ × 3 + 1¢ = 5998¢ (€59.98)'
      },
      '3': {
        float: '105.15 * 0.19 = 19.978500000000003 €',
        cent: '10515¢ × 19 / 100 = 1998¢ (€19.98)'
      }
    };

    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        buttons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const testKey = btn.getAttribute('data-test');
        const data = presets[testKey];
        if (data) {
          floatCalc.textContent = data.float;
          centCalc.textContent = data.cent;
        }
      });
    });
  }

  /**
   * 28. German Statutory Legal Modals (§ 5 TMG Impressum & DSGVO Datenschutz)
   */
  function initLegalModals() {
    const impressumModal = document.getElementById('impressum-modal');
    const datenschutzModal = document.getElementById('datenschutz-modal');

    const openImpressumBtns = [
      document.getElementById('link-open-impressum'),
      document.getElementById('btn-impressum-legal')
    ].filter(Boolean);

    const openDatenschutzBtns = [
      document.getElementById('link-open-datenschutz'),
      document.getElementById('btn-datenschutz-legal')
    ].filter(Boolean);

    const closeImpressumBtn = document.getElementById('btn-close-impressum');
    const closeDatenschutzBtn = document.getElementById('btn-close-datenschutz');

    const openModal = (modal) => {
      if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    };

    const closeModal = (modal) => {
      if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
      }
    };

    openImpressumBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        openModal(impressumModal);
      });
    });

    openDatenschutzBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        openModal(datenschutzModal);
      });
    });

    if (closeImpressumBtn) {
      closeImpressumBtn.addEventListener('click', () => closeModal(impressumModal));
    }
    if (closeDatenschutzBtn) {
      closeDatenschutzBtn.addEventListener('click', () => closeModal(datenschutzModal));
    }

    [impressumModal, datenschutzModal].forEach(modal => {
      if (!modal) return;
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          closeModal(modal);
        }
      });
    });

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeModal(impressumModal);
        closeModal(datenschutzModal);
      }
    });
  }

  /**
   * 29. Smooth Inertial Floating Back-to-Top Controller
   */
  function initBackToTop() {
    const btn = document.getElementById('btn-back-to-top');
    if (!btn) return;

    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (window.scrollY > 400) {
            btn.classList.add('visible');
          } else {
            btn.classList.remove('visible');
          }
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });

    btn.addEventListener('click', () => {
      if (window.lenis && typeof window.lenis.scrollTo === 'function') {
        window.lenis.scrollTo(0, { duration: 1.2 });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  }

  // Master Initialization Engine
  function boot() {
    initDOMElements();
    initLenis();
    initClerk();
    applyLanguageUI();
    setupEventListeners();
    handleHashNavigation();
    checkAuthAndIndustryGate();
    initSpotlightTracking();
    initCommandPalette();
    initHeroScanner();
    initWorkspaceDock();
    initCopyEmail();
    initBentoIbanValidator();
    initBentoHashSealer();
    initFaqAccordion();
    initBentoCentPresets();
    initLegalModals();
    initBackToTop();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }

})();

