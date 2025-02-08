// renders a standard Text component with its style and color dynamically defined by type and theme

import { Text, type TextProps, StyleSheet } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';
import { Colors } from '@/constants/Colors';

export type ThemedTextProps = TextProps & {
  // lightColor?: string; // optional props for user custom colors, not needed as they are now dynamically defined by type and theme
  // darkColor?: string;
  type?: 'header' | 'title' | 'subtitle' | 'text' | 'subtext' | 'detail' | 'link';
};

// maps each text type to a light and dark mode color from Colors.ts
const typeColorMapping: Record<string, { light: string; dark: string }> = {
  header: { light: Colors.light.header, dark: Colors.dark.header },
  title: { light: Colors.light.title, dark: Colors.dark.title },
  subtitle: { light: Colors.light.subtitle, dark: Colors.dark.subtitle },
  text: { light: Colors.light.text, dark: Colors.dark.text },
  subtext: { light: Colors.light.subtext, dark: Colors.dark.subtext },
  detail: { light: Colors.light.detail, dark: Colors.dark.detail },
};

export default function ThemedText({
  style,
  // lightColor, // allow for user provided custom light and dark colors
  // darkColor,
  type = 'text', // 'default'
  ...rest
}: ThemedTextProps) {
  // determine the color based on type, if not defined, default to the "text" colors
  const color = useThemeColor(
    typeColorMapping[type] || typeColorMapping['text'],
    'text'
  );
  // const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  return (
    <Text
      style={[
        { color },
        type === 'header' ? styles.header : undefined,
        type === 'title' ? styles.title : undefined,
        type === 'subtitle' ? styles.subtitle : undefined,
        type === 'text' ? styles.text : undefined,
        type === 'subtext' ? styles.subtext : undefined,
        type === 'detail' ? styles.detail : undefined,
        // type === 'default' ? styles.default : undefined,
        // type === 'title' ? styles.title : undefined,
        // type === 'defaultSemiBold' ? styles.defaultSemiBold : undefined,
        // type === 'subtitle' ? styles.subtitle : undefined,
        type === 'link' ? styles.link : undefined,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 22,
    fontWeight: '700',
    lineHeight: 32,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 24,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 24,
  },
  text: {
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
  },
  subtext: {
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
  },
  detail: {
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 24,
  },
  // default: {
  //   fontSize: 16,
  //   lineHeight: 24,
  // },
  // defaultSemiBold: {
  //   fontSize: 16,
  //   lineHeight: 24,
  //   fontWeight: '600',
  // },
  // title: {
  //   fontSize: 32,
  //   fontWeight: 'bold',
  //   lineHeight: 32,
  // },
  // subtitle: {
  //   fontSize: 20,
  //   fontWeight: 'bold',
  // },
  link: {
    lineHeight: 30,
    fontSize: 16,
    color: '#0a7ea4',
  },
});
