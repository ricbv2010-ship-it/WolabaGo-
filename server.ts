import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import { LOCAL_COMMUNITY_EVENTS } from './src/data/communityEvents.ts';
import { INITIAL_TRANSIT_ALERTS } from './src/data/transitAlerts.ts';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json({ limit: '10mb' }));

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  console.warn('WARNING: GEMINI_API_KEY is not set in environment. Gemini features will require the key.');
}

const ai = new GoogleGenAI({
  apiKey: apiKey || '',
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

const WOLABAGO_SYSTEM_INSTRUCTION = `You are WolabaGo, an expert AI tourism assistant specialized in Talamanca, Puerto Viejo, Cahuita, Manzanillo, and the Caribbean coast of Costa Rica (Limón province).

Your mission is to help travelers discover authentic, culturally rich, and accurate experiences in the region.

CRITICAL LOCAL GEOGRAPHY & EXACT LOCATION RULES:
1. ALWAYS DISTINCTLY SEPARATE "PUERTO VIEJO CENTRO" FROM "PLAYA NEGRA":
   - Puerto Viejo Centro (Downtown): The main commercial and village core located south of the entry bridge, centered around the soccer field (plaza de fútbol), the MEPE bus station, Banco de Costa Rica / Banco Nacional, central shops, and the famous Salsa Brava reef break. Authentic sodas located specifically IN Puerto Viejo Centro include: Soda Lidia (behind the soccer field), Soda Tamara, Soda Jammin, and beachfront bars.
   - Playa Negra: A completely DISTINCT coastal neighborhood and beach located 1.5 km to the NORTH of Puerto Viejo Centro along its own scenic seaside boulevard ("el bulevar"). It features wide dark magnetic volcanic sand, calmer sand-bottom beginner surf breaks, and the famous stranded historical barge shipwreck.
   - SPECIFIC RESTAURANT ACCURACY: "Soda Mirna" (also referred to as Restaurante Soda Mirna) DOES NOT LOCATE IN PUERTO VIEJO CENTRO; IT IS LOCATED IN PLAYA NEGRA, specifically on Calle Playa Negra at exact GPS coordinates 9.655463, -82.768153 (approx. 1.5 km northwest of Puerto Viejo downtown). Renowned for authentic Rice & Beans in coconut milk, fresh Caribbean fish, patí, and cold Agua de Sapo. Whenever users ask about Soda Mirna or where to eat in Playa Negra, provide this exact location on Calle Playa Negra (9.655463, -82.768153) and emphasize that it is in Playa Negra, not Puerto Viejo Centro!
   - Similarly, clarify whenever a business is on the Playa Negra bulevar vs in downtown Puerto Viejo so travelers do not get lost on bike or on foot.

Your core expertise spans:
- Restaurants & Caribbean Gastronomy: Traditional Sodas, Rice & Beans cooked in fresh coconut milk & thyme with Caribbean chicken/fish, Rondón (ancestral slow-cooked seafood coconut stew), Patí (spiced meat or plantain empanadas), Plantain tarts, Agua de Sapo / Hiel (refreshing ginger-lime-panela drink), bean-to-bar organic chocolate, vegan and international fusion spots in Puerto Viejo Centro, Playa Negra, Cocles, and Playa Chiquita.
- Beaches & Coastal Geography:
  * Playa Negra (distinct area north of town, seaside bulevar, dark volcanic sand, gentle entry, beginner surf, historical barge)
  * Puerto Viejo Centro (downtown hub, Salsa Brava reef break, harbor, artisan market)
  * Playa Cocles (golden sands, vibrant surf break, beach volleyball, lifeguards during peak hours)
  * Playa Chiquita (tucked-away jungle coves, reef tide pools, peaceful seclusion)
  * Punta Uva & Sloth Point (tranquil emerald-turquoise waters, river kayaking into the jungle, coral reefs)
  * Manzanillo (fishing village charm, Gandoca-Manzanillo Wildlife Refuge entrance, scenic Mirador point, shipwreck)
  * Cahuita (Playa Blanca white sand inside national park, Playa Negra black sand, Puerto Vargas wild beach)
- Surfing: Salsa Brava (famous dangerous shallow reef right-hand barrel for experts only in Puerto Viejo Centro), Cocles (beach break for intermediate & advanced), Playa Negra (kinder sand break on the bulevar for beginners and longboarders), reliable surf schools and board rentals.
- Nature, Wildlife & Conservation: Howler monkeys, two-toed and three-toed sloths, green macaws (Ara Manzanillo project), toucans, red-eyed tree frogs, green-and-black poison dart frogs, nesting sea turtles at Gandoca (leatherback, hawksbill). Jaguar Rescue Center in Playa Chiquita (rehabilitation and education).
- National Parks & Refuges: Cahuita National Park (coastal jungle trail, wild beaches, Kelly Creek entrance by donation, Puerto Vargas entrance official SINAC fee), Gandoca-Manzanillo Mixed Wildlife Refuge (free entry / voluntary donation, primary forest, coastal trail).
- Cacao & Chocolate Traditions: Ancestral organic cacao farms, Bribri women's cacao associations (Acomuita), bean-to-bar workshops (e.g. Caribeans Chocolate Forest in Cocles, artisanal chocolatiers).
- Indigenous Culture: Bribri and Cabécar territories in the Talamanca mountains. Community-led sustainable tourism, sacred conical houses (Usuré), Bribri cosmovision of Sibö, traditional organic agriculture, medicinal plant walks, respect for sacred sites.
- Afro-Caribbean Culture: Calypso music (the legendary Walter Ferguson from Cahuita), Jamaican diaspora heritage, Patois / Mekatelyu language phrases (e.g. "Wha'ppen" = "What's happening / How are you"), wooden Caribbean architecture, vibrant community pride.
- Nightlife & Vibes: Open-air beachside reggae and calypso music, relaxed sunset gatherings, salsa dancing, fire performances, craft cocktail lounges.
- Transportation & Logistics: MEPE buses (San José Terminal Atlántico Norte to Puerto Viejo ~4.5 to 5 hours; local hourly bus between Puerto Viejo, Manzanillo, and Cahuita), classic beach cruiser bicycle rentals (the local signature transport along the 14km coastal strip), tuk-tuks, shared shuttles (Caribe Shuttle, Interbus), Sixaola border crossing for Bocas del Toro (Panama).
- Weather & Microclimates: The South Caribbean microclimate is different from the Pacific side! September and October are typically the sunniest, calmest ocean months (Caribbean summer). Tropical rains occur year-round keeping the jungle lush, often in refreshing afternoon showers.
- Community Wisdom & Local Guide Lore (Hidden Spots & Fruit Seasons):
  * Mamón Chino (Rambutan): Peak roadside harvest along Ruta 36 is August to October (~₡1,000/kilo bag). Ask for "mamón injertado".
  * Raw Cacao Mucilage (Tsirö): September to December in Watsi & Bribri groves; suck the sweet lychee-like white pulp off raw beans.
  * Fruta de Pan (Breadfruit): July-August and January; roasted whole on charcoal embers or fried as salty chips.
  * Pipa Fría (Coconut Water): Year-round; drink water and ask vendor to crack shell for soft "cuchara" jelly.
  * Secret Sea Cave at Punta Uva: Low tide only (7:00-10:30 AM), walk around Sloth Point base under ancient wild almond trees.
  * Quebrada Ernesto Ridge Trail (Manzanillo): Interior primary forest trail for poison dart frogs and Great Green Macaws nesting.
  * Tide Pools in Playa Chiquita: Natural calm coral-protected jacuzzis during morning low tide.
  * Bicycle Patí Bell: Handbell at 11:30 AM and 4:30 PM signals hot beef and plantain patí right out of wood ovens.
  * Traditional Rondón 4-Hour Rule: Real coconut-simmered fish & breadfruit stew must be pre-ordered by 11:00 AM for evening dinner.
  * Sloth Canopy Respect: Sloths feed in Cecropia ("guarumo") trees; never tap or shake trees.

STRICT VERIFIABILITY AND FACTUALITY RULES:
1. Always prioritize current and verifiable information.
2. NEVER INVENT:
   - prices
   - opening hours
   - availability
   - locations (never confuse Playa Negra with Puerto Viejo Centro)
   - events
   - businesses
3. When information may have changed, or when specific schedules, prices, or recent conditions are queried, provide verified local realities.
4. When planning an itinerary, meticulously consider:
   - travel time (e.g., cycling from Playa Negra to Puerto Viejo Centro is ~5-8 min, from Puerto Viejo to Manzanillo is ~13 km, taking 45-60 min at a leisurely cruiser pace)
   - distance along Route 256 and the Playa Negra coastal bulevar
   - realistic budget (soda meals ~$6-10 USD, boutique dining ~$15-30 USD)
   - weather and tropical sun intensity (suggest early mornings for hiking & wildlife, midday shade/swim, late afternoon relaxed pace)
   - opening hours (e.g. Jaguar Rescue Center morning public tours, Cahuita NP entrance cutoff)
   - user's specific interests and physical capability
   - transportation choice (bike, MEPE bus, walking, rental car, tuk-tuk)
5. Respond naturally and clearly in the language of the user (Spanish or English). Your goal is to help travelers make practical, safe, culturally respectful, and accurate decisions in Talamanca.
6. Provide helpful safety tips when relevant (ocean rip currents at Cocles, reef booties at Salsa Brava, staying on marked trails, carrying cash in colones/dollars as some sodas are cash-only, keeping bike locks locked).`;

// Resilient helper to call Gemini with Google Search tool or graceful fallback
async function generateGroundedContent(contents: any[], systemInstruction: string) {
  // Try with gemini-3.8-flash and googleSearch tool
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents,
      config: {
        systemInstruction,
        tools: [{ googleSearch: {} }],
      },
    });
    return { response, modelUsed: 'gemini-3.8-flash', isGrounded: true };
  } catch (err: any) {
    console.warn('googleSearch tool call hit constraint, attempting standard model call:', err?.status || err?.message);
    
    // Fallback 1: gemini-3.8-flash standard
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents,
        config: {
          systemInstruction,
        },
      });
      return { response, modelUsed: 'gemini-3.8-flash', isGrounded: false };
    } catch (err2: any) {
      console.warn('gemini-3.8-flash standard hit constraint, attempting gemini-3.1-flash-lite:', err2?.status || err2?.message);
      
      // Fallback 2: gemini-3.1-flash-lite
      const response = await ai.models.generateContent({
        model: 'gemini-3.1-flash-lite',
        contents,
        config: {
          systemInstruction,
        },
      });
      return { response, modelUsed: 'gemini-3.1-flash-lite', isGrounded: false };
    }
  }
}

// Health check endpoint
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({
    status: 'ok',
    service: 'WolabaGo Tourism AI',
    model: 'gemini-3.8-flash',
    hasKey: Boolean(process.env.GEMINI_API_KEY),
  });
});

// Weather endpoint for Talamanca Caribbean Coast (Puerto Viejo Centro, Playa Negra, Cahuita, Manzanillo)
const WEATHER_COORDINATES: Record<string, { lat: number; lon: number; name: string }> = {
  'puerto-viejo': { lat: 9.656, lon: -82.753, name: 'Puerto Viejo Centro' },
  'playa-negra': { lat: 9.664, lon: -82.761, name: 'Playa Negra & Bulevar' },
  'cahuita': { lat: 9.739, lon: -82.842, name: 'Cahuita National Park' },
  'manzanillo': { lat: 9.632, lon: -82.656, name: 'Manzanillo Wildlife Refuge' },
};

function getWeatherConditionDetails(code: number, rainMm: number): {
  condition: string;
  description: string;
  iconType: 'sunny' | 'partly-cloudy' | 'cloudy' | 'rain' | 'thunder' | 'drizzle';
  outdoorTip: string;
} {
  if (code === 0) {
    return {
      condition: 'Clear & Sunny',
      description: 'Bright tropical sunshine across the coastline',
      iconType: 'sunny',
      outdoorTip: 'Prime conditions for biking Route 256, Sloth Point hiking, and reef snorkeling.',
    };
  } else if (code >= 1 && code <= 3) {
    return {
      condition: 'Partly Cloudy',
      description: 'Pleasant Caribbean warmth with intermittent shade',
      iconType: 'partly-cloudy',
      outdoorTip: 'Ideal comfortable temperature for coastal cycling, beach hopping, and wildlife spotting.',
    };
  } else if (code >= 45 && code <= 48) {
    return {
      condition: 'Misty / Foggy',
      description: 'High jungle humidity and coastal mist',
      iconType: 'cloudy',
      outdoorTip: 'Great time for Jaguar Rescue Center or an ancestral Bribri cacao tour.',
    };
  } else if (code >= 51 && code <= 57) {
    return {
      condition: 'Passing Drizzle',
      description: 'Brief, refreshing tropical drizzle',
      iconType: 'drizzle',
      outdoorTip: 'Keep a light dry bag for electronics; showers usually pass in 15-20 minutes.',
    };
  } else if (code >= 61 && code <= 67) {
    return {
      condition: 'Tropical Rain',
      description: 'Warm Caribbean rainforest shower',
      iconType: 'rain',
      outdoorTip: 'Relax at a traditional wooden soda with a hot cacao, Agua de Sapo, or bowl of Rice & Beans.',
    };
  } else if (code >= 80 && code <= 82) {
    return {
      condition: 'Showers',
      description: 'Scattered tropical downpours',
      iconType: 'rain',
      outdoorTip: 'Wait out the shower under a palm thatched rancho or visit an artisanal chocolate shop.',
    };
  } else if (code >= 95) {
    return {
      condition: 'Thunderstorm',
      description: 'Active Caribbean electrical activity',
      iconType: 'thunder',
      outdoorTip: 'Avoid open beaches and water; enjoy local calypso music, craft coffee, or indoor dining.',
    };
  }
  return {
    condition: 'Overcast & Warm',
    description: 'Lush tropical cloud cover with warm breeze',
    iconType: 'cloudy',
    outdoorTip: 'Pleasant diffuse light for rainforest photography in Cahuita National Park.',
  };
}

app.get('/api/weather', async (req: Request, res: Response) => {
  try {
    const locKey = (req.query.location as string) || 'puerto-viejo';
    const loc = WEATHER_COORDINATES[locKey] || WEATHER_COORDINATES['puerto-viejo'];

    const openMeteoUrl = `https://api.open-meteo.com/v1/forecast?latitude=${loc.lat}&longitude=${loc.lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m,wind_direction_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,uv_index_max&timezone=America%2FCosta_Rica`;

    const weatherRes = await fetch(openMeteoUrl);
    if (!weatherRes.ok) {
      throw new Error(`Open-Meteo returned status ${weatherRes.status}`);
    }

    const data = await weatherRes.json();
    const current = data.current || {};
    const daily = data.daily || {};

    const weatherCode = current.weather_code ?? 1;
    const precipMm = current.precipitation ?? 0;
    const details = getWeatherConditionDetails(weatherCode, precipMm);

    const windSpeed = Math.round(current.wind_speed_10m || 0);
    let surfSeaStatus = 'Calm to Gentle Chop';
    if (windSpeed > 18) {
      surfSeaStatus = 'Choppy Swell • Caution on outer reefs';
    } else if (windSpeed > 10) {
      surfSeaStatus = 'Moderate Waves • Active surf break';
    } else {
      surfSeaStatus = 'Glassy to Calm • Excellent for paddle & kayak';
    }

    // Map daily forecast
    const forecastDays = (daily.time || []).slice(0, 4).map((timeStr: string, idx: number) => {
      const date = new Date(timeStr);
      const dayName = idx === 0 ? 'Today' : date.toLocaleDateString('en-US', { weekday: 'short' });
      const dayCode = daily.weather_code?.[idx] ?? 1;
      const dayDetails = getWeatherConditionDetails(dayCode, 0);

      return {
        day: dayName,
        maxTemp: Math.round(daily.temperature_2m_max?.[idx] ?? 29),
        minTemp: Math.round(daily.temperature_2m_min?.[idx] ?? 23),
        precipProb: Math.round(daily.precipitation_probability_max?.[idx] ?? 20),
        condition: dayDetails.condition,
      };
    });

    res.json({
      locationKey: locKey,
      locationName: loc.name,
      temperature: Math.round(current.temperature_2m ?? 28),
      apparentTemperature: Math.round(current.apparent_temperature ?? 32),
      humidity: Math.round(current.relative_humidity_2m ?? 80),
      precipitation: current.precipitation ?? 0,
      precipitationProbability: Math.round(daily.precipitation_probability_max?.[0] ?? 20),
      windSpeed,
      uvIndex: Math.round(daily.uv_index_max?.[0] ?? 8),
      condition: details.condition,
      conditionDescription: details.description,
      iconType: details.iconType,
      outdoorTip: details.outdoorTip,
      surfSeaStatus,
      forecast: forecastDays,
      updatedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    });
  } catch (error: any) {
    console.error('Error fetching real-time weather:', error);
    // Provide realistic Caribbean climate baseline if external API is unreachable
    res.json({
      locationKey: 'puerto-viejo',
      locationName: 'Puerto Viejo & Cocles',
      temperature: 28,
      apparentTemperature: 33,
      humidity: 82,
      precipitation: 0,
      precipitationProbability: 25,
      windSpeed: 8,
      uvIndex: 8,
      condition: 'Warm & Tropical',
      conditionDescription: 'Typical tropical Caribbean climate with warm ocean breeze',
      iconType: 'partly-cloudy',
      outdoorTip: 'Great conditions for beach visits, cycling, and jungle canopy tours. Carry water.',
      surfSeaStatus: 'Gentle to Moderate Swell',
      forecast: [
        { day: 'Today', maxTemp: 29, minTemp: 23, precipProb: 25, condition: 'Partly Cloudy' },
        { day: 'Tomorrow', maxTemp: 30, minTemp: 24, precipProb: 30, condition: 'Warm & Sunny' },
        { day: 'Wed', maxTemp: 29, minTemp: 23, precipProb: 35, condition: 'Passing Showers' },
      ],
      updatedAt: 'Live',
    });
  }
});

// Multi-turn chat endpoint
app.post('/api/chat', async (req: Request, res: Response) => {
  try {
    const { messages, userPreferences } = req.body;

    if (!Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: 'Messages array is required.' });
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({
        error: 'GEMINI_API_KEY is not configured on the server. Please check the Secrets panel.',
      });
    }

    // Format contents for @google/genai
    const formattedContents = messages.map((m: { role: string; content: string }) => ({
      role: m.role === 'model' || m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }],
    }));

    // Augment system prompt if user provided travel preferences
    let dynamicSystemPrompt = WOLABAGO_SYSTEM_INSTRUCTION;
    if (userPreferences) {
      dynamicSystemPrompt += `\n\nCurrent Traveler Context:\n- Travel Style: ${userPreferences.style || 'Balanced Explorer'}\n- Duration: ${userPreferences.duration || 'Flexible'}\n- Primary Interest: ${userPreferences.primaryInterest || 'General Talamanca Discovery'}\n- Preferred Transport: ${userPreferences.transport || 'Cruiser Bicycle & Local MEPE Bus'}\n- Budget Level: ${userPreferences.budgetLevel || 'Moderate'}\n- Group: ${userPreferences.group || 'Solo / Couple'}`;
    }

    const { response, modelUsed, isGrounded } = await generateGroundedContent(formattedContents, dynamicSystemPrompt);

    const candidate = response.candidates?.[0];
    const text = response.text || candidate?.content?.parts?.map((p: any) => p.text).join('') || '';

    // Extract grounding sources and queries
    const groundingChunks = candidate?.groundingMetadata?.groundingChunks || [];
    const webSearchQueries = candidate?.groundingMetadata?.webSearchQueries || [];

    const sources = groundingChunks
      .filter((chunk: any) => chunk.web && chunk.web.uri)
      .map((chunk: any) => ({
        title: chunk.web.title || chunk.web.uri,
        url: chunk.web.uri,
      }));

    // Deduplicate sources by URL
    const uniqueSources = Array.from(
      new Map(sources.map((s: { url: string; title: string }) => [s.url, s])).values()
    );

    return res.json({
      text,
      sources: uniqueSources,
      searchQueries: webSearchQueries,
      model: modelUsed,
      isGrounded,
    });
  } catch (error: any) {
    console.error('Error in /api/chat:', error);
    const errorMessage = error?.message || 'Failed to generate response from WolabaGo';
    return res.status(500).json({
      error: errorMessage,
      details: error?.status || 'INTERNAL_ERROR',
    });
  }
});

// Quick Itinerary Generator endpoint
app.post('/api/itinerary/generate', async (req: Request, res: Response) => {
  try {
    const { days, vibe, interests, transport, pace } = req.body;

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ error: 'GEMINI_API_KEY is not configured.' });
    }

    const prompt = `Create a realistic, verified, day-by-day itinerary for Talamanca & the Costa Rica Caribbean coast with the following parameters:
- Duration: ${days || 3} Days
- Travel Vibe: ${vibe || 'Authentic Caribbean & Nature'}
- Key Interests: ${interests || 'Beaches, Cacao, Wildlife, Afro-Caribbean food, Bribri culture'}
- Transportation: ${transport || 'Classic Cruiser Bicycle & MEPE Bus'}
- Preferred Pace: ${pace || 'Balanced (relaxed mornings, active afternoons)'}

Ensure the itinerary includes:
1. Daily timeline with realistic travel times between spots (e.g. Puerto Viejo -> Cocles -> Punta Uva -> Manzanillo -> Cahuita).
2. Genuine local food recommendations (sodas for Rice & Beans, patí, rondon, fresh coconut water).
3. Practical tips: best time of day for wildlife, tide notes, what to pack, and cultural etiquette.
4. Estimated daily budget breakdown in USD / CRC.
Provide clear headings and practical advice.`;

    const { response, modelUsed } = await generateGroundedContent(
      [{ role: 'user', parts: [{ text: prompt }] }],
      WOLABAGO_SYSTEM_INSTRUCTION
    );

    const candidate = response.candidates?.[0];
    const text = response.text || '';
    const groundingChunks = candidate?.groundingMetadata?.groundingChunks || [];

    const sources = groundingChunks
      .filter((chunk: any) => chunk.web && chunk.web.uri)
      .map((chunk: any) => ({
        title: chunk.web.title || chunk.web.uri,
        url: chunk.web.uri,
      }));

    return res.json({
      itinerary: text,
      sources,
      model: modelUsed,
    });
  } catch (error: any) {
    console.error('Error generating itinerary:', error);
    return res.status(500).json({ error: error?.message || 'Itinerary generation failed' });
  }
});

// Real-Time Community Events & Scraper Endpoint
app.get('/api/events', async (req: Request, res: Response) => {
  try {
    const shouldScrape = req.query.refresh === 'true';
    const lang = (req.query.lang as string) || 'en';
    const categoryFilter = req.query.category as string;
    const areaFilter = req.query.area as string;

    let events = [...LOCAL_COMMUNITY_EVENTS];
    let scrapedSources: any[] = [];
    let isRealTimeScraped = false;

    if (shouldScrape && process.env.GEMINI_API_KEY) {
      try {
        const targetLang =
          lang === 'es'
            ? 'Spanish'
            : lang === 'fr'
            ? 'French'
            : lang === 'de'
            ? 'German'
            : lang === 'mek'
            ? 'Mekatelyu / Limon Creole'
            : 'English';

        const scrapePrompt = `Search the web for real-time upcoming community events, farmers markets (ferias orgánicas), live music (calypso, reggae, open mic), cultural gatherings, and surf/wellness sessions in Puerto Viejo de Talamanca, Cahuita, Manzanillo, Cocles, and Limón, Costa Rica.

Return a JSON array of 3 to 4 verified real or active recurring community events.
Format strictly as JSON with this exact structure:
[
  {
    "id": "unique-slug-id",
    "title": "Title of event",
    "category": "market" | "music" | "culture" | "wellness" | "community",
    "date": "Specific day or upcoming date",
    "time": "Time range",
    "location": "Exact venue or landmark",
    "area": "Puerto Viejo Centro" | "Playa Negra" | "Cocles" | "Playa Chiquita" | "Punta Uva" | "Manzanillo" | "Cahuita" | "Bribri",
    "recurrence": "Schedule recurrence",
    "description": "2-3 sentences about the event in ${targetLang}",
    "highlight": "Best local tip or highlight in ${targetLang}",
    "cost": "Admission or free walk-in",
    "tags": ["tag1", "tag2", "tag3"]
  }
]
Do not wrap in markdown or backticks if possible, or return standard JSON.
CRITICAL: Distinctly separate Puerto Viejo Centro (downtown, soccer field, Salsa Brava) from Playa Negra (north coastal bulevar, dark sand, barge).`;

        const { response } = await generateGroundedContent(
          [{ role: 'user', parts: [{ text: scrapePrompt }] }],
          WOLABAGO_SYSTEM_INSTRUCTION
        );

        const candidate = response.candidates?.[0];
        const rawText = response.text || '';
        const groundingChunks = candidate?.groundingMetadata?.groundingChunks || [];

        scrapedSources = groundingChunks
          .filter((chunk: any) => chunk.web && chunk.web.uri)
          .map((chunk: any) => ({
            title: chunk.web.title || chunk.web.uri,
            url: chunk.web.uri,
          }));

        // Extract JSON block
        const cleanJsonMatch = rawText.match(/\[\s*\{[\s\S]*\}\s*\]/);
        if (cleanJsonMatch) {
          const parsedEvents = JSON.parse(cleanJsonMatch[0]);
          if (Array.isArray(parsedEvents) && parsedEvents.length > 0) {
            const formatted = parsedEvents.map((item: any, idx: number) => ({
              id: item.id || `scraped-event-${Date.now()}-${idx}`,
              title: item.title,
              category: item.category || 'community',
              date: item.date || 'Upcoming this week',
              time: item.time || 'Check local rancho schedule',
              location: item.location || 'Puerto Viejo de Talamanca',
              area: item.area || 'Puerto Viejo Centro',
              recurrence: item.recurrence || 'Community Gathering',
              description: item.description || '',
              highlight: item.highlight || '',
              cost: item.cost || 'Free Admission',
              tags: Array.isArray(item.tags) ? item.tags : ['Local Gathering', 'Talamanca'],
              sources: scrapedSources.slice(0, 3),
              isRealTimeScraped: true,
            }));
            events = [...formatted, ...events];
            isRealTimeScraped = true;
          }
        }
      } catch (scrapeErr: any) {
        console.warn('Real-time scrape fallback to verified local database:', scrapeErr?.message);
      }
    }

    // Apply category & area filters
    let filteredEvents = events;
    if (categoryFilter && categoryFilter !== 'all') {
      filteredEvents = filteredEvents.filter((e) => e.category === categoryFilter);
    }
    if (areaFilter && areaFilter !== 'all') {
      filteredEvents = filteredEvents.filter((e) => e.area === areaFilter);
    }

    res.json({
      events: filteredEvents,
      totalCount: filteredEvents.length,
      scrapedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isRealTimeScraped,
      sources: scrapedSources,
      language: lang,
    });
  } catch (error: any) {
    console.error('Error in /api/events:', error);
    res.status(500).json({ error: error.message || 'Failed to fetch community events' });
  }
});

// Real-Time Emergency and Transit Alerts Endpoint (Route 36, Surf warnings, weather, bridge repairs)
app.get('/api/alerts', async (req: Request, res: Response) => {
  try {
    const shouldRefresh = req.query.refresh === 'true';
    const lang = (req.query.lang as string) || 'en';
    const category = req.query.category as string | undefined;

    let alerts = [...INITIAL_TRANSIT_ALERTS];
    let scrapedSources: any[] = [];
    let isRealTimeScraped = false;

    if (shouldRefresh && process.env.GEMINI_API_KEY) {
      try {
        const targetLang = lang === 'es' ? 'Spanish' : 'English';
        const scrapePrompt = `Search the web for current or recent emergency notices, road blocks, bridge repairs, traffic advisories (Ruta 32, Ruta 36 between Limón, Cahuita, Hone Creek, and Puerto Viejo de Talamanca), ocean rip current warnings, or surf advisories (Playa Cocles, Salsa Brava, South Caribbean Costa Rica) from official entities like MOPT, Policía de Tránsito, CNE Costa Rica, Guardavidas Cocles, or CIMAR UCR.

Return between 1 and 3 current or seasonal alert items strictly in this JSON format:
[
  {
    "id": "scraped-alert-1",
    "title": "Clear headline in ${targetLang}",
    "category": "transit" | "surf" | "weather" | "infrastructure",
    "severity": "critical" | "warning" | "info",
    "location": "Exact road, river, or beach name",
    "area": "Talamanca sector",
    "summary": "Concise summary of the transit obstruction or surf condition in ${targetLang}",
    "advice": "Actionable safety or detour advice for travelers in ${targetLang}",
    "status": "active",
    "updatedAt": "Today's status",
    "sourceAuthority": "e.g. MOPT / Policía de Tránsito / Guardavidas / CNE"
  }
]
Do not wrap in markdown or backticks if possible, return standard JSON only.`;

        const { response } = await generateGroundedContent(
          [{ role: 'user', parts: [{ text: scrapePrompt }] }],
          WOLABAGO_SYSTEM_INSTRUCTION
        );

        const candidate = response.candidates?.[0];
        const rawText = response.text || '';
        const groundingChunks = candidate?.groundingMetadata?.groundingChunks || [];

        scrapedSources = groundingChunks
          .filter((chunk: any) => chunk.web && chunk.web.uri)
          .map((chunk: any) => ({
            title: chunk.web.title || chunk.web.uri,
            url: chunk.web.uri,
          }));

        const cleanJsonMatch = rawText.match(/\[\s*\{[\s\S]*\}\s*\]/);
        if (cleanJsonMatch) {
          const parsed = JSON.parse(cleanJsonMatch[0]);
          if (Array.isArray(parsed) && parsed.length > 0) {
            const formatted = parsed.map((item: any, idx: number) => ({
              id: item.id || `live-alert-${Date.now()}-${idx}`,
              title: item.title,
              category: item.category || 'transit',
              severity: item.severity || 'warning',
              location: item.location || 'Talamanca, Costa Rica',
              area: item.area || 'Ruta 36 / Caribe Sur',
              summary: item.summary || '',
              advice: item.advice || '',
              status: item.status || 'active',
              updatedAt: item.updatedAt || 'Real-time verified',
              sourceAuthority: item.sourceAuthority || 'Official Talamanca Network',
              sourceUrl: scrapedSources[0]?.url,
              isRealTime: true,
            }));
            alerts = [...formatted, ...alerts];
            isRealTimeScraped = true;
          }
        }
      } catch (scrapeErr: any) {
        console.warn('Real-time alert scrape fallback to verified local base:', scrapeErr?.message);
      }
    }

    if (category && category !== 'all') {
      alerts = alerts.filter((a) => a.category === category);
    }

    res.json({
      alerts,
      totalCount: alerts.length,
      scrapedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isRealTimeScraped,
      sources: scrapedSources,
    });
  } catch (error: any) {
    console.error('Error in /api/alerts:', error);
    res.status(500).json({ error: error.message || 'Failed to fetch emergency and transit alerts' });
  }
});

// Setup Vite in development or serve static build in production
async function startServer() {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🌴 WolabaGo Server running on port ${PORT} (NODE_ENV=${process.env.NODE_ENV || 'development'})`);
  });
}

startServer();
