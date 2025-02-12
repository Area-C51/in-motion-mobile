import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from 'expo-router';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import { getGlobalStyles, GlobalStyles as gStyles } from '@/constants/GlobalStyles';
import { ThemedText } from '@/components/ThemedText';

export default function Header({ title, rightButton }: { title: string; rightButton?: React.ReactNode }) {
  const theme = useColorScheme();
  const tStyles = getGlobalStyles(theme);
  const navigation = useNavigation();

  return (
    <View style={[styles.headerContainer, {backgroundColor: Colors[theme ?? 'light'].background}]}>
      {/* Profile Picture */}
      <TouchableOpacity /*onPress={() => navigation.navigate('(profile)')} // placeholder*/> 
        <Image
          source={require('@/assets/images/ac51-cobalt.png')} // {{ uri: 'https://placeholder.com/40' }} // replace with user profile URL
          style={styles.profileImage}
        />
      </TouchableOpacity>

      {/* Title */}
      <ThemedText type='header' style={styles.title}>{title}</ThemedText>

      {/* Right Button (Optional, Screen-Specific) */}
      <View style={styles.rightButton}>{rightButton}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 60,
    paddingHorizontal: 15,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  title: {
    flex: 1,
    marginLeft: 10,
  },
  rightButton: {
    width: 40, // ensures spacing is correct when no button exists
    alignItems: 'flex-end',
  },
});
