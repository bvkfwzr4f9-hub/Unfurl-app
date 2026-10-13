/**
 * Unfurl typography
 * Elegant serif (Playfair Display) for headlines and emotional emphasis —
 * matches the deck's editorial italic headlines.
 * Clean sans (Inter) for body text and UI — matches the deck's supporting copy.
 */

export const fontFamily = {
  serif: 'PlayfairDisplay_600SemiBold',
  serifItalic: 'PlayfairDisplay_600SemiBold_Italic',
  serifBold: 'PlayfairDisplay_700Bold',
  sans: 'Inter_400Regular',
  sansMedium: 'Inter_500Medium',
  sansSemiBold: 'Inter_600SemiBold',
  sansBold: 'Inter_700Bold',
} as const;

// Type scale — mirrors the deck's hierarchy (large stat numbers, editorial
// headlines, quiet body copy)
export const type = {
  display: {
    fontFamily: fontFamily.serifBold,
    fontSize: 32,
    lineHeight: 38,
  },
  h1: {
    fontFamily: fontFamily.serif,
    fontSize: 24,
    lineHeight: 30,
  },
  h2: {
    fontFamily: fontFamily.serif,
    fontSize: 19,
    lineHeight: 25,
  },
  h3: {
    fontFamily: fontFamily.sansSemiBold,
    fontSize: 15,
    lineHeight: 20,
  },
  statNumber: {
    fontFamily: fontFamily.serifBold,
    fontSize: 30,
    lineHeight: 34,
  },
  bodyLarge: {
    fontFamily: fontFamily.sans,
    fontSize: 16,
    lineHeight: 23,
  },
  body: {
    fontFamily: fontFamily.sans,
    fontSize: 14,
    lineHeight: 20,
  },
  bodySmall: {
    fontFamily: fontFamily.sans,
    fontSize: 12.5,
    lineHeight: 18,
  },
  caption: {
    fontFamily: fontFamily.sansMedium,
    fontSize: 11,
    lineHeight: 15,
    letterSpacing: 0.4,
  },
  button: {
    fontFamily: fontFamily.sansSemiBold,
    fontSize: 15,
    lineHeight: 19,
  },
} as const;
