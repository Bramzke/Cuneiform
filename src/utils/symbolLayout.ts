import { LAYOUT_THRESHOLDS } from '../config/constants';

/**
 * Configuration for how symbols should be distributed across rows
 */
export interface SymbolLayoutConfig {
  /** Total number of rows needed */
  rowCount: 1 | 2 | 3;
  /** CSS class name for grid-template-rows */
  gridClassName: string;
  /** Number of symbols in each row */
  symbolsPerRow: number[];
}

/**
 * Calculates how to distribute tens symbols (0-5) across rows.
 * Layout rules:
 * - 0-3 symbols: 1 row
 * - 4-5 symbols: 2 rows (split evenly)
 *
 * @param tensCount - Number of tens symbols (0-5)
 * @returns Layout configuration for tens symbols
 */
export function calculateTensLayout(tensCount: number): SymbolLayoutConfig {
  if (tensCount === 0) {
    return { rowCount: 1, gridClassName: 'rows-1', symbolsPerRow: [] };
  }

  if (tensCount <= LAYOUT_THRESHOLDS.MAX_SYMBOLS_SINGLE_ROW) {
    // 1-3 symbols: single row
    return {
      rowCount: 1,
      gridClassName: 'rows-1',
      symbolsPerRow: [tensCount],
    };
  }

  // 4-5 symbols: two rows, split evenly
  const topRowCount = Math.ceil(tensCount / 2);
  const bottomRowCount = Math.floor(tensCount / 2);

  return {
    rowCount: 2,
    gridClassName: 'rows-2',
    symbolsPerRow: [topRowCount, bottomRowCount],
  };
}

/**
 * Calculates how to distribute ones symbols (0-9) across rows.
 * Layout rules:
 * - 0-3 symbols: 1 row
 * - 4-6 symbols: 2 rows (first row gets 3, second gets remainder)
 * - 7-9 symbols: 3 rows (first two rows get 3 each, third gets remainder)
 *
 * @param onesCount - Number of ones symbols (0-9)
 * @returns Layout configuration for ones symbols
 */
export function calculateOnesLayout(onesCount: number): SymbolLayoutConfig {
  if (onesCount === 0) {
    return { rowCount: 1, gridClassName: 'rows-1', symbolsPerRow: [] };
  }

  if (onesCount <= LAYOUT_THRESHOLDS.MAX_SYMBOLS_SINGLE_ROW) {
    // 1-3 symbols: single row
    return {
      rowCount: 1,
      gridClassName: 'rows-1',
      symbolsPerRow: [onesCount],
    };
  }

  if (onesCount <= LAYOUT_THRESHOLDS.MAX_SYMBOLS_TWO_ROWS) {
    // 4-6 symbols: two rows (3 + remainder)
    const topRowCount = LAYOUT_THRESHOLDS.MAX_SYMBOLS_SINGLE_ROW;
    const bottomRowCount = onesCount - topRowCount;

    return {
      rowCount: 2,
      gridClassName: 'rows-2',
      symbolsPerRow: [topRowCount, bottomRowCount],
    };
  }

  // 7-9 symbols: three rows (3 + 3 + remainder)
  const topRowCount = LAYOUT_THRESHOLDS.MAX_SYMBOLS_SINGLE_ROW;
  const middleRowCount = LAYOUT_THRESHOLDS.MAX_SYMBOLS_SINGLE_ROW;
  const bottomRowCount = onesCount - topRowCount - middleRowCount;

  return {
    rowCount: 3,
    gridClassName: 'rows-3',
    symbolsPerRow: [topRowCount, middleRowCount, bottomRowCount],
  };
}

/**
 * Separates a Babylonian digit (0-59) into tens and ones components.
 *
 * @param digit - A single Babylonian digit (0-59)
 * @returns Object with tens count (0-5) and ones count (0-9)
 *
 * @example
 * ```typescript
 * separateDigit(0)  // { tens: 0, ones: 0 }
 * separateDigit(5)  // { tens: 0, ones: 5 }
 * separateDigit(23) // { tens: 2, ones: 3 }
 * separateDigit(59) // { tens: 5, ones: 9 }
 * ```
 */
export function separateDigit(digit: number): { tens: number; ones: number } {
  const tens = Math.floor(digit / LAYOUT_THRESHOLDS.TENS_DIVISOR);
  const ones = digit % LAYOUT_THRESHOLDS.TENS_DIVISOR;
  return { tens, ones };
}
