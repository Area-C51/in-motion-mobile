import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type Theme = 'light' | 'dark' | 'system';

interface ThemeContextProps {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

export const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>('system');

  // load theme from AsyncStorage when the app starts
  useEffect(() => {
    const loadTheme = async () => {
      try{
        const storedTheme = await AsyncStorage.getItem('app-theme');
        console.log("Loaded theme from storage:", storedTheme);
        if (storedTheme) setTheme(storedTheme as Theme);
      } catch (error) {
        console.error('Failed to load theme preference', error);
      }
    };
    loadTheme();
  }, []);

  // save theme preference when updated
  const updateTheme = async (newTheme: Theme) => {
    try {
      await AsyncStorage.setItem('app-theme', newTheme);
      setTheme(newTheme);
      console.log("Updated theme:", newTheme);
    } catch (error) {
      console.error('Failed to save theme preference', error);
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme: updateTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
};
