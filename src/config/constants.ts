/**
 * Configuration constants for the Babylonian Cuneiform Converter
 */

/**
 * Historical eras with different zero representation conventions
 */
export type BabylonianEra = 'OLD_BABYLONIA' | 'SELEUCID_ERA';

/**
 * Era display names for UI
 */
export const ERA_LABELS: Record<BabylonianEra, string> = {
  OLD_BABYLONIA: 'Old Babylonia',
  SELEUCID_ERA: 'Seleucid Era',
} as const;

/**
 * Babylonian number system configuration
 */
export const BABYLONIAN_CONFIG = {
  /** Base of the Babylonian number system (sexagesimal) */
  BASE: 60,
  /** Default number to display on app load */
  DEFAULT_NUMBER: 3661,
  /** Minimum allowed input number */
  MIN_NUMBER: 0,
  /** Default historical era */
  DEFAULT_ERA: 'OLD_BABYLONIA' as BabylonianEra,
} as const;

/**
 * Layout thresholds for symbol distribution
 */
export const LAYOUT_THRESHOLDS = {
  /** Divisor to separate tens from ones in a Babylonian digit (0-59) */
  TENS_DIVISOR: 10,
  /** Maximum number of symbols that fit in a single row */
  MAX_SYMBOLS_SINGLE_ROW: 3,
  /** Maximum number of symbols before requiring 3 rows */
  MAX_SYMBOLS_TWO_ROWS: 6,
} as const;

/**
 * Visual styling constants for the digit container
 */
export const CUNEIFORM_STYLES = {
  /** Container dimensions */
  CONTAINER: {
    WIDTH: 100, // px
    HEIGHT: 80, // px
    PADDING: 5, // px
    MARGIN: 5, // px
    BORDER_RADIUS: 5, // px
  },
  /** Color scheme */
  COLORS: {
    BACKGROUND: '#f0e8d9',
    BORDER: '#d4c8b0',
    SYMBOL: '#5a4e3a',
  },
  /** Spacing */
  SPACING: {
    SYMBOL_GAP: 1, // px - gap between symbols in a row
  },
} as const;
