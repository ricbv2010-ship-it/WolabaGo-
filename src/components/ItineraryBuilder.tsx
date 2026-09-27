import React, { useState } from 'react';
import { 
  CalendarDays, 
  Sparkles, 
  Bike, 
  Compass, 
  Clock, 
  MapPin, 
  Check, 
  Copy, 
  MessageSquare, 
  Volume2, 
  VolumeX, 
  ExternalLink
} from 'lucide-react';
import { GroundingSource, AppLanguage } from '../types';
import { PackingChecklist } from './PackingChecklist';
import { TRANSLATIONS } from '../i18n/languages';

interface ItineraryBuilderProps {
  onSendToChat: (itineraryText: string) => void;
  currentLanguage?: AppLanguage;
}

export const ItineraryBuilder: React.FC<ItineraryBuilderProps> = ({ 
  onSendToChat,
  currentLanguage = 'en'
}) => {
  const t = TRANSLATIONS[currentLanguage] || TRANSLATIONS.en;
  const [days, setDays] = useState<number>(3);
  const [vibe, setVibe] = useState<string>('Authentic Culture & Wildlife Highlights');
  const [transport, setTransport] = useState<string>('Classic Cruiser Bicycle & MEPE Bus');
  const [pace, setPace] = useState<string>('Balanced (morning activity, afternoon beach rest)');
  const [interests, setInterests] = useState<string>('Rice & Beans sodas, Cahuita NP sloths, Punta Uva kayaking, Bribri cacao tour, live calypso');
  
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [generatedItinerary, setGeneratedItinerary] = useState<string | null>(null);
  const [sources, setSources] = useState<GroundingSource[]>([]);
  const [copied, setCopied] = useState<boolean>(false);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);

  const handleGenerate = async () => {
    setIsLoading(true);
    setGeneratedItinerary(null);
    setSources([]);

    try {
      const response = await fetch('/api/itinerary/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          days,
          vibe,
          interests,
          transport,
          pace,
          language: currentLanguage,
        }),
      });

      const data = await response.json();
      if (data.itinerary) {
        setGeneratedItinerary(data.itinerary);
        setSources(data.sources || []);
      } else if (data.error) {
        setGeneratedItinerary(`Error generating itinerary: ${data.error}`);
      }
    } catch (err: any) {
      setGeneratedItinerary(`Failed to generate itinerary: ${err?.message || 'Network error'}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    if (!generatedItinerary) return;
    navigator.clipboard.writeText(generatedItinerary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSpeak = () => {
    if (!generatedItinerary || !('speechSynthesis' in window)) return;

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    window.speechSynthesis.cancel();
    const cleanText = generatedItinerary
      .replace(/[*#_`>]/g, '')
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  const vibes = [
    'Authentic Culture & Wildlife Highlights',
    'Beach, Surf & Turquoise Bays',
    'Bribri Indigenous Ancestry & Cacao',
    'Slow Living, Wellness & Jungle Nature',
    'Budget Backpacker & Local Sodas',
  ];

  const transports = [
    'Classic Cruiser Bicycle & MEPE Bus',
    'Cruiser Bicycle Only (Coastal Strip PV to Manzanillo)',
    'Rental 4x4 / Car',
    'Tuk-Tuk & Local Taxis',
  ];

  const paces = [
    'Slow & Mindful (deep time at single beaches)',
    'Balanced (morning activity, afternoon beach rest)',
    'High Energy (maximize daily highlights & hikes)',
  ];

  return (
    <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-6 max-w-6xl mx-auto w-full space-y-6">
      
      {/* Intro Hero */}
      <div className="bg-gradient-to-r from-[#07172f] via-[#0b2146] to-[#0e2a56] border border-[#1b3f73] rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10">
          <div className="flex items-center gap-2 text-[#CE1126] text-xs font-bold uppercase tracking-wider mb-1">
            <CalendarDays className="w-4 h-4 text-[#ef4444]" />
            <span className="text-blue-200">WolabaGo Planner</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-['Outfit']">
            {t.itinTitle}
          </h2>
          <p className="text-sm text-blue-100/90 mt-1 max-w-2xl leading-relaxed">
            {t.itinSubtitle}
          </p>
        </div>
      </div>

      {/* Configuration Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-[#0a1e3d] border border-[#1b3f73] rounded-2xl p-6 shadow-lg">
        
        {/* Left Column */}
        <div className="space-y-5">
          {/* Days Selector */}
          <div>
            <label className="text-xs font-bold text-white uppercase tracking-wider block mb-2 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#ef4444]" />
              {t.itinDays}: {days} {currentLanguage === 'es' ? (days === 1 ? 'Día' : 'Días') : (days === 1 ? 'Day' : 'Days')}
            </label>
            <div className="flex gap-2">
              {[1, 2, 3, 5, 7].map((d) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => setDays(d)}
                  className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
                    days === d
                      ? 'bg-[#CE1126] text-white shadow-md shadow-red-950/60'
                      : 'bg-[#07172f] border border-[#1b3f73] text-blue-200 hover:bg-[#122e58] hover:text-white'
                  }`}
                >
                  {d} {d === 1 ? 'Day' : 'Days'}
                </button>
              ))}
            </div>
          </div>

          {/* Vibe Selection */}
          <div>
            <label className="text-xs font-bold text-white uppercase tracking-wider block mb-2 flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-[#ef4444]" />
              {t.itinVibe}
            </label>
            <div className="space-y-1.5">
              {vibes.map((v) => (
                <button
                  key={v}
                  type="button"
                  onClick={() => setVibe(v)}
                  className={`w-full text-left p-2.5 rounded-xl text-xs transition-all border ${
                    vibe === v
                      ? 'bg-[#CE1126] border-[#CE1126] text-white font-bold shadow-md shadow-red-950/60'
                      : 'bg-[#07172f] border border-[#1b3f73] text-blue-200 hover:border-blue-400 hover:text-white'
                  }`}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-5">
          {/* Transport Mode */}
          <div>
            <label className="text-xs font-bold text-white uppercase tracking-wider block mb-2 flex items-center gap-1.5">
              <Bike className="w-3.5 h-3.5 text-[#ef4444]" />
              {t.itinTransport}
            </label>
            <div className="space-y-1.5">
              {transports.map((tr) => (
                <button
                  key={tr}
                  type="button"
                  onClick={() => setTransport(tr)}
                  className={`w-full text-left p-2.5 rounded-xl text-xs transition-all border ${
                    transport === tr
                      ? 'bg-[#CE1126] border-[#CE1126] text-white font-bold shadow-md shadow-red-950/60'
                      : 'bg-[#07172f] border border-[#1b3f73] text-blue-200 hover:border-blue-400 hover:text-white'
                  }`}
                >
                  {tr}
                </button>
              ))}
            </div>
          </div>

          {/* Preferred Pace */}
          <div>
            <label className="text-xs font-bold text-white uppercase tracking-wider block mb-2 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#ef4444]" />
              {t.itinPace}
            </label>
            <div className="space-y-1.5">
              {paces.map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPace(p)}
                  className={`w-full text-left p-2 rounded-xl text-xs transition-all border ${
                    pace === p
                      ? 'bg-[#CE1126] border-[#CE1126] text-white font-bold shadow-md shadow-red-950/60'
                      : 'bg-[#07172f] border border-[#1b3f73] text-blue-200 hover:border-blue-400 hover:text-white'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          {/* Key Interests Input */}
          <div>
            <label className="text-xs font-bold text-white uppercase tracking-wider block mb-1">
              {t.itinInterests}
            </label>
            <input
              type="text"
              value={interests}
              onChange={(e) => setInterests(e.target.value)}
              placeholder={currentLanguage === 'es' ? 'ej. Vegetariano, Salsa Brava surf, Perezosos, Tour de cacao...' : 'e.g. Vegetarian, Salsa Brava surf check, Sloths, Cacao tour...'}
              className="w-full bg-[#07172f] border border-[#1b3f73] rounded-xl px-3 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-blue-400"
            />
          </div>
        </div>

        {/* Generate Trigger */}
        <div className="md:col-span-2 pt-2">
          <button
            onClick={handleGenerate}
            disabled={isLoading}
            className={`w-full py-3.5 px-6 rounded-xl font-bold text-sm shadow-xl flex items-center justify-center gap-2 transition-all cursor-pointer ${
              isLoading
                ? 'bg-[#07172f] text-blue-300 border border-[#1b3f73] cursor-not-allowed'
                : 'bg-[#CE1126] hover:bg-[#e0192e] text-white shadow-red-950/70 hover:scale-[1.01] active:scale-95'
            }`}
          >
            <Sparkles className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            <span>
              {isLoading
                ? t.itinGenerating
                : (currentLanguage === 'es' ? `Generar Itinerario Verificado de ${days} Días` : `Generate Verified ${days}-Day Talamanca Plan`)}
            </span>
          </button>
        </div>
      </div>

      {/* Adaptive Packing & Prep Checklist */}
      <PackingChecklist
        currentInterestsText={interests}
        currentVibe={vibe}
        onAskWolabaGoAboutPacking={onSendToChat}
      />

      {/* Generated Itinerary Display */}
      {generatedItinerary && (
        <div className="bg-[#0a1e3d] border border-[#1b3f73] rounded-2xl p-6 shadow-xl space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#1b3f73] gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#ef4444]">
                  Verified Plan
                </span>
                <span className="text-blue-500">•</span>
                <span className="text-xs text-blue-200">
                  {days} Days • {transport.split(' ')[0]}
                </span>
              </div>
              <h3 className="text-xl font-bold text-white font-['Outfit'] mt-0.5">
                {currentLanguage === 'es' ? 'Tu Itinerario Personalizado en Talamanca' : 'Your Custom Talamanca Itinerary'}
              </h3>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={handleCopy}
                className="px-3 py-1.5 rounded-xl bg-[#07172f] hover:bg-[#122e58] border border-[#1b3f73] text-xs text-blue-200 hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-white" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? t.itinCopied : t.itinCopy}</span>
              </button>

              {'speechSynthesis' in window && (
                <button
                  onClick={handleSpeak}
                  className="px-3 py-1.5 rounded-xl bg-[#07172f] hover:bg-[#122e58] border border-[#1b3f73] text-xs text-blue-200 hover:text-white flex items-center gap-1.5 transition-colors"
                >
                  {isSpeaking ? (
                    <VolumeX className="w-3.5 h-3.5 text-[#ef4444] animate-pulse" />
                  ) : (
                    <Volume2 className="w-3.5 h-3.5" />
                  )}
                  <span>{isSpeaking ? t.chatStop : t.chatListen}</span>
                </button>
              )}

              <button
                onClick={() => onSendToChat(generatedItinerary)}
                className="px-3.5 py-1.5 rounded-xl bg-[#CE1126] hover:bg-[#e0192e] text-white font-semibold text-xs flex items-center gap-1.5 transition-colors shadow-md shadow-red-950/70"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>{t.itinSendToChat}</span>
              </button>
            </div>
          </div>

          {/* Text Content */}
          <div className="prose prose-invert max-w-none text-slate-200 text-xs sm:text-sm whitespace-pre-wrap leading-relaxed space-y-2">
            {generatedItinerary}
          </div>

          {/* Grounding Sources */}
          {sources.length > 0 && (
            <div className="mt-4 pt-4 border-t border-[#1b3f73]">
              <span className="text-[11px] font-semibold text-blue-300 block mb-2">
                Verified Grounding Sources:
              </span>
              <div className="flex flex-wrap gap-2">
                {sources.map((s, idx) => (
                  <a
                    key={idx}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#07172f] text-[11px] text-blue-200 hover:text-white border border-[#1b3f73]"
                  >
                    <span className="truncate max-w-[200px]">{s.title}</span>
                    <ExternalLink className="w-3 h-3 text-blue-400" />
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
