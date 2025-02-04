// This file is a fallback for using MaterialIcons on Android and web.

import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { SymbolWeight } from 'expo-symbols';
import React from 'react';
import { AccessibilityProps, OpaqueColorValue, StyleProp, TextStyle } from 'react-native'; // extended to include React Native's built-in AccessibilityProps

// Add your SFSymbol to MaterialIcons mappings here.
const MAPPING = {
  // See MaterialIcons here: https://icons.expo.fyi
  // See SF Symbols in the SF Symbols app on Mac.
  'house': 'home', // home tab
  'house.fill': 'house',
  'magnifyingglass.circle': 'search', // search tab
  'magnifyingglass.circle.fill': 'saved-search',
  'paperplane': 'keyboard-double-arrow-right', // explore tab
  'paperplane.fill': 'double-arrow',
  'book': 'local-library', // how to tab
  'book.fill': 'menu-book',
  'person.3': 'people', // contacts tab
  'person.2': 'people-outline',
  'wand.and.stars': 'auto-fix-normal', // test tab
  'wand.and.rays.inverse': 'auto-fix-high',
  'line.horizontal.3': 'menu-open', // search settings menu
  'magnifyingglass': 'search', // dropdown submit button
  'xmark': 'remove', // tbd
  'ellipsis': 'menu', // tbd
  'chevron.left.forwardslash.chevron.right': 'code', // none
  'chevron.right': 'chevron-right', // none
} as Partial<
  Record<
    import('expo-symbols').SymbolViewProps['name'],
    React.ComponentProps<typeof MaterialIcons>['name']
  >
>;

export type IconSymbolName = keyof typeof MAPPING;

/**
 * An icon component that uses native SFSymbols on iOS, and MaterialIcons on Android and web. This ensures a consistent look across platforms, and optimal resource usage.
 *
 * Icon `name`s are based on SFSymbols and require manual mapping to MaterialIcons.
 */
export function IconSymbol({
  name,
  size = 24,
  color,
  style,
  accessibilityLabel,
  accessibilityHint,
}: {
  name: IconSymbolName;
  size?: number;
  color: string | OpaqueColorValue;
  style?: StyleProp<TextStyle>;
  weight?: SymbolWeight;
} & AccessibilityProps) {
  return (
    <MaterialIcons
      color={color}
      size={size}
      name={MAPPING[name]}
      style={style}
      // updated props definition to include accessibilityLabel and accessibilityHint to the underlying component for screen readers
      accessible // accessible prop ensures the component is recognized as an accessible element
      accessibilityLabel={accessibilityLabel}
      accessibilityHint={accessibilityHint}
    />
  );
}
