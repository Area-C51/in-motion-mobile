// this hook returns the current color scheme from React Native, either "light" or "dark"
// imported and used in custom hooks (useThemeColor) so that components always know whether to use light or dark colors

// export { useColorScheme } from 'react-native';

// replace existing useColorScheme to read From ThemeProvider
import { useColorScheme as useSystemColorScheme } from 'react-native';
import { useTheme } from '@/contexts/ThemeProvider';

export function useColorScheme() {
  const { theme } = useTheme();
  const systemTheme = useSystemColorScheme() ?? 'light';
  console.log("useColorScheme hook returns:", theme === 'system' ? systemTheme : theme);

  return theme === 'system' ? systemTheme : theme;
}
