import { Stack } from 'expo-router';
import { theme } from '../constants/theme';

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
      <Stack.Screen
        name="home"
        options={{
          title: 'Afro-Dip',
        }}
      />
      <Stack.Screen
        name="identify"
        options={{
          title: 'Identify Fly',
        }}
      />
      <Stack.Screen
        name="library"
        options={{
          title: 'Species Library',
        }}
      />
      <Stack.Screen
        name="species/[id]"
        options={{
          title: 'Species Details',
        }}
      />
      <Stack.Screen
        name="taxonomy"
        options={{
          title: 'Taxonomy Guide',
        }}
      />
    </Stack>
  );
}
