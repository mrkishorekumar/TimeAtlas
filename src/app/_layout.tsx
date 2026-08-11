import { AnimatedSplashOverlay } from '@/components/animated-icon';
import {
  FloatingDock,
  TabNavigationState,
  TabDescriptor,
  TabNavigationHelpers,
} from '@/components/FloatingDock';
import { DarkTheme, DefaultTheme, Tabs, ThemeProvider } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useColorScheme } from 'react-native';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <AnimatedSplashOverlay />
      <Tabs
        tabBar={(props) => (
          <FloatingDock
            state={props.state as unknown as TabNavigationState}
            descriptors={props.descriptors as unknown as Record<string, TabDescriptor>}
            navigation={props.navigation as unknown as TabNavigationHelpers}
          />
        )}
        screenOptions={{ headerShown: false }}>
        <Tabs.Screen name="search" options={{ title: 'Search' }} />
        <Tabs.Screen name="index" options={{ title: 'Clock' }} />
        <Tabs.Screen name="world" options={{ title: 'World' }} />
      </Tabs>
    </ThemeProvider>
  );
}
