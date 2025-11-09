import type { BabylonianEra } from '../config/constants';

/**
 * Determines if a zero at a given position should be displayed based on historical era conventions.
 *
 * Historical context:
 * - Old Babylonia: Zeros were not represented with symbols (spaces/gaps used instead)
 * - Seleucid Era: Only "intermediate zeros" (zeros between non-zero digits) were represented with symbols
 *
 * @param digits - Array of base-60 digits representing the full number
 * @param index - Index of the digit to check
 * @param era - The historical era convention to use
 * @returns true if the zero should be displayed with a symbol, false otherwise
 *
 * @example
 * ```typescript
 * // 3601 = [1, 0, 1] in base-60
 * shouldDisplayZero([1, 0, 1], 1, 'SELEUCID_ERA') // true (intermediate zero)
 * shouldDisplayZero([1, 0, 1], 1, 'OLD_BABYLONIA') // false (no zeros shown)
 *
 * // 3600 = [1, 0, 0] in base-60
 * shouldDisplayZero([1, 0, 0], 1, 'SELEUCID_ERA') // false (not intermediate)
 * shouldDisplayZero([1, 0, 0], 2, 'SELEUCID_ERA') // false (final zero)
 *
 * // 60 = [1, 0] in base-60
 * shouldDisplayZero([1, 0], 1, 'SELEUCID_ERA') // false (final zero)
 *
 * // 0 = [0] in base-60
 * shouldDisplayZero([0], 0, 'SELEUCID_ERA') // false (nothing zero)
 * ```
 */
export function shouldDisplayZero(
  digits: number[],
  index: number,
  era: BabylonianEra
): boolean {
  // Old Babylonia never displayed zero symbols
  if (era === 'OLD_BABYLONIA') {
    return false;
  }

  // Seleucid Era: Only display intermediate zeros
  // An intermediate zero is a zero that has non-zero digits both before AND after it
  if (era === 'SELEUCID_ERA') {
    const digit = digits[index];

    // If it's not a zero, this check doesn't apply
    if (digit !== 0) {
      return true; // Non-zero digits are always displayed
    }

    // Check if this is an intermediate zero
    return isIntermediateZero(digits, index);
  }

  return false;
}

/**
 * Checks if a zero at the given index is an "intermediate zero" -
 * meaning it has at least one non-zero digit before it AND at least one non-zero digit after it.
 *
 * @param digits - Array of base-60 digits
 * @param index - Index of the zero to check
 * @returns true if the zero is intermediate (between non-zero digits)
 *
 * @example
 * ```typescript
 * isIntermediateZero([1, 0, 1], 1)    // true  - has 1 before and 1 after
 * isIntermediateZero([1, 0, 0], 1)    // false - has 0 after
 * isIntermediateZero([0, 0, 1], 0)    // false - nothing before
 * isIntermediateZero([1, 0], 1)       // false - nothing after
 * isIntermediateZero([2, 0, 0, 5], 1) // true  - has 2 before and 5 after (even though 0 is between)
 * isIntermediateZero([2, 0, 0, 5], 2) // true  - has 2 before and 5 after
 * ```
 */
export function isIntermediateZero(digits: number[], index: number): boolean {
  // Must be a zero
  if (digits[index] !== 0) {
    return false;
  }

  // Check if there's at least one non-zero digit before this position
  const hasNonZeroBefore = digits.slice(0, index).some(digit => digit !== 0);

  // Check if there's at least one non-zero digit after this position
  const hasNonZeroAfter = digits.slice(index + 1).some(digit => digit !== 0);

  // It's intermediate only if it has non-zero digits on BOTH sides
  return hasNonZeroBefore && hasNonZeroAfter;
}
