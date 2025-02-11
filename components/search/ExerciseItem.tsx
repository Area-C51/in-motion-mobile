import React from 'react';
import { Image, Dimensions, Pressable, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useColorScheme } from '@/hooks/useColorScheme';
import { getGlobalStyles, GlobalStyles as gStyles } from '@/constants/GlobalStyles';
import { ThemedText } from '@/components/ThemedText';
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
  const theme = useColorScheme();
  const tStyles = getGlobalStyles(theme);
  const isExpanded = expandedExerciseId === exercise.id;

  return (
    <View style={[tStyles.card, styles.resultItem]}>
      <View style={styles.headerRow}>
        <ThemedText type='title' style={styles.exerciseName}>{exercise.name}</ThemedText>
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
          <IconSymbol size={scaleFontSize(22)} name={'info.circle'} color={isExpanded ? tStyles.iconColorActive : tStyles.iconColor} />
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
          <IconSymbol size={scaleFontSize(22)} name={'bookmark'} color={tStyles.iconColor} />
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
          <IconSymbol size={scaleFontSize(22)} name={'arrowshape.turn.up.right'} color={tStyles.iconColor} />
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
        <ThemedText>No images available</ThemedText> // fallback if `exercise.images` isn't an array
      )}
    </View>

      {/* Expanded Details render below images only if this exercise is expanded */}
      {isExpanded && (
        <View
          style={styles.expandedDetails}
          accessibilityLabel="Expanded Exercise Details"
          accessibilityHint={`Tap to collapse exercise details for ${exercise.name}`}
        >
          {/* <ThemedText>
            <ThemedText style={styles.boldText}>Force:</ThemedText> {exercise.force}
          </ThemedText>
          <ThemedText>
            <ThemedText style={styles.boldText}>Level:</ThemedText> {exercise.level}
          </ThemedText>
          <ThemedText>
            <ThemedText style={styles.boldText}>Mechanic:</ThemedText> {exercise.mechanic}
          </ThemedText>
          <ThemedText>
            <ThemedText style={styles.boldText}>Equipment:</ThemedText> {exercise.equipment}
          </ThemedText> */}
          <ThemedText type="text">
            <ThemedText style={styles.boldText}>Instructions:</ThemedText> {exercise.instructions}
          </ThemedText>
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
    alignItems: 'center',
    justifyContent: 'space-between',
    // marginBottom: 5,
  },
  exerciseName: {
    flex: 1,
    fontSize: scaleFontSize(18), // relative to screen width, overrides ThemedText fontSize
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
    paddingHorizontal: 8,
    justifyContent: 'flex-start',
    marginVertical: 5,
  },
  pressableImage: {
    flex: 1,
    width: '100%',
  },
  exerciseImage: {
    aspectRatio: 1,
    borderRadius: 20,
  },
  
  // Exercise Expanded
  expandedDetails: {
    padding: 8,
  },
  boldText: {
    fontWeight: '700',
  },
});

export default ExerciseItem;
