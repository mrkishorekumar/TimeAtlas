import { CITIES, CityTimezone } from '@/constants/timezone-data';
import { FlatList, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TimeFormat } from './FormatToggle';

interface WorldClockListModalProps {
  visible: boolean;
  onClose: () => void;
  onSelectCity: (city: CityTimezone) => void;
  format: TimeFormat;
}

export function WorldClockListModal({
  visible,
  onClose,
  onSelectCity,
  format,
}: WorldClockListModalProps) {
  const now = new Date();

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <SafeAreaView style={styles.modalOverlay}>
        <View style={styles.container}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>World Clocks</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <Text style={styles.closeText}>Close</Text>
            </TouchableOpacity>
          </View>

          {/* List of World Clocks */}
          <FlatList
            data={CITIES}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContent}
            renderItem={({ item }) => {
              const formatter = new Intl.DateTimeFormat('en-US', {
                timeZone: item.timeZone,
                hour: '2-digit',
                minute: '2-digit',
                hour12: format === '12h',
              });
              const formattedTime = formatter.format(now);

              return (
                <TouchableOpacity
                  style={styles.card}
                  activeOpacity={0.8}
                  onPress={() => {
                    onSelectCity(item);
                    onClose();
                  }}>
                  <View>
                    <Text style={styles.cityName}>{item.name}</Text>
                    <Text style={styles.region}>{item.region}</Text>
                  </View>
                  <Text style={styles.timeText}>{formattedTime}</Text>
                </TouchableOpacity>
              );
            }}
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
    paddingBottom: 16,
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
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  card: {
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
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  cityName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000000',
  },
  region: {
    fontSize: 13,
    color: '#666666',
    marginTop: 2,
  },
  timeText: {
    fontSize: 22,
    fontWeight: '700',
    color: '#000000',
    letterSpacing: -0.5,
  },
});
