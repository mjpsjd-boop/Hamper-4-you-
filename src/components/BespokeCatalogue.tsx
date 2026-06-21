import React, { useState } from 'react';
import { CatalogueItem } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, ZoomIn, ArrowRight, ArrowLeft, X, Sparkles, Check, Instagram, Edit3 } from 'lucide-react';
import { PHONE_NUMBER } from '../data';

interface BespokeCatalogueProps {
  items: CatalogueItem[];
  onSelectStyle?: (tagName: string) => void;
  onEditCatalogue?: (idx: number) => void;
}

export default function BespokeCatalogue({ items, onSelectStyle, onEditCatalogue }: BespokeCatalogueProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [zoomItem, setZoomItem] = useState<CatalogueItem | null>(null);

  if (!items || items.length === 0) return null;

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  const currentItem = items[currentIndex];

  const handleInquire = (item: CatalogueItem) => {
    const text = `Hello HAMPERS_4_YOU, I am viewing your luxury Atelier Catalogue and would love to inquire about "${item.title}" (${item.tag}). Could we discuss this for my ceremony?`;
    navigator.clipboard.writeText(text).then(() => {
      alert(`Inquiry brief for "${item.title}" copied to clipboard! Opening Instagram DM window so you can paste your message to the Creative Head immediately.`);
    });
    window.open("https://ig.me/m/hampers_4_you_by_tasdiqa", '_blank');
  };

  return (
    <section className="py-20 bg-[#FAF8F5] border-t border-b border-[#EBDCC5]/40" id="boutique-curation-catalogue">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Editorial Heading */}
        <div className="text-center mb-12 space-y-3">
          <div className="flex items-center justify-center space-x-2 text-[#AF9467]">
            <BookOpen className="h-4 w-4" />
            <span className="text-[10px] tracking-[0.3em] uppercase font-sans font-bold">Limited Edition Curation</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif text-[#2D2A26] font-normal leading-tight">
            Atelier Visual Catalogue
          </h2>
          <div className="w-16 h-0.5 bg-[#AF9467]/50 mx-auto mt-4" />
          <p className="text-xs sm:text-sm text-[#8C8377] font-sans font-light max-w-xl mx-auto italic mt-2">
            A physical portfolio of custom-commissioned masterpieces. Explore details of premium ring trays, custom bridal trunks, and calligraphed certificates.
          </p>
        </div>

        {/* Desktop Split Layout Catalogue Style vs Mobile Carousel */}
        <div className="bg-white rounded-lg border border-[#EADFC9]/50 shadow-xl overflow-hidden min-h-[500px] flex flex-col lg:flex-row relative">
          
          {/* Subtle Vintage Silk Ribbon Decorative Background Accent */}
          <div className="absolute top-0 bottom-0 left-1/2 w-[1px] bg-[#EADFC9]/40 hidden lg:block z-10" />

          {/* Left Page: Beautiful High-Resolution Specimen Image Container */}
          <div className="lg:w-1/2 bg-[#FAF8F5] relative p-6 sm:p-10 flex items-center justify-center border-b lg:border-b-0 lg:border-r border-[#EADFC9]/30 min-h-[300px] lg:min-h-0">
            
            {/* Tag badge */}
            <div className="absolute top-4 left-4 flex items-center space-x-2 z-15">
              <span className="bg-[#2D2A26] text-white px-3 py-1 text-[8px] uppercase tracking-widest font-sans rounded-sm font-semibold shadow-sm">
                {currentItem.tag}
              </span>
              {onEditCatalogue && (
                <button
                  type="button"
                  onClick={() => onEditCatalogue(currentIndex)}
                  className="bg-white hover:bg-[#AF9467] hover:text-white text-gray-700 p-1 rounded-sm border border-[#EADFC9] shadow-sm transition-all cursor-pointer flex items-center justify-center transform hover:scale-105"
                  title="Change Catalogue Design"
                >
                  <Edit3 className="h-3.5 w-3.5" />
                </button>
              )}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentItem.id}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.4 }}
                className="relative group w-full h-[320px] sm:h-[400px] rounded-sm overflow-hidden shadow-md bg-white border border-[#EADFC9]/30"
              >
                <img
                  src={currentItem.image}
                  alt={currentItem.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                
                {/* Instant overlay on hover */}
                <div className="absolute inset-0 bg-black/15 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col sm:flex-row items-center justify-center gap-3 z-10">
                  <button
                    type="button"
                    onClick={() => setZoomItem(currentItem)}
                    className="p-3 sm:py-2.5 sm:px-4 bg-white/90 hover:bg-white text-[#2D2A26] rounded-full shadow-lg transition-transform duration-200 transform scale-90 group-hover:scale-100 flex items-center space-x-1.5 text-[10px] font-sans tracking-wider uppercase font-bold cursor-pointer"
                  >
                    <ZoomIn className="h-4 w-4" />
                    <span>Zoom Artwork</span>
                  </button>

                  {onEditCatalogue && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onEditCatalogue(currentIndex);
                      }}
                      className="p-3 sm:py-2.5 sm:px-4 bg-[#2D2A26] text-white hover:bg-[#AF9467] rounded-full shadow-lg transition-transform duration-200 transform scale-90 group-hover:scale-100 flex items-center space-x-1.5 text-[10px] font-sans tracking-wider uppercase font-bold cursor-pointer"
                    >
                      <Edit3 className="h-4 w-4" />
                      <span>Change Photo</span>
                    </button>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Pagination Controls */}
            <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center z-10">
              <button
                onClick={handlePrev}
                className="p-2 sm:p-2.5 bg-white/90 hover:bg-white text-[#2D2A26] border border-[#DECCB2]/40 rounded-full shadow-md hover:scale-105 transition-all outline-hidden cursor-pointer"
                title="Previous Artifact"
              >
                <ArrowLeft className="h-4 w-4" />
              </button>
              
              <div className="text-[10px] font-mono tracking-widest text-[#8C8377] bg-white/80 px-3 py-1 rounded-full border border-gray-100">
                PAGE {currentIndex + 1} OF {items.length}
              </div>

              <button
                onClick={handleNext}
                className="p-2 sm:p-2.5 bg-white/90 hover:bg-white text-[#2D2A26] border border-[#DECCB2]/40 rounded-full shadow-md hover:scale-105 transition-all outline-hidden cursor-pointer"
                title="Next Artifact"
              >
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Right Page: Exquisite Editorial Commentary, Specimen Registry, Details */}
          <div className="lg:w-1/2 p-6 sm:p-12 flex flex-col justify-between bg-white text-left">
            <div>
              <div className="flex items-center space-x-1.5 text-[#AF9467] mb-2.5">
                <Sparkles className="h-3 w-3" />
                <span className="text-[9px] font-mono tracking-widest uppercase font-bold">Atelier Registered Entry</span>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={currentItem.id}
                  initial={{ opacity: 0, x: 15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -15 }}
                  transition={{ duration: 0.35 }}
                  className="space-y-6"
                >
                  <div className="space-y-1">
                    <h3 className="font-serif text-2xl sm:text-3xl text-[#2D2A26] font-normal leading-tight leading-none">
                      {currentItem.title}
                    </h3>
                    <p className="font-serif italic text-xs text-[#AF9467] tracking-wide">
                      {currentItem.subtitle}
                    </p>
                  </div>

                  <p className="text-xs sm:text-[13px] text-[#544F49] font-sans font-light leading-relaxed">
                    {currentItem.description}
                  </p>

                  {/* Registered Details Slate */}
                  <div className="p-4 bg-[#FAF8F5] border border-[#EADFC9]/30 rounded-sm space-y-2">
                    <div className="grid grid-cols-3 gap-2 border-b border-[#EADFC9]/20 pb-2 text-[10px]">
                      <span className="font-sans font-bold uppercase tracking-wider text-[#8C8377]">Archival Aspect</span>
                      <span className="col-span-2 text-[#2D2A26] font-sans font-medium">{currentItem.tag}</span>
                    </div>

                    {currentItem.dimensions && (
                      <div className="grid grid-cols-3 gap-2 border-b border-[#EADFC9]/20 pb-2 text-[10px]">
                        <span className="font-sans font-bold uppercase tracking-wider text-[#8C8377]">Dimensions</span>
                        <span className="col-span-2 text-[#2D2A26] font-mono">{currentItem.dimensions}</span>
                      </div>
                    )}

                    {currentItem.medium && (
                      <div className="grid grid-cols-3 gap-2 text-[10px]">
                        <span className="font-sans font-bold uppercase tracking-wider text-[#8C8377]">Mediums Sourced</span>
                        <span className="col-span-2 text-[#2D2A26] font-sans italic">{currentItem.medium}</span>
                      </div>
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Action buttons on Page footer */}
            <div className="mt-8 pt-6 border-t border-[#EBDCC5]/30 flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => handleInquire(currentItem)}
                className="flex-1 py-3 px-4 bg-[#2D2A26] hover:bg-[#AF9467] text-white text-xs font-sans font-bold tracking-widest uppercase transition-all duration-300 rounded-sm text-center shadow-md flex items-center justify-center space-x-2"
              >
                <span>Inquire About Design</span>
                <ArrowRight className="h-3 w-3" />
              </button>

              {onSelectStyle && (
                <button
                  onClick={() => onSelectStyle(currentItem.tag)}
                  className="py-3 px-4 bg-white hover:bg-[#FAF8F5] text-[#2D2A26] border border-[#DECCB2] text-xs font-sans font-bold tracking-widest uppercase transition-all duration-300 rounded-sm text-center"
                >
                  Configure In Planner
                </button>
              )}
            </div>

          </div>

        </div>

      </div>

      {/* High-fidelity full-screen dynamic lightbox/zoom */}
      <AnimatePresence>
        {zoomItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 sm:p-8"
          >
            <button
              onClick={() => setZoomItem(null)}
              className="absolute top-4 right-4 p-3 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-colors z-50 cursor-pointer"
            >
              <X className="h-6 w-6" />
            </button>

            <div className="max-w-4xl w-full flex flex-col md:flex-row bg-white rounded-md overflow-hidden shadow-2xl relative">
              <div className="md:w-3/5 h-[320px] md:h-[500px] bg-[#2D2A26] relative">
                <img
                  src={zoomItem.image}
                  alt={zoomItem.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              
              <div className="md:w-2/5 p-6 sm:p-8 flex flex-col justify-between text-left">
                <div className="space-y-4">
                  <div className="bg-[#AF9467]/15 text-[#AF9467] px-2.5 py-1 text-[8px] uppercase tracking-widest font-bold self-start inline-block rounded-sm">
                    {zoomItem.tag}
                  </div>
                  <h3 className="font-serif text-xl sm:text-2xl text-[#2D2A26]">{zoomItem.title}</h3>
                  <p className="font-serif italic text-xs text-[#AF9467]">{zoomItem.subtitle}</p>
                  <p className="text-xs text-[#544F49] font-sans font-light leading-relaxed">{zoomItem.description}</p>
                  
                  <div className="space-y-1.5 pt-4 text-[10px]">
                    <div className="flex justify-between border-b border-gray-100 pb-1.5">
                      <span className="font-bold text-gray-400 uppercase font-sans">Proportions:</span>
                      <span className="text-[#2D2A26] font-mono">{zoomItem.dimensions || "Bespoke Custom size"}</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-100 pb-1.5">
                      <span className="font-bold text-gray-400 uppercase font-sans">Composition:</span>
                      <span className="text-[#2D2A26] font-sans italic">{zoomItem.medium || "Artisanal raw materials"}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <button
                    onClick={() => {
                      handleInquire(zoomItem);
                      setZoomItem(null);
                    }}
                    className="w-full py-3 bg-[#2D2A26] hover:bg-[#AF9467] text-white text-xs font-sans tracking-widest uppercase font-bold rounded-sm shadow-md transition-colors"
                  >
                    Discuss This Creation
                  </button>
                </div>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}
