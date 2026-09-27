export interface PackingItem {
  id: string;
  name: string;
  reason: string;
  category: 'essential' | 'surfing' | 'nature' | 'culture' | 'weather';
  packed: boolean;
}

export const BASE_PACKING_ITEMS: Omit<PackingItem, 'packed'>[] = [
  {
    id: 'base-cash',
    name: 'Cash in Colones (₡) & Small USD Bills',
    reason: 'Essential for traditional beach sodas, local fruit stands, bus fares, and tuk-tuks that cannot process cards.',
    category: 'essential',
  },
  {
    id: 'base-dry-bag',
    name: 'Waterproof Dry Bag (10L - 20L)',
    reason: 'Protects phone, camera, and cash during sudden Caribbean showers or river kayaking in Punta Uva.',
    category: 'essential',
  },
  {
    id: 'base-bike-light',
    name: 'Bicycle Headlight & Mini Flashlight',
    reason: 'Route 256 and beach paths have minimal street lighting after sunset at ~5:45 PM.',
    category: 'essential',
  },
  {
    id: 'base-reef-safe-sunscreen',
    name: 'Biodegradable Reef-Safe Sunscreen (SPF 50+)',
    reason: 'Protects fragile living coral ecosystems in Cahuita National Park and Punta Uva reefs.',
    category: 'essential',
  },
  {
    id: 'base-repellent',
    name: 'Natural Insect / Mosquito Repellent',
    reason: 'Crucial for coastal rainforest trails, sunset hours, and shaded mangrove areas.',
    category: 'essential',
  },
  {
    id: 'base-water-bottle',
    name: 'Reusable Insulated Water Bottle',
    reason: 'High tropical humidity requires constant hydration; avoids single-use plastics in conservation zones.',
    category: 'essential',
  },
];

export const SURFING_PACKING_ITEMS: Omit<PackingItem, 'packed'>[] = [
  {
    id: 'surf-booties',
    name: 'Reef Booties / Water Shoes',
    reason: 'Indispensable for Salsa Brava’s sharp volcanic coral shelf and rocky tide entries.',
    category: 'surfing',
  },
  {
    id: 'surf-rashguard',
    name: 'UV Long-Sleeve Rashguard',
    reason: 'Prevents intense sun blistering and board wax friction in tropical warm saltwater.',
    category: 'surfing',
  },
  {
    id: 'surf-wax',
    name: 'Tropical Water Surf Wax (>24°C / 75°F)',
    reason: 'Standard cool wax melts instantly in Caribbean water temperatures (~28°C / 82°F).',
    category: 'surfing',
  },
  {
    id: 'surf-zinc',
    name: 'Zinc Sunblock Mineral Stick (Face & Nose)',
    reason: 'Stays on through heavy wipeouts and hours in the water at Cocles and Playa Negra.',
    category: 'surfing',
  },
  {
    id: 'surf-ear-drops',
    name: 'Swimmer Ear Drops / Antiseptic',
    reason: 'Helps prevent tropical ear canal infections after long sessions in warm coastal waters.',
    category: 'surfing',
  },
];

export const NATURE_PACKING_ITEMS: Omit<PackingItem, 'packed'>[] = [
  {
    id: 'nature-binoculars',
    name: 'Compact Wildlife Binoculars (8x42 or 10x42)',
    reason: 'Vital for spotting two-toed sloths, green macaws, and toucans perched high in primary forest canopy.',
    category: 'nature',
  },
  {
    id: 'nature-trail-shoes',
    name: 'Lightweight Hiking Sandals or Breathable Trail Shoes',
    reason: 'Gandoca-Manzanillo and Cahuita NP trails alternate between packed sand, roots, and muddy patches.',
    category: 'nature',
  },
  {
    id: 'nature-snorkeling-mask',
    name: 'Personal Snorkel & Mask',
    reason: 'Allows spontaneous reef exploration in Punta Uva’s Sloth Point lagoons and Cahuita’s Playa Blanca.',
    category: 'nature',
  },
  {
    id: 'nature-quickdry-towel',
    name: 'Microfiber Quick-Dry Towel',
    reason: 'Dries fast in 80%+ jungle humidity; easy to roll into a daypack.',
    category: 'nature',
  },
  {
    id: 'nature-rain-poncho',
    name: 'Lightweight Packable Rain Poncho',
    reason: 'Keeps you dry while hiking Cahuita or Gandoca when a Caribbean rainforest shower rolls through.',
    category: 'nature',
  },
];

export const CULTURE_PACKING_ITEMS: Omit<PackingItem, 'packed'>[] = [
  {
    id: 'culture-modest-layers',
    name: 'Light Breathable Pants & Shoulder Cover',
    reason: 'Respectful attire when visiting indigenous Bribri communities, sacred Usuré houses, and local churches.',
    category: 'culture',
  },
  {
    id: 'culture-water-shoes',
    name: 'Sturdy River Shoes with Grip',
    reason: 'For walking through rocky riverbeds on Bribri waterfall tours (Volio / Cataratas de Bribri).',
    category: 'culture',
  },
  {
    id: 'culture-reusable-tote',
    name: 'Cloth Tote Bag for Farmers Markets',
    reason: 'Perfect for purchasing artisanal bean-to-bar cacao, organic vanilla, pan bon, and local crafts at Puerto Viejo Saturday market.',
    category: 'culture',
  },
  {
    id: 'culture-electrolyte-packs',
    name: 'Hydration Electrolyte Powder Packets',
    reason: 'Restores minerals after bicycle rides between Puerto Viejo, Playa Negra, and cultural workshops.',
    category: 'culture',
  },
];
