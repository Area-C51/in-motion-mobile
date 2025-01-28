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

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        tabBarInactiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        // headerTitleAlign: 'center',
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute',
          },
          default: {},
        }),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color,focused }) => <IconSymbol size={28} name={focused ? 'house.fill' : 'house.fill'} color={color} accessibilityLabel='Home Tab' accessibilityHint='Navigate to the Home screen.' />,
          // added accessibility props, needed to update the props definition to include accessibilityLabel and accessibilityHint in IconSymbol
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: 'Search',
          tabBarIcon: ({ color,focused }) => <IconSymbol size={28} name={focused ? 'search' : 'search'} color={color} accessibilityLabel='Search Tab' accessibilityHint='Navigate to the Search screen.' />,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color,focused }) => <IconSymbol size={28} name={focused ? 'paperplane.fill' : 'paperplane.fill'} color={color} accessibilityLabel='Explore Tab' accessibilityHint='Navigate to the Explore screen.' />,
        }}
      />
        <Tabs.Screen
          name="how-to"
          options={{
            title: 'How To',
            tabBarIcon: ({ color,focused }) => <IconSymbol size={28} name={focused ? 'menu-book' : 'menu-book'} color={color} accessibilityLabel='How To Tab' accessibilityHint='Navigate to the How To screen.' />,
          }}
        />
      <Tabs.Screen
        name="contact"
        options={{
          title: 'Contact',
          tabBarIcon: ({ color,focused }) => <IconSymbol size={28} name={focused ? 'people-outline' : 'people'} color={color} accessibilityLabel='Contact Us Tab' accessibilityHint='Navigate to the Contact Us screen.' />,
        }}
      />
    </Tabs>
  );
}
