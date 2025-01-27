// rnfe -> reactNativeFunctionalExportComponent

import { View, Text, StyleSheet, ImageBackground } from 'react-native'
// import React from 'react'
import immBackground from '@/assets/images/in-motion-orangegold-icon.png'

const App = () => {
  return (
    <View style={styles.mainContainer}>
      <ImageBackground
        source={immBackground}
        resizeMode='cover'
        style={styles.backgroundImage}
      >
      <Text style={styles.headerText}>In Motion Mobile</Text>
      </ImageBackground>
    </View>
  )
}

export default App

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    color: 'black',
    fontSize: 42,
    fontWeight: 'bold',
    textAlign: 'center',
    // backgroundColor: 'rgba(0,0,0,0.5)',
  }
})