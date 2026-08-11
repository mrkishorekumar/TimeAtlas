import { CityTimezone } from '@/constants/timezone-data';

export interface SolarInfo {
  daylight: string;
  sunrise: string;
  sunset: string;
}

/**
 * Calculates formatted time and daylight info for a given city and target date.
 */
export function getSolarInfo(city: CityTimezone, date: Date = new Date()): SolarInfo {
  // Use city defaults or compute based on date shift
  const dayOfYear = Math.floor(
    (date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24)
  );

  // Simple astronomical seasonal variation model
  const latRad = (city.lat * Math.PI) / 180;
  const declination = 0.409 * Math.sin(((2 * Math.PI) / 365) * (dayOfYear - 81));
  const hourAngle = Math.acos(Math.max(-1, Math.min(1, -Math.tan(latRad) * Math.tan(declination))));
  
  const daylightHoursDecimal = (2 * hourAngle * 180) / (Math.PI * 15);
  const hours = Math.floor(daylightHoursDecimal);
  const minutes = Math.floor((daylightHoursDecimal - hours) * 60);

  const daylightStr = `${hours}h ${minutes.toString().padStart(2, '0')}m`;

  return {
    daylight: daylightStr || city.daylightHours,
    sunrise: city.defaultSunrise,
    sunset: city.defaultSunset,
  };
}
