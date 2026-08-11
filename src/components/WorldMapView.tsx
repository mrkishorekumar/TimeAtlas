import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { CITIES, CityTimezone } from '@/constants/timezone-data';
import { TimeFormat } from './FormatToggle';

interface WorldMapViewProps {
  selectedCity: CityTimezone;
  onSelectCity: (city: CityTimezone) => void;
  format: TimeFormat;
  onToggleViewMode: () => void;
}

const UTC_OFFSETS = [
  'UTC-8',
  'UTC-5',
  'UTC-3',
  'UTC-1',
  'UTC 0',
  'UTC +1',
  'UTC +2',
  'UTC +3',
  'UTC +4',
  'UTC +9',
  'UTC +11',
];

export function WorldMapView({
  selectedCity,
  onSelectCity,
  format,
  onToggleViewMode,
}: WorldMapViewProps) {
  const [selectedUtc, setSelectedUtc] = useState<string>(selectedCity.utcOffset);
  const now = new Date();

  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: selectedCity.timeZone,
    hour: '2-digit',
    minute: '2-digit',
    hour12: format === '12h',
  });
  const formattedTime = formatter.format(now);

  return (
    <View style={styles.container}>
      {/* Top Header: City Avatars + (+) Add Button */}
      <View style={styles.headerRow}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.avatarRow}>
          {CITIES.map((c) => (
            <TouchableOpacity
              key={c.id}
              activeOpacity={0.7}
              onPress={() => onSelectCity(c)}
              style={[
                styles.avatarCircle,
                c.id === selectedCity.id && styles.avatarSelected,
              ]}>
              <Text style={styles.avatarText}>{c.name.substring(0, 2).toUpperCase()}</Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity activeOpacity={0.7} style={styles.addCityBtn}>
            <Text style={styles.addCityText}>+</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      {/* Screen Title & View Mode Toggle */}
      <View style={styles.titleRow}>
        <Text style={styles.title}>World Time</Text>
        <TouchableOpacity activeOpacity={0.7} onPress={onToggleViewMode} style={styles.listToggleBtn}>
          <Text style={styles.listToggleText}>List View 📋</Text>
        </TouchableOpacity>
      </View>

      {/* Interactive World Map Canvas Container */}
      <View style={styles.mapContainer}>
        {/* World Map SVG / Vector Styling background */}
        <View style={styles.worldMapCanvas}>
          <View style={styles.redTimeline} />

          {/* Map Landmass Graphic shapes */}
          <View style={styles.landmassAmericas} />
          <View style={styles.landmassEurasia} />
          <View style={styles.landmassAfrica} />
          <View style={styles.landmassAustralia} />

          {/* Floating Time Card on Map */}
          <View style={styles.floatingMapCard}>
            <View>
              <Text style={styles.mapCardUtc}>{selectedCity.utcOffset}</Text>
              <Text style={styles.mapCardCity}>{selectedCity.name}</Text>
            </View>
            <View style={styles.mapCardTimeRow}>
              <Text style={styles.mapCardTime}>{formattedTime}</Text>
              <Text style={styles.mapCardSun}>☀️</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Bottom UTC Timeline Slider Bar */}
      <View style={styles.utcBarContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.utcScrollContent}>
          {UTC_OFFSETS.map((utc) => {
            const isSelected = utc === selectedUtc;
            return (
              <TouchableOpacity
                key={utc}
                activeOpacity={0.7}
                onPress={() => {
                  setSelectedUtc(utc);
                  const matchingCity = CITIES.find((c) => c.utcOffset === utc);
                  if (matchingCity) onSelectCity(matchingCity);
                }}
                style={[styles.utcItem, isSelected && styles.utcItemSelected]}>
                <Text style={[styles.utcItemText, isSelected && styles.utcItemTextSelected]}>
                  {utc}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 8,
  },
  headerRow: {
    marginBottom: 12,
  },
  avatarRow: {
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 4,
  },
  avatarCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#D9D9D9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarSelected: {
    borderColor: '#000000',
    backgroundColor: '#333333',
  },
  avatarText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#000000',
  },
  addCityBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  addCityText: {
    fontSize: 22,
    fontWeight: '400',
    color: '#333333',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#000000',
    letterSpacing: -0.8,
  },
  listToggleBtn: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  listToggleText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#007AFF',
  },
  mapContainer: {
    flex: 1,
    borderRadius: 24,
    backgroundColor: '#E2E2E4',
    overflow: 'hidden',
    position: 'relative',
    marginBottom: 16,
  },
  worldMapCanvas: {
    flex: 1,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  redTimeline: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: 2,
    backgroundColor: '#FF3B30',
    zIndex: 10,
  },
  landmassAmericas: {
    position: 'absolute',
    left: '10%',
    top: '20%',
    width: 80,
    height: 140,
    backgroundColor: '#9E9E9E',
    borderRadius: 30,
    opacity: 0.6,
  },
  landmassEurasia: {
    position: 'absolute',
    right: '15%',
    top: '15%',
    width: 140,
    height: 100,
    backgroundColor: '#8E8E93',
    borderRadius: 40,
    opacity: 0.7,
  },
  landmassAfrica: {
    position: 'absolute',
    left: '42%',
    top: '40%',
    width: 70,
    height: 90,
    backgroundColor: '#555555',
    borderRadius: 20,
    opacity: 0.8,
  },
  landmassAustralia: {
    position: 'absolute',
    right: '10%',
    bottom: '20%',
    width: 50,
    height: 40,
    backgroundColor: '#9E9E9E',
    borderRadius: 20,
    opacity: 0.6,
  },
  floatingMapCard: {
    position: 'absolute',
    bottom: 24,
    left: 20,
    right: 20,
    backgroundColor: '#000000',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    zIndex: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  mapCardUtc: {
    fontSize: 12,
    fontWeight: '600',
    color: '#888888',
  },
  mapCardCity: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  mapCardTimeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  mapCardTime: {
    fontSize: 30,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: -0.5,
  },
  mapCardSun: {
    fontSize: 18,
  },
  utcBarContainer: {
    height: 44,
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    justifyContent: 'center',
    paddingHorizontal: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  utcScrollContent: {
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 8,
  },
  utcItem: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 14,
  },
  utcItemSelected: {
    backgroundColor: '#000000',
  },
  utcItemText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#666666',
  },
  utcItemTextSelected: {
    color: '#FFFFFF',
  },
});
