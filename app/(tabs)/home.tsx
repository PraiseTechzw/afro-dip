import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { theme } from '../../constants/theme';
import { flySpecies } from '../../constants/speciesData';

// Mock data for recent identifications
const recentIdentifications = [
  {
    id: '1',
    scientificName: 'Musca domestica',
    commonName: 'House Fly',
    date: '2023-05-15',
    imageUrl: 'https://example.com/house-fly.jpg',
  },
  {
    id: '2',
    scientificName: 'Glossina morsitans',
    commonName: 'Tsetse Fly',
    date: '2023-06-20',
    imageUrl: 'https://example.com/tsetse-fly.jpg',
  },
];

// Get a random featured species
const featuredSpecies = flySpecies[Math.floor(Math.random() * flySpecies.length)];

export default function HomeScreen() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Welcome to AfroDip</Text>
        <Text style={styles.subtitle}>Your African Fly Identification Guide</Text>
      </View>

      {/* Featured Species */}
      <TouchableOpacity
        style={styles.featuredCard}
        onPress={() => router.push(`/species/${featuredSpecies.id}`)}
      >
        <Image
          source={{ uri: featuredSpecies.imageUrl }}
          style={styles.featuredImage}
          defaultSource={require('../../assets/images/image.png')}
        />
        <View style={styles.featuredContent}>
          <Text style={styles.featuredTitle}>Featured Species</Text>
          <Text style={styles.featuredName}>{featuredSpecies.scientificName}</Text>
          <Text style={styles.featuredCommonName}>{featuredSpecies.commonName}</Text>
          <View style={styles.featuredStats}>
            <View style={styles.stat}>
              <MaterialCommunityIcons name="family-tree" size={20} color={theme.colors.primary} />
              <Text style={styles.statText}>{featuredSpecies.family}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>

      {/* Quick Stats */}
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <MaterialCommunityIcons name="book-open-variant" size={32} color={theme.colors.primary} />
          <Text style={styles.statNumber}>{flySpecies.length}</Text>
          <Text style={styles.statLabel}>Species</Text>
        </View>
        <View style={styles.statCard}>
          <MaterialCommunityIcons name="family-tree" size={32} color={theme.colors.primary} />
          <Text style={styles.statNumber}>
            {new Set(flySpecies.map(s => s.family)).size}
          </Text>
          <Text style={styles.statLabel}>Families</Text>
        </View>
      </View>

      {/* Main Actions */}
      <View style={styles.actionsContainer}>
        <TouchableOpacity
          style={styles.actionCard}
          onPress={() => router.push('/identify')}
        >
          <MaterialCommunityIcons name="camera" size={32} color={theme.colors.primary} />
          <Text style={styles.actionTitle}>Identify Flies</Text>
          <Text style={styles.actionDescription}>Take a photo to identify fly species</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionCard}
          onPress={() => router.push('/library')}
        >
          <MaterialCommunityIcons name="book-open-variant" size={32} color={theme.colors.primary} />
          <Text style={styles.actionTitle}>Species Library</Text>
          <Text style={styles.actionDescription}>Browse our comprehensive fly database</Text>
        </TouchableOpacity>
      </View>

      {/* Recent Identifications */}
      <View style={styles.recentContainer}>
        <Text style={styles.sectionTitle}>Recent Identifications</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {recentIdentifications.map(item => (
            <TouchableOpacity
              key={item.id}
              style={styles.recentCard}
              onPress={() => router.push(`/species/${item.id}`)}
            >
              <Image
                source={{ uri: item.imageUrl }}
                style={styles.recentImage}
                defaultSource={require('../../assets/images/image.png')}
              />
              <Text style={styles.recentName}>{item.commonName}</Text>
              <Text style={styles.recentDate}>{item.date}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Additional Actions */}
      <View style={styles.actionsContainer}>
        <TouchableOpacity
          style={styles.actionCard}
          onPress={() => router.push('/taxonomy')}
        >
          <MaterialCommunityIcons name="school" size={32} color={theme.colors.primary} />
          <Text style={styles.actionTitle}>Taxonomy Guide</Text>
          <Text style={styles.actionDescription}>Learn about fly classification</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionCard}
          onPress={() => router.push('/collection')}
        >
          <MaterialCommunityIcons name="folder-multiple" size={32} color={theme.colors.primary} />
          <Text style={styles.actionTitle}>My Collection</Text>
          <Text style={styles.actionDescription}>View your identified species</Text>
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
  featuredCard: {
    backgroundColor: theme.colors.white,
    margin: 20,
    marginTop: 0,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: theme.colors.gray,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  featuredImage: {
    width: '100%',
    height: 200,
  },
  featuredContent: {
    padding: 20,
  },
  featuredTitle: {
    ...theme.typography.caption,
    color: theme.colors.primary,
    marginBottom: 8,
  },
  featuredName: {
    ...theme.typography.h2,
    color: theme.colors.text,
    marginBottom: 4,
  },
  featuredCommonName: {
    ...theme.typography.body,
    color: theme.colors.textLight,
    marginBottom: 16,
  },
  featuredStats: {
    flexDirection: 'row',
    gap: 16,
  },
  stat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statText: {
    ...theme.typography.caption,
    color: theme.colors.text,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  statCard: {
    backgroundColor: theme.colors.white,
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 8,
    shadowColor: theme.colors.gray,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statNumber: {
    ...theme.typography.h1,
    color: theme.colors.primary,
    marginVertical: 8,
  },
  statLabel: {
    ...theme.typography.body,
    color: theme.colors.textLight,
  },
  actionsContainer: {
    padding: 20,
    gap: 16,
  },
  actionCard: {
    backgroundColor: theme.colors.white,
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
  actionTitle: {
    ...theme.typography.h3,
    color: theme.colors.text,
    marginTop: 12,
    marginBottom: 4,
  },
  actionDescription: {
    ...theme.typography.body,
    color: theme.colors.textLight,
  },
  recentContainer: {
    padding: 20,
  },
  sectionTitle: {
    ...theme.typography.h2,
    color: theme.colors.text,
    marginBottom: 16,
  },
  recentCard: {
    backgroundColor: theme.colors.white,
    borderRadius: 12,
    marginRight: 16,
    width: 160,
    shadowColor: theme.colors.gray,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  recentImage: {
    width: '100%',
    height: 120,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  recentName: {
    ...theme.typography.h3,
    color: theme.colors.text,
    margin: 12,
  },
  recentDate: {
    ...theme.typography.caption,
    color: theme.colors.textLight,
    margin: 12,
    marginTop: 0,
  },
}); 