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
  // Navigation
  navChat: string;
  navSpots: string;
  navItinerary: string;
  navCulture: string;
  navEvents: string;
  navMaps: string;
  navCustomProfile: string;
  navResetChat: string;
  languageSelectTitle: string;
  weatherLive: string;

  // Chat
  chatWelcomeHeading: string;
  chatWelcomeSub: string;
  chatPromptFoodTitle: string;
  chatPromptFoodDesc: string;
  chatPromptFoodBtn: string;
  chatPromptWisdomTitle: string;
  chatPromptWisdomDesc: string;
  chatPromptWisdomBtn: string;
  chatPromptBikeTitle: string;
  chatPromptBikeDesc: string;
  chatPromptBikeBtn: string;
  chatPromptParkTitle: string;
  chatPromptParkDesc: string;
  chatPromptParkBtn: string;
  chatInputPlaceholder: string;
  chatInputSend: string;
  chatInputThinking: string;
  chatQuickChipsTitle: string;
  chatClearConfirm: string;
  chatDisclaimer: string;
  chatCopy: string;
  chatCopied: string;
  chatListen: string;
  chatStop: string;
  chatAskPlaceholder: string;

  // Spots
  spotsTitle: string;
  spotsSubtitle: string;
  spotsSearchPlaceholder: string;
  spotsAllZones: string;
  spotsCyclingTitle: string;
  spotsCyclingSubtitle: string;
  spotsAskBtn: string;
  spotsMapBtn: string;
  spotsOfflineBtn: string;

  // Itinerary
  itinTitle: string;
  itinSubtitle: string;
  itinDays: string;
  itinVibe: string;
  itinInterests: string;
  itinTransport: string;
  itinPace: string;
  itinGenerateBtn: string;
  itinGenerating: string;
  itinChecklistTitle: string;
  itinSendToChat: string;
  itinCopy: string;
  itinCopied: string;

  // Culture & Wisdom
  cultureHeroTitle: string;
  cultureHeroSubtitle: string;
  cultureAfroTitle: string;
  cultureAfroText: string;
  cultureBribriTitle: string;
  cultureBribriText: string;
  cultureGlossaryTitle: string;
  cultureWeatherTitle: string;
  cultureOceanTitle: string;
  wisdomHeaderTitle: string;
  wisdomHeaderSub: string;
  wisdomAll: string;
  wisdomTrails: string;
  wisdomFruits: string;
  wisdomDipping: string;
  wisdomFood: string;
  wisdomWildlife: string;
  wisdomHarvestBtnShow: string;
  wisdomHarvestBtnHide: string;
  wisdomHarvestTitle: string;
  wisdomAskBtn: string;

  // Maps
  mapsTitle: string;
  mapsSubtitle: string;
  mapsDownloadPng: string;
  mapsVectorSvg: string;
  mapsPrintPdf: string;
  mapsSelectArea: string;
  mapsIndexedPois: string;
  mapsSafetyHeader: string;
  mapsOfflineEmergencyTitle: string;
  mapsHowToTitle: string;
  mapsHowToDesc: string;

  // Events
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

  // Profile Modal
  profileTitle: string;
  profileSubtitle: string;
  profileTravelStyle: string;
  profileDuration: string;
  profileTransport: string;
  profileBudget: string;
  profileGroup: string;
  profileSaveBtn: string;
  profileCloseBtn: string;
}

export const TRANSLATIONS: Record<AppLanguage, TranslationDictionary> = {
  en: {
    navChat: 'WolabaGo Chat',
    navSpots: 'Coastal Spots',
    navItinerary: 'Itinerary Planner',
    navCulture: 'Culture & Safety',
    navEvents: 'Community Events',
    navMaps: 'Offline Maps',
    navCustomProfile: 'Custom Profile',
    navResetChat: 'Reset',
    languageSelectTitle: 'Select Language',
    weatherLive: 'Live Caribbean Weather',

    chatWelcomeHeading: '¡Wha\'ppen! Welcome to',
    chatWelcomeSub: 'Your real-time AI tourism assistant for Talamanca, Puerto Viejo, Cahuita, Manzanillo, and the South Caribbean coast of Costa Rica. Ask for verified sodas, bike routes, surf spots, and custom day-by-day itineraries.',
    chatPromptFoodTitle: 'Gastronomy & Sodas',
    chatPromptFoodDesc: 'Authentic Rice & Beans in Puerto Viejo Centro & Playa Negra',
    chatPromptFoodBtn: 'Explore food',
    chatPromptWisdomTitle: 'Community Wisdom',
    chatPromptWisdomDesc: 'Hidden trails, secret sea caves & seasonal fruit cycles',
    chatPromptWisdomBtn: 'Guide lore',
    chatPromptBikeTitle: 'Coastal Cycling',
    chatPromptBikeDesc: '1-Day Cruiser Bike Route from town to Manzanillo',
    chatPromptBikeBtn: 'See bike plan',
    chatPromptParkTitle: 'National Parks',
    chatPromptParkDesc: 'Cahuita National Park: trail, sloths, reef & entrance tips',
    chatPromptParkBtn: 'Park guide',
    chatInputPlaceholder: 'Ask about beaches, sodas, cruiser bike routes, sloths, or Bribri tours...',
    chatInputSend: 'Ask',
    chatInputThinking: 'WolabaGo is searching and thinking...',
    chatQuickChipsTitle: 'Quick Prompts:',
    chatClearConfirm: 'Start a fresh conversation with WolabaGo?',
    chatDisclaimer: 'WolabaGo uses real-time Google search grounding with verified local Talamanca knowledge.',
    chatCopy: 'Copy',
    chatCopied: 'Copied',
    chatListen: 'Listen',
    chatStop: 'Stop',
    chatAskPlaceholder: 'Type your question...',

    spotsTitle: 'Verified Coastal Spots & Sodas',
    spotsSubtitle: 'Curated directory spanning Playa Negra, Puerto Viejo Centro, Cocles, Playa Chiquita, Punta Uva, Manzanillo, Cahuita, and Bribri.',
    spotsSearchPlaceholder: 'Search spots by name, food, surf, or feature...',
    spotsAllZones: 'All Zones',
    spotsCyclingTitle: 'Coastal Cruiser Bicycle Distances',
    spotsCyclingSubtitle: 'Flat coastal road (Route 256) with bike rental shops everywhere.',
    spotsAskBtn: 'Ask in chat',
    spotsMapBtn: 'Google Maps',
    spotsOfflineBtn: 'Offline Static Maps & Guides',

    itinTitle: 'Personalized Talamanca Itinerary Planner',
    itinSubtitle: 'Generate a realistic day-by-day route with travel times, bicycle legs, verified sodas, and cultural etiquette.',
    itinDays: 'Trip Duration',
    itinVibe: 'Travel Vibe',
    itinInterests: 'Key Interests',
    itinTransport: 'Primary Transport',
    itinPace: 'Pacing Style',
    itinGenerateBtn: 'Generate Grounded Itinerary',
    itinGenerating: 'Crafting itinerary with live Talamanca intelligence...',
    itinChecklistTitle: 'Caribbean Packing & Gear Checklist',
    itinSendToChat: 'Open in Chat to customize',
    itinCopy: 'Copy Itinerary',
    itinCopied: 'Copied to Clipboard!',

    cultureHeroTitle: 'Culture, Language & Ocean Safety Guide',
    cultureHeroSubtitle: 'The South Caribbean is distinct from the rest of Costa Rica — a tapestry of Bribri and Cabécar indigenous heritage, 19th-century Jamaican and Afro-Caribbean settlements, and raw tropical nature.',
    cultureAfroTitle: 'Afro-Caribbean Heritage & Calypso',
    cultureAfroText: 'In the late 1800s, Afro-descendant families arrived on the Talamanca coast, bringing English-creole language (Mekatelyu), timber stilt architecture, culinary mastery, and Calypso music.',
    cultureBribriTitle: 'Bribri & Cabécar Indigenous Cosmovision',
    cultureBribriText: 'Talamanca is the ancestral home of the Bribri and Cabécar peoples, who maintain their matrilineal clan system and reverent connection to nature governed by creator god Sibö.',
    cultureGlossaryTitle: 'Local Glossary: Mekatelyu & Caribbean Terms',
    cultureWeatherTitle: 'Caribbean Microclimate Reality',
    cultureOceanTitle: 'Ocean & Safety Guidelines',
    wisdomHeaderTitle: 'Community Wisdom',
    wisdomHeaderSub: 'Short, verified tips directly from Bribri elders, boatmen, certified ocean lifeguards, and generational bakers. Uncovering unmapped paths, tropical fruit ripening cycles, and respectful forest etiquette.',
    wisdomAll: 'All Wisdom',
    wisdomTrails: 'Hidden Trails',
    wisdomFruits: 'Fruit Seasons',
    wisdomDipping: 'Secret Dipping',
    wisdomFood: 'Food Secrets',
    wisdomWildlife: 'Wildlife Respect',
    wisdomHarvestBtnShow: 'Fruit Harvest Cheat Sheet',
    wisdomHarvestBtnHide: 'Hide Fruit Seasons Guide',
    wisdomHarvestTitle: 'Talamanca Seasonal Fruit & Harvest Cheat Sheet',
    wisdomAskBtn: 'Ask WolabaGo for more details',

    mapsTitle: 'Offline Static Area Maps of Talamanca',
    mapsSubtitle: 'Mobile data frequently drops between Cocles, Punta Uva, and Manzanillo, or deep in Cahuita National Park. Download these high-contrast static area maps directly to your photo gallery for 100% offline navigation.',
    mapsDownloadPng: 'Download PNG (For Gallery)',
    mapsVectorSvg: 'Vector SVG',
    mapsPrintPdf: 'Print / PDF',
    mapsSelectArea: 'Select Area Map to View & Download:',
    mapsIndexedPois: 'Key Landmarks & Exact Offline Coordinates',
    mapsSafetyHeader: 'Offline Survival & Transport Protocol for Talamanca',
    mapsOfflineEmergencyTitle: 'Offline Emergency Directory (Save or Screenshot)',
    mapsHowToTitle: 'How to access these maps with zero cell signal:',
    mapsHowToDesc: 'Click "Download PNG (For Gallery)" above. The high-resolution map image will download to your device so you can zoom in your Photos app even in airplane mode!',

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

    profileTitle: 'Traveler Profile & Preferences',
    profileSubtitle: 'Customize your style so WolabaGo tailors every recommendation to your pace.',
    profileTravelStyle: 'Travel Style',
    profileDuration: 'Trip Duration',
    profileTransport: 'Preferred Transport',
    profileBudget: 'Budget Level',
    profileGroup: 'Travel Group',
    profileSaveBtn: 'Save Preferences',
    profileCloseBtn: 'Close',
  },

  es: {
    navChat: 'Chat WolabaGo',
    navSpots: 'Lugares Costeros',
    navItinerary: 'Planificador de Ruta',
    navCulture: 'Cultura y Seguridad',
    navEvents: 'Eventos Comunales',
    navMaps: 'Mapas Offline',
    navCustomProfile: 'Perfil Personalizado',
    navResetChat: 'Reiniciar',
    languageSelectTitle: 'Seleccionar Idioma',
    weatherLive: 'Clima Caribeño en Vivo',

    chatWelcomeHeading: '¡Wha\'ppen! Bienvenido a',
    chatWelcomeSub: 'Tu asistente turístico de inteligencia artificial en tiempo real para Talamanca, Puerto Viejo, Cahuita, Manzanillo y el Caribe Sur de Costa Rica. Pregunta por sodas verificadas, rutas en bicicleta, surf e itinerarios personalizados día a día.',
    chatPromptFoodTitle: 'Gastronomía y Sodas',
    chatPromptFoodDesc: 'Rice & Beans auténtico en Puerto Viejo Centro y Playa Negra',
    chatPromptFoodBtn: 'Ver gastronomía',
    chatPromptWisdomTitle: 'Sabiduría Comunitaria',
    chatPromptWisdomDesc: 'Senderos secretos, cuevas marinas y temporadas de frutas',
    chatPromptWisdomBtn: 'Consejos locales',
    chatPromptBikeTitle: 'Ciclismo Costero',
    chatPromptBikeDesc: 'Ruta de 1 día en bicicleta playera de Puerto Viejo a Manzanillo',
    chatPromptBikeBtn: 'Ver ruta en bici',
    chatPromptParkTitle: 'Parques Nacionales',
    chatPromptParkDesc: 'Parque Nacional Cahuita: sendero, perezosos, arrecife y entradas',
    chatPromptParkBtn: 'Guía de parque',
    chatInputPlaceholder: 'Pregunta sobre playas, sodas, alquiler de bicis, perezosos o tours Bribri...',
    chatInputSend: 'Enviar',
    chatInputThinking: 'WolabaGo está consultando y analizando...',
    chatQuickChipsTitle: 'Consultas Rápidas:',
    chatClearConfirm: '¿Iniciar una nueva conversación con WolabaGo?',
    chatDisclaimer: 'WolabaGo utiliza información verificada de Google Search y conocimiento comunal de Talamanca.',
    chatCopy: 'Copiar',
    chatCopied: '¡Copiado!',
    chatListen: 'Escuchar',
    chatStop: 'Detener',
    chatAskPlaceholder: 'Escribe tu consulta...',

    spotsTitle: 'Lugares Costeros y Sodas Verificadas',
    spotsSubtitle: 'Directorio seleccionado que abarca Playa Negra, Puerto Viejo Centro, Cocles, Playa Chiquita, Punta Uva, Manzanillo, Cahuita y Bribri.',
    spotsSearchPlaceholder: 'Buscar por nombre, comida, surf o características...',
    spotsAllZones: 'Todas las Zonas',
    spotsCyclingTitle: 'Distancias en Bicicleta Playera',
    spotsCyclingSubtitle: 'Carretera plana costera (Ruta 256) con alquiler de bicicletas en todo el camino.',
    spotsAskBtn: 'Preguntar en chat',
    spotsMapBtn: 'Google Maps',
    spotsOfflineBtn: 'Mapas y Guías Offline',

    itinTitle: 'Planificador de Itinerario en Talamanca',
    itinSubtitle: 'Genera un recorrido realista día a día con tiempos de viaje, tramos en bicicleta, sodas tradicionales y etiqueta cultural.',
    itinDays: 'Duración del Viaje',
    itinVibe: 'Ambiente del Viaje',
    itinInterests: 'Intereses Principales',
    itinTransport: 'Transporte Preferido',
    itinPace: 'Ritmo del Viaje',
    itinGenerateBtn: 'Generar Itinerario Realista',
    itinGenerating: 'Diseñando itinerario con inteligencia local de Talamanca...',
    itinChecklistTitle: 'Lista de Equipaje Caribeño',
    itinSendToChat: 'Abrir en Chat para personalizar',
    itinCopy: 'Copiar Itinerario',
    itinCopied: '¡Copiado al portapapeles!',

    cultureHeroTitle: 'Guía de Cultura, Lenguaje y Seguridad en el Mar',
    cultureHeroSubtitle: 'El Caribe Sur es único en Costa Rica: un tejido de herencia indígena Bribri y Cabécar, asentamientos afrocaribeños del siglo XIX y naturaleza tropical exuberante.',
    cultureAfroTitle: 'Herencia Afrocaribeña y Calipso',
    cultureAfroText: 'A finales del siglo XIX, familias afrodescendientes llegaron a la costa de Talamanca aportando la lengua Mekatelyu, arquitectura de madera sobre pilotes, gastronomía en leche de coco y música calipso.',
    cultureBribriTitle: 'Cosmovisión Indígena Bribri y Cabécar',
    cultureBribriText: 'Talamanca es el hogar ancestral de los pueblos Bribri y Cabécar, quienes conservan sus clanes matrilineales y su conexión sagrada con la naturaleza guiada por Sibö.',
    cultureGlossaryTitle: 'Glosario Local: Términos en Mekatelyu y Caribeños',
    cultureWeatherTitle: 'Realidad del Microclima Caribeño',
    cultureOceanTitle: 'Pautas de Seguridad y Resacas en el Mar',
    wisdomHeaderTitle: 'Sabiduría Comunitaria',
    wisdomHeaderSub: 'Consejos breves y verificados directamente de ancianos Bribri, boteros, guardavidas certificados y cocineras tradicionales. Senderos ocultos, cosechas de frutas y respeto por el bosque.',
    wisdomAll: 'Todos los Consejos',
    wisdomTrails: 'Senderos Ocultos',
    wisdomFruits: 'Temporadas de Frutas',
    wisdomDipping: 'Pozas Secretas',
    wisdomFood: 'Secretos Gastronómicos',
    wisdomWildlife: 'Respeto a la Fauna',
    wisdomHarvestBtnShow: 'Calendario de Cosechas',
    wisdomHarvestBtnHide: 'Ocultar Calendario',
    wisdomHarvestTitle: 'Guía de Temporada de Frutas de Talamanca',
    wisdomAskBtn: 'Consultar detalles en WolabaGo',

    mapsTitle: 'Mapas Estáticos de Talamanca para Uso Offline',
    mapsSubtitle: 'La señal celular a menudo se interrumpe entre Cocles, Punta Uva y Manzanillo, o dentro del Parque Nacional Cahuita. Descarga estos mapas vectoriales de alto contraste a tu galería para consultar sin conexión.',
    mapsDownloadPng: 'Descargar PNG (Para Galería)',
    mapsVectorSvg: 'Vector SVG',
    mapsPrintPdf: 'Imprimir / PDF',
    mapsSelectArea: 'Seleccionar Mapa de Área para Ver y Descargar:',
    mapsIndexedPois: 'Puntos de Referencia y Coordenadas GPS Offline',
    mapsSafetyHeader: 'Protocolo de Seguridad y Transporte Offline en Talamanca',
    mapsOfflineEmergencyTitle: 'Directorio de Emergencias Offline (Guarda o haz captura)',
    mapsHowToTitle: 'Cómo usar estos mapas sin señal celular:',
    mapsHowToDesc: 'Haz clic en "Descargar PNG (Para Galería)". La imagen de alta resolución se guardará en tu móvil para hacer zoom en la app de Fotos incluso en modo avión.',

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

    profileTitle: 'Perfil y Preferencias de Viajero',
    profileSubtitle: 'Personaliza tu estilo para que WolabaGo adapte cada recomendación a tu ritmo.',
    profileTravelStyle: 'Estilo de Viaje',
    profileDuration: 'Duración del Viaje',
    profileTransport: 'Transporte Preferido',
    profileBudget: 'Nivel de Presupuesto',
    profileGroup: 'Grupo de Viaje',
    profileSaveBtn: 'Guardar Preferencias',
    profileCloseBtn: 'Cerrar',
  },

  mek: {
    navChat: 'Wolaba Talk',
    navSpots: 'De Beach Spots',
    navItinerary: 'Trip Plan',
    navCulture: 'Culture & Roots',
    navEvents: 'Town Happenins',
    navMaps: 'Afline Meps',
    navCustomProfile: 'Me Travel Style',
    navResetChat: 'Fresh Start',
    languageSelectTitle: 'Pick You Language',
    weatherLive: 'Coast Weather Now',

    chatWelcomeHeading: '¡Wha\'ppen! Welcome to',
    chatWelcomeSub: 'You real-time tourism AI guide fi Talamanca, Puerto Viejo, Cahuita, Manzanillo, and de South Caribbean coast of Costa Rica. Ask bout real sodas, cruiser bike trails, surf, and day-by-day plan.',
    chatPromptFoodTitle: 'De Good Food & Sodas',
    chatPromptFoodDesc: 'Authentic Rice & Beans cook in fresh coconut milk in town & Playa Negra',
    chatPromptFoodBtn: 'Check food',
    chatPromptWisdomTitle: 'Elder & Guide Wisdom',
    chatPromptWisdomDesc: 'Bush trails, secret sea cave & fresh fruit season',
    chatPromptWisdomBtn: 'Hear de lore',
    chatPromptBikeTitle: 'Cruiser Bike Ride',
    chatPromptBikeDesc: 'One-day beach cruiser ride from town down to Manzanillo',
    chatPromptBikeBtn: 'Check bike route',
    chatPromptParkTitle: 'National Park Bush',
    chatPromptParkDesc: 'Cahuita National Park: trail, sloths, coral reef & walkin tips',
    chatPromptParkBtn: 'Park lore',
    chatInputPlaceholder: 'Ask bout beaches, sodas, cruiser bike rental, sloths, or Bribri tours...',
    chatInputSend: 'Talk',
    chatInputThinking: 'WolabaGo deh searchin de coast...',
    chatQuickChipsTitle: 'Quick Questions:',
    chatClearConfirm: 'Start fresh talk wid WolabaGo?',
    chatDisclaimer: 'WolabaGo check real facts from Google Search and true Talamanca people.',
    chatCopy: 'Copy',
    chatCopied: 'Copied!',
    chatListen: 'Hear Voice',
    chatStop: 'Stop Voice',
    chatAskPlaceholder: 'Type you question ya...',

    spotsTitle: 'True Beach Spots & Sodas',
    spotsSubtitle: 'Chosen spots from Playa Negra, Puerto Viejo Centro, Cocles, Playa Chiquita, Punta Uva, Manzanillo, Cahuita, and Bribri.',
    spotsSearchPlaceholder: 'Search spots, fish, soda, or surf...',
    spotsAllZones: 'Every Zone',
    spotsCyclingTitle: 'Cruiser Bike Distance on Route 256',
    spotsCyclingSubtitle: 'Flat coastal road from town to Manzanillo wid bicycle rent shop everywhere.',
    spotsAskBtn: 'Ask in talk',
    spotsMapBtn: 'Google Map',
    spotsOfflineBtn: 'Afline Meps & Guide',

    itinTitle: 'Talamanca Day-by-Day Trip Plan',
    itinSubtitle: 'Make realistic plan wid cruiser bike legs, real sodas fi Rice & Beans, and respect fi de bush.',
    itinDays: 'How Many Days',
    itinVibe: 'Travel Vibe',
    itinInterests: 'What You Love',
    itinTransport: 'How You Movin',
    itinPace: 'Pace Style',
    itinGenerateBtn: 'Build My Real Itinerary',
    itinGenerating: 'Cookin up fresh plan wid local coast intel...',
    itinChecklistTitle: 'Caribbean Bush & Beach Bag Checklist',
    itinSendToChat: 'Open in Chat fi customize',
    itinCopy: 'Copy Trip Plan',
    itinCopied: 'Copied to clipboard!',

    cultureHeroTitle: 'Culture, Mekatelyu Talk & Ocean Safety',
    cultureHeroSubtitle: 'De South Caribbean different from everywhere else in Costa Rica — Bribri and Cabécar roots, Jamaican family settlement, coconut cooking, and raw wild sea.',
    cultureAfroTitle: 'Afro-Caribbean Roots & Calypso',
    cultureAfroText: 'In de late 1800s, Jamaican families come to Talamanca, bringin Mekatelyu talk, wood houses on stilts, Rice & Beans in coconut milk, and true Calypso music like Mr. Walter Ferguson.',
    cultureBribriTitle: 'Bribri & Cabécar Indigenous Sacred Lore',
    cultureBribriText: 'Talamanca is ancestral home of Bribri and Cabécar clans, keepin respectful connection to mother nature guided by Sibö.',
    cultureGlossaryTitle: 'Local Words: Mekatelyu & Caribbean Talk',
    cultureWeatherTitle: 'Coast Microclimate Reality',
    cultureOceanTitle: 'Ocean Swell & Rip Current Rules',
    wisdomHeaderTitle: 'Town Wisdom & Bush Secrets',
    wisdomHeaderSub: 'Short verified tips from Bribri elders, boatmen, lifeguards, and bakers. Secret paths, fruit ripenin time, and forest respect.',
    wisdomAll: 'All Wisdom',
    wisdomTrails: 'Bush Trails',
    wisdomFruits: 'Fruit Seasons',
    wisdomDipping: 'Secret Water Holes',
    wisdomFood: 'Food Secrets',
    wisdomWildlife: 'Sloth & Bush Lore',
    wisdomHarvestBtnShow: 'Fruit Calendar',
    wisdomHarvestBtnHide: 'Hide Calendar',
    wisdomHarvestTitle: 'Talamanca Tropical Fruit Seasons',
    wisdomAskBtn: 'Ask WolabaGo more',

    mapsTitle: 'Afline Meps fi Talamanca Coast',
    mapsSubtitle: 'Phone signal drop plenty between Cocles, Punta Uva, and Manzanillo, or inside Cahuita Park. Download dese high-contrast meps to you phone gallery so you never lost without internet.',
    mapsDownloadPng: 'Download PNG (Fi Phone Gallery)',
    mapsVectorSvg: 'Vector SVG',
    mapsPrintPdf: 'Print / PDF',
    mapsSelectArea: 'Pick Which Mep You Want:',
    mapsIndexedPois: 'Key Landmarks & True GPS Numbers',
    mapsSafetyHeader: 'Afline Coast Survival Protocol',
    mapsOfflineEmergencyTitle: 'Emergency Phone Numbers (Save on phone screen)',
    mapsHowToTitle: 'How fi use mep wid zero signal:',
    mapsHowToDesc: 'Click "Download PNG (Fi Phone Gallery)". De clean photo will save inside you phone Photos app so you can zoom in airplane mode!',

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

    profileTitle: 'Traveler Profile & Style',
    profileSubtitle: 'Set you vibe so WolabaGo answers just how you move.',
    profileTravelStyle: 'Travel Style',
    profileDuration: 'How Long You Stay',
    profileTransport: 'How You Ride',
    profileBudget: 'Budget Pocket',
    profileGroup: 'Who Travel Wid You',
    profileSaveBtn: 'Save Settings',
    profileCloseBtn: 'Close',
  },

  fr: {
    navChat: 'Chat WolabaGo',
    navSpots: 'Lieux Côtiers',
    navItinerary: 'Planificateur d’Itinéraire',
    navCulture: 'Culture & Sécurité',
    navEvents: 'Événements Locaux',
    navMaps: 'Cartes Hors-Ligne',
    navCustomProfile: 'Profil Voyageur',
    navResetChat: 'Réinitialiser',
    languageSelectTitle: 'Choisir la langue',
    weatherLive: 'Météo Caraïbe en direct',

    chatWelcomeHeading: '¡Wha\'ppen! Bienvenue sur',
    chatWelcomeSub: 'Votre assistant touristique IA en temps réel pour Talamanca, Puerto Viejo, Cahuita, Manzanillo et la côte caraïbe sud du Costa Rica. Découvrez les meilleures sodas, circuits à vélo, spots de surf et itinéraires sur mesure.',
    chatPromptFoodTitle: 'Gastronomie & Sodas',
    chatPromptFoodDesc: 'Authentique Rice & Beans au lait de coco à Puerto Viejo et Playa Negra',
    chatPromptFoodBtn: 'Explorer les saveurs',
    chatPromptWisdomTitle: 'Sagesse Communautaire',
    chatPromptWisdomDesc: 'Sentiers cachés, grottes marines et saisons de fruits tropicaux',
    chatPromptWisdomBtn: 'Conseils locaux',
    chatPromptBikeTitle: 'Cyclisme Côtier',
    chatPromptBikeDesc: 'Itinéraire d\'une journée à vélo de Puerto Viejo à Manzanillo',
    chatPromptBikeBtn: 'Voir le parcours vélo',
    chatPromptParkTitle: 'Parcs Nationaux',
    chatPromptParkDesc: 'Parc National de Cahuita : sentier, paresseux, récif de corail',
    chatPromptParkBtn: 'Guide du parc',
    chatInputPlaceholder: 'Posez une question sur les plages, sodas, vélos, paresseux ou visites Bribri...',
    chatInputSend: 'Envoyer',
    chatInputThinking: 'WolabaGo recherche et analyse en direct...',
    chatQuickChipsTitle: 'Suggestions rapides :',
    chatClearConfirm: 'Recommencer une nouvelle conversation avec WolabaGo ?',
    chatDisclaimer: 'WolabaGo utilise des données en direct de Google Search et des connaissances locales vérifiées.',
    chatCopy: 'Copier',
    chatCopied: 'Copié !',
    chatListen: 'Écouter',
    chatStop: 'Arrêter',
    chatAskPlaceholder: 'Écrivez votre message...',

    spotsTitle: 'Lieux Côtiers et Sodas Vérifiées',
    spotsSubtitle: 'Répertoire sélectionné couvrant Playa Negra, Puerto Viejo Centro, Cocles, Playa Chiquita, Punta Uva, Manzanillo, Cahuita et Bribri.',
    spotsSearchPlaceholder: 'Rechercher un lieu, plat, spot de surf ou activité...',
    spotsAllZones: 'Toutes les Zones',
    spotsCyclingTitle: 'Distances à Vélo Cruiser sur la Route 256',
    spotsCyclingSubtitle: 'Route côtière plate reliant facilement les plages avec de nombreuses locations de vélos.',
    spotsAskBtn: 'Demander au chat',
    spotsMapBtn: 'Google Maps',
    spotsOfflineBtn: 'Cartes et Guides Hors-Ligne',

    itinTitle: 'Planificateur d’Itinéraire à Talamanca',
    itinSubtitle: 'Générez un programme quotidien réaliste avec temps de trajet, étapes à vélo, sodas traditionnelles et respect culturel.',
    itinDays: 'Durée du Séjour',
    itinVibe: 'Ambiance du Voyage',
    itinInterests: 'Centres d’Intérêt',
    itinTransport: 'Mode de Transport',
    itinPace: 'Rythme Souhaité',
    itinGenerateBtn: 'Générer l’Itinéraire Vérifié',
    itinGenerating: 'Élaboration de l’itinéraire avec les données locales en direct...',
    itinChecklistTitle: 'Liste des Bagages & Équipement Caraïbe',
    itinSendToChat: 'Ouvrir dans le Chat pour personnaliser',
    itinCopy: 'Copier l’Itinéraire',
    itinCopied: 'Itinéraire copié dans le presse-papier !',

    cultureHeroTitle: 'Guide Culturel, Langage et Sécurité Océanique',
    cultureHeroSubtitle: 'Le Sud des Caraïbes est unique au Costa Rica : un métissage des cultures autochtones Bribri et Cabécar, des colons afro-jamaïcains du XIXe siècle et d\'une nature tropicale intacte.',
    cultureAfroTitle: 'Héritage Afro-Caribéen et Calypso',
    cultureAfroText: 'À la fin du XIXe siècle, des familles d\'ascendance afro-caribéenne se sont installées à Talamanca, apportant la langue Mekatelyu, l\'architecture sur pilotis, la cuisine au lait de coco et le Calypso.',
    cultureBribriTitle: 'Cosmovision Autochtone Bribri et Cabécar',
    cultureBribriText: 'Talamanca est le foyer ancestral des peuples Bribri et Cabécar, qui perpétuent leur système de clans matrilinéaires et leur vénération de la nature régie par le créateur Sibö.',
    cultureGlossaryTitle: 'Glossaire Local : Termes en Mekatelyu et Créole',
    cultureWeatherTitle: 'Réalité du Microclimat Caraïbe',
    cultureOceanTitle: 'Directives de Sécurité et Courants Marins',
    wisdomHeaderTitle: 'Sagesse Communautaire',
    wisdomHeaderSub: 'Courts conseils vérifiés directement auprès des anciens Bribri, bateliers, sauveteurs certifiés et cuisinières traditionnelles.',
    wisdomAll: 'Toutes les Astuces',
    wisdomTrails: 'Sentiers Cachés',
    wisdomFruits: 'Saisons des Fruits',
    wisdomDipping: 'Bassins Secrets',
    wisdomFood: 'Secrets Culinaires',
    wisdomWildlife: 'Respect de la Faune',
    wisdomHarvestBtnShow: 'Calendrier des Récoltes',
    wisdomHarvestBtnHide: 'Masquer le Calendrier',
    wisdomHarvestTitle: 'Fruits Tropicaux de Talamanca et Récoltes',
    wisdomAskBtn: 'Demander plus de détails à WolabaGo',

    mapsTitle: 'Cartes Statiques Hors-Ligne de Talamanca',
    mapsSubtitle: 'Le signal cellulaire se coupe fréquemment entre Cocles, Punta Uva et Manzanillo, ou au cœur du Parc de Cahuita. Téléchargez ces cartes à fort contraste sur votre galerie photo pour naviguer sans connexion.',
    mapsDownloadPng: 'Télécharger PNG (Pour Galerie)',
    mapsVectorSvg: 'Vecteur SVG',
    mapsPrintPdf: 'Imprimer / PDF',
    mapsSelectArea: 'Choisir la Carte à Télécharger :',
    mapsIndexedPois: 'Points de Repère et Coordonnées GPS Hors-Ligne',
    mapsSafetyHeader: 'Protocole de Survie et Déplacement Hors-Ligne à Talamanca',
    mapsOfflineEmergencyTitle: 'Numéros d’Urgence Hors-Ligne (Enregistrer sur le téléphone)',
    mapsHowToTitle: 'Comment utiliser ces cartes sans aucun réseau :',
    mapsHowToDesc: 'Cliquez sur "Télécharger PNG (Pour Galerie)". L\'image haute résolution s\'enregistre dans votre application Photos pour zoomer même en mode avion !',

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

    profileTitle: 'Profil et Préférences de Voyage',
    profileSubtitle: 'Personnalisez votre style pour que WolabaGo adapte chaque suggestion à votre rythme.',
    profileTravelStyle: 'Style de Voyage',
    profileDuration: 'Durée du Séjour',
    profileTransport: 'Transport Préféré',
    profileBudget: 'Niveau de Budget',
    profileGroup: 'Groupe de Voyageurs',
    profileSaveBtn: 'Enregistrer les Préférences',
    profileCloseBtn: 'Fermer',
  },

  de: {
    navChat: 'WolabaGo Chat',
    navSpots: 'Küstenorte',
    navItinerary: 'Routenplaner',
    navCulture: 'Kultur & Sicherheit',
    navEvents: 'Community-Events',
    navMaps: 'Offline-Karten',
    navCustomProfile: 'Reiseprofil',
    navResetChat: 'Zurücksetzen',
    languageSelectTitle: 'Sprache wählen',
    weatherLive: 'Live-Wetter Karibik',

    chatWelcomeHeading: '¡Wha\'ppen! Willkommen bei',
    chatWelcomeSub: 'Dein Echtzeit-KI-Reiseführer für Talamanca, Puerto Viejo, Cahuita, Manzanillo und die Südküste von Costa Rica. Finde authentische Sodas, Fahrradrouten, Surfspots und maßgeschneiderte Tagespläne.',
    chatPromptFoodTitle: 'Gastronomie & Sodas',
    chatPromptFoodDesc: 'Authentisches Rice & Beans in frischer Kokosmilch in Puerto Viejo und Playa Negra',
    chatPromptFoodBtn: 'Kulinarik entdecken',
    chatPromptWisdomTitle: 'Community-Wissen',
    chatPromptWisdomDesc: 'Verborgene Pfade, Meereshöhlen und Tropenfrüchte-Erntezeiten',
    chatPromptWisdomBtn: 'Insider-Tipps',
    chatPromptBikeTitle: 'Küsten-Radtour',
    chatPromptBikeDesc: '1-tägige Cruiser-Fahrradtour von Puerto Viejo nach Manzanillo',
    chatPromptBikeBtn: 'Radtour ansehen',
    chatPromptParkTitle: 'Nationalparks',
    chatPromptParkDesc: 'Cahuita Nationalpark: Dschungelpfad, Faultiere, Korallenriff',
    chatPromptParkBtn: 'Park-Guide',
    chatInputPlaceholder: 'Frage nach Stränden, Sodas, Cruiser-Bikes, Faultieren oder Bribri-Touren...',
    chatInputSend: 'Senden',
    chatInputThinking: 'WolabaGo sucht und analysiert live...',
    chatQuickChipsTitle: 'Schnellfragen:',
    chatClearConfirm: 'Ein neues Gespräch mit WolabaGo beginnen?',
    chatDisclaimer: 'WolabaGo nutzt Echtzeit-Ergebnisse von Google Search und verifiziertes Wissen aus Talamanca.',
    chatCopy: 'Kopieren',
    chatCopied: 'Kopiert!',
    chatListen: 'Vorlesen',
    chatStop: 'Stoppen',
    chatAskPlaceholder: 'Stelle deine Frage...',

    spotsTitle: 'Verifizierte Küstenorte und Sodas',
    spotsSubtitle: 'Ausgewähltes Verzeichnis für Playa Negra, Puerto Viejo Centro, Cocles, Playa Chiquita, Punta Uva, Manzanillo, Cahuita und Bribri.',
    spotsSearchPlaceholder: 'Suche nach Name, Essen, Surfspot oder Besonderheit...',
    spotsAllZones: 'Alle Zonen',
    spotsCyclingTitle: 'Fahrrad-Entfernungen auf Route 256',
    spotsCyclingSubtitle: 'Flache Küstenstraße mit Fahrradverleihen an jeder Ecke.',
    spotsAskBtn: 'Im Chat nachfragen',
    spotsMapBtn: 'Google Maps',
    spotsOfflineBtn: 'Offline-Karten & Guides',

    itinTitle: 'Persönlicher Talamanca-Routenplaner',
    itinSubtitle: 'Erstelle realistische Tagespläne mit Fahrzeiten, Fahrradetappen, traditionellen Sodas und kulturellen Hinweisen.',
    itinDays: 'Reisedauer',
    itinVibe: 'Reisestil',
    itinInterests: 'Hauptinteressen',
    itinTransport: 'Fortbewegungsmittel',
    itinPace: 'Reisetempo',
    itinGenerateBtn: 'Routenplan Erstellen',
    itinGenerating: 'Erstelle Reiseplan mit Live-Daten aus Talamanca...',
    itinChecklistTitle: 'Karibik-Packliste & Ausrüstung',
    itinSendToChat: 'Im Chat öffnen und anpassen',
    itinCopy: 'Reiseplan Kopieren',
    itinCopied: 'In die Zwischenablage kopiert!',

    cultureHeroTitle: 'Kultur, Sprache & Ozeansicherheit',
    cultureHeroSubtitle: 'Die Südküste der Karibik ist einzigartig in Costa Rica: Ein Erbe der Bribri- und Cabécar-Völker, afro-jamaikanischer Einwanderer des 19. Jahrhunderts und unberührter Natur.',
    cultureAfroTitle: 'Afro-Karibisches Erbe und Calypso',
    cultureAfroText: 'Im späten 19. Jahrhundert brachten afro-karibische Familien die Mekatelyu-Kreolsprache, Pfahlbauten aus Holz, Kokosmilch-Küche und Calypso-Musik nach Talamanca.',
    cultureBribriTitle: 'Kosmovision der Bribri und Cabécar',
    cultureBribriText: 'Talamanca ist die Heimat der Bribri und Cabécar, die ihr matrilineares Klansystem und die heilige Verbindung zur Schöpfung von Sibö pflegen.',
    cultureGlossaryTitle: 'Lokales Glossar: Mekatelyu-Begriffe',
    cultureWeatherTitle: 'Das Karibik-Mikroklima',
    cultureOceanTitle: 'Sicherheitshinweise und Brandungsströmungen',
    wisdomHeaderTitle: 'Community-Wissen',
    wisdomHeaderSub: 'Kurze, geprüfte Ratschläge von Bribri-Ältesten, Bootsführern, Rettungsschwimmern und einheimischen Köchinnen.',
    wisdomAll: 'Alle Tipps',
    wisdomTrails: 'Geheime Pfade',
    wisdomFruits: 'Fruchternten',
    wisdomDipping: 'Badebuchten',
    wisdomFood: 'Küchengeheimnisse',
    wisdomWildlife: 'Fauna-Respekt',
    wisdomHarvestBtnShow: 'Erntekalender Anzeigen',
    wisdomHarvestBtnHide: 'Kalender Verbergen',
    wisdomHarvestTitle: 'Tropischer Fruchterntekalender für Talamanca',
    wisdomAskBtn: 'WolabaGo um Details fragen',

    mapsTitle: 'Statische Offline-Karten für Talamanca',
    mapsSubtitle: 'Das Mobilfunknetz bricht zwischen Cocles, Punta Uva und Manzanillo sowie im Cahuita-Park oft ab. Lade diese kontrastreichen Karten in deine Fotogalerie herunter, um ohne Internet zu navigieren.',
    mapsDownloadPng: 'PNG Herunterladen (Für Galerie)',
    mapsVectorSvg: 'Vektor SVG',
    mapsPrintPdf: 'Drucken / PDF',
    mapsSelectArea: 'Gebietskarte Auswählen & Herunterladen:',
    mapsIndexedPois: 'Wichtige Orientierungspunkte & GPS-Koordinaten',
    mapsSafetyHeader: 'Offline-Verkehrs- und Sicherheitsprotokoll',
    mapsOfflineEmergencyTitle: 'Offline-Notrufnummern (Als Screenshot speichern)',
    mapsHowToTitle: 'Nutzung ohne jedes Mobilfunksignal:',
    mapsHowToDesc: 'Klicke oben auf "PNG Herunterladen (Für Galerie)". Das Bild speichert sich in deiner Fotos-App und lässt sich im Flugmodus beliebig vergrößern!',

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

    profileTitle: 'Reiseprofil & Vorlieben',
    profileSubtitle: 'Passe deinen Reisestil an, damit WolabaGo jede Empfehlung auf dich abstimmt.',
    profileTravelStyle: 'Reisestil',
    profileDuration: 'Reisedauer',
    profileTransport: 'Bevorzugtes Transportmittel',
    profileBudget: 'Budget-Kategorie',
    profileGroup: 'Reisegruppe',
    profileSaveBtn: 'Einstellungen Speichern',
    profileCloseBtn: 'Schließen',
  },
};
