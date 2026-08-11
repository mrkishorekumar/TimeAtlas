import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export type TimeFormat = '12h' | '24h';

interface FormatToggleProps {
  format: TimeFormat;
  onChange: (format: TimeFormat) => void;
}

export function FormatToggle({ format, onChange }: FormatToggleProps) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => onChange('12h')}
        style={[styles.button, format === '12h' && styles.activeButton]}>
        <Text style={[styles.text, format === '12h' && styles.activeText]}>12h</Text>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => onChange('24h')}
        style={[styles.button, format === '24h' && styles.activeButton]}>
        <Text style={[styles.text, format === '24h' && styles.activeText]}>24h</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 3,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  button: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeButton: {
    backgroundColor: '#000000',
  },
  text: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000000',
    letterSpacing: -0.2,
  },
  activeText: {
    color: '#FFFFFF',
  },
});
