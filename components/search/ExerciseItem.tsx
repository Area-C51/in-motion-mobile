import React from 'react';
import { Image, Dimensions, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// interface to define types for the Exercise object
export interface Exercise {
  id: string;
  name: string;
  images: string[];
  force: string;
  level: string;
  mechanic: string;
  equipment: string;
  instructions: string;
}

const scaleFontSize = (size: number) => {
  const { width } = Dimensions.get('window');
  return size * (width / 375); // assuming 375 is the base screen width for scaling
};

interface ExerciseItemProps {
  exercise: Exercise;
  expandedExerciseId: string | null;
  setExpandedExerciseId: (id: string | null) => void;
  setSelectedImage: (url: string | null) => void;
}

// ExerciseItem component with TS type React.FC (React Function Component), tells TS that this component is a function component whose props match the ExerciseItemProps interface and automatically adds type checking for the props
const ExerciseItem: React.FC<ExerciseItemProps> = ({
  exercise, // contains the data for each specific exercise, e.g., id, images, etc.
  // with modularized code, necessary pieces of state and their updated functions are passed as props (below), decoupling the component from the parent’s state management and making the component reusable elsewhere, e.g., saved user workouts
  expandedExerciseId,
  setExpandedExerciseId,
  setSelectedImage,
}) => {
  return (
    <View style={styles.resultItem}>
      <Text style={styles.exerciseName}>{exercise.name}</Text>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => {/* Opens menu to add to workout – WIP */}}
        accessibilityLabel="Add exercise to workouts"
        accessibilityHint="Tap to add this exercise to your workouts"
        accessible={true} // ensures focusable by the screen reader
        focusable={true} // ensures focusable with keyboard navigation or screen reader
        onFocus={() => console.log("Button focused")}
      >
        <Text style={styles.addText}>+</Text>
      </TouchableOpacity>

      <View style={styles.imageContainer}>
        {Array.isArray(exercise.images) ? (
          exercise.images.map((imageUrl, index) => (
            <Pressable
              key={index}
              style={[
                styles.pressableImage,
                { marginRight: index === exercise.images.length - 1 ? 0 : 5 }, // dynamically set marginRight (creates center space without adding right margin to 2nd of paired images)
              ]}
              onPress={() => setSelectedImage(imageUrl)}
              accessibilityLabel="Expand Image"
              accessibilityHint={`Tap to expand this image for ${exercise.name}`}
              accessible={true}
              focusable={true}
              onFocus={() => console.log("Button focused")}
            >
              <Image
                source={{ uri: imageUrl }}
                style={styles.exerciseImage}
                accessibilityLabel={`Exercise image for ${exercise.name}`}
              />
            </Pressable>
          ))
        ) : (
          <Text>No images available</Text> // fallback if `exercise.images` isn't an array
        )}
      </View>

      <Pressable
        onPress={() => setExpandedExerciseId(expandedExerciseId === exercise.id ? null : exercise.id)}
        style={styles.expandButton}
        accessibilityLabel="Expand Exercise Details"
        accessibilityHint={`Tap to expand exercise details for ${exercise.name}`}
        accessible={true}
        focusable={true}
        onFocus={() => console.log("Button focused")}
      >
        {expandedExerciseId === exercise.id ? (
          <View
          accessibilityLabel="Expanded Exercise Details"
          accessibilityHint={`Tap to collapse exercise details for ${exercise.name}`}>
            {/* <Text>
              <Text style={styles.boldText}>Force:</Text> {exercise.force}
            </Text>
            <Text>
              <Text style={styles.boldText}>Level:</Text> {exercise.level}
            </Text>
            <Text>
              <Text style={styles.boldText}>Mechanic:</Text> {exercise.mechanic}
            </Text>
            <Text>
              <Text style={styles.boldText}>Equipment:</Text> {exercise.equipment}
            </Text> */}
            <Text>
              <Text style={styles.boldText}>Instructions:</Text> {exercise.instructions}
            </Text>
          </View>
        ) : (
          <Text style={styles.expandButtonText}>Tap to Expand</Text>
        )}
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  resultItem: {
    marginVertical: 5,
  },

  // Exercise Header
  exerciseName: {
    fontSize: scaleFontSize(18), // relative to screen width
    fontWeight: 'bold',
    backgroundColor: 'rgba(255, 255, 255, 0.90)',
    padding: 6,
    textAlign: 'center',
    borderRadius: 10,
  },
  addButton: {
    width: 40,
    position: 'absolute',
    right: -10,
  },
  addText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'rgba(0, 0, 0, 0.7)',
  },

  // Exercise Images
  imageContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    marginVertical: 5,
  },
  pressableImage: {
    flex: 1,
    width: '100%',
  },
  exerciseImage: {
    aspectRatio: 1,
    borderRadius: 10,
  },
  
  // Exercise Expanded
  expandButton: {
    borderColor: '#888',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.90)',
    padding: 8,
  },
  expandButtonText: {
    fontSize: 14,
    textAlign: 'center',
  },
  boldText: {
    fontWeight: 'bold',
  },
});

export default ExerciseItem;
