import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
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
      {/* Huge Giant Digital Clock Display */}
      <View style={styles.leftClockColumn}>
        <Text style={styles.hugeDigit}>{hourStr}</Text>
        <Text style={styles.hugeDigit}>{minuteStr}</Text>
      </View>

      {/* Right Column: Date Info & Day Picker Wheel */}
      <View style={styles.rightInfoColumn}>
        {/* Top Right: Weekday & Date */}
        <View style={styles.dateHeader}>
          <Text style={styles.weekdayText}>{weekdayStr}</Text>
          <Text style={styles.monthText}>{monthDayText}</Text>
        </View>

        {/* Bottom Right: Scroll/Tap Date Wheel (14, 15, 16) */}
        <View style={styles.dayWheelContainer}>
          <TouchableOpacity activeOpacity={0.6} onPress={() => onSelectDay(prevDay)}>
            <Text style={styles.fadedDayNumber}>{prevDay}</Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.8} style={styles.activeDayPill}>
            <Text style={styles.activeDayNumber}>{selectedDay}</Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.6} onPress={() => onSelectDay(nextDay)}>
            <Text style={styles.fadedDayNumber}>{nextDay}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    marginVertical: 8,
  },
  leftClockColumn: {
    justifyContent: 'flex-start',
  },
  hugeDigit: {
    fontSize: 114,
    fontWeight: '800',
    color: '#000000',
    lineHeight: 102,
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
    marginBottom: 20,
  },
  weekdayText: {
    fontSize: 32,
    fontWeight: '400',
    color: '#000000',
    lineHeight: 36,
    letterSpacing: -0.6,
  },
  monthText: {
    fontSize: 32,
    fontWeight: '400',
    color: '#000000',
    lineHeight: 36,
    letterSpacing: -0.6,
  },
  dayWheelContainer: {
    alignItems: 'flex-start',
    gap: 2,
    paddingTop: 6,
  },
  fadedDayNumber: {
    fontSize: 34,
    fontWeight: '600',
    color: '#B5B5B5',
    opacity: 0.35,
    lineHeight: 36,
  },
  activeDayPill: {
    paddingVertical: 1,
  },
  activeDayNumber: {
    fontSize: 42,
    fontWeight: '800',
    color: '#000000',
    lineHeight: 44,
  },
});
