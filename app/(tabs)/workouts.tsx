import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { useColorScheme } from '@/hooks/useColorScheme';
import { getGlobalStyles, GlobalStyles as gStyles } from '@/constants/GlobalStyles';
import ThemedText from '@/components/ThemedText';
import ThemedView from '@/components/ThemedView';

const { width, height } = Dimensions.get('window');
const minScreenDimension = Math.min(width, height); 

export default function Workout() {
  return (
    <ThemedView showDefaultBackgroundImage={true} // needs to check {!selectedWorkout} once that is implemented
      style={gStyles.mainContainer}    >
      <View style={gStyles.contentContainer}>
        <View style={styles.workoutsContainer}>
          <Text style={[styles.text, {fontWeight: 800}]}>Where workouts go to workout</Text>
          <Text style={styles.text}>* Search button vs bar</Text>
          <Text style={styles.text}>* Edit button (to delete exercises with a modal prompt to confirm)</Text>
          <Text style={styles.text}>* Sort menu toggle (need a modal for options) and grid/list view button</Text>
          <Text style={styles.text}>* Containers/cards for each workout</Text>
          <Text style={styles.text}>* Workouts open as a modal/component with X button to exit back</Text>
          <Text style={styles.text}>* Drag and drop to rearrange exercise order</Text>
        </View>
      </View>
    </ThemedView>
  )
}

const styles = StyleSheet.create ({
  workoutsContainer: {
    // flex: 1,
    top: (height - minScreenDimension) / 2,
    left: (width - minScreenDimension) / 2,
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
  },
  text: {
    fontSize: 18,
    color: 'white',
    padding: 5,
  },
})
