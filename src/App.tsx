import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import GalleryShowcase from './components/GalleryShowcase';
import AboutFounder from './components/AboutFounder';
import DynamicInstagramFeed from './components/InstagramFeed';
import CustomPlanner from './components/CustomPlanner';
import BookingProcess from './components/BookingProcess';
import Footer from './components/Footer';
import SavedConceptsDrawer from './components/SavedConceptsDrawer';
import ArtisanalAdmin from './components/ArtisanalAdmin';
import BespokeCatalogue from './components/BespokeCatalogue';
import { ArrowUp, Instagram } from 'lucide-react';
import { SERVICE_ITEMS, DEFAULT_CATALOGUE_ITEMS, DEFAULT_STORIES } from './data';
import { ServiceItem, CatalogueItem, StoryItem, HeroImageItem } from './types';
import { motion, AnimatePresence } from 'motion/react';

import luxuryHamperImg from './assets/images/luxury_hamper_1782028572273.jpg';
import bespokeRingPlatterImg from './assets/images/bespoke_ring_platter_1782028587949.jpg';
import nikahCertificateImg from './assets/images/nikah_certificate_1782028604455.jpg';

export default function App() {
  const [savedCount, setSavedCount] = useState(0);
  const [activePlannerServiceId, setActivePlannerServiceId] = useState("");
  const [isSavedDrawerOpen, setIsSavedDrawerOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  const [heroImages, setHeroImages] = useState<HeroImageItem[]>(() => {
    const defaultHeroImages: HeroImageItem[] = [
      { id: "card1", title: "The Gifting Chest", image: luxuryHamperImg, alt: "Luxury Customized Hamper Chest" },
      { id: "card2", title: "Illuminated Nikah Deed", image: nikahCertificateImg, alt: "Bespoke Illuminated Nikah Deed" },
      { id: "card3", title: "Traditional Ivory Ring Platter", image: bespokeRingPlatterImg, alt: "Bespoke Ceremonial Ring Platter" },
    ];
    return defaultHeroImages;
  });

  const handleSaveHeroImages = async (updated: HeroImageItem[]) => {
    setHeroImages(updated);
    localStorage.setItem('hampers_hero_images', JSON.stringify(updated));
    await fetch(`${API_BASE}/settings/hero_images`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updated)
    });
  };

  const handleResetHeroImages = () => {
    localStorage.removeItem('hampers_hero_images');
    window.location.reload();
  };

  const [serviceItems, setServiceItems] = useState<ServiceItem[]>(() => {
    if (typeof window !== 'undefined') {
      const cached = localStorage.getItem('hampers_service_catalog');
      if (cached) {
        try { return JSON.parse(cached); } catch (e) { return SERVICE_ITEMS; }
      }
    }
    return SERVICE_ITEMS;
  });

  const handleSaveServiceItems = async (updated: ServiceItem[]) => {
    setServiceItems(updated);
    localStorage.setItem('hampers_service_catalog', JSON.stringify(updated));
    await fetch(`${API_BASE}/settings/service_catalog`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updated)
    });
  };

  const handleResetServiceItems = () => {
    localStorage.removeItem('hampers_service_catalog');
    window.location.reload();
  };

  const [catalogueItems, setCatalogueItems] = useState<CatalogueItem[]>(() => {
    if (typeof window !== 'undefined') {
      const cached = localStorage.getItem('hampers_catalogue_items');
      if (cached) {
        try { return JSON.parse(cached); } catch (e) { return DEFAULT_CATALOGUE_ITEMS; }
      }
    }
    return DEFAULT_CATALOGUE_ITEMS;
  });

  const handleSaveCatalogueItems = async (updated: CatalogueItem[]) => {
    setCatalogueItems(updated);
    localStorage.setItem('hampers_catalogue_items', JSON.stringify(updated));
    await fetch(`${API_BASE}/settings/catalogue_items`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updated)
    });
  };

  const handleResetCatalogueItems = () => {
    localStorage.removeItem('hampers_catalogue_items');
    window.location.reload();
  };

  const [stories, setStories] = useState<StoryItem[]>(() => {
    if (typeof window !== 'undefined') {
      const cached = localStorage.getItem('hampers_curated_stories');
      if (cached) {
        try { return JSON.parse(cached); } catch (e) { return DEFAULT_STORIES; }
      }
    }
    return DEFAULT_STORIES;
  });

  const handleSaveStories = async (updated: StoryItem[]) => {
    setStories(updated);
    localStorage.setItem('hampers_curated_stories', JSON.stringify(updated));
    await fetch(`${API_BASE}/settings/curated_stories`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updated)
    });
  };

  const handleResetStories = () => {
    localStorage.removeItem('hampers_curated_stories');
    window.location.reload();
  };

  const API_BASE = "http://localhost:3001/api";

  useEffect(() => {
    const loadData = async () => {
      try {
        const heroRes = await fetch(`${API_BASE}/settings/hero_images`);
        if (heroRes.ok) setHeroImages(await heroRes.json());

        const serviceRes = await fetch(`${API_BASE}/settings/service_catalog`);
        if (serviceRes.ok) setServiceItems(await serviceRes.json());

        const catalogueRes = await fetch(`${API_BASE}/settings/catalogue_items`);
        if (catalogueRes.ok) setCatalogueItems(await catalogueRes.json());

        const storyRes = await fetch(`${API_BASE}/settings/curated_stories`);
        if (storyRes.ok) setStories(await storyRes.json());
      } catch (e) {
        console.warn("Database fetch failed, using local storage/defaults", e);
      }
    };
    
    loadData();
    refreshSavedCount();
    const handleScrollVisibility = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener('scroll', handleScrollVisibility);
    return () => window.removeEventListener('scroll', handleScrollVisibility);
  }, []);

  const refreshSavedCount = () => {
    try {
      const savedRaw = localStorage.getItem('hampers_saved_concepts');
      if (savedRaw) {
        const parsed = JSON.parse(savedRaw);
        setSavedCount(parsed.length);
      } else {
        setSavedCount(0);
      }
    } catch (e) { console.warn(e); }
  };

  const handleOpenPlannerWithCategory = (serviceId: string) => {
    setActivePlannerServiceId(serviceId);
    const plannerSec = document.getElementById('planner');
    if (plannerSec) plannerSec.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const handleLaunchDirectConsult = () => {
    const text = "Hi HAMPERS_4_YOU! I am checking your brand portfolio website and would like to start a direct design consultation session on Instagram.";
    navigator.clipboard.writeText(text).then(() => {
      alert("Exquisite greeting prompt copied to clipboard! Opening Instagram Direct Message window for your live creative session.");
    });
    window.open("https://ig.me/m/hampers_4_you_by_tasdiqa", '_blank');
  };

  const handleResetAll = () => {
    if (window.confirm("Are you sure you want to reset all website content to defaults? This cannot be undone.")) {
      localStorage.clear();
      window.location.reload();
    }
  };

  return (
    <div className={`min-h-screen bg-[#FAF8F5] relative antialiased ${isAdminOpen ? 'overflow-hidden' : ''}`} id="luxury-app-root">
      
      {/* Floating Actions */}
      {!isAdminOpen && (
        <div className="fixed bottom-6 right-6 flex flex-col space-y-3 z-40" id="floating-actions-dock">
          <AnimatePresence>
            {showScrollTop && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                onClick={scrollToTop}
                className="p-3 bg-white/95 backdrop-blur-sm border border-[#EADFC9] shadow-md rounded-full text-[#2D2A26] hover:text-[#AF9467] transition-all hover:shadow cursor-pointer"
              >
                <ArrowUp className="h-4 w-4" />
              </motion.button>
            )}
          </AnimatePresence>

          <button
            onClick={handleLaunchDirectConsult}
            className="p-4 bg-[#2D2A26] text-white hover:bg-[#AF9467] shadow-xl rounded-full flex items-center justify-center transition-all duration-300 relative group animate-bounce-slow cursor-pointer"
          >
            <Instagram className="h-5 w-5" />
            <span className="absolute right-14 bg-white/95 text-[#2D2A26] text-[10px] font-sans font-bold tracking-widest uppercase border border-[#EADFC9] px-3 py-1.5 rounded-sm shadow-md pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
              Chat Creative Head (IG)
            </span>
          </button>
        </div>
      )}

      <Header 
        savedConceptsCount={savedCount}
        onOpenPlanner={() => handleOpenPlannerWithCategory("hampers")}
        onOpenSavedDrawer={() => setIsSavedDrawerOpen(true)}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      <main id="luxury-main-content">
        <Hero 
          onPlanClick={() => handleOpenPlannerWithCategory("hampers")} 
          heroImages={heroImages} 
          onEditHeroCard={() => setIsAdminOpen(true)}
        />
        
        <BespokeCatalogue 
          items={catalogueItems}
          onSelectStyle={() => {
            const plannerElement = document.getElementById('interactive-custom-planner');
            if (plannerElement) plannerElement.scrollIntoView({ behavior: 'smooth' });
          }}
          onEditCatalogue={() => setIsAdminOpen(true)}
        />
        
        <GalleryShowcase 
          onPlanSpecific={handleOpenPlannerWithCategory} 
          serviceItems={serviceItems}
          onEditCategory={() => setIsAdminOpen(true)}
        />
        
        <AboutFounder />
        
        <DynamicInstagramFeed 
          stories={stories} 
          onEditStory={() => setIsAdminOpen(true)}
        />
        
        <CustomPlanner 
          initialServiceId={activePlannerServiceId}
          onConceptsUpdated={(count) => setSavedCount(count)}
          onOpenSavedDrawer={() => setIsSavedDrawerOpen(true)}
        />
        
        <BookingProcess />
      </main>

      <Footer />

      <AnimatePresence>
        {isSavedDrawerOpen && (
          <SavedConceptsDrawer 
            isOpen={isSavedDrawerOpen}
            onClose={() => setIsSavedDrawerOpen(false)}
            onRefresh={refreshSavedCount}
          />
        )}
      </AnimatePresence>

      {/* Full Screen Admin Panel */}
      <ArtisanalAdmin 
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        serviceItems={serviceItems}
        onSaveItems={handleSaveServiceItems}
        onResetDefaults={handleResetAll}
        catalogueItems={catalogueItems}
        onSaveCatalogueItems={handleSaveCatalogueItems}
        stories={stories}
        onSaveStories={handleSaveStories}
        heroImages={heroImages}
        onSaveHeroImages={handleSaveHeroImages}
      />

    </div>
  );
}
