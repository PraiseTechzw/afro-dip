import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity } from 'react-native';
import { theme } from '../constants/theme';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

const slides = [
  {
    id: 1,
    title: 'Welcome to Afro-Dip',
    description: 'Your comprehensive guide to identifying flies in Zimbabwe',
    image: require('../assets/onboarding1.png'),
  },
  {
    id: 2,
    title: 'Easy Identification',
    description: 'Use our advanced AI to identify different fly species with just a photo',
    image: require('../assets/onboarding2.png'),
  },
  {
    id: 3,
    title: 'Learn & Discover',
    description: 'Access detailed information about each fly species and their taxonomy',
    image: require('../assets/onboarding3.png'),
  },
];

export default function OnboardingScreen() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const router = useRouter();

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      router.replace('/home');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.slide}>
        <Image
          source={slides[currentSlide].image}
          style={styles.image}
          resizeMode="contain"
        />
        <Text style={styles.title}>{slides[currentSlide].title}</Text>
        <Text style={styles.description}>{slides[currentSlide].description}</Text>
      </View>

      <View style={styles.footer}>
        <View style={styles.pagination}>
          {slides.map((_, index) => (
            <View
              key={index}
              style={[
                styles.paginationDot,
                currentSlide === index && styles.paginationDotActive,
              ]}
            />
          ))}
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={handleNext}
        >
          <Text style={styles.buttonText}>
            {currentSlide === slides.length - 1 ? 'Get Started' : 'Next'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  slide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing.xl,
  },
  image: {
    width: width * 0.8,
    height: width * 0.8,
    marginBottom: theme.spacing.xl,
  },
  title: {
    ...theme.typography.h2,
    color: theme.colors.primary,
    textAlign: 'center',
    marginBottom: theme.spacing.md,
  },
  description: {
    ...theme.typography.body,
    color: theme.colors.textLight,
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
  },
  button: {
    backgroundColor: theme.colors.primary,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
    alignItems: 'center',
  },
  buttonText: {
    ...theme.typography.body,
    color: theme.colors.white,
    fontWeight: 'bold',
  },
}); 