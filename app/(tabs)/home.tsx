import React, { useState, useEffect, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Image, 
  Animated, 
  Dimensions,
  StatusBar,
  RefreshControl
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { theme } from '../../constants/theme';
import { flySpecies } from '../../constants/speciesData';
import { LinearGradient } from 'expo-linear-gradient';

// Get screen dimensions for responsive design
const { width } = Dimensions.get('window');

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
  const [refreshing, setRefreshing] = useState(false);
  const scrollY = useRef(new Animated.Value(0)).current;
  const [fadeAnim] = useState(new Animated.Value(0));
  const actionButtonAnim = useRef(new Animated.Value(0)).current;

  // Animation sequence for staggered elements
  useEffect(() => {
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(actionButtonAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      })
    ]).start();
  }, []);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    // Simulate a refresh
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  }, []);

  // Header animation based on scroll
  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [1, 0.9],
    extrapolate: 'clamp',
  });

  const headerTranslate = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [0, -20],
    extrapolate: 'clamp',
  });

  // Staggered animations for action cards
  const actionCardsAnimation = {
    opacity: actionButtonAnim,
    transform: [
      {
        translateY: actionButtonAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [20, 0],
        }),
      },
    ],
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={theme.colors.background} />
      
      {/* Animated Header */}
      <Animated.View 
        style={[
          styles.headerContainer, 
          { 
            opacity: headerOpacity,
            transform: [{ translateY: headerTranslate }] 
          }
        ]}
      >
        <LinearGradient
          colors={[theme.colors.primaryLight, theme.colors.background]}
          style={styles.headerGradient}
        >
          <View style={styles.header}>
            <Text style={styles.title}>Welcome to AfroDip</Text>
            <Text style={styles.subtitle}>Your African Fly Identification Guide</Text>
          </View>
        </LinearGradient>
      </Animated.View>

      <Animated.ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[theme.colors.primary]}
            tintColor={theme.colors.primary}
          />
        }
      >
        <View style={styles.contentContainer}>
          {/* Fly of the Day */}
          <Animated.View style={[styles.flyOfTheDayCard, { opacity: fadeAnim }]}>
            <LinearGradient
              colors={[theme.colors.primaryLight, theme.colors.white]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.flyOfTheDayHeader}
            >
              <MaterialCommunityIcons name="star" size={24} color={theme.colors.primary} />
              <Text style={styles.flyOfTheDayTitle}>Fly of the Day</Text>
            </LinearGradient>
            <TouchableOpacity
              onPress={() => router.push(`/species/${flyOfTheDay.id}`)}
              style={styles.flyOfTheDayContent}
              activeOpacity={0.7}
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
                <View style={styles.learnMoreButton}>
                  <Text style={styles.learnMoreText}>Learn more</Text>
                  <MaterialCommunityIcons name="arrow-right" size={16} color={theme.colors.primary} />
                </View>
              </View>
            </TouchableOpacity>
          </Animated.View>

          {/* Quick Stats */}
          <Animated.View 
            style={[
              styles.statsContainer, 
              { opacity: fadeAnim, transform: [{ translateY: fadeAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [10, 0]
              })}] }
            ]}
          >
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
            <View style={styles.statCard}>
              <MaterialCommunityIcons name="map-marker" size={32} color={theme.colors.primary} />
              <Text style={styles.statNumber}>
                {new Set(flySpecies.map(s => s.region || 'Unknown')).size}
              </Text>
              <Text style={styles.statLabel}>Regions</Text>
            </View>
          </Animated.View>

          {/* Main Actions */}
          <View style={styles.actionsSection}>
            <Text style={styles.sectionTitle}>Quick Actions</Text>
            <Animated.View style={[styles.actionsContainer, actionCardsAnimation]}>
              <TouchableOpacity
                style={styles.actionCard}
                onPress={() => router.push('/identify')}
                activeOpacity={0.7}
              >
                <View style={[styles.actionIconContainer, { backgroundColor: theme.colors.primaryLight }]}>
                  <MaterialCommunityIcons name="camera" size={32} color={theme.colors.primary} />
                </View>
                <Text style={styles.actionTitle}>Identify Flies</Text>
                <Text style={styles.actionDescription}>Take a photo to identify fly species</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.actionCard}
                onPress={() => router.push('/library')}
                activeOpacity={0.7}
              >
                <View style={[styles.actionIconContainer, { backgroundColor: theme.colors.primaryLight }]}>
                  <MaterialCommunityIcons name="book-open-variant" size={32} color={theme.colors.primary} />
                </View>
                <Text style={styles.actionTitle}>Species Library</Text>
                <Text style={styles.actionDescription}>Browse our comprehensive fly database</Text>
              </TouchableOpacity>
            </Animated.View>
          </View>

          {/* Recent Identifications */}
          <View style={styles.recentSection}>
            <View style={styles.sectionTitleContainer}>
              <Text style={styles.sectionTitle}>Recent Identifications</Text>
              <TouchableOpacity onPress={() => router.push('/history')}>
                <Text style={styles.viewAllText}>View all</Text>
              </TouchableOpacity>
            </View>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.recentScrollContent}
            >
              {recentIdentifications.map(item => (
                <TouchableOpacity
                  key={item.id}
                  style={styles.recentCard}
                  onPress={() => router.push(`/species/${item.id}`)}
                  activeOpacity={0.7}
                >
                  <Image
                    source={{ uri: item.imageUrl }}
                    style={styles.recentImage}
                    defaultSource={require('../../assets/images/image.png')}
                  />
                  <View style={styles.recentCardContent}>
                    <Text style={styles.recentName}>{item.commonName}</Text>
                    <Text style={styles.recentScientificName}>{item.scientificName}</Text>
                    <Text style={styles.recentDate}>{item.date}</Text>
                  </View>
                </TouchableOpacity>
              ))}
              <TouchableOpacity
                style={styles.addIdentificationCard}
                onPress={() => router.push('/identify')}
                activeOpacity={0.7}
              >
                <View style={styles.addIdentificationContent}>
                  <MaterialCommunityIcons name="plus-circle" size={40} color={theme.colors.primary} />
                  <Text style={styles.addIdentificationText}>Add New</Text>
                </View>
              </TouchableOpacity>
            </ScrollView>
          </View>

          {/* Additional Actions */}
          <View style={styles.actionsSection}>
            <Text style={styles.sectionTitle}>Explore More</Text>
            <Animated.View style={[styles.actionsContainer, actionCardsAnimation]}>
              <TouchableOpacity
                style={styles.actionCard}
                onPress={() => router.push('/taxonomy')}
                activeOpacity={0.7}
              >
                <View style={[styles.actionIconContainer, { backgroundColor: theme.colors.primaryLight }]}>
                  <MaterialCommunityIcons name="school" size={32} color={theme.colors.primary} />
                </View>
                <Text style={styles.actionTitle}>Taxonomy Guide</Text>
                <Text style={styles.actionDescription}>Learn about fly classification</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.actionCard}
                onPress={() => router.push('/collection')}
                activeOpacity={0.7}
              >
                <View style={[styles.actionIconContainer, { backgroundColor: theme.colors.primaryLight }]}>
                  <MaterialCommunityIcons name="folder-multiple" size={32} color={theme.colors.primary} />
                </View>
                <Text style={styles.actionTitle}>My Collection</Text>
                <Text style={styles.actionDescription}>View your identified species</Text>
              </TouchableOpacity>
            </Animated.View>
          </View>
          
          {/* Bottom padding for scrolling */}
          <View style={styles.bottomPadding} />
        </View>
      </Animated.ScrollView>
      
      {/* Floating Action Button */}
      <TouchableOpacity 
        style={styles.fab}
        onPress={() => router.push('/identify')}
        activeOpacity={0.8}
      >
        <MaterialCommunityIcons name="camera-plus" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    paddingTop: 120, // Space for the fixed header
  },
  headerContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  headerGradient: {
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  header: {
    padding: 20,
    paddingTop: StatusBar.currentHeight + 10,
    paddingBottom: 30,
  },
  title: {
    ...theme.typography.h1,
    color: theme.colors.primary,
    marginBottom: 8,
    fontSize: 28,
  },
  subtitle: {
    ...theme.typography.body,
    color: theme.colors.textLight,
    fontSize: 16,
  },
  flyOfTheDayCard: {
    backgroundColor: theme.colors.white,
    margin: 20,
    marginTop: 0,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: theme.colors.gray,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  flyOfTheDayHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  flyOfTheDayTitle: {
    ...theme.typography.h3,
    color: theme.colors.primary,
    marginLeft: 8,
    fontWeight: '700',
  },
  flyOfTheDayContent: {
    flexDirection: 'row',
    padding: 16,
  },
  flyOfTheDayImage: {
    width: 110,
    height: 110,
    borderRadius: 12,
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
    fontSize: 18,
    fontWeight: '700',
  },
  flyOfTheDayCommonName: {
    ...theme.typography.body,
    color: theme.colors.textLight,
    marginBottom: 8,
    fontSize: 16,
  },
  flyOfTheDayStats: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 12,
  },
  learnMoreButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  learnMoreText: {
    ...theme.typography.body,
    color: theme.colors.primary,
    fontWeight: '600',
    marginRight: 4,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  statCard: {
    backgroundColor: theme.colors.white,
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    width: (width - 60) / 3,
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
    fontSize: 24,
    fontWeight: 'bold',
  },
  statLabel: {
    ...theme.typography.body,
    color: theme.colors.textLight,
    fontSize: 12,
  },
  actionsSection: {
    padding: 20,
    paddingBottom: 10,
  },
  sectionTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  sectionTitle: {
    ...theme.typography.h2,
    color: theme.colors.text,
    marginBottom: 16,
    fontSize: 20,
    fontWeight: '700',
  },
  viewAllText: {
    ...theme.typography.body,
    color: theme.colors.primary,
    fontWeight: '600',
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
  },
  actionCard: {
    backgroundColor: theme.colors.white,
    borderRadius: 16,
    padding: 20,
    flex: 1,
    shadowColor: theme.colors.gray,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  actionIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  actionTitle: {
    ...theme.typography.h3,
    color: theme.colors.text,
    marginBottom: 6,
    fontWeight: '700',
    fontSize: 16,
  },
  actionDescription: {
    ...theme.typography.body,
    color: theme.colors.textLight,
    fontSize: 13,
    lineHeight: 18,
  },
  recentSection: {
    marginVertical: 20,
  },
  recentScrollContent: {
    paddingHorizontal: 20,
  },
  recentCard: {
    backgroundColor: theme.colors.white,
    borderRadius: 16,
    marginRight: 16,
    width: 180,
    shadowColor: theme.colors.gray,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
    overflow: 'hidden',
  },
  recentImage: {
    width: '100%',
    height: 130,
  },
  recentCardContent: {
    padding: 12,
  },
  recentName: {
    ...theme.typography.h3,
    color: theme.colors.text,
    marginBottom: 4,
    fontWeight: '700',
    fontSize: 16,
  },
  recentScientificName: {
    ...theme.typography.body,
    color: theme.colors.textLight,
    fontStyle: 'italic',
    marginBottom: 6,
    fontSize: 13,
  },
  recentDate: {
    ...theme.typography.caption,
    color: theme.colors.textLight,
    fontSize: 12,
  },
  addIdentificationCard: {
    backgroundColor: theme.colors.primaryLight,
    borderRadius: 16,
    marginRight: 16,
    width: 180,
    height: 180,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: theme.colors.gray,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  addIdentificationContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  addIdentificationText: {
    ...theme.typography.body,
    color: theme.colors.primary,
    marginTop: 8,
    fontWeight: '600',
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
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: theme.colors.primary,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  bottomPadding: {
    height: 80,
  }
});