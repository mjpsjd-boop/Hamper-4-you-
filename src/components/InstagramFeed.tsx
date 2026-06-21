import React, { useState } from 'react';
import { Play, X, Compass, Award, Star, Instagram, Eye, Heart, MessageCircle, Copy, Check, Edit3 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { StoryItem } from '../types';
import { DEFAULT_STORIES, BRAND_NAME } from '../data';

interface InstagramFeedProps {
  stories?: StoryItem[];
  onEditStory?: (idx: number) => void;
}

export default function InstagramFeed({ stories = DEFAULT_STORIES, onEditStory }: InstagramFeedProps) {
  const [activeStory, setActiveStory] = useState<StoryItem | null>(null);
  const [copiedStoryId, setCopiedStoryId] = useState<string | null>(null);
  const [likedStories, setLikedStories] = useState<string[]>([]);

  const handleCopyText = (id: string, text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedStoryId(id);
      setTimeout(() => setCopiedStoryId(null), 2000);
    });
  };

  const handleLikeStory = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikedStories(prev => 
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  // Instagram direct link
  const instaLink = "https://www.instagram.com/hampers_4_you_by_tasdiqa?igsh=Zm93dnFiZjJ0OXdq";
  const instaDmLink = "https://ig.me/m/hampers_4_you_by_tasdiqa";

  return (
    <section id="atelier-instagram" className="py-24 bg-white border-t border-[#EBDCC5]/40 overflow-hidden text-left relative">
      
      {/* Decorative background embellishments */}
      <div className="absolute top-24 right-0 w-80 h-80 bg-[#FAF8F5]/50 border border-[#EADFC9]/20 rounded-full select-none pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        
        {/* Editorial Craftsmanship Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end mb-16 border-b border-[#EBCDB1]/30 pb-12">
          <div className="lg:col-span-7 space-y-4">
            <span className="text-[11px] font-sans uppercase tracking-[0.35em] text-[#AF9467] font-semibold flex items-center space-x-1.5">
              <span>Backstage Inspiration & Atelier Secrets</span>
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2D2A26] tracking-tight">
              Curated Atelier Stories & Behind-the-Scenes
            </h2>
            <p className="font-sans text-xs sm:text-sm text-[#544F49] font-light leading-relaxed max-w-xl">
              We pack every design with physical relics representing traditional craftsmanship. Explore our exclusive stories showing ribbon dyes, raw calligraphies, wax seals, and botanicals, complete with instant copying tools for your design brief. All consultation slots and bespoke orders are managed directly via our Instagram DM.
            </p>
          </div>
          
          <div className="lg:col-span-5 flex flex-col sm:flex-row items-start sm:items-center sm:justify-end gap-5">
            <div className="flex flex-col text-left">
              <span className="text-xl font-serif font-bold text-[#2D2A26]">@hampers_4_you_by_tasdiqa</span>
              <span className="text-[10px] font-sans text-[#AF9467] uppercase tracking-wider">Follow for Bespoke Bridal Gifting Vibes</span>
            </div>
            <a 
              href={instaLink} 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-5 py-3.5 bg-[#2D2A26] hover:bg-[#AF9467] text-white text-[10px] font-sans tracking-widest uppercase transition-all duration-300 rounded-sm flex items-center space-x-2 shadow-sm cursor-pointer"
            >
              <Instagram className="h-4 w-4" />
              <span>Enter Instagram Feed</span>
            </a>
          </div>
        </div>

        {/* Dynamic Story Rings Row */}
        <div className="mb-14 overflow-x-auto py-4 px-2 bg-[#FAF8F5]/80 border border-[#EADFC9]/30 rounded-sm" id="story-row-container">
          <div className="flex space-x-6 shrink-0 sm:justify-center">
            {stories.map((story) => {
              const idx = stories.findIndex(item => item.id === story.id);
              return (
                <div key={story.id} className="relative flex flex-col items-center group">
                  <button
                    onClick={() => setActiveStory(story)}
                    className="flex flex-col items-center focus:outline-hidden cursor-pointer"
                  >
                    <div className="relative p-[3px] rounded-full bg-gradient-to-tr from-[#AF9467] via-[#FAF8F5] to-[#2D2A26] shadow-sm transform group-hover:scale-105 transition-all duration-300">
                      <div className="p-0.5 bg-white rounded-full">
                        <img 
                          src={story.storyImage} 
                          alt={story.title} 
                          className="w-16 h-16 rounded-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-300"
                        />
                      </div>
                      <div className="absolute -bottom-1 -right-1 bg-[#AF9467] rounded-full p-1 text-white border border-white">
                        <Play className="h-2 w-2 fill-current" />
                      </div>
                    </div>
                    <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-[#544F49] mt-3 group-hover:text-[#2D2A26] transition-colors">{story.title}</span>
                    <span className="text-[8px] font-mono text-[#AF9467] uppercase mt-0.5">TAP TO VIEW STORY</span>
                  </button>

                  {/* Bubble Pencil Edit Overrides overlay */}
                  {onEditStory && idx !== -1 && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onEditStory(idx);
                      }}
                      className="absolute top-1 right-1 bg-white border border-[#DECCB2] text-[#2D2A26] shadow-md hover:bg-[#AF9467] hover:text-white rounded-full p-1 transition-all cursor-pointer z-20 flex items-center justify-center transform hover:scale-110"
                      title={`Edit ${story.title}`}
                    >
                      <Edit3 className="h-2.5 w-2.5" />
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Stories visual editorial Grid (Replacing the products grid completely!) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8" id="stories-grid-deck">
          {stories.map((story, index) => {
            const isLiked = likedStories.includes(story.id);
            return (
              <div 
                key={story.id} 
                onClick={() => setActiveStory(story)}
                className="bg-[#FAF8F5] border border-[#EADFC9]/40 rounded-sm overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 group cursor-pointer relative"
                id={`story-card-${story.id}`}
              >
                
                {/* Header info */}
                <div className="px-4 py-3 flex items-center justify-between border-b border-[#EADFC9]/25 bg-white">
                  <div className="flex items-center space-x-2.5">
                    <div className="w-7 h-7 rounded-full bg-[#AF9467]/10 flex items-center justify-center font-display text-[9px] font-bold text-[#AF9467] border border-[#DECCB2]/50">
                      H4U
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[11px] font-sans font-bold text-[#2D2A26] flex items-center space-x-1">
                        <span>@hampers_4_you_by_tasdiqa</span>
                        {onEditStory && (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              onEditStory(index);
                            }}
                            className="text-gray-400 hover:text-[#AF9467] transition-colors p-0.5 rounded cursor-pointer"
                            title="Edit story info"
                          >
                            <Edit3 className="h-2.5 w-2.5" />
                          </button>
                        )}
                      </span>
                      <span className="text-[9px] font-sans font-light text-[#8C8377]">Specimen #{index + 1}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span className="w-1.5 h-1.5 bg-[#AF9467] rounded-full animate-pulse" />
                    <span className="text-[8px] font-mono text-[#8C8377] uppercase font-bold">Atelier Story</span>
                  </div>
                </div>

                {/* Main Visual box */}
                <div className="relative aspect-square overflow-hidden bg-gray-100">
                  <img 
                    src={story.storyImage} 
                    alt={story.title}
                    className="w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-all duration-700"
                    referrerPolicy="no-referrer"
                  />
                  {/* Glass overlay with dual buttons */}
                  <div className="absolute inset-0 bg-[#2D2A26]/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-3 z-10 p-4">
                    <div className="flex items-center space-x-2.5">
                      <div className="px-4 py-2 bg-white/95 backdrop-blur-sm rounded-sm text-[#2D2A26] font-sans font-bold text-[9px] uppercase tracking-wider flex items-center space-x-1">
                        <Eye className="h-3.5 w-3.5 text-[#AF9467]" />
                        <span>Play Story</span>
                      </div>

                      {onEditStory && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onEditStory(index);
                          }}
                          className="px-4 py-2 bg-[#AF9467] text-white hover:bg-[#8C7A5C] rounded-sm font-sans font-bold text-[9px] uppercase tracking-wider flex items-center space-x-1 shadow-sm border border-[#DECCB2]/20 cursor-pointer"
                        >
                          <Edit3 className="h-3.5 w-3.5" />
                          <span>Change Photo</span>
                        </button>
                      )}
                    </div>
                  </div>
                  
                  {/* Subtle watermarked theme tag */}
                  <div className="absolute bottom-3 left-3 bg-[#FAF8F5]/90 backdrop-blur-xs px-2.5 py-1 text-[9px] font-mono text-[#8C7A5C] border border-[#DECCB2]/40 rounded-sm uppercase tracking-wider">
                    {story.title}
                  </div>
                </div>

                {/* Caption & copy panel */}
                <div className="p-5 space-y-3 bg-white text-left">
                  <div className="flex items-center justify-between text-[#544F49]" onClick={(e) => e.stopPropagation()}>
                    <button 
                      onClick={(e) => handleLikeStory(story.id, e)}
                      className="flex items-center space-x-1.5 focus:outline-hidden hover:text-[#AF9467]"
                    >
                      <Heart className={`h-4 w-4 ${isLiked ? 'fill-[#7A1C1C] text-[#7A1C1C]' : 'text-gray-400'}`} />
                      <span className="font-sans font-bold text-[10px]">{124 + (isLiked ? 1 : 0)}</span>
                    </button>
                    <span className="text-[9px] uppercase font-sans text-gray-400 font-bold tracking-widest select-none">Studio backstage</span>
                  </div>

                  <p className="text-[11.5px] text-[#544F49] font-sans font-light leading-relaxed line-clamp-3">
                    <strong className="text-[#2D2A26] font-bold mr-1.5 font-sans">hampers_4_you_by_tasdiqa</strong>
                    {story.text}
                  </p>

                  <div className="pt-3 border-t border-[#EADFC9]/20 flex items-center justify-between" onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={() => handleCopyText(story.id, story.text)}
                      className="text-[9px] font-sans font-bold tracking-widest uppercase text-[#AF9467] hover:text-[#2D2A26] flex items-center space-x-1"
                    >
                      <span>{copiedStoryId === story.id ? 'Copied Narrative!' : 'Copy Narrative Brief'}</span>
                    </button>
                    <a
                      href={instaDmLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[9px] font-sans font-bold tracking-widest uppercase text-[#2D2A26] hover:text-[#AF9467] flex items-center space-x-1"
                    >
                      <span>Inquire DM</span>
                    </a>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* Elegant Note Card for Simulated Story Preview */}
        <div className="mt-14 p-6 bg-[#FAF8F5] border border-[#DECCB2]/50 text-center max-w-xl mx-auto rounded-sm">
          <div className="flex flex-col items-center space-y-2">
            <div className="flex space-x-1 text-[#AF9467]">
              <Star className="h-3 w-3 fill-current" />
              <Star className="h-3 w-3 fill-current" />
              <Star className="h-3 w-3 fill-current" />
            </div>
            <p className="text-[11px] font-sans text-[#544F49] font-light italic">
              "We coordinate all design briefs and consultations directly via Instagram DM. Click 'Copy Narrative Brief' to save your core reference, then launch Instagram to design your custom wedding suite!"
            </p>
            <a
              href={instaDmLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center space-x-1.5 text-[9px] uppercase tracking-wider font-sans font-bold text-[#AF9467] hover:text-[#2D2A26] border-b border-[#AF9467] pb-0.5"
            >
              <Instagram className="h-3 w-3" />
              <span>Launch Live Instagram Inquiry</span>
            </a>
          </div>
        </div>

      </div>

      {/* Full-Fidelity Simulated Instagram Story Player Modal */}
      <AnimatePresence>
        {activeStory && (
          <div 
            className="fixed inset-0 z-50 bg-[#2D2A26]/95 backdrop-blur-md flex items-center justify-center p-4"
            id="story-player-overlay"
          >
            <div className="relative w-full max-w-sm bg-black rounded-xl overflow-hidden shadow-2xl flex flex-col aspect-[9/16] max-h-[85vh]">
              
              {/* Progress bar deck */}
              <div className="absolute top-4 left-4 right-4 z-20 flex space-x-1">
                <div className="h-1 flex-1 bg-white rounded-full overflow-hidden">
                  <div className="h-full bg-[#AF9467] w-full animate-[progress_5s_linear]" />
                </div>
              </div>

              {/* Story Header */}
              <div className="absolute top-8 left-4 right-4 z-20 flex items-center justify-between text-white">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-full bg-[#AF9467] flex items-center justify-center text-[10px] font-bold border border-white">
                    H4U
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-xs font-bold font-sans">@hampers_4_you_by_tasdiqa</span>
                    <span className="text-[8px] uppercase tracking-widest text-[#AF9467] font-bold">Studio Backstage</span>
                  </div>
                </div>
                <button 
                  onClick={() => setActiveStory(null)}
                  className="p-1 rounded-full bg-white/10 hover:bg-white/20 text-white cursor-pointer"
                  id="close-story-player"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Main Background Image */}
              <div className="flex-1 relative overflow-hidden">
                <img 
                  src={activeStory.storyImage} 
                  alt={activeStory.title}
                  className="w-full h-full object-cover"
                />
                
                {/* Visual Vignette gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/60" />
                
                {/* Styled Narrative card in Story */}
                <div className="absolute bottom-16 left-6 right-6 text-left space-y-4">
                  <div className="inline-block px-3 py-1 bg-[#AF9467] rounded-sm text-[8px] font-sans font-bold uppercase tracking-widest text-white">
                    {activeStory.title}
                  </div>
                  <h4 className="font-serif text-xl font-bold text-white leading-tight">
                    Behind the Scenes in our Boutique Studio
                  </h4>
                  <p className="text-[11.5px] font-sans text-gray-200 leading-relaxed font-light font-sans">
                    {activeStory.text}
                  </p>
                </div>
              </div>

              {/* Footer Interactive bar */}
              <div className="h-16 bg-black px-4 flex items-center justify-between border-t border-white/10 z-10">
                <a
                  href={instaDmLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-white/10 border border-white/20 rounded-full py-2 px-4 text-left text-xs text-gray-300 mr-3 hover:bg-white/15 transition-colors"
                >
                  Inquire via Instagram DM...
                </a>
                <a
                  href={instaDmLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 bg-[#AF9467] text-white rounded-full hover:bg-white hover:text-[#2D2A26] transition-colors"
                  title="Inquire over Instagram"
                >
                  <Instagram className="h-4 w-4" />
                </a>
              </div>

            </div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
