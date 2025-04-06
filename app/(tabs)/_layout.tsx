import { Tabs } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { theme } from "../../constants/theme";
import { Platform, Animated, StyleSheet } from "react-native";
import { BlurView } from "expo-blur";
import * as Haptics from 'expo-haptics';

type TabIconProps = {
  color: string;
  size: number;
  focused: boolean;
};

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.textLight,
        tabBarStyle: {
          backgroundColor: Platform.select({
            ios: "transparent",
            android: theme.colors.background,
          }),
          borderTopColor: theme.colors.gray,
          borderTopWidth: 1,
          height: 65,
          paddingBottom: 8,
          paddingTop: 8,
          elevation: 0,
          shadowOpacity: 0,
        },
        headerStyle: {
          backgroundColor: theme.colors.background,
          elevation: 0,
          shadowOpacity: 0,
        },
        headerTintColor: theme.colors.primary,
        headerTitleStyle: {
          ...theme.typography.h2,
          fontWeight: '700',
        },
        tabBarBackground: () =>
          Platform.OS === "ios" ? (
            <BlurView
              tint="systemChromeMaterial"
              intensity={100}
              style={StyleSheet.absoluteFill}
            />
          ) : null,
        tabBarLabelStyle: {
          ...theme.typography.caption,
          fontSize: 12,
          fontWeight: '600',
        },
        tabBarIconStyle: {
          marginBottom: -4,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size, focused }: TabIconProps) => (
            <Animated.View style={[
              styles.iconContainer,
              focused && styles.iconContainerActive
            ]}>
              <MaterialCommunityIcons 
                name="home" 
                size={size} 
                color={color} 
              />
            </Animated.View>
          ),
        }}
        listeners={{
          tabPress: () => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          },
        }}
      />
      <Tabs.Screen
        name="identify"
        options={{
          title: "Identify",
          tabBarIcon: ({ color, size, focused }: TabIconProps) => (
            <Animated.View style={[
              styles.iconContainer,
              focused && styles.iconContainerActive
            ]}>
              <MaterialCommunityIcons 
                name="camera" 
                size={size} 
                color={color} 
              />
            </Animated.View>
          ),
        }}
        listeners={{
          tabPress: () => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          },
        }}
      />
      <Tabs.Screen
        name="library"
        options={{
          title: "Library",
          tabBarIcon: ({ color, size, focused }: TabIconProps) => (
            <Animated.View style={[
              styles.iconContainer,
              focused && styles.iconContainerActive
            ]}>
              <MaterialCommunityIcons
                name="book-open-variant"
                size={size}
                color={color}
              />
            </Animated.View>
          ),
        }}
        listeners={{
          tabPress: () => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          },
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: "History",
          tabBarIcon: ({ color, size, focused }: TabIconProps) => (
            <Animated.View style={[
              styles.iconContainer,
              focused && styles.iconContainerActive
            ]}>
              <MaterialCommunityIcons 
                name="history" 
                size={size} 
                color={color} 
              />
            </Animated.View>
          ),
        }}
        listeners={{
          tabPress: () => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          },
        }}
      />
      <Tabs.Screen
        name="collection"
        options={{
          title: "Collection",
          tabBarIcon: ({ color, size, focused }: TabIconProps) => (
            <Animated.View style={[
              styles.iconContainer,
              focused && styles.iconContainerActive
            ]}>
              <MaterialCommunityIcons
                name="folder-multiple"
                size={size}
                color={color}
              />
            </Animated.View>
          ),
        }}
        listeners={{
          tabPress: () => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          },
        }}
      />

      <Tabs.Screen
        name="taxonomy"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  iconContainerActive: {
    backgroundColor: theme.colors.primary + '20',
  },
});
