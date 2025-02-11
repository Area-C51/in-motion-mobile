// when the theme changes, via the system or a user override, the Theme Context updates
// this causes useThemedStyles to re-run, because its dependency, theme, changed and the new (updated) styles are applied automatically

import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import ThemeSelectorModal from '@/components/sideMenu/ThemeSelectorModal';

export default function SettingsScreen() {
  const [modalVisible, setModalVisible] = useState(false);

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
        <ThemedText>Appearance</ThemedText>
      </TouchableOpacity>
      <ThemeSelectorModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
    </ThemedView>
  );
}
