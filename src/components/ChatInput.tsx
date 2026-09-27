import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, SlidersHorizontal, CornerDownLeft } from 'lucide-react';
import { QUICK_PROMPTS } from '../data/localKnowledge';
import { TravelerProfile, AppLanguage } from '../types';
import { TRANSLATIONS } from '../i18n/languages';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
  travelerProfile: TravelerProfile;
  onOpenProfile: () => void;
  currentLanguage?: AppLanguage;
}

export const ChatInput: React.FC<ChatInputProps> = ({
  onSendMessage,
  isLoading,
  travelerProfile,
  onOpenProfile,
  currentLanguage = 'en',
}) => {
  const t = TRANSLATIONS[currentLanguage] || TRANSLATIONS.en;
  const [text, setText] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (!isLoading && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [isLoading]);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!text.trim() || isLoading) return;
    onSendMessage(text.trim());
    setText('');
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handlePromptClick = (prompt: string) => {
    onSendMessage(prompt);
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
    e.target.style.height = 'auto';
    e.target.style.height = `${Math.min(e.target.scrollHeight, 140)}px`;
  };

  const getTranslatedPrompt = (item: typeof QUICK_PROMPTS[0]) => {
    if (currentLanguage === 'es') {
      if (item.label.includes('Rice & Beans')) return { label: '🍚 Rice & Beans', prompt: '¿Dónde puedo comer auténtico Rice and Beans en Puerto Viejo Centro vs Playa Negra?' };
      if (item.label.includes('Bike')) return { label: '🚲 Alquiler de Bicis', prompt: '¿Cuáles son las distancias y mejores paradas en bicicleta playera de Puerto Viejo a Manzanillo?' };
      if (item.label.includes('Cahuita')) return { label: '🐒 Parque Cahuita', prompt: '¿Cuál es la diferencia entre la entrada de Kelly Creek y Puerto Vargas en el Parque Nacional Cahuita?' };
      if (item.label.includes('Salsa Brava')) return { label: '🏄 Surf Salsa Brava', prompt: '¿Cuáles son los requisitos de marea y precauciones para surfear en Salsa Brava y Cocles?' };
      if (item.label.includes('Bribri')) return { label: '🍫 Cacao Bribri', prompt: '¿Cómo puedo visitar una comunidad Bribri y cooperativa de cacao tradicional en Talamanca?' };
      if (item.label.includes('Tides')) return { label: '🌊 Mareas y Resacas', prompt: '¿Cuáles son los horarios de marea y playas con corrientes de resaca peligrosas en Cocles?' };
    }
    return item;
  };

  return (
    <div className="bg-[#07172f]/95 border-t border-[#183969] p-3 sm:p-4 backdrop-blur-md shadow-xl">
      <div className="max-w-4xl mx-auto space-y-2">
        {/* Quick Suggestions Chips Bar */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
          <span className="text-[10px] uppercase tracking-wider text-blue-300 font-bold shrink-0 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-[#CE1126]" />
            {t.chatQuickChipsTitle}
          </span>
          {QUICK_PROMPTS.map((rawItem, idx) => {
            const item = getTranslatedPrompt(rawItem);
            return (
              <button
                key={idx}
                onClick={() => handlePromptClick(item.prompt)}
                disabled={isLoading}
                className="px-2.5 py-1 rounded-full bg-[#0a1e3d] hover:bg-[#122e58] border border-[#1b3f73] hover:border-[#CE1126]/60 text-slate-200 hover:text-white transition-all whitespace-nowrap text-xs disabled:opacity-50 shadow-sm"
              >
                {item.label}
              </button>
            );
          })}
        </div>

        {/* Input Container */}
        <form onSubmit={handleSubmit} className="relative">
          <div className="flex items-end gap-2 bg-[#0a1e3d] border border-[#1b3f73] focus-within:border-blue-400 rounded-2xl p-2 shadow-inner transition-colors">
            
            <textarea
              ref={textareaRef}
              value={text}
              onChange={handleTextareaChange}
              onKeyDown={handleKeyDown}
              placeholder={t.chatInputPlaceholder}
              rows={1}
              disabled={isLoading}
              className="flex-1 bg-transparent text-white placeholder-slate-400 text-sm focus:outline-none resize-none px-2 py-1 max-h-32 min-h-[36px]"
            />

            <div className="flex items-center gap-1.5 shrink-0 pb-0.5">
              <button
                type="button"
                onClick={onOpenProfile}
                className="hidden sm:flex items-center gap-1 p-1.5 rounded-lg text-blue-300 hover:text-white hover:bg-blue-900/40 text-xs transition-colors"
                title={t.navCustomProfile}
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
              </button>

              <button
                type="submit"
                disabled={!text.trim() || isLoading}
                className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 justify-center cursor-pointer ${
                  text.trim() && !isLoading
                    ? 'bg-[#CE1126] hover:bg-[#e0192e] text-white shadow-md shadow-red-950/80 font-bold active:scale-95'
                    : 'bg-[#061427] text-slate-500 cursor-not-allowed'
                }`}
                title="Send message"
              >
                <span className="text-xs font-bold hidden sm:inline">{t.chatInputSend}</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </form>

        {/* Travel Context Footer */}
        <div className="flex items-center justify-between text-[11px] text-blue-300/80 px-1">
          <div className="flex items-center gap-2">
            <span>{currentLanguage === 'es' ? 'Contexto de Viaje:' : 'Context:'}</span>
            <button
              onClick={onOpenProfile}
              className="text-white hover:underline font-semibold"
            >
              {travelerProfile.style} • {travelerProfile.transport} • {travelerProfile.duration}
            </button>
          </div>
          <span className="hidden sm:inline text-blue-400/60">
            {currentLanguage === 'es' ? 'Presiona Enter ↵ para enviar' : 'Press Enter ↵ to send'}
          </span>
        </div>
      </div>
    </div>
  );
};
