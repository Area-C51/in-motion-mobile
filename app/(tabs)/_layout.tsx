import React from 'react';
import { Platform } from 'react-native';
import { Tabs } from 'expo-router';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import Header from "@/components/header/Header";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        tabBarInactiveTintColor: Colors[colorScheme ?? 'light'].tabIconDefault, // previously '#888'
        headerShown: true, // instead of default header, using custom header
        // headerTitleAlign: 'center', // using default left align
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground, // component used to customize the background of the bottom tab bar, e.g., blur effects (e.g., on iOS, making the tab bar look semi-transparent), custom gradients, dynamic backgrounds
        tabBarStyle: Platform.select({
          ios: { position: 'absolute' }, // transparent background on iOS for blur effect
          android: {
            backgroundColor: 'transparent', // necessary for semi-transparent blur
            position: 'absolute', // optional, to help with proper rendering
          },
          web: {
            backgroundColor: 'transparent',
            position: 'absolute',
          },
          default: {},
        }),
        tabBarLabelPosition: 'below-icon',

        // custom header logic
        header: () => {
          let rightButton = null;

          if (route.name === 'search') {
            rightButton = (
              <IconSymbol
                size={24}
                name="magnifyingglass.circle.fill"
                color="white"
                // style={{ marginRight: 15 }}
                // onPress={() => alert('Search tapped')} // placeholder
              />
            );
          }
          return <Header title={route.name.toUpperCase()} rightButton={rightButton} />; // custom header component per screen
        },
      })}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
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
          tabBarIcon: ({ color, focused }) => (
            <IconSymbol size={28} name={focused ? 'magnifyingglass.circle.fill' : 'magnifyingglass.circle'} color={color} accessibilityLabel='Search Tab' accessibilityHint='Navigate to the Search screen.' />
          ),
          tabBarLabel: 'Search',
        }}
      />
      <Tabs.Screen
        name="workouts"
        options={{
          title: 'Workouts',
          tabBarIcon: ({ color, focused }) => (
            <IconSymbol size={28} name={focused ? 'square.stack.3d.down.right.fill' : 'square.stack.3d.down.right'} color={color} accessibilityLabel='Workouts Tab' accessibilityHint='Navigate to the Workouts screen.' />
          ),
          tabBarLabel: 'Workouts',
        }}
      />
      {/* <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color, focused }) => (
            <IconSymbol size={28} name={focused ? 'paperplane.fill' : 'paperplane'} color={color} accessibilityLabel='Explore Tab' accessibilityHint='Navigate to the Explore screen.' />
          ),
          tabBarLabel: 'Explore',
        }}
      />
        <Tabs.Screen
          name="how-to"
          options={{
            title: 'How To',
            tabBarIcon: ({ color, focused }) => (
              <IconSymbol size={28} name={focused ? 'book.fill' : 'book'} color={color} accessibilityLabel='How To Tab' accessibilityHint='Navigate to the How To screen.' />
            ),
            tabBarLabel: 'How To',
          }}
        />
      <Tabs.Screen
        name="contact"
        options={{
          title: 'Contact',
          tabBarIcon: ({ color, focused }) => (
            <IconSymbol size={28} name={focused ? 'person.2' : 'person.3'} color={color} accessibilityLabel='Contact Us Tab' accessibilityHint='Navigate to the Contact Us screen.' />
          ),
          tabBarLabel: 'Contact',
        }}
      /> */}
      <Tabs.Screen
        name="prototype"
        options={{
          title: 'Prototype',
          // headerTitle: 'Prototype Screen',
          // headerShown: true, // shows header unlike the other screens
          tabBarIcon: ({ color, focused }) => (
            <IconSymbol size={28} name={focused ? 'wand.and.rays.inverse' : 'wand.and.stars'} color={color} accessibilityLabel='Prototype Tab' accessibilityHint='Navigate to the Prototype screen.' />
          ),
          tabBarLabel: 'Prototype',
        }}
      />
    </Tabs>
  );
}
