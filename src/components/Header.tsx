import React, { useState, useEffect } from 'react';
import { Menu, X, Landmark, ArrowRight, Heart } from 'lucide-react';
import { BRAND_NAME, INSTAGRAM_HANDLE, PHONE_NUMBER } from '../data';
import { motion, AnimatePresence } from 'motion/react';

interface HeaderProps {
  savedConceptsCount: number;
  onOpenPlanner: () => void;
  onOpenSavedDrawer: () => void;
  onOpenAdmin?: () => void;
}

export default function Header({ savedConceptsCount, onOpenPlanner, onOpenSavedDrawer, onOpenAdmin }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 140; // larger header offset
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#FAF8F5]/95 backdrop-blur-md shadow-sm border-b border-[#EADFC9]/30 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex flex-col items-center justify-center relative">
        
        {/* Top Deck: Robust Flex layout preventing overlaps on mobile */}
        <div className="w-full flex items-center justify-between relative mb-2 pb-1" id="top-bar-container">
          
          {/* Left Action Area: Mobile toggler */}
          <div className="flex items-center w-12 justify-start md:hidden shrink-0">
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1 text-[#2D2A26] hover:text-[#AF9467] transition-colors cursor-pointer"
              aria-label="Toggle Mobile Menu"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Majestic Logo - Centered with text clamping to prevent collision */}
          <a 
            href="#" 
            onClick={(e) => { e.preventDefault(); scrollToSection('hero'); }}
            className="flex flex-col items-center text-center group flex-1 px-1 min-w-0"
            id="logo-link"
          >
            <span className="font-display text-lg xs:text-xl sm:text-2.5xl md:text-3.5xl lg:text-4.5xl font-extrabold tracking-[0.18em] sm:tracking-[0.28em] text-[#2D2A26] group-hover:text-[#AF9467] transition-all duration-300 leading-tight truncate">
              HAMPERS<span className="text-[#AF9467] font-semibold font-sans ml-1 text-sm sm:text-xl md:text-2.5xl">4</span>YOU
            </span>
            <span className="text-[6px] sm:text-[9px] md:text-[11px] font-sans uppercase tracking-[0.25em] sm:tracking-[0.45em] text-[#AF9467] mt-0.5 sm:mt-1 font-semibold truncate text-center">
              Bespoke Luxury Gifting
            </span>
          </a>

          {/* Right Action Area - Lifted to side-wise to prevent text collision */}
          <div className="flex items-center justify-end space-x-2 md:absolute md:right-0 shrink-0">
            
            {/* Wishlist Button */}
            <button
              id="wishlist-btn-desktop"
              onClick={onOpenSavedDrawer}
              className="relative p-1.5 sm:p-2 text-[#544F49] hover:text-[#AF9467] transition-colors duration-200 cursor-pointer"
              title="Saved Custom Concepts"
            >
              <Heart className={`h-5.5 w-5.5 sm:h-6 sm:w-6 ${savedConceptsCount > 0 ? 'fill-[#AF9467] text-[#AF9467]' : ''}`} />
              {savedConceptsCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-[#AF9467] text-white text-[8px] sm:text-[9px] font-bold rounded-full w-4 h-4 sm:w-4.5 sm:h-4.5 flex items-center justify-center font-sans shadow-sm">
                  {savedConceptsCount}
                </span>
              )}
            </button>

            {/* Customizer Quick Link */}
            <button
              id="header-cta"
              onClick={onOpenPlanner}
              className="hidden sm:inline-block px-4 py-2 sm:px-5 sm:py-2.5 bg-[#2D2A26] text-white text-[9px] sm:text-[10px] font-sans tracking-widest uppercase hover:bg-[#AF9467] transition-all duration-300 rounded-sm shadow-sm hover:shadow cursor-pointer"
            >
              Plan Custom Design
            </button>
          </div>

        </div>

        {/* Lower Deck: Hairline Separated Centered Navigation Links */}
        <div className="w-full border-t border-[#EBDCC5]/40 pt-3 mt-1 hidden md:block">
          <nav className="flex justify-center items-center space-x-10" id="desktop-nav">
            <button
              id="nav-services"
              onClick={() => scrollToSection('services')}
              className="text-[10px] sm:text-xs font-sans tracking-[0.2em] uppercase font-bold text-[#544F49] hover:text-[#AF9467] transition-colors duration-200"
            >
              Services & Specialties
            </button>
            <button
              id="nav-founder"
              onClick={() => scrollToSection('founder')}
              className="text-[10px] sm:text-xs font-sans tracking-[0.2em] uppercase font-bold text-[#544F49] hover:text-[#AF9467] transition-colors duration-200"
            >
              Our Story
            </button>
            <button
              id="nav-how"
              onClick={() => scrollToSection('how-it-works')}
              className="text-[10px] sm:text-xs font-sans tracking-[0.2em] uppercase font-bold text-[#544F49] hover:text-[#AF9467] transition-colors duration-200"
            >
              Process
            </button>
            <button
              id="nav-planner"
              onClick={() => scrollToSection('planner')}
              className="text-[10px] sm:text-xs font-sans tracking-[0.2em] uppercase font-bold text-[#AF9467] hover:text-[#2D2A26] transition-colors duration-200 flex items-center space-x-1.5"
            >
              <span className="w-1.5 h-1.5 bg-[#AF9467] rounded-full animate-pulse" />
              <span>Design Planner</span>
            </button>
            <button
              id="nav-faq"
              onClick={() => scrollToSection('faqs')}
              className="text-[10px] sm:text-xs font-sans tracking-[0.2em] uppercase font-bold text-[#544F49] hover:text-[#AF9467] transition-colors duration-200"
            >
              FAQ
            </button>
            {onOpenAdmin && (
              <button
                id="nav-admin"
                onClick={onOpenAdmin}
                className="text-[10px] sm:text-xs font-sans tracking-[0.2em] uppercase font-bold text-amber-700 hover:text-amber-900 transition-colors duration-200 flex items-center space-x-1.5"
                title="Boutique Curation Console"
              >
                <span className="w-1.5 h-1.5 bg-amber-600 rounded-full animate-bounce" />
                <span>Studio Admin</span>
              </button>
            )}
          </nav>
        </div>

      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-drawer"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#FAF8F5] border-b border-[#EADFC9]/40 overflow-hidden"
          >
            <div className="px-6 py-8 flex flex-col space-y-4">
              <button
                id="mob-nav-services"
                onClick={() => scrollToSection('services')}
                className="text-left py-2 text-xs font-sans tracking-widest uppercase text-[#544F49]"
              >
                Services & Specialties
              </button>
              <button
                id="mob-nav-founder"
                onClick={() => scrollToSection('founder')}
                className="text-left py-2 text-xs font-sans tracking-widest uppercase text-[#544F49]"
              >
                Our Story
              </button>
              <button
                id="mob-nav-how"
                onClick={() => scrollToSection('how-it-works')}
                className="text-left py-2 text-xs font-sans tracking-widest uppercase text-[#544F49]"
              >
                Booking Process
              </button>
              <button
                id="mob-nav-planner"
                onClick={() => scrollToSection('planner')}
                className="text-left py-2 text-xs font-sans tracking-widest uppercase text-[#544F49]"
              >
                Design Planner
              </button>
              <button
                id="mob-nav-faq"
                onClick={() => scrollToSection('faqs')}
                className="text-left py-2 text-xs font-sans tracking-widest uppercase text-[#544F49]"
              >
                FAQ
              </button>
              
              <div className="pt-4 border-t border-[#EADFC9]/50 flex flex-col space-y-3">
                <button
                  id="mobile-cta"
                  onClick={() => { setMobileMenuOpen(false); scrollToSection('planner'); }}
                  className="w-full text-center py-3 bg-[#2D2A26] text-white text-xs font-sans tracking-widest uppercase rounded-sm"
                >
                  Plan Custom Design
                </button>
                {onOpenAdmin && (
                  <button
                    id="mobile-admin-cta"
                    onClick={() => { setMobileMenuOpen(false); onOpenAdmin(); }}
                    className="w-full text-center py-3 bg-amber-50 border border-amber-200 text-amber-800 text-xs font-sans tracking-widest uppercase rounded-sm font-semibold"
                  >
                    Studio Admin Panel
                  </button>
                )}
                <div className="text-[10px] text-center text-[#AF9467] font-sans tracking-widest">
                  INSTAGRAM: {INSTAGRAM_HANDLE}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
