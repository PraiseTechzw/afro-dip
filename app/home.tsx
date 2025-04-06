import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { theme } from '../constants/theme';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Afro-Dip</Text>
        <Text style={styles.subtitle}>Fly Identification in Zimbabwe</Text>
      </View>

      <View style={styles.content}>
        <TouchableOpacity 
          style={styles.card}
          onPress={() => router.push('/identify')}
        >
          <Text style={styles.cardTitle}>Identify Fly</Text>
          <Text style={styles.cardDescription}>
            Take a photo or upload an image to identify a fly species
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card}>
          <Text style={styles.cardTitle}>Species Library</Text>
          <Text style={styles.cardDescription}>
            Browse through our comprehensive database of fly species
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card}>
          <Text style={styles.cardTitle}>Taxonomy Guide</Text>
          <Text style={styles.cardDescription}>
            Learn about fly classification and taxonomy
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card}>
          <Text style={styles.cardTitle}>My Collection</Text>
          <Text style={styles.cardDescription}>
            View your identified flies and save your discoveries
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    padding: theme.spacing.xl,
    backgroundColor: theme.colors.primary,
  },
  title: {
    ...theme.typography.h1,
    color: theme.colors.white,
    marginBottom: theme.spacing.xs,
  },
  subtitle: {
    ...theme.typography.body,
    color: theme.colors.white,
    opacity: 0.8,
  },
  content: {
    padding: theme.spacing.lg,
  },
  card: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
    shadowColor: theme.colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    ...theme.typography.h2,
    color: theme.colors.primary,
    marginBottom: theme.spacing.sm,
  },
  cardDescription: {
    ...theme.typography.body,
    color: theme.colors.textLight,
  },
}); 