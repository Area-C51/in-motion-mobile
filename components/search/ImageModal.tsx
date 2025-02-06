import React, { useEffect, useRef } from 'react';
import { Animated, Image, Modal, Pressable, StyleSheet } from 'react-native';

interface ImageModalProps {
  selectedImage: string | null;
  setSelectedImage: (url: string | null) => void;
  fadeDuration?: number; // customizable fade duration in ms
}

const ImageModal: React.FC<ImageModalProps> = ({
  selectedImage,
  setSelectedImage,
  fadeDuration = 300, // default to 300ms if not provided
}) => {
  // Create an animated value for opacity
  const fadeAnim = useRef(new Animated.Value(0)).current;

  // Run fade animation when selectedImage changes
  useEffect(() => {
    if (selectedImage) {
      // Fade in the entire modal content
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: fadeDuration,
        useNativeDriver: true,
      }).start();
    } else {
      // Fade out the modal content
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: fadeDuration,
        useNativeDriver: true,
      }).start();
    }
  }, [selectedImage, fadeDuration, fadeAnim]);

  return (
    <Modal
      visible={!!selectedImage}
      transparent={true}
      onRequestClose={() => setSelectedImage(null)}
      // Turn off the built-in animation as we'll control it manually
      animationType="none"
      accessibilityLabel="Image full screen view"
    >
      <Animated.View style={[styles.animatedContainer, { opacity: fadeAnim }]}>
        {/* Using Pressable to allow the user to close the modal */}
        <Pressable
          style={styles.modalBackground}
          onPress={() => setSelectedImage(null)}
          accessibilityLabel="Close the image modal"
        >
          {selectedImage && (
            <Image
              source={{ uri: selectedImage }}
              style={styles.fullScreenImage}
              accessibilityLabel="Full screen image"
            />
          )}
        </Pressable>
      </Animated.View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  animatedContainer: {
    flex: 1,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fullScreenImage: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
  },
});

export default ImageModal;
