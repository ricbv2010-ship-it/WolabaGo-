import { AppLanguage } from '../types';

export interface LanguageOption {
  code: AppLanguage;
  name: string;
  nativeName: string;
  flag: string;
  badge?: string;
}

export const SUPPORTED_LANGUAGES: LanguageOption[] = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇨🇷' },
  { code: 'mek', name: 'Mekatelyu', nativeName: 'Mekatelyu / Limon Creole', flag: '🌴', badge: 'Local Dialect' },
  { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪' },
];

export interface TranslationDictionary {
  navChat: string;
  navSpots: string;
  navItinerary: string;
  navCulture: string;
  navEvents: string;
  navMaps: string;
  eventsHeaderTitle: string;
  eventsHeaderSubtitle: string;
  scrapeLiveBtn: string;
  scrapingStatus: string;
  realtimeBadge: string;
  allCategories: string;
  catMarket: string;
  catMusic: string;
  catCulture: string;
  catWellness: string;
  catCommunity: string;
  allAreas: string;
  searchPlaceholder: string;
  addToCalendarBtn: string;
  askAboutEventBtn: string;
  sourceLink: string;
  freeCost: string;
  noEventsFound: string;
  resetFilters: string;
  lastScrapedAt: string;
  recurringLabel: string;
  costLabel: string;
  highlightLabel: string;
  languageSelectTitle: string;
  weatherLive: string;
}

export const TRANSLATIONS: Record<AppLanguage, TranslationDictionary> = {
  en: {
    navChat: 'WolabaGo Chat',
    navSpots: 'Coastal Spots',
    navItinerary: 'Itinerary Planner',
    navCulture: 'Culture & Safety',
    navEvents: 'Community Events',
    navMaps: 'Offline Maps',
    eventsHeaderTitle: 'Talamanca Live Community Events',
    eventsHeaderSubtitle: 'Scraped real-time happenings, weekly farmers markets, calypso jam sessions, and indigenous celebrations across the South Caribbean.',
    scrapeLiveBtn: 'Scrape Live Happenings',
    scrapingStatus: 'Scraping real-time Talamanca events with Google Search...',
    realtimeBadge: 'Live Scraped',
    allCategories: 'All Gatherings',
    catMarket: 'Farmers Markets',
    catMusic: 'Live Calypso & Reggae',
    catCulture: 'Cultural Celebrations',
    catWellness: 'Wellness & Surf',
    catCommunity: 'Community & Eco',
    allAreas: 'All Talamanca Zones',
    searchPlaceholder: 'Search events by keyword, artist, market, or venue...',
    addToCalendarBtn: 'Add to Calendar',
    askAboutEventBtn: 'Ask in Chat',
    sourceLink: 'Verified Web Source',
    freeCost: 'Free Admission',
    noEventsFound: 'No events matching your filter. Try another category or refresh live listings.',
    resetFilters: 'Clear Filters',
    lastScrapedAt: 'Last updated',
    recurringLabel: 'Schedule',
    costLabel: 'Admission',
    highlightLabel: 'Local Highlight',
    languageSelectTitle: 'Select Language',
    weatherLive: 'Live Caribbean Weather',
  },
  es: {
    navChat: 'Chat WolabaGo',
    navSpots: 'Lugares Costeros',
    navItinerary: 'Planificador de Ruta',
    navCulture: 'Cultura y Seguridad',
    navEvents: 'Eventos Comunales',
    navMaps: 'Mapas Offline',
    eventsHeaderTitle: 'Eventos Comunales en Vivo de Talamanca',
    eventsHeaderSubtitle: 'Acontecimientos rastreados en tiempo real, ferias de agricultores, sesiones de calipso y celebraciones indígenas del Caribe Sur.',
    scrapeLiveBtn: 'Rastrear Eventos en Vivo',
    scrapingStatus: 'Rastreando eventos en tiempo real con Google Search...',
    realtimeBadge: 'Rastreado en Vivo',
    allCategories: 'Todos los Eventos',
    catMarket: 'Ferias y Mercados',
    catMusic: 'Calipso y Música en Vivo',
    catCulture: 'Celebraciones Culturales',
    catWellness: 'Bienestar y Surf',
    catCommunity: 'Comunidad y Ambiente',
    allAreas: 'Todas las Zonas',
    searchPlaceholder: 'Buscar por evento, artista, feria o lugar...',
    addToCalendarBtn: 'Agendar a Google Calendar',
    askAboutEventBtn: 'Preguntar en Chat',
    sourceLink: 'Fuente Web Verificada',
    freeCost: 'Entrada Gratuita',
    noEventsFound: 'No se encontraron eventos con este filtro. Prueba otra categoría o actualiza la búsqueda.',
    resetFilters: 'Limpiar Filtros',
    lastScrapedAt: 'Última actualización',
    recurringLabel: 'Horario / Frecuencia',
    costLabel: 'Costo',
    highlightLabel: 'Punto Destacado',
    languageSelectTitle: 'Idioma',
    weatherLive: 'Clima en Vivo',
  },
  mek: {
    navChat: 'Wolaba Talk',
    navSpots: 'De Beach Spots',
    navItinerary: 'Trip Plan',
    navCulture: 'Culture & Roots',
    navEvents: 'Town Happenins',
    navMaps: 'Afline Meps',
    eventsHeaderTitle: 'Talamanca Community Happenins Live',
    eventsHeaderSubtitle: 'Fresh scraped tings happenin right now in Wolaba, farmers market, calypso sessions, and roots gathering.',
    scrapeLiveBtn: 'Find Fresh Happenins',
    scrapingStatus: 'Searchin de coast for fresh vibes...',
    realtimeBadge: 'Fresh Vibes Live',
    allCategories: 'Every Ting',
    catMarket: 'Farmin & Organic Market',
    catMusic: 'Live Calypso & Reggae Jam',
    catCulture: 'Roots & Bribri Gatherin',
    catWellness: 'Health, Ocean & Surf',
    catCommunity: 'People & Village Vibes',
    allAreas: 'All Coast & Bush',
    searchPlaceholder: 'Search de vibes, artist, soda or market...',
    addToCalendarBtn: 'Lock to Calendar',
    askAboutEventBtn: 'Ask Wolaba Chat',
    sourceLink: 'Check De Source',
    freeCost: 'Free Walk-in',
    noEventsFound: 'No happenins found right deh. Change de filter or scrape fresh.',
    resetFilters: 'Clear Selection',
    lastScrapedAt: 'Fresh update',
    recurringLabel: 'When It Run',
    costLabel: 'Price to Enter',
    highlightLabel: 'Best Part',
    languageSelectTitle: 'Pick You Language',
    weatherLive: 'Coast Weather Now',
  },
  fr: {
    navChat: 'Chat WolabaGo',
    navSpots: 'Lieux Côtiers',
    navItinerary: 'Planificateur d’Itinéraire',
    navCulture: 'Culture & Sécurité',
    navEvents: 'Événements Locaux',
    navMaps: 'Cartes Hors-Ligne',
    eventsHeaderTitle: 'Événements Communautaires en Direct de Talamanca',
    eventsHeaderSubtitle: 'Événements locaux en temps réel, marchés fermiers, sessions de calypso et célébrations culturelles des Caraïbes du Sud.',
    scrapeLiveBtn: 'Actualiser les Événements',
    scrapingStatus: 'Recherche d’événements en direct avec Google Search...',
    realtimeBadge: 'En Direct',
    allCategories: 'Tous les Événements',
    catMarket: 'Marchés & Produits Bio',
    catMusic: 'Calypso & Musique Live',
    catCulture: 'Célébrations Culturelles',
    catWellness: 'Bien-être & Surf',
    catCommunity: 'Communauté & Écologie',
    allAreas: 'Toutes les Zones',
    searchPlaceholder: 'Rechercher un événement, marché, artiste ou lieu...',
    addToCalendarBtn: 'Ajouter au Calendrier',
    askAboutEventBtn: 'Demander au Chat',
    sourceLink: 'Source Web Vérifiée',
    freeCost: 'Entrée Gratuite',
    noEventsFound: 'Aucun événement ne correspond à ce filtre. Essayez une autre catégorie.',
    resetFilters: 'Effacer les Filtres',
    lastScrapedAt: 'Dernière mise à jour',
    recurringLabel: 'Horaire / Fréquence',
    costLabel: 'Tarif',
    highlightLabel: 'Point Fort',
    languageSelectTitle: 'Choisir la langue',
    weatherLive: 'Météo Caraïbe en direct',
  },
  de: {
    navChat: 'WolabaGo Chat',
    navSpots: 'Küstenorte',
    navItinerary: 'Routenplaner',
    navCulture: 'Kultur & Sicherheit',
    navEvents: 'Community-Events',
    navMaps: 'Offline-Karten',
    eventsHeaderTitle: 'Live-Community-Events in Talamanca',
    eventsHeaderSubtitle: 'In Echtzeit erfasste Veranstaltungen, Bauernmärkte, Calypso-Sessions und indigene Feiern an der Karibikküste.',
    scrapeLiveBtn: 'Live-Events Abrufen',
    scrapingStatus: 'Suche nach Live-Events mit Google Search...',
    realtimeBadge: 'Echtzeit-Aktualisiert',
    allCategories: 'Alle Veranstaltungen',
    catMarket: 'Bauern- & Biomärkte',
    catMusic: 'Live-Calypso & Reggae',
    catCulture: 'Kulturelle Feiern',
    catWellness: 'Wellness & Surfen',
    catCommunity: 'Gemeinschaft & Ökologie',
    allAreas: 'Alle Gebiete',
    searchPlaceholder: 'Events nach Stichwort, Künstler, Markt oder Ort suchen...',
    addToCalendarBtn: 'Zu Google Calendar hinzufügen',
    askAboutEventBtn: 'Im Chat nachfragen',
    sourceLink: 'Verifizierte Webquelle',
    freeCost: 'Freier Eintritt',
    noEventsFound: 'Keine passenden Veranstaltungen gefunden. Filter anpassen oder neu laden.',
    resetFilters: 'Filter zurücksetzen',
    lastScrapedAt: 'Zuletzt aktualisiert',
    recurringLabel: 'Zeitplan / Turnus',
    costLabel: 'Eintritt',
    highlightLabel: 'Besonderes Highlight',
    languageSelectTitle: 'Sprache wählen',
    weatherLive: 'Live-Wetter Karibik',
  },
};
