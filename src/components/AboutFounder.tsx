import React, { useState, useEffect } from 'react';
import { Quote, Feather, Heart, Sparkles } from 'lucide-react';
import { FOUNDER_STORY } from '../data';
import { motion } from 'motion/react';

export default function AboutFounder() {
  const [founderStory, setFounderStory] = useState(() => {
    if (typeof window !== 'undefined') {
      const cached = localStorage.getItem('hampers_founder_story');
      if (cached) {
        try {
          return JSON.parse(cached);
        } catch (e) {
          return FOUNDER_STORY;
        }
      }
    }
    return FOUNDER_STORY;
  });

  useEffect(() => {
    // Listen for custom event or local storage updates
    const handleUpdate = () => {
      const cached = localStorage.getItem('hampers_founder_story');
      if (cached) {
        try {
          setFounderStory(JSON.parse(cached));
        } catch (e) {}
      }
    };
    window.addEventListener('storage', handleUpdate);
    // Custom event to force update within same window
    window.addEventListener('founder_story_updated', handleUpdate);
    return () => {
      window.removeEventListener('storage', handleUpdate);
      window.removeEventListener('founder_story_updated', handleUpdate);
    };
  }, []);

  return (
    <section id="founder" className="py-24 bg-[#F5EFE4]/60 border-t border-b border-[#EADFC9]/40 relative overflow-hidden">
      {/* Decorative details */}
      <div className="absolute top-1/2 left-0 w-48 h-48 bg-[#AF9467]/5 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-72 h-72 bg-[#AF9467]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column Structure: Visual Frame (Signature Card style) */}
          <div className="lg:col-span-5 relative" id="founder-visual-column">
            
            <div className="relative group">
              {/* Textured frame backdrop */}
              <div className="absolute inset-0 bg-[#2D2A26] rounded-sm transform rotate-3 scale-x-105 duration-300 opacity-20" />
              
              {/* Framed Image */}
              <div className="relative bg-white border border-[#EADFC9] p-5 rounded-sm shadow-xl z-10">
                <div className="aspect-[4/5] w-full overflow-hidden bg-[#FAF8F5] relative mb-4 rounded-sm">
                  <img
                    src="https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=600&auto=format&fit=crop"
                    alt="Artisanal Creative Workspace"
                    className="w-full h-full object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-700"
                    referrerPolicy="no-referrer"
                  />
                  {/* Subtle water-color overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2D2A26]/40 via-transparent to-transparent blend-multiply" />
                </div>
                
                {/* Visual Label */}
                <div className="text-center pt-2">
                  <span className="font-display text-sm font-semibold text-[#2D2A26] tracking-widest block uppercase">
                    The Artisanal Studio
                  </span>
                  <span className="text-[10px] font-sans text-[#AF9467] tracking-widest uppercase mt-0.5 block">
                    Handcrafting Since 2021
                  </span>
                </div>
              </div>
            </div>

            {/* floating signature details */}
            <div 
              id="founder-float-card"
              className="absolute -bottom-6 -right-6 bg-[#FAF8F5] border border-[#DECCB2] p-4 rounded-sm shadow-lg max-w-[200px] hidden sm:block z-20"
            >
              <div className="flex items-center space-x-2 text-[#AF9467]">
                <Feather className="h-4 w-4" />
                <span className="text-[9px] font-sans uppercase font-bold tracking-widest text-[#2D2A26]">Genuine Devotion</span>
              </div>
              <p className="text-[10px] text-[#544F49] font-light mt-1">
                Every single item—from ribbon fraying to initial sketch—is made by hand.
              </p>
            </div>

          </div>

          {/* Right Column Structure: Narrative Content */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left space-y-6" id="founder-text-column">
            
            {/* Headers */}
            <div className="space-y-1">
              <span className="text-[10px] sm:text-xs font-sans uppercase tracking-[0.3em] text-[#AF9467] font-semibold flex items-center space-x-2">
                <span>The Story of Luxury Creative Customization</span>
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2D2A26]">
                {founderStory.title}
              </h2>
              <p className="text-xs italic font-serif text-[#AF9467] mt-1">
                {founderStory.subtitle}
              </p>
            </div>

            {/* Quote Block */}
            <div className="relative pl-8 py-2 border-l-2 border-[#AF9467]/60" id="founder-quote-block">
              <Quote className="absolute top-0 left-2 h-5 w-5 text-[#AF9467]/20 transform -translate-x-4 shrink-0" />
              <p className="text-xs sm:text-sm font-serif italic text-[#544F49] leading-relaxed font-light">
                {founderStory.quote}
              </p>
            </div>

            {/* Narrative Paragraphs */}
            <div className="space-y-4 text-xs sm:text-sm text-[#544F49] font-sans font-light leading-relaxed" id="founder-paragraphs">
              {founderStory.paragraphs && founderStory.paragraphs.map((p: string, index: number) => (
                <p key={index}>
                  {p}
                </p>
              ))}
            </div>

            {/* Core Values / Philosophy Pillars */}
            <div className="grid grid-cols-2 gap-4 pt-6 mt-2 border-t border-[#EADFC9]/60" id="founder-pillars">
              <div className="flex items-start space-x-3">
                <div className="p-2 rounded bg-white border border-[#EADFC9]/40 text-[#AF9467] shrink-0">
                  <Heart className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="text-[11px] font-sans uppercase tracking-widest font-bold text-[#2D2A26]">Experience First</h4>
                  <p className="text-[10px] text-[#8C8377] font-light mt-0.5">We focus heavily on tactile unboxing textures.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="p-2 rounded bg-white border border-[#EADFC9]/40 text-[#AF9467] shrink-0">
                  <Sparkles className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="text-[11px] font-sans uppercase tracking-widest font-bold text-[#2D2A26]">Sacred Details</h4>
                  <p className="text-[10px] text-[#8C8377] font-light mt-0.5">Custom wax seals and actual calligraphy sheets.</p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
