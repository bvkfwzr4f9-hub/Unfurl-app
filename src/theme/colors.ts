/**
 * Unfurl color palette
 * Matches the brand deck: deep forest green, warm cream, sage accents,
 * warm brown/wood tones. Grounded and quiet — never clinical, never "pink femtech."
 */

export const colors = {
  // Deep forest green — primary dark background (hero sections, closing screens)
  forestDark: '#16241B',
  forestDeep: '#1E3226',
  forest: '#2A4534',

  // Warm cream — primary light background (cards, content screens)
  cream: '#F1EBDD',
  creamLight: '#F8F4EB',
  creamDark: '#E8DFCB',

  // Sage — accent color for stat numbers, highlights, active states
  sage: '#9FB98F',
  sageLight: '#C3D4B8',
  sageDark: '#6E8B60',

  // Warm brown / wood — secondary accent, borders, muted text
  woodBrown: '#6B5D4F',
  woodLight: '#A89A87',

  // Text
  ink: '#1F2A20',           // primary text on light backgrounds
  inkMuted: '#4A5548',      // secondary text on light backgrounds
  cream100: '#FDFBF6',      // primary text on dark backgrounds
  creamMuted: '#C9C2B0',    // secondary text on dark backgrounds

  // Functional
  white: '#FFFFFF',
  error: '#B3543F',
  success: '#6E8B60',
  border: '#DCD3BE',
  borderDark: '#3A4E3F',

  // Overlays
  overlayDark: 'rgba(22, 36, 27, 0.55)',
  overlayLight: 'rgba(241, 235, 221, 0.9)',
} as const;

export type ColorToken = keyof typeof colors;
