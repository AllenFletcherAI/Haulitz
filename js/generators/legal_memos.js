/**
 * HAULITZ ENTERPRISE GENERATOR - GERMAN STATUTORY LEGAL DISPUTE NOTICES
 * Standard: ASD-STE100 Simplified Technical English
 * 
 * Auto-drafts formal, legally binding German commercial letters citing statutory paragraphs:
 * - ADSp 2017 Ziff. 19 & § 412 HGB (Logistics mass & container discrepancy)
 * - § 14 UStG & GoBD § 147 AO (Statutory VAT correction demand)
 * - § 377 HGB (Commercial short-shipment rügeobliegenheit)
 * - § 86 VVG & § 249 BGB (Insurance workshop billing reduction)
 * - § 7 LkSG (Supply chain due diligence audit breach)
 * - § 12 GOÄ (Statutory medical fee reduction)
 * - § 7 / § 12 HeizkostenV (Heating ordinance billing correction)
 */

(function(global) {
  'use strict';

  const LegalMemos = {};

  function formatDate(d) {
    const date = d ? new Date(d) : new Date();
    return date.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' });
  }

  /**
   * Domain 01: FinTech & Invoicing VAT Correction Memo (§ 14 UStG)
   */
  LegalMemos.generateVATNotice = function(doc, audit) {
    const today = formatDate();
    const invNo = doc.invoiceNumber || 'INV-UNKNOWN';
    const supplier = doc.supplierName || 'Rechnungsaussteller';
    const delta = audit.taxDelta ? Math.abs(audit.taxDelta).toFixed(2) : '0.00';

    return `FORMELLE RECHNUNGSRÜGE & KORREKTURAUFFORDERUNG GEMÄSS § 14 UStG
--------------------------------------------------------------------------------
Datum: ${today}
Empfänger: ${supplier}
Rechnungsnummer: ${invNo}
Betreff: Unrichtiger Steuerausweis / Rechnungsabweichung gem. § 14 Abs. 4 UStG i.V.m. GoBD

Sehr geehrte Damen und Herren,

bei der revisionssicheren Eingangsprüfung der vorbezeichneten Rechnung durch das Haulitz Verification Gateway wurde eine rechnerische Diskrepanz festgestellt:

- Ausgewiesene Umsatzsteuer: € ${parseFloat(audit.declaredTax || doc.taxAmount || 0).toFixed(2)}
- Gesetzlich ermittelte Steuer (19%): € ${parseFloat(audit.expectedTax || 0).toFixed(2)}
- Festgestellte steuerliche Differenz: € ${delta} EUR

RECHTLICHE WÜRDIGUNG:
Gemäß § 14 Abs. 4 Nr. 8 UStG ist der gesonderte Ausweis des auf das Entgelt entfallenden Steuerbetrags zwingende Voraussetzung für den Vorsteuerabzug (§ 15 Abs. 1 Nr. 1 UStG). Ein fehlerhafter Steuerausweis gefährdet die Ordnungsmäßigkeit unserer Buchführung gemäß GoBD § 147 AO.

MASSNAHME:
1. Die Rechnung ${invNo} wurde im ERP-System mit einer automatischen Zahlsperre (HOLD_PAYMENT) belegt.
2. Wir fordern Sie hiermit auf, unverzüglich eine korrigierte Rechnung mit zutreffendem Steuerausweis gem. § 14c Abs. 1 UStG bzw. eine Stornorechnung mit Neuausstellung zu übermitteln.

Mit freundlichen Grüßen,
Haulitz Gateway Financial Audit Department`;
  };

  /**
   * Domain 02: Maritime & Freight Logistics Discrepancy Memo (ADSp 2017 & § 412 HGB)
   */
  LegalMemos.generateADSpNotice = function(doc, audit) {
    const today = formatDate();
    const bol = doc.bolNumber || doc.referenceNumber || 'BOL-UNKNOWN';
    const container = doc.containerNumber || 'N/A';
    const reason = audit.checksumValid === false
      ? `Fehlerhafte Containerprüfziffer nach ISO 6346 (Ist: ${audit.declaredDigit}, Erwartet: ${audit.calculatedDigit})`
      : `Massendiskrepanz gem. § 412 HGB (Bruttomasse ${doc.grossWeightKg} kg < Nettomasse ${doc.netWeightKg} kg)`;

    return `FORMELLE HAFTUNGSRÜGE / DISCREPANCY MEMO GEMÄSS ADSp 2017 ZIFF. 19 & § 412 HGB
--------------------------------------------------------------------------------
Datum: ${today}
Vorgangsnummer: ${bol}
Container-Identifikation: ${container}
Bezug: Vorabprüfung Seefracht-Dokumentation vor ATLAS 9.1 Zollanmeldung

Sehr geehrte Damen und Herren,

im Rahmen der automatisierten Vorabprüfung der Frachtpapiere für Sendung ${bol} wurde eine kritische Nicht-Konformität festgestellt:

Beanstandungsgrund:
${reason}

RECHTLICHE RELEVANZ:
1. Gemäß § 412 Abs. 1 HGB sowie SOLAS Chapter VI Regulation 2 (VGM) haftet der Absender für die Richtigkeit der Gewichts- und Identifikationsangaben.
2. Gemäß Ziffer 19 der Allgemeinen Deutschen Spediteurbedingungen (ADSp 2017) ist der Spediteur berechtigt, unrichtig deklarierte Ladungsgüter vor Terminal-Gate-In zu sperren.

ABWEHR VON STANDGELDERN (DEMURRAGE & DETENTION):
Um drohende Standgeldkosten in Höhe von € 150,00 bis € 350,00 pro Tag im Seehafen Terminal Hamburg/Rotterdam abzuwenden, wurde der Container ${container} in den Status QUARANTINE_HOLD versetzt. Eine Zoll-Vorabanmeldung (ATLAS) wird bis zur Vorlage korrigierter Frachtbriefe ausgesetzt.

Mit freundlichen Grüßen,
Haulitz Gateway Maritime Dispatch Control`;
  };

  /**
   * Domain 03: Supply Chain & Manufacturing 3-Way Short Shipment Notice (§ 377 HGB)
   */
  LegalMemos.generateSupplyNotice = function(po, del, inv, audit) {
    const today = formatDate();
    const issues = (audit.discrepancies || []).map(d => ` - ${d}`).join('\n');

    return `MÄNGELRÜGE GEMÄSS § 377 HGB (DREISEITIGE ABSTIMMUNG PO / LIEFERSCHEIN / RECHNUNG)
--------------------------------------------------------------------------------
Datum: ${today}
Bestellnummer (PO): ${po.poNumber}
Lieferschein: ${del.deliveryNumber}
Rechnungsnummer: ${inv.invoiceNumber}
Lieferant: ${po.supplier}

Sehr geehrte Damen und Herren,

gemäß § 377 Handelsgesetzbuch (HGB) zeigen wir Ihnen hiermit unverzüglich nach Wareneingang und Prüfung folgende Diskrepanzen an:

FESTGESTELLTE ABWEICHUNGEN:
${issues}

RECHTSFOLGEN:
1. Eine Freigabe der Rechnung ${inv.invoiceNumber} zur Auszahlung wird insoweit verweigert, als Waren berechnet wurden, die laut Lieferschein nicht oder zu einem überhöhten Stückpreis angedient wurden.
2. Wir fordern Sie auf, binnen 7 Werktagen eine Rechnungskorrektur über den überschießenden Betrag einzureichen.

Mit freundlichen Grüßen,
Haulitz Gateway Procurement Operations`;
  };

  /**
   * Domain 04: InsurTech Claims Cost Reduction Memo (VVG § 86 & BGB § 249)
   */
  LegalMemos.generateInsurtechNotice = function(doc, audit) {
    const today = formatDate();
    return `KÜRZUNGSBERICHT ZUR WERKSTATTRECHNUNG GEMÄSS § 249 BGB I.V.M. VVG § 86
--------------------------------------------------------------------------------
Datum: ${today}
Schaden-Referenz: ${doc.claimNumber || 'CLM-100293'}
Werkstatt / Reparaturbetrieb: ${doc.repairShop || 'Autohaus Karosserie GmbH'}
Fahrzeug: ${doc.vehicleVin || 'WVWZZZ3CZWE120934'}

FESTSTELLUNG DER ÜBERHÖHTEN STUNDENVERRECHNUNGSSÄTZE:
Im Rahmen der automatisierten Belegprüfung wurden die in Rechnung gestellten Stundenverrechnungssätze mit den regionalen DEKRA/DAT-Richtwerten sowie den vertraglichen Tarifkonditionen abgeglichen:

- Abgerechneter Stundensatz Mechanik/Karosserie: € ${doc.billedHourlyRate || '185.00'} / Std.
- Maximal erstattungsfähiger Satz: € ${doc.approvedHourlyRate || '140.00'} / Std.
- Kürzungsbetrag: € ${audit.totalOvercharge || '225.00'} EUR

BEGRÜNDUNG:
Nach ständiger Rechtsprechung des Bundesgerichtshofs (u.a. BGH VI ZR 53/09) ist der Geschädigte bzw. die Werkstatt im Rahmen der Schadensminderungspflicht (§ 254 Abs. 2 BGB) auf die Preise einer mühelos zugänglichen und gleichwertigen Partnerwerkstatt zu verweisen. Der Kürzungsbetrag wird vom Auszahlungsbetrag einbehalten.

Mit freundlichen Grüßen,
Haulitz Gateway Automated Claims Adjuster`;
  };

  /**
   * Domain 05: LegalTech & Supply Chain Due Diligence Notice (LkSG § 7)
   */
  LegalMemos.generateLkSGNotice = function(doc, audit) {
    const today = formatDate();
    return `MAHNUNG WEGEN FEHLENDER LIEFERKETTEN-COMPLIANCE GEMÄSS § 7 LkSG
--------------------------------------------------------------------------------
Datum: ${today}
Lieferant: ${doc.supplierName || 'Global Titanium Foundry Ltd.'}
Lieferanten-ID: ${doc.vendorId || 'VEND-88402'}
Rechtsgrundlage: Gesetz über die unternehmerischen Sorgfaltspflichten in Lieferketten (LkSG)

Sehr geehrte Damen und Herren,

gemäß § 4 bis § 7 LkSG ist unser Unternehmen gesetzlich verpflichtet, menschenrechtliche und umweltbezogene Sorgfaltspflichten in der Lieferkette durchzusetzen und zu dokumentieren.

FESTGESTELLTER COMPLIANCE-VERSTOSS:
Das vorgeschriebene Umwelt- und Sozialzertifikat (ISO 14001 / SA 8000) für Ihre Produktionsstätte ist am ${doc.certExpiryDate || '15.08.2026'} abgelaufen und wurde bis heute nicht erneuert (Überfällig seit ${audit.daysExpired || '45'} Tagen).

KONSEQUENZEN & FRISTSETZUNG:
1. Ihr Lieferantenstatus wurde im ERP-System (SAP MM) mit sofortiger Wirkung auf "NOT_APPROVED - LkSG QUARANTINE" gesetzt.
2. Wir setzen Ihnen hiermit eine Frist bis zum ${doc.remediationDeadline || '15.11.2026'} zur Einreichung des gültigen Re-Zertifizierungsnachweises. Bei fruchtlosem Verstreichen wird die Geschäftsbeziehung gem. § 7 Abs. 3 LkSG ausgesetzt.

Mit freundlichen Grüßen,
Haulitz Gateway Corporate Compliance & ESG Office`;
  };

  /**
   * Domain 06: HealthTech GOÄ Multiplier Dispute Memo (GOÄ § 12)
   */
  LegalMemos.generateGOANotice = function(doc, audit) {
    const today = formatDate();
    return `BEANSTANDUNG DER PRIVATÄRZTLICHEN LIQUIDATION GEMÄSS § 12 I.V.M. § 5 GOÄ
--------------------------------------------------------------------------------
Datum: ${today}
Patienten-ID: ${doc.patientId || 'PAT-77402'}
Rechnungsnummer: ${doc.invoiceNumber || 'MED-2026-9901'}
Arzt / Liquidationsstelle: ${doc.physician || 'Privatpraxis Dr. med. M. Weber'}

BEANSTANDUNG DES STEIGERUNGSSATZES:
Für Ziffer ${doc.disputedCode || 'GOÄ-800'} wurde ein Steigerungsfaktor von ${doc.appliedMultiplier || '3.50'}x berechnet.

RECHTLICHER HINWEIS GEMÄSS § 5 ABS. 2 GOÄ:
Ein Überschreiten des Schwellenwerts von 2,3x ist nur zulässig, wenn Besonderheiten der Erkrankung oder des Behandlungsablaufs dies rechtfertigen. Diese Begründung muss für den Zahlungspflichtigen nachvollziehbar dargelegt werden (§ 12 Abs. 3 GOÄ).

ENTSCHEIDUNG:
Da eine stichhaltige patientenbezogene Begründung in der Abrechnung fehlt, wird die Liquidation auf den Regelhöchstsatz (2,3-fach) gekürzt. Der genehmigte Erstattungsbetrag beläuft sich auf € ${audit.totalApproved || '245.80'} EUR (Kürzung: € ${audit.totalOvercharge || '74.20'} EUR).

Mit freundlichen Grüßen,
Haulitz Gateway Medical Fee Auditor`;
  };

  /**
   * Domain 07: E-Commerce Marketplace Inbound Barcode Rejection
   */
  LegalMemos.generateECommerceNotice = function(doc, audit) {
    const today = formatDate();
    return `WARENEINGANGS-SPERRE / INBOUND ASN QUARANTINE NOTICE (EAN-13 FEHLER)
--------------------------------------------------------------------------------
Datum: ${today}
Marketplace Merchant: ${doc.merchantName || 'Nordic Living Goods GmbH'}
Inbound Shipment ASN: ${doc.asnNumber || 'ASN-EU-889102'}
Fehlerhafter EAN-13 Barcode: ${doc.barcode || '4006381333939'}

FESTSTELLUNG:
Die automatische Scanner-Prüfung an der Wareneingangsschleuse (WMS) hat für ${doc.skuCount || '500'} Einheiten des Artikels "${doc.itemTitle || 'Ergonomic Desk Mat'}" einen ungültigen EAN-13 Prüfcode ermittelt:
- Übermittelter Prüfcode: ${audit.declaredDigit}
- Errechnete Modulo-10 Prüfziffer: ${audit.calculatedDigit}

MASSNAHME:
Der gesamte Wareneingang wird im Hochregallager im Quarantäne-Puffer blockiert. Die Einlagerung in das FBA/Fulfillment-Netzwerk wird verweigert, um Falschlieferungen und Inventurverluste auszuschließen. Eine Neukennzeichnung vor Ort verursacht Gebühren nach aktuellem Logistiktarif.

Mit freundlichen Grüßen,
Haulitz WMS Inbound Operations Control`;
  };

  /**
   * Domain 08: CleanTech VDE Grid Capacity Rejection Notice
   */
  LegalMemos.generateCleanTechNotice = function(doc, audit) {
    const today = formatDate();
    return `NETZANSCHLUSS-VORPRÜFUNG: BEANSTANDUNG GEMÄSS VDE-AR-N 4105
--------------------------------------------------------------------------------
Datum: ${today}
Projekt-ID: ${doc.projectId || 'PV-SOLAR-2026-4401'}
Installationsstandort: ${doc.location || 'Sonnenallee 42, 79100 Freiburg'}
Verteilnetzbetreiber (VNB): ${doc.gridOperator || 'Netze BW GmbH'}

ERGEBNIS DER ELEKTROTECHNISCHEN KONSISTENZPRÜFUNG:
- Geplante PV-Modulleistung: ${doc.panelsKwp || '28.4'} kWp
- Wechselrichter-Scheinleistung AC: ${doc.inverterKw || '25.0'} kW
- Maximal zulässige Anschlusskapazität Hausanschluss: ${doc.gridCapKw || '18.0'} kW
- Kapazitätsüberschreitung: +${audit.overageKw || '7.0'} kW

TECHNISCHER HINWEIS:
Die geplante Einspeiseleistung übersteigt die genehmigte Netzanschlussleistung nach VDE-AR-N 4105. Ohne Nachrüstung eines zertifizierten Einspeisemanagements (EnFluRi-Sensor / Wandlermessung) droht die Versagung der Einspeisezusage durch den Netzbetreiber.

Mit freundlichen Grüßen,
Haulitz Gateway Energy Compliance Engine`;
  };

  /**
   * Domain 09: PropTech HeizkostenV Apportionment Correction Notice
   */
  LegalMemos.generatePropTechNotice = function(doc, audit) {
    const today = formatDate();
    return `WIDERSPRUCH ZUR NEBENKOSTENABRECHNUNG GEMÄSS § 7 I.V.M. § 12 HEIZKOSTENV
--------------------------------------------------------------------------------
Datum: ${today}
Objekt: ${doc.buildingAddress || 'Kaiserstraße 12, 60311 Frankfurt am Main'}
Mietereinheit: ${doc.unitNumber || 'WE 04, 2. OG rechts'}
Abrechnungszeitraum: ${doc.billingPeriod || '01.01.2025 - 31.12.2025'}

FESTSTELLUNG DES GESETZWIDRIGEN VERTEILERSCHLÜSSELS:
In der vorgelegten Heizkostenabrechnung wurden die Heizkosten im Verhältnis 50% Grundkosten / 50% Verbrauchskosten abgerechnet.

RECHTSLAGE GEMÄSS HEIZKOSTENVERORDNUNG (HeizkostenV):
Gemäß § 7 Abs. 1 Satz 2 HeizkostenV sind in Gebäuden, die die Wärmeschutzverordnung vom 11. August 1977 nicht erfüllen und mit Öl oder Gas beheizt werden, zwingend 70 Prozent der Kosten nach dem erfassten Verbrauch umzulegen.

RECHTSFOLGE GEMÄSS § 12 HEIZKOSTENV (KÜRZUNGSRECHT):
Wird nicht verordnungsgemäß abgerechnet, hat der Mieter das Recht, den auf ihn entfallenden Kostenanteil um 15 vom Hundert zu kürzen. Wir fordern eine Neuberechnung nach dem 70/30-Schlüssel.

Mit freundlichen Grüßen,
Haulitz Gateway Real Estate Audit Service`;
  };

  /**
   * Domain 10: Enterprise ERP / IT Consulting Schema Breach Notice
   */
  LegalMemos.generateERPNotice = function(doc, audit) {
    const today = formatDate();
    return `ENTERPRISE ERP STAGING EXCEPTION DUMP & SQL INJECTION ALERT
--------------------------------------------------------------------------------
Timestamp: ${new Date().toISOString()}
Target Gateway: SAP S/4HANA Staging Buffer & MS SQL Server 2022
Source Payload: ${doc.sourceSystem || 'EDIFACT_INVOIC_D96A'}
Transaction ID: ${doc.transactionId || 'TXN-99882310'}

SECURITY DIAGNOSTIC REPORT:
The incoming payload failed pre-staging sanitization and schema type integrity gates:
- Detected Unescaped Meta-Characters: Potential SQL Injection pattern blocked
- Referential Foreign Key Integrity: Reference ID does not resolve in master ledger
- Quarantine Action: Transaction halted before executing downstream Transact-SQL staging pipeline

Mit freundlichen Grüßen,
Haulitz Gateway ERP Security Sentinel`;
  };

  // Expose to browser window or CommonJS
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = LegalMemos;
  } else {
    global.Haulitz = global.Haulitz || {};
    global.Haulitz.LegalMemos = LegalMemos;
  }
})(typeof window !== 'undefined' ? window : globalThis);
