import React, { useState, useEffect } from 'react';
import { 
  AlertTriangle, 
  ShieldAlert, 
  Car, 
  Waves, 
  CloudRain, 
  Compass, 
  RefreshCw, 
  PhoneCall, 
  ExternalLink, 
  MapPin, 
  Clock, 
  MessageSquare, 
  ChevronDown, 
  ChevronUp, 
  Info,
  CheckCircle2,
  Sparkles,
  AlertCircle
} from 'lucide-react';
import { TransitAlert, AlertCategory, AlertSeverity, AppLanguage } from '../types';
import { INITIAL_TRANSIT_ALERTS, TALAMANCA_EMERGENCY_CONTACTS } from '../data/transitAlerts';

interface EmergencyAlertsSectionProps {
  currentLanguage: AppLanguage;
  onAskInChat: (prompt: string) => void;
}

export const EmergencyAlertsSection: React.FC<EmergencyAlertsSectionProps> = ({
  currentLanguage,
  onAskInChat,
}) => {
  const [alerts, setAlerts] = useState<TransitAlert[]>(INITIAL_TRANSIT_ALERTS);
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showContacts, setShowContacts] = useState<boolean>(false);
  const [lastScannedTime, setLastScannedTime] = useState<string>('Live Baseline');
  const [scanMessage, setScanMessage] = useState<string | null>(null);

  useEffect(() => {
    fetchAlerts(false);
  }, [currentLanguage]);

  const fetchAlerts = async (forceRefresh: boolean = false) => {
    if (forceRefresh) {
      setIsScanning(true);
      setScanMessage(currentLanguage === 'es' ? 'Escaneando reportes de tránsito y oleaje en tiempo real...' : 'Scanning real-time Talamanca transit and ocean alerts...');
    }

    try {
      const url = `/api/alerts?lang=${currentLanguage}${forceRefresh ? '&refresh=true' : ''}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error('Failed to fetch alerts');
      const data = await res.json();
      if (data.alerts && Array.isArray(data.alerts)) {
        setAlerts(data.alerts);
        if (data.scrapedAt) setLastScannedTime(data.scrapedAt);
      }
      if (forceRefresh) {
        setScanMessage(currentLanguage === 'es' ? 'Radar actualizado con reportes oficiales.' : 'Radar updated with current field advisories.');
        setTimeout(() => setScanMessage(null), 4000);
      }
    } catch (err: any) {
      console.warn('Alert fetch fallback to local base:', err);
    } finally {
      setIsScanning(false);
    }
  };

  const filteredAlerts = alerts.filter((alert) => {
    if (selectedCategory === 'all') return true;
    return alert.category === selectedCategory;
  });

  const getCategoryIcon = (category: AlertCategory) => {
    switch (category) {
      case 'transit':
        return <Car className="w-4 h-4 text-amber-400" />;
      case 'surf':
        return <Waves className="w-4 h-4 text-cyan-400" />;
      case 'weather':
        return <CloudRain className="w-4 h-4 text-blue-400" />;
      case 'infrastructure':
      default:
        return <Compass className="w-4 h-4 text-emerald-400" />;
    }
  };

  const getSeverityStyle = (severity: AlertSeverity) => {
    switch (severity) {
      case 'critical':
        return {
          border: 'border-red-500/70',
          bg: 'bg-red-950/20',
          badgeBg: 'bg-[#CE1126] text-white',
          icon: <ShieldAlert className="w-4 h-4 text-[#ef4444]" />,
          textLabel: currentLanguage === 'es' ? 'Alerta Crítica' : 'Critical Alert',
        };
      case 'warning':
        return {
          border: 'border-amber-500/60',
          bg: 'bg-amber-950/20',
          badgeBg: 'bg-amber-500/30 text-amber-200 border border-amber-400/50',
          icon: <AlertTriangle className="w-4 h-4 text-amber-400" />,
          textLabel: currentLanguage === 'es' ? 'Aviso Preventivo' : 'Advisory / Warning',
        };
      case 'info':
      default:
        return {
          border: 'border-blue-500/50',
          bg: 'bg-blue-950/20',
          badgeBg: 'bg-blue-500/20 text-blue-200 border border-blue-400/40',
          icon: <Info className="w-4 h-4 text-blue-400" />,
          textLabel: currentLanguage === 'es' ? 'Información Vial / Mar' : 'Transit / Marine Notice',
        };
    }
  };

  const handleAskAboutAlert = (alert: TransitAlert) => {
    const prompt = currentLanguage === 'es'
      ? `¿Cuál es el estado actual de "${alert.title}" en ${alert.location}? ¿Hay rutas alternas para bicicleta o bus MEPE, o recomendaciones seguras de playa?`
      : `What is the current status of "${alert.title}" at ${alert.location}? Are there alternative routes for bicycles or MEPE buses, or safer alternative beaches?`;
    onAskInChat(prompt);
  };

  return (
    <div className="bg-[#08172e] border border-[#1b3f73] rounded-2xl p-4 md:p-5 shadow-xl space-y-4">
      {/* Top Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#183969]">
        <div className="flex items-center gap-2.5">
          <div className="relative">
            <div className="w-8 h-8 rounded-xl bg-[#CE1126]/20 border border-[#CE1126]/60 flex items-center justify-center text-white">
              <ShieldAlert className="w-4 h-4 text-[#ef4444]" />
            </div>
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#ef4444] animate-ping" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#ef4444]" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-white font-['Outfit'] flex items-center gap-1.5">
                <span>{currentLanguage === 'es' ? 'Radar de Tránsito y Emergencias' : 'Real-Time Transit & Emergency Radar'}</span>
              </h3>
              <span className="px-2 py-0.5 rounded-full bg-[#CE1126]/30 border border-[#CE1126]/60 text-[10px] font-extrabold text-white">
                {alerts.length} {currentLanguage === 'es' ? 'Avisos Activos' : 'Active Notices'}
              </span>
            </div>
            <p className="text-[11px] text-blue-200">
              {currentLanguage === 'es' 
                ? 'Monitoreo de Ruta 36, Ruta 256, oleaje en Cocles/Salsa Brava y pasos viales en Talamanca'
                : 'Road blocks (Route 36/256), rip current swells, bridge works & MEPE bus advisories'}
            </p>
          </div>
        </div>

        {/* Action Buttons: Scan Live Radar & Emergency Contacts */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => fetchAlerts(true)}
            disabled={isScanning}
            className="px-3 py-1.5 rounded-xl bg-[#0d264e] hover:bg-[#143769] border border-[#1f4986] text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-50"
            title="Scan live road and surf conditions using Google Search"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-blue-300 ${isScanning ? 'animate-spin text-[#ef4444]' : ''}`} />
            <span>{isScanning ? (currentLanguage === 'es' ? 'Verificando...' : 'Scanning...') : (currentLanguage === 'es' ? 'Escanear Radar' : 'Scan Live Radar')}</span>
          </button>

          <button
            onClick={() => setShowContacts(!showContacts)}
            className="px-3 py-1.5 rounded-xl bg-[#CE1126]/20 hover:bg-[#CE1126]/40 border border-[#CE1126]/50 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <PhoneCall className="w-3.5 h-3.5 text-[#ef4444]" />
            <span>{currentLanguage === 'es' ? 'Teléfonos de Emergencia' : 'Emergency Contacts'}</span>
            {showContacts ? <ChevronUp className="w-3.5 h-3.5 text-blue-300" /> : <ChevronDown className="w-3.5 h-3.5 text-blue-300" />}
          </button>
        </div>
      </div>

      {/* Status banner when scanning */}
      {scanMessage && (
        <div className="px-3 py-2 rounded-xl bg-[#0a1e3d] border border-blue-500/50 text-xs text-blue-100 flex items-center gap-2 animate-fadeIn">
          <Sparkles className="w-3.5 h-3.5 text-[#ef4444] shrink-0" />
          <span>{scanMessage}</span>
        </div>
      )}

      {/* Emergency Contacts Drawer */}
      {showContacts && (
        <div className="p-3.5 rounded-xl bg-[#051122] border border-[#1e3f73] space-y-2 animate-fadeIn">
          <div className="flex items-center justify-between pb-1.5 border-b border-[#183969]">
            <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <span>🇨🇷</span>
              <span>{currentLanguage === 'es' ? 'Números de Asistencia en Talamanca' : 'Direct South Caribbean Assistance Numbers'}</span>
            </span>
            <span className="text-[10px] text-blue-300">Tap to call directly from phone</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 pt-1">
            {TALAMANCA_EMERGENCY_CONTACTS.map((c, i) => (
              <a
                key={i}
                href={`tel:${c.number.replace(/\s+/g, '')}`}
                className="p-2.5 rounded-lg bg-[#081a36] hover:bg-[#0e2a54] border border-[#1a3d6d] hover:border-[#CE1126]/70 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between gap-1 mb-0.5">
                    <span className="text-xs font-bold text-white group-hover:text-blue-200 transition-colors">
                      {c.name}
                    </span>
                    <span className="text-[11px] font-extrabold text-[#ef4444] px-1.5 py-0.5 rounded bg-red-950/40 border border-red-800/40">
                      {c.number}
                    </span>
                  </div>
                  <span className="text-[10px] text-blue-300 block">{c.service}</span>
                  <p className="text-[10px] text-slate-300/80 mt-1 leading-tight">{c.description}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Filter Tabs by Category */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`px-3 py-1 rounded-xl font-semibold transition-all whitespace-nowrap flex items-center gap-1.5 ${
            selectedCategory === 'all'
              ? 'bg-[#CE1126] text-white shadow-md'
              : 'bg-[#0a1e3d] text-blue-200 hover:text-white border border-[#1b3f73]'
          }`}
        >
          <span>{currentLanguage === 'es' ? 'Todos los Avisos' : 'All Alerts'}</span>
          <span className="px-1.5 py-0.2 rounded-full bg-white/20 text-[10px] font-bold">
            {alerts.length}
          </span>
        </button>

        <button
          onClick={() => setSelectedCategory('transit')}
          className={`px-3 py-1 rounded-xl font-semibold transition-all whitespace-nowrap flex items-center gap-1.5 ${
            selectedCategory === 'transit'
              ? 'bg-[#CE1126] text-white shadow-md'
              : 'bg-[#0a1e3d] text-blue-200 hover:text-white border border-[#1b3f73]'
          }`}
        >
          <Car className="w-3.5 h-3.5 text-amber-400" />
          <span>{currentLanguage === 'es' ? 'Tránsito y Carreteras (Ruta 36/256)' : 'Transit & Road Blocks'}</span>
        </button>

        <button
          onClick={() => setSelectedCategory('surf')}
          className={`px-3 py-1 rounded-xl font-semibold transition-all whitespace-nowrap flex items-center gap-1.5 ${
            selectedCategory === 'surf'
              ? 'bg-[#CE1126] text-white shadow-md'
              : 'bg-[#0a1e3d] text-blue-200 hover:text-white border border-[#1b3f73]'
          }`}
        >
          <Waves className="w-3.5 h-3.5 text-cyan-400" />
          <span>{currentLanguage === 'es' ? 'Oleaje y Resacas (Cocles / Salsa Brava)' : 'Surf & Rip Currents'}</span>
        </button>

        <button
          onClick={() => setSelectedCategory('weather')}
          className={`px-3 py-1 rounded-xl font-semibold transition-all whitespace-nowrap flex items-center gap-1.5 ${
            selectedCategory === 'weather'
              ? 'bg-[#CE1126] text-white shadow-md'
              : 'bg-[#0a1e3d] text-blue-200 hover:text-white border border-[#1b3f73]'
          }`}
        >
          <CloudRain className="w-3.5 h-3.5 text-blue-400" />
          <span>{currentLanguage === 'es' ? 'Clima y Senderos' : 'Weather & Trail Tides'}</span>
        </button>
      </div>

      {/* Alerts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {filteredAlerts.length === 0 ? (
          <div className="col-span-full p-4 rounded-xl bg-[#0a1e3d] border border-[#1b3f73] text-center text-xs text-blue-200">
            {currentLanguage === 'es' ? 'No hay avisos activos en esta categoría.' : 'No active alerts in this category.'}
          </div>
        ) : (
          filteredAlerts.map((alert) => {
            const style = getSeverityStyle(alert.severity);

            return (
              <div
                key={alert.id}
                className={`rounded-xl border ${style.border} ${style.bg} p-4 flex flex-col justify-between shadow-lg relative overflow-hidden transition-all hover:border-white/50`}
              >
                <div>
                  {/* Card Top: Severity badge & Category icon */}
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-1.5">
                      <span className={`px-2 py-0.5 rounded-md text-[10px] font-extrabold flex items-center gap-1 uppercase tracking-wider ${style.badgeBg}`}>
                        {style.icon}
                        <span>{style.textLabel}</span>
                      </span>
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#0a1e3d] border border-[#183969] text-[10px] text-blue-200">
                        {getCategoryIcon(alert.category)}
                        <span className="capitalize">{alert.category}</span>
                      </span>
                    </div>

                    <div className="flex items-center gap-1 text-[10px] text-slate-300">
                      <Clock className="w-3 h-3 text-blue-400" />
                      <span>{alert.updatedAt}</span>
                    </div>
                  </div>

                  {/* Title */}
                  <h4 className="text-sm font-bold text-white font-['Outfit'] leading-snug mb-1.5">
                    {alert.title}
                  </h4>

                  {/* Location & Authority */}
                  <div className="flex flex-wrap items-center gap-2 text-xs text-blue-200/90 mb-2.5">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-[#ef4444] shrink-0" />
                      <span className="font-medium text-white">{alert.location}</span>
                    </div>
                    <span className="text-blue-500">•</span>
                    <span className="text-[11px] text-blue-300">{alert.area}</span>
                  </div>

                  {/* Summary */}
                  <p className="text-xs text-slate-200 leading-relaxed mb-3">
                    {alert.summary}
                  </p>

                  {/* Actionable Travel Advice Box */}
                  <div className="p-2.5 rounded-lg bg-[#07172f]/90 border border-[#1a3d6d] text-xs space-y-1 mb-3">
                    <div className="font-bold text-white text-[11px] flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>{currentLanguage === 'es' ? 'Recomendación Práctica WolabaGo:' : 'Practical Traveler Advice:'}</span>
                    </div>
                    <p className="text-blue-100 text-[11px] leading-relaxed">
                      {alert.advice}
                    </p>
                  </div>
                </div>

                {/* Card Bottom: Authority source & Chat button */}
                <div className="pt-2.5 border-t border-[#1a3d6d] flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5 text-[10px] text-blue-300">
                    <span className="font-semibold text-slate-300">Fuente:</span>
                    {alert.sourceUrl ? (
                      <a
                        href={alert.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline hover:text-white flex items-center gap-0.5"
                      >
                        <span>{alert.sourceAuthority}</span>
                        <ExternalLink className="w-2.5 h-2.5" />
                      </a>
                    ) : (
                      <span>{alert.sourceAuthority}</span>
                    )}
                  </div>

                  <button
                    onClick={() => handleAskAboutAlert(alert)}
                    className="py-1 px-2.5 bg-[#0a1e3d] hover:bg-[#122e58] border border-[#1f4986] text-white rounded-lg text-[11px] font-semibold flex items-center gap-1 transition-colors cursor-pointer shrink-0"
                    title="Ask assistant for alternative route or status"
                  >
                    <MessageSquare className="w-3 h-3 text-[#ef4444]" />
                    <span>{currentLanguage === 'es' ? 'Consultar desvío' : 'Ask in chat'}</span>
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
