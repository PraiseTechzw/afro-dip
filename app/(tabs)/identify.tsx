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
  StatusBar,
  useWindowDimensions,
} from 'react-native';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { theme } from '../../constants/theme';
import * as Haptics from 'expo-haptics';

const CameraConstants = {
  Type: {
    back: 'back' as const,
    front: 'front' as const,
  },
  FlashMode: {
    off: 'off' as const,
    on: 'on' as const,
  },
};

const IdentifyScreen = () => {
  const router = useRouter();
  const { width: screenWidth } = useWindowDimensions();
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [type, setType] = useState<'back' | 'front'>(CameraConstants.Type.back);
  const [isLoading, setIsLoading] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const cameraRef = useRef<typeof Camera>(null);
  const [flashMode, setFlashMode] = useState<'off' | 'on'>(CameraConstants.FlashMode.off);
  const [zoom, setZoom] = useState(0);
  const [focusAnim] = useState(new Animated.Value(0));
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  
  // Animation values
  const shutterAnimation = useRef(new Animated.Value(1)).current;
  const previewSlideIn = useRef(new Animated.Value(screenWidth)).current;

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const animateShutter = () => {
    Animated.sequence([
      Animated.timing(shutterAnimation, {
        toValue: 0,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(shutterAnimation, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const animatePreviewIn = () => {
    Animated.spring(previewSlideIn, {
      toValue: 0,
      useNativeDriver: true,
      tension: 50,
      friction: 7,
    }).start();
  };

  const animatePreviewOut = () => {
    Animated.spring(previewSlideIn, {
      toValue: screenWidth,
      useNativeDriver: true,
      tension: 50,
      friction: 7,
    }).start(() => setCapturedImage(null));
  };

  const handleCapture = async () => {
    if (cameraRef.current) {
      try {
        setIsLoading(true);
        // Provide haptic feedback
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        
        // Animate shutter effect
        animateShutter();
        
        // Animate focus ring
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
        
        const photo = await cameraRef.current.takePictureAsync({
          quality: 1,
          base64: true,
          exif: true,
        });
        
        setCapturedImage(photo.uri);
        animatePreviewIn();
      } catch (error) {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
        Alert.alert('Error', 'Failed to capture image');
        console.error('Camera error:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handlePickImage = async () => {
    try {
      // Request permissions
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
      if (status !== 'granted') {
        Alert.alert('Permission denied', 'We need access to your photos to select an image');
        return;
      }
      
      // Launch image picker
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      
      if (!result.canceled && result.assets && result.assets.length > 0) {
        setCapturedImage(result.assets[0].uri);
        animatePreviewIn();
      }
    } catch (error) {
      console.error('Image picker error:', error);
      Alert.alert('Error', 'Failed to pick image from gallery');
    }
  };

  const handleRetake = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    animatePreviewOut();
  };

  const handleAnalyze = async () => {
    if (capturedImage) {
      try {
        setIsAnalyzing(true);
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        
        // Simulate API call to identify species
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Navigate to results
        router.push('/species/1');
      } catch (error) {
        Alert.alert('Error', 'Failed to analyze image');
      } finally {
        setIsAnalyzing(false);
      }
    }
  };

  const toggleFlash = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setFlashMode(
      flashMode === 'off' 
        ? 'on' 
        : 'off'
    );
  };

  const toggleCameraType = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setType(
      type === 'back' 
        ? 'front' 
        : 'back'
    );
  };

  const handleZoom = (value: number) => {
    const newZoom = Math.min(Math.max(0, zoom + value), 1);
    if (newZoom !== zoom) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      setZoom(newZoom);
    }
  };

  if (hasPermission === null) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
        <Text style={styles.loadingText}>Requesting camera permission...</Text>
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <View style={styles.permissionContainer}>
        <MaterialCommunityIcons 
          name="camera-off" 
          size={64} 
          color={theme.colors.error} 
        />
        <Text style={styles.permissionText}>Camera access denied</Text>
        <Text style={styles.permissionSubtext}>
          Please enable camera access in your device settings to identify species
        </Text>
        <TouchableOpacity 
          style={styles.permissionButton}
          onPress={() => router.back()}
        >
          <Text style={styles.permissionButtonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Camera View */}
      <Camera
        ref={cameraRef}
        style={styles.camera}
        type={type}
        flashMode={flashMode}
        zoom={zoom}
      >
        {/* Focus animation overlay */}
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
        
        {/* Shutter animation */}
        <Animated.View 
          style={[
            styles.shutterEffect,
            { opacity: Animated.subtract(1, shutterAnimation) }
          ]} 
        />
        
        {/* Camera UI Controls */}
        <View style={styles.controls}>
          {/* Top Controls */}
          <View style={styles.topControls}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => router.back()}
            >
              <MaterialCommunityIcons
                name="arrow-left"
                size={24}
                color={theme.colors.white}
              />
            </TouchableOpacity>
            
            <View style={styles.rightControls}>
              <TouchableOpacity
                style={[
                  styles.controlButton,
                  flashMode === 'off' && styles.activeControlButton
                ]}
                onPress={toggleFlash}
              >
                <MaterialCommunityIcons
                  name={flashMode === 'off' ? 'flash-off' : 'flash'}
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
          </View>

          {/* Zoom indicator */}
          {zoom > 0 && (
            <View style={styles.zoomIndicator}>
              <Text style={styles.zoomText}>{`${(zoom * 100).toFixed(0)}%`}</Text>
            </View>
          )}

          {/* Bottom Controls */}
          <View style={styles.bottomControls}>
            <TouchableOpacity
              style={styles.galleryButton}
              onPress={handlePickImage}
            >
              <MaterialCommunityIcons
                name="image"
                size={24}
                color={theme.colors.white}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.captureButton,
                isLoading && styles.disabledCaptureButton
              ]}
              onPress={handleCapture}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color={theme.colors.white} size="large" />
              ) : (
                <View style={styles.captureButtonInner} />
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.zoomButton}
              onPress={() => handleZoom(0.1)}
            >
              <MaterialCommunityIcons
                name="magnify-plus"
                size={24}
                color={theme.colors.white}
              />
            </TouchableOpacity>
          </View>
        </View>
      </Camera>
      
      {/* Image Preview */}
      {capturedImage && (
        <Animated.View 
          style={[
            styles.previewContainer,
            { transform: [{ translateX: previewSlideIn }] }
          ]}
        >
          <Image source={{ uri: capturedImage }} style={styles.preview} />
          
          {/* Preview Overlay */}
          <View style={styles.previewOverlay}>
            <Text style={styles.previewTitle}>Ready to identify?</Text>
            
            {/* Preview Actions */}
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
                <Text style={styles.actionText}>Retake</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[
                  styles.analyzeButton,
                  isAnalyzing && styles.disabledAnalyzeButton
                ]}
                onPress={handleAnalyze}
                disabled={isAnalyzing}
              >
                {isAnalyzing ? (
                  <>
                    <ActivityIndicator color={theme.colors.white} />
                    <Text style={styles.actionText}>Analyzing...</Text>
                  </>
                ) : (
                  <>
                    <MaterialCommunityIcons
                      name="magnify"
                      size={24}
                      color={theme.colors.white}
                    />
                    <Text style={styles.actionText}>Identify</Text>
                  </>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </Animated.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.background,
    padding: 20,
  },
  loadingText: {
    ...theme.typography.body,
    color: theme.colors.text,
    marginTop: 16,
  },
  permissionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.background,
    padding: 20,
  },
  permissionText: {
    ...theme.typography.h2,
    color: theme.colors.text,
    textAlign: 'center',
    marginTop: 16,
    marginBottom: 8,
  },
  permissionSubtext: {
    ...theme.typography.body,
    color: theme.colors.textLight,
    textAlign: 'center',
    marginBottom: 24,
  },
  permissionButton: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  permissionButtonText: {
    ...theme.typography.button,
    color: theme.colors.white,
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
    borderWidth: 2,
    borderColor: theme.colors.white,
    borderRadius: 16,
  },
  shutterEffect: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: theme.colors.white,
  },
  controls: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  topControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    paddingTop: 50, // Account for status bar
  },
  backButton: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 20,
    padding: 8,
  },
  rightControls: {
    flexDirection: 'row',
    gap: 12,
  },
  controlButton: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 20,
    padding: 8,
  },
  activeControlButton: {
    backgroundColor: theme.colors.primary,
  },
  zoomIndicator: {
    position: 'absolute',
    top: 100,
    alignSelf: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  zoomText: {
    color: theme.colors.white,
    fontWeight: 'bold',
  },
  bottomControls: {
    position: 'absolute',
    bottom: 40,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  captureButton: {
    backgroundColor: theme.colors.primary,
    width: 72,
    height: 72,
    borderRadius: 36,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: 'rgba(255,255,255,0.5)',
  },
  captureButtonInner: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: theme.colors.white,
  },
  disabledCaptureButton: {
    opacity: 0.7,
  },
  zoomButton: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  galleryButton: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  previewContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: theme.colors.background,
  },
  preview: {
    flex: 1,
  },
  previewOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.7)',
    padding: 20,
    paddingBottom: 40,
  },
  previewTitle: {
    ...theme.typography.h3,
    color: theme.colors.white,
    textAlign: 'center',
    marginBottom: 20,
  },
  previewActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  actionButton: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  analyzeButton: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  disabledAnalyzeButton: {
    opacity: 0.7,
  },
  actionText: {
    ...theme.typography.button,
    color: theme.colors.white,
  },
});

export default IdentifyScreen;