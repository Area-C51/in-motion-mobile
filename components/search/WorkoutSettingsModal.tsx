import React, { useRef } from 'react';
import { Animated, Modal } from 'react-native';
import { useColorScheme } from '@/hooks/useColorScheme';
import { getGlobalStyles } from '@/constants/GlobalStyles';

interface WorkoutSettingsModalProps {
}

const WorkoutSettingsModal: React.FC<WorkoutSettingsModalProps> = ({
}) => {
  const theme = useColorScheme();
  const tStyles = getGlobalStyles(theme);
  const slideAnim = useRef(new Animated.Value(150)).current; // search settings menu, initial position is off-screen

  return (
    <Modal>A way to sort workouts by recency or alphabetical order. Maybe a combination of radio buttons as indicators and swiches for each option, the last switched option focuses the corresponding radio button. Or a drop down with all 4 options.</Modal>
  );
};

export default WorkoutSettingsModal;
