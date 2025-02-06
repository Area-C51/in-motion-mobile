import React from 'react';
import { Dimensions, ImageBackground, StyleSheet, Text, View } from 'react-native';
import immBackground from '@/assets/images/in-motion-orangegold-icon.png';

const { width, height } = Dimensions.get('window');

export default function Workout() {
  return (
    <View style={styles.mainContainer}>
      <ImageBackground
        source={immBackground} // image as a placeholder until search results returned, default to light or dark theme after
        resizeMode='cover'
        style={styles.backgroundImage}
      >
        <View style={styles.workoutsContainer}>
          <Text style={[styles.text, {fontWeight: 800}]}>Where workouts go to workout</Text>
          <Text style={styles.text}>* Search button vs bar</Text>
          <Text style={styles.text}>* Edit button (to delete exercises with a modal prompt to confirm)</Text>
          <Text style={styles.text}>* Sort menu toggle (need a modal for options) and grid/list view button</Text>
          <Text style={styles.text}>* Containers/cards for each workout</Text>
          <Text style={styles.text}>* Workouts open as a modal/component with X button to exit back</Text>
          <Text style={styles.text}>* Drag and drop to rearrange exercise order</Text>
        </View>
      </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create ({
  mainContainer: {
    flex: 1,
    flexDirection: 'column',
    // backgroundColor: 'white',
  },
  backgroundImage: {
    height: Math.min(width, height),
    width: Math.min(width, height),
    backgroundColor: 'black',
    resizeMode: 'cover',
    justifyContent: 'center',
    transform: [{ translateY: width * 0.5 }],
  },
  workoutsContainer: {
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
  },
  text: {
    fontSize: 18,
    color: 'white',
    padding: 5,
  },
}) 