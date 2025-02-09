// custom hook that, returns the current user theme (light, dark, or system setting) based on context from ThemeProvider
// used because it's necessary in web app versions due to hydration concerns
// imported and used in custom hooks (useThemeColor) so that components always know whether to use light or dark colors

// replace existing useColorScheme to read From ThemeProvider
import { useColorScheme as useSystemColorScheme } from 'react-native'; // aliasing to avoid naming conflicts between custon hook and RN hook 
import { useTheme } from '@/contexts/ThemeProvider';

export function useColorScheme() {
  const { theme } = useTheme(); // checks the theme from custom ThemeProvider, allows for user set theme 
  const systemTheme = useSystemColorScheme() ?? 'light'; // checks the system's current color scheme with RN hook, useColorScheme as useSystemColorScheme; defaults to 'light'

  return theme === 'system' ? systemTheme : theme; // if theme is 'system', returns systemTheme, else returns user theme
}
