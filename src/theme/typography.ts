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
    fontSize: 40,
    lineHeight: 46,
  },
  h1: {
    fontFamily: fontFamily.serif,
    fontSize: 28,
    lineHeight: 34,
  },
  h2: {
    fontFamily: fontFamily.serif,
    fontSize: 22,
    lineHeight: 28,
  },
  h3: {
    fontFamily: fontFamily.sansSemiBold,
    fontSize: 17,
    lineHeight: 23,
  },
  statNumber: {
    fontFamily: fontFamily.serifBold,
    fontSize: 36,
    lineHeight: 40,
  },
  bodyLarge: {
    fontFamily: fontFamily.sans,
    fontSize: 17,
    lineHeight: 25,
  },
  body: {
    fontFamily: fontFamily.sans,
    fontSize: 15,
    lineHeight: 22,
  },
  bodySmall: {
    fontFamily: fontFamily.sans,
    fontSize: 13,
    lineHeight: 19,
  },
  caption: {
    fontFamily: fontFamily.sansMedium,
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.4,
  },
  button: {
    fontFamily: fontFamily.sansSemiBold,
    fontSize: 16,
    lineHeight: 20,
  },
} as const;
