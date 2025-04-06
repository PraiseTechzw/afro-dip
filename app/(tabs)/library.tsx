import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { theme } from '../../constants/theme';
import { flySpecies } from '../../constants/speciesData';

export default function LibraryScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFamily, setSelectedFamily] = useState<string | null>(null);

  const families = Array.from(new Set(flySpecies.map(species => species.family)));

  const filteredSpecies = flySpecies.filter(species => {
    const matchesSearch = species.commonName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         species.scientificName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFamily = !selectedFamily || species.family === selectedFamily;
    return matchesSearch && matchesFamily;
  });

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.speciesCard}
      onPress={() => router.push(`/species/${item.id}`)}
    >
      <View style={styles.speciesInfo}>
        <Text style={styles.scientificName}>{item.scientificName}</Text>
        <Text style={styles.commonName}>{item.commonName}</Text>
        <Text style={styles.family}>{item.family}</Text>
      </View>
      <MaterialCommunityIcons name="chevron-right" size={24} color={theme.colors.gray} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Species Library</Text>
        <Text style={styles.subtitle}>Browse our comprehensive fly database</Text>
      </View>

      <View style={styles.searchContainer}>
        <MaterialCommunityIcons name="magnify" size={24} color={theme.colors.gray} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search species..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <View style={styles.filterContainer}>
        <Text style={styles.filterTitle}>Filter by Family:</Text>
        <View style={styles.familyButtons}>
          <TouchableOpacity
            style={[styles.familyButton, !selectedFamily && styles.selectedFamilyButton]}
            onPress={() => setSelectedFamily(null)}
          >
            <Text style={[styles.familyButtonText, !selectedFamily && styles.selectedFamilyButtonText]}>
              All
            </Text>
          </TouchableOpacity>
          {families.map(family => (
            <TouchableOpacity
              key={family}
              style={[styles.familyButton, selectedFamily === family && styles.selectedFamilyButton]}
              onPress={() => setSelectedFamily(family)}
            >
              <Text style={[styles.familyButtonText, selectedFamily === family && styles.selectedFamilyButtonText]}>
                {family}
              </Text>
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.white,
    marginHorizontal: 20,
    marginBottom: 16,
    paddingHorizontal: 16,
    borderRadius: 12,
    shadowColor: theme.colors.gray,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  searchInput: {
    flex: 1,
    padding: 12,
    ...theme.typography.body,
  },
  filterContainer: {
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  filterTitle: {
    ...theme.typography.h3,
    color: theme.colors.text,
    marginBottom: 8,
  },
  familyButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  familyButton: {
    backgroundColor: theme.colors.white,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: theme.colors.gray,
  },
  selectedFamilyButton: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  familyButtonText: {
    ...theme.typography.body,
    color: theme.colors.text,
  },
  selectedFamilyButtonText: {
    color: theme.colors.white,
  },
  listContainer: {
    padding: 20,
  },
  speciesCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.white,
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: theme.colors.gray,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  speciesInfo: {
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
    marginBottom: 4,
  },
  family: {
    ...theme.typography.caption,
    color: theme.colors.primary,
  },
}); 