import React from 'react';
import { OneSymbol } from '../symbols/OneSymbol';
import { TenSymbol } from '../symbols/TenSymbol';
import { ZeroSymbol } from '../symbols/ZeroSymbol';
import { calculateTensLayout, calculateOnesLayout, separateDigit } from '../../utils/symbolLayout';
import styles from './BabylonianDigit.module.css';

/**
 * Props for the SymbolRow component
 */
interface SymbolRowProps {
  /** The SVG symbol component to render */
  SymbolComponent: React.FC;
  /** Number of times to render the symbol */
  count: number;
}

/**
 * Renders a single row of repeated symbols
 */
const SymbolRow: React.FC<SymbolRowProps> = ({ SymbolComponent, count }) => (
  <div className={styles.symbolRow}>
    {Array.from({ length: count }, (_, index) => (
      <SymbolComponent key={index} />
    ))}
  </div>
);

/**
 * Props for the BabylonianDigit component
 */
interface BabylonianDigitProps {
  /** A single Babylonian digit in the range 0-59 */
  digit: number;
  /**
   * Whether to display a zero symbol for this digit (if digit === 0).
   * - true: Display the zero symbol (Seleucid Era intermediate zeros)
   * - false: Display empty space (Old Babylonia convention)
   * - undefined: Default to true for backward compatibility
   */
  shouldDisplayZero?: boolean;
}

/**
 * Displays a single Babylonian digit (0-59) using cuneiform symbols.
 * Each digit is represented by:
 * - Left column: Tens symbols (◁ shape) - 0 to 5 symbols
 * - Right column: Ones symbols (| shape) - 0 to 9 symbols
 * - Special case: Zero handling depends on historical era convention
 */
export const BabylonianDigit: React.FC<BabylonianDigitProps> = ({
  digit,
  shouldDisplayZero = true,
}) => {
  // Negative digits are not valid
  if (digit < 0) return null;

  // Special case: Zero - display depends on historical era
  if (digit === 0) {
    return (
      <div className={styles.babylonianDigitContainer}>
        <div className={styles.zeroBlock}>
          {shouldDisplayZero ? <ZeroSymbol /> : null}
        </div>
      </div>
    );
  }

  // Separate the digit into tens and ones components
  const { tens, ones } = separateDigit(digit);

  // Calculate layout configurations
  const tensLayout = calculateTensLayout(tens);
  const onesLayout = calculateOnesLayout(ones);

  // Build rows for tens symbols
  const tensRows = tensLayout.symbolsPerRow.map((count, index) => (
    <SymbolRow key={`tens-${index}`} SymbolComponent={TenSymbol} count={count} />
  ));

  // Build rows for ones symbols
  const onesRows = onesLayout.symbolsPerRow.map((count, index) => (
    <SymbolRow key={`ones-${index}`} SymbolComponent={OneSymbol} count={count} />
  ));

  return (
    <div className={styles.babylonianDigitContainer}>
      <div className={`${styles.tensBlock} ${styles[tensLayout.gridClassName]}`}>
        {tensRows}
      </div>
      <div className={`${styles.onesBlock} ${styles[onesLayout.gridClassName]}`}>
        {onesRows}
      </div>
    </div>
  );
};
