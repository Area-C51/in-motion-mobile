import React from 'react';
import { Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { IconSymbol } from '@/components/ui/IconSymbol';

interface SearchBarProps {
  searchEntry: string;
  setSearchEntry: (text: string) => void;
  aiEnabled: boolean;
  aiExerciseSearch: () => void;
  exerciseSearch: () => void;
  toggleSearchModal: () => void;
  iconColor: string;
  dropdownsEnabled: boolean;
  muscle: string;
  setMuscle: (value: string) => void;
  category: string;
  setCategory: (value: string) => void;
  muscleOptions: string[];
  categoryOptions: string[];
}

const SearchBar: React.FC<SearchBarProps> = ({
  searchEntry,
  setSearchEntry,
  aiEnabled,
  aiExerciseSearch,
  exerciseSearch,
  toggleSearchModal,
  iconColor,
  dropdownsEnabled,
  muscle,
  setMuscle,
  category,
  setCategory,
  muscleOptions,
  categoryOptions,
}) => {
  return (
    <View style={styles.container}>
        {/* Search container, runs basic or AI assisted search if toggled on */}
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchTextInput}
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
            accessibilityLabel="Search for exercises"
            accessibilityHint="Submit the search query"
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
              accessibilityLabel="Clear search"
              accessibilityHint="Clear the search input"  
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
            accessibilityLabel="Search settings"
            accessibilityHint="Open search settings menu"
            accessible={true}
            focusable={true}
            onFocus={() => console.log("Button focused")}
          >
            <IconSymbol size={28} name={'line.horizontal.3'} color={iconColor} />
          </TouchableOpacity>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  // Search Bar
  searchContainer: {
    position: 'relative',
    width: '100%',
    justifyContent: 'center',
  },
  searchTextInput: {
    height: 45,
    width: '100%',
    fontSize: 16, // search bar is a set height, thus font is set size
    borderWidth: 1,
    borderColor: '#aaa',
    paddingLeft: 40, // space for the submit button
    paddingRight: 70, // space for the "X" and search menu buttons
    backgroundColor: '#fff',
  },
  submitButton: {
    position: 'absolute',
    height: 45,
    width: 40,
    // borderWidth: 1, // only to visualize the button over the search bar
    // borderColor: '#aaa',
    padding: 8,
    // backgroundColor: '#fff', // only to visualize the button over the search bar
    alignContent: 'center',
    justifyContent: 'center',
  },
  clearButton: {
    position: 'absolute',
    right: 20,
    height: 45,
    width: 50,
    // borderWidth: 1, // only to visualize the button over the search bar
    paddingLeft: 10,
    justifyContent: 'center',
  },
  clearText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#999',
  },
  searchSettingsButton: {
    position: 'absolute',
    right: -5,
    height: 45,
    width: 40,
    borderWidth: 1,
    borderColor: '#aaa',
    borderTopLeftRadius: 25,
    borderBottomLeftRadius: 25,
    padding: 5,
    // backgroundColor: '#fff', // only to visualize the button over the search bar
    alignContent: 'center',
    justifyContent: 'center',
  },

  // Dropdown Options
  dropdownContainer: {
    flexDirection: 'row',
    position: 'relative',
    height: 40,
    width: '100%',
    borderWidth: 1,
    borderColor: '#aaa',
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropdown: {
    height: Platform.OS === 'web' ? 40 : 50,
    width: '50%',
    fontSize: 16,
  },
})

export default SearchBar;
