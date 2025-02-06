// accepts an object with optional light and dark overrides and a color name (such as "text" or "background")
// returns the appropriate color value based on the current theme
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
