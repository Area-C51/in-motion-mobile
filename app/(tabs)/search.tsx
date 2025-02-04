// rnfe -> reactNativeFunctionalExportComponent
import { ActivityIndicator, Alert, Animated, Dimensions, FlatList, Image, ImageBackground, Modal, Platform, Pressable, StyleSheet, Switch, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import React, { useState, useRef, useEffect } from 'react'; // import React and useState (to manage state) and useRef (creates a reference) React hooks
import { Picker } from '@react-native-picker/picker';
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
  searchEntry?: string;
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
  const [iconColor, setIconColor] = useState('#000'); // IconSymbol requires a color prop, this allows dynamic colors, possible use with themes
  
  const [muscleOptions, setMuscleOptions] = useState([]); // state for muscle options
  const [categoryOptions, setCategoryOptions] = useState([]); // state for category options
  const [fetchDropdownOptions, setfetchDropdownOptions] = useState(true); // status flag to ensure dropdown options data only occurs once

  const [searchEntry, setSearchEntry] = useState(''); // sets state for searchEntry to user input text
  const [muscle, setMuscle] = useState('');
  const [category, setCategory] = useState('');

  const [responseResults, setResponseResults] = useState<Exercise[]>([]); // sets state for responseResults, db results from back-end
  const [aiResponse, setAIResponse] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null); // state for the selected image to expand
  const [expandedExerciseId, setExpandedExerciseId] = useState<string | null>(null); // state to track expanded exercise on click

  const [loading, setLoading] = useState(false);

  const [isMenuVisible, setIsMenuVisible] = useState(false); // search settings menu
  const [dropdownsEnabled, setDropdownsEnabled] = useState(false); // additional search dropdowns
  const [aiEnabled, setAiEnabled] = useState(false); // basic vs AI search

  const slideAnim = useRef(new Animated.Value(150)).current; // search settings menu, initial position is off-screen
  
  const toggleSearchModal = () => {
    setIsMenuVisible(prevState => !prevState);
  };
  
  // sliding animation for the search settings menu
  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: isMenuVisible ? 0 : 150, // slide to 0 (visible) or 150 (hidden)
      duration: 150,
      useNativeDriver: true,
    }).start();
  }, [isMenuVisible]);
  
  useEffect(() => { // fetch muscle and category options from backend
    if (!fetchDropdownOptions) return;
    const fetchOptions = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/dropdown-options');
        if (!response.ok) throw new Error('Failed to fetch options');
        const data = await response.json();
        
        const sortedMuscles = data.muscles.sort((a: string, b: string) => a.localeCompare(b)); // sort muscle options
        const sortedCategories = data.categories.sort((a: string, b: string) => a.localeCompare(b)); // sort category options

        setMuscleOptions(sortedMuscles); // set muscle options/state after sorting
        setCategoryOptions(sortedCategories); // set category options/state after sorting
        setfetchDropdownOptions(false); // set status flag to false after fetching data once
      } catch (error) {
        console.error('Error fetching options:', error);
        setfetchDropdownOptions(false); // set status flag to false even if an error occurs
      }
    };
    fetchOptions();

    // ********** ********** ********** ********** ********** ********** ********** ********** ********** **********
    // USED FOR DEBUGGING MULTIPLE MOUNTS OCCURING WITH useEffect FOR setMuscleOptions AND setCategoryOptions
    // ********** ********** ********** ********** ********** ********** ********** ********** ********** **********
    // console.log('Component mounted');
    // return () => {
    //   console.log('Component unmounted');
    // };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // empty dependency array means this effect runs once when the component mounts

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
    if (muscle) queryParams.muscle = muscle; // include muscle if selected
    if (category) queryParams.category = category; // include category if selected

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
      // setSearchEntry(''); // resets search box to an empty string after each search
    } catch (error) {
      console.error('Error: ', error);
      Alert.alert('Error', 'Something went wrong. Please try again.');
    }
  };

  const aiExerciseSearch = async () => { // AI-assisted exercise search functionality
    // eslint-disable-next-line no-unused-vars
    const { searchTerm } = getSearchInputs();

    const queryParams: QueryParams = {}; // initial queryParams object

    // const queryParams = { query: searchTerm }; // AI query parameter
    if (searchTerm) queryParams.searchEntry = searchTerm;
    // if (muscle) queryParams.muscle = muscle;
    // if (category) queryParams.category = category;

    console.log('aiExerciseSearch queryParams: ', queryParams)
    if (!searchTerm) {
      Alert.alert('Please enter a search.');
      return;
    }

    setLoading(true); // start loading
    // setError(''); // reset any previous errors
  
    try {
      const query = new URLSearchParams(queryParams.searchEntry).toString();

      const response = await fetch(`http://localhost:8080/api/aisearch?${query}`, { // fetch AI response from the backend
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          searchEntry: searchTerm,
          // id: searchTerm,
          // muscle,
          // category
        }),
      });

      if (!response.ok) throw new Error('Failed to fetch data from the server');
      const data = await response.json();
      setAIResponse(data); // sets responseResults state with AI response data
      // setSearchEntry(''); // resets search box to an empty string after each search
    } catch (error) {
      console.error('Error: ', error);
      Alert.alert('Something went wrong with the AI assisted query. Please try again.');
    } finally {
      setLoading(false); // stop loading when done
    }
  };

  // each exercise item of the results container
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
          <View
          accessibilityLabel="Expanded Exercise Details"
          accessibilityHint={`Tap to collapse exercise details for ${item.name}`}>
            {/* <Text>Force: {item.force}</Text>
            <Text>Level: {item.level}</Text>
            <Text>Mechanic: {item.mechanic}</Text>
            <Text>Equipment: {item.equipment}</Text> */}
            <Text>
              <Text style={{ fontWeight: 'bold' }}>Instructions:</Text> {item.instructions}
            </Text>
          </View>
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
        {/* Search container, runs basic or AI assisted search if toggled on */}
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search exercises by name"
            value={searchEntry} // bind the TextInput to state
            onChangeText={setSearchEntry} // update the searchEntry state as the user types
            onSubmitEditing={aiEnabled ? aiExerciseSearch : exerciseSearch} // trigger search when "Enter" is pressed
            accessibilityLabel="Search for exercises"
            accessibilityHint="Enter the name of an exercise to search"
            accessible={true}
            focusable={true}
            onFocus={() => console.log("Search bar focused")}
          />
          <TouchableOpacity
            style={styles.submitButton}
            onPress={exerciseSearch} // only works with basic search
            accessibilityLabel="Search for exercises with dropdowns"
            accessibilityHint="Use the dropdowns for muscles or exercise categories to search"
            accessible={true}
            focusable={true}
            onFocus={() => console.log("Search button focused")}
          >
            <IconSymbol size={28} name={'magnifyingglass'} color={iconColor} />
          </TouchableOpacity>
  
          {/* Clear button is conditionally displayed if actively searching */}
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

          {/* Search setting button to open search settings menu */}
          <TouchableOpacity
            style={styles.searchSettingsButton}
            onPress={toggleSearchModal}
            accessibilityLabel="Open search settings"
            accessibilityHint="Tap to open the search settings menu"
            accessible={true}
            focusable={true}
            onFocus={() => console.log("Button focused")}
          >
            <IconSymbol size={28} name={'line.horizontal.3'} color={iconColor} />
          </TouchableOpacity>

          <Modal
            animationType="fade"
            transparent={true}
            visible={isMenuVisible}
            onRequestClose={toggleSearchModal} // allows closing modal with back button (Android)
            accessibilityLabel="Additional earch Settings"
            accessibilityHint="A modal containing additional search settings options"
            accessible={true}
            focusable={true}
          >
            {/* The first TouchableWithoutFeedback wraps the entire overlay (modalOverlay) and closes the modal when touched */}
            <TouchableWithoutFeedback onPress={toggleSearchModal} accessibilityLabel="Close search settings">
              <View style={styles.modalOverlay}>
                {/* The second TouchableWithoutFeedback wraps searchModalContainer, and onPress={(event) => event.stopPropagation()} prevents touch events from bubbling up to the parent TouchableWithoutFeedback, ensuring the modal stays open when interacting with its contents. */}
                <TouchableWithoutFeedback onPress={(event) => event.stopPropagation()} accessible={false}>
                  <Animated.View
                    style={[styles.searchModalContainer, { transform: [{ translateX: slideAnim }] }]}
                    accessibilityLabel="Search Settings Options"
                    accessible={true}
                    focusable={true}
                  >

                    {/* Toggle for Dropdown Search */}
                    <View style={styles.switchContainer}>
                      <Text style={styles.searchModalText} accessibilityLabel="Dropdown search toggle label">
                        Dropdowns
                      </Text>
                      <Switch
                        style={styles.searchSwitch}
                        value={dropdownsEnabled}
                        onValueChange={setDropdownsEnabled}
                        accessibilityLabel="Enable or disable dropdown search"
                        accessibilityHint="Toggles search using dropdown filters"
                      />
                    </View>

                    {/* Toggle for AI Search */}
                    <View style={styles.switchContainer}>
                      <Text style={styles.searchModalText} accessibilityLabel="AI search toggle label">
                        AI Search
                      </Text>
                      <Switch
                        style={styles.searchSwitch}
                        value={aiEnabled}
                        onValueChange={setAiEnabled}
                        // thumbColor={aiEnabled ? 'rgb(0, 0, 0)' : 'rgb(245, 245, 245)'} // can change the switch color for on/off
                        // trackColor={{ false: '#767577', true: '#34C759' }} // can change the track color for on/off
                        accessibilityLabel="Enable or disable AI search"
                        accessibilityHint="Toggles search using AI-generated results"
                      />
                    </View>
                  </Animated.View>
                </TouchableWithoutFeedback>
              </View>
            </TouchableWithoutFeedback>
          </Modal>
        </View>

        {/* Dropdown container displays dropdowns and submit button if toggled*/}
        {dropdownsEnabled ? (
          <View style={styles.dropdownContainer}>
            <Picker
            selectedValue={muscle}
            onValueChange={(itemValue) => setMuscle(itemValue)}
            style={styles.dropdown}
            >
              <Picker.Item label="Select Muscle" value="" />
              {muscleOptions.map((m, index) => (
                <Picker.Item key={index} label={m} value={m} />
              ))}
            </Picker>

            {/* Category Picker */}
            <Picker
              selectedValue={category}
              onValueChange={(itemValue) => setCategory(itemValue)}
              style={styles.dropdown}
            >
              <Picker.Item label="Select Category" value="" />
              {categoryOptions.map((c, index) => (
                <Picker.Item key={index} label={c} value={c} />
              ))}
            </Picker>
          </View>
          ) : null
        }

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
            <Text style={[styles.exerciseName, {top: 50}]}>Please search for an exercise</Text>
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
    top: 35, // space for the status bar on mobile
    width: '100%',
    justifyContent: 'center',
    zIndex: 3, // highest, higher than dropdownContainer
  },
  searchInput: {
    height: 45,
    width: '100%',
    fontSize: 16, // search bar is a set height, thus font is set size
    borderColor: '#aaa',
    borderWidth: 1,
    paddingLeft: 40, // space for the submit button
    paddingRight: 70, // space for the "X" and search menu buttons
    backgroundColor: '#fff',
    zIndex: 2,
  },
  submitButton: {
    height: 45,
    width: 40,
    position: 'absolute',
    borderColor: '#aaa',
    // borderWidth: 1, // only to visualize the button over the search bar
    padding: 8,
    // backgroundColor: '#fff', // only to visualize the button over the search bar
    alignContent: 'center',
    justifyContent: 'center',
    zIndex: 4,
  },
  clearButton: {
    height: 45,
    width: 50,
    // borderWidth: 1, // only to visualize the button over the search bar
    position: 'absolute',
    right: 20,
    paddingLeft: 10,
    justifyContent: 'center',
    zIndex: 3,
  },
  clearText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#999',
  },
  searchSettingsButton: {
    height: 45,
    width: 40,
    position: 'absolute',
    right: -5,
    borderColor: '#aaa',
    borderWidth: 1,
    borderTopLeftRadius: 25,
    borderBottomLeftRadius: 25,
    padding: 5,
    // backgroundColor: '#fff', // only to visualize the button over the search bar
    alignContent: 'center',
    justifyContent: 'center',
    zIndex: 4,
  },

  // Search Settings Modal Menu
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // semi-transparent background
    alignItems: 'flex-end',
  },
  searchModalContainer: {
    width: Platform.OS === 'web' ? 180 : 150,
    position: 'absolute',
    top: Platform.OS === 'web' ? 80 : 50, // adjust for Android
    backgroundColor: '#FFF',
    paddingVertical: Platform.OS === 'web' ? 10 : 5,
    padding: Platform.OS === 'web' ? 10 : 0,
    paddingRight: Platform.OS === 'web' ? 15 : 5,
    paddingLeft: Platform.OS === 'web' ? 15 : 15,
    borderRadius: 10,
    shadowColor: Platform.OS === 'web' ? '#000' : 'transparent',
    shadowOffset: Platform.OS === 'web' ? { width: 0, height: 2 } : undefined,
    shadowOpacity: Platform.OS === 'web' ? 0.8 : undefined,
    shadowRadius: Platform.OS === 'web' ? 5 : undefined,
    elevation: Platform.OS === 'android' ? 5 : 0,
    alignItems: 'center',
  },
  switchContainer: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: Platform.OS === 'web' ? 10 : -3,
  },
  searchModalText: {
    fontSize: 16,
  },
  searchSwitch: {
    // transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }], // enlarges the switch

  },
  
  // Dropdown Options
  dropdownContainer: {
    flexDirection: 'row',
    height: 40,
    width: '100%',
    position: 'relative',
    top: 80, // space below the search bar
    borderColor: '#aaa',
    borderWidth: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2, // 2nd highest, higher than resultsContainer, lower than searchContainer
  },
  dropdown: {
    height: Platform.OS === 'web' ? 40 : 50,
    width: '50%',
    fontSize: 16,
  },

  // Results List
  resultsContainer: {
    flex: 1,
    position: 'relative',
    width: '100%',
    top: 80, // space for search bar
    paddingLeft: 10,
    paddingRight: 10,
    // overflow: 'scroll', // optional, for enforcing scroll behavior
    zIndex: 1, // lowest, lower than dropdownContainer
  },
  resultItem: {
    marginBottom: 5,
  },

  // Exercise Header
  exerciseName: {
    fontSize: scaleFontSize(18), // relative to screen width
    fontWeight: 'bold',
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.90)',
    padding: 6,
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
    aspectRatio: 1,
    borderRadius: 10,
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  fullScreenImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
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
    // fontWeight: 'bold',
    paddingVertical: 0,
    textAlign: 'center',
  }
})