import React, { useState, useEffect } from 'react';
import { X, Trash, ClipboardCopy, Instagram, Calendar, Star, FileText } from 'lucide-react';
import { SavedConcept } from '../types';
import { PHONE_NUMBER, COLOR_THEMES } from '../data';
import { motion } from 'motion/react';

interface SavedConceptsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  // Triggered when items are refreshed or deleted
  onRefresh: () => void;
}

export default function SavedConceptsDrawer({ isOpen, onClose, onRefresh }: SavedConceptsDrawerProps) {
  const [concepts, setConcepts] = useState<SavedConcept[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      loadConcepts();
    }
  }, [isOpen]);

  const loadConcepts = () => {
    try {
      const savedRaw = localStorage.getItem('hampers_saved_concepts');
      if (savedRaw) {
        setConcepts(JSON.parse(savedRaw));
      } else {
        setConcepts([]);
      }
    } catch (e) {
      console.warn("Storage error: ", e);
    }
  };

  const handleDelete = (id: string) => {
    try {
      const filtered = concepts.filter(c => c.id !== id);
      localStorage.setItem('hampers_saved_concepts', JSON.stringify(filtered));
      setConcepts(filtered);
      onRefresh(); // trigger count refresh in Header
    } catch (e) {
      console.warn(e);
    }
  };

  const handleClearAll = () => {
    if (window.confirm("Are you sure you want to clear all your saved design concepts?")) {
      localStorage.removeItem('hampers_saved_concepts');
      setConcepts([]);
      onRefresh();
    }
  };

  const compileText = (state: SavedConcept['plannerState']): string => {
    const selectedTheme = COLOR_THEMES.find(t => t.id === state.colorTheme) || COLOR_THEMES[0];
    const accentsString = state.additionalAccents.length > 0 
      ? state.additionalAccents.map(acc => `  • ${acc}`).join("\n") 
      : "  • Standard wrapping accent";

    return `✨ *HAMPERS_4_YOU | Saved Concept Request* ✨\n` +
      `──────────────────────────\n` +
      `🌸 *Service Type:* ${state.serviceType}\n` +
      `🎨 *Color Palette:* ${selectedTheme.name}\n` +
      `📦 *Packaging Casing:* ${state.wrappingStyle}\n` +
      `👥 *Dedicated Name(s):* ${state.recipientNames || "None"}\n` +
      `📜 *Vows text:* ${state.customEngravingText ? `"${state.customEngravingText}"` : "None"}\n` +
      `💎 *Budget Grade:* ${state.estimatedBudget}\n` +
      `🌟 *Premium Accents:* \n${accentsString}\n` +
      `✍️ *Founder Brief/Notes:* ${state.notes || "None"}\n` +
      `──────────────────────────\n` +
      `Let me know your pricing guidelines! Thank you.`;
  };

  const handleInstagramSend = (item: SavedConcept) => {
    const text = compileText(item.plannerState);
    navigator.clipboard.writeText(text).then(() => {
      alert("Exquisite saved concept brief copied to clipboard! Opening Instagram DM window so you can paste your configurations to the Creative Head immediately.");
    });
    window.open("https://ig.me/m/hampers_4_you_by_tasdiqa", '_blank');
  };

  const handleCopy = (item: SavedConcept) => {
    const text = compileText(item.plannerState);
    navigator.clipboard.writeText(text).then(() => {
      setCopiedId(item.id);
      setTimeout(() => setCopiedId(null), 2000);
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" id="saved-drawer-overlay">
      {/* Dark overlay backdrop */}
      <div 
        className="absolute inset-0 bg-[#2D2A26]/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        id="saved-drawer-backdrop"
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex">
        <motion.div 
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="w-screen max-w-md bg-[#FAF8F5] border-l border-[#EADFC9] flex flex-col shadow-2xl relative h-full"
          id="saved-drawer-container"
        >
          {/* Drawer Header */}
          <div className="p-6 border-b border-[#EADFC9]/50 flex justify-between items-center bg-[#FDFBF7]">
            <div className="text-left">
              <h3 className="font-serif text-lg font-bold text-[#2D2A26]">My Saved Gifting Concepts</h3>
              <p className="text-[10px] font-sans text-[#8C8377] uppercase tracking-widest mt-1">Review your customized designs</p>
            </div>
            <button
              onClick={onClose}
              id="drawer-close-btn"
              className="p-1 text-[#2D2A26] hover:text-[#AF9467] rounded-full transition-colors focus:outline-none"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Drawer Body content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4" id="drawer-scroll-body">
            {concepts.length > 0 ? (
              concepts.map((item) => {
                const state = item.plannerState;
                const themeVal = COLOR_THEMES.find(t => t.id === state.colorTheme) || COLOR_THEMES[0];
                return (
                  <div 
                    key={item.id}
                    id={`saved-card-${item.id}`}
                    className="bg-white border border-[#EBDCC5] rounded p-4 text-left space-y-3 shadow-sm hover:border-[#AF9467] transition-all relative"
                  >
                    {/* Timestamp & Type header */}
                    <div className="flex justify-between items-center text-[10px] font-sans text-[#8C8377] pb-2 border-b border-[#F4EFE6]">
                      <span className="flex items-center space-x-1">
                        <Calendar className="h-3 w-3 text-[#AF9467]" />
                        <span>{item.timestamp}</span>
                      </span>
                      <button 
                        onClick={() => handleDelete(item.id)}
                        id={`del-concept-${item.id}`}
                        className="text-red-500 hover:text-red-700 transition-colors flex items-center space-x-1"
                        title="Delete Concept Draft"
                      >
                        <Trash className="h-3.5 w-3.5" />
                      </button>
                    </div>

                    {/* Main Specs representation */}
                    <div className="space-y-1.5 text-xs">
                      <p className="font-serif font-bold text-[#2D2A26] text-sm">{state.serviceType}</p>
                      
                      <div className="grid grid-cols-2 gap-2 text-[11px] text-[#544F49]">
                        <div>
                          <span className="text-[#8C8377] uppercase tracking-widest text-[8px] block">Themes Color</span>
                          <span className="font-medium flex items-center space-x-1">
                            <span className="w-2.5 h-2.5 rounded-full inline-block border border-gray-300 shrink-0" style={{ backgroundColor: themeVal.hex }} />
                            <span>{themeVal.name.split(' & ')[0]}</span>
                          </span>
                        </div>
                        <div>
                          <span className="text-[#8C8377] uppercase tracking-widest text-[8px] block">Casing Style</span>
                          <span className="font-medium truncate block">{state.wrappingStyle}</span>
                        </div>
                      </div>

                      {state.recipientNames && (
                        <div className="pt-1.5 border-t border-[#F5EFE4]/50">
                          <span className="text-[#8C8377] uppercase tracking-widest text-[8px] block">Couple Names</span>
                          <p className="font-serif italic font-semibold text-[#AF9467]">“{state.recipientNames}”</p>
                        </div>
                      )}
                    </div>

                    {/* Action buttons row */}
                    <div className="pt-2 border-t border-[#F5EFE4] grid grid-cols-2 gap-2">
                      <button
                        onClick={() => handleCopy(item)}
                        id={`copy-concept-${item.id}`}
                        className="py-2 border border-[#EBDCC5] hover:bg-[#FAF8F5] text-[10px] font-sans tracking-widest uppercase rounded flex items-center justify-center space-x-1"
                      >
                        <ClipboardCopy className="h-3.5 w-3.5 text-gray-500" />
                        <span>{copiedId === item.id ? "Copied!" : "Copy Details"}</span>
                      </button>
                      <button
                        onClick={() => handleInstagramSend(item)}
                        id={`send-concept-${item.id}`}
                        className="py-2 bg-[#2D2A26] hover:bg-[#AF9467] text-white text-[10px] font-sans tracking-widest uppercase rounded flex items-center justify-center space-x-1 cursor-pointer"
                      >
                        <Instagram className="h-3.5 w-3.5" />
                        <span>Inquire IG</span>
                      </button>
                    </div>

                  </div>
                );
              })
            ) : (
              <div className="py-20 text-center space-y-3" id="drawer-empty-state">
                <FileText className="h-10 w-10 text-[#AF9467]/30 mx-auto" />
                <p className="font-serif text-base font-bold text-[#2D2A26]">No customized concepts saved.</p>
                <p className="text-xs text-[#8C8377] max-w-xs mx-auto">
                  Adjust wrapping, ribbons, and custom text in our interactive Design Planner and click "Save to Wishlist" to store drafts.
                </p>
              </div>
            )}
          </div>

          {/* Drawer Footer controls */}
          {concepts.length > 0 && (
            <div className="p-6 border-t border-[#EADFC9]/50 bg-[#FAF8F5]">
              <button
                onClick={handleClearAll}
                id="clear-all-concepts"
                className="w-full text-center py-3 border border-red-200 text-red-600 hover:bg-red-50 text-xs font-sans tracking-widest uppercase rounded transition-colors"
              >
                Clear All Saved Concepts
              </button>
            </div>
          )}

        </motion.div>
      </div>
    </div>
  );
}
