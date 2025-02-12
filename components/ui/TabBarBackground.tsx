// This is a shim for web and Android where the tab bar is generally opaque.
// Code updated to simulate a blurred background on Android and web

import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { BlurView } from 'expo-blur';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';

// export default undefined;

export default function TabBarBackground() { // new default now that blurring is 
  const theme = useColorScheme();

  return (
    <>
    {/*There is an iOS specific component, not necessary to handle iOS here*/}
      {/*Platform.OS === 'ios' || */Platform.OS === 'android' ? (
        <BlurView
          intensity={100}
          tint={theme === 'light' ? 'light' : 'dark'}
          style={StyleSheet.absoluteFill} />
      ) : (
        <View
          style={{
            backgroundColor: Colors[theme ?? 'light'].tabBarBackground, // semi-transparent fallback for web
            position: 'absolute',
            width: '100%',
            height: '100%',
            ...(Platform.OS === 'web' ? { 
              backdropFilter: 'blur(10px)', // enables blur effect on web 
              WebkitBackdropFilter: 'blur(10px)', // Safari support 
            } : {})
          }}
        />
      )}
    </>
  );
}

export function useBottomTabOverflow() {
  return 0;
}
