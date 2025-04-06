import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, ViewStyle, TextStyle, Animated } from 'react-native';
import { theme } from '../constants/theme';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

// Using valid MaterialCommunityIcons names
type IconName = 'butterfly' | 'camera' | 'book-open-page-variant' | 'school';

interface Slide {
  id: string;
  title: string;
  description: string;
  icon: IconName;
  iconColor: string;
  backgroundColor: string;
}

const slides: Slide[] = [
  {
    id: '1',
    title: 'Welcome to Afro-Dip',
    description: 'Your comprehensive guide to identifying flies in Zimbabwe',
    icon: 'butterfly', // Using butterfly icon as it's the closest to a fly in the icon set
    iconColor: '#00BFA5',
    backgroundColor: '#E0F7FA',
  },
  {
    id: '2',
    title: 'Identify Flies',
    description: 'Take photos or upload images to identify different fly species',
    icon: 'camera',
    iconColor: '#5C6BC0',
    backgroundColor: '#E8EAF6',
  },
  {
    id: '3',
    title: 'Explore Species',
    description: 'Browse through our extensive database of fly species',
    icon: 'book-open-page-variant',
    iconColor: '#EC407A',
    backgroundColor: '#FCE4EC',
  },
  {
    id: '4',
    title: 'Learn Taxonomy',
    description: 'Understand fly classification and characteristics',
    icon: 'school',
    iconColor: '#FFA000',
    backgroundColor: '#FFF8E1',
  },
];

export default function OnboardingScreen() {
  const router = useRouter();
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const translateYAnim = useRef(new Animated.Value(0)).current;

  const handleNext = () => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 0.9,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(translateYAnim, {
        toValue: 20,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start(() => {
      if (currentSlideIndex < slides.length - 1) {
        setCurrentSlideIndex(currentSlideIndex + 1);
        fadeAnim.setValue(0);
        scaleAnim.setValue(0.9);
        translateYAnim.setValue(-20);
        Animated.parallel([
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 250,
            useNativeDriver: true,
          }),
          Animated.timing(scaleAnim, {
            toValue: 1,
            duration: 250,
            useNativeDriver: true,
          }),
          Animated.timing(translateYAnim, {
            toValue: 0,
            duration: 250,
            useNativeDriver: true,
          }),
        ]).start();
      } else {
        router.push('/home');
      }
    });
  };

  const handleSkip = () => {
    router.push('/home');
  };

  const currentSlide = slides[currentSlideIndex];
  const isLastSlide = currentSlideIndex === slides.length - 1;

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.slideContainer,
          {
            opacity: fadeAnim,
            transform: [
              { scale: scaleAnim },
              { translateY: translateYAnim }
            ],
          },
        ]}
      >
        <View style={[styles.iconContainer, { backgroundColor: currentSlide.backgroundColor }]}>
          <MaterialCommunityIcons
            name={currentSlide.icon}
            size={100}
            color={currentSlide.iconColor}
          />
        </View>
        <Text style={styles.title}>{currentSlide.title}</Text>
        <Text style={styles.description}>{currentSlide.description}</Text>
      </Animated.View>

      <View style={styles.footer}>
        <View style={styles.pagination}>
          {slides.map((_, index) => (
            <View
              key={index}
              style={[
                styles.paginationDot,
                currentSlideIndex === index && styles.paginationDotActive,
                { backgroundColor: currentSlideIndex === index ? currentSlide.iconColor : '#E0E0E0' }
              ]}
            />
          ))}
        </View>

        <View style={styles.buttonContainer}>
          {!isLastSlide && (
            <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
              <Text style={styles.skipButtonText}>Skip</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity 
            style={[styles.nextButton, { backgroundColor: currentSlide.iconColor }]} 
            onPress={handleNext}
          >
            <Text style={styles.nextButtonText}>
              {isLastSlide ? 'Get Started' : 'Next'}
            </Text>
            <MaterialCommunityIcons 
              name={isLastSlide ? 'arrow-right-circle' : 'arrow-right'} 
              size={20} 
              color="#FFFFFF" 
              style={styles.buttonIcon} 
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  slideContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  iconContainer: {
    width: 180,
    height: 180,
    borderRadius: 90,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#333333',
    textAlign: 'center',
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    paddingHorizontal: 24,
    lineHeight: 24,
  },
  footer: {
    padding: 24,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 32,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  paginationDotActive: {
    width: 24,
    borderRadius: 4,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  skipButton: {
    padding: 12,
  },
  skipButtonText: {
    fontSize: 16,
    color: '#9E9E9E',
    fontWeight: '500',
  },
  nextButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    minWidth: 140,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 6,
  },
  nextButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginRight: 8,
  },
  buttonIcon: {
    marginLeft: 4,
  }
});