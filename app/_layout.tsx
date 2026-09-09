import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import { useAppFonts } from '@/theme/useAppFonts';
import { colors } from '@/theme';

export default function RootLayout() {
  const fontsLoaded = useAppFonts();

  if (!fontsLoaded) {
    // Fonts loading — return a plain themed background rather than a blank
    // white flash. Swap for a proper splash/logo screen later.
    return <View style={{ flex: 1, backgroundColor: colors.forestDark }} />;
  }

  return (
    <>
      <StatusBar style="dark" />
      <Stack screenOptions={{ headerShown: false }} />
    </>
  );
}
