import React from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useColorScheme } from '@/hooks/useColorScheme';
import { getGlobalStyles } from '@/constants/GlobalStyles';
import { IconSymbol } from '@/components/ui/IconSymbol';

interface SearchBarProps {
  isMenuVisible: boolean;
  searchEntry: string;
  setSearchEntry: (text: string) => void;
  aiEnabled: boolean;
  aiExerciseSearch: () => void;
  exerciseSearch: () => void;
  toggleSearchModal: () => void;
  dropdownsEnabled: boolean;
  muscle: string;
  setMuscle: (value: string) => void;
  category: string;
  setCategory: (value: string) => void;
  muscleOptions: string[];
  categoryOptions: string[];
}

const SearchBar: React.FC<SearchBarProps> = ({
  isMenuVisible,
  searchEntry,
  setSearchEntry,
  aiEnabled,
  aiExerciseSearch,
  exerciseSearch,
  toggleSearchModal,
  dropdownsEnabled,
  muscle,
  setMuscle,
  category,
  setCategory,
  muscleOptions,
  categoryOptions,
}) => {
  const theme = useColorScheme();
  const tStyles = getGlobalStyles(theme);
  
  return (
    <View style={styles.container}>
      {/* Search container, runs basic or AI assisted search if toggled on */}
      <View style={styles.searchContainer}>
        <TextInput
          style={tStyles.searchTextInput}
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
          <IconSymbol size={26} name={'magnifyingglass'} color={tStyles.iconColor} />
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
            <IconSymbol size={26} name={'xmark'} color={tStyles.iconColor} />
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
          <IconSymbol size={26} name={'line.horizontal.3'} color={isMenuVisible ? tStyles.iconColorActive : tStyles.iconColor} />
        </TouchableOpacity>
      </View>

      {/* Dropdown container displays dropdowns and submit button if toggled*/}
      {dropdownsEnabled ? (
        <View style={styles.dropdownContainer}>
          <Picker
          selectedValue={muscle}
          onValueChange={(itemValue) => setMuscle(itemValue)}
          style={tStyles.picker}
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
            style={tStyles.picker}
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
    // width: '100%',
  },
  // Search Bar
  searchContainer: {
    position: 'relative',
    width: '100%',
    justifyContent: 'center',
  },
  submitButton: {
    position: 'absolute',
    height: 45,
    width: 40,
    padding: 8,
    alignContent: 'center',
    justifyContent: 'center',
  },
  clearButton: {
    position: 'absolute',
    right: 15,
    height: 45,
    width: 50,
    justifyContent: 'center',
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
    paddingLeft: 8,
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
})

export default SearchBar;
