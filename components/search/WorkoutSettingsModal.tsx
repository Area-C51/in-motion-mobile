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
    <Modal></Modal>
  );
};

export default WorkoutSettingsModal;
