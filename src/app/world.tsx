import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CITIES, CityTimezone } from '@/constants/timezone-data';
import { WorldClockListView } from '@/components/WorldClockListView';
import { WorldMapView } from '@/components/WorldMapView';
import { TimeFormat } from '@/components/FormatToggle';

export default function WorldScreen() {
  const [selectedCity, setSelectedCity] = useState<CityTimezone>(CITIES[0]);
  const [format, setFormat] = useState<TimeFormat>('24h');
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <View style={styles.content}>
        {viewMode === 'list' ? (
          <WorldClockListView
            selectedCity={selectedCity}
            onSelectCity={setSelectedCity}
            format={format}
            onToggleViewMode={() => setViewMode('map')}
          />
        ) : (
          <WorldMapView
            selectedCity={selectedCity}
            onSelectCity={setSelectedCity}
            format={format}
            onToggleViewMode={() => setViewMode('list')}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EAEAEA',
  },
  content: {
    flex: 1,
    paddingHorizontal: 22,
    paddingTop: 8,
    paddingBottom: 80,
  },
});
