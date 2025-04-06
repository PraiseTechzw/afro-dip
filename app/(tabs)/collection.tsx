import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { theme } from '../../constants/theme';

// Mock data for the collection
const mockCollection = [
  {
    id: '1',
    scientificName: 'Musca domestica',
    commonName: 'House Fly',
    date: '2023-05-15',
    location: 'Nairobi, Kenya',
    imageUrl: 'https://example.com/house-fly.jpg',
  },
  {
    id: '2',
    scientificName: 'Glossina morsitans',
    commonName: 'Tsetse Fly',
    date: '2023-06-20',
    location: 'Serengeti, Tanzania',
    imageUrl: 'https://example.com/tsetse-fly.jpg',
  },
];

export default function CollectionScreen() {
  const router = useRouter();

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => router.push(`/species/${item.id}`)}
    >
      <Image
        source={{ uri: item.imageUrl }}
        style={styles.image}
        defaultSource={require('../../assets/images/image.png')}
      />
      <View style={styles.infoContainer}>
        <Text style={styles.scientificName}>{item.scientificName}</Text>
        <Text style={styles.commonName}>{item.commonName}</Text>
        <View style={styles.detailsContainer}>
          <View style={styles.detail}>
            <MaterialCommunityIcons
              name="calendar"
              size={16}
              color={theme.colors.textLight}
            />
            <Text style={styles.detailText}>{item.date}</Text>
          </View>
          <View style={styles.detail}>
            <MaterialCommunityIcons
              name="map-marker"
              size={16}
              color={theme.colors.textLight}
            />
            <Text style={styles.detailText}>{item.location}</Text>
          </View>
        </View>
      </View>
      <MaterialCommunityIcons
        name="chevron-right"
        size={24}
        color={theme.colors.gray}
      />
    </TouchableOpacity>
  );

  if (mockCollection.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <MaterialCommunityIcons
          name="folder-open"
          size={64}
          color={theme.colors.gray}
        />
        <Text style={styles.emptyTitle}>No Species in Collection</Text>
        <Text style={styles.emptyText}>
          Start identifying flies to build your collection
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Collection</Text>
        <Text style={styles.subtitle}>Your identified fly species</Text>
      </View>

      <FlatList
        data={mockCollection}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </View>
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
  listContainer: {
    padding: 20,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.white,
    borderRadius: 12,
    marginBottom: 16,
    padding: 16,
    shadowColor: theme.colors.gray,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 16,
  },
  infoContainer: {
    flex: 1,
  },
  scientificName: {
    ...theme.typography.h3,
    color: theme.colors.text,
    marginBottom: 4,
  },
  commonName: {
    ...theme.typography.body,
    color: theme.colors.textLight,
    marginBottom: 8,
  },
  detailsContainer: {
    flexDirection: 'row',
    gap: 16,
  },
  detail: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailText: {
    ...theme.typography.caption,
    color: theme.colors.textLight,
    marginLeft: 4,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyTitle: {
    ...theme.typography.h2,
    color: theme.colors.text,
    marginTop: 16,
    marginBottom: 8,
  },
  emptyText: {
    ...theme.typography.body,
    color: theme.colors.textLight,
    textAlign: 'center',
  },
}); 