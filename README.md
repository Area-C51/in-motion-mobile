# Welcome In Motion Mobile

<!-- This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app). -->

## Get started

### Development instructions

1. Clone repository

2. Install dependencies

   ```bash
   npm install
   ```

3. To start the app

   Currently only runs in a browser

   ```bash
   npm start
   ```

   or

   ```bash
   npx expo start
   ```

4. To run project on Android

   Must use a tunnel at this time

   ```bash
   npx expo start --tunnel
   ```

## App Structure and Data Flow

### Front-end

#### Themes - Light/Dark Modes

1. [ThemeProvider.tsx](./contexts/ThemeProvider.tsx)

   * The `ThemeProvider` component manages the app’s theme context (`light`, `dark`, or `system`).
   
   * Uses `AsyncStorage` to persist the theme context selection across app sessions, allowing the user’s theme preference to be retained.
   
   * Shows a splash screen based on system theme while loading the active app theme to avoid unnecessary re-renders
   
   * The `ThemeContext` holds the current theme context and provides access to this context to all child components through `ThemeContext.Provider`.

2. [Colors.ts](./constants/Colors.ts)

   * Defines the color palette for both light and dark themes, centralizing color management.

3. [useColorScheme.ts](./hooks/useColorScheme.ts) and [useColorScheme.web.ts](./hooks/useColorScheme.web.ts)

   * Custom hook that returns the active theme (light, dark, or system) based on the `ThemeProvider` context.
   
   * `useColorScheme.web.ts` specifically handles hydration for web platforms, ensuring the theme is correctly initialized.

4. [useThemeColor.ts](./hooks/useThemeColor.ts)

   * Custom hook that returns the appropriate color for a given type (e.g., header, title, background) based on the active theme from `useColorScheme`.
   
   * Uses the `Colors` palette for the active theme.

5. [ThemedText.tsx](./components/ThemedText.tsx)

   * Wraps the standard `<Text />` component and applies a color based on the active theme from `useThemeColor`.
   
   * Provides centralized styles for text elements.

6. [ThemedView.tsx](./components/ThemedView.tsx)

   * Wraps the standard `<View />` component and applies a background color based on the active theme from `useThemeColor`.
   
   * Also allows for the inclusion of background images.

7. [GlobalStyles](./constants/GlobalStyles.ts)

   * Contains centralized static styles (e.g., `mainContainer`, `contentContainer`) and dynamic themed styles based on the `Colors` palette for each theme type.

8. [useTheme](./hooks/useTheme.ts)

   * Custom hook that allows descendant components of `ThemeProvider` to update the theme context.
   
   * Supports dynamic theme updates, allowing for changes to themed styles, elements, and components.

9. [ThemeSelectorModal](./components/sideMenu/ThemeSelectorModal.tsx)

   * A modal component used to allow users to select and update the theme preference.
   
   * Uses `useTheme` to update the theme context dynamically.

0. All other components can import

   * The current theme from `useColorScheme`.

   * Themed text and view components from `ThemedText` and `ThemedView`.

   * Static and dynamic styles from `GlobalStyles`.

### Back-end

<!-- ### Notes

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions. -->
