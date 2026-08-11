import React from 'react';
import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { Ionicons } from '@react-native-vector-icons/ionicons';
import { Feather } from '@react-native-vector-icons/feather';

export type IconName = 'dial' | 'search' | 'clock' | 'globe' | 'sun';

interface AppIconProps {
  name: IconName;
  size?: number;
  color?: string;
  style?: StyleProp<ViewStyle>;
}

export function AppIcon({ name, size = 22, color = '#000000', style }: AppIconProps) {
  return (
    <View style={[styles.container, { width: size, height: size }, style]}>
      {name === 'dial' && <Feather name="sliders" size={size} color={color} />}
      {name === 'search' && <Ionicons name="search" size={size} color={color} />}
      {name === 'clock' && <Ionicons name="time" size={size} color={color} />}
      {name === 'globe' && <Ionicons name="globe-outline" size={size} color={color} />}
      {name === 'sun' && <Ionicons name="sunny" size={size} color="#FFB800" />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
