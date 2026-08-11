export interface CityTimezone {
  id: string;
  name: string;
  cityLines: string[];
  region: string;
  timeZone: string;
  utcOffset: string; // e.g. "UTC-8"
  lat: number;
  lng: number;
  defaultSunrise: string;
  defaultSunset: string;
  daylightHours: string;
  avatarUrl?: string;
}

export const CITIES: CityTimezone[] = [
  {
    id: 'los-angeles',
    name: 'Los Angeles',
    cityLines: ['Los', 'Angeles,', 'California,', 'USA'],
    region: 'California, USA',
    timeZone: 'America/Los_Angeles',
    utcOffset: 'UTC-8',
    lat: 34.0522,
    lng: -118.2437,
    defaultSunrise: '07:12',
    defaultSunset: '17:17',
    daylightHours: '10h 06m',
  },
  {
    id: 'dubai',
    name: 'Dubai',
    cityLines: ['Dubai,', 'United Arab', 'Emirates,', 'UAE'],
    region: 'United Arab Emirates',
    timeZone: 'Asia/Dubai',
    utcOffset: 'UTC+4',
    lat: 25.2048,
    lng: 55.2708,
    defaultSunrise: '05:50',
    defaultSunset: '18:50',
    daylightHours: '13h 00m',
  },
  {
    id: 'tokyo',
    name: 'Tokyo',
    cityLines: ['Tokyo,', 'Kanto,', 'Japan'],
    region: 'Japan',
    timeZone: 'Asia/Tokyo',
    utcOffset: 'UTC+9',
    lat: 35.6762,
    lng: 139.6503,
    defaultSunrise: '05:20',
    defaultSunset: '18:15',
    daylightHours: '12h 55m',
  },
  {
    id: 'sydney',
    name: 'Sydney',
    cityLines: ['Sydney,', 'NSW,', 'Australia'],
    region: 'New South Wales, Australia',
    timeZone: 'Australia/Sydney',
    utcOffset: 'UTC+11',
    lat: -33.8688,
    lng: 151.2093,
    defaultSunrise: '06:40',
    defaultSunset: '17:35',
    daylightHours: '10h 55m',
  },
  {
    id: 'new-york',
    name: 'New York',
    cityLines: ['New', 'York,', 'NY,', 'USA'],
    region: 'New York, USA',
    timeZone: 'America/New_York',
    utcOffset: 'UTC-5',
    lat: 40.7128,
    lng: -74.006,
    defaultSunrise: '06:45',
    defaultSunset: '18:30',
    daylightHours: '11h 45m',
  },
  {
    id: 'london',
    name: 'London',
    cityLines: ['London,', 'Greater', 'London,', 'UK'],
    region: 'United Kingdom',
    timeZone: 'Europe/London',
    utcOffset: 'UTC+0',
    lat: 51.5074,
    lng: -0.1278,
    defaultSunrise: '06:15',
    defaultSunset: '19:42',
    daylightHours: '13h 27m',
  },
  {
    id: 'paris',
    name: 'Paris',
    cityLines: ['Paris,', 'Île-de-', 'France,', 'France'],
    region: 'France',
    timeZone: 'Europe/Paris',
    utcOffset: 'UTC+1',
    lat: 48.8566,
    lng: 2.3522,
    defaultSunrise: '06:30',
    defaultSunset: '20:10',
    daylightHours: '13h 40m',
  },
];
