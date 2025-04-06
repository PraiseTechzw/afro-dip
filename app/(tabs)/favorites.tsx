import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Animated,
  Dimensions,
  RefreshControl,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { theme } from '../../constants/theme';
import { flySpecies } from '../../constants/speciesData';
import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

export default function FavoritesScreen() {
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);
  const [favorites, setFavorites] = useState(flySpecies.slice(0, 5)); // Mock favorites data
  
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

  const handleRefresh = async () => {
    setRefreshing(true);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    // Simulate refresh
    await new Promise(resolve => setTimeout(resolve, 1000));
    setRefreshing(false);
  };

  const handleRemoveFavorite = (id: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setFavorites(prev => prev.filter(item => item.id !== id));
  };

  const renderItem = ({ item, index }: { item: typeof flySpecies[0]; index: number }) => (
    <Animated.View
      style={[
        styles.favoriteCard,
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
        style={styles.cardContent}
        onPress={() => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          router.push(`/species/${item.id}`);
        }}
        activeOpacity={0.7}
      >
        <Image
          source={{ uri: item.imageUrl }}
          style={styles.favoriteImage}
          defaultSource={require('../../assets/images/image.png')}
        />
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.7)']}
          style={styles.imageOverlay}
        />
        <View style={styles.favoriteInfo}>
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
      <TouchableOpacity
        style={styles.removeButton}
        onPress={() => handleRemoveFavorite(item.id)}
        activeOpacity={0.7}
      >
        <MaterialCommunityIcons
          name="heart-broken"
          size={24}
          color={theme.colors.error}
        />
      </TouchableOpacity>
    </Animated.View>
  );

  if (favorites.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <MaterialCommunityIcons
          name="heart-broken"
          size={64}
          color={theme.colors.textLight}
        />
        <Text style={styles.emptyTitle}>No Favorites Yet</Text>
        <Text style={styles.emptyText}>
          Add species to your favorites to see them here
        </Text>
      </View>
    );
  }

  return (
    <Animated.View
      style={[
        styles.container,
        { opacity: fadeAnim, transform: [{ scale: scaleAnim }] },
      ]}
    >
      <View style={styles.header}>
        <Text style={styles.title}>Favorites</Text>
        <Text style={styles.subtitle}>Your favorite species</Text>
      </View>

      <FlatList
        data={favorites}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
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
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.background,
    padding: 32,
  },
  emptyTitle: {
    ...theme.typography.h2,
    color: theme.colors.text,
    marginTop: 16,
  },
  emptyText: {
    ...theme.typography.body,
    color: theme.colors.textLight,
    textAlign: 'center',
    marginTop: 8,
  },
  header: {
    padding: 16,
    paddingTop: 8,
  },
  title: {
    ...theme.typography.h1,
    color: theme.colors.primary,
    fontSize: 28,
  },
  subtitle: {
    ...theme.typography.body,
    color: theme.colors.textLight,
    marginTop: 4,
  },
  listContent: {
    padding: 16,
  },
  favoriteCard: {
    backgroundColor: theme.colors.white,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
    shadowColor: theme.colors.gray,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 6,
  },
  cardContent: {
    flexDirection: 'row',
  },
  favoriteImage: {
    width: 120,
    height: 120,
  },
  imageOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
  },
  favoriteInfo: {
    flex: 1,
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
  removeButton: {
    position: 'absolute',
    top: 16,
    right: 16,
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
}); 