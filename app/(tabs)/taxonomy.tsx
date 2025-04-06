import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { theme } from '../../constants/theme';
import { taxonomyLevels } from '../../constants/taxonomyData';

export default function TaxonomyScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Fly Taxonomy Guide</Text>
        <Text style={styles.subtitle}>Understanding Fly Classification</Text>
      </View>

      {taxonomyLevels.map((level, index) => (
        <View key={level.name} style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.levelName}>{level.name}</Text>
            <MaterialCommunityIcons
              name="chevron-down"
              size={24}
              color={theme.colors.primary}
            />
          </View>

          <Text style={styles.description}>{level.description}</Text>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Key Characteristics</Text>
            {level.characteristics.map((characteristic, i) => (
              <View key={i} style={styles.bulletPoint}>
                <MaterialCommunityIcons
                  name="circle-small"
                  size={16}
                  color={theme.colors.primary}
                />
                <Text style={styles.bulletText}>{characteristic}</Text>
              </View>
            ))}
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Examples</Text>
            {level.examples.map((example, i) => (
              <View key={i} style={styles.bulletPoint}>
                <MaterialCommunityIcons
                  name="circle-small"
                  size={16}
                  color={theme.colors.primary}
                />
                <Text style={styles.bulletText}>{example}</Text>
              </View>
            ))}
          </View>
        </View>
      ))}
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
  },
  title: {
    ...theme.typography.h1,
    color: theme.colors.primary,
    marginBottom: 8,
  },
  subtitle: {
    ...theme.typography.body,
    color: theme.colors.textLight,
  },
  card: {
    backgroundColor: theme.colors.white,
    margin: 20,
    marginTop: 0,
    borderRadius: 12,
    padding: 20,
    shadowColor: theme.colors.gray,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  levelName: {
    ...theme.typography.h2,
    color: theme.colors.text,
  },
  description: {
    ...theme.typography.body,
    color: theme.colors.text,
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    ...theme.typography.h3,
    color: theme.colors.text,
    marginBottom: 12,
  },
  bulletPoint: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  bulletText: {
    ...theme.typography.body,
    color: theme.colors.text,
    marginLeft: 8,
  },
}); 