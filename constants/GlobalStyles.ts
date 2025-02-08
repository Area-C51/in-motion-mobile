import { Dimensions, StyleSheet } from 'react-native';
import { Colors } from '@/constants/Colors'

const { width, height } = Dimensions.get('window');

export const GlobalStyles = StyleSheet.create({
  // Layout
  mainContainer: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    top: 35, // space for the status bar on mobile
  },


  displayRow: {
    flexDirection: 'row',
    height: 'auto',
    width: '100%',
    // alignItems: 'center',
    // justifyContent: 'space-between',
  },
  // center: {
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // },
  displayCard: {
    paddingLeft: 20,
    justifyContent: 'center',
  },
  display: { // will hold images eventually and no text
    height: width * 0.4,
    width: width * 0.4,
    fontSize: 16, // placeholder
    color: 'white', // placeholder
    borderRadius: 10,
    textAlign: 'justify', // placeholder
    padding: 10, // placeholder
    backgroundColor: 'rgba(0, 0, 0, 0.7)', // placeholder
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 15,
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

// function to generate theme-dependent styles
export const getGlobalStyles = (theme: 'light' | 'dark') =>
  StyleSheet.create({
    // container: {
    //   backgroundColor: Colors[theme].background,
    // },
    card: {
      backgroundColor: Colors[theme].cardBackground,
      borderColor: Colors[theme].border,
      borderWidth: 1,
      borderRadius: 10,
      padding: 10,
    },
    placeholder: { // used when list content does not exist, i.e., exercise and workout search results
      top: height * 0.1,
      // fontSize: scaleFontSize(18), // relative to screen width
      fontSize: 22,
      fontWeight: '800',
      color: Colors[theme].header,
      padding: 6,
      textAlign: 'center',
    },
  
    header: {
      fontSize: 22,
      fontWeight: '800',
      color: Colors[theme].header,
      paddingLeft: 20,
    },
    title: {
      fontSize: 16,
      fontWeight: '700',
      color: Colors[theme].subText,
    },
  });
