import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { AppIcon } from './AppIcon';

export interface TabRoute {
  key: string;
  name: string;
  params?: object;
}

export interface TabDescriptor {
  options?: {
    tabBarAccessibilityLabel?: string;
    tabBarButtonTestID?: string;
    title?: string;
    [key: string]: unknown;
  };
}

export interface TabNavigationState {
  index: number;
  routes: TabRoute[];
}

export interface TabNavigationHelpers {
  emit: (event: { type: string; target?: string; canPreventDefault?: boolean }) => { defaultPrevented?: boolean };
  navigate: (name: string, params?: object) => void;
}

export interface FloatingDockProps {
  state: TabNavigationState;
  descriptors: Record<string, TabDescriptor>;
  navigation: TabNavigationHelpers;
}

export function FloatingDock({ state, descriptors, navigation }: FloatingDockProps) {
  return (
    <View style={styles.container}>
      <View style={styles.dockCapsule}>
        {state.routes.map((route: TabRoute, index: number) => {
          const { options } = descriptors[route.key] || {};
          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event?.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          let iconName: 'search' | 'clock' | 'globe' = 'clock';
          if (route.name === 'search') iconName = 'search';
          if (route.name === 'index') iconName = 'clock';
          if (route.name === 'world' || route.name === 'explore') iconName = 'globe';

          return (
            <TouchableOpacity
              key={route.key}
              activeOpacity={0.8}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options?.tabBarAccessibilityLabel}
              testID={options?.tabBarButtonTestID}
              onPress={onPress}
              style={[styles.iconCircle, isFocused && styles.activeCircle]}>
              <AppIcon
                name={iconName}
                size={isFocused ? 26 : 22}
                color={isFocused ? '#FFFFFF' : '#333333'}
              />
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 24,
    left: 0,
    right: 0,
    zIndex: 100,
    marginBottom: 15,
  },
  dockCapsule: {
    flexDirection: 'row',
    borderRadius: 40,
    paddingHorizontal: 8,
    paddingVertical: 6,
    gap: 12,
  },
  iconCircle: {
    width: 75,
    height: 75,
    borderRadius: 38,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeCircle: {
    backgroundColor: '#000000',
  },
});
