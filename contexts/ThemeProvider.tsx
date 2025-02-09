// sets up a context provider to manage and store the app's theme preference (light, dark, or system) using React's Context API (ThemeProvider)
// the context allows components throughout the app to access the current theme (ThemeContext)
// also persists the theme preference across app sessions using AsyncStorage

import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type Theme = 'light' | 'dark' | 'system';

interface ThemeContextProps {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

export const ThemeContext = createContext<ThemeContextProps | undefined>(undefined); // uses createContext function to create a ThemeContext, which holds the current theme ('light', 'dark', or 'system') and a method to update it (setTheme)
// initially set to undefined, later used with a provider (ThemeProvider)

// ThemeProvider, a React component that uses the context to provide the theme and a method to update it to all child components
// it’s wrapped around the root of the app (or parts of it), /app/_layout.tsx, to make the theme and its setter globally accessible
export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>('system'); // holds the theme state with useState, default to 'system' theme setting

  // load theme from local storage (AsyncStorage) when the app starts
  useEffect(() => {
    const loadTheme = async () => {
      try{
        const storedTheme = await AsyncStorage.getItem('app-theme');
        // console.log("Loaded theme from storage:", storedTheme); // for debugging
        if (storedTheme) setTheme(storedTheme as Theme); // if no storedTheme, theme remains as default of 'system'
      } catch (error) {
        console.error('Failed to load theme preference', error);
      }
    };
    loadTheme();
  }, []);

  // update/save current theme in both state and AsyncStorage, allows preference to persist between app sessions
  const updateTheme = async (newTheme: Theme) => {
    try {
      await AsyncStorage.setItem('app-theme', newTheme);
      setTheme(newTheme);
      // console.log("Updated theme:", newTheme); // for debugging
    } catch (error) {
      console.error('Failed to save theme preference', error);
    }
  };

  // with ThemeContext.Provider, ThemeProvider wraps its children, allows child components access to the current theme
  return (
    <ThemeContext.Provider value={{ theme, setTheme: updateTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
