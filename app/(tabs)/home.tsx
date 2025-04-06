import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { theme } from '../../constants/theme';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Welcome to AfroDip</Text>
        <Text style={styles.subtitle}>Your African Fly Identification Guide</Text>
      </View>

      <View style={styles.optionsContainer}>
        <TouchableOpacity
          style={styles.option}
          onPress={() => router.push('/identify')}
        >
          <MaterialCommunityIcons name="camera" size={32} color={theme.colors.primary} />
          <Text style={styles.optionTitle}>Identify Flies</Text>
          <Text style={styles.optionDescription}>Take a photo to identify fly species</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.option}
          onPress={() => router.push('/library')}
        >
          <MaterialCommunityIcons name="book-open-variant" size={32} color={theme.colors.primary} />
          <Text style={styles.optionTitle}>Species Library</Text>
          <Text style={styles.optionDescription}>Browse our comprehensive fly database</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.option}
          onPress={() => router.push('/taxonomy')}
        >
          <MaterialCommunityIcons name="school" size={32} color={theme.colors.primary} />
          <Text style={styles.optionTitle}>Taxonomy Guide</Text>
          <Text style={styles.optionDescription}>Learn about fly classification</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.option}
          onPress={() => router.push('/collection')}
        >
          <MaterialCommunityIcons name="folder-multiple" size={32} color={theme.colors.primary} />
          <Text style={styles.optionTitle}>My Collection</Text>
          <Text style={styles.optionDescription}>View your identified species</Text>
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
    padding: 20,
    alignItems: 'center',
  },
  title: {
    ...theme.typography.h1,
    color: theme.colors.primary,
    marginBottom: 8,
  },
  subtitle: {
    ...theme.typography.body,
    color: theme.colors.textLight,
    textAlign: 'center',
  },
  optionsContainer: {
    padding: 20,
  },
  option: {
    backgroundColor: theme.colors.white,
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    alignItems: 'center',
    shadowColor: theme.colors.gray,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  optionTitle: {
    ...theme.typography.h3,
    color: theme.colors.text,
    marginTop: 12,
    marginBottom: 4,
  },
  optionDescription: {
    ...theme.typography.body,
    color: theme.colors.textLight,
    textAlign: 'center',
  },
}); 