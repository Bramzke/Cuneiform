import React from 'react';

/**
 * Renders a Babylonian cuneiform "zero" symbol (horizontal wedge).
 * This symbol represents the value 0 in Babylonian notation.
 * Note: Historical Babylonian mathematics used positional notation but
 * represented zero differently (often as a space or later special symbols).
 * This is a modern convenience for clarity.
 */
export const ZeroSymbol: React.FC = () => (
  <svg
    viewBox="0 0 20 20"
    preserveAspectRatio="xMidYMid meet"
    style={{ width: '50%', height: '50%' }}  >
    {/* Horizontal wedge shapes representing the number 0 */}
    <path
      d="m 2.72,0
c 0,0 -0.45,1.67 -0.91,2.38 -0.47,0.72 -1.81,1.81 -1.81,1.81 0,0 3.23,0.71 4.77,1.31 4.77,1.86 13.64,7.07 13.64,7.07 0,0 -8.42,-5.83 -12.28,-9.17
C 4.91,2.35 2.72,0 2.72,0
Z
m 0,6.69
c 0,0 -0.45,1.67 -0.91,2.39 -0.47,0.71 -1.81,1.81 -1.81,1.81 0,0 3.23,0.7 4.77,1.3
C 9.54,14.06 18.41,19.26 18.41,19.26
c 0,0 -8.42,-5.82 -12.28,-9.16
C 4.91,9.05 2.72,6.69 2.72,6.69
Z"
      fill="currentColor"
    />
  </svg>
);
