import { Image, StyleSheet } from 'react-native';
import { Link } from 'expo-router';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import ThemedText from '@/components/ThemedText';
import ThemedView from '@/components/ThemedView';

export default function HowTo() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/in-motion-orangegold-icon.png')}
          style={styles.immLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome!</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 1: Try it out as a guest</ThemedText>
        <ThemedText>
          Search for exercises to find matches in the
          <Link href='/search'>
            <ThemedText style={styles.linkFont} type="defaultSemiBold"> "Search" </ThemedText>
          </Link>
          tab, then tap any image to view it in full or use the button below to see more details. {'\n'}{'\n'}
          Looking for more specific results? Check out the search settings menu for more options or explore the AI assisted search!
          {/* Edit <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText> to see changes.
          Press{' '}
          <ThemedText type="defaultSemiBold">
            {Platform.select({
              ios: 'cmd + d',
              android: 'cmd + m',
              web: 'F12'
            })}
          </ThemedText>{' '}
          to open developer tools. */}
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 2: Create your own workouts</ThemedText>
        <ThemedText>
          Want to build custom workouts? By creating an account, you can design your own workouts and add any exercises you discover. {'\n'}{'\n'}
          Your most recent workouts will be available right on the home screen, or you can access all them from the
          <Link href='/search'>
            <ThemedText style={styles.linkFont} type="defaultSemiBold"> "Workouts" </ThemedText>
          </Link>
          tab. From there, easily edit or remove exercises, or even delete entire workouts.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 3: Craving something new?</ThemedText>
        <ThemedText>
          Head back to the home screen to see the random exercise of the day or tap the refresh button for even more options.
        </ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  immLogo: {
    height: '100%',
    width: '100%',
    top: 0,
    right: 100,
    position: 'absolute',
  },
  linkFont: {
    color: '#0000FF',
  }
});
