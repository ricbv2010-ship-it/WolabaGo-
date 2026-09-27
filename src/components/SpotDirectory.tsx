import React, { useState } from 'react';
import { 
  MapPin, 
  Bike, 
  Waves, 
  Utensils, 
  Sparkles, 
  Compass, 
  Search, 
  ShieldCheck, 
  AlertTriangle,
  ArrowRight,
  ExternalLink
} from 'lucide-react';
import { COASTAL_SPOTS } from '../data/localKnowledge';
import { CoastalSpot } from '../types';
import { WolabaBrand } from './WolabaBrand';

interface SpotDirectoryProps {
  onAskAboutSpot: (prompt: string) => void;
  onNavigateToMaps?: () => void;
}

export const SpotDirectory: React.FC<SpotDirectoryProps> = ({ onAskAboutSpot, onNavigateToMaps }) => {
  const [selectedZone, setSelectedZone] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const zones = ['all', 'Puerto Viejo', 'Playa Negra', 'Cocles', 'Playa Chiquita', 'Punta Uva', 'Manzanillo', 'Cahuita', 'Bribri'];

  const filteredSpots = COASTAL_SPOTS.filter((spot) => {
    const matchesZone = selectedZone === 'all' || spot.zone === selectedZone;
    const matchesSearch =
      spot.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      spot.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      spot.highlights.some(h => h.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesZone && matchesSearch;
  });

  const getSafetyBadge = (safety: CoastalSpot['swimmingSafety']) => {
    switch (safety) {
      case 'Gentle & Calm':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-blue-950/80 text-blue-200 border border-blue-700/60">
            <ShieldCheck className="w-3 h-3 text-blue-300" />
            Gentle & Calm Swimming
          </span>
        );
      case 'Moderate / Watch Tides':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#CE1126]/20 text-red-200 border border-[#CE1126]/50">
            <AlertTriangle className="w-3 h-3 text-[#ef4444]" />
            Moderate / Check Tides
          </span>
        );
      case 'Expert Only / Strong Currents':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#CE1126]/40 text-white border border-[#CE1126]">
            <AlertTriangle className="w-3 h-3 text-white" />
            Expert Surf / Heavy Reef
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-6 max-w-7xl mx-auto w-full space-y-6">
      {/* Intro Header */}
      <div className="bg-gradient-to-r from-[#07172f] via-[#0b2146] to-[#0e2a56] border border-[#1b3f73] rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 text-[#CE1126] text-xs font-bold uppercase tracking-wider mb-1">
              <Compass className="w-4 h-4 text-[#ef4444]" />
              <span className="text-blue-200">Talamanca Coastal Highway (Route 256)</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-['Outfit']">
              Coastal Spots & Village Directory
            </h2>
            <p className="text-sm text-blue-100/90 mt-1 max-w-2xl leading-relaxed">
              Explore the Caribbean coastal strip stretching from Cahuita in the north down through Puerto Viejo to Manzanillo and inland to Bribri territory. Always factor bike ride times and ocean conditions into your plans.
            </p>
          </div>

          {/* Quick Route 256 Distance Gauge */}
          <div className="bg-[#07172f]/90 border border-[#1b3f73] rounded-xl p-3.5 text-xs text-blue-200 shrink-0 space-y-1 shadow-md">
            <div className="font-semibold text-white flex items-center gap-1.5">
              <Bike className="w-3.5 h-3.5 text-blue-300" />
              Cruiser Bike Reality Check:
            </div>
            <p className="text-[11px] text-blue-200/90">
              Playa Negra (Bulevar) ➔ Puerto Viejo Centro: ~6 min
            </p>
            <p className="text-[11px] text-blue-200/90">
              Puerto Viejo Centro ➔ Cocles: ~12 min
            </p>
            <p className="text-[11px] text-blue-200/90">
              Puerto Viejo Centro ➔ Punta Uva: ~35 min
            </p>
            <p className="text-[11px] text-blue-200/90">
              Puerto Viejo Centro ➔ Manzanillo: ~55 min
            </p>
            {onNavigateToMaps && (
              <button
                onClick={onNavigateToMaps}
                className="w-full mt-2 py-1.5 px-3 rounded-lg bg-[#CE1126] hover:bg-[#e0192e] text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-md"
                title="Download simplified static maps of Talamanca for offline reference"
              >
                <Compass className="w-3.5 h-3.5" />
                <span>Offline Static Maps & Guides</span>
              </button>
            )}
          </div>
        </div>

        {/* Filters */}
        <div className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 relative z-10">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-blue-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search spots, food, surf, sloths, or reef..."
              className="w-full bg-[#07172f]/90 border border-[#1b3f73] rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-blue-400"
            />
          </div>

          <div className="flex items-center gap-1 overflow-x-auto pb-1 scrollbar-none">
            {zones.map((zone) => (
              <button
                key={zone}
                onClick={() => setSelectedZone(zone)}
                className={`px-3 py-1.5 rounded-lg text-xs transition-all whitespace-nowrap ${
                  selectedZone === zone
                    ? 'bg-[#CE1126] text-white font-bold shadow-md shadow-red-950/60'
                    : 'bg-[#0a1e3d] text-blue-200 hover:bg-[#122e58] hover:text-white border border-[#1b3f73]'
                }`}
              >
                {zone === 'all' ? 'All Zones' : zone}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Spots Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredSpots.map((spot) => (
          <div
            key={spot.id}
            className="bg-[#0a1e3d] border border-[#1b3f73] rounded-2xl p-5 shadow-lg flex flex-col justify-between hover:border-[#CE1126]/60 transition-all group"
          >
            <div>
              {/* Header & Badges */}
              <div className="flex items-start justify-between gap-2 mb-3">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#ef4444]">
                    {spot.zone}
                  </span>
                  <h3 className="text-lg font-bold text-white group-hover:text-blue-200 transition-colors font-['Outfit']">
                    {spot.name}
                  </h3>
                </div>
                {spot.coordinates ? (
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${spot.coordinates.lat},${spot.coordinates.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={`Abrir ubicación GPS en Google Maps (${spot.coordinates.lat}, ${spot.coordinates.lng})`}
                    className="p-2 rounded-xl bg-[#07172f] hover:bg-[#122e58] border border-[#1b3f73] hover:border-[#CE1126] text-blue-300 transition-colors flex items-center gap-1 group/pin shadow-sm"
                  >
                    <MapPin className="w-4 h-4 text-[#ef4444]" />
                    <ExternalLink className="w-3 h-3 text-blue-300 group-hover/pin:text-white" />
                  </a>
                ) : (
                  <div className="p-2 rounded-xl bg-[#07172f] border border-[#1b3f73] text-blue-300">
                    <MapPin className="w-4 h-4 text-[#ef4444]" />
                  </div>
                )}
              </div>

              {/* Distance & Travel Metrics */}
              <div className="flex items-center gap-3 text-xs text-blue-200/90 mb-3 bg-[#07172f]/80 p-2 rounded-xl border border-[#1b3f73]">
                <div className="flex items-center gap-1">
                  <Compass className="w-3.5 h-3.5 text-blue-300" />
                  <span>{spot.distanceFromPV}</span>
                </div>
                <span className="text-blue-500">•</span>
                <div className="flex items-center gap-1">
                  <Bike className="w-3.5 h-3.5 text-blue-300" />
                  <span>{spot.bikeTime}</span>
                </div>
              </div>

              {/* Tagline */}
              <p className="text-xs text-blue-100/80 leading-relaxed mb-4">
                {spot.tagline}
              </p>

              {/* Swimming safety */}
              <div className="mb-4">
                {getSafetyBadge(spot.swimmingSafety)}
              </div>

              {/* Highlights */}
              <div className="space-y-1.5 mb-4">
                <span className="text-[11px] font-semibold text-blue-300 uppercase tracking-wide">
                  Top Highlights:
                </span>
                {spot.highlights.map((h, i) => (
                  <div key={i} className="flex items-start gap-1.5 text-xs text-slate-200">
                    <span className="text-[#CE1126] font-bold mt-0.5">•</span>
                    <span>{h}</span>
                  </div>
                ))}
              </div>

              {/* Must-Try Food */}
              <div className="p-2.5 rounded-xl bg-[#07172f]/90 border border-[#1b3f73] text-xs mb-4">
                <div className="flex items-center gap-1.5 font-semibold text-[#ef4444] mb-1">
                  <Utensils className="w-3.5 h-3.5" />
                  <span>Must-Try Local Bite:</span>
                </div>
                <p className="text-white text-xs">{spot.mustTryFood}</p>
              </div>
            </div>

            {/* Action button with WolabaBrand (green, yellow, red only in the name) */}
            <button
              onClick={() => onAskAboutSpot(spot.suggestedPrompt)}
              className="w-full mt-2 py-2 px-3 rounded-xl bg-[#07172f] hover:bg-[#102b54] border border-[#1b3f73] hover:border-[#CE1126]/60 text-xs font-semibold text-white flex items-center justify-center gap-2 transition-all shadow-sm group/btn"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#ef4444]" />
              <span>Ask <WolabaBrand size="xs" /> about {spot.name.split(' ')[0]}</span>
              <ArrowRight className="w-3.5 h-3.5 text-blue-300 group-hover/btn:translate-x-1 transition-transform" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
