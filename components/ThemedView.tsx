// wraps a regular View and applies a background color based on the current theme

import React from 'react';
import { Dimensions, ImageBackground, ImageSourcePropType, StyleSheet, View, type ViewProps } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';

const { width, height } = Dimensions.get('window');
const minScreenDimension = Math.min(width, height); 

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
  // additional props to handle default background image
  showDefaultBackgroundImage?: boolean;
  defaultBackgroundImage?: ImageSourcePropType;
};

export default function ThemedView({
  style,
  lightColor,
  darkColor,
  // additional props to handle default background image
  showDefaultBackgroundImage = true, // image shows as background by default
  defaultBackgroundImage,
  children,
  ...otherProps
}: ThemedViewProps) {
  // useThemeColor hook looks at the current theme (usually via useColorScheme or via a context and uses passed in override values, e.g., a provided lightColor or darkColor prop, or the default color value for the key 'background' in the Colors object, using the current theme
  // if the system is in dark mode, it returns Colors.dark.background; if in light mode, it returns Colors.light.background
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');

  if (showDefaultBackgroundImage) {
    return (
      <View style={[{ flex: 1, backgroundColor }, style]} {...otherProps}>
        <ImageBackground
          // shows the backgroundColor with the image by default, conditional check is within each screen
          source={defaultBackgroundImage || require('@/assets/images/in-motion-orangegold-icon.png')}
          style={styles.backgroundContainer}
          {...otherProps}
        >
        </ImageBackground>
        {children}
      </View>
    );
  }

  return (
    <View style={[{ backgroundColor }, style]} {...otherProps}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create ({
  backgroundContainer: {
    position: 'absolute',
    height: minScreenDimension,
    width: minScreenDimension,
    top: (height - minScreenDimension) / 2,
    left: (width - minScreenDimension) / 2,
  },
})
