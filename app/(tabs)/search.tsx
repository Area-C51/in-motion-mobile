// rnfe -> reactNativeFunctionalExportComponent

import { ActivityIndicator, Alert, Animated, Dimensions, FlatList, Image, ImageBackground, Modal, Pressable, StyleSheet, Switch, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import React, { useState, useRef, useEffect } from 'react'; // import React and useState (to manage state) and useRef (creates a reference) React hooks
// import { Picker } from '@react-native-picker/picker';
import { IconSymbol } from '@/components/ui/IconSymbol';

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

export default function Search() {
  const [iconColor, setIconColor] = useState('#000'); // IconSymbol requires a color prop, this allows dynamic colors, possible use with themes

  const [searchEntry, setSearchEntry] = useState(''); // sets state for searchEntry to user input text (ref: Unit6 TicTacToe)
  const [responseResults, setResponseResults] = useState<Exercise[]>([]); // sets state for responseResults, db results from back-end
  const [selectedImage, setSelectedImage] = useState<string | null>(null); // state for the selected image to expand
  const [expandedExerciseId, setExpandedExerciseId] = useState<string | null>(null); // state to track expanded exercise on click

  const [loading, setLoading] = useState(false);

  const [isMenuVisible, setIsMenuVisible] = useState(false); // search settings menu
  const [dropdownsEnabled, setDropdownsEnabled] = useState(false); // additional search dropdowns
  const [aiEnabled, setAiEnabled] = useState(false); // basic vs AI search

  const slideAnim = useRef(new Animated.Value(150)).current; // search settings menu, initial position is off-screen

  // sliding animation for the search settings menu
  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: isMenuVisible ? 0 : 150,  // slide to 0 (visible) or 150 (hidden)
      duration: 150,
      useNativeDriver: true,
    }).start();
  }, [isMenuVisible]);
  
  const toggleSearchMenu = () => {
    setIsMenuVisible(prevState => !prevState);
  };
  
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
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => {/* Opens menu to add to workout */}} // WIP
        accessibilityLabel="Add exercie to workouts"
        accessibilityHint="Tap to add this exercise to your workouts"
        accessible={true} // ensures focusable by the screen reader
        focusable={true} // ensures focusable with keyboard navigation or screen reader
        onFocus={() => console.log("Button focused")}
      >
        <Text style={styles.addText}>+</Text>
      </TouchableOpacity>
      <View style={styles.imageContainer}>
      {Array.isArray(item.images) ? (
        item.images.map((imageUrl, index) => (
          <Pressable
            key={index}
            style={[
              styles.pressableImage,
              { marginRight: index === item.images.length - 1 ? 0 : 5 }, // dynamically set marginRight (creates center space without adding right margin to 2nd of paired images)
            ]}
            onPress={() => setSelectedImage(imageUrl)}
            accessibilityLabel="Expand Image"
            accessibilityHint={`Tap to expand this image for ${item.name}`}
            accessible={true}
            focusable={true}
            onFocus={() => console.log("Button focused")}
          >
            <Image
              source={{ uri: imageUrl }}
              style={styles.exerciseImage}
              accessibilityLabel={`Exercise image for ${item.name}`}
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
        accessibilityHint={`Tap to expand exercise details for ${item.name}`}
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
            accessibilityLabel="Search for exercises"
            accessibilityHint="Enter the name of an exercise to search"
            accessible={true}
            focusable={true}
            onFocus={() => console.log("Search bar focused")}
          />
          {searchEntry ? (
            <TouchableOpacity
              style={styles.clearButton}
              onPress={() => setSearchEntry('')}
              accessibilityLabel="Clear Search Bar"
              accessibilityHint="Tap to clear the search bar"  
              accessible={true}
              focusable={true}
              onFocus={() => console.log("Button focused")}      
            >
              <Text style={styles.clearText}>X</Text>
            </TouchableOpacity>
          ) : null}
          <TouchableOpacity
            style={styles.searchSettingsButton}
            onPress={toggleSearchMenu}
            accessibilityLabel="Open search settings"
            accessibilityHint="Tap to open the search settings menu"
            accessible={true}
            focusable={true}
            onFocus={() => console.log("Button focused")}
          >
            <IconSymbol size={28} name={'line.horizontal.3'} color={iconColor} />
          </TouchableOpacity>
          {isMenuVisible && (
            <Animated.View style={[styles.searchMenuContainer, { transform: [{ translateX: slideAnim }] }]}>
              <View style={styles.searchMenuOption}>
                <Text style={styles.searchMenuText}>Dropdowns</Text>
                <Switch
                  style={styles.searchSwitch}
                  value={dropdownsEnabled}
                  onValueChange={setDropdownsEnabled}
                  accessibilityLabel="Toggle Dropdowns"
                  accessibilityHint="Toggles between Dropdown search options on or off"
                />
              </View>
              <View style={styles.searchMenuOption}>
                <Text style={styles.searchMenuText}>AI Assist</Text>
                <Switch
                  style={styles.searchSwitch}
                  value={aiEnabled}
                  onValueChange={setAiEnabled}
                  accessibilityLabel="Toggle AI Assist"
                  accessibilityHint="Toggles between basic search and AI assisted search"
                />
              </View>
            </Animated.View>
          )}
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
    fontSize: 16, // search bar is a set height, thus font is set size
    borderColor: '#aaa',
    borderWidth: 1,
    paddingLeft: 10,
    paddingRight: 70, // space for the "X" and search menu buttons
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

  // Search Settings Menu
  searchMenuContainer: {
    position: 'absolute',
    top: 65, // position below the button
    right: 0,
    backgroundColor: '#FFF',
    padding: 10,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
    elevation: 5, // Android shadow
  },
  searchMenuOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  searchMenuText: {
    fontSize: 16,
    marginRight: 10,
  },
  searchSwitch: {},

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
    fontSize: scaleFontSize(20),  // relative to screen width
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