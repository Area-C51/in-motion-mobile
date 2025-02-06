import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const activeColor = Colors[colorScheme ?? 'light'].tint;
  const inactiveColor = '#888';

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: activeColor,
        tabBarInactiveTintColor: inactiveColor,
        // tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        // tabBarInactiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        // headerTitleAlign: 'center',
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          // use a transparent background on iOS to show the blur effect
          ios: { position: 'absolute' },
          default: {},
        }),
        tabBarLabelPosition: 'below-icon', // places labels below the icons
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color,focused }) => (
            <IconSymbol size={28} name={focused ? 'house.fill' : 'house'} color={color}
            // style={{ opacity: focused ? 1 : 0.5 }} // dim effect (excessive with current colors, not needed)
            accessibilityLabel='Home Tab' accessibilityHint='Navigate to the Home screen.' />
          ),
          tabBarLabel: 'Home',
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: 'Search',
          tabBarIcon: ({ color,focused }) => (
            <IconSymbol size={28} name={focused ? 'magnifyingglass.circle.fill' : 'magnifyingglass.circle'} color={color} accessibilityLabel='Search Tab' accessibilityHint='Navigate to the Search screen.' />
          ),
          tabBarLabel: 'Search',
        }}
      />
      <Tabs.Screen
        name="workouts"
        options={{
          title: 'Workouts',
          tabBarIcon: ({ color,focused }) => (
            <IconSymbol size={28} name={focused ? 'square.stack.3d.down.right.fill' : 'square.stack.3d.down.right'} color={color} accessibilityLabel='Workouts Tab' accessibilityHint='Navigate to the Workouts screen.' />
          ),
          tabBarLabel: 'Workouts',
        }}
      />
      {/* <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color,focused }) => (
            <IconSymbol size={28} name={focused ? 'paperplane.fill' : 'paperplane'} color={color} accessibilityLabel='Explore Tab' accessibilityHint='Navigate to the Explore screen.' />
          ),
          tabBarLabel: 'Explore',
        }}
      />
        <Tabs.Screen
          name="how-to"
          options={{
            title: 'How To',
            tabBarIcon: ({ color,focused }) => (
              <IconSymbol size={28} name={focused ? 'book.fill' : 'book'} color={color} accessibilityLabel='How To Tab' accessibilityHint='Navigate to the How To screen.' />
            ),
            tabBarLabel: 'How To',
          }}
        />
      <Tabs.Screen
        name="contact"
        options={{
          title: 'Contact',
          tabBarIcon: ({ color,focused }) => (
            <IconSymbol size={28} name={focused ? 'person.2' : 'person.3'} color={color} accessibilityLabel='Contact Us Tab' accessibilityHint='Navigate to the Contact Us screen.' />
          ),
          tabBarLabel: 'Contact',
        }}
      /> */}
      <Tabs.Screen
        name="prototype"
        options={{
          title: 'Prototype',
          headerTitle: 'Prototype Screen',
          // headerShown: true, // shows header unlike the other screens
          tabBarIcon: ({ color,focused }) => (
            <IconSymbol size={28} name={focused ? 'wand.and.rays.inverse' : 'wand.and.stars'} color={color} accessibilityLabel='Prototype Tab' accessibilityHint='Navigate to the Prototype screen.' />
          ),
          tabBarLabel: 'Prototype',
        }}
      />
    </Tabs>
  );
}
