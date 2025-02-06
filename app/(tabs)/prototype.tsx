// ThemedText
// It renders a standard Text component with its color set based on the theme. You can pass a type prop (like "title", "defaultSemiBold", etc.) to use different text styles.

import React from 'react';
import ThemedText from '@/components/ThemedText';

export default function Example() {
  return (
    <>
      <ThemedText type="title">This is a title</ThemedText>
      <ThemedText>
        This is default text that will be black in light mode and white in dark mode.
      </ThemedText>
    </>
  );
}

// ThemedView
// It wraps a regular View and applies a background color based on the current theme.

// import React from 'react';
// import ThemedView from '@/components/ThemedView';

// export function ExampleView() {
//   return (
//     <ThemedView style={{ flex: 1, padding: 20 }}>
//       {/* Your content goes here */}
//     </ThemedView>
//   );
// }

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