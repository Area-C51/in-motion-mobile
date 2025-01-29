import React, { useState } from 'react';
import { View, Text, Button, Switch, StyleSheet, TouchableOpacity, Animated } from 'react-native';

const ToggleMenu = () => {
  const [isMenuVisible, setIsMenuVisible] = useState(false); // Controls the visibility of the menu
  const [toggleOption1, setToggleOption1] = useState(false);
  const [toggleOption2, setToggleOption2] = useState(false);

  const toggleMenu = () => {
    setIsMenuVisible(prevState => !prevState); // Toggle the menu visibility
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleMenu} style={styles.menuButton}>
        <Text style={styles.menuButtonText}>Menu</Text>
      </TouchableOpacity>

      {/* Animated View for the menu */}
      {isMenuVisible && (
        <Animated.View style={[styles.menuContainer, { opacity: isMenuVisible ? 1 : 0 }]}>
          <View style={styles.menuOption}>
            <Text style={styles.optionText}>Dropdowns</Text>
            <Switch
              value={toggleOption1}
              onValueChange={setToggleOption1}
              accessibilityLabel="Toggle Dropdowns"
              accessibilityHint="Toggles between Dropdown search options on or off"
            />
          </View>
          <View style={styles.menuOption}>
            <Text style={styles.optionText}>AI Assist</Text>
            <Switch
              value={toggleOption2}
              onValueChange={setToggleOption2}
              accessibilityLabel="Toggle AI Assist"
              accessibilityHint="Toggles between basic search and AI assisted search"
            />
          </View>
        </Animated.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
  },
  menuButtonText: {
    color: 'white',
    fontSize: 16,
  },
  menuContainer: {
    position: 'absolute',
    top: 60, // Position below the button
    backgroundColor: '#FFF',
    padding: 10,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
    elevation: 5, // For Android shadow
  },
  menuOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  optionText: {
    fontSize: 16,
    marginRight: 10,
  },
});

export default ToggleMenu;
