import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native';
import { theme } from '../constants/theme';
import { flySpecies, FlySpecies } from '../constants/speciesData';
import { useRouter } from 'expo-router';

export default function LibraryScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFamily, setSelectedFamily] = useState<string | null>(null);

  const families = Array.from(new Set(flySpecies.map(species => species.family)));

  const filteredSpecies = flySpecies.filter(species => {
    const matchesSearch = 
      species.scientificName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      species.commonName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFamily = !selectedFamily || species.family === selectedFamily;
    return matchesSearch && matchesFamily;
  });

  const renderItem = ({ item }: { item: FlySpecies }) => (
    <TouchableOpacity
      style={styles.speciesCard}
      onPress={() => router.push(`/species/${item.id}`)}
    >
      <Image
        source={{ uri: item.imageUrl }}
        style={styles.speciesImage}
        defaultSource={require('../assets/images/image.png')}
      />
      <View style={styles.speciesInfo}>
        <Text style={styles.scientificName}>{item.scientificName}</Text>
        <Text style={styles.commonName}>{item.commonName}</Text>
        <Text style={styles.family}>{item.family}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search species..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <View style={styles.filterContainer}>
        <Text style={styles.filterTitle}>Filter by Family:</Text>
        <View style={styles.familyFilters}>
          <TouchableOpacity
            style={[
              styles.familyFilter,
              !selectedFamily && styles.familyFilterActive,
            ]}
            onPress={() => setSelectedFamily(null)}
          >
            <Text style={styles.familyFilterText}>All</Text>
          </TouchableOpacity>
          {families.map(family => (
            <TouchableOpacity
              key={family}
              style={[
                styles.familyFilter,
                selectedFamily === family && styles.familyFilterActive,
              ]}
              onPress={() => setSelectedFamily(family)}
            >
              <Text style={styles.familyFilterText}>{family}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <FlatList
        data={filteredSpecies}
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
  searchContainer: {
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.white,
  },
  searchInput: {
    backgroundColor: theme.colors.gray,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
    ...theme.typography.body,
  },
  filterContainer: {
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.white,
  },
  filterTitle: {
    ...theme.typography.body,
    color: theme.colors.text,
    marginBottom: theme.spacing.sm,
  },
  familyFilters: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.sm,
  },
  familyFilter: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.lg,
    backgroundColor: theme.colors.gray,
  },
  familyFilterActive: {
    backgroundColor: theme.colors.primary,
  },
  familyFilterText: {
    ...theme.typography.caption,
    color: theme.colors.text,
  },
  listContainer: {
    padding: theme.spacing.lg,
  },
  speciesCard: {
    flexDirection: 'row',
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.lg,
    marginBottom: theme.spacing.lg,
    overflow: 'hidden',
    shadowColor: theme.colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  speciesImage: {
    width: 100,
    height: 100,
  },
  speciesInfo: {
    flex: 1,
    padding: theme.spacing.md,
  },
  scientificName: {
    ...theme.typography.h2,
    color: theme.colors.primary,
    marginBottom: theme.spacing.xs,
  },
  commonName: {
    ...theme.typography.body,
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  family: {
    ...theme.typography.caption,
    color: theme.colors.textLight,
  },
}); 