import { AnimatedSplashOverlay } from '@/components/animated-icon';
import {
  FloatingDock,
  TabDescriptor,
  TabNavigationHelpers,
  TabNavigationState,
} from '@/components/FloatingDock';
import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold,
  useFonts,
} from '@expo-google-fonts/inter';
import { DarkTheme, DefaultTheme, Tabs, ThemeProvider } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useColorScheme } from 'react-native';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <AnimatedSplashOverlay />
      <Tabs
        initialRouteName='index'
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
