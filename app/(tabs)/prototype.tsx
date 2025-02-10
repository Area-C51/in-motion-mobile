// when the theme changes, via the system or a user override, the Theme Context updates
// this causes useThemedStyles to re-run, because its dependency, theme, changed, and the new (updated) styles are applied automatically

import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { useColorScheme } from '@/hooks/useColorScheme';
import { getGlobalStyles, GlobalStyles as gStyles } from '@/constants/GlobalStyles';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import ThemeSelectorModal from '@/components/sideMenu/ThemeSelectorModal';

export default function SettingsScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  // these styles are used on its root View and child elements rather than declaring styles in this file

  return (
    <ThemedView showDefaultBackgroundImage={false}>
      <ThemedText type='title'>This is a title</ThemedText>
      <ThemedText type='subtitle'>
        This is default text that will be black in light mode and white in dark
        mode.
      </ThemedText>
      <View>
        <ThemedText>This box has a themed border.</ThemedText>
      </View>

      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <ThemedText>Change Theme</ThemedText>
      </TouchableOpacity>
      <ThemeSelectorModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
    </ThemedView>
  );
}

// File Structure Recap:
// constants/Colors.ts:
// Define your light and dark theme colors here.

// hooks/useColorScheme.ts and hooks/useColorScheme.web.ts:
// Detect the current color scheme (taking care of differences between native and web).

// hooks/useThemeColor.ts:
// Uses the current color scheme to return the correct color based on your definitions and any overrides provided.

// components/ThemedText.tsx & components/ThemedView.tsx:
// The components that automatically apply the theme colors.

// To Do
// Dynamic Theme Switching:
// If you want your app to support manual theme switching (instead of relying solely on the OS setting), consider managing the theme state with a context. You can create a ThemeContext that holds the current theme and a function to toggle it, then modify your useThemeColor hook to first check this context before falling back to the native color scheme.
