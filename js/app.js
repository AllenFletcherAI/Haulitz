/**
 * HAULITZ ENTERPRISE GATEWAY - MASTER CONTROLLER & APPLICATION ENGINE (v3.3)
 * Standard: ASD-STE100 Simplified Technical English
 * Default Settings: German Language (de), Obsidian Dark Mode (dark)
 * Integrations: AWS Frankfurt Neon PostgreSQL, Resend Transactional Alerting
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

      // Header Brand & Navigation
      headerBrandSubtitle: 'Referenzarchitektur',
      headerGithubLabel: 'Code & Tests (30/30)',
      btnSealBlock: 'Block versiegeln',
      scActiveTagPrefix: 'Aktiver Workspace:',
      heroScannerLaunchBtn: 'Branchen-Workspace öffnen',
      fHeadWorkspaces: '10 Branchen-Workspaces',
      fHeadArch: 'Architektur & Nachweise',
      fHeadContact: 'Kontakt & Rechtliches',
      btnCopyEmail: 'E-Mail kopieren',
      btnRequestDossier: 'Lebenslauf anfordern',

      // Hero Section
      heroBadgeText: 'OPEN-SOURCE-REFERENZARCHITEKTUR · DETERMINISTISCHE VERIFIKATION',
      heroTitleMain: 'Rechnungsfehler und Steuerrisiken stoppen,',
      heroTitleGradient: 'bevor sie Ihr ERP belasten.',
      heroSubheadline: 'HAULITZ fängt Rundungsfehler, überhöhte Umsatzsteuern und fehlerhafte Bankverbindungen automatisch vor der Buchung in SAP S/4HANA oder DATEV ab. Cent-genaue Prüfung. Null Zahlungsrisiko. Revisionssichere Übergabe.',
      btnHeroTestText: 'Live-Ingestion-Scanner testen',
      btnHeroGithubText: 'GitHub Quellcode & Tests (30/30)',

      // Living Document Scanner Card
      scannerFeedLabel: 'INTERAKTIVER BELEG-SIMULATOR',
      scannerBtnFlawedText: 'Fehlerhafter Beleg',
      scannerBtnVerifiedText: 'HAULITZ Verifiziert',
      scMetaSubVendor: 'Lieferant / Partner:',
      scMetaSubChannel: 'Übertragungskanal:',
      scMetaSubNet: 'Nettobetrag:',
      scItemName: 'Server-Baugruppen (12x @ €350,00)',
      scVatLabel: 'Berechnete USt (19% gem. § 12 Abs. 1 UStG):',
      scGrossLabel: 'Rechnungsgesamtbetrag:',
      scIbanLabel: 'SEPA IBAN (ISO 7064 MOD 97-10):',
      scIbanStatus: 'Syntax gültig (MOD 97-10)',
      scAlertTitleFlawed: '🚨 ZAHLUNGSLAUF GESTOPPT (§ 12 Abs. 1 & § 14 UStG ABWEICHUNG)',
      scAlertDescFlawed: 'Lieferant berechnet 19% USt mit €918,00 statt gesetzlich €798,00 (+€120,00 Differenz). Verbuchung in SAP S/4HANA blockiert. Kaufmännische Beanstandung generiert.',
      scAlertTitleVerified: '✔ AUDIT-FREIGABE: BEREIT FÜR SAP S/4HANA',
      scAlertDescVerified: 'Posten-Arithmetik auf den Cent korrigiert (€798,00 USt / €4.998,00 Gesamtbetrag). Sequenzieller SHA-256 Prüfblock für GoBD-Prüfpfad versiegelt.',

      // 10-Industry Workspace Hub
      hubTagText: '10 BRANCHEN-WORKSPACES',
      hubHeading: 'Spezialisierte Prüfregeln für Unternehmens-Workflows',
      hubSubheading: 'Wählen Sie eine Branche, um deterministische Validierungsregeln für Ihr ERP-Schema in Echtzeit zu testen.',
      scCardTargetsLabel: 'Schnittstellen & Zielsysteme:',
      directoryLeadHeading: 'Alle 10 Branchen-Workspaces im Überblick',
      directoryLeadSub: 'Klicken Sie auf einen Workspace, um die spezialisierte Prüfsuite und Rechtsnormen zu testen:',

      // Compliance Ribbon Badges
      badgeGobdLaw: 'GoBD (BMF-Grundsätze)',
      badgeGobdDesc: 'Unveränderbarkeit & SHA-256 Prüfpfad',
      badgeUstgLaw: '§ 12 & § 14 UStG',
      badgeUstgDesc: '19% / 7% USt & Pflichtangaben',
      badgeHgbLaw: 'HGB § 377 (Supply Chain)',
      badgeHgbDesc: '3-Wege-Abgleich (PO vs. Wareneingang)',
      badgeIbanLaw: 'ISO 7064 MOD 97-10',
      badgeIbanDesc: 'IBAN-Syntax & Prüfziffern',
      badgeDsgvoLaw: 'DSGVO / GDPR',
      badgeDsgvoDesc: 'Frankfurt VPC Referenzarchitektur',
      erpEcosystemLabel: 'SCHNITTSTELLEN & INTEGRATIONSZIELE:',

      // Apple / Linear Bento Grid
      bentoTagText: 'KERNARCHITEKTUR & SCHUTZSCHRANKEN',
      bentoHeading: 'Wie HAULITZ Ihr Unternehmen schützt',
      bentoSubheading: 'Vier deterministische Schutzschranken im Code, bevor Finanzdaten in unveränderbare Ledger fließen.',
      bentoMetric1: 'Spart bis zu 12.000 € Rundungsverluste pro 10.000 Belege',
      bentoMetric2: 'Verhindert Fehlüberweisungen & Bank-Rücklastgebühren',
      bentoMetric3: 'Schützt SAP S/4HANA vor Stammdaten- und Schemakorruption',
      bentoMetric4: 'Erfüllt BMF-Grundsätze zur Unveränderbarkeit (GoBD § 147 AO)',
      bento1Title: 'Positionsrundung & Cent-Genauigkeit',
      bento1Desc: 'Kumulierte Rundungsdifferenzen über Dutzende Rechnungspositionen oder Währungsumrechnungen bringen ERP-Abstimmungen zum Stillstand. HAULITZ rechnet strikt in 64-Bit Integer-Cents (BigInt) und verhindert Rundungsdrift vor dem Hauptbuch.',
      bentoFloatHeader: 'Gleitkomma-Drift',
      bentoCentHeader: 'HAULITZ 64-Bit Cent-Genauigkeit',
      bentoFloatCalc: '50 × €0,3781 → 50 × €0,38 = €19,00 (Delta +€0,09)',
      bentoCentCalc: '50 × 199¢ @ 19% = 1890,5¢ → 1891¢ (€18,91)',
      bentoFloatSub: '❌ Kumulierte Rundungsabweichung',
      bentoCentSub: '✔ Exakter Cent-Abgleich nach Gesetz',
      bentoPresetsLabel: 'TESTWERTE AUSWÄHLEN:',
      btnPreset1: '50 Positionen @ 1,99 € (19% USt)',
      btnPreset2: 'Gemischte USt-Sätze (§ 12 Abs. 1 & 2)',
      btnPreset3: 'Währungsumrechnung (USD/EUR EZB)',
      bento2Title: 'ISO 7064 MOD 97-10 Prüfziffern',
      bento2Desc: 'Validiert IBAN-Syntax und Prüfziffern mathematisch per ISO 7064 MOD 97-10 vor dem Anstoßen von SEPA-Überweisungen. Fängt Tippfehler und Zahlendreher zuverlässig ab. (Hinweis: Prüft Syntaxintegrität; Kontoverifikation erfordert Bankverzeichnisabfrage).',
      bentoIbanMsg: 'Modulo-97 Rest == 1 Gültig (ISO 7064 MOD 97-10)',
      bento3Title: 'Pre-Staging ERP-Firewall',
      bento3Desc: 'Dient als automatisierter Prüfpuffer vor SAP S/4HANA (BAPI_INCOMINGINVOICE_CREATE / INVOIC02) und DATEV. Fehlerhafte Belege erzeugen strukturierte Beanstandungsmemos vor dem Staging.',
      bento4Title: 'Revisionssicherer SHA-256 Prüfpfad',
      bento4Desc: 'Jeder Prüflauf wird kryptografisch mit dem Vorgängerblock verkettet und unterstützt GoBD-Anforderungen an Unveränderbarkeit und Prüfbarkeit (gemäß BMF-Schreiben). Zielarchitektur für PostgreSQL in Frankfurt (AWS eu-central-1).',

      // Backend Architecture & C# / T-SQL Integration
      codeArchTagText: 'ENTERPRISE BACKEND ARCHITEKTUR',
      codeArchHeading: 'C# .NET 8 SDK & Parametrisiertes T-SQL-Staging',
      codeArchSubheading: 'Produktionsreifer Backend-Code: Sicher gegen SQL-Injection, mit strikten Transaktionen und nativer Integration in Microsoft SQL Server und SAP S/4HANA Side-Car Tabellen.',
      codeTabCSharpText: 'C# .NET 8 Driver',
      codeTabTSQLText: 'Parametrisiertes T-SQL Staging',
      codeTabJsonText: 'ZUGFeRD 2.2 JSON-LD',
      btnCopyCodeText: 'Code kopieren',
      terminalQsTitle: 'bash · open-source-quickstart',
      btnCopyTerminalText: 'Befehl kopieren',
      gobdHonestyTitle: 'Transparenzhinweis zu GoBD & Systemarchitektur',
      gobdHonestyText: 'HAULITZ implementiert die technischen Grundsätze des BMF-Schreibens vom 28.11.2019 (Cent-Genauigkeit, Unveränderbarkeit durch sequenzielle SHA-256 Hash-Ketten, deterministische Neuberechnung). Es stellt eine Open-Source-Referenzarchitektur dar, kein kommerzielles Software-Testat. Dieses Demo-Portal läuft als Edge-Gateway auf Cloudflare Workers; die Produktiv-Zielarchitektur für Mandantendaten ist für private VPCs in Frankfurt am Main (AWS eu-central-1) mit PostgreSQL Row-Level Security ausgelegt.',

      // Solutions & Integration Engineer Profile
      founderRoleTitle: 'Solutions & Integration Engineer',
      fImpTitle1: 'Die technische Herausforderung',
      fImpDesc1: 'Enterprise-Ingestion-Pipelines geraten ins Stocken, wenn eingehende Rechnungen minimale <strong>Rundungsabweichungen</strong>, fehlerhafte <strong>Steuersätze</strong> oder ungültige Bankprüfziffern enthalten. Die manuelle Nachbearbeitung kostet tausende Arbeitsstunden.',
      fImpTitle2: 'Die Referenzarchitektur',
      fImpDesc2: 'Ich habe HAULITZ als Open-Source-Referenzgateway entwickelt. Es prüft Belege (ZUGFeRD 2.2, XRechnung, EDI, PDF) im Speicher mit <strong>64-Bit-Cent-Präzision</strong>, schirmt <strong>SAP S/4HANA Staging-Tabellen</strong> vor korrupten Daten ab und führt GoBD-konforme Prüfpfade.',
      fImpTitle3: 'Solutions Engineering Kompetenzprofil',
      fImpDesc3: 'Beweist direkte Kompetenz für <strong>Solutions Engineering</strong>: Integration unstrukturierter Drittsystem-Daten in strikte Enterprise-Strukturen (<strong>SAP S/4HANA</strong>, <strong>DATEV</strong>, <strong>PostgreSQL</strong>) unter Einhaltung deutscher Rechtsvorgaben mit null Datenkorruption.',
      fPillLocation: 'Deutschland (Bundesweit umzugsbereit · Vor Ort / Hybrid / Remote)',
      fPillAvail: 'Sofort verfügbar für Festanstellung',
      fAvailLoc: 'Deutschland (Bundesweit umzugsbereit · Vor Ort / Remote)',
      fAvailVisa: 'EU Blue Card berechtigt (§ 18g AufenthG)',
      fPillDegreeText: 'M.Sc. Artificial Intelligence (Anerkannt in Deutschland · Anabin H+)',
      fPillVisaText: 'EU Blue Card berechtigt (§ 18g AufenthG · Sofortige Visa-Förderung)',
      fPillTestsText: '30/30 Verifizierte Testszenarien (tests/verify_haulitz.js)',

      // FAQ Section (100% German)
      faqTagText: 'HÄUFIG GESTELLTE FRAGEN (FAQ)',
      faqHeading: 'Architektur- & Integrationsfragen für Lead Architects',
      faqSubheading: 'Präzise Antworten zu SAP S/4HANA Staging, GoBD-Grundsätzen, cent-genauer Mathematik und DSGVO-Architektur.',
      faqQ1: 'Wie integriert HAULITZ mit bestehenden SAP S/4HANA- oder ERP-Systemen?',
      faqA1: 'HAULITZ fungiert als deterministischer Vor-Staging-Puffer. Eingehende Rechnungen werden vor dem Schreiben in Produktivtabellen validiert. Konforme Belege werden als strukturierte Parameter-Objekte für SAP BAPIs (BAPI_INCOMINGINVOICE_CREATE), IDocs (INVOIC02) oder DATEV-Staging-Tabellen aufbereitet. Fehlerhafte Belege generieren automatisierte Beanstandungsmemos ohne Schema-Mutationen.',
      faqQ2: 'Werden vertrauliche Belegdaten dauerhaft gespeichert oder offengelegt?',
      faqA2: 'Nein. In dieser Referenzarchitektur erfolgt die mathematische Validierung flüchtig im Speicher. Für eine GoBD-konforme Prüfpfaddokumentation werden lediglich kryptografische SHA-256 Hashes und Metadaten festgeschrieben. Vertrauliche Originalbelege verbleiben in der geschützten Kundeninfrastruktur.',
      faqQ3: 'Wie werden deutsche Umsatzsteuersätze und Posten-Arithmetik geprüft?',
      faqA3: 'HAULITZ berechnet alle Posten und USt-Stufen (§ 12 Abs. 1 für 19%, § 12 Abs. 2 für 7% gem. UStG) strikt centgenau über 64-Bit Integer-Arithmetik (BigInt). Kumulierte Rundungsfehler zwischen Zeilenrundung und Summenrundung werden vor der Verbuchung abgeglichen.',
      faqQ4: 'Welche elektronischen Rechnungsformate werden unterstützt?',
      faqA4: 'Unterstützt werden ZUGFeRD 2.2, Factur-X, nationale XRechnung (CII- und UBL-Syntax) sowie strukturierte EDIFACT-Nachrichten. Unstrukturierte PDF-Rechnungen können über vorgelagerte OCR-Gateways eingespeist werden.',
      faqQ5: 'Wo läuft die Ziel-Infrastruktur und wie ist die DSGVO gewährleistet?',
      faqA5: 'Das Frontend dieser Referenzarchitektur wird über Cloudflare Edge ausgeliefert. Die Produktiv-Zielarchitektur ist für private VPC-Deployments in Frankfurt am Main (AWS eu-central-1 / deutsche Rechenzentren) ausgelegt, um volle DSGVO-Datenhoheit und GoBD-Revisionssicherheit zu gewährleisten.',

      // Footer
      footerMissionText: 'Deterministisches Verifikations-Gateway & Open-Source-Referenzarchitektur von Allen Simeon Fletcher. Durchsetzung cent-genauer Mathematik, gesetzlicher USt (§ 12 & § 14 UStG) und GoBD-konformer Prüfpfade vor dem ERP-Zahlungslauf.',
      footerHostText: 'Edge Ingestion Gateway · Ziel-VPC-Architektur Frankfurt am Main (AWS eu-central-1)',
      footerStatusText: 'Alle 10 Workspaces betriebsbereit · 100% deterministische SLA'
    },

    en: {
      langBtn: 'EN',
      cmdKText: 'Search...',
      cmdSearchPlaceholder: 'Search workspaces (e.g. FinTech, Maritime, Supply Chain, Solar)...',

      // Header Brand & Navigation
      headerBrandSubtitle: 'Reference Implementation',
      headerGithubLabel: 'Code & Tests (30/30)',
      btnSealBlock: 'Seal Next Block',
      scActiveTagPrefix: 'Active Workspace:',
      heroScannerLaunchBtn: 'Launch Dedicated Workspace',
      fHeadWorkspaces: '10 Industry Workspaces',
      fHeadArch: 'Architecture & Proof',
      fHeadContact: 'Contact & Legal',
      btnCopyEmail: 'Copy Email',
      btnRequestDossier: 'Request CV Dossier',

      // Hero Section
      heroBadgeText: 'OPEN-SOURCE REFERENCE IMPLEMENTATION · DETERMINISTIC ENGINE',
      heroTitleMain: 'Catch invoice errors and tax overcharges',
      heroTitleGradient: 'before ERP staging.',
      heroSubheadline: 'HAULITZ automatically reconciles line-item rounding, statutory German VAT rates, and bank checksums before payment runs execute in SAP S/4HANA. Cent-exact math. Zero overpayments. Full audit readiness.',
      btnHeroTestText: 'Test Live Ingestion Scanner',
      btnHeroGithubText: 'Inspect GitHub Code & Tests (30/30)',

      // Living Document Scanner Card
      scannerFeedLabel: 'INTERACTIVE VERIFICATION SIMULATOR',
      scannerBtnFlawedText: 'Flawed Invoice',
      scannerBtnVerifiedText: 'HAULITZ Verified',
      scMetaSubVendor: 'Vendor / Partner:',
      scMetaSubChannel: 'Ingestion Channel:',
      scMetaSubNet: 'Subtotal Net:',
      scItemName: 'High-Torque Server Units (12x @ €350.00)',
      scVatLabel: 'Calculated Tax (19% VAT per § 12 Abs. 1 UStG):',
      scGrossLabel: 'Invoice Gross Total:',
      scIbanLabel: 'SEPA IBAN (ISO 7064 MOD 97-10):',
      scIbanStatus: 'Syntax Valid (MOD 97-10)',
      scAlertTitleFlawed: '🚨 PAYMENT RUN HALTED (§ 12 Abs. 1 & § 14 UStG VARIANCE)',
      scAlertDescFlawed: 'Vendor claimed €918.00 VAT instead of statutory €798.00 (+€120.00 discrepancy). ERP staging to SAP S/4HANA blocked. Commercial dispute memo drafted.',
      scAlertTitleVerified: '✔ AUDIT CERTIFIED: AUTHORIZED FOR SAP S/4HANA',
      scAlertDescVerified: 'Line math reconciled to the exact cent (€798.00 VAT / €4,998.00 Gross). Sequential SHA-256 seal assigned for GoBD audit trail.',

      // 10-Industry Workspace Hub
      hubTagText: '10 DOMAIN WORKSPACES',
      hubHeading: 'Built for your specific enterprise workflow',
      hubSubheading: 'Select an industry below to preview deterministic validation rules tailored to your ERP schema.',
      scCardTargetsLabel: 'Interfaces & Targets:',
      directoryLeadHeading: 'All 10 Industry Workspaces at a Glance',
      directoryLeadSub: 'Click any workspace to explore specialized deterministic rule suites and legal standards:',

      // Compliance Ribbon Badges
      badgeGobdLaw: 'GoBD Principles (BMF)',
      badgeGobdDesc: 'Immutability & SHA-256 Audit Trail',
      badgeUstgLaw: '§ 12 & § 14 UStG',
      badgeUstgDesc: '19% / 7% VAT & Mandatory Fields',
      badgeHgbLaw: 'HGB § 377 (Supply Chain)',
      badgeHgbDesc: '3-Way Match (PO vs. Goods Receipt)',
      badgeIbanLaw: 'ISO 7064 MOD 97-10',
      badgeIbanDesc: 'IBAN Syntax & Check Digits',
      badgeDsgvoLaw: 'DSGVO / GDPR',
      badgeDsgvoDesc: 'Frankfurt VPC Reference Architecture',
      erpEcosystemLabel: 'INTERFACES & TARGETS:',

      // Apple / Linear Bento Grid
      bentoTagText: 'CORE ARCHITECTURE & SAFETY BOUNDARIES',
      bentoHeading: 'How HAULITZ protects your business',
      bentoSubheading: 'Four deterministic guardrails running in code before financial data commits to permanent ledgers.',
      bentoMetric1: 'Prevents up to €12,000 in rounding drift per 10k invoices',
      bentoMetric2: 'Prevents misdirected payments & bank reversal fees',
      bentoMetric3: 'Shields ERP tables from corrupted line-items & invalid schema',
      bentoMetric4: 'Fulfills statutory German audit trail immutability (GoBD)',
      bento1Title: 'Per-Line Rounding & Integer Math Guard',
      bento1Desc: 'Enterprise ERP payment runs break when cumulative per-line tax rounding deviates from aggregated net subtotals, or when floating-point conversion drifts across foreign exchange rates. HAULITZ executes all financial math strictly in 64-bit integer cents (BigInt), reconciling line-item rounding differences before staging.',
      bentoFloatHeader: 'Floating-Point Drift',
      bentoCentHeader: 'HAULITZ 64-bit Cent Math',
      bentoFloatCalc: '50 × €0.3781 → 50 × €0.38 = €19.00 (Delta +€0.09)',
      bentoCentCalc: '50 × 199¢ @ 19% = 1890.5¢ → 1891¢ (€18.91)',
      bentoFloatSub: '❌ Compounding Variance Trap',
      bentoCentSub: '✔ Exact Statutory Cent Reconciliation',
      bentoPresetsLabel: 'TEST VALUE PRESETS:',
      btnPreset1: '50 Lines @ €1.99 (19% VAT)',
      btnPreset2: 'Mixed VAT (§ 12 Abs. 1 & 2 UStG)',
      btnPreset3: 'FX Rate (USD to EUR ECB Ref)',
      bento2Title: 'ISO 7064 MOD 97-10 Check Digits',
      bento2Desc: 'Validates international SEPA IBAN check digits strictly via the ISO 7064 MOD 97-10 algorithm before queuing disbursement runs. Catches transposition errors, misplaced characters, and corrupted bank codes prior to EBICS transmission. (Note: Validates check digit integrity; account existence requires directory lookup).',
      bentoIbanMsg: 'Remainder == 1 Validated (ISO 7064 MOD 97-10)',
      bento3Title: 'Pre-Staging ERP Firewall',
      bento3Desc: 'Acts as an automated pre-staging validation buffer. Compliant invoices generate structured payloads ready for SAP S/4HANA (BAPI_INCOMINGINVOICE_CREATE / INVOIC02) and DATEV. Defective invoices generate automated dispute memos before records touch company ledgers.',
      bento4Title: 'Tamper-Evident SHA-256 Audit Trail',
      bento4Desc: 'Every single verification run chains with its predecessor block using SHA-256 and commits to PostgreSQL for GoBD-compliant record immutability (gemäß BMF-Schreiben). Designed for private VPC deployment in Frankfurt (AWS eu-central-1).',

      // Backend Architecture & C# / T-SQL Integration
      codeArchTagText: 'ENTERPRISE BACKEND ARCHITECTURE',
      codeArchHeading: 'C# .NET 8 SDK & Parameterized T-SQL Staging',
      codeArchSubheading: 'Production-ready backend code: Parameterized against SQL injection, strict transactions, and native integration for Microsoft SQL Server and SAP S/4HANA side-car tables.',
      codeTabCSharpText: 'C# .NET 8 Driver',
      codeTabTSQLText: 'Parameterized T-SQL Staging',
      codeTabJsonText: 'ZUGFeRD 2.2 JSON-LD',
      btnCopyCodeText: 'Copy Code',
      terminalQsTitle: 'bash · open-source-quickstart',
      btnCopyTerminalText: 'Copy Command',
      gobdHonestyTitle: 'Transparency Notice: GoBD & System Architecture',
      gobdHonestyText: 'HAULITZ implements the technical principles of the German Federal Ministry of Finance circular (BMF-Schreiben: cent-exact arithmetic, sequential SHA-256 immutable chaining, deterministic re-computation). It is an open-source technical reference architecture, not a commercial standalone software certification. This demo portal runs on the Cloudflare Workers edge; the target production architecture for customer records is designed for private VPC deployments in Frankfurt (AWS eu-central-1) with PostgreSQL Row-Level Security.',

      // Solutions & Integration Engineer Profile
      founderRoleTitle: 'Solutions & Integration Engineer',
      fImpTitle1: 'The Engineering Challenge',
      fImpDesc1: 'Enterprise financial ingestion pipelines halt when incoming vendor documents contain subtle <strong>per-line rounding errors</strong>, statutory <strong>tax rate mismatches</strong>, or malformed bank check digits. Manual reconciliation costs companies thousands of accounting and engineering hours.',
      fImpTitle2: 'The Reference Architecture',
      fImpDesc2: 'I engineered HAULITZ as an open-source technical reference gateway. It validates multi-format vendor payloads (ZUGFeRD 2.2, XRechnung, EDI, PDF) in memory with <strong>64-bit integer cent precision</strong>, isolates <strong>SAP S/4HANA staging tables</strong> from malformed data, and generates GoBD-aligned cryptographic audit trails.',
      fImpTitle3: 'Solutions Engineering Capability',
      fImpDesc3: 'Demonstrates direct capability for <strong>Solutions Engineering</strong>: connecting messy third-party partner inputs into strict core enterprise systems (<strong>SAP S/4HANA</strong>, <strong>DATEV</strong>, <strong>PostgreSQL</strong>) under German statutory requirements with zero data corruption.',
      fPillLocation: 'Germany (Open to Relocation Anywhere in Germany · On-Site / Hybrid / Remote)',
      fPillAvail: 'Available Immediately for Full-Time Roles',
      fAvailLoc: 'Germany (Relocation Anywhere · Remote / On-Site)',
      fAvailVisa: 'EU Blue Card Eligible (§ 18g AufenthG)',
      fPillDegreeText: 'M.Sc. Artificial Intelligence (Degree Recognized in Germany · Anabin H+)',
      fPillVisaText: 'EU Blue Card Eligible (§ 18g AufenthG · Fast-Track Sponsorship)',
      fPillTestsText: '30/30 Verified Scenarios (tests/verify_haulitz.js)',

      // FAQ Section (100% English)
      faqTagText: 'FREQUENTLY ASKED QUESTIONS (FAQ)',
      faqHeading: 'Architecture & Integration FAQs for Lead Architects',
      faqSubheading: 'Direct answers on SAP S/4HANA staging, GoBD principles, cent-exact math, and DSGVO architecture.',
      faqQ1: 'How does HAULITZ integrate with our existing SAP S/4HANA or ERP system?',
      faqA1: 'HAULITZ acts as a deterministic pre-staging validation buffer. Ingested invoices are verified in memory before staging tables receive data. Compliant documents generate clean parameter payloads for SAP BAPIs (BAPI_INCOMINGINVOICE_CREATE), IDocs (INVOIC02), or DATEV staging schemas. Erroneous documents generate automated dispute memos without schema mutation.',
      faqQ2: 'Does HAULITZ store or expose our confidential supplier invoices?',
      faqA2: 'No. In this reference implementation, validation executes ephemerally in memory within the client runtime. For GoBD audit trail documentation, only cryptographic SHA-256 seal hashes and validation receipts are committed to the audit ledger. Raw confidential supplier documents remain strictly inside customer-controlled infrastructure.',
      faqQ3: 'How are German statutory VAT rates and line-item math audited?',
      faqA3: 'HAULITZ calculates all subtotals, quantity multipliers, and statutory tax tiers (§ 12 Abs. 1 for 19% standard, § 12 Abs. 2 for 7% reduced per UStG) strictly to the exact cent using 64-bit integer arithmetic (BigInt). Cumulative variances between per-line rounding and subtotal rounding are reconciled prior to posting.',
      faqQ4: 'Which electronic invoice standards are supported?',
      faqA4: 'HAULITZ supports German and European electronic formats, including ZUGFeRD 2.2 (Comfort and Extended profiles), Factur-X, national German XRechnung (CII and UBL XML syntax), and structured EDIFACT messages. Unstructured scanned PDFs can be ingested via upstream OCR gateways.',
      faqQ5: 'Where is the target infrastructure hosted and is it GDPR-compliant?',
      faqA5: 'The frontend of this reference architecture is served globally via Cloudflare Edge. The enterprise production target is designed for deployment into private VPC clusters in Frankfurt am Main (AWS eu-central-1 / sovereign EU clouds) under strict DSGVO / GDPR data residency and GoBD audit compliance.',

      // Footer
      footerMissionText: 'Deterministic enterprise verification gateway & open-source reference implementation engineered by Allen Simeon Fletcher. Demonstrates cent-exact math, German statutory VAT tiers (§ 12 & § 14 UStG), and GoBD-aligned cryptographic audit trails before ERP staging.',
      footerHostText: 'Edge Ingestion Gateway · Target VPC Architecture Frankfurt (AWS eu-central-1)',
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
      
      toast: document.getElementById('toast-notification'),
      toastMessage: document.getElementById('toast-message'),
      toastIcon: document.getElementById('toast-icon')
    };
  }

  /**
   * 1. Initialize Lenis Smooth Inertial Scrolling
   */
  function initLenis() {
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return; // Respect accessibility reduced motion setting
    }
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
   * 2. Domain Workspace Mapping & Deep Link Handling
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
    DOM.toast.style.display = 'flex';
    DOM.toast.classList.add('show');
    setTimeout(() => {
      DOM.toast.classList.remove('show');
      setTimeout(() => {
        if (DOM.toast && !DOM.toast.classList.contains('show')) {
          DOM.toast.style.display = 'none';
        }
      }, 350);
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

    // Header Brand & Search Bar
    setElemText('header-brand-subtitle', dict.headerBrandSubtitle);
    setElemText('header-github-label', dict.headerGithubLabel);
    setElemText('cmd-k-text', dict.cmdKText);
    const cmdInput = document.getElementById('command-search-input');
    if (cmdInput && dict.cmdSearchPlaceholder) cmdInput.placeholder = dict.cmdSearchPlaceholder;

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

    // Statutory Compliance Ribbon
    setElemText('badge-gobd-law', dict.badgeGobdLaw);
    setElemText('badge-gobd-desc', dict.badgeGobdDesc);
    setElemText('badge-ustg-law', dict.badgeUstgLaw);
    setElemText('badge-ustg-desc', dict.badgeUstgDesc);
    setElemText('badge-hgb-law', dict.badgeHgbLaw);
    setElemText('badge-hgb-desc', dict.badgeHgbDesc);
    setElemText('badge-iban-law', dict.badgeIbanLaw);
    setElemText('badge-iban-desc', dict.badgeIbanDesc);
    setElemText('badge-dsgvo-law', dict.badgeDsgvoLaw);
    setElemText('badge-dsgvo-desc', dict.badgeDsgvoDesc);
    setElemText('erp-ecosystem-label', dict.erpEcosystemLabel);

    // Workspace Hub
    setElemText('hub-tag-text', dict.hubTagText);
    setElemText('hub-heading', dict.hubHeading);
    setElemText('hub-subheading', dict.hubSubheading);
    setElemText('sc-card-targets-label', dict.scCardTargetsLabel);
    setElemText('directory-lead-heading', dict.directoryLeadHeading);
    setElemText('directory-lead-sub', dict.directoryLeadSub);

    // Bento Grid
    setElemText('bento-tag-text', dict.bentoTagText);
    setElemText('bento-heading', dict.bentoHeading);
    setElemText('bento-subheading', dict.bentoSubheading);
    setElemText('bento-metric-1', dict.bentoMetric1);
    setElemText('bento-metric-2', dict.bentoMetric2);
    setElemText('bento-metric-3', dict.bentoMetric3);
    setElemText('bento-metric-4', dict.bentoMetric4);
    setElemText('bento-1-title', dict.bento1Title);
    setElemText('bento-1-desc', dict.bento1Desc);
    setElemText('bento-float-header', dict.bentoFloatHeader);
    setElemText('bento-cent-header', dict.bentoCentHeader);
    setElemText('bento-float-calc', dict.bentoFloatCalc);
    setElemText('bento-cent-calc', dict.bentoCentCalc);
    setElemText('bento-float-sub', dict.bentoFloatSub);
    setElemText('bento-cent-sub', dict.bentoCentSub);
    setElemText('bento-presets-label', dict.bentoPresetsLabel);
    setElemText('btn-preset-1', dict.btnPreset1);
    setElemText('btn-preset-2', dict.btnPreset2);
    setElemText('btn-preset-3', dict.btnPreset3);
    setElemText('bento-2-title', dict.bento2Title);
    setElemText('bento-2-desc', dict.bento2Desc);
    setElemText('bento-iban-msg', dict.bentoIbanMsg);
    setElemText('bento-3-title', dict.bento3Title);
    setElemText('bento-3-desc', dict.bento3Desc);
    setElemText('bento-4-title', dict.bento4Title);
    setElemText('bento-4-desc', dict.bento4Desc);

    // Backend Architecture & C# / T-SQL Integration
    setElemText('code-arch-tag-text', dict.codeArchTagText);
    setElemText('code-arch-heading', dict.codeArchHeading);
    setElemText('code-arch-subheading', dict.codeArchSubheading);
    setElemText('code-tab-csharp-text', dict.codeTabCSharpText);
    setElemText('code-tab-tsql-text', dict.codeTabTSQLText);
    setElemText('code-tab-json-text', dict.codeTabJsonText);
    setElemText('btn-copy-code-text', dict.btnCopyCodeText);
    setElemText('terminal-qs-title', dict.terminalQsTitle);
    setElemText('btn-copy-terminal-text', dict.btnCopyTerminalText);
    setElemText('gobd-honesty-title', dict.gobdHonestyTitle);
    setElemText('gobd-honesty-text', dict.gobdHonestyText);

    // Solutions & Integration Engineer Profile
    setElemText('founder-role-title', dict.founderRoleTitle);
    setElemText('f-pill-location-text', dict.fPillLocation);
    setElemText('f-pill-avail-text', dict.fPillAvail);
    setElemText('f-avail-loc', dict.fAvailLoc);
    setElemText('f-avail-visa', dict.fAvailVisa);
    setElemText('f-pill-degree-text', dict.fPillDegreeText);
    setElemText('f-pill-visa-text', dict.fPillVisaText);
    setElemText('f-pill-tests-text', dict.fPillTestsText);
    setElemText('f-imp-title-1', dict.fImpTitle1);
    setElemHTML('f-imp-desc-1', dict.fImpDesc1);
    setElemText('f-imp-title-2', dict.fImpTitle2);
    setElemHTML('f-imp-desc-2', dict.fImpDesc2);
    setElemText('f-imp-title-3', dict.fImpTitle3);
    setElemHTML('f-imp-desc-3', dict.fImpDesc3);

    // FAQ Section (Strict 100% Locale Hydration)
    setElemText('faq-tag-text', dict.faqTagText);
    setElemText('faq-heading', dict.faqHeading);
    setElemText('faq-subheading', dict.faqSubheading);
    setElemText('faq-q-1', dict.faqQ1);
    setElemText('faq-a-1', dict.faqA1);
    setElemText('faq-q-2', dict.faqQ2);
    setElemText('faq-a-2', dict.faqA2);
    setElemText('faq-q-3', dict.faqQ3);
    setElemText('faq-a-3', dict.faqA3);
    setElemText('faq-q-4', dict.faqQ4);
    setElemText('faq-a-4', dict.faqA4);
    setElemText('faq-q-5', dict.faqQ5);
    setElemText('faq-a-5', dict.faqA5);

    // Footer & Interactive Actions
    setElemText('footer-mission-text', dict.footerMissionText);
    setElemText('footer-host-text', dict.footerHostText);
    setElemText('footer-status-text', dict.footerStatusText);
    setElemText('f-head-workspaces', dict.fHeadWorkspaces);
    setElemText('f-head-arch', dict.fHeadArch);
    setElemText('f-head-contact', dict.fHeadContact);
    setElemText('sc-active-tag-prefix', dict.scActiveTagPrefix);
    setElemHTML('hero-scanner-launch-btn', `<span>${dict.heroScannerLaunchBtn}</span> <i class="fa-solid fa-arrow-right"></i>`);
    setElemHTML('btn-seal-block', `<i class="fa-solid fa-plus-circle text-emerald"></i> <span>${dict.btnSealBlock}</span>`);
    setElemHTML('btn-copy-email', `<i class="fa-regular fa-copy"></i> <span>${dict.btnCopyEmail}</span>`);
    setElemHTML('btn-request-dossier', `<i class="fa-solid fa-file-arrow-down text-emerald"></i> <span>${dict.btnRequestDossier}</span>`);

    updateThemeUI();

    if (typeof updateScannerDisplay === 'function') {
      updateScannerDisplay(state.currentScannerDomain, state.currentScannerMode);
    }
    if (typeof updateShowcaseGlobal === 'function') {
      updateShowcaseGlobal(state.currentScannerDomain);
    }
  }

  /**
   * 7. Cursor Spotlight Tracking on Interactive Cards
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
        vatLabel: 'Berechnete USt (19% gem. § 12 Abs. 1 UStG):',
        grossLabel: 'Rechnungsgesamtbetrag:',
        ruleLabel: 'SEPA IBAN (ISO 7064 MOD 97-10):',
        ruleStatus: 'Syntax gültig (MOD 97-10)',
        flawedTag: '⚠ +€120,00 zu viel berechnet',
        flawedVat: '€918,00',
        flawedGross: '€5.118,00',
        flawedTitle: '🚨 ZAHLUNGSLAUF GESTOPPT (§ 12 Abs. 1 & § 14 UStG ABWEICHUNG)',
        flawedDesc: 'Lieferant berechnet 19% USt mit €918,00 statt gesetzlich €798,00 (+€120,00 Differenz). Verbuchung in SAP S/4HANA blockiert. Kaufmännische Beanstandung generiert.',
        verifiedTag: '<i class="fa-solid fa-check"></i> Cent-genau abgeglichen',
        verifiedVat: '€798,00',
        verifiedGross: '€4.998,00',
        verifiedTitle: '✔ AUDIT-FREIGABE: BEREIT FÜR SAP S/4HANA',
        verifiedDesc: 'Posten-Arithmetik auf den Cent korrigiert (€798,00 USt / €4.998,00 Gesamtbetrag). Sequenzieller SHA-256 Prüfblock für GoBD-Prüfpfad versiegelt.'
      },
      en: {
        activeName: 'FinTech & Invoicing',
        net: '€4,200.00',
        itemName: 'High-Torque Server Units (12x @ €350.00)',
        itemVal: '€4,200.00',
        vatLabel: 'Calculated Tax (19% VAT per § 12 Abs. 1 UStG):',
        grossLabel: 'Invoice Gross Total:',
        ruleLabel: 'SEPA IBAN (ISO 7064 MOD 97-10):',
        ruleStatus: 'Syntax Valid (MOD 97-10)',
        flawedTag: '⚠ +€120.00 Overcharge',
        flawedVat: '€918.00',
        flawedGross: '€5,118.00',
        flawedTitle: '🚨 PAYMENT RUN HALTED (§ 12 Abs. 1 & § 14 UStG VARIANCE)',
        flawedDesc: 'Vendor claimed €918.00 VAT instead of statutory €798.00 (+€120.00 discrepancy). ERP staging to SAP S/4HANA blocked. Commercial dispute memo drafted.',
        verifiedTag: '<i class="fa-solid fa-check"></i> Exact Cent Reconciled',
        verifiedVat: '€798.00',
        verifiedGross: '€4,998.00',
        verifiedTitle: '✔ AUDIT CERTIFIED: AUTHORIZED FOR SAP S/4HANA',
        verifiedDesc: 'Line math reconciled to the exact cent (€798.00 VAT / €4,998.00 Gross). Sequential SHA-256 seal assigned for GoBD audit trail.'
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
      if (btnFlawed) {
        btnFlawed.classList.add('active');
        btnFlawed.setAttribute('aria-selected', 'true');
        btnFlawed.setAttribute('aria-pressed', 'true');
      }
      if (btnVerified) {
        btnVerified.classList.remove('active');
        btnVerified.setAttribute('aria-selected', 'false');
        btnVerified.setAttribute('aria-pressed', 'false');
      }
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
      if (btnVerified) {
        btnVerified.classList.add('active');
        btnVerified.setAttribute('aria-selected', 'true');
        btnVerified.setAttribute('aria-pressed', 'true');
      }
      if (btnFlawed) {
        btnFlawed.classList.remove('active');
        btnFlawed.setAttribute('aria-selected', 'false');
        btnFlawed.setAttribute('aria-pressed', 'false');
      }
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
      if (scDocType) scDocType.textContent = state.currentLang === 'de' ? (d.germanDocumentType || d.documentType) : d.documentType;
      if (scBadgeText) scBadgeText.textContent = d.law;
      if (scDesc) scDesc.textContent = state.currentLang === 'de' ? (d.germanDescription || d.description) : d.description;
      if (scTargets) scTargets.textContent = `${d.targetEmployers} • SAP S/4HANA`;

      const rulesToRender = (state.currentLang === 'de' && Array.isArray(d.germanRules)) ? d.germanRules : d.rules;
      if (scRules && Array.isArray(rulesToRender)) {
        scRules.innerHTML = rulesToRender.map(r => `
          <div class="showcase-rule-item">
            <i class="fa-solid fa-circle-check" aria-hidden="true"></i>
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

      // Sync active state and ARIA selection in both pill docks
      dockPills.forEach(p => {
        const isActive = p.getAttribute('data-domain') === domainKey;
        p.classList.toggle('active', isActive);
        p.setAttribute('aria-selected', isActive ? 'true' : 'false');
      });
      topDockPills.forEach(p => {
        const isActive = p.getAttribute('data-domain') === domainKey;
        p.classList.toggle('active', isActive);
        p.setAttribute('aria-selected', isActive ? 'true' : 'false');
      });
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
      input.value = input.value.replace(/[^A-Za-z0-9 ]/g, '').toUpperCase();
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
        float: '50 × €0.3781 → 50 × €0.38 = €19.00 (Delta +€0.09)',
        cent: '50 × 199¢ @ 19% = 1890.5¢ → 1891¢ (€18.91)'
      },
      '2': {
        float: '120.00 € @ 19% + 80.00 € @ 7% = 28.40 € (Unverified Split)',
        cent: '12000¢ @ 19% (2280¢) + 8000¢ @ 7% (560¢) = 2840¢ (€28.40)'
      },
      '3': {
        float: '$4,250.00 ÷ 1.0842 = €3,919.9409693... (Float Drift)',
        cent: '425000¢ × 10000 / 10842 = 391994¢ (€3,919.94 Exact)'
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

  /**
   * 30. Enterprise Backend Code Viewer & Terminal Quickstart Controller
   */
  function initCodeViewer() {
    const tabBtns = document.querySelectorAll('.code-tab-btn');
    const panels = {
      csharp: document.getElementById('panel-csharp'),
      tsql: document.getElementById('panel-tsql'),
      jsonld: document.getElementById('panel-jsonld')
    };

    let activeTab = 'csharp';

    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const targetTab = btn.getAttribute('data-tab');
        if (!targetTab || !panels[targetTab]) return;

        tabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        Object.keys(panels).forEach(key => {
          if (panels[key]) {
            panels[key].style.display = key === targetTab ? 'block' : 'none';
            if (key === targetTab) {
              panels[key].classList.add('active');
            } else {
              panels[key].classList.remove('active');
            }
          }
        });

        activeTab = targetTab;
      });
    });

    // Copy active code block
    const copyCodeBtn = document.getElementById('btn-copy-code');
    if (copyCodeBtn) {
      copyCodeBtn.addEventListener('click', async () => {
        const activePanel = panels[activeTab];
        const codeElem = activePanel ? activePanel.querySelector('code') : null;
        if (codeElem) {
          const textToCopy = codeElem.textContent;
          try {
            await navigator.clipboard.writeText(textToCopy);
            showToast(state.currentLang === 'de' ? 'Code in Zwischenablage kopiert!' : 'Code copied to clipboard!');
          } catch (err) {
            showToast(state.currentLang === 'de' ? 'Kopieren fehlgeschlagen.' : 'Copy failed.', true);
          }
        }
      });
    }

    // Copy terminal quickstart command
    const copyTerminalBtn = document.getElementById('btn-copy-terminal');
    if (copyTerminalBtn) {
      copyTerminalBtn.addEventListener('click', async () => {
        const cmd = 'git clone https://github.com/AllenFletcherAI/Haulitz.git && cd Haulitz && npm test';
        try {
          await navigator.clipboard.writeText(cmd);
          showToast(state.currentLang === 'de' ? 'Terminal-Befehl kopiert!' : 'Terminal command copied!');
        } catch (err) {
          showToast(state.currentLang === 'de' ? 'Kopieren fehlgeschlagen.' : 'Copy failed.', true);
        }
      });
    }
  }

  // Master Initialization Engine
  function boot() {
    initDOMElements();
    initLenis();
    applyLanguageUI();
    setupEventListeners();
    handleHashNavigation();
    initSpotlightTracking();
    initCommandPalette();
    initHeroScanner();
    initWorkspaceDock();
    initCopyEmail();
    initBentoIbanValidator();
    initBentoHashSealer();
    initFaqAccordion();
    initBentoCentPresets();
    initCodeViewer();
    initLegalModals();
    initBackToTop();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }

})();

