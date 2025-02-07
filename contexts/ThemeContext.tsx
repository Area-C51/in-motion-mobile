// acts as the single source for defining the current app theme and allows users to override the device’s theme
// sets up a React context to hold the current theme (“light” or “dark”) and an override flag with functions to change the theme
// ThemeProvider wraps the app root with with <ThemeProvider>…</ThemeProvider> so that any component can access the theme
// it uses the device’s theme by default (via Appearance.getColorScheme()), but if the user toggles an override, the app uses the override value

import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { Appearance } from 'react-native';

export type ThemeType = 'light' | 'dark';

interface ThemeContextValue {
  theme: ThemeType;
  override: boolean; // indicates if the user has overridden the system default
  setTheme: (theme: ThemeType) => void;
  toggleOverride: () => void;
}

export const ThemeContext = createContext<ThemeContextValue>({
  theme: 'light',
  override: false,
  setTheme: () => {},
  toggleOverride: () => {},
});

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  // Start with the device's color scheme.
  const defaultTheme = Appearance.getColorScheme() || 'light';
  const [theme, setTheme] = useState<ThemeType>(defaultTheme);
  const [override, setOverride] = useState(false);

  // Listen for system theme changes if the user hasn’t overridden it.
  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      if (!override && colorScheme) {
        setTheme(colorScheme);
      }
    });
    return () => subscription.remove();
  }, [override]);

  const toggleOverride = () => {
    setOverride(prev => !prev);
  };

  return (
    <ThemeContext.Provider value={{ theme, override, setTheme, toggleOverride }}>
      {children}
    </ThemeContext.Provider>
  );
};
