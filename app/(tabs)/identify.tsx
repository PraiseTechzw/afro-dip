import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Alert,
  Animated,
} from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { theme } from '../../constants/theme';

export default function IdentifyScreen() {
  const router = useRouter();
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [type, setType] = useState(CameraType.back);
  const [isLoading, setIsLoading] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const cameraRef = useRef<Camera>(null);
  const [flashMode, setFlashMode] = useState(Camera.Constants.FlashMode.off);
  const [zoom, setZoom] = useState(0);
  const [focusAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleCapture = async () => {
    if (cameraRef.current) {
      try {
        setIsLoading(true);
        const photo = await cameraRef.current.takePictureAsync({
          quality: 1,
          base64: true,
          exif: true,
        });
        setCapturedImage(photo.uri);
        
        // Animate focus effect
        Animated.sequence([
          Animated.timing(focusAnim, {
            toValue: 1,
            duration: 200,
            useNativeDriver: true,
          }),
          Animated.timing(focusAnim, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
          }),
        ]).start();
      } catch (error) {
        Alert.alert('Error', 'Failed to capture image');
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleRetake = () => {
    setCapturedImage(null);
  };

  const handleAnalyze = () => {
    if (capturedImage) {
      setIsLoading(true);
      // Simulate analysis
      setTimeout(() => {
        setIsLoading(false);
        router.push('/species/1'); // Navigate to species detail
      }, 2000);
    }
  };

  const toggleFlash = () => {
    setFlashMode(
      flashMode === Camera.Constants.FlashMode.off
        ? Camera.Constants.FlashMode.on
        : Camera.Constants.FlashMode.off
    );
  };

  const toggleCameraType = () => {
    setType(
      type === CameraType.back ? CameraType.front : CameraType.back
    );
  };

  const handleZoom = (value: number) => {
    setZoom(Math.min(Math.max(0, zoom + value), 1));
  };

  if (hasPermission === null) {
    return <View style={styles.container} />;
  }

  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text style={styles.permissionText}>No access to camera</Text>
        <Text style={styles.permissionSubtext}>
          Please enable camera access in your device settings
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {capturedImage ? (
        <View style={styles.previewContainer}>
          <Image source={{ uri: capturedImage }} style={styles.preview} />
          <View style={styles.previewActions}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={handleRetake}
            >
              <MaterialCommunityIcons
                name="camera-retake"
                size={24}
                color={theme.colors.white}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={handleAnalyze}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color={theme.colors.white} />
              ) : (
                <MaterialCommunityIcons
                  name="magnify"
                  size={24}
                  color={theme.colors.white}
                />
              )}
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <Camera
          ref={cameraRef}
          style={styles.camera}
          type={type}
          flashMode={flashMode}
          zoom={zoom}
        >
          <Animated.View
            style={[
              styles.focusOverlay,
              {
                opacity: focusAnim,
                transform: [
                  {
                    scale: focusAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [1, 1.2],
                    }),
                  },
                ],
              },
            ]}
          />
          <View style={styles.controls}>
            <View style={styles.topControls}>
              <TouchableOpacity
                style={styles.controlButton}
                onPress={toggleFlash}
              >
                <MaterialCommunityIcons
                  name={flashMode === Camera.Constants.FlashMode.off ? 'flash-off' : 'flash'}
                  size={24}
                  color={theme.colors.white}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.controlButton}
                onPress={toggleCameraType}
              >
                <MaterialCommunityIcons
                  name="camera-flip"
                  size={24}
                  color={theme.colors.white}
                />
              </TouchableOpacity>
            </View>

            <View style={styles.bottomControls}>
              <TouchableOpacity
                style={styles.zoomButton}
                onPress={() => handleZoom(-0.1)}
              >
                <MaterialCommunityIcons
                  name="minus"
                  size={24}
                  color={theme.colors.white}
                />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.captureButton}
                onPress={handleCapture}
                disabled={isLoading}
              >
                {isLoading ? (
                  <ActivityIndicator color={theme.colors.white} />
                ) : (
                  <MaterialCommunityIcons
                    name="camera"
                    size={32}
                    color={theme.colors.white}
                  />
                )}
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.zoomButton}
                onPress={() => handleZoom(0.1)}
              >
                <MaterialCommunityIcons
                  name="plus"
                  size={24}
                  color={theme.colors.white}
                />
              </TouchableOpacity>
            </View>
          </View>
        </Camera>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  permissionText: {
    ...theme.typography.h2,
    color: theme.colors.text,
    textAlign: 'center',
    marginBottom: 8,
  },
  permissionSubtext: {
    ...theme.typography.body,
    color: theme.colors.textLight,
    textAlign: 'center',
  },
  camera: {
    flex: 1,
  },
  focusOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  controls: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  topControls: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 20,
    gap: 12,
  },
  bottomControls: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  controlButton: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 20,
    padding: 8,
  },
  captureButton: {
    backgroundColor: theme.colors.primary,
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  zoomButton: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  previewContainer: {
    flex: 1,
    position: 'relative',
  },
  preview: {
    flex: 1,
  },
  previewActions: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  actionButton: {
    backgroundColor: theme.colors.primary,
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
}); 