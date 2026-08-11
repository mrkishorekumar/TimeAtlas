import { CityTimezone } from '@/constants/timezone-data';
import { SolarInfo } from '@/utils/solar';
import { StyleSheet, View } from 'react-native';
import { ThemedText } from '@/components/themed-text';


interface LocationDisplayProps {
  city: CityTimezone;
  solar: SolarInfo;
}

export function LocationDisplay({ city, solar }: LocationDisplayProps) {
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", width: "90%"}}>
        {/* Massive Multi-line City Typography */}
        <View style={styles.typographyStack}>
          {city.cityLines.map((line, index) => (
            <ThemedText key={index} style={styles.cityLineText}>
              {line}
            </ThemedText>
          ))}
        </View>

        {/* Top Header Row for Location with Solar info beside it */}
        <View style={styles.headerRow}>
          <View style={styles.solarBadge}>
            <ThemedText style={styles.sunLabelText}>Sun ☀️ : {solar.daylight}</ThemedText>
            <ThemedText style={styles.sunTimeText}>
              {solar.sunrise} - {solar.sunset}
            </ThemedText>
          </View>
        </View>
      </View>
    </View>
  )

}

const styles = StyleSheet.create({
  container: {
    marginTop: 34,
    flex: 1,
    justifyContent : "center",
    alignItems : "center"
  },
  headerRow: {
    flexDirection: 'row',
    marginTop: 8,
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
