import React from 'react';
import { X, Check, Compass, Bike, DollarSign, Users, Calendar } from 'lucide-react';
import { TravelerProfile } from '../types';
import { WolabaBrand, CostaRicaFlagRibbon } from './WolabaBrand';

interface TravelerProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: TravelerProfile;
  onSaveProfile: (profile: TravelerProfile) => void;
}

export const TravelerProfileModal: React.FC<TravelerProfileModalProps> = ({
  isOpen,
  onClose,
  profile,
  onSaveProfile,
}) => {
  const [draft, setDraft] = React.useState<TravelerProfile>(profile);

  React.useEffect(() => {
    setDraft(profile);
  }, [profile, isOpen]);

  if (!isOpen) return null;

  const styles = [
    'Adventure & Surf',
    'Nature & Wildlife',
    'Cultural Immersion',
    'Slow & Relaxed',
    'Backpacker',
    'Family',
  ] as const;

  const durations = ['1-2 Days', '3-4 Days', '5-7 Days', '10+ Days'] as const;

  const transports = [
    'Cruiser Bicycle',
    'MEPE Bus & Walking',
    'Rental Car',
    'Tuk-Tuk & Shuttles',
  ] as const;

  const budgets = ['Budget / Sodas', 'Moderate', 'Comfort / Boutique'] as const;

  const groups = ['Solo', 'Couple', 'Friends', 'Family with Kids'] as const;

  const handleSave = () => {
    onSaveProfile(draft);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fadeIn">
      <div className="bg-[#0a1e3d] border border-[#1b3f73] rounded-2xl max-w-lg w-full shadow-2xl text-blue-100 max-h-[90vh] overflow-hidden flex flex-col">
        <CostaRicaFlagRibbon height="h-1.5" />

        <div className="p-6 overflow-y-auto space-y-4">
          <div className="flex items-center justify-between pb-4 border-b border-[#1b3f73]">
            <div className="flex items-center gap-2">
              <Compass className="w-5 h-5 text-[#ef4444]" />
              <h2 className="text-lg font-bold text-white font-['Outfit']">
                Your Talamanca Traveler Profile
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-blue-300 hover:text-white hover:bg-blue-900/40 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <p className="text-xs text-blue-200/90 leading-relaxed">
            <WolabaBrand size="xs" /> uses this context to tailor travel times, bicycle feasibility along Route 256, realistic soda/dining costs, and custom recommendations.
          </p>

          <div className="space-y-4 text-xs">
            {/* Travel Style */}
            <div>
              <label className="font-semibold text-white flex items-center gap-1.5 mb-2">
                <Compass className="w-4 h-4 text-[#ef4444]" />
                Travel Vibe & Style
              </label>
              <div className="grid grid-cols-2 gap-2">
                {styles.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setDraft({ ...draft, style: s })}
                    className={`p-2.5 rounded-xl text-left border transition-all ${
                      draft.style === s
                        ? 'bg-[#CE1126] border-[#CE1126] text-white font-bold shadow-md shadow-red-950/60'
                        : 'bg-[#07172f] border-[#1b3f73] text-blue-200 hover:border-blue-400 hover:text-white'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Duration */}
            <div>
              <label className="font-semibold text-white flex items-center gap-1.5 mb-2">
                <Calendar className="w-4 h-4 text-blue-400" />
                Duration of Stay in South Caribbean
              </label>
              <div className="grid grid-cols-4 gap-2">
                {durations.map((d) => (
                  <button
                    key={d}
                    type="button"
                    onClick={() => setDraft({ ...draft, duration: d })}
                    className={`p-2 rounded-xl text-center border transition-all ${
                      draft.duration === d
                        ? 'bg-[#CE1126] border-[#CE1126] text-white font-bold shadow-md shadow-red-950/60'
                        : 'bg-[#07172f] border-[#1b3f73] text-blue-200 hover:border-blue-400 hover:text-white'
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>

            {/* Transport */}
            <div>
              <label className="font-semibold text-white flex items-center gap-1.5 mb-2">
                <Bike className="w-4 h-4 text-[#ef4444]" />
                Primary Mode of Transportation
              </label>
              <div className="grid grid-cols-2 gap-2">
                {transports.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setDraft({ ...draft, transport: t })}
                    className={`p-2.5 rounded-xl text-left border transition-all ${
                      draft.transport === t
                        ? 'bg-[#CE1126] border-[#CE1126] text-white font-bold shadow-md shadow-red-950/60'
                        : 'bg-[#07172f] border-[#1b3f73] text-blue-200 hover:border-blue-400 hover:text-white'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Budget & Group */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="font-semibold text-white flex items-center gap-1.5 mb-2">
                  <DollarSign className="w-4 h-4 text-blue-400" />
                  Budget Preference
                </label>
                <div className="space-y-1.5">
                  {budgets.map((b) => (
                    <button
                      key={b}
                      type="button"
                      onClick={() => setDraft({ ...draft, budgetLevel: b })}
                      className={`w-full p-2.5 rounded-xl text-left border transition-all ${
                        draft.budgetLevel === b
                          ? 'bg-[#CE1126] border-[#CE1126] text-white font-bold shadow-md shadow-red-950/60'
                          : 'bg-[#07172f] border-[#1b3f73] text-blue-200 hover:border-blue-400 hover:text-white'
                      }`}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="font-semibold text-white flex items-center gap-1.5 mb-2">
                  <Users className="w-4 h-4 text-[#ef4444]" />
                  Travel Group
                </label>
                <div className="space-y-1.5">
                  {groups.map((g) => (
                    <button
                      key={g}
                      type="button"
                      onClick={() => setDraft({ ...draft, group: g })}
                      className={`w-full p-2.5 rounded-xl text-left border transition-all ${
                        draft.group === g
                          ? 'bg-[#CE1126] border-[#CE1126] text-white font-bold shadow-md shadow-red-950/60'
                          : 'bg-[#07172f] border-[#1b3f73] text-blue-200 hover:border-blue-400 hover:text-white'
                      }`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 flex justify-end gap-2 border-t border-[#1b3f73]">
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-xs text-blue-300 hover:text-white hover:bg-blue-900/40 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-5 py-2 rounded-xl text-xs font-bold bg-[#CE1126] hover:bg-[#e0192e] text-white shadow-lg shadow-red-950/70 flex items-center gap-1.5 transition-colors"
              >
                <Check className="w-4 h-4" />
                Apply Preferences
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
