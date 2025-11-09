import React from 'react';

/**
 * Renders a Babylonian cuneiform "ten" symbol (angular wedge/chevron).
 * This symbol represents the value 10 in Babylonian notation.
 * Multiple tens symbols are arranged to represent values 10, 20, 30, 40, 50.
 * The symbol is vertically stretched to fill the container height.
 */
export const TenSymbol: React.FC = () => (
  <svg
    viewBox="0 0 10 30"
    preserveAspectRatio="none"
    style={{ width: '100%', height: '100%' }}
  >
    {/* Angular wedge shape representing the number 10 - vertically stretched */}
    <path
      d="M 0,15 10,0 5.6817755,12.954673 a 6.4678905,6.4678905 90 0 0 0,4.090654 L 10,30 Z"
      fill="currentColor"
    />
  </svg>
);
