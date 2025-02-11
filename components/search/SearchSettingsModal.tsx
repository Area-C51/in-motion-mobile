import React, { useEffect, useRef } from 'react';
import { Animated, Modal, Platform, StyleSheet, Switch, TouchableWithoutFeedback,  View } from 'react-native';
import { useColorScheme } from '@/hooks/useColorScheme';
import { getGlobalStyles, SwitchColors } from '@/constants/GlobalStyles';
import { ThemedText } from '@/components/ThemedText';

interface SearchSettingsModalProps {
  isMenuVisible: boolean;
  toggleSearchModal: () => void;
  dropdownsEnabled: boolean;
  setDropdownsEnabled: (value: boolean) => void;
  aiEnabled: boolean;
  setAiEnabled: (value: boolean) => void;
}

const SearchSettingsModal: React.FC<SearchSettingsModalProps> = ({
  isMenuVisible,
  toggleSearchModal,
  dropdownsEnabled,
  setDropdownsEnabled,
  aiEnabled,
  setAiEnabled,
}) => {
  const theme = useColorScheme();
  const tStyles = getGlobalStyles(theme);
  const slideAnim = useRef(new Animated.Value(150)).current; // search settings menu, initial position is off-screen

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: isMenuVisible ? 0 : 150, // slide to 0 (visible) or 150 (hidden)
      duration: 150,
      useNativeDriver: true,
    }).start();
  }, [isMenuVisible]);

  return (
    <Modal
      animationType='fade'
      transparent={true}
      visible={isMenuVisible}
      onRequestClose={toggleSearchModal} // allows closing modal with back button (Android)
      accessibilityLabel='Search Settings Modal'
      accessibilityHint='Modal containing additional search settings'
      accessible={true}
      focusable={true}
    >
      {/* The first TouchableWithoutFeedback wraps the entire overlay (modalOverlay) and closes the modal when touched */}
      <TouchableWithoutFeedback
        onPress={toggleSearchModal}
        accessibilityLabel='Close search settings'
      >
        <View style={styles.modalContainer}>
          {/* The second TouchableWithoutFeedback wraps searchModalContainer, and onPress={(event) => event.stopPropagation()} prevents touch events from bubbling up to the parent TouchableWithoutFeedback, ensuring the modal stays open when interacting with its contents. */}
          <TouchableWithoutFeedback
            onPress={(event) => event.stopPropagation()}
            accessible={false}
          >
            <Animated.View
              style={[
                styles.searchModal,
                tStyles.menu,
                { transform: [{ translateX: slideAnim }] },
              ]}
              accessibilityLabel='Search Settings Options'
              accessible={true}
              focusable={true}
            >
              {/* Toggle for Dropdown Search */}
              <View style={styles.switchContainer}>
                <ThemedText
                  type={'text'}
                  accessibilityLabel='Dropdown search toggle label'
                >
                  Dropdowns
                </ThemedText>
                <Switch
                  style={styles.searchSwitch}
                  value={dropdownsEnabled}
                  onValueChange={setDropdownsEnabled}
                  // thumbColor={dropdownsEnabled ? SwitchColors.thumbOn : SwitchColors.thumbOff}
                  // trackColor={{ false: SwitchColors.trackOff, true: SwitchColors.trackOn }}
                  accessibilityLabel='Toggle dropdown search'
                  accessibilityHint={`${
                    dropdownsEnabled ? 'Disable' : 'Enable'
                  } dropdown search options`}
                />
              </View>

              {/* Toggle for AI Search */}
              <View style={styles.switchContainer}>
                <ThemedText
                  type={'text'}
                  accessibilityLabel='AI search toggle label'
                >
                  AI Search
                </ThemedText>
                <Switch
                  style={styles.searchSwitch}
                  value={aiEnabled}
                  onValueChange={setAiEnabled}
                  // thumbColor={aiEnabled ? SwitchColors.thumbOn : SwitchColors.thumbOff}
                  // trackColor={{ false: SwitchColors.trackOff, true: SwitchColors.trackOn }}
                  accessibilityLabel='Toggle AI search'
                  accessibilityHint={`${
                    dropdownsEnabled ? 'Disable' : 'Enable'
                  } AI-assisted search`}
                />
              </View>
            </Animated.View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: { // local specific modal style
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    alignItems: 'flex-end',
  },
  searchModal: {
    position: 'absolute',
    top: Platform.OS === 'web' ? 80 : 50,
    width: Platform.OS === 'web' ? 180 : 150,
    borderRadius: 15,
    padding: Platform.OS === 'web' ? 10 : 0,
    paddingVertical: Platform.OS === 'web' ? 10 : 5,
    paddingLeft: Platform.OS === 'web' ? 15 : 15,
    paddingRight: Platform.OS === 'web' ? 15 : 5,
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
  searchSwitch: {},
});

export default SearchSettingsModal;
