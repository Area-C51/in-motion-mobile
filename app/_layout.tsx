import { useEffect } from 'react';
import { View } from 'react-native';
import { DarkTheme, DefaultTheme, ThemeProvider as NavThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context'; // ensures app content is positioned correctly, accounting for built in device interface elements, e.g., notches, status bars, home indicators, etc.
// issue with rendering using SafeAreaView component, but not with useSafeAreaInsets hook
import 'react-native-reanimated';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useTheme } from '@/hooks/useTheme'
import { ThemeProvider } from '@/contexts/ThemeProvider';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({ SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf') });

  useEffect(() => {
    if (loaded) SplashScreen.hideAsync();
  }, [loaded]);

  if (!loaded) return null;

  return (
    <ThemeProvider>
      <App />
    </ThemeProvider>
  );
}

function App() {
  const theme = useColorScheme();
  const insets = useSafeAreaInsets();

  return (
    // <SafeAreaView> // this method does not seem to work well with this app
    <View style={{ flex: 1, paddingTop: insets.top, backgroundColor: theme === 'light' ? 'white' : 'black' }}>
      <NavThemeProvider value={theme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          {/* <Stack.Screen name="(imm)" options={{ headerShown: false }} /> */}
          {/* <Stack.Screen name='index' options={{ title: 'Home', headerShown: false }} />
          <Stack.Screen name='explore' options={{ title: 'Explore' }} />
          <Stack.Screen name='contact' options={{ title: 'Contact Us' }} /> */}
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style={/*"auto"*/theme === 'dark' ? 'light' : 'dark'} />
      </NavThemeProvider>
    </View>
    // </SafeAreaView>
  );
}
