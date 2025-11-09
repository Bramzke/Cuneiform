import React from 'react';

/**
 * Renders a Babylonian cuneiform "one" symbol (vertical wedge).
 * This symbol represents the value 1 in Babylonian notation.
 * Multiple ones symbols are arranged to represent values 1-9.
 */
export const OneSymbol: React.FC = () => (
  <svg
    viewBox="0 0 4 20"
    style={{ width: '100%', height: '100%' }}
  >
    {/* Vertical wedge shape representing the number 1 */}
    <path
      d="M 0,0 C 0,0 1.31,0.53 2,0.53 2.69,0.53 4,0 4,0 4,0 3.2,2.05 3,3.12 1.97,8.66 2,20 2,20 2,20 2.03,8.66 1,3.12 0.8,2.05 0,0 0,0 Z"
      fill="currentColor"
    />
  </svg>
);
