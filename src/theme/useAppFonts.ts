import {
  useFonts as usePlayfairFonts,
  PlayfairDisplay_600SemiBold,
  PlayfairDisplay_600SemiBold_Italic,
  PlayfairDisplay_700Bold,
} from '@expo-google-fonts/playfair-display';
import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
} from '@expo-google-fonts/inter';

/**
 * Loads all fonts the design system references (see theme/typography.ts).
 * Returns `true` once ready — gate your root layout's render on this,
 * e.g.:
 *   const fontsLoaded = useAppFonts();
 *   if (!fontsLoaded) return null; // or a splash/loading screen
 */
export function useAppFonts(): boolean {
  const [loaded] = usePlayfairFonts({
    PlayfairDisplay_600SemiBold,
    PlayfairDisplay_600SemiBold_Italic,
    PlayfairDisplay_700Bold,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });
  return loaded;
}
