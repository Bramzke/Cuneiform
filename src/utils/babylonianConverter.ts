import { BABYLONIAN_CONFIG } from '../config/constants';

/**
 * Converts a decimal number to an array of base-60 (sexagesimal) digits.
 * The Babylonians used a base-60 positional number system, where each position
 * represents a power of 60 (similar to how we use powers of 10 in decimal).
 *
 * @param decimalNumber - The decimal number to convert (must be non-negative)
 * @returns Array of base-60 digits in big-endian order (most significant digit first)
 *
 * @example
 * ```typescript
 * convertToBase60(0)     // returns [0]
 * convertToBase60(59)    // returns [59]
 * convertToBase60(60)    // returns [1, 0]  (1×60¹ + 0×60⁰)
 * convertToBase60(3661)  // returns [1, 1, 1]  (1×60² + 1×60¹ + 1×60⁰)
 * ```
 */
export function convertToBase60(decimalNumber: number): number[] {
  // Handle zero as special case
  if (decimalNumber === 0) {
    return [0];
  }

  // Handle negative numbers by returning empty array
  if (decimalNumber < BABYLONIAN_CONFIG.MIN_NUMBER) {
    return [];
  }

  const digits: number[] = [];
  let quotient = decimalNumber;

  // Repeatedly divide by base (60) and collect remainders
  while (quotient > 0) {
    const remainder = quotient % BABYLONIAN_CONFIG.BASE;
    digits.push(remainder);
    quotient = Math.floor(quotient / BABYLONIAN_CONFIG.BASE);
  }

  // Reverse to get big-endian order (most significant digit first)
  return digits.reverse();
}

/**
 * Validates that a number is within valid range for Babylonian conversion
 */
export function isValidBabylonianInput(value: number): boolean {
  return !isNaN(value) && value >= BABYLONIAN_CONFIG.MIN_NUMBER;
}
