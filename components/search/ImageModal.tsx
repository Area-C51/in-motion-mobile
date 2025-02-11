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
  // create an animated value for opacity
  const fadeAnim = useRef(new Animated.Value(0)).current;

  // run fade animation when selectedImage changes
  useEffect(() => {
    if (selectedImage) {
      // fade in the entire modal content
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: fadeDuration,
        useNativeDriver: true,
      }).start();
    } else {
      // fade out the modal content
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
      animationType="none" // no built-in animation, controlled manually
      accessibilityLabel="Image full screen view"
    >
      <Animated.View style={[styles.animatedContainer, { opacity: fadeAnim }]}>
        <Pressable // allows the user to close the modal
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
  modalBackground: { // local specific modal style
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
