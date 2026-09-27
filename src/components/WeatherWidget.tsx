import React, { useState, useEffect } from 'react';
import { 
  Sun, 
  CloudRain, 
  Cloud, 
  CloudLightning, 
  CloudDrizzle, 
  Wind, 
  Droplets, 
  Thermometer, 
  Waves, 
  RefreshCw, 
  Compass, 
  ChevronDown, 
  ChevronUp, 
  ShieldCheck, 
  Sparkles,
  MapPin
} from 'lucide-react';
import { WeatherData, WeatherLocationKey } from '../types';

interface WeatherWidgetProps {
  onAskWeatherQuestion?: (prompt: string) => void;
}

export const WeatherWidget: React.FC<WeatherWidgetProps> = ({ onAskWeatherQuestion }) => {
  const [selectedLocation, setSelectedLocation] = useState<WeatherLocationKey>('puerto-viejo');
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  const fetchWeather = async (locKey: WeatherLocationKey) => {
    setIsRefreshing(true);
    try {
      const res = await fetch(`/api/weather?location=${locKey}`);
      if (!res.ok) throw new Error('Failed to load weather');
      const data: WeatherData = await res.json();
      setWeather(data);
    } catch (err) {
      console.error('Error fetching weather:', err);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchWeather(selectedLocation);
    // Refresh weather every 10 minutes automatically
    const interval = setInterval(() => {
      fetchWeather(selectedLocation);
    }, 10 * 60 * 1000);
    return () => clearInterval(interval);
  }, [selectedLocation]);

  const getWeatherIcon = (iconType?: WeatherData['iconType'], className = 'w-5 h-5') => {
    switch (iconType) {
      case 'sunny':
        return <Sun className={`${className} text-amber-400 animate-spin-slow`} />;
      case 'partly-cloudy':
        return <Sun className={`${className} text-amber-300`} />;
      case 'drizzle':
        return <CloudDrizzle className={`${className} text-teal-400`} />;
      case 'rain':
        return <CloudRain className={`${className} text-blue-400`} />;
      case 'thunder':
        return <CloudLightning className={`${className} text-amber-500`} />;
      case 'cloudy':
      default:
        return <Cloud className={`${className} text-emerald-300`} />;
    }
  };

  return (
    <div className="bg-[#07172f] border-b border-[#183969] relative z-30 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2">
        {/* Compact Strip View */}
        <div className="flex flex-wrap items-center justify-between gap-2.5">
          
          {/* Location Selector & Condition summary */}
          <div className="flex items-center gap-2.5">
            <div className="flex items-center gap-1.5 bg-[#0a1e3d] border border-[#1b3f73] rounded-lg p-1 text-xs">
              <MapPin className="w-3.5 h-3.5 text-[#ef4444] ml-1 shrink-0" />
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value as WeatherLocationKey)}
                className="bg-transparent text-white text-xs font-semibold focus:outline-none cursor-pointer pr-1"
              >
                <option value="puerto-viejo" className="bg-[#07172f] text-white">
                  Puerto Viejo Centro
                </option>
                <option value="playa-negra" className="bg-[#07172f] text-white">
                  Playa Negra & Bulevar
                </option>
                <option value="cahuita" className="bg-[#07172f] text-white">
                  Cahuita National Park
                </option>
                <option value="manzanillo" className="bg-[#07172f] text-white">
                  Manzanillo Refuge
                </option>
              </select>
            </div>

            {weather && (
              <div className="flex items-center gap-2 text-xs">
                <div className="flex items-center gap-1.5 font-bold text-white font-['Outfit']">
                  {getWeatherIcon(weather.iconType, 'w-4 h-4')}
                  <span>{weather.temperature}°C</span>
                  <span className="text-blue-300 text-[11px] font-normal">
                    (feels {weather.apparentTemperature}°C)
                  </span>
                </div>
                <span className="hidden sm:inline text-blue-500">•</span>
                <span className="hidden sm:inline text-slate-200 font-medium">
                  {weather.condition}
                </span>
              </div>
            )}
          </div>

          {/* Quick Metrics Bar */}
          {weather && (
            <div className="hidden md:flex items-center gap-4 text-xs text-blue-200">
              <div className="flex items-center gap-1" title="Relative Humidity">
                <Droplets className="w-3.5 h-3.5 text-blue-400" />
                <span>{weather.humidity}% hum</span>
              </div>
              <div className="flex items-center gap-1" title="Wind & Ocean state">
                <Wind className="w-3.5 h-3.5 text-blue-300" />
                <span>{weather.windSpeed} km/h</span>
              </div>
              <div className="flex items-center gap-1" title="UV Index">
                <Sun className="w-3.5 h-3.5 text-amber-400" />
                <span className="font-semibold text-white">UV {weather.uvIndex}</span>
              </div>
            </div>
          )}

          {/* Actions & Expand Toggle */}
          <div className="flex items-center gap-1.5 ml-auto">
            <button
              onClick={() => fetchWeather(selectedLocation)}
              disabled={isRefreshing}
              className="p-1.5 rounded-lg text-blue-300 hover:text-white hover:bg-blue-900/40 transition-colors"
              title="Refresh live Caribbean forecast"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-white' : ''}`} />
            </button>

            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#0a1e3d] hover:bg-[#122e58] border border-[#1b3f73] text-xs text-white font-medium transition-all"
            >
              <span>{isExpanded ? 'Hide Details' : 'Outdoor Planner'}</span>
              {isExpanded ? (
                <ChevronUp className="w-3.5 h-3.5 text-blue-300" />
              ) : (
                <ChevronDown className="w-3.5 h-3.5 text-blue-300" />
              )}
            </button>
          </div>

        </div>

        {/* Expanded Activity & Outdoor Recommendation Panel */}
        {isExpanded && weather && (
          <div className="mt-3 pt-3 border-t border-[#183969] grid grid-cols-1 md:grid-cols-3 gap-4 pb-2 animate-fadeIn">
            
            {/* Outdoor Activity Tip */}
            <div className="bg-[#0a1e3d] border border-[#1b3f73] rounded-xl p-3 text-xs space-y-1.5 shadow-md">
              <div className="flex items-center gap-1.5 text-white font-bold uppercase tracking-wider text-[10px]">
                <Sparkles className="w-3.5 h-3.5 text-[#ef4444]" />
                Live Outdoor Activity Recommendation
              </div>
              <p className="text-white leading-relaxed font-medium">
                {weather.outdoorTip}
              </p>
              <p className="text-[11px] text-blue-200/80">
                {weather.conditionDescription}
              </p>
            </div>

            {/* Ocean & Surf Swell State */}
            <div className="bg-[#0a1e3d] border border-[#1b3f73] rounded-xl p-3 text-xs space-y-1.5 shadow-md">
              <div className="flex items-center gap-1.5 text-blue-300 font-bold uppercase tracking-wider text-[10px]">
                <Waves className="w-3.5 h-3.5 text-blue-400" />
                Coastal Waters & Sea State
              </div>
              <div className="font-semibold text-white">
                {weather.surfSeaStatus}
              </div>
              <div className="text-[11px] text-blue-200">
                Wind: {weather.windSpeed} km/h • Precipitation: {weather.precipitation} mm/h
              </div>
              {onAskWeatherQuestion && (
                <button
                  onClick={() =>
                    onAskWeatherQuestion(
                      `Given the current conditions in ${weather.locationName} (${weather.temperature}°C, ${weather.condition}, ${weather.windSpeed} km/h wind), what are the best outdoor activities, beach spots, or indoor backup options right now?`
                    )
                  }
                  className="text-[11px] text-[#ef4444] hover:underline flex items-center gap-1 font-bold pt-1"
                >
                  Ask WolabaGo what to do today ➔
                </button>
              )}
            </div>

            {/* 4-Day Caribbean Outlook */}
            <div className="bg-[#0a1e3d] border border-[#1b3f73] rounded-xl p-3 text-xs space-y-2 shadow-md">
              <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-blue-300">
                <span>4-Day Caribbean Outlook</span>
                <span className="text-white">{weather.locationName.split(' ')[0]}</span>
              </div>
              <div className="grid grid-cols-4 gap-1.5 text-center">
                {weather.forecast.map((fc, i) => (
                  <div key={i} className="bg-[#07172f] p-1.5 rounded-lg border border-[#1b3f73]">
                    <span className="text-[10px] font-semibold text-blue-200 block mb-0.5">
                      {fc.day}
                    </span>
                    <span className="text-xs font-bold text-white block">
                      {fc.maxTemp}°
                    </span>
                    <span className="text-[10px] text-blue-300 block truncate" title={fc.condition}>
                      {fc.condition}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
};
