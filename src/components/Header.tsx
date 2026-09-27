import React, { useState } from 'react';
import { 
  Compass, 
  Sparkles, 
  MapPin, 
  CalendarDays, 
  BookOpen, 
  SlidersHorizontal, 
  RotateCcw, 
  PartyPopper,
  Globe2,
  ChevronDown,
  Map
} from 'lucide-react';
import { TravelerProfile, AppLanguage } from '../types';
import { SUPPORTED_LANGUAGES, TRANSLATIONS } from '../i18n/languages';
import { WolabaBrand, CostaRicaFlagRibbon } from './WolabaBrand';

interface HeaderProps {
  activeTab: 'chat' | 'directory' | 'itinerary' | 'culture' | 'events' | 'maps';
  setActiveTab: (tab: 'chat' | 'directory' | 'itinerary' | 'culture' | 'events' | 'maps') => void;
  travelerProfile: TravelerProfile;
  currentLanguage: AppLanguage;
  onLanguageChange: (lang: AppLanguage) => void;
  onOpenProfileModal: () => void;
  onResetChat: () => void;
  messageCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  travelerProfile,
  currentLanguage,
  onLanguageChange,
  onOpenProfileModal,
  onResetChat,
  messageCount,
}) => {
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const t = TRANSLATIONS[currentLanguage] || TRANSLATIONS.en;
  const currentLangObj = SUPPORTED_LANGUAGES.find((l) => l.code === currentLanguage) || SUPPORTED_LANGUAGES[0];

  return (
    <header className="sticky top-0 z-40 bg-[#07172f]/95 backdrop-blur-md border-b border-[#183969] shadow-lg">
      {/* Costa Rica Flag Tricolor Ribbon */}
      <CostaRicaFlagRibbon height="h-1.5" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          
          {/* Logo & Brand: Colors Verde, Amarillo y Rojo ONLY in the name WolabaGo */}
          <div className="flex items-center justify-between">
            <div 
              onClick={() => setActiveTab('chat')}
              className="flex items-center gap-3 cursor-pointer group"
            >
              {/* Logo Icon with Costa Rica Blue, White & Red outline */}
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#002B7F] via-[#ffffff] to-[#CE1126] p-0.5 shadow-md shadow-blue-950/60">
                <div className="w-full h-full bg-[#07172f] rounded-[10px] flex items-center justify-center group-hover:bg-[#0c2447] transition-colors">
                  <span className="text-xl">🌴</span>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2">
                  {/* Name has Green, Yellow, and Red ONLY in the name */}
                  <h1 className="leading-tight">
                    <WolabaBrand size="xl" />
                  </h1>
                  
                  {/* Costa Rican Flag & Grounding Badge */}
                  <span className="px-2 py-0.5 text-[10px] font-bold tracking-wider uppercase rounded-full bg-[#0d264e] text-white border border-[#2563eb]/60 flex items-center gap-1 shadow-inner">
                    <span className="text-xs">🇨🇷</span>
                    <span>Costa Rica Local</span>
                  </span>
                </div>
                <p className="text-xs text-blue-200/80">
                  Talamanca • Puerto Viejo • Cahuita • Manzanillo
                </p>
              </div>
            </div>

            {/* Mobile Profile, Language & Workspace Triggers */}
            <div className="md:hidden flex items-center gap-1.5">
              <button
                onClick={() => {
                  const nextIndex = (SUPPORTED_LANGUAGES.findIndex(l => l.code === currentLanguage) + 1) % SUPPORTED_LANGUAGES.length;
                  onLanguageChange(SUPPORTED_LANGUAGES[nextIndex].code);
                }}
                className="px-2 py-1.5 rounded-lg bg-[#0d264e] border border-[#1f4986] text-white text-xs flex items-center gap-1 font-semibold"
                title="Switch Language"
              >
                <span>{currentLangObj.flag}</span>
                <span className="uppercase">{currentLangObj.code}</span>
              </button>

              <button
                onClick={onOpenProfileModal}
                className="p-2 rounded-lg bg-[#0d264e] border border-[#1f4986] text-white hover:bg-[#16386b]"
                title="Travel Preferences"
              >
                <SlidersHorizontal className="w-4 h-4 text-blue-300" />
              </button>
            </div>
          </div>

          {/* Navigation Tabs with Costa Rica Flag Colors (Azul, Blanco, Rojo) */}
          <nav className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none text-xs font-semibold">
            <button
              onClick={() => setActiveTab('chat')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all whitespace-nowrap ${
                activeTab === 'chat'
                  ? 'bg-[#CE1126] text-white shadow-md shadow-red-950 font-bold border border-red-400/40'
                  : 'text-slate-200 hover:text-white bg-[#0a1e3d] hover:bg-[#122e58] border border-[#1a3d6d]'
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              <span>{t.navChat}</span>
            </button>

            <button
              onClick={() => setActiveTab('events')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all whitespace-nowrap ${
                activeTab === 'events'
                  ? 'bg-[#CE1126] text-white shadow-md shadow-red-950 font-bold border border-red-400/40'
                  : 'text-slate-200 hover:text-white bg-[#0a1e3d] hover:bg-[#122e58] border border-[#1a3d6d]'
              }`}
            >
              <PartyPopper className="w-3.5 h-3.5" />
              <span>{t.navEvents}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
            </button>

            <button
              onClick={() => setActiveTab('directory')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all whitespace-nowrap ${
                activeTab === 'directory'
                  ? 'bg-[#CE1126] text-white shadow-md shadow-red-950 font-bold border border-red-400/40'
                  : 'text-slate-200 hover:text-white bg-[#0a1e3d] hover:bg-[#122e58] border border-[#1a3d6d]'
              }`}
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>{t.navSpots}</span>
            </button>

            <button
              onClick={() => setActiveTab('itinerary')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all whitespace-nowrap ${
                activeTab === 'itinerary'
                  ? 'bg-[#CE1126] text-white shadow-md shadow-red-950 font-bold border border-red-400/40'
                  : 'text-slate-200 hover:text-white bg-[#0a1e3d] hover:bg-[#122e58] border border-[#1a3d6d]'
              }`}
            >
              <CalendarDays className="w-3.5 h-3.5" />
              <span>{t.navItinerary}</span>
            </button>

            <button
              onClick={() => setActiveTab('culture')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all whitespace-nowrap ${
                activeTab === 'culture'
                  ? 'bg-[#CE1126] text-white shadow-md shadow-red-950 font-bold border border-red-400/40'
                  : 'text-slate-200 hover:text-white bg-[#0a1e3d] hover:bg-[#122e58] border border-[#1a3d6d]'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>{t.navCulture}</span>
            </button>

            <button
              onClick={() => setActiveTab('maps')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all whitespace-nowrap ${
                activeTab === 'maps'
                  ? 'bg-[#CE1126] text-white shadow-md shadow-red-950 font-bold border border-red-400/40'
                  : 'text-slate-200 hover:text-white bg-[#0a1e3d] hover:bg-[#122e58] border border-[#1a3d6d]'
              }`}
            >
              <Map className="w-3.5 h-3.5" />
              <span>{t.navMaps}</span>
              <span className="px-1.5 py-0.2 rounded-full bg-white/20 text-[9px] font-bold">
                Offline
              </span>
            </button>
          </nav>

          {/* Right Action Bar */}
          <div className="hidden md:flex items-center gap-2">
            
            {/* Language Selector Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-[#0d264e] hover:bg-[#143566] border border-[#1f4986] text-xs text-white transition-colors"
                title={t.languageSelectTitle}
              >
                <Globe2 className="w-3.5 h-3.5 text-blue-300" />
                <span>{currentLangObj.flag}</span>
                <span className="font-bold uppercase">{currentLangObj.code}</span>
                <ChevronDown className="w-3 h-3 text-blue-300 opacity-80" />
              </button>

              {isLangDropdownOpen && (
                <div 
                  className="absolute right-0 mt-1 w-48 bg-[#0a1e3d] border border-[#1f4986] rounded-xl shadow-2xl py-1 z-50 animate-fadeIn"
                  onMouseLeave={() => setIsLangDropdownOpen(false)}
                >
                  <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-blue-300 border-b border-[#183969]">
                    {t.languageSelectTitle}
                  </div>
                  {SUPPORTED_LANGUAGES.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        onLanguageChange(lang.code);
                        setIsLangDropdownOpen(false);
                      }}
                      className={`w-full px-3 py-2 text-left text-xs flex items-center justify-between hover:bg-[#143769] transition-colors ${
                        currentLanguage === lang.code ? 'bg-[#CE1126] text-white font-bold' : 'text-slate-200'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span>{lang.flag}</span>
                        <span>{lang.nativeName}</span>
                      </div>
                      {lang.badge && (
                        <span className="text-[9px] px-1.5 py-0.5 rounded bg-blue-900 text-blue-200 border border-blue-600">
                          {lang.badge}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            <button
              onClick={onOpenProfileModal}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#0d264e] hover:bg-[#143566] border border-[#1f4986] text-xs text-white transition-colors"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-blue-300" />
              <span>{travelerProfile.style}</span>
              <span className="text-blue-400">•</span>
              <span className="text-blue-200">{travelerProfile.transport}</span>
            </button>

            {messageCount > 0 && (
              <button
                onClick={onResetChat}
                className="p-1.5 rounded-xl bg-[#0d264e] hover:bg-[#CE1126] text-slate-300 hover:text-white border border-[#1f4986] transition-colors"
                title="Start New Conversation"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            )}
          </div>

        </div>
      </div>
    </header>
  );
};

