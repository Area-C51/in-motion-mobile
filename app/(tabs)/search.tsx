// rnfe -> reactNativeFunctionalExportComponent

import { ActivityIndicator, Alert, Dimensions, FlatList, Image, ImageBackground, Modal, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
// import { Link } from 'expo-router';
import React, { useState, useRef, useEffect } from 'react'; // import React and useState (to manage state) and useRef (creates a reference) React hooks
import { IconSymbol } from '@/components/ui/IconSymbol';
// import { Picker } from '@react-native-picker/picker';

import immBackground from '@/assets/images/in-motion-orangegold-icon.png';

interface Exercise { // define a type for the exercise object
  id: string;
  name: string;
  images: string[];
  force: string;
  level: string;
  mechanic: string;
  equipment: string;
  instructions: string;
}

interface QueryParams { // define a type for the query parameters
  id?: string;
  muscle?: string;
  category?: string;
}

// allows dynamic styles with width and height specific to the screen dimensions
const { width, height } = Dimensions.get('window');
// container: {
//   height: height * 0.8, // 80% of the screen height
//   width: width * 0.9, // 90% of the screen width
// },

// allows scaling font size relative to screen width
const scaleFontSize = (size: number) => {
  const { width } = Dimensions.get('window');
  return size * (width / 375); // assuming 375 is the base screen width for scaling
};
// text: {
//   fontSize: scaleFontSize(16), // Scale text size based on screen width
// },

const App = () => {
  const [iconColor, setIconColor] = useState('#000'); // IconSymbol requires a color prop, this allow dynamic colors, possible use with themes
  const [searchEntry, setSearchEntry] = useState(''); // sets state for searchEntry to user input text (ref: Unit6 TicTacToe)
  const [responseResults, setResponseResults] = useState<Exercise[]>([]); // sets state for responseResults to results of search from backend
  const [expandedExerciseId, setExpandedExerciseId] = useState<string | null>(null); // state to track expanded exercise on hover
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null); // state for the selected image

  // helper function to retrieve input values
  const getSearchInputs = () => { // input retrieval helper function
    return {
      searchTerm: searchEntry.trim() || '', // get the search term
    };
  };

  
  const exerciseSearch = async () => { // non-AI assisted exercise search functionality
    const { searchTerm } = getSearchInputs();
    const queryParams: QueryParams = {};
    
    // only add the parameters that are non-empty
    if (searchTerm) queryParams.id = searchTerm; // include the search term if provided
    // if (muscle) queryParams.muscle = muscle; // include muscle if selected
    // if (category) queryParams.category = category; // include category if selected

    if (Object.keys(queryParams).length === 0) { // if no filter or search term is provided, show an alert and stop the search
      Alert.alert('Please enter a search term or select a filter');
      return;
    }

    try {
      const query = new URLSearchParams(queryParams as Record<string, string>).toString(); // construct the query string using URLSearchParams directly from queryParams
      // console.log(query); // for debugging
      const response = await fetch(`http://localhost:8080/api/search?${query}`);
      // console.log(response); // for debugging
      if (!response.ok) throw new Error('Failed to fetch data from the server');
      const data = await response.json();
      setResponseResults(data); // sets responseResults state with the search results
      setSearchEntry(''); // resets search box to an empty string after each search
    } catch (error) {
      console.error('Error: ', error);
      Alert.alert('Error', 'Something went wrong. Please try again.');
    }
  };

  const renderExerciseItem = ({ item }: { item: Exercise }) => (
    <View key={item.id} style={styles.resultItem}>
      <Text style={styles.exerciseName}>{item.name}</Text>
      <Pressable
        style={styles.addButton}
        onPress={() => {/* Opens menu to add to workout */}}
        accessibilityLabel="Add exercie to workouts"
        accessibilityHint="Tap to add this exercise to your workouts"
        accessible={true} // ensures focusable by the screen reader
        focusable={true} // ensures focusable with keyboard navigation or screen reader
        onFocus={() => console.log("Button focused")}
      >
        <Text style={styles.addText}>+</Text>
      </Pressable>
      <View style={styles.imageContainer}>
      {Array.isArray(item.images) ? (
        item.images.map((imageUrl, index) => (
          <Pressable
            key={index}
            style={[
              styles.pressableImage,
              { marginRight: index === item.images.length - 1 ? 0 : 5 }, // dynamically set marginRight
            ]}
            onPress={() => setSelectedImage(imageUrl)}
            accessibilityLabel="Expand Image"
            accessibilityHint={`Tap to expand this image for ${item.id}`}
            accessible={true}
            focusable={true}
            onFocus={() => console.log("Button focused")}
          >
            <Image
              source={{ uri: imageUrl }}
              style={styles.exerciseImage}
              accessibilityLabel={`Exercise image for ${item.id}`}
            />
          </Pressable>
        ))
      ) : (
        <Text>No images available</Text> // fallback if `exercise.images` isn't an array
      )}
      </View>
      <Pressable
        onPress={() => setExpandedExerciseId(expandedExerciseId === item.id ? null : item.id)}
        style={styles.expandButton}
        accessibilityLabel="Expand Exercise Details"
        accessibilityHint={`Tap to expand exercise details for ${item.id}`}
        accessible={true}
        focusable={true}
        onFocus={() => console.log("Button focused")}
      >
        {expandedExerciseId === item.id ? (
          <>
            <Text>Force: {item.force}</Text>
            <Text>Level: {item.level}</Text>
            <Text>Mechanic: {item.mechanic}</Text>
            <Text>Equipment: {item.equipment}</Text>
            <Text>Instructions: {item.instructions}</Text>
          </>
        ) : (
          <Text style={styles.expandButtonText}>Tap to Expand</Text>
        )}
      </Pressable>
    </View>
  );
  
  return (
    <View style={styles.mainContainer}>
      <ImageBackground
        source={immBackground}
        resizeMode='cover'
        style={styles.backgroundImage}
      >
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search exercises by name"
            value={searchEntry} // bind the TextInput to state
            onChangeText={setSearchEntry} // update the searchEntry state as the user types
            onSubmitEditing={exerciseSearch} // trigger search when "Enter" is pressed
          />
          {searchEntry ? (
            <Pressable
              style={styles.clearButton}
              onPress={() => setSearchEntry('')}
              accessibilityLabel="Clear Search Bar"
              accessibilityHint="Tap to clear the search bar"  
              accessible={true}
              focusable={true}
              onFocus={() => console.log("Button focused")}      
            >
              <Text style={styles.clearText}>X</Text>
            </Pressable>
          ) : null}
          <Pressable
            style={styles.searchSettingsButton}
            onPress={() => setSearchEntry('')}
            accessibilityLabel="Open search settings"
            accessibilityHint="Tap to open the search settings menu"
            accessible={true}
            focusable={true}
            onFocus={() => console.log("Button focused")}
          >
            <IconSymbol size={28} name={'line.horizontal.3'} color={iconColor} />
          </Pressable>
        </View>

        {/* Results container displays exercice items if present */}
        <View style={styles.resultsContainer}>
          {loading && <ActivityIndicator size="large" color="#0000ff" />}
          {responseResults.length > 0 ? ( // if there is 1 or more results in the responseResults array
            <FlatList
              data={responseResults}
              renderItem={renderExerciseItem}
              keyExtractor={(item) => item.id}
            />
          ) : (
            <Text>Please search for an exercise</Text>
          )}
        </View>
      </ImageBackground>

      {/* Modal to display the clicked image */}
      <Modal
        visible={!!selectedImage}
        transparent={true}
        onRequestClose={() => setSelectedImage(null)}
        animationType="fade"
        accessibilityLabel="Image full screen view"
      >
        <Pressable
          style={styles.modalBackground}
          onPress={() => setSelectedImage(null)}
          accessibilityLabel="Close the image modal"
          accessible={true}
          focusable={true}
          onFocus={() => console.log("Button focused")}
        >
          {selectedImage && (
            <Image source={{ uri: selectedImage }} style={styles.fullScreenImage} />
          )}
        </Pressable>
      </Modal>
    </View>
  );
};

export default App

const styles = StyleSheet.create({
  // Layout
  mainContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Search Bar
  searchContainer: {
    position: 'absolute',
    top: 0,
    width: '100%',
    paddingTop: 20, // space for the status bar on mobile
    zIndex: 1,
  },
  searchInput: {
    height: 45,
    width: '100%',
    fontSize: scaleFontSize(16),
    borderColor: '#aaa',
    borderWidth: 1,
    paddingLeft: 10,
    paddingRight: 70, // space for the "X" button
    backgroundColor: '#fff',
  },
  clearButton: {
    position: 'absolute',
    right: 50,
    top: '50%',
    transform: [{ translateY: -5 }],
  },
  clearText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#999',
  },
  searchSettingsButton: {
    width: 40,
    height: 45,
    position: 'absolute',
    right: 0,
    borderColor: '#aaa',
    borderWidth: 1,
    borderTopLeftRadius: 25,
    borderBottomLeftRadius: 25,
    padding: 10,
    backgroundColor: '#fff',
    alignContent: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },

  // Results List
  resultsContainer: {
    flex: 1,
    width: '100%',
    paddingTop: 70, // space for search bar
    paddingLeft: 10,
    paddingRight: 10,
    // overflow: 'scroll', // optional, for enforcing scroll behavior
  },
  resultItem: {
    marginBottom: 5,
  },

  // Exercise Header
  exerciseName: {
    fontSize: scaleFontSize(20),
    fontWeight: 'bold',
    backgroundColor: 'rgba(255, 255, 255, 0.90)',
    padding: 5,
    textAlign: 'center',
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
    // height: undefined,
    aspectRatio: 1,
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
  },
  fullScreenImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  
  // Exercise Expanded
  expandButton: {
    // marginVertical: 10,
    borderColor: '#888',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.90)',
    padding: 8,
  },
  expandButtonText: {
    fontWeight: 'bold',
    paddingVertical: 4,
    textAlign: 'center',
  }
})