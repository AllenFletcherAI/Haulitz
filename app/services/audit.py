import re
from typing import List, Tuple
from app.models.schemas import ExtractedDocument, AuditCheck, AuditReport

# Official ISO 6346 letter-to-value mapping
ISO_6346_LETTER_MAP = {
    'A': 10, 'B': 12, 'C': 13, 'D': 14, 'E': 15, 'F': 16, 'G': 17, 'H': 18, 'I': 19, 'J': 20,
    'K': 21, 'L': 23, 'M': 24, 'N': 25, 'O': 26, 'P': 27, 'Q': 28, 'R': 29, 'S': 30, 'T': 31,
    'U': 32, 'V': 34, 'W': 35, 'X': 36, 'Y': 37, 'Z': 38
}

VALID_INCOTERMS_2020 = {"EXW", "FCA", "CPT", "CIP", "DAP", "DPU", "DDP", "FAS", "FOB", "CFR", "CIF"}
VALID_CURRENCIES = {"EUR", "USD", "GBP", "CHF", "JPY", "CNY", "CAD", "AUD", "SGD", "HKD"}

def calculate_iso6346_check_digit(container_code: str) -> Tuple[bool, int, str]:
    """
    Deterministically computes ISO 6346 Modulo-11 check digit for an 11-char container number.
    """
    clean_code = re.sub(r'[^A-Za-z0-9]', '', container_code.upper())
    if len(clean_code) != 11:
        return False, -1, f"Invalid length ({len(clean_code)} chars). Standard requires exactly 11 characters."
    
    owner_and_type = clean_code[:4]
    if not owner_and_type.isalpha():
        return False, -1, "First 4 characters must be alphabetic owner and equipment codes."
    
    digits_part = clean_code[4:]
    if not digits_part.isdigit():
        return False, -1, "Last 7 characters must be digits (6 serial numbers + 1 check digit)."
    
    declared_check_digit = int(clean_code[10])
    
    total = 0
    for i in range(10):
        char = clean_code[i]
        val = ISO_6346_LETTER_MAP[char] if char.isalpha() else int(char)
        weight = 2 ** i
        total += val * weight
        
    remainder = total % 11
    calculated_digit = 0 if remainder == 10 else remainder
    
    is_valid = (calculated_digit == declared_check_digit)
    return is_valid, calculated_digit, f"Declared digit: {declared_check_digit}, Calculated checksum: {calculated_digit}"

def run_deterministic_audit(doc: ExtractedDocument) -> AuditReport:
    """
    Deterministic rules engine verifying customs invariants, container checksums,
    weights, and commercial consistency before ERP ingestion.
    """
    checks: List[AuditCheck] = []
    quarantine_reasons: List[str] = []
    demurrage_risk = False

    # 0. GATEKEEPER CHECK: INTAKE & EXTRACTION INTEGRITY
    is_exception_doc = (
        doc.document_type == "Document Processing Exception" or
        (not doc.document_number and not doc.container_number and not doc.line_items and not doc.total_amount)
    )

    if is_exception_doc:
        checks.append(AuditCheck(
            check_name="document_intake_integrity",
            passed=False,
            requirement="Legible document with parsed freight entities",
            observed_value="Extraction Failure - Unparsed Document",
            severity="CRITICAL_FAIL",
            message=doc.extraction_notes or "Document could not be parsed into verifiable freight structures. Automatic quarantine hold."
        ))
        quarantine_reasons.append("Unreadable / Failed Document Extraction")
        demurrage_risk = True

        return AuditReport(
            status="QUARANTINE_HOLD",
            passed_checks=0,
            total_checks=1,
            demurrage_risk_detected=True,
            estimated_demurrage_liability_eur=750.0,
            atlas_ready=False,
            checks=checks,
            quarantine_reason="Extraction Failure: Critical document attributes missing or unreadable."
        )

    # 1. ISO 6346 Container Checksum (Ocean / Intermodal)
    if doc.container_number:
        is_valid, calc_digit, desc = calculate_iso6346_check_digit(doc.container_number)
        checks.append(AuditCheck(
            check_name="iso_6346_container_checksum",
            passed=is_valid,
            requirement="Modulo-11 Checksum Matched",
            observed_value=f"{doc.container_number} (Digit: {calc_digit})",
            severity="PASS" if is_valid else "CRITICAL_FAIL",
            message="Container number conforms to ISO 6346 standard." if is_valid else
                    f"Check digit mismatch. Gate-in rejection risk at Hamburg/Rotterdam. {desc}"
        ))
        if not is_valid:
            quarantine_reasons.append(f"Invalid Container Number: {doc.container_number}")
            demurrage_risk = True

    # 2. Physical Mass Conservation Law (Gross >= Net)
    if doc.gross_weight_kg is not None and doc.net_weight_kg is not None:
        mass_valid = (doc.gross_weight_kg >= doc.net_weight_kg)
        diff = doc.gross_weight_kg - doc.net_weight_kg
        checks.append(AuditCheck(
            check_name="mass_conservation_law",
            passed=mass_valid,
            requirement="Gross Weight >= Net Weight",
            observed_value=f"Gross: {doc.gross_weight_kg:,.1f} kg | Net: {doc.net_weight_kg:,.1f} kg (Tare: {diff:,.1f} kg)",
            severity="PASS" if mass_valid else "CRITICAL_FAIL",
            message="Weight distribution mathematically sound." if mass_valid else
                    f"Physical violation: Gross weight is less than Net weight by {abs(diff):,.1f} kg. Automatic customs hold."
        ))
        if not mass_valid:
            quarantine_reasons.append("Physical Law Violation: Gross Weight < Net Weight")
            demurrage_risk = True

    # 3. Line-Item Commercial Math Integrity
    if doc.line_items and doc.total_amount:
        sum_items = sum(item.total_price for item in doc.line_items)
        variance = abs(sum_items - doc.total_amount)
        math_valid = variance < 0.50
        checks.append(AuditCheck(
            check_name="commercial_math_integrity",
            passed=math_valid,
            requirement="Sum(Line Items) == Total Amount (+/- 0.50)",
            observed_value=f"Sum: {sum_items:,.2f} {doc.currency} | Stated: {doc.total_amount:,.2f} {doc.currency}",
            severity="PASS" if math_valid else "WARNING",
            message="Invoice mathematics verified down to the cent." if math_valid else
                    f"Arithmetic variance of {variance:,.2f} {doc.currency} detected across line items."
        ))
        if not math_valid and variance > 10.0:
            quarantine_reasons.append(f"Invoice Arithmetic Discrepancy: {variance:,.2f} {doc.currency}")

    # 4. Mandatory Trade Parties Declaration (Shipper & Consignee)
    parties_present = bool(doc.shipper and doc.consignee)
    checks.append(AuditCheck(
        check_name="trade_parties_declared",
        passed=parties_present,
        requirement="Both Shipper & Consignee explicitly identified",
        observed_value=f"Shipper: {'Yes' if doc.shipper else 'Missing'} | Consignee: {'Yes' if doc.consignee else 'Missing'}",
        severity="PASS" if parties_present else "CRITICAL_FAIL",
        message="Commercial trading parties verified for EU/German customs clearance." if parties_present else
                "Incomplete trading parties. Declarations missing shipper or consignee cannot be cleared in ATLAS."
    ))
    if not parties_present:
        quarantine_reasons.append("Missing Commercial Trade Parties (Shipper/Consignee)")

    # 5. ICC Incoterms 2020 Compliance
    if doc.incoterm:
        term_clean = doc.incoterm.strip().upper()
        term_valid = term_clean in VALID_INCOTERMS_2020
        checks.append(AuditCheck(
            check_name="icc_incoterms_compliance",
            passed=term_valid,
            requirement="1 of 11 ICC 2020 Standards (EXW, FOB, CIF, DAP, etc.)",
            observed_value=term_clean,
            severity="PASS" if term_valid else "WARNING",
            message=f"Recognized ICC trade term ({term_clean})." if term_valid else
                    f"Non-standard Incoterm '{doc.incoterm}'. Risk of freight liability dispute."
        ))
        if not term_valid:
            quarantine_reasons.append(f"Non-standard Incoterm: {doc.incoterm}")

    # 6. Currency Code Standardization (ISO 4217)
    currency_valid = doc.currency in VALID_CURRENCIES
    checks.append(AuditCheck(
        check_name="iso_4217_currency_standard",
        passed=currency_valid,
        requirement="Recognized 3-letter ISO Currency Code (EUR, USD, GBP, CHF)",
        observed_value=doc.currency or "Missing",
        severity="PASS" if currency_valid else "WARNING",
        message="Standard international trade currency declared." if currency_valid else
                f"Unknown currency '{doc.currency}'. Required for duty calculation."
    ))
    if not currency_valid:
        quarantine_reasons.append(f"Unrecognized Currency: {doc.currency}")

    # 7. Customs Tariff Code (HS / ATLAS) Structure (if items present)
    hs_codes = [item.hs_code for item in doc.line_items if item.hs_code]
    for hs in hs_codes:
        clean_hs = re.sub(r'[^0-9]', '', hs)
        valid_length = len(clean_hs) in (6, 8, 9, 10, 11)
        checks.append(AuditCheck(
            check_name="customs_tariff_code_syntax",
            passed=valid_length,
            requirement="6-digit (WCO), 8-digit (EU CN), 9-10 digit (TARIC/HTS), or 11-digit (ATLAS)",
            observed_value=f"{hs} ({len(clean_hs)} digits)",
            severity="PASS" if valid_length else "WARNING",
            message="Valid customs tariff structure." if valid_length else
                    f"Malformed tariff code '{hs}'. Will trigger electronic ATLAS declaration error."
        ))
        if not valid_length and len(clean_hs) < 4:
            quarantine_reasons.append(f"Invalid HS Tariff Code: {hs}")

    total_checks = len(checks)
    passed_checks = sum(1 for c in checks if c.passed)
    has_critical_fail = any(c.severity == "CRITICAL_FAIL" and not c.passed for c in checks)
    
    # Non-negotiable clean rule: Must have at least 1 check, 0 critical failures, and 0 quarantine reasons
    is_clean = (total_checks > 0) and (not has_critical_fail) and (len(quarantine_reasons) == 0)
    status = "VERIFIED_CLEAN" if is_clean else "QUARANTINE_HOLD"
    liability = 750.0 if (demurrage_risk or not is_clean) else 0.0

    return AuditReport(
        status=status,
        passed_checks=passed_checks,
        total_checks=total_checks,
        demurrage_risk_detected=(demurrage_risk or not is_clean),
        estimated_demurrage_liability_eur=liability,
        atlas_ready=is_clean,
        checks=checks,
        quarantine_reason="; ".join(quarantine_reasons) if quarantine_reasons else None
    )
