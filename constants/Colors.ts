// map defining the color palette for both light and dark themes
// colors are mapped under each theme as key-value pairs where the keys correspond to different UI element and values as the actual color values 

/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = 'rgb(48, 96, 215)'; // 'rgb(255,165,0)' // (10,126,164) #0a7ea4
const tintColorDark = 'rgb(0, 175, 255)';

export const Colors = {
  light: {
    header: 'hsl(0, 0.00%, 10.00%)',
    title: 'hsl(0, 0.00%, 10.00%)',
    subtitle: 'hsl(0, 0.00%, 10.00%)',
    text: 'hsl(0, 0.00%, 35.00%)',
    subtext: 'hsl(0, 0.00%, 60.00%)',
    detail: 'rgb(48, 96, 215)',
    detail2: 'rgb(0, 175, 255)',
    link: 'rgb(10,126,164)',
    background: 'hsl(0, 0.00%, 98.00%)',
    cardBackground: 'hsl(0, 0.00%, 92.00%)',
    modalBackground: 'hsl(0, 0.00%, 95.00%)',
    tint: tintColorLight,
    border: 'rgb(221,221,221)', // #dddddd',
    icon: 'rgb(104,112,118)', // '#687076',
    tabIconDefault: 'hsl(0, 0.00%, 40.00%)', // 'rgb(104,112,118)', // #687076
    tabIconSelected: tintColorLight,
    tabBarBackground: 'rgba(255, 255, 255, 0.7)',
  },
  dark: {
    header: 'hsl(0, 0.00%, 100%)',
    title: 'hsl(0, 0.00%, 100%)',
    subtitle: 'hsl(0, 0.00%, 100%)',
    text: 'hsl(0, 0.00%, 85.00%)',
    subtext: 'hsl(0, 0.00%, 40.00%)',
    detail: 'rgb(48, 96, 215)',
    detail2: 'rgb(0, 175, 255)',
    link: 'rgb(10,126,164)',
    background: 'hsl(200, 6.70%, 8.80%)', // '#151718',
    cardBackground: 'hsl(0, 0.00%, 23.00%)', // '#151718',
    modalBackground: 'hsl(0, 0.00%, 28.00%)',
    tint: tintColorDark,
    border: 'rgb(68,68,68)', // '#444444',
    icon: 'rgb(155,161,166)', // '#9BA1A6',
    tabIconDefault: 'hsl(0, 0.00%, 60.00%)', // 'rgb(155,161,166)', // '#9BA1A6',
    tabIconSelected: tintColorDark,
    tabBarBackground: 'rgba(0, 0, 0, 0.65)',
  },
};
