import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { CITIES, CityTimezone } from '@/constants/timezone-data';
import { AppIcon } from '@/components/AppIcon';

export default function SearchScreen() {
  const router = useRouter();
  const [query, setQuery] = useState('');

  const filteredCities = CITIES.filter(
    (c) =>
      c.name.toLowerCase().includes(query.toLowerCase()) ||
      c.region.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Search Cities</Text>
        </View>

        {/* Search Input */}
        <View style={styles.searchBar}>
          <AppIcon name="search" size={18} color="#888888" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search city or timezone..."
            placeholderTextColor="#999999"
            value={query}
            onChangeText={setQuery}
            autoCapitalize="none"
          />
        </View>

        {/* City List */}
        <FlatList
          data={filteredCities}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.cityCard}
              activeOpacity={0.7}
              onPress={() => {
                router.push({ pathname: '/', params: { cityId: item.id } });
              }}>
              <View>
                <Text style={styles.cityName}>{item.name}</Text>
                <Text style={styles.cityRegion}>{item.region}</Text>
              </View>
              <Text style={styles.timeZoneCode}>{item.utcOffset}</Text>
            </TouchableOpacity>
          )}
        />
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
  header: {
    marginBottom: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#000000',
    letterSpacing: -0.8,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: '#000000',
  },
  listContent: {
    paddingBottom: 40,
  },
  cityCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 18,
    borderRadius: 18,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 1,
  },
  cityName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000000',
  },
  cityRegion: {
    fontSize: 13,
    color: '#666666',
    marginTop: 2,
  },
  timeZoneCode: {
    fontSize: 14,
    fontWeight: '600',
    color: '#888888',
  },
});
