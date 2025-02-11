import { StyleSheet, Image, Platform } from 'react-native';
import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';

export default function Contact() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <Image
          source={require('@/assets/images/ac51-cobalt.png')}
          style={styles.ac51Logo}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type='title'>Contact Us</ThemedText>
      </ThemedView>
      <ThemedText>
        This app includes example code to help you get started.
      </ThemedText>
      <Collapsible title='Spencer Lau'>
        <ThemedText>
          GitHub:{' '}
          <ExternalLink href='https://github.com/Spencer-Lau/'>
            <ThemedText type='link'>github.com/Spencer-Lau/</ThemedText>
          </ExternalLink>
        </ThemedText>
      </Collapsible>
      <Collapsible title='Contributor2'>
        <ThemedText>
          GitHub:{' '}
          <ExternalLink href='https://github.com/'>
            <ThemedText type='link'>github.com/</ThemedText>
          </ExternalLink>
        </ThemedText>
      </Collapsible>
      <Collapsible title='Contributor3'>
        <ThemedText>
          GitHub:{' '}
          <ExternalLink href='https://github.com/'>
            <ThemedText type='link'>github.com/</ThemedText>
          </ExternalLink>
        </ThemedText>
      </Collapsible>
      <Collapsible title='Contributor4'>
        <ThemedText>
          GitHub:{' '}
          <ExternalLink href='https://github.com/'>
            <ThemedText type='link'>github.com/</ThemedText>
          </ExternalLink>
        </ThemedText>
      </Collapsible>
      <Collapsible title='Support'>
        <ExternalLink href=''>
          <ThemedText type='link'>support@inmotion.com</ThemedText>
        </ExternalLink>
      </Collapsible>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  ac51Logo: {
    height: '100%',
    width: '100%',
    top: 0,
    right: 100,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
