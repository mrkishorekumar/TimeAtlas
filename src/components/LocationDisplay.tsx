import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { CityTimezone } from '@/constants/timezone-data';
import { SolarInfo } from '@/utils/solar';

interface LocationDisplayProps {
  city: CityTimezone;
  solar: SolarInfo;
}

export function LocationDisplay({ city, solar }: LocationDisplayProps) {
  return (
    <View style={styles.container}>
      {/* Top Header Row for Location with Solar info beside it */}
      <View style={styles.headerRow}>
        <View style={styles.solarBadge}>
          <Text style={styles.sunLabelText}>Sun ☀️ : {solar.daylight}</Text>
          <Text style={styles.sunTimeText}>
            {solar.sunrise} - {solar.sunset}
          </Text>
        </View>
      </View>

      {/* Massive Multi-line City Typography */}
      <View style={styles.typographyStack}>
        {city.cityLines.map((line, index) => (
          <Text key={index} style={styles.cityLineText}>
            {line}
          </Text>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginBottom: 24,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 4,
  },
  solarBadge: {
    alignItems: 'flex-end',
  },
  sunLabelText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#111111',
    letterSpacing: -0.2,
  },
  sunTimeText: {
    fontSize: 14,
    fontWeight: '400',
    color: '#444444',
    marginTop: 2,
    letterSpacing: -0.2,
  },
  typographyStack: {
    marginTop: 2,
  },
  cityLineText: {
    fontSize: 48,
    fontWeight: '800',
    color: '#000000',
    lineHeight: 52,
    letterSpacing: -1.6,
  },
});
