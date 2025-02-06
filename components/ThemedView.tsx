import React from 'react';
import { ImageBackground, ImageSourcePropType, View, type ViewProps } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';

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
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');

  if (showDefaultBackgroundImage) {
    return (
      <ImageBackground
        // shows the backgroundColor with the image by default, conditional check is within each screen
        source={defaultBackgroundImage || require('@/assets/images/in-motion-orangegold-icon.png')}
        style={[{ flex: 1, backgroundColor }, style]}
        {...otherProps}
      >
        {children}
      </ImageBackground>
    );
  }

  return (
    <View style={[{ backgroundColor }, style]} {...otherProps}>
      {children}
    </View>
  );
}
