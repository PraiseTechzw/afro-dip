import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { theme } from '../../constants/theme';
import { flySpecies } from '../../constants/speciesData';
import { useLocalSearchParams } from 'expo-router';

export default function SpeciesDetailScreen() {
  const { id } = useLocalSearchParams();
  const species = flySpecies.find(s => s.id === id);

  if (!species) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Species not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Image
        source={{ uri: species.imageUrl }}
        style={styles.image}
        defaultSource={require('../../assets/placeholder.png')}
      />
      
      <View style={styles.content}>
        <Text style={styles.scientificName}>{species.scientificName}</Text>
        <Text style={styles.commonName}>{species.commonName}</Text>
        <Text style={styles.family}>{species.family}</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.sectionText}>{species.description}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Habitat</Text>
          <Text style={styles.sectionText}>{species.habitat}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Distribution</Text>
          <Text style={styles.sectionText}>{species.distribution}</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  image: {
    width: '100%',
    height: 300,
  },
  content: {
    padding: theme.spacing.lg,
  },
  scientificName: {
    ...theme.typography.h1,
    color: theme.colors.primary,
    marginBottom: theme.spacing.xs,
  },
  commonName: {
    ...theme.typography.h2,
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  family: {
    ...theme.typography.body,
    color: theme.colors.textLight,
    marginBottom: theme.spacing.lg,
  },
  section: {
    marginBottom: theme.spacing.xl,
  },
  sectionTitle: {
    ...theme.typography.h2,
    color: theme.colors.primary,
    marginBottom: theme.spacing.sm,
  },
  sectionText: {
    ...theme.typography.body,
    color: theme.colors.text,
    lineHeight: 24,
  },
  errorText: {
    ...theme.typography.h2,
    color: theme.colors.text,
    textAlign: 'center',
    marginTop: theme.spacing.xl,
  },
}); 