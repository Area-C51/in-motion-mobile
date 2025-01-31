import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const DropdownExample = () => {
  const [selectedValue, setSelectedValue] = useState(null);

  const handleValueChange = (value) => {
    setSelectedValue(value);
  };

  return (
    <View style={styles.container}>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedValue}
          onValueChange={handleValueChange}
          style={styles.picker}
        >
          <Picker.Item label="Select a muscle" value={null} />
          <Picker.Item label="Apple" value="apple" />
          <Picker.Item label="Banana" value="banana" />
          <Picker.Item label="Orange" value="orange" />
        </Picker>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  pickerContainer: {
    width: 100, // Match the Picker's width
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  picker: {
    height: 50,
    width: 100, // Set width of Picker and dropdown
  },
});

export default DropdownExample;