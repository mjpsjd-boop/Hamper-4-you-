import React, { useState } from 'react';
import { Gift, Award, FileText, Palette, Feather, Star, Check, ExternalLink, Image as ImageIcon, Edit3 } from 'lucide-react';
import { SERVICE_ITEMS, BRAND_NAME, PHONE_NUMBER } from '../data';
import { ServiceItem } from '../types';
import { motion, AnimatePresence } from 'motion/react';

interface GalleryShowcaseProps {
  onPlanSpecific: (serviceId: string) => void;
  serviceItems?: ServiceItem[];
  onEditCategory?: (idx: number) => void;
}

export default function GalleryShowcase({ onPlanSpecific, serviceItems = SERVICE_ITEMS, onEditCategory }: GalleryShowcaseProps) {
  const [activeItem, setActiveItem] = useState<ServiceItem>(serviceItems[0] || SERVICE_ITEMS[0]);
  const [zoomImg, setZoomImg] = useState<string | null>(null);

  // Sync activeItem if the user edits elements in the admin console
  React.useEffect(() => {
    const updated = serviceItems.find(item => item.id === activeItem.id);
    if (updated) {
      setActiveItem(updated);
    } else if (serviceItems.length > 0) {
      setActiveItem(serviceItems[0]);
    }
  }, [serviceItems]);

  // Helper mapping of category to icons
  const getIcon = (category: string) => {
    switch (category) {
      case 'hamper': return <Gift className="h-4 w-4" />;
      case 'platter': return <Palette className="h-4 w-4" />;
      case 'certificate': return <FileText className="h-4 w-4" />;
      case 'board': return <Award className="h-4 w-4" />;
      case 'elements': return <Feather className="h-4 w-4" />;
      default: return <Gift className="h-4 w-4" />;
    }
  };

  const handleInquireNow = (item: ServiceItem) => {
    const text = `Hi ${BRAND_NAME}! I would like to inquire about a customized order for: ${item.title}. I am really inspired by this specialty from your portfolio website!`;
    navigator.clipboard.writeText(text).then(() => {
      alert(`Inquiry brief for "${item.title}" copied to clipboard! Opening Instagram DM window so you can paste your message to the Creative Head immediately.`);
    });
    window.open("https://ig.me/m/hampers_4_you_by_tasdiqa", '_blank');
  };

  return (
    <section id="services" className="py-24 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16 flex flex-col items-center">
          <span className="text-[11px] font-sans uppercase tracking-[0.3em] text-[#AF9467] font-semibold">Exquisite Artisanship</span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2D2A26] mt-2 tracking-tight">
            Our Premium Services & Specialties
          </h2>
          <div className="h-1 w-16 bg-[#AF9467]/50 mt-4 rounded-full" />
          <p className="font-sans text-xs sm:text-sm text-[#544F49] font-light leading-relaxed mt-4">
            We do not manufacture products; we design physical experiences. Discover the luxury materials, calligraphic detailing, and customized focus behind each of our principal specialties.
          </p>
        </div>

        {/* Tab Selection Row */}
        <div className="flex flex-wrap justify-center gap-2 mb-12 border-b border-[#EBDCC5]/50 pb-6" id="services-tabs-row">
          {serviceItems.map((item) => {
            const isSelected = item.id === activeItem.id;
            return (
              <button
                key={item.id}
                id={`tab-btn-${item.id}`}
                onClick={() => setActiveItem(item)}
                className={`flex items-center space-x-2.5 px-4 py-3 sm:px-5 sm:py-3.5 text-xs font-sans font-medium tracking-widest uppercase transition-all duration-300 rounded ${
                  isSelected 
                    ? 'bg-[#2D2A26] text-white shadow-md' 
                    : 'bg-[#F2EDE4]/70 text-[#544F49] hover:bg-[#EADFC9]/50'
                }`}
              >
                {getIcon(item.category)}
                <span>{item.title.split(' ')[1] || item.title.replace('Luxury ', '')}</span>
              </button>
            );
          })}
        </div>

        {/* Selected Service Detail Panel */}
        <div className="bg-white border border-[#EADFC9]/50 rounded shadow-md overflow-hidden relative" id="service-showcase-panel">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeItem.id}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 lg:grid-cols-12"
            >
              
              {/* Product Image Panel */}
              <div className="lg:col-span-5 relative min-h-[350px] lg:min-h-[500px] group">
                <img
                  src={activeItem.mainImage}
                  alt={activeItem.title}
                  className="absolute inset-0 w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                
                {/* Hover overlay edit trigger */}
                {onEditCategory && (
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-20">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        const idx = serviceItems.findIndex(item => item.id === activeItem.id);
                        if (idx !== -1) onEditCategory(idx);
                      }}
                      className="px-4 py-2.5 bg-white/95 text-[#2D2A26] hover:bg-[#AF9467] hover:text-white rounded shadow-md text-[10px] uppercase tracking-widest font-sans font-bold flex items-center space-x-1.5 cursor-pointer transform scale-95 group-hover:scale-100 transition-all duration-200"
                    >
                      <Edit3 className="h-3 w-3" />
                      <span>Change Category Banner</span>
                    </button>
                  </div>
                )}
                
                {/* Image Overlay Label */}
                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-3.5 py-1.5 border border-[#DECCB2]/50 text-[10px] font-sans tracking-wide uppercase font-semibold text-[#8C7A5C] flex items-center space-x-1.5 z-10">
                  <span>Direct Client Photo</span>
                  {onEditCategory && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        const idx = serviceItems.findIndex(item => item.id === activeItem.id);
                        if (idx !== -1) onEditCategory(idx);
                      }}
                      className="ml-1 bg-gray-100 text-gray-700 hover:bg-[#AF9467] hover:text-white p-1 rounded-full transition-colors flex items-center justify-center cursor-pointer"
                      title="Edit Category Details & Artwork"
                    >
                      <Edit3 className="h-2.5 w-2.5" />
                    </button>
                  )}
                </div>

                <button
                  onClick={() => setZoomImg(activeItem.mainImage)}
                  id={`zoom-btn-${activeItem.id}`}
                  className="absolute bottom-4 right-4 p-2 rounded-full bg-white/90 text-[#2D2A26] hover:bg-white hover:text-[#AF9467] shadow transition-colors"
                  title="Enlarge details"
                >
                  <ImageIcon className="h-4 w-4" />
                </button>
              </div>

              {/* Product Content Sheet */}
              <div className="lg:col-span-7 p-8 sm:p-12 flex flex-col justify-between text-left">
                <div className="space-y-6">
                  
                  {/* Category, Subtitle & Title */}
                  <div className="space-y-1">
                    <span className="text-[10px] sm:text-xs font-sans uppercase tracking-[0.25em] text-[#AF9467] font-semibold">
                      {activeItem.subtitle}
                    </span>
                    <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#2D2A26]">
                      {activeItem.title}
                    </h3>
                  </div>

                  {/* Accent Highlight Row */}
                  <div className="flex items-center space-x-2 text-xs italic font-serif text-[#AF9467]" id="service-accent-quote-row">
                    <Star className="h-3.5 w-3.5 fill-[#AF9467] text-[#AF9467]" />
                    <span>"{activeItem.accentTitle}"</span>
                  </div>

                  {/* long narrative */}
                  <p className="text-sm text-[#544F49] font-sans font-light leading-relaxed">
                    {activeItem.longCopy}
                  </p>

                  {/* Features / Materials Bullet Points */}
                  <div className="pt-2 border-t border-[#EADFC9]/50">
                    <h4 className="text-[11px] font-sans uppercase tracking-widest font-bold text-[#2D2A26] mb-3">
                      High-Importance Structural Specifications
                    </h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#544F49]">
                      {activeItem.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start space-x-2">
                          <Check className="h-3.5 w-3.5 text-[#AF9467] shrink-0 mt-0.5" />
                          <span className="font-light leading-snug">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                </div>

                {/* Call-to-actions Footer row */}
                <div className="flex flex-col sm:flex-row items-center gap-4 pt-8 mt-8 border-t border-[#EADFC9]/30">
                  <button
                    id={`pl-concept-btn-${activeItem.id}`}
                    onClick={() => onPlanSpecific(activeItem.id)}
                    className="w-full sm:w-auto px-6 py-3.5 bg-[#2D2A26] hover:bg-[#AF9467] text-white text-[10px] font-sans font-semibold tracking-widest uppercase transition-colors rounded-sm"
                  >
                    Configure this Speciality
                  </button>
                  <button
                    id={`pl-wa-btn-${activeItem.id}`}
                    onClick={() => handleInquireNow(activeItem)}
                    className="w-full sm:w-auto px-6 py-3.5 border border-[#AF9467]/50 hover:bg-[#AF9467]/5 text-[#544F49] text-[10px] font-sans font-semibold tracking-widest uppercase transition-colors rounded-sm flex items-center justify-center space-x-1.5"
                  >
                    <span>Inquire About Custom Pricing</span>
                    <ExternalLink className="h-3 w-3" />
                  </button>
                </div>

              </div>

            </motion.div>
          </AnimatePresence>
        </div>

        {/* Zoom Lightbox Modal */}
        <AnimatePresence>
          {zoomImg && (
            <div 
              className="fixed inset-0 bg-[#2D2A26]/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setZoomImg(null)}
              id="lightbox-overlay"
            >
              <div className="relative max-w-3xl w-full aspect-square bg-[#FAF8F5] p-2 rounded shadow-2xl overflow-hidden">
                <img
                  src={zoomImg}
                  alt="Zoomed Detail"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <button
                  onClick={() => setZoomImg(null)}
                  className="absolute top-4 right-4 bg-white/90 rounded-full p-2 text-[#2D2A26] focus:outline-none hover:text-[#AF9467]"
                  id="lightbox-close"
                >
                  ✕
                </button>
              </div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
