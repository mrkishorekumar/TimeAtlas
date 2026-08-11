import { ThemedText } from '@/components/themed-text';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { TimeFormat } from './FormatToggle';

interface TimeDisplayProps {
  date: Date;
  timeZone: string;
  format: TimeFormat;
  selectedDay: number;
  onSelectDay: (day: number) => void;
}

export function TimeDisplay({
  date,
  timeZone,
  format,
  selectedDay,
  onSelectDay,
}: TimeDisplayProps) {
  const options: Intl.DateTimeFormatOptions = {
    timeZone,
    hour: '2-digit',
    minute: '2-digit',
    hour12: format === '12h',
    weekday: 'short',
    month: 'short',
  };

  const formatter = new Intl.DateTimeFormat('en-US', options);
  const parts = formatter.formatToParts(date);

  let hourStr = '08';
  let minuteStr = '40';
  let weekdayStr = 'Thu,';
  let monthStr = 'Mar';

  parts.forEach((p) => {
    if (p.type === 'hour') hourStr = p.value;
    if (p.type === 'minute') minuteStr = p.value;
    if (p.type === 'weekday') weekdayStr = `${p.value},`;
    if (p.type === 'month') monthStr = p.value;
  });

  const monthDayText = `${selectedDay} ${monthStr}`;

  const prevDay = selectedDay - 1 > 0 ? selectedDay - 1 : 30;
  const nextDay = selectedDay + 1 <= 31 ? selectedDay + 1 : 1;

  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <ThemedText style={styles.hugeDigit}>{hourStr}</ThemedText>
        <View style={styles.dateHeader}>
          <ThemedText style={styles.weekdayText}>{weekdayStr}</ThemedText>
          <ThemedText style={styles.monthText}>{monthDayText}</ThemedText>
        </View>
      </View>
      <View style={styles.subContainer}>
        <ThemedText style={styles.hugeDigit}>{minuteStr}</ThemedText>
        <View style={styles.dayWheelContainer}>
          <TouchableOpacity activeOpacity={0.6} onPress={() => onSelectDay(prevDay)}>
            <ThemedText style={styles.fadedDayNumber}>{prevDay}</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.8} style={styles.activeDayPill}>
            <ThemedText style={styles.activeDayNumber}>{selectedDay}</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.6} onPress={() => onSelectDay(nextDay)}>
            <ThemedText style={styles.fadedDayNumber}>{nextDay}</ThemedText>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )

}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 18,
  },
  subContainer: {
    flexDirection: "row", alignItems: "center", justifyContent: "space-between"
  },
  leftClockColumn: {
    justifyContent: 'flex-start',
  },
  hugeDigit: {
    fontSize: 150,
    fontFamily: 'Inter_800ExtraBold',
    color: '#000000',
    lineHeight: 150,
    letterSpacing: -5,
  },
  rightInfoColumn: {
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingLeft: 16,
    paddingTop: 8,
    paddingBottom: 4,
  },
  dateHeader: {
    flex: 1,
    marginLeft: 35
  },
  weekdayText: {
    fontSize: 42,
    fontFamily: 'Inter_400Regular',
    color: '#000000',
    lineHeight: 45,
    letterSpacing: -0.6,
  },
  monthText: {
    fontSize: 42,
    fontFamily: 'Inter_400Regular',
    color: '#000000',
    lineHeight: 50,
    letterSpacing: -0.6,
  },
  dayWheelContainer: {
    flex: 1,
    marginLeft: 35
  },
  fadedDayNumber: {
    fontSize: 42,
    fontFamily: 'Inter_600SemiBold',
    color: '#B5B5B5',
    opacity: 0.35,
    lineHeight: 45,
  },
  activeDayPill: {
    paddingVertical: 1,
  },
  activeDayNumber: {
    fontSize: 42,
    fontFamily: 'Inter_800ExtraBold',
    color: '#000000',
    lineHeight: 45,
  },
});
