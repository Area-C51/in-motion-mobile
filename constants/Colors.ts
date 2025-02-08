// defines the actual color values for both light and dark themes

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
    text: 'hsl(0, 0.00%, 40.00%)',
    subtext: 'hsl(0, 0.00%, 60.00%)',
    detail: 'rgb(48, 96, 215)',
    detail2: 'rgb(0, 175, 255)',

    // header: 'rgb(17,24,28)', // '#11181C',
    // text: 'rgb(17,24,28)', // '#11181C',
    // subtext: 'rgb(135, 135, 135)',
    background: 'hsl(0, 0.00%, 98.00%)',
    cardBackground: 'hsl(0, 0.00%, 98.00%)',
    tint: tintColorLight,
    border: 'rgb(221,221,221)', // #dddddd',
    // primary: 'rgb(52,152,219)', // '#3498db',
    // secondary: 'rgb(46,204,113)', // '#2ecc71',
    icon: 'rgb(104,112,118)', // '#687076',
    tabIconDefault: 'rgb(104,112,118)', // #687076
    tabIconSelected: tintColorLight,
  },
  dark: {
    header: 'hsl(0, 0.00%, 100%)',
    title: 'hsl(0, 0.00%, 100%)',
    subtitle: 'hsl(0, 0.00%, 100%)',
    text: 'hsl(0, 0.00%, 70.00%)',
    subtext: 'hsl(0, 0.00%, 40.00%)',
    detail: 'rgb(48, 96, 215)',
    detail2: 'rgb(0, 175, 255)',

    // header: 'rgb(236,237,238)',
    // text: 'rgb(236,237,238)', // '#ECEDEE',
    // subtext: 'rgb(120, 120, 120)',
    background: 'hsl(200, 6.70%, 8.80%)', // '#151718',
    cardBackground: 'hsl(0, 0.00%, 10.00%)', // '#151718',
    tint: tintColorDark,
    border: 'rgb(68,68,68)', // '#444444',
    // primary: 'rgb(155,89,182)', // '#9b59b6',
    // secondary: 'rgb(231,76,60)', // '#e74c3c',
    icon: 'rgb(155,161,166)', // '#9BA1A6',
    tabIconDefault: 'rgb(155,161,166)', // '#9BA1A6',
    tabIconSelected: tintColorDark,
  },
};
