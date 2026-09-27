import { CoastalSpot, GlossaryItem } from '../types';

export const COASTAL_SPOTS: CoastalSpot[] = [
  {
    id: 'puerto-viejo',
    name: 'Puerto Viejo Centro & Salsa Brava',
    zone: 'Puerto Viejo',
    distanceFromPV: '0 km (Downtown Hub)',
    bikeTime: '0 min (Central village)',
    tagline: 'The bustling central core of Puerto Viejo: banking, MEPE terminal, Salsa Brava reef, open-air calypso, and sodas like Soda Lidia and Tamara (distinct from Playa Negra to the north).',
    highlights: [
      'Salsa Brava reef break (for expert surfers only, razor-sharp reef)',
      'Downtown culinary sodas: Soda Lidia (behind football plaza), Soda Tamara, Soda Jammin',
      'Saturday organic farmers market with local cacao artisans & tropical fruits',
      'Cruiser bike rental shops, ATMs (Banco de Costa Rica / BN), and central MEPE bus stop',
      'Note: Located south of the bridge/entrance road, distinct from Playa Negra to the north'
    ],
    vibe: 'Vibrant, central, musical, eclectic & lively',
    swimmingSafety: 'Expert Only / Strong Currents',
    mustTryFood: 'Traditional Rice & Beans with Caribbean chicken at Soda Lidia (downtown) or whole fish at Soda Tamara',
    iconName: 'Compass',
    suggestedPrompt: 'Where are the best sodas and calypso spots specifically in Puerto Viejo Centro?'
  },
  {
    id: 'playa-negra',
    name: 'Playa Negra & Bulevar',
    zone: 'Playa Negra',
    distanceFromPV: '1.5 km North of Downtown',
    bikeTime: '5-8 mins by cruiser bike',
    tagline: 'Distinct coastal zone north of Puerto Viejo: famous dark volcanic sand, gentle surf, seaside boulevard, and authentic local sodas like Soda Mirna on Calle Playa Negra.',
    highlights: [
      'Soda Mirna on Calle Playa Negra (GPS: 9.655463, -82.768153) — renowned for authentic Rice & Beans, fresh Caribbean fish, patí, and Agua de Sapo',
      'Gentle sand-bottom waves perfect for first-time surfers, bodyboarders & longboarders',
      'The iconic historical barge shipwreck resting near the shoreline',
      'Distinctive sparkling dark magnetic volcanic sand and tranquil beach strolls',
      'Separate and quieter vibe from Puerto Viejo Centro with scenic beachfront road'
    ],
    vibe: 'Relaxed, bohemian, spacious & distinct from town center',
    swimmingSafety: 'Moderate / Watch Tides',
    mustTryFood: 'Caribbean Rice & Beans with stewed chicken/fish and Agua de Sapo at Soda Mirna on Calle Playa Negra (9.655463, -82.768153)',
    iconName: 'Waves',
    suggestedPrompt: 'Tell me about Soda Mirna on Calle Playa Negra (9.655463, -82.768153) and why Playa Negra is distinct from Puerto Viejo Centro.',
    coordinates: { lat: 9.655463, lng: -82.768153 }
  },
  {
    id: 'cocles',
    name: 'Playa Cocles & Jungle Strip',
    zone: 'Cocles',
    distanceFromPV: '2.5 - 4 km South',
    bikeTime: '10-15 mins',
    tagline: 'Golden surf beach backed by deep rainforest, beach volleyball, and artisanal chocolate.',
    highlights: [
      'Cocles beach break (active intermediate surf with lifeguards during peak hours)',
      'Caribeans Coffee & Chocolate Forest bean-to-bar tour',
      'Jaguar Rescue Center nearby (book morning educational tour in advance)',
      'Lush jungle canopy alive with howler monkeys and toucans'
    ],
    vibe: 'Active, athletic, jungle-fringed & tropical',
    swimmingSafety: 'Moderate / Watch Tides',
    mustTryFood: 'Caribeans single-origin dark chocolate bar and passion fruit cold brew',
    iconName: 'Palmtree',
    suggestedPrompt: 'What is the schedule for Jaguar Rescue Center and how do surf conditions look at Playa Cocles?'
  },
  {
    id: 'playa-chiquita',
    name: 'Playa Chiquita',
    zone: 'Playa Chiquita',
    distanceFromPV: '5.5 km South',
    bikeTime: '20-25 mins',
    tagline: 'Secluded jungle path opening onto intimate white-sand coves and natural coral pools.',
    highlights: [
      'Hidden footpath through primary rainforest to reach the sea',
      'Natural protected coral tide pools for relaxing dips',
      'No road noise, very peaceful and bird-filled atmosphere',
      'Gourmet international cafes and organic bakery in town'
    ],
    vibe: 'Peaceful, secluded, natural & romantic',
    swimmingSafety: 'Gentle & Calm',
    mustTryFood: 'Fresh wood-fired sourdough and tropical fruit smoothies',
    iconName: 'Sparkles',
    suggestedPrompt: 'How do I find the hidden jungle trail to Playa Chiquita coves?'
  },
  {
    id: 'punta-uva',
    name: 'Punta Uva & Sloth Point',
    zone: 'Punta Uva',
    distanceFromPV: '8.5 km South',
    bikeTime: '30-35 mins',
    tagline: 'Postcard turquoise Caribbean waters, Sloth Point cliff trail, and river jungle kayaking.',
    highlights: [
      'Crystal calm swimming bay sheltered by the reef',
      'Rio Punta Uva: rent kayaks to paddle upstream through monkey-filled mangroves',
      'Sloth Point trail overlooking emerald sea and natural stone arch',
      'Great reef snorkeling right from the beach during calm sea days'
    ],
    vibe: 'Idyllic, turquoise paradise, family-friendly & lush',
    swimmingSafety: 'Gentle & Calm',
    mustTryFood: 'Freshly cut cold coconut (pipa fría) and Caribbean ceviche',
    iconName: 'Sun',
    suggestedPrompt: 'Plan a half-day in Punta Uva: kayak up the river and hike Sloth Point.'
  },
  {
    id: 'manzanillo',
    name: 'Manzanillo & Wildlife Refuge',
    zone: 'Manzanillo',
    distanceFromPV: '13 km South (End of the road)',
    bikeTime: '45-60 mins',
    tagline: 'Traditional fishing village, the iconic stranded ship, and entrance to Gandoca-Manzanillo Refuge.',
    highlights: [
      'Gandoca-Manzanillo Mixed Wildlife Refuge coastal trail to Mirador',
      'Punta Manzanillo shipwreck and coral lagoons',
      'Ara Manzanillo Great Green Macaw Conservation project nearby',
      'Authentic Afro-Caribbean fishers cooking daily catches'
    ],
    vibe: 'Authentic village, untamed rainforest & slow-paced',
    swimmingSafety: 'Moderate / Watch Tides',
    mustTryFood: 'Ancestral seafood Rondón stew cooked in fresh coconut milk with yuca and plantain at Maxi’s',
    iconName: 'Anchor',
    suggestedPrompt: 'How difficult is the coastal hike inside Gandoca-Manzanillo Refuge to the scenic Mirador?'
  },
  {
    id: 'cahuita',
    name: 'Cahuita & Cahuita National Park',
    zone: 'Cahuita',
    distanceFromPV: '16 km North',
    bikeTime: 'Best via MEPE bus (20-25 mins)',
    tagline: 'Living coral reef, coastal rainforest trail teeming with monkeys & sloths, and Walter Ferguson’s legacy.',
    highlights: [
      'Cahuita National Park: White sand Playa Blanca and 8km coastal trail',
      'Rich coral reef snorkeling with licensed local guides',
      'Kelly Creek entrance (donation-based) and Puerto Vargas entrance (SINAC fee)',
      'Birthplace of Calypso legend Walter Ferguson'
    ],
    vibe: 'Historic, Afro-Caribbean roots, wildlife-packed & serene',
    swimmingSafety: 'Gentle & Calm',
    mustTryFood: 'Fresh spicy meat Patí and traditional plantain tart',
    iconName: 'TreePine',
    suggestedPrompt: 'What are the current entrance guidelines, guide rules, and snorkeling regulations for Cahuita National Park?'
  },
  {
    id: 'bribri',
    name: 'Bribri Indigenous Territory & Waterfalls',
    zone: 'Bribri',
    distanceFromPV: '20 km Inland (Talamanca Mountains)',
    bikeTime: 'Best by local bus, tuk-tuk or tour',
    tagline: 'Ancestral Bribri culture, organic ceremonial cacao traditions, sacred Usuré houses, and jungle waterfalls.',
    highlights: [
      'Ancestral cacao processing and Bribri cosmovision of Sibö',
      'Medicinal plant gardens and traditional knowledge walks',
      'Volio and Bribri waterfalls hidden in dense mountain jungle',
      'Acomuita Indigenous Women Cacao Association'
    ],
    vibe: 'Sacred, ancestral, grounding & deeply educational',
    swimmingSafety: 'Gentle & Calm',
    mustTryFood: 'Ancestral hot pure cacao drink with chili or cinnamon and roasted pejibaye with homemade cheese',
    iconName: 'Shield',
    suggestedPrompt: 'How can I do a respectful community-led Bribri cacao tour and visit Volio waterfall?'
  }
];

export const GLOSSARY_ITEMS: GlossaryItem[] = [
  {
    term: "Wha'ppen",
    meaning: "What is happening? / How are you doing? The ubiquitous and warm Afro-Caribbean greeting.",
    origin: 'Afro-Caribbean (Mekatelyu)',
    context: 'Heard throughout Puerto Viejo, Cahuita, and Manzanillo as a friendly sign of community respect.'
  },
  {
    term: 'Rice and Beans',
    meaning: 'Rice and red beans slow-cooked together in fresh coconut milk, thyme, panela, and habanero chili (chile panameño). Not to be confused with Pacific Costa Rican Gallo Pinto!',
    origin: 'Afro-Caribbean (Mekatelyu)',
    context: 'Served traditionally on weekends and daily at authentic sodas alongside Caribbean spiced chicken, fish, and fried sweet plantains (patacones).'
  },
  {
    term: 'Rondón',
    meaning: 'Ancestral slow-simmered seafood stew with coconut milk, breadfruit, green plantains, yuca, ñame, and freshly caught Caribbean fish or crab.',
    origin: 'Afro-Caribbean (Mekatelyu)',
    context: 'The name comes from "run down" — whatever ingredients the cook could run down that day. Often pre-ordered hours in advance at traditional spots like Maxi’s.'
  },
  {
    term: 'Patí',
    meaning: 'Flaky golden pastry turnover filled with spicy seasoned minced beef, onions, thyme, and fiery chile panameño.',
    origin: 'Afro-Caribbean (Mekatelyu)',
    context: 'Sold warm from street vendors in Cahuita, Puerto Viejo, and bus stops. A beloved Caribbean staple.'
  },
  {
    term: 'Agua de Sapo (Hiel)',
    meaning: 'Energizing cold beverage made from melted cane sugar (tapa de dulce), fresh lime juice, and generous freshly crushed ginger root.',
    origin: 'Afro-Caribbean (Mekatelyu)',
    context: 'The ultimate thirst-quencher after a bike ride under the Caribbean sun.'
  },
  {
    term: 'Usuré',
    meaning: 'Sacred conical thatched house of the Bribri people representing the universe, Sibö (creator deity), and the structural hierarchy of clans.',
    origin: 'Bribri',
    context: 'Visit only with an authorized local Bribri guide and treat the space with the reverence of a cathedral.'
  },
  {
    term: 'Pura Vida',
    meaning: 'Literal "Pure Life", the Costa Rican philosophy of gratitude, calm, and positive spirit.',
    origin: 'Costa Rican (Pachuco/Tico)',
    context: 'Used as hello, goodbye, thank you, and "all is good".'
  },
  {
    term: 'Pan Bon',
    meaning: 'Rich, dark spiced Caribbean fruit bread sweetened with molasses, dried fruit, vanilla, and spices.',
    origin: 'Afro-Caribbean (Mekatelyu)',
    context: 'Pairs wonderfully with afternoon Costa Rican coffee or hot cacao.'
  }
];

export const QUICK_PROMPTS = [
  {
    label: '🌊 Puerto Viejo Centro vs Playa Negra',
    prompt: 'Explain the geographical differences between Puerto Viejo Centro and Playa Negra: where is the bulevar, where is Restaurante Myrna, and what makes each area distinct?'
  },
  {
    label: '🥥 Authentic Rice & Beans Sodas',
    prompt: 'Where can I get the most authentic Caribbean Rice and Beans in Puerto Viejo Centro, Playa Negra, and Cahuita?'
  },
  {
    label: '🏄‍♂️ Salsa Brava vs Cocles Surf',
    prompt: 'Explain the difference between Salsa Brava, Cocles, and Playa Negra for surfing: wave types, hazards, skill levels, and best tide windows.'
  },
  {
    label: '🐒 Cahuita NP Full Guide',
    prompt: 'Give me a practical guide to visiting Cahuita National Park: Kelly Creek vs Puerto Vargas entrance, wildlife spotting tips, swimming spots, and guide requirements.'
  },
  {
    label: '🍫 Bribri Ancestral Cacao Tour',
    prompt: 'How do I arrange an authentic, respectful indigenous Bribri cacao tour, and what can I expect from the experience?'
  },
  {
    label: '🚲 1-Day Beach Cruiser Itinerary',
    prompt: 'Design a realistic 1-day bicycle itinerary starting in Puerto Viejo down to Manzanillo: distances, swimming breaks, lunch spots, and return timing before dark.'
  },
  {
    label: '🚌 MEPE Bus & Transport Tips',
    prompt: 'How does the MEPE bus work between San José, Cahuita, Puerto Viejo, and Manzanillo? What are the practical payment and luggage tips?'
  },
  {
    label: '☀️ Caribbean Weather Reality',
    prompt: 'When is the best time to visit Talamanca? How does Caribbean weather differ from the Pacific, and what are the rain patterns?'
  },
  {
    label: '🐆 Jaguar Rescue Center Visit',
    prompt: 'What are the current public tour times and booking tips for Jaguar Rescue Center in Playa Chiquita?'
  }
];
