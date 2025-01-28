// rnfe -> reactNativeFunctionalExportComponent

import { Alert, ImageBackground, StyleSheet, Text, TextInput, View, Pressable } from 'react-native';
import { Link } from 'expo-router';
import React, { useState, useRef, useEffect } from 'react'; // import React and useState (to manage state) and useRef (creates a reference) React hooks
import { Picker } from '@react-native-picker/picker';

import immBackground from '@/assets/images/in-motion-orangegold-icon.png';

interface QueryParams { // define a type for the query parameters
  id?: string;
  muscle?: string;
  category?: string;
}

const App = () => {
  const [searchEntry, setSearchEntry] = useState(''); // sets state for searchEntry to user input text (ref: Unit6 TicTacToe)
  const [responseResults, setResponseResults] = useState([]); // sets state for responseResults to results of search from backend

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
      const response = await fetch(`http://localhost:8080/api/search?${query}`);
      if (!response.ok) throw new Error('Failed to fetch data from the server');
      const data = await response.json();
      setResponseResults(data); // sets responseResults state with the search results
      setSearchEntry(''); // resets search box to an empty string after each search
    } catch (error) {
      console.error('Error: ', error);
      Alert.alert('Something went wrong. Please try again.');
    }
  };

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
              <Pressable style={styles.clearButton} onPress={() => setSearchEntry('')}>
                <Text style={styles.clearText}>X</Text>
              </Pressable>
            ) : null}
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
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchContainer: {
    position: 'relative',
    width: '100%',
  },
  searchInput: {
    height: 50,
    width: '100%',
    borderColor: '#ccc',
    borderWidth: 1,
    paddingLeft: 10,
    paddingRight: 40, // add space on the right to accommodate the "X"
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  clearButton: {
    position: 'absolute',
    right: 12,
    top: '17%',
    // transform: [{ translateY: -12 }],
  },
  clearText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#999',
  },
})