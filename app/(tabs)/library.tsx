import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  TextInput,
  Animated,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { theme } from '../../constants/theme';
import { flySpecies } from '../../constants/speciesData';

export default function LibraryScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFamily, setSelectedFamily] = useState<string | null>(null);
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'name' | 'family'>('name');

  // Get unique families and regions
  const families = useMemo(() => {
    return Array.from(new Set(flySpecies.map(s => s.family)));
  }, []);

  const regions = useMemo(() => {
    return Array.from(new Set(flySpecies.map(s => s.distribution)));
  }, []);

  // Filter and sort species
  const filteredSpecies = useMemo(() => {
    let result = [...flySpecies];

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        s =>
          s.scientificName.toLowerCase().includes(query) ||
          s.commonName.toLowerCase().includes(query)
      );
    }

    // Apply family filter
    if (selectedFamily) {
      result = result.filter(s => s.family === selectedFamily);
    }

    // Apply region filter
    if (selectedRegion) {
      result = result.filter(s => s.distribution === selectedRegion);
    }

    // Sort results
    result.sort((a, b) => {
      if (sortBy === 'name') {
        return a.scientificName.localeCompare(b.scientificName);
      } else {
        return a.family.localeCompare(b.family);
      }
    });

    return result;
  }, [searchQuery, selectedFamily, selectedRegion, sortBy]);

  const renderFilterChip = (
    label: string,
    isSelected: boolean,
    onPress: () => void
  ) => (
    <TouchableOpacity
      style={[styles.filterChip, isSelected && styles.filterChipSelected]}
      onPress={onPress}
    >
      <Text
        style={[
          styles.filterChipText,
          isSelected && styles.filterChipTextSelected,
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );

  const renderItem = ({ item }: { item: typeof flySpecies[0] }) => (
    <TouchableOpacity
      style={styles.speciesCard}
      onPress={() => router.push(`/species/${item.id}`)}
    >
      <Image
        source={{ uri: item.imageUrl }}
        style={styles.speciesImage}
        defaultSource={require('../../assets/images/image.png')}
      />
      <View style={styles.speciesInfo}>
        <Text style={styles.scientificName}>{item.scientificName}</Text>
        <Text style={styles.commonName}>{item.commonName}</Text>
        <View style={styles.taxonomyBadge}>
          <MaterialCommunityIcons name="family-tree" size={16} color={theme.colors.primary} />
          <Text style={styles.taxonomyText}>{item.family}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <MaterialCommunityIcons name="magnify" size={24} color={theme.colors.textLight} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search species..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor={theme.colors.textLight}
        />
        {searchQuery ? (
          <TouchableOpacity onPress={() => setSearchQuery('')}>
            <MaterialCommunityIcons name="close" size={24} color={theme.colors.textLight} />
          </TouchableOpacity>
        ) : null}
      </View>

      {/* Sort Options */}
      <View style={styles.sortContainer}>
        <Text style={styles.sortLabel}>Sort by:</Text>
        <TouchableOpacity
          style={[styles.sortButton, sortBy === 'name' && styles.sortButtonActive]}
          onPress={() => setSortBy('name')}
        >
          <Text
            style={[
              styles.sortButtonText,
              sortBy === 'name' && styles.sortButtonTextActive,
            ]}
          >
            Name
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.sortButton, sortBy === 'family' && styles.sortButtonActive]}
          onPress={() => setSortBy('family')}
        >
          <Text
            style={[
              styles.sortButtonText,
              sortBy === 'family' && styles.sortButtonTextActive,
            ]}
          >
            Family
          </Text>
        </TouchableOpacity>
      </View>

      {/* Family Filters */}
      <View style={styles.filterSection}>
        <Text style={styles.filterTitle}>Families</Text>
        <View style={styles.filterChips}>
          {families.map(family => (
            <React.Fragment key={family}>
              {renderFilterChip(
                family,
                selectedFamily === family,
                () => setSelectedFamily(selectedFamily === family ? null : family)
              )}
            </React.Fragment>
          ))}
        </View>
      </View>

      {/* Region Filters */}
      <View style={styles.filterSection}>
        <Text style={styles.filterTitle}>Regions</Text>
        <View style={styles.filterChips}>
          {regions.map(region => (
            <React.Fragment key={region}>
              {renderFilterChip(
                region,
                selectedRegion === region,
                () => setSelectedRegion(selectedRegion === region ? null : region)
              )}
            </React.Fragment>
          ))}
        </View>
      </View>

      {/* Species List */}
      <FlatList
        data={filteredSpecies}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
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
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.white,
    margin: 16,
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
    color: theme.colors.text,
  },
  sortContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  sortLabel: {
    ...theme.typography.body,
    color: theme.colors.textLight,
    marginRight: 12,
  },
  sortButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
  },
  sortButtonActive: {
    backgroundColor: theme.colors.primary,
  },
  sortButtonText: {
    ...theme.typography.body,
    color: theme.colors.textLight,
  },
  sortButtonTextActive: {
    color: theme.colors.white,
  },
  filterSection: {
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  filterTitle: {
    ...theme.typography.h3,
    color: theme.colors.text,
    marginBottom: 8,
  },
  filterChips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  filterChip: {
    backgroundColor: theme.colors.white,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: theme.colors.gray,
  },
  filterChipSelected: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  filterChipText: {
    ...theme.typography.caption,
    color: theme.colors.text,
  },
  filterChipTextSelected: {
    color: theme.colors.white,
  },
  listContent: {
    padding: 16,
  },
  speciesCard: {
    backgroundColor: theme.colors.white,
    borderRadius: 12,
    marginBottom: 16,
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
  speciesImage: {
    width: '100%',
    height: 200,
  },
  speciesInfo: {
    padding: 16,
  },
  scientificName: {
    ...theme.typography.h2,
    color: theme.colors.text,
    marginBottom: 4,
  },
  commonName: {
    ...theme.typography.body,
    color: theme.colors.textLight,
    marginBottom: 8,
  },
  taxonomyBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.primaryLight,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  taxonomyText: {
    ...theme.typography.caption,
    color: theme.colors.primary,
    marginLeft: 4,
  },
}); 