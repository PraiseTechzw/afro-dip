import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import { theme } from '../constants/theme';
import * as ImagePicker from 'expo-image-picker';
import { Camera } from 'expo-camera';

export default function IdentifyScreen() {
  const [image, setImage] = useState<string | null>(null);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);

  React.useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const takePhoto = async () => {
    if (hasPermission === null) {
      return;
    }
    if (hasPermission === false) {
      Alert.alert('Permission required', 'Please grant camera permission to take photos');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleIdentify = () => {
    if (!image) {
      Alert.alert('No image selected', 'Please take a photo or select an image first');
      return;
    }
    // TODO: Implement identification logic
    Alert.alert('Identification', 'Processing image...');
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        {image ? (
          <Image source={{ uri: image }} style={styles.image} />
        ) : (
          <View style={styles.placeholder}>
            <Text style={styles.placeholderText}>No image selected</Text>
          </View>
        )}
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={takePhoto}>
          <Text style={styles.buttonText}>Take Photo</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={pickImage}>
          <Text style={styles.buttonText}>Choose from Gallery</Text>
        </TouchableOpacity>

        {image && (
          <TouchableOpacity
            style={[styles.button, styles.identifyButton]}
            onPress={handleIdentify}
          >
            <Text style={styles.buttonText}>Identify Fly</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: theme.spacing.lg,
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
  },
  image: {
    width: '100%',
    height: 300,
    borderRadius: theme.borderRadius.lg,
  },
  placeholder: {
    width: '100%',
    height: 300,
    backgroundColor: theme.colors.gray,
    borderRadius: theme.borderRadius.lg,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    ...theme.typography.body,
    color: theme.colors.textLight,
  },
  buttonContainer: {
    gap: theme.spacing.md,
  },
  button: {
    backgroundColor: theme.colors.primary,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
    alignItems: 'center',
  },
  identifyButton: {
    backgroundColor: theme.colors.primaryDark,
  },
  buttonText: {
    ...theme.typography.body,
    color: theme.colors.white,
    fontWeight: 'bold',
  },
}); 