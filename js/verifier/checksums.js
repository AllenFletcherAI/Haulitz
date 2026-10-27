/**
 * HAULITZ VERIFICATION GATEWAY - CHECKSUM ENGINES
 * Standard: ASD-STE100 Simplified Technical English
 * 
 * Algorithms implemented:
 * 1. ISO 6346 Modulo-11 Intermodal Container Checksum
 * 2. EAN-13 / GTIN-13 Modulo-10 Retail Barcode Checksum
 * 3. ISO 7064 Modulo-97 International Bank Account Number (IBAN)
 */

(function(global) {
  'use strict';

  const Checksums = {};

  /**
   * ISO 6346 Modulo-11 Container Checksum Verification
   * @param {string} rawContainerNumber - e.g. "MSCU1234567" or "MSCU 123456-7"
   * @returns {Object} Verification result with pass/fail and calculated values
   */
  Checksums.calculateISO6346 = function(rawContainerNumber) {
    if (!rawContainerNumber || typeof rawContainerNumber !== 'string') {
      return {
        isValid: false,
        declaredDigit: null,
        calculatedDigit: null,
        cleanNumber: '',
        error: 'Container number is empty or not a string'
      };
    }

    const clean = rawContainerNumber.toUpperCase().replace(/[^A-Z0-9]/g, '');

    if (clean.length !== 11) {
      return {
        isValid: false,
        declaredDigit: clean.length === 11 ? parseInt(clean[10], 10) : null,
        calculatedDigit: null,
        cleanNumber: clean,
        error: `Expected 11 characters (4 letters + 6 digits + 1 check digit), got ${clean.length}`
      };
    }

    // ISO 6346 Letter to Value mapping (omitting powers of 11: 11, 22, 33)
    const letterValues = {
      'A': 10, 'B': 12, 'C': 13, 'D': 14, 'E': 15, 'F': 16, 'G': 17, 'H': 18, 'I': 19, 'J': 20,
      'K': 21, 'L': 23, 'M': 24, 'N': 25, 'O': 26, 'P': 27, 'Q': 28, 'R': 29, 'S': 30, 'T': 31,
      'U': 32, 'V': 34, 'W': 35, 'X': 36, 'Y': 37, 'Z': 38
    };

    let sum = 0;
    const steps = [];

    for (let i = 0; i < 10; i++) {
      const char = clean[i];
      let value;

      if (i < 4) {
        // First 4 characters must be letters
        if (!letterValues[char]) {
          return {
            isValid: false,
            declaredDigit: parseInt(clean[10], 10),
            calculatedDigit: null,
            cleanNumber: clean,
            error: `Character at index ${i} must be a letter, found '${char}'`
          };
        }
        value = letterValues[char];
      } else {
        // Next 6 characters must be digits
        if (!/[0-9]/.test(char)) {
          return {
            isValid: false,
            declaredDigit: parseInt(clean[10], 10),
            calculatedDigit: null,
            cleanNumber: clean,
            error: `Character at index ${i} must be a digit, found '${char}'`
          };
        }
        value = parseInt(char, 10);
      }

      const weight = Math.pow(2, i);
      const product = value * weight;
      sum += product;
      steps.push({ position: i, char, value, weight, product });
    }

    const remainder = sum % 11;
    const calculatedDigit = remainder === 10 ? 0 : remainder;
    const declaredDigit = parseInt(clean[10], 10);

    return {
      isValid: calculatedDigit === declaredDigit,
      declaredDigit,
      calculatedDigit,
      cleanNumber: clean,
      sum,
      remainder,
      steps,
      ownerCode: clean.slice(0, 3),
      category: clean[3],
      serialNumber: clean.slice(4, 10)
    };
  };

  /**
   * EAN-13 / GTIN-13 Modulo-10 Barcode Checksum Verification
   * @param {string} rawBarcode - 13-digit EAN code (e.g. "4006381333931")
   * @returns {Object} Verification result
   */
  Checksums.calculateEAN13 = function(rawBarcode) {
    if (!rawBarcode || typeof rawBarcode !== 'string') {
      return {
        isValid: false,
        declaredDigit: null,
        calculatedDigit: null,
        cleanBarcode: '',
        error: 'Barcode is empty or not a string'
      };
    }

    const clean = rawBarcode.replace(/[^0-9]/g, '');

    if (clean.length !== 13) {
      return {
        isValid: false,
        declaredDigit: null,
        calculatedDigit: null,
        cleanBarcode: clean,
        error: `EAN-13 must be exactly 13 digits, got ${clean.length}`
      };
    }

    let sum = 0;
    for (let i = 0; i < 12; i++) {
      const digit = parseInt(clean[i], 10);
      // Even positions (1-based index: 2, 4, 6...) have weight 3; odd have weight 1
      const weight = (i % 2 === 1) ? 3 : 1;
      sum += digit * weight;
    }

    const remainder = sum % 10;
    const calculatedDigit = remainder === 0 ? 0 : (10 - remainder);
    const declaredDigit = parseInt(clean[12], 10);

    return {
      isValid: calculatedDigit === declaredDigit,
      declaredDigit,
      calculatedDigit,
      cleanBarcode: clean,
      sum
    };
  };

  /**
   * ISO 7064 Modulo-97 SEPA IBAN Verification
   * @param {string} rawIBAN - e.g. "DE89370400440532013000"
   * @returns {Object} Verification result
   */
  Checksums.calculateIBAN = function(rawIBAN) {
    if (!rawIBAN || typeof rawIBAN !== 'string') {
      return {
        isValid: false,
        formattedIBAN: '',
        error: 'IBAN is empty or not a string'
      };
    }

    const clean = rawIBAN.toUpperCase().replace(/[^A-Z0-9]/g, '');

    if (clean.length < 15 || clean.length > 34) {
      return {
        isValid: false,
        formattedIBAN: clean,
        error: `IBAN length must be between 15 and 34 characters, got ${clean.length}`
      };
    }

    // Rearrange: Move the first 4 characters (country code + 2 check digits) to the end
    const rearranged = clean.slice(4) + clean.slice(0, 4);

    // Convert letters to digits: A=10, B=11 ... Z=35
    let numericString = '';
    for (let i = 0; i < rearranged.length; i++) {
      const code = rearranged.charCodeAt(i);
      if (code >= 65 && code <= 90) {
        numericString += (code - 55).toString();
      } else {
        numericString += rearranged[i];
      }
    }

    // Calculate modulo 97 on large numeric string using BigInt
    let remainder;
    try {
      remainder = Number(BigInt(numericString) % 97n);
    } catch (e) {
      // Fallback chunking method for older engines
      let chunk = '';
      for (let i = 0; i < numericString.length; i++) {
        chunk += numericString[i];
        if (chunk.length >= 9) {
          chunk = (parseInt(chunk, 10) % 97).toString();
        }
      }
      remainder = parseInt(chunk, 10) % 97;
    }

    // Standard formatted IBAN in groups of 4
    const formatted = clean.match(/.{1,4}/g)?.join(' ') || clean;

    return {
      isValid: remainder === 1,
      formattedIBAN: formatted,
      cleanIBAN: clean,
      countryCode: clean.slice(0, 2),
      declaredCheckDigits: clean.slice(2, 4),
      remainder
    };
  };

  // Expose to browser window or CommonJS
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = Checksums;
  } else {
    global.Haulitz = global.Haulitz || {};
    global.Haulitz.Checksums = Checksums;
  }
})(typeof window !== 'undefined' ? window : globalThis);
