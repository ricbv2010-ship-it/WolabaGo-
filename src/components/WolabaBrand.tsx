import React from 'react';

interface WolabaBrandProps {
  className?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
  withDot?: boolean;
}

/**
 * WolabaBrand displays the "WolabaGo" brand name strictly with
 * Green, Yellow, and Red colors (Verde, Amarillo, Rojo solo en el nombre).
 * - "Wo": Vibrant Tropical Green (#22c55e)
 * - "laba": Sun Golden Yellow (#facc15)
 * - "Go": Caribbean Red (#ef4444)
 */
export const WolabaBrand: React.FC<WolabaBrandProps> = ({ 
  className = '', 
  size = 'md',
  withDot = false,
}) => {
  const sizeClasses = {
    xs: 'text-xs',
    sm: 'text-sm font-bold',
    md: 'text-base font-bold',
    lg: 'text-xl font-extrabold',
    xl: 'text-2xl font-extrabold',
    '2xl': 'text-3xl font-black',
    '3xl': 'text-4xl md:text-5xl font-black',
  }[size];

  return (
    <span className={`inline-flex items-baseline font-['Outfit'] font-black tracking-tight select-none ${sizeClasses} ${className}`}>
      <span className="text-[#22c55e] transition-colors hover:brightness-110">Wo</span>
      <span className="text-[#facc15] transition-colors hover:brightness-110">laba</span>
      <span className="text-[#ef4444] transition-colors hover:brightness-110">Go</span>
      {withDot && <span className="text-[#22c55e] ml-0.5">.</span>}
    </span>
  );
};

/**
 * CostaRicaFlagRibbon renders the exact official stripes of the Costa Rican flag:
 * Azul (1) - Blanco (1) - Rojo (2) - Blanco (1) - Azul (1)
 */
export const CostaRicaFlagRibbon: React.FC<{ className?: string; height?: string }> = ({ 
  className = '',
  height = 'h-1.5' 
}) => {
  return (
    <div className={`w-full flex ${height} overflow-hidden shadow-sm ${className}`} title="Costa Rica: Azul, Blanco y Rojo">
      <div className="flex-1 bg-[#002B7F]" />
      <div className="flex-1 bg-[#FFFFFF]" />
      <div className="flex-[2] bg-[#CE1126]" />
      <div className="flex-1 bg-[#FFFFFF]" />
      <div className="flex-1 bg-[#002B7F]" />
    </div>
  );
};
