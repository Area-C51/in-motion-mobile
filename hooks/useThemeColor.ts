// this hook builds off of useColorScheme and selects the correct color from the centralized Colors.ts file based on the current theme and color key passed in
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
  const theme = useColorScheme(); // calls useColorScheme to get the current theme
  const colorFromProps = props[theme]; // check for a color override from props

  return colorFromProps ? colorFromProps : Colors[theme][colorName]; // if there is an override in props for the current theme, return that value, else return Colors[theme][colorName]
}
