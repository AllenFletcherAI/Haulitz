/**
 * HAULITZ ENTERPRISE REGISTRY - 10 TARGET INDUSTRY DOMAINS
 * Standard: ASD-STE100 Simplified Technical English
 */

(function(global) {
  'use strict';

  const Domains = {
    fintech: {
      id: 'fintech',
      number: '01',
      title: 'FinTech & Corporate Invoicing',
      germanTitle: 'FinTech & Rechnungsprüfung',
      targetEmployers: 'Pleo, Moss, Billie, Personio, Taxfix',
      documentType: 'Incoming Vendor Tax Invoice (PDF/XML)',
      icon: 'fa-file-invoice-dollar',
      color: '#059669',
      law: '§ 14 UStG, GoBD § 147 AO, SEPA ISO 7064',
      description: 'Validates line-item math, statutory German VAT (19%/7%), and SEPA IBAN checksums to prevent overpayment and ensure tax compliance.',
      rules: [
        'Line-item arithmetic: Quantity * Unit Price = Total',
        'German statutory VAT calculation (19% standard, 7% reduced)',
        'SEPA IBAN Modulo-97 checksum validation',
        'Sequential SHA-256 seal chaining for GoBD § 147 AO compliance'
      ]
    },
    logistics: {
      id: 'logistics',
      number: '02',
      title: 'Freight & Maritime Logistics',
      germanTitle: 'Seefracht & Zolldokumentation',
      targetEmployers: 'DB Schenker, DHL Global Forwarding, Forto, Kuehne+Nagel',
      documentType: 'Ocean Bill of Lading & Packing List',
      icon: 'fa-ship',
      color: '#0284C7',
      law: 'ADSp 2017 Ziff. 19, § 412 HGB, ISO 6346, SOLAS VGM',
      description: 'Checks ISO 6346 Modulo-11 container check digits and Gross vs Net mass consistency to prevent port demurrage fees (€150–€350/day).',
      rules: [
        'ISO 6346 Modulo-11 container identification checksum',
        'Mass law verification: Gross Mass >= Net Mass (§ 412 HGB)',
        'SOLAS Verified Gross Mass (VGM) declared tolerance check',
        'Incoterms 2020 delivery clause consistency'
      ]
    },
    supply: {
      id: 'supply',
      number: '03',
      title: 'Supply Chain & Manufacturing',
      germanTitle: 'Industrie & Dreiseitiger Abgleich',
      targetEmployers: 'Siemens, Bosch Mittelstand, Festo, Schaeffler',
      documentType: '3-Way Triad: Purchase Order, Delivery Note, Invoice',
      icon: 'fa-industry',
      color: '#D97706',
      law: 'HGB § 377 Rügeobliegenheit, DIN EN ISO 9001',
      description: 'Three-way cross-reconciliation across Purchase Order, Delivery Receipt, and Commercial Invoice to block overbilling for short shipments.',
      rules: [
        'SKU equality across PO, Goods Receipt, and Invoice',
        'Quantity check: Invoiced Quantity <= Received Quantity',
        'Price cap enforcement: Invoiced Price <= Agreed PO Price',
        'Automated short-shipment rügeobliegenheit notice generation'
      ]
    },
    insurtech: {
      id: 'insurtech',
      number: '04',
      title: 'InsurTech & Claims Processing',
      germanTitle: 'Versicherung & Werkstattprüfung',
      targetEmployers: 'Allianz, Munich Re, wefox, Clark, ERGO',
      documentType: 'Vehicle Repair Estimate & Workshop Bill',
      icon: 'fa-shield-halved',
      color: '#7C3AED',
      law: 'VVG § 86, BGB § 249, BGH VI ZR 53/09',
      description: 'Audits repair workshop labor rates against regional benchmarks and contractual policy caps to enforce insurer subrogation.',
      rules: [
        'Hourly labor rate ceiling verification against regional benchmark',
        'Spare parts catalog price list matching',
        'Contractual deductible (Selbstbeteiligung) subtraction',
        'Automated subrogation claim memo generation'
      ]
    },
    legaltech: {
      id: 'legaltech',
      number: '05',
      title: 'LegalTech & Regulatory Contracts',
      germanTitle: 'Lieferkettensorgfaltspflicht (LkSG)',
      targetEmployers: 'BRYTER, Knowalia, Noerr, Corporate Legal Ops',
      documentType: 'Supplier Self-Declaration & ESG Audit Dossier',
      icon: 'fa-scale-balanced',
      color: '#DC2626',
      law: 'LkSG § 4–§ 7, EU CSDDD, ISO 14001 / SA 8000',
      description: 'Audits Tier-1 supplier ESG and environmental certifications against German Supply Chain Act mandates to block uncertified suppliers.',
      rules: [
        'Mandatory ISO 14001 / SA 8000 certification validity period',
        'Statutory human rights code of conduct clause verification',
        'Supplier risk classification and audit cycle adherence',
        'Automated LkSG non-compliance quarantine notification'
      ]
    },
    healthtech: {
      id: 'healthtech',
      number: '06',
      title: 'HealthTech & Medical Admin',
      germanTitle: 'Privatärztliche Abrechnung (GOÄ)',
      targetEmployers: 'CompuGroup Medical, Doctolib, Dedalus, Medatixx',
      documentType: 'Statutory Private Medical Invoice (GOÄ-Liquidation)',
      icon: 'fa-hospital-user',
      color: '#0D9488',
      law: 'GOÄ § 5 Abs. 2, § 12 Abs. 3, BÄK-Richtlinien',
      description: 'Verifies medical fee schedule multipliers against legal ceilings, rejecting unjustified 3.5x billing without doctor justification.',
      rules: [
        'Standard multiplier threshold (max 2.3x standard rate)',
        'Written justification mandate for extended multipliers (2.3x–3.5x)',
        'Automatic rejection of fees exceeding legal maximum (3.5x)',
        'Approved GOÄ reimbursement calculation'
      ]
    },
    ecommerce: {
      id: 'ecommerce',
      number: '07',
      title: 'E-Commerce & Retail Operations',
      germanTitle: 'Handel & WMS-Wareneingang',
      targetEmployers: 'Zalando, Otto Group, Tradebyte, About You',
      documentType: 'Marketplace Inbound Shipment ASN & Barcode Feed',
      icon: 'fa-cart-shopping',
      color: '#EA580C',
      law: 'GS1 General Specifications, EAN-13 Modulo-10',
      description: 'Scans inbound ASN shipments for corrupted EAN-13 barcodes and currency discrepancies before warehouse putaway.',
      rules: [
        'EAN-13 / GTIN-13 Modulo-10 barcode checksum validation',
        'Multi-currency foreign exchange cross-rate consistency',
        'SKU packaging hierarchy (Piece, Box, Pallet) verification',
        'Warehouse putaway quarantine to prevent inventory loss'
      ]
    },
    cleantech: {
      id: 'cleantech',
      number: '08',
      title: 'CleanTech & Renewable Energy',
      germanTitle: 'Erneuerbare Energien & Netzanschluss',
      targetEmployers: '1Komma5°, Enpal, EnBW, SMA Solar, Sonnen',
      documentType: 'Grid Connection Application & Inverter Spec Sheet',
      icon: 'fa-bolt',
      color: '#16A34A',
      law: 'VDE-AR-N 4105, EEG § 9, TAB Niederspannung',
      description: 'Calculates electrical kW string capacity and ensures inverter peak output does not exceed the local utility grid connection allowance.',
      rules: [
        'DC-to-AC electrical kW string calculation (Volts * Amps = Watts)',
        'Inverter peak output ceiling vs utility grid service cap',
        'VDE-AR-N 4105 low-voltage grid conformity check',
        'Automated grid objection memo for field installation engineers'
      ]
    },
    proptech: {
      id: 'proptech',
      number: '09',
      title: 'PropTech & Real Estate',
      germanTitle: 'Immobilien & Nebenkostenabrechnung',
      targetEmployers: 'Vonovia, Scout24, immowelt, Aareon, LEG',
      documentType: 'Annual Utility Statement (Nebenkostenabrechnung)',
      icon: 'fa-building',
      color: '#2563EB',
      law: 'HeizkostenV § 7 & § 12, BGB § 556, BetrKV',
      description: 'Audits heating and utility statements against German HeizkostenV, catching illegal 50/50 splits and asserting the tenant 15% reduction right.',
      rules: [
        'Square-meter apportionment calculation (Tenant m² / Building m²)',
        'Statutory 70/30 consumption-to-area split enforcement (HeizkostenV § 7)',
        'Identification of illegal 50/50 cost allocations',
        'Tenant right-of-reduction (15% Kürzungsrecht gem. § 12 HeizkostenV)'
      ]
    },
    erp: {
      id: 'erp',
      number: '10',
      title: 'Enterprise ERP & IT Consulting',
      germanTitle: 'ERP-Staging & IT-Consulting',
      targetEmployers: 'Accenture, Capgemini, msg systems, SAP Partner Ecosystem',
      documentType: 'Multi-Source Legacy Ingestion Payload (JSON / EDIFACT)',
      icon: 'fa-database',
      color: '#4F46E5',
      law: 'BSI IT-Grundschutz, OWASP ASVS, SAP S/4HANA Staging Spec',
      description: 'Sanitizes raw payloads against SQL injection, validates referential integrity, and emits parameterized T-SQL and C# .NET 8 code.',
      rules: [
        'Strict payload schema typing and meta-character sanitization',
        'Referential foreign key integrity check against master ledgers',
        'Zero raw string concatenation (Parameterized T-SQL enforcement)',
        'C# .NET 8 SDK client driver generation with transaction wrapping'
      ]
    }
  };

  // Expose to browser window or CommonJS
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = Domains;
  } else {
    global.Haulitz = global.Haulitz || {};
    global.Haulitz.Domains = Domains;
  }
})(typeof window !== 'undefined' ? window : globalThis);
