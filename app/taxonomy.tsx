import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { theme } from '../constants/theme';
import { taxonomyLevels } from '../constants/taxonomyData';

export default function TaxonomyScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Fly Taxonomy Guide</Text>
        <Text style={styles.subtitle}>Understanding Fly Classification</Text>
      </View>

      <View style={styles.content}>
        {taxonomyLevels.map((level) => (
          <View key={level.id} style={styles.levelCard}>
            <Text style={styles.levelName}>{level.name}</Text>
            <Text style={styles.description}>{level.description}</Text>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Key Characteristics</Text>
              {level.characteristics.map((characteristic, index) => (
                <View key={index} style={styles.bulletPoint}>
                  <Text style={styles.bullet}>•</Text>
                  <Text style={styles.bulletText}>{characteristic}</Text>
                </View>
              ))}
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Examples</Text>
              {level.examples.map((example, index) => (
                <View key={index} style={styles.bulletPoint}>
                  <Text style={styles.bullet}>•</Text>
                  <Text style={styles.bulletText}>{example}</Text>
                </View>
              ))}
            </View>
          </View>
        ))}
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
  levelCard: {
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
  levelName: {
    ...theme.typography.h2,
    color: theme.colors.primary,
    marginBottom: theme.spacing.md,
  },
  description: {
    ...theme.typography.body,
    color: theme.colors.text,
    marginBottom: theme.spacing.lg,
    lineHeight: 24,
  },
  section: {
    marginBottom: theme.spacing.lg,
  },
  sectionTitle: {
    ...theme.typography.h2,
    color: theme.colors.primary,
    marginBottom: theme.spacing.sm,
    fontSize: 18,
  },
  bulletPoint: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: theme.spacing.xs,
  },
  bullet: {
    ...theme.typography.body,
    color: theme.colors.primary,
    marginRight: theme.spacing.sm,
  },
  bulletText: {
    ...theme.typography.body,
    color: theme.colors.text,
    flex: 1,
  },
}); 