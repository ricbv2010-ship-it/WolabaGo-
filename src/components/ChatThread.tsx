import React, { useEffect, useRef, useState } from 'react';
import { 
  Bot, 
  User, 
  Sparkles, 
  ExternalLink, 
  Copy, 
  Check, 
  Volume2, 
  VolumeX, 
  Search, 
  AlertCircle,
  Compass,
  ArrowRight
} from 'lucide-react';
import { ChatMessage, AppLanguage } from '../types';
import { WolabaBrand } from './WolabaBrand';
import { TRANSLATIONS } from '../i18n/languages';

interface ChatThreadProps {
  messages: ChatMessage[];
  isLoading: boolean;
  onSelectPrompt: (prompt: string) => void;
  currentLanguage?: AppLanguage;
}

export const ChatThread: React.FC<ChatThreadProps> = ({
  messages,
  isLoading,
  onSelectPrompt,
  currentLanguage = 'en',
}) => {
  const t = TRANSLATIONS[currentLanguage] || TRANSLATIONS.en;
  const bottomRef = useRef<HTMLDivElement>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [speakingId, setSpeakingId] = useState<string | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSpeak = (id: string, text: string) => {
    if (!('speechSynthesis' in window)) return;

    if (speakingId === id) {
      window.speechSynthesis.cancel();
      setSpeakingId(null);
      return;
    }

    window.speechSynthesis.cancel();
    // Strip markdown formatting for cleaner speech
    const cleanText = text
      .replace(/[*#_`>]/g, '')
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    utterance.onend = () => setSpeakingId(null);
    utterance.onerror = () => setSpeakingId(null);

    setSpeakingId(id);
    window.speechSynthesis.speak(utterance);
  };

  // Simple, elegant custom markdown parser
  const renderFormattedText = (content: string) => {
    const lines = content.split('\n');
    return lines.map((line, idx) => {
      // Heading 3
      if (line.startsWith('### ')) {
        return (
          <h4 key={idx} className="text-base font-bold text-blue-200 mt-3 mb-1 font-['Outfit']">
            {line.replace('### ', '')}
          </h4>
        );
      }
      // Heading 2
      if (line.startsWith('## ')) {
        return (
          <h3 key={idx} className="text-lg font-bold text-white mt-4 mb-2 pb-1 border-b border-[#CE1126]/50 font-['Outfit']">
            {line.replace('## ', '')}
          </h3>
        );
      }
      // Heading 1
      if (line.startsWith('# ')) {
        return (
          <h2 key={idx} className="text-xl font-extrabold text-white mt-4 mb-2 font-['Outfit']">
            {line.replace('# ', '')}
          </h2>
        );
      }
      // Bullet list items
      if (line.trim().startsWith('- ') || line.trim().startsWith('* ')) {
        const itemText = line.trim().substring(2);
        return (
          <div key={idx} className="flex items-start gap-2 my-1 pl-2">
            <span className="text-[#CE1126] font-bold mt-1 text-xs">•</span>
            <div className="flex-1 text-sm text-slate-100 leading-relaxed">
              {formatInline(itemText)}
            </div>
          </div>
        );
      }
      // Numbered list items
      const numberedMatch = line.trim().match(/^(\d+)\.\s+(.*)/);
      if (numberedMatch) {
        return (
          <div key={idx} className="flex items-start gap-2 my-1 pl-2">
            <span className="text-[#CE1126] font-bold text-xs min-w-[1.2rem]">
              {numberedMatch[1]}.
            </span>
            <div className="flex-1 text-sm text-slate-100 leading-relaxed">
              {formatInline(numberedMatch[2])}
            </div>
          </div>
        );
      }
      // Quotes
      if (line.startsWith('> ')) {
        return (
          <blockquote key={idx} className="border-l-2 border-[#CE1126] pl-3 py-1 my-2 bg-[#061427]/70 text-blue-100 italic text-sm rounded-r-lg">
            {formatInline(line.replace('> ', ''))}
          </blockquote>
        );
      }
      // Empty line spacer
      if (!line.trim()) {
        return <div key={idx} className="h-2" />;
      }
      // Standard paragraph
      return (
        <p key={idx} className="text-sm text-slate-100 leading-relaxed my-1">
          {formatInline(line)}
        </p>
      );
    });
  };

  const formatInline = (text: string) => {
    // Bold **text**
    const parts = text.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <strong key={i} className="font-bold text-white">
            {part.slice(2, -2)}
          </strong>
        );
      }
      // Italic *text*
      const subParts = part.split(/(\*[^*]+\*)/g);
      return subParts.map((sub, j) => {
        if (sub.startsWith('*') && sub.endsWith('*')) {
          return (
            <em key={j} className="italic text-blue-200">
              {sub.slice(1, -1)}
            </em>
          );
        }
        return sub;
      });
    });
  };

  return (
    <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Empty State / Welcome */}
      {messages.length === 0 && (
        <div className="max-w-2xl mx-auto my-6 text-center">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-tr from-[#002B7F] via-[#ffffff] to-[#CE1126] p-1 shadow-xl shadow-blue-950/80 mb-4">
            <div className="w-full h-full bg-[#07172f] rounded-xl flex items-center justify-center text-3xl">
              🇨🇷
            </div>
          </div>
          
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-['Outfit'] flex items-center justify-center gap-2 flex-wrap">
            <span>{t.chatWelcomeHeading}</span>
            {/* Green, Yellow, and Red ONLY in the name WolabaGo */}
            <WolabaBrand size="2xl" />
          </h2>
          
          <p className="mt-2 text-sm text-blue-100/90 max-w-lg mx-auto leading-relaxed">
            {t.chatWelcomeSub}
          </p>

          {/* Quick starter cards */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
            <button
              onClick={() => onSelectPrompt('Where can I get authentic Caribbean Rice and Beans cooked in fresh coconut milk? What are the best sodas in Puerto Viejo Centro vs on the Playa Negra bulevar?')}
              className="p-3.5 rounded-xl bg-[#0a1e3d] hover:bg-[#102b54] border border-[#1a3d6d] hover:border-[#CE1126]/60 transition-all group flex flex-col justify-between shadow-md"
            >
              <div>
                <span className="text-xs font-semibold text-[#ef4444] flex items-center gap-1 mb-1">
                  <Sparkles className="w-3 h-3 text-[#ef4444]" />
                  {t.chatPromptFoodTitle}
                </span>
                <p className="text-xs text-white font-medium">
                  {t.chatPromptFoodDesc}
                </p>
              </div>
              <span className="text-[11px] text-blue-300 flex items-center gap-1 mt-3 group-hover:translate-x-1 transition-transform">
                {t.chatPromptFoodBtn} <ArrowRight className="w-3 h-3" />
              </span>
            </button>

            <button
              onClick={() => onSelectPrompt('Design a realistic 1-day bicycle itinerary starting in Puerto Viejo down to Manzanillo: distances, swimming breaks, lunch spots, and return timing.')}
              className="p-3.5 rounded-xl bg-[#0a1e3d] hover:bg-[#102b54] border border-[#1a3d6d] hover:border-[#CE1126]/60 transition-all group flex flex-col justify-between shadow-md"
            >
              <div>
                <span className="text-xs font-semibold text-blue-300 flex items-center gap-1 mb-1">
                  <Compass className="w-3 h-3 text-blue-300" />
                  {t.chatPromptBikeTitle}
                </span>
                <p className="text-xs text-white font-medium">
                  {t.chatPromptBikeDesc}
                </p>
              </div>
              <span className="text-[11px] text-blue-300 flex items-center gap-1 mt-3 group-hover:translate-x-1 transition-transform">
                {t.chatPromptBikeBtn} <ArrowRight className="w-3 h-3" />
              </span>
            </button>

            <button
              onClick={() => onSelectPrompt('What are the top hidden trails and seasonal tropical fruit cycles in Talamanca? Tell me about the secret sea cave at Punta Uva and where to try fresh cacao fruit.')}
              className="p-3.5 rounded-xl bg-[#0a1e3d] hover:bg-[#102b54] border border-[#1a3d6d] hover:border-[#CE1126]/60 transition-all group flex flex-col justify-between shadow-md"
            >
              <div>
                <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1 mb-1">
                  <Sparkles className="w-3 h-3 text-emerald-400" />
                  {t.chatPromptWisdomTitle}
                </span>
                <p className="text-xs text-white font-medium">
                  {t.chatPromptWisdomDesc}
                </p>
              </div>
              <span className="text-[11px] text-blue-300 flex items-center gap-1 mt-3 group-hover:translate-x-1 transition-transform">
                {t.chatPromptWisdomBtn} <ArrowRight className="w-3 h-3" />
              </span>
            </button>

            <button
              onClick={() => onSelectPrompt('Give me a practical guide to visiting Cahuita National Park: Kelly Creek vs Puerto Vargas entrance, wildlife spotting tips, and coral snorkeling.')}
              className="p-3.5 rounded-xl bg-[#0a1e3d] hover:bg-[#102b54] border border-[#1a3d6d] hover:border-[#CE1126]/60 transition-all group flex flex-col justify-between shadow-md"
            >
              <div>
                <span className="text-xs font-semibold text-blue-300 flex items-center gap-1 mb-1">
                  <Compass className="w-3 h-3 text-blue-300" />
                  {t.chatPromptParkTitle}
                </span>
                <p className="text-xs text-white font-medium">
                  {t.chatPromptParkDesc}
                </p>
              </div>
              <span className="text-[11px] text-blue-300 flex items-center gap-1 mt-3 group-hover:translate-x-1 transition-transform">
                {t.chatPromptParkBtn} <ArrowRight className="w-3 h-3" />
              </span>
            </button>
          </div>
        </div>
      )}

      {/* Messages */}
      {messages.map((message) => {
        const isUser = message.role === 'user';
        return (
          <div
            key={message.id}
            className={`flex items-start gap-3 max-w-3xl ${
              isUser ? 'ml-auto flex-row-reverse' : 'mr-auto'
            }`}
          >
            {/* Avatar with Costa Rica Colors */}
            <div
              className={`w-8 h-8 rounded-xl shrink-0 flex items-center justify-center shadow-md ${
                isUser
                  ? 'bg-[#CE1126] text-white border border-red-400/50'
                  : 'bg-[#0d264e] text-blue-300 border border-[#2563eb]/60'
              }`}
            >
              {isUser ? <User className="w-4 h-4 text-white" /> : <Bot className="w-4 h-4 text-blue-200" />}
            </div>

            {/* Bubble Content */}
            <div
              className={`rounded-2xl p-4 sm:p-5 transition-all text-xs sm:text-sm ${
                isUser
                  ? 'bg-[#CE1126] text-white border border-red-400/40 shadow-lg shadow-red-950/40 max-w-[85%]'
                  : message.isError
                  ? 'bg-red-950/60 border border-red-700/80 text-red-100'
                  : 'bg-[#0a1e3d] border border-[#1b3f73] text-slate-100 shadow-xl shadow-blue-950/70 w-full'
              }`}
            >
              {/* Header / Info bar for Model */}
              {!isUser && !message.isError && (
                <div className="flex items-center justify-between pb-2 mb-3 border-b border-[#183969] text-[11px] text-blue-300">
                  <div className="flex items-center gap-1.5 font-medium">
                    <WolabaBrand size="xs" />
                    <span>•</span>
                    <span className="text-white font-semibold">Talamanca Specialist</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleCopy(message.id, message.content)}
                      className="p-1 rounded hover:bg-[#143769] text-blue-200 hover:text-white transition-colors"
                      title={copiedId === message.id ? t.chatCopied : t.chatCopy}
                    >
                      {copiedId === message.id ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                    {'speechSynthesis' in window && (
                      <button
                        onClick={() => handleSpeak(message.id, message.content)}
                        className="p-1 rounded hover:bg-[#143769] text-blue-200 hover:text-white transition-colors"
                        title={speakingId === message.id ? t.chatStop : t.chatListen}
                      >
                        {speakingId === message.id ? (
                          <VolumeX className="w-3.5 h-3.5 text-red-400 animate-pulse" />
                        ) : (
                          <Volume2 className="w-3.5 h-3.5" />
                        )}
                      </button>
                    )}
                  </div>
                </div>
              )}

              {/* Main Text Content */}
              <div className="space-y-1">
                {isUser ? (
                  <p className="whitespace-pre-wrap leading-relaxed text-white font-normal">{message.content}</p>
                ) : (
                  renderFormattedText(message.content)
                )}
              </div>

              {/* Verified Search Queries & Grounding Sources */}
              {!isUser && message.sources && message.sources.length > 0 && (
                <div className="mt-4 pt-3 border-t border-[#183969] space-y-2">
                  <div className="flex items-center gap-1.5 text-[11px] text-white font-bold">
                    <Search className="w-3.5 h-3.5 text-blue-300" />
                    <span>Verified Real-Time Sources via Google Search:</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {message.sources.map((source, sIdx) => {
                      let displayDomain = source.url;
                      try {
                        const parsed = new URL(source.url);
                        displayDomain = parsed.hostname.replace('www.', '');
                      } catch {
                        // fallback
                      }
                      return (
                        <a
                          key={sIdx}
                          href={source.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#07172f] hover:bg-[#122e58] border border-[#1f4986] text-[11px] text-white transition-colors shadow-sm"
                          title={source.title}
                        >
                          <span className="truncate max-w-[180px]">{source.title || displayDomain}</span>
                          <ExternalLink className="w-3 h-3 text-red-400 shrink-0" />
                        </a>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Search queries badge if any */}
              {!isUser && message.searchQueries && message.searchQueries.length > 0 && (
                <div className="mt-2 text-[10px] text-blue-300/80 italic flex items-center gap-1">
                  <span>Grounded query: "{message.searchQueries[0]}"</span>
                </div>
              )}
            </div>
          </div>
        );
      })}

      {/* Loading state indicator */}
      {isLoading && (
        <div className="flex items-start gap-3 mr-auto max-w-2xl">
          <div className="w-8 h-8 rounded-xl bg-[#0d264e] text-blue-300 border border-[#2563eb]/60 flex items-center justify-center shrink-0">
            <Bot className="w-4 h-4 text-white animate-spin" />
          </div>
          <div className="bg-[#0a1e3d] border border-[#1b3f73] rounded-2xl p-4 shadow-lg text-xs text-slate-100">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#CE1126] animate-ping" />
              <span className="font-semibold text-white">
                {t.chatInputThinking}
              </span>
            </div>
            <p className="text-[11px] text-blue-200 mt-1">
              {currentLanguage === 'es' 
                ? 'Verificando horarios, mareas y detalles locales de Talamanca en tiempo real.'
                : 'Verifying real-time schedules, tide notes, and local Caribbean details.'}
            </p>
          </div>
        </div>
      )}

      <div ref={bottomRef} />
    </div>
  );
};

