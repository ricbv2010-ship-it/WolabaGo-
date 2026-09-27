import React, { useState, useMemo } from 'react';
import { 
  Luggage, 
  Check, 
  Sparkles, 
  Waves, 
  TreePine, 
  HeartHandshake, 
  RotateCcw, 
  Plus, 
  Trash2, 
  MessageSquare,
  Compass
} from 'lucide-react';
import { 
  BASE_PACKING_ITEMS, 
  SURFING_PACKING_ITEMS, 
  NATURE_PACKING_ITEMS, 
  CULTURE_PACKING_ITEMS, 
  PackingItem 
} from '../data/packingKnowledge';
import { WolabaBrand } from './WolabaBrand';

interface PackingChecklistProps {
  currentInterestsText: string;
  currentVibe: string;
  onAskWolabaGoAboutPacking: (itemsPrompt: string) => void;
}

export const PackingChecklist: React.FC<PackingChecklistProps> = ({
  currentInterestsText,
  currentVibe,
  onAskWolabaGoAboutPacking,
}) => {
  // Detect traveler interests from the active itinerary configuration
  const detectedInterests = useMemo(() => {
    const combined = `${currentInterestsText} ${currentVibe}`.toLowerCase();
    return {
      surfing: combined.includes('surf') || combined.includes('wave') || combined.includes('salsa brava') || combined.includes('cocles'),
      nature: combined.includes('nature') || combined.includes('wildlife') || combined.includes('sloth') || combined.includes('cahuita') || combined.includes('snorkel') || combined.includes('hike') || combined.includes('bird'),
      culture: combined.includes('culture') || combined.includes('bribri') || combined.includes('cacao') || combined.includes('calypso') || combined.includes('afro') || combined.includes('soda'),
    };
  }, [currentInterestsText, currentVibe]);

  // Manual interest toggle overrides
  const [activeTags, setActiveTags] = useState<{
    surfing: boolean;
    nature: boolean;
    culture: boolean;
  }>({
    surfing: true,
    nature: true,
    culture: true,
  });

  // Sync initially with detected interests
  React.useEffect(() => {
    setActiveTags({
      surfing: detectedInterests.surfing || true,
      nature: detectedInterests.nature || true,
      culture: detectedInterests.culture || true,
    });
  }, [detectedInterests]);

  // State of checked items
  const [checkedMap, setCheckedMap] = useState<Record<string, boolean>>({});
  const [customItems, setCustomItems] = useState<PackingItem[]>([]);
  const [newItemText, setNewItemText] = useState('');

  // Assemble the visible checklist
  const visibleItems = useMemo(() => {
    let items: Omit<PackingItem, 'packed'>[] = [...BASE_PACKING_ITEMS];
    if (activeTags.surfing) items = [...items, ...SURFING_PACKING_ITEMS];
    if (activeTags.nature) items = [...items, ...NATURE_PACKING_ITEMS];
    if (activeTags.culture) items = [...items, ...CULTURE_PACKING_ITEMS];
    return items;
  }, [activeTags]);

  const toggleItem = (id: string) => {
    setCheckedMap((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleAddCustomItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemText.trim()) return;
    const newItem: PackingItem = {
      id: `custom-${Date.now()}`,
      name: newItemText.trim(),
      reason: 'Custom traveler packing item',
      category: 'essential',
      packed: false,
    };
    setCustomItems((prev) => [...prev, newItem]);
    setNewItemText('');
  };

  const handleDeleteCustomItem = (id: string) => {
    setCustomItems((prev) => prev.filter((item) => item.id !== id));
  };

  // Progress metrics
  const totalCount = visibleItems.length + customItems.length;
  const packedCount = [
    ...visibleItems.map((i) => i.id),
    ...customItems.map((i) => i.id),
  ].filter((id) => checkedMap[id]).length;
  const progressPercent = totalCount > 0 ? Math.round((packedCount / totalCount) * 100) : 0;

  const handleConsultAssistant = () => {
    const activeCategories = [];
    if (activeTags.surfing) activeCategories.push('Surfing & Ocean conditions');
    if (activeTags.nature) activeCategories.push('Rainforest & Wildlife hiking');
    if (activeTags.culture) activeCategories.push('Bribri indigenous culture & Afro-Caribbean heritage');

    const prompt = `Review my Talamanca Packing & Prep checklist for my trip focusing on ${activeCategories.join(
      ', '
    )}. Here are the key gear items I have gathered:
- Base gear: ${BASE_PACKING_ITEMS.slice(0, 4).map((i) => i.name).join(', ')}
${activeTags.surfing ? `- Surf gear: ${SURFING_PACKING_ITEMS.map((i) => i.name).join(', ')}` : ''}
${activeTags.nature ? `- Wildlife gear: ${NATURE_PACKING_ITEMS.map((i) => i.name).join(', ')}` : ''}
${activeTags.culture ? `- Culture gear: ${CULTURE_PACKING_ITEMS.map((i) => i.name).join(', ')}` : ''}

What specific items might I still be missing considering local weather, tropical bugs, mud on the trails, and buying things locally in Puerto Viejo vs bringing from home?`;

    onAskWolabaGoAboutPacking(prompt);
  };

  const handleResetChecklist = () => {
    setCheckedMap({});
  };

  return (
    <div className="bg-[#0a1e3d] border border-[#1b3f73] rounded-2xl p-6 shadow-xl space-y-6">
      
      {/* Header & Badges */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#1b3f73]">
        <div>
          <div className="flex items-center gap-2 text-[#CE1126] text-xs font-bold uppercase tracking-wider mb-1">
            <Luggage className="w-4 h-4 text-[#ef4444]" />
            <span className="text-blue-200">Adaptive Gear & Field Prep</span>
          </div>
          <h3 className="text-xl font-bold text-white font-['Outfit']">
            Packing & Prep Checklist
          </h3>
          <p className="text-xs text-blue-100/90 mt-1 max-w-xl">
            Automatically curated items tailored to your focus in Talamanca. Toggle interests to expand specialized gear recommendations.
          </p>
        </div>

        {/* Progress Bar & Actions */}
        <div className="bg-[#07172f]/90 border border-[#1b3f73] rounded-xl p-3 text-xs shrink-0 min-w-[200px] space-y-2 shadow-md">
          <div className="flex items-center justify-between text-xs">
            <span className="text-blue-200 font-semibold">Packed Progress</span>
            <span className="font-bold text-white">
              {packedCount} / {totalCount} ({progressPercent}%)
            </span>
          </div>
          <div className="w-full h-2 rounded-full bg-[#07172f] border border-[#1b3f73] overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 via-white to-[#CE1126] transition-all duration-300 rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <div className="flex items-center justify-between pt-1">
            <button
              onClick={handleResetChecklist}
              className="text-[10px] text-blue-300 hover:text-white flex items-center gap-1 transition-colors"
            >
              <RotateCcw className="w-3 h-3" />
              Reset checks
            </button>
            <button
              onClick={handleConsultAssistant}
              className="text-[10px] text-[#ef4444] hover:text-red-300 font-bold flex items-center gap-1 transition-colors"
            >
              <Sparkles className="w-3 h-3" />
              Ask AI about packing
            </button>
          </div>
        </div>
      </div>

      {/* Interest Filter Tags (Auto-suggested & interactive) */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-bold uppercase tracking-wider text-blue-300 mr-1">
          Target Experiences:
        </span>

        <button
          type="button"
          onClick={() => setActiveTags((prev) => ({ ...prev, surfing: !prev.surfing }))}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
            activeTags.surfing
              ? 'bg-[#CE1126] text-white border-[#CE1126] shadow-md shadow-red-950/40'
              : 'bg-[#07172f] border-[#1b3f73] text-blue-200 hover:text-white'
          }`}
        >
          <Waves className="w-3.5 h-3.5" />
          <span>Surfing & Reefs ({SURFING_PACKING_ITEMS.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTags((prev) => ({ ...prev, nature: !prev.nature }))}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
            activeTags.nature
              ? 'bg-[#002B7F] text-white border-blue-400 shadow-md shadow-blue-950/40'
              : 'bg-[#07172f] border-[#1b3f73] text-blue-200 hover:text-white'
          }`}
        >
          <TreePine className="w-3.5 h-3.5" />
          <span>Nature & Wildlife ({NATURE_PACKING_ITEMS.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTags((prev) => ({ ...prev, culture: !prev.culture }))}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
            activeTags.culture
              ? 'bg-[#002B7F] text-white border-blue-400 shadow-md shadow-blue-950/40'
              : 'bg-[#07172f] border-[#1b3f73] text-blue-200 hover:text-white'
          }`}
        >
          <HeartHandshake className="w-3.5 h-3.5" />
          <span>Afro-Caribbean & Bribri Culture ({CULTURE_PACKING_ITEMS.length})</span>
        </button>
      </div>

      {/* Grid of Checklist Items */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {visibleItems.map((item) => {
          const isChecked = Boolean(checkedMap[item.id]);

          let categoryBadge = {
            label: 'Essential',
            color: 'bg-blue-950/80 text-blue-200 border-blue-700/50',
          };
          if (item.category === 'surfing') {
            categoryBadge = {
              label: 'Surfing',
              color: 'bg-[#CE1126]/20 text-red-200 border-[#CE1126]/50',
            };
          } else if (item.category === 'nature') {
            categoryBadge = {
              label: 'Nature',
              color: 'bg-blue-900/60 text-blue-200 border-blue-600/50',
            };
          } else if (item.category === 'culture') {
            categoryBadge = {
              label: 'Culture',
              color: 'bg-indigo-950/60 text-indigo-200 border-indigo-700/50',
            };
          }

          return (
            <div
              key={item.id}
              onClick={() => toggleItem(item.id)}
              className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-start gap-3 select-none ${
                isChecked
                  ? 'bg-[#07172f]/50 border-[#1b3f73]/50 opacity-60'
                  : 'bg-[#07172f] border-[#1b3f73] hover:border-blue-400/70 shadow-sm'
              }`}
            >
              {/* Checkbox */}
              <div
                className={`w-5 h-5 rounded-lg shrink-0 mt-0.5 flex items-center justify-center border transition-all ${
                  isChecked
                    ? 'bg-[#CE1126] border-[#CE1126] text-white'
                    : 'border-[#1b3f73] bg-[#0a1e3d]'
                }`}
              >
                {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1 mb-1">
                  <span
                    className={`text-xs font-bold leading-tight font-['Outfit'] ${
                      isChecked ? 'line-through text-slate-400' : 'text-white'
                    }`}
                  >
                    {item.name}
                  </span>
                  <span
                    className={`text-[9px] font-semibold uppercase px-1.5 py-0.5 rounded border shrink-0 ${categoryBadge.color}`}
                  >
                    {categoryBadge.label}
                  </span>
                </div>
                <p className="text-[11px] text-blue-200/80 leading-relaxed">
                  {item.reason}
                </p>
              </div>
            </div>
          );
        })}

        {/* Custom User Added Items */}
        {customItems.map((item) => {
          const isChecked = Boolean(checkedMap[item.id]);
          return (
            <div
              key={item.id}
              className={`p-3.5 rounded-xl border transition-all flex items-start gap-3 ${
                isChecked
                  ? 'bg-[#07172f]/50 border-[#1b3f73]/50 opacity-60'
                  : 'bg-[#07172f] border-blue-500/40 shadow-sm'
              }`}
            >
              <div
                onClick={() => toggleItem(item.id)}
                className={`w-5 h-5 rounded-lg shrink-0 mt-0.5 flex items-center justify-center border cursor-pointer ${
                  isChecked
                    ? 'bg-[#CE1126] border-[#CE1126] text-white'
                    : 'border-[#1b3f73] bg-[#0a1e3d]'
                }`}
              >
                {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
              </div>

              <div className="flex-1 min-w-0" onClick={() => toggleItem(item.id)}>
                <span
                  className={`text-xs font-bold block ${
                    isChecked ? 'line-through text-slate-400' : 'text-white'
                  }`}
                >
                  {item.name}
                </span>
                <span className="text-[10px] text-blue-300">Custom Item</span>
              </div>

              <button
                type="button"
                onClick={() => handleDeleteCustomItem(item.id)}
                className="text-blue-400 hover:text-red-400 p-1"
                title="Remove item"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          );
        })}
      </div>

      {/* Add Custom Item Form */}
      <form onSubmit={handleAddCustomItem} className="flex gap-2 max-w-md">
        <input
          type="text"
          value={newItemText}
          onChange={(e) => setNewItemText(e.target.value)}
          placeholder="Add custom gear item (e.g. Dry shampoo, GoPro mount)..."
          className="flex-1 bg-[#07172f] border border-[#1b3f73] rounded-xl px-3 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-blue-400"
        />
        <button
          type="submit"
          disabled={!newItemText.trim()}
          className="px-3.5 py-2 bg-[#CE1126] hover:bg-[#e0192e] disabled:opacity-50 text-white rounded-xl text-xs font-semibold flex items-center gap-1 transition-colors shadow-md"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add</span>
        </button>
      </form>

      {/* Bottom Advice Strip */}
      <div className="bg-[#07172f]/90 border border-[#1b3f73] rounded-xl p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs shadow-md">
        <div className="flex items-center gap-2 text-blue-200">
          <Compass className="w-4 h-4 text-[#ef4444] shrink-0" />
          <span>
            <strong>Local Tip:</strong> Most pharmacy staples, organic repellent, and surf wax are available in Puerto Viejo Centro, but specialty electronics, reef booties, and prescription binoculars are best brought from home.
          </span>
        </div>
        <button
          type="button"
          onClick={handleConsultAssistant}
          className="px-3 py-1.5 rounded-lg bg-[#0a1e3d] hover:bg-[#122e58] border border-[#1b3f73] hover:border-[#CE1126]/60 text-white font-medium shrink-0 flex items-center gap-1.5 transition-colors shadow-sm"
        >
          <MessageSquare className="w-3.5 h-3.5 text-blue-300" />
          <span>Discuss with <WolabaBrand size="xs" /></span>
        </button>
      </div>

    </div>
  );
};
