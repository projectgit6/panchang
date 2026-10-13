export type NavigationTab =
  | 'daily-panchang'
  | 'monthly-calendar'
  | 'muhurat-and-choghadiya'
  | 'kundli-matching'
  | 'festivals'
  | 'admin-cms';

export type AdminCmsSubTab =
  | 'regional-cities'
  | 'astronomical-engine'
  | 'festival-catalog'
  | 'ingestion-logs';

export interface CityLocation {
  id: string;
  name: string;
  devanagari: string;
  state: string;
  country: string;
  latitude: number;
  latitudeDirection?: 'N' | 'S';
  longitude: number;
  longitudeDirection?: 'E' | 'W';
  elevationMeters?: number;
  elevationM?: number;
  timezone: string;
  utcOffset?: string;
  ephemerisModel?: string;
  ephemerisStatus?: string;
  sunrise?: string;
  sunset?: string;
  solarNoon?: string;
  subtitle?: string;
  elevationNote?: string;
}

export interface PanchangLimb {
  name: string;
  devanagari: string;
  endingTime: string;
  deity: string;
  rulingPlanet?: string;
  auspiciousness?: string;
}

export interface DailyPanchang {
  date: string;
  vikramSamvat: number;
  shakaSamvat: number;
  purnimantaMonth: string;
  amantaMonth: string;
  paksha: string;
  ayana: string;
  ritu: string;
  vaar: string;
  sunrise: string;
  sunset: string;
  moonrise: string;
  moonset: string;
  solarNoon: string;
  dayDuration: string;
  nightDuration: string;
  tithi: PanchangLimb;
  nakshatra: PanchangLimb;
  yoga: PanchangLimb;
  karana: PanchangLimb;
}

export interface TimingWindow {
  title: string;
  timeSpan: string;
  duration?: string;
  description: string;
  tag?: string;
  isHighlight?: boolean;
}

export interface ChoghadiyaItem {
  periodNumber: number;
  name: string;
  devanagari: string;
  graha: string;
  startTime: string;
  endTime: string;
  auspiciousness: 'good' | 'bad' | 'neutral';
}

export interface PlanetaryPosition {
  planet: string;
  devanagari: string;
  rashi: string;
  degrees: number;
  minutes: number;
  seconds: number;
  nakshatra: string;
  pada: number;
  lord: string;
  isRetrograde?: boolean;
  isCombust?: boolean;
}

export interface AshtakootaKoota {
  name: string;
  devanagari: string;
  max: number;
  obtained: number;
  boyValue: string;
  girlValue: string;
  description: string;
  hasDosha: boolean;
}

export interface KundliProfile {
  name: string;
  dob: string;
  tob: string;
  pob: string;
  rashi: string;
  nakshatra: string;
  nakshatraPada: number;
  manglikStatus: 'non-manglik' | 'manglik' | 'anshik-manglik';
}

export interface FestivalItem {
  id: string;
  name: string;
  devanagari: string;
  gregorianDate2024: string;
  month: string;
  paksha: string;
  tithi: string;
  category: string;
  isVrat: boolean;
  description: string;
}

export interface FestivalDeepDive {
  id: string;
  name: string;
  devanagari: string;
  date: string;
  significance: string;
  muhuratWindows: {
    name: string;
    devanagari: string;
    startTime: string;
    endTime: string;
    duration: string;
    isOptimal: boolean;
    notes: string;
  }[];
  shodashopacharaSteps: {
    stepNumber: number;
    name: string;
    devanagari: string;
    procedure: string;
    mantra: string;
  }[];
}

export interface CalendarDay {
  date: string;
  dayNumber: number;
  tithiName: string;
  paksha: string;
  festivals: string[];
  isMajorFestival?: boolean;
  isVrat?: boolean;
  isEkadashi?: boolean;
  isPurnima?: boolean;
  isAmavasya?: boolean;
}

export interface PlanetaryTransitItem {
  planet: string;
  event: string;
  date: string;
  time: string;
  significance: string;
}
