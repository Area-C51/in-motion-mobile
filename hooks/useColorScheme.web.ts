// Hydration, the process where client-side JavaScript takes over a pre-rendered HTML page (initial static render (server-side rendering, a.k.a., static site generation (SSG)))
// re: web.ts, platform-specific behavior is enabled by tools like Metro (for React Native) and Webpack (for React-based web applications), which know how to prioritize and resolveplatform-specific extensions (.ts vs .web.ts)

import { useEffect, useState } from 'react';
import { useColorScheme as useRNColorScheme } from 'react-native'; // aliasing to avoid naming conflicts between custon hook and RN hook
import { useTheme } from '@/hooks/useTheme';

/**
 * To support static rendering, this value needs to be re-calculated on the client side for web
 */
export function useColorScheme() {
  const [hasHydrated, setHasHydrated] = useState(false); // handle hydration for static rendering, tracks whether the component has been fully hydrated (i.e., the JavaScript has finished loading on the client-side)
  // needed on web because React may render static HTML without the full JavaScript context, thus it needs to determine the final color scheme only after the client-side JS takes over

  const { theme } = useTheme(); // checks the theme from custom ThemeProvider, allows for user set theme
  const systemTheme = useRNColorScheme() ?? 'light'; // checks the system's current color scheme with RN hook, useColorScheme as useRNColorScheme; defaults to 'light'
  // const colorScheme = useRNColorScheme(); // previously only read from useRNColorScheme/useColorScheme, i.e., the system theme

  // ensures that the application correctly handles hydration by setting a hasHydrated flag only once, after the component has mounted on the client
  useEffect(() => {
    setHasHydrated(true);
  }, []);

  if (hasHydrated) return theme === 'system' ? systemTheme : theme;

  return 'light'; // default to light before hydration
}
