import React from 'react';
import { Pressable, View, StyleSheet } from 'react-native';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useTheme } from '@/hooks/useTheme';
// import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import { ThemedText } from '@/components/ThemedText';

interface RadioButtonProps {
  label: string;
  value: string;
  selected: boolean;
  onPress: (value: string) => void;
}

const RadioButton: React.FC<RadioButtonProps> = ({
  label,
  value,
  selected,
  onPress,
}) => {
  const theme = useColorScheme(); // Get the current theme
  const themeColors = Colors[theme]; // Get the theme-specific colors
  // const { theme } = useTheme();

  return (
    <Pressable onPress={() => onPress(value)} style={styles.container}>
      {/* Label */}
      <ThemedText type='text' style={styles.label}>
        {label}
      </ThemedText>
      {/* <ThemedText style={[styles.label, { color: themeColors.text }]}>{label}</ThemedText> */}
      {/* Outer Circle */}
      <View style={[styles.outerCircle, { borderColor: themeColors.tint }]}>
        {/* Inner Circle (only visible if selected) */}
        {selected && (
          <View
            style={[styles.innerCircle, { backgroundColor: themeColors.tint }]}
          />
        )}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '80%',
    paddingVertical: 8,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  label: {
    textAlign: 'left',
  },
  outerCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerCircle: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
});

export default RadioButton;
