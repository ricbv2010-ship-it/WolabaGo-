import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  RefreshCw, 
  Calendar as CalendarIcon, 
  Clock, 
  MapPin, 
  Tag, 
  ExternalLink, 
  MessageSquare, 
  DollarSign, 
  Search, 
  Compass, 
  Music, 
  ShoppingBag, 
  Flame, 
  HeartHandshake, 
  Waves, 
  CheckCircle2, 
  Globe2 
} from 'lucide-react';
import { CommunityEvent, EventCategory, AppLanguage } from '../types';
import { LOCAL_COMMUNITY_EVENTS } from '../data/communityEvents';
import { SUPPORTED_LANGUAGES, TRANSLATIONS } from '../i18n/languages';
import { EmergencyAlertsSection } from './EmergencyAlertsSection';

interface EventsTabProps {
  currentLanguage: AppLanguage;
  onLanguageChange: (lang: AppLanguage) => void;
  onAskInChat: (promptText: string) => void;
}

export const EventsTab: React.FC<EventsTabProps> = ({
  currentLanguage,
  onLanguageChange,
  onAskInChat,
}) => {
  const [events, setEvents] = useState<CommunityEvent[]>(LOCAL_COMMUNITY_EVENTS);
  const [isScraping, setIsScraping] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedArea, setSelectedArea] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [lastUpdatedTime, setLastUpdatedTime] = useState<string>('Real-time Verified');
  const [scrapedCount, setScrapedCount] = useState<number>(0);
  const [notification, setNotification] = useState<string | null>(null);

  const t = TRANSLATIONS[currentLanguage] || TRANSLATIONS.en;

  // Load events on mount or language switch
  useEffect(() => {
    fetchEvents(false);
  }, [currentLanguage]);

  const fetchEvents = async (forceRefresh: boolean = false) => {
    if (forceRefresh) setIsScraping(true);

    try {
      const url = `/api/events?lang=${currentLanguage}${forceRefresh ? '&refresh=true' : ''}`;
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data.events) && data.events.length > 0) {
          setEvents(data.events);
          setLastUpdatedTime(data.scrapedAt || new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
          
          if (forceRefresh && data.isRealTimeScraped) {
            const newlyScraped = data.events.filter((e: CommunityEvent) => e.isRealTimeScraped).length;
            setScrapedCount(newlyScraped);
            setNotification(`Successfully scraped ${newlyScraped} verified live community event(s) across Talamanca!`);
            setTimeout(() => setNotification(null), 5000);
          }
        }
      }
    } catch (err) {
      console.warn('Could not fetch events from server, using local community index:', err);
    } finally {
      if (forceRefresh) setIsScraping(false);
    }
  };

  // Filter events by category, area, and search query
  const filteredEvents = events.filter((ev) => {
    const matchesCategory = selectedCategory === 'all' || ev.category === selectedCategory;
    const matchesArea = selectedArea === 'all' || ev.area === selectedArea;
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !query ||
      ev.title.toLowerCase().includes(query) ||
      ev.description.toLowerCase().includes(query) ||
      ev.location.toLowerCase().includes(query) ||
      ev.highlight.toLowerCase().includes(query) ||
      ev.tags.some((tag) => tag.toLowerCase().includes(query));

    return matchesCategory && matchesArea && matchesSearch;
  });

  const getCategoryMeta = (cat: EventCategory) => {
    switch (cat) {
      case 'market':
        return {
          label: t.catMarket,
          icon: ShoppingBag,
          color: 'bg-blue-500/10 text-blue-300 border-blue-400/30',
          badgeColor: 'bg-[#0d264e] text-white border-blue-600/50',
        };
      case 'music':
        return {
          label: t.catMusic,
          icon: Music,
          color: 'bg-red-500/10 text-red-300 border-red-500/30',
          badgeColor: 'bg-[#CE1126]/30 text-white border-red-500/50',
        };
      case 'culture':
        return {
          label: t.catCulture,
          icon: Flame,
          color: 'bg-red-500/10 text-red-300 border-red-500/30',
          badgeColor: 'bg-red-950/60 text-white border-red-600/50',
        };
      case 'wellness':
        return {
          label: t.catWellness,
          icon: Waves,
          color: 'bg-blue-500/10 text-blue-300 border-blue-400/30',
          badgeColor: 'bg-[#0d264e] text-white border-blue-600/50',
        };
      case 'community':
      default:
        return {
          label: t.catCommunity,
          icon: HeartHandshake,
          color: 'bg-blue-500/10 text-blue-300 border-blue-400/30',
          badgeColor: 'bg-[#0d264e] text-white border-blue-600/50',
        };
    }
  };

  const handleChatClick = (ev: CommunityEvent) => {
    const prompt = `Tell me more about the "${ev.title}" at ${ev.location} in ${ev.area}. What is the best time to arrive, how can I get there by bicycle, and are there authentic sodas nearby?`;
    onAskInChat(prompt);
  };

  return (
    <div className="flex-1 flex flex-col overflow-y-auto bg-[#07152b] text-[#f1f5f9] p-4 md:p-6 lg:p-8 space-y-6">
      
      {/* Top Banner & Language Controls */}
      <div className="bg-gradient-to-r from-[#07172f] via-[#0b2146] to-[#0e2a56] border border-[#1b3f73] rounded-2xl p-5 md:p-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          
          <div className="space-y-1.5 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-[#CE1126]/20 border border-[#CE1126]/50 text-white text-[11px] font-bold tracking-wide uppercase">
              <span className="text-xs">🇨🇷</span>
              <span>Real-Time Community Radar</span>
            </div>
            
            <h2 className="text-xl md:text-2xl font-extrabold text-white font-['Outfit'] tracking-tight">
              {t.eventsHeaderTitle}
            </h2>
            
            <p className="text-xs md:text-sm text-blue-100/90 leading-relaxed">
              {t.eventsHeaderSubtitle}
            </p>
          </div>

          {/* Action Header Items: Language Selector & Scrape Button */}
          <div className="flex flex-wrap items-center gap-2.5">
            {/* Language Selector Pill */}
            <div className="flex items-center gap-1 bg-[#07172f] border border-[#183969] p-1 rounded-xl shadow-inner">
              <Globe2 className="w-4 h-4 text-blue-300 ml-1.5 mr-0.5 shrink-0" />
              {SUPPORTED_LANGUAGES.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => onLanguageChange(lang.code)}
                  className={`px-2 py-1 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all ${
                    currentLanguage === lang.code
                      ? 'bg-[#CE1126] text-white shadow-sm font-bold'
                      : 'text-slate-300 hover:text-white hover:bg-blue-900/40'
                  }`}
                  title={`${lang.nativeName} (${lang.name})`}
                >
                  <span>{lang.flag}</span>
                  <span className="uppercase">{lang.code}</span>
                </button>
              ))}
            </div>

            {/* Live Scrape Trigger Button */}
            <button
              onClick={() => fetchEvents(true)}
              disabled={isScraping}
              className="px-4 py-2 bg-[#CE1126] hover:bg-[#e0192e] text-white font-bold rounded-xl text-xs flex items-center gap-2 shadow-lg shadow-red-950/70 transition-all active:scale-95 disabled:opacity-60 cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-white ${isScraping ? 'animate-spin' : ''}`} />
              <span>{isScraping ? t.scrapingStatus : t.scrapeLiveBtn}</span>
            </button>
          </div>

        </div>

        {/* Live Scraped Notification Toast */}
        {notification && (
          <div className="mt-4 p-3 bg-blue-950/90 border border-blue-500/70 rounded-xl text-xs text-white flex items-center gap-2 animate-fadeIn shadow-md">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{notification}</span>
          </div>
        )}

        {/* Status ticker */}
        <div className="mt-4 pt-3 border-t border-[#183969] flex flex-wrap items-center justify-between text-[11px] text-blue-200">
          <div className="flex items-center gap-3">
            <span>● {t.lastScrapedAt}: <strong className="text-white">{lastUpdatedTime}</strong></span>
            <span>● Active listings: <strong className="text-[#ef4444] font-bold">{events.length}</strong></span>
          </div>
          <span className="text-[10px] text-blue-300/80 hidden sm:inline">
            📍 Respecting verified separation of Puerto Viejo Centro & Playa Negra bulevar
          </span>
        </div>
      </div>

      {/* Real-Time Emergency and Transit Alerts Section */}
      <EmergencyAlertsSection
        currentLanguage={currentLanguage}
        onAskInChat={onAskInChat}
      />

      {/* Search and Filters Bar */}
      <div className="space-y-3">
        <div className="flex flex-col md:flex-row gap-3">
          
          {/* Keyword Search */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-blue-300 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.searchPlaceholder}
              className="w-full bg-[#0a1e3d] border border-[#1b3f73] rounded-xl pl-9 pr-4 py-2.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-blue-400 transition-colors shadow-inner"
            />
          </div>

          {/* Area Selector */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
            {[
              { id: 'all', label: t.allAreas },
              { id: 'Puerto Viejo Centro', label: 'Centro (Downtown)' },
              { id: 'Playa Negra', label: 'Playa Negra (Bulevar)' },
              { id: 'Cocles', label: 'Playa Cocles' },
              { id: 'Playa Chiquita', label: 'Playa Chiquita' },
              { id: 'Punta Uva', label: 'Punta Uva' },
              { id: 'Manzanillo', label: 'Manzanillo' },
              { id: 'Cahuita', label: 'Cahuita' },
              { id: 'Bribri', label: 'Bribri Territory' },
            ].map((area) => (
              <button
                key={area.id}
                onClick={() => setSelectedArea(area.id)}
                className={`px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedArea === area.id
                    ? 'bg-[#CE1126] text-white border border-red-400 shadow-sm font-bold'
                    : 'bg-[#0a1e3d] text-slate-200 border border-[#1a3d6d] hover:text-white hover:bg-[#122e58]'
                }`}
              >
                {area.label}
              </button>
            ))}
          </div>

        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {[
            { id: 'all', label: t.allCategories, icon: Compass },
            { id: 'market', label: t.catMarket, icon: ShoppingBag },
            { id: 'music', label: t.catMusic, icon: Music },
            { id: 'culture', label: t.catCulture, icon: Flame },
            { id: 'wellness', label: t.catWellness, icon: Waves },
            { id: 'community', label: t.catCommunity, icon: HeartHandshake },
          ].map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all whitespace-nowrap ${
                  isSelected
                    ? 'bg-blue-600 text-white font-bold shadow-md'
                    : 'bg-[#0a1e3d] text-slate-200 border border-[#1a3d6d] hover:text-white hover:bg-[#122e58]'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Events Grid */}
      {filteredEvents.length === 0 ? (
        <div className="bg-[#0a1e3d] border border-[#1b3f73] rounded-2xl p-10 text-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-[#07172f] border border-[#1b3f73] flex items-center justify-center mx-auto text-[#ef4444]">
            <Compass className="w-6 h-6" />
          </div>
          <p className="text-sm text-slate-200 max-w-md mx-auto">
            {t.noEventsFound}
          </p>
          <button
            onClick={() => {
              setSelectedCategory('all');
              setSelectedArea('all');
              setSearchQuery('');
            }}
            className="px-4 py-1.5 bg-[#CE1126] hover:bg-[#e0192e] text-white text-xs font-bold rounded-lg transition-colors"
          >
            {t.resetFilters}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-5">
          {filteredEvents.map((ev) => {
            const meta = getCategoryMeta(ev.category);
            const CategoryIcon = meta.icon;
            const isPlayaNegra = ev.area === 'Playa Negra';

            return (
              <div
                key={ev.id}
                className="bg-[#0a1e3d] border border-[#1b3f73] hover:border-blue-400/80 rounded-2xl p-5 flex flex-col justify-between space-y-4 shadow-xl transition-all"
              >
                {/* Card Top: Badges & Category */}
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between gap-2">
                    
                    <div className="flex items-center gap-1.5">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${meta.color}`}>
                        <CategoryIcon className="w-3 h-3" />
                        <span>{meta.label}</span>
                      </span>

                      {ev.isRealTimeScraped && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#CE1126]/30 text-white border border-[#CE1126]">
                          <Sparkles className="w-2.5 h-2.5 text-white" />
                          <span>{t.realtimeBadge}</span>
                        </span>
                      )}
                    </div>

                    {/* Zone Badge */}
                    <span
                      className={`text-[11px] px-2.5 py-0.5 rounded-full font-bold border ${
                        isPlayaNegra
                          ? 'bg-[#CE1126]/20 text-white border-red-500/60'
                          : 'bg-[#0d264e] text-blue-200 border-blue-500/50'
                      }`}
                    >
                      {ev.area}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-base font-bold text-white font-['Outfit'] leading-snug">
                    {ev.title}
                  </h3>

                  {/* Schedule, Time & Location row */}
                  <div className="space-y-1 text-xs text-blue-200">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-red-400 shrink-0" />
                      <span className="font-semibold text-white">{ev.date}</span>
                      <span className="text-blue-400">•</span>
                      <span>{ev.time}</span>
                    </div>

                    <div className="flex items-start gap-1.5">
                      <MapPin className={`w-3.5 h-3.5 mt-0.5 shrink-0 ${isPlayaNegra ? 'text-red-400' : 'text-blue-400'}`} />
                      <span className="text-slate-200 leading-tight">{ev.location}</span>
                    </div>

                    <div className="flex items-center gap-1.5 text-[11px]">
                      <DollarSign className="w-3.5 h-3.5 text-white shrink-0" />
                      <span className="text-slate-100">{ev.cost}</span>
                      <span className="text-blue-500">•</span>
                      <span className="text-blue-200">{ev.recurrence}</span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-slate-200 leading-relaxed">
                    {ev.description}
                  </p>

                  {/* Highlight callout box */}
                  <div className="p-2.5 rounded-xl bg-[#07172f] border border-[#183969] text-xs space-y-1">
                    <div className="font-bold text-white text-[11px] flex items-center gap-1">
                      <span>✨ {t.highlightLabel}:</span>
                    </div>
                    <p className="text-blue-100 text-[11px] leading-relaxed">
                      {ev.highlight}
                    </p>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {ev.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#07172f] border border-[#183969] text-[10px] text-blue-200"
                      >
                        <Tag className="w-2.5 h-2.5 text-blue-400" />
                        <span>{tag}</span>
                      </span>
                    ))}
                  </div>

                  {/* Web Source citations if present */}
                  {ev.sources && ev.sources.length > 0 && (
                    <div className="pt-1 flex flex-wrap gap-2 text-[10px]">
                      {ev.sources.map((src, idx) => (
                        <a
                          key={idx}
                          href={src.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-300 hover:text-white flex items-center gap-1 underline underline-offset-2"
                        >
                          <ExternalLink className="w-3 h-3 text-red-400" />
                          <span>{src.title || t.sourceLink}</span>
                        </a>
                      ))}
                    </div>
                  )}
                </div>

                {/* Bottom Card Actions */}
                <div className="pt-3 border-t border-[#183969] flex items-center justify-end">
                  <button
                    onClick={() => handleChatClick(ev)}
                    className="w-full py-2 px-3 bg-[#CE1126] hover:bg-[#e0192e] text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-md"
                    title="Ask WolabaGo about this event"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-white" />
                    <span>{t.askAboutEventBtn}</span>
                  </button>
                </div>

              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};
