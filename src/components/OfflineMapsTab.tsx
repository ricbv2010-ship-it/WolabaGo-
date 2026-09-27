import React, { useState } from 'react';
import { 
  Map, 
  Download, 
  Compass, 
  Bike, 
  MapPin, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  FileDown, 
  Sparkles, 
  Info,
  PhoneCall,
  WifiOff
} from 'lucide-react';
import { TALAMANCA_OFFLINE_MAPS } from '../data/offlineMapsData';
import { TALAMANCA_EMERGENCY_CONTACTS } from '../data/transitAlerts';
import { StaticMapGraphic } from './StaticMapGraphic';
import { AppLanguage } from '../types';
import { WolabaBrand } from './WolabaBrand';

interface OfflineMapsTabProps {
  currentLanguage: AppLanguage;
  onAskInChat?: (promptText: string) => void;
}

export const OfflineMapsTab: React.FC<OfflineMapsTabProps> = ({
  currentLanguage,
  onAskInChat,
}) => {
  const [selectedMapId, setSelectedMapId] = useState<string>('coastal-corridor');
  const [downloadSuccessNote, setDownloadSuccessNote] = useState<string | null>(null);

  const currentMap = TALAMANCA_OFFLINE_MAPS.find((m) => m.id === selectedMapId) || TALAMANCA_OFFLINE_MAPS[0];

  const handleAskAboutMap = () => {
    if (!onAskInChat) return;
    const prompt = currentLanguage === 'es'
      ? `Dame recomendaciones detalladas de ruta para el mapa "${currentMap.title}". ¿Cuáles son los mejores horarios para recorrerlo en bicicleta o a pie y evitar la lluvia o el sol fuerte?`
      : `Give me detailed route recommendations for "${currentMap.title}". What are the best hours to ride by cruiser bicycle or hike to avoid rain or peak tropical heat?`;
    onAskInChat(prompt);
  };

  return (
    <div className="flex-1 flex flex-col overflow-y-auto bg-[#07152b] text-[#f1f5f9] p-4 md:p-6 lg:p-8 space-y-6">
      
      {/* Top Banner with Caribbean & Offline Visuals */}
      <div className="bg-gradient-to-r from-[#07172f] via-[#0c244b] to-[#081b38] border border-[#1b3f73] rounded-2xl p-5 md:p-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-[#CE1126]/20 border border-[#CE1126]/50 text-white text-[11px] font-bold tracking-wide uppercase">
              <WifiOff className="w-3.5 h-3.5 text-[#ef4444]" />
              <span>Offline Travel Survival • No Cell Signal Required</span>
            </div>

            <h2 className="text-xl md:text-2xl font-extrabold text-white font-['Outfit'] tracking-tight">
              {currentLanguage === 'es' ? 'Mapas Estáticos de Talamanca para Uso Offline' : 'Offline Static Area Maps of Talamanca'}
            </h2>

            <p className="text-xs md:text-sm text-blue-100/90 leading-relaxed">
              {currentLanguage === 'es'
                ? 'La cobertura celular e internet a menudo se corta entre Cocles, Punta Uva y Manzanillo, o dentro del Parque Nacional Cahuita. Descarga estos mapas vectoriales de alto contraste directamente a tu galería de fotos para consultarlos en cualquier momento sin internet.'
                : 'Mobile data and cellular signal frequently drop between Cocles, Punta Uva, and Manzanillo, or deep in Cahuita National Park. Download these high-contrast static area maps directly to your photo gallery for 100% offline navigation.'}
            </p>
          </div>

          {/* Quick Offline Readiness Metric Box */}
          <div className="p-3.5 rounded-xl bg-[#051122]/90 border border-[#1d4175] flex flex-col justify-between gap-2 shrink-0">
            <div className="flex items-center gap-2 text-xs font-bold text-white">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Offline Readiness Kit</span>
            </div>
            <div className="space-y-1 text-[11px] text-blue-200">
              <div>✓ 4 Curated Regional Maps</div>
              <div>✓ Bike Times & Distances (km)</div>
              <div>✓ Verified GPS Coordinates</div>
            </div>
            <button
              onClick={handleAskAboutMap}
              className="mt-1 py-1.5 px-3 rounded-lg bg-[#CE1126] hover:bg-[#e0192e] text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-md"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{currentLanguage === 'es' ? 'Preguntar al Asistente' : 'Ask Guide in Chat'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Map Selector Tabs (Pills) */}
      <div className="space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-blue-300">
          Select Area Map to View & Download:
        </span>
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {TALAMANCA_OFFLINE_MAPS.map((map) => {
            const isSelected = map.id === selectedMapId;
            return (
              <button
                key={map.id}
                onClick={() => setSelectedMapId(map.id)}
                className={`px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap flex items-center gap-2 cursor-pointer ${
                  isSelected
                    ? 'bg-[#CE1126] text-white shadow-lg shadow-red-950/80 font-bold border border-red-400/50 scale-[1.02]'
                    : 'bg-[#0a1e3d] text-blue-200 hover:text-white hover:bg-[#122e58] border border-[#1b3f73]'
                }`}
              >
                <Map className={`w-4 h-4 ${isSelected ? 'text-white' : 'text-blue-300'}`} />
                <span>{map.title.split('—')[0]}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Map Viewer & Downloader */}
      <StaticMapGraphic mapItem={currentMap} />

      {/* Offline Pocket Guide: Emergency Assistance Card */}
      <div className="bg-[#081a36] border border-[#1b3f73] rounded-2xl p-5 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#183969]">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-[#CE1126]/20 border border-[#CE1126]/60 text-white">
              <PhoneCall className="w-4 h-4 text-[#ef4444]" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white font-['Outfit']">
                Offline Emergency Directory (Save or Screenshot)
              </h4>
              <p className="text-[11px] text-blue-200">
                Keep these numbers memorized or saved on your phone's lock screen while traveling in Talamanca
              </p>
            </div>
          </div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 px-2 py-0.5 rounded bg-emerald-950/40 border border-emerald-800/40">
            Emergency Baseline
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {TALAMANCA_EMERGENCY_CONTACTS.map((contact, i) => (
            <div
              key={i}
              className="p-3 rounded-xl bg-[#051428] border border-[#163866] flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-1 mb-1">
                  <span className="text-xs font-bold text-white">{contact.name}</span>
                  <span className="text-[11px] font-extrabold text-[#ef4444] px-1.5 py-0.5 rounded bg-red-950/40 border border-red-800/40">
                    {contact.number}
                  </span>
                </div>
                <span className="text-[10px] text-blue-300 block mb-1">{contact.service}</span>
                <p className="text-[10px] text-slate-300 leading-tight">{contact.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Helpful Instructions: How to use on mobile */}
      <div className="p-4 rounded-xl bg-[#051122] border border-[#193b6e] flex items-start gap-3 text-xs text-blue-200">
        <Info className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
        <div className="space-y-1 leading-relaxed">
          <p className="font-bold text-white">
            📱 How to access these maps with zero cell signal:
          </p>
          <p>
            Click <strong>"Download PNG (For Gallery)"</strong> above. The high-resolution map image will download to your smartphone or device. You can view, pinch-to-zoom, and inspect every road, soda, and distance marker inside your phone's default Photos app even when completely disconnected or in airplane mode!
          </p>
        </div>
      </div>

    </div>
  );
};
