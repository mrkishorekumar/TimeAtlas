import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { CITIES, CityTimezone } from '@/constants/timezone-data';
import { TimeFormat } from './FormatToggle';

interface WorldClockListViewProps {
  selectedCity: CityTimezone;
  onSelectCity: (city: CityTimezone) => void;
  format: TimeFormat;
  onToggleViewMode: () => void;
}

export function WorldClockListView({
  selectedCity,
  onSelectCity,
  format,
  onToggleViewMode,
}: WorldClockListViewProps) {
  const now = new Date();

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
        <TouchableOpacity activeOpacity={0.7} onPress={onToggleViewMode} style={styles.mapToggleBtn}>
          <Text style={styles.mapToggleText}>Map View 🗺️</Text>
        </TouchableOpacity>
      </View>

      {/* City Timezone Card List */}
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.cardList}>
        {CITIES.map((item) => {
          const isSelected = item.id === selectedCity.id;

          const formatter = new Intl.DateTimeFormat('en-US', {
            timeZone: item.timeZone,
            hour: '2-digit',
            minute: '2-digit',
            hour12: format === '12h',
          });
          const formattedTime = formatter.format(now);

          // Determine day/night indicator based on local hour
          const hourVal = parseInt(
            new Intl.DateTimeFormat('en-US', {
              timeZone: item.timeZone,
              hour: 'numeric',
              hour12: false,
            }).format(now),
            10
          );
          const isDay = hourVal >= 6 && hourVal < 18;

          return (
            <TouchableOpacity
              key={item.id}
              activeOpacity={0.85}
              onPress={() => onSelectCity(item)}
              style={[styles.card, isSelected ? styles.activeCard : styles.inactiveCard]}>
              <View style={styles.cardLeft}>
                <Text style={[styles.utcText, isSelected && styles.activeTextSecondary]}>
                  {item.utcOffset}
                </Text>
                <Text style={[styles.cityName, isSelected && styles.activeTextPrimary]}>
                  {item.name}
                </Text>
              </View>

              <View style={styles.cardRight}>
                <Text style={[styles.timeText, isSelected && styles.activeTextPrimary]}>
                  {formattedTime}
                </Text>
                <Text style={styles.sunMoonIndicator}>{isDay ? '☀️' : '🌙'}</Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 8,
  },
  headerRow: {
    marginBottom: 16,
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
    borderWidth: 2,
    borderColor: 'transparent',
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
    marginBottom: 18,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#000000',
    letterSpacing: -0.8,
  },
  mapToggleBtn: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  mapToggleText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#007AFF',
  },
  cardList: {
    gap: 12,
    paddingBottom: 24,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderRadius: 22,
  },
  inactiveCard: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 2,
  },
  activeCard: {
    backgroundColor: '#000000',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 4,
  },
  cardLeft: {
    justifyContent: 'center',
  },
  utcText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#888888',
    marginBottom: 4,
  },
  cityName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000000',
  },
  cardRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  timeText: {
    fontSize: 32,
    fontWeight: '700',
    color: '#000000',
    letterSpacing: -1,
  },
  sunMoonIndicator: {
    fontSize: 16,
    marginLeft: 4,
  },
  activeTextPrimary: {
    color: '#FFFFFF',
  },
  activeTextSecondary: {
    color: '#AAAAAA',
  },
});
