// this hook builds off of useColorScheme by selecting the correct color from the centralized Colors file based on the current theme
// it accepts an object with optional overrides, e.g., { light: '#f00', dark: '#0f0' } and a color key, e.g., "text", "background", or "border"
// if an override is provided, it is used, otherwise, it falls back to the default value defined in Colors[theme][colorName]
// if a prop like lightColor or darkColor is passed directly into a component, that value takes precedence over the value defined in your Colors constants
// to override the default color for a specific component instance, pass the lightColor or darkColor prop; otherwise, it will use the default color from your Colors file

/**
 * Learn more about light and dark modes:
 * https://docs.expo.dev/develop/user-interface/color-themes/
 */

import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
  const theme = useColorScheme() ?? 'light';
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors[theme][colorName];
  }
}
