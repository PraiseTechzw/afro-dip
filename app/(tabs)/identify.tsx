import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { theme } from '../../constants/theme';

export default function IdentifyScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Identify Flies</Text>
        <Text style={styles.subtitle}>Take a photo or upload an image to identify fly species</Text>
      </View>

      <View style={styles.optionsContainer}>
        <TouchableOpacity style={styles.option}>
          <MaterialCommunityIcons name="camera" size={48} color={theme.colors.primary} />
          <Text style={styles.optionTitle}>Take Photo</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.option}>
          <MaterialCommunityIcons name="image" size={48} color={theme.colors.primary} />
          <Text style={styles.optionTitle}>Upload Image</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.tipsContainer}>
        <Text style={styles.tipsTitle}>Tips for Better Identification</Text>
        <View style={styles.tip}>
          <MaterialCommunityIcons name="lightbulb" size={24} color={theme.colors.primary} />
          <Text style={styles.tipText}>Take photos in good lighting</Text>
        </View>
        <View style={styles.tip}>
          <MaterialCommunityIcons name="lightbulb" size={24} color={theme.colors.primary} />
          <Text style={styles.tipText}>Focus on the fly's key features</Text>
        </View>
        <View style={styles.tip}>
          <MaterialCommunityIcons name="lightbulb" size={24} color={theme.colors.primary} />
          <Text style={styles.tipText}>Include a size reference if possible</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: 20,
  },
  header: {
    marginBottom: 32,
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
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 32,
  },
  option: {
    alignItems: 'center',
    backgroundColor: theme.colors.white,
    borderRadius: 12,
    padding: 20,
    width: '45%',
    shadowColor: theme.colors.gray,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  optionTitle: {
    ...theme.typography.h3,
    color: theme.colors.text,
    marginTop: 12,
  },
  tipsContainer: {
    backgroundColor: theme.colors.white,
    borderRadius: 12,
    padding: 20,
    shadowColor: theme.colors.gray,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  tipsTitle: {
    ...theme.typography.h3,
    color: theme.colors.text,
    marginBottom: 16,
  },
  tip: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  tipText: {
    ...theme.typography.body,
    color: theme.colors.text,
    marginLeft: 12,
  },
}); 