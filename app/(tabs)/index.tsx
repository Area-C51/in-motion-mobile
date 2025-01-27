// rnfe -> reactNativeFunctionalExportComponent

import { View, Text, StyleSheet, ImageBackground, Pressable } from 'react-native';
import { Link } from 'expo-router';
// import React from 'react';
import immBackground from '@/assets/images/in-motion-orangegold-icon.png';

const App = () => {
  return (
    <View style={styles.mainContainer}>
      <ImageBackground
        source={immBackground}
        resizeMode='cover'
        style={styles.backgroundImage}
      >
      <Text style={styles.title}>In Motion Mobile</Text>
      <Link href='/explore' style={{ marginHorizontal: 'auto' }} asChild>
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>Explore</Text>
        </Pressable>
      </Link>
      <Link href='/contact' style={{ marginHorizontal: 'auto' }} asChild>
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>Contact Us</Text>
        </Pressable>
      </Link>
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
  title: {
    borderRadius: 10,
    color: 'black',
    fontSize: 42,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: 'rgba(180,20,220,0.5)',
    padding: 6,
    marginBottom: 120,
  },
  link: {
    color: 'black',
    fontSize: 42,
    fontWeight: 'bold',
    textAlign: 'center',
    textDecorationLine: 'underline',
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 4,
  },
  button: {
    height: 30,
    borderRadius: 5,
    justifyContent: 'center',
    backgroundColor: 'rgba(220,20,220,0.75)',
    padding: 0,
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    // textDecorationLine: 'underline',
    // backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 4,
  }
})