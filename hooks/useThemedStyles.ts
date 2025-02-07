// generates a dynamic, centralized, reusable StyleSheet that updates automatically based on the theme, whenever it changes, from the context; StyleSheets declared in each file is otherwise static
// uses useContext to access the current theme (from ThemeContext)
// uses useMemo to generate a StyleSheet based on the theme, when theme changes, the memoized style object is re-created
// returns styles using colors from the centralized Colors file

import { useContext, useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { ThemeContext, ThemeType } from '@/contexts/ThemeContext';
import { Colors } from '@/constants/Colors';

export const useThemedStyles = () => {
  const { theme } = useContext(ThemeContext);

  // Memoize the StyleSheet so it only re-creates when 'theme' changes.
  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          flex: 1,
          backgroundColor: Colors[theme].background,
          alignItems: 'center',
          justifyContent: 'center',
        },
        title: {
          fontSize: 24,
          color: Colors[theme].text,
          marginBottom: 20,
        },
        box: {
          width: '80%',
          height: 150,
          borderWidth: 2,
          borderColor: Colors[theme].border,
          borderRadius: 10,
          alignItems: 'center',
          justifyContent: 'center',
        },
        boxText: {
          fontSize: 16,
          color: Colors[theme].text,
        },
      }),
    [theme]
  );

  return styles;
};
