// rnfe -> reactNativeFunctionalExportComponent
import React from 'react';
import { Dimensions, ImageBackground, Pressable, StyleSheet, Text, View } from 'react-native';
import { Link } from 'expo-router';
import immBackground from '@/assets/images/in-motion-orangegold-icon.png';

const { width, height } = Dimensions.get('window');

const mockRow1 = [['Title1.1', `Row of side scrolling workouts with Title and random 1x1 ratio exercise image in the workout.`], ['Title1.2', `If no workouts, display Title as 'Add New Workout' and a 1x1 icon of a + in place of an image.`]];
const mockRow2 = [['Title2.1', `Row of 10 side scrolling random or even suggested exercises with Title and 1x1 image.`], ['Title2.2', `11th element is Titled 'Refresh for More' and a 1x1 icon of a 'refresh' icon in place of an image, which reloads 10 exercises (that were not just displayed).`]];

const App = () => {
  return (
    <View style={styles.mainContainer}>
      <ImageBackground
        source={immBackground}
        resizeMode='cover'
        style={styles.backgroundImage}
      >
        <View style={styles.displayRow}>
          {mockRow1.map((el, index) =>
            <>
              <Text key={`row1-${index}`} style={styles.title}>{el[0]}</Text>
              <Text key={`row1-${index}`} style={styles.ideas}>{el[1]}</Text>
            </>
          )}
        </View>
        <View style={styles.displayRow}>
          {mockRow2.map((el, index) =>
          <>
            <Text key={`row2-${index}`} style={styles.title}>{el[0]}</Text>
            <Text key={`row2-${index}`} style={styles.ideas}>{el[1]}</Text>
          </>
          )}
        </View>
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
    // flex: 1,
    height: Math.min(width, height),
    width: Math.min(width, height),
    // backgroundColor: 'white',
    resizeMode: 'cover',
    alignItems: 'center',
    justifyContent: 'center',
    transform: [{ translateY: width * 0.5 }],
  },
  displayRow: {
    flexDirection: 'row',
    height: height * 0.3,
    width: width * 0.9,
  },
  title: {

  },
  ideas: {
    height: height * 0.2,
    aspectRatio: 1,
    fontSize: 20,
    color: 'white',
    borderRadius: 10,
    // textAlign: 'justify',
    padding: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    marginTop: 50,
  },
})