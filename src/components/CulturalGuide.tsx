import React from 'react';
import { 
  BookOpen, 
  Sparkles, 
  Heart, 
  ShieldAlert, 
  Sun, 
  Music, 
  ArrowRight
} from 'lucide-react';
import { GLOSSARY_ITEMS } from '../data/localKnowledge';
import { WolabaBrand } from './WolabaBrand';

interface CulturalGuideProps {
  onAskQuestion: (question: string) => void;
}

export const CulturalGuide: React.FC<CulturalGuideProps> = ({ onAskQuestion }) => {
  return (
    <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-6 max-w-6xl mx-auto w-full space-y-8">
      
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-[#07172f] via-[#0b2146] to-[#0e2a56] border border-[#1b3f73] rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10">
          <div className="flex items-center gap-2 text-[#CE1126] text-xs font-bold uppercase tracking-wider mb-1">
            <BookOpen className="w-4 h-4 text-[#ef4444]" />
            <span className="text-blue-200">Caribbean Heritage & Practical Intelligence</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-['Outfit']">
            Culture, Language & Ocean Safety Guide
          </h2>
          <p className="text-sm text-blue-100/90 mt-1 max-w-2xl leading-relaxed">
            The South Caribbean is distinct from the rest of Costa Rica — a tapestry of Bribri and Cabécar indigenous heritage, 19th-century Jamaican and Afro-Caribbean settlements, and raw tropical nature.
          </p>
        </div>
      </div>

      {/* Section 1: Afro-Caribbean & Bribri Heritage */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Afro-Caribbean Culture */}
        <div className="bg-[#0a1e3d] border border-[#1b3f73] rounded-2xl p-6 shadow-lg space-y-4 hover:border-[#CE1126]/40 transition-colors">
          <div className="flex items-center gap-2 text-white">
            <Music className="w-5 h-5 text-[#ef4444]" />
            <h3 className="text-lg font-bold text-white font-['Outfit']">
              Afro-Caribbean Heritage & Calypso
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
            In the late 1800s, Afro-descendant families primarily from Jamaica and the Antilles arrived on the Talamanca coast, bringing English-creole language (Mekatelyu), timber stilt architecture, culinary mastery (slow-simmered coconut milk, thyme, habanero peppers), and Calypso music.
          </p>
          <div className="p-3.5 rounded-xl bg-[#07172f] border border-[#1b3f73] text-xs text-blue-200 space-y-1">
            <div className="font-semibold text-white">Walter "Mr. Gavitt" Ferguson:</div>
            <p className="text-blue-200/90">
              The king of Calypso Limonense lived in Cahuita until age 103 (1919-2023), recording legendary tape cassettes like "Cabin in the Wata" and "Monilia" without ever leaving his hometown.
            </p>
          </div>
          <button
            onClick={() => onAskQuestion('Tell me about the history of Walter Ferguson, Calypso music in Cahuita, and where to hear live Caribbean music today.')}
            className="text-xs text-white hover:text-blue-200 font-semibold flex items-center gap-1.5 mt-2 group"
          >
            <span>Ask <WolabaBrand size="xs" /> about Calypso music & legacy</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#ef4444] group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Bribri & Cabécar Indigenous Culture */}
        <div className="bg-[#0a1e3d] border border-[#1b3f73] rounded-2xl p-6 shadow-lg space-y-4 hover:border-[#CE1126]/40 transition-colors">
          <div className="flex items-center gap-2 text-white">
            <Heart className="w-5 h-5 text-[#ef4444]" />
            <h3 className="text-lg font-bold text-white font-['Outfit']">
              Bribri & Cabécar Indigenous Cosmovision
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
            Talamanca is the ancestral home of the Bribri and Cabécar peoples, who maintain their matrilineal clan system, spoken Chibchan languages, and reverent connection to nature governed by creator god <strong>Sibö</strong>.
          </p>
          <div className="p-3.5 rounded-xl bg-[#07172f] border border-[#1b3f73] text-xs text-blue-200 space-y-1">
            <div className="font-semibold text-white">Sacred Usuré & Cacao:</div>
            <p className="text-blue-200/90">
              Cacao (Tsirö) is revered not as a commodity, but as a sacred ancestral woman transformed by Sibö. Never enter a traditional Usuré without an invited Bribri guide.
            </p>
          </div>
          <button
            onClick={() => onAskQuestion('What are the cultural etiquette rules for visiting a Bribri indigenous community in Talamanca, and how can I support women-led cooperatives like Acomuita?')}
            className="text-xs text-white hover:text-blue-200 font-semibold flex items-center gap-1.5 mt-2 group"
          >
            <span>Learn Bribri etiquette with <WolabaBrand size="xs" /></span>
            <ArrowRight className="w-3.5 h-3.5 text-[#ef4444] group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

      </div>

      {/* Section 2: Mekatelyu Language & Local Glossary */}
      <div className="bg-[#0a1e3d] border border-[#1b3f73] rounded-2xl p-6 shadow-lg space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-white">
            <Sparkles className="w-5 h-5 text-[#ef4444]" />
            <h3 className="text-lg font-bold text-white font-['Outfit']">
              Local Glossary: Mekatelyu & Caribbean Terms
            </h3>
          </div>
          <span className="text-xs text-blue-300 font-medium">8 Essential Terms</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
          {GLOSSARY_ITEMS.map((item, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-xl bg-[#07172f]/90 border border-[#1b3f73] hover:border-blue-400/50 transition-colors"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-bold text-white font-['Outfit']">
                  {item.term}
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#0a1e3d] text-blue-200 border border-[#1b3f73]">
                  {item.origin}
                </span>
              </div>
              <p className="text-xs text-slate-200 font-medium mb-1">
                {item.meaning}
              </p>
              <p className="text-[11px] text-blue-300/80 italic">
                {item.context}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Section 3: Weather Reality & Microclimate */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Weather Patterns */}
        <div className="bg-[#0a1e3d] border border-[#1b3f73] rounded-2xl p-6 shadow-lg space-y-3">
          <div className="flex items-center gap-2 text-white">
            <Sun className="w-5 h-5 text-blue-400" />
            <h3 className="text-lg font-bold text-white font-['Outfit']">
              Caribbean Microclimate Reality
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-blue-100/90 leading-relaxed">
            The Caribbean coast of Costa Rica does <strong>not</strong> follow the Pacific dry/rainy seasons:
          </p>
          <ul className="text-xs text-slate-200 space-y-2">
            <li className="flex items-start gap-2">
              <span className="text-[#CE1126] font-bold">•</span>
              <span>
                <strong>September & October:</strong> The "Caribbean Summer". While the Pacific experiences heavy rains, the Caribbean enjoys its calmest, sunniest waters — ideal for snorkeling in Cahuita and Punta Uva.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#CE1126] font-bold">•</span>
              <span>
                <strong>November to January:</strong> Swell season. Bigger waves for Salsa Brava and Cocles; intermittent tropical showers that keep the rainforest lush.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#CE1126] font-bold">•</span>
              <span>
                <strong>Tropical Showers:</strong> Rain usually happens in fast, heavy bursts, clearing quickly into bright warmth. Always carry a dry bag for phones.
              </span>
            </li>
          </ul>
        </div>

        {/* Ocean & Rip Current Safety */}
        <div className="bg-[#0a1e3d] border border-[#1b3f73] rounded-2xl p-6 shadow-lg space-y-3">
          <div className="flex items-center gap-2 text-white">
            <ShieldAlert className="w-5 h-5 text-[#ef4444]" />
            <h3 className="text-lg font-bold text-white font-['Outfit']">
              Ocean & Safety Guidelines
            </h3>
          </div>
          <ul className="text-xs text-slate-200 space-y-2.5">
            <li className="flex items-start gap-2">
              <span className="text-[#CE1126] font-bold">•</span>
              <span>
                <strong>Rip Currents at Playa Cocles:</strong> Cocles has powerful sandbar breaks and dangerous rip currents. Swim only between the flags when lifeguards are present.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#CE1126] font-bold">•</span>
              <span>
                <strong>Salsa Brava Reef:</strong> Do not paddle out to Salsa Brava unless you are an expert surfer with reef booties; the fire coral shelf is razor-sharp and very shallow.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#CE1126] font-bold">•</span>
              <span>
                <strong>Night Bike Riding:</strong> Route 256 is largely unlit. Always rent a bicycle with a functioning front headlight and rear reflector, and ride defensively.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#CE1126] font-bold">•</span>
              <span>
                <strong>Cash vs Cards:</strong> While hotels and modern restaurants take cards, local fruit stands, authentic sodas, and tuk-tuks require Costa Rican Colones or US Dollars cash. ATMs exist at Banco de Costa Rica and Banco Nacional in Puerto Viejo.
              </span>
            </li>
          </ul>
        </div>

      </div>

    </div>
  );
};
