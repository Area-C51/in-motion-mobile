// rnfe -> reactNativeFunctionalExportComponent
import React from 'react';
import { Dimensions, ImageBackground, Pressable, ScrollView , StyleSheet, Text, View } from 'react-native';
import { Link } from 'expo-router';
import immBackground from '@/assets/images/in-motion-orangegold-icon.png';

const { width, height } = Dimensions.get('window');

const mockRow1 = [['Title1.1', `Row of side scrolling workouts`], ['Title1.2', `With Title and random 1x1 ratio exercise image in the workout`], ['Title1.3', `If no workouts`], ['Title1.4', `Display Title as 'Add New Workout' and a 1x1 icon of a + in place of an image`], ['Title1.5', 'lorem ipsum dolor sit amet']];
const mockRow2 = [['Title2.1', `Row of 10 side scrolling random or even suggested exercises`], ['Title2.2', `With Title and 1x1 image`], ['Title2.3', `11th element is Titled 'Refresh for More'`], ['Title2.4', `And a 1x1 icon of a 'refresh' icon in place of an image`], ['Title2.5', `Which reloads 10 exercises (that were not just displayed)`]];

const App = () => {
  return (
    <View style={styles.mainContainer}>
      <ImageBackground
        source={immBackground}
        resizeMode='cover'
        style={styles.backgroundImage}
      >
        <View style={styles.displayContainer}>
          <Text style={styles.header}>Recent Workouts</Text>
          <ScrollView horizontal style={styles.displayRow}>
              {mockRow1.map((el, index) =>
                <View key={`row1-${index}`} style={styles.displayCard}>
                  <Text style={styles.ideas}>{el[1]}</Text>
                  <Text style={styles.title}>{el[0]}</Text>
                </View>
              )}
          </ScrollView>
        </View>
        <View style={styles.displayContainer}>
          <Text style={styles.header}>Fresh Finds</Text>
          <ScrollView horizontal style={styles.displayRow}>
            {mockRow2.map((el, index) =>
              <View key={`row2-${index}`} style={styles.displayCard}>
                <Text style={styles.ideas}>{el[1]}</Text>
                <Text style={styles.title}>{el[0]}</Text>
              </View>
            )}
          </ScrollView>
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
    // backgroundColor: 'white',
  },
  backgroundImage: {
    height: Math.min(width, height),
    width: Math.min(width, height),
    resizeMode: 'cover',
    justifyContent: 'center',
    transform: [{ translateY: width * 0.5 }],
  },
  displayContainer: {
    // borderWidth: 1,
    paddingVertical: 20,
  },
  header: {
    fontSize: 22,
    fontWeight: '800',
    // borderWidth: 1,
    paddingLeft: 20,
  },
  displayRow: {
    flexDirection: 'row',
    height: 'auto',
    width: '100%',
    // borderWidth: 1,
    // overflow: 'scroll', // enforce scroll behavior, replaced with movile compatible ScrollView
  },
  displayCard: {
    paddingLeft: 20,
    justifyContent: 'center',
  },
  ideas: {
    height: width * 0.4,
    width: width * 0.4,
    fontSize: 16,
    color: 'white',
    borderRadius: 10,
    textAlign: 'justify',
    padding: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 15,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: 'rgb(120, 120, 120)',
  },
})