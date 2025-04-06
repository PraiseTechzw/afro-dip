import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Share,
  Animated,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { theme } from '../../constants/theme';
import { flySpecies } from '../../constants/speciesData';

export default function SpeciesDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const species = flySpecies.find(s => s.id === id);
  const [isFavorite, setIsFavorite] = useState(false);
  const [scaleAnim] = useState(new Animated.Value(1));

  if (!species) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Species not found</Text>
      </View>
    );
  }

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Check out this amazing fly species: ${species.scientificName} (${species.commonName})`,
        url: species.imageUrl,
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const handleFavorite = () => {
    setIsFavorite(!isFavorite);
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.2,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header Image */}
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: species.imageUrl }}
          style={styles.image}
          defaultSource={require('../../assets/images/image.png')}
        />
        <View style={styles.imageOverlay}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <MaterialCommunityIcons name="arrow-left" size={24} color={theme.colors.white} />
          </TouchableOpacity>
          <View style={styles.actionButtons}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={handleShare}
            >
              <MaterialCommunityIcons name="share-variant" size={24} color={theme.colors.white} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={handleFavorite}
            >
              <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
                <MaterialCommunityIcons
                  name={isFavorite ? 'heart' : 'heart-outline'}
                  size={24}
                  color={isFavorite ? theme.colors.primary : theme.colors.white}
                />
              </Animated.View>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Main Content */}
      <View style={styles.content}>
        {/* Title Section */}
        <View style={styles.titleSection}>
          <Text style={styles.scientificName}>{species.scientificName}</Text>
          <Text style={styles.commonName}>{species.commonName}</Text>
          <View style={styles.taxonomyBadge}>
            <MaterialCommunityIcons name="family-tree" size={16} color={theme.colors.primary} />
            <Text style={styles.taxonomyText}>{species.family}</Text>
          </View>
        </View>

        {/* Description */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.description}>{species.description}</Text>
        </View>

        {/* Characteristics */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Key Characteristics</Text>
          <View style={styles.characteristicsList}>
            {species.characteristics.map((char, index) => (
              <View key={index} style={styles.characteristicItem}>
                <MaterialCommunityIcons
                  name="check-circle"
                  size={16}
                  color={theme.colors.primary}
                  style={styles.bulletIcon}
                />
                <Text style={styles.characteristicText}>{char}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Distribution */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Distribution</Text>
          <View style={styles.distributionContainer}>
            <MaterialCommunityIcons name="map-marker" size={24} color={theme.colors.primary} />
            <Text style={styles.distributionText}>{species.distribution}</Text>
          </View>
        </View>

        {/* Habitat */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Habitat</Text>
          <View style={styles.habitatContainer}>
            <MaterialCommunityIcons name="home" size={24} color={theme.colors.primary} />
            <Text style={styles.habitatText}>{species.habitat}</Text>
          </View>
        </View>

        {/* Behavior */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Behavior</Text>
          <Text style={styles.behaviorText}>{species.behavior}</Text>
        </View>

        {/* Similar Species */}
        {species.similarSpecies && species.similarSpecies.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Similar Species</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {species.similarSpecies.map((similar, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.similarSpeciesCard}
                  onPress={() => router.push(`/species/${similar.id}`)}
                >
                  <Image
                    source={{ uri: similar.imageUrl }}
                    style={styles.similarSpeciesImage}
                    defaultSource={require('../../assets/images/image.png')}
                  />
                  <Text style={styles.similarSpeciesName}>{similar.scientificName}</Text>
                  <Text style={styles.similarSpeciesCommonName}>{similar.commonName}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  errorText: {
    ...theme.typography.h2,
    color: theme.colors.error,
    textAlign: 'center',
    marginTop: 20,
  },
  imageContainer: {
    height: 300,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imageOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: 20,
  },
  backButton: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 20,
    padding: 8,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 20,
    padding: 8,
  },
  content: {
    padding: 20,
  },
  titleSection: {
    marginBottom: 24,
  },
  scientificName: {
    ...theme.typography.h1,
    color: theme.colors.text,
    marginBottom: 4,
  },
  commonName: {
    ...theme.typography.h2,
    color: theme.colors.textLight,
    marginBottom: 12,
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
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    ...theme.typography.h3,
    color: theme.colors.text,
    marginBottom: 12,
  },
  description: {
    ...theme.typography.body,
    color: theme.colors.text,
    lineHeight: 24,
  },
  characteristicsList: {
    gap: 12,
  },
  characteristicItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bulletIcon: {
    marginRight: 8,
  },
  characteristicText: {
    ...theme.typography.body,
    color: theme.colors.text,
    flex: 1,
  },
  distributionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.primaryLight,
    padding: 16,
    borderRadius: 12,
  },
  distributionText: {
    ...theme.typography.body,
    color: theme.colors.text,
    marginLeft: 12,
    flex: 1,
  },
  habitatContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.primaryLight,
    padding: 16,
    borderRadius: 12,
  },
  habitatText: {
    ...theme.typography.body,
    color: theme.colors.text,
    marginLeft: 12,
    flex: 1,
  },
  behaviorText: {
    ...theme.typography.body,
    color: theme.colors.text,
    lineHeight: 24,
  },
  similarSpeciesCard: {
    backgroundColor: theme.colors.white,
    borderRadius: 12,
    marginRight: 16,
    width: 160,
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
    height: 120,
  },
  similarSpeciesName: {
    ...theme.typography.h3,
    color: theme.colors.text,
    margin: 12,
    marginBottom: 4,
  },
  similarSpeciesCommonName: {
    ...theme.typography.caption,
    color: theme.colors.textLight,
    margin: 12,
    marginTop: 0,
  },
}); 