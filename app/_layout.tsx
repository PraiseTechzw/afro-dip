import { Stack } from 'expo-router';
import { Tabs } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { theme } from '../constants/theme';

type TabIconProps = {
  color: string;
  size: number;
};

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.primary,
        },
        headerTintColor: theme.colors.white,
        headerTitleStyle: {
          ...theme.typography.h2,
        },
        headerBackTitleVisible: false,
      }}
    >
      <Stack.Screen
        name="splash"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="onboarding"
        options={{
          headerShown: false,
        }}
      />
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: theme.colors.primary,
          tabBarInactiveTintColor: theme.colors.textLight,
          tabBarStyle: {
            backgroundColor: theme.colors.background,
            borderTopColor: theme.colors.gray,
          },
          headerStyle: {
            backgroundColor: theme.colors.background,
          },
          headerTintColor: theme.colors.primary,
          headerTitleStyle: {
            ...theme.typography.h2,
          },
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: 'Home',
            tabBarIcon: ({ color, size }: TabIconProps) => (
              <MaterialCommunityIcons name="home" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="identify"
          options={{
            title: 'Identify',
            tabBarIcon: ({ color, size }: TabIconProps) => (
              <MaterialCommunityIcons name="camera" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="library"
          options={{
            title: 'Library',
            tabBarIcon: ({ color, size }: TabIconProps) => (
              <MaterialCommunityIcons name="book-open-variant" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="taxonomy"
          options={{
            title: 'Taxonomy',
            tabBarIcon: ({ color, size }: TabIconProps) => (
              <MaterialCommunityIcons name="school" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="collection"
          options={{
            title: 'Collection',
            tabBarIcon: ({ color, size }: TabIconProps) => (
              <MaterialCommunityIcons name="collection" size={size} color={color} />
            ),
          }}
        />
      </Tabs>
    </Stack>
  );
}
