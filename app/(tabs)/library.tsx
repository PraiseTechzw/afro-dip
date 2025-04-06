import React, { useState, useMemo, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  TextInput,
  Animated,
  ActivityIndicator,
  RefreshControl,
  Dimensions,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { theme } from '../../constants/theme';
import { flySpecies } from '../../constants/speciesData';
import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

type SortOption = 'name' | 'family' | 'region';
type ViewMode = 'grid' | 'list';

export default function LibraryScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFamily, setSelectedFamily] = useState<string | null>(null);
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<SortOption>('name');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.95)).current;
  const searchBarAnim = useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 8,
        tension: 40,
        useNativeDriver: true,
      }),
      Animated.spring(searchBarAnim, {
        toValue: 1,
        friction: 8,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

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
          s.commonName.toLowerCase().includes(query) ||
          s.family.toLowerCase().includes(query) ||
          s.distribution.toLowerCase().includes(query)
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
      switch (sortBy) {
        case 'name':
          return a.scientificName.localeCompare(b.scientificName);
        case 'family':
          return a.family.localeCompare(b.family);
        case 'region':
          return a.distribution.localeCompare(b.distribution);
        default:
          return 0;
      }
    });

    return result;
  }, [searchQuery, selectedFamily, selectedRegion, sortBy]);

  const handleRefresh = async () => {
    setRefreshing(true);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    // Simulate refresh
    await new Promise(resolve => setTimeout(resolve, 1000));
    setRefreshing(false);
  };

  const handleViewModeChange = (mode: ViewMode) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setViewMode(mode);
  };

  const handleSortChange = (option: SortOption) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setSortBy(option);
  };

  const handleFilterChange = (type: 'family' | 'region', value: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    if (type === 'family') {
      setSelectedFamily(selectedFamily === value ? null : value);
    } else {
      setSelectedRegion(selectedRegion === value ? null : value);
    }
  };

  const renderFilterChip = (
    label: string,
    isSelected: boolean,
    onPress: () => void
  ) => (
    <TouchableOpacity
      style={[styles.filterChip, isSelected && styles.filterChipSelected]}
      onPress={onPress}
      activeOpacity={0.7}
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

  const renderItem = ({ item, index }: { item: typeof flySpecies[0]; index: number }) => (
    <Animated.View
      style={[
        styles.speciesCard,
        viewMode === 'grid' ? styles.gridCard : styles.listCard,
        {
          opacity: fadeAnim,
          transform: [
            { scale: scaleAnim },
            {
              translateY: fadeAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [50, 0],
              }),
            },
          ],
        },
      ]}
    >
      <TouchableOpacity
        onPress={() => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
          router.push(`/species/${item.id}`);
        }}
        activeOpacity={0.7}
      >
        <Image
          source={{ uri: item.imageUrl }}
          style={[
            styles.speciesImage,
            viewMode === 'grid' ? styles.gridImage : styles.listImage,
          ]}
          defaultSource={require('../../assets/images/image.png')}
        />
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.7)']}
          style={styles.imageOverlay}
        />
        <View style={styles.speciesInfo}>
          <Text style={styles.scientificName}>{item.scientificName}</Text>
          <Text style={styles.commonName}>{item.commonName}</Text>
          <View style={styles.taxonomyBadge}>
            <MaterialCommunityIcons name="family-tree" size={16} color={theme.colors.primary} />
            <Text style={styles.taxonomyText}>{item.family}</Text>
          </View>
          <View style={styles.regionBadge}>
            <MaterialCommunityIcons name="map-marker" size={16} color={theme.colors.primary} />
            <Text style={styles.regionText}>{item.distribution}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
        <Text style={styles.loadingText}>Loading species library...</Text>
      </View>
    );
  }

  return (
    <Animated.View 
      style={[
        styles.container,
        { opacity: fadeAnim, transform: [{ scale: scaleAnim }] }
      ]}
    >
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Species Library</Text>
        <View style={styles.viewModeToggle}>
          <TouchableOpacity
            style={[
              styles.viewModeButton,
              viewMode === 'grid' && styles.viewModeButtonActive,
            ]}
            onPress={() => handleViewModeChange('grid')}
            activeOpacity={0.7}
          >
            <MaterialCommunityIcons
              name="grid"
              size={24}
              color={viewMode === 'grid' ? theme.colors.white : theme.colors.textLight}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.viewModeButton,
              viewMode === 'list' && styles.viewModeButtonActive,
            ]}
            onPress={() => handleViewModeChange('list')}
            activeOpacity={0.7}
          >
            <MaterialCommunityIcons
              name="format-list-bulleted"
              size={24}
              color={viewMode === 'list' ? theme.colors.white : theme.colors.textLight}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Search Bar */}
      <Animated.View 
        style={[
          styles.searchContainer,
          {
            transform: [
              { scale: searchBarAnim },
              {
                translateY: searchBarAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [-20, 0],
                }),
              },
            ],
          },
        ]}
      >
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
      </Animated.View>

      {/* Sort Options */}
      <View style={styles.sortContainer}>
        <Text style={styles.sortLabel}>Sort by:</Text>
        <TouchableOpacity
          style={[styles.sortButton, sortBy === 'name' && styles.sortButtonActive]}
          onPress={() => handleSortChange('name')}
          activeOpacity={0.7}
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
          onPress={() => handleSortChange('family')}
          activeOpacity={0.7}
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
        <TouchableOpacity
          style={[styles.sortButton, sortBy === 'region' && styles.sortButtonActive]}
          onPress={() => handleSortChange('region')}
          activeOpacity={0.7}
        >
          <Text
            style={[
              styles.sortButtonText,
              sortBy === 'region' && styles.sortButtonTextActive,
            ]}
          >
            Region
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
                () => handleFilterChange('family', family)
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
                () => handleFilterChange('region', region)
              )}
            </React.Fragment>
          ))}
        </View>
      </View>

      {/* Species List/Grid */}
      <FlatList
        key={viewMode}
        data={filteredSpecies}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={[
          styles.listContent,
          viewMode === 'grid' && styles.gridContent,
        ]}
        numColumns={viewMode === 'grid' ? 2 : 1}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={[theme.colors.primary]}
            tintColor={theme.colors.primary}
          />
        }
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.background,
  },
  loadingText: {
    ...theme.typography.body,
    color: theme.colors.textLight,
    marginTop: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    paddingTop: 8,
  },
  title: {
    ...theme.typography.h1,
    color: theme.colors.primary,
    fontSize: 28,
  },
  viewModeToggle: {
    flexDirection: 'row',
    gap: 8,
  },
  viewModeButton: {
    backgroundColor: theme.colors.white,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
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
  viewModeButtonActive: {
    backgroundColor: theme.colors.primary,
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
    backgroundColor: theme.colors.white,
    shadowColor: theme.colors.gray,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
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
    shadowColor: theme.colors.gray,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
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
  gridContent: {
    gap: 16,
  },
  speciesCard: {
    backgroundColor: theme.colors.white,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: theme.colors.gray,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 6,
  },
  gridCard: {
    flex: 1,
    marginHorizontal: 8,
  },
  listCard: {
    marginBottom: 16,
  },
  speciesImage: {
    width: '100%',
  },
  gridImage: {
    height: 150,
  },
  listImage: {
    height: 200,
  },
  imageOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 100,
  },
  speciesInfo: {
    padding: 16,
  },
  scientificName: {
    ...theme.typography.h3,
    color: theme.colors.text,
    marginBottom: 4,
    fontStyle: 'italic',
  },
  commonName: {
    ...theme.typography.body,
    color: theme.colors.textLight,
    marginBottom: 12,
  },
  taxonomyBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.primary + '10',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  taxonomyText: {
    ...theme.typography.caption,
    color: theme.colors.primary,
    marginLeft: 4,
  },
  regionBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.primary + '10',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  regionText: {
    ...theme.typography.caption,
    color: theme.colors.primary,
    marginLeft: 4,
  },
}); 