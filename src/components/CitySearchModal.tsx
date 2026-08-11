import { CITIES, CityTimezone } from '@/constants/timezone-data';
import { useState } from 'react';
import {
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppIcon } from './AppIcon';

interface CitySearchModalProps {
  visible: boolean;
  onClose: () => void;
  onSelectCity: (city: CityTimezone) => void;
}

export function CitySearchModal({ visible, onClose, onSelectCity }: CitySearchModalProps) {
  const [query, setQuery] = useState('');

  const filteredCities = CITIES.filter(
    (c) =>
      c.name.toLowerCase().includes(query.toLowerCase()) ||
      c.region.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <SafeAreaView style={styles.modalOverlay}>
        <View style={styles.container}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Select City</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <Text style={styles.closeText}>Done</Text>
            </TouchableOpacity>
          </View>

          {/* Search Bar */}
          <View style={styles.searchBar}>
            <AppIcon name="search" size={16} color="#888888" />
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
                  onSelectCity(item);
                  onClose();
                }}>
                <View>
                  <Text style={styles.cityName}>{item.name}</Text>
                  <Text style={styles.cityRegion}>{item.region}</Text>
                </View>
                <Text style={styles.timeZoneCode}>
                  {item.timeZone.split('/')[1]?.replace('_', ' ')}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  container: {
    flex: 1,
    backgroundColor: '#F5F5F7',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: 40,
    paddingTop: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000000',
  },
  closeText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#007AFF',
  },
  closeBtn: {
    padding: 4,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E5EA',
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    color: '#000000',
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  cityCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 16,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 1,
  },
  cityName: {
    fontSize: 17,
    fontWeight: '600',
    color: '#000000',
  },
  cityRegion: {
    fontSize: 13,
    color: '#666666',
    marginTop: 2,
  },
  timeZoneCode: {
    fontSize: 13,
    fontWeight: '500',
    color: '#888888',
  },
});
