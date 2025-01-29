// rnfe -> reactNativeFunctionalExportComponent

import { Dimensions, ImageBackground, Pressable, StyleSheet, Text, View } from 'react-native';
import { Link } from 'expo-router';
// import React from 'react';
import immBackground from '@/assets/images/in-motion-orangegold-icon.png';

const { width, height } = Dimensions.get('window');
// container: {
//   height: height * 0.8, // 80% of the screen height
//   width: width * 0.9, // 90% of the screen width
// },

const App = () => {
  return (
    <View style={styles.mainContainer}>
      <ImageBackground
        source={immBackground}
        resizeMode='cover'
        style={styles.backgroundImage}
      >
        <Text style={styles.ideas}>Grid of 4 buttons for recent workouts?</Text>
        <Text style={styles.ideas}>Random or even suggested exercises?</Text>
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
    width: Math.min(width, height),
    height: Math.min(width, height),
    // backgroundColor: 'white',
    // flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{ translateY: width * 0.5 }],
  },
  ideas: {
    borderRadius: 10,
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 10,
    margin: 10,
    marginTop: 50,
  },
// ideas: {
//   height: height * 0.8,
//   width: width * 0.9,
// },

})