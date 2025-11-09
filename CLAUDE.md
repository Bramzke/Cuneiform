# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React application that converts decimal numbers into Babylonian cuneiform notation. The Babylonians used a sexagesimal (base-60) number system, and this app demonstrates how decimal numbers are converted and displayed using authentic cuneiform symbols.

**Recent Refactoring:** This codebase has undergone a comprehensive Clean Code refactoring following industry best practices, including:
- Extraction of business logic into utilities
- Separation of concerns (components, utilities, configuration)
- Removal of magic numbers and hard-coded values
- CSS Modules for styling instead of inline styles
- Comprehensive TypeScript type annotations
- English-only documentation

## Development Commands

```bash
npm run dev      # Start Vite development server at http://localhost:5173
npm run build    # Create production build in dist/
npm run lint     # Run ESLint on src/ files
npm run preview  # Preview production build locally
```

## Technology Stack

- **React 19.1.1** with TypeScript
- **Vite 7.0.5** for build tooling and dev server
- **TypeScript 5.7.3** with strict mode enabled
- **ESLint 9.17.0** for code linting
- **CSS Modules** for component-scoped styling

## Architecture

### Project Structure

```
src/
├── components/
│   ├── BabylonianDigit/
│   │   ├── BabylonianDigit.tsx       # Main digit display component
│   │   ├── BabylonianDigit.module.css # Component styles
│   │   └── index.ts                   # Barrel export
│   └── symbols/
│       ├── OneSymbol.tsx              # SVG: vertical wedge (1)
│       ├── TenSymbol.tsx              # SVG: angular wedge (10)
│       ├── ZeroSymbol.tsx             # SVG: horizontal wedge (0)
│       └── index.ts                   # Barrel export
├── config/
│   └── constants.ts                   # All configuration constants
├── utils/
│   ├── babylonianConverter.ts         # Decimal to base-60 conversion
│   └── symbolLayout.ts                # Symbol distribution logic
├── App.tsx                             # Main application component
├── App.css                             # App-level styles
├── main.tsx                            # React entry point
└── index.css                           # Global styles
```

### Component Hierarchy

```
App (src/App.tsx)
  └─ BabylonianDigit (src/components/BabylonianDigit/)
       ├─ OneSymbol (src/components/symbols/OneSymbol.tsx)
       ├─ TenSymbol (src/components/symbols/TenSymbol.tsx)
       └─ ZeroSymbol (src/components/symbols/ZeroSymbol.tsx)
```

### Data Flow

1. **User Input** → App component state (`decimalNumber`)
2. **Conversion** → `convertToBase60(decimalNumber)` → array of base-60 digits
3. **Rendering** → Each digit rendered by `BabylonianDigit` component
4. **Symbol Layout** → Layout utilities calculate symbol distribution
5. **Display** → SVG symbols rendered in rows based on layout

## Domain Knowledge: Babylonian Number System

The Babylonians used base-60 (sexagesimal) positional notation, similar to how we use base-10 (decimal). This system is why we still have 60 seconds in a minute and 60 minutes in an hour.

**Key Concepts:**
- Each position represents a power of 60 (rightmost = 60⁰, next = 60¹, etc.)
- Within each position, numbers 1-59 are represented by combinations of two symbols
- The "one" symbol (vertical wedge) represents units 1-9
- The "ten" symbol (angular wedge) represents tens 10-50
- Zero handling is a modern convenience (historical Babylonian notation used spaces)

**Example Conversion:**
- Decimal `3661` → Base-60 `[1, 1, 1]` → (1×60² + 1×60¹ + 1×60⁰)
- Decimal `59` → Base-60 `[59]` → 5 tens + 9 ones
- Decimal `3600` → Base-60 `[1, 0, 0]` → 1 in 60² position

## Code Architecture Details

### Configuration (src/config/constants.ts)

All magic numbers and configuration values are centralized here:
- `BABYLONIAN_CONFIG`: Base system (60), default values, validation rules
- `LAYOUT_THRESHOLDS`: Symbol distribution rules (3 per row, 6 for two rows, etc.)
- `CUNEIFORM_STYLES`: Colors, dimensions, spacing (used by CSS variables)

**Why:** Single source of truth, easy to modify behavior, testable configuration

### Business Logic (src/utils/)

**babylonianConverter.ts:**
- `convertToBase60(decimalNumber)`: Converts decimal to base-60 digit array
- `isValidBabylonianInput(value)`: Validates user input
- Pure functions, fully documented with JSDoc

**symbolLayout.ts:**
- `separateDigit(digit)`: Splits 0-59 digit into tens (0-5) and ones (0-9)
- `calculateTensLayout(tensCount)`: Returns row configuration for tens
- `calculateOnesLayout(onesCount)`: Returns row configuration for ones
- Returns structured layout data (row count, CSS class, symbols per row)

**Why:** Separation of concerns, testability, reusability, DRY principle

### Components (src/components/)

**BabylonianDigit:**
- Displays a single base-60 digit (0-59) using cuneiform symbols
- Uses layout utilities for symbol distribution
- Implements two-column layout (tens left, ones right)
- CSS Module for styling (no inline styles)
- ~85 lines (reduced from 150+ after refactoring)

**Symbol Components:**
- Pure presentational SVG components
- Use `currentColor` to inherit parent color
- Fully documented with JSDoc
- Each represents a specific cuneiform wedge shape

**Why:** Single responsibility, testable, maintainable, reusable

### Styling Approach

**CSS Modules** (BabylonianDigit.module.css):
- Component-scoped styles (no global namespace pollution)
- CSS variables for theming (--cuneiform-bg, --cuneiform-border, etc.)
- No runtime style injection (better performance)
- Proper separation of concerns

**CSS Classes:**
- `.babylonianDigitContainer`: Main container (100×80px)
- `.tensBlock` / `.onesBlock`: Two-column layout
- `.rows1` / `.rows2` / `.rows3`: Grid template configurations
- `.symbolRow`: Individual row with symbols

**Why:** Performance, maintainability, theming support, standard practices

## Symbol Layout Logic

The symbol layout follows historical Babylonian conventions:

**Tens (0-5 symbols):**
- 0 symbols: Empty
- 1-3 symbols: Single row
- 4-5 symbols: Two rows (split evenly)

**Ones (0-9 symbols):**
- 0 symbols: Empty
- 1-3 symbols: Single row
- 4-6 symbols: Two rows (3 + remainder)
- 7-9 symbols: Three rows (3 + 3 + remainder)

**Implementation:** See `src/utils/symbolLayout.ts`

## Clean Code Principles Applied

1. **DRY (Don't Repeat Yourself)**: Layout logic extracted into reusable utilities
2. **Single Responsibility**: Each module has one clear purpose
3. **Separation of Concerns**: Components, logic, styling, and config are separated
4. **No Magic Numbers**: All constants extracted to configuration
5. **Self-Documenting Code**: Clear naming + JSDoc comments
6. **Type Safety**: Explicit TypeScript interfaces and type annotations
7. **Testability**: Pure functions, dependency injection, modular design

## Working with This Codebase

### Modifying the Conversion Logic
- Edit `src/utils/babylonianConverter.ts`
- Update `BABYLONIAN_CONFIG.BASE` to change number system
- Add tests for new conversion logic

### Changing Symbol Layout Rules
- Edit `src/utils/symbolLayout.ts`
- Modify `LAYOUT_THRESHOLDS` for different row distributions
- Update `calculateTensLayout` or `calculateOnesLayout` functions

### Adjusting Visual Appearance
- Colors/dimensions: Edit `src/config/constants.ts` → CSS variables in module
- Symbol shapes: Edit SVG paths in `src/components/symbols/*.tsx`
- Container size: Modify `CUNEIFORM_STYLES.CONTAINER` constants

### Adding New Features
- Input validation: `src/utils/babylonianConverter.ts`
- New components: Follow structure in `src/components/`
- New number systems: Create parallel converter + display component

## TypeScript Configuration

- **Strict mode enabled**: Full type checking, no implicit any
- **Path aliases**: `@/` maps to `./src/` (configure if needed)
- **Separate configs**:
  - `tsconfig.app.json`: Application code
  - `tsconfig.node.json`: Vite configuration

## Performance Considerations

- CSS Modules loaded once (not re-injected per component)
- Pure function memoization opportunities in layout calculations
- SVG components are lightweight (no external images)
- Symbol rendering scales linearly with digit count

## Testing Recommendations

While tests aren't currently implemented, the refactored structure makes testing straightforward:

```typescript
// Example test structure
describe('convertToBase60', () => {
  it('converts 3661 to [1, 1, 1]', () => {
    expect(convertToBase60(3661)).toEqual([1, 1, 1]);
  });
});

describe('calculateOnesLayout', () => {
  it('returns single row for 3 symbols', () => {
    const layout = calculateOnesLayout(3);
    expect(layout.rowCount).toBe(1);
    expect(layout.symbolsPerRow).toEqual([3]);
  });
});
```

## Common Tasks

**Change default number:**
```typescript
// src/config/constants.ts
export const BABYLONIAN_CONFIG = {
  DEFAULT_NUMBER: 123, // Change this value
  ...
}
```

**Change color scheme:**
```css
/* src/components/BabylonianDigit/BabylonianDigit.module.css */
:root {
  --cuneiform-bg: #your-color;
  --cuneiform-border: #your-color;
  --cuneiform-symbol-color: #your-color;
}
```

**Add validation:**
```typescript
// src/utils/babylonianConverter.ts
export const BABYLONIAN_CONFIG = {
  MAX_NUMBER: 10000, // Add this
  ...
}

// Update isValidBabylonianInput to check MAX_NUMBER
```

## Migration Notes

If working with older versions of this codebase:
- Inline styles have been moved to CSS Modules
- German comments have been translated to English
- Conversion logic has been extracted from App.tsx
- Layout logic has been extracted from BabylonianDigit.tsx
- File structure has been reorganized into feature folders
- Magic numbers have been extracted to constants
