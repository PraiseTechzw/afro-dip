import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Animated,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { theme } from '../../constants/theme';

// Mock data for history
const identificationHistory = [
  {
    id: '1',
    scientificName: 'Musca domestica',
    commonName: 'House Fly',
    date: '2023-05-15',
    imageUrl: 'https://example.com/house-fly.jpg',
    confidence: 0.95,
  },
  {
    id: '2',
    scientificName: 'Glossina morsitans',
    commonName: 'Tsetse Fly',
    date: '2023-06-20',
    imageUrl: 'https://example.com/tsetse-fly.jpg',
    confidence: 0.88,
  },
];

export default function HistoryScreen() {
  const router = useRouter();
  const [fadeAnim] = useState(new Animated.Value(0));

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <View style={styles.container}>
      <Animated.ScrollView
        style={[styles.scrollView, { opacity: fadeAnim }]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Identification History</Text>
          <Text style={styles.subtitle}>Your past identifications</Text>
        </View>

        {identificationHistory.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.card}
            onPress={() => router.push(`/species/${item.id}`)}
            activeOpacity={0.7}
          >
            <Image
              source={{ uri: item.imageUrl }}
              style={styles.image}
              defaultSource={require('../../assets/images/image.png')}
            />
            <View style={styles.content}>
              <Text style={styles.scientificName}>{item.scientificName}</Text>
              <Text style={styles.commonName}>{item.commonName}</Text>
              <View style={styles.footer}>
                <Text style={styles.date}>{item.date}</Text>
                <View style={styles.confidenceContainer}>
                  <MaterialCommunityIcons
                    name="check-circle"
                    size={16}
                    color={theme.colors.primary}
                  />
                  <Text style={styles.confidence}>
                    {(item.confidence * 100).toFixed(0)}%
                  </Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </Animated.ScrollView>
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
  card: {
    backgroundColor: theme.colors.white,
    margin: 20,
    marginTop: 0,
    borderRadius: 16,
    overflow: 'hidden',
    flexDirection: 'row',
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
    width: 100,
    height: 100,
  },
  content: {
    flex: 1,
    padding: 16,
    justifyContent: 'space-between',
  },
  scientificName: {
    ...theme.typography.h3,
    color: theme.colors.text,
    fontStyle: 'italic',
  },
  commonName: {
    ...theme.typography.body,
    color: theme.colors.textLight,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  date: {
    ...theme.typography.caption,
    color: theme.colors.textLight,
  },
  confidenceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  confidence: {
    ...theme.typography.caption,
    color: theme.colors.primary,
    fontWeight: '600',
  },
}); 