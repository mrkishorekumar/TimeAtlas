import { AppIcon } from '@/components/AppIcon';
import { FormatToggle, TimeFormat } from '@/components/FormatToggle';
import { LocationDisplay } from '@/components/LocationDisplay';
import { TimeDisplay } from '@/components/TimeDisplay';
import { CITIES, CityTimezone } from '@/constants/timezone-data';
import { getSolarInfo } from '@/utils/solar';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { StatusBar, StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const params = useLocalSearchParams<{ cityId?: string }>();
  const [selectedCity, setSelectedCity] = useState<CityTimezone>(CITIES[0]);
  const [format, setFormat] = useState<TimeFormat>('24h');
  const [selectedDay, setSelectedDay] = useState<number>(15);
  const [currentTime, setCurrentTime] = useState<Date>(new Date());

  useEffect(() => {
    if (params.cityId) {
      const match = CITIES.find((c) => c.id === params.cityId);
      if (match) setSelectedCity(match);
    }
  }, [params.cityId]);

  // Real-time clock updater
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const solarInfo = getSolarInfo(selectedCity, currentTime);

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <StatusBar barStyle="dark-content" backgroundColor="#EAEAEA" />

      <View style={styles.screenContent}>
        {/* Top Header Bar */}
        <View style={styles.headerBar}>
          <TouchableOpacity activeOpacity={0.8} style={styles.topDialButton}>
            <AppIcon name="watch" size={22} color="#FFFFFF" />
          </TouchableOpacity>

          <FormatToggle format={format} onChange={setFormat} />
        </View>

        {/* Hero Clock & Date Display */}
        <TimeDisplay
          date={currentTime}
          timeZone={selectedCity.timeZone}
          format={format}
          selectedDay={selectedDay}
          onSelectDay={setSelectedDay}
        />

        {/* Location & Solar Info */}
        <LocationDisplay city={selectedCity} solar={solarInfo} />

        {/* Spacer */}
        <View style={styles.spacer} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EAEAEA',
  },
  screenContent: {
    flex: 1,
    paddingHorizontal: 22,
    paddingTop: 8,
    paddingBottom: 80,
    justifyContent: 'space-between',
  },
  headerBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 6,
    marginVertical : 15
  },
  topDialButton: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  spacer: {
    flex: 1,
  },
});
