import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Dimensions, FlatList, StyleSheet, Text, View } from 'react-native';
import { useColorScheme } from '@/hooks/useColorScheme';
import { getGlobalStyles, GlobalStyles as gStyles } from '@/constants/GlobalStyles';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import SearchBar from '@/components/search/SearchBar';
import SettingsModal from '@/components/search/SettingsModal';
import ExerciseItem, { Exercise } from '@/components/search/ExerciseItem';
import ImageModal from '@/components/search/ImageModal';

// interface to define types for the query parameters
interface QueryParams {
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

function Search() {
  const [iconColor, setIconColor] = useState('#000'); // IconSymbol requires a color prop, this allows dynamic colors, possible use with themes

  const [muscleOptions, setMuscleOptions] = useState([]); // state for muscle options
  const [categoryOptions, setCategoryOptions] = useState([]); // state for category options
  const [fetchDropdownOptions, setFetchDropdownOptions] = useState(true); // status flag to ensure dropdown options data only occurs once

  const [searchEntry, setSearchEntry] = useState(''); // sets state for searchEntry to user input text
  const [muscle, setMuscle] = useState('');
  const [category, setCategory] = useState('');

  const [responseResults, setResponseResults] = useState<Exercise[]>([]); // sets state for responseResults, db results from back-end
  const [aiResponse, setAIResponse] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null); // state for the selected image to expand
  const [expandedExerciseId, setExpandedExerciseId] = useState<string | null>(
    null
  ); // state to track expanded exercise on click

  const [loading, setLoading] = useState(false);

  const [isMenuVisible, setIsMenuVisible] = useState(false); // search settings menu
  const [dropdownsEnabled, setDropdownsEnabled] = useState(false); // additional search dropdowns
  const [aiEnabled, setAiEnabled] = useState(false); // basic vs AI search

  const theme = useColorScheme();
  const tStyles = getGlobalStyles(theme);

  const toggleSearchModal = () => {
    setIsMenuVisible((prevState) => !prevState);
  };

  // fetch muscle and category options from back-end
  useEffect(() => {
    if (!fetchDropdownOptions) return;
    const fetchOptions = async () => {
      try {
        const response = await fetch(
          'http://localhost:8080/api/dropdown-options'
        );
        if (!response.ok) throw new Error('Failed to fetch options');
        const { muscles, categories } = await response.json();

        setMuscleOptions(
          muscles.sort((a: string, b: string) => a.localeCompare(b))
        ); // sort and set retrieved muscle options
        setCategoryOptions(
          categories.sort((a: string, b: string) => a.localeCompare(b))
        ); // sort and set retrieved category options
        setFetchDropdownOptions(false); // set status flag to false after fetching data once
      } catch (error) {
        console.error('Error fetching options:', error);
        setFetchDropdownOptions(false); // set status flag to false even if an error occurs
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
  }, []);

  // helper function to retrieve input values
  const getSearchInputs = () => {
    return {
      searchTerm: searchEntry.trim() || '', // get the search term
    };
  };

  const exerciseSearch = async () => {
    // basic exercise search functionality
    const { searchTerm } = getSearchInputs();
    const queryParams: QueryParams = {};

    // only add the parameters that exist
    if (searchTerm) queryParams.id = searchTerm;
    if (muscle) queryParams.muscle = muscle;
    if (category) queryParams.category = category;

    if (Object.keys(queryParams).length === 0) {
      // if no filter or search term is provided, show an alert and stop the search
      Alert.alert('Please enter a search term or select a filter');
      return;
    }

    try {
      const query = new URLSearchParams(
        queryParams as Record<string, string>
      ).toString(); // construct the query string using URLSearchParams directly from queryParams
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

  const aiExerciseSearch = async () => {
    // AI-assisted exercise search functionality
    const { searchTerm } = getSearchInputs();
    const queryParams: QueryParams = {}; // initial queryParams object

    // const queryParams = { query: searchTerm }; // AI query parameter
    if (searchTerm) queryParams.searchEntry = searchTerm;
    // if (muscle) queryParams.muscle = muscle;
    // if (category) queryParams.category = category;

    console.log('aiExerciseSearch queryParams: ', queryParams);
    if (!searchTerm) {
      Alert.alert('Please enter a search.');
      return;
    }
    setLoading(true); // start loading
    // setError(''); // reset any previous errors

    try {
      const query = new URLSearchParams(queryParams.searchEntry).toString();

      const response = await fetch(
        `http://localhost:8080/api/aisearch?${query}`,
        {
          // fetch AI response from the back-end
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            searchEntry: searchTerm,
            // id: searchTerm,
            // muscle,
            // category
          }),
        }
      );

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
    <ExerciseItem
      iconColor={iconColor}
      exercise={item}
      expandedExerciseId={expandedExerciseId}
      setExpandedExerciseId={setExpandedExerciseId}
      setSelectedImage={setSelectedImage}
    />
  );

  return (
    // ThemedView returns a View with a background image if there are no search results
    <ThemedView
      showDefaultBackgroundImage={!responseResults.length}
      style={gStyles.mainContainer}
    >
      <View style={gStyles.contentContainer}>
        <SearchBar
          searchEntry={searchEntry}
          setSearchEntry={setSearchEntry}
          aiEnabled={aiEnabled}
          aiExerciseSearch={aiExerciseSearch}
          exerciseSearch={exerciseSearch}
          toggleSearchModal={toggleSearchModal}
          iconColor={iconColor}
          dropdownsEnabled={dropdownsEnabled}
          muscle={muscle}
          setMuscle={setMuscle}
          category={category}
          setCategory={setCategory}
          muscleOptions={muscleOptions}
          categoryOptions={categoryOptions}
        />
        <SettingsModal
          isMenuVisible={isMenuVisible}
          toggleSearchModal={toggleSearchModal}
          dropdownsEnabled={dropdownsEnabled}
          setDropdownsEnabled={setDropdownsEnabled}
          aiEnabled={aiEnabled}
          setAiEnabled={setAiEnabled}
        />

        {/* Results container displays exercice items if present */}
        <View style={styles.resultsContainer}>
          {loading && <ActivityIndicator size='large' color='#0000ff' />}
          {responseResults.length > 0 ? ( // if there are any search results
            <FlatList
              data={responseResults}
              renderItem={renderExerciseItem}
              keyExtractor={(item) => item.id}
            />
          ) : (
            <ThemedText type='header' style={tStyles.placeholder}>
              Please search for an exercise
            </ThemedText>
          )}
        </View>
      </View>

      {/* Modal to display the clicked image */}
      <ImageModal
        selectedImage={selectedImage}
        setSelectedImage={setSelectedImage}
        fadeDuration={100} // customize the fade duration
      />
    </ThemedView>
  );
}

export default Search;

const styles = StyleSheet.create({
  resultsContainer: {
    flex: 1,
    position: 'relative',
    width: '100%',
    paddingHorizontal: 20,
  },
});
