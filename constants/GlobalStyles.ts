import { Dimensions, StyleSheet } from 'react-native';
import { Colors } from '@/constants/Colors'

const { width, height } = Dimensions.get('window');

export const SwitchColors = { // may not be used due to lack of uniformity across platforms
  thumbOn: 'rgb(48, 96, 215)', // Colors 'detail'
  thumbOff: 'rgb(242, 242, 242)',
  trackOn: 'rgb(0, 175, 255)', // Colors 'detail2'
  trackOff: 'rgb(174, 174, 174)',
};

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
    // fontSize: 16, // placeholder, defaults to type={'text'}
    // color: 'white', // placeholder, defaults to type={'text'}
    borderWidth: 1, // placeholder before images
    borderColor: 'white', // placeholder before images
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
export const getGlobalStyles = (theme: 'light' | 'dark') => {
  const styles = StyleSheet.create({
    // container: {
    //   backgroundColor: Colors[theme].background,
    // },
    card: {
      backgroundColor: Colors[theme].cardBackground,
      // borderColor: Colors[theme].border,
      borderWidth: 1,
      borderRadius: 10,
      padding: 10,
    },
    searchTextInput: {
      height: 45,
      width: '100%',
      fontSize: 16, // search bar is a set height, thus font is set size
      fontWeight: '400',
      color: Colors[theme].text,
      paddingLeft: 40, // space for the submit button
      paddingRight: 70, // space for the "X" and search menu buttons
      backgroundColor: Colors[theme].cardBackground,
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
    menu: {
      backgroundColor: Colors[theme].cardBackground,
    },
    header: {
      paddingLeft: 20,
    },
  });

  // iconColor is a color value and not a valid style property, needs to be outside of StyleSheet.create()
  // it is instead returned as a separate property
  // allows access to tStyles.iconColor without triggering a type error and avoiding passing iconColor as a prop in components
  return {
    ...styles,
    iconColor: Colors[theme].text, // reuse text theme color to avoid making a new type
    iconColorActive: Colors[theme].tint,
  };
};