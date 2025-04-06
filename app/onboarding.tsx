import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, ViewStyle, TextStyle } from 'react-native';
import { theme } from '../constants/theme';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

type IconName = 'bug' | 'camera' | 'book-open-variant' | 'school';

interface Slide {
  id: string;
  title: string;
  description: string;
  icon: IconName;
}

const slides: Slide[] = [
  {
    id: '1',
    title: 'Welcome to Afro-Dip',
    description: 'Your comprehensive guide to identifying flies in Zimbabwe',
    icon: 'bug',
  },
  {
    id: '2',
    title: 'Identify Flies',
    description: 'Take photos or upload images to identify different fly species',
    icon: 'camera',
  },
  {
    id: '3',
    title: 'Explore Species',
    description: 'Browse through our extensive database of fly species',
    icon: 'book-open-variant',
  },
  {
    id: '4',
    title: 'Learn Taxonomy',
    description: 'Understand fly classification and characteristics',
    icon: 'school',
  },
];

interface Styles {
  container: ViewStyle;
  slideContainer: ViewStyle;
  iconContainer: ViewStyle;
  title: TextStyle;
  description: TextStyle;
  footer: ViewStyle;
  pagination: ViewStyle;
  paginationDot: ViewStyle;
  paginationDotActive: ViewStyle;
  buttonContainer: ViewStyle;
  skipButton: ViewStyle;
  skipButtonText: TextStyle;
  nextButton: ViewStyle;
  nextButtonText: TextStyle;
}

export default function OnboardingScreen() {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const router = useRouter();

  const handleNext = () => {
    if (currentSlideIndex < slides.length - 1) {
      setCurrentSlideIndex(currentSlideIndex + 1);
    } else {
      router.replace('/home');
    }
  };

  const handleSkip = () => {
    router.replace('/home');
  };

  return (
    <View style={styles.container}>
      <View style={styles.slideContainer}>
        <View style={styles.iconContainer}>
          <MaterialCommunityIcons
            name={slides[currentSlideIndex].icon}
            size={120}
            color={theme.colors.primary}
          />
        </View>
        <Text style={styles.title}>{slides[currentSlideIndex].title}</Text>
        <Text style={styles.description}>{slides[currentSlideIndex].description}</Text>
      </View>

      <View style={styles.footer}>
        <View style={styles.pagination}>
          {slides.map((_, index) => (
            <View
              key={index}
              style={[
                styles.paginationDot,
                currentSlideIndex === index && styles.paginationDotActive,
              ]}
            />
          ))}
        </View>

        <View style={styles.buttonContainer}>
          {currentSlideIndex < slides.length - 1 && (
            <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
              <Text style={styles.skipButtonText}>Skip</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
            <Text style={styles.nextButtonText}>
              {currentSlideIndex === slides.length - 1 ? 'Get Started' : 'Next'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create<Styles>({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  slideContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing.xl,
  },
  iconContainer: {
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: theme.colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing.xl,
  },
  title: {
    ...theme.typography.h1,
    color: theme.colors.primary,
    textAlign: 'center',
    marginBottom: theme.spacing.md,
  },
  description: {
    ...theme.typography.body,
    color: theme.colors.text,
    textAlign: 'center',
    paddingHorizontal: theme.spacing.xl,
  },
  footer: {
    padding: theme.spacing.xl,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: theme.spacing.xl,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: theme.colors.gray,
    marginHorizontal: 4,
  },
  paginationDotActive: {
    backgroundColor: theme.colors.primary,
    width: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  skipButton: {
    padding: theme.spacing.md,
  },
  skipButtonText: {
    ...theme.typography.body,
    color: theme.colors.textLight,
  },
  nextButton: {
    backgroundColor: theme.colors.primary,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
    minWidth: 120,
    alignItems: 'center',
  },
  nextButtonText: {
    ...theme.typography.button,
    color: theme.colors.white,
  },
}); 