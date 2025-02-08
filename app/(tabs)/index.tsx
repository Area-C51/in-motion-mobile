// rnfe -> reactNativeFunctionalExportComponent
import React from 'react';
import { Dimensions, Pressable, ScrollView , StyleSheet, Text, View } from 'react-native';
import { Link } from 'expo-router';
import { useColorScheme } from '@/hooks/useColorScheme';
import { getGlobalStyles, GlobalStyles as gStyles } from '@/constants/GlobalStyles';
import ThemedText from '@/components/ThemedText';
import ThemedView from '@/components/ThemedView';

const { width, height } = Dimensions.get('window');

const mockRow1 = [
  ['Title1.1', `Row of side scrolling workouts`],
  ['Title1.2', `With Title and random 1x1 ratio exercise image in the workout`],
  ['Title1.3', `If no workouts`],
  ['Title1.4', `Display Title as 'Add New Workout' and a 1x1 icon of a + in place of an image`],
  ['Title1.5', 'lorem ipsum dolor sit amet'],
];
const mockRow2 = [
  ['Title2.1', `Row of 10 side scrolling random or even suggested exercises`],
  ['Title2.2', `With Title and 1x1 image`],
  ['Title2.3', `11th element is Titled 'Refresh for More'`],
  ['Title2.4', `And a 1x1 icon of a 'refresh' icon in place of an image`],
  ['Title2.5', `Which reloads 10 exercises (that were not just displayed)`],
];

const Home = () => {
  const theme = useColorScheme(); // get current theme
  const tStyles = getGlobalStyles(theme); // get theme-aware styles

  return (
    // <ThemedView showDefaultBackgroundImage={true} // needs to check {!selectedWorkout} once that is implemented
    //   style={gStyles.mainContainer}
    // >
    <View style={gStyles.mainContainer}>
      <View style={gStyles.contentContainer}>
        <View style={styles.displayContainer}>
          <ThemedText type={'header'} style={tStyles.header}>Header Header</ThemedText>
          <ScrollView horizontal style={gStyles.displayRow}>
              {mockRow1.map((el, index) =>
                <View key={`row1-${index}`} style={gStyles.displayCard}>
                  {/* <Text style={gStyles.display}>{el[1]}</Text> */}
                  {/* <Text style={tStyles.title}>{el[0]}</Text> */}
                  <ThemedText type={'text'} style={gStyles.display}>Text Text {el[1]}</ThemedText>
                  <ThemedText type={'detail'}>Detail Option 1</ThemedText>
                  <ThemedText type={'detail'}>Detail Option 2</ThemedText>
                  <ThemedText type={'title'}>Title Title {el[0]}</ThemedText>
                  <ThemedText type={'subtitle'}>Subtitle Subtitle</ThemedText>
                  <ThemedText type={'text'}>Text Text</ThemedText>
                  <ThemedText type={'subtext'}>Subtext Subtext</ThemedText>
                </View>
              )}
          </ScrollView>
        </View>
        <View style={styles.displayContainer}>
          <ThemedText type={'header'} style={tStyles.header}>Recent Workouts</ThemedText>
          <ScrollView horizontal style={gStyles.displayRow}>
              {mockRow1.map((el, index) =>
                <View key={`row1-${index}`} style={gStyles.displayCard}>
                  <Text style={gStyles.display}>{el[1]}</Text>
                  <ThemedText type={'title'}>{el[0]}</ThemedText>
                </View>
              )}
          </ScrollView>
        </View>
        <View style={styles.displayContainer}>
          <ThemedText style={tStyles.header}>Fresh Finds</ThemedText>
          <ScrollView horizontal style={gStyles.displayRow}>
            {mockRow2.map((el, index) =>
              <View key={`row2-${index}`} style={gStyles.displayCard}>
                <Text style={gStyles.display}>{el[1]}</Text>
                <ThemedText type={'title'}>{el[0]}</ThemedText>
              </View>
            )}
          </ScrollView>
        </View>
      </View>
    </View>
    // </ThemedView>
  )
}

export default Home

const styles = StyleSheet.create({
  displayContainer: {
    // borderWidth: 1,
    paddingVertical: 40,
  },
})
