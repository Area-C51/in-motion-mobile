import React, { useState } from 'react';
import { Modal, View, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useTheme } from '@/hooks/useTheme';
import { getGlobalStyles, GlobalStyles as gStyles } from '@/constants/GlobalStyles';
import { ThemedText } from '@/components/ThemedText';
import RadioButton from '@/components/sideMenu/RadioButton';

const ThemeSelectorModal = ({
  visible,
  onClose,
}: {
  visible: boolean;
  onClose: () => void;
}) => {
  // for updating the theme
  const { theme, setTheme } = useTheme();
  const [selectedTheme, setSelectedTheme] = useState(theme);

  // for using the theme specific styles
  const currentTheme = useColorScheme(); // get the current theme
  const tStyles = getGlobalStyles(currentTheme); // get theme specific styles

  const handleSelection = (newTheme: 'light' | 'dark' | 'system') => {
    setSelectedTheme(newTheme);
    setTheme(newTheme);
    // onClose();
  };

  return (
    <Modal
      animationType='none'
      transparent={true}
      visible={visible}
      onRequestClose={onClose} // allows closing modal with back button (Android)
      accessibilityLabel='Light/Dark Theme Modal'
      accessibilityHint='Modal containing Theme option settings'
      accessible={true}
      focusable={true}
    >
      <TouchableWithoutFeedback
        onPress={onClose}
        accessibilityLabel='Close theme settings'
      >
        <View style={styles.modalContainer}>
          <View style={[styles.modalContent, tStyles.menu]}>
            <ThemedText type={'header'}>Theme</ThemedText>
            {['system', 'light', 'dark'].map((theme) => (
              <RadioButton
                key={theme}
                label={theme.charAt(0).toUpperCase() + theme.slice(1)}
                value={theme}
                selected={selectedTheme === theme}
                onPress={() => handleSelection(theme as any)}
              />
            ))}
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    // can be centralized to GlobalStyles if used elsewhere
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContent: {
    // can be centralized to GlobalStyles if used elsewhere
    padding: 20,
    borderRadius: 20,
    width: '50%',
    alignItems: 'flex-start',
  },
});

export default ThemeSelectorModal;
