import React, { useState, useEffect } from 'react';
import { Sparkles, Palette, Check, Save, Share2, ClipboardList, Send, Trash, Bookmark, RefreshCw, Feather, Instagram } from 'lucide-react';
import { COLOR_THEMES, BRAND_NAME, PHONE_NUMBER } from '../data';
import { PlannerState, SavedConcept } from '../types';
import { motion, AnimatePresence } from 'motion/react';

interface CustomPlannerProps {
  initialServiceId: string;
  onConceptsUpdated: (count: number) => void;
  // Trigger to scroll or toggle saved Concepts drawer
  onOpenSavedDrawer: () => void;
}

const INITIAL_STATE: PlannerState = {
  serviceType: "Luxury Customized Hamper",
  colorTheme: "royal_ivory",
  wrappingStyle: "Premium Heavy Textured Linen Gift Chest",
  additionalAccents: ["Hand-written Custom Calligraphed Keepsake Scrolls", "Genuine Hot Wax Seal Stamps"],
  recipientNames: "",
  customEngravingText: "",
  estimatedBudget: "Premium Statement Tier",
  notes: ""
};

export default function CustomPlanner({ initialServiceId, onConceptsUpdated, onOpenSavedDrawer }: CustomPlannerProps) {
  const [state, setState] = useState<PlannerState>({ ...INITIAL_STATE });
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [copiedSuccess, setCopiedSuccess] = useState(false);

  // Sync with initial service selection when passed from the specialties gallery
  useEffect(() => {
    if (initialServiceId) {
      let label = "Luxury Customized Hamper";
      if (initialServiceId === "hampers") label = "Luxury Customized Hamper";
      else if (initialServiceId === "platters") label = "Bespoke Ceremony Ring Platter";
      else if (initialServiceId === "certificates") label = "Premium Nikah Certificate Deed";
      else if (initialServiceId === "boards") label = "Nikkah Thumb Board & Pen Setup";
      else if (initialServiceId === "elements") label = "Specialized Handcrafted Accents Panel";

      setState(prev => ({
        ...prev,
        serviceType: label
      }));

      // Scroll smoothly to planner element
      const plannerEl = document.getElementById('planner');
      if (plannerEl) {
        plannerEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, [initialServiceId]);

  const serviceCategories = [
    "Luxury Customized Hamper",
    "Bespoke Ceremony Ring Platter",
    "Premium Nikah Certificate Deed",
    "Nikkah Thumb Board & Pen Setup",
    "Specialized Handcrafted Accents Panel"
  ];

  const wrappingOptions = [
    "Acrylic Glass Preservation Case",
    "Premium Heavy Textured Linen Gift Chest",
    "Handcarved Mahogany Wooden Box Case",
    "Luxe Heavy Cushion Velvet Platter",
    "Minimalist Archival Scroll Binder Tubes"
  ];

  const accentsOptions = [
    "Genuine Hot Wax Seal Stamps With Velvet Ribbons",
    "Hand-written Custom Calligraphed Keepsake Scrolls",
    "Fresh Premium Roses & Baby Breath Floral Bundles",
    "Mirrored Acrylic Engraved Couple Name plaques",
    "Silk Ribbon Fraying & Custom Linen Cord Wraparounds",
    "Gold-Dust Leafing Around Border Elements"
  ];

  const budgetOptions = [
    "Classic Refined Tier (Accented Essential)",
    "Premium Statement Tier (Our Elite Suite)",
    "Haute Couture Bespoke (Artisanal Masterpiece)"
  ];

  const handleAccentToggle = (accent: string) => {
    setState(prev => {
      const exists = prev.additionalAccents.includes(accent);
      if (exists) {
        return {
          ...prev,
          additionalAccents: prev.additionalAccents.filter(a => a !== accent)
        };
      } else {
        return {
          ...prev,
          additionalAccents: [...prev.additionalAccents, accent]
        };
      }
    });
  };

  const selectedThemeDetails = COLOR_THEMES.find(t => t.id === state.colorTheme) || COLOR_THEMES[0];

  // WhatsApp Compiler Link
  const compileWhatsAppMessage = (): string => {
    const accentsString = state.additionalAccents.length > 0 
      ? state.additionalAccents.map(acc => `  • ${acc}`).join("\n") 
      : "  • Standard Wrap (No specialized accents requested)";

    const formatted = `✨ *HAMPERS_4_YOU | Creative Design Proposal* ✨\n` +
      `──────────────────────────\n` +
      `🌸 *Service category:* ${state.serviceType}\n` +
      `🎨 *Color scheme:* ${selectedThemeDetails.name}\n` +
      `📦 *Packaging casing:* ${state.wrappingStyle}\n` +
      `👥 *Recipient Name(s):* ${state.recipientNames || "Not Specified"}\n` +
      `📜 *Custom Vows text:* ${state.customEngravingText ? `"${state.customEngravingText}"` : "None"}\n` +
      `💎 *Budget Tier:* ${state.estimatedBudget}\n` +
      `🌟 *Premium Accents:* \n${accentsString}\n` +
      `✍️ *Founder Brief/Notes:* ${state.notes || "Standard Creation"}\n` +
      `──────────────────────────\n` +
      `Requested via my Design Session. Please let me know your slot availability and Custom Quote! Thank you.`;
    
    return formatted;
  };

  const handleInstagramSend = () => {
    const rawText = compileWhatsAppMessage();
    navigator.clipboard.writeText(rawText).then(() => {
      alert("Exquisite custom design brief copied to clipboard! Opening Instagram DM window so you can paste your structured planner configurations to the Creative Head immediately.");
    });
    window.open("https://ig.me/m/hampers_4_you_by_tasdiqa", '_blank');
  };

  const handleCopyClipboard = () => {
    const text = compileWhatsAppMessage();
    navigator.clipboard.writeText(text).then(() => {
      setCopiedSuccess(true);
      setTimeout(() => setCopiedSuccess(false), 2000);
    });
  };

  const handleSaveConcept = () => {
    try {
      const savedRaw = localStorage.getItem('hampers_saved_concepts');
      const savedList: SavedConcept[] = savedRaw ? JSON.parse(savedRaw) : [];
      
      const newConcept: SavedConcept = {
        id: "concept_" + Date.now(),
        timestamp: new Date().toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        }),
        plannerState: { ...state }
      };

      savedList.unshift(newConcept);
      localStorage.setItem('hampers_saved_concepts', JSON.stringify(savedList));
      
      // Update count in header
      onConceptsUpdated(savedList.length);
      
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 2500);
    } catch (err) {
      console.warn("Storage error: ", err);
    }
  };

  const handleReset = () => {
    setState({ ...INITIAL_STATE });
  };

  return (
    <section id="planner" className="py-24 bg-[#FAF8F5] relative border-t border-[#EADFC9]/30">
      {/* Background Watermarks (No telemetry noise) */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-[#AF9467]/3 rounded-full blur-3xl pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16 flex flex-col items-center">
          <span className="text-[11px] font-sans uppercase tracking-[0.3em] text-[#AF9467] font-semibold">Interactive Studio session</span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2D2A26] mt-2 tracking-tight">
            Personal Garian Gifting Planner
          </h2>
          <div className="h-1 w-16 bg-[#AF9467]/50 mt-4 rounded-full" />
          <p className="font-sans text-xs sm:text-sm text-[#544F49] font-light leading-relaxed mt-4">
            Our luxury creation philosophy demands direct customized attention. Use this digital layout board to adjust color schemes, premium wood panels, calligraphy texts, and accents into an elegant design brief before consulting with us.
          </p>
        </div>

        {/* Builder Panel Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start" id="planner-interface-grid">
          
          {/* LEFT: Customizer Choices Form */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded border border-[#EADFC9]/50 shadow-sm space-y-8" id="planner-controls-card">
            
            {/* Step 1: Services Category */}
            <div>
              <label id="label-service" className="text-[11px] font-sans font-bold uppercase tracking-widest text-[#2D2A26] block mb-3">
                01. Premium Service Category
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2" id="planner-choice-services">
                {serviceCategories.map((srv, idx) => {
                  const isSelected = state.serviceType === srv;
                  return (
                    <button
                      key={idx}
                      id={`opt-srv-${idx}`}
                      type="button"
                      onClick={() => setState(p => ({ ...p, serviceType: srv }))}
                      className={`text-left px-4 py-3 border text-xs font-sans tracking-wide transition-all duration-200 rounded flex items-center justify-between ${
                        isSelected 
                          ? 'border-[#AF9467] bg-[#AF9467]/5 text-[#2D2A26] font-medium' 
                          : 'border-[#E2D5BE]/60 text-[#544F49] hover:bg-[#FAF8F5]'
                      }`}
                    >
                      <span>{srv}</span>
                      {isSelected && <Check className="h-3.5 w-3.5 text-[#AF9467] shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Custom Theme colors */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <label id="label-theme" className="text-[11px] font-sans font-bold uppercase tracking-widest text-[#2D2A26]">
                  02. Artistic Color Theme
                </label>
                <span className="text-[10px] font-sans text-[#AF9467] italic font-medium">Determines fabric & ribbon accents</span>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3" id="planner-choice-color">
                {COLOR_THEMES.map((theme) => {
                  const isSelected = state.colorTheme === theme.id;
                  return (
                    <button
                      key={theme.id}
                      id={`opt-theme-${theme.id}`}
                      type="button"
                      onClick={() => setState(p => ({ ...p, colorTheme: theme.id }))}
                      className={`text-left p-3.5 border transition-all duration-200 rounded flex items-start space-x-3 ${
                        isSelected 
                          ? 'border-[#AF9467] bg-[#AF9467]/5 text-[#2D2A26]' 
                          : 'border-[#E2D5BE]/60 text-[#544F49] hover:bg-[#FAF8F5]'
                      }`}
                    >
                      {/* Swatch color representation */}
                      <div 
                        className="w-10 h-10 rounded shadow-inner border border-[#EADFC9] shrink-0 flex items-center justify-center relative overflow-hidden" 
                        style={{ backgroundColor: theme.hex }}
                      >
                        {/* Splitting color highlights representing secondary metallic ribbons */}
                        <div 
                          className="absolute bottom-0 right-0 w-4 h-4 transform rotate-45 translate-x-1 translate-y-1" 
                          style={{ backgroundColor: theme.accentHex }}
                        />
                      </div>
                      
                      <div className="space-y-0.5">
                        <p className="text-xs font-sans font-medium text-[#2D2A26] flex items-center space-x-1">
                          <span>{theme.name}</span>
                          {isSelected && <Check className="h-3 w-3 text-[#AF9467]" />}
                        </p>
                        <p className="text-[9px] text-[#8C8377] font-light leading-snug">{theme.description}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Custom Packaging Style */}
            <div>
              <label id="label-packaging" className="text-[11px] font-sans font-bold uppercase tracking-widest text-[#2D2A26] block mb-3">
                03. Packaging Casing or Base
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2" id="planner-choice-packaging">
                {wrappingOptions.map((wrap, idx) => {
                  const isSelected = state.wrappingStyle === wrap;
                  return (
                    <button
                      key={idx}
                      id={`opt-wrap-${idx}`}
                      type="button"
                      onClick={() => setState(p => ({ ...p, wrappingStyle: wrap }))}
                      className={`text-left px-4 py-3 border text-xs font-sans tracking-wide transition-all duration-200 rounded flex items-center justify-between ${
                        isSelected 
                          ? 'border-[#AF9467] bg-[#AF9467]/5 text-[#2D2A26] font-medium' 
                          : 'border-[#E2D5BE]/60 text-[#544F49] hover:bg-[#FAF8F5]'
                      }`}
                    >
                      <span>{wrap}</span>
                      {isSelected && <Check className="h-3.5 w-3.5 text-[#AF9467] shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 4: Special Accents Checklist */}
            <div>
              <label id="label-accents" className="text-[11px] font-sans font-bold uppercase tracking-widest text-[#2D2A26] block mb-3">
                04. Luxury Handcrafted Accents (Select Multiple)
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2" id="planner-choice-accents">
                {accentsOptions.map((accent, idx) => {
                  const isSelected = state.additionalAccents.includes(accent);
                  return (
                    <button
                      key={idx}
                      id={`opt-accent-${idx}`}
                      type="button"
                      onClick={() => handleAccentToggle(accent)}
                      className={`text-left px-4 py-3 border text-xs font-sans tracking-wide transition-all duration-200 rounded flex items-start space-x-2.5 ${
                        isSelected 
                          ? 'border-[#AF9467] bg-[#AF9467]/5 text-[#2D2A26] font-medium' 
                          : 'border-[#E2D5BE]/40 text-[#544F49] hover:bg-[#FAF8F5]'
                      }`}
                    >
                      <input 
                        type="checkbox" 
                        id={`input-accent-${idx}`}
                        checked={isSelected}
                        onChange={() => {}} // Controlled dummy, button handles it
                        className="mt-0.5 rounded border-gray-300 text-[#AF9467] focus:ring-[#AF9467]"
                      />
                      <span className="leading-snug">{accent}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 5: Recipient name details / vows */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label id="label-recipient" className="text-[11px] font-sans font-bold uppercase tracking-widest text-[#2D2A26] block mb-2">
                  05. Recipient / Bride & Groom Names
                </label>
                <input
                  type="text"
                  id="planner-names-input"
                  placeholder="e.g. Zainab & Farhan"
                  value={state.recipientNames}
                  onChange={(e) => setState(p => ({ ...p, recipientNames: e.target.value }))}
                  className="w-full px-4 py-3 border border-[#E2D5BE] rounded text-xs font-sans focus:outline-none focus:border-[#AF9467] text-[#2D2A26]"
                />
              </div>
              <div>
                <label id="label-budget" className="text-[11px] font-sans font-bold uppercase tracking-widest text-[#2D2A26] block mb-2">
                  06. Estimated Budget Bracket
                </label>
                <select
                  id="planner-budget-select"
                  value={state.estimatedBudget}
                  onChange={(e) => setState(p => ({ ...p, estimatedBudget: e.target.value }))}
                  className="w-full px-4 py-3 border border-[#E2D5BE] bg-white rounded text-xs font-sans focus:outline-none focus:border-[#AF9467] text-[#2D2A26]"
                >
                  {budgetOptions.map((opt, idx) => (
                    <option key={idx} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Custom vows */}
            <div>
              <label id="label-vows" className="text-[11px] font-sans font-bold uppercase tracking-widest text-[#2D2A26] block mb-2">
                07. Vows, Wedding Date or Custom Calligraphy Wording (Keepsakes only)
              </label>
              <textarea
                id="planner-vows-input"
                rows={2}
                placeholder="Write your custom religious quotes, nikah vows, date (e.g. November 24th, 2026), or specific calligraphy message options..."
                value={state.customEngravingText}
                onChange={(e) => setState(p => ({ ...p, customEngravingText: e.target.value }))}
                className="w-full p-4 border border-[#E2D5BE] rounded text-xs font-sans focus:outline-none focus:border-[#AF9467] text-[#2D2A26] resize-none"
              />
            </div>

            {/* General client design brief */}
            <div>
              <label id="label-notes" className="text-[11px] font-sans font-bold uppercase tracking-widest text-[#2D2A26] block mb-2">
                08. Artisanal Brief (Specific Ribbons, Theme Colors, Urgency requests)
              </label>
              <textarea
                id="planner-notes-input"
                rows={2}
                placeholder="Enter any specifics e.g. 'Match my bridal sherwani colors', 'Requires delivery by October 12th', 'Keep the layout fully organic look'..."
                value={state.notes}
                onChange={(e) => setState(p => ({ ...p, notes: e.target.value }))}
                className="w-full p-4 border border-[#E2D5BE] rounded text-xs font-sans focus:outline-none focus:border-[#AF9467] text-[#2D2A26] resize-none"
              />
            </div>

            {/* Row buttons */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-[#EADFC9]/50">
              <button
                type="button"
                id="planner-reset-btn"
                onClick={handleReset}
                className="px-4 py-2 border border-[#E2D5BE] hover:bg-[#FAF8F5] text-xs font-sans tracking-widest uppercase rounded-sm text-[#544F49] flex items-center space-x-1.5 transition-colors"
              >
                <RefreshCw className="h-3 w-3" />
                <span>Reset layout</span>
              </button>

              <button
                type="button"
                id="planner-save-btn"
                onClick={handleInstagramSend}
                className="px-6 py-3 bg-[#FAF8F5] border-2 border-[#AF9467] hover:bg-[#AF9467] hover:text-white text-xs font-sans tracking-widest font-semibold uppercase rounded-sm text-[#AF9467] flex items-center space-x-1.5 transition-all duration-300 shadow-sm cursor-pointer"
              >
                <Instagram className="h-3.5 w-3.5" />
                <span>Send via Instagram</span>
              </button>
            </div>

          </div>

          {/* RIGHT: Live Visual Proposal Preview */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-28" id="planner-preview-column">
            
            {/* The Live plaque */}
            <div 
              id="live-preview-card"
              className="bg-white rounded border-2 shadow-lg overflow-hidden transition-all duration-500 relative"
              style={{ borderColor: selectedThemeDetails.hex === "#FDFBF7" ? "#EADFC9" : selectedThemeDetails.hex }}
            >
              
              {/* Card visual theme header block */}
              <div 
                className="p-6 text-center text-white relative transition-all duration-500"
                style={{ backgroundColor: selectedThemeDetails.hex === "#FDFBF7" ? "#2D2A26" : selectedThemeDetails.hex }}
              >
                {/* Elegant faint watermark background (no larp statistics) */}
                <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#FFF_1px,transparent_1px)] [background-size:16px_16px]" />
                
                <span className="text-[10px] font-sans tracking-[0.3em] uppercase opacity-80 block">Draft session</span>
                <h3 className="font-serif text-xl font-bold tracking-wide mt-1">
                  Bespoke Concept Sheet
                </h3>
                <p className="text-[10px] font-serif italic opacity-90 mt-0.5">
                  Handcrafted specifically by HAMPERS_4_YOU
                </p>
                
                {/* Visual Accent Circle */}
                <div 
                  className="absolute bottom-0 right-4 transform translate-y-1/2 w-8 h-8 rounded-full shadow border-2 border-white flex items-center justify-center font-serif text-xs font-bold"
                  style={{ backgroundColor: selectedThemeDetails.accentHex, color: '#FFF' }}
                  title="Featured Metallic Ribbon Highlight"
                >
                  ★
                </div>
              </div>

              {/* Receipt Frame Inner Specifications */}
              <div className="p-6 space-y-6 text-left">
                
                {/* Specs Block */}
                <div className="space-y-4">
                  
                  {/* Category Banner */}
                  <div className="flex justify-between items-start pb-3 border-b border-[#EADFC9]/50">
                    <div>
                      <p className="text-[9px] font-sans uppercase tracking-widest text-[#8C8377]">Customizer Type</p>
                      <p className="font-serif text-base font-bold text-[#2D2A26]">{state.serviceType}</p>
                    </div>
                    <span className="bg-[#FAF8F5] border border-[#DECCB2] px-2 py-1 text-[9px] font-sans uppercase font-semibold text-[#8C7A5C] rounded-sm">
                      Interactive Mode
                    </span>
                  </div>

                  {/* Themes / Materials */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-[9px] font-sans uppercase tracking-widest text-[#8C8377]">Foliage Trim</p>
                      <p className="text-xs font-sans font-medium text-[#2D2A26]">{selectedThemeDetails.name}</p>
                    </div>
                    <div>
                      <p className="text-[9px] font-sans uppercase tracking-widest text-[#8C8377]">Base Wrapper Casing</p>
                      <p className="text-xs font-sans font-medium text-[#2D2A26]">{state.wrappingStyle}</p>
                    </div>
                  </div>

                  {/* Recipient custom content */}
                  <div>
                    <p className="text-[9px] font-sans uppercase tracking-widest text-[#8C8377]">Dedicated Couple Signatures</p>
                    <p className="text-xs font-serif font-semibold text-[#2D2A26] px-3 py-1.5 bg-[#F9F7F3] border border-[#EADFC9] rounded italic mt-1 min-h-[32px] flex items-center">
                      {state.recipientNames ? `“${state.recipientNames}”` : "Bride & Groom Names Not Formatted"}
                    </p>
                  </div>

                  {/* Accents List */}
                  <div>
                    <p className="text-[9px] font-sans uppercase tracking-widest text-[#8C8377] mb-1.5">Specialized Craft Details</p>
                    {state.additionalAccents.length > 0 ? (
                      <div className="flex flex-wrap gap-1.5">
                        {state.additionalAccents.map((acc, index) => (
                          <span 
                            key={index}
                            className="bg-[#FAF8F5] border border-[#EBDCC5] text-[#544F49] text-[9px] font-sans px-2.5 py-1 rounded-sm flex items-center space-x-1"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-[#AF9467]" />
                            <span>{acc.length > 28 ? acc.substring(0, 26) + "..." : acc}</span>
                          </span>
                        ))}
                      </div>
                    ) : (
                      <p className="text-xs font-sans text-[#8C8377] italic">No supplemental accents specified</p>
                    )}
                  </div>

                  {/* Vows and text preview block */}
                  {state.customEngravingText && (
                    <div>
                      <p className="text-[9px] font-sans uppercase tracking-widest text-[#8C8377]">Engraved Text / Calligraphed Note Preview</p>
                      <p className="text-[11px] font-serif italic text-[#544F49] bg-[#FAF8F5] p-3 border border-[#EBDCC5]/50 rounded mt-1 leading-relaxed max-h-[80px] overflow-y-auto">
                        "{state.customEngravingText}"
                      </p>
                    </div>
                  )}

                  {/* Estimated budget selection */}
                  <div className="pt-3 border-t border-dashed border-[#EADFC9] flex justify-between items-center">
                    <span className="text-[10px] font-sans uppercase tracking-widest text-[#8C8377] font-semibold">Gifting Grade</span>
                    <span className="text-xs font-sans font-bold text-[#AF9467]">{state.estimatedBudget}</span>
                  </div>

                </div>

                {/* Submit Panel Actions */}
                <div className="pt-4 border-t border-[#EADFC9]/50 flex flex-col space-y-2">
                  <button
                    type="button"
                    onClick={handleInstagramSend}
                    id="planner-submit-wa"
                    className="w-full py-4 bg-[#2D2A26] hover:bg-[#AF9467] text-white text-xs font-sans tracking-widest font-semibold uppercase rounded-sm transition-all duration-300 flex items-center justify-center space-x-2 shadow-md hover:shadow-lg cursor-pointer"
                  >
                    <Instagram className="h-4 w-4" />
                    <span>Inquire via Instagram DM</span>
                  </button>

                  <div className="grid grid-cols-1 gap-2">
                    <button
                      type="button"
                      onClick={handleCopyClipboard}
                      id="planner-clipboard-copier"
                      className="w-full py-3 bg-white border border-[#AF9467] hover:bg-[#FAF8F5] text-xs font-sans tracking-widest uppercase rounded-sm text-[#544F49] flex items-center justify-center space-x-2 transition-all duration-300 cursor-pointer"
                    >
                      <ClipboardList className="h-4 w-4 text-[#AF9467]" />
                      <span>{copiedSuccess ? "✓ Design Specs Copied!" : "Copy Specifications Brief"}</span>
                    </button>
                  </div>
                </div>

              </div>
              
              {/* Elegant paper watermarking scroll lines at base */}
              <div className="h-1 bg-gradient-to-r from-red-800 via-[#AF9467] to-[#2D2A26]" />
            </div>

            {/* Success Notifications alert card */}
            <AnimatePresence>
              {savedSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  id="notif-saved-success"
                  className="p-3 bg-green-50 border border-green-200 text-green-800 text-xs rounded text-center font-sans flex items-center justify-center space-x-2 shadow-sm"
                >
                  <span>✓ Custom Design Proposal Saved Successfully! Click 'View My Wishlist' to review catalogs.</span>
                </motion.div>
              )}
            </AnimatePresence>

          </div>

        </div>

      </div>
    </section>
  );
}
