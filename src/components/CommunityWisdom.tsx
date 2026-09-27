import React, { useState } from 'react';
import { 
  Sparkles, 
  Compass, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  ArrowRight, 
  Calendar, 
  Search, 
  ExternalLink, 
  UserCheck, 
  Footprints, 
  Apple, 
  Waves, 
  UtensilsCrossed, 
  HeartHandshake,
  Info
} from 'lucide-react';
import { WisdomTip, WisdomCategory } from '../types';
import { TALAMANCA_COMMUNITY_WISDOM } from '../data/communityWisdomData';
import { WolabaBrand } from './WolabaBrand';

interface CommunityWisdomProps {
  onAskInChat: (prompt: string) => void;
}

export const CommunityWisdom: React.FC<CommunityWisdomProps> = ({ onAskInChat }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showHarvestCalendar, setShowHarvestCalendar] = useState<boolean>(false);

  const categories: { id: string; label: string; icon: React.ReactNode }[] = [
    { id: 'all', label: 'All Wisdom', icon: <Sparkles className="w-3.5 h-3.5" /> },
    { id: 'hidden-trails', label: 'Hidden Trails', icon: <Footprints className="w-3.5 h-3.5 text-emerald-400" /> },
    { id: 'fruit-seasons', label: 'Fruit Seasons', icon: <Apple className="w-3.5 h-3.5 text-amber-400" /> },
    { id: 'swimming-spots', label: 'Secret Dipping', icon: <Waves className="w-3.5 h-3.5 text-cyan-400" /> },
    { id: 'food-secrets', label: 'Food Secrets', icon: <UtensilsCrossed className="w-3.5 h-3.5 text-orange-400" /> },
    { id: 'wildlife-respect', label: 'Wildlife Respect', icon: <HeartHandshake className="w-3.5 h-3.5 text-rose-400" /> },
  ];

  const filteredTips = TALAMANCA_COMMUNITY_WISDOM.filter((item) => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tip.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.guideName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.bestTimingOrSeason.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getCategoryBadge = (category: WisdomCategory) => {
    switch (category) {
      case 'hidden-trails':
        return {
          bg: 'bg-emerald-950/40 text-emerald-300 border-emerald-800/50',
          label: 'Hidden Trail',
          icon: <Footprints className="w-3 h-3" />
        };
      case 'fruit-seasons':
        return {
          bg: 'bg-amber-950/40 text-amber-300 border-amber-800/50',
          label: 'Fruit Season',
          icon: <Apple className="w-3 h-3" />
        };
      case 'swimming-spots':
        return {
          bg: 'bg-cyan-950/40 text-cyan-300 border-cyan-800/50',
          label: 'Secret Dipping',
          icon: <Waves className="w-3 h-3" />
        };
      case 'food-secrets':
        return {
          bg: 'bg-orange-950/40 text-orange-300 border-orange-800/50',
          label: 'Food Tradition',
          icon: <UtensilsCrossed className="w-3 h-3" />
        };
      case 'wildlife-respect':
      default:
        return {
          bg: 'bg-rose-950/40 text-rose-300 border-rose-800/50',
          label: 'Wildlife Lore',
          icon: <HeartHandshake className="w-3 h-3" />
        };
    }
  };

  return (
    <div className="bg-[#081a36] border border-[#1b3f73] rounded-2xl p-5 md:p-6 shadow-xl space-y-6">
      
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#183969]">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-[#CE1126]/20 border border-[#CE1126]/60 text-white">
              <UserCheck className="w-4 h-4 text-[#ef4444]" />
            </div>
            <div>
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#ef4444] block">
                Local Guide Network • Verified Talamanca Knowledge
              </span>
              <h3 className="text-xl font-bold text-white font-['Outfit']">
                Community Wisdom
              </h3>
            </div>
          </div>
          <p className="text-xs text-blue-200/90 leading-relaxed max-w-2xl">
            Short, verified tips directly from Bribri elders, boatmen, certified ocean lifeguards, and generational bakers. Uncovering unmapped paths, tropical fruit ripening cycles, and respectful forest etiquette.
          </p>
        </div>

        {/* Harvest Calendar Quick Toggle */}
        <button
          onClick={() => setShowHarvestCalendar(!showHarvestCalendar)}
          className="px-3.5 py-2 rounded-xl bg-[#0d2750] hover:bg-[#153a73] border border-[#1f4b8a] text-xs font-semibold text-white flex items-center gap-2 transition-colors cursor-pointer shrink-0 shadow-sm"
        >
          <Calendar className="w-3.5 h-3.5 text-amber-400" />
          <span>{showHarvestCalendar ? 'Hide Fruit Seasons Guide' : 'Fruit Harvest Cheat Sheet'}</span>
        </button>
      </div>

      {/* Seasonal Harvest Calendar Drawer */}
      {showHarvestCalendar && (
        <div className="p-4 rounded-xl bg-[#051326] border border-[#1c437a] space-y-3 animate-fadeIn">
          <div className="flex items-center justify-between border-b border-[#163866] pb-2">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5 font-['Outfit']">
              <span>🥭</span>
              <span>Talamanca Seasonal Fruit & Harvest Cheat Sheet</span>
            </h4>
            <span className="text-[11px] text-blue-300">Buy fresh from local farm stands</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 text-xs">
            <div className="p-2.5 rounded-lg bg-[#081b37] border border-[#193d6d]">
              <div className="font-bold text-amber-300 flex items-center justify-between">
                <span>Mamón Chino (Rambutan)</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-950/60 text-amber-200">Aug – Oct</span>
              </div>
              <p className="text-[11px] text-slate-300 mt-1 leading-snug">
                Sweet spiky red & yellow clusters sold along Ruta 36 between Penshurst and Hone Creek. Ask for "injertado".
              </p>
            </div>

            <div className="p-2.5 rounded-lg bg-[#081b37] border border-[#193d6d]">
              <div className="font-bold text-yellow-300 flex items-center justify-between">
                <span>Tsirö (Raw Cacao Fruit)</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-yellow-950/60 text-yellow-200">Sep – Dec</span>
              </div>
              <p className="text-[11px] text-slate-300 mt-1 leading-snug">
                Suck the sweet, tangy lychee-flavored pulp off the freshly cracked cacao bean in Watsi, Bribri, and Cocles.
              </p>
            </div>

            <div className="p-2.5 rounded-lg bg-[#081b37] border border-[#193d6d]">
              <div className="font-bold text-emerald-300 flex items-center justify-between">
                <span>Fruta de Pan (Breadfruit)</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-950/60 text-emerald-200">Jun–Aug & Jan</span>
              </div>
              <p className="text-[11px] text-slate-300 mt-1 leading-snug">
                Roasted whole on hot charcoal embers or sliced into crispy salted chips at Saturday farmer markets.
              </p>
            </div>

            <div className="p-2.5 rounded-lg bg-[#081b37] border border-[#193d6d]">
              <div className="font-bold text-cyan-300 flex items-center justify-between">
                <span>Pipa Fría (Coconut Water)</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-cyan-950/60 text-cyan-200">Year-Round</span>
              </div>
              <p className="text-[11px] text-slate-300 mt-1 leading-snug">
                Harvested daily. Drink the cold electrolyte water, then ask the vendor to split the shell for soft "cuchara" jelly.
              </p>
            </div>

            <div className="p-2.5 rounded-lg bg-[#081b37] border border-[#193d6d]">
              <div className="font-bold text-pink-300 flex items-center justify-between">
                <span>Guayaba Agria & Carambola</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-pink-950/60 text-pink-200">Oct – Nov</span>
              </div>
              <p className="text-[11px] text-slate-300 mt-1 leading-snug">
                Sour guava blended with panela makes the ultimate thirst quencher after a long beach bike ride.
              </p>
            </div>

            <div className="p-2.5 rounded-lg bg-[#081b37] border border-[#193d6d]">
              <div className="font-bold text-orange-300 flex items-center justify-between">
                <span>Guanábana (Soursop)</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-orange-950/60 text-orange-200">May – Jul</span>
              </div>
              <p className="text-[11px] text-slate-300 mt-1 leading-snug">
                Creamy, citrus-custard fruit used for fresh natural smoothies (fresco en leche o agua) in Cahuita sodas.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Category Pills & Search Bar */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-blue-300 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search guide wisdom (e.g. breadfruit, cave, tide pool, cacao, sloths)..."
              className="w-full pl-9 pr-3.5 py-2 rounded-xl bg-[#061426] border border-[#1b3f73] text-white text-xs placeholder:text-blue-300/60 focus:outline-none focus:border-[#CE1126]"
            />
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-xl font-semibold transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
                  isSelected
                    ? 'bg-[#CE1126] text-white shadow-md shadow-red-950/80 border border-red-400/50'
                    : 'bg-[#0a1e3d] text-blue-200 hover:text-white hover:bg-[#122e58] border border-[#1b3f73]'
                }`}
              >
                {cat.icon}
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tips Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredTips.length === 0 ? (
          <div className="col-span-full p-6 rounded-xl bg-[#061426] border border-[#1b3f73] text-center text-xs text-blue-200">
            No community tips found matching "{searchQuery}". Try selecting another category or clearing your search.
          </div>
        ) : (
          filteredTips.map((tip) => {
            const badge = getCategoryBadge(tip.category);

            return (
              <div
                key={tip.id}
                className="p-4 md:p-5 rounded-xl bg-[#06152a] border border-[#173a6b] hover:border-[#CE1126]/60 transition-all flex flex-col justify-between shadow-lg space-y-3 group"
              >
                <div>
                  {/* Card Header: Category + Guide Attribution */}
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[10px] font-bold border uppercase tracking-wider ${badge.bg}`}>
                      {badge.icon}
                      <span>{badge.label}</span>
                    </span>

                    {tip.coordinates && (
                      <a
                        href={`https://www.google.com/maps/search/?api=1&query=${tip.coordinates.replace(/\s+/g, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[10px] text-blue-300 hover:text-white flex items-center gap-0.5 font-mono"
                        title="View GPS coordinates on Google Maps"
                      >
                        <MapPin className="w-3 h-3 text-[#ef4444]" />
                        <span>GPS</span>
                        <ExternalLink className="w-2.5 h-2.5" />
                      </a>
                    )}
                  </div>

                  {/* Title */}
                  <h4 className="text-base font-bold text-white font-['Outfit'] group-hover:text-blue-200 transition-colors leading-snug">
                    {tip.title}
                  </h4>

                  {/* Guide Byline with Verified Badge */}
                  <div className="flex items-center gap-1.5 text-xs text-slate-200 mt-1 mb-2.5 pb-2 border-b border-[#14325a]">
                    <UserCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <div>
                      <span className="font-bold text-white">{tip.guideName}</span>
                      <span className="text-blue-300 text-[11px]"> • {tip.guideRole}</span>
                    </div>
                  </div>

                  {/* Location Tag */}
                  <div className="flex items-center gap-1 text-[11px] text-blue-200 mb-2">
                    <MapPin className="w-3 h-3 text-[#ef4444] shrink-0" />
                    <span className="font-semibold text-white">{tip.location}</span>
                    <span className="text-blue-400">({tip.area})</span>
                  </div>

                  {/* Main Actionable Tip */}
                  <p className="text-xs text-slate-200 leading-relaxed mb-3">
                    {tip.tip}
                  </p>

                  {/* Timing or Season Box */}
                  <div className="p-2.5 rounded-lg bg-[#081c38] border border-[#1b3f73] text-xs space-y-1 mb-2.5">
                    <div className="font-bold text-amber-300 text-[11px] flex items-center gap-1">
                      <Clock className="w-3 h-3 text-amber-400 shrink-0" />
                      <span>Best Timing & Season:</span>
                    </div>
                    <p className="text-blue-100 text-[11px] leading-relaxed">
                      {tip.bestTimingOrSeason}
                    </p>
                  </div>

                  {/* Cultural Context / Lore */}
                  <div className="p-2.5 rounded-lg bg-[#051120] border border-[#15345d] text-[11px] space-y-1">
                    <div className="font-bold text-slate-300 flex items-center gap-1">
                      <Info className="w-3 h-3 text-blue-400 shrink-0" />
                      <span>Cultural Lore & Etiquette:</span>
                    </div>
                    <p className="text-slate-300 leading-relaxed italic">
                      "{tip.culturalInsight}"
                    </p>
                  </div>
                </div>

                {/* Card Action: Ask WolabaGo button */}
                <button
                  onClick={() => onAskInChat(tip.suggestedPrompt)}
                  className="w-full pt-2 mt-2 py-2 px-3 rounded-xl bg-[#092244] hover:bg-[#12315c] border border-[#1a4175] hover:border-[#CE1126]/60 text-xs font-semibold text-white flex items-center justify-center gap-2 transition-all shadow-sm cursor-pointer group/btn"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#ef4444]" />
                  <span>Ask <WolabaBrand size="xs" /> for more details</span>
                  <ArrowRight className="w-3.5 h-3.5 text-blue-300 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
