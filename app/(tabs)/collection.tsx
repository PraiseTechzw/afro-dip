import React, { useState, useMemo, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Animated,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { theme } from '../../constants/theme';
import * as Haptics from 'expo-haptics';

// Mock data for the collection
const mockCollection = [
  {
    id: '1',
    scientificName: 'Musca domestica',
    commonName: 'House Fly',
    date: '2023-05-15',
    location: 'Harare, Zimbabwe',
    imageUrl: 'https://example.com/house-fly.jpg',
  },
  {
    id: '2',
    scientificName: 'Glossina morsitans',
    commonName: 'Tsetse Fly',
    date: '2023-06-20',
    location: 'Victoria Falls, Zimbabwe',
    imageUrl: 'https://example.com/tsetse-fly.jpg',
  },
];

type SortOption = 'date' | 'name' | 'location';
type ViewMode = 'grid' | 'list';

export default function CollectionScreen() {
  const router = useRouter();
  const [sortBy, setSortBy] = useState<SortOption>('date');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.95)).current;

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
    ]).start();
  }, []);

  // Get unique locations for filtering
  const locations = useMemo(() => {
    return Array.from(new Set(mockCollection.map(item => item.location)));
  }, []);

  // Sort and filter collection
  const sortedCollection = useMemo(() => {
    let result = [...mockCollection];

    // Apply filter
    if (selectedFilter) {
      result = result.filter(item => item.location === selectedFilter);
    }

    // Sort results
    result.sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case 'name':
          return a.scientificName.localeCompare(b.scientificName);
        case 'location':
          return a.location.localeCompare(b.location);
        default:
          return 0;
      }
    });

    return result;
  }, [sortBy, selectedFilter]);

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

  const handleFilterChange = (location: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setSelectedFilter(selectedFilter === location ? null : location);
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

  const renderItem = ({ item, index }: { item: typeof mockCollection[0]; index: number }) => (
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
        <View style={styles.speciesInfo}>
          <Text style={styles.scientificName}>{item.scientificName}</Text>
          <Text style={styles.commonName}>{item.commonName}</Text>
          <View style={styles.detailsContainer}>
            <View style={styles.detailItem}>
              <MaterialCommunityIcons
                name="calendar"
                size={16}
                color={theme.colors.textLight}
              />
              <Text style={styles.detailText}>{item.date}</Text>
            </View>
            <View style={styles.detailItem}>
              <MaterialCommunityIcons
                name="map-marker"
                size={16}
                color={theme.colors.textLight}
              />
              <Text style={styles.detailText}>{item.location}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
        <Text style={styles.loadingText}>Loading your collection...</Text>
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
        <Text style={styles.title}>My Collection</Text>
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

      {/* Sort Options */}
      <View style={styles.sortContainer}>
        <Text style={styles.sortLabel}>Sort by:</Text>
        <TouchableOpacity
          style={[styles.sortButton, sortBy === 'date' && styles.sortButtonActive]}
          onPress={() => handleSortChange('date')}
          activeOpacity={0.7}
        >
          <Text
            style={[
              styles.sortButtonText,
              sortBy === 'date' && styles.sortButtonTextActive,
            ]}
          >
            Date
          </Text>
        </TouchableOpacity>
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
          style={[styles.sortButton, sortBy === 'location' && styles.sortButtonActive]}
          onPress={() => handleSortChange('location')}
          activeOpacity={0.7}
        >
          <Text
            style={[
              styles.sortButtonText,
              sortBy === 'location' && styles.sortButtonTextActive,
            ]}
          >
            Location
          </Text>
        </TouchableOpacity>
      </View>

      {/* Location Filters */}
      <View style={styles.filterSection}>
        <Text style={styles.filterTitle}>Locations</Text>
        <View style={styles.filterChips}>
          {locations.map(location => (
            <React.Fragment key={location}>
              {renderFilterChip(
                location,
                selectedFilter === location,
                () => handleFilterChange(location)
              )}
            </React.Fragment>
          ))}
        </View>
      </View>

      {/* Collection List/Grid */}
      <FlatList
        key={viewMode}
        data={sortedCollection}
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
  detailsContainer: {
    gap: 8,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  detailText: {
    ...theme.typography.caption,
    color: theme.colors.textLight,
  },
}); 