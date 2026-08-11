import { useEffect } from 'react';
import {
  LayoutChangeEvent,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

export type TimeFormat = '12h' | '24h';

interface FormatToggleProps {
  format: TimeFormat;
  onChange: (format: TimeFormat) => void;
}

const SPRING_CONFIG = {
  damping: 18,
  stiffness: 200,
  mass: 0.8,
};

export function FormatToggle({ format, onChange }: FormatToggleProps) {
  // Store button width separately — never read during render via .value
  const buttonWidth = useSharedValue(0);

  // Single progress value: 0 = 12h active, 1 = 24h active
  const progress = useSharedValue(format === '24h' ? 1 : 0);

  // Sync progress when format prop changes (no .value read here)
  useEffect(() => {
    progress.value = withSpring(format === '24h' ? 1 : 0, SPRING_CONFIG);
  }, [format]);

  // Capture button width on first layout — stored as shared value, never read in render
  const onButtonLayout = (e: LayoutChangeEvent) => {
    const w = e.nativeEvent.layout.width;
    // Only update if it's actually changed (avoid re-triggering)
    if (buttonWidth.value !== w) {
      buttonWidth.value = w;
    }
  };

  // Pill: translate from left (12h) to right (24h) based on progress
  const pillStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: progress.value * buttonWidth.value,
      },
    ],
    width: buttonWidth.value,
  }));

  // 12h label: white when active (progress=0), black when inactive (progress=1)
  const text12Style = useAnimatedStyle(() => ({
    color: interpolateColor(
      progress.value,
      [0, 1],
      ['#FFFFFF', '#000000']
    ),
  }));

  // 24h label: black when inactive (progress=0), white when active (progress=1)
  const text24Style = useAnimatedStyle(() => ({
    color: interpolateColor(
      progress.value,
      [0, 1],
      ['#000000', '#FFFFFF']
    ),
  }));

  return (
    <View style={styles.container}>
      {/* Sliding pill — behind both buttons via zIndex */}
      <Animated.View style={[styles.pill, pillStyle]} />

      {/* 12h */}
      <TouchableOpacity
        activeOpacity={0.85}
        onPress={() => onChange('12h')}
        onLayout={onButtonLayout}
        style={styles.button}>
        <Animated.Text style={[styles.text, text12Style]}>12h</Animated.Text>
      </TouchableOpacity>

      {/* 24h */}
      <TouchableOpacity
        activeOpacity={0.85}
        onPress={() => onChange('24h')}
        style={styles.button}>
        <Animated.Text style={[styles.text, text24Style]}>24h</Animated.Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 2,
    alignItems: 'center',
    position: 'relative',
  },
  pill: {
    position: 'absolute',
    left: 3,
    top: 3,
    bottom: 3,
    backgroundColor: '#000000',
    borderRadius: 20,
    zIndex: 0,
  },
  button: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  text: {
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
    letterSpacing: -0.2,
    textAlign : "center"
  },
});