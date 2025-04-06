import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Animated } from 'react-native';
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
    imageUrl: 'https://robinneweiss.com/wp-content/uploads/2016/03/tachinid2.png',
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

// Get fly of the day based on the current date
const getFlyOfTheDay = () => {
  const today = new Date().getDate();
  return flySpecies[today % flySpecies.length];
};

export default function HomeScreen() {
  const router = useRouter();
  const [flyOfTheDay] = useState(getFlyOfTheDay());
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Welcome to AfroDip</Text>
        <Text style={styles.subtitle}>Your African Fly Identification Guide</Text>
      </View>

      {/* Fly of the Day */}
      <Animated.View style={[styles.flyOfTheDayCard, { opacity: fadeAnim }]}>
        <View style={styles.flyOfTheDayHeader}>
          <MaterialCommunityIcons name="star" size={24} color={theme.colors.primary} />
          <Text style={styles.flyOfTheDayTitle}>Fly of the Day</Text>
        </View>
        <TouchableOpacity
          onPress={() => router.push(`/species/${flyOfTheDay.id}`)}
          style={styles.flyOfTheDayContent}
        >
          <Image
            source={{ uri: flyOfTheDay.imageUrl }}
            style={styles.flyOfTheDayImage}
            defaultSource={require('../../assets/images/image.png')}
          />
          <View style={styles.flyOfTheDayInfo}>
            <Text style={styles.flyOfTheDayName}>{flyOfTheDay.scientificName}</Text>
            <Text style={styles.flyOfTheDayCommonName}>{flyOfTheDay.commonName}</Text>
            <View style={styles.flyOfTheDayStats}>
              <View style={styles.stat}>
                <MaterialCommunityIcons name="family-tree" size={16} color={theme.colors.primary} />
                <Text style={styles.statText}>{flyOfTheDay.family}</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </Animated.View>

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
  flyOfTheDayCard: {
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
  flyOfTheDayHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: theme.colors.primaryLight,
  },
  flyOfTheDayTitle: {
    ...theme.typography.h3,
    color: theme.colors.primary,
    marginLeft: 8,
  },
  flyOfTheDayContent: {
    flexDirection: 'row',
    padding: 16,
  },
  flyOfTheDayImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 16,
  },
  flyOfTheDayInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  flyOfTheDayName: {
    ...theme.typography.h2,
    color: theme.colors.text,
    marginBottom: 4,
  },
  flyOfTheDayCommonName: {
    ...theme.typography.body,
    color: theme.colors.textLight,
    marginBottom: 8,
  },
  flyOfTheDayStats: {
    flexDirection: 'row',
    gap: 16,
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
  stat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statText: {
    ...theme.typography.caption,
    color: theme.colors.text,
  },
}); 