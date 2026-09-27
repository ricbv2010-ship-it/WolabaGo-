export interface GroundingSource {
  title: string;
  url: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: string;
  sources?: GroundingSource[];
  searchQueries?: string[];
  isError?: boolean;
}

export interface TravelerProfile {
  style: 'Backpacker' | 'Adventure & Surf' | 'Nature & Wildlife' | 'Cultural Immersion' | 'Slow & Relaxed' | 'Family';
  duration: '1-2 Days' | '3-4 Days' | '5-7 Days' | '10+ Days';
  primaryInterest: string;
  transport: 'Cruiser Bicycle' | 'MEPE Bus & Walking' | 'Rental Car' | 'Tuk-Tuk & Shuttles';
  budgetLevel: 'Budget / Sodas' | 'Moderate' | 'Comfort / Boutique';
  group: 'Solo' | 'Couple' | 'Friends' | 'Family with Kids';
}

export interface CoastalSpot {
  id: string;
  name: string;
  zone: 'Puerto Viejo' | 'Playa Negra' | 'Cocles' | 'Playa Chiquita' | 'Punta Uva' | 'Manzanillo' | 'Cahuita' | 'Bribri';
  distanceFromPV: string; // e.g. "0 km", "4.5 km south", "16 km north"
  bikeTime: string; // e.g. "15 mins", "45 mins"
  tagline: string;
  highlights: string[];
  vibe: string;
  swimmingSafety: 'Gentle & Calm' | 'Moderate / Watch Tides' | 'Expert Only / Strong Currents' | 'Not for Swimming';
  mustTryFood: string;
  iconName: string;
  suggestedPrompt: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export interface GlossaryItem {
  term: string;
  meaning: string;
  origin: 'Afro-Caribbean (Mekatelyu)' | 'Bribri' | 'Costa Rican (Pachuco/Tico)';
  context: string;
}

export type AppLanguage = 'en' | 'es' | 'mek' | 'fr' | 'de';

export type EventCategory = 'market' | 'music' | 'culture' | 'wellness' | 'community';

export type AlertSeverity = 'critical' | 'warning' | 'info';
export type AlertCategory = 'transit' | 'surf' | 'weather' | 'infrastructure';

export interface TransitAlert {
  id: string;
  title: string;
  category: AlertCategory;
  severity: AlertSeverity;
  location: string;
  area: string;
  summary: string;
  advice: string;
  status: 'active' | 'cleared';
  updatedAt: string;
  sourceAuthority: string;
  sourceUrl?: string;
  isRealTime?: boolean;
}

export interface OfflineMapPOI {
  name: string;
  type: 'beach' | 'soda' | 'nature' | 'transit' | 'emergency' | 'culture';
  note: string;
  coordinates?: string;
}

export interface OfflineMapItem {
  id: string;
  title: string;
  subtitle: string;
  zone: string;
  description: string;
  transportBest: string;
  distanceCoverage: string;
  keyPois: OfflineMapPOI[];
  safetyTip: string;
  offlineAdvisory: string;
}

export interface CommunityEvent {
  id: string;
  title: string;
  category: EventCategory;
  date: string;
  time: string;
  location: string;
  area: 'Puerto Viejo Centro' | 'Playa Negra' | 'Cocles' | 'Playa Chiquita' | 'Punta Uva' | 'Manzanillo' | 'Cahuita' | 'Bribri';
  recurrence: string;
  description: string;
  highlight: string;
  cost: string;
  tags: string[];
  sources?: GroundingSource[];
  isRealTimeScraped?: boolean;
}

export type WisdomCategory = 'hidden-trails' | 'fruit-seasons' | 'swimming-spots' | 'food-secrets' | 'wildlife-respect';

export interface WisdomTip {
  id: string;
  title: string;
  category: WisdomCategory;
  guideName: string;
  guideRole: string;
  location: string;
  area: string;
  tip: string;
  bestTimingOrSeason: string;
  coordinates?: string;
  culturalInsight: string;
  suggestedPrompt: string;
}

export type WeatherLocationKey = 'puerto-viejo' | 'playa-negra' | 'cahuita' | 'manzanillo';

export interface WeatherData {
  locationKey: WeatherLocationKey;
  locationName: string;
  temperature: number;
  apparentTemperature: number;
  humidity: number;
  precipitation: number;
  precipitationProbability: number;
  windSpeed: number;
  uvIndex: number;
  condition: string;
  conditionDescription: string;
  iconType: 'sunny' | 'partly-cloudy' | 'cloudy' | 'rain' | 'thunder' | 'drizzle';
  outdoorTip: string;
  surfSeaStatus: string;
  forecast: Array<{
    day: string;
    maxTemp: number;
    minTemp: number;
    precipProb: number;
    condition: string;
  }>;
  updatedAt: string;
}
