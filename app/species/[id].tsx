import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Animated,
  Share,
  Dimensions,
  Platform,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { theme } from '../../constants/theme';
import { flySpecies } from '../../constants/speciesData';
import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

export default function SpeciesDetailsScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [isFavorite, setIsFavorite] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Animation values
  const scrollY = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.95)).current;

  const species = flySpecies.find(s => s.id === id);

  // State for image gallery
  const images = [
    species?.imageUrl,
    'https://example.com/species-detail-1.jpg',
    'https://example.com/species-detail-2.jpg',
  ].filter(Boolean);

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

  const handleShare = async () => {
    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      await Share.share({
        message: `Check out ${species?.scientificName} (${species?.commonName}) in the Afro-Dip app!`,
        url: 'https://afro-dip.app',
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const handleToggleFavorite = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setIsFavorite(!isFavorite);
  };

  const handleImagePress = (index: number) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setCurrentImageIndex(index);
  };

  if (!species) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Species not found</Text>
      </View>
    );
  }

  const headerHeight = scrollY.interpolate({
    inputRange: [0, 200],
    outputRange: [200, 100],
    extrapolate: 'clamp',
  });

  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.header,
          {
            height: headerHeight,
            opacity: headerOpacity,
          },
        ]}
      >
        <Image
          source={{ uri: images[currentImageIndex] }}
          style={styles.headerImage}
          defaultSource={require('../../assets/images/image.png')}
        />
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.7)']}
          style={styles.headerGradient}
        />
        <View style={styles.headerContent}>
          <Text style={styles.scientificName}>{species.scientificName}</Text>
          <Text style={styles.commonName}>{species.commonName}</Text>
        </View>
      </Animated.View>

      <Animated.ScrollView
        style={styles.scrollView}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
      >
        <Animated.View
          style={[
            styles.content,
            {
              opacity: fadeAnim,
              transform: [{ scale: scaleAnim }],
            },
          ]}
        >
          {/* Image Gallery */}
          <View style={styles.imageGallery}>
            {images.map((image, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.galleryThumbnail,
                  currentImageIndex === index && styles.galleryThumbnailActive,
                ]}
                onPress={() => handleImagePress(index)}
                activeOpacity={0.7}
              >
                <Image
                  source={{ uri: image }}
                  style={styles.thumbnailImage}
                  defaultSource={require('../../assets/images/image.png')}
                />
              </TouchableOpacity>
            ))}
          </View>

          {/* Taxonomy Info */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Taxonomy</Text>
            <View style={styles.taxonomyGrid}>
              <View style={styles.taxonomyItem}>
                <MaterialCommunityIcons
                  name="family-tree"
                  size={24}
                  color={theme.colors.primary}
                />
                <View>
                  <Text style={styles.taxonomyLabel}>Family</Text>
                  <Text style={styles.taxonomyValue}>{species.family}</Text>
                </View>
              </View>
              <View style={styles.taxonomyItem}>
                <MaterialCommunityIcons
                  name="map-marker"
                  size={24}
                  color={theme.colors.primary}
                />
                <View>
                  <Text style={styles.taxonomyLabel}>Distribution</Text>
                  <Text style={styles.taxonomyValue}>{species.distribution}</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Description */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.description}>
              {species.description || 'No description available.'}
            </Text>
          </View>

          {/* Similar Species */}
          {species.similarSpecies && species.similarSpecies.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Similar Species</Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.similarSpeciesContainer}
              >
                {species.similarSpecies.map((similar, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.similarSpeciesCard}
                    onPress={() => router.push(`/species/${similar.id}`)}
                    activeOpacity={0.7}
                  >
                    <Image
                      source={{ uri: similar.imageUrl }}
                      style={styles.similarSpeciesImage}
                      defaultSource={require('../../assets/images/image.png')}
                    />
                    <Text style={styles.similarSpeciesName}>
                      {similar.scientificName}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          )}

          {/* Additional Info */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Additional Information</Text>
            <View style={styles.infoGrid}>
              <View style={styles.infoItem}>
                <MaterialCommunityIcons
                  name="ruler"
                  size={24}
                  color={theme.colors.primary}
                />
                <Text style={styles.infoLabel}>Size</Text>
                <Text style={styles.infoValue}>5-8mm</Text>
              </View>
              <View style={styles.infoItem}>
                <MaterialCommunityIcons
                  name="clock-outline"
                  size={24}
                  color={theme.colors.primary}
                />
                <Text style={styles.infoLabel}>Lifespan</Text>
                <Text style={styles.infoValue}>15-30 days</Text>
              </View>
              <View style={styles.infoItem}>
                <MaterialCommunityIcons
                  name="thermometer"
                  size={24}
                  color={theme.colors.primary}
                />
                <Text style={styles.infoLabel}>Temperature</Text>
                <Text style={styles.infoValue}>20-30°C</Text>
              </View>
              <View style={styles.infoItem}>
                <MaterialCommunityIcons
                  name="water"
                  size={24}
                  color={theme.colors.primary}
                />
                <Text style={styles.infoLabel}>Humidity</Text>
                <Text style={styles.infoValue}>60-80%</Text>
              </View>
            </View>
          </View>
        </Animated.View>
      </Animated.ScrollView>

      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        <TouchableOpacity
          style={[styles.actionButton, styles.favoriteButton]}
          onPress={handleToggleFavorite}
        >
          <MaterialCommunityIcons
            name={isFavorite ? 'heart' : 'heart-outline'}
            size={24}
            color={isFavorite ? theme.colors.error : theme.colors.white}
          />
          <Text style={styles.actionButtonText}>
            {isFavorite ? 'Favorited' : 'Favorite'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionButton, styles.shareButton]}
          onPress={handleShare}
        >
          <MaterialCommunityIcons
            name="share"
            size={24}
            color={theme.colors.white}
          />
          <Text style={styles.actionButtonText}>Share</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.background,
  },
  errorText: {
    ...theme.typography.h2,
    color: theme.colors.error,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
  headerImage: {
    width: '100%',
    height: '100%',
  },
  headerGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 100,
  },
  headerContent: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
  },
  scientificName: {
    ...theme.typography.h1,
    color: theme.colors.white,
    fontSize: 24,
    fontStyle: 'italic',
  },
  commonName: {
    ...theme.typography.h3,
    color: theme.colors.white,
    opacity: 0.9,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 16,
    paddingTop: 220,
  },
  imageGallery: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 24,
  },
  galleryThumbnail: {
    width: 60,
    height: 60,
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  galleryThumbnailActive: {
    borderColor: theme.colors.primary,
  },
  thumbnailImage: {
    width: '100%',
    height: '100%',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    ...theme.typography.h2,
    color: theme.colors.text,
    marginBottom: 16,
  },
  taxonomyGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  taxonomyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: theme.colors.white,
    padding: 16,
    borderRadius: 12,
    flex: 1,
    minWidth: '45%',
    shadowColor: theme.colors.gray,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  taxonomyLabel: {
    ...theme.typography.caption,
    color: theme.colors.textLight,
  },
  taxonomyValue: {
    ...theme.typography.body,
    color: theme.colors.text,
    marginTop: 4,
  },
  description: {
    ...theme.typography.body,
    color: theme.colors.text,
    lineHeight: 24,
  },
  similarSpeciesContainer: {
    gap: 16,
    paddingRight: 16,
  },
  similarSpeciesCard: {
    width: 120,
    backgroundColor: theme.colors.white,
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
  similarSpeciesImage: {
    width: '100%',
    height: 80,
  },
  similarSpeciesName: {
    ...theme.typography.caption,
    color: theme.colors.text,
    padding: 8,
    fontStyle: 'italic',
  },
  infoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  infoItem: {
    backgroundColor: theme.colors.white,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    flex: 1,
    minWidth: '45%',
    shadowColor: theme.colors.gray,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  infoLabel: {
    ...theme.typography.caption,
    color: theme.colors.textLight,
    marginTop: 8,
  },
  infoValue: {
    ...theme.typography.body,
    color: theme.colors.text,
    marginTop: 4,
  },
  actionButtons: {
    flexDirection: 'row',
    padding: 16,
    gap: 16,
    backgroundColor: theme.colors.background,
    borderTopWidth: 1,
    borderTopColor: theme.colors.gray,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    padding: 16,
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
  favoriteButton: {
    backgroundColor: theme.colors.primary,
  },
  shareButton: {
    backgroundColor: theme.colors.secondary,
  },
  actionButtonText: {
    ...theme.typography.button,
    color: theme.colors.white,
  },
}); 