import React, { useRef } from 'react';
import { Download, Printer, Compass, MapPin, Bike, Waves, AlertTriangle, ShieldCheck, ExternalLink, Sparkles } from 'lucide-react';
import { OfflineMapItem } from '../types';
import { WolabaBrand } from './WolabaBrand';

interface StaticMapGraphicProps {
  mapItem: OfflineMapItem;
}

export const StaticMapGraphic: React.FC<StaticMapGraphicProps> = ({ mapItem }) => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  // Export SVG to PNG image via HTML5 Canvas
  const handleDownloadPNG = () => {
    if (!svgRef.current) return;

    try {
      const svgElement = svgRef.current;
      const svgString = new XMLSerializer().serializeToString(svgElement);
      const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
      const URL = window.URL || window.webkitURL || window;
      const blobURL = URL.createObjectURL(svgBlob);
      
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const width = 1600;
        const height = 1100;
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Background
        ctx.fillStyle = '#07152b';
        ctx.fillRect(0, 0, width, height);

        // Header Card on Canvas
        ctx.fillStyle = '#0d2346';
        ctx.fillRect(40, 30, width - 80, 110);
        ctx.strokeStyle = '#1f4c87';
        ctx.lineWidth = 2;
        ctx.strokeRect(40, 30, width - 80, 110);

        // Header Text
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 32px Outfit, sans-serif';
        ctx.fillText(`🇨🇷 ${mapItem.title} — WolabaGo Offline Map`, 65, 75);

        ctx.fillStyle = '#93c5fd';
        ctx.font = '20px sans-serif';
        ctx.fillText(`${mapItem.subtitle} • ${mapItem.distanceCoverage}`, 65, 112);

        // Draw the SVG map graphic
        ctx.drawImage(img, 40, 160, width - 80, 740);

        // Footer Safety & Offline Banner
        ctx.fillStyle = '#08172e';
        ctx.fillRect(40, 920, width - 80, 140);
        ctx.strokeStyle = '#CE1126';
        ctx.lineWidth = 2;
        ctx.strokeRect(40, 920, width - 80, 140);

        ctx.fillStyle = '#ef4444';
        ctx.font = 'bold 20px sans-serif';
        ctx.fillText('⚠️ CRITICAL OFFLINE SAFETY & EMERGENCY TIPS:', 65, 955);

        ctx.fillStyle = '#f1f5f9';
        ctx.font = '16px sans-serif';
        ctx.fillText(`• ${mapItem.safetyTip}`, 65, 985);
        ctx.fillText(`• ${mapItem.offlineAdvisory}`, 65, 1012);
        ctx.fillStyle = '#60a5fa';
        ctx.fillText('• EMERGENCIES: 911 | Cruz Roja Puerto Viejo: +506 2750-0118 | Guardavidas Cocles: +506 8332-9011', 65, 1038);

        // Convert canvas to download link
        const pngUrl = canvas.toDataURL('image/png');
        const downloadLink = document.createElement('a');
        downloadLink.download = `WolabaGo-${mapItem.id}-Offline-Map.png`;
        downloadLink.href = pngUrl;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
        URL.revokeObjectURL(blobURL);
      };
      img.src = blobURL;
    } catch (err) {
      console.error('Failed to export map PNG:', err);
    }
  };

  // Export direct SVG
  const handleDownloadSVG = () => {
    if (!svgRef.current) return;
    const svgString = new XMLSerializer().serializeToString(svgRef.current);
    const blob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `WolabaGo-${mapItem.id}-Vector-Map.svg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-4">
      {/* Action Bar: Download PNG, Download SVG, Print */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-xl bg-[#081b37] border border-[#1b3f73]">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-[#CE1126]/20 border border-[#CE1126]/50 text-white">
            <Compass className="w-4 h-4 text-[#ef4444]" />
          </div>
          <div>
            <h4 className="text-xs md:text-sm font-bold text-white font-['Outfit']">
              Static High-Contrast Map: {mapItem.title}
            </h4>
            <p className="text-[11px] text-blue-200">
              {mapItem.distanceCoverage} • {mapItem.transportBest}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handleDownloadPNG}
            className="px-3 py-1.5 rounded-xl bg-[#CE1126] hover:bg-[#e0192e] text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-md cursor-pointer"
            title="Download full 1600x1100 PNG image to your photo gallery for airplane mode"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download PNG (For Gallery)</span>
          </button>

          <button
            onClick={handleDownloadSVG}
            className="px-3 py-1.5 rounded-xl bg-[#0b244d] hover:bg-[#13376e] border border-[#1f4986] text-blue-100 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            title="Download lightweight vector SVG for infinite zoom"
          >
            <Download className="w-3.5 h-3.5 text-blue-300" />
            <span>Vector SVG</span>
          </button>

          <button
            onClick={handlePrint}
            className="px-3 py-1.5 rounded-xl bg-[#0b244d] hover:bg-[#13376e] border border-[#1f4986] text-blue-100 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            title="Print or save as PDF"
          >
            <Printer className="w-3.5 h-3.5 text-blue-300" />
            <span>Print / PDF</span>
          </button>
        </div>
      </div>

      {/* SVG Map Container */}
      <div className="rounded-2xl border-2 border-[#1b3f73] bg-[#07172f] overflow-hidden shadow-2xl relative">
        <svg
          ref={svgRef}
          viewBox="0 0 1000 600"
          className="w-full h-auto select-none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="oceanGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#032657" />
              <stop offset="100%" stopColor="#08428c" />
            </linearGradient>
            <linearGradient id="landGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0b231a" />
              <stop offset="100%" stopColor="#103628" />
            </linearGradient>
            <pattern id="reefPattern" width="10" height="10" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1.5" fill="#38bdf8" opacity="0.4" />
              <circle cx="7" cy="7" r="1.5" fill="#38bdf8" opacity="0.4" />
            </pattern>
          </defs>

          {/* Render Map based on mapItem.id */}
          {mapItem.id === 'coastal-corridor' && <CoastalCorridorSvg />}
          {mapItem.id === 'puerto-viejo-centro' && <PuertoViejoCentroSvg />}
          {mapItem.id === 'cahuita-national-park' && <CahuitaNationalParkSvg />}
          {mapItem.id === 'bribri-indigenous-route' && <BribriIndigenousSvg />}

          {/* Watermark Branding inside SVG */}
          <g transform="translate(20, 20)">
            <rect width="240" height="38" rx="8" fill="#051224" opacity="0.9" stroke="#183d70" strokeWidth="1" />
            <text x="12" y="24" fill="#ffffff" fontSize="13" fontWeight="bold" fontFamily="sans-serif">
              🇨🇷 WolabaGo Caribbean Map
            </text>
            <circle cx="220" cy="19" r="4" fill="#22c55e" />
          </g>

          {/* Compass Rose */}
          <g transform="translate(930, 60)">
            <circle cx="0" cy="0" r="28" fill="#07152b" opacity="0.85" stroke="#1f4986" strokeWidth="1.5" />
            <polygon points="0,-22 6,-4 0,-8 -6,-4" fill="#CE1126" />
            <polygon points="0,22 6,4 0,8 -6,4" fill="#ffffff" />
            <polygon points="-22,0 -4,6 -8,0 -4,-6" fill="#93c5fd" />
            <polygon points="22,0 4,6 8,0 4,-6" fill="#93c5fd" />
            <text x="0" y="-12" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">N</text>
            <text x="0" y="18" textAnchor="middle" fill="#94a3b8" fontSize="8">S</text>
            <text x="17" y="3" textAnchor="middle" fill="#94a3b8" fontSize="8">E</text>
            <text x="-17" y="3" textAnchor="middle" fill="#94a3b8" fontSize="8">W</text>
          </g>

          {/* Map Scale Bar */}
          <g transform="translate(25, 560)">
            <rect width="160" height="24" rx="6" fill="#051224" opacity="0.9" stroke="#183d70" strokeWidth="1" />
            <line x1="15" y1="12" x2="145" y2="12" stroke="#ffffff" strokeWidth="3" />
            <line x1="15" y1="7" x2="15" y2="17" stroke="#ffffff" strokeWidth="2" />
            <line x1="80" y1="8" x2="80" y2="16" stroke="#ffffff" strokeWidth="1.5" />
            <line x1="145" y1="7" x2="145" y2="17" stroke="#ffffff" strokeWidth="2" />
            <text x="15" y="21" fill="#cbd5e1" fontSize="8">0</text>
            <text x="80" y="21" fill="#cbd5e1" fontSize="8" textAnchor="middle">2.5 km</text>
            <text x="145" y="21" fill="#cbd5e1" fontSize="8" textAnchor="end">5 km</text>
          </g>
        </svg>
      </div>

      {/* Points of Interest Table & GPS Coordinates */}
      <div className="bg-[#081a36] border border-[#1b3f73] rounded-2xl p-4 md:p-5 shadow-lg space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-[#183969]">
          <h5 className="text-xs md:text-sm font-bold text-white font-['Outfit'] flex items-center gap-2">
            <span>Key Landmarks & Exact Offline Coordinates</span>
          </h5>
          <span className="text-[11px] text-blue-300">
            {mapItem.keyPois.length} Points Indexed
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
          {mapItem.keyPois.map((poi, idx) => (
            <div
              key={idx}
              className="p-3 rounded-xl bg-[#051428] border border-[#163866] hover:border-[#CE1126]/60 transition-colors flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-1 mb-1">
                  <div className="flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-[#CE1126]/20 border border-[#CE1126]/60 text-[#ef4444] text-[10px] font-extrabold flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <span className="text-xs font-bold text-white">{poi.name}</span>
                  </div>
                  <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-[#0a2347] text-blue-300 border border-blue-900">
                    {poi.type}
                  </span>
                </div>
                <p className="text-[11px] text-slate-300 ml-6 mb-1.5">{poi.note}</p>
              </div>

              {poi.coordinates && (
                <div className="flex items-center justify-between pt-1.5 border-t border-[#132d52] ml-6 text-[10px] text-blue-300">
                  <span className="font-mono">GPS: {poi.coordinates}</span>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${poi.coordinates.replace(/\s+/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white flex items-center gap-0.5 text-blue-400"
                    title="Open in Google Maps if connection is present"
                  >
                    <span>View Map</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Safety & Offline Survival Tips Box */}
      <div className="p-4 rounded-xl bg-[#1f0d11]/80 border-2 border-[#CE1126]/70 shadow-lg space-y-2">
        <div className="flex items-center gap-2 text-white font-bold text-xs uppercase tracking-wide">
          <AlertTriangle className="w-4 h-4 text-[#ef4444]" />
          <span>Offline Survival & Transport Protocol for Talamanca</span>
        </div>
        <p className="text-xs text-red-100 leading-relaxed">
          <strong>Safety Note:</strong> {mapItem.safetyTip}
        </p>
        <p className="text-xs text-blue-100 leading-relaxed">
          <strong>Connectivity Warning:</strong> {mapItem.offlineAdvisory}
        </p>
      </div>
    </div>
  );
};

/* --- Bespoke SVG Map 1: Coastal Corridor (Ruta 256) --- */
const CoastalCorridorSvg: React.FC = () => {
  return (
    <g>
      {/* Background Ocean */}
      <rect width="1000" height="600" fill="url(#oceanGrad)" />

      {/* Coral Reef Barrier Shading */}
      <path
        d="M 180 180 Q 320 280 480 340 T 780 430 Q 860 440 920 420 L 920 600 L 180 600 Z"
        fill="url(#reefPattern)"
      />

      {/* Mainland Landmass (Green Tropical Rainforest) */}
      <path
        d="M 0 0 L 260 0 Q 230 140 310 240 Q 420 320 530 360 Q 720 420 890 410 Q 940 400 1000 440 L 1000 600 L 0 600 Z"
        fill="url(#landGrad)"
        stroke="#1a4d3b"
        strokeWidth="3"
      />

      {/* Beach Sand Strip (Dark Volcanic for Playa Negra, Golden for Cocles to Manzanillo) */}
      {/* Playa Negra Dark Sand */}
      <path
        d="M 235 60 Q 245 130 280 190 Q 295 215 310 230"
        stroke="#475569"
        strokeWidth="12"
        fill="none"
        strokeLinecap="round"
      />
      {/* Golden Sand from Puerto Viejo to Manzanillo */}
      <path
        d="M 310 230 Q 420 320 530 360 Q 720 420 890 410 Q 940 400 990 430"
        stroke="#eab308"
        strokeWidth="8"
        fill="none"
        strokeLinecap="round"
        opacity="0.9"
      />

      {/* Sea waves decoration */}
      <g stroke="#38bdf8" strokeWidth="1.5" fill="none" opacity="0.6">
        <path d="M 450 160 Q 465 150 480 160 T 510 160" />
        <path d="M 620 220 Q 635 210 650 220 T 680 220" />
        <path d="M 780 280 Q 795 270 810 280 T 840 280" />
      </g>

      {/* Ruta 256 Main Paved Road (Bold Red & White Strip) */}
      <path
        d="M 120 40 Q 200 130 290 225 Q 380 300 480 345 Q 680 405 850 400 Q 910 395 950 430"
        stroke="#ffffff"
        strokeWidth="7"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M 120 40 Q 200 130 290 225 Q 380 300 480 345 Q 680 405 850 400 Q 910 395 950 430"
        stroke="#CE1126"
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
      />

      {/* Key POI Nodes along Ruta 256 */}

      {/* 1. Playa Negra & Soda Mirna */}
      <g transform="translate(230, 110)">
        <circle cx="0" cy="0" r="14" fill="#07152b" stroke="#38bdf8" strokeWidth="2.5" />
        <text x="0" y="4" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">1</text>
        <rect x="18" y="-18" width="180" height="38" rx="6" fill="#07152b" opacity="0.95" stroke="#38bdf8" strokeWidth="1.5" />
        <text x="26" y="-3" fill="#ffffff" fontSize="11" fontWeight="bold">Playa Negra & Soda Mirna</text>
        <text x="26" y="12" fill="#93c5fd" fontSize="9">Calle Playa Negra (9.6554, -82.7681)</text>
      </g>

      {/* 2. Puerto Viejo Centro Hub */}
      <g transform="translate(290, 225)">
        <circle cx="0" cy="0" r="15" fill="#CE1126" stroke="#ffffff" strokeWidth="2.5" />
        <text x="0" y="4" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">2</text>
        <rect x="20" y="-10" width="165" height="38" rx="6" fill="#07152b" opacity="0.95" stroke="#CE1126" strokeWidth="1.5" />
        <text x="28" y="5" fill="#ffffff" fontSize="11" fontWeight="bold">Puerto Viejo Centro (0 km)</text>
        <text x="28" y="20" fill="#fca5a5" fontSize="9">MEPE Bus, Sodas, ATMs</text>
      </g>

      {/* Salsa Brava reef icon */}
      <g transform="translate(325, 195)">
        <polygon points="0,-8 7,6 -7,6" fill="#ef4444" />
        <text x="12" y="2" fill="#fca5a5" fontSize="9" fontWeight="bold">Salsa Brava Reef</text>
      </g>

      {/* 3. Playa Cocles & Guardavidas */}
      <g transform="translate(420, 290)">
        <circle cx="0" cy="0" r="13" fill="#07152b" stroke="#eab308" strokeWidth="2" />
        <text x="0" y="4" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">3</text>
        <rect x="-170" y="-10" width="155" height="36" rx="6" fill="#07152b" opacity="0.95" stroke="#eab308" strokeWidth="1.5" />
        <text x="-162" y="5" fill="#ffffff" fontSize="10" fontWeight="bold">Playa Cocles (2.5 km)</text>
        <text x="-162" y="19" fill="#fde047" fontSize="9">Surf Break • Guardavidas</text>
      </g>

      {/* 4. Playa Chiquita & Jaguar Rescue */}
      <g transform="translate(560, 345)">
        <circle cx="0" cy="0" r="13" fill="#07152b" stroke="#22c55e" strokeWidth="2" />
        <text x="0" y="4" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">4</text>
        <rect x="-18" y="20" width="170" height="36" rx="6" fill="#07152b" opacity="0.95" stroke="#22c55e" strokeWidth="1.5" />
        <text x="-10" y="35" fill="#ffffff" fontSize="10" fontWeight="bold">Playa Chiquita (5.5 km)</text>
        <text x="-10" y="48" fill="#86efac" fontSize="9">Reef Tide Pools • Jaguar Center</text>
      </g>

      {/* 5. Punta Uva & Sloth Point */}
      <g transform="translate(730, 395)">
        <circle cx="0" cy="0" r="14" fill="#07152b" stroke="#38bdf8" strokeWidth="2.5" />
        <text x="0" y="4" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">5</text>
        <rect x="-40" y="-55" width="165" height="38" rx="6" fill="#07152b" opacity="0.95" stroke="#38bdf8" strokeWidth="1.5" />
        <text x="-32" y="-40" fill="#ffffff" fontSize="10" fontWeight="bold">Punta Uva (8.5 km)</text>
        <text x="-32" y="-26" fill="#7dd3fc" fontSize="9">Calm Emerald Waters • Kayak</text>
      </g>

      {/* 6. Manzanillo & Gandoca Refuge */}
      <g transform="translate(930, 420)">
        <circle cx="0" cy="0" r="14" fill="#07152b" stroke="#ef4444" strokeWidth="2.5" />
        <text x="0" y="4" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">6</text>
        <rect x="-175" y="-50" width="170" height="38" rx="6" fill="#07152b" opacity="0.95" stroke="#ef4444" strokeWidth="1.5" />
        <text x="-167" y="-35" fill="#ffffff" fontSize="10" fontWeight="bold">Manzanillo End (13.5 km)</text>
        <text x="-167" y="-21" fill="#fca5a5" fontSize="9">Shipwreck • Gandoca Refuge</text>
      </g>

      {/* Bike Transit Legend & Distances */}
      <g transform="translate(25, 430)">
        <rect width="210" height="110" rx="10" fill="#051224" opacity="0.95" stroke="#1f4986" strokeWidth="1.5" />
        <text x="14" y="24" fill="#ffffff" fontSize="11" fontWeight="bold">🚲 Cruiser Bike Travel Times:</text>
        <text x="14" y="45" fill="#93c5fd" fontSize="10">• PV to Playa Negra: 5-8 mins (1.5 km)</text>
        <text x="14" y="65" fill="#93c5fd" fontSize="10">• PV to Cocles: 12-15 mins (2.5 km)</text>
        <text x="14" y="85" fill="#93c5fd" fontSize="10">• PV to Punta Uva: 30-35 mins (8.5 km)</text>
        <text x="14" y="102" fill="#93c5fd" fontSize="10">• PV to Manzanillo: 50-60 mins (13.5 km)</text>
      </g>
    </g>
  );
};

/* --- Bespoke SVG Map 2: Puerto Viejo Centro Walking & Soda Map --- */
const PuertoViejoCentroSvg: React.FC = () => {
  return (
    <g>
      {/* Background Ocean & Bay */}
      <rect width="1000" height="600" fill="url(#oceanGrad)" />

      {/* Harbor Bay & Shoreline */}
      <path
        d="M 0 160 Q 250 140 450 190 Q 650 240 780 180 Q 880 120 1000 150 L 1000 600 L 0 600 Z"
        fill="url(#landGrad)"
        stroke="#1a4d3b"
        strokeWidth="3"
      />

      {/* Salsa Brava Shallow Reef in the Bay */}
      <ellipse cx="680" cy="180" rx="90" ry="40" fill="url(#reefPattern)" />
      <g transform="translate(680, 175)">
        <rect x="-65" y="-12" width="130" height="24" rx="4" fill="#07152b" opacity="0.9" stroke="#ef4444" />
        <text x="0" y="4" fill="#fca5a5" fontSize="9" fontWeight="bold" textAnchor="middle">
          ⚡ Salsa Brava Reef Break
        </text>
      </g>

      {/* Street Grid of Puerto Viejo Centro */}
      {/* Main Street (Avenida 71 / Calle Principal) */}
      <line x1="150" y1="230" x2="850" y2="280" stroke="#ffffff" strokeWidth="8" strokeLinecap="round" />
      <line x1="150" y1="230" x2="850" y2="280" stroke="#CE1126" strokeWidth="5" strokeLinecap="round" />
      <text x="350" y="245" fill="#ffffff" fontSize="9" fontWeight="bold" transform="rotate(3.5, 350, 245)">
        Calle Principal (To Cocles & Manzanillo ➔)
      </text>

      {/* Calle Playa Negra / Entry Road from Limón (North) */}
      <line x1="220" y1="140" x2="220" y2="480" stroke="#ffffff" strokeWidth="7" strokeLinecap="round" />
      <line x1="220" y1="140" x2="220" y2="480" stroke="#38bdf8" strokeWidth="4" strokeLinecap="round" />
      <text x="140" y="160" fill="#38bdf8" fontSize="9" fontWeight="bold">
        ⬅ Calle Playa Negra (To Soda Mirna)
      </text>

      {/* Secondary Cross Streets */}
      <line x1="380" y1="200" x2="380" y2="480" stroke="#64748b" strokeWidth="4" strokeLinecap="round" />
      <line x1="520" y1="220" x2="520" y2="500" stroke="#64748b" strokeWidth="4" strokeLinecap="round" />
      <line x1="680" y1="250" x2="680" y2="480" stroke="#64748b" strokeWidth="4" strokeLinecap="round" />

      {/* Plaza de Fútbol (Soccer Field) - Prominent Green Rectangle */}
      <g transform="translate(390, 260)">
        <rect width="120" height="90" rx="6" fill="#15803d" stroke="#ffffff" strokeWidth="2" />
        <rect x="5" y="5" width="110" height="80" fill="none" stroke="#ffffff" strokeWidth="1" strokeDasharray="3 3" />
        <circle cx="60" cy="45" r="14" fill="none" stroke="#ffffff" strokeWidth="1" />
        <text x="60" y="48" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">
          Plaza de Fútbol
        </text>
      </g>

      {/* MEPE Bus Station */}
      <g transform="translate(235, 300)">
        <rect width="85" height="55" rx="6" fill="#07152b" stroke="#38bdf8" strokeWidth="2" />
        <text x="42" y="24" fill="#38bdf8" fontSize="9" fontWeight="bold" textAnchor="middle">🚌 MEPE Bus</text>
        <text x="42" y="42" fill="#cbd5e1" fontSize="8" textAnchor="middle">Terminal</text>
      </g>

      {/* Soda Lidia (Behind the soccer field) */}
      <g transform="translate(390, 365)">
        <rect width="120" height="42" rx="6" fill="#07152b" stroke="#f59e0b" strokeWidth="2" />
        <text x="60" y="18" fill="#fbbf24" fontSize="10" fontWeight="bold" textAnchor="middle">🍗 Soda Lidia</text>
        <text x="60" y="32" fill="#ffffff" fontSize="8" textAnchor="middle">Authentic Rice & Beans</text>
      </g>

      {/* Soda Tamara */}
      <g transform="translate(530, 270)">
        <rect width="115" height="42" rx="6" fill="#07152b" stroke="#f59e0b" strokeWidth="2" />
        <text x="57" y="18" fill="#fbbf24" fontSize="10" fontWeight="bold" textAnchor="middle">🐟 Soda Tamara</text>
        <text x="57" y="32" fill="#ffffff" fontSize="8" textAnchor="middle">Snapper & Ginger Beer</text>
      </g>

      {/* Banco de Costa Rica (BCR) ATM */}
      <g transform="translate(235, 230)">
        <rect width="85" height="40" rx="6" fill="#07152b" stroke="#ef4444" strokeWidth="2" />
        <text x="42" y="18" fill="#ef4444" fontSize="9" fontWeight="bold" textAnchor="middle">🏧 BCR Bank</text>
        <text x="42" y="32" fill="#ffffff" fontSize="8" textAnchor="middle">Cash ATM</text>
      </g>

      {/* Harbor / Pescadores */}
      <g transform="translate(350, 150)">
        <rect width="110" height="32" rx="5" fill="#07152b" stroke="#38bdf8" strokeWidth="1.5" />
        <text x="55" y="15" fill="#7dd3fc" fontSize="9" fontWeight="bold" textAnchor="middle">⛵ Old Harbor</text>
        <text x="55" y="27" fill="#ffffff" fontSize="7" textAnchor="middle">Artisan Craft Market</text>
      </g>

      {/* Police / Cruz Roja */}
      <g transform="translate(130, 370)">
        <rect width="75" height="45" rx="5" fill="#07152b" stroke="#CE1126" strokeWidth="2" />
        <text x="37" y="18" fill="#ef4444" fontSize="8" fontWeight="bold" textAnchor="middle">🚨 Cruz Roja</text>
        <text x="37" y="32" fill="#ffffff" fontSize="7" textAnchor="middle">& Police</text>
      </g>
    </g>
  );
};

/* --- Bespoke SVG Map 3: Parque Nacional Cahuita Trail Map --- */
const CahuitaNationalParkSvg: React.FC = () => {
  return (
    <g>
      <rect width="1000" height="600" fill="url(#oceanGrad)" />

      {/* Cahuita Point Promontory (Distinctive Peninsula sticking into Caribbean) */}
      <path
        d="M 120 0 Q 150 180 250 250 Q 420 300 680 270 Q 820 250 860 330 Q 800 420 620 420 Q 450 430 350 510 L 350 600 L 0 600 L 0 0 Z"
        fill="url(#landGrad)"
        stroke="#1a4d3b"
        strokeWidth="3"
      />

      {/* White Sand Strip along Cahuita Beach (Playa Blanca) */}
      <path
        d="M 150 160 Q 250 240 420 290 Q 680 260 840 280"
        stroke="#f8fafc"
        strokeWidth="7"
        fill="none"
        strokeLinecap="round"
      />

      {/* Coral Barrier Reef (Snorkel Area around Punta Cahuita) */}
      <path
        d="M 680 180 Q 880 170 950 290 Q 940 380 840 440"
        stroke="#38bdf8"
        strokeWidth="12"
        fill="none"
        strokeDasharray="6 6"
        opacity="0.8"
      />
      <text x="830" y="210" fill="#38bdf8" fontSize="10" fontWeight="bold">
        🪸 Coral Barrier Reef (Guide required)
      </text>

      {/* Coastal Jungle Trail (Dotted Trekking Path) */}
      <path
        d="M 140 140 Q 240 220 400 270 Q 640 250 780 300 Q 730 370 580 390 Q 420 410 380 520"
        stroke="#fbbf24"
        strokeWidth="3.5"
        strokeDasharray="7 5"
        fill="none"
      />

      {/* 1. Kelly Creek Station (Cahuita Village Entrance) */}
      <g transform="translate(130, 130)">
        <circle cx="0" cy="0" r="14" fill="#22c55e" stroke="#ffffff" strokeWidth="2" />
        <text x="0" y="4" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">1</text>
        <rect x="18" y="-18" width="165" height="38" rx="6" fill="#07152b" opacity="0.95" stroke="#22c55e" strokeWidth="1.5" />
        <text x="26" y="-3" fill="#ffffff" fontSize="10" fontWeight="bold">Kelly Creek Entrance</text>
        <text x="26" y="11" fill="#86efac" fontSize="8">Village Entry • Donation • 8am-4pm</text>
      </g>

      {/* 2. Playa Blanca */}
      <g transform="translate(320, 240)">
        <circle cx="0" cy="0" r="12" fill="#38bdf8" stroke="#ffffff" strokeWidth="2" />
        <text x="0" y="4" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">2</text>
        <text x="18" y="4" fill="#ffffff" fontSize="10" fontWeight="bold">Playa Blanca (White Sand)</text>
      </g>

      {/* 3. Rio Perez Crossing */}
      <g transform="translate(510, 265)">
        <circle cx="0" cy="0" r="12" fill="#f59e0b" stroke="#ffffff" strokeWidth="2" />
        <text x="0" y="4" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">3</text>
        <text x="18" y="-8" fill="#fef08a" fontSize="9" fontWeight="bold">Rio Perez Sand Bar Crossing</text>
        <text x="18" y="6" fill="#cbd5e1" fontSize="8">(Wade across; waist-deep in rain)</text>
      </g>

      {/* 4. Punta Cahuita Reef Tip */}
      <g transform="translate(790, 300)">
        <circle cx="0" cy="0" r="14" fill="#0284c7" stroke="#ffffff" strokeWidth="2" />
        <text x="0" y="4" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">4</text>
        <rect x="-175" y="16" width="170" height="38" rx="6" fill="#07152b" opacity="0.95" stroke="#38bdf8" strokeWidth="1.5" />
        <text x="-167" y="32" fill="#ffffff" fontSize="10" fontWeight="bold">Punta Cahuita Coral Tip</text>
        <text x="-167" y="46" fill="#7dd3fc" fontSize="8">Snorkeling • Sloths & Capuchins</text>
      </g>

      {/* 5. Puerto Vargas Entrance & Boardwalk */}
      <g transform="translate(380, 520)">
        <circle cx="0" cy="0" r="14" fill="#ef4444" stroke="#ffffff" strokeWidth="2" />
        <text x="0" y="4" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">5</text>
        <rect x="20" y="-18" width="180" height="38" rx="6" fill="#07152b" opacity="0.95" stroke="#ef4444" strokeWidth="1.5" />
        <text x="28" y="-3" fill="#ffffff" fontSize="10" fontWeight="bold">Puerto Vargas Station</text>
        <text x="28" y="11" fill="#fca5a5" fontSize="8">Official Fee Desk • Boardwalk • Bus Exit</text>
      </g>
    </g>
  );
};

/* --- Bespoke SVG Map 4: Bribri Indigenous & Waterfalls Route --- */
const BribriIndigenousSvg: React.FC = () => {
  return (
    <g>
      {/* Mountain & Foothill Gradient */}
      <rect width="1000" height="600" fill="#091d17" />

      {/* Topographic Contours / River Valleys */}
      <path
        d="M 0 100 Q 250 80 500 130 T 1000 80 L 1000 600 L 0 600 Z"
        fill="#0d2820"
      />
      <path
        d="M 0 250 Q 300 220 600 290 T 1000 240 L 1000 600 L 0 600 Z"
        fill="#123429"
      />

      {/* Rio Sixaola / Rio Telire Border River */}
      <path
        d="M 50 550 Q 350 480 650 510 T 1000 480"
        stroke="#0284c7"
        strokeWidth="16"
        fill="none"
        opacity="0.8"
      />
      <text x="750" y="540" fill="#7dd3fc" fontSize="10" fontWeight="bold">
        🌊 Rio Sixaola (Panama Border)
      </text>

      {/* Main Highway Ruta 36 (Paved road from Hone Creek to Bribri) */}
      <path
        d="M 850 40 Q 750 180 600 250 Q 420 330 250 420"
        stroke="#ffffff"
        strokeWidth="8"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M 850 40 Q 750 180 600 250 Q 420 330 250 420"
        stroke="#CE1126"
        strokeWidth="5"
        fill="none"
        strokeLinecap="round"
      />

      {/* 1. Hone Creek Junction */}
      <g transform="translate(850, 60)">
        <circle cx="0" cy="0" r="14" fill="#07152b" stroke="#ffffff" strokeWidth="2.5" />
        <text x="0" y="4" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">1</text>
        <rect x="-185" y="-18" width="175" height="38" rx="6" fill="#07152b" opacity="0.95" stroke="#ffffff" strokeWidth="1.5" />
        <text x="-177" y="-3" fill="#ffffff" fontSize="10" fontWeight="bold">Hone Creek Junction</text>
        <text x="-177" y="11" fill="#cbd5e1" fontSize="8">Intersection Ruta 36 & Ruta 256</text>
      </g>

      {/* 2. Bribri Canton Center */}
      <g transform="translate(600, 250)">
        <circle cx="0" cy="0" r="15" fill="#CE1126" stroke="#ffffff" strokeWidth="2.5" />
        <text x="0" y="4" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">2</text>
        <rect x="20" y="-18" width="165" height="38" rx="6" fill="#07152b" opacity="0.95" stroke="#CE1126" strokeWidth="1.5" />
        <text x="28" y="-3" fill="#ffffff" fontSize="10" fontWeight="bold">Bribri Municipal Hub</text>
        <text x="28" y="11" fill="#fca5a5" fontSize="8">Bus Terminal • Clinic • Police</text>
      </g>

      {/* 3. Acomuita Women's Cacao Association */}
      <g transform="translate(480, 210)">
        <circle cx="0" cy="0" r="13" fill="#f59e0b" stroke="#ffffff" strokeWidth="2" />
        <text x="0" y="4" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">3</text>
        <rect x="-175" y="-16" width="165" height="36" rx="6" fill="#07152b" opacity="0.95" stroke="#f59e0b" strokeWidth="1.5" />
        <text x="-167" y="-1" fill="#ffffff" fontSize="10" fontWeight="bold">Acomuita Indigenous Cacao</text>
        <text x="-167" y="13" fill="#fde047" fontSize="8">Artisanal Chocolate & Sacred Usuré</text>
      </g>

      {/* 4. Catarata Volio Waterfall */}
      <g transform="translate(320, 180)">
        <circle cx="0" cy="0" r="13" fill="#38bdf8" stroke="#ffffff" strokeWidth="2" />
        <text x="0" y="4" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">4</text>
        <rect x="18" y="-16" width="165" height="36" rx="6" fill="#07152b" opacity="0.95" stroke="#38bdf8" strokeWidth="1.5" />
        <text x="26" y="-1" fill="#ffffff" fontSize="10" fontWeight="bold">Catarata Volio (Waterfall)</text>
        <text x="26" y="13" fill="#7dd3fc" fontSize="8">15m Cascade in Jungle Canyon</text>
      </g>

      {/* 5. Catarata Bribri / Two Waters */}
      <g transform="translate(390, 340)">
        <circle cx="0" cy="0" r="13" fill="#38bdf8" stroke="#ffffff" strokeWidth="2" />
        <text x="0" y="4" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">5</text>
        <rect x="18" y="-16" width="165" height="36" rx="6" fill="#07152b" opacity="0.95" stroke="#38bdf8" strokeWidth="1.5" />
        <text x="26" y="-1" fill="#ffffff" fontSize="10" fontWeight="bold">Catarata Bribri (Two Waters)</text>
        <text x="26" y="13" fill="#7dd3fc" fontSize="8">Deep natural rock pool swim</text>
      </g>

      {/* 6. Bambú & Yorkín River Pier */}
      <g transform="translate(180, 480)">
        <circle cx="0" cy="0" r="14" fill="#0284c7" stroke="#ffffff" strokeWidth="2.5" />
        <text x="0" y="4" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">6</text>
        <rect x="20" y="-18" width="170" height="38" rx="6" fill="#07152b" opacity="0.95" stroke="#0284c7" strokeWidth="1.5" />
        <text x="28" y="-3" fill="#ffffff" fontSize="10" fontWeight="bold">Bambú & Río Yorkín</text>
        <text x="28" y="11" fill="#7dd3fc" fontSize="8">Pirogue Canoes to Stibrawpa</text>
      </g>
    </g>
  );
};
