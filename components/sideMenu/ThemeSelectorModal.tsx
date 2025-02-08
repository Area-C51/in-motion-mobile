import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { useTheme } from '@/contexts/ThemeProvider';
import { useColorScheme } from '@/hooks/useColorScheme';
import { getGlobalStyles, GlobalStyles as gStyles } from '@/constants/GlobalStyles';
import ThemedText from '@/components/ThemedText';
import ThemedView from '@/components/ThemedView';

const ThemeSelectorModal = ({ visible, onClose }: { visible: boolean; onClose: () => void }) => {
  const { theme, setTheme } = useTheme();
  const [selectedTheme, setSelectedTheme] = useState(theme);

  const handleSelection = (newTheme: 'light' | 'dark' | 'system') => {
    setSelectedTheme(newTheme);
    setTheme(newTheme);
    onClose();
  };

  return (
    <Modal
      animationType="none"
      transparent={true}
      visible={visible}
      onRequestClose={onClose} // allows closing modal with back button (Android)
      accessibilityLabel="Light/Dark Theme Modal"
      accessibilityHint="Modal containing Theme option settings"
      accessible={true}
      focusable={true}
    >
      <TouchableWithoutFeedback onPress={onClose} accessibilityLabel="Close theme settings">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <ThemedText type={'header'}>Theme</ThemedText>
            {['system', 'light', 'dark'].map((theme) => (
              <TouchableOpacity key={theme} style={styles.option} onPress={() => handleSelection(theme as any)}>
                <ThemedText style={[styles.optionText, selectedTheme === theme && styles.selected]}>
                  {theme.charAt(0).toUpperCase() + theme.slice(1)}
                </ThemedText>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center'
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
});

export default ThemeSelectorModal;
