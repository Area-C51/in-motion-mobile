import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '@/contexts/ThemeProvider';
import ThemedText from '@/components/ThemedText';

const ThemeSelectorModal = ({ visible, onClose }: { visible: boolean; onClose: () => void }) => {
  const { theme, setTheme } = useTheme();
  const [selectedTheme, setSelectedTheme] = useState(theme);

  const handleSelection = (newTheme: 'light' | 'dark' | 'system') => {
    setSelectedTheme(newTheme);
    setTheme(newTheme);
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.header}>Select Theme</Text>
          {['system', 'light', 'dark'].map((theme) => (
            <TouchableOpacity key={theme} style={styles.option} onPress={() => handleSelection(theme as any)}>
              <ThemedText style={[styles.optionText, selectedTheme === theme && styles.selected]}>
                {theme.charAt(0).toUpperCase() + theme.slice(1)}
              </ThemedText>
            </TouchableOpacity>
          ))}
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center'

  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10

  },
  option: {
    padding: 10,
    width: '100%',
    alignItems: 'center'

  },
  optionText: {
    fontSize: 18

  },
  selected: {
    fontWeight: 'bold',
    color: 'blue'
  },
  closeButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: 'gray',
    borderRadius: 5
  },
  closeText: {
    color: 'white',
    fontSize: 16
    
  },
});

export default ThemeSelectorModal;
