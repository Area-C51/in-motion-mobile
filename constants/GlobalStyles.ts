import { StyleSheet } from 'react-native';
import { Colors } from '@/constants/Colors'

export const GlobalStyles = StyleSheet.create({
  // Layout
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Spacing
  paddingSmall: {
    padding: 8,
  },
  paddingMedium: {
    padding: 16,
  },
  paddingLarge: {
    padding: 24,
  },
  marginSmall: {
    margin: 8,
  },
  marginMedium: {
    margin: 16,
  },
  marginLarge: {
    margin: 24,
  },

  // Borders & Shadows
  borderRadiusSmall: {
    borderRadius: 5,
  },
  borderRadiusMedium: {
    borderRadius: 10,
  },
  borderRadiusLarge: {
    borderRadius: 15,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // Android shadow
  },

  // Typography (Excluding Colors)
  textDefault: {
    fontSize: 16,
    fontWeight: '400',
  },
  textBold: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  textLarge: {
    fontSize: 20,
    fontWeight: '600',
  },
});

// Function to generate theme-dependent styles
export const getGlobalStyles = (theme: 'light' | 'dark') =>
  StyleSheet.create({
    container: {
      backgroundColor: Colors[theme].background, // Theme-aware background
    },
    card: {
      backgroundColor: Colors[theme].cardBackground, // Theme-aware card
      borderColor: Colors[theme].border, // Theme-aware border
      borderWidth: 1,
      borderRadius: 10,
      padding: 10,
    },
    header: {
      fontSize: 22,
      fontWeight: '800',
      color: Colors[theme].header, // Theme-aware header color
      paddingLeft: 20,
    },
    title: {
      fontSize: 16,
      fontWeight: '700',
      color: Colors[theme].text, // Theme-aware text color
    },
  });
