import React from 'react';
import { Image, Dimensions, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { IconSymbol } from '@/components/ui/IconSymbol';

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
  iconColor: string;
  exercise: Exercise;
  expandedExerciseId: string | null;
  setExpandedExerciseId: (id: string | null) => void;
  setSelectedImage: (url: string | null) => void;
}

// ExerciseItem component with TS type React.FC (React Function Component), tells TS that this component is a function component whose props match the ExerciseItemProps interface and automatically adds type checking for the props
const ExerciseItem: React.FC<ExerciseItemProps> = ({
  iconColor,
  exercise, // contains the data for each specific exercise, e.g., id, images, etc.
  // with modularized code, necessary pieces of state and their updated functions are passed as props (below), decoupling the component from the parent’s state management and making the component reusable elsewhere, e.g., saved user workouts
  expandedExerciseId,
  setExpandedExerciseId,
  setSelectedImage,
}) => {
  const isExpanded = expandedExerciseId === exercise.id;

  return (
    <View style={styles.resultItem}>
      <View style={styles.headerRow}>
        <Text style={styles.exerciseName}>{exercise.name}</Text>
        <View style={styles.iconRow}>
        <TouchableOpacity
          // style={styles.}
          onPress={() => setExpandedExerciseId(isExpanded ? null : exercise.id)}
          accessibilityLabel="Expand Exercise Details"
          accessibilityHint={`Tap to ${isExpanded ? 'collapse' : 'expand'} exercise details for ${exercise.name}`}
          accessible={true} // ensures focusable by the screen reader
          focusable={true} // ensures focusable with keyboard navigation or screen reader
          onFocus={() => console.log("Button focused")}
        >
          <IconSymbol size={scaleFontSize(26)} name={'info.circle'} color={iconColor} />
        </TouchableOpacity>
        <TouchableOpacity
          // style={styles.}
          onPress={() => {/* Opens menu to add to workout – WIP */}}
          accessibilityLabel="Add exercise to workouts"
          accessibilityHint={`Tap to add ${exercise.name} to your workouts`}
          accessible={true}
          focusable={true}
          onFocus={() => console.log("Button focused")}
        >
          <IconSymbol size={scaleFontSize(26)} name={'bookmark'} color={iconColor} />
        </TouchableOpacity>
        <TouchableOpacity
          // style={styles.}
          onPress={() => {/* Opens menu to share exercise – WIP */}}
          accessibilityLabel="Share exercise"
          accessibilityHint={`Tap to share ${exercise.name}`}
          accessible={true}
          focusable={true}
          onFocus={() => console.log("Button focused")}
        >
          <IconSymbol size={scaleFontSize(26)} name={'arrowshape.turn.up.right'} color={iconColor} />
        </TouchableOpacity>
      </View>
    </View>

    <View style={styles.imageContainer}>
      {Array.isArray(exercise.images) ? (
        exercise.images.map((imageUrl, index) => (
          <Pressable
            key={index}
            style={[
              styles.pressableImage,
              { marginRight: index === exercise.images.length - 1 ? 0 : 15 }, // dynamically set marginRight (creates center space without adding right margin to 2nd of paired images)
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

      {/* Expanded Details render below images only if this exercise is expanded */}
      {isExpanded && (
        <View
          style={styles.expandedDetails}
          accessibilityLabel="Expanded Exercise Details"
          accessibilityHint={`Tap to collapse exercise details for ${exercise.name}`}
        >
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
          <Text style={styles.expandedText}>
            <Text style={styles.boldText}>Instructions:</Text> {exercise.instructions}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  resultItem: {
    marginTop: 15,
  },

  // Exercise Header
  headerRow: {
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.90)',
    alignItems: 'center',
    justifyContent: 'space-between',
    // marginBottom: 5,
  },
  exerciseName: {
    flex: 1,
    fontSize: scaleFontSize(18), // relative to screen width
    fontWeight: '700',
    padding: 6,
    textAlign: 'left',
  },
  iconRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  // Exercise Images
  imageContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
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
  expandedDetails: {
    borderWidth: 1,
    borderColor: '#888',
    borderRadius: 10,
    padding: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.90)',
    // marginTop: 5,
  },
  expandedText: {
    fontSize: 14,
  },
  boldText: {
    fontWeight: '700',
  },
});

export default ExerciseItem;
