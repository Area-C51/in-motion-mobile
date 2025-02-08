import { useEffect, useState } from 'react';
import { useColorScheme as useRNColorScheme } from 'react-native';
import { useTheme } from '@/contexts/ThemeProvider';

/**
 * To support static rendering, this value needs to be re-calculated on the client side for web
 */
export function useColorScheme() {
  const [hasHydrated, setHasHydrated] = useState(false); // handle hydration for static rendering

  const { theme } = useTheme(); // read from ThemeProvider
  const systemTheme = useRNColorScheme() ?? 'light';
  // const colorScheme = useRNColorScheme(); // previously only read from useRNColorScheme/useColorScheme, i.e., the system theme

  useEffect(() => {
    setHasHydrated(true);
  }, []);


  if (hasHydrated) {
    return theme === 'system' ? systemTheme : theme;;
  }

  return 'light'; // default to light before hydration
}
